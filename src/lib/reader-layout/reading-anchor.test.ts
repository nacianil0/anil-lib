import { afterEach, describe, expect, it } from "vitest";
import {
  flowBlockIndexAt,
  flowBlockOffset,
  pagedBlockIndexAt,
  readingAnchorBlocks,
  resolveReadingAnchor,
  serializeReadingAnchor,
} from "./reading-anchor";

const ARTICLE = `
  <h2 id="giris">Giriş</h2>
  <p>Bir algoritmanın doğruluğu, tek tek denemelerle değil bir kanıtla gösterilir.</p>
  <p>Döngü değişmezi, döngünün her turunda korunan ve sonunda sonucu veren bir ifadedir.</p>
  <h2 id="ikinci">İkinci bölüm</h2>
  <p>Aynı cümle iki kez geçebilir; bağlam onu ayırt eder.</p>
  <p>Aynı cümle iki kez geçebilir; bağlam onu ayırt eder.</p>
`;

function mount(html = ARTICLE): HTMLElement {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.appendChild(root);
  return root;
}

function stubRect(element: HTMLElement, top: number, height: number) {
  element.getBoundingClientRect = () =>
    ({
      top,
      bottom: top + height,
      height,
      left: 0,
      right: 0,
      width: 0,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }) as DOMRect;
}

afterEach(() => {
  document.body.innerHTML = "";
});

describe("serializeReadingAnchor", () => {
  it("captures the block text with the surrounding context", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    const anchor = serializeReadingAnchor(root, blocks, 1, 0.4);

    expect(anchor).not.toBeNull();
    expect(anchor?.exactText).toBe(blocks[1].textContent);
    expect(anchor?.blockIndex).toBe(1);
    expect(anchor?.blockOffset).toBe(0.4);
    // The context is what precedes and follows the block in the article text.
    expect(anchor?.prefixText).toContain("gösterilir.");
    expect(anchor?.suffixText).toContain("İkinci bölüm");
  });

  it("clamps an out-of-range block offset", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    expect(serializeReadingAnchor(root, blocks, 0, 4)?.blockOffset).toBe(1);
    expect(serializeReadingAnchor(root, blocks, 0, -2)?.blockOffset).toBe(0);
  });

  it("refuses a block with too little text to be found again", () => {
    const root = mount("<p>Evet.</p>");
    const blocks = readingAnchorBlocks(root);
    expect(serializeReadingAnchor(root, blocks, 0, 0)).toBeNull();
  });

  it("returns null for a block index that no longer exists", () => {
    const root = mount();
    expect(serializeReadingAnchor(root, readingAnchorBlocks(root), 99, 0)).toBeNull();
  });
});

describe("resolveReadingAnchor", () => {
  it("finds the same paragraph again", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    const anchor = serializeReadingAnchor(root, blocks, 1, 0.6);

    const resolved = resolveReadingAnchor(root, anchor!, "giris");
    expect(resolved?.block).toBe(blocks[1]);
    expect(resolved?.blockOffset).toBe(0.6);
  });

  it("survives a reflow: the words decide, not the layout", () => {
    const root = mount();
    const anchor = serializeReadingAnchor(root, readingAnchorBlocks(root), 1, 0.5);

    // A preference change only rewrites style; the text nodes stay put.
    root.style.fontSize = "24px";
    const resolved = resolveReadingAnchor(root, anchor!, "giris");
    expect(resolved?.block.textContent).toContain("Döngü değişmezi");
  });

  it("tells apart two identical paragraphs using their context", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    const anchor = serializeReadingAnchor(root, blocks, 3, 0);

    expect(resolveReadingAnchor(root, anchor!, "ikinci")?.block).toBe(blocks[3]);
  });

  it("falls back to the block index when the surrounding text has changed", () => {
    const root = mount();
    const anchor = serializeReadingAnchor(root, readingAnchorBlocks(root), 1, 0.2);

    // The article gained a sentence elsewhere: context no longer matches exactly,
    // but the anchored paragraph itself is untouched.
    root.querySelectorAll("p")[0].textContent = "Bambaşka bir açılış cümlesi yazıldı.";
    const resolved = resolveReadingAnchor(root, anchor!, "giris");
    expect(resolved?.block.textContent).toContain("Döngü değişmezi");
  });

  it("returns null when the anchored text is gone, so the caller can fall back", () => {
    const root = mount();
    const anchor = serializeReadingAnchor(root, readingAnchorBlocks(root), 1, 0.2);

    root.querySelectorAll("p")[1].remove();
    expect(resolveReadingAnchor(root, anchor!, "giris")).toBeNull();
  });

  it("ignores a stale heading id rather than refusing to resolve", () => {
    const root = mount();
    const anchor = serializeReadingAnchor(root, readingAnchorBlocks(root), 1, 0.2);

    expect(resolveReadingAnchor(root, anchor!, "artik-olmayan-baslik")).not.toBeNull();
  });
});

describe("flowBlockIndexAt", () => {
  it("returns the first block that is not yet fully read", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    blocks.forEach((block, index) => stubRect(block, index * 100 - 250, 100));
    // Blocks occupy [-250,-150), [-150,-50), [-50,50), [50,150) …
    // The reading line at 80 leaves the first two fully behind.
    expect(flowBlockIndexAt(blocks, 80)).toBe(3);
  });

  it("returns the last block once the reader is past everything", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    blocks.forEach((block, index) => stubRect(block, index * 100 - 5000, 100));
    expect(flowBlockIndexAt(blocks, 80)).toBe(blocks.length - 1);
  });

  it("reports no block for an empty article", () => {
    expect(flowBlockIndexAt([], 80)).toBe(-1);
  });
});

describe("flowBlockOffset", () => {
  it("measures how much of the block is already above the reading line", () => {
    const root = mount();
    const block = readingAnchorBlocks(root)[0];
    stubRect(block, -40, 200);
    expect(flowBlockOffset(block, 60)).toBeCloseTo(0.5, 5);
  });

  it("clamps and tolerates a zero-height block", () => {
    const root = mount();
    const block = readingAnchorBlocks(root)[0];
    stubRect(block, 500, 100);
    expect(flowBlockOffset(block, 80)).toBe(0);
    stubRect(block, 0, 0);
    expect(flowBlockOffset(block, 80)).toBe(0);
  });
});

describe("pagedBlockIndexAt", () => {
  it("returns the first block that starts on the current page", () => {
    const root = mount();
    const blocks = readingAnchorBlocks(root);
    const pages = [0, 0, 1, 1, 2, 2];
    const pageOf = (block: HTMLElement) => pages[blocks.indexOf(block)] ?? 0;
    expect(pagedBlockIndexAt(blocks, 1, pageOf)).toBe(2);
    expect(pagedBlockIndexAt(blocks, 0, pageOf)).toBe(0);
  });

  it("reports no block for an empty article", () => {
    expect(pagedBlockIndexAt([], 1, () => 0)).toBe(-1);
  });
});
