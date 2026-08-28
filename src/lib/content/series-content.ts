import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import matter from "gray-matter";
import type { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";

import { formatZodError, type Catalog, type CatalogArticle, type Frontmatter } from "./schema";
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
 * Bir serinin içerik sözleşmesi. Ana kütüphaneyle aynı şemayı ve invariantları
 * kullanır; seriler yalnızca kök dizin, rota tabanı ve kontrollü kategori
 * sözlüğüyle ayrışır. AI serisi `series.ts`, BOUN serisi `series-boun.ts`
 * içinde bu fabrikayı örnekler.
 */
export type SeriesConfig = {
  /** Hata mesajlarındaki köşeli parantez etiketi, ör. "series". */
  label: string;
  /** content/ altındaki seri klasörü, ör. "series-boun". */
  dirName: string;
  /** Rota tabanı, ör. "/boun". */
  basePath: string;
  title: string;
  subtitle: string;
  catalogSchema: z.ZodType<Catalog, z.ZodTypeDef, unknown>;
  frontmatterSchema: z.ZodType<Frontmatter, z.ZodTypeDef, unknown>;
};

export type RenderedSeriesArticle = {
  meta: CurrentArticle;
  content: ReactNode;
};

export type SeriesContent = {
  readonly basePath: string;
  readonly title: string;
  readonly subtitle: string;
  readonly catalogPath: string;
  resolveArticlePath(relPath: string): string;
  resolveAssetsDir(slug: string): string;
  validateCatalog(input: unknown): Catalog;
  loadCatalog(): Catalog;
  getOrderedArticles(): CatalogArticle[];
  getDescriptors(): ArticleDescriptor[];
  getArticleBySlug(slug: string): CatalogArticle | null;
  getAdjacent(slug: string): { prev: AdjacentArticle; next: AdjacentArticle };
  renderArticleBySlug(slug: string): Promise<RenderedSeriesArticle | null>;
};

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createSeriesContent(config: SeriesConfig): SeriesContent {
  const seriesDir = path.join(process.cwd(), "content", config.dirName);
  const articlesDir = path.join(seriesDir, "articles");
  const assetsDir = path.join(seriesDir, "assets");
  const catalogPath = path.join(seriesDir, "catalog.json");
  const articlesPrefix = `content/${config.dirName}/articles/`;
  const tag = `[${config.label}]`;

  let cached: Catalog | null = null;

  /** Resolve a catalog `path` to a safe absolute path inside the series articles dir. */
  function resolveArticlePath(relPath: string): string {
    if (!relPath.startsWith(articlesPrefix)) {
      throw new Error(`${tag} Güvensiz makale yolu (${articlesPrefix} dışında): ${relPath}`);
    }
    const absolute = path.resolve(process.cwd(), relPath);
    const relativeToArticles = path.relative(articlesDir, absolute);
    if (
      relativeToArticles.startsWith("..") ||
      path.isAbsolute(relativeToArticles) ||
      relativeToArticles.includes(`..${path.sep}`)
    ) {
      throw new Error(`${tag} Makale yolu seri klasörünün dışına çıkıyor: ${relPath}`);
    }
    return absolute;
  }

  /** Diyagram klasörü: content/<seri>/assets/<slug>/ */
  function resolveAssetsDir(slug: string): string {
    if (!SLUG_PATTERN.test(slug)) {
      throw new Error(`${tag} Geçersiz slug: ${slug}`);
    }
    return path.join(assetsDir, slug);
  }

  /** Validate raw JSON against the series catalog schema plus shared invariants. */
  function validateCatalog(input: unknown): Catalog {
    const result = config.catalogSchema.safeParse(input);
    if (!result.success) {
      throw new Error(
        `${tag} ${config.dirName}/catalog.json şeması geçersiz:\n${formatZodError(result.error)}`,
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
      resolveArticlePath(article.path);
    }

    const ids = new Set(catalog.articles.map((a) => a.articleId));
    for (const article of catalog.articles) {
      for (const relatedId of article.relatedArticleIds) {
        if (!ids.has(relatedId)) {
          throw new Error(`${tag} ${article.slug}: relatedArticleId katalogda yok: ${relatedId}`);
        }
      }
    }

    return catalog;
  }

  function loadCatalog(): Catalog {
    if (cached) return cached;

    let raw: string;
    try {
      raw = readFileSync(catalogPath, "utf8");
    } catch {
      throw new Error(`${tag} ${catalogPath} okunamadı.`);
    }

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (error) {
      throw new Error(
        `${tag} ${config.dirName}/catalog.json parse edilemedi: ${(error as Error).message}`,
      );
    }

    cached = validateCatalog(json);
    return cached;
  }

  function getOrderedArticles(): CatalogArticle[] {
    return [...loadCatalog().articles].sort((a, b) => a.readingOrder - b.readingOrder);
  }

  function getDescriptors(): ArticleDescriptor[] {
    return getOrderedArticles().map(toDescriptor);
  }

  function getArticleBySlug(slug: string): CatalogArticle | null {
    return getOrderedArticles().find((article) => article.slug === slug) ?? null;
  }

  function getAdjacent(slug: string): { prev: AdjacentArticle; next: AdjacentArticle } {
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

  /**
   * Load, validate, and render a series article for a given slug.
   * Returns null for an unknown slug so the route can call notFound().
   */
  async function renderArticleBySlug(slug: string): Promise<RenderedSeriesArticle | null> {
    const article = getArticleBySlug(slug);
    if (!article) return null;

    const absolutePath = resolveArticlePath(article.path);
    let file: string;
    try {
      file = readFileSync(absolutePath, "utf8");
    } catch {
      throw new Error(`${tag} Makale dosyası okunamadı: ${article.path}`);
    }

    const { content: body, data } = matter(file);
    const parsedFrontmatter = config.frontmatterSchema.safeParse(data);
    if (!parsedFrontmatter.success) {
      throw new Error(
        `${tag} Frontmatter geçersiz (${article.path}):\n${formatZodError(parsedFrontmatter.error)}`,
      );
    }
    assertCatalogMatch(article, parsedFrontmatter.data, loadCatalog().classificationVersion);

    const processed = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeInlineSvg, { assetsDir: resolveAssetsDir(article.slug) })
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
      totalCount: loadCatalog().articles.length,
      classificationBatch: article.classificationBatch,
    };

    return { meta, content };
  }

  return {
    basePath: config.basePath,
    title: config.title,
    subtitle: config.subtitle,
    catalogPath,
    resolveArticlePath,
    resolveAssetsDir,
    validateCatalog,
    loadCatalog,
    getOrderedArticles,
    getDescriptors,
    getArticleBySlug,
    getAdjacent,
    renderArticleBySlug,
  };
}
