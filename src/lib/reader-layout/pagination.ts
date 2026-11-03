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
  /*
   * The last page is usually a short one: the columns end where the text ends and
   * the container cannot be scrolled past that. Deriving the end from the page
   * grid instead would ask for an offset the browser quietly clamps, and the page
   * the reader lands on would stop being the page that was asked for.
   */
  const maxScrollLeft = Math.max(0, Math.max(safeWidth, scrollWidth) - safeWidth);
  const position = Math.max(0, scrollLeft);
  const pageIndex =
    pageStep <= 0
      ? 0
      : position >= maxScrollLeft - 1
        ? Math.max(0, pageCount - 1)
        : clampPage(Math.round(position / pageStep), pageCount);

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

/** A page command always holds this long: the smooth scroll may not have started moving yet. */
export const PAGE_COMMAND_GRACE_MS = 600;
/** A scroll rendered frames have shown standing still this long has stopped, wherever it is. */
export const SCROLL_IDLE_MS = 200;
/** Past this, a command never holds, whatever keeps the article scrolling. */
export const PAGE_COMMAND_MAX_MS = 4000;

/**
 * Whether the page a scroll was last commanded to is still the page the reader is on.
 *
 * A smooth scroll reports offsets between pages while it runs, and how long it runs is
 * not fixed: a long jump, or a busy machine, can take well over a second. Judging by a
 * fixed time window let a gesture arriving after the window but before the scroll got
 * there turn from a page nobody was on — at the last page, a forward flick moved the
 * reader back one. So the command holds until the scroll lands on its page or is seen
 * to stop short of it, with a short grace period before the first movement and a hard
 * ceiling. Seen means over rendered frames, not elapsed time: a machine too busy to
 * render has not shown the scroll stopping, however long it went quiet.
 */
export function commandedPageHolds(input: {
  /** The article sits on the commanded page's offset. */
  landed: boolean;
  /** Time since the command was issued. */
  age: number;
  /** How long rendered frames have shown the article's offset not changing. */
  stillFor: number;
}): boolean {
  const { landed, age, stillFor } = input;
  if (landed || age >= PAGE_COMMAND_MAX_MS) return false;
  return age < PAGE_COMMAND_GRACE_MS || stillFor < SCROLL_IDLE_MS;
}
