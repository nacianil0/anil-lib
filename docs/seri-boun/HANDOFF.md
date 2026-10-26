# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-10-26 · Durum: **SERİ TAMAMLANDI — 1–41 yayında; bakım run'ı 3 koşuldu
(2026-10-26): bütün korpus olgu denetiminden geçti, 41 makalenin hepsinde düzeltme yapıldı ve 16
makale "gözden geçirildi" işareti aldı; resmî sayfalar değişmemişti, makale 1'deki Scientific Prep
okuması düzeltildi (bkz. aşağıdaki bölüm); run 2 (2026-09-26), yenileme turu (2026-09-25) ve run 1
(2026-09-13) daha önce koşulmuştu** (Batch 0: 1–3, Batch 1: 4–6, Batch 2: 7–9, Batch 3: 10–12, Batch 4: 13–15, Batch 5: 16–18, Batch 6: 19–21, Batch 7: 22–24, Batch 8: 25–27, Batch 9: 28–30, Batch 10: 31–33, Batch 11: 34–36, Batch 12: 37–39, Batch 13: 40–41) · Sıradaki makale: **yok**

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

## Bakım run'ı 3'te ne yapıldı (2026-10-26)

Yeni makale üretilmedi; `TRIGGER.md`'nin bakım maddeleri koşuldu. Kanıt ve tam düzeltme listesi
ARASTIRMA §21'de; betikler `artifacts/bakim3-2026-10-26/` altında. Depo 2026-10-22'de yeniden
klonlanmıştı ve `artifacts/` `.gitignore`'da olduğu için run 1–2'nin bütün betikleri kayıptı; bu run
hepsini yeniden kurdu (aşağıdaki "Bundan sonrası: bakım" yeni yolları verir).

1. **Resmî sayfalar değişmemişti ama makale 1'de ikinci bir okuma yanlışı vardı.** On bir sayfa ve resmî
   Türkçe M.Sc. sayfası çekildi; 43 kaydın 41'i birebir (iki istisna beklenen ya da kayıt düzeltmesi).
   Makale 1, Scientific Prep derslerini "yüksek lisans dersleriyle birlikte" diye aktarıyordu; sayfa
   "before starting the Main Program" ve "cannot register for Main Program courses during Scientific
   Prep" diyor. Düzeltildi. 17 ve 24'teki "katalog tanımında" ifadeleri ders çıktılarına çevrildi.
2. **Atıf taraması: 68 adres, ölü yok.** Altı bot filtresi Crossref, doi.org handle API'si ve gerçek
   tarayıcıyla doğrulandı; `encyclopediaofmath.org` bütün sitede geçici 502 (Wayback yedeği kayıtlı).
   Beş DOI'de düzeltme/geri çekme notu yok. Yedi künye düzeltildi (6.046J eğitmenleri, Selinger'in yayın
   yeri, OSTEP 14/17. bölüm, xv6 4.6 adı, MCS 13.7.5, EWD 123 §4.1/§4.3).
3. **Bütün korpusun olgu denetimi** (run 2 yalnızca yenileme farkını denetlemişti). Sekiz küme denetçisi
   → küme başına şüpheci doğrulayıcı → ana oturumun düzenleme düzenleme kararı → altı fark inceleyicisi.
   156 bulgunun 155'i doğrulandı (52'si düzeltme metni değişerek), 19 ek bulgu ve fark incelemesinin 25
   maddesi eklendi; ana oturum iki bulguyu reddetti ve düzeltme metinlerinin bir kısmını kendisi yeniden yazdı. En önemli
   düzeltmeler: 23'ün Dijkstra omurgasında yön ("artıramaz" → "düşüremez"), 18'in omurga açılımı, 20'nin
   medyan grubu gerekçesi, 28'in MLFQ omurgası, 31'in "dört koşul" okuması, 30'un güvenlik/canlılık
   sınıflaması, 34'ün indeksli ayırma ve kapsayıcı koşul örneği, 36'nın çarpım kuralı, 38'in COW maddesi,
   39'un 2PL eşlemesi, 41'in heap yüksekliği (19), indirgeme yönü ve Cepeda yöntemi, 1/5/10/14'ün
   omurga ve tanım hataları. Ana oturumun bağımsız modelleri 30'un 82/70/11'ini yeniden üretti ve 31'in
   19/16'sının yalnızca "ikinci alınan kilit önce bırakılır" varsayımıyla çıktığını gösterdi (metne yazıldı).
4. **Kural temizliği.** SOZLESME §2 kalıp yasağının kalıntıları ("bedava" 14, etiketli uyarı açılışları
   17, "zarif/zarafet" 2, "sinyal" kapanışları) ve kaynaksız mülakat sıklığı iddiaları (30 yer) kaldırıldı;
   swap anlamındaki "takas" "yer değiştirme" oldu; okura sızan "bu run'da" (7 yer) ve konum göndermesi
   düzeltildi; "kendi hesabım" diyen altı yere ara adım eklendi.
5. **Şekiller.** Run 2'nin üç SVG'de bıraktığı XML kusuru (`viewBox"xmlns`) düzeltildi; yeni metin–çizgi
   ölçümünün bulduğu 24 aday altı SVG'de giderildi (27, 23, 20, 14, 21, 24); 22'nin DP tablosundaki boşluk
   kapandı; 25 ve 13'ün alt metinleri 120 kelimenin altına indi.
6. **16 makale "gözden geçirildi" işareti aldı** (`revised_at: "2026-10-26"`): 1, 5, 10, 14, 18, 20, 23,
   24, 28, 30, 31, 34, 36, 38, 39, 41. İşaretli yazı sayısı 20.
7. **İçerik:** `content/series-boun/` (41 makalenin hepsi, 23 SVG, katalog) ve `docs/seri-boun/`
   (ARASTIRMA, HANDOFF, YOL-HARITASI terim ve tekrar defterleri).
8. **Kod (kullanıcının açık talebiyle, aynı gün):** render kapısının bulduğu koyu tema kontrast kusuru
   düzeltildi. Beyaz metin `bg-accent` (koyu temada #d98597, 2,71:1) yerine `bg-accent-fill` (5,36:1)
   üstünde: `series-progress-reset.tsx` onay düğmesi, `series-landing.tsx` "Seriye başla" CTA'sı ve
   `reader/article-marks.tsx` işaret rozeti; "İlerlemeyi sıfırla" etiketi `-ml-3` ile sütuna hizalandı.
   Yeni statik koruma `src/app/accent-contrast.test.ts` üç temada `--accent-fill`'in beyazla ≥ 4,5:1
   kaldığını ve hiçbir sınıf dizisinin `text-white` ile `bg-accent`'i birlikte kullanmadığını denetler
   (eski kodda üç yeri yakaladı). Açık ve sepya temada görünüm değişmez (iki token aynı renk).

## Bakım run'ı 2'de ne yapıldı (2026-09-26)

Yeni makale üretilmedi; `TRIGGER.md`'nin bakım maddeleri koşuldu. Kanıt ve birebir alıntılar
ARASTIRMA §20'de; betikler `artifacts/bakim2-2026-09-26/` altında. 2026-09-25 22:53'te başlatılan bir
"bakım 2" denemesi yalnızca taban ölçümü bırakmıştı (`artifacts/bakim2-2026-09-25/`); bu run onun
render ve denetim betiklerini yeniden kullandı.

1. **Resmî sayfalar değişmemişti ama biçim yanlış okunmuştu.** On bir sayfa çekildi, §1 alıntıları
   birebir. Aynı paragraftaki "at the interviewer's office" ve "ready at the next office"
   cümleleri, mülakatın **görüşmeci başına ayrı ofis görüşmeleri** olduğunu söylüyor (Wayback
   2026-06-07: "10 minutes per professor at the office of the professor"). Makale 1 (açılış, resmî
   gerçek paragrafı, omurga) ve 40 (açılış) "bir oda, en az iki kişi" diyordu; düzeltildi, **makale 1
   "gözden geçirildi" işareti aldı** (`revised_at: "2026-09-26"`). YOL-HARITASI'nın resmî dayanak satırı
   da güncellendi.
2. **Atıf taraması: 67 adresin 67'si geçerli** (61'i 200; altı bot filtresi Crossref ve gerçek
   tarayıcıyla doğrulandı). Yeni kaynak: Kozen & Zaks 1994 (makale 21'in kanonik para sistemi köprüsü).
3. **Yenileme farkının (commit `8ec2fc9`) olgu denetimi.** İki sınırlı workflow (beş küme + bir durum
   sayısı ajanı); ana oturum her bulguyu kendi kanıtıyla doğrulayıp uyguladı. Olgu hataları:
   11 (yükseklik 19, arama 20, oran **elli bin** — run 1'in "kırk yedi bin"i yanlış 21'e hizalıydı),
   14 (en az 20 karşılaştırma), 29 (P işleminin ters koşulu, N − 1 dilim), 30 (14 durumlu modelde iki
   kilitlenme; "üçü de uykuda" yalnızca MAX = 1), 27 (OSTEP'in "tracking processor performance"
   kurgusu), 28 (açlık için aşağı indirme kuralı gerekir, s/(q + s), kırmızı-siyah en kötü 24 adım),
   38 (şekil xv6'nın değil klasik Unix'in sırası), 39 (25.000 bloklu tabloda maliyet modeli, BCNF
   süper anahtar), 1 (dördüncü yetenek), 8 (1 ve −1'in tersi), 22 (üst/alt panel), 36 (iki satır).
   Kesinlik ve kural düzeltmeleri 4, 5, 6, 10, 13, 16, 18, 19, 20, 21, 23, 24, 25, 26, 31, 33, 34, 35,
   37'de. Tam liste ve uygulanmayan bulguların gerekçesi ARASTIRMA §20.3.
4. **Yenilemeden kalan dört bakım borcu kapandı** (aşağıdaki "Kalan bakım borçları" maddeleri):
   28 uzun alt metin 120 kelimenin altına indi ve SVG'ye karşı ikinci kez okundu; SVG-tablo kuralı
   ihlalleri (41'in iki tablolu şekli, 9/16/22'de Markdown tablosunu tekrar eden satırlar) giderildi;
   29–31 ve 20'deki durum sayıları yeniden üretildi (20'nin T(n)/n dizileri tanımlı bir modelin
   sayılarıyla değişti); 12'nin B-ağacı şekli 99 anahtara hizalandı.
5. **Kod değişmedi.** `src/`, `tests/`, `tools/` el değmedi. Değişenler `content/series-boun/`
   (36 makale dosyası, 15 SVG, katalog) ve `docs/seri-boun/` (ARASTIRMA, HANDOFF, YOL-HARITASI).

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
- **Kalan bakım borçları — dördü de 2026-09-26 bakım run'ı 2'de kapandı** (ARASTIRMA §20.4–20.5):
  (1) 200 kelimeyi aşan 28 alt metin 120'nin altına indi. (2) SVG-tablolar sınıflandırıldı; her
  makalede en fazla bir tane kaldı (2, 15, 23, 29, 31, 33, 41) ve tablo tekrarları çıkarıldı.
  (3) 29–31'in durum sayıları birebir üretildi, 20'nin oranları doğrulandı ve T(n)/n dizileri tanımlı
  modelin sayılarıyla değişti. (4) 12'nin B-ağacı şekli 99 anahtara hizalandı.

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

## Açık borçlar (2026-10-26 bakım run'ı 3'ten sonra)

**BOUN içeriğinde açık borç yoktur.** Run 3'ün bulduğu her içerik ve şekil kusuru kapandı. Borç olmayan
ama kayıtta duran şeyler:

- **[2026-10-26'da KAPANDI — run 3 bölümü madde 8]** **(Paylaşılan kod, BOUN içeriği değil)** Koyu temada `/boun`'daki "ilerlemeyi sıfırla" onay düğmesi
  ("Evet, bu seriyi sıfırla") ve "Seriye başla" düğmesi beyaz metin / `#d98597` zemin, **2,71:1** —
  WCAG AA'nın (4,5) altında. Kaynak `src/components/series/series-progress-reset.tsx:115`
  (`bg-accent text-white`, 2026-10-05) ve `src/components/series/series-landing.tsx:97` (2026-09-25).
  Öneri: beyaz metinli dolgularda `bg-accent-fill` (koyu temada 5,36:1; açık ve sepya temada değişmez).
  Bu run koda dokunmadı; düzeltme kullanıcı kararı ve paralel oturumlarla eşgüdüm ister. Aynı satırdaki
  küçük not: "İlerlemeyi sıfırla" etiketi sütun kenarından 12 px içeride (`px-3`), `-ml-3` hizalar.
- **Geçici atıf kesintisi:** `encyclopediaofmath.org/wiki/Semi-group` (makale 8) 2026-10-26'da bütün
  sitede 502 verdi. Sonraki run'da hâlâ 5xx ise bağlantı Wayback
  `20260712065039` kopyasına çevrilir (tanım orada birebir).
- **Mekanik kapının görmediği sınıflar:** `check-series-content.cjs` "bedava"yı yalnızca tek kelimelik
  cümle olarak arıyor; etiketli "… uyarı(sı):" açılışlarını, kaynaksız mülakat sıklığı iddialarını,
  "## Kaynakça" sonrasındaki üretim dilini ve SVG'nin XML geçerliliğini hiç denetlemiyor. Bunları
  `artifacts/bakim3-2026-10-26/denetim/denetim.py` (üretim dili, sayısal gönderme) ve bu run'ın grep
  desenleri (ARASTIRMA §21.3) yakalıyor. Kapıya eklemek `tools/` değişikliğidir (AI ve Güven Sınırı
  serileriyle ortak araç); kullanıcı kararına bırakıldı.
- **Alt metin uzunluğu:** 121–200 kelime arasında 23 alt metin var (en uzunu 200, 38 `kopyalarken-yazma`).
  Denetleyici eşiği 200'dür, 120 ileriye dönük hedeftir; yazı başka bir nedenle açıldığında kısaltılır.
- **Yedi SVG-tablo** (2, 15, 23, 29, 31, 33, 41) kurala uygun biçimde birer tane; değişmedi.
- **9 `buyume-siniflari`:** "adım sayısı (…)" etiketi ile "n²" arasında 1,4 birimlik mürekkep boşluğu
  (çakışma değil; görünür kusur yok).

### Run 2'nin kaydı (2026-09-26)

**Açık borç yoktur.** Run 2 yenilemeden kalan dört bakım borcunu kapattı (yukarıdaki bölüm). Borç
olmayan ama kayıtta duran iki şey: (a) yedi makalede birer SVG-tablo var (2 `cikarim-kurallari`,
15 `kararlilik`, 23 `dijkstra-izleme-tablosu`, 29 `bekleme-ve-semafor`, 31 `bankaci-guvenli-durum`,
33 `degistirme-karsilastirmasi`, 41 `zayif-nokta-haritasi`); kural bir taneye izin verdiği için
dokunulmadı, yazı başka bir nedenle açıldığında yeniden çizime adaydır. (b) 22'nin DP şeklinde
"saat" sütunu çıkınca p(j) ile "al" sütunları arasında boşluk kaldı; okunuyor, düzen işi değil
görsel bir pürüzdür.

### Run 1'in kaydı (2026-09-13)

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

- **(Run 3) `artifacts/` yeniden klonda kaybolur.** Depo 2026-10-22'de `C:\dev\anil-lib`'e yeniden
  klonlandı (eski yol `D:\dev\anil-lib`); `/artifacts/` `.gitignore`'da olduğu için run 1–2'nin bütün
  betikleri yoktu. Run 3'ün betikleri `artifacts/bakim3-2026-10-26/` altında ve aynı nedenle kalıcı
  değildir. Bir sonraki run onları bulamazsa ARASTIRMA §21 ve aşağıdaki tarif yeniden kurmaya yeter.
- **(Run 3) Git Bash curl'ü (Schannel) `CRYPT_E_REVOCATION_OFFLINE (0x80092013)` verir** ve bu
  `cmpe.bogazici.edu.tr`, `web.archive.org` ve 69 adresin 45'inde toplu "000" üretti — toplu bağlantı
  ölümü sanılmamalı. `--ssl-no-revoke` (ya da `--ssl-revoke-best-effort`) ekle.
- **(Run 3) Playwright takımı 72 teste büyüdü** (Güven Sınırı serisi ve ilerleme sıfırlama testleri).
  Beklenen taban **69 geçti / 1 atlandı / 2 düştü** (`reader-data` çifti); gezici `reader.spec.ts:520`
  düşerse 68/1/3. Atlanan test `reader.spec.ts:249`dur (AI kataloğuna bağlı koşullu atlama).
- **(Run 3) Okuyucu değişti:** makale sayfalarında artık bir `h1` var (bölüm başlığı bloğu; gövde hâlâ
  H2 ile başlar) ve `.series-figure-scroll`'un `min-width: 34rem`'i kalktı — 375 px'te şekiller 351 px'e
  sığar, 13 birimlik etiket 6,34 px olur (büyütme düğmesi bunun içindir). Sayfa hidrasyondan sonra
  genişler: ölçümden önce 1,5 sn bekle.
- **(Run 3) Bu klonda `.env.local` yok.** Dev sunucusu parola kapısını yalnızca verilen ortam
  değişkenleriyle açar; render betikleri bunları sunucuyu başlatırken verir (aşağıdaki tarif).
- **(Run 3) Render betiklerini `.mjs` yaz, `.ts` değil.** `tsconfig.json` `**/*.ts` içerir; kopyadaki ya
  da `artifacts/` altındaki bir `.ts` typecheck'i kırar. Betikler yalıtılmış kopyanın içinde
  (`<kopya>/bakim3-render/`) durur ki `@playwright/test` kopyanın `node_modules` junction'ından çözülsün.
- **(Run 3) Canvas metrikleri 13 px'te tam sayıya yuvarlanır** (Chrome); geometri betiği metni 10 kat
  büyük ölçüp böler. Yeni ölçüm "metin–çizgi" (bir çizginin/yolun metin mürekkebinden geçmesi) repo
  denetleyicisinin ve eski geometri testinin görmediği altı kusuru buldu.
- **(Run 3) SAGE (`journals.sagepub.com`) yerleşik tarayıcıya da Cloudflare doğrulaması gösteriyor;**
  doğrulama yolu Crossref başlığı + `doi.org/api/handles/<doi>` kayıtlı adresi. `pypdf` bu klonda yok;
  sayfa sayısı için `pdftotext` çıktısındaki form feed'ler sayılır.
- **(Run 3) Paralel oturum:** bu run sırasında Güven Sınırı oturumu aynı depoda `content/series-guvenlik/`
  ve `docs/seri-guvenlik/` altında commit'lenmemiş iş tutuyordu. Kapılar `git archive HEAD` kopyasında
  ve ayrı portlarda (3131 e2e, 3141 render) koştu; commit'te yalnızca BOUN yolları alınmalıdır.
- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yok; `/api/reader-sync` kimliksiz istekte 307, kimlikli istekte 503 döner ve
  uygulama çevrimdışı moduna düşer. Bu yüzden `tests/e2e/reader-data.spec.ts` içindeki **iki test
  başarısızdır** ve bu, içerikten bağımsızdır.
- **Playwright tam takımında üçüncü, gezici bir başarısızlık görülebiliyor.** Batch 12'de iki kez
  çıkmıştı (`reader.spec.ts:518` ve `reader-resume.spec.ts:92`, koşudan koşuya değişiyor).
  **Batch 13'te çıkmadı: sonuç 50 geçti / 1 atlandı / 2 başarısız** — yalnızca bilinen
  `reader-data` ikilisi. Yani 49/1/3 bir tavan değil, zamanlama kırılganlığının bazen görünmesidir;
  **beklenen taban 50/1/2'dir** ve üçüncü bir başarısızlık çıkarsa kontrol koşusuyla atfedilmelidir.
  **Run 2 (2026-09-26) güncellemesi:** takım 64 teste büyüdü (HEAD'deki başka işlerden); gezici test
  koşarsa taban **61/1/2**, düşerse 60/1/3'tür. Gezici test bu kez `reader.spec.ts:520` idi ve saf
  HEAD içeriğinde de 3 denemede 1 kez düştü.
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
- **(Run 2) e2e yapılandırmasının varsayılan portu 3100'dür ve `reuseExistingServer: !CI`'dır.** Bu
  makinede 3100 ve 3200'de ilgisiz React dev sunucuları çalışıyor; Playwright onları yeniden
  kullanırsa testler yanlış uygulamaya gider. Tam takımı `PLAYWRIGHT_PORT=3122` gibi boş bir portla
  koş (`netstat`/`Get-NetTCPConnection` ile önce bak).
- **(Run 2) Yalıtılmış kopyayı `git archive HEAD | tar -x -C <kopya>` ile kur ve üzerine yalnızca
  `content/series-boun/`'u bindir.** Paralel AI oturumu `content/series/` altında commit'lenmemiş
  değişiklik tutuyordu; çalışma ağacının tar kopyası onların yarım işini (hash'i senkronlanmamış
  gövdeler) kapılara taşırdı. `node_modules` için PowerShell junction yeterli.
- **(Run 2) Workflow oturum kapanınca yarıda kalabilir.** `journal.jsonl` yalnızca bitmiş ajanların
  sonucunu tutar; yarım kalan ajanların dosya düzenlemeleri diskte kalır ama bulguları kaybolur.
  Kurtarma: bitmiş sonuçları journal'dan al, yalnızca yarım kalanları "şu iş zaten yapıldı, doğrula"
  talimatıyla yeniden koş (tümünü yeniden koşmak diskteki düzenlemeleri ikinci kez yapar).
- **(Run 2) OpenWolf kancaları her düzenlemede `.wolf/buglog.json` ve `.wolf/anatomy.md`'ye otomatik
  kayıt ekliyor** ("auto-detected" etiketli). Bu, run'ın kendi eklemesi değildir; diff'te görünmesi
  beklenir.
- **(Run 2) Ajan yazımı metin bağımsız olgu denetimi ister.** 2026-09-25 yenilemesi diff üzerinden
  kabul edilmişti; olgu denetimi yirmiden fazla gerçek hata buldu (ters koşul, bir eksik sayı,
  yanlış mekanizma). Bir sayıyı başka bir sayıya **hizalamadan önce ikisini de makalenin kendi
  kuralından yeniden hesapla**: run 1'in "elli bin → kırk yedi bin" düzeltmesi yanlış bir 21'e
  hizalanmıştı.
- **(Run 2) "Hiçbiri … değil" olumsuz uyumdur, çift olumsuz değildir.** SOZLESME §3'ün hedeflediği
  çift olumsuz, olumsuz ortaç ile olumsuz yüklemin birleşimidir ("bildirilmemiş bir izni veremez").

## Bu run'da doğrulananlar (bakım run'ı 3, 2026-10-26)

- **Depo denetleyicileri temiz:** içerik 41 makale (uyarı 0), SVG 83 diyagram, `sync-series-hashes`
  `--write` sonrası fark yok, `entegre-batch` kuru çalışması 0 yeni makale / 0 roadmap satırı. 83 SVG'nin
  hepsi XML olarak ayrıştırılıyor.
- **Bağımsız denetim** (`artifacts/bakim3-2026-10-26/denetim/denetim.py`, repo araçlarını çağırmaz, 12
  hata enjeksiyonlu öz-sınaması var): hash üçlüsü **41/41**, `reading_order` 1–41, kohort 13 × 3 + 1 × 2,
  revizyon işaretli yazılar [1, 5, 10, 12, 14, 18, 20, 23, 24, 25, 28, 29, 30, 31, 34, 36, 37, 38, 39, 41],
  83 SVG referanslı ve diskte, global article-id/slug **185/185** (ana 18 + AI 118 + BOUN 41 + Güven
  Sınırı 8), "Sesli anlat" **78**, HARD 0.
- **Kapılar yalıtılmış kopyada** (`git archive HEAD` + `content/series-boun/` bindirmesi, port 3131;
  `artifacts/bakim3-2026-10-26/kapilar/run-gates.sh`), düzeltmeden önce ve sonra iki kez: `pnpm
  typecheck` temiz · `pnpm test` **833/833** (42 dosya) · `pnpm build` başarılı, `/boun/[slug]` **41
  yol**, hiçbir oturum sayfası önceden render edilmiyor (prerender manifest yalnızca 4 statik yol) ·
  Playwright **69 geçti / 1 atlandı / 2 düştü** (yalnızca `reader-data` çifti). Taban koşusunda gezici
  `reader.spec.ts:520` bir kez düştü, tek başına 3/3 ve betikle 3/3 geçti; `/read` rotasını kullanır.
- **Gerçek render, geometri** (`render/geometry.mjs`, port 3141): 41 sayfa, 83 SVG, 2.073 metin;
  `pageerror` 0; viewBox taşması, metin–metin ve metin–kutu çakışması, metin–çizgi kesişmesi **0**
  (taban koşusunda 24 aday); en küçük alt mürekkep payı 5,2; bütün şekiller kabına sığıyor; "Sesli anlat"
  78/78 bütün; revizyon satırları katalogla birebir (20 yazı, tarihler eşit); ilk/son makale gezintisi
  doğru, sarkan bağ yok.
- **Gerçek render, tema** (`render/themes.mjs`): `/boun` ve 41 makale × üç tema × üç genişlik = **378
  kombinasyonun 375'i temiz**; üç kusur koyu temadaki paylaşılan sıfırlama onay düğmesinin kontrastıydı.
  Kod düzeltmesinden sonra 377/378: onay düğmesi ve CTA koyu temada 5,36:1, açık 8,23, sepya 7,37;
  kalan tek madde açık/375'te makale 1'de bir kez görülen `pageerror: Unexpected end of JSON input`dur
  — aynı kombinasyon taze bağlamla 8 kez açıldı, 8'inde de hata yok (eşzamanlı build yükü altında
  gezici dev sunucusu olayı; `render/pageerror-probe.mjs`). Düzeltmeli kod kopyada typecheck temiz,
  837/837 test, build 41 yol, Playwright 69/1/2. `/boun`: 41 benzersiz bağ, "yakında" yok, kapanış notu ve resmî-bilgi uyarısı yerinde,
  sıfırlama denetimi görünür ve komşularıyla çakışmıyor (onay hiç tıklanmadı). Düzeltilen altı şeklin
  light/dark ekran görüntüsü gözle incelendi (`render/sonra/fig/`).
- **Resmî sayfalar ve atıflar:** 11 + 1 resmî sayfa 200, alıntılar 41/43 birebir; 68 atıf adresinin 67'si
  geçerli, biri geçici 502 (ARASTIRMA §21.1–21.2).

### Run 2'nin doğrulama kaydı (2026-09-26)

- **Depo denetleyicileri temiz:** içerik 41 makale (200 kelimeyi aşan alt metin uyarısı **0**; run
  başında 28), SVG 83 diyagram, `sync-series-hashes --write` sonrası fark yok, `entegre-batch` kuru
  çalışması 0 yeni makale / 0 roadmap satırı.
- **Bağımsız Python denetimi** (`artifacts/bakim2-2026-09-25/denetim.py`): katalog ↔ frontmatter ↔
  gövde hash üçlüsü **41/41**, `reading_order` 1–41 kesintisiz, kohort 13 × 3 + 1 × 2, revizyon
  işaretli yazılar [1, 12, 18, 25, 29, 36, 37, 39], referans verilen 83 SVG'nin hepsi diskte ve
  referanssız SVG yok, global article-id/slug **177/177** çakışmasız.
- **Kapılar yalıtılmış kopyada** (`git archive HEAD` + `content/series-boun/` bindirmesi, port 3121 ve
  3122): `pnpm typecheck` temiz · `pnpm test` **764/764** (37 dosya) · `pnpm build` başarılı, **184
  statik sayfa**, `/boun/[slug]` **41 yol** (3 + 38). Sayılardaki artış BOUN'dan değil, HEAD'deki AI
  işinden gelir.
- **Playwright tam takım: 60 geçti / 1 atlandı / 3 düştü.** İkisi bilinen `reader-data` çifti
  (`DATABASE_URL` yok). Üçüncüsü `reader.spec.ts:520` ("turns exactly one page per scroll gesture")
  ve ana kütüphanenin `/read` rotasını kullanır. Kontrol koşusunda bu içerikle 2 denemede 1, **saf HEAD
  BOUN içeriğiyle 3 denemede 1** kez düştü; yani BOUN'dan bağımsız, zamanlamaya bağlı gezici hatadır.
- **Gerçek render, geometri** (`render/geometry.render.ts`): 41 sayfa, **83 SVG**, `pageerror` 0,
  metin çakışması 0 (ilk koşuda 27'nin şeklinde bu run'ın eklediği "tek işlemcide" notu sağ panele 5,5
  birim taşıyordu — kısaltıldı ve yeniden ölçüldü), viewBox taşması 0, bütün şekiller kabına sığıyor,
  en küçük alt mürekkep payı 5 birim, "Sesli anlat" kutuları **78/78** bütün, 8 revizyon satırı yerinde.
- **Gerçek render, tema** (`render/themes.render.ts`): `/boun` ve değişen şekilli 14 makale × üç tema ×
  üç genişlik = **135 kombinasyonun 135'i temiz** (zemin rengi, filtre yok, yatay kayma yok, `undefined`/
  `NaN` yok, giriş 41/41 bağ, "yakında" yok, kapanış notu ve resmî-bilgi uyarısı yerinde). Değişen 15
  şeklin light/dark × 375/1440 ekran görüntüsü alındı (60 dosya); yapısal olarak değişen yedisi (9,
  16, 22, 25, 26, 30, 41) gözle incelendi, geri kalanlar yalnızca etiket değişikliğidir ve geometri
  ölçümüyle doğrulandı.
- **Resmî sayfalar ve atıflar:** 11 resmî sayfanın 11'i 200 ve alıntılar birebir; 67 atıf adresinin
  67'si geçerli (ARASTIRMA §20.1–20.2).

### Run 1'in doğrulama kaydı (2026-09-13)

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
Run 3'ün betikleri `artifacts/bakim3-2026-10-26/` altındadır; klasör yoksa (yeniden klon) ARASTIRMA §21
ve bu tarif onları yeniden kurmaya yeter.

1. **Resmî kaynakları yeniden doğrula.** SOZLESME §4 resmî süreç bilgisinin değişebilir olmasını
   zorunlu kılar ve seri bunu okura da söyler. Kontrol edilecekler: M.Sc. programı sayfası (mülakat
   süresi, görüşmeci sayısı, konu başlıkları, Scientific Prep üçlüsü, zamanlaması ve 2.50 şartı), resmî
   Türkçe sayfası, lisans müfredatı ve ders sayfaları. Değişiklik varsa **ARASTIRMA §1 ve ilgili makale
   gövdeleri** güncellenir ve `sync-series-hashes --write` çalıştırılır. **Paragrafın tamamını oku:**
   görüşmenin biçimi (run 2) ve Scientific Prep'in zamanlaması (run 3) tek cümlede değil. Wayback'te
   2026-06'dan sonra kopya yok; sayfa geçmişi için sitenin kaynak deposu `bouncmpe/bouncmpe.github.io`
   (dosya başına commit geçmişi) kullanılır. Betikler: `resmi/extract.py`, `compare.py`,
   `claims_grep.py` (curl'e `--ssl-no-revoke`).
2. **Atıf bakımı.** Açık kaynak borcu yok. Bir adres ölürse çalışan bir ayna bulunur ve kaynakça maddesi
   güncellenir; bot filtresi veren bir adres **ölü sayılmaz** (Crossref + `doi.org/api/handles` + gerçek
   tarayıcı). Her DOI için Crossref `updated-by` sorgulanır. Betikler: `linkler/extract.py`, `fetch.py`,
   `crossref.py`. **İlk iş:** makale 8'in `encyclopediaofmath.org` bağlantısı hâlâ 5xx mi?
3. **Düzeltme.** Yazım hatası, bozuk bağlantı, render kusuru, olgu hatası. Gövde değişirse
   `sync-series-hashes --write` zorunludur. Kapılar ve render için:
   - `bash artifacts/bakim3-2026-10-26/kapilar/run-gates.sh` — yalıtılmış kopyayı (`C:/dev/anil-lib-bakim3-kapi`)
     yeniler, çalışma ağacının `content/series-boun/`'unu bindirir, typecheck / test / build / beş
     denetleyici / Playwright tam takımı koşar ve beklenmeyen her e2e hatasını tek başına 3 kez yeniden
     dener. `SUMMARY.txt` VERDICT satırını yazar.
   - Gerçek render: kopya `C:/dev/anil-lib-bakim3-render` (yoksa `git archive HEAD | tar -x`, BOUN
     içeriğini bindir, PowerShell junction ile `node_modules`), betikleri `artifacts/bakim3-2026-10-26/render/*.mjs`
     → `<kopya>/bakim3-render/`. Sunucu: kopyada `SITE_PASSWORD_SHA256=2e10d696…f2cef855
     AUTH_COOKIE_SECRET=e2e-test-signing-secret-must-be-at-least-32-chars-long pnpm exec next dev -p 3141 -H localhost`
     (işaret: `/boun` 307, `/login` 200). Sonra `node geometry.mjs` (41 sayfa; çakışma, taşma,
     metin–çizgi, Sesli anlat, revizyon, alt metin) ve `node themes.mjs` (378 kombinasyon). İçerik ya da
     SVG değişince kopyaya yeniden kopyala ve sunucuyu yeniden başlat (katalog süreç boyunca önbellekte).
   - Bağımsız denetim: `python -X utf8 artifacts/bakim3-2026-10-26/denetim/denetim.py --quiet`.
   - **Kopyaları silerken önce junction'ı kaldır:** `cmd //c rmdir C:\dev\anil-lib-bakim3-kapi\node_modules`
     (render kopyası için de aynı); junction içinden `rm -rf` gerçek `node_modules`'u siler.
4. **Olgu denetimi isteğe bağlıdır ama değerlidir.** Run 2 (yenileme farkı) ve run 3 (bütün korpus)
   her seferinde gerçek hatalar buldu; ajan yazımı her düzeltme bağımsız bir fark incelemesinden geçmeli
   (run 3'te fark incelemesi 11 yeni hata yakaladı). Desen ve sınıflar ARASTIRMA §21.3'te.
5. **Seriye başlık eklemek yalnızca kullanıcının açık talebiyle olur.** SOZLESME §6 doldurma konusu
   icat edilmesini yasaklar; §7 yayımlanmış gerçeği en yüksek otorite sayar. Talep gelirse sıra
   şudur: YOL-HARITASI'na başlık ve prerequisite satırı eklenir, gerekiyorsa SOZLESME revize edilir
   (kullanıcının açık talebiyle, tarihli değişiklik notuyla), sonra üretim yapılır.

**Yayımlanmış makalelerin verdiği sözler tükendi.** 40 ve 41 ileri vaat içermiyor; 41'in "Sırada ne
var" bölümü serinin bittiğini açıkça söylüyor ve okuru kendi turuna yönlendiriyor. Karşılanmamış
numaralı ya da konu adlı ileri gönderme **kalmamıştır**.

## Non-normative history

- **2026-10-26 (bakım run'ı 3, makale üretilmedi):** Depo yeniden klonlanmıştı ve eski betikler
  kayıptı; bütün bakım araçları yeniden kuruldu. Resmî sayfalar değişmemişti; makale 1'deki Scientific
  Prep zamanlaması ve 17/24'teki "katalog tanımı" ifadeleri düzeltildi. 68 atıf adresinde ölü yok.
  İlk kez **bütün korpus** olgu denetiminden geçti (8 küme denetçisi → şüpheci doğrulama → ana oturum
  kararı → 6 fark inceleyicisi); 41 makalenin hepsinde düzeltme yapıldı, 16'sı işaret aldı. Kalıp
  yasağı kalıntıları ve kaynaksız mülakat sıklığı iddiaları temizlendi. Run 2'nin üç SVG'de bıraktığı
  XML kusuru ve yeni metin–çizgi ölçümünün bulduğu altı şekil düzeltildi; 22'nin DP boşluğu kapandı.
  Aynı gün kullanıcının talebiyle paylaşılan koddaki koyu tema kontrast kusuru düzeltildi (üç bileşen +
  statik koruma testi). Doğrulama: denetleyiciler
  temiz, bağımsız denetim 41/41 ve 185/185, `pnpm test` 833/833, build 41 yol, Playwright 69/1/2,
  geometri 41 sayfa / 83 SVG temiz, tema 378'de 375 (kalan üçü paylaşılan kod).
- **2026-09-26 (bakım run'ı 2, makale üretilmedi):** Resmî on bir sayfa değişmemişti; ama aynı
  paragrafın "interviewer's office" ve "next office" cümleleri mülakatın **görüşmeci başına ayrı ofis
  görüşmeleri** olduğunu söylüyordu ve 1 ile 40 bunu "tek oda, iki kişi" diye okumuştu — düzeltildi,
  1 "gözden geçirildi" işareti aldı. 67 atıf adresinin 67'si geçerli; Kozen & Zaks 1994 eklendi.
  2026-09-25 yenilemesinin farkı iki sınırlı workflow ile olgu denetiminden geçti; ana oturum her
  bulguyu kendi kanıtıyla doğrulayıp uyguladı (11'de yükseklik 19 / arama 20 / elli bin, 14'te 20,
  29'da ters koşul, 30'da ikinci kilitlenme ve MAX = 1 koşulu, 27/28/38/39'da mekanizma ve model
  düzeltmeleri). Yenilemeden kalan dört bakım borcu kapandı (28 alt metin, SVG-tablo kuralı, durum
  sayıları, B-ağacı). **Kod değişmedi.**
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
