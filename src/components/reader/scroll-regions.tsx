"use client";

import { useEffect, type RefObject } from "react";

/** Blocks that scroll sideways on their own when wider than the column. */
const REGION_SELECTOR = "pre, .table-scroll";
/** Marks the attributes this layer added, so it only ever removes its own. */
const MARK = "data-scroll-region";

/**
 * A code block or a table wider than the reading column scrolls inside itself. A
 * pointer or a finger can do that; a keyboard can only scroll what holds focus, and
 * not every browser makes a scroll container focusable on its own (WCAG 2.1.1). So
 * while a block actually overflows it becomes a named, focusable region — the arrow
 * keys then move it, and the paged reader leaves those keys to it — and once it fits
 * again (a smaller text size, a wider window) it is plain text and leaves the tab
 * order. Attributes only: the text, and every offset measured against it, is
 * untouched.
 */
export function ScrollRegions({
  containerRef,
  layoutVersion,
}: {
  containerRef: RefObject<HTMLElement | null>;
  layoutVersion: number;
}) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      for (const element of root.querySelectorAll<HTMLElement>(REGION_SELECTOR)) {
        const overflows = element.scrollWidth > element.clientWidth + 1;
        const marked = element.hasAttribute(MARK);
        if (overflows && !marked) {
          element.setAttribute(MARK, "");
          element.setAttribute("tabindex", "0");
          element.setAttribute("role", "region");
          element.setAttribute(
            "aria-label",
            element.matches("pre") ? "Kod örneği, yana kaydırılır" : "Tablo, yana kaydırılır",
          );
        } else if (!overflows && marked) {
          element.removeAttribute(MARK);
          element.removeAttribute("tabindex");
          element.removeAttribute("role");
          element.removeAttribute("aria-label");
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
    observer?.observe(root);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule).catch(() => {});
    schedule();
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef, layoutVersion]);

  return null;
}
