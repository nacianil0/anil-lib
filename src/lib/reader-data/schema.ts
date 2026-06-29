import { z } from "zod";
import { clampRatio } from "@/lib/progress/schema";

const isoDate = z.string().datetime({ offset: true });
const nullableIsoDate = isoDate.nullable().default(null);

export const progressRecordSchema = z.object({
  articleId: z.string().min(1).max(100),
  headingId: z.string().max(200).nullable().default(null),
  scrollRatio: z.preprocess(clampRatio, z.number().min(0).max(1)).default(0),
  completed: z.boolean().default(false),
  lastReadAt: isoDate,
  clientUpdatedAt: isoDate,
  deviceId: z.string().uuid(),
  changeVersion: z.number().int().nonnegative().default(0),
});

export const savedPlaceRecordSchema = z.object({
  articleId: z.string().min(1).max(100),
  headingId: z.string().max(200).nullable().default(null),
  scrollRatio: z.preprocess(clampRatio, z.number().min(0).max(1)).default(0),
  previewText: z.string().max(280).default(""),
  clientUpdatedAt: isoDate,
  deviceId: z.string().uuid(),
  deletedAt: nullableIsoDate,
  changeVersion: z.number().int().nonnegative().default(0),
});

export const textAnchorSchema = z.object({
  exactText: z.string().min(1).max(2_000),
  prefixText: z.string().max(120).default(""),
  suffixText: z.string().max(120).default(""),
  headingId: z.string().max(200).nullable().default(null),
  blockIndex: z.number().int().nonnegative().default(0),
  startOffset: z.number().int().nonnegative().default(0),
  endOffset: z.number().int().nonnegative().default(0),
});

export const highlightRecordSchema = z
  .object({
    id: z.string().uuid(),
    articleId: z.string().min(1).max(100),
    createdAt: isoDate,
    clientUpdatedAt: isoDate,
    deviceId: z.string().uuid(),
    deletedAt: nullableIsoDate,
    changeVersion: z.number().int().nonnegative().default(0),
  })
  .merge(textAnchorSchema);

export const progressMutationSchema = z.object({
  operationId: z.string().uuid(),
  entityType: z.literal("progress"),
  entityId: z.string().min(1).max(100),
  operationType: z.literal("upsert"),
  deviceId: z.string().uuid(),
  clientUpdatedAt: isoDate,
  payload: progressRecordSchema.omit({ changeVersion: true }),
});

export const savedPlaceMutationSchema = z.object({
  operationId: z.string().uuid(),
  entityType: z.literal("saved-place"),
  entityId: z.string().min(1).max(100),
  operationType: z.enum(["upsert", "delete"]),
  deviceId: z.string().uuid(),
  clientUpdatedAt: isoDate,
  payload: savedPlaceRecordSchema.omit({ changeVersion: true }),
});

export const highlightMutationSchema = z.object({
  operationId: z.string().uuid(),
  entityType: z.literal("highlight"),
  entityId: z.string().uuid(),
  operationType: z.enum(["upsert", "delete"]),
  deviceId: z.string().uuid(),
  clientUpdatedAt: isoDate,
  payload: highlightRecordSchema.omit({ changeVersion: true }),
});

export const syncMutationSchema = z.discriminatedUnion("entityType", [
  progressMutationSchema,
  savedPlaceMutationSchema,
  highlightMutationSchema,
]);

export const readerDataSchema = z.object({
  version: z.literal(2),
  deviceId: z.string().uuid(),
  cursor: z.number().int().nonnegative().default(0),
  currentArticleId: z.string().nullable().default(null),
  progress: z.record(z.string(), progressRecordSchema).default({}),
  savedPlaces: z.record(z.string(), savedPlaceRecordSchema).default({}),
  highlights: z.record(z.string(), highlightRecordSchema).default({}),
  outbox: z.array(syncMutationSchema).max(1_000).default([]),
  lastSyncAt: isoDate.nullable().default(null),
});

export type ProgressRecord = z.infer<typeof progressRecordSchema>;
export type SavedPlaceRecord = z.infer<typeof savedPlaceRecordSchema>;
export type TextAnchor = z.infer<typeof textAnchorSchema>;
export type HighlightRecord = z.infer<typeof highlightRecordSchema>;
export type SyncMutation = z.infer<typeof syncMutationSchema>;
export type ReaderData = z.infer<typeof readerDataSchema>;

export function emptyReaderData(deviceId = crypto.randomUUID()): ReaderData {
  return {
    version: 2,
    deviceId,
    cursor: 0,
    currentArticleId: null,
    progress: {},
    savedPlaces: {},
    highlights: {},
    outbox: [],
    lastSyncAt: null,
  };
}
