---
article_id: article_9bfbad22-d1b8-4943-aadd-2b5dd4dd40b6
title: "Kendi Asistanın: Küçük Ölçekte SFT ve DPO"
slug: kendi-asistanin-kucuk-olcekte-sft-ve-dpo
category: models-and-training
level: advanced
reading_order: 105
summary: "104'ün eğittiği modeli asistanlaştırır: kayıp maskesinin koruduğu ve korumadığı şeyler, hizalama vergisinin ölçülmüş hâli, DPO kaybının aritmetiği ve tasmanın tam olarak 1,5 bölü beta kadar uzunluk verdiği ölçüm — ve tercihi karşılayan bir güncellemenin yeğlenen cevabı daha az olası yapabildiği yer."
tags:
  - denetimli-ince-ayar
  - dpo
  - kayip-maskesi
  - hizalama-vergisi
  - ortuk-odul
content_hash: sha256:45a8609d4860d36de2b2c2842d92d414eabf76ce12741fe596f7a1fdb548fdd8
classification_version: 1
classification_batch: 25
---
## Doğru cevabı olmayan bir soru

104\. makale elimizde kuralı bilen bir model bıraktı: `başla kedi` gördüğünde üçüncü konumda `uyudu`ya 0,999 olasılık veriyor, `başla köpek` gördüğünde `havladı`ya. Ama aynı modele yalnızca `başla kedi` verip sıradaki token'ı sorduğumuzda cevabı şu: `bugün` 0,4996 · `dün` 0,5004. İkisi de doğru. Derlem ikisini de eşit sıklıkta gösterdi ve model bunu tam olarak öğrendi.

13\. makale bu durumu adlandırmıştı: cevap anahtarı olmayan sorular. "Kariyerime yeniden heves duymak için beş fikir say" isteğinin bir doğrusu yoktur; iki cevabı yan yana koyup birini yeğlemek ise kolaydır. Bizim dilimizde aynı durumun en küçük hâli var — `bugün` ile `dün` arasında bir yeğleme, ve o yeğlemenin arkasında hiçbir olgu yok.

Bu makalede o yeğlemeyi modele yerleştirmenin iki yolunu 364 parametre üzerinde çalıştırıyoruz: 12\. makalenin denetimli ince ayarı ve 13\. makalenin doğrudan tercih optimizasyonu. Ölçek o kadar küçük ki her ikisinin de neyi değiştirdiğini, neyi bozduğunu ve tasmanın gerçekten ne kadar tuttuğunu sayıyla görebiliyoruz.

## Kayıp maskesi, 364 parametre üzerinde

12\. makalede denetimli ince ayarın en öğretici ayrıntısını kurmuştuk: dizinin her konumu hedef değildir. Talimat token'larının kaybı sıfırlanır, yalnızca cevap token'larının kaybı ortalamaya girer.

Eğitim çiftlerimiz iki tane ve maske dört konumun ikisini kapsıyor:

| Konum | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Birinci çift | başla | kedi | **bugün** | **uyudu** |
| İkinci çift | başla | köpek | **bugün** | **havladı** |

Kalın yazılanlar hedef; ilk ikisi yalnızca bağlam. Yani modele "kedi ile başlayan bir cümleyi `bugün uyudu` diye tamamla" diyoruz ve bunu hiçbir olgu değiştirmeden yapıyoruz — `dün` de doğru bir devamdı, biz `bugün`ü yeğledik.

Sonuç ölçülebilir. Aşağıdaki tabloda dört ayrı koşu var; her biri aynı temel modelden başlıyor ve yalnızca adım sayısı değişiyor.

| Adım | p(bugün) | Referanstan KL | Doğru fiil | Derlem kaybı |
|---|---|---|---|---|
| — (temel model) | 0,4996 | 0,0000 | 0,9990 | 0,46286 |
| 10 | 0,8601 | 0,2787 | 0,9984 | 0,58008 |
| 30 | 0,9926 | 0,6504 | 0,9991 | 1,05479 |
| 120 | 0,9976 | 0,6761 | 0,9986 | 1,23545 |

Üç sütun üç ayrı şey söylüyor. **Biçim taşındı:** `bugün`ün olasılığı yarıdan neredeyse bire çıktı. **Bilgi yerinde kaldı:** doğru fiile verilen olasılık 0,9990'dan 0,9986'ya indi, yani hiç oynamadı. **Bedel derlem kaybında ödendi:** 0,46286'dan 1,23545'e, yani modelin dili modelleme yeteneği belirgin biçimde kötüleşti.

12\. makalede Chunting Zhou ve arkadaşlarının LIMA çalışmasından yüzeysel hizalama hipotezini aktarmıştık: bir modelin bilgisi ve yetenekleri neredeyse tamamen ön eğitimde öğrenilir, hizalama ona yalnızca hangi biçim alt dağılımını kullanacağını öğretir. Elimizdeki üç sütun o hipotezin en küçük ölçekli doğrulaması. 11\. makalede adını koyduğumuz hizalama vergisi de aynı tabloda: derlem kaybındaki 0,77'lik artış, biçim için ödenen fatura.

Neyin korunduğunun mekanik sebebi de görünüyor ve maskede duruyor. Fiil token'ı maskenin **içinde**; SFT her adımda biçimi kaydırırken fiil kuralını da yeniden pekiştiriyor. Maskenin dışında kalan hiçbir şey böyle bir koruma almıyor — derlem kaybının bozulması tam olarak bu yüzden.

![Dört satırlık beş sütunlu bir tablo ve altında iki kutu. Üstte başlık: SFT, aynı temel model ve değişen tek şey adım sayısı. Sütunlar adım, p bugün, referanstan KL, doğru fiil ve derlem kaybı. Birinci satır temel model: 0,4996, 0,0000, 0,9990, 0,46286. İkinci satır 10 adım: 0,8601, 0,2787, 0,9984, 0,58008. Üçüncü satır 30 adım: 0,9926, 0,6504, 0,9991, 1,05479. Dördüncü satır vurguludur, 120 adım: 0,9976, 0,6761, 0,9986, 1,23545. Birinci kutunun başlığı üç sütun üç ayrı şey söylüyor: biçim taşındı, 0,4996'dan 0,9976'ya; bilgi yerinde kaldı, 0,9990'dan 0,9986'ya; bedel derlem kaybında ödendi, 0,46286'dan 1,23545'e. İkinci kutuda şu durur: fiil maskenin içindeydi ve her adımda yeniden pekiştirildi. En altta iki kayıt: dört ayrı koşu vardır ve hepsi aynı temel modelden başlar; KL yedi bağlam üzerinden ortalanmıştır.](assets/sft-neyi-tasiyor.svg "Şekil 1 — Biçim taşındı, bilgi taşınmadı")

Şekil 1'in okunacak yeri iki bitişik sütun: doğru fiil sütunu hiç oynamıyor, derlem kaybı sütunu ikiye katlanıyor.

> **Kendini yokla:** Model artık `dün`e neredeyse hiç olasılık vermiyor. Bu, `dün`ün yanlış olduğunu öğrendiği anlamına mı gelir?

Hayır. Model `dün`ü unutmadı; onu kullanıcıya dönmeyecek bölgeye itti. Nitekim derlem kaybının yükselmesinin sebebi tam olarak bu — `dün` geçen iki cümleyi artık kötü modelliyor. Öğrenilen şey bir olgu değil, bir tercih; ve tercih olgunun üzerine yazıldığında ölçüsü derlem kaybında görünüyor.

## DPO'nun aritmetiği

İkinci yol cevabı baştan yazmadan ilerliyor. 13\. makalede Rafael Rafailov ve arkadaşlarının doğrudan tercih optimizasyonunu kurmuştuk: ayrı bir ödül modeli eğitmek yerine tercih çiftleri doğrudan politikanın üzerinde bir sınıflandırma kaybıyla kullanılıyor.

Kaybı açalım. Bir çift için yeğlenen cevabın ve yeğlenmeyenin, politika ile referans model altındaki log olasılıkları alınır; iki fark birbirinden çıkarılır ve çıkan sayıya *δ* diyelim. Kayıp, β çarpı δ'nın sigmoid'inin eksi logaritmasıdır. β, 13\. makaledeki tasmanın kaybın içine gömülmüş hâli.

Tercih çiftlerimiz şunlar: `başla kedi` bağlamında `bugün` ≻ `dün`, ve `başla köpek` bağlamında aynısı. Eğitim başlamadan önce politika referansın kendisidir, yani δ = 0 ve kayıp −ln σ(0) = ln 2 = 0,69315. 13\. makaledeki Bradley–Terry tablosunun orta satırındaki 0,693 ile aynı sayı — ve aynı sebeple: model iki cevaba aynı puanı verdiğinde, yani hiçbir şey söylemediğinde, kayıp ln 2'dir.

| β × δ | σ(β × δ) | Kayıp |
|---|---|---|
| −1,50 | 0,1824 | 1,7014 |
| −0,50 | 0,3775 | 0,9741 |
| 0,00 | 0,5000 | 0,6931 |
| 0,50 | 0,6225 | 0,4741 |
| 1,50 | 0,8176 | 0,2014 |
| 3,00 | 0,9526 | 0,0486 |

Tablodan çıkan şey, β'nın ne yaptığının tam tanımı: kaybı belirleyen çarpım olduğu için, aynı kayba inmek isteyen bir model β küçüldükçe δ'yı büyütmek zorunda. Ve δ, politikanın referanstan log olasılık cinsinden ne kadar ayrıldığının ölçüsü.

## Tasma tam olarak 1,5 bölü beta kadar

Bunu sınamanın temiz bir yolu var: bütün koşuları **aynı** kayba indirmek ve o noktada δ'ya bakmak. Hedefi 0,20 seçtik, çünkü tablodan biliyoruz ki 0,20 kaybı β × δ = 1,5 demek. Öyleyse kuram şunu söylüyor: δ = 1,5 ÷ β.

Ölçtük. İki ayrı model boyunda, her β için aynı eşiğe kadar eğittik:

| β | Kuramın dediği δ | Mikro modelde ölçülen | Geniş modelde ölçülen |
|---|---|---|---|
| 2,0 | 0,750 | 0,766 | 0,770 |
| 1,0 | 1,500 | 1,530 | 1,522 |
| 0,5 | 3,000 | 3,018 | 3,033 |
| 0,2 | 7,500 | 7,565 | 7,569 |

Dört satırın sekiz ölçümü de kuramın verdiği değerin yüzde üçü içinde ve iki model boyu arasında kayda değer fark yok. İlişki tohum değiştirince de bozulmuyor: mikro modeli üç ayrı tohumla çalıştırdığımızda β = 2,0'de δ 0,766 ile 0,843 arasında, β = 1,0'de 1,505 ile 1,540 arasında kaldı.

Tasma gerçekten tasma: β'yı beşe bölmek, aynı tercihi karşılamak için politikanın on kat daha uzağa gitmesini gerektiriyor. 13\. makalede "tasmanın sıkılığı ayarlanması gereken bir hiperparametredir" demiştik; buradaki tablo o cümlenin tam sayısal karşılığı.

![Dört satırlık dört sütunlu bir tablo ve altında iki kutu. Üstte başlık: aynı kayba inen koşularda tasmanın uzunluğu, hedef kayıp 0,20 ve beta çarpı delta 1,5. Sütunlar beta, kuramın dediği delta, mikro modelde ölçülen ve geniş modelde ölçülen. Birinci satır beta 2,0: kuram 0,750, mikro 0,766, geniş 0,770. İkinci satır beta 1,0: kuram 1,500, mikro 1,530, geniş 1,522. Üçüncü satır beta 0,5: kuram 3,000, mikro 3,018, geniş 3,033. Dördüncü satır vurguludur, beta 0,2: kuram 7,500, mikro 7,565, geniş 7,569. Birinci kutuda sonuç durur: sekiz ölçümün hepsi kuramın verdiği değerin yüzde üçü içinde ve iki model boyu arasında fark yok, yani delta tam olarak 1,5 bölü betadır. İkinci kutuda anlamı durur: betayı beşe bölmek, aynı tercihi karşılamak için politikanın referanstan on kat daha uzağa gitmesini gerektirir. En altta bir kayıt: delta değerleri kendi koşularımızdan, 1,5 bölü beta ise kaybın kapalı formülünden gelir.](assets/tasmanin-uzunlugu.svg "Şekil 2 — Delta tam olarak 1,5 bölü beta")

Şekil 2'nin iki ölçüm sütunu birbirinin neredeyse aynısı: tasmanın uzunluğu modelin boyuna değil, yalnızca β'ya bağlı.

## Tasmanın tutmadığı yer

Şimdi aynı koşuların öteki sütunlarına bakalım — yani tercih dışındaki her şeye ne olduğuna. 104\. makalenin dersini unutmadan: tek koşu bir sonuç değil. Aşağıdaki tabloda üç tohum var ve her tohum kendi ön eğitiminden geçip aynı kayıp eşiğine kadar DPO görüyor.

| Tohum | β | δ | p(bugün) | Doğru fiil önce | Sonra | Derlem kaybı |
|---|---|---|---|---|---|---|
| 7 | 2,0 | 0,766 | 0,6809 | 0,9990 | 0,4999 | 1,67270 |
| 11 | 2,0 | 0,843 | **0,0011** | 0,9975 | 0,9925 | 1,59842 |
| 42 | 2,0 | 0,775 | 0,6840 | 0,9980 | 0,9937 | 0,49886 |
| 7 | 1,0 | 1,530 | 0,7003 | 0,9990 | 0,4999 | 1,82731 |
| 11 | 1,0 | 1,540 | **0,0006** | 0,9975 | 0,9922 | 2,49577 |
| 42 | 1,0 | 1,505 | 0,8164 | 0,9980 | 0,9398 | 0,59280 |

Üçüncü sütun ile dördüncü sütunun ayrışması bu makalenin asıl bulgusu.

**δ her tohumda aynı.** β = 2,0 satırlarında 0,766 · 0,843 · 0,775; β = 1,0 satırlarında 1,530 · 1,540 · 1,505. Yani kayıp hedefine her koşuda aynı biçimde ulaşıldı ve tercih, tanımı gereği, her koşuda karşılandı.

**Modelin gerçekte yaptığı şey hiç de aynı değil.** `bugün`ün olasılığı aynı üç koşuda 0,6809 · 0,0011 · 0,6840. Ortadaki koşuda **yeğlenen cevap binde bire indi** — üstelik tercih formel olarak karşılanmış durumdayken. Nasıl? δ, iki cevabın oranını ölçüyor; 0,843'lük bir δ, `bugün`ün `dün`den e üzeri 0,843 = 2,32 kat olası olduğunu söylüyor. İkisini birden aşağı iterek bu oranı korumak mümkün ve model tam olarak bunu yapmış: olasılık kütlesi ikisine de değil, tercih verisinde hiç geçmeyen token'lara gitmiş.

**Hasar da tohuma göre değişiyor.** Doğru fiil olasılığı bir tohumda 0,999'dan 0,500'e çöküyor, öteki ikisinde neredeyse yerinde kalıyor. Derlem kaybı üçünde de yükseliyor ama artış 0,04 ile 2,03 arasında.

Ortadaki koşunun tam dağılımına bakmak gerekiyor, çünkü olasılık kütlesinin nereye gittiğini tek başına o söylüyor. `başla kedi` bağlamında, DPO'dan önce ve sonra:

| Token | Önce | Sonra |
|---|---|---|
| başla | 0,00000 | 0,00006 |
| kedi | 0,00117 | 0,00000 |
| köpek | 0,00011 | 0,00000 |
| bugün | 0,49663 | 0,00112 |
| dün | 0,50100 | 0,00049 |
| uyudu | 0,00109 | **0,99422** |
| havladı | 0,00000 | 0,00411 |

Tercih karşılandı: `bugün`, `dün`den 2,32 kat olası ve δ = 0,8427 bunu söylüyor. Ama modelin ağzından çıkacak şey ikisi de değil. Kütlenin yüzde 99,4'ü `uyudu`ya gitmiş — yani karşılaştırmaya hiç girmemiş, üstelik o konumda dilbilgisi olarak yanlış olan bir token'a. Önce ikisi toplam 0,99763 tutuyordu, sonra 0,00161.

Kayıp fonksiyonu bundan hiç haberdar değil, çünkü baktığı tek şey iki cevabın birbirine oranı. Bir oranı korumanın iki yolu var: payı yükseltmek ya da ikisini birden düşürmek. İkincisi de aynı kaybı verir.

Bu bir uygulama kazası değil, yöntemin bilinen bir açığı. Shusheng Xu ve arkadaşlarının ICML 2024'te yayımladığı çalışma bunu kuramsal olarak gösteriyor: DPO, dağılım dışı cevapları kullanan yanlı çözümler bulabilir ve referans politika tercihlerle zaten uyumluyken bile ondan aşırı uzaklaşma riski taşır. Bizim ölçümümüz o cümlenin en küçük ölçekli örneği — referans politikamız tercihle çelişmiyordu, yalnızca kararsızdı, ve politika yine de uzağa gitti.

Üç tohum bir yöntemi ölçmeye yetmez ve bunu ölçtüğümüzü iddia etmiyoruz. Ama üç tohumun üçünde de aynı ayrışma var: kayıp fonksiyonunun gördüğü sayı ile çıktının kendisi birlikte hareket etmiyor.

## İki kaybın farkı nereden geliyor

Aynı modele, aynı tercihi, iki ayrı yoldan yerleştirdik ve sonuçlar bambaşka çıktı. Farkın kaynağı ölçekte ya da hiperparametrede değil; iki kaybın neye baktığında.

SFT'nin kaybı **mutlak** bir şey söylüyor: "bu bağlamda bu token gelmeliydi." Bir token'ın olasılığını doğrudan yukarı iter ve maskenin içindeki her konumda bunu yapar. Fiil kuralının SFT'de ayakta kalmasının sebebi bu — fiil maskenin içindeydi ve her adımda yeniden pekiştirildi. Bedeli de aynı yerden geliyor: maskede olmayan hiçbir şeyin korunacağına dair bir söz yok, derlem kaybı bu yüzden yükseliyor.

DPO'nun kaybı ise **göreli** bir şey söylüyor: "bu iki cevabın oranı şu yönde olmalı." Tek bir cevabın olasılığı hakkında hiçbir şey talep etmiyor ve karşılaştırmaya girmeyen token'lar hakkında hiçbir şey bilmiyor. Yukarıdaki tabloda gördüğümüz şey bu boşluğun tam olarak doldurulması: oran korunurken kütle üçüncü bir yere kaçtı.

Kapasitenin de payı var ve ölçtük. Aynı deneyi vektör boyunu ikiye katlayıp 1.240 parametreli bir modelle, yine üç tohumla tekrarladık. En sıkı tasmada doğru fiil olasılığı mikro modelde 0,8287 ± 0,2847, geniş modelde 0,9995 ± 0,0002. Yani kapasite ortalamayı biraz yükseltmekle kalmıyor, sapmayı bin kattan fazla daraltıyor: geniş modelde bilgi üç koşunun üçünde de yerinde kalıyor, mikro modelde tohuma kalıyor.

Ama kapasite ikinci sorunu çözmüyor. On iki koşunun üçünde — mikro modelin bir tohumunda iki kez, geniş modelin bir tohumunda bir kez — tercih karşılandığı hâlde `bugün`ün olasılığı başlangıçtaki 0,50'nin altına indi. Geniş modelde bu δ = 1,522 ile oluyor ve `bugün` 0,5002'den 0,2673'e düşüyor. Bilgiyi koruyan şey kapasite; çıktının yönünü garanti eden bir şey ise ortada yok.

Pratikteki reçetelerin neden DPO'yu tek başına kullanmadığı buradan görünüyor: önce SFT ile mutlak bir taban kurulur, tercih optimizasyonu o tabanın üzerine ve çoğu zaman denetimli veriyle karışık biçimde uygulanır.

![Altı satırlık yedi sütunlu bir tablo ve altında üç kutu. Üstte başlık: aynı kayıp eşiği, üç tohum, tercih dışındaki her şey. Sütunlar tohum, beta, delta, p bugün, doğru fiil önce, sonra ve derlem kaybı. Birinci satır tohum 7, beta 2,0: delta 0,766, p 0,6809, fiil 0,9990'dan 0,4999'a, derlem 1,67270. İkinci satır vurguludur, tohum 11, beta 2,0: delta 0,843, p 0,0011, fiil 0,9975'ten 0,9925'e, derlem 1,59842. Üçüncü satır tohum 42, beta 2,0: delta 0,775, p 0,6840, fiil 0,9980'den 0,9937'ye, derlem 0,49886. Dördüncü satır tohum 7, beta 1,0: delta 1,530, p 0,7003, fiil 0,9990'dan 0,4999'a, derlem 1,82731. Beşinci satır vurguludur, tohum 11, beta 1,0: delta 1,540, p 0,0006, fiil 0,9975'ten 0,9922'ye, derlem 2,49577. Altıncı satır tohum 42, beta 1,0: delta 1,505, p 0,8164, fiil 0,9980'den 0,9398'e, derlem 0,59280. Birinci kutuda şu durur: delta her tohumda aynı, yani kayıp hedefine her koşuda aynı biçimde ulaşıldı ve tercih tanımı gereği karşılandı. İkinci kutu vurguludur: modelin gerçekte yaptığı şey aynı değil, bugünün olasılığı üç koşuda 0,6809, 0,0011 ve 0,6840; ortadaki koşuda yeğlenen cevap binde bire indi çünkü delta iki cevabın oranını ölçüyor ve ikisini birden aşağı iterek o oran korunabiliyor. Üçüncü kutuda hasar durur: doğru fiil olasılığı bir tohumda 0,999'dan 0,500'e çöküyor, öteki ikisinde yerinde kalıyor; derlem kaybı üçünde de yükseliyor ama artış 0,04 ile 2,03 arasında. En altta bir kayıt: üç tohum bir yöntemi ölçmeye yetmez, yalnızca ayrışmanın üçünde de göründüğünü söyler.](assets/tasmanin-tutmadigi-yer.svg "Şekil 3 — Tercih karşılandı, cevap kötüleşti")

Şekil 3'ün üçüncü ve dördüncü sütunu bu makalenin tamamını taşıyor: kaybın gördüğü sayı üç koşuda da aynı, modelin yaptığı iş değil.

## Bu farkı gerçekten ölçmek isteseydik

Yukarıdaki bütün sayıları modelin içinden okuduk: olasılıklar doğrudan dağılımdan alındı, hiçbir örnekleme yapılmadı. Gerçek bir değerlendirmede böyle bir imkân yok; modele istem verilir, çıktı örneklenir ve oran sayılır. 101\. makale bunun ne gerektirdiğini kurmuştu.

Hesabı yapalım. Temel modelin `bugün` oranı 0,50, DPO sonrası 0,6809. Bu farkın gerçek olduğunu yüzde 80 güçle ve 0,05'lik iki yönlü eşikle göstermek için gereken çekiliş sayısı 58. Yani modelin içinden bedavaya okuduğumuz tek bir sayıyı dışarıdan ölçmek elli sekiz üretim ister — ve fark 0,50 ile 0,90 arasında olsaydı on çekiliş yeterdi. Bu hesap bizimdir ve koşulları şunlar: tek orantı sınaması, anlamlılık eşiği 0,05 iki yönlü, güç 0,80.

Ölçmenin pahalı olması, ölçmemenin mazereti değil; ama neyin ölçüldüğünü bilmenin fiyatı budur.

> **Kendini yokla:** Aynı modeli iki kez değerlendirip iki farklı `bugün` oranı bulduk. Bu, modelin değiştiği anlamına mı gelir?

Gelmez. Model deterministik; değişen şey çekiliş. 10\. makalede üretimin bir çekiliş olduğunu, 101\. makalede iki ölçümün farkının gürültüden gelip gelmediğinin ayrı bir soru olduğunu görmüştük. Burada iki kaynak birleşiyor: modelin kendi dağılımı sabit olsa bile örnekleme oynar. Bu yüzden değerlendirmede rapor edilen şey tek bir oran değil, oranın belirsizliğiyle birlikte hâlidir.

## Alanın bu iki yol hakkında söyledikleri

Kendi ölçümümüz bir yöntemi diğerine yeğlemeye yetmez. Yetenler ne diyor?

Hamish Ivison ve arkadaşlarının NeurIPS 2024'te yayımladığı çalışma tercih eğitiminin bileşenlerini tek tek değiştirerek karşılaştırdı ve etki sırasını verdi: en büyük fark **tercih verisinin kalitesinden** geliyor, sonra öğrenme algoritmasının seçiminden, sonra ödül modelinin iyileştirilmesinden, en son da ek etiketsiz istem eklemekten. Sayılarla: iyi tercih verisi talimat takibi ve doğruluk ölçümlerinde yüzde 8'e varan iyileşme sağlıyor; PPO ise DPO'yu matematikte yüzde 2,5, genel alanlarda yüzde 1,2'ye kadar geçiyor. Yani algoritma seçimi önemli ama veriden sonra geliyor.

13\. makalede aktardığımız Tajwar ve arkadaşlarının bulgusu da aynı yöne bakıyordu: asıl fark kaybın biçiminde değil, verinin nereden geldiğindedir. Bizim deneyimiz bu tabloya yalnızca bir şey ekliyor ve o da bir uyarı: tercih verisi, üzerinde hiçbir şey söylemediği davranışları korumaz.

## Küçük ölçekte hizalamanın disiplini

**Maske neyi koruyacağını belirler.** SFT'nin kaybına giren her token pekiştirilir; girmeyen hiçbir şey korunmaz. Fiil kuralının SFT'de ayakta kalmasının sebebi maskenin içinde olmasıdır.

**Hizalama vergisi ölçülebilir bir sayıdır.** Biçim 0,50'den 0,998'e taşınırken derlem kaybı 0,46286'dan 1,23545'e çıktı.

**Tasmanın uzunluğu kapalı formülden okunur.** Aynı kayba inen koşularda δ = 1,5 ÷ β; sekiz ölçümün hepsi bu değerin yüzde üçü içinde.

**Tercihin karşılanması cevabın iyileşmesi değildir.** δ büyürken yeğlenen cevabın olasılığı düşebilir; ölçülmesi gereken şey ödül farkı değil, çıktının kendisi.

**Kapasite bilgiyi korur, yönü korumaz.** 364 parametrede doğru fiil olasılığı üç tohumda 0,8287 ± 0,2847, 1.240 parametrede 0,9995 ± 0,0002; ama on iki koşunun üçünde yeğlenen cevap yine de başlangıcının altına indi.

**Modelin içinden okumak bedava, dışarıdan ölçmek değil.** Aynı farkı örnekleyerek göstermek elli sekiz çekiliş ister.

### Sırada ne var

Üç makale boyunca bir Transformer'ı elle kurduk, eğittik ve asistanlaştırdık. Hepsi tek bir dizüstü bilgisayarda, saniyeler içinde koştu; bellek, bant genişliği ya da süre hiç sorun olmadı. Faz 12'nin bitirdiği yer tam olarak burası — ve bir sonraki fazın başladığı yer de. Aynı üç adımı 364 parametre yerine sekiz milyar parametreyle yapmak isteseydik, ilk çarpacağımız duvar hangisi olurdu: hesap mı, bellek mi, yoksa veriyi hesaba taşıyan yol mu?

## Kaynakça

- Zhou, C., Liu, P., Xu, P., Iyer, S., Sun, J., Mao, Y., Ma, X., Efrat, A., Yu, P., Yu, L., Zhang, S., Ghosh, G., Lewis, M., Zettlemoyer, L. & Levy, O. (2023). *LIMA: Less Is More for Alignment*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/ac662d74829e4407ce1d126477f4a03a-Abstract-Conference.html)
- Rafailov, R., Sharma, A., Mitchell, E., Ermon, S., Manning, C. D. & Finn, C. (2023). *Direct Preference Optimization: Your Language Model is Secretly a Reward Model*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html)
- Bradley, R. A. & Terry, M. E. (1952). *Rank Analysis of Incomplete Block Designs: I. The Method of Paired Comparisons*. Biometrika, 39(3/4), 324–345. [Bağlantı](https://doi.org/10.2307/2334029)
- Xu, S., Fu, W., Gao, J., Ye, W., Liu, W., Mei, Z., Wang, G., Yu, C. & Wu, Y. (2024). *Is DPO Superior to PPO for LLM Alignment? A Comprehensive Study*. ICML 2024, PMLR 235, s. 54983–54998. [Bağlantı](https://proceedings.mlr.press/v235/xu24h.html)
- Ivison, H., Wang, Y., Liu, J., Wu, Z., Pyatkin, V., Lambert, N., Smith, N. A., Choi, Y. & Hajishirzi, H. (2024). *Unpacking DPO and PPO: Disentangling Best Practices for Learning from Preference Feedback*. Advances in Neural Information Processing Systems 37 (NeurIPS 2024). [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/404df2480b6eef0486a1679e371894b0-Abstract-Conference.html)
- Tajwar, F., Singh, A., Sharma, A., Rafailov, R., Schneider, J., Xie, T., Ermon, S., Finn, C. & Kumar, A. (2024). *Preference Fine-Tuning of LLMs Should Leverage Suboptimal, On-Policy Data*. ICML 2024. [Bağlantı](https://arxiv.org/abs/2404.14367)
