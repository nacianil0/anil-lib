---
article_id: article_adf92e93-e5fe-4f69-8b2f-f621b3d8c083
title: "Ölçek Yasaları: Neden \"Daha Büyük\" Çoğu Zaman \"Daha İyi\"?"
slug: olcek-yasalari-daha-buyuk-neden-daha-iyi
category: models-and-training
level: beginner
reading_order: 9
summary: "Sabit bir hesap bütçesini model boyu ile veri arasında paylaştırma sorusunu ölçülebilir hâle getiren çalışmaları anlatır: güç yasası eğrileri, Kaplan'dan Chinchilla'ya giden düzeltme ve bu eğrilerin nerede bittiği."
tags:
  - olcek-yasalari
  - guc-yasasi
  - hesap-optimal-egitim
  - chinchilla
  - beliren-yetenekler
content_hash: sha256:23849b7dcfb3ebeba6d91ef79e717efdbddf9f50ce2d2fd9e9d387e05320df69
classification_version: 1
classification_batch: 1
---
## Aynı bütçe, iki ayrı kalem

8\. makale elinde iki şeyle bitti: bir kayıp değeri ve bir fatura. Fatura tek kalem değildi — aynı parayı ya modeli büyütmeye ya veriyi çoğaltmaya harcayabilirsin. 2\. makalenin ileri okuma notunda ölçeğin klasik eğriyi bozabildiğini görmüş ve randevuyu buraya vermiştik; 5\. makalede de ölçeğin ne satın aldığını burada konuşacağımızı söylemiştik. Randevu vakti geldi.

Sorunun kendisi mühendislikten çok muhasebe: elinde sabit sayıda FLOP var, hangi kaleme ne kadar ayıracaksın? Bu makalede üç şey kuracağız: kaybın ölçekle nasıl düştüğünü anlatan güç yasası (power law), sabit bütçeyi en iyi paylaştırma sorusunu soran hesap-optimal eğitim (compute-optimal training) ve bu eğrilerin nerede bittiği. Bu ailenin toplu adı ölçek yasaları (scaling laws).

## Düz bir çizgi çizen düşüş

Ölçek yasasının çekirdek iddiası tek cümleye sığar. Önce sözle: harcadığın hesabı her on katına çıkardığında kayıp sabit bir *miktarla* değil, sabit bir *çarpanla* düşer. Sembolle, C_min yığın boyutu verimli seçildiğinde harcanan hesap olmak üzere L(C_min) = (C_c / C_min)^α; Jared Kaplan ve arkadaşlarının 2020'de ölçtüğü değerler α ≈ 0,050 ve C_c ≈ 3,1×10⁸ PF-gün. Alt indis boşuna değil: aynı çalışma yığın boyutu optimize edilmemiş ham hesap için ayrı bir eğri uydurur ve orada üs 0,057'ye kayar. PF-gün, bir petaFLOP/s hızındaki bir makinenin bir gün boyunca yaptığı işlem sayısıdır. Kaybın birimi ise nat/token: 5\. makaledeki perplexity'nin doğal logaritma cinsinden kardeşi — perplexity onun üstelidir, o yüzden kayıptaki küçük düşüşler perplexity'de büyük görünür.

Şimdi küçük sayılarla. On katına çıkarmanın çarpanı 10^(−0,050) = 0,8913; yani her on kat hesap, kaybı önceki değerinin yüzde 89,1'ine indiriyor. Başlangıç noktasını hesaplayalım: C_min = 1 PF-gün için L = (3,1×10⁸)^0,050. Adım adım: ln(3,1×10⁸) = 1,1314 + 18,4207 = 19,5521; bunu 0,050 ile çarpınca 0,9776; e^0,9776 = 2,658. Sonra her satırda 0,8913 ile çarpıyoruz.

| Hesap C_min (PF-gün) | Kayıp L (nat/token) | log₁₀ C_min | log₁₀ L |
|---|---|---|---|
| 1 | 2,658 | 0 | 0,4246 |
| 10 | 2,369 | 1 | 0,3746 |
| 100 | 2,111 | 2 | 0,3246 |
| 1.000 | 1,882 | 3 | 0,2746 |
| 10.000 | 1,677 | 4 | 0,2246 |

Sağdaki iki sütuna dikkat et. log₁₀ C her satırda 1 artarken log₁₀ L her satırda tam olarak 0,0500 azalıyor — ve bu sayı denklemdeki üssün ta kendisidir. Sabit eğim demek, düz çizgi demek. Güç yasasının log-log grafikte doğruya dönüşmesinin bütün sırrı bu.

![Yan yana iki panel aynı beş ölçümü gösterir: doğrusal eksende eğri hızla düşüp yatay bir kuyruğa dönüşür, log-log eksende aynı noktalar eğimi üsse eşit tek bir doğru üzerine oturur.](assets/guc-yasasi-iki-eksen.svg "Şekil 1 — Aynı beş nokta, iki ayrı eksen")

Şekil 1'de aynı beş nokta iki ayrı eksende duruyor. Soldaki doğrusal eksende eğri hızla düşüp yatay bir kuyruğa dönüşüyor ve "iş burada bitti" izlenimi veriyor; sağdaki log-log eksende aynı noktalar tam bir doğru üzerine oturuyor. Bitmemiş. Bedava öğle yemeği de yok: kaybı yarıya indirmek istersen 0,5 = k^(−0,050) denklemini çözmen gerekir ve k = 2^20 = 1.048.576 çıkar. Bir milyon kat hesap.

Aynı düzenlilik diğer iki eksende de ölçüldü — ama her biri kendi kaydıyla. Gömme tablosu dışındaki parametre sayısını on katına çıkarmak, veri darboğaz olmadığı sürece, kaybı yaklaşık yüzde 16 düşürüyor; veriyi on katına çıkarmak, model yeterince büyük olduğu sürece, yüzde 19,6 düşürüyor. Sayılar mütevazı. Ölçek yasasının acımasız yüzü tam olarak bu: getiri gerçek ama azalan.

## Paranın büyük kısmını modele

Bu düzenliliği dil modelleri için en geniş biçimde ölçen ve alanın gündemine sokan çalışma Kaplan, Sam McCandlish ve arkadaşlarının 2020 tarihli incelemesidir. Düzenliliğin kendisi yeni değildi: Joel Hestness ve arkadaşları 2017'de makine çevirisi, dil modelleme, görüntü işleme ve konuşma tanımada genelleme hatasının güç yasasıyla düştüğünü zaten ölçmüştü — hakem sürecinden geçmemiş bir ön çalışmaydı ve Kaplan'ın kendi kaynakçasında duruyor. Kaplan'ın getirdiği şey, üç kaynağı —parametre, veri, hesap— tek bir tahsis sorusunda birleştirmesiydi. Önemi şurada: bazı eğilimler yedi büyüklük mertebesinden fazlasını kapsıyordu, yani henüz eğitilmemiş bir modelin kaybı çok daha küçük modellerin çizgisi uzatılarak önceden kestirilebiliyordu. Bir eğitim koşusunun milyonlarca dolara mal olduğu bir alanda bu, kâğıt üzerinde para demektir.

Çalışma bir de reçete verdi. Sabit bir hesap bütçesinde kaybı en küçük yapan tahsis, parametre sayısı N ve token sayısı D için N ∝ C^0,73 ve D ∝ C^0,27 idi. İki üssün toplamı 1; olması da gerekiyor, çünkü hesap kabaca ikisinin çarpımıyla artar. Cümleye çevirirsek: paranın büyük kısmını modeli büyütmeye harca, veriyi yalnızca gerektiği kadar artır. Çalışmada bundan ayrı, sık alıntılanan ikinci bir ilişki daha vardır: model boyutunu sekiz kat artırdığında aşırı öğrenme cezasından kaçınmak için veriyi kabaca beş kat artırman gerekir. İkisi aynı soruya cevap vermez ve birbiriyle de tutmaz — yukarıdaki tahsis üsleriyle sekiz kat model ancak iki kat civarı veri ister. Çalışma bu gerilimi kendi metninde not eder. Tahsis reçetesinin sonucu ise açıkça yazılıdır: çok büyük modelleri görece mütevazı miktarda veriyle eğit ve yakınsamadan çok önce dur.

Bir dürüstlük notu borçluyuz ve bunu makalenin geri kalanı boyunca aklında tut: alanın yönünü değiştiren bu çalışma hakem sürecinden geçmedi, bir ön baskı olarak kaldı.

İkinci not teknik. Kaplan'ın formülünde toplanan sabit bir terim yoktur; N sonsuza giderken kayıp sıfıra iner. Bu imkânsızdır — dilin kendi belirsizliği vardır ve 2\. makaledeki indirgenemez hata tam da buydu. Yasanın bir yerde kırılması gerektiği, çalışmanın kendi konjektürüdür.

## Aynı fatura, dört kat küçük model

İki yıl sonra DeepMind'dan Jordan Hoffmann ve arkadaşları aynı soruyu yeniden sordu ve başka bir cevap aldı. Ölçek yeterliydi: 70 milyon ile 16 milyardan fazla parametre arasında, 5 milyar ile 500 milyar token arasında dört yüzden fazla model eğittiler. Bulguları tek cümleyle şu: model boyutu her iki katına çıktığında token sayısı da iki katına çıkmalı.

Popüler anlatı buradan "Kaplan yanıldı" diye devam eder. Birincil kaynağa bakalım. Hoffmann ve arkadaşlarının kendi açıklaması metodolojiktir: Kaplan bütün modeller için sabit sayıda token ve sabit bir öğrenme oranı çizelgesi kullanmıştı. 8\. makalede o çizelgenin eğitimin uzunluğuna göre kurulduğunu görmüştük; uzunluğa uyarlanmadığında erken ara noktalardaki kayıplar olduğundan kötü görünür ve büyük modeller haksız yere avantajlı çıkar. Üstelik Kaplan'ın koşularının birçoğu 100 milyon parametrenin altındaydı. Dürüst cümle şu: soruyu hangi kurulumla sorduğun cevabı değiştirdi.

Şimdi hesabı kendimiz yapalım. 8\. makaleden bir kural taşıyoruz: toplam hesap ≈ 6 × N × D. Chinchilla'nın kendi tahsisi — 70 milyar parametre, 1,4 trilyon token — parametre başına 20 token'a karşılık gelir; bu oranı kural sayıp D = 20N yazalım. Yerine koyunca C = 6 × N × 20N = 120N². Bütçemiz Gopher'ınki olsun — DeepMind'ın bir yıl önce eğittiği büyük dil modeli: C = 5,76×10²³ FLOP. N'i çözelim: N = √(C / 120) = √(4,8×10²¹). Burada √4,8 = 2,1909 ve √(10²¹) = 3,1623×10¹⁰; çarpınca N = 6,93×10¹⁰, yani yaklaşık 69 milyar parametre. Token sayısı da D = 20 × 6,93×10¹⁰ = 1,39×10¹², yani yaklaşık 1,4 trilyon.

Çıkan sayı, DeepMind'ın yayımladığı modelin ta kendisi: Chinchilla 70 milyar parametre, 1,4 trilyon token. Bu bir kehanet değil — oranı zaten o modelden okumuştuk, hesap kendi girdisine dönüyor. Gösterdiği şey başka: bütçe ile oran verildiğinde model boyu tek bir değere çakılır. Bağımsız kontrol makalenin kendi tablosundan geliyor: aynı bütçe için 67 milyar parametre ve 1,5 trilyon token yazıyor.

Peki aynı bütçeyle Gopher ne yapmıştı? 280 milyar parametre, 300 milyar token — parametre başına 300 ÷ 280 = 1,07 token. Chinchilla'nın yirmide biri. Sonuç: dört kat küçük olan Chinchilla, elli yedi ayrı konudan çoktan seçmeli soru soran MMLU değerlendirmesinde yüzde 67,6 ile Gopher'ın yüzde 60,0'ının 7,6 puan önüne geçti. Böyle değerlendirme kümelerinin neyi ölçtüğünü ve neyi ölçemediğini 16. makalede ele alacağız. Bu değerler makalenin Tablo 6'sından; özeti aynı sonucu 67,5 diye veriyor — çalışmanın kendi içinde küçük bir tutarsızlık, biz tablodakini kullandık.

Bir kayıt gerekli. 6ND kaba bir kestirimdir ve 8\. makalede yayımlanan FLOP değerleriyle yüzde on mertebesinde sapmalar görülebileceğini söylemiştik. İşte örneği: Gopher için 6 × 280×10⁹ × 300×10⁹ = 5,04×10²³ çıkıyor, oysa makalenin verdiği bütçe 5,76×10²³ — yüzde 12,5 fark. Aynı büyüklük mertebesinde; birebir değil.

![Log-log eksende sabit hesap koşulunu gösteren düz bir doğru; üzerinde Chinchilla, Gopher ve Kaplan tahsisi noktaları işaretli, her birinin parametre ve token değerleri yanında yazılı; Gopher noktası 6ND kestiriminden gelen sapma yüzünden doğrunun biraz altında durur.](assets/sabit-butce-tahsisleri.svg "Şekil 2 — Tek bütçe, üç ayrı tahsis")

Şekil 2 bu noktaları tek bir doğrunun çevresinde gösteriyor: sabit hesap koşulu N ile D'yi çarpımları sabit kalacak biçimde bağlar, dolayısıyla log-log eksende düz bir doğrudur. Chinchilla, Gopher ve Kaplan'ın tahsisi o doğrunun üç ayrı noktasıdır — Gopher, az önce hesapladığımız yüzde 12,5'lik sapma yüzünden biraz altında kalır. Aynı fatura, üç ayrı model.

Yaygın bir aktarım hatasını da düzeltelim. Chinchilla makalesi "parametre başına 20 token" diye bir kural yazmaz; kurduğu cümle "model boyutu her iki katına çıktığında token sayısı da iki katına çıkmalı"dır ve 20 sayısı, makalenin kendi tahsisinden ve tablosundan okunur.

> **Kendini yokla:** Sabit bir hesap bütçen var ve modeli iki katına çıkarıyorsun. Veriye ne olur — ve bu değiş tokuşun iyi olup olmadığına ne karar verir?

Veri yarıya iner, çünkü sabit bütçede N ile D'nin çarpımı sabittir. İyi olup olmadığına ise bu eğri üzerinde nerede durduğun karar verir: Gopher parametre başına 1,07 token'la eğrinin çok solundaydı, Chinchilla 20 token'la en düşük kaybı veren noktaya yakındı. Hoffmann ve arkadaşlarının düzeltmesinin özü de budur — o günün modelleri veri tarafında eksik kalmıştı.

## Kaybın ikinci ondalık basamağı

Aynı bütçeyi iki reçeteyle paylaştırınca ne oluyor? Kaplan'ın reçetesi yalnızca üsler değil, mutlak bir sayı da verir: en iyi model boyu N = 1,3×10⁹ × C_min^0,73, burada C_min PF-gün cinsinden hesaptır. Bütçemizi çevirelim: 5,76×10²³ ÷ 8,64×10¹⁹ = 6.667 PF-gün. Yerine koyalım: 6.667^0,73 = 619 ve N = 1,3×10⁹ × 619 = 8,0×10¹¹, yani yaklaşık 800 milyar parametre. Token sayısı hesabın kendisinden çıkar: D = C / (6N) = 5,76×10²³ ÷ (6 × 8,0×10¹¹) = 1,2×10¹¹, yani yaklaşık 120 milyar token. Parametre başına 0,15 token. Chinchilla'nın üsleriyle aynı bütçe 69 milyar parametre ve 1,39 trilyon token veriyordu.

Bir dürüstlük notu: Kaplan veri için de ayrı bir eğri uydurmuştur ve o eğri aynı bütçede yaklaşık 216 milyar token verir — 6ND'den türettiğimiz 120 milyarın 1,8 katı. Çalışmanın kendi iki fiti birbirini tam tutmuyor; biz, iki tahsis de aynı faturayı ödesin diye veriyi 6ND'den türettik. Bu tutarsızlığı aklında tut.

| Kalem | Kaplan (2020) | Chinchilla (2022) |
|---|---|---|
| Bütçe | 5,76×10²³ FLOP | 5,76×10²³ FLOP |
| Model | 800 milyar parametre | 69 milyar parametre |
| Veri | 120 milyar token | 1,39 trilyon token |
| Token/parametre | 0,15 | 20 |

Aynı elektrik faturası, yaklaşık 12 kat farklı model, yaklaşık 12 kat farklı veri. Sıralamaya da dikkat et: parametre başına 0,15 token'la Kaplan'ın reçetesi, Gopher'ın 1,07'sinden bile uçtadır. Bir bütçe paylaştırma benzetmesi kurmak isteyebilirsin — sabit para, iki kalem, un mu şeker mi. Benzetmenin bozulduğu yer şurası: un ile şeker toplanır, model boyu ile token sayısı ise çarpılır, çünkü hesap 6ND'dir. Benzetmenin biçimsel karşılığı ise nettir: sabit C için N ile D'nin çarpımı sabittir — bütçe bir doğru değil hiperboldür, birini iki katına çıkarırsan diğeri tam olarak yarıya iner — ve ölçek yasası bu eğri üzerindeki hangi noktanın en düşük kaybı verdiğini söyler.

Peki fark ne kadar kayba karşılık geliyor? Chinchilla'nın veriye uyarladığı kayıp fonksiyonunu kullanalım — istatistikte buna eğri uydurma (curve fitting) denir. Önce sözle: formül kaybı üç parçaya ayırır — hiçbir modelin altına inemeyeceği bir taban, modelin küçüklüğünden gelen bir ceza ve verinin azlığından gelen bir ceza; iki ceza da kendi kalemi büyüdükçe küçülür ama hiçbir zaman sıfırlanmaz. Sembolle: L(N, D) = 1,69 + 406,4/N^0,34 + 410,7/D^0,28. Buradaki 1,69 tabandır — Kaplan'ın formülünde eksik olan terim tam olarak bu. Kaplan tahsisi için N^0,34 = 11.144 ve 406,4 ÷ 11.144 = 0,036; D^0,28 = 1.265 ve 410,7 ÷ 1.265 = 0,325; toplam 1,690 + 0,036 + 0,325 = 2,051. Chinchilla tahsisi için N^0,34 = 4.851 ve 406,4 ÷ 4.851 = 0,084; D^0,28 = 2.512 ve 410,7 ÷ 2.512 = 0,163; toplam 1,690 + 0,084 + 0,163 = 1,937.

Fark: 0,114 nat/token. Büyüklüğünü görmek için aynı formülü iki gerçek modele uygulayalım: Gopher'ın 280 milyar parametresi ve 300 milyar token'ıyla 1,690 + 0,052 + 0,251 = 1,993 çıkıyor. Chinchilla'nın 1,937'siyle arasındaki fark 0,056 — ve MMLU'daki 7,6 puanı yaratan kayıp farkı bu. İki tahsis arasındaki 0,114 onun iki katı. Ölçek yasası dünyasında kaybın ikinci ondalık basamağı puan eder.

## Yasa mı, en iyi uyan çizgi mi?

Adı "yasa" ama elimizde birkaç yüz noktalı bir saçılım grafiği ve içinden geçirilmiş bir çizgi var. Bu, çizgiyi değersizleştirmez — fizik yasaları da veriye uydurulur. Benzetmenin bozulduğu yer şurası: yerçekimi yasasının altında türetilmiş bir teori vardır ve ölçülmemiş bölgelerde ne yapacağı kestirilebilir; ölçek yasasının altında böyle bir teori yoktur. Benzetmenin biçimsel karşılığı şudur: ölçek yasası, belirli bir mimari, tokenizer, veri karışımı ve öğrenme oranı çizelgesi kümesi üzerinde tahmin gücü kanıtlanmış ampirik bir regresyondur.

Kanıtı Chinchilla çalışmasının kendi içinden geliyor. Tamay Besiroglu, Ege Erdil, Matthew Barnett ve Josh You 2024'te o çalışmanın üçüncü kestirim yöntemini —grafiklerden yeniden oluşturulan veriye kayıp fonksiyonu uydurma— yeniden üretmeye (replication) çalıştı. Raporlanan katsayıların makalenin kendi ilk iki yöntemiyle tutarsız olduğunu, çıkarılan veriye uymadığını ve inanılmayacak kadar dar güven aralıkları —kestirimin ne kadar oynayabileceğini gösteren bantlar— taşıdığını buldular; kök nedeni DeepMind'a teyit ettirdiler. Uydurmada kullanılan Huber kaybı —büyük sapmaları kareli kayıptan daha az cezalandıran bir uyum ölçüsü— veri noktaları üzerinde toplanmak yerine ortalanmış, optimizasyon da erken sonlanmıştı.

Sonucu küçük değil. Hoffmann'ın raporladığı katsayılardan türetilen tahsis politikası parametre başına yaklaşık 70 token önerirken, yeniden uydurma 20'ye dönüyor; yani çalışmanın kendi üçüncü yöntemi, ilk iki yöntemiyle ve Chinchilla'nın fiilen nasıl eğitildiğiyle çelişiyor. Bu deneme de hakem sürecinden geçmemiş bir ön çalışmadır; söylenmesi gereken buydu, saklanması değil.

> **Kendini yokla:** Bir ölçek yasası eğrisi log-log ölçekte düz bir doğru çiziyor. Bu doğruyu sağa doğru uzatıp on yıl sonrasını okumanın sakıncası ne?

Eğri, ölçüldüğü aralıkta geçerlidir; dışarısı için bir garantisi yoktur. Üstelik kalemlerden biri —veri— tükenebilir bir kaynaktır ve eğri onun tükenmesini modellemez.

### İleri okuma notu: veri duvarı

Chinchilla'nın reçetesi veriyi model boyuyla birlikte büyütmeni istiyor; peki veri biterse? Pablo Villalobos ve arkadaşlarının 2024'te ICML'de yayımlanan konum bildirisi —alana pozisyon alan bir metin— mevcut eğilimler sürerse modellerin 2026 ile 2032 arasında, medyan tahminle 2028'de, kamuya açık insan üretimi metin stoğuna kabaca eşit veri kümeleriyle eğitilmiş olacağını hesaplıyor; etkin stok tahmini yaklaşık 400 trilyon token ve Llama 3'ün gördüğü 15,6 trilyon bunun yüzde 3,9'u. Söylenen şey "veri bitecek" değil, veri kümelerinin stok büyüklüğüne yaklaşacağıdır — güven aralıkları da çok geniştir. Duvar sanıldığı kadar sert de değil: Niklas Muennighoff ve arkadaşlarının NeurIPS 2023'te sözlü sunuma seçilen çalışması, sabit bütçede aynı veriyi dört epoka kadar tekrar etmenin taze veriye kıyasla kayıpta ihmal edilebilir bir fark yarattığını ölçtü. Dördüncüden sonrası değer kaybediyor. Stok efektif olarak birkaç kat büyüyor; sonsuza kadar değil.

## Amaç değişince reçete de değişir

Şimdi asıl inceliği söyleyelim. Chinchilla'nın cevabı belirli bir soruya aittir: eğitim hesabını en küçük yap. Soruyu değiştirirsen cevap da değişir.

Nikhil Sardana ve arkadaşları 2024'te ICML'de tam bunu yaptı ve eğitim maliyetine çıkarım maliyetini de eklediler. Model bir kez eğitilir ama milyarlarca kez çalıştırılır ve çalıştırma maliyeti parametre sayısıyla artar. Hesabı böyle kurunca sonuç ters yöne dönüyor: ciddi bir çıkarım talebi bekleyen ekipler modellerini Chinchilla-optimalden daha küçük ve daha uzun eğitmeli. Verdikleri somut örnekte varsayım şu: 30 milyar parametrelik bir Chinchilla modelinin kalitesi ve ömrü boyunca 17,5 milyar çıkarım isteği. Bu talep altında aynı kaliteye 8,58 milyar parametre ve 12,1 trilyon token ile ulaşılıyor, toplam maliyet yüzde 58 düşüyor. Talep küçülünce kazanç da küçülüyor: 1,5 milyar istekte tasarruf yüzde 17'ye iniyor.

Pratik bunu doğruladı. Llama 3'ün amiral modeli 405 milyar parametre ve 15,6 trilyon token gördü: 15,6×10¹² ÷ 4,05×10¹¹ = parametre başına 38,5 token, yani Chinchilla'nın 20'sinin yaklaşık 1,9 katı. Bu iki sayı Meta'nın kendi teknik raporundan geliyor; hakem sürecinden geçmiş bir yayın değil. Asıl aşırılık küçük modellerde. Epoch AI'nin derlediği veriye göre açık ağırlıklı modellerde parametre başına token oranının ortalaması 2022'de on civarındayken 2025'te yaklaşık üç yüze çıktı. Bu derleme de hakemli değil; bir araştırma kuruluşunun kendi model veritabanından türettiği bir istatistik.

Bir terim uyarısı gerekiyor. Hesap-optimalin ötesinde eğitmeye aşırı eğitim (overtraining) denir ve bu, 2\. makaledeki aşırı öğrenmeyle aynı şey değildir. Aşırı öğrenmede model eğitim verisini ezberler ve test hatası yükselir; aşırı eğitimde model daha fazla taze veri görür ve kayıp düşmeye devam eder, yalnızca giderek daha yavaş. İki kavram kolay karışır, farkı basittir.

Aşırı öğrenme demişken, 2\. makalenin randevusunu da kapatalım. Orada kapasite arttıkça test hatasının önce düşüp sonra yükseldiği U biçimli eğriyi görmüştük. Mikhail Belkin ve arkadaşlarının PNAS'ta yayımlanan 2019 tarihli çalışması o eğrinin sağına baktı: kapasiteyi modelin eğitim verisini tam ezberlediği noktanın ötesine taşıyınca test hatası yeniden düşebiliyordu — desenin adı çift iniş. Alicia Curth ve arkadaşlarının 2023'teki NeurIPS çalışması ise klasik yöntemlerdeki bu görüntünün büyük ölçüde yatay eksende neyin sayıldığına bağlı olduğunu savunuyor; tartışma açık. Bizim için önemli olan, bu makalenin eğrilerinin hangi rejimde durduğu: ölçek yasalarının ölçtüğü koşullarda veri boldur, model aynı token'ı ezberleyecek kadar çok görmez ve kayıp baştan sona iner. U eğrisi kırılmıyor; o eğrinin geçerli olduğu rejimin dışında duruyoruz.

Ölçek de tek eksende kalmadı. Charlie Snell ve arkadaşlarının ICLR 2025'te sözlü sunuma seçilen çalışması, eğitimde değil çıkarım anında hesap harcayarak da kazanç sağlanabildiğini ölçtü — bu yeni ekseni 33. makalede açacağız.

## Aynı eğri, iki cetvel

Son soru en zoru. Ölçek yasası kayıp hakkında konuşur; peki kaybın düşmesi, modelin her işte düzgün biçimde iyileştiği anlamına gelir mi?

5\. makalede bu tartışmayı açık bırakmıştık. Wei ve arkadaşlarının ortaya attığı ad beliren yeteneklerdi: küçük modellerde hiç görünmeyen, belli bir ölçekten sonra birden ortaya çıkan beceriler. Soru şuydu: ölçekle gelen sıçramaların ne kadarı modelde, ne kadarı ölçüm cetvelinde? Şimdi mekaniğine bakalım.

Bir hastayı iki cetvelle ölçtüğünü düşün. Biri derece derece sıcaklık veriyor: 37,2 sonra 37,6 sonra 38,1, pürüzsüz bir tırmanış. Diğeri yalnızca "ateşi var" ya da "yok" diyor ve eşiği 38,0. İkinci cetvele bakan biri ateşin bir anda ortaya çıktığını söyler. Benzetmenin bozulduğu yer şurası: bazı görevlerde kullanıcının umursadığı şey gerçekten de eşiğin kendisidir — kod ya derlenir ya derlenmez; "cetvel keyfî" demek "eşikli çıktı önemsiz" demek değildir. Benzetmenin biçimsel karşılığı ise şudur: uzun bir dizinin tamamının doğru olma olasılığı, token başına doğruluk p'nin dizi uzunluğuncu kuvveti gibi davranır. Rylan Schaeffer, Brando Miranda ve Sanmi Koyejo'nun 2023'te NeurIPS'te ödül alan çalışmasının çekirdeği bu. Sayı koyalım: p 0,90'dan 0,95'e pürüzsüzce çıkarken yirmi token'lık bir dizide p²⁰ 0,12'den 0,36'ya, yani üç katına sıçrar. Sıçrama gerçek; kaynağı, küçük bir kaybın yirmi kez üst üste çarpılmasıdır.

Aynı çalışma, BIG-Bench adlı geniş görev kümesinde bildirilen beliren yeteneklerin yüzde 92'sinden fazlasının yalnızca iki metrik altında ortaya çıktığını ve sürekli metriklere geçilince aynı eğrilerin pürüzsüzleştiğini gösterdi.

![Tek bir temel eğri iki kez okunur: sürekli metrikle rampa gibi düzgün yükselen çizgi, ya-hep-ya-hiç metrikle aynı verinin ürettiği keskin dizli uçurum eğrisi.](assets/ayni-egri-iki-cetvel.svg "Şekil 3 — Aynı ölçüm, iki farklı cetvel")

Şekil 3 aynı temel eğriyi iki cetvelle okumanın nasıl iki ayrı resim ürettiğini gösteriyor. Ama tartışma burada bitmiyor. 5\. makalede Wei ve arkadaşlarının kendi ekinin kaybın pürüzsüzce iyileştiğini kaydettiğini söylemiştik; aynı çalışmanın bir başka eki, üç görevde beliren yeteneklerin hangi değerlendirme metriği kullanılırsa kullanılsın göründüğünü raporluyor. Zhengxiao Du ve arkadaşlarının NeurIPS 2024'teki çalışması ise üçüncü bir çerçeve öneriyor: belirleyici olan model boyutu değil, ön eğitim kaybının belirli bir eşiğin altına inmesi.

Bugünkü dürüst özet 5\. makaledekiyle aynı, bir kat daha net: cetvel seçimi beliren yeteneklerin görünüşünü kesinlikle etkiliyor, buna rağmen metrikten bağımsız görünen vakalar da raporlanmış durumda. Tartışma kapanmadı. Nereye kadar açık olduğunu 78. makalede ele alacağız.

> **Kendini yokla:** Ölçek yasası eğrisi kaybın ölçekle düzgün biçimde düştüğünü gösteriyor. Bu, modelin her işte düzgün biçimde iyileştiği anlamına gelir mi?

Hayır. Eğri kaybı ölçer; bir görevdeki başarı ise kaybın üstüne konan bir ölçüm cetveliyle okunur. Ya-hep-ya-hiç puanlayan bir cetvel, pürüzsüz inen bir kaybı bile uçurum gibi gösterebilir — 5\. makaledeki tartışmanın çekirdeği tam olarak buydu.

### Sırada ne var

Ölçek yasaları eğitimin ekonomisini anlatır: hangi kaleme ne kadar harcadığını ve karşılığında kaybın ne kadar düşeceğini. Artık elinde eğitilmiş bir model var, ama bu makale boyunca ondan tek bir kelime bile çıkmadı. Model her adımda 5\. makaledeki gibi bir dağılım üretiyor — "Bugün hava çok ___" için "güzel" önde, "sıcak" ve "soğuk" hemen peşinde. O dağılımdan bir metin nasıl çıkar ve aynı soruya iki kez farklı cevap vermesinin sebebi nedir?

## Kaynakça

- Kaplan, J., McCandlish, S., Henighan, T., Brown, T. B., Chess, B., Child, R., Gray, S., Radford, A., Wu, J. & Amodei, D. (2020). *Scaling Laws for Neural Language Models*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2001.08361)
- Hestness, J., Narang, S., Ardalani, N., Diamos, G., Jun, H., Kianinejad, H., Patwary, M., Yang, Y. & Zhou, Y. (2017). *Deep Learning Scaling is Predictable, Empirically*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/1712.00409)
- Hoffmann, J., Borgeaud, S., Mensch, A., Buchatskaya, E., Cai, T., Rutherford, E., de Las Casas, D., Hendricks, L. A., Welbl, J., Clark, A. ve ark. (2022). *An empirical analysis of compute-optimal large language model training*. Advances in Neural Information Processing Systems 35 (NeurIPS 2022). [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2022/hash/c1e2faff6f588870935f114ebe04a3e5-Abstract-Conference.html)
- Besiroglu, T., Erdil, E., Barnett, M. & You, J. (2024). *Chinchilla Scaling: A Replication Attempt*. arXiv ön baskısı (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2404.10102)
- Villalobos, P., Ho, A., Sevilla, J., Besiroglu, T., Heim, L. & Hobbhahn, M. (2024). *Position: Will We Run Out of Data? Limits of LLM Scaling Based on Human-Generated Data*. ICML 2024 konum bildirisi, PMLR 235, s. 49523–49544. [Bağlantı](https://proceedings.mlr.press/v235/villalobos24a.html)
- Muennighoff, N., Rush, A. M., Barak, B., Le Scao, T., Tazi, N., Piktus, A., Pyysalo, S., Wolf, T. & Raffel, C. (2023). *Scaling Data-Constrained Language Models*. NeurIPS 2023 (sözlü sunum). [Bağlantı](https://arxiv.org/abs/2305.16264)
- Sardana, N., Portes, J., Doubov, S. & Frankle, J. (2024). *Beyond Chinchilla-Optimal: Accounting for Inference in Language Model Scaling Laws*. ICML 2024. [Bağlantı](https://arxiv.org/abs/2401.00448)
- Grattafiori, A. ve ark. (2024). *The Llama 3 Herd of Models*. Meta AI teknik raporu (hakemli değildir). [Bağlantı](https://arxiv.org/abs/2407.21783)
- Epoch AI (2025). *Training open-weight models is becoming more data intensive*. Epoch AI veri notu (hakemli değildir; araştırma kuruluşu derlemesi). [Bağlantı](https://epoch.ai/data-insights/training-tokens-per-parameter)
- Belkin, M., Hsu, D., Ma, S. & Mandal, S. (2019). *Reconciling Modern Machine-Learning Practice and the Classical Bias–Variance Trade-off*. PNAS. [Bağlantı](https://www.pnas.org/doi/10.1073/pnas.1903070116)
- Curth, A., Jeffares, A. & van der Schaar, M. (2023). *A U-turn on Double Descent: Rethinking Parameter Counting in Statistical Learning*. NeurIPS. [Bağlantı](https://arxiv.org/abs/2310.18988)
- Snell, C., Lee, J., Xu, K. & Kumar, A. (2025). *Scaling LLM Test-Time Compute Optimally Can be More Effective than Scaling Parameters for Reasoning*. ICLR 2025 (sözlü sunum). [Bağlantı](https://proceedings.iclr.cc/paper_files/paper/2025/hash/1b623663fd9b874366f3ce019fdfdd44-Abstract-Conference.html)
- Wei, J. ve ark. (2022). *Emergent Abilities of Large Language Models*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2206.07682)
- Schaeffer, R., Miranda, B. & Koyejo, S. (2023). *Are Emergent Abilities of Large Language Models a Mirage?* NeurIPS 2023. [Bağlantı](https://arxiv.org/abs/2304.15004)
- Du, Z., Zeng, A., Dong, Y. & Tang, J. (2024). *Understanding Emergent Abilities of Language Models from the Loss Perspective*. NeurIPS 2024. [Bağlantı](https://arxiv.org/abs/2403.15796)
