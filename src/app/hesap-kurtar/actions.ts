"use server";

import { headers } from "next/headers";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { clientIpFrom } from "@/lib/auth/client-ip";
import { getGateConfig } from "@/lib/auth/password-gate";
import { hashPassword } from "@/lib/auth/password";
import { newPasswordProblem } from "@/lib/auth/password-policy";
import { bucketKey, RATE_LIMITS, recordHit } from "@/lib/auth/rate-limit";
import { findReaderCredentialsByUsername, setReaderPassword } from "@/lib/auth/reader-accounts";
import { hashRecoveryCode, verifyRecoveryCode } from "@/lib/auth/recovery-code";
import { clearSessionCookie } from "@/lib/auth/session-cookie";
import { normalizeUsername } from "@/lib/auth/user-schema";
import { getDatabaseClient } from "@/lib/db/client";
import type { RecoverState } from "./recover-state";

const MISMATCH = "Kullanıcı adı ile kurtarma kodu eşleşmedi.";
/** Compared against when there is no account, so a miss costs what a hit costs. */
const DUMMY_RECOVERY_HASH = hashRecoveryCode("00000-00000-00000-00000-00000");

/**
 * Account recovery with the offline code handed out at sign-up (OWASP Forgot
 * Password Cheat Sheet, "Offline methods"):
 *
 *  - One message for an unknown username and a wrong code, reached through the same
 *    work (a code comparison and a password hash) either way, so neither the text nor
 *    the timing tells which accounts exist.
 *  - Attempts are limited per address and per username; the account is never locked,
 *    so nobody can shut a reader out by guessing at their name.
 *  - Success replaces the code (single use), moves the session version on (every
 *    existing session ends) and does not sign in: the reader signs in afresh.
 */
export async function recoverAction(
  _previous: RecoverState,
  formData: FormData,
): Promise<RecoverState> {
  const result = await recover(formData);
  if (result.status !== "error") return result;
  const typed = formData.get("username");
  return typeof typed === "string" ? { ...result, username: typed.slice(0, 64) } : result;
}

async function recover(formData: FormData): Promise<RecoverState> {
  const config = getGateConfig();
  const sql = getDatabaseClient();
  if (!publicLaunchEnabled() || !config || !sql) {
    return { status: "error", message: "Hesap kurtarma şu anda kullanılamıyor." };
  }

  const rawUsername = formData.get("username");
  const code = formData.get("code");
  const password = formData.get("password");
  const confirm = formData.get("confirm");
  if (
    typeof rawUsername !== "string" ||
    typeof code !== "string" ||
    typeof password !== "string" ||
    typeof confirm !== "string"
  ) {
    return { status: "error", message: MISMATCH };
  }
  const username = normalizeUsername(rawUsername);

  const ip = clientIpFrom(await headers());
  try {
    const [byAddress, byAccount] = await Promise.all([
      recordHit(
        sql,
        bucketKey(RATE_LIMITS.recoverIp, ip, config.cookieSecret),
        RATE_LIMITS.recoverIp,
      ),
      recordHit(
        sql,
        bucketKey(RATE_LIMITS.recoverAccount, username, config.cookieSecret),
        RATE_LIMITS.recoverAccount,
      ),
    ]);
    if (byAddress > RATE_LIMITS.recoverIp.limit || byAccount > RATE_LIMITS.recoverAccount.limit) {
      return {
        status: "error",
        message: "Kısa sürede çok fazla deneme yapıldı. On beş dakika sonra yeniden dene.",
      };
    }
  } catch (error) {
    console.error("[hesap-kurtar] limiter unavailable", error);
    return { status: "error", message: "Hesap kurtarma şu anda kullanılamıyor." };
  }

  const problem = newPasswordProblem(password, username);
  if (problem) return { status: "error", field: "password", message: problem };
  if (password !== confirm) {
    return { status: "error", field: "confirm", message: "Parolalar birbirini tutmuyor." };
  }

  let account;
  try {
    account = await findReaderCredentialsByUsername(sql, username);
  } catch (error) {
    console.error("[hesap-kurtar] lookup failed", error);
    return { status: "error", message: "Hesap kurtarma şu anda kullanılamıyor." };
  }

  const codeMatches = verifyRecoveryCode(code, account?.recoveryCodeHash ?? DUMMY_RECOVERY_HASH);
  if (!account || !codeMatches) {
    // The same expensive step a successful recovery takes, so failure is not faster.
    await hashPassword(password);
    return { status: "error", message: MISMATCH };
  }

  let updated;
  try {
    updated = await setReaderPassword(sql, account.id, password, { rotateRecoveryCode: true });
  } catch (error) {
    console.error("[hesap-kurtar] update failed", error);
    return { status: "error", message: "Hesap kurtarma şu anda kullanılamıyor." };
  }
  if (!updated?.recoveryCode) return { status: "error", message: MISMATCH };

  // Whatever session this browser held is void now; do not leave its cookie behind.
  await clearSessionCookie();
  return { status: "recovered", username: account.username, recoveryCode: updated.recoveryCode };
}
