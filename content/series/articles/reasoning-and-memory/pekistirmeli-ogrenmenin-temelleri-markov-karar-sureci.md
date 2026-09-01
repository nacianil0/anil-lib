---
article_id: article_b9c5e861-b1de-4dba-9b12-7841f1d929e1
title: "Pekiştirmeli Öğrenmenin Temelleri: Markov Karar Süreci, Politika ve Ödül"
slug: pekistirmeli-ogrenmenin-temelleri-markov-karar-sureci
category: reasoning-and-memory
level: intermediate
reading_order: 37
summary: "13. ve 34. makalelerde sezgiyle kullanılan politika, ödül ve avantaj kavramlarını biçimsel zemine oturtur: durum, eylem, geçiş ve ödülden oluşan karar çerçevesini, iskontonun ne satın aldığını, değer ile avantaj arasındaki farkı, bir dil modelinin token üretiminin bu çerçeveye nasıl eşlendiğini ve tek bir sondaki ödülün binlerce karara nasıl dağıtılacağı sorusunu kurar."
tags:
  - pekistirmeli-ogrenme
  - markov-karar-sureci
  - politika
  - deger-islevi
  - kredi-atama
content_hash: sha256:65c413c8a1e654e4e76c652149638cd5f71eeace56940f830897f2829bd75b67
classification_version: 1
classification_batch: 8
---
## Ödünç alınmış bir sözlük

Son yirmi beş makalede, adını koymadığımız bir alanın sözlüğünü sürekli kullandık.

13\. makalede eğitilen modele **politika** dedik ve onu bir ödül modeline göre oynattık; güncellemenin büyüklüğünü sınırlayan bir kırpma teriminden ve modeli başlangıç noktasına bağlayan bir cezadan söz ettik. 34\. makalede grup göreli **avantaj** hesapladık: bir cevabın ödülünden grubun ortalamasını çıkardık. 36\. makalede bir programın hamle öneren ve konum puanlayan iki ağını andık ve alandaki adlarının politika ağı ile değer ağı olduğunu söyleyip geçtik.

Bu kavramların hiçbirinin biçimsel tanımını vermedik. 13\. makalede "pekiştirmeli öğrenmenin biçimsel çerçevesi ileride" diye bir işaret bırakmıştık; bu makale o işareti karşılıyor.

Bir uyarıyla başlayalım, çünkü seri boyunca kurduğumuz en riskli sözcük çakışması burada. 6\. makalede dikkat üçlüsünün üçüncü bileşenine **değer** demiştik: bir token'ın taşıdığı, ağırlıklarla toplanan içerik. Bu makaledeki "değer" onunla hiçbir ilgisi olmayan bambaşka bir kavram — gelecekte toplanması beklenen ödül. Aynı Türkçe sözcük, aynı İngilizce sözcük, iki ayrı kavram. Hangisinden söz ettiğimizi bağlam belirleyecek; karışma ihtimali olan yerlerde açıkça söyleyeceğim.

## Karar veren bir şey, değişen bir dünya

Pekiştirmeli öğrenme, denetimli öğrenmeden bir noktada ayrılır. 1\. makaledeki denetimli düzende her girdinin doğru çıktısı elimizdeydi; burada doğru çıktı yok, yalnızca yaptığımız şeyin ne kadar iyi gittiğini söyleyen bir sayı var. Üstelik o sayı hemen gelmeyebilir.

Çerçeve dört parçadan kurulu. **Durum** (state): karar verilecek anda dünyanın bilinen hâli. **Eylem** (action): o durumda seçilebilecek şeylerden biri. **Ödül** (reward): eylemin ardından gelen sayı. **Geçiş** (transition): eylemin dünyayı hangi yeni duruma taşıdığı. Döngü buradan kapanır: yeni durumda yeniden karar verilir.

Dört parçanın somut bir örneğe nasıl oturduğunu görmek, soyut kalmasını önlüyor. Eski bir Atari oyununda durum ekrandaki görüntüdür, eylem kolun yönlerinden biri ya da ateş düğmesidir, ödül puandaki değişimdir, geçiş de oyunun bir sonraki karesidir. Aynı dört parça bir satranç tahtasına, bir sipariş kuyruğuna ya da birazdan göreceğimiz gibi yarım kalmış bir metne de oturur; değişen şey yalnızca durumun neyden yapıldığıdır.

![Kapalı bir döngü şeması. Solda politika diye etiketlenmiş karar veren birim kutusu, sağda durumu güncelleyen çevre kutusu vardır. Soldan sağa giden ok eylem diye adlandırılmıştır. Çevrenin altından çıkıp sola dönerek karar veren birime geri gelen tek bir yol vardır ve bu yolun üzerinde ödül ile yeni durum etiketleri yan yana durur. Döngünün altında bir zaman çizgisi bulunur; üzerindeki tikler sırasıyla durum, eylem, ödül, yeni durum ve yeni eylem diye işaretlenmiştir. Şeklin altında 13. makaledeki ödül döngüsünün bunun özel hâli olduğu, oradaki politikanın karar veren birime ve ödül modelinin ödülü veren kaynağa karşılık geldiği yazılıdır.](assets/karar-dongusu.svg "Şekil 1 — Durum, eylem, ödül ve yeni durum")

Şekil 1'deki döngü 13\. makaledeki şemanın genel hâli. Orada politika bir cevap üretiyordu, ödül modeli puan veriyordu, güncelleme adımı parametreleri oynatıyordu. Burada aynı yapı isimlendirilmiş durumda.

Çerçevenin adı **Markov karar süreci** (Markov decision process) ve adındaki sıfat bir varsayımı taşıyor: bir sonraki durumun ne olacağı ve hangi ödülün geleceği, yalnızca **şimdiki duruma ve seçilen eyleme** bağlıdır; oraya nasıl gelindiği önemli değildir. Richard Bellman bu yapıyı 1957'de bu adla tanımladı. Varsayım kısıtlayıcı görünür ama çoğu zaman bir muhasebe meselesidir: geçmişten bir şey önemliyse, onu duruma dâhil edersin.

Bir de zaman ekseni var. Bir **bölüm** (episode), başlangıç durumundan bitiş durumuna kadar olan tek bir denemedir. Bir bölümde toplanan ödüllerin toplamına **getiri** (return) denir. Ama toplam alınırken ileride gelecek ödüller çoğu zaman bir çarpanla küçültülür: bu çarpana **iskonto** (discount factor) denir ve genellikle γ ile gösterilir. Sözle: bugünkü ödül, iki adım sonrakinden daha değerlidir; γ bu tercihin fiyatıdır. Sembolle, ödüller sırasıyla r₁, r₂, r₃ ise getiri G = r₁ + γ·r₂ + γ²·r₃ + … olur.

Sayıyla: bir bölümde sırasıyla 0, 0 ve 1 ödülleri toplanmış olsun. γ = 1 iken getiri 0 + 0 + 1 = 1'dir; γ = 0,9 iken 0 + 0 + 0,81; γ = 0,5 iken yalnızca 0,25. Aynı bölüm, aynı ödüller, üç farklı getiri. İskonto bir ölçüm ayrıntısı değil, hangi davranışın iyi sayılacağını belirleyen bir tercih.

## Bir sayıyla görelim

İskontonun ne satın aldığını küçük bir örnekle görelim. Bir soru sorulmuş olsun ve modelin iki seçeneği bulunsun.

Birinci seçenek, doğrudan cevap vermek. Diyelim bu yolda doğru cevap verme olasılığı 0,5; doğruysa ödül 1, değilse 0. Bu eylemin beklenen getirisi 0,5.

İkinci seçenek, önce bir ara adım yazmak. Ara adımın kendisi ödül getirmiyor — ödül yalnızca sonda veriliyor. Ama ara adım yazıldıktan sonraki durumda doğru cevap verme olasılığı 0,6'ya çıkıyor.

Şimdi hesabı iki kez yapalım.

İskonto yokken, yani γ = 1 iken, ikinci seçeneğin getirisi 0 + 1 × 0,6 = 0,6. Bu, birinci seçeneğin 0,5'inden büyük; model ara adım yazmalı.

İskonto γ = 0,8 iken ikinci seçeneğin getirisi 0 + 0,8 × 0,6 = 0,48 oluyor ve birinci seçeneğin 0,5'inin altına düşüyor. Aynı model, aynı olasılıklar, ters karar.

![İki dallı bir karar şeması. Üstte soru kutusu vardır; ondan iki ok ayrılır. Sol dal doğrudan cevap vermeyi gösterir; ucunda beklenen getirinin 0,5 olduğu yazılıdır. Sağ dal önce ara adım yazmayı gösterir; ara adım kutusunun kendisinde ödülün sıfır olduğu, ondan sonraki cevap kutusunda ise beklenen ödülün 0,6 olduğu belirtilir. Şeklin alt kısmında iki satırlık bir karşılaştırma vardır: iskonto bir iken sağ dalın getirisi 0,60 ve sol daldan büyüktür; iskonto 0,8 iken sağ dalın getirisi 0,48'e iner ve sol daldan küçük olur. Kazanan dal her iki satırda ayrı ayrı işaretlenmiştir.](assets/iskonto-karari.svg "Şekil 2 — Aynı sayılar, iki farklı iskonto")

Şekil 2'deki tersine dönüş bir oyun değil. 33\. makalede düşünme token'larının faturanın pahalı tarafına yazıldığını görmüştük; iskonto tam olarak o sabırsızlığı biçimselleştiriyor. γ küçüldükçe geç gelen ödül ucuzlar, yani uzun düşünmek pahalılaşır.

## Politika, değer ve avantaj

Üç kavram kaldı ve üçü de bu çerçevenin üzerine oturuyor.

**Politika** (policy), bir durum verildiğinde hangi eylemin seçileceğini söyleyen kuraldır. Genellikle kesin bir seçim değil, eylemler üzerinde bir olasılık dağılımıdır — 10\. makaledeki "üretim bir çekiliştir" cümlesi tam olarak budur.

**Değer işlevi** (value function), bir durumdan başlayıp o politikayı izlemeye devam edersen beklediğin getiridir. Sözle: "buradan sonrası ne kadar iyi?" Yukarıdaki örnekte, ara adım yazılmış durumun değeri 0,6 idi. Aynı sorunun eylem başına sorulmuş hâline **eylem-değeri** denir: "bu durumda şu eylemi seçersem beklediğim getiri nedir?" Örnekteki iki sayı — 0,5 ve 0,48 — birer eylem-değeriydi.

Bu iki büyüklük arasındaki bağıntı, alanın en çok kullanılan denklemidir. Sözle: bir durumun değeri, oradan alınacak ödül artı gidilen yeni durumun iskontolanmış değeridir. Sembolle, geçişin belirlenimci olduğu durumda: Q(s, a) = r + γ · V(s′); çevre zar atıyorsa aynı ifadenin beklenen değeri alınır. Sayıyla: örneğimizde r = 0, γ = 0,8, V(s′) = 0,6, dolayısıyla Q = 0,48. Bellman'ın adıyla anılan bu denklem, uzun bir bölümün hesabını tek adımlık parçalara böler.

Bu denklemin ikinci bir işlevi daha var. Değer işlevi gökten inmez; onu da öğrenmek gerekir ve öğrenmenin hedefini yine kendisi verir. Bir durumun tahmin edilen değeri ile "ödül artı bir sonraki durumun tahmin edilen değeri" birbirini tutmuyorsa aradaki fark bir hata sinyalidir ve tahmin o yöne çekilir. 2\. makaledeki kayıp fonksiyonunun buradaki karşılığı budur; fark, hedefin sabit bir etiket değil, modelin kendi bir sonraki tahmini olması.

Üçüncü kavram serinin sözlüğünde zaten var. **Avantaj** (advantage), bir eylemin değeri ile o durumun ortalama değeri arasındaki fark: "bu eylem, burada yapılacak ortalama şeyden ne kadar iyi?" 34\. makaledeki GRPO'nun yaptığı iş tam olarak buydu — bir cevabın ödülünden aynı soruya üretilen cevapların ortalamasını çıkarmak, o cevabın avantajını kestirmenin ucuz bir yoludur.

> **Kendini yokla:** Bir eylemin ödülü yüksekken avantajı neden sıfır olabilir?

Çünkü ödül mutlak, avantaj görelidir. Kolay bir soruda bütün cevaplar doğruysa hepsinin ödülü 1'dir ama hiçbiri ortalamadan iyi değildir; avantaj sıfır çıkar ve o sorudan öğrenme sinyali gelmez. 34\. makalede bu, "dört cevabın dördü de aynı ödülü alırsa sapma sıfırlanır" biçiminde karşımıza çıkmıştı. Avantaj, öğrenmenin hangi durumlardan geldiğini belirler.

## Dil modeli bu çerçeveye nasıl oturuyor

Şimdi eşlemeyi yapalım, çünkü çerçevenin dil modeline uygulanışı ilk bakışta göründüğü kadar sıradan değil.

**Durum**, o ana kadar elde olan dizidir: istem artı üretilmiş token'lar. **Eylem**, sözlükten seçilen bir sonraki token'dır — yani eylem kümesi, 4\. makaledeki sözlüğün kendisidir; on binlerce seçenek. **Geçiş**, seçilen token'ın dizinin sonuna eklenmesidir ve **belirlenimcidir**: çevrede hiçbir rastlantı yoktur, bütün belirsizlik politikanın kendi çekilişindedir. **Bölüm**, tur sonu token'ıyla biter. **Ödül** ise 34\. makaledeki gibi çoğu zaman yalnızca sonda verilir: cevap doğru mu, biçim düzgün mü.

![Soldan sağa uzanan tek sıralık bir kutu dizisi. İlk dört kutu istem token'larını temsil eder ve soluk çizilmiştir; onları dört üretilmiş token kutusu ile bir tur sonu kutusu izler; en sağda ayrı duran bir ödül kutusu vardır. Dizinin üstünde iki etiket bulunur: ilk altı kutuyu kapsayan bir köşeli ayraç durumun o ana kadarki dizi olduğunu, yedinci kutuya inen bir ok ise eylemin sonraki token olduğunu söyler. Üretilmiş kutuların her birinin altında sıfır yazar; yalnızca en sağdaki ödül kutusunun altında bir ya da sıfır yazar. Şeklin altında geçişin belirlenimci olduğu ve eylemin token'ı dizinin sonuna eklemekten ibaret olduğu, ödülün seyrek olduğu ve tek bir sayının binlerce karara dağıtılacağı, sorunun adının kredi atama olduğu yazılıdır.](assets/token-mdp.svg "Şekil 3 — Token üretimi bir karar dizisi olarak")

Şekil 3'ün altındaki cümle bu makalenin varış noktası. 34\. makalede tek bir cevabın azami uzunluğunun 32.768 token olduğunu okumuştuk. O cevap sonunda tek bir sayı alıyor. Yani otuz iki bine varan karar, tek bir skaler geri bildirimi paylaşmak zorunda.

Bu soruna alanın verdiği ad **kredi atama** (credit assignment): elde tek bir sonuç varken, o sonucu üreten kararların hangisinin işe yaradığını nasıl söyleyeceğiz? Çerçevenin bütün makinesi — değer işlevi, avantaj, iskonto — aslında bu tek soruya verilmiş cevaplardır.

Sorunun somut hâli şöyle. Bir zincir on adımdan oluşsun, üçüncü adımda hatalı bir işlem yapılsın ve bu hata dördüncü adımda tesadüfen telafi edilerek nihai cevap doğru çıksın. Ödül sondaysa, o cevabın bütün token'ları aynı olumlu işareti alır: hatalı üçüncü adımın olasılığı da artırılır. Öğrenme algoritmasının elinde o adımı ötekilerden ayıracak hiçbir bilgi yoktur, çünkü ona verilen tek sayı zincirin tamamına aittir. 34\. makalede "sonuç ödülü gerekçeyi denetlemez" derken kastedilen mekanizma budur; şimdi adı da var.

> **Kendini yokla:** Dil modelinde geçiş belirlenimciyse, yani çevre hiç zar atmıyorsa, belirsizlik nereden geliyor?

Politikanın kendisinden. 10\. makaledeki çekiliş, bu çerçevede eylem seçimidir: model her adımda sözlük üzerinde bir dağılım üretir ve oradan örnekler. Klasik pekiştirmeli öğrenmede keşif, ajanın çevreyi yoklaması demektir; burada keşif, sıcaklık ve kesme kurallarının açtığı çeşitliliktir. 36\. makaledeki oylamanın kaynağı da tam olarak buydu. Bunun bir sonucu var: eğitim ilerledikçe dağılım daralırsa keşif de daralır — 34\. makaledeki kapsama eğrilerinin erken düzleşmesi bu daralmanın ölçülmüş hâliydi.

## Politikayı oynatmanın en sade yolu

Elimizde bir politika ve bir ödül varken parametreleri hangi yöne iteceğiz?

Ronald Williams'ın 1992'de Machine Learning dergisinde yayımladığı yöntem bunun en sade biçimini verir. Sözle: bir bölümü çalıştır, getiriyi ölç, sonra seçtiğin eylemlerin olasılığını getiriyle **orantılı** olarak artır. Getiri yüksekse o kararlar daha olası, düşükse daha az olası hâle gelir. 2\. makaledeki gradyan inişi döngüsünün aynısıdır; değişen yalnızca hangi yönde itildiğidir.

Richard Sutton ve arkadaşlarının 1999'da NIPS'te sunduğu politika gradyanı teoremi bu güncellemenin biçimsel zeminini verir ve rahatlatıcı bir şey söyler: beklenen getirinin politika parametrelerine göre türevi, çevrenin durum dağılımının türevi hiç hesaplanmadan yazılabiliyor. Yani çevreyi modellemeden politikayı iyileştirebilirsin.

Yöntemin bilinen hastalığı ise yüksek oynaklıktır. Getiri bir çekilişin sonucudur; aynı politika bir denemede 1, öbüründe 0 alabilir ve güncelleme bu gürültüyü izler. Aynı çerçevenin klasik bir sonucu çareyi veriyor: getiriden, seçilen eyleme bağlı olmayan bir **taban** çıkarmak güncellemenin beklenen yönünü değiştirmez, ama oynaklığı düşürür. Taban olarak durumun değeri seçildiğinde geriye kalan şey avantajdır — yani avantaj, matematiksel bir süs değil, oynaklık düşürmenin doğal sonucudur.

John Schulman ve arkadaşlarının ICLR 2016'da sunduğu genelleştirilmiş avantaj kestirimi bu fikrin ayarlanabilir hâlini verir: avantajı kaç adım ileriye bakarak kestirdiğine göre yanlılık ile oynaklık arasında bir kadran döndürürsün.

Geriye tek soru kalıyor: adım ne kadar büyük olmalı? Aynı ekibin ICML 2015'te sunduğu güven bölgeli politika optimizasyonu bunu bir kısıt olarak yazar — yeni politika, eskisinden 13\. makaledeki KL ölçüsüyle belirli bir mesafeden fazla uzaklaşmasın. Pratikte yaygınlaşan basitleştirilmiş sürüm, bu kısıtı bir kırpma terimine indirger; adı yakınsal politika optimizasyonu (proximal policy optimization, PPO) ve tanıtıldığı 2017 tarihli çalışma **hakemli değildir**. 13\. makalede adını vermeden kullandığımız kırpma terimi buydu; 34\. makaledeki GRPO da aynı aileden, yalnızca tabanı ayrı bir değer modeliyle değil grubun ortalamasıyla kestiriyor.

## Çerçeve nereye kadar oturuyor

Bu çerçevenin gücünü görmek için dil modellerinden çıkmak gerekiyor. Volodymyr Mnih ve arkadaşlarının Nature'da 2015'te yayımladığı çalışma, girdisi yalnızca ekran pikselleri ve puan olan tek bir sistemin — tek algoritma, tek mimari, tek hiperparametre kümesi — kırk dokuz ayrı Atari oyununu öğrenebildiğini gösterdi. Oyunların yarısından fazlasında, yani yirmi dokuzunda, profesyonel bir insan test oyuncusunun puanının yüzde 75'inden fazlasına ulaştı. Kullanılan iskonto 0,99'du: neredeyse hiç sabırsız olmayan bir ajan.

Ama dürüst olmak gerekirse, dil modeli bu çerçevenin oldukça yoksul bir örneğidir ve farkları saymak önemli.

Çevre belirlenimcidir; token'ı diziye ekleyen bir işlemden başka bir şey yoktur. Ödül seyrektir ve neredeyse her zaman terminaldir. Bölümler kısadır — tek bir cevap. Klasik anlamda bir keşif problemi de yoktur: ajan yeni bir dünyayı yoklamaz, kendi dağılımından örnek çeker. Üstelik 13\. makaledeki KL cezası çerçevenin bir parçası değil, bizim eklediğimiz bir kısıttır; amaç en çok ödülü toplamak değil, başlangıç modelinden fazla uzaklaşmadan ödülü artırmaktır.

İskonto da pratikte çoğu zaman bir yere kaybolur. Cevabın içinde ara ödül olmadığından ve bölüm tek bir cevaptan ibaret olduğundan, bu düzenlerde γ genellikle 1 alınır; yani makalenin başındaki tersine dönüş, eğitim hedefinin içinde değil **faturada** yaşanır. Uzun düşünmenin bedeli 33\. makaledeki muhasebeden çıkar, ödül işlevinden değil. Uzunluğu doğrudan cezalandırmak isteyen düzenler bunu ayrı bir ödül bileşeni olarak yazmak zorunda kalır — ve 34\. makalede gördüğümüz gibi her ek bileşenin bir bedeli oluyor.

Bir eksiltme daha var ve pratikte belirleyici. Klasik düzende değer işlevini kestiren ayrı bir model eğitilir. Bu ucuz değildir: politikayla karşılaştırılabilir boyutta ikinci bir ağ demektir ve 19\. makaledeki bellek muhasebesi burada da geçerlidir — ağırlıklar, gradyanlar ve optimizatör durumu bir kez daha ödenir. 34\. makaledeki GRPO tabanı grubun ortalamasından kestirerek bu modeli tamamen atar. Yani alanın kurduğu makinenin bir bölümü, dil modellerinde kullanılmadan bırakılmıştır.

## Çerçevenin disiplini

**Durum, karar için gereken her şeyi taşımalıdır.** Markov varsayımı bir kısıt değil, durumu doğru tanımlama sorumluluğudur.

**Ödül ne isterseniz onu değil, ne yazarsanız onu verir.** 13\. makaledeki aşırı optimizasyon bu cümlenin sonucudur.

**İskonto bir tercih beyanıdır.** Geç gelen ödülü ne kadar ucuzlattığınız, ne kadar uzun düşünüleceğini belirler.

**Değer geleceğe, ödül şimdiye bakar.** İkisini karıştırmak, iyi bir adımı kötü bir sonuç yüzünden cezalandırmaya yol açar.

**Avantaj, öğrenmenin nereden geldiğini söyler.** Bütün eylemler eşit iyiyse sinyal sıfırdır.

**Bu "değer", dikkat üçlüsündeki değer değildir.** 6\. makaledeki değer bir içerik vektörü, buradaki değer beklenen bir getiridir.

### Sırada ne var

Bu makalede çerçeveyi kurduk ve tek bir soruyu açıkta bıraktık: sondaki tek sayı, binlerce karara nasıl dağıtılır?

34\. makalede bu sorunun bir yüzünü görmüştük — sonuç ödülü gerekçeyi denetlemiyordu, doğru cevaba yanlış yoldan varan çözüm de tam puan alıyordu. Bu makalenin sözlüğüyle söylersek: ödül yalnızca sonda verildiğinde, kredi atama işini bütünüyle öğrenme algoritmasına bırakmış oluyoruz.

Peki ödülü sonda değil, her adımda versek? Sonraki makale bunu ele alıyor: adımları kim etiketleyecek, bu etiketler ne kadara mal olacak, ve adım adım verilen ödül gerçekten daha iyi akıl yürütme mi üretiyor?

## Kaynakça

- Bellman, R. (1957). *A Markovian Decision Process*. Journal of Mathematics and Mechanics, 6, s. 679–684. [Bağlantı](http://www.iumj.indiana.edu/IUMJ/FULLTEXT/1957/6/56038)
- Sutton, R. S. & Barto, A. G. (2018). *Reinforcement Learning: An Introduction* (2. baskı). MIT Press. [Bağlantı](http://incompleteideas.net/book/the-book-2nd.html)
- Williams, R. J. (1992). *Simple Statistical Gradient-Following Algorithms for Connectionist Reinforcement Learning*. Machine Learning, 8, s. 229–256. [Bağlantı](https://doi.org/10.1007/BF00992696)
- Sutton, R. S., McAllester, D., Singh, S. & Mansour, Y. (1999). *Policy Gradient Methods for Reinforcement Learning with Function Approximation*. NIPS 1999. [Bağlantı](https://papers.nips.cc/paper_files/paper/1999/hash/464d828b85b0bed98e80ade0a5c43b0f-Abstract.html)
- Mnih, V., Kavukcuoglu, K., Silver, D., Rusu, A. A., Veness, J., Bellemare, M. G., Graves, A., Riedmiller, M., Fidjeland, A. K., Ostrovski, G., Petersen, S., Beattie, C., Sadik, A., Antonoglou, I., King, H., Kumaran, D., Wierstra, D., Legg, S. & Hassabis, D. (2015). *Human-level control through deep reinforcement learning*. Nature, 518, s. 529–533. [Bağlantı](https://www.nature.com/articles/nature14236)
- Schulman, J., Levine, S., Moritz, P., Jordan, M. I. & Abbeel, P. (2015). *Trust Region Policy Optimization*. ICML 2015, PMLR 37. [Bağlantı](https://proceedings.mlr.press/v37/schulman15.html)
- Schulman, J., Moritz, P., Levine, S., Jordan, M. I. & Abbeel, P. (2016). *High-Dimensional Continuous Control Using Generalized Advantage Estimation*. ICLR 2016. [Bağlantı](https://arxiv.org/abs/1506.02438)
- Schulman, J., Wolski, F., Dhariwal, P., Radford, A. & Klimov, O. (2017). *Proximal Policy Optimization Algorithms*. arXiv (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1707.06347)
