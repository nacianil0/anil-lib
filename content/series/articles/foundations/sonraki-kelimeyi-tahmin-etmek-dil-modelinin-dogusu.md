---
article_id: article_ad607086-8637-40fd-a240-bd9d5c23aba1
title: "Sonraki Kelimeyi Tahmin Etmek: Dil Modelinin Doğuşu"
slug: sonraki-kelimeyi-tahmin-etmek-dil-modelinin-dogusu
category: foundations
level: beginner
reading_order: 5
summary: "Shannon'un tahmin oyunundan n-gram'ların seyreklik duvarına ve Bengio'nun nöral köprüsüne: dil modelinin tanımını, perplexity'yi ve ölçeğin ne değiştirdiğini kurar."
tags:
  - dil-modeli
  - n-gram
  - perplexity
  - sonraki-token
  - shannon
content_hash: sha256:62a325242ca156954286c322231ca3f7c93d0760626350ac54bf3b9b06707f9f
classification_version: 1
classification_batch: 0
---
## Harf tahmin oyunundan dev modellere

Buraya kadar zincirin iki büyük halkasını kurduk. 2. makalede görmüştük: bir model, parametreleri olan ayarlanabilir bir fonksiyondur; tahminiyle gerçek arasındaki farkı kayıp fonksiyonu (loss function) ölçer, gradyan inişi de bu kaybı azaltacak yönde parametreleri azar azar günceller. 4. makalede ise dili sayılara çevirdik: metin önce token'lara bölünür, her token öğrenilmiş bir embedding vektörüne dönüşür. Ama ortada hâlâ cevaplanmamış bir soru var: bu makine tam olarak *neyi* tahmin etmeyi öğreniyor? Kayıp, neyin kaybı?

Cevap, yetmiş yılı aşkın bir süredir değişmedi ve rahatsız edici derecede basit: **bir sonrakini tahmin et.**

Bu fikrin doğum yeri bir yapay zekâ laboratuvarı değil, bir telefon şirketi. Claude Shannon, 1948'de Bell Laboratuvarları'nda yayımladığı ve bilgi kuramını (information theory) tek başına kuran çalışmasında, garip görünen bir deney anlatır: İngilizce metni istatistiksel bir süreç olarak taklit etmeye çalışır. Önce harfleri tamamen rastgele dizer; çıktı anlamsız bir harf çorbasıdır. Sonra harfleri İngilizcedeki gerçek sıklıklarına göre seçer; çorba hafifçe İngilizceye benzemeye başlar. Sonra her harfi bir önceki harfe bakarak seçer, sonra önceki iki harfe bakarak, sonra kelime düzeyinde... Her adımda çıktı, gerçek İngilizceye gözle görülür biçimde yaklaşır. Üstelik Shannon bunu bilgisayarla değil, elindeki kitaplarla yapmıştır: rastgele bir sayfa açar, bir harf seçer, sonra başka bir sayfada aynı harfi bulana kadar okur ve hemen ardından gelen harfi not eder. Kitaplık, onun sayım tablosudur. Bu prosedürün güzelliği şurada: bir dil modelinden örnekleme yapmanın mekanik bir işlem olduğunu, ortada niyet ya da görüş olmadığını gözle görünür kılar.

1\. makalede kısaca değinmiştik; şimdi oyunun kendisine bakalım. Shannon 1951'de bu fikri bir ölçüm aletine dönüştürdü. "Basılı İngilizcenin Tahmini ve Entropisi" başlıklı çalışmasında insanlara şu oyunu oynattı: sana bilmediğin bir metnin başını gösteriyorum; sıradaki harfi tahmin et. Bilirsen devam ediyoruz, bilemezsen doğrusunu söyleyip ilerliyoruz. Şekil 1'deki gibi: metnin görünen kısmı bir ipucu, oyuncunun tahmin sırası ise dilin ne kadar öngörülebilir olduğunun kaydıdır. Shannon'un aktardığı bir denemede 129 harflik bir pasajın yüzde 69'u daha ilk tahminde doğru bilinmişti. Bu deneylerden yola çıkarak, yeterince uzun bağlam verildiğinde basılı İngilizcenin harf başına belirsizliğinin kabaca 1 bit düzeyine indiğini, yani metnin yaklaşık dörtte üçünün "fazlalık" olduğunu tahmin etti. Shannon bu sayıyı bir doğa sabiti gibi değil, örnekleme hatası payı olan bir kestirim olarak sundu; biz de öyle aktaralım. Ama asıl bulgu sayı değil, sayının varlığıdır: dil, şaşırtıcı derecede tahmin edilebilir bir yapıdır ve bu tahmin edilebilirlik *ölçülebilir*.

![Shannon'un tahmin oyunu: kısmî bir metnin sıradaki harfi, doğru bilinene kadar sırayla tahmin edilir; tahmin sayısı dilin öngörülebilirliğini ölçer](assets/shannon-oyunu.svg "Şekil 1 — Shannon'un harf tahmin oyunu")

O oyunu oynayan insan, farkında olmadan bugünkü dev dil modellerinin yaptığı işin ta kendisini yapıyordu. Aradaki fark ölçek ve mekanizmadır, görevin kendisi değil.

## Dil modeli tam olarak nedir?

Tanımı sade tutalım. **Dil modeli (language model)**, verilen bir bağlamdan sonra gelebilecek her olası token'a bir olasılık atayan modeldir. Jurafsky ve Martin'in alanın standart ders kitabı *Speech and Language Processing*'deki tanımı tam olarak budur: model, olası her sonraki kelimeye bir olasılık verir; eşdeğer biçimde, sonraki kelimeler üzerinde bir olasılık dağılımı üretir. Bu göreve **sonraki token tahmini (next-token prediction)** denir.

Somutlaştıralım: "Bugün hava çok ___" bağlamını modele verdiğimizde model tek bir kelime söylemez; sözlüğündeki *her* token için bir sayı üretir. Şekil 2'deki gibi: "güzel" yüksek bir olasılık alır, "sıcak" ve "soğuk" onu izler, "yağmurlu" daha geriden gelir ve "mikroskop" da sıfır değil ama gülünç derecede küçük bir pay alır. Çıktı bir cevap değil, bir *dağılımdır*. Bu ayrım serinin ilerleyen makalelerinde tekrar tekrar karşımıza çıkacak: modelin ürettiği metin, bu dağılımdan yapılan bir çekiliştir ve çekilişin nasıl yapıldığı (10. makalenin konusu) çıktının karakterini kökten değiştirir.

![Dil modelinin çıktısı: "Bugün hava çok" bağlamı için sözlükteki aday token'lara atanmış olasılıklar; olası adaylar yüksek, alakasız adaylar küçücük pay alır](assets/sonraki-token-dagilimi.svg "Şekil 2 — Sonraki token üzerinde olasılık dağılımı")

Peki koca bir cümlenin olasılığı nedir? Burada olasılık kuramının **zincir kuralı (chain rule)** devreye girer ve sözle anlatması yarım cümle sürer: bir dizinin olasılığı, her adımda "buraya kadarki kısım verildiğinde sıradaki parçanın olasılığı" değerlerinin çarpımıdır. "Bugün hava çok güzel" cümlesinin olasılığı = P(bugün) × P(hava | bugün) × P(çok | bugün hava) × P(güzel | bugün hava çok). Kritik nokta şu: bu bir yaklaştırma değil, olasılık kuramının kesin bir özdeşliğidir. Cümleye olasılık vermekle sonraki token'ı tahmin etmek, aynı nesnenin iki farklı açıdan görünüşüdür. Bundan sonraki her şey — n-gram'lar, sinir ağları, Transformer'lar — o koşullu terimi, yani "buraya kadarkine bakıp sıradakini kestirme" işini *nasıl hesaplayacağımız* üzerine verilmiş yetmiş yıllık bir kavgadır.

Bu hedefin eğitimle bağı da 2. makaledeki döngünün aynısıdır: modele gerçek bir metinden bir parça göster, sıradaki gerçek token'a ne kadar olasılık verdiğine bak. Gerçekleşen token'a düşük olasılık vermişse kayıp yüksektir; gradyan inişi parametreleri, bir dahaki sefere o bağlamda o token'a daha çok olasılık verecek yönde iter. Bu hedefin sessiz ama devasa bir avantajı var: etiketli veri gerektirmez. Yeryüzündeki her düzgün metin, kendi kendinin cevap anahtarıdır — her kelime, kendinden öncekiler için "doğru cevap" görevi görür.

## İlk yaklaşım: saymak

Bu koşullu olasılıkları nereden bulacağız? İlk dürüst cevap: sayarak. Ve bu cevabın tarihi, sonraki-token fikrinin kendisinden bile eski.

1913'te Rus matematikçi Andrey Markov, Puşkin'in *Yevgeni Onegin*'inin ilk 20.000 harfini elle sayarak tek bir soruya cevap aradı: bir harfin sesli mi sessiz mi olduğu, kendinden önceki harfe bağlı mıdır? Brian Hayes'in bu çalışmayı anlatan makalesindeki sayılar çarpıcıdır: harfler birbirinden bağımsız olsaydı yan yana yaklaşık 3.731 sesli-sesli çift beklenirdi; Markov yalnızca 1.104 buldu. Bağımsızlık hipotezi ölmüştü: metin, her adımı öncekine bağlı bir zincirdir. Markov, zincir fikrinin matematiğini birkaç yıl önce kurmuştu; *Yevgeni Onegin* sayımı bu soyut çerçevenin gerçek bir metin üzerinde ilk kez sınanmasıydı — ve bugün "Markov zinciri" dediğimiz nesneyi dil verisiyle buluşturan adım budur.

Bu fikrin mühendisliğe dönüşmüş hâli **n-gram** modelidir: sonraki token'ın olasılığını tüm geçmişe değil, yalnızca son birkaç token'a bakarak kestir ve bu kestirimi büyük bir derlemdeki (corpus) sayımlardan çıkar. n=2 ise model "bigram"dır ve yalnızca bir önceki token'a bakar. Dikkat et: zincir kuralı kesindi; asıl yaklaştırma, geçmişi son birkaç token'a *budamaktır*. Bu ikisini karıştırmamak, bu makalenin en önemli ince ayrımıdır — çünkü nöral modellerin hikâyesi tam olarak bu budamayı geri alma hikâyesidir.

Elle bir bigram modeli kuralım. Oyuncak derlemimiz beş cümle olsun:

1. bugün hava çok güzel
2. bugün hava çok sıcak
3. hava çok güzel
4. çorba çok sıcak
5. bugün deniz çok güzel

Şimdi sayalım: her token'dan sonra hangi token kaç kez gelmiş?

| Bağlam (önceki token) | Aday | Sayım | Olasılık |
|---|---|---|---|
| bugün | hava | 2 | 2/3 ≈ 0,67 |
| bugün | deniz | 1 | 1/3 ≈ 0,33 |
| hava | çok | 3 | 3/3 = 1,00 |
| çok | güzel | 3 | 3/5 = 0,60 |
| çok | sıcak | 2 | 2/5 = 0,40 |

Modelimiz hazır. "Hava çok ___" için tahmin istersek bigram yalnızca son token'a, yani "çok"a bakar: yüzde 60 "güzel", yüzde 40 "sıcak" der. Sayması dakikalar süren bu tablo, gerçek bir dil modelidir — küçük, ama tanımın her koşulunu sağlıyor.

Bu yaklaşım oyuncak olmaktan 1970'lerin ortasında çıktı. IBM'de Frederick Jelinek ve arkadaşları, konuşma tanıma problemine dil bilgisi kurallarıyla değil istatistikle saldırdılar: mikrofondaki belirsiz sesi çözmek için "bu kelime dizisi ne kadar olası?" sorusunu n-gram sayımlarıyla cevapladılar ve el yazması gramerlere karşı bu yaklaşımı savundular. "Dil modeli" terimini de, birazdan tanışacağımız "perplexity" ölçüsünü de alana kazandıran bu ekiptir; perplexity ilk kez Jelinek, Mercer, Bahl ve Baker'ın 1977 tarihli kısa bildirisinde yayımlandı. Sayım tablolarının bir de bilinen yaması var: derlemde hiç görülmemiş bir ikiliye düz sayım sıfır olasılık verir, oysa "hiç görmedim" ile "imkânsız" aynı şey değildir; bu yüzden n-gram sistemleri olasılığın bir kısmını görülmemiş devamlara pay eden yumuşatma (smoothing) teknikleriyle ayakta durur.

> **Kendini yokla:** Bigram modelimize "çorba çok ___" dersek ne tahmin eder? Bu tahminin rahatsız edici yanı ne?

Cevap: "hava çok ___" ile tıpatıp aynı dağılımı verir — yüzde 60 "güzel". Çünkü model yalnızca "çok"u görüyor; çorbadan haberi yok. Doğal refleks şu olur: "o zaman daha geriye bakalım, n'yi büyütelim." İşte orada bir duvara çarpıyoruz.

## Seyreklik duvarı: saymanın bittiği yer

n'yi büyütmenin neden işe yaramadığını görmek için küçük bir hesap yeter. Bengio ve arkadaşlarının 2003 tarihli makalesindeki örnek şudur: 100.000 kelimelik bir sözlükle 10 kelimelik dizilerin olasılıklarını tablolamak istersen, tablonun potansiyel hücre sayısı 100.000¹⁰ = 10⁵⁰ olur. Bu sayının büyüklüğü dama tahtasındaki kareler gibi "çok ama sayılabilir" bir çokluk değil; kum taneleri gibi kavrayışı aşan bir çokluktur. Hiçbir derlem — internetin tamamı dahil — bu tablonun hücrelerinin kayda değer bir kısmını dolduramaz. Derlemini büyüttükçe verin doğrusal büyür; tablo ise n ile üstel büyür. Bu yarışın galibi baştan bellidir.

Sonuç, Şekil 3'ün sol panelindeki manzara: bağlam uzadıkça sayım tablosunun ezici çoğunluğu boş kalır. Karşına çıkan cümlelerin çoğu, kelimesi kelimesine *hiç yazılmamış* cümlelerdir. "Mor kaplumbağa vergisini meclis dün reddetti" cümlesini büyük olasılıkla daha önce kimse kurmadı; yine de dilbilgisel, anlaşılır ve bir dil modelinin makul bulması gereken bir cümle. Sayım tablosu için ise o cümle bir hiçtir: sayımı sıfır, komşusu yok, benzerinden öğrenme imkânı yok. Buna literatürde **boyutluluk laneti (curse of dimensionality)** denir; n-gram bağlamındaki görünümü, verinin olasılık uzayına serpilmiş birkaç kum tanesi kadar seyrek kalmasıdır.

![Solda n-gram sayım tablosu: bağlam uzayınca hücrelerin çoğu boş, model görülmemiş diziye tutunamaz; sağda nöral yaklaşım: embedding uzayında yakın kelimeler üzerinden genelleme yapılır](assets/seyreklik-duvari.svg "Şekil 3 — Seyreklik duvarı ve nöral genelleme")

Dürüstlük payı: n-gram'lar ölmedi. 2024'te Liu ve arkadaşları "Infini-gram" adıyla 5 trilyon token üzerine kurulmuş dev bir n-gram modeli inşa etti; tek başına sonraki token'ların yüzde 47'sini bilebildiğini ve modern nöral modellerle harmanlandığında onların hatasını ölçülebilir biçimde azalttığını gösterdiler. Saymak hâlâ işe yarar — ama tek başına hikâyeyi taşıyamaz. Duvarı aşan fikir başka yerden geldi.

## Bengio'nun köprüsü: saymak yerine öğrenmek

2003'te Yoshua Bengio, Réjean Ducharme, Pascal Vincent ve Christian Jauvin, "A Neural Probabilistic Language Model" başlıklı makalede bu serinin belki de en önemli menteşesini kurdular. Fikir iki hamlelik: birincisi, her kelimeyi ayrık bir sembol olarak değil, sürekli bir uzayda yaşayan bir vektör — yani 4. makaleden tanıdığın **embedding** — olarak temsil et. İkincisi ve asıl yenilik: bu vektörleri *ve* sonraki kelimeyi tahmin eden sinir ağını **aynı anda, aynı kayıpla** eğit. 4. makalede "kelime vektörleri nereden geliyor?" diye sormuştuk; tarihsel cevap tam olarak burasıdır: embedding'ler, dil modelleme hedefinin içinden doğdu. O makalede gördüğün word2vec bile soy ağacını buraya bağlar: Mikolov ve arkadaşlarının 2013 tarihli çalışması, ilk kaynak olarak Bengio'nun bu modelini gösterir ve kendini onun sadeleştirilmiş bir varyantı olarak konumlar.

Bu iki hamle seyreklik duvarını neden aşıyor? Çünkü sürekli uzayda "hiç görülmemiş", "imkânsız" olmaktan çıkar. Bengio ve arkadaşlarının kendi ifadesiyle: daha önce hiç görülmemiş bir kelime dizisi, *daha önce görülmüş bir cümledeki kelimelere benzer kelimelerden* oluşuyorsa yüksek olasılık alır. Derlemde "kedi minderde uyuyor" varsa ve "köpek" vektör uzayında "kedi"ye yakınsa, model "köpek minderde uyuyor"a hiç saymadan makul bir olasılık verebilir. Şekil 3'ün sağ paneli budur: sayım tablosunda birbirinden habersiz duran hücreler, embedding uzayında komşuya dönüşür ve benzer cümleler birbirine yardım eder. Tabloya kıyasla parametre sayısı da patlamaz: Bengio'nun modelinde parametre sayısı sözlük boyutuyla ve bağlam uzunluğuyla doğrusal büyür — 10⁵⁰ ile kıyaslanamayacak kadar mütevazı bir maliyet.

Sonuçlar da lafta kalmadı: Brown derlemi üzerinde nöral model, dönemin en iyi ayarlanmış n-gram'larına karşı perplexity'de yaklaşık yüzde 24'lük bir iyileşme sağladı. Ama makalenin bir dipnotu, sonraki on yılı tek cümlede açıklar: yaklaşık 14 milyon kelimelik derlemdeki eğitim, 40 işlemcili bir kümede *üç hafta* sürmüştü — ve bu sürede modelin verinin üzerinden yalnızca 5 kez geçilebilmişti. Fikir doğruydu ama dönemin donanımına göre lüzumsuzca pahalıydı; GPU'ların gelişiyle hesap ucuzlayana kadar nöral dil modelleri kenarda bekledi. İki dürüstlük notu daha: Bengio kelimelere vektör atama fikrini icat etmedi — makale, öncüllerini (kümeleme yaklaşımları, bilgi erişiminden gelen vektör temsilleri) açıkça sayar; yenilik temsille tahminciyi *birlikte* öğrenmektir. Ve mimari hâlâ sabit pencereliydi: son n−1 kelimeye bakan bir ileri beslemeli ağdı. Pencereyi ilkesel olarak kaldıran adım, Mikolov ve arkadaşlarının 2010'da gösterdiği yinelemeli (recurrent) dil modelleriydi; gerçek konuşma tanıma görevlerinde ayarlanmış n-gram'lara karşı perplexity'yi kabaca yarıya indirdiler. Pencereyi *pratikte* kaldıran adımın adını şimdilik sadece telaffuz edelim: Transformer — 7. makalenin konusu.

## Şaşkınlığı ölçmek: perplexity

Modelleri karşılaştırıp "yarıya indirdi" diyebilmemiz, ortada bir cetvel olduğunu ima ediyor. O cetvelin adı **perplexity** ve sezgisi tek cümle: *modelin sonraki token karşısındaki ortalama şaşkınlığı.* Jurafsky ve Martin'in benimsettiği yorumla perplexity, ağırlıklı bir "yol ayrımı sayısı"dır: perplexity'si 20 olan bir model, her adımda sanki 20 eşit olasılıklı seçenek arasından körlemesine seçim yapıyormuş kadar kararsızdır. Bu benzetmenin bozulduğu yer şurası: gerçek model hiçbir adımda 20 eşit seçenek görmez; kimi adımda neredeyse emindir, kiminde çok kararsızdır ve 20, bu hâllerin geometrik ortalamasıdır — yani "her kavşakta tam 20 yol vardır" diye okunamaz.

Sayısal sezgiyi iki mini örnekle kuralım. Dört kelimelik bir sözlük düşün. Model hep tam kararsızsa — her adaya 0,25 olasılık veriyorsa — perplexity tam olarak 4 çıkar: model, dört yollu kavşakta yazı tura atan biri kadar şaşkındır. Şimdi model biraz öğrenmiş olsun: adaylara 0,5 / 0,25 / 0,125 / 0,125 veriyorsa (kendi hesapladığımız küçük bir örnek) perplexity yaklaşık 3,4'e iner. Sözlükte hâlâ dört kelime var; ama modelin *fiilî* şaşkınlığı dörtten az, çünkü belirsizliği eşit dağıtmıyor. Perplexity düştükçe model, gerçekleşen token'lara ortalamada daha yüksek olasılık veriyor demektir — bu da 2. makaledeki kayıpla aynı madalyonun iki yüzüdür: perplexity, sonraki-token kaybının okunaklı bir ambalajıdır.

Bağlamın gücünü tek tablo anlatır. Jurafsky ve Martin, 38 milyon kelimelik *Wall Street Journal* metniyle eğitilmiş üç modelin test perplexity'sini verir:

| Model | Baktığı bağlam | Perplexity |
|---|---|---|
| Unigram | hiç | 962 |
| Bigram | 1 token | 170 |
| Trigram | 2 token | 109 |

Tek bir token'lık bağlam, şaşkınlığı 962'den 170'e indiriyor. Bir token daha, 109'a. Alanın on yıllar süren macerası bu sütunu aşağı çekme yarışı olarak okunabilir: Bengio'nun yüzde 24'ü, Mikolov'un yarıya indirmesi ve ölçek çağında çok daha aşağılara inen değerler — GPT-3, Penn Treebank adlı klasik test kümesinde perplexity'yi 20,5'e indirerek önceki en iyi sonucu 15 puan geride bırakmıştı.

> **Kendini yokla:** Perplexity 962'den 109'a düştüğünde model hakkında tam olarak ne söyleyebiliyoruz — ve ne söyleyemiyoruz?

Söyleyebildiğimiz: model, gerçek metindeki sonraki token'lara ortalamada çok daha yüksek olasılık veriyor; belirsizliği neredeyse dokuz kavşaktan birine inmiş gibi azalmış durumda. Söyleyemediğimiz: modelin her işte daha iyi olduğu. Perplexity içsel bir ölçüdür; düşmesi, çeviri ya da soru cevaplama gibi dışsal görevlerde iyileşme *garanti etmez* ve iki modelin perplexity'si ancak aynı sözlükle — bugünkü karşılığıyla aynı tokenizer'la — hesaplanmışsa karşılaştırılabilir. Ölçmenin bu tuzaklarını 16. makalede ciddiyetle ele alacağız.

## Bu kadar basit bir hedef, bunca şeyi nasıl yapıyor?

Şimdi odadaki fil ile yüzleşelim. Bu makalede kurduğumuz hedef nerdeyse utandırıcı derecede basit: sıradaki token'a iyi olasılık ver. Nasıl oluyor da bu hedefle eğitilmiş sistemler çeviri yapıyor, soru cevaplıyor, kod yazıyor?

1\. makalede bu iddiayı asılı bırakmıştık; burada kapatıyoruz. Dönüm noktası, Tom Brown ve arkadaşlarının 2020'de yayımladığı GPT-3 çalışmasıdır. GPT-3'ün eğitim hedefi, bu makalede elle kurduğumuz bigram'ınkiyle *aynıdır*: sonraki token tahmini. Farklı olan ölçektir: 175 milyar parametre ve 300 milyar token'lık eğitim verisi. Çalışmanın gösterdiği şaşırtıcı şey şu: bu model, hiçbir ek eğitim almadan — parametrelerine tek bir gradyan güncellemesi yapılmadan — yalnızca modele verilen metnin içine birkaç örnek yazılarak yeni görevlere uyum sağlayabiliyordu. Buna few-shot öğrenme dendi; mekanizmasını 23. makalede ayrıntısıyla inceleyeceğiz. Sayılar hem etkileyici hem öğretici, o yüzden ikisini birden gösterelim: model iki basamaklı toplamada yüzde 100, üç basamaklıda yüzde 80,4 başarılıydı — ama dört basamaklıda yüzde 25,5'e, beş basamaklıda yüzde 9,3'e düşüyordu. Yani "aritmetik öğrendi" demek abartı olur; dar bir aralıkta aritmetiğe *benzeyen* bir davranış öğrendi demek dürüst olanı. Öte yandan ürettiği kısa haber metinlerini insanlar ancak yüzde 52 isabetle gerçeklerinden ayırt edebiliyordu — yazı tura yüzde 50'dir. Bir şeyin değiştiği açıktı: dil modeli, bir sistem bileşeni olmaktan çıkıp başlı başına bir ürün kategorisi hâline geldi. Bir uyarı: 2020'nin GPT-3'ü bir sohbet asistanı değildi; ham bir sonraki-token tahmincisiydi. Modeli asistana dönüştüren ayrı eğitim aşamalarını 11–13. makalelerde göreceğiz.

Peki bu yetenekler ölçek büyürken *aniden mi* beliriyor? Burada dürüst olmak zorundayız, çünkü alan bu soruda hâlâ bölünmüş durumda. Wei ve arkadaşlarının 2022 tarihli çalışması "beliren yetenekler" (emergent abilities) kavramını ortaya attı: küçük modellerde hiç görünmeyen, belli bir ölçekten sonra birden ortaya çıkan ve küçük modellerin gidişatından öngörülemeyen beceriler. Schaeffer, Miranda ve Koyejo'nun 2023'te NeurIPS'te en iyi makale ödülü alan cevabı ise soğuk duş etkisi yarattı: bu "sıçramaların" önemli bir kısmı, modelin kendisinden değil ölçüm cetvelinden kaynaklanıyor olabilir. Ya-hep-ya-hiç puanlayan katı ölçütler (cevabın tamamı doğruysa 1, değilse 0) pürüzsüz bir ilerlemeyi uçurum gibi gösterebilir; kısmî ilerlemeyi görebilen sürekli ölçütlerle bakınca aynı eğriler çoğu zaman düzgün bir rampaya dönüşür. İşin ilginci, Wei ve arkadaşlarının kendi ekleri de incelenen görevlerde modelin kaybının tam o "düz" görünen bölgede bile pürüzsüzce iyileştiğini kaydeder. Bugünkü dürüst özet şu: ölçekle birlikte gerçek bir şeyler değişiyor; ama bunun uçurum mu rampa mı göründüğü, kamerayı neye doğrulttuğuna bağlı. Ölçeğin ne satın aldığını 9. makalede, bu tartışmanın bugünkü hâlini 78. makalede derinlemesine ele alacağız.

Bu ilk beş makalenin kapanışı olarak şunu söyleyebiliriz: 1\. makalede "makine öğrenmesi tahmindir" demiştik; şimdi bu cümlenin dil için ne anlama geldiğini biliyorsun. Dil modeli bir kehanet makinesi değil, Shannon'un oyununu endüstriyel ölçekte oynayan bir olasılık dağılımıdır — ve bu basit oyunun ölçek büyüyünce nelere dönüştüğü, serinin geri kalanının ana gerilim hattıdır.

### Sırada ne var

Bu makalede embedding'leri Bengio'nun modeliyle tarihsel yerine oturttuk; ama 4. makaleden kalan bir pürüzü halının altına süpürdük: "yüz" kelimesi. "Yüzüme baktı", "Yüz lira verdim", "Denizde yüz!" — üç bağlam, üç apayrı anlam, ama şimdiye kadarki kurgumuzda tek bir sabit embedding vektörü. Sonraki token'ı iyi tahmin etmek istiyorsan, bir kelimenin temsili içinde bulunduğu cümleye göre değişebilmeli. Modelin bağlama bakıp "şu an hangi yüz?" diye tartım yapmasını sağlayan mekanizmanın adı dikkat (attention) — ve 6. makalenin konusu tam olarak bu.

## Kaynakça

- Shannon, C. E. (1948). *A Mathematical Theory of Communication*. Bell System Technical Journal. [Bağlantı](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf)
- Shannon, C. E. (1951). *Prediction and Entropy of Printed English*. Bell System Technical Journal. [Bağlantı](https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf)
- Jurafsky, D. & Martin, J. H. (2026). *Speech and Language Processing* (3. baskı taslağı, Bölüm 3: N-gram Language Models). Stanford University. [Bağlantı](https://web.stanford.edu/~jurafsky/slp3/3.pdf)
- Hayes, B. (2013). *First Links in the Markov Chain*. American Scientist, 101(2). [Bağlantı](https://www.americanscientist.org/article/first-links-in-the-markov-chain)
- Jelinek, F., Mercer, R. L., Bahl, L. R. & Baker, J. K. (1977). *Perplexity — a measure of the difficulty of speech recognition tasks*. Journal of the Acoustical Society of America, 62(S1). [Bağlantı](https://pubs.aip.org/asa/jasa/article/62/S1/S63/642598/Perplexity-a-measure-of-the-difficulty-of-speech)
- Bengio, Y., Ducharme, R., Vincent, P. & Jauvin, C. (2003). *A Neural Probabilistic Language Model*. Journal of Machine Learning Research, 3:1137–1155. [Bağlantı](https://www.jmlr.org/papers/v3/bengio03a.html)
- Liu, J., Min, S., Zettlemoyer, L., Choi, Y. & Hajishirzi, H. (2024). *Infini-gram: Scaling Unbounded n-gram Language Models to a Trillion Tokens*. COLM 2024. [Bağlantı](https://arxiv.org/abs/2401.17377)
- Mikolov, T., Chen, K., Corrado, G. & Dean, J. (2013). *Efficient Estimation of Word Representations in Vector Space*. arXiv:1301.3781. [Bağlantı](https://arxiv.org/abs/1301.3781)
- Mikolov, T., Karafiát, M., Burget, L., Černocký, J. & Khudanpur, S. (2010). *Recurrent neural network based language model*. INTERSPEECH 2010. [Bağlantı](https://www.isca-archive.org/interspeech_2010/mikolov10_interspeech.html)
- Brown, T. B. ve ark. (2020). *Language Models are Few-Shot Learners*. NeurIPS 2020. [Bağlantı](https://arxiv.org/abs/2005.14165)
- Wei, J. ve ark. (2022). *Emergent Abilities of Large Language Models*. Transactions on Machine Learning Research. [Bağlantı](https://arxiv.org/abs/2206.07682)
- Schaeffer, R., Miranda, B. & Koyejo, S. (2023). *Are Emergent Abilities of Large Language Models a Mirage?* NeurIPS 2023. [Bağlantı](https://arxiv.org/abs/2304.15004)
