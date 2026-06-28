import type { Category } from "@/lib/content/schema";
import type { ArticleDescriptor } from "@/lib/content/types";

export type CategoryRun = {
  key: string;
  category: Category;
  articles: ArticleDescriptor[];
};

export type BatchGroup = {
  batch: number;
  articleCount: number;
  categories: CategoryRun[];
};

/**
 * Build the sidebar view model without reordering the catalog sequence.
 * Categories are grouped only while contiguous so a future batch can express
 * a deliberate category return without duplicate React keys or heading IDs.
 */
export function groupByBatchAndCategory(articles: ArticleDescriptor[]): BatchGroup[] {
  const batches: BatchGroup[] = [];

  for (const article of articles) {
    let lastBatch = batches.at(-1);
    if (!lastBatch || lastBatch.batch !== article.classificationBatch) {
      lastBatch = {
        batch: article.classificationBatch,
        articleCount: 0,
        categories: [],
      };
      batches.push(lastBatch);
    }

    lastBatch.articleCount += 1;

    let lastCategory = lastBatch.categories.at(-1);
    if (!lastCategory || lastCategory.category !== article.category) {
      lastCategory = {
        key: `${article.category}-${lastBatch.categories.length}`,
        category: article.category,
        articles: [],
      };
      lastBatch.categories.push(lastCategory);
    }

    lastCategory.articles.push(article);
  }

  return batches;
}
