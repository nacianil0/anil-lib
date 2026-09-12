# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-11 · Durum: **1–39 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30, Batch 10: 31–33, Batch 11: 34–36, Batch 12: 37–39)** · Sıradaki: 40

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 39 — `veritabanlari-iliskisel-model-indeks-ve-transaction` |
| Sıradaki güvenli başlangıç | Makale 40 ("Sözlü Anlatım Provası: Tahta, Takip Sorusu, Araştırma Yönü"); run kapsamı SOZLESME §6'ya göre çözülür |
| **Seride kalan makale sayısı** | **2 (40 ve 41).** `BATCH` kaçı gösterirse göstersin, SOZLESME §6 gereği doldurma konusu icat edilmez: kalan iki makale tamamlanır ve **seri tamamlanmış state'ine geçirilir** |
| Sıradaki kohort | `classification_batch: 13` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–35 → `operating-systems`, 36–39 → `supporting-fundamentals` (klasör adı `category` alanıyla birebir aynı). **Seride kategori kararı KALMAMIŞTIR:** 40–41 `interview-method` klasörüne girer ve o klasör 1. makaleden beri zaten kuruludur. Yeni makale kod değişikliği gerektirmez. |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 12'de ne yapıldı

1. **Makale 37–39 yayımlandı** (`classification_batch: 12`), her biri 2 diyagram ve 1 sözlü checkpoint
   kutusuyla; 37'de 2, 38'de 2, 39'da 1 fenced blok var. **Faz E'nin konu makaleleri bitti**; geriye
   yalnızca sözlü prova (40) ve sentez (41) kaldı.
2. **Kapsam düzeltmesi — makale 39'un resmî bir dersi VAR.** Yol haritası "39 için resmî bir ders
   yoktur; transkript savunması + B-ağacı tahsili" diyordu. Bu run'da bölümün ders dizini okundu ve
   **CMPE321 *Introduction to Database Systems*** bulundu; **önkoşulu CMPE250**, yani bilimsel hazırlık
   üçlüsünün veri yapıları dersi. Katalog tanımı makalenin kapsamını neredeyse birebir veriyor
   (ilişkisel model, normal biçimler, **fiziksel tasarım ve erişim stratejileri**, güvenilirlik).
   Yol haritasının hem faz listesi hem de kapsam kararları bölümü düzeltildi (ARASTIRMA §17).
3. **Bir başlık değişti ve terim kararıyla gerekçelendirildi.** Roadmap'te 39 "…İndeks ve **İşlem**"
   diye planlanmıştı; "işlem" bu seride baştan beri *operation* karşılığıdır ve aynı makalede iki
   kavram aynı sözcüğü paylaşamaz (SOZLESME §2). Başlık "…İndeks ve **Transaction**" oldu; `heap`
   (13. makale) ile aynı kaçış yolu kullanıldı. `roadmap.json` ve YOL-HARITASI **entegrasyondan önce**
   elle güncellendi, sonra `entegre-batch` çalıştırıldı.
4. **Patterson & Hennessy borcu kapandı.** "Bölüm düzeyinde bile atıf yapmadan önce bir içindekiler
   kaynağı bulunmalıdır" borcu için yayıncının kitap sayfası çekildi ve *Computer Organization and
   Design, RISC-V Edition* 2. baskının bölüm adları doğrulandı. **Alt bölüm adları hâlâ
   doğrulanmamıştır**; atıf bölüm düzeyinde kalmalıdır. Aynı run'da **CS:APP3e** ve **Silberschatz
   *Database System Concepts* 7. baskı** için yayıncının resmî içindekiler PDF'leri indirildi ve
   **alt bölüm adları doğrulandı** — bu iki kitaba alt bölüm düzeyinde atıf yapılabilir.
5. **Dört eski borç ödendi.** (a) 27'nin **`fork()`/`exec()`/`wait()`** borcu 38'de ödendi.
   (b) 33'ün **kopyalarken yazma** borcu 38'de xv6'nın mekanizmasıyla ödendi. (c) 12'nin **indeks =
   B-ağacı** borcunun ödenmemiş yarısı (indeksin ne olduğu ve B+-ağacı) 39'da ödendi. (d) 17'nin
   **kesişim noktası** pini 37'de (n = 20 → n = 1.600) ve 39'da (kırılma noktası %2,5) iki kez ödendi.
   Ayrıca 32'nin **TLB bir önbellektir** ve **sayfa boyutu takası** pinleri, 27'nin **bağlam anahtarı
   çevrim cinsinden ucuzlamıyor** gözlemi, 10'un **işaretçi maliyeti**, 15'in **dış sıralama**, 36'nın
   **seçicilik bir olasılık iddiasıdır** pini ödendi.
6. **Üç terim çakışması bilinçli olarak çözüldü ve metinde adlandırıldı.** *cache set* için "önbellek
   kümesi" seçildi ve 5. makalenin matematiksel kümesiyle ilgisi olmadığı söylendi; *heap* adres uzayı
   bölgesi için "heap bölgesi" denip 13'ün veri yapısından ayrıldı; *domain* için "değer alanı" seçildi
   çünkü "tanım kümesi" 5'ten beri bir fonksiyonun tanım kümesidir. *transaction* Türkçeleştirilmedi.
7. **Dokuz sayısal iddia bağımsız hesaplandı** (tam liste ARASTIRMA §17'nin sonunda): Drepper'ın
   %91,5'i yeniden türetildi, iki katmanlı AMAT'ın üç senaryosu (4,9 / 10,6 / 29,8 çevrim), diskin
   çevrim karşılığı ve katmanlar arası oranlar, kesişim noktasının 80 kat kayması, TLB kapsama,
   dizi/bağlı liste trafiği (13,5 kat), erişim yolu maliyeti ve %2,5'lik kırılma noktası, çarpık
   dağılımda 12 kat kötü plan, dış sıralamanın 100.000 blok G/Ç'si.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 36 → 39 sayfa. `src/`, `tests/` ve `tools/` altında **tek satır değişmedi**.

## Açık borçlar

- **Coffman, Elphick & Shoshani (1971) *System Deadlocks* okunamadı** (Batch 10'da ACM DL 403, iki ayna
  403 ve 404; Batch 11 ve 12'de yeniden denenmedi). Kilitlenmenin dört koşulu OSTEP'in aktardığı
  biçimde verildi ve makale 31 bunu söylüyor.
- **Haerder & Reuter (1983) *Principles of Transaction-Oriented Database Recovery* okunamadı.** ACID
  kısaltmasının kaynağı olarak bilinen derleme; bu run'da **on yedi ayrı adres** denendi, hiçbiri tam
  metin vermedi (ACM DL doğrudan indirmeye kapalı, Semantic Scholar 429). Makale 39 bu kaynağa dayanan
  hiçbir iddia içermez ve bunu gövdesinde açıkça söyler; dört özelliğin üçü Gray 1981'den, yalıtım
  tarafı Berenson ve ark. 1995'ten alındı.
- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları** hiçbir
  bölüm için doğrulanamadı (tam liste ARASTIRMA §12'de). CLRS'e **bölüm düzeyinde** atıf yapılır.
  Aynı kısıt **Patterson & Hennessy** için de geçerlidir (bölüm adları Batch 12'de doğrulandı, alt
  bölüm adları doğrulanmadı). **CS:APP3e ve Silberschatz DSC 7e için alt bölüm adları doğrulandı**,
  ama **gövdeleri okunmadı**: bu iki kitap yalnızca yapı atfı için kullanılabilir, sayı ya da tanım
  atfı için kullanılamaz.
- **MIT 6.004'ün ders materyalleri okunamadı.** Birim adları doğrulandı ama OCW birim sayfaları
  istemci tarafında derleniyor ve slayt PDF adresleri statik HTML'de yok; atıf birim düzeyindedir.
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
- **Boolean sadeleştirmenin devre karşılığı (8 → 37) yalnızca anıldı**, örneklenmedi. 37 birleşimsel
  devrelerin Boole ifadeleri olduğunu ve sadeleştirmenin daha az kapı demek olduğunu söyledi ama bir
  devre örneği vermedi; borç **41'e** devredildi.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, 36'da da açılmadı, **41'e**
  devredildi.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının kalan tek örneğidir; 37'nin
  önbellek satırı ve 39'un B+-ağacı dallanması aynı fikri iki kez kullandı ama adıyla anmadı.
- **Güçlü bağlı bileşenler (25 → 34, 39) 39'da da kullanılmadı**; sorgu grafı kapsam dışı kaldı.
  **41'de** kullanılmazsa kapatılmış sayılmalıdır.
- **Cook-Levin teoremi yalnızca sezgi düzeyinde verildi**; bilinçli kapsam kararıdır.
- **Peterson/Dekker algoritmaları 29'da hiç kullanılmadı**; Silberschatz 6.3'ün konusu olduğu için
  41'in provasında sorulabilir.
- **Bölüt tablosu ve tersine sayfa tablosu 32'de anılmadı**; bilinçli kapsam kararıdır, 41'de
  sorulabilir.
- **Öncelik tersine dönmesinin gerçek zamanlı sistem hâli (29 → 35) 35'te açılmadı**; **41'e** kaldı.
- **Kesikli olay benzetimi ve indeksli öncelik kuyruğu (23 → 34) 34'te kullanılmadı**; disk zamanlaması
  bunları gerektirmedi.
- **CMPE343'ün moment üreten fonksiyonlar, gama dağılımı ve regresyon başlıkları 36'da bilinçli olarak
  kapsam dışı bırakıldı**; 41'in provasında "ne kadarını savunabilirim" sorusuyla geri gelebilir.
  Aynı biçimde **CMPE321'in varlık-ilişki modellemesi ve SQL sözdizimi 39'da kapsam dışı bırakıldı**.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı takipsiz dosyalar var** (ör. kesme işareti içeren
  `**zorundadır**.` benzeri adlar, kök dizinde). BOUN kapsamı dışıdır, bu run'da dokunulmadı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer.
  Bu yüzden canlı sync uçtan uca denenemez ve `tests/e2e/reader-data.spec.ts` içindeki **iki test
  bu nedenle başarısızdır**.
- **Playwright'ın tam takımında ÜÇÜNCÜ bir test düşüyor ve hangisi olduğu koşudan koşuya değişiyor.**
  Bu run'da iki kez tam takım koşuldu: birincisinde `reader.spec.ts:518` ("turns exactly one page per
  scroll gesture"), ikincisinde `reader-resume.spec.ts:92` ("holds the place while the text reflows")
  düştü. **Kontrol koşusu bunu kesinleştirdi:** katalog ve roadmap `git show HEAD:` ile geri alınıp üç
  yeni makale ve üç asset klasörü silindikten sonra tam takım yeniden koşuldu ve **yine aynı üç
  başarısızlık** çıktı (`reader-data` ikilisi + `reader.spec.ts:518`). Aynı testler **tek başına** ve
  **dosya düzeyinde** (19 test) yeni içerikle birlikte sorunsuz geçiyor. Yani bu, dev sunucusu tam
  takım altında yüklenince ortaya çıkan zamanlama kırılganlığıdır; içerik regresyonu değildir.
  Referans: tam takım **49 geçti / 1 atlandı / 3 başarısız**.
- **`.env.local` dev sunucusunda parola kapısını AÇIYOR** (`SITE_PASSWORD_SHA256` ve `AUTH_COOKIE_SECRET`
  tanımlar), dolayısıyla `/boun` 307 döner. **Doğru yol:** sunucuyu `playwright.config.ts`'teki test
  değerleriyle başlat
  (`SITE_PASSWORD_SHA256=2e10d696…f2cef855`, `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`;
  kabuk env'i `.env.local`'i ezer) ve render betiklerinde **giriş yap**: kullanıcı `anil`, parola
  `test-reader-pass`. Doğru kurulduğunun hızlı işareti: `/boun` **307**, `/login` **200**.
- **Playwright paketi üst düzey `node_modules`'te YOKTUR.** Render betiklerinde
  `import { chromium } from "@playwright/test"` kullan; `"playwright"` çalışmaz.
- **Giriş bir Server Action'dır; `waitForNavigation` işe yaramaz.** Tıkla, sonra `page.waitForURL(...)` ile
  hedef URL'yi bekle. **Tuzak:** `waitForURL(/\/boun$/)` giriş sayfasının kendi URL'sine de uyar; predicate
  kullan: `(u) => u.pathname === "/boun" && u.search === ""`. Çalışan sürüm:
  `artifacts/b12-research/login-b12.mjs`.
- **Çerez ana bilgisayarı önemlidir.** Render betiklerinde taban adres baştan sona
  **`http://localhost:<port>`** olmalıdır (`127.0.0.1` çerezi gönderilmez).
- **Tema `data-theme` özniteliğiyle değil, kök elemandaki SINIFLA uygulanır** (`dark` / `sepia`; `system`
  seçiliyken hiçbiri). Tercihler `localStorage`'da **`anil-lib:reader-preferences:v1`** anahtarında bir JSON
  olarak durur ve `ctx.addInitScript` ile yazılır. Doğrulanmış zemin renkleri: light `rgb(250, 249, 247)`,
  dark `rgb(18, 20, 23)`, sepia `rgb(244, 239, 228)`.
- **Dev sunucusuna gezinme ara sıra `net::ERR_NETWORK_CHANGED` veriyor**; render betikleri `goto` çağrısını
  **üç denemeli** bir döngüye almalıdır.
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık kalır).
- **Paralel AI oturumu aynı depoda çalışıyor ve kataloğunu büyütüyor** (bu run sırasında global
  article-id sayısı 159 → 163 oldu). İki Next süreci `.next` dizinini paylaşırsa birbirini bozar;
  **yalıtılmış kopya zorunludur** ve **ayrı bir port** seçilmelidir (bu run 3105 kullandı).
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Gövde düzenlenip
  `sync-series-hashes.cjs --write` çalıştırıldıktan sonra kopyaya yeni içeriği kopyala ve dev sunucusunu
  **yeniden başlat**; yoksa `/boun/<slug>` 500 verir. **SVG düzeltmesi için de geçerlidir.**
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır. Çalışan sürüm:
  `artifacts/b12-research/denetim.py` (dosyaları **binary** okur; `core.autocrlf` repo düzeyinde `true`).
  **Katalog alan adları camelCase'tir** (`articleId`, `readingOrder`, `contentHash`,
  `classificationBatch`), frontmatter ise snake_case; denetim betiği ikisini ayrı ayrı ele almalıdır.
- **Doküman dosyalarının satır sonları karışıktır.** `ARASTIRMA.md` ve `YOL-HARITASI.md` **CRLF**,
  `HANDOFF.md` ise **LF**'tir. Python ile düzenlerken `io.open(..., newline="")` ile oku, dosyanın
  gerçek satır sonunu ölç, CRLF'i LF'e çevirip eşleştir ve yazarken geri çevir.
- **`json.dump` ile `roadmap.json`/`catalog.json` yeniden yazma.** Bu dosyalar tek satırlık kompakt
  kayıtlarla biçimlendirilmiştir; `json.dumps(..., indent=2)` 282 satırlık sahte bir fark üretir.
  Başlık gibi tek alanlık değişiklikler **düz metin değiştirmeyle** yapılmalıdır.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri `PYTHONIOENCODING=utf-8`
  ile çalıştır. Ayrıca Windows yolunu `r'D:\dev\anil-lib\'` gibi ters bölü ile **bitirme** —
  `unterminated string literal` verir; ileri bölü kullan.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe karakterleri BOZUYOR.** Türkçe içeren Python/Markdown
  blokları **`Write` aracıyla dosyaya yazılmalıdır**; ASCII-only kısa betikler heredoc'ta çalışır.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz.** Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**.
- **İçerik denetleyicisinin şekil başlığı (title) içinde PARANTEZ OLAMAZ.** "Diyagram kendi paragrafında tek
  başına durmalı" kuralının regex'i `\(assets\/[^)]*\)$` kullanır; başlıktaki bir `)` eşleşmeyi erken bitirir.
- **Repo SVG denetleyicisi metin–metin çakışmasına ve çizgi–kutu yakınlığına BAKMAZ.** Bu run'da her iki
  denetleyici de temizdi, gerçek render **iki düzen hatası** yakaladı: makale 39'un birinci şeklinde iç
  düğümlerden inen bağlantılar yaprak kutularının **yanında boşlukta bitiyordu** (ağaç 1 kök + 2 iç düğüm
  + 4 yaprak olacak biçimde yeniden kuruldu), makale 38'in ikinci şeklinde kopya oku bir kutunun alt
  kenarına **yedi birim** kala geçiyordu (düz köşegen yerine dirsekli yola çevrildi).
  **Diyagram ekran görüntülerini tek tek gözle incelemek zorunludur.**
- **Ortamda PDF'i görüntüye çeviren araç yok**; `/mingw64/bin/pdftotext` ve Python `pypdf` var.
- **Dijkstra'nın EWD PDF'leri taranmış görüntüdür**; arşivin HTML transkripsiyonu kullanılmalıdır ve
  **transkripsiyon sayfalıdır** (`EWD123-2.html` gibi).
- **Bölümün ders dizini sayfası istemci tarafında sayfalanıyor**: statik HTML yalnızca ilk on altı dersi
  içeriyor ve `?page=2`/`?page=3` aynı HTML'i döndürüyor. Bir dersin varlığını kanıtlamak için **kendi
  sayfası** çekilmelidir.

## Bu run'da doğrulananlar

- İçerik/SVG denetleyicileri: BOUN **39 makale + 78 diyagram** temiz. `entegre-batch` kuru çalışması 3 yeni
  makaleyi buldu, `--write` sonrası fark kalmadı; `sync-series-hashes --write` **üç kez** çalıştırıldı
  (alt metin ve terim listesi düzeltmelerinden sonra tekrar) ve sonunda fark kalmadı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü **39/39**; `article_id`, başlık, slug, özet, kategori, seviye,
  sıra, kohort ve klasör adı eşleşmesi 39/39; `reading_order` **1–39 kesintisiz**; kohort dağılımı
  **13 × 3**; gövdelerde referans verilen **78 SVG'nin hepsi diskte ve diskte referanssız SVG yok**;
  roadmap'in "yayinda" kümesi katalogla birebir aynı (39 kayıt).
- **Global article-id ve slug benzersizliği:** run ortasında **159/159**, run sonunda **163/163**
  (paralel AI oturumu kendi kataloğunu büyüttüğü için); ikisi de tam benzersiz.
- **Parantezli gloss taraması** (terim defterine karşı): üç makalede toplam **36 yeni gloss**, **tekrar
  gloss sıfır**. İngilizce karşılıklar listesi gövdeyle karşılaştırıldı ve 38'in listesinden gövdede
  kurulmayan ***lazy allocation*** çıkarıldı.
- `pnpm typecheck` temiz (kopya silindikten sonra tekrar koşuldu, yine temiz) · `pnpm test`
  run ortasında **651/651**, run sonunda **661/661** (29 test dosyası) · `pnpm build` başarılı:
  run ortasında **163**, run sonunda **167 statik sayfa** (paralel AI oturumu kendi kataloğunu büyüttü), **39'u `/boun`**
  (route tablosunda `/boun/[slug]` altında 3 + 36 yol). Toplam sayfa sayısı sabit referans **değildir**;
  sabit referans testlerin tamamının geçmesi ve `/boun` yol sayısının katalogla eşleşmesidir.
- **Gerçek render (ekran görüntülü, yalıtılmış kopyada, port 3105):** üç yeni makale, üç genişlik
  (375 / 768 / 1440) × üç tema (light / dark / sepia) = **27 kombinasyon**, ayrıca `/boun` girişi üç
  genişlikte (toplam **30 ekran görüntüsü**). Her makale sayfasında 2 figure ve 4 inline SVG, doğru
  figcaption, yatay taşma yok, `undefined` / `NaN` sızıntısı yok, tek console hatası bilinen 503 sync
  çağrısı. Üç temanın zemin rengi ayrı ayrı ölçüldü. `/boun` girişinde üç yeni başlık üç genişlikte de
  göründü.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran görüntüsü,
  düzeltmelerden sonra 12 tane daha). **İki gerçek düzen hatası bulundu ve düzeltildi** (yukarıda
  "bilinen sorunlar"da ayrıntısı var); alt metinler düzeltilen şekillere göre yeniden yazıldı.
- **Kod bloğu render'ı ayrı doğrulandı:** beş `pre` öğesi desktop ve mobile × light ve dark
  kombinasyonlarında açıldı (**20 ekran görüntüsü**); JetBrains Mono, 13,44px, `overflow-x: auto`,
  sayfada yatay taşma yok, 375px'te uzun bloklar kendi içinde kayıyor (clientW 333 / scrollW 398–575).
  Türkçe tanımlayıcılı blok (39'un normalleştirme örneği) hizalamasıyla birlikte gözle incelendi.
- **Playwright: tam takım 49 geçti / 1 atlandı / 3 başarısız.** Üçünün de BOUN'la ilgisiz olduğu
  **iki ayrı kontrol koşusuyla** kanıtlandı (ayrıntı "bilinen sorunlar"da): kontrol koşusunda içerik
  geri alındığında aynı üç test düştü, içerik yerindeyken `reader.spec.ts` dosyası tek başına 18/18
  geçti.
- **Temizlik sırası doğrulandı:** önce junction kaldırıldı, sonra kopya silindi; ardından `node_modules`
  sağlamlığı ölçüldü (`.pnpm` altında **721 paket**) ve `pnpm typecheck` yeniden temiz çıktı.
- **Not:** makale sayfalarında `main h1` **yoktur** (başlık `document.title`'dadır); serinin mevcut
  deseni, regresyon değil.

## Sıradaki batch hazırlığı — Batch 13 (Makale 40–41: serinin son iki makalesi)

**Bu run seriyi bitirir.** SOZLESME §6: kalan makale `N`'den azsa doldurma konusu icat edilmez;
kalanlar tamamlanır ve **seri tamamlanmış state'ine geçirilir**. Pratik sonucu üç maddedir:

1. `roadmap.json`'da 40 ve 41 `yayinda` olur ve **`planlandi` durumunda tek satır kalmaz**.
2. **`/boun` girişindeki `footerNote` metni gözden geçirilmelidir.** Bugün
   `src/app/boun/page.tsx`'te şöyle yazıyor: "Seri gruplar halinde yayımlanır; planlanan başlıklar
   yeni gruplar hazırlanırken güncellenebilir. Resmî mülakat bilgisi değişebilir; karar vermeden önce
   bölümün güncel sayfasını kontrol et." Birinci cümle seri bitince yanlış olur. **Bu, Batch 13'ün
   öngörülen tek kod dokunuşudur** ve `SeriesLanding`'in `footerNote` prop'unu değiştirmek dışında bir
   şey gerektirmez. İkinci cümle (resmî bilginin değişebilirliği) **kalmalıdır** — SOZLESME §4 bunu
   zorunlu kılar.
3. HANDOFF'un cursor tablosu "seri tamamlandı" durumuna çevrilmeli ve TRIGGER'ın ne anlama geldiği
   (artık yeni makale yok, yalnızca bakım) açıkça yazılmalıdır.

**Pedagojik hedef:** 37–39 serinin son konu makaleleriydi. 40 konu anlatmayı bırakır ve **anlatmanın
kendisine** geçer: altmış-doksan saniyelik bir cevabın omurgası nasıl kurulur, takip sorusu gelince
nasıl genişletilir, tahtaya ne çizilir, "past academic record" ve "research direction" konuşması nasıl
hazırlanır. 41 ise sentezdir: beş yetenek × beş faz öz-değerlendirme matrisi, aralıklı tekrar planı,
mülakat günü protokolü ve **kalan bütün borçların provası**.

**Prerequisite satırları (40–41 için taslak; YOL-HARITASI'nda da var):**
- 40 ← 1 (resmî mülakat tanımı ve on beş dakikalık format), ve bütün fazların "Sesli anlat" kutuları
  ile "Mülakatta nasıl görünür" bölümleri — 40 yeni içerik öğretmez, mevcut omurgaları kalıba döker
- 41 ← bütün fazlar; özellikle 17 (model bilinci), 19 (doğruluk cevabının sabit sırası), 9 (maliyet
  cevabının sabit sırası), 36 (koşullu iddia ve yoğunlaşma), 30 (güvenlik/canlılık), 35 (koruma
  ilkeleri), 37 (erişim deseni), 39 (kırılma noktası refleksi)

**Araştırma ihtiyacı:** 40 ve 41'in **resmî bir dersi yoktur**; dayanakları mülakatın kendi resmî
tanımıdır (ARASTIRMA §1: en az iki öğretim üyesi, 10–15 dakika, "past academic record, research
direction, skillset, and technical knowledge"). Bu tanım **son bir kez yeniden doğrulanmalıdır**,
çünkü seri onun üzerine kuruldu ve kapanış makalesi onu tekrar aktaracak. Resmî lisansüstü sayfası ve
Scientific Preparation sayfası da yeniden çekilmelidir. Bunun dışında **yeni akademik kaynak ihtiyacı
yoktur**; 40 ve 41 mevcut 39 makalenin sentezidir ve dışarıdan iddia getirmemelidir.

İki makale için gerekebilecek tek dış kaynak sınıfı, **aralıklı tekrar** ve **retrieval practice**
literatürüdür; bu literatür AI serisinin sözleşmesinde (`docs/seri/SOZLESME.md` §3 ve §10) zaten
listelidir ve BOUN sözleşmesi §3 ona atıf yapar. Yeni bir kaynak indirmek yerine oradan alıntılamak
tercih edilmelidir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 37–39 de **numaralı ileri vaat vermedi**; bütün
ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **40'ta karşılanmalı (39'un en somut vaadi):** altmış-doksan saniyelik cevabın omurgasının nasıl
  kurulacağı, takip sorusu geldiğinde nasıl genişletileceği, tahtaya ne çizileceği ve "araştırma
  yönün ne?" sorusuna hazırlık. Ayrıca 38'in **"kim ayırıyor, kim serbest bırakıyor"** üç katman
  refleksi ve 37'nin **"önce erişim desenini tarif et"** refleksi birer anlatım kalıbına çevrilmelidir.
- **41'de karşılanmalı:** Boolean sadeleştirmenin devre örneği (8 → 37 → 41), alt problem
  kısıtlama/genişletme (22), d-yollu heap (13), güçlü bağlı bileşenler (25), indirgemenin yönü (25),
  öncelik tersine dönmesinin gerçek zamanlı hâli (29), Peterson/Dekker (29), bölüt tablosu ve tersine
  sayfa tablosu (32), Monte Carlo ile Las Vegas (36), güvenin olasılık olmaması (36), üç C (37),
  ANOMALY SERIALIZABLE uyarısı (39). **Bunların hepsi bir makaleye sığmaz**; 41 bir öz-değerlendirme
  matrisidir ve borçları **soru biçiminde** sorabilir ("bu pini savunabiliyor musun?"), hepsini
  yeniden anlatmak zorunda değildir. Kapatılamayanlar HANDOFF'ta kapanış notu olarak kalmalıdır.

**Görselleştirme öngörüsü:** 40: bir cevabın omurga şeması (iddia → koşul → model → bozulma noktası)
ve takip zincirinin üç halkası (tanım → sınır durumu → takas); ikinci şekil tahta düzeni olabilir
(neyin nereye yazıldığı). 41: beş yetenek × beş faz matrisi ve aralıklı tekrar takvimi. **41'in
matrisi uydurma sayı içermemelidir** — hücreler okurun kendi işaretleyeceği boş kutulardır.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim, renk yalnızca
`var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı, `<` ve `>` karakterleri
`&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`, `--text-muted`, `--text-faint`,
`--border`, `--surface`, `--surface-muted`, `--accent`, `--accent-soft`, `--cool`, `--cool-soft`. Satır
uzunluğu sınırı, başlıkta parantez yasağı ve çakışma denetimi için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (40):** "Bir kavramı altmış saniyede nasıl anlatırsın — omurga hangi dört
parçadan oluşur?"; "Mülakatçı 'peki ya en kötü durumda?' dediğinde cevabını nasıl genişletirsin?";
"Araştırma yönünü iki cümlede nasıl anlatırsın?"

**Araç sırası (Batch 1–12'de doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs` yalnızca
**katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch` roadmap
   başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz** (Batch 12'de
   makale 39'un başlığı bu yüzden önce düz metin değiştirmeyle güncellendi),
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy; `article_id` için
   gerçek bir UUID üret — şema `article_<uuid>` kalıbını zorunlu kılar),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen — alt metin ya da İngilizce terim
   listesi düzeltmesi dahil — 5. adımı yeniden çalıştır, kopyaya yeni içeriği kopyala ve dev sunucusunu
   yeniden başlat.**
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez, ama alt metni düzeltmek etkiler.

**Doğrulama sırası — bu run'da çalışan tam tarif.** Paralel oturum aynı depoda çalıştığı için **yalıtılmış
kopya zorunludur**:

1. `pnpm typecheck`, `pnpm test` ve `pnpm build` ana depoda çalıştırılabilir (bunlar sunucu açmaz).
   `pnpm test` kırmızı gelirse tek fork ile tekrarla
   (`--pool=forks --poolOptions.forks.singleFork`; Batch 9'un bellek notu).
2. **Yalıtılmış kopyayı kur** (aynı sürücüde olmak zorunda):
   ```
   mkdir D:/dev/anil-lib-b<N>
   cd D:/dev/anil-lib && tar --exclude=./node_modules --exclude=./.next --exclude=./.git \
       --exclude=./artifacts -cf - . | (cd ../anil-lib-b<N> && tar -xf -)
   powershell -NoProfile -Command "New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b<N>\node_modules' -Target 'D:\dev\anil-lib\node_modules'"
   ```
   **Kopyanın `.git`'i yoktur**; kontrol koşusu için `git show HEAD:<yol>` ana depoda çalıştırılıp çıktısı
   kopyaya yönlendirilmelidir.
3. **Dev sunucusunu kopyada, test kapısı değerleriyle ve boş bir portta başlat**:
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`
   `corepack pnpm exec next dev -p 3106 -H 127.0.0.1`.
4. **Bir kez giriş yapıp oturumu kaydet** (`artifacts/b12-research/login-b12.mjs`): taban adres
   **`http://localhost:<port>`**, kullanıcı `anil`, parola `test-reader-pass`; `ctx.storageState({path})` ile
   JSON'a yaz. Betiğin çıkış kodunu ayrıca kontrol et.
5. **Render:** `shot-batch<N>.mjs` (makale × genişlik × tema + `/boun`), `figs-b<N>.mjs` (diyagram başına
   ekran görüntüsü, light + dark), `pre-b<N>.mjs` (kod bloğu; beklenen `pre` sayısını betikte güncelle).
   Üçü de taban adresi `RENDER_BASE`'den alır ve slug listesi başta durur. **Diyagram ekran görüntülerini
   tek tek gözle incele** — alt metnin şekille uyuştuğunu da orada denetle.
6. **E2E:** aynı sunucu kullanılabilir. Kopyada `PLAYWRIGHT_PORT=<port> corepack pnpm exec playwright test`.
   **Beklenen sonuç 49/1/3'tür**; üçüncü başarısızlığın hangi test olduğu koşudan koşuya değişir.
7. **Başarısız testleri atfetmek için kontrol koşusu:** kopyada katalog ve roadmap'i ana depodan
   `git show HEAD:<yol>` ile geri yaz, yeni makale ve asset klasörlerini sil, dev sunucusunu yeniden başlat
   ve **tam takımı** tekrar koş. Tek bir spec'i koşmak yetmez: üçüncü başarısızlık yalnızca tam takım
   yükünde çıkıyor.
8. **Temizlik — sıra önemlidir:** **önce** junction'ı kaldır
   (`powershell -NoProfile -Command "cmd /c rmdir '<kopya>\node_modules'"`), **sonra** kopyayı `rm -rf` ile
   sil. Ters sırada `rm -rf` junction'ı takip edip **gerçek `node_modules`'ü siler**. Silme sonrası depo
   kökünde `pnpm typecheck` çalıştırıp `node_modules`'ün sağlam olduğunu doğrula.
9. **Sunucuyu durdurmak:** `netstat -ano` ile portu **LISTENING** durumda dinleyen PID'i bul (TIME_WAIT
   satırları PID 0'dır, onlara aldanma) ve `Stop-Process -Id <pid> -Force` çalıştır; ardından portun gerçekten
   kapandığını doğrula.

## Non-normative history

- **2026-09-11 (Batch 12, `BATCH=3+1`):** Makale 37–39 yayımlandı; **Faz E'nin konu makaleleri bitti**
  ve geriye yalnızca sözlü prova ile sentez kaldı. **Kapsam düzeltmesi:** makale 39'un resmî bir dersi
  **vardır** — CMPE321 *Introduction to Database Systems*, önkoşulu CMPE250; yol haritası "resmî ders
  yok" diyordu. Makale 39'un başlığı terim çakışması yüzünden "…İndeks ve İşlem"den "…İndeks ve
  Transaction"a çevrildi. Patterson & Hennessy içindekiler borcu kapandı; CS:APP3e ve Silberschatz
  DSC 7e için alt bölüm adları doğrulandı. Dört eski borç ödendi: `fork`/`exec`/`wait` (27),
  kopyalarken yazma (33), indeks = B-ağacı (12), kesişim noktası (17). Doğrulama: BOUN içerik + SVG
  denetleyicileri temiz (39 makale, 78 diyagram), bağımsız Python denetimi 39/39, gloss taraması
  tekrar-gloss sıfır, `pnpm typecheck` temiz, `pnpm test` 651/651 → 661/661, `pnpm build` başarılı (163 → 167 statik
  sayfa, 39'u `/boun`), global id/slug 159/159 → 163/163, Playwright 49/1/3 — üçüncü başarısızlığın
  koşudan koşuya değiştiği ve içerikle ilgisiz olduğu iki kontrol koşusuyla kanıtlandı, 30 render
  ekran görüntüsü, 12 + 12 diyagram (light + dark) ve 20 kod bloğu doğrulandı; görsel incelemede
  **iki düzen hatası** bulunup düzeltildi ve hash'ler yeniden senkronlandı.
- **2026-09-11 (Batch 11, `BATCH=3+1`):** Makale 34–36 yayımlandı; **Faz D kapandı ve Faz E açıldı**.
  `supporting-fundamentals` kategorisi kod değişikliği olmadan devreye girdi ve **serinin son kategori
  kararı verilmiş oldu**. Makale 37'nin asıl dayanağının CMPE244 olduğu bulundu. 12'nin B-ağacı borcu,
  10'un dizi/bağlı liste takası, 9'un dağılım varsayımı, 6'nın doğum günü pini ve 24'ün
  rastgeleleştirilmiş seçim beklenti analizi ödendi. Doğrulama: denetleyiciler temiz (36 makale,
  72 diyagram), bağımsız Python denetimi 36/36, `pnpm test` 637/637 → 642/642, `pnpm build` 156 → 160
  statik sayfa, benzersizlik 152/152 ve 156/156, Playwright 50/1/2, 30 render ekran görüntüsü,
  6 diyagram ve 8 kod bloğu doğrulandı; **iki düzen hatası** bulunup düzeltildi.
- **2026-09-10 (Batch 10, `BATCH=3+1`):** Makale 31–33 yayımlandı; **Faz D'nin eşzamanlılık bölümü kapandı ve
  sanallaştırmanın bellek yarısı kuruldu**. Dijkstra'nın **bankacı algoritması** EWD 123'ün 6. bölümünden
  birincil kaynak olarak alındı. Doğrulama: denetleyiciler temiz (33 makale, 66 diyagram), bağımsız Python
  denetimi 33/33, `pnpm test` 615/615 → 618/618, `pnpm build` 149 statik sayfa, benzersizlik 145/145 → 149/149,
  Playwright 50/1/2, 30 render ekran görüntüsü, 6 diyagram ve 4 kod bloğu doğrulandı.
- **2026-09-10 (Batch 9, `BATCH=3+1`):** Makale 28–30 yayımlandı; **Faz D'nin eşzamanlılık gövdesi kuruldu**.
  Seride ilk kez **Dijkstra'nın kendi metinleri** (EWD 123 ve EWD 310) ve **Lamport 1977** birincil kaynak
  olarak kullanıldı. Doğrulama: denetleyiciler temiz (30 makale, 60 diyagram), `pnpm test` 599/599 → 605/605,
  `pnpm build` 142 → 146 statik sayfa, benzersizlik 138/138 ve 142/142, Playwright 50/1/2.
- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D açıldı**,
  `operating-systems` klasörü kod değişikliği olmadan devreye girdi. Doğrulama: denetleyiciler temiz
  (27 makale, 54 diyagram), bağımsız Python denetimi 27/27, `pnpm test` 407/407 → 419/419, `pnpm build` 87 →
  91 statik sayfa, benzersizlik 83/83 ve 87/87, Playwright 31/1/9.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni üçlüsü kapandı**.
  Doğrulama: denetleyiciler temiz (24 makale, 48 diyagram), `pnpm test` 291/291 → 294/294, `pnpm build` 83 →
  87 statik sayfa, benzersizlik 76/76 ve 80/80, Playwright 21/1/4.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme üçlüsü kapandı**.
  Seride ilk kez fenced kod bloğu kullanıldı. Doğrulama: denetleyiciler temiz, `pnpm test` 277/277,
  `pnpm build` 76 → 80 statik sayfa, benzersizlik 69/69 ve 73/73, Playwright 21/1/4.
- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**.
  Doğrulama: denetleyiciler temiz, `pnpm test` 256/256, `pnpm build` 69 statik sayfa, benzersizlik 62/62.
- **2026-08-30 (Batch 4, `BATCH=3+1`):** Makale 13–15 yayımlandı; CLRS 4. baskının yedi bölüm adı daha
  doğrulandı. Doğrulama: denetleyiciler temiz, `pnpm test` 241/241, `pnpm build` 62 statik sayfa.
- **2026-08-29 (Batch 3, `BATCH=3+1`):** Makale 10–12 yayımlandı; CLRS 4. baskı bölüm numarası borcu kapandı.
- **2026-08-29 (Batch 2, `BATCH=3+1`):** Makale 7–9 yayımlandı; Faz A kapandı, Faz B açıldı.
- **2026-08-29 (Batch 1, `BATCH=3+1`):** Makale 4–6 yayımlandı.
- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması (ARASTIRMA.md),
  5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri oluşturuldu.
