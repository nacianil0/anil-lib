"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { clientIpFrom } from "@/lib/auth/client-ip";
import {
  AUTH_COOKIE_NAME,
  AUTH_SESSION_ONLY_SECONDS,
  getGateConfig,
  verifySignedSession,
} from "@/lib/auth/password-gate";
import { verifyPassword } from "@/lib/auth/password";
import { newPasswordProblem } from "@/lib/auth/password-policy";
import { bucketKey, isOverLimit, RATE_LIMITS, recordHit } from "@/lib/auth/rate-limit";
import {
  deleteReaderAccount,
  findReaderCredentialsById,
  replaceRecoveryCode,
  setReaderPassword,
  type ReaderAccountCredentials,
} from "@/lib/auth/reader-accounts";
import { clearSessionCookie, issueSessionCookie } from "@/lib/auth/session-cookie";
import { getSessionUser } from "@/lib/auth/session-user";
import { getDatabaseClient } from "@/lib/db/client";
import type { AccountActionState } from "./account-state";

type Verified =
  | {
      ok: true;
      account: ReaderAccountCredentials;
      sql: NonNullable<ReturnType<typeof getDatabaseClient>>;
      secret: string;
    }
  | { ok: false; state: AccountActionState };

/**
 * Every change here needs the current password, checked on the server against the
 * signed-in reader's own row. A server action is a public endpoint: the session is
 * resolved again here rather than trusted from the page that rendered the form.
 * Wrong passwords count against the same limits as failed sign-ins, so this form is
 * no side door for guessing.
 */
async function verifyCurrentPassword(formData: FormData): Promise<Verified> {
  const user = await getSessionUser();
  const config = getGateConfig();
  const sql = getDatabaseClient();
  if (!user || user.role !== "reader" || !config || !sql) {
    return { ok: false, state: { status: "error", message: "Bu işlem için yetkin yok." } };
  }
  const ipKey = bucketKey(RATE_LIMITS.loginIp, clientIpFrom(await headers()), config.cookieSecret);
  const accountKey = bucketKey(RATE_LIMITS.loginAccount, user.username, config.cookieSecret);
  try {
    if (
      (await isOverLimit(sql, ipKey, RATE_LIMITS.loginIp)) ||
      (await isOverLimit(sql, accountKey, RATE_LIMITS.loginAccount))
    ) {
      return {
        ok: false,
        state: {
          status: "error",
          message: "Çok fazla hatalı deneme oldu. Birkaç dakika sonra yeniden dene.",
        },
      };
    }
    const account = await findReaderCredentialsById(sql, user.id);
    const current = formData.get("current");
    if (
      !account ||
      typeof current !== "string" ||
      !(await verifyPassword(current, account.passwordHash))
    ) {
      await Promise.all([
        recordHit(sql, ipKey, RATE_LIMITS.loginIp),
        recordHit(sql, accountKey, RATE_LIMITS.loginAccount),
      ]);
      return { ok: false, state: { status: "error", message: "Şu anki parolan eşleşmedi." } };
    }
    return { ok: true, account, sql, secret: config.cookieSecret };
  } catch (error) {
    console.error("[hesap] verification failed", error);
    return {
      ok: false,
      state: { status: "error", message: "Hesap servisi şu anda yanıt vermiyor." },
    };
  }
}

/** Whether the cookie in use was a "remember me" one, so a re-issued cookie keeps that choice. */
async function sessionWasRemembered(secret: string): Promise<boolean> {
  const claims = await verifySignedSession((await cookies()).get(AUTH_COOKIE_NAME)?.value, secret);
  return claims !== null && claims.expiresAt - Date.now() > AUTH_SESSION_ONLY_SECONDS * 1000;
}

export async function changePasswordAction(
  _previous: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const verified = await verifyCurrentPassword(formData);
  if (!verified.ok) return verified.state;
  const { account, sql, secret } = verified;

  const password = formData.get("password");
  const confirm = formData.get("confirm");
  if (typeof password !== "string" || typeof confirm !== "string") {
    return { status: "error", message: "Yeni parolayı iki kez yaz." };
  }
  const problem = newPasswordProblem(password, account.username);
  if (problem) return { status: "error", message: problem };
  if (password !== confirm)
    return { status: "error", message: "Yeni parolalar birbirini tutmuyor." };
  if (await verifyPassword(password, account.passwordHash)) {
    return { status: "error", message: "Yeni parola şu ankinden farklı olmalı." };
  }

  try {
    const remember = await sessionWasRemembered(secret);
    const updated = await setReaderPassword(sql, account.id, password, {
      rotateRecoveryCode: false,
    });
    if (!updated) return { status: "error", message: "Hesap bulunamadı." };
    // Every other session ends with the version bump; this one carries on.
    await issueSessionCookie(
      secret,
      {
        userId: account.id,
        workspaceId: account.workspaceId,
        sessionVersion: updated.sessionVersion,
      },
      remember,
    );
  } catch (error) {
    console.error("[hesap] password change failed", error);
    return { status: "error", message: "Parola şu anda değiştirilemedi." };
  }
  return {
    status: "done",
    message: "Parolan değişti. Bu cihaz dışındaki bütün oturumların kapandı.",
  };
}

export async function newRecoveryCodeAction(
  _previous: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const verified = await verifyCurrentPassword(formData);
  if (!verified.ok) return verified.state;
  try {
    const code = await replaceRecoveryCode(verified.sql, verified.account.id);
    if (!code) return { status: "error", message: "Hesap bulunamadı." };
    return {
      status: "done",
      message: "Yeni kurtarma kodun hazır; eskisi artık geçersiz.",
      recoveryCode: code,
      username: verified.account.username,
    };
  } catch (error) {
    console.error("[hesap] recovery code rotation failed", error);
    return { status: "error", message: "Kurtarma kodu şu anda yenilenemedi." };
  }
}

export async function deleteAccountAction(
  _previous: AccountActionState,
  formData: FormData,
): Promise<AccountActionState> {
  const verified = await verifyCurrentPassword(formData);
  if (!verified.ok) return verified.state;
  if (formData.get("confirmUsername") !== verified.account.username) {
    return { status: "error", message: "Onay için kullanıcı adını tam olarak yaz." };
  }
  try {
    await deleteReaderAccount(verified.sql, verified.account);
  } catch (error) {
    console.error("[hesap] account deletion failed", error);
    return { status: "error", message: "Hesap şu anda silinemedi. Hiçbir veri silinmedi." };
  }
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/login?notice=deleted");
}
