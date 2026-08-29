# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-29 · Durum: **1–12 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12) · Sıradaki: 13**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 12 — `dengeli-arama-avlden-b-agacina` |
| Sıradaki güvenli başlangıç | Makale 13 ("Heap ve Öncelik Kuyruğu"); run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 4` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–12 → `data-structures` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 3'te ne yapıldı

1. **Makale 10–12 yayımlandı** (`classification_batch: 3`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. Faz B'nin gövdesi kuruldu: 10 temel yapılar ve amortize maliyet,
   11 ikili arama ağacı ve değişmez, 12 dengeleme ve model değişimi (dış bellek, B-ağacı).
2. **Makale 9'un iki sözü karşılandı:** dizi / bağlı liste / yığın / kuyruk maliyet tablosu
   (makale 10'un son bölümü) ve **amortize maliyet**, dinamik dizi büyütmesi üzerinden, ortalama
   durumdan açıkça ayrılarak (makale 10'un "Dinamik dizi ve amortize maliyet" bölümü).
3. **Batch 2'nin bıraktığı kaynak borcu kapandı.** CLRS 4. baskının bölüm numaraları MIT Press'in
   kendi içerik sunucusundaki resmî *Selected Solutions* belgesinden doğrulandı (ARASTIRMA §8);
   6 Heapsort, 10 Elementary Data Structures, 11 Hash Tables, 12 Binary Search Trees,
   13 Red-Black Trees, 16 Amortized Analysis, 17 Augmenting Data Structures, 19 Disjoint Sets,
   20 Elementary Graph Algorithms, 21 MST, 22 Single-Source Shortest Paths, 23 All-Pairs,
   24 Maximum Flow. **18. bölümün adı doğrulanamadı** (aşağıdaki açık borç).
4. **Yeni birincil kaynaklar eklendi:** MIT 6.006 Bahar 2020 (OCW) Lecture 2, 6 ve 7 ders notları
   PDF olarak indirilip tam metin okundu; Sedgewick & Wayne 3.3 sayfası ve Open Data Structures
   14.2 (B-Trees) doğrudan okundu. Ayrıntı ve alıntılar ARASTIRMA §8'de.
5. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §8 sonundaki liste). AVL'nin sıkı
   1,44 sabiti kaynaktan alınmadı; F(h) = Fib(h+3) − 1 özdeşliğinden türetilip sayısal olarak
   doğrulandı.
6. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 9 → 12 sayfa. `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch
   yalnızca içerik ve dokümandır.

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (12 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **CLRS 4. baskının 18. bölümünün adı doğrulanamadı** ve alt bölüm **başlıkları** hiçbir bölüm
  için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı). Denenen ve sonuç
  vermeyen yollar ARASTIRMA §8'de listelidir. Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf
  yapılır; B-ağacı için CLRS kullanılmaz (kaynak: Open Data Structures 14.2). Makale 13 (Heapsort,
  6. bölüm) ve 14 (Hash Tables, 11. bölüm) için doğrulanmış bölüm numaraları yeterlidir.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer;
  bu yüzden canlı sync uçtan uca denenemedi. `validArticleIds` birleşimi kod düzeyinde doğrulandı.
  E2E'de `tests/e2e/reader-data.spec.ts` içindeki üç test bu nedenle başarısızdır.
- **`tests/e2e/reader.spec.ts:231` ("expands the real reading area…") kırık ve BOUN'la ilgisiz.**
  Okuma alanı grubuna `Ekstra Geniş` seçeneği eklendikten sonra
  `getByRole("button", { name: "Geniş" })` iki öğeye eşleşiyor ve Playwright strict-mode ihlali
  veriyor. Kapsam dışı olduğu için bu run'da da dokunulmadı; düzeltme tek satır:
  seçiciye `exact: true` eklemek.
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI tarafına iki yeni makale
  dosyası daha eklendi (`content/series/articles/models-and-training/` altında, git'te takipsiz).
  BOUN kapsamı dışıdır; `pnpm test` sayısı ve `check-series-*` dosya sayıları o oturumun
  ilerlemesiyle değişir. **Aynı depoda iki Next süreci `.next` dizinini paylaşır ve birbirini
  bozar** — doğrulama sırasına bak.
- `pnpm test:e2e` ve `playwright test` **kendi sunucusunu başlatamaz**: config'in `webServer`
  komutu `pnpm exec next dev` kullanıyor ve PATH'teki global pnpm depodaki placeholder
  `pnpm-workspace.yaml`'ı reddediyor ("packages field missing or empty"). Çözüm aşağıdaki
  "doğrulama sırası" bölümünde.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 12 makale + 24 diyagram temiz;
  `entegre-batch` kuru çalışması yeni 3 makaleyi buldu, `--write` sonrası fark kalmadı. Katalog ↔
  frontmatter ↔ gövde hash üçlü eşitliği bağımsız bir betikle de doğrulandı: 12/12 (gövde,
  CRLF korunarak, frontmatter sonrası trim edilmiş metnin SHA-256'sı). `reading_order` 1–12
  kesintisiz; kohort dağılımı 3/3/3/3.
- `pnpm typecheck` temiz · `pnpm test` 218/218 · `pnpm build` başarılı (55 statik sayfa;
  `/boun/[slug]` 12 yol, `/read/[slug]` 18, `/seri/[slug]` 18). Unit test sayısı 208 → 218 arttı:
  altısı bu batch'in yeni diyagramlarından, kalanı **paralel AI oturumunun** eklediği asset'lerden
  (`series-assets.test.ts` asset klasörünü gezer).
- Global article-id ve slug benzersizliği: 48/48 (18 ana + 18 AI + 12 BOUN).
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Altı diyagramın hepsi light ve dark
  temada tek tek görsel olarak incelendi. `/boun` girişi "Yayında 12" gösteriyor.
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1 ve Batch 2'nin referans sonucuyla birebir
  aynıdır.
- Bu run'da build, dev ve E2E **doğrudan depoda** çalıştırıldı; paralel AI oturumu bu sırada
  `pnpm dev` çalıştırmadığı için yalıtılmış kopyaya gerek kalmadı (kopya tarifi aşağıda duruyor).

## Sıradaki batch hazırlığı — Batch 4 (Makale 13'ten itibaren)

**Pedagojik hedef:** Faz B'nin ikinci yarısı. 10–12 "sıralı bir kümede arama" sorusunu maliyetiyle
birlikte kapattı. 13–16 üç yeni soruyu açar: sürekli en küçüğü istemek (heap), sırayı tamamen
bırakıp adres hesaplamak (hashing), ve sıralamanın kendisini bir problem olarak ele almak (15–16).
Her makalede aynı iskelet tekrar eder: yapının değişmezi, işlemlerin maliyet tablosu, "neyi
ucuzlatmak için neyi pahalılaştırıyor?" sorusu ve bir sözlü savunma.

**Prerequisite satırları (taslak; YOL-HARITASI'nda da var):**
- 13 ← 11 (ağaç dili: yükseklik, alt ağaç), 10 (dizi üzerinde tam ikili ağaç temsili; dinamik dizi), 4 (heap değişmezinin tümevarımla korunması), 12 (değişmezi zayıflatmanın ne kazandırdığı)
- 14 ← 6 (güvercin yuvası: çakışma kaçınılmazdır), 9 (en kötü durum savunması ve ortalama durumun dağılım varsayımı), 8 (mod aritmetiği bir grup yapısıdır), 10 (zincirleme bir bağlı listedir, açık adresleme bir dizidir)
- 15 ← 13 (heapsort için heap), 9 (büyüme sınıfları tablosu), 4 (mergesort'un tümevarımlı doğruluk sezgisi), 10 (kararlılık ve ek bellek maliyeti)

**Araştırma ihtiyacı:** 13–15 için doğrulanmış kaynaklar hazır. CLRS 4. baskı **6. bölüm
(Heapsort)** — alt bölüm numaraları 6.1–6.5'in varlığı doğrulandı — ve **11. bölüm (Hash Tables)**
kullanılabilir; MIT 6.006 Bahar 2020'nin Lecture 4 (Hashing), Lecture 5 (Linear Sorting) ve
Lecture 8 (Binary Heaps) notları aynı yolla indirilip okunabilir (ders listesi ve PDF çözümleme
yöntemi ARASTIRMA §8'de). Sedgewick & Wayne 2.4 (Priority Queues), 2.1–2.3 (sorting) ve 3.4 (Hash
Tables) ikinci kaynak olarak kullanılabilir; içindekiler bu run'da resmî siteden doğrulandı.
Resmî Boğaziçi sayfaları 2026-08-29'da doğrulandı; kapsamı etkileyen bir değişiklik görülmedikçe
her run'da yeniden çekilmeleri gerekmez, ama makale 40–41 öncesinde tekrar doğrulanmalıdır.

**Yayımlanmış makalelerin verdiği sözler.** Makale 10–12 de **numaralı ileri vaat vermedi**; bütün
ileri göndermeler konu adıyla yapıldı, dolayısıyla roadmap yeniden numaralanabilir ama şu konular
teslim edilmek zorundadır:

- **13'te karşılanmalı (makale 12'nin "Sırada ne var" sözü, en somut vaat):** "en küçüğü ver,
  sonra tekrar en küçüğü ver" sorusu; heap'in arama ağacı değişmezini **bilinçli zayıflatması**
  (yalnızca ebeveyn–çocuk ilişkisi); en küçüğün sabit zamanda bulunması; yapının **tek bir dizide,
  hiç işaretçi kullanmadan** saklanması ve **tam ikili ağacın dizi üzerindeki indis aritmetiği**
  (makale 10 ve 11'in geri çağrımı). Ayrıca makale 10'un "heap ayrı bir yapıdır, kendi makalesinde
  konuşulacak" uyarısı burada karşılanır ve **yığın = stack / heap** ayrımı korunmalıdır.
- **14'te karşılanmalı:** makale 10'un "sırasız aramayı hiçbiri ucuzlatmaz; onun için başka bir
  değişmez gerekir ve fazın geri kalanı tam olarak bunu kurar" sözü; hash tablosu (5 ve 6'nın
  numarasız pinleri), güvercin yuvasıyla çakışmanın kaçınılmazlığı, en kötü durum savunması.
- **Konu bazlı, numarasız pinler (10–12'den):** zamanlayıcı kuyruğu ve çağrı yığını = "işletim
  sistemleri fazı" (10); disk tabanlı arama yapıları ve ayırma yöntemleri = "dosya sistemleri"
  makalesi (12); indeks = B-ağacı = "veritabanları" makalesi (12); bellek hiyerarşisinin modele
  geri girmesi (9, 12).
- Batch 0–2'den devreden numarasız pinler: graf dolaşmaları ve bağlı bileşen (7), minimum kapsayan
  ağaç (7), O/Ω/Θ formal tanımları (9), ortalama durumun dağılım varsayımı → olasılık makalesi (9),
  girdi boyutunun sayı mı basamak mı olduğu → hesaplamanın sınırları (9), topolojik sıralama (5),
  sayılabilirlik → durma problemi (5), alt sınır ispatı (6), doğum günü ilkesinin olasılık hâli (6).
- Roadmap'teki mevcut karşılıkları: 13 (heap), 14 (hashing), 15 (alt sınır teaser'ı),
  16 (BFS/DFS + topolojik sıralama), 17 (asimptotik tanımlar), 23 (MST), 24 (alt sınırlar),
  25 (NP ve karar verilemezlik), 34 (disk modeli ve dosya sistemleri), 36 (olasılık),
  37 (bellek hiyerarşisi), 39 (veritabanı indeksi).

**Görselleştirme öngörüsü:** 13: heap'in dizi temsili ve indis aritmetiği + sızdırma (sift)
adımları; 14: zincirleme ile açık adresleme karşılaştırması ve yük faktörü eğrisi; 15: sıralama
algoritmalarının karşılaştırma tablosu ve mergesort'un birleştirme adımı; 16: komşuluk listesi ↔
matris ve BFS/DFS'in aynı graf üzerinde ürettiği farklı dolaşma ağaçları.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı.)

**Sözlü checkpoint tohumları:** "Heap ile ikili arama ağacının değişmezleri nasıl farklıdır ve bu
fark neyi ucuzlatır?"; "Hash tablosunda ortalama sabit zaman hangi varsayıma dayanır, en kötü
durum nedir?"; "Kararlı sıralama ne demek ve ne zaman önemlidir?"

**Araç sırası (Batch 1–3'te doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
2) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
3) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
4) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
5) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 4. adımı yeniden çalıştır.
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır.

**Doğrulama sırası — iki farklı sunucu gerekiyor.** Browser paneli bu ortamda piksel ekran
görüntüsü veremiyor; hem render hem E2E headless Playwright ile yapılır ama **aynı sunucuyla
yapılamaz**:

1. Önce dev sunucusu varsa durdur, `pnpm build` çalıştır (zorunlu kapı, `.next`'i dev ile
   paylaşamaz).
2. **Render doğrulaması için:** `corepack pnpm exec next dev -p 3100 -H 127.0.0.1` — gate env'i
   **vermeden**; dev'de kapı devre dışı kalır ve makale sayfaları girişsiz açılır. Betikler
   gitignore'daki `artifacts/boun-render/` altındadır; bu batch'in sürümleri `shot-batch3.mjs`
   (27 kombinasyon + `/boun`) ve `figs-b3.mjs` (diyagram başına ekran görüntüsü, light + dark).
   İkisi de taban adresi `RENDER_BASE` ortam değişkeninden alır ve slug listesi başta durur —
   sonraki batch için tek yapılacak şey o üç satırı değiştirmektir. Tema,
   `localStorage["anil-lib:reader-preferences:v1"]` içine tam `preferencesSchema` nesnesi
   yazılarak seçilir (`anil-lib:theme` anahtarı sepia'yı uygulamaz).
3. **E2E için:** aynı sunucu **kullanılamaz**. `playwright.config.ts` gate env'ini yalnızca kendi
   `webServer` sürecine verir, o komut da bu makinede çalışmıyor; `reuseExistingServer: true`
   olduğu için gate'siz sunucu sessizce yeniden kullanılır ve `auth.spec.ts` ile ona bağlı bütün
   testler yanlışlıkla başarısız olur. Doğru yol: gate'siz sunucuyu durdur, sonra sunucuyu
   **config'deki test değerleriyle** başlat —
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   ve `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long` — ardından
   `corepack pnpm exec playwright test` çalıştır. Doğru kurulduğunun hızlı işareti: gate'li
   sunucuda `/boun` 307 döner, `/login` 200 döner.
4. **Paralel bir oturum aynı depoda `pnpm dev` çalıştırıyorsa 1–3 çalışmaz**: iki Next süreci
   `.next` dizinini paylaşır ve sayfalar "missing required error components, refreshing..." döner.
   Çalışan yalıtım: depoyu **aynı sürücüde** bir kopyaya çıkar (`tar` ile `node_modules`,
   `.next` ve `.git` hariç), kopyanın içindeki `node_modules` için depodakine bir dizin
   junction'ı kur (`cmd /c mklink /J`), sonra build, dev ve e2e'yi orada çalıştır
   (`PLAYWRIGHT_PORT=3101`). Junction farklı sürücüdeyse webpack mutlak yolları çözemez ve build
   patlar. Temizlikte **önce** junction'ı `cmd /c rmdir` ile kaldır; `rm -rf` junction'ı takip
   edip gerçek `node_modules`'ü silebilir. Bu run'da çakışma olmadığı için gerekmedi.

## Non-normative history

- **2026-08-29 (Batch 3, `BATCH=3+1`):** Makale 10–12 yayımlandı; Faz B'nin gövdesi kuruldu ve
  CLRS 4. baskı bölüm numarası borcu kapandı. Doğrulama: BOUN içerik + SVG + hash + entegrasyon
  denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 218/218, `pnpm build` başarılı
  (55 statik sayfa, 12'si `/boun`), global id/slug benzersizliği 48/48, Playwright 21 geçti /
  1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran görüntüsüyle
  doğrulandı.
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
