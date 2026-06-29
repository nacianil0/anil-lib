import { NextResponse, type NextRequest } from "next/server";
import { authorizeReaderRequest } from "@/lib/auth/require-reader-session";
import { getDatabaseClient } from "@/lib/db/client";
import { syncRequestSchema } from "@/lib/reader-data/sync-contract";
import { synchronizeReaderData } from "@/lib/reader-data/server/sync-service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 256 * 1024;

export async function POST(request: NextRequest) {
  const authorization = await authorizeReaderRequest(request, { requireSameOrigin: true });
  if (!authorization.ok) {
    return NextResponse.json(
      { error: authorization.code },
      { status: authorization.status, headers: { "Cache-Control": "no-store" } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 422 });
  }

  const parsed = syncRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 422 });
  }

  const sql = getDatabaseClient();
  if (!sql) {
    return NextResponse.json(
      { error: "sync_unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const response = await synchronizeReaderData(
      sql,
      authorization.workspaceId,
      parsed.data.cursor,
      parsed.data.operations,
    );
    return NextResponse.json(response, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[reader-sync] database operation failed", error);
    return NextResponse.json(
      { error: "sync_unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
