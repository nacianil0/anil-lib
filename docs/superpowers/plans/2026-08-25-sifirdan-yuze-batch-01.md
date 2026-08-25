# "Sıfırdan Yüze" Serisi — Altyapı + Batch 0 (Makale 1–5) Uygulama Planı

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans (inline yürütme).
> Araştırma/taslak/inceleme Workflow subagent'larına dağıtılır (araştırma+review = Opus 5).
> Kullanıcı kuralı: commit/push YOK (istenmedikçe) — bu plandaki hiçbir adım commit içermez.

**Goal:** `/seri` altında bağımsız, 100 makalelik "Sıfırdan Yüze: Yapay Zekâ" serisinin altyapısını kurmak ve ilk 5 makaleyi (Batch 0) tema-uyumlu SVG diyagramlarla yayına almak.

**Architecture:** Mevcut içerik sözleşmesine paralel ikinci bir katalog (`content/series/**`) + mevcut ReaderShell'in `basePath`/başlık prop'larıyla yeniden kullanımı + inline-SVG rehype adımı. Spec: `docs/superpowers/specs/2026-08-25-sifirdan-yuze-series-design.md`.

**Tech Stack:** Next 15 App Router, React 19, TS strict, Tailwind 3.4, unified/remark/rehype, `hast-util-from-html` (yeni bağımlılık), Zod, Vitest.

## Global Constraints

- Türkçe içerik ve UI; mevcut yazım/biçim diline uy (bkz. mevcut makaleler + `labels.ts`).
- Ham HTML markdown'da düşürülmeye devam eder (`allowDangerousHtml` eklenmez).
- Mevcut `/read`, `/` davranışında regresyon yok; tüm yeni prop'lar opsiyonel + varsayılanlı.
- `articleId` = `article_<uuid>` (sync şeması ≤100 char); seri kataloğunda batch invariantları korunur (Batch 0'dan başlar, kesintisiz).
- pnpm daima `corepack pnpm ...` ile çağrılır. `pnpm lint`/`format:check` main'de zaten kırmızı — yeni kod temiz yazılır ama bu kapılar başarı kriteri değil.
- Doğrulama: `corepack pnpm typecheck`, `corepack pnpm test`, `corepack pnpm build`, dev server'da gerçek render (mobil/desktop, light/dark/sepia).
- Kalıcı dokümanlar: `docs/seri/SOZLESME.md`, `docs/seri/YOL-HARITASI.md`, `docs/seri/HANDOFF.md`.

---

### Task 1: Araştırma workflow'unu başlat (arka plan, Opus 5)

- [ ] 5 makale konusu + pedagoji literatürü için 6 Opus araştırma agent'ı (WebSearch/WebFetch ile birincil kaynak: arXiv, hakemli dergi, resmi lab yayını; her iddiaya kaynak + tarih + hakemlik durumu). Çıktı: yapılandırılmış kaynak paketleri (scratchpad'e).
- [ ] Sonuçlar gelene kadar Task 2–6 ile devam et.

### Task 2: Kalıcı sözleşme dosyası — `docs/seri/SOZLESME.md`

- [ ] Editoryal, pedagojik (spaced repetition, retrieval practice, interleaving, scaffolding, cognitive load, worked examples, progressive disclosure — mekanik şablon yasağıyla), teknik, kaynak/atıf, görselleştirme, tekrar/prerequisite, 5+1 ritmi ve handoff miras kurallarını tek değişmez sözleşmede yaz. Araştırma pedagoji paketi gelince kaynakları işle.

### Task 3: 100 makalelik yol haritası

- [ ] `docs/seri/YOL-HARITASI.md`: 10 faz × 10 makale omurgası; her makale için 1 satır odak; Batch 0 için ayrıntılı öğrenme notları (kavramlar, prerequisite'ler, ileriye köprüler, tekrar defteri).
- [ ] `content/series/roadmap.json`: `{schemaVersion:1, seriesTitle, phases:[{id,title,description,articles:[{order,title,status:"yayinda"|"planlandi",slug?}]}]}` — Zod ile doğrulanacak (Task 5).

### Task 4: İçerik altyapısı — seri kataloğu + render

**Files:** Create `src/lib/content/series.ts`, `src/lib/content/series.test.ts`; Modify `src/lib/content/schema.ts` (yalnız gerekiyorsa; hedef: mevcut şemaları yeniden kullanmak).

- [ ] `series.ts`: `loadSeriesCatalog()` (yol öneki `content/series/articles/` olan paralel doğrulama — mevcut `validateCatalog`'un yol önekini parametreleştir veya seri kopyası), `getSeriesOrderedArticles()`, `getSeriesDescriptors()`, `getSeriesArticleBySlug()`, `getSeriesAdjacent()`, `renderSeriesArticleBySlug()` (articles.ts işlem hattı + `rehypeInlineSvg`).
- [ ] Test: geçerli katalog kabul, yanlış yol öneki ret, batch/readingOrder invariantları, bilinmeyen slug → null.

### Task 5: Roadmap yükleyici

**Files:** Create `src/lib/content/series-roadmap.ts`, `src/lib/content/series-roadmap.test.ts`.

- [ ] Zod şema + `loadSeriesRoadmap()`; invariant: `order` 1..100 kesintisiz, `status:"yayinda"` olan her kayıtta katalogda var olan `slug`.
- [ ] Test: geçerli kabul, kopuk sıra ret, yayinda-slug'sız ret.

### Task 6: Inline SVG rehype adımı

**Files:** Create `src/lib/content/rehype-inline-svg.ts`, `src/lib/content/rehype-inline-svg.test.ts`; `corepack pnpm add hast-util-from-html`.

- [ ] `img[src^="assets/"][src$=".svg"]` → `content/series/assets/<slug>/` altından oku (yol koruması), `fromHtml(...{fragment:true})` ile parse, `script`/`foreignObject` düşür + `on*` öznitelik temizle, `<figure class="series-figure"><svg …/><figcaption>{title}</figcaption></figure>` üret; `img` alt'ı svg `aria-label`/`role="img"` olarak taşınır. Eksik dosya → anlaşılır build hatası.
- [ ] Test: inline etme, sanitizasyon, caption, eksik asset hatası, `assets/` dışı src'nin dokunulmadan bırakılması.

### Task 7: UI — basePath/başlık prop'ları (geriye dönük uyumlu)

**Files:** Modify `reader-shell.tsx`, `reader-sidebar.tsx`, `reading-list.tsx`, `mobile-reading-list.tsx`, `article-navigation.tsx`.

- [ ] `basePath?: string = "/read"` linklerde; `ReaderSidebar`'a `title?/subtitle?/homeHref?`; ReaderShell yeni prop'ları geçirir. Mevcut testler (`reading-list.test.tsx` vb.) geçmeye devam etmeli.

### Task 8: Rotalar — `/seri` ve `/seri/[slug]`

**Files:** Create `src/app/seri/page.tsx`, `src/app/seri/[slug]/page.tsx`, `src/components/series/series-landing.tsx`.

- [ ] `[slug]`: `generateStaticParams` + `renderSeriesArticleBySlug` + ReaderShell (`basePath="/seri"`, seri başlığı, `homeHref="/seri"`).
- [ ] Landing: seri manifesti, canlı ilerleme (reader-data), fazlara bölünmüş 100 başlık (yayında → link, planlı → pasif), Batch 0 vurgusu; giriş `/`'e döner link.

### Task 9: Dashboard girişi + sync union

**Files:** Modify `src/components/dashboard/reader-dashboard.tsx`, `src/app/page.tsx`, `src/lib/reader-data/server/sync-service.ts` (+ test varsa güncelle).

- [ ] `page.tsx` seri descriptor'larını da verir; dashboard'da belirgin seri giriş kartı (yayında/tamamlanan sayaç + `/seri` CTA); `hrefFor(article)` seri id kümesine göre `/seri/`–`/read/` seçer; hero/son okunanlar seri makalelerini tanır.
- [ ] `validArticleIds()` = ana ∪ seri katalog id'leri.

### Task 10: CSS — figür stilleri

**Files:** Modify `src/app/globals.css`.

- [ ] `.prose-reader figure.series-figure` (kenarlık, arka plan `--surface`, padding, margin), `figcaption` (küçük, `--text-muted`), `figure svg { max-width:100%; height:auto }`, `svg text { font-family: sans }`. Paged modda `break-inside: avoid-column`.

### Task 11: Taslak yazımı workflow'u (araştırma paketleriyle)

- [ ] Her makale için ayrıntılı brief (yapı, zincir bağlantıları, diyagram planı, kaynak paketi, SOZLESME kuralları) → 5 yazar agent'ı (model mirası) makale .md + SVG'leri scratchpad'e yazar.
- [ ] Fable: her taslağı oku, düzelt, sesi ortakla; diyagramları gözden geçir.

### Task 12: İnceleme workflow'u (Opus 5)

- [ ] Makale başına: (a) adversarial fact-check (iddia ↔ kaynak), (b) zincir tutarlılığı (terminoloji, köprüler, tekrarlar, SOZLESME uyumu). Bulguları Fable çözer ve uygular.

### Task 13: Entegrasyon

- [ ] Nihai .md'ler → `content/series/articles/foundations/`; SVG'ler → `content/series/assets/<slug>/`; frontmatter (uuid, hash=sha256(body), batch 0, order 1–5) + `content/series/catalog.json`; `roadmap.json` durumları `yayinda`.

### Task 14: Doğrulama

- [ ] `corepack pnpm typecheck` → temiz; `corepack pnpm test` → tüm testler; `corepack pnpm build` → başarılı.
- [ ] Dev server: `/`, `/seri`, `/seri/[ilk]`…`[beşinci]`, `/read/[örnek]` gerçek render; mobil (375px) + desktop; light/dark/sepia; konsol hatasız; SVG'ler her temada okunaklı; prev/next, sidebar, TOC, ilerleme çalışıyor.

### Task 15: Handoff + hafıza

- [ ] `docs/seri/HANDOFF.md`: durum, tamamlanan 1–5, sıradaki batch 6–10, **next batch preparation** kaydı (pedagojik hedefler, prerequisite'ler, tekrar edilecek kavramlar, araştırılacak alanlar, görselleştirme ihtiyaçları), miras maddesi.
- [ ] `.wolf/anatomy.md` yeni dosyalar; `.wolf/memory.md` oturum kaydı; `.wolf/cerebrum.md` kararlar; gerekiyorsa `.wolf/buglog.json`.
- [ ] Son rapor: roadmap konumu, tamamlanan 1–5, temel akademik kaynaklar, sıradaki batch 6–10.
