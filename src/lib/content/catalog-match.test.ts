import { describe, expect, it } from "vitest";
import { assertCatalogMatch } from "./articles";
import { revisionOf, toDescriptor } from "./catalog";
import type { CatalogArticle, Frontmatter } from "./schema";

const article: CatalogArticle = {
  articleId: "article_2fb55e6e-a52a-4e8c-8e40-85719f34e57d",
  title: "Bir Başlık",
  slug: "bir-baslik",
  category: "foundations",
  level: "beginner",
  readingOrder: 1,
  summary: "Kısa özet",
  tags: ["ai"],
  contentHash: `sha256:${"a".repeat(64)}`,
  path: "content/series/articles/foundations/bir-baslik.md",
  relatedArticleIds: [],
  classificationBatch: 0,
};

const frontmatter: Frontmatter = {
  article_id: article.articleId,
  title: article.title,
  slug: article.slug,
  category: article.category,
  level: article.level,
  reading_order: article.readingOrder,
  summary: article.summary,
  tags: article.tags,
  content_hash: article.contentHash,
  classification_version: 1,
  classification_batch: 0,
};

const revision = { date: "2026-09-25", note: "Şekil 1 yeniden çizildi." };

describe("assertCatalogMatch — revision fields", () => {
  it("passes when neither side carries a revision", () => {
    expect(() => assertCatalogMatch(article, frontmatter, 1)).not.toThrow();
  });

  it("passes when both sides carry the same revision", () => {
    expect(() =>
      assertCatalogMatch(
        { ...article, revisedAt: revision.date, revisionNote: revision.note },
        { ...frontmatter, revised_at: revision.date, revision_note: revision.note },
        1,
      ),
    ).not.toThrow();
  });

  it("fails the build when only the frontmatter was marked", () => {
    expect(() =>
      assertCatalogMatch(
        article,
        { ...frontmatter, revised_at: revision.date, revision_note: revision.note },
        1,
      ),
    ).toThrow(/revised_at/);
  });

  it("fails the build when the notes drift apart", () => {
    expect(() =>
      assertCatalogMatch(
        { ...article, revisedAt: revision.date, revisionNote: revision.note },
        { ...frontmatter, revised_at: revision.date, revision_note: "başka not" },
        1,
      ),
    ).toThrow(/revision_note/);
  });
});

describe("revision fields on UI shapes", () => {
  it("adds nothing for a never-revised article", () => {
    expect(revisionOf(article)).toEqual({});
    expect("revisedAt" in toDescriptor(article)).toBe(false);
  });

  it("carries the date to the reading list and date + note to the reader", () => {
    const revised = { ...article, revisedAt: revision.date, revisionNote: revision.note };
    expect(toDescriptor(revised).revisedAt).toBe(revision.date);
    expect(revisionOf(revised)).toEqual({ revisedAt: revision.date, revisionNote: revision.note });
  });
});
