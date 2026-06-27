---
article_id: article_0c98cd4a-3e97-4228-a9cb-e24cfeb9d475
title: "Multimodal, Efficient AI ve World Models"
slug: multimodal-efficient-ai-ve-world-models
category: multimodal-and-future
level: advanced
reading_order: 17
summary: "Multimodal modeller, efficient AI teknikleri ve world models kavramını derinlemesine inceleyerek yapay zekânın gelecek yönlerini teknik düzeyde değerlendirir."
tags:
  - multimodal
  - efficient-ai
  - world-models
  - gelecek-yonleri
content_hash: sha256:4fea7c728f62a4416e6a4602fd62b7bea1442eeaa0dc0453a52d0a822db53dcf
classification_version: 1
classification_batch: 0
---
## **Multimodal, Efficient AI ve World Models** 

## **1. Kısa tez** 

AI’in gelecek yönünü anlamak için sadece daha büyük dil modellerine bakmak yetmez; çünkü zeka problemi artık yalnızca metin üretimi değil, farklı duyusal sinyalleri aynı temsilde birleştirme, dünyaya referans verme, hesaplama maliyetini yönetme, küçük ve büyük modelleri birlikte kullanma ve fizikseldinamik ortamları modelleme problemidir. 

Text-only LLM, yani yalnızca metin üzerinde eğitilmiş büyük dil modeli, dilsel örüntüleri güçlü biçimde yakalar. Fakat dünya sadece metinden oluşmaz. Görüntü, ses, video, hareket, zaman, mekân, fiziksel etkileşim ve maliyet kısıtı da AI mimarisinin parçası haline geldiğinde, modelden beklenen şey “iyi cümle kurmak”tan çıkar; algı, temsil, seçim, verimlilik ve eylem arasında doğru ilişki kurmaya dönüşür. 

Bu yüzden multimodal AI, efficient inference, model routing, small models, on-device AI ve world models ayrı ayrı trendler değil, aynı büyük kırılmanın parçalarıdır: AI sistemi artık tek bir dev metin modelinden ibaret değil; farklı yetenek, maliyet ve bağlam seviyelerine sahip modellerin birlikte çalıştığı bir mimari ekosistemdir. 

## **2. Neden bu konu bir üst seviye?** 

LLM çağının ilk zihinsel modeli şuydu: Daha çok veri, daha büyük model, daha fazla parametre, daha iyi performans. Bu model tamamen yanlış değildir. Scaling laws çalışmaları, model boyutu, veri miktarı ve hesaplama arttıkça dil modelleme kaybının düzenli biçimde düştüğünü gösterdi. Kaplan ve arkadaşlarının 2020’deki scaling laws çalışması ve Hoffmann ve arkadaşlarının 2022’deki Chinchilla çalışması bu fikri daha disiplinli hale getirdi: Sadece modeli büyütmek yetmez, model boyutu ile eğitim verisi arasında compute-optimal bir denge gerekir. 

Ama bu çerçeve AI’in tamamını açıklamaz. Çünkü dil modelleme başarısı, her zaman dünya modelleme başarısı değildir. Bir model metinde “bardak masanın üstündedir” cümlesini iyi tamamlayabilir. Fakat görsel sahnede bardağın gerçekten nerede olduğunu, düşerse ne olacağını, kameranın açısı değişince nesnenin nasıl görüneceğini, bir elin onu nasıl kavrayacağını, bir sesin hangi fiziksel olaya karşılık geldiğini anlamak başka bir problemdir. 

Bu konu bir üst seviye çünkü LLM’lerin sınırlarını “model aptal mı, zeki mi?” gibi kaba sorularla değil, temsil türü, grounding, hesaplama ekonomisi ve mimari bileşim açısından tartışmayı gerektirir. Burada ana soru “daha büyük model mi?” değil, “hangi bilgi hangi temsil içinde, hangi maliyetle, hangi model tarafından, hangi bağlamda işlenmeli?” sorusudur. 

## **3. Temel kavramlar** 

Multimodal model, birden fazla veri türünü işleyebilen modeldir. Modalite, verinin biçimidir: metin, görüntü, ses, video, sensör verisi, hareket komutu veya 3B uzamsal bilgi gibi. Bir model hem görüntü hem metin alıp cevap üretebiliyorsa vision-language model olarak adlandırılır. Eğer ses, video ve eylem gibi daha fazla kanal da sisteme dahil oluyorsa multimodal LLM ya da multimodal foundation model ifadesi kullanılır. 

1 

Text-only LLM, temel olarak token dizileri üzerinde çalışır. Token, metnin modele verilen küçük parçalarıdır. Modelin görevi, bağlama göre sonraki token dağılımını tahmin etmektir. Bu mekanizma şaşırtıcı derecede güçlüdür çünkü metin, dünyanın birçok yönünü dolaylı olarak taşır. Ancak dolaylı temsil ile doğrudan algısal temsil aynı şey değildir. 

Vision-language model, görüntü ile dili ortak bir temsil alanına taşımaya çalışır. CLIP bu fikrin erken ve etkili örneklerinden biridir. CLIP, görüntü ve metin çiftlerini aynı embedding uzayında hizalar. Embedding, verinin sayısal temsilidir; benzer anlamdaki öğeler bu uzayda birbirine yakın olur. CLIP’in ana başarısı, görsel sınıflandırmayı yalnızca sabit etiketlere değil, doğal dil açıklamalarına bağlamasıdır. Fakat CLIP tarzı modeller çoğu zaman sahnenin tüm nedensel yapısını anlamaz; görüntü ve metin arasındaki istatistiksel hizalamayı öğrenir. 

Grounding, modelin sembollerini dünyadaki nesne, olay, konum, zaman veya eylemlerle ilişkilendirme problemidir. Metin modelinde “kırmızı top” ifadesi başka metinsel bağlamlarla ilişkilidir. Grounded modelde ise “kırmızı top” görsel sahnedeki belirli bir nesneye, onun konumuna, olası hareketine ve diğer nesnelerle ilişkisine bağlanmalıdır. Multimodal modellerde grounding daha karmaktır çünkü modelin sadece kelimeyi değil, kelimenin görsel, uzamsal, zamansal ve bazen fiziksel karşılığını da ayırt etmesi gerekir. 

World model, bir sistemin dünyanın durumunu, dinamiklerini ve eylemlerin sonuçlarını temsil etmeye çalıştığı model fikridir. Bu kavram reinforcement learning, robotik, bilişsel bilim ve modern selfsupervised learning çizgilerinde farklı anlamlarla kullanılır. Ha ve Schmidhuber’in 2018 tarihli “World Models” çalışması, ajanın çevreyi sıkıştırılmış bir iç temsil üzerinden simüle edebilmesini merkeze alır. LeCun’un JEPA çizgisi ise dünyanın her detayını piksel düzeyinde tahmin etmek yerine, soyut temsil düzeyinde geleceği veya eksik bilgiyi tahmin etmeyi savunur. 

Efficient inference, eğitilmiş modelin çalıştırılması sırasında daha az hesaplama, bellek, enerji veya gecikme ile kabul edilebilir performans üretme problemidir. Training, modelin öğrenme sürecidir; inference ise modelin kullanıcı girdisine cevap verdiği çalışma sürecidir. Frontier AI’da inference merkezi hale geliyor çünkü güçlü modellerin maliyeti sadece eğitilirken değil, milyonlarca ya da milyarlarca kez çalıştırılırken ortaya çıkar. 

Quantization, model ağırlıklarını veya aktivasyonlarını daha düşük hassasiyetli sayı biçimleriyle temsil etme yöntemidir. Örneğin 16-bit yerine 8-bit veya 4-bit temsil kullanılır. Amaç belleği ve hesaplama maliyetini düşürmektir. Distillation, büyük bir modelin davranışını daha küçük bir modele öğretme yaklaşımıdır. Pruning, modelde az katkı sağlayan ağırlık, nöron veya yapıları çıkarma fikridir. Routing, gelen isteği ya da alt görevi uygun modele veya uzman alt yapıya yönlendirmektir. Cascading, ucuz modelin önce denediği, gerekirse pahalı modelin devreye girdiği aşamalı mimaridir. 

Small model, sadece parametre sayısı küçük model demek değildir. Daha dar görev, daha düşük gecikme, daha az bellek, daha iyi kontrol edilebilirlik veya cihaz üstünde çalışma gerektiren durumlarda küçük model mimari olarak daha doğru seçim olabilir. Küçük model zayıf model değildir; yanlış bağlamda kullanılan küçük model zayıftır. 

On-device AI, modelin sunucuda değil, doğrudan cihaz üzerinde çalışmasıdır. Bu yaklaşım gizlilik, gecikme ve çevrimdışı kullanım açısından avantaj sağlar; fakat bellek, enerji, model boyutu ve güncelleme yönetimi açısından kısıt getirir. 

2 

## **4. Araştırma haritası** 

Bu alanı beş araştırma hattı üzerinden okumak gerekir. 

Birinci hat, multimodal representation learning hattıdır. CLIP, ALIGN, Flamingo, BLIP-2, LLaVA, GPT-4V ve Gemini gibi çalışmalar, görüntü ile dili ortak işlem alanına taşımanın farklı yollarını gösterdi. CLIP ve ALIGN kontrastif öğrenme ile görüntü-metin hizalamasına odaklandı. Flamingo, önceden eğitilmiş görsel ve dil bileşenlerini few-shot multimodal öğrenme için birleştirdi. BLIP-2, görsel encoder ile LLM arasında hafif bir köprü modülü kullanarak maliyeti düşürmeye çalıştı. LLaVA, instruction tuning fikrini multimodal alana taşıdı. GPT-4V ve Gemini gibi sistemler ise multimodal yetenekleri daha genel asistan davranışıyla birleştirdi. 

İkinci hat, grounding ve evaluation hattıdır. Multimodal modellerin iyi görünmesi kolaydır, gerçekten grounded olup olmadığını ölçmek zordur. Görsel soru cevaplama, image captioning ve OCR benzeri görevler önemli ama yetersizdir. Model bir görüntüyü tarif edebilir, fakat nesneler arası ilişkiyi, sayımı, mekânsal düzeni, nedensel sonucu veya sahnedeki belirsizliği tutarlı anlayamayabilir. Bu yüzden hallucination, spatial reasoning, compositionality ve temporal understanding multimodal değerlendirmenin kritik problemleridir. 

Üçüncü hat, world model ve predictive representation hattıdır. Burada ana fikir, modelin dünyayı sadece etiketler veya açıklamalar üzerinden değil, durum geçişleri ve olası gelecekler üzerinden temsil etmesidir. Dreamer serisi, ajanın latent dünya modeli içinde planlama yapmasını araştırır. JEPA ve V-JEPA çizgisi, temsil düzeyinde tahmin yaparak piksel düzeyi ayrıntılara boğulmadan dünya yapısını öğrenmeyi hedefler. Video modelleri de bu hatta yakındır çünkü video, statik görüntüye zaman ve fiziksel süreklilik ekler. 

Dördüncü hat, efficient AI hattıdır. FlashAttention, speculative decoding, quantization, low-rank adaptation, pruning, MoE, KV-cache optimizasyonu ve model sıkıştırma gibi teknikler burada yer alır. Bunlar sadece “maliyet azaltma” değildir. Modelin hangi bağlamda kullanılabileceğini belirler. Çok pahalı bir model teorik olarak güçlü olabilir; ama yüksek gecikme, yüksek enerji ve yüksek bellek gereksinimi yüzünden mimari olarak yanlış yerde durabilir. 

Beşinci hat, model composition hattıdır. Routing, cascading, specialist-generalist tasarımlar ve küçükbüyük model bileşimi bu hattın parçasıdır. Tek modelin her şeyi yapması yerine, sistem farklı modelleri görevin niteliğine göre kullanır. Bu yaklaşım, multimodal ve efficient AI kesişiminde daha da önemlidir. Çünkü görüntü, ses, video ve metin aynı maliyet profiline sahip değildir; her modalite farklı encoder, bellek ve hesaplama davranışı getirir. 

## **5. Ana tartışmalar** 

İlk büyük tartışma şudur: Multimodal model gerçekten dünyayı anlıyor mu, yoksa farklı modaliteler arasında daha zengin korelasyon mu öğreniyor? 

CLIP tarzı modellerin başarısı, görüntü ile metin arasında büyük ölçekli hizalamanın çok güçlü olduğunu gösterdi. Ancak bu, modelin sahnenin nedensel yapısını kavradığı anlamına gelmez. Bir model “köpek frizbi yakalıyor” açıklamasını doğru seçebilir, ama frizbinin hareket yönünü, köpeğin bir saniye sonra nerede olacağını veya sahnedeki fiziksel imkânsızlığı her zaman anlayamayabilir. Burada multimodal model ile world model arasındaki fark ortaya çıkar. Multimodal model farklı veri türlerini ilişkilendirir; world model ise dünyanın durumlarını ve geçişlerini temsil etmeyi hedefler. 

3 

İkinci tartışma, dilin dünya modeli için yeterli olup olmadığıdır. Güçlü argüman şudur: İnsan bilgisi büyük ölçüde metne dökülmüştür; dolayısıyla yeterince büyük dil modelleri dünyanın birçok yapısını metinden öğrenebilir. Bu iddianın desteği vardır. LLM’ler nedensel açıklama, soyutlama, analoji ve planlama benzeri davranışlarda şaşırtıcı performans gösterir. Karşı argüman ise daha güçlüdür: Metin, dünyanın sıkıştırılmış ve seçilmiş bir izidir. Fiziksel süreklilik, algısal ayrıntı, zamanlama, bedenlenmiş etkileşim ve eylem-sonuç ilişkisi metinde eksik, yanlı veya dolaylı temsil edilir. Bu yüzden text-only öğrenme bazı dünya yapılarını yakalasa da, gerçek grounding için yeterli olmayabilir. 

Üçüncü tartışma, “daha büyük model” ile “daha verimli sistem” arasındadır. Frontier modeller büyüdükçe yetenek kazanır, fakat inference maliyeti büyür. Bu maliyet sadece para değil; gecikme, enerji, donanım bağımlılığı, erişilebilirlik ve gizlilik maliyetidir. Efficient inference bu yüzden ikincil optimizasyon değil, mimari zorunluluktur. Büyük model her zaman en iyi cevap değildir; bazen küçük model, doğru uzman model veya aşamalı sistem daha iyi toplam sonuç verir. 

Dördüncü tartışma, küçük modellerin rolüdür. Bir görüşe göre küçük modeller büyük modellerin geriden gelen ucuz kopyalarıdır. Daha doğru görüş şudur: Küçük modeller, belirli bilgi yoğunluğu, düşük gecikme, cihaz üstü çalışma ve dar görevlerde ayrı bir mimari sınıftır. Phi serisi gibi çalışmalar, yüksek kaliteli veri ve iyi eğitim stratejisinin küçük modellerde beklenenden yüksek performans sağlayabileceğini gösterdi. Fakat bu, küçük modelin genel muhakemede frontier modelle aynı seviyede olduğu anlamına gelmez. Küçük modelin değeri, doğru görev sınırı çizildiğinde ortaya çıkar. 

Beşinci tartışma, world model kavramının fazla geniş kullanılmasıdır. “World model” bazen ciddi bir temsil öğrenme iddiasını, bazen de pazarlama düzeyinde “model dünyayı biliyor” iddiasını ifade eder. Bu ayrımı net yapmak gerekir. Gerçek world model iddiası, modelin çevre durumlarını, gizli değişkenleri, zaman içindeki geçişleri ve eylem sonuçlarını temsil edebilmesiyle ilgilidir. Bu bilinç iddiası değildir. World model, “modelin iç simülasyon benzeri bir temsil taşıması” fikridir; bilinç, niyet veya öznel deneyim iddiası değildir. 

## **6. Güçlü bulgular** 

En güçlü bulgulardan biri, büyük ölçekli görüntü-metin hizalamanın genelleme kapasitesini artırdığıdır. CLIP, doğal dil açıklamalarıyla görsel sınıflandırma arasında esnek bir köprü kurdu. Bu, görsel modellerin kapalı etiket listelerine sıkışmaması açısından önemliydi. Flamingo ve BLIP-2 gibi çalışmalar, görsel encoder ile dil modelini birleştirmenin daha genel multimodal diyalog ve few-shot görevler için işe yaradığını gösterdi. 

İkinci güçlü bulgu, multimodal modellerin text-only modellere göre bazı görevlerde daha doğru bağlam kurabildiğidir. Bir görüntü hakkında soru sorulduğunda, text-only model ancak verilen açıklamaya dayanır. Vision-language model doğrudan görsel sinyali kullanabilir. Bu fark özellikle nesne tanıma, belge/görüntü okuma, grafik yorumlama, sahne açıklama ve görsel referanslı konuşmada belirgindir. Fakat “görüntü görebiliyor” olmak, her görsel akıl yürütme problemini çözdüğü anlamına gelmez. 

Üçüncü güçlü bulgu, inference optimizasyonlarının model kullanılabilirliğini kökten değiştirdiğidir. Quantization çalışmaları, düşük hassasiyetli temsilin büyük kalite kaybı olmadan bellek ve hesaplama maliyetini düşürebileceğini gösterdi. LLM.int8(), GPTQ, SmoothQuant ve AWQ gibi çalışmalar burada önemlidir. FlashAttention gibi attention optimizasyonları, Transformer tabanlı modellerin uzun bağlam ve yüksek verimli çalışmasında kritik rol oynadı. Speculative decoding, küçük bir modelin aday token üretip büyük modelin doğrulamasıyla gecikmeyi azaltabileceğini gösterdi. 

4 

Dördüncü güçlü bulgu, routing ve MoE yaklaşımının kapasite ile maliyeti ayırma potansiyelidir. Mixtureof-Experts mimarisinde modelin toplam parametre sayısı büyük olabilir, fakat her token için yalnızca bazı uzmanlar çalıştırılır. Switch Transformer ve GShard gibi çalışmalar bu çizgide önemlidir. Buradaki temel fikir şudur: Tüm kapasiteyi her girdiye harcamak zorunda değilsin. Bu, efficient AI’ın daha derin bir ilkesidir. 

Beşinci güçlü bulgu, dünya modelleme fikrinin özellikle zaman, eylem ve fiziksel süreklilik gerektiren alanlarda merkezi olduğudur. Dreamer, latent dynamics üzerinden planlamanın mümkün olduğunu gösteren önemli bir çizgidir. JEPA ve V-JEPA ise dünyanın temsil düzeyinde öğrenilebileceği fikrini güçlendirdi. Bu yaklaşım, piksel piksel gelecek tahmininin her zaman en iyi öğrenme hedefi olmadığını savunur. Önemli olan her ayrıntıyı üretmek değil, karar ve anlama için gerekli soyut yapıyı temsil etmektir. 

## **7. Zayıf / tartışmalı noktalar** 

Multimodal modellerin en zayıf noktalarından biri, değerlendirme problemidir. Bir model görsel olarak etkileyici cevap verebilir, fakat yanlış nesneye referans verebilir, sayıları karıştırabilir, uzamsal ilişkileri yanlış kurabilir veya görüntüde olmayan ayrıntıları uydurabilir. Bu durum multimodal hallucination olarak anılır. Text-only hallucination’da model metinsel gerçekliği uydurur; multimodal hallucination’da model algısal gerçekliği uydurur. Bu daha tehlikeli olabilir çünkü kullanıcı “model gördü” varsayımıyla cevaba fazla güvenebilir. 

İkinci zayıf nokta, grounding’in hâlâ kırılgan olmasıdır. Görüntü ve metin aynı embedding uzayına taşındığında, bu çoğu zaman semantik yakınlık sağlar. Ama referans çözümü, nesne sürekliliği, 3B yapı, fiziksel nedensellik ve eylem sonucu daha zor problemlerdir. Bir model “sandalyenin üstündeki kitap” ifadesini anlayabilir; ama kamera açısı değiştiğinde aynı kitabı takip etmek, kitabın düşüp düşmeyeceğini tahmin etmek veya bir eylemin sonucu hakkında güvenilir çıkarım yapmak daha ileri düzey temsil ister. 

Üçüncü tartışmalı nokta, world model iddialarının ölçülmesidir. Bir modelin dünya modeli olduğunu nasıl anlarız? Sadece video üretebilmesi yeterli mi? Sadece gelecek kareyi tahmin etmesi yeterli mi? Sadece oyun ortamında plan yapması yeterli mi? Bu sorular hâlâ açık. World model kavramı güçlü ama gevşek kullanıldığında açıklayıcılığını kaybediyor. 

Dördüncü zayıf nokta, efficient AI yöntemlerinin kaliteyi her zaman korumamasıdır. Quantization bazı görevlerde küçük kalite kaybıyla çalışabilir; bazı hassas görevlerde ise hata birikimi yaratabilir. Distillation, öğretmen modelin davranışlarını aktarabilir ama öğretmen modelin belirsizliğini, geniş genellemesini veya nadir durum bilgisini tam korumayabilir. Pruning yanlış yapıldığında model kapasitesini geri dönüşsüz biçimde zayıflatabilir. Routing yanlış karar verdiğinde ucuz modelin çözmesi gereken görev pahalı modele gitmez veya pahalı model gereksiz yere kullanılır. 

Beşinci tartışmalı nokta, on-device AI’ın sınırlarıdır. Cihaz üstü çalışma gizlilik ve gecikme açısından cazip görünür, fakat güçlü multimodal model çalıştırmak cihaz belleği, batarya, ısı ve model güncelleme kısıtlarına çarpar. Bu yüzden on-device AI genellikle tek başına değil, hibrit mimarinin parçası olarak düşünülmelidir: bazı işler cihazda, bazı işler daha büyük altyapıda, bazı kararlar ise aradaki yönlendirme katmanında çözülür. 

5 

## **8. Yanlış anlaşılan noktalar** 

“Multimodal = resim yükleme” yanlış bir basitleştirmedir. Resim yükleyip açıklama almak multimodal yeteneğin sadece görünen yüzüdür. Asıl mesele, farklı modalitelerin ortak ve tutarlı bir temsil içinde birleşmesidir. Görüntü, metin, ses ve video arasında referans, zaman, mekân ve nedensellik ilişkileri kurulmadıkça multimodalite yüzeysel kalır. 

“World model = bilinçli model” de yanlıştır. World model bilinç iddiası değildir. Bir modelin çevre dinamiklerini temsil etmesi, öznel deneyime sahip olduğu anlamına gelmez. World model daha teknik bir iddiadır: Sistem, gözlenen verinin arkasındaki durumları ve bu durumların nasıl değiştiğini modelleyebiliyor mu? 

“Küçük model = zayıf model” eksik bir görüştür. Küçük model genel kapsamda frontier modelden zayıf olabilir, ama düşük gecikme, düşük maliyet, cihaz üstü çalışma, dar görev ve kontrol edilebilirlik açısından daha mantıklı olabilir. Daha büyük model her zaman daha iyi sistem demek değildir. Sistem başarısı, modelin göreve, maliyete ve bağlama uygunluğuyla ilgilidir. 

“Efficient AI = sadece ucuzlatma” da yanlıştır. Verimlilik, hangi AI deneyiminin mümkün olduğunu belirler. Bir model çok iyi ama çok yavaşsa bazı etkileşim biçimleri mümkün olmaz. Çok fazla enerji tüketiyorsa ölçeklenemez. Cihaz üstünde çalışamıyorsa gizlilik ve çevrimdışı kullanım kısıtlanır. Bu yüzden efficient AI, ürün optimizasyonu değil, araştırma yönünü belirleyen temel mimari basınçtır. 

“Daha fazla modalite otomatik olarak daha fazla anlama getirir” iddiası da dikkatli ele alınmalıdır. Modalite sayısı arttıkça veri hizalama, gürültü, değerlendirme ve hata türleri de artar. Görüntü, ses ve video eklemek modeli otomatik olarak grounded yapmaz. Yanlış hizalanmış multimodal veri, modele daha fazla sinyal değil, daha fazla karışıklık da verebilir. 

## **9. Gelecek yönelimleri** 

Birinci yönelim, native multimodal modellerdir. Erken dönemde birçok sistem, ayrı bir vision encoder ile ayrı bir language modelin bağlanması şeklinde kuruldu. Bu hâlâ güçlü bir desen. Fakat daha ileri yönde, modelin metin, görüntü, ses ve video sinyallerini daha doğal ve ortak bir temsil içinde işlemesi beklenir. Buradaki kritik sorun, tek bir ortak mimarinin her modaliteye gerçekten uygun olup olmadığıdır. Metin ayrık token dizisidir; video yoğun, zamansal ve yüksek bant genişlikli sinyaldir. Bu fark mimari tasarımı zorlar. 

İkinci yönelim, video ve zaman anlayışıdır. Statik görüntü modellemesi dünya anlayışı için sınırlıdır. Dünya zaman içinde değişir. Nesneler hareket eder, eylemler sonuç doğurur, fiziksel süreklilik vardır. Video modelleri ve predictive representation learning bu yüzden önemlidir. Ama video üretmek ile dünyayı anlamak aynı şey değildir. Gerçek soru, modelin zamansal temsilinin eylem, nedensellik ve planlama için kullanılabilir olup olmadığıdır. 

Üçüncü yönelim, model routing ve model ekosistemidir. Tek bir büyük model yerine, küçük modeller, uzman modeller, multimodal encoderlar, genel modeller ve doğrulama katmanları birlikte çalışacaktır. Bu sistemlerde ana problem sadece model kalitesi değil, karar politikasıdır: Hangi girdi hangi modele gitmeli? Ucuz model ne zaman yeterli? Büyük model ne zaman devreye girmeli? Hangi cevap güvenilir sayılmalı? 

Dördüncü yönelim, adaptive compute fikridir. Her token, her görüntü veya her görev aynı hesaplama bütçesini hak etmez. Bazı girdiler basittir; bazıları çok aşamalı akıl yürütme, görsel kontrol veya uzun 

6 

bağlam ister. Gelecekte başarılı mimariler, sabit hesaplama harcamak yerine girdiye göre hesaplama derinliği ve model seçimi yapacaktır. 

Beşinci yönelim, on-device ve hybrid AI’dır. Cihaz üstü modeller gizlilik, hız ve kişiselleştirme için önemli hale gelirken, daha büyük modeller karmaşık görevler için dış altyapıda kalabilir. Bu ayrım sadece teknik değil, mimari bir ayrımdır. AI sistemi tek merkezli olmaktan çıkar; cihaz, yerel bellek, küçük model, büyük model ve multimodal işleme katmanları arasında bölünür. 

Altıncı yönelim, world model ile multimodal modelin birleşmesidir. Bugünkü multimodal modeller çoğunlukla algı ve dil arasında bağlantı kurar. World model yaklaşımı ise bu bağlantıya zaman, eylem ve durum geçişi ekler. Asıl sıçrama, modelin gördüğünü tarif etmesinden çok, gördüğü dünyanın nasıl değişeceğini ve eylemlerin neye yol açacağını temsil edebilmesidir. 

## **10. Okuyucu için zihinsel model** 

Bu alanı anlamak için AI’i tek bir “büyük beyin” gibi değil, üç katmanlı bir sistem gibi düşünmek daha doğru olur. 

İlk katman temsil katmanıdır. Burada soru şudur: Model dünyadan gelen sinyali nasıl temsil ediyor? Text-only LLM metni token dizisi olarak temsil eder. Vision-language model görüntü ve metni ortak temsil alanına taşır. Multimodal model daha fazla sinyali aynı sistem içinde işler. World model ise yalnızca görünen veriyi değil, verinin arkasındaki durumları ve değişim kurallarını temsil etmeye çalışır. 

İkinci katman hesaplama katmanıdır. Burada soru şudur: Bu temsil hangi maliyetle işleniyor? Büyük model güçlüdür ama pahalıdır. Küçük model hızlıdır ama kapsamı sınırlıdır. Quantization belleği azaltır. Distillation davranışı sıkıştırır. Pruning fazlalığı budar. Routing ve cascading hesaplamayı seçici kullanır. Efficient inference, modelin pratikte nerede ve nasıl kullanılabileceğini belirler. 

Üçüncü katman sistem katmanıdır. Burada soru şudur: Tek model mi, model ağı mı? Gelecek yönü büyük ihtimalle tek dev modelin her şeyi yapması değil, farklı modellerin ve temsil düzeylerinin birlikte çalışmasıdır. Bir sistemde küçük model ilk değerlendirmeyi yapabilir, multimodal encoder görsel sinyali temsil edebilir, büyük model zor muhakemeyi üstlenebilir, doğrulama katmanı güvenilirliği kontrol edebilir, world model benzeri bileşen ise zaman ve eylem boyutunu modelleyebilir. 

Bu zihinsel modelle bakınca “AI daha da büyüyecek mi?” sorusu yetersiz kalır. Daha iyi soru şudur: Hangi görev için hangi modalite, hangi temsil, hangi model boyutu, hangi hesaplama bütçesi ve hangi yönlendirme stratejisi gerekir? 

## **11. Araştırma Sonrası Netleşenler** 

Bu konuda en yaygın ama yanlış basitleştirme, multimodal AI’ı “metin modeline resim eklemek” olarak görmektir. Bu yüzeysel bir tanımdır. Asıl problem, farklı sinyallerin ortak, tutarlı, grounded ve gerektiğinde zamansal-dinamik bir temsil içinde birleşmesidir. 

Kaynaklarla güçlü desteklenen iddia şudur: Büyük ölçekli görüntü-metin hizalaması güçlü genelleme sağlar; quantization, distillation, attention optimizasyonu ve speculative decoding gibi efficient inference teknikleri model kullanılabilirliğini ciddi biçimde değiştirir; küçük modeller doğru veri ve doğru görev sınırıyla şaşırtıcı ölçüde etkili olabilir. 

7 

Henüz spekülatif veya en azından tam çözülmemiş iddia şudur: Mevcut multimodal modellerin dünyayı insan benzeri anlamda modellediği net değildir. Video üretimi, görsel soru cevaplama veya görüntü açıklama başarısı, tek başına sağlam bir world model kanıtı değildir. World model iddiası için durum, zaman, nedensellik, eylem sonucu ve genelleme birlikte ölçülmelidir. 

Bu konuyu anlamak, önceki AI/LLM belgelerindeki “LLM = AI’in merkezi formu” fikrini değiştirir. LLM hâlâ merkezîdir, çünkü dil soyutlama ve arayüz açısından çok güçlüdür. Ama AI’in tamamı LLM değildir. Dil modeli, daha geniş bir algı, temsil, verimlilik ve eylem mimarisinin parçası haline gelmektedir. 

Okuyucu bu belgeyi okuduktan sonra şu soruyu daha iyi sormalı: “Bu AI sistemi gerçekten hangi dünyayı temsil ediyor, hangi sinyale dayanıyor, hangi maliyetle çalışıyor ve zorlandığında hangi modele veya temsil düzeyine geçiyor?” 

Belge sonundaki ana sorunun net cevabı şudur: AI’in gelecek yönünü anlamak için sadece daha büyük dil modellerine bakmak yetmez; çünkü gelecek kırılma yalnızca parametre ölçeğinde değil, modalite çeşitliliği, grounding, dünya dinamikleri, inference maliyeti, model seçimi, cihaz üstü çalışma ve sistem mimarisi düzeyinde yaşanıyor. 

## **12. Kaynakça** 

1. Radford, A. et al. “Learning Transferable Visual Models From Natural Language Supervision.” 2021. CLIP çalışması, görüntü ve metni ortak temsil uzayına hizalama fikrinin güçlü erken örneklerinden biridir. 

2. Jia, C. et al. “Scaling Up Visual and Vision-Language Representation Learning With Noisy Text Supervision.” 2021. ALIGN, büyük ölçekli gürültülü görüntü-metin verisiyle hizalama yaklaşımını gösterir. 

3. Alayrac, J.-B. et al. “Flamingo: A Visual Language Model for Few-Shot Learning.” 2022. Görsel encoderlar ile dil modellerinin few-shot multimodal sistemlerde nasıl birleştirilebileceğini gösterir. 

4. Li, J. et al. “BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models.” 2023. Görsel model ile LLM arasında daha verimli bir köprü kurma yaklaşımı açısından önemlidir. 

5. Liu, H. et al. “Visual Instruction Tuning.” 2023. LLaVA çizgisi, instruction tuning yaklaşımının multimodal modellere uygulanmasını göstermesi açısından önemlidir. 

6. OpenAI. “GPT-4V(ision) System Card.” 2023. Multimodal model güvenliği, görsel hata türleri ve sınırlamalar açısından önemli teknik rapordur. 

7. Team Gemini, Google. “Gemini: A Family of Highly Capable Multimodal Models.” 2023. Native multimodal model iddiası ve geniş modalite kapsamı açısından önemli teknik rapordur. 

8. Ha, D. and Schmidhuber, J. “World Models.” 2018. World model fikrinin modern deep learning ve reinforcement learning bağlamındaki temel çalışmalarından biridir. 

9. LeCun, Y. “A Path Towards Autonomous Machine Intelligence.” 2022. JEPA fikri ve dünya modeli tartışmasını temsil öğrenme perspektifinden çerçeveleyen önemli metindir. 

8 

10. Assran, M. et al. “Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture.” 2023. I-JEPA, piksel üretimi yerine temsil düzeyinde tahmin yapma fikrini somutlaştırır. 

11. Bardes, A. et al. “V-JEPA: Revisiting Feature Prediction for Learning Visual Representations from Video.” 2024. Video üzerinden temsil düzeyinde tahmin ve dünya dinamiklerine daha yakın öğrenme hedefi açısından önemlidir. 

12. Hafner, D. et al. “DreamerV3: Mastering Diverse Domains through World Models.” 2023. Latent dünya modeli üzerinden öğrenme ve planlama çizgisinin güçlü örneklerinden biridir. 

13. Dettmers, T. et al. “LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale.” 2022. Büyük dil modellerinde quantization ile verimli inference konusunun temel çalışmalarındandır. 

14. Frantar, E. et al. “GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers.” 2022/2023. Post-training quantization yaklaşımının LLM’lerde kalite-maliyet dengesini nasıl etkilediğini gösterir. 

15. Xiao, G. et al. “SmoothQuant: Accurate and Efficient Post-Training Quantization for Large Language Models.” 2022/2023. Aktivasyon ve ağırlık quantization problemini dengelemesi açısından önemlidir. 

16. Lin, J. et al. “AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration.” 2023. Aktivasyon duyarlı ağırlık quantization yaklaşımını temsil eder. 

17. Dao, T. et al. “FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness.” 2022. Transformer inference ve training verimliliği açısından kritik attention optimizasyonudur. 

18. Leviathan, Y. et al. “Fast Inference from Transformers via Speculative Decoding.” 2023. Küçük modelin aday üretip büyük modelin doğruladığı cascading benzeri verimli decoding yaklaşımını gösterir. 

19. Fedus, W. et al. “Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity.” 2021. Mixture-of-Experts ve sparse activation yoluyla kapasite-maliyet ayrımını tartışır. 

20. Abdin, M. et al. “Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone.” 2024. Küçük modellerin yüksek kaliteli veri ve doğru eğitimle güçlü olabileceğini gösteren teknik rapordur. 

9 

