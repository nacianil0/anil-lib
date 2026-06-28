import { readFileSync } from "node:fs";
import path from "node:path";
import {
  catalogSchema,
  formatZodError,
  type Catalog,
  type CatalogArticle,
} from "./schema";
import type { AdjacentArticle, ArticleDescriptor } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles");
const CATALOG_PATH = path.join(CONTENT_DIR, "catalog.json");

let cached: Catalog | null = null;

/**
 * Resolve a catalog `path` to a safe absolute path inside content/articles.
 * Rejects anything outside that directory (path traversal protection).
 */
export function resolveArticlePath(relPath: string): string {
  if (!relPath.startsWith("content/articles/")) {
    throw new Error(`[content] Güvensiz makale yolu (content/articles/ dışında): ${relPath}`);
  }
  const absolute = path.resolve(process.cwd(), relPath);
  const relativeToArticles = path.relative(ARTICLES_DIR, absolute);
  if (
    relativeToArticles.startsWith("..") ||
    path.isAbsolute(relativeToArticles) ||
    relativeToArticles.includes(`..${path.sep}`)
  ) {
    throw new Error(`[content] Makale yolu içerik klasörünün dışına çıkıyor: ${relPath}`);
  }
  return absolute;
}

function assertUnique(values: Array<string | number>, field: string): void {
  const seen = new Set<string | number>();
  const duplicates = new Set<string | number>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  if (duplicates.size > 0) {
    throw new Error(`[content] Katalogda yinelenen ${field}: ${[...duplicates].join(", ")}`);
  }
}

function assertContiguousReadingOrder(orders: number[]): void {
  const sorted = [...orders].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i += 1) {
    if (sorted[i] !== i + 1) {
      throw new Error(
        `[content] readingOrder 1'den başlayan kesintisiz dizi olmalı; beklenen ${i + 1}, bulunan ${sorted[i]}`,
      );
    }
  }
}

function assertValidClassificationBatches(articles: CatalogArticle[]): void {
  const ordered = [...articles].sort((a, b) => a.readingOrder - b.readingOrder);
  const first = ordered[0];

  if (first.classificationBatch !== 0) {
    throw new Error(
      `[content] Batch 0 başlangıç kohortu eksik; ilk makale ${first.path} Batch ${first.classificationBatch} içinde`,
    );
  }

  let previousBatch = 0;
  for (const article of ordered.slice(1)) {
    const batch = article.classificationBatch;
    if (batch < previousBatch) {
      throw new Error(
        `[content] Batch blokları okuma sırasında iç içe geçemez: ${article.path} Batch ${batch}, Batch ${previousBatch} bloğundan sonra geliyor`,
      );
    }
    if (batch > previousBatch + 1) {
      throw new Error(
        `[content] Batch numaraları 0'dan başlayan kesintisiz dizi olmalı: ${article.path} için Batch ${previousBatch + 1} beklenirken Batch ${batch} bulundu`,
      );
    }
    previousBatch = batch;
  }
}

/**
 * Validate raw JSON against the catalog schema plus cross-field invariants.
 * Pure (no filesystem): the building block used by unit tests.
 */
export function validateCatalog(input: unknown): Catalog {
  const result = catalogSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`[content] catalog.json şeması geçersiz:\n${formatZodError(result.error)}`);
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
    resolveArticlePath(article.path);
  }

  const ids = new Set(catalog.articles.map((a) => a.articleId));
  for (const article of catalog.articles) {
    for (const relatedId of article.relatedArticleIds) {
      if (!ids.has(relatedId)) {
        throw new Error(
          `[content] ${article.slug}: relatedArticleId katalogda yok: ${relatedId}`,
        );
      }
    }
  }

  return catalog;
}

export function loadCatalog(): Catalog {
  if (cached) return cached;

  let raw: string;
  try {
    raw = readFileSync(CATALOG_PATH, "utf8");
  } catch {
    throw new Error(
      `[content] ${CATALOG_PATH} okunamadı. Reader uygulamasını kurmadan önce Prompt 01 (sınıflandırma) çalıştırılmalı.`,
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(
      `[content] catalog.json parse edilemedi (${CATALOG_PATH}): ${(error as Error).message}`,
    );
  }

  cached = validateCatalog(json);
  return cached;
}

export function getOrderedArticles(): CatalogArticle[] {
  return [...loadCatalog().articles].sort((a, b) => a.readingOrder - b.readingOrder);
}

export function toDescriptor(article: CatalogArticle): ArticleDescriptor {
  return {
    articleId: article.articleId,
    slug: article.slug,
    title: article.title,
    category: article.category,
    level: article.level,
    readingOrder: article.readingOrder,
    classificationBatch: article.classificationBatch,
  };
}

export function getDescriptors(): ArticleDescriptor[] {
  return getOrderedArticles().map(toDescriptor);
}

export function getArticleBySlug(slug: string): CatalogArticle | null {
  return getOrderedArticles().find((article) => article.slug === slug) ?? null;
}

export function getAdjacent(slug: string): { prev: AdjacentArticle; next: AdjacentArticle } {
  const ordered = getOrderedArticles();
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
