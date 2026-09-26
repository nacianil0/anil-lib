---
article_id: article_4e7a5f67-ff81-4cdb-9395-e487916747ff
title: "Koşunun Güvenilirliği: Kontrol Noktası, Sıçrama ve Gözlem"
slug: kosunun-guvenilirligi-kontrol-noktasi-sicrama-ve-gozlem
category: models-and-training
level: advanced
reading_order: 109
summary: "8. makaledeki arıza istatistiklerinin üzerine karar katmanını koyar: kontrol noktası aralığının kapalı formülü ve kaçınılmaz kayıp oranı, bir arızanın fark edilme ve toparlanma süresi, geride kalan sunucuların tanısı, ve kayıp sıçradığında ne yapıldığı. Sıçramanın kötü veriden değil verinin parametre durumuyla bileşiminden geldiğini gösteren ablasyonu ve aynı kararsızlığın küçük modellerde nasıl yeniden üretildiğini kurar."
tags:
  - egitim-operasyonu
  - kontrol-noktasi
  - hata-toleransi
  - kayip-sicramasi
  - gozlem
content_hash: sha256:9bd7881f894c6687e4e5cdc90e201d54ee6ee9b29b98b085c1e0709907a19db7
classification_version: 1
classification_batch: 26
revised_at: "2026-09-26"
revision_note: "İzleme katmanlarının içeriği kaynakla hizalandı: saniye ve milisaniye düzeyinde ne ölçüldüğü düzeltildi, bağ kopmasının kök nedeni eklendi, tanı süresinin ortalama olduğu belirtildi."
---
## Hızlı adım, uzun koşu

Son iki makale bir eğitim adımını önce kartlara dağıttı, sonra kartın içinde hızlandırdı. Ama bir eğitim koşusu tek bir adım değil: on binlerce kartta haftalarca süren yüz binlerce adım. O ölçekte bir şey kesindir — bir yerde bir şey bozulacak.

8\. makalede bunun sayılarını görmüştük. Aaron Grattafiori ve arkadaşlarının yazdığı Llama 3 raporu, 54 günlük bir kesitte 466 iş kesintisi bildiriyor; 47'si planlı, 419'u beklenmedik. Beklenmedik kesintilerin yaklaşık yüzde 78'i donanım kaynaklı ya da öyle olduğundan şüpheleniliyordu; listenin tepesinde 148 arızalı kart ve 72 bellek arızası vardı. Aynı makalede kontrol noktasının (checkpoint) ne olduğunu da koymuştuk: ağırlıkların ve koşuyu kaldığı yerden sürdürmek için gereken eniyileyici durumunun diske yazılan kopyası.

Orada anlattığımız şey olgulardı. Bu makale onların üzerine **karar katmanını** koyuyor ve üç soru soruyor. Ne sıklıkta kaydedersin? Bir şeyin bozulduğunu ne kadar sürede anlarsın? Ve hiçbir şey bozulmadığı hâlde kayıp yukarı sıçradığında ne yaparsın?

## Ne sıklıkta kaydedersin

Bu sorunun kapalı bir cevabı var ve yapay zekâdan elli yıl eski. John Young'ın 1974'te *Communications of the ACM*'de yayımladığı iki sayfalık makale, uzun koşan bir hesapta en iyi kayıt aralığını türetiyor. Türetme kısa, ve sezgisi türetmeden önce kurulabiliyor.

İki kaynaktan kaybediyorsun. Birincisi kaydın kendisi: her kontrol noktası `δ` kadar süre alıyor ve o süre boyunca iş ilerlemiyor. `T` aralıkla kaydedersen bu kalem `δ/T` oranında bir kayıp demek. İkincisi arızanın sildiği iş: arızalar `M` ortalama aralıkla geliyorsa bir aralıkta arıza görme olasılığı `T/M`, ve arıza aralığın ortasında bir yere düştüğü için ortalama `T/2` kadar iş kayboluyor; oran `T/(2M)`. Toplam kayıp:

`f(T) = δ/T + T/(2M)`

İki terim ters yönde çalışıyor: sık kaydedersen ilki, seyrek kaydedersen ikincisi büyüyor. Aralığı biraz uzattığını düşün. Kayıt kaybından kazandığın pay aralık kısayken büyük, aralık uzadıkça küçük; arızanın sildiği işe eklediğin pay ise her uzunlukta aynı. En iyi nokta bu iki etkinin dengelendiği yer, ve bu biçimdeki bir toplamda denge, iki terimin **birbirine eşit** olduğu noktaya düşüyor. `δ/T = T/(2M)` eşitliğini çözünce:

**T\* = √(2δM)** ve bu aralıkta kaçınılmaz kayıp **f(T\*) = √(2δ/M)**

İkinci formül birincisinden hemen çıkıyor: en iyi noktada iki terim eşit olduğu için toplam, birinin iki katıdır, yani `2δ/T*`. Türevi sıfıra eşitlemek — `−δ/T² + 1/(2M) = 0` — aynı sonucu verir.

Sayı koyalım. 8\. makaledeki Llama 3 kesitinden ortalama arıza aralığını biz çıkaralım: 54 gün 77.760 dakika eder, 419 beklenmedik kesintiye bölününce **185,6 dakika**, yani yaklaşık üç saat. Şimdi kayıt maliyetini değiştirip sonuca bakalım:

| Kayıt maliyeti δ | En iyi aralık T\* | Kaçınılmaz kayıp |
|---|---|---|
| 10 saniye | 7,9 dakika | %4,2 |
| 2 dakika | 27,2 dakika | %14,7 |
| 10 dakika | 60,9 dakika | %32,8 |

Tablonun okunacak yeri son sütun: kayıt maliyetini altmış kat düşürmek — on dakikadan on saniyeye — kaybı sekiz kat düşürüyor. Bu, formülün kareköklü yapısından geliyor (√60 ≈ 7,7) ve tek bir mühendislik önceliği söylüyor — **aralığı ayarlamak değil, kaydı ucuzlatmak.**

![Bir çizgi grafiği. Yatay eksen kayıt aralığı T, 0'dan 120 dakikaya; dikey eksen kaybedilen süre, yüzde 0'dan 60'a. Kesikli iki eğri: kaydın maliyeti δ bölü T soldan hızla inen bir eğri, arızanın sildiği iş T bölü 2M sıfırdan yükselen bir doğru. Kalın üçüncü eğri toplam kayıptır ve U biçimindedir. İki kesikli eğrinin kesiştiği yerde ikisi de yüzde 7,3'tür; toplamın en küçük noktası aynı aralıkta durur: T yıldız 27,2 dakika, kayıp yüzde 14,7. Altta: toplam, iki kaybın eşitlendiği yerde en küçüktür; δ bölü T eşittir T bölü 2M, buradan T yıldız eşittir karekök 2δM ve toplam kayıp karekök 2δ bölü M. Kayıt: δ 2 dakika, M 185,6 dakika; eğriler formülden çizilmiştir, ölçüm değildir.](assets/kontrol-noktasi-araligi.svg "Şekil 1 — En iyi aralık, iki kaybın eşitlendiği yer")

Şekil 1 tablonun ikinci satırını çiziyor. Toplam kaybın dibi, iki kesikli eğrinin kesiştiği aralığın tam üstünde duruyor; dipten sağa ya da sola gitmek bir kaybı azaltırken öbürünü daha hızlı büyütüyor. Dibin yüksekliği ise δ'ya bağlı: kaydı ucuzlatmak bütün U'yu aşağı çekiyor.

Bu yüzdeleri somutlaştıralım. Aynı 54 günlük kesitte iki dakikalık bir kayıt maliyeti, yüzde 14,7'lik kayıpla, sekiz güne yakın bir süreyi hiçbir şey öğrenmeden geçirmek demek; on saniyelik bir kayıt aynı kesitte iki buçuk günden azına mal olur. Aradaki beş buçuk gün on binlerce kartın beş buçuk günüdür ve kayıp eğrisinde hiç görünmez.

John Daly'nin 2006'da *Future Generation Computer Systems*'te yayımladığı çalışma aynı problemin daha yüksek mertebeli çözümünü veriyor; Young'ın formülü `δ`, `M`'in yanında küçük kaldığı sürece iyi bir yaklaşım, ama kayıt maliyeti arıza aralığına yaklaştığında düzeltme gerekiyor. Yukarıdaki üçüncü satır zaten o bölgeye giriyor: on dakikalık bir kayıt, üç saatlik bir arıza aralığının yanında küçük sayılmaz.

Kaydın neden pahalı olduğunu da 106'nın defterinden okuyabiliriz. Kontrol noktası ağırlıkları **ve** eniyileyici durumunu tutar, yani parametre başına 16 bayt: 405 milyar parametrelik bir model için 6,48 TB. Bu hacmi dosya sistemine yazmak dakikalar sürer.

Kaydı ucuzlatmanın bilinen yolu onu ikiye bölmek. Ziheng Jiang ve arkadaşlarının NSDI 2024'te sunduğu, on iki binden fazla kartlı bir üretim sistemini anlatan çalışma kaydı **iki aşamaya** ayırıyor: birinci aşamada her kart kendi durumunu makinenin ana belleğine yazıyor ve eğitime devam ediyor; ikinci aşamada bir arka plan süreci o kopyayı dağıtık dosya sistemine taşıyor. Koşuyu durduran yalnızca birinci aşama, ve yazarlar onu saniyeler mertebesine indirdiklerini bildiriyor.

Neden mümkün olduğunu hesaplayabiliriz: 6,48 TB'lık durum zaten 107'deki eksenler boyunca kartlara bölünmüş durumda. Bin yirmi dört kart arasında bölüşülmüşse kart başına 6,33 GB düşer, ve o kadarını kendi makinesinin belleğine yazmak kısa sürer. Dosya sistemine giden 6,48 TB'ın tamamı ise koşunun yolundan çıkmıştır.

> **Kendini yokla:** Bir ekip "etkin eğitim süresi oranımız yüzde 90'ın üstünde" diyor. Bu, kontrol noktası maliyeti hakkında ne söyler?

Bir üst sınır söyler. Kaçınılmaz kayıp `√(2δ/M)` olduğuna göre, bunun 0,10'un altında kalması için `δ < 0,005 × M` gerekir. Yukarıdaki 185,6 dakikalık arıza aralığıyla bu, kontrol noktasının **bir dakikadan kısa** sürmesi demek. İki kümenin arıza aralığı aynı olmak zorunda değil, dolayısıyla bu kesin bir sayı değil bir mertebe tahmini; ama iki aşamalı kaydın neden icat edildiğini açıklamaya yetiyor.

## Ne kadar sürede fark edersin

Kaydı ucuzlattın; ikinci kalem arızanın fark edilme süresi. On iki bin kartta koşan bir işte bir kartın bozulduğunu kimse elle görmez, ve iş durmadan da bozulabilir.

Aynı üretim sistemi bu tarafı üç katmanda kuruyor. En altta **kalp atışı** iletileri var: her çalışan düzenli aralıklarla durumunu bildiriyor, ileti gelmezse sürücü koşuyu askıya alıp tanı sınamalarını başlatıyor. Sınamalar kasten hafif tutulmuş — kartlar arası bant ölçümü, komşu makinelerle bir hepsi-indirge denemesi — çünkü uzun bir tanı turu zaten kaybedilen süreyi büyütür. Sorunlu düğümler bulununca dışlanıyor, yerlerine sağlıklıları geliyor ve koşu son kontrol noktasından devam ediyor. Bildirilen süreler: arızayı bulup tanı sınamalarını çalıştırmak ortalama **on dakikadan az**, kesinti öncesindeki ilerlemeyi yakalamak **on beş dakika içinde**. Sonuç, etkin eğitim süresi oranının yüzde 90'ın üstünde kalması.

Fakat her bozulma bir durma değil. Fark edilmesi en zor kalem **geride kalan** (straggler): çalışmaya devam eden ama ötekilerden yavaş olan bir makine. 107'de kurduğumuz düzende her adım bir eşitlemeyle bitiyor, dolayısıyla on iki bin kartın hızını en yavaş kart belirliyor. Çalışmanın gözlemi somut: belirli makineler aynı ileri geçişi ötekilerden yaklaşık **yüzde 10 daha yavaş** yapıyor. Böyle bir kayıp hiçbir hata günlüğüne düşmez; yalnızca kart başına adım süresi ölçülürse görünür.

Geride kalanı bulmak üçüncü katmanı gerektiriyor: ince taneli ölçüm. Aynı çalışma her sıranın kod parçalarını çipin kendi olay zamanlayıcılarıyla ölçüp bütün kümeyi tek bir ısı haritası olarak çiziyor; haritanın renk ölçeği 2,0 ile 2,5 saniye arasında uzanıyor ve birkaç sıranın ötekilerden belirgin biçimde uzun sürdüğü tek bakışta görünüyor. Aynı araç bir sıra seçildiğinde onun veri, tensör ve boru hattı eksenlerindeki bağımlılıklarını da gösteriyor — yani 107'deki üç eksen burada bir hata ayıklama aracına dönüşüyor.

Ölçülen şeylerin listesi de frekanslarına göre ayrışıyor. Adım başına bakılanlar koşunun matematiğine ait: kayıp, gradyan normu ve öğrenme oranı — bu üçü bizim eklememiz, çalışmanın izleme sınıflamasında yer almıyor — ile yukarıdaki haritanın ölçtüğü sıra başına adım süresi. Çalışmanın izleme düzeninde saniye düzeyinde bakılanlar genel sağlık durumuna ve ağ yapılandırmasına ait: tıkanıklık bildirimi ve akış denetimi ayarları, bağ kopmaları ve öteki ağ arayüzü sorunları. Milisaniye çözünürlüğünde bakılanlar ağın tıkanıp tıkanmadığına ve veri ile boru hattı eksenlerindeki aktarımın fiziksel sınıra dayanıp dayanmadığına ait. Ve koşu boyunca bakılan tek bir eğilim var: kullanım oranının kendisi. Bir gösterge hangi katmandan geliyorsa, o katmanın arızasını yakalar; kayıp eğrisine bakarak bozuk bir ağ arayüzü bulunamaz.

İkinci sinsi kalem ağın kendisi. Aynı çalışma bir ağ arayüzünün düşüp saniyeler içinde geri kalkması durumunu anlatıyor: o aralıkta yoldaki bütün paketler düşüyor ve toplu iletişim kütüphanesi varsayılan zaman aşımıyla işi öldürüyor. Çalışmanın iki dersi var: zaman aşımı eşiğini açıkça büyütmek ve kök neden olan ağ kartı, kablo ve anahtar arasındaki zayıf bağ kalitesini donanım düzeyinde denetlemek. Çalışma bu tür bağ kopmalarını saniye düzeyindeki izlemenin konusu olarak sayıyor; kayıp eğrisinde görünmüyorlar.

![Üç satırlık üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: gözlemin üç katmanı, ne ölçülür, ne yakalar, ne kadar sürede. Sütunlar katman, yakaladığı ve tepki. Birinci satır kalp atışı: duran çalışanı yakalar, koşu askıya alınır. İkinci satır tanı sınamaları: bozuk kart ya da bağı yakalar, ortalama on dakikadan az sürer. Üçüncü satır vurguludur, ince taneli ölçüm: geride kalan makineyi yakalar, ancak bakılırsa görünür. Birinci kutunun başlığı gösterge hangi frekanstaysa o katmanın arızasını yakalar; içinde dört satır durur — adım başına kayıp, gradyan normu, öğrenme oranı ve sıra başına adım süresi; saniye başına genel sağlık, ağ yapılandırması ve bağ kopmaları; milisaniye başına ağ tıkanıklığı ve aktarımın fiziksel sınıra dayanması; koşu boyunca kullanım oranının eğilimi. İkinci kutunun başlığı ölçülen sonuç; içinde kesinti öncesi ilerlemeye 15 dakika içinde dönüldüğü ve etkin eğitim süresi oranının yüzde 90'ın üstünde kaldığı, yığın sabitken kart sayısı 3.072'den 12.288'e çıkınca kullanım oranının yüzde 59,1'den yüzde 55,2'ye indiği ve taban sistemde aynı ölçekte yüzde 41,2 olduğu yazılıdır. En altta bir kayıt: değerler Jiang ve arkadaşlarının ölçümleridir; adım başına kayıp, gradyan normu ve öğrenme oranı bizim eklememizdir.](assets/gozlemin-uc-katmani.svg "Şekil 2 — Ne ölçülür, ne yakalar, ne kadar sürede")

Şekil 2'nin üçüncü satırı bu bölümün asıl mesajı: durmayan bir arıza en pahalı arızadır, çünkü kendini bildirmez.

Ölçeğin kendisinin de bir bedeli var ve 107'nin formülüyle uyumlu. Aynı çalışmada 175 milyar parametreli bir modelde yığın büyüklüğü sabit tutulup kart sayısı 3.072'den 12.288'e artırıldığında kullanım oranı yüzde 59,1'den yüzde 55,2'ye iniyor. Yazarların açıklaması hesap–iletişim oranının düşmesi; 107'de türettiğimiz kabarcık oranı `(p − 1)/m` da aynı yöne işaret ediyor — yığın sabitken kart eklemek ya hattı uzatır ya da hat başına düşen mikro yığını azaltır, ikisi de boşluğu büyütür. Yine de bu kurulum, on iki bin kartta yüzde 55,2'lik bir kullanım oranıyla, aynı ölçekte yüzde 41,2'de kalan taban sisteme göre 1,34 kat daha verimli.

## Kayıp sıçradığında

Şimdi hiçbir donanımın bozulmadığı, hiçbir kartın geride kalmadığı bir arızaya geliyoruz: eğitim kaybının hiçbir sebep yokken yukarı fırlaması. Buna **kayıp sıçraması** (loss spike) deniyor. Sözcüğü 74 ve 78\. makalelerde başka bir nesne için kullanmıştık — orada sıçrayan şey ölçekle birlikte bir yetenek eğrisiydi; burada sıçrayan şey tek bir koşunun kayıp eğrisi.

En açık kayıt, 106\. makalede kullanım oranı tablosunu aldığımız PaLM çalışmasında. Aakanksha Chowdhery ve arkadaşları en büyük modelin eğitiminde kaybın **yaklaşık yirmi kez** sıçradığını bildiriyor. Üç ayrıntı önemli: gradyan kırpma açıkken oluyor, aralıklar tamamen düzensiz ve bazen eğitimin geç bir noktasında geliyor, ve aynı düzenle eğitilen **küçük modellerde hiç görülmüyor**.

İlginç olan, ekibin ne yaptığı değil, ne bulduğu. Yaptıkları basit: sıçramanın başladığı noktadan yaklaşık yüz adım önceki kontrol noktasına dönüp, sıçramadan önce ve sıçrama sırasında görülen 200–500 veri yığınını **atlayarak** devam etmek. Bu düzeltmeyle kayıp aynı noktada bir daha sıçramıyor.

Bu müdahalenin mümkün olmasının bir önkoşulu var ve kolayca gözden kaçıyor: "şu yığınları atla" diyebilmek için hangi adımda hangi yığının görüleceğinin baştan belli olması gerekiyor. Aynı çalışma veriyi, bir yığının içeriği yalnızca adım numarasının bir fonksiyonu olacak biçimde yazdıklarını söylüyor. 102\. makalede yeniden üretilebilirliği bir bilimsel erdem olarak kurmuştuk; burada aynı özellik bir operasyon aracı hâline geliyor — veri sırası yeniden üretilebilir değilse ne atlayacağını bilemezsin, ve birazdan geleceğimiz eleme deneyini de kuramazsın.

Buradan "demek ki veri bozuktu" sonucu çıkar gibi görünüyor — ve çıkmıyor, çünkü ekip bunu sınamış. Aynı veri yığınlarını alıp **daha eski, farklı bir kontrol noktasından** başlayarak eğitmişler; sıçrama olmamış. İki koşunun tek farkı modelin o anki parametre durumuydu. Vardıkları sonuç bu yüzden temkinli: sıçrama belirli veri yığınlarının belirli bir parametre durumuyla **bileşiminden** doğuyor; ne tek başına veriden, ne tek başına modelden.

Bu, 99\. makaleden beri savunduğumuz ölçüm disiplininin ta kendisi. Bir düzeltme işe yaradığında "neyi düzelttiğini" bilmek için ayrı bir deney gerekiyor, ve o deney burada bir açıklamayı elemek için kurulmuş.

Sıçramanın içinde ne olduğunu görmek için başka bir yol daha var ve maliyeti çok daha düşük. Mitchell Wortsman ve arkadaşlarının ICLR 2024'te sunduğu çalışma, büyük ölçekte bildirilen iki kararsızlığı **küçük modellerde yeniden üretiyor**: yeter ki öğrenme oranı yükseltilsin. Birincisi dikkat skorlarının büyümesi — 9,4 milyon parametreli bir modelde skorların en büyüğü eğitim boyunca 10 mertebesinden 10⁶ mertebesine çıkıyor ve kayıp ıraksıyor; aynı olgu 4,8 milyar parametreli bir modelde on kat düşük bir öğrenme oranında görülüyor. İkincisi çıktı skorlarının olasılıklardan uzaklaşması. Büyük ölçekte kullanılan iki düzeltme — dikkatin sorgu ve anahtarlarını normalleştirmek ve çıktı skorlarına ek bir ceza koymak — küçük ölçekte de aynı işi görüyor.

Sıçramaya verilen cevapları bu noktada üç düzeye ayırmak mümkün ve üçü de yayımlanmış kayıtlarda duruyor. En üstte **işletme düzeyi** cevap var: geri sar ve veriyi atla — PaLM ekibinin yaptığı. Ortada **hiperparametre düzeyi** cevap: 8\. makalede aktardığımız Susan Zhang ve arkadaşlarının OPT raporunda, kayıp ıraksadığında öğrenme oranı düşürülüp daha eski bir kontrol noktasından yeniden başlanmış. Aynı raporun sık anılan "iki ayda en az otuz beş elle yeniden başlatma" sayısı ise donanım arızalarına ait, ıraksamalara değil; ikisini karıştırmamak gerekiyor. En altta **mimari düzeyi** cevap: kararsızlığın doğduğu yeri değiştirmek. Üçünün maliyeti çok farklı — birincisi dakikalar, ikincisi bir insanın sürekli nöbeti, üçüncüsü bir sonraki koşunun tasarımı — ve hangisinin uygun olduğu koşunun nerede olduğuna bağlı.

Wortsman ve arkadaşlarının çalışması bir de ölçü öneriyor: öğrenme oranını üç büyüklük mertebesi boyunca değiştirdiğinde en iyi kayıptan ne kadar uzaklaştığın. Bu ölçü tek bir koşudan değil bir koşu ailesinden çıkıyor ve şunu gösteriyor: düzeltmeler duyarlığı azaltıyor, ama duyarlık model büyüdükçe yine de artıyor. Yani kararsızlık çözülmüş bir problem değil, ölçeğe göre yeniden pahalılaşan bir problem.

![Beş satırlık üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: bir kayıp sıçramasının tanısı, hangi koşu neyi eledi. Sütunlar yapılan, gözlenen ve öğrenilen. Birinci satır en büyük model eğitildi: yaklaşık 20 sıçrama gözlendi, gradyan kırpmanın tek başına yetmediği öğrenildi. İkinci satır aynı düzenle küçük modeller: hiç sıçrama yok, olgunun ölçeğe bağlı olduğu öğrenildi. Üçüncü satır 100 adım geri sarıp 200 ile 500 arası yığın atlamak: bir daha sıçramadı, düzeltme bulundu. Dördüncü satır vurguludur, aynı yığınları daha eski bir kontrol noktasından geçirmek: sıçrama olmadı, kötü veri açıklaması elendi. Beşinci satır küçük modelde öğrenme oranını yükseltmek: aynı kararsızlık çıktı, tanı ucuzladı. Birinci kutunun başlığı kalan açıklama: sıçrama ne tek başına veriden ne tek başına modelden doğuyor, belirli veri yığınlarının belirli bir parametre durumuyla bileşiminden doğuyor. İkinci kutunun başlığı üç düzeyde cevap: işletme düzeyinde geri sar ve yığınları atla, hiperparametre düzeyinde öğrenme oranını düşür, mimari düzeyinde sorgu ve anahtarları normalleştirip çıktı skorlarına ceza ekle. En altta bir kayıt: ilk dört satır Chowdhery ve arkadaşlarından, beşinci satır Wortsman ve arkadaşlarındandır.](assets/sicramanin-tanisi.svg "Şekil 3 — Ne denendi, ne eledi")

Şekil 3'ün dördüncü satırı vurgulu, çünkü bir açıklamayı eleyen koşu, düzeltmeyi bulan koşudan daha değerli.

> **Kendini yokla:** Kaybı sıçrayan bir koşuda öğrenme oranını düşürüp devam ettin ve sıçrama bir daha olmadı. Sebebi bulmuş oldun mu?

Hayır; yalnızca bir düzeltme bulmuş oldun. Sebebi bulmak için, aynı veriyi farklı bir parametre durumundan geçirmek gibi, bir açıklamayı eleyen ayrı bir koşu gerekir. PaLM ekibinin yaptığı tam olarak buydu ve "kötü veri" açıklamasını o koşu eledi. Küçük ölçekte kararsızlığı yeniden üretebilmek de aynı işi ucuzlatıyor: elemeyi bir dizüstü bilgisayarda yapabiliyorsan, on binlerce kartı bekletmen gerekmez.

## Bir koşuyu izlemenin disiplini

**En iyi kontrol noktası aralığı türetilebilir: `T* = √(2δM)`.** Kaçınılmaz kayıp `√(2δ/M)`; karekök yüzünden asıl kaldıraç aralık değil, kaydın maliyetidir.

**Kaydı ucuzlatmanın yolu onu koşunun yolundan çıkarmaktır.** Duruma ait kopya önce makinenin kendi belleğine alınır, dosya sistemine taşınması arka planda yapılır; koşuyu durduran süre saniyeler mertebesine iner.

**Durmayan arıza en pahalısıdır.** Ötekilerden yüzde 10 yavaş çalışan bir makine hiçbir hata günlüğüne düşmez ama bütün işi yavaşlatır; yalnızca kart başına adım süresi ölçülürse görünür.

**Kayıp sıçraması kötü verinin işareti değildir.** Aynı yığınlar başka bir parametre durumundan geçirildiğinde sıçrama olmuyor; olgu verinin durumla bileşiminden doğuyor.

**Bir düzeltme bir açıklama değildir.** Sıçramayı durduran bir müdahale onun sebebini göstermez; sebebi göstermek için bir açıklamayı eleyen ayrı bir koşu gerekir.

**Göstergeler sıçramanın yerini söylemiyor.** Kayıp ve gradyan normu bir sıçramayı çoğu zaman olduktan sonra adlandırır. Dikkat skorlarının büyümesi küçük ölçekte ıraksamadan önce izlenebilen bir öncüdür, ama hangi veri yığınının hangi durumda sıçratacağını o da söylemez. Gözlem katmanının asıl işi öngörmek değil, kararı hızlandırmaktır.

**Kararsızlık küçük ölçekte yeniden üretilebilir.** Öğrenme oranı yükseltildiğinde büyük modellerde bildirilen kararsızlıklar milyonlarca parametreli modellerde de çıkıyor; bu, hem tanıyı hem düzeltmenin sınanmasını ucuzlatıyor.

### Sırada ne var

Bu faz, bir eğitim koşusunu bir mühendislik nesnesi olarak ele aldı: kaç kart, kaç bayt, kaç saniye, kaç arıza. Dört makale boyunca sorduğumuz her soru "nasıl" sorusuydu. Şimdi seride yön değişiyor. Bütün bu mühendisliğin sonunda ortaya çıkan şey, sonraki token'ı tahmin etmeyi öğrenmiş bir model — ve bir sonraki makale o modelin neyi öğrenmiş olduğunu soruyor. Metni doğru tahmin eden bir sistem, metnin anlattığı dünyanın bir modelini de kurmuş olur mu? Bu soru kulağa felsefi geliyor; bir sonraki makale onu ölçülebilir bir soruya çevirmenin yolunu kuruyor.

## Kaynakça

- Young, J. W. (1974). *A First Order Approximation to the Optimum Checkpoint Interval*. Communications of the ACM, 17(9), s. 530–531. [Bağlantı](https://doi.org/10.1145/361147.361115)
- Daly, J. T. (2006). *A Higher Order Estimate of the Optimum Checkpoint Interval for Restart Dumps*. Future Generation Computer Systems, 22(3), s. 303–312. [Bağlantı](https://doi.org/10.1016/j.future.2004.11.016)
- Grattafiori, A. ve ark. (2024). *The Llama 3 Herd of Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2407.21783)
- Jiang, Z., Lin, H., Zhong, Y., Huang, Q., Chen, Y., Zhang, Z., Peng, Y., Li, X., Xie, C., Nong, S. ve ark. (2024). *MegaScale: Scaling Large Language Model Training to More Than 10,000 GPUs*. NSDI 2024. [Bağlantı](https://www.usenix.org/conference/nsdi24/presentation/jiang-ziheng)
- Zhang, S. ve ark. (2022). *OPT: Open Pre-trained Transformer Language Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2205.01068)
- Chowdhery, A., Narang, S., Devlin, J. ve ark. (2023). *PaLM: Scaling Language Modeling with Pathways*. Journal of Machine Learning Research, 24(240), 1–113. [Bağlantı](https://www.jmlr.org/papers/v24/22-1144.html)
- Wortsman, M., Liu, P. J., Xiao, L., Everett, K., Alemi, A., Adlam, B., Co-Reyes, J. D., Gur, I., Kumar, A., Novak, R., Pennington, J., Sohl-Dickstein, J., Xu, K., Lee, J., Gilmer, J. & Kornblith, S. (2024). *Small-Scale Proxies for Large-Scale Transformer Training Instabilities*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/d848cb2c84f0bba7f1f73cf232734c40-Abstract-Conference.html)
