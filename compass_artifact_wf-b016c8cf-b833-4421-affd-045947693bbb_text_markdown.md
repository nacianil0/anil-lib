# Transformer Mimarisi: Bilgi Akışı, Temsil Dönüşümü ve Ölçeklenebilir Hesaplama Olarak Bir Teknik İnceleme

## 1. Kısa Tez

Transformer, çoğu zaman anlatıldığı gibi "attention kullanan bir mimari" değildir; daha doğru bir tanımla, **token temsillerinin paylaşılan bir lineer uzayda (residual stream) biriktirildiği, attention katmanlarının bu uzayda token'lar arası bilgi taşıdığı (bağlam karıştırma), MLP katmanlarının ise bu uzaya konumsal olmayan bilgi/hesaplama eklediği (temsil dönüşümü), pozisyon bilgisinin ayrıca enjekte edildiği ve karesel maliyetli bir karıştırma operasyonu üzerine kurulu, paralelleştirilebilir bir hesaplama mimarisidir**. Bu belge, Transformer'i bu dört eksende (bilgi akışı, temsil dönüşümü, bağlam karıştırma, ölçeklenebilir hesaplama) ele alır ve okuyucunun attention'ı diğer bileşenlerle karıştırmadan, kabiliyet ile eğitimi, kapasite ile kullanımı ayırarak düşünebilmesini hedefler. Temel argüman şudur: Transformer'i anlamak, attention kadar residual stream'i, MLP katmanlarını ve pozisyon bilgisini de anlamak demektir; çünkü modelin yaptığı işin büyük kısmı attention'ın dışında gerçekleşir.

## 2. Konunun Neden Önemli Olduğu

2017'de yayımlanan "Attention Is All You Need" (Vaswani ve ark.) makalesinden bu yana Transformer, dil modellemesinin baskın mimarisi haline geldi. Ancak popüler anlatım, mimariyi "attention mekanizması" ile özdeşleştirerek üç ciddi kavramsal hataya yol açıyor: (1) attention ağırlıklarının modelin "neye dikkat ettiğini" şeffaf biçimde gösterdiği varsayımı; (2) modelin yeteneklerinin attention'dan kaynaklandığı, MLP katmanlarının ikincil olduğu varsayımı; (3) bağlam penceresi büyüdükçe modelin tüm bilgiyi eşit iyi kullandığı varsayımı. Her üçü de yanlıştır ve literatürde aktif olarak çürütülmüştür.

Bu kavramların doğru anlaşılması pratikte önemlidir çünkü: modern büyük dil modellerinin (LLM) mimari tercihleri (Mixture of Experts, grouped-query attention, state-space hibritleri) doğrudan bu bileşenlerin maliyet ve rolleriyle ilgilidir; yorumlanabilirlik (interpretability) araştırması doğrudan residual stream ve MLP katmanları üzerinden ilerlemektedir; ve "uzun bağlam" iddialarının pratik değeri, kapasite ile kullanım arasındaki farkı bilmeyi gerektirir.

## 3. Temel Kavramlar

Bu bölümde belgede kullanılacak terimleri ilk geçtikleri yerde tanımlıyorum.

- **Token**: Modelin işlediği en küçük girdi birimi (genellikle bir kelime parçası). Her token bir tamsayı kimliğine, oradan da bir vektöre (embedding) eşlenir.
- **Embedding**: Bir token'ı temsil eden, öğrenilen yoğun (dense) vektör. Modelin "çalışma uzayı" bu vektörlerin yaşadığı d-boyutlu uzaydır.
- **Self-attention (öz-dikkat)**: Bir dizideki her token'ın, aynı dizideki diğer token'lardan (ve kendisinden) bilgi toplamasını sağlayan işlem. "Self" olması, sorgu ve anahtarların aynı diziden gelmesidir (encoder-decoder cross-attention'dan farkı budur).
- **Query, Key, Value (Sorgu, Anahtar, Değer)**: Her token'ın embedding'inden üç ayrı lineer projeksiyonla üretilen üç vektör. Sorgu "ne arıyorum", anahtar "ben neyim/ne sunuyorum", değer "attend edilirsem ne aktarırım" sorularına karşılık gelir.
- **Multi-head attention (çok başlı dikkat)**: Attention'ın paralel, bağımsız alt-uzaylarda (head) birden çok kez yapılması.
- **Positional encoding/embedding (konumsal kodlama)**: Token'ların dizideki sırasını modele bildiren mekanizma; attention sıra-bağımsız (permütasyona değişmez) olduğu için gereklidir.
- **Residual stream (artık akış)**: Katmanlar boyunca token temsilini taşıyan, her alt-katmanın okuyup üzerine yazdığı toplamsal (additive) bilgi kanalı.
- **MLP / Feed-Forward Network (FFN)**: Her token'a bağımsız (position-wise) uygulanan, genellikle iki lineer katman ve aralarında doğrusal olmayan bir aktivasyon içeren blok.
- **Layer normalization (katman normalizasyonu)**: Aktivasyonları özellik (feature) boyutunda normalleştirerek eğitim kararlılığı sağlayan işlem.
- **Causal masking (nedensel maskeleme)**: Otoregresif üretimde bir token'ın gelecekteki token'lara attend etmesini engelleyen maske.
- **KV cache (anahtar-değer önbelleği)**: Üretim sırasında önceki token'ların anahtar ve değer vektörlerinin yeniden hesaplanmaması için saklanması.

## 4. Teknik Arka Plan: Transformer Hangi Problemi Çözmek İçin Çıktı?

Transformer'in çözmeye çalıştığı problemi anlamak için kendisinden önceki baskın mimari olan **tekrarlayan sinir ağlarına (RNN)** ve onların geliştirilmiş hali **LSTM**'lere (Long Short-Term Memory, Hochreiter & Schmidhuber, 1997) bakmak gerekir.

**Sıralı işleme darboğazı.** RNN, diziyi bir eleman bir eleman, sırayla işler: her adımda bir gizli durumu (hidden state) günceller ve bu durumu bir sonraki adıma taşır. Bu yapı doğası gereği **paralelleştirilemez** — t. adımı hesaplamak için t-1. adımın bitmesini beklemek gerekir. Modern donanım (GPU/TPU) ise paralel matris çarpımlarında verimlidir; dolayısıyla RNN'ler donanımı verimsiz kullanır.

**Uzun mesafe bağımlılık sorunu ve kaybolan gradyan.** RNN'lerde gradyan, zaman adımları boyunca geriye yayılırken (backpropagation through time) tekrarlayan ağırlık matrisinin yüksek kuvvetleriyle çarpılır; bu da gradyanın adım sayısına üstel biçimde ya küçülmesine (**vanishing gradient / kaybolan gradyan**) ya da büyümesine (**exploding gradient / patlayan gradyan**) yol açar. Sonuç olarak vanilla RNN'ler kısa vadeli bağımlılıkları öğrenir ama uzak token'lar arasındaki ilişkileri öğrenmekte zorlanır. Klasik örnek: "I grew up in France... I speak fluent French" cümlesinde "France" ile "French" arasındaki bağ, boşluk büyüdükçe öğrenilemez hale gelir. LSTM, bir hücre durumu (cell state) ve geçit (gate) mekanizmasıyla gradyana ayrı bir yol açarak bu sorunu hafifletti — ama ortadan kaldırmadı ve sıralı işleme darboğazını çözmedi.

**Transformer'in kırılımı.** "Attention Is All You Need" makalesi, tekrarlamayı (recurrence) ve evrişimi (convolution) tamamen terk ederek yalnızca attention mekanizmasına dayanan bir mimari önerdi. Bunun iki temel sonucu oldu: (1) Bir dizideki tüm token çiftleri **aynı anda, paralel** olarak ilişkilendirilebilir — eğitim ciddi biçimde hızlanır. (2) Herhangi iki token arasındaki "yol uzunluğu" sabittir (1 adım); yani uzak token'lar arası bilgi akışı, RNN'deki gibi diziyi baştan sona kat etmek zorunda değildir. Makale, WMT 2014 İngilizce-Almanca çeviride 28.4 BLEU ile o günün en iyi sonuçlarını (ensemble'lar dahil) 2 BLEU'dan fazla geçti ve İngilizce-Fransızca'da 41.8 BLEU ile tek-model rekoru kurdu. Tarihsel önemi, bu çeviri skorlarından çok, **paralelleştirilebilir ve ölçeklenebilir** bir dizi-işleme paradigması açmasıdır — sonraki tüm büyük dil modelleri bu paradigma üzerine inşa edildi.

Önemli bir tarihsel not: Makale bir encoder-decoder mimarisi olarak çeviri için tasarlanmıştı. Bugünkü büyük dil modellerinin çoğu ise yalnızca decoder kullanan (decoder-only), otoregresif modellerdir. Yani 2017 makalesi bugünkü tartışmada "kökeni" temsil eder, birebir bugünkü mimariyi değil.

## 5. Ana Mekanizma

### 5.1 Self-Attention Teknik Olarak Ne Yapar?

Sezgi: Her token, "bağlamdaki hangi diğer token'lar benim için ilgili?" diye sorar, bu ilgiyi ölçer ve ilgili token'ların taşıdığı bilgiyi ağırlıklı olarak kendi üzerine toplar. Self-attention özünde **bağlama duyarlı bir bilgi toplama (information routing/mixing)** işlemidir — token temsillerini, çevrelerindeki token'lardan gelen bilgiyle güncelleyen bir yönlendirme operasyonu.

Teknik tanım: Her token embedding'i x'ten üç lineer projeksiyonla Query (q), Key (k) ve Value (v) vektörleri üretilir. Attention skoru, bir token'ın sorgusu ile diğer token'ların anahtarlarının nokta çarpımıdır (dot product). Bu skorlar boyutun kareköküne bölünerek (scaled dot-product) ölçeklenir, softmax ile bir olasılık dağılımına çevrilir ve bu ağırlıklarla değer vektörlerinin ağırlıklı toplamı alınır. Formülle: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V.

√dₖ ile ölçekleme tesadüfi değildir: boyut büyüdükçe nokta çarpımlarının büyüklüğü artar, softmax'ı aşırı keskinleştirir ve gradyanları küçültür; ölçekleme bunu dengeler.

### 5.2 Query, Key, Value: Sezgisel ve Matematiksel Okuma

Sık kullanılan bir benzetme: Query bir arama sorgusu, Key kütüphanedeki kitapların etiketleri, Value ise kitapların içeriğidir. Token, sorgusuyla etiketleri tarar (QKᵀ), en uygun etiketlere yüksek ağırlık verir (softmax) ve o kitapların içeriğini okur (V ile ağırlıklı toplam).

Bu benzetme yararlı ama eksiktir. Mekanistik yorumlanabilirlik literatürünün getirdiği daha derin okuma şudur: Bir attention head aslında **iki büyük ölçüde bağımsız hesaplama** yapar. Anthropic'in "A Mathematical Framework for Transformer Circuits" (Elhage ve ark., 2021) çalışması bunu **QK devresi** ve **OV devresi** olarak ayırır:
- **QK devresi (query-key)**: Hangi token'ın hangi token'a ne kadar attend edeceğini, yani attention desenini (pattern) belirler. "Bilgi nereden nereye taşınacak?"
- **OV devresi (output-value)**: Attend edilen bir token'ın, çıktıyı nasıl etkileyeceğini belirler. "Taşınan bilgi ne olacak?"

Bu ayrımın değeri büyüktür: Elhage ve ark.'nın ifadesiyle, attention desenleri dondurulduğunda model, "token'ları logit değişimlerine eşleyen yorumlanabilir uçtan uca fonksiyonların toplamı" olarak yazılabilir. Bu, Transformer'in içinde sanılandan çok daha fazla lineer yapı olduğunu gösterir.

### 5.3 Multi-Head Attention Neden Gereklidir?

Tek bir attention head, softmax ağırlıklı bir ortalama hesaplar; bu da farklı türden ilişkileri (örneğin "bir önceki kelime", "öznesi olan fiil", "eşleşen parantez") tek bir ortalamada bulanıklaştırma eğilimindedir. Vaswani ve ark.'nın ifadesiyle, tek head'de "averaging inhibits this" — ortalama alma, farklı konumlardaki bilgilere ayrı ayrı odaklanmayı engeller.

Multi-head attention bu sorunu, embedding'i h adet alt-uzaya bölüp her birinde **bağımsız** bir attention hesaplayarak çözer. Her head farklı bir "ilişki türüne" uzmanlaşabilir; sonuçlar birleştirilip (concatenate) bir çıkış projeksiyonundan geçirilir. Sezgi: tek bir bakış açısı yerine, paralel birden çok bakış açısı.

### 5.4 Residual Stream: İletişim Kanalı Olarak

Bu, popüler anlatımda en çok ihmal edilen ama mimariyi anlamak için belki de en merkezi kavramdır. Her Transformer katmanı, girdisini doğrudan çıktısına ekler: çıktı = girdi + alt-katman(girdi). Bu "residual connection" (artık bağlantı) zinciri, embedding katmanından çıkıştaki unembedding'e kadar uzanan kesintisiz bir **toplamsal kanal** oluşturur. Bu kanala mekanistik yorumlanabilirlik literatürü **residual stream** der.

Elhage ve ark. (2021)'in getirdiği perspektif şudur: Residual stream paylaşılan bir iletişim kanalı (communication channel) veya ortak bir çalışma alanı (shared workspace) gibidir. Her attention ve MLP katmanı, bu akıştan girdisini bir lineer projeksiyonla **okur**, hesaplamasını yapar ve sonucunu yine ekleyerek akışa **geri yazar**. Matematiksel olarak: rₜ^(ℓ+1) = rₜ^(ℓ) + Attn + MLP.

Bu çerçevenin üç güçlü sonucu vardır:
1. **Katmanlar doğrudan değil, residual stream üzerinden haberleşir.** Bir alt katmanda yazılan bilgi, çok daha üst bir katmanda okunabilir; aradaki katmanlar onu görmezden gelebilir. Bu, "circuit" (devre) dediğimiz, katmanlar arası işlevsel alt-ağları mümkün kılar.
2. **Residual stream bant genişliği kıt bir kaynaktır.** Elhage ve ark.'nın gözlemiyle, "computational dimension" (nöronlar, head sonuçları) sayısı residual stream'in boyutundan çok daha fazladır; dolayısıyla bu kanalda yer için yüksek bir rekabet beklenir ("residual stream bandwidth to be in very high demand"). Bu gözlem, doğrudan superposition (bindirme) tartışmasına bağlanır (bkz. 5.6).
3. Residual stream vektörü çoğu zaman "bağlamsal kelime embedding'i" gibi yorumlanır; ama içinde, başka token'lardan kopyalanmış bilgiye karşılık gelen lineer alt-uzaylar da bulunur.

### 5.5 MLP Katmanları: Sadece "Feed-Forward" mı?

Yaygın bir yanılgı, MLP/FFN katmanlarını attention'a göre ikincil, "sadece bir doğrusal olmayan dönüşüm" sanmaktır. Oysa Geva ve ark. (2021, EMNLP, arXiv:2012.14913) makalenin ilk cümlesiyle bunu vurgular: *"Feed-forward layers constitute two-thirds of a transformer model's parameters, yet their role in the network remains under-explored."* Yani modelin "öğrendiği" şeyin büyük kısmı bu katmanlardadır ve rolleri uzun süre yeterince incelenmemiştir.

Geva ve ark. (2021), "Transformer Feed-Forward Layers Are Key-Value Memories" çalışmasında etkili bir yorum getirdi: FFN katmanları **anahtar-değer hafızaları (key-value memories)** gibi davranır. Burada terim, attention'daki Key/Value'dan farklıdır (bu bir kavram karışıklığı riskidir, dikkat): İlk lineer katmanın her nöronu bir "anahtar" gibi davranıp girdideki belirli metin desenleriyle (textual patterns) eşleşir; ikinci lineer katman ise buna karşılık gelen bir "değeri", yani çıktı kelime dağılımı üzerinde bir güncellemeyi tetikler. Katmanlar arası iş bölümü deneyseldir: yazarların ifadesiyle *"lower layers tend to capture shallow patterns, while upper layers learn more semantic ones"* — yani alt katmanlar yüzeysel desenleri, üst katmanlar daha anlamsal desenleri yakalar. Ve nihai çıktı: *"the output of a feed-forward layer is a composition of its memories, which is subsequently refined throughout the model's layers via residual connections to produce the final output distribution"* — FFN çıktısı, hafızalarının bir bileşimidir ve residual bağlantılar üzerinden katman katman rafine edilerek son çıktı dağılımını üretir.

Dolayısıyla daha doğru bir resim: **Attention bilgiyi token'lar arasında taşır (karıştırır); MLP ise her token konumunda, taşınmış bilgi üzerinde konumsal olmayan hesaplamayı/hafıza erişimini yapar.** İkisi residual stream üzerinden sırayla bu akışa katkı ekler.

### 5.6 Superposition ve Polysemanticity

Residual stream'in "kıt bant genişliği" gözlemi, neden tek bir nöronun çoğu zaman tek bir kavrama karşılık gelmediğini açıklar. Anthropic'in "Toy Models of Superposition" (Elhage ve ark., 2022) çalışması şu olguyu inceler:
- **Polysemanticity (çok-anlamlılık)**: Tek bir nöron, birbiriyle alakasız birden çok kavramda aktive olur — bu yorumlanabilirliği zorlaştırır.
- **Superposition (bindirme)**: Ağ, sahip olduğu boyut sayısından **daha fazla** özelliği (feature), bu özellikleri neredeyse-dik (nearly orthogonal) yönler olarak kodlayarak temsil eder. Özellikler seyrek (sparse) olduğunda, bir miktar "girişim" (interference) tolere edilerek sıkıştırma sağlanır.

Bu, polysemanticity'nin superposition'ın bir sonucu olduğu hipotezidir. Pratik önemi: Modelin iç temsilleri "tek nöron = tek kavram" şeklinde temiz okunamaz; bu da hem yorumlanabilirliği zorlaştırır hem de sparse autoencoder gibi tekniklerin neden gerektiğini açıklar. Yine de bu alan açık: "Toy Models" çalışmasının kendisi, modelin herhangi bir pozitif girişimi cezalandırmasının gerçek ağlar için yanıltıcı olabileceğini, modelin küçük girişimleri büsbütün görmezden gelmeyi öğrenmiş olabileceğini tartışır. Yani superposition güçlü bir çerçevedir ama nihai bir teori değildir.

### 5.7 Pozisyon Bilgisi Neden Gerekir?

Self-attention, girdinin sırasına **değişmezdir** (permutation-invariant): QKᵀ nokta çarpımı yalnızca vektörlerin içeriğine bağlıdır, konumlarına değil. Yani "köpek kediyi kovaladı" ile "kediyi köpek kovaladı" attention için ayırt edilemez olurdu. Pozisyon bilgisi bu yüzden ayrıca enjekte edilmelidir. Üç temel yaklaşım:

1. **Sinüzoidal (sabit) kodlama** (orijinal Transformer, 2017): Her pozisyona, farklı frekanslardaki sinüs ve kosinüs dalgalarından oluşan sabit bir vektör eklenir. Parametre içermez, dizi uzunluğundan bağımsızdır. Mutlak (absolute) konumu kodlar.
2. **Öğrenilmiş (learned) konumsal embedding**: Her pozisyona, eğitimde öğrenilen bir vektör atanır. Esnektir ama görülmemiş uzunluklara genelleme (extrapolation) zayıftır ve maksimum uzunluk sabittir.
3. **RoPE (Rotary Position Embedding)** (Su ve ark., RoFormer, 2021): Bugünkü büyük dil modellerinin fiili (de facto) standardı. Konumu, sorgu ve anahtar vektörlerine **uygulanan bir döndürme (rotation)** olarak kodlar. Embedding'in 2-boyutlu çiftleri, pozisyona bağlı bir açıyla döndürülür. Kritik özellik: İki vektörün nokta çarpımı, döndürmeden sonra yalnızca onların **göreli (relative)** konum farkına bağlı hale gelir. Yazarların ifadesiyle RoPE, "mutlak konumu bir döndürme matrisiyle kodlarken self-attention formülasyonuna açık göreli konum bağımlılığını da katar"; dizi uzunluğu esnekliği, artan göreli mesafeyle azalan token bağımlılığı ve lineer self-attention'a göreli konum kodlaması ekleyebilme gibi özellikler sağlar.

Tarihsel yerleştirme: Sinüzoidal kodlama 2017'nin başlangıç noktasıdır ama bugün büyük modellerde nadiren saf haliyle kullanılır; öğrenilmiş embedding GPT-2 gibi modellerde yaygındı; RoPE ise 2021 sonrası LLaMA, Mistral gibi modellerle standart haline geldi.

### 5.8 Layer Normalization Ne İşe Yarar?

Layer normalization (Ba, Kiros & Hinton, 2016), aktivasyonları özellik boyutunda sıfır ortalama ve birim varyansa normalleştirir. Temel işlevi, derin ağlarda aktivasyon dağılımlarının katmandan katmana kontrolsüz büyüyüp küçülmesini (ve dolayısıyla gradyanların patlamasını/kaybolmasını) engelleyerek eğitimi kararlı kılmaktır.

Önemli bir tasarım ayrımı, normalizasyonun **nereye** konduğudur:
- **Post-LN** (orijinal Transformer, 2017): Normalizasyon, alt-katman ve residual toplandıktan **sonra** uygulanır: yₗ = Norm(xₗ + Module(xₗ)). Aktivasyon varyansını sabit ölçekte tutarak büyümesini engeller ve dikkatli ayarlanırsa biraz daha iyi nihai performans verebilir; ama derin ağlarda gradyan akışını bozarak kaybolan gradyana ve yavaş yakınsamaya yol açabilir, dikkatli bir öğrenme oranı "warmup" (ısınma) programı gerektirir, aksi halde eğitim ıraksayabilir.
- **Pre-LN**: Normalizasyon, alt-katmana girmeden **önce** uygulanır: yₗ = xₗ + Module(Norm(xₗ)); residual yol "temiz" (saf identity) kalır. Bu, gradyanlar için doğrudan bir "otoyol" yaratır, derin ağlarda erken eğitim kararlılığını artırır ve warmup'a daha az duyarlıdır. Bu nedenle modern büyük dil modellerinin çoğu (ör. LLaMA 3 ailesi) Pre-LN kullanır. Maliyeti, aktivasyon varyansının derinlikle üstel büyüyebilmesidir; bu yüzden Peri-LN, Sandwich-LN gibi ara çözümler önerilmiştir.

Residual stream perspektifiyle bağlantı: Pre-LN'in "temiz residual yolu" tam da residual stream'i bozulmamış bir iletişim kanalı olarak korur — bu, hem kararlılık hem de yorumlanabilirlik açısından anlamlıdır.

### 5.9 Causal Masking ve Otoregresif Üretim

Decoder-only modellerde model, bir sonraki token'ı tahmin ederek metin üretir (autoregressive generation). Bunun tutarlı olması için bir token'ın **gelecekteki** token'lara attend etmesi engellenmelidir; aksi halde model eğitimde "cevabı" görmüş olurdu. **Causal masking (nedensel maskeleme)**, attention skor matrisinde gelecekteki pozisyonları (üst üçgeni) eksi sonsuza ayarlayarak softmax sonrası sıfır ağırlık almalarını sağlar. Böylece her pozisyon yalnızca kendisi ve öncesindeki token'lara bakar.

## 6. Akademik Tartışmalar

### 6.1 "Attention = Açıklama" mı, "Attention = Hesaplama Mekanizması" mı?

Bu, alanın en önemli tartışmalarından biridir ve doğrudan bir yanlış anlama riskini hedefler.

**Açıklama görüşü** (erken iyimserlik): Attention ağırlıkları, her girdi token'ına bir ağırlık atadığı için, modelin "neye odaklandığını" gösteren sezgisel bir ısı haritası (heatmap) sunar. Çeviride bir fiili tahmin ederken öznesine "attend" eden bir model, insana benzer ve yorumlanabilir görünür.

**Eleştiri** (Jain & Wallace, 2019 — "Attention is Not Explanation"): RNN tabanlı modellerde, (1) attention ağırlıkları gradyan-temelli özellik önem ölçütleriyle çoğu zaman zayıf korelasyon gösterir; (2) çıktıyı değiştirmeden, tamamen farklı (adversarial) attention dağılımları üretilebilir. Yani aynı tahmin, çok farklı attention desenleriyle elde edilebiliyorsa, attention "nedensel" bir açıklama olamaz. Serrano & Smith (2019), en yüksek attention ağırlıklarını sıfırlamanın bile tahminleri çoğu zaman değiştirmediğini gösterdi.

**Karşı-eleştiri** (Wiegreffe & Pinter, 2019 — "Attention is Not Not Explanation"): Önceki çalışmalar attention'ın yorumlanabilirlik için yararsız olduğunu kanıtlamaz; adversarial dağılımlar bulunsa bile bunlar basit tanısal testlerde iyi performans göstermez. Attention, tek başına değil ama gradyan-temelli yöntemlerle birlikte anlamlı sinyal verebilir.

Daha ileri bir nüans ("Why Attentions May Not Be Interpretable?"): Attention ağırlıkları, vurgulanan girdinin yanında "kombinatoryal kısayollar" (combinatorial shortcuts) yoluyla fazladan bilgi taşıyabilir; bu da neden bazen "[SEP]", virgül gibi anlamsız token'lara yüksek ağırlık verildiğini açıklar.

**Sentez**: Attention ağırlıkları bir **hesaplama mekanizmasının** parçasıdır — bilgiyi nasıl yönlendirdiğinin kaydıdır — ama modelin "bilinçli dikkatinin" şeffaf bir penceresi değildir. Google Research'ün ifadesiyle, eğer amaç hangi girdinin tahmine en çok katkı yaptığını bulmaksa, saliency (belirginlik) yöntemleri bu işe daha uygundur ("input saliency methods better suit our needs"). Mekanistik yorumlanabilirlik akımı (Elhage ve ark.) ise attention'ı "açıklama" olarak değil, tersine mühendislikle çözülecek bir devre olarak ele alarak tartışmayı farklı bir zemine taşır.

### 6.2 Mimari Kabiliyet mi, Eğitim Etkisi mi?

Bir modelin yapabildiklerinin ne kadarı mimariden, ne kadarı eğitim verisi ve kayıp fonksiyonundan gelir? Bu ayrım çoğu zaman ihmal edilir. Tay ve ark. (2022, "Scaling Laws vs Model Architectures") on farklı mimarinin (Transformer, Switch Transformer, Universal Transformer, dinamik evrişimler, Performer, MLP-Mixer vb.) ölçeklenme davranışını inceledi ve iki şey gösterdi: (1) Mimari, ölçeklenmede gerçekten önemlidir — farklı mimariler farklı ölçeklenir; (2) en iyi mimari ölçeğe göre değişebilir. Aynı zamanda, standart Transformer'ın performansının birçok varyantından daha tutarlı ve öngörülebilir biçimde ölçeklendiğini buldular.

İlginç bir bulgu: Yeterli ölçekle, güçlü yapısal önyargı (inductive bias) eksikliği telafi edilebilir — yani mimarinin "doğuştan" sağlamadığı bir yeteneği, model yeterli veri ve hesapla öğrenebilir. Bu, "modelin yeteneği mimariden gelir" şeklindeki basit anlatıyı karmaşıklaştırır: Mimari, hangi yeteneklerin ne kadar kolay/verimli öğrenileceğini belirleyen bir önyargı sağlar, ama nihai yetenek mimari ile eğitimin (veri, ölçek, kayıp) etkileşiminden doğar.

### 6.3 Attention Head'leri Ne Öğrenir? İnduction Heads

Mekanistik yorumlanabilirlik, attention head'lerinin somut algoritmalar uyguladığını gösterdi. En ünlü örnek **induction head** (Olsson ve ark., 2022, "In-context Learning and Induction Heads"): [A][B] ... [A] → [B] desenini tamamlayan bir devre. Yani model, bağlamda daha önce "A'yı B izledi" desenini gördüyse, yeni bir [A] gördüğünde [B] tahmin eder. Bu, iki head'in bileşiminden oluşur: birincisi önceki token'a bakıp bilgi taşır (prefix matching), ikincisi bunu kopyalar.

Bulgunun çarpıcı yanı: Eğitim sırasında, induction head'lerin oluştuğu an ile **bağlam-içi öğrenmenin (in-context learning)** ani ve keskin biçimde geliştiği an çakışır — eğitim kayıp eğrisinde görünür bir "tümsek" (bump) olarak. Bu faz değişimi, 2 katmandan 40 katmana kadar farklı model boyutlarında aynı eğitim adımında gerçekleşir. Olsson ve ark., induction head'lerin transformer'lardaki bağlam-içi öğrenmenin büyük kısmının mekanik kaynağı olabileceğini öne sürer; ama kanıt güçlerini açıkça ayırırlar: küçük attention-only modeller için "güçlü, nedensel" (strong, causal) kanıt, MLP'li büyük modeller için ise yalnızca "korelasyonel" (correlational) kanıt sunarlar. Bu ayrım önemlidir: iddia büyük modeller için kesin değil, olasıdır.

### 6.4 Daha Çok Head Her Zaman Daha İyi mi? Head Redundancy ve Pruning

Hayır. Voita ve ark. (2019, "Analyzing Multi-Head Self-Attention"), head'lerin çoğunun gereksiz (redundant) olduğunu gösterdi: En önemli ve "kendinden emin" head'ler tutarlı, dilbilimsel olarak yorumlanabilir roller (pozisyonel, sözdizimsel, nadir kelimelere bakan) üstlenirken, geri kalanları performansı ciddi etkilemeden budanabilir (prune). İngilizce-Rusça çeviride 48 encoder head'inden 38'i budandığında BLEU düşüşü yalnızca 0.15 oldu. Michel ve ark. (2019) benzer biçimde çoklu head'in faydasını sorguladı.

Bu, "daha çok head = daha iyi anlama" eşitliğini çürütür. Multi-head'in değeri çeşitlilikte (farklı ilişki türlerini yakalama) yatar, salt sayıda değil; ve pratikte bu çeşitlilik beklenenden az sayıda head'de yoğunlaşır. Bu bulgu, doğrudan modern verimlilik tekniklerine (GQA, MQA) zemin hazırlar: madem head'lerin çoğu gereksiz, anahtar/değer projeksiyonlarını paylaştırabiliriz.

## 7. Güçlü Bulgular (İyi Desteklenen)

- **Self-attention'ın paralelleştirilebilirliği ve sabit yol uzunluğu**, RNN'lerin sıralı darboğazını ve uzun mesafe zorluğunu çözer. (Vaswani ve ark., 2017 — orijinal makale; geniş kabul.)
- **MLP katmanları parametrelerin 2/3'ünü oluşturur ve anahtar-değer hafızası gibi davranır.** (Geva ve ark., 2021 — doğrudan deneysel kanıt, insan-yorumlanabilir desenler.)
- **Residual stream, katmanlar arası toplamsal bir iletişim kanalıdır**; attention ve MLP buradan okuyup buraya yazar. (Elhage ve ark., 2021 — matematiksel çerçeve, geniş kabul gören analitik araç.)
- **Induction head'ler, eğitimde bağlam-içi öğrenmenin keskin gelişimiyle çakışır.** (Olsson ve ark., 2022 — küçük modeller için güçlü nedensel kanıt.)
- **Head'lerin çoğu performans kaybı olmadan budanabilir.** (Voita ve ark., 2019; Michel ve ark., 2019 — tekrarlanmış nicel sonuç.)
- **Attention'ın karesel maliyeti O(n²)'dir** ve FlashAttention bunu tam (exact) hesaplamayı koruyarak, yaklaşıklamadan, IO-farkındalıkla ele alır. (Dao ve ark., 2022 — donanım-temelli, matematiksel olarak kesin.)
- **"Lost in the middle" olgusu** sağlam biçimde belgelenmiştir. (Liu ve ark., 2024 — çoklu model ve görevde tekrarlanmış.)

## 8. Zayıf / Tartışmalı Noktalar

- **Attention ağırlıklarının yorumlanabilirliği**: Çözülmemiş bir tartışma (bkz. 6.1). Ne "açıklamadır" ne de "tamamen anlamsızdır"; bağlama ve amaca bağlıdır.
- **Superposition hipotezi**: Polysemanticity'yi açıklayan güçlü ama nihai olmayan bir çerçeve. Toy modellerin gerçek ağları ne kadar yansıttığı açık bir soru (Elhage ve ark., 2022 kendisi bunu tartışır).
- **Induction head'lerin büyük modellerdeki rolü**: Küçük modellerde nedensel kanıt güçlü, büyük (MLP'li) modellerde yalnızca korelasyonel. "Bağlam-içi öğrenmenin çoğu"ndan sorumlu oldukları iddiası bir hipotezdir.
- **Verimlilik teknikleri: mimari mi, optimizasyon mu?** Bu ayrım kritiktir. **FlashAttention bir mimari değişiklik değildir** — aynı matematiksel attention'ı, GPU bellek hiyerarşisini (HBM/SRAM) akıllıca kullanarak (tiling ve recomputation ile) daha hızlı ve az bellekle hesaplar (exact). Buna karşılık **Longformer'ın sliding window (kayan pencere) + global attention'ı, sparse attention ve linear attention gerçek mimari değişikliklerdir** — hesaplanan fonksiyonu değiştirir (her token artık her token'a bakmaz). Bu ikisini karıştırmak yaygın bir hatadır: biri "aynı şeyi daha hızlı yap", diğeri "farklı (yaklaşık) bir şey hesapla".
- **State-space modellerin (Mamba) attention'ı ikame edip edemeyeceği**: Mamba (Gu & Dao, 2023), özetindeki ifadeyle "Transformer'lardan 5× yüksek üretim verimi" (5× higher throughput) sağladığını ve **Mamba-3B'nin kendi boyutundaki Transformer'ları geçtiğini, iki katı boyuttaki Transformer'larla eşleştiğini** ("our Mamba-3B model outperforms Transformers of the same size and matches Transformers twice its size") bildirir. Ancak saf SSM'lerin "içerik-temelli" (content-based) hatırlama/kopyalama yeteneği attention'dan zayıftır — bu yüzden hibritler doğmuştur (bkz. 11).

## 9. Yanlış Anlaşılan Noktalar (Aktif Düzeltme)

1. **"Attention, modelin bilinçli olarak dikkat ettiğini gösterir."** Yanlış. Attention ağırlıkları bir bilgi-yönlendirme mekanizmasının ara çıktısıdır; modelin "neye önem verdiğine" dair şeffaf, nedensel bir açıklama değildir (Jain & Wallace, 2019; Serrano & Smith, 2019). "Dikkat" kelimesi insan bilişine dair bir çağrışım yaratır; bu çağrışım yanıltıcıdır.
2. **"Transformer = attention."** Yanlış. Parametrelerin üçte ikisi MLP katmanlarındadır (Geva ve ark., 2021) ve modelin hafıza/hesaplama işinin büyük kısmı orada yapılır. Attention bilgiyi taşır; MLP onu dönüştürür ve depolar.
3. **"Bağlam penceresi büyüdükçe model her bilgiyi eşit iyi kullanır."** Yanlış. "Lost in the middle" olgusu (Liu ve ark., 2024, TACL cilt 12, s.157-173): Modeller, ilgili bilgiyi bağlamın başında veya sonunda kullanmakta daha iyidir, ortasında belirgin biçimde daha kötüdür — performans karakteristik bir U eğrisi çizer (makalenin Figure 1 başlığı: *"...results in a U-shaped performance curve—models are better at using relevant information that occurs at the beginning or end of the input context"*). Bu, GPT-3.5-Turbo, GPT-4, Claude 1.3, LongChat-13B, MPT-30B ve Cohere Command dahil altı model ailesinde tekrarlandı; üstelik bu, açıkça "uzun bağlam" için tasarlanmış modellerde bile görülür. Performans, bağlam uzadıkça da düşer.
4. **"Daha çok head = daha iyi anlama."** Yanlış. Head'lerin büyük kısmı gereksizdir ve budanabilir (Voita ve ark., 2019). Önemli olan head sayısı değil, head çeşitliliği ve uzmanlaşmasıdır.

## 10. Kavramsal Harita

Transformer'i tek bir cümlede bağlamak: **Token'lar embedding'e çevrilir ve pozisyon bilgisiyle işaretlenir → residual stream'e yazılır → her katmanda attention (causal mask altında) token'lar arası bilgiyi taşır, MLP her token'da hafıza/hesaplama uygular, ikisi de residual stream'den okuyup ona yazar, layer norm bunu kararlı tutar → son residual stream durumu unembedding ile bir sonraki token'ın olasılık dağılımına çevrilir.**

Roller arası ayrım (karıştırmamak için):
- **Bağlam karıştırma (mixing across tokens)** = attention. "Nereden nereye bilgi?"
- **Token-içi dönüşüm/hafıza (within-token computation)** = MLP. "Bu bilgiyle ne yapılır?"
- **Bilgi taşıyıcısı / ortak kanal** = residual stream. "Bilgi nerede birikir?"
- **Sıra bilgisi** = positional encoding. "Hangi token nerede?"
- **Kararlılık** = layer normalization.
- **Üretim kuralı** = causal masking + autoregression.

## 11. 2026 İtibariyle Durum

2017 klasik Transformer'ı ile 2024-2026 modern büyük dil modelleri yapısal olarak şaşırtıcı derecede benzer kalsa da (temel iskelet aynı), birkaç eksende belirgin sapmalar oluştu. Bunları, "neyi optimize ediyor" diye gruplayalım.

**Pozisyon ve normalizasyon**: Mutlak/sinüzoidal kodlamadan RoPE'ye, Post-LN'den Pre-LN'e (ve RMSNorm'a) geçiş artık standart. Aktivasyon olarak SwiGLU yaygınlaştı.

**Attention'ın bellek maliyetini düşürme (KV cache)**: Otoregresif üretimde asıl darboğaz hesaplama değil, bellek bant genişliğidir — KV cache her token için saklanır ve uzun bağlamda devasalaşır. Çözümler:
- **Multi-Query Attention (MQA)** (Shazeer, 2019): Tüm sorgu head'leri tek bir K/V head'ini paylaşır. Cache'i çok küçültür ama kaliteyi düşürebilir.
- **Grouped-Query Attention (GQA)** (Ainslie ve ark., 2023): MHA ile MQA arası. Sorgu head'leri gruplara ayrılır, her grup bir K/V head'i paylaşır (ör. 32 sorgu head'i, 8 K/V grubu → 4× cache azalması). Kaliteyi MHA'ya yakın tutar. LLaMA 3, Mistral gibi açık-ağırlıklı modellerde fiili standart. Önemli pratik bulgu: Mevcut bir MHA modeli, orijinal eğitim hesabının ~%5'iyle "uptraining" ile GQA'ya dönüştürülebilir.
- **Multi-head Latent Attention (MLA)** (DeepSeek-V2, 2024; arXiv:2405.04434): GQA/MQA'dan farklı bir yol izler. Head sayısını azaltmak yerine, tüm anahtar/değer bilgisini **düşük-ranklı ortak sıkıştırma (low-rank joint compression)** ile token başına tek bir gizli (latent) vektöre indirir; yalnızca bu latent vektör cache'lenir, head'e özel K/V ise çıkarımda yukarı-projeksiyon matrisleriyle yeniden üretilir. Yazarların ifadesiyle: *"we introduce MLA, an attention mechanism equipped with low-rank key-value joint compression... MLA achieves superior performance compared with MHA, and meanwhile significantly reduces the KV cache during inference."* DeepSeek-V2, dense DeepSeek 67B'ye kıyasla **KV cache'i %93.3 azalttığını**, maksimum üretim verimini **5.76 katına** çıkardığını bildirir — ve GQA/MQA'nın aksine bunu kaliteden ödün vererek değil, MHA'dan **daha iyi** performansla yaptığını iddia eder (bu kalite iddiası yazarların kendi ablasyonlarına dayanır). RoPE ile uyumsuzluğu, ayrı bir "decoupled RoPE" stratejisiyle çözülür; MLA, DeepSeek-V3 ve R1'e de taşınmıştır.

**Parametre ölçeğini hesaplamadan ayırma**: **Mixture of Experts (MoE)**. Tek bir büyük FFN yerine birçok "uzman" (expert) FFN konur; bir yönlendirici (router/gate) her token'ı yalnızca en uygun birkaç uzmana gönderir (top-k). Böylece toplam parametre sayısı devasa olabilirken (yüz milyarlarca/trilyonlarca), token başına aktive olan parametre küçük kalır. Bu, FFN'in zaten parametrelerin çoğunu oluşturduğu gerçeğinin (Geva ve ark.) doğrudan ölçeklenme stratejisine dönüşmesidir. Gemini 1.5, Mixtral, DeepSeek-V3 ve Grok bu yaklaşımı kullanır.

**Karesel maliyete mimari saldırılar**: Sparse attention, linear attention, sliding window attention (Longformer; Mistral) — her token'ın her token'a bakma kuralını gevşetir. Longformer (Beltagy ve ark., 2020), sabit boyutlu kayan pencere + birkaç token'a global attention birleştirerek karmaşıklığı O(n²)'den O(n)'e indirir. Bunlar (FlashAttention'dan farklı olarak) hesaplanan fonksiyonu değiştiren gerçek mimari müdahalelerdir.

**State-space hibritleri**: Mamba (Gu & Dao, 2023) gibi seçici state-space modelleri (SSM), diziyi lineer zamanda işler ve sabit boyutlu bir tekrarlayan durum tutar — uzun bağlamda attention'ın karesel maliyetinden kaçınır. Ama saf SSM'ler içerik-temelli hatırlamada attention'dan zayıftır. Bu yüzden 2024-2025'te **hibrit mimariler** doğdu:
- **Jamba** (AI21 Labs, 2024; arXiv:2403.19887): Mamba ve attention katmanlarını harmanlar; **her 8 katmandan 1'i attention** olacak şekilde 1:7 oranı kullanır. **256K token** bağlam destekler (yazarların ifadesiyle "üretim sınıfı, kamuya açık modeller arasında en uzun desteklenen bağlam uzunluğu") ve uzun bağlamda Mixtral-8x7B'nin ~3× verimini sağlar. Mantığı yazarların kendi ifadesiyle: *"with long sequences, attention hogs most of the compute. In contrast, Mamba layers are more compute-efficient. Thus, increasing the ratio of Mamba layers improves throughput especially for long sequences"* — ama attention'ı, modelin kritik çağrışımsal bilgiyi kaybetmemesi için yeterince sık tutmak gerekir.
- **Zamba2** (Zyphra, 2024; arXiv:2411.15242): Mamba2 omurgası + paylaşılan attention blokları; **1:6 Mamba2-attention oranı**, yazarların ifadesiyle "saf transformer'lara kıyasla KV cache gereksinimimizi 6× azaltır." Gerekçe: SSM'in FLOP-verimliliğini, attention'ın bağlam-içi (in-context) hatırlama yeteneğiyle birleştirmek.

Bu hibritlerin ortak tezi şudur: attention pahalı ama hassas hatırlama için gerekli; SSM ucuz ve uzun-menzilli desenlerde iyi — ikisini doğru oranda birleştirmek, ikisinin de en iyi yönünü verir. 2026 itibariyle bu, en aktif mimari araştırma alanlarından biridir ve "Transformer öldü" demek için erkendir: saf Transformer hâlâ baskındır, ama saf değildir — yukarıdaki tüm sapmalar yaygınlaşmıştır.

## 12. Okuyucu İçin Zihinsel Model

Transformer'i bir **paylaşılan yazı tahtası (residual stream)** etrafında çalışan bir uzmanlar topluluğu olarak düşünün:
- Tahtaya başlangıçta token'lar yazılır ve her birinin yanına "kaçıncı sırada olduğu" not edilir (pozisyon bilgisi).
- Her turda (katman), iki tür uzman tahtaya bakar: **Attention uzmanları**, tahtadaki farklı notlar arasında bilgi taşır ("şu nottaki bilgi bu nota ait"); **MLP uzmanları**, her notu tek tek alıp üzerinde hafızalarına dayalı bir işlem yapar ("bu desen şu çıktıyı çağrıştırır"). İkisi de tahtayı silmez; **mevcut yazının üzerine ekleme yapar** (residual).
- Tahtanın yeri kıttır; uzmanlar birçok kavramı üst üste, sıkıştırarak yazmak zorunda kalır (superposition) — bu yüzden tahtadaki tek bir satır tek bir anlama gelmeyebilir (polysemanticity).
- Sonunda tahtanın son hali okunur ve bir sonraki kelimenin ne olacağına dair bir tahmin üretilir.

Bu modelden çıkan dört disiplin: (1) "Attention'ı modelin niyeti sanma" — o sadece bilgi taşıma kaydıdır. (2) "MLP'yi küçümseme" — iş orada da yapılır. (3) "Bağlam uzunluğunu kullanım sanma" — tahta büyük olsa da ortasındaki yazılar ihmal edilebilir. (4) "Head sayısını kalite sanma" — çoğu uzman gereksizdir.

## 13. Kaynakça

(Hangi kaynağın hangi iddiayı desteklediği parantez içinde belirtilmiştir.)

1. **Vaswani, A. ve ark. (2017). "Attention Is All You Need."** arXiv:1706.03762. → Transformer mimarisinin orijinal tanımı; self-attention, multi-head attention, sinüzoidal pozisyon kodlama, BLEU sonuçları (28.4 / 41.8); mimarinin tarihsel kırılımı.
2. **Hochreiter, S. & Schmidhuber, J. (1997). "Long Short-Term Memory."** → RNN'lerin kaybolan gradyan sorunu ve LSTM çözümü; Transformer'in çözmeye geldiği problemin arka planı.
3. **Elhage, N. ve ark. (2021). "A Mathematical Framework for Transformer Circuits."** transformer-circuits.pub. → Residual stream (iletişim kanalı) kavramı; QK ve OV devreleri; head'lerin toplamsal-bağımsız okunması; "residual stream bandwidth in high demand."
4. **Geva, M. ve ark. (2021). "Transformer Feed-Forward Layers Are Key-Value Memories."** EMNLP 2021, arXiv:2012.14913. → MLP'nin parametrelerin 2/3'ünü oluşturması; anahtar-değer hafızası yorumu; alt/üst katman shallow/semantic ayrımı; hafızaların bileşimi.
5. **Elhage, N. ve ark. (2022). "Toy Models of Superposition."** transformer-circuits.pub, arXiv:2209.10652. → Superposition ve polysemanticity; residual stream bant genişliği rekabeti; çerçevenin sınırları.
6. **Olsson, C. ve ark. (2022). "In-context Learning and Induction Heads."** transformer-circuits.pub, arXiv:2209.11895. → Induction head'ler; faz değişimi; bağlam-içi öğrenme ile çakışma; küçük modelde nedensel/büyükte korelasyonel kanıt ayrımı.
7. **Su, J. ve ark. (2021). "RoFormer: Enhanced Transformer with Rotary Position Embedding."** arXiv:2104.09864. → RoPE; döndürme matrisiyle mutlak konum + self-attention'a göreli konum bağımlılığı.
8. **Jain, S. & Wallace, B. (2019). "Attention is Not Explanation"** + **Wiegreffe, S. & Pinter, Y. (2019). "Attention is Not Not Explanation"** + **Serrano, S. & Smith, N. (2019). "Is Attention Interpretable?"** → Attention'ın yorumlanabilirliği tartışması (her iki taraf). Ayrıca Google Research, "saliency methods better suit our needs."
9. **Voita, E. ve ark. (2019). "Analyzing Multi-Head Self-Attention."** ACL 2019, arXiv:1905.09418. → Head redundancy ve pruning; uzmanlaşmış head'ler; 48→10 head, 0.15 BLEU düşüşü.
10. **Dao, T. ve ark. (2022). "FlashAttention."** arXiv:2205.14135. → O(n²) maliyet; IO-farkında, kesin (exact) hızlandırma (tiling/recomputation); "optimizasyon vs mimari" ayrımı.
11. **Liu, N. F. ve ark. (2024). "Lost in the Middle."** TACL cilt 12, s.157-173, arXiv:2307.03172. → Bağlam kapasitesi ile kullanım ayrımı; U-eğrisi; altı model ailesinde tekrar.
12. **Beltagy, I. ve ark. (2020). "Longformer."** arXiv:2004.05150. → Sliding window + global sparse attention; O(n) karmaşıklık; mimari müdahale örneği.
13. **Gu, A. & Dao, T. (2023). "Mamba: Linear-Time Sequence Modeling with Selective State Spaces."** arXiv:2312.00752. → SSM alternatifi; 5× üretim verimi; Mamba-3B kalite iddiası; içerik-temelli hatırlama zayıflığı.
14. **Ainslie, J. ve ark. (2023). "GQA."** EMNLP 2023. → Grouped-query attention; MQA-MHA arası; ~%5 hesapla uptraining.
15. **DeepSeek-AI (2024). "DeepSeek-V2."** arXiv:2405.04434. → Multi-head Latent Attention (MLA); düşük-ranklı ortak sıkıştırma; %93.3 KV cache azalması, 5.76× verim.
16. **Lieber, O. ve ark. (2024). "Jamba"** arXiv:2403.19887 + **Glorioso, P. ve ark. (2024). "Zamba2"** arXiv:2411.15242. → Transformer-SSM hibritleri; 1:7 ve 1:6 oranları; 256K bağlam; gerekçe.
17. **Tay, Y. ve ark. (2022). "Scaling Laws vs Model Architectures."** arXiv:2207.10551. → Mimari kabiliyet vs eğitim/ölçek ayrımı; inductive bias telafisi.
18. **Xiong, R. ve ark. (2020). "On Layer Normalization in the Transformer Architecture."** ICML 2020. → Pre-LN vs Post-LN; eğitim kararlılığı, gradyan akışı.

---

## GRILL-ME KALİTE KAPISI

**Bu konuda en yaygın yanlış basitleştirme nedir?**
Transformer'i "attention'dan ibaret" sanmak ve attention ağırlıklarını "modelin bilinçli dikkati" olarak okumak. Gerçekte attention yalnızca bir bilgi-yönlendirme mekanizmasıdır; parametrelerin üçte ikisini oluşturan MLP katmanları hafıza/hesaplama işinin büyük kısmını yapar (Geva ve ark., 2021) ve attention ağırlıkları nedensel bir açıklama sunmaz (Jain & Wallace, 2019).

**Bu konuyu anlamak önceki AI/LLM anlayışında neyi değiştirir?**
Modeli bir "kara kutu attention makinesi" olarak görmekten, residual stream üzerinde okuyan/yazan modüler bir hesaplama sistemi olarak görmeye geçirir. Bu, hem yorumlanabilirliği (devreler, induction head'ler) hem de modern mimari tercihlerini (MoE, GQA/MLA, hibritler) anlaşılır kılar — hepsi "attention pahalı, MLP büyük, residual stream kıt" gerçeklerine verilen yanıtlardır.

**Hangi iddia güçlü kaynaklarla destekleniyor?**
MLP'nin parametrelerin 2/3'ünü oluşturması ve hafıza gibi davranması (Geva ve ark., 2021); residual stream'in toplamsal iletişim kanalı olması (Elhage ve ark., 2021); attention'ın O(n²) maliyeti ve FlashAttention'ın bunu kesin biçimde hızlandırması (Dao ve ark., 2022); head redundancy (Voita ve ark., 2019); "lost in the middle" (Liu ve ark., 2024). Bunlar tekrarlanmış, nicel veya analitik olarak sağlam bulgulardır.

**Hangi iddia hâlâ tartışmalı?**
Attention ağırlıklarının yorumlanabilirliği (açıklama mı, değil mi); superposition'ın gerçek ağları ne kadar doğru modellediği; induction head'lerin büyük modellerde bağlam-içi öğrenmenin "çoğundan" sorumlu olup olmadığı (küçük modeller için nedensel, büyük için korelasyonel kanıt); SSM hibritlerinin saf Transformer'ı ne ölçüde ikame edeceği.

**Okuyucu bu belgeyi okuduktan sonra hangi kavramı daha ciddiye almalı?**
**Residual stream.** Popüler anlatımda neredeyse hiç geçmez, ama Transformer'deki bilgi akışının bel kemiğidir. Onu anlamadan, ne attention ile MLP'nin nasıl haberleştiği, ne superposition'ın neden ortaya çıktığı, ne de Pre-LN'in neden tercih edildiği anlaşılabilir.

---

## "Transformer'i Anlamak İçin Neden Attention Kadar Residual Stream, MLP Katmanları ve Pozisyon Bilgisini de Anlamak Gerekir?"

Çünkü bu dört bileşen, Transformer'deki dört ayrı ve birbirine indirgenemez işlevi yerine getirir; biri eksik anlaşıldığında mimarinin tamamı yanlış kurulur:

- **Attention olmadan** token'lar arası bilgi akışı (bağlam karıştırma) olmaz — ama attention tek başına her token'da yalnızca diğer token'ların ağırlıklı ortalamasını üretir; yeni, doğrusal olmayan bilgi katamaz.
- **MLP olmadan** bu taşınan bilgi üzerinde hesaplama ve hafıza erişimi yapılamaz. Parametrelerin 2/3'ü oradadır; modelin "bildiği" çoğu şey MLP'de depolanır. Attention'a odaklanıp MLP'yi atlamak, modelin neredeyse tüm hafızasını görmezden gelmektir.
- **Residual stream olmadan** bu iki bileşenin nasıl haberleştiği anlaşılamaz. Attention ve MLP birbirine doğrudan bağlı değildir; ortak bir toplamsal kanal üzerinden okuyup yazarlar. Devreler, induction head'ler, superposition, hatta layer norm yerleşimi — hepsi bu kanalın varlığıyla anlamlanır.
- **Pozisyon bilgisi olmadan** attention sıra-kör olur; "köpek kediyi ısırdı" ile "kediyi köpek ısırdı" ayırt edilemez. Dil sıralı olduğu için bu bilgi ayrıca enjekte edilmek zorundadır ve nasıl enjekte edildiği (sinüzoidal/öğrenilmiş/RoPE) doğrudan modelin uzun bağlama genelleme yeteneğini etkiler.

Kısacası: **Attention bilgiyi taşır, MLP onu dönüştürür ve depolar, residual stream ikisini birbirine bağlar, pozisyon bilgisi tüm bunlara sıra duygusu verir.** Transformer, bu dördünün etkileşimidir; "attention'dan ibaret" değildir. Mimariyi yalnızca attention üzerinden anlatmak, bir orkestrayı yalnızca birinci kemanla anlatmaya benzer — melodinin bir kısmını duyarsınız, ama eseri değil.