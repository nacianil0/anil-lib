---
article_id: article_3ae3074c-428c-4557-bdfa-a8a6f773e61e
title: "Kapanış: Zayıf Nokta Haritası ve Son Hafta Planı"
slug: kapanis-zayif-nokta-haritasi-ve-son-hafta-plani
category: interview-method
level: advanced
reading_order: 41
summary: "Serinin son makalesi yeni konu anlatmıyor, elindekini ölçüyor. Önce ölçmenin kendisiyle ilgili kötü haber: tekrar tekrar okuyan grup kendini daha iyi hissediyor ama bir hafta sonra daha az hatırlıyor — akıcılık, bilgiyi değil tanıdıklığı ölçüyor. Sonra beş yetenek ile beş fazı kesiştiren boş bir zayıf nokta matrisi ve hücrelerin nasıl doldurulacağı. Ardından seri boyunca açık bıraktığım borçların provası: Boole sadeleştirmesinin devre karşılığını kapı sayarak, d-yollu heap'in dallanma çarpanı takasını üç d değeriyle ve alt problemi kısıtlama tekniğini artan alt dizi üzerinden ödüyorum. Kapanışta kaynağından hesaplanmış bir aralıklı tekrar takvimi, mülakat günü protokolü ve serinin ödeyemediği borçların dürüst listesi var."
tags:
  - oz-degerlendirme
  - arali-tekrar
  - mulakat-gunu
  - dallanma-carpani
  - seri-kapanisi
content_hash: sha256:240efa8db1236fe970253bc5c207a461b071c26ebf994b09ac207daa14599927
classification_version: 1
classification_batch: 13
---
## Kırk bir makalenin sonunda

Mantıkla başladık, ispatla devam ettik, veri yapılarının maliyetini saydık, algoritmaların doğruluğunu savunduk, işletim sistemlerinin kaynakları nasıl paylaştırdığını gördük, altındaki makineye ve veritabanına indik ve geçen makalede bunların nasıl anlatılacağını konuştuk.

Geriye tek bir iş kaldı: **elindekini ölçmek**. Bu makale yeni konu öğretmiyor. Bir harita veriyor, o haritayı nasıl dolduracağını söylüyor, seri boyunca bilinçli olarak açık bıraktığım birkaç borcu ödüyor ve kalan zamanı nasıl bölmen gerektiğini kaynağından hesaplanmış bir sayıyla öneriyor.

## Kötü haber: akıcılık bilgiyi ölçmüyor

Ölçmeye geçmeden önce ölçü aletinin bozuk olduğunu söylemem gerekiyor.

Roediger ve Karpicke'nin 2006 tarihli çalışmasında öğrenciler bir metni ya tekrar tekrar okudular ya da okuyup üzerine hatırlama testi yaptılar. Beş dakika sonraki testte tekrar okuyanlar öndeydi — yüzde 81'e yüzde 75. İki gün sonra sıra tersine döndü: test edilenler yüzde 68, tekrar okuyanlar yüzde 54. Bir hafta sonra yüzde 56'ya yüzde 42.

İkinci deney daha da keskin. Metni dört kez okuyan grup ile bir kez okuyup üç kez hatırlama testi yapan grup karşılaştırıldı. Birinci grup metni ortalama **14,2 kez**, ikinci grup **3,4 kez** okudu. Bir hafta sonraki testte dört kez okuyanlar yüzde 40, üç kez test edilenler yüzde 61 hatırladı. Unutma oranları da aynı yönde: sadece okuyan grup bildiğinin yüzde 52'sini, üç kez test edilen grup yüzde 14'ünü kaybetti.

Asıl mesele şu: çalışma sonunda öğrencilere "bir hafta sonra ne kadar hatırlayacaksın?" diye soruldu ve **en çok okuyan grup en yüksek güveni verdi** — sonra en az hatırlayan grup oldu. Yani kendini yoklarken hissettiğin "bunu biliyorum" duygusu, metni ne kadar tanıdık bulduğunun ölçüsüdür; bir hafta sonra ne söyleyebileceğinin ölçüsü değildir.

Bunun pratik sonucu tek cümle: aşağıdaki haritayı doldururken ölçütün **tanıdık gelmesi** olamaz. Tek geçerli ölçüt, metne bakmadan yüksek sesle söyleyebilmendir.

## Zayıf nokta haritası

Serinin ilk makalesinde beş yetenek tanımlanmıştı: anlatabilmek, çözebilmek, ispatlayabilmek, savunabilmek ve dayanabilmek. Beş faz da bunların üzerinden geçti. İkisini kesiştirince yirmi beş hücrelik bir harita çıkıyor.

![Beş satır ve beş sütundan oluşan boş bir tablo. Sütun başlıkları soldan sağa beş faz: Faz A matematik ve ispat, Faz B veri yapıları, Faz C algoritma analizi, Faz D işletim sistemleri, Faz E destek ve prova. Satır etiketleri yukarıdan aşağıya beş yetenek: anlat, çöz, ispatla, savun, dayan. Yirmi beş hücrenin hepsi boştur ve okurun kendi işaretini koyması için bırakılmıştır; hiçbirinde sayı ya da hazır değerlendirme yoktur. Savun satırındaki beş hücre vurgulu renkte, diğer yirmi hücre nötr renktedir. Tablonun altında iki not var: hücreleri sen doldurursun ve üç işaret yeter, tam anlattım, takıldım, hiç deneyemedim; ölçü tanıdık gelmesi değil, metne bakmadan altmış saniyede yüksek sesle söyleyebilmendir](assets/zayif-nokta-haritasi.svg "Şekil 1 — Beş yetenek ve beş fazın kesiştiği boş öz-değerlendirme haritası")

Şekil 1'deki hücrelerin hiçbirinde sayı yok ve olmayacak; onları sen dolduracaksın. Yöntem şu: her hücre için kendine bir soru sor, cevabı metne bakmadan yüksek sesle söyle, sonra hücreye üç işaretten birini koy — tam anlattım, takıldım, hiç deneyemedim.

Sorular her faz için farklı olmak zorunda değil, çünkü satırlar zaten soruyu belirliyor. **Anlat** satırında soru "bu fazın üç çekirdek kavramını birer cümleyle tanımla"dır. **Çöz** satırında "bu fazdan on dakikalık bir problem seç ve stratejiden başlayarak bitir"dir. **İspatla** satırında "bu fazın bir iddiasını kısa bir argümanla savun"dur — Faz A'da doğrudan ispat, Faz B'de bir değişmez, Faz C'de bir değişim argümanı, Faz D'de bir güvenlik özelliği. **Savun** satırında "bu fazdan iki seçenek al ve hangisini neden seçtiğini söyle"dir. **Dayan** satırında "verdiğin cevaba kendi itirazını kur ve genişlet"tir.

Savun satırı vurgulu, çünkü mülakatın ayırt edici yeri orası. İlk üç satır bilgiyi ölçer; dördüncü satır muhakemeyi ölçer ve iki adayı en çok orada ayrılırken görürsün.

Haritanın asıl işi bir puan üretmek değil, **çalışma sırasını belirlemektir**. Doldurduğunda göreceğin şey büyük ihtimalle şu olacak: bazı sütunlar baştan aşağı temiz, bazılarında alt iki satır boş. Kalan zamanını tamamen boş satırlara ayır; temiz sütunları yeniden okumak, yukarıdaki deneyde yüzde 40 alan grubun yaptığı şeydir.

> **Sesli anlat:** Haritayı doldurmadan önce tek bir hücreyi dene: Faz D'nin "savun" hücresi. Kilit ile semaforun arasındaki farkı ve hangisini neden seçeceğini altmış saniyede söyle.
>
> İyi bir cevabın omurgası: "Kilit karşılıklı dışlama içindir ve sahiplik taşır — alan serbest bırakır. Semafor bir sayaçtır ve sahiplik taşımaz; sinyalleşme için, yani bir olayın olduğunu başka bir iş parçacığına bildirmek için uygundur. Kritik kesim koruyorsam kilit kullanırım, çünkü sahiplik hata ayıklamayı ve kilitlenme analizini kolaylaştırır; üretici-tüketici gibi bir sayım problemim varsa semafor kullanırım. Koşul değişkeni ise beklemeyi kilitle birleştirir ve Mesa semantiğinde uyanmak koşulun sağlandığını garanti etmez, bu yüzden bekleme her zaman döngü içinde yapılır."

## Kalan borçların provası

Seri boyunca bazı kavramları adıyla anıp açmadım ve "ileride" dedim. Üçü kısa olduğu için burada ödüyorum, kalanları soru olarak bırakıyorum.

**Boole sadeleştirmesinin devre karşılığı.** Boole cebiri makalesinde sadeleştirme kurallarını kurmuş, organizasyon makalesinde birleşimsel devrelerin Boole ifadeleri olduğunu söylemiş ama bir devre örneği vermemiştim. İşte o örnek. `(A ∧ B) ∨ (A ∧ C)` ifadesini iki girişli kapılarla kurarsan iki VE kapısı ve bir VEYA kapısı gerekir; dağılma kuralıyla `A ∧ (B ∨ C)` yazarsan bir VEYA ve bir VE yeter. Üç kapı iki kapıya indi. Asıl kazanç geniş hâlde görünüyor: `(A ∧ B1) ∨ (A ∧ B2) ∨ … ∨ (A ∧ Bn)` ifadesi n tane VE kapısı artı n − 1 kapılık bir VEYA ağacı, yani **2n − 1 kapı** ister; sadeleştirilmiş hâli `A ∧ (B1 ∨ … ∨ Bn)` ise n − 1 kapılık aynı VEYA ağacı artı tek bir VE kapısı, yani **n kapı**. n = 8 için 15 kapı 8 kapıya iner ve derinlik ikisinde de dört seviyedir — kapı sayısı neredeyse yarıya inerken gecikme değişmez. Bu kapı sayıları benim kendi hesabımdır. Aynı sadeleştirme veritabanı makalesinde sorgu yüklemi olarak geri gelmişti: orada kazanılan şey kapı değil, taranan blok sayısıydı.

**d-yollu heap ve dallanma çarpanı takası.** Öncelik kuyruğu makalesinde "ikili olmak zorunda değil" demiş, örneğini bırakmıştım. Her düğümün d çocuğu olsun. Yükseklik `log_d n`'e iner, yani ekleme ve anahtar düşürme ucuzlar, çünkü ikisi de yukarı doğru tek bir yol izler ve seviye başına tek karşılaştırma yapar. Ama en küçüğü çıkarma pahalılaşır: aşağı süzülürken her seviyede **d çocuğun en küçüğünü bulmak** için d − 1 karşılaştırma gerekir, toplam `(d − 1) · log_d n`. Bir milyon elemanla sayalım: d = 2'de yükseklik 20, aşağı süzülme 20 karşılaştırma; d = 4'te yükseklik 10, aşağı süzülme 30; d = 16'da yükseklik 5, aşağı süzülme 75. Yukarı yönlü işlem 20'den 5'e inerken aşağı yönlü işlem 20'den 75'e çıktı. Bu sayılar benim hesabımdır. Karar kuralı buradan okunur: hangi işlemi kaç kez yapıyorsan onu ucuzlatan d'yi seç — Dijkstra'da anahtar düşürme sayısı kenar sayısı, çıkarma sayısı düğüm sayısı kadardır, dolayısıyla yoğun graflarda büyük d kazanır. Bu, serinin üç yerde daha gördüğü aynı takastır: B-ağacında d'yi blok boyutu seçer, önbellek hiyerarşisinde önbellek satırı seçer, B+-ağacında yaprak kapasitesi seçer.

**Alt problemi kısıtlama tekniği.** Dinamik programlama makalesinde "doğal alt problem işe yaramazsa kısıtla ya da genelleştir" demiş, örneğini bırakmıştım. En uzun artan alt dizi problemi kanonik örnektir. Doğal alt problem "ilk i elemanın en uzun artan alt dizisi"dir ve **birleşmez**: elde tuttuğun sayı, dizinin son elemanının ne olduğunu söylemez, dolayısıyla bir sonraki elemanı ekleyip ekleyemeyeceğini bilemezsin. Alt problemi kısıtla: "**i'inci elemanla biten** en uzun artan alt dizi". Şimdi bağıntı kendiliğinden çıkıyor — `L(i) = 1 + max{L(j) : j < i ve a[j] < a[i]}` — ve cevap bütün i'ler üzerinden maksimumdur. Daha zor görünen problem daha kolay çözülüyor, çünkü taşıdığı bilgi birleşmeye yetiyor. Bu, ispat makalesinde gördüğün **hipotezi güçlendirme** refleksinin ta kendisidir: eklemeli sıralamanın değişmezine permütasyon şartını eklerken de aynı şeyi yapmıştık.

Kalan borçlar soru biçiminde. Her birinin cevabı serinin ilgili makalesinde var; burada yalnızca soruyu ve omurganın ilk cümlesini veriyorum.

- **İndirgemenin yönü nedir ve ters çevirirsen ne kanıtlamış olursun?** Bilinen zor problemi yeni probleme indirgersin; ters yön yalnızca yeni problemin kolay olduğunu gösterir.
- **Güçlü bağlı bileşen nedir ve yönlü graflarda bağlılık neden ikiye ayrılır?** Karşılıklı erişilebilirlik bir denklik bağıntısıdır ve grafı parçalara ayırır; yönsüz graftaki tek bağlılık kavramı burada zayıf ve güçlü diye ikiye çatallanır.
- **Peterson'ın algoritması neden donanım desteği olmadan çalışır ve pratikte neden kullanılmaz?** İki bayrak ve bir sıra değişkeniyle karşılıklı dışlamayı yazılımda kurar; modern işlemcilerin bellek sıralaması yeniden düzenleme yaptığı için engel komutu olmadan bozulur.
- **Bölüt tablosu ile sayfa tablosu arasındaki fark nedir?** Bölütleme değişken boyutlu ve anlamlı bölgeler verir, dış parçalanma üretir; sayfalama sabit boyutlu bloklar verir, iç parçalanma üretir.
- **Monte Carlo ile Las Vegas algoritması arasındaki fark nedir?** Las Vegas'ta süre, Monte Carlo'da cevap rastgele değişkendir.
- **Güven aralığındaki yüzde 95 neyin olasılığıdır?** Rastgele olan aralıktır, parametre değil; yöntemin uzun vadeli kapsama oranıdır.
- **Üç C hangileridir ve hangisi işletim sisteminin sayfa önbelleğinde yoktur?** Zorunlu, kapasite ve çakışma ıskası; çakışma ıskası eşleme kısıtından doğar ve tam çağrışımlı bir önbellekte bulunmaz.
- **"REPEATABLE READ" adı neden yanıltıcıdır?** Standart bu düzeyde hayalet olgusunu yasaklamaz, dolayısıyla okumalar gerçekte yinelenebilir değildir.
- **Gerçek zamanlı bir sistemde öncelik tersine dönmesi neden sadece bir yavaşlama değildir?** Orada son teslim zamanı bir doğruluk şartıdır; kaçırılan süre yanlış cevaptır.

Bu listeden kaç tanesine tek cümlelik bir devam getirebiliyorsan, haritandaki "dayan" satırı o kadar doludur.

## Kalan zamanı bölmek

Aralık uzunluğu için elimizde ölçülmüş bir sayı var. Cepeda ve arkadaşlarının 2008 tarihli çalışmasında binden fazla katılımcı bir bilgi kümesini öğrendi, değişken bir ara sonra tekrar gördü ve bir yıla varan gecikmelerle sınandı. Bulgu şu: ara arttıkça başarı önce yükseliyor, sonra düşüyor; yani bir **en iyi ara** var ve bu ara hedef aralığa bağlı.

![Üstte dört satırlık bir tablo ve altında bir zaman çizgisi. Tablonun sütun başlıkları soldan sağa hedef aralık, ölçülen en iyi ara, ara değerli tahmin ve aralığın oranı. Satırlar sırasıyla şunları veriyor: yedi gün için bir gün, üç gün ve yüzde 43; otuz beş gün için on bir gün, sekiz gün ve yüzde 23; yetmiş gün için yirmi bir gün, on iki gün ve yüzde 17; üç yüz elli gün için yirmi bir gün, yirmi yedi gün ve yüzde 8. Otuz beş günlük satır vurgulu renktedir. Tablonun altında mülakat otuz beş gün sonraysa başlıklı yatay bir zaman çizgisi var. Çizgi üzerinde beş işaret duruyor: sıfırıncı günde ilk okuma, sekizinci günde ilk geri çağırma, yirminci günde ikinci tur, otuzuncu günde üçüncü tur ve otuz beşinci günde mülakat günü. Sıfır, sekiz ve otuz beşinci gün işaretleri dolu daire, yirmi ve otuzuncu gün işaretleri içi boş dairedir. En altta iki not var: tablodaki dört satır ve ara değerli tahminler kaynaktan alınmıştır; takvimin sekizinci günü tablodan gelir, içi boş daireyle gösterilen ikinci ve üçüncü tur kendi genişletmemdir](assets/aralikli-tekrar-takvimi.svg "Şekil 2 — Ölçülmüş en iyi aralar ve otuz beş günlük bir uygulama")

Şekil 2'deki tablo kaynağın sayılarını taşıyor. Yedi, 35, 70 ve 350 günlük hedef aralıklar için çalışmada sınanan aralar arasında en iyi sonucu sırasıyla 1, 11, 21 ve 21 gün verdi; verilere eğri uydurularak elde edilen daha hassas tahminler ise yaklaşık 3, 8, 12 ve 27 gün, yani hedef aralığın yüzde 43'ü, 23'ü, 17'si ve 8'i. Buradaki asıl bulgu oranın **sabit olmaması**: hedef uzadıkça en iyi ara mutlak olarak büyür ama oran olarak küçülür. Etkinin büyüklüğü de küçük değil; hiç ara vermemeye kıyasla hatırlama sırasıyla yüzde 10, 59, 111 ve 77 arttı.

Mülakatın otuz beş gün sonraysa tablodan okunacak satır ikincisidir: ilk okumadan yaklaşık **sekiz gün sonra** geri çağır. Şekil 2'nin alt yarısındaki takvim bunu uyguluyor; içi boş dairelerle gösterilen yirminci ve otuzuncu gün turları benim genişletmemdir, kaynakta iki çalışma olayı var.

Burada dürüst olmam gereken bir yer var. O çalışmadaki malzeme kısa olgulardı, bir işletim sistemi mekanizması değil; oran bir çıpadır, bir yasa değil. Ayrıca kaynak aralıklı **tekrarı** ölçüyor, aralıklı **geri çağırmayı** değil — ama ilk bölümdeki bulgu, aranın içini geri çağırmayla doldurmanın tekrar okumakla doldurmaktan iyi olduğunu söylüyor. İkisini birleştiren öneri şu: aralığı kaynaktan al, aranın içini hatırlama testiyle doldur.

Pratikte turun ne anlama geldiğini de tanımlayalım, yoksa "tekrar ettim" dersin ve metni bir kez daha okumuş olursun. Bir tur şudur: haritayı aç, takıldım ya da hiç deneyemedim işaretli hücreleri gez, her biri için soruyu metne bakmadan yüksek sesle cevapla, sonra metindeki omurgayla karşılaştır ve işareti güncelle. Tur, cevap üretmediysen tur değildir.

> **Sesli anlat:** Son turda ne yapacağını şimdi söyle. Hangi hücreleri gezeceksin, her birine kaç dakika ayıracaksın ve neyi bilerek dışarıda bırakacaksın?
>
> İyi bir cevabın omurgası: "Haritamdaki boş hücreleri gezerim, her birine üç dakika veririm ve cevabı yüksek sesle üretirim. Temiz sütunlara dokunmam, çünkü onları yeniden okumak bana yalnızca tanıdıklık kazandırır. Son iki günü yeni konuya ayırmam; son iki gün yalnızca daha önce ürettiğim cevapların kısa geri çağırmasıdır."

## Mülakat günü

Teknik hazırlık burada bitiyor. Geriye pratik birkaç şey kalıyor ve hiçbiri sürpriz değil.

Son gün yeni konu açma. Yeni bir kavram, hazırlanmış cevaplarının arasına yerleşmemiş bir parça olarak durur ve ilk takip sorusunda seni yavaşlatır. Onun yerine haritanın temiz hücrelerinden beş tanesini yüksek sesle söyle; amaç öğrenmek değil, sesini ve ritmini açmak.

Görüşme İngilizce yürüyecek. Serideki her makalenin sonundaki İngilizce karşılıklar listeleri tam olarak bunun içindi; son turda o listeleri tek tek geçmek, bir konuyu tekrar okumaktan daha çok işine yarar.

Soru gelince hemen başlama. İki saniye dur, soruyu kendi cümlelerinle tekrar et ve gerekiyorsa daralt: "n derken düğüm sayısını mı kastediyorsunuz?" Bu iki saniye bir tereddüt gibi görünmez; kapsamı sabitleyen bir hamle gibi görünür ve yanlış soruyu cevaplama riskini sıfırlar.

Takıldığında sessiz kalma, düşünceni sesli yürüt. Karşındaki senin cevabını olduğu kadar muhakemeni de dinliyor; sessizlik ona hiçbir bilgi vermez. Ve bilmediğin yere geldiğinde geçen makaledeki üçlüyü kullan: sınırı adlandır, komşu bildiğini ver, nasıl bakacağını söyle.

Sonunda soru sorma sırası sana gelebilir. Bu bir nezaket dakikası değil; araştırma yönü konuşmasının devamıdır. Bölümün gerçekten çalıştığı bir konu hakkında somut bir soru, hazırlandığının en ucuz kanıtıdır.

## Dürüst kapanış

Bu serinin borçları vardı ve onları saymadan bitirmek yanlış olur.

Seri yazılırken iki birincil kaynağa ulaşamamıştım: kilitlenmenin dört koşulunu ilk derleyen 1971 tarihli makale ve ACID kısaltmasının kaynağı sayılan 1983 tarihli derleme. İkisi de sonradan okundu ve ilgili makalelerin kaynakçasına birinci elden eklendi; ortaya çıkan tek anlamlı fark bir addır — özgün 1971 metni ikinci koşula *hold-and-wait* değil *wait for* der. Birkaç ders kitabına yalnızca bölüm düzeyinde atıf yaptım; alt bölüm başlıkları sonradan yayıncının kendi içindekiler belgelerinden doğrulandı, ama o kitapların gövdesi okunmadığı için atıf düzeyi bilinçli olarak olduğu gibi bırakıldı. Bazı konuları — Cook-Levin teoreminin ispatı, biçimsel diller, gerçek zamanlı çizelgeleme — bilinçli olarak kapsam dışı bıraktım; bunlar unutulmuş değil, seçilmemiş konulardır.

Ve en baştaki uyarıyı son kez tekrar edeyim: bu seri bir garanti değildir ve bir soru listesi hiç değildir. Üniversite mülakat için bir müfredat ilan etmiyor; kapsam, resmî mülakat tanımından ve Scientific Preparation derslerinden çıkarılmış bir tasarım kararıdır. Resmî süreç bilgisi değişebilir — mülakatın süresi, biçimi, hazırlık dersleri — bu yüzden karar vermeden önce bölümün güncel sayfalarını kendin kontrol et.

Geriye kalan şey ilk makalede söylediğimin aynısı: unuttuğun temelleri, savunabileceğin biçimde yeniden kurmak. Kırk bir makale bunun malzemesini verdi; savunmayı sen yapacaksın.

## Mülakatta nasıl görünür

Bu makalenin kendisi bir mülakat sorusu değil, ama içindeki üç borç fazlasıyla sorulabilir. d-yollu heap sorusunun takip zinciri şöyle ilerler: "Heap'in dallanma çarpanını artırırsan ne olur?" → "Hangi işlem ucuzlar, hangisi pahalılaşır?" → "O hâlde d'yi neye göre seçersin?" Üçüncü halkanın cevabı işlem karışımıdır ve aynı cevap B-ağacında blok boyutu, önbellekte satır uzunluğu olarak geri döner.

Beş tipik hata var. **Kendini tanıdıklıkla ölçmek** — bir hafta sonraki testte yüzde 40 alan grup en yüksek güveni veren gruptu. **Tekrar okumayı tekrar sanmak** — cevap üretmeyen bir tur, tur değildir. **Sadeleştirmeyi estetik bir kural sanmak** — Boole tarafında ölçüsü kapı sayısı, veritabanı tarafında taranan blok sayısıdır. **Dallanma çarpanını tek yönlü bir kazanç sanmak** — yükseklik düşerken seviye başına iş artar ve ikisi ters yönde hareket eder. **Son gün yeni konu açmak** — yerleşmemiş kavram, yerleşmiş cevapları da yavaşlatır.

İngilizce karşılıklar hazır olmalıdır — ilk beşi çalışma yöntemiyle, kalanı burada ödenen üç borçla ilgilidir: *retrieval practice*, *spaced repetition*, *interstudy gap*, *retention interval*, *fluency illusion*, *d-ary heap*, *branching factor*, *sift-up*, *sift-down*, *decrease-key*, *extract-min*, *Boolean simplification*, *combinational circuit*, *gate count*, *longest increasing subsequence*, *optimal substructure*, *strengthening the hypothesis*.

### Sırada ne var

Sıradaki makale yok; seri burada bitiyor. Sıradaki şey bir metin değil, bir tur: haritayı aç, boş hücreleri işaretle, en boş olanından başla ve cevabı yüksek sesle üret. Bu seride otuz dokuz kez "bunu nasıl anlatırsın?" diye sordum. Kırkıncı ve sonraki seferleri sen soracaksın.

## Kaynakça

- Roediger, H. L. & Karpicke, J. D. *Test-Enhanced Learning: Taking Memory Tests Improves Long-Term Retention*, Psychological Science, cilt 17, sayı 3, 2006, s. 249–255 — birinci deneyde beş dakika sonra tekrar okumanın test etmeyi geçmesi (yüzde 81'e 75), iki gün sonra sıranın tersine dönmesi (yüzde 68'e 54) ve bir hafta sonra farkın sürmesi (yüzde 56'ya 42); ikinci deneyde metni ortalama 14,2 kez okuyan grubun bir hafta sonra yüzde 40, 3,4 kez okuyup üç kez test edilen grubun yüzde 61 hatırlaması; orantılı unutma ölçüsünde sadece çalışan grubun yüzde 52, tek testli grubun yüzde 28 ve üç testli grubun yüzde 14 kaybetmesi; birinci fazın sonundaki ankette **sadece çalışan grubun bir hafta sonra daha iyi hatırlayacağına dair en yüksek güveni vermesi**. Bu makaledeki bütün yüzdeler doğrudan bu kaynaktan alınmıştır. [Bağlantı](https://doi.org/10.1111/j.1467-9280.2006.01693.x)
- Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T. & Pashler, H. *Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention*, Psychological Science, cilt 19, sayı 11, 2008, s. 1095–1102 — binden fazla katılımcıyla, 3,5 aya varan çalışma araları ve bir yıla varan sınama gecikmeleri; her gecikme için başarının önce artıp sonra azalması, yani bir en iyi aranın var olması; 7, 35, 70 ve 350 günlük hedef aralıklar için çalışmada sınananlar arasında en iyi araların sırasıyla 1, 11, 21 ve 21 gün çıkması ve kübik eğri uydurmayla elde edilen tahminlerin yaklaşık 3, 8, 12 ve 27 gün, yani hedef aralığın yüzde 43, 23, 17 ve 8'i olması; hiç ara vermemeye kıyasla hatırlamadaki artışın sırasıyla yüzde 10, 59, 111 ve 77 olması; en iyi aranın hedef aralık büyüdükçe mutlak olarak büyüyüp oran olarak küçülmesi. Otuz beş günlük takvimin sekizinci günü bu tablodan gelir; yirminci ve otuzuncu gün turları bu kaynakta yoktur ve benim genişletmemdir. [Bağlantı](https://doi.org/10.1111/j.1467-9280.2008.02209.x)
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham, D. T. *Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology*, Psychological Science in the Public Interest, cilt 14, sayı 1, 2013 — on çalışma tekniğinin değerlendirilmesi; pratik test etme ve aralıklı çalışmanın yüksek fayda, yeniden okuma ile vurgulamanın düşük fayda kategorisine konması. Serinin ilk makalesinde de bu kaynağa dayanılmıştı. [Bağlantı](https://journals.sagepub.com/doi/10.1177/1529100612453266)
- Boğaziçi Üniversitesi Bilgisayar Mühendisliği Bölümü. *M.S. Program* — bilimsel mülakatın resmî tanımı ve Scientific Preparation üçlüsü: CmpE220 Discrete Computational Structures, CmpE250 Data Structures, CmpE322 Operating Systems; derslerin en fazla iki ardışık dönemde ve en az 2.50 ortalamayla tamamlanması. Sayfa bu makale yazılırken yeniden doğrulandı; resmî süreç bilgisi değişebilir. [Bağlantı](https://cmpe.bogazici.edu.tr/graduate/ms-program/)
