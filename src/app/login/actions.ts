"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/auth/authenticate";
import { clientIpFrom } from "@/lib/auth/client-ip";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";
import { bucketKey, isOverLimit, RATE_LIMITS, recordHit } from "@/lib/auth/rate-limit";
import { clearSessionCookie, issueSessionCookie } from "@/lib/auth/session-cookie";
import { normalizeUsername } from "@/lib/auth/user-schema";
import { getDatabaseClient } from "@/lib/db/client";

type LoginError = "config" | "invalid" | "unavailable" | "throttled";

function loginPath(next: string, error?: LoginError): string {
  const params = new URLSearchParams({ next });
  if (error) params.set("error", error);
  return `/login?${params.toString()}`;
}

/**
 * Failed sign-ins are counted per address and per username (whether or not that
 * username exists, so the limit itself reveals nothing). A broken counter must not
 * lock everyone out, so a limiter failure is logged and the attempt goes ahead; the
 * table exists from migration 0006 on, which runs before every deploy.
 */
async function throttleState(username: string, ip: string, secret: string) {
  const sql = getDatabaseClient();
  if (!sql) return { limited: false, recordFailure: async () => {} };
  const ipKey = bucketKey(RATE_LIMITS.loginIp, ip, secret);
  const accountKey = bucketKey(RATE_LIMITS.loginAccount, username, secret);
  let limited = false;
  try {
    const [ipOver, accountOver] = await Promise.all([
      isOverLimit(sql, ipKey, RATE_LIMITS.loginIp),
      isOverLimit(sql, accountKey, RATE_LIMITS.loginAccount),
    ]);
    limited = ipOver || accountOver;
  } catch (error) {
    console.error("[auth] login limiter unavailable", error);
  }
  return {
    limited,
    recordFailure: async () => {
      try {
        await Promise.all([
          recordHit(sql, ipKey, RATE_LIMITS.loginIp),
          recordHit(sql, accountKey, RATE_LIMITS.loginAccount),
        ]);
      } catch (error) {
        console.error("[auth] login limiter unavailable", error);
      }
    },
  };
}

export async function login(formData: FormData): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");
  const remember = formData.get("remember") === "on";
  const next = safeNextPath(formData.get("next")?.toString());
  const config = getGateConfig();

  if (!config) {
    redirect(loginPath(next, "config"));
  }

  if (typeof username !== "string" || typeof password !== "string") {
    redirect(loginPath(next, "invalid"));
  }

  const normalized = normalizeUsername(username);
  const throttle = await throttleState(
    normalized,
    clientIpFrom(await headers()),
    config.cookieSecret,
  );
  if (throttle.limited) {
    redirect(loginPath(next, "throttled"));
  }

  const result = await authenticateUser(normalized, password, config.passwordHash);

  if (result.status === "unavailable") {
    redirect(loginPath(next, "unavailable"));
  }
  if (result.status !== "ok") {
    await throttle.recordFailure();
    redirect(loginPath(next, "invalid"));
  }

  await issueSessionCookie(
    config.cookieSecret,
    {
      userId: result.user.id,
      workspaceId: result.user.workspaceId,
      ...(result.sessionVersion !== undefined ? { sessionVersion: result.sessionVersion } : {}),
    },
    remember,
  );

  // Drop anything the previous account rendered so a switch inside one tab cannot
  // serve their pages from the router cache.
  revalidatePath("/", "layout");
  redirect(next);
}

export async function logout(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/login");
}
