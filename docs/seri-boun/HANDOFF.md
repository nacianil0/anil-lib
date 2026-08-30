# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-30 · Durum: **1–15 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15) · Sıradaki: 16**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 15 — `siralama-algoritmalari-karsilastirmali-ve-otesi` |
| Sıradaki güvenli başlangıç | Makale 16 ("Graf Temsilleri, BFS ve DFS") — Faz B'nin son makalesi; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 5` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–15 → `data-structures` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 4'te ne yapıldı

1. **Makale 13–15 yayımlandı** (`classification_batch: 4`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. Faz B'nin ikinci yarısı kuruldu: 13 heap ve öncelik kuyruğu, 14 hashing,
   15 sıralama ve alt sınır sezgisi.
2. **Üç makale de CMPE250 katalog tanımındaki bir başlığı doğrudan karşılıyor:** "Heap Structures"
   (13), "Hashing" (14), "Advanced Sorting" (15). Faz B'nin resmî dayanağı böylece sekiz katalog
   başlığından beşini kapsamış oldu ("Search Structures", "Complexity" ve "File organization"
   9–12'de karşılanmıştı).
3. **Yayımlanmış sözler ödendi.** Makale 12'nin "en küçüğü ver" sözü (13), makale 10'un
   "heap ayrı bir yapıdır, kendi makalesinde konuşulacak" ve "2i + 1 / 2i + 2 indis aritmetiği"
   pinleri (13), makale 6'nın "çakışma olunca ne yapıyoruz sorusu hash makalesinin başlangıç
   cümlesi olacak" sözü (14 — birebir açılış cümlesi), makale 1'in üç halkalı hash takip zinciri
   (14), makale 10'un "sırasız aramayı hiçbiri ucuzlatmaz" sözü (14), makale 6'nın n! alt sınır
   malzemesi (15). Ayrıntı: YOL-HARITASI'nın kavram-tekrar defteri.
4. **Kaynak borcunun bir kısmı kapandı.** CLRS 4. baskının **2, 3, 4, 5, 7, 8 ve 9. bölüm** adları
   da MIT Press'in resmî *Selected Solutions* belgesinden doğrulandı (ARASTIRMA §9). 18. bölümün
   adı ve alt bölüm **başlıkları** hâlâ doğrulanamıyor; karar değişmedi (bölüm düzeyinde atıf).
5. **Yeni birincil kaynaklar okundu:** MIT 6.006 Bahar 2020 Lecture 3 (Sorting), 4 (Hashing),
   5 (Linear Sorting) ve 8 (Binary Heaps) ders notları PDF olarak indirilip tam metin okundu;
   Sedgewick & Wayne 2.2, 2.3, 2.4 ve 3.4 sayfaları doğrudan okundu. Ayrıntı ARASTIRMA §9'da.
6. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §9 sonundaki liste). **Bir kaynak
   düzeltmesi yapıldı:** 6.006, tam ikili ağacın yüksekliğini ⌈lg n⌉ olarak verir; gerçek değer
   ⌊log₂ n⌋'dir (n = 3, 5, 6, 7 gibi değerlerde fark eder). Makale 13 sıkı değeri kullanır ve
   bunu kaynağa atfetmez.
7. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 12 → 15 sayfa. `src/`, `tests/` ve `tools/` altında tek satır değişmedi; bu batch
   yalnızca içerik ve dokümandır.

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (15 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **CLRS 4. baskının 18. bölümünün adı doğrulanamadı** ve alt bölüm **başlıkları** hiçbir bölüm
  için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı). Denenen ve sonuç
  vermeyen yollar ARASTIRMA §8'de listelidir. Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf
  yapılır. Makale 16 (20 Elementary Graph Algorithms) için doğrulanmış bölüm numarası yeterlidir.
- **Makale 13 `azalt_anahtar` (decrease-key) işlemini bilinçli olarak dışarıda bıraktı.** Öncelik
  kuyruğu arayüzü dört işlemle tanımlandı. Graf algoritmaları makalesi (23) Dijkstra ve Prim için
  bu işlemi açmak zorundadır; makale 13 numarasız biçimde "ilerideki graf algoritmaları" diyerek
  köprü kurdu.

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
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI kataloğu 18 → 22 makaleye
  çıktı ve run bitene kadar dört makale daha (`content/series/articles/reasoning-and-memory/`
  altında) git'te takipsiz birikti; `check-series-content --series=ai` bu run'ın sonunda 26 makale
  gördü. BOUN kapsamı dışıdır; `pnpm test` sayısı ve `check-series-*` dosya sayıları o oturumun
  ilerlemesiyle değişir, dolayısıyla bu HANDOFF'taki sayılarla birebir eşleşmeyebilir. **Aynı
  depoda iki Next süreci `.next` dizinini paylaşır ve birbirini bozar** — doğrulama sırasına bak.
- `pnpm test:e2e` ve `playwright test` **kendi sunucusunu başlatamaz**: config'in `webServer`
  komutu `pnpm exec next dev` kullanıyor ve PATH'teki global pnpm depodaki placeholder
  `pnpm-workspace.yaml`'ı reddediyor ("packages field missing or empty"). Çözüm aşağıdaki
  "doğrulama sırası" bölümünde.
- **`TaskStop` Next dev sürecini öldürmez.** Arka planda başlatılan dev sunucusu, görev
  durdurulduktan sonra da 3100'ü dinlemeye devam eder; portu gerçekten boşaltmak için
  `netstat -ano` ile PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalıdır.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor**
  ("unexpected EOF while looking for matching `''`"). Uzun Markdown/SVG blokları `Write` aracıyla
  yazılmalı, gerekiyorsa sonra `cat >>` ile eklenmelidir.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN 15 makale + 30 diyagram temiz;
  `entegre-batch` kuru çalışması yeni 3 makaleyi buldu, `--write` sonrası fark kalmadı. Katalog ↔
  frontmatter ↔ gövde hash üçlü eşitliği bağımsız bir betikle de doğrulandı: 15/15.
  `reading_order` 1–15 kesintisiz; kohort dağılımı 3/3/3/3/3.
- `pnpm typecheck` temiz · `pnpm test` **241/241** · `pnpm build` başarılı (62 statik sayfa;
  `/boun/[slug]` 15 yol, `/read/[slug]` 18, `/seri/[slug]` 22). Unit test sayısı run boyunca
  218 → 235 → 241 arttı: altısı bu batch'in yeni diyagramlarından, kalanı **paralel AI oturumunun**
  run sırasında eklemeye devam ettiği asset'lerden (`series-assets.test.ts` asset klasörünü gezer).
  Bu yüzden sayı sabit bir referans değildir; sabit referans olan şey testlerin **tamamının**
  geçmesidir.
- Global article-id ve slug benzersizliği: 55/55 (18 ana + 22 AI + 15 BOUN).
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = 27 kombinasyonda tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Altı diyagramın hepsi light ve dark
  temada tek tek görsel olarak incelendi; bu incelemede makale 13'ün 2. şeklindeki ok ucu düğümün
  altında kalıyordu, polyline kısaltılıp yeniden çekildi ve düzeldi.
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1–3'ün referans sonucuyla birebir aynıdır.
- Bu run'da build, dev ve E2E **doğrudan depoda** çalıştırıldı; paralel AI oturumu bu sırada
  `pnpm dev` çalıştırmadığı için yalıtılmış kopyaya gerek kalmadı (kopya tarifi aşağıda duruyor).

## Sıradaki batch hazırlığı — Batch 5 (Makale 16'dan itibaren)

**Pedagojik hedef:** Makale 16 Faz B'yi kapatır ve fazın merkezî sorusunu son bir kez sorar:
"bu yapı neyi ucuzlatmak için neyi pahalılaştırıyor?" — bu sefer graf üzerinde. Sonra Faz C açılır
ve fazın karakteri değişir: 9–16 **yapı** anlattı, 17–25 **analiz ve tasarım** anlatacak.
Faz C'nin ilk üç makalesi (17 asimptotik tanımlar, 18 yinelemeler ve Master Teoremi, 19 döngü
değişmezleri) Faz B'de sezgisel bırakılan her şeyi formalleştirir.

**Prerequisite satırları (16 için taslak; YOL-HARITASI'nda da var):**
- 16 ← 7 (graf ve ağaç tanımları, el sıkışma lemması, bağlılığın denklik bağıntısı olması), 10 (kuyruk ile yığının arayüz olarak tanımı), 5 (kısmi sıra: topolojik sıralamanın zemini), 9 (temsil seçiminin maliyet tablosu)
- 17 ← 9 (Big-O sezgisi ve sınırları), 2 (niceleyici sırası: "her ε için bir N vardır" kalıbı), 6 (büyüme sınıflarının somut sayıları)
- 18 ← 4 (güçlü tümevarım ve parçalama adımı), 15 (mergesort yinelemesi T(n) = 2T(n/2) + Θ(n)), 17 (asimptotik tanımlar)

**Araştırma ihtiyacı:** 16 için doğrulanmış kaynaklar hazır. CLRS 4. baskı **20. bölüm (Elementary
Graph Algorithms)** kullanılabilir; MIT 6.006 Bahar 2020'nin **Lecture 9 (Breadth-First Search)**
ve **Lecture 10 (Depth-First Search)** notları aynı yolla indirilip okunabilir (PDF çözümleme
yöntemi aşağıda). Sedgewick & Wayne **4.1 (Undirected Graphs)** ve **4.2 (Directed Graphs)**
ikinci kaynak olarak kullanılabilir; 4.2 topolojik sıralamayı içerir. Faz C için CLRS 3
(Characterizing Running Times) ve 4 (Divide-and-Conquer) bölüm adları doğrulanmış durumdadır
(ARASTIRMA §9). CMPE250 sayfası 2026-08-30'da doğrulandı; makale 16 da aynı katalog tanımının
"Graphs" başlığına dayanır, dolayısıyla bir sonraki run'da yeniden çekilmesi gerekmez.
**CMPE300 sayfası Faz C açılmadan önce (makale 17 öncesinde) yeniden doğrulanmalıdır** — son
doğrulama 2026-08-29'dur ve Faz C'nin resmî dayanağı odur.

**PDF çözümleme yöntemi (Batch 3–4'te çalıştı):** OCW ders listesi sayfasındaki
`/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lecN/` adresi bir HTML
sayfasıdır; içindeki `..._MIT6_006S20_lecN.pdf` bağlantısı grep'le çıkarılıp indirilir, sonra
`pdftotext -layout` ile metne çevrilir (`/mingw64/bin/pdftotext` mevcut). Tablolar sütun kaymasıyla
çıkar; tablo değerleri metinden okunurken satır–sütun eşleşmesi elle denetlenmelidir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 13–15 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **16'da karşılanmalı (makale 15'in "Sırada ne var" sözü, en somut vaat):** grafın veri yapısı
  olarak ele alınması; **komşuluk listesi ile komşuluk matrisi** arasındaki seçimin "neyi
  ucuzlatmak için neyi pahalılaştırıyoruz?" sorusuyla yapılması; **BFS'in kuyrukla, DFS'in yığınla
  (ya da özyinelemeyle) yürümesi** — makale 10'un iki arayüzünün burada iki algoritmaya dönüşmesi;
  **bağlı bileşenler** (makale 7'nin "bağlılık bir denklik bağıntısıdır" sonucunun algoritmik
  karşılığı) ve **topolojik sıralama** (makale 5'in kısmi sıra ve bağımlılık grafı örneğinin
  karşılığı). Makale 7'nin el sıkışma lemması burada komşuluk listelerinin toplam uzunluğunun
  2·|E| olmasının gerekçesi olarak geri çağrılmalıdır.
- **17'de karşılanmalı:** O/Ω/Θ'nın formal tanımları (9'un açık borcu); makale 14 ve 15'in karar
  ağacı argümanlarında kullanılan "en az log₂ L yükseklik" adımının formal zemini.
- **Konu bazlı, numarasız pinler (13–15'ten):** öncelik kuyruğunun graf algoritmalarında kullanımı
  ve `azalt_anahtar` (13 → 23); d-yollu heap'in dallanma çarpanı takası (13 → 24); karar ağacı
  argümanının formal hâli (14, 15 → 24); rastgeleleştirmenin beklentiyi girdiden bağımsızlaştırması
  (14, 15 → 24 ve 36); kararlılığın veritabanı sıralamalarındaki karşılığı (15 → 39); dış sıralama
  ve blok modeli (15 → 34).
- Batch 0–3'ten devreden numarasız pinler: graf dolaşmaları ve bağlı bileşen (7), minimum kapsayan
  ağaç (7), O/Ω/Θ formal tanımları (9), ortalama durumun dağılım varsayımı → olasılık makalesi (9),
  girdi boyutunun sayı mı basamak mı olduğu → hesaplamanın sınırları (9), topolojik sıralama (5),
  sayılabilirlik → durma problemi (5), alt sınır ispatı (6), doğum günü ilkesinin olasılık hâli (6),
  zamanlayıcı kuyruğu ve çağrı yığını → işletim sistemleri fazı (10), disk tabanlı arama yapıları
  ve ayırma yöntemleri → dosya sistemleri (12), indeks = B-ağacı → veritabanları (12), bellek
  hiyerarşisi (9, 12).

**Görselleştirme öngörüsü:** 16: aynı graf üzerinde komşuluk listesi ↔ komşuluk matrisi
karşılaştırması, ve BFS ile DFS'in aynı graf üzerinde ürettiği farklı dolaşma ağaçları;
17: O/Ω/Θ'nın c·g(n) eğrileriyle ve n₀ eşiğiyle çizimi; 18: özyineleme ağacının seviye seviye
maliyet toplamı ve Master Teoreminin üç durumu.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı.
Kullanılabilir değişkenler: `--text`, `--text-muted`, `--text-faint`, `--border`, `--surface`,
`--surface-muted`, `--accent`, `--accent-soft`, `--cool`, `--cool-soft`.)

**Sözlü checkpoint tohumları:** "Bir grafı komşuluk listesiyle mi matrisle mi tutarsın, neye göre
karar verirsin?"; "BFS ile DFS aynı grafta neden farklı ağaçlar üretir ve hangisini ne zaman
seçersin?"; "Topolojik sıralama ne zaman vardır ve nasıl bulunur?"

**Araç sırası (Batch 1–4'te doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
2) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
3) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
4) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
5) denetleyicileri tekrar çalıştır. Gövdeyi sonradan düzenlersen 4. adımı yeniden çalıştır.
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır.
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez (hash yalnızca .md gövdesi üzerinden alınır),
ama diyagramı yeniden çekip görsel olarak denetlemek gerekir.

**Doğrulama sırası — iki farklı sunucu gerekiyor.** Browser paneli bu ortamda piksel ekran
görüntüsü veremiyor; hem render hem E2E headless Playwright ile yapılır ama **aynı sunucuyla
yapılamaz**:

1. Önce dev sunucusu varsa durdur, `pnpm build` çalıştır (zorunlu kapı, `.next`'i dev ile
   paylaşamaz).
2. **Render doğrulaması için:** `corepack pnpm exec next dev -p 3100 -H 127.0.0.1` — gate env'i
   **vermeden**; dev'de kapı devre dışı kalır ve makale sayfaları girişsiz açılır. Betikler
   gitignore'daki `artifacts/boun-render/` altındadır; bu batch'in sürümleri `shot-batch4.mjs`
   (27 kombinasyon + `/boun`) ve `figs-b4.mjs` (diyagram başına ekran görüntüsü, light + dark).
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
4. **Sunucuyu durdurmak:** `TaskStop` yetmez, süreç yaşamaya devam eder. `netstat -ano` ile
   3100'ü dinleyen PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalı; ardından portun
   gerçekten kapandığı doğrulanmalıdır.
5. **Paralel bir oturum aynı depoda `pnpm dev` çalıştırıyorsa 1–4 çalışmaz**: iki Next süreci
   `.next` dizinini paylaşır ve sayfalar "missing required error components, refreshing..." döner.
   Çalışan yalıtım: depoyu **aynı sürücüde** bir kopyaya çıkar (`tar` ile `node_modules`,
   `.next` ve `.git` hariç), kopyanın içindeki `node_modules` için depodakine bir dizin
   junction'ı kur (`cmd /c mklink /J`), sonra build, dev ve e2e'yi orada çalıştır
   (`PLAYWRIGHT_PORT=3101`). Junction farklı sürücüdeyse webpack mutlak yolları çözemez ve build
   patlar. Temizlikte **önce** junction'ı `cmd /c rmdir` ile kaldır; `rm -rf` junction'ı takip
   edip gerçek `node_modules`'ü silebilir. Bu run'da çakışma olmadığı için gerekmedi.

## Non-normative history

- **2026-08-30 (Batch 4, `BATCH=3+1`):** Makale 13–15 yayımlandı; Faz B'nin ikinci yarısı kuruldu
  ve CLRS 4. baskının yedi bölüm adı daha doğrulandı. Doğrulama: BOUN içerik + SVG + hash +
  entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 241/241, `pnpm build`
  başarılı (62 statik sayfa, 15'i `/boun`), global id/slug benzersizliği 55/55, Playwright
  21 geçti / 1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram ekran
  görüntüsüyle doğrulandı.
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
