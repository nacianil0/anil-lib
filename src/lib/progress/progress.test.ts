import { describe, expect, it } from "vitest";
import { articleProgressSchema, clampRatio, emptyProgress, readerProgressSchema } from "./schema";
import { parseProgress } from "./storage";

describe("clampRatio", () => {
  it("clamps numbers into the 0..1 range", () => {
    expect(clampRatio(0.5)).toBe(0.5);
    expect(clampRatio(2)).toBe(1);
    expect(clampRatio(-3)).toBe(0);
  });

  it("falls back to 0 for non-finite or non-numeric input", () => {
    expect(clampRatio(Number.NaN)).toBe(0);
    expect(clampRatio("0.8")).toBe(0);
    expect(clampRatio(undefined)).toBe(0);
  });
});

describe("articleProgressSchema", () => {
  it("fills safe defaults for an empty object", () => {
    const entry = articleProgressSchema.parse({});
    expect(entry).toEqual({ headingId: null, scrollRatio: 0, completed: false, lastReadAt: "" });
  });

  it("clamps a stored scrollRatio above 1", () => {
    expect(articleProgressSchema.parse({ scrollRatio: 4 }).scrollRatio).toBe(1);
  });

  it("coerces a wrong-typed completed flag to false", () => {
    expect(articleProgressSchema.parse({ completed: "yes" }).completed).toBe(false);
  });
});

describe("parseProgress", () => {
  it("returns empty state for corrupt JSON", () => {
    expect(parseProgress("{not valid json")).toEqual(emptyProgress());
  });

  it("returns empty state for null", () => {
    expect(parseProgress(null)).toEqual(emptyProgress());
  });

  it("parses a valid payload and keeps the current article", () => {
    const payload = JSON.stringify({
      currentArticleId: "article_1",
      articles: {
        article_1: { headingId: "intro", scrollRatio: 0.4, completed: true, lastReadAt: "t" },
      },
    });
    const parsed = parseProgress(payload);
    expect(parsed.currentArticleId).toBe("article_1");
    expect(parsed.articles.article_1.scrollRatio).toBe(0.4);
    expect(parsed.articles.article_1.completed).toBe(true);
  });

  it("clamps an out-of-range stored ratio instead of discarding the entry", () => {
    const payload = JSON.stringify({
      currentArticleId: null,
      articles: { a: { scrollRatio: 9 } },
    });
    expect(parseProgress(payload).articles.a.scrollRatio).toBe(1);
  });

  it("replaces a malformed entry with a safe default rather than wiping all state", () => {
    const payload = JSON.stringify({
      currentArticleId: null,
      articles: { good: { scrollRatio: 0.5 }, bad: "not-an-object" },
    });
    const parsed = parseProgress(payload);
    expect(parsed.articles.good.scrollRatio).toBe(0.5);
    expect(parsed.articles.bad).toEqual({
      headingId: null,
      scrollRatio: 0,
      completed: false,
      lastReadAt: "",
    });
  });
});

describe("readerProgressSchema", () => {
  it("produces empty state from an empty object", () => {
    expect(readerProgressSchema.parse({})).toEqual(emptyProgress());
  });
});
