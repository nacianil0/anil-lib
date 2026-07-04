import { clamp } from "@/lib/utils";

export type PageMetrics = {
  pageCount: number;
  pageIndex: number;
  pageStep: number;
  maxScrollLeft: number;
};

export function clampPage(pageIndex: number, pageCount: number): number {
  return Math.round(clamp(pageIndex, 0, Math.max(0, pageCount - 1)));
}

export function pageMetrics(
  scrollWidth: number,
  clientWidth: number,
  scrollLeft: number,
  columnGap: number,
): PageMetrics {
  const safeWidth = Math.max(0, clientWidth);
  const safeGap = Math.max(0, columnGap);
  const pageStep = safeWidth + safeGap;
  const pageCount =
    safeWidth <= 0 || pageStep <= 0
      ? 1
      : Math.max(1, Math.ceil((Math.max(safeWidth, scrollWidth) + safeGap) / pageStep));
  const maxScrollLeft = Math.max(0, (pageCount - 1) * pageStep);
  const pageIndex =
    pageStep <= 0 ? 0 : clampPage(Math.round(Math.max(0, scrollLeft) / pageStep), pageCount);

  return { pageCount, pageIndex, pageStep, maxScrollLeft };
}

export function ratioForPage(pageIndex: number, pageCount: number): number {
  const safeCount = Math.max(1, pageCount);
  return (clampPage(pageIndex, safeCount) + 1) / safeCount;
}

export function pageForRatio(ratio: number, pageCount: number): number {
  const safeCount = Math.max(1, pageCount);
  if (!Number.isFinite(ratio) || ratio <= 0) return 0;
  return clampPage(Math.ceil(clamp(ratio, 0, 1) * safeCount) - 1, safeCount);
}

export function scrollLeftForPage(pageIndex: number, metrics: PageMetrics): number {
  return Math.min(
    metrics.maxScrollLeft,
    clampPage(pageIndex, metrics.pageCount) * metrics.pageStep,
  );
}

export function pageForLogicalOffset(offset: number, metrics: PageMetrics): number {
  if (metrics.pageStep <= 0) return 0;
  return clampPage(Math.floor(Math.max(0, offset) / metrics.pageStep), metrics.pageCount);
}
