import type { ReaderData, SyncMutation } from "./schema";
import type { SyncResponse } from "./sync-contract";

function mutationKey(mutation: SyncMutation): string {
  return `${mutation.entityType}:${mutation.entityId}`;
}

/**
 * `adoptReset`: the request came from a device with no progress from before (see
 * `holdsNoPriorProgress`), which the server treated as current. Its reset version is
 * taken over without clearing anything.
 */
export function mergeSyncResponse(
  current: ReaderData,
  response: SyncResponse,
  options: { adoptReset?: boolean } = {},
): ReaderData {
  const settled = new Set([
    ...response.acknowledged,
    ...response.errors.map((error) => error.operationId),
  ]);
  // The account's reading progress was reset after this device last synced. Every
  // progress record held here predates the reset, and every pending progress write
  // was made on top of it, so both are dropped; the server has already discarded
  // them. Progress written since the reset arrives in `changes` like any other row.
  // Saved places and highlights are not progress and are left to their own sync.
  const reset = !options.adoptReset && response.resetVersion > current.resetVersion;
  const outbox = current.outbox.filter(
    (operation) =>
      !settled.has(operation.operationId) && !(reset && operation.entityType === "progress"),
  );
  const pending = new Set(outbox.map(mutationKey));
  const next: ReaderData = {
    ...current,
    cursor: Math.max(current.cursor, response.cursor),
    resetVersion: Math.max(current.resetVersion, response.resetVersion),
    currentArticleId: reset ? null : current.currentArticleId,
    outbox,
    lastSyncAt: response.serverTime,
    progress: reset ? {} : { ...current.progress },
    savedPlaces: { ...current.savedPlaces },
    highlights: { ...current.highlights },
  };

  for (const record of response.changes.progress) {
    if (!pending.has(`progress:${record.articleId}`)) next.progress[record.articleId] = record;
  }
  for (const record of response.changes.savedPlaces) {
    if (!pending.has(`saved-place:${record.articleId}`)) {
      next.savedPlaces[record.articleId] = record;
    }
  }
  for (const record of response.changes.highlights) {
    if (!pending.has(`highlight:${record.id}`)) next.highlights[record.id] = record;
  }

  if (!next.currentArticleId) {
    next.currentArticleId =
      Object.values(next.progress).sort((a, b) => b.lastReadAt.localeCompare(a.lastReadAt))[0]
        ?.articleId ?? null;
  }
  return next;
}
