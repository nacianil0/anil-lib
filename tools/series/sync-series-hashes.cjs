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
 *   node tools/series/sync-series-hashes.cjs           # denetle (çıkış kodu 1 = sorun var)
 *   node tools/series/sync-series-hashes.cjs --write   # frontmatter ve katalogu güncelle
 */
const { createHash } = require("node:crypto");
const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "../..");
const CATALOG_PATH = path.join(ROOT, "content", "series", "catalog.json");
const WRITE = process.argv.includes("--write");

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

const catalog = JSON.parse(readFileSync(CATALOG_PATH, "utf8"));
const problems = [];
let catalogChanged = false;

for (const entry of catalog.articles) {
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
  const catalogOk = entry.contentHash === expected;

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

console.log(`${catalog.articles.length} makale denetlendi.`);
if (problems.length === 0) {
  console.log("Sorun yok.");
} else {
  console.log(`\n${problems.length} sorun:`);
  for (const p of problems) console.log("  - " + p);
  process.exitCode = 1;
}
