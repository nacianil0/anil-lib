---
article_id: article_752ba5d1-db6e-45a8-be33-f856be42dfc6
title: "Aktivasyonlara Müdahale: Yönlendirme ve Sondalar"
slug: aktivasyonlara-mudahale-yonlendirme-ve-sondalar
category: safety-and-evaluation
level: intermediate
reading_order: 76
summary: "62, 65, 66, 67 ve 75'te ayrı ayrı kullanılan tek bir işlemi çerçeveye oturtur: modelin ara aktivasyonuna bir yön ekleyip davranışını değiştirmek. Yönün dört bulunma yolunu — karşıt örneklerin ortalama farkı, eğitilmiş sonda, etiketsiz tutarlılık, seyrek sözlük parçası — ve aralarındaki ölçülmüş sıralamayı verir. Müdahalenin ayarlarını kurar: hangi katman, hangi konumlar, hangi katsayı, ekleme mi yön silme mi kelepçeleme mi koşullu mu. Ölçülen sonuçları iki taraflı koyar: on üç modelde tek yön silinince ret kalkıyor, doğruluk yönüyle 32,5'ten 65,1'e çıkılıyor, temsil yeniden yönlendirmeyle görülmemiş saldırıların başarısı düşerken yetenek korunuyor; ama kırk kümede yönlendirilebilirlik örnekten örneğe değişiyor, bazılarında girdilerin yarısı ters yöne gidiyor, ve ölçülen ortalamada düz istem bütün temsil yöntemlerini geçiyor. Kapanışta aynı davranışın üç kapısını — istem, aktivasyon, ağırlık — maliyet, kalıcılık, yan etki ve ölçülme biçimiyle karşılaştırır."
tags:
  - aktivasyon-mudahalesi
  - yonlendirme-vektoru
  - sonda
  - kavram-silme
  - model-duzenleme
content_hash: sha256:5fd9b2dc8ec05e4281e47f3f76f1a41a93df7065b78f9b47a04a9a0991b7d75a
classification_version: 1
classification_batch: 18
---
## Okumaktan müdahaleye

75 sözlüğü sınarken bir işlemi tekrar tekrar kullandı ama üstünde durmadı: bir parçanın etkinliğini zorla değiştirip modelin ne yaptığına bakmak. Köprü parçasının kelepçelenmesi buydu; cinsiyetle ilgili parçaların sıfırlanması da. Aynı işlem seri boyunca dağınık hâlde birkaç kez geçti. 62'de Arditi ve arkadaşlarının bulgusunu görmüştük: reddin tek bir yönle taşındığı ve o yön silinince modelin zararlı isteği reddetmediği. 65'te modelin kendi doğruluk bilgisini içeriden okuyan bir sınıflandırıcı vardı; 66'da karakteri taşıyan bir vektör; 67'de temsil mühendisliği yalan dedektörünü kurdu; 18'de bir olgunun ağırlıklara yazılması. Beşi de aynı aileden ve her biri ayrı bir gerekçeyle kullanıldı.

Bu makale aileyi tek çerçeveye alıyor. Dört soru. Bir davranışı taşıyan yön nasıl bulunur, ve bulma yöntemleri arasında ölçülmüş bir sıralama var mı? Bulunan yönle aktivasyona tam olarak ne yapılır — hangi katmanda, hangi konumda, hangi büyüklükte? Ölçüldüğünde ne kadar işe yarıyor ve nerede kırılıyor? Ve aynı davranışı değiştirmenin istem, aktivasyon ve ağırlık olmak üzere üç kapısı varken hangisini ne zaman kullanmak gerekir?

Bir sözcük ayrımıyla başlayalım. Bu makalede **yönlendirme** (steering), 75'te adını koyduğumuz işlem, modelin ara aktivasyonuna müdahale ederek davranışını istenen yöne çekmek anlamına geliyor. 72'de geçen "yönlendirmeli tamamlama" ise bambaşka bir şeydi: kirliliği kara kutuda tespit etmek için modele sınav sorusunun bir parçasını verip gerisini tamamlatmak. Aynı sözcük, iki ayrı iş.

## Yön nasıl bulunur

Müdahalenin girdisi bir vektördür ve onu bulmanın birkaç yolu var. Şekil 1 dördünü, ne gerektirdiklerini ve ölçüldüklerinde nerede durduklarını yan yana koyuyor.

![Dört satırlı tablo; sütunlar yöntem, nasıl bulunur, ne gerektirir, ölçülen. Karşıt örneklerin ortalama farkı: davranışı gösteren ve göstermeyen istem çiftlerinin aktivasyon ortalamalarının farkı; birkaç yüz etiketli çift gerektirir; kavram tespitinde ortalama eğri altı alanı 0,942 ile birinci. Eğitilmiş sonda: aktivasyondan etiketi kestiren doğrusal sınıflandırıcının ağırlık vektörü; aynı etiketli veriyi gerektirir; 0,940 ile ikinci, yönlendirmede ise 0,098 ile sonlarda. Etiketsiz tutarlılık: bir cümle ile olumsuzunun olasılıklarının tutarlı olmasını arayan ölçüt; etiket gerektirmez, karşıt çift kurgusu gerektirir; 67'de yalan dedektörünün temeliydi. Seyrek sözlük parçası: 75'in otokodlayıcısının bir parçasının çözücü yönü; etiket gerektirmez, eğitilmiş sözlük gerektirir; sözlüğün kendi seçimiyle 0,695, etiketle seçilirse 0,917. Altta not: dört yön de aynı uzayda yaşar, farkları etiket ihtiyacı ve seçimin nasıl yapıldığıdır; ölçülen sıralama seçim etiketle yapıldığında daralır.](assets/yon-bulmanin-dort-yolu.svg "Şekil 1 — Yön bulmanın dört yolu: etiket ihtiyacı, seçim biçimi ve ölçülen sıra")

En basit yol **karşıt örneklerin ortalama farkı**: davranışı gösteren istemlerle göstermeyen istemlerin aynı katmandaki aktivasyon ortalamaları çıkarılır, kalan vektör o davranışın yönü sayılır. Arditi ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma ret yönünü böyle buluyor; 13 açık sohbet modelinde, 72 milyar parametreye kadar. Nina Panickssery ve arkadaşlarının ACL 2024'te sunduğu çalışma aynı fikri bir yönteme çeviriyor: bir davranışın olumlu ve olumsuz örnek çiftlerinde artık akış aktivasyonlarının farkı ortalanıyor, ve elde edilen vektör çıkarımda kullanıcı isteminden sonraki bütün token konumlarına artı ya da eksi katsayıyla ekleniyor.

İkinci yol **sonda**: 67'de tanıştığımız, aktivasyondan tek bir özelliği okuyan küçük sınıflandırıcı. Sondanın ağırlık vektörü bir yöndür ve müdahale için kullanılabilir. Üçüncü yol etiketten kurtulmayı deniyor: Burns ve arkadaşlarının 67'de gördüğümüz ölçütü, bir cümle ile olumsuzunun olasılıklarının tutarlı olmasını arayarak yönü etiketsiz buluyor. Dördüncüsü 75'in sözlüğü: bir otokodlayıcı parçasının çözücü yönü.

Aralarında ölçülmüş bir sıralama var ve 75'te gördüğümüz tablo buraya ait. Kavram tespitinde ortalama fark yönü 0,942, eğitilmiş sonda 0,940, sözlüğün kendi seçtiği parça 0,695; parça etiketli veriyle seçilirse 0,917. Yani fark yöntemde değil, seçimin etiketle mi etiketsiz mi yapıldığında. Bir uyarı da 74'ten devrolan uyarının aynısı: bulunan yönün davranışı taşıdığını göstermek için okuma yetmez, müdahale gerekir.

## Aktivasyona ne yapılır

Yön elde edildikten sonra dört ayrı işlem yapılabiliyor ve dördü farklı şeyler vaat ediyor. Şekil 2 dördünü mekanikleriyle gösteriyor.

![Dört bloklu şema. Birinci blok ekleme: seçilen katmanda aktivasyona alfa çarpı yön ekleniyor; alfa büyüdükçe davranış artıyor ama akıcılık bozuluyor, uygulanan konumlar istemden sonraki bütün token'lar ya da yalnızca son konum olabiliyor. İkinci blok yön silme: aktivasyonun o yöne izdüşümü çıkarılıyor, yani davranış taşıyıcısı kanaldan kaldırılıyor; kapalı biçimli en küçük kareler sürümü bütün doğrusal sınıflandırıcıların kavramı bulmasını kanıtlanabilir biçimde engelliyor. Üçüncü blok kelepçeleme: bir sözlük parçasının etkinliği en yüksek değerinin katına sabitleniyor. Dördüncü blok koşullu müdahale: önce bir sonda girdiyi sınıflandırıyor, müdahale yalnızca koşul tutarsa uygulanıyor. Altta üç ayar kutusu: hangi katman, hangi token konumları, hangi katsayı; ve her üçünün de sonucun parçası olduğu, çünkü aynı yön farklı ayarla farklı sonuç veriyor.](assets/mudahalenin-dort-bicimi.svg "Şekil 2 — Aktivasyona müdahalenin dört biçimi ve üç ayarı")

En yaygın biçim **ekleme**: seçilen bir katmanda, seçilen token konumlarında, aktivasyona yönün bir katsayıyla çarpılmış hâli ekleniyor. Fikrin kökü eskiye gidiyor. Sumanth Dathathri ve arkadaşlarının ICLR 2020'de sunduğu çalışma, 10'da gördüğümüz üretim adımına bir öznitelik sınıflandırıcısının gradyanını sokarak konuyu ve üslubu yönlendirmişti; bugünkü fark, gradyan yerine sabit bir yönün kullanılması ve maliyetin neredeyse sıfıra inmesi. Nishant Subramani ve arkadaşlarının ACL 2022 Bulguları'nda sunduğu çalışma tek bir cümleyi üretecek gizli vektörü doğrudan aramıştı; Alexander Matt Turner ve arkadaşlarının 2023'te yayımladığı, hakemli olmayan çalışma iki istemin aktivasyon farkını ekleyerek aynı işi ölçmüştü.

İkinci biçim **yön silme**: aktivasyonun o yöndeki bileşeni çıkarılıyor, yani davranışın taşıyıcısı kanaldan kaldırılıyor. Arditi'nin ret deneyinde silinen buydu. Kavram silmenin kendi literatürü var: Shauli Ravfogel ve arkadaşlarının ACL 2020'de sunduğu yöntem, sınıflandırıcı eğitip boş uzayına izdüşürmeyi tekrarlayarak kavramı adım adım siliyor; Nora Belrose ve arkadaşlarının NeurIPS 2023'te sunduğu kapalı biçimli çözüm ise temsil vektörünü en az bozarak **bütün** doğrusal sınıflandırıcıların kavramı bulmasını kanıtlanabilir biçimde engelliyor ve bunu her katmanda uygulayan bir yordam veriyor. Bu ikinci grup, "sildim ve davranış değişti" iddiasını ölçülebilir kılıyor: silmenin ne kadar eksiksiz olduğu artık bir varsayım değil.

Üçüncü biçim 75'ten tanıdık **kelepçeleme**, sözlük parçasının etkinliğini zorla bir değere sabitlemek. Dördüncüsü daha yeni: Bruce W. Lee ve arkadaşlarının ICLR 2025'te sunduğu koşullu müdahale, girdi bir koşulu sağlıyorsa müdahaleyi uygulayıp sağlamıyorsa uygulamıyor — "girdi nefret söylemiyse reddet" gibi bir kural, bir sonda ile bir yönlendirme vektörünün birleşimi olarak yazılıyor. Bu, sabit müdahalenin en can sıkıcı yan etkisini, her girdiye aynı şeyi yapmasını, hedefliyor.

İlk iki biçimin farkı iki boyutlu küçük bir örnekte görülüyor; sayılar açıklama amaçlı. Aktivasyon a = (3, 1) olsun ve davranışın yönü birim vektör v = (1, 0), yani birinci eksen. Ekleme, Şekil 2'deki a ← a + α · v kuralıyla, α = 2 için a'yı (5, 1)'e taşır: yön boyunca bileşen 3'ten 5'e çıkar, geri kalan hiç değişmez. Silme, a ← a − (a · v) v kuralıyla, önce a'nın yön üstündeki payını ölçer, a · v = 3, sonra o payı çıkarır ve a'yı (0, 1)'e götürür: yön boyunca bileşen sıfırlanır, yine geri kalan korunur. Ekleme davranışı yeni bir düzeye iter; silme, girdi ne olursa olsun o yönde hiçbir şey bırakmaz. Ret deneyinde yön silinince zararlı isteklerin de reddedilmemesi bu yüzden: ret sinyali hangi istekten gelirse gelsin kanaldan kalkıyor.

Üç ayar sonucun içindedir: hangi katman, hangi konumlar, hangi katsayı. Aynı yön, farklı katmanda farklı sonuç verir; katsayı büyüdükçe davranış artar ama akıcılık ve genel yetenek düşer. Doğruluk yönü çalışmasında bu takas açıkça ölçülmüş ve müdahale gücüyle ayarlanabilir bir eğri olarak verilmiş.

> **Kendini yokla:** Bir yönü aktivasyona **eklemek** ile aktivasyondan o yönü **silmek** hangi iki farklı iddiayı sınar?

Ekleme "bu yön bu davranışı üretmeye yeter mi" diye sorar; silme "bu davranış için bu yön gerekli mi" diye. 74'ün gürültü giderme ile gürültüleme ayrımının aynısı, nesnesi bir bileşen değil bir yön. Ret örneğinde ikisi birden ölçüldü ve bu yüzden iddia güçlü: yön eklenince model zararsız isteği bile reddediyor (yeter), silinince zararlı isteği reddetmiyor (gerekli). Yalnızca biri ölçülseydi sonuç bir yönde eksik kalırdı.

## Ölçüldüğünde ne çıkıyor

Olumlu taraf somut. Ret deneyinde 13 modelin hepsinde tek bir yön bulunuyor; yön silinince model zararlı isteği yerine getiriyor, eklenince zararsız isteği reddediyor. Aynı çalışma bulguyu bir saldırıya çeviriyor: yön ağırlıklardan dikleştirilerek reddin kalıcı olarak devre dışı bırakılabildiğini ve bunun genel yeteneklere neredeyse dokunmadığını gösteriyor — 63'te açık ağırlıklı modelin saldırgana verdiği kapılardan biri buydu. Ve düşmanca son eklerin ne yaptığını da içeriden okuyor: ek, ret yönünün katmanlar boyu taşınmasını bastırıyor.

Kenneth Li ve arkadaşlarının NeurIPS 2023'te sunduğu çalışma yönü doğruluk için kuruyor: az sayıda dikkat başında, doğruluk yönü boyunca kaydırma yapan bir çıkarım anı müdahalesi, komut ayarlı bir modelin doğruluk puanını yüzde 32,5'ten 65,1'e çıkarıyor, ve bunun için birkaç yüz örnek yetiyor. Yazarlar takası da yazıyor: müdahale gücü arttıkça doğruluk artıyor, yardımseverlik düşüyor. Alessandro Stolfo ve arkadaşlarının ICLR 2025'te sunduğu çalışma yönü talimata bağlıyor — bir kısıt verilen ve verilmeyen istemlerin aktivasyon farkı — ve biçim, uzunluk, sözcük içerme gibi kısıtların istem olmadan da uygulatılabildiğini, üstelik birkaçının aynı anda toplanabildiğini gösteriyor.

Aynı fikrin savunma tarafındaki kullanımı Andy Zou ve arkadaşlarının NeurIPS 2024'te sunduğu çalışmada: model zararlı çıktı üretirken içerideki temsil başka bir yöne yeniden yönlendiriliyor, yazarların adıyla devre kesici. Ölçüm, 63'ün diliyle konuşuyor: eğitimde görülmemiş saldırı ailelerinde saldırı başarı oranı belirgin düşerken standart yetenek ölçütlerindeki puan büyük ölçüde korunuyor, ve aynı düzenek araç çağıran ajan kurulumunda da çalışıyor. 66'nın karakter vektörü de aynı ailedendi: ince ayarın karakterde yaptığı kaymanın o yön üzerindeki izdüşümle 0,76 ile 0,97 arasında ilişkili olduğu ölçülmüş, ve kayma eğitim sırasında ters yönde itilerek önlenebilmişti.

Şimdi öbür taraf. Daniel Tan, David Chanin ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma yönlendirme vektörlerinin güvenilirliğini sistematik olarak ölçüyor: kırk davranış kümesi, örnek örnek yönlendirilebilirlik. Üç bulgu. Birincisi, dağılım içinde bile yönlendirilebilirlik örnekten örneğe çok değişiyor; bazı kümelerde girdilerin neredeyse yarısı **ters** yöne gidiyor, yani müdahale amaçlananın tersini yapıyor. İkincisi, ters giden kümelerde çıkarılan vektörün davranışı değil, istem şablonuna bağlı yan etkenleri kodladığına dair kanıt var. Üçüncüsü, yönlendirilebilirlik büyük ölçüde modelin değil **veri kümesinin** özelliği; aynı ölçüm birden çok modelde tekrarlandığında sıralama kümeye göre belirleniyor. Dağılım dışına çıkıldığında vektörler çoğu zaman makul biçimde genelleşiyor ama bazı kavramlarda isteme yapılan küçük eklemelerle kırılıyor.

Bir uyarı da 74'ten geliyor ve müdahalenin mantığına dokunuyor. Makelov, Lange ve Nanda'nın alt uzay yaması yanılsamasını hatırla: bir alt uzayı değiştirmek çıktıyı oynatabiliyordu, ama bunun nedeni modelin o alt uzayı kullanması değil, olağan çalıştırmada çıktıya hiç katkı vermeyen uyuyan bir yolun uyandırılmasıydı. Yönlendirmede aynı boşluk var. "Yönü ekledim, davranış değişti" cümlesi, o yönün modelin o davranış için kullandığı yön olduğunu kanıtlamaz; yeterlilik gösterir, gereklilik göstermez. Bu yüzden ret örneğinin iki yönlü olması bir ayrıntı değil, iddianın gücünün kaynağı. Ve bu yüzden yönlendirme sonuçları okunurken sorulacak soru "kaç puan arttı" değil, "hangi müdahale, hangi ayarla, hangi karşı sınavla" olmalı.

75'te verdiğimiz ölçüm de buraya ait ve tek başına okunmamalı. Yönlendirme görevinde sıfırdan ikiye puanlanan ölçüde düz istem 0,894, düşük ranklı bir temsil ince ayarı 0,741, ortalama fark yönü 0,239, sözlük parçası 0,165 alıyor. Yani bugün, açık uçlu üretimi istenen kavrama çekmek için elimizdeki en iyi araç hâlâ istemin kendisi. Bu, aktivasyon müdahalesini gereksiz yapmıyor; ne için kullanıldığını değiştiriyor. Müdahalenin karşılaştırmalı üstünlüğü ürün düzeyinde davranış üretmekte değil, üç yerde: istemin erişemediği yerde çalışması (ağırlıklara erişimi olan biri için ret yönü), izlenebilir ve tersinir olması (sonda okur, müdahale geri alınır), ve nedensel iddia kurmaya elverişli olması (74'ün yeter–gerekli çifti).

> **Kendini yokla:** "Yönlendirilebilirlik modelin değil veri kümesinin özelliğidir" bulgusu, bir yönlendirme sonucunu okurken hangi soruyu sormayı zorunlu kılar?

Hangi kümede ölçüldüğünü ve o kümenin istem şablonunu. Sonuç bir modelin özelliği gibi sunulduğunda ("bu model dalkavukluk yönüyle yönlendirilebiliyor"), ölçüm aslında o davranışın veri kümesinde nasıl kurgulandığını yansıtıyor olabilir; başka bir kümede aynı model başka bir sayı verir. 71'in cümlesi burada da geçerli: protokol sonucun içindedir. Ek olarak ortalamaya değil dağılıma bakmak gerekir, çünkü ortalama pozitif olsa da girdilerin yarısı ters yöne gidiyor olabilir.

## Aynı davranışın üç kapısı

Bir davranışı değiştirmek istiyorsan üç yerden girebilirsin ve seri üçünü de gördü. Şekil 3 karşılaştırıyor.

![Üç satırlı tablo; sütunlar kapı, nasıl yapılır, maliyet ve kalıcılık, ölçülen yan etki. İstem: sistem istemi ya da kullanıcı istemine talimat; maliyet sıfır, her istekte yeniden verilir, dağıtan yazar; ölçülen ortalamada açık uçlu yönlendirmede en yüksek puan 0,894, ama bağlam bütçesinden yer alır ve istem enjeksiyonuna açıktır. Aktivasyon: seçilen katmanda yön ekleme, silme ya da kelepçeleme; maliyet çok düşük, kalıcı değil, çıkarım anında uygulanır ve geri alınır; ölçülen doğruluk yönüyle 32,5'ten 65,1'e, devre kesiciyle görülmemiş saldırılarda başarı düşüşü, ama kırk kümede örnek örnek değişkenlik ve bazı kümelerde girdilerin yarısında ters etki. Ağırlık: olguyu ileri beslemeli katmana yazma ya da düşük ranklı ince ayar; maliyet orta, kalıcı, modelin kopyasını değiştirir; ölçülen tek olgu düzeltiliyor ama beş bin düzenlemelik ölçütte ima edilen olgular tutarlı güncellenmiyor, arka arkaya düzenlemede model giderek daha az düzenlenebilir hâle gelip önceki düzenlemeleri unutuyor. Altta not: üçü birbirinin yerine geçmez; kalıcılık, geri alınabilirlik ve yan etkinin ölçülme biçimi farklıdır.](assets/ayni-davranisin-uc-kapisi.svg "Şekil 3 — İstem, aktivasyon, ağırlık: aynı davranışa üç kapı, üç maliyet, üç yan etki")

Ağırlık kapısını 18'de açmıştık: bir olgunun ileri beslemeli katmanda bir anahtar-değer belleği gibi durduğu ve doğrudan yazılabildiği. Aynı makalede Hase ve arkadaşlarının uyarısını da kaydetmiştik: bir olgunun **nerede** olduğunu bulmak, onu düzenlemek için en iyi yerin orası olduğunu göstermez. Ölçek tarafında Kevin Meng ve arkadaşlarının ICLR 2023'te sunduğu devam çalışması binlerce olguyu tek seferde yazmayı mümkün kılıyor. Ama ölçüldüğünde iki sorun çıkıyor. Roi Cohen, Eden Biran ve arkadaşlarının Transactions of the Association for Computational Linguistics'te 2024'te yayımladığı çalışma, bir olgu düzenlendiğinde onun **ima ettiği** olguların da güncellenmesi gerektiğini söylüyor ve bunu ölçen beş bin düzenlemelik bir ölçüt kuruyor; yaygın düzenleme yöntemleri bu tutarlılığı sağlayamıyor, ve şaşırtıcı biçimde en iyi puanı basit bir bağlam içi düzeltme temel çizgisi alıyor. Akshat Gupta ve arkadaşlarının ACL 2024 Bulguları'nda sunduğu çalışma ölçeği zamana yayıyor: bir model arka arkaya düzenlendikçe giderek daha az düzenlenebilir hâle geliyor, daha önce yazılan olguları unutuyor ve genel başarısı düşüyor.

İki kapının arasında duran bir aile daha var. Zhengxuan Wu ve arkadaşlarının NeurIPS 2024'te sunduğu temsil ince ayarı, ağırlıkları dondurup gizli temsiller üstünde **öğrenilmiş** müdahaleler eğitiyor; parametre verimliliği düşük ranklı ağırlık ince ayarına göre 15 ile 65 kat daha iyi. Yani "sabit bir yön ekle" ile "ağırlığı değiştir" arasında, müdahalenin kendisinin öğrenildiği bir orta yol var — ve 75'te andığımız ölçümde açık uçlu yönlendirmede sabit yönleri açık farkla geçen tek temsil yöntemi buydu.

Son bir kullanım biçimi müdahale bile değil: sondayı yalnızca **okumak** için, bir izleme aracı olarak kullanmak. 67'de gördüğümüz uyuyan ajan deneyinde basit bir sondanın tetiklenmiş modeli 0,99'un üstünde bir ayırt etme puanıyla yakaladığını kaydetmiştik. Bu, aktivasyon erişiminin en ucuz ve en az yan etkili kullanımı; 69'un denetim erişimi tartışmasında "iç erişim" derken kastedilen kapasitenin somut hâli.

## Müdahalenin disiplini

**Yön bir seçimdir, yöntem değil.** Ortalama fark, sonda ağırlığı, etiketsiz tutarlılık ve sözlük parçası aynı uzayda yaşar; ölçülen fark büyük ölçüde seçimin etiketle mi yapıldığından gelir. Kavram tespitinde ortalama fark 0,942, sözlüğün kendi seçimi 0,695.

**Ekleme "yeter mi", silme "gerekli mi" sorar.** İkisi birlikte ölçülmedikçe iddia tek yönlüdür; ret örneği ikisini de ölçtüğü için güçlüdür.

**Üç ayar sonucun içindedir.** Katman, konum ve katsayı; katsayı büyüdükçe davranış artar, akıcılık ve yardımseverlik düşer. Bir yönlendirme sonucu bu üç ayar yazılmadan okunamaz.

**Müdahalenin çıktıyı oynatması yeterliliktir, kullanım kanıtı değildir.** 74'ün uyuyan yol yanılsaması burada da geçerli; yön eklemek davranışı üretebilir ve o yön modelin kullandığı yön olmayabilir.

**Ortalama değil dağılım okunur.** Kırk kümede yönlendirilebilirlik örnekten örneğe değişir, bazı kümelerde girdilerin yaklaşık yarısı ters yöne gider, ve yönlendirilebilirlik büyük ölçüde veri kümesinin özelliğidir.

**Açık uçlu üretimde bugün en güçlü araç istemdir.** Ölçülen karşılaştırmada istem 0,894, temsil yöntemlerinin en iyisi 0,741, sabit yönler 0,239 ve altı. Aktivasyon müdahalesinin üstünlüğü başka yerdedir: istemin erişemediği yer, tersinirlik ve nedensel iddia kurabilme.

**Üç kapı birbirinin yerine geçmez.** İstem ucuzdur ve her istekte yeniden verilir; aktivasyon çıkarım anında uygulanır ve geri alınır; ağırlık kalıcıdır ama ima edilen olguları güncellemez ve arka arkaya düzenlemede unutur.

### Sırada ne var

Bu makale bir davranışı **değiştirmenin** araçlarını verdi. Ama okuyucunun elinde hâlâ eksik bir soru var ve 74'ten beri duruyor: model belirli bir cevabı verdiğinde, o cevabı hangi girdi parçasına, hangi bileşene ya da hangi eğitim örneğine borçlu olduğunu nasıl söyleriz? Model kendi gerekçesini yazdığında o gerekçe sebebin kendisi midir? Bir sonraki makale bu soruyu üç ayrı literatürün — girdiye atıf, bileşene atıf, eğitim verisine atıf — kesiştiği yerde kuruyor ve her birinin sadakat sınavını soruyor.

## Kaynakça

- Arditi, A., Obeso, O., Syed, A., Paleka, D., Panickssery, N., Gurnee, W. & Nanda, N. (2024). *Refusal in Language Models Is Mediated by a Single Direction*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/f545448535dfde4f9786555403ab7c49-Abstract-Conference.html)
- Panickssery, N., Gabrieli, N., Schulz, J., Tong, M., Hubinger, E. & Turner, A. M. (2024). *Steering Llama 2 via Contrastive Activation Addition*. ACL 2024. [Bağlantı](https://doi.org/10.18653/v1/2024.acl-long.828)
- Wu, Z., Arora, A., Geiger, A., Wang, Z., Huang, J., Jurafsky, D., Manning, C. D. & Potts, C. (2025). *AxBench: Steering LLMs? Even Simple Baselines Outperform Sparse Autoencoders*. ICML 2025, PMLR 267. [Bağlantı](https://proceedings.mlr.press/v267/wu25a.html)
- Dathathri, S., Madotto, A., Lan, J., Hung, J., Frank, E., Molino, P., Yosinski, J. & Liu, R. (2020). *Plug and Play Language Models: A Simple Approach to Controlled Text Generation*. ICLR 2020. [Bağlantı](https://openreview.net/forum?id=H1edEyBKDS)
- Subramani, N., Suresh, N. & Peters, M. E. (2022). *Extracting Latent Steering Vectors from Pretrained Language Models*. Findings of ACL 2022. [Bağlantı](https://doi.org/10.18653/v1/2022.findings-acl.48)
- Turner, A. M., Thiergart, L., Leech, G., Udell, D., Vazquez, J. J., Mini, U. & MacDiarmid, M. (2023). *Steering Language Models With Activation Engineering*. Hakemli olmayan ön çalışma (arXiv:2308.10248). [Bağlantı](https://arxiv.org/abs/2308.10248)
- Ravfogel, S., Elazar, Y., Gonen, H., Twiton, M. & Goldberg, Y. (2020). *Null It Out: Guarding Protected Attributes by Iterative Nullspace Projection*. ACL 2020. [Bağlantı](https://doi.org/10.18653/v1/2020.acl-main.647)
- Belrose, N., Schneider-Joseph, D., Ravfogel, S., Cotterell, R., Raff, E. & Biderman, S. (2023). *LEACE: Perfect linear concept erasure in closed form*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/d066d21c619d0a78c5b557fa3291a8f4-Abstract-Conference.html)
- Lee, B. W., Padhi, I., Ramamurthy, K. N., Miehling, E., Dognin, P., Nagireddy, M. & Dhurandhar, A. (2025). *Programming Refusal with Conditional Activation Steering*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=eLpJ0EIcAO)
- Li, K., Patel, O., Viégas, F., Pfister, H. & Wattenberg, M. (2023). *Inference-Time Intervention: Eliciting Truthful Answers from a Language Model*. NeurIPS 2023. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/81b8390039b7302c909cb769f8b6cd93-Abstract-Conference.html)
- Stolfo, A., Balachandran, V., Yousefi, S., Horvitz, E. & Nushi, B. (2025). *Improving Instruction-Following in Language Models through Activation Steering*. ICLR 2025. [Bağlantı](https://openreview.net/forum?id=wozhdnRCtw)
- Zou, A., Phan, L., Wang, J., Duenas, D., Lin, M., Andriushchenko, M., Wang, R., Kolter, Z., Fredrikson, M. & Hendrycks, D. (2024). *Improving Alignment and Robustness with Circuit Breakers*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/97ca7168c2c333df5ea61ece3b3276e1-Abstract-Conference.html)
- Tan, D., Chanin, D., Lynch, A., Paige, B., Kanoulas, D., Garriga-Alonso, A. & Kirk, R. (2024). *Analysing the Generalisation and Reliability of Steering Vectors*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/aaf3ecd91b1a0b26fb3adf1e35a89e8b-Abstract-Conference.html)
- Makelov, A., Lange, G. & Nanda, N. (2024). *Is This the Subspace You Are Looking for? An Interpretability Illusion for Subspace Activation Patching*. ICLR 2024. [Bağlantı](https://openreview.net/forum?id=Ebt7JgMHv1)
- Meng, K., Sharma, A. S., Andonian, A. J., Belinkov, Y. & Bau, D. (2023). *Mass-Editing Memory in a Transformer*. ICLR 2023. [Bağlantı](https://openreview.net/forum?id=MkbcAHIYgyS)
- Cohen, R., Biran, E., Yoran, O., Globerson, A. & Geva, M. (2024). *Evaluating the Ripple Effects of Knowledge Editing in Language Models*. Transactions of the Association for Computational Linguistics 12, s. 283–298. [Bağlantı](https://doi.org/10.1162/tacl_a_00644)
- Gupta, A., Rao, A. & Anumanchipalli, G. (2024). *Model Editing at Scale leads to Gradual and Catastrophic Forgetting*. Findings of ACL 2024. [Bağlantı](https://doi.org/10.18653/v1/2024.findings-acl.902)
- Wu, Z., Arora, A., Wang, Z., Geiger, A., Jurafsky, D., Manning, C. D. & Potts, C. (2024). *ReFT: Representation Finetuning for Language Models*. NeurIPS 2024. [Bağlantı](https://papers.nips.cc/paper_files/paper/2024/hash/8f0a48d16cee9e669fdf541be3f0c774-Abstract-Conference.html)
