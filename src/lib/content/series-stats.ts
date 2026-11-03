import "server-only";

import { readFileSync } from "node:fs";
import { getSeriesOrderedArticles, resolveSeriesArticlePath } from "./series";

/**
 * Figures the public home page states about the AI series, counted from the
 * published files on every server start rather than written down, so a number on
 * the page can never drift from the text it describes.
 */
export type SeriesStats = {
  articles: number;
  /** Entries under the articles' "## Kaynakça" headings (one per cited work and article). */
  references: number;
  /** Diagrams (`![…](assets/….svg …)`) in the article bodies. */
  figures: number;
  /** Articles carrying a dated "Gözden geçirildi" revision note. */
  revised: number;
};

let cached: SeriesStats | null = null;

export function countReferences(markdown: string): number {
  const lines = markdown.split(/\r?\n/);
  let inSources = false;
  let count = 0;
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      inSources = /^##\s+Kaynakça\s*$/.test(line);
      continue;
    }
    if (inSources && /^[-*]\s+\S/.test(line)) count += 1;
  }
  return count;
}

export function countFigures(markdown: string): number {
  return (markdown.match(/^!\[[^\]]*\]\(assets\/[^)\s]+\.svg/gm) ?? []).length;
}

export function seriesStats(): SeriesStats {
  if (cached) return cached;
  const articles = getSeriesOrderedArticles();
  let references = 0;
  let figures = 0;
  for (const article of articles) {
    const markdown = readFileSync(resolveSeriesArticlePath(article.path), "utf8");
    references += countReferences(markdown);
    figures += countFigures(markdown);
  }
  cached = {
    articles: articles.length,
    references,
    figures,
    revised: articles.filter((article) => article.revisedAt).length,
  };
  return cached;
}
