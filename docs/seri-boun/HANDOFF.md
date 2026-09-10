# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-10 · Durum: **1–33 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30, Batch 10: 31–33) · Sıradaki: 34**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 33 — `sanal-bellek-talep-sayfalama-ve-degistirme` |
| Sıradaki güvenli başlangıç | Makale 34 ("Dosya Sistemleri ve Giriş/Çıkış") — **Faz D'nin kalıcılık bölümü**; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 11` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–33 → `operating-systems` (klasör adı `category` alanıyla birebir aynı). **34–35 de `operating-systems`'e girer; kod değişikliği ya da yeni okuma listesi grubu gerekmez.** İlk kategori kararı **36'da** (Faz E) verilecek: `supporting-fundamentals` hâlâ tanımlı ve kullanılmamıştır. |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 10'da ne yapıldı

1. **Makale 31–33 yayımlandı** (`classification_batch: 10`), her biri 2 diyagram ve 2 sözlü
   checkpoint kutusuyla; 31'de iki, 32 ve 33'te birer sözde kod bloğu var. **Faz D'nin
   eşzamanlılık bölümü 31 ile kapandı**, sanallaştırmanın bellek yarısı 32 ve 33 ile kuruldu.
   Kategori klasörü zaten açıktı; **`src/`, `tests/` ve `tools/` altında tek satır değişmedi**.
2. **Üç taslak başlık da olduğu gibi kaldı** — bu, Batch 4'ten beri ilk kez başlık genişletmesi
   yapılmayan run'dır. Üçü de makalenin gerçekten yaptığı işi zaten tam olarak adlandırıyordu, bu
   yüzden `roadmap.json` elle düzenlenmedi ve `entegre-batch` doğrudan çalıştırıldı.
3. **Dijkstra'nın bankacı algoritması birincil kaynaktan alındı.** EWD 123'ün **6. bölümü**
   (`The Problem of the Deadly Embrace`) ve **6.1**'i (`The Banker's Algorithm`) bu run'da ilk kez
   okundu; makale 31'in sayısal örneği (sermaye 100; P1 80/40, P2 60/20; ikisine de birer sayfa
   verilince kasa 38'e düşer ve durum güvensiz olur) doğrudan Dijkstra'nın kendi tablosudur ve
   güvenlik yordamı da onun yazdığı biçimde kodlanıp doğrulandı.
4. **Bir kaynak erişilemedi ve bu açıkça yazıldı.** Kilitlenmenin dört koşulunun özgün kaynağı
   Coffman, Elphick & Shoshani (1971) ACM Digital Library'de **HTTP 403** verdi; iki üniversite
   aynası da açılmadı. Dört koşul bu yüzden **OSTEP'in aktardığı biçimde** verildi ve makale 31'in
   kaynakçası bunu söylüyor. Bu, kapanmamış bir borçtur.
5. **Beş eski borç ödendi.** (a) 30'un **dört koşul** vaadi 31'de karşılandı. (b) 19'un **azalan
   ölçü** fikri bankacının güvenlik yordamının sonlanma ispatı oldu. (c) 16'nın **döngü tespiti**
   kaynak atama grafında kullanıldı — ve tek/çok örnekli kaynak ayrımı kendi kurduğum örnekle
   gösterildi. (d) 14'ün **doğrudan erişim dizisi** pini 32'de sayfa tablosu olarak ödendi.
   (e) 22'nin **bellekleme ile tablolama** takası 33'te kusursuz LRU ile saat algoritması
   arasındaki seçim olarak ödendi.
6. **Bir terim çakışması bilinçli olarak İngilizce bırakıldı.** *Livelock*'un Türkçesi "canlı
   kilitlenme" diye çevrilir; 30'da **canlılık özelliği** (*liveness*) başka bir sınıfı
   adlandırdığı için terim İngilizce bırakıldı ve neden bırakıldığı makale 31'de bir cümleyle
   söylendi. Aynı biçimde *stack property* için "kapsama özelliği" seçildi, çünkü "yığın"
   10\. makaleden beri *stack* demektir; ad farkı makale 33'te açıkça anlatıldı.
7. **On üç sayısal iddia bağımsız hesaplandı ya da programla doğrulandı** (ARASTIRMA §15'in
   sonundaki liste): iki kilitli kilitlenmenin durum uzayı (19 durumda 1 kilitlenme / 16 durumda
   0), bankacının dört durumu, kaynak atama grafında döngü ≠ kilitlenme, adres çevirisi
   aritmetiği, sayfa tablosu boyutu, çok düzeyli tablonun 5,33 kat tasarrufu, gerçek sayfa
   boyutunda TLB isabet oranı (%99,9023), etkin bellek erişimi, AMAT, üç değiştirme ilkesinin
   erişim erişim izleri, Belady anomalisi, döngüsel iş yükünün %0 isabeti ve saat algoritmasının
   oyuncak dizideki sonucu.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 30 → 33 sayfa.

## Açık borçlar

- **Coffman, Elphick & Shoshani (1971) *System Deadlocks* okunamadı** (ACM DL 403, iki ayna 403 ve
  404). Kilitlenmenin dört koşulu OSTEP'in aktardığı biçimde verildi ve makale 31 bunu söylüyor.
  Erişilebilir bir kopya bulunursa metin doğrudan doğrulanmalıdır.
- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları**
  hiçbir bölüm için doğrulanamadı (tam liste ARASTIRMA §12'de). Pratik sonucu: CLRS'e **bölüm
  düzeyinde** atıf yapılır. Faz D'nin ders kitabı karşılığı Silberschatz'tır ve **onun bölüm ile
  alt bölüm adları resmî içindekiler PDF'inden doğrulanmıştır** (ARASTIRMA §13, §14, §15;
  5–10, 12–17. bölümler hazır).
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
- **Süreç API'si (`fork()`, `exec()`, `wait()`) hâlâ somutlaştırılmadı.** OSTEP Chapter 5
  (`cpu-api.pdf`) Batch 9'da indirildi ve metne çevrildi; borç **38'e (C ve Bellek)** devredildi.
- **Rastgeleleştirilmiş seçim algoritmasının beklenti analizi ödenmedi**; 36'ya devredildi.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, örneği verilmedi. 36 ya da
  41'de açılabilir.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının kalan tek örneğidir.
- **Cook-Levin teoremi yalnızca sezgi düzeyinde verildi**; bilinçli kapsam kararıdır.
- **Peterson/Dekker algoritmaları 29'da hiç kullanılmadı** (modern gevşek bellek modellerinde
  çalışmadıkları için); Silberschatz 6.3'ün konusu olduğu için 41'in provasında sorulabilir.
- **Bölüt tablosu ve tersine sayfa tablosu 32'de anılmadı.** Bölütlemenin tek başına bir bölüt
  tablosu tuttuğu ve tersine sayfa tablosunun süreç başına olmayan tek yapı olduğu söylenmedi;
  ikisi de bilinçli kapsam kararıdır ve 41'in provasında sorulabilir.
- **Kopyalarken yazma (copy-on-write) 33'te anılmadı.** Silberschatz 10.3'ün konusudur ve
  `fork()` ile birlikte anlatılması doğaldır; **38'e** devredildi.
- **Boş alan yönetimi (OSTEP Ch. 17, `vm-freespace.pdf`) indirildi ama kullanılmadı.** Sayfalama
  boş liste yönetimini önemsizleştirdiği için 32'de yeri yoktu; ayırma yöntemleri **34'ün**
  konusudur ve dosya sistemi tarafında geri gelir.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı takipsiz dosyalar var** (ör. kesme işareti içeren
  `**zorundadır**.` benzeri adlar, kök dizinde). BOUN kapsamı dışıdır, bu run'da dokunulmadı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer.
  Bu yüzden canlı sync uçtan uca denenemez ve `tests/e2e/reader-data.spec.ts` içindeki **iki test
  bu nedenle başarısızdır** (bu run'da yeniden kontrol koşusuyla kanıtlandı).
- **`.env.local` dev sunucusunda parola kapısını AÇIYOR** (`SITE_PASSWORD_SHA256` ve
  `AUTH_COOKIE_SECRET` tanımlar), dolayısıyla `/boun` 307 döner. **Doğru yol:** sunucuyu
  `playwright.config.ts`'teki test değerleriyle başlat
  (`SITE_PASSWORD_SHA256=2e10d696…f2cef855`, `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`;
  kabuk env'i `.env.local`'i ezer) ve render betiklerinde **giriş yap**: kullanıcı `anil`, parola
  `test-reader-pass`. Doğru kurulduğunun hızlı işareti: `/boun` **307**, `/login` **200**.
- **Playwright paketi üst düzey `node_modules`'te YOKTUR.** pnpm sıkı yerleşim kullanıyor; render
  betiklerinde `import { chromium } from "playwright"` **çalışmaz**, `"@playwright/test"`'ten
  içe aktarılmalıdır. (Batch 10'da bu hatayla karşılaşıldı.)
- **Giriş bir Server Action'dır; `waitForNavigation` işe yaramaz.** Tıkla, sonra
  `page.waitForURL(...)` ile hedef URL'yi bekle. **Tuzak:** `waitForURL(/\/boun$/)` giriş
  sayfasının kendi URL'sine (`/login?next=/boun`) de uyar; predicate kullan:
  `(u) => u.pathname === "/boun" && u.search === ""`. Çalışan sürüm:
  `artifacts/b10-research/login-b10.mjs`.
- **Çerez ana bilgisayarı önemlidir.** Giriş sonrası uygulama `localhost`'a yönlendiriyor;
  `127.0.0.1` üzerinde kurulan çerez `localhost` isteklerine gönderilmez. Render betiklerinde
  taban adres baştan sona **`http://localhost:<port>`** olmalıdır.
- **Tema `data-theme` özniteliğiyle değil, kök elemandaki SINIFLA uygulanır.** `app/layout.tsx`
  içindeki tema betiği `documentElement`'e `dark` ya da `sepia` sınıfını ekler; `system` seçiliyse
  hiçbiri eklenmez. Render betiğinde temayı doğrulamak için `classList.contains("dark")` /
  `contains("sepia")` kullan. Tercihler `localStorage`'da **`anil-lib:reader-preferences:v1`**
  anahtarında bir JSON olarak durur ve `ctx.addInitScript` ile yazılmalıdır. Doğrulanmış zemin
  renkleri: light `rgb(250, 249, 247)`, dark `rgb(18, 20, 23)`, sepia `rgb(244, 239, 228)`.
- **Dev sunucusuna gezinme ara sıra `net::ERR_NETWORK_CHANGED` veriyor.** Bu run'da iki kez oldu;
  render betikleri `goto` çağrısını **üç denemeli** bir döngüye almalıdır (çalışan örnek:
  `shot-batch10.mjs`).
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık
  kalır) ve 90 sn timeout'a düşer.
- **Paralel AI oturumu aynı depoda çalışıyor ve kataloğunu büyütüyor** (bu run sırasında AI serisi
  94 makaleydi; `pnpm build` 149 statik sayfa üretti). İki Next süreci `.next` dizinini paylaşırsa
  birbirini bozar; **yalıtılmış kopya zorunludur**.
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Bir makale gövdesi
  düzenlenip `sync-series-hashes.cjs --write` çalıştırıldıktan sonra çalışmakta olan dev sunucusu
  eski katalog hash'ini tutar ve `/boun/<slug>` 500 verir. Çözüm: kopyaya yeni içeriği kopyala ve
  dev sunucusunu **yeniden başlat**.
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır
  (`sync-series-hashes.cjs:60`). Çalışan sürüm: `artifacts/b10-research/denetim.py`.
- **Depoda satır sonları karışık ve hash bayt üzerinden alınır.** `core.autocrlf` repo düzeyinde
  `true`; bağımsız denetim betiği dosyayı **binary** okumalıdır.
- **Doküman dosyalarının satır sonları farklıdır:** `ARASTIRMA.md` ve `YOL-HARITASI.md` **CRLF**,
  `HANDOFF.md` **LF**'tir. Python ile düzenlerken `io.open(..., newline="")` kullan ve eklenen
  metnin satır sonlarını hedef dosyaya çevir.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri
  `PYTHONIOENCODING=utf-8` ile çalıştır.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor.**
  Uzun Markdown/SVG/Python blokları `Write` aracıyla dosyaya yazılmalıdır. Ek tuzak: heredoc
  içindeki Python kodunda `"\\n"` gibi kaçışlar bozulabiliyor — üretilen dosyayı `node --check`
  ya da eşdeğeriyle doğrula.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz.** Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**.
- **Repo SVG denetleyicisi metin–metin çakışmasına BAKMAZ.** İki panelli şemalarda sol panel
  başlığı sağ panelin üzerine binebilir ve bunu yalnızca render yakalar. Bu run'da yazılan
  `artifacts/b10-research/ortusme.py` bunu tarar (Batch 10'da bir gerçek çakışma buldu), ama
  karakter genişliği tahmini yüzünden **yanlış pozitif verebilir** — uyarıyı render ile teyit et.
- **Ortamda PDF'i görüntüye çeviren araç yok**; `/mingw64/bin/pdftotext` ve Python `pypdf` var.
- **Dijkstra'nın EWD PDF'leri taranmış görüntüdür**; arşivin HTML transkripsiyonu kullanılmalıdır.
  **Transkripsiyon sayfalıdır:** EWD 123'ün birinci sayfası 5. bölümün başlığında biter, 5.
  bölümden sonrası `https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123-2.html`
  adresindedir ve bankacı algoritması oradadır.

## Bu run'da doğrulananlar

- İçerik/SVG denetleyicileri: BOUN **33 makale + 66 diyagram** temiz. `entegre-batch` kuru
  çalışması 3 yeni makaleyi buldu, `--write` sonrası fark kalmadı; `sync-series-hashes --write`
  iki kez çalıştırıldı (alt metin düzeltmesinden sonra tekrar) ve sonunda fark kalmadı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü **33/33**; `article_id`, başlık, slug, özet, kategori,
  seviye, sıra, kohort ve klasör adı eşleşmesi 33/33; `reading_order` **1–33 kesintisiz**; kohort
  dağılımı **11 × 3**; gövdelerde referans verilen **66 SVG'nin hepsi diskte ve diskte referanssız
  SVG yok**; roadmap'in "yayinda" kümesi katalogla birebir aynı (33 kayıt).
- **Global article-id ve slug benzersizliği:** run ortasında **145/145** (18 ana + 94 AI + 33 BOUN),
  run sonunda **149/149** (AI 98'e çıktığı için); ikisi de tam benzersiz ve BOUN tarafı iki ölçümde
  de aynıdır.
- `pnpm typecheck` temiz (kopya silindikten sonra tekrar koşuldu, yine temiz) · `pnpm test`
  run ortasında **615/615**, run sonunda **618/618** (29 test dosyası; bu run'da bellek tükenmesi
  yaşanmadı) · `pnpm build` başarılı: **149 statik sayfa**, **33'ü `/boun`** (route tablosunda
  `/boun/[slug]` altında 3 + 30 yol). Toplam sayfa sayısı sabit referans **değildir**; sabit
  referans testlerin tamamının geçmesi ve `/boun` yol sayısının katalogla eşleşmesidir.
- **Gerçek render (ekran görüntülü, yalıtılmış kopyada, port 3102):** üç yeni makale, üç genişlik
  (375 / 768 / 1440) × üç tema (light / dark / sepia) = **27 kombinasyon**, ayrıca `/boun` girişi
  üç genişlikte (toplam **30 ekran görüntüsü**). Her makale sayfasında 2 figure ve 2 gömülü
  diyagram SVG'si, doğru figcaption, yatay taşma yok, `undefined` / `NaN` sızıntısı yok, tek
  console hatası bilinen 503 sync çağrısı. Üç temanın zemin rengi ayrı ayrı ölçülerek temanın
  gerçekten uygulandığı doğrulandı. Betiğin kendi sorun listesi: **"Sorun yok."** Düzeltmelerden
  sonra render **yeniden koşuldu** ve yine temiz çıktı.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran
  görüntüsü). **Bir gerçek hata bulundu ve düzeltildi:** makale 32'nin birinci şeklinde sol panel
  başlığı sağ panel başlığının üzerine biniyordu (denetleyici bunu yakalamaz). Başlık kısaltıldı,
  parametre bilgisi panelin altına taşındı, alt metin buna göre güncellendi. Ayrıca makale 32'nin
  ikinci şeklinde alt metin iki okun eğimini yanlış anlatıyordu; düzeltildi.
- **Kod bloğu render'ı ayrı doğrulandı:** dört `pre` öğesi desktop ve mobile × light ve dark
  kombinasyonlarında açıldı (**16 ekran görüntüsü**); JetBrains Mono, 13,44px, `overflow-x: auto`,
  sayfada yatay taşma yok, 375px'te uzun bloklar kendi içinde kayıyor (clientW 333 / scrollW 511
  ve 624).
- **Playwright: 50 geçti, 1 atlandı, 2 başarısız.** İkisi de `reader-data.spec.ts`'tedir ve
  **BOUN kaynaklı değildir — kontrol koşusuyla yeniden kanıtlandı:** kopyada katalog ve roadmap
  `git show HEAD:` ile geri alınıp 3 makale ve 3 asset klasörü silindikten sonra, dev sunucusu
  yeniden başlatılıp yalnızca o spec koşuldu ve **aynı iki test aynı şekilde düştü** (2 geçti,
  2 düştü). O spec dosyası `boun` ya da `series-boun` geçmiyor.
- **Resmî sayfa yeniden doğrulandı (2026-09-10):** CMPE322 sayfası yeniden çekildi ve Batch 9'da
  çekilen kopyayla etiketlerden arındırılmış metin düzeyinde **birebir aynı** çıktı.
- **Not:** makale sayfalarında `main h1` **yoktur** (başlık `document.title`'dadır); serinin
  mevcut deseni, regresyon değil.

## Sıradaki batch hazırlığı — Batch 11 (Makale 34'ten itibaren)

**Pedagojik hedef:** 33, diski yalnızca bir kurtarma alanı olarak kullandı ve bunu açıkça söyledi.
34 diski asıl işine sokuyor: dosya ve dizin soyutlamaları, bir dosyanın bloklarının nasıl
izlendiği (bitişik / bağlı / indeksli ayırma ve inode), boş alan yönetimi, dizin uygulaması ve
tamponlamanın belirleyiciliği. 35 Faz D'yi kapatıyor: koruma alanı, erişim matrisi, yetenekler ve
kavramların Linux'taki karşılıkları. Faz D orada biter; 36 Faz E'yi açar ve **ilk kategori
kararını** gerektirir.

**Prerequisite satırları (34–36 için taslak; YOL-HARITASI'nda da var):**
- 34 ← 33 (bellek bir önbellektir; dosya sistemi önbelleği aynı takasın disk hâlidir), 12 (disk
  tabanlı arama yapıları ve B-ağacı; blok muhasebesi), 10 (bitişik dizi ile bağlı listenin
  işaretçi maliyeti → bitişik, bağlı ve indeksli ayırma), 30 (kapsayıcı koşul ve broadcast;
  tampon havuzu tahsisi), 21 (önek-serbest kod ve bit muhasebesi — dizin kayıtları)
- 35 ← 26 (kullanıcı kipi / çekirdek kipi ve ayrıcalık düzeyi), 31 (güvenlik ile canlılığın
  ayrımı ve "güvenlik" sözcüğünün iki anlamı), 5 (erişim matrisi bir bağıntıdır), 8 (Boolean
  sadeleştirme ve kafes — izin kümeleri), 34 (dosya izinleri somut örnektir)
- 36 ← 6 (sayma ve kombinatoryal olasılık), 9 (ortalama durumun dağılım varsayımı — burada
  ödenir), 24 (rastgeleleştirilmiş seçimin beklenti analizi; devredilen borç), 4 (özyinelemeli
  beklenti bağıntıları)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE322 **2026-09-10**'da iki kez doğrulandı
ve Faz D boyunca geçerlidir. Faz D'nin resmî dayanağı yalnızca *Catalog Description*'dır. 34 için
katalogda karşılığı olan ifade: "File system structures, allocation methods, dir…" (metnin
tamamı ARASTIRMA §13'te); 35 için katalog tanımının kalan kısmı okunmalıdır. **Faz E'ye geçerken
CMPE343 / CMPE240 / CMPE230 sayfaları yeniden doğrulanmalıdır** — bunlar Batch 0'dan beri
çekilmedi.

Hazır ipuçları (hepsinin adresi bu run'da doğrulandı, taban adres
`https://pages.cs.wisc.edu/~remzi/OSTEP/<dosya>.pdf`; dördü indirilip ilk sayfası okunarak
içeriği de teyit edildi):

- **34 için:** `file-intro.pdf` (Ch. 39, *Interlude: Files and Directories*), `file-implementation.pdf`
  (Ch. 40, dosya sistemi uygulaması ve inode), `file-ffs.pdf` (Ch. 41, hızlı dosya sistemi),
  `file-journaling.pdf` (Ch. 42, *Crash Consistency: FSCK and Journaling*), `file-integrity.pdf`
  (Ch. 45, *Data Integrity and Protection*), `file-lfs.pdf` (Ch. 43), `file-ssd.pdf` (Ch. 44).
  Giriş/çıkış tarafı için: `file-devices.pdf` (Ch. 36, *I/O Devices*), `file-disks.pdf` (Ch. 37,
  sabit diskler), `file-raid.pdf` (Ch. 38, RAID). Ayrıca **`vm-freespace.pdf` (Ch. 17) bu run'da
  indirildi ve kullanılmadı**; ayırma yöntemleri konusunda 34'te işe yarar. xv6 Chapter 8
  (File system) çekirdek içi somutlamayı verir.
- **35 için:** OSTEP'in güvenlik bölümü ayrı bir kısımdır ve adresleri doğrulandı:
  `security-intro.pdf`, `security-authentication.pdf`, `security-access.pdf` (Ch. 55,
  *Access Control*, Peter Reiher), `security-crypto.pdf`, `security-distributed.pdf`.
- **Silberschatz karşılıkları içindekiler PDF'inden doğrulandı** (ARASTIRMA §15'e de yazıldı):
  **Chapter 12 I/O Systems** (12.1 Overview, 12.2 I/O Hardware, 12.3 Application I/O Interface,
  12.4 Kernel I/O Subsystem, 12.5 Transforming I/O Requests to Hardware Operations, 12.6 STREAMS,
  12.7 Performance); **Chapter 13 File-System Interface** (13.1 File Concept, 13.2 Access Methods,
  13.3 Directory Structure, 13.4 Protection, 13.5 Memory-Mapped Files); **Chapter 14 File-System
  Implementation** (14.1 File-System Structure, 14.2 File-System Operations, 14.3 Directory
  Implementation, 14.4 Allocation Methods, 14.5 Free-Space Management, 14.6 Efficiency and
  Performance, 14.7 Recovery, 14.8 Example: The WAFL File System); **Chapter 15 File-System
  Internals** (15.1 File Systems, 15.2 File-System Mounting, 15.3 Partitions and Mounting,
  15.4 File Sharing, 15.5 Virtual File Systems, 15.6 Remote File Systems, 15.7 Consistency
  Semantics, 15.8 NFS); **Chapter 16 Security** (16.1 The Security Problem, 16.2 Program Threats,
  16.3 System and Network Threats, 16.4 Cryptography as a Security Tool, 16.5 User Authentication,
  16.6 Implementing Security Defenses, 16.7 An Example: Windows 10); **Chapter 17 Protection**
  (17.1 Goals of Protection, 17.2 Principles of Protection, 17.3 Protection Rings, 17.4 Domain of
  Protection, 17.5 Access Matrix, 17.6 Implementation of the Access Matrix, 17.7 Revocation of
  Access Rights, 17.8 Role-Based Access Control, 17.9 Mandatory Access Control (MAC),
  17.10 Capability-Based Systems, 17.11 Other Protection Improvement Methods, 17.12 Language-Based
  Protection).

**Yayımlanmış makalelerin verdiği sözler.** Makale 31–33 de **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **34'te karşılanmalı (33'ün en somut vaadi):** dosya ve dizin soyutlamaları; bir dosyanın
  bloklarının diskte nasıl izlendiği (**ayırma yöntemleri**); tamponlamanın belirleyiciliği;
  12'nin **disk tabanlı arama yapıları ve B-ağacı** borcunun ödenmesi; 33'ün "sakla ya da yeniden
  hesapla" takasının **dosya sistemi önbelleği** olarak geri gelmesi; 15'in **dış sıralama**
  pini; 21'in **bit muhasebesi** pini.
- **35'te karşılanmalı:** erişim matrisi ve yetenekler; 26'nın ayrıcalık düzeyi kavramının koruma
  alanına genişlemesi; 30'da uyarılan **"güvenlik" sözcüğünün iki anlamı** ayrımının burada
  yeniden anılması; kavramların Linux karşılıkları; **Faz D sentezi**.
- **Konu bazlı, numarasız pinler (31–33'ten):** kilit sırasının bir sözleşme olması ve ince taneli
  kilitlemenin sınırı (31 → 34, 39); güvensiz durum ile kilitlenmiş durumun ayrımı (31 → 41);
  livelock ve rastgele geri çekilme (31 → 39, veritabanı işlemleri); adres uzayının bir yanılsama
  olması (32 → 37, 38); TLB'nin bir önbellek olması ve bellek hiyerarşisi (32 → 37); sayfa
  boyutunun iki yönlü takası (32 → 37); bellek bir önbellektir (33 → 34); talep sayfalama ile ön
  getirme (33 → 34, disk önden okuma); çırpınma ve kabul denetimi (33 → 39, 41).
- Batch 0–9'dan devreden numarasız pinler: ortalama durumun dağılım varsayımı → olasılık makalesi
  (9 → 36), doğum günü ilkesinin olasılık hâli (6 → 36), indeks = B-ağacı → veritabanları
  (12 → 39), bellek hiyerarşisi (9, 12 → 37), d-yollu heap (13 → ödenmedi), kararlılığın
  veritabanı karşılığı (15 → 39), dış sıralama (15 → 34), Boolean sadeleştirme (8 → 37, 39),
  önek-serbest kod ve bit muhasebesi (21 → 34, 39), Monte Carlo ile Las Vegas (24 → 35, 36),
  indirgemenin yönü (25 → 41), güçlü bağlı bileşenler (25 → 34, 39), kırmızı-siyah ağacın çekirdek
  içi kullanımı (28 → 34, 39), kayıp uyandırma ve atomik "bırak ve uyu" (29 → 34), kapsayıcı koşul
  ve broadcast (30 → 34), öncelik tersine dönmesinin gerçek zamanlı sistem hâli (29 → 35).

**Görselleştirme öngörüsü:** 34: bir dosyanın bloklarının üç ayırma yöntemiyle diskte izlenmesi
(bitişik / bağlı / indeksli–inode) ve aynı dosya için erişim maliyeti karşılaştırması; ikinci
şekil inode → dolaylı blok zinciri ve azami dosya boyutu aritmetiği olabilir (sayılar elle
doğrulanmalıdır). 35: erişim matrisi ve aynı matrisin iki uygulaması (erişim denetim listesi ile
yetenek listesi) yan yana; ikinci şekil koruma halkaları ya da Linux izin bitleri olabilir.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`. Satır uzunluğu sınırı ve çakışma denetimi için
"bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (34):** "Bir dosyanın blokları diskte nasıl bulunur? Üç ayırma
yöntemini karşılaştır"; "inode neden dolaylı bloklar kullanır ve bu hangi dosya boyutu dağılımı
varsayımına dayanır?"; "Dosya sistemi önbelleği neyi çözer, hangi doğruluk sorununu yaratır?".

**Araç sırası (Batch 1–10'da doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch`
   roadmap başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz**
   (Batch 10'da başlık değişmediği için bu adım atlandı),
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen — alt metin düzeltmesi dahil —
   5. adımı yeniden çalıştır, kopyaya yeni içeriği kopyala ve dev sunucusunu yeniden başlat.**
**Not:** SVG'yi düzenlemek `content_hash`'i etkilemez, ama alt metni düzeltmek etkiler.

**Doğrulama sırası — bu run'da çalışan tam tarif.** Paralel oturum aynı depoda çalıştığı için
**yalıtılmış kopya zorunludur**:

1. `pnpm typecheck`, `pnpm test` ve `pnpm build` ana depoda çalıştırılabilir (bunlar sunucu
   açmaz). `pnpm test` kırmızı gelirse tek fork ile tekrarla
   (`--pool=forks --poolOptions.forks.singleFork`; Batch 9'un bellek notu).
2. **Yalıtılmış kopyayı kur** (aynı sürücüde olmak zorunda):
   ```
   mkdir D:/dev/anil-lib-b<N>
   cd D:/dev/anil-lib && tar --exclude=./node_modules --exclude=./.next --exclude=./.git \
       --exclude=./artifacts -cf - . | (cd ../anil-lib-b<N> && tar -xf -)
   powershell -NoProfile -Command "New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b<N>\node_modules' -Target 'D:\dev\anil-lib\node_modules'"
   ```
   **Kopyanın `.git`'i yoktur**; kontrol koşusu için `git show HEAD:<yol>` ana depoda çalıştırılıp
   çıktısı kopyaya yönlendirilmelidir.
3. **Dev sunucusunu kopyada, test kapısı değerleriyle başlat**:
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`
   `corepack pnpm exec next dev -p 3102 -H 127.0.0.1`.
4. **Bir kez giriş yapıp oturumu kaydet** (`artifacts/b10-research/login-b10.mjs`): taban adres
   **`http://localhost:3102`**, kullanıcı `anil`, parola `test-reader-pass`;
   `ctx.storageState({path})` ile JSON'a yaz. Betiğin çıkış kodunu ayrıca kontrol et.
5. **Render:** `shot-batch<N>.mjs` (27 kombinasyon + `/boun`), `figs-b<N>.mjs` (diyagram başına
   ekran görüntüsü, light + dark), `pre-b<N>.mjs` (kod bloğu; beklenen `pre` sayısını betikte
   güncelle). Üçü de taban adresi `RENDER_BASE`'den alır ve slug listesi başta durur.
   **Diyagram ekran görüntülerini tek tek gözle incele** — alt metnin şekille uyuştuğunu da orada
   denetle. Ayrıca `ortusme.py` ile metin çakışmasını tara.
6. **E2E:** aynı sunucu kullanılabilir. Kopyada `PLAYWRIGHT_PORT=3102 corepack pnpm exec playwright test`.
7. **Başarısız testleri atfetmek için kontrol koşusu:** kopyada katalog ve roadmap'i ana depodan
   `git show HEAD:<yol>` ile geri yaz, yeni makale ve asset klasörlerini sil, dev sunucusunu
   yeniden başlat ve **yalnızca düşen spec dosyasını** tekrar koş.
8. **Temizlik — sıra önemlidir:** **önce** junction'ı kaldır
   (`powershell -NoProfile -Command "cmd /c rmdir '<kopya>\node_modules'"`), **sonra** kopyayı
   `rm -rf` ile sil. Ters sırada `rm -rf` junction'ı takip edip **gerçek `node_modules`'ü siler**.
   Silme sonrası depo kökünde `pnpm typecheck` çalıştırıp `node_modules`'ün sağlam olduğunu
   doğrula (bu run'da doğrulandı: `.pnpm` altında 722 paket, typecheck temiz).
9. **Sunucuyu durdurmak:** `netstat -ano` ile portu dinleyen PID bulunup
   `Stop-Process -Id <pid> -Force` çalıştırılmalı; ardından portun gerçekten kapandığı
   doğrulanmalıdır.

## Non-normative history

- **2026-09-10 (Batch 10, `BATCH=3+1`):** Makale 31–33 yayımlandı; **Faz D'nin eşzamanlılık
  bölümü kapandı ve sanallaştırmanın bellek yarısı kuruldu** (kilitlenme, adres çevirisi ve
  sayfalama, sanal bellek). Üç taslak başlık da değiştirilmeden kaldı. Dijkstra'nın **bankacı
  algoritması** EWD 123'ün 6. bölümünden birincil kaynak olarak alındı; Coffman ve arkadaşlarının
  1971 çalışmasına erişilemedi ve dört koşulun OSTEP üzerinden aktarıldığı kaynakçada söylendi.
  30'un dört koşul vaadi, 19'un azalan ölçüsü, 16'nın döngü tespiti, 14'ün doğrudan erişim dizisi
  ve 22'nin bellekleme/tablolama takası ödendi. Doğrulama: BOUN içerik + SVG denetleyicileri temiz
  (33 makale, 66 diyagram), bağımsız Python denetimi 33/33, `pnpm typecheck` temiz, `pnpm test`
  615/615 → 618/618, `pnpm build` başarılı (149 statik sayfa, 33'ü `/boun`), global id/slug
  benzersizliği run ortasında 145/145 ve run sonunda 149/149, Playwright 50 geçti / 1 atlandı / 2 başarısız — ikisinin de BOUN'la
  ilgisiz olduğu kontrol koşusuyla yeniden kanıtlandı, 30 render ekran görüntüsü, 6 diyagram
  (light + dark) ve 4 kod bloğu (desktop + mobile × light + dark) doğrulandı; görsel incelemede
  bir **panel başlığı çakışması** ve bir **alt metin** hatası bulunup düzeltildi ve hash'ler
  yeniden senkronlandı.
- **2026-09-10 (Batch 9, `BATCH=3+1`):** Makale 28–30 yayımlandı; **Faz D'nin eşzamanlılık gövdesi
  kuruldu** (çizelgeleme ilkeleri, senkronizasyon ilkelleri, klasik problemler). Üç taslak başlık da
  genişletildi. Seride ilk kez **Dijkstra'nın kendi metinleri** (EWD 123 ve EWD 310) ve **Lamport
  1977** birincil kaynak olarak kullanıldı; OSTEP'in filozofları Dijkstra'ya bağlayan atfının
  kaynağıyla uyuşmadığı bulundu ve kayda geçti. Doğrulama: denetleyiciler temiz (30 makale,
  60 diyagram), bağımsız Python denetimi 30/30, `pnpm test` 599/599 (run sonunda 605/605),
  `pnpm build` başarılı (142, run sonunda 146 statik sayfa), benzersizlik 138/138 ve 142/142,
  Playwright 50/1/2, 30 render ekran görüntüsü, 6 diyagram ve 2 kod bloğu doğrulandı; görsel
  incelemede üç alt metin hatası bulunup düzeltildi.
- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D
  açıldı**, `operating-systems` klasörü kod değişikliği olmadan devreye girdi. Doğrulama:
  denetleyiciler temiz (27 makale, 54 diyagram), bağımsız Python denetimi 27/27, `pnpm test`
  407/407 (run sonunda 419/419), `pnpm build` başarılı (87, run sonunda 91 statik sayfa),
  benzersizlik 83/83 ve 87/87, Playwright 31/1/9, 27 render kombinasyonu, 6 diyagram ve 1 kod
  bloğu doğrulandı; iki diyagram düzeltmesi yapıldı.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni
  üçlüsü kapandı ve analizin sınırları bölümü açıldı**. Doğrulama: denetleyiciler temiz
  (24 makale, 48 diyagram), bağımsız Python denetimi 24/24, `pnpm test` 291/291 (run sonunda
  294/294), `pnpm build` 83 (sonra 87) statik sayfa, benzersizlik 76/76 ve 80/80, Playwright
  21/1/4, 27 render kombinasyonu, 6 diyagram ve 2 kod bloğu doğrulandı.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme
  üçlüsü kapandı ve tasarım deseni bölümü açıldı**. Seride ilk kez fenced kod bloğu kullanıldı.
  Doğrulama: denetleyiciler temiz (21 makale, 42 diyagram), `pnpm test` 277/277, `pnpm build` 76
  (ikinci koşuda 80) statik sayfa, benzersizlik 69/69 ve 73/73, Playwright 21/1/4, 27 render
  kombinasyonu, 6 diyagram ve 3 kod bloğu doğrulandı.
- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**
  ve `algorithms` klasörü kod değişikliği olmadan devreye girdi. Doğrulama: denetleyiciler temiz,
  `pnpm test` 256/256, `pnpm build` 69 statik sayfa, benzersizlik 62/62, Playwright 21/1/4,
  27 render kombinasyonu ve 6 diyagram doğrulandı.
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
