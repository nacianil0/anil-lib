import { describe, expect, it } from "vitest";
import type { ArticleDescriptor } from "@/lib/content/types";
import { groupByBatchAndCategory } from "./reading-list-groups";

function article(
  readingOrder: number,
  classificationBatch: number,
  category: ArticleDescriptor["category"],
): ArticleDescriptor {
  return {
    articleId: `article-${readingOrder}`,
    slug: `article-${readingOrder}`,
    title: `Article ${readingOrder}`,
    category,
    level: "beginner",
    readingOrder,
    classificationBatch,
  };
}

describe("groupByBatchAndCategory", () => {
  it("preserves global order while grouping batch and contiguous category runs", () => {
    const groups = groupByBatchAndCategory([
      article(1, 0, "foundations"),
      article(2, 0, "foundations"),
      article(3, 0, "models-and-training"),
      article(4, 1, "reasoning-and-memory"),
      article(5, 1, "agents-and-retrieval"),
    ]);

    expect(groups.map(({ batch, articleCount }) => [batch, articleCount])).toEqual([
      [0, 3],
      [1, 2],
    ]);
    expect(
      groups.flatMap((batch) =>
        batch.categories.flatMap((category) =>
          category.articles.map((entry) => entry.readingOrder),
        ),
      ),
    ).toEqual([1, 2, 3, 4, 5]);
  });

  it("assigns unique keys when a category appears in two runs", () => {
    const [batch] = groupByBatchAndCategory([
      article(1, 0, "foundations"),
      article(2, 0, "models-and-training"),
      article(3, 0, "foundations"),
    ]);

    expect(batch.categories.map((group) => group.key)).toEqual([
      "foundations-0",
      "models-and-training-1",
      "foundations-2",
    ]);
    expect(new Set(batch.categories.map((group) => group.key)).size).toBe(3);
  });
});
