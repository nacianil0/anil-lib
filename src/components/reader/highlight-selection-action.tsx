"use client";

import { useEffect, useState, type RefObject } from "react";
import { Highlighter } from "lucide-react";
import { serializeTextAnchor } from "@/lib/highlights/text-anchor";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import { UI } from "@/lib/content/labels";

type PendingSelection = { range: Range; left: number; top: number };

export function HighlightSelectionAction({
  articleId,
  containerRef,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { addHighlight } = useReaderData();
  const [pending, setPending] = useState<PendingSelection | null>(null);

  useEffect(() => {
    function inspectSelection() {
      const root = containerRef.current;
      const selection = window.getSelection();
      if (!root || !selection || selection.rangeCount !== 1 || selection.isCollapsed) {
        setPending(null);
        return;
      }
      const range = selection.getRangeAt(0);
      if (!serializeTextAnchor(root, range)) {
        setPending(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      setPending({
        range: range.cloneRange(),
        left: Math.min(window.innerWidth - 116, Math.max(8, rect.left + rect.width / 2 - 54)),
        top: Math.max(64, rect.top - 42),
      });
    }
    document.addEventListener("mouseup", inspectSelection);
    document.addEventListener("keyup", inspectSelection);
    return () => {
      document.removeEventListener("mouseup", inspectSelection);
      document.removeEventListener("keyup", inspectSelection);
    };
  }, [containerRef]);

  if (!pending) return null;

  return (
    <button
      type="button"
      className="border-accent/60 fixed z-[55] inline-flex items-center gap-1.5 rounded-md border bg-surface px-2.5 py-1.5 font-sans text-xs font-medium text-accent shadow-xl"
      style={{ left: pending.left, top: pending.top }}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => {
        const root = containerRef.current;
        if (!root) return;
        const anchor = serializeTextAnchor(root, pending.range);
        if (anchor) addHighlight(articleId, anchor);
        window.getSelection()?.removeAllRanges();
        setPending(null);
      }}
    >
      <Highlighter className="h-3.5 w-3.5" aria-hidden="true" />
      {UI.markSelection}
    </button>
  );
}
