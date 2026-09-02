import {
  ANCHOR_BLOCK_SELECTOR,
  globalOffset,
  resolveTextAnchor,
} from "@/lib/highlights/text-anchor";
import type { ReadingAnchor } from "@/lib/reader-data/schema";
import { clamp } from "@/lib/utils";

/** Context kept on either side of the anchored text, matching the highlight anchors. */
const CONTEXT_LENGTH = 120;
/** Upper bound on the stored text; also the schema's limit. */
const ANCHOR_TEXT_LENGTH = 400;
/**
 * Below this a block carries too little signal to be found again ("Evet.", a bare
 * number in a list). Such a block is left unanchored and the record falls back to
 * heading + ratio rather than risking a jump to the wrong paragraph.
 */
const MIN_ANCHOR_TEXT_LENGTH = 12;

export function readingAnchorBlocks(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(ANCHOR_BLOCK_SELECTOR));
}

/**
 * Describes the block at `blockIndex` well enough to find it again after the article
 * has reflowed — or after the text around it has been edited.
 */
export function serializeReadingAnchor(
  root: HTMLElement,
  blocks: HTMLElement[],
  blockIndex: number,
  blockOffset: number,
): ReadingAnchor | null {
  const block = blocks[blockIndex];
  if (!block) return null;

  const exactText = (block.textContent ?? "").slice(0, ANCHOR_TEXT_LENGTH);
  if (exactText.trim().length < MIN_ANCHOR_TEXT_LENGTH) return null;

  const fullText = root.textContent ?? "";
  const start = globalOffset(root, block, 0);
  const end = start + exactText.length;

  return {
    exactText,
    prefixText: fullText.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffixText: fullText.slice(end, end + CONTEXT_LENGTH),
    blockIndex,
    blockOffset: clamp(blockOffset, 0, 1),
  };
}

function blockOf(node: Node): HTMLElement | null {
  const element =
    node.nodeType === Node.ELEMENT_NODE ? (node as Element) : (node.parentElement ?? null);
  return element?.closest<HTMLElement>(ANCHOR_BLOCK_SELECTOR) ?? null;
}

export type ResolvedReadingAnchor = {
  block: HTMLElement;
  /** How far into the block the reader had got, 0..1. */
  blockOffset: number;
};

/**
 * Finds the anchored block in the current DOM.
 *
 * `headingId` comes from the same record and only raises the confidence score when
 * the same text appears more than once; a stale heading never prevents a match.
 * Returns `null` when the text is gone, so the caller can fall back safely instead of
 * scrolling the reader somewhere arbitrary.
 */
export function resolveReadingAnchor(
  root: HTMLElement,
  anchor: ReadingAnchor,
  headingId: string | null,
): ResolvedReadingAnchor | null {
  const range = resolveTextAnchor(root, {
    exactText: anchor.exactText,
    prefixText: anchor.prefixText,
    suffixText: anchor.suffixText,
    headingId,
    blockIndex: anchor.blockIndex,
    startOffset: 0,
    endOffset: anchor.exactText.length,
  });
  if (!range) return null;

  // The range can start on the whitespace text node that precedes the block, so the
  // end container — always inside the matched text — is checked first.
  const block = blockOf(range.endContainer) ?? blockOf(range.startContainer);
  if (!block || !root.contains(block)) return null;

  return { block, blockOffset: clamp(anchor.blockOffset, 0, 1) };
}

/**
 * Index of the first block that is not yet fully read, given the y coordinate of the
 * reading line. Binary search keeps this to a handful of layout reads even in a long
 * article, because block order and vertical order agree in the prose column.
 */
export function flowBlockIndexAt(blocks: HTMLElement[], readingTop: number): number {
  if (blocks.length === 0) return -1;
  let low = 0;
  let high = blocks.length - 1;
  let found = blocks.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (blocks[middle].getBoundingClientRect().bottom > readingTop) {
      found = middle;
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  return found;
}

/** Fraction of the block that is already above the reading line, 0..1. */
export function flowBlockOffset(block: HTMLElement, readingTop: number): number {
  const rect = block.getBoundingClientRect();
  if (rect.height <= 0) return 0;
  return clamp((readingTop - rect.top) / rect.height, 0, 1);
}

/**
 * Index of the first block that starts on `pageIndex` or later. Column order follows
 * document order under `column-fill: auto`, so the same binary search applies.
 */
export function pagedBlockIndexAt(
  blocks: HTMLElement[],
  pageIndex: number,
  pageOf: (block: HTMLElement) => number,
): number {
  if (blocks.length === 0) return -1;
  let low = 0;
  let high = blocks.length - 1;
  let found = blocks.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (pageOf(blocks[middle]) >= pageIndex) {
      found = middle;
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }
  return found;
}
