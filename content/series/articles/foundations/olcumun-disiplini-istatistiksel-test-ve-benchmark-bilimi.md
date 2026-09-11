---
article_id: article_59baffe4-3bdb-4336-857d-525fc54a65d5
title: "Ölçümün Disiplini: İstatistiksel Test ve Benchmark Bilimi"
slug: olcumun-disiplini-istatistiksel-test-ve-benchmark-bilimi
category: foundations
level: advanced
reading_order: 101
summary: "16. ve 22. makalenin açıkça buraya bıraktığı borcu ödüyor: bir fark ne zaman anlamlı sayılır, kaç örnek gerekir, güven aralığı nasıl kurulur. Sıfır hipotezini ve p değerini kurup neyi söylemediğini gösteriyor; eşleştirmenin ayırt edilebilir farkı iki katına yakın daralttığını kendi hesabımızla veriyor; gürültünün asıl kaynağının tohum değil veri örneklemi olduğunu ve bütün kaynakları rastgeleleştirmenin 51 kat hesap tasarrufu sağladığını aktarıyor; yirmi rastgele bölmede aynı iki etiketleyicinin yalnızca birinde anlamlı ayrılabildiğini gösteriyor; ve 33. makalenin pass@k'sının yerine koyma ile hesaplandığında yanlı bir tahminci olduğunu — yüzde 67,23 yerine 59,36 — ölçüyor."
tags:
  - istatistiksel-anlamlilik
  - guven-araligi
  - oynaklik-kaynaklari
  - coklu-karsilastirma
  - tahminci-yanliligi
content_hash: sha256:7a998839ed8ce318ff2e90dd94a4f4cf2c5631bd0012d436065c4de2227f52bf
classification_version: 1
classification_batch: 24
---
## İki makalenin buraya bıraktığı borç

Seride iki kez, tam olarak bu numaraya söz verdik. 16\. makale benchmark'ların ne ölçtüğünü tartışırken şunu yazdı: "Ölçümün disiplinini — hangi farkın anlamlı sayılabileceğini, kaç örneğin gerektiğini, güven aralığının nasıl kurulacağını — 101\. makalede biçimsel olarak kuracağız." 22\. makale istem biçiminin puanı ne kadar oynattığını gösterdikten sonra aynı sözü tekrarladı: "Bu ölçünün biçimsel kurulumunu — anlamlı fark, örneklem büyüklüğü, güven aralığı — 101\. makalede yapacağız."

Bu makale o borcu ödüyor.

Arada yol alındı. 71\. makale bir puanın **bir örneklem** olduğunu kurdu: doğruluk bir ortalamadır, ortalamanın belirsizliği standart hatadır ve o hata soru sayısının kareköküyle daralır — beş yüz soruda yaklaşık ±4, on dört bin soruda ±0,8 puan. Aynı makale bir deneyin gerçek bir farkı görebilme olasılığını, istatistiksel gücü de adlandırdı. 99\. makale deneyin nasıl kurulacağını konu edindi ve bir soruyu bilerek açık bıraktı: Şekil 3'te 0,003'lük farkı 0,005'lik sapmayla karşılaştırırken aslında sezgiyle davrandık.

Eksik olan şey **karar**. Elinde iki sayı var; bunlardan hangi durumda "fark var" diyebilirsin, o cümleyi söyleyebilmek için kaç ölçüm gerekir, ve söylediğinde tam olarak neyi iddia etmiş olursun? Serideki 43., 93. ve 97. makalelerde "istatistiksel olarak anlamlı değil" ifadesini kullandık ama hiçbirinde ne demek olduğunu söylemedik. Burada söylüyoruz — 3\. makaledeki bilinçli formalizasyon alışkanlığının bu fazdaki karşılığı.

## Sıfır hipotezi ve p değeri

Kurulum tersten işler. İddian "A modeli B'den iyi" ise, sınadığın cümle bu değildir; sınadığın cümle onun karşıtıdır: **sıfır hipotezi** (null hypothesis), yani "aradaki gerçek fark sıfırdır ve gözlediğim şey çekilişin ürünüdür".

Sonra tek bir soru sorulur: sıfır hipotezi doğru olsaydı, gözlediğim kadar ya da daha büyük bir farkı görme olasılığım ne olurdu? Bu olasılığın adı **p değeri** (p-value). Küçükse, gözlenen fark "fark yok" dünyasında beklenmedik demektir ve sıfır hipotezi reddedilir; eşik olarak alanın alışkanlığı 0,05'tir ve bu bir gelenektir, bir doğa sabiti değil.

İki yanlış okuma yaygın ve ikisi de sonucu tersine çevirir. Birincisi: p değeri, iddianın doğru olma olasılığı **değildir**; sıfır hipotezinin doğru olduğu varsayımı **altında** hesaplanmış bir olasılıktır, dolayısıyla o varsayımın olasılığı hakkında hiçbir şey söyleyemez. İkincisi: p değeri farkın **büyüklüğünü** söylemez. 71\. makalede gördüğümüz gibi yeterince büyük bir kümede her fark anlamlı yapılabilir; anlamlılık "sıfırdan ayırt edilebiliyor" demektir, "önemli" demek değil.

Pratikte bu iki yanlış okumanın ölçülmüş bir bedeli var. Rotem Dror, Gili Baumer, Segev Shlomov ve Roi Reichart'ın ACL 2018'de sunduğu inceleme, bir konferansın bütün deneysel uzun bildirilerini tarıyor: 180 bildirinin yalnızca 63'ü herhangi bir anlamlılık testi içeriyor; o 63'ün 21'i kullandığı testin adını yazmıyor; adını yazan 42'nin 6'sı yanlış testi kullanıyor. Yazarların saydığı üç yanlış kullanım da öğretici, çünkü üçü de testin **varsayımını** çiğniyor: ölçü bir ortalama değilken ortalamalar için kurulmuş test kullanmak; gözlemler kategorikken sürekli değişkenler için kurulmuş test kullanmak; ve küçük bir test kümesinde yeniden örneklemeye dayanan test kullanmak.

Buradan çıkan kural, bir test seçmeden önce üç soru sormak: ölçü bir ortalama mı yoksa başka bir işlev mi, gözlemler sürekli mi kategorik mi, ve iki sistem **aynı örnekleri** mi gördü?

Birinci sorunun cevabı çoğu zaman "başka bir işlev" ve alanın buna verdiği karşılık eski. 6\. makaleden beri kullandığımız BLEU puanı bir ortalama değil; bütün test kümesi üzerinde toplanan eşleşme sayılarından hesaplanan bileşik bir orandır, dolayısıyla ortalamalar için türetilmiş bir dağılıma yaslanamaz. Philipp Koehn'ün EMNLP 2004'te sunduğu çalışma bunu yeniden örnekleme ile çözüyor: test kümesinden yerine koyarak yüzlerce yeni test kümesi üretilir, puan her birinde yeniden hesaplanır ve elde edilen dağılımdan hem aralık hem de anlamlılık okunur. Yazarın bulgusu, yalnızca üç yüz cümlelik test kümelerinde bile bu yolla güvenilir bir karar verilebildiği. Ölçünün biçimi analitik yolu kapatınca, hesap gücü onun yerine geçiyor.

> **Kendini yokla:** İki modelin puan farkı için p değeri 0,04 çıktı. Bu sayı, "A modeli B'den iyidir" iddiasının yüzde 96 olasılıkla doğru olduğunu mu söyler?

Söylemez. 0,04, "gerçek fark sıfır" dünyasında bu kadar büyük bir farkı görme olasılığıdır — yani hesap, reddetmeye çalıştığın varsayımın doğru olduğu kabul edilerek yapılır. İddianın kendi olasılığını verebilmek için iddianın deney öncesi ne kadar makul olduğunu da hesaba katmak gerekir ve p değeri bu bilgiyi taşımaz. Üstelik 0,04'ün ne kadarlık bir farktan geldiği de burada yazmıyor: ölçüm disiplininin ikinci yarısı, farkın büyüklüğünü aralıkla birlikte bildirmektir.

## Eşleştirmenin getirisi

Üçüncü soru — iki sistem aynı örnekleri mi gördü — masum görünüyor ama deneyin boyutunu belirliyor.

İki model bağımsız kümelerde ölçülmüşse, farkın belirsizliği iki ayrı belirsizliğin toplamıdır. Aynı soruları gördülerse soru başına **fark** hesaplanabilir ve soruların zorluğundan gelen ortak gürültü düşer. Buna **eşleştirilmiş karşılaştırma** (paired comparison) deniyor ve kazancı ölçülebilir.

![Beş satırlık üç sütunlu bir tablo ve altında iki kutu. Üstte başlık: aynı güçle ayırt edilebilen en küçük fark, puan cinsinden. Sütunlar soru sayısı, eşleştirilmemiş ve eşleştirilmiştir. Birinci satır 100 soru: eşleştirilmemişte 18,16, eşleştirilmişte 8,76. İkinci satır 500 soru: 8,12 ve 3,95. Üçüncü satır 1.000 soru: 5,74 ve 2,80. Dördüncü satır 5.000 soru: 2,57 ve 1,25. Beşinci satır vurguludur, 14.042 soru: 1,53 ve 0,75. Birinci kutuda oran durur: eşleştirme, ayırt edilebilir farkı her küme boyunda yaklaşık 2,05 kat daraltıyor ve aynı kazanç için kümeyi dört katına çıkarmak gerekirdi. İkinci kutuda hesabın koşulları durur: doğruluk 0,70, iki modelin farklı cevap verdiği örneklerin oranı 0,10, anlamlılık eşiği 0,05 iki yönlü ve güç 0,80. En altta bir kayıt: bu tablo kendi hesabımızdır, ölçülmüş bir deney değildir.](assets/eslestirmenin-getirisi.svg "Şekil 1 — Aynı kümede, iki karşılaştırma biçimi")

Şekil 1'in sayıları bizim, kaynağın değil; girdiler şeklin içinde. Beş yüz soruluk bir kümede eşleştirilmemiş bir karşılaştırma ancak 8,12 puanlık bir farkı güvenilir biçimde yakalayabilirken, aynı kümede eşleştirilmiş karşılaştırma 3,95 puanı yakalıyor. Oran bütün satırlarda hemen hemen aynı: yaklaşık 2,05 kat. Bu, hiçbir ek soru yazmadan, hiçbir ek hesap harcamadan elde edilen bir kazanç — yalnızca doğru testi seçmenin karşılığı.

Tersi de doğru ve daha az anılıyor: eşleştirme ancak iki sistem gerçekten aynı örnekleri gördüyse yapılabilir. Farklı bölmelerle, farklı istem biçimleriyle ya da farklı tohumlarla ölçülmüş iki sayı eşleştirilemez, ve eşleştirilmemiş karşılaştırmanın faturası yukarıdaki tabloda duruyor.

## Gürültü nereden geliyor

Eşleştirme soru çekilişinin gürültüsünü düşürüyor. Peki gürültünün tamamı oradan mı geliyor?

Xavier Bouthillier ve on beş kişilik bir yazar grubunun MLSys 2021'de sunduğu çalışma bu soruyu doğrudan ölçüyor. Beş ayrı görev ve mimari üzerinde — iki dil anlama görevi, bir biyoloji bağlanma tahmini, bir görüntü bölütleme ve bir görüntü sınıflandırma — her gürültü kaynağı tek tek iki yüz kez rastgeleleştiriliyor, ötekiler sabit tutuluyor. Toplam hesap yaklaşık sekiz GPU yılı.

![Yedi satırlık bir tablo ve altında iki kutu. Üstte başlık: gürültü kaynakları, veri yeniden örneklemesinin oynaklığına göre. Sütunlar kaynak ve göreli büyüklüktür. Birinci satır vurguludur, veriyi yerine koyarak yeniden örneklemek: en büyük kaynak, ölçünün tabanı. İkinci satır hiperparametre araması: ortalamada ağırlık başlangıcı kadar. Üçüncü satır ağırlık başlangıcı: tabanın yarısından az. Dördüncü satır verinin görülme sırası: ağırlık başlangıcı kadar. Beşinci satır veri artırma: daha küçük. Altıncı satır seyreltme: daha küçük. Yedinci satır sayısal gürültü: en küçük. Birinci kutuda alanın alışkanlığı durur: yaygın pratik yalnızca ağırlık başlangıcını rastgeleleştirmektir, yani tablodaki en büyük kaynak sabit tutulur ve ölçülen oynaklık gerçeğin altında kalır. İkinci kutuda çalışmanın sezgiye aykırı bulgusu durur: bütün kaynakları rastgeleleştirmek, yanlı ve ucuz tahminciyi ideal tahminciye yaklaştırıyor ve bunu 51 kat daha az hesapla yapıyor. En altta bir kayıt: sıralama Bouthillier ve arkadaşlarının beş örnek olayındaki ölçümlerinden alınmıştır; göreli büyüklükler sözle verilmiştir, sayı olarak değil.](assets/gurultu-kaynaklari.svg "Şekil 2 — Hangi kaynak ne kadar oynatıyor")

Şekil 2'nin ilk satırı sürprizli olanı. En büyük gürültü kaynağı tohum değil, **veri**: eğitim kümesini yerine koyarak yeniden örneklemek — 97\. makalede torbalamanın dayandığı işlemin aynısı, orada ağaçları çeşitlendirmek için, burada belirsizliği ölçmek için — bütün öteki kaynaklardan büyük oynaklık üretiyor. Ağırlık başlangıcı, yani alanın rutin olarak rastgeleleştirdiği tek şey, bu oynaklığın yarısından azını veriyor ve stokastik gradyan inişindeki veri sırasıyla aynı düzeyde kalıyor. Hiperparametre araması ise ortalamada ağırlık başlangıcı kadar oynaklık üretiyor — yani aramanın kendisi bir gürültü kaynağı.

Alttaki ikinci kutu çalışmanın asıl bulgusu ve sezgiye aykırı. Bir tahminciye **daha çok** rastgelelik eklemek onu kötüleştirmez, iyileştirir: bütün kaynakları rastgeleleştiren ucuz tahminci, yalnızca ağırlık başlangıcını rastgeleleştiren tahminciden daha iyi, ve ideal tahminciye 51 kat daha az hesapla yaklaşıyor. Sebebi sade — sabitlenen her kaynak ölçümleri birbirine bağlar, ilişkili ölçümlerin ortalaması ise bağımsız ölçümlerin ortalamasından daha belirsizdir.

Aynı çalışma karar kuralını da ölçüyor. Tek koşuya bakıp karar vermek yaklaşık yüzde 10 yanlış pozitif ve yüzde 75 yanlış negatif veriyor. Ortalamaları karşılaştırmak — literatürde yaygın olan — yanlış pozitifi yüzde 5'in altına indiriyor ama yanlış negatifi yüzde 90'a çıkarıyor, yani gerçek iyileşmelerin neredeyse tamamını kaçırıyor. Yazarların önerdiği ölçüt, "tek bir koşuda A'nın B'yi geçme olasılığı", ikisini birden makul tutuyor: yüzde 5 dolayında yanlış pozitif, yüzde 30 dolayında yanlış negatif.

## Aynı iki sistem, yirmi bölme

Bütün bunların bileşik etkisini gösteren tek bir deney var ve seride kurduğumuz taban çizgisi tartışmasının doğrudan devamı.

Kyle Gorman ve Steven Bedrick'in ACL 2019'da sunduğu çalışma, 2000 ile 2018 arasında yayımlanmış ve her biri kendi döneminde en iyi sonucu bildirmiş sözcük türü etiketleyicilerini alıyor. Altısı çalışır hâlde yeniden kuruluyor; hepsi alanın standart bölmesinde yeniden ölçülüyor ve bildirilen sayılara yakın değerler çıkıyor. Sonra aynı ölçüm, rastgele üretilmiş yirmi ayrı eğitim-doğrulama-test bölmesinde tekrarlanıyor.

![Beş satırlık bir tablo ve altında iki kutu. Üstte başlık: standart bölmenin verdiği karar ile yirmi rastgele bölmenin verdiği karar. Sütunlar karşılaştırılan iki etiketleyici, Penn Treebank üzerinde yirmi bölmenin kaçında ikincinin anlamlı biçimde önde olduğu ve OntoNotes üzerinde aynı sayıdır. Birinci satır TnT ile Collins: 20 ve 20. İkinci satır Collins ile LAPOS: 20 ve 7. Üçüncü satır vurguludur, LAPOS ile Stanford: 1 ve 0. Dördüncü satır Stanford ile NLP4J: 19 ve 20. Beşinci satır NLP4J ile Flair: 20 ve 20. Birinci kutu vurguludur ve üçüncü satırın anlamını taşır: bu fark standart bölmede anlamlı çıkıyordu, rastgele bölmelerde ise yön bile dönüyor — Penn Treebank'ta iki, OntoNotes'ta on dört bölmede Stanford daha kötü. İkinci kutuda yazarların kendi kestirimi durur: bu alanda yirmi yılın tamamı, işaret hatasında yüzde 1,28'lik bir mutlak azalma üretmiş ve en iyi etiketleyici, altısının birleşimiyle kurulan kâhin topluluğun yüzde 1,16 gerisinde. En altta bir kayıt: sayılar Gorman ve Bedrick'in üçüncü tablosundan alınmıştır ve çoklu karşılaştırma için Bonferroni düzeltmesi uygulanmıştır.](assets/yirmi-rastgele-bolme.svg "Şekil 3 — Standart bölme ne diyor, yirmi bölme ne diyor")

Şekil 3'ün üçüncü satırı bu makalenin en keskin sonucu. Standart bölmede iki etiketleyici arasındaki fark anlamlı çıkıyor; yirmi rastgele bölmenin yalnızca birinde anlamlı kalıyor, ve bölmelerin bir kısmında yön tersine dönüyor. Yani yayımlanmış sıralama, bir veri kümesinin belirli bir bölünüşünün özelliği. Sabit bir test kümesi ne kadar uzun süre kullanılırsa, alan o kümenin tikelliklerine o kadar uyum sağlar — 72\. makaledeki kirlilik tartışmasının gürültü tarafındaki akrabası.

Bu kurulumda ikinci bir tuzak daha var. Yirmi bölmede yirmi ayrı test yapılıyor; her birinin yanılma olasılığı yüzde 5 ise, en az bir tanesinin tesadüfen "anlamlı" çıkma olasılığı yüzde 5 değil, yüzde 64,2'dir. Bu bizim hesabımız ve doğrudan bağımsızlık varsayımından geliyor: 1 − 0,95²⁰. Çare **çoklu karşılaştırma düzeltmesi**: en sade biçimi olan Bonferroni düzeltmesi eşiği test sayısına böler, yirmi test için 0,05 yerine 0,0025. Aynı yazarların dayandığı Dror ve arkadaşlarının TACL'de 2017'de yayımladığı çalışma bunun daha güçlü bir biçimini kuruyor ve alanın gerçek sorusunu soruyor: "kaç veri kümesinde gerçekten daha iyi?" Aynı incelemede bu da sayıldı — birden çok veri kümesi kullanan 110 bildirinin yalnızca 3'ü çoklu karşılaştırma için düzeltme yapmış.

Sorunun makine öğrenmesi tarafındaki klasik cevabı daha eski. Janez Demšar'ın JMLR'de 2006'da yayımladığı inceleme, birçok veri kümesi üzerinde birçok sınıflandırıcıyı karşılaştırmanın doğru yolunu arıyor ve alanın yaygın alışkanlığını — doğrulukları kümeler boyunca ortalamak — reddediyor: kümelerin puan ölçekleri karşılaştırılabilir değil, dolayısıyla ortalama anlamlı bir sayı vermiyor. Yazarın önerisi dağılım varsayımı yapmayan sıra tabanlı testler: iki yöntem için işaretli sıra testi, ikiden çok yöntem için sıraları karşılaştıran bir test ve ardından ikili düzeltmeler. 97\. makaledeki 179 sınıflandırıcılık taramanın "en iyi iki aile arasındaki fark anlamlı değil" cümlesi bu soru ailesinin içinde duruyor.

## Bir tahminci olarak pass@k

Son bir yer, seride uzun süredir açık duran bir randevuyu kapatıyor ve ölçümün disiplinini bir tanıdık ölçü üzerinde gösteriyor.

33\. makalede kapsamayı kurmuştuk: `k` denemenin en az birinde çözülen soruların oranı, gösterimi `pass@k`. Tek deneme başarı olasılığı `p` ise kapsama 1 − (1 − p)ᵏ. O formül doğru — ama `p` gerçek değer olduğu sürece. Pratikte `p` bilinmez; `n` deneme yapılır, `c` tanesi tutar ve `p` yerine `c/n` konur.

İşte burada 93\. ve 96\. makalelerin ayrımı devreye giriyor. Bir tahmincinin **yanlılığı**, ortalamada gerçek değerden ne kadar saptığıdır. 1 − (1 − c/n)ᵏ ifadesi, `c/n` doğru bir tahmin olsa bile, ortalamada gerçek kapsamanın **altında** kalır.

![Üç satırlık bir tablo ve altında iki kutu. Üstte başlık: aynı kapsama, iki tahminci; her deneme 0,20 olasılıkla tutuyor, on deneme yapılıyor ve pass@5 tahmin ediliyor. Birinci satır gerçek değer: 1 eksi 0,8 üzeri 5, yani 0,67232. İkinci satır yansız tahmincinin ortalaması: 0,67232, gerçek değerle birebir aynı. Üçüncü satır vurguludur, yerine koyma tahmincisinin ortalaması: 0,59359, yani gerçek değerin 7,87 puan altında. Birinci kutuda iki formül durur: yerine koyma tahmincisi 1 eksi 1 eksi c bölü n, üssü k; yansız tahminci 1 eksi n eksi c'nin k'li kombinasyonu bölü n'in k'li kombinasyonu. On denemenin ikisinin tuttuğu tek bir çekilişte ikincisi 56 bölü 252 üzerinden 0,77778, birincisi 0,67232 veriyor. İkinci kutuda kural durur: aynı formül, gerçek olasılıkla yazıldığında doğru bir tanım, tahminle yazıldığında yanlı bir tahmincidir. En altta bir kayıt: tablodaki ortalamalar kendi hesabımızdır ve iki terimli dağılımın bütün sonuçları üzerinden alınmıştır; tahmincinin kendisi Chen ve arkadaşlarının çalışmasındandır.](assets/passk-tahminci-yanliligi.svg "Şekil 4 — Aynı ölçü, iki tahminci")

Şekil 4'ün sayıları bizim; tahmincinin kendisi Mark Chen ve arkadaşlarının kod modelleri üzerine 2021'de yayımladığı, hakemlikten geçmemiş çalışmadan. Yazarlar sorunu şöyle çözüyor: `n` deneme içinden `k` tanesini **yerine koymadan** çekmenin hepsinin başarısız olma olasılığını doğrudan sayarak. Sonuç, kombinasyonlarla yazılan ve ortalaması gerçek kapsamaya eşit olan bir tahminci.

Sayılarla: her denemenin 0,20 olasılıkla tuttuğu bir soruda, on deneme yapıp pass@5 kestirdiğimizi düşün. Gerçek değer 1 − 0,8⁵ = 0,67232. Yansız tahmincinin bütün olası çekilişler üzerinden ortalaması da 0,67232. Yerine koyma tahmincisinin ortalaması ise 0,59359 — yaklaşık sekiz puan aşağıda. Bu bir hesap hatası değil, bir **yanlılık**: hata rastgele olsaydı tekrar tekrar ölçerek sönerdi, oysa hep aynı yöne sapıyor.

40\. makalenin görev ufku bu resmin öteki yarısını gösteriyor. Orada modellerin yüzde 50 başarıyla bitirebildiği görev uzunluğunun ikiye katlanma süresi 207 gün olarak verilmiş, yanına da yüzde 95 güven aralığı konmuştu: 166–240 gün. O aralığın nereden geldiğini şimdi söyleyebiliriz — tek tek modellerin ufuk tahminleri geniş belirsizlik taşıyor, çünkü aynı insan süresindeki görevler modeller için çok farklı zorlukta; ama bu hatalar modeller arasında ilişkili olduğu için **eğim**, tek tek noktalardan daha dar bir aralıkla kestirilebiliyor. Aynı veriden iki büyüklük çıkarılıyor ve ikisinin belirsizliği aynı değil.

> **Kendini yokla:** Bir tahmincinin hatasını, ölçümü çok kez tekrarlayıp ortalamasını alarak söndürebilir miyiz?

Yalnızca hata rastgeleyse. Oynaklıktan gelen hata tekrarla söner: bağımsız ölçümlerin ortalaması gerçek değere yaklaşır. Yanlılıktan gelen hata sönmez, çünkü her tekrar aynı yöne sapar — Şekil 4'teki 7,87 puan, ölçüm sonsuz kez tekrarlansa da yerinde kalır. Bu yüzden "daha çok koşu" her sorunun çaresi değildir: önce hatanın hangi türden olduğu belirlenmeli.

## Ölçümün disiplini

**Sınanan şey iddian değil, karşıtıdır.** p değeri, gerçek fark sıfırken gözlenen kadar büyük bir farkı görme olasılığıdır; iddianın doğru olma olasılığı değildir ve farkın büyüklüğünü söylemez.

**Test, ölçünün ve verinin biçimine göre seçilir.** Ölçü bir ortalama mı, gözlemler kategorik mi, iki sistem aynı örnekleri mi gördü — üçü de testi belirler. Taranan 180 bildirinin 63'ü test yapmış, 21'i adını yazmamış, 6'sı yanlışını seçmiş.

**Eşleştirme bedava bir kazançtır.** Aynı örnekler üzerinde soru başına fark almak, ayırt edilebilir farkı yaklaşık 2,05 kat daraltır; beş yüz soruda 8,12 puan yerine 3,95 puan.

**En büyük gürültü kaynağı tohum değil, veridir.** Ağırlık başlangıcı, veri yeniden örneklemesinin ürettiği oynaklığın yarısından azını verir; hiperparametre araması onun kadar oynaklık üretir. Bütün kaynakları rastgeleleştirmek ölçümü hem iyileştiriyor hem de 51 kat ucuzlatıyor.

**Ortalamaları karşılaştırmak güvenli değil, sağır.** Yanlış pozitifi yüzde 5'in altına indirirken yanlış negatifi yüzde 90'a çıkarır; tek koşuya bakmak ise yüzde 10 yanlış pozitif ve yüzde 75 yanlış negatif verir.

**Sabit bir bölmenin verdiği karar, bölmenin özelliği olabilir.** Standart bölmede anlamlı çıkan bir fark yirmi rastgele bölmenin yalnızca birinde anlamlı kalabiliyor ve bir kısmında yön tersine dönüyor.

**Çok test yapıyorsan eşik değişir.** Yirmi bağımsız testte en az birinin tesadüfen anlamlı çıkma olasılığı yüzde 64,2'dir; birden çok kümeyle çalışan bildirilerin yalnızca küçük bir azınlığı bunu düzeltiyor.

**Yanlılık tekrarla sönmez.** Kapsamayı gerçek olasılıkla yazmak bir tanım, tahminle yazmak yanlı bir tahmincidir; aradaki fark bu örnekte 7,87 puan.

Bu listenin bir sınırı var ve 71\. makalede zaten adlandırılmıştı: buradaki bütün aygıt zincirin **son halkasını** sınar, yani farkın çekilişten gelip gelmediğini. Ölçütün doğru şeyi ölçüp ölçmediği, sorularının nereden geldiği, puanlama kuralının ne taşıdığı — hiçbiri istatistikle çözülmez. Tutarlı biçimde yanlış şeyi ölçen bir cetvelin güven aralığı da dar olur.

### Sırada ne var

Bir farkın gürültüden büyük olduğunu söyleyebilmek, o farkın başka bir elde de çıkacağı anlamına gelmiyor. Bir sonraki makale bu ayrımın peşine düşüyor: aynı kodu çalıştırmak, aynı yöntemi yeniden kurmak ve aynı sonucu başka bir düzenekte elde etmek birbirinden farklı üç iştir; alan bunları ne kadar başarıyor, başarısız olduğunda sebep nedir, ve yayımlanmayan sonuçların literatürde bıraktığı boşluk ne kadar büyük?

## Kaynakça

- Dror, R., Baumer, G., Shlomov, S. & Reichart, R. (2018). *The Hitchhiker's Guide to Testing Statistical Significance in Natural Language Processing*. ACL 2018, 1383–1392. [Bağlantı](https://doi.org/10.18653/v1/P18-1128)
- Dror, R., Baumer, G., Bogomolov, M. & Reichart, R. (2017). *Replicability Analysis for Natural Language Processing: Testing Significance with Multiple Datasets*. Transactions of the Association for Computational Linguistics 5, 471–486. [Bağlantı](https://aclanthology.org/Q17-1033/)
- Bouthillier, X., Delaunay, P., Bronzi, M., Trofimov, A., Nichyporuk, B., Szeto, J., Sepah, N., Raff, E., Madan, K., Voleti, V., Ebrahimi Kahou, S., Michalski, V., Serdyuk, D., Arbel, T., Pal, C., Varoquaux, G. & Vincent, P. (2021). *Accounting for Variance in Machine Learning Benchmarks*. MLSys 2021. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2021/hash/0184b0cd3cfb185989f858a1d9f5c1eb-Abstract.html)
- Gorman, K. & Bedrick, S. (2019). *We Need to Talk about Standard Splits*. ACL 2019, 2786–2791. [Bağlantı](https://doi.org/10.18653/v1/P19-1267)
- Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. de O., Kaplan, J. ve ark. (2021). *Evaluating Large Language Models Trained on Code*. Hakemli olmayan ön çalışma (arXiv:2107.03374). [Bağlantı](https://arxiv.org/abs/2107.03374)
- Demšar, J. (2006). *Statistical Comparisons of Classifiers over Multiple Data Sets*. Journal of Machine Learning Research 7, 1–30. [Bağlantı](https://jmlr.org/papers/v7/demsar06a.html)
- Koehn, P. (2004). *Statistical Significance Tests for Machine Translation Evaluation*. EMNLP 2004, 388–395. [Bağlantı](https://aclanthology.org/W04-3250/)
