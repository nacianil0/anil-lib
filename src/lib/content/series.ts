import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";

import {
  catalogSchema,
  formatZodError,
  frontmatterSchema,
  type Catalog,
  type CatalogArticle,
} from "./schema";
import {
  assertContiguousReadingOrder,
  assertUnique,
  assertValidClassificationBatches,
  toDescriptor,
} from "./catalog";
import { assertCatalogMatch, estimateReadingMinutes } from "./articles";
import { rehypeInlineSvg } from "./rehype-inline-svg";
import { mdxComponents } from "@/components/reader/markdown-components";
import type { AdjacentArticle, ArticleDescriptor, CurrentArticle } from "./types";

/**
 * "Sıfırdan Yüze" serisinin içerik sözleşmesi. Ana kütüphaneyle aynı şema ve
 * invariantları kullanır; yalnızca kök dizinleri ve rota tabanı farklıdır.
 * Kurallar: docs/seri/SOZLESME.md.
 */
const SERIES_DIR = path.join(process.cwd(), "content", "series");
const SERIES_ARTICLES_DIR = path.join(SERIES_DIR, "articles");
const SERIES_ASSETS_DIR = path.join(SERIES_DIR, "assets");
const SERIES_CATALOG_PATH = path.join(SERIES_DIR, "catalog.json");

export const SERIES_BASE_PATH = "/seri";
export const SERIES_TITLE = "Sıfırdan Yüze: Yapay Zekâ";
export const SERIES_SUBTITLE =
  "Sıfırdan başlayıp araştırmacı ve mühendis derinliğine uzanan yaşayan öğrenme yolculuğu.";

let cached: Catalog | null = null;

/** Resolve a catalog `path` to a safe absolute path inside content/series/articles. */
export function resolveSeriesArticlePath(relPath: string): string {
  if (!relPath.startsWith("content/series/articles/")) {
    throw new Error(
      `[series] Güvensiz makale yolu (content/series/articles/ dışında): ${relPath}`,
    );
  }
  const absolute = path.resolve(process.cwd(), relPath);
  const relativeToArticles = path.relative(SERIES_ARTICLES_DIR, absolute);
  if (
    relativeToArticles.startsWith("..") ||
    path.isAbsolute(relativeToArticles) ||
    relativeToArticles.includes(`..${path.sep}`)
  ) {
    throw new Error(`[series] Makale yolu seri klasörünün dışına çıkıyor: ${relPath}`);
  }
  return absolute;
}

/** Diyagram klasörü: content/series/assets/<slug>/ */
export function resolveSeriesAssetsDir(slug: string): string {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`[series] Geçersiz slug: ${slug}`);
  }
  return path.join(SERIES_ASSETS_DIR, slug);
}

/** Validate raw JSON against the shared catalog schema plus series invariants. */
export function validateSeriesCatalog(input: unknown): Catalog {
  const result = catalogSchema.safeParse(input);
  if (!result.success) {
    throw new Error(
      `[series] series/catalog.json şeması geçersiz:\n${formatZodError(result.error)}`,
    );
  }
  const catalog = result.data;

  assertUnique(
    catalog.articles.map((a) => a.articleId),
    "articleId",
  );
  assertUnique(
    catalog.articles.map((a) => a.slug),
    "slug",
  );
  assertUnique(
    catalog.articles.map((a) => a.path),
    "path",
  );
  assertUnique(
    catalog.articles.map((a) => a.readingOrder),
    "readingOrder",
  );
  assertContiguousReadingOrder(catalog.articles.map((a) => a.readingOrder));
  assertValidClassificationBatches(catalog.articles);

  for (const article of catalog.articles) {
    resolveSeriesArticlePath(article.path);
  }

  const ids = new Set(catalog.articles.map((a) => a.articleId));
  for (const article of catalog.articles) {
    for (const relatedId of article.relatedArticleIds) {
      if (!ids.has(relatedId)) {
        throw new Error(`[series] ${article.slug}: relatedArticleId katalogda yok: ${relatedId}`);
      }
    }
  }

  return catalog;
}

export function loadSeriesCatalog(): Catalog {
  if (cached) return cached;

  let raw: string;
  try {
    raw = readFileSync(SERIES_CATALOG_PATH, "utf8");
  } catch {
    throw new Error(`[series] ${SERIES_CATALOG_PATH} okunamadı.`);
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `[series] series/catalog.json parse edilemedi: ${(error as Error).message}`,
    );
  }

  cached = validateSeriesCatalog(json);
  return cached;
}

export function getSeriesOrderedArticles(): CatalogArticle[] {
  return [...loadSeriesCatalog().articles].sort((a, b) => a.readingOrder - b.readingOrder);
}

export function getSeriesDescriptors(): ArticleDescriptor[] {
  return getSeriesOrderedArticles().map(toDescriptor);
}

export function getSeriesArticleBySlug(slug: string): CatalogArticle | null {
  return getSeriesOrderedArticles().find((article) => article.slug === slug) ?? null;
}

export function getSeriesAdjacent(slug: string): {
  prev: AdjacentArticle;
  next: AdjacentArticle;
} {
  const ordered = getSeriesOrderedArticles();
  const index = ordered.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const toLink = (article: CatalogArticle | undefined): AdjacentArticle =>
    article
      ? { slug: article.slug, title: article.title, readingOrder: article.readingOrder }
      : null;

  return {
    prev: toLink(ordered[index - 1]),
    next: toLink(ordered[index + 1]),
  };
}

export type RenderedSeriesArticle = {
  meta: CurrentArticle;
  content: ReactNode;
};

/**
 * Load, validate, and render a series article for a given slug.
 * Returns null for an unknown slug so the route can call notFound().
 */
export async function renderSeriesArticleBySlug(
  slug: string,
): Promise<RenderedSeriesArticle | null> {
  const article = getSeriesArticleBySlug(slug);
  if (!article) return null;

  const absolutePath = resolveSeriesArticlePath(article.path);
  let file: string;
  try {
    file = readFileSync(absolutePath, "utf8");
  } catch {
    throw new Error(`[series] Makale dosyası okunamadı: ${article.path}`);
  }

  const { content: body, data } = matter(file);
  const parsedFrontmatter = frontmatterSchema.safeParse(data);
  if (!parsedFrontmatter.success) {
    throw new Error(
      `[series] Frontmatter geçersiz (${article.path}):\n${formatZodError(parsedFrontmatter.error)}`,
    );
  }
  assertCatalogMatch(
    article,
    parsedFrontmatter.data,
    loadSeriesCatalog().classificationVersion,
  );

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeInlineSvg, { assetsDir: resolveSeriesAssetsDir(article.slug) })
    .use(rehypeReact, { Fragment, jsx, jsxs, components: mdxComponents })
    .process(body);
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
    totalCount: loadSeriesCatalog().articles.length,
    classificationBatch: article.classificationBatch,
  };

  return { meta, content };
}
