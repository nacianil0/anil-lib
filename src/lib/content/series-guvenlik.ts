import path from "node:path";
import {
  guvenlikCatalogSchema,
  guvenlikFrontmatterSchema,
  type Catalog,
  type CatalogArticle,
} from "./schema";
import { createSeriesContent, type RenderedSeriesArticle } from "./series-content";
import { createRoadmapLoader, type SeriesRoadmap } from "./series-roadmap";
import type { AdjacentArticle, ArticleDescriptor } from "./types";

/**
 * "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" serisinin içerik sözleşmesi. Öteki
 * serilerle aynı şemayı ve invariantları kullanır; kendi kök dizini, rota tabanı ve kontrollü
 * kategori sözlüğü vardır. Kurallar: docs/seri-guvenlik/SOZLESME.md. Başlık ve alt başlık
 * content/series-guvenlik/roadmap.json'daki seriesTitle/seriesSubtitle ile aynı tutulur
 * (series-guvenlik-roadmap.test.ts); rota ve okuma verisi kimliği ad değişse de sabit kalır.
 */
export const GUVENLIK_BASE_PATH = "/guvenlik";
export const GUVENLIK_TITLE = "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi";
export const GUVENLIK_SUBTITLE =
  "OWASP'tan başlayıp her riski bir varsayıma, güven sınırına, test edilebilir gereksinime ve üretimdeki kanıta dönüştüren; aynı disiplini Git ve GitHub'da kodun değişme yoluna uygulayan, senior ve üstü yazılımcılar için bir seri.";

const guvenlik = createSeriesContent({
  label: "guvenlik",
  dirName: "series-guvenlik",
  basePath: GUVENLIK_BASE_PATH,
  title: GUVENLIK_TITLE,
  subtitle: GUVENLIK_SUBTITLE,
  catalogSchema: guvenlikCatalogSchema,
  frontmatterSchema: guvenlikFrontmatterSchema,
});

export type { RenderedSeriesArticle };

/** Resolve a catalog `path` to a safe absolute path inside content/series-guvenlik/articles. */
export function resolveGuvenlikArticlePath(relPath: string): string {
  return guvenlik.resolveArticlePath(relPath);
}

/** Diyagram klasörü: content/series-guvenlik/assets/<slug>/ */
export function resolveGuvenlikAssetsDir(slug: string): string {
  return guvenlik.resolveAssetsDir(slug);
}

/** Validate raw JSON against the Güven Sınırı catalog schema plus series invariants. */
export function validateGuvenlikCatalog(input: unknown): Catalog {
  return guvenlik.validateCatalog(input);
}

export function loadGuvenlikCatalog(): Catalog {
  return guvenlik.loadCatalog();
}

export function getGuvenlikOrderedArticles(): CatalogArticle[] {
  return guvenlik.getOrderedArticles();
}

export function getGuvenlikDescriptors(): ArticleDescriptor[] {
  return guvenlik.getDescriptors();
}

export function getGuvenlikArticleBySlug(slug: string): CatalogArticle | null {
  return guvenlik.getArticleBySlug(slug);
}

export function getGuvenlikAdjacent(slug: string): {
  prev: AdjacentArticle;
  next: AdjacentArticle;
} {
  return guvenlik.getAdjacent(slug);
}

/**
 * Load, validate, and render a Güven Sınırı article for a given slug.
 * Returns null for an unknown slug so the route can call notFound().
 */
export function renderGuvenlikArticleBySlug(slug: string): Promise<RenderedSeriesArticle | null> {
  return guvenlik.renderArticleBySlug(slug);
}

const GUVENLIK_ROADMAP_PATH = path.join(process.cwd(), "content", "series-guvenlik", "roadmap.json");

export const loadGuvenlikRoadmap: () => SeriesRoadmap = createRoadmapLoader({
  label: "guvenlik",
  roadmapPath: GUVENLIK_ROADMAP_PATH,
  catalogSlugs: () => new Set(loadGuvenlikCatalog().articles.map((article) => article.slug)),
});
