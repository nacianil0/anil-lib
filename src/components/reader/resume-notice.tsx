"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

type Props = {
  articleId: string;
  show: boolean;
  /** First words of the paragraph the reader was returned to, when one was anchored. */
  preview?: string | null;
  /**
   * The article was editorially revised after this reader last read it. The reader is
   * returned mid-article, past the revision line at the top, so the pill says it here.
   */
  revisedSinceRead?: boolean;
  onDismiss: () => void;
  onStartOver: () => void;
};

export function ResumeNotice({
  articleId,
  show,
  preview,
  revisedSinceRead = false,
  onDismiss,
  onStartOver,
}: Props) {
  const { resetPosition } = useReaderProgress();
  // The pill leaves on its own, but never from under a pointer or a focused button:
  // a reader on the way to "Baştan başla" must not see it vanish (WCAG 2.2.1). The
  // clock restarts in full once they move on.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const held = hovered || focused;

  useEffect(() => {
    if (!show || held) return;
    const timer = setTimeout(
      () => {
        onDismiss();
      },
      revisedSinceRead ? 9000 : 6000,
    );
    return () => clearTimeout(timer);
  }, [show, held, onDismiss, revisedSinceRead]);

  useEffect(() => {
    if (show) return;
    setHovered(false);
    setFocused(false);
  }, [show]);

  if (!show) return null;

  const snippet = preview?.trim() ? preview.trim().slice(0, 70) : null;

  return (
    <div
      role="status"
      data-revised-since-read={revisedSinceRead || undefined}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
      // Below the sticky header's stacking context (z-40): the settings panel and
      // the popovers that live in the header must cover this pill, not sit under it.
      className="fixed left-1/2 top-[5.5rem] z-30 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface py-1 pl-3 pr-1.5 text-sm shadow-md sm:max-w-[calc(100vw-2rem)] sm:gap-3 sm:pl-4"
    >
      {revisedSinceRead ? (
        // On a phone only the short wording fits beside the buttons: the revision is
        // the news, the restored position is visible on screen anyway.
        <span className="min-w-0 truncate font-sans text-text">
          <span className="font-medium text-accent sm:hidden">{UI.revisionSinceReadShort}</span>
          <span className="hidden font-medium text-accent sm:inline">
            {UI.revisionSinceReadLabel}
          </span>
          <span className="hidden text-text-muted sm:inline"> · {UI.restoredNotice}</span>
        </span>
      ) : (
        <span className="min-w-0 truncate font-sans text-text">
          <span className="font-medium">{UI.restoredNotice}</span>
          {snippet && (
            <span className="hidden text-text-muted sm:inline">
              {" "}
              · &ldquo;{snippet}&hellip;&rdquo;
            </span>
          )}
        </span>
      )}
      <button
        type="button"
        onClick={() => {
          resetPosition(articleId);
          onStartOver();
          onDismiss();
        }}
        // nowrap keeps this label in the pill's min-content width: the pill is centred
        // with left-1/2, so on a phone it sizes to min-content and would starve the text.
        className="shrink-0 whitespace-nowrap rounded-full px-1.5 py-1 font-medium text-accent hover:underline"
      >
        {UI.startOver}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={UI.dismiss}
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
