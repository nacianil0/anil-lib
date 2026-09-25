import { STARTED_RATIO } from "@/lib/reader/version";

/**
 * Editorial revisions (docs/seri/SOZLESME.md §12). A revision is set by hand on an
 * article whose teaching changed; it is read-only metadata and never touches a
 * reader's progress, saved place or highlights.
 */

type ProgressLike = {
  completed: boolean;
  scrollRatio: number;
  lastReadAt: string;
};

const LONG_DATE = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const SHORT_DATE = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-25" → "25 Eylül 2026" (long) or "25 Eyl 2026" (short); same on server and client. */
export function formatRevisionDate(isoDate: string, style: "long" | "short" = "long"): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return (style === "long" ? LONG_DATE : SHORT_DATE).format(date);
}

/**
 * Whether the reader had engaged with the article before it was revised: they
 * finished it or got past the opening, and their last visit fell on an earlier day
 * than the revision. A same-day visit does not count — the reader may already have
 * seen the new text, and the notice must never claim a change they did not miss.
 */
export function readBeforeRevision(
  entry: ProgressLike | null | undefined,
  revisedAt: string | undefined,
): boolean {
  if (!entry || !revisedAt) return false;
  const engaged = entry.completed || entry.scrollRatio > STARTED_RATIO;
  if (!engaged) return false;
  const lastDay = entry.lastReadAt.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastDay)) return false;
  return lastDay < revisedAt;
}
