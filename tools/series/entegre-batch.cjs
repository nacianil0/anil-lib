#!/usr/bin/env node
/**
 * Seri batch entegrasyonu (batch-bağımsız): katalogda henüz bulunmayan seri makalelerinin
 * frontmatter'ından katalog kaydı üretir, content/series/catalog.json'a ekler ve
 * content/series/roadmap.json'daki ilgili kayıtları "yayinda" yapar. Idempotent: yeni
 * makale yoksa yalnızca katalog ↔ roadmap tutarlılığını denetler.
 *
 * Sözleşme (docs/seri/SOZLESME.md §1, §7, §8):
 *  - reading_order mevcut katalogun son sırasından kesintisiz devam eder;
 *  - yeni setin tamamı aynı classification_batch'i (mevcut en büyük + 1) taşır;
 *  - roadmap başlığı frontmatter başlığıyla birebir eşleşir;
 *  - catalog.json 2 boşluklu JSON.stringify ile, roadmap.json satır bazlı replace ile yazılır.
 *
 * Kullanım: node tools/series/entegre-batch.cjs                  (kuru çalışma, denetim)
 *           node tools/series/entegre-batch.cjs --write          (yaz)
 *           node tools/series/entegre-batch.cjs --series=boun    (BOUN serisi)
 *
 * Katalog henüz yoksa (bir serinin ilk üretim run'ı) boş bir katalogdan başlanır:
 * ilk set reading_order 1'den ve classification_batch 0'dan devam etmek zorundadır.
 */
const { existsSync, readFileSync, writeFileSync, readdirSync, statSync } = require("node:fs");
const path = require("node:path");

// Frontmatter, uygulamanın kullandığı ayrıştırıcıyla okunur (gray-matter). El yapımı bir
// ayrıştırıcı YAML'ın kaçırılmış tırnaklarını çözemez ve katalog başlığına ters bölü sızdırır.
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
const ARTICLES_DIR = path.join(ROOT, "content", seriesDir, "articles");
const CATALOG = path.join(ROOT, "content", seriesDir, "catalog.json");
const ROADMAP = path.join(ROOT, "content", seriesDir, "roadmap.json");
const WRITE = process.argv.includes("--write");

function walkMarkdown(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

const catalog = existsSync(CATALOG)
  ? JSON.parse(readFileSync(CATALOG, "utf8"))
  : {
      schemaVersion: 2,
      classificationVersion: 1,
      generatedAt: new Date().toISOString(),
      articles: [],
    };
const roadmap = JSON.parse(readFileSync(ROADMAP, "utf8"));
const problems = [];

const catalogBySlug = new Map(catalog.articles.map((a) => [a.slug, a]));
const maxOrder = Math.max(0, ...catalog.articles.map((a) => a.readingOrder));
const maxBatch = Math.max(-1, ...catalog.articles.map((a) => a.classificationBatch));
const roadmapByOrder = new Map(
  roadmap.phases.flatMap((phase) => phase.articles).map((item) => [item.order, item]),
);

// 1) Yeni makaleleri keşfet (katalogda slug'ı olmayan dosyalar).
const entries = [];
for (const abs of walkMarkdown(ARTICLES_DIR)) {
  const slug = path.basename(abs, ".md");
  const fm = matter(readFileSync(abs, "utf8")).data;
  const rel = path.relative(ROOT, abs).split(path.sep).join("/");

  if (catalogBySlug.has(slug)) {
    // Mevcut kayıt: roadmap başlık/slug tutarlılığını denetle, dokunma.
    const existing = catalogBySlug.get(slug);
    const row = roadmapByOrder.get(existing.readingOrder);
    if (!row) problems.push(`${slug}: roadmap'te ${existing.readingOrder}. sıra yok`);
    else {
      if (row.title !== existing.title)
        problems.push(`roadmap ${existing.readingOrder}: başlık "${row.title}" ≠ katalog "${existing.title}"`);
      if (row.status !== "yayinda" || row.slug !== slug)
        problems.push(`roadmap ${existing.readingOrder}: "yayinda"/slug bekleniyordu (${slug})`);
    }
    continue;
  }

  for (const field of ["article_id", "title", "slug", "category", "level", "reading_order", "summary", "content_hash", "classification_version", "classification_batch"]) {
    if (fm[field] === undefined) problems.push(`${slug}: frontmatter '${field}' eksik`);
  }
  if (fm.slug !== slug) problems.push(`${slug}: frontmatter slug '${fm.slug}' dosya adıyla uyuşmuyor`);
  if (path.basename(path.dirname(abs)) !== fm.category)
    problems.push(`${slug}: dosya '${path.basename(path.dirname(abs))}' klasöründe ama category '${fm.category}'`);
  if (!Array.isArray(fm.tags) || fm.tags.length === 0) problems.push(`${slug}: tags eksik`);

  entries.push({
    articleId: fm.article_id,
    title: fm.title,
    slug: fm.slug,
    category: fm.category,
    level: fm.level,
    readingOrder: fm.reading_order,
    summary: fm.summary,
    tags: fm.tags,
    contentHash: fm.content_hash,
    path: rel,
    relatedArticleIds: [],
    classificationBatch: fm.classification_batch,
  });
}

entries.sort((a, b) => a.readingOrder - b.readingOrder);

// 2) Yeni setin sözleşme denetimi: kesintisiz sıra + tek yeni kohort.
entries.forEach((e, i) => {
  const expected = maxOrder + 1 + i;
  if (e.readingOrder !== expected)
    problems.push(`${e.slug}: reading_order ${e.readingOrder}, beklenen ${expected} (kesintisiz devam)`);
  if (e.classificationBatch !== maxBatch + 1)
    problems.push(`${e.slug}: classification_batch ${e.classificationBatch}, beklenen ${maxBatch + 1}`);
  const row = roadmapByOrder.get(e.readingOrder);
  if (!row) problems.push(`${e.slug}: roadmap'te ${e.readingOrder}. sıra yok`);
  else if (row.title !== e.title)
    problems.push(`roadmap ${e.readingOrder}: başlık "${row.title}" ≠ frontmatter "${e.title}"`);
});

// 3) Katalog güncellemesi (bellekte).
for (const e of entries) catalogBySlug.set(e.slug, e);
catalog.articles = [...catalogBySlug.values()].sort((a, b) => a.readingOrder - b.readingOrder);

// 4) Roadmap güncellemesi: kompakt satır biçimi satır bazlı replace ile korunur.
let roadmapText = readFileSync(ROADMAP, "utf8");
let roadmapChanges = 0;
for (const e of entries) {
  const lineRe = new RegExp(`^(\\s*)\\{ "order": ${e.readingOrder},.*$`, "m");
  const match = roadmapText.match(lineRe);
  if (!match) {
    problems.push(`roadmap ${e.readingOrder}: kompakt satır bulunamadı`);
    continue;
  }
  const replacement =
    `${match[1]}{ "order": ${e.readingOrder}, "title": ${JSON.stringify(e.title)},` +
    ` "status": "yayinda", "slug": ${JSON.stringify(e.slug)} }` +
    (match[0].trimEnd().endsWith(",") ? "," : "");
  if (match[0] !== replacement) {
    roadmapText = roadmapText.replace(lineRe, () => replacement);
    roadmapChanges++;
  }
}

console.log(`Katalogda ${catalogBySlug.size - entries.length} mevcut, ${entries.length} yeni makale.`);
console.log(`roadmap: ${roadmapChanges} satır değişecek.`);
if (problems.length) {
  console.log(`\n${problems.length} sorun:`);
  for (const p of problems) console.log("  - " + p);
  process.exitCode = 1;
}

if (WRITE) {
  if (problems.length) {
    console.log("\nSorunlar var; YAZILMADI.");
  } else if (entries.length === 0) {
    console.log("\nYeni makale yok; yazılacak bir şey yok.");
  } else {
    writeFileSync(CATALOG, JSON.stringify(catalog, null, 2) + "\n", "utf8");
    writeFileSync(ROADMAP, roadmapText, "utf8");
    JSON.parse(readFileSync(ROADMAP, "utf8")); // yazdıktan sonra JSON geçerliliğini doğrula
    console.log("\ncatalog.json ve roadmap.json yazıldı.");
  }
} else {
  console.log("\n(kuru çalışma — yazmak için --write)");
}
