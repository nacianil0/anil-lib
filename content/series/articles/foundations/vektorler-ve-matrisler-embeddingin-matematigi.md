---
article_id: article_db2ab73f-494b-438c-abe1-a116931e1cf8
title: "Vektörler ve Matrisler: Embedding'in Matematiği"
slug: vektorler-ve-matrisler-embeddingin-matematigi
category: foundations
level: advanced
reading_order: 91
summary: "4'te bir kelimeyi sayı listesine çevirmiştik; bu makale o listenin hangi matematiksel nesne olduğunu kuruyor. Bir vektör uzayını uzay yapan şey iki işlemdir ve 'kral eksi erkek artı kadın' sorusu ancak o iki işlem tanımlıysa sorulabilir. Matris, bir doğrusal dönüşümün bir tabanda yazılmış hâlidir ve sütunları taban vektörlerinin nereye gittiğini söyler; embedding tablosundan satır okumak, biçimsel olarak tek-sıcak bir vektörle matris çarpmaktır. Benzerliğin üç cetveli — nokta çarpım, kosinüs, Öklit uzaklığı — aynı üçlü üzerinde birbirine zıt sıralamalar verebiliyor ve bu bir kusur değil, ölçünün tanımı. Uzayın gerçek biçimi resimlerdeki gibi değil: GPT-2'nin son katmanında rastgele iki kelime neredeyse tam kosinüs benzerliği veriyor, XLNet'te tek bir boyut beklenen benzerliğin yüzde 99'undan fazlasını taşıyor. Kapanışta aynı uzayın ikinci okunuşu var: skip-gram'ın öğrendiği şeyin bir matris ayrıştırması olduğu."
tags:
  - vektor-uzayi
  - dogrusal-donusum
  - kosinus-benzerligi
  - esyonsuzluk
  - matris-ayristirmasi
content_hash: sha256:d9e9e929c18b4abbc833ae1a7b053efbee565a7b49c3ac59ebb7eafbbc60638f
classification_version: 1
classification_batch: 22
---
## Sayı listesi mi, uzaydaki yön mü

90\. makalede serinin dokuzuncu fazını kapatırken bir borç bıraktık: ölçümleri okumanın altında, adını koyduğumuz ama biçimsel olarak hiç kurmadığımız bir katman var. Bu makaleyle o katmana iniyoruz ve ilk soru en baştaki soruyla aynı.

4\. makalede "dili sayılara çevirmek" derken şunu yapmıştık: her token'a öğrenilen bir sayı listesi bağladık, bu listeye embedding dedik ve benzer bağlamlarda geçen kelimelerin listelerinin birbirine benzediğini gördük. Orada uzayda "yön" ve "yakınlık" kelimelerini rahatça kullandık. Ama bir sayı listesinin uzayda bir yön olması kendiliğinden doğru değildir; bir liste, üzerinde hangi işlemler tanımlıysa o kadar geometriktir. Bu makalenin işi tek cümle: **bir embedding'in hangi matematiksel nesne olduğunu ve o nesnenin hangi soruları sormaya izin verdiğini kurmak.**

Sıra şu: önce bir uzayı uzay yapan iki işlem, sonra o uzayı değiştiren nesne olarak matris, sonra benzerliği ölçen üç ayrı cetvel. Sonda uzayın gerçekte nasıl göründüğüne bakacağız — ve resimlerdeki gibi görünmediğini.

## Bir uzayı uzay yapan iki işlem

Bir vektör uzayı (vector space), üzerinde iki işlem tanımlı bir nesneler kümesidir: iki öğe toplanabilir ve bir öğe bir sayıyla çarpılabilir. Toplama değişmeli ve birleşmeli olmalı, bir sıfır öğesi bulunmalı, her öğenin bir tersi olmalı, çarpma toplama üzerine dağılmalı. Sheldon Axler'in ders kitabı bu listeyi 1B bölümünde (4. baskı, s. 12) tam olarak verir. Liste kuru görünüyor; ama sonuçları kuru değil.

Somutlaştıralım. Gerçek bir modelden değil, işlemi görünür kılmak için kurulmuş üç boyutlu bir oyuncakla çalışalım: kral (0,8; 0,2; 0,9), erkek (0,7; 0,1; 0,1), kadın (0,1; 0,8; 0,1). "Kral eksi erkek artı kadın" hesabı bileşen bileşen yapılır: birinci bileşen 0,8 − 0,7 + 0,1 = 0,2, ikincisi 0,2 − 0,1 + 0,8 = 0,9, üçüncüsü 0,9 − 0,1 + 0,1 = 0,9. Sonuç (0,2; 0,9; 0,9).

Şimdi asıl noktaya gel: bu hesabın **yapılabilir olması** bir keşif değil, tanımın sonucu. Toplama ve sayıyla çarpma tanımlı olduğu için "iki vektörün farkı" diye bir nesne var; o fark da uzayın bir öğesi, yani kendisi bir yön. 4\. makaledeki "kraliyet yönü" benzetmesinin biçimsel karşılığı budur: yön, iki nokta arasındaki farktır ve fark, uzayın iki temel işleminden doğar. Orada aritmetiğin ne kadar temiz çalıştığını ölçümlerle tartışmıştık; buradaki soru başka ve daha temel — sorunun **sorulabilir** olması neye dayanıyor.

Cevabı görmek için karşı örneğe bak. Token kimlik numaraları da sayıdır: "kral" 15.213, "erkek" 8.222, "kadın" 9.674 olsun. 15.213 − 8.222 + 9.674 = 16.665 hesabı da yapılabilir. Ama sonuç sözlükteki 16.665 numaralı token'dır ve o token'ın anlamla hiçbir ilişkisi yoktur. Kimlik numaraları bir vektör uzayı oluşturmaz — daha doğrusu, oluşturdukları uzayın işlemleri anlamı taşımaz. Fark burada: embedding uzayında işlemler eğitimle anlam kazandırılmış bir yapının üzerinde çalışır, kimlik uzayında ise çalışmaz.

> **Kendini yokla:** Token kimlik numaralarını da toplayıp çıkarabiliyorsak, embedding'i onlardan ayıran şey tam olarak nedir?

Ayıran şey işlemlerin varlığı değil, işlemlerin kaybı azaltmaya katılıyor olması. Embedding satırları eğitimde birlikte hareket eder: bir bağlamda öğrenilen şey, o bağlamı paylaşan kelimenin satırına da yansır; bu yüzden satırlar arasındaki farklar sistematik hâle gelir. Kimlik numaraları hiçbir kayıp hesabına girmez, bu yüzden aralarındaki fark yalnızca sıralama gürültüsüdür.

![Sol panelde bir vektör koordinat listesi olarak gösterilir: üç sayılık dikey bir liste, yanında bu okumanın doğal kıldığı işlemler yazılıdır — sayıyı sakla, sayıyı ilet, bellekten oku. Sağ panelde aynı üç sayı uzayda başlangıç noktasından çıkan bir ok olarak gösterilir; yanında bu okumanın doğal kıldığı işlemler yazılıdır — uzunluk ölç, iki ok arasındaki açıyı ölç, iki oku topla, farkı al. Ortadaki bağlantı yazısı iki okumanın aynı nesne olduğunu, farkın yalnızca hangi sorunun sorulduğunda olduğunu söyler. Altta bir kayıt vardır: uzayı uzay yapan şey sayıların kendisi değil, üzerlerinde tanımlı toplama ve sayıyla çarpma işlemleridir.](assets/ayni-vektorun-iki-okunusu.svg "Şekil 1 — Aynı üç sayı, iki ayrı soru kümesi")

Şekil 1 iki okumayı yan yana koyuyor. Bir vektörü koordinat listesi olarak okursan doğal sorular saklama ve iletmeyle ilgilidir; yön olarak okursan uzunluk, açı ve fark sorulabilir hâle gelir. Model ikisini de kullanır: donanım birinci okumayı görür (89\. makaledeki bayt trafiği), öğrenme ikinci okumayı kurar.

## Matris: bir dönüşümün yazılı hâli

3\. makalede bir katmanı "doğrusal dönüşüm artı aktivasyon" diye tarif etmiştik. Doğrusal dönüşüm (linear transformation), iki işlemi koruyan bir eşlemedir: toplamın görüntüsü görüntülerin toplamı, katın görüntüsü görüntünün katıdır. Bu iki koşulun ilginç bir sonucu var — bir doğrusal dönüşümü tanımak için bütün vektörlerde ne yaptığını bilmek gerekmez; **taban** (basis) vektörlerinde ne yaptığını bilmek yeter. Taban, uzaydaki her vektörün tek bir biçimde toplamı olarak yazılabildiği en küçük vektör kümesidir.

Matris tam olarak budur: taban vektörlerinin nereye gittiğinin listesi. İki satır ve üç sütunlu bir M matrisi düşün; sütunları (1; 0), (0; 2) ve (−1; 1) olsun. Bu matris üç boyutlu bir vektörü iki boyuta indirir ve sütunları bize üç taban vektörünün nereye düştüğünü söyler. Şimdi x = (3; 1; 2) vektörünü geçirelim. İki yoldan da aynı sonuca varmalıyız.

Birinci yol, satır satır çarpma: birinci satır (1; 0; −1) ile x'in nokta çarpımı 3 − 2 = 1, ikinci satır (0; 2; 1) ile 2 + 2 = 4. Sonuç (1; 4). İkinci yol, sütunları ağırlıklı toplama: 3 · (1; 0) + 1 · (0; 2) + 2 · (−1; 1) = (3; 0) + (0; 2) + (−2; 2) = (1; 4). Aynı sayı.

Bir sonuç daha var ve seride uzun süredir kullandığımız bir kuralın gerekçesini veriyor. İki doğrusal dönüşümü peş peşe uygularsan sonuç yine doğrusal bir dönüşümdür ve onun matrisi, iki matrisin çarpımıdır. Yani üst üste konmuş yüz matris, tek bir matrisin yaptığı işi yapar. 3\. makalede her katmandan sonra bir aktivasyon işlevi olduğunu görmüştük ve o zaman gerekçesini "doğrusal olmayan ilişkileri öğrenebilmek" diye vermiştik; biçimsel karşılığı tam olarak budur. Aktivasyonu kaldırırsan derinlik kelimenin tam anlamıyla kaybolur — model yüz katmanlık değil, tek katmanlık bir modele denk düşer. Derinliğin bir işe yaraması, aradaki doğrusal olmayan adımın bileşkeyi tek bir matrise indirgenemez kılmasına bağlıdır.

İkinci yol daha öğretici, çünkü matris çarpımının ne yaptığını söylüyor: **girdinin bileşenleri, sütunların ne kadar karışacağını belirleyen ağırlıklardır.** 7\. makalede modelin her yerinde matris çarpımı gördüğümüzde, her seferinde olan şey buydu.

![Bir matrisin iki okunuşu tek şekilde gösterilir. Üstte iki satır ve üç sütunlu M matrisi yazılıdır; sütunları sırasıyla bir sıfır, sıfır iki ve eksi bir birdir. Solda satır okuması: birinci satır bir sıfır eksi bir ile x eşittir üç bir iki vektörünün nokta çarpımı üç eksi iki eşittir bir; ikinci satır sıfır iki bir ile aynı vektörün nokta çarpımı iki artı iki eşittir dört. Sağda sütun okuması: üç kere bir sıfır artı bir kere sıfır iki artı iki kere eksi bir bir eşittir bir dört. Ortada iki sonucun aynı olduğu ve sütun okumasının matrisin ne yaptığını söylediği yazılıdır: sütunlar taban vektörlerinin gittiği yerdir, girdinin bileşenleri de onların karışım ağırlıklarıdır.](assets/matrisin-sutunlari.svg "Şekil 2 — Sütunlar taban vektörlerinin gittiği yerdir")

Şekil 2 iki okumayı aynı sayılarla karşılaştırıyor. Buradan çıkan ilk kazanç, 4\. makaledeki "defterden satır okumak" benzetmesinin biçimsel karşılığıdır. Sözlükte dört token varsa ve embedding boyutu üçse, embedding tablosu dört satır ve üç sütunlu bir matristir. İkinci token'ı okumak, aslında (0; 1; 0; 0) vektörünü — yalnızca bir bileşeni 1, kalanı 0 olan **tek-sıcak** (one-hot) vektör — bu matrisle çarpmaktır. Sonuç ikinci satırdır. Yani embedding tablosu bir "arama tablosu" değil, bir doğrusal dönüşümdür; arama, o dönüşümün seyreklikten yararlanan verimli gerçeklemesidir. Bu ayrım boş bir titizlik değil: 19\. makaledeki düşük ranklı uyarlama, tabloyu bir dönüşüm olarak gördüğün anda anlam kazanır.

## Benzerliğin üç cetveli

6\. makalede iki vektörün benzerliğini nokta çarpımla ölçmüştük: bileşenleri eşleştirip çarp, topla. Şimdi o sayının içini açalım. İki vektörün nokta çarpımı, uzunluklarının çarpımı ile aralarındaki açının kosinüsünün çarpımına eşittir. Yani nokta çarpım iki ayrı bilgiyi tek sayıda birleştirir: **ne kadar büyükler** ve **ne kadar aynı yöne bakıyorlar**.

Bir vektörün uzunluğuna norm denir ve bileşenlerin karelerinin toplamının kareköküdür. (Bu sözcük seride ikinci kez farklı bir nesne için kullanılıyor: 7\. makaledeki katman normalleştirme bir vektörün sayılarını yeniden ölçekleyen bir işlemdi; buradaki norm o vektörün uzunluğunu veren bir sayıdır.) İki bilgiyi ayırmak istersen vektörleri önce uzunluklarına bölersin; kalan sayı yalnızca açıyı ölçer ve adı **kosinüs benzerliği** (cosine similarity) — 39\. makalede bellek kayıtlarını sıralarken kullanmıştık, biçimsel kurulumu burada.

Şimdi üç cetveli aynı üçlü üzerinde çalıştıralım. a = (3; 4) sabit olsun; adaylar b = (10; 0) ve c = (2; 2).

Nokta çarpım: a · b = 3 · 10 + 4 · 0 = 30; a · c = 3 · 2 + 4 · 2 = 14. Bu cetvele göre b önde.

Kosinüs: a'nın normu 5, b'nin normu 10, c'nin normu 2,83. Kosinüs benzerliği a · b bölü (5 × 10) = 0,600; a · c bölü (5 × 2,83) = 0,990. Bu cetvele göre c önde.

Öklit uzaklığı: a ile b arasındaki uzaklık bileşen farklarının karelerinin toplamının kareköküdür, yani 7 ve 4'ten 8,06; a ile c arasında 1 ve 2'den 2,24. Bu cetvele göre de c önde — ama b ile arasındaki fark kosinüsün gösterdiğinden çok daha büyük.

![Üç sütunlu bir tablo şekli. Satırlar sabit a vektörü üç dört ile iki aday arasındaki ölçümleri verir. Birinci aday b eşittir on sıfır: normu on, nokta çarpım otuz, kosinüs benzerliği sıfır virgül altı yüz, Öklit uzaklığı sekiz virgül sıfır altı. İkinci aday c eşittir iki iki: normu iki virgül seksen üç, nokta çarpım on dört, kosinüs benzerliği sıfır virgül dokuz yüz doksan, Öklit uzaklığı iki virgül yirmi dört. Altta üç cetvelin sıralaması yazılıdır: nokta çarpıma göre b önde, kosinüse göre c önde, Öklit uzaklığına göre c önde. En altta bir kayıt vardır: nokta çarpım uzunluğu da hesaba katar, kosinüs yalnızca açıyı ölçer, Öklit uzaklığı ikisini birden görür; hangisinin doğru olduğu ölçmek istediğin şeye bağlıdır ve sayılar bu üç vektörden elle hesaplanmıştır.](assets/uc-cetvel-iki-siralama.svg "Şekil 3 — Aynı üçlü, birbirine zıt iki sıralama")

Şekil 3'teki tablo bu makalenin en pratik cümlesini taşıyor: nokta çarpım ile kosinüs **aynı çift üzerinde zıt sıralama verebilir** ve bu bir hata değildir. Nokta çarpım "büyük ve aynı yönde" arar, kosinüs "yalnızca aynı yönde" arar. 29\. makaledeki anlamsal aramada uzun belgelerin normu büyür; hangi cetveli seçtiğin, uzunluğun sıralamaya girip girmeyeceğine karar verir.

Bir de üç cetvelin ikisini birbirine indirgeyen özel bir durum var ve pratikte en çok kullanılan durum o. Vektörleri normlarına bölüp uzunluklarını 1 yaparsan — yani birim küre üzerine izdüşürürsen — iki vektör arasındaki Öklit uzaklığının karesi 2 eksi 2 çarpı nokta çarpım olur. Yani nokta çarpım büyüdükçe uzaklık küçülür; iki cetvel **aynı sıralamayı** verir. 43\. makaledeki vektör dizinlerinin çoğu bu yüzden vektörleri normalleştirerek saklar: en büyük nokta çarpımı aramak ile en yakın komşuyu aramak, birim kürede tek ve aynı problemdir. Normalleştirmeden bunu varsaymak ise yukarıdaki b–c örneğindeki ters sıralamayı üretir.

Bunun ölçülmüş bir uyarısı da var. Harald Steck, Chaitanya Ekanadham ve Nathan Kallus'un 2024'te Web Konferansı'nın eşlik eden bildirilerinde yayımladığı çalışma, kapalı biçimde çözülebilen düzenlileştirilmiş doğrusal modellerde kosinüs benzerliğinin **keyfî** değerler üretebildiğini analitik olarak gösteriyor: bazı kurulumlarda benzerlik tek bile değil, düzenlileştirmenin seçimine göre değişiyor. Yazarların sonucu ölçülü: kosinüs benzerliği düşünmeden uygulanacak bir ölçü değildir.

## Uzayın gerçek biçimi

Şimdi rahatsız edici kısım. 4\. makaledeki iki boyutlu anlam haritasında kelimeler her yöne dağılmıştı. Gerçek uzay öyle görünmüyor.

Kawin Ethayarajh'ın EMNLP-IJCNLP 2019'da yayımladığı çalışma, bağlamsal temsillerin yönlere göre düzgün dağılmadığını ölçtü: temsiller uzayda dar bir koni işgal ediyor. Bu özelliğe **eşyönsüzlük** (anisotropy) diyoruz; karşıtı, yönlerin dengeli dağıldığı **eşyönlülük** (isotropy). Ethayarajh'ın ölçümündeki uç durum GPT-2'nin son katmanı: rastgele seçilmiş iki kelime, ortalamada neredeyse tam kosinüs benzerliği veriyor. Yani ham kosinüs sayısına bakıp "bu iki kelime benzer" demek, o katmanda hiçbir şey söylemiyor.

William Timkey ve Marten van Schijndel'in EMNLP 2021'de yayımladığı çalışma sebebi daha da daralttı: kosinüs benzerliğini birkaç **serseri boyut** taşıyor, çoğu zaman bir ile üç arası. XLNet'in son katmanlarında tek bir boyut, rastgele token çiftleri arasındaki beklenen kosinüs benzerliğinin yüzde 99'undan fazlasını üretiyor. O boyutun (667 numaralı) ortalama etkinliği 180,0 iken diğer bütün boyutların ortalaması −0,084 ve standart sapması 0,77. Çalışmanın ikinci bulgusu daha önemli: kosinüs benzerliğine hükmeden boyutlar, modelin **davranışına** hükmeden boyutlar değil. Ölçtüğün şeyle modelin kullandığı şey ayrışıyor.

Üçüncü uyarı boyut sayısının kendisinden geliyor. Charu Aggarwal, Alexander Hinneburg ve Daniel Keim'in ICDT 2001'de yayımladığı çalışma, boyut arttıkça en yakın ile en uzak nokta arasındaki uzaklık farkının göreli olarak eridiğini gösteriyor; Kevin Beyer ve arkadaşlarının 1999'daki ICDT bildirisi aynı olguyu "en yakın komşu ne zaman anlamlıdır" sorusuyla kurmuştu. 5\. makalede boyutluluk laneti adıyla tanıştığımız şeyin uzaklık ölçüsündeki yüzü budur: yüksek boyutta "yakın" sözcüğü, düşük boyuttaki sezgisini otomatik olarak taşımaz.

Bu üç bulgu birlikte şunu söylüyor: uzayın **koordinatları** ile uzayın **kullanılabilir yapısı** aynı şey değil. Neyse ki düzeltme de ölçülmüş. Jiaqi Mu ve Pramod Viswanath'ın ICLR 2018'de sunduğu çalışma, ortalamayı çıkarıp en baskın birkaç yönü atmanın temsilleri belirgin biçimde iyileştirdiğini gösteriyor; Timkey ve van Schijndel de basit bir standartlaştırmanın serseri boyutların etkisini kaldırdığını ölçüyor. Jun Gao ve arkadaşlarının ICLR 2019'da sunduğu çalışma ise koninin nereden geldiğini soruyor ve kaynağı üretim katmanının eğitim dinamiğinde buluyor.

> **Kendini yokla:** GPT-2'nin son katmanında rastgele iki kelimenin kosinüs benzerliği neredeyse 1 çıkıyorsa, iki kelimenin gerçekten benzer olup olmadığını nasıl anlarsın?

Karşılaştırmayı mutlak sayıyla değil, bir tabana göre yaparak. Ethayarajh'ın kendi yöntemi budur: rastgele seçilmiş kelime çiftlerinin ortalama benzerliğini taban kabul edip ölçülen benzerlikten çıkarır. Kalan pay, eşyönsüzlüğün payı değil, o çiftin kendi payıdır.

## Aynı uzayın ikinci okunuşu

Kapanışta bir bağ kuralım, çünkü bir sonraki adım oradan çıkıyor.

4\. makalede word2vec'in küçük bir ağla eğitildiğini görmüştük; Tomáš Mikolov ve arkadaşlarının NeurIPS 2013'te yayımladığı hakemli çalışma, eğitimi ucuzlatan negatif örnekleme hilesini oraya eklemişti. Omer Levy ve Yoav Goldberg'in NeurIPS 2014'te yayımladığı çalışma bu eğitimin ne yaptığını başka bir dille yeniden yazdı: negatif örneklemeli skip-gram, örtük olarak bir **kelime-bağlam matrisini ayrıştırıyor**. O matrisin her hücresinde, kelime ile bağlamın birlikte görülme eğilimini ölçen bir sayı var — noktasal karşılıklı bilgi (pointwise mutual information) — ve genel bir sabitle kaydırılmış hâli. Yazarlar ayrıca bu matrisi doğrudan ayrıştırmanın, kelime benzerliği görevlerinde skip-gram'ın çözümü kadar iyi sonuç verdiğini ölçüyor; analoji sorularında skip-gram önde kalıyor.

Aynı ekibin bir yıl sonra Transactions of the ACL'de yayımladığı geniş karşılaştırma tabloyu tamamlıyor: varsayılan ayarlarla sayım tabanlı kaydırılmış pozitif noktasal karşılıklı bilgi Google analoji kümesinde 0,491, doğrudan matris ayrıştırması 0,452, negatif örneklemeli skip-gram 0,530 alıyor. Yazarların sonucu şu: kazançların çoğu algoritmadan değil, tasarım ve hiperparametre seçimlerinden geliyor ve bu seçimler eski usul yöntemlere de taşınabiliyor.

Sonucu iki kere oku. Birincisi: "sinir ağı embedding'i" ile "sayım tabanlı vektör" arasındaki sınır, sanıldığı kadar keskin değil. İkincisi ve bizim için asıl önemlisi: bir embedding tablosunu, daha büyük bir matrisin sıkıştırılmış hâli olarak görmek mümkün. Bu cümle bir soru doğuruyor — bir matrisi "sıkıştırmak" ne demek, hangi bilgi kalıyor ve hangisi atılıyor?

Bu bölümün toplu dersi bir yöntem kuralı: bir embedding uzayında ölçüm yapıyorsan, ölçüyü uygulamadan önce uzayın o ölçünün varsaydığı biçime sahip olup olmadığına bakman gerekiyor. Kosinüs benzerliği yönlerin dengeli dağıldığını varsayar; ölçülen uzaylar bu varsayımı sağlamıyor. Düzeltme ucuz — ortalamayı çıkarmak, baskın yönleri atmak, boyutları standartlaştırmak — ama düzeltmeyi yapmadan alınan sayı, iki kelime hakkında değil, uzayın ortak kayması hakkında bilgi veriyor.

### Sırada ne var

Bu makalede matrisi bir dönüşüm olarak kurduk: sütunları taban vektörlerinin gittiği yeri söylüyor, girdinin bileşenleri de karışım ağırlıklarını. Ama bir matrisin içinde, sütun sayısından bağımsız ikinci bir sayı var: gerçekte kaç bağımsız yönde iş yapıyor. Bir sonraki makale o sayıyı kuruyor — ve 19\. makalede adını koyup kullandığımız "rank"ın neden bir ölçü olduğunu, bir matrisi en iyi biçimde nasıl sıkıştırabileceğini ve bu sıkıştırmanın tam olarak neyi attığını gösteriyor.

## Kaynakça

- Axler, S. (2024). *Linear Algebra Done Right* (4. baskı). Springer, açık erişim; vektör uzayının tanımı 1B (s. 12), doğrusal dönüşümler 3A (s. 52), matrisler ve rank 3C (s. 69–79), iç çarpım ve norm 6A (s. 182). [Bağlantı](https://linear.axler.net/)
- Mikolov, T., Sutskever, I., Chen, K., Corrado, G. & Dean, J. (2013). *Distributed Representations of Words and Phrases and their Compositionality*. NeurIPS 2013. [Bağlantı](https://papers.nips.cc/paper_files/paper/2013/hash/9aa42b31882ec039965f3c4923ce901b-Abstract.html)
- Levy, O. & Goldberg, Y. (2014). *Neural Word Embedding as Implicit Matrix Factorization*. NeurIPS 2014. [Bağlantı](https://papers.nips.cc/paper_files/paper/2014/hash/b78666971ceae55a8e87efb7cbfd9ad4-Abstract.html)
- Levy, O., Goldberg, Y. & Dagan, I. (2015). *Improving Distributional Similarity with Lessons Learned from Word Embeddings*. Transactions of the ACL 3, 211–225. [Bağlantı](https://aclanthology.org/Q15-1016/)
- Steck, H., Ekanadham, C. & Kallus, N. (2024). *Is Cosine-Similarity of Embeddings Really About Similarity?* WWW '24 Companion. [Bağlantı](https://doi.org/10.1145/3589335.3651526)
- Ethayarajh, K. (2019). *How Contextual are Contextualized Word Representations? Comparing the Geometry of BERT, ELMo, and GPT-2 Embeddings*. EMNLP-IJCNLP 2019. [Bağlantı](https://aclanthology.org/D19-1006/)
- Timkey, W. & van Schijndel, M. (2021). *All Bark and No Bite: Rogue Dimensions in Transformer Language Models Obscure Representational Quality*. EMNLP 2021. [Bağlantı](https://aclanthology.org/2021.emnlp-main.372/)
- Mu, J. & Viswanath, P. (2018). *All-but-the-Top: Simple and Effective Postprocessing for Word Representations*. ICLR 2018. [Bağlantı](https://openreview.net/forum?id=HkuGJ3kCb)
- Gao, J., He, D., Tan, X., Qin, T., Wang, L. & Liu, T.-Y. (2019). *Representation Degeneration Problem in Training Natural Language Generation Models*. ICLR 2019. [Bağlantı](https://openreview.net/forum?id=SkEYojRqtm)
- Aggarwal, C. C., Hinneburg, A. & Keim, D. A. (2001). *On the Surprising Behavior of Distance Metrics in High Dimensional Space*. ICDT 2001, LNCS 1973. [Bağlantı](https://doi.org/10.1007/3-540-44503-X_27)
- Beyer, K., Goldstein, J., Ramakrishnan, R. & Shaft, U. (1999). *When Is "Nearest Neighbor" Meaningful?* ICDT 1999, LNCS 1540. [Bağlantı](https://doi.org/10.1007/3-540-49257-7_15)
