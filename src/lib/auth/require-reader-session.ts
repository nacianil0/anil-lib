import "server-only";

import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, getGateConfig, verifySignedSession } from "@/lib/auth/password-gate";
import { OWNER_WORKSPACE_ID } from "@/lib/auth/user-schema";

export { OWNER_WORKSPACE_ID as READER_WORKSPACE_ID };

export type ReaderAuthorization =
  | { ok: true; workspaceId: string; isOwnerWorkspace: boolean }
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
  };
}
