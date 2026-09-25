---
article_id: article_7c1b9d42-3fa6-4e07-95c8-1d8b0f6e2a34
title: "Sürekli Öğrenme ve Kişiselleştirme"
slug: surekli-ogrenme-ve-kisisellestirme
category: multimodal-and-future
level: advanced
reading_order: 112
summary: "39. ve 56. makale belleği ağırlıklara hiç dokunmadan kurmuştu; bu makale ağırlıklara dokunmak gerektiğinde ne olduğunu ölçer. Bir modeli güncel tutmanın dört yolunu — baştan eğitmek, eğitmeye devam etmek, cerrahi düzenleme, bağlama koymak — ve her birinin ayrı yerde ödenen faturasını kurar: esnek ağın kararlılığı kaybetmesinden, tek bir olguyu değiştiren güncellemenin o olgunun sonuçlarını taşımamasına ve bir tek düzenlemenin modeli tümden çalışmaz hâle getirmesine kadar."
tags:
  - surekli-ogrenme
  - kisisellestirme
  - model-duzenleme
  - felaket-unutmasi
  - getirme
content_hash: sha256:5dbf5a17d5d2516f0a8d5927b29a9ee14abb68386ff6088e4144c333db028efe
classification_version: 1
classification_batch: 27
revised_at: "2026-09-25"
revision_note: "Rank-bir güncelleme önce sezgiyle ve yeni bir geometri şekliyle anlatıldı; gerçek anahtarların tam dik olmadığı eklendi, 'üç mertebe' 400 kat olarak düzeltildi."
---
## Dünya durmuyor, model duruyor

111\. makalede dünyanın modelin önünde hareket ettiğini gördük: nesne kayıyor, ışık değişiyor, sahne yeniden diziliyor. Gövde bunu her saniye hissettiriyordu. Ama hareket eden şey yalnızca bir masanın üstü değil.

Bir model eğitildiği anda donar. Ağırlıklar sabittir; eğitim verisinin kesildiği tarihten sonra dünyada ne olduysa ağırlıklarda karşılığı yoktur. Bir şirketin genel müdürü değişir, bir kütüphanenin arayüzü değişir, bir kullanıcı şehir değiştirir — ve model eski cevabı aynı güvenle vermeye devam eder.

39\. ve 56\. makaleler bu soruna ağırlıklara hiç dokunmadan cevap vermişti: bilgi dışarıda bir depoda tutulur, gerektiğinde getirilip pencereye konur. O iki makalenin sonucu netti ve burada yeniden kurmayacağız — model hatırlamaz, sistem hatırlatır; en zor iş yazmak değil güncellemektir. Bu makale bir adım öteye geçiyor ve o iki makalenin bilerek atlamadığı soruyu soruyor: **ağırlıkların kendisini değiştirmek gerektiğinde ne oluyor?**

Cevap tek parça değil. Bir modeli güncel tutmanın dört ayrı yolu var, dördü ayrı şeyi bozuyor, ve en "temiz" görüneni en gizli faturayı taşıyor.

## Dört yol, dört ayrı fatura

Yollar ölçek sırasına göre dizilebilir.

**Baştan eğitmek.** Yeni veriyi karışıma katıp ön eğitimi yeniden koşmak. Kimse bunun kaliteye zarar verdiğini iddia etmiyor; sorun 106–109\. makalelerin bütün konusu — haftalar, binlerce kart ve bir kez bozulunca baştan başlayan bir koşu. Bir olgu değiştiği için ödenebilecek bir bedel değil.

**Eğitmeye devam etmek.** 19\. makaledeki sürekli ön eğitim ya da düşük ranklı uyarlama: mevcut ağırlıkların üstünden yeni veriyle devam etmek. Ucuz ve tanıdık, ama bedeli 19'da adını koyduğumuz **unutma** — hedef alan dışındaki başarının gerilemesi.

**Cerrahi düzenleme.** Alandaki adıyla **model düzenleme** (model editing): tek bir olguyu, tek bir küçük güncellemeyle değiştirmek ve geri kalan her şeye dokunmamak. En çok bunun üzerinde duracağız, çünkü en çekici seçenek bu ve faturası en az görünen de bu.

**Bağlama koymak.** 39 ve 56'nın yolu: ağırlığa dokunmadan, doğru bilgiyi getirip pencereye yazmak. Bedeli her turda yeniden ödenen token ve hiçbir şeyin gerçekten öğrenilmemesi.

![Dört satırlı beş sütunlu bir tablo ve altında bir kutu. Üstte başlık: bir modeli güncel tutmanın dört yolu. Sütunlar yol, neye dokunur, maliyeti, neyi bozar ve ne zaman doğru seçenektir. Birinci satır baştan eğitmek: bütün ağırlıklara dokunur, haftalar ve binlerce kart maliyeti vardır, hiçbir şeyi bozmaz, karışım gerçekten değiştiğinde doğrudur. İkinci satır eğitmeye devam etmek: bütün ağırlıklara ya da düşük ranklı bir eke dokunur, saatler ya da günler tutar, hedef alan dışındaki başarıyı geriletir, yeni bir alan ya da yeni bir biçim öğretilirken doğrudur. Üçüncü satır vurguludur, cerrahi düzenleme: tek bir katmanın ağırlık matrisine dokunur, saniyeler sürer, değişikliğin sonuçlarını taşımaz ve birikince modeli çökertir, tek bir olgu yanlışken ve sonuçları önemsizken doğrudur. Dördüncü satır bağlama koymak: hiçbir ağırlığa dokunmaz, her turda yeniden token öder, hiçbir şey öğrenilmez ve pencere daralır, bilgi sık değiştiğinde ya da kullanıcıya özel olduğunda doğrudur. Altta bir kutu durur: dört yol bir merdivenin basamakları değildir; ayrı sorulara cevap verirler ve birini ötekinin yerine koymak, ödenen faturayı görünmez kılar. En altta bir kayıt: maliyet sütunu büyüklük mertebesidir, bozulma sütunu ölçülmüş etkilerdir.](assets/dort-guncelleme-yolu.svg "Şekil 1 — Aynı soru değil, dört ayrı soru")

Şekil 1'in son sütunu makalenin çerçevesini taşıyor: soru "hangisi daha iyi" değil, "bu değişikliğin sonuçları olmalı mı".

## Esneklik kazanınca kararlılık kaybediliyor

Önce ikinci yol, çünkü sorunun klasik hâli orada.

Bir ağı önce A görevinde, sonra B görevinde eğitirsen, B'nin gradyanları A'nın çözümünü taşıyan ağırlıkları da değiştirir ve A'daki başarı düşer. Düşüş ılımlı değil: James Kirkpatrick ve arkadaşlarının *Proceedings of the National Academy of Sciences*'ta yayımlanan çalışmasında, A'daki performans B'nin eğitimi sürdükçe hızla ve giderek bozuluyor. Bunun adı **felaket unutması** (catastrophic forgetting) ve 19'daki unutmanın uç hâli.

Burada üç yakın sözcük yan yana geliyor ve karışmaması için adlarını koyalım. 19'daki **unutma** uyarlamanın istenmeyen yan etkisidir. 68'deki **unutturma** tehlikeli bilginin kasıtlı çıkarılmasıdır. 56'daki **seçici unutma** bir bellek sisteminin artık geçersiz bir kaydı atabilmesidir. Üçü de "unutmak" fiilini kullanır; birincisi kaza, ikincisi niyet, üçüncüsü yetenektir.

German Parisi ve arkadaşlarının *Neural Networks*'te yayımlanan derlemesi sorunun adını veriyor: **kararlılık–esneklik ikilemi** (stability-plasticity dilemma). Yeni bilgiyi alabilmek için sistemin esnek, eskisini koruyabilmek için kararlı olması gerekir; ve aynı parametreler her iki işi de yapar.

Kirkpatrick ve arkadaşlarının çözümü ikilemi parametre parametre çözüyor. Fikir şu: bütün ağırlıklar eski görev için aynı derecede önemli değildir. Eski görevin çözümünde bazı parametreler kritiktir — biraz oynatınca kayıp fırlar —, bazıları neredeyse serbesttir. O hâlde yeni görevi eğitirken her parametreye, **eski görevdeki önemiyle orantılı** bir yay tak: önemli olan yerinden zor oynasın, önemsiz olan serbest kalsın. Yöntemin adı buradan geliyor; yay esnektir. Önemin ölçüsü Fisher bilgisinin köşegeni — sezgisel karşılığı, kaybın o parametreye ne kadar duyarlı olduğu, yani en küçük noktasının yakınında kaybın ikinci türevi.

Küçük bir sayısal örnek mekanizmayı görünür kılıyor; sayılar bizim, açıklama amaçlı. İki parametreli bir ağ düşün. A görevi bittiğinde çözüm θ\* = (2,0; −1,0) ve önem ölçüleri F = (10; 0,1) çıksın. Ceza terimi her parametre için `½ · F · (θ − θ*)²`. B görevi ikisini de bir birim oynatmak istiyor. Birinci parametreyi bir birim oynatmanın cezası ½ × 10 × 1 = 5; ikincisininki ½ × 0,1 × 1 = 0,05. Yüz kat fark. B'nin gradyanı birinci parametreyi ikincisi kadar oynatmak için yüz kat güçlü olmak zorunda. Aynı cezayı bütün parametrelere sabit katsayıyla uygulamak — yani sıradan bir düzenlileştirme — bu ayrımı yapmaz ve çalışmada işe yaramıyor da: eski görev korunuyor ama yeni görev öğrenilemiyor.

Bu yolun faturasını serinin kendi ölçümünde de gördük. 105\. makalede kendi küçük modelimizi asistanlaştırırken derlem kaybı 0,77 arttı; 11'de adını koyduğumuz hizalama vergisi, biçim uğruna ödenen unutmadır. Yani ikinci yolun faturası bir kuram değil, elimizde ölçülmüş bir sayı.

> **Kendini yokla:** Eski görevdeki bütün ağırlıkları tamamen dondurup yalnızca yeni eklenen parametreleri eğitmek unutmayı bitirir mi?

Unutmayı bitirir, ikilemin öbür yarısını kaybeder. Donmuş ağırlıklar eski görevi harfi harfine korur; ama yeni görev, ancak eklenen parametrelerin kapasitesi kadar öğrenilebilir ve eski temsillerin kendisi yeni göreve göre düzeltilemez. 81\. makaledeki ablasyon tam bu takası ölçmüştü: önceden eğitilmiş ağlar donmuşken sıralamayı belirleyen şey eklenen parametrenin miktarıydı, o ağlar eğitime açılınca sıralama döndü. Kararlılık bedava değil; esneklikle ödenir.

## Cerrahi seçenek: tek bir olguyu değiştirmek

Üçüncü yol daha çekici görünüyor: madem sorun tek bir olgu, neden bütün modeli eğitelim?

Kevin Meng ve arkadaşlarının NeurIPS 2022'de sunduğu çalışma bunun en bilinen biçimini kuruyor. Önce bir gözlem: bir Transformer'ın ileri beslemeli katmanı, doğrusal bir **çağrışımsal bellek** (associative memory) gibi okunabilir — bir anahtar vektörü girer, ona eşlenmiş bir değer vektörü çıkar. Öyleyse bir olguyu değiştirmek, o anahtara karşılık gelen değeri değiştirmektir. Yöntem tam bunu yapıyor: öznenin son token'ında oluşan gizli durumdan bir anahtar vektörü, istenen yeni nesneyi seçtirecek bir değer vektörü hesaplanıyor ve tek bir orta katmanın izdüşüm matrisine **rank-bir** bir güncelleme yazılıyor — yani matrise tek bir dış çarpım ekleniyor.

"Rank-bir" sözcüğü 92\. makaleden tanıdık; burada ne yaptığını önce sezgiyle kuralım. Güncelleme, belleğe tek bir anahtar için bir düzeltme notu eklemek gibi çalışıyor. Gelen her girdiye "`k*`'e ne kadar benziyorsun?" diye soruluyor ve cevap kadar düzeltme ekleniyor. `k*`'in kendisi düzeltmenin tamamını alıyor, `k*`'e dik bir girdi hiç almıyor, arada kalan bir girdi örtüştüğü kadar alıyor. Sembolle yazınca bu, matrise tek bir dış çarpım eklemek: `W′ = W + Δ` ve `Δ = (v* − W k*) k*ᵀ`. Burada `v*` istenen yeni değer, `k*` birim uzunlukta anahtar. Bir `x` girdisi için `Δx = (v* − W k*)·(k*ᵀx)`; sağdaki çarpan, yani `x` ile `k*`'in iç çarpımı, tam o "ne kadar benziyorsun" sorusu.

Şimdi iki boyutta sayılarla görelim. Sayılar bizim; gerçek yöntem araya bir de eşdeğişirlik terimi koyuyor, mekanizmayı görmek için onu bir kenara bırakıyoruz. `W` birim matris olsun, yani her anahtar kendi değerine gitsin. Düzenlemek istediğimiz olgunun anahtarı `k* = (1; 0)`, mevcut değeri `W k* = (1; 0)`, istediğimiz yeni değer `v* = (−1; 0)`. Fark `(−2; 0)`; güncelleme bu farkın `k*` ile dış çarpımı, yani ilk sütunu `(−2; 0)`, ikinci sütunu sıfır olan bir matris. Toplayınca `W′`'nün ilk sütunu `(−1; 0)`, ikinci sütunu `(0; 1)` oluyor.

Şekil 2 üç anahtarı sınıyor. `W′ k* = (−1; 0)`: düzenleme tuttu. `k*`'e **dik** bir başka olgunun anahtarı `k₁ = (0; 1)` için `W′ k₁ = (0; 1)`: hiç değişmedi. İkisinin arasında duran `k₂ = (0,6; 0,8)` için `W′ k₂ = (−0,6; 0,8)`: `k*` ile örtüşen 0,6'lık bileşeni yeniden yazıldı, dik 0,8'lik bileşeni kaldı.

![Yan yana iki panel. Soldaki anahtarlar paneli: başlangıçtan çıkan üç ok, k yıldız eşittir 1 ve 0 sağa, k1 eşittir 0 ve 1 yukarı, k2 eşittir 0,6 ve 0,8 çapraz; not: k1 k yıldıza diktir, k2 onunla 0,6 örtüşür. Sağdaki değerler paneli: kesikli soluk oklar güncelleme öncesini gösterir, 1 ve 0 ile 0,6 ve 0,8. Güncelleme sonrası W′k yıldız sola döner, eksi 1 ve 0; W′k1 yukarıda aynen kalır, değişmedi; W′k2 eksi 0,6 ve 0,8 olur. Panelin altında Δ eşittir v yıldız eksi W k yıldız, çarpı k yıldız devrik, v yıldız eksi 1 ve 0. Altta: k1 hiç değişmiyor, k2'nin k yıldızla örtüşen 0,6'lık bileşeni yeniden yazılıyor, dik 0,8'lik bileşeni kalıyor; gerçek bir modelde anahtarlar tam dik olmadığı için ilgisiz bir olgu örtüştüğü kadar etkilenir. Kayıt: sayılar açıklama amaçlıdır, W birim matristir.](assets/rank-bir-guncellemenin-geometrisi.svg "Şekil 2 — Düzeltme, anahtarla örtüştüğü kadar")

Bu üç satır yöntemin hem gücünü hem sınırını aynı anda söylüyor. Güncelleme yalnızca `k*` yönünde etki eder; o yöne dik duran her şey korunur. "İlgisiz bilgilere dokunmama" özelliği bu yüzden büyük ölçüde yapının kendisinden gelir: bir olgunun anahtarı düzenlenen anahtara ne kadar dikse o kadar korunur. Gerçek bir modelde anahtarlar tam dik değildir; `k₂` gibi örtüşen anahtarlar örtüştükleri kadar etkilenir, ve yöntemin araya koyduğu eşdeğişirlik terimi güncellemeyi saklı öbür anahtarları en az bozacak biçimde ayarlamak içindir. Aynı yapının bir bedeli de var: olgunun **sonuçları** da dokunulmadan kalır. "Şu kişinin eşi" ile "şu kişinin kayınbiraderi" farklı anahtarlardır, ve ikincisi birincisiyle örtüşmediği ölçüde güncellemeden etkilenmez.

Sonuçları kendi ölçütlerinde iyi. Bir olgu çıkarma kümesinde düzenlemenin tuttuğu örneklerin oranı yüzde 99,8; aynı olgunun başka sözcüklerle sorulmuş hâlinde yüzde 88,1. Saniyeler süren bir güncelleme, bir olguyu değiştirip yeniden ifade edilmiş hâlini de yakalıyor.

Buraya kadar hikâye temiz. Sorun, bu ölçütlerin neyi sormadığında.

## Cerrahinin üç faturası

**Birinci fatura: değişiklik, sonuçlarını taşımıyor.**

Roi Cohen ve arkadaşlarının *Transactions of the Association for Computational Linguistics*'te yayımlanan çalışması soruyu şöyle kuruyor. Bir olguyu değiştirdiysen, o olgudan çıkan öteki olgular da değişmeliydi. "Şu kişinin eşi artık bu kişidir" dediysen, "şu kişinin kayınbiraderi kimdir" sorusunun cevabı da değişmeliydi. Yazarlar bu türden altı ölçüt tanımlayıp 5.000 düzenlemelik bir küme kuruyor.

Tablo iki yüzlü. Yüzeysel ölçütlerde düzenleme mükemmele yakın: öznenin başka adlarıyla sorulduğunda yüzde 86,8, düzenlemeyle ilgisiz bilgilerin korunmasında yüzde 100. Mantıksal sonuç ölçütünde aynı yöntem yüzde 20,2 alıyor. Bütün modeller ve yöntemler üzerinde ortalama yüzde 38 ile 66 arasında.

Bu iki sayı yan yana durduğunda mekanizma görünüyor: rank-bir güncelleme **cevabı** değiştiriyor, **inancı** değiştirmiyor. Model artık yeni nesneyi söylüyor ama o nesneden çıkan hiçbir şeyi yeniden hesaplamıyor.

**İkinci fatura: düzenlemeler birikince model çöküyor.**

Akshat Gupta, Anurag Rao ve Gopala Anumanchipalli'nin ACL 2024 bulguları programında sunduğu çalışma aynı modele arka arkaya binlerce düzenleme yapıyor. Düzenlemenin tutma oranı uzun süre yüzde 100'e yakın kalıyor, sonra düşmeye başlıyor — bu dönüş noktası kimi koşuda 100 düzenleme kadar erken, kimisinde 1.000 düzenleme kadar geç geliyor. O noktadan sonra model hem yeni düzenlemeleri almıyor hem de eskilerini unutuyor hem de sıradan görevleri yapamıyor.

Asıl bulgu bu kademeli düşüşün sonundaki şey. Yazarların **devre dışı bırakan düzenleme** (disabling edit) dediği tek bir güncelleme modeli tümden kullanılamaz hâle getiriyor. Ölçüsü ağırlıkta: düzenlenen katmanın özgün ağırlıklarından uzaklığı, sıradan düzenlemelerde ortalama 8,156×10⁻⁷, devre dışı bırakan düzenlemelerde 3,339×10⁻⁴. Oranı biz alalım: yaklaşık 400 kat.

Ve şu ayrıntı tanıyı değiştiriyor: aynı olgu modele **ilk** düzenleme olarak uygulandığında da model aynı şekilde çöküyor. Yani bu, binlerce düzenlemenin biriktirdiği bir yorgunluk değil; yöntemin belirli olgularda gösterdiği bir kırılma. 109\. makaledeki kayıp sıçramalarının biçimi burada birebir tekrar ediyor: aylarca düzgün giden bir eğri ve tek bir adımda gelen kopuş; oradaki tanı da sıçramanın veriden değil verinin parametre durumuyla bileşiminden geldiğiydi.

**Üçüncü fatura: bilginin nerede durduğunu bilmek, nereyi düzenleyeceğini söylemiyor.**

Bu fatura yöntemin gerekçesini kesiyor. Yukarıdaki düzenleme yöntemi, nedensel iz sürmenin bir olguyu orta katman ileri beslemeli ağırlıklara yerleştirmesine dayanıyordu; 74–77\. makalelerde bu ailenin araçlarını görmüştük. Peter Hase, Mohit Bansal, Been Kim ve Asma Ghandeharioun'un NeurIPS 2023'te sunduğu çalışma ikisini ayrı ayrı ölçüp karşılaştırıyor ve şunu buluyor: bir olgunun iz sürmeyle bulunan yeri ile o olgunun hangi katmanda başarıyla düzenlenebildiği arasındaki bağıntı **sıfıra yakın**. Düzenleme başarısını açıklayan şey olgunun nerede saklandığı değil, hangi katmanın seçildiği.

110\. makaledeki cümlenin kardeşi: okunabilir bir temsil doğru bir dünya modeli demek değildi; burada da yerelleştirilebilir bir olgu düzenlenebilir bir olgu demek değil.

![İki bölmeli şekil. Üstte iki sütunlu altı satırlı bir tablo; sütunlar ölçüt ve rank-bir düzenlemenin aldığı puan. Birinci satır düzenlenen olgunun kendisi doksan dokuz virgül sekiz. İkinci satır aynı olgunun başka sözcüklerle sorulmuş hâli seksen sekiz virgül bir. Üçüncü satır öznenin başka adları seksen altı virgül sekiz. Dördüncü satır ilgisiz bilgilerin korunması yüz. Beşinci satır vurguludur, olgudan çıkan mantıksal sonuç yirmi virgül iki. Altıncı satır bütün modeller ve yöntemler üzerinde ortalama otuz sekiz ile altmış altı arası. Altta üç kutu yan yana durur. Birinci kutunun başlığı sonuç taşınmıyor; içinde cevabın değiştiği ama inancın değişmediği, modelin yeni nesneyi söyleyip ondan çıkanı yeniden hesaplamadığı yazılıdır. İkinci kutunun başlığı birikince çöküyor; içinde tutma oranının yüz düzenleme kadar erken ya da bin düzenleme kadar geç düşmeye başladığı, devre dışı bırakan tek bir düzenlemenin ağırlıktaki uzaklığının sıradan düzenlemelerinkinin yaklaşık 400 katı olduğu ve aynı olgu ilk düzenleme olarak uygulandığında da modelin çöktüğü yazılıdır. Üçüncü kutunun başlığı yer bilmek yetmiyor; içinde bir olgunun iz sürmeyle bulunan yeri ile başarıyla düzenlenebildiği katman arasındaki bağıntının sıfıra yakın olduğu yazılıdır. En altta bir kayıt: ilk iki satır Meng ve arkadaşlarının, üçüncüden altıncıya Cohen ve arkadaşlarının, ikinci kutu Gupta ve arkadaşlarının, üçüncü kutu Hase ve arkadaşlarının ölçümüdür.](assets/cerrahinin-uc-faturasi.svg "Şekil 3 — Cevap değişiyor, inanç değişmiyor")

Şekil 3'ün beşinci satırı ile dördüncü satırı yan yana okunmalı: aynı yöntem, aynı düzenlemede, korumada yüz ve sonuç taşımada yirmi alıyor. Bu bir başarısızlık değil, bir **ölçüt farkı**: yöntemin kendi bildirisinde verdiği vaat "olguyu değiştir ve gerisine dokunma"ydı, ve o vaadi tutuyor. Ölçen çalışmaların sorduğu soru başkaydı.

## Değişikliğin sonuçları olmalı mı

İşte ayrım burada. Bir güncellemeden ne beklediğin, hangi yolun doğru olduğunu belirliyor.

Cohen ve arkadaşlarının kendi çalışmalarındaki en öğretici bulgu bir yöntem değil, bir taban çizgisi: yeni olguyu doğrudan isteme yazan yalın düzen, ölçütlerin tamamında ağırlık düzenleyen yöntemlerin hepsini geçiyor. Yani modelin dünyasını değiştirmenin en güvenilir yolu, ağırlığına değil penceresine yazmak.

Bu ilk bakışta 39 ve 56'nın zaten söylediği şey. Fark, artık ölçüsünü biliyor olmamız: pencereye yazılan bir olgunun sonuçları **modelin akıl yürütmesi tarafından** taşınıyor, ağırlığa yazılan bir olgununki taşınmıyor. Çünkü pencereye yazılan şey modelin her adımda okuduğu bir girdi; ağırlığa yazılan şey tek bir eşlemenin çıktısı.

Kişiselleştirme aynı sorunun kullanıcı ölçeğindeki hâli ve orada tabloya bir de maliyet giriyor. Alireza Salemi ve arkadaşlarının ACL 2024'te sunduğu ölçüt kümesi yedi kişiselleştirme görevi kuruyor: kullanıcının geçmiş yazıları, işaretlemeleri ve tercihleriyle bir sınıflandırma ya da üretim görevi. Yazarların gerekçesi doğrudan: kullanıcı profillerinin tamamı çoğu zaman pencereye sığmıyor, sığdığı durumda bile uzun girdiyi her turda işlemenin bedeli ciddi. Bu yüzden profilin tamamını değil, o soruya en yakın parçalarını getiriyorlar — yani 41–44\. makalelerin getirme hattını kişinin kendi geçmişine uyguluyorlar. Kazanç ölçülü ve açık: ince ayarla birlikte ölçüt genelinde göreli ortalama yüzde 23,5 iyileşme, hiç ince ayar yapılmadan yüzde 12,2.

Sayının büyüklüğünden çok yönü önemli. Kişiselleştirmenin ağırlığa yazılması gerekmiyor; kullanıcı başına bir model tutmak, kullanıcı sayısı kadar eğitim koşusu ve kullanıcı sayısı kadar ağırlık kopyası demektir. Getirme bunun hiçbirini istemiyor ve değişen bir tercihi bir kaydı silerek karşılıyor — 56'daki "sil" işleminin varlık sebebi.

Böylece kararın kendisi beş soruya iniyor ve Şekil 4 onları yan yana koyuyor.

![Üç sütunlu, beş satırlı bir tablo ve altında bir kutu. Üstte başlık: bu değişiklik nereye yazılır. Sütunlar soru, ağırlığa yazmak ve bağlama yazmak. Birinci satır ne sıklıkta değişiyor: seyrek, sık olabilir. İkinci satır vurguludur, sonuçlarının taşınması gerekiyor mu: taşınmıyor, modelin akıl yürütmesi taşıyor. Üçüncü satır kaç kişi için geçerli: herkes için aynıysa, kişiye özelse. Dördüncü satır geri alınabilir mi: güncellemeyi geri almak ayrı bir güncelleme, kaydı silmek yeter. Beşinci satır bedeli nerede ödeniyor: bir kez eğitimde, her turda pencerede. Altta bir kutu durur: ölçülen çapa; yeni olguyu doğrudan isteme yazan yalın düzen, altı ölçütün tamamında ağırlık düzenleyen yöntemlerin hepsini geçiyor, ve kişiselleştirmede getirme ince ayarla birlikte göreli yüzde 23,5, ince ayarsız yüzde 12,2 kazandırıyor. En altta bir kayıt: ilk sayı Cohen ve arkadaşlarının, ikinci ve üçüncü Salemi ve arkadaşlarının ölçümüdür.](assets/degisiklik-nereye-yazilir.svg "Şekil 4 — Karar beş soruya iniyor")

Tablonun ikinci satırı ötekileri belirliyor. Kalan dördü maliyet ve işletme soruları; ikincisi ise yöntemin yapabildiğiyle ilgili ve pazarlıkla değişmiyor.

> **Kendini yokla:** Bir olgu her gün değişiyorsa ve sonuçlarının da doğru olması gerekiyorsa, dört yoldan hangisi doğrudur?

Dördüncüsü, ve gerekçesi iki ölçütün kesişiminde. Sık değişim ağırlığa yazmayı baştan eliyor: her değişiklikte bir güncelleme yapmak, yukarıdaki birikme sorununu her gün biraz daha büyütür. Sonuçların taşınması gerekliliği ise cerrahi seçeneği eliyor, çünkü ölçülen yer tam orası — mantıksal sonuçta yüzde 20,2. Geriye pencereye yazmak kalıyor ve bedeli bilinen bir bedel: her turda token.

## Şu an dürüstçe söylenebilecekler

**Dört yol bir merdiven değil, dört ayrı sorunun cevabıdır.** Baştan eğitmek karışım değiştiğinde, eğitmeye devam etmek yeni bir alan ya da biçim öğretilirken, cerrahi düzenleme tek bir olgu yanlışken, pencereye yazmak bilgi sık değiştiğinde ya da kişiye özelken doğrudur.

**Eğitmeye devam etmenin bedeli kararlılıktır ve parametre başına ödenir.** Önemi ölçülüp her ağırlığa kendi sertliğinde bir yay takmak felaket unutmasını engelliyor; aynı cezayı bütün ağırlıklara eşit uygulamak engellemiyor. Kendi ölçümümüzde fatura 0,77'lik bir kayıp artışıydı.

**Cerrahi düzenleme kendi vaadini tutuyor, daha fazlasını değil.** Olguyu değiştirmede yüzde 99,8, yeniden ifadede 88,1, ilgisizi korumada 100 — ve olgudan çıkan mantıksal sonuçta 20,2.

**Düzenlemelerin birikimi kademeli değil, kademeli sonra ani.** Tutma oranı 100 ile 1.000 düzenleme arasında bir yerde düşmeye başlıyor, ve tek bir devre dışı bırakan düzenleme modeli bitiriyor; o düzenlemenin ağırlıktaki izi ötekilerin yaklaşık 400 katı ve ilk düzenleme olarak uygulansa da aynı sonucu veriyor.

**Bilginin yerini bulmak, onu düzenleyebilmek demek değil.** İz sürmenin gösterdiği yer ile başarıyla düzenlenen katman arasındaki bağıntı sıfıra yakın; başarıyı açıklayan şey katman seçimi.

**Ölçülen en iyi "düzenleme yöntemi" bir düzenleme yöntemi değil.** Yeni olguyu doğrudan isteme yazmak, ağırlık düzenleyen yöntemlerin hepsini ölçütlerin tamamında geçiyor.

**Kişiselleştirme bir eğitim sorunu değil, bir getirme sorunudur.** Kullanıcının geçmişinden ilgili parçaları getirmek, ince ayarla birlikte göreli yüzde 23,5, ince ayarsız yüzde 12,2 kazandırıyor — ve kullanıcı başına ağırlık kopyası gerektirmiyor.

Sınırları da yazmak gerekiyor ve iki tanesi ciddi. Birincisi: düzenleme ölçümlerinin neredeyse tamamı küçük ve orta boy açık modeller üzerinde yapıldı; bugünün büyük modellerinde aynı eşiklerin nerede olduğu bilinmiyor. İkincisi: "sonuçların taşınması" ölçütü bir olgunun mantıksal sonuçlarını Wikidata benzeri bir kaynaktan türetiyor, yani ölçülen şey dünyanın değil bir bilgi tabanının tutarlılığı. 71\. makalenin geçerlilik zinciri burada da geçerli — ölçüt, ölçmek istediği şeyin bir vekili.

### Sırada ne var

Bu makale bir modelin bilgisini güncel tutma sorusunu ölçtü ve cevabın "değişikliğin sonuçları olmalı mı" sorusunda düğümlendiğini gördük. Ama bilgi yalnızca eskimiyor; bazen henüz yok. Bir sonraki makale modeli bilginin **üretildiği** yere götürüyor: laboratuvara. Bir dil modeli yeni bir bilimsel iddia üretebiliyorsa, o iddianın doğru olduğunu kim söylüyor — ve üretmek ile doğrulamak arasındaki fatura farkı, yapay zekânın hangi bilimde işe yarayıp hangisinde yaramadığını belirliyor mu?

## Kaynakça

- Kirkpatrick, J., Pascanu, R., Rabinowitz, N., Veness, J., Desjardins, G., Rusu, A. A. ve ark. (2017). *Overcoming catastrophic forgetting in neural networks*. Proceedings of the National Academy of Sciences, 114(13), s. 3521–3526. [Bağlantı](https://doi.org/10.1073/pnas.1611835114)
- Parisi, G. I., Kemker, R., Part, J. L., Kanan, C. & Wermter, S. (2019). *Continual lifelong learning with neural networks: A review*. Neural Networks, 113, s. 54–71. [Bağlantı](https://doi.org/10.1016/j.neunet.2019.01.012)
- Meng, K., Bau, D., Andonian, A. & Belinkov, Y. (2022). *Locating and Editing Factual Associations in GPT*. Advances in Neural Information Processing Systems 35. [Bağlantı](https://papers.nips.cc/paper_files/paper/2022/hash/6f1d43d5a82a37e89b0665b33bf3a182-Abstract-Conference.html)
- Cohen, R., Biran, E., Yoran, O., Globerson, A. & Geva, M. (2024). *Evaluating the Ripple Effects of Knowledge Editing in Language Models*. Transactions of the Association for Computational Linguistics, 12, s. 283–298. [Bağlantı](https://doi.org/10.1162/tacl_a_00644)
- Gupta, A., Rao, A. & Anumanchipalli, G. (2024). *Model Editing at Scale leads to Gradual and Catastrophic Forgetting*. Findings of the Association for Computational Linguistics: ACL 2024, s. 15202–15232. [Bağlantı](https://aclanthology.org/2024.findings-acl.902/)
- Hase, P., Bansal, M., Kim, B. & Ghandeharioun, A. (2023). *Does Localization Inform Editing? Surprising Differences in Causality-Based Localization vs. Knowledge Editing in Language Models*. Advances in Neural Information Processing Systems 36. [Bağlantı](https://papers.nips.cc/paper_files/paper/2023/hash/3927bbdcf0e8d1fa8aa23c26f358a281-Abstract-Conference.html)
- Salemi, A., Mysore, S., Bendersky, M. & Zamani, H. (2024). *LaMP: When Large Language Models Meet Personalization*. Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics, s. 7370–7392. [Bağlantı](https://aclanthology.org/2024.acl-long.399/)
