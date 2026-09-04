---
article_id: article_d60eb4f3-2f3a-4962-b53a-485ee29c1599
title: "Bilgi Tazeliği: Güncellik, Kaynak Güveni ve Atıf"
slug: bilgi-tazeligi-guncellik-kaynak-guveni-ve-atif
category: agents-and-retrieval
level: intermediate
reading_order: 50
summary: "Faz 5'i bilgiye güven zinciriyle kapatır: modelin bilgisinin ilan edilen kesim tarihinden önce bayatladığını ve kaynaklara göre farklı tarihlerde kesildiğini, bayatlamanın perplexity'de ve soru cevaplamada nasıl ölçüldüğünü, modelin iç saatinin kesim tarihinden geride kaldığını ve hizalanabildiğini; getirilen kaynak modelin bildiğiyle çelişince hangisinin kazandığını ve bunun neye bağlı olduğunu; dizine sızan yanlış bilginin bedelini; atfın kaynağa güvenmeyi ne kadar hak ettiğini ölçümlerle anlatır."
tags:
  - bilgi-kesim-tarihi
  - zamansal-hizalama
  - bilgi-catismasi
  - kaynak-guvenilirligi
  - atif-ve-uydurma
content_hash: sha256:502e1efc9bf79e6d29df6fe1a8d9f4e3320cbc45ef86b7a9b7cb498423b20d58
classification_version: 1
classification_batch: 11
---
## Üç ip, tek düğüm

Faz 5 boyunca modeli dünyaya bağladık: 41'de dizine, 46'da döngüye, 47'de işleve, 49'da ekosisteme. Her bağlantı aynı varsayımla çalıştı: dışarıdan gelen şey içeridekinden daha iyidir. Bu makale o varsayımı üç yerden sorguluyor. Modelin içindeki bilgi hangi tarihe kadar geçerlidir, ve bu tarih ilan edilenle aynı mıdır? Dışarıdan gelen kaynak içerideki bilgiyle çelişince model hangisine inanır? Ve bir cevabın altına konan atıf, o cevaba güvenmeyi ne kadar hak eder?

Üç soru ayrı görünüyor ama tek bir şeyi ölçüyor: bir cevabın **tazeliği** ile **dayanağı** arasındaki ilişkiyi. 39\. makalede tazelik, bir bellek kaydının en son ne zaman kullanıldığına bakan bir terimdi; burada anlamı genişliyor: bir bilginin dünyayla hâlâ örtüşüp örtüşmediği. 41\. makale modelin bilgisinin bir tarihte donduğunu söylemiş, çözüm olarak dizini göstermişti. Bu makale önce o donmanın ölçüsünü alıyor, sonra dizinden gelenin de donmuş ya da yanlış olabileceğini gösteriyor.

## Bilgi hangi tarihte kesildi

Her modelin ilan edilmiş bir **bilgi kesim tarihi** (knowledge cutoff) var: eğitim verisinin toplandığı son tarih. 19\. makalede bu tarihi geçmişte kalan bir ölçüm koşulu olarak anmıştık; şimdi kendisini ölçüyoruz.

Angeliki Lazaridou ve arkadaşlarının NeurIPS 2021'de sunduğu çalışma, bayatlamanın ilk temiz ölçüsünü verdi. Aynı büyüklükte iki eğitim kümesi kurdular: biri test döneminden önce biten metinlerden, öbürü test dönemiyle çakışan metinlerden; test kümesi ikisinde de aynı, 2018–2019'a ait. Fark yalnızca zamandı. Sonuç Şekil 1'de: iki yıla kadar bayat model, aynı testte daha yüksek perplexity alıyor — 5\. makaleden hatırla, düşük olan iyidir — ve fark alana göre değişiyor: özel bir haber derleminde yüzde 16'ya varan, bilimsel özetlerde yüzde 8, büyük bir haber taramasında yüzde 6.

![Üç gruplu yatay çubuk şeması; her grupta solda veri kümesinin adı, ortada iki çubuk, sağda iki perplexity değeri ve aradaki göreli fark vardır. Haber taraması grubunda test dönemiyle çakışan eğitim 21,11 ve bayat eğitim 22,45, fark yüzde 6,34; özel haber derlemi grubunda 18,38 ve 21,33, fark yüzde 16,04; bilimsel özetler grubunda 21,38 ve 23,07, fark yüzde 7,90. Bayat eğitimin çubukları vurgulu renktedir. Şeklin altında düşük perplexity'nin iyi olduğu, iki eğitim kümesinin aynı büyüklükte olduğu ve yalnızca zaman dilimlerinin farklı olduğu yazılıdır.](assets/ayni-test-iki-egitim-donemi.svg "Şekil 1 — Aynı test, iki eğitim dönemi")

Şekil 1'in iki bulgusu daha var. Model büyütmek çare değil: büyük modeller aynı bayatlamayı yaşıyor, ve daha yeni veriyle eğitilmiş küçük bir model, bayat büyük modeli geçebiliyor. 9\. makaledeki ölçek yasaları zamanı görmez. İkincisi, bozulma en çok yeni sözcüklerde ve adlarda: model, eğitiminden sonra ortaya çıkan olayların adını hiç görmemiştir ve 17\. makaledeki uydurma tam burada başlar.

Peki ilan edilen tarih doğru mu? Jeffrey Cheng ve arkadaşlarının COLM 2024'te sunduğu çalışma, kesim tarihinin tek bir sayı olmadığını gösterdi. Bir modelin bir kaynağı — diyelim bir ansiklopediyi — hangi tarihe kadar bildiğini, o kaynağın farklı tarihli sürümleri üzerinde perplexity ölçerek buldular: modelin en düşük perplexity verdiği sürüm, o kaynak için **etkin kesim tarihi** (effective cutoff). Sonuç: etkin tarih, ilan edilen tarihten çoğu zaman çok daha eski ve kaynaktan kaynağa değişiyor. İki sebep de veriden geliyor: 14\. makaledeki tekilleştirme, aynı sayfanın eski ve yeni sürümlerini kopya sayıp yenisini atabiliyor; ve büyük web taramaları aynı sayfanın yıllar önceki kopyalarını taşıdığı için model eski sürümü daha çok görüyor. İlan edilen tarih verinin toplandığı gündür; modelin bildiği tarih, verinin içinde en çok tekrarlanan gündür.

Bu bir modelin **iç saatini** ölçmeye götürüyor. Bowen Zhao ve arkadaşlarının ACL 2024 bulguları programında sunduğu çalışma, cevabı yıllar içinde birçok kez değişmiş 20.148 soruluk bir küme kurdu ve modele sormadan önce hiçbir tarih vermedi: model hangi yılın cevabını verecek? Eylül 2022 kesim tarihli 70 milyarlık bir açık modelin cevapları 2019'da tepe yapıyor; 2022'nin cevaplarında F1 puanı 17,2. Yani modelin iç saati kesim tarihinden üç yıl geride — Şekil 1'deki "en çok tekrarlanan sürüm" etkisi. Sonra saati ayarladılar: modele "2022'deymişsin gibi cevapla" demek 27,4'e, 2022 cevaplarıyla küçük bir ince ayar 27,9'a çıkarıyor; yüzde 62'lik göreli kazanç. İnce ayar için seçilen soruların modelin zaten doğru bildiği sorular olması en iyi sonucu veriyor; yazarların yorumu öğretici: ince ayar yeni bilgi eklemiyor, modelin içinde zaten duran güncel bilgiyi öne çekiyor. 18\. makaledeki bilgi ağırlıklarda duruyor; hangi yılın bilgisinin öne çıkacağı ayrı bir düğme.

Aynı fikrin eğitim zamanındaki biçimi Bhuwan Dhingra ve arkadaşlarının Transactions of the Association for Computational Linguistics'te 2022'de yayımlanan çalışmasında: her eğitim metninin başına yılı yazılırsa model, sorulduğunda yıla göre cevap verebiliyor. Cevabı zamana bağlı olgu sorularında F1, yılsız eğitilmiş modelde 26,6, yıl bilgisiyle eğitilmişte 28,2; eğitimde hiç görülmemiş 2019–2020 yıllarında 19,8'e karşı 22,2. Kazanç büyük değil ama yönü açık: zamanı veriye yazmak, modelin "hangi yıl" sorusunu kurabilmesini sağlıyor.

> **Kendini yokla:** İlan edilen kesim tarihi ile etkin kesim tarihi neden aynı olmak zorunda değil?

Çünkü ilan edilen tarih verinin toplandığı gündür, etkin tarih ise modelin o kaynak için en çok gördüğü sürümün tarihi. Tekilleştirme yeni sürümü atabilir, web taraması eski kopyaları çoğaltabilir; ikisi de modeli geçmişe çeker. Kesim tarihi bir gün değil, kaynak başına bir dağılımdır.

## Dışarıdan taze bilgi: ne kadar işe yarıyor

41\. makalenin çözümü dizindi; bu bölüm dizinin tazelik sorununu ne kadar çözdüğünü ölçüyor. Cevabın kendisi de tazelik sınıfına bağlı.

Tu Vu ve arkadaşlarının ACL 2024 bulguları programında sunduğu çalışma, 600 soruluk bir kümeyi cevabın değişme hızına göre dörde ayırıyor: hiç değişmeyen, birkaç yılda değişen, bir yıl içinde değişen ve yanlış öncüllü sorular. 45\. makalede bir başka kümenin aynı ayrımı yaptığını görmüştük; burada ölçülen, bu sınıfların dış bilgiyle nasıl değiştiği. Uydurmanın sıfır sayıldığı katı puanlamada, 2021 kesim tarihli büyük bir ticari model hızlı değişen sorularda yüzde 12,0 alıyor; yıl içinde değişen olguları bilmesi zaten beklenmiyor. Arama motoru sonuçları — 48\. makaledeki liste ve parçalar — isteme konunca aynı model yüzde 59,2'ye çıkıyor; hiç değişmeyen sorularda 64,3'ten 94,4'e, yanlış öncüllü sorularda 33,9'dan 71,0'e. Bir ayrıntı daha: aynı model hızlı değişen soruların yüzde 60'ında cevap vermeyi reddediyor, bir önceki nesil yalnızca yüzde 16'sında; 39\. makaledeki çekimserlik burada bir eğitim farkı olarak görünüyor.

Jungo Kasai ve arkadaşlarının NeurIPS 2023 veri kümeleri ve ölçütler programında sunduğu çalışma ölçümü zamana açtı: her hafta yeni haberlerden yaklaşık otuz soru yazılıyor ve sistemler o hafta sınanıyor. Bir yıllık ölçümde büyük bir modelin tam eşleşme puanı kapalı kitapta 15,3; 2018 tarihli bir ansiklopedi dizininden getirmeyle 13,3 — bayat dizin, dizinsizlikten iyi değil — güncel bir arama motoruyla 34,6. Ve hataların çoğu okumadan değil getirmeden geliyor: model önüne gelen güncel metni okuyabiliyor, sorun doğru metnin önüne gelmemesi. Yine de bir uyarı: cevaplara "hiçbiri" seçeneği eklenince aynı sistemin puanı 66,5'ten 58,4'e iniyor. Güncel belge önündeyken bile model, cevabın orada olmadığını söylemekte zorlanıyor.

Getirme, ince ayardan farklı bir tazelik ekonomisi kuruyor. Adam Liška ve arkadaşlarının ICML 2022'de sunduğu çalışma, 2007'den 2020'ye uzanan haberler üzerinde iki uyarlama yolunu karşılaştırdı: modeli yeni haberlerle yeniden eğitmek ve dizini güncellemek. Dizin güncellemesi yeni bilgiye çok daha hızlı uyum sağlıyor ve eski bilgiyi neredeyse hiç unutmuyor; yeniden eğitim ise yavaş ve 19\. makaledeki unutmayı getiriyor. 41'deki dizin değiştirme fikrinin zaman boyutundaki kanıtı bu.

## Kaynak ile bellek çelişince

Dizin taze ama modelin belleği eski; ya da tersi, dizinden gelen belge yanlış. İkisinin çeliştiği durumun alandaki adı **bağlam–bellek çatışması** (context-memory conflict); Rongwu Xu ve arkadaşlarının EMNLP 2024'te sunduğu derleme bunu üç çatışma türünün ilki olarak ayırıyor — öbür ikisi iki belgenin birbiriyle ve modelin kendi içindeki iki bilginin birbiriyle çelişmesi. 41\. makaledeki ezber oranı bu çatışmanın ilk ölçüsüydü; şimdi sorunun iki yüzünü de ölçüyoruz.

Jian Xie ve arkadaşlarının ICLR 2024'te sunduğu çalışma, önceki ölçümlerdeki bir kusuru düzeltti: eski çalışmalar belgedeki cevabı elle değiştirip modelin direndiğini bulmuştu, ama değiştirilmiş belge tutarsızdı ve model belki bu yüzden inanmıyordu. Yazarlar modele, kendi bildiğiyle çelişen ama kendi içinde tutarlı belgeler yazdırdı: **karşı-bellek** (counter-memory). Sonuç iki yüzlü. Tek kanıt olarak yalnızca karşı-bellek verilince modeller neredeyse tamamen ona uyuyor: bir olgu kümesinde kendi ezberine dönme oranı bir modelde yüzde 3,7, öbüründe 8,9. Ama belleğini destekleyen bir belge de yanına konunca oran sıçrıyor: iki belgeden biri destekleyiciyse yüzde 43,0 ve 65,4. Sıra da etkiliyor: 7 milyarlık bir modelde destekleyici belge önce gelince ezbere dönme yüzde 33,3, karşı-bellek önce gelince 82,8 — 44\. makaledeki yerleştirme kuralı, çatışma ölçümünün içine giriyor. Yazarların adlandırması yerinde: model tek kanıt karşısında bukalemun, çelişen kanıtlar karşısında kendi inancına yapışan bir tembel hayvan.

Kevin Wu, Eric Wu ve James Zou'nun NeurIPS 2024 veri kümeleri ve ölçütler programında sunduğu çalışma sorunun öbür yüzünü aynı düzenekle ölçtü: altı alandan 1.200'ü aşkın soruda getirilen belgedeki olguyu bilerek bozdular — ilaç dozu, tarih, sayı — ve modelin doğru bildiği cevabı bırakıp yanlış belgeye uyup uymadığına baktılar. Şekil 2'de iki durum yan yana: belge doğru, model yanlışken belgeye uymak yüzde 90'ın üstünde ve bu iyi; ama belge yanlış, model doğruyken de bir model yüzde 60,8 oranında belgeye teslim oluyor, öbürü yüzde 58,5 oranında kendi cevabında kalıyor.

![İki panelli yatay çubuk şeması. Sol panelin başlığı belge yanlış, modelin cevabı doğru; sağ panelinki belge doğru, modelin cevabı yanlış. Her panelde iki model için üçer satır vardır; solda modelin adı ve seçtiği kaynak, ortada çubuk, sağda oran. Sol panelde GPT-4o kendi cevabında 0,327, belgede 0,608, hiçbirinde 0,065; Claude Opus kendi cevabında 0,585, belgede 0,313, hiçbirinde 0,102. Sağ panelde GPT-4o kendi cevabında 0,041, belgede 0,903, hiçbirinde 0,056; Claude Opus 0,042, 0,901 ve 0,057. Belgeye uyma satırları vurgulu renktedir. Şeklin altında sayıların bin iki yüzü aşkın soruda seçilme oranı olduğu ve parantez içindeki güven aralıklarının metinde verilmediği yazılıdır.](assets/belge-mi-bellek-mi.svg "Şekil 2 — Belge doğruyken uymak kolay, yanlışken direnmek zor")

Şekil 2'nin sağ paneli 41\. makalenin vaadi: bellek eskiyse taze belge kazanıyor. Sol paneli ise faturası: aynı mekanizma yanlış belgeye de teslim oluyor. Çalışmanın ikinci bulgusu bir düğme veriyor: model kendi cevabından ne kadar eminse — 16\. makaledeki kalibrasyon, cevap token'larının olasılığıyla ölçülüyor — belgeye o kadar az teslim oluyor; ve belgedeki bozulma ne kadar büyükse, örneğin bir dozun on katı, model o kadar çok direniyor. Direnç, güven ile sapmanın çarpımı gibi davranıyor.

Bu düğme kod çözme katmanına da taşınabiliyor. Weijia Shi ve arkadaşlarının NAACL 2024'te sunduğu kısa çalışma, 10\. makaledeki dağılımı iki kez hesaplıyor: bir kez belgeyle, bir kez belgesiz; sonra belgenin **eklediği** farkı büyütüyor. Belgedeki cevabın modelin ezberiyle değiştirildiği bir kümede 13 milyarlık bir modelin tam eşleşmesi 11,7'den 36,7'ye çıkıyor. Ama aynı düğme, yanlış belgeye teslimiyeti de büyütür; hangi yöne çevrileceği, belgeye ne kadar güvenildiğine bağlıdır. Ve o güven bu makalenin son sorusudur.

> **Kendini yokla:** Model tek bir çelişen belgeye neden hemen uyuyor da, yanına destekleyici bir belge konunca uymuyor?

Çünkü ilk durumda çatışma belge ile bellek arasındadır ve tutarlı bir belge belleği kolayca yener; ikinci durumda çatışma iki belge arasındadır ve model, hangisine inanacağını seçerken kendi belleğini hakem yapar. Aynı olguyu okuyan iki belge, tek belgeden daha az ikna edicidir: bellek oy kullanmaya başlar.

## Dizine ne sızdı

Dizinden gelen belgenin yanlış olması, bir ölçüm hatası değil, bir saldırı yüzeyi de olabilir. Yikang Pan ve arkadaşlarının EMNLP 2023 bulguları programında sunduğu çalışma, bir dil modeline yazdırılmış yanlış haberleri bir soru-cevap derlemine karıştırdı ve 41–44\. makalelerdeki hattın ne yaptığına baktı. Sonuç sert: yanlış bilgi yeniden yazılıp çoğaltılarak eklendiğinde, yoğun getiricili sistemlerde tam eşleşme yüzde 14 ile 54, sözcük eşleşmeli getiricilerde yüzde 20 ile 87 arasında düşüyor. Kasıt olmasa da olur: modelin istemeden uydurduğu metinler derleme sızınca düşüş yüzde 5 ile 15. Sebep 41\. makaleden tanıdık: getirici ilgililiğe bakar, doğruluğa değil; ve dil modelinin yazdığı yanlış metin, sözcük olarak da anlam olarak da soruya çok yakındır, yani dizinin en sevdiği belgedir. 45\. makaledeki karşıolgusal dayanıklılık, burada derlem ölçeğinde sınanıyor ve düşüyor.

Çözüm yönünde iki yol var. Birincisi, kaynağa bir güvenilirlik etiketi vermek. Ruotong Pan ve arkadaşlarının EMNLP 2024'te sunduğu çalışma, getirilen her belgeye ilgililik, tazelik ve kaynak güvenilirliğinden türetilen bir **güvenilirlik** (credibility) notu ekliyor ve modeli bu notu gözeterek cevap vermeye eğitiyor. Ölçüm, yanlış bilgiyle doldurulmuş derlemlerde ve zamana duyarlı sorularda: notu isteme yazmak sıradan modellerde az işe yarıyor — yazarların bulgusu, büyük ticari modellerin bile güvenilirlik notuna az duyarlı olduğu; notla eğitilmiş 7 milyarlık model ise bir çok adımlı soru kümesinde tam eşleşmeyi aynı boyuttaki temel modele göre 26,6 puan artırıyor. Etiket tek başına yetmiyor; etiketi okumayı öğrenmek gerekiyor.

İkinci yol, modelin bilgiyi nereden aldığını söyletmek. Orion Weller ve arkadaşlarının EACL 2024'te sunduğu çalışma bunun en ucuz biçimini ölçtü: isteme "ansiklopediye göre" gibi bir ibare eklemek. Ölçüsü, cevabın kaç kelimelik parçasının o kaynakta birebir geçtiği; ansiklopedi metninde bu oran yüzde 99,9, genel web derleminde yüzde 17. İbare, modelin kaynaktan birebir alıntıladığı payı modele göre yüzde 5 ile 105 arasında artırıyor ve çoğu kümede doğruluğu düşürmüyor, bazılarında yükseltiyor. Model, eğitiminde gördüğü metni hangi kaynaktan gördüğünü bir ölçüde biliyor ve söylenirse oraya yaslanıyor.

## Atıf ne kadar güven verir

45\. makale atfı ölçmüştü: atıf kesinliği, atıf bulma oranı, atfedilebilirlik testi. Bu bölümün sorusu başka: atıf **varken** cevaba ne kadar güvenilir?

Cevabı, atfın en çok değer taşıdığı alandan alalım. Varun Magesh ve arkadaşlarının Journal of Empirical Legal Studies'te 2025'te yayımlanan çalışması, hukuk araştırması için satılan üç ticari ürünü sınadı; üçü de 41\. makaledeki getirmeyle çalışıyor ve üçünün de tanıtımı uydurmanın "ortadan kalktığını" ya da atıfların "yüzde yüz uydurmasız" olduğunu söylüyordu. Sınav: 200'ü aşkın gerçek hukuk sorusu, cevaplar hukukçular tarafından doğru ve dayanaklı, eksik, ya da uydurmalı — yanlış bir ifade ya da bir kaynağın söylemediği şeyi söylediği iddiası — diye kodlandı.

![Üç gruplu yatay çubuk şeması; her grupta solda ürün adı ve cevap türü, ortada çubuk, sağda yüzde vardır. Birinci ürün grubunda doğru ve dayanaklı 65, eksik 18, uydurmalı 17; ikinci ürün grubunda 41, 25 ve 33; üçüncü ürün grubunda 19, 62 ve 17. Uydurmalı satırlarının çubukları vurgulu renktedir. Şeklin altında değerlerin 200'ü aşkın gerçek hukuk sorusundaki cevap paylarının yuvarlanmış yüzdeleri olduğu ve üç ürünün de getirmeyle çalıştığı yazılıdır.](assets/atif-varken-uydurma.svg "Şekil 3 — Atıf var, uydurma da var")

Şekil 3'teki üç ürün getirmeyle uydurmayı azaltıyor — aynı sorularda genel amaçlı büyük bir model daha çok uyduruyor — ama sıfırlamıyor: iki üründe cevapların altıda birinden fazlası, üçüncüsünde üçte biri uydurmalı. Uydurmanın biçimi öğretici: yanlış bir ifade değil çoğu zaman, **doğru bir kaynağa yanlış bir iddia yüklemek**. Atıf yerinde, belge gerçek, ama belge o cümleyi söylemiyor. 45\. makaledeki atfedilebilirlik testi — "kaynağa göre, [cümle]" — tam bu kusuru yakalamak için vardı ve ürünlerde uygulanmamış. Bir de ölçüm dersi: en uzun cevapları yazan ürün en çok uyduruyor, çünkü her cümle yanlışlanabilir bir iddia; en çok susan ürün ise cevapların yüzde 62'sini eksik bırakıyor. 45'teki eksi puanlı cetvel burada da geçerli: çekimserlik ile uydurma aynı cetvelde durmalı.

Atfın sağlamlaştırılabileceği yönünde de kanıt var. Constanza Fierro ve arkadaşlarının ACL 2024'te sunduğu çalışma, modele cevabı yazmadan önce bir **plan** yazdırıyor: cevabın her cümlesinin cevaplayacağı bir soru listesi; her soru bir kaynağa, her cümle bir soruya bağlanıyor. Cümlelerin kaynağınca desteklenme oranı planla 72,64'ten 74,35'e çıkıyor ve planın sorularının yüzde 97,97'si gerçekten kaynaklarda cevaplanıyor. Kazanç küçük; ama mekanizma 32 ve 38\. makalelerdeki gibi: ara adım önce, cevap sonra, ve her adım denetlenebilir.

> **Kendini yokla:** Bir cevabın atfı gerçek bir belgeye gidiyorsa, cevap neden yine de uydurma olabilir?

Çünkü atıf belgenin var olduğunu söyler, belgenin o cümleyi söylediğini değil. 45\. makaledeki test iki adımlıdır: kaynağı bul, sonra "kaynağa göre, cümle" önermesini doğrula; ürünler ilk adımı yapıp ikincisini atlıyor. Gerçek kaynağa yanlış iddia yüklemek, olmayan kaynak uydurmaktan daha zor fark edilen bir uydurmadır.

## Tazeliğin ve güvenin disiplini

**Kesim tarihi bir gün değil, kaynak başına bir dağılımdır.** İlan edilen tarih verinin toplandığı gündür; etkin tarih modelin en çok gördüğü sürümün tarihi ve çoğu zaman daha eskidir. Modelin iç saati de kesim tarihinden geride kalabilir ve ayarlanabilir.

**Bayatlama ölçülür ve ölçek onu çözmez.** Aynı testte bayat model daha yüksek perplexity alır; fark alana göre yüzde 6 ile 16 arasındadır ve büyük modeller de aynı eğriyi izler.

**Taze bilgi için dizin, yeniden eğitimden hızlı ve unutmasızdır.** Ama bayat dizin dizinsizlikten iyi değildir; getirmenin hatası okumadan değil, doğru belgenin gelmemesinden ve geldiğinde de "cevap burada yok" diyememekten gelir.

**Model tek çelişen belgeye uyar, çelişen belgeler arasında belleğine yaslanır.** Belge doğruysa bu kazançtır; yanlışsa aynı mekanizma teslimiyettir. Direnç, modelin güveni ile belgedeki sapmanın büyüklüğüne bağlıdır.

**Dizine sızan yanlış bilgi, dizinin en sevdiği belgedir.** Getirici ilgililiğe bakar, doğruluğa değil; model yazımı yanlış metin soruya en yakın metindir. Güvenilirlik etiketi ancak etiketi okumayı öğrenmiş modelde işe yarar.

**Atıf, kaynağın varlığını kanıtlar, iddiayı değil.** Getirme uydurmayı azaltır ama sıfırlamaz; en yaygın uydurma, gerçek kaynağa yanlış iddia yüklemektir. Uzun cevap daha çok yanlışlanabilir; susan sistem de ayrı bir cetvelde ölçülmelidir.

### Sırada ne var

Faz 5 burada bitiyor. Beş fazın sonunda elimizde dizine, döngüye, işleve ve ekosisteme bağlanmış, güvenini ölçmeyi öğrendiğimiz bir model var. 46\. makaledeki düşün–eyle–gözle döngüsü boyunca eylem satırı hep bir çağrıydı; 47 çağrının biçimini, 48 üç aracın arayüzünü, 49 araçların ekosistemini kurdu. Geriye tek soru kaldı ve o soru serinin bir sonraki fazını açıyor: model, hangi aracı ne zaman çağıracağına, ne zaman duracağına ve işin bitip bitmediğine kendi başına karar verdiğinde ne olur? Bu döngüye alanda ajan deniyor; sonraki makale bu sözcüğü tanımlıyor ve döngüyü baştan kuruyor.

## Kaynakça

- Lazaridou, A., Kuncoro, A., Gribovskaya, E., Agrawal, D., Liška, A., Terzi, T., Gimenez, M., de Masson d'Autume, C., Kočiský, T., Ruder, S., Yogatama, D., Cao, K., Young, S. & Blunsom, P. (2021). *Mind the Gap: Assessing Temporal Generalization in Neural Language Models*. NeurIPS 2021. [Bağlantı](https://proceedings.neurips.cc/paper/2021/hash/f5bf0ba0a17ef18f9607774722f5698c-Abstract.html)
- Cheng, J., Marone, M., Weller, O., Lawrie, D., Khashabi, D. & Van Durme, B. (2024). *Dated Data: Tracing Knowledge Cutoffs in Large Language Models*. COLM 2024. [Bağlantı](https://arxiv.org/abs/2403.12958)
- Zhao, B., Brumbaugh, Z., Wang, Y., Hajishirzi, H. & Smith, N. A. (2024). *Set the Clock: Temporal Alignment of Pretrained Language Models*. Findings of ACL 2024, s. 15015–15040. [Bağlantı](https://aclanthology.org/2024.findings-acl.892/)
- Dhingra, B., Cole, J. R., Eisenschlos, J. M., Gillick, D., Eisenstein, J. & Cohen, W. W. (2022). *Time-Aware Language Models as Temporal Knowledge Bases*. Transactions of the Association for Computational Linguistics 10, s. 257–273. [Bağlantı](https://doi.org/10.1162/tacl_a_00459)
- Vu, T., Iyyer, M., Wang, X., Constant, N., Wei, J., Wei, J., Tar, C., Sung, Y.-H., Zhou, D., Le, Q. & Luong, T. (2024). *FreshLLMs: Refreshing Large Language Models with Search Engine Augmentation*. Findings of ACL 2024, s. 13697–13720. [Bağlantı](https://aclanthology.org/2024.findings-acl.813/)
- Kasai, J., Sakaguchi, K., Takahashi, Y., Le Bras, R., Asai, A., Yu, X. V., Radev, D., Smith, N. A., Choi, Y. & Inui, K. (2023). *RealTime QA: What's the Answer Right Now?*. NeurIPS 2023 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/9941624ef7f867a502732b5154d30cb7-Abstract-Datasets_and_Benchmarks.html)
- Liška, A., Kočiský, T., Gribovskaya, E., Terzi, T., Sezener, E., Agrawal, D., de Masson d'Autume, C., Scholtes, T., Zaheer, M., Young, S., Gilsenan-McMahon, E., Austin, S., Blunsom, P. & Lazaridou, A. (2022). *StreamingQA: A Benchmark for Adaptation to New Knowledge over Time in Question Answering Models*. ICML 2022, PMLR 162, s. 13604–13622. [Bağlantı](https://proceedings.mlr.press/v162/liska22a.html)
- Xu, R., Qi, Z., Guo, Z., Wang, C., Wang, H., Zhang, Y. & Xu, W. (2024). *Knowledge Conflicts for LLMs: A Survey*. EMNLP 2024, s. 8541–8565. [Bağlantı](https://aclanthology.org/2024.emnlp-main.486/)
- Xie, J., Zhang, K., Chen, J., Lou, R. & Su, Y. (2024). *Adaptive Chameleon or Stubborn Sloth: Revealing the Behavior of Large Language Models in Knowledge Conflicts*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=auKAUJZMO6)
- Wu, K., Wu, E. & Zou, J. (2024). *ClashEval: Quantifying the tug-of-war between an LLM's internal prior and external evidence*. NeurIPS 2024 Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/3aa291abc426d7a29fb08418c1244177-Abstract-Datasets_and_Benchmarks_Track.html)
- Shi, W., Han, X., Lewis, M., Tsvetkov, Y., Zettlemoyer, L. & Yih, S. (2024). *Trusting Your Evidence: Hallucinate Less with Context-aware Decoding*. NAACL 2024 (kısa bildiriler), s. 783–791. [Bağlantı](https://aclanthology.org/2024.naacl-short.69/)
- Pan, Y., Pan, L., Chen, W., Nakov, P., Kan, M.-Y. & Wang, W. Y. (2023). *On the Risk of Misinformation Pollution with Large Language Models*. Findings of EMNLP 2023, s. 1389–1403. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.97/)
- Pan, R., Cao, B., Lin, H., Han, X., Zheng, J., Wang, S., Cai, X. & Sun, L. (2024). *Not All Contexts Are Equal: Teaching LLMs Credibility-aware Generation*. EMNLP 2024, s. 19844–19863. [Bağlantı](https://aclanthology.org/2024.emnlp-main.1109/)
- Weller, O., Marone, M., Weir, N., Lawrie, D., Khashabi, D. & Van Durme, B. (2024). *"According to ...": Prompting Language Models Improves Quoting from Pre-Training Data*. EACL 2024, s. 2288–2301. [Bağlantı](https://aclanthology.org/2024.eacl-long.140/)
- Magesh, V., Surani, F., Dahl, M., Suzgun, M., Manning, C. D. & Ho, D. E. (2025). *Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools*. Journal of Empirical Legal Studies 22(2), s. 216–242. [Bağlantı](https://doi.org/10.1111/jels.12413)
- Fierro, C., Amplayo, R. K., Huot, F., De Cao, N., Maynez, J., Narayan, S. & Lapata, M. (2024). *Learning to Plan and Generate Text with Citations*. ACL 2024, s. 11397–11417. [Bağlantı](https://aclanthology.org/2024.acl-long.615/)
