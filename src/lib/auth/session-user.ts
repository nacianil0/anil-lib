import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  AUTH_COOKIE_NAME,
  getGateConfig,
  isGateIntended,
  verifySignedSession,
} from "@/lib/auth/password-gate";
import { findUserById } from "@/lib/auth/users";
import {
  LOCAL_OWNER_USER_ID,
  localOwnerUser,
  OWNER_WORKSPACE_ID,
  type ReaderUser,
} from "@/lib/auth/user-schema";
import { getDatabaseClient } from "@/lib/db/client";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Resolves the signed cookie to a real account. Deduplicated per request so a page
 * that checks the session in several places still costs a single lookup.
 *
 * The role is never read from the cookie: it comes from the database row, so a
 * forged or stale payload cannot promote anyone to owner.
 */
export const getSessionUser = cache(async function getSessionUser(): Promise<ReaderUser | null> {
  // Read the cookie store first, unconditionally. Any page that resolves a session
  // must render per request; returning early on an unconfigured build would let Next
  // prerender it and then serve one account's identity to everyone.
  const cookieStore = await cookies();

  const config = getGateConfig();
  if (!config) {
    // Mirrors the middleware: an unconfigured, non-production environment runs open,
    // which is how the local dev server has always worked.
    if (!isGateIntended() && process.env.NODE_ENV !== "production") return localOwnerUser();
    return null;
  }

  const claims = await verifySignedSession(
    cookieStore.get(AUTH_COOKIE_NAME)?.value,
    config.cookieSecret,
  );
  if (!claims) return null;

  const sql = getDatabaseClient();
  if (!sql) {
    // Without a database only the env-backed owner identity exists (local development).
    if (claims.userId !== LOCAL_OWNER_USER_ID || claims.workspaceId !== OWNER_WORKSPACE_ID) {
      return null;
    }
    return localOwnerUser();
  }

  // A cookie minted in the no-database mode carries a non-uuid id; reject it before
  // it reaches a `::uuid` cast.
  if (!UUID_PATTERN.test(claims.userId)) return null;

  // A database hiccup must not become a 500 on every page and server action; treat
  // it as "no session" so the request lands on the login screen instead.
  let user;
  try {
    user = await findUserById(sql, claims.userId);
  } catch (error) {
    console.error("[auth] session lookup failed", error);
    return null;
  }
  if (!user) return null;
  // Defence in depth: the workspace in the cookie must match the stored account.
  if (user.workspaceId !== claims.workspaceId) return null;
  return user;
});

/** Null for anonymous requests and for signed-in standard users alike. */
export async function getOwnerUser(): Promise<ReaderUser | null> {
  const user = await getSessionUser();
  return user?.role === "owner" ? user : null;
}

/** For pages behind the gate. Sends anyone without a resolvable account back to login. */
export async function requireSessionUser(): Promise<ReaderUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * For owner-only pages. Answers 404 rather than 403 so the existence of the route is
 * not disclosed to a signed-in standard user.
 */
export async function requireOwnerUser(): Promise<ReaderUser> {
  const user = await getSessionUser();
  if (!user || user.role !== "owner") notFound();
  return user;
}
