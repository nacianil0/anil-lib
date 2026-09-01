# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-01 · Durum: **1–24 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24) · Sıradaki: 25**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 24 — `alt-sinirlar-olasiliksal-ve-paralel-algoritmalar` |
| Sıradaki güvenli başlangıç | Makale 25 ("NP-Tamlık: Hesaplamanın Sınırları") — **Faz C'nin son makalesi**; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 8` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–24 → `algorithms` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 7'de ne yapıldı

1. **Makale 22–24 yayımlandı** (`classification_batch: 7`), her biri 2 diyagramla ve 2 sözlü
   checkpoint kutusuyla. **Faz C'nin tasarım deseni üçlüsü kapandı** (20 parçala, 21 seç,
   22 hatırla) ve **analizin sınırları bölümü açıldı** (23 uygulama, 24 alt sınır/rastgelelik/
   paralellik). Geriye Faz C'den yalnızca 25 kaldı.
2. **Makale 22'nin başlığı değiştirildi.** Yol haritasındaki taslak başlık "Dinamik Programlama"
   idi; makalenin tezi "asıl zorluk kodda değil, alt problemi bulmakta" olduğu ve bu, 19'un
   "değişmezi keşfetmek ispatın zor kısmıdır" pinini ödediği için başlık
   **"Dinamik Programlama: Alt Problemi Bulmak"** oldu. 23 ve 24'ün taslak başlıkları **aynen
   korundu**. `roadmap.json` satırı `entegre-batch` çalıştırılmadan **önce** elle güncellendi.
3. **Üç eski borç kapandı.** (a) **13'ün `azalt_anahtar` borcu** 23'te ödendi (indeksli öncelik
   kuyruğu, çapraz bağlama, yalnızca yukarı sızdırma). (b) **14, 15 ve 17'nin ortak karar ağacı
   kuramı borcu** 24'te ödendi (model tanımı, iki adımlı alt sınır makinesi). (c) **CLRS 4. baskının
   14, 21 ve 22. bölüm adları** doğrulandı — aslında §8 bunları zaten doğrulamıştı, bu HANDOFF'un
   borç kaydı eskimişti; belge yine de yeniden indirilip içindekiler baştan okundu (ayrıntı
   ARASTIRMA §12).
4. **İki taslak beklenti düzeltildi ve kayda geçti.** (a) Yol haritası "23'te Master Teoremiyle
   maliyet savunması" diyordu; graf algoritmalarının maliyeti yineleme çözmekten değil işlem
   sayımından geldiği için Master Teoremi 23'te **kullanılmadı**. (b) "24'te değişim argümanı"
   bekleniyordu; alt sınır ispatları sayma argümanıdır, değişim değil. İkisi de kavram-tekrar
   defterinde açıkça düzeltildi.
5. **Yeni birincil kaynak keşfedildi:** HANDOFF paralel algoritmalar için 6.046J Bahar 2015'i
   işaret ediyordu; ders listesi okununca **o derste paralel algoritmalar dersi olmadığı** görüldü
   (19–20 *dağıtık* algoritmalardır). İş/açıklık çerçevesinin kanonik OCW kaynağı
   **6.172 Güz 2018, Lecture 7: Races and Parallelism**'dir ve makale 24 ona dayanır.
6. **6.006 Bahar 2020'nin hangi derslerinin DP olduğu doğrulandı:** 15, 16, 17, 18. Ayrıca en kısa
   yol dersleri 11 (Weighted Shortest Paths), 12 (Bellman-Ford), 13 (Dijkstra). Bu, HANDOFF'ta
   "doğrulanmalı" diye duran ikinci borcu kapatır.
7. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §12 sonundaki liste): naif Fibonacci
   çağrı sayıları sayaçla ölçüldü, ağırlıklı aralık çizelgeleme örneği **dört açgözlü kuralın
   dördünü birden kıracak** biçimde arandı ve optimalin tekliği kaba kuvvetle doğrulandı, LCS ve
   0/1 sırt çantası tabloları dolduruldu, MST ile en kısa yollar ağacının farklılığı Kruskal + Prim
   + Dijkstra ile üç ayrı yoldan gösterildi, Dijkstra'nın negatif kenarda çöktüğü kapalı kümeli bir
   gerçekleştirimle kanıtlandı, Bellman-Ford tabloları çevrimli ve çevrimsiz iki grafta üretildi,
   alt sınır sayıları hesaplandı, iyi eksen olasılığı üç boyutta sayıldı, Freivalds'ın hata oranı
   20.000 denemede ölçüldü (0,4985), iş/açıklık aritmetiği ve açgözlü çizelgeleyici oranı dört P
   değerinde denetlendi.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 21 → 24 sayfa. `src/`, `tests/` ve `tools/` altında **tek satır değişmedi**; bu batch
   yalnızca içerik ve dokümandır (`artifacts/` altındaki render betikleri gitignore'dadır).

## Açık borçlar

- **SOZLESME §5 güncellenmeli (kullanıcı onayı gerekir).** §5 hâlâ "Şu an platformda BOUN içerik
  sözleşmesi yoktur (0 makale)" diyor; bu artık yayımlanmış gerçekle çelişiyor (24 makale).
  Sözleşme yalnızca kullanıcının açık talebiyle değiştirilebildiği için bu run'da da dokunulmadı.
  Nihai kategori sözlüğü yukarıdaki tabloda ve YOL-HARITASI'ndadır.
- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları**
  hiçbir bölüm için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı; tam liste
  ARASTIRMA §12'de). Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf yapılır. **Makale 25 için yeni
  bir risk:** NP-tamlık bölümü *Selected Solutions* belgesinin kapsadığı 24. bölümün ötesindedir,
  dolayısıyla **bölüm numarası ve adı o belgeden doğrulanamaz.** 25'in kaynakçası CLRS'e ya hiç
  atıf yapmamalı ya da bölüm numarası vermeden atıf yapmalıdır.
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
  Adlandırma CLRS 2. bölümündendir ve bölüm adı doğrulanmıştır, ama üç adımın metni erişilebilir
  bir kaynakta görülemedi; kavramın kendisi 6.042'nin Değişmez İlkesiyle bağımsız olarak kuruldu.
  Erişilebilir bir CLRS örneği bulunursa atıf sıkılaştırılabilir.
- **Yönlü graflarda güçlü bağlı bileşenler makale 16'da bilinçli olarak dışarıda bırakıldı**
  (tanımı verildi, algoritması verilmedi) ve **23'te de açılmadı** (23 ağırlıklı problemlere
  odaklandı). 25'te indirgeme grafları tartışılırken açılmalıdır; **ters bitiş sırası algoritması**
  da aynı yerde ödenmeyi bekliyor.
- **Rastgeleleştirilmiş seçim algoritmasının beklenti analizi ödenmedi.** Yol haritası bunu 24'e
  pinlemişti; 24 aynı bağıntıyı (T(n) ≤ T(n/4) + T(3n/4) + 2cn) paranoyak hızlı **sıralama** ile
  ödedi. Medyan bulmanın olasılıksal hâli 36'ya (olasılık makalesi) devredildi.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, örneği verilmedi (LIS ve
  dönüşümlü madenî para oyunu 6.006'da bu tekniğin kanonik örnekleridir). 41'in prova
  makalesinde ya da 36'da bir örnekle açılabilir.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının diğer iki örneği
  (B-ağacı, doğrudan erişim dizisi) 24'te kullanıldı; d-yollu heap kullanılmadı.

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
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Bir makale gövdesi
  düzenlenip `sync-series-hashes.cjs --write` çalıştırıldıktan sonra **çalışmakta olan** dev
  sunucusu eski katalog hash'ini tutmaya devam eder ve `/boun/<slug>` 500 verir ("Katalog ile
  frontmatter uyuşmuyor") — diskteki iki değer birebir aynı olsa bile. Bu run'da bir kez oldu.
  Çözüm: gövdeyi düzenledikten ve hash'i senkronladıktan sonra **dev sunucusunu yeniden başlat**.
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()` edilmiş** hâlinin UTF-8 SHA-256'sıdır. Trim'i
  atlayan bir betik **24 makalenin hepsinde** sahte uyuşmazlık verir (bu run'da verdi).
- **Depoda satır sonları karışık ve `sync-series-hashes.cjs` buna duyarlıdır.** `core.autocrlf`
  repo düzeyinde `true`. Hash gövdenin **bayt** hâli üzerinden alındığı için taze bir checkout'ta
  LF dosyaların hash'i değişebilir. **Uygulama bundan etkilenmez**: `src/lib/content/articles.ts`
  katalogdaki `contentHash` ile frontmatter'daki `content_hash` **dizgelerini** karşılaştırır,
  gövdeden yeniden hesaplamaz. Bağımsız bir denetim betiği yazarken dosyayı
  **binary/`newline=""`** okumak gerekir.
- **Doküman dosyalarının satır sonu CRLF'tir.** `docs/seri-boun/*.md` üzerinde Python ile birebir
  metin değiştirirken dosya `newline=""` ile okunmalı ve arama dizgesindeki `\n` **`\r\n`** ile
  değiştirilmelidir; aksi hâlde çok satırlı hiçbir eşleşme tutmaz (bu run'da tuttu, çünkü betik
  buna göre yazıldı).
- **AI serisi paralel bir oturumda ilerliyor.** Bu run sırasında AI kataloğu 34'ten 38'e çıktı ve
  `content/series/articles/` altında git'te takipsiz dosyalar birikti. BOUN kapsamı dışıdır;
  `pnpm test` sayısı ve `check-series-*` dosya sayıları o oturumun ilerlemesiyle değişir.
  **Aynı depoda iki Next süreci `.next` dizinini paylaşır ve birbirini bozar** — doğrulama sırasına
  bak.
- `pnpm test:e2e` ve `playwright test` **kendi sunucusunu başlatamaz**: config'in `webServer`
  komutu `pnpm exec next dev` kullanıyor ve PATH'teki global pnpm depodaki placeholder
  `pnpm-workspace.yaml`'ı reddediyor ("packages field missing or empty"). Çözüm aşağıdaki
  "doğrulama sırası" bölümünde.
- **`TaskStop` Next dev sürecini öldürmez.** Arka planda başlatılan dev sunucusu, görev
  durdurulduktan sonra da 3100'ü dinlemeye devam eder; portu gerçekten boşaltmak için
  `netstat -ano` ile PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalıdır. Bu run'da üç
  kez yapıldı ve üçünde de portun kapandığı ayrıca doğrulandı.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor.**
  Uzun Markdown/SVG/Python blokları `Write` aracıyla dosyaya yazılmalı, sonra `cat >>` ya da
  `python <dosya>` ile çalıştırılmalıdır. Bu run'da bütün uzun bloklar bu yolla yazıldı.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML). Denetleyici bunu
  yakalamaz; bütün SVG'ler `xml.etree.ElementTree` ile ayrıca ayrıştırılarak denetlendi (48/48).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`.
  Font 13 için x = 20'den başlayan satır **en fazla ~97 karakter**, x = 375'ten başlayan satır
  **en fazla ~48 karakter** olabilir. Bu run'da dört satır bu sınırı aştı ve kısaltıldı.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri
  `PYTHONIOENCODING=utf-8` ile çalıştır.
- **Ortamda PDF'i görüntüye çeviren araç yok** (`pdftoppm`, `pymupdf`, `pdf2image` yok);
  `/mingw64/bin/pdftotext` ve Python `pypdf` var. **`pypdf`, `pdftotext`'in düşürdüğü matematik
  yazı tipini doğru çözer** — 6.042 gibi formül ağırlıklı PDF'lerde önce onu dene. Slayt tipi
  PDF'lerde (6.046J Güz 2005) her slayt bir öncekinin üstüne eklendiği için metin çok tekrarlıdır;
  satırları **ilk görülme sırasına göre tekilleştirmek** okunabilir bir özet verir.

## Bu run'da doğrulananlar

- İçerik/SVG/hash/entegrasyon denetleyicileri: BOUN **24 makale + 48 diyagram** temiz;
  `entegre-batch` kuru çalışması yeni 3 makaleyi buldu, `--write` sonrası fark kalmadı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü 24/24; başlık, slug, `article_id`, sıra, kohort,
  kategori ve klasör adı eşleşmesi 24/24; `reading_order` 1–24 kesintisiz; kohort dağılımı
  3/3/3/3/3/3/3/3; makale gövdelerinde referans verilen **48 SVG yolunun hepsi diskte mevcut ve
  diskte referanssız SVG yok**; roadmap'in "yayinda" kümesi katalogla birebir aynı (24 kayıt).
- **Global article-id ve slug benzersizliği**: run ortasındaki ölçümde **76/76** (18 ana + 34 AI +
  24 BOUN), run sonundaki ikinci ölçümde **80/80** (AI 38'e çıktığı için). BOUN tarafı iki ölçümde
  de aynıdır.
- `pnpm typecheck` temiz · `pnpm test` **291/291**, run sonunda **294/294** · `pnpm build` başarılı:
  entegrasyondan hemen sonra **83 statik sayfa**, run sonunda **87 statik sayfa** — aradaki fark
  BOUN'dan değil, paralel AI oturumunun kataloğu 34 → 38'e çıkarmasından gelir. **BOUN tarafı iki
  koşuda da aynıdır** (24 `/boun` yolu) ve her ikisinde de bütün testler geçti. Unit test sayısı
  sabit bir referans **değildir** (`series-assets.test.ts` asset klasörünü gezer ve AI serisi
  paralel büyüyor); sabit referans testlerin **tamamının** geçmesidir.
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = **27 kombinasyon** tarayıcıda açıldı, ayrıca `/boun` girişi üç genişlikte
  kontrol edildi. Her sayfada 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth`), raw anahtar / undefined sızıntısı yok, tek console
  hatası bilinen 503 sync çağrısı. 375px'te diyagramlar beklendiği gibi kendi kabında yatayda
  kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran
  görüntüsü). Bir düzeltme yapıldı: makale 22'nin 2. şeklindeki bağımlılık oklarından ikisi aynı
  satıra 2 birim arayla iniyordu ve okbaşları üst üste biniyordu; yaylar farklı şişkinlik ve
  farklı bitiş noktalarına ayrıldı, sonra yeniden çekilip denetlendi.
- **Kod bloğu render'ı ayrı doğrulandı:** makale 22'deki iki `pre` öğesi desktop ve mobile ×
  light ve dark kombinasyonlarında açıldı; JetBrains Mono, 13,44px, `overflow-x: auto`, sayfada
  yatay taşma yok, 375px'te blok kendi içinde kayıyor. Ekran görüntüleriyle gözle de denetlendi.
  Sözde kod biçimi makale 19'unkiyle hizalandı (numaralı satırlar, İngilizce kontrol sözcükleri,
  Türkçe yorumlar).
- **Playwright: 21 geçti, 1 atlandı, 4 başarısız** — dördü de "önceden-var" listesindedir ve BOUN
  içeriğiyle ilgisizdir: üçü `reader-data.spec.ts` (DATABASE_URL yok), biri `reader.spec.ts:231`
  (`Ekstra Geniş` strict-mode ihlali). Bu, Batch 1–6'nın referans sonucuyla birebir aynıdır.
- **Resmî sayfalar yeniden doğrulandı (2026-09-01):** CMPE250 ve CMPE300 sayfaları yeniden çekildi,
  ikisinin de metni değişmemişti; CMPE300'ün ders çıktılarında §10'un kaydetmediği bir amaç
  paragrafı bulundu ("the theory of parallel algorithms") ve ARASTIRMA §12'ye geçirildi.
- Bu run'da build, dev ve E2E **doğrudan depoda** çalıştırıldı; paralel AI oturumu bu sırada
  `pnpm dev` çalıştırmadığı için yalıtılmış kopyaya gerek kalmadı (kopya tarifi aşağıda duruyor).

## Sıradaki batch hazırlığı — Batch 8 (Makale 25'ten itibaren)

**Pedagojik hedef:** Makale 25 **Faz C'yi kapatır** ve serinin ilk üç fazını bir arada bağlar.
Makale 24'ün alt sınırı **bir modelin içindeydi** — karşılaştırma modelinde n log n'in altına
inilemez, ama modeli değiştirirsen inilir. 25 sınırı modelden alıp **problemin kendisine** taşır:
bazı problemler için hiçbir modelde hızlı algoritma bilinmiyor ve bazıları hiç çözülemiyor.
Makale 25 bittiğinde Faz D (26–35, işletim sistemleri) açılır ve serinin karakteri **kuramdan
sisteme** döner; 26'nın önkoşulları C'ye değil A ve B'ye bağlıdır.

**Prerequisite satırları (25–27 için taslak; YOL-HARITASI'nda da var):**
- 25 ← 24 (alt sınırın modele ait olması; şimdi problemin kendisine taşınıyor), 22 (sözde polinom:
  altküme toplamının O(nT) çözümü girdi boyutunda polinom değildir), 5 (sayılabilirlik ve
  hesaplanamayan fonksiyonlar → durma problemi), 2 (P ve NP tanımlarının niceleyici kalıbı),
  23 (indirgemelerin maliyet muhasebesi Θ(|V| + |E|) dilinde), 16 (güçlü bağlı bileşenler ve
  indirgeme grafları — 16'nın bilinçli olarak dışarıda bıraktığı konu)
- 26 ← (Faz D'nin giriş noktası; C'den bağımsız okunabilir), 19 (durum makinesi modeli), 2
  (kullanıcı/çekirdek modu ayrımının mantıksal ifadesi)
- 27 ← 26 (çekirdek, sistem çağrısı, kesme), 10 (çağrı yığını ve kuyruk arayüzleri), 19 (süreç
  durum makinesi ve korunan değişmez), 9 (bağlam anahtarının maliyeti)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE250 ve CMPE300 son olarak **2026-09-01**'de
doğrulandı ve Faz C boyunca geçerlidir. **Faz D açılmadan önce CMPE322 sayfası yeniden
doğrulanmalıdır** (son doğrulama 2026-08-29, §5). Akademik kaynaklar için hazır ipuçları:

- **25 için iki güçlü aday hazır:** 6.046J Bahar 2015 **Lecture 16: Complexity: P, NP,
  NP-completeness, Reductions** (ders listesi bu run'da okundu, PDF henüz indirilmedi) ve
  6.006 Bahar 2020 **Lecture 19: Complexity** (aynı biçimde). Sedgewick & Wayne'in
  **6.6 Intractability** sayfası (algs4.cs.princeton.edu/66intractability) üçüncü kaynaktır.
  Turing makinesi ve karar verilemezlik köprüsü için MIT **6.045J / 18.400J** OCW ders notları
  aranmalıdır; 6.042'nin ders kitabında Turing makinesi bölümü **yoktur**.
- **CLRS uyarısı:** NP-tamlık bölümü *Selected Solutions* belgesinin kapsadığı 24. bölümün
  ötesindedir; bölüm numarası ve adı o belgeden **doğrulanamaz**. Doğrulanmış bir kaynak
  bulunmadıkça 25'in kaynakçası CLRS'e bölüm numarası vermeden atıf yapmalı ya da hiç atıf
  yapmamalıdır.
- **Faz D (26'dan itibaren) için henüz hiçbir akademik kaynak okunmadı.** OCW'de 6.828 (Operating
  System Engineering) ve MIT'nin ders materyalleri; ayrıca Silberschatz *Operating System
  Concepts* ile OSTEP (*Operating Systems: Three Easy Pieces*, ücretsiz ve erişilebilir) doğal
  adaylardır. OSTEP bölümleri PDF olarak açıktır ve alıntılanabilir.

**PDF çözümleme yöntemi (Batch 3–7'de çalıştı):** OCW ders listesi sayfasındaki kaynak adresi bir
HTML sayfasıdır; içindeki `..._MIT6_006S20_lecN.pdf` (ya da `..._MIT6_046JS15_lecNN.pdf`,
`..._MIT6_172F18_lecN.pdf`, `..._lecN.pdf`) bağlantısı `grep -oE '/courses/[^"\\]*\.pdf'` ile
çıkarılıp `https://ocw.mit.edu` ön ekiyle indirilir. Güz 2005 dersinde bağlantılar doğrudan ders
listesi sayfasındadır; Bahar 2015, Güz 2011, Bahar 2020 ve 6.172'de önce `resources/<slug>/`
sayfası çekilmelidir (6.006'da slug `mit6_006s20_lecN`, tek istisna `mit6_006s20_lec18_pdf`).
Metne çevirmek için **önce `python -c "import pypdf"` ile `pypdf`'i dene**, formül yoksa
`/mingw64/bin/pdftotext -layout` daha okunaklı sütun düzeni verir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 22–24 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **25'te karşılanmalı (makale 22, 23 ve 24'ün ortak, en somut vaadi):** P ve NP tanımlarının
  niceleyici diliyle kurulması (2'nin kalıbı); indirgeme fikri ve maliyet muhasebesi (23'ün dili);
  **sözde polinomun NP-tamlıkla ilişkisi** (22'nin altküme toplamı örneği doğrudan oraya çıkıyor);
  **durma problemi ve karar verilemezlik** (5'in sayılabilirlik pini); **alt sınırın modelden
  probleme taşınması** (24'ün kapanış cümlesi bunu adıyla vaat etti); **güçlü bağlı bileşenler ve
  ters bitiş sırası algoritması** (16'nın ödenmemiş borcu); **yapıcı olmayan ispat** (3'ün pini,
  varlık argümanlarının algoritma vermemesi).
- **Konu bazlı, numarasız pinler (22–24'ten):** alt problem bağımlılık grafının şekli (22 → 25);
  bellekleme ile tablolama takası (22 → 33, 37); ebeveyn işaretçisiyle çözümü geri yürütmek
  (22 → 28); indeksli öncelik kuyruğu ve `azalt_anahtar` (23 → 28, 34); gevşetme ve üçgen
  eşitsizliği (23 → 31, 33); negatif çevrimde sorunun iyi tanımlı olmaması (23 → 25); aynı maliyet
  formülünün iki farklı algoritmayı yönetmesi (23 → 28); Monte Carlo ile Las Vegas (24 → 35, 36);
  iş ile açıklık ayrımı (24 → 27, 28, 37); açgözlü çizelgeleyici teoremi (24 → 28); Amdahl
  yasasının fazla iyimser olması (24 → 37).
- Batch 0–6'dan devreden numarasız pinler: ortalama durumun dağılım varsayımı → olasılık makalesi
  (9 → 36), doğum günü ilkesinin olasılık hâli (6 → 36), zamanlayıcı kuyruğu ve çağrı yığını →
  işletim sistemleri fazı (10 → 27–28), disk tabanlı arama yapıları ve ayırma yöntemleri → dosya
  sistemleri (12 → 34), indeks = B-ağacı → veritabanları (12 → 39), bellek hiyerarşisi (9, 12 → 37),
  d-yollu heap (13 → ödenmedi), kararlılığın veritabanı karşılığı (15 → 39), dış sıralama (15 → 34),
  Boolean sadeleştirme (8 → 37, 39), Hasse diyagramı (8 → 16'da ödendi), önek-serbest kod ve bit
  muhasebesi (21 → 34, 39), durum makinesi ve korunan değişmez (19 → 26–27, 29, 31), kısmi doğruluk
  ↔ sonlanma (19 → 29–31), azalan ölçü (19 → 31).

**Görselleştirme öngörüsü:** 25: **indirgeme oku şeması** — A ≤ₚ B okunun yönü ve "B kolaysa A da
kolay / A zorsa B de zor" çift okuması, yanında bir yanlış yön örneği; ve **P, NP, NP-tam, NP-zor
kümelerinin kapsama şeması** (P ≠ NP varsayımı altında ve P = NP durumunda iki panel hâlinde —
bu ikinci panel mülakatta çok sorulan bir ayrımı görünür kılar). 26: kullanıcı modu / çekirdek modu
geçişlerinin durum makinesi; sistem çağrısının yaşam döngüsü. 27: süreç durum makinesi (hazır,
çalışan, bekleyen) ve PCB alanları; süreç ile iş parçacığının bellek düzeni karşılaştırması.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`. Satır uzunluğu sınırı için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (25):** "P ile NP'yi tanımla ve P = NP olsaydı ne değişirdi, anlat";
"Bir problemin NP-tam olduğunu nasıl gösterirsin — indirgemenin yönü hangisidir ve neden?";
"Sözde polinom bir algoritma neden problemi kolay yapmaz?".

**Araç sırası (Batch 1–7'de doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch`
   roadmap başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz**,
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen 5. adımı yeniden çalıştır ve
   çalışan dev sunucusunu yeniden başlat** (önbellek notu "bilinen sorunlar"da).
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır ve
kategori `src/lib/content/schema.ts` ile `labels.ts` içinde zaten tanımlı olmalıdır
(`operating-systems` ve `supporting-fundamentals` tanımlıdır; **Faz D'nin ilk makalesi yeni bir
klasör açacaktır ama kod değişikliği istemez**).
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez (hash yalnızca .md gövdesi üzerinden alınır),
ama diyagramı yeniden çekip görsel olarak denetlemek gerekir.

**Doğrulama sırası — iki farklı sunucu gerekiyor.** Browser paneli bu ortamda piksel ekran
görüntüsü veremiyor; hem render hem E2E headless Playwright ile yapılır ama **aynı sunucuyla
yapılamaz**:

1. Önce dev sunucusu varsa durdur, `pnpm build` çalıştır (zorunlu kapı, `.next`'i dev ile
   paylaşamaz).
2. **Render doğrulaması için:** `corepack pnpm exec next dev -p 3100 -H 127.0.0.1` — gate env'i
   **vermeden**; dev'de kapı devre dışı kalır ve makale sayfaları girişsiz açılır. Betikler
   gitignore'daki `artifacts/boun-render/` altındadır; bu batch'in sürümleri `shot-batch7.mjs`
   (27 kombinasyon + `/boun`), `figs-b7.mjs` (diyagram başına ekran görüntüsü, light + dark) ve
   `pre-b7.mjs` (kod bloğu denetimi). Üçü de taban adresi `RENDER_BASE` ortam değişkeninden alır ve
   slug listesi başta durur — sonraki batch için tek yapılacak şey o üç satırı `sed` ile
   değiştirmektir (`pre-b7.mjs`'te ayrıca beklenen `pre` sayısı vardır).
   Tema, `localStorage["anil-lib:reader-preferences:v1"]` içine tam `preferencesSchema` nesnesi
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

- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni
  üçlüsü kapandı ve analizin sınırları bölümü açıldı**, geriye yalnızca 25 kaldı. Makale 22'nin
  taslak başlığı pedagojik gerekçeyle genişletildi; 13'ün `azalt_anahtar` borcu ile 14–15–17'nin
  ortak karar ağacı kuramı borcu ödendi; CLRS bölüm adı ve 6.006 DP ders numarası borçları
  kapandı; paralel algoritmalar için yeni birincil kaynak (6.172 Güz 2018 Lecture 7) bulundu ve
  yol haritasının iki taslak beklentisi (23'te Master Teoremi, 24'te değişim argümanı) yayımlanmış
  gerçeğe göre düzeltildi. Doğrulama: BOUN içerik + SVG + hash + entegrasyon denetleyicileri temiz
  (24 makale, 48 diyagram) ve bağımsız bir Python denetimi 24/24 eşleşme verdi, `pnpm typecheck`
  temiz, `pnpm test` 291/291 (run sonunda 294/294), `pnpm build` başarılı (83, run sonunda 87
  statik sayfa; 24'ü `/boun`), global id/slug benzersizliği 76/76 ve run sonunda 80/80,
  Playwright 21 geçti / 1 atlandı / 4 önceden-var başarısız,
  27 render kombinasyonu, 6 diyagram (light + dark) ve 2 kod bloğu (desktop + mobile × light + dark)
  ekran görüntüsüyle doğrulandı; CMPE250 ve CMPE300 sayfaları yeniden çekilip değişmedikleri
  görüldü.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme
  üçlüsü kapandı ve tasarım deseni bölümü açıldı**. Makale 20'nin taslak başlığı pedagojik
  gerekçeyle genişletildi, seride ilk kez fenced kod bloğu kullanıldı (kod değişikliği gerekmedi)
  ve Batch 5'ten kalan Master Teoremi ε borcu `pypdf` ile kapatıldı. Doğrulama: BOUN içerik + SVG
  + hash + entegrasyon denetleyicileri temiz (21 makale, 42 diyagram), `pnpm typecheck` temiz,
  `pnpm test` 277/277, `pnpm build` başarılı (21'i `/boun` olmak üzere 76, ikinci koşuda 80 statik
  sayfa), global id/slug benzersizliği 69/69 ve run sonunda 73/73, Playwright 21 geçti / 1 atlandı
  / 4 önceden-var başarısız, 27 render kombinasyonu, 6 diyagram (light + dark) ve 3 kod bloğu
  (desktop + mobile × light + dark) ekran görüntüsüyle doğrulandı.
- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**
  ve `algorithms` kategori klasörü kod değişikliği olmadan devreye girdi. CMPE300 sayfası yeniden
  doğrulandı ve katalog tanımı ile ders çıktıları ayrımı kayda geçti. Doğrulama: BOUN içerik + SVG
  + hash + entegrasyon denetleyicileri temiz, `pnpm typecheck` temiz, `pnpm test` 256/256,
  `pnpm build` başarılı (69 statik sayfa, 18'i `/boun`), global id/slug benzersizliği 62/62,
  Playwright 21 geçti / 1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu ve 6 diyagram
  ekran görüntüsüyle doğrulandı.
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
