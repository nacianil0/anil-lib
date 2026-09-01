---
article_id: article_8733b936-e571-41fa-bead-9f8d1274d9eb
title: "Arama ve Planlama: Öz-Tutarlılık ve Ağaçlar"
slug: arama-ve-planlama-oz-tutarlilik-ve-agaclar
category: reasoning-and-memory
level: intermediate
reading_order: 36
summary: "Aynı soruya farklı yollardan gidip cevapları oylamanın neden işe yaradığını, en olası zinciri seçmenin neden daha kötü olduğunu, kazancın kaç yolda doyduğunu ve bağımsız adaylar yerine bir arama ağacı kurmanın hangi görevlerde zorunlu hâle geldiğini ölçümlerle kurar."
tags:
  - oz-tutarlilik
  - cogunluk-oyu
  - arama
  - planlama
  - cikarim-aninda-hesap
content_hash: sha256:e3664fb1d15e0e304cf7f5719329f4ce03f20ea7ca53a5b723f40f0b807b9726
classification_version: 1
classification_batch: 8
---
## Doğrulayıcısız seçmek

35\. makalede seçim işini bir doğrulayıcıya verdik ve bunun bedelini gördük: doğrulayıcı ayrıca eğitilmesi gereken bir bileşendir, aday sayısı büyüyünce kandırılır, ve modelin kendisi olduğunda doğru cevapları reddeder.

O hâlde şunu soralım: adaylar arasından seçim yapmak için gerçekten üçüncü bir bileşene ihtiyaç var mı? Adayların birbirine bakması yetmez mi?

33\. makalede bu yolun adını koymuştuk — **çoğunluk oyu**: adayların verdiği cevaplar sayılır, en çok tekrarlanan seçilir. 34\. makalede de bir kez kullandık; akıl yürütmeye eğitilmiş bir modelin tek denemedeki yüzde 77,9'luk başarısı, aynı modelden birçok cevap alıp en sık tekrarlananı seçince yüzde 86,7'ye çıkıyordu.

Bu makale o yöntemin tam kurulumu. Sorular şunlar: farklı zincirlerin aynı cevapta buluşması neden bilgi taşıyor, kazanç kaç yolda doyuyor, neden **en olası** zinciri seçmek daha kötü sonuç veriyor, ve adayları bağımsız çekmek yerine bir ağaç kurmak ne kazandırıp ne kaybettiriyor?

## Aynı sorudan çıkan farklı yollar

Mekanizmanın çekirdeği 10\. makaledeki cümlede: üretim bir çekiliştir. Sıcaklık sıfırın üstündeyse aynı istem her seferinde farklı bir zincir üretir ve 32\. makalede gördüğümüz gibi o zincir cevabı belirler.

Xuezhi Wang, Jason Wei ve arkadaşlarının ICLR 2023'te sunduğu çalışma buradan basit ama ince bir sonuç çıkarıyor. Bir soruya birden çok zincir üretirsen, oylanacak şey zincirler değil **cevaplardır**. Doğru cevaba götüren birbirinden farklı çok sayıda geçerli yol vardır ve hepsi aynı sayıda buluşur; yanlış yolların vardığı yerler ise birbirinden de farklıdır. Yani anlaşma, doğruluk lehine bir kanıttır.

![Üstte aynı soru kutusu vardır; ondan aşağıya doğru beş kutu dallanır ve her biri kendi yolunu izleyen bir zinciri temsil eder. Zincirlerden üçü kalın çizgilerle aynı cevap kutusunda buluşur; bu kutu vurgulanmış ve altına üç zincir yazılmıştır. Kalan iki zincir ince çizgilerle birbirinden de farklı iki ayrı cevaba varır ve her birinin altında bir zincir yazar. Şeklin altında sayımın zincirler üzerinde değil cevaplar üzerinde yapıldığı, doğruya giden farklı yolların aynı yerde buluştuğu, yanlışa gidenlerin ise dağıldığı belirtilir.](assets/yollar-ve-bulusma.svg "Şekil 1 — Anlaşma neden bilgi taşıyor")

Şekil 1'deki asimetri yöntemin bütün gerekçesi. Bir sorunun doğru cevabı tektir, yanlış cevapları ise çoktur; bu yüzden hata yapan zincirlerin aynı yanlışta buluşması, doğru zincirlerin doğruda buluşmasından daha zordur.

Çalışmanın bu düzene verdiği ad **öz-tutarlılık** (self-consistency): tek bir zincire güvenmek yerine, aynı sorudan çıkan birçok zincirin aynı cevapta ne kadar uzlaştığına bakmak. 33\. makaledeki çoğunluk oyu bunun karar kuralı; öz-tutarlılık ise o kuralın ara adımlı üretimle birleştirilmiş tam hâli. Adındaki "öz" sözcüğü, uzlaşmanın dışarıdan bir hakemle değil modelin kendi üretimleri arasında aranmasına işaret ediyor.

Küçük bir hesap bu asimetriyi somutlaştırıyor. Modelin bir soruyu tek denemede doğru çözme olasılığı 0,4 olsun ve yanlış gittiğinde her seferinde **başka bir** yanlış cevaba varsın. Beş zincir çektiğimizde doğru cevabın en az iki kez gelme olasılığı 1 − 0,6⁵ − 5 × 0,4 × 0,6⁴, yani yaklaşık 0,663. Yanlışlar dağıldığı için iki kez tekrarlanan cevap sayımı kazanır. Tek zincirle yüzde 40 olan başarı, beş zincirle yüzde 66'ya çıkıyor — ve tek satırlık bu hesabın tamamı, yanlışların dağıldığı varsayımına dayanıyor. Varsayımın çöktüğü yerde ne olduğunu birazdan göreceğiz.

Bu, aynı zamanda yöntemin sınırını da belirliyor. Oylama, ancak cevap **sabit bir kümeden** geliyorsa yapılabilir: bir sayı, bir şık, bir kısa dize. Serbest metinde iki cevabın "aynı" olup olmadığını söyleyecek bir ölçüt yoktur — 30\. makaledeki biçim sözleşmelerinin buradaki karşılığı bu. Çalışmanın kendisi de bu kısıtı açıkça yazıyor.

## Ölçülen kazanç ve doyma

Ölçüm düzeneği şöyle: soru başına kırk zincir örnekleniyor, deney on kez tekrarlanıyor, karşılaştırma noktası tek bir açgözlü zincir. 540 milyar parametreli bir modelde sonuçlar:

| Küme | tek zincir | kırk zincirin oyu |
|---|---|---|
| ilkokul matematiği | 56,5 | 74,4 |
| çoktan seçmeli cebir | 35,8 | 48,3 |
| değiştirilmiş kelime problemleri | 79,0 | 86,6 |
| çok adımlı sağduyu | 75,3 | 81,6 |
| fen soruları (zor küme) | 85,2 | 88,7 |

İki gözlem önemli. Birincisi, kazanç model büyüdükçe **artıyor**: 20 milyar parametreli bir modelde ilkokul matematiği 4,1'den yalnızca 7,3'e çıkıyor, oysa 137 milyar parametreli bir modelde başka bir matematik kümesinde 51,8'den 75,7'ye sıçrıyor. Sebebi kapsamada: oylamanın seçebilmesi için doğru cevabın adaylar arasında bulunması gerekir, ve küçük modelde çoğu zaman bulunmuyor.

İkincisi, kazanç ucuz ve ayara duyarsız. Çalışmanın kendi tavsiyesi beş ile on yol; performans çoğu durumda hızla doyuyor ve kırk yola çıkmak son birkaç puanı topluyor. Ayrıca 10\. makaledeki kesme kurallarının hangisiyle örneklendiği — sıcaklık, top-k ya da çekirdek örnekleme — sonucu kayda değer biçimde değiştirmiyor; yöntemin ihtiyaç duyduğu tek şey adayların birbirinden farklı olması. Maliyet ise yol sayısıyla doğrusal — 33\. makaledeki muhasebe aynen geçerli, ve paralel eksen olduğu için ön dolum bir kez ödeniyor.

Bir karşılaştırma bu tabloyu bağlama oturtuyor. Aynı çalışma, ilkokul matematiği kümesinde o güne dek bildirilen en iyi sonucu 55 olarak veriyor — ve o sonuç, 175 milyar parametreli bir modelin ince ayarlanmış hâline **ayrıca eğitilmiş bir doğrulayıcı** eklenerek elde edilmişti; yani 35\. makaledeki düzenek. Oylama, hiçbir ek bileşen eğitmeden bunun üstüne çıkıyor. Doğrulayıcının değeri yok değil — ama bedavaya gelen bir tabanı olduğunu bilmek, onu doğru yerde kullanmayı sağlıyor.

## En olası zincir değil, en olası cevap

Şimdi yöntemin en sezgi kıran tarafına gelelim. Adayları elde ettikten sonra en yüksek olasılıklı zinciri seçmek varken neden sayım yapıyoruz?

Aynı çalışma bunu iki karşılaştırmayla yanıtlıyor. Birincisi, adayları modelin kendi log olasılığına göre sıralayıp en yükseğini almak — örnekle-ve-sırala düzeni. Bu da kazandırıyor, ama oylamadan belirgin biçimde az.

İkincisi daha çarpıcı. 10\. makalede ileri okuma notu düzeyinde geçtiğimiz **ışın araması**, her adımda en olası birkaç devamı canlı tutan bir kod çözme kuralıydı. Işın sayısını artırmak, sezgiye göre daha iyi zincirler vermeliydi:

| Işın / yol sayısı | 1 | 5 | 10 | 20 | 40 |
|---|---|---|---|---|---|
| ışın aramasının en iyi ışını | 23,6 | 19,3 | 16,1 | 15,0 | 10,2 |
| örneklemeli oylama | 19,7 | 24,9 | 25,3 | 26,7 | 26,9 |

Aynı model, aynı küme, aynı bütçe. Işın sayısı büyüdükçe ışın aramasının başarısı **düşüyor**; oylamanınki yükseliyor. Yorum, 30\. makaledeki ayrışmanın bir başka yüzü: en yüksek olasılıklı dizi, en yüksek olasılıklı **cevaba** karşılık gelmez. Bir cevaba giden yüzlerce farklı ifade varsa, o cevabın toplam olasılığı yüksek olsa bile tek tek zincirlerinin her biri düşük olasılıklı kalır. Işın araması olasılığı zincir üzerinde toplar; oylama cevap üzerinde toplar. Aranan şey cevapsa, ikincisi doğru muhasebedir.

Buradan pratik bir sonuç daha çıkıyor. Çeşitlilik bu düzende bir kusur değil, **kaynaktır**. Aynı çalışma, oylamayı ışın aramasıyla üretilen zincirler üzerinde denediğinde sonucun kötüleştiğini de ölçüyor — çünkü ışın araması birbirine benzeyen zincirler üretiyor. Aynı sebeple, istemdeki örneklerin sırasını kırk kez değiştirerek elde edilen bir topluluk 17,1'den ancak 19,2'ye çıkarken, örneklemeli oylama 27,7'ye çıkıyor.

> **Kendini yokla:** Sıcaklığı sıfıra indirmek bu yöntemi neden tamamen bozar?

Çünkü 10\. makaledeki açgözlü seçimde çekiliş yoktur: aynı istem hep aynı zinciri verir. Kırk kopya üretirsin, kırkı da aynıdır, sayım hiçbir bilgi taşımaz. Yöntemin çalışması için adayların birbirinden farklı olması gerekir; kazancın kaynağı modelin belirsizliğinin görünür hâle gelmesidir. Nitekim aynı çalışma, cevaplar arasındaki anlaşma oranının doğrulukla ilişkili olduğunu ve bunun bir belirsizlik ölçüsü olarak kullanılabileceğini de gösteriyor — 16\. makaledeki kalibrasyon sorusunun ucuz bir yaklaşığı.

## Oy vermenin çalışmadığı yer

Oylamanın bir ön koşulu vardı: doğru cevabın adaylar arasında bulunması. Bu koşulun çöktüğü görevlerde ne oluyor?

Shunyu Yao ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma bunu net bir örnekle gösteriyor. Görev basit anlatılıyor: dört sayı verilir, dört işlemle 24 elde edilecektir. Zor sürümden yüz oyunda GPT-4 ile ölçülen sonuçlar:

| Düzen | başarı |
|---|---|
| doğrudan cevap | %7,3 |
| ara adımlı cevap | %4,0 |
| yüz zincirin oyu | %9,0 |
| yüz zincirin en iyisi (cevap anahtarıyla) | %49 |
| ağaç araması, genişlik 1 | %45 |
| ağaç araması, genişlik 5 | %74 |

Üçüncü satır makalenin sessiz dersi: yüz zincirin öz-tutarlılığı yüzde 9'da kalıyor. Oysa dördüncü satır, doğru cevabın o yüz adayın içinde soruların yaklaşık yarısında **bulunduğunu** söylüyor. Aradaki kırk puan yine 33\. makaledeki kapsama-seçim açığı, ve sebebi az önceki hesabın varsayımının burada çökmesi: dört sayıyla yapılan hatalı bir işlem birçok zincirde aynı yanlış sonuca çıkabildiği için yanlışlar dağılmıyor, aksine belirli yanlışlarda toplanıyor. Sayım, toplanan yanlışı seçiyor.

Asıl sorun daha erken. Aynı çalışmanın hata çözümlemesi, ara adımlı örneklerin yaklaşık yüzde 60'ının daha **ilk adımdan** sonra kaybettiğini buluyor: ilk üç sözcük yazıldığı anda oyun bitmiş oluyor. Soldan sağa üretim geri dönemez; 32\. makalede kurduğumuz cümle burada faturayı kesiyor — cevaptan sonra yazılan hiçbir şey cevabı etkileyemez, ve yanlış açılan bir zincirde ilk adımdan sonra yazılan hiçbir şey ilk adımı düzeltemez.

## Ağaç ne yapıyor

Ağaç araması bu tuzağı, üretimi geri dönülebilir kılarak çözüyor. Fikir üç parçadan ibaret.

**Düşünceyi parçalara böl.** Cevabın tamamı yerine bir **ara adım** üretilir; 24 oyununda bu, tek bir işlem ve geriye kalan sayılardır.

**Her parçayı puanla.** Modele, eldeki durumdan hedefe varmanın hâlâ mümkün olup olmadığı sorulur ve cevabı üç dereceye bölünür: kesin, belki, imkânsız.

**Umutsuz dalları kes, umutluları büyüt.** Her düzeyde en iyi birkaç düğüm tutulur ve yalnızca onlardan devam edilir.

![Dikey bir çizgiyle ayrılmış iki bölmeli karşılaştırma şeması. Sol bölme bağımsız örneklemedir: bir soru kutusundan birbirine paralel dört zincir iner, her zincirde iki ara adım kutusu ve sonda bir cevap kutusu vardır; altında dört tam zincirin hiçbirinin ötekini görmediği ve ilk adım yanlışsa geri dönüş olmadığı yazar. Sağ bölme ağaç aramasıdır: soru kutusundan kesin, belki ve imkânsız diye etiketlenmiş üç düğüm çıkar; imkânsız etiketli düğümün altı çarpı işaretiyle kapatılmış ve budandı diye işaretlenmiştir. Kalan iki düğümden dört yeni düğüm dallanır ve bunlar da belki, kesin, belki ve yok diye etiketlenir; kesin etiketli düğümden aşağıya bir cevap kutusuna inilir. Şeklin altında her düzeyde en iyi birkaç düğümün tutulduğu, kesilen dalların bütçeyi harcamadığı, kazancın fazladan hesaptan değil hesabın dağıtımından geldiği ve bu etiketleri yine modelin kendisinin verdiği belirtilir.](assets/agac-ve-bagimsiz-ornekleme.svg "Şekil 2 — Bağımsız adaylar ile budanan bir ağaç")

Şekil 2'deki fark maliyet tarafında da görünüyor ve şaşırtıcı biçimde ağacın lehine. Bir soruyu ağaçla çözmek yaklaşık 5.500 üretilen token harcıyor; yüz bağımsız zincir üretmek 6.700. Yani kabaca aynı bütçeyle yüzde 9 yerine yüzde 74. Kazanç fazladan hesaptan değil, hesabın **dağıtımından** geliyor — 33\. makalenin kapanış cümlelerinden biriydi bu.

Tablodaki beşinci satır da öğretici: genişlik bir olduğunda, yani her düzeyde yalnızca tek bir düğüm tutulduğunda bile başarı yüzde 45. Yani kazancın büyük kısmı geniş bir aramadan değil, **puanlayıp devam etme** düzeninin kendisinden geliyor; adım adım ilerlemek ve umutsuz görünen bir açılışı erkenden bırakmak, tek geçişte yazmaktan zaten çok daha iyi.

Bunun bir de gecikme faturası var ve 33\. makaledeki iki eksen ayrımının aynısı. Oylama tamamen paraleldir: adaylar aynı istemi paylaşır, ön dolum bir kez ödenir ve hepsi aynı yığında üretilebilir. Ağaç ise düzey düzey ilerler; bir düzeyin puanları gelmeden bir sonraki düzey açılamaz. Toplam token sayısı benzer olsa bile kullanıcının beklediği süre ağaçta belirgin biçimde uzundur — 28\. makaledeki iki ölçüden ikincisi burada da belirleyici.

Ağacın zayıf noktası ise 35\. makaleden tanıdık: puanı yine model veriyor. Aynı çalışmanın ablasyonu bunu ölçüyor. Üretimi ve değerlendirmeyi ayrı modellere verdiklerinde, güçlü modelin ürettiği ve zayıf modelin puanladığı düzen yüzde 64; zayıf modelin ürettiği ve güçlü modelin puanladığı düzen yüzde 31. Bu görevde darboğaz üretim tarafında — 35\. makaledeki "büyük üretici, küçük doğrulayıcı" bulgusunun bir kardeşi.

> **Kendini yokla:** Oylama ilkokul matematiğinde on yedi puandan fazla kazandırırken 24 oyununda neden neredeyse hiçbir şey yapmıyor?

İki koşulun ikisi de o görevde sağlanmıyor. Birincisi kapsama: ilkokul matematiğinde model soruların çoğunu tek denemede zaten çözebiliyor, oylama yalnızca dikkatsizlikten gelen sapmaları eliyor. 24 oyununda tek denemede doğru cevap gelme olasılığı yüzde on bile değil. İkincisi dağılma: matematikte hatalar aritmetik kaymalardan doğduğu için her zincir başka bir yanlış sayıya varıyor; 24 oyununda ise yanlış işlemler belirli sonuçlarda toplanıyor. Oylama, ikisi birden sağlanmadığında bir cetvel değil, bir yanılsama üretir.

## Arama başka yerde neden bu kadar iyi çalıştı

Ağaç araması yapay zekânın en eski aletlerinden biri ve en görünür başarısı 2016'da geldi. David Silver ve arkadaşlarının Nature'da yayımlanan çalışmasında AlphaGo iki ağ kullanıyordu: biri hamle öneriyor, öbürü konumu puanlıyordu. Alandaki adları politika ağı ve değer ağı — buradaki "değer" sözcüğünün 6\. makaledeki dikkat üçlüsünün değeriyle hiçbir ilgisi yok; ayrımı bir sonraki makalede açıkça yapacağız.

Sonuçlar biliniyor: öbür Go programlarına karşı 495 maçın 494'ü, Avrupa şampiyonuna karşı 5–0. Bizim için asıl ilginç olan çalışmanın kendi karşılaştırması: AlphaGo o maçta, Deep Blue'nun Kasparov maçında incelediğinden **binlerce kat az** konum değerlendirdi. Farkı kapatan şey, konumları daha akıllıca seçmesi ve daha isabetli puanlamasıydı.

Ders şu: aramanın değeri, değerlendiricinin kalitesi kadardır. Go'da değerlendirici milyonlarca kendi kendine oynanan oyundan, kazanma-kaybetme gibi kesin bir sinyalle eğitilmişti. Dil modelinde ara adımı puanlayan şey çoğu zaman modelin kendisidir ve 35\. makalede o puanın ne kadar güvenilir olduğunu gördük. Ağaçların dil modellerinde beklendiği kadar iyi çalışmamasının sebebi arama fikrinde değil, buradadır.

## Planlama neden ayrı bir başlık

Bu makalenin başlığındaki ikinci sözcüğün hakkını verelim. Karthik Valmeekam ve arkadaşlarının NeurIPS 2023 veri ve kıyaslama izleğinde sunduğu ölçüm takımı, klasik bir blok istifleme alanında dil modellerinin plan üretme yeteneğini sınıyor. GPT-4 altı yüz örneğin yüzde 34,3'ünde geçerli bir plan üretebiliyor; bir planın geçerli olup olmadığını doğrulamada yüzde 58,6, beklenmedik bir değişiklikten sonra yeniden planlamada yüzde 48,1, verilen bir eylem dizisinin sonunda dünyanın hangi durumda olacağını söylemede yüzde 31,8.

Bu sayılar iki şeyi birden söylüyor. Planlama, tek geçişte üretimin zayıf kaldığı bir görev sınıfı — yani tam da aramanın işe yaraması beklenen yer. Ama aynı tablo, aramanın ihtiyaç duyduğu iki bileşenin de zayıf olduğunu gösteriyor: durumun ne olduğunu bilmek ve bir adayı doğrulamak. Ajanların araç kullanarak bu iki bileşeni dışarıdan aldığı düzen serinin ilerideki fazının konusu.

## Aramanın disiplini

**Oylanan şey zincir değil cevaptır.** Doğruya giden yollar buluşur, yanlışa gidenler dağılır; yöntemin bütün gerekçesi bu asimetridir.

**Çeşitlilik kaynaktır.** Sıcaklık sıfırda oylama anlamsızdır; birbirine benzeyen adaylar üreten kod çözme kuralları kazancı düşürür.

**En olası zincir, en olası cevap değildir.** Işın aramasında ışın sayısını artırmak başarıyı düşürebiliyor; olasılık zincir üzerinde değil cevap üzerinde toplanmalı.

**Kazanç erken doyar.** Beş ile on yol kazancın çoğunu verir; maliyet yol sayısıyla doğrusaldır.

**Öz-tutarlılık kapsamayı aşamaz.** Doğru cevap adaylar arasında yoksa sayım işe yaramaz; orada gereken şey daha çok aday değil, farklı bir arama düzenidir.

**Ağacın kazancı fazladan hesaptan değil, hesabın dağıtımından gelir.** Aynı token bütçesiyle çok daha iyi sonuç alınabiliyor.

**Arama, değerlendiricisi kadar iyidir.** Ara adımı puanlayan şey modelin kendisiyse, 35\. makaledeki bütün sınırlar aramanın içine taşınır.

### Sırada ne var

Bu makalede kullandığımız sözcüklere dikkat: politika, değer, ödül, arama, avantaj. Hepsini 13\. ve 34\. makalelerde de kullandık — ödül modeli, politikanın güncellenmesi, grup göreli avantaj — ama hiçbirinin biçimsel tanımını vermedik.

Sonraki makale o borcu ödüyor. Durum, eylem, ödül ve geçiş nedir; politika ile değer nasıl ayrılır; bir dil modelinin token üretmesi bu çerçeveye nasıl oturur; ve zincirin sonunda verilen tek bir ödül, binlerce token'ın hangisinin işe yaradığını nasıl söyleyebilir?

## Kaynakça

- Wang, X., Wei, J., Schuurmans, D., Le, Q. V., Chi, E. H., Narang, S., Chowdhery, A. & Zhou, D. (2023). *Self-Consistency Improves Chain of Thought Reasoning in Language Models*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=1PL1NIMMrw)
- Yao, S., Yu, D., Zhao, J., Shafran, I., Griffiths, T. L., Cao, Y. & Narasimhan, K. (2023). *Tree of Thoughts: Deliberate Problem Solving with Large Language Models*. NeurIPS 2023. [Bağlantı](http://papers.nips.cc/paper_files/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract-Conference.html)
- Silver, D., Huang, A., Maddison, C. J., Guez, A., Sifre, L., van den Driessche, G., Schrittwieser, J., Antonoglou, I., Panneershelvam, V., Lanctot, M., Dieleman, S., Grewe, D., Nham, J., Kalchbrenner, N., Sutskever, I., Lillicrap, T., Leach, M., Kavukcuoglu, K., Graepel, T. & Hassabis, D. (2016). *Mastering the game of Go with deep neural networks and tree search*. Nature, 529, s. 484–489. [Bağlantı](https://www.nature.com/articles/nature16961)
- Valmeekam, K., Marquez, M., Olmo, A., Sreedharan, S. & Kambhampati, S. (2023). *PlanBench: An Extensible Benchmark for Evaluating Large Language Models on Planning and Reasoning about Change*. NeurIPS 2023 Datasets and Benchmarks. [Bağlantı](http://papers.nips.cc/paper_files/paper/2023/hash/7a92bcdede88c7afd108072faf5485c8-Abstract-Datasets_and_Benchmarks.html)
