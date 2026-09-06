import { describe, expect, it } from "vitest";
import {
  clampPage,
  pageForLogicalOffset,
  pageForRatio,
  pageMetrics,
  ratioForPage,
  scrollLeftForPage,
} from "./pagination";

describe("reader pagination", () => {
  it("derives spread count and current spread from horizontal geometry", () => {
    const metrics = pageMetrics(3248, 800, 816, 16);
    expect(metrics).toEqual({
      pageCount: 4,
      pageIndex: 1,
      pageStep: 816,
      maxScrollLeft: 2448,
    });
  });

  it("handles empty and zero-width geometry", () => {
    expect(pageMetrics(0, 0, 0, 24)).toEqual({
      pageCount: 1,
      pageIndex: 0,
      pageStep: 24,
      maxScrollLeft: 0,
    });
  });

  it("clamps pages and converts stable ratios", () => {
    expect(clampPage(8, 3)).toBe(2);
    expect(ratioForPage(0, 4)).toBe(0.25);
    expect(ratioForPage(3, 4)).toBe(1);
    expect(pageForRatio(0.5, 4)).toBe(1);
    expect(pageForRatio(1, 4)).toBe(3);
  });

  it("lands on the last page when the columns end part-way through it", () => {
    // Two 936px columns with a 51.2px gutter over 8340px of text: nine pages, but
    // the container itself only scrolls to 7404. Asking for the ninth page's
    // grid position would overshoot that, and the reader would be left reported
    // on the eighth page with nowhere further to go.
    const atEnd = pageMetrics(8340, 936, 7404, 51.2);
    expect(atEnd.pageCount).toBe(9);
    expect(atEnd.maxScrollLeft).toBe(7404);
    expect(atEnd.pageIndex).toBe(8);
    expect(scrollLeftForPage(8, atEnd)).toBe(7404);

    const midway = pageMetrics(8340, 936, 1974.4, 51.2);
    expect(midway.pageIndex).toBe(2);
  });

  it("maps pages and logical offsets to scroll positions", () => {
    const metrics = pageMetrics(3248, 800, 0, 16);
    expect(scrollLeftForPage(2, metrics)).toBe(1632);
    expect(scrollLeftForPage(99, metrics)).toBe(2448);
    expect(pageForLogicalOffset(1700, metrics)).toBe(2);
  });
});
