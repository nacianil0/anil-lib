# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası. Yeni oturum SIRASIYLA şunları okur: (1) `docs/seri/SOZLESME.md`
> (değişmez kurallar — buna bağlılık zorunludur), (2) bu dosya, (3) aşağıdaki
> "Next batch preparation" kaydı, (4) `docs/seri/YOL-HARITASI.md` ilgili bölümleri.
> Sonra doğrudan sıradaki 5 makaleyi üretir.

Son güncelleme: 2026-08-27 · Durum: **Batch 0 (1–5) + Batch 1 (6–10) yayında · Sıradaki batch: 11–15 (Batch 2)**

## Miras maddesi (her handoff'ta aynen tekrarlanır)

Çalışma ritmi daima **5 makale + 1 hazırlık işi**dir: bir görevde yalnızca sıradaki 5 makale
yazılır; batch tamamlanıp doğrulandıktan sonra aynı görev içinde bir sonraki batch'in
"Next batch preparation" kaydı üretilir ama sonraki 5 makale yazılmaz. Zincirleme atıf yapısı
(giriş köprüsü, bilinçli geri çağırma, ileri köprü), SOZLESME'ye bağlılık ve bu miras maddesi
100. makaleye kadar her handoff'a aynen taşınır. Pedagojik kural: konu zinciri prerequisite
ilişkileriyle kurulur; önceki kavramlar sonraki makalelerde bilinçli geri çağrılır ve okuyucunun
unutmuş olabileceği varsayılarak kısa yeniden kurulumlarla yeniden kurulur; kanıta dayalı öğrenme
yaklaşımları (spacing, retrieval practice, scaffolding/fading, cognitive load, worked examples,
progressive disclosure) SOZLESME §3'teki sınır koşullarıyla uygulanır, mekanik şablona dönüştürülmez.

## Seri durumu

| Alan | Değer |
|---|---|
| Yayında | Makale 1–10 (Batch 0: `foundations`; Batch 1: `models-and-training`, hepsi `beginner`) |
| Sıradaki batch | Makale 11–15 (Batch 2) — bu oturumda YAZILMADI (kural gereği) |
| Roadmap | `docs/seri/YOL-HARITASI.md` (pedagojik) + `content/series/roadmap.json` (UI) |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref` prop'ları; dashboard seri kartı; sync `validArticleIds` = ana ∪ seri |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, **`sync-series-hashes.cjs`** (Batch 1'de eklendi) |

## Tamamlanan makaleler

**Batch 0 (`foundations`)**

| # | Slug | Odak |
|---|---|---|
| 1 | `tahmin-makinesi-yapay-zekaya-ilk-bakis` | Kural vs veri; model = ayarlanabilir fonksiyon; AI⊃ML⊃temsil öğrenimi⊃DL hiyerarşisi |
| 2 | `veriden-ogrenmek-model-parametre-ve-kayip` | Parametre, kayıp, gradyan inişi (sayısal örnek), genelleme/aşırı öğrenme, öğrenme döngüsü |
| 3 | `sinir-aglari-katmanlarin-icinde-ne-oluyor` | Nöron, aktivasyon, katmanlar, temsil öğrenimi, backprop sezgisi, tarih şeridi |
| 4 | `dili-sayilara-cevirmek-token-ve-embedding` | Token/BPE, embedding, dağılımsal hipotez, anlam geometrisi, statik vektörün sınırı |
| 5 | `sonraki-kelimeyi-tahmin-etmek-dil-modelinin-dogusu` | Dil modelleme hedefi, n-gram duvarı, Bengio 2003, perplexity, ölçek teaser'ı |

**Batch 1 (`models-and-training`)**

| # | Slug | Odak |
|---|---|---|
| 6 | `dikkat-mekanizmasi-baglami-tartmayi-ogrenmek` | Sabit vektör darboğazı, sorgu/anahtar/değer, elle softmax hesabı, maskeleme, dikkat ≠ açıklama |
| 7 | `transformer-modern-dil-modellerinin-mimarisi` | Blok anatomisi, çok başlı dikkat, pozisyon kodlaması, paralellik, **logit → softmax → dağılım halkası** |
| 8 | `on-egitim-internet-olceginde-sonraki-token` | Öz-denetimli hedef, veri hunisi, 6ND, doksan bin yıllık okuma, koşunun anatomisi |
| 9 | `olcek-yasalari-daha-buyuk-neden-daha-iyi` | Güç yasası, Kaplan → Chinchilla düzeltmesi, replikasyon, veri duvarı, çift iniş, emergence |
| 10 | `metin-uretimi-ornekleme-sicaklik-ve-olasiliklar` | Otoregresif döngü, sıcaklık, top-k/çekirdek örnekleme, belirlenimcilik, halüsinasyon teaser'ı |

## Önemli editoryal/teknik kararlar

- Kategori sözlüğü ve katalog şeması ana kütüphaneyle ortak; seri ayrı katalog + ayrı rota kullanır.
- `classification_batch` = üretim batch'i (Batch 0 = 1–5, Batch 1 = 6–10 …); `reading_order` seri
  içinde kesintisiz.
- Diyagramlar elle yazılmış SVG; renk YALNIZCA CSS değişkeni (light/dark/sepia uyumu); markdown'da
  `![alt](assets/x.svg "Şekil N — başlık")`; pipeline inline eder (`rehype-inline-svg`).
  **Marker id'leri sayfa genelinde benzersiz olmalı** — pipeline id'leri yeniden yazmaz.
- content_hash = gövdenin (frontmatter sonrası, trim) UTF-8 SHA-256'sı. Batch 1'de bunu hesaplayan
  ve katalog ↔ frontmatter eşitliğini denetleyen kalıcı araç eklendi:
  `node tools/series/sync-series-hashes.cjs [--write]`. Build yalnızca katalog↔frontmatter eşitliğini
  denetler; hash'in gövdeyle gerçekten uyuştuğunu denetleyen tek yer bu script'tir.
- Samuel'in "without being explicitly programmed" alıntısı kaynaklarda yok — seri boyunca KULLANMA.
- Araştırma/yazım/inceleme Workflow subagent'larıyla; araştırma + inceleme Opus sınıfı modelde;
  sentez ve son kabul ana agent'ta. Rutin şema/biçim kontrolleri Sonnet'e verilebilir.

### Batch 1'de alınan bağlayıcı olgu kararları

1. **GPT-2 boyutları** OpenAI model kartı serisiyle verilir: 124 / 355 / 774 milyon ve **1,5 milyar**.
   Makalenin kendi tablosu 117/345/762/1542 der; model kartında **"1558" dizisi geçmez**.
2. **"Artık bağlantı sönen gradyanı çözer" YAZILAMAZ.** He ve ark. (CVPR 2016) bunu açıkça reddeder;
   çözülen şey **bozulma** (eğitilebilirlik) sorunudur.
3. **Öz-dikkat girdisinin doğrusal fonksiyonu değildir** — ağırlıklar softmax üzerinden girdiye bağlı.
   "Ağırlıklı ortalama" yalnızca ağırlıklar sabitken, değerlere göre doğrusallık demektir.
4. **Kaplan tahsisi** (5,76×10²³ FLOP): N = 1,3×10⁹ · C^0,73 → **800 milyar parametre**,
   D = C/(6N) → **~120 milyar token**, **0,15 token/parametre**. Kayıp L = 2,051 vs Chinchilla 1,937
   (fark 0,114 nat/token). Kaplan'ın ayrı veri fiti aynı bütçede ~216 milyar verir ve 6ND ile
   uyuşmaz (çarpan 1,8) — bu, "yasa değil, uydurulmuş eğri" tezinin kanıtı olarak metinde durur.
5. **Llama 3 = 15,6 trilyon token** (bütün seride aynı sayı; token/parametre 38,5).
6. Hakemsiz kaynaklar metinde işaretlenir: Kaplan 2020, Besiroglu 2024, Epoch AI, Llama 3 raporu,
   Ba ve ark. 2016, Keskar ve ark. 2019, Thinking Machines blogu, Kalai ve ark. 2025.
7. **Snell ve ark.** künyesi ICLR 2025 sürümüne göredir ("…than Scaling Parameters for Reasoning");
   arXiv v1 başlığı farklıdır ("…than Scaling Model Parameters"). Yayın yeri ICLR olduğu için
   başlık da ICLR sürümündendir.
8. `logit` terimi **7. makalede** kurulur; 10. makale geri bağ verir.
9. Oran ve farklar her zaman tam değerlerden hesaplanır, sonra yuvarlanır.
10. Yayımlanmış 1–5. makalelerde düzeltme gerektiren bulgu **çıkmadı**; onlara dokunulmadı.

## Üretim ve inceleme turu (Batch 1)

Akış: 6 araştırma ajanı → 3 çapraz denetim ajanı (URL / aritmetik / çelişki) → 5 yazar (sıralı) →
5 diyagram ajanı → **12 inceleme ajanı** → 7 düzeltme ajanı → **6 son doğrulama ajanı**.

İnceleme turu **20 BLOCKER + ~40 MAJOR** buldu. En ağırları:

- Makale 9'un Kaplan tahsisi tamamen yanlıştı (N ile D fiilen yer değiştirmişti) ve makalenin tezini
  tersine çeviriyordu. Ana agent birincil kaynaktan yeniden hesapladı; tablo, kayıp hesabı ve
  `sabit-butce-tahsisleri.svg` (log eksenlerde konum dahil) yeniden üretildi.
- Makale 7'de "dikkat doğrusaldır" hatası; ayrıca **hiçbir makalede kurulmayan** mimari → logit →
  dağılım halkası eklendi (10. makale bunu kurulmuş varsayıyordu).
- Makale 10'da iki yazar adı baş harflerden **uydurulmuştu** (Adam Tauman Kalai, Minh Nhat Nguyen).
- Makale 8'de altı olgu/aritmetik hatası (6ND türetmesi, T5 eşikleri, Dolma oranı, MFU aralığı).

**Ana agent'ın doğrudan düzelttikleri (ajanların yanıldığı yerler):** GPT-2 "1558" değeri benim
çapraz denetim dosyamdan gelmişti ve birincil kaynakta yoktu; makale 6'daki `0,691 × 2 = 1,383`
çarpımı; Snell künyesinde bir düzeltme ajanının haklı bulguyu reddetmesi; kendi doğrulama
dosyamdaki `0,253` yuvarlama hatası (doğrusu 0,254).

**Ders (cerebrum'a işlendi):** Bir yazar ajanı çalışırken onun dosyasını düzeltme — ajan dosyayı
yazdıktan sonra cilalamaya devam eder ve düzeltmeyi sessizce üzerine yazar. Önce journal'da o
ajanın `"type":"result"` satırını gör.

## Doğrulama durumu (Batch 1) — tamamlandı

| Kapı | Sonuç |
|---|---|
| `node tools/series/check-series-content.cjs` | ✓ 10 makale, sorun yok |
| `node tools/series/check-series-svg.cjs` | ✓ 29 diyagram, sorun yok |
| `node tools/series/sync-series-hashes.cjs` | ✓ 10 makale, katalog ↔ frontmatter ↔ gövde eşit |
| `corepack pnpm typecheck` | ✓ temiz |
| `corepack pnpm test` | ✓ 167 test / 18 dosya (29 diyagramın gerçek render testi dahil) |
| `corepack pnpm build` | ✓ `/seri` + 10 seri makalesi + mevcut 18 `/read` rotası |
| Görsel doğrulama (dev server) | ✓ `/seri`, 10 makale; mobil 375px + desktop; light/dark/sepia |

**Regresyon:** mevcut kütüphane etkilenmedi — `/read/[slug]` 18 rota, sıfır seri sızıntısı.

**Bilinen önceden-var sorunlar (batch kapısı DEĞİL):** `pnpm lint` ve `pnpm format:check` main'de
zaten kırmızı. Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama
çevrimdışı moduna düşer — beklenen davranış.

**Kapsam dışı bırakılan bulgular:** Son doğrulama turunda kalan ~29 MINOR (terim hijyeni, alt
metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için uygulanmadı. Tam listeleri
`D:\dev\anil-lib-seri-batch1-state\review\` altındaki raporlarda, her biri birebir alıntı ve
önerilen düzeltmeyle duruyor; Batch 2 turunda fırsat buldukça ele alınabilir.

## Next batch preparation — Batch 2 (Makale 11–15)

**Pedagojik hedefler:** Okuyucu Batch 1 sonunda "GPT tarzı bir model nedir, nasıl eğitilir, nasıl
metin üretir" sorusuna uçtan uca cevap verebiliyor — ama elindeki şey hâlâ bir **metin
tamamlayıcı**. Batch 2 bu ham tahminciyi asistana dönüştüren aşamaları kurar: post-training haritası
→ SFT → tercihlerden öğrenme → eğitim verisinin kendisi → tokenizer'ın yeteneklere etkisi. Batch
sonunda okuyucu "karşımdaki asistan neden böyle davranıyor ve bu davranış nereden geliyor?"
sorusuna cevap verebilmeli.

**Makale planı ve prerequisite'ler:**
- 11 "Ham Modelden Asistana: Post-Training Haritası" ← 8 (temel model), 10 (en olası devam bir cevap
  değil), 5 ("2020'nin GPT-3'ü bir sohbet asistanı değildi"), 1 (ek eğitim aşamaları sözü).
- 12 "Talimatla Eğitim: Supervised Fine-Tuning" ← 11, 2 (aynı döngü), 8 (öz-denetimlinin karşıtı —
  etiket burada geri geliyor), 3 (geriye yayılım).
- 13 "İnsan Tercihlerinden Öğrenmek: RLHF ve Ötesi" ← 12, 2 (kayıp ↔ ödül simetrisi), 10 (tercih
  verisi örneklemeyle üretilir), 9 (bütçe muhasebesi).
- 14 "Eğitim Verisi: Toplama, Temizlik, Karışım ve Tekrar" ← 8 (**açık borç**: "ayrıntısı 14'te"),
  9 (veri duvarı, epok tekrarı), 2 (aşırı öğrenme), 4 (derlem).
- 15 "Tokenizer'ın Gücü ve Tuzağı" ← 4 (BPE, Türkçenin token maliyeti), 8 (**açık borç**),
  10 (kesme kuralları token üzerinde çalışır), 7 (embedding tablosu sözlük boyuyla ölçeklenir).

**Batch 1'in açtığı ve Batch 2'nin ödemesi gereken borçlar (metinde açıkça söz verildi):**

| Borç | Nerede verildi | Ödeyecek |
|---|---|---|
| "Temizlik hattının ayrıntısı 14. makalenin konusu" | 8 | 14 |
| "Bu farkın yeteneklere yansıması 15\. makalenin konusu" | 8 | 15 |
| "böyle bir aşamayı 11–13. makalelerde kuracağız" | 7 | 11–13 |
| "O ikinci yarı 11–13. makalelerin konusu" | 8 | 11–13 |
| "Sonraki token tahmincisi ile karşındaki asistan arasındaki fark…" | 10 (Sırada ne var) | 11 |
| "bu gerilim 18. ve 72. makalelerin konusu olacak" (ezber vs genelleme) | 8 | 18, 72 |
| "değerlendirme kümelerinin neyi ölçtüğünü 16. makalede" | 9 | 16 |
| "ciddiyetiyle 17. makalede ele alacağız" (halüsinasyon) | 10 | 17 |

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
modeller (BLT 2024) yalnızca teaser düzeyinde. Her batch'te olduğu gibi paralel Opus araştırma
ajanı + doğrulanmış kaynak paketleri üret; ardından **aritmetik ve URL çapraz denetimini ayrı
ajanlara ver** (Batch 1'de bu, sekiz aritmetik hatası ve bir uydurma başlık yakaladı).

**Görselleştirme ihtiyaçları (öngörü):**
- 11: ön eğitim → SFT → tercih optimizasyonu boru hattı; aynı modelin üç aşamadaki davranışı.
- 12: talimat-cevap çiftinin kayba dönüşmesi; hangi token'ların kayba girdiği (maskeleme geri döner).
- 13: tercih çifti → ödül modeli → politika güncellemesi döngüsü; DPO'nun bu döngüyü kısaltması.
- 14: veri hunisinin (8. makale Şekil 2) post-training sürümü; kalite ↔ miktar takası.
- 15: aynı cümlenin farklı tokenizer'larda bölünmesi (4. makale Şekil 2 ile görsel süreklilik);
  harf sayma görevinin token düzeyinde neden zor olduğu.

**Teknik hatırlatmalar:** Yeni makaleler `content/series/articles/` altına (kategori: 11–13 için
`models-and-training` uygun; 14–15 için de aynı kategori düşünülebilir — karar batch başında
YOL-HARITASI güncellenerek verilir), catalog.json'a `classificationBatch: 2` ve `readingOrder`
11–15 ile eklenir; roadmap.json'da 11–15 `yayinda` yapılır + slug eklenir; YOL-HARITASI prerequisite
grafı, kavram-tekrar defteri ve terim defteri güncellenir; doğrulama kapıları çalıştırılır; bu dosya
yeni handoff + Batch 3 (16–20) hazırlık kaydıyla güncellenir.

**Entegrasyon sırası (Batch 1'de doğrulandı, aynen tekrar edilebilir):**
```
node <state>\entegre.cjs            # kuru çalışma
node <state>\entegre.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
`entegre.cjs` frontmatter'ı **gray-matter ile** okur (el yazımı YAML ayrıştırıcısı kaçırılmış
tırnakları çözemez ve katalog başlığına ters bölü sızdırır); `catalog.json` 2 boşluklu
`JSON.stringify` ile byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi
satır bazlı replace ile korunur. Batch 1'in bütün üretim kayıtları (araştırma paketleri, 18 inceleme
raporu, workflow script'leri) `D:\dev\anil-lib-seri-batch1-state\` altında durur.
