import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import type { Element, Root } from "hast";
import { rehypeInlineSvg } from "./rehype-inline-svg";

const assetsDir = mkdtempSync(path.join(tmpdir(), "series-svg-"));

writeFileSync(
  path.join(assetsDir, "temiz.svg"),
  `<svg viewBox="0 0 100 50" width="100" height="50"><rect x="1" y="1" width="10" height="10" fill="var(--accent)"/></svg>`,
  "utf8",
);
writeFileSync(
  path.join(assetsDir, "kirli.svg"),
  `<svg viewBox="0 0 10 10" onclick="alert(1)"><script>alert(2)</script><circle r="3" onmouseover="x()"/></svg>`,
  "utf8",
);
writeFileSync(path.join(assetsDir, "kutusuz.svg"), `<svg><rect/></svg>`, "utf8");

afterAll(() => {
  rmSync(assetsDir, { recursive: true, force: true });
});

async function transform(markdown: string): Promise<Root> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeInlineSvg, { assetsDir });
  const parsed = processor.parse(markdown);
  return (await processor.run(parsed)) as Root;
}

function firstElement(tree: Root): Element {
  const element = tree.children.find((child): child is Element => child.type === "element");
  if (!element) throw new Error("expected an element");
  return element;
}

describe("rehypeInlineSvg", () => {
  it("replaces a standalone image paragraph with an inline SVG figure", async () => {
    const tree = await transform(`![Erişilebilir açıklama](assets/temiz.svg "Şekil 1 — Deneme")`);
    const figure = firstElement(tree);

    expect(figure.tagName).toBe("figure");
    expect(figure.properties.className).toEqual(["series-figure"]);

    const [svg, caption] = figure.children as Element[];
    expect(svg.tagName).toBe("svg");
    expect(svg.properties.role).toBe("img");
    expect(svg.properties.ariaLabel).toBe("Erişilebilir açıklama");
    expect(svg.properties.width).toBeUndefined();
    expect(svg.properties.height).toBeUndefined();
    expect(caption.tagName).toBe("figcaption");
    expect(caption.children[0]).toMatchObject({ value: "Şekil 1 — Deneme" });
  });

  it("drops script elements and on* attributes", async () => {
    const tree = await transform(`![t](assets/kirli.svg "Şekil")`);
    const figure = firstElement(tree);
    const svg = figure.children[0] as Element;

    expect(svg.properties.onClick ?? svg.properties.onclick).toBeUndefined();
    expect(
      svg.children.some((child) => child.type === "element" && child.tagName === "script"),
    ).toBe(false);
    const circle = svg.children.find(
      (child): child is Element => child.type === "element" && child.tagName === "circle",
    );
    expect(circle).toBeDefined();
    expect(
      Object.keys(circle!.properties).filter((key) => key.toLowerCase().startsWith("on")),
    ).toEqual([]);
  });

  it("throws a clear error for a missing asset", async () => {
    await expect(transform(`![t](assets/yok.svg "Şekil")`)).rejects.toThrow(/bulunamadı/);
  });

  it("throws when the svg lacks a viewBox", async () => {
    await expect(transform(`![t](assets/kutusuz.svg "Şekil")`)).rejects.toThrow(/viewBox/);
  });

  it("throws when the image is used inline with text", async () => {
    await expect(
      transform(`Metin ile aynı satırda ![t](assets/temiz.svg) duruyor.`),
    ).rejects.toThrow(/kendi paragrafında/);
  });

  it("leaves non-asset images untouched", async () => {
    const tree = await transform(`![dış](https://example.com/resim.png)`);
    const paragraph = firstElement(tree);
    expect(paragraph.tagName).toBe("p");
    const img = paragraph.children[0] as Element;
    expect(img.tagName).toBe("img");
    expect(img.properties.src).toBe("https://example.com/resim.png");
  });

  it("renders through rehype-react to real SVG markup", async () => {
    // Guards the full article pipeline: the inlined SVG must survive the
    // hast → React conversion with its SVG-namespaced attributes intact.
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeInlineSvg, { assetsDir })
      .use(rehypeReact, { Fragment, jsx, jsxs })
      .process(`![Açıklama](assets/temiz.svg "Şekil 1 — Deneme")`);

    const html = renderToStaticMarkup(file.result as ReactElement);

    expect(html).toContain("<figure");
    expect(html).toContain("series-figure");
    expect(html).toContain("<svg");
    expect(html).toContain('viewBox="0 0 100 50"');
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-label="Açıklama"');
    expect(html).toContain("<figcaption>Şekil 1 — Deneme</figcaption>");
    expect(html).not.toMatch(/width="100"/);
  });
});
