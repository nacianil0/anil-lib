import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ArticleDescriptor } from "@/lib/content/types";
import { ReaderProgressProvider } from "@/lib/progress/use-reader-progress";
import { ReadingList } from "./reading-list";

function article(
  readingOrder: number,
  classificationBatch: number,
  category: ArticleDescriptor["category"],
): ArticleDescriptor {
  return {
    articleId: `article-${readingOrder}`,
    slug: `article-${readingOrder}`,
    title: `Makale ${readingOrder}`,
    category,
    level: "beginner",
    readingOrder,
    classificationBatch,
  };
}

describe("ReadingList", () => {
  // Unmount between tests so the reader provider's async work cannot outlive the
  // jsdom environment, matching the other component suites.
  afterEach(cleanup);

  it("renders one folio header per batch with unique category heading IDs", () => {
    render(
      <ReaderProgressProvider workspaceId="test-workspace">
        <ReadingList
          currentArticleId="article-1"
          idPrefix="test"
          articles={[
            article(1, 0, "foundations"),
            article(2, 0, "models-and-training"),
            article(3, 0, "foundations"),
            article(4, 1, "reasoning-and-memory"),
          ]}
        />
      </ReaderProgressProvider>,
    );

    const navigation = screen.getByRole("navigation", {
      name: "Sınıflandırılmış okuma listesi",
    });
    expect(screen.getByRole("heading", { name: "Sınıflandırma 00 · 3 makale" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Sınıflandırma 01 · 1 makale" })).toBeVisible();

    const headingIds = Array.from(navigation.querySelectorAll("h3")).map((heading) => heading.id);
    expect(new Set(headingIds).size).toBe(headingIds.length);
  });
});
