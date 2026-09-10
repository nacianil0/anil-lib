---
article_id: article_5ccf1449-97fe-45dd-a94e-22955b50f637
title: "Olasılığın Dili: Dağılımlar, Beklenti ve En Büyük Olabilirlik"
slug: olasiligin-dili-dagilimlar-beklenti-ve-en-buyuk-olabilirlik
category: foundations
level: advanced
reading_order: 93
summary: "5'ten beri modelin çıktısına 'olasılık dağılımı' diyoruz ve 10'dan beri ondan token çekiyoruz; bu makale o nesneyi biçimsel olarak kuruyor. Beklenti, seride onlarca kez 'beklenen şu' diye geçen kelimenin tek tanımıdır ve ortalama kayıptan kalibrasyon hatasına kadar hepsi odur. Kaybın neden başka bir şey değil de tam olarak o olduğunun cevabı en büyük olabilirlik ilkesinde: on atışta yedi tura gören bir modelin 0,7'yi seçmesi bir tercih değil, bir türev sonucudur. Softmax'ın üstel biçimi de keyfî değil — kısıtları sağlayan en az varsayımlı dağılım ailesinin biçimi. Kapanışta iki kestirim yan yana duruyor: 33'ün 1 eksi (1 eksi p) üzeri k hesabı ile Codex'in yansız tahmincisi aynı örneklemde 0,6513 ile 0,6602 veriyor ve fark tanımın kendisinden geliyor."
tags:
  - olasilik-dagilimi
  - beklenti
  - en-buyuk-olabilirlik
  - softmax
  - yansiz-tahminci
content_hash: sha256:6f30a14c1b18c01febdbe412192a3320f3b2a768e0212a5bfcb0c3a4b07a993a
classification_version: 1
classification_batch: 22
---
## Vektörden dağılıma

92\. makalede bir matrisin içindeki ikinci sayıyı — kaç bağımsız yönde iş yaptığını — kurduk. Modelin son matris çarpımı da bir vektör üretir: sözlükteki her token için bir sayı. 7\. makaleden beri bu ham skorlara logit diyoruz. Ama modelin dışarıya verdiği şey logit değil; softmax'tan geçmiş, toplamı 1 olan bir liste.

O listenin adını 5\. makaleden beri kullanıyoruz: olasılık dağılımı. 10\. makalede ondan token çektik, 16 ve 65'te ne kadar güvenilir olduğunu tarttık, 33'te "en az bir denemede başarı" diye okuduk. Hepsinde nesne aynıydı ve hiçbirinde biçimsel olarak tanımlanmadı. Bu makalenin işi tek cümle: **modelin çıktısının hangi matematiksel nesne olduğunu kurmak ve eğitimin azalttığı kaybın neden başka bir şey değil de tam olarak o olduğunu göstermek.**

Tanım sade. Sonlu bir sonuç kümesi al — bir dil modelinde bu sözlüktür. Bir olasılık dağılımı, bu kümedeki her sonuca sıfırdan küçük olmayan bir sayı atayan ve atadığı sayıların toplamı tam olarak 1 olan bir eşlemedir. İki koşul bu kadar. Softmax'ın yaptığı iş de bu iki koşulu sağlamaktan ibarettir.

Ama iki koşul, dağılımı bir **sayı listesi** olmaktan çıkarır ve üzerine soru sorulabilir bir nesne yapar. Üç soru bu makalenin geri kalanını taşıyacak: ortalama olarak ne bekleriz, hangi parametreler veriyi en olası kılar, ve dağılımın verdiği sayılar gerçek sıklıklara ne kadar uyar?

## Beklenti: seride hep kullandığımız kelimenin tanımı

37\. makalede "beklenen getiri" dedik, 45'te "beklenen maliyet", 65'te "beklenen kalibrasyon hatası", 60'ta ajanın "beklenen çağrı sayısı". Aynı kelime, tek bir işlem.

Bir dağılımın **beklentisi** (expectation), her sonucun değerinin o sonucun olasılığıyla çarpılıp toplanmasıdır. Yani ağırlıklı ortalama — ağırlıklar olasılıklar. Christopher Bishop'un ders kitabı bunu 1.2.2 bölümünde (s. 19) tanımlar.

Somut yapalım. Modele yirmi soru soralım; ilk onunda cevabına 0,9 olasılık versin, sonraki onunda 0,6. Doğru sayısının beklentisi 10 çarpı 0,9 artı 10 çarpı 0,6 eşittir 15. Gerçekte 12 doğru saydıysan, model olduğundan üç cevap fazla emin demektir.

Bu küçük hesabın iki özelliğine dikkat et. Birincisi, beklenti gerçekleşen bir sayı değil; hiçbir koşuda tam 15 çıkmayabilir. İkincisi, beklenti ile gerçekleşenin karşılaştırılması **kalibrasyonun tanımının ta kendisi** — 16\. makalede adını koyup 65'te ölçtüğümüz şeyin biçimsel hâli budur. Chuan Guo ve arkadaşlarının ICML 2017'de sunduğu ve 65'te sayılarını kullandığımız çalışma, beklenen kalibrasyon hatasını tam olarak böyle tanımlar: cevapları güven düzeyine göre öbeklere ayır, her öbekte modelin ortalama güveni ile gerçekleşen doğruluk oranı arasındaki farkı al, öbek büyüklüğüne göre ağırlıklandırıp topla. Yani ölçünün adındaki "beklenen" sözcüğü mecaz değil, işlemin kendisi.

![Aynı üç sonuçlu dağılımın üç okunuşu. Sol panelde dağılımın kendisi: üç sonuç ve olasılıkları 0,659, 0,242 ve 0,099; altında toplamın 1 olduğu yazılıdır. Orta panelde beklenti: her sonucun değeri olasılığıyla çarpılıp toplanır; değerler 1, 0 ve 0 alınırsa beklenti 0,659 çıkar; altında beklentinin gerçekleşen bir sayı değil, bir ağırlıklı ortalama olduğu yazılıdır. Sağ panelde tek çekiliş: dağılımdan bir örnek alınır ve sonuç üç seçenekten biridir; altında tek çekilişin dağılım hakkında neredeyse hiçbir şey söylemediği, ancak çok sayıda çekilişin ortalamasının beklentiye yaklaştığı yazılıdır. En altta bir kayıt: aynı nesne üç ayrı soruya cevap verir ve bu üç soru birbirinin yerine kullanılamaz.](assets/dagilimin-uc-okunusu.svg "Şekil 1 — Dağılım, beklenti, çekiliş")

Şekil 1 üç okumayı yan yana koyuyor. Karıştırılması en kolay çift sağdaki ikisi: bir çekiliş dağılım hakkında neredeyse hiçbir şey söylemez, ama çok sayıda çekilişin ortalaması beklentiye yaklaşır. Bu ayrım 36\. makaledeki çoğunluk oyunun neden işe yaradığını da açıklar — orada yapılan şey, dağılımdan tekrar tekrar çekip ortalamaya yaklaşmaktı.

## Kaybın nereden geldiği

2\. makalede kayıp fonksiyonunu bir tasarım tercihi gibi sunmuştuk: hatayı ölçen bir sayı seçiyoruz. Şimdi daha iyisini söyleyebiliriz — sonraki token tahmininde kullandığımız kayıp bir tercih değil, bir ilkenin sonucu.

İlkenin adı **en büyük olabilirlik** (maximum likelihood) ve kurucusu Ronald Fisher'ın 1922 tarihli çalışmasıdır. Kural şu: elindeki veriyi en olası kılan parametreleri seç.

On atışta yedi tura gelen bir parayla yapalım. Turanın olasılığına p diyelim. Bu diziyi görme olasılığı p üzeri 7 çarpı (1 eksi p) üzeri 3. Birkaç değer deneyelim: p 0,5 iken 0,000977, p 0,6 iken 0,001792, p 0,7 iken 0,002224, p 0,8 iken 0,001678. En büyüğü 0,7'de.

Tesadüf değil. Çarpımın logaritmasını al: 7 çarpı log p artı 3 çarpı log (1 eksi p). Türevi sıfıra eşitle: 7 bölü p eşittir 3 bölü (1 eksi p), yani 7 eksi 7p eşittir 3p, yani p eşittir 0,7. Sezginin verdiği "gözlenen oran" ile ilkenin verdiği cevap aynı çıkıyor — ve ikisinin aynı çıkması bir teoremdir, bir varsayım değil.

Logaritmanın burada oynadığı rol küçük değil. Çarpımı toplama çevirir; böylece milyonlarca token'lık bir dizinin olabilirliği, sayısal olarak sıfıra çökmeden hesaplanabilir hâle gelir. Modelin eğitiminde en büyük olabilirliği aramak, negatif logaritmasını en küçültmekle aynı şeydir — ve 2\. makaleden beri "kayıp" dediğimiz sayı tam olarak odur.

İlkenin kusurunu da aynı örnekte görebiliriz ve bu kusur dil modellerinin tarihinde merkezî bir yer tutar. Üç atış yapıp üçünde de tura gelseydi, en büyük olabilirlik p'yi 1 seçerdi: gördüğü veriyi en olası kılan değer bu. Ama o model artık yazının olasılığını **sıfır** sayar ve tek bir yazı gördüğünde bütün dizinin olabilirliği sıfıra düşer. Dil modellemesinde bu tam olarak "eğitim derleminde hiç geçmemiş bir ikiliyi görme" durumudur; Dan Jurafsky ve James Martin'in ders kitabı, sayım tabanlı modellerde bu yüzden kütlenin bir kısmının görülmemiş olaylara ayrılması gerektiğini 3.6 bölümünde kurar. 2\. makaledeki aşırı öğrenme ile buradaki kusur aynı ailedendir: sonlu veriyi en iyi açıklayan parametre, veriyi üreten süreci en iyi açıklayan parametre değildir.

> **Kendini yokla:** On atışta yedi tura gördükten sonra p'yi 0,7 seçmek neden bir tercih değil?

Çünkü seçim, "veriyi en olası kıl" kuralının tek çözümü. Kuralı yazıp türevini alınca 0,7 dışında hiçbir değer denklemi sağlamıyor. Farklı bir sayı seçmek, farklı bir ilke benimsemek demektir — örneğin önsel bir inanç eklemek ya da kütlenin bir kısmını görülmemiş sonuçlara ayırmak.

## Softmax neden üstel bir işlev

Bir soru daha var ve 6\. makaleden beri askıda: skorları toplamı 1 olan sayılara çevirmenin sonsuz yolu varken neden üstel alıp bölüyoruz?

Cevap olasılık kuramının en zarif sonuçlarından birinde. Elinde veriden gelen birtakım kısıtlar varsa — "şu özellik ortalamada şu değeri almalı" gibi — ve bu kısıtları sağlayan sonsuz dağılım varsa, aralarından **en az ek varsayım yapanı** seçmek makul bir ilkedir. O dağılımın biçimi her zaman aynı çıkar: özelliklerin ağırlıklı toplamının üsteli, bölü bir normalleştirme sabiti. Adam Berger, Vincent Della Pietra ve Stephen Della Pietra'nın Computational Linguistics'te yayımladığı 1996 tarihli çalışma bu aileyi dil işleme problemlerine taşıyan klasik metindir.

Yani softmax uydurulmuş bir kısayol değil; kısıtları sağlayan en az varsayımlı ailenin biçimi. Logit'ler o ailenin doğal parametreleri, sıcaklık da aynı parametreleri topluca ölçekleyen tek sayı.

Bu seçimin ikinci ve daha somut bir armağanı var. Softmax ile en büyük olabilirlik kaybı bir arada kullanıldığında, kaybın logit'lere göre türevi olabilecek en sade biçime iner: **tahmin edilen olasılık eksi gözlenen değer.** Bishop'un kitabı bunu çok sınıflı durum için 4.3.4 bölümünde (s. 209, denklem 4.109) türetir. Örneğimizde doğru token birinciyse, birinci logit'in gradyanı 0,659 eksi 1 eşittir −0,341; ikincininki 0,242 eksi 0 eşittir 0,242; üçüncününki 0,099. Üç sayının toplamı sıfır — normalleştirme kısıtının doğrudan sonucu.

2\. makalede gradyan inişini "hatayı azaltacak yönde it" diye kurmuştuk. Şimdi "hata" sözcüğünün burada ne olduğunu tam olarak söyleyebiliriz: modelin verdiği olasılık ile gerçekte olanın farkı. Kaybın seçimi, gradyanın biçimini de belirliyor.

Aritmetiği bir kez sonuna kadar götürelim. Üç aday ve logit'leri 2,0 · 1,0 · 0,1 olsun. Üstelleri: 7,389 · 2,718 · 1,105. Toplamları 11,213. Her birini toplama böl: 0,659 · 0,242 · 0,099. Toplam 1.

![Softmax'ın üç adımını sayılarla gösteren bir tablo. Birinci satır logit'ler: 2,0 ve 1,0 ve 0,1. İkinci satır üstelleri: 7,389 ve 2,718 ve 1,105; sağda toplamları 11,213 yazılıdır. Üçüncü satır toplama bölünmüş sonuçlar: 0,659 ve 0,242 ve 0,099; sağda toplamın 1 olduğu yazılıdır. Altta iki karşılaştırma satırı vardır: sıcaklık 0,5 iken aynı üç adayın payları 0,864 ve 0,117 ve 0,019; sıcaklık 2 iken 0,502 ve 0,304 ve 0,194. En altta bir kayıt: sıcaklık logit'leri kendisine böler, yani aynı ailenin doğal parametrelerini topluca ölçekler; üstel biçim kısıtları sağlayan en az varsayımlı ailenin biçimidir ve buradaki sayılar üç logit'ten elle hesaplanmıştır.](assets/softmaxin-uc-adimi.svg "Şekil 2 — Üstelini al, topla, böl")

Şekil 2 aynı üç adayı iki ayrı sıcaklıkta da gösteriyor. 10\. makalede sıcaklığın kuyruğu nasıl değiştirdiğini görmüştük; buradaki katman farklı — sıcaklık dağılımın biçimini dışarıdan bozan bir müdahale değil, aynı ailenin içinde kalan bir parametre değişimi. Bu okuma 65\. makaledeki sıcaklık ölçeklemenin neden tek parametreyle kalibrasyonu düzeltebildiğini de açıklıyor: müdahale dağılımın ailesini değiştirmiyor, yalnızca doğal parametrelerin ölçeğini düzeltiyor.

Ailenin bir de fazlalığı var ve pratikte sık karşılaşılır. Bütün logit'lere aynı sabiti eklersen sonuç değişmez: üsteller ortak bir çarpan kazanır, o çarpan bölmede sadeleşir. Örneğimizde 2,0 · 1,0 · 0,1 yerine 12,0 · 11,0 · 10,1 yazsan aynı üç payı bulursun. Bunun iki sonucu var. Birincisi, tek bir logit'in mutlak değeri hiçbir şey söylemez; anlamlı olan logit'ler arasındaki farklardır. İkincisi, sayısal kararlılık için gerçeklemeler önce en büyük logit'i hepsinden çıkarır — böylece üstel alınırken taşma olmaz ve sonuç değişmez. Aynı fazlalık 65\. makaledeki sıcaklık ölçeklemenin neden **tek** parametreyle çalıştığını da açıklıyor: ölçek bir serbestlik derecesidir, kaydırma değil.

## Dağılımı okumanın iki ayrı yolu

Elinde bir dağılım varken sorabileceğin iki ayrı soru var ve ikisi farklı cevap verir: "en olası sonuç hangisi" ve "bu dağılımdan çekilen tipik bir sonuç neye benzer".

10\. makalede Ari Holtzman ve arkadaşlarının ölçümünü görmüştük: en olası devamı seçmek metni tekrara sokuyor, insan metninin perplexity'si ise üretilen metninkinden kat kat yüksek. Şimdi bunun neden şaşırtıcı olmadığını söyleyebiliriz. Bir dağılımın **modu** — en yüksek olasılıklı sonucu — o dağılımdan çekilen tipik bir örnek değildir; çok sonuçlu dağılımlarda modun olasılığı çok küçük olabilir ve tipik örnekler modun etrafında değil, kütlenin yayıldığı yerde bulunur. Doğal dil de kütlesi geniş bir dağılımdır.

Sayıyla görmek kolay. Yirmi token'lık bir dizi üretirken her adımda en olası adayın payının 0,4 olduğunu varsayalım. En olası dizinin olasılığı 0,4 üzeri 20, yani yaklaşık 1,1 çarpı 10 üzeri eksi 8. Bütün dizilerin olasılıkları toplamı 1 olduğuna göre, "en olası dizi" bu kütlenin yüz milyonda birinden azını taşıyor. Yani "en olası"yı seçmek, kütlenin neredeyse tamamını görmezden gelmek demek. (Bu küçük hesap açıklama amaçlı; gerçek bir modelde adım olasılıkları eşit değildir.)

> **Kendini yokla:** En olası diziyi seçmek neden "modelin en iyi bildiği cevabı seçmek" ile aynı şey değil?

Çünkü model bir dizi hakkında değil, her adımda bir dağılım hakkında bilgi veriyor. Adım adım en yükseği seçmek, dizinin bütünü hakkında bir iddia taşımaz; yalnızca yerel bir tercihin peş peşe yirmi kez uygulanmış hâlidir. Modelin "bildiği" şey dağılımın kendisidir ve o bilgi, tek bir dizi seçilerek değil, dağılımdan alınan örneklerle okunur.

Bu gözlem bir üretim kuralına da dönüştü. Clara Meister ve arkadaşlarının Transactions of the ACL'de yayımladığı çalışma, insan metnini "her kelimenin taşıdığı bilgi miktarının beklenen değere yakın olduğu" diziler olarak tanımlıyor ve üretimi bu ölçüte göre kısıtlıyor. Ölçünün adını bir sonraki makalede koyacağız; burada önemli olan kuruluşu: kural "en olasıyı seç" değil, "beklenen davranıştan sapmayanı seç".

Kesme yöntemleri — 10\. makaledeki top-k ve çekirdek örnekleme — bu yüzden basit bir "gürültü temizliği" değil: dağılımı değiştirip yeni bir dağılım tanımlıyorlar. John Hewitt, Christopher Manning ve Percy Liang'ın EMNLP 2022'de yayımladığı çalışma bunu açıkça çerçeveliyor ve kesmeyi, eğitimin dağılıma eklediği yayılmayı geri alma işlemi olarak okuyor.

Ölçümün buradaki uyarısı ölçülü olmayı gerektiriyor. Matthew Renze ve Erhan Güven'in EMNLP 2024 bulgularında yayımlanan çalışması dokuz modelde ve beş ayrı istem tekniğinde sıcaklığı 0,0'dan 1,6'ya taşıyor ve şunu buluyor: 0,0 ile 1,0 arasındaki değişimin çoktan seçmeli problem çözme başarısına **istatistiksel olarak anlamlı bir etkisi yok**. Yani dağılımın biçimini değiştirmek her ölçütte fark yaratmıyor; hangi ölçüde fark yarattığı ayrıca sorulmalı.

## Kestirim ile gerçeğin arası

Son bir ayrım kaldı ve bu makalenin en pratik kazancı orada: elindeki sayı bir **dağılım** mı, yoksa dağılımdan yapılmış sonlu bir örneklemden hesaplanmış bir **kestirim** mi?

33\. makalede kapsamayı şöyle kurmuştuk: modelin bir soruyu tek denemede çözme olasılığı p ise, k denemede en az bir kez çözme olasılığı 1 eksi (1 eksi p) üzeri k. p 0,1 ve k 10 için bu 0,6513. Hesap doğru — ama p'yi bilmiyorsun. Elinde n deneme ve c başarı var; p'nin yerine c bölü n koyuyorsun.

Mark Chen ve arkadaşlarının Codex çalışması bu adımın sessiz bir bedeli olduğunu gösteriyor: c bölü n'yi formüle koymak **yanlı** bir tahminci veriyor. Yansız olanı doğrudan sayma üzerinden kurulur — n denemeden k tanesini seçmenin bütün yolları içinde, hiç doğru içermeyenlerin oranını 1'den çıkar. Çalışma 200 deneme üretip k'yı 100'e kadar değiştiriyor.

Sayıyı görelim: n 200, başarı sayısı c 20, yani gözlenen oran 0,1. k 10 için yanlı hesap 0,6513, yansız tahminci 0,6602 veriyor. Fark küçük ama sistematik ve k büyüdükçe değil, küçük c değerlerinde belirginleşir.

![İki tahmincinin aynı örneklemde verdiği sayıları karşılaştıran bir tablo. Üstte kurulum yazılıdır: toplam deneme sayısı 200, doğru sayısı 20, yani gözlenen oran 0,1. Sütunlar deneme sayısı k, yerine koyma hesabı ve yansız tahminci. Satırlar: k eşittir 1 için 0,1000 ve 0,1000; k eşittir 5 için 0,4095 ve 0,4128; k eşittir 10 için 0,6513 ve 0,6602; k eşittir 50 için 0,9948 ve 0,9977. Altta iki kayıt vardır: birincisi, iki sütun k eşittir 1'de çakışır ve arada ayrışır; ikincisi, fark yuvarlama değil tanım farkıdır, çünkü yerine koyma hesabı gözlenen oranı gerçek olasılık sayar. En altta sayıların kaynağın kurulumundan elle hesaplandığı yazılıdır.](assets/iki-tahminci.svg "Şekil 3 — Aynı örneklem, iki ayrı sayı")

Şekil 3 dört farklı k için iki sütunu yan yana koyuyor; sayılar çalışmanın verdiği tahminci tanımından elle hesaplandı. Buradaki ders 33\. makalenin hesabını geçersiz kılmıyor: orada p **verilmiş** bir olasılıktı ve formül doğrudur. Geçersiz olan, ölçülmüş bir orandan aynı formülle kapsama raporlamak.

Ayrımın adı **yanlılık** (bias): bir tahminci, aynı deney sonsuz kez tekrarlansaydı ortalamada doğru değeri veriyorsa yansızdır. Bu, aynı İngilizce sözcüğün seride üçüncü kullanımı ve üçü karıştırılmamalı: 3\. makalede **sapma**, bir nöronun sabit terimiydi; 45 ve 73'te **yanlılık**, hakem modelin konum ya da uzunluk tercihiydi; burada ise bir tahmincinin ortalamada kaçırdığı paydır. Ortak yan yalnızca sözcük: üçü de "sistematik bir kayma" anlatır, ama nesneleri ayrıdır. Yanlılık, tahmincinin oynaklığından ayrı bir kusurdur — daha çok örnek almak oynaklığı düşürür ama yanlılığı kendiliğinden gidermez. Bu ayrım bir sonraki fazın konusu; burada kaydedilmesi gereken şey, "0,65" ile "0,66" arasındaki farkın yuvarlama olmadığı. Bir sayının nereden geldiğini bilmeden, iki modelin kapsama puanı karşılaştırılamaz.

Bu makalede kurduğumuz üç aracın ortak bir kullanımı var ve serinin geri kalanında hep işine yarayacak. Bir sayıyla karşılaştığında üç soruyu sırayla sor: bu bir dağılım mı, bir beklenti mi, yoksa sonlu bir örneklemden hesaplanmış bir kestirim mi? Üçü farklı şeylerdir ve üçü farklı biçimde yanılır. Dağılım yanlış olabilir, beklenti tek bir koşuda gerçekleşmeyebilir, kestirim ise doğru dağılımdan bile sistematik biçimde sapabilir.

### Sırada ne var

Artık kaybın nereden geldiğini biliyoruz: veriyi en olası kılan parametreleri arıyoruz ve bunun negatif logaritmasını en küçültüyoruz. Ama o sayının bir **birimi** var — 9\. makalede kayıp eğrilerini nat/token cinsinden okumuştuk — ve birimi olan her büyüklük bir şeyi sayar. Bir sonraki makale ne saydığını gösteriyor: kayıp, modelin dağılımına göre doğru token'ı kodlamanın ortalama maliyetidir; perplexity onun üsteli; ve aradaki fark, verinin kendi belirsizliği ile modelin fazladan ödediği ceza olarak tam olarak ikiye ayrılıyor.

## Kaynakça

- Fisher, R. A. (1922). *On the Mathematical Foundations of Theoretical Statistics*. Philosophical Transactions of the Royal Society A 222, 309–368. [Bağlantı](https://doi.org/10.1098/rsta.1922.0009)
- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*. Springer; olasılık kuramı 1.2 (s. 12–30), beklenti ve kovaryans 1.2.2 (s. 19), ikili değişkenler ve en büyük olabilirlik 2.1 (s. 68–71). [Bağlantı](https://www.microsoft.com/en-us/research/publication/pattern-recognition-machine-learning/)
- Jurafsky, D. & Martin, J. H. (2025). *N-gram Language Models*, bölüm 3 (perplexity 3.5, yumuşatma 3.6). *Speech and Language Processing*, 3. baskı taslağı. [Bağlantı](https://web.stanford.edu/~jurafsky/slp3/)
- Berger, A. L., Della Pietra, S. A. & Della Pietra, V. J. (1996). *A Maximum Entropy Approach to Natural Language Processing*. Computational Linguistics 22(1), 39–71. [Bağlantı](https://aclanthology.org/J96-1002/)
- Holtzman, A., Buys, J., Du, L., Forbes, M. & Choi, Y. (2020). *The Curious Case of Neural Text Degeneration*. ICLR 2020. [Bağlantı](https://openreview.net/forum?id=rygGQyrFvH)
- Hewitt, J., Manning, C. D. & Liang, P. (2022). *Truncation Sampling as Language Model Desmoothing*. EMNLP 2022 Findings. [Bağlantı](https://aclanthology.org/2022.findings-emnlp.249/)
- Meister, C., Pimentel, T., Wiher, G. & Cotterell, R. (2023). *Locally Typical Sampling*. Transactions of the ACL 11, 102–121. [Bağlantı](https://doi.org/10.1162/tacl_a_00536)
- Renze, M. & Guven, E. (2024). *The Effect of Sampling Temperature on Problem Solving in Large Language Models*. EMNLP 2024 Findings. [Bağlantı](https://aclanthology.org/2024.findings-emnlp.432/)
- Chen, M., Tworek, J., Jun, H., Yuan, Q., Pinto, H. P. de O. ve ark. (2021). *Evaluating Large Language Models Trained on Code*. OpenAI teknik raporu (hakemli değil). [Bağlantı](https://arxiv.org/abs/2107.03374)
- Guo, C., Pleiss, G., Sun, Y. & Weinberger, K. Q. (2017). *On Calibration of Modern Neural Networks*. ICML 2017. [Bağlantı](https://proceedings.mlr.press/v70/guo17a.html)
