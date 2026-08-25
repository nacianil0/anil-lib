import { readFileSync } from "node:fs";
import path from "node:path";
import { fromHtml } from "hast-util-from-html";
import type { Element, ElementContent, Root } from "hast";

/**
 * Rehype adımı: `assets/*.svg` kaynaklı Markdown imgelerini tema-uyumlu inline
 * SVG'ye çevirir. SVG dosyaları depo içeriğidir (yazar biziz); yine de savunma
 * amaçlı `script`/`foreignObject` elemanları ve `on*` öznitelikleri düşürülür.
 *
 * Kural: diyagram imgesi kendi paragrafında tek başına durmalıdır
 * (`![alt](assets/x.svg "Şekil 1 — başlık")`). Paragraf `<figure>` +
 * `<figcaption>` ile değiştirilir; `alt` SVG'ye `aria-label` olarak taşınır.
 * Eksik dosya veya satır içi kullanım build hatasıdır.
 */
export type InlineSvgOptions = {
  /** Bu makalenin diyagram klasörü (mutlak yol). */
  assetsDir: string;
};

const ASSET_SRC = /^assets\/[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/;

function isWhitespaceText(node: ElementContent): boolean {
  return node.type === "text" && node.value.trim() === "";
}

function isAssetImage(node: ElementContent): node is Element {
  return (
    node.type === "element" &&
    node.tagName === "img" &&
    typeof node.properties?.src === "string" &&
    node.properties.src.startsWith("assets/")
  );
}

function sanitizeSvgTree(node: Element): void {
  for (const key of Object.keys(node.properties ?? {})) {
    const lower = key.toLowerCase();
    const value = node.properties[key];
    if (lower.startsWith("on")) delete node.properties[key];
    else if (
      (lower === "href" || lower === "xlinkhref") &&
      typeof value === "string" &&
      value.trim().toLowerCase().startsWith("javascript:")
    ) {
      delete node.properties[key];
    }
  }
  node.children = node.children.filter(
    (child) =>
      !(
        child.type === "element" &&
        (child.tagName === "script" || child.tagName === "foreignObject")
      ),
  );
  for (const child of node.children) {
    if (child.type === "element") sanitizeSvgTree(child);
  }
}

function loadSvgElement(src: string, options: InlineSvgOptions): Element {
  const relative = src.slice("assets/".length);
  const absolute = path.resolve(options.assetsDir, relative);
  const relativeToAssets = path.relative(options.assetsDir, absolute);
  if (relativeToAssets.startsWith("..") || path.isAbsolute(relativeToAssets)) {
    throw new Error(`[series] Diyagram yolu asset klasörünün dışına çıkıyor: ${src}`);
  }

  let file: string;
  try {
    file = readFileSync(absolute, "utf8");
  } catch {
    throw new Error(
      `[series] Diyagram dosyası bulunamadı: ${src} (beklenen konum: ${absolute})`,
    );
  }

  const parsed = fromHtml(file, { fragment: true });
  const svg = parsed.children.find(
    (child): child is Element => child.type === "element" && child.tagName === "svg",
  );
  if (!svg) {
    throw new Error(`[series] Diyagram dosyası kök <svg> içermiyor: ${src}`);
  }
  if (svg.properties.viewBox === undefined) {
    throw new Error(`[series] Diyagram SVG'sinde viewBox zorunludur: ${src}`);
  }
  sanitizeSvgTree(svg);
  delete svg.properties.width;
  delete svg.properties.height;
  return svg;
}

function buildFigure(image: Element, options: InlineSvgOptions): Element {
  const src = String(image.properties.src);
  if (!ASSET_SRC.test(src)) {
    throw new Error(
      `[series] Diyagram kaynağı 'assets/<kebab-case>.svg' biçiminde olmalı: ${src}`,
    );
  }

  const svg = loadSvgElement(src, options);
  const alt = typeof image.properties.alt === "string" ? image.properties.alt : "";
  const caption = typeof image.properties.title === "string" ? image.properties.title : "";
  svg.properties.role = "img";
  if (alt) svg.properties.ariaLabel = alt;

  // SVG kendi kaydırma kabında durur: dar ekranlarda diyagram okunaklı
  // kalacak kadar geniş tutulur ve kullanıcı yatayda kaydırır. Şekil başlığı
  // kabın dışındadır, böylece her zaman görünür genişlikte kalır.
  const children: ElementContent[] = [
    {
      type: "element",
      tagName: "div",
      properties: { className: ["series-figure-scroll"] },
      children: [svg],
    },
  ];
  if (caption) {
    children.push({
      type: "element",
      tagName: "figcaption",
      properties: {},
      children: [{ type: "text", value: caption }],
    });
  }

  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["series-figure"] },
    children,
  };
}

function transformChildren(parent: Root | Element, options: InlineSvgOptions): void {
  parent.children = parent.children.map((child) => {
    if (child.type !== "element") return child;

    if (child.tagName === "p") {
      const meaningful = child.children.filter((node) => !isWhitespaceText(node));
      const [only] = meaningful;
      if (meaningful.length === 1 && only && isAssetImage(only)) {
        return buildFigure(only, options);
      }
      const inlineAsset = meaningful.find(isAssetImage);
      if (inlineAsset) {
        throw new Error(
          `[series] Diyagram imgesi kendi paragrafında tek başına durmalı: ${String(
            inlineAsset.properties.src,
          )}`,
        );
      }
      return child;
    }

    if (isAssetImage(child)) {
      throw new Error(
        `[series] Diyagram imgesi kendi paragrafında tek başına durmalı: ${String(
          child.properties.src,
        )}`,
      );
    }

    transformChildren(child, options);
    return child;
  });
}

export function rehypeInlineSvg(options: InlineSvgOptions) {
  return (tree: Root) => {
    transformChildren(tree, options);
  };
}
