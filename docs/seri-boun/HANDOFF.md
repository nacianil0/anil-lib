# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–6 yayında (Batch 0: 1–3, Batch 1: 4–6) · Sıradaki: 7**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 6 — `sayma-kombinatorigin-temel-araclari` |
| Sıradaki güvenli başlangıç | Makale 7 ("Graflar ve Ağaçlar: Tanımlar ve İlk İspatlar"); run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 2` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 1'de ne yapıldı

1. **Makale 4–6 yayımlandı** (`classification_batch: 1`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. Faz A'nın matematiksel omurgası tamamlanmaya yaklaştı: tümevarım ve
   özyineleme (4), kümeler/fonksiyonlar/bağıntılar (5), sayma (6).
2. **Kaynaklar birincil metinden doğrulandı.** MIT 6.042J ders kitabının Bahar 2015 PDF'i indirilip
   içindekiler tablosu ve kullanılan teoremler doğrudan okundu; makalelerdeki bölüm numaraları,
   Teorem 2.3.1, Teorem 9.10.4, §5.1.6 ("A Faulty Induction Proof") ve §16.4 (Birthday Principle)
   sayfadan teyit edildi. CMPE220 katalog sayfası da yeniden çekildi, fark yok (ARASTIRMA §6).
3. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §6 sonunda liste hâlinde).
4. **Regresyon korundu**: `/read` 18 makale ve `/seri` 10 makale ile rotalar, id/slug/order/hash
   bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi. Build 38 → 41 statik sayfa.
   `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch yalnızca içerik ve dokümandır.
5. **Batch 0'ın ekran görüntüsü borcu kapatıldı** (aşağıda).

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (6 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer;
  bu yüzden canlı sync uçtan uca denenemedi. `validArticleIds` birleşimi kod düzeyinde doğrulandı.
  E2E'de `tests/e2e/reader-data.spec.ts` içindeki üç test bu nedenle başarısızdır.
- **`tests/e2e/reader.spec.ts:231` ("expands the real reading area…") kırık ve BOUN'la ilgisiz.**
  Okuma alanı grubuna `Ekstra Geniş` seçeneği eklendikten sonra
  `getByRole("button", { name: "Geniş" })` iki öğeye eşleşiyor ve Playwright strict-mode ihlali
  veriyor. Kapsam dışı olduğu için bu run'da dokunulmadı; düzeltme tek satır:
  seçiciye `exact: true` eklemek.
- **AI serisinde paralel bir oturum çalışıyor.** Bu run sırasında
  `content/series/articles/models-and-training/` altında izlenmeyen (untracked) yeni makale ve asset
  klasörleri belirdi ve AI kataloğuna henüz girmediler. BOUN kapsamı dışıdır, AI serisinin kendi
  devir zincirine aittir; bu run'da hiçbirine dokunulmadı. `pnpm build` yalnızca AI **kataloğunu**
  okuduğu için build etkilenmiyor, ama `pnpm test` sayısı ve `check-series-*` dosya sayıları o
  oturumun ilerlemesiyle değişir.
- `pnpm test:e2e` doğrudan çalışmıyor: Playwright'ın `webServer` komutu `pnpm exec next dev`
  kullanıyor ve PATH'teki global pnpm depodaki placeholder `pnpm-workspace.yaml`'ı reddediyor
  ("packages field missing or empty"). Çözüm: sunucuyu `corepack pnpm exec next dev -p 3100 -H
  127.0.0.1` ile elle başlatıp `PLAYWRIGHT_PORT=3100 corepack pnpm exec playwright test` çalıştırmak
  (config `reuseExistingServer` ile mevcut sunucuyu kullanır).

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 6 makale + 12 diyagram temiz, AI serisi temiz.
- `pnpm typecheck` temiz · `pnpm test` 188/188 · `pnpm build` 41 statik sayfa
  (18 `/read` + 10 `/seri` + 6 `/boun` + kalanlar). Test sayısı run boyunca 173 → 182 → 188 diye
  arttı: 182 bu batch'in altı yeni diyagramından, 188'e çıkışı ise **paralel çalışan başka bir
  oturumun AI serisine eklediği** diyagramlardan geliyor (`series-assets.test.ts` asset klasörünü
  gezer). BOUN kaynaklı değildir.
- Global article-id ve slug benzersizliği: 34/34 (18 ana + 10 AI + 6 BOUN).
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı. Her sayfada 2 inline SVG, doğru
  figcaption, yatay taşma yok (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined
  sızıntısı yok, tek console hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi
  kendi kabında yatayda kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Altı diyagramın
  hepsi light ve dark temada tek tek görsel olarak incelendi.
- Playwright: 21 geçti, 1 atlandı, 4 başarısız — dördü de yukarıdaki "önceden-var" listesinde ve
  BOUN içeriğiyle ilgisiz (üçü DATABASE_URL, biri `Ekstra Geniş` strict-mode ihlali).

## Sıradaki batch hazırlığı — Batch 2 (Makale 7'den itibaren)

**Pedagojik hedef:** Faz A'nın kapanışı ve Faz B'ye geçiş. Okuyucu 1–6'da iddiayı kesin söylemeyi,
tek seferde biten argüman kurmayı, sonsuz aileleri tümevarımla ispatlamayı, nesne dilini
(küme/fonksiyon/bağıntı) ve saymayı öğrendi. 7 bu araçları graf ve ağaç tanımlarına uygular
(el sıkışma lemması sayma, ağaç karakterizasyonları tümevarım ister), 8 cebirsel yapıları ve
Boolean cebirini kurar, 9 ile Faz B (CMPE250 ekseni) başlar.

**Prerequisite satırları (taslak; YOL-HARITASI'nda da var):**
- 7 ← 5 (bağıntı ve küme dili), 6 (derece toplamı için sayma), 4 (ağaç ispatlarında tümevarım)
- 8 ← 2 (Boolean bağlaçlar), 5 (bağıntı/kısmi sıra; kafes bir kısmi sıradır)
- 9 ← 6 (adım sayma: C(n,2), 2ⁿ, n!), 4 (özyinelemeli maliyet sezgisi)

**Araştırma ihtiyacı:** 7–9 için standart kaynaklar yeterlidir (Rosen 10–11 graf/ağaç ve 9–11
cebirsel yapılar; MIT 6.042J 9/11/12; CLRS giriş bölümleri 9 için). Resmî sayfalar 2026-08-29'da
doğrulandı; kapsamı etkileyen bir değişiklik görülmedikçe her run'da yeniden çekilmesi gerekmez,
ama makale 40–41 öncesinde tekrar doğrulanmalıdır.

**Yayımlanmış makalelerin verdiği sözler.** Makale 4–6 bilinçli olarak **numaralı ileri vaat
vermedi**; bütün ileri göndermeler konu adıyla yapıldı, dolayısıyla roadmap yeniden numaralanabilir
ama şu konular teslim edilmek zorundadır:

- **7'de karşılanmalı:** ağaç karakterizasyonlarının yapısal tümevarımla kurulması (4'ün sözü) ve
  el sıkışma lemmasının sayma refleksiyle ispatı (6'nın "Sırada ne var" bölümündeki sözü).
- **Konu bazlı, numarasız pinler:** hash tablosu = "ilerleyen fazda ayrı bir makale" (5, 6);
  topolojik sıralama = "graf dolaşmaları makalesi" (5); sayılabilirlik → durma problemi =
  "hesaplamanın sınırlarını konuştuğumuz makale" (5); alt sınır ispatı = "ilerideki faz" (6);
  doğum günü ilkesinin olasılık hâli = "destekleyici temeller fazı" (6).
- Roadmap'teki mevcut karşılıkları: 14 (hashing), 16 (BFS/DFS + topolojik sıralama), 25 (NP ve
  karar verilemezlik), 24 (alt sınırlar), 36 (olasılık).

**Görselleştirme öngörüsü:** 7: el sıkışma lemması (derece toplamı = 2·kenar) ve ağaç
karakterizasyonlarının denklik halkası; 8: Boolean cebiri ↔ küme cebiri ↔ mantık üçlü karşılığı ve
bir kafes/Hasse şeması; 9: büyüme sınıflarının karşılaştırma grafiği ve RAM modeli şeması.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı.)

**Sözlü checkpoint tohumları:** "El sıkışma lemmasını bir cümlede söyle ve neden tek dereceli
düğüm sayısının çift olduğunu açıkla"; "bir grafın ağaç olduğunu göstermenin üç denk yolunu say";
"Boolean cebiri ile küme cebiri arasındaki karşılığı bir örnekle anlat".

**Sonraki run'da hatırlanacak — araç sırası (Batch 1'de netleşti):** katalog ARTIK var olduğu için
`sync-series-hashes.cjs` yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
2) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
3) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
4) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
5) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 4. adımı yeniden çalıştır.
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır.

**Render doğrulaması için hazır yol:** Browser paneli bu ortamda görüntülenemediği için piksel
ekran görüntüsü `computer{action:"screenshot"}` ile alınamıyor. Çalışan yöntem: `corepack pnpm exec
next dev -p 3100 -H 127.0.0.1` (gate env'i **verilmeden** — dev'de kapı devre dışı kalır, giriş
gerekmez) + Playwright ile headless gezinme. Tema, `localStorage["anil-lib:reader-preferences:v1"]`
içine tam `preferencesSchema` nesnesi yazılarak seçilir (`anil-lib:theme` anahtarı sepia'yı
uygulamaz). Bu run'ın betikleri ve çıktıları gitignore'daki `artifacts/boun-render/` altındadır.

## Non-normative history

- **2026-08-29 (Batch 1, `BATCH=3+1`):** Makale 4–6 yayımlandı. Doğrulama: BOUN/AI içerik + SVG +
  hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 182/182,
  `pnpm build` 41 statik sayfa, global article-id benzersizliği 34/34, 27 render kombinasyonu ve
  6 diyagram ekran görüntüsüyle doğrulandı.
- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
  Doğrulama: BOUN/AI içerik + SVG + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck`
  temiz, `pnpm test` 173/173, `pnpm build` 38 statik sayfa (18 `/read` + 10 `/seri` + 3 `/boun`),
  global article-id benzersizliği 31/31, üç temada ve üç genişlikte gerçek render doğrulandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması
  (ARASTIRMA.md), 5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri
  oluşturuldu. Makale gövdesi yazılmadı (kurulum görevi üretim run'ı değildir).
