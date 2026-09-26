---
article_id: article_6dc26760-97db-40ea-843a-7ab16e3d4cdf
title: "Son Adım: Haritayı Yeniden Çizmek"
slug: son-adim-haritayi-yeniden-cizmek
category: multimodal-and-future
level: advanced
reading_order: 118
summary: "Serinin son makalesi, sayıları eskidiğinde elde neyin kalacağını soruyor ve cevabı bir yordam olarak veriyor: bir iddia okurken ve bir sistem kurarken sorulacak soruların sırası, hangi cevabın okumayı bitirdiği ya da sırayı değiştirdiği, ve her sorunun serinin hangi makalesinde kurulduğu. Yordamı daha önce aktarılmış iki ölçümde işletiyor, ilk makalenin verdiği sözlerin nerede karşılandığını gösteriyor ve öğrenilenin nasıl tutulacağını hatırlama pratiği, geri bildirim ve karmaşık malzemedeki açık tartışmayla bitiriyor."
tags:
  - sentez
  - okuma-yordami
  - arastirmaci-ve-muhendis
  - geri-alma-maliyeti
  - hatirlama-pratigi
content_hash: sha256:3b0ca522234d82bde7c67ac806d78edab427fd19c6c33e40e75b009810a3deb1
classification_version: 1
classification_batch: 28
---
## Haritalar eskir

117\. makale bir uyarıyla kapandı: kullandığı sayıların çoğu hızla eskiyor. Son makalelerin hepsi aynı uyarıyı bir biçimde tekrarladı: aynı API adının arkasındaki model değişiyor, açık soruların kutuları yer değiştiriyor, ölçütler ezberleniyor. Bir haritanın ömrü, üzerindeki sayıların ömrü kadar.

Bu yüzden son makalenin sorusu şu: sayılar eskidiğinde elde ne kalıyor? Serinin önceki iki toplama makalesi iki ayrı biçim denemişti: 100 kavramların birbirine göre yerini, 114 kararların birbirini kısıtlama sırasını çizdi. Bu makalede üçüncü bir biçim var ve onu ötekilerden ayıran şey dallanma. Bir sorunun cevabı okumayı bitirebiliyor, sırayı değiştirebiliyor ya da elde kalan sonucun adını değiştirebiliyor. Soruların bu biçimde dizilmiş hâline **yordam** diyeceğiz.

Yordamın iki kolu var, çünkü seri iki okura yazıldı. Araştırmacı bir **iddia** okur ve onu kullanıp kullanmayacağına karar verir. Mühendis bir **sistem** kurar ve bir kararı verip vermeyeceğine karar verir. İki kolun soruları çoğunlukla farklı makalelerden geliyor ama aynı yere varıyor: bir şeyi, hangi koşulda doğru olduğunu bilerek kullanmak.

## Bir iddia okurken

Şekil 1'in sol kolu altı sorudan oluşuyor ve her birinin kurulduğu ya da derinleştiği makaleler parantez içinde.

İlk soru, sayının ölçülmüş mü türetilmiş mi olduğu. 98\. makalede bir bildirideki her sayının ölçüm olmadığını, 40'ta bir eğilimi ileriye uzatmanın bir ölçüm olmadığını görmüştük. Sayı türetilmişse okuma orada değişir: dayandığı varsayım yazılır ve sayı bir ölçüm gibi taşınmaz.

İkinci soru koşul. 16\. makalede kurduğumuz alışkanlık — bir sayı gördüğünde neyin ölçüldüğünü sormak — seri boyunca hemen her makalede bir satıra dönüştü: hangi model, hangi alt küme, hangi donanım, hangi sürüm. 80'de de koşulları yazılmamış bir puanın taşındığı her yerde yanlış okunduğunu görmüştük. Bu soru okumayı bitirmez; sayının yanına koşulunu yazdırır.

Üçüncüsü taban çizgisi: sayı neye göre ölçülmüş, ve kıyas adil mi. 97\. makalede yeni bir yöntemin değerinin iyi ayarlanmış bir taban çizgisine göre ölçüldüğünü, 99'da taban çizgisi seçmenin kazancı tanımlamak olduğunu ve arama bütçesinin deneyin parçası sayılması gerektiğini görmüştük. Taban ayarlanmamışsa ya da iki tarafın bütçesi eşit değilse, kazanç tanımsız kalır.

Dördüncüsü gürültü. 101'de sınanan şeyin iddianın kendisi değil karşıtı olduğunu, 104'te beş tohumun ortalamasının hiçbir koşunun vermediği bir sayı olabildiğini görmüştük. Fark gürültüden büyük değilse söylenecek cümle "ölçemedik"tir.

Beşincisi vekil. 13\. makalede aşırı optimizasyonu kurarken, 16'da ölçünün hedefe dönüştüğü anda, 110'da ise yeterince aranan bir vekilin kırıldığında aynı deseni görmüştük. Ölçülen şey istenen şeyin vekiliyse, sonuç o vekilin adıyla anılır.

Altıncısı yeniden elde etmek. 102'nin kapanış cümlesi buydu: bir sonucu kullanmadan önce onu kimin, hangi düzenekte, hangi sayıyla elde ettiğini sor. Başka kimse elde etmemişse sonuç kullanılabilir, ama tek bir sonuç olarak.

![İki kollu bir akış şeması; üstte başlık: sıradaki soruyu önceki cevap seçer. Sol kol, bir iddia okurken: ölçülmüş mü, türetilmiş mi (98, 40); hangi koşulda (16, 80); taban çizgisi ne, adil mi (97, 99); fark gürültüden büyük mü (101, 104); ölçülen şey bir vekil mi (13, 110); kim yeniden elde etti (102); sonu koşuluyla kullan. Sağ kol, bir sistem kurarken: birim ne, sınır nerede (90, 108); geri alınabilir mi (114, 115); doğrulama hazır mı (35, 113); arayüz neyi yasaklıyor (111); hangi güvenilirlik çıtası (40, 47); düzeltme mi, açıklama mı (109); sonu geri alınabilir adımla dene ve ölç. Sekiz sorunun yanında vurgulu bir çıkış, ikisinde dur işareti, dördünün yanında not var.](assets/iki-kollu-yordam.svg "Şekil 1 — Sıradaki soruyu önceki cevap seçer")

Yordamı serinin daha önce aktardığı bir ölçümde işletelim; yeni bir sayı gerekmiyor. 115\. makalede Lingjiao Chen ve arkadaşlarının *Harvard Data Science Review*'daki ölçümünü görmüştük: aynı API adı altında GPT-4'ün, yarısı asal yarısı bileşik bin sayıyı ayırma doğruluğu Mart'tan Haziran 2023'e yüzde 84,0'dan 51,1'e iniyordu. Birinci soru: ölçülmüş, kaynağın kendi tablosunda. İkinci soru: koşul — bin sayı, adım adım düşünme istemi, iki tarihli sürüm. Üçüncü soru: taban çizgisi ne? Burada yordam iş görüyor. Bu kümede her sayıya "bileşik" diyen sabit bir cevap 500 ÷ 1.000 = yüzde 50 alır; 51,1 bu tabanın 1,1 puan üstünde (ikisi de bizim hesabımız). Haziran sürümü de sayıların yüzde 98,7'sine "bileşik" diyordu; kaynağın metninde 99,7 yazıyor, ama iki hücrenin toplamı 98,7. Beşinci soru: ölçülen şey neyin vekili? Doğruluk burada bilginin değil cevap davranışının vekili. Yordamın çıktısı tek cümle: "model aynı adın altında davranış değiştirdi; bilgi kaybı bu ölçümle gösterilmedi." Kaynağın kendisi de iki okumayı birlikte kaydediyordu.

> **Kendini yokla:** Bu örnekte hangi soru, "GPT-4 üç ayda aptallaştı" okumasını durdurdu?

Taban çizgisi sorusu. Sabit bir cevabın aynı kümede ne alacağını hesaplamak, 51,1'in şansın hemen üstünde bir sayı olduğunu gösterdi. Ondan sonra vekil sorusu yalnızca adı koydu: düşüş bilginin değil cevap biçiminin ölçüsüydü.

## Bir sistem kurarken

Sağ kol, bir karar vermeden önce sorulan altı soru.

İlki birim ve sınır. 108'de bir FLOP'un bir zaman birimi olmadığını, işlemlerin küçük bir payının sürenin büyük bir payını yiyebildiğini; 90'da bir enerji sayısının ilk sorusunun sınırın nerede çizildiği olduğunu görmüştük. Birimi yanlış seçilen bir hesap doğru yapılsa da yanlış karara götürür.

İkincisi geri alma. 114'te bir kararın hak ettiği dikkati maliyetinin değil geri alma maliyetinin belirlediğini, 115'te bir üründe bu maliyetin modelin içinde değil ürünün dünyaya değdiği kenarda toplandığını görmüştük. Karar geri alınamazsa sıra değişir: önce kanıt, sonra karar.

Üçüncüsü doğrulama. 35'te üretmek ile doğrulamak arasındaki asimetrinin probleme ait olduğunu, 113'te bir alanda yapay zekânın işe yaramasını modelin gücünden çok bu iki maliyetin oranının belirlediğini görmüştük; 113 bu oran cümlesini ölçülmüş bir yasa olarak değil, vakalardan çıkarılmış bir okuma olarak yazmıştı. Yordamın kuralı buradan çıkıyor (bizim çıkarımımız): doğrulama hazır değilse önce onu kur.

Dördüncüsü arayüz. 111'de bir modelin "beceremediği" şeylerin bir kısmının arayüzün baştan yasakladığı şeyler olduğunu görmüştük. Sistemin bir hatası, önce arayüzün izin verdiği eylemler listesine bakılarak okunur.

Beşincisi güvenilirlik çıtası. 40'ta görev ufkunun seçilen başarı çıtasına göre tanımlı olduğunu, 47'de ortalama başarı ile her denemede başarının ayrı sayılar olduğunu görmüştük. Kullanıcı bir sistemi ortalamasıyla değil, kendi denemesinde yaşar.

Altıncısı düzeltme ile açıklamanın ayrılması. 109'un kapanışındaki cümle buydu: bir düzeltme bir açıklama değildir. Sıçramayı durduran bir yöntem, sıçramanın nedenini söylemiş olmaz.

Sağ kolu da serinin bir vakasında işletelim. 113\. makalede iki alanı yan yana koymuştuk: protein yapısı ve yeni malzeme. Birim sorusu ikisinde de aynı yere çıkıyor: modelin ürettiği aday başına doğrulamanın maliyeti. Geri alma sorusu da ikisinde benzer: yanlış bir aday laboratuvara girmeden elenirse geri alınacak bir şey kalmıyor. Ayrışma üçüncü soruda. Protein yapısında doğrulama hazırdı: kör ve önceden kurulmuş bir sınav, ve on dördüncü turunda, 87 protein alanında, John Jumper ve arkadaşlarının yönteminin omurga hatasının ortancası 0,96 ångström çıkıyordu. Malzemede hazır değildi. Amil Merchant ve arkadaşlarının çalışması 381 bin yeni kararlı aday öneriyordu; Nathan Szymanski ve arkadaşlarının otonom laboratuvarı ise yazarların 2026 düzeltmesine göre on yedi günde 36 hedefi sentezlemişti — 113'teki bölmemizle günde yaklaşık 2,1. Aradaki makas, yine 113'teki hesabımızla, büyüklük mertebesi olarak 500 yıl. Yordamın çıktısı 113'ün okumasıyla uyumlu: doğrulama hazır değilse önce onu kurmak, çünkü üretimi büyütmek okunamayan çıktıyı da büyütür (bu gerekçe bizim).

İki kolun sonu aynı şeyi istiyor: koşulu bilerek davranmak. Sol kol bir şeyi koşuluyla kullanıyor; sağ kol bir kararı geri alınabilir bir adımla deniyor ve ölçüyor. Bu iki cümlede yeni bir kavram yok; seri boyunca kurulan şeylerin kullanılabilir bir hâli.

## Sıra neden bu

98\. makalede bir bildiriyi okumanın bir kontrol listesi değil bir sıra olduğunu görmüştük; bu yordam aynı fikri iki kola taşıyor. Bir sıra iddiasının gerekçesi de yazılmalı.

Sol kolda ilk soru ölçülmüş mü türetilmiş mi sorusu, çünkü sonraki beş soru bir ölçüm varsayıyor: türetilmiş bir sayının gürültüsü ya da taban çizgisi sorulmaz, varsayımı sorulur. Koşul taban çizgisinden önce geliyor, çünkü iki sayı ancak aynı koşuldaysa doğrudan karşılaştırılabilir; 101'de aynı örnekleri görmeyen iki sistemin eşleştirilemediğini görmüştük. Gürültü taban çizgisinden sonra geliyor, çünkü adil olmayan bir tabana karşı ölçülmüş bir farkın büyüklüğü bir şey söylemez. Vekil sorusu gürültüden sonra, çünkü gerçek ve gürültüden büyük bir fark da yanlış şeyin farkı olabilir; yukarıdaki örnekte olduğu gibi. Yeniden elde etme en sonda, çünkü en pahalı sınama o: önceki beş sorudan geçemeyen bir iddiayı yeniden üretmeye çalışmak, bir yanlışı yeniden üretmek olur.

Sağ kolda birim başta, çünkü öteki soruların çoğu bir maliyeti ya da bir süreyi karşılaştırıyor. Geri alınabilirlik ikinci, çünkü cevabı geri kalan soruların ne kadar sıkı sorulacağını belirliyor: geri alınabilir bir kararda doğrulama sonradan kurulabilir, geri alınamaz bir kararda önce. Doğrulama arayüzden önce geliyor, çünkü bir hatanın arayüzden mi modelden mi geldiğini ancak bir doğrulama gösterebilir. Güvenilirlik çıtası sona yakın, çünkü çıta ancak neyin ölçüldüğü belli olunca seçilebilir. Düzeltme ile açıklamanın ayrımı en sonda, çünkü o soru sistem çalıştıktan sonra sorulur: bir sorun kapandığında, neden kapandığı.

Bu sıranın ölçülmüş bir en iyisi yok; serinin kendi deneyiminden çıktı ve dallanmalar onu çoğu durumda kısaltıyor.

## İlk makalenin sözleri

Serinin ilk makalesi, sezgiyle kurduğu kavramları ileride matematiğiyle yeniden kuracağını, alanın birincil çalışmalarını okuyup değerlendirmeyi, bir deneyi tasarlayıp ölçmeyi ve sonunda küçük bir dil modelini elle kurup eğitimin gerçek maliyetini hesaplamayı öğreteceğini söylemişti. Bu sözlerin karşılığı sırasıyla 91–97, 98, 99 ile 101, ve 103–109 arasındaki makalelerde duruyor. 2\. makale de kayıp fonksiyonunun, gradyan inişinin ve genellemenin, 3'ü de temsilin serinin sonuna kadar peşimizi bırakmayacağını söylemişti ve dördü de geri döndü: kayıp 94'te bilgi kuramıyla, gradyan 95'te eğriliğiyle yeniden kuruldu; genelleme 96'da ve 116'da ölçülmüş ama hâlâ açıklanmamış bir soru olarak döndü; temsil 74–77'de okunmaya, 110'da bir dünya modeli olup olmadığı sorusuna dönüştü.

Şekil 1'deki soruların çoğu, bu sözlerin karşılandığı makalelerde kuruldu.

## Bundan sonra ne okumalı

Seri bir okuma listesiyle bitmiyor, çünkü böyle bir liste bu makalenin başında söylenen hızla eskir. Bunun yerine iki kol için birer okuma biçimi bırakıyor.

Araştırmacı için 116'daki bilinmeyen türleri bir okuma gündemi olarak da iş görüyor. Ölçen aracı olmayan bir soru üzerine okuyorsan aradığın şey, yeni bir ölçüm aracı kuran çalışma. Ölçülmüş ama açıklanmamış bir soru üzerine okuyorsan, açıklamaların farklı tahmin ettiği bir sayıyı sınayan çalışma. Ölçümleri çelişen bir soruda, iki tarafı aynı koşulda ölçen çalışma. Yeni bir bildirinin bu üçünden hangisini yaptığı, onu okumaya değer kılan şeydir; hiçbirini yapmıyorsa, bu da bir bilgidir. 98'deki okuma sırası burada devreye giriyor: iddiayı hangi tablo taşıyor, ve okuduğun hangi sürüm.

Mühendis için bir sistemi anlatan belgeler aynı biçimde okunur. 80'deki model ve sistem kartları, 114'teki teknik raporlar hangi halkayı belgeliyorsa o halka hakkında bir şey söyler; bir belgeyi okumadan önce hangi halkayı belgelediğini sormak, onu okumanın yarısıdır. 103–105'te yaptığımız işin de genel bir hâli var: bir şeyi anladığını görmenin yolu, onu küçük ölçekte yeniden kurmak. 102'de tekrarlanabilirliğin üç ayrı işini ayırmıştık: aynı kodu çalıştırmak, yöntemi yeniden kurmak, bulguyu başka veriyle almak. Ortadaki, bir okurun kendi başına yapabileceği en öğretici iş.

## Öğrendiğini nasıl tutarsın

Serinin her makalesinde sana sorular soruldu ve cevapları hemen ardından verildi. Bu tasarımın iki ölçülmüş gerekçesi ve açık bir tartışması var.

Birinci gerekçe hatırlama pratiği. Henry Roediger ile Jeffrey Karpicke'nin *Psychological Science*'ta 2006'da yayımlanan ikinci deneyinde 180 lisans öğrencisi kısa düzyazı metinleri ya dört kez okudu ya bir kez okuyup üç kez hafızadan yazmaya çalıştı; bir hafta sonra hafızadan yazan grup yüzde 61, yalnızca okuyan grup yüzde 40 hatırlıyordu. Bu sonuç, sınamalarda hiç geri bildirim verilmediği hâlde çıktı.

İkinci gerekçe geri bildirim, ve kutulardaki cevabın hemen ardından gelmesinin nedeni bu. Shana Carpenter, Steven Pan ve Andrew Butler'ın *Nature Reviews Psychology*'de 2022'de yayımlanan derlemesi, hatırlama denemesinin ardından doğru cevabı görmenin etkiyi genellikle artırdığını yazıyor; kazanç özellikle doğru ya da eksiksiz hatırlayamadığın durumlardan geliyor, çünkü geri bildirim yanlışı düzeltiyor ve boşluğu dolduruyor. Aynı derleme, hatırlama oturumları günlerle ya da haftalarla aralıklandığında öğrenmenin daha kalıcı olduğunu da özetliyor. Makalenin içindeki kutular ise hemen sorulan, tek oturumluk bir pratikti; kalıcılık için sorulara günler sonra dönmek gerekiyor.

Açık tartışma malzemenin karmaşıklığında, ve bu serinin yazıları tam o tarafta duruyor. Tamara van Gog ile John Sweller, *Educational Psychology Review*'un 2015'teki bir özel sayısında, birbiriyle etkileşen öğelerin sayısı arttıkça sınama etkisinin azaldığını ve çok karmaşık malzemede kaybolabildiğini savundu. Aynı sayıda Jeffrey Karpicke ile William Aue itiraz etti: karmaşıklığın ölçülebilir biçimde tanımlanmadığını, çalışılmış örnek deneylerinin karmaşıklığı hiç değiştirmediğini, etkiyi karmaşık malzemede gösteren — aralarında malzemenin karmaşıklığını doğrudan değiştirenler de bulunan — çalışmaların derlemede atlandığını, ve etkinin görülmediği deneylerin ya tek tek sözcükleri ya da hemen ardından yığılmış bir pratiği sınadığını yazdılar. İki taraf da derleme ve yorum düzeyinde konuşuyor; karmaşıklığı ölçülebilir biçimde değiştirip iki tarafın koşulunu birlikte sınayan bir deney, Eylül 2026 itibarıyla bulabildiğimiz kadarıyla yok. Bu, 116'daki üçüncü türden bir soru: koşul — karmaşıklığın tanımı — netleşmeden erimeyecek.

> **Kendini yokla:** Makalelerdeki soruların cevabı neden hemen bir sonraki paragrafta veriliyordu?

Çünkü öğretmensiz bir ortamda hatırlama denemesi yanlış ya da eksik çıkabilir, ve derlemeye göre geri bildirimin kazancı en çok o durumdan geliyor: yanlışı düzeltiyor, boşluğu dolduruyor. Cevapsız bir soru, yanlış bir hatırlamayı olduğu gibi bırakabilirdi (bu son cümle bizim okumamız).

## Serinin bıraktığı

**Sayılar eskir, sorular kalır.** Bu serinin sayılarının çoğu yazıldığı yılın modellerine ait; onları okumanın soruları değişmiyor.

**Bir iddia altı soruyla okunur ve bazı cevaplar okumayı bitirir.** Ölçülmüş mü, hangi koşulda, taban çizgisi ne ve adil mi, gürültüden büyük mü, neyin vekili, kim yeniden elde etti.

**Bir karar altı soruyla verilir ve bazı cevaplar sırayı değiştirir.** Birim ne, geri alınabilir mi, doğrulama hazır mı, arayüz neyi yasaklıyor, hangi çıta, düzeltme mi açıklama mı.

**Tutmak için hafızadan çağır, cevabını kontrol et ve aralıklarla dön.** Bu, kısa metinlerde ve olgularda sağlam biçimde ölçülmüş; karmaşık malzemede tartışmalı.

Yordamın da sınırı var. On iki soru eksiksiz değil ve her iddia ya da sistem hepsini gerektirmiyor. Parantezdeki makaleler bir sorunun kurulduğu ya da derinleştiği yerleri gösteriyor, tek geçtiği yerleri değil. Hatırlama üzerine ölçümlerin çoğu kısa metinlerden ve olgulardan geliyor; uzun bir teknik seriye ne kadar taşındığı, yukarıdaki tartışmanın tam konusu.

### Sırada ne var

Bu serinin bir sonraki makalesi yok. Sıradaki adım senin: bu hafta karşılaştığın bir iddiayı Şekil 1'in sol koluyla, üzerinde çalıştığın bir kararı sağ koluyla bir kez yürüt. Bir ay sonra da bu makaleye bakmadan on iki soruyu hafızadan yazmayı dene, sonra buraya dönüp cevaplarını karşılaştır. Haritayı yeniden çizmenin yolu, bu soruları her yeni iddiada yeniden sormak.

## Kaynakça

- Chen, L., Zaharia, M. & Zou, J. (2024). *How Is ChatGPT's Behavior Changing Over Time?* Harvard Data Science Review, 6(2). [Bağlantı](https://doi.org/10.1162/99608f92.5317da47)
- Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O. ve ark. (2021). *Highly accurate protein structure prediction with AlphaFold*. Nature, 596(7873), s. 583–589. [Bağlantı](https://doi.org/10.1038/s41586-021-03819-2)
- Merchant, A., Batzner, S., Schoenholz, S. S., Aykol, M., Cheon, G. & Cubuk, E. D. (2023). *Scaling deep learning for materials discovery*. Nature, 624(7990), s. 80–85. [Bağlantı](https://doi.org/10.1038/s41586-023-06735-9)
- Szymanski, N. J., Rendy, B., Fei, Y., Kumar, R. E., He, T., Milsted, D. ve ark. (2023). *An autonomous laboratory for the accelerated synthesis of inorganic materials*. Nature, 624(7990), s. 86–91. [Bağlantı](https://doi.org/10.1038/s41586-023-06734-w)
- Szymanski, N. J., Rendy, B., Fei, Y., Kumar, R. E., He, T. ve ark. (2026). *Author Correction: An autonomous laboratory for the accelerated synthesis of inorganic materials*. Nature, 650(8100), s. E1. [Bağlantı](https://doi.org/10.1038/s41586-025-09992-y)
- Roediger, H. L., III & Karpicke, J. D. (2006). *Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*. Psychological Science, 17(3), s. 249–255. [Bağlantı](https://doi.org/10.1111/j.1467-9280.2006.01693.x)
- Carpenter, S. K., Pan, S. C. & Butler, A. C. (2022). *The science of effective learning with spacing and retrieval practice*. Nature Reviews Psychology, 1, s. 496–511. [Bağlantı](https://doi.org/10.1038/s44159-022-00089-1)
- van Gog, T. & Sweller, J. (2015). *Not New, but Nearly Forgotten: the Testing Effect Decreases or even Disappears as the Complexity of Learning Materials Increases*. Educational Psychology Review, 27(2), s. 247–264. [Bağlantı](https://doi.org/10.1007/s10648-015-9310-x)
- Karpicke, J. D. & Aue, W. R. (2015). *The Testing Effect Is Alive and Well with Complex Materials*. Educational Psychology Review, 27(2), s. 317–326. [Bağlantı](https://doi.org/10.1007/s10648-015-9309-3)
