"use client";

import type { RefObject } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import type { ReadingAnchor } from "@/lib/reader-data/schema";
import { useReaderData } from "@/lib/reader-data/use-reader-data";

type Position = { ratio: number; headingId: string | null };

function previewNearViewport(root: HTMLElement): string {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("p, li, blockquote"));
  const rootRect = root.getBoundingClientRect();
  const target = blocks.find((block) => {
    const rect = block.getBoundingClientRect();
    const horizontallyVisible = rect.right > rootRect.left && rect.left < rootRect.right;
    return horizontallyVisible && rect.bottom > Math.max(rootRect.top, TOOLBAR_OFFSET_PX) + 24;
  });
  return (target?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 280);
}

export function SavedPlaceControl({
  articleId,
  containerRef,
  measure,
  captureAnchor,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
  measure: () => Position;
  captureAnchor: () => ReadingAnchor | null;
}) {
  const { savedPlaceOf, savePlace } = useReaderData();
  const saved = savedPlaceOf(articleId);
  const label = saved ? UI.updateSavedPlace : UI.savePlace;
  const Icon = saved ? BookmarkCheck : Bookmark;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={Boolean(saved)}
      onClick={() => {
        const root = containerRef.current;
        if (!root) return;
        const position = measure();
        const anchor = captureAnchor();
        // The anchored paragraph is by definition the one at the reading line, so it
        // is a truer preview than a second, independent scan of the viewport.
        const preview = anchor
          ? anchor.exactText.replace(/\s+/g, " ").trim()
          : previewNearViewport(root);
        savePlace(articleId, position.headingId, position.ratio, preview, anchor);
      }}
      className={`inline-flex items-center rounded-md border px-2.5 py-1.5 transition-colors ${
        saved
          ? "border-accent/60 bg-accent-soft text-accent"
          : "border-border text-text-muted hover:border-border-strong hover:text-text"
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
