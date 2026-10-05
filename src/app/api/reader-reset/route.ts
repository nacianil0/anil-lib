import { NextResponse, type NextRequest } from "next/server";
import { authorizeReaderRequest } from "@/lib/auth/require-reader-session";
import { getSessionUser } from "@/lib/auth/session-user";
import { getDatabaseClient } from "@/lib/db/client";
import { seriesResetRequestSchema } from "@/lib/reader-data/series-reset";
import { resetSeriesReadingProgress } from "@/lib/reader-data/server/reset-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4 * 1024;
const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: NextRequest) {
  const authorization = await authorizeReaderRequest(request, { requireSameOrigin: true });
  if (!authorization.ok) {
    return NextResponse.json(
      { error: authorization.code },
      { status: authorization.status, headers: NO_STORE },
    );
  }

  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers: NO_STORE });
  }

  let body: unknown;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413, headers: NO_STORE });
    }
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 422, headers: NO_STORE });
  }
  const parsed = seriesResetRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 422, headers: NO_STORE });
  }

  try {
    const sql = getDatabaseClient();
    if (!sql) {
      return NextResponse.json({ error: "reset_unavailable" }, { status: 503, headers: NO_STORE });
    }
    const actor = await getSessionUser();
    if (!actor) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401, headers: NO_STORE });
    }
    if (actor.workspaceId !== authorization.workspaceId) {
      return NextResponse.json({ error: "workspace_mismatch" }, { status: 403, headers: NO_STORE });
    }
    const result = await resetSeriesReadingProgress(sql, actor, parsed.data.seriesId);
    console.info("[reader-reset] series reading reset", {
      actorId: actor.id,
      seriesId: result.reset.seriesId,
      resetVersion: result.reset.resetVersion,
      progress: result.progress,
    });
    return NextResponse.json(result, { headers: NO_STORE });
  } catch (error) {
    console.error("[reader-reset] database operation failed", error);
    return NextResponse.json({ error: "reset_unavailable" }, { status: 503, headers: NO_STORE });
  }
}
