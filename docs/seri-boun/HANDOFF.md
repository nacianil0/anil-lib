# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-11 · Durum: **1–36 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30, Batch 10: 31–33, Batch 11: 34–36)** · Sıradaki: 37

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 36 — `olasilik-ve-istatistik-mulakat-icin-cekirdek` |
| Sıradaki güvenli başlangıç | Makale 37 ("Bilgisayar Organizasyonu: OS'nin Altındaki Makine") — **Faz E'nin donanım bölümü**; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 12` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–35 → `operating-systems`, 36 → `supporting-fundamentals` (klasör adı `category` alanıyla birebir aynı). **Altı kategorinin hepsi artık kullanımdadır ve seride başka kategori kararı KALMAMIŞTIR:** 37–39 `supporting-fundamentals`, 40–41 `interview-method`. Yeni makale kod değişikliği gerektirmez. |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 11'de ne yapıldı

1. **Makale 34–36 yayımlandı** (`classification_batch: 11`), her biri 2 diyagram ve 2 sözlü checkpoint
   kutusuyla; 34'te 1, 36'da 7 fenced blok var, 35'te hiç yok. **Faz D 35 ile kapandı** ve **Faz E 36 ile
   açıldı**.
2. **Serinin ilk ve son kategori kararı verildi:** 36 `supporting-fundamentals` klasörüne girdi. Sözlük
   `schema.ts`'te, etiket `labels.ts`'te zaten tanımlı olduğu için **tek satır kod değişmedi**; yalnızca
   klasör açıldı ve `/boun` girişinde "Destekleyici Temeller" grubu kendiliğinden göründü (render'da
   doğrulandı). Kalan makalelerin kategorisi belli olduğu için **seride başka kategori kararı yok**.
3. **Üç taslak başlık da olduğu gibi kaldı**; `roadmap.json` elle düzenlenmedi ve `entegre-batch` doğrudan
   çalıştırıldı. `src/`, `tests/` ve `tools/` altında tek satır değişmedi.
4. **Faz E'ye geçiş için dört resmî sayfa yeniden okundu** (CMPE322 doğrulama + CMPE343, CMPE240, CMPE230
   Batch 0'dan beri ilk kez) ve prep sırasında **CMPE244** de eklendi. **Kapsam kararını etkileyen bir
   düzeltme çıktı:** makale 37'nin asıl dayanağı **CMPE244 *Computer Organization***'dır; CMPE240'ın adı
   *Digital Systems*'tir. Yol haritasının 37. satırı düzeltildi (ARASTIRMA §16).
5. **Beş eski borç ödendi.** (a) 12'nin **disk tabanlı arama yapıları ve B-ağacı** borcu 34'te XFS'in B-ağacı
   dizinleriyle ödendi. (b) 10'un **dizi ile bağlı liste** takası üç ayırma yöntemi olarak geri geldi.
   (c) 9'un **ortalama durumun dağılım varsayımı** borcu 36'da ödendi. (d) 6'nın **doğum günü ilkesinin
   olasılık hâli** 36'da hesaplandı. (e) 24'ün devredilen **rastgeleleştirilmiş seçim beklenti analizi**
   36'da türetildi ve benzetimle ölçüldü.
6. **İki terim çakışması bilinçli olarak çözüldü ve metinde adlandırıldı.** *seek time* için "arama" 11'den
   beri *search* demek olduğu için **"iz değiştirme süresi"** seçildi; *availability* için "erişilebilirlik"
   16'dan beri *reachability* demek olduğu için **"kullanılabilirlik"** seçildi. Ayrıca 32'nin "sayfa dizini"
   ile 34'ün "dizin"i arasındaki fark bir cümleyle söylendi.
7. **On sekiz sayısal iddia bağımsız hesaplandı ya da programla doğrulandı** (ARASTIRMA §16'nın sonundaki
   liste): inode tavan aritmetiği, meta veri oranı, disk G/Ç oranları, erişim yolu muhasebesi, bit eşlemi
   maliyeti, erişim matrisi ile dokuz bitin karşılaştırması, tuz, izin bitleri, doğum günü (kesirli
   aritmetikle), Bayes, şapka problemi, hash zincir uzunluğu, rastgeleleştirilmiş seçim, Markov/Chebyshev ve
   üç maçlık seri.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları, id/slug/order/
   hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi. `/boun` 33 → 36 sayfa.

## Açık borçlar

- **Coffman, Elphick & Shoshani (1971) *System Deadlocks* okunamadı** (Batch 10'da ACM DL 403, iki ayna 403 ve
  404; bu run'da yeniden denenmedi). Kilitlenmenin dört koşulu OSTEP'in aktardığı biçimde verildi ve makale 31
  bunu söylüyor.
- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları** hiçbir bölüm
  için doğrulanamadı (tam liste ARASTIRMA §12'de). Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf yapılır.
  Faz D'nin ders kitabı karşılığı Silberschatz'tır ve onun bölüm ile alt bölüm adları resmî içindekiler
  PDF'inden doğrulanmıştır (ARASTIRMA §13).
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
- **Süreç API'si (`fork()`, `exec()`, `wait()`) hâlâ somutlaştırılmadı.** OSTEP Chapter 5 (`cpu-api.pdf`)
  Batch 9'da indirildi; borç **38'dedir** ve CMPE230'un katalog tanımındaki "Unix environment and system
  calls" ifadesi resmî dayanağıdır.
- **Kopyalarken yazma (copy-on-write) 33'te ve 34'te anılmadı**; Silberschatz 10.3'ün konusudur ve `fork()`
  ile birlikte **38'de** anlatılmalıdır.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, örneği verilmedi; 36'da da açılmadı,
  **41'e** devredildi.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının kalan tek örneğidir.
- **Cook-Levin teoremi yalnızca sezgi düzeyinde verildi**; bilinçli kapsam kararıdır.
- **Peterson/Dekker algoritmaları 29'da hiç kullanılmadı**; Silberschatz 6.3'ün konusu olduğu için 41'in
  provasında sorulabilir.
- **Bölüt tablosu ve tersine sayfa tablosu 32'de anılmadı**; bilinçli kapsam kararıdır, 41'de sorulabilir.
- **Öncelik tersine dönmesinin gerçek zamanlı sistem hâli (29 → 35) 35'te açılmadı.** Gerçek zamanlı
  çizelgeleme 35'in kapsamına girmedi; pin güvenlik diline çevrildi (canlılık ihlali kasten tetiklenirse
  kullanılabilirlik saldırısıdır) ama gerçek zamanlı tartışma **41'e** kaldı.
- **Kesikli olay benzetimi ve indeksli öncelik kuyruğu (23 → 34) 34'te kullanılmadı**; disk zamanlaması
  bunları gerektirmedi. Beklenti YOL-HARITASI'nda düzeltildi.
- **Güçlü bağlı bileşenler (25 → 34, 39) 34'te kullanılmadı**; 39'da sorgu grafında geri çağrılabilir.
- **CMPE343'ün katalog tanımındaki moment üreten fonksiyonlar, gama dağılımı ve regresyon 36'da bilinçli
  olarak kapsam dışı bırakıldı** (sözlü savunma ölçütü için gerekli değiller); 41'in provasında "ne kadarını
  savunabilirim" sorusuyla geri gelebilir.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı takipsiz dosyalar var** (ör. kesme işareti içeren
  `**zorundadır**.` benzeri adlar, kök dizinde). BOUN kapsamı dışıdır, bu run'da dokunulmadı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer.
  Bu yüzden canlı sync uçtan uca denenemez ve `tests/e2e/reader-data.spec.ts` içindeki **iki test
  bu nedenle başarısızdır** (bu run'da yeniden kontrol koşusuyla kanıtlandı).
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
  `artifacts/b11-research/login-b11.mjs`.
- **Çerez ana bilgisayarı önemlidir.** Render betiklerinde taban adres baştan sona
  **`http://localhost:<port>`** olmalıdır (`127.0.0.1` çerezi gönderilmez).
- **Tema `data-theme` özniteliğiyle değil, kök elemandaki SINIFLA uygulanır** (`dark` / `sepia`; `system`
  seçiliyken hiçbiri). Tercihler `localStorage`'da **`anil-lib:reader-preferences:v1`** anahtarında bir JSON
  olarak durur ve `ctx.addInitScript` ile yazılır. Doğrulanmış zemin renkleri: light `rgb(250, 249, 247)`,
  dark `rgb(18, 20, 23)`, sepia `rgb(244, 239, 228)`.
- **Dev sunucusuna gezinme ara sıra `net::ERR_NETWORK_CHANGED` veriyor**; render betikleri `goto` çağrısını
  **üç denemeli** bir döngüye almalıdır (çalışan örnek: `shot-batch11.mjs`).
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık kalır).
- **Paralel AI oturumu aynı depoda çalışıyor ve kataloğunu büyütüyor** (bu run sırasında AI serisi 98
  makaleydi ve 3 yeni makale dosyası henüz kataloğa girmemişti; `pnpm build` 156 statik sayfa üretti).
  İki Next süreci `.next` dizinini paylaşırsa birbirini bozar; **yalıtılmış kopya zorunludur** ve **ayrı bir
  port** seçilmelidir (bu run 3103 kullandı).
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Gövde düzenlenip
  `sync-series-hashes.cjs --write` çalıştırıldıktan sonra kopyaya yeni içeriği kopyala ve dev sunucusunu
  **yeniden başlat**; yoksa `/boun/<slug>` 500 verir.
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır. Çalışan sürüm:
  `artifacts/b11-research/denetim.py` (dosyaları **binary** okur; `core.autocrlf` repo düzeyinde `true`).
- **Doküman dosyalarının satır sonları CRLF'tir** (`ARASTIRMA.md`, `YOL-HARITASI.md`, `HANDOFF.md`).
  `git status` temiz görünse de Python ile düzenlerken `io.open(..., newline="")` ile oku, **CRLF'i LF'e
  çevirip eşleştir, yazarken geri çevir**. (Bu run'da `head -c 2000 | grep $'\\r'` yanıltıcı biçimde "LF"
  dedi; dosyanın tamamına bakmak gerekir.)
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri `PYTHONIOENCODING=utf-8`
  ile çalıştır.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe karakterleri BOZUYOR** — bu run'da `ş`, `ç`, `İ` karakterleri
  mojibake oldu ve `assert` patladı. Türkçe içeren Python/Markdown blokları **`Write` aracıyla dosyaya
  yazılmalıdır**; kısa tek satırlık düzenlemelerde `python -c "…"` çalışır.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz.** Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**.
- **İçerik denetleyicisinin şekil başlığı (title) içinde PARANTEZ OLAMAZ.** "Diyagram kendi paragrafında tek
  başına durmalı" kuralının regex'i `\(assets\/[^)]*\)$` kullanır; başlıktaki bir `)` eşleşmeyi erken bitirir
  ve yanıltıcı bir hata verir. Bu run'da `"Şekil 1 — … P(pozitif | hasta) …"` başlığı bu yüzden reddedildi.
- **Repo SVG denetleyicisi metin–metin çakışmasına BAKMAZ**; `artifacts/b11-research/ortusme.py` bunu tarar
  ama **yalnızca çakışmayı** bulur. Bu run'da ortusme 0 uyarı verdi, gerçek render ise **iki düzen hatası**
  yakaladı (bir etiket yanlış kutuya yapışmıştı, bir başlık ile satır arası çok dardı). **Diyagram ekran
  görüntülerini tek tek gözle incelemek zorunludur.**
- **Ortamda PDF'i görüntüye çeviren araç yok**; `/mingw64/bin/pdftotext` ve Python `pypdf` var.
- **Dijkstra'nın EWD PDF'leri taranmış görüntüdür**; arşivin HTML transkripsiyonu kullanılmalıdır ve
  **transkripsiyon sayfalıdır** (`EWD123-2.html` gibi).

## Bu run'da doğrulananlar

- İçerik/SVG denetleyicileri: BOUN **36 makale + 72 diyagram** temiz. `entegre-batch` kuru çalışması 3 yeni
  makaleyi buldu, `--write` sonrası fark kalmadı; `sync-series-hashes --write` **iki kez** çalıştırıldı
  (alt metin düzeltmelerinden sonra tekrar) ve sonunda fark kalmadı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü **36/36**; `article_id`, başlık, slug, özet, kategori, seviye,
  sıra, kohort ve klasör adı eşleşmesi 36/36; `reading_order` **1–36 kesintisiz**; kohort dağılımı
  **12 × 3**; gövdelerde referans verilen **72 SVG'nin hepsi diskte ve diskte referanssız SVG yok**;
  roadmap'in "yayinda" kümesi katalogla birebir aynı (36 kayıt).
- **Global article-id ve slug benzersizliği:** run ortasında **152/152** (18 ana + 98 AI + 36 BOUN), run
  sonunda **156/156** (paralel AI oturumu kendi kataloğunu 102'ye çıkardığı için); ikisi de tam benzersiz ve
  BOUN tarafı iki ölçümde de aynıdır.
- `pnpm typecheck` temiz (kopya silindikten sonra tekrar koşuldu, yine temiz) · `pnpm test` run ortasında **637/637**,
  run sonunda **642/642** (29 test dosyası; paralel AI oturumu kendi testlerini büyüttü) · `pnpm build`
  başarılı: run ortasında **156**, run sonunda **160 statik sayfa**, **36'sı `/boun`** (route tablosunda
  `/boun/[slug]` altında 3 + 33 yol). Toplam sayfa sayısı sabit referans **değildir**; sabit referans
  testlerin tamamının geçmesi ve `/boun` yol sayısının katalogla eşleşmesidir.
- **Gerçek render (ekran görüntülü, yalıtılmış kopyada, port 3103):** üç yeni makale, üç genişlik
  (375 / 768 / 1440) × üç tema (light / dark / sepia) = **27 kombinasyon**, ayrıca `/boun` girişi üç
  genişlikte (toplam **30 ekran görüntüsü**). Her makale sayfasında 2 figure, doğru figcaption, yatay taşma
  yok, `undefined` / `NaN` sızıntısı yok, tek console hatası bilinen 503 sync çağrısı. Üç temanın zemin rengi
  ayrı ayrı ölçüldü. `/boun` girişinde üç yeni başlık ve **"Destekleyici Temeller" grubu** üç genişlikte de
  göründü. Düzeltmelerden sonra render **yeniden koşuldu** ve yine temiz çıktı.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran görüntüsü).
  **İki gerçek düzen hatası bulundu ve düzeltildi:** makale 34'ün birinci şeklinde üçüncü panelin bağlantı
  etiketi ikinci panelin notuna yapışıyordu (panel 12 birim aşağı kaydırıldı); ikinci şeklinde "1024
  işaretçi" notu yanlış kutuya bitişik duruyordu ve "inode" başlığı ilk satıra çok yakındı (şekil yeniden
  düzenlendi, not "her biri 1024 işaretçi taşır" olarak dolaylı blok kutularının üstüne alındı). Üç makalenin
  alt metinleri de bu değişikliklere ve render'daki gerçek görünüme göre güncellendi.
- **Kod bloğu render'ı ayrı doğrulandı:** sekiz `pre` öğesi desktop ve mobile × light ve dark
  kombinasyonlarında açıldı (**32 ekran görüntüsü**); JetBrains Mono, 13,44px, `overflow-x: auto`, sayfada
  yatay taşma yok, 375px'te uzun bloklar kendi içinde kayıyor (clientW 333 / scrollW 430–465).
- **Playwright: 50 geçti, 1 atlandı, 2 başarısız.** İkisi de `reader-data.spec.ts`'tedir ve **BOUN kaynaklı
  değildir — kontrol koşusuyla yeniden kanıtlandı:** kopyada katalog ve roadmap `git show HEAD:` ile geri
  alınıp 3 makale ile `supporting-fundamentals` klasörü ve 3 asset klasörü silindikten sonra, dev sunucusu
  yeniden başlatılıp yalnızca o spec koşuldu ve **aynı iki test aynı şekilde düştü** (2 geçti, 2 düştü).
  O spec dosyası `boun` ya da `series-boun` geçmiyor.
- **Temizlik sırası doğrulandı:** önce junction kaldırıldı, sonra kopya silindi; ardından `node_modules`
  sağlamlığı ölçüldü (`.pnpm` altında **722 paket**) ve `pnpm typecheck` yeniden temiz çıktı.
- **Not:** makale sayfalarında `main h1` **yoktur** (başlık `document.title`'dadır); serinin mevcut deseni,
  regresyon değil.

## Sıradaki batch hazırlığı — Batch 12 (Makale 37'den itibaren)

**Pedagojik hedef:** 36, bir maliyet iddiasını dağılımıyla savunmayı öğretti ama bütün maliyet hesapları hâlâ
9'un RAM modelinin üstünde duruyor. 37 o soyutlamanın altına iniyor: komut yürütme, bellek hiyerarşisi ve
önbellekler — yani Faz D boyunca gördüğümüz "her erişim aynı fiyat değil" gözleminin donanım gerekçesi.
38 aynı kavramları koda indiriyor (süreç API'si, adres uzayı düzeni, işaretçiler). 39 veritabanlarını
savunma düzeyinde açıyor ve 12'nin indeks borcunu kapatıyor. 40–41 sözlü prova ve sentezdir.

**Prerequisite satırları (37–39 için taslak; YOL-HARITASI'nda da var):**
- 37 ← 9 (RAM modelinin "her erişim aynı fiyat" varsayımı burada terk edilir), 33 (bellek bir önbellektir;
  AMAT aynen geçerlidir), 32 (TLB bir önbellektir; sayfa boyutunun iki yönlü takası), 34 (dış bellek modeli
  ve blok muhasebesi), 8 (Boolean sadeleştirme ve mantık devreleri), 27 (bağlam anahtarının çevrim cinsinden
  ucuzlamaması)
- 38 ← 27 (`fork()`/`exec()`/`wait()`; devredilen borç), 32 (adres uzayı düzeni), 10 (işaretçi maliyeti C'de
  görünür olur), 33 (kopyalarken yazma; devredilen borç), 26 (sistem çağrısı ve kip geçişi)
- 39 ← 12 (indeks = B-ağacı; devredilen borç), 34 (tampon havuzu, dosya sistemi önbelleği, dış sıralama),
  31 (kilitlenme ve işlem yönetimi), 30 (güvenlik/canlılık ve yalıtım düzeyleri), 15 (kararlılık),
  36 (seçicilik kestirimi bir olasılık iddiasıdır)

**Araştırma ihtiyacı:** Faz E'nin resmî sayfaları bu run'da doğrulandı ve **37 için borç yok** — asıl dayanak
**CMPE244 *Computer Organization***'dır (katalog tanımı + ders çıktıları ARASTIRMA §16'da birebir), CMPE240
*Digital Systems* ikincil sinyaldir. 38 için CMPE230 *Systems Programming*, 39 için resmî bir ders **yoktur**
(YOL-HARITASI'nın kapsam kararı: transkript savunması + B-ağacı tahsili); 39'un kaynakçası bunu açıkça
söylemelidir.

Hazır ipuçları (hepsinin adresi bu run'da HTTP 200 ile doğrulandı; **içerikleri okunmadı**):

- **37 için:** `https://people.freebsd.org/~lstewart/articles/cpumemory.pdf` (Drepper, *What Every Programmer
  Should Know About Memory* — bellek hiyerarşisi sayıları), `https://csapp.cs.cmu.edu/3e/students.html`
  (CS:APP öğrenci sitesi), `https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/`
  (MIT 6.004). Patterson & Hennessy ücretsiz değildir; **bölüm düzeyinde bile atıf yapmadan önce bir
  içindekiler kaynağı bulunmalıdır** (CLRS'te olduğu gibi).
- **38 için:** OSTEP `cpu-api.pdf` (Chapter 5, *Interlude: Process API* — `fork`/`exec`/`wait`) ve
  `vm-api.pdf` (Chapter 14, *Interlude: Memory API* — `malloc`/`free`, yaygın hatalar) **bu run'da adresleri
  doğrulandı, indirilmedi**; `vm-freespace.pdf` (Chapter 17) Batch 10'dan beri elde ve hâlâ kullanılmadı.
  xv6 kitabı (`https://pdos.csail.mit.edu/6.828/2024/xv6/book-riscv-rev4.pdf`) çekirdek içi somutlamayı verir.
- **39 için:** `https://15445.courses.cs.cmu.edu/fall2024/` (CMU 15-445, ders notları ve slaytlar) ve
  `https://www.db-book.com/` (Silberschatz, *Database System Concepts* — resmî içindekiler burada aranmalı;
  OS kitabında olduğu gibi alt bölüm adları doğrulanabilirse alt bölüm düzeyinde atıf yapılabilir).

**Yayımlanmış makalelerin verdiği sözler.** Makale 34–36 de **numaralı ileri vaat vermedi**; bütün ileri
göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **37'de karşılanmalı (36'nın en somut vaadi):** bellek hiyerarşisi, önbellekler ve komut yürütme; RAM
  modelinin "her erişim aynı fiyat" varsayımının neden ve nerede bozulduğu; 32'nin **TLB bir önbellektir** ve
  **sayfa boyutunun iki yönlü takası** pinleri; 27'nin **bağlam anahtarının çevrim cinsinden ucuzlamaması**
  gözleminin donanım gerekçesi; 17'nin **eşik ve kesişim noktası** pininin sabitler büyüyünce nasıl kaydığı;
  8'in **Boolean sadeleştirme** pininin devre düzeyindeki karşılığı; 24'ün **iş ile açıklık** ayrımının
  donanım paralelliğinde sürmesi.
- **38'de karşılanmalı:** `fork()`/`exec()`/`wait()` somutlaması (27'den devreden borç), **kopyalarken yazma**
  (33'ten devreden borç), adres uzayı düzeninin C'deki görünümü (32), işaretçi maliyeti (10).
- **39'da karşılanmalı:** indeks = B-ağacı (12), ACID ve yalıtım düzeyleri (30, 31), kararlılık (15), dış
  sıralama (15, 34), seçicilik kestirimi (36), güçlü bağlı bileşenler ya da sorgu grafı (25).
- **Konu bazlı, numarasız pinler (34–36'dan):** dayanıklılık/başarım takası (34 → 39, işlem günlüğü);
  tampon havuzu ve kapsayıcı koşul (34 → 39); "sıralı kullan" ilkesi (34 → 37, 39); iptal ve yetenek
  zayıflığı (35 → 41); güvenin olasılık olmaması (36 → 40, 41); Markov/Chebyshev ve yoğunlaşma
  (36 → 37, 39, 41); Monte Carlo ile Las Vegas (36'da formalleşti → 41).
- Batch 0–10'dan devreden ödenmemiş pinler: d-yollu heap (13 → ödenmedi), Boolean sadeleştirme (8 → 37, 39),
  bellek hiyerarşisi (9, 12, 32, 33 → 37), kararlılığın veritabanı karşılığı (15 → 39), indeks = B-ağacı
  (12 → 39), güçlü bağlı bileşenler (25 → 39), indirgemenin yönü (25 → 41), öncelik tersine dönmesinin
  gerçek zamanlı hâli (29 → 41), alt problem kısıtlama/genişletme (22 → 41).

**Görselleştirme öngörüsü:** 37: bellek hiyerarşisinin katmanları ile her katmanın gecikmesi ve boyutu
(sayılar bir kaynaktan alınmalı ya da açıkça "kendi ölçeğim" denmeli); ikinci şekil önbellek eşlemesi
(doğrudan eşlemeli / kümeli çağrışımlı) ya da bir komutun boru hattındaki aşamaları olabilir.
38: bir sürecin adres uzayı düzeni (kod / veri / heap / yığın) ve `fork()`'tan sonra iki adres uzayının
kopyalarken yazma ile paylaşması. 39: aynı sorgunun tam tarama ile B-ağacı indeksi üzerinden maliyetinin
blok cinsinden karşılaştırılması.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim, renk yalnızca
`var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı, `<` ve `>` karakterleri
`&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`, `--text-muted`, `--text-faint`,
`--border`, `--surface`, `--surface-muted`, `--accent`, `--accent-soft`, `--cool`, `--cool-soft`. Satır
uzunluğu sınırı, başlıkta parantez yasağı ve çakışma denetimi için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (37):** "Bellek hiyerarşisi neden var ve bir önbellek ıskası ne kadar pahalı?";
"RAM modeli nerede bozulur ve bu, yazdığın algoritmayı nasıl değiştirir?"; "Bağlam anahtarı neden çevrim
cinsinden ucuzlamıyor?".

**Araç sırası (Batch 1–11'de doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs` yalnızca
**katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch` roadmap
   başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz** (Batch 10 ve 11'de
   başlık değişmediği için bu adım atlandı),
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy; `article_id` için
   gerçek bir UUID üret — şema `article_<uuid>` kalıbını zorunlu kılar),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen — alt metin düzeltmesi dahil — 5. adımı
   yeniden çalıştır, kopyaya yeni içeriği kopyala ve dev sunucusunu yeniden başlat.**
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
   `corepack pnpm exec next dev -p 3104 -H 127.0.0.1`.
4. **Bir kez giriş yapıp oturumu kaydet** (`artifacts/b11-research/login-b11.mjs`): taban adres
   **`http://localhost:<port>`**, kullanıcı `anil`, parola `test-reader-pass`; `ctx.storageState({path})` ile
   JSON'a yaz. Betiğin çıkış kodunu ayrıca kontrol et.
5. **Render:** `shot-batch<N>.mjs` (27 kombinasyon + `/boun`), `figs-b<N>.mjs` (diyagram başına ekran
   görüntüsü, light + dark), `pre-b<N>.mjs` (kod bloğu; beklenen `pre` sayısını betikte güncelle). Üçü de
   taban adresi `RENDER_BASE`'den alır ve slug listesi başta durur. **Diyagram ekran görüntülerini tek tek
   gözle incele** — alt metnin şekille uyuştuğunu da orada denetle. Ayrıca `ortusme.py` ile metin çakışmasını
   tara (ama tek başına yeterli değildir).
6. **E2E:** aynı sunucu kullanılabilir. Kopyada `PLAYWRIGHT_PORT=<port> corepack pnpm exec playwright test`.
7. **Başarısız testleri atfetmek için kontrol koşusu:** kopyada katalog ve roadmap'i ana depodan
   `git show HEAD:<yol>` ile geri yaz, yeni makale ve asset klasörlerini sil, dev sunucusunu yeniden başlat ve
   **yalnızca düşen spec dosyasını** tekrar koş.
8. **Temizlik — sıra önemlidir:** **önce** junction'ı kaldır
   (`powershell -NoProfile -Command "cmd /c rmdir '<kopya>\node_modules'"`), **sonra** kopyayı `rm -rf` ile
   sil. Ters sırada `rm -rf` junction'ı takip edip **gerçek `node_modules`'ü siler**. Silme sonrası depo
   kökünde `pnpm typecheck` çalıştırıp `node_modules`'ün sağlam olduğunu doğrula.
9. **Sunucuyu durdurmak:** `netstat -ano` ile portu **LISTENING** durumda dinleyen PID'i bul (TIME_WAIT
   satırları PID 0'dır, onlara aldanma) ve `Stop-Process -Id <pid> -Force` çalıştır; ardından portun gerçekten
   kapandığını doğrula.

## Non-normative history

- **2026-09-11 (Batch 11, `BATCH=3+1`):** Makale 34–36 yayımlandı; **Faz D kapandı ve Faz E açıldı**.
  `supporting-fundamentals` kategorisi kod değişikliği olmadan devreye girdi ve **serinin son kategori kararı
  verilmiş oldu**. Faz E'ye geçerken CMPE343, CMPE240, CMPE230 ve CMPE244 sayfaları Batch 0'dan beri ilk kez
  okundu; **makale 37'nin asıl dayanağının CMPE244 *Computer Organization* olduğu** bulundu ve yol haritası
  düzeltildi. 12'nin B-ağacı borcu, 10'un dizi/bağlı liste takası, 9'un dağılım varsayımı, 6'nın doğum günü
  pini ve 24'ün rastgeleleştirilmiş seçim beklenti analizi ödendi. Doğrulama: BOUN içerik + SVG
  denetleyicileri temiz (36 makale, 72 diyagram), bağımsız Python denetimi 36/36, `pnpm typecheck` temiz,
  `pnpm test` 637/637 → 642/642, `pnpm build` başarılı (156 → 160 statik sayfa, 36'sı `/boun`), global id/slug benzersizliği run ortasında
  152/152 ve run sonunda 156/156, Playwright 50 geçti / 1 atlandı / 2 başarısız — ikisinin de BOUN'la ilgisiz olduğu kontrol
  koşusuyla yeniden kanıtlandı, 30 render ekran görüntüsü, 6 diyagram (light + dark) ve 8 kod bloğu
  (desktop + mobile × light + dark, 32 görüntü) doğrulandı; görsel incelemede **iki düzen hatası** bulunup
  düzeltildi ve hash'ler yeniden senkronlandı.
- **2026-09-10 (Batch 10, `BATCH=3+1`):** Makale 31–33 yayımlandı; **Faz D'nin eşzamanlılık bölümü kapandı ve
  sanallaştırmanın bellek yarısı kuruldu** (kilitlenme, adres çevirisi ve sayfalama, sanal bellek). Dijkstra'nın
  **bankacı algoritması** EWD 123'ün 6. bölümünden birincil kaynak olarak alındı; Coffman ve arkadaşlarının
  1971 çalışmasına erişilemedi. Doğrulama: denetleyiciler temiz (33 makale, 66 diyagram), bağımsız Python
  denetimi 33/33, `pnpm test` 615/615 → 618/618, `pnpm build` 149 statik sayfa, benzersizlik 145/145 → 149/149,
  Playwright 50/1/2, 30 render ekran görüntüsü, 6 diyagram ve 4 kod bloğu doğrulandı; bir panel başlığı
  çakışması ve bir alt metin hatası düzeltildi.
- **2026-09-10 (Batch 9, `BATCH=3+1`):** Makale 28–30 yayımlandı; **Faz D'nin eşzamanlılık gövdesi kuruldu**.
  Seride ilk kez **Dijkstra'nın kendi metinleri** (EWD 123 ve EWD 310) ve **Lamport 1977** birincil kaynak
  olarak kullanıldı. Doğrulama: denetleyiciler temiz (30 makale, 60 diyagram), `pnpm test` 599/599 → 605/605,
  `pnpm build` 142 → 146 statik sayfa, benzersizlik 138/138 ve 142/142, Playwright 50/1/2, 30 render ekran
  görüntüsü, 6 diyagram ve 2 kod bloğu doğrulandı; üç alt metin hatası düzeltildi.
- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D açıldı**,
  `operating-systems` klasörü kod değişikliği olmadan devreye girdi. Doğrulama: denetleyiciler temiz
  (27 makale, 54 diyagram), bağımsız Python denetimi 27/27, `pnpm test` 407/407 → 419/419, `pnpm build` 87 →
  91 statik sayfa, benzersizlik 83/83 ve 87/87, Playwright 31/1/9, 27 render kombinasyonu, 6 diyagram ve
  1 kod bloğu doğrulandı.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni üçlüsü kapandı**.
  Doğrulama: denetleyiciler temiz (24 makale, 48 diyagram), `pnpm test` 291/291 → 294/294, `pnpm build` 83 →
  87 statik sayfa, benzersizlik 76/76 ve 80/80, Playwright 21/1/4, 27 render kombinasyonu, 6 diyagram ve
  2 kod bloğu doğrulandı.
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
