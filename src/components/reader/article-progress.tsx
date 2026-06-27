/** Thin reading-progress bar for the current article. Driven by the shell's live scroll ratio. */
export function ArticleProgress({ ratio }: { ratio: number }) {
  const percent = Math.round(Math.min(1, Math.max(0, ratio)) * 100);
  return (
    <div
      className="h-[2px] w-full bg-transparent"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Bu bölümdeki okuma ilerlemen"
    >
      <div
        className="h-full bg-accent-fill transition-[width] duration-150 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
