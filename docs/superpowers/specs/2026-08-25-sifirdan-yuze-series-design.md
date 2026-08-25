# "Sıfırdan Yüze" — 100 Makalelik AI/LLM Serisi Tasarımı

Tarih: 2026-08-25 · Durum: Onaylı (kullanıcı talimatı: otonom ilerle, görevi bitirene kadar durma)

## Amaç

Mevcut 18 makalelik kütüphaneden bağımsız, sıfırdan ileri seviyeye giden 100 makalelik yeni bir
öğrenme serisi. Bu görevde: kalıcı kurallar sözleşmesi, 100 makalelik roadmap, seri altyapısı
(route + içerik sözleşmesi + görselleştirme mekanizması) ve **yalnızca ilk 5 makale** (Batch 0).

## Kararlar

### D1 — Seri kimliği
- Ad: **"Sıfırdan Yüze: Yapay Zekâ"**. Route: `/seri` (giriş/yol haritası) + `/seri/[slug]` (okuyucu).
- Ana sayfa dashboard'una seriye giden belirgin bir giriş kartı eklenir.

### D2 — İçerik sözleşmesi (mevcut mimariye paralel, bağımsız)
- `content/series/catalog.json` — seri kataloğu; `content/series/articles/<kategori>/<slug>.md` — makaleler;
  `content/series/assets/<slug>/*.svg` — diyagramlar; `content/series/roadmap.json` — 100 başlıklık omurga (UI için).
- Şema: mevcut `catalogArticleSchema`/`frontmatterSchema` ile aynı şekil; ayrı Zod modülü
  (`src/lib/content/series-schema.ts` gerekirse; mümkünse mevcut şemalar yeniden kullanılır, yalnızca yol öneki farklı).
- Kategori sözlüğü: mevcut 7 kategori yeniden kullanılır (etiketler ve tipler değişmez).
- `classificationBatch` = üretim batch'i (Batch 0 = makale 1–5, Batch 1 = 6–10 …). Mevcut batch
  invariantları (0'dan başlar, kesintisiz, iç içe geçmez) 5'li üretim ritmiyle birebir örtüşür.
- `articleId`: `article_<uuid>` — sync şemasıyla (≤100 karakter) uyumlu.

### D3 — Görselleştirme: tema-uyumlu inline SVG
- Diyagramlar elle yazılmış SVG dosyaları; renkler **CSS değişkenleri** (`var(--text)`, `var(--accent)`,
  `var(--cool)`, `var(--surface-muted)`, `var(--border)` …) ile — light/dark/sepia üçünde de doğru render.
- Markdown'da standart imge sözdizimi: `![alt](assets/dosya.svg "Şekil başlığı")`.
- Yeni rehype adımı `rehype-inline-svg`: `assets/` önekli `.svg` imgeleri `content/series/assets/<slug>/`
  altından okunur, `hast-util-from-html` ile parse edilip `<figure>` + `<figcaption>` içinde inline edilir.
  Güvenlik: yol koruması (dizin dışına çıkamaz), `script`/`foreignObject`/`on*` öznitelikleri düşürülür.
  Eksik asset = build hatası. Ham HTML düşürme davranışı (allowDangerousHtml yok) değişmez.
- `globals.css`'e `figure/figcaption/svg text` için prose kuralları eklenir.

### D4 — UI yeniden kullanımı
- `/seri/[slug]` mevcut `ReaderShell`'i kullanır. Bileşenlere geriye dönük uyumlu opsiyonel prop'lar:
  `basePath` (varsayılan `/read`), sidebar için `title/subtitle/homeHref`. Etkilenen dosyalar:
  `reader-shell.tsx`, `reader-sidebar.tsx`, `reading-list.tsx`, `mobile-reading-list.tsx`, `article-navigation.tsx`.
- `/seri` giriş sayfası: seri tanıtımı, ilerleme ve 100 başlıklık yol haritası (fazlara bölünmüş;
  yayında olanlar linkli, planlılar pasif). Progressive disclosure: okuyucu tüm yolculuğu görür.
- Dashboard (`/`): seri kartı (yayında/tamamlanan sayısı + devam linki); "Okumaya devam et" ve son
  okunanlar/işaretler seri makalelerini de tanır (href'ler seriye göre `/seri/...`).

### D5 — Sync
- `sync-service.validArticleIds()` ana katalog ∪ seri kataloğu olur (aksi halde seri ilerlemesi
  `unknown_article` ile reddedilir). Tek satırlık genişletme + test.

### D6 — Kalıcı dokümanlar (dosya konumları)
- `docs/seri/SOZLESME.md` — 100 makalenin tamamında geçerli değişmez kurallar sözleşmesi
  (editoryal, pedagojik, teknik, kaynak, görselleştirme, atıf, tekrar, prerequisite, handoff, 5+1 ritmi).
- `docs/seri/YOL-HARITASI.md` — 100 makalelik omurga + kalıcı öğrenme notları (prerequisite grafı,
  kavram-tekrar defteri, hangi makale hangi kavramı yeniden çağırır).
- `docs/seri/HANDOFF.md` — yaşayan devir dosyası: tamamlananlar, sıradaki batch, "next batch preparation" kaydı.
- `content/series/roadmap.json` — UI'nin okuduğu başlık/durum listesi (YOL-HARITASI ile senkron tutulur;
  senkron kuralı SOZLESME'de).

### D7 — Batch 0: İlk 5 makale (pedagojik zincir)
Okuyucu sıfırdan başlar; her makale bir sonrakini hazırlar (önce sezgi → mekanizma → teknik ayrıntı → akademik bağlam):
1. **Tahmin Makinesi: Yapay Zekâya İlk Bakış** — kural yazmak vs veriden öğrenmek; "model" kavramı;
   ML'nin tahmin çerçevesi; LLM'lere köprü. (foundations, beginner)
2. **Veriden Öğrenmek: Model, Parametre ve Kayıp** — parametre, kayıp fonksiyonu, gradyan inişi sezgisi,
   genelleme/aşırı öğrenme; küçük sayısal worked example. (foundations, beginner)
3. **Sinir Ağları: Katmanların İçinde Ne Oluyor?** — nörondan katmana, aktivasyon, derinlik ve temsil
   öğrenimi; backprop somut örnekle; tarihsel iniş-çıkışlar. (foundations, beginner)
4. **Dili Sayılara Çevirmek: Token ve Embedding** — tokenizasyon (BPE), dağılımsal anlambilim,
   vektör uzayında anlam; word2vec analojileri. (foundations, beginner)
5. **Sonraki Kelimeyi Tahmin Etmek: Dil Modelinin Doğuşu** — dil modelleme hedefi, n-gram → nöral DM,
   olasılık ve perplexity sezgisi; "sonraki token" paradigmasının kapasiteye dönüşümü; Batch 1'e
   (attention/Transformer) köprü. (foundations, beginner)

Her makale: 2–3 öğretici diyagram, "kendini yokla" (retrieval practice) kutuları, önceki makale
kavramlarına açık geri çağırma, sona "Kaynakça" (birincil kaynak linkleri; metin içinde yazar + önem bağlamı).

### D8 — Çalışma düzeni (ultracode)
- Araştırma/doğrulama/final-review subagent'ları **Opus 5**; taslak yazarları ana model (Fable) mirası.
- Workflow 1: makale başına akademik araştırma + pedagoji literatürü (arka planda).
- Workflow 2: 5 taslak yazarı (ayrıntılı brief + araştırma paketi + sözleşme ile; scratchpad'e yazar).
- Workflow 3: makale başına Opus fact-check + zincir tutarlılık incelemesi.
- Sentez, düzeltme, entegrasyon ve son kabul ana agent'ta (Fable).

### D9 — Doğrulama kapıları
`pnpm typecheck`, `pnpm test` (yeni birim testler dahil), `pnpm build`, dev server'da gerçek render:
`/`, `/seri`, `/seri/<ilk-makale>` + mevcut `/read/<örnek>` regresyonu; mobil/desktop; light/dark/sepia;
konsol hatası ve raw i18n anahtarı kontrolü. Bilinen önceden-bozuk kapılar (`pnpm lint`, `format:check`
main'de zaten kırmızı) benim değişikliklerimin başarısızlığı sayılmaz; yeni dosyalar temiz yazılır.

### Kapsam dışı
Commit/push (kullanıcı istemedikçe), mevcut 18 makalede değişiklik, e2e suite genişletmesi (mevcut
e2e bozulmamalı), roadmap'teki 6–100 makalelerinin yazımı.
