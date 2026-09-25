---
article_id: article_26aa2b32-fed6-4268-b761-7bdb70a2349e
title: "Ses, Konuşma ve Gerçek Zamanlı Modeller"
slug: ses-konusma-ve-gercek-zamanli-modeller
category: multimodal-and-future
level: intermediate
reading_order: 82
summary: "Bir önceki makalenin hamlesini sese taşır ve üstüne zamanı ekler: sesin iki ayrı token ailesine — öz-denetimli eğitilmiş anlamsal token'lar ve sinir ses kodlayıcısının artık vektör kuantizasyonuyla ürettiği akustik token'lar — bölünmesini ve ikisini birleştiren melez düzeni; tanımanın öz-denetimden zayıf denetime geçişini ve 680 bin saatlik bir modelin, aynı referans kümede eşit puana sahip denetimli bir modele karşı öteki kümelerde yüzde 55,2 daha az hata yapmasını — 79'un etkin sağlamlık ölçüsünün ses hâli —; üretimin ardışık hattını ve üç saniyelik bir kayıttan ses taklit eden kodek dil modellerini; ve konuşmanın gecikme bütçesini: on dilde ölçülen sıra geçiş boşluğunun modu 0, ortalaması 208 milisaniye iken dört bileşenli bir hattın saniyelere çıkması, buna karşılık uçtan uca bir modelin 12,5 Hz çerçeve hızıyla 160 milisaniyelik kuramsal gecikmeye inmesi. Kapanışta ölçümün nerede durduğunu verir: 27 beceride insan 82,23 iken en iyi model 54,90."
tags:
  - ses
  - konusma-tanima
  - ses-tokenlari
  - gercek-zamanli
  - gecikme-butcesi
content_hash: sha256:a790e7399368b68d2d28d804a1c592d4fd88a4425a5d572a089118c784f05094
classification_version: 1
classification_batch: 19
---
## Konuşmanın bir bütçesi var

Önceki makale bir modaliteyi token'a çevirip dil modeline bağlamayı kurdu: görüntü sabit boyutlu yamalara bölünüyor, her yama bir vektöre dönüşüyor, vektörler ya doğrudan diziye giriyor ya bir birleştiriciden geçiyor ya da çapraz dikkatle okunuyor. Aynı hamle sese uygulandığında iki yeni şey ekleniyor ve ikisi de bu makalenin konusu.

Birincisi zaman. Görüntü bir karedir; ses akan bir sinyaldir, ve "birim" seçimi görüntüdeki kadar doğal değil. Bir saniyelik konuşma kaç token etmeli? Cevap ne kadar bilgi taşımak istediğine bağlı, ve buradaki takas görüntüdeki çözünürlük takasından daha keskin.

İkincisi ve daha zorlayıcısı, konuşmanın bir bütçesi olması. Tanja Stivers ve arkadaşlarının 2009'da Proceedings of the National Academy of Sciences'ta yayımladığı çalışma bunu ölçtü: beş kıtadan on dilde, doğal sohbetlerin video kayıtlarında soru ile cevabı arasındaki boşluk. Dağılım her dilde tek tepeli ve tepe 0 ile 200 milisaniye arasında; ortanca değerler 0 ile 300 milisaniye arası, on dilin ortak ortancası 100 milisaniye; ortalamalar 7 milisaniyeden 469 milisaniyeye uzanıyor ve on dilin ortak ortalaması 208 milisaniye. Yani insanlar birbirini yaklaşık iki yüz milisaniyede yanıtlıyor — ve bu, konuşmanın planlanması için gereken süreden kısa, yani dinleyici cevabını karşı taraf konuşurken hazırlıyor. Bir sesli asistanın "doğal" sayılması için bu bütçenin içinde kalması gerekiyor.

Üç soru. Ses hangi birimlere bölünür? O birimlerle tanıma ve üretim nasıl yapılır? Ve iki yüz milisaniyelik bir bütçe mimariyi nasıl belirler?

## Sesin iki token ailesi

Ses bir **dalga biçimidir** (waveform): saniyede on binlerce kez ölçülmüş bir basınç değerleri dizisi. Bu diziyi doğrudan bir dil modeline vermek anlamsız; saniyede 24.000 sayı, hiçbir pencereye sığmaz. O hâlde sıkıştırmak gerekiyor, ve alan bunu iki farklı hedefle iki farklı biçimde yapıyor.

Birinci aile **anlamsal token** (semantic token): sesin *ne söylediğini* taşıyan, öz-denetimli olarak eğitilmiş temsiller. Alexei Baevski ve arkadaşlarının NeurIPS 2020'de sunduğu çalışma bunun kanonik biçimini veriyor: ham ses bir evrişimli ağdan geçirilip gizli temsillere dönüştürülüyor, temsillerin bir kısmı maskeleniyor — 8'deki öz-denetimli öğrenmenin ses hâli — ve model, maskelenen yerdeki doğru temsili bir dizi çeldirici arasından ayırt etmeyi öğreniyor. Sonuç etiketli veri ihtiyacını çökertiyor: bütün etiketli veri kullanıldığında iki sınav bölümünde 1,8 ve 3,3 kelime hata oranı; yalnızca **on dakikalık** etiketli veri ve 53 bin saatlik etiketsiz ön eğitimle 4,8 ve 8,2.

İkinci aile **akustik token** (acoustic token): sesin *nasıl duyulduğunu* taşıyan, yeniden sentezlenebilir kodlar. Neil Zeghidour ve arkadaşlarının IEEE/ACM Transactions on Audio, Speech, and Language Processing'te 2022'de yayımladığı çalışma bir **sinir ses kodlayıcısı** (neural audio codec) kuruyor: evrişimli bir kodlayıcı sesi kısa çerçevelere indiriyor, her çerçevenin vektörü **artık vektör kuantizasyonuyla** — önce bir kod defterine yuvarla, kalan hatayı ikinci kod defterine yuvarla, sonra üçüncüsüne — birkaç ayrık koda çevriliyor, ve bir çözücü bunlardan sesi geri üretiyor. 43'teki ürün kuantizasyonu ile aynı aileden bir fikir, ama burada amaç arama değil geri sentez. Ölçüm somut: saniyede 3 kilobitte kodlanan ses, 12 kilobitte çalışan klasik bir kodeğin kalitesini geçiyor, ve model bir telefon işlemcisinde gerçek zamanlı çalışıyor.

İki ailenin takası açık ve Şekil 1 onu veriyor.

![İki satırlı karşılaştırma tablosu; sütunlar token ailesi, nasıl üretilir ve ne taşır, sınırı. Anlamsal token: maskelenmiş temsilleri ayırt etmeyi öğrenen öz-denetimli bir modelden gelir, ne söylendiğini ve uzun erimli yapıyı taşır; sınırı, ondan sesin kendisi geri üretilemez. Akustik token: evrişimli bir kodlayıcı ve artık vektör kuantizasyonuyla üretilir, bir çözücü sesi geri verir, ses rengini, konuşmacı kimliğini ve vurguyu taşır; sınırı, uzun erimli tutarlılığının zayıf olması. Altta melez düzen: önce anlamsal token'larla uzun erimli yapı üretilir, sonra o dizi akustik token'lara koşullanarak ses sentezlenir. En altta iki sayı: bir kodek saniyede 3 kilobitte 12 kilobitlik klasik bir kodeği geçiyor; gerçek zamanlı bir sistemde çerçeve hızı saniyede 12,5.](assets/sesin-iki-token-ailesi.svg "Şekil 1 — Sesin iki token ailesi ve onları birleştiren melez düzen")

Zalán Borsos ve arkadaşlarının aynı dergide 2023'te yayımladığı çalışma ikisini birleştiriyor: önce anlamsal token'larla uzun erimli yapı üretiliyor, sonra o dizi akustik token'lara koşullanarak ses sentezleniyor. Sonuç, hiç yazı ya da etiket kullanmadan, kısa bir istemin devamını konuşmacı kimliğini ve vurgusunu koruyarak üretebilen bir model — 10'daki otoregresif üretimin ses hâli, sözlüğü değişmiş.

## Tanımak: sesi yazıya çevirmek

Konuşma tanımanın kendi tarihi var ve seride kurduğumuz parçalarla okunabiliyor. İlk mesele hizalama: elimizde bir ses dizisi ve bir harf dizisi var, ama hangi ses parçasının hangi harfe karşılık geldiği etiketli değil. Alex Graves ve arkadaşlarının ICML 2006'da sunduğu çalışma bunu bir "boş" simgesi ekleyerek çözüyor: model her çerçeve için bir harf ya da boş üretiyor, ve olası bütün hizalamalar üzerinden toplanan olasılık en büyütülüyor. İkinci mesele bağlam: 6'da gördüğümüz dikkat mekanizması, çıktıdaki her harfin girdinin hangi bölümüne bakacağını öğrenerek hizalamayı da modele bırakıyor.

Asıl sıçrama ölçekten geldi ve iki farklı biçimde. Birincisi az önceki öz-denetim: etiketsiz sesle ön eğitim, etiketli veri ihtiyacını yüz kat düşürüyor. İkincisi **zayıf denetim**: Alec Radford ve arkadaşlarının ICML 2023'te sunduğu çalışma, internetten toplanmış 680 bin saatlik ses–yazı eşleşmesiyle tek bir modeli eğitiyor. Eşleşmeler temiz değil; altyazılar, transkriptler, farklı dillerden ve farklı kalitelerden. Ama ölçek temizliğin yerine geçiyor ve model hiç ince ayar yapılmadan, zero-shot, standart ölçütlerde çalışıyor.

Bu çalışmanın buraya asıl ait olan kısmı 79'un diliyle yazılmış. Yazarlar sonuçlarını **etkin sağlamlık** üzerinden raporluyor: referans bir sınav kümesinde eşit puana sahip iki modeli alıp öteki kümelerde karşılaştırıyorlar. Bulgu şu: referans kümede yüzde 0,1 farkla aynı olan iki modelden zero-shot olanı, on iki başka kümede denetimli olandan ortalama yüzde 55,2 daha az hata yapıyor. Ve insanla karşılaştırma aynı deseni gösteriyor: denetimli modeller referans kümede bir insanı yakalayıp geçebiliyor, ama öteki kümelerde insanın kabaca iki katı hata yapıyorlar; zero-shot modellerin sağlamlık sınırı ise o insanın güven aralığını kapsıyor.

Ölçeğin kapsadığı dil sayısı ayrı bir eksen ve 15'teki dersin ses hâli. Vineel Pratap ve arkadaşlarının Journal of Machine Learning Research'te 2024'te yayımladığı çalışma, konuşma teknolojisinin yaklaşık yüz dille sınırlı kaldığı gözleminden başlıyor — dünyada konuşulan yedi binden fazla dilin küçük bir kesiri. Kurdukları düzen 1.406 dili kapsayan öz-denetimli ön eğitim, 1.107 dilde tek bir tanıma modeli, aynı sayıda dilde sentez ve 4.017 dilde dil tanıma; elli dört dilli bir ölçütte, çok daha az etiketli veriyle eğitilmiş olmasına rağmen zayıf denetimli modelin kelime hata oranını yarıdan fazla düşürüyorlar. Bedeli 80'in diliyle okunmalı: veri, kamuya açık dinî metinlerin okunmuş kayıtlarından geliyor, yani kapsam genişken alan dardır ve bu, belgeye yazılması gereken bir koşuldur.

> **Kendini yokla:** İki model referans kümede zaten eşitse, öteki kümelerdeki farkın ne önemi var?

Önemi tam olarak eşitlikte. 79'da etkin sağlamlığın neden tanımlandığını görmüştük: dağılım dışı puanı yükseltmenin en sıradan yolu dağılım içi puanı yükseltmektir, dolayısıyla bir sağlamlık iddiası ancak aynı dağılım içi puandaki modellerle karşılaştırılarak kurulabilir. Buradaki düzenek o karşılaştırmanın en temiz hâli: referans küme sabitlenmiş, geriye kalan tek fark eğitim dağılımının kapsamı. Ölçülen yüzde 55,2, mimariden ya da parametre sayısından değil, modelin nerelerde eğitildiğinden geliyor — 81'de karşıtsal görüntü modelleri için bulunan sonucun aynısı.

## Üretmek: yazıdan sese

Ters yön uzun süre üç parçalı bir hattı izledi: metni bir ara temsile — genellikle bir mel spektrograma — çeviren bir model, o temsili dalga biçimine çeviren bir **vokoder** (vocoder), ve ikisini birleştiren bir çözümleme. Jonathan Shen ve arkadaşlarının ICASSP 2018'de sunduğu çalışma birinci parçayı, Jungil Kong ve arkadaşlarının NeurIPS 2020'de sunduğu çalışma ikincisini bugünkü hâline getirdi; Jaehyeon Kim ve arkadaşlarının ICML 2021'de sunduğu çalışma ise ikisini tek bir uçtan uca modele indirdi.

Token'lı düzen bu hattı da değiştirdi. Sesin akustik token'ları varsa, metinden sese dönüşüm bir dil modelleme problemine indirgenebilir: metni ve kısa bir örnek kaydı girdi olarak ver, akustik token'ları üret, kodekten geçirip sese çevir. Chengyi Wang ve arkadaşlarının 2023'te yayımladığı — hakemli bir yerde yayımlandığını doğrulayamadığımız — çalışma bunu, Alexandre Défossez ve arkadaşlarının Transactions on Machine Learning Research'te yayımladığı sinir ses kodeğinin akustik token'ları üzerinde ve 60 bin saatlik İngilizce sesle eğitip gösteriyor: modelin daha önce hiç duymadığı bir konuşmacının **üç saniyelik** kaydı isteme konduğunda, o konuşmacının sesiyle yeni cümleler üretiliyor. 23'teki örnekle öğrenmenin ses hâli: ağırlıklara dokunulmuyor, örnek isteme konuyor.

Bunun iki yüzü var ve ikisi de metinde durmalı. Bir yüzü erişilebilirlik ve kişiselleştirme; öteki yüzü 68'de gördüğümüz kötüye kullanım tablosuna yeni bir satır: üç saniyelik bir kayıt, bir sesin taklidi için yeterli bir bütçe.

## Ardışık hat ile uçtan uca

Şimdi bütçeye dönebiliriz. Klasik bir sesli asistan dört bağımsız bileşenden oluşur: ses etkinliğini algılayıp konuşmanın bittiğine karar veren bir modül, konuşmayı yazıya çeviren bir tanıyıcı, yazıyla çalışan bir dil modeli, ve cevabı sese çeviren bir sentezleyici. Her bileşen kendi gecikmesini ekler; üstelik ikisi birbirini beklemek zorundadır — dil modeli, tanıyıcı bitirmeden başlayamaz. Şekil 2 iki düzeni yan yana koyuyor.

![İki bölmeli şema. Üstte ardışık hat: soldan sağa dört kutu ve aralarında oklar — ses etkinliği algılama, konuşma tanıma, dil modeli, sesi sentezleme. Altında üç kayıt: her kutu kendi gecikmesini ekler ve bir öncekini beklemek zorundadır; ara temsil yazı olduğu için duygu, vurgu ve konuşma dışı sesler burada silinir; sıralara bölme, üst üste binen konuşmayı ve araya girmeyi temsil edemez. Altta uçtan uca düzen tek bir geniş kutuda: giren ve çıkan ses akışı aynı anda tek modelde işlenir, saniyede 12,5 çerçeve üretilir, kuramsal gecikme 160 milisaniyedir ve sıra kavramı ortadan kalkar. En altta insan ölçüsü referansı: on dilde sıra geçiş boşluğunun tepesi 0 ile 200 milisaniye arasında, ortak ortalaması 208 milisaniye.](assets/gecikme-butcesi.svg "Şekil 2 — Ardışık hat ile uçtan uca: gecikme bütçesi ve kaybolan bilgi")

Ardışık hattın üç ayrı bedeli var. Birincisi gecikme: bileşenler toplanınca bütçe saniyelere çıkabiliyor. İkincisi bilgi kaybı: ara temsil yazı olduğu için, anlamı değiştiren dilsel olmayan bilgi — duygu, vurgu, iç çekiş, gülme — zincirin ilk adımında siliniyor. Üçüncüsü ve en az fark edileni yapısal: düzen konuşmayı konuşmacı sıralarına bölüyor, oysa gerçek sohbette söz kesilir, üst üste binilir, araya "hı hı" girer.

Alexandre Défossez ve arkadaşlarının 2024'te yayımladığı — hakemli bir yerde yayımlandığını doğrulayamadığımız — çalışma üçünü birden hedefliyor. Model sesten sese çalışıyor: bir metin dil modeli gövdesinden başlayıp, sinir ses kodeğinin artık kuantizasyonundan gelen token'ları üretiyor. İki yeniliği var. Birincisi çerçeve hızının düşürülmesi: saniyede 12,5 çerçeve, yani bir saniyelik ses on iki buçuk adım. İkincisi çok akışlılık: model giren ve çıkan ses akışlarını **aynı anda**, iki ayrı otoregresif token akışı olarak işliyor; böylece konuşmacı sırası kavramı ortadan kalkıyor ve model karşı taraf konuşurken de "dinlemeye" devam ediyor. Bildirilen kuramsal gecikme 160 milisaniye — yukarıdaki insan ortalamasının altında. Qingkai Fang ve arkadaşlarının ICLR 2025'te sunduğu çalışma daha ılımlı bir düzenle — bir konuşma kodlayıcısını bir dil modeline bağlayıp konuşma birimlerini akış hâlinde üreterek — 226 milisaniyeye inen bir cevap gecikmesi bildiriyor.

Bütçeyi kısaltmanın ikinci yolu beklemek yerine kestirmek. Erik Ekstedt ve Gabriel Skantze'nin Interspeech 2022'de sunduğu çalışma, sıra alma kararını sessizlik eşiğine bırakmak yerine bir tahmin problemi olarak kuruyor: model, gelecek pencerede iki konuşmacının hangi anlarda ses çıkaracağını öngörmeyi öğreniyor, ve bu hedef etiket gerektirmiyor — kayıttan kendiliğinden çıkıyor, yani 8'deki öz-denetimin sıra alma hâli. Öğrenilen model sıra değişimini ve araya girecek kısa onaylamaları hiç eğitilmeden sorulan görevlerde kestirebiliyor. Sessizlik eşiğiyle çalışan bir sistem, cevaba ancak karşı taraf sustuktan sonra başlayabilir; kestiren bir sistem, insanın yaptığı gibi, karşı taraf konuşurken hazırlanabilir.

26'da öğrendiğimiz ayrım burada doğrudan işliyor: ön dolum ile adım adım üretim ayrı darboğazlardır, ve gerçek zamanlı ses üretimi baştan sona adım adım üretimdir. Çerçeve hızını düşürmek — saniyede 12,5 adım — tam olarak bu adım sayısını azaltmak demek; 60'ta ölçtüğümüz gecikme ve maliyet hesabının ses hâli.

## Ne ölçülüyor

Kelime hata oranı uzun süre tek cetveldi ve konuşma tanıma için hâlâ merkezde. Ama sesi anlayan bir modelden beklenen şey yazıya çevirmekten fazlası: kim konuşuyor, hangi tonda, arkada ne sesi var, müziğin ölçüsü ne. Şekil 3 üç ayrı ölçüm katmanını ve bulunduğumuz yeri veriyor.

![Üç satırlı tablo; sütunlar ölçüm katmanı, neyi ölçer, bulunulan yer. Tanıma: kelime hata oranı; aynı referans kümede eşit puana sahip iki modelden zero-shot olanı on iki başka kümede yüzde 55,2 daha az hata yapıyor ve en iyi modeller insanın sağlamlık aralığına giriyor. Temsil kalitesi: dondurulmuş temsilin üstüne küçük başlıklar takılarak on ayrı görevde ölçme; öz-denetimli modelleri aynı yordamla sıralayan ortak bir tahta, ama görev seçimi ölçülen şeyi tanımlıyor. Anlama ve akıl yürütme: konuşma, çevresel ses ve müzikte 27 beceriye yayılan 10 bin klip; insan 82,23, en iyi model 54,90, rastgele tahmin yaklaşık 26. Altta iki kayıt: kelime hata oranı doğru yazılmış ama yanlış anlaşılmış bir cevabı cezalandırmaz; ve yazıya geçmeyen duygu ile vurgu, kusursuz bir transkriptte bile kaybolur.](assets/ses-olcutlerinde-ne-olculuyor.svg "Şekil 3 — Üç ölçüm katmanı: tanıma, temsil, anlama")

Shu-wen Yang ve arkadaşlarının Interspeech 2021'de sunduğu ortak tahta, öz-denetimli temsilleri karşılaştırmak için kuruldu: temsil dondurulur, üstüne göreve özgü küçük bir başlık takılır, ve on ayrı görevde aynı yordamla ölçülür. Fikir 16'daki değerlendirme kümesi mantığının temsile uygulanmış hâli — ve 71'in uyarısı burada da geçerli: aynı yordam bütün görevlerde kullanıldığı için karşılaştırma adil, ama görev seçimi ölçülen şeyi tanımlıyor.

Üst katmanda durum daha açık. S Sakshi ve arkadaşlarının ICLR 2025'te sunduğu ölçüt, konuşma, çevresel ses ve müzik alanlarında 27 beceriye yayılan 10 bin ses klibi ve insan yazımı soru–cevap çiftlerinden oluşuyor. Ölçütün bin soruluk küçük sınama bölümünde insan başarısı 82,23; ön baskının ilk sürümündeki en güçlü çok modlu model 54,90; rastgele tahmin yaklaşık 26. Konferans sürümüne eklenen daha yeni bir model tam sınavda yüzde 59,93'e çıkıyor; açık yine yirmi puanın üstünde. Yani sesi "duyan" modeller, sesi anlamada görüntü tarafındakine benzer bir açığı taşıyor — 81'de gördüğümüz iki uç arasındaki mesafenin ses hâli.

> **Kendini yokla:** Kelime hata oranı sıfıra yaklaşan bir sistem neden hâlâ kötü bir sesli asistan olabilir?

Çünkü kelime hata oranı yalnızca zincirin ilk halkasını ölçer: sesin yazıya doğru çevrilmiş olmasını. Doğru yazılmış bir cümle yanlış anlaşılabilir, gecikmeyle cevaplanabilir, ya da sözün kesilmesi gereken yerde kesilmeyebilir; üçü de cetvelin dışındadır. Dahası, ardışık hattın ikinci bedeli tam da burada ölçülemez hâle gelir: duygu ve vurgu yazıya geçmediği için, mükemmel bir transkript bile onları kaybetmiş olur. Ölçmek isteyen, katmanı adlandırmak zorunda — tanıma mı, anlama mı, etkileşim mi.

## Sesin disiplini

**Sesin iki ayrı token ailesi vardır ve ikisi farklı şey taşır.** Anlamsal token ne söylendiğini taşır ama sesi geri üretemez; akustik token sesi geri üretir ama uzun erimli yapıyı zayıf tutar; melez düzen ikisini sırayla kullanır.

**Etiketli veri artık darboğaz değil.** Öz-denetimle on dakikalık etiketle çalışılabiliyor; zayıf denetimle 680 bin saatlik gürültülü eşleşme, temiz ve küçük bir kümeyi geçiyor.

**Sağlamlık iddiası ses tarafında da eşit referansla kurulur.** Referans kümede eşit iki modelden birinin öteki kümelerde yüzde 55,2 daha az hata yapması, farkın eğitim dağılımının kapsamından geldiğini gösteriyor.

**Ara temsil bir kayıp noktasıdır.** Yazıyı ara temsil yapan her hat, anlamı değiştiren dilsel olmayan bilgiyi ilk adımda siler.

**Sıra kavramı bir modelleme kararıdır.** Konuşmayı konuşmacı sıralarına bölen düzen, üst üste binen konuşmayı ve araya girmeyi temsil edemez; çok akışlı düzen bu kavramı kaldırır.

**Gecikme bir mimari kısıttır, bir eniyileme ayrıntısı değil.** İnsan sohbetinde sıra geçiş boşluğunun ortak ortalaması 208 milisaniye; bir düzenin bu bütçeye sığıp sığmadığı, bileşen sayısıyla ve çerçeve hızıyla belirlenir.

**Cetvel katmanını adlandırır.** Kelime hata oranı tanımayı ölçer, dondurulmuş temsil tahtası temsili, çok becerili ölçüt anlamayı; 27 becerili sınavda insan 82,23 iken en iyi model 54,90'da.

### Sırada ne var

Buraya kadar iki modalite de aynı biçimde ele alındı: dışarıdan gelen bir sinyali token'a çevirip bir dil modeline **anlatmak**. Peki ters yön? Bir modelin metinden görüntü ya da video üretmesi, aynı token mantığıyla mı çalışıyor, yoksa bambaşka bir üretim ailesi mi devrede? Bir sonraki makale bu ailenin kendisini kuruyor: gürültüden başlayıp adım adım geri temizleyen üretim modelleri nasıl çalışır, neden görüntüde 10'daki token token üretimden farklı bir yol izleniyor, ve zaman ekseni işin içine girince ne değişiyor?

## Kaynakça

- Stivers, T., Enfield, N. J., Brown, P., Englert, C., Hayashi, M., Heinemann, T., Hoymann, G., Rossano, F., de Ruiter, J. P., Yoon, K.-E. & Levinson, S. C. (2009). *Universals and cultural variation in turn-taking in conversation*. PNAS 106(26), s. 10587–10592. [Bağlantı](https://doi.org/10.1073/pnas.0903616106)
- Baevski, A., Zhou, H., Mohamed, A. & Auli, M. (2020). *wav2vec 2.0: A Framework for Self-Supervised Learning of Speech Representations*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/92d1e1eb1cd6f9fba3227870bb6d7f07-Abstract.html)
- Zeghidour, N., Luebs, A., Omran, A., Skoglund, J. & Tagliasacchi, M. (2022). *SoundStream: An End-to-End Neural Audio Codec*. IEEE/ACM Transactions on Audio, Speech, and Language Processing 30. [Bağlantı](https://doi.org/10.1109/TASLP.2021.3129994)
- Défossez, A., Copet, J., Synnaeve, G. & Adi, Y. (2023). *High Fidelity Neural Audio Compression*. Transactions on Machine Learning Research (2023). [Bağlantı](https://openreview.net/forum?id=ivCd8z8zR2)
- Borsos, Z., Marinier, R., Vincent, D., Kharitonov, E., Pietquin, O., Sharifi, M., Roblek, D., Teboul, O., Grangier, D., Tagliasacchi, M. & Zeghidour, N. (2023). *AudioLM: a Language Modeling Approach to Audio Generation*. IEEE/ACM Transactions on Audio, Speech, and Language Processing 31. [Bağlantı](https://doi.org/10.1109/TASLP.2023.3288409)
- Graves, A., Fernández, S., Gomez, F. & Schmidhuber, J. (2006). *Connectionist Temporal Classification: Labelling Unsegmented Sequence Data with Recurrent Neural Networks*. ICML 2006. [Bağlantı](https://doi.org/10.1145/1143844.1143891)
- Radford, A., Kim, J. W., Xu, T., Brockman, G., McLeavey, C. & Sutskever, I. (2023). *Robust Speech Recognition via Large-Scale Weak Supervision*. ICML 2023. [Bağlantı](https://proceedings.mlr.press/v202/radford23a.html)
- Shen, J., Pang, R., Weiss, R. J., Schuster, M., Jaitly, N., Yang, Z., Chen, Z., Zhang, Y., Wang, Y., Skerry-Ryan, R., Saurous, R. A., Agiomyrgiannakis, Y. & Wu, Y. (2018). *Natural TTS Synthesis by Conditioning WaveNet on Mel Spectrogram Predictions*. IEEE ICASSP 2018. [Bağlantı](https://doi.org/10.1109/ICASSP.2018.8461368)
- Kong, J., Kim, J. & Bae, J. (2020). *HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/c5d736809766d46260d816d8dbc9eb44-Abstract.html)
- Kim, J., Kong, J. & Son, J. (2021). *Conditional Variational Autoencoder with Adversarial Learning for End-to-End Text-to-Speech*. ICML 2021. [Bağlantı](https://proceedings.mlr.press/v139/kim21f.html)
- Wang, C., Chen, S., Wu, Y., Zhang, Z., Zhou, L., Liu, S., Chen, Z., Liu, Y., Wang, H., Li, J., He, L., Zhao, S. & Wei, F. (2023). *Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2301.02111. [Bağlantı](https://arxiv.org/abs/2301.02111)
- Défossez, A., Mazaré, L., Orsini, M., Royer, A., Pérez, P., Jégou, H., Grave, E. & Zeghidour, N. (2024). *Moshi: a speech-text foundation model for real-time dialogue*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2410.00037. [Bağlantı](https://arxiv.org/abs/2410.00037)
- Fang, Q., Guo, S., Zhou, Y., Ma, Z., Zhang, S. & Feng, Y. (2025). *LLaMA-Omni: Seamless Speech Interaction with Large Language Models*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/90d1fc07f46e31387978b88e7e057a31-Abstract-Conference.html)
- Pratap, V., Tjandra, A., Shi, B., Tomasello, P., Babu, A., Kundu, S., Elkahky, A., Ni, Z., Vyas, A., Fazel-Zarandi, M., Baevski, A., Adi, Y., Zhang, X., Hsu, W.-N., Conneau, A. & Auli, M. (2024). *Scaling Speech Technology to 1,000+ Languages*. Journal of Machine Learning Research 25. [Bağlantı](https://www.jmlr.org/papers/v25/23-1318.html)
- Ekstedt, E. & Skantze, G. (2022). *Voice Activity Projection: Self-supervised Learning of Turn-taking Events*. Interspeech 2022. [Bağlantı](https://www.isca-archive.org/interspeech_2022/ekstedt22_interspeech.html)
- Yang, S., Chi, P.-H., Chuang, Y.-S., Lai, C.-I. J., Lakhotia, K., Lin, Y. Y., Liu, A. T., Shi, J., Chang, X., Lin, G.-T., Huang, T.-H., Tseng, W.-C., Lee, K., Liu, D.-R., Huang, Z., Dong, S., Li, S.-W., Watanabe, S., Mohamed, A. & Lee, H. (2021). *SUPERB: Speech Processing Universal PERformance Benchmark*. Interspeech 2021. [Bağlantı](https://www.isca-archive.org/interspeech_2021/yang21c_interspeech.html)
- Sakshi, S., Tyagi, U., Kumar, S., Seth, A., Selvakumar, R., Nieto, O., Duraiswami, R., Ghosh, S. & Manocha, D. (2025). *MMAU: A Massive Multi-Task Audio Understanding and Reasoning Benchmark*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/d36f208919582785db965fe648b9fe59-Abstract-Conference.html)
