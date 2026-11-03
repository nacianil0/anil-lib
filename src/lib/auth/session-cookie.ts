import "server-only";

import { cookies } from "next/headers";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  AUTH_SESSION_ONLY_SECONDS,
  buildSignedSession,
} from "@/lib/auth/password-gate";

/**
 * Sets the session cookie. Without `remember` it is a browser-session cookie (no
 * Max-Age), so closing the browser signs the reader out: the KVKK cookie guide (§5.2)
 * keeps an authentication cookie that outlives the browser session out of the
 * "strictly necessary" exemption unless the person explicitly asks for it, which is
 * what the "Beni hatırla" box records.
 */
export async function issueSessionCookie(
  secret: string,
  session: { userId: string; workspaceId: string; sessionVersion?: number },
  remember: boolean,
): Promise<void> {
  const lifetime = remember ? AUTH_COOKIE_MAX_AGE_SECONDS : AUTH_SESSION_ONLY_SECONDS;
  const cookieStore = await cookies();
  cookieStore.set(
    AUTH_COOKIE_NAME,
    await buildSignedSession(secret, session, Date.now(), lifetime),
    {
      httpOnly: true,
      ...(remember ? { maxAge: AUTH_COOKIE_MAX_AGE_SECONDS } : {}),
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}
