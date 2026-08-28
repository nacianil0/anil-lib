# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–3 yayında (kohort Batch 0) · Sıradaki: 4**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 3 — `ispat-teknikleri-dogrudan-celiskiyle-karsi-ornekle` |
| Sıradaki güvenli başlangıç | Makale 4 ("Tümevarım ve Özyineleme: Aynı Fikrin İki Yüzü"); run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 1` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 0'da ne yapıldı

1. **Platform entegrasyonu kuruldu** (SOZLESME §5). AI serisinin içerik modülü
   `series-content.ts` fabrikasına çıkarıldı; `series.ts` ve yeni `series-boun.ts` aynı fabrikanın
   iki örneği. `schema.ts` seri başına kontrollü kategori sözlüğü alacak biçimde **additive**
   genişletildi; ana kütüphanenin ve AI serisinin sözlüğü değişmedi.
2. **Makale 1–3 yayımlandı**, her biri 2 diyagramla; resmî Boğaziçi sayfaları run içinde yeniden
   doğrulandı (ARASTIRMA §5).
3. **Regresyon korundu**: `/read` 18 makale ve `/seri` 10 makale ile rotaları, id/slug/order/hash
   bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor. Sözleşme yalnızca
  kullanıcının açık talebiyle değiştirilebildiği için bu run'da dokunulmadı. Aynı paragraftaki
  kategori sözlüğü önerisine üretimde `interview-method` eklendi (makale 1, 40 ve 41 diğer beş
  kategoriye girmiyor); nihai sözlük yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **Ekran görüntüsüyle görsel doğrulama yapılamadı.** Bu run'da tarayıcı paneli görüntülenemediği
  için piksel ekran görüntüsü alınamadı; render doğrulaması DOM + computed style üzerinden
  (üç tema, üç genişlik) yapıldı. Sonraki run panel açıksa ekran görüntüsü de almalı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer;
  bu yüzden canlı sync uçtan uca denenemedi. `validArticleIds` birleşimi kod düzeyinde doğrulandı.

## Sıradaki batch hazırlığı — Batch 1 (Makale 4'ten itibaren)

**Pedagojik hedef:** Faz A'nın ikinci yarısı. Okuyucu 1–3'te iddiayı kesin söylemeyi ve tek seferde
biten argümanlar kurmayı öğrendi; 4'ten itibaren **sonsuz aileler hakkındaki iddialar** geliyor
(tümevarım/özyineleme), ardından mülakatın nesne dili: kümeler, fonksiyonlar, bağıntılar (5),
sayma (6), graf ve ağaç tanımları (7), cebirsel yapılar ve Boolean cebiri (8).

**Prerequisite satırları (taslak):**
- 4 ← 3 (tümevarım bir ispat tekniğidir), 2 (niceleyiciler)
- 5 ← 2 (önerme/koşul dili), 3 (birebir/örten ispatları)
- 6 ← 5 (fonksiyon/küme dili)
- 7 ← 5 (bağıntı), 4 (ağaç ispatlarında tümevarım)
- 8 ← 2 (Boolean bağlaçlar), 5 (bağıntı/kısmi sıra)

**Araştırma ihtiyacı:** 4–8 için standart kaynaklar yeterlidir (Rosen + MIT 6.042J + CMPE220
katalog tanımı); makale başına derin literatür taraması gerekmez. Resmî sayfalar 2026-08-29'da
doğrulandı; kapsamı etkileyen bir değişiklik görülmedikçe her run'da yeniden çekilmesi gerekmez,
ama makale 40–41 öncesinde tekrar doğrulanmalıdır.

**Görselleştirme öngörüsü:** 4: tümevarım merdiveni ↔ özyineleme açılımı; 5: bağıntı türleri
karşılaştırma şeması; 6: güvercin yuvası ve binom üçgeni; 7: el sıkışma lemması ve ağaç
karakterizasyonları; 8: Boolean cebiri ↔ küme cebiri ↔ mantık üçlü karşılığı.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval 720 birim, metin ≥13 birim.)

**Sözlü checkpoint tohumları:** "Zayıf ve güçlü tümevarım arasındaki farkı bir cümlede söyle";
"denklik bağıntısının üç koşulunu ve bir sınır örneğini anlat"; "güvercin yuvası ilkesini bir
sistem tasarımı örneğiyle bağla".

**Sonraki run'da hatırlanacak:** `entegre-batch.cjs --series=boun --write` yeni makaleleri
frontmatter'dan katalog + roadmap'e taşır; öncesinde `sync-series-hashes.cjs --series=boun --write`
çalıştırılmalıdır. Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı
olmak zorundadır (araç bunu denetler).

## Non-normative history

- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
  Doğrulama: BOUN/AI içerik + SVG + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck`
  temiz, `pnpm test` 173/173, `pnpm build` 38 statik sayfa (18 `/read` + 10 `/seri` + 3 `/boun`),
  global article-id benzersizliği 31/31, üç temada ve üç genişlikte gerçek render doğrulandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması
  (ARASTIRMA.md), 5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri
  oluşturuldu. Makale gövdesi yazılmadı (kurulum görevi üretim run'ı değildir).
