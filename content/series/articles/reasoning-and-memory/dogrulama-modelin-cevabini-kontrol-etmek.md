---
article_id: article_168d4dce-361f-446a-aa37-c876fd5203dc
title: "Doğrulama: Modelin Cevabını Kontrol Etmek"
slug: dogrulama-modelin-cevabini-kontrol-etmek
category: reasoning-and-memory
level: intermediate
reading_order: 35
summary: "Adaylar arasından doğru cevabı seçen bileşeni kurar: doğrulayıcının nasıl eğitildiğini, arama baskısı arttıkça nasıl kandırıldığını, yanlış kabul ile yanlış ret arasındaki ayrımı, modelin kendi cevabını dış geri bildirim olmadan kontrol etmesinin ölçülen sınırını ve üretmek ile doğrulamak arasındaki asimetrinin nerede geçerli olduğunu gösterir."
tags:
  - dogrulayici
  - oz-duzeltme
  - en-iyi-n-secimi
  - asiri-optimizasyon
  - cikarim-aninda-hesap
content_hash: sha256:9ad7e6c7f5e6114a86e7a41f05b2d76041d77018fc4ecb670dfbf7f4071a19bf
classification_version: 1
classification_batch: 8
---
## Adaylar elimizde; hangisi doğru?

33\. makalede paralel ekseni kurarken bir açık bıraktık. Kapsama, `k` denemenin en az birinde doğru cevaba varılan soruların oranıydı ve deneme sayısıyla şaşırtıcı biçimde iyi büyüyordu. Ama kapsama, doğru cevabın adaylar arasında **bulunduğunu** söyler; hangisinin doğru olduğunu söylemez. Aradaki fark bir yetenek açığı değil, bir **seçim** açığıdır.

34\. makalede aynı bileşen bir kez daha belirdi, bu kez eğitim tarafında. Ödülü veren şey bir kuraldı ve o kural yalnızca nihai cevabı denetliyordu; yanlış gerekçeyle doğru cevaba varan çözüm de tam puan alıyordu.

13\. makalede ise küçük bir söz vermiştik. Ödül modelinin işi metin üretmek değil iki metni karşılaştırmaktı, ve karşılaştırmak üretmekten kolay bir işti; aynı asimetrinin ileride geri döneceğini söylemiştik.

Bu makale o üç ipin düğümlendiği yer. Bir cevaba doğruluk puanı veren bileşene 33\. makalede **doğrulayıcı** demiştik. Şimdi sorular şunlar: doğrulayıcı nasıl eğitilir, arama baskısı altında nerede kırılır, ve model kendi cevabını kontrol ederek bu işi ne kadar görebilir?

## Etiketi kim veriyor

Doğrulayıcıyı eğitmenin önündeki asıl engel etiket gibi görünür: bir cevabın iyi olup olmadığını kim söyleyecek? Karl Cobbe ve arkadaşlarının 2021'de yayımladığı çalışma, cevabın doğruluğunun makineyle sınanabildiği alanlarda bu engelin olmadığını gösterdi. Çalışma **hakemli değildir** ve seri onu bu kaydı düşerek kullanıyor; alanın bu bileşeni ilk kez ölçen kaynağı olduğu için yerine bir başkası konamıyor.

Düzenek üç adımdan ibaret. Önce bir model, çözümlü sorularla kısa süre ince ayarlanır; bu modele **üretici** (generator) deniyor. Sonra üretici, her eğitim sorusuna yüz ayrı çözüm üretir ve her çözüm yalnızca **vardığı nihai cevaba göre** doğru ya da yanlış diye etiketlenir. Son olarak ikinci bir model, bu etiketleri tahmin etmeye eğitilir. Etiketleme bedavadır: cevap anahtarı zaten elimizdedir, kimse ara adımlara bakmaz.

![İki bantlı bir şema. Üstteki eğitim bandında soldan sağa dört kutu oklarla bağlanır: kısa ince ayardan geçmiş üretici, aynı soruya üretilmiş yüz aday çözüm, cevap anahtarıyla verilen doğru ya da yanlış etiketi, ve bu etiketlerle eğitilen doğrulayıcı. Bandın altında etiketin bedava olduğu, çünkü ara adımlara değil yalnızca nihai cevaba bakıldığı yazılıdır. Alttaki çıkarım bandında yeni bir soru kutusundan dört aday satırına oklar ayrılır; her satırın sağında doğrulayıcının verdiği puan durur ve en yüksek puanlı üçüncü aday vurgulanarak sağdaki seçilen kutusuna bağlanır. Şeklin altında eğitimde etiketi cevap anahtarının, çıkarımda puanı doğrulayıcının verdiği ve üreticiyi büyütmenin doğrulayıcıyı büyütmekten daha çok kazandırdığı belirtilir.](assets/dogrulayici-hatti.svg "Şekil 1 — Bedava etiketten doğrulayıcıya")

Şekil 1'in üst yarısı 34\. makaledeki filtrenin kardeşidir: orada doğru cevaba varan çözümler **eğitim verisi** olarak saklanıyordu, burada aynı etiketler bir **puanlayıcının** eğitim verisi oluyor. Fark, kazancın nerede kullanıldığında: biri modelin dağılımını değiştiriyor, öbürü çıkarım anında seçim yapıyor.

Ölçülen kazanç dikkat çekici. Tam eğitim kümesinde, 6 milyar parametreli bir üreticiye yüz aday ürettirip doğrulayıcıyla seçmek, 175 milyar parametreli bir modeli aynı veriyle ince ayarlamayı geçiyor. Çalışmanın kendi ifadesiyle bu, kabaca **otuz kat model boyu** artışına denk bir kazanç. Aynı çalışmanın ikinci bulgusu daha da öğretici: üreticiyi büyütmek, doğrulayıcıyı büyütmekten belirgin biçimde daha çok kazandırıyor. Küçük bir doğrulayıcı, kendinden çok daha büyük bir üreticinin adaylarını ayıklamakta hâlâ etkili. Yazarların yorumu dürüst: doğrulayıcı büyük ihtimalle tam bir denetim yapmıyor, o üreticinin çözümlerini ayırt etmeye yarayan görece kaba işaretlere dayanıyor.

Bir ayrıntı daha var ve 32\. makaleyle doğrudan konuşuyor. Aynı 6 milyar parametreli model ara adımlar üretmeden doğrudan cevap vermeye ince ayarlandığında başarısı yüzde 20,6'dan yüzde 5,2'ye düşüyor. Doğrulanacak bir zincir olması, yalnızca doğrulayıcı için değil üretici için de gerekli.

Doğrulayıcının puanı **nereye** yazacağı da bir tasarım kararı ve çalışmanın en ileriye bakan ablasyonu burada. İki seçenek karşılaştırılıyor: puanı yalnızca çözümün sonunda vermek, ya da her token'dan sonra vermek. İkincisi başta daha yavaş öğreniyor — görev daha zor ve daha gürültülü — ama sonunda öbürünü geçiyor ve aşırı öğrenmeye de daha dirençli çıkıyor. Yazarların hipotezi şu: adım adım puanlamak, modeli nihai cevabı ezberlemek yerine çözümün **boyunca** akıl yürütmeyi yargılamaya zorluyor. Bu fikrin tam kurulumu 38\. makalenin konusu.

> **Kendini yokla:** Doğrulayıcının etiketleri "bedava" ise, bu düzenek neden her göreve kurulamıyor?

Çünkü bedava olan şey etiket değil, **cevap anahtarı**. Nihai cevabın makineyle sınanabildiği yerde etiketleme bir dize karşılaştırmasıdır; sınanamadığı yerde etiketi yine bir insan ya da bir model vermek zorundadır — ve o anda 13\. makaledeki ödül modeline geri dönmüş oluruz. Yöntemin kapsamı, 34\. makaledeki gibi, doğrulayıcının kurulabildiği alanların kapsamıdır.

## Seçmek de bir eniyilemedir

Şimdi aynı çalışmanın en az bilinen bulgusuna gelelim. Doğrulayıcıya kaç aday sunulacağı bir ayardır ve daha çok aday her zaman daha iyi değildir: 6 milyar parametreli düzende başarı, aday sayısı **dört yüze** kadar yükseliyor, sonra düşmeye başlıyor. Çalışmanın açıklaması net — aramanın faydası, bir noktadan sonra doğrulayıcıyı kandıran düşmanca çözümler bulma riskiyle geçiliyor.

Bu cümle tanıdık gelmeli. 13\. makalede vekil bir ölçüyü fazla kovalamanın gerçek ölçütü bozduğunu görmüştük; aşırı optimizasyon, ödül modelinin hastalığıydı. Buradaki ders şu: **en iyi-N seçimi de bir eniyilemedir.** Model eğitilmiyor, ama N büyüdükçe doğrulayıcının puanına göre daha da uç adaylar seçiliyor ve seçilen cevabın dağılımı başlangıçtakinden uzaklaşıyor.

Üstelik uzaklığın büyüklüğü hesaplanabiliyor. 13\. makalede aşırı optimizasyonu ölçen Gao, Schulman ve Hilton'ın çalışması, en iyi-N seçiminin başlangıç dağılımından ıraksamasını kapalı biçimde veriyor: `ln N − (N−1)/N`. Ölçü, 13\. makaledeki KL ıraksamasının aynısı. Sayılarla: N dört iken uzaklık 0,64; yüz iken 3,62; bin iken 5,91 nat. Yani adayları yüzden bine çıkarmak "biraz daha çok deneme" değil, seçim baskısını ölçülebilir biçimde artırmak demek. Aynı çalışmada ödül modelleri üzerinde ölçülen bozulma eğrisinin — vekil puan yükselmeye devam ederken gerçek puanın önce yükselip sonra düşmesi — doğrulayıcıdaki karşılığı tam olarak budur.

Pratik sonuç, çalışmanın kendi çözümünde görünüyor: tek bir en yüksek puanlı adayı seçmek yerine, en yüksek puanlı birkaç aday arasında çoğunluk oyu almak daha iyi çalışıyor. Yüz adayla en iyi üç ile beş arasında bir grup, üç bin iki yüz adayla ilk otuz kadarı oy vermeli. Bu düzeltmenin mantığı, iki farklı seçiciyi üst üste bindirmek: doğrulayıcı en uç adayları eleyerek havuzu daraltıyor, çoğunluk oyu ise o havuzun içinde tek bir adayın tuhaflığına teslim olmayı engelliyor. Doğrulayıcının puanı bir sıralama aracı olarak iyi, tek başına bir karar mercii olarak kırılgan.

## Yanlış kabul ve yanlış ret

Doğrulayıcının yanılması tek bir şey değil, iki ayrı şeydir ve sonuçları da farklıdır.

**Yanlış pozitif** (false positive): yanlış bir cevabı doğru diye kabul etmek. Bu, sisteme yanlış cevap yazdırır ve arama baskısı arttıkça sıklaşır — az önceki dört yüz eşiğinin sebebi bu.

**Yanlış negatif** (false negative): doğru bir cevabı yanlış diye reddetmek. Bu, doğru cevabı zaten üretmiş bir sistemi ondan mahrum bırakır. Kapsama varken doğruluk yoksa, suçlu çoğu zaman budur.

![İki satır ve iki sütundan oluşan bir tablo şeması. Satırlar cevabın gerçekte doğru ya da yanlış olmasını, sütunlar doğrulayıcının kabul ya da ret kararını gösterir. Doğru cevabın kabul edildiği ve yanlış cevabın reddedildiği kutular istenen sonuç diye işaretlenmiştir. Doğru cevabın reddedildiği kutu yanlış ret adını taşır ve altında elde olan doğru cevabın atıldığı yazar. Yanlış cevabın kabul edildiği kutu yanlış kabul adını taşır ve altında bu hatanın aday sayısıyla sıklaştığı yazar. Şeklin altında tek bir doğruluk sayısının iki hatayı gizlediği belirtilir ve ölçülen bir örnek verilir: bir grafik boyama görevinde aynı model yanlış cevapların yüzde 6,5'ini kabul ederken doğru cevapların yüzde 95,8'ini reddetmiştir.](assets/iki-hata-turu.svg "Şekil 2 — Doğrulayıcının iki ayrı yanılma biçimi")

Şekil 2'deki ayrımın ne kadar belirleyici olduğunu Kaya Stechly, Karthik Valmeekam ve Subbarao Kambhampati'nin ICLR 2025'te sunduğu çalışma ölçüyor. Üç biçimsel alan seçiliyor — dört sayıdan 24 üretme oyunu, grafik boyama ve blok dünyasında planlama — çünkü bu alanlarda hem cevabın hem eleştirinin doğruluğu makineyle sınanabiliyor. Aynı model (GPT-4) hem çözümü üretiyor hem de kendi çözümünü doğruluyor.

Doğrulayıcı olarak modelin doğruluğu alana göre yüzde 71,8 ile 87,0 arasında. Ama bu tek sayı yanıltıcı; kırılım öyle diyor:

| Alan | doğruluk | yanlış kabul | yanlış ret |
|---|---|---|---|
| 24 oyunu | %87,0 | %10,4 | %20,7 |
| grafik boyama | %72,4 | %6,5 | %95,8 |
| blok dünyası | %71,8 | %18,6 | %15,5 |
| örtük blok dünyası | %79,6 | %0,5 | %97,1 |

Son sütun makalenin merkezinde. Grafik boyamada model, üretilmiş doğru cevapların yüzde 95,8'ini reddediyor; örtük blok dünyasında yüzde 97,1'ini. Sistem, kendi doğru cevabını tanıyamadığı için onu atıyor ve daha kötü üretimlere doğru yuvarlanıyor. Nitekim döngünün toplam başarısı tabanın **altına** düşüyor: 24 oyununda tek seferlik istemin yüzde 5'i, kendi kendini eleştiren döngüde yüzde 3; grafik boyamada yüzde 16'dan yüzde 2'ye.

Aynı düzenekte doğrulayıcı yerine alanın **sağlam** doğrulayıcısı — kuralları gerçekten sınayan bir program — konduğunda tablo tersine dönüyor: 24 oyunu yüzde 36'ya, grafik boyama yüzde 38'e çıkıyor. Buraya kadarki hikâye beklendik. Beklenmedik olan ablasyon şu: sağlam doğrulayıcının verdiği geri bildirimin **zenginliği** neredeyse hiç fark etmiyor. "Yanlış" demekle bütün hataları tek tek saymak arasında kayda değer bir fark yok; dahası, hiç eleştiri vermeden aynı istemi doğru cevap gelene kadar tekrar sormak kazancın çoğunu koruyor (grafik boyamada yüzde 40, hatta yüzde 44). Yani kazandıran şey açıklama değil, **durdurma kararının doğru olması**.

## Model kendi cevabını kontrol edebilir mi

Şimdi asıl soruya gelelim. Dış bir doğrulayıcı yoksa, model kendi cevabına bakıp düzeltebilir mi?

Jie Huang, Xinyun Chen ve arkadaşlarının ICLR 2024'te sunduğu çalışma bu soruyu iki düzeni ayırarak yanıtlıyor. Birinci düzende, döngünün ne zaman duracağına **cevap anahtarı** karar veriyor: cevap doğruysa düzeltme yapılmıyor. Bu düzende sayılar güzel — ilkokul matematiğinde yüzde 75,9'dan 84,3'e, sağduyu sorularında 75,8'den 89,7'ye. Ama bu düzen gerçek değil: cevabın doğru olup olmadığını zaten biliyorsak modele niye soralım?

İkinci düzende cevap anahtarı kaldırılıyor ve durdurma kararını modelin kendisi veriyor. Sonuçlar şöyle:

| Model | ilkokul matematiği | sağduyu soruları | çok adımlı olgu soruları |
|---|---|---|---|
| GPT-3.5, tek geçiş | 75,9 | 75,8 | 26,0 |
| GPT-3.5, iki tur düzeltme | 74,7 | 41,8 | 25,0 |
| GPT-4, tek geçiş | 95,5 | 82,0 | 49,0 |
| GPT-4, iki tur düzeltme | 89,0 | 80,0 | 43,0 |

Üç kümenin üçünde de düzeltme başarıyı **düşürüyor**, üstelik üç ile beş kat daha çok model çağrısı harcayarak. Açık ağırlıklı bir modelde düşüş daha sert: ilkokul matematiğinde yüzde 62,0'den 36,5'e.

Neden düştüğünü, cevapların nasıl değiştiğine bakınca görüyoruz.

![Dört yatay çubuktan oluşan bir grafik; ilkokul matematiği kümesinde ve dış geri bildirim olmadan ölçülmüştür. En uzun çubuk cevabın hiç değişmediği durumu gösterir ve yüzde 74,7'dir. İkinci çubuk doğru cevabın yanlışa çevrildiği durumdur ve yüzde 8,8'dir. Üçüncü çubuk yanlış cevabın doğruya çevrildiği durumdur ve yüzde 7,6'dır; ikinciden kısadır. Dördüncü çubuk yanlıştan yanlışa geçişleri gösterir ve yüzde 8,9'dur. İkinci ve üçüncü çubukları kapsayan bir köşeli ayraç, bozulan miktarın düzeltilenden çok olduğunu işaretler. Şeklin altında düzeltme turunun doğru cevapların bir kısmını bozup yanlışların bir kısmını onardığı, bilanço eksi olduğu için toplam başarının düştüğü ve bunun üç kat çağrı harcanarak olduğu yazılıdır.](assets/cevap-degisimi.svg "Şekil 3 — İki tur düzeltmeden sonra cevaplar nereye gitti?")

Şekil 3'teki ikinci ve üçüncü çubuğun uzunluk farkı bütün hikâyeyi taşıyor: model doğru cevaplarının yüzde 8,8'ini bozarken yanlış cevaplarının yüzde 7,6'sını düzeltiyor. Bilanço eksi. Sebep, Şekil 2'deki yanlış ret kutusunun ta kendisi: model kendi gerekçesinin doğru olup olmadığını yeterince güvenilir yargılayamıyor, ve "bir daha bak" talimatı onu ilk cevabından uzaklaşmaya iten fazladan bir istem gibi çalışıyor.

Bu, "öz-düzeltme hiç işe yaramaz" demek değil ve sınırı görmek için karşı örneğe bakmak gerekiyor. Aman Madaan ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma, tam olarak aynı döngüyü — model üretir, kendi çıktısına geri bildirim yazar, yeniden yazar — yedi görevde ölçüyor ve ortalamada yaklaşık yirmi puanlık bir kazanç buluyor. Diyalog cevabı üretmede tercih puanı yüzde 25,4'ten 74,6'ya çıkıyor. Ama aynı tablonun matematik satırı şöyle: 64,1 → 64,1, 74,8 → 75,0, 92,9 → 93,1. Yani sıfır.

Çalışmanın kendi açıklaması, bu makalenin tezini yazarların ağzından söylüyor: matematikte hata ince olabiliyor ve tutarlı görünen bir zincir modeli aldatıyor — bir modelin geri bildirimlerinin yüzde 94'ü "her şey iyi görünüyor" diyor. Dışarıdan yalnızca "bu cevap yanlış" bilgisi verildiğinde ise matematikteki kazanç beş puanın üzerine çıkıyor.

Ryo Kamoi ve arkadaşlarının TACL'de 2024'te yayımlanan eleştirel derlemesi bu sınırı toparlıyor. Bulguları dört maddede özetlenebilir: genel görevlerde, geri bildirimi yalnızca modelin kendisine yazdırarak başarılı öz-düzeltme gösteren bir çalışma yok; güvenilir dış geri bildirimin bulunduğu görevlerde öz-düzeltme iyi çalışıyor; büyük ölçekli ince ayar bu yeteneği kazandırabiliyor; ve cevabın parçalara ayrılıp tek tek denetlenebildiği görevler istisnai olarak elverişli. Darboğaz düzeltmede değil, **geri bildirimin üretilmesinde**.

> **Kendini yokla:** Diyalog cevabı üretmede öz-düzeltmenin kazandırıp matematikte kazandırmaması, hangi tek farkla açıklanıyor?

Cevabın "iyi" olup olmadığını söylemenin zorluğuyla. Bir diyalog cevabının daha ilgili ya da daha kibar olması, cevabın kendisine bakarak söylenebilecek bir şeydir; üstelik ölçüt de kısmen tercihtir, yani modelin yargısı ölçütün bir parçasıdır. Bir matematik çözümünün doğru olup olmadığı ise cevaba bakarak söylenemez, hesabı yapmayı gerektirir — ve o hesap, çözümü üretirken zaten yapılmıştı. Öz-düzeltme, doğrulamanın ucuz olduğu yerde kazandırıyor.

## Asimetri nerede duruyor

Sık tekrarlanan bir cümle var: doğrulamak üretmekten kolaydır. Bu cümle bir problem sınıfı hakkında doğrudur — bir çözümün geçerliliğini sınamak, o çözümü aramaktan ucuz olabilir. Stechly ve arkadaşlarının uyarısı tam da bu noktada: problemin karmaşıklık sınıfı hakkındaki bir iddia, o problemi bir dil modeline sorduğunda **otomatik olarak** geçerli olmaz. Modelin doğrulaması, üretimiyle aynı düzeneği kullanır; ikisinin hata kaynakları bağımsız değildir.

Cobbe ve arkadaşları bu asimetriyi doğrulayıcının gerekçesi olarak sunarken aslında iki ayrı şey söylüyorlar ve ikisini ayırmak gerekiyor. Birincisi, doğrulamanın genel olarak üretmekten basit bir iş olması. İkincisi ve daha az tartışmalı olanı: doğrulayıcı **seçenekli** çalışır — birçok aday arasından seçim yapar, yani tek bir çekilişin şansına bağlı değildir. İkinci gerekçe, birincisi hiç geçerli olmasa bile kazanç üretir; ve az önceki dört yüz eşiği, o kazancın nerede tükendiğini gösteriyor.

O hâlde asimetri seride nerede gerçekten çalıştı? Üç yerde ve üçünde de doğrulama işini yapan şey model değildi. 28\. makalede spekülatif üretim, küçük bir taslak modelin önerdiği token'ları büyük modelin **tek geçişte** doğrulamasına dayanıyordu; orada doğrulama gerçekten ucuzdu, çünkü paralel bir ileri geçişten ibaretti. 34\. makalede ödülü veren kural bir dize karşılaştırması ya da bir test takımıydı. Bu makalede sağlam doğrulayıcının kazandırdığı yerde de sınayan şey bir programdı.

Maliyet tarafı da unutulmamalı. 33\. makaledeki muhasebede her adaya bir doğrulayıcı çalıştırmak token başına maliyeti ikiye katlıyordu. Doğrulayıcının üreticiden küçük olabilmesi bu faturayı hafifletiyor — ve bu, Cobbe ve arkadaşlarının ablasyonunun pratikteki asıl değeri.

## Doğrulamanın disiplini

**Doğrulayıcı, kapsamayı doğruluğa çeviren bileşendir.** Adaylar arasında doğru cevap yoksa hiçbir doğrulayıcı işe yaramaz; varsa, seçimi yapan şey odur.

**Etiket bedavaysa doğrulayıcı ucuzdur.** Nihai cevabın makineyle sınanabildiği alanlarda doğrulayıcının eğitim verisi kendiliğinden çıkar.

**Aday sayısını artırmak seçim baskısını artırır.** En iyi-N seçimi bir eniyilemedir ve fazla kovalanınca doğrulayıcıyı kandıran adaylar öne çıkar.

**İki hata türünü ayrı ölçün.** Yanlış kabul yanlış cevap yazdırır, yanlış ret elde olan doğru cevabı çöpe atar; tek bir doğruluk sayısı ikisini gizler.

**Kendi cevabını denetleyen model, güvenilir bir doğrulayıcı değildir.** Dış geri bildirim olmadan yapılan düzeltme turları ölçülen kümelerde başarıyı düşürüyor ve maliyeti üçe beşe katlıyor.

**Kazandıran şey eleştirinin zenginliği değil, durdurma kararının doğruluğudur.** Sağlam bir doğrulayıcıyla yalnızca yeniden sormak, ayrıntılı geri bildirimle neredeyse aynı sonucu veriyor.

**Asimetri probleme aittir, modele değil.** "Doğrulamak üretmekten kolaydır" cümlesi ancak doğrulamayı yapan şey modelin kendisi olmadığında güvenle kullanılabilir.

### Sırada ne var

Bu makalede seçimi bir doğrulayıcıya yaptırdık ve doğrulayıcının kendisinin bir sorun kaynağı olduğunu gördük. Ama adaylar arasından seçim yapmanın hiç doğrulayıcı gerektirmeyen bir yolu daha var: adayların birbirine bakması.

33\. makalede adını koymuştuk — aynı soruya birden çok cevap üretip en sık tekrarlananı seçmek. Sonraki makale bunun tam kurulumunu yapıyor: farklı zincirlerin aynı cevapta buluşması neden bilgi taşıyor, kazanç kaç yolda doyuyor, ve adayları bağımsız çekmek yerine bir ağaç kurup dallar arasında gezinmek ne kazandırıp ne kaybettiriyor?

## Kaynakça

- Cobbe, K., Kosaraju, V., Bavarian, M., Chen, M., Jun, H., Kaiser, L., Plappert, M., Tworek, J., Hilton, J., Nakano, R., Hesse, C. & Schulman, J. (2021). *Training Verifiers to Solve Math Word Problems*. arXiv (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2110.14168)
- Gao, L., Schulman, J. & Hilton, J. (2023). *Scaling Laws for Reward Model Overoptimization*. ICML 2023, PMLR 202. [Bağlantı](https://proceedings.mlr.press/v202/gao23h.html)
- Stechly, K., Valmeekam, K. & Kambhampati, S. (2025). *On the Self-Verification Limitations of Large Language Models on Reasoning and Planning Tasks*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/f3c5e56274140e0420baa3916c529210-Abstract-Conference.html)
- Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X. & Zhou, D. (2024). *Large Language Models Cannot Self-Correct Reasoning Yet*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html)
- Madaan, A., Tandon, N., Gupta, P., Hallinan, S., Gao, L., Wiegreffe, S., Alon, U., Dziri, N., Prabhumoye, S., Yang, Y., Gupta, S., Majumder, B. P., Hermann, K., Welleck, S., Yazdanbakhsh, A. & Clark, P. (2023). *Self-Refine: Iterative Refinement with Self-Feedback*. NeurIPS 2023. [Bağlantı](http://papers.nips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html)
- Kamoi, R., Zhang, Y., Zhang, N., Han, J. & Zhang, R. (2024). *When Can LLMs Actually Correct Their Own Mistakes? A Critical Survey of Self-Correction of LLMs*. Transactions of the Association for Computational Linguistics, 12, s. 1417–1440. [Bağlantı](https://aclanthology.org/2024.tacl-1.78/)
