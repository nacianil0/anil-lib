# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-28 · Durum: **1–10 yayında (kohort Batch 0 + Batch 1) · Sıradaki: 11–15**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 10 — `metin-uretimi-ornekleme-sicaklik-ve-olasiliklar` |
| Sıradaki güvenli başlangıç | Makale 11 ("Ham Modelden Asistana"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 2` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; sync `validArticleIds` = ana ∪ seri |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |

## Açık borçlar

- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 2'nin doğrudan ödeyecekleri: 11–13 (post-training kurulumu), 14 (veri
  temizlik hattı), 15 (tokenizer→yetenekler).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivde (aşağıda); Batch 2 turunda fırsat buldukça ele
  alınabilir, hiçbir kapı bu arşive bağımlı değildir.

## Next batch preparation — Batch 2 (Makale 11–15)

**Pedagojik hedefler:** Okuyucu Batch 1 sonunda "GPT tarzı bir model nedir, nasıl eğitilir, nasıl
metin üretir" sorusuna uçtan uca cevap verebiliyor — ama elindeki şey hâlâ bir **metin
tamamlayıcı**. Batch 2 bu ham tahminciyi asistana dönüştüren aşamaları kurar: post-training haritası
→ SFT → tercihlerden öğrenme → eğitim verisinin kendisi → tokenizer'ın yeteneklere etkisi. Batch
sonunda okuyucu "karşımdaki asistan neden böyle davranıyor ve bu davranış nereden geliyor?"
sorusuna cevap verebilmeli.

**Makale planı ve prerequisite'ler:** YOL-HARITASI "Batch 2 taslağı (11–15)" satırları geçerlidir
(11 ← 8, 10, 5, 1 · 12 ← 11, 2, 8, 3 · 13 ← 12, 2, 10, 9 · 14 ← 8, 9, 2, 4 · 15 ← 4, 8, 10, 7).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Öğrenme döngüsü + kayıp (2) → 12'de (SFT aynı döngü, etiket insandan) ve 13'te (ödül ≈ ters kayıp).
- Öz-denetimli öğrenme (8) → 12'de karşıtıyla birlikte: etiket burada geri geliyor.
- Temel model (8) → 11'de açılış kavramı.
- Sıcaklık/örnekleme (10) → 13'te (tercih verisi çekilişle üretilir).
- Veri hunisi, tekilleştirme, veri karışımı (8) → 14'te tam kurulum.
- BPE, sözlük, Türkçenin 1,8 kat token maliyeti (4) → 15'te ölçülebilir sonuçlarıyla.
- Aşırı öğrenme (2) → 14'te (veri tekrarı) ve 12'de (küçük veriyle fine-tuning riski).

**Araştırılacak güncel akademik alanlar:** InstructGPT (Ouyang 2022) ve post-training aşamalarının
bugünkü hâli; SFT veri kalitesi tartışması (LIMA 2023 ve sonrası eleştirileri); RLHF (Christiano
2017, Stiennon 2020) → DPO (Rafailov 2023) → sonraki tercih optimizasyonu ailesi; Constitutional AI
ve RLAIF'in 13'te ne kadar anılacağı (ayrıntı 64'te); sentetik veri ve model çöküşü tartışması
(Shumailov 2024 ve karşı çalışmalar); veri lisansı/telif tartışması; tokenizer'ın yeteneklere etkisi
(harf sayma, aritmetik, eklemeli diller — Petrov 2023 ve sonrası), byte-level ve tokenizer'sız
modeller (BLT 2024) yalnızca teaser düzeyinde. Aritmetik ve URL doğrulaması yazımdan **bağımsız**
bir gözle çapraz denetlenir (Batch 1'de bu ayrım sekiz aritmetik hatası ve bir uydurma başlık
yakaladı); süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 11: ön eğitim → SFT → tercih optimizasyonu boru hattı; aynı modelin üç aşamadaki davranışı.
- 12: talimat-cevap çiftinin kayba dönüşmesi; hangi token'ların kayba girdiği (maskeleme geri döner).
- 13: tercih çifti → ödül modeli → politika güncellemesi döngüsü; DPO'nun bu döngüyü kısaltması.
- 14: veri hunisinin (8. makale Şekil 2) post-training sürümü; kalite ↔ miktar takası.
- 15: aynı cümlenin farklı tokenizer'larda bölünmesi (4. makale Şekil 2 ile görsel süreklilik);
  harf sayma görevinin token düzeyinde neden zor olduğu.

**Teknik plan:** Yeni makaleler `content/series/articles/` altına (kategori: 11–13 için
`models-and-training` uygun; 14–15 için de aynı kategori düşünülebilir — karar batch başında
YOL-HARITASI güncellenerek verilir), catalog.json'a `classificationBatch: 2` ve `readingOrder`
11–15 ile eklenir; roadmap.json'da 11–15 `yayinda` yapılır + slug eklenir; YOL-HARITASI prerequisite
grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu kararları güncellenir;
doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor + Batch 3 hazırlık kaydıyla
güncellenir.

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur (el yazımı YAML ayrıştırıcısı kaçırılmış tırnakları
çözemez); `catalog.json` 2 boşluklu `JSON.stringify` ile byte-identical round-trip yapar;
`roadmap.json`'un kompakt satır biçimi satır bazlı replace ile korunur. `next dev` açıkken
`pnpm build` çalıştırılmaz; içerik değişince dev server yeniden başlatılır (modül önbelleği).

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı (+rotalar, katalog, araçlar)
  aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. Üretim çok aşamalı
  araştırma → yazım → inceleme → düzeltme → doğrulama turlarıyla yürüdü; inceleme turu
  20 BLOCKER + ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
  Alınan bağlayıcı olgu kararları YOL-HARITASI §"Bağlayıcı olgu kararları"na taşındı.
  Doğrulama kapılarının tamamı geçti (167 test, build, üç temada görsel doğrulama; mevcut 18
  `/read` rotasında sıfır regresyon).
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir; genelleştirilmiş entegrasyon aracı
  repo içindedir (`tools/series/entegre-batch.cjs`).
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
