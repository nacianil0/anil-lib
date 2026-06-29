import type { HighlightRecord } from "@/lib/reader-data/schema";
import { resolveTextAnchor } from "./text-anchor";

type HighlightLike = { add?: (range: Range) => void };
type HighlightRegistry = {
  set: (name: string, value: HighlightLike) => void;
  delete: (name: string) => void;
};

const REGISTRY_NAME = "reader-marks";

export function registerHighlights(
  root: HTMLElement,
  highlights: HighlightRecord[],
): Map<string, Range> {
  const resolved = new Map<string, Range>();
  for (const highlight of highlights) {
    const range = resolveTextAnchor(root, highlight);
    if (range) resolved.set(highlight.id, range);
  }

  const css = CSS as unknown as { highlights?: HighlightRegistry };
  const HighlightConstructor = (
    window as unknown as { Highlight?: new (...ranges: Range[]) => HighlightLike }
  ).Highlight;
  if (css.highlights && HighlightConstructor) {
    css.highlights.set(REGISTRY_NAME, new HighlightConstructor(...resolved.values()));
  }
  return resolved;
}

export function clearRegisteredHighlights(): void {
  const css = CSS as unknown as { highlights?: HighlightRegistry };
  css.highlights?.delete(REGISTRY_NAME);
}
