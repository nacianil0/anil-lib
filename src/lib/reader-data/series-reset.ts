import { z } from "zod";

/**
 * Every series whose reading can be reset on its own. Each schema below is derived
 * from this list, and the server maps every id to its catalog through a `Record`, so
 * adding a series here does not compile until that mapping exists.
 */
export const SERIES_IDS = ["ai", "boun", "guvenlik"] as const;

export const seriesIdSchema = z.enum(SERIES_IDS);
export type SeriesId = z.infer<typeof seriesIdSchema>;

export const seriesResetSchema = z.object({
  seriesId: seriesIdSchema,
  resetVersion: z.number().int().nonnegative(),
  articleIds: z.array(z.string().min(1).max(100)).max(1_000),
});
export type SeriesReset = z.infer<typeof seriesResetSchema>;

/**
 * Series resets as a device stores them and as the server reports them. An entry for a
 * series this build does not know — written by a newer build before a rollback, or sent
 * by a newer server to a page loaded before a deploy — is dropped rather than failing
 * the whole value: failing it would discard the device's stored reading data, or reject
 * every sync response, over a series this build cannot show anyway.
 */
export const seriesResetListSchema = z.preprocess(
  (value) =>
    Array.isArray(value)
      ? value.filter(
          (entry) =>
            seriesIdSchema.safeParse((entry as { seriesId?: unknown } | null)?.seriesId).success,
        )
      : value,
  z.array(seriesResetSchema).max(SERIES_IDS.length),
);

export const seriesResetRequestSchema = z.object({ seriesId: seriesIdSchema }).strict();
export const seriesResetResponseSchema = z.object({
  reset: seriesResetSchema,
  progress: z.number().int().nonnegative(),
});

const resetVersionSchema = z.number().int().nonnegative().optional();

/**
 * The last reset of each series a device has applied. Built from SERIES_IDS: a key missing
 * here would be stripped from every request, and the server would then treat that series'
 * progress as written before its latest reset and never apply it.
 */
export const seriesResetVersionsSchema = z.object(
  Object.fromEntries(SERIES_IDS.map((seriesId) => [seriesId, resetVersionSchema])) as {
    [K in SeriesId]: typeof resetVersionSchema;
  },
);

export function resetVersionForArticle(
  data: { resetVersion: number; seriesResets: SeriesReset[] },
  articleId: string,
): number {
  return Math.max(
    data.resetVersion,
    ...data.seriesResets
      .filter((reset) => reset.articleIds.includes(articleId))
      .map((reset) => reset.resetVersion),
  );
}
