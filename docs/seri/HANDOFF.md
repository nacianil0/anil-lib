# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-26 · Durum: **SERİ TAMAMLANDI — 1–118 yayında (kohort Batch 0 → Batch 28) · roadmap'te `planlandi` satırı yok · trigger bakım kipinde · kapsamın uzatılması kullanıcı kararıdır**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 118 — `son-adim-haritayi-yeniden-cizmek` (yol haritasının son başlığı) |
| Sıradaki güvenli başlangıç | **Yok — üretilecek makale kalmadı.** `docs/seri/TRIGGER.md` bakım kipindedir: yeni makale üretmez, yeni başlık icat etmez (SOZLESME §7). Bir bakım run'ı yalnızca aşağıdaki "Açık borçlar"dan, SOZLESME §4'ün ön baskı durum kontrolünden ya da §5/§12 düzeltmelerinden iş alır. **Bağlayıcı numaralı koordinat yok; numarasız işaret yok; devrolan planlı tekrar yok** (Batch 28 hepsini kapattı ya da seriyle birlikte kapattı; bkz. YOL-HARITASI "Batch 28'de gerçekleşen tekrarlar") |
| Kapsamın uzatılması | **Kullanıcı kararıdır ve verilmedi.** Uzatma istenirse önce yol haritasına yeni faz ve başlıklar yazılır (SOZLESME §7), kategori ve level kararları verilir; ancak ondan sonra trigger üretim kipine döner. Sıradaki kohort o durumda `classification_batch: 29`, `readingOrder` 119 olur |
| Sıradaki kohort | Yok (uzatma kararı verilirse `classification_batch: 29`) |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu). **BOUN serisi `/boun` altındadır, `/seri-boun` değil** |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 27–28'in ek ölçerleri oturum scratchpad'indeydi ve kalıcı değil** (bilerek; bkz. Açık borçlar). Yeniden yazılması gerekenler "Ölçer betikleri" bölümünde |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (kararlar #19, #201) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; 91–102 `foundations`; 103–109 `models-and-training`; 110–113 ve 116–118 `multimodal-and-future`; **114–115 `case-studies`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, #200, #209, #219, #225, #233). **`case-studies` klasörü Batch 27'de açıldı ve kod değişikliği gerekmedi (karar #241); kontrollü sözlükteki yedi kategorinin tamamı artık kullanımda.** Okuma listesinde Batch 27 kohortu iki öbeğe bölünüyor (111–113 `multimodal-and-future`, 114 `case-studies`) ve render'da doğrulandı; `reading-list-groups.test.ts` çalıştırıldı ve geçti |

## Editoryal yenileme turu (2026-09-25) — kararlar #247–#253

Kullanıcının açık talebiyle 1–114'ün **tamamı** gerçek gövdeleri, şekilleri ve kaynaklarıyla
yeniden okundu; düzeltmeler uygulandı ve kalıcı kurallar SOZLESME v2.2'ye yazıldı. Yöntem: faz
başına bir denetim ajanı (AI'da 12 küme) okudu, gerekli yerde doğruladı ve düzeltti; kabul ana
oturumda diff üzerinden verildi; kalan slogan kalıpları tek bir üslup ajanıyla temizlendi.
Tur cursor'ı değiştirmedi; 115–118 ondan sonra Batch 28'de yayımlandı ve bu turun kuralları altında yazıldı.

- **Sonuç:** 43 yazı anlamlı biçimde revize edildi ve "gözden geçirildi" işareti aldı
  (2, 3, 9, 13, 14, 16, 17, 18, 19, 28, 30, 33, 34, 40, 42, 43, 54, 57, 63, 67, 69, 71, 72, 73, 74,
  75, 81, 83, 86, 89, 92, 94, 95, 96, 97, 101, 103, 104, 105, 106, 107, 109, 112); 69 yazıda yerel
  düzeltme (kalıp, terim, tek sayı/künye, köprü), 64 ve 66'da değişiklik yok. İlk 10'un
  değerlendirmesi: bugünkü seride "sezgi katmanı" işini görüyorlar ve 91–97, 100, 103 onların
  sayılarını girdi olarak kullanıyor; eksik köprüler (1'in seri tanıtımı v2 eksenlerini anmıyordu,
  2'nin eşik kurulumu 95'e bağlanmıyordu, geriye yayılım seride hiç sayılarla işlenmemişti)
  kapatıldı; kalıp cümleler (makale başına 6–10) temizlendi; numaralı sözlerinin tamamı ödenmiş.
- **#247 Revizyon işareti:** `revised_at` + `revision_note` frontmatter alanları, katalog kopyası
  `sync-series-hashes.cjs --write` ile; okuyucuda metnin üstünde sakin satır, revizyondan önce
  okumuş okura "Sen okuduktan sonra…" ve listede "yenilendi"; ilerleme verisine yazmaz
  (SOZLESME §12; kod `src/lib/content/revision.ts`, `src/components/reader/revision-notice.tsx`;
  e2e `tests/e2e/series-revision.spec.ts`).
- **#248 Hash tanımı:** `content_hash` artık satır sonları LF'ye normalleştirilerek hesaplanır;
  eski hash'ler çalışma kopyasının CRLF'sine bağlıydı. Bütün hash'ler bu turda yeniden yazıldı.
- **#249 Şekil tabanı 2 → 1:** kota kaldırıldı (şekillerin ~üçte ikisi SVG'ye çizilmiş tablo ya da
  düzyazıydı). Tablo–şekil tekrarı yasak; kavramın biçimi varsa şekil onu çizer (SOZLESME §6).
- **#250 Mekanik kapılar:** `check-series-content.cjs` kalıp listesi, ondalık eki, okura sızan
  üretim dili ve alt metin uyarısı; `check-series-svg.cjs` alt kenar payı 8 (17 SVG'nin viewBox'ı
  bu yüzden birkaç birim uzatıldı, hiçbir öğe yer değiştirmedi).
- **#251 Terim kararları:** kavram "hibrit arama"dır (29), 44'teki "melez getirme" ve şekil etiketi
  buna çekildi; "konfabülasyon" ilk kez 17'de, 65 yeniden gloss'lamaz; "kalibrasyon"un
  Kalai–Vempala'daki dar anlamı 17'de ayrıca adlandırılır; "hoşgörülü bulma oranı" (43) deftere
  girdi.
- **#252 Başlık istisnası:** 78'in ilk başlığı "Beş makale önce açık bırakılan soru" olgusal olarak
  yanlıştı (soru 5. makalede bırakılmıştı) → "Beşinci makalenin açık bıraktığı soru". Bu başlıkta
  kayıtlı okuma konumu olan okur metin çıpasıyla geri döner. Başka başlık değişmedi.
- **#253 Özet hizalaması:** gövdesi düzeltilen yazılarda özet gövdeyle çelişiyordu ve frontmatter +
  katalogda birlikte güncellendi: 34, 60 (olgu hatası: "en pahalı üçüncü" → ajansız hattın iki
  katı), 67, 69, 73, 75, 77, 92, 94, 95, 105. YOL-HARITASI'nın bağlayıcı olgu kayıtlarında
  (LaMDA 17,8; 558 deneme; Thakur; özellik başına boyut) ve terim defterinde düzeltmeler işlendi.
- **Önemli olgu düzeltmeleri (örnek):** Eckart–Young hatasının normu (92), en iyi-n KL'nin üst sınır
  olduğu (94), EO 14110'u kaldıran belge EO 14148 ve Kaliforniya SB 53 (69), hizalama taklidinin
  25 modellik tekrarı (67), Whisper karşılaştırmasının yönü (82), çatı çizgisi ilişkisinin yönü
  (89), OPT'nin 35 yeniden başlatmasının donanım arızasına ait olması (8, 109), A-Lab düzeltmesi
  (113), Dijkstra'nın negatif kenar örneği ve Master teoreminin baskı farkı (BOUN).

## Serinin tamamlanmış state'i (Batch 28, 2026-09-26) — kararlar #254–#264

118 yol haritasının son başlığıydı ve yayımlandı; `roadmap.json`'da `planlandi` satırı kalmadı. Seri
"tamamlanmış / yeniden planlama gerektirir" state'indedir (karar #254):

- **Trigger bakım kipinde.** `docs/seri/TRIGGER.md` BOUN'un 2026-09-12 emsaliyle yeniden yazıldı; `BATCH`
  satırı tarihsel olarak duruyor ama yeni makale üretmiyor. Bir bakım run'ının iş kaynakları: (1) aşağıdaki
  "Açık borçlar", (2) SOZLESME §4'ün ön baskı durum kontrolü — özellikle 115–117'nin dokuz hakemsiz kalemi
  (karar #263) ve daha eski batch'lerin hakemsiz kalemleri, (3) okurdan ya da denetimden gelen olgu hataları
  (§5; anlamlı revizyonsa §12 işareti). Bakım run'ı yeni başlık **icat etmez**.
- **Tek kod dokunuşu `/seri` giriş sayfasının `footerNote`'u oldu** (`src/app/seri/page.tsx`): "Seri
  tamamlandı; bundan sonrası düzeltme ve güncellemedir. Gözden geçirilen yazılar metnin üstünde işaretlenir."
  Seri sayısı dili kullanılmadı.
- **Kapsamın uzatılması kullanıcı kararıdır; verilmedi.** Uzatma istenirse sıra: yol haritasına faz ve
  başlıklar (SOZLESME §7), kategori ve level kararları, HANDOFF'un cursor'ı, TRIGGER'ın üretim kipine dönmesi.
- **Sonraki bağlayıcı karar numarası #265'tir.**
- **Batch 28'in yayımlanmış makalelere dokunuşu (karar #257, revizyon işaretsiz):** 58 (CaMeL → IEEE SaTML
  2026), 71 (HLE → Nature 649), 108:81 (atıf 101 → 96), 1 (Turing künyesine cilt/sayfa), 80 (Mökander yılı
  69 ile hizalandı). **49 bilerek değiştirilmedi** (karar #256).

## Açık borçlar

- **Araştırma ve ölçüm çalışma dizinleri kalıcı değil — bu bilinçli.** Batch 22'de paralel bir oturum
  `artifacts/` altını sildiği için (karar #208g), Batch 23–28 `artifacts/` altına **hiçbir şey yazmadı**;
  bütün kaynak metinleri, PDF'ler ve ölçer betikleri oturum scratchpad'inde kaldı. Bir bakım run'ı kendi
  betiklerini yeniden yazmak zorunda. **Batch 28 sırasında da paralel bir oturum aynı worktree'deydi** — bu
  kez okuma sıfırlama özelliği üzerinde (`.wolf/*`, `docs/superpowers/specs/…`,
  `src/lib/reader-data/server/reset-service.ts`, silinmiş `src/app/zz-reset-preview/page.tsx`); o dosyalara
  dokunulmadı, build ve render izole kopyada (`/d/dev/anil-lib-b28-render`, port 3214) koşuldu.
- **Mikro-GPT'nin kodu kalıcı değil ama şartnamesi bağlayıcı (karar #226).** 103–105'in bütün sayıları saf
  Python'da yazılmış, skaler ters-mod otomatik türevli ~120 satırlık bir uygulamadan çıktı. Kod repoda
  değil. **118 mikro modeli yeniden koşmadı**; yalnızca 104'ün yayımlanmış beş tohum gözlemini andı. Bir
  bakım düzeltmesi o sayılara dokunacaksa şartname yeniden uygulanır: sözlük 7, bağlam 4, vektör boyu 4,
  2 baş × 2, ileri besleme 8, 2 blok, ön-katman normalleştirme, GELU, bağlanmış çıktı → 364 parametre.
  Geniş sürüm: vektör boyu 8, ileri besleme 16 → 1.240 parametre.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre
  Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162,
  #163, #169, #170, #171, #177, #178, #184, #185, #202, #210, #217, #218, #227, #234, **#240**). Katmanın
  tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8–14'ün başlıkları zaten Türkçe.
  **Yayımlanmamış başlık kalmadı**; 115'in "LLM"i ve 117'nin "AGI"si seride yerleşik kısaltmalardır.
- **Yayımlanmış numaralı vaatler: DEFTER KAPANDI.** Bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir; **açık numaralı koordinat yok, numarasız işaret yok.** Son numarasız işaret **49/53 → 115**
  iki okumasıyla birlikte ödendi (karar #255). 115–118'in hiçbiri numaralı ileri gönderme yapmadı ve 118
  "Bu serinin bir sonraki makalesi yok." diye bitiyor (makale başına mekanik olarak tarandı). Kavram-tekrar
  defterinde 115–118'e planlanıp tahsil edilmeyen satırlar YOL-HARITASI'nda listelendi; hiçbiri okura
  verilmiş bir söz değildi, bakımda yalnızca aday gösterir.
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20–28 kendi satırlarını ekledi.
  Devrolan eksik; bakımda toplu kapatılabilir, hiçbir kapı buna bağlı değil. **Batch 27 kavram-tekrar
  defterinde ayrı bölüm açmamıştı** (tahsili vaat paragrafında); Batch 28'in bölümü 115–118'e yönelik bütün
  planları kapsıyor.
- **Ertelenen inceleme bulguları:** Batch 1'den kalan ~29 MINOR'ın arşivi repo dışındaydı; 2026-09-25
  turu 1–10'u baştan okuduğu için bu kalem kapanmış sayılır.
- **2026-09-25 turundan kalan bakım borçları (hiçbiri kapı değil):**
  (1) **Alt metin uzunluğu:** SOZLESME §6'nın ileriye dönük hedefi ≤ 120 kelime; 200'ü aşan 4 AI alt
  metni `check-series-content.cjs --warnings` ile listelenir. Toplu kısaltılmadı.
  (2) **Hâlâ SVG'ye çizilmiş tablo olan şekiller** (yeniden çizime aday; ajan raporlarındaki
  sınıflandırma): 63 Ş2–4, 67 Ş3, 68 Ş2, 71 Ş3, 82/87/88'in üç şekli, 91 Ş3, 93 Ş1, 96 Ş3, 99 Ş3,
  102 Ş3, 103 Ş1, 104 Ş1–3, 105 Ş1, 106 `egitim-bellek-defteri.svg`, 111/113/114'ün şekilleri,
  70 `faz-yedi-haritasi.svg`, 84 `tek-sozlugun-defteri.svg`. Yeni kurala göre bir yazıda en fazla
  bir SVG-tablo; bu yazılar dokunulduğunda gözden geçirilir.
  (3) **Bu turda yeniden açılmayan sayılar** (önceki batch'lerde doğrulanmış, bu tur kaynak yeniden
  okunmadı): 15 (CUTE, Singh–Strouse), 19 (Ovadia), 41 (Longpre), 43–47 (Macdonald–Tonellotto,
  Wang, Xu, Adlakha, Press, BFCL), 58 (AgentHarm), 61 (Singhal), 63 (Shen/Deng/Zeng), 76 (AxBench
  0,098), 83 (Dhariwal ölçek 10), 85–87, 89 (TPU v4 %60), 94 (Delétang), 96 (Zhang MLP), 105
  (Ivison), 109 (MegaScale), 111 (OXE ablasyonu), 112 (RippleEdits).
  (4) **Doğrulanamayan mecra/künye:** 78 Snell ve ark. (COLM 2024/2025?), 75 Paulo–Belrose ve Heap
  (ICLR 2026?), 81 "VLMs are blind" sayıları (CVF 403), 34 R1 tablosundaki "tercih arenası"
  satırının hangi kıyas olduğu, 92 LASER'in 29,2'sinin top-10 doğruluk olması, 105 Şekil 1'in "yedi
  bağlam ortalaması" notu ile değerlerin yalnızca `başla kedi` bağlamıyla tutması, 101'deki Dror
  "110 bildirinin 3'ü" cümlesinin hangi çalışmaya ait olduğu, 50'deki Weller "%99,9 / %17" cümlesinin
  anlamı.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(15) önceki batch'lerden (kararlar #21, #97, #104,
  #106, #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20–28'de doğrulanamayan
  künye yok** (kararlar #191, #198, #207, #216, #224, #232, #239, #246, **#263**). Kısmi kalemler:
  Gundersen–Kjensmo'nun bitiş sayfası; **Batch 28'de** Karpicke–Aue 2015 (118) yalnızca ERIC özetinden,
  Carpenter–Pan–Butler 2022 (118) yazarın sitesindeki PDF'ten okundu (künyeleri Crossref'le doğrulandı);
  Chen ve ark.'nın "%99,7"si kaynak metnindeki bir toplama hatası olarak kaydedildi (karar #258).
- **Hakemsiz kaynak oranı Batch 28'de 53 kalemin 9'u (karar #263)** — beklendiği gibi 116 ve 117'de yoğun:
  MCP belirtimi (115); Kaplan 2020 ve Uluslararası Yapay Zekâ Güvenliği Raporu (116); Chollet 2019, OpenAI
  kuruluş ilkeleri, Hendrycks ve ark. 2025, ARC ekibinin üç raporu (117). Hepsi işaretli. **Bakımda ilk
  bakılacak ön baskılar bunlardır** (özellikle Hendrycks ve ark. 2025 ile ARC-AGI-2).
- **49'un belirtim cümlesi (karar #256):** 49 MCP belirtiminin genel ilkeler bölümündeki küçük harfli
  "must"ı "almalıdır" diye aktarıyor; bağlayıcı araç cümlesi SHOULD. İlkeler metninin sadık çevirisi olduğu
  için dokunulmadı; normatif düzey 115'te yazıldı. Bakımda yeniden açılmaz.
- **DBLP kapalı (Batch 18'den beri), OpenReview bot duvarında, Nature bot duvarında, `proceedings.iclr.cc`
  2022 için 404; Batch 28'de PNAS, ACM, SAGE, Taylor & Francis, OUP, Science ve HDSR de betiğe 403 verdi.**
  Çalışan kanallar aşağıda "Venue doğrulaması" bölümünde.

## Bakım run'ı nasıl çalışır (seri tamamlandıktan sonra)

**Okuyucunun seriden çıkarken bildiği.** 115: bir üründe en kolay değişen halka modeldir ve geri
alınamazlık modelin içinde değil ürünün dünyaya değdiği kenarda toplanır — yazan eylem, çıkan veri, gelen
araç tanımı. 116: alanın bilmedikleri üç türdür (aracı yok; ölçülmüş ama açıklanmamış; koşulları farklı
ölçümler) ve her türü değiştiren iş başkadır. 117: "AGI" tek bir kavram değil, her biri başka sınav ve başka
kıyas insanı isteyen sekiz tanımdır; zaman çizelgesi tartışmasının tek ölçülebilir ekseni görev ufkudur.
118: bir iddiayı okurken ve bir sistem kurarken sorulacak on iki soru; sıradaki soruyu önceki cevap seçer.

**Bir bakım run'ının sırası.** (1) SOZLESME, bu dosya ve YOL-HARITASI'nın ilgili karar ve terim satırları
okunur; `git status` ile paralel oturum kontrol edilir. (2) İş, yalnızca "Açık borçlar"dan, SOZLESME §4'ün ön
baskı kontrolünden ya da raporlanmış bir olgu hatasından alınır. (3) Düzeltme yayımlanmış makalede yapılır;
anlamlıysa §12 revizyon işareti konur, tek künye ya da tek sayı düzeltmesiyse konmaz. (4) Gövdeye her
dokunuştan sonra `sync-series-hashes.cjs --write`, ardından iki repo kapısı; render etkileniyorsa izole
kopyada build ve PNG turu. (5) Karar numarası **#265**'ten devam eder; bu dosyanın başlığı ve geçmiş kaydı
güncellenir. **Yeni makale, yeni başlık ya da yeni faz yalnızca kullanıcının kapsam uzatma kararıyla açılır.**

**Uyarı (kararlar #214, #223, #231, #238, #245, #262):** ölçülmemiş eğri çizilmez. Batch 28'in tek eğrisi
(116, Şekil 1) kapalı formülden hesaplandı ve şeklin içinde öyle yazıyor.

**Venue doğrulaması — Batch 27–28'in çalışan kanalları.** **Batch 28'in eki:** yayıncı sayfalarının çoğu
betiğe 403 veriyor (PNAS, ACM, SAGE, Taylor & Francis, OUP, Science, HDSR) — bu ölü bağlantı değil bot
duvarıdır; künye Crossref'ten, metin yazarın kendi sitesindeki PDF'ten, ERIC ya da Europe PMC özetinden
okunur ve hangisinden okunduğu kaydedilir. arXiv sürüm geçmişi (`/abs/<id>v<N>`) bir ön baskının "tarih"
sorusunu çözer; hakemli sürüm için Crossref'te başlıkla arama ilk adımdır (CaMeL ve HLE böyle bulundu). Klasik ve dergi künyeleri için **birincil kanal
Crossref** (`api.crossref.org/works/<doi>`): başlık, dergi, cilt, sayı, sayfa, yıl ve yazar soyadları tek
çağrıda gelir. Çalışan dizinler: `roboticsproceedings.org/rss<NN>` (RSS; `pNNN.html` ve `pNNN.pdf`),
`proceedings.mlr.press/v<cilt>` (CoRL ve ICML), `papers.nips.cc/paper_files/paper/<yıl>`,
`proceedings.iclr.cc/paper_files/paper/<2024|2025>`, `aclanthology.org` (TACL ve Findings dâhil, `.pdf`
doğrudan iner), `jmlr.org/papers/v<cilt>`, `pmc.ncbi.nlm.nih.gov/articles/PMC<id>`.
**Yeni ve önemli:** **Nature artık "Client Challenge" döndürüyor** (Batch 26'da 200 dönüyordu). Çözüm PubMed
Central: DOI → PMCID çevirisi `ncbi.nlm.nih.gov/pmc/utils/idconv/v1.0/?ids=<doi>&format=json`, sonra
`pmc.ncbi.nlm.nih.gov/articles/<PMCID>/` tam metni veriyor. **ACS ve APS 403 döner** — beklenen duvar;
künye Crossref'le, özet `api.semanticscholar.org/graph/v1/paper/DOI:<doi>?fields=abstract` ile alınır
(**bu uç sık sık 429 verir; çağrılar arasına birkaç saniye koy**). `europepmc.org/webservices/rest/search`
özet için ikinci kanaldır. **`proceedings.iclr.cc` 2022 için 404 verir** ve OpenReview bot duvarındadır:
ICLR 2022 ve öncesi için bağımsız bir kanal **yok**; doğrulanamayan kalem kullanılmaz.
PDF'ler `pypdf` ile metne çevrilir; `arxiv.org/pdf/<id>` sürüm numarasız istenmeli. **Bir tuzak:** RSS
proceedings PDF'lerinin bir kısmı `pypdf` ile boş metin veriyor (π₀'ın RSS kopyası öyleydi); aynı çalışmanın
arXiv PDF'i çalışıyor ve künye yine RSS dizininden yazılıyor.

**Teknik plan — yalnızca kapsam uzatılırsa.** Yeni makaleler catalog.json'a `classificationBatch: 29` ve
`readingOrder` 119'dan kesintisiz devam ile eklenir; önce roadmap.json'a yeni faz ve `planlandi` satırları
yazılmış olmalıdır (başlık değişecekse entegrasyondan **önce**); YOL-HARITASI prerequisite grafı,
kavram-tekrar defteri, terim defteri, vaat defteri ve bağlayıcı kararlar güncellenir; doğrulama kapıları
çalıştırılır. Yeni fazın kategori ve level kararı o run'ın ilk kararıdır. **118'in son bölümü "Bu serinin bir
sonraki makalesi yok." diye bitiyor** — uzatma kararıyla bu cümle ve `/seri` `footerNote`'u da değişir.
**Sonraki bağlayıcı karar numarası #265'tir.**

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile korunur.
**Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını gezer, dolayısıyla
yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir; frontmatter'a önce 64 sıfırlık
yer tutucu hash yazmak sorun değildir. `reading_order` frontmatter'da zorunludur. Roadmap başlığı frontmatter
başlığıyla birebir eşleşmek zorundadır. **Entegrasyondan sonra makale gövdesine her dokunuşta
`sync-series-hashes.cjs --write` yeniden çalıştırılır.** SVG'nin **kendisi** hash'i etkilemez, şekil **alt
metni** etkiler. Araçların üçü de varsayılan olarak yalnızca AI serisini işler. **Yeni bir kategori klasörü
açmak kod değişikliği gerektirmez** (karar #241). Bakım düzeltmelerinde `entegre-batch` gerekmez; başlık ya
da özet değişmediyse yalnızca `sync-series-hashes.cjs --write` ve iki kapı yeter.

## Ölçer betikleri (yeniden yazılması gerekenler)

Kalıcı değiller; her run kendi scratchpad'inde yeniden yazar. Batch 27'de kullanılanlar:

- **`wc.cjs`** — `check-series-content.cjs`'in `countProseWords`'ünün **birebir kopyası**. Kaynakçayı, şekil
  sözdizimini, bağlantı hedeflerini ve liste/alıntı işaretlerini atar. **`node -e` ile taklit edilmez, dosya
  olmalı.**
- **`svgcheck.cjs`** — repo kapısının görmediği kusurlar: aynı satırdaki metin çiftlerinin çakışması
  (çarpan 0,58, pay 6 px), kutu içi metnin `x + width`'i aşması, sağ/sol kenar taşması, **alt pay ≥ 12**,
  kapanmamış `var(`, etiket dengesi. Batch 27'de beş kusur buldu (üç sağ kenar taşması, iki çakışma).
  **Not:** bütün seriye çalıştırılırsa eski makalelerde de "kusur" raporlar; **yalnızca yeni batch'in
  klasörlerine çalıştırılmalı.**
- **`scan.cjs`** — yasaklı biçimler (`gömme`, `korpus`, `geliştirme kümesi`, `niceleme`, `az/sıfır atışlı`,
  `çekişmeli`, `optimizatör`), `N\.` kaçış denetimi, **kendi numarasına gönderme**, **numaralı ileri
  gönderme**, bölüm başlıkları, kutu sayısı, şekil sayısı, alt metin kelime sayısı, parantezli gloss listesi,
  şekil başlığında parantez, **kaynakça–gövde eşleşmesi** (her künyenin ilk yazar soyadı gövdede geçmeli).
  Batch 27'de üç kalem yakaladı: iki `N\.` kaçışı **şekil alt metninde** (markdown'da liste olmuyor ama
  kayıt tutarlılığı için `47'nin` / `110'un` biçimine çevrildi) ve bir kaynakça–gövde eşleşmesi
  (Grattafiori gövdede anılmıyordu; adı eklendi).
- **`syncalt.cjs`** — markdown `alt` metnini SVG'nin `aria-label`'ına yazar. **Elle yazıldığında ayrışıyor**;
  alt metne her dokunuştan sonra yeniden çalıştırılmalı.
- **`net.py`** — `get` (indir + `<title>`), `head` (durum + uzunluk + başlık), `pdf` (indir + `pypdf` ile
  metne çevir), `crossref` (DOI künyesi), `q` (metin içi arama, düzenli ifadeyle).
- **`sweep.py`** — rota taraması, **dilimli** (40 + 40 + 37, toplam ~103 sn), `resp.geturl()` karşılaştırmalı
  ve gövde uzunluğu denetimli.
- **`shots.mjs`** — Playwright ile şekil PNG'leri; her `figure` 1.200 px'lik bir kaplayıcıya klonlanır ve
  sayfanın kendi arka plan rengiyle light/dark çekilir. **Batch 28 tuzağı:** şekil sayısı ikinci temada
  sayılırken önceki klon (`#__shot`) hâlâ DOM'da olduğu için sayı bir fazla çıkıyor ve betik `cloneNode`
  hatasıyla düşüyordu; saymadan önce klon kaldırılmalı.
- **`measure.mjs`** (Batch 28) — tarayıcı panosu yerine Playwright ile DOM ölçümü: üç genişlik × üç tema,
  yatay kaydırma, `figure` içindeki SVG'nin kabından taşması, `main` içinde taşan öge, metinde
  `undefined`/`NaN`, önceki/sonraki gezinme metni, `/seri` altbilgisi ve `/api/reader-sync` dışındaki console
  hataları. **Git Bash'te `/seri/...` gibi `/` ile başlayan argümanlar Windows yoluna çevrilir** —
  `MSYS_NO_PATHCONV=1` ile çalıştırılır ve betik dosyası göreli yolla verilir (yoksa betik yolu da bozulur).

**Yayın öncesi zorunlu taramalar.** Kapsam değişmedi: kelime sayısı, parantezli gloss listesi, yasaklı
biçimler, kendi numarası ve numaralı ileri gönderme taramaları, `N\.` kaçış denetimi, bölüm başlıkları,
"Kendini yokla" ve şekil sayısı, **kaynakça–gövde eşleşmesi**. **Şekil alt metinleri kelime sayısına
girmiyor** ve uzun alt metinler taslağı olduğundan dolu gösteriyor — Batch 23'te dört makalenin üçü,
Batch 24'te dördü, Batch 25'te üçü, Batch 26'da üçü, **Batch 27'de yine üçü** ilk turda bandın altında kaldı.
**Batch 27'nin dersi:** bant altı kalmak dolgu değil, **eksik bir bölüm** işaretidir — üç makalede de çözüm
eksik olan şeyi eklemekti (mekanizmanın sayısal örneği, hesabın kendisi, geri alma maliyetinin oranı).
SVG için **iki** kapı: `check-series-svg.cjs` (viewBox, sabit renk, yasak öge, font boyutu; genişlik tahmini
**0,55 × font-size**) ve yeniden yazılacak `svgcheck` (çarpan **0,58**, pay 6 px). **Hiçbiri hizası bozuk bir
satırı ya da yarım kalmış bir cümleyi görmez** — PNG turu bu yüzden zorunlu. **Ayrıca:** yeni bir ölçü çifti
ya da yeni bir terim kurulacaksa YOL-HARITASI terim defterinin ilgili satırları **yazımdan önce** aranmalı;
Batch 27'de bu yolla dört çakışma yakalandı ("gövde" 81'de önceden eğitilmiş ağ, "gösterim" 23'te istemdeki
örnek, "ayrıklaştırma" 27'nin kuantizasyonuyla akraba, "unutma" 19/68/56'da üç ayrı nesne).
**Ve bir koordinat ya da işaret ödenirken o konuya en yakın yayımlanmış makalenin tamamı okunmalı — komşuları
da.** Batch 27'de 111 ↔ 51/47, 112 ↔ 39/56 ve 114 ↔ 100 risk taşıyordu; üçü de okundu ve üçünde de
tekrar yerine **başka bir nesnede yeniden kurma** yapıldı.
**Şekil numaraları gövde sırasına göre artmak zorunda:** sonradan şekil eklenirken numara ve referans
cümleleri birlikte düzeltilmeli.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch 27'de de
aynı worktree'de ikinci bir üretim oturumu (BOUN serisi) eşzamanlı çalışıyordu ve **BOUN makalelerinde toplu
düzenleme yapıyordu**; bu yüzden build ana worktree'de değil izole kopyada koşuldu. Bu run 3213'ü seçti
(3114 paralel oturumundu). Kontrol yalnızca porta bakmak değil: `git status` ile başka bir serinin
dosyalarının değişip değişmediğine, `netstat` ile dinlenen portlara ve `.wolf/memory.md`'nin son satırlarına
da bakılmalı. İzole kopya düzeni:
`tar --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local
-cf - . | (cd /d/dev/anil-lib-bNN-render && tar xf -)`, junction PowerShell ile
`New-Item -ItemType Junction -Path 'D:\dev\anil-lib-bNN-render\node_modules' -Target 'D:\dev\anil-lib\node_modules'`,
kopyada `corepack pnpm build`, sonra `.claude/launch.json`'a geçici yapılandırma (Git Bash **tam yolu**,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-bNN-render && exec corepack pnpm dev -p 32NN`).
**launch.json'ı Bash ya da Python heredoc ile yazma:** `\\` çiftleri tek `\`'a iner; Write aracıyla yaz
(Git Bash'in yolu bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`).
Kopyada `.env.local` olmadığı için okuyucu kapısı kendiliğinden kapalı — **ama yalnızca `next dev`'de**;
`next start` middleware'i devreye sokar ve bütün rotalar `/login`e yönlenir. **İçerik değiştikten sonra
kopyayı `tar -cf - content docs | (cd ... && tar xf -)` ile senkronlayıp yeniden build etmek gerekiyor;**
dev sunucusu zaten derlenmiş sayfayı önbelleğe aldığı için `preview_stop` + `preview_start` da gerekebilir.
Temizlik: **önce** `preview_stop`, sonra junction `cmd //c rmdir` ile kaldırılır, ardından ana `node_modules`
doğrulanır (`node_modules/next/package.json` yerinde), sonra kopya silinir; launch.json kendi girdisinden
arındırılır. Bash aracında `cd` bir komuttan sonrakine taşınmaz — her komut `cd /d/dev/anil-lib;` ile başlar;
Python Windows'ta `/d/dev/...` yolunu tanımaz (`D:/...` verilir) ve konsola Türkçe basarken
`sys.stdout.reconfigure(encoding="utf-8")` ister. **Bash aracında uzun Python heredoc'ları hem ayrıştırma
hatası veriyor hem de bazen dosyaya hiç yazmıyor** — Batch 27'de kesme işareti içeren bir heredoc tam olarak
böyle kırıldı; uzun betikler Write aracıyla **oturum scratchpad'ine** yazılıp `python <dosya>` ile
çalıştırılmalı.

**Batch 28'de:** 121 rota 40 + 40 + 40 + 1 dilimde (~141 sn) sorunsuz; DOM ölçümü `measure.mjs` ile
(beş sayfa × üç genişlik × üç tema, sıfır sorun; 118'de yalnızca "Önceki bölüm" var); 7 şekil, 14 PNG.
**Render doğrulama seti (Batch 27'de kullanılan).** Rota sweep'i Python `urllib` ile, **dilimli**: 117 rota
40 + 40 + 37 dilim hâlinde, sunucu ayakta, toplam ~103 sn'de sorunsuz derlendi — **dilimleme kuralı
korunmalı.** Sweep betiği durum kodunun yanında `resp.geturl()`i ve gövde uzunluğunu da karşılaştırmalı.
Tarayıcı panosundan: `preview_start` → `resize_window` ile **açık genişlik/yükseklik** (1440×900, 768×1024,
375×812; `preset: "desktop"` emülasyonu **temizler**, ölçüm için kullanılmaz) → `javascript_tool` ile tema
döngüsü ve ölçüm. **Tema kök sınıftır:** açık tema sınıfsızdır, koyu `dark`, sepya `sepia`
(`documentElement.classList`). **Ölçüm betiği sayfa değiştirmemeli** — navigasyon `navigate` aracıyla
yapılır ve her sayfa için ayrı ölçüm çağrısı verilir (`browser_batch` ile zincirlenebilir; bir batch'te
üç makale × üç tema rahatça ölçülüyor). **Ölçümden önce `await new Promise(r=>setTimeout(r,2200))` koy.**
`browser_batch` içindeki JSON'da regex kaçışlarına dikkat — regex'i `new RegExp('[a-z]+[.][a-z]+[.][a-z]+','g')`
gibi köşeli parantezle kur. Ölçülen genişlikler: 1440'ta SVG 771 px (kap 808), 768'de 676 (kap 713), 375'te
351 (kap 375) — üçünde de yatay kaydırma yok, hiçbir SVG kendi `figure` kabından taşmıyor ve 111'in tablosu
kapsayıcısını aşmıyor. **Okuma listesi öbekleri `/seri`de değil `/seri/[slug]` sayfasının kenar çubuğunda
render ediliyor** — yeni kategori öbeği orada doğrulanır.
**Şekil görüntüleri Playwright'tan** (sayfada kaplayıcı div'e 1200 px klon + sayfanın kendi arka plan rengi,
light/dark PNG): 11 şekil, 22 PNG, Read aracıyla incelendi. Playwright ana worktree'de
`node_modules/@playwright/test` altındadır ve ESM betiğinden **`import "D:/..."` ile çağrılamaz**
(`ERR_UNSUPPORTED_ESM_URL_SCHEME`); `createRequire("file:///D:/dev/anil-lib/")` + `require("@playwright/test")`
kullanılmalı. `waitUntil: "networkidle"` **kullanılmaz** — okuyucu `/api/reader-sync`'i sürekli yokladığı
için ağ hiç boşalmıyor; `domcontentloaded` + sabit bekleme kullan.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. Bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı moduna düşer —
  beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur (Batch 27'de de yalnızca bu 503;
  `read_network_requests` ile kaynağı yeniden doğrulandı).
- Ham HTML'de sayfa başına "undefined" görünür; Next.js iskelesindendir. `main.innerText` ölçümünde 0'dır.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` ve genişliğe karşı yatay taşmayı yakalar; **sütuna
  binmeyi, kutudan taşmayı, yetersiz alt payı ve kapanmamış `var(` parantezini görmez.** İki ölçerin karakter
  genişliği tahmini farklıdır (0,55 ↔ 0,58).
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde görünür;
  `foundations` iki öbek (1–5, 91–102), `models-and-training` iki öbek (6–20, 103–109) ve
  `multimodal-and-future` iki öbek (81–90, 110–113). **Batch 27 kohortu da tek başına iki öbeğe
  bölünüyor** (111–113 `multimodal-and-future`, 114 `case-studies`) ve render'da doğrulandı —
  `case-studies` öbeği ilk kez görünüyor. Kasıtlıdır; `reading-list-groups.test.ts` bunu sınar.
  **Batch 28'de gözlenen:** okuyucu kenar çubuğu artık faz başlığıyla öbekliyor (2026-09-25 UX turu) —
  "Faz 14 · 0 / 9 · Sınır ve Sentez" altında 110–118 tek öbek; 115'in `case-studies` kategorisi listeyi
  bölmüyor.
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor ve rotası `/boun`.
  AI serisinin araçları o dizine dokunmaz. Build iki seriyi birden derler. **Batch 22–27 sırasında o hat
  aynı worktree'de eşzamanlı çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan
  durumdur ve çakışabilir. Batch 27'de o oturum BOUN makalelerinde toplu düzenleme yapıyordu ve 3114
  portunu tutuyordu; build bu yüzden izole kopyada koşuldu.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–27'nin üretimi (51–114) ve 2026-09-25 editoryal turu kullanıcı tarafından commit edildi
  (`8ec2fc9`). **Batch 28 (115–118, 58/71/108/1/80 düzeltmeleri, `/seri` footerNote, TRIGGER, HANDOFF,
  YOL-HARITASI) çalışma ağacında commit edilmemiş** duruyor. Commit/push kullanıcı kararıdır (SOZLESME
  kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
- **Batch 28 (2026-09-26):** Makale 115–118, **Faz 14'ün ve serinin kapanışı**: ürünün geri alınamaz kenarı →
  alanın bilmediklerinin üç türü → AGI'nin sekiz tanımı → iki kollu soru yordamı. `BATCH=4+1`; `+1` seriyi
  tamamlanmış state'e aldı (#254), TRIGGER bakım kipine geçti, `/seri` `footerNote`'u değişti. **Son
  numarasız işaret 49/53 iki okumasıyla 115'te ödendi (#255); defterde açık hiçbir şey kalmadı.** Yayımlanmış
  beş makalede künye/atıf düzeltmesi (#257). Kararlar #254–#264; sonraki numara **#265**. **53 kaynak
  kaleminin 44'ü hakemli**; CaMeL, HLE, Jones–Bergen, H-ARC, Grace ve ark., Kwa ve ark. beklenenin aksine
  hakemli çıktı. Kullanıcı ultracode ile başlattı; **iki sınırlı workflow** kullanıldı (araştırma: altı ajan;
  doğrulama: makale başına bir salt okunur ajan), yazım ve kabul ana oturumda. Doğrulama 5 BLOCKER, 32 MAJOR,
  51 MINOR buldu; hepsi karara bağlandı (Chen'in toplama hatası dahil, #258). Kapılar: `pnpm typecheck` (0),
  **764 test** (37 dosya), `pnpm build` (exit 0, `/seri/[slug]` 118 yol, izole kopyada), 121 rotanın tamamı
  200 (dört dilim), beş sayfa × üç genişlik × üç temada DOM ölçümü (sıfır sorun), 7 yeni diyagram Playwright
  ile light/dark PNG olarak alınıp gözle doğrulandı. Paralel oturum (okuma sıfırlama) aynı worktree'deydi.
- **Batch 27 (2026-09-13):** Makale 111–114, **Faz 14'ün gövdesi + serinin ilk vaka incelemesi**: gövdede
  eylem arayüzü → ürün katmanında güncelleme yolları → laboratuvarda doğrulama maliyeti → tek bütçenin
  karar zinciri. `BATCH=4+1`. **`case-studies` klasörü ilk kez açıldı (karar #241) ve kod değişikliği
  gerekmedi;** kontrollü sözlükteki yedi kategorinin tamamı artık kullanımda. 114'ün başlığı
  Türkçeleştirildi (#240: Frontier → Sınır, 70'in yayımlanmış başlığındaki yerleşik karşılık).
  **Üç işaret kapandı:** 51'in eylem arayüzü işareti 111'de (tekrar değil, gerçek kolda ödeme),
  110'un gövde devri 111'de, 39/56'nın ürün düzeyi işareti 112'de. Kararlar #240–#246; sonraki numara
  **#247**. **29 kaynak kaleminin 28'i hakemli** — serinin en yüksek oranı; π₀ beklenenin aksine hakemli
  çıktı (RSS 2025). Kapılar: `pnpm typecheck` (0), **688 test**, `pnpm build` (exit 0, `/seri/[slug]` 114
  yol, 177 statik sayfa, izole kopyada), 117 rotanın tamamı 200 (üç dilim, ~103 sn), dört makale × üç
  genişlik × üç temada DOM ölçümü (sıfır taşma), 11 yeni diyagram Playwright ile light/dark PNG olarak
  alınıp gözle doğrulandı. Nature bot duvarına geçti; PMC kanalı kuruldu. Paralel BOUN oturumu yine aynı
  worktree'deydi. Ultracode açık olmasına rağmen workflow/subagent kullanılmadı (kullanıcı talimatı).
- **Batch 26 (2026-09-12):** Makale 107–110, **Faz 13'ün kapanışı + Faz 14'ün açılışı**: dört bölme ekseni →
  çekirdek mühendisliği → koşunun operasyonu → dünya modelleri. `BATCH=4+1`. **Faz 14'ün kategorisi bölünmüş
  atamayla karara bağlandı (#233): 110–113 ve 116–118 `multimodal-and-future`, 114–115 `case-studies`.**
  109'un başlığı Türkçeleştirildi (#234). **İki borç kapandı:** 8'in doksan dokuz makale önce verdiği
  veri/model paralelliği kurulum borcu 107'de, 1'in "tarafların gerekçeleri" işareti 110'da kısmen.
  Kararlar #233–#239; sonraki numara **#240**. 24 kaynak kaleminin 22'si hakemli. **Batch 25'in eksik vaat
  defteri paragrafı bu run'da tamamlandı.** Kapılar: `pnpm typecheck` (0), **677 test**, `pnpm build`
  (exit 0, `/seri/[slug]` 110 yol, 173 statik sayfa, izole kopyada), 111 rotanın tamamı 200 (üç dilim,
  ~91 sn), dört makale × üç genişlik × üç temada DOM ölçümü, 12 yeni diyagram Playwright ile light/dark PNG
  olarak alınıp gözle doğrulandı. Paralel BOUN oturumu yine aynı worktree'deydi. Ultracode açık olmasına
  rağmen workflow/subagent kullanılmadı (kullanıcı talimatı).
- **Batch 25 (2026-09-11/12):** Makale 103–106, **Faz 12'nin tamamı + Faz 13'ün açılışı**: mikro-GPT'yi elle
  kurmak → kendi eğitim koşusu → kendi asistanı → GPU zihinsel modeli. **İki kategori kararı birden verildi
  ve ikisi de `models-and-training` çıktı (#225).** Faz 12'nin üç makalesi büyük ölçüde **kendi ölçümümüz**:
  saf Python'da 364 parametreli bir Transformer. **Metodolojik ders iki kez tekrarlandı:** tek tohumla yanlış
  çıkan iki tablo çok tohumlu turda değişti. Kararlar #225–#232. 661 test.
- **Batch 24 (2026-09-11):** Makale 99–102, **Faz 11'in kapanışı**. **101 koordinatı ödendi ve defterde açık
  numaralı koordinat kalmadı.** Kararlar #217–#224. 642 test. OpenReview API'si kapandı.
- **Batch 23 (2026-09-10):** Makale 95–98, **Faz 10'un kapanışı + Faz 11'in açılışı**. Faz 11 `foundations`
  (#209). Kararlar #209–#216. 624 test.
- **Batch 22 (2026-09-10):** Makale 91–94, **Faz 10'un açılışı**. Kategori `foundations` (#200), level
  `advanced`e geçti (#201). 605 test. Paralel bir BOUN oturumu `artifacts/` altını sildi (#208g).
- **Batch 21 (2026-09-10):** Makale 87–90, **Faz 9'un kapanışı**. 587 test.
- **Batch 20 (2026-09-09):** Makale 83–86, **Faz 9'un gövdesi**. İki bağlayıcı koordinat birden kapandı. 575 test.
- **Batch 19 (2026-09-09):** Makale 79–82; Faz 8 kapandı, Faz 9 açıldı (#176). 563 test.
- **Batch 18 (2026-09-09):** Makale 75–78. DBLP kapandı (#175). 551 test.
- **Batch 17 (2026-09-06):** Makale 71–74, Faz 8'in açılışı (#160). 519 test.
- **Batch 16 (2026-09-06):** Makale 67–70, Faz 7'nin kapanışı. 507 test.
- **Batch 15 (2026-09-05):** Makale 63–66. 495 test.
- **Batch 14 (2026-09-05):** Makale 59–62: Faz 6'nın kapanışı + Faz 7'nin açılışı (#142). 482 test.
- **Batch 13 (2026-09-05):** Makale 55–58. 470 test.
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı (#128). 458 test.
- **Batch 11 (2026-09-03/04):** Makale 47–50, Faz 5'in kapanışı. 446 test.
- **Batch 10 (2026-09-02/03):** Makale 43–46. 431 test.
- **Batch 9 (2026-09-02):** Makale 39–42; Faz 4 kapandı, Faz 5 açıldı (#107). 419 test.
- **Batch 8 (2026-09-01):** Makale 35–38. 294 test.
- **Batch 7 (2026-08-30):** Makale 31–34. 277 test. İzole render kopyası ilk kez kullanıldı.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 29 `agents-and-retrieval` (#65). 259 test.
- **Batch 5 (2026-08-30):** Makale 23–26. 241 test.
- **Batch 4 (2026-08-29):** Makale 19–22; Faz 2 kapandı, Faz 3 açıldı (#50). 223 test.
- **Batch 3 (2026-08-29):** Makale 15–18. 208 test.
- **Batch 2 (2026-08-29):** Makale 11–14, serinin ilk `intermediate` kohortu. 191 test.
- **Batch 1 (2026-08-26/27):** Makale 6–10. İnceleme turu 20 BLOCKER + ~40 MAJOR buldu.
- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı aynı görevde kuruldu.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak durur.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
