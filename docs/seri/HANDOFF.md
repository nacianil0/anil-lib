# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–22 yayında (kohort Batch 0 + Batch 1 + Batch 2 + Batch 3 + Batch 4) · Sıradaki: 23**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 22 — `istem-muhendisligi-kanita-dayali-bir-bakis` |
| Sıradaki güvenli başlangıç | Makale 23 ("In-Context Learning: Örnekle Öğrenme"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 5` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (YOL-HARITASI bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21'den itibaren `reasoning-and-memory` (bağlayıcı karar #50) |

## Açık borçlar

- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 4'te 19 ve 21 koordinatları **ödendi** (11 ve 18'in numarasız "LoRA biçimi"
  işareti ile 19'un pencere sözü). Sıradaki run'ın doğrudan ödeyeceği vaatler: **23** (5 ve 22'den
  örnekle öğrenme), **24** (21'den sistem istemi ve roller), **25** (21'den pencereyi esnetme),
  **26** (21'den anahtar-değer önbelleğinin maliyet yapısı). Batch 4'te doğan yeni koordinatlar:
  20 → 27, 20 → 61–70, 20 → 69, 20 → 85, 19 → 27, 21 → 24/25/26/39. 41 ve 101 koordinatlarına
  yeni kaynak makaleler eklendi (19, 21 → 41; 22 → 101).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan tek künye:** Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı. Ayrıntı: YOL-HARITASI
  bağlayıcı karar #21. Batch 4'te yeni doğrulanamayan künye çıkmadı.
- **Kategori kararı — kısmen kapandı:** 21'den itibaren `reasoning-and-memory` kullanılması
  kararlaştırıldı (bağlayıcı karar #50) ve 23–26 ile Faz 4 için de öngörülüyor. **Açık kalan:**
  27–28 (kuantizasyon, servis) mühendislik başlıklarının kategorisi; karar o başlıkları içeren
  run'da verilmeli ve YOL-HARITASI'na yazılmalıdır.

## Next batch preparation — 23'ten devam

**Pedagojik hedefler.** Batch 4 sonunda okuyucu, hazır bir modeli kendi işine nasıl uyarlayacağını
(19), o modelin ağırlıklarını kimin ürettiğini ve "açık" sözcüğünün ne anlama geldiğini (20), modelle
konuşurken içine yazdığı dizinin anatomisini (21) ve bu diziye ne yazılacağı konusundaki iddiaların
ölçüldüğünde ne kadarının ayakta kaldığını (22) biliyor. Faz 3 açıldı ve eksen eğitimden **kullanıma**
kaydı. Sıradaki yay bu ekseni derinleştiriyor: 22 örneklerin duyarlılığını ölçtü ama mekanizmayı
23'e bıraktı; 21 sistem istemini bir bileşen olarak saydı ama rolleri 24'e, pencereyi esnetmeyi 25'e,
önbelleğin ekonomisini 26'ya bıraktı.

**Sıradaki makaleler ve prerequisite'ler.** YOL-HARITASI "Batch 5 taslağı (23'ten devam)" satırları
geçerlidir (23 ← 5, 22, 21, 12, 18 · 24 ← 12, 21, 11, 13 · 25 ← 21, 7, 26 · 26 ← 21, 10, 15, 9).
Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Few-shot (5) ve örnek sırası duyarlılığı (22) → 23'te mekanizmanın zemini.
- Ağırlık değişmeden davranış değişmesi (19 ile karşıtlık) → 23'ün merkezî ayrımı.
- Ters çevirme laneti ve bağlamda çıkarım (18) → 23'te "bağlamdaki bilgi neden farklı çalışır".
- Sohbet biçimi ve özel token'lar (12) → 24'te rollerin kurulumu.
- Talimat ile belgenin aynı diziye karışması (21) → 24'te rol hiyerarşisinin sınırı.
- Karesel dikkat maliyeti (7) ve pozisyon kodlaması (7, 21) → 25'te pencereyi esnetmenin bedeli.
- Etkin uzunluk ↔ ilan edilen uzunluk (21) → 25'te tekniklerin gerçekten ne kazandırdığı.
- Otoregresif döngü (10) ve token başına maliyet (15) → 26'da üretim ekonomisi.
- Karesel tur maliyeti hesabı (21) → 26'da önbelleğin neden var olduğu.

**Araştırılacak güncel akademik alanlar (23 için öncelikli):** örnekle öğrenmenin ne olduğu ve ne
olmadığı (gösterimlerdeki etiketlerin rolü; görev tanıma ↔ görev öğrenme ayrımı); açıklama önerileri
(örtük gradyan inişi benzetmesi ve Bayesçi çıkarım çerçevesi) ve bu önerilerin sınırları; model
büyüklüğüne göre davranışın değişmesi; çok örnekli (many-shot) rejimin uzun pencerelerle açtığı yeni
alan. **23'ün dürüst sorusu:** ağırlıklar değişmiyorsa buna "öğrenme" demek ne kadar doğru — 19'un
"davranış ucuz, bilgi pahalı" ayrımıyla çelişmeyen bir cevap gerekir. 24 için: sohbet şablonlarının
somut biçimi, rol hiyerarşisinin ölçülmüş etkisi, sistem istemine uyumun ölçümü. 25 için: pozisyon
enterpolasyonu ailesi ve ölçülen kazanımları. 26 için: prefill ↔ decode ayrımı, bellek bant genişliği
sınırı, sayfalı dikkat ve gruplandırılmış sorgu dikkati. Sayısal iddialar ve URL doğrulaması yazımdan
bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 23: aynı istemde örnek sayısı arttıkça doğruluğun değişimi; etiketleri bozulmuş örneklerin etkisi.
- 24: tek dizinin rol işaretleriyle bölünmüş hâli (21\. makale Şekil 1 ile görsel süreklilik).
- 25: aynı modelin eğitim uzunluğu ile esnetilmiş uzunluğunun ölçülen başarısı.
- 26: prefill ve decode aşamalarının maliyet yapısı; önbelleğin uzunlukla doğrusal büyümesi.

**Teknik plan.** 23–26 için `content/series/articles/reasoning-and-memory/` uygundur (bağlayıcı
karar #50); 27–28 için kategori kararı yukarıdaki açık borçta. Yeni makaleler catalog.json'a
`classificationBatch: 5` ve `readingOrder` 23'ten kesintisiz devam ile eklenir; roadmap.json'da ilgili
satırlar `yayinda` yapılır + slug eklenir; YOL-HARITASI prerequisite grafı, kavram-tekrar defteri,
terim defteri ve gerekiyorsa bağlayıcı olgu kararları güncellenir; doğrulama kapıları çalıştırılır;
`+1` fazında bu dosya yeni cursor ve sonraki run hazırlığıyla güncellenir.

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
korunur. **Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını
gezer, dolayısıyla yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir;
frontmatter'a önce yer tutucu hash yazmak sorun değildir. Roadmap başlığı frontmatter başlığıyla
birebir eşleşmek zorundadır — başlık değiştiriliyorsa roadmap.json entegrasyondan **önce**
güncellenmelidir. `next dev` açıkken `pnpm build` çalıştırılmaz. Araçların üçü de varsayılan olarak
**yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir) — repoda ikinci bir seri
bulunduğu için bu ayrım önemlidir.

**Dev server davranışı (Batch 4'te yeniden doğrulandı).** Doğru sıra: dev server'ı durdur →
`pnpm build` (zorunlu kapı) → dev server'ı başlat → gerçek render doğrulaması. Batch 4'te yeni
slug'larda 404 gözlenmedi; Batch 3'teki modül önbelleği sorunu tekrarlanmadı fakat karşılaşılırsa
çözüm dev server'ı yeniden başlatmaktır. Tarayıcı panosunun görüntülenemediği ortamlarda piksel
ekran görüntüsü alınamaz (Batch 4'te de alınamadı); gerçek render bu durumda DOM ölçümüyle
doğrulanır (üç temada `body` ve `figure svg` renkleri, SVG metinlerinin viewBox içinde kalması,
mobil/tablet/masaüstünde yatay taşma yokluğu, şekil altyazıları, rota sweep'iyle HTTP 200) ve bu
sınırlama raporda açıkça belirtilir.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; konsolda görülen tek hata sınıfı budur (Batch 4'te yeniden
  doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG 544 birim, kap ~298 birim);
  sayfa gövdesi taşmaz. Bu, yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon
  değildir.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı (+rotalar, katalog, araçlar)
  aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. Üretim çok aşamalı
  araştırma → yazım → inceleme → düzeltme → doğrulama turlarıyla yürüdü; inceleme turu
  20 BLOCKER + ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
  Alınan bağlayıcı olgu kararları YOL-HARITASI §"Bağlayıcı olgu kararları"na taşındı.
- **Batch 2 (2026-08-29):** Makale 11–14, `models-and-training`, serinin ilk `intermediate`
  kohortu. `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Bütün kapılar geçti:
  191 test, `pnpm build`, 40 rota 200.
- **Batch 3 (2026-08-29):** Makale 15–18, `models-and-training`. `BATCH=4+1` ile, tek oturumda,
  yardımcı agent kullanmadan yürüdü: birincil kaynaklardan sayı çıkarma, tokenizer ölçümlerinin
  `tiktoken` ile yerelde yeniden üretilmesi, yazım, kendi kendine eleştirel inceleme turu, düzeltme,
  entegrasyon ve doğrulama. Doğrulama kapılarının tamamı geçti: 208 test, `pnpm typecheck`,
  `pnpm build` (52 sayfa), 48 rotanın tamamı 200, üç temada DOM ölçümüyle render doğrulaması.
- **Batch 4 (2026-08-29):** Makale 19–22. İlk iki makale `models-and-training` altında Faz 2'yi
  kapattı; son iki makale `reasoning-and-memory` altında Faz 3'ü açtı (bağlayıcı karar #50).
  `BATCH=4+1` ile, tek oturumda, yardımcı agent kullanmadan yürüdü. Üç birincil kaynak PDF'i
  `pypdf` ile metne çevrilerek okundu; 21\. makaledeki token sayıları `tiktoken` ile yerelde
  üretildi. Yayımlanmamış 21, 22 ve 24 başlıklarındaki "Prompt" sözcüğü terim defterine uyarlandı
  (bağlayıcı karar #51). Doğrulama kapılarının tamamı geçti: 223 test, `pnpm typecheck`,
  `pnpm build` (59 sayfa), 55 rotanın tamamı 200, üç temada DOM ölçümüyle render doğrulaması,
  9 yeni diyagramın tamamı viewBox içinde, mobil/tablet/masaüstünde sayfa gövdesinde yatay taşma yok.
- Batch 0/1'in ham üretim kayıtları (araştırma paketleri, 18 inceleme raporu, workflow
  script'leri, `entegre.cjs`'in orijinali) `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv**
  olarak durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
