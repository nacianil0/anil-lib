---
article_id: article_04339cdc-e5a8-423a-b152-fe02b31222cc
title: "Birleşik Modeller: Her Şey Token mı?"
slug: birlesik-modeller-her-sey-token-mu
category: multimodal-and-future
level: intermediate
reading_order: 84
summary: "\"Her şey token\" iddiasını sınıyor. Görüntüyü sözlüğe sokan kuantizasyon adımını kuruyor (128×128 görüntü 32×32 ızgaraya, 512 kodlu bir defterle, bitte 42,6 kat indirgeme) ve sözlüğün kalitesinin tavanı belirlediğini ölçüyle gösteriyor: aynı ölçütte dil modeli 3,41 iken difüzyon 1,79'du; sözlük büyütülünce sıralama tersine döndü. Görüntüde sıranın icat edilmiş olduğunu ve bunun bedelini veriyor — 256 adım yerine 8 adım, ölçek ölçek üretimde 18,65'ten 1,73'e. Tek sözlüğün ölçülmüş bedelini — tek softmax altında modalitelerin norm yarışına girip eğitimi ıraksatmasını — ve 30'un biçim garantisinin burada mimari bir zorunluluk hâline gelmesini anlatıyor. Kapanışta karşı ölçüm: kuantizasyonu bırakıp tek gövdede iki kayıp kullanan düzen, eşit işlemde yaklaşık iki kat daha iyi FID veriyor ve metin tarafında bile yüzde 50–60 işlemde eşitleniyor."
tags:
  - birlesik-modeller
  - gorsel-tokenlestirme
  - kuantizasyon
  - erken-kaynasma
  - kisitli-uretim
content_hash: sha256:b88605c353e1002b4939700417bc7b6a57239eff1ed1eb2240fdc7de103b88a4
classification_version: 1
classification_batch: 20
---
## İki üretim düzeni, tek gövde olabilir mi

Önceki makale bir soruyu açıkta bıraktı. Elimizde iki üretim düzeni var: 10\. makalede kurulan, token token ilerleyen otoregresif düzen; ve difüzyon, yani bütün tuvali gürültüden başlayıp defalarca düzelten düzen. İkisi farklı kayıplar kullanıyor, farklı örnekleyicilerle çalışıyor, farklı maliyet yapılarına sahip.

Bu makalenin sorusu şu: ikisi gerçekten iki ayrı aile mi, yoksa görüntüyü de sese de bir sözlüğe indirip her şeyi tek bir dizi modeline yaptırmak mümkün mü? İddianın adı var — "her şey token" — ve savunulabilir bir yanı da var: eğer bütün modaliteler aynı sözlükten çekilen token dizilerine dönüşürse, dil modelleri için kurulmuş bütün altyapı olduğu gibi devralınır. Tek kayıp, tek servis katmanı, tek bağlam penceresi, ve metinle görüntünün iç içe geçtiği belgeleri doğal biçimde modelleyebilme.

Bu makale iddiayı sınıyor. Üç adım: bir modaliteyi sözlüğe sokmanın mekanizması, tek gövdenin ölçülmüş bedeli, ve kuantizasyonu hiç yapmayan karşı öneri.

## Görüntüyü sözlüğe sokmak

4\. makalede tokenizasyonun bir tasarım kararı olduğunu görmüştük: sözlüğü sen seçiyorsun, ve seçim hem dizi uzunluğunu hem de her birimin ne kadar anlam taşıdığını belirliyor. Görüntü tarafında bu adımın karşılığı **kuantizasyon**: sürekli değerli bir vektörü, sonlu bir defterdeki en yakın girdiyle değiştirmek.

Aaron van den Oord ve arkadaşlarının NeurIPS 2017'de sunduğu çalışma bunun kanonik biçimini kuruyor. Bir kodlayıcı görüntüyü küçük bir ızgaraya indirir ve her ızgara hücresi için bir vektör üretir; her vektör, öğrenilen bir kod defterindeki en yakın girdiyle değiştirilir; bir çözücü bu kodlardan görüntüyü geri üretir. Kod defteri 512 girdiliyse her hücre yalnızca dokuz bit taşır, çünkü 512 seçenek dokuz bitle numaralanır. Çalışmanın kendi hesabı bunu somutlaştırıyor: 128×128×3 boyutundaki bir görüntü, 512 kodlu bir defterle 32×32'lik bir ızgaraya indiriliyor ve bitte yaklaşık 42,6 kat indirgeme elde ediliyor. Hesabı yeniden yapabilirsin: görüntü 128 × 128 × 3 değer çarpı 8 bit, yani 393.216 bit; ızgara 32 × 32 hücre çarpı 9 bit, yani 9.216 bit; oran 42,67 — kaynak bunu 42,6 diye kesiyor.

Bedel de burada. Kuantizasyon geri döndürülemez bir kayıptır: en yakın koda yuvarlanan her hücre, o kod ile gerçek vektör arasındaki farkı atar. Patrick Esser ve arkadaşlarının CVPR 2021'de sunduğu çalışma kaybı azaltmak yerine **yönlendirmeyi** önerdi: yeniden üretim hatasına algısal bir kayıp ve düşmanca bir ayırt edici ekleyerek, defterin insanın önemsediği yerel yapıları tutmasını sağladılar. Sonuç, kuantize edilmiş görüntü token'ları üzerinde çalışan bir Transformer'ın megapiksel ölçeğinde görüntü üretebilmesi oldu.

## Sözlüğün kalitesi tavanı belirliyor

Bu noktada alanın uzun süre kabul ettiği bir kanı vardı: görsel üretimde dil modeli düzeni difüzyonun gerisinde kalır. Kanının arkasında somut bir sayı da vardı. Lijun Yu ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu açılışında yazıyor: ImageNet 256×256'da o günün en iyi dil modeli 3,41 FID verirken en iyi difüzyon modeli 1,79 veriyordu — yazarların ifadesiyle yüzde 48'lik bir fark.

Çalışmanın tezi, farkın model ailesinden değil **sözlükten** geldiği. İki değişiklik yapıyorlar. Birincisi, en yakın kodu aramak yerine kuantizasyonu arama gerektirmeyen bir biçime çeviriyorlar; bu, defteri çok büyütmeyi mümkün kılıyor. İkincisi defteri gerçekten büyütüyorlar: 2¹⁸, yani yaklaşık 262 bin kod. Büyük sözlüğün kendi sorunu var — bu kadar geniş bir çıktı katmanını tek seferde tahmin etmek pahalı — ve çözüm 4\. makaledeki alt-kelime mantığının akrabası: büyük bir birimi küçük parçaların birleşimi olarak yazmak. Burada tahmin iki parçaya bölünüyor ve her biri 2⁹ boyutunda iki deftere yayılıyor; 2⁹ × 2⁹ = 2¹⁸ olduğu için iki küçük seçim bütün kodları kapsıyor.

Ayrıştırma çalışmanın kendi tablosunda duruyor ve okunması gereken şey sıralama. ImageNet 128×128 üzerinde tokenizasyon kalitesi, arama gerektirmeyen kuantizasyonla 2,65'ten 2,48'e, sözlük büyütülünce 1,34'e, kalan tasarım değişiklikleriyle 1,15'e iniyor. Sıçramayı yapan adım sözlüğün büyütülmesi. Ve nihai sonuç, açılıştaki sıralamayı tersine çeviriyor: aynı veri, karşılaştırılabilir model boyu ve eğitim bütçesiyle, maskeli bir dil modeli difüzyon modellerini geçiyor.

![Beş kutuluk tek satırlık akış şeması ve altında bedel kayıtları. Soldan sağa kutular: piksel ızgarası, kodlayıcı, kuantize edici, ortak sözlükte dizi modeli, çözücü; aralarında sağa bakan oklar var. Altta dört bedel kaydı: kodlayıcı ızgarayı küçültür ve ayrıntıyı atar; kuantize edici en yakın koda yuvarlar ve bu kayıp geri alınamaz; ortak sözlükte metin ile görüntü aynı softmax'ı paylaşır; dizi modeli token'ların bir sırası olduğunu varsaymak zorundadır ve görüntüde o sıra icat edilmiştir. En altta iki ölçüm: 512 kodlu bir defterle 128 çarpı 128 görüntü 32 çarpı 32 ızgaraya iniyor, bitte 42,6 kat indirgeme oluyor; ve tokenizasyon kalitesi arama gerektirmeyen kuantizasyonla 2,65'ten 2,48'e, sözlük 262 bine çıkarılınca 1,34'e iniyor.](assets/goruntuyu-sozluge-sokmak.svg "Şekil 1 — Pikselden ortak sözlüğe: her aşamanın bedeli")

Aynı çalışmanın ikinci bulgusu, görsel token'ların ne olduğuna dair bakışı değiştiriyor. Aynı tokenizer'ın ürettiği kodlar bir **sıkıştırma biçimi** olarak da kullanılabiliyor: insan değerlendirmesine dayanan çalışmada bu kodların sıkıştırma kalitesi yürürlükteki video sıkıştırma standardını geçiyor ve yeni nesil standartla başa baş çıkıyor. Ayrıca aynı token'lar, video anlama görevlerinde de daha güçlü bir girdi oluyor. 82\. makaledeki sinir ses kodlayıcısı da tam olarak buydu: kodlayıcı, kuantize edici ve çözücüden oluşan bir düzen, hem sıkıştırma hem üretim için kullanılabilen tek bir temsil üretiyordu. İki modalitede aynı yapı, aynı ikili işlevle çıkıyor.

## Sıra icat edilmiştir

Şekil 1'in son kutusu bir varsayım taşıyor: dizi modeli, token'ların bir sırası olduğunu varsayar. Metinde bu varsayım bedava, çünkü sıra verinin kendi sırası. Görüntüde değil.

Bir görüntüyü soldan sağa, yukarıdan aşağıya taramak bir karardır ve iki bedeli vardır. Birincisi hız: 16×16'lık bir ızgara 256 ardışık adım demektir, ve 26\. makalede gördüğümüz gibi ardışık adım en pahalı şeydir. İkincisi ve daha derini, bağımlılık yapısı: bir hücrenin en güçlü ilişkileri dört bir yandaki komşularıyladır, oysa seçilen sıra onların yarısını "gelecek" tarafına atar.

Huiwen Chang ve arkadaşlarının CVPR 2022'de sunduğu çalışma sırayı tamamen bırakıyor: model bütün token'ları paralel olarak tahmin ediyor, en emin olduklarını sabitliyor, kalanları yeniden maskeleyip tekrar deniyor. 256 adım yerine sekiz yineleme yetiyor ve otoregresif kod çözmeye göre 64 kata varan hızlanma bildiriliyor. Keyu Tian ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma başka bir sıra öneriyor: sonraki token yerine **sonraki ölçek**. Model önce kaba bir çözünürlükte bütün görüntüyü üretiyor, sonra daha ince bir ölçekte, sonra daha da ince. Aynı otoregresif iskeletle, aynı veri kümesinde FID 18,65'ten 1,73'e, Inception puanı 80,4'ten 350,2'ye gidiyor ve çıkarım 20 kat hızlanıyor; üstelik ölçek büyütüldükçe kayıp 9\. makaledeki gibi düzenli bir güç yasası izliyor.

> **Kendini yokla:** Görüntü token'larını soldan sağa, yukarıdan aşağıya üretmek neden metindeki kadar doğal değil?

Çünkü metinde sıra verinin kendisine ait; 7\. makaledeki nedensel maske, dizinin gerçekten var olduğu yönü kopyalar. Görüntüde ise sırayı biz dayatıyoruz, ve dayatılan her sıra bir hücrenin komşularının bir kısmını erişilemez kılıyor — model, kararını verirken tam da kendisini en çok belirleyen bilginin bir bölümünü göremiyor. Paralel maskeleme ve kabadan inceye üretim tam bu yüzden kazanabiliyor: ikisi de "gelecek" diye bir yön tanımıyor, önce bütünün kaba hâlini kurup sonra ayrıntıyı dolduruyor.

## Tek gövde: erken kaynaşma ve ölçülmüş bedeli

Şimdi iddianın en saf hâline gelebiliriz; alanda bu düzene **erken kaynaşma** (early fusion) deniyor, çünkü modaliteler ayrı ayrı işlenip sonda birleştirilmek yerine daha modelin girişinde tek bir diziye karışıyor. Chameleon ekibinin 2024'te yayımladığı çalışma her şeyi tek bir diziye koyuyor: 512×512'lik bir görüntü 8192 kodluk bir defterden 1024 token'a çevriliyor, metin token'larıyla aynı dizide yer alıyor, ve tek bir Transformer tek bir softmax ile ikisini birden üretiyor. Ortak sözlüğün boyu 65.536 ve bunun 8.192'si görüntü kodları — yani metne kalan 57.344. Model, veri kümesinin üzerinden 2,1 tur geçerek toplam 9,2 trilyon token görüyor; kümedeki 2,9 trilyon token yalnızca metin.

Bu düzenin kazandırdığı şey açık ve bir yetenek farkına karşılık geliyor. 81\. makaledeki bağlantı yolları — izdüşüm, yeniden örnekleyici, kapılı çapraz dikkat — görüntüyü dil modeline **okutuyordu**; çıktı hep metindi. Tek sözlükte ise girdi ile çıktı arasındaki asimetri kalkıyor: model, bir cümlenin ortasında görüntü token'ları üretip sonra metne dönebiliyor. Metinle görüntünün gerçekten iç içe geçtiği belgeler bu yüzden doğal biçimde modelleniyor — aralarında bir dikiş yok.

Bedeli de ölçülmüş, ve tam olarak "tek softmax" kararından geliyor. Yazarlar eğitimde ıraksama yaşıyor ve nedenini şuraya bağlıyorlar: entropileri belirgin biçimde farklı iki modalite aynı softmax'ı paylaşınca, her modalite kendi normlarını biraz büyüterek diğeriyle **yarışıyor**; başlangıçta zararsız olan bu kayma, değerler kullanılan sayı biçiminin etkin aralığının dışına çıkınca ıraksamaya dönüşüyor. Kanıt bir ablasyonda: görüntü üretimi olmayan denemeler ıraksamıyor. Çözümleri normalleştirmenin yerini ve biçimini değiştirmek oluyor.

Bunu hafifletici bir dipnot olarak değil, iddianın fiyatı olarak okumak gerekiyor. "Her şey token" demek, birbirinden çok farklı istatistiklere sahip iki dağılımı tek bir olasılık dağılımının içine sıkıştırmak demek, ve o sıkışmanın eğitim kararlılığında bir karşılığı var.

İkinci bir fiyat bağlam penceresinde ödeniyor ve aritmetiği basit. Görüntü başına 1024 token demek, on görüntülük bir belgenin yalnızca görselleri için 10.240 token demek. 21\. makalede pencerenin neyi kapsadığını, 25 ve 26'da uzun bağlamın ve anahtar-değer önbelleğinin maliyetini görmüştük; birleşik bir modelde o maliyeti artık metin değil, görüntüler belirliyor. Bir modaliteyi sözlüğe sokmanın bedeli, o modalitenin pencerede kapladığı yerdir.

Bu bedelin modaliteye göre değiştiğini de söylemek gerekiyor, çünkü bütün modaliteler aynı zorlukta değil. 82\. makaledeki akustik token'lar zaten ayrıktı: sinir ses kodlayıcısı sesi kendi işi gereği kod defterlerine indiriyordu, yani sesin "sözlüğe sokulması" birleşik model için ayrıca ödenen bir bedel değil, o alanda zaten var olan bir temsil. Görüntüde durum farklı; orada kuantizasyon yalnızca dizi modeline yaranmak için yapılıyor. Jun Zhan ve arkadaşlarının ACL 2024'te sunduğu çalışma bu gözlemi bir mimariye çeviriyor: metin, görüntü, konuşma ve müziği ayrı ayrı ayrık dizilere çevirip hepsini tek bir dil modeliyle, gövdeye hiç dokunmadan işliyorlar. Aynı iddianın en iddialı hâli ise Emu3 ekibinin 2024'te yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışmada: yalnızca sonraki token tahminiyle eğitilmiş tek bir model, görüntü üretiminde ve görüntü-dil anlamada kendi alanlarının güçlü uzmanlaşmış modellerini geçtiğini bildiriyor.

## 30'un borcu: biçim garantisi burada mimari bir zorunluluk

Tek dizide çalışan bir model, görüntünün nerede başlayıp nerede bittiğini nereden biliyor? Cevap 30\. makaleden tanıdık olmalı.

30'da kısıtlı üretimi kurmuştuk: bir dilbilgisi ya da şema, her adımda hangi token'lara izin verileceğini belirler ve izin verilmeyenlerin olasılığı sıfırlanır. Orada bu, çıktıyı bir programın okuyabilmesi için konan bir katmandı. Burada aynı düzenek mimarinin **zorunlu** parçası: görüntünün başlangıcını ve bitişini işaretleyen özel token'lar vardır, ve model bir görüntünün içindeyken üretim görüntü alt sözlüğüne kısıtlanır. Uzunluk da sabittir — görüntü başına 1024 token — yani modelin nerede duracağını ayrıca öğrenmesi gerekmez.

30'un iki dersi olduğu gibi geçerli. Birincisi kısıtın **ne garanti ettiği**: çıktının sözdizimsel geçerliliği, yani token dizisinin gerçekten bir görüntüye çözülebilmesi. Garanti etmediği şey görüntünün istenen görüntü olması. İkincisi kısıtın **nasıl uygulandığı**: 30'da hizalamayı gözetmeyen bir maskenin doğruluğu 0,415'ten 0,345'e düşürdüğünü, token hizalı bir maskenin ise kısıtsız üretimin bir tık üstünde kaldığını görmüştük. Görüntü tarafında her kod tek bir token olduğu için 30'daki alt-kelime sınırı sorunu aynı biçimde doğmaz; kalan duyarlılık sınır token'ları ile sabit uzunluk sözleşmesindedir. Bu sözleşme bozulduğunda — başlangıç işaretinden sonra 1024'ten az ya da çok kod üretildiğinde — dizi bir görüntüye çözülemez; bu bizim çıkarımımız, kaynak bunu ayrıca ölçmüyor.

## Ayrık olmak zorunda mı?

Şimdi karşı tarafa geçelim, çünkü iddia tartışmalı ve karşı taraf ölçümle konuşuyor.

Tianhong Li ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma varsayımı doğrudan hedefliyor: otoregresif modellemenin ayrık token gerektirdiği yaygın kanısı bir zorunluluk değil, bir alışkanlık. Kategorik çapraz entropi yerine her token için bir difüzyon kaybı tanımlıyorlar; böylece dizi modeli sürekli değerli bir uzayda çalışabiliyor ve kuantize edici tamamen ortadan kalkıyor.

Chunting Zhou ve arkadaşlarının ICLR 2025'te sunduğu çalışma aynı fikri tek gövdede birleştiriyor: bir Transformer, iki hedef. Metin token'ları için sonraki token tahmini, görüntüler için difüzyon kaybı, ikisi de aynı dizide. 7 milyar parametre, 2 trilyon çok modlu token. Karşılaştırma tam olarak istediğimiz biçimde kurulmuş — aynı iskelet, tek fark görüntülerin kuantize edilip edilmediği:

- Eşit işlem sayısında, metinden görüntü üretiminde yaklaşık **iki kat** daha iyi FID.
- Görüntüden metne üretimde kuantize edilmiş düzenin başarısına, işlemin yalnızca **yüzde 21,8**'iyle ulaşılıyor.
- Ve şaşırtıcı olan: **metinden metne** üretimde bile eşitlenme, işlemin yüzde 50 ile 60'ında geliyor.

Şekil 2 bu üç düzeni — tek sözlük, tek gövde iki kayıp, ve büyük sözlüklü maskeli model — yan yana koyuyor. Son madde iddianın en zayıf noktasını gösteriyor. Görüntüleri kuantize etmenin bedeli yalnızca görüntü tarafında ödenmiyor; ortak sözlüğün ve ortak softmax'ın taşıdığı yük, modelin metin öğrenmesini de yavaşlatıyor.

![Üç satırlı karşılaştırma tablosu; sütunlar düzen, ne paylaşılır ve ne ayrı kalır, ölçülen sonuç. Birinci satır tek ortak sözlük: sözlük, kayıp ve softmax paylaşılır, yalnızca kodlayıcı ile çözücü ayrıdır; ölçülen sonuç, iç içe geçmiş belgelerin dikişsiz modellenmesi fakat tek softmax altında modalitelerin norm yarışına girip eğitimin ıraksaması, ve görüntü üretimi olmayan ablasyonun ıraksamaması. İkinci satır tek gövde iki kayıp: gövde, bağlam ve dikkat paylaşılır, kayıp ayrıdır ve görüntü sürekli değerli kalır; ölçülen sonuç, eşit işlemde yaklaşık iki kat daha iyi FID, görüntüden metne yüzde 21,8 işlemde eşitlenme, metinden metne yüzde 50 ila 60 işlemde eşitlenme. Üçüncü satır büyük sözlüklü maskeli dil modeli: sözlük ve kayıp paylaşılır, soldan sağa sıra bırakılmıştır; ölçülen sonuç, sözlük 262 bine çıkarıldığında dil modelinin difüzyonu geçmesi ve 256 adım yerine sekiz yineleme.](assets/birlestirmenin-uc-yolu.svg "Şekil 2 — Birleştirmenin üç yolu: ne paylaşılıyor, ne ölçülüyor")

## Modaliteler birbiriyle yarışır

Chameleon'un ıraksaması tekil bir aksaklık değil; daha genel bir olgunun keskin hâli. Armen Aghajanyan ve arkadaşlarının ICML 2023'te sunduğu çalışma karışık modaliteli modeller için ölçek yasaları kuruyor ve yasaya, tek tek modalitelerin katkılarının yanına bir de **etkileşim terimi** ekliyor: modaliteler birbirine yardım da edebiliyor, birbirini engelleyebiliyor da. Yazarlar bu terimi eğitim kararlılığıyla ilişkilendiriyor ve yasalarını 30 milyar parametreli bir konuşma-metin modeliyle sınıyorlar.

Sonuç 14\. makaledeki karışım tartışmasının doğal devamı: bir eğitim karışımında hangi kaynaktan ne kadar veri konacağı bir hiperparametreydi; çok modlu eğitimde aynı soru, modalitelerin birbirinin kapasitesini yiyip yemediği sorusuna dönüşüyor ve ölçülebiliyor.

Ölçme tarafında ise birleşik modeller kendine özgü bir zorluk taşıyor: iki ayrı cetvelle birden sınanmaları gerekiyor. Üretim tarafında 83\. makalede gördüğümüz nesne odaklı hizalama ölçütleri, anlama tarafında 81'deki çok modlu sınavlar. 71\. makalenin uyarısı burada iki kat geçerli, çünkü bir birleşik model iki cetvelin **hangisinde** ne kadar iyi olduğuna göre çok farklı yerlerde sıralanabiliyor; "birleşik model uzmanı geçti" cümlesi, hangi tarafın ölçüldüğü söylenmeden bir şey ifade etmiyor. Şekil 3 iddianın kazanç ve bedel hanelerini yan yana koyuyor.

![İki sütunlu defter tablosu; sol sütun tek sözlüğün kazandırdıkları, sağ sütun ödettikleri. Sol sütunda dört kalem: tek kayıp ve tek eğitim döngüsü; dil modelleri için kurulmuş servis ve önbellek altyapısının devralınması; metin ile görüntünün iç içe geçtiği belgelerin dikişsiz modellenmesi; ve seste bedelin zaten ödenmiş olması, çünkü akustik token'lar kendi alanında da ayrıktır. Sağ sütunda dört kalem: kuantizasyon kaybı geri alınamaz; sözlüğün kalitesi tavanı belirler; tek softmax altında modaliteler norm yarışına girer ve eğitim ıraksayabilir; ve pencere bedeli, görüntü başına 1024 token, on görüntü için 10.240 token. En altta bir kayıt: kuantizasyonu bırakan düzen eşit işlemde yaklaşık iki kat daha iyi FID veriyor ve metinden metne eşitlenmeyi işlemin yüzde 50 ila 60'ında yakalıyor.](assets/tek-sozlugun-defteri.svg "Şekil 3 — Tek sözlüğün defteri: kazandırdıkları ve ödettikleri")

> **Kendini yokla:** Görüntüleri kuantize etmenin bedeli neden metin başarısında da görülebiliyor?

Çünkü paylaşılan şey yalnızca dizi değil, kapasite. Ortak bir sözlükte 8.192 kod görüntüye ayrılmışsa çıktı katmanının bir bölümü oraya gider; ortak bir softmax iki dağılımı aynı ölçekte tutmaya zorlanır; ve ortak gövdenin parametreleri iki işi birden öğrenmek zorundadır. Görüntü tarafındaki kayıp ne kadar öğrenilmesi zor bir hedefse, gövdenin metne ayırabildiği pay o kadar azalır. Ölçüm de bunu söylüyor: kuantizasyonu kaldıran düzen, metinden metne eşitlenmeyi işlemin yarısında yakalıyor.

## Birleşik modellerin disiplini

**Kuantizasyon bir tokenizasyon kararıdır ve geri döndürülemez.** En yakın koda yuvarlanan her hücre bir farkı atar; 512 kodlu bir defterle bitte 42,6 katlık indirgeme, atılan şeyin büyüklüğünün de ölçüsüdür.

**Sözlüğün kalitesi model ailesinin tavanını belirler.** Aynı ölçütte dil modeli difüzyonun gerisindeyken, sözlük 262 bine çıkarılıp kuantizasyon biçimi değiştirilince sıralama tersine döndü; ayrıştırmada sıçramayı yapan adım sözlüğün büyütülmesiydi.

**Görüntüde sıra icat edilmiştir ve icat edilen sıranın bedeli vardır.** Tarama sırası hem 256 ardışık adım demektir hem de her hücrenin komşularının bir kısmını erişilemez kılar; paralel maskeleme sekiz yinelemeye, ölçek ölçek üretim 18,65'ten 1,73'e iniyor.

**Tek softmax bedava değildir.** Entropileri farklı iki modalite aynı çıktı dağılımını paylaşınca normlarını büyüterek yarışır ve eğitim ıraksayabilir; ablasyon, görüntü üretimi olmayan denemelerin ıraksamadığını gösteriyor.

**Biçim garantisi burada mimarinin parçasıdır.** Sınır token'ları ve alt sözlüğe kısıtlama, 30'daki kısıtlı üretimin aynısıdır: çıktının çözülebilir olduğunu garanti eder, doğru olduğunu değil.

**"Her şey token" bir zorunluluk değil, bir tasarım seçeneğidir.** Dizi modelinin kendisi ortak olabilir ama sözlük olmak zorunda değil; kuantizasyonu bırakan düzen eşit işlemde yaklaşık iki kat daha iyi FID veriyor ve metin tarafında bile yüzde 50–60 işlemde eşitleniyor.

**Modaliteler aynı gövdede yarışır.** Karışık modaliteli ölçek yasaları rekabeti ve sinerjiyi ayrı bir terim olarak modelliyor; hangisinin baskın olacağı ölçüme bağlı, varsayıma değil.

### Sırada ne var

Bu makale boyunca bir şeyi sabit tuttuk: modelin her token için bütün parametrelerini çalıştırdığını. Oysa iki makaledir konuştuğumuz maliyetlerin — eğitim işlemi, çıkarım hızı, bellek — hepsi bu varsayıma dayanıyor. Peki parametre sayısı ile her token için harcanan hesabı birbirinden ayırmak mümkün olsaydı? Bir sonraki makale, 20\. makalede bir borç olarak bıraktığımız mimariyi kuruyor: modelin yalnızca bir bölümünü çalıştıran, toplam parametresi çalışan parametresinden kat kat büyük olan modeller.

## Kaynakça

- van den Oord, A., Vinyals, O. & Kavukcuoglu, K. (2017). *Neural Discrete Representation Learning*. NeurIPS 2017. [Bağlantı](https://papers.nips.cc/paper_files/paper/2017/hash/7a98af17e63a0ac09ce2e96d03992fbc-Abstract.html)
- Esser, P., Rombach, R. & Ommer, B. (2021). *Taming Transformers for High-Resolution Image Synthesis*. IEEE/CVF CVPR 2021. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2021/html/Esser_Taming_Transformers_for_High-Resolution_Image_Synthesis_CVPR_2021_paper.html)
- Yu, L., Lezama, J., Gundavarapu, N. B., Versari, L., Sohn, K., Minnen, D., Cheng, Y., Birodkar, V., Gupta, A., Gu, X., Hauptmann, A. G., Gong, B., Yang, M.-H., Essa, I., Ross, D. A. & Jiang, L. (2024). *Language Model Beats Diffusion — Tokenizer is Key to Visual Generation*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/036912a83bdbb1fd792baf6532f102d8-Abstract-Conference.html)
- Chang, H., Zhang, H., Jiang, L., Liu, C. & Freeman, W. T. (2022). *MaskGIT: Masked Generative Image Transformer*. IEEE/CVF CVPR 2022. [Bağlantı](https://openaccess.thecvf.com/content/CVPR2022/html/Chang_MaskGIT_Masked_Generative_Image_Transformer_CVPR_2022_paper.html)
- Tian, K., Jiang, Y., Yuan, Z., Peng, B. & Wang, L. (2024). *Visual Autoregressive Modeling: Scalable Image Generation via Next-Scale Prediction*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/9a24e284b187f662681440ba15c416fb-Abstract-Conference.html)
- Chameleon Team (2024). *Chameleon: Mixed-Modal Early-Fusion Foundation Models*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2405.09818. [Bağlantı](https://arxiv.org/abs/2405.09818)
- Li, T., Tian, Y., Li, H., Deng, M. & He, K. (2024). *Autoregressive Image Generation without Vector Quantization*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/66e226469f20625aaebddbe47f0ca997-Abstract-Conference.html)
- Zhou, C., Yu, L., Babu, A., Tirumala, K., Yasunaga, M., Shamis, L., Kahn, J., Ma, X., Zettlemoyer, L. & Levy, O. (2025). *Transfusion: Predict the Next Token and Diffuse Images with One Multi-Modal Model*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/12678c3948153f4bc391f51e2082bd6e-Abstract-Conference.html)
- Zhan, J., Dai, J., Ye, J., Zhou, Y., Zhang, D., Liu, Z., Zhang, X., Yuan, R., Zhang, G., Li, L., Yan, H., Fu, J., Gui, T., Sun, T., Jiang, Y. & Qiu, X. (2024). *AnyGPT: Unified Multimodal LLM with Discrete Sequence Modeling*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.521/)
- Emu3 Team (2024). *Emu3: Next-Token Prediction is All You Need*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2409.18869. [Bağlantı](https://arxiv.org/abs/2409.18869)
- Aghajanyan, A., Yu, L., Conneau, A., Hsu, W.-N., Hambardzumyan, K., Zhang, S., Roller, S., Goyal, N., Levy, O. & Zettlemoyer, L. (2023). *Scaling Laws for Generative Mixed-Modal Language Models*. ICML 2023. [Bağlantı](https://proceedings.mlr.press/v202/aghajanyan23a.html)
