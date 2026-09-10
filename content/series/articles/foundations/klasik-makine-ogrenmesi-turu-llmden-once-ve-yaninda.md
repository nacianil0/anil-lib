---
article_id: article_5d9c2ab7-64f1-4e83-8b70-2c1fa9d6e05a
title: "Klasik Makine Öğrenmesi Turu: LLM'den Önce ve Yanında"
slug: klasik-makine-ogrenmesi-turu-llmden-once-ve-yaninda
category: foundations
level: advanced
reading_order: 97
summary: "96. makalede kurduğumuz muhasebe sinir ağlarına özgü değil; her tahmin yordamının kalemleri. Bu makale dört klasik aileyi varsayımlarıyla geziyor. Hiç eğitilmeyen en yakın komşu kuralı, sonsuz örnekte en iyi olası hatanın iki katını asla aşmıyor: en iyi hata yüzde 5 ise en yakın komşunun tavanı yüzde 9,5. Ağaç toplulukları hâlâ tablo verisinde önde ve nedeni ölçüldü: 45 kümede yapılan karşılaştırma üç etken buluyor ve rastgele döndürme sıralamayı tersine çeviriyor. Ama tek cümlelik cevap yok: 176 kümelik daha büyük bir çalışma, farkın çoğu kümede önemsiz olduğunu ve ağacın hiperparametresini biraz ayarlamanın aile seçiminden daha çok fark ettirdiğini buluyor. 121 kümelik klasik tarama da aynı dersi veriyor: 179 sınıflandırıcı arasında en iyisi en büyük doğruluğun yüzde 94,1'ini alıyor."
tags:
  - klasik-ml
  - karar-agaclari
  - destek-vektor-makineleri
  - kumeleme
  - taban-cizgisi
content_hash: sha256:37ccfbf56903acb206dfbce90de10f5be96f0cca4945aeead39d02c50372791a
classification_version: 1
classification_batch: 23
---
## Aynı muhasebe, farklı varsayım

96\. makalede genellemenin muhasebesini kurduk: yanlılık, oynaklık, indirgenemez hata; ezberin bir bütçe kalemi olduğu; hangi çözüme inildiğini eniyileyicinin seçtiği. Hiçbiri sinir ağlarına özgü değildi.

Bu makale o muhasebeyi başka ailelerde çalıştırıyor. Ama asıl işi tek cümle: **her yöntemin kimliği, verinin biçimi hakkında yaptığı varsayımdır** — ve varsayım tutmadığında yöntemin ne kadar modern olduğu işe yaramaz. Tersi de doğru: varsayım tuttuğunda kırk yıllık bir yöntem bugünün mimarisini geçebilir.

Sonuçta gideceğimiz yer şu olacak: dünyadaki verinin çoğu tablo biçiminde ve orada kazanan varsayım transformer'ın varsayımı değil.

## Hiç eğitilmeyen yöntem

En sade fikirle başlayalım. Yeni bir örneği sınıflandırmak için eğitim kümesindeki en yakın örneği bul ve onun etiketini ver. Eğitim yok; bütün maliyet sorgu anında.

Thomas Cover ve Peter Hart'ın IEEE Transactions on Information Theory'de 1967'de yayımladığı çalışma bu kadar basit bir kuralın ne kadar iyi olabileceğini sordu ve şaşırtıcı bir cevap buldu. Karşılaştırma noktası **Bayes hatası**: dağılımı tam olarak bilen, dolayısıyla yapılabilecek en iyi kararı veren bir kuralın hata oranı. Yazarların kanıtladığı sınır, sonsuz örnek limitinde, en yakın komşu kuralının hatasının Bayes hatasının **iki katını** asla aşamayacağını söylüyor.

Sayı koyalım. İki sınıflı bir problemde en iyi olası hata yüzde 5 ise, en yakın komşu kuralının hatası en fazla yüzde 9,5 olur. En iyi hata yüzde 10 ise tavan yüzde 18; yüzde 25 ise yüzde 37,5. Sınır Bayes hatası küçüldükçe iki katına yaklaşıyor.

Yazarların yorumu daha da öğretici: sonsuz bir örneklemdeki sınıflandırma bilgisinin **yarısı** tek bir en yakın komşuda saklıdır. Hiçbir model uydurulmadan, hiçbir parametre öğrenilmeden.

![Dört satırlık bir tablo ve altında iki kutu. Üstte Cover ve Hart'ın 1967 sınırı yazılıdır: en yakın komşu kuralının hatası R, Bayes hatası R yıldız çarpı iki eksi M çarpı R yıldız bölü M eksi 1 değerini aşamaz; burada M sınıf sayısıdır. Tablonun sütunları sınıf sayısı M, Bayes hatası, en yakın komşunun üst sınırı ve kaç kat olduğudur. Birinci satır M eşittir 2, Bayes hatası yüzde 1, üst sınır yüzde 1,98, 1,980 kat. İkinci satır M eşittir 2, Bayes hatası yüzde 5, üst sınır yüzde 9,50, 1,900 kat. Üçüncü satır M eşittir 2, Bayes hatası yüzde 10, üst sınır yüzde 18,00, 1,800 kat. Dördüncü satır M eşittir 10, Bayes hatası yüzde 5, üst sınır yüzde 9,72, 1,944 kat; bu satır vurguludur. Birinci kutuda sonucun anlamı yazılıdır: hiçbir parametre öğrenmeyen bir kural en iyi olası hatanın iki katını aşmıyor ve Bayes hatası küçüldükçe tavan tam iki kata yaklaşıyor. İkinci kutuda sınır yazılıdır: sonuç sonsuz örneklem limitindedir ve sonlu veride geçerli değildir, ayrıca en yakın sözcüğünün tanımı için anlamlı bir uzaklık ölçüsü gerektirir. En altta bir kayıt: dört satır kaynağın verdiği formülden elle hesaplanmıştır.](assets/en-yakin-komsunun-tavani.svg "Şekil 1 — Hiç eğitilmeyen bir kuralın tavanı")

Şekil 1 sınırı ve sınırın sınırını birlikte veriyor. İki uyarı önemli. Birincisi sonuç asimptotik: sonsuz örneklem varsayımı altında geçerli, sonlu veride değil. İkincisi ve daha ilginci, "en yakın" sözcüğü bir uzaklık ölçüsü gerektiriyor — ve 91\. makalede aynı üçlüde üç cetvelin zıt sıralama verebildiğini görmüştük. Yöntemin varsayımı burada: **yakındaki noktalar aynı etikete sahiptir**, ve "yakın"ın tanımı sana bırakılmıştır.

Varsayımın kırıldığı yeri de biliyoruz. 5\. makalede boyutluluk lanetini olasılık tarafından, 43\. makalede geometrik tarafından görmüştük: boyut arttıkça en yakın komşuyla en uzak komşu arasındaki mesafe farkı küçülür ve "yakın" sözcüğü bilgi taşımaz hâle gelir.

Yöntemin tek ayarı olan k — kaç komşuya bakılacağı — 96\. makalenin muhasebesini çıplak biçimde gösteriyor. k = 1'de karar tek bir örneğe bağlıdır: yanlılık düşük, oynaklık yüksek, gürültülü tek bir etiket doğrudan yanlış cevaba çevrilir. k büyüdükçe karar bir bölgenin ortalamasına dayanır: oynaklık düşer, ama sınıf sınırı bulanıklaştığı için yanlılık artar. Şekil 1'deki tavan k = 1 içindir; k'yı ayarlamak, aynı toplamı 96\. makalenin iki kalemi arasında yeniden dağıtmaktan başka bir şey değildir.

## Marj: hangi çizgi

İkinci aile, iki sınıfı ayıran bir yüzey arar. Sonsuz sayıda ayırıcı varsa hangisi seçilmeli? Corinna Cortes ve Vladimir Vapnik'in Machine Learning dergisinde 1995'te yayımladığı çalışmanın cevabı: iki sınıfa olan en küçük uzaklığı en büyükleyen ayırıcı — yani **marj**ı en geniş olanı.

96\. makalede bu cümleyi başka bir yerde görmüştük: Soudry ve arkadaşları, gradyan inişinin ayrılabilir veride kendiliğinden aynı ayırıcıya yaklaştığını kanıtlamıştı. Aynı çözüm, biri açık bir eniyileme hedefi olarak, öbürü bir yordamın örtük tercihi olarak.

Yöntemin gücü ikinci fikirde. Veri düz bir yüzeyle ayrılmıyorsa noktaları başka bir uzaya taşırsın ve orada ayırırsın; ama bu taşıma hiç yapılmaz. Çünkü eniyileme problemi noktaların yalnızca ikili **nokta çarpımlarını** kullanır — 91\. makalenin işlemi — ve o çarpımı yeni uzaya gitmeden hesaplayan bir fonksiyon yazmak yeterlidir. Alandaki adı çekirdek (kernel) numarası.

Varsayım açık ve daraltıcı: seçilen çekirdeğin tanımladığı uzayda sınıflar geniş bir marjla ayrılır. Çekirdek yanlışsa hiçbir eniyileme kurtarmaz; seçim veriyi tanımayı gerektirir.

Buna karşılık yöntemin iki somut üstünlüğü var. Eğitim problemi dışbükeydir — 95\. makalenin diliyle, tek bir dip vardır ve rastgele başlangıç ya da öğrenme oranı sonucu değiştirmez. Ve çözüm yalnızca marjın kenarındaki birkaç örneğe, yani destek vektörlerine bağlıdır; geri kalan bütün veri silinse aynı ayırıcı çıkar. Bu yüzden örnek sayısının az, öznitelik sayısının çok olduğu problemlerde — metin sınıflandırmasının uzun yıllar en güçlü yöntemi buydu — hâlâ ciddi bir aday.

## Eksene paralel dilimler

Üçüncü aile bambaşka bir varsayım yapıyor: hedef, **eksene paralel dilimlerde parçalı sabittir**. Karar ağacı tam olarak bunu kurar — her düğümde tek bir özniteliğe bir eşik koyar, veriyi ikiye böler, tekrarlar. Ross Quinlan'ın 1986'daki çalışması bu bölmenin hangi ölçüte göre seçileceğini kurdu ve seçtiği ölçüt 94\. makaleden tanıdık: entropinin bölmeyle ne kadar azaldığı.

Tek ağaç oynaktır: veriyi biraz değiştir, ağaç bambaşka çıkar. 96\. makalenin diliyle söylersek yanlılığı düşük, oynaklığı yüksek. İki farklı çare var ve karıştırılmamaları gerekiyor.

Leo Breiman'ın 1996'da kurduğu **torbalama** (bagging) oynaklığa saldırır: veriden yerine koyarak birçok örneklem çek, her birinde ayrı ağaç yetiştir, tahminleri ortala. Ortalama almak oynaklığı düşürür, yanlılığa dokunmaz. Breiman'ın 2001'de yayımladığı rastgele orman bunun üstüne bir şey daha ekler: her bölmede yalnızca rastgele seçilmiş birkaç öznitelik denenir, böylece ağaçlar birbirine daha az benzer ve ortalamanın kazancı büyür.

Jerome Friedman'ın Annals of Statistics'te 2001'de yayımladığı **gradyan artırma** (gradient boosting) ise yanlılığa saldırır: ağaçlar paralel değil sırayla yetiştirilir ve her yeni ağaç, o ana kadarki topluluğun **kalan hatasına** uydurulur. Adındaki "gradyan" tesadüf değil — her ağaç, kaybın o noktadaki negatif gradyanına uydurulan bir adımdır; 95\. makaledeki döngünün fonksiyon uzayında yazılmış hâli.

Tianqi Chen ve Carlos Guestrin'in KDD 2016'da sunduğu XGBoost bu fikri ölçeklenebilir bir sisteme çevirdi ve bugün tablo verisiyle çalışan hemen her ekibin ilk uğrağı oldu.

Ailenin en somut sınırı da varsayımından doğrudan çıkıyor. Ağaç, çıktı olarak yalnızca yapraklarında gördüğü değerleri verebilir; eğitim verisinin dışına çıkan bir girdi için en yakın yaprağın sabitini söyler. Yani ağaçlar **dışarı doğru uzatamaz**: eğitimde en büyük değer 100 ise, girdi 500 olduğunda da tahmin 100 civarında kalır. Doğrusal bir model bu durumda eğimi izler ve doğru cevabı verebilir. Aynı özellik, gürültülü aykırı değerlere karşı sağlamlığın da kaynağı — bir kez daha, kusur ve kimlik aynı satırda.

> **Kendini yokla:** Torbalama ile artırma ikisi de birçok ağaç kullanıyor. Aradaki fark tek cümleyle nedir?

Torbalamada ağaçlar birbirinden habersiz ve paralel yetişir, amaç oynaklığı ortalamayla düşürmektir; artırmada her ağaç bir öncekinin hatasına bakarak yetişir, amaç yanlılığı adım adım azaltmaktır. Bu yüzden torbalamada ağaç sayısını artırmak genellikle zarar vermez, artırmada aşırı öğrenmeye götürebilir.

## Etiketsiz veri: k-ortalamalar

Dördüncü aile etiket kullanmıyor. Stuart Lloyd'un 1957'de yazıp 1982'de yayımladığı yordam bugün de standart: k merkezi başlat, her noktayı en yakın merkeze ata, merkezleri kendi noktalarının ortalamasına taşı, tekrarla.

43\. makalede bu yordamı bir **dizin aracı** olarak kullanmıştık — vektörleri kümelere bölüp yalnızca yakın kümelere bakmak için. Burada kendi işinde: veride yapı aramak.

İki gerçeği yan yana koymak öğretici. Problemin kendisi — noktaların merkezlerine olan karesel uzaklıklar toplamını en küçültmek — iki kümede bile NP-zordur; Lloyd'un yordamı ise yalnızca yerel bir çözüm bulur ve başlangıca göre çok kötü sonuçlar verebilir. David Arthur ve Sergei Vassilvitskii'nin SODA 2007'de sunduğu k-ortalamalar++ yalnızca **başlangıcı** değiştiriyor: merkezler rastgele değil, mevcut merkezlere uzaklığın karesiyle orantılı olasılıkla seçiliyor. Bu tek değişiklik, hiçbir güvence vermeyen yordamı, en iyi kümelemenin logaritma k katı içinde kalması güvenceli bir yordama çeviriyor.

Varsayım burada da net: kümeler yaklaşık küresel ve benzer yayılımdadır. Uzun ve ince kümeler ya da iç içe geçmiş halkalar bu ölçüte göre "kötü" görünür — yöntem onları bulamaz, çünkü aradığı şey onlar değil.

Etiketsiz veriyle çalışan ikinci klasik araç 92\. makalede zaten kurulmuştu. Ortalanmış verinin kovaryans matrisinin özvektörleri verinin en çok yayıldığı yönleri, özdeğerleri de o yönlerdeki yayılım miktarını veriyordu; birkaç baskın yönü tutup gerisini atmanın adı temel bileşen çözümlemesidir. İki yöntemin işi karışmasın: temel bileşen çözümlemesi **eksenleri** değiştirir, k-ortalamalar **noktaları** gruplar. Pratikte sık sık art arda kullanılırlar — önce boyut indirilir, sonra kümelenir — ve o sırada 43\. makaledeki uyarı geri döner: indirgenen uzayda "yakın" olmak, özgün uzayda yakın olmakla aynı şey değildir.

![Dört bloklu bir liste. Üstte şu cümle yazılıdır: bir yöntemi seçmek, verinin biçimi hakkında bir iddiada bulunmaktır. Her blok bir yöntem ailesini üç satırla anlatır: varsayım, maliyetin nerede olduğu ve varsayımın nerede kırıldığı. Birinci blok en yakın komşu: varsayım yakındaki noktaların aynı etikete sahip olması; maliyet eğitimde değil sorguda; kırıldığı yer yüksek boyutta uzaklık farklarının silinmesi. İkinci blok marj tabanlı ayırıcı: varsayım seçilen çekirdeğin uzayında sınıfların geniş marjla ayrılması; maliyet eğitimde dışbükey eniyileme, çıkarımda yalnızca destek vektörleri; kırıldığı yer çekirdek yanlış seçildiğinde hiçbir eniyilemenin kurtarmaması. Üçüncü blok ağaç toplulukları ve vurguludur: varsayım hedefin eksene paralel dilimlerde parçalı sabit olması; maliyet eğitimde ardışık bölmeler, çıkarımda çok ucuz; kırıldığı yer düzgün ve döndürülmüş yapılar ile dışarı doğru uzatma. Dördüncü blok k-ortalamalar: varsayım kümelerin yaklaşık küresel ve benzer yayılımda olması; maliyet yinelemeli atama ve taşıma, etiket gerekmemesi; kırıldığı yer uzun, ince ya da iç içe kümeleri bulamaması. Altta bir kutuda şu cümle durur: iddia yanlışsa yöntemin modernliği işe yaramaz, her satırın kırılma noktası kimliğidir. En altta bir kayıt: satırlar metinde anılan kaynakların kendi kurulumlarından derlenmiştir.](assets/dort-aile-dort-varsayim.svg "Şekil 2 — Dört yöntem, dört varsayım, dört kırılma noktası")

Şekil 2 dördünü yan yana koyuyor. Sütunların en önemlisi sonuncusu: her satırın bir kırılma noktası var ve o nokta yöntemin kusuru değil, kimliği.

## Tablo verisinde neden hâlâ ağaçlar kazanıyor

Şimdi asıl soruya gelelim. Görüntüde ve metinde sinir ağları tartışmasız önde. Tablo verisinde — satırların kayıt, sütunların öznitelik olduğu, dünyadaki kurumsal verinin çoğunu oluşturan biçimde — durum neden farklı?

Léo Grinsztajn, Edouard Oyallon ve Gaël Varoquaux'nun NeurIPS 2022'nin veri kümeleri ve ölçütler programında sunduğu çalışma soruyu ölçüye çevirdi. Tablo verisinin belirgin özelliklerini taşıyan 45 küme seçtiler, ağaç toplulukları ile sinir ağlarını her ikisi için de aynı hiperparametre arama bütçesiyle karşılaştırdılar ve aramanın her noktasını yayımladılar. Orta ölçekli kümelerde ağaç toplulukları önde kaldı. Sonra asıl işi yaptılar: veriyi bilerek bozup farkın nereden geldiğini aradılar.

![Üç bulgulu bir liste ve altında bir kutu. Üstte kurulum yazılıdır: 45 küme, orta ölçek yaklaşık on bin satır, her iki aile için eşit hiperparametre arama bütçesi, yaklaşık yirmi bin hesap saati. Birinci bulgu fazla düzgünlük: hedef bir çekirdek düzleştiriciyle yumuşatıldığında ağaçların doğruluğu belirgin biçimde düşüyor, sinir ağlarınınki neredeyse etkilenmiyor; çıkarım, bu kümelerdeki hedeflerin düzgün olmadığı. İkinci bulgu boş öznitelikler: özniteliklerin yarısına kadarı önem sırasına göre atıldığında gradyan artırmanın doğruluğu pek düşmüyor, sinir ağları ise atmaktan fayda görüyor; çıkarım, boş özniteliklerin sinir ağlarını daha çok etkilediği. Üçüncü bulgu döndürme ve vurguludur: özniteliklere rastgele bir döndürme uygulandığında sıralama tersine dönüyor ve sinir ağları ağaçların üstüne çıkıyor; çıkarım, sıralamayı belirleyen şeyin verinin ekseninde taşınan bilgi olduğu. Alttaki kutuda iki cümle durur: üç bulgu da aynı yere çıkıyor, kazanan veriye uygun varsayımı yapan; ve sonuçlar orta ölçekli, yalnızca sayısal öznitelikli sınıflandırma kümeleri içindir. En altta bir kayıt: bulgular kaynağın kendi deneylerinden alınmıştır ve burada yeniden ölçülmemiştir.](assets/uc-bulgu-ve-donme.svg "Şekil 3 — Aynı veri, bozulunca sıralama nasıl değişiyor")

Şekil 3'ün üçüncü bulgusu meselenin özü. Bir öğrenme yordamı **döndürmeye göre değişmez** ise, özniteliklere bir döndürme uygulanıp aynı eğitim tekrarlandığında sonuç değişmez. Çok katmanlı ağlar bu anlamda döndürmeye göre değişmezdir; ağaçlar değildir, çünkü her bölme tek bir özniteliğe bakar. Yazarlar veriyi rastgele döndürdüklerinde sıralama tersine dönüyor: sinir ağları öne geçiyor.

Bu bir kusur gösterisi değil, bir bilgi ifşası. Tablo verisinde sütunların **kendisi** anlamlıdır — "yaş", "gelir", "gün sayısı" ayrı ayrı şeylerdir ve karışımları çoğu zaman anlamsızdır. Döndürmeye göre değişmeyen bir yordam bu bilgiyi baştan atar; eksene paralel bölen bir yordam onu kullanır. Kazanan, daha güçlü olan değil, veriye uygun varsayımı yapan.

## Tek cümlelik cevap yok

Bu noktada "demek ki tablo verisinde ağaç kullan" demek cazip. Alan bu kadar rahat değil.

Duncan McElfresh ve arkadaşlarının NeurIPS 2023'ün veri kümeleri ve ölçütler programında sunduğu çalışma 19 algoritmayı 176 kümede karşılaştırdı ve tartışmanın kendisine itiraz etti: kümelerin şaşırtıcı biçimde büyük bir kısmında iki aile arasındaki fark önemsiz, ya da gradyan artırmanın hiperparametrelerini hafifçe ayarlamak aile seçiminden daha çok fark ettiriyor. Ailelerin nerede ayrıştığını da ölçüyorlar: ağaç toplulukları, çarpık ya da ağır kuyruklu öznitelik dağılımlarında ve genel düzensizliklerde belirgin biçimde daha iyi.

Ravid Shwartz-Ziv ile Amitai Armon'un Information Fusion'da 2022'de yayımladığı çalışma soruyu bir adım daha kaydırıyor. Tablo verisi için önerilen derin modelleri XGBoost'la karşılaştırıyorlar — üstelik o modellerin kendi makalelerinde kullandıkları kümelerde — ve XGBoost'un öne geçtiğini, üstelik çok daha az ayar istediğini buluyorlar. Ama ikinci bulguları daha ilginç: derin modellerle XGBoost'un **birlikte** kullanıldığı topluluk, yalnız XGBoost'tan iyi. Yani iki aile aynı hataları yapmıyor; birinin kaçırdığını öbürü yakalıyor.

McElfresh ve arkadaşlarının not ettiği bir istisna daha var. Noah Hollmann ve arkadaşlarının ICLR 2023'te sunduğu TabPFN, bir transformer'ı sentetik veri üzerinde bir kez eğitip, yeni bir küçük tablo kümesini **isteme koyarak** — 23\. makaledeki örnekle öğrenmenin ta kendisi — tek ileri geçişte sonuç üretiyor. Eğitim kümesi yaklaşık üç bin satırla sınırlı; o sınır içinde McElfresh'in taramasında ortalamada bütün diğer algoritmaları geçiyor. Ekibin Nature'da 2025'te yayımladığı sürüm aynı fikri genişletiyor. Dikkat edilecek yer şu: TabPFN'in üstünlüğü mimarisinin gücünden çok, **hangi varsayımı taşıdığından** geliyor — sentetik eğitim verisi basit nedensel yapılara doğru eğimli üretiliyor ve model o eğimi öğreniyor. Yine varsayım, yine kimlik.

> **Kendini yokla:** Aynı soruya üç çalışma üç farklı cevap veriyorsa, hangisinin doğru olduğunu nasıl anlarız?

Sorunun sorulduğu koşulu okuyarak. Üçü aynı soruyu sormuyor: biri orta ölçekli ve sayısal öznitelikli kümelerde iki aileyi karşılaştırıyor, biri çok daha geniş bir küme havuzunda farkın büyüklüğünü sorguluyor, biri üç bin satırın altındaki kümelere bakıyor. Cevaplar çelişmiyor; kapsamları farklı. 16\. makaledeki dersin başka bir kılığı — bir puanın anlamı, protokolüyle birlikte okunur.

## Taban çizgisi kültürü

Bu makalenin pratik çıktısı bir yöntem tavsiyesi değil, bir alışkanlık. David Wolpert'in Neural Computation'da 1996'da yayımladığı sonuç çerçeveyi kuruyor: bütün olası hedef fonksiyonlar üzerinde ortalandığında, hiçbir öğrenme algoritması bir diğerinden iyi değildir. Sonucun pratikteki okuması "her yöntem eşittir" değil; bir yöntemi diğerine tercih etmenin **her zaman** veri hakkında bir varsayıma dayandığıdır. Varsayımsız üstünlük diye bir şey yok.

Ölçülmüş hâli de var. Manuel Fernández-Delgado ve arkadaşlarının JMLR'de 2014'te yayımladığı tarama, 17 aileden 179 sınıflandırıcıyı 121 veri kümesinde çalıştırdı. En iyi aile rastgele orman oldu: en iyi sürümü, her kümede ulaşılabilen en yüksek doğruluğun ortalama yüzde 94,1'ini alıyor ve kümelerin yüzde 84,3'ünde bu oranı yüzde 90'ın üstünde tutuyor. Ama ikinci sıradaki Gauss çekirdekli destek vektör makinesiyle arasındaki fark — yüzde 92,3 — istatistiksel olarak anlamlı değil.

16\. makalede "cetvel arayışı" derken kurduğumuz disiplinin buradaki karşılığı şu: yeni bir yöntemin değeri, **iyi ayarlanmış** bir klasik taban çizgisine göre ölçülür. Ayarlanmamış bir taban çizgisini geçmek bir sonuç değildir.

Seçimin ölçütü de yalnızca doğruluk değil. 1\. makalede modeli "ayarlanabilir bir fonksiyon", 2\. makalede öğrenmeyi "tek bir sayıyı küçültmek" diye tanımlamıştık; o tanım hangi aileden model kurduğuna bakmaz. Ama tanımın dışında kalan üç kalem karar verir: kaç örneğin var, çıkarımın ne kadar ucuz olmalı, ve kararın nasıl açıklanacak. Birkaç bin satırlık bir kümede milyar parametreli bir model eğitmek 96\. makalenin oynaklık kalemini şişirir; milisaniyelik bir bütçede tek bir ağaç topluluğu bir sinir ağından kat kat ucuzdur; ve bir kredi kararının hangi eşikten geçtiğini söylemek gerekiyorsa, eksene paralel bölmelerden oluşan bir yapı doğrudan okunabilir. Bunlar "eski yöntem" tavizleri değil, problemin kendi kısıtları.

### Sırada ne var

Bu makalede üç kez aynı şeyi yaptık: bir iddiayı aldık, hangi koşulda ölçüldüğüne baktık ve cevabın koşulla birlikte değiştiğini gördük. Aynı işi bundan sonra her okuduğumuz çalışmada yapmamız gerekecek — çünkü buraya kadar hep başkalarının okuyup özetlediği sonuçlarla çalıştık. Serinin bir sonraki fazı bu alışkanlığı doğrudan konu ediniyor. İlk sorusu şu: bir akademik çalışmanın iddiası tam olarak nerede yazılıdır, o iddiayı hangi kanıt taşır, ve iddia ile kanıt arasındaki bağ koptuğunda bunu nasıl fark ederiz?

## Kaynakça

- Cover, T. M. & Hart, P. E. (1967). *Nearest neighbor pattern classification*. IEEE Transactions on Information Theory 13(1), 21–27. [Bağlantı](https://doi.org/10.1109/TIT.1967.1053964)
- Cortes, C. & Vapnik, V. (1995). *Support-vector networks*. Machine Learning 20(3), 273–297. [Bağlantı](https://doi.org/10.1007/BF00994018)
- Quinlan, J. R. (1986). *Induction of decision trees*. Machine Learning 1(1), 81–106. [Bağlantı](https://doi.org/10.1007/BF00116251)
- Breiman, L. (1996). *Bagging predictors*. Machine Learning 24(2), 123–140. [Bağlantı](https://doi.org/10.1007/BF00058655)
- Breiman, L. (2001). *Random Forests*. Machine Learning 45(1), 5–32. [Bağlantı](https://doi.org/10.1023/A:1010933404324)
- Friedman, J. H. (2001). *Greedy function approximation: A gradient boosting machine*. The Annals of Statistics 29(5), 1189–1232. [Bağlantı](https://doi.org/10.1214/aos/1013203451)
- Chen, T. & Guestrin, C. (2016). *XGBoost: A Scalable Tree Boosting System*. KDD 2016, 785–794. [Bağlantı](https://doi.org/10.1145/2939672.2939785)
- Lloyd, S. P. (1982). *Least squares quantization in PCM*. IEEE Transactions on Information Theory 28(2), 129–137. [Bağlantı](https://doi.org/10.1109/TIT.1982.1056489)
- Arthur, D. & Vassilvitskii, S. (2007). *k-means++: The Advantages of Careful Seeding*. SODA 2007, 1027–1035. [Bağlantı](https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf)
- Grinsztajn, L., Oyallon, E. & Varoquaux, G. (2022). *Why do tree-based models still outperform deep learning on typical tabular data?* NeurIPS 2022, Datasets and Benchmarks Track. [Bağlantı](https://openreview.net/forum?id=Fp7__phQszn)
- Shwartz-Ziv, R. & Armon, A. (2022). *Tabular data: Deep learning is not all you need*. Information Fusion 81, 84–90. [Bağlantı](https://doi.org/10.1016/j.inffus.2021.11.011)
- McElfresh, D., Khandagale, S., Valverde, J., Prasad C, V., Ramakrishnan, G., Goldblum, M. & White, C. (2023). *When Do Neural Nets Outperform Boosted Trees on Tabular Data?* NeurIPS 2023, Datasets and Benchmarks Track. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/f06d5ebd4ff40b40dd97e30cee632123-Abstract-Datasets_and_Benchmarks.html)
- Hollmann, N., Müller, S., Eggensperger, K. & Hutter, F. (2023). *TabPFN: A Transformer That Solves Small Tabular Classification Problems in a Second*. ICLR 2023. [Bağlantı](https://arxiv.org/abs/2207.01848)
- Hollmann, N., Müller, S., Purucker, L., Krishnakumar, A., Körfer, M., Hoo, S. B., Schirrmeister, R. T. & Hutter, F. (2025). *Accurate predictions on small data with a tabular foundation model*. Nature 637(8045), 319–326. [Bağlantı](https://doi.org/10.1038/s41586-024-08328-6)
- Wolpert, D. H. (1996). *The Lack of A Priori Distinctions Between Learning Algorithms*. Neural Computation 8(7), 1341–1390. [Bağlantı](https://doi.org/10.1162/neco.1996.8.7.1341)
- Fernández-Delgado, M., Cernadas, E., Barro, S. & Amorim, D. (2014). *Do we Need Hundreds of Classifiers to Solve Real World Classification Problems?* Journal of Machine Learning Research 15(90), 3133–3181. [Bağlantı](https://jmlr.org/papers/v15/delgado14a.html)
