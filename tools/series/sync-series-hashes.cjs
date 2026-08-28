#!/usr/bin/env node
/**
 * Seri makalelerinin content_hash değerlerini doğrular ve isteğe bağlı olarak yazar.
 *
 * Sözleşme (docs/seri/SOZLESME.md §1): content_hash, makale gövdesinin
 * (frontmatter sonrası, trim edilmiş) UTF-8 SHA-256'sıdır ve
 * `content/series/catalog.json` ile frontmatter birebir eşleşmek zorundadır.
 * Build yalnızca katalog ↔ frontmatter eşitliğini denetler; hash'in gövdeyle
 * gerçekten uyuştuğunu denetleyen tek yer burasıdır.
 *
 * Kullanım:
 *   node tools/series/sync-series-hashes.cjs                 # AI serisini denetle
 *   node tools/series/sync-series-hashes.cjs --series=boun   # BOUN serisini denetle
 *   node tools/series/sync-series-hashes.cjs --write         # frontmatter ve katalogu güncelle
 *
 * Katalog henüz yoksa (bir serinin ilk üretim run'ı) araç makale klasörünü gezer
 * ve yalnızca frontmatter hash'lerini düzeltir; katalog daha sonra entegre-batch.cjs
 * tarafından bu frontmatter'lardan üretilir.
 */
const { createHash } = require("node:crypto");
const { existsSync, readFileSync, readdirSync, statSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const SERIES_DIRS = { ai: "series", boun: "series-boun" };

const seriesArg = process.argv.find((a) => a.startsWith("--series="));
const seriesKey = seriesArg ? seriesArg.slice("--series=".length) : "ai";
const seriesDir = SERIES_DIRS[seriesKey];
if (!seriesDir) {
  console.error(`Bilinmeyen seri: ${seriesKey} (geçerli: ${Object.keys(SERIES_DIRS).join(", ")})`);
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "../..");
const CATALOG_PATH = path.join(ROOT, "content", seriesDir, "catalog.json");
const ARTICLES_DIR = path.join(ROOT, "content", seriesDir, "articles");
const WRITE = process.argv.includes("--write");

function walkMarkdown(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

/** Gövde = frontmatter bloğundan sonraki metin, trim edilmiş. */
function splitFrontmatter(text) {
  if (!text.startsWith("---")) throw new Error("frontmatter bloğu yok");
  const end = text.indexOf("\n---", 3);
  if (end === -1) throw new Error("frontmatter kapanmıyor");
  const bodyStart = text.indexOf("\n", end + 1) + 1;
  return { frontmatter: text.slice(0, bodyStart), body: text.slice(bodyStart) };
}

function hashBody(body) {
  return "sha256:" + createHash("sha256").update(body.trim(), "utf8").digest("hex");
}

const hasCatalog = existsSync(CATALOG_PATH);
const catalog = hasCatalog ? JSON.parse(readFileSync(CATALOG_PATH, "utf8")) : { articles: [] };
const problems = [];
let catalogChanged = false;

// Katalog varsa onun kayıtları, yoksa diskteki makale dosyaları denetlenir.
const targets = hasCatalog
  ? catalog.articles
  : walkMarkdown(ARTICLES_DIR).map((abs) => ({
      path: path.relative(ROOT, abs).split(path.sep).join("/"),
      slug: path.basename(abs, ".md"),
      contentHash: null,
    }));

if (targets.length === 0) {
  console.error(hasCatalog ? "Katalogda makale yok." : `Makale bulunamadı: ${ARTICLES_DIR}`);
  process.exit(1);
}

for (const entry of targets) {
  const file = path.join(ROOT, entry.path);
  const raw = readFileSync(file, "utf8");
  const { frontmatter, body } = splitFrontmatter(raw);
  const expected = hashBody(body);

  const fmMatch = frontmatter.match(/^content_hash:\s*(\S+)\s*$/m);
  if (!fmMatch) {
    problems.push(`${entry.path}: frontmatter'da content_hash satırı yok`);
    continue;
  }
  const fmHash = fmMatch[1];

  const fmOk = fmHash === expected;
  const catalogOk = !hasCatalog || entry.contentHash === expected;

  if (fmOk && catalogOk) continue;

  if (!WRITE) {
    if (!fmOk) problems.push(`${entry.path}: frontmatter ${fmHash} ≠ gövde ${expected}`);
    if (!catalogOk) problems.push(`${entry.slug}: katalog ${entry.contentHash} ≠ gövde ${expected}`);
    continue;
  }

  if (!fmOk) {
    const updated = frontmatter.replace(/^content_hash:\s*\S+\s*$/m, `content_hash: ${expected}`);
    writeFileSync(file, updated + body, "utf8");
    console.log(`yazıldı  frontmatter  ${entry.path}`);
  }
  if (!catalogOk) {
    entry.contentHash = expected;
    catalogChanged = true;
    console.log(`yazıldı  katalog      ${entry.slug}`);
  }
}

if (WRITE && catalogChanged) {
  writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2) + "\n", "utf8");
}

console.log(
  `${targets.length} makale denetlendi${hasCatalog ? "" : " (katalog yok; yalnizca frontmatter)"}.`,
);
if (problems.length === 0) {
  console.log("Sorun yok.");
} else {
  console.log(`\n${problems.length} sorun:`);
  for (const p of problems) console.log("  - " + p);
  process.exitCode = 1;
}
