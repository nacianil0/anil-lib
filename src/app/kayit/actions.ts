"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { clientIpFrom } from "@/lib/auth/client-ip";
import { formTokenIsValid } from "@/lib/auth/form-token";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";
import { newPasswordProblem } from "@/lib/auth/password-policy";
import { bucketKey, RATE_LIMITS, recordHit } from "@/lib/auth/rate-limit";
import { createReaderAccount } from "@/lib/auth/reader-accounts";
import { issueSessionCookie } from "@/lib/auth/session-cookie";
import { usernameSchema } from "@/lib/auth/user-schema";
import { DuplicateUsernameError } from "@/lib/auth/users";
import { getDatabaseClient } from "@/lib/db/client";
import type { RegisterState } from "./register-state";

/**
 * Names nobody signs up under: they would read as the site speaking, or as its owner.
 * The owner's own name is taken in `users` anyway; the rest are refused here.
 */
const RESERVED_USERNAMES = new Set([
  "admin",
  "administrator",
  "root",
  "owner",
  "sahip",
  "yonetici",
  "yonetim",
  "moderator",
  "destek",
  "support",
  "system",
  "sistem",
  "anil",
  "anil-lib",
  "anillib",
]);

const GENERIC_FAILURE = "Hesap açılamadı. Sayfayı yenileyip yeniden dene.";

/**
 * Public sign-up. A server action is a public endpoint, so every rule is enforced
 * here, not in the form:
 *
 *  - The new account is a `reader`: it can read the AI and Güven Sınırı series and
 *    nothing else (`lib/auth/access.ts`). Nothing submitted can change that — there is
 *    no role field, and the account is written to `reader_accounts`, which no
 *    privileged check ever reads.
 *  - Every attempt counts against the address and against a global hourly ceiling
 *    before anything else runs, so probing which usernames are taken cannot be done
 *    at scale (OWASP Authentication Cheat Sheet, user enumeration).
 *  - A filled-in hidden field or a form posted faster than a person types is turned
 *    away with the same message as any other failure.
 */
export async function registerAction(
  _previous: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const result = await register(formData);
  if (result.status !== "error") return result;
  const typed = formData.get("username");
  return typeof typed === "string" ? { ...result, username: typed.slice(0, 64) } : result;
}

async function register(formData: FormData): Promise<RegisterState> {
  const config = getGateConfig();
  const sql = getDatabaseClient();
  // Closed until launch: a server action is reachable through any path, so the page
  // being unreachable is not enough.
  if (!publicLaunchEnabled() || !config || !sql) {
    return { status: "error", message: "Hesap açma şu anda kullanılamıyor." };
  }

  const ip = clientIpFrom(await headers());
  let overLimit = false;
  try {
    const [byAddress, overall] = await Promise.all([
      recordHit(
        sql,
        bucketKey(RATE_LIMITS.registerIp, ip, config.cookieSecret),
        RATE_LIMITS.registerIp,
      ),
      recordHit(
        sql,
        bucketKey(RATE_LIMITS.registerAll, "all", config.cookieSecret),
        RATE_LIMITS.registerAll,
      ),
    ]);
    overLimit = byAddress > RATE_LIMITS.registerIp.limit || overall > RATE_LIMITS.registerAll.limit;
  } catch (error) {
    // Without a working limiter sign-up stays closed rather than unthrottled.
    console.error("[kayit] limiter unavailable", error);
    return { status: "error", message: "Hesap açma şu anda kullanılamıyor." };
  }
  if (overLimit) {
    return {
      status: "error",
      message: "Bu bağlantıdan kısa sürede çok fazla deneme yapıldı. Bir saat sonra yeniden dene.",
    };
  }

  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "error", message: GENERIC_FAILURE };
  }
  if (!formTokenIsValid(formData.get("issued"), config.cookieSecret)) {
    return { status: "error", message: GENERIC_FAILURE };
  }

  const username = usernameSchema.safeParse(formData.get("username") ?? "");
  if (!username.success) {
    return {
      status: "error",
      field: "username",
      message: username.error.issues[0]?.message ?? "Kullanıcı adı geçersiz.",
    };
  }
  if (RESERVED_USERNAMES.has(username.data)) {
    return { status: "error", field: "username", message: "Bu kullanıcı adı kullanılamaz." };
  }

  const password = formData.get("password");
  const confirm = formData.get("confirm");
  if (typeof password !== "string" || typeof confirm !== "string") {
    return { status: "error", message: GENERIC_FAILURE };
  }
  const problem = newPasswordProblem(password, username.data);
  if (problem) return { status: "error", field: "password", message: problem };
  if (password !== confirm) {
    return { status: "error", field: "confirm", message: "Parolalar birbirini tutmuyor." };
  }

  let created;
  try {
    created = await createReaderAccount(sql, { username: username.data, password });
  } catch (error) {
    if (error instanceof DuplicateUsernameError) {
      // Unavoidable without e-mail: the name has to be reported as taken. The limits
      // above are what keep this from becoming a lookup service.
      return {
        status: "error",
        field: "username",
        message: "Bu kullanıcı adı alınmış. Başka bir ad seç.",
      };
    }
    console.error("[kayit] account creation failed", error);
    return { status: "error", message: "Hesap şu anda açılamadı. Birazdan yeniden dene." };
  }

  await issueSessionCookie(
    config.cookieSecret,
    {
      userId: created.account.id,
      workspaceId: created.account.workspaceId,
      sessionVersion: created.account.sessionVersion,
    },
    false,
  );
  revalidatePath("/", "layout");

  return {
    status: "created",
    username: created.account.username,
    recoveryCode: created.recoveryCode,
    next: safeNextPath(formData.get("next")?.toString()),
  };
}
