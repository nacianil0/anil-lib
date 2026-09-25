"use client";

import { UI } from "@/lib/content/labels";
import { formatRevisionDate } from "@/lib/content/revision";
import { cn } from "@/lib/utils";

type Props = {
  revisedAt: string;
  note: string;
  /** The reader had read this article before the revision (decided once by the shell). */
  sinceRead: boolean;
  /** Paged layout: one line above the columns, shown on the first page only. */
  compact: boolean;
  /** Paged layout past the first page: keeps its height so the columns never reflow. */
  concealed: boolean;
};

/**
 * A calm line above the text saying the article was meaningfully revised, and — when
 * the reader had read it before that day — that it changed since they read it.
 * Presentation only: it neither reads nor writes reader progress.
 */
export function RevisionNotice({ revisedAt, note, sinceRead, compact, concealed }: Props) {
  const label = sinceRead ? UI.revisionSinceReadLabel : UI.revisionLabel;
  const date = formatRevisionDate(revisedAt);

  return (
    <aside
      aria-label={`${label}: ${date}`}
      data-since-read={sinceRead || undefined}
      data-compact={compact || undefined}
      aria-hidden={concealed || undefined}
      className={cn("revision-notice", concealed && "invisible")}
    >
      <p
        className={cn(
          "revision-notice-line font-sans text-xs leading-relaxed text-text-muted",
          compact && "truncate",
        )}
        title={compact ? note : undefined}
      >
        <span className="revision-notice-label font-medium">{label}</span>
        <span className="px-1.5 text-text-faint" aria-hidden="true">
          ·
        </span>
        <time dateTime={revisedAt}>{date}</time>
        {compact ? (
          <>
            <span className="px-1.5 text-text-faint" aria-hidden="true">
              ·
            </span>
            <span>{note}</span>
          </>
        ) : (
          <span className="mt-0.5 block text-text-muted">{note}</span>
        )}
      </p>
    </aside>
  );
}
