import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pad, UI } from "@/lib/content/labels";
import type { AdjacentArticle } from "@/lib/content/types";

/**
 * Where the reader goes once the text runs out, said where it runs out.
 *
 * From the desktop breakpoint up the chapter controls live in the toolbar, because
 * the paged layout cannot scroll to anything below its columns. In the flowing layout
 * that left a reader who had just finished a long chapter with nothing at its end but
 * the bibliography, and the way on as a 32px chevron at the top of the screen. This
 * block answers "what now?" in place. It is rendered only in the flowing layout and
 * only from `lg` up — below that the article footer carries the same link beside the
 * completion control — and it is a region of its own, not a second copy of the
 * chapter-navigation landmark.
 */
export function ChapterEnd({
  next,
  basePath,
  homeHref,
  homeLabel = UI.backToRoadmap,
}: {
  next: AdjacentArticle;
  basePath: string;
  /** The collection's index: the series roadmap, or the archive. */
  homeHref?: string;
  homeLabel?: string;
}) {
  return (
    <section
      aria-labelledby="chapter-end-title"
      className="mt-16 hidden border-t border-border pt-8 font-sans lg:block"
    >
      <h2
        id="chapter-end-title"
        className="text-2xs font-medium uppercase tracking-[0.14em] text-text-muted"
      >
        {next ? UI.nextChapterLabel : UI.chapterEnd}
      </h2>
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          rel="next"
          className="group -mx-3 mt-2 flex items-baseline gap-3 rounded-md px-3 py-3 transition-colors hover:bg-surface-muted"
        >
          <span className="shrink-0 text-sm tabular-nums text-text-faint">
            {pad(next.readingOrder)}
          </span>
          <span className="min-w-0 flex-1 font-serif text-2xl font-semibold leading-snug text-text transition-colors group-hover:text-accent">
            {next.title}
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 self-center text-text-faint transition-colors group-hover:text-accent"
            aria-hidden="true"
          />
        </Link>
      ) : (
        <p className="mt-3 text-sm text-text-muted">{UI.lastChapter}</p>
      )}
      {homeHref && (
        <Link
          href={homeHref}
          className="mt-3 inline-flex min-h-6 items-center text-sm text-text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
        >
          {homeLabel}
        </Link>
      )}
    </section>
  );
}
