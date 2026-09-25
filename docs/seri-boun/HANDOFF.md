# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-09-25 · Durum: **SERİ TAMAMLANDI — 1–41 yayında; 2026-09-25 editoryal yenileme
turu tamamlandı (bkz. aşağıdaki bölüm); ilk bakım run'ı koşuldu
(2026-09-13): beş açık kaynak borcunun beşi kapandı, 3 diyagramda kırpma ve 3 makalede bölünmüş
"Sesli anlat" kutusu düzeltildi, 50 teyitli editoryal kusur giderildi** (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30, Batch 10: 31–33, Batch 11: 34–36, Batch 12: 37–39, Batch 13: 40–41) · Sıradaki makale: **yok**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| **Seri durumu** | **Tamamlandı.** 41 makalenin tamamı yayında; `roadmap.json`'da `planlandi` durumunda **tek satır yok**. Üretilecek makale kalmamıştır. |
| Yayımlanan son makale | 41 — `kapanis-zayif-nokta-haritasi-ve-son-hafta-plani` |
| Sıradaki güvenli başlangıç | **Yeni makale yoktur.** TRIGGER çalıştırılırsa yapılacak iş bakımdır: kaynak yeniden doğrulaması, açık borçların yeniden denenmesi, düzeltme ve doğrulama kapıları. Seriye başlık eklemek **yalnızca kullanıcının açık talebiyle** olur; o durumda önce YOL-HARITASI ve SOZLESME güncellenir. |
| Son kohort | `classification_batch: 13` (2 makale; önceki on üç kohortun her biri 3 makale) |
| Rotalar | `/boun` (giriş + yol haritası), `/boun/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series-boun/catalog.json` + `content/series-boun/roadmap.json` + `content/series-boun/articles/<kategori>/<slug>.md` + `content/series-boun/assets/<slug>/*.svg` |
| Kategori sözlüğü | `interview-method`, `discrete-math`, `data-structures`, `algorithms`, `operating-systems`, `supporting-fundamentals` |
| Kullanılan kategoriler | 1 + 40–41 → `interview-method`, 2–8 → `discrete-math`, 9–16 → `data-structures`, 17–25 → `algorithms`, 26–35 → `operating-systems`, 36–39 → `supporting-fundamentals`. **Altı kategorinin hepsi kullanımdadır ve seride kategori kararı kalmamıştır.** |
| Kod dokunuş noktaları | `src/lib/content/series-boun.ts` (seri örneği), `series-content.ts` (ortak fabrika), `schema.ts` (seri başına kategori sözlüğü), `labels.ts`; `SeriesLanding` `basePath/intro/footerNote` prop'ları; `ReaderDashboard` `series[]` prop'u; sync `validArticleIds` = ana ∪ AI ∪ BOUN (katalogdan türetilir) |
| Araçlar | `node tools/series/check-series-content.cjs --series=boun`, `check-series-svg.cjs content/series-boun/assets`, `sync-series-hashes.cjs --series=boun [--write]`, `entegre-batch.cjs --series=boun [--write]` |

## Editoryal yenileme turu (2026-09-25)

Kullanıcının açık talebiyle 1–41'in tamamı gerçek gövdeleri, şekilleri ve kaynaklarıyla yeniden
okundu (faz başına bir denetim ajanı, beş küme; kabul ana oturumda diff üzerinden). Kalıcı kurallar
SOZLESME v1.2'ye yazıldı. Yeni makale üretilmedi; seri tamamlanmış hâlde kalır.

- **Sonuç:** 7 yazı anlamlı biçimde revize edildi ve "gözden geçirildi" işareti aldı (12 AVL çift
  dönüş örneği ve yeni şema; 18 Master teoreminin CLRS 3e/4e farkı ve düzenlilik koşulu; 25 durma
  ispatının tutarlılığı, eş-sağlanabilirlik ve 2-SAT'ın iki yönü; 29 Dijkstra'nın maddeleriyle ders
  kitabı koşullarının doğru eşlemesi ve üç görevli öncelik tersine dönmesi; 36 formüllerin sezgiyle
  katmanlanması; 37 log ölçekli bellek hiyerarşisi ve kesişim aralığı; 39 normal biçimler ve yazma
  çarpıklığı). Kalan 34 yazıda yerel düzeltme yapıldı.
- **Karara bağlı açık kalem kapandı:** 1'e "## Mülakatta nasıl görünür", 2–7 ve 40'a İngilizce
  karşılıklar satırı, 4'e sık hatalar listesi eklendi; ikisi artık `check-series-content.cjs
  --series=boun` tarafından zorlanıyor. Takip zinciri 16, 18, 19, 21, 22 ve 23'e eklendi.
- **Önemli doğruluk düzeltmeleri:** Dijkstra negatif kenar karşı örneği iki gerçekleştirimde
  çalıştırılarak onarıldı (23); karar ağacı arama sınırı yaprak sayısıyla h ≥ log₂(n + 1) diye
  hizalandı (14, 24); iki yığınlı kuyrukta ihlalin bozduğu şey FIFO sırasıdır (10); `hiçbiri bölünmez
  değildir` çift olumsuzu düzeltildi (27); Linux CFS'in 6.6'dan beri EEVDF'e geçtiği resmî belgeyle
  eklendi (28); indeks maliyet tablosunda k = 10 hücresi 4 blok (39).
- **Özet hizalaması:** 7 (yaprak silerek tümevarım) ve 39 (normal biçimler, yazma çarpıklığı)
  frontmatter + katalogda güncellendi. Hiçbir başlık değişmedi.
- **Ortak altyapı değişiklikleri** (AI HANDOFF'ta ayrıntılı): revizyon işareti, hash'in LF
  normalleştirmesiyle yeniden tanımlanması (bütün hash'ler yeniden yazıldı), şekil tabanı 2 → 1,
  mekanik kalıp/ondalık/süreç dili kapıları, SVG alt kenar payı (BOUN'da 10 SVG'nin viewBox'ı
  birkaç birim uzatıldı).
- **Kalan bakım borçları:** (1) 200 kelimeyi aşan 28 alt metin (`--warnings`; ileriye dönük hedef
  ≤ 120, toplu kısaltılmadı). (2) Hâlâ SVG'ye çizilmiş tablo olan şekiller (17 aday; ajan
  raporundaki sınıflandırma). (3) Yazarın kendi modeline bağlı durum sayıları (29–31: 57/5, 10/14,
  82/70, 11, 19/16) ve 20'deki grup boyutu oranları yeniden üretilmedi. (4) 12'deki B-ağacı
  şeklinde kök "anahtar 1 … anahtar 100" diyor (yüz çocuklu düğüm 99 anahtar taşır); metin
  "yaklaşık" dediği için dokunulmadı.

## Bakım run'ı 1'de ne yapıldı (2026-09-13)

Yeni makale üretilmedi; `TRIGGER.md`'nin bakım maddeleri sırayla koşuldu.

1. **Resmî sayfalar yeniden doğrulandı ve değişmemişti.** On sayfa çekildi (M.Sc. programı, lisans
   müfredatı, sekiz ders sayfası); §1'deki bütün alıntılar birebir aynı. Kapsam kararını değiştiren
   fark yok. Yeni kayıt: müfredatın veritabanı çekirdek dersi **CMPE222 Introduction to Database
   Systems**'tir (önkoşul CMPE250), CMPE321 değil — makale 39 düzeltme gerektirmedi çünkü
   CMPE321'i zaten zorunlu ders diye sunmuyor. Ayrıntılar ARASTIRMA §19.1.
2. **Beş kaynak borcunun beşi de kapandı** (yukarıdaki "Açık borçlar" bölümü ve ARASTIRMA
   §19.2–19.6). En önemli iki sonuç: Coffman 1971 ikinci koşula **"wait for"** diyor, ve
   Patterson & Hennessy'nin 4. bölümünün gerçek adı **"The Processor"**.
3. **Üç diyagramda gerçek kırpma bulundu ve düzeltildi.** `zamanlama-gantt.svg` (300 → 304),
   `erisim-yolu-maliyeti.svg` (404 → 408), `mlfq-kurallar.svg` (285 → 288). Ölçüm yöntemi ve
   önce/sonra kanıtı ARASTIRMA §19.8'de.
4. **Üç makalede "Sesli anlat" kutusu iki blockquote'a bölünüyordu** (37, 38, 39): kutu ile omurga
   arasında `>` yerine boş satır vardı. Seride 75 kutu doğruydu, bu üçü değildi. Düzeltildi ve
   gerçek render'da tek parça olduğu ölçüldü.
5. **Yayımlanmış metinde artık yanlış olan beş beyan düzeltildi.** Borçlar kapanınca "bu kaynağa
   erişilemedi" / "alt bölüm başlıkları doğrulanamadı" diyen cümleler yanlış hâle geldi: makale 31
   (OSTEP maddesi), 36 (CLRS maddesi), 37 (P&H maddesi), 39 (gövde + Haerder maddesi) ve 41
   (dürüst kapanış paragrafı) güncellendi.
6. **Editoryal tarama 62 teyitli kusur buldu; 50'si düzeltildi.** İki bağımsız ajan katmanı
   (tarayıcı + şüpheci teyitçi) 41 makaleyi ve 82 diyagramı okudu; ana oturum her düzeltmeyi
   uygulamadan önce kendi kanıtıyla doğruladı. Düzeltilen sınıflar: numarayla gönderme (SOZLESME §2
   ihlali, 9 yer), şekil alt metni ile SVG'nin çelişmesi (7 yer), terim çakışması (heap/yığın,
   birleşme/birleşim, Mergesort, kullanıcı kipi — 8 yer), sayı ve iddia hatası (asimptotik "dört
   kat" → "on kat", BST "elli bin" → "kırk yedi bin", doğum günü 0,626 → 0,627, Bellman-Ford
   "kısaltmaz" → "uzatmaz", düzenlilik koşulu c = 1/2 → c = 3/4, Huffman gerekçesi), yazım
   ("susduğu", "Isabet", `siral-dolasma`), kaynak künyesi (OSTEP 1.20 → 1.10) ve tablo tutarsızlığı
   (öncelik tersine dönmesi satırı).
7. **Bir ajan bulgusu ana oturumda çürütüldü.** Makale 26'nın Silberschatz alt bölüm adlarının
   yanlış olduğu bildirilmiş ve teyit ajanı da doğrulamıştı; yayıncının **onuncu baskı** içindekiler
   PDF'i yedi adın da doğru olduğunu gösterdi (ajan başka bir baskıya bakmış). Düzeltme
   uygulanmadı. Ayrıntı: ARASTIRMA §19.9.
8. **Kod değişmedi.** `src/`, `tests/` ve `tools/` altında tek satır değişmedi; değişenler
   `content/series-boun/` (makale gövdeleri, 3 SVG, katalog) ve `docs/seri-boun/` (ARASTIRMA,
   HANDOFF, YOL-HARITASI terim defteri) oldu.

## Batch 13'te ne yapıldı

1. **Makale 40–41 yayımlandı** (`classification_batch: 13`), ikisi de `interview-method`, her biri
   2 diyagramlı. **Seri bitti.** 40 konu anlatmayı bırakıp anlatmanın kendisine geçti (cevabın dört
   parçalı omurgası, maliyet ve doğruluk cevaplarının sabit sırası, takip zincirinin üç halkası,
   tahtanın dört bölgesi, "bilmiyorum"un iyi biçimi, geçmiş akademik kayıt ve araştırma yönü);
   41 öz-değerlendirme matrisi, borç provası, aralıklı tekrar takvimi ve mülakat günü protokolü.
2. **Tek kod dokunuşu yapıldı ve öngörüldüğü gibiydi.** `src/app/boun/page.tsx`'teki `footerNote`
   artık "Seri kırk bir makaleyle tamamlandı; bundan sonrası düzeltme ve güncellemedir." diyor.
   **SOZLESME §4 gereği ikinci cümle korundu** ("Resmî mülakat bilgisi değişebilir; karar vermeden
   önce bölümün güncel sayfasını kontrol et."). `src/` altında başka satır değişmedi; `tests/` ve
   `tools/` altında hiç değişmedi.
3. **Resmî tanım son bir kez doğrulandı ve değişmemişti.** M.Sc. programı sayfasındaki dört alıntı
   (en az iki öğretim üyesi, 10 veya 15 dakika, görüşmecinin ofisi, "past academic record, research
   direction, skillset, and technical knowledge") ve Scientific Preparation üçlüsü ARASTIRMA §1 ile
   birebir aynı. Lisans müfredatı sayfası da çekildi ve ders-dönem eşleşmesi doğrulandı (ARASTIRMA §18).
4. **Üç borç gerçekten ödendi, dokuz borç soru biçiminde kapatıldı.** Ödenen: **Boole
   sadeleştirmesinin devre karşılığı** (kapı sayarak — n = 8 için 15 kapı → 8 kapı, derinlik ikisinde
   de 4), **d-yollu heap** (n = 10⁶ için d = 2/4/16 → aşağı süzülme 20/30/75 karşılaştırma, yukarı
   yönlü işlem 20/10/5) ve **alt problemi kısıtlama tekniği** (en uzun artan alt dizi). Soru
   biçiminde kapatılanlar: indirgemenin yönü, güçlü bağlı bileşenler, Peterson, bölüt/tersine sayfa
   tablosu, Monte Carlo ile Las Vegas, güven olasılık değildir, üç C, ANOMALY SERIALIZABLE, gerçek
   zamanlı öncelik tersine dönmesi.
5. **39'un 40'a verdiği vaatlerin hepsi karşılandı**: altmış-doksan saniyelik omurganın kurulması,
   takip sorusu geldiğinde genişletme, tahtaya ne yazılacağı ve araştırma yönü konuşması. Ayrıca
   37'nin **"önce erişim desenini tarif et"** ve 38'in **"kim ayırıyor, kim serbest bırakıyor"**
   refleksleri birer anlatım kalıbına çevrildi.
6. **Yeni dış kaynak sınıfı yalnızca öğrenme bilimiydi ve birincil metinden okundu.** Roediger &
   Karpicke 2006 (PDF indirildi) ve Cepeda ve ark. 2008 (PDF indirildi) tam metinden alındı; 41'deki
   bütün yüzdeler ve gün sayıları bu iki metinden birebir. Kaynağın vermediği tek şey — 35 günlük
   takvimin 20. ve 30. gün turları — hem metinde hem şekilde **kendi genişletmem** olarak işaretlendi.
7. **Serinin son makalesi "Sırada ne var" bölümünü dürüstçe kapattı**: sıradaki makale olmadığı ve
   sıradaki şeyin okurun kendi turu olduğu yazıldı. İçerik denetleyicisi bu bölümü zorunlu kılıyor;
   bölüm kaldırılmadı, anlamı değiştirildi.
8. **Regresyon korundu**: `/read` 18 makalelik ana kütüphane ve AI serisinin `/seri` rotaları,
   id/slug/order/hash bilgileri ve kullanıcı progress/bookmark/highlight state'i değişmedi.
   `/boun` 39 → 41 sayfa.

## Açık borçlar (2026-09-13 bakım run'ından sonra)

**Beş kaynak borcunun beşi de kapandı** (kanıt ve birebir alıntılar: ARASTIRMA §19.2–19.6). Kapanan
borçlar ve makalelere yansıması:

- **Coffman, Elphick & Shoshani (1971) *System Deadlocks* okundu.** Tam metin bir üniversite ders
  kopyasından alındı (ACM DL Cloudflare duvarı arkasında). Makale 31'e birinci elden kaynakça
  maddesi eklendi ve iki fark kayda geçti: özgün metin ikinci koşula **"wait for"** der
  (*hold-and-wait* sonraki ders kitaplarının adıdır), ve "necessary and sufficient" niteliği dört
  koşul için değil **istek grafındaki çevrim** için kullanılır.
- **Haerder & Reuter (1983) okundu** (CMU 15-712 ders arşivi). Makale 39'un "Erişilemeyen kaynak"
  maddesi normal kaynakça maddesine çevrildi; ACID pasajı basılı s. 290'dan birebir alındı.
  **Gövdedeki dört tanımın biçimi değişmedi** — onlar hâlâ 1981 kurucu metni ile 1995 eleştiri
  çalışmasından geliyor ve makale bunu söylüyor.
- **CLRS 4. baskının 1. ve 18. bölüm adları ile alt bölüm başlıkları doğrulandı.** Kaynak MIT
  Press'in kendi içindekiler PDF'i. 1 "The Role of Algorithms in Computing", 18 "B-Trees"; kayıttaki
  on dört bölüm adının hepsi doğruydu. Makale 36'nın "alt bölüm başlıkları doğrulanamadı" cümlesi
  düzeltildi ve 5. ile 9. bölümün alt bölüm adları eklendi.
- **Makale 19'un üç adım adı birincil kaynakla doğrulandı.** CLRS s. 20: "Initialization …
  Maintenance … Termination". Makale 19 bu adları zaten CLRS 2. bölüme atfediyordu, yani **makale 19
  ve 40'ta değişiklik gerekmedi**; borç atfın doğrulanamamasıydı.
- **Patterson & Hennessy alt bölüm adları doğrulandı ve bir ad düzeltildi.** Kitabın kendi
  içindekileri ve K10plus MARC 505 alanı 4. bölümü **"The Processor"** olarak veriyor; Elsevier'in
  satış sayfası hâlâ "The RISC-V Processor" diyor. Makale 37 kitabın kendi adını kullanacak biçimde
  düzeltildi ve fark kaynakçaya yazıldı.
- **MIT 6.004 materyalleri erişilebilir.** Bahar 2017 sürümünde slaytlar PDF değil, birim
  alt sayfalarındadır (`/pages/c14/` doğrulandı). Makale 37 "materyallerin içeriği okunmamıştır"
  diyor ve bu hâlâ doğru olduğu için gövde değişmedi.

**Kalan borç yoktur.** Aşağıdakiler borç değil, **karara bağlı açık kalemler** ve bunlar
kullanıcının kararını bekler:

- **[2026-09-25'te KAPANDI — yukarıdaki bölüm]** **Beş makalede zorunlu "İngilizce karşılıklar" satırı yok** (2, 3, 4, 5, 6) ve **makale 1'de
  "## Mülakatta nasıl görünür" bölümünün tamamı yok**; makale 4'te ayrıca SOZLESME §3'ün istediği
  3–6 maddelik sık hatalar listesi yok. Bunlar Batch 0–1'den beri böyledir, **içerik denetleyicisi
  bu kuralları zorlamaz** ve düzeltilmeleri yayımlanmış makalelere **yeni metin yazmak** anlamına
  gelir. Bakım run'ı bu yüzden onlara dokunmadı; TRIGGER'ın bakım kapsamı yazım hatası, bozuk
  bağlantı ve render kusurudur. Makale 2'nin bölüm başlığı ("## Bu makalenin mülakattaki karşılığı")
  ise yalnızca ad değişikliği olduğu için bu run'da düzeltildi ve artık seri geneliyle aynı.
- **Bilinçli kapsam kararları (borç değil, kayıt):** Cook-Levin teoremi yalnızca sezgi düzeyinde;
  CMPE343'ün moment üreten fonksiyonlar / gama dağılımı / regresyon başlıkları ve CMPE321'in
  varlık-ilişki modellemesi ile SQL sözdizimi kapsam dışı; biçimsel diller ayrı makale almadı;
  kesikli olay benzetimi ve indeksli öncelik kuyruğu (23 → 34) kapatılmış sayıldı.
- **Depoda geçmiş bir oturumdan kalan bozuk adlı dosyalar var** ve bunların bir kısmı **izlenmektedir**
  (`git ls-files`: `Karar`, `her`, `ritmi`, `sinyal`, `test.html`; ayrıca diskte `**Bu`, `Yaşayan`,
  `yapılırsa` — hepsi 0 bayt, `20960fb` commit'inde eklenmiş). BOUN kapsamı dışıdır; silmek
  izlenen dosyaları kaldırmak olacağından bu run'da **dokunulmadı** ve kullanıcının kararına
  bırakıldı.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` kimliksiz istekte 307, kimlikli istekte 503 döner ve
  uygulama çevrimdışı moduna düşer. Bu yüzden `tests/e2e/reader-data.spec.ts` içindeki **iki test
  başarısızdır** ve bu, içerikten bağımsızdır.
- **Playwright tam takımında üçüncü, gezici bir başarısızlık görülebiliyor.** Batch 12'de iki kez
  çıkmıştı (`reader.spec.ts:518` ve `reader-resume.spec.ts:92`, koşudan koşuya değişiyor).
  **Batch 13'te çıkmadı: sonuç 50 geçti / 1 atlandı / 2 başarısız** — yalnızca bilinen
  `reader-data` ikilisi. Yani 49/1/3 bir tavan değil, zamanlama kırılganlığının bazen görünmesidir;
  **beklenen taban 50/1/2'dir** ve üçüncü bir başarısızlık çıkarsa kontrol koşusuyla atfedilmelidir.
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
  `artifacts/b13-research/login-b13.mjs`.
- **Çerez ana bilgisayarı önemlidir.** Render betiklerinde taban adres baştan sona
  **`http://localhost:<port>`** olmalıdır (`127.0.0.1` çerezi gönderilmez).
- **Tema `data-theme` özniteliğiyle değil, kök elemandaki SINIFLA uygulanır** (`dark` / `sepia`; `system`
  seçiliyken hiçbiri). Tercihler `localStorage`'da **`anil-lib:reader-preferences:v1`** anahtarında bir JSON
  olarak durur ve `ctx.addInitScript` ile yazılır. Doğrulanmış zemin renkleri: light `rgb(250, 249, 247)`,
  dark `rgb(18, 20, 23)`, sepia `rgb(244, 239, 228)`.
- **Dev sunucusuna gezinme ara sıra `net::ERR_NETWORK_CHANGED` veriyor**; render betikleri `goto` çağrısını
  **üç denemeli** bir döngüye almalıdır.
- **`page.waitForLoadState("networkidle")` dev sunucusunda hiç yerleşmez** (HMR websocket'i açık kalır).
- **Paralel AI oturumu aynı depoda çalışabiliyor ve kataloğunu run'ın ortasında büyütüyor** (bu run'da
  global article-id sayısı 165'ten 169'a çıktı ve AI diyagramları 316'dan 323'e; Batch 12 sonunda id
  sayısı 163'tü — hepsi BOUN'a dokunmadan değişiyor). İki Next süreci
  `.next` dizinini paylaşırsa birbirini bozar; **yalıtılmış kopya zorunludur** ve **ayrı bir port**
  seçilmelidir (bu run 3107 kullandı).
- **Dev sunucusu katalog dosyasını süreç ömrü boyunca önbelleğe alır.** Gövde düzenlenip
  `sync-series-hashes.cjs --write` çalıştırıldıktan sonra kopyaya yeni içeriği kopyala ve dev sunucusunu
  **yeniden başlat**; yoksa `/boun/<slug>` 500 verir. **SVG düzeltmesi için de geçerlidir.**
- **Bağımsız denetim betiği yazarken hash tanımını birebir taklit etmek gerekir.** `content_hash`,
  frontmatter'dan sonraki gövdenin **`.trim()`** edilmiş hâlinin UTF-8 SHA-256'sıdır. Çalışan sürüm:
  `artifacts/b13-research/denetim.py` (dosyaları **binary** okur; `core.autocrlf` repo düzeyinde `true`).
  **Katalog alan adları camelCase'tir** (`articleId`, `readingOrder`, `contentHash`,
  `classificationBatch`), frontmatter ise snake_case; denetim betiği ikisini ayrı ayrı ele almalıdır.
- **Doküman satır sonları: çalışan kopyada hepsi CRLF'tir** (`core.autocrlf=true` checkout'ta çevirir),
  ama `Write`/`Edit` araçları LF yazar ve **git bunu normalize ettiği için fark temiz çıkar** — bu run'da
  TRIGGER.md tek başına düzenlenip `git diff --stat` ile doğrulandı (12 ekleme / 5 silme, sahte fark yok).
  CRLF'e elle çevirmeye gerek yoktur.
- **`json.dump` ile `roadmap.json`/`catalog.json` yeniden yazma.** Bu dosyalar tek satırlık kompakt
  kayıtlarla biçimlendirilmiştir; `json.dumps(..., indent=2)` sahte bir fark üretir. Tek alanlık
  değişiklikler **düz metin değiştirmeyle** yapılmalıdır. (Bu run'da `entegre-batch --write` kendi
  yazdı ve fark temiz çıktı: roadmap 2 satır, katalog 40 satır eklendi.)
- **Python'ın varsayılan konsol kodlaması Türkçe karakterleri patlatıyor**; betikleri `PYTHONIOENCODING=utf-8`
  ile çalıştır. Windows yolunu `r'D:\dev\anil-lib\'` gibi ters bölü ile **bitirme**; ileri bölü kullan.
- **Bash tool'unun heredoc'u (`<<'EOF'`) hem Türkçe karakterleri hem de TERS BÖLÜLERİ bozuyor.** Bu run'da
  `'...\\series-boun\\articles...'` heredoc içinden `\a` (BEL) olarak çıktı ve dosya yolu bozuldu.
  Türkçe ya da ters bölü içeren Python/Markdown blokları **`Write` aracıyla dosyaya yazılmalıdır**;
  ASCII-only ve ters bölüsüz kısa betikler heredoc'ta çalışır.
- **`cmd /c mklink /J` Git Bash'ten çalışmaz.** Junction kurmak için PowerShell kullan:
  `New-Item -ItemType Junction -Path <kopya>\node_modules -Target <depo>\node_modules`.
- **SVG'de `<` ve `>` karakterleri `&lt;` / `&gt;` olarak yazılmalıdır** (XML).
- **SVG metin taşma denetimi karakter sayısına dayanır**: genişlik ≈ `karakter × font-size × 0,55`
  (`check-series-svg.cjs`). Font 13 için x = 15'ten başlayan satır **en fazla ~98 karakter**.
- **İçerik denetleyicisinin şekil başlığı (title) içinde PARANTEZ OLAMAZ.** "Diyagram kendi paragrafında tek
  başına durmalı" kuralının regex'i `\(assets\/[^)]*\)$` kullanır; başlıktaki bir `)` eşleşmeyi erken bitirir.
- **Repo SVG denetleyicisi metin–metin çakışmasına ve metnin kutudan taşmasına BAKMAZ.** Bu run'da
  `artifacts/b13-research/svgoverlap.py` yazıldı: metin kutularını aynı `karakter × font × 0,55`
  tahminiyle kurar ve metin–metin, metin–kutu ve viewBox taşmalarını bildirir. Yeni dört diyagramda
  sıfır bulgu verdi; eski diyagramlarda 13 bulgu verdi ve **çoğu yanlış pozitiftir** (kutunun yanına
  bilerek konmuş etiketler), yani METIN-METIN ve VIEWBOX satırları güvenilir, METIN-KUTU satırları
  gözle teyit ister.
- **Her iki denetleyici de temiz olsa bile gerçek render'a bakmak zorunludur.** Bu run'da PNG
  incelemesi iki kusur yakaladı: (a) makale 41'in ikinci şeklinde eksen işaret çizgileri **her iki
  temada da görünmüyordu** (r = 5 dairelerin dışına 3 birim taşıyorlardı) — ölü işaretleme silindi;
  (b) aynı makalede `B₁`/`B₂` JetBrains Mono ile, `Bₙ` (U+2099) **yedek fontla** çiziliyordu — üç
  alt simge ASCII'ye (`B1`, `B2`, `Bn`) çevrildi ve tek fontta birleşti.
- **Ortamda PDF'i görüntüye çeviren araç yok**; `/mingw64/bin/pdftotext` ve Python `pypdf` var.
- **Dijkstra'nın EWD PDF'leri taranmış görüntüdür**; arşivin HTML transkripsiyonu kullanılmalıdır ve
  **transkripsiyon sayfalıdır** (`EWD123-2.html` gibi).
- **Bölümün ders dizini sayfası istemci tarafında sayfalanıyor**: statik HTML yalnızca ilk on altı dersi
  içeriyor ve `?page=2`/`?page=3` aynı HTML'i döndürüyor. Bir dersin varlığını kanıtlamak için **kendi
  sayfası** çekilmelidir.
- **`escholarship.org` PDF adresleri boş dosya, `laplab.ucsd.edu` sertifikası süresi dolmuş,
  `pubmed.ncbi.nlm.nih.gov` WebFetch'e çerez duvarı gösteriyor.** Bu run'da Cepeda 2008 ancak
  `yorku.ca/ncepeda/publications/` aynasından, Roediger & Karpicke 2006 ancak
  `colinallen.dnsalias.org/Readings/` aynasından indirilebildi.

- **Render betikleri depo icinde durmalidir.** `@playwright/test` en yakın `node_modules`'ten çözülür;
  `/tmp` altına yazılan bir `.mjs` `ERR_MODULE_NOT_FOUND` verir. Betikleri `artifacts/<run>/` altına yaz.
- **SVG denetleyicilerinin genişlik tahmini Inter için fazla geniştir.** `karakter × font × 0,55`
  formülü `karar-agaci-alt-sinir.svg`'de 291,72 birimlik bir satırı 408 sayıp iki yanlış çakışma
  bildirdi. **Gerçek ölçüm için `artifacts/b14-bakim/svg-geometry.mjs`** (her `<text>` için
  `getBBox()`, 41 sayfa gezer) **ve `ink-extents.mjs`** (canvas `actualBoundingBoxDescent`) kullan.
  `getBBox()` em-kutusudur ve inişi 0,55 birim abartır; 13px Inter'de gerçek iniş **3,00** birimdir.
  Yani em-kutusu taşması 0,55'ten küçükse mürekkep kırpılmıyordur.
- **İçerik denetleyicisi bölünmüş "Sesli anlat" kutusunu yakalamaz.** Kutu ile "İyi bir cevabın
  omurgası" arasına `>` yerine boş satır konursa iki ayrı blockquote oluşur ve denetleyici bunu
  1 kutu sayıp 1–3 bandına takılmaz. Tarama komutu:
  `awk '/^> \*\*Sesli anlat:/{ln=NR; getline nx; if (nx=="") print FILENAME":"ln}'`.
- **Okuyucu sayfalı bir kap kullandığı için `clip` tabanlı ekran görüntüsü yanlış bölgeyi yakalar.**
  Diyagram görüntüsü almak için `elementHandle.screenshot()` kullan; `scrollIntoView` + `clip`
  gövde metnini yakaladı.
- **Teyit ajanı da baskı karıştırabilir.** Silberschatz alt bölüm adları için hem tarayıcı hem
  teyitçi "yanlış" dedi; yayıncının **onuncu baskı** içindekiler PDF'i yedi adın da doğru olduğunu
  gösterdi. **Baskıya bağlı bir ad iddiası ancak o baskının kendi belgesiyle kapatılır.**
- **`www.os-book.com` iki A kaydı döndürüyor ve 205.178.189.129 bağlantı kabul etmiyor**; curl
  aralıklı olarak `000` verir. `--resolve www.os-book.com:443:128.36.0.108` ile çalışır.
- **Çalışan kaynak aynaları (bu run'da bulundu):** Coffman 1971 →
  `uobdv.github.io/Design-Verification/Supplementary/System_Deadlocks-Four_necessary_and_sufficient_conditions_for_deadlock.pdf`;
  Haerder & Reuter 1983 → `cs.cmu.edu/afs/cs.cmu.edu/academic/class/15712-s05/www/readings/haerder83.pdf`
  (kırılma noktası ders sayfasının `Readings` listesiydi, `/papers/` 404); CLRS 4e içindekiler →
  `mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/11599/4e_toc.pdf`; Silberschatz
  OSC10 içindekiler → `os-book.com/OS10/toc-dir/toc.pdf`; kitap içindekileri için **K10plus SRU**
  (`sru.k10plus.de/opac-de-627?...&recordSchema=marcxml`) MARC 505 alanını veriyor ve LoC/HathiTrust/
  Stanford'un vermediği yerde çalıştı.
- **Ölü uçlar (bu run):** ACM DL her iki DOI için Cloudflare "Just a moment..."; archive.org run
  boyunca "temporarily offline"; `pdfs.semanticscholar.org` HTTP 202 + 0 bayt; LoC MARC'ında 505
  alanı yok; HathiTrust 403; Google Books API 429.

## Bu run'da doğrulananlar (bakım run'ı 1, 2026-09-13)

- **Depo denetleyicileri temiz:** içerik 41 makale, SVG 82 diyagram, `sync-series-hashes --write`
  sonrası fark yok, `entegre-batch` kuru çalışması 0 yeni makale / 0 roadmap satırı.
- **Bağımsız Python denetimi** (repo araçlarını kullanmadan, binary okuyarak): katalog ↔ frontmatter
  ↔ gövde hash üçlüsü **41/41**; `reading_order` 1–41 kesintisiz; kohort 13 × 3 + 1 × 2; gövdelerde
  referans verilen **82 SVG'nin hepsi diskte ve diskte referanssız SVG yok**; global article-id ve
  slug benzersizliği **173/173, sıfır çakışma** (run başında 169'du — artış paralel AI oturumundan).
- **`pnpm typecheck` temiz · `pnpm test` 688/688 (29 dosya) · `pnpm build` başarılı: 177 statik
  sayfa, `/boun/[slug]` **41 yol** (3 + 38).** Test ve sayfa sayısındaki artış BOUN'dan gelmiyor;
  `series-assets.test.ts` veri güdümlüdür ve paralel AI oturumu run sırasında kendi makalelerini
  ekledi. **Sabit referans mutlak sayı değil, hepsinin geçmesi ve `/boun` yol sayısının katalogla
  eşleşmesidir.**
- **Playwright tam takım: 50 geçti / 1 atlandı / 2 başarısız** — yalnızca bilinen `reader-data`
  çifti. `.env.local`'de `DATABASE_URL` olmadığı doğrudan ölçüldü (grep 0) ve `/api/reader-sync`
  kimliksiz istekte 307 döndü. Batch 12'nin gezici üçüncü başarısızlığı çıkmadı; **beklenen taban
  50/1/2 doğrulandı.**
- **Gerçek render (yalıtılmış kopya, port 3114):** 41 makale sayfasının **164 satır içi SVG'sinde
  her `<text>` için `getBBox()` ölçüldü** — düzeltmeden sonra **negatif alt pay kalmadı**, viewBox
  taşması yok, `pageerror` 0. Kalan 11 "METIN-METIN" bulgusunun hepsi ardışık satırların em-kutusunun
  0,55 birim değmesidir, yani kusur değildir (mürekkep çakışması yok).
- **Mürekkep ölçümü:** 13px Inter'de Türkçe metnin gerçek iniş derinliği 3,00 birimdir; `getBBox()`
  bunu 3,55 gösterir. Üç kırpılan diyagram bu ölçümle bulundu, ekran görüntüsüyle **önce/sonra**
  karşılaştırıldı ve düzeltildi.
- **"Sesli anlat" kutuları gerçek render'da sayıldı:** 37, 38 ve 39 düzeltmeden önce 1 kutu + 1
  yetim blockquote gösteriyordu, sonra tek parça oldu. 31, 28 ve 19 kontrol grubu olarak zaten
  doğruydu.
- **`/boun` girişi üç genişlik × üç temada denetlendi** (9 kombinasyon): ham 42 / listede 41 /
  benzersiz 41 bağ (CTA ilk makaleyi tekrar bağlar — regresyon değil), "yakında" satırı yok,
  kapanış notu ve resmî-bilgi uyarısı yerinde, sızıntı yok, yatay taşma yok, `pageerror` 0,
  üç temanın zemin rengi doğru.
- **Okuyucu sınır durumları:** makale 1'de yalnızca "Sonraki", makale 41'de yalnızca "Önceki";
  ikisinde de sarkan bağ, `undefined`/`NaN` ya da `pageerror` yok. Düzeltilen iki makale (28, 39)
  üç genişlik × üç temada ayrıca denetlendi: figürler kaba sığıyor, en-boy oranı korunuyor,
  taşma ve sızıntı yok.
- **Bağlantı taraması:** makale gövdelerinde atıf verilen **62 adresin 57'si 200**; beş 403 bot
  filtresidir ve gerçek tarayıcı + Crossref ile geçerliliği doğrulandı; `www.os-book.com`'un iki A
  kaydından biri ölü (adres ölü değil). **Düzeltme gerekmedi.**
- **Kendi hesabımla doğrulananlar:** 1000·100 = 100.000 ve 100² = 10.000 (oran 10, "dört kat"
  yanlıştı); 10⁶ / 21 ≈ 47.619 ("elli bin" yerine "kırk yedi bin"); 27 kişide çakışma olasılığı
  0,6269 ("0,626" yerine "0,627"); OSTEP'in yayımlanmış sürümü 1.10; article 15'in tablosu beş
  sütunlu (14'ün vaadi "dört" diyordu); `pascal-ucgeni-ve-ozdeslik.svg` altı satırlı (alt metin
  "beş" diyordu); `bst-yukseklik.svg`'nin bir milyon anahtar notu **sol** panelde.

## Bundan sonrası: bakım

Üretilecek makale yoktur. TRIGGER çalıştırılırsa yapılacak işler şunlardır ve hiçbiri yeni başlık üretmez.

1. **Resmî kaynakları yeniden doğrula.** SOZLESME §4 resmî süreç bilgisinin değişebilir olmasını
   zorunlu kılar ve seri bunu okura da söyler. Kontrol edilecekler: M.Sc. programı sayfası (mülakat
   süresi, görüşmeci sayısı, konu başlıkları, Scientific Preparation üçlüsü ve 2.50 şartı) ve lisans
   müfredatı sayfası. Değişiklik varsa **ARASTIRMA §1 ve ilgili makale gövdeleri** güncellenir ve
   `sync-series-hashes --write` çalıştırılır.
2. **Açık kaynak borcu kalmadı** (2026-09-13 bakım run'ında beşi de kapandı; yukarıdaki "Açık
   borçlar" bölümü). Bundan sonra bu madde yalnızca **atıf bakımıdır**: bir kaynağın adresi ölürse
   çalışan bir ayna bulunur ve kaynakça maddesi güncellenir. Bağlantı taraması için
   `artifacts/b14-bakim/` altındaki yöntem yeniden kullanılabilir; bot filtresi veren bir adres
   **ölü sayılmaz**, gerçek tarayıcı ve `api.crossref.org` ile teyit edilir.
3. **Düzeltme.** Yazım hatası, bozuk bağlantı, render kusuru. Gövde değişirse
   `sync-series-hashes --write` zorunludur. **Render kusuru için denetleyicilere güvenme:** repo
   SVG denetleyicisi genişliği tahmin eder ve içerik denetleyicisi bölünmüş blockquote'u görmez;
   `artifacts/b14-bakim/svg-geometry.mjs`, `ink-extents.mjs` ve `blockquote-check.mjs` gerçek
   render üzerinden ölçer.
4. **Seriye başlık eklemek yalnızca kullanıcının açık talebiyle olur.** SOZLESME §6 doldurma konusu
   icat edilmesini yasaklar; §7 yayımlanmış gerçeği en yüksek otorite sayar. Talep gelirse sıra
   şudur: YOL-HARITASI'na başlık ve prerequisite satırı eklenir, gerekiyorsa SOZLESME revize edilir
   (kullanıcının açık talebiyle, tarihli değişiklik notuyla), sonra üretim yapılır.

**Yayımlanmış makalelerin verdiği sözler tükendi.** 40 ve 41 ileri vaat içermiyor; 41'in "Sırada ne
var" bölümü serinin bittiğini açıkça söylüyor ve okuru kendi turuna yönlendiriyor. Karşılanmamış
numaralı ya da konu adlı ileri gönderme **kalmamıştır**.

## Non-normative history

- **2026-09-13 (bakım run'ı 1, makale üretilmedi):** TRIGGER'ın bakım maddeleri koşuldu. Resmî on
  sayfa yeniden doğrulandı ve **değişmemişti**; yeni kayıt olarak müfredatın veritabanı çekirdek
  dersinin **CMPE222** olduğu geçti. **Beş açık kaynak borcunun beşi de kapandı**: Coffman 1971
  (ikinci koşulun özgün adı **"wait for"**), Haerder & Reuter 1983 (ACID pasajı basılı s. 290),
  CLRS 4e bölüm 1/18 adları ve alt bölüm başlıkları, döngü değişmezinin üç adı (CLRS s. 20) ve
  Patterson & Hennessy alt bölümleri (**4. bölümün gerçek adı "The Processor"**); MIT 6.004
  materyallerinin erişilebilir olduğu da doğrulandı. Borçlar kapanınca yanlış hâle gelen **beş
  beyan** (makale 31, 36, 37, 39, 41) düzeltildi. **Üç diyagramda gerçek kırpma** (viewBox 300→304,
  404→408, 285→288) ve **üç makalede bölünmüş "Sesli anlat" kutusu** (37, 38, 39) bulunup
  düzeltildi. İki katmanlı editoryal tarama **62 teyitli kusur** çıkardı; **50'si** uygulandı
  (numarayla gönderme 9, şekil–alt metin çelişkisi 7, terim çakışması 8, sayı/iddia hatası 6, yazım
  3, künye 1, tablo 1 ve diğerleri). **Bir ajan bulgusu ana oturumda çürütüldü** (Silberschatz alt
  bölüm adları onuncu baskıda doğruymuş). **Kod değişmedi.** Doğrulama: denetleyiciler temiz
  (41 makale, 82 diyagram), bağımsız Python denetimi 41/41, global id/slug 173/173,
  `pnpm typecheck` temiz, `pnpm test` 688/688, `pnpm build` 177 statik sayfa (`/boun` 41),
  Playwright **50/1/2**, 164 SVG'de gerçek `getBBox()` ölçümü (negatif pay kalmadı), `/boun` girişi
  9 kombinasyonda temiz, 62 atıf adresinin tamamı geçerli. Karara bağlı kalan tek kalem: beş
  makalede eksik "İngilizce karşılıklar" satırı ve makale 1'in eksik "Mülakatta nasıl görünür"
  bölümü — bunlar **yeni metin yazmayı** gerektirdiği için kullanıcı kararına bırakıldı.
- **2026-09-12 (Batch 13, `BATCH=3+1`):** Makale 40–41 yayımlandı ve **seri tamamlandı**; `roadmap.json`'da
  `planlandi` satırı kalmadı. Öngörülen tek kod dokunuşu yapıldı (`/boun` `footerNote`), SOZLESME §4'ün
  zorunlu kıldığı ikinci cümle korundu. Resmî mülakat tanımı ve lisans müfredatı son bir kez doğrulandı
  ve değişmemişti; **CMPE321'in 2025 müfredatında zorunlu çekirdek ders olarak yer almadığı** da
  kayda geçti (kendi ders sayfası var, önkoşulu CMPE250 — makale 39 zaten zorunlu ders demiyordu).
  Üç borç gerçekten ödendi (Boole sadeleştirmesinin devre karşılığı, d-yollu heap, alt problemi
  kısıtlama), dokuz borç soru biçiminde kapatıldı, kesikli olay benzetimi kapatılmış sayıldı.
  Öğrenme bilimi kaynakları birincil metinden okundu (Roediger & Karpicke 2006, Cepeda ve ark. 2008).
  Doğrulama: denetleyiciler temiz (41 makale, 82 diyagram), bağımsız Python denetimi 41/41,
  `pnpm typecheck` temiz, `pnpm test` 667/667 → 677/677 ve `pnpm build` 169 → 173 statik sayfa
  (artışlar paralel AI oturumundan; `/boun` her ölçümde 41),
  global id/slug 165/165 → 169/169, Playwright **50/1/2** (yalnızca bilinen `reader-data` çifti), 21 render +
  8 + 8 diyagram + 4 satır içi kod ekran görüntüsü; görsel incelemede **iki kusur** bulunup düzeltildi
  (görünmeyen eksen çizgileri, `Bₙ` font yedeklemesi). Yeni araç: `artifacts/b13-research/svgoverlap.py`.
- **2026-09-11 (Batch 12, `BATCH=3+1`):** Makale 37–39 yayımlandı; **Faz E'nin konu makaleleri bitti**
  ve geriye yalnızca sözlü prova ile sentez kaldı. **Kapsam düzeltmesi:** makale 39'un resmî bir dersi
  **vardır** — CMPE321 *Introduction to Database Systems*, önkoşulu CMPE250. Makale 39'un başlığı terim
  çakışması yüzünden "…İndeks ve İşlem"den "…İndeks ve Transaction"a çevrildi. Patterson & Hennessy
  içindekiler borcu kapandı; CS:APP3e ve Silberschatz DSC 7e için alt bölüm adları doğrulandı. Dört eski
  borç ödendi: `fork`/`exec`/`wait` (27), kopyalarken yazma (33), indeks = B-ağacı (12), kesişim
  noktası (17). Doğrulama: denetleyiciler temiz (39 makale, 78 diyagram), bağımsız Python denetimi
  39/39, `pnpm test` 651/651 → 661/661, `pnpm build` 163 → 167 statik sayfa, global id/slug 159/159 →
  163/163, Playwright 49/1/3, 30 render ekran görüntüsü, 12 + 12 diyagram ve 20 kod bloğu doğrulandı;
  görsel incelemede **iki düzen hatası** bulunup düzeltildi.
- **2026-09-11 (Batch 11, `BATCH=3+1`):** Makale 34–36 yayımlandı; **Faz D kapandı ve Faz E açıldı**.
  `supporting-fundamentals` kategorisi kod değişikliği olmadan devreye girdi ve **serinin son kategori
  kararı verilmiş oldu**. Makale 37'nin asıl dayanağının CMPE244 olduğu bulundu. Doğrulama:
  denetleyiciler temiz (36 makale, 72 diyagram), bağımsız Python denetimi 36/36, `pnpm test` 637/637 →
  642/642, `pnpm build` 156 → 160 statik sayfa, Playwright 50/1/2, 30 render ekran görüntüsü,
  6 diyagram ve 8 kod bloğu doğrulandı; **iki düzen hatası** bulunup düzeltildi.
- **2026-09-10 (Batch 10, `BATCH=3+1`):** Makale 31–33 yayımlandı; **Faz D'nin eşzamanlılık bölümü kapandı ve
  sanallaştırmanın bellek yarısı kuruldu**. Dijkstra'nın **bankacı algoritması** EWD 123'ün 6. bölümünden
  birincil kaynak olarak alındı. Doğrulama: denetleyiciler temiz (33 makale, 66 diyagram), bağımsız Python
  denetimi 33/33, `pnpm test` 615/615 → 618/618, `pnpm build` 149 statik sayfa, Playwright 50/1/2.
- **2026-09-10 (Batch 9, `BATCH=3+1`):** Makale 28–30 yayımlandı; **Faz D'nin eşzamanlılık gövdesi kuruldu**.
  Seride ilk kez **Dijkstra'nın kendi metinleri** (EWD 123 ve EWD 310) ve **Lamport 1977** birincil kaynak
  olarak kullanıldı. Doğrulama: denetleyiciler temiz (30 makale, 60 diyagram), `pnpm test` 599/599 → 605/605,
  `pnpm build` 142 → 146 statik sayfa, Playwright 50/1/2.
- **2026-09-02 (Batch 8, `BATCH=3+1`):** Makale 25–27 yayımlandı; **Faz C kapandı ve Faz D açıldı**,
  `operating-systems` klasörü kod değişikliği olmadan devreye girdi. Doğrulama: denetleyiciler temiz
  (27 makale, 54 diyagram), bağımsız Python denetimi 27/27, `pnpm test` 407/407 → 419/419, `pnpm build` 87 →
  91 statik sayfa, Playwright 31/1/9.
- **2026-09-01 (Batch 7, `BATCH=3+1`):** Makale 22–24 yayımlandı; **Faz C'nin tasarım deseni üçlüsü kapandı**.
  Doğrulama: denetleyiciler temiz (24 makale, 48 diyagram), `pnpm test` 291/291 → 294/294, `pnpm build` 83 →
  87 statik sayfa, Playwright 21/1/4.
- **2026-08-30 (Batch 6, `BATCH=3+1`):** Makale 19–21 yayımlandı; Faz C'nin **formalleştirme üçlüsü kapandı**.
  Seride ilk kez fenced kod bloğu kullanıldı. Doğrulama: denetleyiciler temiz, `pnpm test` 277/277,
  `pnpm build` 76 → 80 statik sayfa, Playwright 21/1/4.
- **2026-08-30 (Batch 5, `BATCH=3+1`):** Makale 16–18 yayımlandı; **Faz B kapandı, Faz C açıldı**.
  Doğrulama: denetleyiciler temiz, `pnpm test` 256/256, `pnpm build` 69 statik sayfa.
- **2026-08-30 (Batch 4, `BATCH=3+1`):** Makale 13–15 yayımlandı; CLRS 4. baskının yedi bölüm adı daha
  doğrulandı. Doğrulama: denetleyiciler temiz, `pnpm test` 241/241, `pnpm build` 62 statik sayfa.
- **2026-08-29 (Batch 3, `BATCH=3+1`):** Makale 10–12 yayımlandı; CLRS 4. baskı bölüm numarası borcu kapandı.
- **2026-08-29 (Batch 2, `BATCH=3+1`):** Makale 7–9 yayımlandı; Faz A kapandı, Faz B açıldı.
- **2026-08-29 (Batch 1, `BATCH=3+1`):** Makale 4–6 yayımlandı.
- **2026-08-29 (Batch 0, `BATCH=3+1`):** Platform entegrasyonu kuruldu ve makale 1–3 yayımlandı.
- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması (ARASTIRMA.md),
  5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri oluşturuldu.
