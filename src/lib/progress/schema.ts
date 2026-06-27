import { z } from "zod";
import { clamp } from "@/lib/utils";

/** Coerce any stored value into a valid 0..1 scroll ratio. */
export function clampRatio(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? clamp(value, 0, 1) : 0;
}

function defaultEntry(): ArticleProgress {
  return { headingId: null, scrollRatio: 0, completed: false, lastReadAt: "" };
}

export const articleProgressSchema = z
  .object({
    headingId: z.string().nullable().catch(null).default(null),
    scrollRatio: z.preprocess(clampRatio, z.number().min(0).max(1)).default(0),
    completed: z.boolean().catch(false).default(false),
    lastReadAt: z.string().catch("").default(""),
  })
  .catch(defaultEntry);

export const readerProgressSchema = z.object({
  currentArticleId: z.string().nullable().catch(null).default(null),
  articles: z.record(z.string(), articleProgressSchema).catch({}).default({}),
});

export type ArticleProgress = z.infer<typeof articleProgressSchema>;
export type ReaderProgress = z.infer<typeof readerProgressSchema>;

export function emptyProgress(): ReaderProgress {
  return { currentArticleId: null, articles: {} };
}

export function makeEntry(): ArticleProgress {
  return defaultEntry();
}
