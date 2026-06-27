import { describe, expect, it } from "vitest";
import { catalogArticleSchema, frontmatterSchema } from "./schema";

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
});
