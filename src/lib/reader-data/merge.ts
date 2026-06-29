import type { ReaderData, SyncMutation } from "./schema";
import type { SyncResponse } from "./sync-contract";

function mutationKey(mutation: SyncMutation): string {
  return `${mutation.entityType}:${mutation.entityId}`;
}

export function mergeSyncResponse(current: ReaderData, response: SyncResponse): ReaderData {
  const settled = new Set([
    ...response.acknowledged,
    ...response.errors.map((error) => error.operationId),
  ]);
  const outbox = current.outbox.filter((operation) => !settled.has(operation.operationId));
  const pending = new Set(outbox.map(mutationKey));
  const next: ReaderData = {
    ...current,
    cursor: Math.max(current.cursor, response.cursor),
    outbox,
    lastSyncAt: response.serverTime,
    progress: { ...current.progress },
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
