---
article_id: article_369f2a20-9858-4b6f-8478-ca0972833d43
title: "Dikkatin Ötesi: SSM ve Alternatif Mimariler"
slug: dikkatin-otesi-ssm-ve-alternatif-mimariler
category: multimodal-and-future
level: intermediate
reading_order: 86
summary: "7 ve 15'te açık bırakılan kapıyı kapatıyor. Önce \"karesel\" sözcüğünü ikiye ayırıyor: eğitimde ikili sayısıyla büyüyen hesap ile çıkarımda uzunlukla büyüyen anahtar-değer önbelleği ayrı maliyetlerdir ve alternatifler farklı olanı hedefler. Üç aileyi kuruyor — seyreklik, doğrusal dikkat ve durum uzayı modelleri — ve durum uzayı modellerinin iki görünüşünü (eğitimde evrişim, çıkarımda yineleme) veriyor. Asıl mesele takas: dikkat her şeyi saklar, sabit durum bir özet tutar. Bedeli ölçülmüş — 410 milyon parametreli bir Transformer, rehber yeterince uzadığında 2,8 milyarlık bir durum uzayı modelini geçiyor, üstelik ikincisi Pile'da daha düşük perplexity verirken; ve boşluğun ortalamada yüzde 82'si çağrışımsal geri çağırmadan geliyor. Kanıtlanan sınır ise beklentiyi bozuyor: yinelemeye rağmen bu modellerin ifade gücü Transformer'ınkiyle aynı sınıfta. Kapanışta melez mimariler ve baytları dinamik yamalara toplayan düzen."
tags:
  - durum-uzayi-modelleri
  - dogrusal-dikkat
  - seyrek-dikkat
  - melez-mimariler
  - karesel-maliyet
content_hash: sha256:ff096a30520de67c4761ce567f6e59b5270c87bcdafbe31e0e4132acddf8341e
classification_version: 1
classification_batch: 20
revised_at: "2026-09-25"
revision_note: "Durum uzayı modelinin 'eğitimde evrişim, çıkarımda yineleme' iki görünüşü tek sayılık bir örnek ve yeni bir şemayla kuruldu; seçicilik ile tarama açıklandı."
---
## 7'de açık bırakılan kapı

7\. makalenin sonunda bir kapı açık bırakmıştık. Transformer'ın ne yaptığını küçültmediğimizi söyledikten sonra şunu eklemiştik: dikkat, dizideki uzak bağlantıları kurmanın tek yolu değil; aynı işi karesel maliyet ödemeden yapmayı deneyen mimariler var. 15\. makalede de aynı numaraya bir borç daha bırakılmıştı — sabit sözlüğü tamamen atan mimarilerin nasıl kurulduğu ve dikkatin karesel maliyetine getirilen öbür alternatifler. İkisi de bu makalede.

Ama önce bir temizlik gerekiyor, çünkü "karesel maliyet" tek bir şey değil. İki ayrı maliyetin adı ve alternatif mimarilerin çoğu ikisinden yalnızca birini hedefliyor.

## "Karesel" olan tam olarak ne

Dikkatin hesabı 6\. makalede kurulmuştu: her konum, dizideki bütün konumlar için bir benzerlik puanı üretir. Uzunluk `L` ise puan sayısı `L`'nin karesidir. Ama bu sayının nereye yansıdığı, modelin hangi aşamada olduğuna bağlı.

**Eğitimde ve ön dolumda** bütün dizi bir kerede işlenir, dolayısıyla hesap gerçekten `L`'nin karesiyle büyür. Bellek tarafı bir dönem aynı derecede kötüydü — puan tablosunun tamamı yazılıyordu — fakat Tri Dao ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma bunu düzeltti: tabloyu hiç yazmadan, işi bellek hiyerarşisine göre parçalayarak **tam olarak aynı** dikkati hesaplayan bir düzen kurdular. Yani bellek doğrusallaştı, hesap karesel kaldı.

**Üretim sırasında** durum farklı. 26\. makalede gördüğümüz gibi, üretilen her yeni token için model önbellekteki bütün anahtar ve değerleri okur. Token başına maliyet `L` ile doğrusal büyür, ve önbelleğin **belleği** de `L` ile doğrusal büyür. Yani üretimdeki dert karesel bir hesap değil, uzunlukla büyüyen bir durum.

Bu ayrımı yapmak zorundayız, çünkü alternatif mimariler ikisinden farklı olanına saldırıyor. Şekil 1 iki maliyeti ve hangi ailenin hangisini hedeflediğini veriyor.

![İki bölmeli tablo ve altında aile eşleştirmesi. Üst bölme eğitim ve ön dolum: bütün dizi bir kerede işlenir, hesap uzunluğun karesiyle büyür, bellek ise tabloyu hiç yazmadan çalışan tam dikkat algoritmasıyla doğrusallaştırılmıştır ve o algoritma yaklaşık değil tam sonuç verir. Alt bölme üretim: her yeni token için önbellekteki bütün anahtar ve değerler okunur, token başına maliyet uzunlukla doğrusal büyür ve önbelleğin belleği de uzunlukla doğrusal büyür. Altta üç aile ve hedefleri: seyrek dikkat ikili sayısını azaltır ve eğitim tarafını hedefler; doğrusal dikkat toplamı biriktirilebilir hâle getirip modeli matris durumlu bir yinelemeye çevirir ve iki tarafı birden hedefler; durum uzayı modelleri sabit boyutlu bir durum tutar ve üretim tarafını hedefler. En altta bir uyarı: işlem sayısını azaltmak duvar saatini azaltmaya yetmez, çünkü darboğaz çoğu zaman bellek erişimidir.](assets/iki-ayri-karesel-maliyet.svg "Şekil 1 — İki ayrı maliyet: karesel hesap ile büyüyen önbellek")

Şekil 1'in en altındaki uyarı, aynı tam dikkat çalışmasının kendi gerekçesi: yaklaşık dikkat yöntemleri işlem sayısını düşürüyor fakat çoğu zaman duvar saatinde hızlanma sağlamıyor, çünkü asıl darboğaz aritmetik değil bellek erişimi.

## Üç aile

**Birinci aile seyrek dikkat** (sparse attention). Her ikiliyi hesaplamak yerine bir alt kümesini hesapla. Iz Beltagy ve arkadaşlarının 2020'de yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışma iki desen birleştiriyor: her token kendi çevresindeki bir pencereye bakar, ve az sayıda özel token bütün diziye bakar. Manzil Zaheer ve arkadaşlarının NeurIPS 2020'de sunduğu çalışma buna rastgele bağlantılar ekliyor ve iki kuramsal sonuç kanıtlıyor: bu seyrek desen dizi fonksiyonlarının evrensel bir yaklaştırıcısıdır ve Turing tamdır — yani tam dikkatin kuramsal gücünden vazgeçilmiyor. Ölçüm tarafında aynı donanımda 8 kata kadar uzun diziler işlenebiliyor.

**İkinci aile doğrusal dikkat** (linear attention). Angelos Katharopoulos ve arkadaşlarının ICML 2020'de sunduğu çalışma cebirsel bir hamle yapıyor. Softmax'ta her yeni sorgu geçmişteki bütün anahtarlarla yeniden karşılaştırılmak zorundadır, çünkü `exp(q · k)` sorguya ait bir parça ile anahtara ait bir parçanın çarpımı olarak sonlu biçimde yazılamaz. Benzerlik, sorgunun ve anahtarın ayrı ayrı dönüştürülüp nokta çarpımı alınmış hâli olarak yazılırsa — `φ(q) · φ(k)`; buna çekirdek biçiminde benzerlik deniyor — toplamın sırası değiştirilebilir ve sorgu toplamın dışına çıkar. Geriye sorgudan bağımsız, **birikimli** bir toplam kalır: her yeni token'da tek bir terim eklenerek güncellenen bir matris, `S_t = S_(t−1) + φ(k_t) v_tᵀ`. Sonuç şu: model, gizli durumu bir vektör değil bir **matris** olan bir yinelemeli ağa dönüşüyor. Üretimde her adımda bu matris güncelleniyor ve geçmişe hiç dönülmüyor — çok uzun dizilerde 4000 kata varan hızlanma bildiriliyor. Krzysztof Choromanski ve arkadaşlarının ICLR 2021'de sunduğu çalışma aynı fikri softmax'ı rastgele özelliklerle yansız biçimde kestirerek kuruyor.

**Üçüncü aile durum uzayı modelleri** (state space model, SSM). Kökü sinyal işlemede: girdiyi sürekli zamanlı doğrusal bir sistemden geçir, sistemin durumunu güncelle, durumdan çıktı üret. Albert Gu ve arkadaşlarının ICLR 2022'de sunduğu çalışma bunu derin öğrenmeye taşıyor ve iki görünüşünü birden kullanıyor. **Eğitimde** yineleme, tek bir uzun evrişim çekirdeğine açılabiliyor — yani bütün dizi paralel işlenebiliyor. **Çıkarımda** aynı model bir yinelemeye geri katlanıyor ve sabit boyutlu bir durumla adım adım çalışıyor. Kanıtı zorlu bir görevde geldi: 16.384 uzunluğundaki uzun erimli bağımlılık görevini, o güne kadarki bütün modellerin başarısız olduğu görevi, yüzde 88 doğrulukla çözen ilk model oldu.

### Tek sayılık bir durumla iki görünüş

İki görünüşün neden aynı hesap olduğunu en küçük hâliyle görelim. Durum tek bir sayı olsun, `h`. Her adımda eski durum bir `a` katsayısıyla küçülür, yeni girdi `b` katsayısıyla eklenir, çıktı durumun `c` katıdır:

`h_t = a · h_(t−1) + b · x_t`, `y_t = c · h_t`

Sözle: durum, geçmişin sönümlenen bir özetidir; `a` bire yakınsa geçmiş uzun süre hatırlanır, sıfıra yakınsa çabuk unutulur. Gerçek modellerde durum tek bir sayı değil çok boyutlu bir vektördür ve `a` bir matristir, ama mantık aynıdır.

Sayılarla — açıklama amaçlı, kendi seçimimiz: `a = 0,5`, `b = 1`, `c = 1`, girdi dizisi `1, 0, 2`. Yineleme olarak adım adım: `h_1 = 1`, `h_2 = 0,5 × 1 + 0 = 0,5`, `h_3 = 0,5 × 0,5 + 2 = 2,25`. Her adımda yalnızca bir önceki durum gerekir; bellek sabittir ama adımlar birbirini bekler.

Şimdi aynı hesabı açalım. `h_3`'te `h_2`'yi, onda da `h_1`'i yerine koyarsak `y_3 = 1 × x_3 + 0,5 × x_2 + 0,25 × x_1 = 2 + 0 + 0,25 = 2,25` çıkar. Yani her çıktı, girdilerin sabit bir ağırlık listesiyle — `1; 0,5; 0,25; …`, genel olarak `c · aᵏ · b` — tartılmış toplamıdır. Bu bir evrişimdir: aynı ağırlık listesi (kaynaktaki adıyla evrişim çekirdeği) dizinin her konumunda kayarak uygulanır ve bütün çıktılar birbirini beklemeden, aynı anda hesaplanabilir. Açılımı mümkün kılan, adımlar arasındaki güncellemenin doğrusal olması; eski yinelemeli ağlarda her adımda doğrusal olmayan bir fonksiyon araya girdiği için bu açılım yapılamıyordu. Şekil 2 iki görünüşü yan yana koyuyor.

![İki bölmeli şema; aynı tek sayılık durum uzayı hesabı iki biçimde. Üst bölme yineleme: girdiler 1, 0 ve 2 sırayla üç kutuya girer; kutular h1 eşittir 1, h2 eşittir 0,5 ve h3 eşittir 2,25; kutular arasındaki oklar çarpı 0,5 ile etiketli, yani eski durum her adımda yarıya iner ve yeni girdi eklenir; bellek sabittir ama adımlar birbirini bekler. Alt bölme evrişim: girdi satırı 1, 0, 2 ve altında ağırlık satırı 0,25, 0,5, 1; sonuç y3 eşittir 0,25 çarpı 1 artı 0,5 çarpı 0 artı 1 çarpı 2, yani 2,25, yinelemeyle aynı. En altta kayıt: iki görünüş ancak a, b ve c her adımda aynıysa eşdeğerdir; seçicilik a'yı girdiye bağlayınca tek bir ağırlık listesi kalmaz ve yerine paralel tarama geçer.](assets/ayni-hesabin-iki-gorunusu.svg "Şekil 2 — Aynı hesap, iki görünüş: adım adım yineleme ve tek seferde evrişim")

İki görünüşün eşdeğer olmasının bir koşulu var ve bir sonraki adımı anlamak için tam o koşul gerekiyor: ağırlık listesi ancak `a`, `b` ve `c` her adımda **aynıysa** tek bir listedir.

Albert Gu ve Tri Dao'nun COLM 2024'te sunduğu çalışma bu ailenin bugünkü hâlini kurdu. Eklenen şeye **seçicilik** (selectivity) deniyor: sistemin parametreleri sabit olmaktan çıkıp girdiye bağlı hâle geliyor, böylece model neyi hatırlayıp neyi unutacağına içeriğe bakarak karar verebiliyor — kabaca, yukarıdaki `a` ile `b`'nin her token'da yeniden ayarlanabilmesi: önemsiz bir token'da `a` bire yakın kalır, durum korunur ve girdi neredeyse hiç yazılmaz; önemli bir token'da eski durum hızla sönümlenir ve yeni girdi yazılır. Bedeli, evrişim görünüşünün kaybolması: `a` her adımda değişince tek bir ağırlık listesi yazılamıyor. Yazarlar bunu donanıma göre yazılmış paralel bir **tarama** algoritmasıyla telafi ediyorlar; tarama, adımları sırayla değil ikişer ikişer birleştirip ağaç biçiminde topladığı için yine paralel çalışabiliyor. Bildirilen sonuç: Transformer'lara göre 5 kat yüksek üretim verimi, ve 3 milyarlık sürümde aynı boyuttaki Transformer'ları geçip iki katı boyuttakilerle eşitlenme. Tri Dao ve Albert Gu'nun ICML 2024'te sunduğu devam çalışması ise iki ailenin göründüğü kadar uzak olmadığını gösteriyor: belirli bir yapılandırılmış matris sınıfı üzerinden dikkat ile durum uzayı modelleri arasında bir ikilik kuruyorlar.

Bu üç ailenin ortak bir tarihsel yanı var. 5\. makalede **yinelemeli** dil modellerini adıyla anmış, 6 ve 7'de neden terk edildiklerini görmüştük: dizinin geçmişini sabit boyutlu bir gizli durumda taşıyorlar ve tam da bu yüzden adımları sırayla işlemek zorunda kalıyorlardı; Transformer'ın 2017'deki kazancı yinelemeyi atmaktı. Şimdi olan şey, yinelemenin geri gelmesi — ama eğitimde paralel çalışabilen bir biçimde. Bo Peng ve arkadaşlarının EMNLP 2023 Findings'te sunduğu çalışma bunu adıyla söylüyor: aynı model eğitimde Transformer gibi, çıkarımda yinelemeli ağ gibi yazılabiliyor; ve 14 milyar parametreye kadar ölçekleyip benzer boyuttaki Transformer'larla eşit başarı bildiriyorlar. Yani tartışma "yineleme mi dikkat mi" değil; hangi görünüşün hangi aşamada kullanılacağı.

## Sabit durum bir seçimdir, ve bedeli ölçülmüştür

Bütün bu ailenin ortak vaadi tek cümlede özetlenebilir: dikkat geçmişin **tamamını** saklar, durum uzayı modeli sabit boyutlu bir **özet** tutar. Kazanç buradan gelir — özet büyümediği için token başına maliyet uzunluktan bağımsızlaşır. Bedel de buradan gelir; Şekil 3 takasın iki yakasını ve ölçülen bedeli topluyor, ve bedeli ölçen üç çalışma şunlar.

Samy Jelassi ve arkadaşlarının ICML 2024'te sunduğu çalışma en doğrudan olanı. Kuramsal tarafta: iki katmanlı bir Transformer, baş sayısında üstel uzunlukta dizileri kopyalayabilir; sabit durumlu modeller ise durumlarının boyuyla **temelden** sınırlıdır. Deneysel tarafta: önceden eğitilmiş modellere bağlam içinde bir telefon rehberi verilip bir isme karşılık gelen numara soruluyor. Bulgu keskin — rehber yeterince uzadığında (yetmiş kayıt ve üstü) 410 milyon parametreli bir Transformer, 2,8 milyar parametreli bir durum uzayı modelini geçiyor. Üstelik o durum uzayı modeli, dil modelleme ölçütünde **daha düşük** perplexity veriyor.

Simran Arora ve arkadaşlarının ICLR 2024'te sunduğu çalışma boşluğu nicelendiriyor. On yedi model eğitip karşılaştırıyorlar: kapılı evrişimli mimariler dil modellemede dikkatin 2,1 perplexity puanına kadar gerisinde kalıyor, ve ince ayrıştırmada bu boşluğun ortalamada **yüzde 82'si** tek bir yetenekten geliyor: bağlamda daha önce geçmiş bir eşleşmeyi geri çağırmak. Aynı görevde 70 milyon parametreli bir dikkat modeli, 1,4 milyar parametreli bir kapılı evrişim modelini geçiyor. Çözüm tarafı da ölçülmüş: girdiye bağlı seyrek dikkat deseni taşıyan melezler, boşluğun yüzde 97,4'ünü kapatıyor.

Üçüncü çalışma beklentiyi başka bir yerden bozuyor. William Merrill ve arkadaşlarının ICML 2024'te sunduğu çalışma şunu soruyor: yinelemeli formülasyon, Transformer'ın yapamadığı **durum takibini** kazandırıyor mu? Cevap hayır. Bu modellerin ifade gücünün Transformer'ınkiyle aynı karmaşıklık sınıfında sınırlı olduğunu kanıtlıyorlar; permütasyon bileşkesi gibi basit durum takibi problemlerini çözemiyorlar, dolayısıyla belirli bir gösterimdeki satranç hamlelerini izlemek, kodu değerlendirmek ya da uzun bir anlatıda kimin ne yaptığını takip etmek gibi işlerde de güvenilir olamıyorlar. Yazarların ifadesiyle: bu modellerdeki "durum" bir yanılsama.

![İki sütunlu karşılaştırma tablosu; sütunlar dikkat ve sabit durumlu model. Satırlar: geçmiş nasıl tutulur, token başına maliyet, bellek, neyi kolay yapar, neyi zor yapar. Dikkat geçmişin tamamını anahtar-değer önbelleğinde tutar, token başına maliyeti uzunlukla doğrusal büyür, belleği uzunlukla büyür, bağlamda geçen bir eşleşmeyi geri çağırmayı kolay yapar ve uzun bağlamda büyüyen önbellek onun zor tarafıdır. Sabit durumlu model geçmişi sabit boyutlu bir özette tutar, token başına maliyeti uzunluktan bağımsızdır, belleği sabittir, uzun dizilerde ucuz üretimi kolay yapar ve geri çağırmayı zor yapar. Altta üç ölçüm: rehber yetmiş kaydı geçtiğinde 410 milyon parametreli bir Transformer 2,8 milyarlık bir durum uzayı modelini geçiyor, üstelik ikincisi dil modelleme ölçütünde daha düşük perplexity veriyor; on yedi modelde 2,1 perplexity puanına varan boşluğun ortalamada yüzde 82'si çağrışımsal geri çağırmadan geliyor; ve yinelemeye rağmen ifade gücü Transformer ile aynı sınıfta sınırlı, yani durum takibi kazanılmıyor.](assets/buyuyen-onbellek-ile-sabit-durum.svg "Şekil 3 — Büyüyen önbellek ile sabit durum: ne kazanılıyor, ne kaybediliyor")

> **Kendini yokla:** Bir durum uzayı modeli dil modelleme ölçütünde daha düşük perplexity veriyorsa, telefon rehberi görevinde neden geride kalabiliyor?

Çünkü perplexity bütün token'lar üzerinden bir **ortalamadır** ve 5\. makalede kurulduğu gibi ortalama, azınlığı gizler. Metnin büyük çoğunluğunda bir sonraki token'ı kestirmek için yakın bağlam yeter; sabit durumun sildiği bilgi orada gerekmez. Rehber görevinde ise cevap tam olarak o silinen bilgidedir, ve tek bir token'ın doğru olması bütün görevi belirler. 79\. makaledeki ayrımın aynısı: ortalama başarı ile tutarlı başarı ayrı şeylerdir, ve hangi ölçünün seçildiği hangi mimarinin kazandığını değiştirir.

## Bu yüzden melez

İki ölçüm ailesi bir araya gelince alanın vardığı yer şaşırtıcı değil: ikisini karıştır.

Roger Waleffe ve arkadaşlarının 2024'te yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışma bunun en temiz karşılaştırmasını veriyor, çünkü kontrollü: 8 milyar parametreli durum uzayı modelleri ile Transformer'lar **aynı veriyle**, 3,5 trilyon token'a kadar eğitiliyor. Sonuç iki parçalı. Saf durum uzayı modelleri pek çok görevde Transformer'ları yakalıyor ya da geçiyor; ama kopyalama ve örnekle öğrenme gerektiren görevlerde — beş örnekli sınavlar ve rehber görevi — ve uzun bağlamlı akıl yürütmede geride kalıyorlar. Melez model ise — katmanların yüzde 43'ü durum uzayı, yüzde 7'si öz-dikkat, yüzde 50'si ileri beslemeli — değerlendirilen on iki standart görevin **hepsinde** Transformer'ı geçiyor, ortalamada 2,65 puan farkla, ve üretimde 8 kata varan hızlanma öngörülüyor.

AI21 Labs'ın Jamba ekibinin ICLR 2025'te sunduğu çalışma iki verimlilik eksenini birleştiriyor: hem melez hem uzmanlar karışımı. Sonuç, 52 milyar toplam ve 12 milyar etkin parametreyle 256 bin token bağlamı destekleyen ve tek bir 80 GB'lık hızlandırıcıya sığan bir model. Önceki makaledeki ayrımın burada işlediğine dikkat: seyreklik belleği hesaptan ayırıyor, melez yapı ise önbelleği uzunluktan ayırıyor; ikisi farklı maliyetlere dokunduğu için birlikte kullanılabiliyorlar.

Soham De ve arkadaşlarının 2024'te yayımladığı — hakemli bir yerde yayımlandığı doğrulanamayan — çalışma aynı deseni başka bir bileşimle kuruyor: kapılı doğrusal yinelemeler ile **yerel** dikkatin karışımı. Bildirdikleri sonuç, 7 ve 14 milyar parametreli sürümlerin, yaygın bir açık modelin eğitim token'larının altıda birinden azıyla eğitilmiş olmalarına rağmen o modelin başarısını yakalaması.

## Aynı bedelin öbür ucu: diziyi kısaltmak

15\. makale iki şey bırakmıştı ve ikincisi henüz ödenmedi: sabit sözlüğü atan mimariler nasıl kuruluyor?

Bağ şurada. Bir Transformer'ın maliyeti dizinin uzunluğuna bağlıysa, maliyeti düşürmenin üçüncü bir yolu mimariyi değiştirmek değil, **diziyi kısaltmaktır**. Tokenizasyon zaten bunu yapıyor; sorun, sabit bir sözlüğün her metne aynı davranması.

Artidoro Pagnoni ve arkadaşlarının ACL 2025'te sunduğu çalışma bunu değiştiriyor. Metin ham baytlar hâlinde alınıyor ve yamaların sınırı, bir sonraki baytın **entropisine** göre belirleniyor: küçük bir model bir sonraki baytın ne kadar öngörülebilir olduğunu kestiriyor, öngörülebilir bölgelerde yama uzuyor, zorlaştığı yerde kısalıyor. Ana model bu yamalar üzerinde çalışıyor, hafif kodlayıcı ve çözücüler bayt ile yama arasında gidip geliyor. Yani hesap, sabit bir sözlüğün kararına göre değil metnin zorluğuna göre dağıtılıyor. 15'te bu çalışmanın ölçek sonucunu görmüştük; buraya ait olan kısmı maliyet tarafı: 8 milyar parametreye kadar eşitlenme, ve çıkarım işleminde yüzde 50'ye varan tasarruf.

## Ne ölçüyoruz

Bu alanda cetvel sorunu belirgin. Yi Tay ve arkadaşlarının ICLR 2021'de sunduğu ölçüt, verimli mimarileri karşılaştırmak için kurulmuş uzun dizili görevlerden oluşuyor ve alanın standart tahtası oldu. 71\. makalenin uyarısı burada da geçerli: bir ölçüt neyin ilerleme sayılacağını tanımlar, ve bu tahtadaki görevler dil modelleme değil. Nitekim bu tahtada iyi olan bazı mimarilerin dil modellemede aynı üstünlüğü göstermediğini yukarıdaki ölçümler gösterdi.

İkinci cetvel sorunu işlem sayısıyla ilgili ve Şekil 1'in altındaki uyarıya bağlanıyor: bir mimarinin işlem sayısını düşürmesi, gerçek donanımda hızlanacağı anlamına gelmiyor.

Şekil 4 üç aileyi bu üç ölçütle birlikte özetliyor. Üçüncü cetvel sorunu ise dikkatin kendi tarafındaki gelişmeleri saymamaktan geliyor. Anahtar-değer önbelleğini küçültmenin mimari aile değiştirmeden bir yolu var: birden çok dikkat başının anahtar ve değerleri paylaşması. Noam Shazeer'in 2019'da önerdiği uç biçimde bütün başlar tek bir anahtar-değer kümesini paylaşıyor; Joshua Ainslie ve arkadaşlarının EMNLP 2023'te sunduğu ara biçimde başlar gruplara ayrılıyor ve her grup kendi kümesini paylaşıyor. İkinci çalışmanın pratik katkısı, mevcut bir modelin ön eğitim hesabının yalnızca yüzde 5'i kadar ek eğitimle bu biçime çevrilebilmesi. Dikkatten vazgeçme baskısı, göründüğünden düşük olmasının bir sebebi bu.

![Üç satırlı karşılaştırma tablosu; satırlar seyrek dikkat, doğrusal dikkat ve durum uzayı modelleri. Sütunlar neyin yerine geçtiği, maliyet yapısı ve neyin feda edildiği. Seyrek dikkat bütün ikilileri hesaplamanın yerine seçilmiş bir alt kümeyi koyar, maliyeti uzunlukla doğrusaldır ve aynı donanımda sekiz kata kadar uzun dizi işlenebilir, feda edilen şey her konumun her konuma doğrudan erişimidir çünkü bağlantı ancak birkaç katman üzerinden kurulur. Doğrusal dikkat softmax'ın yerine çekirdek biçiminde bir benzerlik koyar, toplam birikimli tutulabildiği için model matris durumlu bir yinelemeye dönüşür ve çok uzun dizilerde dört bin kata varan hızlanma bildirilmiştir, feda edilen şey softmax'ın keskin seçiciliğidir. Durum uzayı modelleri dikkatin yerine sabit boyutlu bir durum koyar, eğitimde evrişim olarak paralel çıkarımda yineleme olarak sabit maliyetlidir, feda edilen şey geri çağırmadır ve durum takibi kazanılmaz. En altta bir kayıt: üçünün de bugünkü pratik hâli melezdir, çünkü kaybedilen yetenek küçük bir dikkat payıyla geri alınabiliyor.](assets/uc-ailenin-takasi.svg "Şekil 4 — Üç aile: neyin yerine geçiyor, ne feda ediliyor")

> **Kendini yokla:** Melez bir modelde dikkat katmanlarının oranı neden bu kadar düşük tutulabiliyor?

Çünkü kaybedilen yetenek dar. Ölçümler, boşluğun büyük kısmının tek bir işten — bağlamda geçmiş bir eşleşmeyi geri çağırmaktan — geldiğini söylüyor, ve o iş için dizinin tamamına erişen az sayıda katman yetiyor. Geri kalan katmanların yaptığı iş, sabit boyutlu bir özetle de yapılabiliyor. Yüzde 7'lik bir dikkat payının on iki görevin hepsinde Transformer'ı geçmeye yetmesinin sebebi bu: maliyeti doğuran şey her katmandaki tam erişim, kaliteyi doğuran şey ise birkaç katmandaki tam erişim.

## Alternatif mimarilerin disiplini

**"Karesel" iki ayrı maliyetin adıdır.** Eğitim ve ön dolumda hesap uzunluğun karesiyle büyür; üretimde ise token başına maliyet ve önbellek uzunlukla doğrusal büyür. Bir mimari önerisi hangisini çözdüğünü söylemeden değerlendirilemez.

**İşlem sayısı duvar saati değildir.** Yaklaşık dikkat yöntemlerinin çoğu işlem sayısını düşürür ama hızlanma getirmez, çünkü darboğaz bellek erişimidir; bunu gösteren düzen, dikkati yaklaştırmadan tam hesaplayıp yalnızca bellek erişimini düzenler.

**Durum uzayı modellerinin iki görünüşü vardır.** Doğrusal bir yineleme, girdilerin sabit bir ağırlık listesiyle tartılmış toplamına açılabildiği için eğitimde evrişim olarak paralel çalışır, çıkarımda yineleme olarak sabit maliyetlidir; seçicilik katsayıları girdiye bağlayınca tek liste kalmaz ve yerine donanıma göre yazılmış bir tarama geçer.

**Sabit durum, geri çağırmayla ödenir.** Rehber yetmiş kaydı geçtiğinde 410 milyon parametreli bir Transformer 2,8 milyarlık bir durum uzayı modelini geçiyor; ölçülen perplexity boşluğunun ortalamada yüzde 82'si çağrışımsal geri çağırmadan geliyor.

**Yineleme, durum takibi kazandırmaz.** Bu modellerin ifade gücü Transformer'ınkiyle aynı sınıfta sınırlıdır; permütasyon bileşkesi gibi problemleri çözemezler.

**Ortalama cetvel, mimari tercihini gizler.** Daha düşük perplexity veren bir model, tek bir token'ın belirlediği bir görevde belirgin biçimde geride kalabilir.

**Pratik cevap melezdir.** Katmanların küçük bir bölümünde tam dikkat tutmak kaybedilen yeteneği geri veriyor; on iki görevin hepsinde üstünlük, yüzde 7'lik bir dikkat payıyla elde edilmiş durumda.

**Diziyi kısaltmak da bir alternatiftir.** Yama sınırlarını metnin entropisine göre belirleyen düzen, hesabı sabit bir sözlüğün kararına göre değil metnin zorluğuna göre dağıtıyor ve çıkarım işleminde yüzde 50'ye varan tasarruf sağlıyor.

### Sırada ne var

Bu makale ile önceki, aynı soruyu iki ayrı yerden sordu: aynı kaliteyi daha az kaynakla vermek. İkisinin de cevabı mimarinin içindeydi — hangi parametrelerin çalışacağı, geçmişin nasıl tutulacağı. Üçüncü bir yol daha var ve mimariden değil eğitimden geçiyor: büyük bir modelin bildiklerini küçük bir modele aktarmak. Bir sonraki makale bunu kuruyor — küçük bir model, kendisinden kat kat büyük bir modelden ne kadarını devralabilir, ve devralamadığı şey nedir?

## Kaynakça

- Dao, T., Fu, D. Y., Ermon, S., Rudra, A. & Ré, C. (2022). *FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness*. NeurIPS 2022. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/67d57c32e20fd0a7a302cb81d36e40d5-Abstract-Conference.html)
- Beltagy, I., Peters, M. E. & Cohan, A. (2020). *Longformer: The Long-Document Transformer*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2004.05150. [Bağlantı](https://arxiv.org/abs/2004.05150)
- Zaheer, M., Guruganesh, G., Dubey, A., Ainslie, J., Alberti, C., Ontañón, S., Pham, P., Ravula, A., Wang, Q., Yang, L. & Ahmed, A. (2020). *Big Bird: Transformers for Longer Sequences*. NeurIPS 2020. [Bağlantı](https://papers.nips.cc/paper_files/paper/2020/hash/c8512d142a2d849725f31a9a7a361ab9-Abstract.html)
- Katharopoulos, A., Vyas, A., Pappas, N. & Fleuret, F. (2020). *Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention*. ICML 2020. [Bağlantı](https://proceedings.mlr.press/v119/katharopoulos20a.html)
- Choromanski, K., Likhosherstov, V., Dohan, D., Song, X., Gane, A., Sarlós, T., Hawkins, P., Davis, J., Mohiuddin, A., Kaiser, Ł., Belanger, D., Colwell, L. & Weller, A. (2021). *Rethinking Attention with Performers*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2009.14794)
- Gu, A., Goel, K. & Ré, C. (2022). *Efficiently Modeling Long Sequences with Structured State Spaces*. ICLR 2022. [Bağlantı](https://arxiv.org/abs/2111.00396)
- Gu, A. & Dao, T. (2024). *Mamba: Linear-Time Sequence Modeling with Selective State Spaces*. Conference on Language Modeling (COLM) 2024. [Bağlantı](https://arxiv.org/abs/2312.00752)
- Dao, T. & Gu, A. (2024). *Transformers are SSMs: Generalized Models and Efficient Algorithms Through Structured State Space Duality*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/dao24a.html)
- Jelassi, S., Brandfonbrener, D., Kakade, S. M. & Malach, E. (2024). *Repeat After Me: Transformers are Better than State Space Models at Copying*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/jelassi24a.html)
- Arora, S., Eyuboglu, S., Timalsina, A., Johnson, I., Poli, M., Zou, J., Rudra, A. & Ré, C. (2024). *Zoology: Measuring and Improving Recall in Efficient Language Models*. ICLR 2024. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2024/hash/448fc91f669c15d10364ee01d512cc10-Abstract-Conference.html)
- Merrill, W., Petty, J. & Sabharwal, A. (2024). *The Illusion of State in State-Space Models*. ICML 2024. [Bağlantı](https://proceedings.mlr.press/v235/merrill24a.html)
- Waleffe, R., Byeon, W., Riach, D., Norick, B., Korthikanti, V., Dao, T., Gu, A., Hatamizadeh, A., Singh, S., Narayanan, D., Kulshreshtha, G., Singh, V., Casper, J., Kautz, J., Shoeybi, M. & Catanzaro, B. (2024). *An Empirical Study of Mamba-based Language Models*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2406.07887. [Bağlantı](https://arxiv.org/abs/2406.07887)
- Jamba Ekibi: Lenz, B., Lieber, O., Arazi, A., Bergman, A., Manevich, A. ve ark. (2025). *Jamba: Hybrid Transformer-Mamba Language Models*. ICLR 2025. [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/a9ed43fa31dc8b4a7d7a673d713dcb5f-Abstract-Conference.html)
- De, S., Smith, S. L., Fernando, A., Botev, A., Cristian-Muraru, G., Gu, A., Haroun, R., Berrada, L., Chen, Y., Srinivasan, S., Desjardins, G., Doucet, A., Budden, D., Teh, Y. W., Pascanu, R., De Freitas, N. & Gulcehre, C. (2024). *Griffin: Mixing Gated Linear Recurrences with Local Attention for Efficient Language Models*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:2402.19427. [Bağlantı](https://arxiv.org/abs/2402.19427)
- Pagnoni, A., Pasunuru, R., Rodriguez, P., Nguyen, J., Muller, B., Li, M., Zhou, C., Yu, L., Weston, J., Zettlemoyer, L., Ghosh, G., Lewis, M., Holtzman, A. & Iyer, S. (2025). *Byte Latent Transformer: Patches Scale Better Than Tokens*. ACL 2025. [Bağlantı](https://aclanthology.org/2025.acl-long.453/)
- Peng, B., Alcaide, E., Anthony, Q., Albalak, A., Arcadinho, S., Biderman, S., Cao, H., Cheng, X., Chung, M., Du, X., Grella, M., GV, K. K., He, X., Hou, H., Lin, J., Kazienko, P., Kocon, J., Kong, J., Koptyra, B., Lau, H., Mantri, K. S. I., Mom, F., Saito, A., Song, G., Tang, X., Wang, B., Wind, J. S., Wozniak, S., Zhang, R., Zhang, Z., Zhao, Q., Zhou, P., Zhou, Q., Zhu, J. & Zhu, R.-J. (2023). *RWKV: Reinventing RNNs for the Transformer Era*. EMNLP 2023 Findings. [Bağlantı](https://aclanthology.org/2023.findings-emnlp.936/)
- Tay, Y., Dehghani, M., Abnar, S., Shen, Y., Bahri, D., Pham, P., Rao, J., Yang, L., Ruder, S. & Metzler, D. (2021). *Long Range Arena: A Benchmark for Efficient Transformers*. ICLR 2021. [Bağlantı](https://arxiv.org/abs/2011.04006)
- Shazeer, N. (2019). *Fast Transformer Decoding: One Write-Head is All You Need*. Hakemli bir yerde yayımlandığı doğrulanamadı; okunan sürüm arXiv:1911.02150. [Bağlantı](https://arxiv.org/abs/1911.02150)
- Ainslie, J., Lee-Thorp, J., de Jong, M., Zemlyanskiy, Y., Lebrón, F. & Sanghai, S. (2023). *GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints*. EMNLP 2023. [Bağlantı](https://aclanthology.org/2023.emnlp-main.298/)
