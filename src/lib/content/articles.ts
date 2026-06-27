import { readFileSync } from "node:fs";
import type { ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";

import { getArticleBySlug, loadCatalog, resolveArticlePath } from "./catalog";
import { formatZodError, frontmatterSchema, type CatalogArticle, type Frontmatter } from "./schema";
import { mdxComponents } from "@/components/reader/markdown-components";
import type { CurrentArticle } from "./types";

const WORDS_PER_MINUTE = 200;

/**
 * Build a fresh Markdown → React processor.
 *
 * `remark-rehype` runs without `allowDangerousHtml`, so any raw HTML embedded in
 * an article is dropped rather than injected into the DOM. A new instance per
 * call keeps parallel static generation free of shared mutable state.
 */
function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeReact, { Fragment, jsx, jsxs, components: mdxComponents });
}

export function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Fail the build when the catalog record and the file frontmatter disagree. */
function assertCatalogMatch(meta: CatalogArticle, fm: Frontmatter): void {
  const mismatches: string[] = [];
  const compare = (field: string, catalogValue: unknown, fmValue: unknown) => {
    if (catalogValue !== fmValue) {
      mismatches.push(`${field}: katalog "${String(catalogValue)}" ≠ frontmatter "${String(fmValue)}"`);
    }
  };

  compare("article_id", meta.articleId, fm.article_id);
  compare("title", meta.title, fm.title);
  compare("slug", meta.slug, fm.slug);
  compare("category", meta.category, fm.category);
  compare("level", meta.level, fm.level);
  compare("reading_order", meta.readingOrder, fm.reading_order);
  compare("content_hash", meta.contentHash, fm.content_hash);

  if (mismatches.length > 0) {
    throw new Error(
      `[content] Katalog ile frontmatter uyuşmuyor (${meta.path}):\n  - ${mismatches.join("\n  - ")}`,
    );
  }
}

export type RenderedArticle = {
  meta: CurrentArticle;
  content: ReactNode;
};

/**
 * Load, validate, and render an article for a given slug.
 * Returns null for an unknown slug so the route can call notFound().
 */
export async function renderArticleBySlug(slug: string): Promise<RenderedArticle | null> {
  const article = getArticleBySlug(slug);
  if (!article) return null;

  const absolutePath = resolveArticlePath(article.path);
  let file: string;
  try {
    file = readFileSync(absolutePath, "utf8");
  } catch {
    throw new Error(`[content] Makale dosyası okunamadı: ${article.path}`);
  }

  const { content: body, data } = matter(file);
  const parsedFrontmatter = frontmatterSchema.safeParse(data);
  if (!parsedFrontmatter.success) {
    throw new Error(
      `[content] Frontmatter geçersiz (${article.path}):\n${formatZodError(parsedFrontmatter.error)}`,
    );
  }
  assertCatalogMatch(article, parsedFrontmatter.data);

  const processed = await createProcessor().process(body);
  const content = processed.result as ReactNode;

  const meta: CurrentArticle = {
    articleId: article.articleId,
    slug: article.slug,
    title: article.title,
    category: article.category,
    level: article.level,
    readingOrder: article.readingOrder,
    summary: article.summary,
    tags: article.tags,
    readingMinutes: estimateReadingMinutes(body),
    totalCount: loadCatalog().articles.length,
    classificationBatch: article.classificationBatch,
  };

  return { meta, content };
}
