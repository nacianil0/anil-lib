import { describe, expect, it } from "vitest";
import { catalogArticleSchema, catalogSchema, frontmatterSchema } from "./schema";

const validFrontmatter = {
  article_id: "article_2fb55e6e-a52a-4e8c-8e40-85719f34e57d",
  title: "Bir Başlık",
  slug: "bir-baslik",
  category: "foundations",
  level: "beginner",
  reading_order: 1,
  summary: "Kısa özet",
  tags: ["ai"],
  content_hash: `sha256:${"a".repeat(64)}`,
  classification_version: 1,
  classification_batch: 0,
};

describe("frontmatterSchema", () => {
  it("accepts valid frontmatter", () => {
    expect(frontmatterSchema.parse(validFrontmatter).slug).toBe("bir-baslik");
  });

  it("defaults tags to an empty array", () => {
    const { tags: _tags, ...rest } = validFrontmatter;
    expect(frontmatterSchema.parse(rest).tags).toEqual([]);
  });

  it("rejects an invalid articleId", () => {
    expect(() => frontmatterSchema.parse({ ...validFrontmatter, article_id: "nope" })).toThrow();
  });

  it("rejects an uppercase or non-hex content hash", () => {
    expect(() =>
      frontmatterSchema.parse({ ...validFrontmatter, content_hash: `sha256:${"A".repeat(64)}` }),
    ).toThrow();
  });

  it("rejects a non kebab-case slug", () => {
    expect(() => frontmatterSchema.parse({ ...validFrontmatter, slug: "Bir Baslik" })).toThrow();
  });

  it("rejects an out-of-vocabulary category", () => {
    expect(() => frontmatterSchema.parse({ ...validFrontmatter, category: "misc" })).toThrow();
  });

  it.each([
    ["missing", undefined],
    ["negative", -1],
    ["fractional", 0.5],
    ["non-numeric", "0"],
  ])("rejects a %s classification_batch", (_label, classificationBatch) => {
    const candidate = { ...validFrontmatter, classification_batch: classificationBatch };
    expect(() => frontmatterSchema.parse(candidate)).toThrow();
  });
});

describe("catalogArticleSchema", () => {
  it("requires a positive integer readingOrder", () => {
    const base = {
      articleId: validFrontmatter.article_id,
      title: "t",
      slug: "t",
      category: "foundations",
      level: "beginner",
      readingOrder: 0,
      summary: "s",
      contentHash: validFrontmatter.content_hash,
      path: "content/articles/foundations/t.md",
      classificationBatch: 0,
    };
    expect(() => catalogArticleSchema.parse(base)).toThrow();
    expect(catalogArticleSchema.parse({ ...base, readingOrder: 1 }).relatedArticleIds).toEqual([]);
  });

  it.each([
    ["missing", undefined],
    ["negative", -1],
    ["fractional", 0.5],
    ["non-numeric", "0"],
  ])("rejects a %s classificationBatch", (_label, classificationBatch) => {
    const candidate = {
      articleId: validFrontmatter.article_id,
      title: "t",
      slug: "t",
      category: "foundations",
      level: "beginner",
      readingOrder: 1,
      summary: "s",
      contentHash: validFrontmatter.content_hash,
      path: "content/articles/foundations/t.md",
      classificationBatch,
    };
    expect(() => catalogArticleSchema.parse(candidate)).toThrow();
  });
});

describe("catalogSchema", () => {
  it("accepts schema version 2 and rejects legacy version 1", () => {
    const candidate = {
      schemaVersion: 2,
      classificationVersion: 1,
      generatedAt: "2026-06-27T00:00:00Z",
      articles: [
        {
          articleId: validFrontmatter.article_id,
          title: "t",
          slug: "t",
          category: "foundations",
          level: "beginner",
          readingOrder: 1,
          summary: "s",
          contentHash: validFrontmatter.content_hash,
          path: "content/articles/foundations/t.md",
          classificationBatch: 0,
        },
      ],
    };

    expect(catalogSchema.parse(candidate).schemaVersion).toBe(2);
    expect(() => catalogSchema.parse({ ...candidate, schemaVersion: 1 })).toThrow();
  });
});
