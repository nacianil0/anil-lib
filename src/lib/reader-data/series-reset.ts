import { z } from "zod";

export const seriesIdSchema = z.enum(["ai", "boun"]);
export type SeriesId = z.infer<typeof seriesIdSchema>;

export const seriesResetSchema = z.object({
  seriesId: seriesIdSchema,
  resetVersion: z.number().int().nonnegative(),
  articleIds: z.array(z.string().min(1).max(100)).max(1_000),
});
export type SeriesReset = z.infer<typeof seriesResetSchema>;

export const seriesResetRequestSchema = z.object({ seriesId: seriesIdSchema }).strict();
export const seriesResetResponseSchema = z.object({
  reset: seriesResetSchema,
  progress: z.number().int().nonnegative(),
});

export const seriesResetVersionsSchema = z.object({
  ai: z.number().int().nonnegative().optional(),
  boun: z.number().int().nonnegative().optional(),
});

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
