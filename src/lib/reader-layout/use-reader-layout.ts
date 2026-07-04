"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { clamp } from "@/lib/utils";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";
import type { ReaderPreferences } from "@/lib/preferences/schema";
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
    if (heading.getBoundingClientRect().top <= TOOLBAR_OFFSET_PX + 4) headingId = heading.id;
    else break;
  }
  return headingId;
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
      const top = Math.max(0, rect.top + window.scrollY - TOOLBAR_OFFSET_PX - 12);
      if (resolvedBehavior === "auto") window.scrollTo(0, top);
      else window.scrollTo({ top, behavior: resolvedBehavior });
    },
    [containerRef, effectiveMode],
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
      if (heading) {
        navigateToElement(heading, resolvedBehavior);
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
      } else {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const target =
          elementTop + clamp(position.ratio, 0, 1) * element.offsetHeight - window.innerHeight;
        const top = Math.max(0, target);
        if (resolvedBehavior === "auto") window.scrollTo(0, top);
        else window.scrollTo({ top, behavior: resolvedBehavior });
      }
      lastPositionRef.current = position;
    },
    [containerRef, effectiveMode, navigateToElement],
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

  useEffect(() => {
    let cancelled = false;
    const settle = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (cancelled) return;
          updatePageState();
          if (effectiveMode === "paged") navigateTo(lastPositionRef.current, "auto");
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
  }, [effectiveMode, navigateTo, reflowKey, updatePageState]);

  const previousPage = useCallback(
    () => goToPage(pageState.pageIndex - 1),
    [goToPage, pageState.pageIndex],
  );
  const nextPage = useCallback(
    () => goToPage(pageState.pageIndex + 1),
    [goToPage, pageState.pageIndex],
  );

  return {
    effectiveMode,
    isPagedAvailable: wideViewport,
    measure,
    navigateTo,
    navigateToElement,
    pageIndex: pageState.pageIndex,
    pageCount: pageState.pageCount,
    previousPage,
    nextPage,
    layoutVersion,
  };
}
