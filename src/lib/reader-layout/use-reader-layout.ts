"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { clamp } from "@/lib/utils";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import type { ReaderPreferences } from "@/lib/preferences/schema";
import type { ReadingAnchor } from "@/lib/reader-data/schema";
import {
  flowBlockIndexAt,
  flowBlockOffset,
  pagedBlockIndexAt,
  readingAnchorBlocks,
  serializeReadingAnchor,
  type ResolvedReadingAnchor,
} from "./reading-anchor";
import {
  pageForLogicalOffset,
  pageForRatio,
  pageMetrics,
  ratioForPage,
  scrollLeftForPage,
  type PageMetrics,
} from "./pagination";

export type ReadingPosition = { ratio: number; headingId: string | null };
type NavigableTarget = { getBoundingClientRect(): DOMRect };

/** The y coordinate the reader actually reads from: just below the sticky toolbar. */
const READING_LINE_PX = TOOLBAR_OFFSET_PX + 4;
/** Breathing room left above a restored position so it does not hug the toolbar. */
const RESTORE_GAP_PX = 12;

function columnGapOf(element: HTMLElement): number {
  const value = Number.parseFloat(window.getComputedStyle(element).columnGap);
  return Number.isFinite(value) ? value : 0;
}

function metricsOf(element: HTMLElement): PageMetrics {
  return pageMetrics(
    element.scrollWidth,
    element.clientWidth,
    element.scrollLeft,
    columnGapOf(element),
  );
}

function motionSafeBehavior(behavior: ScrollBehavior): ScrollBehavior {
  if (behavior !== "smooth") return behavior;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function logicalLeftOf(element: HTMLElement, target: NavigableTarget): number {
  const rootRect = element.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  return targetRect.left - rootRect.left + element.scrollLeft;
}

function pagedHeadingId(element: HTMLElement, metrics: PageMetrics): string | null {
  let headingId: string | null = null;
  const headings = element.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id]");
  for (const heading of headings) {
    const headingPage = pageForLogicalOffset(logicalLeftOf(element, heading), metrics);
    if (headingPage <= metrics.pageIndex) headingId = heading.id;
    else break;
  }
  return headingId;
}

function flowHeadingId(element: HTMLElement): string | null {
  let headingId: string | null = null;
  const headings = element.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id]");
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= READING_LINE_PX) headingId = heading.id;
    else break;
  }
  return headingId;
}

function scrollWindowTo(top: number, behavior: ScrollBehavior) {
  const target = Math.max(0, top);
  if (behavior === "auto") window.scrollTo(0, target);
  else window.scrollTo({ top: target, behavior });
}

export function useReaderLayout({
  containerRef,
  preferredMode,
  reflowKey,
}: {
  containerRef: RefObject<HTMLElement | null>;
  preferredMode: ReaderPreferences["readingMode"];
  reflowKey: string;
}) {
  const [wideViewport, setWideViewport] = useState(false);
  const [pageState, setPageState] = useState({ pageIndex: 0, pageCount: 1 });
  const [layoutVersion, setLayoutVersion] = useState(0);
  const lastPositionRef = useRef<ReadingPosition>({ ratio: 0, headingId: null });
  /**
   * The block the reader was on, kept as a live DOM reference. A preference change
   * reflows the text but leaves the nodes in place, so this restores the exact
   * paragraph afterwards without re-resolving any text.
   */
  const lastAnchorRef = useRef<ResolvedReadingAnchor | null>(null);
  /** Mode + preference signature of the last layout that settled; see the reflow effect. */
  const settledKeyRef = useRef<string | null>(null);
  /**
   * True from the moment a preference reflows the article until the reading position
   * has been put back. While it is set the text under the reading line is not where
   * the reader left it, so nothing may be captured or persisted from it.
   */
  const settlingRef = useRef(false);
  const effectiveMode = preferredMode === "paged" && wideViewport ? "paged" : "flow";

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setWideViewport(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const measure = useCallback((): ReadingPosition => {
    const element = containerRef.current;
    if (!element) return lastPositionRef.current;

    if (effectiveMode === "paged") {
      const metrics = metricsOf(element);
      const position = {
        ratio: ratioForPage(metrics.pageIndex, metrics.pageCount),
        headingId: pagedHeadingId(element, metrics),
      };
      lastPositionRef.current = position;
      return position;
    }

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const elementHeight = element.offsetHeight || 1;
    const scrolledPast = window.scrollY + window.innerHeight - elementTop;
    const position = {
      ratio: clamp(scrolledPast / elementHeight, 0, 1),
      headingId: flowHeadingId(element),
    };
    lastPositionRef.current = position;
    return position;
  }, [containerRef, effectiveMode]);

  /**
   * Describes the paragraph at the reading line. Deliberately separate from
   * `measure`: it reads layout for a handful of blocks, so the shell only calls it
   * on the throttled persistence path, never on every scroll frame.
   */
  const captureAnchor = useCallback((): ReadingAnchor | null => {
    const element = containerRef.current;
    if (!element) return null;
    const blocks = readingAnchorBlocks(element);
    if (blocks.length === 0) return null;

    let blockIndex: number;
    let blockOffset = 0;
    if (effectiveMode === "paged") {
      const metrics = metricsOf(element);
      blockIndex = pagedBlockIndexAt(blocks, metrics.pageIndex, (block) =>
        pageForLogicalOffset(logicalLeftOf(element, block), metrics),
      );
    } else {
      blockIndex = flowBlockIndexAt(blocks, READING_LINE_PX);
      if (blockIndex >= 0) blockOffset = flowBlockOffset(blocks[blockIndex], READING_LINE_PX);
    }
    if (blockIndex < 0) return null;

    lastAnchorRef.current = { block: blocks[blockIndex], blockOffset };
    return serializeReadingAnchor(element, blocks, blockIndex, blockOffset);
  }, [containerRef, effectiveMode]);

  const updatePageState = useCallback(() => {
    const element = containerRef.current;
    if (!element || effectiveMode !== "paged") {
      setPageState((current) =>
        current.pageIndex === 0 && current.pageCount === 1
          ? current
          : { pageIndex: 0, pageCount: 1 },
      );
      return;
    }
    const metrics = metricsOf(element);
    setPageState((current) =>
      current.pageIndex === metrics.pageIndex && current.pageCount === metrics.pageCount
        ? current
        : { pageIndex: metrics.pageIndex, pageCount: metrics.pageCount },
    );
  }, [containerRef, effectiveMode]);

  const navigateToElement = useCallback(
    (target: NavigableTarget, behavior: ScrollBehavior = "smooth") => {
      const element = containerRef.current;
      if (!element) return;
      const resolvedBehavior = motionSafeBehavior(behavior);
      if (effectiveMode === "paged") {
        const metrics = metricsOf(element);
        const page = pageForLogicalOffset(logicalLeftOf(element, target), metrics);
        const left = scrollLeftForPage(page, metrics);
        if (resolvedBehavior === "auto") element.scrollLeft = left;
        else element.scrollTo({ left, behavior: resolvedBehavior });
        setPageState({ pageIndex: page, pageCount: metrics.pageCount });
        return;
      }
      const rect = target.getBoundingClientRect();
      scrollWindowTo(
        rect.top + window.scrollY - TOOLBAR_OFFSET_PX - RESTORE_GAP_PX,
        resolvedBehavior,
      );
    },
    [containerRef, effectiveMode],
  );

  /**
   * Puts a resolved paragraph back under the reading line, keeping the fraction of it
   * the reader had already got through. Because that fraction is relative to the
   * block, it stays meaningful after the text has grown or shrunk.
   */
  const navigateToAnchor = useCallback(
    (resolved: ResolvedReadingAnchor, behavior: ScrollBehavior = "smooth") => {
      const element = containerRef.current;
      if (!element || !element.contains(resolved.block)) return false;
      const resolvedBehavior = motionSafeBehavior(behavior);
      lastAnchorRef.current = resolved;

      if (effectiveMode === "paged") {
        navigateToElement(resolved.block, resolvedBehavior);
        return true;
      }
      const rect = resolved.block.getBoundingClientRect();
      scrollWindowTo(
        rect.top + window.scrollY + resolved.blockOffset * rect.height -
          TOOLBAR_OFFSET_PX -
          RESTORE_GAP_PX,
        resolvedBehavior,
      );
      return true;
    },
    [containerRef, effectiveMode, navigateToElement],
  );

  const navigateTo = useCallback(
    (position: ReadingPosition, behavior: ScrollBehavior = "smooth") => {
      const element = containerRef.current;
      if (!element) return;
      const resolvedBehavior = motionSafeBehavior(behavior);
      const heading = position.headingId ? document.getElementById(position.headingId) : null;
      if (heading && effectiveMode === "paged") {
        const metrics = metricsOf(element);
        const headingPage = pageForLogicalOffset(logicalLeftOf(element, heading), metrics);
        const ratioPage = pageForRatio(position.ratio, metrics.pageCount);
        const page = Math.max(headingPage, ratioPage);
        const left = scrollLeftForPage(page, metrics);
        if (resolvedBehavior === "auto") element.scrollLeft = left;
        else element.scrollTo({ left, behavior: resolvedBehavior });
        setPageState({ pageIndex: page, pageCount: metrics.pageCount });
        lastPositionRef.current = position;
        return;
      }

      if (effectiveMode === "paged") {
        const metrics = metricsOf(element);
        const page = pageForRatio(position.ratio, metrics.pageCount);
        const left = scrollLeftForPage(page, metrics);
        if (resolvedBehavior === "auto") element.scrollLeft = left;
        else element.scrollTo({ left, behavior: resolvedBehavior });
        setPageState({ pageIndex: page, pageCount: metrics.pageCount });
        lastPositionRef.current = position;
        return;
      }

      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const ratioTop =
        elementTop + clamp(position.ratio, 0, 1) * element.offsetHeight - window.innerHeight;

      if (heading) {
        // The ratio is the finer of the two: the heading is only the last one the
        // reader had passed, so on its own it always lands at the top of a section.
        // Both estimates are lower bounds on the real position, so take the later.
        const headingTop =
          heading.getBoundingClientRect().top +
          window.scrollY -
          TOOLBAR_OFFSET_PX -
          RESTORE_GAP_PX;
        scrollWindowTo(
          position.ratio > 0 ? Math.max(headingTop, ratioTop) : headingTop,
          resolvedBehavior,
        );
        lastPositionRef.current = position;
        return;
      }

      scrollWindowTo(ratioTop, resolvedBehavior);
      lastPositionRef.current = position;
    },
    [containerRef, effectiveMode],
  );

  const goToPage = useCallback(
    (pageIndex: number, behavior: ScrollBehavior = "smooth") => {
      const element = containerRef.current;
      if (!element || effectiveMode !== "paged") return;
      const resolvedBehavior = motionSafeBehavior(behavior);
      const metrics = metricsOf(element);
      const left = scrollLeftForPage(pageIndex, metrics);
      if (resolvedBehavior === "auto") element.scrollLeft = left;
      else element.scrollTo({ left, behavior: resolvedBehavior });
      const nextMetrics = pageMetrics(
        element.scrollWidth,
        element.clientWidth,
        left,
        columnGapOf(element),
      );
      setPageState({ pageIndex: nextMetrics.pageIndex, pageCount: nextMetrics.pageCount });
      lastPositionRef.current = {
        ratio: ratioForPage(nextMetrics.pageIndex, nextMetrics.pageCount),
        headingId: pagedHeadingId(element, nextMetrics),
      };
    },
    [containerRef, effectiveMode],
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element || effectiveMode !== "paged") return;
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updatePageState();
      });
    };
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [containerRef, effectiveMode, updatePageState]);

  // A typography or layout preference change reflows the article under the reader.
  // Hold the paragraph they were on rather than the pixel offset, which now points
  // at different words.
  useEffect(() => {
    let cancelled = false;
    // The first layout after mount is not a reflow: the shell owns the opening
    // position there, and moving it here would fight the restore and yank back a
    // reader who started scrolling while the web fonts were still loading. The
    // marker is written synchronously so a settle cancelled by a rapid second
    // change cannot lose it and make the next change look like the first.
    const layoutKey = `${effectiveMode}:${reflowKey}`;
    const previousKey = settledKeyRef.current;
    settledKeyRef.current = layoutKey;
    const isReflow = previousKey !== null && previousKey !== layoutKey;
    if (isReflow) settlingRef.current = true;

    const settle = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (cancelled) return;
          updatePageState();
          if (isReflow) {
            const anchor = lastAnchorRef.current;
            if (anchor) navigateToAnchor(anchor, "auto");
            else if (effectiveMode === "paged") navigateTo(lastPositionRef.current, "auto");
            settlingRef.current = false;
          }
          setLayoutVersion((value) => value + 1);
        });
      });
    };
    const fonts = document.fonts;
    if (fonts?.ready) {
      void fonts.ready.then(settle).catch(settle);
    } else {
      settle();
    }
    return () => {
      cancelled = true;
    };
  }, [effectiveMode, navigateTo, navigateToAnchor, reflowKey, updatePageState]);

  const previousPage = useCallback(
    () => goToPage(pageState.pageIndex - 1),
    [goToPage, pageState.pageIndex],
  );
  const nextPage = useCallback(
    () => goToPage(pageState.pageIndex + 1),
    [goToPage, pageState.pageIndex],
  );

  /** Drops the remembered paragraph, e.g. when the reader deliberately starts over. */
  const forgetAnchor = useCallback(() => {
    lastAnchorRef.current = null;
  }, []);

  /** True while a preference change is still being absorbed by the layout. */
  const isLayoutSettling = useCallback(() => settlingRef.current, []);

  return {
    effectiveMode,
    isPagedAvailable: wideViewport,
    measure,
    captureAnchor,
    forgetAnchor,
    isLayoutSettling,
    navigateTo,
    navigateToAnchor,
    navigateToElement,
    pageIndex: pageState.pageIndex,
    pageCount: pageState.pageCount,
    previousPage,
    nextPage,
    layoutVersion,
  };
}
