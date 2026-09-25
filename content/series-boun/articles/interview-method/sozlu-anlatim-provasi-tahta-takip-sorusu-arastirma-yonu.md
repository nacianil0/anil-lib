---
article_id: article_e8a46a1f-b783-48d8-a8e9-59137ba6084f
title: "Sözlü Anlatım Provası: Tahta, Takip Sorusu, Araştırma Yönü"
slug: sozlu-anlatim-provasi-tahta-takip-sorusu-arastirma-yonu
category: interview-method
level: advanced
reading_order: 40
summary: "Otuz dokuz makale boyunca konu anlattık; bu makale anlatmanın kendisine geçiyor. Bir cevabın omurgası dört parçadır — iddia, koşul, mekanizma ve bozulma noktası — ve seride kurduğumuz bütün omurgalar aynı kalıptan çıkar. Maliyet ile doğruluk cevaplarının sabit sırasını tek yerde topluyor, takip zincirinin üç halkasını prova ediyor ve iyi cevabın sınır durumunu sorulmadan söylediğini gösteriyorum. Ardından tahta: altmış saniyede ne yazılır, ne yazılmaz ve dört bölge neye ayrılır. Kapanışta resmî tanımın teknik olmayan yarısı var — geçmiş akademik kayıt ve araştırma yönü — ve bilmediğini söylemenin iyi biçimi."
tags:
  - sozlu-anlatim
  - cevap-omurgasi
  - takip-sorusu
  - tahta-kullanimi
  - arastirma-yonu
content_hash: sha256:94851a2e8c38dfeece30966a14c943528406bffaa61ad7069863d44aecc34cfa
classification_version: 1
classification_batch: 13
---
## Konu bitti, sıra anlatmada

Otuz dokuz makale boyunca hep aynı şeyi yaptık: bir kavramı kurduk, maliyetini saydık, doğruluğunu savunduk ve nerede bozulduğunu gösterdik. Şimdi elinde epeyce malzeme var. Ama seni değerlendirecek olan şey yazılı bir sınav değil; bir odada, iki kişinin karşısında, on ya da on beş dakika içinde söylediğin cümleler.

Bu fark küçük değil. Aynı şeyi bilen iki adaydan biri "hash tablosu sabit zamanlıdır" der ve ikinci soruda geri çekilmek zorunda kalır; diğeri aynı bilgiyi öyle bir sırayla söyler ki ikinci soru zaten cevabın içindedir. İkisinin arasındaki fark bilgi değil, biçimdir.

Bu makale yeni bir konu öğretmiyor. Serinin her makalesinde kurduğumuz omurgaları tek bir kalıba indiriyor, o kalıbı prova ediyor ve tahtanın nasıl kullanıldığını gösteriyor. Sonunda da resmî tanımın teknik olmayan yarısına geliyoruz: geçmiş akademik kayıt ve araştırma yönü.

## Omurganın dört parçası

Serideki her "Sesli anlat" kutusunun altında bir omurga var ve kırk küsur omurganın hepsi aynı dört parçadan oluşuyor. Parçaları adlandıralım.

**Bir: iddia.** Sonucu tek cümlede söyle. Cümle kısa olsun ve bir şey iddia etsin — "bu konu ilginçtir" bir iddia değildir.

**İki: koşul.** İddianın hangi şartlarda doğru olduğunu söyle. Üç şey vardır burada: hangi **durum** (en kötü, ortalama, beklenen, amortize), hangi **model** (karşılaştırma modeli, RAM modeli, dış bellek modeli) ve hangi **varsayım** (düzgün dağılım, negatif olmayan ağırlıklar, önkesmeli zamanlayıcı). Koşulsuz iddia, mülakatçının ikinci sorusunu davet eden şeydir.

**Üç: mekanizma.** Maliyetin ya da doğruluğun nereden geldiğini bir cümlede söyle. "Logaritmiktir" yetmez; "her adımda arama aralığı yarıya iniyor" mekanizmadır.

**Dört: bozulma noktası.** İddianın nerede çöktüğünü söyle. Bunu sen söylersen bir sınır bilincidir; mülakatçı söylerse bir açıktır.

Şekil 1'in üst şeridi bu dört parçayı, alt şeridi ise bunun üzerine gelen takip zincirini gösteriyor.

![İki şeritten oluşan bir şema. Üst şeridin başında bir etiket var: altmış-doksan saniyelik omurga, dört parça. Altında soldan sağa dört kutu ve aralarında sağa bakan oklar duruyor. Birinci kutuda bir rakamı ve iddia yazıyor, altında tek cümlelik sonuç. İkinci kutuda iki rakamı ve koşul yazıyor, altında durum, model, varsayım. Üçüncü kutuda üç rakamı ve mekanizma yazıyor, altında maliyet nereden geliyor. Vurgulu renkte olan dördüncü kutuda dört rakamı ve bozulma yazıyor, altında iddia nerede çöker. Alt şeridin başında takip zinciri üç halka etiketi var ve altında yine soldan sağa üç kutu ile aralarında oklar duruyor: birinci halka tanım, altında bu tam olarak nedir; ikinci vurgu renginde olan ikinci halka sınır durumu, altında ya en kötü durumda; üçüncü halka takas, altında neden başkası değil. İkinci halkanın üstünden kesik çizgili bir ok çıkıyor, önce yukarı sonra sağa gidiyor ve üst şerideki dördüncü kutunun altına dayanıyor; okun yatay parçasının üstünde bir not var: ikinci halka cevabın içine taşınır. En altta bir satır daha: omurganın dördüncü parçası, zincirin ikinci halkasını cevabın içine taşır](assets/cevap-omurgasi-ve-takip-zinciri.svg "Şekil 1 — Cevabın dört parçalı omurgası ve üzerine binen üç halkalı takip zinciri")

Somutlaştıralım. Kötü cevap: "Hash tablosunda arama O(1)'dir." Bu cümle üç saniye sürer ve arkasından gelen soruyu garanti eder.

İyi cevap, aynı bilgiyle: "Hash tablosunda arama **ortalama durumda** sabit zamanlıdır — bu bir dağılım iddiasıdır, anahtarların kovalara düzgün ve bağımsız dağıldığını varsayar. Mekanizma şu: anahtardan bir indis hesaplanır ve o kovaya doğrudan gidilir, karşılaştırma zinciri yalnızca çakışanlar arasında yürür; beklenen zincir uzunluğu yük faktörüne eşittir. **En kötü durumda** bütün anahtarlar aynı kovaya düşer ve arama eleman sayısıyla orantılı hâle gelir; anahtarları düşman seçiyorsa bu teorik bir ihtimal değil, üretilebilir bir durumdur."

Yirmi beş saniye. Dört parça da yerinde. Ve dikkat et: bu cevap, tipik ikinci soruyu ("ya en kötü durumda?") kendi içinde zaten cevaplamış durumda.

> **Sesli anlat:** Serinin herhangi bir makalesinden bir kavram seç, metne bakma ve dört parçayı sırayla yüksek sesle söyle. Sonra kendini dinle: koşul parçasında **durum**, **model** ve **varsayım** kelimelerinin üçüne de karşılık gelen bir şey söyledin mi?
>
> İyi bir cevabın omurgası: "Önce iddiayı tek cümlede söylerim. Sonra koşulu üç eksende veririm: hangi durumdan bahsediyorum, hangi maliyet modelindeyim ve hangi varsayıma yaslanıyorum. Sonra mekanizmayı bir cümleyle veririm — maliyet ya da doğruluk tam olarak nereden geliyor. Sonunda iddianın nerede bozulduğunu ben söylerim; sınır durumunu mülakatçıya bıraktığım anda savunmadan sınava geçmiş olurum."

## İki sabit sıra: maliyet ve doğruluk

Mülakatta en sık gelen iki soru türünün cevabı ezberlenmez, **sırası** ezberlenir. Sırayı bilirsen konuyu bilmediğin anda bile boş konuşmazsın.

**Maliyet cevabının sırası dörttür.** Önce girdi boyutunu tanımla: "n nedir?" Grafta bu neredeyse her zaman iki sayıdır, düğüm ve kenar; sayılarda basamak sayısı mı değerin kendisi mi olduğu kritiktir. Sonra maliyeti nereden saydığını söyle: hangi döngü, kaç kez dönüyor, iç işlem kaç adım. Sonra sınıfı ve durumu ver: Θ mu O mu, en kötü mü ortalama mı. Sonunda bellek maliyetini ekle ve özyineleme derinliğini unutma.

Bir örnek üzerinde yürütelim. "Birleştirmeli sıralamanın maliyeti nedir?" — "n, sıralanacak eleman sayısı. Maliyeti özyineleme ağacından sayıyorum: her seviyede birleştirme işlemleri toplam n birim iş yapıyor ve ağacın yüksekliği log n, çünkü boyut her seviyede yarıya iniyor; yani toplam Θ(n log n) ve bu **her** durumda geçerli, en kötüsünde bile. Karşılaştırma modelindeyiz, dolayısıyla bu aynı zamanda genel alt sınıra dokunuyor. Bellek tarafı: birleştirme yerinde yapılamıyor, Θ(n) ek dizi gerekiyor; özyineleme yığını ayrıca Θ(log n)."

Dört parça, otuz saniye, ve "bellek?" sorusu artık gelmiyor çünkü cevaplandı.

**Doğruluk cevabının sırası üçtür.** Önce değişmezi tek cümlede ve **tam** söyle — yarım söylenmiş bir değişmez ispatı taşımaz. Sonra üç adımı yürü: başlatmada değişmezin ilk yinelemeden önce doğru olduğunu göster, korumada bir yinelemenin onu bozmadığını göster, sonuçlanmada değişmezin döngü bittiğindeki hâlinin istenen sonucu verdiğini göster. Sonunda sonlanmayı **ayrıca** ispatla: duruma doğal sayı değerli bir ölçü ata, her adımda kesin azaldığını ve altına inemeyeceği bir taban olduğunu söyle.

Bu ayrım tek başına bir sınav sorusudur. Döngü değişmezi yalnızca **kısmi doğruluk** verir: "bittiyse doğrudur" der, "biter" demez. Bu iki cümleyi ayrı ayrı söyleyen aday, mülakatçının o bölümdeki en ayırt edici sorusunu geçmiş olur.

## Takip zinciri ve sorulmadan verilen cevap

Serinin baştan beri kullandığı desen şu: tanım → sınır durumu → takas. Üç halkanın hiçbiri yeni bir konu değildir; üçü de aynı ilk cümlenin altını kazır.

Birinci halka tanımı yoklar: "Bunu tam olarak nasıl tanımlarsın?" İkinci halka sınıra gider: "Ya şu durumda? Girdiyi ben seçsem?" Üçüncü halka takasa geçer: "O hâlde neden her yerde bunu kullanmıyoruz?"

Dikkat et, bu üçlü bir sınav sırası değil, bir **düşünme sırası**. Prova ederken bunu tersten kullan: bir cevabı kurduktan sonra kendine ikinci ve üçüncü halkayı sor, cevaplarını bul ve ikinci halkanın cevabını **ilk cevabın içine taşı**. Omurganın dördüncü parçası tam olarak budur. Şekil 1'deki kesik çizgili ok bu taşımayı gösteriyor.

Üçüncü halka cevabın içine taşınmaz, çünkü taşınırsa cevap uzar ve altmış saniyeyi aşar. Onu hazır tut, sorulunca ver.

> **Sesli anlat:** Bir cevabını söyle, sonra kendi kendine "peki ya en kötü durumda?" diye sor ve cevabını genişlet. Genişletme sırasında yeni bir konu açmadığını, yalnızca ilk cümlenin koşulunu değiştirdiğini fark et.
>
> İyi bir cevabın omurgası: "Genişletirken konu değiştirmem, koşul değiştiririm. İlk cevabımda hangi durumu varsaydığımı söylemiştim; şimdi o varsayımı kaldırıp ne olduğunu anlatırım — hangi girdi bunu tetikler, maliyet hangi sınıfa çıkar ve pratikte bunu ne engelliyor. Üç cümle yeter; cevabı baştan kurmam gerekmez, çünkü ilk cevabımı zaten koşuluyla söylemiştim."

## Tahta: altmış saniyede ne yazılır

Görüşme bir ofiste geçiyor ve büyük ihtimalle elinin altında bir tahta ya da bir kâğıt olacak. Tahta bir sunum aracı değil, bir hafıza uzantısıdır: konuşurken taşıyamayacağın şeyi oraya bırakırsın.

Altmış saniyede yazabileceğin şey çok azdır. Bu yüzden ne yazacağına önceden karar vermelisin. Şekil 2 dört bölgelik bir düzen öneriyor ve bu düzen, yukarıdaki iki sabit sırayla birebir uyuşuyor.

![Üstünde tahta ya da kâğıt, altmış saniyede yazılabilecek kadarı etiketi bulunan dikdörtgen bir çerçeve; çerçeve bir dikey ve bir yatay çizgiyle dört bölgeye ayrılmış. Sol üst bölgede tanım ya da değişmez başlığı, altında tek cümle tam yazılır notu ve nötr renkli bir örnek kutusu var: soldaki bütün anahtarlar düğümden küçük, sağdakiler büyük. Sağ üst bölgede maliyet muhasebesi başlığı, altında n nedir kaç kez hangi sınıf notu ve vurgulu renkte bir örnek kutusu var: n eleman, her adımda yarıya iner, log n adım. Sol alt bölgede küçük örnek başlığı, altında gerçek sayılarla en fazla yedi eleman notu ve nötr renkli bir örnek kutusu var: yedi sayılık bir dizi ve elle izlenebilir notu. Sağ alt bölgede bozulma noktası başlığı, altında burayı sen yazarsın notu ve ikinci vurgu renginde bir örnek kutusu var: sıralı eklemede yükseklik n olur, log n değil. Çerçevenin altında üç kural satırı duruyor: konuşurken yaz, yazdıktan sonra sus ve karşındakinin okumasını bekle; kod yazma, en fazla üç satırlık dil bağımsız sözde kod yaz; yanlış yazdıysan silme, üstünü çiz ve yanına doğrusunu yazıp nedenini söyle](assets/tahta-dort-bolge.svg "Şekil 2 — Tahtanın dört bölgesi ve hangi bölgeye ne yazıldığı")

**Sol üst: tanım ya da değişmez.** Yanlış söylenmemesi gereken tek cümle burada durur. Ağaç sorusunda arama ağacı değişmezi, döngü sorusunda döngü değişmezi, olasılık sorusunda örneklem uzayı.

**Sağ üst: maliyet muhasebesi.** n'in ne olduğu, hangi döngünün kaç kez döndüğü ve çıkan sınıf. Üç satırı geçmez.

**Sol alt: küçük örnek.** Gerçek sayılarla, en fazla altı yedi eleman. Somut örnek iki iş yapar: seni yanlış genellemeden korur ve mülakatçıya ne düşündüğünü gösterir.

**Sağ alt: bozulma noktası.** Omurganın dördüncü parçası. Buraya bir şey yazmış olman, sınır durumunu düşündüğünün kanıtıdır.

Üç kural var. Birincisi: konuşurken yaz, yazdıktan sonra sus. Yazma sesi altında söylenen cümle duyulmaz. İkincisi: kod yazma. Tam bir fonksiyon yazmak iki dakika alır ve o iki dakikada sen konuşmuyorsundur; en fazla üç satırlık, dil bağımsız sözde kod yaz. Üçüncüsü: sildiğin şey konuşmadan kayboldu demektir; yanlış yazdıysan üstünü çizip yanına doğrusunu yaz ve neden değiştirdiğini söyle. Bir hatayı kendi bulup düzeltmek, hiç hata yapmamaktan daha güçlü bir sinyaldir.

## İki refleks: erişim deseni ve katman

Serinin son fazı iki tane çok pratik refleks bıraktı. İkisi de bir soru türünün **ilk cümlesini** sabitliyor.

**"Bu kod neden yavaş?" sorusunun ilk cevabı komut saymak değildir.** Bellek hiyerarşisi makalesinde gördük: aynı sayıda işlem yapan iki döngü arasında büyük farklar çıkabiliyor ve fark, kaç işlem yapıldığında değil verinin nasıl gezildiğindedir. Yani ilk cümle şu olmalı: "Önce erişim desenini tarif edeyim — veri sırayla mı geziliyor, sıçrayarak mı; bir önbellek satırına giren şey bir daha kullanılıyor mu." Ancak bundan sonra komut sayımına ve karmaşıklığa geçilir. Bu refleks, RAM modelinin "her erişim aynı fiyat" varsayımını bilerek terk ettiğini gösterir ve tek başına bir seviye işaretidir.

**Bellekle ilgili her cevap katmanını söyler.** C ve bellek makalesindeki ayrım şuydu: yığında yer ayıran ve serbest bırakan derleyicidir, heap bölgesinde programcıdır, sayfa düzeyinde çekirdektir. Bu yüzden "bellek nasıl yönetiliyor?" sorusuna cevap verirken ilk iş hangi katmanda konuştuğunu söylemektir. Aynı soruya üç doğru cevap vardır ve hangisini verdiğini söylemeyen aday, üçünü birbirine karıştırmış gibi görünür.

Bu iki refleksin ortak yanı şu: ikisi de cevabın **çerçevesini** cevabın kendisinden önce kuruyor. Mülakatta çerçeveyi kurmak, cevabın yarısıdır.

## Bilmediğini söylemenin iyi biçimi

Takip zinciri zaten senin zeminin nerede bittiğini bulmak için var. Zeminin bir yerde bitecek; bu bir başarısızlık değil, sürecin amacı. Önemli olan bittiği yerde ne yaptığın.

Kötü biçim uydurmaktır. Uydurulmuş bir cevap bir sonraki soruda çöker ve o andan itibaren doğru söylediğin şeyler de şüpheli hâle gelir.

İyi biçim üç parçalıdır. Birincisi sınırı adlandır: "Bunu çalışmadım" değil, "Bu noktada emin değilim — şurayı biliyorum, şuradan sonrasını bilmiyorum." İkincisi komşu bildiğini ver: sınırın hemen berisinde duran, gerçekten bildiğin şeyi söyle. Üçüncüsü yolu göster: "Olsaydım şuradan bakardım" ya da "Şu yapıyla benzer olmasını beklerdim, çünkü ikisinde de aynı takas var." Üçüncü parça bir tahmin değil, bir muhakeme önerisidir ve öyle sunulmalıdır.

Aynı disiplin sayılar için de geçerlidir. Bir oranı hatırlamıyorsan uydurma; mertebesini söyle ve mertebe olduğunu belirt. Seri boyunca kendi hesapladığım sayıları hep işaretledim; sen de aynısını yap.

## Geçmiş akademik kayıt ve araştırma yönü

Resmî tanım dört şey sayıyor: geçmiş akademik kayıt, araştırma yönü, beceri kümesi ve teknik bilgi. Serinin otuz dokuz makalesi son ikisi içindi. İlk ikisi senin hikâyen ve onları benim yerine yazamam — ama biçimleri aynı omurgadan çıkar.

**Geçmiş akademik kayıt.** Transkript zaten masada. Senin işin onu tekrar okumak değil, ona bir **okuma** önermek. Hangi ders seni değiştirdi ve neden; düşük bir not varsa ne oldu ve sonra ne yaptın. Savunma tonuna girme, açıklama tonunda kal: özür dilemek bir bilgi taşımaz, "o dönem şu oldu, şunu öğrendim ve sonraki dönem şu notu aldım" taşır. Uzun aradan sonra dönüyorsan bunu da açıkça söyle; bu serinin varlık nedeni zaten o.

**Araştırma yönü.** Burada beklenen şey kesinleşmiş bir tez konusu değil — bunu şimdi bilemezsin ve bilmiş gibi yapmak riskli, çünkü karşındaki büyük ihtimalle o alanın içinden biri. Beklenen şey **yönelim**: hangi problem sınıfı ilgini çekiyor, neden çekiyor ve hangi yöntemle çalışmak istersin. İki cümle yeterli. Birinci cümle problemi, ikinci cümle yaklaşımı versin.

Kalıp yine aynı: iddia, koşul, mekanizma, bozulma noktası. "Şu alanla ilgileniyorum" iddiadır; "çünkü lisansta şu dersi alırken şu problem dikkatimi çekti" koşuldur; "özellikle şu kısmı merak ediyorum" mekanizmadır; "ama bu alanın hangi kısmının bana uyacağını henüz bilmiyorum, o yüzden esneğim" bozulma noktasıdır. Son cümleyi söylemek seni zayıf göstermez; dürüst gösterir ve dürüstlük bu konuşmada ölçülen şeylerden biridir.

Bir uyarı: bölümün gerçekten çalıştığı alanlara bak ve kendi ilgi alanınla gerçekten örtüşen yeri söyle. Uydurulmuş bir örtüşme, ilk takip sorusunda ortaya çıkar — tıpkı uydurulmuş bir teknik cevap gibi.

> **Sesli anlat:** Araştırma yönünü iki cümlede anlat. Birinci cümlede problem sınıfı, ikinci cümlede yaklaşım olsun. Sonra üçüncü bir cümle ekle: henüz bilmediğin şey ne?
>
> İyi bir cevabın omurgası: "Şu problem sınıfı ilgimi çekiyor ve nedeni şu — lisansta ya da sonrasında şu noktada karşılaştım. Yaklaşım olarak şu tarafta çalışmak isterim. Henüz netleştirmediğim şey şu; bunu bir danışmanla konuşarak daraltmak isterim."

## Mülakatta nasıl görünür

Bu makalenin konusu anlatmanın kendisi olduğu için takip zinciri de anlatma üzerine kurulur: "Bunu bir cümlede özetler misin?" → "Peki hangi durumdan bahsediyorsun?" → "O varsayım bozulursa ne olur?" Üç halka, omurganın ikinci ve dördüncü parçasını yokluyor.

Altı tipik hata var. **Koşulsuz iddia kurmak** — "O(1)'dir", "en hızlısıdır", "daha iyidir"; hepsi ikinci soruyu davet eder. **Modelini söylememek** — "sıralama n log n'in altına inemez" eksiktir, "karşılaştırma modelinde" tamdır. **Sınır durumunu mülakatçıya bırakmak** — bozulma noktasını sen söylemezsen o soracaktır ve o zaman bu bir sınır bilinci değil, bir açık olur. **Tahtaya kod yazmak** — iki dakika gider, konuşma durur ve yazılan şey nadiren okunur. **İtiraz gelince cevabı baştan kurmak** — itiraz çoğunlukla koşulu hedefler; koşulu değiştir, konuyu değil. **Bilmediğini gizlemek** — takip zinciri zaten sınırı bulmak için var, sınırı kendin söylemek bir maliyet değil bir sinyaldir.

Bir de zaman ölçüsü: kendini kaydet ve süreni ölç. Altmış saniyeyi aşan bir omurga, omurga değil anlatımdır; otuz saniyenin altında kalan bir cevap ise büyük ihtimalle koşul parçasını atlamıştır.

Bu makale yeni bir terim kurmuyor, o yüzden aşağıdaki liste bir tekrar listesidir: omurganın koşul ve bozulma parçalarını İngilizce kurarken lazım olacak, seri boyunca yerleşmiş karşılıklar ile resmî tanımın kendi ifadeleri. *Worst case*, *average case*, *expected time*, *amortized*, *comparison model*, *external memory model*, *assumption*, *invariant*, *loop invariant*, *partial correctness*, *termination*, *trade-off*, *edge case*, *access pattern*, *research direction*, *past academic record*, *skillset*.

### Sırada ne var

Elinde artık bir kalıp var, ama kalıbın hangi konuda tuttuğunu hangi konuda tutmadığını bilmiyorsun. Serinin son makalesi bunu ölçmeye ayrılmış: beş yetenek ile beş fazı kesiştiren bir öz-değerlendirme matrisi, kaynağından hesaplanmış bir aralıklı tekrar takvimi, mülakat günü için pratik bir protokol ve seri boyunca açık bıraktığım borçların provası. Kırk bir, bu serideki son makale.

## Kaynakça

- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *M.S. Program* — bilimsel mülakatı en az iki öğretim üyesinin yürütmesi, her görüşmenin görüşmecinin ofisinde 10 ya da 15 dakika sürmesi, telekonferansın adaya değil görüşmeciye bağlı olması ve görüşmenin içeriğinin birebir tanımı: "The interview involves a discussion of the candidate's past academic record, research direction, skillset, and technical knowledge." Kabul kararının mülakat performansının yanında öğretim üyesi değerlendirmeleri, transkriptler ve referans mektuplarıyla birlikte verilmesi. Sayfa bu makale yazılırken yeniden doğrulandı; resmî süreç bilgisi değişebilir, karar vermeden önce güncel hâlini kendin kontrol et. [Bağlantı](https://cmpe.bogazici.edu.tr/graduate/ms-program/)
- Fiorella, L. & Mayer, R. E. *The relative benefits of learning by teaching and teaching expectancy*, Contemporary Educational Psychology, cilt 38, sayı 4, 2013, s. 281–288 — bir konuyu sonradan anlatma beklentisiyle çalışmanın kavrama testindeki ölçülebilir katkısı ve gerçekten anlatmanın kazanımı kalıcı kılması. Bu makaledeki "sesli prova" disiplininin dayanağıdır; buradaki hiçbir sayı bu kaynaktan alınmamıştır. [Bağlantı](https://doi.org/10.1016/j.cedpsych.2013.06.001)
