import path from "node:path";
import {
  bounCatalogSchema,
  bounFrontmatterSchema,
  type Catalog,
  type CatalogArticle,
} from "./schema";
import { createSeriesContent, type RenderedSeriesArticle } from "./series-content";
import { createRoadmapLoader, type SeriesRoadmap } from "./series-roadmap";
import type { AdjacentArticle, ArticleDescriptor } from "./types";

/**
 * "Mülakat Aynası: Boğaziçi CmpE" serisinin içerik sözleşmesi. AI serisiyle aynı
 * şemayı ve invariantları kullanır; kendi kök dizini, rota tabanı ve kontrollü
 * kategori sözlüğü vardır. Kurallar: docs/seri-boun/SOZLESME.md.
 */
export const BOUN_BASE_PATH = "/boun";
export const BOUN_TITLE = "Mülakat Aynası: Boğaziçi CmpE";
export const BOUN_SUBTITLE =
  "Boğaziçi CmpE bilimsel mülakatı için unutulmuş bilgisayar mühendisliği temellerini anlatılabilir, çözülebilir ve savunulabilir düzeyde yeniden kuran hazırlık serisi.";

const boun = createSeriesContent({
  label: "boun",
  dirName: "series-boun",
  basePath: BOUN_BASE_PATH,
  title: BOUN_TITLE,
  subtitle: BOUN_SUBTITLE,
  catalogSchema: bounCatalogSchema,
  frontmatterSchema: bounFrontmatterSchema,
});

export type { RenderedSeriesArticle };

/** Resolve a catalog `path` to a safe absolute path inside content/series-boun/articles. */
export function resolveBounArticlePath(relPath: string): string {
  return boun.resolveArticlePath(relPath);
}

/** Diyagram klasörü: content/series-boun/assets/<slug>/ */
export function resolveBounAssetsDir(slug: string): string {
  return boun.resolveAssetsDir(slug);
}

/** Validate raw JSON against the BOUN catalog schema plus series invariants. */
export function validateBounCatalog(input: unknown): Catalog {
  return boun.validateCatalog(input);
}

export function loadBounCatalog(): Catalog {
  return boun.loadCatalog();
}

export function getBounOrderedArticles(): CatalogArticle[] {
  return boun.getOrderedArticles();
}

export function getBounDescriptors(): ArticleDescriptor[] {
  return boun.getDescriptors();
}

export function getBounArticleBySlug(slug: string): CatalogArticle | null {
  return boun.getArticleBySlug(slug);
}

export function getBounAdjacent(slug: string): {
  prev: AdjacentArticle;
  next: AdjacentArticle;
} {
  return boun.getAdjacent(slug);
}

/**
 * Load, validate, and render a BOUN article for a given slug.
 * Returns null for an unknown slug so the route can call notFound().
 */
export function renderBounArticleBySlug(slug: string): Promise<RenderedSeriesArticle | null> {
  return boun.renderArticleBySlug(slug);
}

const BOUN_ROADMAP_PATH = path.join(process.cwd(), "content", "series-boun", "roadmap.json");

export const loadBounRoadmap: () => SeriesRoadmap = createRoadmapLoader({
  label: "boun",
  roadmapPath: BOUN_ROADMAP_PATH,
  catalogSlugs: () => new Set(loadBounCatalog().articles.map((article) => article.slug)),
});
