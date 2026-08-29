# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–9 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9) · Sıradaki: 10**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 9 — `karmasiklik-big-o-ile-dusunmeye-baslamak` |
| Sıradaki güvenli başlangıç | Makale 10 ("Diziler, Bağlı Listeler, Yığın ve Kuyruk"); run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 3` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9– → `data-structures` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 2'de ne yapıldı

1. **Makale 7–9 yayımlandı** (`classification_batch: 2`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. Faz A kapandı (7 graflar ve ağaçlar, 8 cebirsel yapılar ve Boolean
   cebiri) ve Faz B açıldı (9 karmaşıklık). Makale 9, `data-structures` kategorisinin ilk
   makalesidir; klasör bu run'da açıldı.
2. **Batch 1'in devrettiği iki söz karşılandı:** ağaç karakterizasyonları yaprak silen yapısal
   tümevarımla kuruldu (makale 4'ün sözü) ve el sıkışma lemması iki-yoldan-sayma argümanıyla
   ispatlandı (makale 6'nın sözü).
3. **Kaynaklar birincil metinden doğrulandı.** CMPE220 ve CMPE250 katalog sayfaları yeniden
   çekildi (fark yok); MIT 6.042J Bahar 2015 PDF'i yeniden indirilip Lemma 11.2.1, Definition
   11.10.1–2, Theorem 11.10.3, Lemma 11.10.4, Theorem 11.10.6, §11.8–11.9 ve §13.7 doğrudan
   okundu; *Applied Discrete Structures* §11.2 ve §13.1–13.3 (Tanım 13.3.5 dâhil) tam metinden
   okundu; yarıgrup tanımı Encyclopedia of Mathematics'ten alındı; CLRS 4. baskı bölüm/alt bölüm
   başlıkları ve Rosen bölüm numaraları yayıncı künyelerinden doğrulandı (ARASTIRMA §7).
4. **Bütün sayısal iddialar bağımsız hesaplandı** ve Boolean sadeleştirme ile bölen kafesi sınır
   örneği elle denetlendi (ARASTIRMA §7 sonunda liste hâlinde).
5. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 6 → 9 sayfa. `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch
   yalnızca içerik ve dokümandır.

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (9 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer;
  bu yüzden canlı sync uçtan uca denenemedi. `validArticleIds` birleşimi kod düzeyinde doğrulandı.
  E2E'de `tests/e2e/reader-data.spec.ts` içindeki testler bu nedenle başarısızdır.
- **`tests/e2e/reader.spec.ts:231` ("expands the real reading area…") kırık ve BOUN'la ilgisiz.**
  Okuma alanı grubuna `Ekstra Geniş` seçeneği eklendikten sonra
  `getByRole("button", { name: "Geniş" })` iki öğeye eşleşiyor ve Playwright strict-mode ihlali
  veriyor. Kapsam dışı olduğu için bu run'da da dokunulmadı; düzeltme tek satır:
  seçiciye `exact: true` eklemek.
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI kataloğu 10 → 14 → 18 makale
  diye büyüdü ve o oturum aynı depoda `pnpm dev` çalıştırdı. BOUN kapsamı dışıdır; `pnpm test`
  sayısı, `check-series-*` dosya sayıları ve build'in `/seri` sayfa sayısı o oturumun ilerlemesiyle
  değişir, BOUN kaynaklı değildir. **Aynı depoda iki Next süreci `.next` dizinini paylaşır ve
  birbirini bozar** — doğrulama sırasına bak.
- `pnpm test:e2e` ve `playwright test` **kendi sunucusunu başlatamaz**: config'in `webServer`
  komutu `pnpm exec next dev` kullanıyor ve PATH'teki global pnpm depodaki placeholder
  `pnpm-workspace.yaml`'ı reddediyor ("packages field missing or empty"). Çözüm aşağıdaki
  "doğrulama sırası" bölümünde.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 9 makale + 18 diyagram temiz;
  `entegre-batch` kuru çalışması 0 fark. Katalog ↔ frontmatter hash eşitliği bağımsız bir
  betikle de doğrulandı: 9/9.
- `pnpm typecheck` temiz · `pnpm test` 208/208 · `pnpm build` başarılı (49 önceden üretilmiş HTML:
  18 `/read` + 18 `/seri` + 9 `/boun` + `/boun` + `/seri` + `/` + `/_not-found`). Unit test sayısı
  run boyunca 188 → 203 → 208 diye arttı: bir kısmı bu batch'in altı yeni diyagramından, kalanı
  **paralel AI oturumunun** eklediği asset'lerden gelir (`series-assets.test.ts` asset klasörünü
  gezer). AI serisi bu run sırasında 10 → 18 makaleye çıktı; BOUN kaynaklı değildir.
- Global article-id ve slug benzersizliği: run sonunda 45/45 (18 ana + 18 AI + 9 BOUN); run
  ortasında 41/41 ölçülmüştü, aradaki fark paralel AI oturumunun eklediği makalelerdir.
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Altı diyagramın hepsi light ve dark
  temada tek tek görsel olarak incelendi. `/boun` girişi "Yayında 9" gösteriyor.
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1'in referans sonucuyla birebir aynıdır.
- Son build, render ve E2E **yalıtılmış bir kopyada** çalıştırıldı (aşağıdaki doğrulama sırasına
  bakın); sebebi, paralel AI oturumunun aynı depoda `pnpm dev` çalıştırıp `.next` dizinini
  paylaşmasıdır.

## Sıradaki batch hazırlığı — Batch 3 (Makale 10'dan itibaren)

**Pedagojik hedef:** Faz B'nin gövdesi. Okuyucu 9'da maliyeti makineden bağımsız ölçmeyi ve adım
saymayı öğrendi; 10–14 o ölçüyü gerçek yapıların üzerinde kullanır. Her makalede aynı iskelet
tekrar eder: yapının değişmezi, işlemlerin maliyet tablosu, "neyi ucuzlatmak için neyi
pahalılaştırıyor?" sorusu ve bir sözlü savunma.

**Prerequisite satırları (taslak; YOL-HARITASI'nda da var):**
- 10 ← 9 (maliyet dili), 5 (dizi bir fonksiyondur: indis → değer)
- 11 ← 7 (ağaç tanımı, yaprak/kök dili), 10 (düğüm ve işaretçi), 4 (özyinelemeli tanım)
- 12 ← 11 (BST değişmezi ve dengesizliğin bedeli), 9 (yükseklik garantisinin karmaşıklığa çevrilmesi)
- 13 ← 11 (ağaç dili), 10 (dizi üzerinde tam ikili ağaç temsili), 4 (değişmezin tümevarımla korunması)
- 14 ← 6 (güvercin yuvası: çakışma kaçınılmazdır), 9 (en kötü durum savunması), 8 (mod aritmetiği bir gruptur)

**Araştırma ihtiyacı:** 10–14 için CLRS 4. baskı yeterlidir (elemanter yapılar, ikili arama
ağaçları, kırmızı-siyah ağaçlar, heap ve öncelik kuyruğu, hash tabloları); Sedgewick & Wayne
ikinci kaynak olarak kullanılabilir. **CLRS 4. baskının bölüm numaraları bu run'da yalnızca
2. ve 3. bölüm için doğrulandı**; 10–14'te kullanılacak bölümler (elemanter veri yapıları,
hash tabloları, ikili arama ağaçları, kırmızı-siyah ağaçlar, heapsort) yeniden doğrulanmalıdır —
4. baskı 3. baskıdan farklı numaralandırır. Resmî sayfalar 2026-08-29'da doğrulandı; kapsamı
etkileyen bir değişiklik görülmedikçe her run'da yeniden çekilmeleri gerekmez, ama makale 40–41
öncesinde tekrar doğrulanmalıdır.

**Yayımlanmış makalelerin verdiği sözler.** Makale 7–9 da **numaralı ileri vaat vermedi**; bütün
ileri göndermeler konu adıyla yapıldı, dolayısıyla roadmap yeniden numaralanabilir ama şu konular
teslim edilmek zorundadır:

- **10'da karşılanmalı:** dizi / bağlı liste / yığın / kuyruk maliyet tablosu (9'un "Sırada ne var"
  sözü) ve **amortize maliyet**, dinamik dizi büyütmesi üzerinden (9'un "ortalamayla karıştırılan
  üçüncü kavram" pini).
- **Konu bazlı, numarasız pinler (7–9'dan):** graf dolaşmaları ve bağlı bileşen algoritması =
  "graf dolaşmaları makalesi" (7); minimum kapsayan ağaç = "graf algoritmaları makalesi" (7);
  O/Ω/Θ formal tanımları ve ispatları = "asimptotik analiz makalesi" (9); bellek hiyerarşisinin
  modele geri girmesi = "dosya sistemleri ve disk tabanlı arama yapıları" (9); ortalama durumun
  dağılım varsayımı = "destekleyici temeller fazındaki olasılık makalesi" (9); girdi boyutunun
  sayı mı basamak mı olduğu = "hesaplamanın sınırlarını konuştuğumuz makale" (9).
- Batch 0–1'den devreden numarasız pinler: hash tablosu (5, 6), topolojik sıralama (5),
  sayılabilirlik → durma problemi (5), alt sınır ispatı (6), doğum günü ilkesinin olasılık hâli (6).
- Roadmap'teki mevcut karşılıkları: 10 (amortize), 14 (hashing), 15 (alt sınır teaser'ı),
  16 (BFS/DFS + topolojik sıralama), 17 (asimptotik tanımlar), 23 (MST), 24 (alt sınırlar),
  25 (NP ve karar verilemezlik), 34 (disk modeli), 36 (olasılık), 37 (bellek hiyerarşisi).

**Görselleştirme öngörüsü:** 10: dizi ↔ bağlı liste bellek düzeni karşılaştırması ve dört yapının
maliyet tablosu; 11: BST değişmezi ve dengesizliğin yüksekliğe etkisi; 12: AVL dönüşü veya
B-ağacı düğüm doluluğu; 13: heap'in dizi temsili ve sızdırma (sift) adımları; 14: zincirleme ile
açık adresleme karşılaştırması ve yük faktörü eğrisi.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı.)

**Sözlü checkpoint tohumları:** "Diziyle bağlı liste arasındaki maliyet farkını ve hangisini ne
zaman seçtiğini anlat"; "amortize maliyet ile ortalama durum arasındaki farkı açıkla";
"BST'nin en kötü durumu neden O(n)'e düşer ve dengeleme bunu nasıl engeller?"

**Araç sırası (Batch 1'de netleşti, Batch 2'de tekrar doğrulandı):** katalog var olduğu için
`sync-series-hashes.cjs` yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
2) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
3) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
4) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
5) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 4. adımı yeniden çalıştır.
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır
(Batch 2'de `data-structures` böyle açıldı).

**Doğrulama sırası — iki farklı sunucu gerekiyor (Batch 2'de netleşti).** Browser paneli bu
ortamda görüntülenemediği için piksel ekran görüntüsü `computer{action:"screenshot"}` ile
alınamıyor; ikisi de headless Playwright ile yapılır ama **aynı sunucuyla yapılamaz**:

1. Önce dev sunucusunu durdur, `pnpm build` çalıştır (zorunlu kapı, `.next`'i dev ile paylaşamaz).
2. **Render doğrulaması için:** `corepack pnpm exec next dev -p 3100 -H 127.0.0.1` — gate env'i
   **vermeden**; dev'de kapı devre dışı kalır ve makale sayfaları girişsiz açılır. Betikler
   gitignore'daki `artifacts/boun-render/` altındadır (`shot-batch2.mjs`, `figs-b2.mjs`).
   Tema, `localStorage["anil-lib:reader-preferences:v1"]` içine tam `preferencesSchema` nesnesi
   yazılarak seçilir (`anil-lib:theme` anahtarı sepia'yı uygulamaz). `shot-batch2b.mjs` ve
   `figs-b2b.mjs` sürümleri taban adresi `RENDER_BASE` ortam değişkeninden alır.
3. **E2E için:** aynı sunucu **kullanılamaz**. `playwright.config.ts` gate env'ini yalnızca kendi
   `webServer` sürecine verir, o komut da bu makinede çalışmıyor; `reuseExistingServer: true`
   olduğu için gate'siz sunucu sessizce yeniden kullanılır ve `auth.spec.ts` ile ona bağlı bütün
   testler yanlışlıkla başarısız olur (bu run'da önce 23 başarısız alındı, sebebi buydu).
   Doğru yol: gate'siz sunucuyu durdur, sonra sunucuyu **config'deki test değerleriyle** başlat —
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   ve `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long` — ardından
   `corepack pnpm exec playwright test` çalıştır.
4. **Paralel bir oturum aynı depoda `pnpm dev` çalıştırıyorsa 1–3 çalışmaz**: iki Next süreci
   `.next` dizinini paylaşır ve sayfalar "missing required error components, refreshing..." döner;
   Playwright bunu içerikle ilgisiz kitlesel hata olarak gösterir (bu run'da bir kez yaşandı).
   Çalışan yalıtım: depoyu **aynı sürücüde** bir kopyaya çıkar (`tar` ile `node_modules`,
   `.next` ve `.git` hariç), kopyanın içindeki `node_modules` için depodakine bir dizin
   junction'ı kur (`cmd /c mklink /J`; kaynak depo kökündeki `node_modules`), sonra build, dev
   ve e2e'yi orada çalıştır (`PLAYWRIGHT_PORT=3101`). Junction farklı sürücüdeyse webpack mutlak
   yolları çözemez ve build patlar. Temizlikte **önce** junction'ı `cmd /c rmdir` ile kaldır;
   `rm -rf` junction'ı takip edip gerçek `node_modules`'ü silebilir.

## Non-normative history

- **2026-08-29 (Batch 2, `BATCH=3+1`):** Makale 7–9 yayımlandı; Faz A kapandı, Faz B açıldı.
  Doğrulama: BOUN içerik + SVG + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz,
  `pnpm test` 208/208, `pnpm build` başarılı (49 statik HTML, 9'u `/boun`), Playwright 21 geçti /
  1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran görüntüsüyle
  doğrulandı.
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
