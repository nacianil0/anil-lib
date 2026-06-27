import { describe, expect, it } from "vitest";
import {
  getAdjacent,
  getArticleBySlug,
  getOrderedArticles,
  loadCatalog,
  resolveArticlePath,
  validateCatalog,
} from "./catalog";

type RawArticle = ReturnType<typeof article>;

const id = (n: number) => `article_00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;
const hash = (c: string) => `sha256:${c.repeat(64)}`;

function article(n: number, overrides: Record<string, unknown> = {}) {
  return {
    articleId: id(n),
    title: `Makale ${n}`,
    slug: `makale-${n}`,
    category: "foundations",
    level: "beginner",
    readingOrder: n,
    summary: "Özet",
    tags: [],
    contentHash: hash(String(n % 10)),
    path: `content/articles/foundations/makale-${n}.md`,
    relatedArticleIds: [],
    classificationBatch: 0,
    ...overrides,
  };
}

function catalog(articles: RawArticle[], overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 2,
    classificationVersion: 1,
    generatedAt: "2026-01-01T00:00:00Z",
    articles,
    ...overrides,
  };
}

describe("validateCatalog", () => {
  it("accepts a well-formed catalog", () => {
    const result = validateCatalog(catalog([article(1), article(2)]));
    expect(result.articles).toHaveLength(2);
  });

  it("rejects a duplicate articleId", () => {
    const dup = article(2, { articleId: id(1) });
    expect(() => validateCatalog(catalog([article(1), dup]))).toThrow(/yinelenen articleId/);
  });

  it("rejects a duplicate slug", () => {
    const dup = article(2, { slug: "makale-1" });
    expect(() => validateCatalog(catalog([article(1), dup]))).toThrow(/yinelenen slug/);
  });

  it("rejects a duplicate path", () => {
    const dup = article(2, { path: "content/articles/foundations/makale-1.md" });
    expect(() => validateCatalog(catalog([article(1), dup]))).toThrow(/yinelenen path/);
  });

  it("rejects a duplicate readingOrder", () => {
    const dup = article(2, { readingOrder: 1 });
    expect(() => validateCatalog(catalog([article(1), dup]))).toThrow(/yinelenen readingOrder/);
  });

  it("rejects a non-contiguous readingOrder sequence", () => {
    expect(() => validateCatalog(catalog([article(1), article(3)]))).toThrow(/kesintisiz/);
  });

  it("rejects an unsupported category", () => {
    const bad = article(1, { category: "not-a-category" });
    expect(() => validateCatalog(catalog([bad]))).toThrow(/şeması geçersiz/);
  });

  it("rejects an unsupported level", () => {
    const bad = article(1, { level: "expert" });
    expect(() => validateCatalog(catalog([bad]))).toThrow(/şeması geçersiz/);
  });

  it("rejects a malformed content hash", () => {
    const bad = article(1, { contentHash: "sha256:zzzz" });
    expect(() => validateCatalog(catalog([bad]))).toThrow(/şeması geçersiz/);
  });

  it("rejects a path that escapes content/articles", () => {
    const bad = article(1, { path: "content/articles/../../secret.md" });
    expect(() => validateCatalog(catalog([bad]))).toThrow(/dışına çıkıyor/);
  });

  it("rejects a relatedArticleId that is not in the catalog", () => {
    const bad = article(1, { relatedArticleIds: [id(99)] });
    expect(() => validateCatalog(catalog([bad, article(2)]))).toThrow(/relatedArticleId/);
  });
});

describe("resolveArticlePath", () => {
  it("resolves a path inside content/articles", () => {
    expect(resolveArticlePath("content/articles/foundations/a.md")).toContain(
      "content/articles/foundations/a.md",
    );
  });

  it("rejects a path outside content/articles", () => {
    expect(() => resolveArticlePath("content/other/a.md")).toThrow(/Güvensiz/);
  });

  it("rejects a traversal path", () => {
    expect(() => resolveArticlePath("content/articles/../../etc/passwd")).toThrow(/dışına çıkıyor/);
  });
});

describe("real catalog", () => {
  it("loads all 18 ordered articles with a contiguous sequence", () => {
    const articles = getOrderedArticles();
    expect(articles).toHaveLength(loadCatalog().articles.length);
    expect(articles.length).toBeGreaterThanOrEqual(18);
    articles.forEach((a, index) => expect(a.readingOrder).toBe(index + 1));
  });

  it("resolves the first article and its neighbours", () => {
    const ordered = getOrderedArticles();
    const first = ordered[0];
    const second = ordered[1];
    const last = ordered[ordered.length - 1];

    expect(getArticleBySlug(first.slug)?.articleId).toBe(first.articleId);
    expect(getAdjacent(first.slug).prev).toBeNull();
    expect(getAdjacent(first.slug).next?.slug).toBe(second.slug);
    expect(getAdjacent(last.slug).next).toBeNull();
    expect(getAdjacent(second.slug).prev?.slug).toBe(first.slug);
  });

  it("returns null for an unknown slug", () => {
    expect(getArticleBySlug("bu-slug-yok")).toBeNull();
    expect(getAdjacent("bu-slug-yok")).toEqual({ prev: null, next: null });
  });
});
