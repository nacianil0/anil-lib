"use client";

import { useEffect, type RefObject } from "react";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import { clearRegisteredHighlights, registerHighlights } from "@/lib/highlights/highlight-registry";

export function HighlightLayer({
  articleId,
  containerRef,
  layoutVersion,
  onNavigateToTarget,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
  layoutVersion: number;
  onNavigateToTarget: (target: Range, behavior?: ScrollBehavior) => void;
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
      onNavigateToTarget(target, "smooth");
    }
    return clearRegisteredHighlights;
  }, [containerRef, highlights, layoutVersion, onNavigateToTarget]);

  return null;
}
