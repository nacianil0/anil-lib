import type { PhaseSummary } from "@/lib/content/series-progress";

/**
 * A series drawn as its phases instead of its chapters. One segment per phase,
 * as wide as the phase is long in the plan and filled as far as the reader has
 * finished it; a hairline marks where they continue. Chapter cells stop reading
 * as anything past a few dozen chapters on a phone — a hundred of them are a
 * dotted line — while a dozen phases stay legible at any count.
 *
 * Decorative: the numbers it shows are always written out next to it.
 */
export function PhaseProgress({
  phases,
  markerOrder,
}: {
  phases: PhaseSummary[];
  /** Reading order of the chapter the reader continues with; omitted when done. */
  markerOrder?: number;
}) {
  let offset = 0;
  const segments = phases.map((phase) => {
    const first = offset + 1;
    offset += phase.planned;
    return { phase, first };
  });

  return (
    <div className="flex h-2 items-center gap-[3px]" aria-hidden="true">
      {segments.map(({ phase, first }) => {
        const fill = phase.planned > 0 ? (phase.completed / phase.planned) * 100 : 0;
        const holdsMarker =
          markerOrder !== undefined && markerOrder >= first && markerOrder < first + phase.planned;
        return (
          <span
            key={phase.id}
            className="relative h-1.5 min-w-[3px]"
            style={{ flex: `${Math.max(phase.planned, 1)} 1 0%` }}
          >
            <span className="absolute inset-0 overflow-hidden rounded-[1px] bg-border-strong">
              <span
                className="absolute inset-y-0 left-0 bg-accent-fill"
                style={{ width: `${fill}%` }}
              />
            </span>
            {holdsMarker && (
              <span
                className="absolute -bottom-[3px] -top-[3px] w-0.5 -translate-x-1/2 rounded-full bg-text"
                style={{ left: `${((markerOrder - first + 0.5) / phase.planned) * 100}%` }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}
