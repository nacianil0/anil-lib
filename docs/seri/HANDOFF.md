# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-25 · Durum: **1–114 yayında (kohort Batch 0 → Batch 27) · 2026-09-25 editoryal yenileme turu tamamlandı (bkz. aşağıdaki bölüm) · Sıradaki: 115 (ikinci vaka incelemesi) + 116–118'in açılışı**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 114 — `vaka-incelemesi-bir-sinir-model-nasil-yapilir` |
| Sıradaki güvenli başlangıç | Makale 115 ("Vaka İncelemesi: Bir LLM Ürünü Nasıl Kurulur?"); run kapsamı SOZLESME §7'ye göre çözülür. `BATCH=4+1` ile 115, 116, 117 ve 118 üretilir — **bu, fazın ve büyük ihtimalle serinin kapanış dörtlüsüdür; bkz. "Sıradaki run'ın kararları".** **Bu run'da kategori sorusu YOKTUR** — karar #233 Faz 14'ün tamamını bağladı: **115 `case-studies`, 116–118 `multimodal-and-future`**. **Bağlayıcı numaralı koordinat YOKTUR.** Devrolan numarasız işaret: **49/53 → 115**. Devrolan planlı tekrar **yok** |
| Sıradaki kohort | `classification_batch: 28` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu). **BOUN serisi `/boun` altındadır, `/seri-boun` değil** |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs`. **Batch 27'nin ek ölçerleri oturum scratchpad'indeydi ve kalıcı değil** (bilerek; bkz. Açık borçlar). Yeniden yazılması gerekenler "Ölçer betikleri" bölümünde |
| Level bandı | 1–10 `beginner`; 11–90 `intermediate`; **91'den itibaren `advanced`** (kararlar #19, #201) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–60 `agents-and-retrieval`; 61–80 `safety-and-evaluation`; 81–90 `multimodal-and-future`; 91–102 `foundations`; 103–109 `models-and-training`; 110–113 ve 116–118 `multimodal-and-future`; **114–115 `case-studies`** (kararlar #50, #65, #85, #98, #107, #122, #128, #135, #142, #148, #160, #168, #176, #192, #200, #209, #219, #225, #233). **`case-studies` klasörü Batch 27'de açıldı ve kod değişikliği gerekmedi (karar #241); kontrollü sözlükteki yedi kategorinin tamamı artık kullanımda.** Okuma listesinde Batch 27 kohortu iki öbeğe bölünüyor (111–113 `multimodal-and-future`, 114 `case-studies`) ve render'da doğrulandı; `reading-list-groups.test.ts` çalıştırıldı ve geçti |

## Editoryal yenileme turu (2026-09-25) — kararlar #247–#253

Kullanıcının açık talebiyle 1–114'ün **tamamı** gerçek gövdeleri, şekilleri ve kaynaklarıyla
yeniden okundu; düzeltmeler uygulandı ve kalıcı kurallar SOZLESME v2.2'ye yazıldı. Yöntem: faz
başına bir denetim ajanı (AI'da 12 küme) okudu, gerekli yerde doğruladı ve düzeltti; kabul ana
oturumda diff üzerinden verildi; kalan slogan kalıpları tek bir üslup ajanıyla temizlendi.
Cursor değişmedi: sıradaki üretim yine 115'tir.

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

## Sıradaki run'ın kararları

**Kategori kararı yok.** Karar #233 Faz 14'ün tamamını bağladı ve 115–118 o kararın kapsamındadır.
Verilecek karar sınıfları: çıkarsa **terim** ve **başlık** kararları; ve bir tane daha büyüğü —
**serinin kapanışı.** 118 yol haritasındaki son başlıktır. Onun yayımlanmasıyla seri, SOZLESME §7'nin
tanımladığı "roadmap'te kalan makale sayısı `N`'den az" durumuna değil, **kalan makale kalmaması**
durumuna geçer; `+1` fazında seri "tamamlanmış / yeniden planlama gerektirir" state'ine alınmalıdır.
Yeni başlık icat edilmez; kapsamın uzatılıp uzatılmayacağı **kullanıcı kararıdır** ve HANDOFF'a soru
olarak değil, state olarak yazılır. **Sonraki bağlayıcı karar numarası #254'tür** (#247–#253 editoryal
yenileme turunda kullanıldı). 115–118 yazılırken SOZLESME v2.2'nin yeni hükümleri bağlayıcıdır:
§3 "Formül katmanlama", §4 kaynak koşulu ve tarihleme, §6 şekil tabanı 1 ve tablo–şekil tekrarı
yasağı, §11 "Anlam önce" ve yazan model için on soru, §12 revizyon işareti (yeni yazıya işaret
konmaz). `check-series-content.cjs` artık kalıp listesini, ondalık ekini ve okura sızan üretim dilini
reddeder.

## Açık borçlar

- **Araştırma ve ölçüm çalışma dizinleri kalıcı değil — bu bilinçli.** Batch 22'de paralel bir oturum
  `artifacts/` altını sildiği için (karar #208g), Batch 23–27 `artifacts/` altına **hiçbir şey yazmadı**;
  bütün kaynak metinleri, PDF'ler ve ölçer betikleri oturum scratchpad'inde kaldı. Sonraki run kendi
  betiklerini yeniden yazmak zorunda. **Batch 27 sırasında paralel BOUN oturumu aynı worktree'de
  çalışıyordu** ve `content/series-boun/**` ile `.wolf/*` altına toplu düzenleme yapıyordu; 3114 portu
  onundu, bu run 3213'ü seçti.
- **Mikro-GPT'nin kodu kalıcı değil ama şartnamesi bağlayıcı (karar #226).** 103–105'in bütün sayıları saf
  Python'da yazılmış, skaler ters-mod otomatik türevli ~120 satırlık bir uygulamadan çıktı. Kod repoda
  değil. **118 mikro modele atıfta bulunacaksa şartnameyi yeniden uygulamak zorunda**: sözlük 7, bağlam 4,
  vektör boyu 4, 2 baş × 2, ileri besleme 8, 2 blok, ön-katman normalleştirme, GELU, bağlanmış çıktı →
  364 parametre. Geniş sürüm: vektör boyu 8, ileri besleme 16 → 1.240 parametre.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları hâlâ İngilizce alan
  terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning ve Test-Time
  Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim defterine göre
  Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121, #135, #148, #154, #155, #162,
  #163, #169, #170, #171, #177, #178, #184, #185, #202, #210, #217, #218, #227, #234, **#240**). Katmanın
  tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır. Faz 8–14'ün başlıkları zaten Türkçe.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler — sıradaki dörtlüde aday YOK.** 115'in başlığındaki
  "LLM" seride yerleşik bir kısaltmadır ve yayımlanmış bir başlıkta zaten geçer ("Uçta Yapay Zekâ: Telefonda
  ve Cihazda LLM"); 116, 117 ve 118'in başlıkları Türkçedir ("AGI" bir özel kısaltmadır ve 117'nin konusudur).
  **114'ün "Frontier"ı Batch 27'de Türkçeleştirildi (karar #240) ve bant temizlendi.**
- **Yayımlanmış numaralı vaatler: DEFTER TEMİZ.** Bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir ve **Batch 27'den sonra da açık numaralı koordinat yoktur** — 111–114'ün hiçbiri numaralı
  ileri gönderme yapmadı (makale başına mekanik olarak tarandı). **Batch 27 üç işareti kapattı:** 51'in eylem
  arayüzü işareti 111'de, 110'un gövde devri 111'de, 39/56'nın ürün düzeyi işareti 112'de. Kalan tek numarasız
  işaret: **49/53 → 115** (araç/sunucu güvenilirliği ve ürün katmanı). **Devrolan planlı tekrar yok.**
- **Prerequisite grafında 79–82 boşluğu.** YOL-HARITASI'ndaki graf satırları 78'de kesilip 83'ten devam
  ediyor; Batch 19 kendi dörtlüsünün satırlarını eklememişti. Batch 20–27 kendi satırlarını ekledi.
  Devrolan eksik; ileride toplu kapatılabilir, hiçbir kapı buna bağlı değil.
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
  #106, #114, #120, #127, #134, #141, #147, #152, #159, #167, #175, #183). **Batch 20–27'de doğrulanamayan
  künye yok** (kararlar #191, #198, #207, #216, #224, #232, #239, **#246**). Tek kısmi kalem: Gundersen–Kjensmo'nun
  bitiş sayfası doğrulanamadı.
- **Hakemsiz kaynak oranı Batch 27'de 29 kalemin 1'i (karar #246)** — yalnızca Llama 3 raporu, 8\. makaleden
  devralınan ve işaretlenmiş kalem. Serinin en yüksek hakemli oranı. **Faz 14'ün kalanında profil yeniden
  değişecek:** 115 ürün/sistem literatürüne (hakemli mecra bol), **116 ve 117 ise konum yazılarına ve
  tanım tartışmalarına** dayanacağı için hakemsiz oranı orada yükselecek ve SOZLESME §4'ün işaretleme
  kuralı sık sık uygulanacak.
- **DBLP kapalı (Batch 18'den beri), OpenReview bot duvarında, Nature bot duvarına geçti, `proceedings.iclr.cc`
  2022 için 404.** Çalışan kanallar aşağıda "Venue doğrulaması" bölümünde.

## Next batch preparation — 115'ten devam (Faz 14'ün kapanışı ve serinin sonu)

**Pedagojik hedefler.** Batch 27'nin sonunda okuyucu şunu biliyor: bir gövdede eylem arayüzü iki sayıya iner
(256 kutu, saniyede üç karar) ve arayüzün yasakladığı şey modelin hatası gibi görünür; internetten gelen ön
eğitim eylemin anlamsal yarısını taşır, motor yarısını taşımaz (görülmüş görevlerde 92 ↔ 91, görülmemişte
32 ↔ 62, sıfırdan başlatılınca %0 ve %1); gövde verisi kıt çünkü metin bir yan ürün, yörünge değil — 111.
Bir modeli güncel tutmanın dört yolu var ve en "temiz" görüneninin faturası en gizlisi: rank-bir güncelleme
`k*`'ye dik olan her şeye dokunmaz, bu yüzden hem ilgisizi korur (100) hem sonucu taşımaz (20,2); sıralı
düzenleme 100–1.000 arasında bir yerde çöker ve tek bir düzenleme modeli bitirebilir — 112. Bir bilimde yapay
zekânın işe yaramasını belirleyen şey modelin gücü değil, üretmek ile doğrulamak arasındaki oran; doğrulama
kör ve hazırsa ortanca 0,96 Å, bir kimyagerin aylarını alıyorsa hakemli iki itiraz — 113. Ve bir sınır model
bir kararlar zinciridir; maliyetin dağılımı ile geri alınamazlığın dağılımı ters: post-training hesabın
%1,78'ini tutup 1,3 milyarı 175 milyara tercih ettiriyor — 114.

**Sıradaki makaleler ve prerequisite'ler.** 115 ikinci vaka incelemesi, 116–118 serinin kapanış yayı.
**115 ← 114** ("bir sonraki makale" devri: aynı disiplin masanın öbür tarafında), **41–60 (getirme ve ajan
katmanlarının tamamı)**, **49 ve 53 (DİKKAT: NUMARASIZ İŞARET — sunucu adı çakışması, kurulumdan sonra
davranış değiştiren sunucu, yalıtımdan kaçış ve tartışmanın denetim için kullanımı; 115 bunları ürün
zincirinde ödemeli)**, 26–28 (çıkarım ekonomisi), 56 ve 112 (bellek ve güncelleme kararı ürün katmanında),
59–60 (devir, maliyet, güvenilirlik), 58 (istem enjeksiyonu bir ürün kararıdır), 102 ve 80 (belgeleme).
**116 ← 110 (ölçütün kendisi), 113 (alanın kendi itirazları), 78 (beliren yetenekler tartışmasının açıklığı),
96–97 (kuramın sınırı), 71–73 (ölçemediğimiz şeyler)**; **116 bir envanterdir ve tezi "neyi bilmediğimizi
nereden biliyoruz" olmalı.**
**117 ← 1 (tanım sorusunun ilk hâli), 110 (dünya modeli ölçütü), 78 (beliren yetenekler), 40 (görev ufku:
zaman çizelgesi tartışmasının tek ölçülebilir ekseni), 16/71 (ölçütün geçerliliği), 61 (hizalama)**;
**117'nin işi kavramsal temizliktir, kehanet değil — SOZLESME §4'ün iki taraf kuralı burada en sert
uygulanacak yerdir.**
**118 ← bütün seri**; ama **100 ve 114 ile çakışma riski en yüksek makale budur: 100 harita, 114 zincir,
118 ne olmalı?** Öneri: okuyucunun kendi yol haritası — araştırmacı ve mühendis olarak bundan sonra ne
okuyacağı, hangi refleksi taşıyacağı ve serinin ona bıraktığı ölçme disiplini. **Yeni ölçüm eklenmemeli
(karar #220'nin biçimi).**

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Getirme hattı ve ajan döngüsü (41–60), 49/53'ün numarasız işareti, çıkarım ekonomisi (26–28) → 115.
- Ölçütün kırıldığı yerler (71–73), kuramın sınırı (96–97), dünya modeli ölçütü (110) → 116.
- Tanım tartışması (1), görev ufku (40), beliren yetenekler (78) → 117.
- Serinin tek refleksi ve terim çakışmaları (100'ün biçimi, **kopyası değil**) → 118.

**Araştırılacak güncel akademik alanlar.** **115:** ürün katmanı literatürü — getirme hattının üretimdeki
ölçümü, önbellek ve maliyet (hakemli mecra bol: EMNLP/ACL sistem bildirileri, NSDI, OSDI, SoCC), ajan
güvenilirliği ve insan devri. **116:** açık sorular envanteri; konum yazıları ve derlemeler ağırlıklı —
**hakemsiz oran yükselecek, her kalem işaretlenmeli**; mümkün olan yerde hakemli derleme (Nature, Science,
JMLR, CACM) tercih edilmeli. **117:** AGI tanımları ve zaman çizelgeleri — tanım çalışmaları, uzman anketleri
(hakemli olanlar var), ve **iki tarafın ölçümü zorunlu**; kehanet alıntısı yasak, ölçülebilir eksen 40'ın
görev ufkudur. **118:** yeni kaynak ihtiyacı **çok düşük**; serinin kendi sayıları yeterli.
**Sayısal iddialar ve URL doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir;** süreç kuralları
SOZLESME §9'dadır.

**Görselleştirme ihtiyaçları (öngörü):**
- 115: ürün zincirinin kararları ve her birinin geri alma maliyeti — **114'ün tablosunun kopyası olmamalı**;
  114 üretim tarafıydı, 115 kullanım tarafı ve orada geri alınamazlık başka yerde toplanıyor.
- 116: bilinmeyenin türleri — ölçülemeyen, ölçülüp anlaşılmayan, tartışmalı; her satırda "kanıt ne olurdu".
- 117: aynı sözcüğün kaç ayrı tanımı olduğu ve her tanımın hangi sınavı gerektirdiği.
- 118: okuyucunun kendi yolu; **100'ün kavram haritası ve 114'ün karar zinciri ile üçüncü bir biçim olmalı.**
- **Uyarı (kararlar #214, #223, #231, #238, #245):** bu fazda da ölçülmemiş eğri çizilmemeli. Batch 27'nin on
  bir şeklinin **tamamı** tablo ya da blok listesiydi ve hiçbirinde eksen yoktu; aynı çizgi sürdürülmeli.

**Venue doğrulaması — Batch 27'nin çalışan kanalları.** Klasik ve dergi künyeleri için **birincil kanal
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

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 28` ve `readingOrder` 115'ten
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir (başlık
değişecekse entegrasyondan **önce**); YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri,
vaat defteri ve bağlayıcı kararlar güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni
cursor ve **serinin tamamlanmış state'iyle** güncellenir. **Kategori kararı yok (#233).** **Level `advanced`
kalır** (karar #201). **Sonraki bağlayıcı karar numarası #247'dir.**

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
açmak kod değişikliği gerektirmez** (karar #241) — ama `case-studies` artık açık olduğu için 115'te bu adım
da yok.

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
  sayfanın kendi arka plan rengiyle light/dark çekilir.

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
- Repoda ikinci bir seri (`content/series-boun/**`) ayrı bir üretim hattıyla ilerliyor ve rotası `/boun`.
  AI serisinin araçları o dizine dokunmaz. Build iki seriyi birden derler. **Batch 22–27 sırasında o hat
  aynı worktree'de eşzamanlı çalışıyordu**; `artifacts/`, `.claude/launch.json` ve `.wolf/*` paylaşılan
  durumdur ve çakışabilir. Batch 27'de o oturum BOUN makalelerinde toplu düzenleme yapıyordu ve 3114
  portunu tutuyordu; build bu yüzden izole kopyada koşuldu.
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor (`Karar`, `her`, `Yaşayan`, `yapılırsa`,
  `**Bu`, `**zorundadır**.`). Build'i etkilemiyor; temizlik AI serisinin kapsamı dışıdır.
- Batch 12–25'in üretimi (51–106) kullanıcı tarafından commit edildi. **Batch 26 (107–110) ve Batch 27
  (111–114) çalışma ağacında commit edilmemiş** duruyor. Commit/push kullanıcı kararıdır (SOZLESME
  kapsamı dışı).

## Non-normative history (tarihsel kayıt; aktif komut değildir)
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
