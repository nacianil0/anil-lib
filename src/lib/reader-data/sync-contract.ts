import { z } from "zod";
import {
  highlightRecordSchema,
  progressRecordSchema,
  savedPlaceRecordSchema,
  syncMutationSchema,
} from "./schema";

/**
 * `resetVersion` is the last progress reset this device has applied (0 = none). A
 * request that is behind the account's current reset carries progress written on
 * top of reading state that no longer exists, so the server does not apply it.
 * `null` is a device holding no progress from before (a new browser): nothing it
 * sends can predate a reset, so it is applied, and the device adopts the version.
 * Defaults keep an older client — which may hold old progress — and an older
 * server's response parseable.
 */
export const syncRequestSchema = z.object({
  cursor: z.number().int().nonnegative().default(0),
  resetVersion: z.number().int().nonnegative().nullable().default(0),
  operations: z.array(syncMutationSchema).max(100).default([]),
});

export const syncOperationErrorSchema = z.object({
  operationId: z.string().uuid(),
  code: z.enum(["unknown_article", "invalid_operation", "timestamp_out_of_range"]),
});

export const syncResponseSchema = z.object({
  cursor: z.number().int().nonnegative(),
  /** The account's latest progress reset (0 = never reset). */
  resetVersion: z.number().int().nonnegative().default(0),
  acknowledged: z.array(z.string().uuid()),
  errors: z.array(syncOperationErrorSchema),
  changes: z.object({
    progress: z.array(progressRecordSchema),
    savedPlaces: z.array(savedPlaceRecordSchema),
    highlights: z.array(highlightRecordSchema),
  }),
  serverTime: z.string().datetime({ offset: true }),
});

export type SyncRequest = z.infer<typeof syncRequestSchema>;
export type SyncResponse = z.infer<typeof syncResponseSchema>;
