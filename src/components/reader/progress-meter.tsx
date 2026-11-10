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
    <div className="px-[14px] pb-2.5 pt-3.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-sans text-[10.5px] font-medium uppercase leading-none tracking-[0.08em] text-text-muted">
          {summary}
        </span>
        <span className="font-sans text-[10.5px] tabular-nums leading-none text-text-muted">
          %{percent}
        </span>
      </div>
      <div
        className="mt-2 h-[3px] w-full overflow-hidden bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={summary}
      >
        <div
          className="h-full bg-accent-fill transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
