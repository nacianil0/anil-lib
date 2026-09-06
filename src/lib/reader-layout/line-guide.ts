"use client";

/**
 * Line guide — bands that follow the text instead of the column.
 *
 * A background on the block cannot know where a line's words end: it paints the
 * whole column width, so the short last line of a paragraph carries its band far
 * into empty space, and a paragraph broken across two columns drags the band down
 * the unused tail of the first one. The guide is therefore drawn from the geometry
 * of the rendered lines themselves — one Range per banded line, handed to the
 * Custom Highlight API, which paints exactly the run of text on that line and
 * nothing else. Nothing is added to the DOM, so selection, links, the reading
 * anchor and the mark highlights all keep working untouched.
 *
 * Line boundaries are found by measurement, not by guessing: for each line the
 * first offset whose range spills onto a second line box is the start of the next
 * line. The probe range always starts at the current line, so every measurement
 * reads two line boxes at most.
 */

export const LINE_GUIDE_HIGHLIGHT = "reader-line-guide";

/**
 * Body copy carries the guide. Headings, code and tables are not read line by
 * line, and a list item holding block children lets those children paint instead.
 */
const GUIDED_BLOCK_SELECTOR = "p, li:not(:has(> p, > ul, > ol))";

/** First guess at a line's length in characters; adapts to the real measure after. */
const INITIAL_LINE_WINDOW = 128;

type TextSpan = { node: Text; from: number; to: number };
type LineBox = { top: number; bottom: number; left: number; right: number };

type HighlightLike = { add?: (range: Range) => void; priority?: number };
type HighlightRegistry = {
  set: (name: string, value: HighlightLike) => void;
  delete: (name: string) => void;
};
type HighlightApi = {
  registry: HighlightRegistry;
  create: (ranges: Range[]) => HighlightLike;
};

function highlightApi(): HighlightApi | null {
  const registry = (CSS as unknown as { highlights?: HighlightRegistry }).highlights;
  const constructor = (
    window as unknown as { Highlight?: new (...ranges: Range[]) => HighlightLike }
  ).Highlight;
  if (!registry || !constructor) return null;
  return { registry, create: (ranges) => new constructor(...ranges) };
}

/** How far apart two boxes may sit and still count as touching on one line. */
const LINE_JOIN_PX = 8;

/**
 * True when two boxes belong to the same rendered line. Vertical overlap alone is
 * not enough on two counts. A range reports an inline element both as its own box
 * and as its text, and the two arrive out of reading order, so nothing may be
 * assumed from the order rects come in. And in the paged layout the columns of a
 * page share their line tops, so boxes must also touch horizontally — the column
 * gap is several times this tolerance.
 */
function joinsLine(line: LineBox, rect: LineBox): boolean {
  const overlap = Math.min(line.bottom, rect.bottom) - Math.max(line.top, rect.top);
  if (overlap <= Math.min(line.bottom - line.top, rect.bottom - rect.top) / 2) return false;
  return rect.left <= line.right + LINE_JOIN_PX && rect.right >= line.left - LINE_JOIN_PX;
}

function absorb(line: LineBox, rect: LineBox): void {
  line.top = Math.min(line.top, rect.top);
  line.bottom = Math.max(line.bottom, rect.bottom);
  line.left = Math.min(line.left, rect.left);
  line.right = Math.max(line.right, rect.right);
}

/** What this module needs of a DOMRect — a plain object is enough for its tests. */
export type MeasuredRect = LineBox & { width: number; height: number };

/** The rendered lines a set of range rects covers. */
export function lineBoxesOf(rects: Iterable<MeasuredRect>): LineBox[] {
  const lines: LineBox[] = [];
  for (const rect of rects) {
    // A range that starts or ends on a line boundary reports an empty rect on the
    // line it barely touches. Nothing is painted there, so nothing is a line there.
    if (rect.width <= 0 || rect.height <= 0) continue;
    const box = { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right };
    const line = lines.find((candidate) => joinsLine(candidate, box));
    if (!line) {
      lines.push(box);
      continue;
    }
    absorb(line, box);
    // The box may have bridged two lines that were kept apart by a gap it just
    // filled, so settle the set before moving on.
    for (let index = lines.length - 1; index >= 0; index -= 1) {
      const other = lines[index];
      if (other !== line && joinsLine(line, other)) {
        absorb(line, other);
        lines.splice(index, 1);
      }
    }
  }
  return lines;
}

export function countLineBoxes(rects: Iterable<DOMRect>): number {
  return lineBoxesOf(rects).length;
}

function textSpansOf(block: Element): TextSpan[] {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  const spans: TextSpan[] = [];
  let cursor = 0;
  let current = walker.nextNode();
  while (current) {
    const node = current as Text;
    const length = node.data.length;
    if (length > 0) {
      spans.push({ node, from: cursor, to: cursor + length });
      cursor += length;
    }
    current = walker.nextNode();
  }
  return spans;
}

/**
 * The (node, offset) pair for a character offset counted across the block's text.
 * An offset on a span boundary resolves to the end of the earlier node, which is
 * the same painted position as the start of the next one.
 */
export function positionAt(
  spans: TextSpan[],
  offset: number,
): { node: Text; offset: number } | null {
  for (const span of spans) {
    if (offset <= span.to) {
      return { node: span.node, offset: Math.max(0, offset - span.from) };
    }
  }
  const last = spans[spans.length - 1];
  return last ? { node: last.node, offset: last.to - last.from } : null;
}

function spanText(spans: TextSpan[], probe: Range, start: number, end: number): boolean {
  const from = positionAt(spans, start);
  const to = positionAt(spans, end);
  if (!from || !to) return false;
  probe.setStart(from.node, from.offset);
  probe.setEnd(to.node, to.offset);
  return true;
}

/** True when the text from `start` to `end` already spills onto a second line. */
function spillsOver(spans: TextSpan[], probe: Range, start: number, end: number): boolean {
  if (!spanText(spans, probe, start, end)) return false;
  return countLineBoxes(probe.getClientRects()) > 1;
}

/**
 * Character offsets at which each rendered line of the block starts. The first is
 * always 0; the array's length is the number of lines.
 */
export function lineStartsOf(block: Element, probe: Range): number[] {
  const spans = textSpansOf(block);
  const length = spans.length === 0 ? 0 : spans[spans.length - 1].to;
  if (length === 0) return [];

  const starts = [0];
  let start = 0;
  let window = INITIAL_LINE_WINDOW;

  while (start < length) {
    // Widen the probe until it is long enough to reach the next line, so the
    // search below never measures a range covering more than two line boxes.
    let high = Math.min(length, start + window);
    let spills = spillsOver(spans, probe, start, high);
    while (!spills && high < length) {
      window *= 2;
      high = Math.min(length, start + window);
      spills = spillsOver(spans, probe, start, high);
    }
    if (!spills) break;

    let low = start + 1;
    while (low < high) {
      const middle = (low + high) >>> 1;
      if (spillsOver(spans, probe, start, middle)) high = middle;
      else low = middle + 1;
    }
    // `low` is the first end offset that reaches the next line, so the character
    // before it is the first one standing on that line.
    const next = Math.max(start + 1, low - 1);
    if (next >= length) break;
    starts.push(next);
    window = Math.max(INITIAL_LINE_WINDOW, (next - start) * 2);
    start = next;
  }

  return starts;
}

/**
 * The banded lines of a block: every second one, counting the first line as plain
 * so a single-line paragraph stays unmarked — the same rhythm the CSS bands had.
 */
export function bandedLineBounds(starts: number[], length: number): Array<[number, number]> {
  const bounds: Array<[number, number]> = [];
  for (let line = 1; line < starts.length; line += 2) {
    const end = line + 1 < starts.length ? starts[line + 1] : length;
    if (end > starts[line]) bounds.push([starts[line], end]);
  }
  return bounds;
}

function blockRanges(block: Element, probe: Range): Range[] {
  const spans = textSpansOf(block);
  const length = spans.length === 0 ? 0 : spans[spans.length - 1].to;
  if (length === 0) return [];

  const ranges: Range[] = [];
  for (const [start, end] of bandedLineBounds(lineStartsOf(block, probe), length)) {
    const from = positionAt(spans, start);
    const to = positionAt(spans, end);
    if (!from || !to) continue;
    const range = document.createRange();
    range.setStart(from.node, from.offset);
    range.setEnd(to.node, to.offset);
    if (!range.collapsed) ranges.push(range);
  }
  return ranges;
}

/**
 * Draws the guide over `root`'s current layout. Call it again whenever the text
 * reflows; the ranges describe positions in the old layout, not the new one.
 * Returns how many lines were banded.
 */
export function paintLineGuide(root: HTMLElement): number {
  const api = highlightApi();
  if (!api) return 0;

  const probe = document.createRange();
  const ranges: Range[] = [];
  for (const block of root.querySelectorAll(GUIDED_BLOCK_SELECTOR)) {
    ranges.push(...blockRanges(block, probe));
  }

  const highlight = api.create(ranges);
  // Below the reader's own marks, which are the louder of the two.
  highlight.priority = -1;
  api.registry.set(LINE_GUIDE_HIGHLIGHT, highlight);
  return ranges.length;
}

export function clearLineGuide(): void {
  highlightApi()?.registry.delete(LINE_GUIDE_HIGHLIGHT);
}
