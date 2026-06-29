"use client";

import type { RefObject } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import { useReaderData } from "@/lib/reader-data/use-reader-data";

type Position = { ratio: number; headingId: string | null };

function previewNearViewport(root: HTMLElement): string {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("p, li, blockquote"));
  const target = blocks.find(
    (block) => block.getBoundingClientRect().bottom > TOOLBAR_OFFSET_PX + 24,
  );
  return (target?.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 280);
}

export function SavedPlaceControl({
  articleId,
  containerRef,
  measure,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
  measure: () => Position;
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
        savePlace(articleId, position.headingId, position.ratio, previewNearViewport(root));
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
