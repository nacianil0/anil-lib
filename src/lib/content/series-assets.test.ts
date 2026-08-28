import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import { rehypeInlineSvg } from "./rehype-inline-svg";

/**
 * Yayındaki her seri diyagramını gerçek render hattından geçirir.
 * Amaç: marker/defs/path gibi öğelerin ve tema değişkenlerinin hast → React
 * dönüşümünde kaybolmadığını her batch için garanti altına almak
 * (docs/seri/SOZLESME.md §6; BOUN serisi aynı SVG sözleşmesini izler,
 * docs/seri-boun/SOZLESME.md §5).
 */
const ASSET_ROOTS = [
  { series: "seri", dir: path.join(process.cwd(), "content", "series", "assets") },
  { series: "boun", dir: path.join(process.cwd(), "content", "series-boun", "assets") },
];

function collectDiagrams(): Array<{ series: string; slug: string; file: string; dir: string }> {
  return ASSET_ROOTS.filter((root) => existsSync(root.dir)).flatMap((root) =>
    readdirSync(root.dir)
      .filter((slug) => statSync(path.join(root.dir, slug)).isDirectory())
      .flatMap((slug) => {
        const dir = path.join(root.dir, slug);
        return readdirSync(dir)
          .filter((file) => file.endsWith(".svg"))
          .map((file) => ({ series: root.series, slug, file, dir }));
      }),
  );
}

async function renderDiagram(dir: string, file: string): Promise<string> {
  const processed = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeInlineSvg, { assetsDir: dir })
    .use(rehypeReact, { Fragment, jsx, jsxs })
    .process(`![Alt metin](assets/${file} "Şekil — başlık")`);
  return renderToStaticMarkup(processed.result as ReactElement);
}

const diagrams = collectDiagrams();

describe("series diagrams", () => {
  it("finds published diagrams to check", () => {
    expect(diagrams.length).toBeGreaterThan(0);
  });

  it.each(diagrams)(
    "renders $series/$slug/$file without losing SVG structure",
    async ({ dir, file }) => {
      const source = readFileSync(path.join(dir, file), "utf8");
      const html = await renderDiagram(dir, file);

      expect(html).toContain("<figure");
      expect(html).toContain("<svg");
      expect(html).toContain("viewBox");

      // Ok uçları, yollar ve daireler React'e taşınmalı.
      for (const tag of ["marker", "path", "circle", "rect", "line", "text"] as const) {
        const inSource = (source.match(new RegExp(`<${tag}[\\s/>]`, "g")) ?? []).length;
        const inHtml = (html.match(new RegExp(`<${tag}[\\s/>]`, "g")) ?? []).length;
        expect(inHtml, `${file}: <${tag}> sayısı korunmalı`).toBe(inSource);
      }

      // Tema değişkenleri korunmalı; sabit renk sızmamalı.
      if (source.includes("var(--")) expect(html).toContain("var(--");
      expect(html).not.toMatch(/(fill|stroke)="#[0-9a-f]{3,8}"/i);
    },
  );
});
