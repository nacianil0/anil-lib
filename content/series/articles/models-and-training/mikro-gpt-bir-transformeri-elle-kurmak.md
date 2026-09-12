---
article_id: article_5778a2e7-d37a-4668-ac74-5c47d9c9c944
title: "Mikro-GPT: Bir Transformer'ı Elle Kurmak"
slug: mikro-gpt-bir-transformeri-elle-kurmak
category: models-and-training
level: advanced
reading_order: 103
summary: "100. makalenin kasıtlı bıraktığı boşluğu doldurur: 364 parametreli bir Transformer'ın tam parametre defteri, tek bir token'ın embedding'den logit'e kadarki bütün boyutları, maskelenmiş dikkat matrisinin sayısal hâli ve rastgele ağırlıklı bir modelin düz tahminden neden daha kötü olduğu."
tags:
  - transformer
  - parametre-defteri
  - dikkat-matrisi
  - baglanmis-embedding
  - ileri-gecis
content_hash: sha256:bf8f4406f11d2ed2d6cf79b2b332bc49a14687ef7b1f8c5399f6c891b3c0c923
classification_version: 1
classification_batch: 25
---
## Kâğıda sığan bir model

100\. makalede haritanın bir boşluğunu adlandırmıştık: mimarinin parçaları 6 ve 7'de ayrı ayrı anlatılmıştı, eğitim döngüsü 8'de ölçek düzeyinde kurulmuştu, ama ikisi hiç birleştirilmemişti. O boşluk bilinçliydi. 102\. makale kapanırken de aynı yere işaret etti ve üç soru bıraktı: sorgu, anahtar ve değer matrisleri hangi boyutlarda; bir token gerçekte hangi sayı dizisine dönüşüyor; tek bir ileri geçişin sonunda çıkan dağılım elle takip edilebilir mi?

Hatırlatalım. 6\. makalede dikkatin işini kurmuştuk: her token'ın vektörü üç öğrenilmiş dönüşümden geçip sorgu, anahtar ve değere ayrılır; sorgular anahtarlarla çarpılıp skor verir, softmax skorları toplamı bir olan ağırlıklara çevirir, çıktı değerlerin ağırlıklı ortalamasıdır. 7\. makalede Ashish Vaswani ve arkadaşlarının 2017 tarihli mimarisini kurduk: blok, çok başlı dikkat, dışarıdan eklenen konum bilgisi, artık bağlantı, katman normalleştirme ve ileri beslemeli katman.

Bu makalede o mimarinin çalışan ama **kâğıda sığan** bir örneğini kuruyoruz. Model 364 parametre taşıyacak; bütün ara değerlerini yazacağız. Bir uyarıyı baştan yapalım: parametreleri biz yazmadık, rastgele çekildiler. Yani model doğru bir şey söylemeyecek. Bu makalenin işi doğru cevap üretmek değil, **muhasebeyi görmek** — hangi parça kaç sayı tutuyor, bir token hangi boyutlardan geçiyor ve sonunda dağılım nereden çıkıyor.

## Şartname: her sayı neden bu kadar küçük

Önce bir dil lazım. Yedi token'lık bir dil kuruyoruz: `başla`, `kedi`, `köpek`, `bugün`, `dün`, `uyudu`, `havladı`. Geçerli cümleler dört token uzunluğunda ve tek bir kuralı var: fiil, özneyle uyuşur.

| Dizi | Konum 0 | Konum 1 | Konum 2 | Konum 3 |
|---|---|---|---|---|
| 1 | başla | kedi | bugün | uyudu |
| 2 | başla | kedi | dün | uyudu |
| 3 | başla | köpek | bugün | havladı |
| 4 | başla | köpek | dün | havladı |

Tasarımın tek amacı şu: üçüncü konumdaki zarf iki cümlede de aynı olabildiği için, fiili tahmin etmek isteyen bir modelin **bir önceki token'a bakması yetmez**; ikinci konumdaki özneye ulaşması gerekir. 6\. makaledeki mekanizmanın varlık sebebi buydu ve bu minik dil onu ölçülebilir hâle getiriyor.

Kurduğumuz kol, 7\. makaledeki üç koldan kod çözücü olanı: Alec Radford ve arkadaşlarının 2018'de tanıttığı GPT'nin düzeni, yani nedensel maske ve öğrenilen konum embedding'leri. Şimdi modelin ölçüleri. Vektör boyu dört; sekiz olsaydı sayılar satıra sığmazdı, iki olsaydı iki başa bölünemezdi. Baş sayısı iki, yani her başın çalıştığı boyut 4 ÷ 2 = 2 — 7\. makaledeki bölme kuralının aynısı. Bağlam dört token, sözlük yedi token, blok sayısı iki. İleri beslemeli katmanın ara boyutu sekiz; taban modelde bu oran dörttü (512 ve 2.048), biz okunabilirlik için ikide bıraktık ve bu sapmayı burada kaydediyoruz.

İki tercihi daha açıkça söyleyelim, çünkü ikisi de 7\. makalenin ileri okuma notundan geliyor. Birincisi: Jimmy Lei Ba ve arkadaşlarının tanımladığı katman normalleştirmeyi alt-katmanın **girdisine** koyuyoruz, çıktısına değil — Ruibin Xiong ve arkadaşlarının ICML 2020'de gösterdiği kararlı yerleşim bu. İkincisi: ileri beslemeli katmanın aktivasyonu GELU. Hangi aktivasyonun seçildiği bu ölçekte fark yaratmıyor; 99\. makalede Narang ve arkadaşlarının tablosunda görmüştük, GELU ile taban çizgisi arasındaki 0,003'lük fark taban çizgisinin kendi koşular arası sapmasının altında kalıyordu.

## Parametre defteri

Şimdi sayalım. Her satır bir matrisin ya da vektörün boyutlarının çarpımıdır; toplam, modelin tamamıdır.

| Parça | Hesap | Parametre |
|---|---|---|
| Token embedding tablosu | 7 × 4 | 28 |
| Konum embedding tablosu | 4 × 4 | 16 |
| Blok başına: katman normalleştirme ×2 | 2 × 2 × 4 | 16 |
| Blok başına: dikkat | 4 × 4 × 4 | 64 |
| Blok başına: ileri beslemeli katman | 4×8 + 8 + 8×4 + 4 | 76 |
| İki blok | 2 × 156 | 312 |
| Son katman normalleştirme | 2 × 4 | 8 |
| Çıktı izdüşümü | embedding tablosuyla paylaşılır | 0 |
| **Toplam** | | **364** |

Dikkat satırındaki dört matris sorgu, anahtar, değer ve başların çıktısını birleştiren izdüşümdür; 7\. makalede taban model için 4 × 512 × 512 diye saymıştık, burada 4 × 4 × 4. İleri beslemeli satırdaki dört terim iki matris ve iki sapma vektörüdür.

Son satır yeni bir şey içeriyor. Modelin en sonunda dört sayılık vektörü sözlük boyunda bir skor listesine çeviren bir izdüşüm var. Onun için ayrı bir matris tutmuyoruz; girişteki embedding tablosunu **aynen** kullanıyoruz. Buna bağlanmış embedding (tied embedding) denir ve 7\. makalede taban modelin tablosunda "paylaşılan embedding tablosu" diye tek satırda saymıştık. Ofir Press ve Lior Wolf'un EACL 2017'de yayımladığı çalışma bunun yalnızca yer tasarrufu olmadığını gösteriyor: iki tabloyu bağlamak, dil modellerinin perplexity'sini düşürüyor ve modelin boyutunu belirgin biçimde küçültüyor.

> **Kendini yokla:** Çıktı izdüşümü sözlükteki yedi token için birer skor üretiyor ve bunu dört sayılık bir vektörden çıkarıyor. Böyle bir işlem 7 × 4 = 28 sayı ister. Tablodaki satır neden sıfır yazıyor?

Çünkü o 28 sayı zaten sayıldı — girişteki token embedding tablosunun ta kendisi. Aynı sayılar iki işte kullanılıyor: girerken hangi token'ın hangi vektöre açıldığını, çıkarken hangi vektörün hangi token'a ne kadar benzediğini söylüyorlar. Bağlamasaydık toplam 364 değil 392 olurdu, yani modelin yüzde 7,1'i kadar fazla.

Yedi token'lık bir sözlükte bu tasarruf küçük görünüyor; gerçek boylarda değil. 15\. makalede hesaplamıştık: GPT-2'nin küçük sürümünde embedding tablosu 50.257 × 768 ≈ 38,6 milyon parametre, yani 124 milyonluk modelin yaklaşık üçte biri. Bağlanmamış bir çıktı izdüşümü aynı boyutta ikinci bir tablo ister ve modeli neredeyse yüzde otuz şişirir.

Defteri oranlara çevirelim. İleri beslemeli katmanlar 152 parametre tutuyor, dikkat 128, embedding tabloları 44, katman normalleştirmeler 40. İki alt-katman türünü kendi aralarında oranlarsak ileri besleme 152 ÷ 280 = yüzde 54,3 pay alıyor. 7\. makalede taban model için aynı hesabı yapmış ve yüzde 57 bulmuştuk. Ölçek farkı ise şu: 2017'nin 65 milyon parametreli taban modeli bu modelin 178.571 katı, GPT-3'ün 175 milyarı 480 milyon katı. Dört yüz seksen milyon kat küçüldük, oran neredeyse yerinde kaldı — "Transformer eşittir dikkat" denkleminin çatladığı yer burada da aynı.

![Yedi satırlık dört sütunlu bir tablo ve altında iki kutu. Üstte başlık: 364 parametre nerede duruyor. Sütunlar parça, hesap, parametre ve paydır. Birinci satır token embedding tablosu: 7 çarpı 4, 28 parametre, yüzde 7,7. İkinci satır konum embedding tablosu: 4 çarpı 4, 16 parametre, yüzde 4,4. Üçüncü satır iki bloğun dikkat matrisleri: 2 çarpı 4 çarpı 4 çarpı 4, 128 parametre, yüzde 35,2. Dördüncü satır vurguludur, iki bloğun ileri beslemeli katmanları: 2 çarpı 76, 152 parametre, yüzde 41,8. Beşinci satır katman normalleştirmeler: 2 çarpı 16 artı 8, 40 parametre, yüzde 11,0. Altıncı satır çıktı izdüşümü: paylaşılır, 0 parametre, yüzde 0. Yedinci satır toplam: 364 parametre, yüzde 100. Birinci kutuda oran durur: iki alt-katman türü kendi aralarında oranlanırsa ileri beslemenin payı yüzde 54,3 ve 7. makalede taban model için aynı hesap yüzde 57 vermişti. İkinci kutuda ölçek durur: 2017'nin taban modeli bu modelin 178.571 katı, GPT-3 ise 480 milyon katıdır; oran yerinde kaldı, boy değişti. En altta bir kayıt: sayım bizimdir ve modelin kendi şartnamesinden çıkar.](assets/parametre-defteri.svg "Şekil 1 — 364 parametrenin dökümü")

Şekil 1'in okunacak yeri sağdaki pay sütunu: dikkat, modelin en çok konuşulan parçası olduğu hâlde parametrelerin üçte birinden azını tutuyor.

## Bir token'ın yolculuğu

Şimdi birinci diziyi — `başla kedi bugün uyudu` — modelden geçirelim. Bütün ağırlıklar rastgele çekildi ve iki ondalığa yuvarlandı; aşağıdaki her sayı o yuvarlanmış değerlerden çıkıyor, dolayısıyla zincir baştan sona tutarlı.

İlk adım toplama. `kedi` token'ının embedding satırı (−0,33 ; −0,07 ; 0,39 ; 0,15), birinci konumun embedding satırı (−0,12 ; −0,04 ; 0,22 ; 0,09). İkisini topluyoruz: (−0,45 ; −0,11 ; 0,61 ; 0,24). Dört sayı, ve bu dört sayı modelin o token hakkında bildiği her şey. 7\. makalede "konum bilgisi ayrıca enjekte edilmelidir" demiştik; enjeksiyonun tamamı bu toplamadır.

Sonra blok başlıyor. Vektör önce katman normalleştirmeden geçiyor, sonra üç matrisle çarpılıp sorgu, anahtar ve değer üretiyor. Üçüncü konum için — `bugün` — bunlar sırasıyla (0,601 ; −0,482 ; 1,122 ; −0,418), (−1,271 ; −0,880 ; 0,469 ; 0,294) ve (1,038 ; −0,221 ; −1,541 ; −0,340). Dörder sayı; ilk ikisi birinci başın, son ikisi ikinci başın. Çok başlı dikkatte "başa bölmek" dediğimiz şey fiziksel bir bölme değil, bu dört sayının ikişerli okunmasıdır.

Dikkat çıktısı alındıktan ve başlar birleştirildikten sonra dördüncü matris devreye giriyor ve sonuç girdinin **üstüne** ekleniyor. Üçüncü konumda giren vektör (−0,74 ; −0,03 ; 0,00 ; 0,60) idi; dikkatin kattığı pay (0,107 ; −0,375 ; −0,030 ; 0,008), toplam (−0,633 ; −0,405 ; −0,030 ; 0,608). Aynı sıra ileri beslemeli katman için tekrarlanıyor: normalleştir, dört sayıyı sekize aç, GELU'dan geçir, dörde indir, üstüne ekle. Birinci bloğun çıkışı (−0,436 ; −0,195 ; −0,033 ; −0,058).

İkinci blok aynı işi yapıyor ve (−0,478 ; −0,150 ; −0,043 ; 0,211) veriyor. Son katman normalleştirmeden sonra elimizde (−1,468 ; −0,140 ; 0,290 ; 1,319) kalıyor.

![On bir satırlık üç sütunlu bir tablo ve altında bir kutu. Üstte başlık: üçüncü konumun dokuz basamağı, bugün token'ı logit'e nasıl gidiyor. Sütunlar basamak, boyut ve çıkan sayılar. Birinci satır token embedding satırı, 4 boyut, eksi 0,58; 0,30; 0,18; 0,17. İkinci satır konum embedding eklenir, 4 boyut, eksi 0,74; eksi 0,03; 0,00; 0,60. Üçüncü satır katman normalleştirme, 4 boyut, ortalama sıfır ve yayılım bir. Dördüncü satır sorgu üretimi, 2 artı 2 boyut, 0,601; eksi 0,482 ile 1,122; eksi 0,418. Beşinci satır anahtar üretimi, 2 artı 2 boyut, eksi 1,271; eksi 0,880 ile 0,469; 0,294. Altıncı satır değer üretimi, 2 artı 2 boyut, 1,038; eksi 0,221 ile eksi 1,541; eksi 0,340. Yedinci satır vurguludur, maskelenmiş dikkat, 4 boyut, 0,107; eksi 0,375; eksi 0,030; 0,008. Sekizinci satır artık bağlantı, 4 boyut, eksi 0,633; eksi 0,405; eksi 0,030; 0,608. Dokuzuncu satır ileri besleme ve artık, 4'ten 8'e ve 4'e, eksi 0,436; eksi 0,195; eksi 0,033; eksi 0,058. Onuncu satır ikinci blok ve son katman normalleştirme, 4 boyut, eksi 1,468; eksi 0,140; 0,290; 1,319. On birinci satır bağlanmış çıktı izdüşümü, 4'ten 7'ye, uyudu logit'i eksi 0,397 ve olasılık 0,061. Alttaki kutuda şu durur: dokuz basamağın yalnızca beşincisi öteki konumlara bakar, kalan sekizi bu konumun kendi dört sayısı üzerinde çalışır. En altta bir kayıt: ağırlıklar rastgele çekilip iki ondalığa yuvarlandı ve zincir bu değerlerden çıkar.](assets/token-yolculugu.svg "Şekil 2 — Dört sayının dokuz basamağı")

Şekil 2'nin alt kutusu bu makalenin en kolay gözden kaçan cümlesi: dokuz basamağın yalnızca biri komşulara bakıyor. Geri kalan her şey o konumun kendi dört sayısı üzerinde çalışıyor.

## Maskelenmiş dikkat matrisinin sayısal hâli

6\. makalede dikkat ağırlıklarını tek bir satır olarak görmüştük: bir token'ın komşularına dağıttığı paylar. Bütün satırları bir araya koyduğumuzda bir kare çıkıyor ve nedensel maskenin ne yaptığı orada görünür hâle geliyor. Birinci başın ağırlıkları şunlar:

| Sorgu \ Anahtar | başla | kedi | bugün | uyudu |
|---|---|---|---|---|
| başla | 1,000 | — | — | — |
| kedi | 0,356 | 0,644 | — | — |
| bugün | 0,441 | 0,243 | 0,316 | — |
| uyudu | 0,070 | 0,375 | 0,459 | 0,095 |

Bir satırın nasıl doğduğunu açalım — üçüncü satır, yani `bugün` sorgusu. Sorgunun ilk iki sayısı her anahtarın ilk iki sayısıyla çarpılıp toplanıyor: `başla` için 0,1307, `kedi` için −0,7146, `bugün` için −0,3395. Baş boyutu 2 olduğu için hepsi √2'ye bölünüyor ve 0,0925 · −0,5053 · −0,2401 kalıyor. Üstelleri 1,0969 · 0,6033 · 0,7865, toplamları 2,4867; her birini toplama bölünce 0,441 · 0,243 · 0,316 çıkıyor. Dördüncü sütun yok, çünkü `uyudu` henüz gelmedi.

Boş hücreleri "sıfır kondu" diye okumak yanlış olur. 6\. makalede kuralı şöyle kurmuştuk: yasak konumların skoru eksi sonsuz yapılır ve normalleştirme kalanlar üzerinden yapılır. Yani sıfır, softmax'tan **sonra** eklenen bir değer değil; softmax'ın girdisinden **önce** çıkarılmış bir konumdur. Fark, satır toplamlarında görünüyor: her satır kendi içinde 1 ediyor, üçüncü satır üç sayıyla, dördüncü satır dörtle.

![Dört satırlı dört sütunlu bir matris ve altında iki kutu. Üstte başlık: birinci başın dikkat ağırlıkları, satır sorgu ve sütun anahtar konumudur. Sütun başlıkları başla, kedi, bugün, uyudu. Birinci satır başla: 1,000 ve üç boş hücre. İkinci satır kedi: 0,356, 0,644 ve iki boş hücre. Üçüncü satır vurguludur, bugün: 0,441, 0,243, 0,316 ve bir boş hücre. Dördüncü satır uyudu: 0,070, 0,375, 0,459, 0,095. Boş hücreler tire ile gösterilmiştir. Birinci kutunun başlığı üçüncü satır nasıl doğdu: ham skorlar 0,1307, eksi 0,7146 ve eksi 0,3395; karekök ikiye bölününce 0,0925, eksi 0,5053 ve eksi 0,2401; üstelleri 1,0969, 0,6033 ve 0,7865, toplamı 2,4867 ve bölme sonucu 0,441, 0,243, 0,316. İkinci kutunun başlığı boş hücreler sıfır değildir: yasak konumun skoru softmax'a girmeden eksi sonsuza gider, bu yüzden üç sayılık satır da dört sayılık satır da kendi içinde bir eder. En altta iki kayıt: bu ağırlıklar rastgele çekilmiş parametrelerden geliyor ve hiçbir örüntü taşımıyorlar; değerler eğitilmemiş mikro modelin ileri geçişinden alındı.](assets/maskelenmis-dikkat-matrisi.svg "Şekil 3 — Ağırlıkların kare hâli")

Şekil 3'ün en alt kaydı önemli. Bu sayılar bir örüntü değil; rastgele çekilmiş ağırlıkların ürünü. Dördüncü satırda `bugün`e verilen 0,459'un anlamı yok.

### İleri okuma notu: iki baş neden bedava

7\. makalede yazarların iddiasını aktarmıştık: baş sayısını artırmak toplam hesabı büyütmez, çünkü her başın boyutu aynı oranda küçülür. Mikro modelde bunu doğrudan sayabiliyoruz. İki başlı kurulumda sorgu, anahtar ve değer matrislerinin toplam boyu 3 × 4 × 4 = 48 parametre; tek başlı kurulumda da 48, çünkü değişen şey matrislerin boyu değil, çıkan dört sayının nasıl gruplandığı. Skor hesabı da aynı: iki baş için 2 baş × 10 izinli çift × 2 boyut = 40 çarpma, tek baş için 1 × 10 × 4 = 40. Tek fark, iki başta iki ayrı softmax çalışması. Yani "daha çok bakış açısı" ek parametreyle değil, aynı parametrelerin bölünmesiyle geliyor — ve 7\. makaledeki ölçüm de bunu söylüyordu: baş sayısını otuz ikiye çıkarmak kaliteyi düşürüyordu, çünkü her başa kalan boyut artık bir şey taşıyamayacak kadar küçülüyor.

Bir muhasebe daha buradan çıkıyor ve ileride işimize yarayacak. 26\. makalede anahtar-değer önbelleğini kurmuştuk: üretim sırasında her token'ın anahtar ve değer vektörleri saklanır ki bir daha hesaplanmasın. Mikro modelde bu, blok başına token başına 2 × 4 = 8 sayı demek; iki blok ve dört token için 64 sayı. Modelin kendisi 364 parametre taşıyor, yani dört token'lık bir bağlamın önbelleği modelin altıda biri kadar yer tutuyor. 26\. makalede önbelleğin ağırlıkları geçtiği eşiği konuşmuştuk; burada eşiğin neden bu kadar erken geldiği görünüyor — önbellek token sayısıyla büyür, ağırlıklar büyümez.

> **Kendini yokla:** Matrisin birinci satırında tek bir sayı var ve o sayı 1,000. Bu değer ağırlıklara mı bağlı, yoksa hangi ağırlıkları seçersek seçelim aynı mı çıkar?

Aynı çıkar. Birinci konumun bakabileceği tek konum kendisidir; softmax tek elemanlı bir liste üzerinde çalıştığında o elemanın payı toplamın tamamıdır. Yani ilk satırın 1,000'i bir öğrenme sonucu değil, aritmetik bir zorunluluk. Nedensel maskenin ilk satırda hiçbir şey söylememesi, dil modellerinin metnin ilk token'ını yalnızca kendi önyargılarıyla üretmesinin de sebebi.

## Logit'ten dağılıma, dağılımdan kayba

Son adım kaldı. Üçüncü konumun son vektörü (−1,468 ; −0,140 ; 0,290 ; 1,319) idi. Bunu sözlükteki yedi satırın her biriyle nokta çarpıma sokuyoruz. `uyudu` satırı (0,11 ; −0,02 ; 0,18 ; −0,22) olduğuna göre: −1,468×0,11 + (−0,140)×(−0,02) + 0,290×0,18 + 1,319×(−0,22) = −0,161 + 0,003 + 0,052 − 0,290 = −0,397. Yedi satır için aynı işlem yedi logit veriyor, softmax onları dağılıma çeviriyor:

| Token | Logit | Olasılık |
|---|---|---|
| başla | −0,061 | 0,085 |
| kedi | 0,805 | 0,201 |
| köpek | −0,422 | 0,059 |
| bugün | 1,086 | 0,267 |
| dün | 0,651 | 0,173 |
| uyudu | −0,397 | 0,061 |
| havladı | 0,543 | 0,155 |

102\. makalenin üçüncü sorusunun cevabı bu tablo: evet, elle takip edilebiliyor.

Ama cevap ne kadar kötü ona da bakalım. Doğru token `uyudu` ve model ona 0,061 veriyor; kaybı −ln(0,061) = 2,804 nat. Dizinin üç hedefi üzerinden ortalama 2,447, dört dizinin tamamında 2,126. Hiçbir şey bilmeyen, yedi token'a eşit olasılık veren bir tahminci ise ln 7 = 1,946 alırdı.

Rastgele ağırlıklı model, hiçbir şey bilmeyen tahminciden **daha kötü**. Bu tuhaf değil, beklenen bir şey: rastgele parametreler tarafsız değildir. Sıfırın çevresinde çekilmiş sayılar sözlükteki bazı satırları yukarı, bazılarını aşağı iten bir eğilim üretiyor ve o eğilimin doğru cevapla hizalanması için hiçbir sebep yok. 2\. makaledeki döngünün ilk işi bu fazlalığı temizlemek olacak.

## Kaba hesabın nereye kadar doğru olduğu

8\. makalede eğitim faturasının kaba kuralını kurmuştuk: parametre başına, token başına altı işlem; yalnız ileri geçiş için iki. Mikro modelde bu kuralı sınayabiliriz, çünkü işlemleri gerçekten sayabiliyoruz.

İleri geçişi tek tek sayalım. Blok başına sorgu, anahtar, değer ve çıktı izdüşümü 4 × 16 × 2 × 4 = 512 işlem; dikkat skorları ve ağırlıklı toplamlar 160; ileri beslemeli katman 512. Blok toplamı 1.184, iki blok 2.368, çıktı izdüşümü 224. Dört token için 2.592, yani token başına 648 işlem.

Kaba kural ise 2 × 364 = 728 der. Fark yüzde 12 ve kaynağı belli: 364 parametrenin 80'i hiçbir çarpma yapmıyor. On altı konum embedding'i bir tablodan okunuyor, kırk katman normalleştirme parametresi ile yirmi dört sapma terimi ise çarpma değil eleman düzeyinde toplama ve ölçekleme yapıyor. Geriye 284 parametre kalıyor; 2 × 284 = 568, üstüne dikkat skorlarının token başına 80 işlemi eklenince tam 648.

> **Kendini yokla:** Kaba kural bu modelde yüzde 12 fazla sayıyor. Yüz milyar parametreli bir modelde bu sapma büyür mü, küçülür mü?

Küçülür. Çarpma yapmayan parametreler — konum tabloları, normalleştirme ölçekleri, sapmalar — model büyüdükçe toplam içinde orantısız biçimde küçülür, çünkü sayıları vektör boyuyla doğrusal artarken matrislerin boyu vektör boyunun karesiyle artar. Kaba kural küçük modelde kaba, büyük modelde iyi bir kestirim; 8\. makalede GPT-3 için hesapladığımız 3,14×10²³ ile çalışmanın kendi tablosundaki değerin tutması da bundan.

## Elle kurmanın gösterdiği

**Bir Transformer'ın tamamı bir çarpım tablosudur.** Her parça bir matrisin boyutlarının çarpımı kadar sayı tutar; toplam, o çarpımların toplamıdır ve tek tek sayılabilir.

**Parametrelerin çoğu dikkatte değildir.** Mikro modelde ileri beslemeli katmanlar iki alt-katman türünün yüzde 54,3'ünü, taban modelde yüzde 57'sini tutuyor.

**Çıktı izdüşümü bedava olabilir.** Embedding tablosunu iki uçta da kullanmak bu modelde yüzde 7,1'lik bir tasarruf, büyük sözlüklerde çok daha fazlası.

**Maskenin boş hücreleri değer değil, yokluk taşır.** Skor eksi sonsuza gider ve normalleştirme kalanlar üzerinden yapılır; bu yüzden kısa satırlar da bire toplanır.

**Rastgele ağırlık tarafsız değildir.** Eğitilmemiş model, düz tahminciden daha kötü bir kayıp verir; ilk işi öğrenmek değil, kendi rastgele eğilimini silmektir.

**Kaba kurallar ölçekle birlikte doğrulaşır.** Token başına 2N kestirimi 364 parametrede yüzde 12 şişiyor, milyarlarda şişmiyor.

### Sırada ne var

Makine hazır ve boş. 364 sayının hepsi rastgele ve model, dört cümlelik bir dilin kuralını bilmiyor. Elimizde ise 2\. makaleden beri bilinen bir döngü var: tahmin et, kaybı ölç, gradyanı al, parametreleri oynat. Bir sonraki makalede o döngüyü bu modelin üzerinde gerçekten çalıştırıyoruz — ama önce dilin kendisini token'lara bölmek gerekiyor ve bu seride ilk kez tokenizer'ı hazır almayacağız, kendimiz kuracağız. Soru şu: 364 parametre, dört cümlelik bir dilin kuralını öğrenmeye yeter mi, ve öğrendiğini nereden bileceğiz?

## Kaynakça

- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. & Polosukhin, I. (2017). *Attention Is All You Need*. NeurIPS 2017 (arXiv:1706.03762). [Bağlantı](https://arxiv.org/abs/1706.03762)
- Radford, A., Narasimhan, K., Salimans, T. & Sutskever, I. (2018). *Improving Language Understanding by Generative Pre-Training*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- Press, O. & Wolf, L. (2017). *Using the Output Embedding to Improve Language Models*. EACL 2017, s. 157–163. [Bağlantı](https://aclanthology.org/E17-2025/)
- Xiong, R., Yang, Y., He, D., Zheng, K., Zheng, S., Xing, C., Zhang, H., Lan, Y., Wang, L. & Liu, T.-Y. (2020). *On Layer Normalization in the Transformer Architecture*. ICML 2020, PMLR 119, s. 10524–10533. [Bağlantı](https://proceedings.mlr.press/v119/xiong20b.html)
- Ba, J. L., Kiros, J. R. & Hinton, G. E. (2016). *Layer Normalization*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1607.06450)
- Narang, S., Chung, H. W., Tay, Y., Fedus, W., Févry, T., Matena, M., Malkan, K., Fiedel, N., Shazeer, N., Lan, Z., Zhou, Y., Li, W., Ding, N., Marcus, J., Roberts, A. & Raffel, C. (2021). *Do Transformer Modifications Transfer Across Implementations and Applications?*. EMNLP 2021, s. 5758–5773. [Bağlantı](https://aclanthology.org/2021.emnlp-main.465/)
