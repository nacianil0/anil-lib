import "server-only";

import type { NeonQueryFunction } from "@neondatabase/serverless";
import { loadCatalog } from "@/lib/content/catalog";
import type {
  HighlightRecord,
  ProgressRecord,
  SavedPlaceRecord,
  SyncMutation,
} from "@/lib/reader-data/schema";
import type { SyncOperationError, SyncResponse } from "@/lib/reader-data/server/types";

type SqlClient = NeonQueryFunction<false, false>;

const MAX_FUTURE_SKEW_MS = 5 * 60 * 1000;

function validArticleIds(): Set<string> {
  return new Set(loadCatalog().articles.map((article) => article.articleId));
}

function timestampIsValid(value: string, now: number): boolean {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && parsed <= now + MAX_FUTURE_SKEW_MS;
}

function progressQuery(sql: SqlClient, workspaceId: string, mutation: SyncMutation) {
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
       (workspace_id, article_id, heading_id, scroll_ratio, completed, last_read_at,
        client_updated_at, device_id)
     SELECT $1, $4, $5, $6, $7, $8::timestamptz, $9::timestamptz, $3::uuid
     WHERE EXISTS (SELECT 1 FROM accepted)
     ON CONFLICT (workspace_id, article_id) DO UPDATE SET
       heading_id = EXCLUDED.heading_id,
       scroll_ratio = EXCLUDED.scroll_ratio,
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
       (workspace_id, article_id, heading_id, scroll_ratio, preview_text,
        client_updated_at, device_id, deleted_at)
     SELECT $1, $4, $6, $7, $8, $9::timestamptz, $3::uuid, $10::timestamptz
     WHERE EXISTS (SELECT 1 FROM accepted)
     ON CONFLICT (workspace_id, article_id) DO UPDATE SET
       heading_id = EXCLUDED.heading_id,
       scroll_ratio = EXCLUDED.scroll_ratio,
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
): Promise<SyncResponse> {
  const now = Date.now();
  const articleIds = validArticleIds();
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

  const queries = accepted.map((operation) => {
    if (operation.entityType === "progress") return progressQuery(sql, workspaceId, operation);
    if (operation.entityType === "saved-place") {
      return savedPlaceQuery(sql, workspaceId, operation);
    }
    return highlightQuery(sql, workspaceId, operation);
  });
  if (queries.length > 0) await sql.transaction(queries);

  const [progressRows, savedPlaceRows, highlightRows] = await Promise.all([
    sql.query(
      `SELECT * FROM reading_progress
       WHERE workspace_id = $1 AND change_version > $2
       ORDER BY change_version ASC`,
      [workspaceId, cursor],
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
    acknowledged: accepted.map((operation) => operation.operationId),
    errors,
    changes: { progress, savedPlaces, highlights },
    serverTime: new Date().toISOString(),
  };
}
