#!/usr/bin/env node
/**
 * Seri makalelerinin content_hash değerlerini doğrular ve isteğe bağlı olarak yazar.
 *
 * Sözleşme (docs/seri/SOZLESME.md §1): content_hash, makale gövdesinin
 * (frontmatter sonrası, satır sonları LF'ye normalleştirilmiş, trim edilmiş) UTF-8
 * SHA-256'sıdır ve
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
 *
 * Editoryal revizyon alanları (docs/seri/SOZLESME.md §12): `revised_at` + `revision_note`
 * frontmatter'da elle yazılır; bu araç onları katalogdaki `revisedAt` + `revisionNote`
 * alanlarına taşır (--write) ya da uyuşmazlığı raporlar. Hash değişimi revizyon
 * değildir; araç hiçbir makaleyi kendiliğinden "revize edildi" diye işaretlemez.
 */
const { createHash } = require("node:crypto");
const { existsSync, readFileSync, readdirSync, statSync, writeFileSync } = require("node:fs");
const path = require("node:path");

// Uygulamanın kullandığı ayrıştırıcı: tırnaksız bir YAML tarihi Date olarak gelir.
const matter = require("gray-matter");

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

/**
 * Satır sonları LF'ye normalleştirilerek hesaplanır: git `core.autocrlf` açıkken çalışma
 * kopyası CRLF, dizin LF tutar ve düzenleme araçları iki biçimi de yazabilir. Hash satır
 * sonuna bağlı olsaydı aynı gövde makineden makineye farklı hash verirdi.
 */
function hashBody(body) {
  const normalized = body.replace(/\r\n/g, "\n").trim();
  return "sha256:" + createHash("sha256").update(normalized, "utf8").digest("hex");
}

/**
 * Frontmatter'daki revizyonu okur: { revisedAt, revisionNote } ya da hiç revizyon yoksa null.
 * Yarım ya da biçimsiz bir revizyon { error } döner.
 */
function readRevision(data) {
  const rawDate = data.revised_at;
  const rawNote = data.revision_note;
  if (rawDate === undefined && rawNote === undefined) return null;
  if (rawDate === undefined || rawNote === undefined) {
    return { error: "revised_at ve revision_note birlikte verilmeli" };
  }
  const date = rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate);
  const valid =
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  if (!valid) return { error: `revised_at geçerli bir YYYY-MM-DD değil: ${date}` };
  const note = String(rawNote).trim();
  if (!note || note.length > 200) return { error: "revision_note 1–200 karakter olmalı" };
  return { revisedAt: date, revisionNote: note };
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

  // Revizyon: frontmatter kaynaktır, katalog onun izdüşümüdür.
  const revision = readRevision(matter(raw).data);
  if (revision && revision.error) {
    problems.push(`${entry.path}: ${revision.error}`);
  } else if (hasCatalog) {
    const wantDate = revision ? revision.revisedAt : undefined;
    const wantNote = revision ? revision.revisionNote : undefined;
    if (entry.revisedAt !== wantDate || entry.revisionNote !== wantNote) {
      if (!WRITE) {
        problems.push(`${entry.slug}: katalog revizyonu frontmatter ile uyuşmuyor`);
      } else {
        if (revision) {
          entry.revisedAt = wantDate;
          entry.revisionNote = wantNote;
        } else {
          delete entry.revisedAt;
          delete entry.revisionNote;
        }
        catalogChanged = true;
        console.log(`yazıldı  revizyon     ${entry.slug}`);
      }
    }
  }

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
