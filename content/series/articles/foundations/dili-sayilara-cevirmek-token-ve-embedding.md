---
article_id: article_e0871ce4-0b1a-4b5c-9d72-b713ba8c6cf1
title: "Dili Sayılara Çevirmek: Token ve Embedding"
slug: dili-sayilara-cevirmek-token-ve-embedding
category: foundations
level: beginner
reading_order: 4
summary: "Metnin ağa girebilmesi için geçtiği iki aşamayı kurar: token'lara ayıran BPE ve anlamı geometriye çeviren embedding; Türkçenin token maliyetini ölçümle gösterir."
tags:
  - token
  - tokenizasyon
  - embedding
  - bpe
  - dagilimsal-hipotez
content_hash: sha256:055b9df9d5839f503c976380514e9cb11d1e22d9e36fd4ed02ba13ad1585610d
classification_version: 1
classification_batch: 0
---
## Ağın kapısında bekleyen dil

3\. makalede görmüştük: bir sinir ağı (neural network), sayılardan oluşan bir girdiyi katman katman dönüştüren ve her katmanda işe yarar bir temsil (representation) üreten, ayarlanabilir bir fonksiyondur. Girdi ne olursa olsun — bir evin metrekaresi, bir fotoğrafın piksel değerleri — ağın kapısından içeri yalnızca sayılar girer; çarpma, toplama ve gradyan inişi hep sayılar üzerinde çalışır. Peki "merhaba" bu kapıdan nasıl girer?

1\. makalede sonraki kelimeyi tahmin etmeyi "Bugün hava çok ___" örneğiyle görmüştük. O tahmini yapan model de bir tür sinir ağıdır; ama önüne gelen şey sayı değil, dildir. Demek ki arada bir çevirmen var: metni sayılara çeviren bir mekanizma. Bu makalenin konusu o çevirmen. İki aşamadan oluşur: metni parçalara ayıran tokenizasyon (tokenization) ve her parçaya anlam taşıyabilen bir sayı listesi bağlayan embedding.

İlk bakışta iş kolay görünür. Bilgisayarlar zaten her harfi bir sayıyla saklar; "a" için bir kod, "b" için bir başkası. Neden aynısını yapmayalım? Çünkü bu kodlar anlamla ilgisizdir. "b"nin kodunun "a"nınkine komşu olması alfabetik bir tesadüftür; "kedi" ile "keder" ilk üç harfi paylaşır ama anlamca alakasızdır. Harf kodlarıyla beslenen bir model, anlamın tamamını bu rastgele işaretlerin altından kazıp çıkarmak zorunda kalır — sayıların kendisi ona hiçbir şey söylemez.

İkinci naif fikir biraz daha inceliklidir: kelimeleri bir sözlüğe (vocabulary) diz, her kelimeye sözlük uzunluğunda bir vektör ver — tamamı sıfır, yalnızca o kelimenin kendi konumunda 1. Buna literatürde one-hot kodlama denir. Yüz bin kelimelik bir sözlükte "kedi", yüz bin sayıdan oluşan ve yalnızca bir tanesi 1 olan devasa bir listedir.

> **Kendini yokla:** One-hot kodlamada "kedi" vektörü ile "köpek" vektörü arasındaki uzaklık, "kedi" ile "buzdolabı" arasındaki uzaklıkla neden tamamen aynıdır?

Çünkü her vektörde tek bir 1 vardır ve hepsi farklı bir konumdadır: hangi iki kelimeyi seçersen seç, vektörleri tam olarak iki konumda birbirinden ayrılır. Geometrik olarak bütün kelimeler birbirine eşit uzaklıkta köşelerde oturur. "Kedi" ile "köpek"in benzerliği bu temsilin hiçbir yerinde yoktur; kodlama anlam hakkında sıfır bilgi taşır. Yoshua Bengio ve arkadaşlarının 2003'te yayımladığı çalışma bu problemi net biçimde ortaya koyup çözümün yönünü çizdiği için alanın dönüm noktalarındandır: her kelimeye, elle yazılmış bir kod yerine öğrenilen, yoğun, görece küçük bir vektör ver; böylece model bir cümleden öğrendiğini, benzer kelimelerden kurulmuş hiç görmediği cümlelere genelleyebilsin. Bu fikir bugün her büyük dil modelinin giriş katmanında yaşıyor.

Bu makale boyunca kuracağımız hat Şekil 1'de özetleniyor: metin önce token denen parçalara bölünür, her token bir kimlik numarası alır, her kimlik numarası da öğrenilmiş bir vektöre açılır. Şekil sadelik için her kelimeyi tek bir parça gösteriyor; birazdan göreceğin gibi gerçek sistemler Türkçe kelimeleri çoğu zaman birkaç parçaya böler.

![Bir cümlenin işlenme hattı: metin token'lara bölünür, her token bir kimlik numarası alır, her kimlik numarası embedding tablosundan öğrenilmiş bir vektöre açılır.](assets/cumleden-vektore.svg "Şekil 1 — Metinden vektöre giden hat")

## Kelime mi, harf mi? Token uzlaşısı

Metni parçalara bölmenin iki uç yolu var ve ikisinin de bedeli ağır. Kelime düzeyinde bölersen sözlük patlar: Türkçede "kitap", "kitaplar", "kitaplarımdan" ayrı ayrı kelime sayılır ve ek alan her biçim sözlükte ayrı bir yer ister. Daha kötüsü, sözlükte olmayan bir kelimeyle karşılaşan model çaresiz kalır; eski sistemler böyle kelimelere "bilinmeyen" etiketi yapıştırıp anlamı tamamen çöpe atardı. Harf düzeyinde bölersen sözlük minicik olur — Türkçe için birkaç düzine işaret yeter — ama bu kez diziler upuzar ve her birim anlamsızlaşır: "k" harfi tek başına hiçbir şey söylemez, model anlamı çok uzun mesafeli ilişkilerden toplamak zorunda kalır.

Modern çözüm bir uzlaşıdır: alt-kelime (subword). Sık geçen kelimeler bütün kalır; seyrek kelimeler, sık geçen parçalara bölünür. İşte bu parçaların adı token. Dikkat: token kelime değildir — bir derlemde istatistiksel olarak sık geçen bir metin parçasıdır. Bazen bir kelimeye, bazen bir eke, bazen anlamla hiç örtüşmeyen bir kırpıntıya denk gelir.

Bu parçaları bulan en yaygın yöntemin kökeni şaşırtıcıdır. Bayt çifti kodlaması (byte pair encoding, BPE), 1994'te Philip Gage'in bir C programcılığı dergisinde yayımladığı bir veri sıkıştırma tekniğidir; dille hiçbir ilgisi yoktu. Fikir tek cümledir: veride en sık geçen ikiliyi bul, onu tek bir yeni sembole birleştir, doyana kadar tekrarla. Rico Sennrich, Barry Haddow ve Alexandra Birch 2016'da bu eski sıkıştırma numarasını makine çevirisindeki nadir kelime problemini çözmek için dile uyarladı; çalışma o kadar etkili oldu ki BPE bugün büyük dil modellerinin fiilî standart tokenizasyon yöntemidir.

Algoritmanın nasıl çalıştığını temsilî bir mini örnekle izleyelim. Derlemimiz yalnızca dört kelime olsun: "okul", "okulda", "okullar", "okullarda". Önce her kelimeyi karakterlerine böleriz. Sonra saymaya başlarız:

1. En sık geçen ikili "o–k"dır (dört kelimede de var). Birleştir: "ok" artık tek parça.
2. Şimdi en sık ikili "ok–u". Birleştir: "oku". Bir sonraki adımda "oku–l" birleşir ve dört kelimenin ortak kökü "okul" tek bir parça hâline gelir.
3. Sıra eklere gelir: "l–a" birleşip "la" olur, "la–r" birleşip "lar", "d–a" birleşip "da".

Sonuç: "okul" tek token; "okulda" iki token ("okul" + "da"); "okullarda" üç token ("okul" + "lar" + "da"). Şekil 2 bu birleşmeyi "okullarda" üzerinde adım adım gösteriyor. Kritik gözlem şu: algoritmaya Türkçe dilbilgisi öğretmedik. Kökü, çoğul ekini ve bulunma ekini yalnızca sıklık sayarak kendisi keşfetti. (Örnek temsilîdir: gerçek BPE uygulamaları baytlar üzerinde çalışır ve birleştirme sırası derleme göre değişir; ama mantık tam olarak budur.)

![BPE birleştirme adımları: "okullarda" kelimesi önce karakterlere bölünür; sık geçen ikililer birleşerek önce kökü, sonra ekleri oluşturur.](assets/bpe-adimlari.svg "Şekil 2 — BPE'nin birleştirme adımları")

Gerçek sistemlerde ölçek çok daha büyüktür. OpenAI'ın GPT-2 teknik raporunda tanıtılan tokenizer, BPE'yi harfler yerine baytlar üzerinde çalıştırır: taban sözlük 256 bayttır, üzerine 50.000 öğrenilmiş birleştirme ve bir özel işaret eklenince 50.257 token'lık bir sözlük çıkar. Bayt tabanının zarif bir sonucu vardır: hiçbir metin sözlük dışı kalamaz — her girdi en kötü ihtimalle baytlarına bölünür, "bilinmeyen" etiketine gerek kalmaz. Sonraki nesillerde sözlükler büyüdü: GPT-4'ün tokenizer'ı yaklaşık 100 bin, GPT-4o'nunki yaklaşık 200 bin token içerir.

Burada Türkçe konuşan okura dürüst bir not borçluyuz. Bu tokenizer'lar ağırlıklı olarak İngilizce metinlerle eğitilmiştir; sık parçaları İngilizceden öğrenirler. Bu makale için OpenAI'ın tiktoken kütüphanesiyle yaptığımız, herkesin tekrarlayabileceği bir ölçümde İnsan Hakları Evrensel Bildirgesi'nin 1. maddesini iki dilde token'lara böldük: İngilizce metin 33 token tutarken aynı içeriğin Türkçesi GPT-4'ün tokenizer'ında 60 token tuttu — yaklaşık 1,8 kat fazla. GPT-4o'nun daha büyük sözlüğü farkı 46 token'a, yani 1,4 kata indiriyor; ilerleme gerçek ama eşitlik değil. Üstelik bölünme yerleri Türkçenin ek yapısını umursamaz: "kitaplarımda" kelimesi GPT-4 tokenizer'ında "kit–ap–ları–md–a" diye parçalanır; iyelik eki ile bulunma eki, dilbilgisiyle örtüşmeyen kırpıntılara dağılmıştır. Model, "bu kelimede benim kitaplarımdan söz ediliyor" bilgisini bu kırpıntılardan yeniden kurmak zorundadır. Aleksandar Petrov ve arkadaşlarının 2023 tarihli çalışması bu adaletsizliği sistematik biçimde ölçtü: aynı içeriğin token uzunluğu diller arasında 15 kata kadar değişebiliyor ve bu fark üç somut bedele dönüşüyor — token başına ödenen ücret, işlem süresi ve modelin bir seferde görebileceği metin miktarı (bu son sınırı, bağlam penceresini, serinin ilerleyen makalesinde ayrıntılı ele alacağız). Oreva Ahia ve arkadaşlarının aynı yıl yayımlanan incelemesi de 22 dil üzerinde benzer sonuca vardı: birçok dilin konuşuru aynı hizmet için hem daha çok ödüyor hem daha kötü sonuç alıyor. Eklemeli bir dil konuşuyorsan tokenizasyon senin için soyut bir teknik ayrıntı değil, faturana yansıyan bir tasarım kararıdır.

## Sıra numarasından anlama: embedding

Tokenizasyon bitince elimizde sayılar var: her token, sözlükteki yerini gösteren bir kimlik numarası aldı. "Kediler süt içer" cümlesi, Şekil 1'deki gibi, 1042–873–2911 türünden bir sayı dizisine dönüştü diyelim. Amaca ulaştık mı? Hayır — çünkü bu sayılar hâlâ anlamsız birer sıra numarası. 1042'nin 1043'e yakın olması, telefon rehberinde art arda gelen iki ismin akraba olması kadar tesadüfîdir. One-hot'un problemi geri geldi: sıra numarası anlam taşımaz.

Çözümün adı embedding: her token kimliğine karşılık gelen, öğrenilen bir vektör — yani bir sayı listesi. Şöyle hayal et: yüz bin satırlık dev bir defter. Her satırda yüzlerce sayı yazılı (GPT-2'de her satır 768 sayıdır). Tokenizasyon sana hangi satırın açılacağını söyler; embedding katmanının yaptığı iş, o satırı açıp içindeki sayıları ağa vermekten ibarettir. Asıl büyük fikir şudur: bu defteri kimse yazmadı. Eğitim başlarken her satır rastgele sayılarla doludur. Sonra, 2. makalede kurduğumuz mekanizma devreye girer — model tahmin eder, kayıp fonksiyonu (loss function) hatayı ölçer, gradyan inişi her parametreyi hatayı azaltacak yönde iter. Embedding satırları da ağın diğer ağırlıkları gibi birer parametredir ve aynı döngüde, milyonlarca tahmin hatasıyla, satır satır yeniden yazılır. Bengio ve arkadaşlarının 2003'teki modelinin özü tam olarak buydu: kelime temsilleri ile dil modelinin kendisi ayrı ayrı değil, birlikte öğrenilir. Defter benzetmesi şurada bozulur: gerçek bir defterin satırları birbirinden bağımsızdır ve bir kez yazılır; embedding satırlarıysa hep birlikte, aynı kaybı azaltmaya çalışırken şekillenir — bu yüzden satırlar birbirlerine göre anlamlı konumlara yerleşir.

Bu defterin ne kadar yer kapladığını görmek öğreticidir: GPT-2'nin küçük sürümünde 50.257 satır × 768 sayı ≈ 38,6 milyon parametre eder — 124 milyon parametrelik modelin yaklaşık üçte biri. Modelin kayda değer bir bölümü, düpedüz bu sözlük defteridir.

Satırların gerçekten öğrenildiğinin çarpıcı bir kanıtı, ters yönden gelir. Jessica Rumbelow ve Matthew Watkins'in 2023'te yayımladığı, hakemli olmayan ama çok yankı uyandıran bir araştırma notu, GPT modellerinde "SolidGoldMagikarp" gibi tuhaf token'lar buldu: bunlar tokenizer'ın sözlüğüne girecek kadar sık geçtiği hâlde modelin eğitim verisinde neredeyse hiç görünmeyen parçalardı. Karşılık gelen defter satırları hiç yeniden yazılmamıştı — hâlâ başlangıçtaki rastgele gürültüyü taşıyorlardı. Sonuç: model bu token'ları görünce saçmalıyor, soruyu başka kelime duymuş gibi cevaplıyordu. Hiç eğitilmemiş bir embedding satırı, anlamı olmayan bir satırdır; anlam, formülle verilmez, eğitimle kazanılır.

Peki eğitim bu satırlara ne yazıyor da vektörler "anlam" taşır hâle geliyor?

## Bir kelimeyi arkadaşlarından tanımak

Cevabın kökleri, sinir ağlarından çok önceye, dilbilime uzanır. Amerikalı yapısalcı dilbilimci Zellig Harris 1954 tarihli "Distributional Structure" makalesinde, bir kelimenin hangi ortamlarda geçtiğinin — dağılımının — o kelimenin anlamı hakkında sistematik kanıt taşıdığını savundu; bugün dağılımsal hipotez (distributional hypothesis) dediğimiz ilkenin kurucu metni budur. İngiliz dilbilimci John Rupert Firth ise 1957'de aynı fikri alanın ezberindeki özdeyişe dönüştürdü: "You shall know a word by the company it keeps" — bir kelimeyi, birlikte gezdiği arkadaşlarından tanırsın. (Fikir o dönemin yapısalcı dilbiliminde havada dolaşıyordu; ama bu formülasyonun Firth'e ait olduğu kabul edilir.)

Somutlaştıralım: "çay" ve "kahve" kelimelerini düşün. İkisi de "içmek", "bardak", "sıcak", "sabah" gibi kelimelerin yanında gezer. Milyonlarca cümleye bakarsan iki kelimenin ortamları şaşırtıcı ölçüde örtüşür — ve bu örtüşme, ikisinin anlamca yakın olduğunun ölçülebilir bir izidir.

> **Kendini yokla:** "Çay" ve "kahve" hiç aynı cümlede geçmeseler bile vektörleri neden yakınlaşır?

Çünkü yakınlaşma için birlikte görünmeleri değil, benzer bağlamlarda görünmeleri yeterlidir. Modelin eğitim hedefi bağlamdan tahmin yapmaktır: "bir bardak ___ içtim" boşluğunda bazen "çay", bazen "kahve" belirir. Kaybı azaltmanın en ekonomik yolu, aynı bağlamlarda beliren kelimelere benzer vektörler vermektir — böylece model bir bağlam için öğrendiğini diğerine bedavaya taşır. Kimse ona "bu iki kelime benzerdir" demez; benzerlik, tahmin hatasını azaltmanın yan ürünü olarak vektörlere işler. Arkadaş benzetmesinin bozulduğu yeri de söyleyelim: insanlar arkadaşlarını seçer, kelimeler bağlamlarını seçmez — ve aynı ortamlarda gezen iki kelime zıt anlamlı da olabilir ("sıcak" ve "soğuk" da aynı kelimelerin yanında dolaşır), bu yüzden dağılımsal yakınlık anlam benzerliğinin tamamı değildir ve hipotez, eksiksiz bir anlam kuramı olarak dilbilimde hâlâ tartışılır.

## word2vec: küçük ağ, dev derlem

Dağılımsal hipotezi ucuz ve ölçeklenebilir biçimde sayılara döken atılım, 2013'te Tomáš Mikolov ve Google'daki ekibinden geldi. word2vec adıyla bilinen çalışma aslında iki ayrı makaledir ve ikisi farklı işler yapar. İlk makale — hakem sürecinden geçmemiş bir ön çalışma olarak yayımlanmıştır — iki basit mimari tanıttı: CBOW, çevredeki kelimelerden ortadaki kelimeyi tahmin eder; Skip-gram, ortadaki kelimeden çevresindekileri tahmin eder. Ağlar kasıtlı olarak küçüktü; asıl güç ölçekteydi: 1,6 milyar kelimelik metinden bir günden kısa sürede kaliteli vektörler öğrenilebiliyordu. Aynı yıl NeurIPS'te yayımlanan hakemli ikinci makale, eğitimi pratik kılan hileyi ekledi: koca sözlük üzerinden pahalı bir olasılık hesabı yerine, bir avuç "bu kelime bu bağlama uyar mı, uymaz mı?" kararıyla eğitmek (negative sampling).

Sonuçların en ünlüsü bir aritmetik gösterisidir: kral − erkek + kadın vektör toplamı, uzayda "kraliçe"nin vektörüne yakın bir noktaya düşer. Küçük ama yaygın bir atıf hatasını düzeltelim: bu gösteri word2vec makalelerinden değil, aynı yıl Mikolov, Yih ve Zweig'in ayrı bir bildirisinden gelir; o çalışmanın önemi, kelimeler arasındaki ilişkilerin vektör farkları olarak temsil edildiğini ilk kez sistematik göstermesidir. Bir harita benzetmesiyle: "kuzey" bir yer değil, bir yöndür; kral − erkek farkı da uzayda bir tür "kraliyet yönü" tarif eder ve bu yönde kadından yürüyünce kraliçenin mahallesine varılır. Benzetmenin bozulduğu yer: haritada kuzeye yürümek seni kesin bir noktaya götürür; vektör uzayında mahalle kalabalıktır ve en yakın ev çoğu zaman yola çıktığın evdir.

Bu son cümle şaka değil, ölçülmüş bir gerçek. Malvina Nissim, Rik van Noord ve Rob van der Goot'un 2020'de yayımladığı titiz inceleme, bu analojileri değerlendiren standart kodun sessiz bir kural içerdiğini gösterdi: cevap olarak girdi kelimelerini (kral, erkek, kadın) döndürmek yasaktır. Bu kural kaldırıldığında, kral − erkek + kadın hesabının en yakın komşusu çoğu zaman "kral"ın kendisidir ve standart analoji testindeki doğruluk 0,74'ten 0,21'e düşer. Daha önce Omer Levy ve Yoav Goldberg de (2014) bu düzenliliklerin, aritmetiğin nasıl hesaplandığına hassas biçimde bağlı olduğunu ve benzer örüntülerin sinir ağı kullanmayan, eski usul sayım tabanlı vektörlerde de bulunduğunu göstermişti — sihir sinir ağında değil, dilin dağılım istatistiklerindedir. Nitekim Stanford'dan Pennington, Socher ve Manning'in 2014'te tanıttığı GloVe, hiç tahmin oyunu oynamadan, kelimelerin birlikte geçiş istatistiklerinden benzer kalitede vektörler öğrenir. Bütün bu düzeltmelerden geriye kalan dengeli tablo şudur: analoji aritmetiği reklamdaki kadar temiz çalışmaz, ama fenomen gerçektir — uzaydaki yönler gerçekten anlam farklarını kodlar; sadece bunun temiz bir "sözlük araması" olmadığını bilmek gerekir.

## Anlamın geometrisi

Artık bu makalenin ana sezgisini toplayabiliriz: embedding, anlamı geometriye çevirir. Benzer bağlamlarda geçen kelimeler uzayda yakın noktalara düşer; yakınlık benzerliğin, yönler ise anlam farklarının taşıyıcısı olur. Şekil 3'teki haritaya bak: hayvan adları bir bölgede, taşıt adları başka bir bölgede kümeleniyor; kral→kraliçe oku ile erkek→kadın oku aynı yönü gösteriyor. Ama şekildeki köşe notu süs değil: gerçek embedding uzayı yüzlerce boyutludur ve iki boyuta indirgenmiş resimler kanıt değil, sezgi aracıdır — Natalie Schluter'in 2018 tarihli uyarısı tam da budur: bu tür izdüşüm resimlerini uzayın gerçek yapısının kanıtı sanmak yanıltır.

![İki boyutlu anlam haritası: hayvan kelimeleri bir bölgede, taşıt kelimeleri başka bölgede kümelenir; kral–kraliçe ve erkek–kadın çiftleri arasındaki oklar aynı yönü gösterir; köşe notu gerçek uzayın yüzlerce boyutlu olduğunu hatırlatır.](assets/anlam-haritasi.svg "Şekil 3 — Anlam uzayının 2B izdüşümü")

Geometri fikrinin kendisi word2vec çağında kalmadı. Park, Choe ve Veitch'in 2024'te yayımladığı çalışma, "yüksek düzey kavramlar temsil uzayında yönler olarak kodlanır" iddiasını modern büyük dil modelleri için matematiksel olarak formülleştirdi — ve naif hâliyle değil, düzeltmelerle: uzaydaki doğru "benzerlik ölçüsü"nün bile göründüğü kadar basit olmadığını gösterdi. Sezgi hayatta kaldı; naif aritmetik kaldı yolda. Senin bugün bir dil modeline yazdığın her mesajın başına gelense tam olarak bu makalede kurduğumuz hattır: metin token'lara bölünür, kimlikler defterin satırlarını açar ve cümlen, anlam geometrisine yerleşmiş vektörler dizisi olarak ağın katmanlarına akar.

## Statik vektörün duvarı

Bu güzel tablonun bir duvarı var ve Türkçe bu duvarı tek kelimeyle gösterir: "yüz". Üç cümle düşün: "Yüzüme baktı." — "Yüz lira verdim." — "Denizde yüz!" Aynı yazılış, üç ayrı anlam. Oysa şimdiye dek kurduğumuz sistemde "yüz" token'ının defterde tek bir satırı var: hangi cümlede geçerse geçsin, ağa aynı vektör gider. Böyle bağlamdan bağımsız vektöre statik embedding denir ve çok anlamlı kelimeler karşısında yapısal olarak çaresizdir — tek satır, üç anlamın ortalamasında bir yerde asılı kalır.

Bu sınır alanda iyi biliniyordu; Matthew Peters ve arkadaşlarının 2018'de tanıttığı ELMo modeli, tam da çok anlamlılığı modelleyebilmek için kelime vektörünü cümlenin tamamına baktıktan sonra üretmeyi önerdi. Sınırın ne kadar keskin olduğunu ise Kawin Ethayarajh'ın 2019 tarihli ölçümü ortaya koydu: modern modellerin bağlama göre ürettiği temsillere bakıldığında, bir kelimenin temsilindeki çeşitliliğin yüzde 5'inden azı tek bir statik vektörle açıklanabiliyor. Yani anlamın ezici çoğunluğu satırda değil, cümlede yaşıyor. Demek ki defterden çektiğimiz satır, kelimenin cümleye girmeden önceki hâlidir; onu o cümledeki anlamına dönüştürecek bir mekanizma gerekir — komşu kelimelere bakıp her birini uygun ağırlıkla hesaba katan bir mekanizma. Adı dikkat mekanizması (attention); nasıl çalıştığını serinin 6. makalesinde ayrıntısıyla kuracağız.

### Sırada ne var

Dil artık ağın kapısından geçebiliyor: token'lar, kimlikler ve öğrenilen vektörler. Ama vektörler amaç değil, araç — model bu girdiyle ne yapmayı öğrenecek? Cevap, tarihin en verimli basit oyunlarından biri: sonraki kelimeyi tahmin et. 5. makalede bu oyunun kurallarını, onlarca yıllık n-gram geleneğinin neden bir duvara çarptığını ve "dil modeli" denen şeyin bu oyundan nasıl doğduğunu göreceğiz.

## Kaynakça

- Bengio, Y., Ducharme, R., Vincent, P. & Jauvin, C. (2003). *A Neural Probabilistic Language Model*. Journal of Machine Learning Research 3, 1137–1155. [Bağlantı](https://www.jmlr.org/papers/v3/bengio03a.html)
- Gage, P. (1994). *A New Algorithm for Data Compression*. The C Users Journal, Şubat 1994. [Bağlantı](https://www.derczynski.com/papers/archive/BPE_Gage.pdf)
- Sennrich, R., Haddow, B. & Birch, A. (2016). *Neural Machine Translation of Rare Words with Subword Units*. ACL 2016. [Bağlantı](https://aclanthology.org/P16-1162/)
- Radford, A., Wu, J., Child, R., Luan, D., Amodei, D. & Sutskever, I. (2019). *Language Models are Unsupervised Multitask Learners*. OpenAI teknik raporu. [Bağlantı](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- OpenAI. *tiktoken: BPE tokenizer kütüphanesi* (makaledeki Türkçe/İngilizce token ölçümlerinde kullanıldı). GitHub. [Bağlantı](https://github.com/openai/tiktoken)
- Petrov, A., La Malfa, E., Torr, P. & Bibi, A. (2023). *Language Model Tokenizers Introduce Unfairness Between Languages*. NeurIPS 2023. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2023/hash/74bb24dca8334adce292883b4b651eda-Abstract-Conference.html)
- Ahia, O., Kumar, S., Gonen, H., Kasai, J., Mortensen, D., Smith, N. & Tsvetkov, Y. (2023). *Do All Languages Cost the Same? Tokenization in the Era of Commercial Language Models*. EMNLP 2023. [Bağlantı](https://aclanthology.org/2023.emnlp-main.614/)
- Rumbelow, J. & Watkins, M. (2023). *SolidGoldMagikarp (plus, prompt generation)*. LessWrong / AI Alignment Forum (hakemli olmayan araştırma notu). [Bağlantı](https://www.lesswrong.com/posts/aPeJE8bSo6rAFoLqg/solidgoldmagikarp-plus-prompt-generation)
- Harris, Z. S. (1954). *Distributional Structure*. WORD 10(2–3), 146–162. [Bağlantı](https://www.tandfonline.com/doi/pdf/10.1080/00437956.1954.11659520)
- Firth, J. R. (1957). *A Synopsis of Linguistic Theory, 1930–1955*. Studies in Linguistic Analysis, Blackwell, Oxford. Atıf tarihçesi için: [Bağlantı](https://quoteinvestigator.com/2022/09/18/word-company/)
- Mikolov, T., Chen, K., Corrado, G. & Dean, J. (2013). *Efficient Estimation of Word Representations in Vector Space*. arXiv ön çalışması, ICLR 2013 çalıştayı. [Bağlantı](https://arxiv.org/abs/1301.3781)
- Mikolov, T., Sutskever, I., Chen, K., Corrado, G. & Dean, J. (2013). *Distributed Representations of Words and Phrases and their Compositionality*. NeurIPS 2013. [Bağlantı](https://arxiv.org/abs/1310.4546)
- Mikolov, T., Yih, W. & Zweig, G. (2013). *Linguistic Regularities in Continuous Space Word Representations*. NAACL-HLT 2013. [Bağlantı](https://aclanthology.org/N13-1090/)
- Nissim, M., van Noord, R. & van der Goot, R. (2020). *Fair Is Better than Sensational: Man Is to Doctor as Woman Is to Doctor*. Computational Linguistics 46(2), 487–497. [Bağlantı](https://aclanthology.org/2020.cl-2.7/)
- Levy, O. & Goldberg, Y. (2014). *Linguistic Regularities in Sparse and Explicit Word Representations*. CoNLL 2014. [Bağlantı](https://aclanthology.org/W14-1618/)
- Pennington, J., Socher, R. & Manning, C. D. (2014). *GloVe: Global Vectors for Word Representation*. EMNLP 2014. [Bağlantı](https://aclanthology.org/D14-1162/)
- Schluter, N. (2018). *The Word Analogy Testing Caveat*. NAACL-HLT 2018. [Bağlantı](https://aclanthology.org/N18-2039/)
- Park, K., Choe, Y. J. & Veitch, V. (2024). *The Linear Representation Hypothesis and the Geometry of Large Language Models*. ICML 2024. [Bağlantı](https://arxiv.org/abs/2311.03658)
- Peters, M. E., Neumann, M., Iyyer, M., Gardner, M., Clark, C., Lee, K. & Zettlemoyer, L. (2018). *Deep Contextualized Word Representations*. NAACL 2018. [Bağlantı](https://aclanthology.org/N18-1202/)
- Ethayarajh, K. (2019). *How Contextual are Contextualized Word Representations? Comparing the Geometry of BERT, ELMo, and GPT-2 Embeddings*. EMNLP-IJCNLP 2019. [Bağlantı](https://aclanthology.org/D19-1006/)
