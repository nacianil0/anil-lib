"use client";

import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

export function ProgressMeter({ articleIds }: { articleIds: string[] }) {
  const { completedCount } = useReaderProgress();
  const total = articleIds.length;
  const done = completedCount(articleIds);
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const summary = UI.progressSummary(done, total);

  return (
    <div className="px-5 py-3">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-sans text-2xs font-medium uppercase tracking-[0.1em] text-text-faint">
          {summary}
        </span>
        <span className="font-sans text-2xs tabular-nums text-text-muted">%{percent}</span>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={summary}
      >
        <div
          className="h-full rounded-full bg-accent-fill transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
