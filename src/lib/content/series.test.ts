import { describe, expect, it } from "vitest";
import { resolveSeriesArticlePath, resolveSeriesAssetsDir, validateSeriesCatalog } from "./series";

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
    path: `content/series/articles/foundations/makale-${n}.md`,
    relatedArticleIds: [],
    classificationBatch: 0,
    ...overrides,
  };
}

function catalog(articles: RawArticle[], overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 2,
    classificationVersion: 1,
    generatedAt: "2026-08-25T00:00:00Z",
    articles,
    ...overrides,
  };
}

describe("validateSeriesCatalog", () => {
  it("accepts a well-formed series catalog", () => {
    const result = validateSeriesCatalog(catalog([article(1), article(2)]));
    expect(result.articles).toHaveLength(2);
  });

  it("rejects paths outside content/series/articles", () => {
    const bad = article(1, { path: "content/articles/foundations/makale-1.md" });
    expect(() => validateSeriesCatalog(catalog([bad]))).toThrow(/Güvensiz makale yolu/);
  });

  it("rejects a batch sequence that does not start at 0", () => {
    const bad = article(1, { classificationBatch: 1 });
    expect(() => validateSeriesCatalog(catalog([bad]))).toThrow(/Batch 0/);
  });

  it("rejects non-contiguous reading order", () => {
    expect(() => validateSeriesCatalog(catalog([article(1), article(3)]))).toThrow(
      /kesintisiz/,
    );
  });
});

describe("resolveSeriesArticlePath", () => {
  it("rejects traversal outside the series articles dir", () => {
    expect(() =>
      resolveSeriesArticlePath("content/series/articles/../../../etc/passwd"),
    ).toThrow(/dışına çıkıyor/);
  });
});

describe("resolveSeriesAssetsDir", () => {
  it("accepts a kebab-case slug", () => {
    expect(resolveSeriesAssetsDir("makale-1")).toMatch(/assets[\\/]+makale-1$/);
  });

  it("rejects a slug with path characters", () => {
    expect(() => resolveSeriesAssetsDir("../evil")).toThrow(/Geçersiz slug/);
  });
});
