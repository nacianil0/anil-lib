# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-03 · Durum: **1–27 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27) · Sıradaki: 28**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 27 — `surecler-ve-is-parcaciklari` |
| Sıradaki güvenli başlangıç | Makale 28 ("CPU Zamanlama") — **Faz D'nin gövdesi**; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 9` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–27 → `operating-systems` (klasör adı `category` alanıyla birebir aynı) |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 8'de ne yapıldı

1. **Makale 25–27 yayımlandı** (`classification_batch: 8`), her biri 2 diyagram ve 2 sözlü
   checkpoint kutusuyla; 25'te ayrıca bir sözde kod bloğu var. **Faz C kapandı** (25) ve
   **Faz D açıldı** (26–27); `operating-systems` kategori klasörü **kod değişikliği olmadan**
   devreye girdi (`schema.ts` ve `labels.ts` kategoriyi zaten tanımlıyordu).
2. **Üç taslak başlığın üçü de aynen korundu.** Bu yüzden `roadmap.json`'da elle başlık
   düzeltmesi gerekmedi; `entegre-batch` kuru çalışması doğrudan temiz geçti.
3. **Beş eski borç kapandı.** (a) **16'nın güçlü bağlı bileşenler ve ters bitiş sırası borcu**
   25'te ödendi (Kosaraju-Sharir, sekiz düğümlü somut graf, yoğunlaştırma DAG'ı, 2-SAT
   uygulaması). (b) **5'in sayılabilirlik pini** 25'te ödendi (program sayılabilir, problem
   sayılamaz → durma problemi). (c) **3'ün yapıcı olmayan ispat pini** 25'te ödendi. (d) **22'nin
   sözde polinom pini** 25'te zayıf/güçlü NP-tamlık ayrımıyla ödendi. (e) **CMPE322 sayfası**
   yeniden doğrulandı (Faz D'nin açılış koşuluydu).
4. **Bir taslak beklenti düzeltildi ve kayda geçti.** Yol haritası 25 için "indirgeme grafları"
   diyordu; makale güçlü bileşenleri **yoğunlaştırma (condensation / kernel DAG)** adıyla kullandı,
   "indirgeme grafı" terimi kullanılmadı. Kavram-tekrar defterinde açıkça düzeltildi.
5. **Yeni birincil kaynak keşfi:** HANDOFF, 16'nın SCC borcu için MIT 6.006'yı işaret ediyordu;
   **6.006 Bahar 2020'de güçlü bağlı bileşen dersi olmadığı** doğrulandı (20 ders başlığı tek tek
   okundu; tanım yalnızca Recitation 9'da geçer, algoritma verilmez). Borcun birincil kaynağı
   **Sedgewick & Wayne 4.2 Directed Graphs** oldu; aynı sayfanın Q+A bölümü, iki DFS geçişinin
   sırasının değiştirilebilir olduğunu doğruladığı için 16'nın "ters bitiş sırası" dili korunabildi.
6. **CLRS riski bertaraf edildi.** HANDOFF, 25'in kaynakçasının CLRS'e bölüm numarası vermeden
   atıf yapması ya da hiç atıf yapmaması gerektiğini söylüyordu; **makale 25 CLRS'e hiç atıf
   yapmadı.**
7. **Bütün sayısal iddialar bağımsız hesaplandı** (ARASTIRMA §13 sonundaki 12 maddelik liste):
   sözde polinom aritmetiği, polinom/üstel karşılaştırma, indirgeme bileşimi, 3-SAT örneği,
   bağımsız küme ↔ düğüm örtüsü tümleyen eşitliği, 3SAT ≤p bağımsız küme indirgemesi **iki
   yönden** (sağlanabilir ve sağlanamaz formülle), Kosaraju-Sharir'in çıktısı kaba kuvvet
   karşılıklı erişilebilirlikle, 2-SAT kararı dört formülde kaba kuvvetle, 2-boyama/3-boyama eşiği,
   bağlam anahtarının çevrim aritmetiği, zamanlayıcı kesmesi ek yükü ve yarış koşulu kayıp oranları.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 24 → 27 sayfa. **`src/`, `tests/` ve `tools/` altında tek satır değişmedi**; bu batch
   yalnızca içerik ve dokümandır (`artifacts/` altındaki render betikleri gitignore'dadır).

## Açık borçlar

- **SOZLESME §5 borcu kapandı (2026-09-03, v1.1).** Kullanıcının sözleşme güncelleme talebini
  taşıyan bağımsız editoryal/akademik denetimde (Fable 5.1, tek oturum) "0 makale" metni
  yayımlanmış gerçekle değiştirildi; kategori sözlüğü ve kurulu denetleyiciler artık §5'te.
  Aynı denetimde 1–27 baştan sona okundu, 54 SVG'nin etiketleri metinle karşılaştırıldı, sayısal
  örnekler yeniden hesaplandı; tek içerik düzeltmesi 2'de "koşullu doğruluktaki önerme
  (contingency)" → "olumsal önerme (contingency)" (aynı makaledeki "koşullu önerme (conditional)"
  ile terim çakışması); terim defterine eklendi, `content_hash` yeniden senkronlandı. BOUN'da
  numaralı ileri gönderme yok (konu adıyla gönderme kuralı §2'ye yazıldı). Yeni kalıcı ilkeler:
  SOZLESME §2 (gönderme biçimi, İngilizce karşılıklar bloğu, terim çakışması, kalıp yasağı),
  §3 (koşullu omurga, ikinci soruyu önceden karşılama, cevap sıraları, model bilinci) ve §8.
- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları**
  hiçbir bölüm için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı; tam liste
  ARASTIRMA §12'de). Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf yapılır. Faz D makalelerinin
  ders kitabı karşılığı zaten Silberschatz'tır ve **onun bölüm ile alt bölüm adları resmî
  içindekiler PDF'inden doğrulanmıştır** (ARASTIRMA §13).
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
  Adlandırma CLRS 2. bölümündendir ve bölüm adı doğrulanmıştır, ama üç adımın metni erişilebilir
  bir kaynakta görülemedi; kavramın kendisi 6.042'nin Değişmez İlkesiyle bağımsız olarak kuruldu.
- **OSTEP Chapter 5 (Process API, `cpu-api.pdf`) indirilmedi.** `fork()`, `exec()` ve `wait()`
  anlatımı oradadır; makale 27 süreç API'sini yalnızca soyut düzeyde (Create/Destroy/Wait/Status)
  verdi. Süreç yaratma somutlaştırılacaksa (28'in girişi ya da 38) o bölüm gerekir.
- **Rastgeleleştirilmiş seçim algoritmasının beklenti analizi ödenmedi** (24 aynı bağıntıyı
  paranoyak hızlı sıralamayla ödemişti); 36'ya devredildi.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, örneği verilmedi. 36 ya da
  41'de açılabilir.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının diğer iki örneği
  (B-ağacı, doğrudan erişim dizisi) 24'te kullanıldı; d-yollu heap kullanılmadı.
- **Cook-Levin teoremi yalnızca sezgi düzeyinde verildi** (devre argümanı); ispat yapılmadı,
  bilinçli kapsam kararıdır.
- **Çekirdek içi eşzamanlılık (kesme sırasında kesme) 26'da yalnızca anıldı**; 29'da açılmalıdır.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı takipsiz dosyalar var** (ör. kesme işareti içeren
  `**zorundadır**.` benzeri adlar, kök dizinde). BOUN kapsamı dışıdır, bu run'da dokunulmadı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer.
  Bu yüzden canlı sync uçtan uca denenemez ve `tests/e2e/reader-data.spec.ts` içindeki **üç test
  bu nedenle başarısızdır**. `validArticleIds` birleşimi kod düzeyinde doğrulandı.
- **`.env.local` artık var ve dev sunucusunda parola kapısını AÇIYOR.** Batch 7 HANDOFF'undaki
  "gate env'i vermeden başlat, dev'de kapı devre dışı kalır" notu **artık geçersizdir**: `.env.local`
  `SITE_PASSWORD_SHA256` ve `AUTH_COOKIE_SECRET` tanımlar, dolayısıyla `/boun` 307 döner.
  **Doğru yol:** sunucuyu `playwright.config.ts`'teki test değerleriyle başlat
  (`SITE_PASSWORD_SHA256=2e10d696…f2cef855`, `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`;
  kabuk env'i `.env.local`'i ezer) ve render betiklerinde **giriş yap**: kullanıcı `anil`, parola
  `test-reader-pass` (SHA-256'sı config'teki hash'e birebir eşittir, doğrulandı). `DATABASE_URL`
  yokken `authenticate.ts` tek hesaplı env kapısına düşer ve `anil` dışındaki kullanıcı adları
  reddedilir.
- **Çerez ana bilgisayarı önemlidir.** Giriş sonrası uygulama `localhost`'a yönlendiriyor;
  `127.0.0.1` üzerinde kurulan çerez `localhost` isteklerine **gönderilmez** ve sayfa sessizce
  `/login`'e döner. Render betiklerinde taban adres baştan sona **`http://localhost:<port>`**
  olmalıdır.
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık
  kalır) ve 90 sn timeout'a düşer. Giriş için `page.waitForNavigation()` + kısa `waitForTimeout`
  kullan. Bu run'da çalışan desen: bir kez giriş yap, `ctx.storageState({path})` ile kaydet,
  bütün context'leri `storageState` ile aç.
- **Paralel AI oturumu aynı depoda `pnpm dev` çalıştırıyor (bu run'da 3200 ve 3300 portlarında).**
  İki Next süreci `.next` dizinini paylaşır ve birbirini bozar. Bu run'daki somut belirti:
  `/boun` 200 dönerken `/boun/<slug>` **500** verdi ve dev logunda
  `PageNotFoundError: Cannot find module for page: /boun/[slug]/page` göründü. **Bu, katalog
  önbelleği sorunu DEĞİLDİR** (aşağıdaki maddeyle karıştırma); çözümü yalıtılmış kopyadır ve
  **artık isteğe bağlı değil, zorunludur**.
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Bir makale gövdesi
  düzenlenip `sync-series-hashes.cjs --write` çalıştırıldıktan sonra **çalışmakta olan** dev
  sunucusu eski katalog hash'ini tutar ve `/boun/<slug>` 500 verir ("Katalog ile frontmatter
  uyuşmuyor") — diskteki iki değer birebir aynı olsa bile. Çözüm: dev sunucusunu yeniden başlat.
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır
  (`sync-series-hashes.cjs:60`). Trim'i atlayan bir betik bütün makalelerde sahte uyuşmazlık verir.
- **Depoda satır sonları karışık ve hash bayt üzerinden alınır.** `core.autocrlf` repo düzeyinde
  `true`. **Uygulama bundan etkilenmez**: `articles.ts` katalogdaki `contentHash` ile
  frontmatter'daki `content_hash` **dizgelerini** karşılaştırır, gövdeden yeniden hesaplamaz.
  Bağımsız bir denetim betiği dosyayı **binary** okumalıdır.
- **Doküman dosyalarının satır sonları farklıdır:** `ARASTIRMA.md` ve `YOL-HARITASI.md` **CRLF**,
  `HANDOFF.md` **LF**'tir. Python ile birebir metin değiştirirken dosyayı binary okuyup arama
  dizgesindeki `\n`'leri hedef dosyanın satır sonuna çevirmek gerekir; aksi hâlde çok satırlı
  hiçbir eşleşme tutmaz.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor.**
  Uzun Markdown/SVG/Python blokları `Write` aracıyla dosyaya yazılmalı, sonra çalıştırılmalıdır.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz** (yol dönüşümü nedeniyle cmd etkileşimli açılır).
  Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML). Denetleyici bunu
  yakalamaz; bütün SVG'ler `xml.etree.ElementTree` ile ayrıca ayrıştırılarak denetlendi (52/52).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**;
  iki panelli bir şemada sol panel metni ~48, x = 378'den başlayan sağ panel metni ~48 karakter
  olabilir. Bu sınır tasarım aşamasında hesaba katılmalıdır.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri
  `PYTHONIOENCODING=utf-8` ile çalıştır.
- **Ortamda PDF'i görüntüye çeviren araç yok** (`pdftoppm`, `pymupdf`, `pdf2image` yok);
  `/mingw64/bin/pdftotext` ve Python `pypdf` var. **`pypdf`, `pdftotext`'in düşürdüğü matematik
  yazı tipini doğru çözer** — formül ağırlıklı PDF'lerde önce onu dene. Bazı OCW slaytlarında
  ToUnicode eşlemesi bozuktur ve semboller yanlış karaktere düşer; 6.006 lec19 için doğrulanmış
  eşlemeler ARASTIRMA §13'tedir.
- **OCW CDN'i bazen yanlış sayfayı önbellekten döndürüyor.** Doğru içeriği almak için
  `Cache-Control: no-cache` başlığı, tarayıcı User-Agent'ı ve cache-buster sorgusu gerekir.

## Bu run'da doğrulananlar

- İçerik/SVG denetleyicileri: BOUN **27 makale + 54 diyagram** temiz. `entegre-batch` kuru
  çalışması 3 yeni makaleyi buldu, `--write` sonrası fark kalmadı; `sync-series-hashes --write`
  altı yeri (3 frontmatter + 3 katalog) yazdı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü **27/27**; `article_id`, başlık, slug, kategori,
  seviye, sıra, kohort ve klasör adı eşleşmesi 27/27; katalog `path` alanları doğru;
  `reading_order` **1–27 kesintisiz**; kohort dağılımı **3/3/3/3/3/3/3/3/3**; gövdelerde referans
  verilen **54 SVG'nin hepsi diskte ve diskte referanssız SVG yok**; roadmap'in "yayinda" kümesi
  katalogla birebir aynı (27 kayıt).
- **Global article-id ve slug benzersizliği:** run ortasında **83/83** (18 ana + 38 AI + 27 BOUN),
  run sonunda **87/87** (AI 42'ye çıktığı için); ikisi de tam benzersiz, BOUN tarafı iki ölçümde de
  aynıdır.
- `pnpm typecheck` temiz · `pnpm test` run ortasında **407/407**, run sonunda **419/419**
  (27 test dosyası) · `pnpm build` başarılı: entegrasyondan hemen sonra **87 statik sayfa**, run
  sonunda **91 statik sayfa**. Aradaki fark BOUN'dan değil, paralel AI oturumunun kataloğu 38 →
  42'ye çıkarmasından gelir; **BOUN tarafı üç koşuda da aynıdır (27 `/boun` yolu)** ve üçünde de
  bütün testler geçti. Build ayrıca yalıtılmış kopyada da çalıştırıldı ve orada da 87/87 verdi.
  Unit test sayısı ve toplam sayfa sayısı sabit referans **değildir**; sabit referans testlerin
  **tamamının** geçmesi ve `/boun` yol sayısının katalogla eşleşmesidir.
- **Gerçek render (ekran görüntülü):** üç yeni makale, üç genişlik (375 / 768 / 1440) × üç tema
  (light / dark / sepia) = **27 kombinasyon** tarayıcıda açıldı, ayrıca `/boun` girişi üç
  genişlikte kontrol edildi. Her makale sayfasında 2 inline SVG, doğru figcaption, yatay taşma yok
  (`documentElement.scrollWidth == innerWidth` her kombinasyonda), raw anahtar / `undefined` /
  `NaN` sızıntısı yok, tek console hatası bilinen 503 sync çağrısı. 375px'te diyagramlar kendi
  kabında yatayda kayıyor (clientWidth 298 / scrollWidth 544), sayfa kaymıyor. Betiğin kendi
  sorun listesi: **"Sorun yok."**
- **Not:** makale sayfalarında `main h1` **yoktur** (başlık `document.title`'dadır); bu davranış
  yayımlanmış makale 24 ile karşılaştırılarak doğrulandı — regresyon değil, serinin mevcut deseni.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran
  görüntüsü) ve **iki düzeltme yapıldı**: (a) makale 25'in 2. şeklinde "saglanabilir" yazım hatası
  "sağlanabilir" olarak düzeltildi; (b) makale 27'nin 1. şeklinde "giriş/çıkış bitti" etiketi
  ENGELLENMİŞ → HAZIR okunun üstüne biniyordu, sağa kaydırıldı. İkisi de yeniden çekilip
  doğrulandı (`artifacts/boun-render/figs-b8b`).
- **Kod bloğu render'ı ayrı doğrulandı:** makale 25'teki tek `pre` öğesi desktop ve mobile ×
  light ve dark kombinasyonlarında açıldı; JetBrains Mono, 13,44px, `overflow-x: auto`, 9 satır,
  sayfada yatay taşma yok, 375px'te blok kendi içinde kayıyor (clientW 333 / scrollW 705).
- **Playwright: 31 geçti, 1 atlandı, 9 başarısız.** Batch 7'nin referansı 21/1/4'tü; fark, paralel
  AI oturumunun `tests/e2e/reader-resume.spec.ts` dosyasını eklemesi ve `reader.spec.ts` ile
  `reader-data.spec.ts`'i değiştirmesidir. **Dokuzunun hiçbiri BOUN kaynaklı değildir ve bu
  deneysel olarak kanıtlandı:** aynı ağaçtan Batch 8 içeriği çıkarılıp (katalog ve roadmap HEAD'e
  döndürülüp, 3 makale ve 3 asset klasörü silinip) test tekrar koşuldu ve **sekizi birebir aynı
  şekilde başarısız oldu**. Dokuzuncusu (`reader-resume.spec.ts:139`) **kararsızdır (flaky)**:
  Batch 8 içerideyken üç kez koşuldu, iki kez düştü bir kez geçti. Ayrıca başarısız spec
  dosyalarının hiçbiri `/boun` ya da `series-boun` geçmiyor (grep ile doğrulandı) ve bu batch
  `src/`, `tests/`, `tools/` altında hiçbir dosyaya dokunmadı.
- **Resmî sayfa yeniden doğrulandı (2026-09-02):** CMPE322 sayfası yeniden çekildi, katalog
  tanımının metni değişmemişti; sayfada *Course Learning Outcomes* bölümü **bulunmadığı** kayda
  geçti (CMPE300'den farkı budur).
- Bu run'da build ve E2E **yalıtılmış kopyada** çalıştırıldı (aşağıdaki doğrulama sırası), çünkü
  paralel oturum aynı depoda iki dev sunucusu çalıştırıyordu.

## Sıradaki batch hazırlığı — Batch 9 (Makale 28'den itibaren)

**Pedagojik hedef:** Makale 26 "makine kime ait", 27 "çalışan program nedir" sorusunu cevapladı ve
iki soruyu açıkta bıraktı: hazır kümesinden **hangisi** seçilecek (ilke) ve kritik kesim **nasıl**
korunacak (doğruluk). Makale 28 birinciyi, 29–30 ikinciyi cevaplar. 28, Faz C'nin analiz
takımının işletim sistemine taşındığı ilk yerdir: ölçüt tanımlamak, kuralları karşı örnekle
kırmak ve bir çizelgeleyicinin "yeterince iyi" olduğunu ispatlamak aynı reflekslerdir.

**Prerequisite satırları (28–30 için taslak; YOL-HARITASI'nda da var):**
- 28 ← 27 (süreç durum makinesi, hazır kümesi, bağlam anahtarının maliyeti), 13 (öncelik kuyruğu:
  öncelikli ve çok seviyeli zamanlamanın veri yapısı), 21 (açgözlü seçim kuralı ve karşı örnekle
  kırma refleksi), 24 (açgözlü çizelgeleyici teoremi ve "optimalin en fazla iki katı" kalıbı),
  9 (ortalama durum ile en kötü durum ayrımı; ölçüt seçimi)
- 29 ← 27 (yarış koşulu, kritik kesim, karşılıklı dışlama, atomiklik — problem orada kuruldu),
  19 (korunan değişmez dili: bir kilidin ne söz verdiği değişmezle yazılır), 26 (kesmelerin
  kapatılması ayrıcalıklı bir işlemdir), 2 (kritik kesim koşullarının niceleyicili ifadesi)
- 30 ← 29 (kilit, semafor ve monitör), 10 (tampon bir kuyruktur; üretici-tüketici), 19 (değişmez
  ve sonlanma ayrımı: canlılık ile güvenlik)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE322 **2026-09-02**'de doğrulandı ve Faz D
boyunca geçerlidir. Faz D'nin resmî dayanağı yalnızca *Catalog Description*'dır (sayfada ders
çıktıları bölümü yoktur). Akademik kaynaklar için hazır ipuçları:

- **OSTEP bölümleri doğrudan indirilebilir** ve bu run'da dört bölümü sorunsuz alındı. 28 için
  gerekenler: `cpu-sched.pdf` (Ch. 7, Scheduling: Introduction — FIFO/SJF/STCF/RR, dönüş süresi ve
  tepki süresi ölçütleri), `cpu-sched-mlfq.pdf` (Ch. 8, Multi-Level Feedback Queue),
  `cpu-sched-lottery.pdf` (Ch. 9, Proportional Share), `cpu-sched-multi.pdf` (Ch. 10,
  Multiprocessor Scheduling). 29–30 için: `threads-locks.pdf` (Ch. 28), `threads-cv.pdf` (Ch. 30),
  `threads-sema.pdf` (Ch. 31 — üretici-tüketici, okuyucu-yazar, yemek yiyen filozoflar hepsi
  oradadır). Taban adres: `https://pages.cs.wisc.edu/~remzi/OSTEP/<dosya>.pdf`.
- **Eksik kalan bölüm:** `cpu-api.pdf` (Ch. 5, Process API) — 27'nin ödenmemiş borcu.
- **xv6 kitabı** (`https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf`) indirildi ve
  ham metni çıkarıldı; Ch. 7 (Scheduling) ve Ch. 6 (Locking) 28–29 için doğal kaynaktır.
- **Silberschatz** resmî içindekiler PDF'i doğrulandı; 28 için Chapter 5 (CPU Scheduling) ve alt
  bölümleri (5.1 Basic Concepts, 5.2 Scheduling Criteria, 5.3 Scheduling Algorithms, 5.4 Thread
  Scheduling, 5.5 Multi-Processor Scheduling, 5.6 Real-Time CPU Scheduling, 5.8 Algorithm
  Evaluation) **ad düzeyinde atıf yapılabilir** durumdadır.

**PDF çözümleme yöntemi (Batch 3–8'de çalıştı):** OCW ders listesi sayfasındaki kaynak adresi bir
HTML sayfasıdır; içindeki `..._MIT6_006S20_lecN.pdf` (ya da `..._MIT6_046JS15_lecNN.pdf`,
`..._MIT6_045JS11_lecNN.pdf`, `..._MIT6_172F18_lecN.pdf`) bağlantısı
`grep -oE '/courses/[^"\\]*\.pdf'` ile çıkarılıp `https://ocw.mit.edu` ön ekiyle indirilir.
Bahar 2015, Güz 2011, Bahar 2011, Bahar 2020 ve 6.172'de önce `resources/<slug>/` sayfası
çekilmelidir. OSTEP ve xv6'da böyle bir dolaylama yoktur, PDF doğrudan indirilir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 25–27 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **28'de karşılanmalı (27'nin en somut vaadi):** çizelgeleyicinin adı ve kararı; zaman dilimi ile
  ek yük arasındaki takas (27 bunu sayıyla açtı: 6 µs'lik anahtar, 10 ms'lik dilimde %0,06);
  öncelik kuyruğunun öncelikli zamanlamadaki rolü (13 → 28); açgözlü çizelgeleyici teoreminin
  "optimalin en fazla iki katı" kalıbının bir ölçüt savunmasına uygulanması (24 → 28); aynı
  iskeletin farklı kurallarla ayrışması (23'ün "aynı maliyet formülü iki algoritmayı yönetir"
  pini); zamanlayıcı kuyruğu (10 → 28).
- **29–30'da karşılanmalı (27'nin açıkta bıraktığı problem):** kritik kesim gereksinimleri,
  kilit/semafor/monitör, üretici-tüketici, okuyucu-yazar, yemek yiyen filozoflar; kilidin
  sözünün **korunan değişmez** diliyle yazılması (19 → 29); çekirdek içi eşzamanlılık (26'nın
  "kesme sırasında kesme" pini).
- **Konu bazlı, numarasız pinler (25–27'den):** indirgemenin yönü (25 → 41); güçlü bağlı bileşenler
  ve yoğunlaştırma (25 → 34, 39); 2 ile 3 arasındaki eşik (25 → 36); sanallaştırma/eşzamanlılık/
  kalıcılık üçlüsü (26 → Faz D'nin iskeleti); ilke ile düzenek ayrımı (26 → 28, 33, 35); tuzak ile
  kesme ayrımı (26 → 32–33, sayfa hatası bir tuzaktır); monolitik/mikroçekirdek takası (26 → 35);
  bağlam anahtarının çevrim cinsinden ucuzlamaması (27 → 37); süreç ile iş parçacığı bellek düzeni
  (27 → 32, 38).
- Batch 0–7'den devreden numarasız pinler: ortalama durumun dağılım varsayımı → olasılık makalesi
  (9 → 36), doğum günü ilkesinin olasılık hâli (6 → 36), disk tabanlı arama yapıları ve ayırma
  yöntemleri → dosya sistemleri (12 → 34), indeks = B-ağacı → veritabanları (12 → 39), bellek
  hiyerarşisi (9, 12 → 37), d-yollu heap (13 → ödenmedi), kararlılığın veritabanı karşılığı
  (15 → 39), dış sıralama (15 → 34), Boolean sadeleştirme (8 → 37, 39), önek-serbest kod ve bit
  muhasebesi (21 → 34, 39), kısmi doğruluk ↔ sonlanma (19 → 29–31), azalan ölçü (19 → 31),
  Monte Carlo ile Las Vegas (24 → 35, 36), gevşetme ve üçgen eşitsizliği (23 → 31, 33), bellekleme
  ile tablolama takası (22 → 33, 37).

**Görselleştirme öngörüsü:** 28: **Gantt şeması** — aynı iş kümesinin FCFS / SJF / RR altındaki
zaman çizelgesi ve her biri için dönüş süresi ile tepki süresi hesabı (sayılar elle
doğrulanmalıdır); ve **çok seviyeli geri besleme kuyruğunun** kural şeması (öncelik düşürme,
periyodik yükseltme). 29: **kritik kesim gereksinimlerinin** şeması (karşılıklı dışlama, ilerleme,
sınırlı bekleme) ve iki iş parçacığının kilitli/kilitsiz yürütme izi karşılaştırması. 30: üretici-
tüketici tamponunun durum şeması ve yemek yiyen filozofların kaynak grafı.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`. Satır uzunluğu sınırı için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (28):** "FCFS'in kötü olduğu bir girdi ver ve neden kötü olduğunu
ölçütle açıkla"; "Round-robin dönüş süresini iyileştirir mi, kötüleştirir mi — neden?"; "Zaman
dilimini küçültmenin bedeli nedir, sayıyla anlat".

**Araç sırası (Batch 1–8'de doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch`
   roadmap başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz**,
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen 5. adımı yeniden çalıştır ve
   çalışan dev sunucusunu yeniden başlat.**
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır ve
kategori `src/lib/content/schema.ts` ile `labels.ts` içinde zaten tanımlı olmalıdır
(`supporting-fundamentals` hâlâ tanımlı ve kullanılmamıştır; Faz E'nin ilk makalesi onu açacak
ama **kod değişikliği istemez**).
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez (hash yalnızca .md gövdesi üzerinden alınır),
ama diyagramı yeniden çekip görsel olarak denetlemek gerekir.

**Doğrulama sırası — bu run'da çalışan tam tarif.** Paralel oturum aynı depoda dev sunucusu
çalıştırdığı için **yalıtılmış kopya zorunludur**:

1. `pnpm typecheck`, `pnpm test` ve `pnpm build` ana depoda çalıştırılabilir (bunlar sunucu
   açmaz), ama build'in kesin sonucu için kopyada tekrarlanması iyi olur.
2. **Yalıtılmış kopyayı kur** (aynı sürücüde olmak zorunda, yoksa webpack mutlak yolları çözemez):
   ```
   mkdir D:/dev/anil-lib-b<N>
   cd D:/dev/anil-lib && tar --exclude=./node_modules --exclude=./.next --exclude=./.git \
       --exclude=./artifacts -cf - . | (cd ../anil-lib-b<N> && tar -xf -)
   powershell -NoProfile -Command "New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b<N>\node_modules' -Target 'D:\dev\anil-lib\node_modules'"
   ```
3. **Dev sunucusunu kopyada, test kapısı değerleriyle başlat** (kabuk env'i `.env.local`'i ezer):
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`
   `corepack pnpm exec next dev -p 3101 -H 127.0.0.1`.
   Doğru kurulduğunun hızlı işareti: `/boun` **307**, `/login` **200**.
4. **Bir kez giriş yapıp oturumu kaydet** (`artifacts/boun-render/login-b8.mjs` bu run'ın
   çalışan sürümüdür): taban adres **`http://localhost:3101`**, kullanıcı `anil`, parola
   `test-reader-pass`; `ctx.storageState({path})` ile JSON'a yaz. Sonra render betiklerinde
   `browser.newContext({ viewport: {...}, storageState: "<yol>" })` kullan.
5. **Render:** `shot-batch<N>.mjs` (27 kombinasyon + `/boun`), `figs-b<N>.mjs` (diyagram başına
   ekran görüntüsü, light + dark), `pre-b<N>.mjs` (kod bloğu varsa; beklenen `pre` sayısını
   betikte güncelle). Üçü de taban adresi `RENDER_BASE`'den alır ve slug listesi başta durur —
   sonraki batch için tek yapılacak şey o üç satırı değiştirmektir.
6. **E2E:** aynı sunucu kullanılabilir (kapı zaten test değerleriyle açık). Kopyada
   `PLAYWRIGHT_PORT=3101 corepack pnpm exec playwright test`. `reuseExistingServer: true` olduğu
   için Playwright mevcut sunucuyu kullanır.
7. **Başarısız testleri atfetmek için kontrol koşusu:** kopyada katalog ve roadmap'i
   `git show HEAD:<yol>` ile geri al, yeni makale ve asset klasörlerini sil, aynı testleri tekrar
   koş. Aynı şekilde düşüyorlarsa batch kaynaklı değildir. Kararsız testler için aynı testi
   birkaç kez koş.
8. **Temizlik — sıra önemlidir:** **önce** junction'ı kaldır
   (`powershell -NoProfile -Command "cmd /c rmdir '<kopya>\node_modules'"`), **sonra** kopyayı
   `rm -rf` ile sil. Ters sırada `rm -rf` junction'ı takip edip **gerçek `node_modules`'ü siler**.
   Silme sonrası depo kökünde `pnpm typecheck` çalıştırıp `node_modules`'ün sağlam olduğunu
   doğrula (bu run'da doğrulandı: `.pnpm` altında 596 paket, typecheck temiz).
9. **Sunucuyu durdurmak:** `TaskStop` yetmez, süreç yaşamaya devam eder. `netstat -ano` ile portu
   dinleyen PID bulunup `Stop-Process -Id <pid> -Force` çalıştırılmalı; ardından portun gerçekten
   kapandığı doğrulanmalıdır.

## Non-normative history

- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D
  açıldı**, `operating-systems` klasörü kod değişikliği olmadan devreye girdi. 16'nın güçlü bağlı
  bileşenler / ters bitiş sırası borcu, 5'in sayılabilirlik pini, 3'ün yapıcı olmayan ispat pini
  ve 22'nin sözde polinom pini ödendi; CMPE322 sayfası yeniden doğrulandı ve sayfada ders çıktıları
  bölümü olmadığı kayda geçti; 6.006 Bahar 2020'de SCC dersi olmadığı görülüp borcun kaynağı
  Sedgewick 4.2 olarak düzeltildi. Doğrulama: BOUN içerik + SVG denetleyicileri temiz (27 makale,
  54 diyagram) ve bağımsız bir Python denetimi 27/27 eşleşme verdi, `pnpm typecheck` temiz,
  `pnpm test` 407/407 (run sonunda 419/419), `pnpm build` başarılı (87, run sonunda 91 statik
  sayfa; 27'si `/boun`; ana depoda ve yalıtılmış kopyada ayrı ayrı), global id/slug benzersizliği
  83/83 ve run sonunda 87/87, Playwright 31 geçti /
  1 atlandı / 9 başarısız — dokuzunun da BOUN'la ilgisiz olduğu **kontrol koşusuyla deneysel
  olarak kanıtlandı** (sekizi Batch 8 çıkarılmış ağaçta birebir aynı şekilde düştü, biri flaky),
  27 render kombinasyonu, 6 diyagram (light + dark) ve 1 kod bloğu (desktop + mobile × light +
  dark) ekran görüntüsüyle doğrulandı; iki diyagram düzeltmesi yapılıp yeniden çekildi.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni
  üçlüsü kapandı ve analizin sınırları bölümü açıldı**. Makale 22'nin taslak başlığı pedagojik
  gerekçeyle genişletildi; 13'ün `azalt_anahtar` borcu ile 14–15–17'nin ortak karar ağacı kuramı
  borcu ödendi; CLRS bölüm adı ve 6.006 DP ders numarası borçları kapandı; paralel algoritmalar
  için yeni birincil kaynak (6.172 Güz 2018 Lecture 7) bulundu ve yol haritasının iki taslak
  beklentisi düzeltildi. Doğrulama: denetleyiciler temiz (24 makale, 48 diyagram), bağımsız Python
  denetimi 24/24, `pnpm typecheck` temiz, `pnpm test` 291/291 (run sonunda 294/294), `pnpm build`
  başarılı (83, run sonunda 87 statik sayfa), global id/slug benzersizliği 76/76 ve 80/80,
  Playwright 21 geçti / 1 atlandı / 4 önceden-var başarısız, 27 render kombinasyonu, 6 diyagram ve
  2 kod bloğu ekran görüntüsüyle doğrulandı.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme
  üçlüsü kapandı ve tasarım deseni bölümü açıldı**. Makale 20'nin taslak başlığı genişletildi,
  seride ilk kez fenced kod bloğu kullanıldı ve Batch 5'ten kalan Master Teoremi ε borcu kapatıldı.
  Doğrulama: denetleyiciler temiz (21 makale, 42 diyagram), `pnpm test` 277/277, `pnpm build` 76
  (ikinci koşuda 80) statik sayfa, benzersizlik 69/69 ve 73/73, Playwright 21/1/4, 27 render
  kombinasyonu, 6 diyagram ve 3 kod bloğu doğrulandı.
- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**
  ve `algorithms` klasörü kod değişikliği olmadan devreye girdi. CMPE300 yeniden doğrulandı.
  Doğrulama: denetleyiciler temiz, `pnpm test` 256/256, `pnpm build` 69 statik sayfa, benzersizlik
  62/62, Playwright 21/1/4, 27 render kombinasyonu ve 6 diyagram doğrulandı.
- **2026-08-30 (Batch 4, `BATCH=3+1`):** Makale 13–15 yayımlandı; Faz B'nin ikinci yarısı kuruldu
  ve CLRS 4. baskının yedi bölüm adı daha doğrulandı. Doğrulama: denetleyiciler temiz,
  `pnpm test` 241/241, `pnpm build` 62 statik sayfa, benzersizlik 55/55, Playwright 21/1/4,
  27 render kombinasyonu ve 6 diyagram doğrulandı.
- **2026-08-29 (Batch 3, `BATCH=3+1`):** Makale 10–12 yayımlandı; Faz B'nin gövdesi kuruldu ve
  CLRS 4. baskı bölüm numarası borcu kapandı. Doğrulama: denetleyiciler temiz, `pnpm test`
  218/218, `pnpm build` 55 statik sayfa, benzersizlik 48/48, Playwright 21/1/4, 27 render
  kombinasyonu ve 6 diyagram doğrulandı.
- **2026-08-29 (Batch 2, `BATCH=3+1`):** Makale 7–9 yayımlandı; Faz A kapandı, Faz B açıldı.
  Doğrulama: denetleyiciler temiz, `pnpm test` 208/208, `pnpm build` 49 statik HTML, Playwright
  21/1/4, 27 render kombinasyonu ve 6 diyagram doğrulandı.
- **2026-08-29 (Batch 1, `BATCH=3+1`):** Makale 4–6 yayımlandı. Doğrulama: denetleyiciler temiz,
  `pnpm test` 182/182, `pnpm build` 41 statik sayfa, benzersizlik 34/34, 27 render kombinasyonu ve
  6 diyagram doğrulandı.
- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
  Doğrulama: denetleyiciler temiz, `pnpm test` 173/173, `pnpm build` 38 statik sayfa (18 `/read` +
  10 `/seri` + 3 `/boun`), benzersizlik 31/31, üç temada ve üç genişlikte gerçek render doğrulandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması
  (ARASTIRMA.md), 5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri
  oluşturuldu. Makale gövdesi yazılmadı (kurulum görevi üretim run'ı değildir).
