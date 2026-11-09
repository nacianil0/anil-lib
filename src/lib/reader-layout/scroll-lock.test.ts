import { afterEach, describe, expect, it, vi } from "vitest";
import { lockPageScroll } from "./scroll-lock";

function setScrollbarGap(gap: number) {
  vi.spyOn(window, "innerWidth", "get").mockReturnValue(1280);
  vi.spyOn(document.documentElement, "clientWidth", "get").mockReturnValue(1280 - gap);
}

afterEach(() => {
  vi.restoreAllMocks();
  document.body.removeAttribute("style");
});

describe("lockPageScroll", () => {
  it("hides the page overflow and gives the scrollbar's width back as padding", () => {
    setScrollbarGap(10);
    const release = lockPageScroll();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).toBe("10px");
    release();
    expect(document.body.style.overflow).toBe("");
    expect(document.body.style.paddingRight).toBe("");
  });

  it("adds no padding when the page has no scrollbar to lose", () => {
    setScrollbarGap(0);
    const release = lockPageScroll();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).toBe("");
    release();
  });

  it("adds the gap to padding the body already has", () => {
    document.body.style.paddingRight = "6px";
    setScrollbarGap(10);
    const release = lockPageScroll();
    expect(document.body.style.paddingRight).toBe("16px");
    release();
    expect(document.body.style.paddingRight).toBe("6px");
  });

  it("restores the exact inline styles it found, so nested locks unwind in order", () => {
    document.body.style.overflow = "clip";
    setScrollbarGap(10);
    const outer = lockPageScroll();
    // The bar is gone under the outer lock, so the inner one measures no gap.
    setScrollbarGap(0);
    const inner = lockPageScroll();
    expect(document.body.style.paddingRight).toBe("10px");
    inner();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.body.style.paddingRight).toBe("10px");
    outer();
    expect(document.body.style.overflow).toBe("clip");
    expect(document.body.style.paddingRight).toBe("");
  });
});
