import "server-only";

import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, getGateConfig, verifySignedSession } from "@/lib/auth/password-gate";

export const READER_WORKSPACE_ID = "owner";

export type ReaderAuthorization =
  | { ok: true; workspaceId: typeof READER_WORKSPACE_ID }
  | { ok: false; status: 401 | 403 | 503; code: string };

export async function authorizeReaderRequest(
  request: NextRequest,
  options: { requireSameOrigin?: boolean } = {},
): Promise<ReaderAuthorization> {
  const config = getGateConfig();
  if (!config) return { ok: false, status: 503, code: "auth_unavailable" };

  const cookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!(await verifySignedSession(cookie, config.cookieSecret))) {
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

  return { ok: true, workspaceId: READER_WORKSPACE_ID };
}
