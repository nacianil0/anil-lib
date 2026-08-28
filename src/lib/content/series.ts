import { catalogSchema, frontmatterSchema, type Catalog, type CatalogArticle } from "./schema";
import { createSeriesContent, type RenderedSeriesArticle } from "./series-content";
import type { AdjacentArticle, ArticleDescriptor } from "./types";

/**
 * "Sıfırdan Yüze" serisinin içerik sözleşmesi. Ana kütüphaneyle aynı şema ve
 * invariantları kullanır; yalnızca kök dizinleri ve rota tabanı farklıdır.
 * Kurallar: docs/seri/SOZLESME.md.
 */
export const SERIES_BASE_PATH = "/seri";
export const SERIES_TITLE = "Sıfırdan Yüze: Yapay Zekâ";
export const SERIES_SUBTITLE =
  "Sıfırdan başlayıp araştırmacı ve mühendis derinliğine uzanan yaşayan öğrenme yolculuğu.";

const series = createSeriesContent({
  label: "series",
  dirName: "series",
  basePath: SERIES_BASE_PATH,
  title: SERIES_TITLE,
  subtitle: SERIES_SUBTITLE,
  catalogSchema,
  frontmatterSchema,
});

export type { RenderedSeriesArticle };

/** Resolve a catalog `path` to a safe absolute path inside content/series/articles. */
export function resolveSeriesArticlePath(relPath: string): string {
  return series.resolveArticlePath(relPath);
}

/** Diyagram klasörü: content/series/assets/<slug>/ */
export function resolveSeriesAssetsDir(slug: string): string {
  return series.resolveAssetsDir(slug);
}

/** Validate raw JSON against the shared catalog schema plus series invariants. */
export function validateSeriesCatalog(input: unknown): Catalog {
  return series.validateCatalog(input);
}

export function loadSeriesCatalog(): Catalog {
  return series.loadCatalog();
}

export function getSeriesOrderedArticles(): CatalogArticle[] {
  return series.getOrderedArticles();
}

export function getSeriesDescriptors(): ArticleDescriptor[] {
  return series.getDescriptors();
}

export function getSeriesArticleBySlug(slug: string): CatalogArticle | null {
  return series.getArticleBySlug(slug);
}

export function getSeriesAdjacent(slug: string): {
  prev: AdjacentArticle;
  next: AdjacentArticle;
} {
  return series.getAdjacent(slug);
}

/**
 * Load, validate, and render a series article for a given slug.
 * Returns null for an unknown slug so the route can call notFound().
 */
export function renderSeriesArticleBySlug(
  slug: string,
): Promise<RenderedSeriesArticle | null> {
  return series.renderArticleBySlug(slug);
}
