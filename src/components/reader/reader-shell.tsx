"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { readBeforeRevision } from "@/lib/content/revision";
import { CATEGORY_LABELS, LEVEL_LABELS, UI } from "@/lib/content/labels";
import type { AdjacentArticle, ArticleDescriptor, CurrentArticle } from "@/lib/content/types";
import { phaseForOrder, type PhaseOutline } from "@/lib/content/series-progress";
import { ReaderProgressProvider, useReaderProgress } from "@/lib/progress/use-reader-progress";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import {
  ReaderPreferencesProvider,
  useReaderPreferences,
} from "@/lib/preferences/use-reader-preferences";
import { ReaderSidebar } from "./reader-sidebar";
import { MobileReadingList } from "./mobile-reading-list";
import { ArticleProgress } from "./article-progress";
import { ArticleNavigation, CompactArticleNavigation } from "./article-navigation";
import { CompletionControl } from "./completion-control";
import { ReadingSettings } from "./reading-settings";
import { ArticleToc } from "./article-toc";
import { ChapterHeader } from "./chapter-header";
import { FigureViewer } from "./figure-viewer";
import { ResumeNotice } from "./resume-notice";
import { RevisionNotice } from "./revision-notice";
import { SavedPlaceControl } from "./saved-place-control";
import { ArticleMarks } from "./article-marks";
import { HighlightLayer } from "./highlight-layer";
import { LineGuideLayer } from "./line-guide-layer";
import { HighlightSelectionAction } from "./highlight-selection-action";
import { SyncStatus } from "./sync-status";
import { ReaderPager } from "./reader-pager";
import { useReaderLayout } from "@/lib/reader-layout/use-reader-layout";
import { useWheelPaging } from "@/lib/reader-layout/use-wheel-paging";
import { resolveReadingAnchor } from "@/lib/reader-layout/reading-anchor";
import { STARTED_RATIO, TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import type { SavedPlaceRecord } from "@/lib/reader-data/schema";

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
  /** The series roadmap's phases; the reading list and the chapter header follow them. */
  phases?: PhaseOutline[];
  /**
   * Series chapters keep their title in frontmatter and open on an `h2`, so the
   * shell sets the title above the text. Archive articles carry their own `h1`.
   */
  showTitle?: boolean;
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
  phases,
  showTitle = false,
}: Props) {
  const { ready, setCurrentArticle, recordPosition, entryOf } = useReaderProgress();
  const { progressOf, savedPlaceOf, resetVersion } = useReaderData();
  const { preferences } = useReaderPreferences();
  // Whether this reader had read the article before its last editorial revision.
  // Decided once, in the render where progress becomes available — the same render
  // that lets the saved position be restored — and frozen for the visit: reading on
  // refreshes lastReadAt and must not flip the notice or the resume pill mid-article.
  // A progress reset arriving mid-visit is the one exception: that reading is gone.
  const revisedSinceRead = useMemo(
    () => (ready ? readBeforeRevision(entryOf(current.articleId), current.revisedAt) : false),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- frozen per article on purpose
    [ready, current.articleId, current.revisedAt, resetVersion],
  );
  const bodyRef = useRef<HTMLDivElement>(null);
  const readingAreaRef = useRef<HTMLElement>(null);
  const [liveRatio, setLiveRatio] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const [showNotice, setShowNotice] = useState(false);
  const [restoredPreview, setRestoredPreview] = useState<string | null>(null);
  const reflowKey = [
    preferences.fontScale,
    preferences.lineSpacing,
    preferences.measure,
    preferences.fontFamily,
    preferences.paragraphSpacing,
    preferences.firstLineIndent,
    preferences.hyphenation,
    preferences.letterSpacing,
  ].join(":");
  const {
    effectiveMode,
    isPagedAvailable,
    measure,
    captureAnchor,
    forgetAnchor,
    isLayoutSettling,
    navigateTo,
    navigateToAnchor,
    navigateToElement,
    pageIndex,
    pageCount,
    previousPage,
    nextPage,
    turnPage,
    layoutVersion,
  } = useReaderLayout({
    containerRef: bodyRef,
    preferredMode: preferences.readingMode,
    reflowKey,
  });

  // The chapter title sits above the text in the flowing layout. Once it has
  // scrolled under the toolbar, the toolbar says it instead, so the reader can
  // always tell which chapter this is; the paged frame has no room above its
  // columns, so there the toolbar carries it throughout.
  const chapterHeaderRef = useRef<HTMLElement>(null);
  const [titleInView, setTitleInView] = useState(true);
  const headerShown = showTitle && effectiveMode !== "paged";
  useEffect(() => {
    const element = chapterHeaderRef.current;
    if (!headerShown || !element || typeof IntersectionObserver === "undefined") {
      setTitleInView(false);
      return;
    }
    setTitleInView(true);
    const observer = new IntersectionObserver(([entry]) => setTitleInView(entry.isIntersecting), {
      rootMargin: `-${TOOLBAR_OFFSET_PX}px 0px 0px 0px`,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [headerShown, current.articleId]);
  const currentPhase = phases ? phaseForOrder(current.readingOrder, phases) : null;
  const toolbarContext = showTitle
    ? titleInView
      ? null
      : current.title
    : preferences.focusMode
      ? null
      : CATEGORY_LABELS[current.category];

  // In the paged layout the frame does not scroll, so a scroll over the article is
  // a page turn — one per gesture, however long its momentum runs on.
  useWheelPaging({
    areaRef: readingAreaRef,
    contentRef: bodyRef,
    enabled: effectiveMode === "paged",
    onTurn: turnPage,
  });

  const readyRef = useRef(ready);
  readyRef.current = ready;
  const restoringRef = useRef(false);
  const lastRecordRef = useRef(0);
  // Whether the view was put at a stored position on this visit, and the reset version
  // it was stored under; see the reset effect below.
  const restoredFromStoreRef = useRef(false);
  const seenResetRef = useRef<number | null>(null);
  const resetVersionRef = useRef(resetVersion);
  resetVersionRef.current = resetVersion;
  /**
   * Persisting is held back until the saved position has been put back on screen.
   * Without this a resize — a mobile URL bar collapsing is enough — or an early
   * scroll event overwrites the stored position with the top of the article before
   * the reader ever sees where they were.
   */
  const restoreRef = useRef({ articleId: "", mode: "", done: false });

  const jumpToPlace = useCallback(
    (place: SavedPlaceRecord) => {
      const root = bodyRef.current;
      const resolved =
        root && place.anchor ? resolveReadingAnchor(root, place.anchor, place.headingId) : null;
      if (resolved && navigateToAnchor(resolved, "smooth")) return;
      navigateTo({ headingId: place.headingId, ratio: place.scrollRatio }, "smooth");
    },
    [navigateTo, navigateToAnchor],
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
      const restore = restoreRef.current;
      if (!restore.done || restore.articleId !== current.articleId) return;
      // A preference change reflows the text under the reader before the position is
      // put back; recording in that window would save a place they never read to.
      if (isLayoutSettling()) return;
      lastRecordRef.current = Date.now();
      recordPosition(current.articleId, headingId, ratio, captureAnchor());
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
  }, [effectiveMode, measure, captureAnchor, isLayoutSettling, recordPosition, current.articleId]);

  // Restore the saved position once, after fonts and layout settle.
  useEffect(() => {
    if (!ready) return;
    const restore = restoreRef.current;
    if (restore.articleId === current.articleId && restore.mode === effectiveMode) return;
    restoreRef.current = { articleId: current.articleId, mode: effectiveMode, done: false };
    restoredFromStoreRef.current = false;
    const resetAtStart = resetVersionRef.current;

    const params = new URLSearchParams(window.location.search);
    const explicitPlace = params.has("place") ? savedPlaceOf(current.articleId) : null;
    const entry = explicitPlace ?? progressOf(current.articleId);
    const headingId = entry?.headingId ?? null;
    const ratio = entry?.scrollRatio ?? 0;
    const anchor = entry?.anchor ?? null;
    setLiveRatio(ratio);
    setActiveHeadingId(headingId);

    const finish = () => {
      restoreRef.current = { articleId: current.articleId, mode: effectiveMode, done: true };
      // Seed the layout's remembered paragraph so a preference change made before the
      // first scroll still holds the reader's place.
      captureAnchor();
    };

    // Nothing to return to when the stored position is the opening paragraph: the
    // reader is already there, and scrolling the title out of view would be worse
    // than doing nothing. A highlight deep link is likewise an explicit destination
    // the automatic restore would only fight; persistence still resumes for both.
    const atArticleStart = anchor
      ? anchor.blockIndex === 0 && anchor.blockOffset <= 0
      : !headingId && ratio <= STARTED_RATIO;
    if (params.has("highlight") || atArticleStart) {
      finish();
      return;
    }

    const run = () => {
      // A progress reset landed while the fonts loaded: the place read above is gone.
      if (!explicitPlace && resetVersionRef.current !== resetAtStart) {
        setLiveRatio(0);
        setActiveHeadingId(null);
        finish();
        return;
      }
      restoringRef.current = true;
      // A saved place is a destination the reader picked; only progress is reset-bound.
      restoredFromStoreRef.current = !explicitPlace;
      const root = bodyRef.current;
      const resolved = root && anchor ? resolveReadingAnchor(root, anchor, headingId) : null;
      // A resolved anchor is exact; heading + ratio is the fallback for records written
      // before anchoring, and for text that has since been edited away.
      if (!resolved || !navigateToAnchor(resolved, "auto")) {
        navigateTo({ headingId, ratio }, "auto");
      }
      setRestoredPreview(anchor ? anchor.exactText.replace(/\s+/g, " ").trim() : null);
      setShowNotice(true);
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          restoringRef.current = false;
          finish();
        }),
      );
    };

    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => window.requestAnimationFrame(run)).catch(() => run());
    } else {
      window.requestAnimationFrame(run);
    }
  }, [
    ready,
    current.articleId,
    effectiveMode,
    progressOf,
    savedPlaceOf,
    captureAnchor,
    navigateTo,
    navigateToAnchor,
  ]);

  // The account's reading was reset elsewhere, and this device learned it only after
  // putting the reader back at a place stored before the reset. Left there, the next
  // scroll would save that place — and the completion it implies — straight back. So
  // the reader returns to the start, as after "Baştan başla". A view the reader
  // reached on their own this visit is theirs and stays.
  useEffect(() => {
    if (!ready) return;
    const seen = seenResetRef.current;
    seenResetRef.current = resetVersion;
    if (seen === null || resetVersion <= seen || !restoredFromStoreRef.current) return;
    restoredFromStoreRef.current = false;
    setShowNotice(false);
    setRestoredPreview(null);
    forgetAnchor();
    navigateTo({ headingId: null, ratio: 0 }, "auto");
  }, [ready, resetVersion, forgetAnchor, navigateTo]);

  return (
    <div
      className="reader-shell flex min-h-screen bg-bg"
      data-reading-mode={effectiveMode}
      data-line-guide={preferences.lineGuide}
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
          phases={phases}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-bg">
          <div className="reader-area flex h-14 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <MobileReadingList
                articles={articles}
                currentArticleId={current.articleId}
                basePath={basePath}
                title={listTitle}
                subtitle={listSubtitle}
                homeHref={homeHref}
                phases={phases}
              />
              <p className="min-w-0 truncate font-sans text-2xs text-text-muted">
                <span className="font-medium text-text">
                  {/* A phone has ~75px here: "Bölüm 38 / 1…" lost the very number
                      it exists to show, so the word is dropped visually there. */}
                  <span className="sm:hidden" aria-hidden="true">
                    {UI.chapterShort(current.readingOrder, current.totalCount)}
                  </span>
                  <span className="max-sm:sr-only">
                    {UI.chapter(current.readingOrder, current.totalCount)}
                  </span>
                </span>
                {toolbarContext && (
                  <span className="hidden sm:inline">
                    <span className="px-1.5 text-text-faint">·</span>
                    {toolbarContext}
                  </span>
                )}
              </p>
              {/* Chapter navigation sits with the chapter number. Below `lg` the toolbar
                  still carries the reading-list button and has no room for it, so the
                  article footer keeps these controls there. */}
              <div className="hidden shrink-0 lg:block">
                <CompactArticleNavigation prev={prev} next={next} basePath={basePath} />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
              {/* Series chapters show level and time under their title; the paged
                  frame has no title block, so there the toolbar keeps them. */}
              {!preferences.focusMode && !headerShown && (
                <p className="mr-1 hidden items-center gap-2 font-sans text-2xs text-text-muted sm:flex">
                  <span>{LEVEL_LABELS[current.level]}</span>
                  <span className="text-text-faint">·</span>
                  <span>{UI.readingTime(current.readingMinutes)}</span>
                </p>
              )}
              <div className="hidden lg:block">
                <CompletionControl articleId={current.articleId} compact />
              </div>
              <ArticleToc
                containerRef={bodyRef}
                activeHeadingId={effectiveMode === "paged" ? activeHeadingId : undefined}
                onNavigate={(headingId) => navigateTo({ headingId, ratio: 0 })}
              />
              <SavedPlaceControl
                articleId={current.articleId}
                containerRef={bodyRef}
                measure={measure}
                captureAnchor={captureAnchor}
              />
              <ArticleMarks
                articleId={current.articleId}
                containerRef={bodyRef}
                onJumpToPlace={jumpToPlace}
                onJumpToTarget={navigateToElement}
              />
              <ReadingSettings isPagedAvailable={isPagedAvailable} />
              <SyncStatus />
            </div>
          </div>
          <ArticleProgress ratio={liveRatio} />
        </header>

        <ResumeNotice
          articleId={current.articleId}
          show={showNotice}
          preview={restoredPreview}
          revisedSinceRead={revisedSinceRead}
          onDismiss={() => setShowNotice(false)}
          onStartOver={() => {
            forgetAnchor();
            navigateTo({ headingId: null, ratio: 0 }, "auto");
          }}
        />

        <main ref={readingAreaRef} id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <article className="reader-area py-10">
            {headerShown && (
              <ChapterHeader
                ref={chapterHeaderRef}
                eyebrow={
                  currentPhase
                    ? `${UI.phase(currentPhase.number)} · ${currentPhase.phase.title}`
                    : CATEGORY_LABELS[current.category]
                }
                title={current.title}
                meta={[LEVEL_LABELS[current.level], UI.readingTime(current.readingMinutes)]}
              />
            )}
            {current.revisedAt && current.revisionNote && (
              <RevisionNotice
                revisedAt={current.revisedAt}
                note={current.revisionNote}
                sinceRead={revisedSinceRead}
                compact={effectiveMode === "paged"}
                concealed={effectiveMode === "paged" && pageIndex > 0}
              />
            )}
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
            <LineGuideLayer
              enabled={preferences.lineGuide}
              containerRef={bodyRef}
              layoutVersion={layoutVersion}
              articleId={current.articleId}
            />
            <HighlightSelectionAction articleId={current.articleId} containerRef={bodyRef} />
            <FigureViewer containerRef={bodyRef} articleId={current.articleId} />
            {/* From `lg` up both of these live in the toolbar, where they are reachable
                without leaving the text — and where the paged layout, which never
                scrolls the page, can reach them at all. */}
            <footer className="mt-14 flex flex-col gap-6 border-t border-border pt-6 lg:hidden">
              <CompletionControl articleId={current.articleId} />
              <ArticleNavigation prev={prev} next={next} basePath={basePath} />
            </footer>
          </article>
        </main>
      </div>
    </div>
  );
}

export function ReaderShell({ workspaceId, ...props }: Props & { workspaceId: string }) {
  return (
    <ReaderPreferencesProvider>
      <ReaderProgressProvider workspaceId={workspaceId}>
        <ReaderShellInner {...props} />
      </ReaderProgressProvider>
    </ReaderPreferencesProvider>
  );
}
