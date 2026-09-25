import "server-only";

import type { NeonQueryFunction } from "@neondatabase/serverless";
import { loadCatalog } from "@/lib/content/catalog";
import { loadSeriesCatalog } from "@/lib/content/series";
import { loadBounCatalog } from "@/lib/content/series-boun";
import {
  readingAnchorSchema,
  type HighlightRecord,
  type ProgressRecord,
  type ReadingAnchor,
  type SavedPlaceRecord,
  type SyncMutation,
} from "@/lib/reader-data/schema";
import type { SyncOperationError, SyncResponse } from "@/lib/reader-data/server/types";

type SqlClient = NeonQueryFunction<false, false>;

const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000;

/**
 * AI serisi ∪ BOUN serisi, owner workspace'inde ayrıca arşiv; bilinmeyen id reddedilir.
 * Arşiv yazıları normal kullanıcı arayüzünde yok, bu yüzden o id'lere ilerleme
 * yazılması da sunucu tarafında engellenir.
 */
function validArticleIds(allowArchive: boolean): Set<string> {
  const ids = [
    ...loadSeriesCatalog().articles.map((article) => article.articleId),
    ...loadBounCatalog().articles.map((article) => article.articleId),
  ];
  if (allowArchive) {
    ids.push(...loadCatalog().articles.map((article) => article.articleId));
  }
  return new Set(ids);
}

function timestampIsValid(value: string, now: number): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && parsed <= now + MAX_FUTURE_SKEW_MS;
}

/** Anchors travel as jsonb; `null` when the position could not be anchored. */
function anchorParameter(anchor: ReadingAnchor | null | undefined): string | null {
  return anchor ? JSON.stringify(anchor) : null;
}

/**
 * A stored anchor is re-validated on the way out: a row written by an older or
 * hand-edited client must never reach the reader as a half-shaped object.
 */
function anchorFromRow(value: unknown): ReadingAnchor | null {
  if (!value) return null;
  const parsed = readingAnchorSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

/**
 * A progress write from a device that has not yet applied the account's latest reset
 * is recorded as settled but not applied: it was made on top of reading state that
 * the reset removed. The check runs inside the statement, so it also holds for a
 * reset that commits while this request is in flight. `null` (a device with no prior
 * progress) is never behind.
 */
function progressQuery(
  sql: SqlClient,
  workspaceId: string,
  mutation: SyncMutation,
  resetVersion: number | null,
) {
  if (mutation.entityType !== "progress") throw new Error("Unexpected mutation type");
  const value = mutation.payload;
  return sql.query(
    `WITH accepted AS (
       INSERT INTO sync_mutations
         (workspace_id, operation_id, device_id, entity_type, entity_id, operation_type)
       VALUES ($1, $2::uuid, $3::uuid, 'progress', $4, 'upsert')
       ON CONFLICT DO NOTHING
       RETURNING 1
     )
     INSERT INTO reading_progress
       (workspace_id, article_id, heading_id, scroll_ratio, reading_anchor, completed,
        last_read_at, client_updated_at, device_id)
     SELECT $1, $4, $5, $6, $10::jsonb, $7, $8::timestamptz, $9::timestamptz, $3::uuid
     WHERE EXISTS (SELECT 1 FROM accepted)
       AND (
         $11::bigint IS NULL
         OR NOT EXISTS (
           SELECT 1 FROM reading_resets
           WHERE workspace_id = $1 AND reset_version > $11::bigint
         )
       )
     ON CONFLICT (workspace_id, article_id) DO UPDATE SET
       heading_id = EXCLUDED.heading_id,
       scroll_ratio = EXCLUDED.scroll_ratio,
       reading_anchor = EXCLUDED.reading_anchor,
       completed = EXCLUDED.completed,
       last_read_at = EXCLUDED.last_read_at,
       client_updated_at = EXCLUDED.client_updated_at,
       server_updated_at = now(),
       device_id = EXCLUDED.device_id,
       change_version = nextval('reader_change_version_seq')
     WHERE (EXCLUDED.client_updated_at, EXCLUDED.device_id::text) >=
           (reading_progress.client_updated_at, reading_progress.device_id::text)`,
    [
      workspaceId,
      mutation.operationId,
      mutation.deviceId,
      value.articleId,
      value.headingId,
      value.scrollRatio,
      value.completed,
      value.lastReadAt,
      value.clientUpdatedAt,
      anchorParameter(value.anchor),
      resetVersion,
    ],
  );
}

function savedPlaceQuery(sql: SqlClient, workspaceId: string, mutation: SyncMutation) {
  if (mutation.entityType !== "saved-place") throw new Error("Unexpected mutation type");
  const value = mutation.payload;
  return sql.query(
    `WITH accepted AS (
       INSERT INTO sync_mutations
         (workspace_id, operation_id, device_id, entity_type, entity_id, operation_type)
       VALUES ($1, $2::uuid, $3::uuid, 'saved-place', $4, $5)
       ON CONFLICT DO NOTHING
       RETURNING 1
     )
     INSERT INTO saved_places
       (workspace_id, article_id, heading_id, scroll_ratio, reading_anchor, preview_text,
        client_updated_at, device_id, deleted_at)
     SELECT $1, $4, $6, $7, $11::jsonb, $8, $9::timestamptz, $3::uuid, $10::timestamptz
     WHERE EXISTS (SELECT 1 FROM accepted)
     ON CONFLICT (workspace_id, article_id) DO UPDATE SET
       heading_id = EXCLUDED.heading_id,
       scroll_ratio = EXCLUDED.scroll_ratio,
       reading_anchor = EXCLUDED.reading_anchor,
       preview_text = EXCLUDED.preview_text,
       client_updated_at = EXCLUDED.client_updated_at,
       server_updated_at = now(),
       device_id = EXCLUDED.device_id,
       deleted_at = EXCLUDED.deleted_at,
       change_version = nextval('reader_change_version_seq')
     WHERE (EXCLUDED.client_updated_at, EXCLUDED.device_id::text) >=
           (saved_places.client_updated_at, saved_places.device_id::text)`,
    [
      workspaceId,
      mutation.operationId,
      mutation.deviceId,
      value.articleId,
      mutation.operationType,
      value.headingId,
      value.scrollRatio,
      value.previewText,
      value.clientUpdatedAt,
      value.deletedAt,
      anchorParameter(value.anchor),
    ],
  );
}

function highlightQuery(sql: SqlClient, workspaceId: string, mutation: SyncMutation) {
  if (mutation.entityType !== "highlight") throw new Error("Unexpected mutation type");
  const value = mutation.payload;
  return sql.query(
    `WITH accepted AS (
       INSERT INTO sync_mutations
         (workspace_id, operation_id, device_id, entity_type, entity_id, operation_type)
       VALUES ($1, $2::uuid, $3::uuid, 'highlight', $4, $5)
       ON CONFLICT DO NOTHING
       RETURNING 1
     )
     INSERT INTO highlights
       (workspace_id, id, article_id, exact_text, prefix_text, suffix_text, heading_id,
        block_index, start_offset, end_offset, created_at, client_updated_at, device_id, deleted_at)
     SELECT $1, $4::uuid, $6, $7, $8, $9, $10, $11, $12, $13,
            $14::timestamptz, $15::timestamptz, $3::uuid, $16::timestamptz
     WHERE EXISTS (SELECT 1 FROM accepted)
     ON CONFLICT (workspace_id, id) DO UPDATE SET
       article_id = EXCLUDED.article_id,
       exact_text = EXCLUDED.exact_text,
       prefix_text = EXCLUDED.prefix_text,
       suffix_text = EXCLUDED.suffix_text,
       heading_id = EXCLUDED.heading_id,
       block_index = EXCLUDED.block_index,
       start_offset = EXCLUDED.start_offset,
       end_offset = EXCLUDED.end_offset,
       client_updated_at = EXCLUDED.client_updated_at,
       server_updated_at = now(),
       device_id = EXCLUDED.device_id,
       deleted_at = EXCLUDED.deleted_at,
       change_version = nextval('reader_change_version_seq')
     WHERE (EXCLUDED.client_updated_at, EXCLUDED.device_id::text) >=
           (highlights.client_updated_at, highlights.device_id::text)`,
    [
      workspaceId,
      mutation.operationId,
      mutation.deviceId,
      value.id,
      mutation.operationType,
      value.articleId,
      value.exactText,
      value.prefixText,
      value.suffixText,
      value.headingId,
      value.blockIndex,
      value.startOffset,
      value.endOffset,
      value.createdAt,
      value.clientUpdatedAt,
      value.deletedAt,
    ],
  );
}

function mapProgress(row: Record<string, unknown>): ProgressRecord {
  return {
    articleId: String(row.article_id),
    headingId: row.heading_id ? String(row.heading_id) : null,
    scrollRatio: Number(row.scroll_ratio),
    anchor: anchorFromRow(row.reading_anchor),
    completed: Boolean(row.completed),
    lastReadAt: new Date(String(row.last_read_at)).toISOString(),
    clientUpdatedAt: new Date(String(row.client_updated_at)).toISOString(),
    deviceId: String(row.device_id),
    changeVersion: Number(row.change_version),
  };
}

function mapSavedPlace(row: Record<string, unknown>): SavedPlaceRecord {
  return {
    articleId: String(row.article_id),
    headingId: row.heading_id ? String(row.heading_id) : null,
    scrollRatio: Number(row.scroll_ratio),
    anchor: anchorFromRow(row.reading_anchor),
    previewText: String(row.preview_text ?? ""),
    clientUpdatedAt: new Date(String(row.client_updated_at)).toISOString(),
    deviceId: String(row.device_id),
    deletedAt: row.deleted_at ? new Date(String(row.deleted_at)).toISOString() : null,
    changeVersion: Number(row.change_version),
  };
}

function mapHighlight(row: Record<string, unknown>): HighlightRecord {
  return {
    id: String(row.id),
    articleId: String(row.article_id),
    exactText: String(row.exact_text),
    prefixText: String(row.prefix_text ?? ""),
    suffixText: String(row.suffix_text ?? ""),
    headingId: row.heading_id ? String(row.heading_id) : null,
    blockIndex: Number(row.block_index),
    startOffset: Number(row.start_offset),
    endOffset: Number(row.end_offset),
    createdAt: new Date(String(row.created_at)).toISOString(),
    clientUpdatedAt: new Date(String(row.client_updated_at)).toISOString(),
    deviceId: String(row.device_id),
    deletedAt: row.deleted_at ? new Date(String(row.deleted_at)).toISOString() : null,
    changeVersion: Number(row.change_version),
  };
}

export async function synchronizeReaderData(
  sql: SqlClient,
  workspaceId: string,
  cursor: number,
  operations: SyncMutation[],
  options: { allowArchive: boolean; resetVersion: number | null },
): Promise<SyncResponse> {
  const now = Date.now();
  const articleIds = validArticleIds(options.allowArchive);
  const errors: SyncOperationError[] = [];
  const accepted = operations.filter((operation) => {
    const articleId = operation.payload.articleId;
    if (!articleIds.has(articleId)) {
      errors.push({ operationId: operation.operationId, code: "unknown_article" });
      return false;
    }
    if (!timestampIsValid(operation.clientUpdatedAt, now)) {
      errors.push({ operationId: operation.operationId, code: "timestamp_out_of_range" });
      return false;
    }
    return true;
  });

  // Progress writes go first, so this transaction takes reading_progress before any
  // saved-place or highlight row — the order a reset takes them in. Interleaved, a
  // reset with marks included and this batch would each hold what the other waits
  // for. Entities are independent and the sort is stable, so nothing else changes.
  const ordered = [
    ...accepted.filter((operation) => operation.entityType === "progress"),
    ...accepted.filter((operation) => operation.entityType !== "progress"),
  ];
  const queries = ordered.map((operation) => {
    if (operation.entityType === "progress") {
      return progressQuery(sql, workspaceId, operation, options.resetVersion);
    }
    if (operation.entityType === "saved-place") {
      return savedPlaceQuery(sql, workspaceId, operation);
    }
    return highlightQuery(sql, workspaceId, operation);
  });
  if (queries.length > 0) await sql.transaction(queries);

  // Read the reset before the changes. A device behind it clears all of its progress
  // on this response, so it must receive every progress row that exists now — not
  // only those past its cursor, some of which it may already have been sent and
  // would otherwise lose. If a reset lands between these reads, the device is only
  // told on its next sync, and gets the full set then.
  const resetRows = (await sql.query(
    `SELECT reset_version FROM reading_resets WHERE workspace_id = $1`,
    [workspaceId],
  )) as Record<string, unknown>[];
  const resetVersion = resetRows[0] ? Number(resetRows[0].reset_version) : 0;
  const behindReset = options.resetVersion !== null && options.resetVersion < resetVersion;
  const progressCursor = behindReset ? 0 : cursor;

  const [progressRows, savedPlaceRows, highlightRows] = await Promise.all([
    sql.query(
      `SELECT * FROM reading_progress
       WHERE workspace_id = $1 AND change_version > $2
       ORDER BY change_version ASC`,
      [workspaceId, progressCursor],
    ),
    sql.query(
      `SELECT * FROM saved_places
       WHERE workspace_id = $1 AND change_version > $2
       ORDER BY change_version ASC`,
      [workspaceId, cursor],
    ),
    sql.query(
      `SELECT * FROM highlights
       WHERE workspace_id = $1 AND change_version > $2
       ORDER BY change_version ASC`,
      [workspaceId, cursor],
    ),
  ]);

  const progress = (progressRows as Record<string, unknown>[]).map(mapProgress);
  const savedPlaces = (savedPlaceRows as Record<string, unknown>[]).map(mapSavedPlace);
  const highlights = (highlightRows as Record<string, unknown>[]).map(mapHighlight);
  const versions = [
    cursor,
    ...progress.map((item) => item.changeVersion),
    ...savedPlaces.map((item) => item.changeVersion),
    ...highlights.map((item) => item.changeVersion),
  ];

  return {
    cursor: Math.max(...versions),
    resetVersion,
    acknowledged: accepted.map((operation) => operation.operationId),
    errors,
    changes: { progress, savedPlaces, highlights },
    serverTime: new Date().toISOString(),
  };
}
