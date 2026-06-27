"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { clamp } from "@/lib/utils";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import { CATEGORY_LABELS, LEVEL_LABELS, UI } from "@/lib/content/labels";
import type { AdjacentArticle, ArticleDescriptor, CurrentArticle } from "@/lib/content/types";
import { ReaderProgressProvider, useReaderProgress } from "@/lib/progress/use-reader-progress";
import { ReaderPreferencesProvider, useReaderPreferences } from "@/lib/preferences/use-reader-preferences";
import { ReaderSidebar } from "./reader-sidebar";
import { MobileReadingList } from "./mobile-reading-list";
import { ArticleProgress } from "./article-progress";
import { ArticleNavigation } from "./article-navigation";
import { CompletionControl } from "./completion-control";
import { ReadingSettings } from "./reading-settings";
import { ArticleToc } from "./article-toc";
import { ResumeNotice } from "./resume-notice";

const COLUMN = "mx-auto w-full max-w-reading px-5";

type Props = {
  articles: ArticleDescriptor[];
  current: CurrentArticle;
  prev: AdjacentArticle;
  next: AdjacentArticle;
  children: ReactNode;
};

function ReaderShellInner({ articles, current, prev, next, children }: Props) {
  const { ready, setCurrentArticle, recordPosition, entryOf } = useReaderProgress();
  const { preferences } = useReaderPreferences();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [liveRatio, setLiveRatio] = useState(0);
  const [showNotice, setShowNotice] = useState(false);

  const readyRef = useRef(ready);
  readyRef.current = ready;
  const restoringRef = useRef(false);
  const lastRecordRef = useRef(0);
  const restoredForRef = useRef<string | null>(null);

  const measure = useCallback((): { ratio: number; headingId: string | null } => {
    const el = bodyRef.current;
    if (!el) return { ratio: 0, headingId: null };
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    const elHeight = el.offsetHeight || 1;
    const scrolledPast = window.scrollY + window.innerHeight - elTop;
    const ratio = clamp(scrolledPast / elHeight, 0, 1);

    let headingId: string | null = null;
    const headings = el.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id]");
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= TOOLBAR_OFFSET_PX + 4) headingId = heading.id;
      else break;
    }
    return { ratio, headingId };
  }, []);

  // Record the visited article once progress has hydrated (avoids clobbering saved state).
  useEffect(() => {
    if (!ready) return;
    setCurrentArticle(current.articleId);
  }, [ready, current.articleId, setCurrentArticle]);

  // Track scroll: live ratio every frame, persisted position at a gentler cadence.
  useEffect(() => {
    let frame = 0;
    function onScroll() {
      if (restoringRef.current || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const { ratio, headingId } = measure();
        setLiveRatio(ratio);
        if (!readyRef.current) return;
        const now = Date.now();
        if (now - lastRecordRef.current >= 200) {
          lastRecordRef.current = now;
          recordPosition(current.articleId, headingId, ratio);
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [measure, recordPosition, current.articleId]);

  // Restore the saved position once, after fonts and layout settle.
  useEffect(() => {
    if (!ready) return;
    if (restoredForRef.current === current.articleId) return;
    restoredForRef.current = current.articleId;

    const entry = entryOf(current.articleId);
    setLiveRatio(entry.scrollRatio);
    if (!entry.headingId && entry.scrollRatio <= 0) return;

    const run = () => {
      const el = bodyRef.current;
      if (!el) return;
      restoringRef.current = true;

      const elTop = el.getBoundingClientRect().top + window.scrollY;
      let target = 0;
      const heading = entry.headingId ? document.getElementById(entry.headingId) : null;
      if (heading) {
        target = heading.getBoundingClientRect().top + window.scrollY - TOOLBAR_OFFSET_PX;
      } else if (entry.scrollRatio > 0) {
        target = elTop + entry.scrollRatio * el.offsetHeight - window.innerHeight;
      }

      if (target > 0) {
        window.scrollTo(0, Math.max(0, target));
        setShowNotice(true);
      }
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          restoringRef.current = false;
        }),
      );
    };

    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => window.requestAnimationFrame(run)).catch(() => run());
    } else {
      window.requestAnimationFrame(run);
    }
  }, [ready, current.articleId, entryOf]);

  return (
    <div className="flex min-h-screen bg-bg">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md border border-border bg-surface px-3 py-2 font-sans text-sm text-text focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {UI.skipToContent}
      </a>

      {!preferences.focusMode && (
        <ReaderSidebar articles={articles} currentArticleId={current.articleId} />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-bg">
          <div className={`${COLUMN} flex h-14 items-center justify-between gap-3`}>
            <div className="flex min-w-0 items-center gap-3">
              <MobileReadingList articles={articles} currentArticleId={current.articleId} />
              <p className="truncate font-sans text-2xs text-text-muted">
                <span className="font-medium text-text">
                  {UI.chapter(current.readingOrder, current.totalCount)}
                </span>
                {!preferences.focusMode && (
                  <>
                    <span className="px-1.5 text-text-faint">·</span>
                    {CATEGORY_LABELS[current.category]}
                  </>
                )}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              {!preferences.focusMode && (
                <p className="hidden items-center gap-2 font-sans text-2xs text-text-muted sm:flex mr-1">
                  <span>{LEVEL_LABELS[current.level]}</span>
                  <span className="text-text-faint">·</span>
                  <span>{UI.readingTime(current.readingMinutes)}</span>
                </p>
              )}
              <ArticleToc containerRef={bodyRef} />
              <ReadingSettings />
            </div>
          </div>
          <ArticleProgress ratio={liveRatio} />
        </header>

        <ResumeNotice
          articleId={current.articleId}
          show={showNotice}
          onDismiss={() => setShowNotice(false)}
        />

        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <article className={`${COLUMN} py-10`}>
            <div ref={bodyRef} className="prose-reader">
              {children}
            </div>
            <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-6">
              <CompletionControl articleId={current.articleId} />
              <ArticleNavigation prev={prev} next={next} />
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}

export function ReaderShell(props: Props) {
  return (
    <ReaderPreferencesProvider>
      <ReaderProgressProvider>
        <ReaderShellInner {...props} />
      </ReaderProgressProvider>
    </ReaderPreferencesProvider>
  );
}
