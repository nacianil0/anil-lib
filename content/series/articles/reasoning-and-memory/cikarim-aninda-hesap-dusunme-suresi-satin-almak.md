---
article_id: article_4a385bc9-4619-4aef-a664-7b1d9c1957f2
title: "Çıkarım Anında Hesap: Düşünme Süresi Satın Almak"
slug: cikarim-aninda-hesap-dusunme-suresi-satin-almak
category: reasoning-and-memory
level: intermediate
reading_order: 33
summary: "9. makalenin çıkarım anında hesap harcama vaadini öder: paralel ve sıralı olmak üzere iki harcama eksenini, kaç denemede çözüldüğünü ölçen kapsama eğrisinin neden güç yasasına benzediğini, çoğunluk oyunun matematiksel doygunluğunu, soru zorluğuna göre değişen en iyi tahsisi ve aynı FLOP bütçesini eğitime mi çıkarıma mı harcamak gerektiğini kurar."
tags:
  - cikarim-aninda-hesap
  - kapsama
  - cogunluk-oyu
  - hesap-tahsisi
  - maliyet
content_hash: sha256:20d772349bb8a238bb4d0d0e0a390d5f2678c410eec4dc8c6d64d5c64f3aa24e
classification_version: 1
classification_batch: 7
---
## Uzayan üretim bir maliyet kararıdır

32\. makalede ara adımların neden işe yaradığını iki bağımsız açıklamayla kurduk: sabit derinlikli bir model, üretilen her token'la hesabını zaman eksenine yayıyor; ve eğitim verisinin yerel yapısı kısa sıçramalar zincirini uzun bir sıçramadan isabetli kılıyor.

İki açıklamanın da ortak bir sonucu var. İyi cevap istiyorsan model daha çok token üretmeli. Ve 26\. ile 28\. makalelerde bu token'ların faturasını zaten çıkarmıştık: istemin tamamı tek geçişte, paralel olarak işlenir; cevap ise token token, her adımda bütün ağırlıklar bellekten çekilerek üretilir. Yani düşünme, faturanın **pahalı** tarafında yazılıyor.

9\. makalede ölçek yasalarını kurarken bir randevu bırakmıştık: hesabı eğitime harcamak tek seçenek değil, aynı hesabı çıkarım anında da harcayabilirsin. Bu makale o randevuyu ödüyor. Sorular şunlar: çıkarım anında hesap harcamanın kaç yolu var, her yol ne kadar kazandırıyor, kazanç nerede doyuyor ve aynı parayı modeli büyütmeye harcamak daha mı iyi olurdu?

## İki eksen: paralel ve sıralı

Çıkarım anında fazladan hesap harcamanın bütün yolları iki eksene sığıyor.

**Paralel eksen.** Aynı isteme birbirinden bağımsız birden çok cevap ürettirirsin. 10\. makaledeki cümle burada çalışıyor: üretim bir çekiliştir, dolayısıyla aynı istem farklı cevaplar verir. Sonra bu adaylardan birini seçersin.

**Sıralı eksen.** Tek bir cevap üretir, sonra modele kendi cevabını gösterip düzeltmesini istersin; bu döngü tekrarlanır. Her adımın girdisinde bir öncekinin çıktısı vardır. Bu, 32\. makaledeki "hesabı zaman eksenine yayma" fikrinin bir çağrının ötesine taşınmış hâli: orada zincir tek bir cevabın içinde uzuyordu, burada birbirini gören ayrı çağrılara bölünüyor.

Charlie Snell ve arkadaşlarının ICLR 2025'te sunduğu çalışma ikisini tek çerçevede topluyor: her yöntem ya modelin cevap **önerme dağılımını** değiştirir (isteme yeni token'lar ekleyerek), ya da üretilmiş adaylar üzerinde bir **seçici** çalıştırır. Düzeltme birincinin, aday üretip seçme ikincinin örneği.

![İki kollu bir şema. Solda paralel eksen gösterilir: tek bir istem kutusundan aşağıya doğru birbirinden bağımsız dört cevap kutusu ayrılır ve altlarında bir seçim kutusu bulunur. Sağda sıralı eksen gösterilir: tek bir istem kutusundan tek bir cevap çıkar, o cevap bir düzeltme adımına girer, düzeltmenin çıktısı bir sonraki düzeltme adımına girer ve zincir sağa doğru uzar. Şeklin altında paralel eksende adayların birbirini görmediği ve istemin bir kez ödenip adayların aynı yığında üretildiği, sıralı eksende ise her adımın bir öncekini gördüğü ve gecikmenin adım sayısıyla doğrusal büyüdüğü yazılıdır.](assets/paralel-ve-sirali.svg "Şekil 1 — Aynı bütçeyi harcamanın iki yolu")

Şekil 1'deki ayrım yalnızca kavramsal değil, maliyet yapısı da farklı. Paralel adaylar aynı istemi paylaşır; 26\. makaledeki önek paylaşımı sayesinde ön dolum bir kez ödenir ve 28\. makaledeki yığınlama sayesinde adaylar aynı anda üretilebilir. Sıralı düzeltmeler ise birbirini beklemek zorundadır: her adım bir öncekinin bitmesini ister, dolayısıyla gecikme adım sayısıyla doğrusal büyür.

## Kaç kez denersen bulursun

Paralel eksenin en sade ölçüsü şu: `k` deneme yapıldığında, en az bir denemede doğru cevaba varılan soruların oranı. Bu ölçünün adı **kapsama** (coverage) ve gösterimi `pass@k`.

Kapsama, `k` büyüdükçe şaşırtıcı biçimde iyi ölçekleniyor. Dört büyüklük mertebesi boyunca, yani bir denemeden on bin denemeye kadar, artmaya devam ediyor ve toplu eğri bir güç yasasına benziyor. 9\. makalede eğitim tarafında gördüğümüz log-log doğrusunun çıkarım tarafındaki karşılığı gibi duruyor.

Rylan Schaeffer ve arkadaşlarının ICML 2025'te sunduğu çalışma bu benzerliğin yanıltıcı olduğunu gösteriyor. Tek bir soru için hesap basit: modelin o soruyu tek denemede çözme olasılığı `p` ise, `k` denemede hiç çözememe olasılığı `(1 − p)` üzeri `k`'dir. Yani **her soru için** başarısızlık üstel olarak düşer, güç yasasıyla değil. Çalışma bunu ölçüyor da: tek tek sorulara bakıldığında eğriler gerçekten üstel.

Sayılarla görelim. Modelin bir soruyu tek denemede çözme olasılığı 0,1 olsun. On denemede hiç çözememe olasılığı 0,9 üzeri 10, yani yaklaşık 0,349; demek ki kapsama 0,651. Yüz denemede başarısızlık 0,9 üzeri 100 oluyor; bu yaklaşık yüz binde üç, yani soru pratikte çözülmüş sayılır. Şimdi çok daha zor bir soru alalım: tek deneme olasılığı 0,001. Yüz denemede kapsama yalnızca 0,095, bin denemede 0,632. Yüzden bine çıkan aynı on katlık bütçe artışı birinci soruda hiçbir işe yaramaz, çünkü soru zaten çözülmüştür; ikinci soruda ise kapsamayı 0,095'ten 0,632'ye taşır.

O hâlde toplu eğri neden güç yasası gibi görünüyor? Çünkü toplu eğri, soruların tek denemede çözülme olasılıklarının **dağılımı** üzerinden bir ortalama. O dağılımın sol tarafında çok küçük olasılıklı bir kuyruk varsa — yani modelin binde bir, on binde bir çözebildiği bir avuç soru — bu sorular ortalamayı uzun süre aşağıda tutar ve üstel eğrilerin toplamı bir güç yasasına benzer.

Bunun pratik sonucu önemli: kapsama eğrisinin uzun süre yükselmeye devam etmesi, "denemeye devam edersen her soruyu çözersin" demek değil. Eğrinin şeklini belirleyen şey, modelin neredeyse hiç çözemediği sorulardır.

> **Kendini yokla:** Kapsama on bin denemede yüzde 90'a ulaşıyorsa, bu modelin o kümede yüzde 90 doğrulukla çalıştığı anlamına gelir mi?

Gelmez. Kapsama, doğru cevabın adaylar arasında **bulunduğunu** söyler; hangisinin doğru olduğunu söylemez. On bin adaydan doğru olanı seçmek ayrı bir problemdir ve bu makalenin geri kalanı büyük ölçüde o problemle ilgili. Ayrım pratikte de görünür: kodda ve biçimsel ispatta doğruluk makineyle sınanabildiği için kapsamadaki artış doğrudan başarıya çevrilir, oysa serbest metinde bunu yapacak bir sınayıcı yoktur ve kapsama kâğıt üstünde kalır.

## Seçim sorunu ve doygunluk

Adaylar arasından seçim yapmanın iki yaygın yolu var. **Çoğunluk oyu** (majority voting): adayların verdiği cevaplar sayılır, en çok tekrarlanan seçilir. **En iyi-N seçimi** (best-of-N): ayrı bir model her adaya bir puan verir ve en yüksek puanlı seçilir. Puan veren modele **doğrulayıcı** (verifier) deniyor; nasıl eğitildiğini ve nerede yanıldığını 35\. makalede ayrıca kuracağız.

Yangzhen Wu ve arkadaşlarının ICLR 2025'te sunduğu çalışma bu iki yolun matematiksel sınırını veriyor. Sonuç sade ve kesin: örnek sayısı sonsuza giderken çoğunluk oyunun doğruluğu bir limite yakınsıyor ve o limit yalnızca modelin dağılımına bağlı. Yani sonsuz örnek, modelin en olası cevabını bulmaktan başka bir şey yapmıyor. Ağırlıklı oylamada limit modelin ve doğrulayıcının dağılımına birlikte bağlı, ama yine bir limit var.

Deney bunu doğruluyor. Aynı aileden 410 milyon ile 12 milyar parametre arasında beş model, ilkokul matematiği kümesinde artan bütçelerle ölçülüyor: hata oranı önce düzenli olarak düşüyor, sonra doyuyor.

![Yatay ekseni soru başına çıkarım işlem sayısı, dikey ekseni hata oranı olan bir eğri şeması. Beş ayrı model boyu için beş eğri çizilmiştir. Küçük modellerin eğrileri solda daha düşük başlar ve erken doyar; büyük modellerin eğrileri sağda daha aşağıya iner. Eğrilerin kesiştiği bölgelere birer işaret konmuş ve her işaret o bütçedeki en iyi model boyunu gösterir. Şeklin altında küçük modellerin düşük bütçede, büyük modellerin yüksek bütçede tercih edildiği ve her eğrinin bir doyma noktası olduğu yazılıdır.](assets/doyan-egriler.svg "Şekil 2 — Her eğrinin bir tabanı var")

Şekil 2'deki kesişmeler asıl bulguyu taşıyor: verilen bir çıkarım bütçesinde **en iyi model boyu değişiyor**. Düşük bütçede küçük modelden çok kez örneklemek daha iyi; küçük modelin eğrisi doyduktan sonra ise büyük model öne geçiyor. Çalışma bu ilişkiyi bir regresyonla da veriyor: bütçe ile en iyi model boyu arasında log-log ölçekte doğrusal bir bağıntı var.

Aynı çalışmanın ikinci bulgusu daha doğrudan. Matematiğe özelleşmiş bir model ailesinde, 7 milyar parametreli sürüm, 34 milyar parametreli sürümle karşılaştırılabilir doğruluğa kabaca **iki kat az** toplam işlemle ulaşıyor. Bu, hem örnekleme hem ağaç aramalı düzenlerde ve iki ayrı matematik kümesinde geçerli.

Aynı çalışma adayları nasıl ürettiğinin de önemli olduğunu gösteriyor. Bağımsız örnekleme yerine, cevabı adım adım büyüten bir ağaç kurup her adımda hangi dalın kaç kez genişletileceğine puanlara göre karar vermek, aynı bütçede daha düşük hata veriyor ve bütün ölçülen bütçelerde en iyi seçenek çıkıyor. Buna karşılık ağaç aramasının klasik ve daha pahalı bir biçimi, maliyet-doğruluk dengesi kötü olduğu için bazı karşılaştırmalardan tamamen çıkarılıyor. Buradan çıkan ders şu: "daha fazla hesap" tek bir düğme değil; hesabın nasıl dağıtıldığı, ne kadar harcandığı kadar belirleyici.

## Bütçeyi paralel ile sıralı arasında bölmek

Snell ve arkadaşlarının çalışması aynı soruyu bir adım öteye taşıyor: sabit bir token bütçesi verildiğinde, kaç adayı paralel üretmeli ve her adayı kaç kez düzeltmeli?

Cevap tek bir orana değil, sorunun zorluğuna bağlı. Kolay sorularda bütçenin tamamını sıralı düzeltmeye vermek en iyi sonucu veriyor: model doğru yolu zaten buluyor, tek eksik olan hatanın giderilmesi. Zor sorularda ise tamamen sıralı düzen kötü çalışıyor, çünkü model yanlış bir yaklaşımı düzelte düzelte aynı yanlışın etrafında dönüyor; orada paralel çeşitlilik gerekiyor. En iyi sonuç ikisinin bir karışımında.

Bu gözlem "hesap-optimal" bir tahsis fikrini doğuruyor: soru zorluğu kestirilip bütçe ona göre bölünüyor. Ölçülen kazanç, sabit bir en iyi-N düzenine göre aynı doğruluğa **dört kat az** hesapla ulaşmak — örneğin 256 örnek yerine 64 örnekle.

Burada bir uyarı gerekli, çünkü 16\. makalenin disiplini bunu istiyor. "Soru zorluğu" ölçümde iki biçimde kullanılıyor: gerçek zorluk bilindiği varsayımıyla ve zorluk modelin kendisi tarafından kestirilerek. İkincisi gerçekçi olan ve kazanç orada da duruyor, ama kestirim bedava değil: zorluğu tahmin etmek de çıkarım demek.

## Eğitim hesabıyla çıkarım hesabını takas etmek

Şimdi asıl soru. Aynı FLOP bütçesini eğitime mi çıkarıma mı harcamalı?

Muhasebe 8\. ve 26\. makalelerden geliyor. Ön eğitim maliyeti 6ND, yani parametre sayısı çarpı token sayısı çarpı altı. Çıkarımda token başına maliyet 2N idi; bir doğrulayıcı da çalıştırılıyorsa bu 4N oluyor. Modeli M kat büyütürsen iki maliyet de M kat artar. Küçük modele aynı FLOP'u çıkarımda harcamak istiyorsan, çarpanın büyüklüğü eğitim token sayısının çıkarım token sayısına oranına bağlı.

Bu oran kritik ve dağıtım ortamına göre çok değişiyor. Bir kez eğitilip milyonlarca kez çağrılan bir modelde çıkarım token'ları eğitim token'larını geçebilir; kendi kendini iyileştiren bir eğitim hattında ise çıkarım token'ları çok daha az olur. Çalışma üç senaryo ölçüyor: çıkarımın eğitime oranı 0,08 · 0,40 · 11.

Oranın neden bu kadar belirleyici olduğunu bir hesapla görelim. Büyütme çarpanı 14 olsun. Çıkarımın eğitime oranı 0,08 iken, küçük modelin çıkarım hesabı yaklaşık **258 katına** çıkarılabiliyor: büyük modelin harcadığı ek eğitim FLOP'u, küçük modelin çıkarımında devasa bir bütçeye dönüşüyor. Aynı çarpanla ama oran 11 iken bu sayı yaklaşık **16 kata** iniyor, çünkü modeli büyütmek zaten milyarlarca çıkarım çağrısının hepsini pahalılaştırdığından karşılaştırma noktası çok daha erken geliyor. Aynı model, aynı soru ve aynı yöntemle, yalnızca dağıtım ortamı değiştiği için karar tersine dönebiliyor.

![Tek bir bütçe kutusundan iki kola ayrılan bir şema. Üstte aynı FLOP bütçesini gösteren bir kutu vardır. Sol kol ön eğitime harcamayı gösterir ve altında maliyetin altı çarpı parametre çarpı token biçiminde yazıldığı, modelin on dört kat büyütüldüğü belirtilir. Sağ kol çıkarıma harcamayı gösterir ve altında token başına maliyetin doğrulayıcıyla birlikte dört çarpı parametre olduğu, küçük modele daha çok deneme yaptırıldığı yazılıdır. Altta üç satırlık bir karşılaştırma bulunur: kolay ve orta sorularda çıkarıma harcamanın, en zor sorularda ve çıkarım yükünün yüksek olduğu ortamlarda ön eğitime harcamanın kazandığı belirtilir.](assets/hesap-takasi.svg "Şekil 3 — Aynı FLOP, iki farklı yer")

Şekil 3'ün alt satırları karşılaştırmanın sonucunu taşıyor. Çalışma bunu, on dört kat büyük bir modelin fazladan çıkarım hesabı olmadan aldığı puanı, küçük modelin aynı FLOP'la çizdiği eğriyle karşılaştırarak ölçüyor.

Sonuç iki yönlü ve bu yüzden dürüst. Kolay ve orta zorluktaki sorularda, ya da çıkarım yükünün düşük olduğu ortamlarda, çıkarım anında hesap harcamak modeli büyütmeye tercih edilebilir. En zor sorularda ya da çıkarım yükünün yüksek olduğu ortamlarda ise ön eğitim kazanıyor. Yani iki hesap birebir takas edilebilir değil; hangisinin daha iyi olduğu soruya ve dağıtım biçimine bağlı.

> **Kendini yokla:** En zor sorularda çıkarım hesabının kaybetmesi, kapsama bölümünde kurduğumuz hangi gözlemin doğal sonucu?

Modelin tek denemede çözme olasılığı çok küçük olan sorular, kapsamayı ancak katlanarak artan deneme sayısıyla yükseltiyordu. Yani zorluk arttıkça, aynı doğruluk kazancı için ödenen çıkarım hesabı hızla büyür. Ön eğitim ise o olasılığın kendisini değiştirir — dolayısıyla dağılımın en soğuk kuyruğunda tek etkili müdahale odur.

## Faturayı kim öder

Bu eksenin mühendislik tarafı 26\. ve 28\. makalelerin doğrudan devamı, ve pratikte en çok gözden kaçan yer burası.

Düşünme token'ları çıktı token'larıdır. Yani ön dolumun paralel ve ucuz tarafında değil, adım adım üretimin bellek bant genişliğiyle sınırlı tarafında üretilirler. 26\. makalede token başına yaklaşık 2N işlem hesabını yapmıştık; düşünme süresi satın almak, o hesabı istediğin token sayısıyla çarpmak demek. Doğrulayıcı da çalıştırılıyorsa çarpan ikiye katlanıyor.

Küçük bir hesap yapalım. 7 milyar parametreli bir model, tek bir soru için 1.000 düşünme token'ı üretsin. Token başına yaklaşık 2N işlemden, bu sorunun çıkarım maliyeti 2 × 7×10⁹ × 1.000 = 1,4×10¹³ işlem eder. Her adaya bir doğrulayıcı da çalıştırılırsa 2,8×10¹³. Şimdi bunu on altı paralel adayla çarpalım: tek bir soru için yaklaşık 4,5×10¹⁴ işlem. Karşılaştırma için 20\. makaledeki sayıyı hatırlayalım: GPT-3'ün bütün ön eğitimi 3,14×10²³ işlemdi. Yani bu düzendeki yaklaşık yedi yüz milyon soru, bir ön eğitim koşusu kadar hesap harcar. Çıkarım hesabının eğitim hesabıyla yarışabilmesinin sebebi tam olarak budur: eğitim bir kez ödenir, çıkarım her soruda.

Paralel adaylar bu tabloda avantajlı. Aynı istemi paylaştıkları için ön dolum bir kez ödenir ve önbelleğin istem kısmı yeniden kullanılır; ayrıca aynı yığında üretilebildikleri için kartın iş hacmi verimli kullanılır. Sıralı düzeltmelerde ise her adım bir öncekini beklediğinden yalnızca toplam token sayısı değil, **gecikme** de artar. 28\. makaledeki iki ölçüyü hatırlarsak: paralel eksen çıktı token'ı başına süreyi bozmadan iş hacmini kullanır, sıralı eksen ise doğrudan kullanıcının beklediği süreye yazılır.

Son olarak bir ekonomi notu. Kapsama eğrisinin uzun süre yükselmesi cazip görünüyor ama ödenen bedel doğrusal: iki kat kapsama için değil, sabit bir kapsama artışı için katlanarak artan örnek gerekiyor. Doygunluk teoremi bunun matematiksel sınırını veriyordu; fatura ise pratik sınırını veriyor.

## Çıkarım hesabının disiplini

**Kapsama ile doğruluk aynı şey değildir.** Doğru cevabın adaylar arasında olması, onu seçebildiğin anlamına gelmez.

**Örneklemenin bir tavanı vardır.** Çoğunluk oyu sonsuz örnekte bir limite yakınsar ve o limit modelin dağılımıyla belirlenir. Daha fazla örnek yeni yetenek üretmez.

**En iyi model boyu bütçeye bağlıdır.** Düşük çıkarım bütçesinde küçük modelden çok örneklemek, yüksek bütçede büyük model kullanmak daha iyi olabilir.

**Paralel ile sıralı tahsis soru zorluğuna bağlıdır.** Kolay soruda düzeltme, zor soruda çeşitlilik kazandırıyor.

**Çıkarım hesabı ön eğitimin birebir yerine geçmez.** En zor sorularda ve yüksek çıkarım yükünde eğitime harcamak hâlâ daha iyi.

**Fatura çıktı tarafında yazılır.** Düşünme token'ları en pahalı token'lardır; doğrulayıcı çalıştırmak maliyeti ikiye katlar.

**Adayları nasıl ürettiğin, kaç tane ürettiğin kadar önemli.** Puanlara göre yönlendirilen bir arama, aynı bütçede bağımsız örneklemeden daha iyi sonuç veriyor; pahalı arama biçimleri ise maliyeti doğruluktan hızlı büyütüyor.

**Kararın ölçüsü tek bir puan değil, puan-maliyet eğrisidir.** İki yöntemi tek bir bütçede karşılaştırmak yanıltıcı; eğrilerin nerede kesiştiği asıl bilgidir.

### Sırada ne var

Bu makalede düşünme süresini **dışarıdan** satın aldık: model hazırdı, biz ona daha fazla deneme ve daha fazla düzeltme yaptırdık. Ama bir sınıra çarptık — örneklemenin limiti modelin kendi dağılımıyla belirleniyor.

O hâlde akla şu geliyor: modelin dağılımını, uzun ve dikkatli cevapları baştan daha olası kılacak biçimde değiştirebilir miyiz? Bunun için bir eğitim sinyali gerekiyor ve 13\. makalede gördüğümüz insan tercihi burada işe yaramıyor; matematik ve kodda cevabın doğruluğu makineyle denetlenebiliyor. Sonraki makale bu sinyalle eğitilen modelleri ve ölçülen sınırlarını ele alıyor. Birden çok yolu deneyip aralarında oy vermenin ayrıntısı ise 36\. makalenin konusu.

## Kaynakça

- Snell, C., Lee, J., Xu, K. & Kumar, A. (2025). *Scaling LLM Test-Time Compute Optimally Can be More Effective than Scaling Parameters for Reasoning*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/1b623663fd9b874366f3ce019fdfdd44-Abstract-Conference.html)
- Wu, Y., Sun, Z., Li, S., Welleck, S. & Yang, Y. (2025). *Inference Scaling Laws: An Empirical Analysis of Compute-Optimal Inference for LLM Problem-Solving*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/8c3caae2f725c8e2a55ecd600563d172-Abstract-Conference.html)
- Schaeffer, R., Kazdan, J., Hughes, J., Juravsky, J., Price, S., Lynch, A., Jones, E., Kirk, R., Mirhoseini, A. & Koyejo, S. (2025). *How Do Large Language Monkeys Get Their Power (Laws)?*. ICML 2025, PMLR 267. [Bağlantı](https://proceedings.mlr.press/v267/schaeffer25a.html)
