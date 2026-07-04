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

  it("maps pages and logical offsets to scroll positions", () => {
    const metrics = pageMetrics(3248, 800, 0, 16);
    expect(scrollLeftForPage(2, metrics)).toBe(1632);
    expect(scrollLeftForPage(99, metrics)).toBe(2448);
    expect(pageForLogicalOffset(1700, metrics)).toBe(2);
  });
});
