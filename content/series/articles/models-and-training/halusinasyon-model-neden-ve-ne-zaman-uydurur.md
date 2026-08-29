---
article_id: article_bff5d1a5-b14e-4a4a-992a-2e5df2e0e80b
title: "Halüsinasyon: Model Neden ve Ne Zaman Uydurur?"
slug: halusinasyon-model-neden-ve-ne-zaman-uydurur
category: models-and-training
level: intermediate
reading_order: 17
summary: "10. makalenin bıraktığı borcu öder: uydurmanın tanımı, ölçülmüş sıklığı, bir kez görülmüş olgulardan doğan istatistiksel tabanı, ikili puanlayan sınavların tahmini ödüllendirmesi ve tespit ile azaltma yollarının nereye müdahale ettiği."
tags:
  - halusinasyon
  - kalibrasyon
  - belirsizlik
  - olgusallik
  - degerlendirme
content_hash: sha256:143765df0ce5d232edef1c002f0d0a24fed390ed41710a6a633b725d71355d1b
classification_version: 1
classification_batch: 3
---
## Akıcılıkla doğruluk arasındaki boşluk

16\. makale bir ayrıntıyla kapandı: neredeyse bütün değerlendirmeler ikili puanlıyor. Doğru cevap bir puan, yanlış cevap sıfır — ve "bilmiyorum" da sıfır. Böyle bir sistemde tahmin etmek susmaktan hiçbir zaman kötü değildir.

Şimdi bunu 10\. makaledeki mekanizmayla yan yana koy. Model her adımda bir olasılık dağılımından çekiliş yapar; ürettiği metnin akıcı olması, dilin istatistiğine uyduğu anlamına gelir, dünyaya uyduğu anlamına gelmez. Orada bu ayrımı "akıcılık doğruluk değildir" diye kaydetmiş ve halüsinasyon terimini yalnızca telaffuz edip ayrıntısını buraya bırakmıştık.

Borcu ödeme vakti. Bu makalenin tezi tek cümle: **uydurma bir arıza değil, sistemin normal çalışmasının ölçülebilir bir sonucudur** — ve nerede olduğunu bilirsen nereye müdahale edeceğini de bilirsin. Sırayla üç şey yapacağız: terimi netleştirmek, sıklığını ölçmek, kökünü iki ayrı katmanda göstermek.

## Terimi netleştirmek

"Halüsinasyon" alanın en gevşek kullanılan sözcüklerinden biri; her yanlış cevaba bu ad veriliyor. Ziwei Ji ve arkadaşlarının 2023'te ACM Computing Surveys'te yayımladığı derleme, kullanılabilir bir ayrım getiriyor.

**İçsel uydurma** (intrinsic hallucination), çıktının kendisine verilen kaynakla çelişmesidir. Modele bir metin verilip özetlemesi istendiğinde, metinde "onaylandı" yazarken özette "reddedildi" demek içsel uydurmadır: çelişki elimizdeki belgede görünür.

**Dışsal uydurma** (extrinsic hallucination), çıktının verilen kaynaktan doğrulanamamasıdır. Model kaynağın içermediği bir tarih, bir isim, bir sayı ekler. Bu bilgi tesadüfen doğru bile olabilir; sorun, elimizdeki malzemeyle kontrol edilememesidir.

Ayrım pratik bir sonuç taşıyor: iki tür farklı yerden gelir ve farklı çözüm ister. İçsel uydurma, modelin önündeki metni doğru işlememesidir. Dışsal uydurma ise modelin **parametrelerinden** gelen ve doğrulanmamış bir iddiadır — bu makalenin asıl konusu odur.

Bir terim uyarısı daha. "Halüsinasyon" sözcüğü, modelin bir şey "gördüğünü sandığını" ima ettiği için eleştiriliyor; alanda daha dar bir sözcük de kullanılıyor. Nature'da yayımlanan bir çalışma bunu şöyle tanımlıyor: model bir şeyi **sebepsiz** uydurur ve bunun işareti şudur — aynı soruyu farklı bir rastgele tohumla tekrar sorduğunda başka bir cevap üretir. Bu tanım işimize yarayacak, çünkü ölçülebilir bir davranışa dayanıyor.

## Ne kadar sık?

Sayıya geçelim. 11\. makalede InstructGPT ölçümünü görmüştük: girdide olmayan bilgiyi uydurma davranışı GPT-3'te yüzde 41 iken talimatla eğitilmiş sürümde yüzde 21'e inmişti. Orada da not düşmüştük — yüzde 21 hâlâ beş cevaptan birinden fazlası demek.

Serbest üretimde ölçmek daha zor, çünkü uzun bir metin doğru ve yanlış bilgileri karıştırır; "bu cevap doğru mu" sorusunun ikili bir cevabı yoktur. Sewon Min ve arkadaşlarının EMNLP 2023'te sunduğu FActScore bu sorunu bir ölçme kararıyla çözüyor: üretilen metni **atomik olgulara** (atomic facts) ayır, her birini güvenilir bir bilgi kaynağıyla ayrı ayrı denetle, desteklenen olguların oranını raporla.

Yöntemi insan değerlendirmesiyle kişi biyografileri üzerinde uyguladıklarında çıkan sayı çarpıcı: çalışmanın 2023'te değerlendirdiği ChatGPT sürümü, ürettiği atomik olguların yalnızca yüzde 58'ini destekleyebiliyordu. Yani ortalama bir biyografide cümlelerin kabaca beşte ikisi doğrulanamıyordu — üstelik metin akıcı, kendinden emin ve iyi biçimlendirilmiş olarak.

Bu ölçümün kendisi 16\. makalenin dersini taşıyor: "modeller ne kadar uyduruyor" sorusunun cevabı, uydurmayı nasıl ölçtüğüne bağlı. İkili puanlayan bir sınav yüzde 90 doğruluk gösterirken, atomik olgu düzeyinde bakan bir ölçüm aynı model için yüzde 58 verebilir. İkisi de doğrudur; farklı şeyleri ölçüyorlar.

## Kökü: bir kez görülmüş olgular

Şimdi asıl soruya gelelim. Model neden uyduruyor? İlk akla gelen cevaplar — "veri kirli", "mimari yetersiz" — tek başına yetmiyor, çünkü kusursuz veriyle ve kusursuz mimariyle bile ortadan kalkmayan bir taban var.

Adam Tauman Kalai ve Santosh Vempala'nın STOC 2024'te sunduğu çalışma bu tabanı matematiksel olarak kurdu ve sonucu tek cümleyle söylenebilir: **kalibre bir dil modeli, belirli türden olgularda uydurmak zorundadır.** Burada "kalibre" olmak, modelin ürettiği metnin istatistiksel özelliklerinin eğitim dağılımınınkine uyması demektir — 5\. makalede kurduğumuz sonraki-token hedefinin doğal olarak ittiği yer.

Mekanizma sezgisel olarak şöyle işliyor. Bir derlemde bazı olgular defalarca geçer: bir ülkenin başkenti, ünlü bir kişinin doğum yılı. Bazıları ise **tam bir kez** geçer — az bilinen bir kişinin doğum tarihi, küçük bir kasabanın kuruluş yılı. Bir de derlemde hiç geçmeyenler var.

Buradaki kritik istatistiksel fikir eskidir ve adı Good-Turing tahminidir: bir örneklemde **hiç görülmemiş** şeylerin toplam olasılığı, kabaca **tam bir kez görülmüş** şeylerin oranına eşittir. Bir kez görülenlerin çokluğu, henüz görmediklerinin de çok olduğunun işaretidir.

Sezgiyi bir örnekle kuralım. Bir gölden yüz balık tutmuş olduğunu düşün. Türleri sayıyorsun: bazıları onlarca kez çıktı, yirmi tanesi ise yalnızca birer kez. Bir sonraki balığın, listende hiç olmayan bir tür olma olasılığı nedir? Good-Turing'in cevabı kabaca 20 ÷ 100 = 0,2'dir — tek seferlik türlerin oranı, görmediklerinin payını tahmin eder. Bu benzetmenin bozulduğu yer şurası: gölden çekilen balıklar birbirinden bağımsızdır, oysa bir derlemdeki olgular bağımsız değildir — biri diğerinden çıkarılabilir. Bir kişinin doğum yılını hiç görmemiş olsan bile, meslek hayatının tarihlerinden onu daraltabilirsin. Benzetmenin biçimsel karşılığı da tam olarak bu kayıtla verilir: çalışmanın sonucu, **keyfî** olgular için — yani doğruluğu eğitim verisinden türetilemeyecek olanlar için — geçerlidir. Türetilebilir olgular bu tabanın dışındadır.

Şimdi ikisini birleştir. Model kalibre ise, eğitim verisinin ima ettiği "henüz görmediğim olgular" payını da üretmek zorundadır. Ama o olgular hakkında bilgisi yoktur; ürettiği şey, doğru biçimde ama yanlış içerikle doldurulmuş bir cümledir. Çalışmanın sonucu tam olarak bu: uydurma oranının alt sınırı, eğitim verisinde tam bir kez geçen olguların oranına yaklaşır — ve bu sınır mimariden de veri kalitesinden de bağımsızdır.

![Eğitim verisindeki olgular üç öbekte gösterilir: çok kez geçenler, tam bir kez geçenler ve hiç geçmeyenler; bir kez geçenlerin oranı ile hiç geçmeyenlerin toplam olasılığının aynı büyüklükte olduğu ve uydurma tabanını bu payın belirlediği işaretlenir.](assets/bir-kez-gorulen-olgular.svg "Şekil 1 — Uydurmanın istatistiksel tabanı")

Şekil 1'i sayıyla somutlaştıralım — aşağıdaki rakamlar açıklama amaçlı seçilmiştir, çalışmadan alınma değildir. Diyelim derlemde bin kişinin doğum tarihi geçiyor ve bunların iki yüzü tam bir kez geçmiş. Good-Turing tahmini, modelin hiç görmediği doğum tarihlerinin toplam olasılık payının kabaca 200 ÷ 1000 = 0,2 olduğunu söyler. Kalibre bir model bu payı bir yere harcamak zorundadır ve harcayacağı yer, hakkında hiçbir kanıtı olmayan tarihlerdir. Yani beş sorudan birinde uydurma, modelin bozukluğu değil kalibrasyonunun sonucudur.

Buradan iki bağ çıkıyor. Birincisi 14\. makaleye: tekilleştirme tartışmasında "bir kez geçen" belgelerin nasıl ele alınacağı bir kalite kararıydı; burada aynı kategori bir **doğruluk** sorununa dönüşüyor. İkincisi 10\. makaleye: uydurma, üretimin bir çekiliş olmasının doğrudan sonucudur — model kanıtı olmayan bir aday için sıfır olasılık ayırmıyor, ayıramıyor.

> **Kendini yokla:** Bu sonuç neden "daha çok veri toplarsak halüsinasyon biter" demeyi engelliyor?

Çünkü veri büyüdükçe bir kez geçen olguların **sayısı** da büyür. Yeni veri, daha önce hiç görülmemiş binlerce az bilinen olguyu getirir ve bunların çoğu yine tek seferlik olur. Taban oran veriyle otomatik olarak sıfıra gitmez; hangi olguların kaç kez geçtiğine bağlıdır. Uydurmayı azaltmanın yolu veriyi büyütmekten değil, modelin bilmediğini söyleyebilmesinden geçer — yani kalibrasyonu bilerek bozmaktan.

## Neden geçmiyor: sınavın teşviki

Teorik taban bir zemin veriyor ama gözlenen oranların tamamını açıklamıyor. İkinci katman post-training'de ve doğrudan 16\. makaleye bağlanıyor.

Kalai, Ofir Nachum, Vempala ve Edwin Zhang'ın 2025 tarihli çalışması argümanı şöyle kuruyor: modeller, iyi sınav verecek biçimde eniyileniyor ve belirsizken tahmin etmek sınav puanını yükseltiyor. Yazarların benzetmesi bir öğrenci: zor bir soruda emin değilsen boş bırakmak yerine bir şey yazarsın, çünkü boş kesinlikle sıfır getirir.

Bunu sayıyla yürütelim. Dört şıklı bir soruda modelin doğru cevabı bilme olasılığı yüzde 25 olsun.

| Davranış | Beklenen puan |
|---|---|
| Tahmin et | 0,25 × 1 + 0,75 × 0 = **0,25** |
| Bilmiyorum de | **0** |

Tahmin, susmayı her koşulda yener. Şimdi klasik sınavlardaki düzeltme formülünü uygulayalım: yanlış cevap 1 ÷ 3 puan **götürsün**.

| Davranış | Beklenen puan |
|---|---|
| Tahmin et | 0,25 × 1 + 0,75 × (−1 ÷ 3) = **0** |
| Bilmiyorum de | **0** |

Artık iki seçenek eşit; güven yüzde 25'in altına düştüğünde susmak kârlı hâle gelir. Değişen tek şey puanlama kuralı.

![İki puanlama düzeni yan yana: solda yanlışın sıfır getirdiği ikili puanlamada tahminin beklenen değerinin susmayı geçtiği, sağda yanlışın ceza getirdiği düzende iki seçeneğin eşitlendiği ve eşiğin altında susmanın kârlı olduğu gösterilir.](assets/sinavin-tesviki.svg "Şekil 2 — Puanlama kuralı davranışı belirler")

Şekil 2'nin gösterdiği şey teknik değil kurumsal bir sorun. Çalışmanın önerdiği çözüm de buna uygun: yeni bir halüsinasyon değerlendirmesi eklemek yerine, liderlik tablolarına hâkim olan mevcut değerlendirmelerin **puanlamasını** değiştirmek. Bu çalışmanın hakem sürecinden geçmemiş bir teknik rapor olduğunu belirtelim; argümanın kendisi ise 16\. makalede ölçtüğümüz gerçeklerin doğrudan sonucudur.

Öğrenci benzetmesinin sınırını da söyleyelim: bir öğrenci puanı umursadığı için tahmin eder, modelin ise umursaması yoktur. Benzetmenin biçimsel karşılığı şudur — model, eğitimi sırasında değerlendirmeye benzeyen sinyallerle ayarlanır ve o sinyal tahmini ödüllendiriyorsa, ortaya çıkan davranış tahmin etmek olur. Niyet yoktur; teşvik vardır.

13\. makaledeki ödül tartışması da aynı yere bakıyor. Ödül modeli insan memnuniyetini ölçer; kendinden emin, akıcı, kararlı bir cevap, "emin değilim" diye başlayan bir cevaptan daha çok beğenilir. Yani hem sınav hem de tercih verisi aynı yöne itiyor.

> **Kendini yokla:** Halüsinasyonu ölçen yeni bir değerlendirme kümesi eklemek, neden tek başına çözüm değildir?

Çünkü davranışı belirleyen şey hangi kümenin var olduğu değil, hangi kümenin puanının **kovalandığıdır**. Yeni bir küme, liderlik tablosuna hâkim olan mevcut sınavların ikili puanlamasını değiştirmez; model yine o sınavlarda iyi olacak biçimde ayarlanır ve tahmin etmek yine kârlı kalır. 16\. makaledeki Goodhart uyarısının bu makaledeki karşılığı budur: bir davranışı düzeltmek istiyorsan, onu ölçen sayıyı değil, alanın kovaladığı sayıyı düzeltmen gerekir.

## Tespit: aynı soruyu birkaç kez sormak

Uydurmayı azaltmadan önce fark etmek gerekiyor. Buradaki en zarif fikirlerden biri, Sebastian Farquhar, Jannik Kossen, Lorenz Kuhn ve Yarin Gal'in 2024'te Nature'da yayımladığı çalışmadan geliyor ve dayanağı yukarıdaki tanım: model sebepsiz uyduruyorsa, aynı soruyu yeniden sorduğunda başka bir şey uydurur.

Naif uygulama işe yaramaz. Modelin ürettiği metinlerin çeşitliliğini doğrudan ölçersen, aynı şeyi farklı kelimelerle söylemeyi de belirsizlik sanırsın: "Paris" ile "Fransa'nın başkenti Paris'tir" iki farklı dizedir ama tek bir cevaptır.

Çalışmanın çözümü ölçüyü kelimelerden anlama taşımak. Aynı soruya birkaç cevap üretilir, cevaplar **anlamca eşdeğer** olanlar bir arada olacak biçimde öbeklere ayrılır, belirsizlik dizeler üzerinden değil öbekler üzerinden hesaplanır. Cevaplar tek bir anlam öbeğinde toplanıyorsa model tutarlıdır; farklı anlamlara dağılıyorsa cevabı uyduruyor olma ihtimali yüksektir.

![Aynı soruya üretilen beş cevap iki kez sayılır: solda beş farklı dize ayrı ayrı listelenir, sağda anlamca eşdeğer olanlar birleştirilerek üç anlam öbeği kalır ve belirsizliğin öbek sayısında görüldüğü işaretlenir.](assets/anlam-obekleri.svg "Şekil 3 — Belirsizliği kelimede değil anlamda ölçmek")

Şekil 3'ün sol tarafı 10\. makaledeki örnekleme mekanizmasının doğrudan kullanımı: çeşitlilik zaten oradaydı, yeni olan onu bir sinyale çevirmek. Yöntemin bedeli de görünür — tek cevap yerine birkaç cevap üretmek gerekir, yani ölçüm hesaba mal olur.

## Azaltmanın üç ayrı yeri

Uydurmayı azaltma önerileri bir yığın hâlinde sunuluyor ama hepsi aynı yere müdahale etmiyor. Üçe ayırmak faydalı.

**Girdiye müdahale.** Modelin parametrelerinden gelen doğrulanmamış iddia sorunsa, cevabı üretmeden önce güvenilir metni modelin önüne koymak sorunun sınıfını değiştirir: dışsal uydurma, içsel uydurmaya dönüşür. Bu önemli bir kazanç, çünkü içsel uydurma denetlenebilir — elimizde karşılaştırılacak bir kaynak vardır. Yukarıdaki istatistiksel taban da bu yolla aşılabilir: bir kez görülmüş bir olgu artık ağırlıklardan hatırlanmaya çalışılmaz, üretim anında önüne konur. Bu yaklaşımın tam kurulumunu 41\. makalede yapacağız; burada işaretlenecek şey, çözmediğidir — model önüne konan metni de yanlış okuyabilir, ilgisiz bir parçaya bakabilir ya da metinle çelişen bir şey ekleyebilir.

**Çıktıya müdahale.** Semantik belirsizlik gibi ölçüler cevabı ürettikten sonra devreye girer: düşük güvenli cevaplar elenebilir, kullanıcıya işaretle sunulabilir ya da başka bir kaynağa yönlendirilebilir. Bu katmanın üstünlüğü, modelin kendisine hiç dokunmadan çalışması; bedeli ise hesap — tek cevap yerine birkaç cevap üretmek gerekir, yani her soru birkaç kat pahalılaşır. Bu ödünleşim, 16\. makaledeki verimlilik ölçüsünün neden ayrı bir sütun olarak raporlanması gerektiğinin somut bir örneği.

**Eğitime müdahale.** Modelin belirsizken çekimser kalmasını öğretmek mümkündür ve tercih verisi bunun doğal aracıdır: "emin değilim" diyen cevap, kendinden emin yanlış cevaba tercih edilirse ödül modeli bunu öğrenir. Ama burada 11\. makaledeki hizalama vergisinin bir başka yüzü çıkar karşımıza — fazla çekimser bir model, cevabı bildiği yerlerde de susmaya başlar ve yardımseverliğini kaybeder. Dahası bu, kalibrasyonu bilerek bozmak demektir: model artık eğitim dağılımını taklit etmez, bilmediği yerde durur. Modelin kendi güveninin doğrulukla ne kadar örtüştüğü, yani kalibrasyon sorusunun kendisi, ileride ayrı bir makalenin konusu.

Üçünün ortak dersi şu: hiçbiri uydurmayı sıfırlamıyor, her biri onu başka bir yere taşıyor. Girdiye müdahale sorunu denetlenebilir hâle getirir, çıktıya müdahale görünür kılar, eğitime müdahale ise sıklığını yardımseverlik karşılığında azaltır.

## Yeni bilgi öğretmek uydurmayı artırıyor

Son bir bulgu, hem bu makaleyi hem de bir sonrakini kuruyor.

Modelin bilmediği bir şeyi öğretmenin doğal yolu ince ayar gibi görünür: yeni olguları örnek olarak yaz, modeli onlarla eğit. Zorik Gekhman ve arkadaşlarının EMNLP 2024'te sunduğu çalışma bunu denedi ve iki adımlı bir sonuç buldu.

Birincisi: modelin **bilmediği** olguları içeren ince ayar örnekleri, bildikleriyle uyumlu örneklere kıyasla belirgin biçimde daha yavaş öğreniliyor. Model yeni bilgiyi zorlukla alıyor.

İkincisi ve asıl önemlisi: o örnekler sonunda öğrenildikçe, modelin uydurma eğilimi **doğrusal olarak artıyor**. Yani modele bilmediği bir şeyi ince ayarla öğretmek, o olguyu kazandırırken genel olarak daha çok uydurmasına yol açıyor.

Yazarların yorumu, 12\. makaledeki yüzeysel hizalama hipotezinin dikkatli bir sürümü: dil modelleri olgusal bilgiyi ağırlıklı olarak ön eğitimde edinir; post-training ise o bilgiyi **kullanmayı** öğretir. İnce ayar bir bilgi yükleme kanalı değil, bir davranış kanalıdır — ve o kanalı bilgi yüklemek için kullanmak, modelin var olmayan bilgiyi de kendinden emin biçimde üretme alışkanlığını pekiştirir.

### Sırada ne var

Bu bulgu bir soruyu kaçınılmaz kılıyor. Bilgi ön eğitimde ediniliyorsa, o bilgi tam olarak **nerede** duruyor? 4\. makalede embedding defterini kurmuştuk ama bir olgu — bir kişinin doğum yılı, bir ülkenin başkenti — tek bir satıra sığmaz. 7\. makalede blok içindeki parametrelerin çoğunluğunun dikkatte değil ileri beslemeli katmanda olduğunu hesaplamıştık; belki cevap oradadır. 8\. makalede ise ezberi ölçmüş ve ezber ile genelleme arasındaki gerilimi bu makaleye değil, bir sonrakine borç bırakmıştık. Şimdi ikisini birden soralım: bir modelin ağırlıkları kaç bit bilgi tutabilir ve o bilgi ne zaman ezber, ne zaman öğrenme sayılır?

## Kaynakça

- Ji, Z., Lee, N., Frieske, R. ve ark. (2023). *Survey of Hallucination in Natural Language Generation*. ACM Computing Surveys 55(12), 1–38. [Bağlantı](https://dl.acm.org/doi/10.1145/3571730)
- Min, S., Krishna, K., Lyu, X. ve ark. (2023). *FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation*. EMNLP 2023, s. 12076–12100. [Bağlantı](https://aclanthology.org/2023.emnlp-main.741/)
- Kalai, A. T. & Vempala, S. S. (2024). *Calibrated Language Models Must Hallucinate*. STOC 2024 (56. ACM Symposium on Theory of Computing). [Bağlantı](https://dl.acm.org/doi/10.1145/3618260.3649777)
- Kalai, A. T., Nachum, O., Vempala, S. S. & Zhang, E. (2025). *Why Language Models Hallucinate*. OpenAI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2509.04664)
- Farquhar, S., Kossen, J., Kuhn, L. & Gal, Y. (2024). *Detecting hallucinations in large language models using semantic entropy*. Nature 630, 625–630. [Bağlantı](https://doi.org/10.1038/s41586-024-07421-0)
- Gekhman, Z., Yona, G., Aharoni, R., Eyal, M., Feder, A., Reichart, R. & Herzig, J. (2024). *Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations?*. EMNLP 2024, s. 7765–7784. [Bağlantı](https://aclanthology.org/2024.emnlp-main.444/)
