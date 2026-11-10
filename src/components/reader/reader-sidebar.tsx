"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { UI } from "@/lib/content/labels";
import type { ArticleDescriptor } from "@/lib/content/types";
import type { PhaseOutline } from "@/lib/content/series-progress";
import { LockButton } from "./lock-button";
import { ReadingList } from "./reading-list";
import { ProgressMeter } from "./progress-meter";

type Props = {
  articles: ArticleDescriptor[];
  currentArticleId: string;
  basePath?: string;
  title?: string;
  subtitle?: string;
  homeHref?: string;
  phases?: PhaseOutline[];
};

export function ReaderSidebar({
  articles,
  currentArticleId,
  basePath = "/read",
  title = UI.libraryTitle,
  subtitle = UI.librarySubtitle,
  homeHref = "/",
  phases,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const articleIds = articles.map((article) => article.articleId);

  useEffect(() => {
    const container = scrollRef.current;
    const active = container?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!container || !active) return;
    // Bring the current chapter into view inside the list only. `scrollIntoView` walks
    // up every scrollable ancestor, so it also drags the article down by a couple of
    // hundred pixels on load — undoing the reading position that is about to be
    // restored. This is the same "nearest" behaviour, scoped to the list.
    const listRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    if (activeRect.top < listRect.top) {
      container.scrollTop += activeRect.top - listRect.top;
    } else if (activeRect.bottom > listRect.bottom) {
      container.scrollTop += activeRect.bottom - listRect.bottom;
    }
  }, [currentArticleId]);

  return (
    <aside
      className="reading-rail sticky top-0 hidden h-screen w-[19rem] shrink-0 flex-col border-r border-border lg:flex"
      aria-label={UI.readingList}
    >
      {/* Identity band, as tall as the reader's toolbar (3.5rem + its 1px rule) so the
          two hairlines meet across the page, as Portal's brand band meets its top bar. */}
      <div className="flex h-[calc(3.5rem+1px)] shrink-0 flex-col justify-center border-b border-border pl-[18px] pr-4">
        <p className="truncate font-serif text-[0.98rem] font-semibold leading-tight text-text">
          {title}
        </p>
        <p
          className="mt-0.5 truncate font-sans text-[0.68rem] leading-snug text-text-muted"
          title={subtitle}
        >
          {subtitle}
        </p>
      </div>
      <div className="shrink-0">
        <ProgressMeter articleIds={articleIds} />
      </div>
      <div ref={scrollRef} className="reading-rail-scroll min-h-0 flex-1 overflow-y-auto pb-4 pt-1">
        <ReadingList
          articles={articles}
          currentArticleId={currentArticleId}
          idPrefix="desktop"
          basePath={basePath}
          phases={phases}
        />
      </div>
      <div className="flex h-12 shrink-0 items-center justify-between border-t border-border pl-[18px] pr-3">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-1.5 font-sans text-2xs text-text-muted hover:text-text"
        >
          <Home className="h-3.5 w-3.5" aria-hidden="true" />
          {UI.home}
        </Link>
        <div className="flex items-center gap-1">
          <LockButton />
        </div>
      </div>
    </aside>
  );
}
