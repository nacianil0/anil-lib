---
article_id: article_7c3c04c1-dc47-48e7-b31d-b37a94e6916b
title: "Fine-Tuning ve LoRA: Modeli Kendi İşine Uyarlamak"
slug: fine-tuning-ve-lora-modeli-kendi-isine-uyarlamak
category: models-and-training
level: intermediate
reading_order: 19
summary: "11. makalede adı konan ince ayarın verimli biçimini kurar: tam ince ayarın bellek faturası, ince ayarın düşük içsel boyutu, LoRA'nın iki küçük matrisi, rankın ne kadar küçülebileceği, öğrenme ile unutma arasındaki değiş tokuş ve düşük ranklı bir güncellemenin neden kötü bir bilgi kanalı olduğu."
tags:
  - ince-ayar
  - lora
  - dusuk-rank
  - parametre-verimli-uyarlama
  - qlora
content_hash: sha256:82e7a3642c680193bdcfdd5a26aa750fddd56ceac97f606350f7d1aa382cd570
classification_version: 1
classification_batch: 4
---
## Sabit modelin sonu

Son dört makale boyunca modeli sabit varsaydık. Ağırlıklar ön eğitimde yazıldı, post-training onları bir kez daha ayarladı, biz de ortaya çıkan nesneyi inceledik: hangi ızgaradan baktığını, neyi ölçebildiğimizi, neden uydurduğunu, bildiği şeyin nerede durduğunu. Şimdi o varsayımı kaldırıyoruz.

11\. makalede ince ayarı tanımlamıştık: eğitilmiş bir modeli daha küçük ve amaca dönük bir veriyle bir kez daha eğitmek. Orada bu işlemin post-training'in içinde de dışında da kullanıldığını, kendi verinle kendi işine uyarlamanın da bir ince ayar olduğunu söyleyip verimli biçimini ileriye bırakmıştık. Randevu burada.

Soru iki katmanlı. Birincisi mekanik: milyarlarca parametreli bir modeli, hepsini yeniden yazmadan uyarlamak nasıl mümkün oluyor? İkincisi dürüst: 17\. ve 18\. makale ince ayarın bilgi yüklemek için kötü bir kanal olduğunu gösterdiyse, ucuzlatılmış bir ince ayar bu sınırı aşabilir mi?

## Tam ince ayarın faturası

Önce pahalı yolu görelim, çünkü ucuz yolun neyi kurtardığı ancak orada görünüyor.

Bir modeli eğitirken bellekte üç şey durur. Birincisi **ağırlıklar**: 7 milyar parametreli bir model 16 bitlik sayılarla yaklaşık 14 gigabayt tutar. İkincisi **gradyanlar**: 3\. makaledeki geriye yayılım her ayarlanabilir parametre için bir türev üretir, yani ağırlıklar kadar daha yer. Üçüncüsü **optimizatör durumu**: yaygın kullanılan optimizatörler her parametre için birkaç yardımcı sayı daha saklar. Toplam, model boyunun birkaç katıdır ve bu katsayı eğitimin kendisinden gelir, modelden değil.

Edward Hu ve arkadaşlarının ICLR 2022'de sunduğu çalışma bunu 175 milyar parametreli GPT-3 için sayıya bağlamış: tam ince ayar sırasında gereken bellek 1,2 terabayt. Aynı çalışma ikinci bir maliyeti de işaretliyor ve bu maliyet daha sinsi. Tam ince ayar bittiğinde elinde modelin **tam bir kopyası** olur: GPT-3 ölçeğinde 350 gigabaytlık bir kontrol noktası. Beş ayrı iş için beş ayrı ince ayar yaptıysan beş kopya saklarsın ve çalışma anında hangisini kullanacaksan onu belleğe yüklersin.

Buradan bakınca sorun "eğitim pahalı" değil. Sorun, tek bir görev için bütün modeli yeniden yazıyor olmamız. Peki gerçekten bütün modeli yeniden yazmak zorunda mıyız?

## İnce ayarın gerçek boyutu

Bu soruya beklenmedik bir cevap, bu makalenin merkezindeki yöntemden — **düşük ranklı uyarlama** (low-rank adaptation, LoRA) — bir yıl önce gelmişti.

Armen Aghajanyan, Sonal Gupta ve Luke Zettlemoyer'in ACL 2021'de yayımladığı ve konferansın öne çıkan bildirilerinden biri seçilen çalışma şunu sordu: bir modeli bir göreve uyarlamak kaç serbestlik derecesi gerektiriyor? Yöntemleri sade. Modelin bütün parametrelerini serbest bırakmak yerine, eğitimi rastgele seçilmiş az boyutlu bir alt uzaya hapsettiler ve tam ince ayarın başarısının yüzde 90'ına ulaşan en küçük boyutu aradılar. Bu sayıya **içsel boyut** (intrinsic dimension) diyorlar.

Sonuçlar şaşırtıcı biçimde küçük. 355 milyon parametreli RoBERTa-Large, MRPC adlı cümle eşleştirme görevinde tam performansının yüzde 90'ına **207 boyutla** ulaşıyor. Daha zor bir görevde, QQP'de, sayı 774. Yani yüz milyonlarca parametrenin oluşturduğu uzayda, bir göreve uyum sağlamak için gezilmesi gereken yön sayısı üç haneli.

İkinci bulgu daha da öğretici ve 9\. makaledeki ölçek tartışmasına bağlanıyor: model büyüdükçe içsel boyut **küçülüyor**. Aynı görevde BERT-Base'in ihtiyaç duyduğu boyut 1.608 iken RoBERTa-Large'ın ihtiyacı 207. Daha büyük bir ön eğitim, sonraki uyarlamayı kolaylaştırıyor — çünkü büyük model, göreve yakın temsilleri zaten kurmuş oluyor.

Bu bulgu bir mühendislik fikrinin kapısını açıyor. Eğer ince ayarın gerçekten değiştirdiği şey bu kadar az boyutluysa, güncellemeyi de az boyutlu bir şeyle temsil edebilir miyiz?

## İki ince matris

LoRA'nın cevabı tam olarak budur ve tek bir cümleye sığar: ağırlık matrisini dondur, değişimi iki küçük matrisin çarpımı olarak öğren.

7\. makalede bir Transformer bloğunun matrislerini saymıştık. Diyelim model boyutu 4.096 ve elimizde bir kare ağırlık matrisi var. Bu matris 4.096 × 4.096 = 16.777.216, yani yaklaşık 16,8 milyon parametre taşır. Tam ince ayarda bu sayıların hepsi güncellenir.

LoRA bu matrise hiç dokunmaz. Onun yerine yanına iki matris koyar: biri 8 satır ve 4.096 sütunlu, öbürü 4.096 satır ve 8 sütunlu. Modelin kullandığı ağırlık artık donmuş matrisle bu ikisinin çarpımının toplamıdır ve eğitilen tek şey iki küçük matristir. Buradaki 8 sayısı eklenen güncellemenin **rankıdır** ve kaç yönde değişime izin verdiğimizi söyler.

Sayıyı yapalım. Her iki küçük matris de 8 × 4.096 = 32.768 parametre taşır; toplam 65.536. Oran: 65.536 ÷ 16.777.216 = 0,0039, yani binde 3,9. Formülü sadeleştirmek de kolay: eğitilen parametrelerin oranı, rankın iki katının model boyutuna bölümüdür — matrisin kendisi model boyutunun karesiyle büyürken ek maliyet doğrusal büyür, dolayısıyla model büyüdükçe oran **küçülür**.

![Solda tek bir kare ağırlık matrisi ve içindeki parametre sayısı, sağda aynı matrisin yanına eklenen iki ince dikdörtgen matris ve onların çok daha küçük parametre sayısı; altta iki sayının oranı gösterilir.](assets/tam-matris-ve-dusuk-rank.svg "Şekil 1 — Aynı katman, iki ayrı bütçe")

Şekil 1'deki oran, GPT-3 ölçeğinde şu sayılara dönüşüyor. Hu ve arkadaşları 175 milyar parametreli modelde sorgu ve değer matrislerine rank 4 ile LoRA uyguladıklarında eğitilen parametre sayısı **4,7 milyona** iniyor: on bin kat azalma. Eğitim belleği 1,2 terabayttan 350 gigabayta düşüyor. Ve saklanan kontrol noktası 350 gigabayt yerine **35 megabayt** oluyor.

Üç ayrıntı bu tasarımı çalışır kılıyor ve üçü de küçük görünüp önemli.

Birincisi başlangıç. Küçük matrislerden biri rastgele küçük sayılarla, öbürü ise **sıfırla** başlatılır. Böylece eğitimin ilk anında çarpımları sıfırdır ve model tam olarak başladığı yerdedir; uyarlama sıfırdan büyümeye başlar, modeli bir sıçramayla bozmaz.

İkincisi bellek muhasebesi. Yukarıdaki üç kalemi hatırla: ağırlıklar, gradyanlar, optimizatör durumu. LoRA ikinci ve üçüncüyü binde birkaça indirir, çünkü gradyan ve optimizatör durumu yalnızca **eğitilen** parametreler için tutulur. Birinci kalemi ise küçültmez — donmuş ağırlıklar hâlâ bellektedir. Bu ayrım, birazdan göreceğimiz dört bitlik fikrin neden gerektiğini açıklar.

Üçüncüsü çıkarım. Eğitim bittikten sonra iki küçük matrisin çarpımı bir kez hesaplanıp donmuş matrise eklenebilir. Ortaya çıkan matris, sıradan bir ağırlık matrisidir; model çalışırken fazladan hiçbir işlem yapmaz. Bu, LoRA'yı kendinden önceki ailelerden ayıran teknik ayrıntıdır.

## Ailenin geri kalanı

LoRA boşlukta doğmadı. İki öncülü, aynı sorunu farklı yerlerden çözmeye çalışmıştı.

Neil Houlsby ve arkadaşlarının ICML 2019'da sunduğu çalışma **adaptör** (adapter) fikrini kurdu: bloğun içine öğrenilebilir küçük katmanlar eklemek. GLUE değerlendirme kümesinde görev başına parametrelerin yalnızca yüzde 3,6'sını ekleyerek tam ince ayarın 0,4 puan yakınına geliyorlardı. Fikir işe yaradı ama bir bedeli vardı: eklenen katmanlar çıkarım sırasında da oradadır, yani her cevap biraz daha yavaş üretilir.

Xiang Lisa Li ve Percy Liang'ın ACL 2021'de sunduğu **önek ayarı** (prefix-tuning) bambaşka bir yerden girdi: ağırlıklara hiç dokunmayıp, dizinin başına öğrenilebilir sanal token'lar eklemek. Parametrelerin binde birini eğiterek karşılaştırılabilir başarı elde ediyorlardı. Bunun da bir bedeli var: sanal token'lar, modelin bir seferde görebildiği metin miktarından yer kapar. Bu sınırın ne olduğunu ve neden var olduğunu 21\. makalede kuracağız.

LoRA'nın yaygınlaşması bu iki bedeli birden ödememesinden geliyor: çıkarımda ek işlem yok, girdide ek yer yok.

> **Kendini yokla:** LoRA çıkarımda hiçbir ek maliyet getirmiyorsa, aynı taban modele takılıp çıkarılabilen adaptörler fikri neden hâlâ anlamlı?

Çünkü birleştirme bir tercihtir, zorunluluk değil. Küçük matrislerin çarpımını donmuş matrise eklemeden, ayrı bir parça olarak tutarsan tek bir taban modeli bellekte tutup üzerine farklı işlerin adaptörlerini takıp çıkarabilirsin — her biri birkaç on megabayt. Birleştirirsen o esnekliği kaybeder, hızın son kırıntısını kazanırsın. Şekil 1'deki oranın asıl değeri burada görünüyor: küçük olan şey yalnızca eğitim maliyeti değil, saklanan ve taşınan nesnenin kendisi.

## Rank ne kadar küçülebilir

Şimdi asıl ampirik soru: rank ne kadar küçük olabilir?

Hu ve arkadaşlarının cevabı kışkırtıcıydı. Kendi görevlerinde rank 1'in bile yeterli olduğunu buldular ve farklı ranklarla öğrenilen güncellemelerin en güçlü yönlerinin büyük ölçüde çakıştığını gösterdiler. Sayılar da bunu destekliyor: GPT-3 175B'de 4,7 milyon parametreli LoRA, WikiSQL'de 73,4 puanla tam ince ayarın 73,8'ine bitişik; MNLI'de ise 91,7 ile tam ince ayarın 89,5'ini geçiyor.

Bu sonuç birkaç yıl boyunca "LoRA tam ince ayara eşittir" biçiminde okundu. Sonra daha dikkatli bir ölçüm geldi.

Dan Biderman ve arkadaşlarının 2024'te TMLR'de yayımladığı çalışma, LoRA ile tam ince ayarı iki ayrı alanda — kod ve matematik — ve iki ayrı veri düzeninde karşılaştırdı. Birinci düzen tanıdık: yaklaşık 100 bin talimat-cevap çiftiyle 12\. makaledeki gibi denetimli ince ayar. İkincisi yeni bir şey: yaklaşık 20 milyar yapılandırılmamış token'la **sürekli ön eğitim** (continued pretraining) — yani 8\. makaledeki ön eğitimi, dar bir alanda ve eğitilmiş bir modelin üzerinden devam ettirmek.

İki düzende iki farklı sonuç çıktı ve ayrımın kendisi bu makalenin çekirdeği.

Talimat verisiyle yapılan ince ayarda LoRA neredeyse başa baş. Kod üretiminde rank 256 ile LoRA 0,498, tam ince ayar 0,497; matematikte LoRA 0,634, tam ince ayar 0,642. Fark, ölçüm gürültüsünün içinde kalıyor.

Sürekli ön eğitimde ise arayı kapatamıyor. Kodda LoRA 0,224'te kalırken tam ince ayar 0,263'e; matematikte LoRA 0,202'de kalırken tam ince ayar 0,293'e çıkıyor. Yani yeni bir alanı yapılandırılmamış metinden öğrenmek söz konusu olduğunda düşük ranklı güncelleme yetmiyor.

Yazarlar bunun matematiksel sebebini de ölçtüler: tam ince ayarın ağırlıklarda yarattığı değişimin rankı, tipik LoRA yapılandırmalarından **10 ila 100 kat** yüksek. Aghajanyan'ın 207 boyutuyla çelişmiyor bu; iki ölçüm farklı şeylere bakıyor. Biri "yeterli bir sonuca ulaşmak için kaç yön gerekir" diyor, öbürü "eğitim serbest bırakıldığında fiilen kaç yön değişir" diyor. Serbest bırakılan eğitim, gerekenden çok daha fazlasını değiştiriyor.

Peki bu fazlalık zararlı mı? Çalışmanın ikinci yarısı burada. Aynı deneylerde modellerin **hedef alan dışındaki** başarısı da ölçüldü — sağduyu ve fen sorularından oluşan üç ayrı genel değerlendirme kümesinde. LoRA, tam ince ayarın kaybettiği başarının çoğunu koruyor. Yani düşük rank bir kısıt olduğu kadar bir korumadır: model, kendisine öğretilmeyen şeyi daha az **unutuyor** (forgetting).

Çalışmanın başlığının tam anlamı bu: LoRA daha az öğrenir ve daha az unutur. Bunun bir kusur değil bir değiş tokuş olduğunu görmek, LoRA'yı doğru kullanmanın anahtarı. Nitekim yazarların pratik önerileri de bu yönde: adaptörleri yalnızca dikkat matrislerine değil bloğun bütün matrislerine takmak, rankı 16–64 gibi alışılmış değerlerde bırakmayıp 256'ya çıkarmak ve öğrenme oranını tam ince ayarınkinden bir büyüklük mertebesi yüksek seçmek.

## Dört bit ve tek kart

LoRA gradyan ve optimizatör maliyetini çözdü; donmuş ağırlıkların bellekteki yeri duruyordu. 65 milyar parametreli bir modelin 16 bitlik ince ayarı, ölçüldüğünde 780 gigabayttan fazla bellek istiyor. Bu, tek bir hızlandırıcıya sığmaz.

Tim Dettmers, Artidoro Pagnoni, Ari Holtzman ve Luke Zettlemoyer'in NeurIPS 2023'te sunduğu QLoRA bu kalemi hedef aldı. Fikir, donmuş ağırlıkları daha az bitle saklamak: **kuantizasyon** (quantization) — sayıları daha kaba bir ızgaraya yuvarlayarak bellekten kazanmak. Çalışma taban modeli dört bite indiriyor, LoRA adaptörlerini ise normal hassasiyette eğitiyor; gradyanlar dört bitlik ağırlıkların içinden geçip adaptörlere ulaşıyor. Kuantizasyonun kendi mekanizması ve neyi ne kadar bozduğu 27\. makalenin konusu; burada bilmemiz gereken tek şey, donmuş bir ağırlığın eğitim boyunca hiç güncellenmediği için daha kaba saklanabildiğidir.

Üç teknik ayrıntı bunu kayıpsıza yaklaştırıyor: ağırlıkların çan eğrisine benzeyen dağılımına göre tasarlanmış dört bitlik bir sayı biçimi, kuantizasyon sabitlerinin kendisinin de kuantize edilmesi (parametre başına yaklaşık 0,37 bit, 65 milyarlık bir modelde yaklaşık 3 gigabayt kazanç) ve bellek tepelerini yöneten sayfalı optimizatörler.

Sonuç, 780 gigabaytlık ihtiyacı 48 gigabaytın altına indiriyor: 65 milyar parametreli bir model tek bir karta sığıyor. Yazarlar bu düzenle 80 milyondan 65 milyara kadar binden fazla model eğitip karşılaştırdılar.

Aynı çalışmanın en çok alıntılanan cümlesini ise 16\. makalenin disipliniyle okumak gerekiyor. Çalışma, ürettiği modelin bir değerlendirme kümesinde ChatGPT'nin başarısının yüzde 99,3'üne ulaştığını bildiriyor. Bu cümleyi okurken sorulacak sorular hazır: hangi görev dilimi ölçüldü, küme kaç örnekten oluşuyor, fark gürültüden ayırt edilebilir mi, puanı kim verdi. Yazarların kendileri de bu değerlendirmenin sınırlarını tartışıyor. Sayı yanlış değil; tek başına "bu model ChatGPT kadar iyidir" demiyor.

## Düşük rank yeni bilgi ekler mi

Geriye makalenin dürüst sorusu kalıyor. 17\. makale ince ayarın uydurmayı artırabildiğini, 18\. makale olgusal bilginin ön eğitimde ve tekrarla yazıldığını göstermişti. LoRA bu tabloyu değiştiriyor mu?

Oded Ovadia ve arkadaşlarının EMNLP 2024'te yayımladığı çalışma bunu doğrudan ölçtü. Modellerin eğitim kesim tarihinden sonraki bir döneme ait, 910 çoktan seçmeli sorudan oluşan bir küme hazırladılar — yani modellerin kesinlikle bilmediği olgular. Sonra aynı bilgiyi iki ayrı yoldan verdiler: ince ayarla ağırlıklara yazarak ve üretim anında metni modelin önüne koyarak. İnce ayar tarafında düşük rank kullanmadılar; bütün parametreleri serbest bırakıp ilgili belgeler üzerinde yukarıda tanımladığımız sürekli ön eğitimi yaptılar.

Sayılar keskin. 7 milyar parametreli Mistral, hiçbir müdahale olmadan 0,481 doğruluk veriyor. İnce ayardan sonra 0,504 — yani neredeyse hiç kıpırdamıyor. Aynı bilgi üretim anında önüne konduğunda ise 0,875. Llama 2'de tablo daha da net: taban model 0,353 iken ince ayar doğruluğu **0,219'a düşürüyor**. Bilgiyi ağırlıklara yazmaya çalışmak, modeli bozuyor.

Aynı çalışmanın ikinci deneyi mekanizmayı açıklıyor. Her bilgi parçasının on ayrı yeniden yazımıyla ince ayar yapıldığında doğruluk düzenli biçimde yükseliyor: Mistral'de 0,504'ten 0,588'e. Yani ince ayar bilgi yazabiliyor — ama aynı olguyu defalarca, farklı biçimlerde görmek şartıyla. Bu, 18\. makaledeki ölçümün tam karşılığı: ezberlenen metin miktarı, bir örneğin veride kaç kez tekrarlandığıyla birlikte artıyordu.

![Dört yatay çubuk aynı ölçekte dizilir: en üstte hiç müdahale edilmemiş taban modelin doğruluğu, altında bilgiyi ince ayarla ağırlığa yazmanın doğruluğu — taban modelin çok az üstünde — altında aynı bilginin on yeniden yazımıyla yapılan ince ayarın biraz daha yüksek doğruluğu ve en altta bilgiyi üretim anında modelin önüne koymanın belirgin biçimde daha uzun çubuğu.](assets/agirliga-yazmak-mi-onune-koymak-mi.svg "Şekil 2 — Aynı olgu, iki ayrı kanal")

> **Kendini yokla:** Şekil 2'deki fark LoRA'nın rankının küçük olmasından mı kaynaklanıyor?

Hayır — ve ayrımı görmek önemli. Ovadia ve arkadaşları bütün parametreleri serbest bırakmıştı; yani ölçtükleri şey ince ayarın kendisiydi, düşük rank değil. Biderman ve arkadaşlarının sürekli ön eğitim sonucu ise düşük rankın **ayrıca** bir sınır koyduğunu gösteriyor. İki etki üst üste biniyor: ince ayar zaten kötü bir bilgi kanalıdır, düşük ranklı ince ayar ise o kanalı daha da daraltır. Bu yüzden "LoRA ile modele kurumumun belgelerini öğretirim" cümlesi, kulağa makul gelse de ölçüldüğünde çalışmıyor.

O hâlde LoRA ne için iyi? Cevap 11\. ve 12\. makalelerin ayrımında: **davranış** ucuzdur, **bilgi** pahalıdır. Bir modele belirli bir biçimde cevap vermeyi, belirli bir alanın diliyle konuşmayı, belirli bir çıktı düzenine uymayı öğretmek düşük ranklı bir güncellemeyle yapılabilir — çünkü bunlar modelin zaten sahip olduğu yeteneklerin yeniden düzenlenmesidir. Modelin hiç görmediği olguları yüklemek ise başka bir iştir ve doğru çözümü ağırlıklarda değil, üretim anında modelin önüne konan metinde aranır. O çözümü 41\. makalede kuracağız.

### Sırada ne var

Bu makale boyunca sessizce varsaydığımız bir şey var: ağırlık matrisine erişebiliyoruz. LoRA'nın bütün mekanizması ağırlıkların elinde olmasına dayanıyor — donduracağın, yanına iki matris ekleyeceğin, sonunda birleştireceğin bir matris olmalı. Oysa bugün kullanılan modellerin çoğuna yalnızca bir arayüzden ulaşılıyor ve ağırlıkları hiç görülmüyor. Peki hangi modellerin ağırlıkları paylaşılıyor, bu ağırlıkları üretebilmek ne kadar hesap istiyor ve "açık" sözcüğü bu alanda tam olarak neyi kastediyor?

## Kaynakça

- Hu, E. J., Shen, Y., Wallis, P., Allen-Zhu, Z., Li, Y., Wang, S., Wang, L. & Chen, W. (2022). *LoRA: Low-Rank Adaptation of Large Language Models*. ICLR 2022. [Bağlantı](https://openreview.net/forum?id=nZeVKeeFYf9)
- Aghajanyan, A., Gupta, S. & Zettlemoyer, L. (2021). *Intrinsic Dimensionality Explains the Effectiveness of Language Model Fine-Tuning*. ACL-IJCNLP 2021, s. 7319–7328. [Bağlantı](https://aclanthology.org/2021.acl-long.568/)
- Houlsby, N., Giurgiu, A., Jastrzębski, S., Morrone, B., de Laroussilhe, Q., Gesmundo, A., Attariyan, M. & Gelly, S. (2019). *Parameter-Efficient Transfer Learning for NLP*. ICML 2019, PMLR 97, s. 2790–2799. [Bağlantı](https://proceedings.mlr.press/v97/houlsby19a.html)
- Li, X. L. & Liang, P. (2021). *Prefix-Tuning: Optimizing Continuous Prompts for Generation*. ACL-IJCNLP 2021, s. 4582–4597. [Bağlantı](https://aclanthology.org/2021.acl-long.353/)
- Biderman, D., Portes, J., Gonzalez Ortiz, J. J. ve ark. (2024). *LoRA Learns Less and Forgets Less*. Transactions on Machine Learning Research. [Bağlantı](https://openreview.net/forum?id=aloEru2qCG)
- Dettmers, T., Pagnoni, A., Holtzman, A. & Zettlemoyer, L. (2023). *QLoRA: Efficient Finetuning of Quantized LLMs*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/1feb87871436031bdc0f2beaa62a049b-Abstract-Conference.html)
- Ovadia, O., Brief, M., Mishaeli, M. & Elisha, O. (2024). *Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs*. EMNLP 2024, s. 237–250. [Bağlantı](https://aclanthology.org/2024.emnlp-main.15/)
