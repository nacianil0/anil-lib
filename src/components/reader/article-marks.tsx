"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Highlighter, MapPin, Trash2 } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { resolveTextAnchor } from "@/lib/highlights/text-anchor";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import { useReaderData } from "@/lib/reader-data/use-reader-data";

export function ArticleMarks({
  articleId,
  containerRef,
  onJumpToPlace,
}: {
  articleId: string;
  containerRef: RefObject<HTMLElement | null>;
  onJumpToPlace: (headingId: string | null, ratio: number) => void;
}) {
  const { savedPlaceOf, removeSavedPlace, highlightsFor, removeHighlight } = useReaderData();
  const savedPlace = savedPlaceOf(articleId);
  const highlights = highlightsFor(articleId);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const count = highlights.length + (savedPlace ? 1 : 0);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label={UI.articleMarks}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex items-center rounded-md border border-border px-2.5 py-1.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
      >
        <Highlighter className="h-4 w-4" aria-hidden="true" />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 min-w-4 rounded-full bg-accent px-1 font-mono text-[9px] leading-4 text-white">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={UI.articleMarks}
          className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100vh-5rem)] w-[21rem] overflow-y-auto rounded-lg border border-border bg-surface p-3 font-sans shadow-xl max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[70dvh] max-sm:w-full max-sm:rounded-b-none"
        >
          <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
            <p className="text-sm font-semibold text-text">{UI.articleMarks}</p>
            <span className="font-mono text-2xs text-text-faint">{count}</span>
          </div>

          {!savedPlace && highlights.length === 0 && (
            <p className="py-5 text-center text-xs leading-relaxed text-text-muted">
              {UI.noArticleMarks}
            </p>
          )}

          {savedPlace && (
            <div className="border-accent/30 mb-2 rounded-md border bg-accent-soft p-2.5">
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => {
                    onJumpToPlace(savedPlace.headingId, savedPlace.scrollRatio);
                    setOpen(false);
                  }}
                >
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {UI.savedPlace}
                  </span>
                  <span className="mt-1 line-clamp-2 block font-serif text-sm leading-snug text-text">
                    {savedPlace.previewText || UI.savedPlace}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={UI.removeSavedPlace}
                  title={UI.removeSavedPlace}
                  onClick={() => removeSavedPlace(articleId)}
                  className="rounded p-1 text-text-faint hover:bg-surface hover:text-accent"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="flex items-start gap-2 border-b border-border p-2 last:border-0"
              >
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => {
                    const root = containerRef.current;
                    const range = root ? resolveTextAnchor(root, highlight) : null;
                    if (range) {
                      const rect = range.getBoundingClientRect();
                      window.scrollTo({
                        top: Math.max(0, rect.top + window.scrollY - TOOLBAR_OFFSET_PX - 12),
                        behavior: "smooth",
                      });
                    }
                    setOpen(false);
                  }}
                >
                  <span className="line-clamp-3 font-serif text-sm leading-snug text-text">
                    “{highlight.exactText.trim()}”
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={UI.removeHighlight}
                  title={UI.removeHighlight}
                  onClick={() => removeHighlight(highlight.id)}
                  className="rounded p-1 text-text-faint hover:bg-surface-muted hover:text-accent"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
