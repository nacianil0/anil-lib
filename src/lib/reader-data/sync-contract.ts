import { z } from "zod";
import {
  highlightRecordSchema,
  progressRecordSchema,
  savedPlaceRecordSchema,
  syncMutationSchema,
} from "./schema";

export const syncRequestSchema = z.object({
  cursor: z.number().int().nonnegative().default(0),
  operations: z.array(syncMutationSchema).max(100).default([]),
});

export const syncOperationErrorSchema = z.object({
  operationId: z.string().uuid(),
  code: z.enum(["unknown_article", "invalid_operation", "timestamp_out_of_range"]),
});

export const syncResponseSchema = z.object({
  cursor: z.number().int().nonnegative(),
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
