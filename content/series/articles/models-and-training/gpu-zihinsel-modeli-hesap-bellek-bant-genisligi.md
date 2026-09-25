---
article_id: article_e6f42bd9-3589-452b-bf23-1344d9c9500e
title: "GPU Zihinsel Modeli: Hesap, Bellek, Bant Genişliği"
slug: gpu-zihinsel-modeli-hesap-bellek-bant-genisligi
category: models-and-training
level: advanced
reading_order: 106
summary: "Bir eğitim adımının üç defterini kurar: parametre başına 16 baytlık eğitim durumu, katman başına sbh(34+5as/h) baytlık aktivasyonlar ve bellek merdiveninin bant genişliği. 89. makalenin çatı çizgisini eğitim tarafına taşır ve aynı çipin neden çıkarımda beklediğini, eğitimde hesap yaptığını gösterir."
tags:
  - egitim-sistemleri
  - bellek-hiyerarsisi
  - aktivasyon-bellegi
  - yeniden-hesaplama
  - kullanim-orani
content_hash: sha256:effdd6c35e24afe9d420deb1f4c35813874980b3f44ae210460a8796e9167095
classification_version: 1
classification_batch: 25
revised_at: "2026-09-25"
revision_note: "Aktivasyon formülündeki 34'ün kalemleri tek tek açıldı; tekrarlanan tablo-şekil kaldırıldı, sırt noktası tablosu bir çatı çizgisi grafiğiyle yeniden çizildi."
---
## Dizüstü bilgisayardan veri merkezine

Son üç makalede 364 parametreli bir modeli kurduk, eğittik ve hizaladık. Bütün koşu tek bir dizüstü bilgisayarda, saniyeler içinde bitti; kaynak diye bir sorun hiç çıkmadı. Bu fazın ilk cümlesi bunun tersini söylüyor: ölçek büyüdüğünde kaynak **tek** sorun hâline geliyor.

Manzarayı 89\. makalede çizmiştik. Samuel Williams, Andrew Waterman ve David Patterson'ın çatı çizgisi modelini kurmuş, işlem yoğunluğunu — ana bellekten okunan bayt başına yapılan işlem sayısını — tanımlamış ve bir hesabın sırt noktasının hangi yanında durduğuna bakmayı öğrenmiştik. 26 ve 28\. makalelerde aynı muhasebeyi çıkarım tarafında yapmıştık: ön dolum hesapla, adım adım üretim bellek bant genişliğiyle sınırlı. O makale kapanırken Faz 13'e bir randevu bırakmıştı ve randevu bu.

Bu makale aracı yeniden kurmuyor; onu **eğitim adımına** uyguluyor. Soru şu: bir eğitim adımı çipin neyini tüketiyor, o tüketim hangi defterlere yazılıyor ve bir koşu tıkandığında hangi defterin dolduğunu nereden anlarız? Üç defter var — bellek, bant genişliği, hesap — ve bu makale üçünü de sayılarla dolduruyor. Bir uyarı: buradaki "bellek" 39\. makalede ayırdığımız iki anlamdan donanım olanıdır, sohbette biriken bilgi değil.

## Bellek merdiveni

Bir hızlandırıcıda tek bir bellek yok; boyu ve hızı ters yönde değişen bir merdiven var. 25\. makalede FlashAttention'ı anlatırken bu farkı sözle söylemiştik: çipin hesap yaptığı küçük ve hızlı belleğiyle verinin durduğu büyük ve yavaş belleği arasında ciddi bir hız farkı var. Şimdi sayıları koyalım; Tri Dao ve arkadaşlarının aynı çalışması bunları doğrudan veriyor.

| Katman | Bant genişliği | Kapasite | Ne durur |
|---|---|---|---|
| Çip içi SRAM | ~19 TB/s | 20 MB | o anda hesaplanan küçük parça |
| Kart belleği (HBM) | ~1,5 TB/s | 40 GB | modelin kendisi |
| Ana bellek (DRAM) | ~12,8 GB/s | 1 TB'dan fazla | karta sığmayanlar |

Çalışmanın verdiği ayrıntı merdivenin biçimini gösteriyor: A100 kartında 108 hesap biriminin her birinde 192 KB'lık bir çip içi bellek var ve toplamı 20 MB ediyor. Basamaklar arasındaki oranları biz çıkaralım: SRAM, HBM'den yaklaşık 12,7 kat hızlı ama 2.000 kat küçük; HBM de ana bellekten 117 kat hızlı. Yani her basamakta hız düşerken kapasite artıyor, ve iki eğri hiçbir yerde kesişmiyor.

Buradan çıkan kural tek cümle: **bir hesabın hızını, verinin hangi basamakta durduğu belirler.** Aynı çarpma, verisi SRAM'de ise HBM'dekinin on iki katı hızda yapılır; ama SRAM'e 20 MB sığar ve 8 milyar parametreli bir modelin ağırlıkları 16 GB tutar. 86\. makalede FlashAttention'ın yaptığı işin özü buydu: dev ara matrisi HBM'e hiç yazmayıp işi SRAM'e sığacak parçalara bölmek. Tablonun son sütunu bu yüzden okunmaya değer: merdivende yukarı çıktıkça hız artıyor ama sığan şey küçülüyor.

## Bir eğitim adımının bellek defteri

Şimdi ilk deftere geçelim. Naif hesap şöyle işler: 8 milyar parametreli bir model, 16 bitlik sayılarla 16 GB tutar; 80 GB'lık bir kart rahat alır. Bu hesap yanlış ve neden yanlış olduğunu Samyam Rajbhandari ve arkadaşlarının SC 2020'de sunduğu çalışma kalem kalem yazar — 89\. makalede eğitim durumunu kartlara bölen çalışma olarak anmıştık, burada o durumun **içine** bakıyoruz.

Karma hassasiyetli eğitimde, 89\. makalede Micikevicius ve arkadaşlarından aktardığımız düzende, bir parametre başına şunlar tutulur: 16 bitlik ağırlık 2 bayt, 16 bitlik gradyan 2 bayt, ve eniyileyicinin kendi durumu (optimizer state) için 32 bitlik ağırlık kopyası, momentum ve yayılım, yani 4 + 4 + 4 = 12 bayt. Toplam **parametre başına 16 bayt**. Çalışmanın kendi örneği farkın büyüklüğünü gösteriyor: 1,5 milyar parametreli GPT-2 için bu 24 GB eder, oysa yalnız 16 bitlik ağırlıkları tutmak 3 GB'lık mütevazı bir yer ister.

Son üç bileşen 95\. makalede kurduğumuz AdamW'nin ta kendisi: momentum ve yayılım, her parametre için ayrı ayrı saklanan iki geçmiş. 95\. makalede "her yöne kendi adımı" demiştik; o adımın bedeli burada, parametre başına sekiz fazladan bayt olarak görünüyor.

Oranları biz çıkaralım. 8 milyar parametre 128 GB eder — 80 GB'lık tek bir karta **sığmaz**. 70 milyar 1.120 GB, 405 milyar 6.480 GB eder; sonuncusu, yalnızca durumu tutmak için en az 81 kart demek. Ters yönden okuyalım: 80 GB'lık bir kartın alabileceği en büyük model 80 ÷ 16 = 5 milyar parametredir, ve bu sayı henüz tek bir aktivasyon saklanmadan önceki sınırdır.

> **Kendini yokla:** Aynı modeli eğitmek yerine yalnız çalıştırmak isteseydin bellek ihtiyacı ne olurdu?

16 bit ağırlıklar yeterdi, yani parametre başına 2 bayt. Gradyan yok, çünkü geri geçiş yok; eniyileyici durumu yok, çünkü güncelleme yok. 8 milyar parametre 128 GB yerine 16 GB tutardı — sekizde biri. Eğitimin çıkarımdan pahalı olmasının ilk sebebi hesap değil, saklanması gereken şeyler.

## Aktivasyonlar: defterin görünmeyen yarısı

İkinci defter daha sinsi, çünkü parametre sayısına değil **yığına ve dizi uzunluğuna** bağlı. Geri geçişin her ara değeri hesaplayabilmesi için ileri geçişte üretilen ara sonuçların saklanması gerekir; bunlara aktivasyon belleği (activation memory) diyoruz.

Bu defteri saymanın mantığı basit. Geri geçiş, bir matris çarpımının gradyanını hesaplamak için o çarpımın **girdisini** ister; dolayısıyla ileri geçişte her çarpımın girdisi bir kenara konur. Bir katmandan geçen dizilim, dizi uzunluğu *s*, yığın *b* ve vektör boyu *h* olmak üzere `s·b·h` sayıdır ve 16 bitte `2·s·b·h` bayt tutar. Defter, bu büyüklükte kaç kopyanın saklandığını saymaktan ibaret.

Vijay Korthikanti ve arkadaşlarının MLSys 2023'te sunduğu çalışma bu sayımı kalem kalem yapıp tek bir formülde topluyor: *a* baş sayısı olmak üzere bir Transformer katmanının aktivasyonları `s·b·h·(34 + 5as/h)` bayt tutar. 34, `s·b·h` boyundaki sıradan kopyaların toplamı. Dikkat bloğu 11 getiriyor: sorgu, anahtar ve değer çarpımlarının ortak girdisi 2, sorgu ile anahtarın kendileri 4, değerler 2, çıkış izdüşümünün girdisi 2, seyreltme (dropout) maskesi 1. İleri beslemeli blok 19 getiriyor: ilk çarpımın girdisi 2, dört kat genişleyen ara katmanda etkinleştirmenin girdisi ile ikinci çarpımın girdisi 8'er, seyreltme maskesi 1. İki katman normalleştirmesinin girdileri de 4. Maskeler eleman başına bir bayt tuttuğu için 1'le, öbürleri 16 bit oldukları için 2'yle sayılıyor. `5as/h` ise dikkat skorlarının payı: her baş için `s × s` büyüklüğünde bir skor matrisi saklanıyor, bu yüzden bu terim dizi uzunluğunun karesiyle büyüyor.

Sayı koyalım. Yazarların kendi örneğinde GPT-3 için *a* = 96, *s* = 2.048, *h* = 12.288 ve `5as/h` = 80. Yani katsayı 34 değil 114 ve payın yüzde 70'i tek bir ara matristen geliyor. Kalanını biz hesaplayalım: mikro yığın 1 için katman başına 2.048 × 1 × 12.288 × 114 = 2,87 GB, doksan altı katman için **275 GB**. Mikro yığın bir iken. 7\. makalede karesel maliyeti bir hesap sorunu olarak görmüştük; burada aynı kare bir bellek sorunu olarak karşımıza çıkıyor.

![Altı satırlık üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: bir eğitim adımının bellek defteri. Sütunlar kalem, parametre başına bayt ve 8 milyar parametredeki karşılığı. Birinci satır 16 bitlik ağırlık: 2 bayt, 16 GB. İkinci satır 16 bitlik gradyan: 2 bayt, 16 GB. Üçüncü satır 32 bitlik ağırlık kopyası: 4 bayt, 32 GB. Dördüncü satır momentum: 4 bayt, 32 GB. Beşinci satır yayılım: 4 bayt, 32 GB. Altıncı satır toplam vurguludur: 16 bayt, 128 GB. Birinci kutuda sınır durur: 80 gigabaytlık bir kartın alabileceği en büyük model 5 milyar parametredir ve bu sınır henüz tek bir aktivasyon saklanmadan öncedir; 405 milyar parametrelik bir modelin durumu 6.480 gigabayt, yani en az 81 kart eder. İkinci kutuda aktivasyonlar durur: katman başına s çarpı b çarpı h çarpı parantez içinde 34 artı 5as bölü h bayt; GPT-3'ün ölçüleriyle parantez içi 114'tür ve mikro yığın bir iken katman başına 2,87 gigabayt, doksan altı katman için 275 gigabayt eder. En altta bir kayıt: bayt başı muhasebe Rajbhandari ve arkadaşlarından, formül Korthikanti ve arkadaşlarından, çarpımlar bizimdir.](assets/egitim-bellek-defteri.svg "Şekil 1 — Parametre başına on altı bayt ve fazlası")

Şekil 1'in alt kutusu defterin neden iki yarısı olduğunu söylüyor: üst yarı model büyüdükçe büyür, alt yarı yığın ve dizi büyüdükçe. İkisi aynı karta sığmak zorunda.

## Belleği zamanla satın almak

Ölçek büyüdükçe bu defterin ağırlığı da değişiyor. ZeRO çalışmasının verdiği örnekte 1,5 milyar parametreli GPT-2, dizi uzunluğu 1.024 ve yığın 32 ile eğitildiğinde aktivasyonlar yaklaşık 60 GB tutuyor — aynı modelin bütün eğitim durumu 24 GB iken. Yani bu boyutta aktivasyonlar modelin kendisinden iki buçuk kat fazla yer istiyor. Yüz milyar parametreli bir modelde ise aynı yığınla, birazdan geleceğimiz önlem alındıktan **sonra** bile 60 GB gerekiyor.

Aktivasyon defteri kapanmıyorsa bilinen bir takas var: ara değerleri saklamak yerine geri geçişte **yeniden hesaplamak**. Adlandırmada bir tuzak var ve baştan açalım — alan yazını buna çoğu zaman "activation checkpointing" diyor, ama bu 8\. makaledeki kontrol noktasıyla aynı şey değildir. Orada koşuyu kaldığı yerden sürdürmek için diske yazılan bir kopya vardı; burada bellekte tutulmayıp yeniden üretilen ara değerler var. Biz ikincisine **aktivasyonları yeniden hesaplama** diyoruz.

Bedeli ne? Yaygın rakam, aktivasyon belleğinin yaklaşık kareköke inmesi karşılığında yüzde 33 ek hesap. Korthikanti ve arkadaşları bunu doğrudan ölçmüş ve 22 milyar parametreli bir modelin tek bir katmanı için şu süreleri bildirmiş: taban durumda ileri geçiş 7,7 ms, geri geçiş 11,9 ms, toplam 19,6 ms. Bütün aktivasyonlar yeniden hesaplandığında ileri geçiş değişmiyor, geri geçiş 19,5 ms'ye çıkıyor ve toplam 27,2 ms oluyor. Farkı biz çıkaralım: yüzde 39. Yani folklorik yüzde 33 iyimser bir yuvarlama; ölçülen bedel daha yüksek.

Aynı çalışmanın önerdiği seçici sürümde — ucuz olanı sakla, pahalı olanı yeniden hesapla — toplam 20,9 ms'de kalıyor, yani ek maliyet yüzde 7. Bu kazancın da bir bedeli var: hangi ara değerin saklanacağı elle yapılmış bir arama sonucudur ve yazarlar bunu açıkça söyler.

Kazanç tarafı da ölçülmüş. ZeRO çalışmasının örneğinde yeniden hesaplama, 1,5 milyar parametreli modelin 60 GB'lık aktivasyon defterini yaklaşık 8 GB'a indiriyor — yedi buçuk kat. Korthikanti ve arkadaşlarının seçici sürümü ise bunun yerine yaklaşık beş kat indirim sağlıyor ve yeniden hesaplamanın süre maliyetinin yüzde doksanından fazlasını ortadan kaldırıyor. İki uç arasında seçim yapmak, "belleğim mi dar, sürem mi" sorusuna verilen bir cevaptır ve her koşuda yeniden verilir.

Bir okuma notu daha: geri geçişin ileri geçişe oranı taban durumda 11,9 ÷ 7,7 = 1,55, yeniden hesapla 19,5 ÷ 7,7 = 2,53. 8\. makalede kaba kuralı kurarken "geri geçiş ileri geçişin iki katıdır" demiştik; ölçülen değer 1,55 ile 2,53 arasında, yani kural doğru mertebede ama gerçek sayı hangi düzeneği kullandığına bağlı.

## Aynı çip, sırt noktasının iki yanı

Üçüncü deftere, bant genişliğine geliyoruz — ve burada 89\. makalenin aracı doğrudan işe yarıyor.

26\. makalede adım adım üretimin muhasebesini şöyle çıkarmıştık: ağırlıklar bir kez okunur ve yığındaki her istek için birer token üretilir, dolayısıyla okunan bayt başına yapılan işlem tam olarak yığın büyüklüğüne eşittir. Aynı biçimi eğitime taşıyalım. Eğitim adımında da ağırlıklar bir kez okunur, ama o okumayla mikro yığındaki **bütün** token'lar işlenir. Yani işlem yoğunluğu yığın büyüklüğü değil, mikro yığın çarpı dizi uzunluğu. Bu, ileri geçişin hesabıdır; geri geçiş hem işlemi hem taşınan baytı birlikte büyüttüğü için oran aynı mertebede kalır.

A100 kartının sırt noktasını da kendimiz çıkaralım: 16 bitlik tepe hızı saniyede 312 trilyon işlem, kart belleğinin bandı saniyede 1,5 TB, oran 208 işlem/bayt. 26\. makalenin çipi için bulunan 229 ile aynı mertebede — iki ayrı üreticinin çipi, aynı yer.

| Rejim | İşlem yoğunluğu | Sırt noktasına göre |
|---|---|---|
| Adım adım üretim, yığın 1 | 1 | 208 kat solunda |
| Adım adım üretim, yığın 32 | 32 | 6,5 kat solunda |
| Adım adım üretim, yığın 256 | 256 | 1,2 kat sağında |
| Eğitim adımı, mikro yığın 1 × dizi 2.048 | 2.048 | 9,8 kat sağında |
| Eğitim adımı, mikro yığın 4 × dizi 8.192 | 32.768 | 157,5 kat sağında |

![Logaritmik iki eksenli bir çatı çizgisi. Yatay eksen işlem yoğunluğu, 1'den 100.000 işlem/bayta; dikey eksen ulaşılabilir hız, 1'den 1.000 TFLOP/s'ye. Çatı, solda bant genişliğiyle sınırlı eğik bir koldan 208 işlem/baytlık sırt noktasında 312 TFLOP/s'lik düz tavana döner. Eğik kolda üç üretim noktası durur: yığın 1, yığın 32 ve sırt noktasının hemen sağında yığın 256. Düz tavanda iki eğitim noktası durur: 1 çarpı 2.048 ve 4 çarpı 8.192. Altta: yığın 1 ve 32'nin hızını bant belirler, yığın 256 sırtı ancak geçer, eğitim noktalarının hızını hesap belirler; yığın 32 ile 4 çarpı 8.192 arasındaki yoğunluk farkı 1.024 kattır; hesap yalnızca ağırlıkla yapılan çarpımlar içindir. Kayıt: çizgi, noktalar ve 312 bölü 1,5 eşittir 208 bizim hesabımızdır.](assets/sirt-noktasinin-iki-yani.svg "Şekil 2 — Aynı çip, iki rejim: eğik kolda bant, düz tavanda hesap")

Şekil 2 tablonun satırlarını 89\. makaledeki çatı çizgisinin üstüne yerleştiriyor. Soldaki eğik kolda bir noktanın hızını bant genişliği belirler: yoğunluk iki katına çıkarsa hız da iki katına çıkar. Sırt noktasından sonra tavan düzdür: yoğunluğu artırmak artık hiçbir şey kazandırmaz, çünkü çip zaten hesabının sınırındadır. Üretim noktaları eğik kolda ya da sırtın hemen yanında, eğitim noktaları tavanın derinliğinde duruyor: **aynı çip, aynı ağırlıklar, iki bambaşka rejim.** Otuz iki isteğe hizmet veren bir üretim adımı ile dört diziyi işleyen bir eğitim adımı arasındaki işlem yoğunluğu oranı 32.768 ÷ 32 = 1.024. Biri sırt noktasının solunda beklerken öbürü sağında hesap yapıyor. 26\. makaledeki bütün yığınlama mühendisliğinin amacı paydayı sırt noktasına yaklaştırmaktı; eğitimde o sorun yok, çünkü dizi uzunluğu paydayı zaten binlerle çarpıyor.

Bir sınırı hemen söyleyelim. Bu hesap ağırlıkla yapılan çarpımlar için geçerli; dikkat işleminin kendisinde ağırlık yoktur ve ara matris dizi uzunluğunun karesiyle büyür, dolayısıyla o parça bambaşka davranır. 86\. makalede FlashAttention'ın neden işlem sayısını hiç azaltmadan hızlandırdığını görmüştük — sebebi buydu.

## Tepe hız bir sayı, ulaşılan hız başka

Eğitim adımı sırt noktasının çok sağındaysa çip tepe hızında çalışıyor mu? Hayır — ve farkın ölçüsünün bir adı var.

Aakanksha Chowdhery ve arkadaşlarının JMLR'de yayımladığı PaLM çalışması bu ölçüyü tanımlıyor: **model FLOP kullanım oranı** (model FLOPs utilization, MFU), gözlenen iş hacminin sistemin teorik tepe hızındaki iş hacmine oranı. Tanımın inceliği şu: pay, modelin gerçekten ihtiyaç duyduğu işlemleri sayar; yeniden hesaplamanın getirdiği fazladan işlemleri saymaz. Aynı çalışmanın tablosu dönemin büyük koşularını yan yana koyuyor:

| Model | Donanım | Kullanım oranı |
|---|---|---|
| GPT-3 175B | V100 | %21,3 |
| Gopher 280B | 4.096 TPU v3 | %32,5 |
| Megatron-Turing NLG 530B | 2.240 A100 | %30,2 |
| PaLM 540B | 6.144 TPU v4 | %46,2 |

En iyi satır bile kapasitenin yarısından azını kullanıyor. PaLM'ın donanım FLOP kullanımı — yeniden hesaplama dâhil — yüzde 57,8; 89\. makalede andığımız Deepak Narayanan ve arkadaşlarının Megatron-LM koşusunda ise kart başına 163 teraFLOP/s elde edilmiş ve A100'ün 312'lik tepesinin yüzde 52'sine karşılık gelmişti.

Bu oranı somutlaştıralım. 8 milyar parametreli bir modelde mikro yığın 4 ve dizi 8.192 ile bir adım 32.768 token işler; 8\. makalenin kaba kuralıyla 6 × 8×10⁹ × 32.768 = 1,57×10¹⁵ işlem eder. A100'ün tepe hızında bu 5,04 saniye sürerdi; yüzde 40 kullanım oranında 12,6 saniye. Aynı adımda okunan 16 GB'lık ağırlık ise kart belleğinden 10,7 milisaniyede gelir. Oran 470'in üzerinde: eğitim adımında çip, ağırlıkları okumaya harcadığı zamanın dört yüz yetmiş katını hesap yaparak geçiriyor. Kaybedilen yüzde 60 bant genişliğinden değil; iletişimden, çizelgelemeden ve boş kalan birimlerden geliyor — ve bunların her biri sonraki makalelerin konusu.

> **Kendini yokla:** Bir eğitim koşusunun kullanım oranı yüzde 20'den 40'a çıkarıldı. Bu, koşunun iki katı hızlandığı anlamına mı gelir?

Anlamına gelir, ama yalnızca aynı işi yapıyorsa. Kullanım oranı, modelin ihtiyaç duyduğu işlemleri paya yazar; yeniden hesaplamayı yazmaz. Dolayısıyla oranı yükseltmenin bir yolu daha az yeniden hesaplamaktır ve o durumda gerçekten hızlanırsın. Ama mimariyi değiştirip aynı kaliteyi daha az işlemle almayı denersen pay küçülür, oran düşebilir ve koşu yine de kısalır. Oran bir hız ölçüsü değil, bir **verimlilik** ölçüsüdür; ikisini karıştırmamak gerekir.

## Bir eğitim adımını okumanın disiplini

**Parametre sayısı bellek ihtiyacının yalnızca sekizde biridir.** Karma hassasiyetli AdamW'de parametre başına 16 bayt tutulur; 80 GB'lık bir kart 5 milyar parametrenin durumunu alır ve orada biter.

**Defterin ikinci yarısı yığına bağlıdır.** Aktivasyonlar katman başına `s·b·h·(34 + 5as/h)` bayt tutar; GPT-3'ün ölçüleriyle mikro yığın bir iken bile 275 GB eder.

**Yeniden hesaplama bedava değildir ve folklorik oran iyimserdir.** Ölçülen tam yeniden hesaplama bedeli yüzde 39, seçici sürümünki yüzde 7.

**İşlem yoğunluğu, ağırlık bir kez okunduğunda işlenen token sayısıdır.** Üretimde bu yığın büyüklüğü, eğitimde mikro yığın çarpı dizi uzunluğu; aradaki fark bin kat mertebesindedir.

**Tepe hız asla ulaşılmaz.** Alanın en iyi koşularında kullanım oranı yüzde 46'ya çıkıyor; kaybın kaynağı bant genişliği değil, iletişim ve çizelgeleme.

**Aynı isimle iki farklı şey anılıyor.** Aktivasyonları yeniden hesaplamak, 8\. makaledeki kontrol noktasıyla aynı şey değildir; biri belleği, öbürü koşunun sürekliliğini kurtarır.

### Sırada ne var

Bu makale tek bir kartın defterini tuttu ve defter kapanmadı: 8 milyar parametrenin durumu 80 GB'lık karta sığmıyor, aktivasyonlar yüzlerce gigabayt istiyor, kullanım oranı yüzde elliyi geçmiyor. Tek kart yetmediğinde iş bölünür — ama bir modeli bölmenin tek bir yolu yok. Veriyi mi bölersin, ağırlık matrislerini mi, katman yığınını mı, yoksa dizinin kendisini mi? 8\. makalede bu eksenlerin adını koymuş, kurulumunu ertelemiştik. Bir sonraki makale o borcu ödüyor: her bölme biçimi neyi ucuzlatıyor, karşılığında hangi iletişimi doğuruyor ve hangi ikisi birlikte çalışabiliyor?

## Kaynakça

- Dao, T., Fu, D. Y., Ermon, S., Rudra, A. & Ré, C. (2022). *FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/67d57c32e20fd0a7a302cb81d36e40d5-Abstract-Conference.html)
- Rajbhandari, S., Rasley, J., Ruwase, O. & He, Y. (2020). *ZeRO: Memory Optimizations Toward Training Trillion Parameter Models*. SC 2020. [Bağlantı](https://doi.org/10.1109/SC41405.2020.00024)
- Micikevicius, P., Narang, S., Alben, J., Diamos, G., Elsen, E., Garcia, D., Ginsburg, B., Houston, M., Kuchaiev, O., Venkatesh, G. & Wu, H. (2018). *Mixed Precision Training*. ICLR 2018. [Bağlantı](https://arxiv.org/abs/1710.03740)
- Korthikanti, V. A., Casper, J., Lym, S., McAfee, L., Andersch, M., Shoeybi, M. & Catanzaro, B. (2023). *Reducing Activation Recomputation in Large Transformer Models*. MLSys 2023. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2023/hash/80083951326cf5b35e5100260d64ed81-Abstract-mlsys2023.html)
- Chowdhery, A., Narang, S., Devlin, J. ve ark. (2023). *PaLM: Scaling Language Modeling with Pathways*. Journal of Machine Learning Research, 24(240), 1–113. [Bağlantı](https://www.jmlr.org/papers/v24/22-1144.html)
- Narayanan, D., Shoeybi, M., Casper, J., LeGresley, P., Patwary, M., Korthikanti, V., Vainbrand, D., Kashinkunti, P., Bernauer, J., Catanzaro, B., Phanishayee, A. & Zaharia, M. (2021). *Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM*. SC 2021. [Bağlantı](https://doi.org/10.1145/3458817.3476209)
- Williams, S., Waterman, A. & Patterson, D. (2009). *Roofline: An Insightful Visual Performance Model for Multicore Architectures*. Communications of the ACM 52(4), s. 65–76. [Bağlantı](https://doi.org/10.1145/1498765.1498785)
