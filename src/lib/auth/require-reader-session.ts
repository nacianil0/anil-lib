import "server-only";

import type { NextRequest } from "next/server";
import { isReaderWorkspace } from "@/lib/auth/access";
import { AUTH_COOKIE_NAME, getGateConfig, verifySignedSession } from "@/lib/auth/password-gate";
import { findReaderById } from "@/lib/auth/reader-accounts";
import type { SqlClient } from "@/lib/auth/users";
import { OWNER_WORKSPACE_ID } from "@/lib/auth/user-schema";

export { OWNER_WORKSPACE_ID as READER_WORKSPACE_ID };

export type ReaderAuthorization =
  | {
      ok: true;
      workspaceId: string;
      isOwnerWorkspace: boolean;
      /** A self-registered reader: narrower scope, and the session must be re-checked. */
      isReaderWorkspace: boolean;
      userId: string;
      sessionVersion: number | null;
    }
  | { ok: false; status: 401 | 403 | 503; code: string };

/**
 * Authorizes a reader API request from the signed cookie alone — no database round
 * trip on the sync hot path.
 *
 * `workspaceId` is HMAC-protected server state, not a client-supplied value, and it
 * is the only thing isolation depends on. `isOwnerWorkspace` merely widens which
 * article ids are accepted (the owner may still write to the archive); every
 * privileged surface resolves the role from the database instead — see
 * `session-user.ts`.
 */
export async function authorizeReaderRequest(
  request: NextRequest,
  options: { requireSameOrigin?: boolean } = {},
): Promise<ReaderAuthorization> {
  const config = getGateConfig();
  if (!config) return { ok: false, status: 503, code: "auth_unavailable" };

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const claims = await verifySignedSession(cookie, config.cookieSecret);
  if (!claims) {
    return { ok: false, status: 401, code: "unauthorized" };
  }

  if (options.requireSameOrigin) {
    const origin = request.headers.get("origin");
    if (origin) {
      try {
        const requestHost =
          request.headers.get("x-forwarded-host") ??
          request.headers.get("host") ??
          request.nextUrl.host;
        if (new URL(origin).host !== requestHost) {
          return { ok: false, status: 403, code: "origin_mismatch" };
        }
      } catch {
        return { ok: false, status: 403, code: "origin_mismatch" };
      }
    }
  }

  return {
    ok: true,
    workspaceId: claims.workspaceId,
    isOwnerWorkspace: claims.workspaceId === OWNER_WORKSPACE_ID,
    isReaderWorkspace: isReaderWorkspace(claims.workspaceId),
    userId: claims.userId,
    sessionVersion: claims.sessionVersion,
  };
}

/**
 * A reader's cookie is only as good as the account behind it: a deleted account, or a
 * password changed or recovered since the cookie was minted, must stop the APIs too,
 * not only the pages. Owner-created accounts keep the cookie-only fast path above.
 */
export async function readerSessionIsCurrent(
  sql: SqlClient,
  authorization: Extract<ReaderAuthorization, { ok: true }>,
): Promise<boolean> {
  if (!authorization.isReaderWorkspace) return true;
  const reader = await findReaderById(sql, authorization.userId);
  return (
    reader !== null &&
    reader.workspaceId === authorization.workspaceId &&
    reader.sessionVersion === authorization.sessionVersion
  );
}
