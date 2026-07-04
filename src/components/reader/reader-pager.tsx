"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UI } from "@/lib/content/labels";

function ownsArrowKeys(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      "a, button, input, select, textarea, summary, [contenteditable='true'], [role='button']",
    ),
  );
}

export function ReaderPager({
  pageIndex,
  pageCount,
  onPrevious,
  onNext,
}: {
  pageIndex: number;
  pageCount: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const atStart = pageIndex <= 0;
  const atEnd = pageIndex >= pageCount - 1;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      ) {
        return;
      }
      if (ownsArrowKeys(event.target) || window.getSelection()?.toString()) return;
      if (event.key === "ArrowLeft" && !atStart) {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === "ArrowRight" && !atEnd) {
        event.preventDefault();
        onNext();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [atEnd, atStart, onNext, onPrevious]);

  return (
    <nav
      aria-label="Sayfa gezintisi"
      className="reader-pager mt-4 flex items-center justify-center gap-3 font-sans"
    >
      <button
        type="button"
        aria-label={UI.previousPage}
        disabled={atStart}
        onClick={onPrevious}
        className="rounded-md border border-border p-1.5 text-text-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-text disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className="min-w-20 text-center font-mono text-2xs tabular-nums text-text-muted"
      >
        {UI.pagePosition(pageIndex + 1, pageCount)}
      </span>
      <button
        type="button"
        aria-label={UI.nextPage}
        disabled={atEnd}
        onClick={onNext}
        className="rounded-md border border-border p-1.5 text-text-muted transition-colors hover:border-border-strong hover:bg-surface-muted hover:text-text disabled:cursor-not-allowed disabled:opacity-35"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
