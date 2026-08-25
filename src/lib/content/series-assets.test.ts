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
 * (docs/seri/SOZLESME.md §6).
 */
const ASSETS_DIR = path.join(process.cwd(), "content", "series", "assets");

function collectDiagrams(): Array<{ slug: string; file: string; dir: string }> {
  if (!existsSync(ASSETS_DIR)) return [];
  return readdirSync(ASSETS_DIR)
    .filter((slug) => statSync(path.join(ASSETS_DIR, slug)).isDirectory())
    .flatMap((slug) => {
      const dir = path.join(ASSETS_DIR, slug);
      return readdirSync(dir)
        .filter((file) => file.endsWith(".svg"))
        .map((file) => ({ slug, file, dir }));
    });
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

  it.each(diagrams)("renders $slug/$file without losing SVG structure", async ({ dir, file }) => {
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
  });
});
