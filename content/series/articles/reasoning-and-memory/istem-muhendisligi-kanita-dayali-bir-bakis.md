---
article_id: article_51d77c35-dfb2-4404-8243-e24d2d3666a4
title: "İstem Mühendisliği: Kanıta Dayalı Bir Bakış"
slug: istem-muhendisligi-kanita-dayali-bir-bakis
category: reasoning-and-memory
level: intermediate
reading_order: 22
summary: "Pencerenin içine ne yazılacağı sorusunu ölçümle ele alır: anlamı değiştirmeyen biçim farklarının yarattığı puan aralığı, örnek sırasının etkisi, rol verme ve kibarlık gibi halk kurallarının sınanmış hâli, ara adımların kazancının hangi alanlarda gerçek olduğu ve insanların neden sistematik değil fırsatçı denediği."
tags:
  - istem-muhendisligi
  - bicim-duyarliligi
  - rol-istemi
  - kanit
  - olcum-disiplini
content_hash: sha256:85f87b2498ee2362f78de70aea98ec8aa3821c41bd6dfeefb2224da951f7bd82
classification_version: 1
classification_batch: 4
---
## Bir alanın kanıt sorunu

21\. makale pencerenin geometrisini kurdu: ne kadar yer var, sınır nereden geliyor, bilgiyi nereye koymak gerekiyor. Geriye tek soru kaldı — içine ne yazılacak?

Bu soru etrafında, alanın en kalabalık halk bilgisi birikti. Modele kibar davranmak, ona bir uzman rolü vermek, bahşiş vaat etmek, "derin bir nefes al" demek, cezayla tehdit etmek. Bu kuralların ortak özelliği, birinin bir kez denemiş ve işe yaramış olması.

Oysa 16\. makalede bir şeyi öğrenmiştik: bir modelin bir görevdeki başarısı tek bir denemeden okunamaz. Aynı disiplini şimdi kendi istemlerimize uygulayacağız. Bu makale bir teknik listesi değil; hangi iddiaların ölçüldüğünde ayakta kaldığını ve ölçmenin nasıl yapıldığını anlatıyor. Adına **istem mühendisliği** (prompt engineering) denen işin, mühendislik sayılabilmesi için gereken şey de tam olarak bu.

## Ölçülen ilk şey: biçim

Başlangıç noktası rahatsız edici bir ölçüm ve 16\. makalede bir kez karşılaşmıştık; şimdi ona başka bir soruyla dönüyoruz.

Melanie Sclar ve arkadaşlarının ICLR 2024'te sunduğu çalışma, anlamı hiç değiştirmeyen biçim farklarının etkisini ölçtü: iki nokta üst üste yerine tire kullanmak, bir boşluk eklemek, şıkları rakam yerine harfle işaretlemek, alanları farklı ayırmak. Bu farkları üreten bir dilbilgisi tanımlayıp elli üç görevde, görev başına yüzlerce eşdeğer biçim ürettiler.

16\. makalede tepe noktasını görmüştük: 13 milyar parametreli bir modelde aynı görevde biçim değiştirmenin yarattığı doğruluk aralığı 76 puana kadar çıkıyordu. Şimdi dağılımın tamamına bakalım, çünkü asıl pratik bilgi orada.

Görevler arasında **ortanca** aralık, aynı modelde 7,5 puan. Yani uç örnek 76 puan olsa da tipik bir görevde biçim değiştirmek yaklaşık yedi buçuk puanlık bir oynama getiriyor. Daha büyük ve daha yetenekli bir kapalı modelde — ölçümde GPT-3.5 — ortanca aralık 6,4 puana iniyor, ama uç değeri hâlâ 56 puan. Yani duyarlılık ölçekle azalıyor, kaybolmuyor.

![Soldan sağa artan doğruluk yönünde, anlamı birebir aynı olan çok sayıda istem biçiminin verdiği sonuçlar dağınık noktalar hâlinde gösterilir. Noktaların üstünde, en düşük biçimden en yüksek biçime uzanan bir aralık çizgisi vardır; noktalardan biri büyütülüp vurgulanmış ve tek denemede görülen sonuç olarak etiketlenmiştir.](assets/ayni-gorev-farkli-bicim.svg "Şekil 1 — Tek deneme, dağılımdan çekilmiş tek nokta")

Şekil 1'in söylediği şey bu makalenin çekirdeği. Bir istem denediğinde gördüğün sayı, o istemin "gerçek" başarısı değil; eşdeğer biçimlerin oluşturduğu bir dağılımdan çekilmiş tek bir noktadır. İki istemi tek denemeyle karşılaştırmak, iki dağılımı birer örnekle karşılaştırmak demektir.

Çalışmanın üçüncü bulgusu bu sonucu daha da keskinleştiriyor: iyi biçimler modeller arasında taşınmıyor. Hangi biçimin iyi çalıştığı modele göre değişiyor ve iki modelin karşılaştırmasında, yalnızca biçimi değiştirerek "hangisi daha iyi" sonucunu ters çevirme olasılığı yüzde 14 ile 47 arasında ölçülmüş. Yani bir modelde bulduğun en iyi istemi başka bir modele taşımak, sonucu garanti etmiyor.

Bunun bir sonucu da yayımlanmış ölçümlere düşüyor. Bir çalışma iki modeli karşılaştırıp birini önde gösteriyorsa, o sıralamanın kullanılan tek istem biçimine bağlı olma ihtimali gerçek — 16\. makalede liderlik tablolarını bu yüzden dikkatle okumak gerektiğini söylemiştik. Aynı uyarı kendi ölçümlerin için de geçerli. Bir ayrıntı umudu iyice kırıyor: isteme bir örnek yerine beş örnek koymak da bu duyarlılığı ortadan kaldırmıyor.

## Sıra da bir biçimdir

Aynı kırılganlığın ikinci yüzü, isteme örnek koyduğunda ortaya çıkıyor.

Yao Lu ve arkadaşlarının ACL 2022'de yayımladığı çalışma, isteme konan birkaç çözülmüş örneğin **sırasını** değiştirmenin etkisini ölçtü. İçerik sabit: aynı örnekler, aynı sayıda. Değişen tek şey hangisinin önce geldiği. Sonuç, alanın en çok alıntılanan cümlelerinden biri: bazı sıralamalar alanın en iyi sonucuna yaklaşırken, bazıları rastgele tahmin düzeyine düşüyor.

Burada da aynı taşınmazlık var: bir model için iyi olan sıralama, başka bir model için iyi olmuyor. Yazarların çözümü ise bu makalenin sonunda döneceğimiz fikri önceden söylüyor — sıralamayı sezgiyle seçmek yerine, modelin kendi ürettiği bir doğrulama kümesiyle otomatik olarak seçmek. Bu yolla on bir sınıflandırma görevinde göreli yüzde 13'lük bir iyileşme elde ediyorlar.

Örneklerin niye ve nasıl işe yaradığı — ağırlıklar hiç değişmeden modelin "öğreniyor" görünmesi — başlı başına bir konu ve 23\. makalenin tamamı ona ayrılmış. Burada kaydedilecek şey yalnızca duyarlılığın kendisi.

## Halk bilgisi sınavda

Şimdi en çok tekrarlanan iki kurala bakalım. İkisi de ölçülmüş.

**Modele rol vermek.** "Sen deneyimli bir hukukçusun" gibi bir cümleyle modele kimlik yüklemek — alandaki adıyla bir **rol** (persona) vermek — en yaygın öneri. Mingqian Zheng ve arkadaşlarının EMNLP 2024 Bulguları'nda yayımladığı çalışma bunu düzenli biçimde sınadı: altı ilişki türü ve sekiz uzmanlık alanından 162 rol, 16\. makalede tanıştığımız MMLU'dan seçilmiş 2.410 olgusal soru, dört model ailesinden dokuz model. Sonuç açık: rol eklemek, hiç rol eklememeye kıyasla anlamlı bir iyileşme sağlamıyor. Alanla uyumlu roller çok küçük bir katkı gösteriyor, ama etki büyüklüğü pratikte kayda değer değil.

Aynı çalışmanın ikinci bulgusu daha da öğretici. Her soru için, o soruyu doğru cevaplatan bir rol **bulunabiliyor**; ama hangisinin işe yarayacağını önceden kestirmek mümkün değil. Yazarlar benzerlik temelli yöntemlerden eğitilmiş sınıflandırıcılara kadar birkaç otomatik seçim yolu denedi; hepsi rastgele seçimle aynı düzeyde kaldı. Yani rollerin etkisi vardır ama öngörülemez — bu da onları bir teknik değil bir gürültü kaynağı yapar.

Kaydedilen küçük düzenlilikler de kuralı değil, etkinin ne kadar zayıf olduğunu gösteriyor: cinsiyet belirtmeyen roller belirtenlerden biraz daha iyi sonuç veriyor ve "bir hukukçuyla konuşuyorsun" biçimindeki dinleyici tarifi, "sen bir hukukçusun" biçimindeki konuşmacı tarifinin biraz önünde. İki fark da küçük ve üzerine yöntem kurulacak büyüklükte değil.

**Kibar olmak.** Ziqi Yin ve arkadaşlarının EMNLP 2024 ile birlikte düzenlenen bir çalıştayda sunduğu çalışma, aynı soruları sekiz farklı kibarlık düzeyinde soruyor — en nazikten en kabaya doğru — ve bunu İngilizce, Çince ve Japonca için ayrı ayrı yapıyor.

Sayılar iki ayrı cümleyi destekliyor ve bu iki cümle aynı şey değil. İngilizcede GPT-3.5'in doğruluğu en nazik düzeyde 60,02 iken en kaba düzeyde 51,93'e düşüyor; Llama 2'nin 70 milyar parametreli sürümünde düşüş çok daha sert: 55,11'den 28,44'e. Yani **kabalık zarar veriyor**. Ama en yüksek puanlar hep en nazik uçta değil: aynı ölçümde GPT-4 en iyi sonucunu sekiz düzeyin dördüncüsünde veriyor (79,09) ve en kötü sonucu en kaba düzeyde değil üçüncü düzeyde alıyor. Japoncada tablo daha da farklı — GPT-3.5'in en iyi sonucu ölçeğin alt ucuna yakın ikinci düzeyde çıkıyor (51,98) ve yalnızca en kaba düzey ayrık biçimde kötü (44,80).

Yazarların sonucu şu: en iyi kibarlık düzeyi dile göre değişiyor. 15\. makalede dilin nötr bir değişken olmadığını token maliyeti üzerinden görmüştük; burada aynı şey davranış üzerinden görünüyor.

> **Kendini yokla:** "Kibar olmak işe yarıyor" ile "kabalık zarar veriyor" aynı iddia mı?

Değil, ve fark pratikte önemli. Ölçüm, kaba istemlerin sonucu bozduğunu destekliyor; nazik istemlerin sonucu iyileştirdiğini desteklemiyor. Aradaki bölge — sıradan, nötr, açık bir talimat — çoğu durumda en iyilerden biri. "Lütfen" eklemenin bir bedeli yok, ama onu bir teknik saymak, olmayan bir kazancı beklemek demek.

Listenin geri kalanı — bahşiş vaat etmek, cezayla tehdit etmek, işin ne kadar önemli olduğunu söylemek — aynı sınıfa giriyor ve ortak bir sorunları var. Bu iddiaların çoğu tek bir modelde, tek bir görevde ve biçim değişkeni sabitlenmeden denenmiş durumda. Şekil 1'i hatırla: böyle bir kurulumda ölçülen birkaç puanlık kazancın cümlenin anlamından mı, yoksa isteme eklenen fazladan bir satırın biçim etkisinden mi geldiğini ayırmak mümkün değil. Bu, iddiaların yanlış olduğu anlamına gelmiyor; **ölçülmemiş** olduğu anlamına geliyor. Bu ikisini birbirinden ayırmak, bu makalenin asıl meselesi.

## Peki ne işe yarıyor

Bu kadar olumsuz bulgudan sonra makul soru şu: elimizde ne kalıyor?

Ölçümlerin ortak deseni cevabı da veriyor. Sonucu en çok oynatan şeyler, istemde **belirsiz bırakılmış** olanlardı: biçim ayrıntıları, örneklerin sırası, modelin hangi kimlikle konuştuğu. Model bu boşlukları eğitim verisinden gelen eğilimleriyle dolduruyor ve hangi eğilimin devreye gireceğini önceden bilmenin yolu yok. Buradan doğrudan bir kural çıkıyor: kararı sen vermezsen model verir.

Pratikte bu, görevin ve çıktının açıkça tarif edilmesi demek — ne isteniyor, hangi biçimde, hangi uzunlukta, hangi durumda cevap verilmemeli. Bunların hiçbiri sihirli cümle değil; hepsi belirsizlik kaldıran kısıtlar. 21\. makaledeki bulgu da aynı yöne bakıyordu: pencereye ilgisiz metin eklemek zarar veriyordu, çünkü modelin neye bakması gerektiği belirsizleşiyordu.

İkinci kaldıraç örnekler. İsteme birkaç çözülmüş örnek koymak, bir görevi tarif etmenin en doğrudan yolu; sıralamaya duyarlı olsa bile etkisi gerçek ve büyük. Mekanizması 23\. makalenin konusu.

Üçüncüsü, dar bir alanda, ara adımlar — sınırını birazdan Şekil 2 çizecek.

Dikkat çeken şey, bu üç kaldıracın da "modele nasıl davranmalı" sorusuyla ilgisiz olması. Üçü de "göreve dair belirsizliği nasıl azaltırım" sorusunun cevabı.

## Ara adımlar gerçekten ne kadar kazandırıyor

Halk bilgisinin en güçlü üyesi ise başka: modelden cevabı doğrudan vermek yerine adım adım düşünmesini istemek.

Bu kez elimizde tek bir çalışma değil, bir meta-analiz var. Zayne Sprague ve arkadaşlarının ICLR 2025'te sunduğu çalışma, 110 makaledeki 1.218 karşılaştırmayı taradı ve buna ek olarak 20 veri kümesinde 14 modeli kendisi ölçtü. Soru sade: ara adımlar istemek ne kadar kazandırıyor ve nerede?

Cevap, tekniğin ününe göre çok dar. Ortalama kazanç sembolik akıl yürütmede 14,2 puan, matematikte 12,3 puan, mantık görevlerinde 6,9 puan. Bunların dışında kalan bütün görev türlerinde ortalama kazanç **0,7 puan**.

![Dört görev türü için ara adım isteme tekniğinin ortalama puan kazancı çubuklarla gösterilir: sembolik akıl yürütme, matematik ve mantık belirgin kazanç çubuklarına sahipken dördüncü çubuk olan diğer bütün görevler neredeyse sıfıra yakındır.](assets/ara-adimlarin-kazanci.svg "Şekil 2 — Kazanç var, ama her yerde değil")

Şekil 2'nin okunma biçimi önemli. Bu, "ara adımlar işe yaramıyor" demiyor; matematik ve sembolik işlemde kazanç gerçek ve büyük. Dediği şu: tekniğin bir uygulama alanı var ve bu alan, tekniğin uygulandığı alandan çok daha dar. Özet yazdırırken, metin düzenletirken ya da bir soruya kısa cevap isterken "adım adım düşün" demenin ölçülen ortalama getirisi, gürültüden ayırt edilemeyecek kadar küçük.

Ara adımların **neden** matematikte işe yaradığı — modelin hesabı üretim adımlarına yayması ve ürettiği her adımın bir sonraki adımda bağlama girmesi — 32\. makalenin konusu. 15\. makalede bu fikrin küçük bir hâlini görmüştük: modele sayıyı önce virgüllü biçimde tekrar ettirmek, tokenizer'ın böldüğü yerden kaybedilen doğruluğu geri getiriyordu.

## İnsan neden kötü bir istem mühendisi

Ölçümler bu kadar netse, halk bilgisi neden bu kadar kalabalık? Cevabı, alanın kendisini inceleyen bir çalışma veriyor.

J.D. Zamfirescu-Pereira ve arkadaşlarının CHI 2023'te sunduğu araştırma, yapay zekâ uzmanı olmayan on kişiye bir istem tasarım aracı verdi ve bir sohbet botunu iyileştirmelerini istedi. Araç, istemleri sistematik olarak denemeye ve karşılaştırmaya izin verecek biçimde tasarlanmıştı.

Katılımcılar bu imkânı kullanmadı. Yazarların ifadesiyle istem tasarımını **sistematik değil fırsatçı** biçimde keşfettiler: bir değişiklik yapıp tek bir örnekte denediler, sonuç iyiyse kuralı benimsediler, kötüyse başka bir şey denediler.

İki engel bulundu ve ikisi de bu makalenin bütün bulgularını açıklıyor. Birincisi **tek gözlemden genelleme**: bir istem değişikliğinin bir seferlik başarısı ya da başarısızlığı, genel bir kurala dönüştürülüyor. Şekil 1'i hatırla — tek deneme, dağılımdan çekilmiş bir noktaydı; o noktadan kural çıkarmak, kaçınılmaz olarak yanlış kurallar üretir. İkincisi **insandan insana talimat alışkanlığı**: katılımcılar modelden, bir insana verilen talimatın anlaşılacağı gibi anlaşılmasını bekliyorlar.

İnternetteki istem tavsiyelerinin çoğu tam olarak bu iki mekanizmanın ürünü. Kimse yalan söylemiyor; herkes bir noktayı dağılım sanıyor.

## Aramanın sezgiyi yenmesi

Yapıcı sonuç da aynı yerden geliyor. Eğer iyi istem, sezgiyle değil ölçmeyle bulunuyorsa, ölçmeyi otomatikleştirmek mümkün olmalı.

Yongchao Zhou ve arkadaşlarının ICLR 2023'te sunduğu çalışma bunu yaptı: bir dil modeline, örnek girdi-çıktı çiftlerine bakarak aday talimatlar ürettirdiler, adayları bir hedef model üzerinde puanladılar ve en iyisini seçtiler. Yirmi dört görevin yirmi dördünde, otomatik bulunan talimat insan eliyle yazılmış talimatı yakaladı ya da geçti.

En çarpıcı örnek ise ara adımlar konusunda. Takeshi Kojima ve arkadaşlarının NeurIPS 2022'de gösterdiği "adım adım düşünelim" cümlesi, alandaki en ünlü istem hilesiydi. Otomatik arama bunun yerine daha uzun bir cümle buldu — doğru cevaba ulaştığımızdan emin olmak için adım adım ilerleyelim anlamında — ve iki matematik kümesinde daha iyi sonuç verdi: 78,7'ye karşı 82,0 ve 40,7'ye karşı 43,0.

Bu sayılar 2022'nin modelleriyle alınmıştır ve bugünkü modellerde aynı çıkacağının garantisi yok. Zaten çıkarılacak ders belirli bir cümle değil: en iyi istemi bulan şey, insanın sezgisi değil sistematik aramaydı.

## Geriye kalan disiplin

Bütün bunlardan çıkan yöntem sade ve 16\. makaledeki listeyle aynı ailedendir.

**Bir küme kur.** Cevabı bilinen, en az birkaç düzine örnekten oluşan bir küme olmadan hiçbir istem karşılaştırması yapılamaz. Tek örnek üzerinde yapılan karşılaştırma bilgi taşımaz.

**Biçimi de değiştir.** İki istemi karşılaştırırken her birini birkaç eşdeğer biçimde dene. İkisinin dağılımları çakışıyorsa aradaki fark yoktur.

**Farkın büyüklüğünü kümeye göre oku.** Somut yapalım. Elinde 50 örneklik bir küme varsa, tek bir örnek doğrudan yanlışa geçtiğinde puan 2 birim oynar; iki istem arasında ölçtüğün 4 puanlık fark yalnızca iki örnek demektir. Oysa yukarıda gördük: hiçbir şeyi değiştirmeden yalnızca biçimi oynatmak tipik bir görevde 7,5 puanlık bir aralık yaratıyor. Yani 50 örneklik bir kümede 4 puanlık fark, biçim gürültüsünün yarısı kadar bile değil — hiçbir şey söylemiyor. O farkı anlamlı kılmanın iki yolu var: kümeyi büyütmek ya da her istemi birden çok biçimde çalıştırıp dağılımları karşılaştırmak. Bu ölçünün biçimsel kurulumunu — anlamlı fark, örneklem büyüklüğü, güven aralığı — 101\. makalede yapacağız.

**Model değişince baştan ölç.** Ne biçim tercihleri ne örnek sıralamaları modeller arasında taşınıyor. Sağlayıcı bir sürüm güncellediğinde elindeki istemler yeniden ölçülmemiş sayılır.

Bunlar kulağa ağır geliyorsa, ölçüsüz alternatifin ne olduğunu hatırlamak yeterli: internetteki tavsiyeleri toplamak ve hangisinin senin görevinde işe yaradığını hiç bilmemek.

Son bir kayıt: bu makaledeki ölçümlerin tamamı belirli modellerle ve belirli tarihlerde yapıldı; modeller değiştikçe sayılar da değişecek. Değişmeyecek olan yöntem — bir iddiayı ölçmeden kural saymamak — bu makalenin asıl kalıcı kısmı.

### Sırada ne var

Bu makale boyunca isteme örnek koymanın etkisini ölçtük ama bir soruyu bilinçli olarak atladık. İsteme birkaç çözülmüş örnek koyduğunda modelin ağırlıklarında hiçbir şey değişmiyor — 19\. makaledeki hiçbir mekanizma çalışmıyor, tek bir gradyan hesaplanmıyor. Yine de model, o örneklerden görevi anlamış gibi davranıyor ve sıralamaları bile önemsiyor. Ağırlıklar sabitken "öğrenme" görüntüsü veren şey tam olarak nedir?

## Kaynakça

- Sclar, M., Choi, Y., Tsvetkov, Y. & Suhr, A. (2024). *Quantifying Language Models' Sensitivity to Spurious Features in Prompt Design*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=RIu5lyNXjT)
- Lu, Y., Bartolo, M., Moore, A., Riedel, S. & Stenetorp, P. (2022). *Fantastically Ordered Prompts and Where to Find Them: Overcoming Few-Shot Prompt Order Sensitivity*. ACL 2022, s. 8086–8098. [Bağlantı](https://aclanthology.org/2022.acl-long.556/)
- Zheng, M., Pei, J., Logeswaran, L., Lee, M. & Jurgens, D. (2024). *When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models*. Findings of EMNLP 2024, s. 15126–15154. [Bağlantı](https://aclanthology.org/2024.findings-emnlp.888/)
- Yin, Z., Wang, H., Horio, K., Kawahara, D. & Sekine, S. (2024). *Should We Respect LLMs? A Cross-Lingual Study on the Influence of Prompt Politeness on LLM Performance*. SICon 2024 çalıştayı, s. 9–35. [Bağlantı](https://aclanthology.org/2024.sicon-1.2/)
- Sprague, Z., Yin, F., Rodriguez, J. D. ve ark. (2025). *To CoT or not to CoT? Chain-of-thought helps mainly on math and symbolic reasoning*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=w6nlcS8Kkn)
- Zamfirescu-Pereira, J. D., Wong, R. Y., Hartmann, B. & Yang, Q. (2023). *Why Johnny Can't Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts*. CHI 2023. [Bağlantı](https://dl.acm.org/doi/10.1145/3544548.3581388)
- Zhou, Y., Muresanu, A. I., Han, Z., Paster, K., Pitis, S., Chan, H. & Ba, J. (2023). *Large Language Models Are Human-Level Prompt Engineers*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=92gvk82DE-)
- Kojima, T., Gu, S. S., Reid, M., Matsuo, Y. & Iwasawa, Y. (2022). *Large Language Models are Zero-Shot Reasoners*. NeurIPS 2022, s. 22199–22213. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/8bb0d291acd4acf06ef112099c16f326-Abstract-Conference.html)
