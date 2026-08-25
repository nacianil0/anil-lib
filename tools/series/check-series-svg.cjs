#!/usr/bin/env node
/**
 * Seri diyagramları için sözleşme denetimi (docs/seri/SOZLESME.md §6).
 *
 * Kontroller:
 *  - viewBox zorunlu, width/height özniteliği olmamalı
 *  - renkler yalnızca var(--...) (sabit hex/rgb/renk adı yasak; "none" serbest)
 *  - script/foreignForeign/on* yasak
 *  - font-family belirtilmemeli (CSS devralır)
 *  - metin boyutu >= 13
 *  - metinler viewBox sınırları içinde kalmalı (kaba tahmin)
 *
 * Kullanım: node tools/series/check-series-svg.cjs [asset-klasörü]
 */
const { readdirSync, readFileSync, statSync, existsSync } = require("node:fs");
const path = require("node:path");

const ASSETS_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(__dirname, "../../content/series/assets");

const ALLOWED_NON_VAR = new Set(["none", "transparent", "currentColor", "inherit"]);
const COLOR_ATTRS = ["fill", "stroke", "stop-color", "color"];

function walkSvgFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkSvgFiles(full));
    else if (entry.endsWith(".svg")) out.push(full);
  }
  return out;
}

function checkFile(file) {
  const problems = [];
  const svg = readFileSync(file, "utf8");
  const rel = path.relative(process.cwd(), file);
  const add = (msg) => problems.push(`${rel}: ${msg}`);

  const rootMatch = svg.match(/<svg\b([^>]*)>/);
  if (!rootMatch) {
    add("kök <svg> etiketi bulunamadı");
    return problems;
  }
  const rootAttrs = rootMatch[1];

  const viewBox = rootAttrs.match(/viewBox\s*=\s*"([^"]+)"/);
  if (!viewBox) add("viewBox zorunlu");
  if (/\swidth\s*=/.test(rootAttrs)) add("kök <svg> width özniteliği taşımamalı");
  if (/\sheight\s*=/.test(rootAttrs)) add("kök <svg> height özniteliği taşımamalı");

  if (/<script\b/i.test(svg)) add("script elemanı yasak");
  if (/<foreignObject\b/i.test(svg)) add("foreignObject yasak");
  for (const m of svg.matchAll(/\s(on[a-z]+)\s*=/gi)) add(`olay özniteliği yasak: ${m[1]}`);
  if (/font-family/i.test(svg)) add("font-family belirtilmemeli (CSS devralır)");

  for (const attr of COLOR_ATTRS) {
    const re = new RegExp(`\\s${attr}\\s*=\\s*"([^"]*)"`, "gi");
    for (const m of svg.matchAll(re)) {
      const value = m[1].trim();
      if (!value) continue;
      if (value.startsWith("var(--")) continue;
      if (value.startsWith("url(#")) continue;
      if (ALLOWED_NON_VAR.has(value)) continue;
      add(`sabit renk yasak: ${attr}="${value}" (yalnızca var(--...) kullanılır)`);
    }
  }

  for (const m of svg.matchAll(/font-size\s*=\s*"(\d+(?:\.\d+)?)"/g)) {
    if (Number(m[1]) < 13) add(`font-size ${m[1]} çok küçük (en az 13)`);
  }

  // Kaba taşma kontrolü: metinlerin viewBox içinde kalması.
  if (viewBox) {
    const [, , vbW, vbH] = viewBox[1].trim().split(/[\s,]+/).map(Number);
    for (const m of svg.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)) {
      const attrs = m[1];
      const label = m[2].replace(/<[^>]*>/g, "").trim();
      const x = Number((attrs.match(/\sx\s*=\s*"(-?\d+(?:\.\d+)?)"/) || [])[1]);
      const y = Number((attrs.match(/\sy\s*=\s*"(-?\d+(?:\.\d+)?)"/) || [])[1]);
      const size = Number((attrs.match(/font-size\s*=\s*"(\d+(?:\.\d+)?)"/) || [])[1] || 14);
      const anchor = (attrs.match(/text-anchor\s*=\s*"(\w+)"/) || [])[1] || "start";
      if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
      const width = label.length * size * 0.55;
      let left = x;
      if (anchor === "middle") left = x - width / 2;
      else if (anchor === "end") left = x - width;
      const right = left + width;
      if (left < -2 || right > vbW + 2) {
        add(`metin viewBox dışına taşıyor olabilir: "${label}" (x=${x}, tahmini ${Math.round(left)}..${Math.round(right)}, genişlik ${vbW})`);
      }
      if (y < 0 || y > vbH) {
        add(`metin dikeyde viewBox dışında: "${label}" (y=${y}, yükseklik ${vbH})`);
      }
    }
  }

  return problems;
}

const files = walkSvgFiles(ASSETS_DIR);
if (files.length === 0) {
  console.error(`Diyagram bulunamadı: ${ASSETS_DIR}`);
  process.exit(1);
}

const all = files.flatMap(checkFile);
console.log(`${files.length} diyagram denetlendi.`);
if (all.length === 0) {
  console.log("Sorun yok.");
} else {
  console.log(`\n${all.length} sorun:`);
  for (const p of all) console.log("  - " + p);
  process.exitCode = 1;
}
