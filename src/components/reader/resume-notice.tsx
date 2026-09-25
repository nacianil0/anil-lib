"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(
      () => {
        onDismiss();
      },
      revisedSinceRead ? 9000 : 6000,
    );
    return () => clearTimeout(timer);
  }, [show, onDismiss, revisedSinceRead]);

  if (!show) return null;

  const snippet = preview?.trim() ? preview.trim().slice(0, 70) : null;

  return (
    <div
      role="status"
      data-revised-since-read={revisedSinceRead || undefined}
      // Below the sticky header's stacking context (z-40): the settings panel and
      // the popovers that live in the header must cover this pill, not sit under it.
      className="fixed left-1/2 top-[5.5rem] z-30 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm shadow-md sm:max-w-[calc(100vw-2rem)] sm:gap-4 sm:px-4"
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
        className="shrink-0 whitespace-nowrap font-medium text-accent hover:underline"
      >
        {UI.startOver}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={UI.dismiss}
        className="shrink-0 text-text-muted hover:text-text sm:ml-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
