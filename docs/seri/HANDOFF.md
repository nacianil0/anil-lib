# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–14 yayında (kohort Batch 0 + Batch 1 + Batch 2) · Sıradaki: 15**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 14 — `egitim-verisi-toplama-temizlik-karisim-ve-tekrar` |
| Sıradaki güvenli başlangıç | Makale 15 ("Tokenizer'ın Gücü ve Tuzağı"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 3` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (YOL-HARITASI bağlayıcı karar #19) |

## Açık borçlar

- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir ve artık "durum" sütunu taşır. Batch 2'de 11–13 ve 14 vaatleri **ödendi**.
  Sıradaki run'ın doğrudan ödeyecekleri: 15 (tokenizer→yetenekler; 8 ve 14 iki kez söz verdi),
  16 (değerlendirme), 17 (halüsinasyon), 18 (bilgi parametrelerde). Batch 2'de **bir yeni
  koordinat** doğdu: 13 → 64 (ilkelere dayalı tercih etiketleri, ölçeklenebilir denetim).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan tek künye:** Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı (OpenReview doğrulama
  duvarı, DBLP yalnızca CoRR indeksler). Ayrıntı ve gerekçe: YOL-HARITASI bağlayıcı karar #21.
  Metindeki bulgu bundan etkilenmez; yalnızca künye satırı revize edilebilir.

## Next batch preparation — 15'ten devam

**Pedagojik hedefler.** Batch 2 sonunda okuyucu "karşımdaki asistan neden böyle davranıyor ve bu
davranış nereden geliyor" sorusuna cevap verebiliyor: post-training haritası, SFT'nin mekaniği,
tercih optimizasyonunun ekonomisi ve bütün bunları besleyen verinin nasıl kurulduğu. Sıradaki
yay, kurulan bu resmin **ölçülmesi ve sınırları** üzerinedir. 15 en alttaki birimi (token'ı)
sorgulayarak Faz 1'in kapanmamış tek borcunu öder; 16 "iyi model" iddiasının nasıl ölçüldüğünü
ilk kez ciddiye alır; 17 ve 18 modelin bildiği ve uydurduğu şeyin nerede durduğunu açar.

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 3 taslağı (15'ten devam)"
satırları geçerlidir (15 ← 4, 8, 14, 10, 7 · 16 ← 5, 9, 12, 11, 14 · 17 ← 10, 13, 11, 16 ·
18 ← 8, 14, 2, 12). Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- BPE, sözlük, Türkçenin 1,4–1,8 kat token maliyeti (4) → 15'te ölçülebilir sonuçlarıyla.
- Embedding tablosunun sözlük boyuyla ölçeklenmesi (7) → 15'te maliyet tarafı.
- Kesme kurallarının token üzerinde çalışması (10) → 15'te.
- Perplexity (5) ve "aynı eğri, iki cetvel" (9) → 16'da ölçme sorununun merkezi.
- Doğrulama kaybı ↔ insan tercihi ayrışması (12) → 16'da genelleştirilecek.
- Kirlilik (14) → 16'da değerlendirmeye etkisi, tam kurulum 72'de.
- Akıcılık ≠ doğruluk (10) ve ödülün memnuniyeti ölçmesi (13) → 17'de halüsinasyonun kökü.
- Ezber ölçümü (8) ve tekilleştirme ↔ ezber bağı (14) → 18'de.

**Araştırılacak güncel akademik alanlar (15 için öncelikli):** tokenizer'ın yeteneklere etkisi ve
diller arası maliyet eşitsizliği (Petrov ve ark. 2023 ve sonrası); harf sayma/ters çevirme gibi
karakter düzeyi görevlerin token düzeyinde neden zor olduğu; sayıların bölünme biçimi ile
aritmetik başarısı arasındaki ilişki (basamak bazlı tokenizasyon kararları); sözlük boyunun
ölçek yasalarındaki yeri; byte düzeyinde ve tokenizer'sız mimariler (BLT 2024 ve akrabaları)
**yalnızca teaser düzeyinde** — mimari tartışması 86'ya aittir. Türkçe örnekleri 4\. makalenin
ölçümüyle tutarlı olmalıdır. Aritmetik ve URL doğrulaması yazımdan **bağımsız** bir gözle
çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 15: aynı cümlenin farklı tokenizer'larda bölünmesi (4\. makale Şekil 2 ile görsel süreklilik);
  harf sayma görevinin token düzeyinde neden zor olduğu; dil başına token maliyeti karşılaştırması.
- 16: aynı modelin farklı benchmark'larda farklı sıralanması; ölçüm ile iddia arasındaki boşluk.
- 17: dağılımdan örneklemenin uydurmaya nasıl dönüştüğü; azaltma yollarının nereye müdahale ettiği.
- 18: bilginin parametrelere yazılması ile ezber arasındaki gerilimin görselleştirilmesi.

**Teknik plan.** Yeni makaleler `content/series/articles/models-and-training/` altına (15–18 için
kategori uygundur), catalog.json'a `classificationBatch: 3` ve `readingOrder` 15'ten kesintisiz
devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir; YOL-HARITASI
prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu kararları
güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki run
hazırlığıyla güncellenir.

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile
korunur. `next dev` açıkken `pnpm build` çalıştırılmaz. **Batch 2'de doğrulanan davranış:** dev
server yeni makale dosyalarını modül önbelleği yüzünden görmez ve `/seri/<yeni-slug>` 404 döner;
roadmap/katalog değişikliği ise anında yansır. Doğru sıra: dev server'ı durdur → `pnpm build`
(zorunlu kapı) → dev server'ı yeniden başlat → gerçek render doğrulaması.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; konsolda görülen tek hata sınıfı budur.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı (+rotalar, katalog, araçlar)
  aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. Üretim çok aşamalı
  araştırma → yazım → inceleme → düzeltme → doğrulama turlarıyla yürüdü; inceleme turu
  20 BLOCKER + ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
  Alınan bağlayıcı olgu kararları YOL-HARITASI §"Bağlayıcı olgu kararları"na taşındı.
- **Batch 2 (2026-08-29):** Makale 11–14, `models-and-training`, seri içindeki ilk `intermediate`
  kohortu. `BATCH=4+1` assignment'ıyla çalıştı. Üretim tek oturumda, yardımcı agent kullanmadan
  yürüdü: birincil kaynaklardan sayı çıkarma (InstructGPT Tablo 6 dâhil PDF üzerinden),
  yazım, kendi kendine eleştirel inceleme turu, düzeltme, entegrasyon ve doğrulama. İnceleme
  turunda yakalanan başlıca sorunlar: terim defteri ihlali ("geliştirme kümesi"), DPO'nun gövdede
  hiç açılmaması, `few-shot`/`zero-shot` yazımının 5\. makaleyle çelişmesi, bir şekil alt metninin
  şekille uyuşmaması, iki şekil başlığında ölçülmemiş "tepe" iddiası ve `tercih optimizasyonu`
  teriminin 11 ile 13 arasında farklı kapsamda kullanılması. Doğrulama kapılarının tamamı geçti:
  191 test, `pnpm build`, 40 rotanın tamamı 200, üç temada gerçek render, 12 diyagramın tamamı
  viewBox içinde, mobil/tablet/masaüstünde yatay taşma yok.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
