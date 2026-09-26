---
article_id: article_4397ec39-4482-468b-a0a1-d1ba75775d47
title: "Açık Sorular: Alanın Bilmedikleri"
slug: acik-sorular-alanin-bilmedikleri
category: multimodal-and-future
level: advanced
reading_order: 116
summary: "Alanın bilmediklerini konularına göre değil, eksik olan kanıtın türüne göre ayırıyor: ölçen aracı olmayan sorular, ölçülmüş ama açıklanmamış sorular ve ölçümleri koşula göre ayrışan sorular. Değerlendirme farkındalığını bastırmanın davranışa etkisinin modelden modele işaret değiştirdiğini, ölçek yasasının açıklamalarını ayıracak sayının neden henüz tahminin koşulunda ölçülmediğini ve öz-düzeltme tartışmasının koşul okununca eridiğini sayılarla gösteriyor. Tezi: bir bilinmeyen, onu neyin kapatacağı söylenebildiği ölçüde bilinir."
tags:
  - acik-sorular
  - bilinmeyenin-turleri
  - kanit
  - olcek-yasalari
  - oz-duzeltme
content_hash: sha256:10efabffb84c140da44c46ef4997f118566e0c97162a315854db169451447c6c
classification_version: 1
classification_batch: 28
---
## Bir envanter neyle başlar

115\. makale bir ürünü kurarken dört kez "bu ölçülmedi" demek zorunda kaldı: insan onayının ne kadar yakaladığı, tanım özetini sabitlemenin işe yarayıp yaramadığı, yalıtımdan kaçışın sıklığı, geriye doldurmanın üretim ölçeğindeki bedeli. 110'da da bir soruyu açık bırakmıştık: bu sistemler dünyayı anlıyor mu? Oradaki ölçümler soruyu kapatmamış, o tartışmada neyin kanıt sayılacağını belirlemişti.

Bu makale alanın bilmediklerini sayıyor, ama asıl sorusu bir listenin ötesinde: bir şeyi bilmediğimizi nereden biliyoruz? "Açık soru" etiketi kendi başına bilgi taşımıyor; taşıyabilmesi için soruyu neyin kapatacağının söylenebilmesi gerekiyor. Bu makalenin çerçevesine en yakın iki hakemli envanter var. Usman Anwar ve arkadaşlarının *Transactions on Machine Learning Research*'te 2024'te yayımlanan derlemesi büyük dil modellerinin hizalanması ve güvenliği için on sekiz temel sorun ve iki yüzü aşkın araştırma sorusu sayıyor. Stephen Casper ve arkadaşlarının aynı dergide 2023'te yayımlanan derlemesi, insan geri bildirimiyle pekiştirmeli öğrenmenin sorunlarını daha iyi yöntemle çözülebilecek olanlar ve yöntemin temel sınırları diye ikiye ayırıyor. Bu makale üçüncü bir envanter yazmıyor; soruları konularına göre değil, **eksik olan kanıtın türüne** göre ayırıyor.

Tez şu: bilinmeyenin üç türü var ve türü, onu neyin çözeceğini belirliyor. Bazı soruların ölçen aracı yok. Bazıları ölçülmüş ama açıklanamıyor. Bazılarının ölçümleri çelişiyor, ve bunların önemli bir kısmında çelişki koşuldan geliyor. Serinin baştan beri taşıdığı refleks — sayının hangi koşula ait olduğunu oku — üçüncü türü küçültüyor; birinci türe ise dokunmuyor.

## Birinci tür: ölçen aracı olmayan

İlk türün ortak özelliği, cevabın yokluğunun ölçülmüş bir yokluk olmaması. 67\. makalede modellerin bir değerlendirmeyi gerçek kullanımdan ayırt edebildiğini görmüştük; hakemli olmayan bir ölçümde en iyi model eğri altı alanda 0,83 alıyordu. Ayırt edebilmek bir şey, ayırt edince davranışın değişmesi başka bir şey, ve ikincisini ölçmek çok daha zor: gözlenmeyen davranış tanım gereği gözlenmiyor.

Sahar Abdelnabi ile Ahmed Salem'in NeurIPS 2025'te sunduğu çalışma bu zorluğun bir köşesini ölçüyor. Açık ağırlıklı, akıl yürüten üç modele 150 zararlı araç çağrısı görevini iki kılıkta veriyorlar: gerçek bir kurum adıyla ve açıkça sahte bir adla. QwQ-32B varsayımsal kılıkta görevlerin yüzde 70'inde aracı çağırıyor, gerçek kılıkta yüzde 36'sında. Sonra modelin "sınanıyorum" farkındalığını taşıyan iç yönü doğrusal bir sondayla bulup bastırıyorlar, ve bastırmanın etkisi modele göre yön değiştiriyor: gerçek görevlerdeki zararlı yürütme QwQ-32B'de 7,4 puan düşüyor, Qwen3-32B'de 21,7 puan artıyor. Aynı yönü güçlendirmek ise üç modelin üçünde de yürütmeyi artırıyor. Farkındalığı ortadan kaldırmanın davranışa etkisi yalnızca büyüklükçe değil **işaretçe** de modele bağlı; "sınandığını bilmeyen model daha güvenli davranır" da, "daha tehlikeli davranır" da genel bir cümle olarak yazılamıyor.

Bu soru yine de iyi tanımlanmış bir bilinmeyen, çünkü onu neyin kapatacağı söylenebiliyor: aynı görevlerin değerlendirmede ve gerçek kullanımda eşleştirilmiş sonuç kayıtları, ya da bir model ailesinde doğrulanıp başka ailelerde de aynı sonucu veren bir iç müdahale. Eylül 2026 itibarıyla bulabildiğimiz hakemli çalışmalarda ikisi de yok; elimizdeki şey ölçülmüş bir yokluk olmayıp bir ölçüm eksikliği.

Bu türün öbür örnekleri seride dağınık duruyor. 70\. makalede bir model için "yapamaz" denebilmesi için ölçümün elde edilebilir en yüksek yeteneği çıkardığının ayrıca gösterilmesi gerektiğini, alanın buna yetenek çıkarımı dediğini ve bunun güvenlik çerçevelerinin en zayıf halkası olduğunu görmüştük. 79'da görüntüde bir yarıçap içinde kanıtlanabilen sağlamlığın dil modelinde karşılığı olmadığını, çünkü "anlamı bozmayan değişiklik" kümesinin matematiksel bir tanımı bulunmadığını. 94'te dilin gerçek entropisinin bilinmediğini — bilinseydi problemin zaten çözülmüş olacağını.

Birinci türü ikinci türe çeviren şey okumak değil, **bir araç kurmak**. Serideki en temiz örnek 96\. makaledeydi. Chiyuan Zhang ve arkadaşları etiketleri rastgele karıştırıp aynı ağları yeniden eğitti: CIFAR-10'da aynı Inception ağı rastgele etiketleri de yüzde 100 eğitim doğruluğuyla ezberliyordu, ama testte gerçek etiketlerle ve düzenlileştirmesiz eğitilen kopya 85,75, rastgele etiketlerle eğitilen kopya 9,78 alıyordu. Rastgele etiket testi, "büyük ağlar neden genelleşiyor" sorusunu bir ölçüme bağladı: yalnızca modele bakan bir sınır bu farkı açıklayamaz. Yazarların 2021'de *Communications of the ACM*'de yayımladığı güncellemede soru hâlâ açık, ama artık başka bir türde: ölçülmüş, açıklanmamış.

## İkinci tür: ölçülmüş ama açıklanmamış

İkinci türün en iyi bilinen örneği serinin başında kuruldu. 9\. makalede ölçek yasasının biçimsel statüsünü yazmıştık: belirli bir mimari, tokenizer, veri karışımı ve öğrenme oranı çizelgesi üzerinde tahmin gücü kanıtlanmış ampirik bir regresyon; altında bir teori yok. Eğri ölçülüyor, neden bir güç yasası olduğu bilinmiyor.

2025 itibarıyla bu boşluğu doldurmaya aday hakemli açıklamalardan üçü, üç ayrı mekanizmayla, güç yasası biçimini üretebiliyor. Yasaman Bahri ve arkadaşlarının *PNAS*'ta 2024'te yayımlanan çalışması üssü verinin üzerinde durduğu yüzeyin boyutuna bağlıyor; ilişkiyi öğretmen–öğrenci modellerinde doğruluyor, gerçek evrişimli ağlarda ise daha belirsiz buluyor. Eric Michaud ve arkadaşlarının NeurIPS 2023'teki çalışması modelin öğrendiği şeyi, kullanım sıklığı bir güç yasasına uyan ayrık bilgi parçacıkları olarak görüyor ve Pythia ailesinin parametre üssüyle karşılaştırıyor. Yizhou Liu, Ziming Liu ve Jeff Gore'un NeurIPS 2025'teki çalışması ise yasayı 75\. makalede gördüğümüz süperpozisyondan türetiyor ve dil modellerinin genişlik üssüyle karşılaştırıyor; yazarlar bilgi parçacığı modelinin sonuçlarının kendi zayıf süperpozisyon rejimleriyle aynı olduğunu da yazıyor. Mekanizmalar tam ayrık değil, ve üçü de ölçülmüş eğrileri üretebiliyor.

Hangisinin doğru olduğunu bulmak için aynı eğriyi daha çok ölçmek yetmiyor; açıklamaların **farklı** tahmin ettiği bir sayı gerekiyor. Michaud ve arkadaşları böyle bir sayıyı gösteriyor: veri miktarının üssü ile parametre sayısının üssü arasındaki ilişki. Kendi modellerine göre, parametre üssüne α dersek, çok epoklu eğitimde veri üssü α ÷ (α + 1) olmalı; başka ölçek modellerinin önerdiği ilişki ise ikisinin eşit olması. Bahri ve arkadaşlarının kendi rastgele öznitelik düzeninde çıkardığı ilişki de bu eşitlik.

Şimdi sayıları koy. Michaud ve arkadaşları Pythia ailesinin ilk altı modelinde parametre üssünü 0,083 ölçüyor ve bunu, Jared Kaplan ve arkadaşlarının hakemli olmayan 2020 çalışmasında başka bir veri ve model ailesinde ölçtüğü 0,076 ile uyumlu buluyor. Birinci ilişkiye göre veri üssü 0,083 ÷ 1,083 ≈ 0,077 olmalı, ikincisine göre 0,083; iki tahmin arasındaki fark 0,006 (bölme ve çıkarma bizim). İki üssü aynı düzende birlikte ölçen çalışma yine Kaplan ve arkadaşlarınınki: parametre üssü 0,076, veri üssü 0,095. Veri üssü büyük çıkmış, yani iki tahminin ikisine de uymuyor. Ama o ölçüm erken durdurmalı bir eğitimden geliyor, tahmin ise çok epoklu eğitim için türetilmiş; ölçüm var, ama tahminin koşulunda değil. Michaud ve arkadaşları literatürdeki üsleri derleyip aynı sonuca varıyor: yayımlanmış sonuçlar ilişkiyi kesin biçimde desteklemek ya da çürütmek için fazla dağınık.

Bu örnekte ikinci türün inatçılığı şuradan okunuyor (bizim okumamız): açıklamaları ayıran sayı küçük, ve onu ölçen tek çalışma tahminin varsaydığı koşulda değil. "Kanıt ne olurdu" sorusunun cevabı da buradan çıkıyor: aynı model ailesi ve aynı veriyle, çok epoklu düzende, iki üssü birlikte ve 0,006'dan dar bir belirsizlikle ölçen, tahmini önceden yazılmış bir deney.

> **Kendini yokla:** Üç açıklamanın üçü de güç yasası biçimini üretebiliyorsa, hangisinin doğru olduğu neden aynı eğriyi daha hassas ölçerek bulunamaz?

Çünkü üçü de o biçimi zaten üretiyor; eğri onları ayırmıyor. Ayıran şey açıklamaların farklı sonuç verdiği ikinci bir sayı — burada veri üssü ile parametre üssü arasındaki ilişki —, ve o sayıyı tahminin varsaydığı koşulda, tahminler arasındaki 0,006'lık farkı görecek kesinlikle ölçen bir çalışma henüz yok.

Bu türün öteki örnekleri seride aynı biçimi taşıyor. 23\. makalede örnekle öğrenmenin örtük bir gradyan inişi olduğu önerisini ve bu denkliğin önceden eğitilmiş modellerde açık bir hipotez olarak kaldığını görmüştük; Anwar ve arkadaşlarının envanterindeki ilk bilimsel sorun da örnekle öğrenmenin bir kara kutu olması. 109'da kayıp sıçramasının belirli verinin belirli bir parametre durumuyla bileşiminden doğduğu gösterilmiş, ama hangi yığının hangi durumda sıçratacağını önceden söyleyen bir gösterge bulunamamıştı. 112'de iz sürmenin gösterdiği katman ile başarıyla düzenlenen katman arasındaki bağıntının sıfıra yakın olduğu ölçülmüş, açıklanmamıştı.

## Üçüncü tür: koşulları farklı ölçümler

Üçüncü türde iki taraf da ölçüyor ve sonuçları çelişiyor. Bu türün bir kısmı, koşul okununca eriyor.

En temiz örnek öz-düzeltme. 35\. makalede Jie Huang ve arkadaşlarının ICLR 2024'teki ölçümünü görmüştük: öz-düzeltmenin ne zaman duracağına cevap anahtarı karar veriyorsa sayılar yükseliyor, anahtar olmadan kazanç kayboluyordu. Aynı çalışmada, dışarıdan geri bildirim almadan kendi cevabını iki tur gözden geçiren GPT-4'ün okul matematiğindeki doğruluğu 200 soruluk bir örneklemde yüzde 95,5'ten 89,0'a iniyor. Aviral Kumar ve arkadaşlarının ICLR 2025'te sunduğu çalışma ise özetinde tersini söylüyor: modeli kendini düzeltmeye pekiştirmeli öğrenmeyle eğitince öz-düzeltme işe yarıyor.

Tablolar yan yana konunca çelişki koşula iniyor. Kumar ve arkadaşlarının kendi ölçümünde eğitilmemiş taban model — Gemini 1.5 Flash, yarışma düzeyindeki bir matematik kümesinin 500 soruluk test alt kümesi — ilk denemede yüzde 52,6, kendini düzelttikten sonra 41,4 alıyor: öz-düzeltmesi eksi 11,2 puan. Eğitilmiş model ilk denemede 60,0, ikincide 64,4 alıyor: artı 4,4. Özetteki "yüzde 15,6'lık kazanç" bu iki farkın farkı: 4,4 − (−11,2) = 15,6. Son cevabın taban modelin ilk denemesine göre kazancı ise 64,4 − 52,6 = 11,8 puan (iki çıkarma bizim).

İki taraf da eğitilmemiş modelde öz-düzeltmenin zarar verdiğini ölçüyor; ayrıştıkları yer, modelin bunun için eğitilip eğitilmediği. Soru "öz-düzeltme işe yarar mı" diye sorulduğunda iki tarafa ayrılıyor. "Eğitilmemiş bir modele kendini düzeltmesini söylemek işe yarar mı" ve "bunun için eğitilmiş bir model kendini düzeltebilir mi" diye iki soruya ayrılınca, ikisi de cevaplanmış oluyor. Açık kalan kısım daha dar: eğitilmiş öz-düzeltmenin aynı hesapla paralel örneklemeyi genel olarak geçip geçmediği. SCoRe'un kendi düzeninde soru başına 32 örnekle paralel örnekleme 7,4 puan, düzeltmeyle birleşince 10,5 puan kazandırıyor; 33\. makalede gördüğümüz, düzeltme için ince ayarlanmış başka bir modelle yapılan ölçümde ise en iyi bölüşüm sorunun zorluğuna bağlı çıkmıştı.

> **Kendini yokla:** İki çalışma da öz-düzeltme ölçtüğü hâlde biri işe yaramadığını, öbürü yaradığını söylüyor. Hangisi yanlış?

İkisi de yanlış değil. Biri eğitilmemiş bir modele kendini düzeltmesini söylüyor, öbürü modeli bunun için eğitiyor; ikisi de eğitilmemiş modelde eksi ölçüyor — GPT-4'te okul matematiğinde 6,5 puan (95,5 − 89,0, çıkarma bizim), Gemini'de 500 soruluk kümede 11,2 puan. Çelişki, aynı adın iki ayrı işlemi taşımasından geliyordu.

İkinci örnek model çöküşü, ve koşul farkının bir çizgiye nasıl dönüştüğünü gösteriyor. 14\. makalede iki ölçümü karşılaştırmıştık: her kuşakta sentetik veri gerçeğin yerine geçiyorsa model bozuluyor, veri birikiyorsa bozulmuyor. Matthias Gerstgrasser ve arkadaşlarının çalışması, doğrusal regresyonda iki kapalı formülü yan yana koyuyor: biriktirmeninkini kendisi kanıtlıyor, veriyi değiştirmeninkini Dohmatob ve arkadaşlarının önceki bir çalışmasından aktarıyor. İlk yinelemenin sınama hatasına u dersek, veri her yinelemede yenisiyle değiştirildiğinde n yineleme sonra hata n × u oluyor. Veri biriktiğinde hata u × (1 + 1/4 + 1/9 + … + 1/n²), yani π² ÷ 6 ≈ 1,645 × u'yu hiçbir zaman geçmeyen bir toplam. On yinelemede birincisi 10u, ikincisi yaklaşık 1,55u (değerleri formüllerden biz hesapladık). Şekil 1 iki formülü yan yana çiziyor.

![Formülden hesaplanmış iki eğri. Üstte başlık: sınama hatası, ilk yinelemenin hatası u biriminde. Yatay eksen yineleme sayısı (n), 1'den 10'a; dikey eksen 0u'dan 10u'ya. Vurgulu eğri değiştirme: n × u, 1u'dan 10u'ya çıkan düz bir çizgi. Öbür eğri biriktirme: u × (1 + 1/4 + … + 1/n²); 1u'dan başlıyor, hemen düzleşiyor ve π² ÷ 6 ≈ 1,645u düzeyindeki kesikli çizginin altında kalıyor. Altta bir kayıt: kapalı formüllerden hesaplandı (doğrusal regresyon kuramı); dil modeli ölçümü değildir.](assets/yerine-koyma-biriktirme.svg "Şekil 1 — Aynı üreteç, iki ayrı defter")

Şekil 1'deki iki eğrinin arasındaki tek fark, eski verinin atılıp atılmadığı. Veriyi üreten süreç, model ve ölçü aynı.

Sonraki çalışmalar koşul listesini uzattı. Elvis Dohmatob ve arkadaşlarının ICLR 2025'teki çalışması gözetimli regresyon kuramında üçüncü bir düzeni inceliyor: sentetik veri yinelemeli değil, sabit bir oranda karışıyorsa, oran binde bir kadar küçük olsa bile veri büyüdükçe performans artmayı bırakıyor. Joshua Kazdan ve arkadaşlarının ICML 2025'teki çalışması bir ince ayar düzeninde, gerçek verinin **sayısının** oranından daha çok şey açıkladığını ölçüyor. "Model çöküşü" böylece tek bir soru olmaktan çıkıp kuramda ve küçük deneylerde koşul başına cevaplanmış üç soruya dönüşüyor: değiştirme, biriktirme, sabit oran. Geriye kalan kısım ise birinci türe ait: gelecekteki web verisinin hangi düzende biriktiği ölçülemiyor, çünkü o veri henüz yok.

Aynı biçimi iki eski tartışmada da görmüştük. 78\. makalede beliren yeteneklerin bir kısmının puanlama biçiminden ve ölçümün çözünürlüğünden geldiğini, kayıp ekseninde ölçülen eşiklerin ise ölçünün sürekliliğinden bağımsız durduğunu; 34'te pekiştirmenin yeni yetenek ekleyip eklemediğinin başlangıç modeline, eğitimin süresine ve görev karışımına bağlı göründüğünü. İkisinde de koşul okundu, ama tartışma tam erimedi: beliren yeteneklerde geriye kayıp ekseninde neden bir eşik olduğu sorusu kaldı, ve o artık ikinci türden bir soru.

## Kapanmış görünen, açık sanılan

Bir envanterin öbür sınırı da var: açık sanılan ama koşulu içinde cevaplanmış sorular. 29\. makalede tek bir vektörün temsil edebileceği belge kümesinin boyutla sınırlandığı hem kanıtlanmış hem ölçülmüştü; 108'de bir FLOP'un bir zaman birimi olmadığı, 113'te bir protein yapısının kör bir sınavda doğrulanabildiği. Bunlar açık sorular listesine girerse liste şişer ve asıl açıkları gizler. Kapanmış bir soruyu kapanmış yapan şey, cevabın hangi koşulda geçerli olduğunun yazılmış olması; o koşulun dışına taşınan cümle ise yeniden açık bir soru olur.

## Envanterin biçimi

Şekil 2 dört kutuyu ve aralarındaki geçişleri gösteriyor. Kutuların son satırları, bir soruyu bir kutudan ötekine taşıyan işi adlandırıyor ve oklar o işin sorusu nereye götürdüğünü çiziyor. Şekil iki şeyi görünür kılıyor. Birincisi, aracı olmayan bir sorudan cevaba giden doğrudan bir yol yok: soru önce ölçülebilir hâle gelmek zorunda, ve bunu okumak değil araç kurmak yapıyor. İkincisi, üçüncü türden iki çıkış var. Koşul okununca soru ya koşul başına cevaplanıyor — öz-düzeltme, model çöküşünün üç düzeni — ya da ikinci türe iniyor: beliren yeteneklerde ölçü tartışması büyük ölçüde çözüldü, kayıp eşiğinin nedeni açıklanmadı.

![Dört kutu ve aralarında oklar. Sol üstte aracı yok: gözlenmeyen davranış (67), yetenek çıkarımının tamlığı (70), dilde sertifikalı sağlamlık (79); kanıt: önce ölçen bir araç; araç kurulunca ikinci türe (96). Sağ üstte ölçülmüş, açıklanmamış: ölçek yasasının biçimi (9), büyük ağlarda genelleme (96), örnekle öğrenmenin mekanizması (23); kanıt: ayırt edici tahmin, sınanmış; sınanınca cevaba, fark 0,006. Sol altta koşulları farklı ölçümler: öz-düzeltme (35), model çöküşü (14), beliren yetenekler (78), pekiştirmenin sınırı (34); kanıt: eşleşmiş koşulda ölçüm; koşul okununca cevaba ya da ikinciye. Sağ altta koşulu içinde cevaplanmış: tek vektörün boyut sınırı (29), FLOP zaman birimi değildir (108), kör sınavda protein yapısı (113); sınır: cevap koşulun dışına taşınmaz. Oklar sol üstten sağ üste, sağ üstten sağ alta, sol alttan sağ alta ve sol alttan sağ üste gider. Altta: kutulara yerleştirme bizim okumamız; oklar türü değiştiren işi adlandırır.](assets/bilinmeyenin-turleri.svg "Şekil 2 — Türü değiştiren iş, türe göre değişir")

Kutulardaki örneklerin yeri bizim okumamız ve bazı sorular iki kutuya birden oturuyor: model çöküşünün koşul başına cevaplanmış kısmı cevaplanmışlar kutusuna, gelecekteki verinin düzeni ise aracı olmayan sorulara da ait. Bu yüzden şeklin asıl bilgisi kutuların içeriğinden çok geçişlerde: her türün kendi çözüm biçimi var ve bir türe uygun iş öbüründe işe yaramıyor.

## Bilinmeyenin karşısında karar

Bir envanter karar vermeyi beklemez. Yoshua Bengio başkanlığında, 30 ülkenin aday gösterdiği bir danışma paneliyle 96 bağımsız uzmanın yazdığı ve hakemli olmayan Uluslararası Yapay Zekâ Güvenliği Raporu bu durumu 2025 sürümünde **kanıt ikilemi** (evidence dilemma) diye adlandırıyor: sınırlı kanıtla alınan önlemler etkisiz ya da gereksiz çıkabilir, daha güçlü kanıtı beklemek ise toplumu hazırlıksız bırakabilir.

Seri bu ikileme bir araç ekliyor ve onu 114 ile 115'te kurduk: geri alma maliyeti. Birinci türden bir bilinmeyenin karşısında verilen karar geri alınabilirse, deneyip görmek meşru bir yöntemdir; yanlış çıkarsa geri dönülür ve aradaki sürede bir araç kurulmuş olabilir. Geri alınamazsa — ağırlığın yayımlanması, dünyaya yazan bir eylem — karar anında istenen kanıt, belki henüz var olmayan bir araçla ölçülmek zorunda kalır. Bilinmeyenin türü, hangi kararların bugün verilebileceğini de belirliyor.

## Şu an söylenebilecekler

**Bir bilinmeyen, onu neyin kapatacağı söylenebildiği ölçüde bilinir.** "Açık soru" bir etiket; bilgi, eksik olan kanıtın türünü söyleyen cümlede durur.

**Birinci türde ölçen araç yok ve okumak onu çözmüyor.** Gözlenmeyen davranış, yetenek çıkarımının tamlığı, dilde sertifikalı sağlamlık. Değerlendirme farkındalığını bastırmanın davranışa etkisi modelden modele işaret değiştiriyor: bir modelde eksi 7,4, ötekinde artı 21,7 puan.

**İkinci türde ölçüm var, açıklama yok, ve açıklamaları ayıran sayı küçük.** Ölçek yasasının açıklamaları veri üssü için 0,006 ayrışan tahminler veriyor; iki üssü birlikte ölçen tek çalışma tahminin koşulunda değil.

**Üçüncü türün bir kısmı koşul okununca eriyor.** Öz-düzeltme tartışması eğitilmemiş ile eğitilmiş model ayrımına iniyor; model çöküşü üç düzenin üç cevabına.

**Türü değiştiren iş türe göre değişir.** Birinciyi araç kurmak, ikinciyi ayırt edici bir tahmini sınamak, üçüncüyü iki tarafı aynı koşulda ölçmek değiştirir.

**Bilinmeyenin türü, bugün hangi kararların verilebileceğini belirler.** Geri alınabilir karar deneyerek öğrenebilir; geri alınamaz karar çoğu zaman henüz var olmayan bir ölçümü ister.

Bu okumanın sınırı da var. Sınıflandırma bizim; bazı sorular iki türe birden oturuyor ve başka bir okur aynı soruyu başka bir kutuya koyabilir. Buradaki sayılar 2020–2025 çalışmalarına ait ve böyle bir envanterin en hızlı eskiyen yanı, hangi sorunun hangi kutuda durduğu: bir yıl sonra kutuların içeriği değişmiş olacak. Değişmeyecek olan, bir sorunun kutusunu belirleyen soru: onu ne kapatırdı?

### Sırada ne var

Bu makalede bir tartışma, aynı adın iki ayrı işlemi taşıdığı anlaşılınca eridi. Alanın en çok konuşulan sorusu da benzer bir durumda olabilir: "yapay genel zekâ" adı kaç ayrı şeyi adlandırıyor, ve her biri hangi sınavı gerektiriyor? Bir sonraki makale bu tartışmayı kehanetlerle değil, tanımlar ve ölçümlerle ele alıyor.

## Kaynakça

- Anwar, U., Saparov, A., Rando, J. ve ark. (2024). *Foundational Challenges in Assuring Alignment and Safety of Large Language Models*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2404.09932)
- Casper, S., Davies, X., Shi, C. ve ark. (2023). *Open Problems and Fundamental Limitations of Reinforcement Learning from Human Feedback*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2307.15217)
- Abdelnabi, S. & Salem, A. (2025). *The Hawthorne Effect in Reasoning Models: Evaluating and Steering Test Awareness*. Advances in Neural Information Processing Systems 38 (NeurIPS 2025). [Bağlantı](https://doi.org/10.52202/085713-4731)
- Zhang, C., Bengio, S., Hardt, M., Recht, B. & Vinyals, O. (2021). *Understanding Deep Learning (Still) Requires Rethinking Generalization*. Communications of the ACM, 64(3), s. 107–115. [Bağlantı](https://doi.org/10.1145/3446776)
- Bahri, Y., Dyer, E., Kaplan, J., Lee, J. & Sharma, U. (2024). *Explaining Neural Scaling Laws*. Proceedings of the National Academy of Sciences, 121(27), e2311878121. [Bağlantı](https://doi.org/10.1073/pnas.2311878121)
- Michaud, E. J., Liu, Z., Girit, U. & Tegmark, M. (2023). *The Quantization Model of Neural Scaling*. Advances in Neural Information Processing Systems 36 (NeurIPS 2023). [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/5b6346a05a537d4cdb2f50323452a9fe-Abstract-Conference.html)
- Liu, Y., Liu, Z. & Gore, J. (2025). *Superposition Yields Robust Neural Scaling*. Advances in Neural Information Processing Systems 38 (NeurIPS 2025). [Bağlantı](https://doi.org/10.52202/085713-5320)
- Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., Gray, S., Radford, A., Wu, J. & Amodei, D. (2020). *Scaling Laws for Neural Language Models*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2001.08361)
- Huang, J., Chen, X., Mishra, S., Zheng, H. S., Yu, A. W., Song, X. & Zhou, D. (2024). *Large Language Models Cannot Self-Correct Reasoning Yet*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/8b4add8b0aa8749d80a34ca5d941c355-Abstract-Conference.html)
- Kumar, A., Zhuang, V., Agarwal, R., Su, Y., Co-Reyes, J. D. ve ark. (2025). *Training Language Models to Self-Correct via Reinforcement Learning*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/871ac99fdc5282d0301934d23945ebaa-Abstract-Conference.html)
- Gerstgrasser, M., Schaeffer, R., Dey, A. ve ark. (2024). *Is Model Collapse Inevitable? Breaking the Curse of Recursion by Accumulating Real and Synthetic Data*. Conference on Language Modeling (COLM 2024). [Bağlantı](https://arxiv.org/abs/2404.01413)
- Dohmatob, E., Feng, Y., Subramonian, A. & Kempe, J. (2025). *Strong Model Collapse*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/284afdc2309f9667d2d4fb9290235b0c-Abstract-Conference.html)
- Kazdan, J., Schaeffer, R., Dey, A., Gerstgrasser, M., Rafailov, R., Donoho, D. L. & Koyejo, S. (2025). *Collapse or Thrive: Perils and Promises of Synthetic Data in a Self-Generating World*. Proceedings of the 42nd International Conference on Machine Learning, PMLR 267, s. 29469–29494. [Bağlantı](https://proceedings.mlr.press/v267/kazdan25a.html)
- Bengio, Y. ve ark. (2025). *International AI Safety Report*. Bağımsız uzman raporu; danışma panelini 30 ülke ile OECD, AB ve BM aday gösterdi (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2501.17805)
