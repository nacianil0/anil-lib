import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/content/labels";
import type { AdjacentArticle } from "@/lib/content/types";

type Direction = "prev" | "next";

function NavItem({
  article,
  direction,
  basePath,
}: {
  article: AdjacentArticle;
  direction: Direction;
  basePath: string;
}) {
  const isPrev = direction === "prev";
  const eyebrow = isPrev ? UI.previous : UI.next;

  if (!article) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          "flex min-h-[3.5rem] cursor-not-allowed flex-col gap-1 rounded-md border border-dashed border-border p-3 opacity-50",
          isPrev ? "items-start text-left" : "items-end text-right",
        )}
      >
        <span className="flex items-center gap-1 font-sans text-2xs uppercase tracking-wider text-text-faint">
          {isPrev && <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
          {eyebrow}
          {!isPrev && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={`${basePath}/${article.slug}`}
      rel={isPrev ? "prev" : "next"}
      className={cn(
        "group flex min-h-[3.5rem] flex-col gap-1 rounded-md border border-border p-3 transition-colors hover:border-border-strong hover:bg-surface-muted",
        isPrev ? "items-start text-left" : "items-end text-right",
      )}
    >
      <span className="flex items-center gap-1 font-sans text-2xs uppercase tracking-wider text-text-faint">
        {isPrev && <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
        {eyebrow}
        {!isPrev && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
      </span>
      <span className="line-clamp-2 font-serif text-sm text-text transition-colors group-hover:text-accent">
        {article.title}
      </span>
    </Link>
  );
}

export function ArticleNavigation({
  prev,
  next,
  basePath = "/read",
}: {
  prev: AdjacentArticle;
  next: AdjacentArticle;
  basePath?: string;
}) {
  return (
    <nav className="grid grid-cols-2 gap-3" aria-label={UI.chapterNavigation}>
      <NavItem article={prev} direction="prev" basePath={basePath} />
      <NavItem article={next} direction="next" basePath={basePath} />
    </nav>
  );
}

const COMPACT_CELL =
  "flex h-[30px] w-8 items-center justify-center transition-colors first:rounded-l-[5px] last:rounded-r-[5px]";

function CompactNavItem({
  article,
  direction,
  basePath,
}: {
  article: AdjacentArticle;
  direction: Direction;
  basePath: string;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const eyebrow = isPrev ? UI.previousChapter : UI.nextChapter;

  // The chapter titles are far too long for the toolbar, so the destination is
  // carried by the label and the tooltip instead of by visible text.
  if (!article) {
    return (
      <span
        aria-disabled="true"
        title={eyebrow}
        className={cn(COMPACT_CELL, "cursor-not-allowed text-text-faint opacity-40")}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    );
  }

  return (
    <Link
      href={`${basePath}/${article.slug}`}
      rel={isPrev ? "prev" : "next"}
      aria-label={`${eyebrow}: ${article.title}`}
      title={`${eyebrow}: ${article.title}`}
      className={cn(COMPACT_CELL, "text-text-muted hover:bg-surface-muted hover:text-text")}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

/** Toolbar form of the same navigation: two icons that stay within reach of the text. */
export function CompactArticleNavigation({
  prev,
  next,
  basePath = "/read",
}: {
  prev: AdjacentArticle;
  next: AdjacentArticle;
  basePath?: string;
}) {
  return (
    <nav
      aria-label={UI.chapterNavigation}
      className="flex items-center divide-x divide-border rounded-md border border-border"
    >
      <CompactNavItem article={prev} direction="prev" basePath={basePath} />
      <CompactNavItem article={next} direction="next" basePath={basePath} />
    </nav>
  );
}
