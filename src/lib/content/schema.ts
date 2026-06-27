import { z } from "zod";

/** Controlled category vocabulary, in pedagogical order. */
export const CATEGORIES = [
  "foundations",
  "models-and-training",
  "reasoning-and-memory",
  "agents-and-retrieval",
  "safety-and-evaluation",
  "multimodal-and-future",
  "case-studies",
] as const;

/** Controlled difficulty vocabulary. */
export const LEVELS = ["beginner", "intermediate", "advanced"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Level = (typeof LEVELS)[number];

export const categorySchema = z.enum(CATEGORIES);
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

/** A single record inside content/catalog.json. */
export const catalogArticleSchema = z.object({
  articleId: articleIdSchema,
  title: z.string().min(1),
  slug: slugSchema,
  category: categorySchema,
  level: levelSchema,
  readingOrder: z.number().int().positive(),
  summary: z.string().min(1),
  tags: z.array(tagSchema).default([]),
  contentHash: contentHashSchema,
  path: z.string().min(1),
  relatedArticleIds: z.array(articleIdSchema).default([]),
  classificationBatch: z.number().int().nonnegative(),
});

export const catalogSchema = z.object({
  schemaVersion: z.literal(2),
  classificationVersion: z.number().int().positive(),
  generatedAt: z.string().min(1),
  articles: z.array(catalogArticleSchema).min(1, "katalog en az bir makale içermeli"),
});

/** Frontmatter embedded at the top of each article Markdown file (snake_case). */
export const frontmatterSchema = z.object({
  article_id: articleIdSchema,
  title: z.string().min(1),
  slug: slugSchema,
  category: categorySchema,
  level: levelSchema,
  reading_order: z.number().int().positive(),
  summary: z.string().min(1),
  tags: z.array(tagSchema).default([]),
  content_hash: contentHashSchema,
  classification_version: z.number().int().positive(),
  classification_batch: z.number().int().nonnegative(),
});

export type CatalogArticle = z.infer<typeof catalogArticleSchema>;
export type Catalog = z.infer<typeof catalogSchema>;
export type Frontmatter = z.infer<typeof frontmatterSchema>;

/** Render a ZodError into a compact, human-readable, multi-line string. */
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      return `  - ${path}: ${issue.message}`;
    })
    .join("\n");
}
