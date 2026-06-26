# Anlamın Temsili: Representation Learning, Embedding ve LLM'lerde Anlamın Geometrisi

## 1. Kısa Tez

Bu belgenin merkezi iddiası şudur: Büyük dil modelleri (LLM'ler) "anlamı" insan zihnindeki gibi bir yerde saklanan bir bilgi parçası olarak barındırmaz; bunun yerine anlam, modelin katmanları boyunca **dönüşen, dağıtılmış ve geometrik bir temsil sistemi** olarak ortaya çıkar. Bir kelimenin ya da kavramın "anlamı" tek bir nöronda, tek bir vektörde veya tek bir katmanda durmaz; girdi token'larının vektörleştirilmesiyle başlayan, her transformer katmanında "okunan" ve "yazılan", giderek daha soyut özelliklere (feature) dönüşen bir süreçtir. Embedding (gömme vektörü) bir kelimenin anlamı **değildir**; istatistiksel olarak öğrenilmiş, görev için kullanışlı bir **işlevsel temsildir**. Bu ayrımı ciddiye almak, "vektör uzayı = modelin zihni" ya da "iki kelime yakınsa model onları insan gibi anlıyor" gibi yaygın yanlış basitleştirmelerden kurtulmanın ön koşuludur.

Belge boyunca iki büyük gerilim hattını izleyeceğiz: (1) "Embedding anlamdır" görüşü ile "embedding işlevsel/istatistiksel temsildir" görüşü arasındaki gerilim; (2) **benzerlik tabanlı açıklama** (iki temsil yakın, demek ki ilişkili) ile **nedensel mekanizma açıklaması** (bu temsil yönü, modelin çıktısını fiilen şu şekilde değiştiriyor) arasındaki gerilim. Modern yorumlanabilirlik (interpretability) araştırması, ikincinin birincisinden daha güçlü ve daha güvenilir bir anlama biçimi olduğunu giderek netleştirmektedir.

## 2. Konunun Neden Önemli Olduğu

LLM'lerin yaygınlaşmasıyla birlikte "model şunu biliyor", "model bunu anlıyor", "model şu kavramı temsil ediyor" gibi ifadeler hem popüler basında hem de teknik tartışmalarda yoğun şekilde kullanılıyor. Bu ifadelerin çoğu, altında yatan teknik gerçekle gevşek bir ilişki içinde. Konuyu kavramsal olarak sağlam bir zeminde anlamak üç açıdan kritik:

**Birincisi, epistemik dürüstlük açısından.** Bir modelin bir özelliği "temsil ettiğini" söylemek ile o özelliği "kullandığını" söylemek farklı iddialardır. Probing (yoklama) literatüründeki en temel uyarı tam da budur: bir özelliğin temsilden tahmin edilebilmesi (korelasyon), modelin o özelliği davranışında fiilen kullandığı (nedensellik) anlamına gelmez.

**İkincisi, AI güvenliği ve denetlenebilirlik açısından.** Eğer bir modelin "ne düşündüğünü" anlamak istiyorsak, temsillerin nasıl yapılandığını anlamak zorundayız. Anthropic'in sparse autoencoder (seyrek otokodlayıcı) çalışmaları, "aldatma", "yalakalık" veya "tehlikeli içerik" gibi soyut özelliklerin temsil uzayında bulunabileceğini ve hatta bunlara müdahale edilerek modelin davranışının yönlendirilebileceğini göstererek bu meselenin pratik güvenlik boyutunu ortaya koydu.

**Üçüncüsü, bilimsel netlik açısından.** Embedding, feature, latent space, manifold, superposition gibi terimler sıklıkla birbirine karıştırılır. Bu terimler birbiriyle ilişkilidir ama eş anlamlı değildir. Bunları ayırt edebilmek, okuyucunun kaynakları daha bilinçli okumasını ve daha iyi sorular sormasını sağlar.

## 3. Temel Kavramlar

Bu bölümde her terimi ilk geçtiği yerde önce sezgisel olarak, sonra teknik olarak tanımlıyoruz.

**Temsil (representation).** En genel anlamda, bir veri parçasının (kelime, görüntü, ses) model tarafından işlenebilecek sayısal bir biçime dönüştürülmüş halidir. Genellikle bir gerçek sayı vektörüdür. Önemli olan nokta: temsil, verinin kendisi değil, verinin belirli özelliklerini vurgulayan, başka özelliklerini bastıran bir *yeniden kodlamasıdır*.

**Representation learning (temsil öğrenme).** Verinin yararlı temsillerini elle tasarlanmış özellikler (feature engineering) yerine doğrudan veriden öğrenme yaklaşımıdır. Bengio, Courville ve Vincent'in 2013 tarihli temel derlemesi (*Representation Learning: A Review and New Perspectives*, IEEE TPAMI), makine öğrenmesi algoritmalarının başarısının büyük ölçüde veri temsiline bağlı olduğunu varsayar — çünkü farklı temsiller verinin ardındaki "açıklayıcı değişim faktörlerini" (explanatory factors of variation) az ya da çok gizleyebilir veya açığa çıkarabilir. Derin öğrenme, bu temsil öğrenmenin çok katmanlı bir biçimidir: her katman bir öncekinin üzerine daha soyut bir temsil inşa eder.

**Embedding (gömme vektörü).** Ayrık bir nesnenin (örneğin bir kelime ya da token) sürekli, yoğun (dense) bir vektör uzayındaki karşılığıdır. "Gömme" terimi, ayrık nesneleri sürekli bir geometrik uzaya "gömmemizden" gelir. Kritik nokta: embedding'in tek tek boyutları genellikle insan tarafından isimlendirilebilir bir anlam taşımaz; anlam, vektörlerin birbirine göre geometrik ilişkisinde (yakınlık, yön) kodlanır.

**Latent space (gizli/saklı uzay).** Modelin verisini içine yerleştirdiği, doğrudan gözlemlenemeyen ama modelin iç hesaplamalarını barındıran soyut vektör uzayıdır. "Latent" (gizli) sıfatı, bu uzayın boyutlarının verinin gözlemlenen yüzeyinde doğrudan görünmeyen, ardındaki örtük faktörlere karşılık gelmesinden kaynaklanır. Embedding uzayı bir tür latent uzaydır.

**Feature (özellik).** Bu terim iki farklı düzeyde kullanılır ve karıştırılmaması gerekir. Klasik anlamda feature, verinin ölçülebilir bir niteliğidir (bir görüntüdeki kenar, bir metindeki kelime sıklığı). Mekanistik yorumlanabilirlik bağlamında ise feature, modelin aktivasyon uzayında bir **yön** (direction) olarak temsil ettiği, yorumlanabilir bir kavram veya örüntüdür. Bu ikinci anlam, "linear representation hypothesis" tartışmasının merkezindedir.

**Manifold (manifold/çokkatlı).** Yüksek boyutlu bir uzayın içine gömülü, yerel olarak daha düşük boyutlu bir yüzeydir. Sezgi: bir kâğıt parçası iki boyutludur, ama buruşturup üç boyutlu bir kutuya koyduğunuzda hâlâ özünde iki boyutlu bir nesnedir.

**Superposition (üst üste bindirme).** Bir nöral ağın, sahip olduğu boyut sayısından daha fazla özelliği temsil etmesi olgusudur — özellikler birbirine tam dik (orthogonal) olmayan yönlere "sıkıştırılır".

**Polysemantic neuron (çok-anlamlı nöron).** Birbiriyle alakasız birden fazla kavrama tepki veren nöron. Superposition'ın doğrudan bir sonucudur.

## 4. Teknik Arka Plan: Dağılımsal Anlamsallıktan Modern Embeddinglere

### 4.1 Dağılımsal hipotez: anlamın istatistiksel kökeni

Modern embeddinglerin kavramsal temeli 1950'lerin dilbilimine dayanır. Zellig Harris'in 1954 tarihli "Distributional Structure" makalesi (*WORD*, 10(2-3)) **dağılımsal hipotezi** (distributional hypothesis) formüle eder: dilbilimsel öğeler dağılım örüntülerine göre eşdeğerlik sınıflarına ayrılabilir, ve dağılım benzerliği anlam benzerliğine karşılık gelir. Harris'in çekirdek iddiası şudur: "A ve B kelimelerini (ya da biçimbirimlerini) anlamca A ve C'den daha farklı kabul edersek, çoğu zaman A ile B'nin dağılımlarının da A ile C'nin dağılımlarından daha farklı olduğunu görürüz." J.R. Firth'in 1957 tarihli "A Synopsis of Linguistic Theory, 1930–1955" çalışmasındaki ünlü aforizması bunu özetler: "You shall know a word by the company it keeps" (Bir kelimeyi, etrafındaki arkadaşlarından tanırsın).

Bu fikrin felsefi açıdan radikal yanı şudur: anlam, kelimenin "içinde" bulunan bir öz değil, kelimenin diğer kelimelerle olan **ilişki örüntüsüdür**. Bu, "embedding anlamdır" görüşünün hem en güçlü dayanağı hem de en büyük sınırıdır — çünkü yakaladığı şey, gerçek dünya göndergesi (reference) ya da nedensel kavrayış değil, *kullanım istatistiğidir*.

### 4.2 Word2Vec ve statik embeddinglerin doğuşu

2013'te Tomas Mikolov ve ekibinin Google'da geliştirdiği Word2Vec, dağılımsal hipotezi ölçeklenebilir bir sinir ağı yöntemine dönüştürdü. Temel fikir şaşırtıcı derecede basitti: sığ bir sinir ağını, bir kelimeyi komşularından (ya da komşularını kelimeden) tahmin etmeye eğitin, sonra tahmin katmanını atın ve geriye kalan iç ağırlıkları — yani embeddingleri — saklayın. Bu embeddingler, kelimeleri 100-300 boyutlu bir uzayda temsil eder.

Word2Vec'in ünlü özelliği **vektör aritmetiğiydi**: `kral - adam + kadın ≈ kraliçe` gibi analojiler vektör toplama/çıkarma ile çözülebiliyordu. Bu sonuç o kadar çarpıcıydı ki embeddinglerin "anlamı yakaladığı" fikrinin sembolü haline geldi. Ancak bu örnek aynı zamanda alanın en yaygın yanlış anlamalarından birinin de kaynağı oldu (bkz. Bölüm 9).

**Kritik teknik nokta:** Word2Vec embeddingleri **statiktir** (static embeddings). Her kelime, bağlamından bağımsız olarak tek bir sabit vektöre sahiptir. "Banka" kelimesi, ister "nehir kıyısı" ister "para yatırma" bağlamında geçsin, aynı vektörle temsil edilir. Bu, çok-anlamlılık (polysemy) karşısında temel bir sınırlamadır.

### 4.3 Statik embeddingden bağlamsal embeddinge geçiş

Bu sınırlamayı aşmak için **bağlamsal embeddingler** (contextual embeddings) geliştirildi. İlk büyük sıçrama ELMo (Peters et al., 2018) oldu: çift yönlü LSTM ağları kullanarak, bir kelimenin vektörünü içinde geçtiği cümleye göre dinamik olarak üretti. Hemen ardından gelen BERT (Devlin et al., 2019), transformer mimarisini ve maskeli dil modellemesini kullanarak bunu daha da ileri taşıdı.

Bağlamsal embeddinglerin geometrisi üzerine yapılan önemli bir çalışma (Ethayarajh, 2019, "How Contextual are Contextualized Word Representations?", EMNLP-IJCNLP) çarpıcı bir bulgu ortaya koydu. Makalenin verbatim ifadesiyle: "In no layer of any model can more than 5% of the variance in a word's contextualized representations be explained by a static embedding" — yani ELMo, BERT ve GPT-2'nin *hiçbir* katmanında, bir kelimenin bağlamsallaştırılmış temsillerindeki varyansın %5'inden fazlası, o kelime için statik bir embedding ile açıklanamıyordu. Yazarın blog açıklamasıyla: eğer bir kelimenin bağlamsal temsilleri hiç bağlamsal olmasaydı, varyanslarının %100'ünün statik bir embedding ile açıklanmasını beklerdik; oysa %5'ten azı açıklanabiliyor. Bağlamsal temsiller, statik embeddinglerin yakalayamadığı muazzam miktarda bağlama özgü bilgi taşır. Aynı çalışma, üst katmanların alt katmanlara göre daha bağlama-özgü temsiller ürettiğini gösterdi — bu, anlamın katmanlar boyunca dönüştüğü fikrinin erken ve güçlü bir kanıtıydı.

## 5. Ana Mekanizma: Anlam Neden Tek Bir Yerde Değil, Katmanlar Boyunca Dönüşen Bir Sistemdir?

Bu bölüm, belgenin merkezi sorusuna doğrudan yanıt verir.

### 5.1 Residual stream: paylaşılan bir bellek otoyolu

Bir transformer dil modeli, yığılmış katmanlardan oluşur. Her katmanda iki ana blok vardır: çok-başlı dikkat (multi-head attention) ve ileri beslemeli ağ (feed-forward network, MLP). Bu blokları birbirine bağlayan temel iletişim kanalı **residual stream** (artık akışı) olarak adlandırılır.

Mekanistik yorumlanabilirlik literatürünün ortaya koyduğu görüntü şudur (Elhage et al., 2021, "A Mathematical Framework for Transformer Circuits"): residual stream, katmanlar arasında paylaşılan, darboğazlı bir bellek gibi davranır. Her blok bu akıştan girdisini "okur" ve çıktısını akışa geri "yazar" (toplama yoluyla). Önemli olan: residual stream'e yalnızca toplama işlemi uygulanır; bu yüzden başlangıç temsili, katman katman eklenen "delta"larla giderek rafine edilir.

Bu mimari, sorumuzun yanıtının özünü içerir. Token'ın başlangıç embedding'i, residual stream'in ilk halidir. Her katman, bu temsile bir şeyler ekleyerek onu dönüştürür: önce yüzeysel sözdizimsel bilgiler, sonra giderek daha soyut anlamsal ilişkiler. Anlam, herhangi bir tek noktada "depolanmaz"; akış boyunca **biriken ve dönüşen** bir hesaplamanın ürünüdür.

### 5.2 Logit lens: anlamın evrimini gözlemlemek

Bu dönüşümü doğrudan gözlemlemenin bir yolu **logit lens** tekniğidir (nostalgebraist, 2020). Transformer çıktıyı, son gizli duruma normalleştirme ve "unembedding" matrisi uygulayarak üretir. Logit lens, bu sabit yapıyı *herhangi* bir ara katmana uygulamayı önerir. Sonuç çarpıcıdır: residual stream'i modelin yarısında alıp doğrudan çözerseniz, anlamsız değil, modelin nihai tahmininin kaba bir yaklaşımını elde edersiniz. Tahmin, katman katman "genel ve belirsiz" halden "spesifik ve kendinden emin" hale evrilir. Bu, anlamın tek bir yerde durmadığının, katmanlar boyunca kademeli olarak inşa edildiğinin doğrudan ampirik kanıtıdır.

### 5.3 Çok-adımlı muhakeme: Dallas → Texas → Austin

Anthropic'in 2025 tarihli "On the Biology of a Large Language Model" çalışması (Lindsey, Ameisen et al.) bu dönüşümün somut bir örneğini sunar. Claude 3.5 Haiku'ya "Dallas şehrini içeren eyaletin başkenti nedir?" sorusu sorulduğunda, model "kafasının içinde" iki-adımlı (two-hop) muhakeme yapar. Makalenin verbatim ifadesiyle: "the model performs 'two-hop' reasoning 'in its head' to identify that 'the capital of the state containing Dallas' is 'Austin.' We can see and manipulate an internal step where the model represents 'Texas'." Yani bir "Dallas" özelliği aktive olur → bu içsel bir "Texas" temsilini tetikler → bu da "Austin" yanıtını üretir. Çalışmanın en güçlü yanı nedensel müdahaledir: araştırmacılar "Texas" özelliklerini "California" ile değiştirdiğinde, model "Sacramento" (California'nın başkenti) üretir. Model "Dallas"tan doğrudan yanıta atlamaz; manipüle edilebilir ara temsiller üzerinden bir yol izler. Bu, anlamın katmanlar boyunca dönüşen, ara duraklardan geçen ve müdahale edilebilen bir hesaplama olduğunun en net gösterimlerinden biridir.

### 5.4 Özetle: sorunun yanıtı

LLM'lerde anlam tek bir yerde saklanan bir bilgi değildir çünkü: (1) Temsil, residual stream boyunca her katmanda eklenen katkılarla sürekli yeniden şekillenir. (2) Aynı token'ın temsili, bağlamına ve bulunduğu katmana göre kökten farklıdır (Ethayarajh'ın %5 bulgusu). (3) Bir kavram (örneğin "Texas") tek bir nöronda değil, aktivasyon uzayında dağıtılmış bir yön olarak kodlanır ve diğer kavramlarla superposition halinde aynı boyutları paylaşır. (4) Bir sorunun yanıtı, birbirini tetikleyen ara özelliklerin oluşturduğu bir devre (circuit) boyunca akan ve müdahale edilebilen bir hesaplamadır. Dolayısıyla anlam, statik bir "depo" değil, dinamik bir **dönüşüm sistemidir**.

## 6. Akademik Tartışmalar

### 6.1 Manifold hipotezi ve genelleme

**Manifold hipotezi**, gerçek dünyadaki yüksek boyutlu verilerin aslında çok daha düşük boyutlu manifoldlar üzerinde yoğunlaştığını öne sürer. Bir görüntü milyonlarca piksel boyutuna sahip olabilir, ama anlamlı insan yüzleri bu devasa uzayın çok küçük, yapılandırılmış bir alt kümesinde yer alır.

Bu hipotez, temsil öğrenmede neden önemlidir? Çünkü genellemenin (generalization) nasıl mümkün olduğunu açıklar. Makine öğrenmesi modelleri, potansiyel girdi uzaylarının yalnızca görece basit, düşük boyutlu, yüksek yapılandırılmış alt uzaylarına (latent manifoldlar) uymak zorundadır. Bir manifold içinde, iki girdi arasında interpolasyon yapmak — birini diğerine sürekli bir yol boyunca dönüştürmek — her zaman mümkündür. Bu interpolasyon yeteneği, derin öğrenmede genellemenin anahtarıdır. Model, her veri noktasını ezberlemek yerine manifoldun *şeklini* öğrenir; böylece daha önce görmediği noktalara da makul yanıtlar verebilir. Fefferman, Mitter ve Narayanan'ın 2016 tarihli "Testing the Manifold Hypothesis" çalışması, bu hipotezi formel bir test problemi olarak ele alır ve düşük boyutlu yapının tipik olarak fiziksel yasaların getirdiği kısıtlamalardan kaynaklandığını vurgular.

### 6.2 Linear representation hypothesis

**Linear representation hypothesis** (doğrusal temsil hipotezi), yüksek seviyeli kavramların temsil uzayında **doğrusal yönler** (directions) olarak kodlandığını öne sürer. Park, Choe ve Veitch'in 2023 tarihli çalışması (*The Linear Representation Hypothesis and the Geometry of Large Language Models*) bu hipotezi karşıolgusal (counterfactual) çiftler cinsinden formelleştirir: "metin Fransızca mı İngilizce mi?", "geçmiş zaman mı şimdiki zaman mı?", "kişi erkek mi kadın mı?" gibi kavramlar uzayda yönlere karşılık gelir. Hipotez doğruysa, bu yönleri hesaplayarak temsilleri yorumlayabilir veya bu yönlere müdahale ederek davranışı kontrol edebiliriz.

Bu fikrin cazibesi pratiktir: doğruysa, yorumlama ve kontrol görevleri basit doğrusal cebir işlemlerine indirgenebilir. Hipotez, Mikolov'un 2013'teki vektör aritmetiği gözlemlerine kadar uzanan bir soy ağacına sahiptir ve modern mekanistik yorumlanabilirliğin temel varsayımlarından biridir. Park et al., LLaMA-2 modelinde doğrusal kavram yönlerinin varlığını ampirik olarak gösterdi ve bunların hem doğrusal probe'lar (measurement) hem de model steering (kontrol) ile erişilebildiğini kanıtladı.

**Ancak hipotez evrensel değildir.** Engels ve arkadaşlarının 2024 tarihli çalışması (*Not All Language Model Features Are One-Dimensionally Linear*, ICLR) önemli bir karşı örnek sunar: bazı temsiller özünde **çok boyutludur**. Makalenin verbatim ifadesiyle, GPT-2 ve Mistral 7B'de "circular features representing days of the week and months of the year" (haftanın günleri ve yılın aylarını temsil eden dairesel özellikler) bulundu ve "we identify tasks where these exact circles are used to solve computational problems involving modular arithmetic" (bu dairelerin modüler aritmetik problemlerini çözmek için fiilen kullanıldığı görevler) tespit edildi. Bu nedensel kullanım Mistral 7B ve Llama 3 8B üzerindeki müdahale deneyleriyle doğrulandı; yazarlar "we are the first to find causal circular representations of concepts in a language model" diyerek bunu bir dil modelinde kavramların nedensel dairesel temsillerini bulan ilk çalışma olarak konumlandırır. Bu, "her kavram tek boyutlu bir doğrusal yöndür" iddiasını zayıflatır.

### 6.3 Superposition ve polysemantic nöron problemi

İdeal bir dünyada, bir sinir ağının her nöronu tek, temiz bir kavrama karşılık gelirdi. Pratikte ise, özellikle büyük dil modellerinde, nöronların temiz kavramlara karşılık gelmesi nadirdir. Çoğu nöron **polysemantic**'tir — birbiriyle alakasız birçok kavrama tepki verir.

Anthropic'in 2022 tarihli "Toy Models of Superposition" çalışması (Elhage et al.) bu olguya teorik bir açıklama getirdi. Temel bulgu: bir model, sahip olduğu boyut sayısından daha fazla özelliği temsil etmek istediğinde, bunları **superposition** halinde kodlar — özellikler birbirine tam dik olmayan yönlere sıkıştırılır. Bu, özellikler **seyrek** (sparse) olduğunda (yani nadiren aynı anda aktif olduklarında) verimli bir stratejidir, çünkü nadiren çakışan iki özellik aynı boyutu paylaşabilir. Bedeli ise "interference" (girişim) — özellikler birbirine karışır ve bu karışımın doğrusal olmayan bir filtreleme (ReLU gibi) ile temizlenmesi gerekir.

Çalışma ayrıca superposition'ın bir **faz değişimi** (phase change) ile yönetildiğini ve özellikleri düzgün politoplar (digonlar, üçgenler vb.) gibi geometrik yapılara organize ettiğini gösterdi. Bu, polysemantic nöron probleminin "neden" var olduğunun temiz bir açıklamasıdır: polysemanticity, modelin sınırlı boyutda daha fazla bilgi sıkıştırma çabasının doğrudan sonucudur.

### 6.4 Sparse autoencoder / dictionary learning: superposition'ı çözmek

Eğer özellikler superposition halinde gizliyse, onları nasıl geri çıkarabiliriz? Anthropic'in cevabı **dictionary learning** (sözlük öğrenme), özellikle de **sparse autoencoder** (seyrek otokodlayıcı, SAE) yöntemidir.

2023 tarihli "Towards Monosemanticity" çalışmasında (Bricken et al.), tek katmanlı bir transformer'ın 512-nöronlu MLP katmanının aktivasyonları, bir SAE ile yorumlanabilir özelliklere ayrıştırıldı. Makalenin verbatim ifadesiyle: "we decompose a layer with 512 neurons into more than 4000 features which separately represent things like DNA sequences, legal language, HTTP requests, Hebrew text, nutrition statements" — yani 512 nöronlu bir katman, DNA dizileri, hukuki dil, HTTP istekleri, İbranice metin gibi şeyleri ayrı ayrı temsil eden 4000'den fazla özelliğe ayrıştırıldı. Bu özellikler, nöron temelinde "görünmez" olan görece monosemantic (tek-anlamlı) birimlerdi. İnsan değerlendiriciler bu özelliklerin yaklaşık %70'ini gerçekten yorumlanabilir buldu — bu, nöron-temelli yaklaşımlardan belirgin biçimde daha iyiydi.

2024'teki devam çalışması "Scaling Monosemanticity" (Templeton et al.), bu yöntemi üretim ölçeğindeki bir modele — Claude 3 Sonnet'e (4 Mart 2024 sürümü) — ölçeklendirdi. Üç farklı boyutta SAE eğitildi. Makalenin verbatim ifadesiyle: "We trained sparse autoencoders with up to 34 million features on the model's middle layer residual stream, using scaling laws to guide hyperparameter selection." Yani SAE'ler yaklaşık 1 milyon, 4 milyon ve 34 milyon özellik boyutlarında, modelin **orta katmanının residual stream'i** üzerinde, hiperparametre seçimini ölçek yasalarıyla (scaling laws) yöneterek eğitildi. (34 milyon özellikli SAE'de eğitim sonrası yaklaşık 12 milyon özellik "alive" kaldı; geri kalanı "dead" oldu — bu, SAE'lerin pratik bir sınırlamasına işaret eder.) Çıkan özellikler çok dilli ve çok modluydu — yazarların ifadesiyle "multilingual and multimodal (generalizing to images despite text-only training)" — yani metin üzerinde eğitilmiş olmalarına rağmen görüntülere de genelleniyorlardı; hem somut örneklere hem de soyut tartışmalara tepki veriyordu.

En ünlü gösterim "Golden Gate Bridge" (Altın Kapı Köprüsü) özelliğiydi: bu özellik yapay olarak maksimum değerinin yaklaşık 10 katına zorlandığında (clamping), Claude kendisini "I am the Golden Gate Bridge, a famous suspension bridge that spans the San Francisco Bay" diyerek Altın Kapı Köprüsü olarak tanımlamaya başlıyordu. Bu, bir özelliğin yalnızca tespit edilmediğini, aynı zamanda davranışı **nedensel olarak** yönlendirdiğini gösteren güçlü bir kanıttı. (Bir uyarı: kritikler, bu özelliğin yalnızca çok yüksek aktivasyonlarda "Altın Kapı Köprüsü" kavramına temiz biçimde karşılık geldiğini; medyan aktivasyon örneklerinde sıklıkla ilgisiz olduğunu belirtir. İsim, en yüksek aktive eden örnekleri yansıtır.)

### 6.5 Benzerlik mi, nedensellik mi? Probing tartışması

Temsil çalışmalarının en derin metodolojik tartışması, **benzerlik tabanlı açıklama** ile **nedensel mekanizma açıklaması** arasındaki ayrımdır.

Probing (yoklama) klasik yöntemdir: modelin temsillerinden bir özelliği (örneğin sözdizimsel bir kategori) tahmin etmek için bir sınıflandırıcı eğitirsiniz. Sınıflandırıcı yüksek doğruluk elde ederse, modelin o özelliği "temsil ettiği" söylenir. Ancak bu yaklaşımın temel eleştirisi şudur (Hewitt & Liang 2019; Belinkov 2022, "Probing Classifiers: Promises, Shortcomings, and Advances"): **korelasyon nedensellik değildir.** Bir özelliğin temsilden tahmin edilebilmesi, modelin o özelliği davranışında fiilen *kullandığı* anlamına gelmez. Sınıflandırıcı, modelin kullanmadığı tesadüfi örüntüleri de yakalayabilir.

Bu endişeye yanıt olarak **causal probing** (nedensel yoklama) geliştirildi: özelliği temsilden kaldırmak veya değiştirmek (intervention) ve bunun modelin çıktısı üzerindeki etkisini ölçmek. Ancak causal probing'in kendisi de tartışmalıdır; Canby, Davies ve arkadaşlarının 2024 çalışması (*Measuring the Reliability of Causal Probing Methods*), müdahale yöntemlerinin güvenilirliğinin büyük ölçüde değiştiğini, özellikle "nullifying" (sıfırlayan) müdahalelerin ciddi sınırlamalara sahip olduğunu, buna karşılık karşıolgusal (counterfactual) müdahalelerin daha güvenilir olduğunu gösterdi. Genel bir eleştiri de şudur: müdahaleler latent özellikler düzeyinde çalışır ve hiçbir gerçek girdiye karşılık gelmeyen (off-manifold) embeddingler üretebilir. Bu tartışma, "model bir şeyi temsil ediyor" demenin ne kadar dikkatli yapılması gereken bir iddia olduğunu vurgular.

### 6.6 Platonic representation hypothesis

Daha spekülatif ama etkili bir tartışma, MIT'den Huh, Cheung, Wang ve Isola'nın 2024 tarihli **Platonic Representation Hypothesis** çalışmasıdır (ICML). İddia: farklı mimarilerle, farklı verilerle ve hatta farklı modalitelerle (görüntü ve metin) eğitilen AI modelleri, temsil uzaylarında giderek **yakınsıyor** (converging). Modeller büyüdükçe, veri noktaları arasındaki mesafeyi giderek daha benzer biçimlerde ölçüyorlar. Yazarlar bunun, verinin ardındaki gerçekliğin paylaşılan istatistiksel bir modeline doğru bir yakınsama olduğunu öne sürerler.

Bu bir **pozisyon makalesidir** (position paper) — kesin bir kanıt değil, bir hipotez ve onu destekleyen gözlemler sunar. Yazarların kendileri sınırlamaları ve karşı örnekleri tartışır: örneğin farklı sensörler/modaliteler farklı bilgi yakalayabilir ve bu, özdeş temsillere yakınsamayı engelleyebilir. Yakınsama esas olarak çok-görevli, büyük modeller için ve görüntü-dil modaliteleri arasında gösterilmiştir; dar/özel modeller için geçerli değildir. Quanta Magazine'in 7 Ocak 2026 tarihli kapsamlı incelemesi, hipotezin canlı bir tartışma ve bir dizi takip çalışması başlattığını belgeliyor. Bu hipotez, "embedding işlevsel temsildir" görüşüyle ilginç bir gerilim içindedir: eğer temsiller gerçekten ortak bir gerçeklik modeline yakınsıyorsa, belki de salt işlevsellikten daha fazlasını yakalıyorlardır — ama bu henüz açık bir sorudur.

## 7. Güçlü Bulgular (Sağlam Kaynaklarla Desteklenenler)

Aşağıdaki bulgular, birden fazla bağımsız kaynak ve güçlü ampirik kanıtla desteklenmektedir:

1. **Bağlamsal temsiller statik embeddinglerden kökten farklıdır.** Ethayarajh (2019), hiçbir katmanda bir kelimenin bağlamsal temsillerindeki varyansın %5'inden fazlasının statik embedding ile açıklanamadığını gösterdi. Bu, anlamın bağlama göre dönüştüğünün sağlam kanıtıdır.

2. **Superposition gerçek, gözlemlenmiş bir olgudur.** "Toy Models of Superposition" çalışması, modellerin boyut sayısından fazla özelliği nasıl ve ne zaman temsil ettiğini kontrollü koşullarda gösterdi; superposition'ın bir faz değişimiyle yönetildiğini ortaya koydu.

3. **Sparse autoencoder'lar nöronlardan daha yorumlanabilir özellikler çıkarır ve bu özellikler davranışı nedensel olarak etkiler.** "Towards Monosemanticity" (512 nöron → 4000+ özellik, ~%70 yorumlanabilir) ve "Scaling Monosemanticity" (Claude 3 Sonnet'te 34 milyona kadar özellik), bunu hem küçük hem de üretim ölçeğindeki modellerde gösterdi. Golden Gate Bridge steering deneyi, nedensel etkinin somut kanıtıdır.

4. **Transformer'lar anlamı katmanlar boyunca kademeli olarak rafine eder.** Logit lens, residual stream'in ara durumlarının modelin tahminini kademeli olarak inşa ettiğini gösterir. "On the Biology of a Large Language Model", çok-adımlı muhakemenin (Dallas → Texas → Austin) ara özellikler üzerinden aktığını ve bu ara temsillere müdahale edilebildiğini attribution graph'larla ortaya koydu.

5. **Bazı yüksek seviyeli kavramlar doğrusal yönler olarak kodlanır.** Park et al. (2023), LLaMA-2'de doğrusal kavram yönlerinin varlığını ampirik olarak gösterdi; bu yönler hem probing hem de steering ile erişilebilir.

## 8. Zayıf / Tartışmalı Noktalar

1. **Linear representation hypothesis evrensel değildir.** Engels et al. (2024), dairesel/çok boyutlu özelliklerin varlığını ve nedensel kullanımını gösterdi. Tüm kavramların tek boyutlu doğrusal yönler olduğu iddiası artık savunulamaz.

2. **SAE'lerin bulduğu özelliklerin "doğru" analiz birimi olup olmadığı tartışmalıdır.** Leask et al. (2025, *Sparse Autoencoders Do Not Find Canonical Units of Analysis*) gibi çalışmalar, SAE'lerin kanonik (tek doğru) özellik kümeleri bulmadığını öne sürer. "Feature splitting" (özellik bölünmesi) olgusu — geniş bir kavramın (örneğin "noktalama işaretleri") birçok dar latent'e parçalanması — sözlük boyutuna bağlı bir artefakttır ve davranışsal olarak ilgili soyut kategoriye karşılık gelmeyebilir.

3. **SAE'lerin sınırlamaları giderek belgeleniyor.** 2025-2026 çalışmaları, SAE nöronlarının önemli bir kısmının düşük yorumlanabilirlik veya düşük steerability sergilediğini, kullanıcının istediği kavramların sıklıkla SAE'de bulunmadığını gösteriyor. Ölü (dead) latent oranının yüksekliği (Claude 3 Sonnet'in 34M SAE'sinde ~%65) ve sparsity regülarizasyonunun yorumlanabilirliğin yalnızca bir *vekili* (proxy) olması, bu yöntemin doğrudan bir yorumlanabilirlik ölçüsü olmadığını hatırlatır.

4. **Causal probing yöntemlerinin güvenilirliği değişkendir.** Müdahalelerin gerçekten modelin kullandığı temsilleri mi yoksa anlamsız (off-manifold) embeddingler mi ürettiği açık bir sorudur.

5. **Platonic representation hypothesis bir hipotezdir, kanıtlanmış değildir.** Yakınsama yalnızca çok-görevli, büyük modeller için ve esas olarak görüntü-dil modaliteleri arasında gösterilmiştir; dar/özel modeller için geçerli değildir.

6. **"Feature" kavramının kendisi henüz tam tanımlı değildir.** Superposition'ın yeni teorileri (örneğin 2026'daki "Spectral Superposition" ve veri korelasyonlarının özellik geometrisini şekillendirdiğini gösteren çalışmalar), seyrek doğrusal ayrıştırmanın önemli yapısal bilgiyi attığını öne sürüyor. Bu alan aktif olarak değişmektedir.

## 9. Yanlış Anlaşılan Noktalar

**Yanlış 1: "Vektör uzayı = modelin zihni."** Embedding uzayı, modelin hesaplamalarının yapıldığı bir araçtır, bir "zihin" değildir. Anlam tek bir uzayda durmaz; residual stream boyunca dönüşen bir süreçtir. Üstelik aynı modelin farklı katmanlarında farklı "uzaylar" vardır ve token'ın temsili her katmanda değişir.

**Yanlış 2: "İki kelime yakınsa model onları insan gibi anlıyor."** Geometrik yakınlık, dağılımsal benzerliği (benzer bağlamlarda geçme) yansıtır, insani kavrayışı değil. Model, "doktor" ve "hemşire"yi yakın temsil edebilir — ama bu yakınlık eğitim verisindeki istatistiksel örüntülerden gelir ve cinsiyet stereotipleri gibi önyargıları da içerir (`doktor - adam + kadın ≈ hemşire`).

**Yanlış 3: "Her feature insanın isimlendirebileceği temiz bir kavrama denk gelir."** Superposition nedeniyle çoğu nöron polysemantic'tir. SAE'ler daha temiz özellikler çıkarsa da, bunların önemli bir kısmı yorumlanamaz, çok boyutludur veya yapay olarak bölünmüştür. "Golden Gate Bridge feature" adı bile, özelliğin yalnızca en yüksek aktivasyonlarda bu kavrama temiz biçimde karşılık geldiği gerçeğini gizler.

**Yanlış 4: "Embedding tek başına model davranışını açıklar."** Girdi embedding'i, hesaplamanın yalnızca başlangıç noktasıdır. Davranış, dikkat başlıkları, MLP katmanları ve residual stream boyunca akan devreler tarafından belirlenir. Statik embedding'e bakarak modelin ne yapacağını açıklamak, bir filmin ilk karesine bakarak konusunu anlatmaya benzer.

**Yanlış 5: "kral - adam + kadın = kraliçe, embeddinglerin anlamı mükemmel yakaladığının kanıtıdır."** Bu örnek alanın en aşırı abartılan iddiasıdır. Linzen (2016, *Issues in Evaluating Semantic Spaces Using Word Analogies*) ve diğerlerinin gösterdiği gibi: (a) Bu hesabın "işe yaraması" için üç kaynak kelimenin (kral, adam, kadın) olası yanıtlar kümesinden *dışlanması* gerekir; aksi halde en yakın vektör genellikle "kral"ın kendisidir. (b) Cinsiyet (erkek-kadın) analojileri istisnai derecede iyi çalışır, ama analoji türlerinin çoğunda performans zayıftır. Yani bu, kuraldan çok istisnadır.

## 10. Kavramsal Harita

Terimler arasındaki ilişkileri netleştirmek için:

- **Representation learning** en geniş şemsiye kavramdır: veriden yararlı temsiller öğrenme yaklaşımı. NLP, görü (vision) ve çok modlu (multimodal) modellerde ortak rolü vardır — hepsi elle tasarlanmış özellikler yerine öğrenilmiş temsillere dayanır.
- **Embedding**, bir temsil türüdür: ayrık nesnelerin sürekli vektör uzayına gömülmesi. Statik (Word2Vec) ve bağlamsal (BERT, GPT) olarak ikiye ayrılır.
- **Latent space**, embeddinglerin ve diğer iç temsillerin yaşadığı soyut uzaydır.
- **Manifold**, bu latent uzay içinde verinin yoğunlaştığı düşük boyutlu yüzeydir; genellemeyi açıklar.
- **Feature**, modelin temsil ettiği yorumlanabilir bir kavram/yöndür. **Linear representation hypothesis**, feature'ların doğrusal yönler olduğunu iddia eder; ama bazı feature'lar (günler, aylar) çok boyutlu/daireseldir.
- **Superposition**, modelin boyut sayısından fazla feature'ı sıkıştırma stratejisidir; **polysemantic nöron** bunun sonucudur.
- **Sparse autoencoder / dictionary learning**, superposition'ı çözmeye (feature'ları geri çıkarmaya) çalışan yöntemdir.

Çok modlu bağlantı: CLIP (Radford et al., 2021) gibi modeller, görüntü ve metni *ortak* bir embedding uzayına gömerek representation learning'in modaliteler arası ortak rolünü gösterir — eşleşen görüntü-metin çiftleri yakın, eşleşmeyenler uzak olacak şekilde kontrastif (contrastive) olarak eğitilir. "Scaling Monosemanticity"de bulunan özelliklerin metin üzerinde eğitilmelerine rağmen görüntülere genellenmesi, bu ortak temsil fikrinin LLM'lerin içinde de geçerli olduğuna işaret eder.

## 11. 2026 İtibariyle Durum

2026 ortası itibariyle alanın durumu şöyle özetlenebilir:

- **Mekanistik yorumlanabilirlik olgunlaşıyor ama henüz "bilim"den çok "mühendislik" aşamasında.** SAE'ler son birkaç yılın en önemli aracı oldu, ancak 2025-2026'da sınırlamaları yoğun şekilde belgelendi (kanonik olmama, feature splitting, yüksek ölü latent oranı, düşük steerability).
- **Circuit tracing / attribution graphs öne çıkıyor.** Anthropic'in 2025 "Circuit Tracing" (Ameisen et al.) ve "On the Biology of a Large Language Model" (Lindsey et al.) çalışmaları, tek tek özelliklerden bütün hesaplama devrelerine geçişi temsil ediyor. Cross-layer transcoder'lar (CLT) gibi yöntemler, cross-layer superposition sorununu ele almaya çalışıyor.
- **Linear representation hypothesis nüanslaşıyor.** "Tüm özellikler doğrusaldır" katı versiyonu terk edildi; çok boyutlu/dairesel özellikler kabul gördü. Tartışma artık "hangi özellikler doğrusal, hangileri değil" sorusuna kaydı.
- **Superposition teorisi derinleşiyor.** 2026'daki çalışmalar (Spectral Superposition; veri korelasyonlarının özellik geometrisini şekillendirmesi üzerine çalışmalar), idealize edilmiş seyrek/bağımsız özellik varsayımının ötesine geçiyor ve gerçek modellerdeki zengin geometrik yapıları (aylar için daireler, semantik kümeler) açıklamaya çalışıyor.
- **Platonic representation hypothesis canlı bir tartışma konusu.** Quanta Magazine'in Ocak 2026 incelemesi, modeller-arası ve modaliteler-arası temsil yakınsaması fikrinin önemli bir araştırma programı haline geldiğini gösteriyor.

Hızlı değişen bu alanda, buradaki spesifik teknik iddiaların (özellikle SAE'lerin etkinliği ve linear representation hypothesis'in kapsamı hakkındakilerin) önümüzdeki aylarda revize edilmesi beklenmelidir.

## 12. Okuyucu İçin Zihinsel Model

Konuyu sağlam bir zeminde tutacak bir zihinsel model şöyle kurulabilir:

Bir LLM'i, anlamı bir "sözlükten" çeken bir sistem olarak değil, anlamı **akış halinde işleyen bir hesaplama hattı** olarak düşünün. Token'lar sisteme girer ve her biri bir başlangıç vektörü (embedding) alır — bu, ham bir taslaktan ibarettir. Sonra bu taslak, residual stream adlı paylaşılan bir "tuval" üzerinde katman katman boyanır. Her katman, tuvale yeni katkılar ekler: önce yüzeysel dilbilgisi, sonra giderek daha derin anlamsal ilişkiler. Bir kavram (örneğin "Texas") tuvalin tek bir köşesinde durmaz; tuval boyunca dağıtılmış bir desen olarak, başka kavramlarla aynı boyutları paylaşarak (superposition) kodlanır.

"Anlamak" dediğimiz şey, bu tuvalde doğru desenlerin doğru sırayla aktive olması ve birbirini tetiklemesidir (Dallas → Texas → Austin). Embedding, bu sürecin yalnızca başlangıç noktasıdır — anlamın kendisi değil, anlamın inşa edileceği hammaddedir.

Bu modeli benimserseniz, şu reflekslere sahip olursunuz: Bir temsilin "neyi temsil ettiğini" sorduğunuzda, hemen "bunu nasıl biliyoruz — korelasyonla mı, nedensel müdahaleyle mi?" diye sorarsınız. "Bu kelime şuna yakın" dediğinizde, "yakınlık neyi yansıtıyor — istatistiksel kullanımı mı, gerçek kavrayışı mı?" diye düşünürsünüz. Ve "model bunu biliyor" dediğinizde, bilginin tek bir yerde durmadığını, bir hesaplama boyunca dağıldığını hatırlarsınız.

### Grill-Me Kalite Kapısı: Net Yanıtlar

**En yaygın yanlış basitleştirme nedir?** "Embedding bir kelimenin anlamıdır" ve onun uzantısı olan "kral - adam + kadın = kraliçe, embeddinglerin anlamı yakaladığını kanıtlar." Bu, dağılımsal benzerliği (istatistik) gerçek anlamayla (kavrayış) karıştırır ve teknik olarak bile abartılmış bir örneğe dayanır (kaynak kelimelerin dışlanması gerekir).

**Bu konuyu anlamak önceki AI/LLM anlayışında neyi değiştirir?** Anlamı "modelin içinde bir yerde saklanan bir bilgi" olarak gören statik/depo modelinden, anlamı "katmanlar boyunca dönüşen, dağıtılmış, geometrik bir süreç" olarak gören dinamik/akış modeline geçişi sağlar. Bu, "model X'i biliyor/anlıyor" iddialarına çok daha dikkatli yaklaşmayı gerektirir.

**Hangi iddia güçlü kaynaklarla destekleniyor?** Superposition'ın gerçekliği, bağlamsal temsillerin statikten farkı (Ethayarajh'ın %5 bulgusu), SAE'lerin nöronlardan daha yorumlanabilir özellikler çıkarması (~%70) ve bunların davranışı nedensel olarak etkilemesi (Golden Gate Bridge), anlamın katmanlar boyunca kademeli inşası (logit lens, Dallas→Texas→Austin) — bunların hepsi birden fazla bağımsız ve güçlü kaynakla desteklenir.

**Hangi iddia hala tartışmalı?** Linear representation hypothesis'in kapsamı, SAE'lerin "doğru" analiz birimini bulup bulmadığı, causal probing yöntemlerinin güvenilirliği ve Platonic representation hypothesis'in geçerliliği. Bunlar 2026 itibariyle açık sorulardır.

**Okuyucu bu belgeyi okuduktan sonra hangi kavramı daha ciddiye almalı?** **Benzerlik ile nedensellik arasındaki ayrımı.** Bir temsilin bir özelliği "içermesi" (probing ile gösterilebilir) ile o özelliği "kullanması" (müdahale ile gösterilebilir) arasındaki fark, hem bilimsel netlik hem de AI güvenliği için en kritik kavramsal araçtır.

## 13. Kaynakça

- Bengio, Y., Courville, A., & Vincent, P. (2013). *Representation Learning: A Review and New Perspectives.* IEEE TPAMI, 35(8), 1798-1828. — Temsil öğrenmenin temel derlemesi; "açıklayıcı değişim faktörleri" çerçevesi.
- Harris, Z. (1954). *Distributional Structure.* WORD, 10(2-3), 146-162. — Dağılımsal hipotezin kökeni; "dağılım benzerliği anlam benzerliğine karşılık gelir" iddiası.
- Firth, J.R. (1957). *A Synopsis of Linguistic Theory, 1930-1955.* Studies in Linguistic Analysis. — "You shall know a word by the company it keeps."
- Mikolov, T., et al. (2013). *Efficient Estimation of Word Representations in Vector Space* ve *Linguistic Regularities in Continuous Space Word Representations.* — Word2Vec ve vektör aritmetiği.
- Linzen, T. (2016). *Issues in Evaluating Semantic Spaces Using Word Analogies.* — Analoji örneklerinin eleştirisi; kaynak kelimelerin dışlanması meselesi.
- Peters, M., et al. (2018). *Deep Contextualized Word Representations* (ELMo). — İlk büyük bağlamsal embedding.
- Devlin, J., et al. (2019). *BERT: Pre-training of Deep Bidirectional Transformers.* — Transformer tabanlı bağlamsal embeddingler.
- Ethayarajh, K. (2019). *How Contextual are Contextualized Word Representations? Comparing the Geometry of BERT, ELMo, and GPT-2 Embeddings.* EMNLP-IJCNLP. — Bağlamsal varyansın %5'ten azının statik embedding ile açıklanabilmesi bulgusu.
- Radford, A., et al. (2021). *Learning Transferable Visual Models From Natural Language Supervision* (CLIP). — Çok modlu ortak embedding uzayı, kontrastif öğrenme.
- Fefferman, C., Mitter, S., & Narayanan, H. (2016). *Testing the Manifold Hypothesis.* — Manifold hipotezinin formel incelemesi.
- Elhage, N., et al. (2021). *A Mathematical Framework for Transformer Circuits.* Anthropic/Transformer Circuits. — Residual stream çerçevesi.
- Elhage, N., et al. (2022). *Toy Models of Superposition.* Anthropic/Transformer Circuits. — Superposition teorisi, faz değişimi, geometrik yapılar.
- Bricken, T., et al. (2023). *Towards Monosemanticity: Decomposing Language Models With Dictionary Learning.* Anthropic. — Tek katmanlı transformer, 512 nöron → 4000+ özellik, ~%70 yorumlanabilirlik.
- Templeton, A., et al. (2024). *Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet.* Anthropic/Transformer Circuits. — 34M özelliğe kadar SAE, orta katman residual stream, çok dilli/çok modlu özellikler, Golden Gate Bridge steering.
- Park, K., Choe, Y.J., & Veitch, V. (2023). *The Linear Representation Hypothesis and the Geometry of Large Language Models.* — Doğrusal temsil hipotezinin karşıolgusal formelleştirilmesi, LLaMA-2 kanıtları.
- Engels, J., Liao, I., Michaud, E., Gurnee, W., & Tegmark, M. (2024). *Not All Language Model Features Are One-Dimensionally Linear.* ICLR. — Çok boyutlu/dairesel özellikler (günler, aylar), modüler aritmetikte nedensel kullanım.
- Huh, M., Cheung, B., Wang, T., & Isola, P. (2024). *The Platonic Representation Hypothesis.* ICML. — Temsil yakınsaması hipotezi (pozisyon makalesi).
- Belinkov, Y. (2022). *Probing Classifiers: Promises, Shortcomings, and Advances.* Computational Linguistics. — Probing'in metodolojik eleştirisi; korelasyon-nedensellik ayrımı.
- Canby, M., Davies, A., et al. (2024). *Measuring the Reliability of Causal Probing Methods: Tradeoffs, Limitations, and the Plight of Nullifying Interventions.* — Causal probing güvenilirliği.
- Lindsey, J., et al. (2025). *On the Biology of a Large Language Model* ve Ameisen, E., et al. (2025) *Circuit Tracing: Revealing Computational Graphs in Language Models.* Anthropic/Transformer Circuits. — Attribution graph'lar, çok-adımlı muhakeme (Dallas→Texas→Austin), nedensel müdahale.
- Leask, P., Bussmann, B., et al. (2025). *Sparse Autoencoders Do Not Find Canonical Units of Analysis.* — SAE'lerin kanonik birim bulma sınırlaması.
- Quanta Magazine (7 Ocak 2026). *Distinct AI Models Seem To Converge On How They Encode Reality.* — Platonic representation hypothesis tartışmasının güncel durumu.

---

*Not: Bu belge, hızla gelişen bir araştırma alanını 2026 ortası itibariyle özetlemektedir. Özellikle sparse autoencoder yöntemleri, circuit tracing ve linear representation hypothesis'in kapsamı aktif tartışma konularıdır; spesifik teknik iddialar için birincil kaynaklara (özellikle transformer-circuits.pub ve ilgili arXiv makalelerine) başvurulması önerilir. Tartışmalı noktalarda kasıtlı olarak kesin dil kullanılmamıştır.*