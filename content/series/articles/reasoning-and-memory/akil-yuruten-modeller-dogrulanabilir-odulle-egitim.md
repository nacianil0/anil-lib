---
article_id: article_49466ee0-356e-4c1a-a74f-26ec4427c83d
title: "Akıl Yürüten Modeller: Doğrulanabilir Ödülle Eğitim"
slug: akil-yuruten-modeller-dogrulanabilir-odulle-egitim
category: reasoning-and-memory
level: intermediate
reading_order: 34
summary: "Post-training haritasının dördüncü durağını açar: doğru cevabın makineyle denetlenebildiği alanlarda ödülü insan yargısı yerine bir kuralın vermesini, kendi çözümlerinden öğrenmenin en sade biçiminden grup göreli politika optimizasyonuna uzanan mekanizmayı, hakemli bir koşuda ölçülen kazancı ve bu eğitimin modelin yetenek sınırını genişletip genişletmediği tartışmasını kurar."
tags:
  - dogrulanabilir-odul
  - pekistirmeli-ogrenme
  - post-training
  - dogrulayici
  - yetenek-siniri
content_hash: sha256:f55cb1566b699454dcfe1322cbc9b903bd676728086b52711b578189351c6ba2
classification_version: 1
classification_batch: 7
---
## Haritanın kenarındaki durak

33\. makalede düşünme süresini dışarıdan satın aldık: model hazırdı, biz ona daha çok deneme ve daha çok düzeltme yaptırdık. Ama bir duvara çarptık. Örnekleme sonsuza gitse bile çoğunluk oyunun ulaştığı sınır, yalnızca modelin kendi dağılımına bağlıydı. Yani çıkarım anında harcanan hesap, modelin zaten üretebildiği cevapların içinden seçim yapıyor; yeni bir cevap icat etmiyor.

O hâlde dağılımın kendisini değiştirmek gerekiyor ve bu bir eğitim işi.

11\. makalede post-training haritasını çizerken üç durak saymıştık: gösterip öğretmek, yargıyı modellemek, ödüle göre ayarlamak. Aynı makalede haritanın kenarına bir not düşmüştük: doğru cevabın otomatik olarak denetlenebildiği alanlarda — matematik, kod — insan yargısı yerine doğrulanabilir bir ölçüt kullanan eğitim aşamaları da var. Bu makale o notu açıyor.

Kurulacak fikrin adı **doğrulanabilir ödülle pekiştirmeli öğrenme** (reinforcement learning with verifiable rewards, RLVR): modelin cevabı bir insan ya da bir ödül modeli tarafından değil, cevabın doğruluğunu deterministik olarak sınayan bir kural tarafından puanlanır.

## En sade hâli: kendi çözümlerinden öğrenmek

Fikrin en yalın biçimi 13\. makaledeki karmaşık düzeneğin hiçbirine ihtiyaç duymuyor.

Eric Zelikman ve arkadaşlarının NeurIPS 2022'de sunduğu döngü şöyle işliyor: modele birkaç çözülmüş örnek göster, bir sürü soruyu ara adımlarla çözdür, **doğru cevaba varan** çözümleri sakla, ötekileri at, saklananlarla modeli ince ayarla, baştan başla. Doğru cevap zaten elde olduğu için filtre bedava; kimse ara adımları etiketlemiyor.

Ölçümler 6 milyar parametreli bir modelle yapılmış:

| Düzen | Sağduyu sorusu | İlkokul matematiği |
|---|---|---|
| birkaç örnekle doğrudan cevap | 20,9 | 3,0 |
| birkaç örnekle ara adımlı cevap | 36,6 | 3,1 |
| doğrudan cevap için ince ayar | 60,0 | 5,8 |
| döngü (ara adımlar saklanarak) | 68,8 | 10,1 |
| döngü + cevabı ipucu vererek | 72,5 | 10,7 |

Sağduyu sütununun son satırı dikkat çekici: 72,5 puan, otuz kat büyük bir modelin doğrudan cevap için ince ayarlanmış hâline (73,0) çok yakın. Toplama işleminde ise döngü on altı yinelemede 89,5'e çıkıyor; on bin örnekle doğrudan cevap için eğitilen taban 76,3'te kalıyor.

Bu tabloda iki ders var. Birincisi, modelin kendi ürettiği ara adımlar bir eğitim verisi kaynağı olabiliyor — 12\. makaledeki sentetik veri fikrinin doğrulama filtresiyle sıkılaştırılmış hâli. İkincisi, filtrenin ucuz olması bütün mekanizmanın ön koşulu.

Düzenekte bir de dürüstlük ayrıntısı var. Model bir soruyu hiçbir denemede çözemezse, ona doğru cevap **ipucu olarak** verilip bir gerekçe yazması isteniyor; üretilen gerekçe sonra ipucu silinerek eğitime katılıyor. Tablodaki son satırın kazancı buradan geliyor. Bu adım, çözülemeyen soruların tamamen boşa gitmesini önlüyor ama bir riski de beraberinde getiriyor: cevabı bilerek yazılmış bir gerekçe, cevaba gerçekten götüren bir gerekçe olmak zorunda değil. 31\. makaledeki sadakat sorusu, bu kez eğitim verisinin içine yerleşiyor.

## Ödülü kim verir

Şimdi 13\. makaleye geri dönelim. Orada ödülü, insan tercihlerinden eğitilmiş bir **ödül modeli** veriyordu ve bunun bilinen bir hastalığı vardı: aşırı optimizasyon. Vekil ölçü fazla kovalanınca gerçek ölçüt bozuluyordu.

Doğrulanabilir ödül bu hastalığı kökünden kesiyor, ama yalnızca belirli alanlarda. Bir matematik probleminin cevabı belirli bir biçimde isteniyorsa, doğruluk bir dize karşılaştırmasıyla sınanabilir. Bir programlama sorusunda cevap bir test takımından geçer ya da geçmez. İki durumda da puanı bir model değil, bir kural veriyor.

![İki yollu bir karşılaştırma şeması. Solda modelin ürettiği cevap, insan tercihlerinden eğitilmiş bir ödül modeline girer ve çıkışta öğrenilmiş bir puan üretilir; altında bu puanın bir vekil ölçü olduğu ve fazla kovalanınca bozulabildiği yazılıdır. Sağda aynı cevap bir kurala girer: matematikte cevap anahtarıyla karşılaştırma, kodda test takımından geçme. Çıkışta deterministik bir doğru ya da yanlış vardır ve altında bu ölçütün kandırılamayacağı ama yalnızca doğrulanabilir alanlarda kurulabildiği belirtilir.](assets/odul-modeli-ve-kural.svg "Şekil 1 — Puanı bir model mi veriyor, bir kural mı?")

Şekil 1'deki ayrım yalnızca kuramsal değil. DeepSeek-R1 çalışmasının açık tercihi bu: akıl yürütme görevlerinde ne sonuç tabanlı ne de süreç tabanlı, **sinir ağı tabanlı** bir ödül modeli kullanılıyor. Gerekçe doğrudan yazılmış — büyük ölçekli pekiştirmeli öğrenmede öğrenilmiş ödül modelleri ödül kandırmasına açık hâle geliyor. Kural tabanlı ödül iki bileşenden oluşuyor ve ikisi eşit ağırlıklı: cevabın doğruluğu ve çıktının istenen biçimde olması.

Biçim ödülü ilk bakışta ayrıntı gibi duruyor ama işlevi büyük. Model, düşünme sürecini belirli işaretler arasına almaya teşvik ediliyor; böylece hem ara adımlar cevaptan ayrılabiliyor hem de doğruluk denetimi cevabın tam olarak nerede olduğunu biliyor. 30\. makaledeki gözlemin tersi burada çalışıyor: biçim, ara adımları silmek yerine korumak için kullanılıyor.

> **Kendini yokla:** Doğrulanabilir ödül, 13\. makaledeki aşırı optimizasyon sorununu tamamen ortadan kaldırıyor mu?

Sorunun ödül modeline özgü olan kısmını kaldırıyor: kandırılacak bir öğrenilmiş vekil kalmıyor. Ama Goodhart'ın kendisi duruyor. Ölçüt "nihai cevabın doğruluğu" olduğu için, doğru cevaba yanlış bir gerekçeyle varan bir çözüm de tam puan alır. Yani ödül, akıl yürütmenin kalitesini değil sonucunu ölçüyor — 31\. makaledeki sadakat sorusunun eğitim tarafındaki karşılığı bu. Adımların tek tek ödüllendirildiği düzen 38\. makalenin konusu.

## Grup içinde göreli avantaj

Ödül tanımlandıktan sonra geriye modeli o ödüle göre oynatmak kalıyor. R1 çalışmasının kullandığı algoritmanın adı **grup göreli politika optimizasyonu** (group relative policy optimization, GRPO) ve fikri, 13\. makaledeki düzeneğin bir parçasını atmak.

Klasik düzende, bir cevabın ödülünün "beklenenden iyi mi kötü mü" olduğunu söyleyen ayrı bir model gerekir. GRPO bunun yerine aynı soruya bir **grup** cevap üretir ve karşılaştırmayı grubun içinde yapar: her cevabın avantajı, o cevabın ödülünden grubun ortalama ödülü çıkarılıp grubun standart sapmasına bölünerek bulunur.

![Bir soru kutusundan aşağıya doğru dört cevap kutusu ayrılır. Her cevabın yanında kural tabanlı doğrulayıcının verdiği ödül yazılıdır; ikisi doğru, ikisi yanlıştır. Kutuların altında grubun ortalaması ve standart sapması gösterilir. En altta her cevap için hesaplanan göreli avantaj bulunur: ortalamanın üstündeki cevaplar artı, altındakiler eksi işaretlidir. Şeklin altında karşılaştırmanın ayrı bir değer modeliyle değil grubun kendi içinde yapıldığı, ortalamanın üstündeki cevapların daha olası hâle geldiği ve dört cevap da aynı ödülü alırsa sapmanın sıfır olup o sorudan sinyal çıkmadığı yazılıdır.](assets/grup-goreli-avantaj.svg "Şekil 2 — Karşılaştırmayı grubun içinde yapmak")

Sayılarla yürütelim. Bir soruya dört cevap üretilmiş olsun ve kural tabanlı ödül sırasıyla 1,0 · 1,0 · 0,5 · 0,0 versin — ilk ikisi hem doğru hem biçimli, üçüncüsü biçimli ama yanlış, dördüncüsü ikisi de değil. Ortalama 0,625; standart sapma yaklaşık 0,41. Avantajlar bu iki sayıdan çıkıyor: 0,90 · 0,90 · −0,30 · −1,51. İlk iki cevabın token'ları daha olası, son ikisininkiler daha az olası hâle getiriliyor.

Bu hesabın bir yan sonucu var ve pratikte belirleyici. Dört cevabın dördü de aynı ödülü alırsa — soru modele göre ya çok kolay ya da çok zorsa — standart sapma sıfıra gider ve o sorudan hiçbir öğrenme sinyali çıkmaz. Yani yöntem, modelin bazen çözüp bazen çözemediği sorulardan besleniyor. Eğitim verisinin zorluk dağılımı, bu düzende bir ayrıntı değil, mekanizmanın çalışma koşulu.

Şekil 2'deki normalleştirme, algoritmanın neden bu kadar yaygınlaştığını açıklıyor: ayrı bir değer modeli eğitmek ve bellekte tutmak gerekmiyor. Amaç işlevinde iki parça daha var ve ikisi de 13\. makaleden tanıdık: güncellemenin büyüklüğünü sınırlayan bir kırpma terimi ve modeli başlangıç noktasından çok uzaklaştırmamak için bir KL cezası. R1'in ilk pekiştirmeli öğrenme aşamasında bu ceza katsayısı 0,001, öğrenme oranı 3×10⁻⁶, her soru için üretilen cevap sayısı 16 ve tek bir cevabın azami uzunluğu 32.768 token.

Son sayı önemli. Model, cevabını otuz iki bin token'a kadar uzatmakta serbest bırakılıyor.

## Ölçülen koşu

DeepSeek-R1 çalışması, alanın bu kısmında hakemli bir kaynak olduğu için ayrı bir değer taşıyor: Nature'da 2025'te yayımlandı.

Düzenek, denetimli ince ayar aşaması **atlanarak** kuruluyor. Temel modelin üzerine doğrudan kural tabanlı ödülle pekiştirmeli öğrenme uygulanıyor; niyet, insan tarafından yazılmış akıl yürütme kalıplarının modelin keşif alanını daraltmasını önlemek. Elde edilen modelin adı R1-Zero.

Zorlu bir matematik yarışma sınavında ortalama ilk deneme başarısı, eğitim boyunca yüzde 15,6'dan yüzde 77,9'a çıkıyor. Aynı modelden birden çok cevap alıp en sık tekrarlananı seçince — 33\. makaledeki çoğunluk oyu — puan yüzde 86,7'ye ulaşıyor.

Kazancın yanında iki gözlem daha var ve ikisi de öğretici. Birincisi, modelin cevap uzunluğu eğitim boyunca **kendiliğinden** artıyor; kimse "daha uzun düşün" demiyor, uzun düşünmek daha çok ödül aldığı için uzuyor. İkincisi, eğitimin belirli bir noktasında modelin geri dönüp kendi adımını sorgulamaya başlaması: çalışma bunu, metinde "bekle" anlamındaki sözcüğün kullanım sıklığındaki ani artışla ölçüyor.

R1-Zero'nun sorunları da açıkça yazılmış: okunabilirliği düşük ve diller karışıyor. Bunu düzeltmek için soğuk başlangıç verisiyle bir denetimli ince ayar, ardından yeni bir pekiştirmeli öğrenme turu ve genel verilerle ikinci bir tur ekleniyor. Aşama aşama ölçülen tablo, akıl yürütme eğitiminin neyi değiştirip neyi değiştirmediğini net gösteriyor:

| Ölçüm | R1-Zero | ilk ara sürüm | R1 |
|---|---|---|---|
| talimata uyma | 46,6 | 71,7 | 83,3 |
| tercih arenası | 24,7 | 50,1 | 87,6 |
| lisansüstü fen soruları | 75,8 | 66,1 | 71,5 |
| kısa olgu soruları | 30,3 | 17,8 | 30,1 |

Sağ sütuna doğru okunduğunda hikâye şu: akıl yürütmeye yönelik pekiştirmeli öğrenme akıl yürütme puanlarını yükseltiyor ama kullanıcı tercihi ölçen kümelerde neredeyse hiçbir şey yapmıyor; o kümelerdeki büyük sıçrama sonraki genel amaçlı aşamalardan geliyor. Üçüncü ve dördüncü satırlar ise ters yönde bir uyarı taşıyor: soğuk başlangıç verisiyle yapılan ilk ince ayar, akıl yürütme ve olgu sorularında geçici bir **gerileme** üretiyor. 11\. makaledeki hizalama vergisi burada da görünüyor.

Ödül tasarımının bir maliyeti de kayda geçmiş. Dillerin karışmasını önlemek için ödüle üçüncü bir bileşen ekleniyor: cevabın hedef dildeki sözcük oranı. Çalışmanın kendi ablasyonu, bu bileşenin model başarısında hafif bir **gerileme** ürettiğini söylüyor; yine de insan tercihine uyduğu için tutuluyor. Bu, 11\. makaledeki hizalama vergisinin küçük ve çok net bir örneği: okunabilirlik bedava değil, ölçülebilir bir puan karşılığında satın alınıyor.

## Neden matematik ve kod

Buraya kadarki mekanizmanın tek bir ön koşulu var: cevabın doğruluğunu ucuza ve kesin olarak söyleyen bir kural. Matematik ve programlamanın test alanı olmasının sebebi budur — pedagojik bir tercih değil, mühendislik zorunluluğu.

Çalışmanın kendi sınırlar bölümü bunu açıkça yazıyor. Güvenilir bir ödül kuralının kurulamadığı alanlarda — örneğin yazı yazmada — ödülü bir modele bıraktığın anda eğitim ilerledikçe kandırılma riski geri geliyor. R1 bu tür görevler için insan etiketli denetimli veri kullanıyor ve pekiştirmeli öğrenmeyi yalnızca birkaç yüz adım çalıştırıyor. Yani "her göreve doğrulanabilir ödül kurulur" diye bir şey yok; yöntemin kapsamı, doğrulayıcının kurulabildiği alanların kapsamıdır.

Yazılım mühendisliği görevleri de aynı sınırın başka bir yüzünü gösteriyor: orada doğrulama mümkün ama **yavaş**, çünkü her aday çözümün derlenip çalıştırılması gerekiyor. Çalışma büyük ölçekli pekiştirmeli öğrenmeyi bu alanda uygulayamadığını ve bu yüzden kayda değer bir iyileşme elde edemediğini yazıyor. Doğrulayıcının varlığı yetmiyor; ucuz olması da gerekiyor.

Bir de güvenlik tarafı var ve çalışma bunu kendi etik bölümünde açıkça yazıyor: akıl yürütme yeteneği arttıkça, kötüye kullanım hâlinde üretilen planların uygulanabilirliği de artıyor. Yani buradaki kazanç yetenek eksenindedir ve yetenek yönsüzdür. Aynı bölüm, ağırlıkları yayımlanan bir modelin sonradan yapılacak ince ayarla güvenlik davranışını kaybedebileceğini de kaydediyor — 20\. makalede açık ağırlık tartışmasında ve 19\. makalede ince ayarın hizalamayı bozması bulgusunda gördüğümüz iki gerilimin birleştiği yer. Modelin ölçülen güvenlik düzeyi, karşılaştırıldığı sistemlerle aynı bantta; ek bir risk denetim katmanıyla birlikte yükseliyor. Bu eksenin tamamı serinin güvenlik fazının konusu.

## Yeni yetenek mi, daha iyi nişan mı

Şimdi tartışmanın en canlı sorusuna gelelim. Bu eğitim modele yapamadığı bir şeyi mi öğretiyor, yoksa zaten yapabildiği şeyi daha isabetle mi seçtiriyor?

Yang Yue ve arkadaşlarının NeurIPS 2025'te sunduğu çalışma bu soruyu 33\. makaledeki araçla ölçüyor: kapsama. Aynı sorulara hem temel model hem pekiştirmeli öğrenmeden geçmiş sürümü, artan deneme sayılarıyla çalıştırıyorlar.

![Yatay ekseni deneme sayısı, dikey ekseni kapsama olan bir eğri şeması. İki eğri vardır. Pekiştirmeli öğrenmeden geçmiş modelin eğrisi az denemede belirgin biçimde yukarıda başlar ama erken düzleşir. Temel modelin eğrisi düşük başlar, daha dik yükselir ve orta bölgede öbürünü keserek üstüne çıkar. Kesişme noktası işaretlenmiştir. Şeklin altında düşük deneme sayısında eğitimin kazandırdığı, yüksek deneme sayısında temel modelin daha çok soruyu çözebildiği yazılıdır.](assets/kapsama-egrileri.svg "Şekil 3 — Az denemede kazanç, çok denemede kayıp")

Şekil 3'teki kesişme çalışmanın merkezi bulgusu. Tek denemede pekiştirmeli öğrenmeden geçmiş model açık ara önde; deneme sayısı onlara, yüzlere çıktığında temel model yetişiyor ve geçiyor. Eğitim ilerledikçe bu daha da belirginleşiyor: bir düzenekte ilk deneme başarısı 26,1'den 42,5'e çıkarken, iki yüz elli altı denemedeki kapsama düşüyor.

Yorum şu: pekiştirmeli öğrenme, doğru yolların olasılığını artırıyor — yani **örnekleme verimliliğini** yükseltiyor — fakat bunu dağılımı daraltarak yapıyor. Daralma, temel modelin nadiren de olsa bulabildiği bazı yolları erişilemez kılıyor.

İki itiraz akla geliyor ve ikisi de sınanmış. Birincisi: belki temel model doğru cevabı şansla buluyordur. Çalışma, ilkokul matematiği kümesinde ortalama başarısı yüzde 5'in altında kalan en zor sorularda üretilen bütün doğru çözümleri elle inceliyor; temel modelin cevapladığı 25 sorunun 24'ünde en az bir geçerli ara adım zinciri var. Kodda ise soru zaten yok: bütün testlerden geçen bir program şansla yazılmıyor. İkincisi: belki daralmanın sebebi yalnızca çıktı çeşitliliğinin azalmasıdır. Sıcaklık yükseltilip eğitilmiş modelin dağılım genişliği temel modelinkine eşitlendiğinde de sonuç değişmiyor.

Aynı çalışma bir de karşıt örnek veriyor. Daha güçlü bir modelin uzun çözümleriyle eğitilen küçük bir model — yani **damıtma** yoluyla — temel modelin eğrisinin belirgin biçimde üstüne çıkıyor. Yani sınırı aşmak mümkün; ama bunu yapan şey öğretmenin getirdiği yeni kalıplar, modelin kendi keşfi değil.

> **Kendini yokla:** Kapsama ölçüsünün pratikte doğrudan kullanılamamasına rağmen bu tartışmanın merkezinde durmasının sebebi ne?

Çünkü iki farklı soruyu ayırıyor. "Hangi model daha kullanışlı" sorusunun cevabı ilk denemedeki başarıdır ve orada eğitilmiş model kazanır. "Eğitim yeni bir yetenek ekledi mi" sorusunun cevabı ise sınırdadır ve onu ancak çok sayıda denemeyle görebilirsin. Ürün kararı birinciye, bilimsel iddia ikincisine bakar.

## Doğrulanabilir ödülün disiplini

**Yöntemin kapsamı doğrulayıcının kapsamıdır.** Ucuz ve güvenilir bir kural kurulamıyorsa mekanizma çalışmaz.

**Sonuç ödülü gerekçeyi denetlemez.** Doğru cevaba yanlış yoldan varan çözüm de tam puan alır.

**Kazanç ilk denemede ölçülür, sınır çok denemede.** İki ölçü farklı soruları yanıtlıyor; birini öbürünün yerine kullanmak yanıltıcı.

**Akıl yürütme eğitimi genel yardımseverliği getirmez.** Ölçülen tabloda tercih kümelerindeki sıçrama ayrı aşamalardan geliyor.

**Uzunluk kendiliğinden büyür ve bunun bir faturası vardır.** Çalışmanın kendi sınırlar bölümü, basit sorularda gereğinden fazla düşünmeyi açık bir sorun olarak kaydediyor; fatura 33\. makaledeki muhasebeden okunuyor.

**Bu modeller farklı istem alışkanlıkları ister.** Aynı çalışma, birkaç örnekli istemin bu modellerde başarıyı **düşürdüğünü** ve sorunun doğrudan, örneksiz sorulmasını öneriyor — 22\. ve 23\. makalelerdeki reçetelerin tersi.

### Sırada ne var

Bu makalede ödülü veren şey bir kuraldı ve kuralın kurulabildiği yer dardı. Ama 33\. makalede adayları puanlayan bir doğrulayıcıdan da söz etmiştik ve orada puanı veren bir modeldi.

İki düzenek aynı soruya bakıyor: bir cevabın doğru olup olmadığını, cevabın kendisinden daha ucuza söyleyebilir miyiz? Sonraki makale bu soruyu doğrudan ele alıyor — doğrulayıcılar nasıl eğitiliyor, modelin kendi cevabını kontrol etmesi ne kadar işe yarıyor ve üretmek ile doğrulamak arasındaki asimetri nerede bozuluyor?

## Kaynakça

- Zelikman, E., Wu, Y., Mu, J. & Goodman, N. D. (2022). *STaR: Bootstrapping Reasoning With Reasoning*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/639a9a172c044fbb64175b5fad42e9a5-Abstract-Conference.html)
- DeepSeek-AI (Guo, D., Yang, D., Zhang, H. ve ark.) (2025). *DeepSeek-R1 incentivizes reasoning in LLMs through reinforcement learning*. Nature, 645, s. 633–638. [Bağlantı](https://www.nature.com/articles/s41586-025-09422-z)
- Yue, Y., Chen, Z., Lu, R., Zhao, A., Wang, Z., Yue, Y., Song, S. & Huang, G. (2025). *Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?*. NeurIPS 2025. [Bağlantı](http://papers.nips.cc/paper_files/paper/2025/hash/537d5aa768c2d534016a4d06f87bc8fb-Abstract-Conference.html)
