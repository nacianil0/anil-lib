"use client";

import { useEffect, type RefObject } from "react";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import { clearRegisteredHighlights, registerHighlights } from "@/lib/highlights/highlight-registry";

export function HighlightLayer({
  articleId,
  containerRef,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { highlightsFor } = useReaderData();
  const highlights = highlightsFor(articleId);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const resolved = registerHighlights(root, highlights);
    const highlightId = new URLSearchParams(window.location.search).get("highlight");
    const target = highlightId ? resolved.get(highlightId) : null;
    if (target) {
      const rect = target.getBoundingClientRect();
      window.scrollTo({
        top: Math.max(0, rect.top + window.scrollY - TOOLBAR_OFFSET_PX - 12),
        behavior: "smooth",
      });
    }
    return clearRegisteredHighlights;
  }, [containerRef, highlights]);

  return null;
}
