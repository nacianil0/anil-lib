---
article_id: article_4e930544-f765-47ec-bf6e-4a4b2fb018da
title: "In-Context Learning: Örnekle Öğrenme"
slug: in-context-learning-ornekle-ogrenme
category: reasoning-and-memory
level: intermediate
reading_order: 23
summary: "İsteme konan çözülmüş örneklerin ağırlıklara dokunmadan davranışı nasıl değiştirdiğini ölçümlerle kurar: etiketleri bozulmuş gösterimlerin şaşırtıcı dayanıklılığı, gösterimin dört bileşeninin ayrı ayrı tartılması, görevi tanımak ile görevi öğrenmek arasındaki ayrımın ölçekle açılması, yüzlerce örnekli rejimin ince ayarla başa baş gelmesi ve mekanizma açıklamalarının nerede durduğu."
tags:
  - ornekle-ogrenme
  - few-shot
  - gosterim
  - gorev-tanima
  - many-shot
content_hash: sha256:960a10c9c8d9dfe77a10696cba14fa7b8888c7566c4996fc16aff8d8e16e3264
classification_version: 1
classification_batch: 5
---
## Ağırlıklar sabitken

Önceki makale bir soruyla bitti. İsteme birkaç çözülmüş örnek koyduğunda modelin ağırlıklarında hiçbir şey değişmez: tek bir gradyan hesaplanmaz, tek bir parametre güncellenmez. 19\. makalede uyarlamanın en ucuz biçimi bile — donmuş bir matrisin yanına iki küçük matris eklemek — bir eğitim koşusu gerektiriyordu. Burada eğitim yok. Yine de model, örnekleri gördükten sonra görevi anlamış gibi davranıyor; üstelik 22\. makalede ölçtüğümüz gibi örneklerin **sırasını** bile önemsiyor.

Bu olguya alanda **örnekle öğrenme** (in-context learning) deniyor. Adı Tom Brown ve arkadaşlarının 2020'de yayımladığı GPT-3 çalışmasından geliyor; 5\. makalede o çalışmadan few-shot düzeninin adını almış, mekanizmasını bu makaleye bırakmıştık. İsteme konan çözülmüş örneklerin her birine alanın terimiyle **gösterim** (demonstration) denir — sunum anlamında değil, "modele yapılıp gösterilen bir örnek" anlamında. Few-shot düzeni, dizinin başına birkaç gösterim koyup sonuna cevaplanacak yeni girdiyi eklemekten ibarettir.

Sorumuz basit görünüyor ama cevabı değil: model bu örneklerden tam olarak ne alıyor? Ve ağırlıklarda hiçbir şey değişmiyorsa buna "öğrenme" demek ne kadar doğru?

## Etiketleri bozalım

En iyi başlangıç, alanın sezgisini bir kerede sarsan ölçüm. Sewon Min ve arkadaşlarının EMNLP 2022'de sunduğu çalışma basit bir şey denedi: gösterimlerdeki etiketleri **rastgele** etiketlerle değiştirmek. Yani "bu film harikaydı → olumlu" yerine "bu film harikaydı → olumsuz" yazmak, hem de sistematik olarak değil, etiket kümesinden rastgele çekerek.

Beklenti açıktı. Denetimli eğitimde doğru eşleştirilmiş veri her şeydir; yanlış etiketlerle eğitilen bir model yanlış öğrenir. Ölçülen ise şu oldu: rastgele etiketler performansı yalnızca **çok az** düşürüyor. GPT-3'ün de aralarında bulunduğu on iki modelde düşüş mutlak 0 ile 5 puan arasında kaldı; sınıflandırma görevlerinde ortalama 2,6 puan, çoktan seçmeli görevlerde 1,7 puan.

Daha da rahatsız edici olan ayrıntı: gösterimlerin **hiçbirinin** etiketi doğru olmadığında bile, örneksiz istemin oldukça üstünde kalınıyor. Ölçülen üç düzende, örnek koymanın sağladığı kazancın yüzde 92'si, yüzde 100'ü ve yüzde 97'si korunuyordu. Yani "yanlış cevaplarla dolu bir örnek listesi", "hiç örnek yok"tan çok daha iyi.

Örnek sayısının etkisi de sezgiye aykırı. Dört gösterimle örneksiz düzenin çok üstüne çıkılıyor, ama sekizden sonra eğri düzleşiyor: ne doğru etiketlerle ne rastgele etiketlerle kayda değer bir iyileşme geliyor. Oysa denetimli eğitimde, özellikle küçük veri kümelerinde, örnek sayısı arttıkça başarı hızla yükselir. Bu farkın kendisi bir ipucu: gösterimlerin taşıdığı şey, denetimli eğitimin veriden aldığı şeyle aynı cinsten değil.

Ölçülen modellerden biri bu ipucunu iyice belirginleştiriyor. O model, açıkça örnekle öğrenme hedefiyle eğitilmişti; yani eğitimi sırasında önüne gösterim listeleri konup devamını tahmin etmesi istenmişti. Onda rastgele etiketlerin maliyeti neredeyse hiç yok: düşüş 0,1 ile 0,9 puan arasında. Örnekle öğrenmeyi bir beceri olarak öğretmek, modeli girdi–etiket eşlemesini büsbütün görmezden gelip biçim gibi daha ucuz ipuçlarına yaslanmaya itmiş görünüyor.

> **Kendini yokla:** Etiketler yanlışken bile kazanç sürüyorsa, gösterimler modele ne veriyor?

Görevin ne olduğunu. Model, ön eğitimde duygu sınıflandırmasını, çeviriyi, soru cevaplamayı zaten görmüştür; gösterimler ona yeni bir eşleme öğretmiyor, hangi eşlemeyi kullanacağını söylüyor. Etiketin doğru olması bu işaret için gerekli değil — etiketin **var olması** ve doğru kümeden gelmesi gerekiyor.

## Gösterimin dört bileşeni

Aynı çalışma bu cevabı tahmin olarak bırakmadı, parçalara ayırdı. Bir gösterim listesinin taşıdığı dört ayrı bilgi var: girdi–etiket eşlemesinin doğruluğu, girdilerin geldiği dağılım, etiket kümesinin kendisi ve girdi–etiket çiftlerinden oluşan biçim. Her birini tek tek bozup ne kaybedildiğini ölçtüler.

![Solda bir istem içinde art arda dizilmiş girdi-etiket çiftleri, sağda bu çiftlerin taşıdığı dört ayrı bilgi bileşeni listelenir: girdi-etiket eşlemesi, girdi dağılımı, etiket kümesi ve biçim. Her bileşenin karşısında o bileşen bozulduğunda ölçülen kaybın büyüklüğü yazılıdır; eşlemenin bozulması en küçük, biçimin bozulması en büyük kaybı verir.](assets/gosterimlerin-dort-bileseni.svg "Şekil 1 — Gösterimin hangi parçası taşıyor")

Şekil 1'deki sıralama makalenin çekirdeği. **Girdi dağılımı** bozulduğunda — gösterimlerdeki cümleler görevin verisinden değil, ilgisiz bir derlemden çekildiğinde — düşüş 3 ila 16 puan arasında. **Etiket kümesi** bozulduğunda — gerçek etiketler yerine rastgele İngilizce kelimeler kullanıldığında — modelin etiketi kendisinin üretmek zorunda olduğu düzende düşüş 5 ila 16 puan. **Biçim** bozulduğunda, yani etiketler tamamen kaldırılıp yalnızca girdiler ya da yalnızca etiketler art arda dizildiğinde, sonuç örneksiz istemle aynı düzeye ya da altına iniyor.

Buradan güzel bir ters okuma çıkıyor. Biçim korunduğu sürece, taşınan bilginin çoğu ayakta kalıyor: ilgisiz cümleleri doğru etiket kümesinden rastgele etiketlerle eşleştirmek, örnek koymanın kazancının yüzde 95'ini koruyabiliyor; gerçek girdileri rastgele İngilizce kelimelerle eşleştirmek yüzde 75 ile 87 arasında bir korunma sağlıyor. Aynı bilgiyi biçimi bozarak vermek ise hiçbir şey kazandırmıyor.

Yani gösterim listesi bir ders değil, bir **tarif**. "Şu türden bir girdi gelecek, şu kümeden bir etiket üreteceksin, bu biçimde." 22\. makaledeki sonucun mekanizması tam olarak burada: biçim taşıyıcının kendisiyse, biçimi değiştirmenin sonucu oynatması şaşırtıcı değil.

Bu okuma, kendi işinde örnek yazarken hangi hataların pahalı olduğunu da söylüyor. Diyelim müşteri yorumlarını "şikâyet / öneri / teşekkür" diye ayırmak istiyorsun. Örneklerden birine yanlış etiket koyman, ölçülen tabloya göre en ucuz hatadır. Buna karşılık örnek metinleri kendi elinle uydurman — gerçek yorumlar yerine kısa, temiz, yapay cümleler yazman — girdi dağılımını bozar. Üç etiketten yalnızca ikisini örneklerde göstermen etiket kümesini eksik bırakır. Birkaç örneği çift olarak değil de düz bir paragraf hâlinde vermen ise biçimi kırar ve kazancın tamamını götürebilir. Sezgi, hataları tam ters sırada önemser.

## Görevi tanımak ile görevi öğrenmek

Bu tabloyu bir sonraki çalışma tamamladı ve bir yerini de düzeltti. Jane Pan, Tianyu Gao, Howard Chen ve Danqi Chen'in ACL 2023 Bulguları'nda yayımladığı çalışma, örnekle öğrenmeyi iki ayrı kuvvete ayırıyor. **Görev tanıma** (task recognition), modelin gösterimlere bakıp hangi görevin istendiğini anlaması ve ön eğitimden gelen bilgisini uygulamasıdır. **Görev öğrenme** (task learning) ise ön eğitimde hiç görülmemiş bir girdi–etiket eşlemesini gösterimlerden çıkarmasıdır.

İkisini ayırmak için üç düzen kurdular. Bu üç düzen, deneyin tamamını taşıdığı için Şekil 2'de yan yana veriliyor.

![Aynı duygu sınıflandırma görevi için üç istem düzeni yan yana gösterilir. Birincisinde örnekler doğru etiketlerle, ikincisinde etiket kümesinden rastgele çekilmiş etiketlerle, üçüncüsünde anlamı olmayan soyut simgelerle eşleştirilmiştir. Her düzenin altında o düzenin hangi yeteneği açık bıraktığı yazılıdır: doğru etiketler her ikisini, rastgele etiketler yalnızca görev tanımayı, soyut simgeler yalnızca görev öğrenmeyi ölçer.](assets/uc-etiket-duzeni.svg "Şekil 2 — Aynı görev, üç ölçüm düzeni")

Şekil 2'deki üçüncü düzen kritik. Etiketler "olumlu/olumsuz" yerine "A/B/C" gibi anlamsız simgelerle değiştirildiğinde ve istemden görevi ele veren bütün doğal dil kaldırıldığında, modelin başarabilmesinin tek yolu eşlemeyi gösterimlerden çıkarmaktır — ön eğitimden gelen hiçbir çağrışım işe yaramaz.

On altı sınıflandırma kümesinde, üç model ailesinde (GPT-3'ün 350 milyondan 175 milyara uzanan sürümleri, LLaMA'nın 7–65 milyarlık sürümleri, OPT'nin 350 milyondan 66 milyara uzanan sürümleri) ve 8, 16, 32 gösterimle ölçtüler. Sonuç iki cümlede özetleniyor. Rastgele etiketli düzenin eğrisi neredeyse **düz**: model büyüdükçe de örnek sayısı arttıkça da yükselmiyor. Soyut etiketli düzenin eğrisi ise hem model büyüdükçe hem örnek sayısı arttıkça **dikleşiyor**; en büyük modellerde ve 32 gösterimle rastgele etiketli düzenin üstüne çıkıyor.

Bu, önceki bölümün bulgusunu yanlışlamıyor; sınırını çiziyor. Küçük modellerde ve az örnekle doğru etiketler gerçekten fark etmiyor, çünkü çalışan tek kuvvet görev tanımadır. Model büyüdükçe ikinci bir kuvvet devreye giriyor ve o kuvvet için etiketlerin doğruluğu şart. "Etiketler önemsizdir" cümlesi, ölçümün yapıldığı rejime bağlı bir cümleydi.

## Yüzlerce örnek konunca

Pencere büyüyünce bu ikinci kuvvetin ne kadar ileri gidebildiği görülebilir hâle geldi. 21\. makalede uzun bağlamın bedelini konuşmuştuk; kazancının bir kısmı burada.

Rishabh Agarwal ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma, isteme birkaç örnek yerine yüzlerce ya da binlerce örnek koymayı sistematik olarak ölçtü — alandaki adıyla **many-shot** rejimi. Düşük kaynaklı çeviri, özetleme, planlama, matematik ve sınıflandırma görevlerinde örnek sayısını ikişer kat artırarak ilerlediler.

Çeviri sonuçları en okunaklı olanı. İngilizceden Bemba diline çeviride, tek örnekli isteme kıyasla 997 örnekli istem göreli yüzde 15,3 iyileşme veriyor; Kürtçede yüzde 4,5. O 997 örnek yaklaşık 85.000 token tutuyor — yani bu rejim, ancak 21\. makalede konuştuğumuz uzun pencerelerle mümkün.

Asıl çarpıcı karşılaştırma ise başka. Aynı çalışma, aynı örneklerle **denetimli ince ayar** yapmakla bu örnekleri isteme koymayı yan yana ölçtü. Puanlar, 6\. makalede tanıştığımız BLEU ile aynı aileden bir cetvelden geliyor: chrF2++, üretilen çeviri ile referans çeviri arasındaki karakter ve kelime örtüşmesini ölçer, yüksek olan iyidir.

![İki dil için üç sütunlu bir karşılaştırma çubuk grafiği. Bembada taban model 28,3, aynı 997 örnekle denetimli ince ayar 47,7, aynı örnekler isteme konduğunda 47,2 puan; Kürtçede taban 39,5, ince ayar 46,5, isteme konan örnekler 44,0 puan veriyor. İnce ayar ile örnekle öğrenmenin çubukları her iki dilde de birbirine çok yakındır.](assets/cok-ornekli-ve-ince-ayar.svg "Şekil 3 — Aynı örnekler, iki ayrı yol")

Şekil 3'teki yakınlık, 19\. makalenin ayrımını yeni bir yerden doğruluyor. Orada "davranış ucuz, bilgi pahalı" demiştik: bir modele nasıl davranacağını öğretmek küçük bir uyarlamayla mümkün, ona yeni bilgi yazmak değil. Burada aynı ayrım daha da keskinleşiyor — bir görevi *tarif etmek* için ağırlığa dokunmaya hiç gerek olmayabiliyor. Bembada ince ayar 47,7, isteme konan aynı örnekler 47,2; ikisi de 28,3'lük tabandan aynı mesafeye taşıyor.

İki bulgu daha, ölçekle açılan görev öğrenme kuvvetini doğruluyor. Birincisi: duygu sınıflandırmasında etiketler bilinçli olarak **ters çevrildiğinde** — "olumlu" ile "olumsuz"un yerleri değiştirildiğinde — az örnekle model kendi ön eğitim eğilimini yenemiyor ve başarısı düşük kalıyor. Örnek sayısı arttıkça başarı yükseliyor ve varsayılan etiketlerle alınan düzeye yaklaşıyor. Modelin kendi cevabına verdiği olasılık da aynı yolu izliyor: önce düşüyor, sonra keskin biçimde yükseliyor. Yazarlar bunu bir geçiş dönemi olarak okuyor — birkaç örnek, modeli yanlış bir alışkanlığa çağırmaya yetiyor ama o alışkanlığı bozmaya yetmiyor.

İkincisi daha da net. Doğal dille hiç ilgisi olmayan bir görev tanımladılar: sıfır ve birlerden oluşan bir dizinin her adımına kadar olan parçasında kaç tane bir bulunduğunu değil, o sayının tek mi çift mi olduğunu — yani eşlik değerini — bildirmek. Bu eşlemenin ön eğitimde bir çağrışımı yok; model ya gösterimlerden çıkaracak ya çıkaramayacak. Örnek sayısı 8.192'ye kadar artırıldığında başarı düzenli olarak yükseliyor ve aynı görev için sıfırdan eğitilmiş, GPT-2'nin orta boy sürümü büyüklüğünde bir modelin — hem de yirmi kat fazla örnekle eğitilmiş bir modelin — üstüne çıkıyor. Ağırlıklara tek bir güncelleme yapılmadan.

Bunun bedeli var ve çalışma bunu da kaydediyor: örnek sayısı arttıkça çıkarım maliyeti doğrusal büyüyor.

> **Kendini yokla:** Yüzlerce örnek koymak ince ayarla başa baş geliyorsa, ince ayara neden hâlâ gerek var?

Çünkü ikisinin bedeli farklı yerden çıkıyor. İsteme konan 997 örnek her çağrıda yeniden okunur; 21\. makaledeki pencereden 85.000 token yer kapar ve her turda yeniden işlenir. İnce ayar bir kez ödenir, sonra istem boş kalır. Biri sabit maliyeti tekrarlayan bir kiraya, öbürü tek seferlik bir yatırıma benziyor — ve hangisinin ucuz olduğu, aynı görevi kaç kez çalıştıracağına bağlı.

## Mekanizma açıklamaları ve durdukları yer

Peki içeride ne oluyor? Burada dürüst cevap şu: kapanmış bir açıklama yok, iki ciddi öneri ve bu önerilere yöneltilmiş ciddi bir itiraz var.

**Birinci öneri: örtük Bayesçi çıkarım.** Sang Michael Xie, Aditi Raghunathan, Percy Liang ve Tengyu Ma'nın ICLR 2022'de sunduğu çalışma, örnekle öğrenmeyi bir çıkarım işi olarak kuruyor. Ön eğitim belgeleri uzun erimli tutarlılık taşır: bir metnin devamını doğru tahmin etmek için modelin, o belgenin hangi "kavram" etrafında yazıldığını örtük olarak kestirmesi gerekir. Gösterimler de aynı işi yapar; model onlara bakıp gizli görevi kestirir ve devamını o kestirime göre üretir. Bu çerçeve, önceki bölümlerdeki bulgularla iyi uyuşuyor: gösterimlerin işi bir kavramı **işaret etmek**. Sınırı ise açık — kanıt, ön eğitim dağılımının belirli bir matematiksel biçimde kurulduğu bir kuramsal düzenekten geliyor, gerçek bir dil modelinin içine bakmaktan değil.

**İkinci öneri: örtük gradyan inişi.** Johannes von Oswald ve arkadaşlarının ICML 2023'te sunduğu çalışma, tek bir doğrusal öz-dikkat katmanının yaptığı dönüşümle bir regresyon kaybı üzerinde atılan **tek bir gradyan inişi adımının** özdeş olabileceğini gösteren açık bir ağırlık kurgusu veriyor. Ardından küçük transformer'ları basit regresyon görevlerinde eğitip, öğrenilen ağırlıkların bu kurguya benzediğini ölçüyorlar. Benzetme çekici: 2\. makaledeki döngü, eğitim sırasında değil çıkarım sırasında, ileri geçişin içinde çalışıyor olabilir.

Ama bu benzetmenin ne kadar taşıdığı tartışmalı. Lingfeng Shen, Aayush Mishra ve Daniel Khashabi'nin ICML 2024'te sunduğu konum bildirisi, önceki çalışmaların varsayımlarını tek tek sayıyor: deneyler modelleri **açıkça örnekle öğrenme hedefiyle** eğitiyor, oysa gerçek dil modellerinde bu yetenek kendiliğinden beliriyor; elle kurulan ağırlıklar gerçek modellerin ağırlıklarına benzemiyor. Kendi ölçümlerinde gerçek bir modelle — LLaMA'nın 7 milyar parametreli sürümüyle — örnekle öğrenmeyi ve gradyan inişini karşılaştırıyorlar ve üç ayrı ölçütte tutarsız davrandıklarını buluyorlar. En temiz ayrım gözlemlerden biri şu: iki süreç, örnekleri gördükleri **sıraya** aynı biçimde duyarlı değil. Yazarların sonucu, bu makalenin de sonucu: eşdeğerlik hâlâ açık bir hipotez.

## Buna öğrenme demek doğru mu

Şimdi başlangıçtaki soruya dönebiliriz.

Bir yandan bu, öğrenmenin bilinen tanımına uymuyor. Model hiçbir şey saklamıyor: 21\. makalede kurduğumuz durumsuzluk burada da geçerli, örnekler pencereden çıktığı anda kazanılan her şey gider. Bir sonraki sohbette model, bu sohbette "öğrendiği" hiçbir eşlemeyi hatırlamaz.

Öte yandan, örnek sayısı arttıkça ön eğitim eğilimlerinin yenilebildiğini gördük; soyut simgelerle kurulmuş, ön eğitimde hiç görülmemiş bir eşlemenin ölçekle çıkarılabildiğini gördük. Bu, "yalnızca hatırlama"dan fazlası.

Dürüst formülasyon şu olabilir: örnekle öğrenme, tek bir ileri geçişin içinde, kanıta bakarak davranışı ayarlamaktır. Ayarlanan şey davranıştır, edinilen şey bilgi değildir — 19\. makaledeki ayrımla çelişmez, onu tamamlar. Ve kalıcı değildir; kalıcılık ancak ağırlığa yazmakla ya da bilgiyi her seferinde pencereye yeniden koymakla gelir.

18\. makaledeki bir bulgu bu ayrımı somutlaştırıyor. Ağırlıklara "A, B'dir" yönünde yazılmış bir ilişki ters yönde sorulduğunda çıkarılamıyordu; ama aynı ilişki **bağlamda** verildiğinde model tersini çıkarabiliyordu. Bağlamdaki bilgi ile ağırlıktaki bilgi aynı biçimde erişilebilir değil: biri dikkat yoluyla önünde duruyor, öbürü eğitim sırasında hangi yönde kurulduysa o yönde çalışıyor. Örnekle öğrenmenin gücü de sınırı da bu farktan doğuyor.

## Örnek koymanın disiplini

Bütün bunlardan çıkan pratik kurallar kısa ve çoğu sezgiye aykırı.

**Girdileri gerçek dağılımdan seç.** Gösterimlerdeki örnekler, modele soracağın gerçek girdilere benzemeli. Uydurma ya da başka bir alandan devşirilmiş örnekler ölçülebilir biçimde zarar veriyor.

**Etiket kümesini eksiksiz göster.** Modelin üreteceği etiketlerin hepsi gösterimlerde geçmeli. Kümeyi eksik göstermek, bileşenlerin en pahalılarından birini kırıyor.

**Biçimi sabit tut.** Girdi–etiket çiftlerinin düzeni taşıyıcının kendisi. Aynı biçimi bütün gösterimlerde ve son girdide birebir koru.

**Etiketlerin doğruluğunu önemseme lüksüne kapılma.** "Rastgele etiketler de çalışıyor" bulgusu küçük modeller ve az örnek için geçerliydi. Büyük modelde ve çok örnekle etiketlerin doğruluğu geri geliyor.

**Sırayı ölç, tahmin etme.** 22\. makalede gördüğümüz sıra duyarlılığı burada da geçerli. Aynı örnekler, farklı sırada, farklı sonuç verir; hangi sıranın iyi olduğunu ancak cevabı bilinen bir kümede ölçerek bulabilirsin.

**Örneklerin bedelini hesaba kat.** Her gösterim pencereden yer kapar ve her çağrıda yeniden işlenir. Örnek sayısını artırmanın getirisi bir yerde düzleşirken maliyeti düzleşmiyor.

Bu kuralları kendi işinde sınamanın somut hâli de 22\. makaledeki yöntemin aynısı. Cevabı bilinen birkaç düzine örnekten bir küme kur; sonra örnek sayısını dört, sekiz, on altı, otuz iki diye ikişer kat artırarak aynı kümede ölç. İki şeye bak: eğri nerede düzleşiyor ve etiketleri bilerek bozduğunda ne kadar düşüyor. Birinci ölçüm sana kaç örnek koymanın gerçekten işe yaradığını, ikincisi görevinin hangi kuvvete yaslandığını söyler. Düşüş küçükse model görevi zaten tanıyordur ve örnekler yalnızca tarif işlevi görüyordur; düşüş büyükse gerçekten yeni bir eşleme öğretiyorsundur ve etiketlerin doğruluğu artık pazarlık konusu değildir.

### Sırada ne var

Bu makale boyunca istemi tek parça bir metin gibi ele aldık: gösterimler, sonra soru. Oysa gerçek bir sohbet arayüzünde o metin bölümlere ayrılmış durumda — birine sistem istemi, birine kullanıcı mesajı, birine modelin cevabı deniyor. 21\. makalede bu bölümlerin ayrı kanallar değil, aynı dizinin içine konmuş işaretler olduğunu söylemiştik. Peki o işaretler tam olarak neye benziyor, ve "sistem istemi" bir talimatı gerçekten ayrıcalıklı kılıyor mu?

## Kaynakça

- Brown, T. B., Mann, B., Ryder, N., Subbiah, M., Kaplan, J., Dhariwal, P. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS 2020. [Bağlantı](https://arxiv.org/abs/2005.14165)
- Min, S., Lyu, X., Holtzman, A., Artetxe, M., Lewis, M., Hajishirzi, H. & Zettlemoyer, L. (2022). *Rethinking the Role of Demonstrations: What Makes In-Context Learning Work?*. EMNLP 2022, s. 11048–11064. [Bağlantı](https://aclanthology.org/2022.emnlp-main.759/)
- Pan, J., Gao, T., Chen, H. & Chen, D. (2023). *What In-Context Learning "Learns" In-Context: Disentangling Task Recognition and Task Learning*. Findings of ACL 2023, s. 8298–8319. [Bağlantı](https://aclanthology.org/2023.findings-acl.527/)
- Agarwal, R., Singh, A., Zhang, L. M., Bohnet, B., Rosias, L., Chan, S. ve ark. (2024). *Many-Shot In-Context Learning*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/8cb564df771e9eacbfe9d72bd46a24a9-Abstract-Conference.html)
- Xie, S. M., Raghunathan, A., Liang, P. & Ma, T. (2022). *An Explanation of In-context Learning as Implicit Bayesian Inference*. ICLR 2022 (arXiv:2111.02080). [Bağlantı](https://arxiv.org/abs/2111.02080)
- von Oswald, J., Niklasson, E., Randazzo, E., Sacramento, J., Mordvintsev, A., Zhmoginov, A. & Vladymyrov, M. (2023). *Transformers Learn In-Context by Gradient Descent*. ICML 2023, PMLR 202. [Bağlantı](https://proceedings.mlr.press/v202/von-oswald23a.html)
- Shen, L., Mishra, A. & Khashabi, D. (2024). *Position: Do pretrained Transformers Learn In-Context by Gradient Descent?*. ICML 2024, PMLR 235, s. 44712–44740. [Bağlantı](https://proceedings.mlr.press/v235/shen24d.html)
- Berglund, L., Tong, M., Kaufmann, M., Balesni, M., Stickland, A. C., Korbak, T. & Evans, O. (2024). *The Reversal Curse: LLMs trained on "A is B" fail to learn "B is A"*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=GPKTIktA0k)
