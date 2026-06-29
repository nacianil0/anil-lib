import type { TextAnchor } from "@/lib/reader-data/schema";

const BLOCK_SELECTOR = "p, li, blockquote";
const FORBIDDEN_SELECTOR = "pre, code, table";
const CONTEXT_LENGTH = 80;

function textNodes(root: HTMLElement): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    nodes.push(current as Text);
    current = walker.nextNode();
  }
  return nodes;
}

function globalOffset(root: HTMLElement, container: Node, offset: number): number {
  const before = document.createRange();
  before.selectNodeContents(root);
  before.setEnd(container, offset);
  return before.toString().length;
}

function rangeAt(root: HTMLElement, start: number, end: number): Range | null {
  const nodes = textNodes(root);
  let cursor = 0;
  let startNode: Text | null = null;
  let endNode: Text | null = null;
  let startOffset = 0;
  let endOffset = 0;

  for (const node of nodes) {
    const next = cursor + node.data.length;
    if (!startNode && start >= cursor && start <= next) {
      startNode = node;
      startOffset = start - cursor;
    }
    if (end >= cursor && end <= next) {
      endNode = node;
      endOffset = end - cursor;
      break;
    }
    cursor = next;
  }
  if (!startNode || !endNode) return null;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

function elementFor(node: Node): Element | null {
  return node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
}

function headingAt(root: HTMLElement, offset: number): string | null {
  let selected: string | null = null;
  for (const heading of root.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id], h4[id]")) {
    const headingOffset = globalOffset(root, heading, 0);
    if (headingOffset > offset) break;
    selected = heading.id;
  }
  return selected;
}

export function serializeTextAnchor(root: HTMLElement, range: Range): TextAnchor | null {
  if (
    range.collapsed ||
    !root.contains(range.startContainer) ||
    !root.contains(range.endContainer)
  ) {
    return null;
  }
  const startElement = elementFor(range.startContainer);
  const endElement = elementFor(range.endContainer);
  if (
    startElement?.closest(FORBIDDEN_SELECTOR) ||
    endElement?.closest(FORBIDDEN_SELECTOR) ||
    range.cloneContents().querySelector?.(FORBIDDEN_SELECTOR)
  ) {
    return null;
  }

  const exactText = range.toString();
  if (!exactText.trim() || exactText.length > 2_000) return null;
  const fullText = root.textContent ?? "";
  const start = globalOffset(root, range.startContainer, range.startOffset);
  const end = globalOffset(root, range.endContainer, range.endOffset);
  const blocks = Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR));
  const block = startElement?.closest<HTMLElement>(BLOCK_SELECTOR) ?? null;
  const blockIndex = block ? Math.max(0, blocks.indexOf(block)) : 0;
  let startOffset = 0;
  let endOffset = exactText.length;
  if (block?.contains(range.startContainer) && block.contains(range.endContainer)) {
    startOffset = globalOffset(block, range.startContainer, range.startOffset);
    endOffset = globalOffset(block, range.endContainer, range.endOffset);
  }

  return {
    exactText,
    prefixText: fullText.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffixText: fullText.slice(end, end + CONTEXT_LENGTH),
    headingId: headingAt(root, start),
    blockIndex,
    startOffset,
    endOffset,
  };
}

function scoreOccurrence(root: HTMLElement, anchor: TextAnchor, fullText: string, start: number) {
  let score = 0;
  if (anchor.prefixText && fullText.slice(0, start).endsWith(anchor.prefixText)) score += 4;
  const end = start + anchor.exactText.length;
  if (anchor.suffixText && fullText.slice(end).startsWith(anchor.suffixText)) score += 4;
  if (anchor.headingId && headingAt(root, start) === anchor.headingId) score += 3;
  return score;
}

export function resolveTextAnchor(root: HTMLElement, anchor: TextAnchor): Range | null {
  const fullText = root.textContent ?? "";
  let cursor = 0;
  let bestStart = -1;
  let bestScore = -1;
  while (cursor <= fullText.length) {
    const found = fullText.indexOf(anchor.exactText, cursor);
    if (found < 0) break;
    const score = scoreOccurrence(root, anchor, fullText, found);
    if (score > bestScore) {
      bestScore = score;
      bestStart = found;
    }
    cursor = found + Math.max(1, anchor.exactText.length);
  }
  if (bestStart >= 0) {
    return rangeAt(root, bestStart, bestStart + anchor.exactText.length);
  }

  const blocks = Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR));
  const block = blocks[anchor.blockIndex];
  if (!block) return null;
  const blockText = block.textContent ?? "";
  if (blockText.slice(anchor.startOffset, anchor.endOffset) !== anchor.exactText) return null;
  return rangeAt(block, anchor.startOffset, anchor.endOffset);
}
