"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CATEGORY_LABELS, LEVEL_LABELS, UI } from "@/lib/content/labels";
import type { AdjacentArticle, ArticleDescriptor, CurrentArticle } from "@/lib/content/types";
import { ReaderProgressProvider, useReaderProgress } from "@/lib/progress/use-reader-progress";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import {
  ReaderPreferencesProvider,
  useReaderPreferences,
} from "@/lib/preferences/use-reader-preferences";
import { ReaderSidebar } from "./reader-sidebar";
import { MobileReadingList } from "./mobile-reading-list";
import { ArticleProgress } from "./article-progress";
import { ArticleNavigation } from "./article-navigation";
import { CompletionControl } from "./completion-control";
import { ReadingSettings } from "./reading-settings";
import { ArticleToc } from "./article-toc";
import { ResumeNotice } from "./resume-notice";
import { SavedPlaceControl } from "./saved-place-control";
import { ArticleMarks } from "./article-marks";
import { HighlightLayer } from "./highlight-layer";
import { HighlightSelectionAction } from "./highlight-selection-action";
import { SyncStatus } from "./sync-status";
import { ReaderPager } from "./reader-pager";
import { useReaderLayout } from "@/lib/reader-layout/use-reader-layout";

type Props = {
  articles: ArticleDescriptor[];
  current: CurrentArticle;
  prev: AdjacentArticle;
  next: AdjacentArticle;
  children: ReactNode;
  /** Route base for article links; the series reader passes "/seri". */
  basePath?: string;
  listTitle?: string;
  listSubtitle?: string;
  homeHref?: string;
};

function ReaderShellInner({
  articles,
  current,
  prev,
  next,
  children,
  basePath = "/read",
  listTitle,
  listSubtitle,
  homeHref,
}: Props) {
  const { ready, setCurrentArticle, recordPosition, entryOf } = useReaderProgress();
  const { savedPlaceOf } = useReaderData();
  const { preferences } = useReaderPreferences();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [liveRatio, setLiveRatio] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const reflowKey = [
    preferences.fontScale,
    preferences.lineSpacing,
    preferences.measure,
    preferences.fontFamily,
    preferences.textAlign,
    preferences.paragraphSpacing,
    preferences.firstLineIndent,
    preferences.hyphenation,
    preferences.letterSpacing,
  ].join(":");
  const {
    effectiveMode,
    measure,
    navigateTo,
    navigateToElement,
    pageIndex,
    pageCount,
    previousPage,
    nextPage,
    layoutVersion,
  } = useReaderLayout({
    containerRef: bodyRef,
    preferredMode: preferences.readingMode,
    reflowKey,
  });

  const readyRef = useRef(ready);
  readyRef.current = ready;
  const restoringRef = useRef(false);
  const lastRecordRef = useRef(0);
  const restoredForRef = useRef<string | null>(null);

  const jumpToPosition = useCallback(
    (headingId: string | null, ratio: number) => {
      navigateTo({ headingId, ratio }, "smooth");
    },
    [navigateTo],
  );

  // Record the visited article once progress has hydrated (avoids clobbering saved state).
  useEffect(() => {
    if (!ready) return;
    setCurrentArticle(current.articleId);
  }, [ready, current.articleId, setCurrentArticle]);

  // Track scroll: live ratio every frame, persisted position at a gentler cadence.
  useEffect(() => {
    let frame = 0;
    let recordTimer: ReturnType<typeof setTimeout> | null = null;

    function capturePosition(persist: boolean) {
      const { ratio, headingId } = measure();
      setLiveRatio(ratio);
      setActiveHeadingId(headingId);
      if (!persist || !readyRef.current) return;
      lastRecordRef.current = Date.now();
      recordPosition(current.articleId, headingId, ratio);
    }

    function onScroll() {
      if (restoringRef.current || frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const elapsed = Date.now() - lastRecordRef.current;
        if (elapsed >= 200) {
          if (recordTimer) {
            clearTimeout(recordTimer);
            recordTimer = null;
          }
          capturePosition(true);
          return;
        }

        capturePosition(false);
        if (!recordTimer) {
          recordTimer = setTimeout(() => {
            recordTimer = null;
            if (!restoringRef.current) capturePosition(true);
          }, 200 - elapsed);
        }
      });
    }
    const scrollTarget = effectiveMode === "paged" ? bodyRef.current : window;
    scrollTarget?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scrollTarget?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (recordTimer) clearTimeout(recordTimer);
    };
  }, [effectiveMode, measure, recordPosition, current.articleId]);

  // Restore the saved position once, after fonts and layout settle.
  useEffect(() => {
    if (!ready) return;
    const restoreKey = `${current.articleId}:${effectiveMode}`;
    if (restoredForRef.current === restoreKey) return;
    restoredForRef.current = restoreKey;

    const automaticEntry = entryOf(current.articleId);
    const explicitPlace = new URLSearchParams(window.location.search).has("place")
      ? savedPlaceOf(current.articleId)
      : null;
    const entry = explicitPlace ?? automaticEntry;
    setLiveRatio(entry.scrollRatio);
    setActiveHeadingId(entry.headingId);
    if (!entry.headingId && entry.scrollRatio <= 0) return;

    const run = () => {
      restoringRef.current = true;
      navigateTo({ headingId: entry.headingId, ratio: entry.scrollRatio }, "auto");
      setShowNotice(true);
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
  }, [ready, current.articleId, effectiveMode, entryOf, savedPlaceOf, navigateTo]);

  return (
    <div
      className="reader-shell flex min-h-screen bg-bg"
      data-reading-mode={effectiveMode}
      data-colored-lines={preferences.coloredLines}
    >
      <a
        href="#main"
        className="sr-only z-[60] rounded-md border border-border bg-surface px-3 py-2 font-sans text-sm text-text focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        {UI.skipToContent}
      </a>

      {!preferences.focusMode && (
        <ReaderSidebar
          articles={articles}
          currentArticleId={current.articleId}
          basePath={basePath}
          title={listTitle}
          subtitle={listSubtitle}
          homeHref={homeHref}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-bg">
          <div className="reader-area flex h-14 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <MobileReadingList
                articles={articles}
                currentArticleId={current.articleId}
                basePath={basePath}
                title={listTitle}
                subtitle={listSubtitle}
                homeHref={homeHref}
              />
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
                <p className="mr-1 hidden items-center gap-2 font-sans text-2xs text-text-muted sm:flex">
                  <span>{LEVEL_LABELS[current.level]}</span>
                  <span className="text-text-faint">·</span>
                  <span>{UI.readingTime(current.readingMinutes)}</span>
                </p>
              )}
              <ArticleToc
                containerRef={bodyRef}
                activeHeadingId={effectiveMode === "paged" ? activeHeadingId : undefined}
                onNavigate={(headingId) => navigateTo({ headingId, ratio: 0 })}
              />
              <SavedPlaceControl
                articleId={current.articleId}
                containerRef={bodyRef}
                measure={measure}
              />
              <ArticleMarks
                articleId={current.articleId}
                containerRef={bodyRef}
                onJumpToPlace={jumpToPosition}
                onJumpToTarget={navigateToElement}
              />
              <ReadingSettings />
              <SyncStatus />
            </div>
          </div>
          <ArticleProgress ratio={liveRatio} />
        </header>

        <ResumeNotice
          articleId={current.articleId}
          show={showNotice}
          onDismiss={() => setShowNotice(false)}
          onStartOver={() => navigateTo({ headingId: null, ratio: 0 }, "auto")}
        />

        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <article className="reader-area py-10">
            <div ref={bodyRef} className="prose-reader">
              {children}
            </div>
            {effectiveMode === "paged" && (
              <ReaderPager
                pageIndex={pageIndex}
                pageCount={pageCount}
                onPrevious={previousPage}
                onNext={nextPage}
              />
            )}
            <HighlightLayer
              articleId={current.articleId}
              containerRef={bodyRef}
              layoutVersion={layoutVersion}
              onNavigateToTarget={navigateToElement}
            />
            <HighlightSelectionAction articleId={current.articleId} containerRef={bodyRef} />
            <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-6">
              <CompletionControl articleId={current.articleId} />
              <ArticleNavigation prev={prev} next={next} basePath={basePath} />
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
