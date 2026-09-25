import { z } from "zod";

/**
 * Controlled category vocabulary of the main library and the AI series,
 * in pedagogical order.
 */
export const CATEGORIES = [
  "foundations",
  "models-and-training",
  "reasoning-and-memory",
  "agents-and-retrieval",
  "safety-and-evaluation",
  "multimodal-and-future",
  "case-studies",
] as const;

/**
 * BOUN serisinin kendi kontrollü kategori sözlüğü (docs/seri-boun/SOZLESME.md §5).
 * Ana kütüphanenin ve AI serisinin sözlüğü değişmez; şema seri başına genişletilir.
 */
export const BOUN_CATEGORIES = [
  "interview-method",
  "discrete-math",
  "data-structures",
  "algorithms",
  "operating-systems",
  "supporting-fundamentals",
] as const;

/** Every category a reader-facing article can carry, across all series. */
export const ALL_CATEGORIES = [...CATEGORIES, ...BOUN_CATEGORIES] as const;

/** Controlled difficulty vocabulary. */
export const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export type LibraryCategory = (typeof CATEGORIES)[number];
export type BounCategory = (typeof BOUN_CATEGORIES)[number];
export type Category = (typeof ALL_CATEGORIES)[number];
export type Level = (typeof LEVELS)[number];

export const categorySchema = z.enum(CATEGORIES);
export const bounCategorySchema = z.enum(BOUN_CATEGORIES);
export const allCategorySchema = z.enum(ALL_CATEGORIES);
export const levelSchema = z.enum(LEVELS);

const articleIdSchema = z
  .string()
  .regex(
    /^article_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    "articleId 'article_' ön ekli kalıcı bir UUID olmalı",
  );

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug yalnızca küçük harf kebab-case olmalı");

const contentHashSchema = z
  .string()
  .regex(/^sha256:[0-9a-f]{64}$/, "contentHash 'sha256:' + 64 haneli küçük harf hex olmalı");

const tagSchema = z.string().min(1);

/** True for a real calendar day written as YYYY-MM-DD (rejects 2026-02-30). */
function isCalendarDate(value: string): boolean {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/**
 * The day an article was meaningfully revised. Unquoted YAML dates arrive as Date
 * objects, so both shapes resolve to the same YYYY-MM-DD string.
 */
const revisionDateSchema = z.preprocess(
  (value) =>
    value instanceof Date && !Number.isNaN(value.getTime())
      ? value.toISOString().slice(0, 10)
      : value,
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "revizyon tarihi YYYY-MM-DD biçiminde olmalı")
    .refine(isCalendarDate, "revizyon tarihi geçerli bir takvim günü olmalı"),
);

/** One calm, reader-facing sentence about what changed. */
const revisionNoteSchema = z.string().trim().min(1).max(200);

/**
 * A revision is a date and a note together: a date alone tells the reader nothing,
 * a note alone cannot say whether they read the article before it.
 */
function revisionPairIssue(date: unknown, note: unknown): string | null {
  return (date === undefined) === (note === undefined)
    ? null
    : "revizyon tarihi ve notu birlikte verilmeli";
}

/**
 * A single catalog record. The category vocabulary is a parameter so each series
 * enforces its own controlled list while every other field stays identical.
 */
function makeCatalogArticleSchema<T extends z.ZodTypeAny>(category: T) {
  return z
    .object({
      articleId: articleIdSchema,
      title: z.string().min(1),
      slug: slugSchema,
      category,
      level: levelSchema,
      readingOrder: z.number().int().positive(),
      summary: z.string().min(1),
      tags: z.array(tagSchema).default([]),
      contentHash: contentHashSchema,
      path: z.string().min(1),
      relatedArticleIds: z.array(articleIdSchema).default([]),
      classificationBatch: z.number().int().nonnegative(),
      revisedAt: revisionDateSchema.optional(),
      revisionNote: revisionNoteSchema.optional(),
    })
    .superRefine((article, ctx) => {
      const issue = revisionPairIssue(article.revisedAt, article.revisionNote);
      if (issue) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["revisedAt"], message: issue });
    });
}

function makeCatalogSchema<T extends z.ZodTypeAny>(category: T) {
  return z.object({
    schemaVersion: z.literal(2),
    classificationVersion: z.number().int().positive(),
    generatedAt: z.string().min(1),
    articles: z
      .array(makeCatalogArticleSchema(category))
      .min(1, "katalog en az bir makale içermeli"),
  });
}

/** Frontmatter embedded at the top of each article Markdown file (snake_case). */
function makeFrontmatterSchema<T extends z.ZodTypeAny>(category: T) {
  return z
    .object({
      article_id: articleIdSchema,
      title: z.string().min(1),
      slug: slugSchema,
      category,
      level: levelSchema,
      reading_order: z.number().int().positive(),
      summary: z.string().min(1),
      tags: z.array(tagSchema).default([]),
      content_hash: contentHashSchema,
      classification_version: z.number().int().positive(),
      classification_batch: z.number().int().nonnegative(),
      revised_at: revisionDateSchema.optional(),
      revision_note: revisionNoteSchema.optional(),
    })
    .superRefine((fm, ctx) => {
      const issue = revisionPairIssue(fm.revised_at, fm.revision_note);
      if (issue) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["revised_at"], message: issue });
    });
}

/** Main library + AI series: content/catalog.json, content/series/catalog.json. */
export const catalogArticleSchema = makeCatalogArticleSchema(categorySchema);
export const catalogSchema = makeCatalogSchema(categorySchema);
export const frontmatterSchema = makeFrontmatterSchema(categorySchema);

/** BOUN series: content/series-boun/catalog.json. */
export const bounCatalogArticleSchema = makeCatalogArticleSchema(bounCategorySchema);
export const bounCatalogSchema = makeCatalogSchema(bounCategorySchema);
export const bounFrontmatterSchema = makeFrontmatterSchema(bounCategorySchema);

const anyCatalogArticleSchema = makeCatalogArticleSchema(allCategorySchema);
const anyCatalogSchema = makeCatalogSchema(allCategorySchema);
const anyFrontmatterSchema = makeFrontmatterSchema(allCategorySchema);

/**
 * Series-agnostic shapes. Every per-series schema above is a narrowing of these,
 * so a validated catalog of any series is assignable to `Catalog`.
 */
export type CatalogArticle = z.infer<typeof anyCatalogArticleSchema>;
export type Catalog = z.infer<typeof anyCatalogSchema>;
export type Frontmatter = z.infer<typeof anyFrontmatterSchema>;

/** Render a ZodError into a compact, human-readable, multi-line string. */
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      return `  - ${path}: ${issue.message}`;
    })
    .join("\n");
}
