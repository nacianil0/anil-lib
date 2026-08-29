---
article_id: article_6ad715f2-4c0e-435d-a210-406a82ebb0c5
title: "Değerlendirme 101: Benchmark'lar Ne Ölçer, Ne Ölçemez?"
slug: degerlendirme-101-benchmarklar-ne-olcer-ne-olcemez
category: models-and-training
level: intermediate
reading_order: 16
summary: "5. ve 9. makalenin bıraktığı ölçme borcunu öder: perplexity'nin sınırı, çoktan seçmeli sınavların kırılganlığı, istem biçiminin sıralamayı değiştirmesi, insan tercihine dayalı arenaların çarpıklıkları ve tek sayının neden yetmediği."
tags:
  - degerlendirme
  - benchmark
  - mmlu
  - olcum
  - siralama
content_hash: sha256:239d690a5e8d081b7cf6322b0f758cb3fc8686b73511edf0c854470b10decd58
classification_version: 1
classification_batch: 3
---
## Cetvel arayışı

Şimdiye kadar on beş makale boyunca sürekli "daha iyi" dedik. Ölçek yasaları daha iyi modeller veriyordu, talimatla eğitim daha iyi cevaplar üretiyordu, temiz veri daha iyi sonuç alıyordu. Her seferinde arkada bir cetvel vardı ve o cetvele hiç dikkatle bakmadık.

Bakma zamanı geldi, çünkü 15\. makale cetvellerin ne kadar oynak olabileceğini gösterdi: aynı toplama sorusunun doğruluğu, yalnızca sayının nasıl bölündüğüne bağlı olarak yüzde 75,6 ile 97,8 arasında gidip geliyordu. Model değişmedi, soru değişmedi, ölçüm değişti.

5\. makalede bu tartışmaya bir randevu vermiştik. Orada perplexity'yi kurmuş ve iki uyarı düşmüştük: perplexity **içsel** bir ölçüdür — düşmesi çeviri ya da soru cevaplama gibi dışsal görevlerde iyileşme garanti etmez — ve iki modelin perplexity'si ancak aynı sözlükle, yani aynı tokenizer'la hesaplanmışsa karşılaştırılabilir. 15\. makaleden sonra bu ikinci uyarının ne kadar ciddi olduğunu biliyoruz: tokenizer değişince "bir token" ifadesinin anlamı değişir, dolayısıyla "token başına şaşkınlık" da başka bir şeyi ölçer.

Bunu somutlaştıralım. Perplexity token başına ortalama şaşkınlıktır: modelin gerçekleşen her token'a verdiği olasılıklar üzerinden hesaplanır ve kaç adım üzerinden ortalama alındığı doğrudan tokenizer'a bağlıdır. 15\. makaledeki ölçümde aynı cümle bir tokenizer'da 33, başkasında 60 token tutuyordu. İki model bu iki tokenizer'ı kullanıyorsa, "token başına şaşkınlık" birinde otuz üç adımın, öbüründe altmış adımın ortalamasıdır — ve altmış adıma bölünen bir toplam, otuz üçe bölünene göre kendiliğinden daha küçük görünür. Sayılar aynı ölçekte değildir; birini öbüründen küçük bulmak, modelin daha iyi olduğunu göstermez. Bu yüzden perplexity, aynı tokenizer'ı paylaşan modelleri karşılaştırmak için iyi, farklı tokenizer'lı modelleri karşılaştırmak için kullanılamaz bir cetveldir.

12\. makalede aynı ayrışmanın daha rahatsız edici bir örneğini görmüştük. LIMA çalışmasında doğrulama kaybı yükselirken insan değerlendiricilerin tercih ettiği cevapların kalitesi artmaya devam ediyordu. İçsel cetvel bir yöne, insan yargısı öbür yöne gidiyordu.

Öyleyse soru şu: model bir kez eğitildikten sonra "iyi" olduğunu nasıl gösteririz? Bu makalenin cevabı iki katmanlı. Önce standart yolları kuracağız; sonra her birinin nerede kırıldığını ölçeceğiz. Amaç değerlendirmeyi itibarsızlaştırmak değil — 9\. makaledeki "aynı eğri, iki cetvel" uyarısını bir üst basamağa taşımak: bir sayı gördüğünde neyin ölçüldüğünü sorabilmek.

## Çoktan seçmeli sınav

En yaygın cevap, modele sınav yapmaktır. Alanda bu iş için kullanılan, herkesin aynı koşullarda ölçüm yapabilmesi için sabitlenmiş değerlendirme kümelerine **benchmark** deniyor; terim Türkçeleştirilmeden kullanılır ve bu makalede "değerlendirme kümesi" ile eşanlamlıdır. Bu geleneğin bugünkü simgesi, Dan Hendrycks ve arkadaşlarının ICLR 2021'de tanıttığı MMLU: temel matematikten ABD tarihine, bilgisayar bilimlerinden hukuka kadar 57 konuda çoktan seçmeli sorular. Modele soru ve şıklar verilir, seçtiği şık doğruysa puan alır. Çalışmanın kendi bulgusu döneminin resmini veriyordu: modellerin çoğu rastgele seçim düzeyinde kalıyor, yalnızca en büyük GPT-3 sürümü rastgeleyi ortalamada yaklaşık yirmi puan geçebiliyordu; 57 konunun hiçbirinde uzman düzeyine yaklaşılmamıştı.

Çoktan seçmeli sınavın çekiciliği açık: ucuzdur, otomatiktir, tek bir sayı verir ve modeller arasında doğrudan karşılaştırma yapmaya izin verir. 14\. makalede FineWeb-Edu'nun etkisini tam da böyle ölçmüştük — MMLU'da yüzde 33'ten 37'ye, ARC'de yüzde 46'dan 57'ye. O ölçüm gerçek bir bilgi taşıyordu.

Burada durup küçük ama belirleyici bir ayrıntıyı açalım: modelin "seçtiği şık" tam olarak nasıl okunuyor? Yaygın iki protokol var ve ikisi aynı şeyi ölçmüyor. Birincisinde model bir şık **harfi** üretir ve üretilen harf cevap sayılır — 10\. makaledeki üretim kuralları burada devrededir, yani açgözlü seçim mi örnekleme mi yapıldığı sonucu etkiler. İkincisinde model hiç üretim yapmaz; her şıkkın metnine verdiği olasılık ayrı ayrı hesaplanır ve en yüksek olasılıklı şık cevap sayılır. İkinci yöntemin bir yan etkisi var: uzun şıklar daha çok token içerir, daha çok token daha çok olasılık çarpımı demektir ve düzeltilmezse uzun şıklar sistematik olarak dezavantajlı çıkar. Aynı model, aynı soru, iki protokol, iki farklı puan — üstelik bu tercih, modelleri puanlarına göre yan yana dizen liderlik tablosunda (leaderboard) çoğu zaman hiç yazmaz.

Ama çoktan seçmeli sınavın asıl bedeli başka ve 11\. makaledeki tabloyu hatırlayınca görünür oluyor. Orada gerçek kullanıcıların bir dil modeline ne sorduğunun dağılımını görmüştük: isteklerin yüzde 45,6'sı serbest üretim, yalnızca yüzde 2,6'sı kapalı alan soru-cevaptı. Yani insanların modelden istediği şeylerin ezici çoğunluğunun tek bir doğru şıkkı yok. Çoktan seçmeli sınav, otomatik puanlanabilen dar bir dilimi ölçer ve o dilimi bütünün temsilcisi sayar.

> **Kendini yokla:** MMLU puanı yüksek bir model, kullanıcıların gerçekten sorduğu işlerde neden yine de kötü olabilir?

Çünkü ölçülen şeyle kullanılan şey aynı değil. MMLU dört şıktan doğru olanı seçmeyi ölçer; kullanıcıların istediği ise çoğunlukla metin üretmek, düzenlemek, biçimlendirmek. Sınav, yalnızca cevabın tek ve kısa olduğu görevleri kapsayabilir; kapsamadığı alanda ne söylediği bilinmez. Yüksek puan "bu dilimde iyi" demektir, "her şeyde iyi" demek değil.

## Cetvelin kendisi bozuk olabilir

Sınavın kapsamı dar olabilir; peki kapsadığı yerde doğru mu?

Aryo Pradipta Gema ve on beş arkadaşının NAACL 2025'te sunduğu çalışma bu soruyu MMLU'ya sordu ve cevabı rahatsız edici. Ekip 57 konunun tamamından toplam 5.700 soruyu elle yeniden etiketledi ve bir hata sınıflandırması kurdu: yanlış işaretlenmiş doğru cevap, birden çok doğru şık, hiç doğru şık olmaması, sorunun kendisinin anlaşılamaz olması.

Sonuç iki katmanlı. Kümenin bütününde hatalı soru oranı yaklaşık yüzde 6,5 olarak tahmin ediliyor — tek başına bakıldığında yönetilebilir görünen bir sayı. Ama dağılım hiç düzgün değil: viroloji alt kümesinde incelenen soruların **yüzde 57'si** hatalı çıktı. Düzeltilmiş kümeyle ölçüm tekrarlandığında, modellerin daha önce bildirilen performanslarıyla belirgin farklar ortaya çıktı.

Bunun anlamını abartmadan söyleyelim. Hatalar rastgele dağılmış olsaydı bütün modelleri aynı oranda cezalandırır ve sıralamayı büyük ölçüde korurdu. Sorun, hataların konulara göre yığılması: bir modelin gücü hatalı alt kümede yoğunlaşıyorsa puanı hak ettiğinden düşük ya da yüksek çıkar. Ölçüm aracının kendisi bir hata kaynağıdır ve bu hata, ölçülen şeyle karışır.

## Aynı model, farklı biçim

Diyelim sınav kusursuz. Sorular doğru, cevaplar doğru. Aynı modele aynı soruyu iki kez, yalnızca biçimini değiştirerek sorsak ne olur?

Melanie Sclar ve arkadaşlarının ICLR 2024'te sunduğu çalışma bunu sistematik olarak ölçtü. Değiştirdikleri şey içerik değildi: iki nokta üst üste yerine tire kullanmak, boşluk eklemek, şıkları farklı işaretlemek gibi anlamı hiç etkilemeyen biçim ayrıntıları. Bir modelde — 13 milyar parametreli bir açık ağırlıklı model — aynı görevde biçim değiştirmenin yarattığı doğruluk aralığı **76 puana** kadar çıktı. Üstelik bu duyarlılık modeli büyütünce, örnek sayısını artırınca ya da talimatla eğitince kaybolmuyor.

Bu tek bir modelin tuhaflığı olsa önemsenmeyebilirdi. Norah Alzahrani ve arkadaşlarının ACL 2024'te yayımladığı çalışma etkinin sıralamalara nasıl yansıdığını gösterdi: şıkların sırasını değiştirmek ya da cevabı okuma yöntemini değiştirmek gibi küçük protokol farkları, liderlik tablosundaki sıralamayı **sekiz basamağa kadar** oynatabiliyor.

![Aynı model kümesi iki kez sıralanır: solda bir istem biçimiyle elde edilen sıralama, sağda yalnızca biçim ayrıntısı değiştirilerek elde edilen sıralama; aynı modeli gösteren çizgiler kesişerek basamak değişimini görünür kılar.](assets/ayni-model-farkli-siralama.svg "Şekil 1 — Sıralamayı değiştiren şey modeller değil")

Şekil 1'in söylediği şey basit ama sonuçları ağır: bir liderlik tablosunda gördüğün sıra, modellerin yeteneklerinin yanı sıra ölçümü yapan ekibin biçim tercihlerini de taşır. İki farklı ekip aynı modelleri aynı sınavla ölçüp farklı sıralamalar yayımlayabilir ve ikisi de teknik olarak doğru olabilir.

## Hata payı olmayan sayı

Buraya kadarki bütün sorunların altında ortak bir alışkanlık yatıyor: değerlendirme sonuçları tek bir sayı olarak, belirsizlik aralığı olmadan yayımlanıyor. "A modeli yüzde 71,2, B modeli yüzde 70,8" cümlesi bir sıralama gibi okunuyor.

Oysa bir değerlendirme, özünde bir deneydir. Sorular, sorulabilecek bütün soruların oluşturduğu görünmeyen bir havuzdan çekilmiş bir örneklemdir; başka bir çekilişte başka sorular gelirdi. Evan Miller'ın 2024 tarihli çalışması bu çerçeveyi açıkça kuruyor ve deneysel istatistiğin standart araçlarının — güven aralıkları, iki modeli karşılaştıran testler, deney öncesi örneklem büyüklüğü planlaması — değerlendirmelere nasıl uygulanacağını gösteriyor. Çalışmanın işaret ettiği alışkanlık, alanın "en yüksek sayı kazanır" zihniyetiyle çalışması ve istatistiksel anlamlılığı sınamaması. Bu çalışmanın hakem sürecinden geçmemiş bir teknik rapor olduğunu belirtelim; ama önerdiği araçlar deneysel istatistiğin standart araçlarıdır.

Sayıyla görelim. Beş yüz soruluk bir değerlendirme kümesinde her soru toplam puanın 1 ÷ 500 = 0,002'sini, yani yüzde 0,2'sini taşır. Yüzde 71,2 ile yüzde 70,8 arasındaki 0,4 puanlık fark, bu kümede tam olarak **iki soru** demektir. İki soru, farklı bir soru çekilişinde kolayca ters yöne dönebilecek bir farktır — ama tabloda "A modeli önde" diye görünür ve öyle aktarılır.

Buradan çıkan kural sade: bir farkın anlamlı sayılabilmesi için kümenin büyüklüğüne göre değerlendirilmesi gerekir. Küçük kümelerde büyük farklar bile gürültü olabilir; büyük kümelerde küçük farklar anlamlı olabilir. Ölçümün disiplinini — hangi farkın anlamlı sayılabileceğini, kaç örneğin gerektiğini, güven aralığının nasıl kurulacağını — 101\. makalede biçimsel olarak kuracağız.

## İnsana sormak

Otomatik sınavların sınırı belliyse, doğrudan insana sormak akla gelen ilk çıkış yolu.

Chatbot Arena bunu ölçekte yapan platform oldu: kullanıcı bir soru yazar, iki isimsiz model cevap verir, kullanıcı hangisinin daha iyi olduğunu seçer. Wei-Lin Chiang ve arkadaşlarının ICML 2024'te yayımladığı çalışma, yüz binlerce oyla kurulan bu düzeni tarif ediyor. Puanların nasıl hesaplandığı ise bize tanıdık: eşleştirmeli karşılaştırmaları tek bir sıralamaya çeviren **Bradley-Terry modeli** — 13\. makalede ödül modelini kurarken elle hesapladığımız aynı olasılık modeli. Orada modelin hangi cevabı tercih edeceğini öğreniyorduk; burada insanların hangi modeli tercih ettiğini ölçüyoruz. Aynı matematik, iki farklı iş.

Bu yaklaşımın gerçek bir üstünlüğü var: 11\. makaledeki kullanım dağılımına çoktan seçmeli sınavlardan çok daha yakın. Sorular gerçek kullanıcılardan geliyor ve puanlanan şey serbest üretim — yani modelin fiilen yaptığı iş. Sabit bir cevap anahtarı gerekmediği için 13\. makalede tanımladığımız o zor alan, "iki cevaptan hangisi daha iyi" sorusunun cevabı doğrudan insandan alınıyor.

Bir sınır da hemen not edilmeli: insan tercihi de bir ölçüdür ve neyi ödüllendirdiği ayrıca sorulmalıdır. 13\. makalede ödül modelinin insan memnuniyetini ölçtüğünü, doğruluğu değil, söylemiştik; aynı uyarı arena puanları için de geçerli. Değerlendirmeyi insanlar yerine modellere yaptırmanın — bugün yaygınlaşan bir pratik — ne kadar güvenilir olduğu ise ileride ayrı bir makalenin konusu.

Ama arena da bir ölçüm aracıdır ve aracın kendi çarpıklıkları vardır. Shivalika Singh ve arkadaşlarının NeurIPS 2025 Datasets and Benchmarks izleğinde yayımlanan çalışması bunları saydı. En keskin bulgu, yayımlama seçiciliğiyle ilgili: bazı sağlayıcılar aynı modelin birçok özel sürümünü arenada gizlice deneyip yalnızca en iyi sonucu alanı kamuya açabiliyor. Uç bir örnekte bir sağlayıcı, bir modeli tabloda ikinci sıraya yerleştirmeden önce 27 özel sürümü denemişti. Yayımlanan puan artık rastgele bir örneklem değil, birçok denemenin **maksimumu**dur ve maksimum, ortalamadan sistematik olarak yüksektir.

![Bir sağlayıcı çok sayıda özel sürümü arenada dener; sonuçlar dağılmış noktalar olarak gösterilir, yalnızca en yüksek olan kamuya açılır ve tabloya bu değer yazılır; öbür noktalar soluk bırakılır.](assets/secici-yayimlama.svg "Şekil 2 — Yayımlanan puan bir maksimumdur")

Şekil 2'deki mekanizma, sıralamanın ötesinde bir sorun daha yaratıyor. Aynı çalışma, arenada toplanan verinin de eşitsiz dağıldığını ölçüyor: iki büyük sağlayıcı tek başına verinin tahminî yüzde 19,2'sini ve yüzde 20,4'ünü alırken, 83 açık ağırlıklı model toplamda yüzde 29,7'sini alıyor. Bu veri işe yarıyor: sınırlı miktarda ek arena verisi bile, arena dağılımından türetilmiş bir test kümesinde göreli olarak yüzde 112'ye varan kazanç sağlayabiliyor. Sonuç, modellerin genel kalitesine değil arenanın kendi dinamiklerine aşırı uyum sağlaması.

## Tek sayı yetmez

Buraya kadarki bütün eleştirilerin ortak zemini, "iyi model" iddiasının tek bir skalaya sıkıştırılması.

Percy Liang, Rishi Bommasani ve büyük bir ekibin 2023'te TMLR'de yayımladığı HELM çalışması buna yapısal bir cevap önerdi: değerlendirmeyi tek bir doğruluk sayısı olmaktan çıkarıp bir matrise dönüştürmek. Çalışma 16 çekirdek senaryonun her birini yedi ölçüyle birlikte raporluyor: doğruluk, kalibrasyon (calibration) — yani modelin kendi güveninin gerçek doğrulukla ne kadar örtüştüğü — dayanıklılık, adillik, taraflılık, zararlılık ve verimlilik. Amaç bir modeli tek sayıyla taçlandırmak değil, ödünleşimleri görünür kılmak: bir model doğrulukta önde olup dayanıklılıkta geride olabilir ve bu, tek sütunlu bir tabloda hiç görünmez.

![Solda liderlik tablosunun gösterdiği tek kutu (doğruluk), sağda aynı model için raporlanan yedi ölçünün listesi; yalnızca doğruluk vurgulanır, kalan altı ölçü soluk bırakılarak tabloya girmedikleri işaretlenir.](assets/tek-sayi-yetmez.svg "Şekil 3 — Tabloya giren ölçü, girmeyen altısı")

Şekil 3'ün sol tarafı bugün liderlik tablolarında gördüğümüz şey, sağ tarafı ise aynı modelin daha dürüst resmi. Aradaki fark bir teknik ayrıntı değil: hangi sütunu yayımladığın, alanın neyi iyileştirmeye çalışacağını belirler.

> **Kendini yokla:** Bir değerlendirme kümesi yaygınlaştıkça neden güvenilirliğini yitirmeye başlar?

Çünkü ölçü hedefe dönüşür. 13\. makalede aşırı optimizasyonu kurarken bu yasayı görmüştük: bir vekil ölçü fazla kovalanınca gerçek ölçütle bağı kopar. Yaygın bir değerlendirme kümesi, model geliştiren herkesin iyileştirmeye çalıştığı somut bir hedef hâline gelir — veri karışımı ona göre ayarlanır, ince ayar örnekleri ona benzetilir. Puan yükselir; yükselen şeyin ne kadarının gerçek yetenek, ne kadarının o kümeye uyum olduğu ise ölçülmemiş kalır.

Bunun pratikteki sonucu, değerlendirme kümelerinin bir ömrü olmasıdır. Bir küme yayımlanır, birkaç yıl ayırt edici çalışır, sonra puanlar tavana dayanır ve ayırt etme gücünü yitirir; alan yeni bir küme kurar ve döngü baştan başlar. Bu, alanın işleyişinde bir arıza değil kaçınılmaz bir sonuçtur — ama bir kümenin bugün hangi aşamada olduğunu bilmeden puanını okumak yanıltıcıdır.

Buna bir de 14\. makalede tanıştığımız kirlilik ekleniyor. Değerlendirme sorularının eğitim derlemine sızması, sınavı ezberlenmiş bir sınava çevirir. Orada bunun bir veri sorunu olduğunu söylemiş, değerlendirmeye etkisini sonraya bırakmıştık; kirliliğin nasıl ölçüldüğü ve ne kadar yaygın olduğu 72\. makalenin konusu.

Bütün bunlardan çıkan sonuç karamsarlık değil, disiplin. Bir değerlendirme sonucu okurken sorulacak sorular şunlar: hangi görev dilimi ölçüldü, hangi istem biçimi kullanıldı, kaç örnek vardı ve fark gürültüden ayırt edilebilir mi, ölçüm yapan tarafın seçicilik imkânı var mıydı, bu küme eğitim verisine sızmış olabilir mi. Bu soruların hiçbiri cevabı "sayıya güvenme" değil; hepsi "sayının neyi ölçtüğünü bil" diyor.

### Sırada ne var

Bu makale boyunca değerlendirmenin nasıl puanlandığına baktık ve bir ayrıntıyı geçerken not ettik: neredeyse bütün sınavlar ikili puanlar — doğru bir puan, yanlış sıfır. "Bilmiyorum" cevabının karşılığı da sıfırdır. Böyle bir sistemde tahmin etmek, susmaktan her zaman kârlıdır. Şimdi bunu 10\. makaledeki gerçekle yan yana koy: model her adımda bir olasılık dağılımından çekiliş yapar ve akıcı bir cevap üretmesi, o cevabın doğru olması için bir sebep taşımaz. Bir sonraki makalede modelin neden ve ne zaman uydurduğunu ciddiyetle ele alacağız — ve uydurmanın kökünün yalnızca modelde değil, onu ölçme biçimimizde de olduğunu göreceğiz.

## Kaynakça

- Hendrycks, D., Burns, C., Basart, S., Zou, A., Mazeika, M., Song, D. & Steinhardt, J. (2021). *Measuring Massive Multitask Language Understanding*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2009.03300)
- Gema, A. P., Leang, J. O. J., Hong, G. ve ark. (2025). *Are We Done with MMLU?*. NAACL 2025, s. 5069–5096. [Bağlantı](https://aclanthology.org/2025.naacl-long.262/)
- Sclar, M., Choi, Y., Tsvetkov, Y. & Suhr, A. (2024). *Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=RIu5lyNXjT)
- Alzahrani, N., Alyahya, H., Alnumay, Y. ve ark. (2024). *When Benchmarks are Targets: Revealing the Sensitivity of Large Language Model Leaderboards*. ACL 2024. [Bağlantı](https://aclanthology.org/2024.acl-long.744/)
- Miller, E. (2024). *Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations*. Anthropic teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2411.00640)
- Chiang, W.-L., Zheng, L., Sheng, Y. ve ark. (2024). *Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/chiang24b.html)
- Singh, S., Nan, Y., Wang, A. ve ark. (2025). *The Leaderboard Illusion*. NeurIPS 2025, Datasets and Benchmarks Track. [Bağlantı](https://papers.neurips.cc/paper_files/paper/2025/hash/70a93f260a51123b3c0e33ecd1b4de97-Abstract-Datasets_and_Benchmarks_Track.html)
- Liang, P., Bommasani, R., Lee, T. ve ark. (2023). *Holistic Evaluation of Language Models*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2211.09110)
