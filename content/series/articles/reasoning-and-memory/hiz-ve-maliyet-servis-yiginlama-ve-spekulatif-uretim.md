---
article_id: article_a4244401-5d43-47ed-9e0a-ffe4b3634e36
title: "Hız ve Maliyet: Servis, Yığınlama ve Spekülatif Üretim"
slug: hiz-ve-maliyet-servis-yiginlama-ve-spekulatif-uretim
category: reasoning-and-memory
level: intermediate
reading_order: 28
summary: "Boşta duran hesap gücünün nasıl doldurulduğunu kurar: sabit yığının neden israf olduğunu ve yineleme düzeyinde çizelgelemenin bunu nasıl çözdüğünü, ön dolumun devam eden üretimleri nasıl durdurduğunu ve iki ayrı çözüm yolunu, spekülatif üretimin çıktıyı değiştirmeden nasıl hızlandırdığını ve kabul oranıyla taslak maliyetinin değiş tokuşunu gösterir."
tags:
  - surekli-yiginlama
  - spekulatif-uretim
  - parcali-on-dolum
  - is-hacmi
  - gecikme
content_hash: sha256:86ef0544cb31d6f16a0b89ba1544cad641ce33c4c4936a5a733fc02becc7f8b1
classification_version: 1
classification_batch: 6
---
## Boştaki çip

26\. makalede bir oran türetmiştik: bir hızlandırıcı, yavaş bellekten okuduğu her bayt için yaklaşık 229 işlem yapabiliyor. Adım adım üretimde okunan her 2 bayt karşılığında yığındaki her istek için 2 işlem yapıldığına göre, yığın büyüklüğü 229'a ulaşmadan çip hesap yapmakla değil beklemekle meşgul.

27\. makale bu tabloyu daha da uç bir hâle getirdi. Ağırlıkları dört bite indirdiğinde taşınan bayt çeyreğe iner ama yapılan işlem sayısı aynı kalır; yani okunan bayt başına düşen işlem kapasitesi daha da bollaşır. Modeli küçülttük ve boşluğu büyüttük.

Bu makale o boşluğu doldurmanın dört yolunu kuruyor: aynı anda daha çok isteğe hizmet vermek, aşamaların birbirini engellemesini önlemek, boştaki hesabı ileriye dönük tahminlere harcamak ve aynı işi iki kez yapmamak. Dördü birlikte, bir modelin fiyatının neden modelin bir sabiti olmadığını açıklıyor.

## Sabit yığının israfı

En basit servis düzeni şudur: gelen istekleri bir süre topla, bir yığın oluştur, modeli çalıştır, sonuçları döndür, sonraki yığına geç. Görüntü sınıflandırma gibi tek geçişli işlerde bu düzen kusursuz çalışır — her istek bir kez modelden geçer ve biter.

Üretim öyle değil. 10\. makaledeki otoregresif döngü yüzünden bir istek, üreteceği token sayısı kadar geçiş ister. Aynı yığındaki iki istekten biri yirmi token, öbürü beş yüz token üretebilir. Sabit yığında bunun iki bedeli var: erken biten istek, en yavaş isteği beklemeden kullanıcıya dönemez; ve yığın çalışırken gelen yeni istek, bütün yığın bitene kadar kuyrukta bekler.

Gyeong-In Yu ve arkadaşlarının OSDI 2022'de sunduğu çalışma çözümü tek bir kelimeyle değiştirdi: çizelgeleme kararını **istek** düzeyinde değil **yineleme** düzeyinde ver. Bir yineleme, modelin bütün katmanlarını bir kez çalıştırmak, yani yığındaki her istek için birer token üretmektir. Çizelgeleyici her yinelemeden sonra devreye girer: biten istekler hemen çıkar, kuyruktaki yeni istekler yalnızca bir yineleme bekleyerek girer. Bugün bu düzene **sürekli yığınlama** (continuous batching) deniyor.

![İki zaman şeması alt alta gösterilir. Üstte sabit yığın: dört istek aynı anda başlar, kısa olanlar erken biter ve kalan süreleri kesik çizgili, "boşta" yazan kutular olarak devam eder; en altta bekleyen yeni istek, bütün yığın bitene kadar "kuyrukta bekler" yazan kesik çizgili bir kutuda durur ve ancak ondan sonra başlar. Altta sürekli yığınlama: aynı dört istek gösterilir, ama biten isteğin yeri hemen yeni bir istekle dolar ve boşta yazan hiçbir kutu kalmaz.](assets/sabit-ve-surekli-yiginlama.svg "Şekil 1 — Aynı dört istek, iki çizelgeleme düzeni")

Şekil 1'deki fark, yığının boşta geçen hücrelerinden geliyor. GPT-3 boyutundaki bir modelde ölçülen etki büyük: aynı gecikme düzeyinde iş hacmi 36,9 kat artıyor. Bu sayının bu kadar büyük olması, karşılaştırılan taban düzenin ne kadar israflı olduğunu gösteriyor — kazanç yeni bir hesaplama numarasından değil, boş hücreleri doldurmaktan geliyor.

Aynı çalışmanın ikinci fikri daha ince ve doğrudan 26\. makaleye bağlanıyor. Yığındaki istekler farklı uzunluklarda olduğu için dikkat hesabının girdileri farklı şekillerde; bunları tek bir toplu işlemde çalıştırmak mümkün değil. Çözüm, yığınlamayı seçici yapmak — çalışmanın adlandırmasıyla **seçici yığınlama** (selective batching): dikkat işlemi her istek için ayrı ayrı yürütülüyor, modelin geri kalanı yığın hâlinde. Bunun maliyeti neredeyse yok, çünkü yığınlamanın kazancı yüklenen **parametreleri** birden çok istek arasında paylaşmaktır — ve dikkat işleminin parametresi yoktur. 26\. makaledeki muhasebe burada bir tasarım kararına dönüşüyor.

> **Kendini yokla:** Sürekli yığınlama iş hacmini bu kadar artırıyorsa, tek bir kullanıcının cevabı neden aynı ölçüde hızlanmıyor?

Çünkü kazanılan şey boş hücrelerin doldurulması, yani birim zamanda hizmet verilen istek sayısı. Tek bir isteğin cevabı hâlâ token token üretiliyor ve her token için ağırlıkların tamamı okunuyor. İş hacmi ile gecikme farklı kalemler; sürekli yığınlama birincisini iyileştirir, ikincisine dokunmaz.

Yığını ne kadar büyütebileceğimizin sınırı da 26\. makalede kurulmuştu ve bir çizelgeleme sorunu değil: her ek isteğin kendi anahtar-değer önbelleği var ve o önbellek, ağırlıkların yanında kalan yerden yeniyor. Yani sürekli yığınlama yığındaki boşlukları doldurur, ama yığının tavanını bellek belirler. 27\. makalenin bu makaleye bağlandığı yer tam olarak burası: ağırlıkları ya da önbelleği küçültmek çipi doğrudan hızlandırmaz, **daha büyük bir yığına yer açar** ve hızlanma o yığından gelir.

## Ön dolumun devam eden üretimi durdurması

Sürekli yığınlama bir sorunu çözerken bir yenisini açıyor. Yığına yeni bir istek girdiğinde önce onun ön dolumu yapılmalı: 26\. makaledeki tanımla, istemin bütün token'larının tek geçişte işlenmesi. Bu aşama hesap yoğun ve uzun — beş bin token'lık bir istem, tek token üreten bir adımdan kat kat fazla iş demektir.

Bu asimetriyi 26\. makalenin muhasebesiyle sayıya dökebiliriz. N parametreli bir model bir token için yaklaşık 2N işlem yapıyordu. 5.000 token'lık bir istemin ön dolumu, o hâlde, 5.000 × 2N işlem demektir. Aynı anda on altı isteğe hizmet veren bir yığının tek bir üretim adımı ise 16 × 2N. Oran 5.000 ÷ 16 ≈ **312**: tek bir ön dolum, yığının üç yüz adımından fazlasına bedel bir iş yükü getiriyor ve bu iş bitene kadar hiç kimse token almıyor.

O sırada yığındaki öteki isteklerin üretimi bekler. Kullanıcı tarafında bunun görüntüsü, akan metnin ortada saniyelerce takılmasıdır. Amey Agrawal ve arkadaşlarının OSDI 2024'te sunduğu çalışma bu duraklamaları ölçtü ve yükle birlikte hızla kötüleştiklerini gösterdi: yaygın bir servis sisteminde, iki kart üzerinde çalışan 34 milyar parametreli bir modelde, token'lar arası sürenin en kötü yüzdelik dilimi kuyruk yoğunlaştıkça saniye mertebesine çıkıyor. Dikkat edilmesi gereken şey, bu bozulmanın **ortalamada görünmemesi**: aynı sistem ortalama token hızında iyi bir sayı bildirebilir, çünkü duraklamalar seyrek ama uzundur.

İki farklı çözüm önerildi ve ikisi de aynı yıl aynı konferansta sunuldu. Şekil 2 üç düzeni aynı zaman çizelgesi üzerinde yan yana koyuyor.

![Üç şeritli bir zaman çizelgesi. Üstteki şeritte devam eden küçük üretim kutularının ortasına büyük bir ön dolum bloğu girer ve o blok boyunca hiç üretim kutusu yoktur; şeridin altında bunun akışta duraklama olarak görüldüğü yazılıdır. Ortadaki şeritte aynı ön dolum dört eşit parçaya bölünmüştür ve her parça üretim adımlarının arasına serpiştirilmiştir; üretim hiç durmaz. Alttaki şeritte iki ayrı kart gösterilir: solda yalnızca ön dolum yapan kart, sağda yalnızca üretim yapan kart, aralarında bir bağlantı ve altında anahtar-değer önbelleğinin aktarıldığını söyleyen bir satır vardır.](assets/on-dolum-catismasi.svg "Şekil 2 — Aynı çatışmaya üç farklı cevap")

**Parçalı ön dolum** (chunked prefill) aşamaları ayırmıyor, ön dolumu bölüyor. Uzun bir istem yaklaşık eşit parçalara ayrılıyor ve her yinelemede bir parça, devam eden üretimlerle **aynı** yığında işleniyor. Böylece her yineleme benzer büyüklükte oluyor ve hiçbir üretim duraklamıyor. Ölçülen kazanç, aynı gecikme kısıtları altında servis kapasitesinde: tek kart üzerindeki 7 milyarlık bir modelde 2,6 kat, iki kart üzerindeki 34 milyarlıkta 3,7 kata kadar, boru hattı paralelliğiyle çalışan 180 milyarlıkta 5,6 kata kadar.

Parça boyunun kendisi bir ayar. Parçalar çok büyükse duraklamalar geri gelir; çok küçükse ön dolumun asıl avantajı kaybolur, çünkü her parça ağırlıkların yeniden okunmasını gerektirir ve 26\. makaledeki hesap gücüyle sınırlı rejimden bellekle sınırlı rejime kayılır. Aranan nokta, bir yinelemenin çipi doyuracak kadar büyük, akışı takmayacak kadar küçük olduğu yerdir.

**Ayrıştırma** (disaggregation) ise tam tersini yapıyor: iki aşamayı ayrı kartlara koyuyor. Yinmin Zhong ve arkadaşlarının gerekçesi, iki aşamanın yalnızca birbirini engellemesi değil, aynı kaynak ve paralellik planını paylaşmaya zorlanması. Ön dolum kartları istemleri işleyip anahtar-değer önbelleğini üretiyor, üretim kartları o önbelleği devralıp cevabı akıtıyor; her aşama kendi paralellik stratejisiyle ayrı ayrı ayarlanabiliyor. Sonuç, iki gecikme kısıtının birden karşılandığı çalışma noktasında 7,4 kat daha çok istek ya da 12,6 kat daha sıkı bir kısıt; isteklerin yüzde 90'ından fazlası kısıt içinde kalıyor.

Bu yolun kendi bedeli, taşınan önbelleğin kendisi. 26\. makaledeki hesabı hatırla: uzun bir sohbetin önbelleği on gigabaytlar mertebesinde olabiliyor ve bu veri, iki kart grubu arasında ağ üzerinden geçmek zorunda. Çalışma bu yüzden iki aşamayı kümenin bant genişliğine bakarak yerleştiriyor. Yani ayrıştırma bir çatışmayı çözerken yeni bir kaynağı — kartlar arası bağı — kısıt hâline getiriyor.

İki çözümün ortak varsayımı, 26\. makalede adını koyduğumuz iki ölçünün ayrı ayrı ölçülmesi gerektiğidir. Alan bunlara isim verdi: **ilk token süresi** (time to first token), yani ön dolumun süresi; ve **çıktı token'ı başına süre** (time per output token), yani akışın hızı. Bir sistem birini iyileştirirken öbürünü bozabilir, ve bir hizmet vaadi ancak ikisi birden söylendiğinde anlamlıdır.

## Boştaki hesabı tahmine harcamak

Şimdi girişteki boşluğa dönelim. Adım adım üretimde çip beklemekle meşguldü. Peki o bekleme sırasında fazladan hesap yapmanın maliyeti nedir? Neredeyse sıfır — çünkü darboğaz hesap değil.

Yaniv Leviathan, Matan Kalman ve Yossi Matias'ın ICML 2023'te sunduğu çalışma bu boşluğu şöyle kullanıyor. Büyük modelin yanına küçük ve hızlı bir **taslak model** (draft model) koy. Taslak model sıradaki birkaç token'ı kendi başına, art arda üretsin; bu sayıya γ diyelim. Sonra büyük model bu γ tahmini **tek bir geçişte** değerlendirsin, yani her konum için kendi dağılımını hesaplasın. Yöntemin adı **spekülatif üretim** (speculative decoding).

Bu geçişin maliyeti neden düşük? 26\. makaledeki muhasebe yüzünden. Büyük modelin bir adımı, ağırlıklarının tamamını bellekten okumaktan ibaret; bir konum yerine sekiz konumu birden değerlendirmek okunan baytı değiştirmez, yalnızca yapılan işlemi artırır. İşlem zaten boştaydı.

Sonra kabul kararı geliyor ve asıl incelik burada. Taslağın önerdiği token, büyük modelin ona verdiği olasılık taslağınkinden büyük ya da eşitse doğrudan kabul edilir; küçükse, aradaki orana bağlı bir olasılıkla reddedilir. Reddedilen konumda, iki dağılımın farkından türetilen düzeltilmiş bir dağılımdan yeni bir token çekilir. Bu düzenin kanıtlanabilir bir özelliği var: **çıktının dağılımı, büyük modelin tek başına ürettiği dağılımla birebir aynıdır**. 10\. makaledeki çerçeveyle söylersek, çekilişin kuralları değişmiyor; yalnızca zarın nasıl atıldığı değişiyor. Yani bu bir yaklaşıklık değil, bir hızlandırma.

![Üç satırlı bir adım şeması. Üst satırda küçük taslak modelin art arda ürettiği yedi token kutusu vardır. Orta satırda büyük modelin tek bir geçişte bu yedi konumun tamamını aynı anda değerlendirdiği, tek bir geniş kutu ve ona inen yedi dikey bağlantı çizgisiyle gösterilir. Alt satırda sonuç dizilir: ilk dört kutu kabul edilmiş olarak, beşinci kutu reddedilmiş olarak işaretlenir ve onun yerine büyük modelin düzeltilmiş dağılımdan çektiği bir token konur; kalan iki öneri atılır. Şemanın altında bir geçişte üretilen token sayısının en az bir, en çok yedi artı bir olduğu ve çıktının dağılımının değişmediği yazılıdır.](assets/spekulatif-uretim.svg "Şekil 3 — Öner, tek geçişte doğrula, düzelt")

Şekil 3'teki döngünün getirisi tek bir sayıya bağlı: **kabul oranı**, yani taslağın önerdiği bir token'ın kabul edilme olasılığı. Buna α diyelim ve bir adımda kaç token üretildiğini hesaplayalım. Öneriler ilk reddedilene kadar kabul edilir ve reddedilen konumda da bir token üretilir; yani üretilen token sayısı, en fazla γ+1 ile sınırlanmış geometrik bir değişkendir. Beklenen değeri şudur: 1 eksi α'nın γ+1'inci kuvveti, bölü 1 eksi α.

Somut yapalım. Taslak model yedi token öneriyor (γ = 7) ve kabul oranı 0,62 ölçülmüş olsun. 0,62'nin sekizinci kuvveti 0,0218; hesap (1 − 0,0218) ÷ (1 − 0,62) = 2,57 çıkıyor. Yani büyük modelin her geçişinde ortalama 2,57 token üretiliyor. Aynı düzende ölçülen gerçek duvar saati hızlanması 2,6 kat.

## Taslak modeli seçmenin değiş tokuşu

Kabul oranı yüksek olsun istiyoruz. En kolay yol taslağı büyütmek — ama bu, hızlanmayı **düşürüyor**. Aynı çalışmanın 11 milyar parametreli bir hedef model üzerindeki ölçümü:

| Taslak model | Kabul oranı | Hızlanma |
|---|---|---|
| 77 milyon | 0,62 | 2,6× |
| 250 milyon | 0,68 | 2,4× |
| 800 milyon | 0,71 | 1,4× |

Sebep açık: taslağın kendi çalışması da zaman alıyor ve bu maliyet her adımda γ kez ödeniyor. 800 milyonluk taslak daha isabetli tahminler yapıyor ama hedefin on dörtte biri kadar bir maliyetle geliyor; kazandırdığından fazlasını yiyor.

Ölçeğin öbür ucu daha da öğretici. Aynı çalışma, taslak yerine 5\. makalede elle kurduğumuz **bigram** modelini — yalnızca bir önceki token'a bakıp sonrakini sayımla tahmin eden model — kullandığında kabul oranının 0,20'ye düştüğünü, ama maliyeti sıfıra yakın olduğu için yine de 1,25 kat hızlanma sağladığını ölçüyor. Yani seçilecek şey en iyi taslak değil, kabul oranı ile maliyetin çarpımını en iyileyen taslak.

Üçüncü bir değişken de 10\. makaleden tanıdık: sıcaklık. Açgözlü seçimde kabul oranı belirgin biçimde yükseliyor (aynı 77 milyonluk taslakla 0,62 yerine 0,75) ve hızlanma 3,4 kata çıkıyor. Sebep sezgisel — dağılım keskinleştikçe iki modelin en olası seçimde anlaşma ihtimali artıyor.

Bir sınır kaydı da gerekiyor. Spekülatif üretim gecikmeyi eşzamanlılığı artırarak iyileştirir ve bunun bedeli **daha fazla işlem**. Yığın zaten doluysa, yani çip hesap yapmakla meşgulse, harcanacak boşluk yoktur ve yöntemin faydası erir. Bu yüzden en büyük kazancı tek kullanıcılı ya da hafif yüklü çalışma noktalarında verir — tam da sürekli yığınlamanın en az işe yaradığı noktalarda. İki teknik birbirinin yerine geçmez; yükün farklı bölgelerini kapatır.

## Aynı işi iki kez yapmamak

Boşluğu doldurmanın son yolu, hesabı hızlandırmak değil hiç yapmamak. 26\. makalede sayfalı dikkatin bir yan kazancını görmüştük: birden çok isteğin ortak bir başlangıcı varsa o kısmın anahtar ve değerleri bir kez hesaplanıp paylaşılabilir.

Lianmin Zheng ve arkadaşlarının NeurIPS 2024'te sunduğu çalışma bunu elle kurulan bir iyileştirme olmaktan çıkarıp otomatik hâle getiriyor. Bütün isteklerin önbellekleri, ortak öneklerin tek bir dalda buluştuğu bir ağaçta tutuluyor; yeni bir istek geldiğinde en uzun ortak önek aranıyor ve bulunan kısım yeniden kullanılıyor. Bellek dolduğunda en uzun süredir kullanılmayan dallar atılıyor. Ölçülen iş hacmi kazancı, önek paylaşımının yoğun olduğu iş yüklerinde 6,4 kata çıkıyor.

Bunun kimin işine yaradığı doğrudan önceki makalelerden okunuyor. 24\. makaledeki sistem istemi her istekte aynıdır. 23\. makaledeki 997 örnekli istem — yaklaşık 85.000 token — değişmeyen bir önektir. İleride ele alacağımız ajan döngülerinde de her tur, bir öncekinin üzerine ekler. Üçünde de asıl kazanç yeni bir donanımdan değil, aynı önekin bir kez ödenmesinden geliyor.

> **Kendini yokla:** Sistem isteminin sonuna kullanıcının adını yazan bir uygulama, önek paylaşımından ne kadar yararlanır?

Adın yazıldığı noktaya kadar tamamen; ondan sonrası her kullanıcı için ayrışır. Ağaçta ortak dal, ilk farklı token'da biter. Değişken alanları dizinin sonuna almak bu yüzden bir üslup tercihi değil, paylaşılan dalın boyunu belirleyen bir karardır.

## Servis ekonomisinin disiplini

Bu makaledeki tekniklerin ortak bir sonucu var: bir modelin hızı ve fiyatı, o modelin özelliği değil, çalıştığı sistemin ve o anki yükün sonucudur.

**İş hacmi ile gecikmeyi ayrı tut.** Yığını büyütmek birim zamanda hizmet verilen istek sayısını artırır ve tek kullanıcının cevabını yavaşlatır. İki ölçü aynı yönde iyileşmez; bir servis düzeni bu gerilimde bir nokta seçmektir.

**"Saniyede kaç token" yükten bağımsız bir sayı değildir.** Aynı model, boş bir sistemde ve dolu bir kuyrukta bambaşka davranır. İlan edilen sayının hangi yükte ölçüldüğü sorulmalıdır.

**Duraklamalar ortalamada görünmez.** Akıştaki saniyelik takılmalar, token'lar arası sürenin ortalamasını çok az etkiler ama kullanıcı deneyimini belirler. Ölçüm en kötü yüzdelik dilimlerden okunmalıdır.

**Spekülatif üretimin kazancı yüke bağlıdır.** Boşta hesap varsa büyüktür, çip zaten doluysa yoktur. Kayıpsız olması onu bedava yapmaz.

**Önekini sabit ve başta tut.** Değişmeyen kısmın hesabı bir kez ödenir; paylaşım ilk farklı token'da biter.

### Sırada ne var

Buraya kadar dört makale boyunca pencerenin maliyetini düşürdük: önbelleği anladık, sayıları küçülttük, boşluğu doldurduk. Ama bütün bu ekonominin bir varsayımı vardı — pencereye konacak metnin elimizde olduğu. Gerçek sistemlerde öyle değil. Milyonlarca belgenin arasından, kullanıcının sorusuyla gerçekten ilgili olan birkaç tanesini bulmak gerekiyor ve kelime eşleştirmek yetmiyor. 4\. makalede kurduğumuz o vektör uzayı, tam olarak burada bir ürün bileşenine dönüşüyor.

## Kaynakça

- Yu, G.-I., Jeong, J. S., Kim, G.-W., Kim, S. & Chun, B.-G. (2022). *Orca: A Distributed Serving System for Transformer-Based Generative Models*. OSDI 2022, s. 521–538. [Bağlantı](https://www.usenix.org/conference/osdi22/presentation/yu)
- Agrawal, A., Kedia, N., Panwar, A., Mohan, J., Kwatra, N., Gulavani, B. S., Tumanov, A. & Ramjee, R. (2024). *Taming Throughput-Latency Tradeoff in LLM Inference with Sarathi-Serve*. OSDI 2024, s. 117–134. [Bağlantı](https://www.usenix.org/conference/osdi24/presentation/agrawal)
- Zhong, Y., Liu, S., Chen, J., Hu, J., Zhu, Y., Liu, X., Jin, X. & Zhang, H. (2024). *DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving*. OSDI 2024, s. 193–210. [Bağlantı](https://www.usenix.org/conference/osdi24/presentation/zhong-yinmin)
- Leviathan, Y., Kalman, M. & Matias, Y. (2023). *Fast Inference from Transformers via Speculative Decoding*. ICML 2023, PMLR 202. [Bağlantı](https://proceedings.mlr.press/v202/leviathan23a.html)
- Zheng, L., Yin, L., Xie, Z., Sun, C., Huang, J., Yu, C. H., Cao, S., Kozyrakis, C., Stoica, I., Gonzalez, J. E., Barrett, C. & Sheng, Y. (2024). *SGLang: Efficient Execution of Structured Language Model Programs*. NeurIPS 2024. [Bağlantı](https://proceedings.neurips.cc/paper_files/paper/2024/hash/724be4472168f31ba1c9ac630f15dec8-Abstract-Conference.html)
