# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-10 · Durum: **1–30 yayında (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30) · Sıradaki: 31**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 30 — `klasik-eszamanlilik-problemleri-cozumu-savunmak` |
| Sıradaki güvenli başlangıç | Makale 31 ("Kilitlenme: Koşullar ve Stratejiler") — **Faz D'nin eşzamanlılık kapanışı**; run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 10` |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–30 → `operating-systems` (klasör adı `category` alanıyla birebir aynı). **31–35 de `operating-systems`'e girer; kod değişikliği ya da yeni okuma listesi grubu gerekmez.** |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir, yeni makale kod değişikliği istemez) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Batch 9'da ne yapıldı

1. **Makale 28–30 yayımlandı** (`classification_batch: 9`), her biri 2 diyagram ve 2 sözlü
   checkpoint kutusuyla; 29 ve 30'da birer sözde kod bloğu var. Faz D'nin **eşzamanlılık gövdesi**
   kuruldu: çizelgeleme ilkeleri (28), senkronizasyon ilkelleri (29), klasik problemler (30).
   Kategori klasörü zaten açıktı; **kod değişikliği yapılmadı**.
2. **Üç taslak başlığın üçü de pedagojik gerekçeyle genişletildi** ve `roadmap.json` satırları
   `entegre-batch` çalıştırılmadan **önce** elle güncellendi:
   28 "CPU Zamanlama" → "CPU Zamanlama: Ölçütler, Kurallar ve Geri Besleme";
   29 "Senkronizasyon: Kritik Kesim, Kilit, Semafor" → "Senkronizasyon: Kilit, Semafor ve Monitör"
   (kritik kesim 27'de zaten adlandırılmıştı, bu makale üç ilkeli veriyor);
   30 "Klasik Eşzamanlılık Problemleri" → "Klasik Eşzamanlılık Problemleri: Çözümü Savunmak".
3. **Yeni birincil kaynak sınıfı: Dijkstra'nın kendi metinleri.** EWD 123 (*Cooperating Sequential
   Processes*, 1965) ve EWD 310 (*Hierarchical Ordering of Sequential Processes*, 1971) bu run'da
   ilk kez kullanıldı. 29'un üç koşulu, P/V tanımları ve "bekleyen uyuyabilir" argümanı doğrudan
   EWD 123'ten; 30'un filozofları EWD 310'dan geliyor. Ayrıca **Lamport 1977** güvenlik/canlılık
   tanımları için kullanıldı ve kısmi doğruluk ↔ güvenlik köprüsünü kaynağın kendisi kuruyor.
4. **Bir kaynak çelişkisi bulundu ve kayda geçti.** OSTEP Ch. 31, filozofların asimetrik çatal
   sırasını "Dijkstra'nın kendi çözümü" diye [D71]'e bağlar; [D71] = EWD 310 okunduğunda orada
   asimetrik sıra **yoktur** (Dijkstra durum değişkeni + özel semafor çözümü verir ve o çözümün
   açlığa açık olduğunu açıkça yazar). Makale 30 asimetrik sırayı "kilitlenmeyi kıran en basit yol"
   olarak sunar ve farkı metinde söyler. Ayrıntı: ARASTIRMA §14.
5. **Beş eski borç/pin ödendi.** (a) 27'nin **zaman dilimi ile ek yük takası** vaadi 28'de
   sayısallaştı. (b) 13'ün **öncelik kuyruğu** pini ile 12'nin **kırmızı-siyah ağacı** 28'de CFS
   üzerinden birlikte ödendi. (c) 26'nın **"kesme sırasında kesme"** pini 29'da xv6'nın
   `push_off`/`pop_off`'u ve `tickslock` senaryosuyla ödendi. (d) 19'un **kısmi doğruluk ↔
   sonlanma** ayrımı 30'da güvenlik ↔ canlılık olarak genelleşti. (e) 27'nin **yarış koşulu /
   kritik kesim** problemi 29 ve 30'da çözüldü.
6. **İki taslak beklenti düzeltildi.** Kavram defteri "kısmi sıra ve topolojik sıralama 28'de
   bağımlılıklı çizelgeleme olarak geri döner" ve "indeksli öncelik kuyruğu 28'de öncelikli CPU
   zamanlamasında kullanılır" diyordu; ikisi de olmadı ve **olmamalıydı** — CPU zamanlama bağımsız
   işlerle ilgilenir, gerçek çizelgeleyiciler önceliği `azalt_anahtar` ile değil kuyruk
   değiştirerek yönetir. Düzeltmeler YOL-HARITASI'nın kavram defterine yazıldı.
7. **Bütün sayısal iddialar bağımsız hesaplandı ya da programla doğrulandı** (ARASTIRMA §14'ün
   sonundaki 9 maddelik liste): dört çizelgeleme ilkesi için benzetim, bağlam anahtarı ek yükü
   tablosu, RR tepki tavanı, CFS dilim ve ağırlık aritmetiği, **kaba kuvvet durum uzayı
   taramaları** (bayrak kilidi 57 durum → ihlal var; test-and-set 5 durum → yok; filozoflar naif
   82 durum → kilitlenme var, asimetrik 70 durum → yok, atomik 11 durum → yok; üretici-tüketici
   kilit en içte 10 durum → yok, en dışta 14 durum → kilitlenme var).
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 27 → 30 sayfa. **`src/`, `tests/` ve `tools/` altında tek satır değişmedi**; bu batch
   yalnızca içerik ve dokümandır (`artifacts/` altındaki render betikleri gitignore'dadır).

## Açık borçlar

- **CLRS 4. baskının 1. ve 18. bölümlerinin adları doğrulanamadı** ve alt bölüm **başlıkları**
  hiçbir bölüm için doğrulanamadı (yalnızca alt bölüm numaralarının varlığı doğrulandı; tam liste
  ARASTIRMA §12'de). Pratik sonucu: CLRS'e **bölüm düzeyinde** atıf yapılır. Faz D makalelerinin
  ders kitabı karşılığı zaten Silberschatz'tır ve **onun bölüm ile alt bölüm adları resmî
  içindekiler PDF'inden doğrulanmıştır** (ARASTIRMA §13 ve §14; 5., 6., 7. ve 8. bölümler hazır).
- **Makale 19'un üç adım adı (başlatma/koruma/sonuçlanma) birincil kaynakla doğrulanamadı.**
  Adlandırma CLRS 2. bölümündendir ve bölüm adı doğrulanmıştır, ama üç adımın metni erişilebilir
  bir kaynakta görülemedi; kavramın kendisi 6.042'nin Değişmez İlkesiyle bağımsız olarak kuruldu.
- **Süreç API'si (`fork()`, `exec()`, `wait()`) hâlâ somutlaştırılmadı.** OSTEP Chapter 5
  (`cpu-api.pdf`) bu run'da **indirildi ve metne çevrildi**, ama 28'in girişine koymak konu dışı
  kaçacağı için kullanılmadı; borç **38'e (C ve Bellek)** devredildi. Bölüm 5.1 `fork()`, 5.2
  `wait()`, 5.3 `exec()`, 5.4 API'nin gerekçesi (kabuk), 5.5 süreç denetimi ve kullanıcılar.
- **Rastgeleleştirilmiş seçim algoritmasının beklenti analizi ödenmedi** (24 aynı bağıntıyı
  paranoyak hızlı sıralamayla ödemişti); 36'ya devredildi.
- **Alt problem kısıtlama/genişletme tekniği 22'de yalnızca anıldı**, örneği verilmedi. 36 ya da
  41'de açılabilir.
- **d-yollu heap (13'ün pini) hâlâ ödenmedi.** Dallanma çarpanı takasının diğer iki örneği
  (B-ağacı, doğrudan erişim dizisi) 24'te, kırmızı-siyah ağaç 28'de kullanıldı; d-yollu heap
  kullanılmadı.
- **Cook-Levin teoremi yalnızca sezgi düzeyinde verildi** (devre argümanı); ispat yapılmadı,
  bilinçli kapsam kararıdır.
- **Kilitlenmenin dört koşulu 30'da adlandırılmadı**, yalnızca beklenenler döngüsü gösterildi;
  31'in açılış borcudur ve 30'un "Sırada ne var" bölümü bunu açıkça vaat eder.
- **Peterson/Dekker algoritmaları 29'da yalnızca kaynakta anıldığı biçimde geçmedi** — makale
  onları hiç kullanmadı, çünkü modern donanımda gevşek bellek modelleri yüzünden çalışmıyorlar.
  Silberschatz 6.3'ün konusu olduğu için 41'in provasında sorulabilir; bilinçli kapsam kararıdır.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı takipsiz dosyalar var** (ör. kesme işareti içeren
  `**zorundadır**.` benzeri adlar, kök dizinde). BOUN kapsamı dışıdır, bu run'da dokunulmadı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer.
  Bu yüzden canlı sync uçtan uca denenemez ve `tests/e2e/reader-data.spec.ts` içindeki **iki test
  bu nedenle başarısızdır** (bu run'da kontrol koşusuyla kanıtlandı).
- **`.env.local` dev sunucusunda parola kapısını AÇIYOR** (`SITE_PASSWORD_SHA256` ve
  `AUTH_COOKIE_SECRET` tanımlar), dolayısıyla `/boun` 307 döner. **Doğru yol:** sunucuyu
  `playwright.config.ts`'teki test değerleriyle başlat
  (`SITE_PASSWORD_SHA256=2e10d696…f2cef855`, `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`;
  kabuk env'i `.env.local`'i ezer) ve render betiklerinde **giriş yap**: kullanıcı `anil`, parola
  `test-reader-pass`. `DATABASE_URL` yokken `authenticate.ts` tek hesaplı env kapısına düşer.
- **Giriş bir Server Action'dır; `waitForNavigation` işe yaramaz.** POST bir belge gezinmesi
  değildir, `Promise.all([waitForNavigation, click])` erken çözülür ve `ctx.cookies()` boş döner —
  Batch 8'in betiği bu yüzden bu run'da başarısız oldu. Doğru desen: tıkla, sonra
  `page.waitForURL(...)` ile **hedef URL'yi bekle**. **Tuzak:** `waitForURL(/\/boun$/)` işe
  yaramaz, çünkü giriş sayfasının kendi URL'si de (`/login?next=/boun`) bu regex'e uyar; predicate
  kullan: `(u) => u.pathname === "/boun" && u.search === ""`. Çalışan sürüm:
  `artifacts/boun-render/login-b9.mjs`.
- **Çerez ana bilgisayarı önemlidir.** Giriş sonrası uygulama `localhost`'a yönlendiriyor;
  `127.0.0.1` üzerinde kurulan çerez `localhost` isteklerine **gönderilmez**. Render betiklerinde
  taban adres baştan sona **`http://localhost:<port>`** olmalıdır (sunucu `-H 127.0.0.1` ile
  başlatılsa bile).
- **Oturum çerezi sunucu yeniden başlatmayı aşar**: aynı `AUTH_COOKIE_SECRET` ile imzalandığı için
  `state-b9.json` yeniden başlatmadan sonra da geçerlidir. Bu yüzden giriş betiği hata verse bile
  render betikleri çalışmaya devam edebilir — **giriş betiğinin çıkış kodunu ayrıca kontrol et.**
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık
  kalır) ve 90 sn timeout'a düşer.
- **`pnpm test` bu makinede paralel worker havuzuyla bellek tükenmesine düşebiliyor.** Bu run'da
  iki kez `FATAL ERROR: Zone Allocation failed - process out of memory` verdi, ardından **aynı
  ağaçta üçüncü koşuda 599/599 geçti**; `--pool=forks --poolOptions.forks.singleFork` ile de
  599/599 geçti. Test başarısızlığı değil, kaynak sorunudur (paralel AI oturumu aynı makinede
  çalışıyor). Kırmızı görürsen önce tek fork ile tekrarla.
- **Paralel AI oturumu aynı depoda çalışıyor ve kataloğunu büyütüyor** (bu run sırasında AI serisi
  90'dan 94 makaleye çıktı; `pnpm build` toplam 142, sonra **146 statik sayfa** üretti). İki Next süreci `.next`
  dizinini paylaşırsa birbirini bozar; **yalıtılmış kopya zorunludur**.
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Bir makale gövdesi
  düzenlenip `sync-series-hashes.cjs --write` çalıştırıldıktan sonra **çalışmakta olan** dev
  sunucusu eski katalog hash'ini tutar ve `/boun/<slug>` 500 verir. Çözüm: kopyaya yeni içeriği
  kopyala ve dev sunucusunu yeniden başlat.
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır
  (`sync-series-hashes.cjs:60`).
- **Depoda satır sonları karışık ve hash bayt üzerinden alınır.** `core.autocrlf` repo düzeyinde
  `true`. Uygulama bundan etkilenmez (dizge karşılaştırması); bağımsız denetim betiği dosyayı
  **binary** okumalıdır.
- **Doküman dosyalarının satır sonları farklıdır:** `ARASTIRMA.md` ve `YOL-HARITASI.md` **CRLF**,
  `HANDOFF.md` **LF**'tir. Python ile düzenlerken `io.open(..., newline="")` kullan ve eklenen
  metnin satır sonlarını hedef dosyaya çevir.
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri
  `PYTHONIOENCODING=utf-8` ile çalıştır. Uyarı: dosyaya yazan bir betik, yazdıktan **sonra**
  Türkçe bir mesaj yazdırırken çökebilir — dosya yazılmış olur, çıkış kodu 1 olur.
- **Bash tool'unun heredoc'u (`<<'EOF'`) Türkçe kesme işareti içeren uzun metinlerde patlıyor.**
  Uzun Markdown/SVG/Python blokları `Write` aracıyla dosyaya yazılmalı, sonra çalıştırılmalıdır.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz.** Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**;
  x = 378'den başlayan sağ panel metni **~47 karakter** olabilir. Tasarım aşamasında hesaba kat.
- **Chromium ara sıra ekran görüntüsü alırken çöküyor** ("chrome-headless-shell" yığın izi).
  Bu run'da bir kez oldu, aynı komut tekrar çalıştırılınca 30/30 tamamlandı.
- **Okuma sütununun genişliği aynı context'te art arda gezilen sayfalarda daralıyor** (ilk sayfada
  paragraf 808 px / şekil kabı 771 px, sonrakilerde 646 / 609). Bu **içerikten gelmiyor**: her
  makale ayrı context'te ölçüldüğünde 27, 28, 29 ve 30 birebir aynı değerleri veriyor
  (808 / 771 / makale 848 / kenar çubuğu 304). Yani Batch 9 kaynaklı bir regresyon değildir.
- **Ortamda PDF'i görüntüye çeviren araç yok**; `/mingw64/bin/pdftotext` ve Python `pypdf` var.
- **Dijkstra'nın EWD PDF'leri taranmış görüntüdür** (metin katmanı yok). Arşivin HTML
  transkripsiyonları kullanılmalıdır: `https://www.cs.utexas.edu/~EWD/transcriptions/EWD01xx/EWD123.html`
  ve `.../EWD03xx/EWD310.html`. HTML'i etiketlerden arındırmak yeterlidir.

## Bu run'da doğrulananlar

- İçerik/SVG denetleyicileri: BOUN **30 makale + 60 diyagram** temiz. `entegre-batch` kuru
  çalışması 3 yeni makaleyi buldu, `--write` sonrası fark kalmadı; `sync-series-hashes --write`
  iki kez çalıştırıldı (alt metin düzeltmelerinden sonra tekrar) ve sonunda fark kalmadı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, dosyaları binary okuyarak):
  katalog ↔ frontmatter ↔ gövde hash üçlüsü **30/30**; `article_id`, başlık, slug, özet, kategori,
  seviye, sıra, kohort ve klasör adı eşleşmesi 30/30; katalog `path` alanları doğru;
  `reading_order` **1–30 kesintisiz**; kohort dağılımı **3 × 10**; gövdelerde referans verilen
  **60 SVG'nin hepsi diskte ve diskte referanssız SVG yok**; roadmap'in "yayinda" kümesi katalogla
  birebir aynı (30 kayıt).
- **Global article-id ve slug benzersizliği:** run ortasında **138/138** (18 ana + 90 AI + 30 BOUN),
  run sonunda **142/142** (AI 94'e çıktığı için); ikisi de tam benzersiz ve BOUN tarafı iki
  ölçümde de aynıdır.
- `pnpm typecheck` temiz (kopya silindikten sonra tekrar koşuldu, yine temiz) · `pnpm test`
  run ortasında **599/599**, run sonunda **605/605** (29 test dosyası; ilk iki koşu bellek
  tükenmesiyle düştü, üçüncüsü ve tek-fork koşusu geçti) · `pnpm build` başarılı: run ortasında
  **142**, run sonunda **146 statik sayfa**, ikisinde de **30'u `/boun` yolu** (route tablosunda
  `/boun/[slug]` altında 3 + 27 yol). Aradaki fark BOUN'dan değil, paralel AI oturumunun
  kataloğunu 90'dan 94'e çıkarmasından gelir. Toplam sayfa sayısı sabit referans **değildir**;
  sabit referans testlerin **tamamının** geçmesi ve `/boun` yol sayısının katalogla eşleşmesidir.
- **Gerçek render (ekran görüntülü, yalıtılmış kopyada):** üç yeni makale, üç genişlik
  (375 / 768 / 1440) × üç tema (light / dark / sepia) = **27 kombinasyon** tarayıcıda açıldı,
  ayrıca `/boun` girişi üç genişlikte kontrol edildi (toplam 30 ekran görüntüsü). Her makale
  sayfasında 2 inline SVG, doğru figcaption, yatay taşma yok, raw anahtar / `undefined` / `NaN`
  sızıntısı yok, tek console hatası bilinen 503 sync çağrısı. Betiğin kendi sorun listesi:
  **"Sorun yok."** Hash senkronundan sonra render **yeniden koşuldu** ve yine temiz çıktı.
- **Not:** makale sayfalarında `main h1` **yoktur** (başlık `document.title`'dadır); serinin
  mevcut deseni, regresyon değil.
- **Altı diyagramın hepsi light ve dark temada tek tek görsel olarak incelendi** (12 ekran
  görüntüsü). Şekillerde çakışma, kırpılma ya da yanlış konumlanmış etiket bulunmadı.
  **Üç alt metin düzeltmesi yapıldı** (şekilde olmayan bir etiketi anlatan cümleler ve "sağında"
  denip aslında altta duran sayılar): 28'in iki şekli ve 30'un birinci şekli. Alt metin, şekilde
  gerçekten olan şeyi anlatmak zorundadır; bu, geçen batch'lerde yakalanmayan bir hata sınıfıdır.
- **Kod bloğu render'ı ayrı doğrulandı:** 29 ve 30'daki birer `pre` öğesi desktop ve mobile ×
  light ve dark kombinasyonlarında açıldı; JetBrains Mono, 13,44px, `overflow-x: auto`, sayfada
  yatay taşma yok, 375px'te blok kendi içinde kayıyor (clientW 333 / scrollW 608 ve 487).
- **Playwright: 50 geçti, 1 atlandı, 2 başarısız.** İkisi de `reader-data.spec.ts`'tedir ve
  **BOUN kaynaklı değildir — kontrol koşusuyla deneysel olarak kanıtlandı:** kopyada katalog ve
  roadmap `git show HEAD:` ile geri alınıp 3 makale ve 3 asset klasörü silindikten sonra aynı iki
  test **birebir aynı şekilde** düştü. Ayrıca o spec dosyası `boun` ya da `series-boun` geçmiyor.
  (Batch 8'in referansı 31/1/9'du; fark paralel AI oturumunun test dosyalarını değiştirmesidir.)
- **Resmî sayfa yeniden doğrulandı (2026-09-10):** CMPE322 sayfası yeniden çekildi, katalog
  tanımının metni değişmemişti; sayfada *Course Learning Outcomes* bölümü yine yok.

## Sıradaki batch hazırlığı — Batch 10 (Makale 31'den itibaren)

**Pedagojik hedef:** Makale 30, filozofların beklenenler döngüsünü gösterip tek bir oku çevirerek
kırdı ama **neden yeterli olduğunu** söylemedi. Makale 31 kilitlenmeyi kuram düzeyine taşıyor:
dört koşul, koşullardan birini kaldırarak önleme, kaynak ihtiyacının önceden bildirilmesine dayanan
kaçınma, döngüyü çalışırken bulan tespit ve kurtarma. Faz D'nin eşzamanlılık bölümü orada kapanır;
32–33 sanallaştırmaya (adres çevirisi, sayfalama, sanal bellek), 34 kalıcılığa geçer.

**Prerequisite satırları (31–33 için taslak; YOL-HARITASI'nda da var):**
- 31 ← 30 (filozofların beklenenler döngüsü; problem orada kuruldu), 29 (kilit sırası ve ince
  taneli kilitlemenin bedeli), 19 (azalan ölçü ve sonlanma → güvenli durum), 16 (kaynak atama
  grafında döngü tespiti), 23 (kaynak vektörleri üzerinde kademeli karar)
- 32 ← 26 (adres uzayı bir sanallaştırmadır; tuzak ile kesme ayrımı), 27 (sürecin adres uzayı
  envanteri; iş parçacığında sayfa tablosu değişmez), 12 (ağaç yapılı çok düzeyli tablo; blok
  muhasebesi), 14 (doğrudan erişim dizisi: sayfa tablosu bir indis eşlemesidir)
- 33 ← 32 (sayfa tablosu, TLB, adres çevirisi), 22 (bellekleme ile tablolama takası), 9 (ortalama
  ile en kötü durum), 13 (değiştirme ilkelerinin veri yapısı)

**Araştırma ihtiyacı:** Resmî sayfa borcu **yok** — CMPE322 **2026-09-10**'da doğrulandı ve Faz D
boyunca geçerlidir. Faz D'nin resmî dayanağı yalnızca *Catalog Description*'dır. 31 için katalogda
karşılığı olan ifade: "Deadlock prevention, avoidance, detection and recovery"; 32–33 için:
"Memory management, swapping, multiple partitions. Paging, segmentation, virtual memory, page
replacement algorithms."

Hazır ipuçları (hepsinin adresi bu run'da HTTP 200 ile doğrulandı, taban adres
`https://pages.cs.wisc.edu/~remzi/OSTEP/<dosya>.pdf`):

- **31 için:** `threads-bugs.pdf` **ve** `threads-deadlock.pdf` **aynı bölümdür** — OSTEP Ch. 32,
  *Common Concurrency Problems*; kilitlenme dışı eşzamanlılık hataları (atomiklik ihlali, sıra
  ihlali) da oradadır. Dört koşul için ayrıca **Coffman ve arkadaşları (1971)** kaynak gösterilir.
  **Birincil kaynak avantajı:** EWD 123'ün §6 "The Problem of the Deadly Embrace" ve §6.1–6.2
  **bankacı algoritmasını Dijkstra'nın kendi kalemiyle** verir; transkripsiyon bu run'da zaten
  okundu ve adresi yukarıdaki "bilinen sorunlar" bölümündedir. xv6 §6.4 (Deadlock and lock
  ordering) çekirdek içi somutlamayı verir.
- **32–33 için:** `vm-intro.pdf` (Ch. 13, adres uzayı soyutlaması), `vm-mechanism.pdf` (Ch. 15,
  adres çevirisi), `vm-segmentation.pdf` (Ch. 16), `vm-freespace.pdf` (Ch. 17),
  `vm-paging.pdf` (Ch. 18), `vm-tlbs.pdf` (Ch. 19), `vm-smalltables.pdf` (Ch. 20, çok düzeyli
  tablolar), `vm-beyondphys.pdf` (Ch. 21, düzenek) ve `vm-beyondphys-policy.pdf` (Ch. 22,
  değiştirme ilkeleri: FIFO, rastgele, LRU, clock, thrashing). `vm-api.pdf` (Ch. 14) 38 için de
  işe yarar. xv6 Chapter 3 (Page tables) RISC-V somutlamasını verir.
- **Silberschatz** karşılıkları içindekiler PDF'inden doğrulandı: **Chapter 8 Deadlocks**
  (8.1 System Model, 8.2 Deadlock in Multithreaded Applications, 8.6 Deadlock Avoidance,
  8.7 Deadlock Detection, 8.8 Recovery from Deadlock). 32–33 için 9. ve 10. bölümlerin alt bölüm
  adları henüz çekilmedi; aynı PDF'ten alınabilir.

**Yayımlanmış makalelerin verdiği sözler.** Makale 28–30 da **numaralı ileri vaat vermedi**;
bütün ileri göndermeler konu adıyla yapıldı. Teslim edilmesi zorunlu konular:

- **31'de karşılanmalı (30'un en somut vaadi):** kilitlenmenin **dört koşulu**; koşullardan birini
  kaldırarak önleme; **bankacı algoritmasıyla kaçınma**; tespit ve kurtarma; kilit sırasının
  (29, 30) döngüsel beklemeyi önleme tekniği olarak adlandırılması; açlık ile kilitlenmenin ayrı
  şeyler olduğunun tekrarı (30'un tablosu bunu kurdu); 19'un **azalan ölçü** fikrinin güvenli durum
  kavramına dönüşmesi; 16'nın **döngü tespitinin** kaynak atama grafında kullanılması.
- **32–33'te karşılanmalı:** süreç ile iş parçacığı bellek düzeni (27 → 32); sayfa tablosunun bir
  indis eşlemesi olması (14 → 32); çok düzeyli tablonun ağaç muhasebesi (12 → 32); bellekleme ile
  tablolama takasının "sakla ya da yeniden hesapla" hâli (22 → 33); geçmişe bakıp geleceği
  kestirme kalıbının LRU/clock karşılığı (28 → 33); tuzak ile kesme ayrımının sayfa hatasında
  somutlaşması (26 → 32–33).
- **Konu bazlı, numarasız pinler (28–30'dan):** ölçüt tanımlamadan karşılaştırma yapılamaz
  (28 → 33); zaman dilimi/ek yük takası kalıbı (28 → 33, 37); kırmızı-siyah ağacın çekirdek içi
  kullanımı (28 → 34, 39); açgözlü çizelgeleyici kalıbıyla "yeterince iyi" savunması (28 → 35, 41);
  kesmeleri kapatmanın çekirdek içi kullanımı (29 → 32–34); öncelik tersine dönmesi (29 → 31, 35);
  kayıp uyandırma ve atomik "bırak ve uyu" (29 → 34); kapsayıcı koşul ve broadcast (30 → 34);
  güvenlik ile canlılık ayrımı (30 → 31, 41).
- Batch 0–8'den devreden numarasız pinler: ortalama durumun dağılım varsayımı → olasılık makalesi
  (9 → 36), doğum günü ilkesinin olasılık hâli (6 → 36), disk tabanlı arama yapıları ve ayırma
  yöntemleri → dosya sistemleri (12 → 34), indeks = B-ağacı → veritabanları (12 → 39), bellek
  hiyerarşisi (9, 12 → 37), d-yollu heap (13 → ödenmedi), kararlılığın veritabanı karşılığı
  (15 → 39), dış sıralama (15 → 34), Boolean sadeleştirme (8 → 37, 39), önek-serbest kod ve bit
  muhasebesi (21 → 34, 39), Monte Carlo ile Las Vegas (24 → 35, 36), gevşetme ve üçgen eşitsizliği
  (23 → 31, 33), indirgemenin yönü (25 → 41), güçlü bağlı bileşenler (25 → 34, 39).

**Görselleştirme öngörüsü:** 31: **dört koşulun** ve her birini kaldırmanın şeması (karşılıklı
dışlama, elde tutup bekleme, önkesmesizlik, döngüsel bekleme) ve **kaynak atama grafı** — döngülü
ve döngüsüz iki hâliyle; ikinci şekil bankacı algoritmasının güvenli/güvensiz durum tablosu
olabilir (sayılar elle doğrulanmalıdır). 32: sanal adresin sayfa numarası ve ofset olarak
bölünmesi + sayfa tablosu araması; TLB'li ve TLB'siz erişim maliyeti. 33: sayfa hatası akışı ve
değiştirme ilkelerinin aynı erişim dizisi üzerindeki karşılaştırması (FIFO/LRU/optimal — sayılar
elle doğrulanmalıdır).
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6; tuval `viewBox="0 0 720 H"`, metin ≥13 birim,
renk yalnızca `var(--...)`, marker id'leri makale genelinde benzersiz — `boun-a<N>-...` kalıbı,
`<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılır. Kullanılabilir değişkenler: `--text`,
`--text-muted`, `--text-faint`, `--border`, `--surface`, `--surface-muted`, `--accent`,
`--accent-soft`, `--cool`, `--cool-soft`. Satır uzunluğu sınırı için "bilinen sorunlar"a bak.)

**Sözlü checkpoint tohumları (31):** "Kilitlenmenin dört koşulunu say ve her birini kaldırmanın
bedelini anlat"; "Bankacı algoritması neyi bilmek zorunda ve bu varsayım gerçekçi mi?"; "Kilitlenme
ile açlığı ayır; hangisinde sistem ilerler?".

**Araç sırası (Batch 1–9'da doğrulandı):** katalog var olduğu için `sync-series-hashes.cjs`
yalnızca **katalogdaki** makaleleri gezer. Doğru sıra:
1) **başlık değişecekse `roadmap.json`'daki ilgili satırı önce elle güncelle** — `entegre-batch`
   roadmap başlığı frontmatter başlığıyla birebir eşleşmezse bunu "sorun" sayar ve **yazmaz**,
2) makaleleri yaz (frontmatter `content_hash` alanına 64 sıfırdan oluşan yer tutucu koy),
3) `entegre-batch.cjs --series=boun` (kuru çalışma; başlık/sıra/kohort denetimi),
4) `entegre-batch.cjs --series=boun --write` (katalog + roadmap),
5) `sync-series-hashes.cjs --series=boun --write` (frontmatter **ve** katalog hash'lerini düzeltir),
6) denetleyicileri tekrar çalıştır. **Gövdeyi sonradan düzenlersen — alt metin düzeltmesi dahil —
   5. adımı yeniden çalıştır, kopyaya yeni içeriği kopyala ve dev sunucusunu yeniden başlat.**
Yeni kategori klasörü açılırken klasör adı `category` alanıyla birebir aynı olmak zorundadır ve
kategori `src/lib/content/schema.ts` ile `labels.ts` içinde zaten tanımlı olmalıdır
(`supporting-fundamentals` hâlâ tanımlı ve kullanılmamıştır; Faz E'nin ilk makalesi onu açacak
ama **kod değişikliği istemez**). **Not:** SVG'yi düzenlemek `content_hash`'i etkilemez.

**Doğrulama sırası — bu run'da çalışan tam tarif.** Paralel oturum aynı depoda çalıştığı için
**yalıtılmış kopya zorunludur**:

1. `pnpm typecheck`, `pnpm test` ve `pnpm build` ana depoda çalıştırılabilir (bunlar sunucu
   açmaz). `pnpm test` kırmızı gelirse tek fork ile tekrarla (yukarıdaki bellek notu).
2. **Yalıtılmış kopyayı kur** (aynı sürücüde olmak zorunda, yoksa webpack mutlak yolları çözemez):
   ```
   mkdir D:/dev/anil-lib-b<N>
   cd D:/dev/anil-lib && tar --exclude=./node_modules --exclude=./.next --exclude=./.git \
       --exclude=./artifacts -cf - . | (cd ../anil-lib-b<N> && tar -xf -)
   powershell -NoProfile -Command "New-Item -ItemType Junction -Path 'D:\dev\anil-lib-b<N>\node_modules' -Target 'D:\dev\anil-lib\node_modules'"
   ```
   **Kopyanın `.git`'i yoktur**; kontrol koşusu için `git show HEAD:<yol>` ana depoda çalıştırılıp
   çıktısı kopyaya yönlendirilmelidir.
3. **Dev sunucusunu kopyada, test kapısı değerleriyle başlat** (kabuk env'i `.env.local`'i ezer):
   `SITE_PASSWORD_SHA256=2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855`
   `AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long`
   `corepack pnpm exec next dev -p 3101 -H 127.0.0.1`.
   Doğru kurulduğunun hızlı işareti: `/boun` **307**, `/login` **200**.
4. **Bir kez giriş yapıp oturumu kaydet** (`artifacts/boun-render/login-b9.mjs` bu run'ın çalışan
   sürümüdür; Server Action tuzağı için yukarıya bak): taban adres **`http://localhost:3101`**,
   kullanıcı `anil`, parola `test-reader-pass`; `ctx.storageState({path})` ile JSON'a yaz.
5. **Render:** `shot-batch<N>.mjs` (27 kombinasyon + `/boun`), `figs-b<N>.mjs` (diyagram başına
   ekran görüntüsü, light + dark), `pre-b<N>.mjs` (kod bloğu varsa; beklenen `pre` sayısını ve
   rota listesini betikte güncelle). Üçü de taban adresi `RENDER_BASE`'den alır ve slug listesi
   başta durur. **Diyagram ekran görüntülerini tek tek gözle incele** — alt metnin şekille
   uyuştuğunu da orada denetle.
6. **E2E:** aynı sunucu kullanılabilir. Kopyada `PLAYWRIGHT_PORT=3101 corepack pnpm exec playwright test`.
7. **Başarısız testleri atfetmek için kontrol koşusu:** kopyada katalog ve roadmap'i ana depodan
   `git show HEAD:<yol>` ile geri yaz, yeni makale ve asset klasörlerini sil, dev sunucusunu
   yeniden başlat ve **yalnızca düşen spec dosyasını** tekrar koş. Aynı şekilde düşüyorsa batch
   kaynaklı değildir.
8. **Temizlik — sıra önemlidir:** **önce** junction'ı kaldır
   (`powershell -NoProfile -Command "cmd /c rmdir '<kopya>\node_modules'"`), **sonra** kopyayı
   `rm -rf` ile sil. Ters sırada `rm -rf` junction'ı takip edip **gerçek `node_modules`'ü siler**.
   Silme sonrası depo kökünde `pnpm typecheck` çalıştırıp `node_modules`'ün sağlam olduğunu
   doğrula (bu run'da doğrulandı: `.pnpm` altında 722 paket, typecheck temiz).
9. **Sunucuyu durdurmak:** `netstat -ano` ile portu dinleyen PID bulunup
   `Stop-Process -Id <pid> -Force` çalıştırılmalı; ardından portun gerçekten kapandığı
   (`netstat | grep LISTENING` boş) doğrulanmalıdır.

## Non-normative history

- **2026-09-10 (Batch 9, `BATCH=3+1`):** Makale 28–30 yayımlandı; **Faz D'nin eşzamanlılık gövdesi
  kuruldu** (çizelgeleme ilkeleri, senkronizasyon ilkelleri, klasik problemler). Üç taslak başlık da
  genişletildi. Seride ilk kez **Dijkstra'nın kendi metinleri** (EWD 123 ve EWD 310) ve **Lamport
  1977** birincil kaynak olarak kullanıldı; OSTEP'in filozofları Dijkstra'ya bağlayan atfının
  kaynağıyla uyuşmadığı bulundu ve kayda geçti. 27'nin zaman dilimi vaadi, 13 ile 12'nin veri yapısı
  pinleri, 26'nın çekirdek içi eşzamanlılık pini ve 19'un kısmi doğruluk/sonlanma ayrımı ödendi;
  iki taslak beklenti (topolojik sıra ve `azalt_anahtar`) düzeltildi. Doğrulama: BOUN içerik + SVG
  denetleyicileri temiz (30 makale, 60 diyagram), bağımsız Python denetimi 30/30, `pnpm typecheck`
  temiz, `pnpm test` 599/599 (run sonunda 605/605), `pnpm build` başarılı (142, run sonunda 146 statik
  sayfa; ikisinde de 30'u `/boun`), global id/slug benzersizliği 138/138 ve run sonunda 142/142, Playwright 50 geçti / 1 atlandı / 2 başarısız — ikisinin de
  BOUN'la ilgisiz olduğu **kontrol koşusuyla deneysel olarak kanıtlandı**, 30 render ekran
  görüntüsü, 6 diyagram (light + dark) ve 2 kod bloğu (desktop + mobile × light + dark)
  doğrulandı; görsel incelemede üç **alt metin** hatası bulunup düzeltildi ve hash'ler yeniden
  senkronlandı.
- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D
  açıldı**, `operating-systems` klasörü kod değişikliği olmadan devreye girdi. 16'nın güçlü bağlı
  bileşenler / ters bitiş sırası borcu, 5'in sayılabilirlik pini, 3'ün yapıcı olmayan ispat pini
  ve 22'nin sözde polinom pini ödendi; CMPE322 sayfası yeniden doğrulandı ve sayfada ders çıktıları
  bölümü olmadığı kayda geçti; 6.006 Bahar 2020'de SCC dersi olmadığı görülüp borcun kaynağı
  Sedgewick 4.2 olarak düzeltildi. Doğrulama: denetleyiciler temiz (27 makale, 54 diyagram),
  bağımsız Python denetimi 27/27, `pnpm typecheck` temiz, `pnpm test` 407/407 (run sonunda
  419/419), `pnpm build` başarılı (87, run sonunda 91 statik sayfa), benzersizlik 83/83 ve 87/87,
  Playwright 31/1/9 (dokuzu da kontrol koşusuyla BOUN dışı), 27 render kombinasyonu, 6 diyagram ve
  1 kod bloğu doğrulandı; iki diyagram düzeltmesi yapıldı.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni
  üçlüsü kapandı ve analizin sınırları bölümü açıldı**. 13'ün `azalt_anahtar` borcu ile 14–15–17'nin
  ortak karar ağacı kuramı borcu ödendi; CLRS bölüm adı ve 6.006 DP ders numarası borçları kapandı.
  Doğrulama: denetleyiciler temiz (24 makale, 48 diyagram), bağımsız Python denetimi 24/24,
  `pnpm test` 291/291 (run sonunda 294/294), `pnpm build` 83 (sonra 87) statik sayfa, benzersizlik
  76/76 ve 80/80, Playwright 21/1/4, 27 render kombinasyonu, 6 diyagram ve 2 kod bloğu doğrulandı.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme
  üçlüsü kapandı ve tasarım deseni bölümü açıldı**. Seride ilk kez fenced kod bloğu kullanıldı ve
  Batch 5'ten kalan Master Teoremi ε borcu kapatıldı. Doğrulama: denetleyiciler temiz (21 makale,
  42 diyagram), `pnpm test` 277/277, `pnpm build` 76 (ikinci koşuda 80) statik sayfa, benzersizlik
  69/69 ve 73/73, Playwright 21/1/4, 27 render kombinasyonu, 6 diyagram ve 3 kod bloğu doğrulandı.
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
