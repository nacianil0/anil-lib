#!/usr/bin/env node
/**
 * Seri makaleleri için sözleşme denetimi (docs/seri/SOZLESME.md §2, §3, §5, §6).
 *
 * Kontroller:
 *  - Kaçırılmamış çapraz referans: "1. makalede" satır başında Markdown'da
 *    numaralı liste sanılır ve numara yutulur; "1\. makalede" yazılmalı.
 *  - Gövdede H1 yok; gövde H2 ile başlar.
 *  - "### Sırada ne var" ve "## Kaynakça" bölümleri var ve sonda.
 *  - Kelime sayısı 2.000–3.500.
 *  - En az 1 diyagram (şekil sayısı içerikten doğar; kota yoktur — SOZLESME §6); her
 *    diyagram kendi paragrafında, alt metni ve başlığı var.
 *  - Her şekil metinde "Şekil N" ile referanslanmış.
 *  - Geri çağırma kutuları blockquote içinde ve 1–3 adet (AI: "Kendini yokla",
 *    BOUN: "Sesli anlat" — docs/seri-boun/SOZLESME.md §3).
 *  - Ham HTML yok (pipeline zaten düşürür, sessiz kayıp olmasın).
 *  - Kalıp yasağı (SOZLESME §2): sabit benzetme kapanışı, ilan edilen dürüstlük ve
 *    kendini duyuran vurgu cümleleri düzyazıda geçmez (başlıklar hariç).
 *  - "N,0" ondalığından sonra ek "sıfır" okunuşuna göre gelir (18,0'a, 18,0'ın).
 *  - Üretim süreci dili (§ işareti, "vaat defteri", "terim defteri", "batch") okura sızmaz.
 *  - BOUN: "## Mülakatta nasıl görünür" bölümü "### Sırada ne var"dan önce durur ve
 *    içinde "İngilizce karşılıklar" satırı vardır (docs/seri-boun/SOZLESME.md §2).
 *  - Uyarı (hata değil): 200 kelimeden uzun şekil alt metni.
 *
 * Kullanım: node tools/series/check-series-content.cjs [--series=ai|boun] [klasör]
 */
const { readFileSync, readdirSync, statSync, existsSync } = require("node:fs");
const path = require("node:path");

/**
 * Seri profilleri: yalnızca serilerin sözleşmeleri arasında gerçekten farklı
 * olan kurallar burada ayrışır; yapısal denetimlerin tamamı ortaktır.
 */
const PROFILES = {
  ai: {
    articlesDir: "../../content/series/articles",
    minWords: 2000,
    maxWords: 3500,
    checkpointLabel: "Kendini yokla",
    interviewSection: false,
  },
  boun: {
    articlesDir: "../../content/series-boun/articles",
    minWords: 1800,
    maxWords: 3200,
    checkpointLabel: "Sesli anlat",
    interviewSection: true,
  },
};

const MIN_FIGURES = 1;
const ALT_WARN_WORDS = 200;

/**
 * Kalıplaşmış yazar tikleri (SOZLESME §2 kalıp yasağı). Her biri 2026-09-25 iki seri
 * denetiminde korpus boyunca tekrar ettiği için mekanik kapıya alındı; içerik (analojinin
 * sınırı, kaynağın sınırı) kalır, yalnızca kalıp cümle yasaktır. Başlık satırları denetlenmez.
 */
const FORBIDDEN_PHRASES = [
  [/[Bb]enzetmenin bozulduğu yer/, "sabit benzetme kapanışı"],
  [/biçimsel karşılığı (ise|da|şudur)/, "sabit benzetme kapanışı"],
  [/[Dd]ürüstlük notu/, "ilan edilen dürüstlük"],
  [/[Dd]ürüst olmak gerek/, "ilan edilen dürüstlük"],
  [/[Dd]ürüstçe söyle/, "ilan edilen dürüstlük"],
  [/\bCümle şu:/, "slogan girişi"],
  [/\b[Ee]n çarpıcı\b/, "kendini duyuran vurgu"],
  [/bu makalenin (en (önemli|ince|öğretici|pratik|çarpıcı|sık)|bütün (öncülü|mekanizması|gerekçesi|konusu|iddiası)|asıl (konusu|meselesi|sorunu|kalıcı))/, "kendini duyuran vurgu"],
  [/(^|[.!?]\s)Bedava\./, "tek kelimelik dramatik cümle"],
];

/** Okurun göremeyeceği üretim süreci dili. */
const PROCESS_LANGUAGE = [
  [/§/, "sözleşme bölüm işareti (§)"],
  [/\b(vaat|terim|kavram-tekrar) defteri/, "iç defter adı"],
  [/\bBu batch\b|\bbatch boyunca\b/i, "üretim kohortu dili"],
];

/** "18,0'e" değil "18,0'a": ek, sıfırın okunuşuna uyar. */
const DECIMAL_ZERO_SUFFIX =
  /\d,0'(e|ye|de|den|te|ten|i|in|ini|inin|inde|ü|ün|ünü|ünün|ünde|u|un|unu)(?![a-zçğıöşü])/;

const seriesArg = process.argv.find((a) => a.startsWith("--series="));
const seriesKey = seriesArg ? seriesArg.slice("--series=".length) : "ai";
const profile = PROFILES[seriesKey];
if (!profile) {
  console.error(`Bilinmeyen seri: ${seriesKey} (geçerli: ${Object.keys(PROFILES).join(", ")})`);
  process.exit(1);
}

const dirArg = process.argv.slice(2).find((a) => !a.startsWith("--"));
const ARTICLES_DIR = dirArg
  ? path.resolve(dirArg)
  : path.resolve(__dirname, profile.articlesDir);

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

function stripFrontmatter(text) {
  if (!text.startsWith("---")) return text;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return text;
  return text.slice(text.indexOf("\n", end + 1) + 1);
}

/**
 * Okuyucunun gördüğü düzyazı kelimelerini sayar. Markdown işaretlerini
 * (tablo boruları, bağlantı hedefleri, görsel sözdizimi, liste/başlık
 * işaretleri) dışarıda bırakır; ham `wc -w` bunları kelime sayar ve
 * tablolu makalelerde yanıltıcı biçimde şişer.
 */
function countProseWords(body) {
  const prose = body
    .replace(/^## Kaynakça[\s\S]*$/m, "") // kaynakça listesi düzyazı değil
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // görseller (alt metin + yol)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // bağlantılarda yalnızca metin kalsın
    .replace(/^\s*\|.*\|\s*$/gm, (row) => row.replace(/\|/g, " ")) // tablo boruları
    .replace(/^[-*+]\s+|^>\s*|^#{1,6}\s+/gm, "") // liste/alıntı/başlık işaretleri
    .replace(/[*_`]/g, "");
  return prose.split(/\s+/u).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function checkArticle(file) {
  const problems = [];
  const rel = path.relative(process.cwd(), file);
  const add = (msg) => problems.push(`${rel}: ${msg}`);

  const body = stripFrontmatter(readFileSync(file, "utf8")).trim();
  const lines = body.split("\n");

  // Çapraz referans tuzağı: "3. makalede" satır başında liste olur.
  lines.forEach((line, i) => {
    if (/^\d+\.\s+(makale|bölüm)/i.test(line)) {
      add(
        `satır ${i + 1}: çapraz referans kaçırılmamış — "${line.slice(0, 24)}…" Markdown'da numaralı liste olur ve numara yutulur. Nokta öncesine ters bölü koy: "${line.slice(0, line.indexOf("."))}\\."`,
      );
    }
  });

  if (/^# /m.test(body)) add("gövdede H1 var; başlık frontmatter'da durur, gövde H2 ile başlar");
  if (!lines[0].startsWith("## ")) add(`gövde H2 ile başlamalı (bulunan: "${lines[0].slice(0, 40)}")`);

  if (!body.includes("### Sırada ne var")) add('"### Sırada ne var" bölümü eksik');
  if (!body.includes("## Kaynakça")) add('"## Kaynakça" bölümü eksik');

  const nextIdx = body.indexOf("### Sırada ne var");
  const refIdx = body.indexOf("## Kaynakça");
  if (nextIdx !== -1 && refIdx !== -1 && nextIdx > refIdx) {
    add('"### Sırada ne var" bölümü "## Kaynakça" bölümünden önce gelmeli');
  }

  const words = countProseWords(body);
  if (words < profile.minWords || words > profile.maxWords) {
    add(
      `düzyazı kelime sayısı ${words} (hedef ${profile.minWords.toLocaleString("tr-TR")}–${profile.maxWords.toLocaleString("tr-TR")})`,
    );
  }

  // Diyagramlar
  const figures = [...body.matchAll(/!\[([^\]]*)\]\((assets\/[a-z0-9-]+\.svg)\s+"([^"]*)"\)/g)];
  const anyImages = [...body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)];
  if (figures.length < MIN_FIGURES) {
    add(`en az ${MIN_FIGURES} diyagram gerekli (bulunan: ${figures.length})`);
  }
  if (anyImages.length !== figures.length) {
    add(
      `başlıksız ya da biçimi hatalı görsel var: her diyagram ![alt](assets/ad.svg "Şekil N — başlık") biçiminde olmalı`,
    );
  }
  for (const [, alt, src, title] of figures) {
    if (!alt.trim()) add(`${src}: alt metin boş olamaz`);
    if (!/^Şekil \d+\s+—/.test(title)) add(`${src}: başlık "Şekil N — ..." biçiminde olmalı (bulunan: "${title}")`);
  }
  // Şekil numaraları 1'den kesintisiz artmalı ve metinde referanslanmalı.
  figures.forEach(([, , src, title], i) => {
    const num = Number((title.match(/^Şekil (\d+)/) || [])[1]);
    if (num !== i + 1) add(`${src}: şekil numarası ${num}, beklenen ${i + 1}`);
    if (!new RegExp(`Şekil ${i + 1}\\b`).test(body.replace(/!\[[^\]]*\]\([^)]*\)/g, ""))) {
      add(`Şekil ${i + 1} metinde referanslanmamış`);
    }
  });

  // Diyagram kendi paragrafında tek başına mı?
  lines.forEach((line, i) => {
    if (line.includes("](assets/") && !/^!\[[^\]]*\]\(assets\/[^)]*\)$/.test(line.trim())) {
      add(`satır ${i + 1}: diyagram kendi paragrafında tek başına durmalı`);
    }
  });

  // Geri çağırma / sözlü checkpoint kutuları
  const marker = `**${profile.checkpointLabel}:**`;
  const isCheckpointLine = (line) => {
    const trimmed = line.trim();
    return trimmed.startsWith(">") && trimmed.slice(1).trimStart().startsWith(marker);
  };
  const recalls = lines.filter(isCheckpointLine);
  const strayRecalls = lines.filter((l) => l.includes(marker) && !l.trim().startsWith(">"));
  if (recalls.length < 1 || recalls.length > 3) {
    add(`"${profile.checkpointLabel}" kutusu sayısı ${recalls.length} (1–3 olmalı)`);
  }
  for (const stray of strayRecalls) {
    add(`"${profile.checkpointLabel}" blockquote (>) içinde olmalı: "${stray.slice(0, 40)}…"`);
  }

  if (/<[a-z][a-z0-9]*(\s[^>]*)?>/i.test(body.replace(/`[^`]*`/g, ""))) {
    add("ham HTML var; pipeline bunu sessizce düşürür");
  }

  // Düzyazı: kaynakçadan önceki, başlık ve şekil satırı olmayan satırlar.
  const refStart = lines.findIndex((l) => l.startsWith("## Kaynakça"));
  const proseLines = (refStart === -1 ? lines : lines.slice(0, refStart))
    .map((text, i) => ({ text, n: i + 1 }))
    .filter(({ text }) => !/^#{1,6}\s/.test(text) && !text.trim().startsWith("!["));
  for (const { text, n } of proseLines) {
    for (const [re, what] of FORBIDDEN_PHRASES) {
      const m = text.match(re);
      if (m) add(`satır ${n}: kalıp yasağı (${what}) — "${m[0]}"`);
    }
    for (const [re, what] of PROCESS_LANGUAGE) {
      const m = text.match(re);
      if (m) add(`satır ${n}: okura sızan üretim dili (${what}) — "${m[0]}"`);
    }
    const dz = text.match(DECIMAL_ZERO_SUFFIX);
    if (dz) add(`satır ${n}: "${dz[0]}" — ",0" sıfır diye okunur, ek ona uyar (ör. 18,0'a, 18,0'ın)`);
  }

  if (profile.interviewSection) {
    const interviewIdx = lines.findIndex((l) => l.trim() === "## Mülakatta nasıl görünür");
    const nextLineIdx = lines.findIndex((l) => l.startsWith("### Sırada ne var"));
    if (interviewIdx === -1) {
      add('"## Mülakatta nasıl görünür" bölümü eksik');
    } else {
      if (nextLineIdx !== -1 && interviewIdx > nextLineIdx) {
        add('"## Mülakatta nasıl görünür" bölümü "### Sırada ne var"dan önce gelmeli');
      }
      const section = lines.slice(interviewIdx + 1, nextLineIdx === -1 ? undefined : nextLineIdx);
      // Standart biçim "İngilizce karşılıklar hazır olmalıdır: *…*"; tekrar listesi gibi
      // gerekçeli bir giriş cümlesiyle başlayan satır da kabul edilir (en az üç italik terim).
      const englishLine = (l) =>
        /İngilizce/.test(l) && (l.match(/\*[^*\s][^*]*\*/g) || []).length >= 3;
      if (!section.some(englishLine)) {
        add('"## Mülakatta nasıl görünür" bölümünde İngilizce karşılıklar satırı yok');
      }
    }
  }

  for (const [, alt, src] of figures) {
    const altWords = alt.split(/\s+/u).filter(Boolean).length;
    if (altWords > ALT_WARN_WORDS) {
      warnings.push(`${rel}: ${src} alt metni ${altWords} kelime (ileriye dönük hedef ≤ 120; bkz. SOZLESME §6)`);
    }
  }

  return problems;
}

const warnings = [];

const files = walkMarkdown(ARTICLES_DIR);
if (files.length === 0) {
  console.error(`Makale bulunamadı: ${ARTICLES_DIR}`);
  process.exit(1);
}

const all = files.flatMap(checkArticle);
console.log(`${files.length} makale denetlendi.`);
if (warnings.length > 0 && process.argv.includes("--warnings")) {
  console.log(`\n${warnings.length} uyarı (hata değil):`);
  for (const w of warnings) console.log("  ~ " + w);
  console.log("");
} else if (warnings.length > 0) {
  console.log(`${warnings.length} uyarı (ayrıntı için --warnings).`);
}
if (all.length === 0) {
  console.log("Sorun yok.");
} else {
  console.log(`\n${all.length} sorun:`);
  for (const p of all) console.log("  - " + p);
  process.exitCode = 1;
}
