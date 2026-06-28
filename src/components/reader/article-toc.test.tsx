import { describe, expect, it } from "vitest";
import { extractHeadings, computeActiveHeading, type HeadingInfo } from "./article-toc";

describe("ArticleToc helpers", () => {
  describe("extractHeadings", () => {
    it("returns empty array if container is null", () => {
      expect(extractHeadings(null)).toEqual([]);
    });

    it("extracts h2 and h3 with ids", () => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2 id="intro">Intro</h2>
        <p>Text</p>
        <h3 id="sub">Sub</h3>
        <h1>Ignore h1</h1>
        <h2 id="end">End</h2>
        <h2 class="no-id">Ignore no id</h2>
      `;
      document.body.appendChild(div);

      const headings = extractHeadings(div);
      expect(headings.length).toBe(3);
      expect(headings[0].id).toBe("intro");
      expect(headings[0].level).toBe(2);
      expect(headings[1].id).toBe("sub");
      expect(headings[1].level).toBe(3);
      expect(headings[2].id).toBe("end");
      expect(headings[2].level).toBe(2);

      document.body.removeChild(div);
    });
  });

  describe("computeActiveHeading", () => {
    it("returns null when no headings", () => {
      expect(computeActiveHeading([], 0, 76)).toBeNull();
    });

    it("returns the last heading that is above the scroll threshold", () => {
      const headings: HeadingInfo[] = [
        { id: "h1", text: "H1", level: 2, top: 100 },
        { id: "h2", text: "H2", level: 2, top: 500 },
        { id: "h3", text: "H3", level: 3, top: 1000 },
      ];

      // scrollY = 0, offset = 76 => threshold = 80. top=100 > 80. None active.
      expect(computeActiveHeading(headings, 0, 76)).toBeNull();

      // scrollY = 50 => threshold = 130. h1 (100) is active.
      expect(computeActiveHeading(headings, 50, 76)).toBe("h1");

      // scrollY = 450 => threshold = 530. h2 (500) is active.
      expect(computeActiveHeading(headings, 450, 76)).toBe("h2");

      // scrollY = 1000 => threshold = 1080. h3 (1000) is active.
      expect(computeActiveHeading(headings, 1000, 76)).toBe("h3");
    });
  });
});
