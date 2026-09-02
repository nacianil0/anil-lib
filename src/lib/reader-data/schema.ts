import { z } from "zod";
import { clampRatio } from "@/lib/progress/schema";

const isoDate = z.string().datetime({ offset: true });
const nullableIsoDate = isoDate.nullable().default(null);

/**
 * A resolvable reading position inside an article.
 *
 * `headingId` + `scrollRatio` alone only ever restore a reader to the top of the
 * last heading they passed. This anchor pins the paragraph that was at the top of
 * the reading viewport, plus how far into that paragraph the reader had got, so the
 * position survives a font-size, line-height, measure, viewport or theme change —
 * anything that reflows the text but leaves the words in place.
 *
 * The shape is deliberately the same context-anchor the highlights already use, so
 * `resolveTextAnchor` resolves both.
 */
export const readingAnchorSchema = z.object({
  /** Text of the anchored block, from its start, capped so a blob stays small. */
  exactText: z.string().min(1).max(400),
  prefixText: z.string().max(120).default(""),
  suffixText: z.string().max(120).default(""),
  /** Index of the block among the article's `p, li, blockquote` elements. */
  blockIndex: z.number().int().nonnegative().default(0),
  /** How much of that block was already read, 0..1. Survives reflow; pixels do not. */
  blockOffset: z.preprocess(clampRatio, z.number().min(0).max(1)).default(0),
});

export type ReadingAnchor = z.infer<typeof readingAnchorSchema>;

/** An absent or unparsable anchor degrades to `null` rather than rejecting the record. */
const optionalAnchor = readingAnchorSchema.nullable().catch(null).default(null);

export const progressRecordSchema = z.object({
  articleId: z.string().min(1).max(100),
  headingId: z.string().max(200).nullable().default(null),
  scrollRatio: z.preprocess(clampRatio, z.number().min(0).max(1)).default(0),
  anchor: optionalAnchor,
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
  anchor: optionalAnchor,
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
  /**
   * Account this blob belongs to. Storage keys are already namespaced by it; the
   * field is a second check so a mismatched blob is discarded rather than rendered.
   */
  workspaceId: z.string().min(1),
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

export function emptyReaderData(
  workspaceId: string,
  deviceId = crypto.randomUUID(),
): ReaderData {
  return {
    version: 2,
    workspaceId,
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
