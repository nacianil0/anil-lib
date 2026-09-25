---
article_id: article_fe85b2e3-b957-4b0f-9e9e-86e6d71a6fe1
title: "Kendi Eğitim Koşun: Tokenizer, Veri ve Döngü"
slug: kendi-egitim-kosun-tokenizer-veri-ve-dongu
category: models-and-training
level: advanced
reading_order: 104
summary: "103. makalenin 364 parametresini gerçekten eğitir: bu serinin kendi metni üzerinde sıfırdan kurulmuş bir BPE tokenizer'ı, sözlük boyunun ölçülmüş marjinal getirisi, kaybın durduğu entropi tabanı ve beş tohumun ikisinin kuralı hiç öğrenememesi."
tags:
  - egitim-dongusu
  - bpe
  - sozluk-boyu
  - entropi-tabani
  - kosular-arasi-sapma
content_hash: sha256:56236ebd226451aa82f0c89685bc36834db9379b0562f825092e3afabd041843
classification_version: 1
classification_batch: 25
revised_at: "2026-09-25"
revision_note: "Beş tohumun sonucu tek bir kayıp ekseninde çizildi; sözlük tablosundaki iki türetilmiş sayı ve ters yazılmış sütun başlığı düzeltildi."
---
## Ağırlıkları kim yazacak

103\. makale elimizde 364 sayılık bir makine bıraktı. Sayıların hepsi rastgele çekilmişti ve model, dört cümlelik bir dilin tek kuralını bilmiyordu; verdiği kayıp düz tahminciden bile kötüydü. Eksik olan şey mimari değil, mimarinin içindeki sayılar.

Onları yazacak yordamı 2\. makaleden beri biliyoruz: tahmin et, kaybı ölç, gradyanı al, parametreleri kaybı azaltacak yönde oynat, baştan. 8\. makalede aynı döngünün trilyonlarca token üzerinde nasıl koştuğunu görmüştük. Bu makalede döngüyü **kendimiz** çalıştırıyoruz ve ölçek o kadar küçük ki her sayıyı görebiliyoruz.

Ama önce bir borç var. Seri boyunca token'ı hazır aldık: 4\. makalede bayt çifti kodlamasının nasıl çalıştığını görmüş, 15\. makalede sözlük boyunun bir tahsis kararı olduğunu söylemiştik — ikisinde de tokenizer başkasının kurduğu bir araçtı. Bu makalede onu da kendimiz kuruyoruz, üstelik elimizin altındaki en tanıdık metinle: bu serinin kendi makaleleriyle.

## Tokenizer'ı kendimiz kurmak

Derlem şu: yayımlanmış 102 makalenin Türkçe gövdesi. Kaynakçaları, şekil sözdizimini ve bağlantı hedeflerini attıktan sonra geriye 255.071 kelime, 28.585 farklı kelime ve 1.484.770 harf kalıyor.

Başlangıç noktası harf düzeyi: her kelime harflerine bölünür ve sonuna bir kelime-sonu işareti konur. Bu hâliyle derlem 1.739.841 token tutuyor, sözlük yalnızca 85 birimden oluşuyor ve kelime başına 6,821 token düşüyor. 4\. makalede bu uzlaşının iki ucunu görmüştük; işte sol uç, ölçülmüş hâliyle.

Şimdi Rico Sennrich ve arkadaşlarının ACL 2016'da dile uyarladığı algoritmayı çalıştırıyoruz: en sık geçen komşu ikiliyi bul, onu tek bir birime birleştir, tekrarla. İlk on iki birleştirme şunlar:

| # | Birleştirilen | Sonuç | Sıklık |
|---|---|---|---|
| 1 | n + kelime sonu | n· | 38.115 |
| 2 | r + kelime sonu | r· | 33.558 |
| 3 | e + kelime sonu | e· | 32.573 |
| 4 | i + kelime sonu | i· | 27.664 |
| 5 | a + kelime sonu | a· | 22.653 |
| 6 | a + r | ar | 20.306 |
| 7 | ı + kelime sonu | ı· | 18.929 |
| 8 | b + i | bi | 16.392 |
| 9 | d + e | de | 15.625 |
| 10 | l + e | le | 15.034 |
| 11 | k + kelime sonu | k· | 14.938 |
| 12 | a + n | an | 13.456 |

Okunacak şey ilk beşin hepsinin aynı türden olması: bir ünsüz ya da ünlü ile **kelime sonu** işareti. Algoritma Türkçenin ne olduğunu bilmiyor; yalnızca sayıyor. Ama Türkçede kelimenin son harfi eklerin taşıyıcısıdır ve bu yüzden en sık geçen ikililer kelime sonlarında birikiyor. Devamı da aynı yöne gidiyor: 19. birleştirme "bir", 27. birleştirme "yor", 30. birleştirme "ve". Yani sıklıktan başka hiçbir bilgi verilmemiş bir algoritma, üçüncü onlukta Türkçenin şimdiki zaman ekini buluyor.

Bu, 15\. makaledeki uyarının ters yüzü. Orada sınırların "dilbilgisine göre değil sıklığa göre" çizildiğini ve bu yüzden harflerin ızgaraya rastgele dağıldığını söylemiştik. Burada aynı sebep tersine çalışıyor: Türkçede sık olan şey zaten ektir, dolayısıyla sıklık ile dilbilgisi bir süre aynı yöne gidiyor. İkisinin ayrıştığı yeri de görüyoruz — 4\. makalenin örnek kelimesi "okullarda", bizim tokenizer'ımızda `ok | ul | larda` diye bölünüyor. Ek doğru bulunmuş, kök ikiye kırılmış. Sebep basit: bu derlemde okul geçmiyor, ekler geçiyor.

![İki bölmeli bir şekil. Üst bölmede on iki satırlık bir tablo durur; sütunlar sıra, birleştirilen ikili, sonuç ve sıklıktır. Birinci satır n artı kelime sonu, sonuç n nokta, 38.115 kez. İkinci satır r artı kelime sonu, 33.558. Üçüncü satır e artı kelime sonu, 32.573. Dördüncü satır i artı kelime sonu, 27.664. Beşinci satır a artı kelime sonu, 22.653. Altıncı satır a artı r, sonuç ar, 20.306. Yedinci satır ı artı kelime sonu, 18.929. Sekizinci satır b artı i, sonuç bi, 16.392. Dokuzuncu satır d artı e, sonuç de, 15.625. Onuncu satır l artı e, sonuç le, 15.034. On birinci satır k artı kelime sonu, 14.938. On ikinci satır a artı n, sonuç an, 13.456. Alt bölmede üç kutu vardır. Birinci kutuda ilk beşin ortak yanı durur: hepsi bir harf ile kelime sonu işaretinin birleşmesidir, çünkü Türkçede eklerin taşıyıcısı kelimenin sonudur. İkinci kutuda ileri örnekler durur: on dokuzuncu birleştirme bir, yirmi yedinci yor, otuzuncu ve. Üçüncü kutuda ayrışma durur: dördüncü makalenin örnek kelimesi okullarda bu tokenizer'da ok, ul, larda diye bölünüyor; ek doğru bulunmuş, kök ikiye kırılmıştır, çünkü bu derlemde okul geçmiyor. En altta bir kayıt: derlem bu serinin yayımlanmış 102 makalesinin Türkçe gövdesidir ve bütün sayımlar bizimdir.](assets/bpe-birlestirmeleri.svg "Şekil 1 — Sıklık, Türkçenin eklerini buluyor")

Şekil 1'in üçüncü kutusu ölçünün sınırını da veriyor: bu tokenizer Türkçeyi değil, bu derlemi tanıyor.

## Sözlük boyunun marjinal getirisi

15\. makalede sözlük boyunun bir bütçe paylaşımı olduğunu söylemiş, Chaofan Tao ve arkadaşlarının ölçek yasası çalışmasını aktarmıştık. Şimdi aynı takası kendi derlemimizde ölçebiliriz, çünkü birleştirme sayısını istediğimiz gibi değiştirebiliyoruz.

| Birleştirme | Sözlük | Token | Token/kelime | Satır başına kazanılan token |
|---|---|---|---|---|
| 0 | 85 | 1.739.841 | 6,821 | — |
| 100 | 185 | 1.051.052 | 4,121 | 6.888 |
| 400 | 483 | 726.244 | 2,847 | 1.090 |
| 1.600 | 1.669 | 474.331 | 1,860 | 212 |
| 3.200 | 3.242 | 389.428 | 1,527 | 54 |
| 6.400 | 6.343 | 330.996 | 1,298 | 19 |

Son sütunu biz türettik: iki satır arasında kaybolan token sayısı, aynı aralıkta sözlüğe eklenen birim sayısına bölündü. İlk satırda (1.739.841 − 1.051.052) ÷ (185 − 85) = 6.888; son satırda (389.428 − 330.996) ÷ (6.343 − 3.242) ≈ 19. Yani ilk yüz birimin her biri derlemden 6.888 token siliyor, son üç bin birimin her biri yalnızca 19. Aradaki oran 366.

Yani sözlük büyütmenin getirisi çok hızlı tükeniyor, maliyeti ise tükenmiyor: her yeni satır embedding tablosuna sabit bir vektör ekliyor. Mikro modelde bu takas acımasız biçimde görünür hâle geliyor. Vektör boyumuz 4 ve blokların tamamı 320 parametre tutuyor; sözlük 320 ÷ 4 = **80 token'ı** geçtiği anda embedding tablosu blokların tamamından büyük oluyor. Yedi token'lık dilimizde embedding tablosu toplamın yüzde 7,7'si; 6.343 token'lık bir sözlük olsaydı tablo 25.372 parametre tutar ve blokların 79 katı olurdu.

> **Kendini yokla:** Sözlüğü küçük tutmanın da bir maliyeti var. Aynı derlem harf düzeyinde 1.739.841 token, 6.400 birleştirmeyle 330.996 token tutuyor. Bu fark eğitim faturasına nasıl yansır?

8\. makaledeki kaba kural faturayı parametre sayısı ile token sayısının çarpımına bağlıyordu. Aynı derlemi bir kez okumak, harf düzeyinde 5,26 kat daha fazla token işlemek demek — yani aynı model için 5,26 kat hesap. Küçük sözlük parametreden tasarruf eder, hesaptan etmez; büyük sözlük tam tersi. 15\. makalenin "bir tahsis kararı" dediği şey tam olarak bu iki kalem arasındaki paylaşım.

![Altı satırlık beş sütunlu bir tablo ve altında iki kutu. Üstte başlık: birleştirme sayısı arttıkça ne kazanılıyor ve ne ödeniyor. Sütunlar birleştirme, sözlük, token, token bölü kelime ve satır başına kazanılan token. Birinci satır sıfır birleştirme: sözlük 85, 1.739.841 token, 6,821 token bölü kelime, satır başına kazanç yok. İkinci satır 100 birleştirme: sözlük 185, 1.051.052 token, 4,121, satır başına 6.888. Üçüncü satır 400 birleştirme: sözlük 483, 726.244 token, 2,847, satır başına 1.090. Dördüncü satır 1.600 birleştirme: sözlük 1.669, 474.331 token, 1,860, satır başına 212. Beşinci satır 3.200 birleştirme: sözlük 3.242, 389.428 token, 1,527, satır başına 54. Altıncı satır vurguludur, 6.400 birleştirme: sözlük 6.343, 330.996 token, 1,298, satır başına 19. Birinci kutuda oran durur: ilk yüz satırın her biri derlemden 6.888 token siliyor, son üç bin satırın her biri yalnızca 19; aradaki oran 366. İkinci kutuda mikro modelin eşiği durur: vektör boyu 4 ve blokların tamamı 320 parametre olduğu için sözlük 80 token'ı geçtiğinde embedding tablosu bloklardan büyük olur. En altta bir kayıt: bütün sayımlar bu serinin derlemi üzerinde bizim ölçümümüzdür.](assets/sozluk-boyunun-getirisi.svg "Şekil 2 — Üç yüz altmış altı kat azalan getiri")

Şekil 2'nin son sütunu 366 kat daralıyor; token sütunu ise yalnızca beş kat.

## Dört cümle ve dürüst bir sınır

Tokenizer hazır, ama modelimizin sözlüğü onunla kurulmuyor. 103\. makalenin dili elle yazılmış yedi token taşıyor ve dört geçerli cümlesi var: `başla kedi bugün uyudu`, `başla kedi dün uyudu`, `başla köpek bugün havladı`, `başla köpek dün havladı`. Fiil özneyle uyuşuyor ve zarf hiçbir bilgi taşımıyor.

14\. makalede eğitim verisinin nasıl kurulduğunu konuşmuştuk: filtreleme, tekilleştirme, karışım ağırlıkları. Bu ölçekte hiçbiri yok — dört cümlenin tekilleştirilecek bir yanı, karıştırılacak iki kaynağı yok. Ama eksik olan bir şey var: ayrılmış bir sınama kümesi yok. Dilin bütün geçerli cümleleri eğitim verisinin içinde. Yani bu modelin genellemesini ölçemeyiz; yalnızca dört cümleyi ne kadar iyi modellediğini ölçebiliriz.

Küçük ölçekte eğitmenin kendisi meşru bir araştırma nesnesi; Stella Biderman ve arkadaşlarının ICML 2023'te yayımladığı Pythia paketi tam olarak bunun için kuruldu — aynı veriyle, aynı sırayla eğitilmiş bir model ailesi ve koşunun ara kayıtları, ölçek ile eğitim dinamiğini incelenebilir kılıyor. Bizim dört cümlelik deneyimiz o ölçeğin çok altında ama aynı mantıkta: koşuyu görünür kılmak için küçültmek.

102\. makalede veri sızıntısını "test kümesinin bilgisinin veri hazırlığı yoluyla eğitime karışması" diye tanımlamıştık. Buradaki durum sızıntı bile değil, daha açık bir şey: test kümesi diye bir şey yok. Bu bir kusur değil, bu deneyin tanımı — biz genellemeyi değil, **kaybın nerede durduğunu** ölçmek istiyoruz. Ama bu ayrımı söylemeden geçmek, 99\. makalede eleştirdiğimiz türden bir rapor olurdu.

## Döngü

Eğitim kurulumu şu: her adımda dört dizinin tamamı işleniyor, on iki hedefin kaybı ortalanıyor, gradyan alınıyor ve 95\. makalede kurduğumuz AdamW parametreleri oynatıyor. Öğrenme oranı 8\. makaledeki çizelgenin küçük hâli: kırk adımlık doğrusal ısınma, ardından dört yüz adıma yayılan kosinüs sönümü, tepe değer 0,05.

| Adım | Öğrenme oranı | Kayıp |
|---|---|---|
| 1 | 0,00125 | 2,1207 |
| 5 | 0,00625 | 2,0156 |
| 10 | 0,01250 | 1,8583 |
| 20 | 0,02500 | 1,3742 |
| 40 | 0,05000 | 0,5790 |
| 80 | 0,04864 | 0,4654 |
| 160 | 0,03875 | 0,4630 |
| 400 | 0,00500 | 0,4629 |

Eğitimden sonra model dört cümlenin dördünde de doğru fiile 0,999 olasılık veriyor. Kuralı öğrendi. Ama asıl öğretici olan, kaybın **nerede** durduğu.

## Kaybın durduğu yer bir sayıdır ve o sayıyı biz yazdık

Kayıp 0,46286'da duruyor ve daha aşağı inmiyor. Bu bir eksiklik değil; dilin kendi entropisi.

Hesabı kendimiz yapalım. Üç hedef konumu var; bu bölümde onları tahmin edilen token'ın sırasıyla sayıyoruz: birinci konum özne, ikinci konum zarf, üçüncü konum fiil. Birinci konumda bağlam yalnızca `başla` ve devamı eşit olasılıkla `kedi` ya da `köpek`; hiçbir model bunu bilemez, kaybın alt sınırı ln 2 = 0,6931. İkinci konumda bağlam özneyi içeriyor ama devamı yine eşit olasılıkla `bugün` ya da `dün`; yine ln 2. Üçüncü konumda ise fiil özne tarafından belirlenmiş durumda, dolayısıyla alt sınır sıfır. Üçünün ortalaması 2 × ln 2 ÷ 3 = 0,46210.

Modelimizin konum başına kayıpları: 0,6939 · 0,6938 · 0,0010. Üçü de sınırın on binde birkaç üstünde. Model, öğrenilebilecek her şeyi öğrenmiş ve öğrenilemeyecek hiçbir şeyi öğrenmemiş.

2\. makalede indirgenemez hatayı "gürültü tabanı" diye tanıtmıştık; 94\. makalede entropinin şaşkınlığın beklentisi olduğunu kurmuştuk. Burada ikisi aynı sayıda buluşuyor — ve bu sayı kaynaktan gelmiyor, dili biz yazdığımız için kesin olarak biliniyor. Gerçek bir derlemde bu tabanın ne olduğunu kimse bilmez; kaybın düşmeyi bırakması, modelin tükendiği anlamına da gelebilir, dilin tükendiği anlamına da.

Şimdi taban çizgilerini koyalım, çünkü 99\. makale bunu bir tasarım kararı saymıştı.

| Tahminci | Kayıp |
|---|---|
| Düz tahmin, yedi token eşit | 1,9459 |
| Tekli sayım | 1,7918 |
| İkili sayım | 0,6931 |
| **Mikro-GPT** | **0,4629** |
| Dilin entropisi | 0,4621 |

İkili sayım — yalnızca bir önceki token'a bakan bir tablo — 0,6931 alıyor, yani tam olarak ln 2. Sebebi 103\. makalede dili tasarlarken yazdığımız şey: zarf, fiil hakkında hiçbir bilgi taşımıyor, dolayısıyla bir önceki token'a bakan her model üçüncü konumda yazı tura atıyor. Mikro-GPT'nin ikili sayıma karşı kazancı 0,6931 − 0,4629 = 0,2302 nat; bu, tek bir konumdaki ln 2'nin üçte birine (0,2310) çok yakın, çünkü kazanç yalnızca üç hedeften birinde, fiilde elde ediliyor. Dikkat mekanizmasının bu dilde yaptığı işin tamamı budur ve bu kadar küçük bir dilde doğrudan ölçülebilir.

![Beş satırlı iki sütunlu bir tablo ve altında iki kutu. Üstte başlık: taban çizgileri ve tavan, nat cinsinden kayıp; düşük olan iyidir. Sütunlar tahminci ve kayıptır. Birinci satır düz tahmin yedi token eşit: 1,9459. İkinci satır tekli sayım: 1,7918. Üçüncü satır ikili sayım: 0,6931. Dördüncü satır vurguludur, mikro-GPT: 0,4629. Beşinci satır dilin entropisi: 0,4621. Birinci kutuda konum başına kayıplar durur: birinci konum 0,6939, ikinci konum 0,6938, üçüncü konum 0,0010; ilk iki konumun alt sınırı ln 2'dir çünkü devamları eşit olasılıklıdır, üçüncü konumun alt sınırı sıfırdır çünkü fiil özne tarafından belirlenir. İkinci kutuda kazanç durur: mikro-GPT'nin ikili sayıma karşı kazancı 0,2302 nattır ve bu, tek bir konumdaki ln 2'nin üçte biridir; dikkat mekanizmasının bu dilde yaptığı işin tamamı budur. En altta bir kayıt: taban çizgileri ve entropi kapalı formüllerden, model kaybı kendi koşumuzdan gelir.](assets/kaybin-durdugu-yer.svg "Şekil 3 — Kaybın tabanı dilin kendisidir")

Şekil 3'te son iki satırın arası 0,0008; modelin öğrenilebilecek olanı bitirdiği yer orası.

## Beş tohum, iki ayrı sonuç

Buraya kadar tek bir koşudan söz ettik. 101\. makalede bunun neden yetmediğini uzun uzun konuşmuştuk; şimdi kendi deneyimizde sınayalım. Aynı kurulumu, yalnızca başlangıç ağırlıklarının çekildiği tohumu değiştirerek beş kez çalıştırdık.

| Tohum | Son kayıp | Nerede durdu |
|---|---|---|
| 7 | 0,46286 | dilin entropisinde |
| 11 | 0,46425 | dilin entropisinde |
| 23 | 0,69411 | ikili sayım tabanında |
| 42 | 0,46333 | dilin entropisinde |
| 101 | 0,69545 | ikili sayım tabanında |

Üç koşu entropi tabanına indi. İki koşu 0,694'te takıldı — yani tam olarak ikili sayım tabanında. O iki modelde dikkat, özneye ulaşmayı hiç öğrenemedi ve üçüncü konumda yazı tura atmayı öğrendi.

Beş sayının ortalaması 0,556 ve standart sapması 0,127. Ama **hiçbir koşu 0,556 vermedi.** Sonuçlar iki öbekte toplanmış durumda ve ortalama iki öbeğin arasındaki boşluğa düşüyor. 101\. makalede ortalamanın ve standart sapmanın ne zaman özet olmadığını konuşmuştuk; işte elimizde tam da o durum. Tek bir koşu bildirmiş olsaydık, tohuma göre "çalışıyor" ya da "çalışmıyor" derdik ve ikisi de doğru olmazdı.

![Yatay bir kayıp ekseni, 0,40'tan 0,70'e, üzerinde beş nokta. Üç nokta, tohum 7, 11 ve 42, dilin entropisi 0,4621 çizgisinin hemen yanında 0,463 dolayında üst üste duruyor. İki nokta, tohum 23 ve 101, ikili sayım tabanı 0,6931 çizgisinin yanında 0,694 dolayında. Aradaki boşlukta, 0,556'da, içi boş bir işaret ortalamayı gösteriyor ve hiçbir koşunun orada durmadığı yazıyor. Eksenin altında ortalama artı eksi bir sapmayı, yani 0,429 ile 0,683 arasını gösteren bir ayraç iki öbeği birden kaplıyor. En altta beş koşunun da bizim olduğu ve değişen tek şeyin tohum olduğu yazıyor.](assets/bes-tohum-iki-sonuc.svg "Şekil 4 — Ortalama, hiçbir koşunun vermediği sayı")

Şekil 4 aynı beş sayıyı bir cetvele diziyor ve tablonun gizlediğini gösteriyor: ortalama ile sapmanın çizdiği aralık iki öbeği birden kaplıyor, ama öbeklerin arasında hiç koşu yok. Tohumların bir kısmına bakmanın bedeli de burada: yalnızca 7, 11 ve 42 numaralı tohumları görseydik yöntemin çalıştığını, yalnızca 23 ile 101'i görseydik çalışmadığını yazacaktık.

> **Kendini yokla:** İki tohum tam olarak ikili sayım tabanında takıldı. Bu, o modellerin hiçbir şey öğrenmediği anlamına mı geliyor?

Hayır, tersine: iki konumun tamamını ve üçüncü konumun yarısını öğrendiler. 0,6931, "hiçbir şey bilmiyorum" değil; 1,9459 o. Takılan modeller dildeki bütün kolay yapıyı çıkarmış, yalnızca iki konum geriye uzanan bağı kuramamış durumda. Başarısızlığın nerede olduğunu ancak taban çizgilerini önceden hesapladığımız için görebiliyoruz.

## Ablasyonların söylemediği

99\. makaledeki kural açıktı: bir ablasyon farkı, koşular arası sapmadan büyük değilse hiçbir şey söylemez. Elimizde artık o sapma var — 0,127 — ve her ablasyonu yine beş tohumla çalıştırdık.

| Koşul | Ortalama ± sapma | Tam modele fark |
|---|---|---|
| Tam model | 0,55600 ± 0,12669 | — |
| Konum embedding'i yok | 0,50968 ± 0,10368 | −0,04632 |
| Tek blok, 208 parametre | 0,46338 ± 0,00045 | −0,09262 |
| Tek baş, aynı parametre sayısı | 0,51252 ± 0,10838 | −0,04349 |
| Isınma yok, sabit oran 0,05 | 0,46457 ± 0,00405 | −0,09143 |
| Tepe oran 0,005 | 0,50360 ± 0,01739 | −0,05240 |
| Tepe oran 0,5 | 0,69762 ± 0,27936 | +0,14162 |
| 100 adım | 0,53783 ± 0,09346 | −0,01817 |

Hiçbir farkın büyüklüğü iki standart sapmayı, yani 0,2534'ü geçmiyor. Tablonun okunacak yeri fark sütunu değil, sapma sütunu. Mimariyle ilgili hiçbir değişiklik ortalamayı iki standart sapmadan uzağa taşımıyor; yani bu deneyde konum embedding'inin, ikinci bloğun ve iki başın hiçbiri ölçülebilir bir katkı yapmıyor. Bu, o bileşenlerin gereksiz olduğunu göstermez — dilin dört cümleden ibaret olduğunu gösterir. 99\. makalenin cümlesiyle: ablasyonun kanıt yükü, farkın kendi gürültüsünden büyük olmasıdır.

Bu tabloyu bir önceki bölümün uyarısıyla okumak gerekiyor: sonuçlar iki öbekte toplanıyorsa ortalama ile sapma iyi bir özet değil. Ama sapma burada başka bir iş görüyor. Koşuların hepsi entropi tabanına inerse sonlar 0,462 ile 0,470 arasında kalır ve sapma binde birler düzeyinde çıkar; 0,1 dolayında bir sapma ise ancak koşulardan en az birinin 0,69'daki öbeğe düşmesiyle oluşur. Yani sapma sütunu, kaç koşunun takıldığının dolaylı bir sayacı.

Bu gözle iki satır dikkat çekici ve dikkat çeken şey ortalamaları değil, sapmaları. Tek bloklu model beş tohumun beşinde de tabana indi ve sapması 0,00045'te kaldı; ısınmasız koşunun sapması 0,00405. İkisi de tam modelin 0,12669'unun yanında yok denecek kadar küçük. Yani bu iki değişiklik ortalamayı iyileştirmedi, **güvenilirliği** iyileştirdi: iki katlı yığında bazen kurulamayan bağ, tek katlıda hep kuruldu. Ters uçta on kat büyük öğrenme oranı sapmayı 0,27936'ya çıkarıyor, yani koşuların birbirinden farkı iyice açılıyor.

Buradan bir tavsiye çıkarmıyoruz; beş tohum bunun için az. Ama bir okuma kuralı çıkıyor: bir ablasyon tablosunda yalnızca ortalamalara bakmak, ölçülen şeyin yarısını görmektir. Aynı kurulumun ne kadar oynadığı, o kurulumun ne kadar iyi olduğu kadar bilgi taşır.

### İleri okuma notu: dikkat ağırlıkları yine hiçbir şey göstermiyor

Eğitilmiş modelin üçüncü konumdaki dikkat ağırlıklarına bakalım — yani zarfın, fiili tahmin ederken geriye nasıl baktığına. Birinci bloğun birinci başında ağırlıklar `başla` 0,355 · `kedi` 0,375 · `bugün` 0,270. Neredeyse düz. Model kuralı yüzde 99,9 doğrulukla öğrendi, ama özneye ayırdığı pay komşusundan on kat değil, yalnızca yüzde otuz fazla.

6\. makalede Sarthak Jain ve Byron Wallace'ın uyarısını aktarmıştık: dikkat ağırlığı modelin hesabındaki bir ara büyüklüktür, "model buraya baktı" cümlesinin kanıtı değil. Kendi modelimizde bunun mekanik sebebini sayıyla görebiliyoruz. İki cümleyi karşılaştıralım — biri `kedi`, öbürü `köpek` ile. Üçüncü konumun ağırlıkları arasındaki en büyük fark 0,0215. Aynı konumun okuduğu değer vektörleri arasındaki en büyük fark ise 0,6410, ve dikkat çıktısına yansıyan fark 0,2244.

Yani ağırlıklar neredeyse aynı, çıktı belirgin biçimde farklı. Bilgiyi taşıyan şey tartı değil, tartılan şey: `kedi`nin ve `köpek`in değer vektörleri ayrışmış durumda ve ağırlıklı ortalama o ayrımı olduğu gibi geçiriyor. Bir dikkat haritasına bakıp "model şuraya baktı" demenin neden yetmediğinin en küçük ölçekli kanıtı bu — haritada görünmeyen bir kanal var ve bütün iş orada dönüyor.

## Bir eğitim koşusunu okumanın disiplini

**Tokenizer derleminin aynasıdır.** Aynı algoritma, bu serinin metninde Türkçe eklerini buluyor ama "okul" kökünü ikiye kırıyor; ızgarayı çizen şey dil değil, o metindeki sıklık.

**Sözlük büyütmenin getirisi tükenir, maliyeti tükenmez.** İlk yüz satırın her biri 6.888 token kazandırırken son üç bin satırın her biri 19 kazandırıyor.

**Kaybın durduğu yeri önceden hesapla.** Dilin entropisi 0,4621; model 0,4629'da durdu. Bu sayıyı bilmeden "model daha iyi olabilir miydi" sorusuna cevap verilemez.

**Taban çizgisi olmadan kazanç okunamaz.** İkili sayım 0,6931 veriyor; modelin bütün katkısı aradaki 0,2302 nat.

**Bir koşu bir sonuç değildir.** Beş tohumun ikisi kuralı hiç öğrenemedi ve beşinin ortalaması hiçbir koşunun vermediği bir sayı.

**Ablasyon, sapmadan büyük olduğu kadar bilgi taşır.** Bu deneyde hiçbir mimari değişiklik sapmayı aşmadı; söylenebilecek cümle "ölçemedik"tir.

### Sırada ne var

Elimizde dilin kuralını bilen bir model var: `başla kedi` gördüğünde `bugün` ile `dün` arasında tam olarak yarı yarıya bölünüyor, çünkü derlem ikisini de eşit sıklıkta gösterdi. Peki ya biz ikisinden birini yeğliyorsak? Doğru cevabı olmayan, yalnızca tercih edilen bir cevabı olan bir soru bu — ve 12 ile 13\. makalelerde bunun iki ayrı çözümünü görmüştük. Bir sonraki makalede ikisini de 364 parametre üzerinde çalıştırıyoruz: tercihi yerleştirmek modelin bildiklerine ne yapıyor, ve tasmanın sıkılığı gerçekten uzaklığı belirliyor mu?

## Kaynakça

- Sennrich, R., Haddow, B. & Birch, A. (2016). *Neural Machine Translation of Rare Words with Subword Units*. ACL 2016, s. 1715–1725. [Bağlantı](https://aclanthology.org/P16-1162/)
- Tao, C., Liu, Q., Dou, L., Muennighoff, N., Wan, Z., Luo, P., Lin, M. & Wong, N. (2024). *Scaling Laws with Vocabulary: Larger Models Deserve Larger Vocabularies*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/file/cf5a019ae9c11b4be88213ce3f85d85c-Paper-Conference.pdf)
- Biderman, S., Schoelkopf, H., Anthony, Q. G., Bradley, H., O'Brien, K., Hallahan, E., Khan, M. A., Purohit, S., Prashanth, U. S., Raff, E., Skowron, A., Sutawika, L. & Van Der Wal, O. (2023). *Pythia: A Suite for Analyzing Large Language Models Across Training and Scaling*. ICML 2023, PMLR 202, s. 2397–2430. [Bağlantı](https://proceedings.mlr.press/v202/biderman23a.html)
- Jain, S. & Wallace, B. C. (2019). *Attention is not Explanation*. NAACL-HLT 2019, s. 3543–3556. [Bağlantı](https://aclanthology.org/N19-1357/)
