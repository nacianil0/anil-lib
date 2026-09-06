import { describe, expect, it } from "vitest";
import { bandedLineBounds, lineBoxesOf, positionAt, type MeasuredRect } from "./line-guide";

function rect(left: number, top: number, right: number, bottom: number): MeasuredRect {
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

describe("lineBoxesOf", () => {
  it("joins the boxes that share a line", () => {
    const lines = lineBoxesOf([rect(0, 0, 120, 19), rect(120, 0, 300, 19), rect(0, 33, 260, 52)]);
    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatchObject({ left: 0, right: 300 });
    expect(lines[1]).toMatchObject({ left: 0, right: 260 });
  });

  it("keeps a smaller inline run on the line it sits in", () => {
    // A `code` or `sup` box is shorter than the text around it.
    const lines = lineBoxesOf([rect(0, 0, 120, 19), rect(122, 4, 160, 16), rect(160, 0, 300, 19)]);
    expect(lines).toHaveLength(1);
  });

  it("survives the element box a range reports before its own text", () => {
    // `Range.getClientRects()` gives an inline element's fragments first and its
    // text after, so the rects walk back up the block. Counting in order would
    // read this two-line paragraph as four lines.
    const lines = lineBoxesOf([
      rect(0, 0, 300, 19),
      rect(0, 33, 180, 52),
      rect(0, 0, 300, 19),
      rect(0, 33, 180, 52),
      rect(180, 33, 300, 52),
    ]);
    expect(lines).toHaveLength(2);
    expect(lines[1]).toMatchObject({ left: 0, right: 300 });
  });

  it("separates two columns that share a line top", () => {
    const lines = lineBoxesOf([rect(0, 0, 300, 19), rect(360, 0, 660, 19)]);
    expect(lines).toHaveLength(2);
  });

  it("ignores the empty rect a range reports on a line it only touches", () => {
    const lines = lineBoxesOf([rect(280, 0, 280, 19), rect(0, 33, 260, 52)]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ top: 33 });
  });

  it("merges lines a later box bridges", () => {
    const lines = lineBoxesOf([rect(0, 0, 100, 19), rect(200, 0, 300, 19), rect(100, 0, 200, 19)]);
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ left: 0, right: 300 });
  });
});

describe("positionAt", () => {
  it("maps a block offset onto the text node holding it", () => {
    const block = document.createElement("p");
    block.innerHTML = "Bir <strong>iki</strong> üç";
    const nodes = [...block.childNodes].flatMap((node) =>
      node.nodeType === Node.TEXT_NODE
        ? [node as Text]
        : [...node.childNodes].map((child) => child as Text),
    );
    const spans = [
      { node: nodes[0], from: 0, to: 4 },
      { node: nodes[1], from: 4, to: 7 },
      { node: nodes[2], from: 7, to: 10 },
    ];

    expect(positionAt(spans, 2)).toEqual({ node: nodes[0], offset: 2 });
    // A boundary resolves to the end of the earlier node: the same painted place.
    expect(positionAt(spans, 4)).toEqual({ node: nodes[0], offset: 4 });
    expect(positionAt(spans, 5)).toEqual({ node: nodes[1], offset: 1 });
    expect(positionAt(spans, 10)).toEqual({ node: nodes[2], offset: 3 });
    expect(positionAt([], 0)).toBeNull();
  });
});

describe("bandedLineBounds", () => {
  it("takes every second line, leaving the first plain", () => {
    expect(bandedLineBounds([0, 40, 80, 120], 150)).toEqual([
      [40, 80],
      [120, 150],
    ]);
  });

  it("leaves a one-line block unmarked", () => {
    expect(bandedLineBounds([0], 30)).toEqual([]);
  });

  it("drops a band with nothing in it", () => {
    expect(bandedLineBounds([0, 40], 40)).toEqual([]);
  });
});
