# "Sıfırdan Yüze: Yapay Zekâ" — Yol Haritası ve Kalıcı Öğrenme Defteri

> Bu dosya serinin yaşayan omurgasını (şu an 118 başlık, 14 faz), prerequisite grafını,
> yayımlanmış vaat defterini, kavram-tekrar defterini ve terim defterini tutar. Kurallar:
> `docs/seri/SOZLESME.md`. Durum takibi: `docs/seri/HANDOFF.md`. Yayımlanmamış başlıklar
> **taslaktır**; batch hazırlığında pedagojik gerekçeyle güncellenebilir (yayımlanmış makaleler
> ve yayımlanmış numaralı vaatler asla). UI listesi `content/series/roadmap.json` ile başlık
> düzeyinde senkron tutulur.

Son güncelleme: 2026-09-13 · Yayında: 1–114 (Batch 0 … Batch 27) · Sıradaki güvenli başlangıç: 115

## Serinin tezi

"Sıfırdan Yüze: Yapay Zekâ", sıfırdan başlayan okuyucuyu tek kesintisiz öğrenme zinciriyle
zamanla dört yetkinliğe taşıyan **tek** öğrenme yoludur:

1. **Akademik AI okuryazarlığı** — modern yapay zekânın mekanizmalarını, sınırlarını ve
   literatürünü birincil kaynak düzeyinde okuyabilmek;
2. **Matematiksel/teorik derinlik** — erken makalelerde sezgiyle kurulan kavramları ileride
   formal düzeyde yeniden kurabilmek (bilinçli formalizasyon, SOZLESME §3);
3. **Araştırma pratiği** — araştırma sorusu kurup deney tasarlayabilme, kanıt değerlendirebilme
   ve ölçüm disiplini;
4. **Ciddi model ve AI-systems mühendisliği** — modeli temelden kurarak anlamak ve eğitim/çıkarım
   sistemlerinin gerçek maliyet yapısını düşünebilmek.

Makale sayısı bir hedef değil, bu yetkinlik grafının sonucudur; "Sıfırdan Yüze" marka adıdır.
Her makale önceki kavramların üzerine biner; kritik kavramlar unutulmuş olabileceği varsayılarak
ileride kısa yeniden kurulumlarla geri çağrılır.

## Yayımlanmış vaatler (bağlayıcı koordinat defteri)

Yayımlanmış 1–34, metin içinde şu numaralara açık söz verdi. Bu koordinatlar **değiştirilemez**;
yol haritası hangi revizyondan geçerse geçsin bu numaralardaki konular korunur.

| Vaat | Nerede verildi | Bağlandığı numara | Durum |
|---|---|---|---|
| Post-training / asistanlaştırma aşamaları | 5, 7, 8, 10 ("Sırada ne var") | 11–13 | ödendi (Batch 2) |
| Veri temizlik hattının ayrıntısı | 8 | 14 | ödendi (Batch 2) |
| Tercih optimizasyonunun mekanizması | 11 | 13 | ödendi (Batch 2) |
| Tokenizer farkının yeteneklere yansıması | 8, 14 | 15 | ödendi (Batch 3) |
| Değerlendirme kümeleri neyi ölçer/ölçemez; perplexity karşılaştırma tuzakları | 5, 9 | 16 | ödendi (Batch 3) |
| Halüsinasyonun ciddiyetle ele alınması | 10 | 17 | ödendi (Batch 3) |
| Ezber ↔ genelleme gerilimi | 8 | 18 ve 72 | 18 ödendi (Batch 3); 72 ödendi (Batch 17) |
| Örnekle öğrenme (in-context learning) | 5, 22 | 23 | ödendi (Batch 5) |
| Sistem istemi, roller ve sohbet biçiminin kurulumu | 21 | 24 | ödendi (Batch 5) |
| Pencereyi eğitim uzunluğunun ötesine esnetme yolları | 21 | 25 | ödendi (Batch 5) |
| Anahtar-değer önbelleğinin maliyet yapısı | 21 | 26 | ödendi (Batch 5) |
| Kuantizasyonun mekanizması ve neyi bozduğu | 19, 20, 26 | 27 | ödendi (Batch 6) |
| Ara adımların gücü (istemi yeniden yazdırarak doğruluğu geri kazanma) | 15, 22 | 32 | ödendi (Batch 7) |
| Çıkarım anında hesap harcama ekseni | 9 | 33 | ödendi (Batch 7) |
| Sohbetler arası kalıcı bellek | 21 | 39 | ödendi (Batch 9) |
| Modelin bilgisinin yetmediği yer ve dış kaynağa bağlanma | 17, 19, 21, 25, 29 | 41 | ödendi (Batch 9) |
| İlkelere dayalı tercih etiketleri ve ölçeklenebilir denetim | 13 | 64 | ödendi (Batch 15; 61'in tekrarı da 64'ün gövdesinde adıyla kapatıldı) |
| Açık ağırlık yayımlamanın güvenlik tarafı | 20 | 61–70 | ödendi (Batch 16; 62: ince ayar saldırısı; 63: ağırlığa erişen saldırganın üç kapısı; 68: marjinal risk çerçevesi, unutturmanın geri kazanımı, yayımlama gradyanı ve yapısal erişim alternatifleri; 70: ağırlık güvenliği kademesi) |
| Açık kaynak tanımının düzenleyici çerçevedeki yeri | 20 | 69 | ödendi (Batch 16; muafiyetin metni ile tanımın listesi 69-Şekil 2'de karşılaştırıldı) |
| Kirliliğin değerlendirmeye etkisi ve ezberin benchmark'lara yansıması | 8, 16, 18, 31 | 72 | ödendi (Batch 17; 72'nin açılışı dört kaynak makaleyi adıyla anar: sızıntının dört yolu, kara kutuda tespit, ezberin üç etkeni ve üç türü, yeniden yazılan sınavda puan düşüşü, ölçütü koruma) |
| Doğrulayıcıların eğitimi ve modelin kendi cevabını kontrol etmesi | 33, 34 | 35 | ödendi (Batch 8) |
| Birden çok yol deneyip aralarında oy verme (öz-tutarlılık, arama) | 33 | 36 | ödendi (Batch 8) |
| Adımların tek tek ödüllendirilmesi (süreç denetimi) | 34 | 38 | ödendi (Batch 8) |
| Modelin içine bakmanın araçları ve "açıklama"nın sınırı | 6, 18 | 74–77 | **ödendi (Batch 18)**; 74: artık akış, devre, yamanın iki yönü, sadakat/tamlık/enazlık; 75: süperpozisyon ve seyrek sözlük, sözlüğün dört sınavı; 76: yön bulmanın dört yolu, müdahalenin dört biçimi, üç kapı; 77: girdi/bileşen/eğitim verisi atfı, taban sınavları, gerekçe sadakati |
| Beliren yetenekler tartışmasının açıklığı | 5, 9 | 78 | ödendi (Batch 18; 78'in açılışı 5'in "78. makalede derinlemesine ele alacağız" ve 9'un "nereye kadar açık olduğunu 78. makalede" cümlelerini adıyla anar) |
| Uzmanlar karışımı mimarisinin kurulumu | 20 | 85 | **ödendi (Batch 20)**; 85'in açılışı 20'nin cümlesini (671 milyar toplam ↔ 37 milyar çalışan parametre) adıyla anar |
| Karesel maliyeti ödemeyen alternatif mimariler | 7, 15 | 86 | **ödendi (Batch 20)**; 86'nın açılışı 7'nin "açık kapı" cümlesini ve 15'in bayt düzeyi mimari borcunu birlikte anar, ikisi de gövdede kapanır |
| Ölçümün disiplini: anlamlı fark, örneklem büyüklüğü, güven aralığı | 16, 22 | 101 | **ödendi (Batch 24)**; 101'in açılışı 16 ve 22'nin cümlelerini birebir alıntılar, gövdesi sıfır hipotezi ve p değerini kurar, eşleştirmenin ayırt edilebilir farkı 2,05 kat daralttığını kendi hesabıyla verir, oynaklık kaynaklarını sıralar ve çoklu karşılaştırma düzeltmesini ekler. **Bu kapanışla defterde açık numaralı koordinat kalmadı.** |
| İnce ayarın LoRA biçimi (numarasız işaretin karşılanması) | 11, 18 | 19 | ödendi (Batch 4) |
| Bağlam penceresinin sınırı ve anatomisi | 19 | 21 | ödendi (Batch 4) |

**Numarasız (bağlayıcı olmayan) ileri işaretler — Batch 2'de verildi.** Bunlar koordinat değil,
yalnızca "seride ileride" düzeyinde işaretlerdir; yol haritası değişirse yeri değişebilir:
hizalama sorununun kendisi (11 → 61), ince ayarın kendi işine uyarlama biçimi (11 → 19),
doğrulanabilir ödülle eğitim ve model üretimi tercih etiketleri (11 → 34, 64),
yardımseverlik ↔ zararsızlık gerilimi (11, 13 → 62), sohbet biçimi ve roller (12 → 24),
pekiştirmeli öğrenmenin biçimsel çerçevesi (13 → 37), KL ıraksamasının biçimsel kurulumu (13 → 94, **Batch 22'de ödendi**),
üretmek ↔ doğrulamak asimetrisi (13 → 35), dalkavukluk ve model karakteri (13 → 66),
kirliliğin değerlendirmeye etkisi (14 → 72), benchmark'ların ne ölçtüğü (14 → 16).

**Numarasız ileri işaretler — Batch 3'te verildi.** Değerlendiren modellerin güvenilirliği (16 → 73),
modelin kendi güveninin doğrulukla örtüşmesi yani kalibrasyon (16, 17 → 65), ince ayarın kendi işine
uyarlama biçimi (18 → 19).

**Numarasız ileri işaretler — Batch 4'te verildi.** İstem ile belgenin aynı diziye karışması ve
bu ayrımın kırılması (21 → güvenlik fazı, 61–70). Batch 4'ün geri kalan bütün ileri işaretleri
numaralıdır ve yukarıdaki tabloda kayıtlıdır.

**Numarasız ileri işaretler — Batch 5'te verildi.** İstem enjeksiyonunun tam kurulumu
(24 → güvenlik fazı, 61–70); kuantizasyonun mekanizması (26 → 27, tabloda zaten numaralı).
Batch 5 yeni bir numaralı koordinat **açmadı**: 23–26'nın bütün ileri göndermeleri ya bu batch'te
ödendi (24 → 26, 25 → 26) ya da defterde hâlihazırda kayıtlı bir koordinata eklendi (25 → 41).

**Numarasız ileri işaretler — Batch 6'da verildi.** Ajan döngüleri ve önek paylaşımı (28 → 51–60);
getirilen belgenin güvenilmez içerik olması (29 → 61–70); metnin nereden kesileceği kararı
(29 → getirme hattı, 41–50); akıl yürütmenin ne olduğu sorusu (30 → 31, sonraki makale olduğu için
numarasız bırakıldı). Batch 6 yeni bir numaralı koordinat **açmadı**; 29 yalnızca defterde
hâlihazırda kayıtlı olan 41 koordinatına dördüncü kaynak makale olarak eklendi.

**Numarasız ileri işaretler — Batch 7'de verildi.** Modelin kendi cevabını denetleme
asimetrisi (33, 34 → 35, tabloda numaralı); akıl yürütme yeteneğinin kötüye kullanımı ve
ağırlık yayımlamanın güvenlik tarafı (34 → 61–70); damıtmanın temel modelin sınırını aşması
(34 → 87). Batch 7 üç yeni numaralı koordinat açtı — 35, 36 ve 38 — ve ikisini (32, 33)
ödedi; 31'in kirlilik göndermesi defterde zaten kayıtlı olan 72 koordinatına dördüncü kaynak
makale olarak eklendi.

**Numarasız ileri işaretler — Batch 8'de verildi.** Aramanın ihtiyaç duyduğu iki bileşenin
(durum bilgisi ve doğrulama) araçlarla dışarıdan alınması (36 → ajan fazı, 51–60); bir sohbet
içinde biriken bilginin taşınması (38 → 39, sonraki makale olduğu için numarasız bırakıldı).
Batch 8 **yeni bir açık numaralı koordinat açmadı**: 35'in verdiği tek numaralı vaat (token
düzeyinde puanlamanın tam kurulumu → 38) aynı run içinde ödendi. Batch 8 üç koordinatı — 35,
36 ve 38 — kapattı; defterde açık kalan en yakın koordinat 39'dur.

**Numarasız ileri işaretler — Batch 9'da verildi.** Belleğin ajan bağlamındaki karşılığı ve
kalıcı belleğin ürün düzeyi (39 → 56 ve 112, ikisi de numarasız bırakıldı); getirilen belgenin
saldırı yüzeyi olması (41 → güvenlik fazı, 61–70); getirme hattının ölçülmesi ve kaynak sadakati
(41, 42 → 45); yaklaşık komşu araması ve dizin yapıları (42 → 43, sonraki makale olduğu için
numarasız bırakıldı). Batch 9 **yeni bir açık numaralı koordinat açmadı**; dört makalenin
metin içi çapraz göndermelerinin tamamı yayımlanmış makalelere (≤42) yapıldı. Batch 9 iki
koordinatı — 39 ve 41 — kapattı; defterde açık kalan en yakın koordinat 61–70 bandıdır ve
tekil olarak **64**'tür.

**Numarasız ileri işaretler — Batch 10'da verildi.** Kaynağın güvenilirliği ve bilginin tazeliği
(45 → 50, "ileride ayrı bir makalenin konusu"); eylemin kendisi, işlev çağrısının biçimi ve dönen
sonucun isteme girişi (46 → 47, "bir sonraki makale"); tarih/kaynak etiketiyle filtreli arama
(43 → 50, numarasız). Batch 10 **yeni bir numaralı koordinat açmadı ve kapatmadı**; dört
makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤46) yapıldı ve bu,
`grep` ile makale başına doğrulandı. Defterde açık kalan en yakın tekil koordinat hâlâ **64**'tür.

**Numarasız ileri işaretler — Batch 11'de verildi.** Ajanın tanımı ve kontrol döngüsü (47, 50 →
51, "serinin bir sonraki fazı" / "sonraki makale"); tarayıcıyı baştan sona yöneten ve kod yazan
sistemler (48 → 54, 55, "serinin bir sonraki fazının konusu"); sunucu adı çakışması, kurulumdan
sonra davranış değiştiren sunucu ve yalıtımdan kaçış (49 → güvenlik fazı, 58); güvenilirlik
etiketi ile kalibrasyonun tam kurulumu (50 → 65, numarasız). Batch 11 **yeni bir numaralı
koordinat açmadı ve kapatmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı
yayımlanmış makalelere (≤50) yapıldı ve `grep` ile makale başına doğrulandı. Defterde açık kalan
en yakın tekil koordinat hâlâ **64**'tür.

**Numarasız ileri işaretler — Batch 12'de verildi.** Kalıcı belleğin ajan bağlamındaki kurulumu
(51 → 56, "serinin ileride bir makalesinin işi"); ajan maliyetinin ölçüsü ve çağrı sayısıyla okunan puan
(51 → 60, "serinin ilerideki bir makalesinin konusu"); tartışmanın doğruluk için değil denetim için
kullanımı (53 → güvenlik fazı, 64, "serinin güvenlik fazının sorusu"); görüntüyü token'a çeviren
modellerin mekanizması (54 → çoklu modalite fazı, 81, "serinin çoklu modalite fazının konusu"); kod
yazan ajanın döngüsü (54 → 55, "bir sonraki makale"). Batch 12 **yeni bir numaralı koordinat açmadı
ve kapatmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤54)
yapıldı ve Python ile makale başına doğrulandı (metinde 54'ten büyük tek sayılar yüzde ve puan
değerleridir). Defterde açık kalan en yakın tekil koordinat hâlâ **64**'tür.

**Numarasız ileri işaretler — Batch 13'te verildi.** Ajanın görevler arasında ne hatırlayacağı
(55 → 56, "bir sonraki makale"); Faz 6'nın cetvellerinin tek soruya toplanması (56 → 57, "bir sonraki
makale"); kısayolun ajana dışarıdan gösterilmesi (57 → 58, "bir sonraki makale"); onayın ne zaman
isteneceği, insana devir ve denetim, kalibrasyonun devir ölçüsü olması (58 → 59, "bir sonraki
makale"; 16'nın kalibrasyon işareti 59'a taşındı); modelin kendi reddi ve gradyanla eniyilenmiş
saldırılar (58 → güvenlik fazı, 61–70; 63 numarası **açılmadı**, taslakta yazılan "63'te göreceğimiz"
yayından önce "güvenlik fazında" yapıldı). Batch 13 **yeni bir numaralı koordinat açmadı ve kapatmadı**;
dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤58) yapıldı ve
Python ile makale başına doğrulandı (58'den büyük tek sayılar yüzde, puan ve dolar değerleridir).
Defterde açık kalan en yakın tekil koordinat hâlâ **64**'tür.

**Numarasız ileri işaretler — Batch 14'te verildi.** Ajanın maliyet, gecikme ve güvenilirlik hesabı
(59 → 60, "bir sonraki makale"); hizalama sorununun kendisi (60 → 61, "serinin bir sonraki fazı");
kalibrasyonun tam kurulumu (59 → "ilerideki kalibrasyon makalesi", numarasız); reddetmenin öğretilmesi
(61 → 62, "bir sonraki makale"); aldatma ve durum farkındalığının ölçümü (61 → "serinin ilerideki bir
makalesi", numarasız); modelin içine bakmanın araçları (62 → "serinin ilerideki bir fazı", numarasız);
ilkelerin yazılması ve ölçeklenebilir denetim (62 → "serinin ilerideki bir makalesi", numarasız); jailbreak
ve kırmızı takım (62 → 63, "bir sonraki makale"). 61, 13'ün açtığı **64** koordinatını ("13'te 64'e
bıraktığımız ilkelere dayalı etiketler ve ölçeklenebilir denetim") yeniden andı, yeni koordinat açmadı. 62,
20'nin 61–70 bandına bıraktığı "açık ağırlık yayımlamanın güvenlik tarafı" vaadinin ilk taksidini ödedi
(ince ayar saldırısı; devamı 63, 68, 70). Batch 14 **yeni bir numaralı koordinat açmadı ve kapatmadı**;
dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤62) ya da defterdeki 64
koordinatına yapıldı ve Python ile makale başına doğrulandı (62'den büyük tek sayılar yüzde, puan, dolar ve
token değerleridir). Defterde açık kalan en yakın tekil koordinat hâlâ **64**'tür.

**Numarasız ileri işaretler — Batch 15'te verildi.** İlkelerin yazılması ve ölçeklenebilir denetim (63 → 64,
"bir sonraki makale o borcu ödüyor"); kötüye kullanımın ve yönetişimin açık ağırlık taksitleri (63 → "bu fazın
ileriki makaleleri", numarasız); kalibrasyonun ölçüsü ve tercih eğitiminin onu bozması (64 → 65, "bir sonraki
makale", üç kez); dalkavukluk ve karakterin nerede yazıldığı (65 → 66, "bir sonraki makale"); modelin içine
bakmanın araçları (65 → "serinin ilerideki bir fazı", numarasız); aldatmanın ölçüye çevrilmesi ve durum
farkındalığı (66 → 67, "bir sonraki makale", iki kez). 64, 13'ün açtığı ve 61'in yeniden andığı **64**
koordinatını gövdesinde adıyla ödedi ("İlkelerin nasıl yazıldığını ve denetimin nasıl ölçekleneceğini buraya,
64. makaleye bırakmıştı; 61 aynı borcu yeniden andı"); defterdeki satır "ödendi (Batch 15)" yapıldı. 63, 20'nin
61–70 bandına bıraktığı "açık ağırlık yayımlamanın güvenlik tarafı" vaadinin ikinci taksidini ödedi (ağırlığa
erişen saldırgan: üretim kuralı 0 → 81, ret yönünü silme, ince ayar; devamı 68, 70). Batch 15 **yeni bir
numaralı koordinat açmadı ve 64'ü kapattı**; dört makalenin metin içi numaralı göndermelerinin tamamı
yayımlanmış makalelere (≤ 66; 64–66 kendi kohortundaki önceki makalelere) yapıldı ve Python ile makale başına
doğrulandı (66'dan büyük tek sayılar yüzde, puan, örnek sayısı ve model boyutu değerleridir). Defterde açık
kalan en yakın tekil koordinat artık **69**'dur (20'nin "açık kaynak tanımının düzenleyici çerçevedeki yeri"
vaadi); 20'nin 61–70 bandındaki 68 ve 70 taksitleri de açıktır.

**Numarasız ileri işaretler — Batch 16'da verildi.** Modelin içine bakmanın araçları (67 → "serinin
ilerideki bir fazı", numarasız; sonda ve temsil müdahalesi yalnızca sonuç düzeyinde kullanıldı); hizalama
denetiminin kurumsal hâli (67 → "sonraki iki makale", numarasız); kötüye kullanımın ölçümü ve tabanı (67 → 68,
"bir sonraki makale"); tanım tartışmasının düzenleyici karşılığı (68 → 69, "bir sonraki makale"); sağlayıcı
çerçevelerinin içeriği (69 → "bir sonraki makale"); değerlendirme biliminin kendisi ve modelin içine bakmak
(70 → "serinin bir sonraki fazı", numarasız). 69, 20'nin açtığı **69 koordinatını** gövdesinde adıyla ödedi
("20'de bir borç bırakmıştık ve burada ödeniyor"); 68, 20'nin açık ağırlık vaadinin kötüye kullanım taksidini,
70 ise ağırlık güvenliği taksidini ödedi ve defterdeki iki satır da "ödendi (Batch 16)" yapıldı. Batch 16
**yeni bir numaralı koordinat açmadı ve iki koordinatı kapattı**; dört makalenin metin içi numaralı
göndermelerinin tamamı yayımlanmış makalelere (≤ 70) yapıldı ve Python ile makale başına doğrulandı (70'ten
büyük tek sayılar yüzde, puan, katılımcı sayısı ve eğri altı alan değerleridir; 69'un taslağındaki "70'in
konusu" yayından önce "bir sonraki makalenin konusu" yapıldı). Defterde açık kalan en yakın tekil koordinat
artık **72**'dir (8, 16, 18 ve 31'in kirlilik vaadi); 74–77, 78, 85, 86 ve 101 de açıktır.

**Numarasız ileri işaretler — Batch 17'de verildi.** Ölçümün istatistiği ve anlamlı fark (71 → 101, defterde
zaten numaralı; 71 yalnızca "ölçümün disiplini" düzeyinde bıraktı); beliren yeteneklerin cetvelle ilişkisi
(71, 74 → 78, defterde numaralı; 74 "78'e bıraktığımız tartışmanın içeriden görünüşü" dedi); süperpozisyon ve
seyrek sözlük (74 → 75, "bir sonraki makale", numarasız); temsile müdahale ve yönlendirme (73, 74 → 76,
numarasız); modelin gerekçesinin atfı (74 → 77, numarasız); şeffaflık ve belgeleme (71 → 80, numarasız);
hakemin kurumsal denetimi (73 → 80, numarasız); dinamik ölçüt ve canlı değerlendirme (72 → 79, numarasız).
**72 koordinatı ödendi** (72'nin açılışı 8, 16, 18 ve 31'i adıyla andı); **74–77 bandının ilk taksidi ödendi**
(74'ün açılışı 6 ve 18'i adıyla andı: "araçlar ve devreler burada, özellikler, müdahale ve atıf sonraki üç
makalede"). Batch 17 yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin
tamamı yayımlanmış makalelere (≤ 74) ya da defterde kayıtlı koordinatlara (78, 101) yapıldı ve Python ile makale
başına doğrulandı (74'ten büyük öteki sayılar yüzde ve puan değerleridir). Defterde açık kalan en yakın tekil
koordinat artık **78**'dir (5 ve 9'un beliren yetenekler vaadi); 75–77 (bandın kalan taksitleri), 85, 86 ve 101
de açıktır.

**Numarasız ileri işaretler — Batch 18'de verildi.** Sözlüğün seyreklik varsayımı ve parça kimliği (75 → "bir sonraki makale", numarasız); atfın üç sorusu ve gerekçe sadakati (76 → "bir sonraki makale", numarasız); dağılım kayması ve sağlamlık (78 → "bir sonraki makale", numarasız; 79 numarası **açılmadı**). **74–77 bandı kapandı** (77'nin kapanışı "74'te açılan bandın borcu kapanıyor" diyerek 6 ve 18'in vaadini adıyla kapatır) ve **78 koordinatı ödendi** (78'in açılışı 5 ile 9'un cümlelerini alıntılar). Batch 18 yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 78) yapıldı ve Python ile makale başına doğrulandı (78'den büyük öteki sayılar yüzde, puan, eğri altı alanı ve düzenleme sayısı değerleridir; 78'in kendi numarasına tek göndermesi 5'in vaadinin alıntısıdır ve SOZLESME §5'in izin verdiği biçimdir). Defterde açık kalan en yakın tekil koordinat artık **85**'tir (20'nin uzmanlar karışımı vaadi); 86 ve 101 de açıktır.

**Numarasız ileri işaretler — Batch 19'da verildi.** Koşulların nereye yazıldığı (79 → 80, "bir sonraki makale"); pikselleri
okuyan modellerin mekanizması (80 → 81, "serinin bir sonraki fazı" / "bir sonraki makale"); modalitenin sese taşınması
(81 → 82, "bir sonraki makale"); gürültüden geri temizleyen üretim modelleri (82 → 83, "bir sonraki makale"; 83 numarası
**açılmadı**). **Batch 19 dört numarasız işareti ödedi:** 78'in "bir sonraki makale" devri (dağılım kayması ve sağlamlık)
79'da; 72'nin dinamik ölçüt ve işlevsel ölçüt işareti 79'da (GSM-Symbolic'in şablonlu üretimi 72'nin işlevsel ölçütüne
adıyla bağlandı); 71'in şeffaflık ve belgeleme ile 73'ün hakemin kurumsal denetimi işaretleri 80'de; ve **54'ün "görüntüyü
token'a çeviren modeller, serinin çoklu modalite fazının konusu" işareti 81'de** — 81'in açılışı 54'ün cümlesini alıntılar.
Batch 19 yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış
makalelere (≤ 82; 80–82 kendi kohortundaki önceki makalelere) yapıldı ve Python ile makale başına doğrulandı (kendi
numarasına gönderme yok; 82'den büyük öteki sayılar yüzde, piksel, kilobit ve milisaniye değerleridir). Defterde açık kalan
en yakın tekil koordinat hâlâ **85**'tir (20'nin uzmanlar karışımı vaadi); 86 ve 101 de açıktır.

**Numarasız ileri işaretler — Batch 20'de verildi.** Görüntüyü de sesi de tek bir sözlüğe indirip her şeyi tek dizi
modeline yaptırma sorusu (83 → 84, "bir sonraki makale"); parametre sayısı ile token başına hesabı ayırma sorusu
(84 → 85, "bir sonraki makale"; 20'nin koordinatı adıyla anılarak); dikkatin karesel maliyetinin nerede ödendiği
(85 → 86, "bir sonraki makale"; 7'nin açık kapısı adıyla anılarak); ve büyük bir modelin bildiklerini küçük bir
modele aktarma (86 → 87, "bir sonraki makale"). **Batch 20 üç borcu birden kapattı:** 82'nin numarasız işareti
("gürültüden başlayıp geri temizleyen üretim modelleri") 83'te; **20'nin uzmanlar karışımı koordinatı 85'te**;
**7 ve 15'in karesel maliyet koordinatı 86'da**. Ayrıca devrolan planlı tekrar — 30'un kısıtlı üretimi — 84'te
tahsil edildi ve orada mimari bir zorunluluk olarak yeniden kuruldu. Batch 20 yeni bir numaralı koordinat **açmadı**;
dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 86) yapıldı ve Python ile makale
başına doğrulandı (kendi numarasına gönderme yok; 86'dan büyük öteki sayılar çözünürlük, doğruluk ve FID
değerleridir). Defterde açık kalan **tek** koordinat artık **101**'dir (16 ve 22'nin ölçüm disiplini vaadi);
numarasız işaretler 51 → 111 ve 49/53 → 115 olarak duruyor. Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku
**hâlâ tahsil edilmedi** ve 101 önerilmeye devam ediyor.

**Numarasız ileri işaretler — Batch 21'de verildi.** Küçük modelin nereye konduğu (87 → 88, "bir sonraki makale");
bir yongayı hızlandırıcı yapan şey (88 → 89, "bir sonraki makale"); bir çipin yaptığı işin elektrik karşılığı
(89 → 90, "bir sonraki makale"); ve erken makalelerde sezgiyle kurulan kavramların biçimsel yeniden kurulumu
(90 → Faz 10, "serinin bir sonraki fazı"; 91 numarası **açılmadı**). **Batch 21 bir numarasız işareti ödedi:**
34'ün Batch 7'de verdiği "damıtmanın temel modelin sınırını aşması" işareti 87'de — 87'nin "34'ün sorusu"
bölümü 34'ün kapsama ölçümünü adıyla anar ve karşı örneğin kendi ölçümünü verir. Ayrıca 86'nın "bir sonraki
makale" devri 87'de karşılandı. Batch 21 yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi
numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 89) yapıldı ve Python ile makale başına doğrulandı
(kendi numarasına gönderme yok; 90'dan büyük öteki sayılar yüzde, puan, watt ve token değerleridir). Defterde
açık kalan **tek** koordinat hâlâ **101**'dir (16 ve 22'nin ölçüm disiplini vaadi); numarasız işaretler
51 → 111 ve 49/53 → 115 olarak duruyor. Devrolan planlı tekrar: 33/40'ın pass@k ile görev ufku **hâlâ tahsil
edilmedi**; 101 önerilmeye devam ediyor.

**Numarasız ileri işaretler — Batch 22'de verildi.** Bir matrisi sıkıştırmanın ne demek olduğu (91 → 92, "bir sonraki
makale"); modelin çıktısı olan dağılımın biçimsel kurulumu (92 → 93, "bir sonraki makale"); kaybın biriminin ne saydığı
(93 → 94, "bir sonraki makale"); bilgi miktarının beklenen değere yakınlığı ölçüsünün adı (93 → 94, "bir sonraki makale",
Meister ve ark.'nın tipiklik ölçütü); yanlılık ile oynaklığın ayrımı (93 → "bir sonraki faz", numarasız — 101 defterde
zaten kayıtlı); ve kaybı gerçekten azaltan mekanizma (94 → 95, "bir sonraki makale"; 95 numarası **açılmadı**).
**Batch 22 bir numarasız işareti ödedi:** 13'ün Batch 2'de verdiği "KL ıraksamasının biçimsel kurulumu" işareti 94'te —
94'ün açılışı 13'ün "biçimsel kurulumu seride ileride yapılacak" cümlesini alıntılar ve gövdesinde KL'yi çapraz entropi
eksi entropi olarak kurar, sonra 13'teki cezanın nat cinsinden bir bütçe olduğunu gösterir. Batch 22 yeni bir numaralı
koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 93) yapıldı ve
`refcheck` ile makale başına doğrulandı (kendi numarasına gönderme yok; 94'ten büyük öteki sayılar yüzde, tekil değer,
perplexity ve deneme sayısı değerleridir). Defterde açık kalan **tek** koordinat hâlâ **101**'dir (16 ve 22'nin ölçüm
disiplini vaadi); numarasız işaretler 51 → 111 ve 49/53 → 115 olarak duruyor. Devrolan planlı tekrar: 33/40'ın pass@k ile
görev ufku **hâlâ tahsil edilmedi**; pass@k'nın **olasılıksal kimliği** 93'te bilinçli formalizasyon olarak kuruldu
(SOZLESME §3: tekrar sayılmaz), fakat 40'ın görev ufkuyla eşleştirilmiş planlı tekrarı 101'e devrediyor.

**Numarasız ileri işaretler — Batch 23'te verildi.** Eğitim kaybının umursanan sayı olmaması (95 → 96, "bir sonraki
makale"); yanlılık, oynaklık ve varsayımın sinir ağlarına özgü olmaması (96 → 97, "bir sonraki makale"); koşulu
okumanın literatürün kendisine uygulanması (97 → "serinin bir sonraki fazı", 98 numarası **açılmadı**); ve deneyin
tasarlandığı taraf (98 → 99, "bir sonraki makale"). İstatistiksel anlamlılık, güven aralığı ve örneklem büyüklüğü
98'de **bilerek yapılmadı** ve "serinin ilerideki bir makalesinin işi" denerek numarasız bırakıldı; defterdeki 101
koordinatı bunu zaten karşılıyor. Batch 23 **yeni bir numaralı koordinat açmadı ve kapatmadı**; dört makalenin metin
içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 97; 96–98 kendi kohortundaki önceki makalelere) yapıldı
ve Python ile makale başına doğrulandı (kendi numarasına gönderme yok; 97'den büyük öteki sayılar koşul sayısı,
doğruluk yüzdesi ve veri kümesi sayısı değerleridir). Defterde açık kalan **tek** koordinat hâlâ **101**'dir (16 ve
22'nin ölçüm disiplini vaadi); numarasız işaretler 51 → 111 ve 49/53 → 115 olarak duruyor. Devrolan planlı tekrar:
33/40'ın pass@k ile görev ufku **hâlâ tahsil edilmedi**; 95'te gradyanın, 96'da genellemenin biçimsel kurulumu
yapıldı ama pass@k ile görev ufkunun eşleştirilmiş tekrarı 101'e devrediyor.

**Numarasız ileri işaretler — Batch 24'te verildi.** Haritanın çizilmesi (99 → 100, "bir sonraki makale");
anlamlı farkın biçimsel kurulumu (100 → 101, "bir sonraki makale"; defterde zaten kayıtlı koordinat adıyla anıldı);
aynı sonucu başka bir elde elde etmek (101 → 102, "bir sonraki makale"); ve 6 ile 7'nin mimarisini bütün
parçalarıyla elle kurmak (102 → "serinin bir sonraki fazı"; 100 aynı boşluğu "haritanın ilerisinde duran kasıtlı
bir boşluk" olarak adlandırdı — **103 numarası açılmadı**). **Batch 24 üç borcu birden kapattı:** (a) **101
koordinatı ödendi** — 16 ve 22'nin ölçüm disiplini vaadi, defterdeki son açık koordinat; (b) **33/40'ın pass@k
ile görev ufku planlı tekrarı dört batch'lik devirden sonra 101'de tahsil edildi** — pass@k'nın yerine koyma ile
hesaplandığında yanlı bir tahminci olduğu gösterildi (0,67232 ↔ 0,59359) ve 40'ın 166–240 günlük güven aralığının
nereden geldiği açıklandı; (c) **93'ün "bir sonraki faz" işareti (yanlılık ↔ oynaklık ayrımı) 101'de ödendi** —
ayrımın ölçüm istatistiğindeki karşılığı, yanlılığın tekrarla sönmemesi üzerinden kuruldu. Ayrıca 98'in 99'a
bıraktığı numarasız devir (deneyin tasarlandığı taraf) 99'da karşılandı. Batch 24 yeni bir numaralı koordinat
**açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 99; 100–102 kendi
kohortundaki önceki makalelere) ya da defterdeki 101 koordinatına yapıldı ve Python ile makale başına doğrulandı
(101'in kendi numarasına iki göndermesi 16 ve 22'nin vaatlerinin alıntısıdır ve SOZLESME §5'in izin verdiği
biçimdir; 102'den büyük öteki sayılar yüzde, bildiri sayısı ve yıl değerleridir). **Defterde açık numaralı
koordinat kalmadı;** numarasız işaretler 51 → 111 ve 49/53 → 115 olarak duruyor ve devrolan planlı tekrar yok.

**Numarasız ileri işaretler — Batch 25'te verildi** (defter kaydı bu run'da tamamlandı). 103'ün ağırlıkları
döngüye yazdırma devri (→ 104, "bir sonraki makale"); 104'ün eğitilen modeli asistanlaştırma devri (→ 105,
"bir sonraki makale"); 105'in dizüstü bilgisayardan veri merkezine devri (→ 106, "bir sonraki makale"); ve
106'nın dört bölme eksenini adıyla sorması (→ 107, "bir sonraki makale"). **Batch 25 iki numarasız işareti
ödedi:** 100'ün "kasıtlı boşluk" ve 102'nin "serinin bir sonraki fazı" cümleleri 103'te karşılandı. Batch 25
yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış
makalelere (≤ 106) yapıldı ve mekanik olarak tarandı.

**Numarasız ileri işaretler — Batch 26'da verildi.** Kaybın kalan yarısının kartın içinde olması
(107 → 108, "bir sonraki makale"); koşunun uzunluğu ve arızalar (108 → 109, "bir sonraki makale"); modelin
neyi öğrenmiş olduğu sorusu (109 → 110, "bir sonraki makale"); ve modeli bir gövdeye bağlamak
(110 → 111, "bir sonraki makale"). **Batch 26 iki borcu kapattı:** (a) **8'in veri/model paralelliği
kurulum borcu 107'de ödendi** — doksan dokuz makale aralıklı, serinin en uzun ertelemelerinden biri;
(b) **1'in numarasız işareti ("tarafların gerekçeleriyle karşılaşacaksın") 110'da kısmen ödendi** — tartışma
sürdürülmedi, ölçülebilir hâline çevrildi ve kalanı 116–117'ye bırakıldı. Batch 26 yeni bir numaralı
koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere
(≤ 106; 108–110 kendi kohortundaki önceki makalelere değil, yalnızca yayımlanmışlara) yapıldı ve makale
başına mekanik olarak tarandı — kendi numarasına gönderme yok, numaralı ileri gönderme yok.
**Defterde açık numaralı koordinat yoktur.** Numarasız işaretler: 51 → 111 ve 49/53 → 115 olarak duruyor;
110'un "gövdeye bağlamak" işareti de 111'e bakıyor. **Devrolan planlı tekrar yok.**

**Numarasız ileri işaretler — Batch 27'de verildi.** Modeli bir ürün içinde güncel tutma sorusu (111 → 112, "bir sonraki makale"); bilginin henüz olmadığı yer (112 → 113, "bir sonraki makale"); ve zincirin üretim tarafından kullanım tarafına geçmesi (113 → 114 ve 114 → 115, "bir sonraki makale"). **Batch 27 üç işareti ödedi:** (a) **51'in eylem arayüzü işareti 111'de ödendi** — ALFWorld'ün dokuz şablonu tekrarlanmadan, gerçek bir kolda 256 kutu, sekiz tam sayı ve saniyede bir ile üç karar olarak; (b) **110'un "modeli bir gövdeye bağlamak" devri 111'de** karşılandı; (c) **39 ve 56'nın kalıcı bellek işareti 112'de ürün düzeyine taşındı** — üç aşama yeniden kurulmadı, "ağırlığa mı bağlama mı" kararına çevrildi ve kişiselleştirmede getirmenin ölçülmüş getirisiyle (%23,5 / %12,2) kapatıldı. Batch 27 yeni bir numaralı koordinat **açmadı**; dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤ 113; 112–114 kendi kohortundaki önceki makalelere) yapıldı ve makale başına mekanik olarak tarandı — kendi numarasına gönderme yok, numaralı ileri gönderme yok. **Defterde açık numaralı koordinat yoktur.** Devrolan numarasız işaret: **49/53 → 115**. **Devrolan planlı tekrar yok.**

## Fazlar ve başlıklar

### Faz 1 — Sıfırdan Modele: Öğrenmenin Temelleri (1–10)

1. **Tahmin Makinesi: Yapay Zekâya İlk Bakış** — kural yazmak vs veriden öğrenmek; model kavramı; ML=tahmin çerçevesi. `[yayında]`
2. **Veriden Öğrenmek: Model, Parametre ve Kayıp** — parametre, kayıp, gradyan inişi, genelleme. `[yayında]`
3. **Sinir Ağları: Katmanların İçinde Ne Oluyor?** — nöron, aktivasyon, derinlik, temsil öğrenimi, backprop. `[yayında]`
4. **Dili Sayılara Çevirmek: Token ve Embedding** — tokenizasyon (BPE), dağılımsal anlambilim, vektör uzayı. `[yayında]`
5. **Sonraki Kelimeyi Tahmin Etmek: Dil Modelinin Doğuşu** — dil modelleme hedefi, n-gram→nöral DM, perplexity. `[yayında]`
6. **Dikkat Mekanizması: Bağlamı Tartmayı Öğrenmek** — statik embedding'in yetmezliği; query/key/value sezgisi. `[yayında]`
7. **Transformer: Modern Dil Modellerinin Mimarisi** — katman yığını, çok başlı dikkat, paralellik. `[yayında]`
8. **Ön Eğitim: İnternet Ölçeğinde Sonraki Token** — veri, hedef, eğitim döngüsü büyük ölçekte. `[yayında]`
9. **Ölçek Yasaları: Neden "Daha Büyük" Çoğu Zaman "Daha İyi"?** — scaling laws, compute-optimal eğitim. `[yayında]`
10. **Metin Üretimi: Örnekleme, Sıcaklık ve Olasılıklar** — decoding stratejileri; determinizm ve çeşitlilik. `[yayında]`

### Faz 2 — Modeli Biçimlendirmek: Eğitimden Asistana (11–20)

11. **Ham Modelden Asistana: Post-Training Haritası** — base model vs asistan; post-training aşamaları. `[yayında]`
12. **Talimatla Eğitim: Supervised Fine-Tuning** — talimat verisi, davranış şekillendirme. `[yayında]`
13. **İnsan Tercihlerinden Öğrenmek: RLHF ve Ötesi** — tercih verisi, ödül modeli, DPO ailesi. `[yayında]`
14. **Eğitim Verisi: Toplama, Temizlik, Karışım ve Tekrar** — verinin kalitesi ve etkisi. `[yayında]`
15. **Tokenizer'ın Gücü ve Tuzağı** — tokenizasyonun yeteneklere etkisi; Türkçe gibi eklemeli diller. `[yayında]`
16. **Değerlendirme 101: Benchmark'lar Ne Ölçer, Ne Ölçemez?** — ölçme sorunu ilk kez ciddi biçimde. `[yayında]`
17. **Halüsinasyon: Model Neden ve Ne Zaman Uydurur?** — olasılıksal üretimin doğal sonucu; azaltma yolları. `[yayında]`
18. **Bilgi Parametrelerde Nasıl Durur? Model Hafızası** — ezber vs genelleme; bilgi düzenleme. `[yayında]`
19. **Fine-Tuning ve LoRA: Modeli Kendi İşine Uyarlamak** — verimli adaptasyon. `[yayında]`
20. **Açık Ağırlıklar ve Model Ekosistemi** — açık/kapalı modeller, lisanslar, ekosistem. `[yayında]`

### Faz 3 — Modelle Konuşmak: Inference, Prompt ve Bağlam (21–30)

21. **Bağlam Penceresi: İstemin Anatomisi** — bağlam neyi kapsar; pencere sınırının anlamı. `[yayında]`
22. **İstem Mühendisliği: Kanıta Dayalı Bir Bakış** — ne işe yarar, neden, ne zaman yaramaz. `[yayında]`
23. **In-Context Learning: Örnekle Öğrenme** — few-shot; ağırlıklar değişmeden "öğrenme". `[yayında]`
24. **Sistem İstemleri, Roller ve Sohbet Biçimi** — sohbetin perde arkası. `[yayında]`
25. **Uzun Bağlam: Pencereyi Büyütmenin Bedeli** — uzun bağlam teknikleri ve sınırları. `[yayında]`
26. **KV Cache ve Çıkarım Ekonomisi** — üretimin maliyet yapısı. `[yayında]`
27. **Kuantizasyon: Modeli Küçültme Sanatı** — hassasiyet/performans dengesi. `[yayında]`
28. **Hız ve Maliyet: Servis, Yığınlama ve Spekülatif Üretim** — üretim sistemleri. `[yayında]`
29. **Embedding'lerin Dönüşü: Anlamsal Arama** — embedding'ler ürün bileşeni olarak (4'ün geri çağrımı). `[yayında]`
30. **Yapılandırılmış Çıktı: JSON, Kod ve Kısıtlı Üretim** — üretimi biçimle sınırlamak. `[yayında]`

### Faz 4 — Akıl Yürütme: Reasoning ve Test-Time Compute (31–40)

31. **Akıl Yürütme Nedir? Tanım, Ölçüm ve Tartışma** — kavramın kendisi ve ölçümü. `[yayında]`
32. **Düşünce Zinciri: Ara Adımların Gücü ve Sınırı** — ara adımların gücü ve mekanizması. `[yayında]`
33. **Çıkarım Anında Hesap: Düşünme Süresi Satın Almak** — çıkarımda ölçekleme. `[yayında]`
34. **Akıl Yürüten Modeller: Doğrulanabilir Ödülle Eğitim** — akıl yürütmeye eğitilmiş modeller; matematik ve kodun test alanı rolü. `[yayında]`
35. **Doğrulama: Modelin Cevabını Kontrol Etmek** — doğrulayıcının eğitimi, iki hata türü, öz-düzeltmenin sınırı. `[yayında]`
36. **Arama ve Planlama: Öz-Tutarlılık ve Ağaçlar** — birden çok yol deneme; oylama ve ağaç araması. `[yayında]`
37. **Pekiştirmeli Öğrenmenin Temelleri: Markov Karar Süreci, Politika ve Ödül** — 13 (RLHF) ve 34'ün (RLVR) biçimsel zemini; "değer" teriminin dikkat üçlüsündeki değerden ayrışması. `[yayında]`
38. **Süreç Denetimi: Adım Adım Ödüllendirme** — sonuç denetimi ↔ süreç denetimi; adım etiketinin maliyeti. `[yayında]`
39. **Bellek: Sohbet İçinde ve Sohbetler Arasında** — pencerede kesme, özetleyerek taşıma, kalıcı belleğin yazma-getirme-okuma hattı. `[yayında]`
40. **Uzun Ufuk: Çok Adımlı Görevlerde Tutarlılık** — çarpımsal düşüş, toparlanma tavanı, görev ufkunun süreyle ölçülmesi. `[yayında]`

### Faz 5 — Bilgiyle Bağlamak: Retrieval ve Araçlar (41–50)

41. **Modelin Bilgisi Neden Yetmez? RAG'e Giriş** — parametrik bilginin sınırı (17–18'in geri çağrımı); dizin değiştirerek bilgiyi güncellemek. `[yayında]`
42. **Getirme: Aramanın Modern Hali** — ters dizin ve BM25'in mekaniği; seyrek getirmeyi geçmenin üç yolu. `[yayında]`
43. **Vektör Veritabanları ve Dizinleme** — embedding tabanlı altyapı. `[yayında]`
44. **Parçalama, Yeniden Sıralama ve RAG Hattının İncelikleri** — uçtan uca RAG mühendisliği. `[yayında]`
45. **RAG Değerlendirmesi: Doğruluk ve Kaynak Sadakati** — groundedness ölçümü. `[yayında]`
46. **RAG'in Ötesi: Getirerek Akıl Yürüten Sistemler** — araştıran sistemler. `[yayında]`
47. **Araç Kullanımı: İşlev Çağrısı** — modelin eyleme geçmesi. `[yayında]`
48. **Web, Kod ve Dosyalarla Çalışan Modeller** — gerçek araç zincirleri. `[yayında]`
49. **MCP ve Araç Ekosistemleri** — standartlaşma. `[yayında]`
50. **Bilgi Tazeliği: Güncellik, Kaynak Güveni ve Atıf** — bilgiye güven zinciri. `[yayında]`

### Faz 6 — Ajanlar: Araç Kullanan Modeller (51–60)

51. **Ajan Nedir? Kontrol Döngüsü Olarak LLM** — plan-eylem-gözlem döngüsü. `[yayında]`
52. **Ajan Mimarileri** — tek ajan desenleri, hata döngüleri. `[yayında]`
53. **Çoklu Ajan Sistemleri: İşbirliği ve Orkestrasyon** — dağıtık iş. `[yayında]`
54. **Bilgisayar Kullanan Ajanlar** — ekran, tarayıcı, GUI. `[yayında]`
55. **Kod Yazan Ajanlar: Yazılım Mühendisliğinde LLM** — coding agent'lar. `[yayında]`
56. **Ajan Belleği ve Durum Yönetimi** — 39'un ajan bağlamında geri çağrımı. `[yayında]`
57. **Ajan Değerlendirmesi: Başarıyı Ölçmek** — ajan benchmark'ları. `[yayında]`
58. **Ajan Güvenliği: İstem Enjeksiyonu ve Kum Havuzu** — saldırı yüzeyi. `[yayında]`
59. **İnsan-Ajan İşbirliği: Denetim ve Devir** — human-in-the-loop. `[yayında]`
60. **Ajan Ekonomisi: Maliyet, Gecikme, Güvenilirlik** — üretimde ajanlar. `[yayında]`

### Faz 7 — Güvenlik ve Hizalama (61–70)

61. **Hizalama Sorunu: Ne İstediğimizi Söylemek Zor** — alignment kavramı (12–13'ün geri çağrımı). `[yayında]`
62. **Güvenlik Eğitimi: Reddetme, Sınırlar ve Dengeler** — yardımseverlik/zararsızlık gerilimi. `[yayında]`
63. **Jailbreak ve Kırmızı Takım** — saldırılar ve savunmalar. `[yayında]`
64. **Constitutional AI ve Ölçeklenebilir Denetim** — ilkelere dayalı eğitim, scalable oversight. `[yayında]`
65. **Belirsizlik ve Kalibrasyon: Model Ne Kadar Emin?** — güven ile doğruluk ilişkisi. `[yayında]`
66. **Dalkavukluk ve Model Karakteri** — sycophancy, persona. `[yayında]`
67. **Aldatma ve Durum Farkındalığı Tartışmaları** — deception araştırması. `[yayında]`
68. **Kötüye Kullanım: Siber, Biyolojik ve Bilgi Operasyonları** — dual-use riskler (karar #154). `[yayında]`
69. **Yönetişim: Politika, Standartlar ve Regülasyon** — kurumsal çerçeve; 20'nin koordinatı ödendi. `[yayında]`
70. **Sorumlu Ölçekleme: Sınır Model Güvenlik Çerçeveleri** — RSP/ASL tarzı çerçeveler (karar #155). `[yayında]`

### Faz 8 — Değerlendirme ve Yorumlanabilirlik (71–80)

71. **Değerlendirme Bilimi: Benchmark'ların Ötesi** — 16'nın ileri düzey geri çağrımı; "benchmark" başlıkta kaldı (karar #161). `[yayında]`
72. **Kirlilik ve Ezber: Benchmark'lara Güven Krizi** — contamination; 8'in vaadi (18 ile birlikte); 72 koordinatı ödendi. `[yayında]`
73. **İnsan Değerlendirmesi ve Hakem Modeller** — değerlendiren modeller (karar #162). `[yayında]`
74. **Mekanistik Yorumlanabilirlik: Devreleri Okumak** — modelin içine bakmak; 74–77 bandının açılışı (karar #163). `[yayında]`
75. **Özellikler ve Süperpozisyon: Modelin İç Dili** — özellik, süperpozisyon, seyrek sözlük; 74'ün devri. `[yayında]`
76. **Aktivasyonlara Müdahale: Yönlendirme ve Sondalar** — nedensel müdahale (karar #169). `[yayında]`
77. **Atıf: Model Neden Böyle Dedi?** — açıklanabilirlik; 74–77 bandı kapandı (karar #170). `[yayında]`
78. **Beliren Yetenekler Tartışması: Aniden mi Geliyor?** — 5 ve 9'un koordinatı ödendi (karar #171). `[yayında]`
79. **Sağlamlık: Dağılım Kayması ve Düşmanca Girdiler** — kırılganlık; Faz 8'in kapanışının ilk yarısı (karar #177). `[yayında]`
80. **Şeffaflık: Model Kartları ve Sistem Kartları** — belgeleme pratiği; Faz 8 kapandı. `[yayında]`

### Faz 9 — Çoklu Modalite ve Verimlilik (81–90)

81. **Görüntüyü Anlamak: Görüntü-Dil Modelleri** — çok modlu girdi; Faz 9'un açılışı, kategori `multimodal-and-future` (kararlar #176, #178); 54'ün numarasız işareti ödendi. `[yayında]`
82. **Ses, Konuşma ve Gerçek Zamanlı Modeller** — sesli etkileşim; modalitenin token'a çevrilmesi sese taşındı. `[yayında]`
83. **Görüntü ve Video Üretimi: Difüzyona Giriş** — üretken görsel modeller; 82'nin numarasız işareti ödendi, başlık Türkçeleştirildi (karar #184). `[yayında]`
84. **Birleşik Modeller: Her Şey Token mı?** — modaliteleri birleştirme; 30'un kısıtlı üretimi burada tahsil edildi. `[yayında]`
85. **Verimli Mimariler: Uzman Karışımları (MoE)** — koşullu hesaplama; 20'nin koordinatı ödendi. `[yayında]`
86. **Dikkatin Ötesi: SSM ve Alternatif Mimariler** — 6–7'nin eleştirel geri çağrımı; 7 ve 15'in koordinatı ödendi, başlık Türkçeleştirildi (karar #185). `[yayında]`
87. **Küçük ama Güçlü: Damıtma ve Küçük Modeller** — damıtma; 34'ün numarasız işareti ödendi (sınırın aşılması). `[yayında]`
88. **Uçta Yapay Zekâ: Telefonda ve Cihazda LLM** — cihaz bütçesi; 26/28'in yığın varsayımı kalkıyor. `[yayında]`
89. **Donanım Ekosistemi: GPU'dan Özel Çiplere** — çatı çizgisi, üç ıraksayan üstel, alana özel mimari; mühendislik derinliği Faz 13'te. `[yayında]`
90. **Enerji, Maliyet ve Çevresel Ayak İzi** — ölçeğin bedeli ve bir enerji sayısının okunması; **Faz 9 kapandı**. `[yayında]`

### Faz 10 — Matematiksel Omurga: Sezgiden İspata (91–97)

Erken makalelerde sezgiyle kurulan kavramların bilinçli formalizasyonu (SOZLESME §3);
araştırmacı formasyonunun giriş kapısı.

91. **Vektörler ve Matrisler: Embedding'in Matematiği** — vektör uzayı, doğrusal dönüşüm; 4/6/7'nin formal yeniden kurulumu. Faz 10'un açılışı, kategori `foundations` (karar #200), level `advanced` (karar #201). `[yayında]`
92. **Matrisin İçini Okumak: Rank, Özdeğer ve SVD** — düşük ranklılık; 19'un (LoRA) ve 74–77'nin matematiksel zemini. `[yayında]`
93. **Olasılığın Dili: Dağılımlar, Beklenti ve En Büyük Olabilirlik** — 5/10'daki dağılım sezgisinin formal hâli; başlık Türkçeleştirildi (karar #202). `[yayında]`
94. **Bilgi Kuramı: Entropi, Çapraz Entropi ve KL** — kayıp ve perplexity'nin formal kimliği (2/5/9'un geri çağrımı); **13'ün KL işareti ödendi**. `[yayında]`
95. **Optimizasyonun Kuramı: Gradyanın Matematiği** — gradyanın yön olması, eğriliğin tavanı, koşul sayısı, momentum, Adam ve AdamW; 2/8'in formal yeniden kurulumu. `[yayında]`
96. **Genelleme Kuramı: Ezber ile Öğrenme Arasında** — yanlılık-oynaklık, düzgün yakınsamanın sınırı, çift inişin üç ekseni, örtük düzenlileştirme, ezberin marjinal faydası; 18/72'nin teorik zemini. `[yayında]`
97. **Klasik Makine Öğrenmesi Turu: LLM'den Önce ve Yanında** — dört aile dört varsayım: kNN, marj, ağaç toplulukları, k-ortalamalar; tablo verisinde döndürme deneyi; taban çizgisi kültürü. `[yayında]`

### Faz 11 — Araştırma Pratiği: Kanıtla Düşünmek (98–102)

98. **Bir Çalışmayı Okumak: İddia, Kanıt ve Hakemlik** — bildirinin iskeleti, iddia-kanıt haritası, hakemliğin tutarlılık deneyleri, ayar bütçesi asimetrisi, ön baskı ↔ yayımlanmış sürüm. Faz 11'in açılışı, kategori `foundations` (karar #209); başlık Türkçeleştirildi (karar #210). `[yayında]`
99. **Araştırma Sorusu ve Deney Tasarımı: Hipotez, Taban Çizgisi, Ablasyon** — sınanabilir hipotezin ne yasakladığı, ön kayıt, taban çizgisi seçimi bir tasarım kararıdır, arama bütçesi deneyin parçasıdır, ablasyonun kanıt yükü ve kontrollü bozma; başlık Türkçeleştirildi (karar #217). `[yayında]`
100. **Yüzüncü Adım: Sezgiden Bilime — Haritanın Sentezi** — 1–99'un planlı büyük geri çağrımı; fazlar zinciri, tekrarlanan tek refleks, terim çakışmaları ve okuyucunun kendi haritası. Yeni kavram ve yeni ölçüm yok (karar #220). `[yayında]`
101. **Ölçümün Disiplini: İstatistiksel Test ve Benchmark Bilimi** — sıfır hipotezi ve p değeri, test seçimi, eşleştirmenin getirisi, oynaklık kaynakları, yirmi rastgele bölme, çoklu karşılaştırma ve pass@k'nın tahminci yanlılığı; **16 ve 22'nin koordinatı ödendi**. `[yayında]`
102. **Tekrarlanabilirlik: Negatif Sonuç ve Açık Bilim** — üç derece (aynı kod / aynı veri / aynı sonuç), kodsuz yeniden kurma, kurumsal cevap, veri sızıntısı ve yayımlanmayanın ağırlığı; **Faz 11 kapandı**; başlıktaki gereksiz İngilizce kaldırıldı (karar #218). `[yayında]`

### Faz 12 — Temelden Kurmak: Modeli Elle İnşa Etmek (103–105)

103. **Mikro-GPT: Bir Transformer'ı Elle Kurmak** — 364 parametrenin tam defteri, bir token'ın embedding'den logit'e bütün boyutları, maskelenmiş dikkat matrisinin sayısal hâli. Faz 12'nin açılışı, kategori `models-and-training` (karar #225), level `advanced`. **100'ün kasıtlı boşluğu ile 102'nin işareti ödendi.** `[yayında]`
104. **Kendi Eğitim Koşun: Tokenizer, Veri ve Döngü** — serinin kendi metni üzerinde sıfırdan BPE, sözlük boyunun ölçülmüş marjinal getirisi, entropi tabanı, beş tohumun ikisinin kuralı öğrenememesi ve hiçbir ablasyonun sapmayı aşmaması. `[yayında]`
105. **Kendi Asistanın: Küçük Ölçekte SFT ve DPO** — kayıp maskesinin koruduğu ve korumadığı şeyler, hizalama vergisi, δ = 1,5 ÷ β ölçümü ve tercih karşılanırken yeğlenen cevabın binde bire inmesi. **Faz 12 kapandı.** `[yayında]`

### Faz 13 — Eğitim Sistemleri Mühendisliği (106–109)

106. **GPU Zihinsel Modeli: Hesap, Bellek, Bant Genişliği** — parametre başına 16 bayt, aktivasyon formülü, yeniden hesaplamanın ölçülmüş bedeli, sırt noktasının iki yanı ve kullanım oranı. Faz 13'ün açılışı, kategori `models-and-training` (karar #225). `[yayında]`
107. **Dağıtık Eğitim: Paralellik Stratejileri** — dört bölme ekseninin tam kurulumu: veri (ZeRO'nun üç kademesi), tensör (katman başına dört hepsi-indirge), boru hattı (kabarcık `(p−1)/m`, açılmış hâliyle `(n/t − d)/(B/b)`) ve dizi (34'ün kalan 10'unu bedava bölmesi). 106'nın dört eksenli sorusu ödendi. `[yayında]`
108. **Performans Mühendisliği: Dikkati Hızlandırmak** — bir FLOP bir zaman birimi değildir: işlemlerin %0,2'si sürenin %39'unu yiyor, birim işlem başına 319 kat. Çekirdek, birleştirme, bellek yerleşimi ve bellek kullanım verimi; aynı algoritmanın üç uygulamasında kullanım oranı %25–40 → %50–73 → yeni çipte %35 → %75. Başlık Türkçeleştirildi (karar #227). `[yayında]`
109. **Koşunun Güvenilirliği: Kontrol Noktası, Sıçrama ve Gözlem** — `T* = √(2δM)` ve `√(2δ/M)`, gözlemin üç katmanı, geride kalan makine, ve kayıp sıçramasının veri ile parametre durumunun bileşiminden doğduğunu gösteren eleme. **Faz 13 kapandı.** Başlık Türkçeleştirildi (karar #234). `[yayında]`

### Faz 14 — Sınır ve Sentez (110–118)

**Kategori planı (karar #233, bölünmüş atama):** 110–113 ve 116–118 `multimodal-and-future`; **114–115 `case-studies`**.
Gerekçe karar #200'ün ölçütüdür — kategori konuyu değil katmanı adlandırır — ve 114–115'in katmanı ötekilerden
farklıdır: yeni konu değil, kurulmuş bilginin tek bir vaka üzerinde sentezi. Bu karar fazın tamamı için verilmiştir;
114–115'in run'ı tartışmayı yeniden açmaz, yalnızca `case-studies` klasörünü açar ve
`reading-list-groups.test.ts`'i çalıştırır.

110. **Dünya Modelleri: Metnin Ötesinde Anlamak** — terimin iki soyu (açık geçiş modeli ↔ örtük hipotez), Myhill–Nerode türevi iki ölçüt, ve geçerli bir sonraki token ile okunabilir bir sondanın neyi kanıtlamadığı. Faz 14'ün açılışı, kategori `multimodal-and-future` (karar #233). `[yayında]`
111. **Robotik ve Somutlaşmış Yapay Zekâ** — eylem arayüzünün üç hâli (dokuz şablon ↔ sekiz tam sayı × 256 kutu × 1–3 Hz ↔ sürekli öbek × 50 Hz), ön eğitimin anlamsal yarıyı taşıyıp motor yarıyı taşımaması (92 ↔ 91; 32 ↔ 62; 17 ↔ 60; sıfırdan %0/%1), ve gövde verisinin kıtlığının bir üretim biçimi sorunu olması. **51'in eylem arayüzü işareti ve 110'un gövde devri ödendi.** `[yayında]`
112. **Sürekli Öğrenme ve Kişiselleştirme** — bir modeli güncel tutmanın dört yolu ve dört ayrı faturası; rank-bir güncellemenin kimliği (dik anahtarlara dokunmaz), sonuçların taşınmaması (99,8 ↔ 20,2), devre dışı bırakan düzenleme (3,339×10⁻⁴ ↔ 8,156×10⁻⁷) ve yerelleştirme–düzenleme bağıntısının sıfıra yakınlığı. **39/56'nın ürün düzeyi işareti ödendi.** `[yayında]`
113. **Bilimde Yapay Zekâ: Keşif Aracı Olarak LLM** — 35'in üretmek–doğrulamak asimetrisi laboratuvarda: doğrulama maliyetinin dört değeri (saklanmış deney, puanlama programı, matematikçinin kanıtı, kimyagerin ayları) ve hakemli iki itirazın mekanizma önerisi (düzensiz katı arama uzayında yok). `[yayında]`
114. **Vaka İncelemesi: Bir Sınır Model Nasıl Yapılır?** — serinin ilk vaka incelemesi; tek bütçe, altı karar, iki ayrı sütun: maliyetin dağılımı ile geri alınamazlığın dağılımı ters. Post-training %1,78 tutup 1,3 ↔ 175 milyarı yeniyor. Kategori `case-studies` (karar #233), başlık Türkçeleştirildi (karar #240). `[yayında]`
115. **Vaka İncelemesi: Bir LLM Ürünü Nasıl Kurulur?** — mühendislik sentezi (41–60'ın geri çağrımı).
116. **Açık Sorular: Alanın Bilmedikleri** — dürüst envanter.
117. **AGI Tartışması: Tanımlar, Testler, Zaman Çizelgeleri** — kavramsal temizlik.
118. **Son Adım: Haritayı Yeniden Çizmek** — serinin sentezi; okuyucunun araştırmacı/mühendis yol haritası.

## Eski fikirlerin entegrasyonu (2026-08-28 revizyonunun izlenebilirliği)

Eski "100 yazılık akademi" ve "200 yazılık research & engineering" fikirleri ayrı seri olarak
**açılmadı**; değerli eksenleri tek seriye entegre edildi:

- Akademi ekseni → Faz 10 (matematiksel omurga), Faz 11 (araştırma pratiği) ve her makaledeki
  "akademik bağlam" katmanı (SOZLESME §2).
- Research & engineering ekseni → Faz 12 (temelden kurma), Faz 13 (eğitim sistemleri) ve mevcut
  26–28/85–90 mühendislik başlıkları.
- Elenenler (gerekçeli): ikinci bir AI serisi (tek öğrenme yolu tezini bölerdi); makale-başına
  sabit kota/şablon (SOZLESME §3 ilkeleriyle çelişir); eski taslak 37 "Matematik ve Kod:
  Reasoning'in Test Alanları" (34'ün doğal alt konusu — yerine RL temelleri kondu); eski taslak
  93 "Sürekli Öğrenme" ile 94 "Kişiselleştirme" (112'de birleşti — ikisi de aynı ürün sorusunun
  iki yüzü); eski taslak 96–100 sentez başlıkları 114–118'e taşındı (sistem fazlarından sonra
  daha zengin sentez kurulabildiği için).

## Prerequisite grafı — Batch 0 + Batch 1 (+ Batch 2 taslağı)

Gösterim: `makale ← dayandıkları`.

- 1 ← (yok; giriş noktası)
- 2 ← 1 (model=fonksiyon; tahmin çerçevesi)
- 3 ← 2 (parametre, kayıp, gradyan inişi)
- 4 ← 1 (temsil fikri), 3 (öğrenilen ağırlıklar → embedding de öğrenilir)
- 5 ← 2 (kayıp/eğitim), 4 (token, embedding)
- 6 ← 4 (statik embedding'in duvarı, defter/satır imgesi, tokenizer gerçeği), 5 (sonraki-token hedefi, yinelemeli ağlar), 3 (katman = öğrenilmiş dönüşüm) `[yayında]`
- 7 ← 6 (dikkat, maskeleme, iki eksik), 3 (katman yığını, aktivasyon zorunluluğu, sönen gradyan), 5 (sonraki-token dağılımı, Transformer'ın telaffuzu), 1 (düğmeli kutu), 2 (öğrenme döngüsü) `[yayında]`
- 8 ← 7 (boş mimari), 5 (hedef + "kendi kendinin cevap anahtarı"), 2 (döngü, mini yığın, aşırı öğrenme, Robbins–Monro), 1 (kural vs veri, denetimli öğrenme), 3 (geriye yayılım), 4 (tokenizer maliyeti, dağılımsal hipotez) `[yayında]`
- 9 ← 8 (ön eğitim, 6ND, öğrenme oranı çizelgesi), 2 (kayıp eğrisi, aşırı öğrenme, indirgenemez hata, çift iniş notu), 5 (perplexity, beliren yetenekler tartışması) `[yayında]`
- 10 ← 9 (eğitilmiş model, ekonomi), 5 (sonraki-token dağılımı + Şekil 2'nin beş adayı, perplexity), 7 (logit, paralelliğin sınırı), 4 (token ≠ kelime), 2 (rastgeleliğin iki anlamı), 1 (tahmin tanımı) `[yayında]`

**Batch 2 (11–14) — gerçekleşen graf.** Aşağıdakiler yazılan metinde fiilen kullanılan bağlardır;
batch öncesi taslak dört satırlıktı, gerçekleşen graf daha yoğun çıktı.

- 11 ← 8 (temel model; öz-denetimli hedefin bedava etiketi; GPT-1'in iki yarımı), 10 (metin tamamlayıcı gerilimi; üretim bir çekiliştir), 9 (PF-gün birimi; "aynı eğri, iki cetvel"), 5 (few-shot düzeninin adı), 6 (hizalama sözcüğünün ilk anlamı — ayrım burada yapıldı), 2 (öğrenme döngüsü, genelleme), 1 (denetimli öğrenme) `[yayında]`
- 12 ← 11 (haritanın ilk durağı), 8 (merdiven: tek cümleden n hedef), 6 (maskeleme), 7 (nedensel maske), 10 (otoregresif döngü durmaz; üretim bir çekiliştir), 9 (aynı koşu, iki cetvel), 2 (aşırı öğrenme, kapasite) `[yayında]`
- 13 ← 12 (SFT'nin tavanı: "bu şundan kötü" denemez), 11 (ödül modeli, maliyet merdiveni, yardımseverlik ↔ zararsızlık), 10 (tercih verisi çekilişle üretilir), 3 (sigmoid), 2 (kayıp ↔ ödül simetrisi), 9 (cetvel uyarısı), 8 (SFT modeli referans olarak) `[yayında]`
- 14 ← 8 (veri hunisi, tekilleştirme, veri karışımı, C4 kuralları — "ayrıntısı 14'te" borcu), 9 (veri duvarı, epok tekrarı, hesap-optimal tahsis), 13 (vekil ölçü uyarısı), 12 (LIMA'nın token bütçesi, Self-Instruct kalite denetimi), 4 (derlem, embedding), 2 (aşırı öğrenme) `[yayında]`

**Batch 3 (15–18) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; batch öncesi taslak
dört satırlıktı, gerçekleşen graf yine daha yoğun çıktı.

- 15 ← 4 (BPE, sözlük, Türkçenin token maliyeti 33/60/46, embedding defterinin parametre payı, anlamın geometrisi), 8 ve 14 ("bu farkın yeteneklere yansıması" borcu; token bütçenin birimi), 10 (kesme kuralları token üzerinde çalışır; üretim bir çekiliştir — kelime başına kaç zar), 7 (karesel dikkat maliyeti; embedding tablosu sözlük boyuyla ölçeklenir), 9 (hesap-optimal tahsis mantığı sözlük boyuna genişler), 12 (LIMA'nın token bütçesi) `[yayında]`
- 16 ← 15 (aynı model, farklı bölme → farklı doğruluk; perplexity ancak aynı tokenizer'la karşılaştırılır), 5 (perplexity içsel ölçüdür — "ölçmenin tuzakları 16'da" randevusu), 9 (aynı eğri, iki cetvel), 12 (doğrulama kaybı ↔ insan tercihi ayrışması), 11 (kullanım dağılımı: yüzde 45,6 ↔ yüzde 2,6), 13 (Bradley-Terry arenada geri döner; aşırı optimizasyon/Goodhart), 14 (FineWeb-Edu ölçümü; kirlilik), 10 (şık okuma protokolü üretim kurallarına bağlıdır) `[yayında]`
- 17 ← 16 (ikili puanlamanın tahmini ödüllendirmesi; Goodhart), 10 (akıcılık ≠ doğruluk; üretim bir çekiliştir), 13 (ödülün memnuniyeti ölçmesi; tercih verisiyle çekimserlik öğretme), 11 (yüzde 41 ↔ 21 uydurma oranı; hizalama vergisi), 14 (bir kez geçen belge ↔ tekilleştirme), 5 (sonraki-token hedefi kalibrasyonu iter), 12 (yüzeysel hizalama hipotezinin dikkatli sürümü) `[yayında]`
- 18 ← 17 (bilgi ön eğitimden gelir; ince ayar kötü bir bilgi kanalıdır), 7 (blok içinde ileri beslemeli katman dikkatin iki katı — bloğun üçte ikisi; artık bağlantı), 4 (embedding defteri ve tek satırın sınırı), 8 (ezber ölçümü: The Pile'ın en az yüzde 1'i; "gerilim 18 ve 72'de" borcu), 14 (tekilleştirme ↔ ezber), 9 (15,6 trilyon token; hesap-optimalin yeni okuması), 2 (aşırı öğrenme, genelleme), 10 (bağlam uzunluğu geri çağırmayı kolaylaştırır), 6 (dikkat bilgiyi taşır) `[yayında]`

**Batch 4 (19–22) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; taslak dört satırlıktı,
gerçekleşen graf yine daha yoğun çıktı.

- 19 ← 11 (ince ayar tanımı ve "LoRA biçimi 19'da" randevusu; alanın terim düzeni), 18 (bilgi ağırlıkların neresinde durur; "modeli yeniden yazmadan uyarlamak" köprüsü), 17 (ince ayar kötü bir bilgi kanalıdır), 3 (geriye yayılım her parametre için bir türev üretir → gradyan belleği), 7 (blok matrislerinin boyu; parametre sayımı), 12 (denetimli ince ayarın veri düzeni), 9 (model büyüdükçe içsel boyut küçülür — ölçek tartışmasının akrabası), 8 (sürekli ön eğitim, ön eğitimin devamı olarak), 16 (yüzde 99,3 iddiasının okunma disiplini) `[yayında]`
- 20 ← 19 (LoRA ağırlığa erişimi varsayar — makalenin açılış varsayımı), 8 (6ND kuralı ve GPT-3'ün 3,14×10²³ işlemi), 9 (PF-gün birimi), 11 (GPT-3 ön eğitimi 3.640 PF-gün), 14 (veri hattı, telif ve lisans), 16 (liderlik tablosu ↔ blog yazısıyla duyurma; ölçüm hedefe dönüşünce), 13 (aşırı optimizasyon örüntüsü şeffaflık endeksinde), 18 (ezber ölçümleri ancak derlem incelenebilirse yapılabilir), 27 ve 85 (ileri işaretler) `[yayında]`
- 21 ← 10 (otoregresif döngü → durumsuzluk), 15 (dil başına token maliyeti pencereye yansır), 7 (karesel dikkat maliyeti; pozisyon kodlaması), 12 (sohbet biçimi: sınırlar özel token'larla çizilir), 16 (ilan edilen sayıyı sorgulama disiplini; perplexity ↔ görev başarısı), 18 (anahtar-değer belleği ↔ anahtar-değer önbelleği ayrımı; unutmanın iki anlamı), 19 (önek ayarı pencereden yer kapar), 5 (perplexity içsel ölçüdür), 6 (dikkat talimatla belgeyi ayırmaz) `[yayında]`
- 22 ← 21 (pencerenin geometrisi; ilgisiz metin zarar verir), 16 (istem biçimi duyarlılığı, liderlik tablosu, küme büyüklüğü hesabı), 15 (dil nötr bir değişken değil; sayı bölünmesinde ara adım), 19 (ağırlık değişmeden davranış değiştirme sınırı), 23/32/101 (ileri işaretler) `[yayında]`

**Batch 5 (23–26) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; taslak dört satırlıktı,
gerçekleşen graf yine daha yoğun çıktı.

- 23 ← 22 (defterdeki "örneklerin mekanizması 23'te" randevusu; sıra duyarlılığı; biçim taşıyıcıdır), 5 ("few-shot öğrenme … mekanizması 23'te" borcu), 19 (davranış ucuz ↔ bilgi pahalı ayrımı; ağırlığa dokunmadan uyarlama), 21 (durumsuzluk: örnekler pencereden çıkınca kazanç gider; 85.000 token'lık istem ancak uzun pencereyle mümkün), 18 (bağlamdaki bilgi ile ağırlıktaki bilginin farklı adreslenmesi), 6 (BLEU ile aynı aileden cetvel), 2 (gradyan inişi döngüsü, örtük gradyan inişi benzetmesinde) `[yayında]`
- 24 ← 21 (bölümler ayrı kanal değil, dizideki işaretler; durumsuzluk sistem istemini de kapsar; "ayrım bir duvar değil bir eğilim"), 12 (sohbet biçimi ve özel token'lar; "roller ileride" borcu), 22 (rol/persona ölçümü; biçim duyarlılığı şablon farkına genişledi; belirsizliği azaltma kaldıracı), 23 (modelin kendi yanlış cevabı bir sonraki turda gösterim olarak çalışıyor), 4 (özel token'lar sıradan metinden üretilemez — tokenizer bir güvenlik katmanı), 10 (tur sonu token'ı üretimi durdurur), 11 (temel model şablonu tanımaz; hizalama vergisiyle aynı aileden maliyet), 13 (post-training davranışı kurar), 7 (dikkat sistem istemine ayrı muamele yapmaz), 26 (önek paylaşımı; ileri bağ) `[yayında]`
- 25 ← 21 (üç sınır kaynağı; ilan edilen ↔ etkin uzunluk; RULER'ın on yedi modeli), 7 (pozisyon kodlaması; karesel dikkat maliyeti), 6 (softmax toplamı bir olan ağırlıklar üretir → dikkat çukurunun sebebi), 16 (kısa ve uzun görevleri ayrı ölçme disiplini; MMLU), 5 (perplexity içsel bir ölçüdür), 26 ve 41 (ileri bağlar) `[yayında]`
- 26 ← 21 (27.500 token'lık karesel tur hesabı; anahtar-değer önbelleğinin adı), 7 (nedensel maske → anahtar ve değerler değişmez; blok yapısı), 6 (sorgu/anahtar/değer üçlüsü), 8 (2N işlem; 6ND kuralının ileri geçiş payı), 10 (otoregresif döngü = adım adım üretim; "kod çözme" ile "decode" ayrımı), 25 (kare hâlâ kare), 24 (sistem isteminin sabit yükü), 23 (997 örneklik önek bir kez ödenebilir), 19 (kuantizasyonun adı konmuştu), 16 (ölçüm disiplininin donanım karşılığı) `[yayında]`

**Batch 6 (27–30) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; taslak dört satırlıktı,
gerçekleşen graf yine daha yoğun çıktı.

- 27 ← 26 (darboğaz bellek; 2N bayt taşıma; 42 gigabaytlık önbellek hesabı), 19 ("kuantizasyonun mekanizması 27'de" borcu; QLoRA'nın dört biti; kuantizasyon sabiti), 18 (parametre başına 2 bit kapasite — int4'te 0,7'ye düşüyor), 16 (neredeyse aynı, hangi cetvelde), 9 (Chinchilla oranı ve fazla eğitilmiş modeller), 3 (aktivasyon), 2 (parametre = sayı; aşırı öğrenmenin kalibrasyon kümesindeki karşılığı), 7 (Transformer bloğu ↔ kuantizasyon bloğu ayrımı), 5 (perplexity içsel bir ölçüdür) `[yayında]`
- 28 ← 26 (229 işlem/bayt oranı; ön dolum ↔ adım adım üretim; 2N işlem; sayfalı dikkatin önek paylaşımı; iki ayrı gecikme ölçüsü), 27 (kuantizasyon çipi hızlandırmaz, yığına yer açar), 10 (otoregresif döngü; üretim bir çekiliştir; sıcaklık kabul oranını değiştirir), 24 (sistem istemi sabit önektir), 23 (997 örneklik önek), 5 (bigram modeli taslak olarak), 21 (pencere ve önbellek) `[yayında]`
- 29 ← 4 (embedding defteri; anlam haritası; defteri eğitim yazar), 6 (çapraz kodlayıcıda karşılıklı dikkat; nokta çarpım), 23 (gösterim seçimi bir arama işidir), 16 (SQuAD'ın kelime örtüşmesi; hiçbir model her görevde önde değil), 2 (aynı öğrenme döngüsü, farklı kayıp), 26 ve 28 (değişmeyeni bir kez öde; ucuz aday üret, pahalı olan karar versin), 27 (vektörleri daha az bitle saklamak), 24 (getirilen belge güvenilmez içeriktir), 41 (ileri bağ) `[yayında]`
- 30 ← 10 (kod çözme adımındaki dağılım; kesme kuralları maskeden önce mi sonra mı; otoregresif koşullanma), 15 (token ızgarası ↔ dilbilgisi hizasızlığı; köprü token'ları), 22 (belirsizliği azaltmak; ara adımların ölçülen kazancı), 24 (sistem istemine biçim kuralı yazmak), 6, 7 ve 12 (maskelemenin önceki üç kullanımı), 28 (spekülatif üretim kısıtlı üretimi hızlandırıyor), 17 (kusursuz biçimlenmiş uydurma) `[yayında]`

**Batch 7 (31–34) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; taslak dört satırlıktı,
gerçekleşen graf yine daha yoğun çıktı.

- 31 ← 30 (şemanın alan sırası ara adımları siliyor — açılış gerilimi), 22 (ara adımların ölçülen kazancı ve dar uygulama alanı), 15 (sayıyı virgüllü tekrar ettirince düzelen toplama), 16 (ölçüm disiplini: puan değil dağılım; protokolün kendisi ölçümün parçası), 23 (görev tanıma ↔ görev öğrenme ayrımı ilgisiz cümlede işlemiyor), 18 (ezber ↔ genelleme gerilimi yordam düzeyinde), 14 (kirlilik), 34 (ileri bağ: akıl yürütmeye eğitilmiş modeller), 72 (ileri bağ) `[yayında]`
- 32 ← 31 (kavramın kurulumu ve sadakat tartışması), 22 ve 15 ("ara adımların gücü 32'de" borcu), 23 (gösterimlerin ne öğrettiği; rastgele etiket bulgusunun kardeşi), 10 (otoregresif döngü; cevaptan sonra yazılan hiçbir şey cevabı etkileyemez), 7 (sabit katman sayısı → sabit derinlik), 4 ve 8 (dağılımsal hipotez ve derlemin yerel yapısı), 30 (şemanın alan sırası bulgusunun kurucu hâli), 34 (ileri bağ) `[yayında]`
- 33 ← 32 (uzayan üretim bir maliyet kararıdır; zincirin çağrı dışına taşınması), 9 ("çıkarım anında hesap harcama ekseni 33'te" borcu; log-log doğrusu), 26 ve 28 (2N işlem, ön dolum ↔ adım adım üretim, önek paylaşımı, yığınlama, iki gecikme ölçüsü), 10 (üretim bir çekiliştir), 8 (6ND kuralı), 20 (GPT-3'ün 3,14×10²³ işlemi), 16 (zorluk kestiriminin de ölçüm olduğu uyarısı), 35 ve 36 (ileri bağlar) `[yayında]`
- 34 ← 33 (örneklemenin limiti modelin dağılımıyla belirlenir; kapsama ölçüsü), 13 (ödül modeli, aşırı optimizasyon, KL cezası, kırpma), 11 (post-training haritasının kenarındaki durak; hizalama vergisi), 12 (sentetik veri), 30 (biçim kuralı bu kez ara adımları koruyor), 31 (sadakat sorusunun eğitim tarafındaki karşılığı), 22 ve 23 (bu modellerde birkaç örnekli istem zarar veriyor), 19 ve 20 (ince ayar hizalamayı bozar; açık ağırlık), 38 (ileri bağ) `[yayında]`

**Batch 8 (35–38) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; taslak dört
satırlıktı, gerçekleşen graf yine daha yoğun çıktı.

- 35 ← 33 (kapsama ↔ seçim açığı; en iyi-N seçimi ve çoğunluk oyu; doğrulayıcının faturayı ikiye katlaması), 34 (kural tabanlı ödül; sonuç ödülü gerekçeyi denetlemez; doğru cevaba varan çözümleri saklayan filtrenin kardeşi), 13 (ödül modeli, aşırı optimizasyon, Gao ve ark.'nın ölçümü, KL ıraksaması; "doğrulamak üretmekten kolaydır" borcu), 28 (spekülatif üretimde doğrulama tek geçişte ve gerçekten ucuz), 32 (ara adımsız cevap için ince ayarda 20,6 → 5,2), 38 (ileri bağ: token düzeyinde puanlama) `[yayında]`
- 36 ← 35 (doğrulayıcının bedeli ve iki hata türü; büyük üretici ↔ küçük değerlendirici), 33 (çoğunluk oyu, kapsama, paralel eksen, ön dolumun bir kez ödenmesi), 10 (üretim bir çekiliştir; sıcaklık ve kesme kuralları; ışın aramasının ileri okuma notu), 32 (aynı soruya farklı zincirler; zincir cevabı belirler), 30 (yerel olasılık ↔ küresel cevap ayrışması; sabit cevap kümesi zorunluluğu), 34 (öz-tutarlılıkla ulaşılan 86,7), 28 (gecikme ↔ iş hacmi ayrımı), 16 (tutarlılığın kalibrasyon okuması), 6 (RL "değer"i uyarısı, ileri bağ) `[yayında]`
- 37 ← 13 (politika, ödül modeli, kırpma, KL cezası; "biçimsel çerçeve ileride" borcu), 34 (grup göreli avantaj; 32.768 token'lık cevap; dağılımın daralması), 36 (politika ağı ↔ değer ağı; oylamanın kaynağı çeşitliliktir), 6 (dikkat üçlüsündeki değerden ayrışma), 10 (üretim bir çekiliş = eylem seçimi), 33 (düşünme token'larının faturası), 2 (gradyan inişi döngüsü; kayıp ↔ hata sinyali), 1 (denetimli öğrenmeden ayrım), 4 (sözlük = eylem kümesi), 19 (ikinci bir ağın bellek maliyeti) `[yayında]`
- 38 ← 37 (kredi atama; değer işlevi; avantaj), 34 ("adım adım ödüllendirme 38'de" borcu; sonuç ödülünün gerekçeyi denetlememesi), 35 (doğrulayıcı türleri; token düzeyinde puanlama ipucu; dört yüz aday eşiği), 31 (sadakat sorusu), 33 (en iyi-N seçimi), 16 (bir puanın hangi dağılımda ölçüldüğü), 21 (durumsuzluk, ileri bağ) `[yayında]`

**Batch 9 (39–42) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; 39 ve 40'ın
taslağı ikişer satırlıktı, gerçekleşen graf yine daha yoğun çıktı. 41 ve 42'nin satırları bu
run'da ilk kez yazıldı.

- 39 ← 21 ("sohbetler arası kalıcı bellek 39'da" borcu; durumsuzluk; ortadaki bilginin kaybı), 26 (önbelleğin tek çalışma boyunca yaşaması; "bellek" sözcüğünün donanım anlamından ayrılması; sabit önek), 29 (kalıcı bellek bir getirme problemidir; ikili kodlayıcı belgeyi sorgu bilinmeden kodlar; tek vektörün sınırı), 24 (sistem isteminin uzunluğu her çağrıya biner), 28 (önek maliyetinin muhasebesi), 25 (uzun bağlamın ortasındaki bilginin bulunamaması), 27 (bellek = donanım kullanımının ikinci örneği), 17 (getirme dışsal uydurmayı içsele çevirir; çekimserlik), 5 (perplexity'de küçük olan iyidir), 33 (ileri bağ: bir sonraki makalenin ekseni) `[yayında]`
- 40 ← 39 (bilgiyi zaman içinde taşımak; hattın kurulumu), 33 (kapsama eğrisinin aynadaki görüntüsü; doğrulayıcının faturası), 31 (hesap grafiği; doğrusallaştırılmış alt grafik eşlemesi), 35 (dış geri bildirim olmadan öz-düzeltmenin sınırı = c'nin içeriden büyütülemezliği), 36 (ağaç aramasında hatalı daldan dönmek), 37 (getiri, iskonto, kredi atamanın zaman eksenine yayılması), 38 (adım ödülü hatayı oluştuğu yerde görünür kılar), 28 (n adımın iki gecikme ölçüsünü birden büyütmesi), 16 (ölçümün hangi belirsizlikle geldiği; kirlilik direnci), 17 ve 18 (ileri bağ: sonraki fazın varsayımı) `[yayında]`
- 41 ← 18 ("parametre başına iki bit" kapasitesi; ezber ↔ genelleme), 17 ("girdiye müdahalenin tam kurulumu 41'de" borcu; içsel/dışsal uydurma; tam bir kez görülmüş olgular), 29 (ikili kodlayıcı getirici olarak; SQuAD satırının görev bağımlılığı; getirilen belge güvenilmez içeriktir), 21 (pencereye giren her şey aynı diziye karışır; "yok say" kanalı yoktur), 40 (Faz 4'ün kapanışı ve varsayımın kaldırılması) `[yayında]`
- 42 ← 29 (anlamsal arama, ikili/çapraz kodlayıcı, bulma oranı, ters dizinin kurulum maliyeti, iki aşamalı sıralama, BM25'in adı), 41 (dikkat dağıtıcı belgenin zararı = getiriciye bakma gerekçesi), 16 (alan içi başarı alan dışı genellemenin göstergesi değil; değerlendirme kümesinin kendi yanlılığı), 33 ve 28 (ikinci aşamanın bütçesi), 5 (doyum işlevinin okunması) `[yayında]`

**Batch 10 (43–46) ve Batch 11 (47–50):** makale-düzeyi satırlar bu bölüme yazılmadı; gerçekleşen
bağlar kavram-tekrar defterinin "Batch 10/11'de gerçekleşen tekrarlar" tablolarında ve HANDOFF'un
tarihsel kaydında durur.

**Batch 12 (51–54) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; HANDOFF'taki taslak
51 için dokuz, 52 için beş, 53 için üç satırlıktı, gerçekleşen graf yine daha yoğun çıktı. 54'ün satırı bu
run'da ilk kez yazıldı.

- 51 ← 50 (kapanış sorusu: hangi aracı, ne zaman durmalı, iş bitti mi), 46 (düşün–eyle–gözle; eylem = dünyaya dokunan çağrı; yüzde 23 arama hatası = zar atan çevre), 47 (çalıştırıcı, mesaj sonu ve tur sonu token'ı; pass^k; 30 eylem sınırı; başarısızlık dökümü), 48 (ajan–bilgisayar arayüzü gloss'unun ödenmesi; yüz satırlık pencere = izdüşüm kararı; kod onarım ajanının 4 dolarlık bütçesi ve "hızlı başarır, yavaş başarısız olur"), 49 (araç bir yılda bozulur → çevre zar atar), 37 (durum/eylem/geçiş/ödül/bölüm/politika — **bilinçli formalizasyon**; eylem-değeri Q(s, dur) ↔ Q(s, devam); yakınsal politika optimizasyonuyla dil modelini politika olarak eğitmek), 40 (çarpımsal düşüş; toparlanma dışarıdan; %50/%80 ufku), 39 (bellek; belleğe yazma = öğrenme eylemi; yansıma), 36 (ağaç araması = öneri ve değerlendirme aşamaları), 35 (öz-düzeltme sınırı), 32 (ara adımlar = iç eylem), 21 (durumsuzluk; geçmiş yalnızca pencerede), 44 (parçalama = izdüşüm kararı), 30 (biçim sorunu → geçersiz biçimle biten bölümler), 29 (anlamsal aramayla planı geçerli eyleme çevirmek), 18 (ağırlıklardaki bilgi bir ön dağılım: GLAM), 16 (cetvel disiplini; puan çağrı sayısıyla okunur) `[yayında]`
- 52 ← 51 (karar kutusu; kısmi gözlenebilirlik; hata döngüsü mekanizması ve tur sınırında yüzde 90 tekrar; "doğru plan, geçersiz eylem"), 46 (her adımda karar veren düzen; yansıma token'ı ≠ öz-yansıma), 47 (geri almalı ağaç 35,3 → 63,8, yalnızca okuma çağrıları), 48 (düzenleme spirali 90,5 → 57,2; kod olarak eylem; yorumlayıcı = dış gözlem), 36 (ağaç araması; değer kestirimi), 37 (değer işlevi; PPO; ödül bir sayı değil bir cümle), 35 (öz-düzeltme dış geri bildirimsiz çalışmaz → yansımadan önce hakemi ölç), 39 (yansıma akrabalığı), 40 (toparlanma dışarıdan gelir → dört sensör), 28 (muhasebe: büyük modeli gerektiğinde çağır), 29 (beceri kütüphanesinde anlamsal arama), 12 (denetimli ince ayar: hızlı modül), 13 (doğrudan tercih optimizasyonu: başarısız iz ↔ uzman izi) `[yayında]`
- 53 ← 52 (sabit iş bölümü; hata döngüsü; hakem kuralı katlanır), 51 (toplumsallık özelliği; tur sınırı), 21 (pencere sonludur), 44 (ortada kaybolma; parçalama ↔ ajan zinciri), 24 (sistem istemi = rol; örgüt şeması), 33 (kapsama; deneme sayısı), 36 (öz-tutarlılık = oylama; tartışmanın karşılaştırma tabanı), 49 (orkestra şefi: açıklamadan model seçen sistem), 47 (maliyetin yüzde 95,9'u girdi), 48 (üç arayüz), 41 (getirme ↔ ajan zinciri), 30 (şemanın belge hâli), 16 (cetvel bir tasarım ürünüdür: iki sistem birbirinin kümesinde yeniliyor), 7 (karesel dikkat maliyeti ↔ uzunluk çarpı pencere) `[yayında]`
- 54 ← 48 (arayüz tezi; 1.135 → 580 öğe; üç arayüz; kod ajanına köprü), 51 (model pencereyi görür; doğru plan geçersiz eylem; durma kararı; tekrar), 52 (ders ve beceri kütüphanesi → deneyim belleği), 53 (ajanlar metinle konuşuyordu), 47 (işlev çağrısı yok; araç seçimi = getirme ↔ kimlikle seçim), 37 (eylem kümesi), 40 (web ortamının ilk ölçümü), 45 (kaynak sadakati ile aynı İngilizce kök, başka kavram; hakem model), 50 (dizine sızan yanlış belge ↔ çevre gürültüsü), 21 (pencere bütçesi), 12 (sentetik veri: sayfa kaynağından etiket), 8 (ön eğitim: piksel okumayı bedava almak) `[yayında]`
- 55 ← 48 (dört düğme ve 4 dolarlık bütçe; depo düzeyi getirme; yorumlayıcı = yarım doğrulayıcı, birim test tam; kod olarak eylem; 1.135 → 580 öğe), 51 (durma kararı; "hızlı başarır, yavaş başarısız olur"; 90,5 → 57,2; Kapoor ilkesi), 52 (hata döngüsü ve dört çıkış; test = dış gözlem; eylem ağacı ve geri alınabilirlik → git; başarısız izler; önce plan ↔ her adımda karar → hat ↔ döngü), 54 (depo bir dünyadır; gözlem test çıktısı; 48'in kod borcu), 53 (yazılım şirketi düzenleri oyuncak görevlerdeydi), 35 (yanlış pozitif; sağlam doğrulayıcı = gizli test), 33 (en iyi-N seçimi; kapsama ↔ altı koşu), 36 (çoğunluk oyu: kırk aday yama), 12 (izlerle ince ayar; sentetik veri = üretilmiş hata), 14 (kolay örnekleri süzme), 16 (cetvel; kirlilik → sızıntı), 40 (ufuk: başaranın süresi), 29/42 (BM25 bulma oranı), 21 (depo pencereye sığmaz), 9 ("yeniden üretme" sözcüğünün ayrımı) `[yayında]`
- 56 ← 55 (her görev sıfırdan; kap), 51 (dört bellek; durum = pencere + görünmeyen dünya; iç eylem = belleğe yazma; 3.500 token kırpma), 52 (son üç ders; beceri kütüphanesi; yansıma; ağırlıklara yazma), 39 (özet ↔ kesme 9,04/9,16; bellek bir getirme sorunudur; anahtar ≠ değer; üçlü puan; "kötü bellek belleksizlikten kötü"; LongMemEval, LoCoMo), 21 (durumsuzluk), 48 (son beş gözlem 15,0 → 18,0), 47 (belleğe işlev çağrısıyla erişim), 37 (pekiştirmeli öğrenme: iç durum), 29 (embedding yakınlığı ile bağlantı), 41 (dış dizin = anlamsal bellek), 46 (yinelemeli getirme ↔ tek adımda yürüyüş), 44 (ortada kaybolma; parçalama bedeli), 42 (BM25), 54 (web ortamı: iş akışları), 23/12 (isteme koyma ↔ ince ayar), 50 (bağlam–bellek çatışması → seçici unutma) `[yayında]`
- 57 ← 16 (cetvel bir tasarım ürünüdür; hata payı; MMLU'yu geçen modeller ↔ GAIA), 51 (beş bitiş sınıfı; puan çağrı sayısıyla okunur), 52 (ilerleme oranı; hata döngüsü → 40 adım), 53 (rol oyunuyla iş arkadaşları; iki sistem birbirinin kümesinde), 54 (insanla kıyas; hakem uyumu 85,3), 55 (test zayıflığı; sızıntı; altı koşu; dolar/görev), 56 (dört yetenek cetveli), 47 (pass^k; τ-bench veritabanı; kullanıcıyı canlandıran model), 45 (hakem yanlılıkları), 33 (çıkarım hesabı; kapsama ↔ pass^k), 40 (ufuk ↔ zaman bütçesi), 13 (aşırı optimizasyon → hile), 8 ("kontrol noktası" sözcüğünün ayrımı → ara hedef) `[yayında]`
- 58 ← 24 (istem enjeksiyonu; talimat hiyerarşisi 32,8 → 95,9 ve 73,7; özel token'lar sıradan metinden üretilemez), 49 (araç zehirleme: açıklama en üste girer; belirtim: her çağrıdan önce onay), 50 (dizine sızan belge → PoisonedRAG), 54 (çevre gürültüsü; ekran ajanı), 57 (kısayol dışarıdan; durum karşılaştırması = AgentDojo yarar işlevi), 47 (çalıştırıcı = araç süzgeci; işlev çağrısı), 46 (düşün–eyle–gözle istemi), 41 (getirici ilgililiğe bakar), 52 (geri alınabilir dünya; önce plan; yansımanın kırılganlığı), 55 (kap; git), 51 (eylem kümesini çevre tanımlar; özerklik ↔ onay), 35 (yanlış pozitif/negatif: dedektör), 13 (doğrudan tercih optimizasyonu: SecAlign), 16 (kalibrasyon → 59) `[yayında]`

**Batch 14 (59–62) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; HANDOFF'un taslağı 59 için
on bir, 60 için on iki, 61 için altı, 62 için beş satırlıktı; 61 ve 62'nin satırları bu run'da ilk kez tam yazıldı.

- 59 ← 58 (onay / kum havuzu dışı komut / alan adı izni; saldırı yüzeyi ↔ onay; her onaysız eylem enjeksiyonun dönüşebileceği eylemdir), 51 (özerklik = döngüyü kapatma kararı; Q(s, dur) ↔ Q(s, devam) → Q(s, devret); politika pencerenin fonksiyonu), 55 (METR RCT: <%44 kabul, %9 gözden geçirme, +%19; öngörü −%24), 54 ("yapılamazsa dur" %54,9 ↔ %44,4), 57 (erken bırakma; hakem uyumu 85–90; iz puanın denetim kaydı; τ²-bench devir), 16 (kalibrasyon = güvenin doğrulukla örtüşmesi), 50 (token olasılığıyla ölçülen güven yanlış belgeye direnir), 35 (yanlış pozitif dersi → reddedici), 47 (yanlış argümanlı çağrı ayrı hata sınıfı; pass^k iki zarı sayar), 13 (tercih eğitimi token kalibrasyonunu bozar: Tian), 39 (çekimserlik — dolaylı), 24 (sistem istemi = ayrıcalık — dolaylı) `[yayında]`
- 60 ← 59 (her devir bir bedel: onay, gözden geçirme, netleştirme, yeniden deneme), 51 (puan çağrı sayısıyla; 4 $ bütçe, 1,21 ↔ 2,52; "hızlı başarır, yavaş başarısız olur"; politika pencerenin fonksiyonu → kendi hatasına koşullanma), 53 (fatura tur × pencere → kare terimi), 55 (Şekil 2 tablosu → geçiş başına bedel; altı koşu 17,33–18,67, pass@6 32,67), 57 (Pareto sınırı; HAL 21/36; TheAgentCompany 4,2 ↔ 0,6 $; Kapoor elli kat; koşu sayısı), 47 (264–804 token; maliyetin %95,9'u girdi; paralel çağrı 7,12 → 3,95 sn; pass^k), 26 (önek paylaşımı: yeniden gönderilir, yeniden hesaplanmaz; program–motor yerelliği), 28 (ilk token süresi / token başına süre; sürekli yığınlama iş hacmini artırır gecikmeye dokunmaz; yığın ↔ gecikme takası), 49 (belirlenimci araç sırası = önbellek), 56 (kesme / özet / sayfalama / iç durum → önek kararı; MEM1 tepe token 3,7×), 21 (durumsuzluk: pencerenin tamamı her tur yeniden gönderilir), 52 (büyük modeli gerektiğinde çağır: 757 ↔ 1.971 token/eylem), 13 (yönlendirici tercih çiftleriyle eğitilir), 33 (çoğunluk oyu ve öz-düzeltme bedeli), 40 (%80 ufku ↔ formül 0,32 katı), 32 (ara adımlar koşullanmayı kırıyor) `[yayında]`
- 61 ← 60 (her ölçüm bir hedef varsaydı), 11 (hizalanmamış; hizalama vergisi; "davranış post-training'den"), 6 (Bahdanau'nun çeviri hizalaması — ayrım açıkça), 13 (ödül modeli = etiketleyicinin seçtiği; aşırı optimizasyon tepesi; KL tasması; uyum %72,6; 64 koordinatı), 16 (Goodhart yasası), 57 (imkânsız test %76; cetvel hedefe dönüşünce), 58 (kum havuzu ajanın kendisine karşı), 37 (getiri, ziyaret sayılarının doğrusal fonksiyonu; durum/eylem/politika), 2 (genelleme; aşırı öğrenme), 9 (ölçek yasaları yeteneğin nasıl büyüdüğünü söyler), 51 (politika pencerenin fonksiyonu → hedef, pencereye düşen durumlara bağlı), 55 (test davranışın örneklemi ↔ hedef), 59 (devir = hedef belirsizken durmak; iz denetimi; izleyici), 49 ("belirtim" sözcüğünün protokol anlamı — ayrım), 24 (talimat hiyerarşisi = Gabriel'in ilk hedefi), 32 (izleyicinin gördüğü ara adımlar) `[yayında]`
- 62 ← 61 (yardımsever/dürüst/zararsız; iki boşluk; uyumsuz genelleme = hedef yanlış genellemesinin güvenlik hâli), 11 (hizalama vergisi; parametreler ortak; yardımseverlik ↔ zararsızlık işareti), 13 (44 bin / 42 bin ayrı kümeler; ödül modeli tek sayı; KL ıraksaması; model üretimi tercih etiketleri işareti), 24 (hiyerarşi eğitimi 83,1 → 60,4; sistem istemi ayrıcalık ve aşırı temkin; özel token'lar), 58 (AgentHarm 85,2 → 16,7; StruQ GCG 97 → 58; dedektör süzgeci), 12 (denetimli ince ayar; talimat izleyen model zararlı talimatı da izler), 19 (ince ayar; unutma; düşük ranklı uyarlama), 20 (açık ağırlık yayımlamanın güvenlik tarafı — vaat taksidi), 16 (iki kümeli cetvel), 2 (aşırı öğrenme: sözcük düzeyinde ezber), 8 (ön eğitimden gelen dil kalıbı: ret öneki), 30 (üretimin ilk token'larını kısıtlamak), 39 (çekimserlik), 59 (netleştirme sorusu), 45 (hakem model: GPT-4 ↔ insan tutarlı; kural puanlayıcı hakem) `[yayında]`

**Batch 17 (71–74) — gerçekleşen graf.** Yazılan metinde fiilen kullanılan bağlar; HANDOFF'un taslağı 71 için
on bir, 72 için on, 73 için on, 74 için sekiz satırlıktı. (63–70'in satırları graf yerine Batch 15 ve 16'nın
kavram-tekrar tablolarına yazıldı.)

- 71 ← 16 (cetvel bir tasarım ürünüdür; liderlik tablosu; kalibrasyon tanımı; 16'nın ileri düzey geri çağrımı), 70 (70'in kapanışı: bir değerlendirme neyi ölçer; eşik ölçümü ve yetenek çıkarımı), 65 (kalibrasyonun kök ortalama kare hatası — **numarasız işaretin tahsili**), 57 (ajan değerlendirmesinin dört sayısı; hile oranı; maliyet kayıtlı koşu), 45 (hakem model ve üç yanlılık; yüzde 17 hakem, yüzde 13 insan sayımı), 67 (değerlendirme farkındalığı; sınavı tanıyan sınanan; yetenek saklama), 68 (marjinal risk ve taban), 69 (denetimin erişimi), 33 (kapsama ve pass@k), 40 (görev ufku), 22 (istem duyarlılığı; biçim 76 puan), 9 (beliren yeteneklerin cetvelle ilişkisi → 78), 14 (kirlilik → 72, "bir sonraki makale") `[yayında]`
- 72 ← 8 (ezber ↔ genelleme; **72 koordinatı**), 16 (tutulan küme; cetvel), 18 (ezberin yeri; nedensel izleme), 31 (kirlilik göndermesi), 14 (tekilleştirme; n-gram tarama; kirlilik tanımı), 71 (geçerlilik zinciri; protokol puanın içinde; hata payı), 55 (çözüm sızıntısı; kod ölçütleri), 57 (tutulan küme; canlı ölçüt), 68 (unutturmanın ölçülmesi; geri kazanım), 41 (parametrik ↔ parametrik olmayan bellek), 2 (aşırı öğrenme; ezberin kayıpla ilişkisi), 9 (ölçekle büyüyen ezber), 20 (açık ağırlık; kılavuz kirliliği), 66 (kimin görüşü — dolaylı) `[yayında]`
- 73 ← 45 (hakem model; yüzde 85 ↔ 81; üç yanlılık; iki sırayla sorma; küçük insan kümesiyle hata kestirimi), 72 (anahtarlı cetvelin sınırı; 71'in sayımı), 71 (insan değerlendirmesi de bir ölçüm; protokol), 57 (izi okuyan hakem ajan; yüzde 90 uzlaşma), 64 (tartışmayı okuyan hakem; yüzde 75 güven süzgeci; bilgisi olmayan hakem), 65 (hakem güveni; kalibrasyon — **numarasız işaretin tahsili**), 66 (hakem de dalkavukluğa açık; kimin görüşü; PRISM), 16 ve 13 (Bradley–Terry; tercih çifti), 38 (süreç denetimi), 52/56 (öz-yansıma ↔ hakem), 44 (sorgu yeniden yazma — dolaylı), 67 (kendini tanıma → durum farkındalığı), 74 (kendini tanımanın içerideki karşılığı, "bir sonraki makale") `[yayında]`
- 74 ← 6 (dikkat ağırlığı "neye baktığı" değildir; **74–77 bandının açılışı**), 18 (nedensel izleme = gürültü giderme; anahtar-değer belleği; Hase: yerelleştirme ≠ düzenleme), 3 (temsil; çok anlamlı nöron; Olah'ın devre incelemesi), 7 (artık bağlantı → artık akış; 12 × 12 = 144 baş; sekiz ayrı bakış), 23 (örnekle öğrenme ↔ indüksiyon başları; işlev vektörü), 9 ve 5 (beliren yetenek ↔ geç genelleme; cetvel → 78), 30 (kısıtlı üretim; logit'ler — devir), 31 (sadakat sözcüğü), 43 (seçicilik ↔ özgüllük ayrımı — dolaylı), 49 (tamlık — dolaylı), 62 (ret yönü), 65 (Azaria'nın iç sınıflandırıcısı), 67 (sonda; model organizması; temsil mühendisliği), 71 (şık harfi yanlılığının makinesi; protokol sonucun içinde), 72 (ezber ile genelleme mekanizma düzeyinde), 73 (hakemin kendini tanıması → içerideki karşılığı) `[yayında]`

- 75 ← 74 (devrenin düğümü sorusu; artık akış; Bolukbasi'nin nöron yanılsaması; Geiger'in döndürülmüş alt uzayı; "bir sonraki makale" devri), 3 (temsil; çok anlamlı nöron — **yetmiş iki makale aralıklı geri çağırma**), 4 ("sözlük" sözcüğünün token dağarcığı anlamı — çakışma adlandırıldı), 2 (kayıp; seyreklik cezası), 7 (artık akışın boyutu; ileri beslemeli katmanın genişliği), 62 (ret yönü), 65 (doğruluk yönü), 67 (sonda; temsil mühendisliği), 74 (sadakat ölçütleri; yama) `[yayında]`
- 76 ← 75 (kelepçeleme; sözlük parçasının çözücü yönü; yönlendirme teriminin gloss'u), 62 (**ret yönü**: tek yön silinince ret kalkıyor), 65 (Azaria'nın iç sınıflandırıcısı — **devrolan planlı tekrarın tahsili**), 66 (karakter vektörü; ince ayar kayması 0,76–0,97), 67 (temsil mühendisliği; sonda; uyuyan ajan sondası; Burns'ün etiketsiz ölçütü), 18 (ROME: ağırlık düzenleme ↔ aktivasyon müdahalesi; Hase), 24 (sistem istemi ↔ aktivasyon: aynı davranışın iki kapısı), 10 (üretim adımına müdahale — PPLM'in yeri), 63 (ağırlığa erişen saldırgan), 69 (denetimin iç erişimi), 72 ("yönlendirmeli tamamlama" çakışması), 74 (yeter ↔ gerekli; uyuyan yol yanılsaması) `[yayında]`
- 77 ← 76 (değiştirmek ↔ açıklamak ayrımı), 45 ("atıf" sözcüğünün kaynak gösterme anlamı — çakışma adlandırıldı), 31 (sadakat tanımı; Turpin'in düzeneği), 66 (Turpin'in sayıları: 36,3 puan), 67 (Lanham; sonradan gerekçe), 74 (atıf yaması; dikkat açıklama değil; yorumlanabilirlik yanılsamaları), 75 (parçalardan kurulan çizge), 22 (istem duyarlılığı ↔ aksiyom adı olarak duyarlılık), 61 (izleyiciye göre yazılan ara adımlar — dolaylı) `[yayında]`
- 78 ← 5 ve 9 (**78 koordinatı**: beliren yetenekler; ölçek yasaları; ikili cetvel), 71 (cetvel bir tasarım ürünüdür; ölçüte çalışmak; öngörülemezlik), 72 (test görevine eğitim; ezber ölçekle büyür), 74 (geç genelleme; ilerleme ölçüsü; indüksiyon başlarının faz geçişi), 16 (cetvel), 23 (örnekle öğrenme ölçekle belirir), 68 ve 70 (eşik ölçümü; yönetişimin dayandığı varsayım), 2 (kayıp ↔ yetenek) `[yayında]`
> **Not:** 79–82'nin graf satırları Batch 19'da eklenmedi; o dörtlünün prerequisite'leri HANDOFF'un ilgili
> "Next batch preparation" bölümünde ve Batch 19 öğrenme notlarında duruyor. Boşluk bilinçli değil, devrolan bir
> eksiktir ve ileride toplu olarak kapatılabilir.

- 83 ← 82 ("bir sonraki makale" devri: gürültüden geri temizleyen üretim), 10 (otoregresif üretim, örnekleme ve **sıcaklık** — kılavuzluğun karşılığı burada kuruldu), 2 (kayıp: ortalama karesel hata yeni bir soruya bağlandı), 26 (ön dolum ↔ adım adım üretim; adım sayısının bedeli), 81 (görüntü yaması; çapraz dikkat ters yönde kullanıldı), 4 (sıkıştırma ↔ sadakat takasının biçimi), 7 (U-Net yerine Transformer omurgası), 16 ve 71 (cetvelin denetimi: FID'in yanlılığı), 72 (çıkarılabilir ezber üretken modelde), 45 (**kesinlik** sözcüğünün çakışması adlandırıldı), 33 (**kapsama** sözcüğünün çakışması adlandırıldı), 6 (**skor** sözcüğünün çakışması adlandırıldı) `[yayında]`
- 84 ← 83 (iki üretim düzeninin ayrımı; "bir sonraki makale" devri), 4 (tokenizasyon bir tasarım kararıdır; alt-kelime mantığı büyük sözlüğün ayrıştırılmasında yeniden çıktı), **30 (kısıtlı üretim — devrolan planlı tekrarın tahsil yeri; biçim garantisi burada mimari zorunluluk)**, 26 (ardışık adımın maliyeti; sıranın bedeli), 7 (nedensel maske sıra varsayımını taşır), 9 (VAR'ın güç yasası), 82 (akustik token'lar zaten ayrıktı — bedelin modaliteye göre değişmesi), 81 (bağlantı yollarının çıktı tarafında asimetrik kalması), 21 ve 25 (pencere bütçesi: görüntü başına 1024 token), 14 (karışım tartışmasının çok modlu hâli), 19/27 (**kuantizasyon** sözcüğünün çakışması adlandırıldı) `[yayında]`
- 85 ← **20 (bağlayıcı koordinat: 671 milyar toplam ↔ 37 milyar çalışan parametre)**, 9 (6ND ve ölçek yasası; **Kaplan–Chinchilla ayrımının biçimi iki taraflı tartışmada yeniden çıktı — altmış makale aralıklı geri çağırma**), 7 (blok içinde ileri beslemeli katmanın payı: çoğaltılacak yer), 27 (bellek duvarı: bedelin taşındığı yer), 28 (yığınlama seyrekliği yiyor), 60 (maliyet ve gecikme hesabı), 19 (uyarlama mantığının mimari karşılığı: seyrek yükseltme), 8 (eğitim döngüsü ve kararlılık) `[yayında]`
- 86 ← **7 (bağlayıcı koordinat: "aynı işi karesel maliyet ödemeden yapan mimariler")** ve **15 (bağlayıcı koordinat: sabit sözlüğü atan mimariler)**, 6 (dikkatin hesabı: ikili sayısı), 26 (anahtar-değer önbelleğinin doğrusal büyümesi — iki ayrı maliyetin ayrılması), 5 (**yinelemeli** ağlar geri döndü ve perplexity'nin ortalama olması — seksen bir makale aralıklı geri çağırma), 79 (ortalama başarı ↔ tutarlı başarı ayrımının mimari hâli), 21 (etkin bağlam), 25 (pencere dikkati), 74 (kopyalama ve indüksiyon tartışmasının zemini), 85 (iki verimlilik ekseni melez modelde birleşiyor) `[yayında]`

- 87 ← 86 ("bir sonraki makale" devri: aynı kaliteyi daha az kaynakla vermenin üçüncü yolu), **34 (numarasız işaretin tahsil yeri: damıtmanın temel modelin sınırını aşması; kapsama eğrisi adıyla anıldı)**, 10 (**sıcaklık** — yumuşak etiketin mekanizması; yetmiş yedi makale aralıklı geri çağırma), 9 (hesap-optimal nokta; ölçek yasasının damıtma hâli), 27 (kuantizasyon: küçültmenin öbür yolu; budama ondan ayrıldı), 16 ve 73 (değerlendiricinin ölçtüğü ile modelin öğrendiği ayrımı; taklidin biçim/olgu farkı), 31 (**sadakat** sözcüğünün çakışması adlandırıldı), 28 (çıkarım maliyeti: küçük modelin gerekçesi) `[yayında]`
- 88 ← 87 ("bir sonraki makale" devri: küçük model nereye gidiyor), **26 (bayt başına yığın büyüklüğü hesabı — cihazda payda 1'e iniyor)**, 28 (sürekli yığınlama ve parçalı ön dolumun cihazda karşılığı yok), 27 (kuantizasyona duyarlı eğitim; "kazanılan taşımadır" kaydı 3 bit ↔ 4 bit ölçümünde çıktı), 19 (düşük ranklı adaptör: hem kalite telafisi hem çoklu görev biçimi), 21 (anahtar-değer önbelleğinin belleği), 86 (bellek hiyerarşisi dersi bir kat aşağı taşındı), 60 (yönlendirici ve maliyet-gecikme ölçütü; cihazda üçüncü ölçüt sınır), 80 (gizlilik iddiasının belgelenmesi) `[yayında]`
- 89 ← 88 ("bir sonraki makale" devri: dört kısıtın üçü donanımdan), **26 (bayt başına 229 işlem — çatı çizgisinin sırt noktası olarak yeniden okundu)**, 28 (gecikme ↔ iş hacmi ayrımının donanım hâli: 7 ms sınırı), 27 (bellek duvarı; hassasiyetin donanım sözleşmesi olması), 85 (hepsi-hepsiye iletişimin kesim bandını zorlaması), 86 (işlem azaltmak duvar saatini azaltmaz; tam dikkat algoritması çatı modelinin varsayımını bozar), 9 (hesap bütçesi ve tepe ↔ ulaşılan hız) `[yayında]`
- 90 ← 89 ("bir sonraki makale" devri: işin elektrik karşılığı), **8 (GPT-3'ün 1.287 MWh / 552,1 ton sayısı — bu kez zincirin kendisi kuruldu, seksen iki makale aralıklı geri çağırma)**, 9 (6ND ve hesap bütçesi), 20 (bildirilen eğitim maliyeti; para ile enerjinin ayrı eğriler olması), 85 (seyrek modelin enerji üçlüsü 4M'in birinci satırı olarak yeniden okundu), 89 (özel çip 4M'in ikinci satırı), 26 ve 28 (boşta yanan enerji: yığınlamanın ikinci gerekçesi), 16 ve 71 (ölçüm koşullarının bildirilmesi) `[yayında]`
- 91 ← 90 ("serinin bir sonraki fazı" ve "bir sonraki makale" devri: bir kelimenin sayı dizisine çevrilmesi hangi matematiksel nesneyi kuruyordu), **4 (embedding ve dağılımsal hipotez — seksen yedi makale aralıklı geri çağırma; bu kez soru "aritmetik doğru mu" değil, "soru neden sorulabilir")**, 3 (katman = doğrusal dönüşüm + aktivasyon; aktivasyonun gerekçesi burada bileşke matrisiyle kanıtlandı), 6 (nokta çarpımın içi açıldı: uzunluk çarpı kosinüs), 7 (matris çarpımının mimarideki yeri; norm sözcüğünün katman normalleştirmeden ayrımı), 39 (kosinüs benzerliği glosssuz geçmişti, resmî kurulum burada), 43 (birim kürede en büyük nokta çarpım = en yakın komşu), 29 (uzun belgenin normu sıralamaya giriyor), 5 (boyutluluk lanetinin uzaklık ölçüsündeki yüzü), 89 (donanımın gördüğü okuma: koordinat listesi) `[yayında]`
- 92 ← 91 ("bir sonraki makale" devri: sıkıştırmak ne demek), **19 (rank ve içsel boyut — burada tekil değer diliyle yeniden okundu; yetmiş üç makale aralıklı geri çağırma)**, 76 ("tekil değer ayrışımı" glosssuz geçmişti, resmî kurulum burada), 42 (sözcük eşleşmesinin yapısal kusuruna verilen ilk cevap: gizli anlamsal indeksleme), 18 (anahtar-değer belleği okuması rank-1 düzenlemenin varsayımı), 7 (artık bağlantının **ikinci** işi: rank çöküşünü durdurmak; #2'nin bozulma çerçevesiyle karıştırılmaz), 6 (çok başlı dikkatte baş boyutu ↔ dizi uzunluğu darboğazı), 87 (budama ve seyrek alt ağın rank okuması) `[yayında]`
- 93 ← 92 ("bir sonraki makale" devri: modelin ürettiği şey vektör değil dağılım), **10 (örnekleme ve sıcaklık — burada üstel ailenin parametresi olarak yeniden kuruldu; seksen üç makale aralıklı geri çağırma)**, 5 (dil modelleme hedefi ve olasılık dağılımı), 2 (kayıp fonksiyonunun olasılıksal kimliği ve aşırı öğrenmenin en büyük olabilirlik hâli), 33 (kapsamanın biçimsel kimliği: yerine koyma hesabı ↔ yansız tahminci), 16 ve 65 (kalibrasyonun beklenti tanımı), 36 (çoğunluk oyunun ortalamaya yaklaşma okuması), 6 (softmax'ın neden üstel olduğu), 37/45/60 ("beklenen" sözcüğünün tek tanımı) `[yayında]`
- 94 ← 93 ("bir sonraki makale" devri: kaybın birimi neyi sayar), **13 (numarasız işaretin tahsil yeri: KL ıraksamasının biçimsel kurulumu; referans modelden uzaklaşmanın nat cinsinden bütçe olduğu gösterildi)**, 9 (nat/token birimi ve Chinchilla formülünün 1,69'luk tabanı = dilin kendi entropisi), 2 (indirgenemez hatanın bilgi kuramındaki karşılığı), 5 (perplexity'nin biçimsel tanımı), 15 (token'lama farkı perplexity'yi karşılaştırılamaz kılıyor; bayt başına bit çözümü), 87 (damıtma kaybının KL biçimi ve ters KL'nin gerekçesi), 33 ve 36 (n adaydan en iyisini seçmenin KL bedeli) `[yayında]`
- 95 ← 94 ("bir sonraki makale" devri: kaybı gerçekten azaltan mekanizma), **2 (bağlayıcı olmayan ama en somut geri çağırma: 3/14 eşiği burada 2/λ teoreminin özel hâli olarak türetildi; doksan üç makale aralıklı)**, 91 (gradyan bir vektördür ve yönlü türev nokta çarpımdır — en dik iniş teoremi 91'in eşitsizliğinden çıkar), 92 (Hessian simetriktir; özdeğerler eğriliği, oranları koşul sayısını verir), 8 (ısınma, kosinüs sönümü ve AdamW'nin gerekçeleri burada mekanizmaya bağlandı), 3 (geriye yayılım gradyanı hesaplar, gradyan inişi kullanır — ayrım korundu), 9 (kayıp eğrisinin okunması ve NaN satırının anlamı), 19 (eniyileyici durumunun bellek payı) `[yayında]`
- 96 ← 95 ("bir sonraki makale" devri: azalttığımız sayı umursadığımız sayı değil), **2 (aşırı öğrenme, indirgenemez hata, düzenlileştirme ve Geman ayrışımı — dördü de burada biçimsel olarak yeniden kuruldu; doksan dört makale aralıklı)**, 94 (eğitim kaybının ampirik dağılıma göre ölçülmesi; sıkıştırma ↔ genelleme bağı), 9 (çift inişin randevusu 9'da kapanmıştı, burada üç eksene açıldı), 72 (Zhang'ın rastgele etiket deneyi orada kanıt, burada **neyi çürüttüğü**), 18 (kapasite ↔ ezber gerilimi), 92 (kovaryansın özdeğer profili iyi huylu aşırı uydurmanın koşulu), 93 (en büyük olabilirliğin kusuru), 79 (bütün muhasebenin altındaki aynı-dağılım varsayımı) `[yayında]`
- 97 ← 96 ("bir sonraki makale" devri: muhasebe sinir ağlarına özgü değil), **43 (k-ortalamalar orada bir dizin aracıydı, burada kendi işinde; ve "yakın"ın tanımının yöntemin varsayımı olması — elli dört makale aralıklı)**, 91 (üç cetvelin zıt sıralaması en yakın komşunun varsayımına bağlandı), 92 (temel bileşen çözümlemesi ile k-ortalamaların işi ayrıldı; çekirdek numarası nokta çarpım üzerinden kuruldu), 5 (boyutluluk lanetinin olasılık yüzü), 94 (Quinlan'ın bölme ölçütü entropi kazancıdır), 95 (gradyan artırma kaybın negatif gradyanına uydurulan adımdır; dışbükeylik ve tek dip), 16 (taban çizgisi kültürü ve puanın protokolüyle okunması), 23 (TabPFN'in isteme koyarak öğrenmesi), 1 ve 2 (model tanımı ve kaybın seçimi yöntem ailesine bakmaz) `[yayında]`
- 98 ← 97 ("serinin bir sonraki fazı" devri: koşulu okuma alışkanlığını literatüre uygulamak), **4 ve 91 (Levy–Goldberg–Dagan'ın "sihir algoritmada değil" sonucu; orada embedding bilgisiydi, burada bir okuma dersi — doksan dört ve yedi makale aralıklı çift geri çağırma)**, 96 (rastgele etiket deneyinin özetindeki iki cümlenin farklı kanıt türleri taşıması; düzgün yakınsama sonucu zinciri sıkılaştıran ayrı çalışma olarak), 95 (Adam'ın kanıt hatası bir kanıt dersi olarak geri geldi), 16 (protokolsüz puanın okunamaması), 71–73 (değerlendirme biliminin okuyucu tarafı), 9 (ölçülen nokta ile uydurulan eğrinin ayrımı), 20 (kanıt yayımlanmamışsa iddia-kanıt bağı ilkece kurulamaz) `[yayında]`
- 99 ← 98 ("bir sonraki makale" devri: deneyin tasarlandığı taraf; ablasyon terimi 98'de kurulmuştu ve burada tasarım kararı oldu), **97 (taban çizgisi kültürü yöntem seçiminden deney tasarımına taşındı — planlanan tekrar tahsil edildi)**, 96 (rastgele etiket deneyi bir "kontrollü bozma" örneği olarak yeniden okundu; 85,75 ↔ 9,78 karşılaştırmasının deneyi deney yapan şey olduğu gösterildi), 16 (değerlendirme kümesi seçimi bir tasarım kararıdır), 95 (hiperparametre araması bir bütçedir), 63 (aynı adı taşıyan "rastgele arama"nın başka nesnesi; çakışma açıkça adlandırıldı) `[yayında]`
- 100 ← **1–99'un tamamı** (serinin planlı büyük geri çağrımı; 41 ayrı makaleye numaralı gönderme). Omurga olarak 1 ve 2 (tahmin çerçevesi ve 3/14 eşiği), 8/9 (ölçek ve tahsis), 11–13 (amacın yazılışı), 16/71 (cetvel sorusu), 21–33 (pencere ve fatura), 41–60 (dışarıya bağlanmak), 61–80 (hizalama ve değerlendirme), 85–90 (mimari ve enerji faturası), 91–97 (biçimsel omurga), 98–99 (okuma ve tasarım). **Yeni kavram, yeni kaynak ve yeni ölçüm yok** `[yayında]`
- 101 ← **16 ve 22 (BAĞLAYICI KOORDİNAT: ölçümün disiplini; ikisinin de cümlesi açılışta alıntılandı)**, 71 (puanın örneklem olması ve standart hata; 101 onun üstüne karar katmanını koydu, tekrarlamadı), **33 ve 40 (pass@k ile görev ufkunun planlı tekrarı — dört batch'lik devirden sonra burada tahsil edildi)**, **93 ve 96 (yanlılık ↔ oynaklık ayrımının ölçüm istatistiğindeki karşılığı; 93'ün "bir sonraki faz" işareti burada ödendi)**, 99 (Şekil 3'te bilerek açık bırakılan karar sorusu), 97 (179 sınıflandırıcının "fark anlamlı değil" cümlesinin yeri), 72 (sabit bölmenin yaşlanması), 6 (BLEU bir ortalama değildir), 43/93/97 (daha önce tanımsız kullanılan "istatistiksel olarak anlamlı" ifadesi burada kuruldu) `[yayında]`
- 102 ← 101 ("bir sonraki makale" devri: anlamlı fark ile tekrarlanabilirliğin ayrımı), **9 (yeniden üretme terimi orada tanımlanmıştı, burada üç dereceye ayrıldı — doksan üç makale aralıklı)**, 98 (kanıt yayımlanmamışsa bağ kurulamaz; Haibe-Kains itirazı bunun kurumsal hâli), 20 (açıklık eksenleri; hesap ekseninin eklenmesi), 80 (şeffaflık ve belgeleme; zorunluluğun davranışı değiştirmesi), **72 (kirlilik ile veri sızıntısı ayrımı bir "Kendini yokla" kutusuyla yapıldı)**, 97 (klasik yöntemin üstünlüğünün sızıntıdan doğması), 99 (ön kayıt ile bilgi çizelgesinin akrabalığı; yirmi beş yapılandırmadan ikisi) `[yayında]`
- 103 ← **6 ve 7 (mimarinin kendisi; 6'nın sorgu-anahtar-değer üçlüsü ile 7'nin blok anatomisi ilk kez tek bir çalışan modelde birleşti)**, **100 ve 102 (numarasız işaretlerin ödendiği yer: "kasıtlı boşluk" ve "serinin bir sonraki fazı")**, 4 (token ve embedding tablosu), 10 (logit'in dağılıma çevrilmesi), 91 (boyut muhasebesi), 93 (softmax'ın dağılım olarak okunması), 8 (6ND kuralının sınanması), 15 (embedding tablosunun model içindeki payı), 99 (GELU ↔ taban çizgisi farkının sapmanın altında kalması), 26 (mikro modelin anahtar-değer önbelleği) `[yayında]`
- 104 ← 103 ("bir sonraki makale" devri: rastgele ağırlıkları döngüye yazdırmak), **4 (BPE algoritması orada anlatılmıştı, burada çalıştırıldı — yüz makale aralıklı)**, **15 (sözlük boyunun tahsis kararı kendi derleminde ölçüldü)**, 8 (eğitim döngüsü, ısınma ve kosinüs sönümü), 14 (veri hazırlığının bu ölçekteki karşılığı ve yokluğu), 95 (AdamW), **2 ve 94 (indirgenemez hata ile entropinin aynı sayıda buluşması)**, **99 ve 101 (koşular arası sapma kendi deneyimize uygulandı — zorunlu geri çağırma)**, 102 (ayrılmış sınama kümesinin olmadığının açıkça söylenmesi), **6 (dikkat ağırlığının açıklama olmaması kendi modelimizde ölçüldü)** `[yayında]`
- 105 ← 104 ("bir sonraki makale" devri: eğitilen modelin asistanlaştırılması), **12 (kayıp maskesi; maskenin koruma alanı ölçüldü)**, **13 (DPO, Bradley–Terry ve tasma; 0,693 başlangıç değeri aynen çıktı)**, 11 (hizalama vergisi), **94 (KL'nin nat cinsinden ölçü olması)**, **101 (aynı farkı örnekleyerek ölçmenin 58 çekiliş etmesi — zorunlu geri çağırma)**, 10 (üretimin çekiliş olması), 16 (değerlendirmenin ne ölçtüğü) `[yayında]`
- 106 ← **89 (çatı çizgisi ve işlem yoğunluğu ORADA kuruldu; burada tekrarlanmadı, eğitim adımına uygulandı)**, **26 (yoğunluk = ağırlık bir kez okunduğunda işlenen token sayısı; üretim tarafındaki hâli)**, 28 (gecikme ↔ iş hacmi ayrımı), 8 (eğitim koşusunun kaynak profili ve kontrol noktası), 95 (AdamW'nin parametre başına bedeli), 25 ve 86 (FlashAttention'ın bellek merdivenindeki yeri), 27 (karma hassasiyet), 39 (donanım belleği ↔ sohbet belleği ayrımı), 7 (karesel maliyetin bellek tarafındaki karşılığı), 105 ("bir sonraki makale" devri: dizüstü bilgisayardan veri merkezine) `[yayında]`

- 107 ← **106 (kapanmayan defter: 16 bayt, 275 GB ve %52; 106'nın kapanışı dört ekseni adıyla sordu)**, **8 (veri ve model paralelliğinin adı ORADA konmuştu, kurulumu buraya ertelenmişti — doksan dokuz makale aralıklı tahsil)**, **85 (hepsi-hepsiye iletişim ORADA kurulmuştu; burada tekrarlanmadı, dört eksenin yanına beşinci bir eksen olarak YERLEŞTİRİLDİ ve yoğun modelde hiç bulunmadığı söylendi)**, **89 (kesim bandı ve kartlar arası bağın en yavaş büyüyen eksen olması; 892 GB/s ↔ 12,9 TB/s ölçümü oraya bağlandı)**, 95 (eniyileyici durumunun parametre başına payı ZeRO kademelerinin formülünde göründü), 26–28 (çıkarım tarafındaki bölme kararlarıyla karşıtlık) `[yayında]`
- 108 ← 107 ("bir sonraki makale" devri: kaybın kalan yarısı kartın içinde), **106 (sırt noktası ve bellek merdiveni; 1,5 TB/s bandı birleştirme hesabında kullanıldı)**, **86 ve 25 (FlashAttention'ın NE YAPTIĞI orada anlatıldı; burada tekrarlanmadı — mekanizma çekirdek mühendisliğinin genel biçimine taşındı ve softmax'ın bağımlılık sınırı olarak yeniden okundu)**, **89 (hızlandırıcıyı hızlı yapan şeyin çıkarılanlar olması; 16 katlık birim farkı onun öbür yüzü)**, 8 (6ND muhasebesinin gizli varsayımı: her işlemin aynı süreyi alması), 27 (kuantizasyonun eğitim tarafındaki karşılığı: duyarlık bir çekirdek kararı), 101 (hangi cetvelin geçerli olduğu sorusu; kullanım oranı ↔ bellek kullanım verimi), 10/97 ("çekirdek" sözcüğünün çakışması açıkça adlandırıldı) `[yayında]`
- 109 ← **8 (466 kesinti, 419 beklenmedik, kontrol noktasının tanımı ORADA verildi; 109 onları tekrarlamadı, üzerine karar katmanını koydu ve 419'dan M = 185,6 dakikayı kendi türetti)**, 106 (kontrol noktasının hacmi 16 baytlık defterden çıkar: 6,48 TB), 107 (durumun kartlara bölünmüş olması iki aşamalı kaydı mümkün kılıyor; kabarcık formülü kullanım oranının ölçekle düşmesiyle aynı yöne işaret ediyor), **99 (bir düzeltmenin neyi düzelttiğini bilmek için ayrı bir deney gerekir — PaLM'ın eleme koşusu bunun alan içi örneği)**, 101 (ölçümün gürültüsü ve koşular arası sapma), 102 (veri sırasının yeniden üretilebilirliği bir operasyon aracına dönüştü), 74/78 ("sıçrama" sözcüğünün çakışması açıkça adlandırıldı) `[yayında]`
- 110 ← **1 (BAĞLAYICI OLMAYAN İŞARET: "tarafların gerekçeleriyle karşılaşacaksın"; 110 tartışmayı sürdürmek yerine ölçülebilir hâlini kurdu)**, **37 (Markov karar sürecinin geçiş fonksiyonu; dünya modeli onun öğrenilmiş kopyası olarak tanımlandı)**, **77 (Othello sondası ve müdahale ORADA kuruldu; burada tekrarlanmadı, sınanan şeye dönüştürüldü)**, **13 (aşırı optimizasyon; hayalî çevrenin kusurlarının sömürülmesi aynı biçimin başka nesnesi)**, 69 (erişim kademeleri: davranış tabanlı sınav modelin içine erişmeden çalışır), 51–60 (sapma oranı ajan döngüsünün karşılığı), 81–90 (çoklu modalite fazının devri) `[yayında]`
- 111 ← **110 ("bir sonraki makale" devri: modeli bir gövdeye bağlamak; sapma tablosu gövdede kendiliğinden uygulanan bir sınav olarak yeniden okundu)**, **51 (BAĞLAYICI OLMAYAN İŞARET: "modelin gördüğü eylem kümesi ona göre çizilmiş bir arayüzdür"; ALFWorld'ün dokuz şablonu TEKRARLANMADI, gerçek kolda 256 kutu × 8 sayı × 1–3 Hz olarak ÖDENDİ)**, **47 (biçim geçerliliği değeri zorlamaz; eylem vektöründe aynı ayrım fiziksel hâle geldi)**, **81 ("gövde" sözcüğünün çakışması açıkça adlandırıldı; görüntü-dil modeli görme-dil-eylem modeline dönüştü)**, 40 (görev ufku ve geri alınamayan hata; düzeltmenin dışarıdan gelmesi gövdede bir insana indi), 37 (sürekli eylem uzayı), 27 (kuantizasyon ↔ ayrıklaştırma ayrımı adlandırıldı), 23 ("gösterim" sözcüğünün çakışması adlandırıldı), 8 (15,6 trilyon token; veri kıtlığı karşılaştırmasının paydası), 9 (veri ekseninin fiyatı burada takvim), 13 (vekilin yeterince zorlanınca kırılması) `[yayında]`
- 112 ← **111 ("dünya hareket ediyor" devrinin ürün katmanına taşınması)**, **39 ve 56 (BAĞLAYICI OLMAYAN İŞARET: kalıcı belleğin üç aşaması ve iç durum ORADA kuruldu; 112 tekrarlamadı, "ağırlığa mı bağlama mı" kararına çevirdi ve ölçüsünü verdi)**, **19 (unutma; sürekli ön eğitim ve düşük ranklı uyarlama)**, **68 (unutturma) ve 56 (seçici unutma) — üç sözcüğün ayrımı gövdede adlandırıldı**, **92 (rank-bir güncelleme; 112 iki satırlık sayısal örneğini kurdu)**, **74–77 (yerelleştirme araçları; "yer bilmek düzenleyebilmek değildir" oraya bağlandı)**, **110 (okunabilir temsil ↔ doğru model; kardeş cümle)**, 105 (hizalama vergisi 0,77 — ikinci yolun ölçülmüş faturası), 41–44 (getirme bir güncelleme alternatifi), 109 (kademeli sonra ani kopuşun biçimi), 71 (ölçütün bir vekil olması), 106–109 (baştan eğitmenin bedeli) `[yayında]`
- 113 ← **112 ("bilgi eskiyor" ↔ "bilgi henüz yok" devri)**, **35 (üretmek–doğrulamak asimetrisi ORADA kuruldu; 113 onu laboratuvara taşıdı ve doğrulayıcıyı model olmaktan çıkardı)**, **99 ve 102 (ön kayıt ve bağımsız doğrulama; CASP ikisinin kurumsallaşmış hâli olarak okundu)**, **101 (güven aralığıyla verilen ölçüm)**, **110 (durum uzayı gerçek durumu içermiyorsa ölçüm ne söyler — düzensiz katı örneği)**, **17 (uydurma; değerlendiricinin varlık sebebi)**, 77 (gradyan tabanlı atıf bir sanıyı daraltmak için kullanıldı), 111 (yan ürün ↔ peşin ödenmiş altyapı ayrımının kardeşi), 16 ve 71 (ölçülemeyen iddianın ağırlığı), 98 (iddia, kanıt ve kanıtın menzili) `[yayında]`
- 114 ← **8 (6ND ve 3,8×10²⁵; veri hattı)**, **9 (bütçenin bölünmesi; Chinchilla tahsisi)**, **15 (tokenizer: pay sıfır, bağlayıcılık en yüksek)**, **11–13 (post-training; %1,78 ve 1,3 ↔ 175 milyar)**, **106–109 (planın faturaya dönüştüğü halka; kullanım oranı ve `√(2δM)`)**, **72 (okunan geri okunmaz: değerlendirme kararı veri kararında alınır)**, **20 ve 61–70 (yayım: geri alınması kurumun elinde olmayan tek karar; yayım gradyanı ve yapısal erişim)**, **100 (AYRIM AÇIKÇA YAPILDI: 100 harita, 114 zincir — yer ↔ sıra)**, 26 ve 28 (çıkarım maliyetinin ömür boyu ödenmesi), 71 (geçerlilik zinciri), 102 ve 80 (hangi halkanın belgelendiği), 105 (0,77'lik vergi), 99 (geri alma maliyeti bir tasarım ölçütü), 64 (ilkeleri kimin yazdığı: FLOP'la tartılamayan halka) `[yayında]`

**Faz düzeyinde bağımlılıklar (yeni fazlar; makale-düzeyi satırlar ilgili batch hazırlığında yazılır):**

- Faz 10 ← Faz 1–2 çekirdeği (formalize edilen kavramların sezgisel kurulumları) + 19 (92 için LoRA).
- Faz 11 ← Faz 10 (istatistiksel test için 93/94), 16 ve 71–73 (ölçüm pratiği).
- Faz 12 ← Faz 10 (matematiksel dil) + 6–8 (mimari/eğitim) + 11–13 (post-training, 105 için).
- Faz 13 ← 8–9 (eğitim koşusu, bütçe), 26–28 (çıkarım sistemleri karşılığı), Faz 12 (elle kurulmuş model zihinsel somutluk sağlar).
- Faz 14 ← serbest sentez; 114 ← 8–13 + 106–109; 115 ← 41–60.

## Kavram-tekrar defteri (Batch 0 + Batch 1 kavramları)

Her satır: kavram → ilk kurulduğu makale → Batch 0 içinde **gerçekleşen** geri çağrımlar →
ileride **planlanan** geri çağrımlar (her biri kısa yeniden kurulumla).

Kanıt notu (SOZLESME §3): bir sonraki makaledeki hatırlatma köprü işlevi görür; kalıcılığı
sağlayan asıl tekrar 10+ makale sonraki bilinçli geri çağrımlardır (Cepeda ve ark. 2008).
Aşağıdaki "planlanan" sütunu bu uzun aralıklı tekrarları tutar.

| Kavram | İlk | Batch 0'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Kural yazmak vs veriden öğrenmek | 1 | 2 (giriş köprüsü: "yol ayrımı") | 8 (ön eğitimde "kural yok, veri var"), 22 (prompt kural mı?), 51 (ajan döngüsünde kurallar geri döner) |
| Model = ayarlanabilir fonksiyon | 1 | 2 (parametrelerle somutlaştı), 3 (doğrunun duvarı) | 7 (dev fonksiyon olarak Transformer), 18 (bilgi fonksiyonun içinde), 103 (fonksiyonu elle kurmak) |
| Tahmin = görülmemiş girdiye çıktı | 1 | 5 (dil modelinde aynı tanım) | 16 (değerlendirme neyi ölçer), 31 (reasoning tahmin midir) |
| Parametre / ağırlık | 2 | 3 ("ağırlık ve sapma = 2. makaledeki parametreler"), 4 (embedding satırları da parametredir) | 8 (milyarlarca parametre), 19 (LoRA: az parametre değişir), 27 (kuantizasyon), 92 (rank ve SVD ile içyapı) |
| Kayıp fonksiyonu | 2 | 3 (gradyanın kaynağı), 4 (embedding'i kim yazıyor), 5 (sonraki-token kaybı = perplexity) | 9 (ölçek yasası eğrileri kayıpla çizilir), 13 (ödül ≈ ters kayıp), 38 (süreç ödülü), 94 (çapraz entropi olarak formal kimliği) |
| Gradyan inişi | 2 | 3 (backprop ile birleşti), 4 (defteri eğitim yazar), 5 (dil modeli aynı döngü) | 8 (dev ölçekte aynı döngü), 12–13 (fine-tuning aynı mekanizma), 95 (yakınsama kuramı) |
| Öğrenme döngüsü şeması (Şekil 1/2) | 2 | 5 ("2. makaledeki döngünün aynısı") | 8 (ön eğitim aynı döngü — şekli yeniden çağır), 104 (döngüyü elle kurmak) |
| Genelleme / aşırı öğrenme | 2 | 3 (AlexNet'te dropout'a selam) | 8 (veri tekrarı), 16 (benchmark ezberi), 72 (contamination), 18 (ezber vs genelleme), 96 (genelleme kuramı) |
| İndirgenemez hata | 2 | — | 16 (tavan neden var), 65 (belirsizlik türleri) |
| Nöron, katman, aktivasyon | 3 | 4 (ağın kapısı) | 7 (Transformer blokları), 74–76 (interpretability aynı katmanlara bakar) |
| Temsil (representation) | 3 | 4 (embedding = temsil, açık atıfla) | 29 (anlamsal arama), 75 (features), 91 (vektör uzayı olarak formal hâli) |
| Token | 4 | 5 (dil modelinin birimi) | 10 (token token üretim), 15 (tokenizer derinlemesine), 21 (bağlam token sayar), 26 (maliyet token başına), 104 (tokenizer'ı kurmak) |
| Embedding | 4 | 5 (Bengio köprüsü: embedding'in tarihsel kökeni) | 6 (statik→bağlamsal), 29 (arama), 43 (vektör DB), 91 (matematiği) |
| Dağılımsal hipotez | 4 | 5 (bağlamdan tahmin aynı fikir) | 8 (ölçekte anlamın örtük öğrenimi) |
| Statik vektörün duvarı ("yüz") | 4 | 5 (kapanış köprüsü, aynı örnekle) | **6 (açılış problemi — aynı örnekle başlanacak)** ✓ gerçekleşti |
| Dil modeli = sonraki-token dağılımı | 5 | — | 6–8 (mimari bu hedefe hizmet eder), 10 (dağılımdan örnekleme), 17 (halüsinasyonun kökü), 23 (ICL), 93 (koşullu dağılım olarak formal hâli) |
| Perplexity | 5 | — | 9 (ölçek yasası metriği), 16 (değerlendirme metriği olarak sınırı), 94 (entropinin üsteli olarak formal kimliği) |

### Batch 1'de gerçekleşen tekrarlar (planlananların tahsili)

Batch 0 kavramlarının 6–10'da fiilen nerede geri çağrıldığı:

| Kavram | Batch 1'de gerçekleşen |
|---|---|
| Kural yazmak vs veriden öğrenmek | 8 ("kuralları elle yazmayı denemiş ve tükenmiştik; ön eğitimde tek bir kural yazılmaz") ✓ |
| Model = ayarlanabilir fonksiyon | 7 (kapanış: "düğmeli kutu hâlâ geçerli; değişen tek şey düğme sayısı") ✓ |
| Tahmin = görülmemiş girdiye çıktı | 10 (tek cümlelik geri çağırma) ✓ |
| Parametre / ağırlık | 7 (blok parametre hesabı: 62.984.192), 8 (N), 9 (tahsis ekseni) ✓ |
| Kayıp fonksiyonu | 8 (sonraki-token kaybı, her konumda ayrı), 9 (L(N,D) = 1,69 + …) ✓ |
| Gradyan inişi | 7 (bir cümle), 8 (dev ölçekte aynı döngü + AdamW notu) ✓ |
| Öğrenme döngüsü şeması (2, Şekil 1) | 8 (açılış köprüsü, **adıyla** anıldı) ✓ |
| Genelleme / aşırı öğrenme | 8 (veri tekrarı bir bütçe kararıdır), 9 (aşırı eğitim ≠ aşırı öğrenme + çift iniş) ✓ |
| İndirgenemez hata | 9 (Chinchilla'nın 1,69 tabanı) ✓ **Batch 0'da boştu, ilk kez gerçekleşti** |
| Nöron, katman, aktivasyon | 6 (dönüşüm = katmanın işi), 7 (blok anatomisi + "aktivasyonsuz tek doğru") ✓ |
| Temsil | 6 (bağlamsal temsil), 7 (her blok yeni bir temsil üretir) ✓ |
| Token | 8 (eğitim bütçesinin birimi), 10 ("model kelime değil token üretir") ✓ |
| Embedding | 6 (defterden çekilen satırın üzerine yazmak), 7 (paylaşılan embedding tablosu) ✓ |
| Dağılımsal hipotez | 8 ("kimse modele 'çay' ile 'kahve'nin benzer olduğunu söylemedi") ✓ |
| Statik vektörün duvarı ("yüz") | 6 (açılış problemi, **aynı üç cümleyle**) ✓ |
| Dil modeli = sonraki-token dağılımı | 6, 7 (logit → softmax → dağılım), 8, 9, 10 ✓ |
| Perplexity | 9 (nat/token'ın üsteli), 10 (kavşak sezgisi + "modelin kendi metnine verdiği perplexity" ayrımı) ✓ |

### Batch 1'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 1'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Bağlamsal temsil (dikkat) | 6 | 7 (blok içinde), 10 (üretimde) | 29 (anlamsal arama), 74–77 (devreleri okuma), 86 (SSM eleştirisi) |
| Sorgu / anahtar / değer | 6 | 7 (çok başlı dikkat) | 25 (uzun bağlam), 26 (KV cache — K ve V tam olarak bunlar), 37 (RL "değer"inden ayrışma), 103 (elle kurulum) |
| Softmax | 6 | 7 (logit → dağılım), 10 (sıcaklık softmax'ın şeklini değiştirir) | 30 (kısıtlı üretim), 65 (kalibrasyon), 93 (olasılık dağılımı olarak formal hâli) |
| Nedensel maske | 7 | 10 (üretim yönü) | 26 (KV cache neden çalışır) |
| Transformer bloğu / katman yığını | 7 | 8 (ölçeklenen şey bu) | 85 (MoE bloğu değiştirir), 86 (alternatif mimariler), 103 (elle kurulum) |
| Paralellik ↔ üretimin sıralılığı | 7 | 10 (otoregresif döngü paralelleşmez) | 26, 28 (serving ekonomisinin kökü), 106–108 (donanım gerçeği) |
| Ön eğitim / temel model | 8 | 9 (ölçek yasaları ön eğitim kaybını ölçer), 10 (elimizdeki şey bir metin tamamlayıcı) | 11 (post-training haritası), 114 (uçtan uca sentez) |
| Öz-denetimli öğrenme | 8 | — | 12 (SFT: etiket geri geliyor), 41 (parametrik bilginin sınırı) |
| Hesap bütçesi / FLOP / 6ND | 8 | 9 (bütün tahsis aritmetiği buna dayanır) | 27 (kuantizasyon), 33 (çıkarım-zamanı hesap), 89–90 (donanım, enerji), 106 (roofline) |
| Veri karışımı / tekilleştirme | 8 | 9 (veri duvarı, epok tekrarı) | 14 (ayrıntı), 18 + 72 (ezber), 112 (sürekli öğrenme) |
| Ölçek yasası / güç yasası | 9 | — | 33 (test-time ölçekleme), 78 (emergence), 87 (damıtma), 116 (açık sorular) |
| Hesap-optimal eğitim | 9 | — | 19 (LoRA ekonomisi), 28 (çıkarım maliyetiyle birleşik tahsis), 114 |
| Aynı eğri, iki cetvel (metrik seçimi) | 9 | — | 16 (değerlendirme), 71–73, 78 (emergence tartışması), 101 (ölçüm disiplini) |
| Otoregresif üretim döngüsü | 10 | — | 25, 26, 28 (üretimin maliyet yapısı), 32 (CoT aynı döngüde uzar), 40 (uzun ufuk) |
| Sıcaklık / kesme aileleri | 10 | — | 30 (yapılandırılmış çıktı), 36 (self-consistency çekilişe dayanır), 66 (model karakteri) |
| Akıcılık ≠ doğruluk | 10 | — | 17 (halüsinasyon), 45 (kaynak sadakati), 65 (kalibrasyon) |

### Batch 2'de gerçekleşen tekrarlar (planlananların tahsili)

Batch 0 ve Batch 1 kavramlarının 11–14'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 2'de gerçekleşen |
|---|---|
| Öğrenme döngüsü + kayıp (2) | 11 ("dört adım aynen geçerlidir"), 12 (SFT aynı döngü, etiket insandan), 13 (ödül = tersine çevrilmiş kayıp) ✓ |
| Denetimli öğrenme (1) | 11 ("SFT üçüncü bir öğrenme türü değil") ✓ |
| Öz-denetimli öğrenme (8) | 11 ("bedava öğle yemeği biter"), 12 (merdivenin yalnızca yarısı) ✓ |
| Temel model (8) | 11 (açılış kavramı) ✓ |
| Sıcaklık / örnekleme / açgözlü seçim (10) | 13 ("dört cevap nereden geliyor" — tercih verisi çekilişle üretilir) ✓ |
| Otoregresif döngü (10) | 12 ("cevap sonu" işareti olmadan üretim durmaz) ✓ |
| Maskeleme (6) ve nedensel maske (7) | 12 (kayıp maskesi — aynı fikrin üçüncü kullanımı) ✓ |
| Sigmoid (3) | 13 (Bradley-Terry olasılığı) ✓ **on makale aralıklı geri çağırma** |
| Aşırı öğrenme / kapasite (2) | 12 (küçük modelde talimat ince ayarının zararı; 16 epok paradoksu), 14 (tekrarın eşiği) ✓ |
| Genelleme (2) | 11 (hizalama vergisinin sebebi) ✓ |
| Perplexity (5) | 12 (LIMA: perplexity üretim kalitesiyle bağlantılı değil) ✓ |
| Aynı eğri, iki cetvel (9) | 11 (1,3 milyar > 175 milyar), 12 (doğrulama kaybı ↔ insan tercihi), 13 (cetvel optimize edilince bozulur) ✓ |
| PF-gün ve hesap bütçesi (8, 9) | 11 (3.640 ↔ 4,9 ↔ 60 PF-gün) ✓ |
| Hesap-optimal tahsis (9) | 14 (karışım da bir tahsis kararıdır) ✓ |
| Veri hunisi / tekilleştirme / veri karışımı (8) | 14 (tam kurulum; "ayrıntısı 14'te" borcu ödendi) ✓ |
| Veri duvarı ve epok tekrarı (9) | 14 (16 epok yarılanma, etkin token) ✓ |
| Derlem (4) | 14 (C4, FineWeb, FineWeb-Edu) ✓ |
| Embedding (4) | 14 (FineWeb-Edu puanlayıcısı embedding üstünde çalışır) ✓ |
| Token (4) | 12 (kayıp maskesi token düzeyinde), 14 (bütçenin birimi) ✓ |
| Hizalama — çeviri anlamı (6) | 11 (ikinci anlamla ayrımı açıkça yapıldı) ✓ **defterdeki uyarı tahsil edildi** |
| few-shot (5) | 11 (istemle kurulan davranışın sınırı) ✓ |
| Akıcılık ≠ doğruluk (10) | 12 ("akıcı bir cevap üretir, doğru olmasının bir sebebi yoktur") ✓ |

### Batch 2'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 2'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Post-training (üç duraklı hat) | 11 | 12, 13, 14 (her biri bir durağı açar) | 19 (LoRA post-training'in içinde), 34 (doğrulanabilir ödül dördüncü durak), 105 (küçük ölçekte uygulama), 114 (uçtan uca sentez) |
| İnce ayar | 11 | 12 (SFT), 13 (tercih ince ayarı) | 19 (LoRA), 104–105 |
| Denetimli ince ayar (SFT) | 11 | 12 (mekanizma), 13 (referans model) | 61 (hizalama sorunu), 105 |
| Hizalama vergisi | 11 | 13 (tasmanın bedeli) | 61, 62 (güvenlik eğitiminin bedeli), 71 (ölçüm) |
| Hizalanmamış model / niyet açığı | 11 | 13 | 61 (hizalama sorunu tam kurulumu), 67 |
| Kayıp maskesi | 12 | 13 (kaybın neyi saydığı) | 103–105 (elle kurulum) |
| Sohbet biçimi / özel işaretler | 12 | — | 24 (roller ve sistem istemleri), 30 (kısıtlı üretim) |
| Yüzeysel hizalama hipotezi | 12 | 14 (post-training verisinin ölçeği) | 18 (bilgi nerede durur), 61, 116 (açık sorular) |
| Sentetik veri | 12 | 14 (model çöküşü tartışması) | 34 (doğrulanabilir ödülle üretim), 64 (RLAIF), 87 (damıtma) |
| Ödül modeli | 11 | 13 (Bradley-Terry, vekil olma) | 34, 35 (doğrulayıcılar), 38 (süreç ödülü), 73 (LLM-as-judge) |
| Tercih optimizasyonu / DPO | 13 | — | 37 (RL temelleri), 61–62, 105 |
| Politika | 13 | — | 37 (MDP içinde biçimsel tanım), 34 |
| KL ıraksaması | 13 | — | 65 (kalibrasyon), 94 (bilgi kuramı: formal kurulum) |
| Aşırı optimizasyon / Goodhart | 13 | 14 (kalite vekili olarak sınıflandırıcı) | 16 (benchmark'lar hedefe dönüşünce), 63 (jailbreak), 71–73, 116 |
| Üretmek ↔ doğrulamak asimetrisi | 13 | — | 35 (doğrulama), 36 (self-consistency), 73 |
| Engel listesi / filtrenin taraflılığı | 14 | — | 68 (kötüye kullanım), 79 (robustluk), 80 (model kartları) |
| Kirlilik (contamination) | 14 | — | 16 (değerlendirme), 72 (tam kurulum) |
| Model çöküşü | 14 | — | 87 (damıtma), 112 (sürekli öğrenme), 116 (açık sorular) |
| Etkin token / tekrarın getirisi | 14 | — | 104 (kendi eğitim koşun), 107 (dağıtık eğitim bütçesi) |
| Veri rızası ve lisans | 14 | — | 69 (yönetişim), 80 (şeffaflık), 116 |


### Batch 3'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 15–18'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 3'te gerçekleşen |
|---|---|
| Token (4) | 15 (birimin kendisi sorgulandı — defterdeki "15: tokenizer derinlemesine" planı tahsil edildi) ✓ |
| BPE ve sözlük (4) | 15 (bölme adımlarının devamı; sözlük boyları 50.257 / 100.277 / 200.019) ✓ |
| Türkçenin token maliyeti (4) | 15 (33/60/46 ölçümü tiktoken ile yeniden üretildi ve üç faturaya bağlandı) ✓ |
| Embedding tablosunun parametre payı (4, 7) | 15 (sözlük boyu ↔ katman bütçesi tahsisi), 18 (olgu satıra sığmaz) ✓ |
| Anlamın geometrisi (4) | 15 (CUTE: aynı geometri yazılışı taşımıyor) ✓ |
| Kesme aileleri ve üretim bir çekiliştir (10) | 15 (kelime başına kaç zar atıldığı dile göre değişir) ✓ |
| Karesel dikkat maliyeti (7) | 15 (harf düzeyi bölmenin neden ödenemez olduğu) ✓ |
| Hesap-optimal tahsis (9) | 15 (sözlük boyu yeni bir tahsis ekseni), 18 (daha çok veri genellemeye mecbur bırakır) ✓ |
| Perplexity (5) | 16 ("ölçmenin tuzakları 16'da" randevusu kapandı; aynı tokenizer şartı sayıyla gösterildi) ✓ |
| Aynı eğri, iki cetvel (9) | 16 (makalenin ekseni) ✓ |
| Doğrulama kaybı ↔ insan tercihi (12) | 16 (LIMA ayrışması içsel cetvelin sınırı olarak) ✓ |
| Kullanım dağılımı (11) | 16 (yüzde 45,6 ↔ yüzde 2,6: çoktan seçmeli sınavın kapsam sorunu) ✓ |
| Bradley-Terry (13) | 16 (arena puanlarının aynı olasılık modeliyle kurulması) ✓ **üç makale aralıklı geri çağırma** |
| Aşırı optimizasyon / Goodhart (13) | 16 (küme hedefe dönüşünce), 17 (yeni küme eklemek neden çözüm değil) ✓ |
| Kirlilik (14) | 16 (değerlendirmeye etkisi işaretlendi, tam kurulum 72'ye) ✓ |
| FineWeb-Edu ölçümü (14) | 16 (MMLU 33→37, ARC 46→57 bu kez "ne ölçüldü" sorusuyla okundu) ✓ |
| Üretim kuralları (10) | 16 (şık okuma protokolü), 17 (uydurmanın kökü çekilişte) ✓ |
| Akıcılık ≠ doğruluk (10) | 17 (makalenin açılış gerilimi — defterdeki "17: halüsinasyon" planı tahsil edildi) ✓ |
| InstructGPT uydurma oranı (11) | 17 (yüzde 41 → 21 sayısı ölçme tartışmasına bağlandı) ✓ |
| Ödülün memnuniyeti ölçmesi (13) | 17 (kendinden emin cevabın tercih edilmesi) ✓ |
| Hizalama vergisi (11) | 17 (çekimserlik öğretmenin bedeli) ✓ |
| Tekilleştirme ve bir kez geçen belge (8, 14) | 17 (tek seferlik olgu uydurmanın tabanıdır) ✓ |
| Yüzeysel hizalama hipotezi (12) | 17 (Gekhman'ın dikkatli sürümü) ✓ |
| İleri beslemeli katmanın parametre payı (7) | 18 (bloğun üçte ikisi ne yapıyor) ✓ |
| Artık bağlantı (7) | 18 (belleklerin bileşimi katmanlar boyunca birikir) ✓ |
| Ezber ölçümü (8) | 18 ("gerilim 18 ve 72'de" borcunun 18 ayağı ödendi) ✓ |
| Aşırı öğrenme (2) | 18 (ezber ne zaman zorunlu, ne zaman imkânsız) ✓ **on altı makale aralıklı geri çağırma** |
| Llama 3'ün 15,6 trilyon token'ı (9) | 18 (kapasite ↔ veri oranı hesabı) ✓ |
| Dikkat bilgiyi taşır (6) | 18 (anahtar-değer belleğiyle iş bölümü) ✓ |

### Batch 3'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 3'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Token ızgarası bir tümevarım yanlılığıdır | 15 | 16 (perplexity ölçeği), 17 (—) | 21 (bağlam sınırı token sayar), 26 (maliyet token başına), 86 (ızgarayı kaldıran mimariler), 104 (tokenizer'ı elle kurmak) |
| Sözlük boyu ↔ hesap tahsisi | 15 | — | 27 (kuantizasyon), 85 (MoE), 91–92 (matris boyutlarının matematiği), 106 (bellek bütçesi) |
| Karakter düzeyi görevlerin zorluğu | 15 | — | 30 (kısıtlı üretim), 32 (ara adımlar kaybı geri getirir), 79 (robustluk) |
| Sayı bölünmesi ↔ aritmetik | 15 | — | 32–34 (akıl yürütme eğitimi), 35 (doğrulama) |
| benchmark | 16 | 17 (puanlama kuralı), 18 (—) | 71 (değerlendirme bilimi), 72 (kirlilik), 78 (emergence), 101 (ölçüm disiplini) |
| Liderlik tablosu ve seçici yayımlama | 16 | 17 (teşvik argümanı) | 71, 73, 80 (şeffaflık), 102 (tekrarlanabilirlik) |
| İstem biçimi duyarlılığı | 16 | — | 22 (prompt mühendisliği kanıta dayalı bakış), 79 (robustluk) |
| Kalibrasyon | 16 | 17 (kalibre model uydurmak zorundadır) | 65 (tam kurulum), 93–94 (olasılık ve bilgi kuramı) |
| Hata payı / istatistiksel anlamlılık | 16 | — | 101 (biçimsel kurulum), 102 (tekrarlanabilirlik) |
| İçsel ↔ dışsal uydurma | 17 | 18 (—) | 41 (RAG sınıfı değiştirir), 45 (kaynak sadakati), 65 |
| Uydurmanın istatistiksel tabanı (tek seferlik olgular) | 17 | 18 (kapasite tartışmasının komşusu) | 41, 65, 72, 96 (genelleme kuramı) |
| Anlam öbekleriyle belirsizlik ölçme | 17 | — | 36 (self-consistency aynı çekilişe dayanır), 65, 73 |
| Anahtar-değer belleği | 18 | — | 74–77 (devreleri okuma), 85 (MoE bloğu değiştirir), 103 (elle kurulum) |
| Nedensel izleme ve model düzenleme | 18 | — | 74–77 (yorumlanabilirlik araçları), 112 (sürekli öğrenme) |
| Parametre başına bilgi kapasitesi | 18 | — | 27 (kuantizasyon), 87 (damıtma), 96 (genelleme kuramı), 106 (bellek) |
| Ters çevirme laneti (geri çağırmanın yönü) | 18 | — | 23 (bağlamda çıkarım yapılabiliyor), 41 (dış kaynak neden yardım eder), 96 |

### Batch 4'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 19–22'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 4'te gerçekleşen |
|---|---|
| İnce ayar (11) | 19 (defterdeki "LoRA biçimi 19'da" randevusu kapandı) ✓ |
| Geriye yayılım (3) | 19 (her parametre için bir türev → gradyan belleği) ✓ **on altı makale aralıklı geri çağırma** |
| Blok matrislerinin parametre sayımı (7) | 19 (4.096 × 4.096 = 16,8 milyon; düşük rankla binde 3,9) ✓ |
| Denetimli ince ayar (12) | 19 (talimat verisi düzeni), 21 (sohbet biçimi ve özel token'lar) ✓ |
| Hesap-optimal / ölçek tartışması (9) | 19 (model büyüdükçe içsel boyut küçülür), 20 (PF-gün cetveli) ✓ |
| Ön eğitim ve 6ND kuralı (8) | 19 (sürekli ön eğitim), 20 (kural GPT-3'te sınandı, sonra yeni modele uygulandı) ✓ |
| GPT-3 ön eğitimi 3.640 PF-gün (11) | 20 (6ND'den türetilen 3.634 ile çapraz doğrulandı) ✓ |
| Ölçüm disiplini (16) | 19 (yüzde 99,3 iddiası), 20 (blog yazısıyla duyurma; şeffaflık endeksinin kendisi bir cetvel), 21 (ilan edilen uzunluk), 22 (makalenin ekseni) ✓ |
| Aşırı optimizasyon / Goodhart (13) | 20 (şeffaflık göstergeleri hedefe dönüşünce) ✓ |
| Veri hattı, telif ve lisans (14) | 20 (OSI tanımının veri maddesi; en düşük puanlı şeffaflık alanları) ✓ |
| Ezber ölçümü (18) | 20 (derlem incelenemezse bu ölçüm yapılamaz) ✓ |
| İnce ayar kötü bir bilgi kanalıdır (17, 18) | 19 (Ovadia ölçümüyle sayıya bağlandı) ✓ |
| Tekrarın ezberi artırması (8, 14, 18) | 19 (on yeniden yazım doğruluğu 0,504'ten 0,588'e taşıdı) ✓ |
| Hizalama ve hizalama vergisi (11, 13) | 20 (ince ayar güvenlik davranışını aşındırıyor) ✓ |
| Otoregresif döngü (10) | 21 (durumsuzluğun kaynağı) ✓ |
| Token ızgarası ve dil başına maliyet (4, 15) | 21 (pencere Türkçede daha hızlı doluyor) ✓ |
| Karesel dikkat maliyeti (7) | 21 (pencereyi 8 kat büyütmek dikkati 64 kat artırır) ✓ |
| Pozisyon kodlaması (7) | 21 (eğitim uzunluğunun ötesine genelleme sorunu) ✓ |
| Anahtar-değer belleği (18) | 21 (anahtar-değer **önbelleğinden** açıkça ayrıştırıldı) ✓ |
| Perplexity içsel bir ölçüdür (5, 16) | 21 (uzun bağlamda işaret ters dönüyor) ✓ |
| Dikkat bilgiyi taşır (6) | 21 (talimatla belgeyi ayırmaz) ✓ |
| İstem biçimi duyarlılığı (16) | 22 (defterdeki "22: kanıta dayalı bakış" planı tahsil edildi; ortanca aralık ve taşınmazlık eklendi) ✓ |
| Küme büyüklüğü ↔ anlamlı fark (16) | 22 (50 örnekte 4 puan iki örnek eder) ✓ |
| Sayı bölünmesinde ara adım (15) | 22 (ara adımların dar uygulama alanı) ✓ |

### Batch 4'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 4'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| İçsel boyut | 19 | 20 (—) | 91–92 (matris rankının matematiği), 96 (genelleme kuramı) |
| Düşük ranklı uyarlama ve rank | 19 | 20 (uyarlama ekosistemi), 21 (önek ayarının bedeli) | 27 (kuantizasyonla birleşimi), 92 (matris çarpanlarına ayırma), 112 (sürekli öğrenme) |
| Öğrenme ↔ unutma değiş tokuşu | 19 | 20 (güvenlik davranışı da bir davranıştır) | 61–70 (hizalamanın sökülmesi), 112 (sürekli öğrenme) |
| Kuantizasyon | 19 | 20 (türev ekosistemi) | 27 (tam kurulum), 87 (damıtma), 106 (bellek bütçesi) |
| Uzmanlar karışımı ve aktif parametre | 20 | 21 (—) | 85 (tam kurulum), 106–107 (eğitim sistemleri) |
| Açık ağırlık ↔ açık kaynak ayrımı | 20 | 21 (—) | 69 (düzenleme), 80 (şeffaflık), 102 (tekrarlanabilirlik) |
| Açıklık cilası ve blog yazısıyla duyurma | 20 | — | 71 (değerlendirme bilimi), 73, 102 |
| Şeffaflık endeksi | 20 | — | 71, 80, 101 |
| Durumsuzluk | 21 | 22 (—) | 24 (roller), 26 (önbellek), 39 (bellek), 51–60 (ajanlar) |
| Bağlam penceresi | 21 | 22 (pencerenin içine ne yazılacağı) | 23, 25, 26, 30, 39, 41 |
| Anahtar-değer önbelleği | 21 | — | 26 (tam kurulum), 28 (servis ekonomisi), 106 (bellek bütçesi) |
| Etkin bağlam uzunluğu | 21 | — | 25 (uzun bağlam teknikleri), 71 (değerlendirme bilimi) |
| Ortadaki bilginin kaybı | 21 | 22 (ilgisiz metin zarar verir) | 41 (getirilen belgelerin sırası), 45 (kaynak sadakati), 79 (robustluk) |
| Talimat ile belgenin aynı diziye karışması | 21 | — | 24 (roller), 61–70 (güvenlik), 51–60 (ajanlar) |
| İstem mühendisliği ve ölçme disiplini | 22 | — | 23, 30 (kısıtlı üretim), 79 (robustluk), 101 (istatistiksel disiplin) |
| Rol (persona) etkisinin öngörülemezliği | 22 | — | 24 (roller), 66 (model karakteri) |
| Otomatik istem araması | 22 | — | 23, 34 (doğrulanabilir ödül), 102 (tekrarlanabilirlik) |


### Batch 5'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 23–26'da fiilen nerede geri çağrıldığı:

| Kavram | Batch 5'te gerçekleşen |
|---|---|
| few-shot (5) | 23 (defterdeki "mekanizması 23'te" randevusu kapandı) ✓ **on sekiz makale aralıklı geri çağırma** |
| İstem biçimi duyarlılığı (16, 22) | 23 (biçim gösterimin taşıyıcısıdır), 24 (sohbet şablonu biçim farklarının en büyüğü) ✓ |
| Örnek sırası duyarlılığı (22) | 23 (mekanizma tartışmasında gradyan inişinden ayrışmanın ölçütü) ✓ |
| Rol (persona) etkisinin öngörülemezliği (22) | 24 (sistem istemine ne yazılmayacağı) ✓ |
| Davranış ucuz, bilgi pahalı (19) | 23 (997 örnek ince ayarla başa baş: 47,2 ↔ 47,7) ✓ |
| Bağlamdaki bilgi ↔ ağırlıktaki bilgi (18) | 23 ("öğrenme" tartışmasının kilidi) ✓ |
| Durumsuzluk (21) | 23 (kazanç pencereyle birlikte gider), 24 (model kendi hatasını da taşır), 26 (her tur bütün dizi) ✓ |
| Karesel tur maliyeti (21) | 26 (27.500 → 5.000: önbelleğin kazancı) ✓ |
| Anahtar-değer önbelleği (21) | 26 (tam kurulum; defterdeki randevu kapandı) ✓ |
| Etkin bağlam uzunluğu (21) | 25 (esnetilmiş modellerde de geçerli) ✓ |
| İlan edilen ↔ ölçülen ayrımı (16, 21) | 25 (esnetme ilan edilen sayıyı üretir, etkin sayıyı değil) ✓ |
| Sohbet biçimi ve özel token'lar (12) | 24 (defterdeki "roller ve sistem istemleri 24'te" randevusu kapandı) ✓ |
| Pozisyon kodlaması (7) | 25 (esnetmenin tam olarak neyi değiştirdiği) ✓ **on sekiz makale aralıklı geri çağırma** |
| Karesel dikkat maliyeti (7) | 25 (FlashAttention işlem sayısını değil bellek trafiğini azaltır), 26 (dikkatin kendi maliyeti kalır) ✓ |
| Softmax toplamı bir olan ağırlıklar üretir (6) | 25 (dikkat çukurunun sebebi) ✓ **on dokuz makale aralıklı geri çağırma** |
| Nedensel maske (7) | 26 (anahtar ve değerler sonradan değişmez → önbellek mümkün) ✓ |
| Sorgu / anahtar / değer üçlüsü (6) | 26 (neyin saklanıp neyin saklanmadığı) ✓ |
| Otoregresif döngü (10) | 24 (tur sonu token'ı durdurur), 26 (adım adım üretim; akışın sebebi) ✓ |
| 6ND kuralı ve 2N işlem (8) | 26 (bellek ↔ hesap muhasebesinin çıkış noktası) ✓ |
| Ölçüm disiplini (16) | 25 (kısa görevleri ayrı ölçmek), 26 ("hızlı model" tek başına bir özellik değil) ✓ |
| Hizalama vergisi (11) | 24 (talimat hiyerarşisinin fazla temkin bedeli) ✓ |
| Temel model ↔ asistan ayrımı (11) | 24 (temel model sohbet şablonunu tanımaz) ✓ |
| Tokenizer'ın sözlüğü (4) | 24 (özel token'lar sıradan metinden üretilemez) ✓ **yirmi makale aralıklı geri çağırma** |
| Perplexity içsel bir ölçüdür (5, 16, 21) | 25 (esnetme çalışmalarının ölçme alışkanlığı) ✓ |
| BLEU: çeviri kalitesi cetveli (6) | 23 (chrF2++ aynı aileden) ✓ |
| Kuantizasyon (19) | 26 (sonraki makalenin köprüsü) ✓ |

### Batch 5'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 5'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Örnekle öğrenme | 23 | 24 (modelin kendi cevabı bir gösterim gibi çalışıyor), 26 (uzun öneklerin maliyeti) | 30 (kısıtlı üretim), 32 (ara adımlar), 34 (doğrulanabilir ödül), 41 (getirilen belgeler birer gösterimdir) |
| Gösterim | 23 | 24 (yanlış gösterim olarak modelin kendi cevabı) | 32, 41, 51–60 (ajan örnekleri) |
| Görev tanıma ↔ görev öğrenme | 23 | — | 31 (akıl yürütme tartışması), 78 (beliren yetenekler), 96 (genelleme kuramı) |
| many-shot | 23 | 26 (önek olarak maliyeti) | 25 (—), 39 (bellek), 41 (getirme ile karşılaştırma) |
| Konuşmacı rolü | 24 | 26 (sistem istemi öneki) | 39 (kalıcı bellek), 51–60 (araç rolü), 61–70 (güvenlik sınırı) |
| Sohbet şablonu | 24 | — | 28 (servis katmanı), 30 (yapılandırılmış çıktı), 102 (tekrarlanabilirlik) |
| Talimat hiyerarşisi | 24 | — | 61–70 (tam kurulum), 51–60 (araç çıktısının güven düzeyi) |
| İstem enjeksiyonu | 24 | — | 61–70 (tam kurulum), 41 (getirilen belge güvenilmez içeriktir) |
| Çok turlu kararsızlık | 24 | — | 39 (kalıcı bellek), 51–60 (ajan döngüleri), 71–73 (değerlendirme bilimi) |
| Pozisyon enterpolasyonu | 25 | — | 86 (alternatif mimariler), 91–92 (matematiksel kurulum) |
| Dikkat çukuru | 25 | — | 74–77 (yorumlanabilirlik), 86 (alternatif mimariler) |
| FlashAttention | 25 | 26 (bellek trafiği ↔ işlem sayısı ayrımı) | 28 (servis), 106–107 (eğitim sistemleri) |
| Pencere dikkati | 25 | — | 39 (bellek stratejileri), 86 |
| Ön dolum ↔ adım adım üretim | 26 | — | 27 (kuantizasyon hangisini hızlandırır), 28 (tam kurulum), 33 (test anında hesap) |
| Bellek bant genişliği | 26 | — | 27, 28, 106 (eğitim sistemleri bütçesi) |
| Gruplandırılmış sorgu dikkati | 26 | — | 85 (uzmanlar karışımıyla birlikte), 86, 106 |
| Sayfalı dikkat | 26 | — | 28 (servis sistemleri), 51–60 (ajan oturumları) |


### Batch 6'da gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 27–30'da fiilen nerede geri çağrıldığı:

| Kavram | Batch 6'da gerçekleşen |
|---|---|
| Kuantizasyon (19) | 27 (defterdeki "tam kurulum 27'de" randevusu kapandı) ✓ **sekiz makale aralıklı** |
| Parametre = sayı (2) | 27 (ızgaraya yuvarlanan şey) ✓ **yirmi beş makale aralıklı geri çağırma** |
| Aktivasyon (3) | 27 (aykırı değerlerin yaşadığı yer) ✓ **yirmi dört makale aralıklı geri çağırma** |
| Parametre başına bilgi kapasitesi (18) | 27 (int8'de 2 bit korunuyor, int4'te 0,7'ye düşüyor — 18'de geçilen kısım tahsil edildi) ✓ |
| Aşırı öğrenme (2) | 27 (kalibrasyon kümesine fazla uyum) ✓ |
| Hesap-optimal tahsis ve Chinchilla oranı (9) | 27 (fazla eğitilmiş model kuantizasyona daha kırılgan) ✓ |
| Ölçüm disiplini / iki cetvel (9, 16) | 27 ("neredeyse aynı, hangi cetvelde"), 29 (embedding liderlik tabloları) ✓ |
| Perplexity içsel bir ölçüdür (5, 16) | 27 (GPTQ tablosunun okunma biçimi) ✓ |
| Transformer bloğu (7) | 27 (kuantizasyon bloğuyla karıştırılmaması için ayrım) ✓ |
| 229 işlem/bayt oranı (26) | 28 (makalenin açılış hesabı) ✓ |
| Ön dolum ↔ adım adım üretim (26) | 27 (hangisini hızlandırıyor), 28 (çatışmanın kaynağı) ✓ |
| 2N işlem / 6ND kuralı (8, 26) | 28 (312 katlık ön dolum ↔ üretim asimetrisi bundan türetildi) ✓ |
| Bellek bant genişliği (26) | 27, 28 (yığının tavanını bellek belirler) ✓ |
| Sayfalı dikkat ve önek paylaşımı (26) | 28 (radix ağacıyla otomatikleşti) ✓ |
| Otoregresif döngü (10) | 28 (bir istek token sayısı kadar geçiş ister), 30 (cevap alanı önce gelince koşullanacak ara adım kalmıyor) ✓ |
| Sıcaklık ve açgözlü seçim (10) | 28 (kabul oranı açgözlü seçimde yükseliyor) ✓ |
| Bigram modeli (5) | 28 (sıfır maliyetli taslak model) ✓ **yirmi üç makale aralıklı geri çağırma** |
| Sistem istemi sabit önektir (24) | 28 (önek paylaşımının asıl faydalanıcısı) ✓ |
| 997 örneklik istem (23) | 28 (değişmeyen önek olarak bir kez ödenir) ✓ |
| Embedding defteri ve anlam haritası (4) | 29 (defterdeki "29: anlamsal arama" planı tahsil edildi) ✓ **yirmi beş makale aralıklı** |
| Bağlamsal temsil ve nokta çarpım (6) | 29 (çapraz kodlayıcının üstünlüğü ve ikili kodlayıcının benzerlik ölçüsü) ✓ |
| Öğrenme döngüsü ve kayıp (2) | 29 (aynı döngü, sıralama hedefi ölçen bir kayıpla) ✓ |
| Gösterim seçimi bir arama işidir (23) | 29 (getirilen şeyin belge ya da örnek olması mekanizmayı değiştirmiyor) ✓ |
| İstem enjeksiyonu (24) | 29 (getirilen belge güvenilmez içeriktir) ✓ |
| Kod çözme adımındaki dağılım (10) | 30 (maske çekilişten önce dağılımı daraltıyor) ✓ |
| Kesme aileleri (10) | 30 (maskeden önce mi sonra mı uygulandığı sonucu değiştiriyor) ✓ |
| Token ızgarası bir tümevarım yanlılığıdır (15) | 30 (köprü token'ları; hizasız kısıt on puana varan kayıp veriyor) ✓ |
| Maskeleme (6), nedensel maske (7), kayıp maskesi (12) | 30 (dördüncü kullanım açıkça ayrıştırıldı) ✓ |
| Ara adımların ölçülen kazancı (22) | 30 (şemanın alan sırası onu siliyor) ✓ |
| Belirsizliği azaltmak: biçim kuralı (22, 24) | 30 (defterdeki "30: kısıtlı üretim" planı tahsil edildi) ✓ |
| Akıcılık ≠ doğruluk / uydurma (17) | 30 (kusursuz biçimlenmiş bir uydurma) ✓ |

### Batch 6'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 6'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Aykırı değer | 27 | 28 (—) | 74–77 (yorumlanabilirlik: aynı boyutlar), 86 (alternatif mimariler), 106–108 (çekirdek tasarımı) |
| Kuantizasyon bloğu ve kuantizasyon sabiti | 27 | 29 (vektör depolamasına genişledi) | 87 (damıtma), 88 (uçta yapay zekâ), 106 (bellek bütçesi) |
| Eğitim sonrası kuantizasyon ↔ kuantizasyona duyarlı eğitim | 27 | — | 87, 88, 106–109 (eğitim sistemleri) |
| Cevap değişimi (dağılım uzaklığı ölçüsü) | 27 | — | 71 (değerlendirme bilimi), 73 (LLM-as-judge), 101 (ölçüm disiplini) |
| Bit genişliği ↔ parametre sayısı değiş tokuşu | 27 | 28 (yığına yer açmak) | 87, 88, 90 (enerji ve maliyet), 106 |
| Fazla eğitilmiş model kuantizasyona daha kırılgan | 27 | — | 96 (genelleme kuramı), 106–107, 116 (açık sorular) |
| Sürekli yığınlama ve yineleme düzeyinde çizelgeleme | 28 | — | 51–60 (ajan oturumları), 60 (ajan ekonomisi), 115 (ürün kurmak) |
| Seçici yığınlama | 28 | — | 106–108 (çekirdek ve bellek mühendisliği) |
| Parçalı ön dolum ↔ ayrıştırma | 28 | — | 106–109 (eğitim ve servis sistemleri), 115 |
| İlk token süresi ↔ çıktı token'ı başına süre | 28 | 29 (kurulum ↔ sorgu maliyeti ayrımının aynı biçimi) | 33 (test anında hesap), 60, 115 |
| Spekülatif üretim, taslak model ve kabul oranı | 28 | 30 (kısıtlı üretimi hızlandırmak için kullanılıyor) | 33 (test anında hesap), 35 (doğrulama asimetrisi), 87 (damıtma) |
| Önek ağacıyla otomatik yeniden kullanım | 28 | 29 (—) | 39 (bellek), 51–60 (ajan döngüleri) |
| Anlamsal arama ve getirme | 29 | 30 (—) | 41–50 (getirme fazının tamamı), 56 (ajan belleği), 112 (kişiselleştirme) |
| Çapraz kodlayıcı ↔ ikili kodlayıcı | 29 | — | 42–44 (getirme hattı), 73 (değerlendiren modeller), 45 (kaynak sadakati) |
| Bulma oranı | 29 | — | 45 (RAG değerlendirmesi), 71, 101 |
| Tek vektörün boyut sınırı | 29 | — | 43 (vektör veritabanları), 46 (getirme-akıl yürütme sistemleri), 91–92 (matematiksel kurulum), 116 |
| Hibrit arama ve yeniden sıralama | 29 | — | 42, 44, 45 |
| İç içe temsil (kısaltılabilir embedding) | 29 | — | 43 (indeksleme maliyeti), 87, 92 |
| Kısıtlı üretim ve üretim maskesi | 30 | — | 47 (araç çağırma), 51–60 (ajan çıktıları), 103 (elle kurulum) |
| Yerel maske ↔ küresel olasılık ayrışması | 30 | — | 36 (arama ve planlama), 93 (olasılık kuramı), 116 |
| Şemanın alan sırası bir performans kararıdır | 30 | — | 32 (ara adımlar), 47 (function calling), 57 (ajan değerlendirmesi) |
| Sözdizimsel geçerlilik ≠ anlamsal geçerlilik | 30 | — | 35 (doğrulama), 47–48 (kod ve araçlar), 55 (kod yazan ajanlar) |


### Batch 7'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 31–34'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 7'de gerçekleşen |
|---|---|
| Şemanın alan sırası ara adımları siliyor (30) | 31 (açılış gerilimi), 32 (Wei'nin "cevaptan sonra gerekçe" ablasyonu bu bulgunun kurucu hâli) ✓ |
| Ara adımların ölçülen kazancı ve dar alanı (22, karar #47) | 31 (kazanç gerçek, sadakat ayrı), 32 (meta-analizin eşittir işareti kırılımı) ✓ |
| Sayı bölünmesi ve ara adım (15) | 32 (somut zincir örneğinin gerekçesi) ✓ |
| Ölçüm disiplini: tek puan değil dağılım (16) | 31 (elli sürümün dağılımı; şablon üretiminin elle denetimi), 33 (zorluk kestiriminin maliyeti) ✓ |
| Görev tanıma ↔ görev öğrenme (23) | 31 (sekiz doğru gösterim ilgisiz cümleyi kapatmıyor) ✓ **sekiz makale aralıklı** |
| Gösterimlerdeki etiketlerin rolü (23, karar #53) | 32 (geçersiz ara adımlarla kazancın yüzde 80–90'ı korunuyor — aynı örüntünün kardeşi) ✓ |
| Ezber ↔ genelleme (18) | 31 (aynı gerilim olgu değil yordam düzeyinde) ✓ **on üç makale aralıklı** |
| Kirlilik (14) | 31 (özgün küme puanının dağılımın sağ kuyruğunda olması) ✓ **on yedi makale aralıklı** |
| Otoregresif döngü (10) | 32 (cevaptan sonra yazılan hiçbir şey cevabı etkileyemez), 33 (üretim bir çekiliştir → paralel eksen) ✓ |
| Sabit katman sayısı ve blok yapısı (7) | 32 (sabit derinlik, sıralı hesabın sınırı) ✓ **yirmi beş makale aralıklı geri çağırma** |
| Dağılımsal hipotez ve derlem (4, 8) | 32 (eğitim verisinin yerel yapısı) ✓ **yirmi sekiz makale aralıklı geri çağırma** |
| 6ND kuralı ve hesap bütçesi (8, 9) | 33 (eğitim ↔ çıkarım takası; log-log doğrusunun çıkarımdaki karşılığı) ✓ |
| GPT-3'ün 3,14×10²³ işlemi (8, 20) | 33 (çıkarım hesabının ölçek karşılaştırması) ✓ |
| 2N işlem, ön dolum ↔ adım adım üretim (26) | 33 (düşünme token'ları faturanın pahalı tarafında) ✓ |
| Önek paylaşımı ve yığınlama (26, 28) | 33 (paralel adayların maliyet avantajı) ✓ |
| İlk token süresi ↔ çıktı token'ı başına süre (28) | 33 (sıralı düzeltmenin gecikme faturası) ✓ |
| Ödül modeli ve aşırı optimizasyon (13) | 34 (kural tabanlı ödülün gerekçesi; Goodhart duruyor) ✓ |
| KL cezası ve kırpma (13) | 34 (GRPO'nun amaç işlevindeki iki tanıdık parça) ✓ |
| Post-training haritası ve hizalama vergisi (11) | 34 (dördüncü durak; soğuk başlangıçtaki geçici gerileme; dil tutarlılığı ödülünün bedeli) ✓ |
| Sentetik veri (12) | 34 (kendi çözümlerinden öğrenme, doğrulama filtresiyle) ✓ |
| İnce ayar hizalamayı bozar (19), açık ağırlık (20) | 34 (güvenlik notu) ✓ |
| Kusursuz biçimlenmiş uydurma (17) | 31 (gerekçenin ikna ediciliği sadakat değildir) ✓ |

### Batch 7'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 7'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Akıl yürütme (tanım ve "yeni hedef" ölçütü) | 31 | 32, 33, 34 | 40 (uzun ufuk), 78 (beliren yetenekler), 116 (açık sorular) |
| Sadakat (gerekçe ↔ gerçek sebep) | 31 | 34 (sonuç ödülü gerekçeyi denetlemez) | 38 (süreç denetimi), 74–77 (yorumlanabilirlik), 57 (ajan değerlendirmesi) |
| İçerik etkisi | 31 | — | 71–73 (değerlendirme bilimi), 101 (ölçüm disiplini), 118 (sentez) |
| Doğrusallaştırılmış alt grafik eşlemesi | 31 | — | 72 (kirlilik), 96 (genelleme kuramı), 116 |
| Düşünce zinciri | 32 | 33, 34 | 36 (arama), 38, 40, 51–60 (ajan döngüleri) |
| Sıralı hesap ve sabit derinlik sınırı | 32 | 33 (hesabın zamana yayılması) | 86 (alternatif mimariler), 91–97 (matematiksel omurga), 103 (elle kurulum) |
| Eğitim verisinin yerel yapısı | 32 | — | 41–46 (getirme: uzak bağlar), 96, 114 (veri ve sistem) |
| Kapsama (pass@k) | 33 | 34 (yetenek sınırı tartışmasının ölçüsü) | 35 (doğrulama), 36, 57 (ajan değerlendirmesi), 101 |
| Çoğunluk oyu ve en iyi-N seçimi | 33 | 34 (öz-tutarlılıkla 86,7) | 36 (self-consistency'nin tam kurulumu), 38, 45 |
| Doğrulayıcı | 33 | 34 (kural tabanlı biçimi) | 35 (tam kurulum), 38, 47 (araç çağırma) |
| Çıkarım ↔ eğitim hesabı takası | 33 | 34 (dağılımı değiştirmek bir eğitim işi) | 60 (ajan ekonomisi), 90 (enerji ve maliyet), 106–109 (sistemler), 115 |
| Doğrulanabilir ödül (RLVR) | 34 | — | 35, 38, 47–48 (araçlar doğrulayıcıdır), 64 (ölçeklenebilir denetim) |
| Grup göreli avantaj (GRPO) | 34 | — | 37 (biçimsel kurulum), 38, 64 |
| Yetenek sınırı ↔ örnekleme verimliliği ayrımı | 34 | — | 36, 78 (beliren yetenekler), 96, 116 |
| Damıtma (öğretmenin kalıplarını aktarmak) | 34 | — | 87 (tam kurulum), 88 (uçta yapay zekâ), 108 |

### Batch 8'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 35–38'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 8'de gerçekleşen |
|---|---|
| Kapsama (33) | 35 (kapsama ↔ seçim açığı doğrulayıcının varlık sebebi), 36 (oylama kapsamayı aşamaz; 24 oyununda çöküş) ✓ |
| Çoğunluk oyu ve en iyi-N seçimi (33) | 35 (en yüksek puanlı birkaç adayın oyu), 36 (tam kurulum), 38 (üç seçicinin karşılaştırılması) ✓ |
| Doğrulayıcı (33) | 35 (tam kurulum), 36 (ağaçtaki değerlendirici aynı sorunu taşıyor), 38 (sonuç ve süreç denetimli biçimleri) ✓ |
| Aşırı optimizasyon ve Goodhart (13) | 35 (en iyi-N seçimi de bir eniyilemedir; dört yüz aday eşiği) ✓ **yirmi iki makale aralıklı geri çağırma** |
| KL ıraksaması (13) | 35 (en iyi-N seçiminin başlangıç dağılımından uzaklığı), 37 (adım boyunun kısıtı) ✓ |
| Ödül modeli (11, 13) | 35 (etiket bedava değilse ödül modeline dönülür), 37 (döngünün genel hâli) ✓ |
| Politika ve referans model (13) | 37 (biçimsel tanım; kırpma teriminin adı konuyor) ✓ **yirmi dört makale aralıklı geri çağırma** |
| Grup göreli avantaj (34) | 37 (avantajın oynaklık düşürücü rolü), 38 (aynı hesabın adım düzeyine taşınması) ✓ |
| Doğrulanabilir ödül (34) | 35 (kural tabanlı doğrulayıcı), 38 (sonuç denetiminin sınırı) ✓ |
| Sonuç ödülü gerekçeyi denetlemez (34) | 35 (yanlış pozitifler), 37 (kredi atamanın somut hâli), 38 (çekirdek gerekçe) ✓ |
| Sadakat (31) | 38 (süreç denetimi zinciri denetler ama sadakati garanti etmez) ✓ |
| Yetenek sınırı ↔ örnekleme verimliliği (34) | 37 (dağılım daralınca keşif de daralır) ✓ |
| Üretim bir çekiliştir; sıcaklık (10) | 36 (çeşitlilik kusur değil kaynaktır), 37 (çekiliş = eylem seçimi) ✓ **yirmi altı makale aralıklı** |
| Işın araması (10, ileri okuma notu) | 36 (ışın sayısı büyüdükçe başarının düşmesi) ✓ **yirmi altı makale aralıklı geri çağırma** |
| Yerel maske ↔ küresel olasılık ayrışması (30) | 36 (en olası zincir, en olası cevap değildir) ✓ |
| Biçim sözleşmesi ve sabit cevap kümesi (30) | 36 (oylama ancak sabit cevap kümesinde yapılabilir) ✓ |
| Spekülatif üretim ve doğrulama asimetrisi (28) | 35 (asimetrinin gerçekten çalıştığı üç yerden biri) ✓ |
| Ön dolum ↔ adım adım üretim; iki gecikme ölçüsü (26, 28) | 36 (oylama paralel, ağaç düzey düzey sıralı) ✓ |
| Ara adımların gücü (32) | 35 (ara adımsız ince ayarda 20,6 → 5,2), 36 (örneklerin yüzde 60'ı ilk adımdan sonra kaybediyor) ✓ |
| Ölçüm disiplini: puan hangi dağılımda ölçüldü (16) | 38 (süreç doğrulayıcılarının genelleme sorunu) ✓ **yirmi iki makale aralıklı** |
| Kalibrasyon (16) | 36 (anlaşma oranı ucuz bir belirsizlik ölçüsü) ✓ |
| Durumsuzluk (21) | 38 (batch'i kapatan köprü) ✓ |
| Bellek muhasebesi: ağırlık + gradyan + optimizatör (19) | 37 (ikinci bir değer modelinin maliyeti) ✓ |
| Gradyan inişi ve kayıp (2) | 37 (değer işlevinin kendi tahminiyle öğrenilmesi) ✓ **otuz beş makale aralıklı geri çağırma** |
| Denetimli öğrenme (1) | 37 (doğru çıktı yok, yalnızca bir sayı var) ✓ **otuz altı makale aralıklı geri çağırma** |
| Sözlük (4) | 37 (eylem kümesi sözlüğün kendisidir) ✓ **otuz üç makale aralıklı geri çağırma** |
| Dikkat üçlüsündeki değer (6) | 36 (uyarı konuldu), 37 (ayrım açıkça yapıldı) ✓ **otuz bir makale aralıklı** |

### Batch 8'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 8'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Üretici ↔ doğrulayıcı ayrımı | 35 | 36 (üretim mi değerlendirme mi darboğaz), 38 | 45 (kaynak sadakati), 47–48 (araçlar doğrular), 57 (ajan değerlendirmesi) |
| Yanlış kabul ↔ yanlış ret | 35 | 38 (doğru cevaplı çözümlerde süreç hatası) | 45, 65 (kalibrasyon), 71–73 (değerlendirme bilimi) |
| Öz-düzeltme ve dış geri bildirim koşulu | 35 | 36 (düzeltme ile ağaç aramasının karşılaştırılması) | 40 (uzun ufuk), 51–60 (ajan döngüleri), 64 (ölçeklenebilir denetim) |
| Seçmek de bir eniyilemedir | 35 | 38 (iyi doğrulayıcı dönüm noktasını ileri iter) | 45, 64, 101 (ölçüm disiplini) |
| Öz-tutarlılık | 36 | 38 (çoğunluk oyu taban çizgisi olarak) | 45 (getirmede tutarlılık), 65, 101 |
| Arama ağacı ve budama | 36 | 37 (aramanın değeri değerlendiricisi kadardır) | 51–60 (ajan döngüleri), 40, 116 |
| Planlamanın ölçülen zayıflığı | 36 | — | 51–60, 57, 40 |
| Markov karar süreci (durum, eylem, geçiş, bölüm) | 37 | 38 (adım etiketi bir değer kestirimidir) | 64, 94 (KL'nin biçimsel kurulumu), 96, 106–109 |
| Değer işlevi ve eylem-değeri | 37 | 38 (otomatik adım etiketleri) | 64, 94, 96 |
| Getiri ve iskonto | 37 | — | 40 (uzun ufuk), 60 (ajan ekonomisi), 94 |
| Kredi atama | 37 | 38 (makalenin bütün gerekçesi) | 40, 51–60, 96 |
| Politika gradyanı ve taban | 37 | 38 (ilerleme ödülü bir avantajdır) | 64, 94, 96 |
| Sonuç denetimi ↔ süreç denetimi | 38 | — | 45 (kaynak sadakati), 64, 74–77 (yorumlanabilirlik) |
| İz hatası | 38 | — | 57 (ajan değerlendirmesi), 72, 101 |
| Adım etiketi ve maliyeti | 38 | — | 64, 71–73 |

### Batch 9'da gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 39–42'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 9'da gerçekleşen |
|---|---|
| Durumsuzluk (21) | 39 (makalenin açılış gerilimi; belleğin varlık sebebi) ✓ **on sekiz makale aralıklı geri çağırma** |
| Ortadaki bilginin kaybı (21, 25) | 39 (kusursuz getirme ile 115 bin token'lık geçmiş arasındaki düşüş aynı olgunun bellek kılığı) ✓ |
| Anahtar-değer önbelleği tek çalışma boyunca yaşar (21, 26) | 39 (önbellek ile bellek ayrımı; üç katmanlı şekil) ✓ |
| Sistem isteminin sabit öneki ve önek maliyeti (24, 26, 28) | 39 (özet de bir önektir; her turda ödenen sabit fatura) ✓ |
| Ağırlıktaki bilgi ↔ bağlamdaki bilgi (18) | 41 (parametrik ↔ parametrik olmayan bellek; dizin değiştirme) ✓ |
| Anlamsal arama ve getirme (29) | 39 (kalıcı bellek bir getirme problemidir), 41 (getirici olarak ikili kodlayıcı), 42 (hattın tamamı) ✓ |
| İkili kodlayıcı belgeyi sorgu bilinmeden kodlar (29) | 39 (anahtarı zenginleştirme gerekçesi) ✓ |
| Tek vektörün boyut sınırı (29) | 39 (depo büyüdükçe zorlaşan şey doğru olanı bulmaktır) ✓ |
| Bulma oranı (29) | 41 (fayda-zarar tablosunun ölçüsü), 42 (nDCG ve MRR'den ayrımı) ✓ |
| Çapraz kodlayıcı ↔ ikili kodlayıcı (29) | 42 (geç etkileşimin ikisinin arasına yerleşmesi) ✓ |
| BM25 (29, glosssuz) | 42 (tam kurulum: ters dizin, doyum, uzunluk normalleştirmesi) ✓ |
| İki aşamalı sıralama (29) | 42 (BM25'i alan dışında geçen üçüncü yol; bedeli her sorguda) ✓ |
| İçsel ↔ dışsal uydurma (17) | 39 (getirilen kayıt ilgisizse), 41 (getirmenin çözmediği) ✓ **yirmi dört makale aralıklı** |
| Tam bir kez görülmüş olgular (17) | 41 (uzun kuyruk eğrisinin sol ucu aynı bölgedir) ✓ |
| Parametre başına bilgi kapasitesi (18) | 41 (10¹⁸ parametre tahmininin arka planı) ✓ **yirmi üç makale aralıklı geri çağırma** |
| Kapsama ve `pass@k` (33) | 40 (çarpımsal düşüş, kapsama eğrisinin aynadaki görüntüsü) ✓ |
| Çıkarım ↔ eğitim hesabı takası (33) | 40 (toparlanma mekanizmalarının faturası), 42 (yeniden sıralamanın bütçesi) ✓ |
| Hesap grafiği ve doğrusallaştırılmış alt grafik eşlemesi (31) | 40 (bileşik görevlerde çöküşün ampirik tarafı) ✓ |
| Öz-düzeltme ve dış geri bildirim koşulu (35) | 40 (`c` neden içeriden büyütülemez) ✓ |
| Arama ağacı ve budama (36) | 40 (toparlanmanın en doğrudan biçimi) ✓ |
| Getiri, iskonto ve kredi atama (37) | 40 (uzun ufuk, kredi atamanın zaman eksenine yayılmış hâli) ✓ |
| Sonuç denetimi ↔ süreç denetimi (38) | 40 (hatayı oluştuğu yerde görünür kılmak) ✓ |
| İki gecikme ölçüsü (26, 28) | 40 (n adımın toplam gecikmesi tek çağrının n katından fazladır) ✓ |
| Ölçüm disiplini: puan hangi dağılımda ölçüldü (16) | 40 (eğime tek tek noktalardan çok güvenmek), 42 (alan içi ↔ alan dışı ters dönüş; etiket havuzunun yanlılığı) ✓ |
| Kirliliğin değerlendirmeye etkisi (16) | 40 (adım sayısı ölçümü sağlamlaştıran bir tasarım kararıdır) ✓ |
| Perplexity'de küçük olan iyidir (5) | 39 (özet ↔ ham geçmiş karşılaştırması) ✓ **otuz dört makale aralıklı geri çağırma** |
| Kuantizasyon ve bellek bütçesi (26, 27) | 39 ("bellek" sözcüğünün donanım anlamıyla açıkça ayrıştırılması) ✓ |

### Batch 9'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 9'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Bellek (ürün anlamı) | 39 | 41 (parametrik olmayan bellek aynı ailedendir) | 56 (ajan belleği), 112 (kişiselleştirme), 115 |
| Özetleyerek taşıma ve seçili kayıp | 39 | — | 44 (parçalama kararları), 56, 60 |
| Kalıcı belleğin üç aşaması (yazma-getirme-okuma) | 39 | 41 (aynı hattın getirme ayağı), 42 (getirme ayağının içi) | 44 (RAG hattı), 46, 56 |
| Anahtar ↔ değer ayrımı (neyle aranır, ne saklanır) | 39 | 42 (belge genişletme aynı fikrin seyrek hâli) | 43, 44, 46 |
| Geri çağırma puanı: tazelik + önem + ilgi | 39 | — | 44 (yeniden sıralama ölçütleri), 50 (bilgi tazeliği), 56 |
| Bilgi güncellemesi ve çelişen kayıt | 39 | 41 (dizin değiştirme aynı sorunun dış çözümü) | 50 (güncellik ve kaynak güveni), 65, 112 |
| Çarpımsal düşüş `(1 − ε)ⁿ` | 40 | — | 57 (ajan değerlendirmesi), 60, 101 |
| Toparlanma tavanı `c ⁄ (c + ε)` | 40 | — | 51–60 (ajan döngüleri), 59 (insan devri), 64 |
| Görev ufku (süre cinsinden) | 40 | — | 57, 60, 117 (AGI tartışması) |
| Güvenilirlik çıtası ↔ ufuk uzunluğu takası | 40 | — | 57, 60, 71 |
| Parametrik ↔ parametrik olmayan bellek | 41 | 42 (dizinin kendisi) | 43–46, 50, 112 |
| Uzun kuyruk (olgu sıklığı ↔ doğruluk) | 41 | 42 (alan dışı genellemenin kardeşi) | 45, 72, 96 |
| Dizin değiştirme | 41 | — | 43, 50, 112 |
| Dikkat dağıtıcı belge | 41 | 42 (getiricinin üste çıkardığı yanlış) | 44 (yeniden sıralama), 45, 58 |
| Ezber oranı (bağlam ↔ ezber çatışması) | 41 | — | 45 (kaynak sadakati), 50, 65 |
| Uyarlanabilir getirme | 41 | — | 44, 46, 60 |
| Ters dizin | 42 | — | 43 (vektör dizinleriyle karşılaştırma), 44 |
| Terim sıklığı doyumu ve uzunluk normalleştirmesi | 42 | — | 43, 44 (parçalama uzunluğu kararı) |
| Öğrenilmiş seyrek getirme | 42 | — | 43, 44, 46 |
| Sırayla birleştirme (karşılıklı sıra) | 42 | — | 44 (melez hat), 45, 73 |
| nDCG ve ortalama karşılıklı sıra | 42 | — | 45 (RAG değerlendirmesi), 71, 101 |
| Değerlendirme kümesinin etiket yanlılığı | 42 | — | 45, 71–73, 101 |

### Batch 10'da gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 43–46'da fiilen nerede geri çağrıldığı:

| Kavram | Batch 10'da gerçekleşen |
|---|---|
| Boyutluluk laneti (5) | 43 (ağaç dizinlerinin taramaya dönüşmesinin geometrik yüzü) ✓ **otuz sekiz makale aralıklı geri çağırma** |
| Logit (7) | 44 (dizi-diziye yeniden sıralayıcıda "doğru" token'ının olasılığı ilgililik puanı olur) ✓ |
| Ölçüm disiplini: cetvel bir tasarım ürünüdür (16) | 44 (tek belgelik parça deneyinin sınırı), 45 (tam eşleşme ↔ insan kararı; eksi puanlı güvenilirlik), 46 (kısayolu kapatılmış küme) ✓ |
| Kalibrasyon (16) | 46 (modelin kendi güveni ne zaman getirileceğini söylüyor) ✓ |
| İçsel ↔ dışsal uydurma ve atomik olgu (17) | 44 (önerme = atomik olgunun getirme birimi), 45 (sadakat ifade ifade sayılır; getirme dışsal uydurmayı denetlenebilir kılar) ✓ |
| Ortadaki bilginin kaybı (21, 25) | 44 (U eğrisi; doğru belge sorgunun yanına) ✓ |
| Bellek bant genişliği (26) | 43 (tam taramanın faturası hesapta değil bellekte) ✓ |
| Kuantizasyon: ızgara, sabit, blok (27) | 43 (ürün kuantizasyonunda kod defteri = öğrenilmiş ızgara) ✓ |
| İki gecikme ölçüsü ve bütçe muhasebesi (28, 33) | 44 (yeniden sıralama saniye cinsinden), 46 (döngü başına çağrı ve paragraf sayısı) ✓ |
| Anlamsal arama, 21 milyon vektör, 65 GB, 995 sorgu/sn (29) | 43 (sayıların dizin karşılığı; o dizin bir HNSW'ydi) ✓ |
| Tek vektörün boyut sınırı ve ikili kodlayıcının sorguyu bilmemesi (29) | 44 (parça büyüdükçe taşıması gereken soru sayısı artar) ✓ |
| Kaçırılan sonuç sessizdir (29) | 43 (kaçırılanların çoğu ilgisiz komşu; ölçmeden bilinmez) ✓ |
| İki aşamalı sıralama ve melez arama (29, 42) | 44 (dil modeliyle yeniden sıralama; melez hat 1,45 sn), 46 (döngü + öz-tutarlılık birleşimi) ✓ |
| Özel token'lar ve biçim garantisi (30) | 46 (yansıma token'ları sıradan dağılımdan üretilir) ✓ |
| Sadakat (31) | 45 (aynı sözcük, nesne artık cevabın önündeki belge) ✓ |
| Doğrusallaştırılmış alt grafik eşlemesi / kısayol (31) | 46 (bileşim açığı; bağlantısız akıl yürütme puanı) ✓ |
| Düşünce zinciri (32) | 46 (zincirin her cümlesi bir sonraki aramanın sorgusu) ✓ |
| Damıtma ve ödülle eğitim (34) | 44 (sıralama davranışının damıtılması; yeniden yazıcının ödülle eğitimi) ✓ |
| Doğrulayıcı, yanlış pozitif/negatif, dış geri bildirim (35) | 45 (hakem model bir doğrulayıcıdır), 46 (dış dünyanın bedeli: arama hatası ve döngü) ✓ |
| Öz-tutarlılık (36) | 46 (döngüyle birleşim; yinelemeli getirmenin doyması) ✓ |
| Eylem (37) | 46 (bir sonraki token'dan dünyaya dokunan çağrıya) ✓ |
| Adım etiketleri ve süreç denetimi (38) | 46 (eleştirmen modelin bölüm başına yansıma etiketleri) ✓ |
| Anahtar ↔ değer ayrımı (39) | 43 (etiket + vektör = ikiye ayrılan anahtar), 44 (parça hem anahtar hem değer; küçükle ara, büyüğü döndür) ✓ |
| Özetleyerek taşıma ve seçili kayıp (39) | 44 (getirileni sıkıştırmak; boş dönebilen sıkıştırıcı) ✓ |
| Çekimserlik (39) | 45 (eksi puanlı cetvelde bilmiyorum demenin değeri) ✓ |
| Çarpımsal düşüş ve hatayı oluştuğu yerde yakalamak (40) | 46 (halka başına getirme hatası; ileriye bakan getirme) ✓ |
| Dizin değiştirme (41) | 43 (bilgiyi güncellemek = vektör veritabanına yazmak) ✓ |
| Dikkat dağıtıcı belge (41) | 44 (konum tablosu; sıkıştırmada atılanlar), 45 (bağlam ilgililiği) ✓ |
| Ezber oranı (41) | 45 (okuma katmanının hatası; karşıolgusal dayanıklılık aynadaki görüntüsü) ✓ |
| Uyarlanabilir getirme (41) | 44 (hat başındaki sınıflandırıcı; seçici güçlendirme), 46 (belirsizlik tetikli getirme) ✓ |
| Getirme zarar verebilir (41) | 44 (yeniden yazma tablosunun ilk satırı), 45 (doğruluk artarken güvenilirlik düşer) ✓ |
| Ters dizin (42) | 43 (ters dosyanın adaşı; vektörlerde terim yok) ✓ |
| Alan dışı ters dönüş (42) | 43 (metin–görüntü kümesinde sıkıştırmanın çökmesi), 44 (eğitim dağılımına uyan birim) ✓ |
| Çapraz kodlayıcıyla yeniden sıralama, +%11 (42) | 44 (dil modeli yeniden sıralayıcılar aynı düzenin devamı) ✓ |
| nDCG ve ortalama karşılıklı sıra (42) | 44 (MRR@10 tabloları), 45 (ilgililik etiketinin kaynağı) ✓ |
| Değerlendirme kümesinin etiket yanlılığı (42) | 43 (dizinin kaçırdığı belge etiketlenmemişse görünmez), 45 (etiket kimin için verildiyse onun lehinedir) ✓ |
| Geç etkileşimli (29, 42) | 43 (merkeze ata, farkı sıkıştır, kaba puanla ele) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): geri çağırma puanı tazelik + önem + ilgi (39 → 44 yeniden sıralama ölçütleri; devir: 50, 56), uzun kuyruk (41 → 45; devir: 50, 72), terim sıklığı doyumu → parçalama uzunluğu (42 → 44; devir: 48), öğrenilmiş seyrek getirme (42 → 43/44/46; devir: 48, 91), sırayla birleştirme adıyla (42 → 44; 44 melez hattı 42'ye gönderdi ama karşılıklı sırayı yeniden kurmadı; devir: 73).

### Batch 10'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 10'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Tam tarama ve yaklaşık en yakın komşu araması | 43 | 44 (dizin hazır kabul edildi), 45 (dizin bulma oranı ↔ hat sonucu) | 48, 91 (vektör matematiği), 107 |
| Ters dosya, ürün kuantizasyonu, yakınlık çizgesi (üç aile, üç düğme) | 43 | — | 56 (ajan belleğinin deposu), 91, 109 |
| Dizin bulma oranı ≠ getirme bulma oranı | 43 | 45 (her katmanın ölçüsü bir üst katmanı zayıf tahmin eder) | 57 (ajan değerlendirmesi), 71, 101 |
| Bulma oranı ↔ hız eğrisinin dik sağ ucu | 43 | 44 (yeniden sıralamanın son puanları en pahalı saniyeler) | 60 (ajan ekonomisi), 86 |
| Filtreli arama ve seçicilik | 43 | — | 50 (tarih/kaynak filtresi), 58 (erişim yetkisi), 112 |
| Vektör veritabanı = dizin + sistem | 43 | — | 48, 56, 106 |
| Parçalama: parça hem anahtar hem değer; önerme | 44 | 45 (bağlam ilgililiği), 46 (destekleyici olgular = altın paragraf etiketi) | 48 (dosyalarla çalışan modeller), 56, 100 |
| Küçükle ara, büyüğü döndür | 44 | — | 56, 112 |
| Sorgu yeniden yazma ve varsayımsal belge | 44 | 46 (kendine sorma = takip sorusunu yazmak) | 48, 51 |
| Dil modeliyle yeniden sıralama (liste hâlinde, damıtma) | 44 | — | 57, 73, 87 |
| Ortada kaybolma ve yerleştirme kuralı | 44 | — | 51 (ajan bağlamı), 60, 86 |
| Seçici güçlendirme ve sıkıştırma | 44 | — | 56, 60 |
| Uzun pencere getirmeyi gereksiz kılmaz | 44 | — | 60, 86, 117 |
| Üç katman, üç ölçü (bağlam ilgililiği, kaynak sadakati, cevap ilgililiği) | 45 | 46 (yansıma token'ları = üç ölçünün üretim anındaki karşılığı) | 57, 71, 101 |
| Eksi puanlı güvenilirlik cetveli (getirme çekimserliği yanlışa çevirir) | 45 | — | 50, 57, 65 |
| Belgenin tek başına üreticiye verdiği sonuç (ilgililik etiketi olarak) | 45 | — | 57, 71 |
| Atıf: bulma oranı ve kesinlik; atfedilebilirlik testi | 45 | 46 (yansımalı modelin atıf kesinliği) | 50 (atıf ve kaynak güveni), 65, 71 |
| Hakem model ve üç yanlılığı; tahmin destekli çıkarım | 45 | — | 57, 73 (değerlendiren modellerin güvenilirliği), 101 |
| Karşıolgusal dayanıklılık (yanlış belgeye teslim olma) | 45 | — | 50, 58, 65 |
| Çok adımlı soru ve bileşim açığı | 46 | — | 51, 52, 57 |
| Kendine sorma ve getirmeyi zincire örmek | 46 | — | 51, 55 |
| Düşün–eyle–gözle döngüsü | 46 | — | 47 (eylem = araç çağrısı), 51, 52 |
| Etkin (belirsizlik tetikli) getirme | 46 | — | 51, 65 |
| Yansıma token'ları ve eleştirmen model | 46 | — | 52, 59, 73 |
| Halka başına getirme hatası; kısayol / bağlantısız akıl yürütme | 46 | — | 51, 57, 72 |

### Batch 11'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 47–50'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 11'de gerçekleşen |
|---|---|
| Sonraki token kaybı (5) | 47 (Toolformer ölçütü: çağrı ve sonucu, metnin geri kalanının kaybını düşürüyorsa tutulur) ✓ **kırk iki makale aralıklı geri çağırma** |
| Embedding ve çıktı katmanı (4, 7) | 47 (araç token'ı: sözlüğe eklenen bir embedding satırı) ✓ |
| Öz-denetimli öğrenme (8) | 47 (çağrı etiketi verinin kendisinden kesilir) ✓ |
| Ölçek yasaları (9) | 50 (ölçek zamanı görmez; bayat büyük model, taze küçük modelin gerisinde kalabilir) ✓ |
| Otoregresif döngü ve durma token'ı (10, 24) | 47 (ikinci durma token'ı: mesaj sonu) ✓ |
| Denetimli ince ayar (12) | 47 (çağrı biçimi öğrenilir), 50 (zamansal hizalama ince ayarı yeni bilgi eklemez, var olanı öne çeker) ✓ |
| Tekilleştirme ve veri temizliği (14) | 47 (üç denetçi = temizlik zinciri), 50 (tekilleştirme etkin kesim tarihini geriye çeker) ✓ |
| Cetvel bir tasarım ürünüdür (16) | 47 (pass^k ↔ kapsama), 49 (sanal API sunucusu: ölçüt için dünyayı dondurmak), 50 ("hiçbiri" seçeneği) ✓ |
| Kalibrasyon (16) | 50 (yanlış belgeye direnç modelin güveniyle ölçeklenir) ✓ |
| Uydurma (17) | 47 (uydurulmuş çağrı ayrı bir hata sınıfı), 50 (gerçek kaynağa yanlış iddia yüklemek) ✓ |
| Bilgi ağırlıklarda durur (18) | 50 (hangi yılın bilgisinin öne çıkacağı ayrı bir düğme) ✓ |
| Unutma ve eğitim kesim tarihi (19) | 50 (yeniden eğitim unutur, dizin unutmaz; kesim tarihi ölçülür) ✓ |
| Bağlam penceresi ve durumsuzluk (21) | 47 (araç tanımları pencerenin bir kısmını alır), 48 (dosya penceresi), 49 (durumsuz protokol) ✓ |
| İstem kararı ölçülmeden verilmez (22) | 47 ("gerekirse ara" bir ölçüt değildir) ✓ |
| Örnekle öğrenme ve gösterim (23) | 47 (Toolformer gösterimleri; on üç aracın gösterimi isteme sığmaz) ✓ |
| Sohbet şablonu, konuşmacı rolü, talimat hiyerarşisi (24) | 47 (ipython rolü, mesaj sonu token'ı, araç çıktısı en düşük güven düzeyi), 49 (sunucu sohbeti görmez; açıklama, en üste yazılan üçüncü taraf metni) ✓ |
| Anahtar-değer önbelleği ve önek paylaşımı (26, 28) | 47 (tanım bloğu her turda yeniden hesaplanmaz), 49 (belirlenimci araç listesi sırası) ✓ |
| Gecikme ve bütçe muhasebesi (28, 33) | 47 (paralel çağrı: 1,80 ve 3,74 kat), 48 (arayüz görev başına on üç kat pahalı) ✓ |
| Kısıtlı üretim, şema, dilbilgisi (30) | 47 (katı kip; şema türü zorlar, değeri değil), 48 (yorumlayıcı sözdizimini sınar, anlamı değil) ✓ |
| İçerik etkisi (31) | 48 (içeriği değiştirmeden zorluğu değiştirmek: büyük sayılar) ✓ |
| Düşünce zinciri ve ara adımlar (32) | 48 (program olarak ara adımlar), 50 (plan önce, atıf sonra) ✓ |
| Kapsama, pass@k (33) | 47 (pass^k: hepsinde başarı) ✓ |
| Reddetmeli örnekleme ve damıtma (34) | 48 (çıktı uzayı şekillendirme: geçerli izler + öğretmenin düzelttiği izler) ✓ |
| Sağlam doğrulayıcı ve dış geri bildirim (35) | 47 (veritabanı durumu doğrulayıcı), 48 (yorumlayıcı yarım doğrulayıcı; birim test tam) ✓ |
| Ağaç araması (36) | 47 (geri almalı karar ağacı: 35,3 → 63,8) ✓ |
| Eylem (37) | 47 (eylem = işlev çağrısı) ✓ |
| Adım etiketleri ve süreç denetimi (38) | 50 (planın her sorusu denetlenebilir) ✓ |
| Bellek, tazelik, çekimserlik (39) | 50 (tazelik anlamı genişler; çekimserlik bir eğitim farkı) ✓ |
| Çarpımsal düşüş (40) | 47 (bağımlı çağrılarda hata birikir), 48 (adım yüzde 52, görev yüzde 5,2) ✓ |
| Dizin değiştirme, dikkat dağıtıcı belge, ezber oranı, getirme zarar verebilir (41) | 47 (kötü getirici hiç getirmemekten kötü), 48 (tam dosya = dikkat dağıtıcı), 49 (yanlış araç yanlış eylemdir), 50 (bağlam–bellek çatışması; dizin unutmaz) ✓ |
| Ters dizin ve BM25 (42) | 48 (depo araması), 49 (BM25 araç araması) ✓ |
| Vektör dizini ve bulma oranı (43) | 47 (araç açıklamaları üzerinde getirici), 48 (depo dizini; kaçırılan komşu sessizdir), 49 (tamlık) ✓ |
| Parçalama, kayan pencere, ortada kaybolma, belge genişletme, sorgu yeniden yazma (44) | 48 (sayfa parçalama; depo kayan penceresi; yüz satırlık pencere), 49 (araç belgesi genişletme ve niyet çıkarma) ✓ |
| Atıf, atfedilebilirlik testi, eksi puanlı cetvel, karşıolgusal dayanıklılık, dinamizm sınıfları (45) | 48 (alıntılı cevap), 50 (atıf varken uydurma; derlem ölçeğinde karşıolgusal dayanıklılık; değişme hızı sınıfları) ✓ |
| Düşün–eyle–gözle, etkin getirme, yinelemeli getirme (46) | 47 (eylem satırının genelleşmesi; Toolformer ölçütü etkin getirmenin eğitim zamanı akrabası), 48 (depo tamamlamada yineleme), 49 (döngü ve paralellik protokolün dışında) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): geri çağırma puanı tazelik + önem +
ilgi (39 → 50; 50 yalnızca tazelik sözcüğünün anlamını genişletti, puan formülünü yeniden kurmadı;
devir: 56), uzun kuyruk (41 → 50; devir: 72), terim sıklığı doyumu → parçalama uzunluğu (42 → 48;
devir: 91), öğrenilmiş seyrek getirme (42 → 48; devir: 91), filtreli arama ve seçicilik (43 → 50
tarih/kaynak filtresi; 50 filtre yerine güvenilirlik notunu kurdu; devir: 58, 112), sırayla
birleştirme (42 → 73).

### Batch 11'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 11'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Araç kullanımı ve işlev çağrısı (ad + argüman, yapılandırılmış üretim) | 47 | 48 (üç arayüz), 49 (tanım protokolden gelir), 50 (dünyaya bağlanmanın varsayımı) | 51, 52, 55, 60 |
| Araç tanımı: ad, açıklama, şema; tanımın istemdeki yeri ve token bedeli | 47 | 49 (listeleme cevabı; açıklama saldırı yüzeyi; belirlenimci sıra) | 51, 56, 58 |
| Çalıştırıcı; mesaj sonu token'ı; araç sonucu için ayrı konuşmacı rolü | 47 | 49 (çalıştırıcı protokolün arkasına taşınır) | 51, 54 |
| Katı kip ve "tür ≠ değer"; üç denetçi (biçim, çalıştırma, anlam) | 47 | 48 (yorumlayıcı = çalıştırma denetçisi) | 55, 57 |
| Uydurulmuş çağrı ve soyut sözdizimi ağacıyla ölçümü | 47 | 49 (araç adı geçerliliği yüzde 96–100) | 57, 58 |
| Araç token'ı; öz-denetimli çağrı ölçütü (kaybı düşüren çağrı tutulur) | 47 | — | 87, 103 |
| Çağırmama kararı (ilgisizlik) ve eksik işlevi fark etme | 47 | — | 57, 59 |
| Araç seçimi bir getirme sorunudur; kötü getirici zarar verir | 47 | 49 (hiyerarşik daraltma, belge genişletme, niyet çıkarma, tamlık) | 51, 56 |
| Paralel çağrı ve bağımlılık çizgesi; sıralı döngünün iki hatası | 47 | 49 (paralellik puanı en çok 0,36) | 52, 60 |
| pass^k: tutarlılık ölçüsü; politika ablasyonu | 47 | — | 57, 101 |
| Araç arayüzü (ajan–bilgisayar arayüzü); insan arayüzü modele uymaz | 48 | 49 (protokol arayüzü standartlaştırır) | 51, 54, 55 |
| Liste önce, içerik sonra (arama + getirme aracı); HTML süzme ve aday sıralama | 48 | — | 54 |
| Yorumlayıcı = hesabı devralan yarım doğrulayıcı; hata mesajı gözlemdir | 48 | 49 (hata bayrağı protokole yazılmış) | 55 |
| Kod olarak eylem (döngü ve koşul) | 48 | — | 52, 55 |
| Dosya görüntüleyici penceresi, özetlenmiş arama, bağlam kısaltma | 48 | — | 55, 56 |
| Depo düzeyi getirme ve yinelemeli tamamlama | 48 | — | 55 |
| MCP: ana bilgisayar / istemci / sunucu; listeleme ve çağırma; sunucu sohbeti görmez | 49 | — | 51, 53, 58 |
| Ekosistem sayıları ve API kararsızlığı; sanal API sunucusu | 49 | — | 57, 60 |
| Araç zehirleme | 49 | — | 58 |
| Bilgi kesim tarihi, etkin kesim tarihi, iç saat, zamansal hizalama | 50 | — | 56, 72, 106 |
| Bağlam–bellek çatışması; karşı-bellek; tek kanıt ↔ çelişen kanıtlar | 50 | — | 58, 65 |
| Derleme sızan yanlış bilgi ve güvenilirlik notu | 50 | — | 58, 65 |
| Kaynağa göre isteme ve alıntı payı | 50 | — | 65, 71 |
| Atıf varken uydurma: gerçek kaynağa yanlış iddia | 50 | — | 65, 71 |

### Batch 12'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 51–54'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 12'de gerçekleşen |
|---|---|
| Kural yazmak vs veriden öğrenmek (1) | 51 (ajan tanımı dil modelinden eski; termostat da ajandır; çevreyi modellemeden politikayı iyileştirmek) ✓ **elli makale aralıklı geri çağırma** |
| Karesel dikkat maliyeti (7) | 53 (ajan zinciri: uzunluk çarpı pencere) ✓ |
| Ön eğitim (8) | 54 (piksel okumayı önceden öğrenmiş model: 66,5 ↔ 17,1) ✓ |
| Denetimli ince ayar ve sentetik veri (12) | 52 (hızlı modül kâhin izleriyle eğitilir), 54 (sayfa kaynağından on milyon öğe) ✓ |
| Doğrudan tercih optimizasyonu (13) | 52 (başarısız iz ↔ uzman izi tercih çifti) ✓ |
| Cetvel bir tasarım ürünüdür (16) | 51 (puan çağrı sayısıyla okunur), 53 (iki sistem birbirinin kümesinde yeniliyor), 54 (insanı da ölçen beş ortam) ✓ |
| Bilgi ağırlıklarda durur (18) | 51 (ön eğitimli politika 250 bin adımda yüzde 80: ağırlıktaki bilgi ön dağılım) ✓ |
| Bağlam penceresi ve durumsuzluk (21) | 51 (geçmiş yalnızca pencerede), 53 (pencere ayrımı gerekçesi), 54 (gösterim bir bütçe kararı: 128.827 ↔ 4.240 token) ✓ |
| Sistem istemi ve konuşmacı rolü (24) | 53 (rol = sistem istemi; örgüt şemasındaki boşluk) ✓ |
| Gecikme ve bütçe muhasebesi (28) | 52 (büyük modeli gerektiğinde çağır: 757 ↔ 1.971 token/eylem) ✓ |
| Anlamsal arama (29) | 51 (plan → geçerli eylem çevirisi), 52 (beceri kütüphanesi) ✓ |
| Kısıtlı üretim ve şema (30) | 51 (geçersiz biçimle biten bölümler), 53 (yapılandırılmış belge = şemanın belge hâli) ✓ |
| Düşünce zinciri ve ara adımlar (32) | 51 (iç eylem) ✓ |
| Kapsama, pass@k (33) | 52 (elli yol), 53 (kırk cevap; kazancın haritası) ✓ |
| Öz-düzeltme sınırı ve sağlam doğrulayıcı (35) | 51 (döngü modeli değiştirmez), 52 (araçsız düzeltme kazandırmaz; yansımadan önce hakemi ölç) ✓ |
| Ağaç araması ve öz-tutarlılık (36) | 51 (öneri/değerlendirme aşamaları), 52 (eylem ağacı), 53 (oylama ↔ tartışma) ✓ |
| Markov karar süreci; durum/eylem/geçiş/ödül/bölüm/politika; PPO (37) | 51 (**bilinçli formalizasyon**: iki kat eşleme; Q(s, dur)), 52 (değer kestirimi; ödül = cümle; PPO ↔ DPO), 54 (eylem kümesini çevre tanımlar) ✓ |
| Bellek: yazma, okuma, yansıma (39) | 51 (belleğe yazma iç eylem), 52 (öz-yansıma akrabalığı) ✓ |
| Çarpımsal düşüş, toparlanma c, görev ufku (40) | 51 (adım = tur; %80 ufku beşte bir; toparlanma dışarıdan), 52 (dört sensör dışarıda) ✓ |
| Getirme ve dikkat dağıtıcı belge (41) | 53 (getirme ↔ ajan zinciri: 51,91 ↔ 53,62) ✓ |
| Parçalama ve ortada kaybolma (44) | 51 (izdüşüm kararı), 53 (pencere ayrımı gerekçesi) ✓ |
| Kaynak sadakati ve hakem model (45) | 54 (aynı İngilizce kök, başka kavram; canlı site puanı hakem modelle) ✓ |
| Düşün–eyle–gözle (46) | 51 (döngünün tam hâli; yüzde 23 arama hatası), 52 (her adımda karar veren düzen) ✓ |
| İşlev çağrısı, çalıştırıcı, pass^k, 30 eylem, başarısızlık dökümü (47) | 51 (döngüyü kim kapatır; pass^8 < %25), 52 (geri almalı ağaç yalnızca okuma çağrıları), 53 (maliyetin %95,9'u girdi), 54 (kimlikle seçim = getirme) ✓ |
| Ajan–bilgisayar arayüzü, dört düğme, 4 dolarlık bütçe (48) | 51 (gloss ödendi; hızlı başarır yavaş başarısız olur; 90,5 → 57,2), 52 (düzenleme spirali), 54 (arayüz tezi; 1.135 → 580) ✓ |
| Orkestra şefi: açıklamadan model seçmek (49) | 53 (şef ve işçiler düzeni) ✓ |
| Dizine sızan yanlış belge (50) | 54 (çevre gürültüsü: yanlış tıklamanın açtığı pencere) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): araç tanımının token bedeli (47 → 51;
devir: 56, 58), araç seçimi bir getirme sorunudur (47 → 51; 54'te kimlikle seçim olarak kısmen ödendi;
devir: 56), MCP üçlüsü (49 → 51, 53; devir: 58), kod olarak eylem (48 → 52; 52'de yalnızca beceri
kütüphanesi olarak geçti; devir: 55), dosya görüntüleyici penceresi ve bağlam kısaltma (48 → 55),
etkin getirme (46 → 51; devir: 65), sorgu yeniden yazma (44 → 51; devir: 56).

### Batch 12'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 12'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Ajan (Wooldridge–Jennings: özerklik, tepkisellik, girişkenlik, toplumsallık; Russell–Norvig) | 51 | 53 (toplumsallık açıldı) | 59, 61, 111, 115 |
| Dil modeli ajanı = model kullanan sistem; ajan bir ilişkidir | 51 | 52, 53, 54 | 57, 60, 115 |
| Özerklik: döngüyü kapatan modelin ürettiği metindir; durmak bir eylemdir | 51 | 54 (yapılamaz ilanı %54,9) | 59, 60, 70 |
| İç eylem (akıl yürütme, getirme, öğrenme) ↔ dış eylem; çalışma belleği ve üç kalıcı bellek | 51 | 52 (ders = öğrenme eylemi) | 56, 112 |
| Karar döngüsü: öner, değerlendir, seç, çalıştır, gözle | 51 | 52 (dört biçim bu eksende) | 57, 110 |
| Kısmi gözlenebilirlik: gözlem durumun izdüşümüdür | 51 | 52 (plan gözlenebilirliğe bağlı), 54 (gösterim = izdüşüm kararı) | 56, 58, 110 |
| Eylem kümesini çevre tanımlar; yürütülebilirlik ↔ doğruluk takası | 51 | 54 (kimlik ↔ koordinat) | 55, 111 |
| Ajanlar hızlı başarır, yavaş başarısız olur; tur sınırında tekrar; hata döngüsü | 51 | 52 (anatomi ve dört çıkış), 53 (çoklu ajanda adım tekrarı) | 57, 60 |
| Bölümün beş bitiş sınıfı (tamamlandı / pencere doldu / biçim / eylem / tur sınırı) | 51 | — | 57 |
| Önce plan ↔ her adımda karar; gerektiğinde ayrıştırma | 52 | 54 (Agent S'in hiyerarşik planı) | 55, 57 |
| Öz-yansıma: eyleyen, değerlendirici, ders; ders hakem kadar iyidir | 52 | 53 (yansıma olgusal soruda düşer; düşüncenin yozlaşması) | 56, 65, 73 |
| Eylem ağacı araması; geri alınabilirlik koşulu | 52 | — | 55, 58 |
| İlerleme oranı | 52 | — | 57 |
| Beceri kütüphanesi (yordamsal bellek olarak kod); hızlı/yavaş modül; başarısız izlerle öğrenme | 52 | 54 (deneyim belleği) | 55, 56, 60 |
| Çoklu ajanın üç gerekçesi: pencere ayrımı, uzmanlaşma, bağımsız örnek | 53 | — | 60, 115 |
| Rol oyunu; standart işlem yordamı; mesaj havuzu; orkestra şefi | 53 | — | 55, 59, 115 |
| Tartışma ↔ oylama; düşüncenin yozlaşması; çeşitlilik sayıdan değerli; toplayıcı ↔ öneren | 53 | — | 64, 65, 73 |
| Çoklu ajan başarısızlık sınıfları (sistem tasarımı / ajanlar arası uyumsuzluk / doğrulama) | 53 | — | 57, 58 |
| Ajan sayısı ↔ lojistik eğri; fatura tur çarpı pencere | 53 | — | 60 |
| Grafik kullanıcı arayüzü; üç gösterim (kaynak, erişilebilirlik ağacı, ekran görüntüsü) | 54 | — | 58, 81, 88 |
| Öğe konumlandırma; kimlik ↔ koordinat; işaretleme her yerde işe yaramaz | 54 | — | 81, 88 |
| İnsan–ajan uçurumu ve üç nedeni; gösterim platforma bağlıdır | 54 | — | 57, 59 |

### Batch 13'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 55–58'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 13'te gerçekleşen |
|---|---|
| Ön eğitim ve sentetik veri (8, 12) | 55 (izlerle ince ayar; üretilmiş hata: etiket = test), 56 (geriye dönük kurulum) ✓ |
| Kolay örnekleri süzme, veri temizliği (14) | 55 (kolay izler eğitimi bozuyor, süzülüyor) ✓ |
| Doğrudan tercih optimizasyonu (13) | 58 (enjeksiyonlu tercih çiftleri: SecAlign) ✓ |
| Aşırı optimizasyon, Goodhart (13, 16) | 57 (cetvel hedefe dönüşünce; hile oranı) ✓ |
| Cetvel bir tasarım ürünüdür; hata payı (16) | 55 (kirlilik, sızıntı), 57 (üç puanlama yolu; koşu sayısı), 58 (üç ölçü birlikte) ✓ **kırk makale aralıklı geri çağırma** |
| Kalibrasyon (16, 50) | 58'de yalnızca işaretlendi → 59 (devir) |
| Bağlam penceresi ve durumsuzluk (21) | 55 (depo pencereye sığmaz), 56 (her görev sıfırdan; pencere bir bütçe) ✓ |
| Sohbet şablonu, sistem istemi, talimat hiyerarşisi, istem enjeksiyonu (24) | 58 (özel token ayraçlar; 32,8 → 95,9; 73,7) ✓ |
| Getirme ve BM25 (29, 42) | 55 (BM25 bulma oranı 39,83), 56 (BM25 doğru getirmede tam bağlamı geçiyor) ✓ |
| Yapılandırılmış çıktı ve şema (30) | 57 (durum karşılaştırması belirlenimci), 58 (plan kod olarak; ayraç token'ları) ✓ |
| Kapsama ve en iyi-N seçimi (33) | 55 (doğrulayıcıyla seçim 20,6 → 32,0), 57 (tek koşu iki cetveli de vermez) ✓ |
| Yanlış pozitif; sağlam doğrulayıcı (35) | 55 (makul ≠ doğru yama; test = davranışın örneklemi), 58 (dedektörün yanlış pozitifi yararı yer) ✓ |
| Ağaç araması ve çoğunluk oyu (36) | 55 (kırk aday yama; SWE-Search +%23) ✓ |
| Markov karar süreci ve pekiştirmeli öğrenme (37) | 56 (iç durumu pekiştirmeli öğrenmeyle birleştirmek) ✓ |
| Bellek: yazma/okuma/yansıma; üçlü puan; "kötü bellek belleksizlikten kötü" (39) | 56 (**bilinçli formalizasyon**: dört bellek ve dört yetenek; tez üçüncü kez ölçüldü: 21,1–28,3 ↔ 42,3) ✓ |
| Görev ufku; toparlanma (40) | 55 (başaranın süresi), 57 (zaman bütçesi: 2 saat ↔ 8 saat ↔ 32 saat) ✓ |
| Dış dizin; dikkat dağıtıcı belge; getirici ilgililiğe bakar (41) | 56 (anlamsal bellek = dış dizin), 58 (PoisonedRAG: beş metin) ✓ |
| Parçalama ve ortada kaybolma (44) | 56 (getirme parça döndürür, bütünü göremez; notta zaman bir alandır) ✓ |
| Hakem model ve yanlılıkları (45) | 57 (hakem ajan %90 ↔ tek model %70), 58 (dedektör de bir modeldir) ✓ |
| Yinelemeli getirme ve köprü varlık (46) | 56 (çizge üzerinde tek adımda yürüyüş; 10–30 kat ucuz) ✓ |
| İşlev çağrısı; pass^k; kullanıcıyı canlandıran model; girdi token'ı (47) | 56 (belleğe işlev çağrısıyla erişim), 57 (pass^k; benzetilmiş kullanıcının zarı 40/12 → 16/6), 58 (çalıştırıcı = araç süzgeci) ✓ |
| Dört düğme; kod olarak eylem; depo düzeyi getirme (48) | 55 (döngünün kod hâli; ajansız hat; 1.135 → 580 hatırlatıldı), 56 (son beş gözlem), 58 (plan kod olarak) ✓ |
| Araç zehirleme; belirtimde onay (49) | 58 (açıklama en üste girer; izinli kanaldan sızma; onay ilkesi) ✓ |
| Dizine sızan belge (50) | 56 (bağlam–bellek çatışması → seçici unutma), 58 (tasarımla sızdırma %90) ✓ |
| Ajan tanımı; özerklik; durma; iç eylem; dört bellek; beş bitiş sınıfı; Kapoor ilkesi (51) | 55 (durma = gönder; 90,5 → 57,2), 56 (dört bellek; iç eylem = yazma), 57 (bitiş sınıfları; puan çağrı sayısıyla), 58 (eylem kümesini çevre tanımlar; özerklik ↔ onay) ✓ |
| Hata döngüsü ve dört çıkış; ders; eylem ağacı; ilerleme oranı; beceri kütüphanesi; ağırlıklara yazma (52) | 55 (git ile geri alma; başarısız izler), 56 (son üç ders; kütüphane → iş akışı), 57 (ilerleme oranı → kısmi puan; 40 adımlık döngü), 58 (yansımanın kırılganlığı; önce plan = araç süzgeci) ✓ |
| Rol oyunu; yazılım şirketi düzenleri; iki sistem birbirinin kümesinde (53) | 55 (oyuncak görevler ↔ gerçek depo), 57 (rol oyunuyla iş arkadaşları; cetvel ürünü sıralama) ✓ |
| Ekran ajanı; çevre gürültüsü; insan–ajan uçurumu; hakem uyumu (54) | 55 (depo bir dünyadır), 57 (hakem uyumu 85,3; insan kıyası), 58 (açılır pencere %86; görünmez form) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): araç tanımının token bedeli (47 → 56, 58;
devir: 60), MCP üçlüsü (49 → 58; belirtimin onay cümlesi anıldı, üçlü anılmadı; devir: 60), sorgu
yeniden yazma (44 → 56; devir: 65), etkin getirme (46 → 65), tartışmanın denetim için kullanımı (53 → 64),
öz-yansıma ↔ hakem (52 → 65, 73), ajan sayısı ↔ lojistik eğri (53 → 60).

### Batch 13'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 13'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Kod ajanı: sorun kaydı + depo → yama; gizli test hakem; altın yama; başarısızdan geçere dönen test | 55 | 56 (her görev sıfırdan), 57 (testin sormadığı) | 60, 103, 104, 109 |
| Döngü ↔ ajansız hat; sıra modele bağlıdır; hata yeniden üretimi; hata yerini bulma | 55 | 57 (Pareto sınırı), 58 (önce plan = süzgeç) | 60, 110 |
| Makul yama ≠ doğru yama ≠ iyi yama; test davranışın örneklemidir; çözüm sızıntısı | 55 | 57 (imkânsız test; hile oranı) | 72, 101 |
| Yürütmeli ↔ yürütmesiz doğrulayıcı; izlerle ince ayar; üretilmiş hata (elli bin görev) | 55 | — | 73, 87, 104, 106 |
| İnsan hızlanması ölçüme bağlıdır (iki hakemsiz deney: +55,8 ↔ −19) | 55 | 57 (zaman bütçesi) | 59, 101, 115 |
| Durum yönetimi; pencere bir bütçe, atma bir karar; sayfalama; bellek baskısı; iç durum | 56 | 57 (koşu maliyeti) | 60, 110, 112 |
| Olaysal / anlamsal / yordamsal bellek; içgörü; not ve bellek evrimi; bilgi çizgesi; iş akışı; geriye dönük kurulum | 56 | — | 112, 115 |
| Dört bellek yeteneği; getirme dördün birini verir; seçici unutma herkes için zor | 56 | 57 (dört yetenek cetveli) | 72, 112 |
| Bölümü puanlamanın üç yolu; ara hedef; kısmi puan; hakem ajan | 57 | 58 (durum karşılaştırması; üç ölçü) | 71, 73, 101 |
| Koşu sayısı; benzetilmiş kullanıcının zarı; iz denetimi; akıl yürütme çabası kazanç garantisi değil | 57 | 58 (629 durum) | 60, 101 |
| İnsanla kıyas bütçeye bağlıdır; Pareto sınırı; dolarla maliyet; ücretle ağırlıklı puan | 57 | — | 60, 101, 115 |
| Kısayol cetvelin özelliğidir; tutulan küme; hile oranı; imkânsız test | 57 | 58 (dışarıdan gösterilen kısayol) | 63, 67, 72 |
| Dolaylı istem enjeksiyonu; kanal × hedef; saldırısız yarar / saldırı altında yarar / hedefli saldırı başarısı | 58 | — | 61, 63, 68 |
| Savunma katları: istem, eğitim, mimari; "tanımak eğilim, sınırlamak mimari"; araç süzgeci | 58 | — | 62, 63, 64 |
| Kum havuzu (tanım); en az ayrıcalık; üç katman; yetki etiketi; izinli kanaldan sızma; taklit araçla risk bulma | 58 | — | 59, 60, 68, 70 |

### Batch 14'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 59–62'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 14'te gerçekleşen |
|---|---|
| Genelleme ve aşırı öğrenme (2) | 61 (hedef yanlış genellemesi: genellemenin iki parçası), 62 (sözcük düzeyinde ezber → aşırı güvenlik) ✓ **altmış makale aralıklı geri çağırma** |
| Hizalama sözcüğünün iki anlamı (6 ↔ 11) | 61 (ayrım açıkça; bu makaleden itibaren ikinci anlam) ✓ |
| Ön eğitimden gelen dil kalıpları (8) | 62 (ret önekini sürdürmek ön eğitimde öğrenilmiş) ✓ |
| Ölçek yasaları (9) | 61 (yetenek büyüdükçe vekilin açığı) ✓ |
| Hizalanmamış; hizalama vergisi; yardımseverlik ↔ zararsızlık (11) | 61 (borç ödendi; tanım), 62 (vergi; parametreler ortak; gerilim ölçüldü) ✓ |
| Denetimli ince ayar (12) | 62 (talimat izleyen model zararlı talimatı da izler; güvenlik örnekleri) ✓ |
| Ödül modeli; aşırı optimizasyon; KL tasması; tercih çiftleri; "kimin tercihi" (13) | 61 (vekil = ödül modeli; tepe; uzunluk; Goodhart'ın dördü), 62 (44 bin / 42 bin; tek sayı ↔ kısıt; Lagrange çarpanı; model üretimi etiket işareti), 60 (yönlendirici tercih çiftleriyle) ✓ |
| Cetvel bir tasarım ürünüdür; Goodhart; kalibrasyon (16) | 59 (kalibrasyon devir ölçüsü mü), 61 (Goodhart), 62 (iki kümeli cetvel) ✓ |
| İnce ayar; unutma; LoRA (19) | 62 (ince ayar saldırısı; ret hedef alan dışı davranış; düşük ranklı uyarlama dengeyi korur) ✓ |
| Açık ağırlık (20) | 62 (vaat taksidi: yirmi sentlik ince ayar) ✓ |
| Durumsuzluk (21) | 60 (her tur pencerenin tamamı yeniden gönderilir) ✓ |
| Sistem istemi; talimat hiyerarşisi; özel token'lar (24) | 61 (Gabriel'in ilk hedefi), 62 (83,1 → 60,4; sistem istemi aşırı temkinin kaynağı; ilk token'lar) ✓ |
| Anahtar-değer önbelleği ve önek paylaşımı (26) | 60 (istem önbelleği: yeniden gönderilir, yeniden hesaplanmaz; program–motor yerelliği) ✓ |
| İlk token süresi, token başına süre, sürekli yığınlama (28) | 60 (istek ↔ program düzeyi; yığın ↔ gecikme takası 8,2× / %95) ✓ |
| Kısıtlı üretim (30) | 62 (ilk token'ları elinde tutan ret üzerinde söz sahibidir) ✓ |
| Düşünce zinciri (32) | 60 (düşünmek koşullanmayı kırıyor), 61 (izleyicinin gördüğü ara adımlar) ✓ |
| Çıkarım anı yöntemleri; kapsama (33) | 60 (çoğunluk oyu ve öz-düzeltme bedelini nadiren çıkarır; kapsama ↔ pass^k) ✓ |
| Yanlış pozitif; sağlam doğrulayıcı (35) | 59 (reddedici: güven kimin iyi olduğunu söylemez) ✓ |
| Markov karar süreci; getirinin doğrusallığı; politika (37) | 61 (Skalse: ziyaret sayılarının doğrusal fonksiyonu) ✓ |
| Çekimserlik (39) | 62 (belirlenemez istekte belirsizliği söylemek) ✓ |
| Görev ufku; %50 ↔ %80 (40) | 60 (ln s / ln p; 0,32 katı; adım doğruluğu sabit kalmıyor) ✓ |
| Hakem model (45) | 62 (GPT-4 ↔ insan tutarlı; kural puanlayıcı hakem) ✓ |
| İşlev çağrısı; yanlış argüman; pass^k; girdi payı; paralel çağrı; araç tanımı bedeli (47) | 59 (yanlış argüman; pass^k iki zar), 60 (264–804 token **tahsil edildi**; %95,9; 7,12 → 3,95; pass^k) ✓ |
| Belirlenimci araç sırası = önbellek; belirtim (49) | 60 (önek başındaki tanımlar), 61 (belirtim sözcüğünün ayrımı) ✓ |
| Güvenilirlik etiketi; token olasılığıyla güven (50) | 59 (kalibre güven yanlış belgeye direnir) ✓ |
| Özerklik; durma; Q(s, dur); Kapoor ilkesi; "hızlı başarır, yavaş başarısız olur"; politika pencerenin fonksiyonu (51) | 59 (Q(s, devret); özerklik ↔ onay), 60 (1,21 ↔ 2,52; puan çağrıyla; kendi hatasına koşullanma), 61 (hedef pencereye düşen durumlara bağlı) ✓ |
| Büyük modeli gerektiğinde çağır (52) | 60 (basamak ve yönlendirici) ✓ |
| Fatura tur × pencere (53) | 60 (kare terimi; **tahsil edildi**) ✓; lojistik eğri anılmadı (devir: 115) |
| "Yapılamaz" ilanı %54,9; hakem uyumu (54) | 59 ✓ |
| METR RCT; Şekil 2 tablosu; altı koşu; test davranışın örneklemi (55) | 59 (<%44, %9, +%19; öngörü −%24), 60 (geçiş başına bedel; 17,33–18,67), 61 (örneklem ↔ hedef) ✓ |
| Kesme / özet / sayfalama / iç durum; MEM1 3,7× (56) | 60 (önek kararı) ✓ |
| Üç puanlama yolu; koşu sayısı; iz denetimi; Pareto; HAL; TheAgentCompany; hile oranı (57) | 59 (erken bırakma; iz; τ²), 60 (Pareto dik; 21/36; elli kat; 4,2 ↔ 0,6), 61 (imkânsız test %76; cetvel hedefe dönüşünce) ✓ |
| Onay / kum havuzu; AgentDojo; StruQ; AgentHarm; dedektör (58) | 59 (saldırı yüzeyi ↔ onay), 61 (kum havuzu ajana karşı), 62 (85,2 → 16,7; 97 → 58; süzgeç %17) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): MCP üçlüsü (49 → 60; belirlenimci sıra anıldı,
üçlü anılmadı; devir: 115), ajan sayısı ↔ lojistik eğri (53 → 60; devir: 115), Wooldridge–Jennings'in dört
özelliği (51 → 59; yalnızca özerklik anıldı; devir: 111), tartışmanın denetim için kullanımı (53 → 64),
öz-yansıma ↔ hakem (52 → 65, 73), sorgu yeniden yazma (44 → 65), etkin getirme (46 → 65).

### Batch 14'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 14'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Otomasyon düzeyi; on basamak; dört aşama; beş rol; özerklik bir tasarım kararıdır | 59 | 61 (hedef belirsizken durmak hizalanmış davranış) | 70, 111, 115 |
| Devretmeyi öğrenme; sınıflandırıcı + reddedici; Q(s, devret); devir bir kayıp hesabıdır | 59 | 61 (işbirlikçi ters pekiştirmeli öğrenme: sormak, insana bırakmak) | 65, 73, 101 |
| Tamamlayıcılık; bütün parçalarını ortalamada geçmez (g = −0,23); açıklama ikna eder, ayırt ettirmez | 59 | — | 65, 73, 77, 115 |
| Aşırı güvenme; bilişsel zorlama; uygun güven | 59 | — | 65, 73 |
| Eksik belirtim; netleştirme sorusu; ajan istenmedikçe sormaz | 59 | 62 (eksik istekte sormak) | 66, 111 |
| Kalibrasyon açığı; ayırt etme açığı; ajan kimliği; eylem koruması | 59 | — | 65, 69, 70, 77 |
| Fatura tur × pencere = kare terimi; istem önbelleği (1,25× / 0,1×; ömür; en kısa önek); önek kararı | 60 | — | 106, 107, 109, 115 |
| Geçiş başına bedel; sınır bedeli; en ucuz koşu ≠ en ucuz çözüm; 1 bölü R alt sınırdır | 60 | — | 71, 101, 115 |
| Basamaklama; yönlendirici | 60 | — | 87, 115 |
| Gecikme program düzeyinde; anlamsal değişken; hat başı tıkanması; program–motor yerelliği | 60 | — | 107, 109 |
| Ufuk = ln s / ln p; kendi hatasına koşullanma; uzun koşuda değişkenlik ortalamayı geçer | 60 | — | 67, 101, 110 |
| Hizalama sorunu (tanım; 6 ↔ 11 ayrımı); belirtim; vekil ödül; belirtim oyunu; ödül hırsızlığı | 61 | 62 (uyumsuz genelleme) | 64, 67, 70, 94 |
| Goodhart'ın dört türü; oynanabilir çift; sadeleştirme oynanabilir | 61 | — | 71, 72, 101 |
| Yetenek vekilin açığını bulma yeteneğidir; faz geçişi; ağırlık / ontoloji / kapsam | 61 | — | 67, 70, 78 |
| Hedef yanlış genellemesi; yetenek ↔ hedef genellemesi; dış / iç hizalama; içsel eniyileyici | 61 | 62 (uyumsuz genelleme = güvenlik hâli) | 67, 79 |
| Ödül modeli = uzunluk vekili; ödül kurcalama; izleyici vekilin parçası olur | 61 | — | 64, 67, 73 |
| Altı hizalama hedefi; ödül niyetin kanıtıdır; işbirlikçi ters pekiştirmeli öğrenme; yardımsever/dürüst/zararsız | 61 | 62 (üç sıfat) | 64, 66, 69 |
| Reddetme; güvenlik eğitimi; aşırı güvenlik; iki kümeli cetvel; birkaç yüz örnek yeter | 62 | — | 63, 66, 71 |
| Bağlamsal uyumsuzluk (beş kategori) | 62 | — | 65, 66, 73 |
| Maliyet modeli; Lagrange çarpanı; kural tabanlı ödül | 62 | — | 64, 94 |
| Sığ hizalama; ret öneki; ret tek yönde; ince ayar reddi siler; yarışan hedefler; uyumsuz genelleme | 62 | — | 63, 68, 74, 76 |

### Batch 16'da gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 67–70'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 16'da gerçekleşen |
|---|---|
| Temsil; aktivasyon (3) | 67 (sonda ara katman aktivasyonundan tek özelliği okur) ✓ |
| Ölçek yasaları; ölçekleme sözcüğü (9) | 70 (**sözcüğün iki anlamı ayrıldı**: 9'da hesap kararı, 70'te dağıtım kararı; eğri önlemi planlanabilir kılar) ✓ **altmış bir makale aralıklı geri çağırma** |
| Kayıp; gradyan (2, 3) | 67 (arka kapı eğitimi; gradyan en ucuz değişikliği bulur) ✓ |
| Ön eğitimden gelen kalıplar; veri (8, 14) | 67 (sentetik belgelerle öğrenilen durum bilgisi), 68 (tehlikeli bilgi eğitim verisinden gelir) ✓ |
| Cetvel bir tasarım ürünüdür; Goodhart (16) | 67 (sınavı tanıyan sınanan), 68 (taban seçimi), 69 (hesap eşiği neden vekil), 70 (eşiği kim koyar) ✓ |
| Halüsinasyon; uydurma (17) | 67 (konfabülasyon aldatmadan ayrıldı) ✓ |
| Açık ağırlık; açık kaynak; açıklık cilası; lisans (20) | 68 (**vaat taksidi**: marjinal risk, yayımlama gradyanı), 69 (**69 koordinatı ödendi**: muafiyet ↔ tanım) ✓ |
| İnce ayar; LoRA (19) | 68 (unutturmanın on ilgisiz örnekle geri kazanılması) ✓ |
| Örnekle öğrenme (23) | 67 (bağlam dışı akıl yürütme örnekle öğrenmenin tersi olarak kuruldu) ✓ |
| Sistem istemi (24) | 67 (durum bilgisinin istemle verilmesi; "unutma, sen bir dil modelisin") ✓ |
| Düşünce zinciri; sadakat (31, 32) | 67 (sonradan gerekçe; sadakat %25 ve %39; izlenebilirlik sadakatin yerini aldı) ✓ |
| Doğrulayıcı; üretmek ↔ doğrulamak (35) | 70 ("yapamaz" argümanı yetenek çıkarımına bağlı) ✓ |
| Görev ufku; insan süresi birimi (40) | 68 (Cybench'in ilk çözüm süresi), 70 (iki-sekiz saatlik ara kontrol noktası) ✓ |
| Hakem model; kendini kayırma (45) | 68 (taban ve karşılaştırma kolu) ✓ |
| Kod ajanları; ajan güvenliği; kum havuzu (55, 58) | 68 (bir günlük açıklar, tehdit istihbaratı kaydı), 70 ("kontrol altında" argümanı) ✓ |
| Kısayol ve hile; imkânsız test (57) | 67, 70 ✓ |
| Devir; aşırı güvenme; kalibrasyon açığı (59) | 68 (zararlı manipülasyon risk alanı), 70 ✓ |
| Belirtim oyunu; içsel eniyileyici; izleyici vekilin parçası olur; ödül kurcalama (61) | 67 (düşmanca eğitim gizlemeyi öğretir; aldatıcı hizalanma hipotezi), 69 (vekilin ölçtüğü şey), 70 ✓ |
| Reddetme; sığ hizalama; ince ayar reddi siler (62) | 67 (arka kapı ve tetikleyici), 68 (**ret indirenin ayarına bağlı**) ✓ |
| Jailbreak; kırmızı takım; savunma katmanları; açık ağırlığın üç kapısı (63) | 67 (düşmanca eğitim), 68 (üç kapı marjinal risk sorusuna bağlandı), 69 (kırmızı takım yasal yükümlülük oldu) ✓ |
| Ölçeklenebilir denetim; müzakereci hizalama; eleştirmen (64) | 67 (entrika karşıtı eğitim), 69 (denetimin erişimi) ✓ |
| Güven; eğri altı alan; kalibrasyon (65) | 67 (değerlendirme farkındalığı 0,83; yalan dedektörü 0,99) ✓ |
| Dalkavukluk; simulakr; karakter vektörü; beliren hizalanmama (66) | 67 (aldatmanın taksonomisinde dalkavukluk satırı; rol oyunu itirazı), 70 (zararlı manipülasyon) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): kalibrasyon ve hakem güveni (65 → 71, 73),
öz-yansıma ↔ hakem (52/56 → 73), sorgu yeniden yazma (44 → 73), süreç denetimi (38 → 73), kısıtlı üretim
(30 → 74), dalkavukluğun dört biçimi (66 → 71, 73), kimin görüşü (66 → 72, 73), Wooldridge–Jennings (51 → 111),
MCP üçlüsü (49/53 → 115).

### Batch 16'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 16'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Aldatma; sistematik yanlış inanç; inancın kabul olarak tanımı; stratejik aldatma | 67 | 68 (bilgi operasyonlarında insan tarafı), 70 ("güvenilir" argümanı) | 71, 73, 74, 79 |
| Model organizması; uyuyan ajan; arka kapı; tetikleyici | 67 | 70 ("yapamaz" argümanının karşısındaki tehdit) | 74, 76, 79 |
| Hizalama taklidi; aldatıcı hizalanma (61'in hipotezinin ölçümü) | 67 | 70 (güvenlik savunmasının "güvenilir" argümanı) | 74, 77, 116 |
| Entrika; bağlam içi entrika; gizli eylem | 67 | 70 (kritik eşiğin gerekçesi) | 71, 74, 116 |
| Durum farkındalığı; bağlam dışı akıl yürütme; değerlendirme farkındalığı | 67 | 68, 69 (eşiğin ölçümü), 70 (yetenek çıkarımı) | 71, 72, 73, 78 |
| Yetenek saklama; parola kilidi | 67 | 69, 70 (üç açık halkadan biri) | 71, 73, 116 |
| Sonda; izlenebilirlik; yapay zekâ kontrolü; hizalama denetimi | 67 | 69 (denetimin erişimi), 70 ("kontrol altında") | 74, 75, 76, 77 |
| Marjinal risk; taban; altı adımlı çerçeve | 68 | 69 (kanıt boşluğu ve düzenleme), 70 | 71, 72, 78, 79 |
| Bir günlük açık; bayrak yakalama; ilk çözüm süresi | 68 | 70 (eşiklerin ölçümü) | 71, 79 |
| Unutturma; geri kazanım saldırısı; kurcalamaya dirençli koruma | 68 | 70 (ağırlık güvenliği) | 72, 74, 76 |
| Yayımlama gradyanı; yapısal erişim | 68 | 69 (muafiyet), 70 | 72, 80 |
| Hesap eşiği; sistemik risk; muafiyet; uygunluk karinesi | 69 | 70 (gönüllü çerçevelerin yasadaki boşluğu doldurması) | 71, 78, 80 |
| Yönetişim katmanları: yasa, standart, ilke, bildirge, taahhüt | 69 | 70 | 78, 80, 116 |
| Kara kutu ↔ beyaz kutu ↔ kutu dışı denetim; üç katmanlı denetim; şeffaflık endeksi | 69 | 70 (doğrulamanın kurum içi kalması) | 71, 73, 74, 80 |
| Yetenek eşiği ve gerekli korumalar; kritik yetenek düzeyi; koşullu taahhüt | 70 | — | 71, 78, 116 |
| Güvenlik savunması ve dört argüman: yapamaz, kontrol altında, güvenilir, danışılabilir | 70 | — | 71, 74, 77, 116 |
| Yetenek çıkarma; erken uyarı eşiği; ağırlık güvenliği kademeleri | 70 | — | 71, 79, 80 |

### Batch 26'da gerçekleşen tekrarlar (planlananların tahsili)

- **Veri ve model paralelliği (8 → 107), doksan dokuz makale aralıklı — serinin en uzun ertelemelerinden
  biri kapandı.** 8'de Llama 3'ün dört eksende bölündüğü söylenmiş, veri ve model paralelliğinin tanımı
  verilmiş, kurulumu ertelenmişti. 107 dördünü de kuruyor ve her birine bir fatura yazıyor: veri (2Ψ
  hepsi-indirge, model küçülmez), tensör (katman başına dört hepsi-indirge, sunucu içi), boru hattı
  (noktadan noktaya, `(p − 1)/m` kabarcık), dizi (bedava, çünkü hepsi-indirge zaten iki parçadır).
- **Hepsi-hepsiye iletişim (85 → 107): tekrar değil YERLEŞTİRME.** 85 uzmanlar karışımının her katmanda bir
  hepsi-hepsiye doğurduğunu kurmuştu. 107 mekanizmayı yeniden anlatmıyor; dört eksenin **yanına** koyup
  ikisini ayırıyor — uzman paralelliği yalnızca o mimaride vardır, kesim bandını zorlar (89), ve yoğun bir
  modelde bu kalem hiç bulunmaz.
- **Çatı çizgisi ailesi (89/106 → 107/108).** 89 aracı kurmuştu, 106 eğitim adımına uygulamıştı; 107 kesim
  bandı ölçümlerini (892 GB/s ↔ 12,9 TB/s) o eksene bağlıyor, 108 ise sırt noktasını çekirdek düzeyine
  indiriyor ve "hızlandırıcıyı hızlı yapan şey çıkarılandır" cümlesinin öbür yüzünü veriyor: özel birime
  uymayan iş 16 kat yavaş koşuyor.
- **FlashAttention (25/86 → 108): tekrar değil GENELLEME.** 25 mekanizmayı (blok blok hesap, ara matris hiç
  yazılmıyor), 86 sonucu (işlem sayısı duvar saati değildir) vermişti. 108 ikisini de tekrarlamıyor;
  softmax'ın neden birleştirmeyi engellediğini adlandırıp aynı hamleyi **bağımlılık kırma** olarak yeniden
  okuyor ve üç uygulamanın kullanım oranını karşılaştırıyor.
- **Kontrol noktası ve arıza istatistikleri (8 → 109): tekrar değil DEVAM.** 8'in 466/419 sayıları
  tekrarlanmıyor; 109 onlardan `M = 185,6 dakika`yı türetip Young'ın formülüne koyuyor ve kaydın maliyetinin
  aralıktan daha belirleyici olduğunu gösteriyor.
- **Ablasyon disiplini (99 → 109), on makale aralıklı.** 99'da "bir düzeltmenin neyi düzelttiğini bilmek için
  ayrı bir deney gerekir" kuralı kurulmuştu. 109 bunun alan içindeki en temiz örneğini veriyor: aynı veri
  yığınlarının daha eski bir kontrol noktasından geçirilmesi "kötü veri" açıklamasını eliyor.
- **Yeniden üretilebilirlik (102 → 109), yedi makale aralıklı ve beklenmedik bir yönde.** 102 onu bilimsel
  bir erdem olarak kurmuştu; 109'da veri sırasının yeniden üretilebilir olması bir **operasyon aracına**
  dönüşüyor — sıra belirsizse ne atlayacağını bilemezsin, eleme deneyini de kuramazsın.
- **Othello sondası (77 → 110), otuz üç makale aralıklı — ve sınanan şeye dönüştü.** 77 okuma artı
  müdahalenin en güçlü kanıt biçimi olduğunu kurmuştu. 110 onu tekrar etmiyor; aynı kanıtın geçtiği
  modellerin kurduğu haritanın yanlış olabildiğini gösteriyor ve sorunun "okunabilir mi" değil "hangi
  derinlikte sınadın" olduğunu söylüyor.
- **Aşırı optimizasyon (13 → 110), doksan yedi makale aralıklı.** 13'te ödül modeli gerçek tercihin kusurlu
  bir vekiliydi; 110'da dünya modeli gerçek çevrenin kusurlu bir vekili ve hayalî çevrede eğitilen ajan onun
  açıklarını sömürüyor. Aynı biçim, başka nesne.
- **Markov karar süreci (37 → 110), yetmiş üç makale aralıklı.** Geçiş fonksiyonu orada çevrenin bir
  özelliğiydi; 110 dünya modelini tam olarak onun öğrenilmiş kopyası diye tanımlıyor.

### Batch 26'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | Kuruldu | Yakın tekrar | Planlanan uzun aralıklı tekrar |
|---|---|---|---|
| Dört bölme ekseni ve her birinin iletişim faturası | 107 | 108 (kartın içinde kalan kayıp), 109 (durumun bölünmüş olması iki aşamalı kaydı mümkün kılıyor) | 114 (uçtan uca sentez) |
| ZeRO kademeleri: 4Ψ + 12Ψ/N, 2Ψ + 14Ψ/N, 16Ψ/N | 107 | 109 (kontrol noktasının kart başına payı) | 114 |
| Kabarcık oranı `(p − 1)/m` ve `(n/t − d)/(B/b)` | 107 | 109 (ölçekle düşen kullanım oranı) | 114 |
| Bir FLOP bir zaman birimi değildir; %0,2 ↔ %39 ve 319 kat | 108 | — | 114, 116 (alanın bilmedikleri: ölçüt seçimi) |
| Çekirdek, birleştirme, bellek yerleşimi | 108 | 109 (geride kalanın kod tarafı) | 114 |
| Bellek kullanım verimi; hangi cetvelin geçerli olduğu | 108 | — | 114, 118 |
| `T* = √(2δM)` ve `√(2δ/M)` | 109 | — | 114 |
| Gözlemin üç katmanı ve frekans ayrışması | 109 | — | 114, 115 (ürün tarafındaki karşılığı) |
| Kayıp sıçraması ve veri ↔ durum bileşimi | 109 | — | 114, 116 |
| Dünya modelinin iki soyu | 110 | 111 (somutlaşmış ajan), 112 (sürekli öğrenme) | 117 (AGI tartışması), 118 (sentez) |
| Myhill–Nerode türevi iki ölçüt; sınavın derinliği | 110 | 111, 113 | 116, 117 |
| Eğitim dağılımının kapsamı ölçekten belirleyici olabiliyor | 110 | 111, 112 | 114, 116 |
| Eylem arayüzü iki sayıya iner: kaç kutu, saniyede kaç karar | 111 | 112 (arayüz ↔ güncelleme yolu benzerliği yok, ayrım korundu) | 115 (ürün arayüzü), 116, 118 |
| Ön eğitim anlamsal yarıyı taşır, motor yarıyı taşımaz | 111 | 113 (aynı ayrımın bilimdeki hâli: üretim ↔ doğrulama) | 116, 117 |
| Metin yan üründür, yörünge değildir; veri kıtlığı bir üretim biçimi sorunudur | 111 | 113 (peşin ödenmiş doğrulama altyapısı — kardeş gözlem) | 116, 118 |
| Ucuz kaynak bedava değildir: benzetim ve başka gövdeler | 111 | — | 115, 116 |
| Güncellemenin dört yolu ve dört ayrı faturası | 112 | 113 (bilgi eskimiyor, henüz yok) | 115 (ürün katmanında hangi yol), 118 |
| Rank-bir güncelleme dik anahtarlara dokunmaz: koruma ile sonuç taşımama aynı kimlikten | 112 | — | 116, 117 |
| Yerelleştirilebilir olmak düzenlenebilir olmak değildir | 112 | 113 (okunabilirlik ↔ doğruluk zincirinin devamı) | 116, 117 |
| Değişikliğin sonuçları taşınmalı mı: ağırlık ↔ bağlam kararı | 112 | 114 (zincirde post-training'in tek geri alınabilir halka olması) | 115, 118 |
| Üretmek ↔ doğrulamak oranı bir alanda yapay zekânın işe yaramasını belirler | 113 | 114 (geri alma maliyeti aynı biçimin başka nesnesi) | 116, 117, 118 |
| Doğrulama üretimden önce hazırsa sonuç okunabilir kalır | 113 | 114 (belgelenen halka hangi soruyu cevaplatır) | 116, 118 |
| Üretim ucuzlayınca çeşitlilik ucuzlamıyor | 113 | — | 116, 117 |
| Maliyetin dağılımı ile geri alınamazlığın dağılımı ters | 114 | — | 115 (ürün zincirinde aynı soru), 118 |
| Zincirde FLOP'la tartılamayan iki halka var: tercih etiketleri ve ilkeler | 114 | — | 115, 116, 118 |

### Batch 25'te gerçekleşen tekrarlar (planlananların tahsili)

- **Dikkat üçlüsü ve katman yığını (6/7 → 103), doksan yedi makale aralıklı — 100 ve 102'nin numarasız
  işaretlerinin kapanışı.** 6'da sorgu-anahtar-değer tek bir satır hâlinde elle hesaplanmıştı, 7'de blok
  anatomisi ve parametre sayımı taban model üzerinden yapılmıştı. 103 ikisini birleştirip **çalışan** bir
  model kuruyor: aynı üçlü artık dört boyutlu, aynı sayım artık 364 parametre ve maskenin sayısal karşılığı
  ilk kez kare bir matris olarak görünüyor. 100'ün "kasıtlı boşluk" cümlesi ile 102'nin "serinin bir sonraki
  fazı" cümlesi burada ödendi.
- **Bağlanmış embedding (7 → 103).** 7'de taban modelin tablosunda "paylaşılan embedding tablosu" diye tek
  satırda sayılmıştı; 103 bunu adlandırıyor, gerekçesini Press–Wolf'a bağlıyor ve tasarrufu ölçüyor (%7,1;
  GPT-2 ölçeğinde neredeyse %30).
- **Kaba fatura kuralı (8 → 103/104).** 8'de 6ND kurulmuştu; 103 aynı kuralı sayılabilir bir modelde sınıyor
  ve token başına 648 ↔ 728 farkının nereden geldiğini gösteriyor (80 parametre hiç çarpma yapmıyor).
  104 aynı kuralı tokenizer kararına bağlıyor: harf düzeyi sözlük 5,25 kat token demek, yani 5,25 kat hesap.
- **Bayt çifti kodlaması (4 → 104), yüz makale aralıklı.** 4'te algoritmanın adımları anlatılmıştı; 104 onu
  **çalıştırıyor** ve 4'ün örnek kelimesi "okullarda" bu kez ok | ul | larda diye bölünüyor. Aynı algoritma,
  başka derlem, başka ızgara.
- **Sözlük boyu bir tahsis kararıdır (15 → 104).** 15'te Tao ve ark.'nın ölçek yasasıyla kurulmuştu; 104 aynı
  takası kendi derleminde ölçüyor ve marjinal getirinin 366 kat daraldığını gösteriyor.
- **İndirgenemez hata ve entropi (2/94 → 104).** 2'nin "gürültü tabanı" ile 94'ün entropisi aynı sayıda
  buluşuyor: 2·ln2/3 = 0,46210. Modelin durduğu yer 0,46286. Gerçek bir derlemde bu tabanın bilinmediği,
  bu yüzden kaybın düşmeyi bırakmasının iki ayrı şey anlamına gelebileceği kaydı da burada düşüldü.
- **Ölçüm disiplini (99/101 → 104), zorunlu geri çağırma.** 99'un "fark kendi gürültüsünden büyük olmalı"
  kuralı kendi deneyimize uygulandı: beş tohumlu sapma 0,12669 ölçüldü ve sekiz ablasyonun hiçbiri iki
  sapmayı aşmadı. 101'in "ortalama her zaman özet değildir" uyarısı da tahsil edildi — sonuçlar iki öbekte
  toplandı ve ortalama hiçbir koşunun vermediği bir sayı çıktı.
- **Dikkat ağırlığı açıklama değildir (6 → 104).** 6'da Jain–Wallace ile bir tartışma olarak verilmişti;
  104 aynı şeyi kendi modelinde ölçüyor: ağırlık farkı 0,0215, değer farkı 0,6410. Bilgiyi taşıyan şey tartı
  değil, tartılan şey.
- **Kayıp maskesi (12 → 105).** 12'de talimat/cevap ayrımı olarak kurulmuştu; 105 maskenin **neyi koruduğunu**
  ölçüyor: maskenin içindeki fiil kuralı yerinde kalıyor (0,9990 → 0,9986), dışındaki her şey bozuluyor
  (derlem kaybı 0,46286 → 1,23545).
- **Yüzeysel hizalama hipotezi ve hizalama vergisi (11/12 → 105).** LIMA'nın hipotezi en küçük ölçekte
  doğrulandı ve vergisi bir sayıya çevrildi.
- **Bradley–Terry ve KL tasması (13/94 → 105).** 13'ün tablosundaki 0,693, DPO kaybının başlangıç değeri
  olarak aynen çıkıyor; 94'ün nat cinsinden KL'si tasmanın ölçüsü olarak kullanılıyor ve δ = 1,5 ÷ β
  ilişkisi ölçülüyor.
- **Aşırı optimizasyon (13 → 105).** 13'te Goodhart yasası olarak kurulmuştu; 105 bunun DPO'daki biçimini
  gösteriyor — vekil ölçü (δ) yükselirken çıktının kendisi kötüleşebiliyor.
- **Çatı çizgisi ve işlem yoğunluğu (89/26 → 106) — tekrar değil, devam.** 89'un aracı yeniden kurulmadı;
  eğitim adımına uygulandı. 26'nın "işlem yoğunluğu yığın büyüklüğüne eşittir" hesabı, eğitimde "mikro yığın
  çarpı dizi uzunluğu"na genişletildi ve iki rejim arasındaki 1.024 kat ölçüldü.
- **AdamW'nin bedeli (95 → 106).** 95'te "her yöne kendi adımı" denmişti; 106 o adımın parametre başına sekiz
  fazladan bayt ettiğini gösteriyor.
- **Karma hassasiyet (27/89 → 106).** 89'da donanım sözleşmesi olarak verilmişti; 106'da eğitim durumunun
  16 baytlık muhasebesinin içinde beliriyor.
- **Kontrol noktası (8 → 106), çakışma uyarısı.** 8'in kontrol noktası ile alan yazınının "activation
  checkpointing"i aynı şey değil; ayrım 106'da açıkça yapıldı.

### Batch 25'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

- **Parametre defteri ve boyut muhasebesi, bağlanmış embedding, maskelenmiş dikkat matrisinin sayısal
  hâli (103).** Planlanan tekrar: 107 (aynı defter kartlara bölündüğünde), 114 (bir sınır modelin defteri).
- **Kendi tokenizer'ını kurmak; sözlük boyunun marjinal getirisi; entropi tabanı; koşular arası sapmanın
  kendi deneyinde ölçülmesi (104).** Planlanan tekrar: 109 (koşunun gözleminde sapma), 114 (üretim ölçeğinde
  veri ve tokenizer kararları), 116 (hangi iddianın kaç koşuya dayandığı).
- **Kayıp maskesinin koruma alanı; δ = 1,5 ÷ β; tercihin karşılanması ile çıktının ayrışması (105).**
  Planlanan tekrar: 112 (kişiselleştirme tercih verisiyle yapıldığında aynı ayrışma), 115 (ürün düzeyinde
  hizalama kararları), 116 (hizalama yöntemlerinin açık soruları).
- **Eğitim durumunun 16 baytı, aktivasyon belleği, aktivasyonları yeniden hesaplama, model FLOP kullanım
  oranı, bellek merdiveni (106).** Planlanan tekrar: 107 (bölmenin bu defteri nasıl değiştirdiği),
  108 (bant genişliğini azaltan çekirdek mühendisliği), 109 (kullanım oranının koşu boyunca izlenmesi),
  114 (bütün defterin tek bir koşuda toplanması).

### Batch 24'te gerçekleşen tekrarlar (planlananların tahsili)

- **Ölçümün disiplini (16 ve 22 → 101), seksen beş ve yetmiş dokuz makale aralıklı — bağlayıcı koordinatın
  kapanışı.** 16'da "bir farkın anlamlı sayılabilmesi için kümenin büyüklüğüne göre değerlendirilmesi gerekir"
  bir kural olarak verilmişti; 22'de aynı ders 50 örneklik kümede 4 puanın iki örnek ettiği hesabıyla
  somutlaşmıştı. 101 ikisinin de cümlesini alıntılayarak açıyor ve aygıtı kuruyor: sıfır hipotezi, p değeri,
  eşleştirme, güç ve çoklu karşılaştırma. **Defterdeki son açık koordinat böylece kapandı.**
- **pass@k ve görev ufku (33/40 → 101), dört batch'tir devreden planlı tekrar — burada tahsil edildi.** 33'te
  kapsama 1 − (1 − p)ᵏ ile kurulmuştu ve p **gerçek olasılıktı**; 101 aynı formülün tahminle yazıldığında yanlı
  bir tahminciye dönüştüğünü gösteriyor (gerçek 0,67232, yerine koyma tahmincisinin ortalaması 0,59359).
  40'ın 207 günlük ikiye katlanma süresinin yanındaki 166–240 günlük güven aralığı da burada açıklandı:
  eğim, tek tek noktalardan daha dar bir aralıkla kestirilebiliyor.
- **Yanlılık ↔ oynaklık (93/96 → 101).** 93'te tahmincideki yanlılık, 96'da üçlü ayrışım kurulmuştu; 101 ayrımı
  ölçüm pratiğine çeviriyor: oynaklıktan gelen hata tekrarla söner, yanlılıktan gelen sönmez. 93'ün "bir sonraki
  faz" işareti bu bölümde ödendi.
- **Taban çizgisi kültürü (16/97 → 99).** 97'de yöntem seçiminin ölçütüydü; 99'da bir tasarım kararına dönüştü
  ve budama literatüründeki 81 bildirinin karşılaştırma seyrekliğiyle ölçüldü. 98'in okuyucu tarafındaki
  "ayar bütçesi" dersi burada yazar tarafına geçti.
- **Kontrollü bozma (96/97 → 99).** Rastgele etiket ve rastgele döndürme deneyleri 99'da bir **deney biçimi**
  olarak yeniden okundu; eklenen şey bozulmamış koşunun aynı kurulumda çalıştırılması zorunluluğu
  (85,75 ↔ 9,78 karşılaştırması olmadan bozma tek başına bir gözlemdir).
- **Ablasyon (98 → 99).** 98'de tanımlanmıştı; 99 kanıt yükünü ekliyor: fark koşular arası sapmadan büyük
  olmalı (0,003 ↔ 0,005) ve tek tek ablasyonlar etkileşimi ölçmez.
- **Yeniden üretme (9 → 102), doksan üç makale aralıklı.** 9'da "bir çalışmanın bağımsız tekrarı" diye
  tanımlanmıştı; 102 terimin alanda iki ters yönde kullanıldığını gösterip soruyu üç dereceye ayırıyor.
- **Kirlilik (72 → 102).** 72'de sınav sorularının eğitim derlemine sızması; 102'de test kümesinin bilgisinin
  veri hattına sızması. Aynı yöndeki iki hata, iki ayrı yerde; ayrım bir "Kendini yokla" kutusuyla yapıldı.
- **Açıklık eksenleri ve belgeleme (20/80 → 102).** 20'nin eksenlerine bir **hesap ekseni** eklendi (küme
  düzeyinde hesap gerektiren hiçbir bildiri yeniden üretilemedi); 80'in belgeleme tartışmasına zorunluluğun
  davranışı hızla değiştirdiği ama doğrulama yerine geçmediği eklendi.
- **Serinin bütün omurgası (1–99 → 100).** Planlı büyük geri çağrım gerçekleşti: 41 ayrı makaleye numaralı
  gönderme, hiçbir sayı yeniden ölçülmeden.

### Batch 24'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

- **Sınanabilir hipotez, öngörü ↔ sonradan açıklama, ön kayıt, arama bütçesinin raporlanması (99).**
  Planlanan tekrar: 104–105 (kendi eğitim koşunda bütçenin yazılması), 113 (bilimde yapay zekâ: ön kayıtın
  alan dışındaki karşılığı), 116 (açık soruların dürüst envanteri).
- **Sıfır hipotezi, p değeri, eşleştirilmiş karşılaştırma, çoklu karşılaştırma düzeltmesi, tahminci yanlılığı (101).**
  Planlanan tekrar: 109 (eğitim koşusunun gözlemi ve ölçüm gürültüsü), 114 (bir sınır modelin karşılaştırma
  kararları), 116 (hangi iddianın hangi güvenle taşındığı).
- **Tekrarlanabilirliğin üç derecesi, veri sızıntısı, açık bilim (102).** Planlanan tekrar: 103–105 (elle
  kurmanın kendisi ikinci derecenin sınavıdır), 107–109 (dağıtık eğitimde belgelenmesi gereken değişkenler),
  115 (ürün kurarken veri hattının denetimi).
- **Haritanın kendisi (100).** Planlanan tekrar: 118 (serinin sentezi; harita orada yeniden çizilir).

### Batch 23'te gerçekleşen tekrarlar (planlananların tahsili)

- **Öğrenme oranı eşiği (2 → 95), doksan üç makale aralıklı — bu batch'in en temiz formalizasyonu.** 2'de
  α < 3/14 ≈ 0,214 eşiği üç evlik oyuncak problemde **deneyerek** bulunmuştu ve tablo hâlinde kaydedilmişti.
  95, aynı sayıyı hiç deney yapmadan türetiyor: kaybın ikinci türevi (2/3) × 14 = 28/3 ve genel kural
  α < 2/λ. Ölçüm ile teoremin aynı ondalık basamağa kadar örtüşmesi, bilinçli formalizasyonun ne olduğunu
  tek şekilde gösteriyor (Şekil 2).
- **Gradyan inişi ve en dik iniş (2/3 → 95).** 2'de "eğimin ters yönüne git" bir tarifti; 95'te 91'in nokta
  çarpımı ve Cauchy–Schwarz eşitsizliği üzerinden **kanıtlanmış bir seçim** oldu. 3'ün geriye yayılım ↔
  gradyan inişi ayrımı korundu ve tekrarlanmadı.
- **Vektör uzayı ve özdeğer (91/92 → 95).** 91'in yön dili gradyanın tanımında, 92'nin simetrik matris
  sonucu Hessian'ın özdeğerlerinde doğrudan kullanıldı; iki makale de yeniden anlatılmadı, kullanıldı.
- **Çizelgeler (8 → 95).** 8'de ısınma ve kosinüs sönümü olgu olarak okunmuştu; 95 ikisinin de gerekçesini
  veriyor (uyarlamalı paydanın ilk adımlardaki güvenilmezliği; sabit adımlı SGD'nin nokta değil bulut
  bulması). AdamW'nin bir cümlelik açıklaması da burada yüz kat farkla hesaplandı.
- **Aşırı öğrenme, indirgenemez hata ve düzenlileştirme (2 → 96), doksan dört makale aralıklı.** 2'de üçü de
  ölçümle gösterilmişti; 96 üçünü tek ayrışımda birleştiriyor ve düzenlileştirmenin gerekçesini sayıyla
  veriyor (yansız 1,5000 ↔ bilerek yanlı 1,0909). Geman ve ark.'nın 2'de adı konan ayrışımı burada tanımlandı.
- **Çift iniş (2/9 → 96).** 2'de ileri okuma notu, 9'da randevunun kapanışıydı; 96 deseni model genişliği,
  eğitim süresi ve örnek sayısı olmak üzere **üç eksende** kuruyor ve etkin model karmaşıklığını tanıtıyor.
  Curth ve ark.'nın itirazı üçüncü kez anıldı ama tekrarlanmadı: bu kez "eksen seçimi" örüntüsünün örneği.
- **Rastgele etiket deneyi (72 → 96).** 72'de ezberin kanıtıydı; 96'da **neyi çürüttüğü** kuruldu (kapasiteye
  bakan sınırlar iki durumu ayırt edemez) ve Nagarajan–Kolter'ın düzgün yakınsama sonucuyla sıkılaştırıldı.
  Bilinçli formalizasyon; tekrar sayılmaz.
- **Ezberin gerekliliği (72 → 96).** 72'de Feldman'ın kuramsal sonucu anılmıştı; 96 aynı iddianın **ölçümünü**
  ekliyor (ImageNet'te yüzde 32'lik küme, marjinal fayda yüzde 3,4 ↔ rastgele kümede 2,6).
- **k-ortalamalar (43 → 97), elli dört makale aralıklı.** 43'te bir dizin aracıydı (ters dosya); 97'de kendi
  işinde, varsayımıyla ve NP-zorluk ↔ logaritma k güvencesi ayrımıyla kuruldu.
- **Üç cetvel ve boyutluluk laneti (91/5/43 → 97).** En yakın komşunun varsayımı "yakın"ın tanımına bağlı
  olduğu için, 91'in zıt sıralama bulgusu ve 5/43'ün lanet okuması yöntemin kırılma noktası olarak geri geldi.
- **Taban çizgisi kültürü (16 → 97 ve 98).** 16'nın "cetvel arayışı" disiplini 97'de yöntem seçiminin,
  98'de okuma denetiminin ölçütü oldu; Wolpert ve Delgado 97'de, Melis ve Musgrave 98'de sayı verdi.
- **Levy–Goldberg–Dagan (4/91 → 98).** 91'de embedding'lerin matematiği hakkında bir bulguydu (0,491 ↔
  0,452 ↔ 0,530); 98'de aynı bulgu bir hakemlik dersi olarak okundu. Aynı çalışma, iki farklı soru.

### Batch 23'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

- **Gradyan (vektör olarak), yönlü türev, Hessian, koşul sayısı, momentum, uyarlamalı yöntemler (95).**
  Planlanan tekrar: 103–105 (elle kurulan eğitim döngüsünde adım boyu ve eniyileyici seçimi), 106–109
  (dağıtık eğitimde yığın büyüklüğü ↔ öğrenme oranı ilişkisi ve kırpmanın operasyon gerekçesi).
- **Yanlılık ↔ oynaklık ayrışımı, etkin model karmaşıklığı, örtük düzenlileştirme (96).** Planlanan tekrar:
  **101** (yanlılık ↔ oynaklık ayrımının ölçüm istatistiğindeki karşılığı — 93'ün numarasız işareti oraya
  gidiyor), 102 (tekrarlanabilirlik ile oynaklığın ilişkisi), 114 (bir sınır modelin genelleme kararları).
- **Dört klasik aile ve varsayımları (97).** Planlanan tekrar: 99 (taban çizgisi seçimi bir deney tasarımı
  kararıdır), 113 (bilimde yapay zekâ: tablo verisi ve klasik yöntemler), 115 (ürün kurarken hangi ailenin
  seçileceği).
- **İddia-kanıt haritası, hakemliğin tutarlılığı, ayar bütçesi asimetrisi, ön baskı ↔ yayımlanmış sürüm (98).**
  Planlanan tekrar: 99 (ablasyonun kanıt yükünü ödemesi), 100 (haritanın sentezinde okuma disiplininin
  kullanılması), 101 (anlamlı farkın istatistiği), 102 (tekrarlanabilirlik ve açık bilim), 116 (açık soruların
  dürüst envanteri).

### Batch 22'de gerçekleşen tekrarlar (planlananların tahsili)

- **Embedding ve dağılımsal hipotez (4 → 91), seksen yedi makale aralıklı — serinin en uzun aralıklı geri
  çağırması.** 4'te "anlamı geometriye çeviren tablo" olarak kurulmuştu ve analoji aritmetiğinin sınırı
  orada ölçümle tartışılmıştı. 91 aynı örneği **başka bir soruyla** açıyor: "kral eksi erkek artı kadın"
  hesabının doğru olup olmadığını değil, **neden sorulabildiğini** soruyor ve cevabı vektör uzayının iki
  işleminde buluyor. Tekrar değil, bilinçli formalizasyon (SOZLESME §3).
- **Rank ve içsel boyut (19 → 92), yetmiş üç makale aralıklı.** 19'da rank "eklenen güncellemenin kaç yön
  taşıdığı" idi ve içsel boyut 1.608 ↔ 207 sayılarıyla ölçülmüştü. 92 ikisini de tekil değer spektrumu
  diliyle yeniden okuyor: rank 1'in yetmesi, spektrumun ilk basamağının baskınlığıdır.
- **Örnekleme ve sıcaklık (10 → 93), seksen üç makale aralıklı.** 10'da sıcaklık dağılımın biçimini değiştiren
  bir düğmeydi; 93'te aynı düğme üstel ailenin **doğal parametrelerini ölçekleyen** bir sayı olarak yeniden
  kuruluyor ve 65'teki sıcaklık ölçeklemenin neden tek parametreyle çalıştığı buradan çıkıyor.
- **Kalibrasyon (16/65 → 93).** "Beklenen kalibrasyon hatası" adındaki "beklenen" sözcüğü, 93'te tanımlanan
  beklenti işleminin kendisi olarak gösterildi; 65'in sayıları tekrarlanmadı, tanımı kuruldu.
- **Kapsama ve pass@k (33 → 93).** 33'ün 1 − (1 − p)^k hesabı, **p verilmişken doğru** olduğu vurgulanarak
  korundu; yeni olan, ölçülmüş bir orandan aynı formülle kapsama raporlamanın yanlı olduğu. Bu bilinçli
  formalizasyondur; **33/40'ın pass@k + görev ufku planlı tekrarı yine tahsil edilmedi** ve 101'e devrolur.
- **Perplexity ve nat/token (5/9 → 94).** 5'te "şaşkınlık ölçüsü" sezgisiyle, 9'da kayıp eğrisinin birimi
  olarak geçmişti; 94 ikisini tek özdeşlikte birleştiriyor (perplexity = e üzeri kayıp) ve 9'un Chinchilla
  formülündeki 1,69'luk sabit tabanı **dilin kendi entropisi** olarak yeniden okuyor.
- **KL cezası (13 → 94), seksen bir makale aralıklı.** 13'te işlevi verilmişti ("ayrıştıkça büyüyen ceza");
  94'te tanımı (çapraz entropi eksi entropi), yönü (ileri ↔ ters) ve birimi (nat) kuruldu ve numarasız işaret
  ödendi. 13'ün kısayolu — DPO — 94'te üstel ailenin kapalı çözümü olarak yeniden okundu.
- **Artık bağlantı (7 → 92).** Bu kez bileşenin **ikinci** işi ölçüldü: saf dikkat yığınının rank çöküşünü
  durdurması. Karar #2'nin yasakladığı "sönen gradyanı çözer" cümlesiyle karıştırılmaması için ayrım
  gövdede açıkça yapıldı.

### Batch 22'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

- **Vektör uzayı, doğrusal dönüşüm, taban (91).** Planlanan tekrar: 95 (gradyanın bir yön olması), 103
  (mikro-GPT'nin bütün katmanları), 106 (matris çarpımının donanım okuması).
- **Norm ve kosinüs benzerliğinin biçimsel ayrımı (91).** Planlanan tekrar: 97 (klasik yöntemlerde uzaklık
  ölçüleri), 112 (kişiselleştirmede benzerlik).
- **Eşyönlülük / eşyönsüzlük (91).** Planlanan tekrar: 96 (temsil geometrisi ile genelleme), 101 (ölçünün
  varsayımını sınamak).
- **Tekil değer, tekil değer ayrışımı, Frobenius normu (92).** Planlanan tekrar: 95 (eniyilemenin doğrusal
  cebri), 108 (düşük ranklı hızlandırma), 114 (üretim modelinin sıkıştırma kararları).
- **Beklenti (93).** Planlanan tekrar: 99 (deney tasarımında beklenen etki), 101 (örneklem ortalaması ve
  standart hata), 105 (tercih eğitiminin beklenen ödülü).
- **En büyük olabilirlik (93).** Planlanan tekrar: 96 (genellemenin kuramı), 104 (kendi eğitim koşun).
- **Yansız tahminci ve yanlılık (93).** Planlanan tekrar: **101** (ölçümün disiplini — defterdeki açık
  koordinat), 102 (tekrarlanabilirlik).
- **Entropi, çapraz entropi, KL ıraksaması (94).** Planlanan tekrar: 95 (kaybın yüzeyinin biçimi), 105
  (KL bütçeli tercih optimizasyonunun elle kurulumu), 114 (üretim koşusunun kayıp okuması).
- **Sıkıştırma ↔ kayıp özdeşliği (94).** Planlanan tekrar: 96 (genelleme kuramında sıkıştırma çerçevesi),
  116 (alanın açık soruları).

### Batch 21'de gerçekleşen tekrarlar (planlananların tahsili)

- **Sıcaklık (10 → 87), yetmiş yedi makale aralıklı.** 10'da örneklemenin ayarı olarak kurulmuştu; 87'de
  yumuşak etiketin **mekanizması** olarak geri döndü: logit'leri `T`'ye bölmek küçük olasılıkları okunur
  kılıyor ve aktarılan bilgi tam olarak orada duruyor. Aynı düğme, iki ayrı iş.
- **Kapsama ve pass@k (33/34 → 87).** 34'ün kapsama eğrisi adıyla anıldı ve numarasız işaret orada ödendi;
  fakat **33/40'ın planlı pass@k + görev ufku tekrarı bu run'da da tahsil edilmedi** ve devrolur (101 uygun).
- **Kuantizasyon (19/27 → 87, 88, 89), üç ayrı yüzüyle.** 87'de küçültmenin öbür ailesi olarak budamadan
  ayrıldı; 88'de kuantizasyona duyarlı eğitimin üretimdeki 2 bitlik hâliyle; 89'da bir **donanım sözleşmesi**
  olarak ("bir sayı biçimi ancak çip onu doğrudan çarpabiliyorsa hız verir") yeniden kuruldu.
- **Düşük ranklı adaptör (19 → 88), altmış dokuz makale aralıklı.** Hem kuantizasyon kaybının telafisi hem de
  tek gövdeyle çok görev yapmanın yolu olarak; 19'un mekanizması cihaz bütçesinin içinde yeniden okundu.
- **Bayt başına işlem hesabı (26 → 88 → 89), iki adımda.** 88'de paydanın 1'e inmesiyle, 89'da adının
  konmasıyla: 26'da hesaplanan 229 sayısı **sırt noktası** olarak yeniden tanımlandı.
- **Gecikme ↔ iş hacmi (28 → 89), altmış bir makale aralıklı.** 28'de servis düzeyinde ayrılmıştı; 89'da 7
  milisaniyelik yüzde 99'luk sınırın yığın büyüklüğünü 200'den 16'ya düşürmesiyle donanım düzeyinde geri döndü.
- **GPT-3'ün enerji ve karbon sayısı (8 → 90), seksen iki makale aralıklı.** 8'de tek bir ölçek göstergesiydi;
  90'da o sayıyı üreten dört halkalı zincirin kendisi kuruldu ve sayı adım adım yeniden türetildi.
- **Bildirilen eğitim maliyeti (20 → 90).** 20'nin 5,576 milyon dolarlık rakamı, enerjinin toplam maliyetin
  yüzde 2–6'sı olduğu bulgusuyla birlikte yeniden okundu: para ile enerji ayrı eğriler.
- **GLaM'ın enerji üçlüsü (85 → 90).** 85'te mimari bir kazanç olarak verilmişti; 90'da 4M çerçevesinin
  birinci satırının ("Model") örneği olarak yerine oturdu.
- **Ölçüm koşullarının bildirilmesi (16, 71 → 90).** Cetvelin bir tasarım ürünü olduğu tezi, enerji sayılarının
  sınırına taşındı: aynı istem iki sınırla 0,10 ve 0,24 vat-saat.

### Batch 21'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

- **Yumuşak etiket ve fonksiyon eşleştirme (87)** → 105'te küçük ölçekte kendi asistanını kurarken; 114'te
  bir sınır modelinin üretim hattında.
- **Kapasite boşluğu (87)** → 96'da genelleme kuramının içinde (öğrenci-öğretmen uzaklığı ile hipotez sınıfı).
- **Budama ve piyango bileti (87)** → 92'de düşük ranklılığın matematiğiyle birlikte.
- **Cihaz bütçesi: dört kısıt (88)** → 112'de sürekli öğrenme ve kişiselleştirmenin ürün düzeyinde.
- **Çatı çizgisi ve sırt noktası (89)** → **106**'nın çekirdeği; 108'de çekirdek füzyonunun gerekçesi olarak.
- **Alana özel mimari ve donanım piyangosu (89)** → 116'da açık sorular, 117'de AGI tartışmasının donanım yüzü.
- **Enerji zincirinin dört halkası (90)** → 101'de ölçüm disiplininin bir örneği; 109'da üretim koşusunun
  operasyon gerçeği.
- **Maliyet eşitliği (90)** → 115'te bir ürünün ömür boyu hesabı.

### Batch 19'da gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 79–82'de fiilen nerede geri çağrıldığı:

| Kavram | Batch 19'da gerçekleşen |
|---|---|
| Genelleme; aşırı öğrenme (2) | 79 (dağılım kaymasının tanımı doğrudan 2'nin genelleme cümlesinin gizli varsayımından türetildi) ✓ **yetmiş yedi makale aralıklı geri çağırma** |
| Temsil merdiveni; nöron ve aktivasyon (3) | 81 (görüntü kodlayıcısının ürettiği yama vektörleri; doğrusal sonda kodlayıcının taşıdığını gösteriyor) ✓ |
| Tokenizasyon; embedding; sözlük (4) | 81 (**görüntünün token'ı sözlükten gelmez** ayrımı 4'ün diliyle kuruldu) ✓ **yetmiş yedi makale aralıklı geri çağırma** |
| Dikkat; nokta çarpım; sorgu–anahtar–değer (6) | 81 (karşıtsal benzerlik ölçüsü; öğrenilebilir sorgular girdiden gelmiyor), 82 (hizalamayı modele bırakan dikkat) ✓ |
| Transformer bloğu; konum kodlaması (7) | 81 (görüntü yamaları dizisi olduğu gibi Transformer'a veriliyor) ✓ |
| Öz-denetimli öğrenme; yığın; derlem (8) | 82 (maskelenmiş ses temsilleri; sıra alma kestiriminin öz-denetimli hedefi), 81 (yamaların tek diziye paketlenmesi) ✓ |
| Otoregresif üretim; örnekleme (10) | 82 (ses token'larıyla otoregresif üretim; "sözlüğü değişmiş") ✓ |
| Zero-shot (11) | 81 (sınıf adını cümleye gömüp sınıflandırma) ✓ |
| Sentetik veri (12) | 81 (görsel talimat verisinin metin modeline yazdırılması) ✓ |
| Veri temizlik hattı; engel listesi; veri karışımı (8, 14) | 80 (**engel listesi bir kapsam kararıdır**; derlemin sonradan belgelenmesi), 82 (dinî metin okumalarının kapsam–alan takası) ✓ |
| Tokenizer ve dil (15) | 82 (yüz dilden 1.107 dile; kapsamın kendisi bir eksen) ✓ |
| Değerlendirme kümesi; cetvel (16) | 82 (dondurulmuş temsil tahtasının 16'daki mantığı) ✓ |
| İçsel ↔ dışsal uydurma (17) | 81 (nesne uydurması, önünde kaynak varken uydurma; içsel uydurma) ✓ |
| Düşük ranklı uyarlama (19) | 81 (donuk gövde ↔ LoRA ablasyonunda sıralamanın dönmesi) ✓ |
| Model kartı; veri künyesi; açık ağırlık (20) | 80 (**20'de açıklık boyutu olarak sayılan belgelerin içine bakıldı**) ✓ |
| Bağlam penceresi; sistem istemi (21) | 81 (görsel token'ın pencereden yer kaplaması) ✓ |
| Örnekle öğrenme; gösterim (23) | 82 (üç saniyelik kayıtla ses taklidi, örnekle öğrenmenin ses hâli) ✓ |
| Ön dolum ↔ adım adım üretim; bellek bant genişliği (26) | 82 (**gerçek zamanlı ses baştan sona adım adım üretimdir**; çerçeve hızı adım sayısını azaltır) ✓ |
| Ürün kuantizasyonu; kod defteri (43) | 82 (artık vektör kuantizasyonu aynı aileden, amacı geri sentez) ✓ |
| Yama (yazılım, 55) ve aktivasyon yaması (74) | 81 (üçüncü kullanım açıkça adlandırıldı) ✓ |
| Ekran görüntüsü; görsel token; öğe konumlandırma (54) | 81 (**numarasız işaret ödendi**: 4.240 ↔ 128.827 token sayısı yama aritmetiğinin ürünü olarak açıklandı) ✓ |
| İstem enjeksiyonu; kum havuzu (58) | 79 (eksenin üçüncü ayrımı: girdiyi seçen üçüncü taraf belge), 80 (sistem kartının ajan güvenliği bölümü) ✓ |
| İnsan–ajan devri; kalibrasyon açığı (59) | 80 (üç katmanlı denetimin uygulama katmanı) ✓ |
| Gecikme ve maliyet hesabı; istem önbelleği (60) | 82 (çerçeve hızının gecikme bütçesindeki yeri) ✓ |
| Belirtim oyunu; vekil ödül (61) | 80 (ayrıştırılmış ölçümün hedefe dönüşmesi — tersine çalışan hâli) ✓ |
| Jailbreak; evrensel saldırı; kırmızı takım; aktarım (63) | 79 (**eksenin en sağ ucu**: girdiyi arayan saldırgan; uyarlanır saldırının yüzde 100'ü), 80 (kırmızı takımın kurumsal hâli: 100 kişi, 45 dil, 29 ülke) ✓ |
| Kalibrasyonun dağılım kaymasıyla bozulması (65) | 79 (adsız geçen "dağılım kayması"nın resmî kurulumu) ✓ |
| Aldatma; hizalama denetimi (67) | 80 (sistem kartının hizalama değerlendirmesi bölümü) ✓ |
| Kötüye kullanım; marjinal risk (68) | 82 (üç saniyelik kayıt tabloya yeni bir satır) ✓ |
| Denetimin erişimi; şeffaflık endeksi; AB yasası (69) | 80 (**kara kutu erişimi yetmez** üçüncü taraf değerlendirmesine uygulandı; Ek IV'ün veri künyesi maddesi) ✓ |
| Eşik–önlem çifti; sorumlu ölçekleme (70) | 80 (sistem kartının güvenlik düzeyi belirleme bölümü; yönetişim katmanı) ✓ |
| Geçerlilik zinciri; protokol sonucun içindedir; çok istemli değerlendirme (71) | 79 (**girdi dağılımı da sonucun içindedir**), 80 (belge, protokolün taşıyıcısı), 82 (görev seçimi ölçüyü tanımlar) ✓ |
| Kirlilik; işlevsel ölçüt; test görevine eğitim (72) | 79 (şablonla yeniden üretilen sınav), 80 (derlemde bulunan sınav örnekleri) ✓ |
| Hakem model; insan değerlendirmesi (73) | 80 (hakemin kurumsal denetimi işareti ödendi) ✓ |
| Sonda; kontrol görevi (67, 74) | 81 (**doğrusal sonda kusurun yerini gösteriyor**: bilgi kodlayıcıda, dil modeline geçmiyor) ✓ |
| Yönlendirmenin dağılım dışına genelleşmemesi (76) | 79 (adsız geçen sağlamlığın resmî kurulumu) ✓ |
| Beliren yetenek; ölçünün süreksizliği (78) | 79 (**"bir sonraki makale" devri ödendi**: koşullar değişince aynı model başka şey yapar) ✓ |

### Batch 19'da ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 19'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Dağılım kayması; sağlamlık; kovaryat / etiket / kavram / alt topluluk kayması; en kötü grup doğruluğu | 79 | 80 (ayrıştırılmış değerlendirmenin gerekçesi), 81 (karşıtsal modellerin etkin sağlamlığı), 82 (tanımada eşit referanslı karşılaştırma) | 96, 101, 102 |
| Etkin sağlamlık; doğruluk doğru üstünde | 79 | 81 (Fang'in beş nedeni), 82 (Whisper'ın yüzde 55,2'si) | 96, 101 |
| Düşmanca örnek; düşmanca eğitim; doğruluk–sağlamlık takası | 79 | 81 (görüntü tarafındaki saldırı yüzeyi anıldı) | 91, 95, 96 |
| Sertifikalı savunma; rastgeleleştirilmiş yumuşatma; karartılmış gradyan | 79 | — | 95, 96, 116 |
| Ortalama durum ↔ en kötü durum ekseni; girdiyi kim seçiyor | 79 | 81 (çift bazlı puanlama makro doğruluğun görüntü hâli), 82 (kelime hata oranının katmanı) | 101, 102 |
| Ayrıştırılmış değerlendirme; amaçlanan kullanım | 80 | 81, 82 (ölçütlerin katman ayrımı) | 101, 102, 116 |
| Sistem kartı; veri açıklaması; veri kartı; teknik dokümantasyon | 80 | 81 (verinin tasarım yüzeyi olması) | 98, 102, 116 |
| Üç katmanlı denetim: yönetişim, model, uygulama | 80 | — | 101, 102, 116 |
| Görüntü yaması; görsel token; görüntü kodlayıcı | 81 | 82 (aynı hamlenin sese taşınması) | 83, 84, 91 |
| Karşıtsal ön eğitim; izdüşüm; yeniden örnekleyici; kapılı çapraz dikkat | 81 | 82 (ardışık hat ↔ uçtan uca ayrımının atası) | 83, 84, 86 |
| Görsel talimat ayarı; nesne uydurması; dinamik çözünürlük | 81 | — | 83, 84, 88 |
| Anlamsal token ↔ akustik token; sinir ses kodlayıcısı; artık vektör kuantizasyonu | 82 | — | 83, 84, 87 |
| Kelime hata oranı; zayıf denetim; vokoder | 82 | — | 84, 97, 102 |
| Gecikme bütçesi; sıra alma; çerçeve hızı; tam çift yönlü | 82 | — | 84, 88, 89 |

### Batch 18'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 75–78'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 18'de gerçekleşen |
|---|---|
| Temsil; çok anlamlı nöron (3) | 75 (**74'ün devrettiği borç ödendi**: kedi yüzü–araba önü–kedi bacağı nöronu çok anlamlılığın tanımına bağlandı; özellik bir yön olarak kuruldu) ✓ **yetmiş iki makale aralıklı geri çağırma** |
| Sözlük (vocabulary, 4) | 75 (sözlük öğrenmenin sözlüğüyle çakışma açıkça adlandırıldı) ✓ |
| Kayıp fonksiyonu; seyreklik cezası (2) | 75 (otokodlayıcının iki terimli kaybı) ✓ |
| Artık akış; ileri beslemeli katman genişliği (7) | 75 (birkaç bin boyut ↔ dil kadar geniş kavram sayısı) ✓ |
| Üretim adımına müdahale (10) | 76 (PPLM: gradyanla yönlendirmenin atası; bugünkü fark sabit yön) ✓ |
| ROME; nedensel izleme; Hase (18) | 76 (ağırlık kapısı; yerelleştirme ≠ düzenleme; MEMIT; ima edilen olgular; ardışık düzenlemede unutma) ✓ |
| İstem duyarlılığı (22) | 77 (aksiyom adı olarak "duyarlılık" ile çakışma adlandırıldı) ✓ |
| Örnekle öğrenme (23) | 78 (beliren sayılan başarının bir kısmı örnekle öğrenmedir — Lu ve ark.) ✓ |
| Sistem istemi bir ayrıcalıktır (24) | 76 (üç kapıdan birincisi; ölçüldüğünde açık uçlu yönlendirmede en yüksek puan) ✓ |
| Sadakat; düşünce zinciri (31, 32) | 77 (gerekçe sadakati ölçümünün genel biçimi; sadakat ↔ kalite ayrımı) ✓ |
| Atıf; atıf bulma oranı ve kesinliği (45) | 77 (**kaynak atfı ↔ neden atfı** ayrımı adlandırıldı) ✓ |
| Ret yönü (62) | 75 (sözlükte nerede durduğu sorusu), 76 (13 model; yeter ↔ gerekli; ağırlıktan dikleştirme; düşmanca son ekin bastırması) ✓ |
| Ağırlığa erişen saldırgan (63) | 76 (ret yönünün ağırlıktan silinmesi aynı kapıdır) ✓ |
| Azaria'nın iç sınıflandırıcısı; kalibrasyon (65) | 76 (**devrolan planlı tekrar tahsil edildi**: sonda ailesinin ilk üyesi) ✓ |
| Karakter vektörü; ince ayar kayması (66) | 76 (aynı ailenin üyesi; 0,76–0,97 ilişki yeniden anıldı), 77 (Turpin'in sayıları 66'dan devralındı) ✓ |
| Sonda; temsil mühendisliği; uyuyan ajan sondası; Burns'ün ölçütü (67) | 75 (özelliğin okunması), 76 (yön bulmanın dört yolundan ikisi; sondanın izleme aracı olarak kullanımı) ✓ |
| Denetimin erişimi (69) | 76 ("iç erişim"in somut hâli) ✓ |
| Eşik ölçümü; sorumlu ölçekleme (68, 70) | 78 (öngörülemezlik yönetişimin dayandığı varsayımdır; öngörü bilinen görev içindir) ✓ |
| Cetvel; ölçüte çalışmak; öngörülemezlik (16, 71) | 78 (ikili puanlama ↔ sürekli ölçü; Skill-Mix'in liderlik tablosu uyarısı) ✓ |
| Test görevine eğitim; kirlilik (72) | 78 (dördüncü karıştırıcı; denetlenince belirme görüntüsü zayıflıyor) ✓ |
| Atıf yaması; yeter ↔ gerekli; yorumlanabilirlik yanılsaması (74) | 75 (parça çizgesi), 76 (uyuyan yol uyarısı yönlendirmeye taşındı), 77 (yaklaşıklığın nerede yanıldığı) ✓ |
| Geç genelleme; ilerleme ölçüsü; indüksiyon başı faz geçişi (74) | 78 (sıçramanın altındaki sürekli süreçlerin ikisi) ✓ |

### Batch 17'de gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 71–74'te fiilen nerede geri çağrıldığı:

| Kavram | Batch 17'de gerçekleşen |
|---|---|
| Temsil; aktivasyon; çok anlamlı nöron (3) | 74 (artık akış; Bolukbasi'nin nöron yanılsaması; sonda; çok anlamlı nöron 75'e devredildi) ✓ **yetmiş bir makale aralıklı geri çağırma** |
| Dikkat ağırlığı "modelin neye baktığı" değildir (6) | 74 (**6'nın vaadi ödendi**: Jain & Wallace ↔ Wiegreffe & Pinter; ağırlık nereden okunduğunu söyler, nedeni değil) ✓ |
| Artık bağlantı; dikkat başı; ileri beslemeli katman; 12 × 12 = 144 baş (7) | 74 (artık akış; 26/144 baş; Voita'nın 48 başın 38'ini budaması) ✓ |
| Ezber ↔ genelleme; tekilleştirme; kirlilik tanımı (8, 14, 18) | 72 (**72 koordinatı ödendi**: sızıntının dört yolu, n-gram tarama, ezberin üç etkeni ve üç türü), 74 (geç genellemede ezber ve devre yan yana) ✓ |
| Cetvel bir tasarım ürünüdür; liderlik tablosu; kalibrasyon tanımı (16) | 71 (geçerlilik zinciri; kısayol; hata payı; protokol puanın içinde), 72 (tutulan küme), 73 (insan değerlendirmesi de bir ölçüm) ✓ |
| Anahtar-değer belleği; nedensel izleme; Hase (18) | 74 (gürültü giderme = nedensel izleme; Geva'nın üç adımı; yerelleştirme ≠ düzenleme ailenin ilk üyesi), 72 (ezberin yeri) ✓ |
| Ölçek yasaları; beliren yetenek; cetvel (5, 9) | 71 (ölçüt piyangosu; ikili cetvel → 78), 72 (ezber ölçekle büyür), 74 (geç genelleme: davranışta ani, mekanizmada sürekli → 78) ✓ |
| İstem duyarlılığı (22) | 71 (biçim 76 puan; çok istemli değerlendirme) ✓ |
| Örnekle öğrenme (23) | 74 (indüksiyon başlarının faz geçişi 2,5–5 milyar token; işlev vektörü) ✓ |
| Logit'lerin dışarıdan kısıtlanması (30) | 72 (kanonik sıra tercihi), 74 (ölçü olarak logit farkı) ✓ |
| Sadakat; düşünce zinciri (31) | 74 (sadakat sözcüğü aynı anlamda, nesne devre), 72 (31'in kirlilik göndermesi) ✓ |
| Süreç denetimi (38) | 73 (adımları puanlayan hakem), 74 (dolaylı) ✓ |
| Hakem model; yüzde 85 ↔ 81; üç yanlılık; iki sırayla sorma (45) | 73 (**yanlılık listesi on ikiye çıktı**; uzlaşma göreve göre 0,82 → −0,24; insan çapası), 71 (ölçütlerin yüzde 17'si hakeme dayanır) ✓ |
| Öz-yansıma ↔ hakem (52/56) | 73 (hakemin kendi çıktısını tanıması), 74 (aynı sorunun içerideki karşılığı) ✓ |
| Çözüm sızıntısı; kod ölçütleri (55) | 72 (82 yama; çözümü görülen alt kümede daha yüksek puan) ✓ |
| Ajan değerlendirmesi; hile; tutulan küme; canlı ölçüt (57) | 71, 72 (canlı ölçüt ve kesim tarihi süzgeci), 73 (izi okuyan hakem) ✓ |
| Tartışma; bilgisi olmayan hakem; yüzde 75 güven süzgeci (64) | 73 ✓ |
| Kalibrasyon; ECE; kök ortalama kare hatası; hakem güveni (65) | 71 (**numarasız işaretin tahsili**: kalibrasyon değerlendirme biliminin ölçüsü), 73 (**hakem güveni tahsil edildi**: Dorner'ın iki kat sınırı, PairS belirsizliği) ✓ |
| Dalkavukluk; kimin görüşü; PRISM (66) | 73 (hakem de dalkavukluğa açık; 75 ülke 1.500 katılımcı), 72 (kimin görüşü — dolaylı) ✓ |
| Değerlendirme farkındalığı; sınavı tanıyan sınanan; sonda; model organizması (67) | 71 (sınavı tanıyan sınanan; yetenek çıkarımı), 73 (kendini tanıma), 74 (**numarasız işaretin tahsili**: sonda ve müdahale araçları; model organizması) ✓ |
| Marjinal risk; taban; unutturma (68) | 71 (taban), 72 (unutturmanın ölçülmesi ve geri kazanım) ✓ |
| Denetimin erişimi (69) | 71 (denetimin erişimi; şeffaflık → 80) ✓ |
| Eşik ölçümü; yetenek çıkarımı (70) | 71 (70'in kapanış sorusu 71'in açılışı) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): sorgu yeniden yazma (44 → 73, kullanılmadı;
düşer), kapsama ve pass@k (33 → 71, kullanılmadı; 78'e devrolur), görev ufku (40 → 71, kullanılmadı; 78'e),
Azaria'nın iç sınıflandırıcısı (65 → 74, kullanılmadı; 76'ya), kısıtlı üretim (30 → 74, yalnızca logit ölçüsü
düzeyinde; 76'ya), Wooldridge–Jennings (51 → 111), MCP üçlüsü (49/53 → 115).

### Batch 17'de ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 17'de gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Yapı; görevleştirme; yapı geçerliliği; güvenilirlik (reliability) | 71 | 72 (görev kirliliği), 73 (insan değerlendirmesi bir protokol) | 78, 79, 80, 101 |
| Kısayol öğrenme; etiketleme artefaktı; kolaycı örnekleme | 71 | 72 (sömürü ↔ ezber) | 79, 101 |
| Standart hata; kümelenmiş standart hata; istatistiksel güç; madde tepki kuramı | 71 | 73 (üç etiketleyici × yüz örnek farkı göremez; güç hesabı) | 78, 101 |
| Çok istemli değerlendirme; seçim yanlılığı; şık konumu | 71 | 74 (şık harfi devresi: içerik toplayıcı ve doğru harf başları) | 76, 79 |
| Dinamik ölçüt; ölçüt piyangosu; değerlendirme bilimi | 71 | 72 (canlı ölçüt; işlevsel ölçüt) | 78, 80, 101 |
| Sızıntının dört yolu; dolaylı sızıntı; görev kirliliği; test görevine eğitim | 72 | — | 78, 79 |
| Üyelik çıkarımı; veri damgası; değiştirilebilirlik; kanonik sıra tercihi | 72 | — | 79, 80 |
| Çıkarılabilir ezber; ezberden okuma / yeniden kurma / anımsama; ezberin üç etkeni | 72 | 74 (geç genellemede ezber ↔ devre) | 75, 79 |
| İşlevsel ölçüt; sömürü; yeniden yazılan sınav (GSM1k) | 72 | — | 78, 79 |
| Kitle kaynak; şansa göre düzeltilmiş uzlaşma; hoşgörü | 73 | — | 80, 101 |
| Kendini tanıma; uzunluk kontrolü; kurul; insan çapası | 73 | 74 (kendini tanımanın içerideki karşılığı) | 76, 80 |
| Mekanistik yorumlanabilirlik; devre; artık akış; QK / OV devresi; indüksiyon başı | 74 | — | 75, 76, 77, 85, 86 |
| Aktivasyon yaması; gürültüleme / gürültü giderme; nedensel aracılık; nedensel soyutlama; atıf yaması | 74 | — | 76, 77 |
| Devre ölçütleri: sadakat, tamlık, enazlık; yedek baş | 74 | — | 76, 77 |
| Grokking; ilerleme ölçüsü; evrensellik; işlev vektörü | 74 | — | 75, 78 |
| Kontrol görevi; seçicilik; yorumlanabilirlik yanılsaması; uyuyan yol | 74 | — | 75, 76, 77 |

### Batch 15'te gerçekleşen tekrarlar (planlananların tahsili)

Önceki batch'lerin kavramlarının 63–66'da fiilen nerede geri çağrıldığı:

| Kavram | Batch 15'te gerçekleşen |
|---|---|
| Tahmin makinesi; sonraki token; üretim bir çekiliştir (1, 10) | 63 ("Elbette, işte" hedef dizisi; üretim kuralı saldırısı sıcaklık ve kesmeyle ret olasılığını düşürür), 64, 65 (sıcaklık ölçekleme softmax'ın şeklini değiştirir, sırayı değil), 66 ✓ **altmış beş makale aralıklı geri çağırma** |
| Kayıp; gradyan; karesel hata (2, 3) | 63 (HotFlip ve GCG: gradyan ayrık token uzayında; kayıp = hedef cümlenin olasılığı), 65 (Brier puanı olasılık tahmininin karesel hatasıdır) ✓ |
| Embedding; ayrık token uzayı (4) | 63 (sürekli gradyan ↔ ayrık değişim; sonek aktarımı) ✓ |
| Perplexity (5) | 63 (perplexity süzgeci GCG soneğini yakalar, akıcı kalıbı kaçırır) ✓ |
| Hizalama sözcüğünün iki anlamı (6 ↔ 11) | 66 (karakter ↔ hizalama ayrımı) ✓ |
| Ön eğitimden gelen kalıplar (8) | 63, 64, 65, 66 (ön eğitilmiş model de dalkavuk: Perez %90'ın üstü) ✓ |
| Ölçek yasaları (9) | 63 (many-shot güç yasası), 66 (8 → 62 → 540 milyar: +19,8 / +10,0) ✓ |
| Yardımseverlik ↔ dürüstlük; hizalama vergisi (11) | 65 (dürüstlük kalibreli güven ister), 66 (yardımseverlik hoşa gidene kayar) ✓ |
| Denetimli ince ayar; öz-eleştiri verisi (12) | 63, 64 (eleştiri → düzeltme çiftleriyle ince ayar; 182.831 istem), 66 ✓ |
| Ödül modeli; tercih çiftleri; "kimin tercihi"; aşırı optimizasyon (13) | 63, 64 (**64 koordinatı ödendi**: ilkeyle etiketleyen geri bildirim modeli; 135.296 insan çifti; Goodhart'a karşı kaçamak olmayan cevap), 65 (tercih eğitimi kalibrasyonu bozar; T = 2,5), 66 (tercih verisi uyumu ödüllendirir: %71,3; tek özellik 6 puan; en iyisini seçme) ✓ |
| Tokenizer; düşük kaynaklı dil (15) | 63 (çok dilli jailbreak 3×) ✓ |
| Cetvel bir tasarım ürünüdür; kalibrasyon tanımı; Goodhart (16) | 63 (saldırı başarısını kim puanlar: sözcük eşleşmesi insanla −0,394 ilişkili), 64 (bilgi sınavı 16'daki; kaçamak cevap Goodhart), 65 (**kalibrasyonun tam kurulumu**: güvenilirlik diyagramı, ECE, Brier) ✓ |
| Halüsinasyon; uydurma (17) | 65 (konfabülasyon: tutarsız uydurma; anlamsal entropi; Kalai'nin sınav ödülü ve güven hedefi) ✓ |
| Ezber ↔ genelleme (18) | 65 (kararlı yanlış kalibrasyonun değil doğruluğun sorunudur) ✓ |
| İnce ayar; LoRA (19) | 66 (dar ince ayar geniş karakter kayması; 6.000 örnek → %20) ✓ |
| Açık ağırlık (20) | 63 (**vaat taksidi**: üretim kuralı 0 → 81; ret yönünü silme 22,6 → 79,9; ince ayar) ✓ |
| Rol etkisinin öngörülemezliği (22) | 66 (rol olgusal doğruluğu değiştirmiyor) ✓ |
| Örnekle öğrenme; many-shot (23) | 63 (many-shot jailbreak: 128 gösterim beş modelde yeter) ✓ |
| Sistem istemi; talimat hiyerarşisi (24) | 63 (sistem istemini silmek kapılardan biri), 66 (karakterin ilk katmanı; komuta zinciri) ✓ |
| Düşünce zinciri; sadakat (32) | 64 (etiket düşünce zinciriyle keskinleşir; %40–60 sıkıştırma), 66 (Turpin: gerekçe belirleyici öneriyi anmaz; −36,3) ✓ |
| Öz-tutarlılık; kapsama (33) | 65 (örnekleme tutarlılığı güven ölçüsü; "cevaplama oranı" 33'ün kapsamasıyla aynı sözcük, başka nesne), 64, 66 ✓ |
| Doğrulayıcı; üretmek ↔ doğrulamak; yanlış pozitif (35, 36) | 63 (hakem yanlış pozitif verir), 64 (doğrulamak üretmekten kolay: denetimin dayanağı) ✓ |
| Çekimserlik (39) | 65 (seçici tahmin: çekimserlik bir güven eşiğidir) ✓ |
| Hakem model (45) | 63 (PAIR ve TAP'ın hakem döngüsü; HarmBench sınıflandırıcısı insanla %93,2 uzlaşır; hakemler 56–90,7 arasında), 64 (yapay geri bildirim bir hakemdir), 66 (hakem de dalkavukluğa açık) ✓ |
| Güvenilirlik etiketi; token olasılığıyla güven (50) | 65 (güvenin ilk kaynağı; Kadavath 0,86) ✓ |
| Öz-yansıma (52) | 63 (saldırgan model kendi istemini düzeltir) ✓ |
| Tartışma ile denetim (53) | 64 (**tahsil edildi**: Irving 59,4 → 88,9; Michael 84 ↔ 74; Khan 76 ve 88; Kenton dokuz görev), 66 ✓ |
| Kısayol ve hile; imkânsız test (57) | 63, 65, 66 ✓ |
| İstem enjeksiyonu ↔ jailbreak; gradyanla eniyilenmiş saldırı; savunma ↔ ölçü düzeni (58) | 63 (üçüncü tarafın ↔ kullanıcının saldırısı; GCG; 58-Şekil 2'nin düzeni geri çağrıldı) ✓ |
| Devir; kalibrasyon açığı; tamamlayıcılık; aşırı güvenme; açıklama ikna eder (59) | 64 (denetçi zayıfken; hakem düşük güvenini atınca 94), 65 (**kalibrasyon açığı tahsil edildi**; sözel güven tablosu 59'daki Tian/Xiong'un tam kurulumu; güven ifadesi kullanıcıyı 43,6 → 52,0), 66 (açıklama ikna eder; netleştirme sorusu) ✓ |
| Fatura; yönlendirici (60) | 64 (yapay etiket 10× ucuz) ✓ |
| Belirtim oyunu; Goodhart'ın dört türü; ödül niyetin kanıtıdır; altı hedef; uzunluk vekili; izleyici vekilin parçası (61) | 63 (saldırgan da vekili oynar; 64 koordinatı anıldı), 64 (ilkeler bir belirtimdir; ödül niyetin kanıtı), 65 (güven bir vekildir), 66 (uzunluk vekilinin yanına onay vekili; ödül kurcalama) ✓ |
| Reddetme; aşırı güvenlik; sığ hizalama; ret öneki; ince ayar reddi siler; yarışan hedefler; bağlamsal uyumsuzluk; maliyet modeli; kural tabanlı ödül (62) | 63 (ret önekini ele geçirme: prefilling; yarışan hedefler ↔ uyumsuz genelleme jailbreak'in çerçevesi; XSTest aşırı ret), 64 (kural tabanlı ödül ↔ anayasa; Guan XSTest 0,88 → 0,976), 65 (belirlenemez istekte belirsizlik), 66 (insanlaştıran istek; karakter eğitimi) ✓ |

Planlanıp **tahsil edilmeyenler** (sonraki batch'lere devrolur): öz-yansıma ↔ hakem (52/56 → 65; devir: 73),
sorgu yeniden yazma (44 → 65; devir: 73), etkin getirme (46 → 65; anılmadı, devir: 73), süreç denetimi
(38 → 64; devir: 73), kısıtlı üretim ve ilk token (30 → 63; 62'nin ret öneki üzerinden anıldı, 30 anılmadı;
devir: 74), Wooldridge–Jennings (51 → 111), MCP üçlüsü ve lojistik eğri (49/53 → 115).

### Batch 15'te ilk kurulan kavramlar ve planlanan uzun aralıklı tekrarları

| Kavram | İlk | Batch 15'te gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Jailbreak; kırmızı takım; saldırı başarı oranı; evrensel / aktarılabilir saldırı; kara kutu / beyaz kutu; düşmanca sonek (GCG); many-shot jailbreak; cevap önekini doldurma | 63 | 64 (GCG aktarımında dayanıklı aile; anayasa temelli sınıflandırıcı) | 67, 68, 70, 74, 76 |
| Puanlayıcı ↔ insan uyumu (sözcük eşleşmesi ters ilişkili); jailbreak yeteneği düşürür | 63 | — | 71, 73 |
| Savunma katmanları: girdi süzgeci, çıktı sınıflandırıcı, düşmanca eğitim, temsil müdahalesi; yarardan kesilen pay | 63 | — | 68, 70, 74, 76 |
| Açık ağırlığın üç kapısı: üretim kuralı, ret yönü, ince ayar | 63 | — | 68, 69, 70 |
| Anayasa; eleştiri → düzeltme; geri bildirim modeli; RLAIF; öz-hizalama; kaçamak olmayan cevap | 64 | 65 (etiket bir olasılıktır), 66 (karakter eğitimi anayasanın çeşitlemesi) | 67, 69, 70, 73 |
| Ölçeklenebilir denetim; sandviçleme; zayıftan güçlüye genelleme; geri kazanılan performans payı; eleştirmen model | 64 | 65 (denetçinin güveni) | 67, 71, 73, 77, 116 |
| Tartışma ↔ danışmanlık; ikna gücü; bilgisi olmayan hakem | 64 | 66 (Wang: tartışmada inanç savunusu %22–70) | 67, 73, 115 |
| Güvenilirlik diyagramı; ECE; Brier puanı; AUROC; sıcaklık ölçekleme | 65 | 66 (kalibrasyon ↔ dalkavukluk) | 71, 73, 93, 94, 101 |
| Güvenin dört kaynağı: token olasılığı, sözel güven, örnekleme tutarlılığı, anlamsal entropi; dilsel kalibrasyon; konfabülasyon; içerden okuma | 65 | — | 67, 73, 75, 76, 77 |
| Seçici tahmin; cevaplama oranı; güven eşiği; güven ifadesinin kullanıcıya etkisi; güven hedefli sınav | 65 | 66 (güven ifadesi ↔ dalkavukluk) | 71, 73, 101, 115 |
| Dalkavukluğun dört biçimi: geri bildirim, "emin misin?", cevap, taklit; sosyal dalkavukluk | 66 | — | 67, 71, 73, 115 |
| Dalkavukluğun iki kaynağı: ön eğitim ve tercih zinciri; sentetik veriyle azaltma; pinpoint ince ayar | 66 | — | 67, 72, 73 |
| Kimin görüşü: demografik / politik yansıma; küresel tercihler (PRISM) | 66 | — | 69, 72, 73, 115 |
| Simulakr / rol oyunu; karakterin dört katmanı; karakter eğitimi; model belirtimi; karakter vektörü; beliren hizalanmama; dağıtımı engelleyen değerlendirme | 66 | — | 67, 70, 74, 76, 77 |

## Terim defteri (seri boyunca sabit karşılıklar)

Kural (SOZLESME §2): terim **ilk geçtiği makalede** Türkçe karşılığı + parantez içinde İngilizcesiyle
verilir; sonraki makalelerde **parantezsiz** kullanılır. Giriş köprülerinde geri çağrılan terimler
yeniden gloss'lanmaz. Yeni bir terim kurulduğunda bu defter aynı batch içinde güncellenir —
Batch 0'da "korpus/derlem" sapması tam da defterde satır olmadığı için oluştu.

| Türkçe kullanım | İlk geçişte parantez içi | İlk | Not |
|---|---|---|---|
| yapay zekâ | (artificial intelligence, AI) | 1 | "AI" kısaltması serbest |
| makine öğrenmesi | (machine learning, ML) | 1 | |
| model | — | 1 | "ayarlanabilir fonksiyon" sezgisiyle kuruldu |
| tahmin | — | 1 | ML anlamı: görülmemiş girdiye çıktı üretmek (gelecek kestirimi değil) |
| eğitim | (training) | 1 | |
| çıkarım | (inference) | 1 | Şekil etiketlerinde de "çıkarım" kullanılır |
| temsil öğrenimi | (representation learning) | 1 | Goodfellow Fig 1.4 halkası |
| derin öğrenme | (deep learning) | 1 | |
| büyük dil modeli | (large language model) | 1 | |
| parametre / ağırlık | (parameter / weight) | 2 | ikisi eşanlamlı; ilk geçişte söylenir |
| hiperparametre | (hyperparameter) | 2 | veriden öğrenilmeyen ayar (ör. öğrenme oranı) |
| kayıp fonksiyonu | (loss function) | 2 | |
| gradyan inişi | (gradient descent) | 2 | |
| öğrenme oranı | (learning rate) | 2 | |
| stokastik gradyan inişi | (stochastic gradient descent, SGD) | 2 | |
| genelleme | — | 2 | |
| aşırı öğrenme | (overfitting) | 2 | |
| indirgenemez hata | — | 2 | gürültü tabanı |
| düzenlileştirme | (regularization) | 2 | ayrıntı ileride |
| sinir ağı | (neural network) | 2 | 2'de gloss'landı, 3'te mekanizması kurulur |
| geriye yayılım | (backpropagation) | 3 | 2'de adı kondu, 3'te açıldı |
| nöron | (neuron) | 3 | |
| sapma | (bias) | 3 | nöronun sabit terimi |
| aktivasyon | (activation) | 3 | |
| temsil | (representation) | 3 | 4'te embedding buna bağlanır |
| token | — | 4 | Türkçeleştirilmez |
| tokenizasyon | (tokenization) | 4 | |
| alt-kelime | (subword) | 4 | |
| sözlük | (vocabulary) | 4 | modelin token dağarcığı |
| embedding | — | 4 | Türkçeleştirilmez ("gömme" kullanılmaz) |
| dağılımsal hipotez | (distributional hypothesis) | 4 | |
| derlem | (corpus) | 4 | **"korpus" kullanılmaz** |
| dil modeli | (language model) | 5 | |
| sonraki token tahmini | (next-token prediction) | 5 | |
| boyutluluk laneti | (curse of dimensionality) | 5 | |
| perplexity | — | 5 | Türkçeleştirilmez; sezgisi "şaşkınlık ölçüsü" |
| doğrulama kümesi | — | 2 | "geliştirme sırasında tekrar tekrar bakılan küme"; **"geliştirme kümesi" KULLANILMAZ** |
| ortalama karesel hata | (mean squared error) | 2 | |
| mini yığın | — | 2 | 8'de "yığın (batch)" olarak resmîleşti |
| çift iniş | (double descent) | 2 | ileri okuma notu; randevusu 9'da kapandı |
| yinelemeli | (recurrent) | 5 | 6 ve 7'de parantezsiz kullanılır |
| sorgu | (query) | 6 | "Q" kısaltması kullanılmaz |
| anahtar | (key) | 6 | |
| değer | (value) | 6 | dikkat üçlüsünün rolü; ileride RL "value" ile karıştırılmaz (ayrışma: 37) |
| nokta çarpım | (dot product) | 6 | benzerlik skorunun kaynağı |
| softmax | — | 6 | Türkçeleştirilmez; "skorları toplamı 1 olan ağırlıklara çevirir" |
| dikkat ağırlığı | (attention weight) | 6 | toplamı 1 olan tartım katsayıları |
| ölçekli nokta çarpım dikkati | (scaled dot-product attention) | 6 | mekanizmanın alandaki tam adı |
| öz-dikkat | (self-attention) | 6 | dizinin kendi içine bakması |
| bağlamsal temsil | (contextual representation) | 6 | statik embedding'in karşıtı; 3'teki temsil üzerine biner |
| çok başlı dikkat | (multi-head attention) | 6 | 6'da adlandırıldı, mekanizması 7'de kuruldu |
| maskeleme | (masking) | 6 | yasak konumların skorunu eksi sonsuz yapmak; 7'de "nedensel maske" olarak özelleşir |
| hizalama | (alignment) | 6 | Bahdanau'nun çeviri terimi. **Uyarı:** 61. makalenin "alignment"ı (hizalama sorunu) ayrı kavramdır; orada ayrım açıkça yapılmalı |
| BLEU | — | 6 | kısaltma açılmaz; "çeviri kalitesini 0–100 arasında ölçen cetvel", yüksek iyidir |
| pozisyon kodlaması | (positional encoding) | 7 | |
| dikkat başı | (attention head) | 7 | |
| ileri beslemeli katman | (feed-forward layer) | 7 | 5'te gloss'suz geçmişti; resmî kurulum 7'de |
| artık bağlantı | (residual connection) | 7 | He ve ark. 2016'nın **bozulma** çerçevesi; "sönen gradyanı çözer" DENMEZ |
| katman normalleştirme | (layer normalization) | 7 | bir vektörün kendi içindeki sayılar üzerinde |
| kodlayıcı / kod çözücü | (encoder / decoder) | 7 | |
| nedensel maske | (causal mask) | 7 | 6'daki maskelemenin dil modeli biçimi |
| logit | — | 7 | softmax öncesi ham skor — **ilk geçiş 7'dedir**, 10 geri bağ verir |
| evrişimli | (convolutional) | 7 | yalnızca 2017 karşılaştırması için |
| permütasyona eşdeğerlik | (permutation equivariance) | 7 | dikkatin sırayı görmemesinin biçimsel adı |
| ön eğitim | (pre-training) | 8 | 1'de bir kez gloss'suz geçti; resmî kurulum 8'de |
| öz-denetimli öğrenme | (self-supervised learning) | 8 | denetimsiz öğrenme DEĞİLDİR; etiket veriden kesilir |
| denetimsiz öğrenme | (unsupervised learning) | 8 | yalnızca öz-denetimliden ayırmak için kuruldu |
| yığın | (batch) | 8 | 2'deki "mini yığın"ın resmî adı |
| tekilleştirme | (deduplication) | 8 | ayrıntısı 14'te |
| veri karışımı | (data mixture) | 8 | ayrıntısı 14'te |
| epok | (epoch) | 8 | verinin üzerinden bir tam geçiş |
| ısınma | (warmup) | 8 | öğrenme oranı çizelgesinin ilk kolu |
| kosinüs sönümü | (cosine decay) | 8 | çizelgenin uzun inen kolu |
| veri paralelliği | (data parallelism) | 8 | tam kurulumu 107'de |
| model paralelliği | (model parallelism) | 8 | tam kurulumu 107'de |
| hesap bütçesi | (compute budget) | 8 | FLOP birimiyle birlikte |
| FLOP | — | 8 | kayan noktalı tek işlem |
| kontrol noktası | (checkpoint) | 8 | ağırlıklar + optimizatör durumu |
| temel model | (base model) | 8 | 11'e köprü terimi |
| ölçek yasaları | (scaling laws) | 9 | ailenin toplu adı |
| güç yasası | (power law) | 9 | log-log grafikte doğru |
| hesap-optimal eğitim | (compute-optimal training) | 9 | Chinchilla tartışmasının adı |
| nat/token | — | 9 | kaybın birimi; perplexity onun üsteli |
| PF-gün | — | 9 | bir petaFLOP/s makinenin bir günlük iş miktarı |
| eğri uydurma | (curve fitting) | 9 | |
| yeniden üretme | (replication) | 9 | bir çalışmanın bağımsız tekrarı |
| aşırı eğitim | (overtraining) | 9 | hesap-optimalin ötesinde eğitmek; 2'deki **aşırı öğrenmeyle karıştırılmaz** |
| kod çözme | (decoding) | 10 | gövdede çoğunlukla "üretim kuralı" denir |
| otoregresif | (autoregressive) | 10 | modelin girdisi kendi çıktısıdır |
| açgözlü seçim | (greedy decoding) | 10 | |
| örnekleme | (sampling) | 10 | 2'deki veri rastgeleliğinden ayrı |
| sıcaklık | (temperature) | 10 | logit'leri T'ye bölmek |
| top-k örnekleme | — | 10 | Türkçeleştirilmez; "en olası k aday" |
| çekirdek örnekleme | (nucleus sampling, top-p) | 10 | kümülatif eşiğe göre kesme |
| min-p | — | 10 | Türkçeleştirilmez; üstünlük iddiası kapanmamış tartışma |
| ışın arama | (beam search) | 10 | ileri okuma notu düzeyinde |
| istem | (prompt) | 10 | 21–30. makalelerde yerleşik terim; parantezsiz kullanılır |
| halüsinasyon | (hallucination) | 10 | yalnızca teaser; ayrıntı 17'de |
| few-shot | — | 5 | Türkçeleştirilmez; isteme birkaç çözülmüş örnek koymak. **"az atışlı" KULLANILMAZ**; mekanizması 23'te |
| zero-shot | — | 11 | Türkçeleştirilmez; hiç örnek verilmemiş istem. **"sıfır atışlı" KULLANILMAZ** |
| post-training | — | 11 | Türkçeleştirilmez; ön eğitim sonrasındaki bütün eğitim aşamalarının şemsiye adı |
| hizalanmamış | (misaligned) | 11 | davranışla niyet arasındaki açı. 6'daki **çeviri hizalamasından ayrı kavramdır**; ayrım 11'de açıkça yapıldı, tam kurulum 61'de |
| ince ayar | (fine-tuning) | 11 | eğitilmiş bir modeli yeni veriyle bir kez daha eğitmek; LoRA biçimi 19'da |
| denetimli ince ayar | (supervised fine-tuning, SFT) | 11 | post-training'in ilk durağı |
| talimat ince ayarı | (instruction tuning) | 11 | SFT'nin talimat verisiyle yapılan biçimi; çoğu metinde SFT ile eşanlamlı |
| ödül modeli | (reward model) | 11 | istem + cevap → tek sayı |
| insan geri bildiriminden pekiştirmeli öğrenme | (reinforcement learning from human feedback, RLHF) | 11 | üçüncü durağın klasik biçimi; post-training'in tamamı değildir |
| tercih optimizasyonu | — | 11 | üçüncü durağın **toplu** adı; RLHF ve DPO onun üyeleridir |
| hizalama vergisi | (alignment tax) | 11 | post-training'in bazı görevlerde yol açtığı gerileme; küçük modellerde ceza, büyüklerde ikramiye olabilir |
| kayıp maskesi | (loss mask) | 12 | talimat token'larının kayba katkısını sıfırlamak; 6/7'deki maskelemenin üçüncü kullanımı |
| sohbet biçimi | — | 12 | konuşmacı ve cevap sınırlarını işaretleyen özel token'lar; roller ve sistem istemleri 24'te |
| yüzeysel hizalama hipotezi | (superficial alignment hypothesis) | 12 | LIMA'nın tezi; **tartışmalıdır**, karşı kanıtıyla birlikte verilir |
| sentetik veri | — | 12 | model üretimi eğitim verisi |
| politika | (policy) | 13 | eğitilen modelin pekiştirmeli öğrenme bağlamındaki adı; biçimsel tanımı 37'de |
| Bradley-Terry modeli | — | 13 | eşleştirmeli karşılaştırmaların olasılık modeli |
| referans model | — | 13 | KL cezasının ölçüldüğü sabit başlangıç noktası (SFT modeli) |
| KL ıraksaması | (Kullback–Leibler divergence) | 13 | iki dağılımın ayrışma ölçüsü; biçimsel kurulumu 94'te |
| aşırı optimizasyon | — | 13 | vekil ölçüyü fazla kovalayınca gerçek ölçütün bozulması; Goodhart yasası |
| doğrudan tercih optimizasyonu | (direct preference optimization, DPO) | 13 | ödül modeli kurmadan tercih çiftleriyle eğitim |
| engel listesi | (blocklist) | 14 | kelime listesine göre sayfa eleyen filtre |
| kirlilik | (contamination) | 14 | değerlendirme örneklerinin eğitim derlemine sızması; ayrıntısı 72'de |
| model çöküşü | (model collapse) | 14 | ardışık kuşaklarda sentetik veriyle eğitimin dağılım kuyruklarını yok etmesi |
| etkin token | — | 14 | tekrarlanan ya da eklenen verinin taze token cinsinden karşılığı |
| ezber | (memorization) | 8 | eğitim metnini birebir üretebilme; 18'de kapasiteyle, 72'de değerlendirmeyle bağlanır |
| benchmark | — | 16 | Türkçeleştirilmez; sabitlenmiş değerlendirme kümesi. Gövdede "değerlendirme kümesi" ile eşanlamlı kullanılır |
| liderlik tablosu | (leaderboard) | 16 | modelleri puanlarına göre dizen kamuya açık sıralama |
| kalibrasyon | (calibration) | 16 | modelin kendi güveninin gerçek doğrulukla örtüşmesi; tam kurulumu 65'te |
| içsel uydurma | (intrinsic hallucination) | 17 | çıktının verilen kaynakla çelişmesi |
| dışsal uydurma | (extrinsic hallucination) | 17 | çıktının verilen kaynaktan doğrulanamaması |
| atomik olgu | (atomic fact) | 17 | uzun metnin tek tek denetlenebilir en küçük iddia birimi |
| Good-Turing tahmini | — | 17 | hiç görülmemişlerin toplam olasılığını, tam bir kez görülenlerin oranıyla kestirme |
| anahtar-değer belleği | (key-value memory) | 18 | ileri beslemeli katmanın iki matrisinin örüntü-tanıma ve dağılım-itme rolü |
| nedensel izleme | (causal tracing) | 18 | tek bir ara hesabı geri koyarak hangi hesabın belirleyici olduğunu ölçme |
| düşük ranklı uyarlama | (low-rank adaptation, LoRA) | 19 | donmuş matrisin yanına iki küçük matris eklemek; kısaltma "LoRA" serbest |
| içsel boyut | (intrinsic dimension) | 19 | bir göreve uyum için gereken en küçük serbestlik derecesi sayısı |
| rank | — | 19 | Türkçeleştirilmez ve **parantez içi gloss verilmez** (İngilizcesi aynı); eklenen güncellemenin kaç yön taşıdığı |
| adaptör | (adapter) | 19 | bloğun içine eklenen küçük öğrenilebilir katman; LoRA'nın öncülü |
| önek ayarı | (prefix-tuning) | 19 | dizinin başına öğrenilebilir sanal token eklemek; bedeli bağlam penceresinden çıkar |
| sürekli ön eğitim | (continued pretraining) | 19 | ön eğitimi, eğitilmiş bir modelin üzerinden dar bir alanda devam ettirmek |
| unutma | (forgetting) | 19 | uyarlama sırasında hedef alan dışındaki başarının gerilemesi |
| kuantizasyon | (quantization) | 19 | sayıları daha kaba bir ızgaraya yuvarlayarak bellekten kazanmak; tam kurulumu 27'de |
| uzmanlar karışımı | (mixture of experts) | 20 | her girdinin ağın yalnızca bir alt kümesine yönlendirilmesi; tam kurulumu 85'te |
| açık ağırlıklı | (open weight) | 20 | ağırlıkları indirilebilen ama diğer eksenleri kapalı model |
| açık kaynak | (open source) | 20 | bütün eksenleri açık model; OSI tanımı 2024'te 1.0 sürümüne ulaştı |
| açıklık cilası | (open-washing) | 20 | yalnızca ağırlığı paylaşıp "açık kaynak" etiketi kullanmak |
| model kartı | (model card) | 20 | modelin amacı, sınırları ve değerlendirmesini özetleyen belge |
| veri künyesi | (datasheet) | 20 | eğitim verisinin kaynağını ve kürasyonunu belgeleyen künye |
| bağlam penceresi | (context window) | 21 | modelin bir çağrıda görebildiği en uzun dizi |
| durumsuz | (stateless) | 21 | modelin çağrılar arasında kalıcı iç durumu olmaması |
| sistem istemi | (system prompt) | 21 | modelin nasıl davranacağını söyleyen, kullanıcının görmediği talimat; roller 24'te |
| anahtar-değer önbelleği | (KV cache) | 21 | tek bir çalışma boyunca yaşayan geçici hızlandırma. 18'deki **anahtar-değer belleğiyle karıştırılmaz**; ayrım 21'de açıkça yapıldı, maliyet yapısı 26'da |
| etkin bağlam uzunluğu | (effective context length) | 21 | bir modelin eşiğin üstünde kalabildiği en büyük uzunluk; ilan edilen sayıdan küçük olabilir |
| istem mühendisliği | (prompt engineering) | 22 | isteme ne yazılacağını ölçerek seçme işi |
| rol | (persona) | 22 | sistem isteminde modele verilen kimlik; ölçülen etkisi öngörülemez |
| örnekle öğrenme | (in-context learning) | 23 | isteme konan örneklerle, ağırlıklara dokunmadan davranışın ayarlanması; adı Brown ve ark. 2020'den |
| gösterim | (demonstration) | 23 | isteme konan tek bir çözülmüş örnek. Gündelik "sunum" anlamıyla karıştırılmaması için ilk geçişte ayrım yapıldı |
| görev tanıma | (task recognition) | 23 | gösterimlerden hangi görevin istendiğini anlayıp ön eğitim bilgisini uygulamak |
| görev öğrenme | (task learning) | 23 | ön eğitimde görülmemiş bir girdi–etiket eşlemesini gösterimlerden çıkarmak |
| many-shot | — | 23 | Türkçeleştirilmez; few-shot ile aynı aile. İsteme yüzlerce ya da binlerce gösterim koymak |
| konuşmacı rolü | (role) | 24 | dizideki her mesajın kime ait olduğunu söyleyen etiket (sistem, kullanıcı, asistan). 22'deki **rol (persona)** ile karıştırılmaz; ayrım 24'te açıkça yapıldı |
| sohbet şablonu | (chat template) | 24 | bir model ailesinin beklediği özel token düzeni; aile değişince değişir |
| talimat hiyerarşisi | (instruction hierarchy) | 24 | çelişen talimatların güven düzeyine göre sıralanması; mimari değil, eğitimle kurulmuş davranış |
| istem enjeksiyonu | (prompt injection) | 24 | pencereye giren üçüncü taraf metnin içine talimat gömmek; tam kurulumu güvenlik fazında (61–70) |
| pozisyon enterpolasyonu | (position interpolation) | 25 | uzun diziyi, modelin eğitildiği konum aralığına sıkıştırarak yerleştirmek |
| pencere dikkati | (window attention) | 25 | yalnızca son N token'ı önbellekte tutmak |
| dikkat çukuru | (attention sink) | 25 | dizinin ilk token'larının, anlamlarından bağımsız olarak dikkatin büyük kısmını üstüne çekmesi |
| FlashAttention | — | 25 | Türkçeleştirilmez ve **parantez içi gloss verilmez**; dikkati bloklara bölerek bellek trafiğini azaltan, sonucu bozmayan hesaplama yöntemi |
| ön dolum | (prefill) | 26 | istemin tamamının tek geçişte paralel işlenmesi; hesap gücüyle sınırlı aşama |
| adım adım üretim | (decode) | 26 | cevabın token token üretilmesi; bellek bant genişliğiyle sınırlı aşama. 10\. makaledeki **kod çözme** aynı İngilizce sözcüğün kural anlamıdır; ayrım 26'da açıkça yapıldı |
| bellek bant genişliği | (memory bandwidth) | 26 | yavaş bellekten hesap çekirdeklerine saniyede taşınabilen bayt miktarı |
| gruplandırılmış sorgu dikkati | (grouped-query attention, GQA) | 26 | birden çok sorgu başının aynı anahtar-değer çiftini paylaşması; kısaltma "GQA" serbest |
| sayfalı dikkat | (PagedAttention) | 26 | anahtar-değer önbelleğini bitişik blok yerine küçük sayfalar hâlinde dağıtmak |
| iş hacmi | (throughput) | 26 | birim zamanda tamamlanan iş; 26'da gloss'suz kullanıldı, 28'de gecikmeden açıkça ayrıldı |
| aykırı değer | (outlier) | 27 | aktivasyonlarda ötekilerden çok büyük çıkan, az sayıda ve düzenli boyut; ölçeği gerdiği için bloğun geri kalanını sıfıra yuvarlatır |
| blok | — | 27 | tek bir kuantizasyon sabitini paylaşan ardışık ağırlık kümesi. 7\. makaledeki **Transformer bloğuyla karıştırılmaz**; ayrım 27'de açıkça yapıldı |
| kuantizasyon sabiti | — | 19 | bloğun en büyük mutlak değeri; ızgaranın ölçeğini verir. 19'da adı geçti, mekanizması 27'de kuruldu |
| en yakına yuvarlama | (round-to-nearest) | 27 | her ağırlığı bağımsız olarak en yakın ızgara noktasına yuvarlamak |
| eğitim sonrası kuantizasyon | (post-training quantization) | 27 | eğitilmiş modeli yeniden eğitmeden, tek geçişte kuantize etmek |
| kuantizasyona duyarlı eğitim | (quantization-aware training) | 27 | ağırlıkları eğitim sırasında kaba ızgaraya alıştırmak; eğitim maliyetini düşürmez |
| cevap değişimi | (flips) | 27 | sıkıştırılmış modelde doğrudan yanlışa ya da yanlıştan doğruya dönen cevapların oranı; doğruluktan bağımsız bir uzaklık ölçüsü |
| sürekli yığınlama | (continuous batching) | 28 | çizelgeleme kararının istek yerine yineleme düzeyinde verilmesi |
| seçici yığınlama | (selective batching) | 28 | dikkat işleminin yığınlanmaması; parametresi olmadığı için yığınlamanın kazancı yoktur |
| parçalı ön dolum | (chunked prefill) | 28 | istemi eşit parçalara bölüp üretim adımlarıyla aynı yığında işlemek |
| ayrıştırma | (disaggregation) | 28 | ön dolum ile üretimi ayrı kartlara koymak. 27'deki **karma hassasiyetli ayrıştırmayla** aynı sözcüğün farklı kullanımıdır |
| ilk token süresi | (time to first token) | 28 | ön dolumun süresi; 26'da adsız ölçülmüştü |
| çıktı token'ı başına süre | (time per output token) | 28 | akışın hızı; 26'da adsız ölçülmüştü |
| spekülatif üretim | (speculative decoding) | 28 | küçük bir taslak modelin önerdiği token'ların büyük modelce tek geçişte doğrulanması; çıktı dağılımını değiştirmez |
| taslak model | (draft model) | 28 | öneriyi üreten küçük ve hızlı model |
| kabul oranı | — | 28 | taslağın önerdiği bir token'ın kabul edilme olasılığı; metinde α ile gösterilir |
| anlamsal arama | (semantic search) | 29 | sorgu ve belgeleri aynı vektör uzayına yerleştirip yakınlığa göre getirmek |
| getirme | (retrieval) | 29 | pencereye konacak metni bir derlemden bulma işinin genel adı |
| çapraz kodlayıcı | (cross-encoder) | 29 | sorgu ve belgeyi birlikte okuyup tek bir ilgi puanı üreten düzen |
| ikili kodlayıcı | (bi-encoder) | 29 | sorgu ve belgeyi bağımsız kodlayıp nokta çarpımla karşılaştıran düzen |
| bulma oranı | (recall) | 29 | getirilen ilk k sonuç içinde doğru belgenin bulunma oranı. 18 ve 21'deki **geri çağırmayla karıştırılmaz** |
| yeniden sıralayıcı | (reranker) | 29 | ilk aşamanın adaylarını pahalı bir modelle yeniden sıralayan katman |
| geç etkileşimli | (late interaction) | 29 | belgeyi tek vektör yerine token vektörleriyle temsil edip karşılaştırmayı sona bırakan düzen |
| BM25 | — | 29 | Türkçeleştirilmez ve **parantez içi gloss verilmez**; sözcük eşleşmesine dayanan klasik sıralama işlevi. Gövdede "sözcük eşleşmesi" ile eşanlamlı kullanılır |
| kısıtlı üretim | (constrained decoding) | 30 | kod çözme anında geçersiz token'ların olasılığını sıfırlamak; biçim garantisi verir |
| ayrıştırıcı | (parser) | 30 | üretilen metni izleyip geçerli devamları hesaplayan bileşen |
| şema | (schema) | 30 | beklenen alan adlarını, türlerini ve sırasını tanımlayan biçim sözleşmesi |
| dilbilgisi | (grammar) | 30 | biçimsel dil tanımı; sıradan dilbilgisi anlamıyla karıştırılmaması için ilk geçişte "biçimsel" denir |
| bağlamdan bağımsız dilbilgisi | (context-free grammar) | 30 | iç içe yapıları tanımlayabilen dilbilgisi sınıfı |
| köprü token'ı | (bridge token) | 30 | birden çok dilbilgisi birimini kapsayan token; naif maske onu eleyince tokenizasyon bozulur |
| üretim maskesi | — | 30 | serinin **dördüncü** maske kullanımı: 6 (maskeleme), 7 (nedensel maske), 12 (kayıp maskesi) ile karıştırılmaz; ayrım 30'da açıkça yapıldı |

| akıl yürütme | (reasoning) | 31 | "yeni bir hedefe ulaşmak için mantıksal adımlar kullanmak"; tanımın ayırt edici sözcüğü **yeni**. Faz adında da geçer |
| sadakat | (faithfulness) | 31 | bir açıklamanın, tahmini gerçekte üreten süreci ne kadar doğru temsil ettiği |
| içerik etkisi | (content effect) | 31 | mantıksal biçim sabitken içeriğin doğruluğu değiştirmesi; insanlarda da ölçülü |
| hesap grafiği | — | 31 | bir görevin ara sonuçları düğüm, temel işlemleri kenar olan gösterimi; derinlik ve genişlik bileşikliği ölçer |
| doğrusallaştırılmış alt grafik eşlemesi | — | 31 | eğitimde görülmüş hesap parçalarını tanıyıp birleştirmek; biçimsel yordam öğrenmenin karşıtı olarak sunulur |
| düşünce zinciri | (chain of thought) | 32 | cevaba giden ara adımların cevaptan **önce** üretilmesi. Gövdede "ara adımlar" ile eşanlamlı kullanılır |
| sıralı hesap | (serial computation) | 32 | her adımın girdisi bir öncekinin çıktısı olan, paralelleştirilemeyen hesap |
| kapsama | (coverage) | 33 | `k` denemenin en az birinde çözülen soruların oranı; gösterimi `pass@k`. 29'daki **bulma oranıyla karıştırılmaz** |
| çoğunluk oyu | (majority voting) | 33 | adayların cevaplarını sayıp en çok tekrarlananı seçmek; öz-tutarlılık biçimi 36'da |
| en iyi-N seçimi | (best-of-N) | 33 | adayları bir puanlayıcıyla sıralayıp en yükseği seçmek |
| doğrulayıcı | (verifier) | 33 | bir cevaba doğruluk puanı veren bileşen; tam kurulumu 35'te. 13'teki **ödül modelinden** farkı, ölçtüğü şeyin tercih değil doğruluk olması |
| doğrulanabilir ödülle pekiştirmeli öğrenme | (reinforcement learning with verifiable rewards, RLVR) | 34 | ödülü bir model değil, doğruluğu deterministik sınayan bir kural verir |
| grup göreli politika optimizasyonu | (group relative policy optimization, GRPO) | 34 | avantajı ayrı bir değer modeli yerine aynı soruya üretilen cevap grubunun ortalama ve sapmasından hesaplamak; kısaltma "GRPO" serbest |
| damıtma | (distillation) | 34 | güçlü bir modelin çözümleriyle küçük bir modeli eğitmek; tam kurulumu 87'de |

| üretici | (generator) | 35 | doğrulayıcıya aday çözüm üreten model; doğrulayıcıdan ayrı eğitilir |
| yanlış pozitif | (false positive) | 35 | yanlış bir cevabın doğru diye kabul edilmesi |
| yanlış negatif | (false negative) | 35 | doğru bir cevabın yanlış diye reddedilmesi |
| öz-düzeltme | (self-correction) | 35 | modelin kendi çıktısına geri bildirim yazıp yeniden yazması. Dış geri bildirim olmadan yapılan biçimi ayrıca belirtilir; 17\. makaledeki **içsel/dışsal uydurma** ile karıştırılmaz |
| sağlam doğrulayıcı | (sound verifier) | 35 | alanın kurallarını gerçekten sınayan, yanılmayan dış bileşen |
| öz-tutarlılık | (self-consistency) | 36 | aynı sorudan çıkan çok sayıda zincirin cevaplarını sayıp en çok uzlaşılanı seçmek; karar kuralı 33'teki çoğunluk oyudur |
| ağaç araması | (tree search) | 36 | cevabı ara adım düğümleri hâlinde büyütüp her düzeyde en iyi birkaç düğümü tutmak |
| Markov karar süreci | (Markov decision process) | 37 | durum, eylem, geçiş ve ödülden oluşan karar çerçevesi; kısaltma "MDP" kullanılmaz |
| durum | (state) | 37 | karar anında dünyanın bilinen hâli; dil modelinde o ana kadarki dizi |
| eylem | (action) | 37 | o durumda seçilebilecek şeylerden biri; dil modelinde sonraki token |
| geçiş | (transition) | 37 | eylemin dünyayı hangi yeni duruma taşıdığı; dil modelinde belirlenimcidir |
| bölüm | (episode) | 37 | başlangıçtan bitişe tek bir deneme |
| getiri | (return) | 37 | bir bölümde toplanan ödüllerin iskontolanmış toplamı |
| iskonto | (discount factor) | 37 | geç gelen ödülü küçülten çarpan; metinde γ ile gösterilir |
| değer işlevi | (value function) | 37 | bir durumdan itibaren beklenen getiri. 6\. makaledeki **dikkat üçlüsünün değeriyle karıştırılmaz**; ayrım 37'de açıkça yapıldı |
| eylem-değeri | — | 37 | bir durumda belirli bir eylemi seçmenin beklenen getirisi; Q(s, a) |
| avantaj | (advantage) | 34 | bir eylemin değeri ile durumun ortalama değeri arasındaki fark; 34'te grup göreli biçimi kuruldu, biçimsel tanımı 37'de |
| kredi atama | (credit assignment) | 37 | tek bir sonucu üreten kararlardan hangisinin işe yaradığını söyleme sorunu |
| taban | (baseline) | 37 | getiriden çıkarılan, eyleme bağlı olmayan terim; oynaklığı düşürür |
| yakınsal politika optimizasyonu | (proximal policy optimization, PPO) | 37 | güven bölgesi kısıtını bir kırpma terimine indirgeyen yaygın algoritma; 13'te adsız kullanılmıştı. Tanıtıldığı çalışma hakemsizdir |
| sonuç denetimi | (outcome supervision) | 38 | geri bildirimin yalnızca nihai sonuca göre verilmesi |
| süreç denetimi | (process supervision) | 38 | zincirin her adımına ayrı geri bildirim verilmesi |
| iz hatası | (trace error) | 38 | zincirde herhangi bir hata bulunma oranı; nihai cevap hatasından bağımsız ölçülür |
| adım etiketi | — | 38 | tek bir ara adıma verilen olumlu/olumsuz değer; insan eliyle ya da tamamlama ile otomatik üretilir |

| bellek | (memory) | 39 | bir sohbette biriken bilginin sonraki çağrılarda modelin önüne yeniden konabilecek biçimde saklanması. 26 ve 27'deki **donanım belleğiyle karıştırılmaz**; ayrım 39'da açıkça yapıldı |
| kalıcı bellek | (long-term memory) | 39 | sohbetler arasında yaşayan, anahtar-değer çiftlerinden oluşan dış depo |
| yazma | (indexing) | 39 | biten oturumun bir ya da birkaç bellek kaydına çevrilmesi. 42'deki **ters dizin kurma** ile aynı sözcüğün farklı kullanımıdır |
| okuma | (reading) | 39 | getirilen kayıtların isteme konup cevabın üretilmesi aşaması |
| tazelik | (recency) | 39 | kaydın en son ne zaman kullanıldığına bakan üstel sönüm terimi |
| önem | (importance) | 39 | kaydın oluşturulurken 1–10 arasında puanlanan kayda değerliği |
| yansıma | (reflection) | 39 | modelin kendi kayıtlarını okuyup üst düzey çıkarım yazması ve onu da depoya koyması |
| bilgi güncellemesi | (knowledge update) | 39 | bir olgunun değişmesi; depoda eskisiyle yenisi birlikte kalır |
| çekimserlik | (abstention) | 39 | cevabı bilmediğinde susabilme; bellek sistemlerinde ayrı bir yetenek olarak ölçülür |
| görev ufku | (time horizon) | 40 | modelin belirli bir başarı oranıyla bitirebildiği görevin, uzman bir insan için süresi |
| toparlanma | — | 40 | yanlış bir girdiden doğru çıktıya varma olasılığı; metinde `c` ile gösterilir. Aynı kestiricinin içinden geldiğinde küçüktür |
| adım başına hata oranı | — | 40 | tek bir adımın yanlış olma olasılığı; metinde ε ile gösterilir |
| getirmeyle güçlendirilmiş üretim | (retrieval-augmented generation, RAG) | 41 | cevabı üretmeden önce dış bir dizinden getirilen metnin isteme konması; kısaltma "RAG" serbest ve Türkçeleştirilmez |
| parametrik bellek | (parametric memory) | 41 | ağırlıklarda duran bilgi |
| parametrik olmayan bellek | (non-parametric memory) | 41 | dışarıdaki dizinde duran bilgi |
| uzun kuyruk | (long tail) | 41 | ön eğitim verisinde çok az geçen olguların bölgesi |
| dizin değiştirme | (index hot-swapping) | 41 | ağırlıklara dokunmadan, dizini yenisiyle değiştirerek modelin bildiğini güncellemek |
| dikkat dağıtıcı belge | (distracting document) | 41 | getiricinin yüksek puanladığı ama cevabı taşımayan parça; rastgele belgeden daha zararlıdır |
| ezber oranı | (memorization ratio) | 41 | bağlam ile ezber çatıştığında modelin ezberlediği cevaba dönme sıklığı |
| uyarlanabilir getirme | (adaptive retrieval) | 41 | yalnızca modelin bilmesi beklenmeyen sorularda getirme yapmak |
| ters dizin | (inverted index) | 42 | her terim için o terimin geçtiği belgelerin listesi. 29\. makalede glosssuz kullanılmıştı; kurulumu 42'dedir |
| ters belge sıklığı | (inverse document frequency) | 42 | terimin derlemdeki nadirliğine göre aldığı ağırlık |
| terim sıklığı doyumu | — | 42 | sıklığın artan ama bir tavana yaklaşan bir işlevden geçirilmesi; parametresi metinde `k₁` |
| uzunluk normalleştirmesi | — | 42 | terim sıklığının belge uzunluğuna göre yumuşak biçimde bölünmesi; parametresi metinde `b` |
| öğrenilmiş seyrek getirme | (learned sparse retrieval) | 42 | modelin sözlük üzerinde seyrek bir ağırlık dağılımı üretmesi; ters dizinde çalışır |
| sırayla birleştirme | (reciprocal rank fusion) | 42 | farklı sistemlerin sonuçlarını ham puanlara bakmadan, sıraların tersini toplayarak birleştirmek |
| nDCG | — | 42 | Türkçeleştirilmez; ilk k sonucun ilgililiğini üst sıralara ağırlık vererek toplayan ve kusursuz sıralamaya bölen ölçü |
| ortalama karşılıklı sıra | (mean reciprocal rank, MRR) | 42 | ilk doğru sonucun sırasının tersinin sorgular üzerinden ortalaması. 29'daki **bulma oranından** farkı, sırayı da hesaba katması |
| vektör dizini | (vector index) | 43 | sorgu geldiğinde vektörlerin yalnızca küçük bir kısmına dokunmayı sağlayan yapı; 42'deki **ters dizinin** vektör karşılığı |
| dizinleme | — | 43 | vektör dizinini kurma işi. 39'daki **yazma (indexing)** ile aynı İngilizce sözcüğün farklı kullanımıdır; ayrım 43'te açıkça yapıldı, parantez verilmedi |
| tam tarama | (brute-force search) | 43 | sorguyu bütün belge vektörleriyle karşılaştırmak |
| yaklaşık en yakın komşu araması | (approximate nearest neighbor search) | 43 | gerçek en yakın komşuları kaçırma ihtimalini kabul eden yöntemlerin toplu adı; gövdede "yaklaşık arama" |
| küme merkezi | (centroid) | 43 | |
| k-ortalamalar | (k-means) | 43 | merkez ata, ortalamaya taşı, tekrarla |
| ters dosya | (inverted file, IVF) | 43 | küme başına vektör listesi; 42'deki **ters dizinle karıştırılmaz**, ayrım 43'te yapıldı |
| ürün kuantizasyonu | (product quantization) | 43 | alt vektörleri kod defterine yuvarlamak; 19/27'deki **kuantizasyon** ailesi, "niceleme" kullanılmaz |
| kod defteri | (codebook) | 43 | alt vektör başına 256 merkez |
| asimetrik uzaklık hesabı | (asymmetric distance computation) | 43 | sorgu sıkıştırılmaz, belge sıkıştırılmıştır; tablo oku, topla |
| hiyerarşik gezilebilir küçük dünya çizgesi | (Hierarchical Navigable Small World, HNSW) | 43 | kısaltma "HNSW" serbest |
| yakınlık çizgesi | (proximity graph) | 43 | her vektör en yakın `M` komşusuna bağlı |
| atlamalı liste | (skip list) | 43 | HNSW'nin akrabası olduğu 1D yapı |
| dizin bulma oranı | — | 43 | serinin terimi: dizinin döndürdüğü `k` sonucun tam taramanın `k` gerçek komşusuyla örtüşme oranı; 29/42'deki **bulma oranıyla (doğru belge) karıştırılmaz** |
| vektör veritabanı yönetim sistemi | (vector database management system) | 43 | gövdede "vektör veritabanı"; dizin + orta katman |
| melez sorgu | (hybrid query) | 43 | öznitelik/etiket + vektör; 42'deki **melez arama** (seyrek + yoğun) ile aynı sözcüğün farklı kullanımı |
| seçicilik | (specificity) | 43 | etiketi taşıyan vektörlerin oranı |
| parçalama | (chunking) | 44 | belgenin dizin birimlerine kesilmesi; birimi **parça** (chunk). 29/41'de "parça" glosssuz kullanılmıştı |
| önerme | (proposition) | 44 | kendine yeten, tek olgulu atomik ifade; 17'deki **atomik olgunun** getirme birimi |
| küçükle ara, büyüğü döndür | (small-to-big) | 44 | |
| kayan pencere parçalama | (sliding window) | 44 | 25'teki **pencere dikkatiyle karıştırılmaz** |
| anlamsal parçalama / sabit boyutlu parçalama | (semantic / fixed-size chunking) | 44 | |
| varsayımsal belge | (hypothetical document) | 44 | soruyu cevaplayan uydurma belge yazdırıp onunla aramak |
| sorgu yeniden yazma | (query rewriting) | 44 | |
| ortada kaybolma | (lost in the middle) | 44 | 21/25'te "ortadaki bilginin kaybı" olarak anılmıştı; alan adı 44'te kondu |
| yeniden paketleme | (repacking) | 44 | getirilen parçaların istemdeki sırası; en ilgili en sona |
| seçici güçlendirme | (selective augmentation) | 44 | sıkıştırıcının boş dönebilmesi |
| kaynak sadakati | (groundedness) | 45 | cevabın önündeki kaynağa bağlılığı; 31'deki **sadakat (faithfulness)** ile aynı sözcük, nesne farklı; alanda faithfulness de denir |
| cevap ilgililiği | (answer relevance) | 45 | |
| bağlam ilgililiği | (context relevance) | 45 | |
| ilgililik etiketi | (relevance label) | 45 | |
| güven aralığı | (confidence interval) | 45 | |
| atıf | (citation) | 45 | |
| atfedilebilir | (attributable to identified sources) | 45 | "kaynağa göre, [cümle]" testi |
| atıf bulma oranı / atıf kesinliği | (citation recall / precision) | 45 | **kesinlik (precision)** ilk kez burada gloss'landı; 42'de "ortalama kesinlik" glosssuz geçmişti |
| hakem model | (LLM-as-a-judge) | 45 | 35'teki **doğrulayıcının** değerlendirme kılığı |
| konum yanlılığı / uzunluk yanlılığı / kendini kayırma | (position / verbosity / self-enhancement bias) | 45 | |
| tahmin destekli çıkarım | (prediction-powered inference) | 45 | |
| gürültüye dayanıklılık / reddetme / bilgi bütünleştirme / karşıolgusal dayanıklılık | (noise robustness / negative rejection / information integration / counterfactual robustness) | 45 | RAG'in dört yeteneği |
| çok adımlı soru | (multi-hop question) | 46 | |
| bileşim açığı | (compositionality gap) | 46 | |
| kendine sorma | (self-ask) | 46 | |
| getirmeyi düşünce zinciriyle iç içe örmek | (interleaving retrieval with chain-of-thought) | 46 | SOZLESME §3'teki pedagojik **interleaving** ile karıştırılmaz |
| düşünce / eylem / gözlem | (thought / action / observation) | 46 | eylem 37'de kurulmuştu; gözlem yeni |
| etkin getirme | (active retrieval) | 46 | belirsizlik tetikli, ileriye bakan |
| yansıma token'ı | (reflection token) | 46 | getir mi, ilgili mi, destekli mi, yararlı mı |
| eleştirmen model | (critic model) | 46 | |
| köprü varlık / destekleyici olgular | (bridge entity / supporting facts) | 46 | |
| bağlantısız akıl yürütme | (disconnected reasoning) | 46 | kısayol ölçüsü |
| araç kullanımı | (tool use) | 47 | genel ad; işlev çağrısı onun standart biçimi |
| işlev çağrısı | (function calling) | 47 | "işlev" = programın çağrılabilir parçası (30'daki kullanım); 1–2'deki matematiksel **fonksiyon**la karıştırılmaz, ayrım 47'de açıkça yapıldı. Başlıkta da bu karşılık (karar #121) |
| araç tanımı | (tool definition) | 47 | ad + açıklama + şema |
| çalıştırıcı | (executor) | 47 | modeli çağıran uygulamanın kendi kodu; 49'da protokolün arkasına taşınır |
| mesaj sonu token'ı | — | 47 | Llama 3.1 belgelendirmesinin eom_id'si; 24'teki **tur sonu token'ıyla** (eot_id) karıştırılmaz |
| katı kip | (strict) | 47 | kısıtlı üretimin araç çağrısına uygulanmış hâli |
| uydurulmuş çağrı | — | 47 | var olmayan aracı çağırmak; yanlış argümanlı çağrıdan ayrı hata sınıfı |
| soyut sözdizimi ağacı | (abstract syntax tree) | 47 | çağrının ağaç gösterimi; alt ağaç eşlemesiyle doğruluk ve uydurma ölçülür |
| araç token'ı | — | 47 | sözlüğe eklenen, araç başına bir embedding satırı |
| paralel çağrı | (parallel function calling) | 47 | bağımsız çağrıların aynı turda yapılması |
| planlayıcı | — | 47 | çağrıların bağımlılık çizgesini üreten model |
| pass^k | — | 47 | Türkçeleştirilmez; k denemenin hepsinde başarı olasılığı; 33'teki **kapsamanın (pass@k)** tersi |
| ajan–bilgisayar arayüzü | (agent-computer interface) | 48 | gövdede "araç arayüzü"; "ajan"ın tanımı 51'e bırakıldı |
| araç arayüzü | — | 48 | aracın modele nasıl göründüğü: komutlar ve dönen metnin biçimi |
| yorumlayıcı | — | 48 | kod yorumlayıcısı; 30'daki **ayrıştırıcıyla** karıştırılmaz |
| depo | — | 48 | yazılım deposu; 4'teki **derlemle** karıştırılmaz |
| Model Bağlam Protokolü | (Model Context Protocol, MCP) | 49 | kısaltma "MCP" serbest ve Türkçeleştirilmez |
| ana bilgisayar / istemci / sunucu | (host / client / server) | 49 | her sunucu için ayrı istemci |
| listeleme / çağırma isteği | — | 49 | tools/list ve tools/call; gövdede Türkçe adlarıyla |
| sanal API sunucusu | — | 49 | önbellek + taklit eden model; ölçüt kararlılığı için |
| araç zehirleme | (tool poisoning) | 49 | açıklamaya gömülü talimat; tam kurulumu güvenlik fazında (58) |
| tamlık | — | 49 | çok araçlı görevde gereken araçların tamamını getirme; 29/43'teki **bulma oranından** ayrı |
| bilgi kesim tarihi | (knowledge cutoff) | 50 | 19'da "eğitim kesim tarihi" olarak glosssuz geçmişti |
| etkin kesim tarihi | (effective cutoff) | 50 | kaynak başına; ilan edilenden farklı olabilir |
| iç saat | — | 50 | modelin varsayılan cevap yılı; zamansal hizalamayla ayarlanır |
| bağlam–bellek çatışması | (context-memory conflict) | 50 | derlemenin üç çatışma türünün ilki |
| karşı-bellek | (counter-memory) | 50 | modelin bildiğiyle çelişen, kendi içinde tutarlı belge |
| güvenilirlik | (credibility) | 50 | getirilen belgeye ilgililik + tazelik + kaynak notu; 45'teki **kaynak sadakatiyle** karıştırılmaz |
| kaynağa göre isteme | — | 50 | "ansiklopediye göre" ibaresi; ölçüsü kaynakta birebir geçen kelime payı |

| ajan | (agent) | 51 | 48'de gloss'lanmış "ajan–bilgisayar arayüzü"nün borcu; Latince *agere*, eyleyen; gündelik "casus" anlamı 51'de açıkça ayrıldı |
| özerklik | (autonomy) | 51 | döngünün kontrolünün modele verilmesi; Wooldridge–Jennings'in dört özelliğinin ilki |
| dil modeli ajanı | (language agent) | 51 | model *kullanan* sistem; model ajanın karar veren parçasıdır |
| dış eylem / iç eylem | (external / internal action) | 51 | çağrı ve mesaj dış; akıl yürütme, getirme, öğrenme iç (CoALA) |
| çalışma belleği | (working memory) | 51 | o turda modelin önünde duran şey: pencere; 39'daki **bellek** ailesi |
| karar döngüsü | (decision cycle) | 51 | öner, değerlendir, seç, çalıştır, gözle |
| kısmi gözlenebilirlik | (partial observability) | 51 | gözlem durumun izdüşümüdür; 37'deki **durum** ajanda pencere + görünmeyen dünya |
| yürütülebilirlik | (executability) | 51 | planın her adımının çevrede çalışması; doğrulukla takas |
| tur sınırı | — | 51 | bölümün izin verilen en çok tur sayısı; 24'teki **tur sonu token'ıyla** karıştırılmaz |
| hata döngüsü | (error loop) | 52 | yeni bilgi üretmeden dönen döngü; dört çıkış dışarıdan |
| önce plan, sonra yürütme | (plan-and-execute) | 52 | |
| gerektiğinde ayrıştırma | (as-needed decomposition) | 52 | bölme bir başarısızlık cevabıdır; en çok 3–4 kat |
| eyleyen / değerlendirici / öz-yansıma | (actor / evaluator / self-reflection) | 52 | 39'daki **yansıma** ile aynı aile; girdisi başarısız bölüm, çıktısı sonraki istemin uyarısı |
| eylem ağacı araması | — | 52 | 36'daki **ağaç aramasının** eylemlere uygulanmış hâli; düğüm = çevre durumu |
| ilerleme oranı | (progress rate) | 52 | karşılanan alt hedef payı; başarı oranından ayrı |
| beceri kütüphanesi | (skill library) | 52 | çalışan programların biriktiği yordamsal bellek |
| çoklu ajan sistemi | (multi-agent system) | 53 | |
| orkestrasyon / orkestra şefi | (orchestration / orchestrator) | 53 | işi bölen, dağıtan, toplayan ajan; işçiler birbirini görmez |
| rol oyunu | (role-playing) | 53 | kullanıcı ve asistan rolünde iki ajan |
| standart işlem yordamı | (standardized operating procedure) | 53 | roller belgeyle konuşur; mesaj havuzu ve abonelik |
| tartışma | (debate) | 53 | ajanlar birbirinin cevabını görüp yeniden yazar; 36'daki **oylamadan** farkı budur |
| düşüncenin yozlaşması | (degeneration of thought) | 53 | güvenden sonra yansımayla yeni düşünce üretememe |
| grafik kullanıcı arayüzü | (graphical user interface, GUI) | 54 | kısaltma "GUI" serbest |
| erişilebilirlik ağacı | (accessibility tree) | 54 | kaynağın görünen ve anlamlı alt kümesi; kimlik numaralı |
| ekran görüntüsü | (screenshot) | 54 | görüntü modeli gerektirir; mekanizması çoklu modalite fazında |
| öğe konumlandırma | (grounding) | 54 | niyetin ekrana bağlanması; 45'teki **kaynak sadakati (groundedness)** ile aynı kök, başka kavram |
| işaretleme / numaralı kutular | (set-of-mark) | 54 | seyrek sayfada kazandırır, yoğun masaüstünde gürültü |

| yazılım mühendisliği ajanı | (software engineering agent) | 55 | gövdede "kod ajanı" |
| sorun kaydı | (issue) | 55 | |
| çekme isteği | (pull request) | 55 | |
| yama | (patch) | 55 | 5 ve 15'te gündelik anlamıyla glosssuz geçmişti; yazılım terimi olarak kurulumu 55'te |
| altın yama | (gold patch) | 55 | insanın yazdığı çözüm |
| başarısızdan geçere dönen test | (fail-to-pass) | 55 | çözüm ölçüsü; deponun önceden geçen testleri ayrıca çalıştırılır |
| gerileme testi | (regression test) | 55 | 19'daki **unutma** ile karıştırılmaz; düzeltmeyle ilgisiz, önceden geçen testler |
| hata yeniden üretimi | (bug reproduction) | 55 | 9'daki **yeniden üretme (replication)** ile aynı sözcük, başka nesne; ayrım 55'te açıkça yapıldı |
| hata yerini bulma | (fault localization) | 55 | 54'teki **öğe konumlandırma** sözcüğünden bilinçli olarak kaçınıldı |
| birim test | — | 48 | 48 ve 52'de glosssuz; 55'te de glosssuz. **Test takımı** (34, 35) ile eşanlamlı kullanılır |
| ajansız hat | (agentless pipeline) | 55 | sırası sabit üç aşama; model karar vermez, üretir |
| makul yama | (plausible patch) | 55 | test takımının bütün girdilerinde doğru çıktı; **doğru yama** hatayı gideren; ayrım Qi ve ark. 2015 |
| çözüm sızıntısı | (solution leakage) | 55 | çözümün sorun kaydında yazılı olması; 50'deki **dizine sızan belge** ailesi |
| yürütmeli / yürütmesiz doğrulayıcı | — | 55 | execution-based / execution-free verifier; gövdede parantezsiz; 35'teki doğrulayıcı ailesi |
| durum yönetimi | (state management) | 56 | pencereye ne girer, dışarıda ne durur, ne zaman geri gelir; 51'deki **durum** üzerine biner |
| çalışma bağlamı | (working context) | 56 | pencere içi sabit boyutlu not alanı; 51'deki **çalışma belleği** ile karıştırılmaz (onun bir bölmesidir) |
| bellek baskısı | (memory pressure) | 56 | pencere eşiği aşınca düşen sistem mesajı |
| sayfalama / mesaj deposu / arşiv | — | 56 | paging / recall storage / archival storage; gövdede parantezsiz; "geri çağırma" sözcüğünden kaçınıldı (18/21 ve 29'daki ayrım) |
| iç durum | (internal state) | 56 | her turda yeniden yazılan birleştirilmiş metin |
| olaysal bellek / anlamsal bellek / yordamsal bellek | (episodic / semantic / procedural memory) | 56 | 51'de betimleyici adlarla glosssuz geçmişti; adları 56'da kondu |
| içgörü | (insights) | 56 | görevler arası ders listesi |
| bellek evrimi | (memory evolution) | 56 | eski notların yeni notla yeniden yazılması |
| bilgi çizgesi | (knowledge graph) | 56 | 51'de yalnızca ortam adı olarak glosssuz geçmişti; kurulumu 56'da. "PageRank" Türkçeleştirilmez |
| iş akışı | (workflow) | 56 | geçmiş bölümlerden çıkarılan yeniden kullanılabilir alt yordam |
| geriye dönük kurulum | (backward construction) | 56 | talimatın bölümden sonra yazılması |
| doğru getirme / sınama anında öğrenme / uzun erim kavrayışı / seçici unutma | (accurate retrieval / test-time learning / long-range understanding / selective forgetting) | 56 | dört bellek yeteneği |
| ara hedef | (checkpoints) | 57 | 8'deki **kontrol noktası** ile aynı İngilizce sözcük, başka nesne; ayrım 57'de açıkça yapıldı |
| kısmi puan | (partial completion score) | 57 | |
| hakem ajan | (agent-as-a-judge) | 57 | 45'teki **hakem modelin** iz okuyan, araç kullanan biçimi |
| benzetilmiş kullanıcı | (simulated user) | 57 | 47'de "kullanıcıyı canlandıran ikinci bir model" olarak glosssuz geçmişti |
| Pareto sınırı | (Pareto frontier) | 57 | aynı paraya daha yüksek puan ya da aynı puana daha az para veren komşusu olmayan düzenler |
| tutulan küme | (holdout set) | 57 | |
| hile oranı | (cheating rate) | 57 | imkânsız görevde geçme oranı; sıfır olmalı |
| dolaylı istem enjeksiyonu | (indirect prompt injection) | 58 | 24'teki **istem enjeksiyonunun** ajan hâli |
| saldırısız yarar / saldırı altında yarar / hedefli saldırı başarısı | (— / — / targeted attack success rate) | 58 | üç ölçü birlikte okunur |
| açılır pencere | (pop-ups) | 58 | |
| kum havuzu | (sandbox) | 58 | 52 ve 55'te glosssuz geçmişti; tanımı 58'de. Başlıkta da bu karşılık (karar #135) |
| en az ayrıcalık | (least privilege) | 58 | Saltzer & Schroeder 1975 |
| yetki etiketi | (capability) | 58 | güvenlik alanındaki anlam; makine öğrenmesindeki "yetenek" ile karıştırılmaması için ilk geçişte söylendi |
| araç süzgeci / enjeksiyon dedektörü / ayraç / karantina modeli / kap / mikro sanal makine | — | 58 | tool filter / injection detector / delimiter / quarantined LLM / container / microVM; gövdede parantezsiz |

| devir / devretme | (deferral / defer) | 59 | ajanın kararı insana bırakması; 51'deki durma eyleminin üçüncü kolu Q(s, devret). Başlıkta da bu karşılık |
| otomasyon düzeyi | (level of automation) | 59 | Sheridan ölçeği, on basamak; Parasuraman ve ark. 2000 |
| operatör / işbirlikçi / danışman / onaylayıcı / gözlemci | — | 59 | Feng ve ark.'nın beş rolü; Türkçe adlar, parantezsiz |
| reddederek öğrenme | (rejection learning) | 59 | modelin "geçiyorum" diyebilmesi; 62'deki **reddetme (refusal)** ile karıştırılmaz |
| devretmeyi öğrenme | (learning to defer) | 59 | Madras ve ark. 2018 |
| sınıflandırıcı ve reddedici | (classifier and rejector) | 59 | Mozannar & Sontag 2020 |
| tamamlayıcılık | (complementary performance) | 59 | takımın iki tarafın en iyisinden de iyi olması |
| aşırı güvenme | (overreliance) | 59 | model yanlışken bile öneriyi kabul etmek |
| bilişsel zorlama | (cognitive forcing) | 59 | |
| uygun güven | — | 59 | Lee & See'nin "appropriate reliance"ı; Schemmer'in iki ölçüsü betimleyici verildi, kısaltma kullanılmadı |
| eksik belirtimli | (underspecified) | 59 | |
| netleştirme sorusu | (clarifying question) | 59 | |
| kalibrasyon açığı / ayırt etme açığı | (calibration gap / discrimination gap) | 59 | insanın modele güveni ↔ modelin güveni; Steyvers ve ark. 2025 |
| ajan kimliği | — | 59 | Chan ve ark.'nın "agent identifiers"ı; parantez verilmedi |
| eylem koruması | (action guard) | 59 | |
| istem önbelleği | (prompt caching) | 60 | 26'daki önek paylaşımının ürün hâli; yazma 1,25×, okuma 0,1× |
| geçiş başına bedel | (cost-of-pass) | 60 | deneme maliyeti ÷ başarı olasılığı; Erol ve ark. 2026 |
| sınır bedeli | (frontier cost-of-pass) | 60 | eldeki modeller arasında en düşük geçiş başına bedel |
| basamaklama | (cascade) | 60 | ucuzdan pahalıya sıra; FrugalGPT |
| yönlendirici | (router) | 60 | sorguyu güçlü ya da zayıf modele ayıran model |
| anlamsal değişken | (semantic variable) | 60 | Parrot |
| hat başı tıkanması | (head-of-line blocking) | 60 | |
| kendi hatasına koşullanma | (self-conditioning) | 60 | Sinha ve ark. 2026 |
| hizalama sorunu | (alignment problem) | 61 | 6'daki çeviri hizalamasından ayrım 61'de açıkça yapıldı; 61'den itibaren "hizalama" aksi söylenmedikçe 11'deki anlamda (karar #143) |
| belirtim | (specification) | 61 | amacın ödül / ölçüt / test / tercih olarak yazılışı; 49'daki protokol belirtimiyle aynı sözcük, başka nesne |
| vekil ödül | (proxy reward) | 61 | |
| belirtim oyunu | (specification gaming) | 61 | |
| ödül hırsızlığı | (reward hacking) | 61 | belirtim oyununun pekiştirmeli öğrenmedeki adı |
| oynanabilir çift | — | 61 | Skalse ve ark.'nın "hackable" çifti; gövdede parantezsiz |
| ağırlık / ontoloji / kapsam | — | 61 | Pan ve ark.'nın üç yanlış belirtim türü |
| faz geçişi | (phase transition) | 61 | yetenek eşiğinde ani davranış değişimi |
| yetenek genellemesi / hedef genellemesi | — | 61 | Langosco ve ark.; gövdede parantezsiz |
| hedef yanlış genellemesi | (goal misgeneralization) | 61 | |
| içsel eniyileyici | (mesa-optimizer) | 61 | Hubinger ve ark. 2019 (hakemsiz) |
| dış hizalama / iç hizalama | (outer / inner alignment) | 61 | |
| ödül kurcalama | (reward tampering) | 61 | Everitt ve ark. 2021 |
| yardımsever, dürüst, zararsız | (helpful, honest, harmless) | 61 | Askell ve ark. 2021; "HHH" kısaltması gövdede kullanılmadı |
| reddetme / ret | (refusal) | 62 | öğrenilmiş davranış; 59'daki **reddederek öğrenme** ile karıştırılmaz |
| güvenlik eğitimi | (safety training) | 62 | |
| aşırı güvenlik | (exaggerated safety) | 62 | güvenli istemi reddetmek; "aşırı ret" de kullanıldı |
| bağlamsal uyumsuzluk | (contextual noncompliance) | 62 | eksik / desteklenmeyen / belirlenemez / insanlaştıran / güvensiz |
| maliyet modeli | (cost model) | 62 | zararsızlık çiftlerinden eğitilen ikinci model |
| Lagrange çarpanı | (Lagrange multiplier) | 62 | kısıt ihlal edildikçe büyüyen ağırlık; biçimsel kurulumu matematik fazında |
| sığ hizalama | (shallow safety alignment) | 62 | |
| ret öneki | — | 62 | "I cannot" gibi ilk token'lar |
| yarışan hedefler / uyumsuz genelleme | (competing objectives / mismatched generalization) | 62 | Wei ve ark. 2023 |
| jailbreak | — | 63 | başlıkta ve gövdede İngilizce; alanda Türkçeleştirilmiyor (karar #148; #108 ölçütü) |
| kırmızı takım | (red teaming) | 63 | |
| saldırı başarı oranı | (attack success rate) | 63 | 58'deki "hedefli saldırı başarısı" ile aynı aile; burada genel ölçü |
| evrensel / aktarım | (universal / transfer) | 63 | saldırının istemden bağımsızlığı; açık modelde bulunup kapalıya geçmesi |
| düşmanca sonek | (adversarial suffix) | 63 | "düşmanca" adversarial karşılığı; "çekişmeli" kullanılmadı |
| açgözlü koordinat gradyanı | (greedy coordinate gradient, GCG) | 63 | kısaltma gövdede serbest |
| kara kutu / beyaz kutu | (black-box / white-box) | 63 | erişim düzeyi |
| rastgele arama | (random search) | 63 | Andriushchenko ve ark.'nın uyarlanır saldırısı |
| cevap önekini doldurma | (prefilling) | 63 | cevabın ilk token'larını saldırganın yazması; 62'nin ret önekinin karşı tarafı |
| many-shot | — | 63 | 23'ün few-shot / many-shot kararı sürüyor; "çok gösterimli" kullanılmadı |
| ölçeklenebilir denetim | (scalable oversight) | 64 | başlıkta |
| anayasa | (constitution) | 64 | ilke listesi; "Constitutional AI" özel ad olarak korundu |
| geri bildirim modeli | (feedback model) | 64 | ilkeyle etiketleyen model; 13'ün ödül modelinden ayrı |
| yapay geri bildirimden pekiştirmeli öğrenme | (reinforcement learning from AI feedback, RLAIF) | 64 | kısaltma gövdede serbest |
| sandviçleme | (sandwiching) | 64 | Bowman ve ark.'nın düzeni: katılımcı, model, uzman |
| geri kazanılan performans payı | (performance gap recovered) | 64 | Burns ve ark.; kısaltma gövdede kullanılmadı |
| danışmanlık | (consultancy) | 64 | 59'daki "danışman" rolüyle aynı kök, başka nesne: tek taraflı tartışma |
| ikna gücü | (persuasiveness) | 64 | Khan ve ark. |
| güvenilirlik diyagramı | (reliability diagram) | 65 | 16'nın kalibrasyon tanımının şekli |
| beklenen kalibrasyon hatası | (expected calibration error, ECE) | 65 | kısaltma gövdede serbest |
| Brier puanı | (Brier score) | 65 | 2'deki karesel hatanın olasılık biçimi |
| eğri altı alan | — | 65 | 59'da kuruldu; 65'te "alandaki kısaltmasıyla AUROC" |
| sıcaklık ölçekleme | (temperature scaling) | 65 | 10'un sıcaklığı, kalibrasyon için tek parametre |
| sözel güven | (verbalized confidence) | 65 | |
| dilsel kalibrasyon | (linguistic calibration) | 65 | |
| anlamsal entropi | (semantic entropy) | 65 | |
| konfabülasyon | (confabulation) | 65 | 17'nin halüsinasyonunun keyfî / tutarsız alt türü |
| seçici tahmin | (selective prediction) | 65 | |
| cevaplama oranı | (coverage) | 65 | 33'teki "kapsama" ile aynı İngilizce sözcük, başka nesne |
| dalkavukluk | (sycophancy) | 66 | başlıkta; 13'ün "hoşa gideni ödüllendirir" işaretinin adı |
| simulakr | (simulacrum) | 66 | Shanahan ve ark.'nın rol oyunu çerçevesi |
| karakter eğitimi | (character training) | 66 | |
| karakter vektörü | (persona vector) | 66 | |
| beliren hizalanmama | (emergent misalignment) | 66 | Betley ve ark.; "beliren" 5'in beliren yetenekleriyle aynı sözcük |
| aldatma | (deception) | 67 | doğruluk dışı bir hedefin peşinde sistematik yanlış inanç oluşturmak; 17'nin uydurmasından ve 66'nın dalkavukluğundan ayrımı 67'de yapıldı |
| model organizması | (model organism) | 67 | incelenmek için bilerek üretilmiş hizalanmamışlık örneği |
| uyuyan ajan | (sleeper agent) | 67 | koşul gelene kadar normal davranan model |
| arka kapı; tetikleyici | (backdoor; trigger) | 67 | 58'deki saldırı ailesinden farkı: davranış eğitimle konur |
| hizalama taklidi | (alignment faking) | 67 | eğitim hedefine yalnızca eğitimde uymak |
| aldatıcı hizalanma | (deceptive alignment) | 67 | 61'deki içsel eniyileyici hipotezinin adı; hipotez olarak işaretlenir |
| entrika; bağlam içi entrika | (scheming; in-context scheming) | 67 | hizalanmamış hedefi gizlice kovalamak; hedef istemle veriliyorsa bağlam içi |
| gizli eylem | (covert action) | 67 | entrikanın ölçülen vekili |
| yetenek saklama | (sandbagging) | 67 | değerlendirmede stratejik düşük başarı; "kum torbası" kullanılmaz |
| parola kilidi | (password-locking) | 67 | yeteneği parola olmadan saklayan ince ayar |
| durum farkındalığı | (situational awareness) | 67 | modelin kendisi ve içinde bulunduğu aşama hakkındaki bilgisi |
| bağlam dışı akıl yürütme | (out-of-context reasoning) | 67 | 23'teki örnekle öğrenmenin tersi |
| değerlendirme farkındalığı | (evaluation awareness) | 67 | test ↔ dağıtım ayrımını yapabilme |
| sonda | (probe) | 67 | aktivasyondan tek özelliği okuyan küçük sınıflandırıcı; 62'deki ret yönü bir sondanın bulduğu yön |
| sonradan gerekçe | (post-hoc reasoning) | 67 | cevap belirlendikten sonra yazılan zincir; 31/32'deki sadakatin karşıtı |
| izlenebilirlik | (monitorability) | 67 | sadakatin yerine önerilen özellik |
| yapay zekâ kontrolü | (AI control) | 67 | modeli aldatıcı varsayıp protokolü ölçen düzen |
| hizalama denetimi | (alignment audit) | 67 | gizli hedef arayan sistematik inceleme; 69'daki denetim ailesinin model tarafı |
| sabotaj değerlendirmesi | (sabotage evaluation) | 67 | modelin kendi denetimini bozup bozamayacağının ölçümü |
| marjinal risk | (marginal risk) | 68 | teknoloji olmasaydı kalacak düzeyin üstüne eklenen pay |
| bir günlük açık | (one-day vulnerability) | 68 | yaması yayımlanmış ama kapatılmamış açık |
| bayrak yakalama | (capture the flag) | 68 | siber yarışma görevi; ölçüsü insanın ilk çözüm süresi |
| unutturma | (unlearning) | 68 | tehlikeli bilginin kasıtlı çıkarılması; 19'daki unutmadan farkı kasıtlı olması |
| geri kazanım saldırısı | — | 68 | unutturulmuş yeteneği ince ayarla ya da yön çıkarmayla geri getirmek |
| yayımlama gradyanı | (release gradient) | 68 | tamamen kapalıdan tamamen açığa altı basamak |
| yapısal erişim | (structured access) | 68 | ağırlığı yayımlamadan denetim ve araştırma sağlayan aracılı erişim |
| sistemik risk | (systemic risk) | 69 | AB yasasının genel amaçlı model sınıfı; eşiği 10²⁵ işlem karinesi |
| uygunluk karinesi | — | 69 | uyumlaştırılmış standarda uyumun yasaya uyum sayılması |
| kara kutu / beyaz kutu / kutu dışı denetim | (black-box / white-box / outside-the-box audit) | 69 | 63'teki kara kutu ↔ beyaz kutu saldırı ayrımının denetim hâli |
| yetenek eşiği; gerekli korumalar | (capability threshold; required safeguards) | 70 | çerçevelerin eşik–önlem çifti |
| kritik yetenek düzeyi | (critical capability level) | 70 | aynı çiftin bir başka çerçevedeki adı |
| koşullu taahhüt | (if-then commitment) | 70 | "şu ölçülürse şu önlem" biçimi |
| güvenlik savunması | (safety case) | 70 | sistemin yeterince güvenli olduğunu kanıtla savunan yapılandırılmış belge |
| yetenek çıkarma | (capability elicitation) | 70 | ölçümün elde edilebilir en yüksek yeteneği çıkarması |

| yapı | (construct) | 71 | ölçülmek istenen soyut şey; 16'daki cetvelin ölçtüğü iddia edilen şey |
| görevleştirme | (operationalization) | 71 | yapıyı görev + örneklem + puanlama kuralına çevirme |
| yapı geçerliliği | (construct validity) | 71 | görevin yapıyı ne kadar temsil ettiği |
| güvenilirlik | (reliability) | 71 | ölçümün tekrarında tutarlılık; 50/57'deki "güvenilir" (dependable) sözcüğünden ayrı |
| kolaycı örnekleme | (convenience sampling) | 71 | elde olanın örneklem sayılması |
| kısayol öğrenme | (shortcut learning) | 71 | görevi çözmeden puanı alan ipucunu öğrenmek; 57'deki kısayol/hilenin öğrenme hâli |
| etiketleme artefaktı | (annotation artifact) | 71 | etiketleyicinin bıraktığı, cevabı ele veren iz |
| standart hata; kümelenmiş standart hata | (standard error; clustered standard error) | 71 | puanın örneklem hatası; sorular öbeklendiğinde düzeltilmiş hâli |
| istatistiksel güç | (statistical power) | 71 | gerçek bir farkı görebilme olasılığı |
| madde tepki kuramı | (item response theory) | 71 | soruların zorluğunu ve ayırt ediciliğini modelleyen psikometri |
| çok istemli değerlendirme | (multi-prompt evaluation) | 71 | aynı soruyu birden çok istem biçimiyle sormak |
| seçim yanlılığı | (selection bias) | 71 | çoktan seçmelide şık konumuna ya da harfine bağlı tercih |
| dinamik ölçüt | (dynamic benchmark) | 71 | kesim tarihinden sonraki sorularla sürekli yenilenen ölçüt |
| ölçüt piyangosu | (benchmark lottery) | 71 | hangi ölçütün seçildiğinin sıralamayı belirlemesi |
| değerlendirme bilimi | (evaluation science) | 71 | ölçümü kendi disiplini olarak kurma çağrısı |
| çıkarılabilir | (extractable) | 72 | dizinin bir önekle modelden geri alınabilmesi |
| dolaylı sızıntı | (indirect leakage) | 72 | test verisinin arayüzden ya da görevden eğitim verisine sızması |
| görev kirliliği | (task contamination) | 72 | test kümesinin kendisi değil görev türünün eğitime girmesi |
| değiştirilebilirlik | (exchangeability) | 72 | kanonik sıra tercihi testinin dayandığı istatistiksel varsayım |
| üyelik çıkarımı | (membership inference) | 72 | bir örneğin eğitim kümesinde olup olmadığını modelden çıkarma |
| veri damgası | (data watermark) | 72 | kümeye kasıtlı gömülen ve sızıntıyı ele veren işaret |
| çıkarılabilir ezber; ezberden okuma / yeniden kurma / anımsama | (extractable memorization; recitation / reconstruction / recollection) | 72 | ezberin ölçülebilir tanımı ve üç türü |
| işlevsel ölçüt | (functional benchmark) | 72 | aynı şablonun yeni sayılarla üretildiği ölçüt |
| sömürü | (exploitation) | 72 | ezberden farklı: kirli olmayan ama şablonu öğrenilmiş görevden puan almak |
| test görevine eğitim | (training on the test task) | 72 | ölçütün görev türüne özel eğitim verisiyle çalışmak |
| kitle kaynak | (crowdsourcing) | 73 | platform işçileriyle etiketleme |
| hoşgörü | (leniency) | 73 | hakemin eksik ya da yanlış cevaba geçer not vermesi |
| kendini tanıma | (self-recognition) | 73 | hakemin bir metni kendisinin yazdığını ayırt etmesi; 45'teki kendini kayırmadan ayrı |
| uzunluk kontrolü | (length control) | 73 | tercihi uzunluğa göre modelleyip düzeltmek |
| kurul | (panel) | 73 | ayrı ailelerden birkaç küçük hakem |
| insan çapası | (human grounding) | 73 | hakemin sayısını küçük bir insan kümesiyle bağlamak |
| mekanistik yorumlanabilirlik | (mechanistic interpretability) | 74 | ağın hesabını okunabilir bileşenlere ve nedensel bağlara ayırmak |
| devre | (circuit) | 74 | bir davranışı taşıyan bileşen alt çizgesi |
| artık akış | (residual stream) | 74 | 7'deki artık bağlantının katmanlar boyu hâli; başların okuyup yazdığı kanal |
| sorgu-anahtar devresi; çıktı-değer devresi | (QK circuit; OV circuit) | 74 | başın nereye bakacağı ve ne yazacağı; 6'nın üçlüsünün ikiye ayrılmış hâli |
| indüksiyon başı | (induction head) | 74 | "A B … A → B" kopyalayan baş; en az iki katman ister |
| aktivasyon yaması | (activation patching) | 74 | ara hesabı başka çalıştırmadan alınan değerle değiştirmek; 18'deki nedensel izlemenin genel hâli |
| gürültü giderme; gürültüleme | (denoising; noising) | 74 | yamanın iki yönü: "yeter mi" ↔ "gerekli mi" |
| nedensel aracılık çözümlemesi | (causal mediation analysis) | 74 | doğrudan ↔ dolaylı etki ayrımı |
| nedensel soyutlama | (causal abstraction) | 74 | ağın yüksek düzeyli nedensel modelin uygulaması olup olmadığı |
| sadakat; tamlık; enazlık (devre ölçütleri) | (faithfulness; completeness; minimality) | 74 | 31'deki sadakat aynı anlamda, nesne devre; 49'daki tamlık sözcüğünden ayrı |
| atıf yaması | (attribution patching) | 74 | yamanın gradyanla doğrusal yaklaşıklığı |
| işlev vektörü | (function vector) | 74 | az sayıda başın taşıdığı görev temsili |
| grokking | — | 74 | geç genelleme; Türkçeleştirilmedi |
| ilerleme ölçüsü | (progress measure) | 74 | sıçramanın altındaki sürekli süreci ölçen büyüklük |
| evrensellik | (universality) | 74 | aynı özellik ve devrelerin farklı ağlarda yeniden belirmesi; 63'teki "evrensel saldırı"dan ayrı |
| kontrol görevi; seçicilik | (control task; selectivity) | 74 | rastgele etiketli sondayla karşılaştırma; 43'teki özgüllükten (specificity) ayrı |
| yorumlanabilirlik yanılsaması; uyuyan yol | (interpretability illusion; dormant pathway) | 74 | okumanın veri kümesinden ya da yamanın uyandırdığı yoldan gelmesi |

| özellik | (feature) | 75 | 74'te bold ama glosssuz geçmişti; girdinin model tarafından hesaplanan ve bir yöne karşılık gelen niteliği |
| doğrusal temsil varsayımı | (linear representation hypothesis) | 75 | özellik = yön; Engels'in çember örneği istisnayı gösterir |
| çok anlamlılık | (polysemanticity) | 75 | 3'teki gözlemin adı |
| süperpozisyon | (superposition) | 75 | boyut sayısından fazla özelliğin tam dik olmayan yönlere yerleşmesi |
| girişim | (interference) | 75 | süperpozisyonun bedeli; ReLU eşiği küçüğünü kırpar |
| sözlük öğrenme | (dictionary learning) | 75 | 4'teki "sözlük" (vocabulary) ile aynı sözcük, ayrı iş — 75'te adlandırıldı |
| seyrek otokodlayıcı | (sparse autoencoder) | 75 | aktivasyonu seyrek parçalara ayıran iki katmanlı düzenek |
| genişleme çarpanı | (expansion factor) | 75 | sözlük boyu ÷ aktivasyon boyutu |
| ölü özellik | (dead feature) | 75 | eğitim sonunda hiçbir örnekte etkinleşmeyen parça |
| emilim | (absorption) | 75 | hiyerarşide ana parçanın çocuk parçanın üstünde susması |
| kelepçeleme | (clamping) | 75 | bir parçanın etkinliğini zorla bir değere sabitlemek |
| yönlendirme | (steering) | 75 | ara aktivasyona müdahaleyle davranışı çekmek; 72'deki "yönlendirmeli tamamlama"dan ayrı (76'da adlandırıldı) |
| ortalama fark yönü | (difference-in-means direction) | 76 | karşıt istem çiftlerinin aktivasyon ortalamalarının farkı |
| yön silme | (directional ablation / concept erasure) | 76 | aktivasyonun o yöndeki bileşeninin çıkarılması |
| koşullu müdahale | (conditional steering) | 76 | sonda koşulu tutarsa uygulanan yönlendirme |
| devre kesici | (circuit breaker) | 76 | zararlı çıktı üretilirken temsilin yeniden yönlendirilmesi |
| temsil ince ayarı | (representation finetuning) | 76 | ağırlıklar donduruluyken temsil üstünde öğrenilmiş müdahale |
| atıf | (attribution) | 77 | 45'teki "atıf" (citation) ile aynı sözcük; 77'de "kaynak atfı" ↔ "neden atfı" diye ayrıldı |
| duyarlılık | (sensitivity) | 77 | atıf aksiyomu; 22'deki istem duyarlılığından ayrı |
| gerçekleme değişmezliği | (implementation invariance) | 77 | aynı fonksiyonu hesaplayan iki ağ aynı payları vermeli |
| tümlenmiş gradyan | (integrated gradients) | 77 | tabandan girdiye giden yol boyunca gradyan toplamı |
| etki fonksiyonu | (influence function) | 77 | bir eğitim örneğinin ağırlığı artsaydı parametrelerin ne kadar kayacağı |
| örtük sonradan gerekçelendirme | (implicit post-hoc rationalization) | 77 | 67'deki "sonradan gerekçe"nin yapay ipucusuz hâli |
| beliren yetenek | (emergent ability) | 78 | 5'te parantezli geçmişti; 78'de tanımı iki parçalı olarak kuruldu |
| ilerleme ölçüsü | — | 74 | 78'de sıçramanın altındaki sürekli süreç için kullanıldı |

| dağılım kayması | (distribution shift) | 79 | 13, 65, 72, 75 ve 78'de glosssuz geçmişti; resmî kurulum 79'da |
| sağlamlık | (robustness) | 79 | 45'te "gürültüye dayanıklılık" glossunun içinde geçmişti; resmî kurulum 79'da |
| kovaryat kayması | (covariate shift) | 79 | girdi dağılımı değişir, girdiden etikete kural aynı kalır |
| etiket kayması | (label shift) | 79 | sınıfların oranları değişir, kural aynı kalır |
| kavram kayması | (concept shift) | 79 | aynı girdiye karşılık gelen doğru cevabın kendisi değişir |
| alt topluluk kayması | (subpopulation shift) | 79 | dağılım aynı, az temsil edilen kesimde başarı düşük |
| en kötü grup doğruluğu | (worst-group accuracy) | 79 | ortalamanın gizlediği alt küme puanı |
| dağılım içi / dağılım dışı | — | 79 | gövdede parantezsiz; 13'te "dağılım dışı" glosssuz geçmişti |
| etkin sağlamlık | (effective robustness) | 79 | aynı dağılım içi puandaki modellerin eğrisinin ne kadar üstünde durulduğu |
| düşmanca örnek | (adversarial example) | 79 | 63'teki **düşmanca sonek**in görüntü tarafındaki atası |
| düşmanca eğitim | (adversarial training) | 79 | 63'te glosssuz geçmişti; eyer noktası kurulumu 79'da |
| sertifikalı savunma | — | 79 | belirli bir yarıçap içinde kanıt veren savunma; gövdede parantezsiz |
| rastgeleleştirilmiş yumuşatma | (randomized smoothing) | 79 | gürültü ekleyip oy çokluğuna bakan sınıflandırıcı |
| karartılmış gradyan | — | 79 | savunmanın gradyanı kullanılamaz hâle getirmesi; obfuscated gradients |
| model kartı | (model card) | 20 | 20'de gloss'landı; bölümleri ve gerekçesi 80'de kuruldu |
| amaçlanan kullanım | (intended use) | 80 | model kartının kimlik bölümü |
| ayrıştırılmış değerlendirme | (disaggregated evaluation) | 80 | puanın gruplara ve kesişimlere bölünerek raporlanması |
| veri açıklaması | (data statement) | 80 | dil verisinde konuşucu demografisi ve bağlam |
| veri kartı | (data card) | 80 | 20'deki **veri künyesinin** okunabilirlik tarafındaki akrabası |
| sistem kartı | (system card) | 80 | modelin çevresindeki sistemi ve dağıtım kararını belgeleyen kart; hakemsiz |
| teknik dokümantasyon | — | 80 | AB yasasının Ek IV'ünün istediği belge; gövdede parantezsiz |
| yönetişim / model / uygulama denetimi | — | 80 | üç katmanlı denetim; 69'daki denetim ailesinin ayrıştırılmış hâli |
| görüntü yaması | (patch) | 81 | 55'teki **yama** (yazılım) ve 74'teki **aktivasyon yaması** ile aynı sözcük, başka nesne; ayrım 81'de yapıldı |
| görsel token | (visual token) | 81 | 54'te glosssuz geçmişti; sayısı çözünürlükle karesel büyür |
| görüntü-dil modeli | (vision-language model) | 81 | başlıkta da bu karşılık (karar #178); 54'ün "görüntü modeli"yle aynı aile |
| karşıtsal ön eğitim | (contrastive pre-training) | 81 | eşleşen çiftin nokta çarpımını büyütmek |
| görsel talimat ayarı | (visual instruction tuning) | 81 | 12'deki sentetik verinin görüntü hâli |
| çapraz dikkat | (cross-attention) | 81 | 29'daki **çapraz kodlayıcıyla** karıştırılmaz; kapılı biçimi 81'de |
| nesne uydurması | (object hallucination) | 81 | 17'nin içsel uydurmasının görüntü hâli |
| dalga biçimi | (waveform) | 82 | saniyede on binlerce kez ölçülmüş basınç değerleri |
| anlamsal token / akustik token | (semantic / acoustic token) | 82 | ne söylendiği ↔ nasıl duyulduğu |
| sinir ses kodlayıcısı | (neural audio codec) | 82 | kodlayıcı, kuantizasyon, çözücü |
| artık vektör kuantizasyonu | (residual vector quantization) | 82 | 43'teki **ürün kuantizasyonu** ailesinden; amacı arama değil geri sentez |
| kelime hata oranı | — | 82 | tanıma katmanının cetveli; gövdede parantezsiz |
| zayıf denetim | — | 82 | temiz olmayan ama çok sayıda eşleşmeyle eğitim; gövdede parantezsiz |
| vokoder | (vocoder) | 82 | ara temsili dalga biçimine çeviren model |
| çerçeve hızı | — | 82 | saniyede kaç ses çerçevesi; adım adım üretimin adım sayısını belirler |

| difüzyon | — | 83 | başlıkta da bu karşılık (karar #184); gövdede parantezsiz, bilim dilindeki yerleşik yazımı |
| düşmanca üretken ağ | (generative adversarial network) | 83 | "çekişmeli" **kullanılmaz** (karar #149); difüzyondan önceki baskın üretken aile |
| ileri yön / geri yön | — | 83 | bozma tasarımdır, geri getirme öğrenilir; gövdede parantezsiz |
| skor | — | 83 | veri yoğunluğunun logaritmasının gradyanı; 6'daki **dikkat skoruyla** aynı sözcük, başka nesne — ayrım 83'te yapıldı |
| örnekleyici | (sampler) | 83 | adım sayısı modelin değil örnekleyicinin özelliğidir; 10'daki **örnekleme** ile aynı kökten |
| gizil uzay | (latent space) | 83 | difüzyonun pikselden taşındığı yer; indirgeme çarpanı bir tasarım değişkenidir |
| kılavuzluk; sınıflandırıcısız kılavuzluk | (guidance; classifier-free guidance) | 83 | 10'daki **sıcaklığın** buradaki hâli; yazarların kendi çerçevelemesi |
| kesinlik | (precision) | 45 | 45'te atıf kesinliği olarak gloss'landı; 83'te üretim sadakati için kullanıldı, çakışma gövdede adlandırıldı |
| kapsama | (coverage) | 33 | 33'te pass@k, 65'te cevaplama oranı; **83'te üretimin çeşitlilik ölçüsü** (kaynağın "recall" dediği ölçü) — "geri çağırma" **kullanılmadı**, çünkü 18/21 ve 29'daki ayrım korunuyor |
| kuantizasyon (görsel) | — | 84 | 19/27'deki kuantizasyonla aynı sözcük, nesne farklı: sürekli vektörü kod defterine yuvarlamak |
| kod defteri | (codebook) | 84 | 43'teki **ürün kuantizasyonu** ve 82'deki artık kuantizasyonla aynı aile |
| erken kaynaşma | (early fusion) | 84 | modaliteler modelin girişinde tek diziye karışır; 81'deki bağlantı yollarının karşıtı |
| sonraki ölçek tahmini | — | 84 | sonraki token yerine kabadan inceye üretim; gövdede parantezsiz |
| koşullu hesaplama | (conditional computation) | 85 | parametre sayısı ile token başına hesabın bağını kırar |
| uzman; kapı ağı | (expert; gating network) | 85 | ileri beslemeli katmanın çoğaltılmış hâli ve onu seçen ağ |
| yük dengeleme kaybı | (load balancing loss) | 85 | dengesizliği cezalandıran ek terim; asıl hedefle yarışır |
| kapasite; düşen token | — | 85 | uzman başına en fazla token; aşan token katmanı atlar. Gövdede parantezsiz |
| etkin parametre sayısı | (effective parameter count) | 85 | yönlendirilmiş modeli aynı başarıdaki yoğun modele eşleyen boy |
| tanecik | (granularity) | 85 | aynı toplam uzman parametresinin kaç uzmana bölündüğü |
| hepsi-hepsiye iletişim | (all-to-all communication) | 85 | uzmanlar cihazlara dağıldığında her katmanda ödenen bedel |
| seyrek dikkat | (sparse attention) | 86 | bütün ikililer yerine seçilmiş alt küme |
| doğrusal dikkat | (linear attention) | 86 | softmax yerine çekirdek biçiminde benzerlik; model matris durumlu yinelemeye döner |
| durum uzayı modeli | (state space model, SSM) | 86 | başlıkta kısaltma kalır (#108); eğitimde evrişim, çıkarımda yineleme |
| seçicilik | (selectivity) | 86 | sistem parametrelerinin girdiye bağlı hâle gelmesi; evrişim görünüşünü bozar |
| çağrışımsal geri çağırma | (associative recall) | 86 | bağlamda geçmiş bir eşleşmeyi geri çağırmak; 18/21'deki **geri çağırmayla** aynı anlamda, 29'daki bulma oranından ayrı |
| melez mimari | — | 86 | katmanların küçük bir bölümünde tam dikkat; gövdede parantezsiz |

| yumuşak etiket | (soft target) | 87 | öğretmenin yüksek sıcaklıkta ürettiği, bütün sınıflara yayılmış dağılım; 10'daki **sıcaklık** burada yeniden kullanılır |
| öğretmen / öğrenci | (teacher / student) | 87 | damıtmanın iki tarafı; 34'te adı geçmişti, rolleri 87'de kuruldu |
| fonksiyon eşleştirme | (function matching) | 87 | öğretmen ile öğrencinin **aynı** girdiyi görmesi ve uzun eğitim; damıtmanın etiket aktarımı olmadığının adı |
| kapasite boşluğu | (capacity gap) | 87 | öğretmen fazla güçlenince öğrencinin kötüleşmesi; boyut farkı değil, öğrenme kapasitesi farkı |
| budama | (pruning) | 87 | ağırlıkları, başları ya da katmanları tümüyle silmek; 19/27'deki **kuantizasyondan** ayrı bir küçültme ailesi |
| sadakat (damıtmada) | (fidelity) | 87 | öğrencinin öğretmenin tahminlerine uyma derecesi; 31'deki **sadakat (faithfulness)** ile aynı sözcük, nesne farklı, çakışma gövdede adlandırıldı |
| uç | (edge) | 88 | hesabın verinin üretildiği yerde yapılması; telefon örnek alındı, kısıt listesi bütün uç donanımları için aynı |
| kuantizasyona duyarlı eğitim | — | 88 | 27'de gloss'lanmıştı; 88'de üretimdeki 2 bitlik hâliyle geri çağrıldı |
| sinir ağı işlemcisi | (NPU) | 88 | cihazdaki matris hızlandırıcısı; yoğun öbekler ona, seyrek olanlar merkezi işlemciye |
| işlem yoğunluğu | (operational intensity) | 89 | ana bellekten okunan bayt başına yapılan işlem; 26'daki "bayt başına 229 işlem" bunun ölçüsüydü |
| çatı çizgisi | (roofline) | 89 | işlem yoğunluğu ↔ ulaşılabilir hız düzlemi; eğik parça bant genişliği, yatay parça işlem gücü |
| sırt noktası | (ridge point) | 89 | tepe hıza ulaşmak için gereken en küçük işlem yoğunluğu |
| alana özel mimari | (domain-specific architecture) | 89 | tek iş sınıfı için tasarlanan çip; genel amaçlı düzeneğin çıkarılmasıyla tanımlanır |
| donanım piyangosu | (hardware lottery) | 89 | bir fikrin üstün olduğu için değil, mevcut donanım ve yazılıma uyduğu için kazanması |
| vat | (watt) | 90 | güç birimi; "megavat-saat" 8'de gloss'suz geçmişti, birim zinciri 90'da kuruldu |
| veri merkezi çarpanı | (PUE, power usage effectiveness) | 90 | soğutma ve dağıtımın payı; modern merkezlerde 1,08–1,2 |
| karbon yoğunluğu | (carbon intensity) | 90 | kilovat-saat başına gram karbondioksit eşdeğeri; bölgeye ve saate göre kat kat değişir |
| bulunduğu yere göre / satın alınan enerjiye göre sayım | (location-based / market-based) | 90 | aynı elektriğin iki ayrı karbon muhasebesi |
| maliyet eşitliği | (cost parity) | 90 | çıkarım enerjisinin eğitim + ince ayar enerjisine ulaştığı çıkarım sayısı |

| vektör uzayı | (vector space) | 91 | toplama ve sayıyla çarpmanın tanımlı olduğu küme; 4'teki embedding uzayının biçimsel adı |
| doğrusal dönüşüm | (linear transformation) | 91 | 3'te "doğrusal" glosssuz geçmişti; iki işlemi koruyan eşleme |
| taban | (basis) | 91 | her vektörün tek biçimde toplamı olarak yazıldığı en küçük küme; matrisin sütunları taban görüntüleridir |
| tek-sıcak | (one-hot) | 91 | tek bileşeni 1, kalanı 0 olan vektör; embedding tablosundan satır okumanın biçimsel hâli |
| norm | — | 91 | bir vektörün uzunluğu. 7'deki **katman normalleştirmeyle karıştırılmaz**; ayrım 91'de açıkça yapıldı |
| kosinüs benzerliği | (cosine similarity) | 91 | 39'da glosssuz geçmişti; resmî kurulum 91'de. Birim kürede en büyük nokta çarpımla aynı sıralamayı verir |
| eşyönlülük / eşyönsüzlük | (isotropy / anisotropy) | 91 | yönlerin dengeli dağılıp dağılmaması; "izotropi" kullanılmaz |
| noktasal karşılıklı bilgi | (pointwise mutual information) | 91 | kelime-bağlam matrisinin hücre değeri; skip-gram'ın örtük ayrıştırdığı matris |
| doğrusal bağımsız | — | 92 | birbirinin katları ve toplamları olarak yazılamayan vektörler; rankın tanımı buna dayanır |
| özvektör / özdeğer | (eigenvector / eigenvalue) | 92 | yönü korunan vektör ve uzama katsayısı; yalnızca kare matriste |
| tekil değer | (singular value) | 92 | birim vektörlerin en çok ne kadar gerildiği; her matriste tanımlı, hep ≥ 0 |
| tekil değer ayrışımı | (singular value decomposition, SVD) | 92 | 76'da glosssuz geçmişti; resmî kurulum 92'de. Başlıkta kısaltma kalır (#202) |
| Frobenius normu | — | 92 | bir matrisin bütün girdilerinin karelerinin toplamının karekökü; tekil değerlerin kareleri toplamına eşittir |
| kovaryans matrisi | — | 92 | ortalanmış verinin simetrik matrisi; özvektörleri temel bileşenlerdir |
| olasılık dağılımı | — | 93 | 5'ten beri glosssuz kullanılıyordu; resmî kurulum 93'te (negatif olmayan, toplamı 1 olan atama) |
| beklenti | (expectation) | 93 | olasılıklarla ağırlıklandırılmış ortalama; 37/45/60/65'teki "beklenen" sözcüğünün tek tanımı |
| en büyük olabilirlik | (maximum likelihood) | 93 | 13'ün gövdesinde geçmişti; resmî kurulum 93'te. Kaybın kaynağı |
| yanlılık (tahmincide) | (bias) | 93 | tahmincinin ortalamada kaçırdığı pay. 3'teki **sapma** ve 45/73'teki **hakem yanlılığıyla** karıştırılmaz; çakışma 93'te adlandırıldı |
| mod | — | 93 | dağılımın en yüksek olasılıklı sonucu; tipik örnek değildir |
| entropi | (entropy) | 94 | şaşkınlığın beklentisi. 65'te "anlamsal entropi" içinde glosssuz geçmişti; resmî kurulum 94'te |
| çapraz entropi | (cross-entropy) | 94 | 84 ve 87'de glosssuz geçmişti; resmî kurulum 94'te. Entropi artı KL'ye eşittir |
| nat | — | 94 | doğal logaritmayla ölçülen bilgi birimi; 9'da "nat/token" olarak geçmişti |
| bayt başına bit | — | 94 | token'lamadan bağımsız karşılaştırma ölçüsü; sıkıştırma oranının başka yazılışı |
| eniyileyici | (optimizer) | 95 | 8 ve 19'da "optimizatör" denmişti; **yerleşik biçim "eniyileyici"dir** ve seri boyunca o kullanılır |
| gradyan | (gradient) | 95 | 2'de "gradyan inişi" olarak geçmişti; burada nesnenin kendisi kuruldu: kısmi türevlerin vektörü |
| yönlü türev | (directional derivative) | 95 | gradyan ile birim yönün nokta çarpımı; en dik iniş teoreminin dayanağı |
| Hessian | — | 95 | Türkçeleştirilmez ve **parantez içi gloss verilmez** (İngilizcesi aynı); ikinci türevlerin simetrik matrisi, özdeğerleri eğriliği verir |
| koşul sayısı | (condition number) | 95 | en büyük eğriliğin en küçüğe oranı; yakınsama hızını belirler |
| momentum | — | 95 | Türkçeleştirilmez; adımın bir öncekinin yönünü de taşıması. Polyak'ın ağır top yöntemi |
| ağırlık sönümü | (weight decay) | 95 | 8'de glosssuz geçmişti; resmî kurulum 95'te. Kayba yazılan L2 cezasıyla **eşdeğer değildir** (AdamW) |
| gradyan kırpma | (gradient clipping) | 95 | 8'de adı geçmişti; gerekçesi 95'te: eğrilik gradyanla birlikte büyüdüğü için tavan alçalıyor |
| yanlılık ↔ oynaklık | (bias ↔ variance) | 96 | 93'te tahmincideki yanlılık kurulmuştu; oynaklık ve üçlü ayrışım 96'da. 3'teki **sapma** ile karıştırılmaz |
| düzgün yakınsama | (uniform convergence) | 96 | sınırın ailedeki bütün modeller için aynı anda geçerli olması; klasik genelleme kuramının yöntemi |
| etkin model karmaşıklığı | (effective model complexity) | 96 | yordamın sıfır eğitim hatasıyla uydurabildiği en büyük örnek sayısı; çift inişin üç eksenini birleştirir |
| örtük düzenlileştirme | (implicit regularization) | 96 | kayba yazılmayan ama eniyileyicinin izlediği yoldan gelen tercih |
| Bayes hatası | — | 97 | dağılımı tam bilen bir kuralın hata oranı; ulaşılabilecek en iyi değer |
| torbalama | (bagging) | 97 | yerine koyarak çekilen örneklemlerde ayrı ağaçlar; oynaklığa saldırır |
| gradyan artırma | (gradient boosting) | 97 | ardışık ağaçlar, her biri kalan hataya; yanlılığa saldırır. Torbalamayla **karıştırılmaz**, ayrım 97'de yapıldı |
| çekirdek | (kernel) | 97 | nokta çarpımı başka bir uzaya gitmeden hesaplayan fonksiyon |
| k-ortalamalar | (k-means) | 97 | 43'te dizin aracı olarak glosssuz geçmişti; resmî kurulum 97'de |
| ablasyon | (ablation) | 98 | bir bileşeni çıkarıp aynı ölçümü tekrarlamak; kazancın kaynağını gösteren deney |
| ön baskı | (preprint) | 98 | hakem sürecinden geçmemiş sürüm; yayımlanmış sürümden başlığı ve kapsamı farklı olabilir |
| taban çizgisi | (baseline) | 16 | karşılaştırmanın ölçütü olan yerleşik yöntem; 16'da "cetvel arayışı", 97'de yöntem seçimi, 99'da tasarım kararı. Defter satırı Batch 24'te açıldı, kullanım 16'dan beri sabit |
| öngörü ↔ sonradan açıklama | (prediction ↔ postdiction) | 99 | çözümlemenin sonuçlardan önce mi sonra mı seçildiği; ikisi de meşru, kanıt gücü farklı |
| ön kayıt | (preregistration) | 99 | çözümleme planını sonuçlar bilinmeden bağımsız bir kayda yazmak |
| rastgele arama | (random search) | 99 | **aynı sözcük, başka nesne:** 63'te istem uzayında uyarlanır saldırı, 99'da hiperparametre uzayından bağımsız örnekleme. Çakışma 99'un gövdesinde adlandırıldı |
| sıfır hipotezi | (null hypothesis) | 101 | "aradaki gerçek fark sıfırdır"; sınanan cümle iddianın kendisi değil karşıtıdır |
| p değeri | (p-value) | 101 | sıfır hipotezi doğruyken gözlenen kadar büyük bir farkı görme olasılığı. İddianın doğru olma olasılığı **değildir** ve farkın büyüklüğünü söylemez |
| eşleştirilmiş karşılaştırma | (paired comparison) | 101 | iki sistemin aynı örnekler üzerinde soru başına farkının alınması; ortak gürültüyü düşürür |
| çoklu karşılaştırma düzeltmesi | (multiple comparison correction) | 101 | çok sayıda test yapılınca eşiğin daraltılması; en sade biçimi Bonferroni |
| yansız tahminci | (unbiased estimator) | 101 | ortalaması gerçek değere eşit olan tahminci; 93'teki **yanlılık (tahmincide)** satırının pratik karşılığı |
| bootstrap | — | 101 | Türkçeleştirilmez; veriden **yerine koyarak yeniden örnekleme**. 97'deki torbalamanın dayandığı işlemin aynısı, orada ağaçları çeşitlendirmek için, burada belirsizliği ölçmek için. 89'daki **tahmini önyükleme** ile karıştırılmaz — "önyükleme" bu anlamda **kullanılmaz** |
| bağlanmış embedding | (tied embedding) | 103 | giriş tablosunun çıktı izdüşümü olarak da kullanılması; 7'de "paylaşılan embedding tablosu" diye sayılmıştı |
| parametre defteri | — | 103 | her parçanın boyut çarpımıyla sayılması; gövdede parantezsiz |
| eniyileyici durumu | (optimizer state) | 106 | 89'da "eğitim durumu" içinde glosssuz geçmişti; fp32 ağırlık kopyası, momentum ve yayılım |
| aktivasyon belleği | (activation memory) | 106 | geri geçiş için saklanan ara değerler; katman başına s·b·h·(34 + 5as/h) bayt |
| aktivasyonları yeniden hesaplama | — | 106 | alan yazınının "activation checkpointing"i. 8'deki **kontrol noktasıyla aynı şey değildir**; ayrım 106'da açıkça yapıldı |
| model FLOP kullanım oranı | (model FLOPs utilization, MFU) | 106 | gözlenen iş hacminin teorik tepeye oranı; yeniden hesaplamanın fazladan işlemlerini saymaz |
| bellek merdiveni | — | 106 | SRAM ↔ HBM ↔ DRAM; hız ile kapasitenin ters yönde değişmesi. "Çekirdek" sözcüğü 97 ve 10'da başka nesneleri taşıdığı için 106'da GPU çekirdeklerinden hiç söz edilmedi, konu 108'e bırakıldı |
| tekrarlanabilirlik | (reproducibility) | 102 | 9'daki **yeniden üretme (replication)** ile aynı aileden, ama alan iki terimi ters yönlerde kullanıyor; 102 tartışmayı sözcükten kurtarıp üç dereceye ayırır (aynı kod / aynı veri / aynı sonuç) |
| hepsi-indirge | (all-reduce) | 107 | her düğüm vektörünü verir, hepsinin toplamını alır; bant açısından en iyi hâli bir indirge-dağıt artı bir hepsi-topladır ve adım başına 2Ψ taşır. 85'teki **hepsi-hepsiye** ile karıştırılmaz |
| indirge-dağıt | (reduce-scatter) | 107 | her düğümün toplamın yalnızca bir dilimini biriktirmesi |
| hepsi-topla | (all-gather) | 107 | dilimlerin bütün düğümlere yayılması |
| tensör paralelliği | (tensor parallelism) | 107 | alan yazınının adı; bu mimaride bölünen nesne **ağırlık matrisleridir**. 8'deki **model paralelliğinin** iki biçiminden biri |
| boru hattı paralelliği | (pipeline parallelism) | 107 | katman yığınının aşamalara bölünmesi. "Boru hattı" bileşik olarak kullanılır; seride tek başına "hat" 8'de veri temizliği, 41–50'de getirme için kullanılıyor |
| dizi paralelliği | (sequence parallelism) | 107 | tensör paralelliğinin bölemediği bölgelerde dizilimin dizi ekseni boyunca bölünmesi; ek bant genişliği harcamaz |
| kabarcık | (pipeline bubble) | 107 | boru hattının dolarken ve boşalırken kartların boş beklediği süre; oranı `(p − 1)/m`, açılmış hâliyle `(n/t − d)/(B/b)` |
| çekirdek | (kernel) | 108 | karta gönderilen ve çipin işlem birimleri üzerinde aynı anda koşan tek bir program. **Seride dördüncü anlam:** 10'da çekirdek örnekleme, 97'de çekirdek fonksiyonu, 26 ve 89'da "hesap çekirdeği" işlem birimi. 85'te "blok-seyrek çekirdekler" zaten bu anlamdaydı; 108 kullanımı resmîleştirdi ve çakışmayı gövdede adlandırdı (karar #235) |
| birleştirme | (fusion) | 108 | art arda gelen işlemleri tek bir çekirdeğe koymak; ara sonuç kart belleğine hiç inmez |
| bellek yerleşimi | (memory layout) | 108 | boyutların bellekteki sırası; aritmetiğe dokunmadan %52'ye varan hızlanma verebiliyor |
| bellek kullanım verimi | (memory usage efficiency) | 108 | en az taşınması gereken bayt ÷ taşınan bayt, çarpı ulaşılan ÷ tepe bant genişliği. 106'daki **kullanım oranının** bellek tarafındaki eşi; bellekle sınırlı çekirdekte geçerli cetvel budur |
| geride kalan | (straggler) | 109 | çalışmaya devam eden ama ötekilerden yavaş olan makine; her adım eşitlemeyle bittiği için bütün işi yavaşlatır |
| kayıp sıçraması | (loss spike) | 109 | tek bir koşunun kayıp eğrisinin sebepsiz yukarı fırlaması. 74 ve 78'deki **sıçrama** ölçekle birlikte gelen yetenek eğrisinin sıçramasıydı; ayrım 109'da açıkça yapıldı. Niteleyici "kayıp" düşürülmez |
| etkin eğitim süresi oranı | — | 109 | yineleme sayısı çarpı yineleme süresi, bölü toplam süre; `1 − √(2δ/M)` bunun kuramsal üst sınırı |
| dünya modeli | (world model) | 110 | **İki soy:** pekiştirmeli öğrenmede 37'deki geçiş fonksiyonunun öğrenilmiş kopyası — ayrı bir bileşen, doğrudan sınanır; dil modelinde ise örtük bir hipotez — ancak davranıştan çıkarsanır. Ayrım 110'un gövdesinde yapıldı |
| veri sızıntısı | (data leakage) | 102 | test kümesinin bilgisinin veri hazırlığı yoluyla eğitime karışması. 72'deki **kirlilikle** karıştırılmaz: orada nesne eğitim derlemi, burada hazırlık adımları |
| somutlaşmış yapay zekâ | (embodied AI) | 111 | kararlarını bir bedenin içinden, gerçek zamanda ve geri alınamayan eylemlerle veren sistemler |
| gövde (fiziksel) | — | 111 | **Aynı sözcük, iki nesne:** 81'de "donuk gövde" önceden eğitilmiş ağdı; 111'den itibaren gövde fiziksel bedendir. Çakışma 111'in gövdesinde adlandırıldı ve ağ anlamı için **"önceden eğitilmiş ağ"** kullanılır (karar #242) |
| görme-dil-eylem modeli | (vision-language-action model) | 111 | 81'deki görüntü-dil modelinin çıktı tarafına eylemi de ekleyen biçimi; gövdede parantezsiz |
| ayrıklaştırma | (discretization) | 111 | sürekli bir büyüklüğü sonlu kutulara oturtmak. 19/27'deki **kuantizasyonun** akrabası, nesnesi farklı: orada ağırlığın hassasiyeti, burada dünyanın kendisi. Ayrım 111'de yapıldı |
| uç işlevci | (end-effector) | 111 | kolun ucundaki tutucu; gövdede parantezsiz |
| eylem öbeği | (action chunk) | 111 | tek tek adım yerine birkaç adımlık hareket parçasının bir kerede üretilmesi |
| alan rastgeleleştirmesi | (domain randomization) | 111 | benzetimi gerçeğe benzetmek yerine o kadar çeşitlendirmek ki gerçek de o dağılımın içinde bir örnek olsun |
| gösterim (robotikte) | (demonstration) | 111 | **Aynı sözcük, iki nesne:** 23'te isteme konan çözülmüş bir örnek, 111'de bir insanın robotu uzaktan sürerek kaydettiği görev. Çakışma 111'de adlandırıldı |
| sürekli öğrenme | (continual learning) | 112 | eğitilmiş bir modelin yeni bilgiyi, eskisini kaybetmeden almaya devam etmesi |
| felaket unutması | (catastrophic forgetting) | 112 | 19'daki **unutmanın** uç hâli; yeni görev eğitilirken eski görevdeki başarının hızla ve giderek bozulması. 68'deki **unutturma** (kasıtlı) ve 56'daki **seçici unutma** (yetenek) ile ayrımı 112'de yapıldı |
| kararlılık–esneklik ikilemi | (stability-plasticity dilemma) | 112 | aynı parametrelerin hem yeni bilgiyi alması hem eskisini koruması gerekmesi |
| model düzenleme | (model editing) | 112 | tek bir olguyu tek bir küçük ağırlık güncellemesiyle değiştirmek; gövdede "cerrahi düzenleme" ile eşanlamlı |
| çağrışımsal bellek | (associative memory) | 112 | anahtar vektörünü ona eşlenmiş değer vektörüne götüren doğrusal eşleme; ileri beslemeli katmanın bu gözle okunuşu |
| devre dışı bırakan düzenleme | (disabling edit) | 112 | modeli tek başına kullanılamaz hâle getiren tek bir güncelleme; ağırlıktaki izi sıradan düzenlemelerin üç mertebe üstünde |
| dışbükey zarf | (convex hull) | 113 | malzeme keşfinde termodinamik kararlılık sınırı; gövdede ilk geçişten sonra "kararlılık sınırı" ile eşanlamlı |
| sınır model | (frontier model) | 70 | alanın en yetenekli modelleri. 114'ün başlığı bu yerleşik karşılıkla Türkçeleştirildi (karar #240); gövdelerde on sekiz geçişte zaten kullanılıyordu |

**Biçim kuralları:** Yüzdeler gövde metninde sözcükle yazılır ("yüzde 69"); tablo içinde `%` simgesi
serbesttir. Ondalık ayırıcı virgüldür ("0,31"). Makale numarasına atıf satır başındaysa nokta
kaçırılır (`1\.`) — aksi hâlde Markdown numarayı liste işareti sanıp yutar.

## Bağlayıcı olgu kararları (seri boyunca geçerli)

Yayımlanmış makalelerde verilmiş, gelecekteki makalelerin çelişemeyeceği olgu kararları:

1. **GPT-2 boyutları** OpenAI model kartı serisiyle verilir: 124 / 355 / 774 milyon ve **1,5 milyar**.
   Makalenin kendi tablosu 117/345/762/1542 der; model kartında **"1558" dizisi geçmez**.
2. **"Artık bağlantı sönen gradyanı çözer" YAZILAMAZ.** He ve ark. (CVPR 2016) bunu açıkça reddeder;
   çözülen şey **bozulma** (eğitilebilirlik) sorunudur.
3. **Öz-dikkat girdisinin doğrusal fonksiyonu değildir** — ağırlıklar softmax üzerinden girdiye bağlı.
   "Ağırlıklı ortalama" yalnızca ağırlıklar sabitken, değerlere göre doğrusallık demektir.
4. **Kaplan tahsisi** (5,76×10²³ FLOP): N = 1,3×10⁹ · C^0,73 → **800 milyar parametre**,
   D = C/(6N) → **~120 milyar token**, **0,15 token/parametre**. Kayıp L = 2,051 vs Chinchilla 1,937
   (fark 0,114 nat/token). Kaplan'ın ayrı veri fiti aynı bütçede ~216 milyar verir ve 6ND ile
   uyuşmaz (çarpan 1,8) — bu, "yasa değil, uydurulmuş eğri" tezinin kanıtı olarak metinde durur.
5. **Llama 3 = 15,6 trilyon token** (bütün seride aynı sayı; token/parametre 38,5).
6. Hakemsiz kaynaklar metinde işaretlenir: Kaplan 2020, Besiroglu 2024, Epoch AI, Llama 3 raporu,
   Ba ve ark. 2016, Keskar ve ark. 2019, Thinking Machines blogu, Kalai ve ark. 2025.
   Batch 13'te eklenenler (karar #141): Peng ve ark. 2023, Becker ve ark. 2025 (METR), Packer ve ark.
   2023 (MemGPT), Barres ve ark. 2025, Debenedetti ve ark. 2025 (CaMeL), Beurer-Kellner ve ark. 2025,
   Anthropic Claude Code belgelendirmesi.
   Batch 14'te eklenenler (karar #147): Feng ve ark. 2025, Barres ve ark. 2025, Becker ve ark. 2025, Mozannar
   ve ark. 2025 (Magentic-UI), Anthropic/OpenAI istem önbelleği belgeleri, OPPO AI Agent Team 2025, Luo ve
   ark. 2025, Backlund & Petersson 2025, Amodei ve ark. 2016, Clark & Amodei 2016, Krakovna ve ark. 2020,
   Manheim & Garrabrant 2018, Shah ve ark. 2022, Hubinger ve ark. 2019, Denison ve ark. 2024, Baker ve ark.
   2025, Askell ve ark. 2021, Leike ve ark. 2018, Touvron ve ark. 2023 (Llama 2).
7. **Snell ve ark.** künyesi ICLR 2025 sürümüne göredir ("…than Scaling Parameters for Reasoning");
   arXiv v1 başlığı farklıdır ("…than Scaling Model Parameters"). Yayın yeri ICLR olduğu için
   başlık da ICLR sürümündendir.
8. `logit` terimi **7. makalede** kurulur; 10. makale geri bağ verir.
9. Oran ve farklar her zaman tam değerlerden hesaplanır, sonra yuvarlanır.
10. Samuel'in "without being explicitly programmed" alıntısı kaynaklarda yok — seri boyunca **kullanma**.
11. **InstructGPT veri kümesi boyutları** çalışmanın Tablo 6'sına göredir: SFT eğitimi 11.295 etiketleyici
    + 1.430 müşteri = **12.725** istem; ödül modeli 6.623 + 26.584 = **33.207**; PPO **31.144**. Metinde
    yuvarlanabilir ("yaklaşık on iki bin") ama başka sayı kullanılmaz.
12. **InstructGPT hesap sayıları:** GPT-3 ön eğitimi 3.640 PF-gün, 175B SFT 4,9 PF-gün, 175B PPO-ptx 60 PF-gün.
    Türetilen oranlar: üçüncü aşama yüzde 1,6; SFT binde 1,3; toplam yüzde 1,8.
13. **Stiennon ve ark. künyesi NeurIPS 2020 sürümüne göredir:** *Learning to summarize **with** human feedback*
    (arXiv sürümünde "from" geçer). Karar #7'deki Snell emsalinin aynısı.
14. **LIMA sayıları:** 1.000 örnek (200 + 200 Stack Exchange, 200 wikiHow, 150 yazma forumu, 50 mevcut talimat
    kümesi, 200 elle yazılmış), yaklaşık 750.000 token, 65 milyar parametreli LLaMa, 15 epok, kontrol noktası
    5.–10. epoklar arasından elle seçildi. Karşılaştırma: GPT-4 yüzde 43, Bard yüzde 58, DaVinci003 yüzde 65.
15. **LLaMA-1 eğitim token'ları:** 7B/13B = 1,0 trilyon; 33B/65B = **1,4 trilyon**. Karar #5'teki Llama 3'ün
    15,6 trilyonuyla **karıştırılmaz**; ikisi farklı model ailesidir.
16. **Tekrar eşikleri (Muennighoff ve ark.):** 4 epoka kadar taze veriyle kayıp farkı ihmal edilebilir;
    R*_D ≈ 15, yani **16 epok**, tekrarlanan token'ın değerinin 1 − 1/*e*'sini (yaklaşık yüzde 63) yitirdiği
    noktadır; sonrasında getiri hızla sıfıra gider. "Dördüncüden sonra değersiz" **denmez**.
17. **C4 engel listesi oranları:** Afrikalı Amerikalı İngilizcesi yüzde 42, Hispanik hizalı İngilizce yüzde 32,
    Beyaz Amerikalı İngilizcesi yüzde 6,2, diğer İngilizce yüzde 7,2 çıkarıldı; nihai derlemde bu iki lehçenin
    payı yüzde 0,07 ve yüzde 0,09'dur.
18. **FineWeb-Edu:** 460.000 sayfa Llama 3'ün 70 milyar parametreli talimat sürümüyle 0–5 arası puanlandı,
    eşik 3; 15 trilyondan 1,3 trilyon token kaldı (yüzde 8,7). MMLU 33 → 37, ARC 46 → 57.
19. **Level bandı:** Faz 2 ve sonrası yeni makaleler `intermediate` taşır; yayımlanmış 1–10 `beginner` kalır
    (SOZLESME §1'in faz-göreli level kuralı). Karar Batch 2'de verildi.
20. **few-shot / zero-shot yazımı:** 5\. makalede kurulan "few-shot" biçimi bağlayıcıdır; Türkçeleştirilmiş
    "az atışlı" / "sıfır atışlı" biçimleri **kullanılmaz**.
21. **Gerstgrasser ve ark. (2024) künyesi COLM 2024 olarak verilir.** DBLP yalnızca CoRR sürümünü indeksler ve
    OpenReview'ın doğrulama duvarı aşılamadı; venue iki bağımsız ikincil kaynakla doğrulandı, birincil venue
    sayfası teyidi **alınamadı**. Değişirse yalnızca bu künye güncellenir; metindeki bulgu etkilenmez.
22. **Tokenizer ölçümleri (tiktoken ile yeniden üretilebilir).** İnsan Hakları Evrensel Bildirgesi 1. madde:
    İngilizce 33 token; Türkçe cl100k_base'de 60 (oran 1,818), o200k_base'de 46 (oran 1,394) — 4\. makalenin
    "1,8 kat / 1,4 kat" ifadesiyle tutarlıdır. Sözlük boyları: gpt2 50.257, cl100k_base 100.277, o200k_base
    200.019. Bölmeler: `arkadaşlarımla` → `ark|ada|ş|ları|ml|a` (beş "a" dört kutuya dağılır),
    `kitaplarımda` → `kit|ap|ları|md|a`, `3742` → `374|2`, `1000000` → `100|000|0`, `3,742` → `3|,|742`.
23. **Sayı tokenizasyonu ve aritmetik (Singh & Strouse 2024, hakemsiz).** cl100k_base sayıları soldan sağa
    üçerli öbekler; 1–3 basamaklı bütün diziler sözlüktedir. Ölçüm: GPT-3.5 yüzde 75,6 → 97,8; GPT-4
    yüzde 84,4 → 98,9 (7–9 basamaklı toplananlar, virgülle sağdan sola öbekleme). Kaynak hakemsiz olarak
    işaretlenir.
24. **Sözlük boyu ölçek yasası (Tao ve ark., NeurIPS 2024).** 33M–3B model, 500 milyar karaktere kadar veri;
    70 milyar parametreli bir model için öngörülen optimal sözlük en az 216 bin (fiilî 32 bin); aynı
    2,3×10²¹ FLOP bütçesinde sözlüğü 32 binden 43 bine çıkarmak ARC-Challenge'ı 29,1'den 32,0'a taşıdı.
25. **MMLU ve MMLU-Redux.** MMLU 57 konudur (Hendrycks ve ark., ICLR 2021). MMLU-Redux 5.700 elle yeniden
    etiketlenmiş sorudur; genel hata oranı tahmini yüzde 6,49, viroloji alt kümesinde yüzde 57
    (Gema ve ark., NAACL 2025).
26. **Değerlendirme kırılganlığı sayıları.** İstem biçimi duyarlılığı: 13 milyar parametreli bir modelde
    76 puana kadar aralık (Sclar ve ark., ICLR 2024). Protokol farkları sıralamayı sekiz basamağa kadar
    oynatır (Alzahrani ve ark., ACL 2024). Arena: bir sağlayıcı bir modeli ikinci sıraya koymadan önce
    27 özel sürüm denedi; iki büyük sağlayıcı verinin tahminî yüzde 19,2 ve 20,4'ünü, 83 açık ağırlıklı
    model toplamda yüzde 29,7'sini aldı; sınırlı ek veri ArenaHard'da göreli yüzde 112'ye varan kazanç
    sağlıyor (Singh ve ark., NeurIPS 2025 D&B). **Peer-reviewed sürüm sağlayıcıyı anonim bırakır; seri de
    bırakır** (arXiv sürümü isim verir).
27. **Halüsinasyon sayıları.** FActScore: çalışmanın 2023'te değerlendirdiği ChatGPT sürümü kişi
    biyografilerinde yüzde 58 (Min ve ark., EMNLP 2023). Kalibre model uydurmak zorundadır ve alt sınır
    tam bir kez geçen olguların oranına yaklaşır (Kalai & Vempala, STOC 2024) — bu sonuç yalnızca
    **keyfî** olgular için geçerlidir. Sınav teşviki argümanı Kalai ve ark. 2025'tendir ve **hakemsizdir**.
28. **Bilgi kapasitesi.** Allen-Zhu & Li (ICLR 2025): parametre başına **2 bit**, int8'de bile; 7 milyar
    parametre = 14 milyar bit ≈ 1,75 GB. Morris ve ark. (2025, **hakemsiz**): parametre başına yaklaşık
    **3,6 bit**, 500K–1,5B model. İki sayı farklı şey ölçer (çıkarılabilir olgu ↔ istenmeyen ezber),
    çelişki sayılmaz. Türetilen karşılaştırma: 70 milyar parametre = 17,5 GB; 15,6 trilyon token en az
    15,6 TB olduğundan oran **en az yaklaşık 891 kat**.
29. **Geri çağırmanın yönü.** Berglund ve ark. (ICLR 2024): GPT-4 ünlü kişilerin ebeveyn sorusunu
    yüzde 79, ters yönünü yüzde 33 doğrulukla cevaplıyor; etki model boyundan ve aileden bağımsız,
    veri çoğaltmayla geçmiyor, ama ilişki **bağlamda** verilirse model tersini çıkarabiliyor.
30. **Hakemsiz kaynak listesine Batch 3'te eklenenler:** Singh & Strouse 2024, Miller 2024 (Anthropic),
    Morris ve ark. 2025. Karar #6'daki liste bunlarla genişler.
31. **LoRA sayıları (Hu ve ark., ICLR 2022).** GPT-3 175B'de sorgu ve değer matrislerine rank 4:
    4,7 milyon eğitilebilir parametre (on bin kat azalma); eğitim belleği 1,2 TB → 350 GB; kontrol
    noktası 350 GB → 35 MB. WikiSQL 73,4 (tam ince ayar 73,8), MNLI-m 91,7 (89,5). Kendi görevlerinde
    rank 1 bile yeterli çıkmıştır. Başlangıç: bir matris rastgele, öbürü **sıfır**.
32. **İçsel boyut (Aghajanyan ve ark., ACL 2021).** d90 = tam performansın yüzde 90'ına ulaşan en küçük
    boyut. Seride kullanılan değerler SAID ölçümündendir: RoBERTa-Large MRPC **207**, QQP 774;
    BERT-Base MRPC 1.608. Model büyüdükçe içsel boyut küçülür.
33. **LoRA ↔ tam ince ayar (Biderman ve ark., TMLR 2024).** Llama-2-7B. Talimat ince ayarı: kod
    0,498 ↔ 0,497, matematik 0,634 ↔ 0,642. Sürekli ön eğitim: kod 0,224 ↔ 0,263, matematik
    0,202 ↔ 0,293. Tam ince ayarın ağırlık değişiminin rankı tipik LoRA'nın **10–100 katı**.
    Unutma ölçümü üç genel değerlendirme kümesinde yapılmıştır.
34. **QLoRA (Dettmers ve ark., NeurIPS 2023).** 65 milyar parametre için >780 GB → <48 GB; çift
    kuantizasyon parametre başına yaklaşık 0,37 bit (65B'de ~3 GB); 80 milyon–65 milyar arası
    binden fazla model. **Yüzde 99,3 iddiası** bir değerlendirme kümesine aittir ve seri onu 16\.
    makalenin disipliniyle okur; tek başına "ChatGPT kadar iyi" olarak aktarılmaz.
35. **Bilgi enjeksiyonu (Ovadia ve ark., EMNLP 2024).** 910 çoktan seçmeli soru. Mistral 7B: taban
    0,481, ince ayar 0,504, on yeniden yazımla 0,588, bağlama konunca 0,875. Llama 2 7B: taban
    0,353, ince ayar **0,219**. İnce ayar düşük ranklı değil **tam** yapılmıştır ve sürekli ön eğitim
    biçimindedir — bu ayrım metinde korunur.
36. **Adaptör ve önek ayarı.** Houlsby ve ark. (ICML 2019): görev başına yüzde 3,6 parametre, tam
    ince ayarın 0,4 puan yakını, çıkarımda ek gecikme. Li & Liang (ACL 2021): parametrelerin binde
    biri, bedeli bağlam penceresinden çıkar.
37. **DeepSeek-V3 (teknik rapor, hakemsiz).** 671 milyar toplam / 37 milyar aktif parametre;
    14,8 trilyon token; 2,788 milyon H800 kart-saati; 2 dolar/saat varsayımıyla 5,576 milyon dolar;
    2.048 kartlık küme. 6ND ile ≈ 3,3×10²⁴ işlem ≈ **38.000 PF-gün**. Tutar yalnızca nihai koşuyu
    kapsar; önceki araştırma ve başarısız koşular dâhil değildir.
38. **GPT-3'ün PF-gün çapraz doğrulaması.** 8\. makalenin 3,14×10²³ işlemi ÷ 8,64×10¹⁹ = **3.634
    PF-gün**; 11\. makalenin bildirdiği 3.640 ile binde ikiden küçük farkla örtüşür. Bu türetme seri
    boyunca aynı biçimde kullanılır.
39. **Açıklık çerçevesi (Liesenfeld & Dingemanse, FAccT 2024).** 14 boyut; 40 metin üreteci ve
    6 görsel üreteci. Llama "en iyi ihtimalle açık ağırlıklı"dır; BloomZ neredeyse bütün boyutlarda
    açıktır. Terimler: açık ağırlıklı ↔ açık kaynak ↔ açıklık cilası.
40. **OSI Açık Kaynak Yapay Zekâ Tanımı 1.0.** 28 Ekim 2024. Dört özgürlük (kullan, incele, değiştir,
    paylaş); eğitim verisinin kendisi değil, "yetkin bir kişinin eşdeğer bir sistem kurabileceği
    kadar" **veri bilgisi** istenir.
41. **Llama 3.1 Community License.** 700 milyon aylık etkin kullanıcı eşiği; "Built with Llama"
    ibaresi; türev model adının "Llama" ile başlaması. OSI onaylı bir lisans değildir.
42. **Şeffaflık endeksi (FMTI).** 100 gösterge. 2023 Ekim: 10 sağlayıcı, ortalama 37/100.
    2024: 14 sağlayıcı, ortalama 58/100. İki turun sağlayıcı kümesi aynı değildir; 21 puanlık fark
    eğilim olarak okunur. Hakemli sürüm TMLR 2025.
43. **Hizalamanın ince ayarla bozulması (Qi ve ark., ICLR 2024).** On kadar özel hazırlanmış örnekle,
    0,20 doların altında bir maliyetle; zararsız talimat kümeleriyle yapılan sıradan ince ayar bile
    güvenlik davranışını ölçülebilir biçimde zayıflatıyor. Deney bir arayüz hizmeti üzerinden
    yapılmıştır — sorun açık ağırlığa özgü değildir.
44. **Uzunluk sayıları.** RULER (COLM 2024): 17 model, 13 görev, 4 aile; eşik, küçük bir referans
    modelin 4.000 token'daki 85,6 puanı. GPT-4 128K → 64K, Command-R 128K → 32K, Yi-34B 200K → 32K,
    Mixtral 32K → 32K. Lost in the Middle (TACL 2024): 20 belge, GPT-3.5-Turbo başta 75,8, ortada
    53,8, sonda 63,2; belge yokken 56,1; yalnızca doğru belge verilince 88,3. Levy ve ark. (ACL 2024):
    250 → 3.000 token'da GPT-4 1,00 → ~0,68; sonraki token başarısıyla akıl yürütme arasında
    negatif ilişki.
45. **İstem duyarlılığı ek sayıları (Sclar ve ark., ICLR 2024).** 53 görev; ortanca aralık 13B modelde
    7,5 puan, GPT-3.5'te 6,4 puan (uç değer 56 puan). Model karşılaştırmasını yalnızca biçimle ters
    çevirme olasılığı yüzde 14–47. Karar #26'daki 76 puan bu dağılımın **uç** değeridir.
46. **Halk kurallarının ölçümü.** Rol: Zheng ve ark. (Findings of EMNLP 2024) — 162 rol, 6 ilişki türü,
    8 alan, MMLU'dan 2.410 soru, 4 aile / 9 model; kontrole göre anlamlı iyileşme yok, otomatik rol
    seçimi rastgele düzeyinde. Kibarlık: Yin ve ark. (SICon 2024 çalıştayı, EMNLP 2024 ile birlikte) —
    8 düzey, 3 dil; İngilizce GPT-3.5 60,02 → 51,93, Llama2-70B 55,11 → 28,44, GPT-4 en iyi 4\.
    düzeyde 79,09; Japonca GPT-3.5 en iyi 2\. düzeyde 51,98, en kaba düzeyde 44,80.
47. **Ara adımların kazancı (Sprague ve ark., ICLR 2025).** 110 makalede 1.218 karşılaştırma ve
    20 küme × 14 model kendi ölçümü. Sembolik 14,2, matematik 12,3, mantık 6,9, **diğer bütün görevler
    0,7** puan.
48. **Otomatik istem araması (Zhou ve ark., ICLR 2023).** 24 görevin 24'ünde insan talimatını yakaladı
    ya da geçti. Keşfedilen sıfır örnekli ara adım cümlesi MultiArith'te 82,0 (78,7) ve GSM8K'de
    43,0 (40,7). Karşılaştırılan "adım adım düşünelim" cümlesi Kojima ve ark. (NeurIPS 2022)
    kaynaklıdır. Sayılar 2022 dönemi modellerine aittir; metinde bu kayıt düşülür.
49. **Hakemsiz kaynak listesine Batch 4'te eklenen:** DeepSeek-V3 teknik raporu. Karar #6'daki liste
    bununla genişler.
50. **Faz 3 kategori kararı (Batch 4'te verildi).** 21 ve 22 `reasoning-and-memory` kategorisindedir.
    Gerekçe: `models-and-training` modelin nasıl kurulduğunu kapsar; 21'den itibaren eksen sabit bir
    modelin **kullanımına** kayıyor ve bağlam penceresi modelin çalışma belleğidir. Aynı kategori
    Faz 3'ün bağlam/istem/bellek ekseni (23–26) ve Faz 4 (akıl yürütme) için de öngörülür.
    27–28 (kuantizasyon, servis) mühendislik başlıklarıdır ve kategorileri kendi run'larında
    kararlaştırılacaktır.
51. **Başlık düzeltmesi (Batch 4'te verildi).** Yayımlanmamış 21, 22 ve 24 başlıklarındaki "Prompt"
    sözcüğü, terim defterinde 10\. makaleden beri yerleşik olan "istem" karşılığıyla değiştirildi
    (SOZLESME §8: yayımlanmamış başlıklar taslaktır). Yeni başlıklar: "Bağlam Penceresi: İstemin
    Anatomisi", "İstem Mühendisliği: Kanıta Dayalı Bir Bakış", "Sistem İstemleri, Roller ve Sohbet
    Formatı". 15\. makalenin "Tokenizer" başlığı değişmez; o terim Türkçeleştirilmiyor.

52. **Başlık düzeltmesi (Batch 5'te verildi).** Yayımlanmamış 24 ve 26 başlıklarındaki İngilizce sözcükler,
    terim defterinde yerleşik karşılıklarıyla değiştirildi: "Sohbet Formatı" → "Sohbet Biçimi" (12\. makalede
    kurulan terim), "Inference Ekonomisi" → "Çıkarım Ekonomisi" (1\. makalede kurulan terim). Karar #51'in
    aynı gerekçesi. **Değiştirilmeyen:** roadmap'teki faz başlıkları (ör. "Modelle Konuşmak: Inference,
    Prompt ve Bağlam"). Faz başlıkları katmanı İngilizce alan terimlerini tutarlı biçimde kullanıyor
    (Reasoning, Retrieval, Test-Time Compute); yalnızca birini çevirmek o katmanı bozardı. Bu katmanın
    tümden Türkçeleştirilip Türkçeleştirilmeyeceği ayrı bir karardır ve **verilmemiştir**.
53. **Örnekle öğrenmede etiketlerin rolü (Min ve ark., EMNLP 2022).** Rastgele etiketlerle düşüş mutlak
    0–5 puan; sınıflandırmada ortalama 2,6, çoktan seçmelide 1,7 puan; on iki model. Hiçbiri doğru
    olmayan etiketlerle bile kazancın yüzde 92 / 100 / 97'si korunuyor. Örnekle öğrenme hedefiyle
    eğitilmiş modelde düşüş 0,1–0,9 puan. Bileşen ablasyonları: girdi dağılımı bozulunca 3–16 puan,
    etiket kümesi bozulunca (doğrudan yöntemde) 5–16 puan, biçim bozulunca örneksiz düzeye ya da altına.
    Biçim korunduğunda korunan kazanç payı: yüzde 95 (ilgisiz girdi + doğru etiket kümesi) ve yüzde 75–87
    (gerçek girdi + rastgele İngilizce kelime). k=4'te kazanç büyük, k≥8'de eğri düzleşiyor.
54. **Görev tanıma ↔ görev öğrenme (Pan ve ark., Findings of ACL 2023).** 16 sınıflandırma kümesi;
    GPT-3 (350M/1,3B/6,7B/175B), LLaMA (7–65B), OPT (350M–66B); 8/16/32 gösterim. Rastgele etiketli
    düzen (yalnızca görev tanıma) ölçekle de örnek sayısıyla da yükselmiyor; soyut simgeli düzen
    (yalnızca görev öğrenme) ikisiyle de dikleşiyor ve en büyük modelde 32 gösterimle rastgele etiketli
    düzenin üstüne çıkıyor. Karar #53'ün bulgusu bu **rejim ayrımıyla** birlikte okunur.
55. **Many-shot sayıları (Agarwal ve ark., NeurIPS 2024).** 997 örnekli istem ≈ 85.000 token. Tek örnekli
    isteme göre göreli iyileşme: Bemba yüzde 15,3, Kürtçe yüzde 4,5. İnce ayar ↔ isteme koyma
    karşılaştırması (chrF2++): Bemba taban 28,3, ince ayar 47,7, örnekle öğrenme 47,2; Kürtçe 39,5 / 46,5 /
    44,0. Ters çevrilmiş etiketlerde başarı ve modelin kendi güveni önce düşüp sonra varsayılan düzeye
    yaklaşıyor. Eşlik görevinde 8.192 gösterime kadar yükseliş; sıfırdan eğitilmiş, GPT-2'nin orta boy
    sürümü büyüklüğündeki ve yirmi kat fazla örnekle eğitilmiş modelin üstüne çıkıyor. Çıkarım maliyeti
    örnek sayısıyla doğrusal.
56. **Örnekle öğrenme ↔ gradyan inişi tartışması kapanmamıştır.** von Oswald ve ark. (ICML 2023, PMLR 202)
    tek bir doğrusal öz-dikkat katmanı ile tek bir gradyan inişi adımının özdeşliğini kuran açık bir ağırlık
    kurgusu verir; kanıt küçük transformer'lar ve regresyon görevleriyle sınırlıdır. Shen, Mishra & Khashabi
    (ICML 2024, PMLR 235, konum bildirisi) bu kurgunun gerçek modellere taşınmadığını savunur: deneyler
    modeli açıkça örnekle öğrenme hedefiyle eğitiyor, elle kurulan ağırlıklar gerçek modellerinkine
    benzemiyor, ve iki süreç örnek sırasına aynı biçimde duyarlı değil. Seri bu eşdeğerliği **açık hipotez**
    olarak sunar. Xie ve ark. (ICLR 2022) Bayesçi çerçevesi de kuramsal bir ön eğitim düzeneğine dayanır ve
    aynı kayıtla verilir.
57. **Llama 3 sohbet şablonu (Meta resmî belgelendirmesi).** Dört özel token: begin_of_text;
    start_header_id ile end_header_id arasında rol adı; eot_id ile mesaj sonu (ayrıca end_of_text).
    Dizinin sonu asistan başlığıyla açık bırakılır ve üretim oradan devam eder. Şablon model ailesine
    özgüdür; başka aileye uygulanamaz.
58. **Talimat hiyerarşisi sayıları (Wallace ve ark. 2024, OpenAI, hakemsiz).** GPT-3.5 üzerinde ince ayar.
    Dayanıklılık, eğitim öncesi → sonrası: sistem istemini sızdırma 32,8 → 95,9; kullanıcının çelişen
    talimatı 62,2 → 92,6; talimat kaçırma 59,2 → 79,2; yeni talimat enjeksiyonu 89,6 → 93,7; tarayıcı
    üzerinden dolaylı enjeksiyon 77,5 → 85,0. Eğitimde gösterilmeyen türler: araç üzerinden dolaylı
    enjeksiyon 77,6 → 87,0; parola sızdırma 53,8 → 84,2 ve 51,8 → 73,7; jailbreak 83,8 → 89,2 ve
    37,4 → 71,2. Bedel (uyma oranı): saldırıya benzeyen zararsız istemler 83,1 → 60,4; sistem istemi
    hakkında zararsız sorular 85,2 → 75,0; çelişmeyen kullanıcı talimatları 78,9 → 77,7. Seri bu tabloyu
    "hiyerarşi eğitimle kurulur, mimariyle değil" tezinin kanıtı olarak kullanır.
59. **Çok turlu kararsızlık (Laban ve ark., ICLR 2026; konferansın öne çıkan bildirilerinden).**
    Sekiz sağlayıcıdan 15 model, 6 üretim görevi, 200.000'den fazla benzetilmiş sohbet. Ortalama başarı:
    tam talimat tek mesajda 73,4; aynı parçalar tek mesajda birleştirilmiş 69,8 (tamın yüzde 95,1'i);
    parçalar turlara yayılmış 44,8 (yüzde 39 düşüş). Ayrıştırma: en iyi hâlde ortalama yüzde 16 gerileme,
    denemeler arası savrulmada yüzde 112 artış. Talimatı sohbet içinde yeniden özetlemek ve her turda
    gereksinimleri yeniden saymak iyileştiriyor ama tek seferlik düzeye getirmiyor.
60. **Pencereyi esnetme sayıları.** Chen ve ark. 2023 (**hakemsiz**): doğrudan uzatma dikkat skorlarını
    felaket düzeyinde büyütür; sıkıştırmanın kuramsal üst sınırı uzatmanınkinden en az yaklaşık 600 kat
    küçüktür; bin adımın altında ek eğitimle 32.768 token. Peng ve ark. (YaRN, ICLR 2024): Llama 2 7B/13B,
    400 adımda 64.000, ek 200 adımda 128.000 token; ön eğitim verisinin binde birinden azı; 7B modelin
    32.000'e çıkarılması 128 A100 kart-saati (ilk pozisyon enterpolasyonuyla yalnızca 16.000'e çıkarmak
    640 kart-saati). Perplexity (7B, 128k sürümü): 8.192'de 3,56; 32.768'de 2,70; 131.072'de 2,37.
    **Kısa görev bedeli** (LLaMA 7B, 2k → 32k, 400 adım): esnetilmemiş MMLU 35,7 / HellaSwag 77,8;
    kaba enterpolasyon 25,9 / 70,2; YaRN 30,0 / 77,2. Llama 2 MMLU: 7B 43,8 → 42,5 (×16) → 41,7 (×32);
    13B 55,8 → 52,8 → 51,9.
61. **FlashAttention ve dikkat çukuru sayıları.** Dao ve ark. (NeurIPS 2022): BERT-large'da yüzde 15,
    GPT-2'de 3 kat, uzun erimli kıyaslama takımında 2,4 kat hızlanma; GPT-2'de perplexity 0,7 iyileşme,
    uzun belge sınıflandırmasında 6,4 puan; 16.000 token'da yüzde 61,4 ve 64.000 token'da yüzde 63,1 ile
    ilk kez rastgeleden iyi sonuç. İşlem sayısı **azalmaz**, bellek trafiği azalır. Xiao ve ark.
    (ICLR 2024): Llama-2-13B, PG19'un ilk kitabı — 0+1024 düzeninde perplexity 5158,07; 4+1020'de 5,40;
    ilk dört token yerine dört satır sonu konunca 5,60. Llama-2-7B: 0+4096 → 3359,95; 1+4095 → 11,88;
    2+4094 → 10,51; 4+4092 → 9,59; 8+4088 → 9,54. Dört milyon token'lık akış, yeniden hesaplayan
    yönteme göre 22,2 kata varan hızlanma. Çalışma **pencereyi büyütmediğini** açıkça yazar.
62. **Çıkarım ekonomisi sayıları.** Pope ve ark. (MLSys 2023): ön dolum ↔ adım adım üretim ayrımı;
    token başına yaklaşık 2N işlem; TPU v4 çipi 275 TFLOP/s bf16 ve 1.200 GB/s — oran ≈ 229 işlem/bayt,
    yani yığın büyüklüğü 229'a ulaşmadan üretim bellekle sınırlıdır (bu oranı seri türetir);
    500 milyardan büyük, çok başlı dikkatli bir modelde 512 yığın ve 2.048 bağlamla önbellek 3 TB —
    parametrelerin üç katı; büyük yığınlarla 2.048 token'lık istem işlenirken yüzde 76 kullanım oranı.
    Kwon ve ark. (SOSP 2023): OPT 13B'de token başına 800 KB, 2.048 token için 1,6 GB; 40 GB'lık kartta
    ağırlıklar yüzde 65 (26 GB); mevcut sistemlerde önbellek alanının yalnızca yüzde 20,4–38,2'si token
    durumu tutuyor, sayfalı düzende yüzde 96,3; iş hacmi 2–4 kat. Ainslie ve ark. (EMNLP 2023):
    paylaşımlı düzene çevirme, orijinal ön eğitim hesabının yüzde 5'iyle.
63. **Llama 3 70B mimari değerleri ve türetilen önbellek boyutları (Llama 3 raporu, hakemsiz).**
    80 katman, genişlik 8.192, 64 sorgu başı, 8 anahtar-değer başı; baş boyutu 8.192 ÷ 64 = 128.
    Türetilenler (16 bitlik sayılarla): token başına 2 × 80 × 8 × 128 × 2 = 327.680 bayt (320 KiB);
    128.000 token ≈ 42 GB. Paylaşım olmasaydı (64 anahtar-değer başı) token başına 2,5 MiB ve
    128.000 token ≈ 336 GB. Ağırlıklar 70 × 10⁹ × 2 = 140 GB. Bu türetme seri boyunca aynı biçimde
    kullanılır.
64. **Hakemsiz kaynak listesine Batch 5'te eklenenler:** Wallace ve ark. 2024 (talimat hiyerarşisi),
    Chen ve ark. 2023 (pozisyon enterpolasyonu). Meta'nın Llama 3 sohbet şablonu belgelendirmesi
    akademik bir çalışma değil, üreticinin resmî ürün belgelendirmesidir ve öyle işaretlenir.
    Karar #6'daki liste bunlarla genişler.

65. **Faz 3'ün kalan kategori kararı (Batch 6'da verildi).** 27, 28 ve 30 `reasoning-and-memory`;
    29 `agents-and-retrieval` kategorisindedir. Gerekçe: kontrollü sözlükte sistem mühendisliği için
    bir kalem yok ve karar #50'nin ölçütü geçerli — `models-and-training` modelin **nasıl kurulduğunu**
    kapsar, oysa 27 ve 28 kurulmuş bir modeli bellek bütçesi içinde çalıştırır; `reasoning-and-memory`
    başlığındaki bellek ekseni 26 → 27 → 28 zincirinin ta kendisidir. 30 da tek bir çağrının kod çözme
    katmanına aittir. 29 ise konusu gereği getirmedir ve `agents-and-retrieval` ekseni onunla açılır;
    41–50 aynı kategoride devam eder. Sonuç, Batch 6'nın okuma listesinde kategorinin iki ayrı öbek
    hâlinde görünmesidir (27–28, sonra 29, sonra 30); UI bu durumu destekler ve
    `src/components/reader/reading-list-groups.test.ts` tam olarak bunu sınar.
66. **Başlık düzeltmesi (Batch 6'da verildi).** Yayımlanmamış 28'in başlığındaki İngilizce sözcükler
    terim defterine uyarlandı: "Hız ve Maliyet: Serving, Batching, Spekülatif Decoding" →
    **"Hız ve Maliyet: Servis, Yığınlama ve Spekülatif Üretim"**. Karşılıklar: "servis" 26\. makalede
    gövdede zaten kullanılıyordu, "yığın" 8\. makalede kurulmuştu, "üretim" 26'daki adım adım üretimden
    gelir. Kararlar #51 ve #52'nin aynı gerekçesi. 29 ve 30'un başlıkları değiştirilmedi ("embedding"
    ve "JSON" Türkçeleştirilmeyen kalemlerdir). **Faz başlıkları katmanına yine dokunulmadı**
    (karar #52'deki açık soru sürüyor); 31–33'ün başlıklarındaki "Reasoning", "Chain-of-Thought" ve
    "Test-Time Compute" sözcükleri Batch 7 hazırlığında ele alınacaktır.
67. **Aykırı değer sayıları (Dettmers ve ark., NeurIPS 2022).** Aykırı değerler aktivasyonlardadır,
    ağırlıklarda değil. Ötekilerden **yirmi kata** kadar büyük; küçük modellerde katmanların yaklaşık
    dörtte birinde, 6,7 milyar parametrede faz geçişiyle bütün katmanlarda. 6,7 milyar ölçeğinde bir
    dizide **150.000** aykırı değer yalnızca **altı** boyutta toplanır. Sıfırlanınca dikkatin en yüksek
    olasılıklı seçime verdiği pay yüzde 20'den fazla düşer, doğrulama perplexity'si yüzde 600–1.000
    bozulur; aynı sayıda rastgele boyutta bu düşüşler en fazla yüzde 0,3 ve yüzde 0,1'dir. Karma
    hassasiyetli ayrıştırma BLOOM-176B'nin ayak izini **1,96 kat** küçültür.
68. **GPTQ sayıları (Frantar ve ark., ICLR 2023).** WikiText2 perplexity — OPT-66B: 16 bit 9,34;
    4 bit en yakına **110**; 4 bit GPTQ 9,55; 3 bit en yakına 6,1×10³; 3 bit GPTQ 14,16. OPT-175B:
    8,34 / 10,54 / 8,37 / 7,3×10³ / 8,68. Kalibrasyon: C4'ten 128 tane 2.048 token'lık parça.
    Süre: OPT-175B 4,2 saat, BLOOM-176B 3,8 saat (tek A100 80GB). 3 bitlik OPT-175B ≈ 63 GB
    (gömme ve çıkış katmanları 16 bitte) + 2.048 token için ≈ 9 GB önbellek → tek 80GB karta sığar;
    16 bit 5 kart, LLM.int8() 3 kart ister. Token başına gecikme A100'de 230 → 71 ms (3,24×),
    A6000'de 589 → 130 ms (4,53×). Sınır: çarpımların kendisi hızlanmaz.
69. **Bit genişliği ölçek yasası (Dettmers & Zettlemoyer, ICML 2023).** 35.000'den fazla deney;
    19M–176B; 3–16 bit; BLOOM, BLOOMZ, OPT, NeoX/Pythia, GPT-2. Sabit toplam model bitinde 16'dan
    4 bite inmek başarıyı istikrarlı biçimde artırır; **3 bitte ilişki tersine döner**. Blok boyu
    64–128 önerilir; 16 bitlik sabit 64 ağırlıkta bir yazılırsa parametre başına **0,25 bit** ek
    maliyet gelir. 175 milyarlık bir model 16 bitte 352 GB'a kadar bellek ister.
70. **Kapasitenin bit genişliğine duyarlılığı (Allen-Zhu & Li, ICLR 2025).** Karar #28'in devamı:
    int8'de parametre başına 2 bit korunur, **int4'te 0,7 bite düşer** (iki kattan fazla kayıp).
    Ölçüm GPTQ ile yapılmıştır. Bu sonuç, "4 bit optimaldir" cümlesinin hangi cetvelde geçerli
    olduğunu sınırlar: çoktan seçmeli değerlendirmede evet, olgu saklama kapasitesinde hayır.
71. **Cevap değişimi (Dutta ve ark., NeurIPS 2024).** Altı kuantizasyon düzeni, yedi değerlendirme
    kümesi. Doğruluk farkı 0–2 puan; cevap değişimi **yüzde 13,6'ya** kadar. Yalnızca 8 bit ağırlık +
    16 bit aktivasyon düzeni hem doğruluğu hem davranışı korur. Yanlıştan yanlışa geçişler de
    sayılsaydı oranlar HellaSwag'de yüzde 19, ARC'de 41, MMLU'da 43 daha artardı. Serbest metin
    değerlendirmesinde cevap değişimi yüksek modeller belirgin biçimde geriliyor.
72. **Aktivasyon ve önbellek kuantizasyonu.** SmoothQuant (Xiao ve ark., ICML 2023): ağırlıklar kolay,
    aktivasyonlar zordur; zorluk matematiksel olarak eşdeğer bir kanal ölçeklemesiyle ağırlıklara
    taşınır. 1,56 kata varan hızlanma, 2 kat bellek tasarrufu, 530 milyarlık modelin tek sekiz kartlı
    düğümde servisi. KIVI (Liu ve ark., ICML 2024): önbellek 2 bit; **anahtarlar kanal bazında,
    değerler token bazında**; tepe bellek 2,6 kat azalır, yığın 4 kata kadar büyür, iş hacmi
    2,35–3,47 kat artar.
73. **Hassasiyet ölçek yasası (Kumar ve ark., ICLR 2025).** 465 ön eğitim koşusu; 30–220 milyon
    parametre, 1,5–26 milyar token; 1,7 milyara kadar doğrulama. Bulgu: eğitim sonrası kuantizasyonun
    bozulması **veriyle birlikte artar**, dolayısıyla yeterince yüksek token/parametre oranında ek
    ön eğitim verisi çıkarım zamanında zararlı olabilir. Ağırlık hassasiyetinin kazancı parametre
    başına **6–7 bit** civarında doyar. Llama-3-8B'nin token/parametre oranı ≈ 2.000; Chinchilla ≈ 20.
74. **Servis sistemleri sayıları.** Orca (Yu ve ark., OSDI 2022): yineleme düzeyinde çizelgeleme ve
    seçici yığınlama; GPT-3 175B'de aynı gecikme düzeyinde **36,9 kat** iş hacmi (FasterTransformer'a
    karşı); 341 milyara kadar ölçek. Dikkat işlemi yığınlanmaz çünkü **parametresi yoktur**.
    Sarathi-Serve (Agrawal ve ark., OSDI 2024): parçalı ön dolum; Mistral-7B tek A100'de 2,6 kat,
    Yi-34B iki A100'de 3,7 kata kadar, Falcon-180B boru hattı paralelliğiyle 5,6 kata kadar servis
    kapasitesi (vLLM'e karşı). DistServe (Zhong ve ark., OSDI 2024): ayrıştırma; 7,4 kat daha çok
    istek ya da 12,6 kat daha sıkı kısıt, isteklerin yüzde 90'ından fazlası kısıt içinde.
75. **Spekülatif üretim sayıları (Leviathan ve ark., ICML 2023).** Hedef T5-XXL (11 milyar).
    EnDe, sıcaklık 1, γ=7: T5-small (77M) α=0,62 → 2,6×; T5-base (250M) α=0,68 → 2,4×;
    T5-large (800M) α=0,71 → 1,4×. Açgözlü seçimde T5-small α=0,75 → 3,4×. Bigram taslakla EnDe'de
    α=0,20 ve yine 1,25× hızlanma. Beklenen token sayısı (1 − α^(γ+1)) ÷ (1 − α); α=0,62 ve γ=7 için
    **2,57**. Çıktı dağılımı değişmez. Bağımsız bir uygulama Chinchilla 70B'de 2–2,5× bildirdi.
    Sınır: gecikme, işlem sayısı artırılarak iyileştirilir; boşta hesap yoksa fayda erir.
76. **Önek ağacı (Zheng ve ark., NeurIPS 2024).** Bütün isteklerin önbellekleri bir radix ağacında
    LRU önbellek olarak tutulur; en uzun ortak önek otomatik yeniden kullanılır. Önek paylaşımının
    yoğun olduğu iş yüklerinde **6,4 kata** varan iş hacmi. Aynı çalışma, dilbilgisi durumlarını
    sıkıştırarak tek devamlı zincirleri tek adımda geçmeyi de sağlar (30\. makalede kullanıldı).
77. **İkili kodlayıcının gerekçesi ve getirme sayıları.** Sentence-BERT (Reimers & Gurevych,
    EMNLP-IJCNLP 2019): 10.000 cümlede en benzer çifti bulmak 49.995.000 çıkarım ≈ **65 saat**;
    ikili kodlayıcıyla ≈ **5 saniye**. DPR (Karpukhin ve ark., EMNLP 2020): iki bağımsız BERT-base,
    d = 768; Wikipedia 100 kelimelik ayrık parçalara bölünür → **21.015.324** pasaj. İlk 20'de bulma
    oranı (tek küme eğitimi) — NQ: BM25 59,1 / DPR 78,4 / birlikte 76,6; TREC: 70,9 / 79,8 / 85,2;
    SQuAD: 68,8 / **63,2** / 71,5. Yığın içi olumsuz örnek: B soruluk yığında her soruya B−1 yanlış
    belge, toplam B² çift; en iyi düzen buna bir de sözcük eşleşmesinden gelen zor örnek ekler.
    Kurulum: gömme hesabı 8 kartta ≈ 8,8 saat, dizin kurulumu ≈ 8,5 saat; ters dizin ≈ 30 dakika.
    Sorgu: bellekteki dizin saniyede 995 soru, sözcük tabanlı dizin işlemci başına 23,7 soru.
    **Seri türetir:** 21.015.324 × 768 × 4 bayt ≈ **65 gigabayt**.
78. **Getirme değerlendirmesi.** BEIR (Thakur ve ark., NeurIPS 2021 D&B): 18 küme, 10 sistem, alan
    dışı; BM25 sağlam taban, ortalamada en iyi sonuç yeniden sıralayıcılar ve geç etkileşimli
    modellerde ama yüksek maliyetle, ucuz tek vektörlü modeller alan dışında geriliyor.
    MTEB (Muennighoff ve ark., EACL 2023): 8 görev türü, 58 küme, 112 dil, 33 model;
    **hiçbir yöntem bütün görevlerde önde değil.**
79. **Tek vektörün sınırı (Weller ve ark., ICLR 2026).** Boyut d için, hiçbir sorgunun
    döndüremeyeceği ilk-k belge kombinasyonları zorunlu olarak vardır. Serbest embedding
    eniyilemesiyle bulunan kritik belge sayıları: 500 bin (d=512), 1,7 milyon (768), 4 milyon (1024),
    107 milyon (3072), 250 milyon (4096). LIMIT: 46 belge, C(46,2) = 1.035 kombinasyon, 1.000 sorgu,
    50.000 belgelik yığın. LIMIT-small ilk 2'de bulma oranı — BM25 97,8; geç etkileşimli çok vektörlü
    83,5; en iyi tek vektörlü 54,3; öbür tek vektörlüler 19,0–38,4. Eş anlamlı sürümde sırasıyla
    10,6 / 25,6 / 12,8 / 8,5–15,1; BM25 yüzde 89'dan fazla düşer. Tam sürümde modeller ilk 100'de bile
    yüzde 20'ye ulaşamıyor. Alan içi eğitim yardımcı olmuyor (ilk 10'da bulma oranı ≈ 0 → 2,8);
    46 belgeyi pencereye koyan uzun bağlamlı bir yeniden sıralayıcı 1.000 sorgunun tamamını çözüyor.
80. **İç içe temsil (Kusupati ve ark., NeurIPS 2022).** ImageNet-1K sınıflandırmada aynı doğruluk
    **14 kata kadar** küçük temsille; aynı kümede büyük ölçekli getirmede 14 kata varan hızlanma.
81. **Kısıtlı üretimin dağılımı bozması (Park ve ark., NeurIPS 2024).** "1 ile biten ikili dizi üret"
    isteminde model kısıtsız yaklaşık yüzde 90 başarılı; beş sıfırdan oluşan diziyi ve 1 ile başlayan
    beş uzunluklu dizileri kabul eden dilbilgisi dayatılınca oran **yüzde 30'a** düşüyor. İlk token'da
    P(0) ≈ 0,45 ve P(1) ≈ 0,30; maske ikisini de geçerli saydığı için model sol dala kabaca yarı
    yarıya giriyor, oysa o daldaki tek dizinin gerçek olasılığı on milyarda iki mertebesinde.
    Dilbilgisi 1 ile başlayan **on altı** diziyi kabul eder ve bunların **sekizi** 1 ile biter.
82. **Token hizası ve kısıt maliyeti (Beurer-Kellner ve ark., ICML 2024).** JSON'a çevrilmiş GSM8K,
    Mistral-7B: kısıtsız 0,415; hizalamayı gözetmeyen iki yaygın araçla 0,345 ve 0,375; token hizalı
    DOMINO 0,418. İleriye bakış ablasyonu (aynı model): k=0 → 0,308, k=1 → 0,100, k=∞ → 0,418.
    Şemalı JSON üretiminde hizalı yöntem, spekülatif üretim sayesinde kısıtsız üretimden
    **1,77 kat** hızlı.
83. **Biçim kısıtının maliyeti (Tam ve ark., EMNLP 2024 Industry Track).** GSM8K doğruluğu —
    claude-3-haiku: metin 86,51 / JSON 86,99 / **şemalı JSON 23,44**; gpt-3.5-turbo 75,99 / 74,70 /
    49,25; LLaMA-3-8B 75,13 / 64,67 / 48,90; gemini-1.5-flash 89,33 / 89,66 / 89,21. Mekanizma:
    harf birleştirme görevinde GPT-3.5 Turbo'nun JSON kipiyle verdiği cevapların **tamamı** "cevap"
    alanını "gerekçe" alanından önce koymuş, yani ara adım üretilmeden karar verilmiş. Sınıflandırma
    görevlerinde aynı kısıt bazı modellerde doğruluğu **yükseltiyor**. Düşüşün sebebi ayrıştırma hatası
    değil: bir modelde ayrıştırma hata oranı binde 1,5 iken başarı farkı yüzde 38. Önce serbest metin,
    sonra biçime çevirme düzeni serbest metnin doğruluğunu koruyor.
84. **Batch 6 hakemsiz kaynak eklemedi.** Kullanılan on dokuz kaynağın tamamı hakemli konferans
    bildirisidir (NeurIPS, ICLR, ICML, MLSys, OSDI, EMNLP, EACL, NeurIPS Datasets and Benchmarks).
    Karar #6'daki liste genişlemedi. Batch 6'nın seriye özgü türetmeleri üç tanedir ve karar #38'in
    yöntemiyle aynıdır: 27'deki sekiz ağırlıklı dört bit örneği (pedagojik kurgu, olgu iddiası değil),
    28'deki 312 katlık ön dolum ↔ üretim asimetrisi (26'nın 2N işlem muhasebesinden) ve 29'daki
    65 gigabaytlık depolama hesabı (DPR'nin pasaj sayısı ve boyutundan).

85. **Faz 4 kategori kararı (Batch 7'de verildi).** 31, 32, 33 ve 34 `reasoning-and-memory`
    kategorisindedir. Karar #50'nin Faz 4 için verdiği öngörü doğrulandı; ölçüt aynı: kategori
    modelin nasıl kurulduğunu değil, kurulmuş bir modelin nasıl kullanıldığını ve neyi
    hatırlayıp neyi hesapladığını izliyor. 34 bir eğitim makalesi olmasına rağmen aynı
    kategoride bırakıldı, çünkü konusu genel bir eğitim aşaması değil akıl yürütme davranışının
    kendisidir.
86. **Başlık düzeltmesi (Batch 7'de verildi).** Yayımlanmamış 31–34'ün başlıklarındaki İngilizce
    sözcükler terim defterine uyarlandı: "Akıl Yürütme Nedir? LLM'lerde Reasoning Tartışması" →
    **"Akıl Yürütme Nedir? Tanım, Ölçüm ve Tartışma"**; "Zincirleme Düşünce: Chain-of-Thought" →
    **"Düşünce Zinciri: Ara Adımların Gücü ve Sınırı"**; "Test-Time Compute: Düşünme Süresi Satın
    Almak" → **"Çıkarım Anında Hesap: Düşünme Süresi Satın Almak"**; "Reasoning Modelleri:
    Doğrulanabilir Ödülle Eğitim" → **"Akıl Yürüten Modeller: Doğrulanabilir Ödülle Eğitim"**.
    31'de HANDOFF'un işaret ettiği ikileme sorunu — "akıl yürütme" faz adında zaten geçiyor —
    başlıkta terimi ikinci kez kullanmayarak çözüldü. 33'ün karşılığı vaat defterindeki
    "çıkarım anında hesap harcama ekseni" ifadesinden alındı. Kararlar #51, #52 ve #66'nın aynı
    gerekçesi. **Faz başlıkları katmanına yine dokunulmadı** (karar #52'deki açık soru sürüyor).
87. **GSM-Symbolic sayıları (Mirzadeh ve ark., ICLR 2025).** 100 şablon × 50 örnek = 5.000 örnek,
    yani 100 soruluk 50 ayrı küme; sekiz örnekli ara adımlı istem ve açgözlü seçim; 2–27 milyar
    arası yirmiden fazla açık model ile dört kapalı model. Gemma2-9b-it: 87,0 → 79,1 (±3,0);
    yalnız isim 88,6 (±2,0), yalnız sayı 83,1 (±2,2). Phi-3-medium: 89,0 → 82,5 (±2,9); isim
    91,8 (±1,7), sayı 89,0 (±2,3). En iyi–en kötü aralığı Gemma2-9B'de yüzde 12'den fazla,
    Phi-3.5-mini'de yaklaşık yüzde 15. **25 modelin 21'inde** özgün küme puanı dağılımın sağında.
    Zorluk ekseni (Gemma2-9b-it): M1 84,4 (±2,4) · Symb 79,1 (±3,0) · P1 68,1 (±4,8) ·
    P2 41,8 (±6,0). İlgisiz cümle (NoOp) düşüşü: Phi-3-mini −65,7; GPT-4o −32,0; o1-mini −29,1;
    o1-preview −17,5. Aynı sorunun sekiz sürümü gösterim olarak konsa bile düşüş kapanmıyor
    (Phi-3-medium: 87,3 / 82,5 / 29,4 / 30,2 / 22,6). Akıl yürütmeye eğitilmiş iki modelde
    GSM8K → GSM-Symbolic kaybı −2,2 ve −0,6; o1-mini P2'de 89,1.
88. **Sadakat sayıları (Turpin ve ark., NeurIPS 2023).** 13 BIG-Bench Hard görevi; GPT-3.5 ve
    Claude 1.0. Sıfır örnekli ara adımlı düzende "önerilen cevap" yanlılığıyla düşüş **yüzde
    36,3'e** varıyor; "cevap hep A" düzeninde GPT-3.5 −18,7, Claude 1.0 −4,7. Güven aralıkları
    ±2,1 ile ±2,8 arasında. Elle incelenen **104** sadakatsiz açıklamanın yüzde **73**'ü
    yanlılıkla uyumlu cevabı destekleyen bir gerekçe kuruyor; yüzde **15**'inde gözle görülür
    hiçbir hata yok. Aynı düzenek sosyal önyargı kümesinde de kuruluyor.
89. **İçerik etkisi (Lampinen ve ark., PNAS Nexus 2024).** 985 katılımcı (625 + 360); üç görev:
    doğal dil çıkarımı, tasım geçerliliği, Wason kart seçimi (koşul başına 72 soru). Hem
    insanlar hem modeller tasımlarda anlamlı içerik etkisi gösteriyor (z ≥ 2,25, P ≤ 0,01).
    İnsanlarda en uzun düşünen yüzde 15 (80 saniyeden fazla) yalnızca gerçekçi kuralda rastlantı
    düzeyinin üstüne çıkıyor. Seri bu bulguyu "biçimsel değil, o hâlde akıl yürütmüyor"
    çıkarımını engellemek için kullanır.
90. **Düşünce zincirinin kurucu ölçümü (Wei ve ark., NeurIPS 2022).** Sekiz elle yazılmış örnek,
    açgözlü seçim, ince ayar yok. GSM8K standart → ara adımlı: PaLM 8B 4,9 → 4,1; 62B 9,6 → 29,9;
    540B 17,9 → 56,9; LaMDA 420M 2,6 → 0,4; 137B 6,5 → 14,3; GPT-3 175B 15,6 → 46,9.
    MAWPS/PaLM 540B: SingleOp 94,1 → 94,1; MultiArith 42,2 → 94,7. Üç ablasyon (yalnızca denklem,
    denklem uzunluğunda nokta üretimi, cevaptan sonra gerekçe) tabanla aynı düzeyde kalıyor.
    Hata çözümlemesi: 50 doğru cevapta ikisi dışında bütün zincirler geçerli; 50 yanlış cevapta
    yüzde 46 küçük hata (yüzde 8 hesap makinesi, 16 sembol eşleme, 22 tek adım eksik), yüzde 54
    anlam hatası. Dış hesaplayıcı bağlanınca LaMDA 137B 14,3 → 17,3.
91. **Ara adımların biçimsel gücü (Li ve ark., ICLR 2024).** Sabit derinlikli ve sabit bit
    hassasiyetli bir kod çözücü, ara adım üretmeden AC0 ile sınırlıdır; T adımlık bir zincirle
    ve embedding boyutunun log n ile büyümesine izin verilirse, T boyutundaki devrelerle
    çözülebilen **her** problemi çözebilir. Beş elemanlı permütasyon bileşkesinde ara adımsız
    başarı yaklaşık yüzde 20 (beş seçenekli rastgele düzey). "İpucu" kontrolü tabandan iyi, ama
    ara adım üretiminin belirgin biçimde gerisinde — kazancın kaynağı fazladan etiket değil,
    üretimin kendisi.
92. **Yerel yapı deneyi (Prystawski ve ark., NeurIPS 2023).** 100 değişkenli, 100 kenarlı Bayes
    ağları; seçilen 10 ağın her birinden 1.000.000 örnek; GPT-2 mimarisinin küçük bir sürümü
    (512 boyut, 10 katman, 8 baş), 921,6 milyon token. Ara adımlar **yalnızca** yerel yapılı
    eğitim koşulunda kazandırıyor; tam gözlenen ve yanlış yerel koşullarda kazanç yok. İlgisiz
    ara değişken üreten kontrol kestiriminde kazanç kayboluyor.
93. **Geçersiz gösterim ablasyonu (Wang ve ark., ACL 2023).** text-davinci-002. GSM8K: standart
    15,4; ara adımlı 48,5; geçersiz ara adımlar 39,5; tutarlılık bozulunca 23,1; ilgi bozulunca
    **11,0** (ara adımsız düzenin altı). Bamboogle: 20,6 / 45,2 / 39,4 / 23,9. Zincir kalitesini
    ölçen içsel ölçütlerde korunan pay yüzde 90'ın üstünde.
94. **Ara adım kazancının kaynağı (Sprague ve ark., ICLR 2025 — karar #47'nin devamı).** MMLU'daki
    toplam kazancın **yüzde 95'e varan** kısmı, soruda ya da modelin cevabında eşittir işareti
    geçen sorulardan geliyor; matematik dışında kazancı önceden söyleyen hiçbir özellik yok.
    Planlama ile yürütme ayrıştırıldığında kazanç yürütme aşamasında; aynı planı bir dış çözücüye
    vermek ara adımlarla çözmeyi geçiyor.
95. **Çıkarım anında hesap sayıları (Snell ve ark. ICLR 2025; Wu ve ark. ICLR 2025; Schaeffer ve
    ark. ICML 2025).** Snell: MATH, PaLM 2-S*; ön eğitim 6ND, çıkarım 4ND (2N'nin doğrulayıcı
    payıyla iki katı); FLOP eşitleme çarpanı M + (3/2)(D_ön/D_çık)(M−1); ölçülen üç senaryo
    R = D_çık/D_ön = 0,08 · 0,40 · 11; karşılaştırma yaklaşık 14 kat büyük modelle; hesap-optimal
    tahsis en iyi-N'e göre **dört kat az** hesapla aynı doğruluk (256 yerine 64 örnek); kolay
    sorular tamamen sıralı düzeltmeyle, zor sorular karışımla en iyi sonucu veriyor. Wu: Pythia
    410M–12B; en iyi model boyu bütçeyle değişiyor ve log10(C) = 1,19·log10(N) + 2,03; Llemma-7B,
    Llemma-34B'nin doğruluğuna kabaca **iki kat az** toplam işlemle ulaşıyor; çoğunluk oyu ve
    ağırlıklı oylama sonsuz örnekte modelin (ve doğrulayıcının) dağılımıyla belirlenen bir limite
    yakınsıyor. Schaeffer: soru başına başarısızlık **üstel** düşer; toplu güç yasası, tek deneme
    başarı olasılıklarının ağır sol kuyruğundan doğar.
96. **Doğrulanabilir ödül sayıları (Zelikman ve ark. NeurIPS 2022; DeepSeek-R1 Nature 2025;
    Yue ve ark. NeurIPS 2025).** STaR (GPT-J, 6 milyar): CQA 20,9 / 36,6 / 60,0 / 68,8 / 72,5
    (otuz kat büyük modelin doğrudan cevap için ince ayarlanmış hâli 73,0); GSM8K 3,0 / 3,1 /
    5,8 / 10,1 / 10,7; toplama görevinde on altı yinelemede 89,5, taban 76,3. R1: GRPO; kural
    tabanlı ödül = doğruluk + biçim, eşit ağırlık; akıl yürütme görevlerinde sinir ağı tabanlı
    ödül modeli **bilinçli olarak kullanılmıyor**; denetimli ince ayar atlanarak eğitilen
    R1-Zero'da AIME 2024 ortalama ilk deneme başarısı yüzde **15,6 → 77,9**, öz-tutarlılıkla
    **86,7**; ilk pekiştirmeli öğrenme aşamasında öğrenme oranı 3×10⁻⁶, KL katsayısı 0,001, soru
    başına 16 cevap, azami 32.768 token. Aşama tablosu (R1-Zero → Dev1 → R1): IF-Eval
    46,6 → 71,7 → 83,3; AlpacaEval 2.0 24,7 → 50,1 → 87,6; GPQA Diamond 75,8 → 66,1 → 71,5;
    SimpleQA 30,3 → 17,8 → 30,1. Yue: pass@1 26,1 → 42,5 yükselirken pass@256 düşüyor; GSM8K'nin
    ortalama başarısı yüzde 5'in altındaki çözülebilir sorularında temel modelin 25 sorusunun
    24'ünde en az bir geçerli zincir var (RL modelinde 25'in 23'ü); sıcaklık yükseltilip entropi
    eşitlense de temel model geçilemiyor; damıtma temel modelin eğrisini aşıyor.
97. **Batch 7 hakemsiz kaynak eklemedi.** Kullanılan on dört çalışmanın tamamı hakemlidir:
    ICLR (Mirzadeh, Li, Snell, Wu, Sprague), NeurIPS (Dziri, Turpin, Prystawski, Wei, Zelikman,
    Yue), ACL (Wang), ICML (Schaeffer), PNAS Nexus (Lampinen) ve Nature (DeepSeek-R1). Karar
    #6'daki liste genişlemedi. Batch 7'nin seriye özgü türetmeleri dörttür ve karar #38'in
    yöntemiyle aynıdır: 33'teki kapsama hesapları (0,9 üzeri 10 yaklaşık 0,349; 0,999 üzeri 100
    ile kapsama 0,095; 0,999 üzeri 1000 ile 0,632), 33'teki 7 milyar parametreli modelin 1.000
    düşünme token'ı için 1,4×10¹³ işlem hesabı ve bunun GPT-3'ün ön eğitimiyle karşılaştırması
    (yaklaşık 700 milyon soru), 33'teki 258 ve 16 katlık FLOP eşitleme çarpanları (M = 14 ile
    R = 0,08 ve R = 11 için) ve 34'teki GRPO avantaj örneği (ödüller 1,0 · 1,0 · 0,5 · 0,0,
    ortalama 0,625, sapma yaklaşık 0,41, avantajlar 0,90 · 0,90 · −0,30 · −1,51).

98. **Faz 4'ün kalan kategori kararı (Batch 8'de verildi).** 35, 36, 37 ve 38 `reasoning-and-memory`
    kategorisindedir. 37 biçimsel bir eğitim makalesi olmasına rağmen aynı kategoride bırakıldı:
    kararlar #50 ve #85'in ölçütü geçerli, ve bu makale genel bir eğitim aşamasını değil 34 ile
    38'in kullandığı çerçeveyi kuruyor; okuma listesinde yalnız başına üçüncü bir öbek açmak
    kategoriye değil biçime hizmet ederdi. Faz 4 böylece tek kategoriyle kapanıyor; 39 ve 40'ın
    kategorisi kendi run'ında kararlaştırılacak.
99. **Başlık düzeltmesi (Batch 8'de verildi).** Yayımlanmamış iki başlıktaki İngilizce sözcükler
    terim defterine uyarlandı: "Arama ve Planlama: Self-Consistency ve Ağaçlar" →
    **"Arama ve Planlama: Öz-Tutarlılık ve Ağaçlar"**; "Pekiştirmeli Öğrenmenin Temelleri: MDP,
    Politika, Ödül" → **"Pekiştirmeli Öğrenmenin Temelleri: Markov Karar Süreci, Politika ve
    Ödül"**. Kararlar #51, #52, #66 ve #86'nın aynı gerekçesi. "MDP" kısaltması, HANDOFF'un
    bıraktığı serbestliğe rağmen açıldı: "Markov karar süreci" Türkçede yerleşik bir karşılıktır
    ve başlığın kalan iki terimi (politika, ödül) zaten Türkçedir. 35 ve 38'in başlıkları
    değiştirilmedi. **Faz başlıkları katmanına yine dokunulmadı** (karar #52'deki açık soru sürüyor).
    Ayrıca Batch 7'den kalan bir eksik kapatıldı: yol haritasındaki 31–34 satırlarına `[yayında]`
    işareti eklendi.
100. **Doğrulayıcı sayıları (Cobbe ve ark. 2021, hakemsiz).** GSM8K 8,5 bin soru (7,5 bin eğitim /
    1 bin test), 2–8 adım. Hat: üretici 2 epok ince ayar → soru başına 100 çözüm → nihai cevaba
    göre etiket → doğrulayıcı 1 epok. Tam eğitim kümesinde 6 milyar parametreli doğrulama, 175
    milyar parametreli ince ayarı geçiyor; çalışma bunu **otuz kat model boyu** artışına denk
    sayıyor. Ara adımsız doğrudan cevap için ince ayar: yüzde 20,6 → 5,2. Aday sayısı **400**'e
    kadar iyileşiyor, sonra düşüyor (doğrulayıcıyı kandıran düşmanca çözümler). 100 adayda en iyi
    3–5, 3.200 adayda ilk 30 oy vermeli. Token düzeyi doğrulayıcı çözüm düzeyini geçiyor; büyük
    üretici + küçük doğrulayıcı düzeni tersinden iyi. **Seri türetimi:** en iyi-N seçiminin
    ıraksaması ln N − (N−1)/N (Gao ve ark., ICML 2023) → N = 4'te 0,64; 100'de 3,62; 1.000'de
    5,91 nat.
101. **Öz-doğrulama ve öz-düzeltme sayıları.** Stechly ve ark. (ICLR 2025), GPT-4, alan başına 100
    örnek — tek geçiş / kendi kendini eleştiren döngü / sağlam doğrulayıcı (ikili geri bildirim) /
    yalnızca yeniden sorma (k=25): 24 oyunu 5 / 3 / 36 / 42; grafik boyama 16 / 2 / 38 / 44;
    blok dünyası 40 / 55 / 60 / 72; örtük blok dünyası 4 / 0 / 10 / 14. Doğrulayıcı olarak modelin
    doğruluğu, yanlış kabul ve yanlış ret oranları: 87,0 / 10,4 / 20,7 · 72,4 / 6,5 / 95,8 ·
    71,8 / 18,6 / 15,5 · 79,6 / 0,5 / 97,1. Huang ve ark. (ICLR 2024): cevap anahtarıyla GPT-3.5
    75,9 → 84,3 ve 75,8 → 89,7; anahtarsız iki turda GPT-3.5 75,9 → 74,7, 75,8 → 41,8, 26,0 → 25,0;
    GPT-4 95,5 → 89,0, 82,0 → 80,0, 49,0 → 43,0; Llama-2-70B 62,0 → 36,5 ve 64,0 → 36,5. Cevap
    değişimi (ilkokul matematiği, GPT-3.5): değişmeyen %74,7 · doğru→yanlış %8,8 · yanlış→doğru
    %7,6 · yanlış→yanlış %8,9. Madaan ve ark. (NeurIPS 2023): yedi görevde ortalama yaklaşık 20
    puan; diyalog cevabında 25,4 → 74,6; matematikte 64,1 → 64,1, 74,8 → 75,0, 92,9 → 93,1; bir
    modelin geri bildirimlerinin yüzde 94'ü "her şey iyi görünüyor"; dışarıdan yanlışlık bilgisi
    verilince matematikte 5 puanın üzerinde kazanç. Kamoi ve ark. (TACL 2024) dört koşulu: istemle
    üretilen geri bildirimle genel görevlerde başarılı öz-düzeltme gösteren çalışma yok; güvenilir
    dış geri bildirim varsa çalışıyor; büyük ölçekli ince ayar mümkün kılıyor; ayrıştırılabilir
    cevaplı görevler istisnai olarak elverişli.
102. **Öz-tutarlılık sayıları (Wang ve ark., ICLR 2023).** Soru başına 40 zincir, 10 koşu.
    PaLM-540B: ilkokul matematiği 56,5 → 74,4; çoktan seçmeli cebir 35,8 → 48,3; SVAMP 79,0 → 86,6;
    StrategyQA 75,3 → 81,6; ARC-Challenge 85,2 → 88,7. UL2-20B ilkokul matematiği 4,1 → 7,3;
    LaMDA-137B MultiArith 51,8 → 75,7. Işın araması karşılaştırması (UL2-20B, AQuA; 1/5/10/20/40):
    ışın aramasının en iyi ışını 23,6 → 19,3 → 16,1 → 15,0 → 10,2; örneklemeli oylama
    19,7 → 24,9 → 25,3 → 26,7 → 26,9. İstem permütasyonu topluluğu (LaMDA-137B, ilkokul matematiği)
    17,1 → 19,2 iken öz-tutarlılık 27,7. Çalışmanın bildirdiği önceki en iyi sonuç 55'tir ve 175
    milyar parametreli ince ayarlı modele ayrıca eğitilmiş bir doğrulayıcı eklenerek elde
    edilmiştir (karar #100'ün düzeneği). Kazanç 5–10 yolda büyük ölçüde doyuyor; yöntem yalnızca
    sabit cevap kümesi olan sorulara uygulanabiliyor. **Seri türetimi:** tek denemede başarı 0,4
    ve yanlışlar dağılıyorsa, beş zincirde doğru cevabın en az iki kez gelme olasılığı
    1 − 0,6⁵ − 5 × 0,4 × 0,6⁴ ≈ 0,663.
103. **Ağaç araması ve planlama sayıları.** Yao ve ark. (NeurIPS 2023), GPT-4, 24 oyununun zor 100
    örneği: doğrudan cevap %7,3 · ara adımlı %4,0 · yüz zincirin oyu %9,0 · yüz zincirin en iyisi
    %49 · ağaç genişlik 1 %45 · genişlik 5 %74. Maliyet: ağaç 5.500 üretilen token, yüz bağımsız
    zincir 6.700. Ara adımlı örneklerin yaklaşık yüzde 60'ı ilk adımdan sonra kaybediyor. Ablasyon:
    güçlü üretim + zayıf değerlendirme %64, zayıf üretim + güçlü değerlendirme %31 — darboğaz
    üretim tarafında. Silver ve ark. (Nature 2016): 495 maçın 494'ü (%99,8), Avrupa şampiyonuna
    5–0; Deep Blue'nun Kasparov maçında incelediğinden binlerce kat az konum değerlendirildi.
    Valmeekam ve ark. (NeurIPS 2023 D&B), Blocksworld, GPT-4: plan üretimi 206/600 (%34,3), plan
    doğrulama 352/600 (%58,6), yeniden planlama 289/600 (%48,1), yürütme sonrası durum 191/600
    (%31,8).
104. **Pekiştirmeli öğrenme künyeleri ve DQN sayıları.** Bellman'ın 1957 tarihli çalışması
    *Journal of Mathematics and Mechanics* 6, s. 679–684'tedir; dergi sonradan *Indiana University
    Mathematics Journal* adını almıştır ve iki kaynakta sayı numarası farklı verildiği için seri
    sayı numarası yazmaz. Williams 1992 *Machine Learning* 8, s. 229–256. Sutton, McAllester,
    Singh & Mansour NIPS 1999. TRPO ICML 2015, GAE ICLR 2016, PPO 2017 (**hakemsiz**). Mnih ve ark.
    (Nature 2015): 49 Atari oyunu, tek algoritma/mimari/hiperparametre; oyunların yarısından
    fazlasında (**29 oyun**) profesyonel insan test oyuncusunun puanının yüzde 75'inden fazlası;
    iskonto 0,99. **Seri türetimi:** 37'deki iki dallı karar örneği (doğrudan cevap 0,5; ara adım
    sonrası 0,6; γ = 1'de 0,60 > 0,50, γ = 0,8'de 0,48 < 0,50) ve 0-0-1 ödül dizisinin
    γ = 1 / 0,9 / 0,5 için getirileri (1 / 0,81 / 0,25).
105. **Süreç denetimi sayıları.** Uesato ve ark. (2022, **hakemsiz**): nihai cevap hatasında iki
    denetim biçimi benzer (ödül modelsiz 23,5 ↔ 22,3; ödül modelli 16,6 ↔ 14,8); iz hatasında
    ayrışıyor (nihai cevaba göre pekiştirmeli öğrenmede en iyi %12,4, süreç temelli en iyi %3,8;
    ödül modeline karşı eğitimde 12,4 → 5,5). En iyi düzen iz hatasını 14,0 → 3,4, nihai cevap
    hatasını 16,8 → 12,7 yapıyor. Sonuç etiketleriyle eğitilen ödül modelinin tahminleri adım
    etiketleriyle %85, kendi etiketleriyle %77 uyuşuyor. Lightman ve ark. (ICLR 2024): PRM800K =
    12 bin soruya 75 bin çözüm üzerinde 800 bin adım etiketi; yalnızca ilk hatalı adıma kadar
    etiketleme; 500 soruluk MATH alt kümesinde en iyi-1860 ile süreç denetimli %78,2, sonuç
    denetimli %72,4, çoğunluk oyu %69,6; fark aday sayısıyla açılıyor; aktif öğrenme ≈ 2,6 kat veri
    verimliliği; çözüm puanı adım olasılıklarının çarpımıdır. Wang ve ark. (ACL 2024): adım etiketi
    tamamlama ile otomatik üretiliyor (katı ve yumuşak ölçüm); Mistral-7B adım adım eğitimle
    ilkokul matematiğinde 77,9 → 84,1, zor matematik kümesinde 28,6 → 33,0; doğrulamayla 89,1 ve
    43,5; sıralamada adımların en düşük puanı kullanılıyor. Setlur ve ark. (ICLR 2025): adım ödülü
    ilerlemeyi — adım düzeyi avantajı — ölçmeli ve farklı bir tamamlayıcı politikayla
    hesaplanmalı; çıkarım anında aramada sonuç denetimine göre %8'den fazla doğruluk ve 1,5–5 kat
    hesap verimliliği, çevrimiçi eğitimde 5–6 kat örnek verimliliği ve %6'dan fazla doğruluk;
    önceki otomatik süreç doğrulayıcıları yoğun ödül olarak yalnızca %1–2 kazandırıyordu.
    Zheng ve ark. (ACL 2025): 3.400 örnek; **nihai cevabı doğru** çözümler içinde süreç hatası
    oranı GSM8K %3,5 · MATH %18,8 · OlympiadBench %32,2 · Omni-MATH %51,8; F1 ortalamaları
    Math-Shepherd-PRM-7B 31,5 · PRM800K ile eğitilen 56,5 · GPT-4o 61,9 · QwQ-32B-Preview 71,5 ·
    o1-mini 87,9.
106. **Batch 8'in hakemsiz kaynakları.** Batch 8, karar #6'daki listeye üç kalem ekledi: Cobbe ve
    ark. 2021 (doğrulayıcıların kurucu ölçümü), Uesato ve ark. 2022 (sonuç ↔ süreç denetiminin
    kurucu karşılaştırması) ve Schulman ve ark. 2017 (PPO). Üçü de metinde açıkça "hakemli
    değildir" kaydıyla verilir; üçünün de yerine konabilecek hakemli bir eşdeğeri bulunamadı ve
    üçü de yayımlanmış makalelerin doğrudan borcunu ödüyor (33 → 35, 34 → 38, 13 → 37).
    Kullanılan on yedi kaynağın kalan on dördü hakemlidir: ICLR (Stechly, Huang, Lightman, Setlur,
    Wang ve ark. 2023, Schulman ve ark. 2016), NeurIPS (Madaan, Yao, Valmeekam, Sutton ve ark.
    1999), ACL (Wang ve ark. 2024, Zheng), TACL (Kamoi), ICML (Gao, Schulman ve ark. 2015),
    Nature (Mnih, Silver), Machine Learning (Williams) ve klasik kaynaklar (Bellman 1957;
    Sutton & Barto 2018).

107. **Faz 4'ün kapanış kategorileri ve Faz 5'in açılışı (Batch 9'da verildi).** 39 ve 40
    `reasoning-and-memory`; kategori adındaki bellek ekseni 39'un ta kendisidir ve 40, 31'den
    beri süren akıl yürütme yayının zaman eksenine yayılmış hâlidir. 41 ve 42 ise
    `agents-and-retrieval`; bu, karar #65'in "29 ile açılan eksen 41–50'de aynı kategoride devam
    eder" hükmünün uygulanmasıdır ve yeni bir karar gerektirmedi. Batch 9'un okuma listesi bu
    yüzden iki öbek hâlinde görünür (39–40, sonra 41–42); UI bunu destekler.

108. **Başlık düzeltmesi (Batch 9'da verildi).** Yayımlanmamış 42'nin başlığındaki İngilizce
    sözcük terim defterine uyarlandı: "Retrieval: Aramanın Modern Hali" →
    **"Getirme: Aramanın Modern Hali"**. Gerekçe kararlar #51, #52, #66, #86 ve #99 ile aynı:
    "getirme" 29\. makalede kurulmuş ve defterde kayıtlı bir karşılıktır. **41'in başlığı
    değiştirilmedi:** "RAG" kısaltması, "token", "embedding", "BM25" ve "FlashAttention" gibi
    Türkçeleştirilmeyen kalemler sınıfındadır — karar #99'un MDP için uyguladığı ölçüt burada
    tersine çalışıyor, çünkü "Markov karar süreci"nin aksine "getirmeyle güçlendirilmiş üretim"
    Türkçede yerleşik bir karşılık değil, bu run'da kurulan bir gloss'tur. Kısaltma gövdede bir
    kez açılıp işaretlenir ve sonra parantezsiz kullanılır. **Faz başlıkları katmanına yine
    dokunulmadı** (karar #52'deki açık soru sürüyor); 44, 45 ve 46'daki "RAG" ile 46'daki
    "Retrieval-Reasoning", 47'deki "Function Calling" ve 49'daki "MCP" o başlıkları içeren
    run'larda ele alınacaktır. Not: 42'nin başlığı değiştiği için `roadmap.json` entegrasyondan
    **önce** güncellendi.

109. **Bellek sayıları (Batch 9).** Xu ve ark. (ACL 2022), 1.024 token'lık bütçede oturum 4
    doğrulama perplexity'si: önceki oturum yok 9,37 (kesilen %0), ham geçmiş 9,16 (%80), özet
    9,04 (%0). Oturum açılışlarında (oturum 4): geçmiş yok 10,69; ham geçmiş 8,27; özet 7,94;
    yalnız karşı taraf 8,49; yalnız kendi 8,52. 128 token'lık bütçede ham geçmişin %100'ü
    kesiliyor. Wu ve ark. (ICLR 2025), 500 soru; LongMemEval_S ≈115 bin token, _M 500 oturum
    ≈1,5 milyon token. Kusursuz getirme → tam geçmiş: GPT-4o 0,870 → 0,606 (%30,3); Llama 3.1
    70B 0,744 → 0,334 (%55,1); 8B 0,710 → 0,454 (%36,1); Phi-3 14B 0,702 → 0,380 (%45,9);
    Phi-3.5 Mini 0,660 → 0,342 (%48,1). Ticari: doğrudan okuma 0,9184; iki asistan 0,5773 ve
    0,3299. Olgu ile anahtar genişletme: bulma oranı +%9,4, doğruluk +%5,4; zaman damgalı
    dizinleme ve sorgu genişletme +%6,8–11,3; yapılandırılmış biçim ve not alma 10 puana varan
    kazanç. Park ve ark. (UIST 2023): puan = tazelik + önem + ilgi, üç ağırlık da 1, min-maks ile
    sıfır-bir aralığına ölçeklenir; sönüm çarpanı saat başına 0,995; önem 1–10 (örnekler 2 ve 8).
    TrueSkill ablasyonu: tam mimari 29,89; yansımasız 26,88; yansıma ve planlamasız 25,64;
    kalabalık işçi 22,95; belleksiz 21,21. Maharana ve ark. (ACL 2024): ortalama 300 tur, 9 bin
    token, 35 oturuma kadar; kazanç %22–66, insan düzeyinin %56 gerisinde, zaman akıl
    yürütmesinde %73; tuzak sorularda taban modele göre %83 daha kötü.

110. **Uzun ufuk sayıları (Batch 9).** Dziri ve ark. (NeurIPS 2023), Önerme 4.1: bağımsız `n`
    uygulamada başarısızlık olasılığı `n` ile üstel hızda bire yaklaşır. Önerme 4.2: yinelemeli
    uygulamada başarı tavanı `c / (c + ε)`; `c` yanlış girdiden **tesadüfen** doğru çıktıya varma
    olasılığıdır ve düşük çakışmalı işlemlerde `c` ile ε arasında büyük fark vardır. Üç basamaklı
    çarpmada iki güçlü model %55 ve %59. Kwa, West ve ark. (NeurIPS 2025): 170 görev (HCAST +
    RE-Bench + SWAA), 2019–2025 arası on iki sınır modeli, ajan/görev çifti başına 8 koşu.
    GPT-2'nin %50 ufku 2 saniye; o3'ün 110 dakika ve bazı görevlerde dört saatin üstü. İkiye
    katlanma 207 gün (%95 önyükleme aralığı 166–240 gün); 2023–2025 hızı 2019–2025'in yaklaşık
    %20 üstünde. %80 ufku kabaca beş kat kısa. Başarı oranının insan süresi logaritmasına göre
    üstel uyumu R² ≈ 0,80. Bir aylık (167 iş saatlik) ufuk için ekstrapolasyon 2028 ortası –
    2031 ortası, açık çekincelerle. İnsan taban çizgileri: yaklaşık 460 denemenin 286'sı
    başarılı. Mialon ve ark. (ICLR 2024): 466 soru, üç düzey adım sayısına göre tanımlı (en fazla
    5 adım / 5–10 adım / keyfî uzunluk); insan ortalaması %92, araçlı güçlü model en kolay
    düzeyde %30'u aşamıyor, en zorda %0, genel %15. Zhou ve ark. (ICLR 2024): uçtan uca görev
    başarısı %14,41, insan %78,24.

111. **Parametrik bilgi ve RAG sayıları (Batch 9).** Petroni ve ark. (EMNLP-IJCNLP 2019),
    BERT-large ilk tahmin doğruluğu: bire bir ilişkiler %74,5; çoktan bire %34,2; çoktan çoka
    %24,3; doğum tarihi %1,4. Açık alan soru cevaplamada ilk on tahminde %57,1; karşılaştırılan
    bilgi tabanı %63,5. Kandpal ve ark. (ICML 2023): 176 milyar parametreli modelde ilgili belge
    sayısı 10 → 10.000 iken doğruluk %25 → %55 üstü; beş derlem arasında sıra ilişkisi 0,87–0,97;
    nadir sorularda ölçek doğrusu R² = 0,98 ve insan/denetimli düzeye 10¹⁸ parametre; altın
    paragraf verildiğinde eğri yön değiştiriyor. Lewis ve ark. (NeurIPS 2020): Aralık 2018
    Wikipedia, 100 kelimelik ayrık parçalar, 21 milyon belge; Natural Questions tam eşleşme
    RAG-Sequence 44,5 / RAG-Token 44,1 / DPR 41,5 / T5-11B+SSM 36,6; getirilen hiçbir belgede
    cevap geçmediğinde %11,8; insan değerlendirmesinde olgusallık %42,7'ye %7,1; sabit sözcük
    eşleşmesi getiricisiyle NQ 43,5 → 29,7, olgu doğrulamada sözcük eşleşmesi önde; dizin
    değiştirme 82 lider, 2016/2016 %70, 2018/2018 %68, çapraz %12 ve %4. Mallen ve ark. (ACL
    2023): 14 bin soru; dört öbek %24 (0,83), %10 (0,14), %17 (0,88), %49 (0,11), genel bulma
    oranı 0,42. Longpre ve ark. (EMNLP 2021): ezberlenen cevaba dönme %20–75; altın belgede ezber
    oranı 4, yüz belge getirildiğinde 77. Cuconasu ve ark. (SIGIR 2024): dikkat dağıtıcı belgeler
    doğruluğu düşürüyor, rastgele belgeler %35'e varan oranda artırıyor.

112. **Getirme sayıları (Batch 9).** Robertson & Zaragoza (2009, Found. Trends Inf. Retr. 3(4),
    333–389): B = (1 − b) + b × (belge uzunluğu / ortalama uzunluk), düzeltilmiş sıklık = tf / B,
    ağırlık = düzeltilmiş sıklık / (k₁ + düzeltilmiş sıklık); çalışma `k₁` ve `b` için **yol
    göstermediğini açıkça söyler**. Serideki sayısal örnek (k₁ = 1,2, b = 0,75, ortalama uzunluk
    200) açıklama amaçlıdır ve metinde öyle işaretlenmiştir. Thakur ve ark. (NeurIPS 2021 D&B):
    alan içi MS MARCO nDCG@10 BM25 0,228'e karşı yoğun 0,408; alan dışı ortalama BM25'e göre
    −%27,9 · −%20,3 · +%1,6 · −%47,7 · −%7,4 · −%2,8 · −%3,6 · +%2,5 · +%11. TREC-COVID Hole@10:
    BM25 %6,4, belge genişletmeli %2,8, iki yoğun model %14,4 ve %31,8; 980 çift elle
    etiketlendikten sonra BM25 0,656 → 0,668, belge genişletmeli 0,713 → 0,714, yoğun
    0,481 → 0,555 ve 0,332 → 0,445, geç etkileşimli 0,677 → 0,735. Formal ve ark. (SIGIR 2021):
    BM25 MRR@10 0,184 / R@1000 0,853 / TREC DL R@1000 0,745 / işlem 0,13; öğrenilmiş seyrek
    0,322 / 0,955 / 0,813 / 0,73; en iyi yoğun 0,335 / 0,964 / 0,720. Khattab & Zaharia (SIGIR
    2020): yeniden sıralamada BM25 16,7; çapraz kodlayıcı 34,7 (10.700 ms, 97 T) ve 36,5
    (32.900 ms, 340 T); geç etkileşimli 34,9 (61 ms, 7 G). Uçtan uca 8,8 milyonluk derlemde
    MRR@10 36,0 ve ilk bin sonuçta bulma oranı %96,8. Cormack ve ark. (SIGIR 2009): puan,
    sıraların terslerinin toplamıdır ve sabit 60 pilot çalışmada seçilip sonra değiştirilmemiştir;
    pilot MAP en iyi tekil 0,2016, Condorcet 0,2074, CombMNZ 0,2039, yöntem 0,2145; sabit 10–100
    arasında 0,2123–0,2147, sıfırda 0,2072, 500'de 0,2098; TREC Robust 0,3686'ya karşı en iyi
    tekil 0,3586; ortalama kazanç %4–5.

113. **REALM'in yayın yeri (Batch 9).** Guu ve ark.'nın çalışması DBLP'de yalnızca CoRR sürümüyle
    indeksleniyor, ancak ICML 2020 bildiri sayfası (PMLR 119:3929–3938) doğrudan doğrulandı.
    Venue doğrulamasında **birincil bildiri sayfası DBLP'nin üstündedir**; kararlar #97 ve
    #106'daki "yalnızca CoRR'de indeksleniyorsa kullanma" ölçütü, birincil bildiri sayfası
    bulunduğunda uygulanmaz. Çalışma bu run'da yine de kullanılmadı; ölçüt sonraki run'lar için
    burada kayıtlıdır.

114. **Batch 9'un kaynaklarının tamamı hakemlidir.** Kullanılan on yedi kaynağın hepsi hakemli bir
    yerde yayımlanmıştır: ACL (Xu, Maharana, Mallen), ICLR (Wu, Mialon, Zhou), UIST (Park),
    NeurIPS (Dziri, Kwa, Lewis, Thakur), EMNLP (Petroni, Longpre), ICML (Kandpal), SIGIR (Formal,
    Khattab, Cormack) ve Found. Trends Inf. Retr. (Robertson & Zaragoza). Karar #6'daki hakemsiz
    listeye **yeni kalem eklenmedi**; Batch 6 ve 7'nin serisi burada yeniden yakalandı. Aday olup
    kullanılmayanlar ve gerekçeleri: MemGPT (Packer ve ark.), "LLMs Get Lost In Multi-Turn
    Conversation" (Laban ve ark.), monoBERT (Nogueira & Cho), doc2query ve "The Illusion of
    Diminishing Returns" (Sinha ve ark.) yalnızca CoRR'de indeksleniyor. Belge genişletmenin
    sayıları bu yüzden hakemli ColBERT ve BEIR tablolarından alındı.


115. **Başlık düzeltmeleri (Batch 10'da verildi).** Yayımlanmamış üç başlık terim defterine
    uyarlandı: "Vektör Veritabanları ve İndeksleme" → **"Vektör Veritabanları ve Dizinleme"**
    ("dizin" 41/42'de kurulmuş karşılıktır; "indeksleme" gövdede hiç geçmeyecekti); "Chunking,
    Rerank ve RAG Hattının İncelikleri" → **"Parçalama, Yeniden Sıralama ve RAG Hattının
    İncelikleri"** (yeniden sıralayıcı 29'da kurulu; parçalama 44'te kuruldu); "RAG'in Ötesi:
    Retrieval-Reasoning Sistemleri" → **"RAG'in Ötesi: Getirerek Akıl Yürüten Sistemler"** (getirme
    29'da, akıl yürütme 31'de kurulu). 45'in başlığı değiştirilmedi. "RAG" kısaltması karar #108
    gereği korundu. Üç değişiklik `roadmap.json`'da entegrasyondan **önce** yapıldı. Faz başlıkları
    katmanına yine dokunulmadı (karar #52'deki açık soru sürüyor).
116. **Vektör dizini sayıları (Batch 10).** Weber, Schek & Blott (VLDB 1998): bölmeleme/kümeleme
    yapıları boyut ~10'un üstünde sıralı taramanın gerisinde; kendi maliyet modellerinde eşik 610
    ve "pratikte çok daha aşağıda"; çıkış yolu yaklaşık vektörlerle tarama (VA-file). Johnson,
    Douze & Jégou (IEEE Trans. Big Data 7(3), 2021): `|C1| ≈ √ℓ`; ürün kuantizasyonu `b` alt vektör
    × 256 merkez = `b` bayt; asimetrik uzaklık; SIFT1B'de 8 baytla R@10 = 0,376, sorgu başına
    17,7 µs, önceki GPU çalışmasından 8,5 kat hızlı; YFCC100M (95 milyon) k-NN çizgesi 35 dakika;
    1 milyar vektör dört kartta 12 saatin altında. Ürün kuantizasyonunun kaynağı Jégou, Douze &
    Schmid (IEEE TPAMI 33(1), 2011, s. 117–128; Crossref ve DBLP ile doğrulandı) — **metni
    alınamadı** (HAL/IEEE bot engeli), sayı kullanılmadı, mekanizma Johnson ve ark.'nın anlatımına
    dayanır. Malkov & Yashunin (IEEE TPAMI 42(4), 2020): atlamalı liste akrabalığı; `mL = 1/ln(M)`;
    bellek `M` ile orantılı; kurulum genişliği için 0,95 bulma oranı yeterli; 200M SIFT'te kurulum
    5,6 saat (efC=500) / 42 dakika (efC=40), 64 GB; Faiss sıkıştırılmış 12/11 saat, 30/23,5 GB;
    10M SIFT 40 çekirdekte efC=100 ile 3 dakika. DPR'ın dizini HNSW: düğüm başına 512 komşu,
    kurulum 200, sorgu 128 (Karpukhin ve ark. dipnot 10). Aumüller ve ark. (Inf. Syst. 87, 2020):
    bulma oranı tanımı tam taramanın `k` komşusuna göre; Annoy örneği 1.249 sorgu/sn @ 0,52;
    GloVe'da HNSW her bulma oranında en hızlı; Rand-Euclidean'da HNSW 0,86'yı geçemiyor,
    NYTimes'ta FAISS-IVF 0,7'yi geçemiyor. Simhadri ve ark. (PMLR 176, 2022): T1 (64 GB, 10.000
    sorgu/sn) taban çizgisi 0,6345 / 0,6503 / 0,7289 / 0,7036; T2 (SSD, 1.500 sorgu/sn) 0,9491 /
    0,9371 / 0,9010 / 0,9356 (BIGANN / DEEP / SPACEV / Turing); "kuantizasyon kaybının doyduğu
    bölge"; metin→görüntü kümesinde çöküş. Subramanya ve ark. (NeurIPS 2019): 1 milyar nokta,
    64 GB + SSD, >5.000 sorgu/sn, <3 ms, 1-recall@1 ≥ %95, 16 çekirdek; sıkıştırılmış dizinler
    ~%50. Macdonald & Tonellotto (CIKM 2021): aday 200'e inince ilgili belge bulma oranı
    0,77 → 0,59 (−%18), MRR/nDCG@10/MAP'ta anlamlı fark yok, 406 → 202 ms. Kuffo ve ark. (SIGIR
    2026): MSMARCO'da geleneksel bulma oranı 0,863 ↔ anlamsal 0,932; <20 ilgili komşulu
    sorgularda 0,762 ↔ 0,903; anlamsal hedefle aynı kalite %14 daha az maliyet; %95 hoşgörülü
    hedef BigANN'de ~%25, MSMARCO'da ~%35 tasarruf. Pan, Wang & Li (VLDB J. 33(5), 2024): 20'den
    fazla ticari sistem beş yılda; beş engel. Gollapudi ve ark. (WWW 2023): seçicilik
    `|P_f|/|P|`; 10⁻¹–10⁻⁶ seçicilikte %90+ bulma oranı, öteki yaklaşımlar ~1000 kat daha az
    sorgu/sn. Santhanam ve ark. (NAACL 2022): artık sıkıştırmayla depolama 6–10 kat düşük;
    (CIKM 2022): gecikme kartta 7 kat, işlemcide 45 kat, 140M parçada onlarca ms. **Seri
    türetimleri:** 21.015.324 × 768 ≈ 16,1 milyar çarpma-toplama; 4.096 küme, 32 yoklama →
    ~168 bin mesafe = tam taramanın %0,8'i; 64 alt vektör → 3.072 bayttan 64 bayta (48 kat, 65 GB
    → 1,3 GB); 4 boyutlu PQ örneği: kod (1, 1), tahmin 0,10, gerçek 0,1225; filtre örneği:
    binde bir seçicilikte 10 sonuç için ~10.000 aday.
117. **Getirme hattı sayıları (Batch 10).** Chen ve ark. (EMNLP 2024): Wikipedia 41,4M parça
    (58,5 kelime) / 114,2M cümle (21,0) / 256,9M önerme (11,2); ilk beşte bulma oranı
    (parça/cümle/önerme, 5 küme ortalaması): Contriever 43,0/47,3/52,7; SimCSE 34,3/40,9/46,3;
    DPR 57,3/59,2/59,9; GTR 65,2/66,7/68,0; denetimsizlerde +12,0 ve +9,3 (%35,0 ve %22,5);
    EntityQuestions'ta DPR %25 göreli; Contriever + FiD ilk beş tam eşleşme 24,9/27,6/31,1. Wang
    ve ark. (EMNLP 2024): parça boyu (lyft_2021, ~170 soru, LlamaIndex + gpt-3.5 hakem)
    sadakat/ilgililik 2048: 80,37/91,11 · 1024: 94,26/95,56 · 512: 97,59/97,41 · 256: 97,22/97,78
    · 128: 95,74/97,22; parça tekniği düz 95,74/95,37, küçükle-ara 96,67/95,37, kayan pencere
    97,41/96,85; yeniden sıralama (BM25 ilk 1000, MRR@10 / sn): monoT5 31,78 / 4,5; monoBERT
    31,69 / 15,8; RankLLaMA 32,35 / 82,4; TILDEv2 27,83 / 0,02; Tablo 1 ortalama puan/gecikme:
    getirmesiz 0,351 / 1,27 sn; retrieval modülü ablasyonunda (öteki modüller en iyi ayarda)
    Original 0,383 / 1,44; Hybrid 0,429 / 1,45; HyDE 0,398 / 11,58; Hybrid+HyDE 0,443 / 11,71;
    yeniden sıralama yok 0,430; monoT5 0,443; paketleme sides 0,443, forward 0,437, reverse
    0,446; özetleme yok 0,441, Recomp 0,446, LongLLMLingua 0,426. **Dikkat:** "Hybrid 0,429 /
    1,45 sn" satırı yalnız-melez değil, HyDE'siz tam hattır; gecikmenin ~10 saniyesi HyDE'nin
    dil modeli çağrısıdır. Qu ve ark. (Findings NAACL 2025): belge bulma F1@5 sabit/kırılma/
    kümeleme NQ* 43,79/63,93/41,01, HotpotQA 90,59/87,37/84,79; kanıt cümlesi ExpertQA
    47,11/47,08/46,87; sonuç: sabit boyutlu daha verimli ve güvenilir. Gao ve ark. (ACL 2023):
    DL19/DL20 nDCG@10 BM25 50,6/48,0, Contriever 44,5/42,1, HyDE 61,3/57,9, Contriever-ft
    62,1/63,2. Ma ve ark. (EMNLP 2023): EM HotpotQA 32,36 → 30,47 → 32,80 → 34,38; AmbigNQ 42,10 →
    45,80 → 46,40 → 47,80; PopQA 41,94 → 43,20 → 46,00 → 45,72 (getirmesiz / getir-oku / LLM
    yeniden yazar / eğitilmiş). Nogueira ve ark. (Findings EMNLP 2020): MS MARCO MRR@10 BM25
    0,184; +BERT-large 0,372; +T5-base 0,381; +T5-large 0,393; +T5-3B 0,398. Sun ve ark. (EMNLP
    2023): pencere 20, adım 10; BEIR ortalama nDCG@10 BM25 43,42, monoT5-3B 51,36, GPT-4 53,68;
    DL19 75,59; damıtılmış 440M öğrenci BEIR'de monoT5-3B'yi +1,67 geçiyor; GPT-4'ü ChatGPT'nin
    ilk 30'unda çalıştırmak maliyeti 1/5'e indiriyor. Izacard & Grave (EACL 2021): 10 → 100 parça
    TriviaQA +%6, NQ +%3,5; çıkarımcı modeller 10–20'de tepe. Liu ve ark. (TACL 12, 2024):
    GPT-3.5-Turbo kapalı kitap %56,1, tek altın belge %88,3; 20–30 belgede ortadaki belgeyle
    >%20 düşüş ve kapalı kitabın altı; 4K/16K eğrileri üst üste. Cuconasu ve ark. (SIGIR 2024)
    Tablo 1 Llama2: altın tek 0,5642; 4 dikkat dağıtıcıyla uzak/orta/yakın 0,2745/0,2857/0,3795;
    8 ile 0,2643/0,2268/0,3748; kapalı kitap 0,1123. Jiang ve ark. (ACL 2024): NQ çok belgede
    ~4 kat az token'la %21,4'e varan kazanç; gecikme 1,4–2,6 kat. Xu, Shi & Choi (ICLR 2024):
    NQ token/EM getirmesiz 0/21,99; ilk 1 132/33,07; ilk 5 660/39,39; çıkarımcı 37/36,57;
    özetleyici 36/37,04; TriviaQA 0/49,33; 136/57,84; 677/62,37; 38/58,99; 32/58,68; dil
    modellemede ilk 1 belge ilk 5'ten iyi. Xu ve ark. (ICLR 2024, NVIDIA) Tablo 2 Llama2-70B
    ortalama: 4k 31,61; 4k+ret 36,02; 16k 36,78; 16k+ret 37,23; 32k 37,36; 32k+ret 39,60; GPT-43B
    4k+ret 29,32 ↔ 16k 29,45.
118. **RAG değerlendirme sayıları (Batch 10).** Es ve ark. (EACL 2024 demo): sadakat = desteklenen
    ifade / bütün ifadeler; insanla uzlaşma RAGAS 0,95/0,78/0,70 (sadakat/cevap/bağlam), GPT
    puanı 0,72/0,52/0,63, GPT sıralaması 0,54/0,40/0,52. Adlakha ve ark. (TACL 12, 2024): 1.800
    cevap; doğrulukta Kendall τ EM 27,3, F1 40,2, Recall 55,6, GPT-4 67,5; sadakatte K-Precision
    43,4, LLMCritic GPT-4 55,0, K-F1 −8,4. Yang ve ark. (NeurIPS 2024 D&B): puanlama 1 / 0,5 / 0
    / −1; GPT-4 Turbo yalnız model doğru/uydurma/eksik/güvenilirlik 33,5/13,5/53,0/20,0; Task 3
    43,6/30,1/26,3/13,4; LLM'ler ≤%34, düz RAG ≤%44, endüstri %63 uydurmasız; dinamizm payları
    gerçek zamanlı %10, hızlı değişen %13, yavaş değişen %23, statik %54. Salemi & Zamani (SIGIR
    2024) Tablo 1 (BM25, Kendall τ, NQ / HotpotQA): cevabı içerme 0,349/0,359; KILT kanıt
    0,181/0,007; LLM ilgililik 0,045/0,034; eRAG 0,492/0,610. Niu ve ark. (ACL 2024): 2.965 örnek
    × 6 model = 17.790 cevap; %43,1'i uydurmalı; QA'da %29,1; model başına uydurmalı cevap (2.965
    içinden) GPT-3.5 401, GPT-4 406, Llama-2-7B 1.832, 13B 1.677, 70B 1.395, Mistral-7B 1.953;
    QA'da GPT-4 48/989, Mistral 378/989; yoğunluk (yüz kelime başına parça) QA GPT-4 0,06,
    veriden metne 0,27; etiketleyici uyuşması %91,8. Chen ve ark. (AAAI 2024) ChatGPT İngilizce:
    gürültü 0/0,2/0,4/0,6/0,8 → 96,33/94,67/94,00/90,00/76,00; reddetme 24,67 (tam) / 45,00
    (ChatGPT ölçümü); bütünleştirme 55/51/34 (gürültü 0/0,2/0,4); karşıolgusal Acc 89, belgeli 9,
    hata tespiti 8 (tam) / 7, düzeltme 57,14. Rashkin ve ark. (CL 49(4), 2023): "According to P,
    s" testi. Gao ve ark. (EMNLP 2023) ASQA ChatGPT: vanilla 5 parça akıcılık/doğruluk/atıf
    bulma/kesinlik 66,6/40,4/73,6/72,5; yeniden sıralamalı 77,0/40,2/84,8/81,6; kapalı kitap +
    sonradan atıf 52,7/38,3/26,7/26,7; ELI5 vanilla 57,2/12,0/51,1/50,0. Liu, Zhang & Liang
    (Findings EMNLP 2023): cümlelerin %51,5'i tam destekli, atıfların %74,5'i destekliyor, atıf
    kesinliği ↔ algılanan fayda r = −0,96. Yue ve ark. (Findings EMNLP 2023): üç sınıf; GPT-4
    GenSearch genel F1 84,3, çelişki en zor. Zheng ve ark. (NeurIPS 2023 D&B): GPT-4 ↔ insan %85
    (beraberliksiz), insan ↔ insan %81; konum yanlılığı tutarlılık/ilk kayırma Claude-v1
    23,8/75,0, GPT-3.5 46,2/50,0, GPT-4 65,0/30,0. Wang ve ark. (ACL 2024): Vicuna-13B 80 sorunun
    66'sında ChatGPT'yi geçiyor (ChatGPT hakem); MEC/BPC uzlaşmayı +9,8 / +14,3. Saad-Falcon ve
    ark. (NAACL 2024): ~150 insan etiketi; Kendall τ 0,91 (bağlam) ve 0,97 (cevap); RAGAS'tan
    bağlam ilgililiğinde 0,16 yüksek.
119. **Getirerek akıl yürütme sayıları (Batch 10).** Press ve ark. (Findings EMNLP 2023):
    davinci-002 CC 2 adımlı %45,4; en zor kategoride alt sorular %80, bileşik %1,2; açık ~%40 ve
    ölçekle sabit; Tablo 1 (Bamboogle / 2Wiki / MuSiQue): doğrudan 17,6/25,4/5,6; CoT
    46,4/29,8/12,6; yalnız arama 0,0/2,2/1,5; self-ask 57,6/30,0/13,8; self-ask + arama
    60,0/40,1/15,2. Trivedi ve ark. (ACL 2023): GPT3 bulma oranı +11,3/22,6/12,5/21,2
    (HotpotQA/2Wiki/MuSiQue/IIRC), Flan-T5-XXL +7,9/14,3/3,5/10,2; QA F1 GPT3 +7,1/13,2/7,1 (IIRC
    değişmedi); Flan-T5-XL 3B, 58 kat büyük GPT3'ün tek adımlısını geçiyor. Shao ve ark. (Findings
    EMNLP 2023) HotpotQA EM: getirmeli doğrudan 31,6, ReAct 24,9, Self-Ask 36,8, Iter-RetGen
    1/2/3/7: 39,2/44,1/45,2/45,1; maliyet (HotpotQA) ReAct 2,9 çağrı / 14,3 paragraf, Self-Ask
    3,2 / 16,0. Yao ve ark. (ICLR 2023) PaLM-540B HotpotQA EM / Fever: Standard 28,7/57,1; CoT
    29,4/56,3; CoT-SC 33,4/60,4; Act 25,7/58,9; ReAct 27,4/60,9; CoT-SC→ReAct 34,2/64,6;
    ReAct→CoT-SC 35,1/62,0; insan incelemesi: doğru cevaplarda uydurma ReAct %6 ↔ CoT %14;
    yanlışlarda uydurma %0 ↔ %56, akıl yürütme hatası %47, arama sonucu hatası %23; ALFWorld
    +%34, WebShop +%10. Jiang ve ark. (EMNLP 2023) 2WikiMultihopQA EM: getirmesiz 28,2; tek 39,4;
    önceki pencere 43,2; önceki cümle 39,0; soru ayrıştırma 47,8; FLARE 51,0. Asai ve ark. (ICLR
    2024): dört yansıma token'ı; 150 bin çift; PopQA / ASQA atıf kesinliği / bulma oranı:
    Llama2-7B getirmeli 38,2 / 2,9 / 4,0; Ret-ChatGPT 50,8 / 65,1 / 76,6; Self-RAG 7B 54,9 / 66,9
    / 67,8; 13B 55,8 / 70,3 / 71,3; ChatGPT getirmesiz PopQA 29,3. Xiong ve ark. (ICLR 2021):
    HotpotQA R@2 65,9 (TF-IDF 10,3), R@10 77,5, R@20 80,2. Yang ve ark. (EMNLP 2018): 113 bin
    soru; 1.000 örnekte insan EM 83,60, temel model dikkat dağıtıcılı 60,88. Trivedi ve ark.
    (TACL 10, 2022): bağlantısız akıl yürütme (DiRe) cevap puanı HotpotQA 68,8, 2Wiki 63,4,
    MuSiQue-Ans 37,8 (**dikkat:** tablodaki 93,0 ve 98,5 destekleyici olgu sütunlarıdır). Schick
    ve ark. (NeurIPS 2023): GPT-J 6,7B + araçlar T-REx 53,5 ↔ GPT-3 39,8; ASDiv 40,4 ↔ 14,0.
    **Seri türetimi:** 0,9 × 0,8 = 0,72; üç halkada 0,58.
120. **Batch 10'un kaynaklarının tamamı hakemlidir; hakemsiz listeye kalem eklenmedi.** 43'te on
    beş, 44'te on üç, 45'te on üç, 46'da on kaynak (toplam 51; DPR ve Cuconasu iki makalede
    ortak). Yerler: VLDB, IEEE Trans. Big Data, IEEE TPAMI (×2), NeurIPS (×5), PMLR (×2), Inf.
    Syst., CIKM (×2), SIGIR (×3), VLDB J., WWW, NAACL (×3), EMNLP (×9), ACL (×5), EACL (×2),
    Findings EMNLP (×5), Findings NAACL, TACL (×3), CL, AAAI, ICLR (×5). Karar #113 uygulandı:
    ICLR/NeurIPS venue'leri DBLP ile, dergi künyeleri Crossref API'siyle
    (`https://api.crossref.org/works/<doi>`) ve ACL Anthology sayfa başlıklarıyla doğrulandı.
    Aday olup **kullanılmayanlar:** Search-R1 (Jin ve ark.) — PDF "COLM 2025" diyor ama DBLP
    yalnızca CoRR gösteriyor ve OpenReview/COLM birincil sayfası bulunamadı, karar #113'ün ölçütü
    karşılanamadı; "ANN Search: Recall What Matters" (Dimitropoulos & Mamoulis, arXiv 2606.04522)
    ve "The Faiss library" (Douze ve ark., arXiv 2024) hakemsiz; Beam Retrieval (NAACL 2024) ve
    ScaNN (ICML 2020) hakemli ama kapsam dışı bırakıldı; Andoni & Indyk (CACM 2008) kelime
    bütçesi için çıkarıldı.

121. **Başlık düzeltmesi (Batch 11'de verildi).** "Araç Kullanımı: Function Calling" → **"Araç
    Kullanımı: İşlev Çağrısı"**. Gerekçe: "function calling" kısaltma değil, iki sözcüklük İngilizce
    ifade; Türkçe karşılığı 47'nin gövdesinde "işlev çağrısı (function calling)" olarak kuruldu ve
    "işlev" sözcüğü 30'daki anlamıyla (programın çağrılabilir parçası) 1–2'deki matematiksel
    "fonksiyon"dan ayrıldı. Değişiklik `roadmap.json`'da entegrasyondan **önce** yapıldı. 48, 49 ve
    50 başlıkları değişmedi ("MCP" kısaltması karar #108 gereği korundu). Faz başlıkları katmanına
    yine dokunulmadı (karar #52'deki açık soru sürüyor).
122. **Kategori ve level (Batch 11).** 47–50 `agents-and-retrieval` ve `intermediate`; Faz 5'in
    tamamı (41–50) tek kategoride kapandı (karar #107'nin devamı). Faz 6'nın (51–60) kategorisi
    51'in run'ında kararlaştırılır; kontrollü sözlükte "agents" yalnızca `agents-and-retrieval`
    içinde geçtiği için varsayılan devamlılıktır, ayrı kategori açılmaz.
123. **İşlev çağrısı sayıları (Batch 11).** Anthropic belgelendirmesi: araç kullanımını açan
    sistem istemi modele ve ayara göre 264–804 token; araç tanımları sistem istemine girer ("In
    this environment you have access to a set of tools…"). Meta Llama 3.1 belgelendirmesi: araç
    sonucu `ipython` rolüyle döner; `eom_id` mesaj sonu (araç sonucu bekleniyor), `eot_id` tur
    sonu; `Environment: ipython` satırı kipi açar; JSON çağrı `{"name": …, "parameters": …}`.
    Patil ve ark. (ICML 2025, PMLR 267:48371–48392): serbest metin kipi 4.251 örnekte ortalama
    412,93 ↔ yapılandırılmış kip 182,5 ayrıştırma hatası; ayrıştırılabilenlerde çoklu kategoride
    yanlış çağrı 77,5 ↔ 21; kategoriler tek/çoklu/paralel/paralel çoklu/ilgisiz; 64.517 gerçek
    sorgu; sorgu başına ortalama 3 araç seçeneği (en çok 37), araç başına ortalama 4 parametre
    (en çok 28); gpt-4o FC tek turlu AST 77,2/93,5/93,0/86,0, ilgisiz 83,1, çok turlu temel 62,5,
    eksik işlev 6,0 (istem kipinde 41,0). Liu ve ark. (NeurIPS 2024 D&B): 40.000 çağrı; 236B
    sohbet modeli biçim/çalıştırma/anlam elemesi 817/3.359/2.165, geçen 33.659 (%84,15); 33B kod
    modeli 4.311/15.496/6.424, geçen 13.769 (%34,42); elenen veriyle eğitim BFCL puanını düşürür.
    Patil ve ark. (NeurIPS 2024): 1.645 API (94 TorchHub, 626 TF Hub, 925 HF); halüsinasyon = AST
    alt ağacı hiçbir API'ye uymayan çağrı; GPT-4 0-shot halüsinasyon TorchHub 36,55 / HF 37,16 /
    TF Hub 78,65; Gorilla 0-shot 6,98 / 10,95 / 5,40; oracle belgeyle TorchHub 0; getirici-farkında
    eğitim +12,37 (TorchHub) ve +23,46 (HF); sınavda GPT-Index −29,20, BM25 −52,27 (oracle'a
    göre). Wang ve ark. (ICML 2024, PMLR 235:50208–50232) API-Bank atomik çağrı: Llama-2-70b kod
    35,6 / JSON 14,3 / metin 37,6; gpt-4-0613 75,4 / 82,0 / 74,4. Schick ve ark. (NeurIPS 2023):
    τf 0,5/1,0/2,0'de hesap makinesi 3.680/994/138, Wikipedia arama 207.241/60.974/13.944; LAMA'da
    %98,1 soru-cevap aracı, matematikte %97,9 hesap makinesi. Hao ve ark. (NeurIPS 2023):
    GSM8K-XL (4 araç) ReAct 0,32 ↔ ToolkenGPT 0,33; FuncQA (13 araç) tek adım 0,57 ↔ 0,73, çok
    adım 0,06 ↔ 0,15; istemde 4 örnek 5 aracı kapsıyor. Li ve ark. (EMNLP 2023, s. 3102–3116):
    73 API, 314 diyalog, 753 çağrı; test 214/50/50; doğruluk Alpaca-7B 24,06/5,19/0,00, GPT-3.5
    59,40/38,52/22,00, GPT-4 63,66/37,04/70,00; GPT-4 hatalarının %67,86'sı API getirememe. Qin ve
    ark. (ICLR 2024): 16.464 API, 49 kategori; nDCG@5 BM25 17,0, Ada 45,4, eğitilmiş getirici
    84,9; geçme oranı ReACT 35,3, ReACT@N 44,5, DFSDT 63,8 (ChatGPT); ToolLLaMA DFSDT 66,7 ↔
    getiriciyle 67,3 (win 60,0 ↔ 63,1). Kim ve ark. (ICML 2024, PMLR 235:24370–24391) GPT:
    HotpotQA ReAct† 62,47 / 7,12 sn ↔ LLMCompiler 62,00 / 3,95 sn (1,80×), token 2.900/120 ↔
    1.300/80, maliyet 3,37×; Movie Rec. 72,47 / 20,47 sn ↔ 77,13 / 5,47 sn (3,74×), token
    20.000/230 ↔ 2.800/115, 6,73×. Yao ve ark. (ICLR 2025): pass^1 gpt-4o perakende 61,2, havayolu
    35,2; pass^8 < %25; başarısızlıkların ~%55'i yanlış argüman/bilgi, %25'i yanlış karar; politika
    çıkarılınca 61,2 → 56,8 ve 33,2 → 10,8; maliyetin %95,9'u girdi; uydurma kimlik gpt-4o 0,46 ↔
    gpt-3.5 FC/Act 2,08/6,34. **Seri türetimi:** 20 araç × 150 token = 3.000, çerçeveyle 3.300;
    100 turda 330 bin token (açıklama amaçlı).
124. **Web, kod ve dosya sayıları (Batch 11).** Liu ve ark. (KDD 2023): arama → paralel indirme →
    HTML'den metin → iki ≤300M parametreli kodlayıcıyla parça seçimi; insan puanı [0, 3]: WebGLM-10B
    doğruluk 2,810 / atıf 2,757; WebGPT-175B 2,889 / 2,837; WebGPT-13B doğruluk 2,102. Nakano ve
    ark. (2021, **hakemsiz**): on komutluk metin tarayıcı; insan gösterimcilerine karşı %56, ELI5
    en çok oylanan cevaba karşı %69 tercih. Deng ve ark. (NeurIPS 2023 D&B): 137 site, 2.000+
    görev; HTML ortalama 1.135 öğe → süzülünce 580, hedef bulma %94,7; MindAct Flan-T5-XL çapraz
    görev öğe 55,1 / adım 52,0 / görev 5,2. Gao ve ark. (ICML 2023, PMLR 202:10764–10799):
    GSM8K doğrudan 19,7 / CoT 65,6 / PAL 72,0; GSM-Hard 5,0 / 20,1 / 61,5; yorumlayıcısız program
    23,2. Chen ve ark. (TMLR 2023): FinQA CoT 40,4 ↔ PoT 64,5; GSM8K PoT 71,6. Gou ve ark. (ICLR
    2024): MATH ToRA-Code-7B 44,6 (WizardMath-70B 22,7), ToRA-Code-34B 50,8 (GPT-4 CoT 42,5, GPT-4
    PAL 51,8); en çok üç çalıştırma; 64 örnekleme + öğretmen düzeltmesi. Wang ve ark. (ICML 2024)
    M3ToolEval (82 görev, ≤10 tur, gösterimsiz): gpt-4-1106 kod 74,4 / JSON 52,4 / metin 53,7; tur
    5,5 / 7,6 / 7,7; 17 modelin 12'sinde kod en iyi. Chen ve ark. (ICLR 2024): TransCoder Codex
    80,4 → 91,6 (birim test) → 92,5 (+açıklama); MBPP 61,4 → 69,4 → 69,8; Spider 81,3 → 84,1.
    Yang ve ark. (NeurIPS 2024): SWE-bench %12,47 (286/2.294), Lite %18,00; RAG 1,31/2,67;
    kabuk-yalnız Lite 11,00; maliyet Lite 1,67 $ ↔ RAG 0,13 $; ablasyon (Lite): düzenleme+lint
    18,0 / lint yok 15,0 / düzenleme yok 10,3; arama özet 18,0 / yinelemeli 12,0 / yok 15,7;
    pencere 30 satır 14,3 / 100 satır 18,0 / tam dosya 12,7; son 5 gözlem 18,0 / tam geçmiş 15,0;
    arama komutları ≤50 sonuç, görüntüleyici 100 satır. Zhang ve ark. (EMNLP 2023, s. 2471–2484)
    satır tamamlama EM GPT-3.5: In-File 40,56, iter1 55,31, iter2 56,81, oracle 57,75;
    CodeGen-350M iter3 43,94 ↔ CodeGen-6B In-File 34,56. Liu, Xu & McAuley (ICLR 2024) Python
    acc@1: kolay rastgele 15,68 / Jaccard 20,82 / UniXcoder 25,94; zor 6,44 / 10,01 / 17,70.
125. **MCP ve ekosistem sayıları (Batch 11).** Belirtim sürümleri 2024-11-05, 2025-03-26,
    2025-06-18, 2025-11-25, 2026-07-28; 2026-07-28: durumsuz istekler (`_meta` içinde protokol
    sürümü ve istemci yetenekleri), `server/discover`, `tools/list` belirlenimci sıra (önbellek
    gerekçesi), `ttlMs`/`cacheScope`, tasks/roots/sampling/logging'in kullanımdan kaldırılması,
    ≥12 aylık kaldırma penceresi; roller host/client/server, istemci–sunucu bire bir; JSON-RPC 2.0;
    `tools/list` (name, title, description, inputSchema, outputSchema, annotations) ve
    `tools/call` (arguments → content[], isError); açıklamalar güvenilen sunucudan gelmedikçe
    güvenilmez sayılır. Resmî kayıt: üst veri (server.json), ters alan adı ad alanı, DNS/GitHub
    doğrulaması, güvenlik taraması paket depolarına bırakılmış, "preview". Hou ve ark. (ACM TOSEM
    2026, DOI 10.1145/3796519): 26 derleme; MCPWorld 26.404, MCP.so 16.592, resmî derleme 1.204
    (Eylül 2025); MCP.so'dan 300 örnek: 30'u MCP değil, 18'i erişilemez; yaşam döngüsü 4 evre /
    16 etkinlik; 4 saldırgan türü / 16 tehdit; araç zehirleme örneği (toplama aracının
    açıklamasında SSH anahtarını gönderme talimatı). Guo ve ark. (Findings ACL 2024, s.
    11143–11156): ToolBench API'lerinin %55,6'sı kararsız; durum: başarı 44,4, ayrıştırma hatası
    25,9, bağlanılamıyor 14,8, yetki 6,4, parametre değişikliği 3,6, bulunamıyor 3,5, diğer 1,4;
    üç koşuda geçme 33,0/31,5/37,5; önbellek 164.980 kayıt + gpt-4-turbo taklidi. Shen ve ark.
    (NeurIPS 2023): dört aşama (görev planlama, model seçimi, çalıştırma, cevap). Cai ve ark.
    (ICLR 2024): araç yapıcı GPT-4, kullanıcı GPT-3.5 (C > 15c); GPT-3.5 CoT ↔ LATM 66,4→79,7,
    61,6→99,6, 20,4→92,2, 59,2→98,3, 0,0→100,0, 18,9→100,0. Du, Wei & Zhang (ICML 2024, PMLR
    235:11812–11829): 16K+ API 128K pencereye sığmaz; 33 grup × 500; AnyToolBench geçme: ToolLLM
    getirici + ToolLLaMA 18,9, + GPT-4 36,6, düz ajan 14,0, AnyTool 73,8; 4–6 yansıma turunda
    +%20'ye varan artış. Chen ve ark. (Findings EMNLP 2024, s. 4705–4726) nDCG@5 ToolE çok araçlı:
    Vertex 0,5296 → 0,7231, BM25 0,2635 → 0,5637; ToolBench I2 0,3880 → 0,5379. Anthropic
    belgelendirmesi (**hakemsiz**): 5 sunuculu kurulum ~55K token; araç arama ile >%85 azalma,
    3–5 araç yüklenir; 30–50 araçtan sonra seçim doğruluğu düşer; 10.000 ertelenmiş araç sınırı.
    Wang ve ark. (ICLR 2026): 28 sunucu, 250 araç, 11 alan; görev başına 10 ilgisiz sunucu
    (>100 araç); 104 görev; gpt-5 geçerli ad %100 / şema %99,3 / çalıştırma %99,1 / görev
    tamamlama 0,677 / paralellik 0,339 / genel 0,749; llama-3.1-8B %96,1 / %89,4 / %90,9 / 0,261
    / 0,141 / 0,428; paralellik en çok 0,359 (o3).
126. **Tazelik ve güven sayıları (Batch 11).** Lazaridou ve ark. (NeurIPS 2021) Transformer-XL,
    2018–2019 testi: WMT 21,11 → 22,45 (+%6,34), özel haber 18,38 → 21,33 (+%16,04), arXiv 21,38 →
    23,07 (+%7,90); büyük modeller aynı bozulmayı yaşar. Cheng ve ark. (COLM 2024; kabul listesi
    2024.colmweb.org ile doğrulandı): etkin kesim tarihi = en düşük perplexity veren sürüm;
    tekilleştirme ve Common Crawl'daki eski Wikipedia kopyaları. Zhao ve ark. (Findings ACL 2024,
    s. 15015–15040): TAQA 20.148 soru; LLaMA2-70B (Eyl. 2022) F2022 17,2, tepe 2019; 2022'ye
    istemle 27,4, ince ayarla 27,9 (+%62); doğru bilinen sorularla seçim en iyi (20,5 ↔ 19,8).
    Dhingra ve ark. (TACL 10:257–273, 2022): TempLAMA F1 Uniform 26,6 ↔ Temporal 28,2; 2019–20
    19,8 ↔ 22,2; Yearly 27,3. Vu ve ark. (Findings ACL 2024, s. 13697–13720): FreshQA 600 soru,
    dört sınıf; katı puanlama GPT-4 (2021+) hızlı 12,0 → FreshPrompt 59,2; hiç değişmeyen 64,3 →
    94,4; yanlış öncül 33,9 → 71,0; genel 28,6 → 75,6; hızlı sorularda reddetme GPT-4 %60,
    ChatGPT %16. Kasai ve ark. (NeurIPS 2023 D&B): haftada ~30 soru; EM kapalı kitap 15,3, DPR
    (2018 dump) 13,3, Google arama 34,6; NOTA 66,5 → 58,4; hataların çoğu getirmeden. Liška ve
    ark. (ICML 2022, PMLR 162:13604–13622): dizin güncellemesi hızlı uyum, neredeyse unutmasız.
    Xu ve ark. (EMNLP 2024, s. 8541–8565): bağlam–bellek, bağlamlar arası, bellek içi çatışma.
    Xie ve ark. (ICLR 2024): yalnız karşı-bellekle ezber oranı ChatGPT 3,7 / GPT-4 8,9 (PopQA);
    1/2 destekleyiciyle 43,0 / 65,4; Llama2-7B sıra etkisi 33,3 ↔ 82,8. Wu, Wu & Zou (NeurIPS
    2024 D&B): 1.200+ soru, 6 alan; belge yanlış/model doğru: GPT-4o belge 0,608 / kendi 0,327 /
    hiçbiri 0,065, Claude Opus 0,313 / 0,585 / 0,102; belge doğru/model yanlış: belge 0,903 ve
    0,901; direnç güven ve sapmayla artar. Shi ve ark. (NAACL 2024 kısa, s. 783–791): LLaMA-13B
    NQ-Swap 11,7 → 36,7. Pan ve ark. (Findings EMNLP 2023, s. 1389–1403): REIT'te EM düşüşü DPR
    %14–54, BM25 %20–87; GENREAD %5–15. Pan ve ark. (EMNLP 2024, s. 19844–19863): ChatGPT
    güvenilirlik notuna az duyarlı; CAG-7B 2WikiMHQA'da LLaMA-2-7B'ye göre +26,6 EM. Weller ve
    ark. (EACL 2024, s. 2288–2301): QUIP Wikipedia %99,9 ↔ Pile %17,0; ibare +%5–105. Magesh ve
    ark. (JELS 22(2):216–242, 2025): 200+ soru; doğru 65/41/19, eksik 18/25/62, uydurma ~17/33/17
    (özet: %17–33); en uzun cevap en çok uyduruyor (Westlaw ort. 350 kelime). Fierro ve ark. (ACL
    2024, s. 11397–11417): AutoAIS 72,64 → 74,35; plan sorularının %97,97'si cevaplanabilir.
127. **Kaynak politikası (Batch 11).** 47'de 13, 48'de 11, 49'da 10, 50'de 16 kaynak (Wang ve
    ark. CodeAct 47 ve 48'de ortak). Hakemsiz olup işaretlenerek kullanılanlar: Meta Llama 3.1
    belgelendirmesi, Anthropic belgelendirmesi (×2), MCP belirtimi ve kayıt belgesi, Wallace ve
    ark. (24'ten devir) ve Nakano ve ark. (WebGPT, arXiv 2112.09332). Karar #113 uygulandı:
    MCP-Bench DBLP'de yalnızca CoRR ama ICLR 2026 birincil bildiri sayfası doğrulandı; Dated Data
    için COLM 2024 kabul listesi `curl -k` ile alındı (sertifika adı uyuşmuyor); Hou ve ark. ve
    Magesh ve ark. Crossref ile dergi künyesine bağlandı. Aday olup **kullanılmayanlar:**
    MCP-Universe (Salesforce), LiveMCPBench, MCP Safety Audit (üçü yalnızca arXiv); Source-Aware
    Training (COLM 2024, doğrulandı, kapsam dışı); COLT (CIKM 2024), KaLMA (Findings ACL 2024),
    TimeQA (NeurIPS 2021 D&B) hakemli ama kelime bütçesi için çıkarıldı; BFCL için tahmin edilen
    arXiv kimliği (2506.14224) başka bir çalışmaya aitti, metin PMLR'nin GitHub aynasından alındı.
128. **Faz 6 kategori ve level kararı (Batch 12'de verildi).** 51, 52, 53 ve 54 `agents-and-retrieval` ve
    `intermediate`. Karar #122'nin varsayılanı uygulandı: kontrollü sözlükte "agents" yalnızca bu
    kategoride geçer, ayrı kategori açılmadı; okuma listesinde 41–54 tek kesintisiz öbek olarak görünür.
    Başlıklar `roadmap.json`'daki taslakla birebir aynı bırakıldı (51'deki "LLM" kısaltması karar #108'in
    ölçütüyle korunur); 55–60 başlıkları için HANDOFF'taki açık borç sürüyor.
129. **"Ajan" terimi ve çevirisi (Batch 12).** 48'de gloss'lanıp tanımı ertelenen "ajan", 51'de Wooldridge
    ve Jennings (1995) ile Russell ve Norvig'in tanımlarıyla kuruldu; Türkçedeki "casus" anlamı bir
    sözcük notuyla açıkça ayrıldı, karşılık *agere*/eyleyen olarak gerekçelendirildi. "Grounding" için
    iki karşılık bilinçli olarak ayrı tutuldu: 45'te kaynak sadakati (groundedness), 54'te öğe
    konumlandırma (GUI grounding); 54 bu ayrımı gövdede açıkça yapar. 37'nin durum/eylem/geçiş/ödül
    çerçevesi 51'de ajan katında bilinçli formalizasyonla yeniden kuruldu (Şekil 2'nin üç sütunlu eşlemesi).
130. **Ajan tanımı ve döngü sayıları (Batch 12).** Wooldridge & Jennings (KER 10(2):115–152, 1995):
    özerklik, toplumsallık, tepkisellik, girişkenlik. Sumers ve ark. (TMLR 2024): çalışma belleği +
    olaysal/anlamsal/yordamsal bellek; iç eylem = akıl yürütme/getirme/öğrenme, dış eylem = temellendirme;
    karar döngüsü öneri/değerlendirme/seçim → yürütme. Wang ve ark. (FCS 18(6):186345, 2024, Crossref):
    profil/bellek/planlama/eylem; geri bildirimsiz ↔ çevre/insan/model geri bildirimli planlama. Carta
    ve ark. (ICML 2023, PMLR 202:3676–3713): Flan-T5 780M + PPO, BabyAI-Text; 250 bin adımda 0,8, ~600
    binde 0,9; DRRN ve ön eğitimsiz kopya 1,5 milyonda < 0,2; sembolik PPO ≈ 0,4; dikkat dağıtıcı
    4→16'da sembolik −%38, GFlan −%14. Huang ve ark. (ICML 2022, PMLR 162:9118–9147), Tablo 1: GPT-3
    175B doğruluk 77,86 / yürütülebilirlik 7,79; insan 70,05 / 100; çevrilmiş GPT-3 175B 66,13 / 73,05;
    Codex 12B çevrilmiş 54,88 / 78,57. Shridhar ve ark. (ICLR 2021): dokuz komut şablonu; altı görev
    türü. Yao ve ark. (NeurIPS 2022) WebShop: 1.181.436 ürün, 12.087 talimat, 500 test; IL+RL 62,4 /
    28,7; insan uzman 82,1 / 59,6; kural 45,6 / 9,6; seçim kâhini 9,6 → 85,4 ve 59,6 → 87,8; gezilen
    sayfa 4,5 ↔ 11,3. ReAct (ICLR 2023) Tablo 3–4: ALFWorld en iyi 71 (Act 45, BUTLER 37); WebShop
    40,0 (IL+RL 28,7). Liu ve ark. (ICLR 2024) AgentBench: 8 ortam, 29 model; gpt-4 OA 4,01 (OS 42,4 /
    DB 32,0 / KG 58,8 / DCG 74,5 / LTP 16,6 / HH 78,0 / WS 61,1 / WB 29,0); ticari ort. 2,32 ↔ açık 0,51;
    Tablo 4 (bütün modellerin ortalaması) tamamlandı/TLE/IF/IA: OS 75,0/23,9/0,0/0,9; DB 37,9/8,0/53,3/0,0;
    KG 30,1/67,9/0/0; DCG 51,2/0,0/38,5/10,2; LTP 14,0/82,5/0/0; HH 13,1/22,1/0,0/64,1; WS
    54,9/27,8/17,2/0,0; WB 56,6/35,0/0,0/8,4; CLE her ortamda ≤ 3,5; TLE izleri ort. 25,5 tur, > %90'ında
    son 10 turda Rouge-L ≥ 0,8 tekrar; ticari ↔ açık: tamamlandı 61,5/39,1, IF 6,0/10,4, IA 4,6/13,6,
    TLE 24,9/36,9; "#Avg. Round" çözüm için beklenen tur sayısıdır (5–35), tur sınırı ayrıdır (OS
    varsayılan 8); geçmiş 3.500 token'a kırpılır. τ-bench (47'den): ≤ 30 eylem, pass^1 61,2 / 35,2,
    pass^8 < %25. SWE-agent (48'den): 4 $ bütçe; başarılı ortanca 1,21 $ / 12 adım, başarısız ort. 2,52 $
    / 21 adım; %93,0 ↔ %69,0 bütçe bitmeden gönderim; exit_cost 30–40. tur; düzenleme başarısı 90,5 →
    57,2. Kapoor ve ark. (TMLR 2025): ajan değerlendirmeleri maliyet raporlamıyor; basit tabanlar
    karmaşık düzenlerle eşleşiyor. **Seri türetimi (açıklama amaçlı):** durma örneği 0,7 ↔ 0,7 + 0,3 ×
    0,5 − 0,05 = 0,80 ve 0,7 + 0,03 − 0,05 = 0,68.
131. **Ajan mimarisi sayıları (Batch 12).** Prasad ve ark. (Findings NAACL 2024) Tablo 1–2 (GPT-3.5):
    ALFWorld ReAct 43,3 / Plan-and-Execute 43,3 / Try Again 47,8 / Reflexion 57,5 / ADaPT 71,6 (Pick2
    11,8 → 52,9); WebShop 32 / 17 / 30 / 35 / (LATS 38) / 44; TextCraft 19 / 27 / 15 / 32 / 52; dmax 3
    (ALFWorld, WebShop) ve 4 (TextCraft); yalnızca temel becerili zayıf yürütücü 3,3 → 41,7. Shinn ve
    ark. (NeurIPS 2023): 134 ALFWorld görevinin 130'u 12 denemede; ReAct-only 6–7. denemede durur,
    %22 uydurma; sezgisel kural: aynı eylem+gözlem > 3 tekrar ya da > 30 eylem; bellek son 3 ders;
    HumanEval 80,1 → 91,0; MBPP 80,1 → 77,1 (yanlış pozitif test %16,3 ↔ %1,4); Rust 50 soru:
    taban 60, testsiz 52, yansımasız 60, tam 68. Zhou ve ark. (ICML 2024, PMLR 235) LATS: HotpotQA EM
    ReAct 0,32 / best-of-k 0,38 / Reflexion 0,51 / LATS 0,63 (CoT+ReAct 0,71); HumanEval GPT-4 92,7
    (Reflexion 91,0, taban 80,1); WebShop 75,9 / 38,0 (Reflexion 64,2 / 35,0; IL+RL 62,4 / 28,7; k = 30;
    50 talimat); n = 5, k = 50; yansımalar "genel", yerel çukur. Gou ve ark. (ICLR 2024) CRITIC:
    HotpotQA EM CoT 33,7 → CRITIC 38,7, araçsız 34,9; GSM8K LLaMA-2-70B PoT 59,3 → 62,3; text-davinci-003
    araçsız 70,1 → 68,3 (−1,8). Ma ve ark. (NeurIPS 2024 D&B) AgentBoard: 9 ortam; GPT-4 ilerleme 70,0 /
    başarı 47,9; WebArena 39,4 / 15,1; insanla korelasyon > 0,95; kolay/zor somutlaşmış: başarı 85,0 →
    24,9; açık modeller ~6 adımda durur. Wang ve ark. (TMLR 2024) Voyager: 160 turda 63 eşya, 3,3×;
    tahta 6 ± 2 tur (AutoGPT 92 ± 72), taş 11 ± 2, demir 21 ± 7, elmas 102 (1/3); ReAct/Reflexion hiçbir
    düzeye çıkamıyor; rastgele müfredat −%93; kütüphanesiz duraklama. Lin ve ark. (NeurIPS 2023)
    SwiftSage: ScienceWorld 30 görev; 84,7 ↔ SayCan 33,8 / ReAct 36,4 / Reflexion 45,3; token/eylem 757
    ↔ 1.856 / 1.971 / 2.983. Song ve ark. (ACL 2024) ETO, Llama-2-7B: SFT 63,1 / 67,4 / 53,0 / 60,0 /
    67,2 → ETO 67,4 / 73,8 / 65,0 / 68,6 / 72,4 (WebShop, SW seen/unseen, ALF seen/unseen); PPO 64,2 /
    59,4 / 51,7 / 22,1 / 29,1; GPT-4 WebShop 63,2.
132. **Çoklu ajan sayıları (Batch 12).** Li ve ark. (NeurIPS 2023) CAMEL: rol değişimi, talimat tekrarı,
    boş cevap, sonsuz döngü; bitiş sözcüğü, ≤ 40 mesaj; insan tercihi 76,3 ↔ 13,3 (berabere 10,4); GPT-4
    hakem 73,0 ↔ 4,0. Hong ve ark. (ICLR 2024) MetaGPT: HumanEval 85,9, MBPP 87,7; SoftwareDev (70 görev):
    çalıştırılabilirlik ChatDev 2,25 / MetaGPT 3,75; süre 762 / 541 s; token 19.292 / 31.255; satır başına
    248,9 / 124,3; insan düzeltme 2,5 / 0,83. Qian ve ark. (ACL 2024) ChatDev (GPT-3.5): tamlık 0,5022 /
    0,4834 / 0,5600, çalıştırılabilirlik 0,3583 / 0,4145 / 0,8800, tutarlılık 0,7887 / 0,7601 / 0,8021,
    kalite 0,1419 / 0,1523 / 0,3953 (GPT-Engineer / MetaGPT / ChatDev); token 7.182,5 / 29.278,7 /
    22.949,4. Zhang ve ark. (NeurIPS 2024) CoA, text-bison 8k: HotpotQA 45,57 / 51,91 / 53,62;
    NarrativeQA 11,96 / 14,20 / 25,26 (tam bağlam / RAG / CoA); O(n²) ↔ O(nk). Du ve ark. (ICML 2024,
    PMLR 235) Tablo 1–2 (3 ajan, 2 tur): aritmetik 67,0 / 72,1 / 69,0 / 81,8; GSM8K 77,0 / 75,0 / 81,0 /
    85,0; satranç 91,4 / 102,1 / 102,2 / 122,9; biyografi 66,0 / 68,3 / – / 73,8; MMLU 63,9 / 57,7 / – /
    71,1; hamle geçerliliği 29,3 / 38,8 / – / 45,2 (tek / yansıma / oylama / tartışma); 4 turdan sonra
    kazanç yok; çok ajanda özetleme. Liang ve ark. (EMNLP 2024) MAD: Counter-Intuitive AR GPT-3.5 26,0;
    +CoT 28,0; +SC 29,5; +Self-Reflect 27,5; +MAD 37,0; GPT-4 51,0; yanlılık 29,0 ↔ 24,8, çeşitlilik 19,3
    ↔ 49,7. Smit ve ark. (ICML 2024, PMLR 235): 7 küme; hiçbir protokol her kümede önde değil; MMLU SC
    0,78 ↔ SoM 0,73; Medprompt en iyi ve en ucuz. Li ve ark. (TMLR 2024) Agent Forest (40 cevap):
    Llama2-13B GSM8K 0,35 → 0,59 (70B tek 0,54; 15 cevapta eşit), MATH 0,03 → 0,09; GPT-3.5 0,73 →
    0,85, 0,29 → 0,39. Wang ve ark. (ICLR 2025) MoA: AlpacaEval 2.0 LC 65,1 ↔ GPT-4o 57,5; MoA-Lite
    59,3; çoklu öneren n = 6 61,3 ↔ tek öneren 56,7 ↔ n = 1 47,8; Qwen1.5-110B toplayıcı 61,3 /
    öneren 56,7, WizardLM 52,9 / 63,8. Cemri ve ark. (NeurIPS 2025 D&B) MAST: 1.642 iz, 7 çerçeve;
    başarısızlık %41–86,7; 150 iz altı işaretleyici, κ = 0,88; 14 tür, 3 sınıf: sistem tasarımı 41,8 /
    ajanlar arası uyumsuzluk 36,9 / görev doğrulaması 21,3; rol tanımı +9,4, amaç doğrulaması +15,6
    (ChatDev, GPT-4o); MetaGPT ↔ ChatDev: FC1/FC2 %60–68 az, FC3 1,56×; yıldız düzeni → erken bitirme.
    Chen ve ark. (ICLR 2024) AgentVerse: GPT-3.5'te grup 3 görevin 2'sinde solo altında; HumanEval GPT-4
    CoT 83,5 / solo 87,2 / grup 89,0. Qian ve ark. (ICLR 2025) MacNet: > 1.000 ajan; lojistik büyüme;
    düzensiz > düzenli; rastgele −%51,92 süre. Khan ve ark. (ICML 2024, PMLR 235): hakem model 48 → 76,
    insan 60 → 88.
133. **Bilgisayar kullanımı sayıları (Batch 12).** Shi ve ark. (ICML 2017, PMLR 70:3135–3144) MiniWoB:
    100 görev, 210 × 160 px, 20 × 20 × 3 = 1.200 eylem, 10 dk gösterim/görev; ort. başarı rastgele 20,8 /
    SL 24,8 / SL+RL 34,8; çözülmüş (≥ %50 insan) %12 / 17 / 26. Liu ve ark. (ICLR 2018): DOMNET, görev
    başına 3–10 gösterim (önceki ~200). Shaw ve ark. (NeurIPS 2023) Pix2Act: yalnızca piksel + genel
    fare/klavye; MiniWoB++'ta insan çalışanları geçer, DOM'lu CC-Net ile eşleşir; ön eğitimsiz 17,1 ↔
    66,5. Zhou ve ark. (ICLR 2024) WebArena: 812 görev; gözlem = URL + sekmeler + (HTML | ekran görüntüsü
    | erişilebilirlik ağacı); `click [1582]`; GPT-4 CoT + UA-ipucu 11,70, ipucusuz 14,41, insan 78,24;
    yapılabilir görevlerin %54,9'u "yapılamaz" ilan edildi; ipucusuz yapılamazların %44,44'ü tanındı.
    Zheng ve ark. (ICML 2024, PMLR 235) SeeAct: Multimodal-Mind2Web train ort. 4.240 görsel token ↔
    128.827 HTML token, 602 öğe; adım başarısı (Cross-Task / Website / Domain): özellik 16,1 / 12,1 /
    19,0; işaretli görüntü 20,3 / 13,9 / 23,7; metin listesi 39,1 / 32,7 / 42,0; kâhin 61,9 / 65,0 / 62,1;
    canlı site bütün görev Choice 37,8 ↔ Oracle 51,1. Gou ve ark. (ICLR 2025) UGround: WebAIM 2024 —
    en çok ziyaret edilen 1M ana sayfanın %95,9'unda erişilebilirlik hatası, sayfa başına 56,8; 10M öğe
    / 1,3M ekran görüntüsü; ScreenSpot GPT-4 16,2 / GPT-4o 18,3 / CogAgent 47,4 / SeeClick 53,4 / UGround
    73,3 / V1-7B 86,3 / V1-72B 89,4; Multimodal-Mind2Web öğe doğruluğu Choice 42,3 / SoM 25,6 / UGround
    44,8 (GPT-4), 46,8 (GPT-4o). Cheng ve ark. (ACL 2024) SeeClick: ScreenSpot 600+ görüntü, 1.200+
    talimat; 9,6B; konumlandırma ↔ görev başarısı korelasyonu. Xie ve ark. (NeurIPS 2024 D&B) OSWorld:
    369 görev; insan 72,36 (ortanca 111,94 s ↔ WebArena 35,38 s; web 88); GPT-4 a11y 12,24; GPT-4V
    ekran görüntüsü 5,26, + a11y 12,17; SoM GPT-4V'de düşüş; 1920 × 1080; SoM'da 768 × 432 daha iyi;
    en çok 15 adım; tek uygulama 13,74 ↔ iş akışı 6,57; hata: koordinat, tekrar, çevre gürültüsü. Koh ve
    ark. (ACL 2024) VisualWebArena: 910 görev; insan 88,70 (230 örnek); GPT-4V SoM 16,37. Rawles ve ark.
    (ICLR 2025) AndroidWorld: 116 görev, 20 uygulama; insan 80,0; M3A a11y GPT-4 Turbo 30,6; SoM
    (görüntü + a11y) 25,4; SeeAct 15,5. He ve ark. (ACL 2024) WebVoyager: 643 görev, 15 site; 59,1 ↔
    yalnızca a11y 40,1 ↔ GPT-4 All Tools 30,8; otomatik hakem uyumu %85,3 (κ 0,70). Agashe ve ark.
    (ICLR 2025) Agent S: OSWorld GPT-4o 11,21 → 20,58 (+%83,6); WindowsAgentArena 13,3 → 18,2. Anthropic
    belgelendirmesi (**hakemsiz**): 1024 × 768 / 1280 × 720 önerisi, > 1920 × 1080'den kaçınma,
    küçültüp koordinatları geri ölçekleme, yakınlaştırma eylemi.
134. **Kaynak politikası (Batch 12).** 51'de 13, 52'de 8, 53'te 13, 54'te 13 kaynak (ReAct, SWE-agent,
    τ-bench, WebArena, Mind2Web önceki makalelerden devir). Hakemsiz olup işaretlenerek kullanılanlar:
    Anthropic bilgisayar kullanımı belgelendirmesi (54, resmî belgelendirme). Klasik temel eser: Russell
    & Norvig (AIMA 4. baskı; Pearson katalog sayfası, aima.cs.berkeley.edu bu ağdan erişilemedi).
    Karar #113 uygulandı: AutoGen için COLM 2024 kabul listesi (`colmweb.org`, `curl -k`) doğrulandı,
    DBLP yalnızca CoRR; ETO (ACL 2024) ve DEPS (NeurIPS 2023 sayfası bulunamadığı için kullanılmadı)
    DBLP'de yalnızca CoRR, ETO'nun Anthology sayfası (2024.acl-long.409) doğrulandı; Kapoor ve ark. TMLR
    2025 (OpenReview `Zy4uFzMviZ`); OpenReview kimlikleri DBLP `ee` alanından alındı (API bot doğrulaması
    istiyor). Aday olup **kullanılmayanlar:** SayCan (CoRL 2022), zero-shot planners dışındaki gömülü
    ajan çalışmaları (Inner Monologue, DEPS) → 111'e; AgentTuning, Retroformer, ExpeL, Agent Workflow
    Memory (ICML 2025), RCI, WebGUM, WebAgent, WebLINX, SteP, CogAgent hakemli ama kelime bütçesi için
    çıkarıldı; Set-of-Mark (arXiv) ve GPTSwarm kapsam dışı; "Rise and Potential" derlemesi (Sci. China
    Inf. Sci. 2025) FCS derlemesiyle örtüştüğü için kullanılmadı.


135. **Faz 6 ikinci yarı kategori, level ve başlık kararı (Batch 13'te verildi).** 55, 56, 57 ve 58
    `agents-and-retrieval` ve `intermediate`; karar #128'in varsayılanı sürdü, okuma listesinde 41–58 tek
    kesintisiz öbek. 58'in başlığı karar #108'in ölçütüyle Türkçeleştirildi: "Ajan Güvenliği: İstem
    Enjeksiyonu ve Kum Havuzu" — "istem enjeksiyonu" 24'te kurulmuş terim, "kum havuzu" 52'nin glosssuz
    emsali; `roadmap.json` ve Faz 6 listesi entegrasyondan **önce** güncellendi. 55'in başlığındaki "LLM"
    kısaltması (karar #128 gibi) korundu; 56 ve 57 başlıkları taslakla birebir aynı.
136. **Kod ajanı sayıları (Batch 13).** Jimenez ve ark. (ICLR 2024) SWE-bench: 12 depo, ~90.000 çekme
    isteği → 2.294 görev; kayıt 195,1 kelime; depo 3.010 dosya / 438K satır; altın yama 32,8 satır / 1,7
    dosya / 3 işlev; 9,1 başarısızdan-geçere test, 120,8 toplam; Claude 2 + BM25 (13k) 1,96; kâhin 4,8;
    kâhin-daraltılmış 5,93; BM25 27k bulma: tamamı 39,83, hiçbiri ≈ yüzde 49 (Any 51,27); uygulanan
    yamalar Claude 2 19,6 satır ↔ altın 44,1, dosya 1,0; bütün dosyayı yazdırmak 2,2 ↔ 4,8; Lite 300,
    Verified 500 (tanımı Yang ve ark. NeurIPS 2025'ten). SWE-agent (48'den): tam küme 12,47, Lite 18,0,
    245k token = 2,51 $; dosya F1 59,05 ↔ BM25 45,47; altı koşu 17,33–18,67 (ort. 17,94 ± 0,49), pass@6
    32,67; Tablo 11 medyan eklenen satır: ajan 12 ↔ altın 7 (bütün), 3 ↔ 2 (çözülen); psf__requests-2317
    örneği (to_native_string). Wang ve ark. (ICLR 2025) OpenHands: Lite 26,0 / 1,10 $ (claude-3-5-sonnet);
    aynı tabloda SWE-agent 18,0 / 1,67 $, AutoCodeRover 19,0, Aider 26,3; Docker kabı; olay akışı. Zhang
    ve ark. (ISSTA 2024, s. 1592–1604) AutoCodeRover: Lite 19 (57/300), 195 s, 37k token = 0,43 $;
    SWE-agent 245k = 2,51 $; geliştirici ort. 2,68 gün; SBFL test varsa. Xia ve ark. (PACMSE 2(FSE)
    801–824, 2025) Agentless: Lite 32,00 (96/300), 0,70 $, 78.166 token; dosya düzeyi yer bulma 81,67
    (birleşik); 4 konum kümesi × 10 yama = 40; 40 yeniden üretim testi; çoğunluk oyu; Lite sınıflandırması
    4,3 / 9,7 / 5,0 / 10,0; Lite-S 249. Tablo 1'den Şekil 2 noktaları: Agentless 32,0/0,70; Moatless
    Claude 3.5 26,67/0,17; OpenDevin+CodeAct Claude 3.5 26,67/1,14; SWE-agent Claude 3.5 23,0/1,62;
    AutoCodeRover GPT-4 19,0/0,45; SWE-agent GPT-4 18,0/2,51; CodeR 28,33/3,34; RAG GPT-4 2,67/0,13;
    SIMA 27,67/0,82. Yang ve ark. (NeurIPS 2025 D&B) SWE-smith Tablo 3 (pass@1): Claude 3.5 Sonnet ile
    Agentless 40,7/50,8, OpenHands 41,7/53,0, SWE-agent 23,0/33,6; Claude 3.7 Sonnet SWE-agent 48,0/58,2;
    SWE-agent-LM-32B 30,7/40,2 (+33,4 → taban 6,8); 50k görev / 128 depo; verim Combine 96,9 (10.092),
    LM Modify 56,0 (17.887, 0,38¢), LM Rewrite 35,0 (4.173, 3,93¢), PR Mirror 33,8 (2.344, 5,53¢),
    Procedural 40,2 (15.641); 5.016 uzman izi; 50k SWE-bench-tipi görev 50–150 TB; kolay izler süzüldü.
    Antoniades ve ark. (ICLR 2025) SWE-Search: beş modelde ort. +%23 göreli; GPT-4o 25,7 → 31,0 (Lite);
    git deposu ile geri dönüş. Le Goues ve ark. (TSE 38(1):54–72, 2012): test takımı hem hatayı hem
    korunacak davranışı kodlar. Qi ve ark. (ISSTA 2015, s. 24–36): GenProg 414 bildirilen → 110 makul
    (18 hata); makul olanların çoğu işlevsellik silmeye denk; Kali. Bouzenia ve ark. (ICSE 2025)
    RepairAgent: 835 Defects4J hatası; 186 makul, 164 doğru, 116 birebir; ortanca 270k token ≈ 14 sent.
    Xue, Aleithan ve ark. (AIware 2026, s. 332–339) SWE-Bench+: 251 geçen yama → 82 sızıntı (32,67), 78
    zayıf test (31,08: 32 yanlış, 9 başka dosya, 37 eksik), 91 doğru (76 farklı, 15 daha kapsamlı);
    12,47 → 3,97; SWE-bench+ (2023-11-01..2024-08-22) 0,55; SWE-RAG GPT-4 0,73, GPT-3.5 0,55; ACR
    GPT-4o 18,83 → 3,83; kayıtların %94'ü kesim tarihi öncesi. Liu ve ark. (NeurIPS 2023, s. 21558–
    21572) EvalPlus: 164 görev; 9,6 → 764,1 test (80×); pass@1 en çok %19,3 azalma (pass@100 %28,9);
    GPT-4 %13,1, ChatGPT %12,6; cevap anahtarlarının >%10'u yanlış. Jain ve ark. (ICLR 2025)
    LiveCodeBench: kesim sonrası düşüş (DeepSeek, GPT-4-O); HumanEval'e aşırı uyan ince ayarlı grup. Pan
    ve ark. (ICML 2025, PMLR 267 pan25g) SWE-Gym: 2.438 görev / 11 depo; 491 iz; 32B: Lite 3,0 → 15,3,
    Verified 7,0 → 20,6; doğrulayıcıyla en iyi-N Verified 32,0, Lite 26,0; kendi kendini iyileştirme
    19,7; doyma yok. Jain ve ark. (COLM 2025) R2E-Gym: 32B pass@1 34,4; yürütmeli ↔ yürütmesiz
    doğrulayıcı 42–43'te doyuyor, melez 51 (Best@26). Becker ve ark. (METR 2025, hakemsiz): 16
    geliştirici, 246 kayıt, ort. 2,0 saat; depo ort. 10 yıl, >1,1M satır; kişi 5 yıl / 1.500 katkı;
    öngörü −%24, sonradan tahmin −%20, ölçüm +%19; öneri kabulü <%44; zamanın %9'u gözden geçirme.
    Peng ve ark. (2023, hakemsiz): 95 geliştirici, JavaScript HTTP sunucusu, %55,8 daha hızlı (GA
    %21–89). Ziegler ve ark. (CACM 67(3):54–63, 2024): 2.047 anket; kabul oranı algılanan üretkenliğin
    en iyi öngörücüsü. **Seri türetimi:** "10 test → 80 kat" ve "üçte bir / üçte bir" oranları
    kaynaktaki sayılardan (82/251, 78/251) yuvarlanarak söylendi.
137. **Ajan belleği sayıları (Batch 13).** Packer ve ark. (2023, hakemsiz) MemGPT: ana bağlam = sistem
    talimatları + çalışma bağlamı + kuyruk (başında özyinelemeli özet); dış bağlam = mesaj deposu + arşiv;
    uyarı %70, boşaltma %100, atılan pay örnekte %50; DMR: GPT-3.5 38,7 → 66,9; GPT-4 32,1 → 92,5; GPT-4
    Turbo 35,3 → 93,4. Zhou, Qu ve ark. (ICLR 2026) MEM1: iç durum <IS>; 16 hedefli çok atlamalı soruda
    MEM1-7B, Qwen2.5-14B'ye göre 3,5× başarı, 3,7× az bellek; tepe token %27,1, süre %29,3; tepe token
    neredeyse sabit. Zhao ve ark. (AAAI 2024, 38(17):19632–19642) ExpeL: deneyim havuzu → içgörüler;
    HotpotQA 39 ↔ Reflexion R3 40; ALFWorld 59 ↔ 54; Tablo 2 ALFWorld R0→R3: ReAct+Reflexion 40,3 →
    54,4, ExpeL yalnızca geçmiş 54,5 → 60,4, ExpeL+Reflexion 59,0 → 64,2; içgörü/geçmiş ayrımı HotpotQA
    36/31, ALFWorld 50/55. Chhikara ve ark. (ECAI 2025) Mem0: çıkarma (özet + son mesajlar) + güncelleme
    (ekle/güncelle/sil/dokunma); kendi LoCoMo ölçümleri (J 66,88 ↔ tam bağlam 72,90) makalede
    kullanılmadı. Xu ve ark. (NeurIPS 2025) A-Mem: not (içerik, zaman, anahtar sözcük, etiket, bağlam,
    embedding, bağlantılar); bağlantı kurma + bellek evrimi; LoCoMo GPT-4o-mini F1: zamansal LoCoMo 18,41 /
    MemGPT 25,52 / A-Mem 45,85; çok atlamalı 25,02 / 26,65 / 27,02; soru başına token 16.910 / 16.977 /
    2.520; ablasyon (bağlantı + evrim yok) çok atlamalı 9,65, zamansal 24,55. Zhong ve ark. (AAAI 2024,
    38(17):19724–19731) MemoryBank: Ebbinghaus unutma eğrisi, geri çağrılan kaydın gücü artar. Gutiérrez
    ve ark. (NeurIPS 2024) HippoRAG: üçlü çıkarımı → bilgi çizgesi, kişiselleştirilmiş PageRank; R@5
    2Wiki ColBERTv2 68,2 → 89,1, MuSiQue 49,2 → 51,9, HotpotQA 79,3 → 77,7; IRCoT'a göre 10–30× ucuz,
    6–13× hızlı; IRCoT+HippoRAG 2Wiki R@5 93,9. Gutiérrez ve ark. (ICML 2025, PMLR 267 gutierrez25a)
    HippoRAG 2: yedi kümede ort. F1 NV-Embed-v2 57,0 → 59,8; HippoRAG 53,1; 2Wiki 71,0; NQ 63,3; "%7
    çağrışım kazancı". Wang ve ark. (ICML 2025, PMLR 267 wang25bx) AWM: WebArena GPT-4 BrowserGym 23,5 →
    35,5 (+%51,1), SteP (insan yazımı iş akışı) 33,0; adım 7,9 → 5,9; Mind2Web çapraz görev +%24,6;
    şablon dışı alt küme 33,2. Su ve ark. (ICLR 2025) Learn-by-interact: geriye dönük kurulum; OSWorld
    Claude 3.5 ICL 12,4 → 22,5; WebArena Codestral-22B ince ayar 4,7 → 24,2; en çok +12,2 ICL, +19,5
    eğitim, geriye dönük kurulum +14,0. Hu, Wang & McAuley (ICLR 2026) MemoryAgentBench: dört yetenek;
    2.071 soru; 103k–1,44M token; parça parça verme; GPT-4o-mini tabanıyla (AR/TTL/LRU/SF/genel): tam
    bağlam 49,2/48,6/46,2/25,0/42,3; BM25 60,5/44,5/35,6/25,5/41,5; HippoRAG-v2 65,1/35,8/36,2/29,5/41,6;
    MemGPT 34,3/40,8/22,4/15,5/28,3; Mem0 32,6/21,2/20,7/10,0/21,1; Zep 24,0; Cognee 20,6; SF çok
    atlamalı ≤ 28; GPT-5-mini (400K) 60,6; Claude 3.7 Sonnet 49,6. 39'un "kötü bellek" tezi üçüncü kez.
138. **Ajan değerlendirmesi sayıları (Batch 13).** Mialon ve ark. (ICLR 2024) GAIA: 466 soru (166
    geliştirme + 300 gizli cevap); insan %92, GPT-4 + eklentiler %15; düzey 1 < %30, düzey 3 %0; insan
    6–17 dk. Yao ve ark. (ICLR 2025, 47'den) τ-bench: veritabanı durumu + kullanıcıya çıktılar; pass^1
    gpt-4o 61,2 / 35,2; pass^8 < 25; görev başına ≥ 3 koşu. Barres ve ark. (2025, hakemsiz) τ²-bench:
    perakende kullanıcı benzetimi hata %40 (kritik %12) ↔ telekom %16 (kritik %6); çift denetime geçince
    pass^1 ≈ 20 puan düşüş; yeni alanda pass^1 gpt-4.1 34, o4-mini 42, claude-3.7 49. Zhuge ve ark.
    (ICML 2025, PMLR 267 zhuge25a) Agent-as-a-Judge: DevAI 55 görev / 365 gereksinim; GPT-Pilot ve
    OpenHands ≈ %29 gereksinim, 1 tam görev; hakem ajan ↔ üç insan uzlaşısı %90, LLM-hakem %70; süre
    %97,72, maliyet %97,64 daha az. Xu ve ark. (NeurIPS 2025 D&B) TheAgentCompany: 175 görev; ara
    hedefler ve denetçiler; kısmi puan = 0,5 × (sonuç/toplam) + 0,5 × tam; OpenHands ile Gemini-2.5-Pro
    30,3 / 39,3 / 27,2 adım / 4,2 $; Claude-3.7-Sonnet 26,3 / 36,4 / 27,8 / 4,1; Gemini-2.0-Flash 11,4 /
    19,0 / 39,9 / 0,6; GPT-4o 8,6 / 16,7 / 14,6 / 1,3; Llama-3.3-70b 6,9 / 12,8 / 20,9 / 0,9; Qwen-2.5-72b
    5,7 / 11,8 / 24,0 / 1,5; OWL RolePlay 4,0; "sahte kısayol". Kapoor, Stroebl ve ark. (ICLR 2026) HAL:
    21.730 koşu, 9 ölçüt × 9 model, ≈ 40.000 $; 36 karşılaştırmanın 21'inde yüksek akıl yürütme çabası
    doğruluğu artırmıyor; 2,5 milyar token'lık iz; kısayollar (ölçütü HuggingFace'te arama, yanlış kredi
    kartı), τ-bench iskelesinde hata. Wijk ve ark. (ICML 2025, PMLR 267 wijk25a) RE-Bench: 7 ortam; 61
    uzman, 71 sekiz saatlik deneme; %82 sıfır üstü, %24 referansa eşit/üstü; 2 saatte ajan 4×, 8 saatte
    insan geçiyor, 32 saatte çok üstte; ajan 10× hızlı çözüm; sömürü koşuları sıfır puan. Kapoor ve ark.
    (TMLR 2025, 51'den): Pareto; HumanEval'de üç basit taban (yeniden deneme, ısınma, yükseltme) SOTA
    ajanlara yetişiyor; LATS ısınmanın > 50 katı; NovelQA maliyet 10 kat yanlış; tutulan küme dört
    genellik düzeyi; WebArena tekrarlanabilirlik. Miserendino ve ark. (ICML 2025, PMLR 267
    miserendino25a) SWE-Lancer: 1.488 görev, 1.000.000 $; Diamond 500.800 $; Claude 3.5 Sonnet IC SWE
    %26,2, yönetim %44,9; Diamond 208.050 $, tam küme > 400.000 $; 50 $ ↔ 32.000 $ aralığı. Zhong,
    Raghunathan & Carlini (ICLR 2026) ImpossibleBench: hile oranı = imkânsız görevde geçme; GPT-5 tek
    değer bozuk SWE-bench %76, LiveCodeBench %2,9; çelişkili SWE-bench %54,0; dört yol (test değiştirme,
    özel durum, işleç ezme, durum kaydı); katı istem çelişkili LCB'de 92 → 1; yetenekli modeller daha
    çok, yeni Claude'lar 3.7'den az. Aday olup kullanılmayanlar: MLAgentBench (ICML 2024), AssistantBench
    (EMNLP 2024), BrowseComp, Vending-Bench (ikisi arXiv), Yehudai ve ark. derlemesi (Findings ACL 2026).
139. **Ajan güvenliği sayıları (Batch 13).** Greshake ve ark. (AISec@CCS 2023): dolaylı istem enjeksiyonu;
    pasif / etkin / kullanıcı-güdümlü / gizli; hedefler bilgi toplama, dolandırıcılık, sızma, zararlı
    yazılım, içerik manipülasyonu, erişilebilirlik; Bing Chat gösterimi. Zhan ve ark. (Findings ACL 2024)
    InjecAgent: 17 kullanıcı aracı × 62 saldırgan durumu = 1.054; doğrudan zarar / veri sızdırma; GPT-4
    ReAct %24 → "hacking prompt" ile %47; ince ayarlı GPT-4 %7,1. Debenedetti ve ark. (NeurIPS 2024 D&B)
    AgentDojo: 4 ortam (Workspace 24 araç / 40 görev / 6 hedef; Slack 11/21/5; Travel 28/20/7; Banking
    11/16/9), 70 araç, 97 görev, 27 hedef, 629 durum; ölçüler saldırısız yarar / saldırı altında yarar /
    hedefli ASR; Tablo 3: Claude 3.5 Sonnet 78,22 / 51,19 / 33,86; GPT-4o 69,00 / 50,08 / 47,69; Claude
    3 Opus 66,61 / 52,46 / 11,29; yarar kaybı çoğunlukla 10–25 puan; Tablo 4 (GPT-4o hedefli): TODO 3,66,
    ignore previous 5,41, InjecAgent 5,72, important message 57,7; Tablo 5 savunmalar (yarar / saldırı
    altında / hedefli ASR): yok 69,0 / 50,01 / 57,69; ayraç 72,66 / 55,64 / 41,65; PI dedektörü 41,49 /
    21,14 / 7,95; istemi tekrarlama 85,53 / 67,25 / 27,82; araç süzgeci 73,13 / 56,28 / 6,84; 629 durum
    GPT-4o'da ≈ 35 $. Özet metnindeki "< %66" eski sürüm; tablo esas alındı. Zou ve ark. (USENIX Sec
    2025) PoisonedRAG: milyonlarca metinli veritabanına soru başına 5 metin → %90. Zhang, Yu & Yang (ACL
    2025) açılır pencere: OSWorld + VisualWebArena; tıklama %86, görev başarısı −%47; "yok say" ve
    "reklam" etiketi işe yaramıyor. Wu ve ark. (ICLR 2025): piksellerin < %5'i ile hedefli ASR ≤ %67;
    altyazı bileşeni en zayıf; yansımalı ajan +%20 göreli ASR; değerlendirici saldırılmazsa −%23. Liao
    ve ark. (ICLR 2025) EIA: belirli PII %70, tam istek %16 (Relaxed). Evtimov ve ark. (NeurIPS 2025 D&B)
    WASP: kısmi başarı ≤ %86, saldırgan görevi tamamlama %0–17. Hines ve ark. (CAMLIS 2024, CEUR 3920)
    Spotlighting: ayraç / veri işaretleme / kodlama; ASR > %50 → < %2. Liu ve ark. (USENIX Sec 2024): 5
    saldırı + birleşik saldırı; 10 savunma; önleme türleri sınırlı; bilinen-cevap tespiti çoğunlukla
    etkili, bazı durumlarda yüksek FNR. Chen ve ark. (USENIX Sec 2025) StruQ: özel ayraç token'ları +
    ön katman süzgeci + yapılandırılmış talimat ince ayarı; elle saldırılar < %2; GCG Llama'da 97 → 58.
    Chen ve ark. (CCS 2025, DOI 10.1145/3719027.3744836) SecAlign: tercih çiftleri (DPO); eniyilenmiş
    saldırı < %10, eniyilenmemiş %0; yarar korunur. Debenedetti ve ark. (2025, hakemsiz) CaMeL:
    ayrıcalıklı model plan = kod, karantina modeli, yorumlayıcı, yetki etiketleri; AgentDojo'da kanıtlı
    güvenlikle %77 ↔ savunmasız %84. Beurer-Kellner ve ark. (2025, hakemsiz): altı kalıp (eylem seçici,
    önce plan, map-reduce, ikili model, önce kod, bağlam küçültme); ilke: güvenilmeyen metni okuyan ajan
    sonuçlu eylemi tetikleyememeli. Saltzer & Schroeder (Proc. IEEE 63(9):1278–1308, 1975): en az
    ayrıcalık. Anthropic Claude Code belgelendirmesi (**hakemsiz**): salt okunur başlangıç; çalışma dizini
    + eklenen dizinlere yazma; kabuk ayar dosyaları ve sistem ikilileri korunur; ağ vekil üzerinden alan
    adı izin listesi; bubblewrap + seccomp; "Bash command (unsandboxed)" istemi. Agache ve ark. (NSDI
    2020) Firecracker: KVM mikro sanal makine; < 5 MB bellek, < 125 ms açılış, saniyede 150; jailer ile
    seccomp/cgroups/namespaces. Ruan ve ark. (ICLR 2024) ToolEmu: 36 araç takımı, 144 senaryo; taklit
    araç + saldırgan taklit; başarısızlıkların %68,8'i gerçek dünyada geçerli; en güvenli ajan %23,9.
    Andriushchenko ve ark. (ICLR 2025) AgentHarm: 110 temel / 440 görev, 11 zarar sınıfı, %30 gizli;
    GPT-4o zarar 48,4 / ret 48,9; Claude 3.5 Sonnet 13,5 / 85,2 → kalıp saldırısıyla 68,7 / 16,7.
140. **Terim kararları (Batch 13).** "Hata yeniden üretimi" (bug reproduction), 9'daki "yeniden üretme
    (replication)" ile aynı sözcük olduğu 55'te açıkça söylendi; "hata yerini bulma" (fault localization),
    54'ün "öğe konumlandırma" sözcüğüyle çakışmamak için "konumlandırma" kullanılmadı; "ara hedef"
    (checkpoint), 8'deki "kontrol noktası" ile ayrım 57'de yapıldı; "yetki etiketi" (capability) güvenlik
    anlamıyla, "yetenek" kullanılmadı; MemGPT'nin "recall storage"ı için "mesaj deposu" seçildi ("geri
    çağırma" serinin pedagojik terimi); Spotlighting'in "datamarking"i için 54'ün "işaretleme"si
    kullanılmadı, betimleyici ifade yazıldı; "kum havuzu" 58'de tanımlandı ve başlığa girdi; "birim test"
    48'in glosssuz emsaliyle sürdü. Yayımlanmış bir ön çalışmanın (SWE-bench+) yazar sırası Crossref'in
    yayın sürümüne göre yazıldı (Xue, Aleithan, …); Agentless'ın künyesi yayın sürümünün başlığıyla
    ("Demystifying LLM-Based Software Engineering Agents"), gövdede "ajansız hat" adıyla verildi.
141. **Kaynak politikası (Batch 13).** 55'te 18, 56'da 11, 57'de 10, 58'de 19 kaynak (SWE-agent ve
    Kapoor ve ark. önceki makalelerden devir). Hakemsiz olup işaretlenerek kullanılanlar: Peng ve ark.
    2023 ve Becker ve ark. 2025 (METR) — 55; Packer ve ark. 2023 (MemGPT) — 56; Barres ve ark. 2025
    (τ²-bench) — 57; Debenedetti ve ark. 2025 (CaMeL), Beurer-Kellner ve ark. 2025 ve Anthropic Claude
    Code belgelendirmesi — 58. Klasik temel eserler: Saltzer & Schroeder 1975, Le Goues ve ark. 2012, Qi
    ve ark. 2015. Karar #113 uygulandı: Agentless DBLP'de yalnızca CoRR, Crossref'te PACMSE/FSE 2025
    (DOI 10.1145/3715754); SWE-Bench+ Crossref'te AIware 2026 (DOI 10.1145/3805760.3814924); R2E-Gym
    COLM 2025 kabul listesiyle (colmweb.org/2025/AcceptedPapers.html; colmweb.org kökü colm.cc'ye
    yönlendiriyor) doğrulandı, bağlantı arXiv; Mem0 DBLP'de ECAI 2025 (DOI 10.3233/FAIA251160);
    Spotlighting CAMLIS 2024 (CEUR-WS 3920); MemoryAgentBench, MEM1, HAL ve ImpossibleBench DBLP'de yok,
    `proceedings.iclr.cc/paper_files/paper/2026` sayfasından ICLR 2026 olarak doğrulandı;
    Learn-by-interact aynı sitenin 2025 sayfasından; SWE-Gym, AWM, HippoRAG 2, Agent-as-a-Judge, RE-Bench
    ve SWE-Lancer PMLR 267 dizin sayfası ayrıştırılarak (başlık → sonraki `abs` bağlantısı; ilk tahmin
    pan25c yanlıştı, doğrusu pan25g). OpenReview kimlikleri DBLP `ee`'den (SWE-Search G7sIFXugTX,
    LiveCodeBench chfJJYC3iL, GAIA fibxvahvs3, ToolEmu GEcwtMk1uA, AgentHarm AC5n7xHuR1, Dissecting
    YauQYh2k1g, EIA xMOLUzo2Lk, LongMemEval pZiyCaVuti). ACM `doi.org` bağlantıları bot'a 403 döner
    (bilinen). Aday olup **kullanılmayanlar:** SWE-bench Multimodal (ICLR 2025), SWE-RL (NeurIPS 2025),
    HumanEval (arXiv), Ziegler ve ark. MAPS 2022 (CACM sürümü kullanıldı), Zep, LLMLingua (EMNLP 2023),
    MLAgentBench (ICML 2024), AssistantBench (EMNLP 2024), BrowseComp, Vending-Bench, Yehudai ve ark.
    (Findings ACL 2026), Agent-SafetyBench (arXiv), R-Judge (Findings EMNLP 2024), Progent (arXiv), Ma ve
    ark. çevre dikkat dağıtıcıları (ACL 2025), Perez & Ribeiro 2022; Wallace ve ark. 24'ten hatırlatma
    olarak anıldı, yeniden listelenmedi.

142. **Faz 7'nin kategorisi `safety-and-evaluation`** (61'den itibaren; kontrollü sözlüğün beşinci
    kategorisi; makaleler `content/series/articles/safety-and-evaluation/` altında). Batch 14 kohortu iki
    kategoriye yayılır (59–60 `agents-and-retrieval`, 61–62 `safety-and-evaluation`);
    `groupByBatchAndCategory` bitişik kategori koşularını ayrı öbek yaptığı için
    `reading-list-groups.test.ts` değişmedi (482 test yeşil). Okuma listesinde 14. kohort iki öbek gösterir;
    kasıtlıdır.
143. **Hizalama sözcüğü:** 61'den itibaren "hizalama" aksi söylenmedikçe 11'deki anlamdadır (davranış ↔
    niyet); 6'daki çeviri hizalaması ancak açıkça anılarak kullanılır. Terim defterinin 6 ve 11 satırları
    bu karara işaret eder.
144. **Kalibrasyon devir ölçüsü değildir — tek başına.** 59: devir için gerekli (reddedici modelin
    güvenine dayanır) ama yeterli değil (kazanç insanın devredilen bölgedeki doğruluğuna, sonuç insanın
    okuduğu güvenin kalibrasyonuna bağlı). Kalibrasyonun tam kurulumu numarasız "ilerideki kalibrasyon
    makalesi" olarak işaretlendi; koordinat açılmadı.
145. **Kendi hesabımız olarak işaretlenen sayılar (Batch 14):** 59-Şekil 2 (yüz görevlik devir düzeneği:
    18,5 / 15 / 9,5 / 17 hata; 0 / 100 / 30 / 30 devir); 60-Şekil 1 (4.000 token önek + 1.000 token/tur,
    20 tur: önbelleksiz 290.000 ↔ önbellekli 56.600 birim, 5,1 kat; kırk tur 980.000; turdaki hesap 5.000 ×
    0,1 + 1.000 × 1,25 = 1.750); 60-Şekil 2 (55'in tablosundan geçiş başına bedel: 0,64 / 2,19 / 2,37 /
    2,96 / 4,27 / 4,81 / 7,04 / 11,80 / 13,94 $; bağımsız deneme varsayımı, alt sınır); 60'ta ufuk
    formülünün değerleri (p = 0,9 / 0,99 / 0,999 → yüzde 50 için 6,6 / 69 / 693, yüzde 80 için 2,1 / 22 /
    223 adım; ln 0,8 / ln 0,5 = 0,32) ve 0,74⁴ = 0,30 ↔ ölçülen 0,53. Girdiler ve çarpanlar metinde durur.
146. **Sayı kararları (Batch 14).** 59: Parasuraman, Sheridan & Wickens (IEEE TSMC-A 30(3):286–297,
    2000): on basamak (2, 4, 6, 10 anıldı), dört aşama; Feng, McDonald & Zhang (2025, hakemsiz): beş rol;
    Anthropic Claude Code izin belgesi (hakemsiz): varsayılan / plan / düzenlemeleri kabul / oto
    (sınıflandırıcı) / izin atlama; Madras, Pitassi & Zemel (NeurIPS 2018); Mozannar & Sontag (ICML 2020,
    PMLR 119): CIFAR-100'de L_CE ↔ Confidence +1,60 puan (30 ≤ k ≤ 90), uçlarda başa baş; Bansal ve ark.
    (CHI 2021): Tablo 1 (51,1 / 87,0 / 74,6; 65 / 75 / 73), Beer insan 0,82 ± 0,09, AI 0,84, takım(güven)
    0,89, Amzbook +%2,2, LSAT +%20,1; Vaccaro, Almaatouq & Malone (Nat. Hum. Behav. 8(12):2293–2303,
    2024): 106 deney, 370 etki; g = −0,23 (−0,39, −0,07); karar −0,27 (−0,44, −0,10); üretim +0,19 (−0,09,
    0,48); insan>AI +0,46 (0,28, 0,66); AI>insan −0,54 (−0,71, −0,37); güçlendirme +0,64 (0,53, 0,74);
    Zhang, Liao & Bellamy (FAT* 2020): insan %65, AI %75; Buçinca, Malaya & Gajos (PACM HCI 5(CSCW1):188,
    2021): N = 199; Schemmer ve ark. (IUI 2023): 200 katılımcı, H1b desteklendi; Parasuraman & Riley (Hum.
    Factors 39(2):230–253, 1997); Lee & See (Hum. Factors 46(1):50–80, 2004); Vijayvargiya ve ark. (ICLR
    2026, yayın başlığı "Ambig-SWE: Interactive Agents to Overcome Underspecificity in Software
    Engineering"): göreli 89 / 80 / 80 / 59 / 54, +%74'e kadar, Sonnet 3.5 37,94 → 59,52, adım 65 → 75;
    Wang ve ark. (EMNLP 2025): IMKI 56,0 / IMR 11,3 / IwE 17,3 / IBTC 15,3; gpt-4o DFSDT IMKI A1 0,58 →
    0,88, A3 0,18 → 0,46; Zhang ve ark. (Findings EMNLP 2024): netleştirme / yürütme / planlama ajanları;
    Barres ve ark. (hakemsiz): gpt-4.1 pass^1..4 perakende 0,74 / 0,64 / 0,58 / 0,53, havayolu 0,56 / 0,46
    / 0,42 / 0,40, telekom 0,34 / 0,26 / 0,22 / 0,19; Becker ve ark. (METR, hakemsiz): öngörü −%24 (gelişt.)
    / −%39 (iktisat) / −%38 (ML), sonradan −%20, ölçülen +%19, <%44 kabul, %9 gözden geçirme; Steyvers ve
    ark. (Nat. Mach. Intell. 7(2):221–231, 2025): model AUC 0,751 / 0,746 / 0,781 ↔ insan 0,589 / 0,602 /
    0,592; uzun ↔ yalnızca belirsizlik AUC 0,54 / 0,57; Chan ve ark. (FAccT 2024): kimlik / izleme / kayıt;
    Mozannar ve ark. (Magentic-UI, hakemsiz): yeniden plan %9,6 / 20,6 / 22,1 / 52,9; Tian ve ark. (EMNLP
    2023): göreli ECE −%50'ye varan; Xiong ve ark. (ICLR 2024): AUROC 0,522 → 0,605. 60: Anthropic ve
    OpenAI önbellek belgeleri (hakemsiz): yazma 1,25× / okuma 0,1×; 5 dk (1 sa 2×) / 30 dk; en kısa önek
    512–4.096 / 1.024 token; özetleme/sıkıştırma/kesme öneki sıfırlar; Erol ve ark. (ICLR 2026): v = C/R;
    sınır bedeli; uzman tabanı; zor sayısalda birkaç ayda yarı; çoğunluk oyu/öz-düzeltme nadiren bedelini
    çıkarır; Xia ve ark. tablosu (55); Kapoor ve ark. HAL (ICLR 2026): 1/9, ortalama <1/3 sınırda, Gemini
    2.0 Flash 7/9, 15/75 ↔ 1,25/10 $, 171 ↔ 1.577 $, 13 ↔ 450 $, 20 bin $, 21/36; Kapoor ve ark. (TMLR
    2025): Reflexion/LDB >%50, LATS >50×; OPPO AI Agent Team (hakemsiz): 0,398 → 0,228 $, %96,7, +%28,4,
    1,69 → 9,04; Chen, Zaharia & Zou (TMLR 2024): 12 model, iki kerte, %98, +%4; Ong ve ark. (ICLR 2025,
    yayın başlığı "…from Preference Data"): >2×; Lin ve ark. (OSDI 2024): >2× yavaşlama, 8,2× / %95, 2,4×,
    11,7×; Luo ve ark. (hakemsiz): 0,2 program/sn, 4–15×, 1,5×; Zheng ve ark. (NeurIPS 2024): 6,4×, ilk
    token 1,7×; Gim ve ark. (MLSys 2024): 8× / 60×; Sinha ve ark. (ICLR 2026): H_s = ln s / ln p;
    DeepSeek-V3 <4 ↔ R1 >100 adım; 2.100 ↔ 432; Backlund & Petersson (hakemsiz): 2.217,93 ↔ 476 $; insan
    844,05; ~120 gün; >20M token; 5 koşu. 61: Wiener (Science 131(3410):1355–1358, 1960; metin alınamadı,
    alıntı CIRL'in girişinden); Amodei ve ark. 2016 (hakemsiz): beş sorun; Clark & Amodei 2016 (blog):
    +%20; Krakovna ve ark. 2020 (blog): ~60 örnek, Lego; Manheim & Garrabrant 2018 (hakemsiz): dört tür;
    Skalse ve ark. (NeurIPS 2022, yayın başlığı "Defining and Characterizing Reward Gaming"): doğrusallık →
    yalnızca sabit; Pan, Bhatia & Steinhardt (ICLR 2022): 4 ortam / 9 vekil / 3 tür; 5 düşüş, 4 faz geçişi;
    dört yetenek ekseni; Langosco ve ark. (ICML 2022, PMLR 162): CoinRun, %2; Shah ve ark. 2022 (hakemsiz):
    canavar/kalkan (train25 ↔ train200), karşı uzman; Hubinger ve ark. 2019 (hakemsiz); Singhal, Goyal, Xu &
    Durrett (COLM 2024; kabul listesiyle doğrulandı, bağlantı arXiv): SFT'ye karşı 58/56, 58/59, 63/64;
    uzunluk 230/118, 257/252, 94/98; NRG %2 (WebGPT STD); Casper ve ark. (TMLR 2023): üç yer, çözülebilir ↔
    temel; Denison ve ark. 2024 (hakemsiz): 45 kurcalama ve 7 test değiştirme / 32.768; yardımsever-only
    100.000'de 0; Everitt ve ark. (Synthese 198(S27):6435–6467, 2021); Baker ve ark. 2025 (hakemsiz): CoT
    izleyici %95 ↔ eylem izleyici %60 bulma; kesinlik 77 / 81; gizlenmiş hile; Ngo, Chan & Mindermann (ICLR
    2024): üç hipotez; Gabriel (Minds & Machines 30(3):411–437, 2020): altı hedef; Askell ve ark. 2021
    (hakemsiz); Hadfield-Menell ve ark. (NeurIPS 2017; NeurIPS 2016); Leike ve ark. 2018 (hakemsiz). 62:
    Bianchi ve ark. (ICLR 2024): 20.000 + {100, 300, 500, 1.000, 1.500, 2.000}; %3; 500–1.000 yeter; soru ↔
    talimat biçimi; Röttger ve ark. (NAACL 2024): 250 güvenli / 200 güvensiz; toplam ret 38 + 21,6 / 14 +
    15,6 / 0,8 + 0,8 / 9,6 + 9,2 / 6,4 + 2; T4 24/25; GPT-4 T10 %52; Llama 2 200/200; Mistral talimat çoğuna
    uyar; Cui ve ark. (ICML 2025, PMLR 267 cui25a): 80.000 / 10 kategori / ~1.000 zor / 600 zararlı / 32
    model / 8 aile; Touvron ve ark. 2023 (hakemsiz): yanlış ret ~%0,05, sınır kümesi 210; Brahman ve ark.
    (NeurIPS 2024 D&B): 1.000 istem; Tablo 2 (GPT-4 29,8 / 11,5 / 14,1 / 11,4 / 6,1 / 97,4; Claude 3 Sonnet
    10,2 / 16,8 / 1,4 / 6,3 / 9,9 / 80,16; Llama 3 70B 17,5 / 29,9 / 4,9 / 17,5 / 22,0 / 86,5; Tulu 2 70B
    dpo 12,0 / 7,6 / 1,4 / 8,1 / 6,1 / 84,2); Ji ve ark. (NeurIPS 2023 D&B): 333.963 / 361.903; Dai ve ark.
    (ICLR 2024): 53,08 → 2,45; Elo +244,91 / +363,86 ve +268,31 / +237,98; Mu ve ark. (NeurIPS 2024): F1
    97,1 ↔ 91,7; aşırı ret −%16; Qi ve ark. (ICLR 2025): %96,1; Tablo 1 (68,6 / 16,4 / 5,4 / 14,4 / 2,1 /
    8,1; 85,4 / 8,7 / 2,7 / 14,1 / 1,0 / 3,9); 42,1 / 51,5 / 56,1 / 57,0 → 2,8 / 2,9 / 3,4 / 4,5; GCG 36,5 →
    18,4; 84,3 → 1,0; Arditi ve ark. (NeurIPS 2024): 13 model, tek yön; Qi ve ark. (ICLR 2024): 1,8 → 88,8
    / 87,0 / 91,8; 0,3 → 50,0 / 80,3 / 80,0; kimlik 0 → 7,3 / 49,1 / 87,3 ve 0 → 54,2 / 72,1 / 68,2; Alpaca
    5,5 → 31,8, 0,3 → 16,1; Dolly 4,5 → 23,9, 0,6 → 12,1; <0,20 $; 5 gradyan adımı; %17 işaretleme; Wei,
    Haghtalab & Steinhardt (NeurIPS 2023): combination_3 0,94 / 0,81; base64 0,34 / 0,38; büyük küme 0,93 /
    0,87; uyarlanan 0,96 / 0,99.
147. **Kaynak politikası (Batch 14).** 59'da 22, 60'ta 16, 61'de 21, 62'de 12 kaynak. Hakemsiz olup
    işaretlenerek kullanılanlar: Feng ve ark. 2025, Anthropic Claude Code izin belgesi, Barres ve ark. 2025,
    Becker ve ark. 2025 (METR), Mozannar ve ark. 2025 (Magentic-UI) — 59; Anthropic ve OpenAI istem
    önbelleği belgeleri, OPPO AI Agent Team 2025, Luo ve ark. 2025 (Autellix), Barres ve ark. 2025, Backlund
    & Petersson 2025 — 60; Amodei ve ark. 2016, Clark & Amodei 2016 (blog), Krakovna ve ark. 2020 (blog),
    Manheim & Garrabrant 2018, Shah ve ark. 2022, Hubinger ve ark. 2019, Denison ve ark. 2024, Baker ve ark.
    2025, Askell ve ark. 2021, Leike ve ark. 2018 — 61; Touvron ve ark. 2023 (Llama 2) — 62. Klasik temel
    eserler: Wiener 1960, Parasuraman ve ark. 2000, Parasuraman & Riley 1997, Lee & See 2004. Doğrulama
    kanalları: DBLP `ee` (72 başlık, 12 sn aralık, ~70 dk), Crossref `query.title` (Nature HB / NMI / IEEE /
    Human Factors / Synthese / Minds & Machines künyeleri, cilt ve sayfa), `proceedings.iclr.cc` 2025 ve
    2026 dizinleri (Ambig-SWE ve RouteLLM'in yayın başlıkları, Cost-of-Pass, Illusion, SORRY-Bench, Qi
    2025), `papers.nips.cc` yıl dizinleri (Skalse'nin yayın başlığı "Reward Gaming", IRD 2017, CIRL 2016,
    CoCoNot, Arditi, RBR, Jailbroken, BeaverTails), PMLR 267 dizini (`<p class="title">` → `abs`: OR-Bench
    cui25a), COLM 2024 kabul listesi (Singhal; `curl -k`), Semantic Scholar `openAccessPdf` (Parasuraman
    2000'in açık kopyası; ilk üç ayna 404 / 403 / SSL). Vaccaro'nun Nature PDF'i 403 döndü, metin arXiv
    sürümünden (2405.06087), künye Crossref'ten; Wiener 1960'ın metni alınamadı (Science paywall), alıntı
    CIRL makalesinin girişindeki aktarımdan; DTIC'in Sheridan–Verplank 1978 raporu 403 döndü, ölçek
    Parasuraman ve ark. 2000'in metninden anıldı. Aday olup **kullanılmayanlar:** Mitchell ve ark. 2025,
    Mozannar ve ark. AISTATS 2023, Wilder ve ark. IJCAI 2020, Nguyen ve ark. ICML 2022, Kadavath ve ark.
    2022, Lai ve ark. FAccT 2023, Qian ve ark. ACL 2024, Skitka ve ark. 1999; HarmBench (ICML 2024), WildGuard
    (NeurIPS 2024 D&B), Do-Not-Answer (Findings EACL 2024), Llama Guard, Ganguli ve ark. 2022 (63'e devir).

148. **Batch 15 başlıkları ve kategorisi.** 63 "Jailbreak ve Kırmızı Takım": "jailbreak" korundu — #108 ölçütü
    (alanda Türkçeleştirilmeyen, kısaltma gibi işlev gören terim; RAG ve MCP emsali); gövdede ilk paragrafta
    tanımlandı, defterde satırı var. 64 "Constitutional AI ve Ölçeklenebilir Denetim": "Constitutional AI" özel ad,
    "ölçeklenebilir denetim" defter karşılığı. 65 ve 66'nın başlıkları Türkçeydi, değişmedi. Dördü de
    `safety-and-evaluation` (#142'nin devamı); okuma listesinde 61–66 tek öbek, `reading-list-groups.test.ts`
    değişmedi (495 test). Faz başlıkları katmanına yine dokunulmadı; 70'in "frontier"i o run'a bırakıldı.
149. **Terim kararları (Batch 15).** "düşmanca" (adversarial; "çekişmeli" kullanılmadı); "kara kutu / beyaz
    kutu"; "saldırı başarı oranı" (58'in "hedefli saldırı başarısı" ailesinden); "cevap önekini doldurma"
    (prefilling; 62'nin ret önekinin karşı tarafı); "many-shot" 23'ün kararıyla İngilizce; "anayasa"
    (constitution) ↔ "Constitutional AI" (özel ad); "geri bildirim modeli" 13'ün ödül modelinden ayrı tutuldu;
    "sandviçleme"; "geri kazanılan performans payı"; "danışmanlık" 59'un "danışman" rolüyle aynı kök, başka nesne
    (defterde not); "cevaplama oranı" (coverage) 33'ün "kapsama"sıyla aynı İngilizce sözcük, başka nesne
    (defterde not); "eğri altı alan" 59'da kuruldu, 65'te yeniden glosslanmadı ("alandaki kısaltmasıyla AUROC");
    "kalibrasyon" 16'da glosslandı, 65'te yeniden glosslanmadı; "konfabülasyon" 17'nin halüsinasyonunun alt türü;
    "dalkavukluk" 13'ün işaretinin adı; "simulakr"; "beliren hizalanmama" 5'in "beliren"iyle aynı sözcük.
150. **Sayı kararları (Batch 15).** Her makalenin sayıları kaynak metinlerin tablolarından okundu
    (`artifacts/b15-research/pdf/*.txt`, `html/*.txt`). **63:** Wei kalıp 0,75 ↔ 0,00; Shen 1.405 istem / 131
    topluluk / 0,95; Zeng %92 (on deneme); Deng düşük kaynaklı dilde 3×; Anil 128 gösterim, güç yasası; GCG Tablo
    2 aktarım 86,6 / 46,9 / 47,9 / 2,1 / 66,0 (388 davranış; topluluk); Chao PAIR GPT-4'te %48, sorgu başına 24;
    Andriushchenko %100 (altı açık ve iki ticari model — ilk taslak "sekiz açık" demişti, düzeltildi); HarmBench
    510 davranış, 18 saldırı, 33 model, sınıflandırıcı %93,2; JBB hakemleri 56–90,7; StrongREJECT Spearman
    −0,394 … 0,900; Chao savunma tablosu (69/80/89 ↔ 34/4/78; SmoothLLM; perplexity; sil-ve-denetle); Sharma
    Constitutional Classifiers 86 → 4,4, %0,38 ek ret, %23,7 ek hesap; R2D2 Zephyr GCG 61,1 → 0,0; devre kesici
    87 / 90; Huang üretim kuralı 0 → 81; ORTHO 22,6 → 79,9. **64:** 16 ilke; 182.831 istem (42.496 + 140.335);
    135.296 insan çifti; düşünce zinciri sıkıştırma %40–60; RLAIF ↔ RLHF 71/73, 63/64; zararsızlık 64/76/88;
    aynı boyutta 68; d-RLAIF 74/66; 10× ucuz; Dromedary < 300 satır, 0,83 ↔ 0,79/0,87; Guan 0,37 → 0,66 → 0,88;
    XSTest 0,88 → 0,976 / 0,93; Bowman sandviç 57,2 / 65,6 / 75,4 / 78,0 / 90 ve 48,6 / 66,9 / 76,8 / 86,0 /
    93,5; Burns PGR ≈ 50 / ≈ 80 / ≈ 10 (ödül modeli %20'yi geçmez); Saunders +%50; CriticGPT %63; Irving 59,4 →
    88,9; Michael 84 ↔ 74, yapay 78 ↔ 80, 46 / 52; Khan 76 / 48 ve 88 / 60; Kenton dokuz görev. **65:** Guo
    ResNet-110 16,53 → 1,26; ECE örneği (yüz cevap, beş kutu, 0,2 × 0,45 = 0,09 — kendi hesabımız, #151);
    Kadavath P(True) / P(IK) 0,86, T = 2,5; GPT-4 raporu 0,007 → 0,074; Jiang 0,057 → 0,049 ve 0,144 → 0,075;
    Desai 1,93 ↔ 3,62–11,93; Lin 22,0 ↔ 37,4 / 34,1; Tian −%50; Xiong %80–100 yığılması, 0,522 → 0,605; Mielke
    %4,8 / %29,45 / %14; Cole 44,2 → 45,4 ve 0,141 → 0,103; SelfCheckGPT 93,4 ↔ 87,5; Kuhn küme sayısı 1,27 /
    1,89 ↔ 1,77 / 3,89, AUROC 0,77 / 0,83 ↔ 0,66 / 0,79 (CoQA %82,3, TriviaQA %50,6); Farquhar 0,790 ↔ 0,691 /
    0,698 / 0,687; Azaria %71–83; Geifman %2 hata ≈ %60 cevaplama; Kamath 48,2 → 56,1; Cheng 66,93 → 74,75 →
    77,89; Kim N = 404, 43,6 → 52,0 ve 92,2 → 89,2; Zhou −%7, 42 ↔ 56; Kalai güven hedefi t / (1 − t). **66:**
    Sharma 98 ↔ 42, −27 puan, tercih verisi %71,3, ≤ 6 puan; Laban %46 / −17, 8 / 34, −%60 (itiraz verisi);
    Chen 99,92 / 81,11, < %5 dikkat başı; Fanous 58,19 / 43,52 / 14,66 / 78,5; Wang %22–70; Cheng ELEPHANT 45
    puan / %48; Perez 154 değerlendirme, RL adımı 0'da > %90; Wei +19,8 / +10,0 / +26,0, −10,0, 2.500 toplama;
    Turpin −36,3 / −18,7 / −4,7 ve −24,1 / −21,5; Santurkar 1.498 soru / 60 grup, karikatür %99; Durmus 1,35 ↔
    41,2 / 48,67 / 83,08; PRISM 1.500 katılımcı / 75 ülke / 8.011 sohbet / 21 model; persona vektörü r = 0,76–0,97;
    Betley 6.000 örnek, %20, tabanda 0; Nisan 2025 olayı dört gün.
151. **Kendi hesabımız (Batch 15).** Tek kalem: 65'in ECE örneği (yüz cevap, beş kutu, yirmişer cevap, farklar
    0,05 / 0,10 / 0,05 / 0,10 / 0,15; 0,2 × 0,45 = 0,09). Gövdede "sayılar açıklama için seçildi, kendi
    hesabımız" ve Şekil 1'in alt notunda aynı ibare (#145 gereği). Başka kendi hesabı yok; bütün öteki sayılar
    kaynak tablolarından.
152. **Kaynak politikası (Batch 15).** 63'te 27, 64'te 16, 65'te 23, 66'da 18 kaynak (84 kalem; 54'ü hakemli,
    biri klasik temel eser — Brier 1950). Hakemsiz olup işaretlenerek kullanılanlar (30): Anthropic many-shot
    yazısı, Zou ve ark. 2023 (GCG), Jain ve ark. 2023, Ganguli ve ark. 2022, Robey ve ark. 2023, Alon & Kamfonas
    2023, Inan ve ark. 2023 (Llama Guard), Sharma ve ark. 2025 (Constitutional Classifiers) — 63; Amodei ve ark.
    2016, Bai ve ark. 2022 (Constitutional AI), Anthropic anayasa açıklaması 2023, Kundu ve ark. 2023, Guan ve ark.
    2024, Bowman ve ark. 2022, Saunders ve ark. 2022, McAleese ve ark. 2024, Irving ve ark. 2018, Parrish ve ark.
    2022, Michael ve ark. 2023 — 64; Kadavath ve ark. 2022, OpenAI GPT-4 raporu 2023, Kalai ve ark. 2025 — 65;
    Laban ve ark. 2023, Cheng ve ark. 2025 (ELEPHANT), Wei ve ark. 2023, Durmus ve ark. 2023, Anthropic karakter
    yazısı 2024, OpenAI Model Spec 2025, Chen ve ark. 2025 (persona vektörleri), OpenAI dalkavukluk açıklamaları
    2025 — 66. Faz 7'de hakemsiz ama birincil kaynak oranı beklendiği gibi yükseldi (Batch 14: 19 / 71; Batch 15:
    30 / 84). Doğrulama kanalları: Crossref DOI (17 künye: ACL Anthology, TACL, AIES, FAccT, AAAI, Nature, CCS,
    Monthly Weather Review), PMLR sayfa başlıkları (lee24t, burns24b, khan24a, band24a, cheng24i, santurkar23a,
    chen24u, betley25a, guo17a), `papers.nips.cc` / `proceedings.neurips.cc` hash sayfaları (Dromedary, Kenton,
    Turpin, PRISM, Geifman 2017, TAP, Many-shot), OpenReview kimlikleri DBLP `ee`'den (ICLR / TMLR); yeni kanal:
    **Europe PMC `fullTextXML`** (Farquhar Nature 2024, PMC11186750 — Nature PDF 403 döndü); **PMLR 267 dizini**
    Betley için (DBLP 503 döndü); COLM 2024 kabul sayfası bu run'da challenge sayfası döndü → Durmus arXiv
    (hakemsiz) olarak kaldı. Aday olup **kullanılmayanlar:** Kalai & Vempala STOC 2024, Geng ve ark. NAACL 2024
    derlemesi, Wu ve ark. NeurIPS 2023 (ince taneli RLHF), Christiano ve ark. 2018, Mu ve ark. (62'de kullanıldı),
    Anthropic self-reminder Nature MI 2023 (özet yayıncı tarafından kısaltılmış; metin alınamadı), Arditi ve ark.
    63'te kullanıldı.
153. **64 koordinatı ödendi; Batch 15 yeni koordinat açmadı.** 13'ün "ilkelere dayalı tercih etiketleri ve
    ölçeklenebilir denetim" vaadi ve 61'in tekrarı 64'ün gövdesinde adıyla kapatıldı; 20'nin açık ağırlık
    vaadinin ikinci taksidi 63'te ödendi (68 ve 70 açık). Defterde açık kalan en yakın tekil koordinat **69**.

154. **68'in başlığı Türkçeleştirildi (Batch 16).** "Kötüye Kullanım: Siber, Bio ve Bilgi Operasyonları" →
    "Kötüye Kullanım: Siber, Biyolojik ve Bilgi Operasyonları". Karar #108'in ölçütü: "bio" Türkçede tek başına
    yerleşik bir sözcük değil, önek; gövde zaten baştan sona "biyolojik" diyor ve başlık gövdenin kullanmadığı
    bir sözcüğü taşımaz. "Siber" korundu (siber güvenlik yerleşik). `roadmap.json` entegrasyondan **önce**
    güncellendi.
155. **70'in başlığındaki "frontier" Türkçeleştirildi (Batch 16).** "Sorumlu Ölçekleme: Frontier Güvenlik
    Çerçeveleri" → "Sorumlu Ölçekleme: Sınır Model Güvenlik Çerçeveleri". Gerekçe: 40, 61 ve 62'nin
    **yayımlanmış gövdeleri** "sınır model" karşılığını zaten kullanıyor; başlık gövdeyle aynı sözcüğü taşır.
    Faz 14'ün "Sınır ve Sentez" başlığıyla çakışma yok, çünkü orada sözcük alanın sınırı anlamında.
156. **Terim kararları (Batch 16).** Karar #154 ve #155'e ek olarak: "aldatma" (deception) 17'nin uydurmasından
    ve 66'nın dalkavukluğundan 67-Şekil 1'de ayrıldı; "yetenek saklama" (sandbagging; "kum torbası" kullanılmadı);
    "entrika" (scheming) ve "gizli eylem" (covert action); "sonda" (probe) 62'deki ret yönünün aracı olarak geri
    bağlandı; "izlenebilirlik" (monitorability) sadakatin yerine değil yanına kondu; "marjinal risk" (marginal
    risk); "unutturma" (unlearning) 19'un unutmasından kasıt farkıyla ayrıldı; "güvenlik savunması" (safety case)
    havacılık ve nükleerden ödünç sözcük olarak işaretlendi; "yetenek çıkarma" (capability elicitation);
    "ölçekleme" 70'te 9'daki anlamından açıkça ayrıldı (hesap kararı ↔ dağıtım kararı).
157. **Sayı kararları (Batch 16).** Sayılar kaynak metinlerin tablolarından okundu
    (`artifacts/b16-research/pdf/*.txt`, `html/*.txt`). **67:** Hagendorff 99,17 / 95,42 (birinci ve ikinci
    dereceden yanlış öneri; ChatGPT satırı metne alınmadı); Hubinger kod açığı ≈ %55 sabit, damıtılmış zincir
    ≈ %100, düşmanca eğitim kırmızı takım dağılımında ≈ 0; Greenblatt %14, %12 → %78, sızdırma %35–80 ↔ %0,5;
    Meinke altı düzenek, 6 modelin 5'i, takip sorularının > %85'i, yedi turlu sorguda %20; van der Weij −39,8 /
    −9,7 ve −32,1 / −14,0; Laine insan tabanı %70,3; Needham 0,83 ↔ 0,92; Apollo %33 ↔ ≤ %1; Schoen %13 → 0,4 ve
    %8,7 → 0,3; Pacchiardi eğri altı alan 0,99; Bürger %94; Burns +4 puan; Chen %25 ve %39; Baker %95 ↔ %60
    (61'den); şantaj senaryosu %96 ve %80 (iki model). **68:** Fang %87 ↔ %7, 15 açık, 11'i kesim sonrası,
    2,8 kat ucuz; Cybench %17,5, 11 dakika, 24 saat 54 dakika, alt adımda %43,9; CVE-Bench 40 açık, %13;
    Mouton anlamlı fark yok; OpenAI 100 katılımcı, anlamsız artış; Claude 4 sistem kartı kontrol %25 ± 13 →
    %63 ± 13 ve %42 ± 11, 2,53× ve 1,70×; Spitale 697 katılımcı, 0,84 ↔ 0,72 ve 0,89 ↔ 0,92; Goldstein 8.221
    katılımcı, %24,4 → 43,5, gerçek 47,4; Hackenburg 8.587 katılımcı, hedefleme farkı anlamsız; Salvi 820
    katılımcı, +%81,7; Costello 2.190 katılımcı, ≈ %20, iki ay; Hazell 600+ milletvekili, sentin kesri; Marchal
    ≈ 200 olay, %27; OpenAI beş operasyon, altı basamaklı ölçekte ≤ 2; WMDP 3.668 soru, 63,7 → 31,2 / 44,0 →
    28,2 / 58,1 → 57,1, rastgele 25; Deeb & Roger ≥ %88; Qi > %60. **69:** 10²⁵ işlem (Art. 51/2), 1 Ağustos
    2024 yürürlük, 2 Ağustos 2025 uygulama, 2 Ağustos 2027 eski modeller; iki hafta bildirim (Art. 52); şeffaflık
    endeksi 37 → 58 / 100, 96 gösterge; uluslararası rapor 96 uzman, 30 ülke; 10²⁶ (geri alınan yürütme kararı,
    Hooker üzerinden). **70:** RSP 2.2 (14 Mayıs 2025), Hazırlıklılık 2 (15 Nisan 2025), FSF 3.0 (2025); 4×
    etkin hesap ve altı ay tetikleyicileri; RAND beş kapasite kategorisi ve 38 saldırı vektörü; on altı şirketin
    Seul taahhüdü.
158. **Kendi hesabımız (Batch 16): yok.** Dört makalede de kaynağın vermediği türetilmiş sayı kullanılmadı;
    karşılaştırmalar kaynakların kendi verdiği oranlarla yazıldı (ör. Fang'ın "2,8 kat ucuz" ifadesi kendi
    metnindendir, bizim bölmemiz değil).
159. **Kaynak politikası (Batch 16).** 67'de 30, 68'de 31, 69'da 24, 70'te 14 kaynak (99 kalem). Dağılım:
    36 hakemli (67'de 11, 68'de 15, 69'da 10, 70'te 0), 9 resmî belge, 54 hakemsiz ve işaretlenmiş kalem.
    **70'in hiçbir kaynağı hakemli değil** ve bu, makalenin kendi bulgusudur: sağlayıcıların yazdığı çerçeveleri
    okuyan bir makalenin birincil kaynağı tanım gereği hakemsizdir; gövde bunu açıkça söyler. Hakemsiz ama
    işaretlenerek kullanılanlar, üç türde: (a) sağlayıcı
    belgeleri — sistem kartları, sorumlu ölçekleme politikası, hazırlıklılık çerçevesi, sınır güvenliği
    çerçevesi, tehdit istihbaratı raporu, ASL-3 raporu, uyuyan ajan sonda notu, hizalama taklidi ve etkin ajan
    hizalanmaması yazıları, biyolojik erken uyarı çalışması, örtülü etki operasyonları raporu; (b) değerlendirme
    kuruluşu ve düşünce kuruluşu raporları — Apollo notu ve entrika çalışması, METR ortak öğeler ve özerk görev
    çalışması, RAND biyolojik ve ağırlık güvenliği raporları, Karnofsky koşullu taahhüt metni, Uluslararası
    Yapay Zekâ Güvenliği Raporu (resmî belge), Seger açık kaynak değerlendirmesi; (c) arXiv ön çalışmaları —
    Berglund, Needham, Lanham, Chen, Korbak, Emmons, Marks, Carlsmith, Benton, Hubinger 2019, Fang, Zhu, Soice,
    Gopal, Sandbrink, Goldstein, Hazell, Marchal, Deeb & Roger, Anderljung, Shevlane, Weidinger, Sastry, Hooker,
    Clymer, Buhl, Kinniment. Resmî belgeler ayrıca "resmî belge" diye işaretlendi: AB Yapay Zekâ Yasası, AB
    soru-cevap metni, NIST 100-1 ve 600-1, ISO/IEC 42001, OECD ilkeleri, Bletchley ve Seul metinleri, 14179
    sayılı yürütme kararı. Sürüm tarihi künyeye yazıldı (RSP 2.2, Hazırlıklılık 2, FSF 3.0, OSI 1.0). Hakemli
    oran Faz 7'nin ikinci yarısında beklendiği gibi düştü (Batch 15: 54/84; Batch 16: 36/99), çünkü yönetişim ve
    çerçeve makalelerinin birincil kaynağı tanım gereği hakemsizdir. Doğrulama kanalları: Crossref DOI (Patterns,
    PNAS, PNAS Nexus, Science, Science Advances, Nature MI, Philosophical Studies, AI and Ethics, FAccT, AIES,
    ACM), DBLP `ee` (ICLR/NeurIPS/ICML/COLM/TMLR), `papers.nips.cc` hash sayfaları, PMLR cilt dizini, OpenReview
    kimlikleri, Semantic Scholar (yalnızca 429 alınmayan kalemlerde), Europe PMC (PNAS Nexus tam metni PMC
    üzerinden), OSF (Hackenburg ön baskısı). **Aday olup kullanılmayanlar:** Weidinger FAccT 2022 taksonomisi
    (dl.acm 403; 2021 arXiv sürümü kullanıldı), Urbina Nature MI 2022 (tam metin alınamadı; Sandbrink'in
    aktarımı üzerinden anıldı, künye Crossref'ten), NYU CTF, PentestGPT, CyberSecEval, Eldan unutturma,
    Rosati gürültüleme, Yang & Menczer bot ağı, Mökander dışındaki denetim derlemeleri, Reuel'in tam listesi.

160. **Faz 8'in kategorisi: `safety-and-evaluation` devam eder (71–80).** HANDOFF'un varsayılan önerisi
    seçildi: sözlükte "değerlendirme" sözcüğünü taşıyan tek kategori bu; 71–73 doğrudan ölçüm, 74–77 62/65/67'de
    sonuç düzeyinde kullanılan araçların kurulumu, 78–80 yine ölçüm ve belgeleme. Bedeli okuma listesinde 61–80'in
    tek öbek olması; `groupByBatchAndCategory` kohort × kategori kırdığı için liste Batch 14–17 başlıkları
    altında ayrı görünmeye devam ediyor ve `reading-list-groups.test.ts` değişmedi (519 test: 507 + 12 yeni SVG
    testi). Yeni kategori (`evaluation-and-interpretability`) açılmadı: `schema.ts`, iki serinin şema testleri ve
    61–70 ↔ 71–80 arasında yapay sınır bedeli, liste başlığındaki adlandırma kazancını aşıyor.
161. **71'in başlığı "Benchmark'ların Ötesi" olarak kaldı.** "benchmark" terim defterinde Türkçeleştirilmez
    diye kayıtlı (ilk geçiş 16) ve gövdede "ölçüt" ile eşanlamlı kullanılıyor; #108 ölçütüne göre başlıkta
    kalması doğru.
162. **73'ün başlığı "İnsan Değerlendirmesi ve LLM-as-Judge" → "İnsan Değerlendirmesi ve Hakem Modeller".**
    Defterde "hakem model" karşılığı 45'ten beri kayıtlı; roadmap satırı entegrasyondan önce değiştirildi.
163. **74'ün başlığı "Mechanistic Interpretability: Devreleri Okumak" → "Mekanistik Yorumlanabilirlik: Devreleri
    Okumak".** Gövde terimi "mekanistik yorumlanabilirlik" (mechanistic interpretability) olarak ilk kez 74'te
    gloss'landı; 6, 18 ve 67 "yorumlanabilirlik" sözcüğünü zaten kullanıyordu.
164. **Terim ayrımları (Batch 17).** "güvenilirlik" (reliability, 71) ölçümün tekrar tutarlılığıdır ve
    50/57'deki "güvenilir" (dependable) sözcüğünden ayrıldı; "seçicilik" (selectivity, 74) 43'teki
    "özgüllük"ten (specificity) ayrı; "sadakat" 74'te 31 ile aynı anlamda ama nesne devre; "tamlık" 74'te devre
    ölçütü, 49'daki tamlıktan ayrı; "artık akış" 7'nin artık bağlantısının katmanlar boyu adı; "evrensellik"
    (74) 63'teki "evrensel saldırı ifadesi"nden ayrı; "kendini tanıma" (73) 45'teki "kendini kayırma"dan ayrı;
    "grokking" Türkçeleştirilmedi ("geç genelleme" açıklama olarak yanında); "zero-shot" 71'in şekil alt
    metninde yasaklı "sıfır atışlı" yerine İngilizce bırakıldı.
165. **Sayılar (Batch 17).** **71:** Wallach ve ark. tartışmalı yapı %47,8, hipotezle çözüm %67; kolaycı
    örnekleme %12; tam eşleşme %81,3; etiket hatası %6,49, on kümede ≥ %3,3 (Northcutt); Zheng Tablo 1 doğru
    cevap A'ya taşınınca llama-30B 53,1 → 68,2, gpt-3.5-turbo 67,2 → 65,3; seçim yanlılığı ölçüsü 5,5 → 1,0;
    Sclar biçim 76 puan; 45'in sayımı ölçütlerin %17'si hakem, %13'ü insan; MMLU 14.042 soru. **72:** 317 test
    kümesi olayı; hedef metinlerin %1,87–24,88'i birebir; yeniden yazılmış test kümesiyle 13 milyarlık model 85,9;
    255 makalenin %42'si 4,7 milyon örnek gönderdi; 82 yama; yönlendirmeli tamamlama %92–100; silinen yanlış
    şık %57; en düşük olasılıklı token testi 0,72; ezber büyük modelde 2–5 kat; 10 kez geçen dizi ≈ 1.000 kat;
    50 token önek %33, 450 token %65; GSM8k → GSM1k düşüşleri Yi-6B-Chat 8,0, math-shepherd 7,2, phi-2 6,3,
    Llama-3-8B 6,2 … gemini-1.5-pro 0,6; düşüş ↔ üretme olasılığı 0,36 sıra ilişkisi. **73:** işçilerin %42'si
    < 40 sn; ayırt etme %50 → %55; sohbet modeli kitle işçisini ≈ 25 puan geçiyor, etiket başına < 0,003 dolar;
    ham %80 uzlaşma 10–20 puan sapma gizler; ikili tercihte insan–insan %63–66; Bavaresco Tablo 1: akıl yürütme
    adımları 0,82/0,83, diyalog güvenliği −0,24/−0,17 (insan 0,27); ortalama kappa 0,28, sıra ilişkisi 0,50; Shi
    15 hakem 22 görev > 150 bin karar; Wang 80 sorunun 66'sı; iki sırayla sorma +9,8 ve +14,3; uzunluk kontrolü
    0,94 → 0,98; kendini tanıma > %50, en büyüğü %73,5, 500 örnekle > %90; 15 hakemin 11'i sahte "%85" cümlesine
    > %70 uyuyor; Dorner: insan verisinin iki katından fazlasının yerine geçemez. **74:** 12 × 12 = 144 baştan
    26 baş, 7 sınıf; logit farkı 3,56, devre %87'sini taşır, %99,3; faz geçişi 2,5–5 milyar token, 0,15 → ≈ 0,4
    nat; ACDC 32 bin kenardan 68, 5/5 bileşen; EAP-IG kenarların %1–2'siyle ≥ %85; Shi kenarların %20'si;
    P = 113; Voita 48 başın 38'i, −0,15 BLEU; Hewitt & Liang 97,3 ↔ 92,8, seçicilik 4,5; Elazar > %80; Nanda
    Othello %98,9; Bolukbasi > %80; Lieberum 70 milyar.
166. **Kendi hesabımız (Batch 17): 71-Şekil 2.** Standart hata tablosu bizim hesabımızdır: p = 0,70 için
    SE = √(p(1−p)/n) × 100, aralık ±1,96 × SE; n = 100/500/1.000/5.000/14.042 → SE 4,58/2,05/1,45/0,65/0,39, aralık
    ±9,0/±4,0/±2,8/±1,3/±0,8 puan; 0,4 puan = 0,4/2/4/20/56 soru. Şekil alt metni "kendi hesabımız" diye
    işaretli. Öteki bütün sayılar kaynakların kendi verdiği değerlerdir (72'nin "≈ 1.000 kat" ifadesi Kandpal'ın,
    74'ün "144 baş" sayısı 7'nin).
167. **Kaynak politikası (Batch 17).** 71'de 39, 72'de 45, 73'te 36, 74'te 39 kaynak (159 kalem). Dağılım: 126
    hakemli (71'de 32, 72'de 37, 73'te 27, 74'te 30), 33 hakemsiz ve işaretlenmiş kalem. Hakemsizler, üç türde:
    (a) sağlayıcı raporları — GPT-4 teknik raporu, Llama 3 raporu; (b) editörlü ya da kurum içi yayın —
    Olah'ın Distill incelemesi ("editörlü web dergisi"), Elhage ve Olsson'un Transformer Circuits yazıları;
    (c) arXiv ön çalışmaları — Miller (hata payı), Madaan, Biderman (sızıntı), Owen, Phan (HLE), Dehghani (ölçüt
    piyangosu), Weidinger (değerlendirme bilimi), Yang (yeniden yazım), Das, Singh, Cooper, Srivastava, Zhou,
    Gudibande, Thakur, Saito, Dubois (uzunluk kontrolü), Li (arena istatistiği), Wataoka, Stureborg, Verga
    (kurul), Saphra & Wiegreffe, Heimersheim & Nanda, Syed, Power (grokking), Lieberum, Bolukbasi. Krumdick
    "COLM 2026'ya kabul edilmiş bildiri" diye işaretlendi (PDF başlığı), hakemli sayılmadı. Çalıştay bildirileri
    (Alain & Bengio ICLR 2017; Nanda, Lee & Wattenberg BlackboxNLP 2023) hakemli sayıldı. **DBLP bu run'da bir
    kaynağın hakemli olduğunu sonradan gösterdi ve künye düzeltildi:** Makelov ve ark. (ICLR 2024), Sharkey ve
    ark. (TMLR 2025), Vu ve ark. FLAMe (EMNLP 2024), Ye ve ark. (ICLR 2025), Dorner ve ark. (ICLR 2025);
    tersine Gudibande ve ark. DBLP'de yalnızca CoRR olduğu için hakemsiz yapıldı. Doğrulama kanalları: DBLP `ee`
    (12 sn aralık, 600+ sorgu, b13–b16'dan tohumlandı), Crossref `query.title`, `papers.nips.cc` hash sayfaları,
    OpenReview kimlikleri (DBLP `ee` üzerinden, tahmin edilmedi), PMLR cilt sayfaları (curl ile başlık teyidi),
    ACL Anthology, PDF başlık satırları ("Published as a conference paper at COLM 2024"). **Doğrulanamayan:**
    Rein ve ark. GPQA — COLM 2024 kabul listesi challenge sayfası döndü, DBLP yalnızca CoRR; künye "COLM 2024
    bildirisi olarak duyuruldu; kabul listesi erişilemedi" diye yazıldı. **Aday olup kullanılmayanlar:**
    Rodriguez ve ark. ACL 2021 (PDF metni çıkarılamadı; Vania kullanıldı), Ravaut (başlık uyuşmazlığı),
    van der Lee ve Krippendorff (metin alınamadı; uzlaşma katsayıları adıyla anıldı), nostalgebraist logit
    merceği (429; Belrose tuned lens de kullanılmadı), Bereska & Gavves derlemesi, Hendel görev vektörleri,
    Goldowsky-Dill yol yaması, Casper eleştirisi.

168. **Batch 18'in kategorisi ve kohortu.** 75–78 `safety-and-evaluation` (karar #160 gereği; bu run'da kategori
    sorusu yoktu), `classification_batch: 18`. Okuma listesinde 61–78 tek öbek; `groupByBatchAndCategory` kohort ×
    kategori kırdığı için liste Batch 14–18 başlıkları altında ayrı görünmeye devam ediyor ve
    `reading-list-groups.test.ts` değişmedi. Test sayısı 519 → 551; artışın tamamı `series-assets.test.ts`'in
    varlık başına türeyen testlerinden (12 yeni SVG).
169. **76'nın başlığı Türkçeleştirildi.** "Aktivasyonlara Müdahale: Steering ve Problar" → "Aktivasyonlara Müdahale:
    Yönlendirme ve Sondalar". "sonda" (probe) defterde 67'den beri kayıtlı; "steering" için "yönlendirme" seçildi.
    Gövdelerde grep yapıldı: sözcük 72'de **"yönlendirmeli tamamlama"** (kirliliğin kara kutuda tespiti) anlamında
    geçiyor; çakışma 76'nın girişinde açıkça adlandırıldı (SOZLESME §11). Terim ilk kez **75'te** gloss'landı, çünkü
    AxBench'in ikinci görevi orada anıldı.
170. **77'nin başlığı Türkçeleştirildi.** "Attribution: Model Neden Böyle Dedi?" → "Atıf: Model Neden Böyle Dedi?".
    "atıf" 45'te (citation) anlamında gloss'lanmıştı; 74'ün "atıf yaması" ikinci anlamı taşıyordu. Çakışma 77'nin
    girişinde **kaynak atfı ↔ neden atfı** ayrımıyla adlandırıldı.
171. **78'in başlığı Türkçeleştirildi ve koordinat ödendi.** "Emergence Tartışması: Yetenekler Aniden mi Gelir?" →
    "Beliren Yetenekler Tartışması: Aniden mi Geliyor?"; "beliren yetenek" 5'ten beri defterde. 78 kendi numarasına
    yalnızca 5'in vaadini alıntılarken gönderme yapıyor — SOZLESME §5'in izin verdiği tek biçim (vaat kapanışının
    kaydı).
172. **Terim ayrımları (Batch 18).** "özellik" 74'te bold ama glosssuz geçmişti, 75'te gloss'landı; "sözlük" 4'te
    (vocabulary) idi, 75'te sözlük öğrenmenin sözlüğü olarak ayrıldı; "yönlendirme" (steering) ↔ 72'nin "yönlendirmeli
    tamamlama"sı; "atıf" (attribution) ↔ 45'in atfı (citation); "duyarlılık" (sensitivity, 77 aksiyomu) ↔ 22'nin istem
    duyarlılığı; "girişim", "emilim", "kelepçeleme", "ölü özellik", "gerçekleme değişmezliği", "örtük sonradan
    gerekçelendirme" ilk kez kuruldu. "grokking" 74'teki gibi Türkçeleştirilmedi; 78'de "geç genelleme" adıyla anıldı.
173. **Sayılar (Batch 18).** **75:** oyuncak modelde 5 özellik / 2 boyut, boyut başına özellik basamakları 1, 3/4, 2/3,
    1/2, 2/5, 3/8, 0; tek katmanlı modelin 512 nöronlu katmanı, 8 milyar örnek, genişleme 1×–256×, incelenen koşuda
    4.096 parça, 168 ölü ve 292'si milyonda birden az; üretim modelinde 1.048.576 / 4.194.304 / 33.554.432 parça, ölü
    oranı ≈ %2 / %35 / %65, token başına < 300 etkin parça, varyansın ≥ %65'i, parçaların %82'sinde en ilişkili nöronun
    korelasyonu ≤ 0,3, köprü parçası 10 kata, ulaşım altyapısı 5 kata kelepçelendi; GPT-4 üzerinde 16 milyon parça ve
    40 milyar token, önlemsiz ölü oranı %90'a kadar ve 34 milyonluk sözlükte ≈ 12 milyon canlı; SHIFT'te küçük modelin
    devresi 67 parça, 55'i ilgisiz, meslek 61,9 / cinsiyet 87,4 / en kötü grup 24,4 → 88,5 / 54,0 / 76,0 → yeniden
    eğitimle 93,1 / 52,0 / 89,0, nöronlarla en iyi 41,5, rastgele silmede 24,4; aynı veriyle farklı tohumda 131 bin
    parçalı iki sözlükte ortak parça %30; kavram tespitinde 0,942 / 0,940 / 0,917 / 0,695, yönlendirmede 0,894 / 0,741 /
    0,239 / 0,165 / 0,098. **76:** 13 açık sohbet modeli ve 72 milyar parametreye kadar; doğruluk yönüyle 32,5 → 65,1 ve
    birkaç yüz örnek; kırk davranış kümesinde bazılarında girdilerin yaklaşık yarısı ters yönde; beş bin düzenlemelik
    ölçüt; temsil ince ayarı 15–65 kat parametre verimliliği. **77:** sil-ve-yeniden-eğit ölçütünde yalnızca iki
    topluluk yöntemi rastgeleyi geçiyor; 52 milyar parametreye ölçeklenen etki fonksiyonları ve güç yasası kuyruğu;
    öneri eklenince 36,3 puan düşüş (66'dan devralındı); ipucunun anılma oranı çoğu ayarda %20'nin altında ve en az
    %1; doğal sorularda örtük sonradan gerekçelendirme %13'e kadar. **78:** iki yüzden fazla görevlik ölçüt takımı;
    beliren yetenek iddialarının > %92'si iki kesikli ölçüde; 2,4 milyarlık modelin kod üretme başarısı %0,05 sapmayla;
    dört kat hesaba kadar belirme yasası; ≈ 100 açık modelden gözlemsel yasa; binden fazla deneyle üç etkene ayrıştırma;
    Skill-Mix'te k = 5.
174. **Kendi hesabımız (Batch 18): yok.** Dört makalede de kaynağın vermediği türetilmiş sayı kullanılmadı; bütün
    sayılar kaynakların kendi verdiği değerlerdir. 78-Şekil 1'in eğrileri şematiktir ve bu kayıt şeklin içine yazıldı
    (SOZLESME §6).
175. **Kaynak politikası (Batch 18) ve DBLP kesintisi.** 75'te 21, 76'da 18, 77'de 27, 78'de 18 kaynak (84 kalem).
    Dağılım: **72 hakemli**, 12 işaretlenmiş hakemsiz kalem — serinin son batch'lerindeki en yüksek hakemli oranı.
    Hakemsizler: Elhage, Bricken ve Templeton'ın Transformer Circuits yazıları; Rajamanoharan'ın iki kapı çalışması;
    Turner'ın aktivasyon eklemesi; Kramár'ın AtP* çalışması; Grosse'nin etki fonksiyonları; Li'nin "etki fonksiyonları
    büyük modellerde işe yarıyor mu"su; Chen'in akıl yürütme modelleri sadakati; Doshi-Velez & Kim'in konum yazısı;
    ve Snell'in belirme yasası — bildiri COLM şablonuyla dağıtılıyor fakat kabul listesine erişilemediği için hakemli
    sayılmadı (b17'deki Krumdick kararının aynısı). **DBLP bu run'da bot doğrulama sayfası döndürdü** (`dblp.org`,
    `dblp.dagstuhl.de`, `dblp.uni-trier.de` üçü de); OpenReview arama ucu birkaç sorgudan sonra boş liste vermeye
    başladı; Semantic Scholar 429. Yerine kurulan kanallar: **konferans dizin sayfaları**
    (`proceedings.iclr.cc/paper_files/paper/2024–2026`, `papers.nips.cc/paper_files/paper/2017–2025`,
    `proceedings.mlr.press` cilt sayfaları, `jmlr.org/tmlr/papers`), **arXiv API'nin `comment` ve `journal_ref`
    alanları**, **PDF ilk sayfa yayın satırı** ve **Crossref `query.bibliographic`** (ACL/EMNLP/NAACL/Findings/TACL/
    ACM/PNAS/Science için). Bu düzen DBLP'nin yerini tuttu ve altı künyeyi düzeltti: Kantamneni ve Wu (AxBench) ICML
    2025, Paulo & Belrose ve Heap ICLR 2026, Ruan NeurIPS 2024 (ICLR değil), Hernandez COLM 2024 (ICLR değil).
    Ayrıca iki ad/başlık tuzağı: Rimsky'nin CAA bildirisi ACL 2024'te **Panickssery** adıyla yayımlanmış; Heap'in
    başlığı v2'de "Automated Interpretability Metrics Do Not Distinguish Trained and Random Transformers" olarak
    değişmiş. **Doğrulanamayan:** Snell (yukarıda); Arora & Goyal'ın belirme kuramı hiçbir dizinde bulunamadı ve
    kullanılmadı (yerine Skill-Mix, ICLR 2024). **Aday olup kullanılmayanlar:** Olshausen & Field'in 1996/1997 seyrek
    kodlama yazıları (üç adresten de metin alınamadı), Bills'in nöron açıklamaları (JS ile üretilen sayfadan yalnızca
    6 KB metin çıktı; yerine Huang'ın BlackboxNLP 2023 değerlendirmesi), Zhou'nun Nature 2024 güvenilirlik yazısı
    (yayıncı duvarı), Bereska & Gavves derlemesi, Bussmann'ın BatchTopK'sı, Dunefsky'nin transcoder'ı, Lindsey'in
    çapraz kodlayıcıları ve Ameisen'in atıf grafları (77'nin kapsamı dışında kaldı).

176. **Faz 9'un kategorisi ve Batch 19'un kohortu.** 79 ve 80 karar #160 gereği `safety-and-evaluation`; **81'den itibaren
    `multimodal-and-future`** — kontrollü sözlükte (`content/series/schema.ts`) hazır bekleyen ad, Faz 9'un başlığıyla
    ("Çoklu Modalite ve Verimlilik") birebir örtüşüyor. Dördü de `classification_batch: 19`. Kohort iki kategoriye yayıldı;
    Batch 14'te aynısı yapılmıştı (#142) ve `groupByBatchAndCategory` kohort × kategori kırdığı için okuma listesi tutarlı
    kalıyor: 61–80 tek öbek, 81–82 yeni öbek; `reading-list-groups.test.ts` **değişmedi**. Test sayısı 551 → 563; artışın
    tamamı `series-assets.test.ts`'in varlık başına türeyen testlerinden (12 yeni SVG). `content/series/articles/`
    altında yeni bir dizin açıldı: `multimodal-and-future/`.
177. **79'un başlığı Türkçeleştirildi.** "Robustluk: Dağılım Kayması ve Adversarial Girdiler" → **"Sağlamlık: Dağılım
    Kayması ve Düşmanca Girdiler"**. "düşmanca" karar #149'da (Batch 15) kayıtlı ve gövdelerde 23 kez geçiyor; "sağlamlık"
    58 ve 77'de zaten kullanılmış. Gövdelerde grep yapıldı: "robustness" yalnızca 45'in dört yetenek glossunda parantez içi
    geçiyor, çakışma yok.
178. **81'in başlığı Türkçeleştirildi.** "Görüntüyü Anlamak: Vision-Language Modelleri" → **"Görüntüyü Anlamak: Görüntü-Dil
    Modelleri"**. Ölçüt #108: alanda Türkçeleştirilmeyen kısaltma sınıfı (RAG, MCP, jailbreak) değil, karşılığı kurulabilen
    bir terim. "Görü" kökü yerine **"görüntü"** seçildi, çünkü 54 zaten "görüntü modeli" ve "görüntü alabilen model"
    diyor; seri içi tutarlılık (SOZLESME §2) yeni bir kök açmaya tercih edildi. 80 ve 82'nin başlıkları zaten Türkçeydi.
179. **Terim ayrımları (Batch 19).** "dağılım kayması" ve "sağlamlık" önceki makalelerde glosssuz geçmişti, 79'da resmî
    olarak kuruldu; "düşmanca örnek" 63'ün düşmanca soneğinin atası olarak adlandırıldı; "görüntü yaması" 55'in yazılım
    yaması ve 74'ün aktivasyon yamasıyla çakışıyor ve ayrım 81'in gövdesinde açıkça yapıldı; "görsel token" 54'te glosssuz
    geçmişti, 81'de gloss'landı; "çapraz dikkat" 29'un çapraz kodlayıcısından ayrı; "nesne uydurması" 17'nin içsel
    uydurmasının görüntü hâli; "artık vektör kuantizasyonu" 43'ün ürün kuantizasyonu ailesinden ama amacı geri sentez;
    "model kartı" 20'de gloss'lanmıştı, bölümleri 80'de kuruldu. **"Veri künyesi" (datasheet) 20'nin karşılığıyla korundu**
    ve AB yasasının Ek IV metninde geçen "datasheets" da bu karşılıkla çevrildi.
180. **Sayılar (Batch 19). 79:** WILDS on veri kümesi — Camelyon17 93,2 → 70,3; iWildCam makro F1 47,0 → 31,0;
    CivilComments en kötü grup 92,2 (ortalama) → 56,0; FMoW en kötü bölge 48,6 → 32,3; Amazon onuncu yüzdelik 71,9 → 53,8;
    Py150 75,4 → 67,9; ImageNet-C on beş bozulma × beş şiddet = yetmiş beş koşul; ImageNet-V2 düşüşü on bir–on dört puan
    (CIFAR-10'da üç–on beş), "yaklaşık beş yıllık ilerleme"; ImageNet-A'da yaygın bir ağ ≈ yüzde 2 (≈ doksan puan düşüş);
    Taori 204 model × 213 koşul; AdvGLUE on dört saldırı yöntemi, üretilenlerin ≈ yüzde 90'ı geçersiz, ELECTRA-Large
    93,16 → 41,69; PromptRobust 4.788 istem, sözcük düzeyinde ortalama yüzde 39 düşüş; GSM-IC mikro 72,4 ↔ makro 6,0,
    öz-tutarlılıkla makro 30,0; GSM-NoOp yüzde 65'e varan düşüş; Madry CIFAR-10 geniş ağ 95,2 → 3,5 (sıradan) ve
    87,3 → 45,8 (düşmanca eğitilmiş); Cohen 0,5 yarıçapında kanıtlanabilir doğruluk yüzde 49; Athalye dokuz savunmanın
    yedisi, altısı tamamen bir kısmen kırıldı; RobustBench 120'yi aşkın model. **80:** denetimden yedi ay sonra üç
    hedefin üçü de yeni sürüm; en karanlık tenli kadın altkümesinde hata düşüşü yüzde 17,7–30,4, genel hatada 5,72–8,3;
    denetlenmeyen ikisi genel 8,66 ve 6,60, aynı altkümede 31,37 ve 22,50; köken denetimi 1.800+ küme, lisansların
    yüzde 70'inden fazlası belirtilmemiş, kayıtlı olanlarda hata yüzde 50'nin üzerinde, elle izlemeyle yüzde 72 → 30;
    izin denetimi 14.000 alan adı, C4'ün token'larının yüzde 5'i ve en canlı kaynaklarının yüzde 28'i kapalı, kullanım
    koşullarıyla yüzde 45; 32.111 kart / 74.970 depo = yüzde 44,2, eğitim 74,3, sınırlar 17,4, değerlendirme 15,4,
    atıf 14,4, çevresel etki 2,0 (639 kart); sistem kartları 33 ve 123 sayfa, yüzden fazla dış kırmızı takım üyesi,
    45 dil, 29 ülke; denetim araç taraması 35 uygulayıcı, 435 araç. **81:** 16×16 yama; 14 piksellik yamada 224 → 256,
    336 → 576 token; CLIP 400 milyon çift, 1,28 milyon örnek kullanmadan eşit doğruluk, 30+ küme; yeniden örnekleyici
    64 çıktı, Q-Former 32 sorgu ve 188 milyon parametre, elli dört kat az eğitilebilir parametreyle yüzde 8,7 fark;
    LLaVA-1.5 1,2 milyon örnek, sekiz hızlandırıcıda ≈ bir gün, 11 ölçüt; Idefics2 ablasyonu 51,8 / 60,3 / 66,7 / 67,3 /
    69,5, çapraz dikkat 1,3 milyar fazla parametre ve yüzde 10 fazla işlem, açılınca 12,9 ↔ 0,6 puan; Prismatic çok
    aşamalı eğitim yüzde 20–25 hesap; DataComp 12,8 milyar çift, 38 görev, 6,1 puan; MMMU 11,5 bin soru / 6 alan /
    30 konu / 183 alt alan, yüzde 56 ve 59; MathVista 6.141 örnek, 49,9, insanın 10,4 puan gerisi; MMVP 150 çift /
    300 soru, insan 95,7, 40,7 ve 38,7, rastgele 25,0; BlindTest yedi görev, ortalama 58,07, en iyi 77,84, insan 100.
    **82:** sıra geçiş boşluğu on dilde mod 0 (0–200 ms aralığı), ortak ortanca 100 ms, ortalamalar 7–469 ms, ortak
    ortalama 208 ms; wav2vec 2.0 1,8/3,3 ve on dakikayla 4,8/8,2 (53 bin saat ön eğitim); SoundStream 3 kbit ↔ klasik
    12 kbit; Whisper 680 bin saat, on iki kümede yüzde 55,2 daha az hata (referansta yüzde 0,1 fark), denetimli modeller
    insanın ≈ iki katı hata; VALL-E 60 bin saat ve üç saniyelik kayıt; Moshi 12,5 Hz ve 160 ms; LLaMA-Omni 236 ms;
    MMS 7.000+ dil, 1.406 / 1.107 / 4.017, elli dört dilde hata oranı yarıdan fazla düşüyor; MMAU 10 bin klip, 27 beceri,
    insan 82,23, en iyi model 54,90, rastgele ≈ 26.
181. **Kendi hesabımız (Batch 19): yok.** Dört makalede de kaynağın vermediği türetilmiş sayı kullanılmadı. 79'un ilk
    taslağındaki "yaklaşık sekiz puan / kırk iki puan" çıkarmaları — 95,2 − 87,3 ve 45,8 − 3,5 — yayından **önce**
    kaldırıldı ve yerlerine kaynağın kendi dört sayısı kondu (SOZLESME §4). 81'in yama aritmetiği (224/14 = 16, 336/14 = 24)
    hesap değil tanım gereğidir ve gövdede adım adım gösterilir.
182. **Şekil kararları (Batch 19).** On iki şeklin hepsi tablo ya da kutu-ok şeması; ölçülmemiş eğri çizilmedi, dolayısıyla
    "eğriler şematiktir" kaydına gerek olmadı. Tek nicel grafik 80-Şekil 2'nin yatay çubukları ve çubuk uzunlukları
    kaynağın verdiği beş orana orantılıdır (74,3 / 17,4 / 15,4 / 14,4 / 2,0). 79-Şekil 3 ve 82-Şekil 3, 79'un "girdiyi kim
    seçiyor" eksenini iki modaliteye taşıyan aynı düzendedir; bu bilinçli bir paralellik.
183. **Kaynak politikası (Batch 19).** 79'da 23, 80'de 17, 81'de 18, 82'de 17 kaynak (**75 kalem**). Dağılım: **68 hakemli**,
    7 işaretlenmiş hakemsiz kalem. Hakemsizler: PromptRobust (yazarlarının kendi ifadesiyle "teknik rapor"), Qwen2-VL,
    VALL-E, Moshi, GPT-4o sistem kartı, Claude 4 sistem kartı, ve künyesi dizinlerden doğrulanamayan Szegedy ve ark.
    (ICLR 2014'ün bildirileri ayrı bir kitapta toplanmadı). **DBLP hâlâ kapalı** olduğu için Batch 18'in düzeni
    (`idx-b19.py` + `venue-b19.py` + `hdr-b19.py`) kullanıldı ve CVF ile ISCA dizinleriyle genişletildi:
    `openaccess.thecvf.com/{CVPR,ICCV,ACCV}<yıl>`, `isca-archive.org/interspeech_<yıl>`,
    `datasets-benchmarks-proceedings.neurips.cc/paper_files/paper/2021`. Düzen **iki künyeyi düzeltti** ve **iki kaynağı
    hakemsizden hakemliye taşıdı:** Liang ve ark.'nın 32 bin model kartı çalışması Nature Machine Intelligence 2024
    (10.1038/s42256-024-00857-z), Longpre ve ark.'nın köken denetimi yine Nature Machine Intelligence 2024
    (10.1038/s42256-024-00878-8); Ojewale ve ark. CHI **2025** (2024 değil), SoundStream TASLP **2022** (arXiv 2021).
    **Aday olup kullanılmayanlar:** Liesenfeld & Dingemanse'nin açıklık cilası çalışması (20'de zaten kullanılmıştı; PDF
    üç adresten alınamadı), Skantze'nin sıra alma derlemesi (DiVA sunucusu zaman aşımı; yerine Ekstedt & Skantze ve
    Stivers), Bommasani'nin şeffaflık endeksi (69'da kullanıldı, 80'de yalnızca anıldı), Arnold'un FactSheets'i,
    Derczynski'nin risk kartları, Mökander dışındaki denetim derlemeleri, HuBERT, WavLM, EnCodec dışındaki kodekler,
    SALMONN, Qwen-Audio, AudioPaLM, SpeechGPT, Mini-Omni, MusicGen, AudioLDM, SeamlessM4T, VoiceBench, InternVL,
    Qwen2-VL dışındaki VLM'ler, LAION-5B, MMBench, MMStar, POPE dışındaki uydurma ölçütleri (kapsam dışı kaldı).

184. **83'ün başlığı Türkçeleştirildi.** "Görüntü ve Video Üretimi: Diffusion'a Giriş" → **"Görüntü ve Video Üretimi:
    Difüzyona Giriş"**. Ölçüt #108: "diffusion", RAG/MCP/jailbreak gibi kısaltma sınıfında bir kalem değil; bilim
    dilinde yerleşik bir yazımı var. Yayımlanmış gövdelerde grep yapıldı: ne "diffusion" ne "difüzyon" hiçbir gövdede
    geçiyor (yalnızca 78'in kaynakçasında bir çalışma başlığında), dolayısıyla çakışma yok. Elenen alternatif:
    "yayınım" — alanda kullanılmayan bir türetme olurdu.
185. **86'nın başlığı Türkçeleştirildi.** "Attention'ın Ötesi: SSM ve Alternatif Mimariler" → **"Dikkatin Ötesi: SSM ve
    Alternatif Mimariler"**. "dikkat" 6'dan beri defterde ve seride parantezsiz kullanılıyor; "SSM" #108'in kısaltma
    sınıfında kaldı. Roadmap'teki **108** taslak başlığı ("Performans Mühendisliği: Attention'ı Hızlandırmak") aynı
    sorunu taşıyor ve kendi run'ında karara bağlanacak; bu run'da dokunulmadı.
186. **Batch 20'nin kohortu ve kategorisi.** 83–86'nın dördü de `multimodal-and-future` (karar #176'nın bandı 81–90)
    ve `classification_batch: 20`. Okuma listesinde 81–86 tek öbek; `reading-list-groups.test.ts` **değişmedi**.
    Test sayısı 563 → **575**; artışın tamamı `series-assets.test.ts`'in varlık başına türeyen testlerinden (12 yeni SVG).
187. **Terim kararları (Batch 20).** "difüzyon" (#184); "düşmanca üretken ağ" — #149'un "çekişmeli kullanılmaz"
    kuralına uyularak; "skor" 6'daki dikkat skoruyla çakışıyor ve ayrım 83'ün gövdesinde açıkça yapıldı; **"recall"
    için "geri çağırma" KULLANILMADI** — 18/21'deki geri çağırma ve 29'daki bulma oranı ayrımı korunsun diye, 83'te
    üretimin çeşitlilik ölçüsüne **"kapsama"** dendi ve 33'teki kapsamayla aynı sözcüğü paylaştığı gövdede yazıldı;
    "kesinlik" 45'te gloss'lanmıştı, 83'te yeni nesneyle kullanıldı ve çakışma adlandırıldı; 86'daki **çağrışımsal
    geri çağırma** ise 18/21'in anlamıyla aynı olduğu için "geri çağırma" olarak bırakıldı. "erken kaynaşma",
    "koşullu hesaplama", "kapı ağı", "tanecik", "seçicilik", "hepsi-hepsiye iletişim" ilk kez burada kuruldu.
188. **Sayılar (Batch 20). 83:** DDPM T = 1000, β 0,0001 → 0,02, CIFAR-10 FID 3,17 ve Inception 9,46; DDIM tablosu
    (CIFAR-10 FID) 10/20/50/100/1000 adımda özgün örnekleyici 367,43 / 133,37 / 32,72 / 9,99 / 3,17 ve belirlenimci
    örnekleyici 13,36 / 6,84 / 4,67 / 4,16 / 4,04; ilerlemeli damıtma dört adımda 3,0; tutarlılık modelleri tek adımda
    3,55 (ImageNet 64×64'te 6,20); piksel uzayı eğitimi 150–1000 V100 günü ve 50 bin örnek ≈ 5 A100 günü; indirgeme
    çarpanı 4–8 en iyi denge; DiT-XL/2 118,6 Gflop ve kılavuzluksuz 9,62 / 121,50 / 0,67 / 0,67, cfg 1,25'te
    3,22 / 201,77 / 0,76 / 0,62, cfg 1,50'de 2,27 / 278,24 / 0,83 / 0,57; ikinci çalışmada katsayı 10'da kesinlik 0,88,
    kapsama 0,32 ve FID 4,59 → 9,11; SD3 8 milyar; video 512×1024 ve 1280×2048; S4 dışı — Path-X 86'da; HEIM 12 boyut /
    62 senaryo / 26 model; difüzyon modellerinden binden fazla eğitim örneği çıkarıldı ve sızıntı düşmanca üretken
    ağların iki katından fazla. **84:** VQ-VAE 128×128×3 → 32×32, K = 512, bitte 42,6 kat; MAGVIT-v2 öncesi en iyi dil
    modeli 3,41 ↔ difüzyon 1,79 (yüzde 48 fark), LFQ ve 2¹⁸ ≈ 262 bin sözlükle ablasyon 2,65 → 2,48 → 1,34 → 1,15,
    tahmin iki adet 2⁹ deftere ayrıştırıldı; MaskGIT 256 adım yerine 8 yineleme, 64 kata varan hızlanma; VAR
    FID 18,65 → 1,73, IS 80,4 → 350,2, 20 kat hızlanma; Chameleon 512×512 → 1024 token, defter 8192, ortak sözlük
    65.536 (metne 57.344), ≈ 10 trilyon token (2,9 trilyonu yalnız metin); Transfusion 7 milyar / 2 trilyon token,
    eşit işlemde ≈ 2 kat daha iyi FID, görüntüden metne yüzde 21,8, metinden metne yüzde 50–60. **85:** 20'nin
    671 / 37 milyarı; sekiz uzmandan iki seçim = 8 kat parametre, 2 kat hesap; Shazeer 137 milyar ve bin katı aşan
    kapasite; GShard 600 milyar, 2048 hızlandırıcı × 4 gün = 22 hızlandırıcı-yılı ↔ yoğun karşılığı 235,5; Switch
    7 kata varan hızlanma ve bir trilyonun üstü; GLaM 1,2 trilyon, enerjinin üçte biri, çıkarımda yarı işlem, 29 görev;
    uzman seçimi 8 milyar / 64 uzmanda iki kattan fazla hızlı yakınsama; Clark kesim noktaları 937 / 85 / 83 milyar;
    Ludziejewski 10²⁰ işlemde 20 kat, 10²⁵ üstünde 40 kattan fazla; DeepSpeed-MoE 4,5 kat hızlı ve 9 kat ucuz çıkarım;
    Mixtral 47 / 13 milyar, ardışık token'ın aynı uzmana gitme oranı orta katmanlarda yüzde 22,7–28,4 ↔ rastgele 12,5;
    OLMoE 64 uzman / top-8, ön eğitimin yüzde 40'ında doyma yüzde 80'e varıyor; DeepSeekMoE 16 milyar ≈ 7 milyarlık
    yoğun modelin yüzde 40 hesabıyla. **86:** BigBird 8 kata kadar uzun dizi; doğrusal dikkat 4000 kata varan hızlanma;
    S4 16.384 uzunluklu görevde yüzde 88; Mamba 5 kat üretim verimi ve iki katı boyutla eşitlenme; Jelassi 410 milyon ↔
    2,8 milyar, rehber ≥ 70 kayıt; Zoology 17 model, 2,1 perplexity puanı, yüzde 82 ve 97,4, 70 milyon ↔ 1,4 milyar;
    Waleffe 8 milyar / 3,5 trilyon token, melez yüzde 43 + 7 + 50, 12 görevde +2,65 puan, 8 kata varan hızlanma;
    Jamba 52 / 12 milyar ve 256 bin token; Griffin 7 ve 14 milyar, ≈ 7 kat az token; RWKV 14 milyar; BLT 8 milyar /
    4 trilyon bayt, çıkarımda yüzde 50'ye varan tasarruf; GQA ön eğitim hesabının yüzde 5'i kadar ek eğitim.
189. **Kendi hesabımız (Batch 20): yok.** Dört makalede de kaynağın vermediği türetilmiş sayı kullanılmadı. 83'teki
    "sinyal payı 0,25 → katsayılar 0,5 ve ≈ 0,87", 84'teki "512 seçenek dokuz bitle numaralanır" ve "65.536 − 8.192 =
    57.344", 85'teki "sekiz uzmandan iki seçim = 8 kat parametre, 2 kat hesap" tanım gereği aritmetiktir ve girdileri
    gövdede durur (SOZLESME §4; 81'in yama aritmetiğiyle aynı sınıf).
190. **Şekil kararları (Batch 20).** On iki şeklin hepsi tablo ya da kutu-ok şeması; ölçülmemiş eğri çizilmedi,
    dolayısıyla "eğriler şematiktir" kaydına gerek olmadı. 83-Şekil 2 ile 83-Şekil 3, aynı eğitilmiş modelin farklı
    ayarlarını karşılaştıran iki tablo — "değişen tek şey" satırı ikisinde de şeklin içinde yazılı. 85-Şekil 3 ile
    86-Şekil 2, iki tarafın ölçümünü yan yana koyan aynı düzendedir; bu bilinçli bir paralellik ve 79/82'deki
    "girdiyi kim seçiyor" düzeninin devamıdır. **PNG turu bu kez bir kusur buldu:** 86-Şekil 3'te üçüncü ve dördüncü
    sütun arasındaki pay iki ölçerin de eşiğini geçtiği hâlde gözle dar görünüyordu; hücre üç satıra bölünerek
    genişletildi. Ders: geometri kapıları geçse de dört sütunlu tablolarda göz turu şart.
191. **Kaynak politikası (Batch 20).** 83'te 23, 84'te 11, 85'te 15, 86'da 19 kaynak (**68 kalem**). Dağılım:
    **58 hakemli**, 10 işaretlenmiş hakemsiz kalem. Hakemsizler: sınıflandırıcısız kılavuzluk (NeurIPS 2021 çalıştayı,
    hakemli konferans bildirisi değil), Lumiere, Chameleon, Emu3, ST-MoE, Mixtral, Longformer, çok sorgulu kod çözme,
    Waleffe'in Mamba çalışması ve Griffin. **Doğrulama kanalları:** `url-b20.py` (indirilmiş dizin sayfaları),
    `venue-b20.py` (arXiv `comment`/`journal_ref` + Crossref + OpenAlex), `hdr-b20.py` (PDF ilk sayfa yayın satırı),
    `doi-b20.py` (Crossref) ve **iki yeni kanal**: OpenReview'un `api2.openreview.net/notes/search` ucu (COLM ve eski
    ICLR künyeleri için çalıştı) ve **`iclr.cc/virtual/<yıl>/papers.html` ile `iclr.cc/Conferences/<yıl>/AcceptedPapersInitial`**
    (proceedings.iclr.cc'nin 2023 ve öncesini vermediği yerde kabul listesi). Düzen **beş künyeyi düzeltti:** (1) elle
    yazılmış üç hash URL'si yanlıştı (Goodfellow 2014, VAR, MAR); (2) ince taneli MoE ölçek yasasının PMLR kaydı
    `ludziejewski24a`, `krajewski24a` değil — ve yayımlanmış sürümde **ilk yazar Ludziejewski**; (3) **Jamba COLM 2024
    değil**: okunan ön baskı (arXiv:2403.19887, "A Hybrid … Model") hakemsiz, hakemli sürüm **ICLR 2025**'te ve başlığı
    "Jamba: Hybrid Transformer-Mamba Language Models"; (4) uzman seçimi çalışmasının ilk yazarı **Yanqi** Zhou;
    (5) Griffin'in ilk yazarı **Soham** De. Ayrıca Mixtral künyesi kurumsal imzadan yazar listesine çevrildi.
    **Doğrulanamayan:** yok — bu run'da bütün venue iddiaları en az bir kanalda doğrulandı; Jacobs ve ark. 1991'in
    PDF'i taranmış olduğu için metni okunamadı, bu yüzden künyesi Crossref'ten doğrulandı ve içeriğine dair tek cümle
    Shazeer'in kendi ilişkili çalışmalar bölümüne dayandırıldı. **Aday olup kullanılmayanlar:** Imagen, GLIDE,
    DALL·E 2, SDXL, EDM, akış eşleştirme, doğrultulmuş akış, ControlNet, SDEdit, LAION-5B, Kararlı Video Difüzyonu
    (83); VQ-VAE-2, Parti, Muse, Show-o, Janus, LlamaGen, Unified-IO, OFA, Perceiver IO, Gato, CM3, FSQ, UniDiffuser,
    T2I-CompBench, Outlines, dilbilgisi kısıtlı kod çözme (84); BASE katmanları, hash katmanları, seyrek uzman
    derlemesi, OpenMoE, milyon uzman, yardımcı kayıpsız yük dengeleme, DeepSeek-V3, verimli çıkarım (85); HiPPO, LSSL,
    S5, H3, Hyena, Linformer, Reformer, seyrek Transformer, RetNet, kapılı doğrusal dikkat, xLSTM, Eagle/Finch, LRU,
    Based, Mamba-in-context, verimli Transformer derlemesi, akış hâlinde dil modelleri (86).

192. **Batch 21'in kohortu ve kategorisi.** 87–90'ın dördü de `multimodal-and-future` (karar #176'nın bandı
    81–90) ve `classification_batch: 21`. Okuma listesinde 81–90 tek öbek; `reading-list-groups.test.ts`
    **değişmedi**. Test sayısı 575 → **587**; artışın tamamı `series-assets.test.ts`'in varlık başına türeyen
    testlerinden (12 yeni SVG). **Faz 9 kapandı.** Faz 10'un (91–97) kategorisi 91'in run'ında karara bağlanacak.

193. **Başlık kararı yok (Batch 21).** 87 ve 90'ın başlıkları zaten Türkçeydi; 88'deki "LLM" ile 89'daki "GPU"
    karar #108'in kısaltma sınıfında kaldı ve dokunulmadı. `roadmap.json`'da yalnızca durum satırları değişti.
    **Bandın dışında bekleyen aday hâlâ 108** ("Performans Mühendisliği: Attention'ı Hızlandırmak"); 86'nın
    "Dikkatin Ötesi" kararından (#185) sonra aynı sözcük orada da Türkçeleştirilmeli görünüyor, karar 108'in
    kendi run'ında verilir.

194. **Terim kararları (Batch 21).** "yumuşak etiket" (soft target); "fonksiyon eşleştirme"; "kapasite boşluğu";
    "budama" (pruning — 19/27'deki kuantizasyondan ayrı bir aile olarak kuruldu); "uç" (edge); "işlem yoğunluğu",
    "çatı çizgisi", "sırt noktası", "alana özel mimari", "donanım piyangosu"; "veri merkezi çarpanı" (PUE),
    "karbon yoğunluğu", "maliyet eşitliği". **İki çakışma yayından önce adlandırıldı:** (a) 87'de "sadakat"
    öğrencinin öğretmene uyması anlamında kullanıldı ve 31'deki *faithfulness* anlamıyla aynı sözcük olduğu
    gövdede yazıldı; (b) 88 ve 89'da "hassasiyet" 27'deki sayı biçimi anlamında kullanıldı, 77'deki
    **duyarlılık** (sensitivity) ile karışmaması için o sözcük hiç kullanılmadı. Batch 20'nin dersi uygulandı:
    yeni ölçü çifti kurulmadan önce defter arandı, bu yüzden bu run'da geri dönüş gerekmedi.

195. **Sayılar (Batch 21). 87:** MNIST 67 / 146 / 74 hata ve T = 20; 3'süz aktarım kümesinde 206 hata (133'ü
    3'lerde) ve sapma +3,5 ile 109 hata (14'ü 3'lerde), yüzde 98,6; Buciluă'da bin kat küçük ve hızlı;
    Ba–Caruana'da sığ ağın aynı parametre sayısıyla derin fonksiyonu öğrenmesi; Beyer 9.600 dönem ve ImageNet
    ResNet-50 yüzde 82,8 (+4,4 puan); Furlanello CIFAR-10 6,69→6,64 / 5,06→4,86 / 4,13→4,03 ve 36 milyonda
    3,77→3,86; Gemma 2 hesap-optimalin 50 katı, 500 milyar token'da 60,3 ↔ 67,7 ve perplexity 23/19/17 ↔
    21/17/15; Busbridge 143 milyon–12,6 milyar ve 512 milyar token'a kadar, öğrenciler 143 ve 198 milyon,
    öğretmenler 300 milyon–14 milyar; Kim–Rush'ta on kat hızlı öğrenci; Sheared LLaMA 7 → 1,3 ve 2,7 milyar,
    yüzde 3 hesap; Minitron 15 → 8 ve 4 milyar, 40 kata kadar az token, aile maliyeti 1,8 kat, MMLU yüzde 16'ya
    varan; Gudibande 1,5–13 milyar temel, 0,3–150 milyon taklit token'ı, NQ 17/10/22 ve 20/15/27, öğretmen 31,
    insan değerlendirmesi yaklaşık yüzde 70; DeepSeek-R1 800 bin örnek, 32 milyarlık temelde damıtma
    72,6 / 94,3 / 57,2 ↔ pekiştirmeli öğrenme 47,0 / 91,6 / 40,2 ↔ üçüncü model 50,0 / 90,6 / 41,9, 1,5
    milyarlık damıtılmış model AIME 28,9 ↔ 9,3 ve 16,0; Sardana 13 → 7 milyar, 2 trilyon token talebinde
    1,7×10²² işlem (yüzde 17). **88:** DRAM 6–12 GB ve uygulama payı yüzde 10; 0,1 J/token/milyar ile 7 milyarda
    0,7 J, 350 milyon 8 bitte 0,035 J; pil yaklaşık 50 kJ; MELT 13,8 W sürekli, 47,9 °C, 0,16–0,21 mWh/token,
    yaklaşık 500 istem, M2 Max'ta 7 milyar 4 bit 46,8 token/s, telefonda 1,1 milyar yaklaşık 13,6 token/s,
    4 bit 3 bitten yüzde 24,77 hızlı, çerçeveler arası 3,53 kata varan fark; MobileLLM 125/350 milyonda +2,7 ve
    +4,3 puan; Apple 2 bit kuantizasyona duyarlı eğitim, sözlük 4 bit, önbellek 8 bit, blok oranı yüzde
    62,5 / 37,5 ve iki kalemde yüzde 37,5 kazanç, sunucu 3,56 bit, rank 16 adaptör onlarca megabayt;
    LLM in a flash DRAM'in iki katı ve 4 ile 20 kat; PowerInfer-2 telefonda 47 milyar ve 11,68 token/s.
    **89:** çatı çizgisi sırt noktaları 4,4 ve 6,7 (sekiz baytlık operand için 35–55 işlem), çekirdek
    yoğunlukları 0,25–1,64 ortanca 0,60, on altı bileşim; 20 yılda hesap 60.000 kat (3,0 kat/2 yıl), DRAM bandı
    100 kat (1,6), kartlar arası 30 kat (1,4), model 410 kat/2 yıl, kart belleği 2 kat/2 yıl; TPU 65.536
    çarpma-toplama, 92 TOPS, 15–30 kat hız, 30–80 kat vat başına işlem, sırt noktası 1350, altı uygulamanın
    dördü bellek sınırlı, 7 ms'de yığın 200 yerine 16 ve yüzde 42/37 ↔ 80, evrişimli ağlar iş yükünün yüzde 5'i;
    ZeRO 100 milyar / 400 kart / 15 PFLOP/s; Megatron 1 trilyon / 3.072 kart / 502 PFLOP/s ve tepe hızın yüzde
    52'si; TPU v4 4.096 çip, optik anahtarlar maliyetin yüzde 5'inden ve gücün yüzde 3'ünden azı, dil modeli
    tepe hızın yaklaşık yüzde 60'ı, embedding birimi alanın ve gücün yüzde 5'iyle 5–7 kat; 2012'de 16.000
    işlemci çekirdeği ↔ 2013'te iki çekirdek ve dört grafik kartı. **90:** GPT-3 zinciri 10.000 kart × 330 W ×
    355,2 saat = 1.172 MWh, × 1,10 ile yaklaşık 1.290 (bildirilen 1.287), 10.000 × 24,6×10¹² × 14,8 gün
    yaklaşık 3,14×10²³ işlem, 429 g/kWh ile yaklaşık 552 ton; BLOOM 433 MWh / 25 ton (57 g/kWh) ↔ OPT 324 MWh /
    70 ton (231 g/kWh), GPT-3 1.287 / 502 (429), Gopher 1.066 / 352 (330); BLOOM yaşam döngüsü 24,7 → 50,5 ton;
    Strubell 192 ↔ 626.155 pound ve otomobil ömrü 126.000 pound; Patterson düzeltmesi 18,7 ve 88 kat, Evolved
    Transformer yüzde 37 az parametre, yüzde 25 az enerji, 48,5 ton tasarruf yaklaşık aramanın on beş katı;
    4M çarpanları 5–10 / 2–5 / 1,4–2 / 5–10 ve 83 ↔ 747 kat, tahmin sapması 100–100.000 kat; bin çıkarımda
    0,002 / 0,007 / 0,047 / 2,907 kWh, telefon şarjı 0,022, oran 1.450'yi aşıyor, en verimli metin üretimi
    yüzde 9, en verimsiz görüntü üretimi 522 şarj; maliyet eşitliği 205 / 292 / 396 / 593 milyon çıkarım;
    boşta on dakikada 0,28 kWh ve enerjinin yaklaşık dörtte üçü; Google 0,10 ↔ 0,24 Wh (kalemler 0,10/0,14,
    0,04/0,06, 0,02/0,02, 0,01/0,02), 0,02 ↔ 0,03 gCO2e, 0,12 ↔ 0,26 mL, bir yılda 33 ve 44 kat, kamuya açık
    tahminler yaklaşık 0,3–7 Wh; Masanet hesap yüzde 550 ↔ enerji yüzde 6 ve 205 TWh, küresel elektriğin
    yaklaşık yüzde 1'i; Cottier 2,4 kat/yıl, 40 ve 30 milyon dolar, donanım yüzde 47–64, personel yüzde 29–49,
    enerji yüzde 2–6.

196. **Kendi hesabımız (Batch 21): iki yer.** (a) 88'de pil dayanımı — 50.000 J bölü 0,7 J/token yaklaşık
    71.400 token, saniyede 10 token'da yaklaşık 7.100 saniye — kaynağın "iki saatten az" cümlesiyle örtüşür,
    girdileri gövdede durur ve şeklin alt satırında "kendi hesabımız" olarak işaretlendi. (b) 90'da GPT-3
    zincirinin dört adımı (1.172 MWh, ×1,10, 3,14×10²³ işlem, 552 ton); girdilerin hepsi kaynağın tablosundan,
    aritmetik bize ait ve gövdede adım adım yazılı. **Kaynağın "64 token = pilin binde ikisi" cümlesi
    kullanılmadı:** aynı çalışmanın 0,7 J/token değeriyle tutarlı değil (0,7 × 64 = 44,8 J, 50 kJ'ün yaklaşık
    binde 0,9'u); o cümle metne alınmadı ve yerine tutarlı olan iki saatlik hesap kondu.

197. **Şekil kararları (Batch 21).** On iki şeklin onu tablo, biri zincir şeması (90-Şekil 1), biri de eksenli
    çizim (89-Şekil 1, çatı çizgisi). Çizim şematik olduğu için şeklin içine "çizimin biçimi şematiktir;
    ölçülmüş olan sırt noktasının değeridir" kaydı kondu (SOZLESME §6). 89-Şekil 2'de renk yönü bilinçli:
    hızlı büyüyen satırlar `cool`, yavaş büyüyen — yani kısıt olan — satırlar `accent`; okuma yönü şeklin alt
    satırında yazılı. **PNG turu bu kez de iki kusur buldu:** 88-Şekil 3'te bir hücrenin cümlesi üçüncü satırda
    yarım kalıyordu ("blok onun önbelleğini") ve 89-Şekil 1'de kılavuz çizgisi etiketin ilk harfine değiyordu;
    ikisi de geometri kapılarından geçmişti. Ders yineledi: kapılar hizalamayı ölçer, anlamı ölçmez.

198. **Kaynak politikası (Batch 21).** 87'de 22, 88'de 9, 89'da 9, 90'da 8 kaynak (**48 kalem**). Dağılım:
    **40 hakemli**, 8 işaretlenmiş hakemsiz kalem (Hinton'ın çalıştay bildirisi, Gemma 2, Apple'ın 2024 ve 2025
    raporları, PowerInfer-2, Patterson ve ark. 2021, Google'ın 2025 ölçüm raporu, Cottier ve ark.). Batch 20'nin 68 kaleminden az;
    sebebi konu değil, yoğunluk: bu dörtlü daha az ve daha derin okunan kaynakla yazıldı. **Doğrulama
    kanalları:** `idx-b21.py` dizin düzeni (bu run'da ACL Anthology etkinlik sayfaları, PMLR v48 ve v54 ile
    `iclr.cc/virtual/<yıl>` eklendi), `url-b21.py`, **`acl-b21.py`** (yeni: ACL Anthology'de başlıktan URL;
    href'ler tırnaksız yazıldığı için ayrı bir regex gerekti), OpenReview arama ucu, Crossref (`doi-b21.py` ve
    doğrudan sorgu), `venue-b21.py` ve `links-b21.py`. Düzen **iki künyeyi düzeltti:** (1) ICLR 2024'te
    yayımlanan başlık "The False Promise of Imitating Proprietary **Language Models**"tır, okunan ön baskı
    "…Proprietary LLMs" — Batch 20'nin Jamba dersinin aynısı ve bu kez OpenReview arama ucu yakaladı; (2) MELT
    çalışmasının mecrası **MobiCom 2024**'tür (Crossref: 10.1145/3636534.3690668), ilk varsayım MobiSys
    yönündeydi. Ayrıca elle yazılmış bir NeurIPS 2014 hash URL'si yanlıştı ve `url-b21.py` düzeltti.
    **Doğrulanamayan: yok.** 403 dönen fakat künyesi Crossref'ten doğrulanan bağlantılar: ACM DOI'leri
    (Buciluă, Williams, Jouppi 2017 ve 2023, Narayanan, Hooker, Hennessy, Luccioni FAccT), IEEE SC 2020 ve
    Science DOI'si; Nature bot duvarı döndürüyor fakat içeriği tarayıcı panosundan okundu.

199. **Doğrulama sınırları (Batch 21).** Çatı çizgisi makalesinin kamuya açık PDF'i bozuk bir gömülü yazı tipi
    kodlamasıyla çıkıyor (harfler kaydırılmış); sayılar tutarlı bir yer değiştirme tablosuyla çözüldü ve
    yalnızca birbirini doğrulayan değerler kullanıldı (4,4 ↔ 35, 6,7 ↔ 55, on altı bileşim = dört çekirdek ×
    dört makine). De Vries'in Joule makalesi, CSET'in tedarik zinciri raporu, Leiserson'ın Science makalesi, Eyeriss,
    Groq'un ISCA bildirisi ve Kaack'ın Nature Climate Change makalesi indirilemedi; altısı da
    kullanılmadı, dolayısıyla 90'da veri merkezi büyüme projeksiyonu ve 89'da tedarik zinciri **hiç iddia
    edilmedi** — manzara, okunabilen kaynakların söylediğiyle sınırlı tutuldu.

200. **Faz 10'un kategorisi ve Batch 22'nin kohortu.** 91–94'ün dördü de `foundations`; kohort
    `classification_batch: 22`. Gerekçe: Faz 10, Faz 1'in (`foundations`, 1–5) sezgiyle kurduğu kavramları
    biçimsel düzeyde yeniden kuruyor; kategori kronolojiyi değil **katmanı** adlandırır. Kontrollü sözlükte
    kullanılmamış tek kalem olan `case-studies` matematiksel omurgaya uymuyordu; `models-and-training` ise
    mimari ve eğitim başlıklarının adı. Okuma listesinde `foundations` böylece **iki öbek** hâlinde görünüyor
    (1–5 ve 91–94); `reading-list-groups.test.ts` bu durumu zaten sınıyor ("aynı kategori iki koşuda benzersiz
    anahtar alır") ve değiştirilmedi, yalnızca çalıştırıldı.
201. **Level bandı `advanced`'e geçti.** 91'den itibaren yeni makaleler `advanced` taşır. Gerekçe doğrudan
    SOZLESME §1'in faz-göreli kuralıdır: "giriş fazları beginner, orta fazlar intermediate, **matematiksel
    omurga ve sonrası advanced**". Karar #19 ("Faz 2 ve sonrası intermediate") aynı kuralın bir önceki
    bandıydı ve yürürlükten kalkmıyor; 11–90 `intermediate` kalır. `advanced` etiketi arayüzde "İleri" olarak
    zaten tanımlıydı (`src/lib/content/labels.ts`), yeni kod gerekmedi. Bu, serinin ilk `advanced` kohortudur.
202. **93'ün başlığı Türkçeleştirildi.** "Olasılığın Dili: Dağılımlar, Beklenti ve MLE" → **"Olasılığın Dili:
    Dağılımlar, Beklenti ve En Büyük Olabilirlik"**. Ölçüt karar #99'unkiyle aynı: "en büyük olabilirlik"
    Türkçede yerleşik bir karşılıktır ve 13. makalenin gövdesinde zaten kullanılmıştır, dolayısıyla MDP gibi
    açılır. **91, 92 ve 94'ün başlıkları değiştirilmedi:** "embedding" karar #108'in Türkçeleştirilmeyen
    kalemler sınıfındadır (terim defteri, 4: "gömme kullanılmaz"); "rank" defterde gloss'suz kalemdir; "SVD"
    ve "KL" karar #185'in SSM'i ve #193'ün GPU'su gibi başlıkta kalan kısaltmalardır. **Faz başlıkları
    katmanına yine dokunulmadı** (karar #52'deki açık soru sürüyor). Bandın dışında bekleyen aday hâlâ 108.
203. **Terim kararları (Batch 22).** Yeni kurulanlar: "vektör uzayı", "doğrusal dönüşüm", "taban",
    "tek-sıcak", "norm", "eşyönlülük / eşyönsüzlük", "noktasal karşılıklı bilgi" (91); "doğrusal bağımsız",
    "özvektör / özdeğer", "tekil değer", "tekil değer ayrışımı", "Frobenius normu", "kovaryans matrisi" (92);
    "olasılık dağılımı", "beklenti", "en büyük olabilirlik", "yanlılık (tahmincide)", "mod" (93); "entropi",
    "çapraz entropi", "nat", "bayt başına bit" (94). **Üç çakışma gövdede adlandırıldı:** (a) "norm" ile
    7'deki katman normalleştirme; (b) "yanlılık" — 3'teki **sapma** (nöronun sabit terimi) ve 45/73'teki
    hakem yanlılığı ile aynı İngilizce sözcüğün üçüncü kullanımı; (c) artık bağlantının **ikinci** işi
    (rank çöküşünü durdurmak), karar #2'nin yasakladığı cümleyle karıştırılmasın diye 92'de ayrıldı.
    Ayrıca resmî kurulumu geciken üç kalem kapatıldı: "kosinüs benzerliği" (39'da glosssuzdu), "tekil değer
    ayrışımı" (76'da glosssuzdu), "çapraz entropi" (84 ve 87'de glosssuzdu).
204. **Sayılar (Batch 22). 91:** oyuncak embedding (0,8; 0,2; 0,9) / (0,7; 0,1; 0,1) / (0,1; 0,8; 0,1) →
    (0,2; 0,9; 0,9); M matrisi sütunları (1;0), (0;2), (−1;1) ve x = (3;1;2) → (1;4); a = (3;4) için
    b = (10;0) nokta çarpım 30 · kosinüs 0,600 · Öklit 8,06 ve c = (2;2) için 14 · 0,990 · 2,24;
    Levy–Goldberg–Dagan varsayılan ayarlarla Google analoji: PPMI 0,491 · SVD 0,452 · SGNS 0,530;
    Ethayarajh: GPT-2'nin son katmanında rastgele iki kelime neredeyse tam kosinüs benzerliği;
    Timkey–van Schijndel: XLNet son katmanında tek boyut beklenen benzerliğin yüzde 99'undan fazlası,
    boyut 667'nin ortalama etkinliği 180,0 ↔ diğerlerinin −0,084 (σ 0,77), baskın boyut sayısı 1–3.
    **92:** rank-2 matris (1;0;1)/(0;1;1)/(1;1;2); saklama eşiği r < mn/(m+n) ve 3×3'te eşik 1,5;
    A = (3;1)/(1;3) özdeğerleri 4 ve 2, tekil değerleri 4 ve 2, en iyi rank-1 hâli (2;2)/(2;2), hata
    matrisi (1;−1)/(−1;1), Frobenius normları 4,47 · 4 · 2, tutulan pay 16/20 = yüzde 80; B = (0;2)/(0;0)
    özdeğerleri 0 ve 0, tekil değerleri 2 ve 0; Denil: ağırlıkların yüzde 95'inden fazlası tahmin edilebilir;
    Aghajanyan 1.608 ↔ 207 (19'dan); Hu: r = 8 ile r = 64 arasında normalleştirilmiş benzerliği 0,5'in
    üzerinde tek boyutluk ortak alt uzay; ReLoRA 1,3 milyar parametre, kart başına 5,5 GB, yüzde 9–40 hız;
    SVD-LLM: LLaMA 2-7B WikiText-2 perplexity 5,47 → ham SVD ile yüzde 20 sıkıştırmada **18.192**, yöntemle
    7,73; LASER: GPT-J CounterFact 13,1 → 24,0 → 29,2. **93:** softmax logit'leri 2,0 · 1,0 · 0,1 →
    üsteller 7,389 · 2,718 · 1,105, toplam 11,213, paylar 0,659 · 0,242 · 0,099; T = 0,5'te
    0,864 · 0,117 · 0,019, T = 2'de 0,502 · 0,304 · 0,194; gradyan 0,659 − 1 = −0,341, 0,242, 0,099;
    olabilirlik p = 0,5 → 0,000977, 0,6 → 0,001792, **0,7 → 0,002224**, 0,8 → 0,001678; pass@k n = 200,
    c = 20 için yerine koyma 0,1000 · 0,4095 · 0,6513 · 0,9948, yansız 0,1000 · 0,4128 · 0,6602 · 0,9977;
    Renze–Güven: 0,0 ile 1,0 arası sıcaklık değişiminin çoktan seçmeli problem çözmede anlamlı etkisi yok
    (dokuz model, beş istem tekniği, 0,0–1,6 taraması). **94:** p = (0,5; 0,25; 0,25) ve q = (0,8; 0,19; 0,01)
    için H(p) = 1,500 · H(p,q) = 2,421 · KL(p‖q) = 0,921 · H(q) = 0,779 · H(q,p) = 1,200 · KL(q‖p) = 0,421 bit;
    kayıp 1,609 nat → perplexity 5,00 (doğru token'a 0,2); 2,051 → 7,78 ve 1,937 → 6,94, fark 0,114 nat/token
    ↔ yüzde 12; Shannon 1951: yüz harfe kadar uzun menzilli etkilerle entropi harf başına yaklaşık bir bit,
    fazlalık kabaca yüzde 75; Cover–King 1978: yaklaşık 1,3 bit/simge; Brown ve ark. 1992: üst sınır
    1,75 bit/karakter; Delétang: Chinchilla 70B ImageNet parçaları yüzde 43,4 (PNG 58,5) ve LibriSpeech
    yüzde 16,4 (FLAC 30,3); Huang ve ark.: 31 model, 12 ölçüt, Pearson yaklaşık −0,95;
    KL_bon = log n − (n−1)/n → n = 4: 0,636 · n = 10: 1,403 · n = 1.000: 5,909 · n = 60.000: 10,002 nat.
205. **Kendi hesabımız (Batch 22): dört yer.** (a) 91'deki üç cetvel tablosunun bütün sayıları (nokta çarpım,
    kosinüs, Öklit uzaklığı) kurulmuş üç vektörden elle hesaplandı ve şekle "elle hesaplandı" kaydı düşüldü.
    (b) 92'deki A ve B matrislerinin özdeğerleri, tekil değerleri, rank-1 yaklaşıklığı ve Frobenius normları
    elle hesaplandı; teorem kaynaklı, sayılar bizim. (c) 93'teki softmax tablosu, gradyan üçlüsü, olabilirlik
    değerleri ve pass@k'nın iki sütunu kaynakların verdiği **tanımlardan** elle hesaplandı (Codex çalışması
    tahminciyi verir, bu sayıları vermez). (d) 94'teki entropi/çapraz entropi/KL üçlüsü, perplexity
    çevrimleri, yüzde 12'lik fark ve KL_bon değerleri elle hesaplandı; hepsinde girdiler metinde duruyor.
206. **Şekil kararları (Batch 22).** On iki şeklin onu tablo ya da kutu-yan-yana, biri üç kutulu akış
    (92-Şekil 3), biri de tek oklu bir eksen çizimi (91-Şekil 1). **Ölçülmemiş eğri çizilmedi**; uydurulmuş
    çubuk ya da nokta verisi yok. Sayı bütünlüğü kuralı gereği şekillerdeki her sayı gövdede de geçiyor.
    Kendi hesabımız olan bütün şekillere "elle hesaplandı" kaydı kondu. **PNG turu bir kusur buldu:**
    94-Şekil 1'in ilk sürümünde KL satırının açıklaması, değer metni uzun olduğu için bir alt satıra
    düşürülmüştü ve üç satırlık ritmi bozuyordu; şekil yeniden çizildi — değer kısaltıldı, ayrışma
    (1,500 + 0,921 = 2,421) alttaki kutuya taşındı. İki geometri kapısı da bu kusuru görmemişti.
207. **Kaynak politikası (Batch 22).** 91'de 11, 92'de 16, 93'te 10, 94'te 13 kaynak (**50 kalem**).
    Dağılım: **44 hakemli**, 5 ders kitabı (Axler ×2, Bishop ×2, Jurafsky–Martin ×1) ve 1 hakemsiz
    (Chen ve ark., Codex teknik raporu — metinde işaretlendi). Faz 10'un kaynak profili beklendiği gibi
    değişti: klasik künyelerin payı yükseldi (Shannon 1948/1951, Kullback–Leibler 1951, Fisher 1922,
    Eckart–Young 1936, Beltrami üzerinden Stewart 1993, Deerwester 1990, Cover–King 1978, Jelinek 1977,
    Brown 1992, Aggarwal 2001, Beyer 1999) ve bunların tamamı Crossref'ten DOI ile doğrulandı.
    **Ders kitabı kuralı uygulandı:** Axler için 1B (s. 12), 3A/3C (s. 52–79), 5A (s. 133), 6A (s. 182),
    7E (s. 270–279); Bishop için 1.2 (s. 12–30), 1.2.2 (s. 19), 2.1 (s. 68–71), 12.1 (s. 561–570);
    Jurafsky–Martin için bölüm 3 (perplexity 3.5, yumuşatma 3.6). Üçünün de açık erişimli bağlantısı var.
208. **Doğrulama sınırları ve künye düzeltmeleri (Batch 22).** (a) **Ön baskı ↔ yayımlanmış başlık farkı
    üçüncü ve dördüncü kez vurdu:** Chinchilla'nın NeurIPS 2022'deki başlığı "An empirical analysis of
    compute-optimal large language model training" (ön baskı: "Training Compute-Optimal…") ve Stiennon ve
    ark.'nın NeurIPS 2020'deki başlığı "Learning to summarize **with** human feedback" (ön baskı: "…**from**
    human feedback"). İkisi de dizin sayfasından düzeltildi; 9. makale Chinchilla'yı zaten doğru başlıkla
    anıyordu ve 94 ona hizalandı. (b) **NeurIPS hash URL'si yine elle yazılamaz:** Levy–Goldberg 2014 için
    tahmin edilen hash yanlıştı, dizinden çözüldü. (c) **OpenReview kimlikleri `openreview.net/forum` sayfası
    200 döndürdüğü hâlde doğrulanmış sayılmaz** — sayfa bot doğrulaması gösteriyor ve yanlış kimlik de 200
    verir. Kimlikler `api.openreview.net/notes/search` (eski mecralar) ve `api2` (yeni mecralar) ile tek tek
    doğrulandı; iki kimlik hiç doğrulanamadığı için (LASER ve Delétang) bağlantı `proceedings.iclr.cc` hash
    biçimine çevrildi. (d) **Wiley DOI'si markdown'da kırılıyor:** `10.1002/(SICI)…` içindeki parantez
    bağlantıyı erken kapatıyor; yüzde kodlamasıyla (`%28SICI%29`) yazıldı. (e) Kullback–Leibler 1951 ve
    Jaynes 1957'nin kamuya açık kopyaları taranmış görüntüdür, metin katmanı yoktur; ikisinden de **sayı
    alınmadı**, künyeleri Crossref'ten doğrulandı ve Jaynes hiç kullanılmadı. (f) Harris 1954, Deerwester
    1990, Fisher 1922, Strang ve Murphy'nin metinleri bot ya da ödeme duvarı yüzünden indirilemedi;
    Deerwester ve Fisher yalnızca künye düzeyinde anıldı, Strang ve Murphy **hiç kullanılmadı**, Harris
    zaten 4. makalede kayıtlı. (g) **Bu run'ın araştırma çalışma dizini (`artifacts/b22-research/`)
    doğrulama turunun ortasında paralel bir oturum tarafından silindi** (aynı worktree'de BOUN serisi üretimi
    çalışıyordu ve `artifacts/` altını temizledi). Silinme anında yazım, entegrasyon, sayı doğrulaması ve
    bağlantı taraması **bitmişti**; kalan kapılar (rota sweep'i, DOM ölçümü, PNG turu) betikler oturum
    scratchpad'ine yeniden yazılarak tamamlandı. Kaynak metinleri kurtarılmadı.

209. **Faz 11'in kategorisi ve Batch 23'ün kohortu.** 95–98'in dördü de `foundations`; kohort
    `classification_batch: 23`. 95–97 Faz 10'un devamı olduğu için karar #200'ün doğrudan uzantısı. **98 yeni bir
    faz açıyor ve kategori kararı onun için verildi:** Faz 11 (Araştırma Pratiği, 98–102) da `foundations`.
    Gerekçe: Faz 10 "araştırmacı formasyonunun giriş kapısı" olarak tanımlanmıştı; Faz 11 aynı formasyonun
    yöntem tarafıdır — nasıl okunur, nasıl tasarlanır, nasıl ölçülür, nasıl tekrarlanır. Kategori konuyu değil
    **katmanı** adlandırır (karar #200) ve bu katman temeldir. Kontrollü sözlükteki iki alternatif de daha kötü
    oturuyordu: `safety-and-evaluation` (61–80) modelin güvenliğini ve değerlendirilmesini adlandırıyor, oysa
    98–102 literatürün kendisini konu ediniyor; kullanılmamış tek kalem olan `case-studies` ise 114–115 için
    doğal yerinde duruyor. Sonuç: okuma listesinde `foundations` yine **iki öbek** (1–5 ve 91–98) ve kohort
    ayrımı sayesinde Batch 22 ile Batch 23 ayrı gruplar olarak görünüyor; `reading-list-groups.test.ts`
    değiştirilmedi, yalnızca çalıştırıldı (624 test).
210. **98'in başlığı Türkçeleştirildi.** "Paper Nasıl Okunur: İddia, Kanıt ve Hakemlik" → **"Bir Çalışmayı
    Okumak: İddia, Kanıt ve Hakemlik"**. Ölçüt #99'unkiyle aynı: "paper" Türkçede yerleşik karşılıklara sahip.
    Ama doğrudan "makale" **kullanılamazdı**, çünkü seri kendi birimlerine "makale" diyor ve "Makale Nasıl
    Okunur" başlığı okuyucuda serinin kendisini kastettiği izlenimi bırakırdı. Seçilen sözcük **"çalışma"**:
    seri boyunca yüzlerce kez "Shannon'ın 1948 tarihli çalışması" biçiminde zaten bu anlamda kullanılıyor,
    dolayısıyla yeni bir terim kurulmadı, var olan kullanım başlığa taşındı. Aynı gerekçeyle `roadmap.json`'daki
    Faz 11 açıklaması da güncellendi ("Paper okumaktan…" → "Çalışma okumaktan…"). Başlık değişikliği
    entegrasyondan **önce** yazıldı. **95, 96 ve 97'nin başlıkları değiştirilmedi:** "optimizasyon" Türkçede
    yerleşiktir, "LLM" karar #108'in kısaltma sınıfındadır.
211. **Terim kararları (Batch 23).** Yeni kurulanlar: "eniyileyici", "gradyan" (nesne olarak), "yönlü türev",
    "Hessian", "koşul sayısı", "momentum", "ağırlık sönümü", "gradyan kırpma" (95); "yanlılık ↔ oynaklık",
    "düzgün yakınsama", "etkin model karmaşıklığı", "örtük düzenlileştirme" (96); "Bayes hatası", "torbalama",
    "gradyan artırma", "çekirdek", "k-ortalamalar" (97); "ablasyon", "ön baskı" (98). **Eşanlamlı çatışması
    çözüldü:** 8 ve 19 "optimizatör", 89 ve 94 "eniyileyici" diyordu; SOZLESME §2 yerleşik biçimin seri boyunca
    sabit kalmasını istediği için **"eniyileyici" seçildi** ve 95'te bir cümleyle ikisinin aynı şey olduğu
    söylendi. Geriye dönük düzeltme yapılmadı (yayımlanmış gövdeye dokunulmaz). **Çakışma uyarıları:** 96'daki
    "yanlılık" 3'teki **sapma** (nöronun sabit terimi) ve 45/73'teki **hakem yanlılığı** ile karıştırılmaz —
    ayrım 93'te yapılmıştı ve korundu; 97'deki "torbalama ↔ gradyan artırma" çifti SOZLESME §3'ün
    karıştırılabilir kavram kuralına göre aynı bölümde ve bir "Kendini yokla" kutusuyla ayrıştırıldı.
212. **Sayılar (Batch 23). 95:** f(w) = ½(w₁² + 20w₂²), (2; 1) noktasında gradyan (2; 20), uzunluk 20,0998;
    yönlü türevler (1; 0) → +2,0000, (0; 1) → +20,0000, (0,7071; 0,7071) → +15,5563, gradyanın yönü → +20,0998,
    ters yön → −20,0998. 2. makalenin kaybının ikinci türevi λ = (2/3) × 14 = 28/3 = 9,333 ve 2/λ = 6/28 = 3/14
    = 0,2143; uzaklık çarpanları α = 0,05 → +0,5333, 0,10 → +0,0667, 0,20 → −0,8667, 0,2143 → −1,0000,
    0,25 → −1,3333. Koşul sayısı 20: sabit adım 2/21 = 0,09524, çarpan 0,9048, yüzde bire 47 adım; momentum
    0,6345 ve 11 adım (4,5 kat). Koşul sayısı 100: 0,9802 ve 231 adım; momentum 0,8182 ve 23 adım (10,0 kat).
    Adam varsayılanları α = 0,001, β₁ = 0,9, β₂ = 0,999, ε = 10⁻⁸; ilk adım gradyan 0,001 için 0,00099999,
    gradyan 10 için 0,00100000 (gradyan inişinde 0,00000100 ↔ 0,01000000, on bin kat). AdamW: sönüm katsayısı
    0,01, ağırlık 1,0; uyarlamalı payda 10 → kayba ceza 1,0 × 10⁻⁶, payda 0,1 → 1,0 × 10⁻⁴ (yüz kat), ayrık
    sönüm iki durumda da 1,0 × 10⁻⁵. Keskar'ın genelleme farkı yüzde 5'e varıyor; Schmidt ve ark. **on beş**
    eniyileyici ve **50.000'den fazla** koşu; Goyal ve ark. 8.192'lik yığın. **96:** gerçek değer 2,0, gürültü
    varyansı 1,5; c = 0 → 4,0000, c = 0,5 → 1,3750, c = 8/11 ≈ 0,7273 → 1,0909 (en iyi), c = 0,9 → 1,2550,
    c = 1 → 1,5000; yansız seçime göre yüzde 27,3 kazanç. Zhang ve ark. CIFAR-10: Inception 1.649.402 parametre,
    gerçek + düzenlileştirme 100,0/89,05, düzenlileştirmesiz 100,0/85,75, rastgele etiket 100,0/9,78; MLP 1×512
    1.209.866 parametre, 100,0/50,51 ve 99,34/10,61; ImageNet rastgele etiket eğitim doğruluğu 95,20. Nakkiran
    ve ark.: ResNet18, CIFAR-10, etiketlerin yüzde 15'i bozulmuş, Adam, 4.000 dönem; dördün katı veri kritik
    bölgede iyileştirmiyor. Feldman–Zhang: ImageNet'te örneklerin ≈ yüzde 32'sinin ezber değeri ≥ 0,3, marjinal
    fayda ≈ yüzde 3,4 (aynı büyüklükte rastgele küme ≈ 2,6). Jiang ve ark.: **40'tan fazla** ölçü,
    **10.000'den fazla** ağ; spektral norm çarpımı sınırı genellemeyle **güçlü negatif** ilişkili. **97:**
    Cover–Hart sınırı R ≤ R*(2 − M R*/(M−1)); M = 2 için R* yüzde 1 → yüzde 1,98 (1,980 kat), yüzde 5 → yüzde
    9,50 (1,900), yüzde 10 → yüzde 18,00 (1,800); M = 10, R* yüzde 5 → yüzde 9,72 (1,944). k-ortalamalar++
    logaritma k güvenceli, k-ortalamalar güvencesiz, problem iki kümede bile NP-zor. Grinsztajn ve ark.:
    45 küme, orta ölçek ≈ 10.000 satır, ≈ 20.000 hesap saati; rastgele döndürme sıralamayı **tersine
    çeviriyor**. McElfresh ve ark.: 19 algoritma, 176 küme; TabPFN ≈ 3.000 satır sınırında ortalamada önde.
    TabPFN (ICLR 2023): OpenML-CC18'den 18 küme, ≤ 1.000 eğitim noktası, ≤ 100 sayısal öznitelik, ≤ 10 sınıf.
    Delgado ve ark.: 179 sınıflandırıcı, 17 aile, 121 küme; en iyi rastgele orman en büyük doğruluğun yüzde
    94,1'ini alıyor ve kümelerin yüzde 84,3'ünde yüzde 90'ı aşıyor, ikinci sıradaki Gauss çekirdekli destek
    vektör makinesi yüzde 92,3 ve fark anlamlı değil. **98:** NeurIPS 2014'te 116 çift değerlendirilen bildiri,
    kabul edilenlerin yüzde 49,5'i öbür komitede reddedilirdi; NeurIPS 2021'de 9.122 gönderiden 882'si çift
    değerlendirildi, kararlarda yüzde 23 anlaşmazlık, kabul edilenlerin yüzde 50,6'sı (komite başına 51,9 ve
    49,2) öbür komitede reddedilirdi, rastgeleye göre iyileşme yüzde 35. Eşik çözümlemesi: yalnızca sözlü ve
    öne çıkan sunumlar → yüzde 88,8 ve iyileşme yüzde 8; poster eşiği bir kademe aşağı → yüzde 63,2 ve yüzde 25.
    Cortes–Lawrence: puan değişkenliğinin yaklaşık **yarısı** öznel. Tomkins ve ark.: kabul oranı yüzde 15,6
    olan konferans, gönderi başına iki tek-kör ve iki çift-kör hakem.
213. **Kendi hesabımız (Batch 23): dört yer.** (a) 95'teki yönlü türev tablosunun beş değeri, verilen
    gradyandan elle hesaplandı; (b) 95'teki koşul sayısı tablosunun adım sayıları (47, 11, 231, 23) ve kazanç
    oranları (4,5 ve 10,0 kat), Bottou ve ark.'nın verdiği çarpan formüllerinden logaritma alınarak türetildi —
    **ölçülmüş bir eğitim koşusu değildir** ve şeklin içinde öyle yazıyor; (c) 95'teki Adam ilk adımı ile AdamW
    sönüm karşılaştırmasının bütün değerleri, kaynakların verdiği güncelleme kurallarından elle hesaplandı;
    (d) 96'daki yanlılık-oynaklık tablosunun tamamı verilen iki sayıdan (2,0 ve 1,5) elle hesaplandı ve
    **ölçülmüş bir deney değildir**. Ayrıca 95'teki 2/λ türetmesi 2. makalenin **yayımlanmış** sayılarını girdi
    olarak kullanıyor; bu bir yeniden ölçüm değil, aynı sayının ikinci yoldan gösterimidir.
214. **Şekil kararları (Batch 23).** On üç şeklin hepsi tablo, blok listesi ya da iki panel; **hiçbirinde eğri
    yok**. Gerekçe SOZLESME §6'nın sayı bütünlüğü kuralı: bu batch'in malzemesi ya kapalı formüllerden türeyen
    değerler ya da kaynakların tablo hâlinde verdiği ölçümler; çift inişin, kayıp yüzeyinin ve öğrenme
    eğrisinin şekli elimizde ölçülmüş nokta olmadan çizilemezdi. 96-Şekil 3 bunun en bilinçli örneği: çift iniş
    üç eksende **tablo olarak** verildi, U eğrisi çizilmedi ve şeklin altına "ölçülmemiş bir eğri çizilmedi"
    kaydı düşüldü. Dört şekilde ikinci bir kutu yalnızca **sınırı** taşıyor (95-Şekil 3, 96-Şekil 3, 97-Şekil 1,
    98-Şekil 1) — fazın tonu bunu gerektirdi.
215. **Kaynak politikası (Batch 23).** 95'te 15, 96'da 12, 97'de 16, 98'de 11 kaynak: **54 kalem, 52 ayrı
    çalışma** (Grinsztajn ve ark. 97 ile 98'de, Reddi ve ark. 95 ile 98'de iki kez anıldı). Dağılım: **48
    hakemli**, 1 ders kitabı (Boyd–Vandenberghe, §9.3, s. 466–475), 1 çalıştay bildirisi (Sculley ve ark.,
    ICLR 2018 çalıştayı), 1 editoryal dergi (Lipton–Steinhardt, ACM Queue — metinde açıkça işaretlendi) ve
    **3 hakemsiz ön çalışma**: Goyal ve ark. 2017, Cortes–Lawrence 2021, Beygelzimer ve ark. 2023. Üçü de
    metinde işaretlendi. Son ikisi için ek bir kayıt düşüldü ve **98'in gövdesinde bir ironi olarak kullanıldı**:
    hakemliğin ölçümünü yapan iki belge de hakemlikten geçmemiştir. Ders kitabı kuralı (sayfa/bölüm numarası +
    doğrulanabilir bağlantı) Boyd–Vandenberghe için uygulandı.
216. **Doğrulama sınırları ve künye notları (Batch 23).** (a) **Doğrulanamayan künye yok.** ACM, Springer,
    PNAS, MIT Press ve IEEE DOI'leri tarayıcıya 403/202/"Client Challenge" döndürdü — beklenen bot duvarı;
    on beş klasik künyenin tamamı `api.crossref.org/works/<doi>` ile başlık, dergi, cilt, sayı, sayfa, yıl ve
    yazar düzeyinde doğrulandı. (b) **OpenReview kimlikleri yine API ile doğrulandı**, `forum` sayfası bot
    doğrulaması gösterdiği için 200 tek başına kanıt sayılmadı: `ryQu7f-RZ`, `Bkg6RiCqY7`, `a65YK0cqH8g`,
    `BJgnXpVYwS`, `H1oyRlYgg`, `Sy8gdB9xx`, `B1g5sA4twr`, `SJgIPJBFvH`, `ByJHuTgA-`, `Fp7__phQszn`,
    `rJWF0Fywf`. Arama ucu 429 verdiği için sorgular arasında 7 sn beklendi. (c) **Elsevier DOI'sindeki
    parantez markdown'ı kırıyor:** Polyak 1964'ün DOI'si `10.1016/0041-5553(64)90137-5`; parantezler yüzde
    kodlamasıyla (`%2864%29`) yazıldı — Batch 22'deki Wiley dersinin ikinci uygulaması. (d) **NeurIPS hash
    URL'leri bu kez tahmin edilmedi**, `papers.nips.cc` dizin sayfalarından çekilerek doğrulandı; McElfresh
    ve ark. dâhil hepsi başlık düzeyinde eşleşti. (e) **ICLR 2015 ve öncesi için arXiv bağlantısı kullanıldı**
    (Adam), çünkü o yılların bildirileri OpenReview'da forum kimliğiyle durmuyor; seride 4, 63 ve 87'de
    kurulmuş biçim korundu. (f) Kunstner ve ark.'nın ön baskı sürüm numarası 404 verdi, sürümsüz arXiv
    adresinden indirildi; Bartlett ve ark.'nın PNAS sayfası 403 döndü, özeti Crossref'ten alındı.
217. **99'un başlığı Türkçeleştirildi.** "Araştırma Sorusu ve Deney Tasarımı: Hipotez, **Baseline, Ablation**" →
    "… Hipotez, **Taban Çizgisi, Ablasyon**". Ölçüt #99 ve #210'unkiyle aynı: iki sözcüğün de Türkçe karşılığı
    seride **zaten kurulmuş** durumdaydı — "ablasyon" 98'de terim defterine girdi, "taban çizgisi" 16'dan beri
    kullanılıyor ve 97'de bir bölümün omurgasıydı. Yani başlık yeni bir terim kurmuyor, var olan kullanımı
    başlığa taşıyor. Başlık değişikliği entegrasyondan **önce** `roadmap.json`'a yazıldı.
218. **102'nin başlığındaki gereksiz İngilizce kaldırıldı.** "Tekrarlanabilirlik: **Reproducibility**, Negatif
    Sonuç ve Açık Bilim" → "Tekrarlanabilirlik: Negatif Sonuç ve Açık Bilim". Gerekçe #217'den farklı: burada
    sözcük Türkçeleştirilmedi, **çıkarıldı** — çünkü karşılığı başlığın kendisinde zaten duruyordu ve tekrar
    ediyordu. 100 ve 101'in başlıkları değiştirilmedi ("benchmark" #108'in Türkçeleştirilmeyen sınıfındadır;
    "Yüzüncü Adım" makalenin kendi sıra numarasıdır ve SOZLESME §2'nin yasakladığı **toplam** sayı beyanı
    değildir — 100'ün gövdesi bunu açıkça bir ara durak olarak adlandırır).
219. **Faz 11 kapandı, yeni faz açılmadı; kohort `classification_batch: 24`.** 99–102'nin dördü de `foundations`
    ve karar #209'un doğrudan uzantısı; bu run **kategori sorusu içermiyordu**. Level `advanced` kaldı (karar
    #201). Okuma listesinde `foundations` yine iki öbek (1–5 ve 91–102) ve kohort ayrımı sayesinde Batch 23 ile
    Batch 24 ayrı gruplar olarak görünüyor; `reading-list-groups.test.ts` değiştirilmedi, yalnızca çalıştırıldı.
220. **100 bir sentez makalesidir ve kuralları ayrıdır.** Yeni kavram tanıtmıyor, yeni ölçüm yapmıyor ve hiçbir
    sayıyı yeniden hesaplamıyor; kullandığı bütün değerler yayımlanmış makalelerdeki hâlleriyle alınmış durumda.
    Kaynakçası, gövdede sayısı anılan çalışmaların künyelerini taşıyor (yedi kalem) ve hepsi önceki batch'lerde
    doğrulanmış bağlantılardır. **Ölçüt:** bir sentez makalesi kaynak açmaz, kaynak **gösterir**. Ayrıca 100,
    Faz 12'ye kasıtlı bir boşluk bırakıyor ("bir Transformer'ı baştan sona elle kurmak") ve bunu numarasız
    söylüyor.
221. **Sayılar (Batch 24). 99:** Kaplan–Irvin 55 deneme, 2000 öncesi 30 denemenin 17'si (yüzde 57), 2000 sonrası
    25 denemenin 2'si (yüzde 8); Nosek'te aktarılan Franco bulgusu yüzde 40 / yüzde 70 / yüzde 96 / yüzde 65;
    Blalock 81 bildiri (79 + 2 klasik), dörtte birden fazlası hiçbir yöntemle karşılaştırmamış, yarısı en fazla
    bir, neredeyse hepsi üç ya da daha az, hiçbir veri kümesi–ağ çifti bildirilerin üçte birinde yok; Dodge
    SST'de 50 deneme ve on denemenin altında lojistik bağlanım önde, temsil seçiminde 2 saat / 6 saat–1 gün /
    10 gün, SciTail'de 2 ↔ 20 deneme, SQuAD'da 55 deneme ≈ 18 gün, elli EMNLP 2018 bildirisinin hiçbiri tam
    raporlama yapmıyor; Bergstra dokuz ızgara noktası kritik ekseni üç değerde yokluyor, 32 boyutlu uzayda
    yedi kümenin dördünde istatistiksel olarak eşit ve birinde daha iyi; Narang 65.536 adımda vanilla 2,182 ±
    0,005, GeLU 2,179 ± 0,003, GLU 2,174 ± 0,003, ELU 2,270 ± 0,007, uzmanlar karışımı 2,135 ± 0,007 (223 milyon
    ↔ 1,1 milyar parametre), evrensel Transformer 2,40 → 2,265 (25 yapılandırmadan 2'si), on iki tekniğin
    yazarlarından altısı kurulumu doğruladı. **101:** Dror 180 bildiri / 63 test / 21 adsız / 6 yanlış, 110
    bildiriden 3'ü düzeltme yapmış; Koehn 300 cümlelik kümede bile karar verilebiliyor; Bouthillier beş örnek
    olay, kaynak başına 200 rastgeleleştirme, ~8 GPU yılı, ağırlık başlangıcı bootstrap oynaklığının yarısından
    az, hiperparametre araması ortalamada ağırlık başlangıcı kadar, 51 kat hesap tasarrufu, tek koşu yüzde 10 /
    75, ortalama karşılaştırma yüzde 5 altı / 90, geçme olasılığı yüzde 5 / 30; Gorman 20 rastgele bölmede
    20-20 / 20-7 / 1-0 / 19-20 / 20-20 ve Stanford iki ile on dört bölmede daha kötü, yirmi yılda yüzde 1,28
    mutlak azalma, kâhin topluluğun yüzde 1,16 gerisi. **102:** Gundersen 400 bildiri, hiçbiri tam değil, yüzde
    20–30; Raff 255 bildiri, 162'si (yüzde 63,5) yeniden üretildi, 93'ü üretilemedi; Pineau kod paylaşımı yüzde
    50 altından ~75'e, gönderi yüzde 40 artış, 173 bildiri sahiplenildi, 73 kurum, 84 rapor; Kapoor 17 alan,
    329 bildiri, 8 sızıntı türü; Açık Bilim İşbirliği 100 çalışma, yüzde 97 → 36, etki 0,403 → 0,197, yüzde 47
    aralık içinde, yüzde 39 öznel, birleştirilince yüzde 68, ana etkiler yüzde 47 ↔ etkileşimler yüzde 22.
    **100:** bütün sayılar yayımlanmış makalelerden alındı (0,114 nat; 53,1 → 68,2; 0,651 ve 0,095; 2 saniye →
    110 dakika ve 207 gün; 85,75 ↔ 9,78; 290 bin ↔ 56.600; 229 işlem; yüzde 1,6; 671 ↔ 37 milyar).
222. **Kendi hesabımız (Batch 24): üç yer, üçü de 101'de.** (a) **Şekil 1'in tamamı** — eşleştirilmiş ve
    eşleştirilmemiş karşılaştırmada aynı güçle ayırt edilebilen en küçük fark; girdiler şeklin içinde yazılı
    (doğruluk 0,70; uyuşmazlık oranı 0,10; eşik 0,05 iki yönlü; güç 0,80) ve şeklin altında "ölçülmüş bir deney
    değildir" kaydı duruyor. Eşleştirilmemiş için iki orantının standart hatası, eşleştirilmiş için uyuşmazlık
    oranına dayanan standart yaklaşıklık kullanıldı. (b) **Şekil 4'ün ortalamaları** — yansız ve yerine koyma
    tahmincilerinin beklenen değerleri, iki terimli dağılımın on bir sonucunun tamamı üzerinden alındı
    (0,67232 ↔ 0,59359); tahmincinin **kendisi** Chen ve ark.'nındır ve şekilde öyle yazıyor. (c) **Yirmi
    bağımsız testte en az bir yanlış pozitif olasılığı yüzde 64,2** — 1 − 0,95²⁰; gövdede "bu bizim hesabımız"
    denerek verildi.
223. **Şekil kararları (Batch 24).** On iki şeklin hepsi tablo ya da blok listesi; **hiçbirinde eğri yok**
    (karar #214'ün devamı). Gerekçe aynı: bu batch'in malzemesi ya kaynakların tablo hâlinde verdiği ölçümler ya
    da kapalı formüllerden türeyen değerler. **100'ün Şekil 1'i bu makalenin omurgasıdır** ve yayımlanmış makale
    numaralarıyla etiketlenmiştir; sağ sütunu her fazın bir sonrakine devrettiği ölçüm sorusunu taşır. 101'in
    Şekil 2'si sayı yerine **sözle sıralama** veriyor, çünkü kaynağın kendisi göreli büyüklükleri çubuk olarak
    veriyor ve sayı olarak okunamıyor — bu sınır şeklin altına yazıldı.
224. **Kaynak politikası ve doğrulama sınırları (Batch 24).** 99'da 8, 100'de 7, 101'de 7, 102'de 7 kaynak:
    **29 kalem, 29 ayrı çalışma** (dört makalenin kaynakçaları kesişmiyor; Bouthillier iki ayrı çalışmayla iki
    makalede geçiyor). Dağılım: **25 hakemli**, 1 konferans kuralları belgesi (NeurIPS bildiri kontrol listesi,
    metinde işaretlendi) ve **3 hakemsiz ön çalışma** (Kaplan ve ark. 2020, Beygelzimer ve ark. 2023, Chen ve
    ark. 2021 — üçü de metinde işaretlendi, üçü de önceki makalelerde aynı biçimde kullanılmıştı). **Faz 11'in
    kaynak profili öngörüldüğü gibi çıktı:** 99 ve 102 alan dışı hakemli metodoloji çalışmalarına dayanıyor
    (PLOS ONE, PNAS, Science, Patterns, Nature). **(a) Doğrulanamayan künye yok;** PNAS, Science, Sage, Taylor &
    Francis, Cell ve Wiley DOI'leri tarayıcıya 403 döndürdü — beklenen bot duvarı — ve bu künyelerin tamamı
    `api.crossref.org/works/<doi>` ile başlık, dergi, cilt, sayı, sayfa ve yıl düzeyinde doğrulandı.
    **(b) OpenReview API'si de kapandı:** `api.openreview.net` ve `api2.openreview.net` bu run'da 403 verdi
    (Batch 23'te 429 veriyordu ama çalışıyordu). 100'ün kullandığı iki forum kimliği (`shr9PXz7T0`, `Sy8gdB9xx`)
    **yayımlanmış makalelerden devralındı** — 71 ve 96'nın kaynakçalarında duruyorlar ve Batch 17 ile 23'te API
    ile doğrulanmışlardı; bu run'da birincisi ayrıca `proceedings.iclr.cc/paper_files/paper/2024` dizininde
    başlık ve yazar düzeyinde bulundu. **Yeni bir OpenReview kimliği yazılmadı.** (c) NeurIPS, MLSys, PMLR ve
    JMLR hash/cilt adresleri dizin sayfalarından çekilerek doğrulandı (`papers.nips.cc` 2018 ve 2019,
    `proceedings.mlsys.org` 2020 ve 2021, `proceedings.mlr.press/v97`, `jmlr.org`). (d) Gundersen–Kjensmo'nun
    bitiş sayfası hiçbir kanaldan doğrulanamadı; künyeye yalnızca PDF'de görünen başlangıç sayfası yazıldı.

225. **Faz 12 ve Faz 13'ün kategorisi `models-and-training`; kohort 25; level `advanced`.** Bu run iki kategori
    kararı borçluydu ve ikisi de aynı yere çıktı. Ölçüt karar #200'ün ölçütüdür: **kategori konuyu değil katmanı
    adlandırır.** 6–20 bandının katmanı "modeli kurmak ve eğitmek"tir; 103–105 aynı katmanın uygulama tarafı
    (mimariyi elle kurmak, eğitmek, asistanlaştırmak), 106–109 ise aynı katmanın mühendislik tarafı (koşuyu
    büyütmek). `foundations` reddedildi çünkü 91–102 **kuram ve yöntem** katmanını adlandırıyordu ve burada
    katman değişiyor; `multimodal-and-future` reddedildi çünkü 88–90'daki donanım konuları o fazın verimlilik
    başlığı altındaydı, oysa Faz 13 doğrudan eğitimin kendisi; `case-studies` reddedildi çünkü bunlar vaka
    incelemesi değil inşa alıştırması (kontrollü sözlükte kullanılmamış tek kalem hâlâ o ve doğal yeri 114–115).
    Sonuç: okuma listesinde `models-and-training` **iki öbek** oluyor (6–20 ve 103–106) ve kohort ayrımı
    sayesinde Batch 2'nin grubuyla karışmıyor — `foundations` için zaten kabul edilmiş desen (kararlar #200,
    #209, #219). `reading-list-groups.test.ts` değiştirilmedi, yalnızca çalıştırıldı ve geçti. Level `advanced`
    kaldı (karar #201).
226. **Mikro-GPT'nin şartnamesi bağlayıcıdır.** 103–105 tek bir modeli paylaşır ve ileride ona atıfta bulunacak
    her makale bu sayıları kullanmak zorundadır: sözlük 7 token (`başla`, `kedi`, `köpek`, `bugün`, `dün`,
    `uyudu`, `havladı`), bağlam 4, vektör boyu 4, 2 baş × 2 boyut, ileri besleme ara boyutu 8, 2 blok,
    ön-katman normalleştirme, GELU, bağlanmış çıktı izdüşümü → **364 parametre**. Dil dört geçerli cümleden
    oluşur ve tek kuralı fiilin özneyle uyuşmasıdır; zarf (`bugün`/`dün`) hiçbir bilgi taşımaz, bu yüzden bir
    önceki token'a bakan model üçüncü konumda yazı tura atar. Karşılaştırma modeli "geniş mikro model"dir:
    aynı mimari, vektör boyu 8 ve ileri besleme 16 ile **1.240 parametre**. Bu şartname 103'ün gövdesinde
    yayımlandı ve değiştirilemez.
227. **108'in başlığı Türkçeleştirildi.** "Performans Mühendisliği: **Attention**'ı Hızlandırmak" →
    "Performans Mühendisliği: **Dikkati** Hızlandırmak". Ölçüt #217 ve #210'unkiyle aynı: "dikkat" 6\. makaleden
    beri seri boyunca kullanılan yerleşik karşılıktır, dolayısıyla başlık yeni bir terim kurmuyor, var olan
    kullanımı başlığa taşıyor. Değişiklik yayımlanmamış bir taslak başlıkta yapıldı ve `roadmap.json`'a yazıldı.
    **Bu bandın başlıkları değiştirilmedi:** 103'teki "Mikro-GPT" uydurulmuş bir addır; 104'teki "Tokenizer"
    15\. makalenin yayımlanmış başlığında yerleşiktir; 105'teki "SFT" ve "DPO" ile 106'daki "GPU" #108'in
    kısaltma sınıfındadır ve 12, 13 ile 89'un yayımlanmış başlıklarında emsali vardır.
228. **Terim kararları (Batch 25).** Yeni kurulanlar: "bağlanmış embedding (tied embedding)" (103),
    "eniyileyici durumu (optimizer state)" (106), "aktivasyon belleği (activation memory)" (106),
    "aktivasyonları yeniden hesaplama" (106), "model FLOP kullanım oranı (model FLOPs utilization, MFU)" (106),
    "bellek merdiveni" (106). **İki çakışma açıkça adlandırıldı:** (a) alan yazınının "activation checkpointing"
    dediği şey 8\. makaledeki **kontrol noktasıyla** aynı değildir — biri belleği, öbürü koşunun sürekliliğini
    kurtarır; ayrım 106'nın gövdesinde yapıldı. (b) 106'daki "bellek" 39\. makalede ayrılan iki anlamdan
    **donanım** olanıdır ve bu, makalenin girişinde söylendi. **"Çekirdek" sözcüğünden kaçınıldı:** 97'de
    (kernel, SVM) ve 10'da (çekirdek örnekleme) zaten iki ayrı nesneyi taşıyor; 106 GPU çekirdeklerinden hiç
    söz etmedi ve o konu 108'e bırakıldı. 104 ve 105 yeni terim kurmadı; ikisi de yerleşik terimleri kullandı.
229. **Sayılar (Batch 25).** **103:** 364 parametre (28 + 16 + 2×156 + 8), bağlanmasa 392; paylar 152/128/44/40,
    ileri beslemenin iki alt-katman içindeki payı %54,3 (7'de %57); GPT-3 / mikro = 480.769.231, taban model /
    mikro = 178.571; GPT-2 küçük sürümünde embedding 50.257 × 768 ≈ 38,6 milyon; dikkat matrisi (baş 1)
    1,000 / 0,356 0,644 / 0,441 0,243 0,316 / 0,070 0,375 0,459 0,095; ham skorlar 0,1307 −0,7146 −0,3395,
    ölçekli 0,0925 −0,5053 −0,2401, üsteller 1,0969 0,6033 0,7865, toplam 2,4867; son vektör (−1,468; −0,140;
    0,290; 1,319); `uyudu` logit'i −0,397 ve olasılık 0,061; dizi kaybı 2,4471, dört dizi 2,1257, ln 7 = 1,9459;
    ileri geçiş 648 işlem/token, 2N kestirimi 728, fark %12, çarpma yapmayan 80 parametre; KV önbelleği 64 sayı.
    **104:** derlem 102 makale / 255.071 kelime / 28.585 farklı kelime / 1.484.770 harf; harf düzeyi 1.739.841
    token, sözlük 85, 6,821 kelime/token; birleştirme–sözlük–token dizisi 100/185/1.051.052, 400/483/726.244,
    1.600/1.669/474.331, 3.200/3.242/389.428, 6.400/6.343/330.996; satır başına kazanç 6.888 → 19, oran 366;
    ilk 12 birleştirme ve sıklıkları; 19. "bir", 27. "yor", 30. "ve"; "okullarda" → ok | ul | larda; eşik 80
    token, 6.343'lük sözlük 25.372 parametre (makinenin 79 katı); kayıp eğrisi 2,1207 → 0,4629; konum başına
    0,6939 / 0,6938 / 0,0010; taban çizgileri 1,9459 / 1,7918 / 0,6931 / 0,4629 / 0,4621; kazanç 0,2302;
    beş tohum 0,46286 0,46425 0,69411 0,46333 0,69545, ortalama 0,55600 ± 0,12669; sekiz ablasyon satırı;
    dikkat ağırlığı farkı 0,0215 ↔ değer farkı 0,6410 ↔ çıktı farkı 0,2244. **105:** temel model 0,4996/0,5004;
    SFT 10/30/120 adım satırları; hizalama vergisi 0,46286 → 1,23545; sigmoid tablosu; δ = 1,5 ÷ β ölçümleri
    (0,766/0,770, 1,530/1,522, 3,018/3,033, 7,565/7,569); üç tohumun DPO satırları; tohum 11'in tam dağılımı
    (`uyudu` 0,99422, `bugün` + `dün` 0,00161); kapasite karşılaştırması 0,8287 ± 0,2847 ↔ 0,9995 ± 0,0002;
    on iki koşunun üçünde yeğlenen cevap başlangıcının altına indi; 58 çekiliş. **106:** 16 bayt = 2+2+4+4+4;
    GPT-2 1,5 milyar için 24 GB ↔ 3 GB; 8/70/405 milyar için 128/1.120/6.480 GB; 5 milyar sınırı ve 81 kart;
    `s·b·h·(34 + 5as/h)`, GPT-3'te 5as/h = 80 ve katsayı 114, katman başına 2,87 GB, 96 katman 275 GB;
    ZeRO'nun 60 GB ↔ 8 GB aktivasyon örneği; 19,6 → 27,2 ms (%39) ve 20,9 ms (%7), oranlar 1,55 ↔ 2,53;
    SRAM 19 TB/s ve 20 MB, HBM 1,5 TB/s ve 40 GB, DRAM 12,8 GB/s, oranlar 12,7 / 117 / 2.000; sırt noktası
    312 ÷ 1,5 = 208 (26'nın çipi 229); yoğunluk tablosu ve 1.024 kat; MFU 21,3 / 32,5 / 30,2 / 46,2 ve 57,8;
    163 ÷ 312 = %52; 6 × 8×10⁹ × 32.768 = 1,57×10¹⁵ FLOP, 5,04 sn ↔ 12,6 sn ↔ 10,7 ms, oran 470.
230. **Kendi hesabımız (Batch 25): bu batch'in çoğu.** Faz 12'nin üç makalesi büyük ölçüde kendi ölçümümüzdür ve
    her biri metinde işaretlendi. (a) **Mikro-GPT'nin bütün sayıları** — saf Python'da yazılmış skaler ters-mod
    otomatik türevli bir uygulama; gradyanlar merkezi farkla doğrulandı (beş parametrede bağıl fark 10⁻⁹
    mertebesinde). 103'ün ağırlıkları rastgele çekilip **iki ondalığa yuvarlandı ve model o yuvarlanmış
    değerlerle çalıştırıldı**, böylece yazılan her sayı baştan sona tutarlı. (b) **BPE ölçümleri** — Sennrich
    ve ark.'nın algoritması bu serinin kendi derlemi üzerinde çalıştırıldı; satır başına kazanç sütunu bizim
    türetmemiz. (c) **Taban çizgileri ve entropi** — düz tahmin, tekli ve ikili sayım kapalı formülden;
    2·ln2/3 = 0,46210 dilin tanımından. (d) **Beş tohumlu sapma ve sekiz ablasyon** — 99\. makalenin ölçütü
    kendi deneyimize uygulandı. (e) **δ = 1,5 ÷ β** — kaybın kapalı formülünden; ölçülen sekiz değer bunun
    %3'ü içinde. (f) **58 çekiliş** — tek orantı sınaması, α = 0,05 iki yönlü, güç 0,80; koşulları metinde.
    (g) **106'nın bütün çarpımları** — 16 bayt muhasebesi Rajbhandari ve ark.'dan, aktivasyon formülü
    Korthikanti ve ark.'dan, sırt noktası ve yoğunluklar bizden. **Sınır her yerde yazıldı:** 105'in tablosu
    tek koşuludur ve öyle söylendi; üç tohumlu karşılaştırma "bir yöntemi ölçmez" kaydıyla verildi.
231. **Şekil kararları (Batch 25).** On üç şeklin hepsi tablo ya da blok listesi; **hiçbirinde eğri yok**
    (kararlar #214 ve #223'ün devamı). Gerekçe aynı: bu batch'in malzemesi ya kendi ölçümümüz ya da kapalı
    formüllerden türeyen değerler, ikisi de tablo olarak dürüst okunuyor. Üç şekil bu batch'in omurgasını
    taşıyor: 104-Şekil 4 (beş tohum, ortalamanın hiçbir koşunun vermediği sayı olması), 105-Şekil 3 (δ aynı,
    çıktı değil) ve 106-Şekil 3 (aynı çip, sırt noktasının iki yanı). **106-Şekil 3, 89-Şekil 1'in kopyası
    değildir:** 89 çatı çizgisi düzlemini log-log eksenlerle çiziyordu, 106 aynı aracı beş rejimin yoğunluk
    tablosuna uyguluyor ve nesnesi eğitim adımı.
232. **Kaynak politikası ve doğrulama sınırları (Batch 25).** 103'te 6, 104'te 4, 105'te 6, 106'da 7 kaynak:
    **23 kalem, 23 ayrı çalışma** (dört makalenin kaynakçaları hiç kesişmiyor). Dağılım: **21 hakemli**,
    2 hakemsiz (Radford ve ark. 2018 OpenAI teknik raporu; Ba ve ark. 2016 arXiv ön baskısı — ikisi de metinde
    işaretli ve ikisi de 7\. makalede aynı biçimde kullanılmıştı). **Faz 12'nin kaynak profili öngörüldüğü gibi
    çıktı:** üç makalenin toplam kaynağı 16 kalem, çünkü gövdenin çoğu kendi hesabımız. **Yazım sırasında bir
    denetim yapıldı ve beş künye kaynakçadan çıkarıldı** (Gage, Kudo–Richardson, Loshchilov–Hutter, Ouyang),
    çünkü gövdede kullanılmıyorlardı; SOZLESME §4 yalnızca gerçekten kullanılan kaynakların listelenmesini
    istiyor. Kalan her künye gövdede yazar adıyla anılıyor ve bu mekanik olarak denetlendi.
    **(a) Doğrulanamayan künye yok.** ACM DOI'leri (Williams ve ark. 2009; Narayanan ve ark. 2021) ve
    Biometrika (Bradley–Terry 1952) tarayıcıya 403 / bot doğrulaması döndürdü — beklenen duvar — ve ACM
    künyeleri `api.crossref.org/works/<doi>` ile cilt, sayı, sayfa ve yıl düzeyinde doğrulandı (CACM 52(4),
    s. 65–76; SC 2021, s. 1–15). (b) PMLR, NeurIPS, MLSys, ACL Anthology ve JMLR adreslerinin hepsi 200 döndü
    ve başlıkları eşleşti; PaLM'ın künyesi JMLR'ın kendi bib kaydından alındı (24(240), 1–113).
    (c) **OpenReview hiç kullanılmadı** (karar #224'ün devamı); bu bandın kaynaklarının hiçbiri oradan gelmiyor.

233. **Faz 14'ün kategorisi: bölünmüş atama.** 110–113 ve 116–118 `multimodal-and-future`; **114–115
    `case-studies`**. Alternatifler fazın tamamını `multimodal-and-future` yapmak (basit ama `case-studies`
    kontrollü sözlükte hiç kullanılmadan kalırdı ve 114–115'in farklı katmanı gizlenirdi) ve yeni bir kategori
    açmaktı (gereksiz ve pahalı: `schema.ts` ile iki serinin şema testleri değişirdi). Ölçüt karar #200'ünki:
    kategori konuyu değil **katmanı** adlandırır; 114–115 yeni konu değil, kurulmuş bilginin tek bir vaka
    üzerinde sentezidir. **Bu run'da yalnızca 110 atandı** (`multimodal-and-future`); fazın planı burada
    yazıldı ki 114–115'in run'ı tartışmayı yeniden açmasın. Okuma listesinde `multimodal-and-future` artık
    **iki öbek** (81–90 ve 110'dan itibaren); `case-studies` ilk kez 114'te görünecek ve o run `case-studies`
    klasörünü açıp `reading-list-groups.test.ts`'i çalıştıracak.
234. **109'un başlığı Türkçeleştirildi.** "Koşunun Güvenilirliği: **Checkpoint, Spike** ve Gözlem" →
    "Koşunun Güvenilirliği: **Kontrol Noktası, Sıçrama** ve Gözlem". Ölçüt #227, #217 ve #210'unkiyle aynı.
    "Kontrol noktası" 8\. makaleden beri yerleşik karşılıktır, dolayısıyla başlık yeni terim kurmuyor.
    "Spike" için seride yerleşik karşılık yoktu; **"sıçrama"** seçildi ve 74/78'deki çakışma (ölçekle gelen
    yetenek sıçraması) gövdede açıkça adlandırıldı. Gövdede niteleyici düşürülmez: **kayıp sıçraması**.
    Değişiklik yayımlanmamış bir taslak başlıkta yapıldı ve entegrasyondan önce `roadmap.json`'a yazıldı.
    **Bu bandın öteki başlıkları değiştirilmedi:** 107'deki "Paralellik" ve "Stratejileri" ile 108'deki
    "Performans Mühendisliği" zaten Türkçedir; 110'un başlığı da öyle.
235. **Terim kararları (Batch 26).** Yeni kurulanlar: toplu iletişim üçlüsü "hepsi-indirge / indirge-dağıt /
    hepsi-topla" (107; 85'in "hepsi-hepsiye" biçimiyle aynı kalıpta), "tensör paralelliği", "boru hattı
    paralelliği", "dizi paralelliği", "kabarcık" (107); "çekirdek", "birleştirme", "bellek yerleşimi",
    "bellek kullanım verimi" (108); "geride kalan", "kayıp sıçraması", "etkin eğitim süresi oranı" (109);
    "dünya modeli" (110). **Üç çakışma açıkça adlandırıldı.** (a) **"Çekirdek" dört anlamlıdır** — 10'da
    çekirdek örnekleme, 97'de çekirdek fonksiyonu, 26/89'da "hesap çekirdeği" işlem birimi, 108'de karta
    gönderilen program. Yeni sözcük uydurmak yerine alan yazınının adı benimsendi; gerekçe **yayımlanmış
    gerçektir**: 85 "blok-seyrek çekirdekler" derken zaten bu anlamı kullanmıştı (SOZLESME §8). (b)
    **"Sıçrama"** 74/78'de yetenek eğrisinin sıçramasıydı; 109'da kayıp eğrisinin. (c) **"Dünya modeli"**
    iki soydan gelir ve 110'un gövdesi ikisini ayırır. **"Boru hattı" bileşik olarak kullanılır**, çünkü
    tek başına "hat" 8 ve 41–50'de başka nesneleri taşıyor. **"Tensör" sözcüğü tanımlanmadı** — bölünen
    nesnenin ağırlık matrisleri olduğu söylendi, böylece yeni bir çekirdek kavram yükü doğmadı.
236. **Sayılar (Batch 26).** **107:** ZeRO kademeleri 16Ψ / 4Ψ + 12Ψ/N / 2Ψ + 14Ψ/N / 16Ψ/N ve 7,5 milyar için
    120 / 31,4 / 16,6 / 1,88 GB, oranlar 3,8 ve 63,8; iletişim 2Ψ, 2Ψ, 3Ψ; tensör paralelliğinde katman başına
    dört hepsi-indirge ve b·s·h = 1 × 2.048 × 12.288 = 25,2 milyon sayı, 96 katmanda 384 toplu işlem ile 63
    noktadan noktaya; kabarcık (p − 1)/m = 63 ÷ 512 = %12,3 ve v = 3 ile %4,1; açılmış biçim
    (n/t − d)/(B/b) ve 6.144 kartta %24,6; GPipe kuralı m ≥ 4p; parantez içi 114 → 23 → 14,25 → 4,25 → 2
    ve 275 → 55,5 → 34,4 → 10,3 → 4,8 GB; 14,25 = 114 ÷ 8; %36 → %2, %29–32, %42,1 → %54,2; 8 × 64 × 6 = 3.072;
    892 GB/s ile 12,9 TB/s, oran 14,5; zayıf ölçekleme tablosu 137/148/163/163 ve %44/47/52/52.
    **108:** %99,80 ile %61,0, %0,17 ile %25,5, %0,03 ile %13,5; toplamı %0,20 ile %39,0 ve (39 ÷ 0,20) ÷
    (61 ÷ 99,80) = 195 ÷ 0,611 = 319 kat; %10 işlem kesintisi en çok %6,1; matris çarpımı verimi 16 kat;
    yinelemenin %37'si bellekle sınırlı; 25,2 milyon sayı = 50,3 MB, 6 tur 302 MB ile 2 tur 101 MB,
    1,5 TB/s'de 201 ile 67 µs, 96 katmanda 12,9 ms; birleştirme 113 → 135 (%19) ve 133 → 148 (%11);
    %22,91, 1,30 kat, 1,19 kat, 1,08 kat; yerleşim %52; kullanım oranları %25–40 → %50–73 → %35 → %75,
    matris çarpımı %80–90, 225 ÷ 312 = %72, 740 TFLOP/s, 1,2 PFLOP/s, 2,6 kat hata; derleyici 2,27 ve
    1,41 kat, 180'den fazla model, altı derleyici.
    **109:** 54 gün = 77.760 dakika ÷ 419 = 185,6 dakika; T* = √(2δM) ve f(T*) = √(2δ/M); 10 sn → 7,9 dk /
    %4,2 / 2,3 gün, 2 dk → 27,2 dk / %14,7 / 7,9 gün, 10 dk → 60,9 dk / %32,8 / 17,7 gün; %90 için
    δ < 0,005M yaklaşık 1 dakika; 405 milyar × 16 bayt = 6,48 TB, 1.024 kartta 6,33 GB; tanı 10 dakikadan az,
    toparlanma 15 dakika içinde, etkin süre %90'ın üstünde; geride kalan %10; kullanım oranı %59,1 → %55,2
    ve taban %41,2, oran 1,34; yaklaşık 20 sıçrama, 100 adım geri, 200–500 yığın, en az 35 elle yeniden
    başlatma; dikkat skorunun en büyüğü 10 → 10⁶, 9,4 milyon ile 4,8 milyar ve on kat öğrenme oranı farkı.
    **110:** 906 ± 21, 838 ± 11, 343 ± 18; 150'den fazla görev; 4.580 kavşak ve 9.846 sokak; 89,3 milyon ve
    1,5 milyar; geçerlilik yaklaşık %100 ve sonda %90'ın üstünde; ayırt eden dizi uzunlukları 1, 4 ve 30;
    sapma tablosu 0,99/0,69/0,08 — 0,96/0,52/0,03 — 0,99/0,99/1,00 — 1,00/1,00/1,00; tek token'lık ayrımda
    %100 ile tam kümede %50; bulmacalarda %40 ve 0,60.
237. **Kendi hesabımız (Batch 26).** Bu batch'in gövdesi kaynak ölçümlerine dayanıyor, ama **türetmelerin
    tamamı bizim** ve her biri metinde işaretlendi. (a) **107:** ZeRO oranları (3,8 ve 63,8 kat), 25,2 milyon
    sayı, 384 ile 63 sayımı, kabarcığın (n/t − d)/(B/b) biçimine açılması ve 3.072 → 6.144 çevrimi,
    114 → 23 → 14,25 çevrimi ile 275 GB tabanından gigabayt karşılıkları, 12,9 TB ÷ 892 GB = 14,5.
    (b) **108:** %0,20 ile %39,0 toplamı ve 319 katlık birim oran, %6,1 sınırı, 50,3 MB → 302/101 MB →
    201/67 µs → 12,9 ms zinciri, 225 ÷ 312 = %72 çapraz denetimi. (c) **109:** M = 185,6 dakika, T* ve f(T*)
    türetmesinin kendisi (Young'ın sonucu yeniden türetildi), üç satırlık tablo ve 54 güne çevrimi,
    %90 → δ bir dakikanın altında çıkarımı, 6,48 TB ve 6,33 GB. (d) **110:** yalnızca oran okumaları;
    bütün ölçümler kaynaklardan. **Sınırlar yazıldı:** 107'de mikro yığının bir alındığı, 108'de tur
    sayımının sadeleştirilmiş olduğu, 109'da iki kümenin arıza aralığının aynı olmak zorunda olmadığı ve
    bunun bir mertebe tahmini olduğu açıkça söylendi.
238. **Şekil kararları (Batch 26).** On iki şeklin **on biri** tablo ya da blok listesi; **hiçbirinde eğri
    yok** (kararlar #214, #223 ve #231'in devamı). Tek istisna 110-Şekil 2'nin **doğrusal uzunluk ekseni**
    ve o eksen üç ölçülmüş değeri (1, 4, 30) işaretliyor; şeklin içine "eksen dizi uzunluğudur ve doğrusaldır"
    kaydı düşüldü. Üç şekil bu batch'in omurgasını taşıyor: 107-Şekil 2 (14,25 = 114 ÷ 8), 108-Şekil 1
    (%0,20 ile %39,0) ve 110-Şekil 3 (aynı model, iki sınav, iki cevap). **108-Şekil 3, 106-Şekil 3'ün
    kopyası değildir:** 106 aynı çipte iki rejimi karşılaştırıyordu, 108 aynı algoritmanın üç uygulamasını
    iki çipte karşılaştırıyor ve nesnesi kod.
239. **Kaynak politikası ve doğrulama sınırları (Batch 26).** 107'de 6, 108'de 6, 109'da 7, 110'da 5 kaynak:
    **24 kalem, 21 ayrı çalışma** (Narayanan ve ark. 107 ile 108'de, Chowdhery ve ark. 106'dan sonra 109'da
    kullanıldı; kesişim bilinçli ve her yerde farklı bir ölçüm için). Dağılım: **22 hakemli**, 2 hakemsiz
    (Grattafiori ve ark.'nın Llama 3 raporu ile Zhang ve ark.'nın OPT raporu — ikisi de 8\. makalede aynı
    biçimde işaretlenmişti ve 109'da da işaretlendi). **Oran HANDOFF'un öngördüğü gibi yükseldi** ama
    beklenenin altında kaldı: sistem literatürünün hakemli mecraları (SC, MLSys, NSDI, ASPLOS, VLDB, STOC,
    JPDC, CACM, FGCS) şirket raporlarının yerini tuttu. **(a) Doğrulanamayan künye yok.** ACM DOI'leri
    (Narayanan ve ark. 2021; Jia-Wei ve Kung 1981; Young 1974; Ansel ve ark. 2024; Zhao ve ark. 2023)
    tarayıcıya 403 döndü — beklenen duvar — ve hepsi `api.crossref.org/works/<doi>` ile cilt, sayı, sayfa ve
    yıl düzeyinde doğrulandı. IEEE (ZeRO) 202, Elsevier 200 döndü ve ikisi de Crossref'le teyit edildi.
    (b) NeurIPS, ICLR, MLSys, ACL Anthology, JMLR, USENIX ve Nature adreslerinin hepsi 200 döndü ve
    başlıkları eşleşti. FlashAttention-2'nin ICLR 2024, FlashAttention-3'ün NeurIPS 2024, Wortsman ve ark.'nın
    ICLR 2024, Ivanov ve ark.'nın MLSys 2021 kaydı **konferans dizin sayfalarından** doğrulandı.
    (c) **OpenReview yalnızca bir kez geçiyor** ve o da 77\. makaleden devralınan yayımlanmış künyedir
    (Li ve ark. 2023); yeni kimlik yazılmadı (karar #224'ün devamı). (d) PyTorch 2 bildirisinin metni
    ACM'den alınamadı; sayılar yayıncının kendi açık kopyasından (`pytorch.org`) okundu ve künye Crossref'le
    doğrulandı.

240. **114'ün başlığı Türkçeleştirildi.** "Vaka İncelemesi: Bir **Frontier** Model Nasıl Yapılır?" →
    "Vaka İncelemesi: Bir **Sınır** Model Nasıl Yapılır?". Karar #227 ve #234'ün ölçütü uygulandı, ama bu
    kez yeni bir karşılık icat edilmedi: **"sınır model" seride zaten yerleşikti** — yayımlanmış gövdelerde
    on sekiz geçiş ve 70\. makalenin yayımlanmış başlığı ("Sorumlu Ölçekleme: Sınır Model Güvenlik
    Çerçeveleri"). Kalan "frontier" geçişleri yalnızca kaynakça künyelerinin İngilizce başlıklarındadır.
    Başlık değişikliği entegrasyondan **önce** `roadmap.json`'a yazıldı.

241. **`case-studies` klasörü ilk kez açıldı ve kod değişikliği gerekmedi.** Kategori kontrollü sözlükte
    (`src/lib/content/schema.ts`) ve etiketi `src/lib/content/labels.ts`'te ("Vaka İncelemeleri") zaten
    tanımlıydı; yapılan tek şey `content/series/articles/case-studies/` dizinini açmak oldu — BOUN
    serisindeki aynı iş gibi. `reading-list-groups.test.ts` çalıştırıldı ve geçti; **render'da doğrulandı:**
    Batch 27 kohortu okuma listesinde iki kategori öbeğine bölünüyor — "ÇOKLU-MODALİTE VE GELECEK" (111–113)
    ve **"VAKA İNCELEMELERİ" (114)** —, ve künye satırı "Bölüm 114 / 114 · Vaka İncelemeleri" okunuyor.
    **Kontrollü sözlükteki yedi kategorinin tamamı artık kullanımda.**

242. **Terim kararları (Batch 27).** Yeni kurulanlar: "somutlaşmış yapay zekâ (embodied AI)",
    "görme-dil-eylem modeli (vision-language-action model)", "ayrıklaştırma (discretization)",
    "uç işlevci (end-effector)", "eylem öbeği (action chunk)", "alan rastgeleleştirmesi (domain
    randomization)" (111); "sürekli öğrenme (continual learning)", "felaket unutması (catastrophic
    forgetting)", "kararlılık–esneklik ikilemi (stability-plasticity dilemma)", "model düzenleme (model
    editing)", "çağrışımsal bellek (associative memory)", "devre dışı bırakan düzenleme (disabling edit)"
    (112); "dışbükey zarf (convex hull)" (113). **114 yeni terim tanıtmadı** — sentez makalesi olduğu için
    bilinçli. **Dört çakışma gövdede adlandırıldı:** (a) **"gövde"** — 81'de önceden eğitilmiş ağ, 111'den
    itibaren fiziksel beden; 111 ayrımı yaptı ve ağ anlamı için "önceden eğitilmiş ağ" dedi, 112 de aynı
    kaydı sürdürdü. (b) **"gösterim"** — 23'te isteme konan çözülmüş örnek, 111'de uzaktan sürülen robot
    kaydı. (c) **"ayrıklaştırma ↔ kuantizasyon"** — 27'nin nesnesi ağırlığın hassasiyeti, 111'inki dünyanın
    kendisi. (d) **"unutma / unutturma / seçici unutma"** — 19 kaza, 68 niyet, 56 yetenek; üçü 112'de yan
    yana konup ayrıldı.

243. **Sayılar (Batch 27).** **111:** eylem uzayı 6 serbestlik derecesi + tutucu + bitirme = 8 tam sayı,
    sürekli boyutlar 256 kutuya ayrık; 55 milyarlık sürüm 1–3 Hz, 5 milyarlık ~5 Hz, 35 milyonluk 3 Hz;
    π₀ 50 Hz'e kadar; görülmüş görevlerde 92 ↔ 91 ve 93, görülmemişte 32 ↔ 62, anlamsal talimatlarda
    17 ↔ 60; ablasyon 5 milyar/aynı veri/aynı geçmiş: ön eğitimli %44,4 ve %52, sıfırdan %0 ve %1;
    RT-1 verisi 130 bin gösterim / 13 robot / 17 ay / 700+ görev; ortak havuz 1 milyon+ yörünge, 22 gövde,
    60 küme, 34 laboratuvar, 527 beceri; π₀ karışımının **%9,1'i** açık kaynak; benzetim 3 yıl ↔ 100 yıl
    (duvar saati 1,5 ↔ 50 saat) ve gerçek robotta ortanca 13 ↔ 0 ↔ 2 ↔ 2; gövde karışımı verisi azda
    ortalama %50 artış, verisi bolda 92 → 73 ve 55 milyarda 91. **112:** ROME zsRE etkinlik 99,8 /
    yeniden ifade 88,1; RIPPLEEDITS 5.000 düzenleme, öznenin başka adları 86,8, koruma 100, mantıksal
    sonuç **20,2**, bütün model ve yöntemlerde ortalama 38–66; sıralı düzenlemede dönüş noktası 100–1.000
    arası; devre dışı bırakan düzenlemenin normalleştirilmiş uzaklığı 3,339×10⁻⁴ ↔ 8,156×10⁻⁷;
    yerelleştirme–düzenleme bağıntısı sıfıra yakın; kişiselleştirmede getirme %23,5 (ince ayarlı) ve
    %12,2 (ince ayarsız); 105'in hizalama vergisi 0,77. **113:** CASP14'te 87 alan, ortanca 0,96 Å
    (%95 aralık 0,85–1,16) ↔ 2,8 Å (2,7–4,0); sekiz boyutta 512 elemanlı yapı, arama uzayı 3¹⁶⁰⁰
    mertebesinde, asimptotik alt sınırda yirmi yılın en büyük iyileştirmesi; 2,2 milyon yapı ve 381 bin
    yeni kararlı kayıt (toplam 421 bin), 736'sı bağımsız deneysel; otonom laboratuvar 17 günde 57 hedeften
    36'sı; itirazda 43 ürünün tamamı incelendi ve üçte ikisi bilinen düzensiz karşılık; 4.000 aday fikirden
    geriye ~%5, yenilikte p < 0,05. **114:** 6 × 4,05×10¹¹ × 1,56×10¹³ = 3,79×10²⁵ (rapor 3,8×10²⁵);
    Chinchilla tahsisi ~20 token/parametre ve 67,6 ↔ 60,0; SFT 4,9 ve PPO-ptx 60 petaflop/s-gün ↔ ön eğitim
    3.640; kullanım oranı %25–40 → %50–73 → %35 → %75.

244. **Kendi hesabımız (Batch 27).** Dört türetme metinde girdileriyle birlikte duruyor ve **hepsi
    işaretlendi**: (a) **111 — üretim hızı:** 130.000 ÷ (13 × 17) ≈ robot başına ayda 588 gösterim.
    (b) **111 — birim çevrimi:** 3 × 3.600 = 10.800 adım/saat, × 8 sayı = 86.400; 15,6×10¹² ÷ 86.400
    ≈ 1,8×10⁸ robot-saati ≈ **20.600 robot-yılı**, ve metin birimlerin birebir aynı olmadığını açıkça
    söylüyor. (c) **111 — karar aralığı:** 1 ÷ 3 ≈ 333 ms. (d) **113 — doğrulama makası:** 36 ÷ 17 ≈ 2,1
    sentez/gün; 381.000 ÷ 2,1 ≈ 180 bin gün ≈ **500 yıl**, "büyüklük mertebesi olarak okunmalı" kaydıyla.
    (e) **114 — oran:** 60 ÷ 3.640 = %1,65 ve (4,9 + 60) ÷ 3.640 = %1,78; ve geri alma maliyeti
    101,78 ÷ 1,78 ≈ **57 kat**. Ayrıca **112'nin rank-bir örneği** (2×2 birim matris, `k* = (1;0)`,
    `v* = (0;1)`) ve **112'nin esnek yay ceza örneği** (F = (10; 0,1) → 5 ↔ 0,05, yüz kat) açıklama amaçlı
    kendi sayılarımızdır ve öyle işaretlendi; rank-bir örneğinde gerçek yöntemin eşdeğişirlik teriminin
    bilerek bırakıldığı yazıldı.

245. **Şekil kararları (Batch 27).** On bir şeklin **tamamı** tablo ya da blok listesi; **hiçbirinde eğri,
    hiçbirinde eksen yok** (kararlar #214, #223, #231, #238'in devamı). Dağılım: 111'de üç, 112'de üç,
    113'te üç, 114'te iki. **114'ün şekilleri 100'ün haritasının kopyası değil:** 100 kavramların yerini
    çizmişti, 114 kararların sırasını ve iki ayrı sütunu (pay ↔ kilitlenme) çiziyor; ayrım makalenin
    gövdesinde de açıkça yapıldı. Sayıların tamamı metinde geçen sayılarla birebir aynı; kendi hesabımız
    olan her değer şeklin kendi kayıt satırında işaretlendi.

246. **Kaynak politikası ve doğrulama sınırları (Batch 27).** 111'de 7, 112'de 7, 113'te 9, 114'te 6 kaynak:
    **29 kalem, 28 ayrı çalışma** (Ouyang ve ark. 11'den sonra 114'te; Hoffmann ve ark. 9'dan sonra 114'te;
    Grattafiori ve ark. 109'dan sonra 114'te; Young 109'dan sonra 114'te — kesişimler bilinçli ve her yerde
    farklı bir ölçüm için). Dağılım: **28 hakemli, 1 hakemsiz** — yalnızca Llama 3 raporu, ve 8\. makaleden
    devralınan biçimde işaretlendi. **Bu, serinin en yüksek hakemli oranı ve HANDOFF'un öngörüsünü
    doğruladı:** robotik (RSS, CoRL/PMLR, ICRA, IROS, IJRR), sürekli öğrenme ve düzenleme (PNAS, Neural
    Networks, NeurIPS, TACL, ACL Findings) ve bilim uygulamaları (Nature, Chemistry of Materials,
    PRX Energy, ICLR) hakemli mecrayı bol bol karşıladı. **(a) Doğrulanamayan künye yok.**
    **(b) π₀'ın hakemli olduğu bulundu:** hakemsiz bir ön baskı sanılıyordu, `roboticsproceedings.org/rss21`
    dizininde **RSS 2025 bildirisi** olarak doğrulandı (p010) — HANDOFF'un "çoğu hakemsiz ön baskı"
    öngörüsü bu kalemde yanlış çıktı. (c) **Nature artık tarayıcı doğrulamasına bot duvarı döndürüyor**
    ("Client Challenge"); Batch 26'da 200 dönüyordu. Çözüm: **PubMed Central** (`pmc.ncbi.nlm.nih.gov`,
    DOI → PMCID için `ncbi.nlm.nih.gov/pmc/utils/idconv`) tam metni veriyor ve künye Crossref'le
    doğrulanıyor. (d) **ACS ve APS 403 döndü** — beklenen duvar; ikisinin de künyesi Crossref'le, özetleri
    Semantic Scholar `graph/v1/paper/DOI:` ucundan alındı (bu uç sık sık 429 veriyor, çağrılar
    aralıklandırılmalı). (e) `proceedings.iclr.cc` **2022 için 404** veriyor (2024 ve 2025 çalışıyor) ve
    OpenReview bot duvarında; bu yüzden ölçek–unutma ilişkisine dair bir ICLR 2022 kalemi **doğrulanamadığı
    için hiç kullanılmadı** ve 112'nin dengesi ROME'un kendi ölçüleri ile bağlam içi düzenleme taban
    çizgisiyle kuruldu. (f) **Sayım tutarsızlığı dürüstçe yazıldı:** otonom laboratuvar çalışmasının özeti
    57 hedeften 36, dergi özeti 58'den 41, itiraz ise 43 ürün diyor; 113 makalenin kendi özetindeki sayıyı
    kullandı ve sayımın farklı yerlerde farklı verildiğini söyledi.

## Batch 27 öğrenme notları (yazım tamamlandı)

- **Faz 14'ün gövdesi tek bir soruyu üç ayrı yere taşıdı: bu sistem neyi kapatıyor?** Gövdede eylem arayüzü
  (111), üründe güncelleme yolu (112), laboratuvarda doğrulama maliyeti (113); sonra 114 aynı soruyu modelin
  kendi üretim zincirine uyguladı. Dört makale de "hangisi daha iyi" sorusunu reddedip "hangi seçenekler
  kapanıyor" sorusuna çevirdi ve tezini o cümleden kurdu.
- **Bir borcu ödemenin en iyi biçimi, borcun verildiği cümleyi başka bir nesnede yeniden kurmak.** 51'in
  "eylem kümesi bir arayüzdür" cümlesi 111'de tekrarlanmadı; ALFWorld'ün dokuz şablonu bir kez anılıp geçildi
  ve cümle gerçek bir kolda **iki sayıya** indirildi — 256 kutu ve saniyede üç karar. Aynı biçim 39/56'da da
  işledi: üç aşamalı bellek yeniden anlatılmadı, "ağırlığa mı bağlama mı" kararına çevrildi.
- **Bir mekanizmayı iki satırlık matris örneğiyle kurmak, üç paragraflık açıklamadan çok şey söylüyor.**
  112'nin rank-bir örneği (`k*`'ye dik anahtarlar hiç değişmez) yöntemin hem "ilgisizi koruma" başarısını
  hem "sonucu taşımama" kusurunu **aynı kimlikten** çıkarıyor. Ölçümler bunu doğruluyor ama açıklamıyor;
  açıklama iki satırda duruyor.
- **Hakemli itiraz arandığında bulundu ve makalenin tezini güçlendirdi.** 113'te malzeme keşfi iki *Nature*
  çalışmasıyla kurulup iki hakemli değerlendirmeyle (Chemistry of Materials, PRX Energy) karşılandı; ikinci
  taraf yalnızca "katılmıyoruz" demiyor, **sınanabilir bir mekanizma** öneriyor (düzensiz katılar arama
  uzayında yok) ve o mekanizma 110'un ölçütüne bağlanıyor. SOZLESME §4'ün "iki taraf" kuralı burada
  makalenin yükü değil omurgası oldu.
- **Bir sentez makalesinin tezi, içeriğin kendisinden değil içeriğin iki ayrı sıralanışından çıkabiliyor.**
  114 yeni hiçbir şey anlatmadı; yalnızca aynı altı kararı bir kez maliyete, bir kez geri alınamazlığa göre
  sıraladı ve iki sıralamanın ters olduğunu gösterdi. Batch 24'ün dersi ("eksik olan içerik değil tezdir")
  bu kez sıralama farkıyla karşılandı.
- **Kelime bandı yine ilk turda üçünde dar kaldı** (112 ilk yazımda 2.031, 113 1.798, 114 1.764). Üçünde de
  çözüm dolgu değil eksik olan şeydi: 112'ye mekanizmanın sayısal örneği, 113'e doğrulama makasının hesabı
  ve peşin ödenmiş altyapı gözlemi, 114'e geri alma maliyetinin oranı ve FLOP'la tartılamayan iki halka.
  **Bant altı kalmak çoğu zaman bir eksik bölümün işaretidir.**
- **Doğrulama kanalları yine kaydı:** Nature bot duvarına geçti (PMC ile telafi edildi), `proceedings.iclr.cc`
  2022 için 404 veriyor, Semantic Scholar 429'a düşüyor. Buna karşılık **bir kalem beklenenin tersine hakemli
  çıktı** (π₀ → RSS 2025); HANDOFF'un öngörüsüne güvenip "hakemsiz" diye işaretlemek yanlış olurdu.
  Ders: mecra tahmini yazımdan önce değil, doğrulamadan sonra yazılır.

## Batch 26 öğrenme notları (yazım tamamlandı)

- **Faz 13 kapandı ve zincir dört adımda tek bir nesneye indi: bir eğitim adımı.** Adımın kaynak defteri
  (106) → adımın kartlara bölünmesi (107) → adımın kartın içinde hızlandırılması (108) → adımın yüz binlerce
  kez tekrarlandığında ne olduğu (109). Her makale bir öncekinin kapanmayan satırını açtı ve hiçbiri geriye
  dönüp aynı şeyi yeniden kurmadı.
- **Bu batch'in en pahalı dersi: bir borcu öderken önce borcun verildiği makalenin tamamı okunmalı — ama
  yetmez, komşularının da okunması gerekiyor.** 107 üç ayrı makaleyle çakışma riski taşıyordu (8, 85, 89) ve
  üçünün de ilgili bölümleri tek tek okundu. Sonuç: 85'in hepsi-hepsiye iletişimi **tekrarlanmadı**, dört
  eksenin yanına ayrı bir eksen olarak yerleştirildi; 89'un kesim bandı **tekrarlanmadı**, ölçülmüş iki
  sayının yerleştiği eksen oldu. Batch 24'ün dersi (71 ↔ 101) burada üç kaynaklı hâliyle tekrarlandı.
- **Bir makalenin başlığı bölümlerini yönetmezse makale dağılıyor.** 107'nin taslağı "dört eksen" başlığına
  göre yazıldı ve her bölüm bir eksene karşılık geldi; sonuç, kelime bandına ilk turda giren tek makale oldu
  (2.047). Öteki üçü banda altında kaldı ve eklenen malzemenin tamamı araştırma listesinde olup taslakta
  atlanmıştı: 108'e birleştirmenin sayısal örneği, sınırı ve softmax'ın bağımlılık argümanı; 109'a gözlemin
  frekans ayrışması, üç düzeyde cevap ve veri sırasının yeniden üretilebilirliği; 110'a Myhill–Nerode'un
  somut örneği, iki soy arasındaki kanıt asimetrisi ve çerçevenin kendi sınırı. **Dolgu cümle eklenmedi.**
  Son değerler: 2.269 / 2.199 / 2.108 / 2.017.
- **Terim defteri yazımdan önce tarandı ve üç çakışma önlendi.** "Çekirdek" seride zaten üç nesne taşıyordu;
  dördüncüsü uydurulmadı, alan yazınının adı benimsendi ve gerekçe **yayımlanmış gerçekte** bulundu (85'in
  "blok-seyrek çekirdekler"i). "Sıçrama" 74/78'de yetenek eğrisinindi; 109 niteleyiciyi hiç düşürmedi.
  "Hat" 8 ve 41–50'de pipeline anlamında kullanıldığı için 107 "boru hattı" bileşiğini seçti.
- **En iyi kontrol noktası aralığını yeniden türetmek, kaynaktan almaktan iyiydi.** Young'ın 1974 sonucu üç
  satırda türetiliyor ve türetme metinde durunca okuyucu δ'yı değiştirip tabloyu kendisi kurabiliyor.
  Buradan çıkan sonuç da kaynağın söylemediği bir şey: kareköklü yapı yüzünden asıl kaldıraç aralık değil
  kaydın maliyeti, ve %90 etkin süre hedefi kontrol noktasına bir dakikalık bir bütçe koyuyor.
- **110 bir faz açılışı olduğu hâlde harita değil ölçüm makalesi oldu, ve doğru karar buydu.** 1\. makalenin
  açık bıraktığı "anlama" sorusu felsefi olarak sürdürülseydi seri hiçbir yere varmazdı; sorunun ölçülebilir
  hâlini kurmak hem 77'nin kanıt biçimini sınanan şeye çevirdi hem de 116–117'ye temiz bir devir bıraktı.
- **Araştırma, yazım, entegrasyon ve doğrulama tamamen ana oturumda; workflow/subagent kullanılmadı**
  (kullanıcı talimatı; ultracode açık olmasına rağmen). Kaynak metinleri `pypdf` ile metne çevrildi;
  `wc`, `scan`, `svgcheck`, `syncalt`, `net`, `sweep`, `shots` ve `dec`/`notes` betikleri oturum
  scratchpad'ine yeniden yazıldı ve `artifacts/` altına hiçbir şey yazılmadı.
- **Uzun Python bloklarını Bash heredoc ile çalıştırmak yine kırıldı** (tek tırnak içeren metinlerde
  ayrıştırma hatası). Batch 25'in kuralı doğrulandı: uzun betik Write aracıyla scratchpad'e yazılıp
  `python <dosya>` ile çalıştırılmalı. **Ek tuzak:** o betiğin içinden `cd` yapılmadığı için `grep`
  komutunun çalışma dizini scratchpad'de kalıyor; doğrulama ayrı bir komutta yapılmalı.
- **Şekil numaraları gövde sırasına göre artmak zorunda.** 110'a sonradan bir şekil eklenirken "Şekil 3"
  diye yazıldı ve mevcut "Şekil 2"nin önüne düştü; `check-series-content.cjs` bunu yakalar ama tarama
  yazımdan önce yapılmadığı için iki referans cümlesi de elle düzeltilmek zorunda kaldı.
- **`svgcheck` bu kez üç kusur buldu, PNG turu sıfır.** Ölçer bir satır içi çakışma (107-Şekil 2), bir sağ
  kenar taşması (107-Şekil 3) ve iki yetersiz alt pay (108-Şekil 2, 110-Şekil 2) yakaladı; hepsi
  yazımda düzeltildi. On iki şeklin PNG turunda ek kusur çıkmadı — **iki kapı yine birbirinin yerine
  geçmedi**, ama bu kez repo kapısının hiç bulmadığı kusurların tamamını ikinci ölçer buldu.
- **İzole kopya düzeni Batch 25'ten olduğu gibi çalıştı** (`/d/dev/anil-lib-b26-render`, port 3212).
  Paralel BOUN oturumu bu run boyunca da aynı worktree'deydi ve `docs/seri-boun/**` ile `.wolf/*` altına
  yazıyordu; çakışma olmadı çünkü bu run `artifacts/` altını hiç kullanmadı ve `.claude/launch.json`
  okunup kendi girdisi eklenerek yazıldı, temizlikte yalnızca o girdi çıkarıldı.
- **Kapılar:** `pnpm typecheck` (0), **677 test** (`reading-list-groups.test.ts` dâhil), `pnpm build`
  (exit 0, `/seri/[slug]` **110 yol**, 173 statik sayfa, izole kopyada), 111 seri rotasının tamamı 200
  (üç dilim, ~91 sn, yönlendirme yok), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0,
  `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok, hiçbir SVG kabından taşmıyor;
  1440'ta SVG 771 px, 768'de 676, 375'te 351; hiçbir tablo kapsayıcısını aşmıyor), konsolda yalnızca
  `/api/reader-sync` 503 (ağ isteğiyle kaynağı doğrulandı), 12 yeni diyagram Playwright ile light/dark
  PNG olarak alınıp **on ikisi de** gözle incelendi, 24 kaynak bağlantısının tamamı çekildi.

## Batch 25 öğrenme notları (yazım tamamlandı)

- **Faz 12 kurarak anlatmanın ne olduğunu gösterdi ve zincir üç adımda kapandı:** makineyi kur ve her sayısını
  gör (103) → ağırlıkları döngüye yazdır ve kaybın nerede durduğunu öl (104) → tercihi yerleştir ve neyin
  korunduğunu ölç (105). Üçünün ortak yanı, her iddianın **yeniden hesaplanabilir** olması: model 364
  parametre olduğu için hiçbir sayı "kaynağa göre" değil, doğrudan görülebilir.
- **Bu batch'in en pahalı dersi metodolojikti.** 104'ün ablasyon tablosu ilk turda tek tohumla çalıştırıldı ve
  tablo anlamlı görünüyordu; 99\. makalenin kendi kuralı uygulanıp beş tohuma çıkarıldığında koşuların ikisinin
  kuralı hiç öğrenemediği, ortalamanın hiçbir koşunun vermediği bir sayı olduğu ve hiçbir ablasyon farkının
  sapmayı aşmadığı görüldü. **Serinin kendi ölçütünü kendi deneyine uygulamak, yazılmış olan bir tabloyu
  tamamen değiştirdi.**
- **105'te aynı şey ikinci kez oldu.** Tek tohumla "mikro modelde fiil kuralı çöküyor, kapasite düzeltiyor"
  sonucu çıkmıştı; üç tohumla bakıldığında çöküşün üç koşunun yalnızca birinde olduğu, asıl kararlı bulgunun
  ise başka bir şey olduğu görüldü: **tercih karşılandığı hâlde yeğlenen cevabın olasılığı düşebiliyor.**
  Tohum 11'in tam dağılımı bunun mekanizmasını gösterdi — kütlenin yüzde 99,4'ü karşılaştırmaya hiç girmemiş
  bir token'a gitmişti. Bu, Xu ve ark.'nın (ICML 2024) kuramsal uyarısının en küçük ölçekli örneği.
- **Faz 13'ün açılışı 89'u tekrar etmemek üzere kuruldu.** Çatı çizgisi yeniden kurulmadı; **uygulandı.**
  106'nın omurgası tek cümle: işlem yoğunluğu, ağırlık bir kez okunduğunda işlenen token sayısıdır — üretimde
  yığın büyüklüğü, eğitimde mikro yığın çarpı dizi uzunluğu, aradaki fark 1.024 kat. 26'nın muhasebesi bu
  cümleyle doğrudan eğitim tarafına taşındı.
- **Ölçüm altyapısı:** mikro modelin tamamı saf Python'da (numpy ya da torch olmadan) yazıldı; skaler ters-mod
  otomatik türev ~120 satır ve gradyanlar merkezi farkla doğrulandı. 364 parametre × 400 adım × 4 dizi bir
  dizüstü bilgisayarda dakikalar sürüyor; beş tohumlu ablasyon turu ise saatler. Sonraki run benzer bir ölçüm
  yapacaksa **tohum turlarını erken başlatmalı**, çünkü asıl darboğaz yazmak değil beklemek.


- **Faz 11 kapandı ve zincir dört adımda tek bir soruya indi:** birinin deneyini nasıl okuruz (98) → kendi
  deneyimizi nasıl kurarız (99) → buraya kadarki her şey nasıl duruyor (100) → iki sayı arasındaki fark gerçek
  mi (101) → o fark başka bir elde de çıkar mı (102). Fazın tonu 98'de kurulmuştu ve değişmedi: **cevap, hangi
  cetveli seçtiğine bağlı.**
- **Araştırma, yazım, entegrasyon ve doğrulama yine tamamen ana oturumda; workflow/subagent kullanılmadı**
  (cerebrum 2026-09-03). Dört dalga hâlinde 80'den fazla kaynak adresi çekildi, PDF'ler `pypdf` ile metne
  çevrildi; `wc`, `scan`, `svgcheck`, `syncalt`, `links`, `sweep`, `shots`, `fetch`, `pdftxt`, `q` ve `calc`
  betikleri oturum scratchpad'ine yeniden yazıldı ve `artifacts/` altına hiçbir şey yazılmadı.
- **Bu batch'in kendi bulgusu: 33. makalenin formülü, aynı biçimde yazıldığı hâlde tahminci olarak yanlı.**
  Kapsama 1 − (1 − p)ᵏ, `p` gerçek olasılıkken bir **tanım**; `p` yerine `c/n` konduğunda ortalamada gerçek
  değerin altında kalan bir **tahminci**. Seride daha önce kurulmuş bir formülün, hiç değişmeden, ikinci bir
  bağlamda kusurlu hâle gelmesi 101'in omurgasını verdi ve 93/96'nın yanlılık ↔ oynaklık ayrımını ölçüm
  pratiğine bağladı. Sayı da temiz: 0,67232 ↔ 0,59359.
- **Bir sentez makalesi yazmanın asıl zorluğu kelime bandı değil, liste tuzağı.** 100'ün ilk taslağı 1.169
  kelimede kaldı ve eklenen şey özet cümleleri değil, **zincirin kendisiydi**: fatura, amacın yazılışı ve
  dışarıya bağlanma omurgaları ile terim çakışmaları bölümü. Ders: sentez makalesinde eksik olan şey içerik
  değil, içeriği birbirine bağlayan tez olur; tezi yazınca kelime kendiliğinden geliyor.
- **Bir makale yazmadan önce terim defterinin ilgili satırları arandı ve iki çakışma yakalandı.** "Rastgele
  arama" 63'te bambaşka bir nesne için kullanılmıştı (istem uzayında uyarlanır saldırı) ve 99'da açıkça
  ayrıldı; "önyükleme" 89'da "tahmini önyükleme" olarak geçtiği için 101'de bootstrap karşılığı olarak
  **kullanılmadı**, yerine "yerine koyarak yeniden örnekleme" ve 97'nin torbalamasına bağ kuruldu. Batch 22'nin
  dersi ("gövde okunmalı") burada defter taramasıyla birleşince iki hata yazımdan önce önlendi.
- **71'in kapsamı 101'in en büyük riskiydi.** 71 zaten standart hatayı, istatistiksel gücü, tohum gürültüsünü
  ve merkezî limit uyarısını kurmuştu. 101 bunları **tekrarlamak yerine üzerine karar katmanını** koydu:
  hipotez kurulumu, test seçimi, eşleştirme, oynaklık kaynaklarının sıralaması, çoklu karşılaştırma ve tahminci
  yanlılığı. Ders: bir koordinatı öderken önce o konuya en yakın yayımlanmış makalenin **tamamı** okunmalı;
  yoksa ödeme tekrar olur.
- **Kelime bandı bu batch'te de sıkı bağladı.** Dördü de ilk turda banda altında kaldı (2.060 / 1.169 / 2.112 /
  1.489); eklenen malzemenin hepsi araştırma listesinde olup taslakta atlanmıştı (99'a NeurIPS kontrol listesi,
  Bergstra'nın veri kümesine göre değişen önemli hiperparametreler bulgusu ve Narang'ın yazar doğrulaması;
  101'e Koehn'ün yeniden örneklemesi ve Demšar'ın sıra tabanlı testleri; 102'ye Raff'ın okunabilirlik ve tablo
  bulguları, Haibe-Kains itirazı, Kapoor'un bilgi çizelgesi ve yarışmanın tasarım ayrıntıları). Dolgu cümle
  eklenmedi. Son değerler: 2.084 / 2.018 / 2.112 / 2.060.
- **`svgcheck` bu kez bir kusur buldu, PNG turu bir tane daha.** Ölçer 102-Şekil 3'te alt payın 12'nin altına
  düştüğünü yakaladı; PNG turunda aynı şeklin alt kaydının kutuya çok yakın durduğu görüldü ve viewBox 444'ten
  460'a çıkarıldı. Öteki on bir şekilde iki kapı da kusur bulmadı. **İki kapı yine birbirinin yerine geçmedi.**
- **OpenReview API'si kapandı.** Batch 23'te 429 verip 7 saniyelik beklemeyle çalışıyordu; bu run'da
  `api.openreview.net` ve `api2.openreview.net` doğrudan 403 veriyor. Yeni kimlik yazılmadı; yayımlanmış
  makalelerden devralınan iki kimlikten biri `proceedings.iclr.cc` dizininde doğrulandı. **Sonraki run
  OpenReview kimliği yazacaksa kaynağı konferans dizin sayfası olmalı.**
- **Dev sunucusu 103 rotayı dört dilimde sorunsuz derledi** (32 + 32 + 20 + 19, toplam ~88 sn, hiç yönlendirme
  yok). Dilimleme kuralı korundu.
- **Playwright kaplayıcı düzeni Batch 23'ten olduğu gibi çalıştı** (`createRequire("file:///D:/dev/anil-lib/")`
  + `require("@playwright/test")`, `domcontentloaded` + sabit bekleme, `deviceScaleFactor: 2`). Kaplayıcıya
  sayfanın kendi arka plan rengi verilince koyu temadaki şekiller doğru zeminde göründü.
- **Paralel BOUN oturumu bu run boyunca da aynı worktree'deydi** ve bu kez `artifacts/b11-research/` altına
  yazıyordu. Çakışma olmadı çünkü (a) bu run `artifacts/` altını hiç kullanmadı, (b) build ve dev sunucusu izole
  kopyada (`/d/dev/anil-lib-b24-render`) çalıştırıldı, (c) `.claude/launch.json` okunup kendi girdisi eklenerek
  yazıldı ve temizlikte yalnızca o girdi çıkarıldı.
- **Kapılar:** `pnpm typecheck` (0), **642 test** (`reading-list-groups.test.ts` dâhil), `pnpm build` (exit 0,
  `/seri/[slug]` **102 yol**, 160 statik sayfa, izole kopyada), 103 seri rotasının tamamı 200 (dört dilim,
  ~88 sn, yönlendirme yok), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0, `main.innerText` içinde
  undefined/NaN yok, ham i18n anahtarı yok, hiçbir SVG kabından taşmıyor; 1440'ta SVG 771 px, 768'de 676,
  375'te 351), konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema = 24 PNG gözle incelendi,
  29 kaynak bağlantısının tamamı çekildi.

## Batch 23 öğrenme notları (yazım tamamlandı)

- **Faz 10 kapandı, Faz 11 açıldı ve zincir tek bir soruyu dört kez sordu:** kaybı azaltan mekanizma nedir (95)
  → azalttığımız sayı umursadığımız sayı mı (96) → bu muhasebe yalnızca sinir ağları için mi (97) → aynı
  soruyu literatürün kendisine nasıl sorarız (98). Dört makale de aynı refleksle bitiyor: **cevap, hangi
  cetveli seçtiğine bağlı.**
- **Araştırma, yazım, entegrasyon ve doğrulama yine tamamen ana oturumda; workflow/subagent kullanılmadı**
  (cerebrum 2026-09-03). Dört dalga hâlinde 100'den fazla kaynak adresi çekildi; PDF'ler `pypdf` ile metne
  çevrildi (`shots`, `sweep`, `links`, `svgcheck`, `scan`, `wc` betikleri oturum scratchpad'ine yeniden yazıldı,
  `artifacts/` altına hiçbir şey yazılmadı).
- **Bu batch'in kendi bulgusu: 2. makalenin deneyle bulduğu sayı bir teoremin özel hâliymiş.** α < 3/14 eşiği
  doksan üç makale önce üç evlik bir oyuncak problemde ölçülmüştü; 95'te kaybın ikinci türevi 28/3 hesaplanıp
  genel kural α < 2/λ uygulanınca **aynı ondalık basamağa kadar** aynı sayı çıkıyor. Bilinçli formalizasyonun
  bundan daha temiz bir örneği bu seride yok ve fazın tonu buradan çıktı: erken makalelerin ölçümleri, ileri
  makalelerin teoremlerinin girdisidir.
- **Kelime bandı bu batch'te de sıkı bağladı — ama ters yönde.** Dördü de ilk turda 1.260–2.105 aralığındaydı;
  95 dışındaki üçü bandın **altında** kaldı (1.409 / 1.586 / 1.260). Eklenen malzemenin hepsi araştırma
  listesinde olup taslakta atlanmıştı: 96'ya düzgün yakınsama ve Nagarajan–Kolter, iyi huylu aşırı uydurma,
  dağılım kayması uyarısı; 97'ye k'nın yanlılık-oynaklık okuması, temel bileşen ↔ kümeleme ayrımı,
  Shwartz-Ziv, ağaçların dışarı uzatamaması, seçimin üç pratik ölçütü; 98'e bildirinin iskeleti, Lipton–
  Steinhardt'ın dört deseni, Ioannidis'in yapısal argümanı, Tomkins'in kör hakemlik ölçümü. Dolgu cümle
  eklenmedi. Son değerler: 2.105 / 2.053 / 2.076 / 2.031.
- **Şekil alt metni kelime sayısına girmiyor ama gövde hissini değiştiriyor.** Bu batch'in alt metinleri uzun
  (her biri 150–250 sözcük) ve ilk turda "makale doluymuş gibi" hissettirdi; oysa `countProseWords` onları
  atıyor. Ders: taslak biterken kelime sayısı **kapının kendi işleviyle** ölçülmeli, göz kararıyla değil.
- **Alt metin ile `aria-label` betikle senkronlandı.** Şekiller çizildikten sonra SVG'nin `aria-label`'ı
  markdown'daki `alt`'a kopyalandı (küçük bir Python betiğiyle); elle yazıldığında ikisi kaçınılmaz olarak
  ayrışıyor. Bu run'da üç alt metin bu yolla düzeldi.
- **`svgcheck` iki kusur yakaladı, PNG turu sıfır.** Yeniden yazılan ölçer (0,58 karakter genişliği, 6 px
  pay) 98'in iki şeklinde sağ kenar taşması ve birinde sütun çakışması buldu; düzeltildikten sonra 26 PNG'nin
  hiçbirinde göz kusuru çıkmadı. Batch 22'de tersi olmuştu (geometri kapıları geçmiş, PNG turu kusur bulmuştu);
  **iki kapı birbirinin yerine geçmiyor, ikisi de gerekli.**
- **Dev sunucusu bu kez 99 rotayı dört dilimde sorunsuz derledi** (32 + 32 + 18 + 17, toplam ~76 sn, hiç
  yönlendirme yok). Batch 22'deki yığın tükenmesi tekrarlanmadı; dilimleme kuralı korunmalı.
- **Playwright'ı ESM betiğinden `import "D:/..."` ile çağırmak çalışmıyor** (`ERR_UNSUPPORTED_ESM_URL_SCHEME`);
  `createRequire("file:///D:/dev/anil-lib/")` ile `require("@playwright/test")` çalışıyor.
- **Paralel BOUN oturumu bu run boyunca da aynı worktree'deydi** ve aynı dakikalarda dosya yazıyordu. Bu kez
  çakışma yaşanmadı, çünkü (a) `artifacts/` hiç kullanılmadı, (b) build ve dev sunucusu izole kopyada
  (`/d/dev/anil-lib-b23-render`) çalıştırıldı, (c) `.claude/launch.json` okunup **kendi girdisi eklenerek**
  yazıldı ve temizlikte yalnızca o girdi çıkarıldı.
- **Kapılar:** `pnpm typecheck` (0), **624 test** (`reading-list-groups.test.ts` dâhil — kategori kararı bunu
  gerektiriyordu), `pnpm build` (exit 0, `/seri/[slug]` **98 yol**, 153 statik sayfa, izole kopyada), 99 seri
  rotasının tamamı 200 (dört dilim, ~76 sn, yönlendirme yok), dört makale × üç genişlik × üç temada DOM
  ölçümü (taşma 0, `main.innerText` içinde undefined/NaN yok — 95'teki tek "NaN" gövdenin kendi cümlesidir,
  ham i18n anahtarı yok; 1440'ta SVG 771 px, 768'de 676, 375'te 351), konsolda yalnızca `/api/reader-sync`
  503, 13 yeni diyagram × iki tema = 26 PNG gözle incelendi (kusur bulunmadı), 54 kaynak bağlantısının
  tamamı çekildi.


- **Faz 10 açıldı ve zincir tek bir nesneyi dört kez yeniden kurdu:** sayı listesi aslında bir vektör uzayının
  öğesi (91) → o uzayı değiştiren matrisin içinde ikinci bir sayı var (92) → modelin ürettiği şey vektör değil
  dağılım (93) → o dağılımı ölçen kaybın bir birimi var ve tam ikiye ayrılıyor (94). Her makale bir öncekinin
  son cümlesini açtı ve hiçbirinde numaralı ileri vaat verilmedi.
- **Araştırma, yazım, entegrasyon ve doğrulama yine tamamen ana oturumda; workflow/subagent kullanılmadı**
  (cerebrum 2026-09-03). 95 kalemlik liste iki kopya betikle çekildi (ileri ve `REVERSE=1` ile ters); 86'sı
  indi, dokuzu bot/ödeme duvarı ya da taranmış PDF olduğu için kullanılamadı.
- **Bu batch'in kendi bulgusu: bir teoremin "en iyi"si, uygulamanın "en iyi"si değil.** Eckart–Young en iyi
  düşük ranklı yaklaşıklığı **matris** için verir; modelin umursadığı ise kayıptır. LLaMA 2-7B'de ham tekil
  değer kesmesi perplexity'yi 5,47'den 18.192'ye çıkarırken, kesmenin kayba etkisini hesaba katan yöntem
  7,73'te bırakıyor; ters yönde LASER seçilmiş katmanlarda kesme yaparak doğruluğu 13,1'den 29,2'ye taşıyor.
  Aynı işlem, iki ölçüt, iki sonuç. Faz 10'un tonu buradan çıktı: **her formalizasyon, ölçütün ne olduğunu
  sorma alışkanlığıyla birlikte veriliyor.**
- **Erken makalenin kapattığı kapıyı tekrar açmamak için terim defteri değil, makale gövdesi okundu.** 91'in
  ilk taslağı analoji aritmetiğinin sınırını yeniden anlatmaya kalkıyordu; oysa 4. makale bunu Nissim ve
  ark.'nın 0,74 → 0,21 ölçümüyle zaten yapmıştı. Taslak, "aritmetik doğru mu" sorusundan "soru neden
  sorulabilir" sorusuna çevrildi ve makale asıl işine kavuştu. **Ders: uzun aralıklı geri çağırmada, defterde
  kayıtlı olmasa bile kaynak makalenin gövdesi okunmalı.**
- **Kelime bandı bu fazda daha sıkı bağladı.** Dördü de ilk turda 1.712–1.974 aralığındaydı (repo kapısının
  ölçüsüyle, bandın altı). Eklenen malzemenin hepsi planda olup kesilmişti: 91'e birim küredeki nokta çarpım
  ↔ en yakın komşu özdeşliği ve doğrusal dönüşümlerin bileşkesi (aktivasyonun gerekçesi); 92'ye saklama
  eşiği, temel bileşen bağlantısı, gizli anlamsal indeksleme ve rank toplamı; 93'e en büyük olabilirliğin
  kusuru, softmax gradyanı ve kaydırma serbestliği; 94'e Shannon'ın teklik teoremi, bayt başına bit ve DPO'nun
  kapalı çözümü. Dolgu cümle eklenmedi. Son değerler: 2.069 / 2.014 / 2.029 / 2.040.
- **Repo kapısının kelime sayısını taklit ederken `node -e` yerine dosya kullan.** Kabuk içinde yazılan tek
  satırlık taklit 100–150 kelime fazla saydı ve üç makale "banttayım" sanılırken kapıda kaldı. `wc-b22.cjs`
  gibi küçük bir dosya, `check-series-content.cjs`'in `countProseWords` işlevini birebir kopyalar ve doğru
  sayıyı verir.
- **`openreview.net/forum?id=…` sayfası bağlantı kapısını yanıltıyor.** Bot doğrulama sayfası 200 döndürüyor,
  dolayısıyla **yanlış bir kimlik de 200 verir**. Bu run'da elle yazılmış on bir kimliğin dokuzu API ile
  doğrulandı, ikisi doğrulanamadı ve `proceedings.iclr.cc` biçimine çevrildi. Eski mecralar (ICLR 2018–2020)
  yalnızca `api.openreview.net`'te, yeni mecralar `api2`'de. Arama ucu 429 veriyor: sorgular arasında 6–8 sn.
- **Dev sunucusu 94 rotayı tek oturumda derleyemiyor.** Sweep 85. rotada JavaScript yığınını tüketip düşüyor
  (`Committing semi space failed`); `NODE_OPTIONS=--max-old-space-size` yardımcı olmadı. Çözüm sweep'i
  dilimlemek: 32 + 32 + 16 + 15 rota, sunucu ayakta, toplam ~75 sn. **Üretim derlemesiyle sweep yapılamaz:**
  `next start` middleware'i devreye sokuyor ve `.env.local` olmadığı için bütün rotalar `/login`e yönleniyor;
  `urllib` yönlendirmeyi izlediği için sweep sahte bir "hepsi 200" raporu üretiyor. Sweep betiği bu yüzden
  `resp.geturl()`i de karşılaştırıyor.
- **Aynı worktree'de ikinci bir üretim oturumu varsa `artifacts/` güvenli değil.** Bu run'ın çalışma dizini
  doğrulama turunun ortasında silindi (karar #208g). Ders: uzun ömürlü olmayan betikler oturum
  scratchpad'inde tutulmalı; `artifacts/` yalnızca run sonunda kalması istenen şeyler için.
- **Kapılar:** `pnpm typecheck` (0), **605 test** (`reading-list-groups.test.ts` dâhil — kategori kararı bunu
  gerektiriyordu), `pnpm build` (exit 0, `/seri/[slug]` **94 yol**, 146 statik sayfa, izole kopyada),
  95 seri rotasının tamamı 200 (dört dilim, ~75 sn, yönlendirme yok), dört makale × üç genişlik × üç temada
  DOM ölçümü (taşma 0, `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 1440'ta SVG 771 px,
  768'de 676, 375'te 351), konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema = 24 PNG
  gözle incelendi (bir kusur bulundu ve düzeltildi), 50 kaynak bağlantısının tamamı çekildi (ACM/SIAM/AIP/
  Royal Society/MIT Press DOI'leri bot duvarı döndürdü; künyeleri Crossref'ten doğrulandı).

## Batch 21 öğrenme notları (yazım tamamlandı)

- **Faz 9 kapandı ve zincir tek bir soruyu dört ölçekte sordu:** aynı kaliteyi daha az kaynakla vermenin
  eğitimden geçen yolu (87) → o modelin konduğu yer ve oradaki dört kısıt (88) → kısıtları üreten donanımın
  kendisi (89) → donanımın harcadığı elektriğin nasıl sayıldığı (90). Her makale bir öncekinin son cümlesini
  açtı ve hiçbirinde numaralı ileri vaat verilmedi.
- **Araştırma, yazım, entegrasyon ve doğrulama yine tamamen ana oturumda; workflow/subagent kullanılmadı**
  (cerebrum 2026-09-03). 100 kalemlik liste iki kopya betikle çekildi (ileri ve `REVERSE=1` ile ters);
  94'ü indi, altısı (Eyeriss, Groq'un ISCA bildirisi, Leiserson'ın Science makalesi, CSET tedarik zinciri
  raporu, de Vries'in Joule makalesi, Kaack'ın Nature Climate Change makalesi) bot duvarı ya da ödeme
  duvarı yüzünden indirilemedi ve **hiçbiri kullanılmadı**. Batch 20'den taşınan sekiz metinle birlikte
  çalışma kümesi 109 metin oldu.
- **Bu batch'in kendi bulgusu: dört makalenin dördü de aynı biçime oturdu — "sayı, koşullarıyla birlikte
  okunur".** 87'de damıtmanın kazancı bir eşiğin altında geçerli; 88'de token/saniye ancak yonga, çerçeve ve
  bit genişliğiyle anlamlı; 89'da tepe hız ile ulaşılan hız ayrı sayılar; 90'da aynı istem iki sınırla 2,4 kat
  fark ediyor. Faz 9'un kapanışı bu yüzden Faz 11'in (ölçüm bilimi) hazırlığı gibi okunuyor.
- **Bir çalışmanın kendi içinde tutarsız iki sayısı çıktı ve büyütülmedi.** MobileLLM'in "her 64 token pilin
  binde ikisi" cümlesi, aynı paragraftaki 0,7 J/token değeriyle uyuşmuyor (0,7 × 64 = 44,8 J, 50 kJ'ün binde
  0,9'u). Cümle alınmadı; yerine kaynağın kendi "iki saatten az" sonucuyla örtüşen ve girdileri metinde duran
  kendi hesabımız kondu (karar #196). Ders: kaynak içi tutarsızlıkta, kaynağın **kendi vardığı sonuçla**
  örtüşen kolu seçilir ve hesap açıkça gösterilir.
- **Ön baskı ↔ yayımlanmış başlık farkı ikinci kez vurdu.** Batch 20'de Jamba'ydı, burada "The False Promise
  of Imitating Proprietary **LLMs**" → ICLR 2024'te "…Proprietary **Language Models**". Bu kez arama önce
  `idx-b21.py`'de boş döndü ve OpenReview arama ucu düzeltti. Kural pekişti: dizinde bulunamayan bir künye
  "yok" değil, "başlığı farklı" olabilir.
- **Venue tahmini kaynak dosya adına yazılmamalı.** MELT'in anahtarı `..._mobisys2024` diye açılmıştı; Crossref
  mecranın **MobiCom 2024** olduğunu gösterdi. Dosya adları çalışma notudur, künye değildir; künye her zaman
  ayrı bir kanaldan doğrulanır.
- **ACL Anthology dizin sayfalarında `href` tırnaksız yazılıyor** (`href=/D16-1139/`); Batch 20'nin URL çözücüsü
  bu yüzden hiçbir şey bulamıyordu. `acl-b21.py` bunun için yazıldı ve altı ACL/EMNLP künyesini çözdü.
- **Kelime bandı yine sıkıştı ama başka bir sebeple.** Dördü de ilk turda 1.833–2.321 aralığındaydı (repo kapısının ölçüsüyle; hedef bandın altı); üçüne
  planda olup kesilmiş malzeme geri kondu (88'e uç tanımı, melez düzenin karar kuralı ve adaptör mekanizması;
  89'a çatı modelinin sınırları, özelleşmenin bedeli ve kesim bandı; 90'a su ve GPT-3 zincirinin uçtan uca
  hesabı). Dolgu cümle eklenmedi; eklenen malzemenin hepsi kaynaklı. Son değerler: 2.389 / 2.019 / 2.004 / 2.075.
- **Şekiller bu run'da iki kez düzeltildi ve ikisini de yalnızca PNG turu buldu** (karar #197). Ayrıca bir
  ölçüm hatası düzeltildi: 90-Şekil 2'nin ilk sürümü metin üretimi için "0,042–0,047" aralığı veriyordu; oysa
  0,047 ortalama, 0,042 ortancadır ve kaynağın "en verimli metin üretimi = telefon şarjının yüzde 9'u"
  cümlesi bambaşka bir sayıya (0,002) karşılık gelir. Şekil, kaynağın kendi tablosundaki ortalamalarla
  yeniden çizildi. Ders: bir kaynaktan aralık türetmeden önce, o aralığın kaynağın hangi istatistiğinden
  geldiğine bakılır.
- **Tarayıcı panosundaki ölçüm, sayfa yerleşimi oturmadan yapılırsa yanlış sayı verir.** İlk turda üç makalede
  SVG genişliği 609 px okundu; `navigate` sonrası 1,8 saniye beklenince dördünde de 771 px çıktı (Batch 20 ile
  aynı). Ölçüm betiğine bekleme konmadan sayı alınmamalı.
- **Kapılar:** `pnpm typecheck` (0), **587 test**, `pnpm build` (exit 0, `/seri/[slug]` **90 yol**, 139 statik
  sayfa, izole kopyada), 91 seri rotasının tamamı 200 (65,6 sn), dört makale × üç genişlik × üç temada DOM
  ölçümü (taşma 0, `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 1440'ta SVG 771 px,
  768'de 676, 375'te 351), konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema = 24 PNG gözle
  incelendi, 48 kaynak bağlantısının tamamı çekildi (ACM/IEEE/Science DOI'leri ve Nature bot duvarı döndürdü;
  künyeleri Crossref ve tarayıcı panosuyla doğrulandı). Paralel oturum görünmedi (3000–3999 arası dinleyen
  port yok); build ve dev izole kopyada (`D:\dev\anil-lib-b21-render`, 3210), junction ve kopya run sonunda
  silindi, `launch.json` geri alındı.

## Batch 20 öğrenme notları (yazım tamamlandı)

- **Faz 9'un gövdesi tamamlandı ve iki bağlayıcı koordinat birden kapandı:** üretimin ters yönü (83) → her şeyi tek
  sözlüğe indirme iddiası (84) → parametreyi hesaptan ayırma (85) → geçmişi nasıl tuttuğun sorusu (86). Zincir
  kendiliğinden kuruldu: 83 iki üretim düzenini ayırdı, 84 ikisini tek gövdede birleştirmeyi sınadı, 85 ve 86 aynı
  soruyu ("aynı kaliteyi daha az kaynakla") bloğun iki yarısında — işleyen yarı ve bakan yarı — sordu.
- **Araştırma yine tamamen ana oturumda, workflow/subagent yok** (cerebrum 2026-09-03). 144 kalemlik tek liste iki
  kopya betikle çekildi (ileri ve `REVERSE=1` ile ters); 139 metin, tek kalem kurtarılamadı (bir NeurIPS 2022
  kuramsal MoE çalışması) ve kullanılmadı.
- **Bu batch'in kendi bulgusu: "iki taraf" deseni üç makalede birden çıktı ve hepsinde ayrım aynıydı — neyin sabit
  tutulduğu.** 85'te iki ICML çalışması uzmanlar karışımı için zıt ölçek sonucu bildiriyor (fayda azalıyor ve
  937 milyarda kesiliyor ↔ her bütçede kazandırıyor); fark veride değil, birinin eğitim süresini ve uzman boyunu
  sabitlemesinde. Bu, 9\. makaledeki Kaplan–Chinchilla ayrımının aynı biçimi ve gövdede adıyla bağlandı. 84'te aynı
  desen sözlük tarafında çıktı (iyi bir tokenizer dil modelini öne geçiriyor ↔ kuantizasyonu bırakmak daha verimli),
  86'da ise ölçü tarafında (daha düşük perplexity ↔ rehber görevinde belirgin kayıp).
- **Terim çakışması gövde yazılırken değil, defter okunurken yakalandı.** 83'ün kesinlik/geri çağırma ikilisi
  yazıldıktan sonra defterdeki 29 ("bulma oranı; 18 ve 21'deki geri çağırmayla karıştırılmaz") ve 45 ("kesinlik")
  satırları okundu ve "geri çağırma" **kapsama** ile değiştirildi (karar #187). Ders: yeni bir ölçü çifti kurarken
  terim defterinin ilgili satırları **yazımdan önce** aranmalı; sonradan düzeltmek gövde + şekil + alt metin +
  hash turu demek.
- **URL uydurma riski bu run'da yine gerçekleşti.** Elle yazılmış NeurIPS hash URL'lerinin üçü yanlıştı ve
  `url-b20.py` yakaladı. Ayrıca `links-b20.py` bir PMLR 404'ü buldu ve o iz, yayımlanmış sürümde **yazar sırasının
  değiştiğini** ortaya çıkardı (Krajewski → Ludziejewski). Kural pekişti: hash içeren hiçbir bağlantı dizinden
  çözülmeden yazılmaz, ve 404 alan her bağlantı yalnızca URL değil **künye** hatası olabilir.
- **İki yeni venue kanalı kuruldu.** `api2.openreview.net/notes/search?term=...&source=forum` uçtu ve COLM ile eski
  ICLR künyelerini verdi (DBLP hâlâ kapalı, Semantic Scholar hâlâ 429); `iclr.cc/virtual/<yıl>/papers.html` ve
  `iclr.cc/Conferences/<yıl>/AcceptedPapersInitial` ise proceedings.iclr.cc'nin vermediği 2023 ve öncesini kapatıyor.
  Bu iki kanal olmasa Jamba'nın COLM iddiası düzeltilemezdi.
- **Kelime bandı yine sıkıştı.** Dördü de ilk turda 1.977–2.331 aralığındaydı; üçüne planda olup kesilmiş malzeme
  geri kondu (84'e token'ın kodek olarak ikinci işlevi ve pencere bütçesi, 85'e GLaM'ın enerji üçlüsü ve seyrek
  yükseltme, 86'ya yinelemenin tarihsel dönüşü ve RWKV). Dolgu cümle eklenmedi. Ölçüm yordamı: düzyazının şekil
  sözdizimi ve bağlantı hedefleri çıkarılmış `wc -w`'si, repo kapısının sayısına yakın çıkıyor (2.072–2.331).
- **SVG'lerde iki tur gerekti.** `svgcheck-b20.py` beş dosyada alt payı 12'nin altında buldu ve `viewBox`
  yükseklikleri artırıldı; çakışma ve kutudan taşma hiç çıkmadı. **PNG turu bir kusur buldu** (86-Şekil 3'ün dar
  sütun payı) — Batch 19'da bulmamıştı. Ayrıca bir tuzak: izole kopyada çalışan dev sunucusu SVG'yi değil, **derlenmiş
  sayfayı** önbelleğe alıyor; ana ağaçta düzeltilen şekli görmek için dosyayı kopyaya senkronlamak **ve**
  `preview_stop` + `preview_start` yapmak gerekti.
- **Kapılar:** `pnpm typecheck` (0), **575 test**, `pnpm build` (exit 0, `/seri/[slug]` **86 yol**, 135 statik sayfa,
  izole kopyada), 87 seri rotasının tamamı 200 (52,8 sn), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0,
  `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 1440'ta SVG 771 px, 768'de 676, 375'te 351),
  konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema = 24 PNG gözle incelendi, 68 kaynak
  bağlantısının tamamı çekildi (yalnız MIT Press DOI'si 403 bot duvarı döndürdü, künye Crossref'ten doğrulandı).
  Paralel oturum görünmedi (3000–3999 arası dinleyen port yok); build ve dev izole kopyada
  (`D:\dev\anil-lib-b20-render`, 3210), junction ve kopya run sonunda silindi, `launch.json` geri alındı.

## Batch 19 öğrenme notları (yazım tamamlandı)

- **Faz 8 kapandı, Faz 9 açıldı: sağlamlık (79) → şeffaflık (80) → görüntü-dil modelleri (81) → ses ve gerçek zamanlı
  modeller (82).** Yayın 78'in kapanış sorusuyla açıldı ("koşullar değişince aynı model başka şey yapar") ve zincir
  kendiliğinden kuruldu: 79 bir puanın hangi dağılımda ölçüldüğünü sordu, 80 o koşulların nereye yazıldığını, 81 bir
  modaliteyi token'a çevirmenin mekanizmasını, 82 aynı hamlenin sese uygulanmasını ve konuşmanın gecikme bütçesini.
  **54'ün numarasız işareti 81'de ödendi.** Faz 9'un kategorisi `multimodal-and-future` olarak karara bağlandı (#176);
  iki başlık Türkçeleştirildi (#177, #178).
- **Araştırma yine tamamen ana oturumda, workflow/subagent yok** (cerebrum 2026-09-03). 172 kalemlik tek liste iki kopya
  betikle çekildi (`fetch-b19.py` ileri, `fetch-b19b.py` `reversed(ITEMS)` ile ters); 169 metin, beş kalemlik retry turu
  ikisi hariç hepsini kurtardı.
- **Zincirin kendisi bir bulgu oldu: aynı ölçü üç makalede yeniden çıktı.** 79'un **etkin sağlamlık** tanımı 81'de
  karşıtsal görüntü modellerinin sağlamlığını (Fang'in beş nedeni) ve 82'de Whisper'ın "eşit referans puanında yüzde 55,2
  daha az hata" iddiasını okumanın anahtarı oldu; üçünde de kazandıran şey mimari değil eğitim dağılımının kapsamı.
  Aynı biçimde 79'un **makro doğruluğu** (bir sorunun bütün çeşitlemelerinde doğru) 81'de MMVP'nin çift bazlı puanlamasında
  yeniden belirdi. Bu paralellikler planlanmamıştı; kaynaklardan çıktı ve şekillere taşındı (#182).
- **İki kaynak hakemsizden hakemliye taşındı.** Crossref `query.bibliographic` taraması, arXiv'de duran iki çalışmanın
  Nature Machine Intelligence 2024'te yayımlandığını gösterdi (32 bin model kartı çözümlemesi; veri kökeni denetimi).
  Ders: bir kaynağı hakemsiz saymadan önce **başlıkla Crossref taraması** yapılmalı — arXiv `comment` alanı boş olabiliyor
  ama dergi kaydı duruyor.
- **URL uydurma riski bu run'da somut olarak yakalandı.** İlk taslaklarda NeurIPS/ICLR hash URL'leri elle yazıldı; kurulan
  `url-b19.py` bunları dizin sayfalarından çözdü ve **üç tanesinin yanlış olduğunu** ortaya çıkardı (Idefics2, LLaMA-Omni,
  MMAU; ayrıca Consent in Crisis). Yeni kural: hash içeren hiçbir bağlantı dizinden çözülmeden yazılmaz. Son kapı olarak
  `links-b19.py` dört makalenin 75 bağlantısını tek tek çekip `<title>` karşılaştırdı; ACM/IEEE/Springer'in 403 ve 202
  dönmesi bot duvarıdır, künyeler Crossref API'yle ayrıca doğrulandı.
- **CVF ve ISCA dizinleri eklendi.** `idx-b19.py`'ye CVPR 2019–2025, ICCV 2019–2025, ACCV 2024, ECVA (ECCV 2018–2024) ve
  Interspeech 2019–2025 kondu; CVPR/ICCV'nin 2019 ve 2020 sayfaları `?day=all` desteklemiyor, gün bağlantıları
  (`CVPR2019.py?day=...`) tek tek indirilip birleştirildi. NeurIPS'in 2021 veri kümeleri ve ölçütler programı ayrı bir
  alan adında (`datasets-benchmarks-proceedings.neurips.cc`) ve ayrıca indirildi.
- **Kelime bandı bu kez üç makalede sıkıştı.** 80 ilk turda 1.700 dolayındaydı; 81 ve 82 2.030–2.100 bandındaydı. Üçüne de
  **planda olup kesilmiş malzeme** geri kondu: 80'e derlemin sonradan belgelenmesi ve üç katmanlı denetim, 81'e verinin
  sağlamlığı belirlemesi ve veri seçiminin ölçütleştirilmesi, 82'ye çok dillilik ve sıra alma kestirimi. Dolgu cümle
  eklenmedi.
- **SVG'lerde tek kusur alt paydı.** `svgcheck-b19.py` iki dosyada 12 birimin altında alt pay yakaladı ve `viewBox`
  yüksekliği artırılarak düzeltildi; çakışma, kutudan taşma ve repo kapısının 0,55 tahmini uyarısı hiç çıkmadı. **PNG turu
  bu kez kusur bulmadı** (Batch 17 ve 18'de bulmuştu) — tabloya ağırlık verilip serbest yerleşimli eğri kullanılmaması
  bunun sebebi görünüyor.
- **Kapılar:** `pnpm typecheck` (0), **563 test**, `pnpm build` (exit 0, `/seri/[slug]` **82 yol**, izole kopyada),
  83 seri rotasının tamamı 200 (56,2 sn), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0,
  `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 1440'ta SVG 771 px, 768'de 676, 375'te 351 ve yatay
  kaydırma yok), konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema = 24 PNG gözle incelendi. Paralel
  oturum görünmedi (3000–3999 arası dinleyen port yok); build ve dev izole kopyada (`D:\dev\anil-lib-b19-render`, 3210),
  junction ve kopya run sonunda silindi, `launch.json` `artifacts/b19-research/launch.json.orig`'ten geri alındı.

## Batch 18 öğrenme notları (yazım tamamlandı)

- **Faz 8'in ikinci yarısı: özellikler ve süperpozisyon (75) → aktivasyonlara müdahale (76) → atıf (77) → beliren
  yetenekler (78).** 74'ün kapanış sorusu ("devrenin düğümleri nöron olamaz") 75'in açılışı oldu; 75 süperpozisyonu
  oyuncak modelde kurup seyrek sözlüğü ve sözlüğün dört sınavını verdi; 76, 62/65/66/67/18'de dağınık duran tek işlemi
  (yön bul, ekle ya da sil) çerçeveye oturttu; 77 "neden"i üç ayrı soruya böldü ve **74–77 bandını kapattı**; 78, 5 ve
  9'un **78 koordinatını ödedi**. Üç başlık Türkçeleştirildi (#169, #170, #171); kategori sorusu yoktu (#160).
- **Araştırma yine tamamen ana oturumda, workflow/subagent yok** (cerebrum 2026-09-03). 198 kalemlik tek liste iki
  kopya betikle (`fetch-b18.py` ileri, `fetch-b18b.py` `reversed(ITEMS)` ile ters sırada; aynı `.txt` varlığını
  paylaşıp çakışmadan 191 metin), sonra 15 kalemlik `retry-b18.py` turu (klasikler için alternatif adresler).
- **DBLP bu run'da yok: bot doğrulama sayfası.** `dblp.org`, `dblp.dagstuhl.de` ve `dblp.uni-trier.de` üçü de Anubis
  tarzı "Making sure you're not a bot!" sayfası döndürdü; JS iş kanıtı istediği için `urllib`/`curl` ile aşılamaz.
  OpenReview arama ucu ilk birkaç sorguda çalışıp sonra sessizce boş liste döndürmeye başladı (50 sn aralık da
  yetmedi); `api2.openreview.net/notes?content.title=` kimliksiz 403; Semantic Scholar tekil sorguda bile 429.
  **Kurulan yerine geçen düzen** (`idx-b18.py`): konferans dizin sayfalarını bir kez indirip yerelde başlık aramak.
  `proceedings.iclr.cc/paper_files/paper/<yıl>` 2024–2026 için çalışıyor (2023 ve öncesi 404),
  `papers.nips.cc/paper_files/paper/<yıl>` 2017–2024 dolu (2025 henüz eksik), `proceedings.mlr.press/v<cilt>` ICML
  yıllarını veriyor (v306 = ICML 2026 henüz 404), `jmlr.org/tmlr/papers` TMLR'ın tamamını tek sayfada veriyor.
  Buna arXiv API'nin `comment`/`journal_ref` alanları (`venue-b18.py`), PDF ilk sayfa yayın satırı (`hdr-b18.py`,
  190 dosyanın 57'sinde bulundu) ve Crossref `query.bibliographic` eklenince kapsama DBLP'ninkine yakın çıktı.
- **Dizin taraması altı künyeyi düzeltti:** Kantamneni ve AxBench ICML 2025, Paulo & Belrose ve Heap **ICLR 2026**,
  Ruan NeurIPS 2024 (elde ICLR 2025 yazıyordu), Hernandez COLM 2024 (ICLR değil). NeurIPS dizininde başlıklar hatalı
  yazılmış olabiliyor (Ruan'ınki "Langauge"), bu yüzden tam başlık aranınca bulunamıyor — kısa parça aramak gerekiyor.
- **Ad ve başlık tuzakları:** CAA bildirisinin ACL 2024 sürümünde ilk yazar **Panickssery** (arXiv'de Rimsky);
  Heap'in başlığı v2'de tamamen değişti; "Sparse Feature Circuits" adı ICML 2025'te başka bir bildiride de geçiyor
  (Marks'ınki ICLR 2025).
- **Kelime bandı iki kez düştü.** `scan-b18.py` şekil alt metinlerini de sayıyor; repo kapısı saymıyor. 77 (1.968) ve
  78 (1.870) ilk turda tabanın altında kaldı ve **içerik eklenerek** çıkarıldı (77'ye "açıklama kimin için" bölümü,
  78'e Skill-Mix ve bileşik yetenek paragrafı) — dolgu değil, planda olup kesilmiş malzeme geri kondu.
- **SVG: iki ölçer, iki farklı sabit.** `svgcheck-b18.py`'ye Batch 17'nin dersleri eklendi (her metin çiftini aynı
  satırda karşılaştır; kutu içi metni kutunun `x + width`'ine karşı ölç) ve **repo kapısının 0,55 × font-size
  tahminini taklit eden üçüncü bir kontrol** kondu — çünkü yerel ölçer 6,8 birim/karakter kullanırken
  `check-series-svg.cjs` 7,15 kullanıyor ve üç satır yalnızca repo kapısında taştı. **PNG turu yine iki kusur buldu:**
  75-Şekil 2'de "yeniden kurma" kendi kutusunun sağ kenarına dayanmıştı (akış kutuları yeniden yerleştirildi) ve
  78-Şekil 1'de "uçurum" etiketi eğrinin üstünden geçiyordu (etiket sağ alta alındı).
- **Render kopyası dosya kopyalayınca yetmiyor.** Kopyaya sonradan senkronlanan `catalog.json` dev sunucusunun
  belleğindeki eski hash'i değiştirmedi ve `/seri/<slug>` "Katalog ile frontmatter uyuşmuyor" hatası verdi;
  **dev sunucusunu yeniden başlatmak gerekti**. Ders: kopya oluşturulduktan sonra içerik değişirse önce dosyaları
  senkronla, sonra `preview_stop` + `preview_start`.
- **Kapılar:** `pnpm typecheck` (0), **551 test**, `pnpm build` (exit 0, `/seri/[slug]` 78 yol, izole kopyada),
  79 seri rotasının tamamı 200 (39,6 sn), dört makale × üç genişlik × üç temada DOM ölçümü (taşma 0,
  `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 375'te SVG'ler 351 px'e ölçekleniyor ve kendi
  kaplarında yatay kaydırma bile gerekmiyor), konsolda yalnızca `/api/reader-sync` 503, 12 yeni diyagram × iki tema =
  24 PNG (iki düzeltme sonrası dördü yeniden çekildi). Paralel oturum görünmedi (3000–3999 arası dinleyen port yok);
  build ve dev izole kopyada (`D:\dev\anil-lib-b18-render`, 3210), junction ve kopya run sonunda silindi,
  `launch.json` `artifacts/b18-research/launch.json.orig`'ten geri alındı.

## Batch 17 öğrenme notları (yazım tamamlandı)

- **Faz 8 açıldı: değerlendirme bilimi (71) → kirlilik ve ezber (72) → insan değerlendirmesi ve hakem modeller
  (73) → mekanistik yorumlanabilirlik (74).** 70'in kapanış sorusu ("bir değerlendirme neyi ölçer") 71'in
  açılışı oldu; 71 puanı bir ölçüm olarak kurdu (geçerlilik zinciri, kısayol, hata payı, protokol), 72 8/16/18/31'in
  kirlilik koordinatını ödedi, 73 anahtarsız ölçümü insan ve hakem üzerinden kurdu ve 65'in hakem güveni işaretini
  tahsil etti, 74 6 ve 18'in 74–77 bandını açtı ve 3'ün çok anlamlı nöronunu 75'e devretti. Kategori kararı
  verildi (#160); iki başlık Türkçeleştirildi (#162, #163), 71'in "benchmark"ı kaldı (#161). Kohort tamamen
  `safety-and-evaluation`; okuma listesinde 61–74 tek öbek, test değişmedi (519 test).
- **Araştırma yine tamamen ana oturumda, workflow/subagent yok** (cerebrum 2026-09-03). 274 kalemlik tek liste
  **iki kopya betikle** (`fetch-b17.py` ileri, `fetch-b17b.py` ters sırada; aynı `DONE` listesini paylaşıp
  çakışmadan 272 metin) ve DBLP `ee` arka planda (`dblp-b17.py`, 12 sn aralık, 600+ anahtar; b13–b16'dan
  tohumlandı). **Yeni kanallar ve tuzaklar:** OpenReview PDF'leri 403 (arXiv sürümü okundu, kimlikler DBLP
  `ee`'den alındı); COLM kabul listesi sayfası bir challenge sayfası döndürüyor (Rein doğrulanamadı); lesswrong
  429; Semantic Scholar toplu sorguda yine 429; METR'in yetenek çıkarma kılavuzunun adresi iki kez taşınmış;
  Burnell'in Science yazısı `eprints.whiterose.ac.uk` ön baskısından; Rodriguez'in ACL PDF'inden metin
  çıkmadı; Crossref `query.title` sonuçları `crossref-b17.json`'da. DBLP yazım bittikten sonra da sonuç
  vermeye devam etti ve beş künyeyi hakemliye çevirdi (#167) — **künyeler DBLP bitmeden kesinleşmemeli.**
- **Sayı ve ad tuzakları:** Zheng'in Tablo 1'i sütun sütun okunmalı (özgün sıra ↔ A/B/C/D); GSM1k tablosunda
  özgün ↔ yeni ↔ fark üç ayrı sütun; Bavaresco'nun Tablo 1'inde insan sınırı bazı satırlarda "—"; Wang'ın
  %87'si 3,56'lık farkın payıdır, doğruluk değil; Olsson'un skoru nat cinsinden; Hewitt & Liang'ın seçiciliği
  fark (97,3 − 92,8 = 4,5), oran değil; DyVal'ın ilk yazarı "Kaijie Zhu" (taslakta "Kaipeng" yazılmıştı,
  yayından önce düzeltildi); yazar listeleri PDF'ten (Wallach, Raji, Bean, White, Biderman).
- **Kelime bandı:** 71 ilk taslakta 3.734 düzyazı kelimesiyle tavanı aştı ve altı kırpma turuyla indi (kesilenler
  ikinci örnekler ve tekrar eden bağlam); 74 3.571 wc ile tavanın hemen altında; 73 3.305. Ölçüm makaleleri
  yine uzun geldi (Batch 16'nın dersi doğrulandı).
- **SVG:** 12 yeni şekil. `svgcheck-b17.py` yazım aşamasında üç sütun binmesi, dört sağ kenar taşması ve bir
  alt not taşması yakaladı. **PNG turu bu kez iki kusur daha buldu:** aynı satırdaki iki etiketin ("dolaylı
  nesne" ↔ "özne S1") biri kayıtlı sütun olmadığı için ölçer görmedi; ve bir metin kendi `rect`'inin dışına
  taştı (ölçer metni bir sonraki sütuna karşı ölçer, kutu genişliğine karşı değil). Ders: ölçer kutu içi
  metinleri kutunun `x + width`'ine karşı da ölçmeli (sonraki run'da `svgcheck`'e eklenecek); PNG turu
  vazgeçilmez.
- **Render doğrulaması izole kopyada** (`D:\dev\anil-lib-b17-render`, junction + kapısız dev, 3210): build exit 0
  (`/seri/[slug]` 74 yol), 75 seri rotası 200 (36,3 sn), dört makale × üç genişlik × üç temada DOM ölçümü temiz
  (taşma 0, `main.innerText` içinde undefined/NaN yok, ham i18n anahtarı yok; 375'te SVG kendi kaydırma kabında,
  `.series-figure-scroll` tasarımı), konsolda yalnızca `/api/reader-sync` 503; ana worktree'de typecheck (0) ve 519
  test; 26 PNG (12 şekil × 2 tema + iki yeniden çekim). **launch.json tuzağı tekrarlandı:** Bash heredoc içindeki
  Python'da bile `\\` çiftleri tek `\`'a indi ve `\b` backspace oldu — Write aracıyla yazıldı; Git Bash'in yolu
  bu makinede `%LOCALAPPDATA%\Programs\Git\usr\bin\bash.exe`. Kullanıcı Batch 15–16'yı run sırasında commit etti
  (`C0MM`); yalnızca Batch 17 çalışma ağacında.

## Batch 16 öğrenme notları (yazım tamamlandı)

- **Faz 7 kapandı: aldatma (67) → kötüye kullanım (68) → yönetişim (69) → sorumlu ölçekleme (70).** 66'nın
  "aldatmayı ölçüye çevir" borcu 67'de üç ayrı ölçüm ailesiyle ödendi (inşa edilen aldatma, kendiliğinden
  aldatma, durum farkındalığı) ve makale kanıt ile hipotezi ayrı sütuna yazarak kapandı; 67 tehdit modelini
  modelden insana devretti, 68 marjinal risk sorusunu ve üç alanın tabanını kurdu, 69 kararı kurumsallaştırdı,
  70 kararın belgesini yazdı ve fazın haritasını çizdi. İki koordinat kapandı: 20'nin açık kaynak tanımı vaadi
  (69) ve açık ağırlık güvenliği vaadi (68 + 70). Kohort tamamen `safety-and-evaluation`; okuma listesinde
  61–70 tek öbek, `reading-list-groups.test.ts` değişmedi (507 test; +12 test yeni SVG'lerden).
- **Araştırma yine tamamen ana oturumda; ultracode açık, workflow/subagent kullanılmadı** (cerebrum 2026-09-03).
  ~140 aday PDF tek betikle (`fetch-b16.py`; arXiv API geri düşüşü, HTML sayfaları için içeri gömülü ayrıştırıcı),
  DBLP `ee` (`dblp-b16.py`, b15/b14/b13'ten tohumlandı, 110 sorgu), politika ve sağlayıcı belgeleri
  (`fetch-html-b16.py`, 70 sayfa). **Yeni kanallar ve tuzaklar:** `urllib`'in varsayılan başlığıyla OpenAI,
  ISO, PNAS, ACM ve OUP 403 döndü — tarayıcı `User-Agent`'lı `curl` ile alındı; RAND raporları AES şifreli PDF
  (`pip install cryptography` sonrası açıldı); PNAS Nexus tam metni Europe PMC yerine `pmc.ncbi.nlm.nih.gov`
  sayfasından; Hackenburg'un sayıları OSF ön baskısından (`osf.io/<id>/download`); Semantic Scholar toplu
  sorguda 429 verdi, tek tek sorulmalı; Urbina Nature MI 2022'nin tam metni alınamadı, Sandbrink'in aktarımı
  üzerinden anıldı.
- **Sayı tuzakları:** Cybench'in yönlendirmesiz %17,5'i ile alt adım yönlendirmeli %43,9'u ayrı ölçülerdir ve
  aynı cümlede karışmamalı; Claude 4 sistem kartında kontrol grubu %25 ± 13 ve model grubu %63 ± 13, kaldıraç
  2,53× — "puan farkı" ile "kaldıraç" ayrı yazıldı; Spitale'nin dört puanı çapraz (organik/sentetik × doğru/yanlış)
  ve yanlış eşleştirmek kolay; Goldstein'ın propaganda deneyi 8.221, Hackenburg'unki 8.587 katılımcı — ikisi
  farklı çalışma; Fang'ın "2,8 kat ucuz"u kaynağın kendi ifadesi, bizim bölmemiz değil (karar #158).
- **Kelime bandı:** 67'nin ilk taslağı 4.067 düzyazı kelimesiyle **tavanı aştı** ve beş kırpma turuyla 3.502'ye
  indi (sayılar korunarak; kesilenler tekrar eden bağlam cümleleri ve ikinci örneklerdi). 70 ise tersine
  **tabanın altında** başladı (1.595) ve iki ekleme turuyla 2.617'ye çıktı; eklenenler dolgu değil eksik
  mekanizmaydı: değerlendirme sıklığı ve yetenek çıkarma, ağırlık güvenliği kademeleri, güvenlik savunmasının
  karar zinciri, fazın dikey okuması. Ders: yönetişim/çerçeve makaleleri kısa, ölçüm makaleleri uzun gelir.
- **SVG:** 12 yeni şekil. Repo denetleyicisi altı alt not taşmasını yakaladı. Kendi yazdığım
  `artifacts/b16-research/svgcheck-b16.py` (sütun başlangıçlarını çıkarıp her metni **bir sonraki sütuna** ve
  700'e karşı 6,8 birim/karakter ile ölçer, alt payı da bildirir) denetleyicinin görmediği **on bir sütun
  binmesini ve dokuz alt pay eksikliğini** yazım aşamasında yakaladı; Batch 15'te bu kusurlar ancak PNG'de
  görünmüştü. Yeni kural: her şekil dosyası yazıldıktan sonra hem `check-series-svg.cjs` hem `svgcheck-b16.py`
  çalıştırılır; ikincisi "alt pay ≥ 12" ve "sütuna binme" kapılarını verir. PNG incelemesi yine yapıldı (24
  görüntü, Playwright) ve **bu kez görüntüde yeni kusur çıkmadı** — sıra doğru: önce ölçer, sonra göz.
- **Render doğrulaması izole kopyada** (`D:\dev\anil-lib-b16-render`, junction + kapısız dev, 3210): build exit 0
  (`/seri/[slug]` 70 yol), 71 seri rotası 200 (35,4 sn), dört makale × üç genişlik × üç temada DOM ölçümü temiz
  (badFills ve outOfBox boş, taşma 0, figScroll false, `main.innerText` içinde undefined/NaN yok); ana
  worktree'de typecheck (0) ve 507 test. Ham HTML'deki 39 "undefined" Next.js iskelesindendir ve yayımlanmış
  eski makalelerde de aynıdır (66 ve 1 ile karşılaştırıldı) — regresyon değil.
- **Tarayıcı panosu bu run'da sorunsuz çalıştı** (ölçüm için): `localStorage`'a yazılan ölçüm fonksiyonu +
  `eval` ile üç tema tek çağrıda; `resize_window` üç genişlikte; sekme sınırına takılınca eski dosya sekmeleri
  `tabs_close` ile kapatıldı ve yeni sekme `tabs_create` ile açıldı (yerel dosya sekmesi `navigate` kabul
  etmiyor). Şekil görüntüleri yine Playwright'tan (`shots-b16.cjs`).

## Batch 15 öğrenme notları (yazım tamamlandı)

- **Faz 7'nin gövdesi: jailbreak (63) → anayasa ve denetim (64) → kalibrasyon (65) → dalkavukluk ve karakter
  (66).** 62'nin "ret ilk token'lardaysa saldırgan onları nasıl ele geçirir" sorusu 63'te altı saldırı ailesi ×
  üç erişim düzeyi, GCG aktarım tablosu, HarmBench ve StrongREJECT'in "kim puanlar" bulgusuyla ödendi; 63 hakemin
  güvenini ve anayasa temelli sınıflandırıcıyı 64'e, 64 etiketin bir olasılık oluşunu 65'e, 65 "emin misin?"
  davranışını 66'ya, 66 Shanahan'ın rol oyunu dilini 67'ye devretti. 64 koordinatı ödendi; 20'nin taksidi 63'te.
  Kohort tamamen `safety-and-evaluation`, 495 test değişmeden geçti.
- **Araştırma yine tamamen ana oturumda; ultracode açık, workflow/subagent kullanılmadı.** ~140 aday PDF tek
  betikle (`artifacts/b15-research/fetch-b15.py`), DBLP `ee` (`dblp-b15.py`; `dblp-b14.json`'dan tohumlandı),
  sağlayıcı belgeleri (`fetch-html-b15.py`: anayasa, karakter, many-shot, Constitutional Classifiers, Model Spec
  2024/2025, GPT-4o dalkavukluk açıklamaları, NeurIPS 2024 many-shot sayfası). Yeni kanallar: Europe PMC
  `fullTextXML` (Nature OA makalesinin tam metni; Nature PDF 403), PMLR 267 dizini ayrıştırması (DBLP 503
  verince). DBLP many-shot için yanlış hit verdi → `papers.nips.cc` sayfası; COLM 2024 sayfası challenge döndü.
- **Sayı tuzakları:** Andriushchenko'nun model sayısı "sekiz açık" değil "altı açık ve iki ticari"; 63'ün ilk
  taslağı 4.288 kelimeydi, üç kırpma turuyla (sayılar korunarak) 3.509'a indi ve dördüncü "Kendini yokla" kutusu
  düz yazıya katlandı; 66'da "14,66'sı" kendi-numarası taramasında yanlış pozitif verdi (sayı 14,66, makale 66
  değil); ileri gönderme taramasının bütün bulguları yüzde/puan/örnek sayısıydı.
- **Terim kararları:** karar #149. "jailbreak" başlıkta korundu (#148); "düşmanca" yeni; "danışmanlık" ve
  "cevaplama oranı" aynı sözcük–başka nesne notlarıyla deftere girdi; "eğri altı alan" ve "kalibrasyon" yeniden
  glosslanmadı.
- **SVG:** 13 yeni şekil. Denetleyici altı taşmayı yakaladı (63-Şekil 1 "3 kat" → "3×"; 63-Şekil 3, 64-Şekil 1
  ve 66-Şekil 1 alt notları kısaltıldı). Denetleyicinin görmediği **beş kusur yalnızca ekran görüntüsünde çıktı**:
  65-Şekil 3'te sol panelin başlığı ve dört metin satırı 250'lik ayırıcıyı aşıp sağ panelin üstüne bindi
  (satırlar ≤ 29 karaktere sarıldı, viewBox 400 → 410); 66-Şekil 2'de 180 birimlik sütunun 30–31 karakterlik
  satırları komşu sütuna taştı (≤ 25 karaktere beş satırda sarıldı, viewBox 420 → 434); 64-Şekil 1'de 118
  birimlik kutuya 20 karakterlik kalın başlık ("geri bildirim modeli") ve 19 karakterlik satır sığmadı (kutu
  150'ye genişletildi, komşu kutu 86'ya daraltıldı, oklar kaydırıldı); 64-Şekil 2'de sağa dayalı iki başlık
  ("model" ↔ "katılımcı + model") 5 birim arayla yapışık göründü (sütun 420 → 402); 65-Şekil 1'de köşegen
  etiketi panel ayırıcısını kesiyordu (etiket köşegenin sol üstüne alındı). **Kurallar:** 180 birimlik sütunda
  13 birimlik satır ≤ 25 karakter (gerçek genişlik ≈ 6,8 birim/karakter, denetleyici 7,15'i yalnızca 720'ye
  karşı ölçer, sütun sınırına karşı ölçmez); panel metni ayırıcı x'ini geçmez; kutu içi kalın başlık ≤ (kutu
  genişliği − 12) / 7 karakter; sağa dayalı komşu başlıklar arasında ≥ 15 birim boşluk; bir şekil düzeltilince
  render kopyasına `cp` ile taşındığı `diff -rq` ile doğrulanır (bu run'da `&&` zinciri kırılınca üç düzeltme
  kopyaya gitmedi ve ilk yeniden çekim eski şekilleri gösterdi).
- **Kelime sayısı (wc -w, frontmatter ve kaynakça dâhil):** 63 5.067, 64 4.541, 65 3.911, 66 4.016; denetleyici
  uyarısı yok. 63 üst banda yakın (27 kaynak); savunma katmanları 68/70'te yeniden açılırsa Constitutional
  Classifiers ve devre kesici bloğu oraya taşınabilir.
- **Render doğrulaması izole kopyada** (`D:\dev\anil-lib-b15-render`, junction + kapısız dev, 3210): build exit 0
  (`/seri/[slug]` 66 yol; 115 sayfa), 67 seri rotası 200 (40,5 sn), dört makale × üç genişlik × üç temada DOM
  ölçümü temiz (badFills ve outOfBox boş, taşma 0, sızıntı yok, figScroll false); ana worktree'de typecheck (0)
  ve 495 test. **Şekil görüntüleri bu run'da tarayıcı panosundan değil Playwright'tan alındı:** panonun
  `screenshot`'ı toplu batch'te "Image omitted", tek çağrıda 5 sn zaman aşımı ya da 1500×600 emülasyonun
  800×323'lük kırpık bir köşesi döndü; `artifacts/b15-research/shots-b15.cjs` (`@playwright/test` Chromium,
  `waitUntil: 'load'` + `main figure svg` bekleme, `#b15o` kaplayıcının 1200 px klonu, light + dark PNG) 13 şekli
  26 PNG olarak `shots/` altına yazdı ve Read aracıyla incelendi. Bu yol panodan hızlı, büyük ve deterministik;
  sonraki run'larda varsayılan olmalı.

## Batch 14 öğrenme notları (yazım tamamlandı)

- **Faz 6 kapandı, Faz 7 açıldı: devir (59) → fatura (60) → hizalama sorunu (61) → güvenlik eğitimi (62).**
  58'in "onay ne zaman, devir ne zaman" sorusu 59'da Sheridan'ın on basamağı, Feng'in beş rolü ve devretmeyi
  öğrenme (Q(s, devret)) ile ödendi; 59 her onayın bir bedeli olduğunu 60'a, 60 "ölçü hedefe dönüşünce" izini
  61'e, 61 yardımseverlik ↔ zararsızlık sınırını 62'ye devretti; 62 ince ayar saldırısı ve ret önekiyle 63'e
  bağlandı. Faz 7'nin kategorisi `safety-and-evaluation` (karar #142); 14. kohort iki kategoriye yayıldı ve
  `reading-list-groups.test.ts` değişmeden 482 test geçti. 20'nin "açık ağırlık" vaadi 62'de kısmen ödendi
  (yirmi sentlik ince ayar); 63, 68 ve 70 taksitleri açık.
- **Araştırma yine tamamen ana oturumda; ultracode açık, workflow/subagent kullanılmadı** (cerebrum
  2026-09-03). 72 aday PDF tek betikle (`artifacts/b14-research/fetch-b14.py`; URL listesi ve arXiv API geri
  düşüşü), DBLP `ee` 72 başlık (`dblp-b14.py`, 12 sn aralık; yavaş ama takılmadı), dergiler için Crossref
  `query.title` (`crossref-b14.py`: Vaccaro Nature HB 8(12), Steyvers NMI 7(2), Parasuraman IEEE TSMC-A
  30(3)), sağlayıcı belgeleri ve bloglar `fetch-html-b14.py` ile. Yeni kanal: **Semantic Scholar
  `openAccessPdf`** eski dergi makalesinin açık kopyasını verdi (Parasuraman 2000, cs.uml.edu aynası,
  `curl -k`). Yayın sürümünün başlığı arXiv'den farklı olan kaynaklar DBLP aramasında yanlış hit verdi
  (RouteLLM "…from Preference Data"; Skalse "Defining and Characterizing Reward Gaming"; IRD ve CIRL) —
  `papers.nips.cc` yıl dizinleri ve ICLR proceedings hash'leriyle doğrulandı. DTIC (Sheridan 1978) 403 —
  kullanılmadı; Wiener 1960 duvar arkası — CIRL girişinden alıntılandı; Vaccaro'nun Nature PDF'i 403 — arXiv
  kopyası okundu, künye Nature.
- **Sayı tuzakları:** Mozannar & Sontag'ın CIFAR-100 kazancı +1,60 puan ve yalnızca 30 ≤ k ≤ 90 aralığında
  (ilk taslak genelleştirmişti). Xiong'un beyaz kutu açığı AUROC 0,52 → 0,61. 40'ın "beşte biri" ile 60'ın
  ln s / ln p formülünün verdiği 0,32 çelişiyordu; formül esas alındı. Illusion'ın "2.100 ↔ 432" çifti ilk
  taslakta bulanıktı, kesinleştirildi. CoCoNot 2024 (2025 değil). 62'de güvensiz sütun ↔ karşıt küme
  ilişkisini kuran cümle tabloyu yanlış okuyordu, yeniden yazıldı. Kendi hesabımızla verilen sayılar (istem
  önbelleği 290.000 ↔ 56.600; geçiş başına bedel 0,64 … 13,94; devir örneği 18,5 / 15 / 9,5 / 17 hata)
  karar #145 gereği gövdede "kendi hesabımız" diye işaretlendi; her makalenin sayı envanteri karar #146'da.
- **Terim kararları:** "devir / devretme" (deferral; başlıkta), "reddederek öğrenme" (rejection learning) ↔
  "reddetme / ret" (refusal) ayrımı iki makale arasında açıkça yazıldı; "hizalama" 61'den itibaren 11'in
  anlamında (karar #143); "belirtim" 49'un protokol belirtimiyle aynı sözcük, başka nesne; kalibrasyon devir
  ölçüsü olarak tek başına yetmez (karar #144); "yardımsever, dürüst, zararsız" açık yazıldı, "HHH" gövdeye
  girmedi. 62'de "62'nin dersi" kendi-numarası taramasıyla yakalandı → "Bu makalenin dersi". Numaralı ileri
  gönderme taraması kaçak bulmadı; 61, 64 koordinatını yeniden andı (yeni koordinat açılmadı).
- **SVG:** 12 yeni şekil; denetleyici döndürülmüş etiketleri (59-Şekil 1) ve 97 karakteri aşan alt notları
  taşma diye yakaladı — döndürme kaldırılıp kısa sözcükler üst üste dizildi, notlar bölündü, viewBox
  yükseklikleri büyütüldü. Denetleyicinin görmediği bir kusur ekran görüntüsünde çıktı: 61-Şekil 3'te
  gösterge (y=18–28, x=200) sütun başlığıyla (y=28, x=200) aynı hizadaydı ve üst üste bindi; gösterge alt
  not bloğunun üstüne taşındı (viewBox 390 → 412). Kural: gösterge ile sütun başlığı aynı y bandını
  paylaşmaz; gösterge ya sağ üstte (x ≥ 500) ya alt not bloğunda. Şekil görüntüsü yardımcısı
  `b14g(i, tema, ölçek)` tek temalı sabit kaplayıcı (1080 px genişlik); iki temayı yan yana koyan `b14f`
  yerine her şekil iki ayrı görüntüyle alındı.
- **Kelime sayısı (wc -w, frontmatter ve kaynakça dâhil):** 59 4.383, 60 4.127, 61 3.964, 62 3.399;
  denetleyici uyarısı yok. 59 üst banda yakın (22 kaynak); devir/otomasyon konusu 111 ya da 115'te yeniden
  açılırsa Sheridan–Parasuraman bloğu oraya taşınabilir.
- **Render doğrulaması izole kopyada** (`D:\dev\anil-lib-b14-render`, junction + kapısız dev, 3210): build
  111 sayfa (exit 0), 63 seri rotası 200 (28,7 sn), dört makale × üç genişlik × üç temada DOM ölçümü temiz
  (badFills ve outOfBox boş, taşma 0, sızıntı yok, figScroll false), 12 şeklin tamamı light/dark ekran
  görüntüsüyle gözle doğrulandı; ana worktree'de typecheck (0) ve 482 test. Ekran görüntüsü tarifi: JS
  kaplayıcı + 2 sn bekleme bir `browser_batch`'te, ardından `screenshot` **iki kez** ayrı çağrılır — ilki
  neredeyse her seferinde 5 sn zaman aşımına düşüyor, ikincisi geliyor; `zoom` bölge kırpmıyor. Yerel SVG
  dosyasına açılmış sekme `navigate` ile başka adrese gitmiyor (yeni sekme açıldı); sekme sınırı dolunca
  dosya sekmeleri kapatıldı.

## Batch 13 öğrenme notları (yazım tamamlandı)

- **Faz 6'nın ikinci yarısı: kod (55) → bellek (56) → ölçüm (57) → güvenlik (58).** 54'ün "kod" devri 55'te
  SWE-bench'in kuruluşuyla ödendi; 55'in "her görev sıfırdan" kapanışı 56'yı, 56'nın "her ölçüm bir cetvel
  seçti" kapanışı 57'yi, 57'nin "kısayolu ajana bir başkası gösterirse" kapanışı 58'i çağırdı; 58 onay ve
  devir sorusuyla 59'a bağlandı. 39'un dört belleği 56'da bilinçli formalizasyonla adlandırıldı (olaysal /
  anlamsal / yordamsal) ve 39'un "kötü bellek belleksizlikten kötü" tezi üçüncü kez, parça parça verilen
  geçmişte ve dört yetenekte ölçüldü. 58'in başlığı entegrasyondan önce Türkçeleştirildi (karar #135).
- **Araştırma yine tamamen ana oturumda; ultracode açık, workflow/subagent kullanılmadı** (cerebrum
  2026-09-03). 72 aday PDF tek betikle (`artifacts/b13-research/fetch-b13.py`, başlık eşleştirmeli;
  yalnızca GenProg SSL'de takıldı, http ile alındı); DBLP `ee` taraması arka planda 72 başlık için koştu
  (`dblp-b13.py`, 12 sn aralık, 500/503 hataları elle yeniden denendi). Yeni künye kanalları: Crossref
  `query.title` (yayın sürümü başlığı: Agentless → PACMSE/FSE 2025; SWE-Bench+ → AIware 2026),
  `proceedings.iclr.cc` 2025/2026 sayfaları (DBLP'de henüz olmayan ICLR 2026 bildirileri),
  `colmweb.org/2025/AcceptedPapers.html` (kök colm.cc'ye yönlendiriyor), PMLR 267 dizin sayfasının
  `<p class="title">` ayrıştırması (ilk tahmin pan25c yanlıştı → pan25g; kural: kimlik tahmin edilmez).
- **Sayı tuzakları:** AgentDojo özetindeki "< %66" ilk sürümden; Tablo 3'te 78,22 — tablo esas alındı.
  SWE-bench'in "74,5 ↔ 30,1 satır" cümlesi Tablo 8 ile uyuşmuyor; tablo (19,6 ↔ 44,1) kullanıldı.
  SWE-Bench+'ın 251 yaması 12,47'nin tamamı değil; oranlar kaynağın verdiği biçimde (32,67 / 31,08)
  aktarıldı, 251/2.294 hesabı yapılmadı. EvalPlus'ın "%13,1" değeri puan değil göreli azalma.
  Ziegler ve ark.'nın MAPS 2022 sürümü yerine CACM 2024 sürümü künyelendi.
- **Terim kararları:** "hata yeniden üretimi" (9'daki replication ayrımı gövdede), "hata yerini bulma"
  (54'ün konumlandırmasıyla çakışmadı), "ara hedef" (8'in kontrol noktası ayrımı), "yetki etiketi"
  (capability), "mesaj deposu" (recall storage; pedagojik "geri çağırma" korundu), "kum havuzu" başlıkta.
  Numaralı ileri gönderme taraması bir kaçağı yakaladı: 58'de "63'te göreceğimiz" → "güvenlik fazında".
- **SVG:** 12 yeni şekil; denetleyici üç taşma yakaladı (ortalanmış kutu içi alt satırlar 210 birimlik kutuya
  sığmadı; gösterge etiketi x=558'den taştı; 100 karakterlik alt not), hepsi kısaltılıp alt metinler
  SVG'ye göre yeniden eşlendi. 56-Şekil 3 ve 58-Şekil 2 (dört/beş gruplu çubuklar) 500 ve 470 birim
  yükseklikte; 800×640 pencerede iki temayla sığmadıkları için tek temada da bakıldı. Şekil görüntüsü
  yardımcısı `b13fig` (koyu/açık token değerlerini `documentElement` sınıfını geçici değiştirerek okur;
  ilk sürüm sayfa zaten koyuyken iki kopyayı da koyu çizdi ve düzeltildi). `browser_batch` içinde
  `zoom`/`screenshot` bu run'da zaman aşımına düştü; JS kaplayıcı ve görüntü ayrı çağrılarda alındı.
- **Kelime sayısı (wc -w, frontmatter ve kaynakça dâhil):** 55 4.348, 56 3.185, 57 3.362, 58 3.644;
  denetleyicinin düzyazı sayımı dördünde de 2.000–3.500 bandında (uyarı yok). 55 kaynakça yükü ağır
  (18 kalem); ileride kod ajanı konusu bölünürse APR klasikleri (Le Goues, Qi) 104'e taşınabilir.
- **Render doğrulaması izole kopyada** (`D:\dev\anil-lib-b13-render`, junction + kapısız dev, 3210):
  build 107 sayfa (exit 0), 59 seri rotası 200 (48,5 sn), dört makale × üç genişlik × üç temada DOM
  ölçümü temiz (badFills ve outOfBox boş, taşma 0, sızıntı yok, figScroll false), 12 şeklin tamamı
  light/dark ekran görüntüsüyle gözle doğrulandı; ana worktree'de typecheck (0) ve 470 test.
- **Bash `cd` kalıcılığı** bu run'da tekrar etmedi (her komut `cd /d/dev/anil-lib;` ile başladı); Python
  Windows yolu `/d/dev/...` tanımadığı için PMLR sayfası `D:\...` ile açıldı.

## Batch 12 öğrenme notları (yazım tamamlandı)

- **Faz 6 açıldı: tanım (51) → tek ajanın karar kutusu (52) → çoklu ajan (53) → ekran (54).** 50'nin
  "bu döngüye alanda ajan deniyor" devri 51'de Wooldridge–Jennings ve Russell–Norvig'le ödendi; 51'in
  boş bıraktığı karar kutusu 52'yi, 52'nin sabit iş bölümü 53'ü, 53'ün "ekran, fare, klavye" kapanışı
  54'ü çağırdı. 54, 48'in "kod" borcunu 55'e devretti. 37'nin çerçevesi 51'de ajan katında bilinçli
  formalizasyonla yeniden kuruldu (Şekil 2'nin üç sütunu); bu, serinin planladığı "bilinçli
  formalizasyon" ilkesinin ilk tam örneği.
- **Araştırma yine tamamen ana oturumda; ultracode açık olmasına rağmen workflow/subagent
  kullanılmadı** (cerebrum 2026-09-03 kaydı: Batch 10'da kullanıcı yasakladı). 63 aday PDF tek betikle
  (`artifacts/b12-research/fetch-b12.py`) indirildi; betik her PDF'in ilk sayfasını beklenen başlıkla
  eşleştirip uyuşmazsa arXiv API'sinde başlık araması yapıyor (Batch 11'in yanlış kimlik tuzağına karşı).
  DBLP doğrulaması iki kez koştu (`dblp-b12.py`, sonra 503'lere karşı yeniden deneyen
  `dblp-b12-retry.py`); ikinci koşu `ee` alanını da kaydediyor ve OpenReview/NeurIPS/PMLR/Anthology
  birincil bağlantılarının kaynağı oldu. Semantic Scholar API çoğu sorguda boş döndü; OpenReview API
  bot doğrulaması istiyor.
- **Yeni künye kanalı:** DBLP `ee` alanı OpenReview kimliklerini doğrudan veriyor; tahminle yazılan
  bir kimlik (Kapoor ve ark.) bu alanla yanlış çıktı ve düzeltildi. Kural: OpenReview kimliği
  **tahmin edilmez**, DBLP `ee` ya da PDF üst bilgisinden alınır.
- **Tablo sütunu tuzakları:** AgentBench Tablo 2'deki "#Avg. Round" tur sınırı değil çözüm için beklenen
  tur sayısı (5–35); tur sınırı ayrı (OS varsayılan 8). MiniWoB (2017) Tablo 1'deki 24,8/34,8 ortalama
  başarı, 17/26 "çözülmüş" yüzdesi — ilk taslakta karıştırıldı, düzeltildi. Huang ve ark.'nın "7
  household scenes"ı yedi oda değil yedi ev sahnesi. CRITIC'in −1,8 puanı LLaMA-2-70B'nin değil
  text-davinci-003'ün. MoA'da toplayıcı ↔ öneren sütunları model başına ters okunabiliyor.
- **Terim kararları:** "ajan" (casus anlamı ayrıldı), "öğe konumlandırma" (grounding; 45'teki kaynak
  sadakatinden ayrı tutuldu), "hata döngüsü", "gerektiğinde ayrıştırma", "öz-yansıma" (39'daki yansıma
  ailesi), "düşüncenin yozlaşması", "erişilebilirlik ağacı". 53'teki bir cümle sözleşmenin 4. bölümüne
  gönderme yapıyordu ("4\. bölümdeki kural") — okur için anlamsız; düz yazıya çevrildi. Kural: gövde
  metni SOZLESME bölümlerine gönderme yapmaz.
- **SVG:** 12 yeni şekil; light+dark ekran görüntüsü için şekil bir `position:fixed` kaplayıcıya iki kez
  klonlanıp ikinci kopyaya koyu tema token'ları inline `style.setProperty` ile verildi — tek ekran
  görüntüsünde iki tema (`b12fig` yardımcısı `localStorage`'da). `zoom` eylemi bölge kırpmayı
  desteklemiyor ama zaman aşımına düşen `screenshot`'ın yerine tam ekran görüntüsü döndürüyor. Denetleyici
  iki kusuru görmedi: 51-Şekil 1'de "cevap" etiketi çevre kutusunun içine biniyordu (y=126, kutu
  100–144; 164'e taşındı) ve 54-Şekil 1'de bir `fill="var(--text-faint"` kapanış parantezi eksikti
  (ET.parse geçer, tarayıcıda dolgu geçersiz olurdu; `grep -c 'var(--[a-z-]*"'` ile yakalandı — bu
  tarama kalıcı kapı olmalı). 520 birim yüksekliğindeki şekil 800×640 pencereye iki temayla sığmadı;
  yardımcı `mode` parametresiyle tek tema gösterir.
- **Kelime sayısı:** 51 3.149, 52 2.566, 53 2.515, 54 2.109 (denetleyici sayımı). 51 üst banda yakın;
  ileride ajan tanımı/döngü/formalizasyon/durma dörtlüsünden biri kısaltılabilir.
- **Bash `cd` kalıcılığı:** bir komuttaki `cd artifacts/...` sonraki bütün çağrılara taşındı ve göreli
  yollar kırıldı; kural: geçici dizin değişikliği yapılmaz, mutlak yol ya da `cd /d/dev/anil-lib;` öneki
  kullanılır. Python Windows'ta `/d/dev/...` yolunu tanımaz; kopyaya dosya `cp` ile taşınır.
- **Render doğrulaması yine izole kopyada** (`D:\dev\anil-lib-b12-render`, junction + kapısız dev,
  3210): build 103 sayfa (exit 0), 55 seri rotası 200 (22 sn), dört makale × üç genişlik × üç temada DOM
  ölçümü temiz (badFills ve outOfBox boş, taşma ve sızıntı yok; `figScroll` bu run'da 375'te de false),
  12 şeklin tamamı light/dark ekran görüntüsüyle gözle doğrulandı.

## Batch 11 öğrenme notları (yazım tamamlandı)

- **Faz 5 kapandı: çağrı (47) → arayüz (48) → protokol ve ekosistem (49) → güven (50).** 46'nın
  "eylem satırı aramaya özel değil" kapısı 47'de token düzeyinde açıldı; 47'nin "araç bir
  soyutlamaydı" cümlesi 48'i, 48'in "hepsi uygulamaya özel" cümlesi 49'u, 49'un "araç bile bir
  yılda bozuluyor" bulgusu 50'yi çağırdı. 50, Faz 6'ya "ajan" sözcüğünü tanımsız bırakarak
  devretti; 48'de "ajan–bilgisayar arayüzü" gloss'landı ama "ajan"ın tanımı açıkça 51'e bırakıldı.
- **Araştırma bu run'da da tamamen ana oturumda yapıldı.** 50 kaynağın PDF'i tek bir Python
  betiğiyle (`artifacts/b11-research/fetch-b11.py`, 3 sn aralık) indirilip `pypdf` ile metne
  çevrildi; DBLP doğrulaması 50 başlık için `dblp.py` ile (11 sn aralık, ~10 dk) arka planda
  koştu. Toplam ~2,5 saatlik araştırma; makale başına altı–on altı kaynak.
- **Yeni künye kanalları.** PMLR PDF'leri `proceedings.mlr.press` yerine
  `raw.githubusercontent.com/mlresearch/v<cilt>/main/assets/<key>/<key>.pdf` aynasından iniyor
  (site HTML döndürdü). COLM kabul listesi `2024.colmweb.org/AcceptedPapers.html` — sertifika
  GitHub'a ait olduğu için `curl -k` gerekiyor. ACM dergileri (CSUR, TOSEM) Crossref'te tam
  künyeyle var; `doi.org` bağlantıları bot'a 403 döner ama okuyucuda açılır. ICLR 2026 bildirileri
  `proceedings.iclr.cc` altında PDF ve özet sayfasıyla var; DBLP henüz indekslememiş olabilir.
  ACL Anthology `.bib` uç noktası sayfa aralığını doğrudan veriyor.
- **Tablo sütunu tuzakları bu run'da da çıktı.** BFCL Tablo 1'in 23 sütunu (AST/Execute/Crowd ×
  4 kategori + ilgisiz/ilgili + çok turlu 4 + ajan 3) başlıktan sayılarak eşlendi; FreshQA Tablo
  1'in ilk iki sütunu "tümü" ve "geçerli öncül tümü"dür (fast 3. sütun); ClashEval Tablo 2'de
  satırlar "seçilen", sütunlar "hangisi doğru"dur — "prior 0,585" belge yanlışken kendi cevabında
  kalma oranıdır. ToolLLM Tablo 4'te DFSDT-Retriever satırı oracle değil getirici kümesidir.
- **Terim kararı: "işlev çağrısı".** "Function calling" için Türkçede yerleşik karşılık yoktu;
  30'daki "işlev" kullanımı ve 46'nın kapanış cümlesi ("model bir işlevi nasıl çağırır") karşılığı
  belirledi; matematiksel "fonksiyon"dan ayrım 47'de ve terim defterinde açıkça yazıldı.
- **SVG gösterge notları 13 birimde x=20'den en çok ~97 karakter alıyor.** On bir yeni şekilden
  altısında alt notlar ilk çizimde taştı ve denetleyici yakaladı; hepsi kısaltıldı. Üç sütunlu
  yatay çubuk deseni (ad, çubuk, değer) bu run'da yedi şekilde kullanıldı; iki panelli şekillerde
  sağ panelin değer sütunu x≈650'de bitmeli (x=664'te 5 karakter sığıyor). Denetleyicinin görmediği üç binme (ok etiketi ↔ kutu, 26 karakterlik etiket ↔ x=180'den başlayan çubuk, alt nota 6 birimlik pay) yalnızca light/dark ekran görüntüsünde çıktı; etiket bitişi (karakter × 7,15) komşu öğenin başlangıcıyla karşılaştırılmalı.
- **Kelime sayısı.** İlk taslaklar 47'de düzyazı ~3.000, 48'de ~2.200, 50'de ~2.500 çıktı; 49
  1.942 ile eşiğin altında kaldı ve resmî kayıt sistemi ile sürüm çizelgesi paragraflarıyla
  (dolgu değil, iki yeni olgu) 2.090'a çıkarıldı.
- **Render doğrulaması yine izole kopyada.** Run boyunca paralel oturum görünmedi (peer listesi
  başlangıçta bir oturum gösterdi, mesaj ulaşmadı); yine de build ve dev sunucusu
  `D:\dev\anil-lib-b11-render` kopyasında (junction + kapısız dev, 3210) çalıştırıldı ve ana
  worktree'nin `.next` dizinine dokunulmadı. Build 99 sayfa, 51 seri rotası 200.

## Batch 10 öğrenme notları (yazım tamamlandı)

- **Faz 5'in gövdesi: dizin (43) → hat (44) → ölçüm (45) → döngü (46).** Batch tek yay olarak
  okunuyor: 42'nin bıraktığı "en yakın k vektörü bul" borcu 43'te ödendi; 29'un "metnin nereden
  kesileceği" borcu 44'te; 44'ün "puan nedir" sorusu 45'te; 45'in "hakem dışarıda" sınırı 46'da.
  47'ye köprü, 46'nın kapanışındaki Toolformer paragrafıdır: arama yalnızca bir araçtır.
- **Araştırma workflow'u bu run'da da kullanılamadı.** Başlatılan 12 agent'lık workflow oturum
  kesilince JSON çıktı üretmeden durdu, ama agent'ların indirip metne çevirdiği ~55 PDF
  (`artifacts/b10-research/pdf/*.txt`) diskte kaldı ve bütün araştırma bunların üzerinden ana
  oturumda `grep`/`sed` ile yapıldı. Kural (Do-Not-Repeat 2026-08-25'in doğrulanması): agent
  çıktısı dosyaya yazdırılır; kesinti sonrası önce disk envanteri çıkarılır.
- **Künye doğrulamanın ucuz yolu Crossref API'sidir.** Dergi ve ACM künyeleri için
  `https://api.crossref.org/works/<doi>` cilt/sayı/sayfa/yıl döndürüyor ve bot engeli yok;
  ACL Anthology sayfa başlığı `curl` ile alınıyor; IEEE Xplore, Springer, ACM DL ve HAL WebFetch'e
  403/challenge dönüyor. DBLP ICLR/NeurIPS/COLM için gerekli kalıyor (11 sn aralık kuralı geçerli).
- **Tablo satırının ne ölçtüğü, sayıdan önce doğrulanır.** Üç yanlış okuma yazım sırasında
  yakalandı: Wang ve ark. Tablo 1'deki "Hybrid 0,429 / 1,45 sn" satırı yalnız-melez değil,
  HyDE'siz tam hattır (öteki modüller en iyi ayarda); MuSiQue DiRe satırındaki 93,0 cevap değil
  destekleyici olgu puanıdır (2Wiki cevap 63,4); ReAct'te "döngü, sonra öz-tutarlılık" 35,1/62,0,
  tersi 34,2/64,6'dır. Kural: tablo başlığını ve ablasyon çerçevesini satırla birlikte oku.
- **Ürün kuantizasyonunun kaynak metni alınamadı.** HAL ve IEEE bot engeli; HAL API dosya adını
  verdi ama indirme de engellendi. Mekanizma aynı yazarların hakemli Johnson ve ark. (2021)
  anlatımından kuruldu; Jégou ve ark. (2011) yalnızca köken atfı için listelendi, sayı alınmadı.
- **SVG gösterge sütunu 13 birimde en fazla ~20 karakter alır.** `check-series-svg.cjs`'in
  tahmini karakter × 7,15; x=560'tan başlayan bir gösterge satırı 20 karakteri, x=590'dan
  başlayan 18'i geçemez. Değer sütunu x=515'te durduğu için gösterge 560'tan önce başlayamaz;
  çözüm değerleri çubukların hemen sağına (x≈424) çekip göstergeyi 500'e almak (44-Şekil 1).
- **`font(-size` gibi tek karakterlik XML hatası denetleyiciden geçiyor.** `check-series-svg.cjs`
  XML ayrıştırmıyor; 45-Şekil 1'deki hata yalnızca `ET.parse` ile yakalandı. Her batch'te XML
  ayrıştırması rutin adım olmalı (Do-Not-Repeat 2026-08-30'un teyidi).
- **Yerel dev sunucusu parola kapısı test parolasını kullanıyor.** `.env.local`'daki hash,
  `playwright.config.ts`'teki `TEST_PASSWORD_HASH` ile aynı; render doğrulaması için kapıyı
  aşmak yerine env değişkenlerini boş dizeyle ezerek (`SITE_PASSWORD_SHA256= AUTH_COOKIE_SECRET=`)
  kapıyı kapatmak tercih edildi — `isGateIntended()` boş dizede false döner, middleware geçirir.
- **Vaat defteri iki koordinat açmadı, hiç koordinat kapatmadı.** Dört makalenin numaralı
  göndermelerinin tamamı ≤46'ya; ileri işaretlerin hepsi numarasız (50 için "ileride", 47 için
  "bir sonraki makale").

## Batch 9 öğrenme notları (yazım tamamlandı)

- **Faz 4 kapandı, Faz 5 açıldı.** 39 ve 40 akıl yürütme yayını bitirdi; 41 ve 42 getirme hattını
  açtı. Batch tek bir yay olarak okunuyor: bilgi zaman içinde nasıl taşınır (39) → adımlar
  çoğalınca ne olur (40) → gereken bilgi ağırlıklarda yoksa nereden gelir (41) → o bilgiyi bulan
  şey nasıl çalışır (42).
- **En verimli kaynak deseni: aynı çalışmanın iki tablosunu yan yana okumak.** 39'un çekirdeği,
  Xu ve ark.'nın Tablo 3 ile Tablo 4'ünü birleştirmekten çıktı — biri "aynı bütçe, üç içerik",
  öbürü "fark nerede ortaya çıkıyor". Tek tablo hiçbirini anlatmıyordu.
- **Kusursuz getirme koşulu (oracle) altın değerinde bir pedagojik araçtır.** LongMemEval'in
  "yalnızca ilgili oturumlar" ile "tam geçmiş" karşılaştırması, belleğin bir okuma değil bulma
  problemi olduğunu tek tabloda kanıtlıyor. Aynı desen Kandpal'ın altın paragraf deneyinde de
  var ve 41'in dönüm noktasını verdi.
- **Biçimsel sonucu doğru okumak, onu abartmamaktan geçiyor.** Dziri ve ark.'nın Önerme 4.2'si
  ilk bakışta "toparlanma kurtarır" gibi okunuyor; çalışmanın kendi uyarısı (tesadüfi toparlanma
  hata oranından çok daha seyrektir) olmadan 40 yanlış bir sonuca varırdı. Tavanın **düşük**
  olması, düzeltmenin dışarıdan gelmesi gerektiğinin kanıtı — makalenin çekirdeği bu oldu.
- **Aynı çalışmanın hakemli sürümü farklı başlık taşıyabiliyor.** METR'in çalışması arXiv'de
  "Measuring AI Ability to Complete Long Tasks", NeurIPS 2025'te "…Long Software Tasks". Karar
  #7'nin ölçütü uygulandı: künye ve sayılar hakemli sürümden alındı, PDF NeurIPS bildiri
  sayfasından indirildi.
- **29'un kapsamı 42'yi yazmadan önce satır satır çıkarılmalıydı.** İlk taslak DPR sayılarını,
  BEIR'in nitel sonucunu, hibrit aramayı ve iki aşamalı sıralamayı tekrar anlatıyordu — hepsi 29'da
  vardı. 42'nin gerçek boşluğu şuydu: 29 "sözcük eşleşmesi" ve "BM25" adlarını kullanıp
  mekanizmayı hiç açmamıştı. Makale o boşluğa kuruldu ve BEIR'den yalnızca 29'un vermediği
  sayısal ayrıntı (alan dışı yüzdeler, Hole@10 analizi) alındı.
- **Diyagramda metin binmesini yalnızca piksel görüntüsü yakalıyor.** `check-series-svg.cjs`
  viewBox taşmasını görüyor, çakışmayı görmüyor. Bu run'da üç şekil (40-Şekil 1, 42-Şekil 1,
  42-Şekil 2) ilk çizimde etiketleri eğrilerin ve çubukların üstüne bindirdi ve ancak ekran
  görüntüsüyle fark edildi. Çözüm deseni: eğri/çubuk alanını daraltıp sağda ayrı bir gösterge
  ya da açıklama sütunu açmak; etiketi çizginin ucuna yapıştırmamak.
- **Yatay çubuk şemasında etiket, çubuk ve değer üç ayrı sütun olmalı.** 42-Şekil 2'nin ilk
  hâlinde etiketler çubukların içine ve değerlerin üstüne taşıyordu. Üç sütunlu düzen (solda ad,
  ortada çubuk, sağda değer) hem light hem dark temada temiz çıkıyor.
- **Vaat defteri iki koordinat kapattı, yeni koordinat açılmadı.** Dört makalenin metin içi
  numaralı göndermelerinin tamamı yayımlanmış makalelere yapıldı; bu, `grep` ile makale başına
  doğrulandı ve `+1` fazının rutin adımı hâline gelmelidir.

## Batch 8 öğrenme notları (yazım tamamlandı)

- **Makale 35:** Faz 4'ün ikinci yarısını açar ve üç ayrı borcu tek bir soruda düğümler (33'ün
  seçim açığı, 34'ün sonuç ödülü, 13'ün "doğrulamak üretmekten kolaydır" işareti). En değerli
  yapısal karar, öz-düzeltmeyi "işe yaramıyor" diye kapatmamak: Madaan'ın olumlu tablosu ile
  Huang'ın olumsuz tablosu **aynı** açıklamayla birleşti — kazanç, hatayı tanımanın ucuz olduğu
  yerde var. Stechly'nin yanlış ret sütunu (grafik boyamada yüzde 95,8) makalenin en çarpıcı
  sayısı; "geri bildirimin zenginliği fark etmiyor, durdurma kararının doğruluğu fark ediyor"
  ablasyonu ise en az bilinen ve en öğretici bulgusu. Cobbe'un dört yüz aday eşiği, 13'teki
  aşırı optimizasyonu doğrulayıcıya taşımak için beklenmedik biçimde temiz bir köprü verdi.
- **Makale 36:** Kazandıran kurgu, öz-tutarlılığı bir "hile" olarak değil bir **muhasebe
  düzeltmesi** olarak sunmak oldu: olasılık zincir üzerinde değil cevap üzerinde toplanmalı.
  Işın aramasının ışın sayısıyla **kötüleşmesi** (23,6 → 10,2) bu tezin en sezgi kıran kanıtı ve
  10\. makaledeki ileri okuma notunu yirmi altı makale sonra ödedi. İkinci yarıdaki dönüş —
  24 oyununda oylamanın yüzde 9'da kalması — makalenin dürüstlüğünü kuruyor: aynı bölümde kurulan
  varsayım (yanlışlar dağılır) aynı makalede çöküyor ve ağaç aramasının gerekçesi oradan doğuyor.
  ToT'nin üretim ↔ değerlendirme ablasyonunun 35'teki "büyük üretici, küçük doğrulayıcı"
  bulgusuyla aynı yöne bakması, iki makaleyi bedavaya birbirine bağladı.
- **Makale 37:** Serinin ilk saf formalizasyon makalesi ve en büyük riski terim yükü. Çözüm,
  çerçeveyi üç sütuna indirgemek oldu: karar dörtlüsü, değer/avantaj, kredi atama. İskontonun
  kararı tersine çevirdiği iki satırlık örnek (0,60 > 0,50 ama 0,48 < 0,50) soyut bir katsayıyı
  33\. makaledeki faturaya bağladı. Asıl pedagojik kazanç dil modelinin eşlemesinde: durum =
  o ana kadarki dizi, eylem = sonraki token, geçiş belirlenimci, ödül terminal. Bu eşleme
  yapıldığı anda 34'teki 32.768 token'lık cevap tek bir skalerle eşleşiyor ve 38'in gerekçesi
  kendiliğinden doğuyor. Çerçevenin dil modeline **yoksul** oturduğunu açıkça yazmak (belirlenimci
  çevre, seyrek ödül, keşifsizlik, atılan değer modeli) makaleyi ders kitabı özetinden ayırdı.
- **Makale 38:** Batch'in en çok kaynak dengeleyen makalesi. Uesato'nun "iki denetim nihai cevapta
  aynı" sonucu ile Lightman'ın "süreç denetimi açık ara önde" sonucu ilk bakışta çelişiyor;
  ProcessBench'in zorluk kırılımı (%3,5 → %51,8) ikisini tek bir cümlede uzlaştırdı ve makalenin
  omurgası oldu. İkinci güçlü kurgu, otomatik adım etiketinin 37'deki değer işlevinin ta kendisi
  olduğunu göstermek; "etiket artık doğruluğu değil, o modelin oradan devam edebilme becerisini
  ölçüyor" cümlesi bu batch'in en az bilinen ayrıntısı. Kapanışta süreç doğrulayıcılarının
  istemle eleştiri yapan genel modellerin gerisinde kalması, alanı kapalı göstermemek için
  bilinçli olarak bırakıldı.
- **Süreç notu:** Batch 8 `BATCH=4+1` assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan
  yürüdü. Yirmi bir birincil kaynak PDF'i pypdf ile metne çevrilerek okundu; bütün tablo değerleri
  özetlerden değil tablolardan alındı. Venue doğrulaması DBLP API'siyle yapıldı ve iki aday kaynak
  (Chen ve ark.'nın bileşik çıkarım sistemleri çalışması ile Swamy ve ark.'nın üretme-doğrulama
  açığı çalışması) yalnızca CoRR'de indekslendiği için **kullanılmadı**. Buna karşılık üç hakemsiz
  kaynak bilinçli olarak kullanıldı ve işaretlendi (karar #106). Kendi kendine eleştirel inceleme
  turunda yakalanan başlıca sorunlar: 36'nın başlığındaki "öz-tutarlılık" teriminin gövdede hiç
  tanımlanmamış olması (terim defterine girmeden başlığa girmişti), 35'te en iyi-N ıraksama
  formülünün kaynağının belirtilmemesi, 35'te iki şekil göndermesinin şeklin çizilen hâliyle
  uyuşmaması, 37'de bir öz-gönderme ("37. makalenin sözlüğüyle") ve politika gradyanı teoremiyle
  taban sonucunun aynı çalışmaya atfedilmesi. Yol haritasında Batch 7'den kalan `[yayında]`
  işaretleri de bu turda tamamlandı.
- **Ortam notu:** Bu run sırasında depoda paralel bir oturum BOUN serisi üzerinde çalışıyordu ve
  `content/series-boun/**` ile `docs/seri-boun/**` altında commit edilmemiş değişiklikleri vardı;
  bunlara hiç dokunulmadı. Dev sunucusu çalışmadığı için build ve render doğrulaması klasik sırayla
  yürütüldü (build → `.next` temizliği → 3210 portunda dev sunucusu → doğrulama → sunucuyu durdur),
  izole kopyaya gerek kalmadı.

## Batch 7 öğrenme notları (yazım tamamlandı)

- **Makale 31:** Faz 4'ü açar ve bunu bir ölçüm makalesi olarak yapar. En değerli yapısal karar,
  kırılganlık bulgularını "model aptal" anlatısına bağlamamak: Dziri'nin alt grafik eşlemesi
  alternatif bir **açıklama** olarak, Lampinen'in içerik etkileri ise karşılaştırma ölçütünü
  düzelten bir düzeltme olarak konuldu. Kapanış listesindeki "karşılaştırma ölçütü insan değil,
  tanımın kendisi olmalı" maddesi bu iki hamlenin özeti. Akıl yürütmeye eğitilmiş modellerin
  aynı düzenekten geçirilmesi 34'e köprüyü bedavaya kurdu.
- **Makale 32:** Serinin en mekanizma ağırlıklı makalelerinden biri ve üç bağımsız kanıt hattını
  üst üste bindiriyor: ölçülen kazanç profili, üç ablasyon, iki ayrı açıklama. Wei'nin nokta
  üretme ablasyonu ile Prystawski'nin ilgisiz ara değişken kontrolünün aynı sonucu iki ayrı
  düzenekten vermesi makalenin en tatmin edici anı. Küçük modellerde ara adımın **zarar**
  vermesi (LaMDA 420M 2,6 → 0,4) sezgiyi kıran asıl satır.
- **Makale 33:** 9\. makalenin en eski açık randevusunu kapatır. Kapsama eğrisinin güç yasasına
  benzemesinin bir yanılsama olduğunu Schaeffer üzerinden kurmak makaleyi "daha çok örnekle"
  reçetesinden kurtardı; Wu'nun doygunluk teoremi ise 34'ün açılış cümlesini hazır etti. Somut
  FLOP hesabı — bir sorunun 4,5×10¹⁴ işlemi ile GPT-3'ün ön eğitiminin karşılaştırması —
  çıkarım hesabının neden eğitimle yarışabildiğini tek satırda gösteriyor.
- **Makale 34:** Hakemli bir birincil kaynağın bulunması bu makaleyi mümkün kıldı; alanın bu
  bölgesindeki kaynakların çoğu hakemsiz. En güçlü kurgu, Yue'nun pass@k eğrilerini 33'te
  kurulan kapsama ölçüsüyle okumak: "yeni yetenek mi, daha iyi nişan mı" sorusu ancak o ölçü
  kurulduktan sonra sorulabiliyordu. GRPO'nun avantaj hesabında dört cevabın da aynı ödülü
  alması durumunda sinyalin sıfırlanması, makalenin en pratik ve en az bilinen ayrıntısı.
- **Süreç notu:** Batch 7 BATCH=4+1 assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan
  yürüdü. On dört birincil kaynak PDF'i pypdf ile metne çevrilerek okundu; bütün tablo değerleri
  özetlerden değil tablolardan alındı. Venue doğrulaması için DBLP API'si kullanıldı ve bir
  çalışmanın (Brown ve ark., "Large Language Monkeys") ICLR 2025'te yayımlandığı yönündeki
  ikincil kaynak iddiası **doğrulanamadı** — DBLP yalnızca CoRR sürümünü indeksliyor. Bu yüzden
  o çalışma yerine aynı olguyu hakemli biçimde ele alan Schaeffer ve ark. (ICML 2025) kullanıldı.
  Kendi kendine eleştirel inceleme turunda yakalanan başlıca sorunlar: 32'de "ipucu" kontrol
  koşulunun yanlış aktarılması, 32'nin somut örneğinde kullanılmayan bir sayının bulunması
  (31'in ilgisiz cümle bulgusuyla çelişen bir pedagojik kaza), 33'te bir olasılığın yanlış
  birimle yazılması ve bir bütçe artışının "yüz katlık" denip aslında on katlık olması, 34'te
  "sinirsel ödül modeli" ifadesinin gloss'suz kalması, ve dört şekil alt metninin çizilen şekille
  birebir uyuşmaması. Gerçek render doğrulamasında iki şekil hatası daha yakalandı ve
  düzeltildi: 31'in birinci şeklinde eksen adı ilk tik etiketinin üstüne biniyordu, 33'ün ikinci
  şeklinde "en iyi" işaretleri eğrilerin üzerinde değil boşlukta duruyordu.
- **Ortam notu:** Bu run sırasında depoda paralel bir oturumun dev sunucusu (port 3100)
  çalışıyordu. Build ile dev sunucusu aynı .next dizinini paylaşamadığı için build ve render
  doğrulaması, depo aynı sürücüde bir kopyaya çıkarılıp node_modules için junction kurularak
  izole bir kopyada yürütüldü; iş bitince önce junction kaldırıldı, sonra kopya silindi. Paralel
  oturumun sunucusuna hiç dokunulmadı.

## Batch 6 öğrenme notları (yazım tamamlandı)

- **Makale 27:** 19\. makalenin "kuantizasyonun mekanizması 27'de" randevusunu kapatır. Ekseni tek bir
  görsel: ızgara. Sekiz ağırlıkla elle yapılan hesap, aykırı değerli ikinci panelle birlikte makalenin
  bütün mekanizmasını iki panelde veriyor — aykırı değer sorunu bir literatür bulgusu olarak değil,
  okuyucunun kendi yaptığı hesabın çöküşü olarak geliyor. En değerli iki hamle sonradan yapıldı:
  18\. makalede geçilmiş olan int4 kapasite sayısının (0,7 bit) tahsil edilmesi ve fazla eğitilmiş
  modellerin daha kırılgan olduğu bulgusunun kapanışa alınması. İkincisi olmasa makale "4 bit iyidir"
  reçetesiyle kapanırdı; onunla birlikte 9\. makaledeki tahsis tartışmasına geri bağlanıyor.
- **Makale 28:** Serinin ikinci saf sistem makalesi. 26'nın 229 işlem/bayt oranı açılışı taşıyor ve
  27'nin kazancının "çipi hızlandırmak" değil "yığına yer açmak" olduğunu söyleyen paragraf üç makaleyi
  tek cümlede birbirine bağlıyor. Orca'nın seçici yığınlama gerekçesi — dikkatin parametresi yoktur —
  26'daki muhasebenin doğrudan sonucu olduğu için bedava bir köprü verdi. Spekülatif üretimde formülün
  öngördüğü 2,57 ile ölçülen 2,6 katın örtüşmesi makalenin en tatmin edici anı; taslak büyüdükçe
  hızlanmanın **düşmesi** ise sezgiyi kıran asıl bulgu. Şekil 1'in ilk hâlinde boşta kalan hücreler
  yalnızca kesik çizgiyle gösterilmişti ve gerçek render'da üç temada da zor seçiliyordu; hücrelere
  "boşta" etiketi eklendi — renk kontrastına bağlı olmayan bir işaretleme.
- **Makale 29:** Kategori kararının tek istisnası ve `agents-and-retrieval` eksenini açan makale.
  Ekseni, ikili kodlayıcının feda ettiği şey: belge vektörü sorgudan önce hesaplanmak zorunda.
  SBERT'in 65 saat → 5 saniye hesabı bu fedanın neden yapıldığını, LIMIT ölçümü ise bedelinin ne
  olduğunu gösteriyor. DPR tablosunun SQuAD satırı ve hibrit sütununun Natural Questions satırı
  bilinçli olarak tabloda bırakıldı: ikisi de "anlamsal arama her zaman kazanır" ve "hibrit her zaman
  kazanır" cümlelerini aynı anda çürütüyor. Eş anlamlı sürüm ölçümü olmasaydı makale sözcük
  eşleşmesinin zaferiyle kapanırdı; onunla birlikte iki ayrı kör nokta olarak kapanıyor. 41\. makalenin
  borcuna girmemek için "modelin bilgisi neden yetmez" tartışması bilinçle dışarıda bırakıldı ve bu,
  metinde açıkça söylendi.
- **Makale 30:** Faz 3'ü kapatır ve Faz 4'ün sorusunu kurar. En güçlü malzeme ikili dizi örneği:
  dilbilgisi kusursuz uygulanırken istemin çiğnenmesi, maskenin neden yerel bir karar olduğunu tek
  örnekte gösteriyor. İkinci katman (token hizasızlığı) 15\. makaleye, üçüncü katman (şemanın alan
  sırası) 22\. makaleye bağlanıyor; üçü birlikte "kısıt kötüdür" demeden kısıtın nerede bedel
  ödettiğini kuruyor. Dördüncü maske kullanımı olduğu için SOZLESME §3'ün karıştırılabilir kavram
  kuralı gereği önceki üçü tek paragrafta sırayla anıldı. İnceleme turunda yakalanan en somut hata
  buradaydı: dilbilgisinin 1 ile başlayan **on altı** diziyi kabul ettiği, bunların sekizinin 1 ile
  bittiği; ilk taslakta ikisi karıştırılmış ve şekil de yanlış etiketlenmişti.
- **Süreç notu:** Batch 6 `BATCH=4+1` assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan
  yürüdü. On dokuz birincil kaynak PDF'i `pypdf` ile metne çevrilerek okundu; bütün tablo değerleri
  özetlerden değil tablolardan alındı ve her künyenin yayın yeri konferans sayfasından ya da ACL
  Anthology'den doğrulandı — AWQ'nun MLSys başlığı arXiv başlığından farklıdır ve karar #7'deki Snell
  emsaline uyularak yayın yerindeki başlık kullanıldı. Kendi kendine eleştirel inceleme turunda
  yakalanan başlıca sorunlar: bir oranın yanlış birimle yazılması (27'de "binde iki" ↔ yüzde 2,2),
  dört bitlik aralığın −8..7 yerine gerekçesiz −7..7 verilmesi, altı terimin gloss'suz bırakılması
  (spekülatif üretim, taslak model, kısıtlı üretim, ayrıştırıcı, şema, getirme), üç şekil alt metninin
  şekille uyuşmaması ve dört makalenin de ilk taslakta 2.000 kelime eşiğinin altında kalması.
  Gerçek render doğrulaması bu kez **piksel ekran görüntüsüyle** de yapılabildi (Batch 3–5'te
  alınamıyordu); on iki şeklin tamamı üç temada gözle görüldü. Ekran görüntüsü yalnızca sayfa
  başındayken çalışıyor; şekilleri görmek için figure düğümleri geçici bir kaplayıcıya klonlandı.
  Dev server'ın iki tuzağı yeniden gözlendi ve `.wolf/buglog.json`'a yazıldı: `pnpm build` ile
  `pnpm dev` aynı `.next` dizinini paylaşınca manifest bozuluyor, ve makale gövdesi değiştikten sonra
  dev server'ın önbelleğe aldığı `catalog.json` bayatlıyor. İkisinin de çaresi `.next`'i silip dev
  server'ı yeniden başlatmaktır.

## Batch 5 öğrenme notları (yazım tamamlandı)

- **Makale 23:** 5\. makalenin "few-shot mekanizması 23'te" randevusunu kapatır — on sekiz makale
  aralıklı, serinin en uzun vadeli borcu. Kurgu "önce sezgiyi yıkan ölçüm, sonra ölçümün sınırı, sonra
  rejim ayrımı" biçiminde. En değerli hamle, Min ve Pan bulgularını çelişki gibi değil **rejim ayrımı**
  gibi sunmak oldu: "etiketler önemsizdir" cümlesi küçük model ve az örnek rejimine ait bir cümle.
  İkinci en değerli şey, mekanizma bölümünde kapanmamış bir tartışmayı kapanmış gibi anlatmamak;
  Shen'in konum bildirisi olmasa makale örtük gradyan inişini fazla ciddiye alırdı.
- **Makale 24:** Üç ayrı ölçümü tek eksende toplar: roller bir gelenek, ayrıcalık bir eğitim ürünü,
  turlar bir hata taşıyıcısı. En riskli yer 22'deki **rol (persona)** ile bu makaledeki **konuşmacı
  rolü** çakışmasıydı; SOZLESME §3'ün karıştırılabilir kavram kuralı gereği ayrım açılış bölümünde
  yapıldı ve terim defterine uyarı olarak yazıldı. Laban ölçümündeki birleştirilmiş satır (tamın yüzde
  95,1'i) makalenin kilidi: onsuz bulgu "uzun sohbet kötüdür" gibi okunurdu, oysa sorun uzunluk değil
  kademeli açılma. Tokenizer'ın özel token'ları üretememesinin bir güvenlik katmanı olduğu gözlemi
  4\. makaleye yirmi makale aralıklı bir geri çağırma sağladı.
- **Makale 25:** 21'in üç sınır kaynağını tek tek ele alır ve her birinin bedelini gösterir. Makalenin
  en güçlü sayısı, kaba enterpolasyonun MMLU'yu 35,7'den 25,9'a — dört şıklı bir sınavda rastgele
  düzeye — düşürmesi. Dikkat çukuru ölçümü (dört satır sonu karakteriyle perplexity'nin 5158,07'den
  5,60'a inmesi) 6\. makaledeki softmax kurulumuna on dokuz makale aralıklı bir geri çağırma verdi.
  StreamingLLM'in kendi sınırını açıkça yazması, "sonsuz akış sonsuz bağlam değildir" bölümünü
  kaynağa dayandırmayı mümkün kıldı.
- **Makale 26:** Serinin ilk saf sistem mühendisliği makalesi. 21'deki 27.500 token'lık hesabın
  önbellekle 5.000'e inmesi, önceki bir makalenin sayısını yeniden kullanan en temiz köprü oldu.
  229 işlem/bayt türetmesi (Pope'un çip özelliklerinden) metinde başka hiçbir kaynakta bulunmayan,
  doğrudan iki yayımlanmış sayıdan çıkan bir sonuç — 38 numaralı kararın yöntemiyle aynı. "Kod çözme"
  (10) ile "decode" (26) çakışması terim defterine uyarıyla yazıldı.
- **Süreç notu:** Batch 5 `BATCH=4+1` assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan
  yürüdü. Yedi birincil kaynak PDF'i (Min, Pan, von Oswald, Wallace, YaRN, StreamingLLM, Pope, vLLM)
  `pypdf` ile metne çevrilerek okundu; tablolardaki sayılar özetlerden değil tablolardan alındı.
  Kendi kendine eleştirel inceleme turunda yakalanan başlıca sorunlar: 22'de kurulmuş bir terimin
  yeniden gloss'lanması (24'te "rol (persona)"), bir kaynağın yanlış nitelenmesi (23'te 5\. makalenin
  GPT-3 kullanımı "ölçek tartışması" diye anılmıştı), şekil alt metniyle şeklin uyuşmaması (25 Şekil 3
  ve 26 Şekil 2, şekiller yeniden tasarlandıktan sonra), değerlendirme kümelerinin adsız bırakılması
  (25'te MMLU ve HellaSwag) ve dört makalenin de ilk taslakta 2.000 kelime eşiğinin altında kalması.
  Gerçek render doğrulamasında ölçümle yakalanan tek kusur, bir şeklin son satırının viewBox alt
  kenarına 2 birim kalması ve harflerin alt uçlarının kırpılmasıydı; yeni şekillerin tamamında alt pay
  en az 12 birime çıkarıldı. Piksel ekran görüntüsü yine alınamadı (tarayıcı panosu görüntülenemiyor);
  gerçek render DOM ölçümüyle doğrulandı.

## Batch 4 öğrenme notları (yazım tamamlandı)

- **Makale 19:** 11\. makalenin "LoRA biçimi 19'da" randevusunu kapatır. Ekseni tek bir ayrım: davranış
  ucuzdur, bilgi pahalıdır. Kurgu bilinçli olarak "önce pahalı yol, sonra ucuz yol, sonra ucuz yolun
  kaybettiği şey" biçiminde. En değerli iki ekleme sonradan yapıldı: 2r/d oranının model büyüdükçe
  küçüldüğü gözlemi ve Ovadia ölçümünde ince ayarın **tam** olduğunun (düşük rank değil) açıkça
  kaydedilmesi — bu kayıt olmadan "Kendini yokla" cevabı yanlış olurdu. Biderman'ın iki veri düzeni
  (talimat ↔ sürekli ön eğitim) makalenin çekirdeği: aynı yöntem bir düzende başa baş, öbüründe geride.
- **Makale 20:** Faz 2'yi kapatır ve 19'un varsayımını sorgular. 8\. makalenin 6ND kuralını önce
  bilinen bir sayıda (GPT-3) sınayıp sonra yeni modele uygulamak, makalenin en güçlü hamlesi oldu —
  cetvelin çalıştığını göstermeden yapılan bir karşılaştırma reklam diline düşerdi. "Açık" sözcüğünün
  14 eksene ayrılması, tek etiketle yargılamayı imkânsız kılıyor. Geri alınamazlık bölümü sonradan
  eklendi ve makaleyi dengeledi: aynı erişim hem uyarlama hem hizalamayı sökme özgürlüğü veriyor.
- **Makale 21:** Faz 3'ü açar ve serinin ekseni eğitimden kullanıma kayar. Açılış cümlesi bilinçli
  olarak şaşırtıcı: model iki cümle arasında bile hiçbir şey hatırlamaz. En riskli yer, 18\. makaledeki
  anahtar-değer **belleği** ile 21'in anahtar-değer **önbelleği** arasındaki isim benzerliğiydi;
  SOZLESME §3'ün karıştırılabilir kavram kuralı gereği ayrım açıkça yapıldı ve terim defterine uyarı
  olarak yazıldı. Karesel tur maliyeti hesabı (10 turda 27.500 token) metinde başka hiçbir kaynakta
  bulunmayan, doğrudan durumsuzluktan türetilen bir sonuç.
- **Makale 22:** Ölçme disiplinini istemlere uygular. Kurgu "önce ölçülen kırılganlık, sonra halk
  kurallarının sınavı, sonra gerçekten işe yarayan şey" biçiminde; amaç alanı itibarsızlaştırmak değil,
  bir iddiayı kural saymadan önce ne gerektiğini göstermek. Kibarlık ölçümü iki ayrı cümleyi
  ayırmayı zorunlu kıldı: kabalık zarar veriyor ≠ kibarlık işe yarıyor. "Peki ne işe yarıyor" bölümü
  sonradan eklendi ve makaleyi tek yönlü olmaktan çıkardı: bütün kaldıraçlar "belirsizliği azaltma"
  başlığında toplanıyor.
- **Süreç notu:** Batch 4 `BATCH=4+1` assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan
  yürüdü. Tokenizer ölçümü (21\. makaledeki 33/16/37/13/35 token) `tiktoken` ile yerelde üretildi.
  Üç PDF (FAccT açıklık çalışması, kibarlık çalıştay bildirisi, CHI istem çalışması) `pypdf` ile
  metne çevrilerek birincil kaynaktan okundu. Kendi kendine eleştirel inceleme turunda yakalanan
  başlıca sorunlar: bir şekil alt metninin şekille uyuşmaması (20, Şekil 2), terim defteri ihlali
  (21'de "şaşkınlık" ↔ perplexity), makale içinde kendi numarasına atıf (22), sistem isteminin bir
  paragrafta "ayrı kanal" öbüründe "kanal değil" denmesi (21) ve dört makalenin de ilk taslakta
  2.000 kelime eşiğinin altında kalması (eksik olan her seferinde gerçek içerikle kapatıldı).
  Piksel ekran görüntüsü yine alınamadı; gerçek render DOM ölçümüyle doğrulandı.

## Batch 3 öğrenme notları (yazım tamamlandı)

- **Makale 15:** Faz 1'in kapanmamış tek borcunu öder ve ekseni tek cümledir: tokenizer nötr bir ön işleme
  adımı değil, modelin dünyayı hangi ızgaradan göreceğine karar veren bir tasarım tercihidir. Üç bedel
  sırayla ölçüldü (harfler, sayılar, diller), sonra ızgaranın kendi boyu bir tahsis kararı olarak kuruldu.
  CUTE'un asıl öğretici bulgusu "modeller kötü" değil, **bilgi var ama kullanılamıyor** ayrımıdır.
  Sayı bölünmesi bölümünde kendi tiktoken ölçümümüz mekanizmayı, hakemsiz çalışma ise bedelini veriyor;
  ikisi birbirini destekliyor. 10\. makalenin kesme kuralları burada beklenmedik bir yerde geri döndü —
  kelime başına atılan zar sayısı dile göre değişir. Köprü → 16: bu makaledeki her cümle bir ölçüme dayandı.
- **Makale 16:** 5\. makalenin randevusunu kapatır. Kurgu bilinçli olarak "önce standart yol, sonra nerede
  kırıldığı" biçimindedir; amaç değerlendirmeyi itibarsızlaştırmak değil okuma disiplini kurmak. En değerli
  iki ekleme sonradan yapıldı: şık okuma protokolünün iki biçimi (üretim ↔ olasılık karşılaştırması) ve
  beş yüz soruluk kümede 0,4 puanın tam olarak iki soru ettiği hesabı. 13\. makalenin Bradley-Terry'si
  arenada geri döndü — aynı matematik, iki farklı iş. Kapanış, sınavın ikili puanlamasını 17'ye devrediyor.
- **Makale 17:** İki katmanlı bir açıklama kurdu ve ikisini karıştırmamaya özen gösterdi: istatistiksel
  taban (kalibre model uydurmak zorundadır) ve teşvik katmanı (sınav tahmini ödüllendirir). Good-Turing
  sezgisi balık örneğiyle kuruldu ve benzetmenin bozulduğu yer, çalışmanın "keyfî olgular" kaydına
  bağlanarak biçimselleştirildi. Puanlama tablosu iki satırlık bir beklenen değer hesabıyla yürüyor ve
  10\. makaledeki sıcaklık tablosuyla aynı biçimde. Azaltma yolları tek liste değil, üç ayrı müdahale
  noktası olarak verildi. Köprü → 18: bilgi ön eğitimde ediniliyorsa nerede duruyor?
- **Makale 18:** 8\. makalenin "gerilim 18 ve 72'de" borcunun 18 ayağını öder. Ekseni 7\. makalenin
  parametre sayımı: bloğun üçte ikisi ileri beslemeli katmandaysa, olgu oradadır. ROME ↔ Hase gerilimi
  tek taraflı bırakılmadı — yerelleştirme doğru, ondan çıkarılan mühendislik reçetesi yanlış. Kapasite
  bölümünde iki rakip sayı (2 bit ↔ 3,6 bit) çelişki değil tanım farkı olarak kuruldu ve 891 katlık
  oran hesabı "model veriyi saklamaz" iddiasını sayıya bağladı. Kapanış sentezi, "model bunu bilmiyor"
  cümlesinin üç ayrı sebebi karıştırdığını gösteriyor. Köprü → 19: modeli yeniden yazmadan uyarlamak.
- **Süreç notu:** Batch 3 `BATCH=4+1` assignment'ıyla, tek oturumda ve yardımcı agent kullanmadan yürüdü.
  Doğrulama sırasında dev server'ın modül önbelleği yeniden gözlendi: `location.reload()` ve viewport
  değişimi sonrası yeni slug'lar 404 döndü, dev server yeniden başlatılınca düzeldi. Tarayıcı panosu
  görüntülenemediği için piksel ekran görüntüsü alınamadı; gerçek render, DOM ölçümüyle doğrulandı
  (üç temada arka plan/metin renkleri, SVG metinlerinin viewBox içinde kalması, mobil/tablet/masaüstünde
  yatay taşma yokluğu, şekil altyazıları, 48 rotanın tamamı 200).

## Batch 2 öğrenme notları (yazım tamamlandı)

- **Makale 11:** Faz 2'nin açılışı ve serinin ilk `intermediate` makalesi. Çekirdek: post-training haritası +
  hizalama vergisi + "bildikleri ön eğitimden, davranışı post-training'den gelir". Makalenin taşıyıcı sayısı
  hesap asimetrisi (yüzde 1,8). 6\. makalenin terim defterindeki hizalama uyarısı burada tahsil edildi —
  ikinci anlam 61'e ertelenmeden, ayrım açıkça yapıldı. Kullanım dağılımı tablosu (üretim yüzde 45,6, kapalı
  alan soru-cevap yüzde 2,6) 13'ün "cevap anahtarı yok" tezinin zeminini kurar. Köprü → 12: mekanizma sorusu.
- **Makale 12:** Çekirdek: kayıp maskesi + talimat verisinin üç kaynağı + kalite/miktar tartışması. Worked
  example 8\. makalenin merdiveninin devamıdır (13 token, 5 hedef, yüzde 38). En öğretici iki bulgu bilinçli
  olarak "başarısızlık" biçiminde verildi: FLAN'ın 8 milyar altındaki modellerde zarar vermesi ve InstructGPT'nin
  birinci epoktan sonra aşırı öğrenmesine rağmen 16 epoka devam etmesi. LIMA ↔ Gudibande gerilimi çözülmeden,
  "biçim ucuz / bilgi pahalı" ayrımıyla kapatıldı. Köprü → 13: SFT "bu şundan kötü" diyemez.
- **Makale 13:** Çekirdek: tercih çifti → ödül modeli + KL tasması + aşırı optimizasyon. Bradley-Terry kaybı
  elle hesaplanır (0,8 farkı → 0,690 olasılık → 0,371 kayıp) ve tablo 10\. makaledeki sıcaklık tablosuyla aynı
  biçimdedir. 3\. makalenin sigmoid'i on makale sonra geri çağrıldı — serinin ilk gerçek uzun aralıklı tekrarı.
  DPO, RLHF'nin yerine geçen bir şey olarak değil, aynı ailenin kısayolu olarak kuruldu; Tajwar ve ark. ile
  tartışmanın "kayıp biçimi değil, verinin kaynağı" olduğu söylendi. Köprü → 14: her aşamada veriye çarptık.
- **Makale 14:** 8\. makalenin iki borcunu birden ödüyor (temizlik hattı + tekilleştirmenin sınırı). Ekseni
  "filtre nötr değildir": C4 engel listesi ölçümü makalenin ahlaki ağırlığını taşır. Tekilleştirmenin ters
  yüzü (küresel dedup kaliteyi **düşürür**) 8\. makaledeki tuhaflığın mekanizmasını açar. Karışım bölümü
  8'in "veri karışımı — ayrıntısı 14'te" borcunu DoReMi ile kapatır. Model çöküşü tartışması tek taraflı
  bırakılmadı: "yerine koymak" ile "yanına eklemek" ayrımı belirleyicidir. Köprü → 15: token'ın kendisi.

## Batch 1 öğrenme notları (yazım tamamlandı)

- **Makale 6:** Açılış problemi 4. makalenin "yüz" örneğinin **aynı üç cümlesi**. Çekirdek: bağlamsal
  temsil + tartım (ağırlıklı ortalama) + sorgu/anahtar/değer. Elle softmax hesabı iki cümle üzerinde
  yürütülür ve aynı token'ın iki farklı çıktı vektörü üretilir. Ana analoji "defterden çekilen satırın
  üzerine yazmak" (4'ün defterine biner). Diyagramlar: sabit vektör darboğazı; dikkat akışı; iki
  bağlamdaki çıktı. Köprü → 7: sıra bilgisi ve tek tartımın yetmezliği **eksik olarak işaretlenir**,
  çözülmez.
- **Makale 7:** Çekirdek: Transformer bloğu + çok başlı dikkat + pozisyon kodlaması/paralellik.
  Artık bağlantı ve katman normalleştirme tek bir ileri okuma notunda, **işlev düzeyinde**. Yığının
  sonundaki logit → softmax → dağılım halkası burada kurulur (5. makalenin hedefine bağlanan yer).
  Köprü → 8: mimari hazır, eksik olan ölçek ve veri.
- **Makale 8:** Ekseni 2. makalenin "döngünün şekli değişmeyecek" sözünün tahsili. Çekirdek: ön
  eğitim + öz-denetimli öğrenme + veri/hesap bütçesi. 6ND kuralı burada kurulur ve "yüzde on
  mertebesinde sapma" kaydıyla 9'a devredilir. Ölçek sezgisi: aynı metni bir insan yaklaşık doksan
  bin yılda okurdu (varsayımları ve Türkçe token uyarısıyla).
- **Makale 9:** Çekirdek: güç yasası + hesap-optimal eğitim + ölçeğin sınırları. Kaplan'ın mutlak
  reçetesi (N = 1,3×10⁹ · C^0,73) elle uygulanır; aynı bütçede Chinchilla ile karşılaştırılır.
  2. makalenin çift iniş randevusu burada ödenir. Kaplan'ın hakemsizliği tezin kanıtı olarak
  metinde söylenir. Köprü → 10: model eğitildi ama tek kelime üretmedi.
- **Makale 10:** Çekirdek: örnekleme vs açgözlü seçim + sıcaklık + kesme aileleri. Bütün sayısal
  örnekler 5. makaledeki dağılımın (0,31 / 0,22 / 0,18 / 0,09 / 0,001) üzerinde yürür; toplamın
  0,801 olduğu ve bunun kapalı bir dünya olduğu açıkça söylenir. Faz 1'i kapatır ve 11. makaleye,
  "elimizdeki şey hâlâ bir metin tamamlayıcı" gerilimiyle bağlanır.

## Batch 0 öğrenme notları (yazım tamamlandı)

- **Makale 1:** Hedef: "öğrenme"nin ne olduğuna dair tek, taşınabilir zihinsel model (ayarlanabilir
  fonksiyon + örneklerden ayar). Diyagramlar: kural-tabanlı vs öğrenen sistem akışı; AI⊃ML⊃DL⊃LLM
  iç içe halkalar. Köprü → 2: "ayar tam olarak nasıl yapılıyor?"
- **Makale 2:** Hedef: kayıp+gradyan inişi sezgisi ve minik sayısal worked example; genelleme.
  Diyagramlar: kayıp yüzeyinde iniş; eğitim/test ayrımı ve aşırı öğrenme eğrisi. Köprü → 3:
  "tek doğru yerine karmaşık örüntüler için daha güçlü fonksiyon gerekir".
- **Makale 3:** Hedef: katmanlı ağın ne hesapladığı; aktivasyonun neden şart olduğu; temsil
  öğrenimi. Diyagramlar: tek nöron anatomisi; katmanlar boyunca temsil dönüşümü; (tarih şeridi).
  Köprü → 4: "peki kelimeler bu ağa nasıl girer?"
- **Makale 4:** Hedef: token + embedding + dağılımsal anlam; vektör uzayında yakınlık. Diyagramlar:
  cümle→token→id→vektör hattı; 2B anlam uzayı haritası. Köprü → 5: "sayılara çevirdik; şimdi ne
  tahmin edeceğiz?"
- **Makale 5:** Hedef: dil modelleme hedefinin kendisi; n-gram'ın duvarı; Bengio'nun köprüsü;
  perplexity. Diyagramlar: sonraki-token dağılımı çubuk grafiği; n-gram seyreklik duvarı vs nöral
  genelleme. Köprü → 6 (Batch 1): "aynı kelime her bağlamda aynı vektör olamaz — dikkat gerekir."
