---
article_id: article_51248140-9e07-4248-b881-712d00715fe4
title: "Dağıtık Eğitim: Paralellik Stratejileri"
slug: dagitik-egitim-paralellik-stratejileri
category: models-and-training
level: advanced
reading_order: 107
summary: "8. makalede adı konan dört bölme ekseninin tam kurulumu: veri, ağırlık matrisleri, katman yığını ve dizinin kendisi. Her eksenin neyi ucuzlattığını, karşılığında hangi iletişimi doğurduğunu ve nerede durduğunu sayılarla kurar; eniyileyici durumunu paylara bölmenin kapalı formülünü, boru hattı kabarcığının (p−1)/m oranını ve dizi paralelliğinin aktivasyon defterini neden tam olarak t'ye böldüğünü gösterir."
tags:
  - dagitik-egitim
  - paralellik
  - iletisim-maliyeti
  - bellek-bolusturme
  - egitim-sistemleri
content_hash: sha256:7fd596364a677d62d20827b12a00fd6dab50b303c0bd1146dbdd5ce9c62abebd
classification_version: 1
classification_batch: 26
---
## Kapanmayan defter

106\. makale üç defter tutup üçünü de açık bıraktı. Karma hassasiyetli eğitimde parametre başına 16 bayt gerekiyordu — 2 bayt 16 bitlik ağırlık, 2 bayt gradyan, 12 bayt eniyileyici durumu — ve bu, 8 milyar parametrelik bir modelin 128 GB ettiği, yani 80 GB'lık bir karta sığmadığı anlamına geliyordu. Aktivasyonlar katman başına `s·b·h·(34 + 5as/h)` bayt tutuyordu ve GPT-3'ün ölçüleriyle mikro yığın bir iken 275 GB ediyordu. Kullanım oranı ise alanın en iyi koşularında bile yüzde elliyi zor geçiyordu.

Tek kart yetmiyorsa iş bölünecek. Ama bir eğitim adımını bölmenin tek bir yolu yok: yığını mı bölersin, ağırlık matrislerini mi, katman yığınını mı, yoksa dizinin kendisini mi? 8\. makalede Llama 3'ün eğitiminin tam olarak bu dört eksende bölündüğünü söylemiş, veri paralelliği ile model paralelliğinin adını koymuş, kurulumunu ise ertelemiştik. Bu makale o borcu ödüyor.

Bir şart baştan konmalı, çünkü bu makaledeki hiçbir teknik onu çiğnemiyor: **bölünmüş koşunun sonucu, tek karttaki koşunun sonucuyla birebir aynı olmak zorundadır.** Deepak Narayanan ve arkadaşlarının SC 2021'de sunduğu çalışma buna "katı eniyileyici anlambilimi" diyor. Gradyanı geciktiren, eski ağırlıkla güncelleme yapan yöntemler vardır; onlar başka bir aileye aittir ve burada konumuz değil. Bizim sorumuz şu: aynı matematiği koruyarak işi nasıl bölersin, ve her bölme biçimi karşılığında hangi iletişimi doğurur?

## Birinci eksen: yığını bölmek

En eski ve en basit bölme biçimi veri paralelliği. Her kart modelin tam bir kopyasını tutar, yığının farklı bir parçasını işler, kendi gradyanını hesaplar; sonra bütün kartların gradyanları toplanıp herkese geri dağıtılır. Bu toplama işleminin adı **hepsi-indirge** (all-reduce): her düğüm kendi vektörünü verir, hepsinin toplamını alır.

Maliyetini bilmek için hepsi-indirgenin nasıl yapıldığını bilmek gerekiyor. Pitch Patarasuk ve Xin Yuan'ın 2009'da *Journal of Parallel and Distributed Computing*'de yayımladığı çalışma, bant genişliği açısından en iyi düzenin iki aşamalı olduğunu gösteriyor: önce **indirge-dağıt** (reduce-scatter) — her düğüm toplamın yalnızca bir dilimini biriktirir — sonra **hepsi-topla** (all-gather) — dilimler herkese yayılır. Her aşamada düğüm başına yaklaşık Ψ sayı taşınır, yani bir adımda toplam 2Ψ; burada Ψ parametre sayısı. Bu, düğüm sayısından bağımsızdır ve daha azı mümkün değildir.

Veri paralelliğinin faturası buradan okunur. İletişimi ucuz ve ölçekten bağımsız; hesabı mükemmel dağıtıyor. Ama modeli hiç küçültmüyor: 16 baytlık eğitim durumu **her kartta ayrı ayrı** duruyor. Bin kart varsa aynı 128 GB bin kez tekrarlanmıştır.

Samyam Rajbhandari ve arkadaşlarının SC 2020'de sunduğu ZeRO çalışması bu tekrarı kaldırıyor. Fikir şu: eğitim durumunu çoğaltmak yerine veri ekseni boyunca paylara böl, ve her kartı yalnızca kendi payından sorumlu tut. Üç kademe var ve üçü de 106'nın 16 baytlık defterinin bir dilimini hedefliyor. `N` kart üzerinde, parametre başına:

| Kademe | Kartta kalan | 7,5 milyar parametre, 64 kart |
|---|---|---|
| Bölme yok | 16Ψ | 120 GB |
| Eniyileyici durumu bölünür | 4Ψ + 12Ψ/N | 31,4 GB |
| Gradyan da bölünür | 2Ψ + 14Ψ/N | 16,6 GB |
| Ağırlık da bölünür | 16Ψ/N | 1,88 GB |

Sayılar çalışmanın kendi tablosundan; formüller 106'nın muhasebesiyle birebir örtüşüyor, çünkü 4 = 2 + 2 (16 bitlik ağırlık artı gradyan) ve 12 eniyileyicinin payıdır. Oranları biz çıkaralım: birinci kademe 120 ÷ 31,4 = 3,8 kat kazandırıyor, çalışmanın duyurduğu "4 kat" değil — çünkü 16 bitlik ağırlık ve gradyan hâlâ her kartta duruyor. Üçüncü kademede kazanç kart sayısıyla doğrusal: 120 ÷ 1,88 = 63,8 kat.

Bedel iletişimde. İlk iki kademe taban düzenin 2Ψ'sini hiç artırmıyor; üçüncü kademede ağırlıklar da bölündüğü için ileri geçişte bir hepsi-topla daha gerekiyor ve toplam 3Ψ'ye çıkıyor — yüzde 50 artış. Yanli Zhao ve arkadaşlarının VLDB 2023'te yayımladığı çalışma bu düzenin üretim hâlini anlatıyor ve pratikteki asıl işin bu iletişimi hesapla üst üste bindirmek olduğunu gösteriyor.

> **Kendini yokla:** ZeRO'nun üçüncü kademesi modeli kart sayısı kadar küçültüyorsa, neden hâlâ başka bölme biçimlerine ihtiyaç var?

Çünkü küçülttüğü şey yalnızca eğitim durumu. Aktivasyon defteri — katman başına 2,87 GB, doksan altı katman için 275 GB — veri paralelliğinde her kartta aynen durur; hatta her kart kendi yığın parçasını işlediği için aktivasyonlar kartlar arasında bölünmek yerine **çoğalır**. İkinci defter için başka bir eksen gerekiyor.

## İkinci eksen: ağırlık matrislerini bölmek

Alan yazınının adı **tensör paralelliği** (tensor parallelism); bu mimaride bölünen nesne ağırlık matrisleridir. Bir ileri beslemeli katmanın ilk matrisi sütunlara, ikincisi satırlara bölünürse her kart kendi diliminde çarpımı yapar ve sonuçlar toplanır. Dikkat bloğunda bölme çizgisi daha da doğal: başlar zaten bağımsızdır, her kart bir baş kümesini alır.

Bu düzenin iletişim faturasını Narayanan ve arkadaşları kalem kalem veriyor: katman başına ileri geçişte iki, geri geçişte iki, toplam **dört hepsi-indirge**. Dikkat edilecek yer şu: taşınan şey gradyan değil, aktivasyon. Her hepsi-indirge `b·s·h` boyutunda bir dizilim taşır — mikro yığın çarpı dizi uzunluğu çarpı vektör boyu.

Sayı koyalım. GPT-3'ün ölçüleriyle mikro yığın bir, dizi 2.048 ve vektör boyu 12.288 iken bu 25,2 milyon sayı eder. Doksan altı katman için mikro yığın başına 4 × 96 = **384 toplu işlem**. Bu, veri paralelliğinin adım başına bir kez yaptığı işin yanında çok yoğun bir trafiktir, ve yoğunluğu kartlar arası bağın hızına doğrudan bağımlı hâle getirir.

Çalışmanın vardığı sonuç bu yüzden keskin: tensör paralelliği **sunucu içinde** kalmalı. Sekiz kartlık bir sunucuda sekize kadar bölünür; ötesinde iletişim sunucular arası yavaş bağlara taşar ve kazanç kaybolur. Aynı çalışma bunu ölçmüş de: tensör ile boru hattı paralelliğinin kötü seçilmiş bir bileşimi, iyi seçilmişine göre iki kata kadar düşük iş hacmi veriyor.

![Dört satırlı dört sütunlu bir tablo ve altında iki kutu. Üstte başlık: bir eğitim adımını bölmenin dört ekseni. Sütunlar eksen, bölünen, doğan iletişim ve sınır. Birinci satır veri: bölünen yığın, doğan iletişim adım başına 2Ψ büyüklüğünde bir hepsi-indirge, sınır modelin küçülmemesi. İkinci satır tensör: bölünen ağırlık matrisleri, doğan iletişim katman başına dört hepsi-indirge, sınır sunucu içi ve en çok sekiz yol. Üçüncü satır boru hattı: bölünen katman yığını, doğan iletişim aşama başına noktadan noktaya bir gönderim, sınır p eksi bir bölü m büyüklüğündeki kabarcık. Dördüncü satır dizi: bölünen dizinin kendisi, doğan iletişim hepsi-topla artı indirge-dağıt, sınır tek başına kullanılamaması. Eksen adları vurgulu yazılmıştır. Birinci kutunun başlığı trafiğin büyüklüğü, GPT-3 ölçüleriyle: b çarpı s çarpı h eşittir 1 çarpı 2.048 çarpı 12.288 eşittir 25,2 milyon sayı; 96 katmanda tensör paralelliği mikro yığın başına 4 çarpı 96 eşittir 384 toplu işlem, boru hattı ise 63 aşama sınırında 63 noktadan noktaya gönderim yapar. İkinci kutunun başlığı bağlayıcı kural: hangi eksen seçilirse seçilsin, bölünmüş koşunun sonucu tek karttaki koşunun sonucuyla birebir aynı olmak zorundadır. En altta bir kayıt: iletişim biçimleri kaynaklardan, 25,2 milyon ile 384 ve 63 sayıları bizim hesabımızdır.](assets/dort-bolme-ekseni.svg "Şekil 1 — Dört eksen, dört ayrı fatura")

Şekil 1'in son sütunu bu makalenin omurgası: her eksenin bir sınırı var ve sınırlar birbirinin yerini tutmuyor.

## Üçüncü eksen: katman yığınını bölmek

Katmanları kartlara bölmek akla ilk gelen şey ve iletişimi en ucuz olanı: bir kart kendi katmanlarını bitirince çıktısını komşusuna gönderir, o da devam eder. Aşama sınırında taşınan yine `b·s·h` büyüklüğünde bir dizilim, ama bu bir toplu işlem değil, **noktadan noktaya** bir gönderim. Doksan altı katmanı altmış dört aşamaya bölersen mikro yığın başına 63 gönderim yapmış olursun — tensör paralelliğinin 384 toplu işleminin yanında önemsiz.

Bedeli başka yerde. Yanping Huang ve arkadaşlarının NeurIPS 2019'da sunduğu GPipe çalışması bunu adıyla koyuyor: ilk mikro yığın hattı doldururken son aşamadaki kartlar boş bekler, son mikro yığın hattı boşaltırken ilk aşamadakiler boş bekler. Bu boş zamana **kabarcık** (bubble) deniyor.

Narayanan ve arkadaşları kabarcığın oranını kapalı biçimde veriyor ve türetmesi üç satır. `p` aşama sayısı, `m` bir yığındaki mikro yığın sayısı, `t_f` ve `t_b` bir mikro yığının ileri ve geri geçiş süresi olsun. Hattın başında `p − 1` ileri geçiş, sonunda `p − 1` geri geçiş boşa gider: kabarcık süresi `(p − 1)·(t_f + t_b)`. İdeal süre ise `m·(t_f + t_b)`. Oranı aldığında süreler sadeleşiyor ve geriye tek bir kesir kalıyor:

**kabarcık oranı = (p − 1) / m**

Sayı koyalım. Trilyon parametrelik kurulumda 3.072 kart, sekiz yollu tensör ve altmış dört yollu boru hattı bölmesiyle kullanılıyor; geriye 3.072 ÷ (8 × 64) = 6 yollu veri paralelliği kalıyor, ve 3.072'lik yığın buna bölününce hat başına 512 mikro yığın düşüyor. Kabarcık oranı 63 ÷ 512 = yüzde 12,3. Bu son iki adım bizim hesabımız; mikro yığın bir alındı. GPipe'ın kendi kaba kuralı da aynı kesirden çıkıyor: yazarlar `m ≥ 4p` olduğunda kabarcığı ihmal edilebilir buluyorlar, ki bu oranı yüzde 25'in altında tutmak demek.

Kabarcığı küçültmenin iki yolu var ve ikisi de bir şey ödüyor. Birincisi `m`'i büyütmek, yani mikro yığını küçültmek; ama küçük mikro yığın 106'daki işlem yoğunluğunu düşürür ve kart tepe hızından uzaklaşır. İkincisi Narayanan ve arkadaşlarının önerdiği **iç içe geçmiş çizelge**: her karta bitişik bir katman bloğu yerine `v` ayrı blok verilir, kabarcık `v` kat küçülür ve oran `(1/v)·(p − 1)/m` olur. Korthikanti ve arkadaşlarının büyük kurulumlarda kullandığı `v` = 3 değeriyle yukarıdaki yüzde 12,3, yüzde 4,1'e iner. Bedel doğrudan: iletişim de `v` kat artar. Ölçülen net kazanç yüzde 10.

Kesri bir adım daha açalım, çünkü açıldığında kabarcığın gerçekte neye bağlı olduğu görünüyor. `p = n/(t·d)` ve `m = B/(d·b)` yerine konursa `d` sadeleşiyor:

**kabarcık oranı = (n/t − d) ÷ (B/b)**

Sadeleşen şey önemli: boru hattı derecesi ile veri derecesini birbirine karşı oynatmak kabarcığı neredeyse hiç değiştirmiyor, çünkü ikisi de pay ile paydada aynı yöne gidiyor. Kabarcığı gerçekten belirleyen dört şey var — toplam kart sayısı, tensör derecesi, genel yığın büyüklüğü ve mikro yığın. Çalışmanın `t` = 1 için verdiği `(n − d)/b′` biçimi bunun özel hâli.

> **Kendini yokla:** Yığın büyüklüğünü sabit tutup kart sayısını iki katına çıkarırsan kabarcık oranına ne olur?

Yaklaşık iki katına çıkar, ve bunu boru hattını mı veri eksenini mi büyüttüğün değiştirmez: `n` payda tek başına duruyor, `B/b` ise paydada sabit. Trilyonluk örnekte 3.072 kart yüzde 12,3 veriyordu; aynı yığınla 6.144 karta çıkıldığında (384 → 768) oran yüzde 24,6 olur. Bu yüzden ölçek büyürken yığın büyüklüğü de büyütülür — ve yığını büyütmenin sınırını küme değil, eğitimin yakınsaması koyar.

## Dördüncü eksen: dizinin kendisini bölmek

Dördüncü eksen en ince olanı ve neyi çözdüğünü görmek için 106'nın formülüne geri dönmek gerekiyor: katman başına aktivasyon `s·b·h·(34 + 5as/h)` bayt. Vijay Korthikanti ve arkadaşlarının MLSys 2023'te sunduğu çalışma bu parantezin tensör paralelliği altında ne olduğunu yazıyor ve sonuç beklenenden kötü:

`s·b·h·(10 + 24/t + 5as/(ht))`

Yani 34'ün yalnızca 24'ü `t`'ye bölünüyor; 10'u bölünmeden kalıyor. Sebebi yapısal: katman normalleştirmesi ve dikkat ile ileri besleme sonrasındaki seyreltme, tensör paralelliğinin böldüğü bölgelerin **dışında** kalıyor ve her kartta aynı değerler tutuluyor.

Dizi paralelliği tam bu boşluğu kapatıyor. O bölgelerde dizilim, vektör boyu yerine **dizi ekseni** boyunca bölünüyor; bölgeler arası geçişte hepsi-indirgenin yerini bir hepsi-topla ile bir indirge-dağıt alıyor. Ve burada işin zarif kısmı geliyor: hepsi-indirge zaten bu ikisinin toplamıydı — Patarasuk ve Yuan'ın sonucu buydu. Yani ikiye ayrılmış hâli **aynı bant genişliğini** kullanıyor. Bedava.

Sonucu biz hesaplayalım. GPT-3'ün ölçüleriyle parantez içi bölmesiz 34 + 80 = 114'tü. Sekiz yollu tensör paralelliğiyle 10 + 3 + 10 = 23; tensör artı dizi paralelliğiyle 34/8 + 80/8 = 14,25. Son sayı tam olarak 114 ÷ 8'dir. Yani dizi paralelliği, "neredeyse bölen" bir düzeni "tam bölen" bir düzene çeviriyor. Gigabayta çevirelim: 106'daki 275 GB, tensör paralelliğiyle 55,5 GB'a, dizi paralelliği eklenince 34,4 GB'a iniyor.

![Beş satırlı dört sütunlu bir tablo ve altında iki kutu. Üstte başlık: aynı aktivasyon formülü beş düzende, GPT-3 ölçüleri, mikro yığın 1, t eşittir 8. Sütunlar düzen, parantez içi, sayıyla ve 96 katman. Birinci satır bölme yok: parantez içi 34 artı 5as bölü h, sayıyla 114, toplam 275 GB. İkinci satır tensör paralelliği: 10 artı 24 bölü t artı 5as bölü ht, sayıyla 23, toplam 55,5 GB. Üçüncü satır vurguludur, tensör artı dizi: 34 bölü t artı 5as bölü ht, sayıyla 14,25, toplam 34,4 GB. Dördüncü satır tensör artı dizi artı seçici hesap: 34 bölü t, sayıyla 4,25, toplam 10,3 GB. Beşinci satır tam yeniden hesap: 2, sayıyla 2, toplam 4,8 GB. Birinci kutunun başlığı 14,25 tam olarak 114 bölü 8'dir: tensör paralelliği 34'ün yalnızca 24'ünü böler, dizi paralelliği kalan 10'u da böler ve bunu ek bant genişliği harcamadan yapar çünkü hepsi-indirge zaten bir indirge-dağıt ile bir hepsi-toplanın toplamıdır. İkinci kutuda ölçülen bedel durur: tam yeniden hesabın süre maliyeti yüzde 36 iken bu düzende yüzde 2'ye iniyor, 530 milyar parametre ve 2.240 kartta kullanım oranı yüzde 42,1'den yüzde 54,2'ye çıkıyor. En altta bir kayıt: katsayılar ve ölçümler Korthikanti ve arkadaşlarından, gigabayt karşılıkları 275 GB tabanından bizim hesabımızdır.](assets/ayni-formul-dort-duzen.svg "Şekil 2 — Neredeyse bölmek ile tam bölmek arasındaki fark")

Şekil 2'nin üçüncü satırı bu bölümün tek cümlelik sonucu; dördüncü ve beşinci satırlar 106'daki yeniden hesaplama takasının bu düzendeki hâli.

Kazanç ölçülmüş. Aynı çalışma aktivasyon belleğini 5 kat düşürdüğünü, yeniden hesaplamanın süre maliyetini yüzde 90'dan fazla ortadan kaldırdığını bildiriyor: 530 milyar ve 1 trilyon parametreli kurulumlarda tam yeniden hesaplamanın yüzde 36'lık bedeli yüzde 2'ye iniyor. Uçtan uca iş hacmi yüzde 29 ile 32 arasında artıyor. En çarpıcı satır ise 106'daki tabloyla doğrudan karşılaştırılabilir: 2.240 A100 üzerinde 530 milyar parametreli bir modelde kullanım oranı yüzde 54,2. 106'da aktardığımız PaLM tablosunda aynı boyuttaki modelin aynı sayıdaki kartta ölçülen oranı yüzde 30,2 idi. Model aynı, donanım aynı; değişen yalnızca bölme düzeni.

## Dördünü çarpmak

Bu dört eksen birbirinin alternatifi değil, çarpanı. Kart sayısı `n`, tensör derecesi `t`, boru hattı derecesi `p` ve veri derecesi `d` olmak üzere `n = t · p · d`. Narayanan ve arkadaşlarının trilyon parametrelik koşusunda bu çarpım 8 × 64 × 6 = 3.072 kart eder ve dizi paralelliği tensör eksenine biner.

Seçimi yapan şey modelin kendisi değil, kümenin şekli. Aynı çalışmanın 3.072 kart üzerinde ölçtüğü iki sayı bunu çıplak gösteriyor: boru hattı aşamaları arasındaki noktadan noktaya iletişimin etkin kesim bandı saniyede 892 GB, veri paralel kopyalar arasındaki hepsi-indirgeninki saniyede 12,9 TB. Oranı biz alalım: 14,5 kat. Yani en yoğun trafiği taşıyan eksen en hızlı bağa, en seyrek trafiği taşıyan eksen en yavaşına yerleşmiş durumda. Kuralın kendisi de bu sıralamadan çıkıyor: tensör paralelliği sunucu içinde, boru hattı paralelliği sunucular arasında, veri paralelliği en dışta.

Bu düzenin ölçülmüş sonucu 89\. makalede bir cümleyle andığımız tablonun tamamı. Aynı yazılımla 1,7 milyardan 1 trilyona kadar on model eğitilmiş; kart başına verim 137'den 163 teraFLOP/s'ye, tepe hızın yüzdesi 44'ten 52'ye çıkmış. Yani ölçek büyüdükçe **kullanım oranı da yükseliyor**, çünkü büyüyen matrisler kartı daha iyi dolduruyor.

![Üç bölmeli bir şema. Üstte başlık: bir kurulum, üç çarpan ve kümenin şekli. Birinci bölme vurgulu bir kutudur ve içinde 3.072 kart eşittir 8 çarpı 64 çarpı 6 yazar; altında 8 yollu tensör paralelliğinin sunucu içinde, 64 yollu boru hattının sunucular arasında ve 6 yollu veri paralelliğinin en dışta durduğu, dizi paralelliğinin ise ayrı bir çarpan olmayıp tensör eksenine bindiği yazılıdır. İkinci bölmenin başlığı aynı kümede ölçülen iki kesim bandı: veri paralel kopyalar arası hepsi-indirge saniyede 12,9 TB, boru hattı aşamaları arası noktadan noktaya saniyede 892 GB, aradaki oran 14,5 kat. Üçüncü bölme dört satırlık bir tablodur; sütunlar model, t çarpı p, kart, TFLOP bölü saniye ve tepenin yüzdesi. Birinci satır 1,7 milyar: 1 çarpı 1, 32 kart, 137, yüzde 44. İkinci satır 145,6 milyar: 8 çarpı 8, 1.536 kart, 148, yüzde 47. Üçüncü satır 529,6 milyar: 8 çarpı 35, 2.520 kart, 163, yüzde 52. Dördüncü satır vurguludur, 1.008 milyar: 8 çarpı 64, 3.072 kart, 163, yüzde 52. En altta iki kayıt: değerler Narayanan ve arkadaşlarının ölçümleridir ve 14,5 katlık oran bizim hesabımızdır; aynı kart sayısında kötü seçilmiş bir bileşim iki kata kadar düşük iş hacmi verir.](assets/uc-eksenin-carpimi.svg "Şekil 3 — En yoğun trafik en hızlı bağa yerleşir")

Şekil 3'ün orta bölmesi seçimin neden kümenin şekline bağlı olduğunu tek bakışta söylüyor; alt bölmesi de bu makalenin en rahatlatıcı satırı: ölçek büyüdükçe kullanım oranı düşmüyor, yükseliyor.

Bu tablonun arkasında görünmeyen bir mühendislik daha var: iletişimi hesabın **altına saklamak**. Gradyanların hepsi-indirgesi bütün geri geçiş bitene kadar beklemez; erken hesaplanan katmanların gradyanları hazır olduğunda yollanmaya başlar ve geri geçişin geri kalanıyla aynı anda akar. Zhao ve arkadaşlarının çalışmasının büyük bölümü tam olarak bunun mühendisliğidir — ağırlıkları bir sonraki katman hesaplanırken önceden toplamak, gradyanları bittikçe dağıtmak. Yukarıdaki iletişim hacimleri değişmez; değişen, o hacmin duvar saatinde görünür olup olmadığıdır.

Bir eksen daha var ve yalnızca belirli bir mimaride ortaya çıkıyor. 85\. makalede uzmanlar karışımının her katmanda bir hepsi-hepsiye iletişim doğurduğunu görmüştük. Bu, yukarıdaki dört eksenin beşincisi değil; uzmanların kartlara dağıtılmasıyla açılan ayrı bir eksendir ve ağı ikiye böldüğünde geçmesi gereken bandı — 89\. makaledeki kesim bandını — zorlaması onu ötekilerden ayırır. Yoğun bir modelde bu kalem hiç yoktur.

## Bölmenin disiplini

**Dört eksen dört ayrı faturayı öder.** Veri paralelliği hesabı dağıtır ama modeli küçültmez; tensör paralelliği ağırlık matrislerini böler ama sunucu dışına çıkamaz; boru hattı paralelliği katmanları böler ama kabarcık ödetir; dizi paralelliği aktivasyon defterinin kalanını böler ama tek başına kullanılamaz.

**Eğitim durumunu bölmek iletişimi yüzde 50'den fazla artırmaz.** ZeRO'nun ilk iki kademesi 2Ψ'yi hiç değiştirmez, üçüncüsü 3Ψ'ye çıkarır; karşılığında bellek kart sayısıyla doğrusal küçülür.

**Kabarcık oranı tek bir kesirdir: `(p − 1)/m`, açılmış hâliyle `(n/t − d)/(B/b)`.** Boru hattı ile veri derecesini birbirine karşı oynatmak onu değiştirmez; değiştiren şey kart sayısı, tensör derecesi ve yığın büyüklüğüdür. İç içe geçmiş çizelge onu `v` kat böler ve iletişimi `v` kat artırır.

**İletişim hacmi ile iletişim süresi ayrı şeylerdir.** Yukarıdaki hacimlerin hiçbiri üst üste bindirmeyle küçülmez; küçülen, duvar saatinde görünen kısımdır. Bir kurulumu "iletişim ağırlıklı" diye reddetmeden önce o iletişimin hesabın altına saklanıp saklanamadığına bakılır.

**Aktivasyon formülünün her katsayısı aynı şekilde bölünmez.** Tensör paralelliği 34'ün yalnızca 24'ünü böler; dizi paralelliği kalan 10'u da böler ve bunu ek bant genişliği harcamadan yapar, çünkü hepsi-indirge zaten indirge-dağıt artı hepsi-topladır.

**Seçimi yapan şey kümenin şeklidir.** Aynı kart sayısında iyi ve kötü bileşimler arasında iki kat iş hacmi farkı ölçülmüştür; en yoğun trafik en hızlı bağa yerleşmek zorundadır.

**Bölme, kullanım oranı sorununu çözmez.** Dört eksen doğru kurulduğunda bile kart başına verim tepe hızın yüzde 52'sinde kalıyor. Kaybın kalan yarısı kartlar arasında değil, kartın içindedir.

### Sırada ne var

Bu makale bir eğitim adımını kartlara dağıttı ve defterler kapandı: model sığıyor, aktivasyonlar sığıyor, kabarcık yüzde beşin altına iniyor. Ama son satır hâlâ açık — en iyi kurulumda bile çip zamanının yarısını hesap yapmadan geçiriyor ve bu kayıp tek bir kartın içinde oluyor. Bir sonraki makale oraya bakıyor: kartın içinde bir işlem tam olarak neye mal olur, neden işlemlerin yüzde 0,2'si zamanın yüzde 39'unu yiyor, ve aynı matematiği aynı donanımda iki kat hızlı çalıştıran şey nedir?

## Kaynakça

- Narayanan, D., Shoeybi, M., Casper, J., LeGresley, P., Patwary, M., Korthikanti, V., Vainbrand, D., Kashinkunti, P., Bernauer, J., Catanzaro, B., Phanishayee, A. & Zaharia, M. (2021). *Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM*. SC 2021, s. 1–15. [Bağlantı](https://doi.org/10.1145/3458817.3476209)
- Patarasuk, P. & Yuan, X. (2009). *Bandwidth Optimal All-reduce Algorithms for Clusters of Workstations*. Journal of Parallel and Distributed Computing, 69(2), s. 117–124. [Bağlantı](https://doi.org/10.1016/j.jpdc.2008.09.002)
- Rajbhandari, S., Rasley, J., Ruwase, O. & He, Y. (2020). *ZeRO: Memory Optimizations Toward Training Trillion Parameter Models*. SC 2020. [Bağlantı](https://doi.org/10.1109/SC41405.2020.00024)
- Zhao, Y., Gu, A., Varma, R., Luo, L., Huang, C.-C., Xu, M., Wright, L., Shojanazeri, H., Ott, M., Shleifer, S., Desmaison, A., Balioglu, C., Damania, P., Nguyen, B., Chauhan, G., Hao, Y., Mathews, A. & Li, S. (2023). *PyTorch FSDP: Experiences on Scaling Fully Sharded Data Parallel*. Proceedings of the VLDB Endowment, 16(12), s. 3848–3860. [Bağlantı](https://doi.org/10.14778/3611540.3611569)
- Huang, Y., Cheng, Y., Bapna, A., Firat, O., Chen, M. X., Chen, D., Lee, H., Ngiam, J., Le, Q. V., Wu, Y. & Chen, Z. (2019). *GPipe: Efficient Training of Giant Neural Networks using Pipeline Parallelism*. NeurIPS 2019. [Bağlantı](https://papers.nips.cc/paper_files/paper/2019/hash/093f65e080a295f8076b1c5722a46aa2-Abstract.html)
- Korthikanti, V. A., Casper, J., Lym, S., McAfee, L., Andersch, M., Shoeybi, M. & Catanzaro, B. (2023). *Reducing Activation Recomputation in Large Transformer Models*. MLSys 2023. [Bağlantı](https://proceedings.mlsys.org/paper_files/paper/2023/hash/80083951326cf5b35e5100260d64ed81-Abstract-mlsys2023.html)
