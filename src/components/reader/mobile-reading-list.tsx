"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ListTree, X } from "lucide-react";
import { UI } from "@/lib/content/labels";
import type { ArticleDescriptor } from "@/lib/content/types";
import { LockButton } from "./lock-button";
import { ReadingList } from "./reading-list";
import { ProgressMeter } from "./progress-meter";
import { useReaderPreferences } from "@/lib/preferences/use-reader-preferences";

type Props = {
  articles: ArticleDescriptor[];
  currentArticleId: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileReadingList({ articles, currentArticleId }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const articleIds = articles.map((article) => article.articleId);

  const { preferences } = useReaderPreferences();

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open && preferences.focusMode) {
      close();
    }
  }, [open, preferences.focusMode, close]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusables = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    focusables()[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={UI.openReadingList}
        className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-sans text-2xs text-text-muted transition-colors hover:border-border-strong hover:text-text lg:hidden"
      >
        <ListTree className="h-4 w-4" aria-hidden="true" />
        <span>{UI.readingList}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 h-full w-full cursor-default bg-black/40"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={UI.readingList}
            className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-border bg-surface shadow-xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-4 py-3">
              <div>
                <p className="font-serif text-base font-semibold leading-tight text-text">
                  {UI.libraryTitle}
                </p>
                <p className="mt-0.5 font-sans text-2xs text-text-muted">{UI.librarySubtitle}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={UI.closeReadingList}
                className="rounded-md border border-border p-1.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="shrink-0 border-b border-border">
              <ProgressMeter articleIds={articleIds} />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pt-3">
              <ReadingList
                articles={articles}
                currentArticleId={currentArticleId}
                onNavigate={close}
                idPrefix="mobile"
              />
            </div>
            <div className="flex shrink-0 items-center justify-between border-t border-border px-4 py-3">
              <LockButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
