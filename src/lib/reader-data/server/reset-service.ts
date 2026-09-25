import "server-only";

import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { ReaderUser } from "@/lib/auth/user-schema";

type SqlClient = NeonQueryFunction<false, false>;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Written as the device of the tombstones a reset leaves on saved places and
 * highlights. Any fixed uuid works: it only breaks ties between equal timestamps.
 */
export const RESET_DEVICE_ID = "00000000-0000-4000-8000-000000000001";

/**
 * Raised when a non-owner reaches this module. Thrown before any query runs, so the
 * authorization does not depend on the caller having checked first.
 */
export class ResetNotAllowedError extends Error {
  constructor() {
    super("owner_only");
    this.name = "ResetNotAllowedError";
  }
}

export type ResetScope = {
  /** Also remove the account's saved places (yer imleri). */
  savedPlaces: boolean;
  /** Also remove the account's highlights (işaretler). */
  highlights: boolean;
};

export type ResetResult = {
  resetVersion: number;
  progress: number;
  savedPlaces: number;
  highlights: number;
};

function countOf(rows: unknown): number {
  const first = (rows as Record<string, unknown>[] | undefined)?.[0];
  return first ? Number(first.count) : 0;
}

/**
 * Starts an account's reading over: every progress row (completion, percentage,
 * reading position) is removed and the account's reset version moves forward, so each
 * device clears its own copy on its next sync (see `mergeSyncResponse`) and a device
 * that has not caught up yet cannot write stale progress back.
 *
 * Saved places and highlights are reader-authored and only go when asked for. They
 * are tombstoned rather than deleted, which is how every device already learns that
 * one was removed.
 *
 * One transaction. The table lock makes a progress write that is already in flight
 * either land before the delete (and be removed by it) or wait and see the new reset.
 */
export async function resetReadingProgress(
  sql: SqlClient,
  actor: ReaderUser | null,
  workspaceId: string,
  scope: ResetScope,
): Promise<ResetResult> {
  if (!actor || actor.role !== "owner") throw new ResetNotAllowedError();

  const resetBy = UUID_PATTERN.test(actor.id) ? actor.id : null;
  const queries = [
    sql.query(`LOCK TABLE reading_progress IN SHARE ROW EXCLUSIVE MODE`),
    sql.query(
      `INSERT INTO reading_resets (workspace_id, reset_version, reset_at, reset_by)
       VALUES ($1, nextval('reader_change_version_seq'), now(), $2::uuid)
       ON CONFLICT (workspace_id) DO UPDATE SET
         reset_version = EXCLUDED.reset_version,
         reset_at = EXCLUDED.reset_at,
         reset_by = EXCLUDED.reset_by
       RETURNING reset_version`,
      [workspaceId, resetBy],
    ),
    sql.query(
      `WITH removed AS (
         DELETE FROM reading_progress WHERE workspace_id = $1 RETURNING 1
       )
       SELECT count(*)::int AS count FROM removed`,
      [workspaceId],
    ),
  ];
  if (scope.savedPlaces) {
    queries.push(
      sql.query(
        `WITH removed AS (
           UPDATE saved_places SET
             deleted_at = now(),
             client_updated_at = now(),
             server_updated_at = now(),
             device_id = $2::uuid,
             change_version = nextval('reader_change_version_seq')
           WHERE workspace_id = $1 AND deleted_at IS NULL
           RETURNING 1
         )
         SELECT count(*)::int AS count FROM removed`,
        [workspaceId, RESET_DEVICE_ID],
      ),
    );
  }
  if (scope.highlights) {
    queries.push(
      sql.query(
        `WITH removed AS (
           UPDATE highlights SET
             deleted_at = now(),
             client_updated_at = now(),
             server_updated_at = now(),
             device_id = $2::uuid,
             change_version = nextval('reader_change_version_seq')
           WHERE workspace_id = $1 AND deleted_at IS NULL
           RETURNING 1
         )
         SELECT count(*)::int AS count FROM removed`,
        [workspaceId, RESET_DEVICE_ID],
      ),
    );
  }

  const results = (await sql.transaction(queries)) as unknown[];
  const resetRow = (results[1] as Record<string, unknown>[] | undefined)?.[0];
  let next = 3;
  return {
    resetVersion: resetRow ? Number(resetRow.reset_version) : 0,
    progress: countOf(results[2]),
    savedPlaces: scope.savedPlaces ? countOf(results[next++]) : 0,
    highlights: scope.highlights ? countOf(results[next++]) : 0,
  };
}
