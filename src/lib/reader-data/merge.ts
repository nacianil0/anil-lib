import type { ReaderData, SyncMutation } from "./schema";
import type { SyncResponse } from "./sync-contract";
import type { SeriesReset } from "./series-reset";

function compareUpdates(
  a: { clientUpdatedAt: string; deviceId: string },
  b: { clientUpdatedAt: string; deviceId: string },
) {
  return (
    Date.parse(a.clientUpdatedAt) - Date.parse(b.clientUpdatedAt) ||
    a.deviceId.localeCompare(b.deviceId)
  );
}

/** Storage events are full snapshots, but must obey the same reset barriers as sync. */
export function mergeStoredReaderData(current: ReaderData, incoming: ReaderData): ReaderData {
  const next = mergeSyncResponse(current, {
    cursor: incoming.cursor,
    resetVersion: incoming.resetVersion,
    seriesResets: incoming.seriesResets,
    acknowledged: [],
    errors: [],
    changes: {
      progress: Object.values(incoming.progress).filter((record) => {
        const previous = current.progress[record.articleId];
        const newlyReset =
          incoming.resetVersion > current.resetVersion ||
          incoming.seriesResets.some(
            (reset) =>
              reset.articleIds.includes(record.articleId) &&
              reset.resetVersion >
                (current.seriesResets.find((item) => item.seriesId === reset.seriesId)
                  ?.resetVersion ?? 0),
          );
        return newlyReset || !previous || compareUpdates(record, previous) >= 0;
      }),
      savedPlaces: Object.values(incoming.savedPlaces).filter(
        (record) =>
          !current.savedPlaces[record.articleId] ||
          compareUpdates(record, current.savedPlaces[record.articleId]) >= 0,
      ),
      highlights: Object.values(incoming.highlights).filter(
        (record) =>
          !current.highlights[record.id] ||
          compareUpdates(record, current.highlights[record.id]) >= 0,
      ),
    },
    serverTime: incoming.lastSyncAt ?? current.lastSyncAt ?? new Date().toISOString(),
  });
  const operations = new Map(next.outbox.map((operation) => [mutationKey(operation), operation]));
  for (const operation of incoming.outbox) {
    if (
      operation.entityType === "progress" &&
      (incoming.resetVersion < next.resetVersion ||
        next.seriesResets.some(
          (reset) =>
            reset.articleIds.includes(operation.payload.articleId) &&
            (incoming.seriesResets.find((item) => item.seriesId === reset.seriesId)?.resetVersion ??
              0) < reset.resetVersion,
        ))
    )
      continue;
    const key = mutationKey(operation);
    const previous = operations.get(key);
    const stored =
      operation.entityType === "progress"
        ? next.progress[operation.entityId]
        : operation.entityType === "saved-place"
          ? next.savedPlaces[operation.entityId]
          : next.highlights[operation.entityId];
    if (
      (previous && compareUpdates(previous, operation) > 0) ||
      (stored && compareUpdates(stored, operation) > 0)
    )
      continue;
    operations.set(key, operation);
    // These writes were made under the incoming reset epoch. Their payload is the
    // pending local truth, including records that did not exist in this tab yet.
    if (operation.entityType === "progress") {
      next.progress[operation.payload.articleId] = {
        ...operation.payload,
        changeVersion: incoming.progress[operation.payload.articleId]?.changeVersion ?? 0,
      };
    } else if (operation.entityType === "saved-place") {
      next.savedPlaces[operation.payload.articleId] = {
        ...operation.payload,
        changeVersion: incoming.savedPlaces[operation.payload.articleId]?.changeVersion ?? 0,
      };
    } else {
      next.highlights[operation.payload.id] = {
        ...operation.payload,
        changeVersion: incoming.highlights[operation.payload.id]?.changeVersion ?? 0,
      };
    }
  }
  next.outbox = [...operations.values()];
  if (
    !next.currentArticleId &&
    incoming.currentArticleId &&
    next.progress[incoming.currentArticleId]
  ) {
    next.currentArticleId = incoming.currentArticleId;
  }
  return next;
}

/** Apply server-confirmed reset immediately, even while an older sync is in flight. */
export function applySeriesReset(current: ReaderData, reset: SeriesReset): ReaderData {
  return mergeSyncResponse(current, {
    cursor: current.cursor,
    resetVersion: current.resetVersion,
    seriesResets: [reset],
    acknowledged: [],
    errors: [],
    changes: { progress: [], savedPlaces: [], highlights: [] },
    serverTime: current.lastSyncAt ?? new Date().toISOString(),
  });
}

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
  const incomingResets = response.seriesResets ?? [];
  const resetArticles = new Set(
    incomingResets.flatMap((incoming) => {
      const previous = current.seriesResets.find((item) => item.seriesId === incoming.seriesId);
      return !options.adoptReset && incoming.resetVersion > (previous?.resetVersion ?? 0)
        ? incoming.articleIds
        : [];
    }),
  );
  const seriesResets = [...current.seriesResets];
  for (const incoming of incomingResets) {
    const index = seriesResets.findIndex((item) => item.seriesId === incoming.seriesId);
    if (index < 0) seriesResets.push(incoming);
    else if (incoming.resetVersion >= seriesResets[index].resetVersion)
      seriesResets[index] = incoming;
  }
  const staleArticles = new Set(
    current.seriesResets.flatMap((previous) => {
      const incoming = incomingResets.find((item) => item.seriesId === previous.seriesId);
      return (incoming?.resetVersion ?? 0) < previous.resetVersion ? previous.articleIds : [];
    }),
  );
  const outbox = current.outbox.filter(
    (operation) =>
      !settled.has(operation.operationId) &&
      !(
        operation.entityType === "progress" &&
        (reset || resetArticles.has(operation.payload.articleId))
      ),
  );
  const pending = new Set(outbox.map(mutationKey));
  const next: ReaderData = {
    ...current,
    cursor: Math.max(current.cursor, response.cursor),
    resetVersion: Math.max(current.resetVersion, response.resetVersion),
    seriesResets,
    currentArticleId:
      reset || resetArticles.has(current.currentArticleId ?? "") ? null : current.currentArticleId,
    outbox,
    lastSyncAt: response.serverTime,
    progress: reset ? {} : { ...current.progress },
    savedPlaces: { ...current.savedPlaces },
    highlights: { ...current.highlights },
  };
  for (const articleId of resetArticles) delete next.progress[articleId];

  for (const record of response.changes.progress) {
    if (
      response.resetVersion >= current.resetVersion &&
      !staleArticles.has(record.articleId) &&
      !pending.has(`progress:${record.articleId}`)
    )
      next.progress[record.articleId] = record;
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
