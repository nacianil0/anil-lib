import { parseProgress } from "@/lib/progress/storage";
import { emptyReaderData, type ProgressRecord, type ReaderData } from "./schema";

function validIso(value: string, fallback: string): string {
  return Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : fallback;
}

export function migrateLegacyProgress(
  rawProgress: string | null,
  deviceId = crypto.randomUUID(),
  now = new Date().toISOString(),
): ReaderData {
  const legacy = parseProgress(rawProgress);
  const next = emptyReaderData(deviceId);
  next.currentArticleId = legacy.currentArticleId;

  for (const [articleId, entry] of Object.entries(legacy.articles)) {
    const timestamp = validIso(entry.lastReadAt, now);
    const record: ProgressRecord = {
      articleId,
      headingId: entry.headingId,
      scrollRatio: entry.scrollRatio,
      completed: entry.completed,
      lastReadAt: timestamp,
      clientUpdatedAt: timestamp,
      deviceId,
      changeVersion: 0,
    };
    next.progress[articleId] = record;
    next.outbox.push({
      operationId: crypto.randomUUID(),
      entityType: "progress",
      entityId: articleId,
      operationType: "upsert",
      deviceId,
      clientUpdatedAt: timestamp,
      payload: { ...record },
    });
  }

  return next;
}
