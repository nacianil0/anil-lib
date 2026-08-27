---
article_id: article_bbe0959b-8e31-451f-9c73-32b50dcc254f
title: "Transformer: Modern Dil Modellerinin Mimarisi"
slug: transformer-modern-dil-modellerinin-mimarisi
category: models-and-training
level: beginner
reading_order: 7
summary: "Tek bir dikkat işlemini çalışan bir mimariye çeviren adımı kurar: Transformer bloğunun anatomisi, çok başlı dikkat, sırayı dışarıdan veren pozisyon kodlaması ve yinelemeyi atmanın getirdiği paralellik."
tags:
  - transformer
  - transformer-blogu
  - cok-basli-dikkat
  - pozisyon-kodlama
  - paralellik
content_hash: sha256:0000000000000000000000000000000000000000000000000000000000000000
classification_version: 1
classification_batch: 1
---
## Aynı bloğu üst üste koymak

6\. makale iki eksiği adlandırarak bitmişti. Bir dikkat katmanı her token'ın vektörünü bağlamla yeniden yazabiliyordu ama sırayı göremiyordu: "yüz lira" ile "lira yüz" o katman için ayırt edilemez. İkincisi, tek bir tartım bir cümledeki bütün ilişki türlerini aynı anda yakalamak zorunda kalınca kaçınılmaz olarak bulanıklaşıyordu. 3\. makaleden de bir cümle taşıyalım: bir katman girdisini yeni bir dile çevirir ve her katmanın çıktısı girdinin yeni bir temsilidir.

Bu makalenin sorusu ikisini birleştiriyor: tek bir dikkat işlemini, üst üste yığılabilen ve gerçekten çalışan bir mimariye nasıl çeviririz? Cevabın adını 5\. makalede telaffuz etmiştik: Transformer. Üç yeni parça getireceğiz — bir Transformer bloğunun anatomisi, çok başlı dikkat ve sıra bilgisini dışarıdan veren pozisyon kodlaması (positional encoding). Dördüncü bir şey de kendiliğinden gelecek: paralellik. Ölçek çağının kapısını açan da o.

## "Dikkat yeterlidir" iddiası

Ashish Vaswani ve yedi arkadaşının 2017'de yayımladığı çalışmanın başlığı bir iddia taşır: *Attention Is All You Need*, yani dikkat yeter. 6\. makalede görmüştük ki dikkat yeni değildi; yeni olan, onun dışındaki her şeyi atma kararıydı. Yazarlar hem yinelemeli katmanları hem de o dönemin öbür alternatifi olan evrişimli (convolutional) katmanları tamamen çıkardılar; geriye yalnızca dikkat ile sıradan ileri beslemeli katmanlar kaldı.

İddianın karşılığı ölçüldü. WMT 2014 İngilizce–Almanca test kümesinde taban model 27,3 BLEU aldı; o güne kadarki en iyi sonuç ise birden çok modelin birleştirildiği bir topluluktan gelen 26,36'ydı. Mütevazı taban model, tek başına, toplulukları da geçti; yeni rekoru ise büyük model kurdu, 28,4 ile.

Burada bir dürüstlük notu şart. Aynı tablonun İngilizce–Fransızca sütununda taban modelin skoru 38,1'dir ve listedeki her rakibin altında kalır; en iyi rakip orada 41,29 almıştır ve o dil çiftinde rekoru yine büyük model kırmıştır, 41,8 ile. Yani "taban model rekoru kırdı" cümlesi yalnızca İngilizce–Almanca için kurulabilir. Küçük bir ayrıntı daha: makalenin gövde metni Fransızca skorunu 41,0 diye verir ama tablosu 41,8 der, bu çalışmanın bilinen bir iç tutarsızlığıdır ve biz tabloyu esas alıyoruz.

Asıl çarpıcı sayı kalitede değil, faturada. Taban model tek bir makinede, sekiz grafik işlemcisiyle, on iki saatte eğitildi; büyük model üç buçuk günde. Dönemin güçlü çeviri sistemlerinden biri — Google'ın kendi çeviri sistemi — taban modelinkinin yaklaşık yedi katı hesapla eğitilmişti ve 24,6 BLEU alıyordu; büyük model ise aynı mertebede bir bütçeyle 3,8 BLEU daha yükseğe çıktı. Aynı para, başka mimari.

Bu maliyet sayılarının nasıl elde edildiğini de söylemek gerekir: ölçülmediler. Yazarlar eğitim süresini, kullanılan grafik işlemcisi sayısını ve işlemci başına tahmini kapasiteyi çarparak kestirdiler, yani büyüklük mertebesi güvenilirdir ama ondalıkları değil.

## Bloğun anatomisi

Transformer'ın tekrarlanan yapı taşına blok diyoruz ve bir blok iki alt-katmandan oluşur. Birincisi çok başlı dikkat: 6\. makalede kurduğumuz tartım işleminin çoğaltılmış hâli. İkincisi ileri beslemeli katman (feed-forward layer): her token'ın vektörünü geniş bir ara boyuta açan, orada bir aktivasyondan geçiren ve tekrar eski boyuta indiren küçük bir ağ. Kritik ayrıntı, bu ikinci alt-katmanın her konuma ayrı ayrı ve aynı biçimde uygulanmasıdır; komşulara hiç bakmaz, yalnızca dikkatin getirdiği bilgiyi işler.

Her alt-katmanın etrafında iki mühendislik önlemi var: alt-katmanın çıktısı girdisinin yerine geçmez, girdisinin üstüne eklenir — buna artık bağlantı (residual connection) denir — ve toplamdan sonra vektör, katman normalleştirmeden (layer normalization) geçirilir. Bloğun tam sırası şudur: dikkat, ekleme, normalleştirme, ileri beslemeli katman, ekleme, normalleştirme. Şekil 1 bu akışı gösteriyor.

![Bir Transformer bloğunda girdi vektörü çok başlı dikkat alt-katmanına girer, çıktısı artık bağlantıyla girdinin üstüne eklenir ve katman normalleştirmeden geçer; aynı sıra ileri beslemeli katman için tekrarlanır ve blok çıktısı bir sonraki bloğa devredilir.](assets/transformer-blogu.svg "Şekil 1 — Bir Transformer bloğunun içi")

Blok tanımlandıktan sonra geri kalanı tekrardan ibaret: taban modelde kodlayıcı (encoder) yığını altı özdeş katmandan, kod çözücü (decoder) yığını yine altı katmandan oluşur; kod çözücü katmanının bir alt-katman fazlası var, birazdan ona da geleceğiz. Bu, 3\. makaledeki fikrin ta kendisidir — her blok girdisinin yeni bir temsilini üretir ve bir sonrakine devreder, aynı katı üst üste altı kez koyup bina yapmak gibi. Benzetmenin bozulduğu yer şurası: bir binada katlar farklı işlevler taşıyabilir, oysa bir yığının içindeki bloklar yapıca birbirinin kopyasıdır ve farklı olan tek şey her birinin kendi öğrendiği ağırlıklarıdır. Benzetmenin biçimsel karşılığı ise şudur: aynı blok tanımı altı kez tekrarlanır ve her tekrar kendi parametre kümesini taşır.

Sayı koyalım. Taban modelde vektör boyu 512, ileri beslemeli katmanın iç boyutu 2.048. Bir dikkat alt-katmanının ağırlıkları dört kare matristen ibarettir: sorgu, anahtar, değer ve başların çıktısını birleştiren izdüşüm. Sembolle 4 × 512 × 512, sayıyla 4 × 262.144 = 1.048.576. İleri beslemeli alt-katman ise iki dikdörtgen matristir, 512 × 2.048 ve 2.048 × 512; yani 1.048.576 + 1.048.576 = 2.097.152. Sapma terimlerini iki tarafta da saymazsak oran tam olarak iki çıkıyor: bloğun işleyen yarısı, bakan yarısının iki katı parametre taşır.

Yığının sonunda bir adım daha var ve 5\. makaledeki hedefe bağlanan tam olarak o. Son blok her konum için yine 512 sayılık bir vektör üretir; bu vektör, sözlükteki her token için tek bir ham skora çevrilir, yani elde sözlük boyunda — taban modelde yaklaşık 37.000 uzunluğunda — bir skor listesi kalır. Bu ham skorlara logit denir. Skorları 6\. makalede gördüğün softmax'tan geçirdiğinde toplamı bir olan bir dağılım çıkar: 5\. makalede tanımladığımız sonraki token dağılımının ta kendisi. Aynı işlem, başka yer — orada bir konumun öbür konumlara verdiği ağırlıkları üretiyordu, burada sözlüğün tamamı üzerinde bir olasılık dağılımı üretiyor. Vaswani ve arkadaşlarında bu son izdüşüm, girişteki embedding tablosuyla aynı ağırlıkları paylaşır; birazdan tabloda "paylaşılan embedding tablosu" diye tek satırda sayacağımız şey de budur.

Şimdi tabloya dökelim. Kodlayıcı katmanı bir dikkat ve bir ileri beslemeli alt-katman taşır; kod çözücü katmanı ise bir alt-katman fazlasıyla gelir, çünkü kendi dizisine bakan dikkatin yanında bir de kaynak cümleye bakan bir dikkat alt-katmanı vardır. Toplamda 18 dikkat, 12 ileri beslemeli alt-katman.

| Parça | Adet | Parametre |
|---|---|---|
| Dikkat alt-katmanı | 18 | 18.874.368 |
| İleri beslemeli alt-katman | 12 | 25.165.824 |
| Paylaşılan embedding tablosu | 1 | 18.944.000 |
| Toplam | | 62.984.192 |

Kâğıt üstünde yaklaşık 63 milyon çıkıyor, makalenin bildirdiği sayı ise 65 milyon. Farkın bir kısmı saymadığımız küçük terimlerden — sapmalar, normalleştirme parametreleri — bir kısmı da sözlük boyutunun "yaklaşık 37.000" diye yuvarlanmasından geliyor; kaynak tam sayıları vermediği için farkı sonuna kadar kapatamıyoruz. Okunacak asıl satır zaten oran: iki alt-katman türünün toplamının yüzde 57'si ileri beslemeli tarafta duruyor. "Transformer eşittir dikkat" denklemi burada çatlar. Dikkat bilgiyi taşır; iki alt-katman türü içinde parametrelerin çoğunluğu ise onu işleyen taraftadır — embedding tablosunu da sayınca ileri beslemeli katmanlar toplamın yüzde 40'ını, dikkat yüzde 30'unu tutar.

> **Kendini yokla:** 3\. makalede aktivasyon olmadan üst üste konan katmanların tek bir doğruya sadeleştiğini görmüştük. Transformer'da bu tehlikeyi ne engelliyor?

Blok içindeki ileri beslemeli katmanın doğrusal olmayan aktivasyonu. Önce bir düzeltme: dikkat işleminin kendisi de doğrusal bir işlem değildir, çünkü ağırlıklarını softmax üretir ve o ağırlıklar girdinin kendisine bağlıdır. Ama tek başına yetmiyor. Yihe Dong ve arkadaşlarının 2021'deki çalışması, artık bağlantı ve ileri beslemeli katman olmadan yalnızca dikkatten kurulu bir yığının, katman sayısı arttıkça bütün token'ların temsilini birbirine yaklaştırıp tekdüzeleştirdiğini gösteriyor. Yanındaki ileri beslemeli katman hem bu tekdüzeleşmeyi frenler hem de her konumun vektörünü kendi başına yeniden şekillendirir. Blok bu yüzden iki parçadan oluşuyor, tek parçadan değil.

### İleri okuma notu: yığını eğitilebilir kılan iki önlem

Artık bağlantı da katman normalleştirme de mimarinin süsü değil; ikisi de derin bir yığını eğitilebilir kılmak için orada.

Artık bağlantı fikri görüntü tanımadan geliyor: Kaiming He, Xiangyu Zhang, Shaoqing Ren ve Jian Sun 2016'da tuhaf bir gözlemi adlandırdı — katman ekledikçe ağ bir noktadan sonra daha iyi değil daha kötü oluyordu, hem de ezberlemekten değil, çünkü eğitim hatası bile yükseliyordu. Sorun kapasite değil eğitilebilirlikti; buna bozulma dediler. Yazarlar bunun sönen gradyanlardan kaynaklanmasının muhtemel olmadığını açıkça yazar, yani karşımızda 3\. makaledeki sorunun akrabası var ama aynısı değil. Çözüm sadeydi: alt-katmanın çıktısını girdinin yerine geçirmek yerine üstüne eklemek. Böylece alt-katmanın öğrendiği şey "yeni temsil" değil, "mevcut temsile eklenecek fark" olur.

Katman normalleştirmeyi Jimmy Lei Ba, Jamie Ryan Kiros ve Geoffrey Hinton 2016'da bir ön baskıda tanımladı; çalışma hakem sürecinden geçmemiştir, buna rağmen alanın standart parçalarından biri oldu. Yaptığı iş tek cümleye sığar: bir vektörün kendi içindeki sayıların ortalamasını sıfıra, yayılımını bire çeker — zaman içinde değil, tek bir örneğin tek bir katmanındaki birimler üzerinde.

Bir kronoloji notu da düşelim: Vaswani ve arkadaşları normalleştirmeyi toplamadan sonra uygularken, Alec Radford ve arkadaşlarının 2019 tarihli GPT-2 raporu onu her alt-bloğun girdisine taşıdığını yazar ve Ruibin Xiong ile arkadaşları 2020'de bu yerleşimin neden daha kararlı olduğunu kanıtladı. Uygulama, teoriyi bir yıl önceledi.

## Sekiz ayrı bakış

Tek bir tartımın neden yetmediğini 6\. makalede söylemiştik: bir cümlede aynı anda birden çok ilişki türü vardır ve tek ağırlık kümesi hepsini tek tartıya sıkıştırmak zorunda kalır. Çözüm, aynı işlemi paralel kopyalar hâlinde çalıştırmaktır; her kopyaya dikkat başı (attention head) denir.

Tuzak hemen burada: sekiz baş, sekiz kat hesap demek değil. Taban modelde vektör boyu 512 ve baş sayısı sekizdir, yani her başın çalıştığı boyut 512 / 8 = 64'e indirilir. Sekiz başın çıktıları sonunda birleştirilip tek bir izdüşümden geçirilir ve yazarların kendi ifadesiyle toplam hesap maliyeti, tam boyutlu tek başlı dikkatinkine benzer kalır.

> **Kendini yokla:** Bir dikkat başı yerine sekiz baş kullanmak, tek başın sekiz katı büyüklüğünde bir tartım yapmaktan farklı mıdır?

Farklıdır. Sekiz baş sekiz ayrı tartım üretir ve her biri farklı bir ilişki türüne yoğunlaşabilir; tek büyük tartım ise hepsini tek bir ağırlık kümesine sıkıştırmak zorundadır. Fark kapasitede değil, ayrıştırmada.

Ölçüldü mü? Ölçüldü. Yazarlar baş sayısını değiştirip doğrulama kümesindeki çeviri kalitesini raporlar: tek başla 24,9, dört başla 25,5, sekiz başla 25,8, on altı başla 25,8, otuz iki başla 25,4. Bu beş sayı doğrulama kümesine aittir ve yukarıdaki 27,3 ile aynı cetvelde değildir; yalnızca kendi aralarında karşılaştırılabilirler. Okunacak iki şey var: tek baş belirgin biçimde geride kalıyor ve daha çok baş bir noktadan sonra kaliteyi düşürüyor. Bedava çarpan yok.

Sayarak bitirelim: altı katman çarpı sekiz baş 48 eder ve taban modelde üç ayrı dikkat yığını olduğu için toplamda 144 baş vardır. Yüz kırk dört ayrı bakış açısı. Bir katmanın sekiz başı birbirini beklemeden hesaplanır; katmanlar ise sırayla çalışır, çünkü her katman bir öncekinin çıktısını girdi alır.

## Sıranın nereden geldiği

Dikkatin sırayı görmediğini 6\. makalede kendi elimizle doğrulamıştık: cümledeki iki kelimenin yerini değiştirdiğimizde ağırlıklar aynı token'lara yapıştı ve çıktı hiç değişmedi. Sebebi derin değil, aritmetik: dikkatin çıktısı bir toplamdır ve toplamın terimlerini karıştırmak toplamı değiştirmez. Bunun biçimsel adı da var: girdilerin sırasını değiştirdiğinde çıktı da yalnızca aynı biçimde yer değiştirir, başka hiçbir şey değişmez — buna permütasyona eşdeğerlik (permutation equivariance) denir. Juho Lee ve arkadaşlarının 2019'daki çalışması, bu tür dikkat bloklarının bu özelliği taşıdığını açıkça yazar. Vaswani ve arkadaşları da gerekçeyi aynı yerden kurar: model tekrarlama ve evrişim içermediğine göre, konum bilgisi ayrıca enjekte edilmelidir.

Çözüm, modeli sırayı öğrenmeye zorlamak değil, sırayı girdiye eklemektir. Önce sözle: her konum için, embedding ile aynı boyda sabit bir sayı listesi üretilir ve o listenin üzerine eklenir. Sonra sembolle: çift numaralı boyutlara sin(pos / 10000^(2i/d)), tek numaralı boyutlara cos(pos / 10000^(2i/d)) yazılır; burada pos konum numarası, i boyut çiftinin sırası, d ise vektör boyudur. Sonra küçük sayılarla: dört boyutlu bir oyuncak modelde ilk iki boyut sin(pos) ile cos(pos), son iki boyut sin(pos/100) ile cos(pos/100) olur.

| Konum | Boyut 0 | Boyut 1 | Boyut 2 | Boyut 3 |
|---|---|---|---|---|
| 0 | 0,000 | 1,000 | 0,000 | 1,000 |
| 1 | 0,841 | 0,540 | 0,010 | 1,000 |
| 2 | 0,909 | −0,416 | 0,020 | 1,000 |
| 3 | 0,141 | −0,990 | 0,030 | 1,000 |

Tablodaki ritim farkı meselenin kendisi: ilk iki boyut konum değiştikçe hızla dönüyor, son iki boyut ise neredeyse kıpırdamıyor. Saat kollarına benziyor; saniye kolu hızlı, saat kolu yavaş, ikisi birlikte tek bir anı belirtiyor. Benzetmenin bozulduğu yer şurası: saat sarmalanır ve on ikiden sonra yeniden bire döner, oysa gerçek taban modelde — dört boyutlu oyuncakta değil — en yavaş boyutun dalga boyu altmış bin konum mertebesindedir ve pratikte hiçbir dizi o kadar uzamaz. Benzetmenin biçimsel karşılığı ise şudur: kodlama, "kaçıncı token" bilgisini embedding vektörüne toplanabilir sabit bir sayı dizisine çeviren, öğrenilmeyen bir tablodur.

Popüler anlatı bu tabloyu bir zafer gibi sunar: sinüzoidal kodlama, öğrenilen alternatifinden daha iyi olduğu için seçildi. Birincil kaynak buna izin vermiyor. Vaswani ve arkadaşları iki sürümü karşılaştırıp neredeyse özdeş sonuç aldıklarını yazar, doğrulama kümesinde 25,8'e karşı 25,7; sinüzoidali seçme gerekçeleri ise bir hipotezdi, eğitimde görülenden daha uzun dizilere genelleme yapmasına izin verebilirdi. Dürüst sonuç şu: hipotez o çalışmada test edilmedi. Nitekim aynı dönemde Alec Radford ve arkadaşlarının GPT'si öğrenilen konum embedding'lerini kullandı ve kimse geri adım atmadı.

Bugünün standardı ise üçüncü bir yol: Jianlin Su ve arkadaşlarının 2021'de ön baskı olarak çıkan ve 2024'te Neurocomputing dergisinde hakemli biçimiyle yayımlanan çalışması, konumu eklemek yerine döndürmeyi öneriyor — her vektör, bulunduğu konuma bağlı bir açıyla çevriliyor. Sonuç olarak iki token'ın dikkat skoru, aralarındaki mesafeye duyarlı hâle geliyor. Sezgi bu kadar; ayrıntısı bu makalenin bütçesini aşıyor.

## Herkes aynı anda masada

Şimdi mimarinin asıl kazancına geldik ve o kazanç hız değil.

Yinelemeli bir katman telefon zinciri gibi çalışır: mesaj sırayla aktarılır ve herkes kendinden önceki kişiyi beklemek zorundadır. Öz-dikkat ise bir toplantı masasıdır, herkes aynı anda odadadır ve herkes herkesi tek seferde duyar. Benzetmenin bozulduğu yer şurası: gerçek toplantıda insanlar yine sırayla konuşur ve herkesin herkesi duyması bedavaymış gibi görünür, oysa n kişilik masada n çarpı n konuşma çifti hesaplanır ve masa büyüdükçe maliyet karesiyle artar. Benzetmenin biçimsel karşılığı ise şudur: dizinin bütün konumları için dikkat skorları tek bir işlemde, birbirini beklemeden hesaplanır.

Sayı koyalım. Yüz token'lık bir cümlede yinelemeli katman yüz sıralı adım gerektirir, öz-dikkat ise bir adım; buna karşılık öz-dikkat 100 × 100 = 10.000 skor hesaplar, yinelemeli katman yüz. Dizi on katına çıkarsa yinelemeli tarafta bin sıralı adım olur, öz-dikkat tarafında hâlâ tek adım ama bir milyon skor. On kat uzunluk, yüz kat skor.

Bedel açık: öz-dikkat daha çok iş yapıyor. Ama modern donanımda darboğaz toplam iş değil, birbirini beklemek zorunda olan adımların sayısıdır; on bin skoru aynı anda hesaplayabilen bir grafik işlemcisi için on bin skor, yüz sıralı adımdan ucuza gelir. Şekil 2 bu karşıtlığı iki panelde gösteriyor.

![Sol panelde yinelemeli katmanın beş token'ı zincir oklarla birbirine bağlıdır ve beş sıralı adım gerekir; sağ panelde öz-dikkatte aynı beş token birbirine tam bağlı bir grafla bağlanır ve tek sıralı adımda yirmi beş skor hesaplanır.](assets/sirali-vs-paralel.svg "Şekil 2 — Sıralı bağımlılık ve paralel hesap")

> **Kendini yokla:** Transformer bütün konumları aynı anda işleyebiliyor. Bu paralellik neyi ucuzlattı, neyi ucuzlatmadı?

Eğitimi ucuzlattı: bir dizinin bütün konumları için hesap aynı anda yapılabildiğinden donanım tam doldurulur. Metin üretimini ucuzlatmadı: üretim hâlâ token token ilerler, çünkü bir sonraki adımın girdisi az önce üretilen token'dır. Kazanılan şey ham hız değil, birbirini beklemek zorunda olan adım sayısıdır.

Bu ayrım serinin devamı için belirleyici: ölçek çağının teknik önkoşulu, eğitimin paralelleşebilmesiydi.

## Üç kol, tek bir fark

Vaswani ve arkadaşlarının mimarisi bir çeviri sistemiydi, yani iki parçalıydı: kodlayıcı kaynak cümleyi okur, kod çözücü hedef cümleyi kelime kelime yazar. Sonraki yıllarda mimari üç kola ayrıldı ve ayrımın tamamı tek bir teknik ayrıntıda toplanıyor — hangi konumun hangi konumlara bakmasına izin verildiği. Buna dikkat maskesi diyoruz.

Jacob Devlin ve arkadaşlarının 2019'da tanıttığı BERT yalnızca kodlayıcı tarafını kullanır; dikkat maskesi yoktur ve her token cümlenin tamamını görür. Modeli eğitirken kullanılan hedef de sonraki token değildir: token'ların yüzde 15'i rastgele silinip yerine bir yer tutucu konur ve model boşlukları doldurur — bu ikinci anlamdaki maskeleme girdiye uygulanır, dikkate değil. Eğitimin bu ilk ve en büyük aşamasının adını ve mekaniğini 8. makalede kuracağız. BERT bu yüzden 5\. makalenin tanımladığı anlamda bir dil modeli değildir ve metin üretmez. Alec Radford ve arkadaşlarının 2018'de tanıttığı GPT ise yalnızca kod çözücü tarafını kullanır ve maskesi 6\. makalede kurduğumuz kuraldır, her token yalnızca kendinden öncekilere bakabilir. Buna nedensel maske (causal mask) denir; somut biçimi bir kare tablodur — satırlar sorgu konumları, sütunlar anahtar konumlarıdır ve izin verilen hücreler tam olarak alt üçgeni doldurur. Şekil 3 üç kolu yan yana koyuyor.

![Üç beşe beş ızgara: kodlayıcı-yalnız kolda bütün hücreler dolu, kod çözücü-yalnız kolda yalnızca alt üçgen dolu, kodlayıcı-kod çözücü kolda kaynak için tam kare ve hedef için alt üçgen ile aralarında çapraz dikkat oku bulunur.](assets/dikkat-maskesi-kollari.svg "Şekil 3 — Üç mimari kol ve dikkat maskesi")

Üç kolu üç okur gibi düşünebilirsin: biri metnin tamamı önünde durup boşluk doldurur, biri sayfayı kartla kapatıp yalnızca okuduğu yere kadarını görür ve sıradaki kelimeyi tahmin eder, üçüncüsü aslında iki kişidir — biri kaynağı okur, öbürü ona bakarak hedefi yazar. Benzetmenin bozulduğu yer şurası: kart kaldırılabilir bir nesnedir ve "şimdilik bakma" demek gibi durur, oysa maske mimarinin sabit bir parçasıdır — eğitimde de, hazır bir metnin bütün konumları tek seferde işlenirken de aynı biçimde uygulanır ve bilgi hiç akmaz. İşlevsiz kaldığı tek yer, tek tek üretilen yeni token'dır; onun zaten bir "sonrası" yoktur. Benzetmenin biçimsel karşılığı ise şudur: üç kolda da aynı blok, aynı ileri beslemeli katman ve aynı normalleştirme kullanılır, değişen tek şey maskedir.

Peki mimarisi açıklanmış büyük dil modellerinin neredeyse tamamı neden kod çözücü kolundan geliyor? Bu soruya kontrollü bir deneyle en doğrudan cevabı Thomas Wang ve arkadaşlarının 2022'deki çalışması verir — mimarileri aynı bütçeyle karşılaştırır — ve cevabı koşulludur. Yalnızca ham metinle yapılan ilk eğitim aşamasından sonra, hiç örnek görmeden yeni görevlere en iyi genelleyen modeller sonraki token hedefiyle eğitilmiş nedensel kod çözücülerdir; ama modele çok sayıda görevi talimatla öğreten ikinci bir eğitim aşaması devreye girdiğinde — böyle bir aşamayı 11–13. makalelerde kuracağız — girdisine tam erişimi olan maskeli modeller öne geçiyor. Dürüst özet: kod çözücü kolu bir üstünlük teoremi yüzünden değil, üretim yeteneği ile o ilk aşamanın basitliği ve ölçeklenme pratikliğinin bileşimiyle fiilen standart oldu.

## Aynı iskelet, yedi yıl sonra

Şimdi mimariyi sabit tutup yalnızca ölçeğe bakalım.

| Model | Yıl | Parametre |
|---|---|---|
| Transformer (taban) | 2017 | 65 milyon |
| Transformer (büyük) | 2017 | 213 milyon |
| BERT (büyük sürüm) | 2019 | 340 milyon |
| GPT-2 (dört sürüm) | 2019 | 124 / 355 / 774 milyon ve 1,5 milyar |
| GPT-3 | 2020 | 175 milyar |
| Llama 3.1 405B | 2024 | 405 milyar |

Tablonun kaynakları dağınık: ilk iki satır Vaswani ve arkadaşlarının kendi tablosundan, BERT satırı Devlin ve arkadaşlarından, GPT-3 satırı Tom Brown ve arkadaşlarının 2020 çalışmasından, son satır ise Meta'nın 2024 tarihli Llama 3 raporundan geliyor. GPT-2 satırı için tek cümlelik bir not borçluyuz: GPT-2 makalesinin kendi tablosu bu dört modeli 117, 345, 762 ve 1542 milyon diye verir; OpenAI'ın model kartı ise yayımlanan ağırlıkları 124 milyon, 355 milyon, 774 milyon ve 1,5 milyar diye listeler. Biz model kartı serisini kullanıyoruz.

Somutlaştıralım: 2017'nin taban modelinden Llama 3.1 405B'ye parametre sayısı 6.231 katına çıktı, eğitim hesabındaki fark ise daha da sert — yayımlanan tahminlerin oranı yaklaşık 11,5 milyon. Aynı iskelet, milyonlarca kat daha büyük bir fatura; bu faturanın iki kaleme nasıl bölündüğü 9. makalenin konusu.

Peki iskelet ne kadar değişti? Llama 3 raporu bunu kendi cümlesiyle söylüyor: mimari, Llama ve Llama 2'den önemli ölçüde sapmıyor ve kazanımlar öncelikle veri kalitesindeki ve çeşitliliğindeki iyileşmelerden ve artan eğitim ölçeğinden geliyor. Ayrıntılar elbette yenilendi ve Llama 2 raporu bunları açıkça sayar: normalleştirmenin yeri ile türü, ileri beslemeli katmandaki aktivasyon, pozisyon kodlaması ve büyük sürümlerde dikkatin anahtar-değer düzeni. Hepsi gerçek ama hepsi ayrıntı. Kaynak notu da düşelim: bu paragrafın dayandığı GPT ve Llama raporlarının hiçbiri hakemli yayın değildir, şirketlerin kendi teknik raporlarıdır.

## Sihir değil, ayarlanabilir bir fonksiyon

Bir dürüstlük notuyla bitirelim. Bu makalede kurduğumuz şeyin adı kulağa büyük geliyor ama 1\. makaledeki düğmeli kutu hâlâ geçerli: Transformer da girdiyi çıktıya bağlayan, üzerinde ayarlanabilir sayılar olan bir fonksiyondur ve değişen tek şey düğme sayısı ile düğmelerin nasıl dizildiğidir. Blokta yeni bir öğrenme yasası yok; 2\. makaledeki döngü —tahmin, kayıp, gradyan inişi— olduğu gibi çalışıyor.

Mimarinin ne yaptığını da küçültmeyelim: yinelemeyi atmak bir kolaylık değil bir yol ayrımıydı, çünkü dizinin bütün konumlarını aynı anda işleyebilen bir model donanımın gücünü tek seferde kullanabilir. 2017'de bunun kanıtı sekiz grafik işlemcili bir makinede on iki saatti; yedi yıl sonra aynı iskelet on altı bine varan grafik işlemcisinde aralıksız haftalarca koştu. Fazlası iddia edilmiyor: Transformer bir zekâ tarifi değil, bağlamı tartıp temsili yeniden yazan bir katman yığınıdır. Bir kapı da açık kalsın: dikkat, dizideki uzak bağlantıları kurmanın tek yolu değil; aynı işi karesel maliyet ödemeden yapmayı deneyen mimariler var ve onları 86. makalede ele alacağız.

### Sırada ne var

Mimari hazır ve boş. Hedefi 5\. makaleden, döngüyü 2\. makaleden beri biliyoruz; eksik olan tek şey veri ve ölçek. 2\. makalede döngünün şeklinin değişmeyeceği, değişecek olanın kutuların içeriği olduğu söylenmişti ve o sözü 8. makalede tahsil edeceğiz. Soru şu: bu boş mimariye trilyonlarca token verildiğinde tam olarak ne oluyor — hangi veri, ne kadar hesap, ne kadar süre?

## Kaynakça

- Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł. & Polosukhin, I. (2017). *Attention Is All You Need*. NeurIPS 2017 (arXiv:1706.03762). [Bağlantı](https://arxiv.org/abs/1706.03762)
- Dong, Y., Cordonnier, J.-B. & Loukas, A. (2021). *Attention Is Not All You Need: Pure Attention Loses Rank Doubly Exponentially with Depth*. ICML 2021, PMLR 139, s. 2793–2803. [Bağlantı](https://proceedings.mlr.press/v139/dong21a.html)
- He, K., Zhang, X., Ren, S. & Sun, J. (2016). *Deep Residual Learning for Image Recognition*. CVPR 2016, s. 770–778. [Bağlantı](https://arxiv.org/abs/1512.03385)
- Ba, J. L., Kiros, J. R. & Hinton, G. E. (2016). *Layer Normalization*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1607.06450)
- Radford, A., Wu, J., Child, R., Luan, D., Amodei, D. & Sutskever, I. (2019). *Language Models are Unsupervised Multitask Learners*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- Xiong, R., Yang, Y., He, D., Zheng, K., Zheng, S., Xing, C., Zhang, H., Lan, Y., Wang, L. & Liu, T.-Y. (2020). *On Layer Normalization in the Transformer Architecture*. ICML 2020, PMLR 119, s. 10524–10533. [Bağlantı](https://proceedings.mlr.press/v119/xiong20b.html)
- Lee, J., Lee, Y., Kim, J., Kosiorek, A. R., Choi, S. & Teh, Y. W. (2019). *Set Transformer: A Framework for Attention-based Permutation-Invariant Neural Networks*. ICML 2019. [Bağlantı](https://arxiv.org/abs/1810.00825)
- Su, J., Ahmed, M., Lu, Y., Pan, S., Bo, W. & Liu, Y. (2024). *RoFormer: Enhanced Transformer with Rotary Position Embedding*. Neurocomputing, 568, 127063. [Bağlantı](https://arxiv.org/abs/2104.09864)
- Devlin, J., Chang, M.-W., Lee, K. & Toutanova, K. (2019). *BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding*. NAACL-HLT 2019, s. 4171–4186. [Bağlantı](https://aclanthology.org/N19-1423/)
- Radford, A., Narasimhan, K., Salimans, T. & Sutskever, I. (2018). *Improving Language Understanding by Generative Pre-Training*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)
- Wang, T., Roberts, A., Hesslow, D., Le Scao, T., Chung, H. W., Beltagy, I., Launay, J. & Raffel, C. (2022). *What Language Model Architecture and Pretraining Objective Works Best for Zero-Shot Generalization?*. ICML 2022, PMLR 162, s. 22964–22984. [Bağlantı](https://proceedings.mlr.press/v162/wang22u.html)
- Brown, T. B. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS 2020 (arXiv:2005.14165). [Bağlantı](https://arxiv.org/abs/2005.14165)
- Grattafiori, A. ve ark. (2024). *The Llama 3 Herd of Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2407.21783)
- OpenAI (2019). *GPT-2 model kartı*. GitHub (hakemli değildir). [Bağlantı](https://github.com/openai/gpt-2/blob/master/model_card.md)
- Touvron, H. ve ark. (2023). *Llama 2: Open Foundation and Fine-Tuned Chat Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2307.09288)
