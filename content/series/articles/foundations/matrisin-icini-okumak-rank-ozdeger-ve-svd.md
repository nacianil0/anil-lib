---
article_id: article_213d3970-cd5e-4300-9c48-576d86ef732b
title: "Matrisin İçini Okumak: Rank, Özdeğer ve SVD"
slug: matrisin-icini-okumak-rank-ozdeger-ve-svd
category: foundations
level: advanced
reading_order: 92
summary: "91'de matrisi bir dönüşüm olarak kurduk; bu makale o dönüşümün içindeki ikinci sayıyı — gerçekte kaç bağımsız yönde iş yaptığını — kuruyor. Dokuz sayı taşıyan bir matrisin iki bağımsız yönü olabiliyor; özdeğerlerin hepsi sıfır olan bir matris hiç de etkisiz olmayabiliyor. Tekil değer ayrışımı her matrisi dönme, gerdirme ve dönmeye ayırır; en iyi düşük ranklı yaklaşıklığın hatasını kesilen tekil değerler belirler — spektral normda tam olarak kesilen ilk tekil değer. Ölçümler hem iddiayı destekliyor hem sınırlıyor: bir ağın ağırlıklarının yüzde 95'inden fazlası tahmin edilebiliyor, ama ham tekil değer kesmesi LLaMA 2-7B'nin perplexity'sini 5,47'den 18.192'ye çıkarıyor. Katman seçerek yüksek dereceli bileşenleri atmak ise doğruluğu 13,1'den 24,0'a taşıyor — çünkü Eckart–Young matrisi eniyiler, modeli değil."
tags:
  - rank
  - tekil-deger
  - ozdeger
  - dusuk-rank
  - matris-sikistirma
content_hash: sha256:b7fe6d4bfae4f1b0f7c22f2f4eff3fd392c5057676e51fe0e57a01f6806837c2
classification_version: 1
classification_batch: 22
revised_at: "2026-09-25"
revision_note: "Özdeğer ile tekil değer, birim çemberin elipse döndüğü yeni bir şekille anlatıldı; Eckart–Young hatasının hangi normda neye eşit olduğu düzeltildi."
---
## Dokuz sayı, iki yön

91\. makalede matrisi bir doğrusal dönüşümün yazılı hâli olarak kurduk: sütunları taban vektörlerinin nereye gittiğini söylüyor. Sonda bir soru bırakmıştık — bir embedding tablosunu daha büyük bir matrisin sıkıştırılmış hâli olarak görmek mümkünse, "sıkıştırmak" tam olarak ne demek?

Cevap, bir matrisin ikinci sayısında saklı. Bir matrisin boyutu kaç satır kaç sütun taşıdığını söyler; ama gerçekte **kaç bağımsız yönde** iş yaptığını söylemez. Bu makalenin işi o ikinci sayıyı kurmak ve onun neyi mümkün, neyi imkânsız kıldığını göstermek.

Somut başlayalım. Şu üç satırlı matrisi al: birinci satır (1; 0; 1), ikinci satır (0; 1; 1), üçüncü satır (1; 1; 2). Dokuz sayı var. Ama üçüncü satır, ilk ikisinin toplamıdır ve yeni hiçbir bilgi taşımaz. Aynı şey sütunlar için de geçerli: üçüncü sütun, ilk iki sütunun toplamıdır.

Birbirinin katları ve toplamları olarak yazılamayan vektörlere **doğrusal bağımsız** denir. Bir matrisin **rankı**, bağımsız sütunlarının (aynı sayıya eşit olarak: bağımsız satırlarının) sayısıdır. Bu matrisin rankı 2. 19\. makalede rankı "eklenen güncellemenin kaç yön taşıdığı" diye tanımlamıştık; biçimsel karşılığı budur.

![Üç satırlı ve üç sütunlu bir matris gösterilir: birinci satır 1, 0, 1; ikinci satır 0, 1, 1; üçüncü satır 1, 1, 2. Sağında iki bağımlılık yazılıdır: üçüncü satır birinci ile ikincinin toplamıdır ve üçüncü sütun birinci ile ikincinin toplamıdır. Altta iki kutu vardır. Sol kutu boyut: üç çarpı üç, dokuz sayı saklanır. Sağ kutu rank: iki, yani iki bağımsız yön. En altta bir kayıt: dokuz sayının hepsini saklamak gerekmez; iki bağımsız yön ve onların karışım katsayıları matrisi eksiksiz belirler.](assets/dokuz-sayi-iki-yon.svg "Şekil 1 — Boyut ile rank aynı şey değildir")

Şekil 1'deki ayrımın pratik sonucu şu: dokuz sayının hepsini saklamak gerekmiyor. İki bağımsız yön ile onların karışım katsayılarını saklamak yeter — ve bu, düşük ranklı sıkıştırmanın bütün fikridir.

Kazancın ne zaman gerçek olduğunu tek satırda yazabiliriz. Satır sayısı m, sütun sayısı n olan bir matris m çarpı n sayı tutar. Aynı matrisi rank r'lik iki ince parça olarak saklarsan r çarpı (m artı n) sayı tutarsın. İkincisi ancak r, m çarpı n bölü (m artı n) değerinden küçükse ucuzdur. Kare ve büyük matrislerde bu eşik boyutun yarısı mertebesindedir; yani rank yarıdan küçük olduğu sürece kazanç var ve rank küçüldükçe kazanç doğrusal büyür. Örneğimizde m ve n 3, eşik 1,5; rank 2 olduğu için bu minik matriste saklama kazancı **yok** — kazanç ölçekle gelir.

## Özdeğer ile tekil değer aynı şey değil

Karışması en kolay iki kavramla devam edelim; ikisini yan yana koymak, ayrı ayrı tanımlamaktan daha öğreticidir.

Bir kare matris için **özvektör** (eigenvector), dönüşümden geçtiğinde yönü değişmeyen sıfırdan farklı bir vektördür; yalnızca uzar ya da kısalır. Ne kadar uzadığını söyleyen sayıya **özdeğer** (eigenvalue) denir. Soru yalnızca kare matriste sorulabilir ve cevap negatif, hatta karmaşık bir sayı olabilir: düzlemi 90 derece döndüren bir matrisin yönünü koruyan hiçbir gerçek vektörü yoktur. Örnek: A matrisi birinci satırı (3; 1), ikinci satırı (1; 3) olsun. (1; 1) vektörünü geçir: (3 + 1; 1 + 3) = (4; 4), yani aynı yön, dört katı. Demek ki (1; 1) bir özvektör ve özdeğeri 4. (1; −1) vektörünü geçir: (3 − 1; 1 − 3) = (2; −2), yani özdeğeri 2.

**Tekil değer** (singular value) başka bir soruyu cevaplar: dönüşüm, birim uzunluktaki vektörleri en çok ne kadar gerdiriyor, sonra ona dik yönde ne kadar? Yön korunması şart değil. Bu yüzden tekil değerler her matris için tanımlıdır — kare olmayanlar için de — ve hep sıfır ya da pozitiftir.

Farkı gösteren en temiz örnek şu: birinci satırı (0; 2), ikinci satırı (0; 0) olan B matrisi. Bu matrisin iki özdeğeri de sıfırdır. "Özdeğerleri sıfır" cümlesini "hiçbir şey yapmıyor" diye okumak isteyebilirsin — yanlış olur: B, (0; 1) vektörünü (2; 0)'a taşır, yani uzunluğunu iki katına çıkarır. Tekil değerleri 2 ve 0'dır ve asıl doğruyu bunlar söyler.

İki cetvelin farkını en iyi, bir matrisin birim çemberi nereye götürdüğüne bakarak görürsün. Çemberin üzerindeki her nokta uzunluğu 1 olan bir vektördür; matristen geçen bütün bu vektörlerin uçları yeni bir şekil çizer. Tekil değerler o şeklin yarı eksenleridir.

![İki panelli geometrik şekil. Sol panelde A matrisi, satırları 3 1 ve 1 3: kesikli birim çember, eksenleri çapraz duran bir elipse dönüşür; uzun yarı ekseni 4 ve (1; 1) yönünde, kısa yarı ekseni 2 ve (1; −1) yönünde. Yarı eksenler tekil değerler 4 ve 2; aynı eksenler özvektörler, özdeğerler de 4 ve 2. Sağ panelde B matrisi, satırları 0 2 ve 0 0: çember yatay eksende −2'den 2'ye uzanan bir doğru parçasına ezilir; (0; 1) vektörü (2; 0)'a gider. Tekil değerler 2 ve 0, özdeğerler 0 ve 0. Altta kayıt: tekil değerler birim çemberin gittiği şeklin yarı eksenleridir; çizim ölçekli ve iki matristen hesaplanmıştır.](assets/ozdeger-tekil-deger.svg "Şekil 2 — Tekil değerler çemberin gittiği şeklin yarı eksenleridir")

Şekil 2 iki matrisi bu gözle çiziyor. A çemberi, eksenleri (1; 1) ve (1; −1) yönünde duran bir elipse çevirir; yarı eksenlerin uzunlukları 4 ve 2, yani tekil değerler. Aynı iki eksen A'nın özvektörleridir ve özdeğerler de aynı sayılardır: A gibi simetrik ve gerdirmesi hep pozitif olan matrislerde iki cetvel çakışır. Bu rastlantı değil, simetrik matrislerin genel bir özelliğine dayanıyor — özdeğerleri hep gerçektir ve özvektörleri birbirine diktir; elipsin eksenlerinin dik durması bundandır. B ise çemberi yatay eksende uzunluğu 4 olan bir doğru parçasına ezer: en uzun yarı eksen 2, öbürü 0. Özdeğerler bu gerdirmeyi göremez, çünkü B'nin yönünü koruyan tek vektör ailesi (1; 0) doğrultusudur ve B onu sıfıra götürür. Genel durumda iki cetvel çakışmaz ve karıştırılırsa yanlış sonuç verir.

Bu özel durum boş bir ayrıntı değil, çünkü veri çözümlemesinde en sık karşılaşılan matris tam olarak o türdendir. Bir veri kümesinin ortalaması çıkarıldıktan sonra kurulan **kovaryans matrisi** simetriktir; özvektörleri verinin en çok yayıldığı yönleri, özdeğerleri de o yönlerdeki yayılım miktarını verir. Bu işlemin adı temel bileşen çözümlemesidir ve Bishop'un kitabı 12.1 bölümünde (s. 561) kurar. Aynı yönler, ortalanmış veri matrisinin tekil vektörleridir — yani iki hesap tek hesaptır. 91\. makalede gördüğümüz "en baskın birkaç yönü atmak temsilleri iyileştiriyor" düzeltmesinin ne yaptığı da böylece görünür hâle geliyor: atılan şey, kovaryansın en büyük özdeğerlerine karşılık gelen yönlerdir.

> **Kendini yokla:** Bütün özdeğerleri sıfır olan bir matrisin "etkisiz" olmadığını hangi tek ölçüm gösterir?

Tekil değerlerinden en büyüğü. O sayı, birim uzunluktaki bir vektörün ulaşabileceği en büyük çıktı uzunluğudur; sıfırdan büyükse matris en az bir yönde gerçek bir iş yapıyordur. B örneğinde bu sayı 2'dir.

## Bir matrisin en iyi küçük hâli

Makalenin merkezindeki teorem bu geometrinin üstüne kurulu. **Tekil değer ayrışımı** (singular value decomposition, SVD) her matrisi üç parçaya ayırır: bir dönme, eksenler boyunca bir gerdirme ve bir dönme daha. Gerdirme miktarları tekil değerlerdir ve büyükten küçüğe sıralanır. Şekil 2'deki elips tam bu üç adımla çizilir: çemberi döndür (çember döndürülünce değişmez), eksenler boyunca 4 ve 2 kat gerdir, sonra oluşan elipsi çapraz konuma döndür. Ayrışımın tarihi 91\. makalede kullandığımız dilden eski: G. W. Stewart'ın SIAM Review'da yayımladığı tarihçe, Eugenio Beltrami'nin 1873 tarihli çalışmasını ve Camille Jordan'ın hemen ardından gelen kurulumunu ayrışımın ataları sayıyor.

Ayrışımın verdiği şey bir yeniden yazım kuralıdır: matris, tekil değerlerle ağırlıklandırılmış basit parçaların toplamı olarak yazılabilir. En büyük tekil değere karşılık gelen parça en çok bilgi taşır, sonrakiler gitgide azını.

A matrisimizle yapalım — birinci satır (3; 1), ikinci satır (1; 3), tekil değerleri 4 ve 2. Yalnızca ilk parçayı tutarsak elde ettiğimiz matris bütün girdileri 2 olan matristir: birinci satır (2; 2), ikinci satır (2; 2). Bu matrisin rankı 1'dir. Yaptığımız hatayı ölçelim: A eksi bu yaklaşıklık, birinci satırı (1; −1), ikinci satırı (−1; 1) olan matristir. Bir matrisin bütün girdilerinin karelerini toplayıp karekökünü alan ölçüye **Frobenius normu** denir; hata matrisinin Frobenius normu dört tane 1'den, yani 2.

İki'yi bir yerde daha gördük: kestiğimiz tekil değer. Bu tesadüf değil. Erhard Schmidt'in 1907'de kurduğu ve Carl Eckart ile Gale Young'ın 1936'da dikdörtgen matrislere genişleterek yeniden keşfettiği sonuç şunu söyler: **en iyi düşük ranklı yaklaşıklık, tekil değer ayrışımını baştan keserek elde edilir ve yapılan hatayı kesilen tekil değerler belirler.** (Stewart'ın tarihçesi buradaki adlandırmayı da düzeltiyor: teoremin sahibi Schmidt'tir, "Eckart–Young" adı alanın kısayoludur.)

Hatanın tam olarak hangi sayıya eşit olduğu, onu hangi cetvelle ölçtüğüne bağlı. Hata matrisinin bir birim vektörü en çok ne kadar uzattığına bakan cetvelde (spektral norm) hata, kesilen **ilk** tekil değerdir. Frobenius normunda ise kesilen **bütün** tekil değerlerin karelerinin toplamının kareköküdür. Örneğimizde yalnızca bir tekil değer kestiğimiz için iki cetvel aynı sayıyı veriyor: 2. Tekil değerleri 5, 3 ve 1 olan bir matrisi rank 1'e indirseydin, spektral hata 3, Frobenius hatası ise karekök (9 + 1), yani yaklaşık 3,16 olurdu.

![Üç adımlı bir hesap şeması. Birinci kutuda A matrisi: birinci satır 3 ve 1, ikinci satır 1 ve 3; yanında tekil değerleri 4 ve 2 yazılıdır. İkinci kutuda en iyi rank-1 yaklaşıklık: bütün girdileri 2 olan matris; Frobenius normu 4, yani en büyük tekil değerin kendisi. Üçüncü kutuda hata matrisi: birinci satır 1 ve eksi 1, ikinci satır eksi 1 ve 1; Frobenius normu 2, yani kesilen ikinci tekil değerin kendisi. Altta iki kayıt: 16 artı 4 eşittir 20, bu A'nın Frobenius normunun karesidir; tutulan payın oranı 16 bölü 20, yani yüzde 80. En altta teoremin cümlesi: en iyi düşük ranklı yaklaşıklık baştan kesmekle elde edilir; burada tek bir tekil değer kesildiği için hata 2'dir, genelde Frobenius hatası kesilen bütün tekil değerlerin karelerinin toplamının kareköküdür.](assets/kesmenin-bedeli.svg "Şekil 3 — Kesilen tekil değerler, yapılan hatayı belirler")

Şekil 3 hesabı adım adım gösteriyor. Bir sayı daha: A'nın Frobenius normunun karesi 20 ve bu, tekil değerlerin kareleri toplamına eşit (16 artı 4). Tuttuğumuz payın oranı 16 bölü 20, yani yüzde 80. "Tekil değer spektrumunun ne kadarını tuttun" sorusu bu yüzden anlamlıdır: spektrum, bilginin nasıl dağıldığını okunur biçimde verir.

Bu teoremin ilk büyük dil uygulaması sinir ağlarından çok önce geldi. Scott Deerwester ve arkadaşlarının 1990'da yayımladığı çalışma, terimleri satır belgeleri sütun yapan dev ve seyrek bir matris kuruyor, sonra tekil değer ayrışımını baştan keserek onu birkaç yüz boyuta indiriyordu. Kesmenin kendisi yöntemin amacıydı: aynı konudan söz eden farklı kelimeler, kesilmiş uzayda birbirine yaklaşıyor ve sorguda geçmeyen bir kelimeyi içeren belge de bulunabiliyordu. 42\. makaledeki sözcük eşleşmesinin yapısal kusuruna verilen ilk cevap budur ve 91\. makalede gördüğümüz "embedding aslında bir matris ayrıştırmasıdır" sonucunun da atasıdır.

## Ağırlıklar gerçekten düşük ranklı mı

Teorem elimizde. Şimdi ampirik soru: sinir ağlarının ağırlık matrisleri gerçekten az sayıda yönde mi çalışıyor?

En eski işaret NeurIPS 2013'ten. Misha Denil ve arkadaşları, bir ağın her özniteliği için yalnızca birkaç ağırlık değeri verildiğinde geri kalanının doğru tahmin edilebildiğini gösterdi; en iyi durumda ağırlıkların yüzde 95'inden fazlası hiç öğrenilmeden tahmin edilebiliyor ve doğruluk düşmüyordu. Yani parametrelerdeki fazlalık yeni bir gözlem değil.

19\. makalede iki ölçümü zaten görmüştük ve şimdi ikisini de tekil değer diliyle okuyabiliriz. Armen Aghajanyan ve arkadaşlarının içsel boyut ölçümü — BERT-Base için 1.608, RoBERTa-Large için 207 — "bir göreve uyum kaç bağımsız yön gerektirir" sorusunun cevabıydı. Edward Hu ve arkadaşlarının LoRA çalışmasında rank 1'in bile yetmesi ise tekil değer spektrumunun ilk basamağının ne kadar baskın olduğunu gösteriyor: yazarlar rank 8 ile rank 64 ile öğrenilen güncellemelerin, normalleştirilmiş benzerliği 0,5'in üzerinde olan tek boyutluk bir alt uzayı paylaştığını ölçüyor. Geri kalan yönler büyük ölçüde eğitim gürültüsü.

Ama tablo tek yönlü değil. Charles Martin ve Michael Mahoney'nin JMLR'de yayımladığı çalışma, eğitilmiş ağırlık matrislerinin tekil değer dağılımının rastgele matrislerinkine benzemediğini, **ağır kuyruklu** olduğunu ölçüyor: birkaç büyük yönün yanında, gürültü sayılamayacak uzun bir kuyruk var. Aynı gerilimi 19\. makalede de görmüştük — tam ince ayarın ağırlıklarda yarattığı değişimin rankı, tipik LoRA yapılandırmalarından on ila yüz kat yüksekti.

Bu gerilimin etrafından dolaşmanın matematiksel bir yolu var ve rankın basit bir özelliğinden çıkıyor: iki matrisin toplamının rankı, rankların toplamını aşamaz — ama **her birinden büyük olabilir**. Vladislav Lialin ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu doğrudan bir eğitim yöntemine çeviriyor: düşük ranklı bir güncellemeyi bir süre eğit, ana ağırlığa ekle, sıfırdan yeni bir düşük ranklı güncelleme başlat. Tek tek her adım düşük ranklı, birikmiş değişim yüksek ranklı. 1,3 milyar parametreye kadar dil modellerinde sıradan eğitimle karşılaştırılabilir sonuç veriyor, kart başına 5,5 gigabayta kadar bellek kazandırıyor ve donanıma göre eğitimi yüzde 9 ile 40 arasında hızlandırıyor.

İkinci yol, rank bütçesini eşit dağıtmayı bırakmak. Qingru Zhang ve arkadaşlarının ICLR 2023'te sunduğu çalışma, güncellemeyi doğrudan tekil değer ayrışımı biçiminde parametreleştiriyor ve bütçeyi matrislerin önem puanına göre paylaştırıyor: bazı katmanlara daha çok yön, bazılarına daha az. İkisinin ortak varsayımı aynı — "düşük rank" bir yasa değil, ayarlanabilir bir bütçe.

## En iyi yaklaşıklık en iyi model değildir

Eckart–Young teoremi "en iyi" derken belirli bir şeyi kastediyor: **matrisin kendisine** en yakın düşük ranklı matris. Ama bir ağırlık matrisi kendi başına bir amaç değil; modelin kaybını düşürmek için orada. Bu iki "en iyi" örtüşmez.

Xin Wang ve arkadaşlarının ICLR 2025'te sunduğu çalışma farkı ölçüyor. LLaMA 2-7B'nin WikiText-2 üzerindeki perplexity'si 5,47. Ağırlıklara doğrudan tekil değer kesmesi uygulayıp modeli yüzde 20 küçültürsen perplexity **18.192**'ye çıkıyor — model tamamen bozuluyor. Aynı sıkıştırma oranında, kesmenin kayba etkisini hesaba katan ve kesme sonrası ağırlıkları güncelleyen yöntemleriyle perplexity 7,73'te kalıyor. Aradaki uçurum teoremin yanlış olduğunu göstermiyor; teoremin **başka bir soruyu** cevapladığını gösteriyor.

Ters yönde daha da şaşırtıcı bir ölçüm var. Pratyusha Sharma, Jordan Ash ve Dipendra Misra'nın ICLR 2024'te sunduğu çalışma, eğitilmiş bir modelde **seçilmiş katmanların** yüksek dereceli tekil bileşenlerini atmanın başarıyı artırdığını buluyor. GPT-J'nin CounterFact kümesindeki doğruluğu 13,1; tek bir katmanda yapılan en iyi kesmeden sonra 24,0; birkaç katmandaki kesmeler birleştirildiğinde 29,2. Ek parametre, ek veri ya da ek eğitim kullanılmıyor; yapılan tek şey bileşen silmek.

> **Kendini yokla:** Aynı işlem — yüksek dereceli tekil bileşenleri atmak — neden bir çalışmada modeli bozup diğerinde iyileştiriyor?

Çünkü ikisi aynı işlemi farklı yerlere uyguluyor. Bütün ağırlık matrislerini birden kesmek, modelin hesabını her katmanda bozar ve hatalar birikir. Belirli katmanlarda kesmek ise, o katmanların kuyruk yönlerinde biriken gürültüyü siler; çalışmanın kendi çerçevesi de böyle. Ölçünün adı bir, uygulandığı yer başka.

Bu iki sonucun ortak dersi ölçüt seçimiyle ilgili. Eckart–Young'ın "en iyi"si Frobenius normuna göre en iyidir; modelin umursadığı büyüklük ise kayıptır. İki ölçüt aynı sıralamayı vermediği sürece, matris düzeyinde en iyi olan çözüm model düzeyinde en iyi olmak zorunda değil. Sıkıştırma çalışmalarının kesme öncesinde veriye bakıp ağırlıkları yeniden ölçeklemesi ya da kesme sonrasında düzeltme yapması tam olarak bu boşluğu kapatma çabası.

## Rankın mimarideki yeri

Kapatmadan önce rankın mimaride nerede göründüğüne bakalım, çünkü ikisi de 7\. makaleye bağlanıyor.

Srinadh Bhojanapalli ve arkadaşlarının ICML 2020'de sunduğu çalışma, çok başlı dikkatte baş sayısı ile baş başına düşen boyut arasındaki bölüşümün bir **rank darboğazı** yarattığını gösteriyor: baş boyutu dizi uzunluğunun altına düştüğünde, o başın üretebileceği dikkat örüntüleri kümesi rank tarafından sınırlanıyor.

Yihe Dong, Jean-Baptiste Cordonnier ve Andreas Loukas'ın ICML 2021'de sunduğu çalışma daha keskin: artık bağlantılar ve ileri beslemeli katmanlar olmadan, saf dikkat yığınının çıktısı derinlikle **çift üstel** hızda rank 1'e yakınsıyor — yani bütün token'lar aynılaşıyor. Artık bağlantı ile ileri beslemeli katman bu çöküşü durduruyor. 7\. makalede artık bağlantının işini eğitilebilirlik çerçevesinde kurmuştuk; burada aynı bileşenin ikinci bir işi ölçülüyor ve ikisi karıştırılmamalı.

Son olarak rank bir düzenleme aracı da olabilir. Kevin Meng ve arkadaşlarının NeurIPS 2022'de sunduğu ve 18\. makalede tanıştığımız çalışma, bir olguyu değiştirmek için ileri beslemeli katmanın matrisine **rank-1** bir güncelleme uyguluyor: tek bir yön eklemek, tek bir olguyu değiştirmeye yetiyor. Buradaki varsayım 18\. makalede kurduğumuz okumayla aynı: ileri beslemeli katman bir anahtar-değer belleği gibi çalışıyorsa, tek bir anahtarın karşılığını değiştirmek tek bir dış çarpım eklemekle yapılabilir. Rank yalnızca bir sıkıştırma bütçesi değil, aynı zamanda bir müdahalenin **ne kadar dar** olduğunun ölçüsü.

Bu üç örnek bir arada okunduğunda rankın seride üç ayrı rol üstlendiği görülüyor: bir **sıkıştırma bütçesi** (19 ve 92), bir **ifade sınırı** (dikkat başlarının darboğazı) ve bir **müdahale genişliği** (olgu düzenleme). Üçü de aynı sayıyı kullanıyor ama üçü de farklı bir soruyu cevaplıyor; bir çalışmanın "düşük rank" dediği yerde hangisini kastettiğini sormak, sayıyı okumanın ilk adımı.

### Sırada ne var

İki makaledir uzayı ve onu değiştiren dönüşümü kuruyoruz. Ama modelin ürettiği şey bir vektör değil: sözlükteki her token'a bir sayı veren, toplamı 1 olan bir liste. O listenin adını 5\. makaleden beri biliyoruz ve ondan 10\. makaledeki kurallarla token çekiyoruz. Bir sonraki makale o nesneyi biçimsel olarak kuruyor: bir olasılık dağılımı tam olarak nedir, "beklenen değer" hangi işlemdir ve eğitimin azalttığı kayıp neden başka bir şey değil de tam olarak o?

## Kaynakça

- Axler, S. (2024). *Linear Algebra Done Right* (4. baskı). Springer, açık erişim; özdeğerler 5A (s. 133), tekil değer ayrışımı 7E (s. 270–279) ve sonuçları 7F (s. 280). [Bağlantı](https://linear.axler.net/)
- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*. Springer; temel bileşen çözümlemesi 12.1 (s. 561–570). [Bağlantı](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)
- Stewart, G. W. (1993). *On the Early History of the Singular Value Decomposition*. SIAM Review 35(4), 551–566. [Bağlantı](https://doi.org/10.1137/1035134)
- Eckart, C. & Young, G. (1936). *The Approximation of One Matrix by Another of Lower Rank*. Psychometrika 1(3), 211–218. [Bağlantı](https://doi.org/10.1007/BF02288367)
- Deerwester, S., Dumais, S. T., Furnas, G. W., Landauer, T. K. & Harshman, R. (1990). *Indexing by Latent Semantic Analysis*. Journal of the American Society for Information Science 41(6), 391–407. [Bağlantı](https://doi.org/10.1002/%28SICI%291097-4571%28199009%2941%3A6%3C391%3A%3AAID-ASI1%3E3.0.CO%3B2-9)
- Denil, M., Shakibi, B., Dinh, L., Ranzato, M. & de Freitas, N. (2013). *Predicting Parameters in Deep Learning*. NeurIPS 2013. [Bağlantı](https://papers.nips.cc/paper_files/paper/2013/hash/7fec306d1e665bc9c748b5d2b99a6e97-Abstract.html)
- Aghajanyan, A., Gupta, S. & Zettlemoyer, L. (2021). *Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning*. ACL-IJCNLP 2021. [Bağlantı](https://aclanthology.org/2021.acl-long.568/)
- Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L. & Chen, W. (2022). *LoRA: Low-Rank Adaptation of Large Language Models*. ICLR 2022. [Bağlantı](https://openreview.net/forum?id=nZeVKeeFYf9)
- Martin, C. H. & Mahoney, M. W. (2021). *Implicit Self-Regularization in Deep Neural Networks: Evidence from Random Matrix Theory and Implications for Learning*. Journal of Machine Learning Research 22(165), 1–73. [Bağlantı](https://www.jmlr.org/papers/v22/20-410.html)
- Lialin, V., Muckatira, S., Shivagunde, N. & Rumshisky, A. (2024). *ReLoRA: High-Rank Training Through Low-Rank Updates*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=DLJznSp6X3)
- Zhang, Q., Chen, M., Bukharin, A., He, P., Cheng, Y., Chen, W. & Zhao, T. (2023). *AdaLoRA: Adaptive Budget Allocation for Parameter-Efficient Fine-Tuning*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=lq62uWRJjiY)
- Wang, X., Zheng, Y., Wan, Z. & Zhang, M. (2025). *SVD-LLM: Truncation-aware Singular Value Decomposition for Large Language Model Compression*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=LNYIUouhdt)
- Sharma, P., Ash, J. T. & Misra, D. (2024). *The Truth is in There: Improving Reasoning in Language Models with Layer-Selective Rank Reduction*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/4c2092ec0b1370cce3fb5965ab255fae-Abstract-Conference.html)
- Bhojanapalli, S., Yun, C., Rawat, A. S., Reddi, S. & Kumar, S. (2020). *Low-Rank Bottleneck in Multi-head Attention Models*. ICML 2020. [Bağlantı](https://proceedings.mlr.press/v119/bhojanapalli20a.html)
- Dong, Y., Cordonnier, J.-B. & Loukas, A. (2021). *Attention is not all you need: pure attention loses rank doubly exponentially with depth*. ICML 2021. [Bağlantı](https://proceedings.mlr.press/v139/dong21a.html)
- Meng, K., Bau, D., Andonian, A. & Belinkov, Y. (2022). *Locating and Editing Factual Associations in GPT*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/6f1d43d5a82a37e89b0665b33bf3a182-Abstract-Conference.html)
