"use client";

import { useEffect, type RefObject } from "react";
import { clearLineGuide, paintLineGuide } from "@/lib/reader-layout/line-guide";

/** Time a drag-resize is given to come to rest before every line is measured again. */
const RESIZE_SETTLE_MS = 150;

/**
 * Keeps the line guide on the lines. The bands are drawn from the text's own
 * geometry, so they have to be measured again whenever that geometry changes: a
 * typography preference (`layoutVersion`), a new article, or a resized window.
 */
export function LineGuideLayer({
  enabled,
  containerRef,
  layoutVersion,
  articleId,
}: {
  enabled: boolean;
  containerRef: RefObject<HTMLElement | null>;
  layoutVersion: number;
  articleId: string;
}) {
  useEffect(() => {
    const root = containerRef.current;
    if (!enabled || !root) {
      clearLineGuide();
      return;
    }
    paintLineGuide(root);

    let timer: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (root) paintLineGuide(root);
      }, RESIZE_SETTLE_MS);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (timer) clearTimeout(timer);
      clearLineGuide();
    };
  }, [enabled, containerRef, layoutVersion, articleId]);

  return null;
}
