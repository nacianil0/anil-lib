import { getOrderedArticles } from "./catalog";

/**
 * The pre-series library. It stays published and fully readable, but only for the
 * owner: the reader experience for everyone else is the two learning series.
 */
export const ARCHIVE_BASE_PATH = "/read";
export const ARCHIVE_TITLE = "Arşiv";
export const ARCHIVE_SUBTITLE = "Seri öncesi yazılar. Yalnızca sana görünür.";

export function getArchiveArticleIds(): string[] {
  return getOrderedArticles().map((article) => article.articleId);
}
