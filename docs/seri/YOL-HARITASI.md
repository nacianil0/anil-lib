# "Sıfırdan Yüze: Yapay Zekâ" — Yol Haritası ve Kalıcı Öğrenme Defteri

> Bu dosya serinin yaşayan omurgasını (şu an 118 başlık, 14 faz), prerequisite grafını,
> yayımlanmış vaat defterini, kavram-tekrar defterini ve terim defterini tutar. Kurallar:
> `docs/seri/SOZLESME.md`. Durum takibi: `docs/seri/HANDOFF.md`. Yayımlanmamış başlıklar
> **taslaktır**; batch hazırlığında pedagojik gerekçeyle güncellenebilir (yayımlanmış makaleler
> ve yayımlanmış numaralı vaatler asla). UI listesi `content/series/roadmap.json` ile başlık
> düzeyinde senkron tutulur.

Son güncelleme: 2026-09-02 · Yayında: 1–42 (Batch 0 + Batch 1 + Batch 2 + Batch 3 + Batch 4 + Batch 5 + Batch 6 + Batch 7 + Batch 8 + Batch 9) · Sıradaki güvenli başlangıç: 43

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
| Ezber ↔ genelleme gerilimi | 8 | 18 ve 72 | 18 ödendi (Batch 3); 72 açık |
| Örnekle öğrenme (in-context learning) | 5, 22 | 23 | ödendi (Batch 5) |
| Sistem istemi, roller ve sohbet biçiminin kurulumu | 21 | 24 | ödendi (Batch 5) |
| Pencereyi eğitim uzunluğunun ötesine esnetme yolları | 21 | 25 | ödendi (Batch 5) |
| Anahtar-değer önbelleğinin maliyet yapısı | 21 | 26 | ödendi (Batch 5) |
| Kuantizasyonun mekanizması ve neyi bozduğu | 19, 20, 26 | 27 | ödendi (Batch 6) |
| Ara adımların gücü (istemi yeniden yazdırarak doğruluğu geri kazanma) | 15, 22 | 32 | ödendi (Batch 7) |
| Çıkarım anında hesap harcama ekseni | 9 | 33 | ödendi (Batch 7) |
| Sohbetler arası kalıcı bellek | 21 | 39 | ödendi (Batch 9) |
| Modelin bilgisinin yetmediği yer ve dış kaynağa bağlanma | 17, 19, 21, 25, 29 | 41 | ödendi (Batch 9) |
| İlkelere dayalı tercih etiketleri ve ölçeklenebilir denetim | 13 | 64 | açık |
| Açık ağırlık yayımlamanın güvenlik tarafı | 20 | 61–70 | açık |
| Açık kaynak tanımının düzenleyici çerçevedeki yeri | 20 | 69 | açık |
| Kirliliğin değerlendirmeye etkisi ve ezberin benchmark'lara yansıması | 8, 16, 18, 31 | 72 | açık |
| Doğrulayıcıların eğitimi ve modelin kendi cevabını kontrol etmesi | 33, 34 | 35 | ödendi (Batch 8) |
| Birden çok yol deneyip aralarında oy verme (öz-tutarlılık, arama) | 33 | 36 | ödendi (Batch 8) |
| Adımların tek tek ödüllendirilmesi (süreç denetimi) | 34 | 38 | ödendi (Batch 8) |
| Modelin içine bakmanın araçları ve "açıklama"nın sınırı | 6, 18 | 74–77 | açık |
| Beliren yetenekler tartışmasının açıklığı | 5, 9 | 78 | açık |
| Uzmanlar karışımı mimarisinin kurulumu | 20 | 85 | açık |
| Karesel maliyeti ödemeyen alternatif mimariler | 7, 15 | 86 | açık |
| Ölçümün disiplini: anlamlı fark, örneklem büyüklüğü, güven aralığı | 16, 22 | 101 | açık |
| İnce ayarın LoRA biçimi (numarasız işaretin karşılanması) | 11, 18 | 19 | ödendi (Batch 4) |
| Bağlam penceresinin sınırı ve anatomisi | 19 | 21 | ödendi (Batch 4) |

**Numarasız (bağlayıcı olmayan) ileri işaretler — Batch 2'de verildi.** Bunlar koordinat değil,
yalnızca "seride ileride" düzeyinde işaretlerdir; yol haritası değişirse yeri değişebilir:
hizalama sorununun kendisi (11 → 61), ince ayarın kendi işine uyarlama biçimi (11 → 19),
doğrulanabilir ödülle eğitim ve model üretimi tercih etiketleri (11 → 34, 64),
yardımseverlik ↔ zararsızlık gerilimi (11, 13 → 62), sohbet biçimi ve roller (12 → 24),
pekiştirmeli öğrenmenin biçimsel çerçevesi (13 → 37), KL ıraksamasının biçimsel kurulumu (13 → 94),
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
43. **Vektör Veritabanları ve İndeksleme** — embedding tabanlı altyapı.
44. **Chunking, Rerank ve RAG Hattının İncelikleri** — uçtan uca RAG mühendisliği.
45. **RAG Değerlendirmesi: Doğruluk ve Kaynak Sadakati** — groundedness ölçümü.
46. **RAG'in Ötesi: Retrieval-Reasoning Sistemleri** — araştıran sistemler.
47. **Araç Kullanımı: Function Calling** — modelin eyleme geçmesi.
48. **Web, Kod ve Dosyalarla Çalışan Modeller** — gerçek araç zincirleri.
49. **MCP ve Araç Ekosistemleri** — standartlaşma.
50. **Bilgi Tazeliği: Güncellik, Kaynak Güveni ve Atıf** — bilgiye güven zinciri.

### Faz 6 — Ajanlar: Araç Kullanan Modeller (51–60)

51. **Ajan Nedir? Kontrol Döngüsü Olarak LLM** — plan-eylem-gözlem döngüsü.
52. **Ajan Mimarileri** — tek ajan desenleri, hata döngüleri.
53. **Çoklu Ajan Sistemleri: İşbirliği ve Orkestrasyon** — dağıtık iş.
54. **Bilgisayar Kullanan Ajanlar** — ekran, tarayıcı, GUI.
55. **Kod Yazan Ajanlar: Yazılım Mühendisliğinde LLM** — coding agent'lar.
56. **Ajan Belleği ve Durum Yönetimi** — 39'un ajan bağlamında geri çağrımı.
57. **Ajan Değerlendirmesi: Başarıyı Ölçmek** — ajan benchmark'ları.
58. **Ajan Güvenliği: Prompt Injection ve Sandbox** — saldırı yüzeyi.
59. **İnsan-Ajan İşbirliği: Denetim ve Devir** — human-in-the-loop.
60. **Ajan Ekonomisi: Maliyet, Gecikme, Güvenilirlik** — üretimde ajanlar.

### Faz 7 — Güvenlik ve Hizalama (61–70)

61. **Hizalama Sorunu: Ne İstediğimizi Söylemek Zor** — alignment kavramı (12–13'ün geri çağrımı).
62. **Güvenlik Eğitimi: Reddetme, Sınırlar ve Dengeler** — yardımseverlik/zararsızlık gerilimi.
63. **Jailbreak ve Kırmızı Takım** — saldırılar ve savunmalar.
64. **Constitutional AI ve Ölçeklenebilir Denetim** — ilkelere dayalı eğitim, scalable oversight.
65. **Belirsizlik ve Kalibrasyon: Model Ne Kadar Emin?** — güven ile doğruluk ilişkisi.
66. **Dalkavukluk ve Model Karakteri** — sycophancy, persona.
67. **Aldatma ve Durum Farkındalığı Tartışmaları** — deception araştırması.
68. **Kötüye Kullanım: Siber, Bio ve Bilgi Operasyonları** — dual-use riskler.
69. **Yönetişim: Politika, Standartlar ve Regülasyon** — kurumsal çerçeve.
70. **Sorumlu Ölçekleme: Frontier Güvenlik Çerçeveleri** — RSP/ASL tarzı çerçeveler.

### Faz 8 — Değerlendirme ve Yorumlanabilirlik (71–80)

71. **Değerlendirme Bilimi: Benchmark'ların Ötesi** — 16'nın ileri düzey geri çağrımı.
72. **Kirlilik ve Ezber: Benchmark'lara Güven Krizi** — contamination; 8'in vaadi (18 ile birlikte).
73. **İnsan Değerlendirmesi ve LLM-as-Judge** — değerlendiren modeller.
74. **Mechanistic Interpretability: Devreleri Okumak** — modelin içine bakmak.
75. **Özellikler ve Süperpozisyon: Modelin İç Dili** — features, SAE'ler.
76. **Aktivasyonlara Müdahale: Steering ve Problar** — nedensel müdahale.
77. **Attribution: Model Neden Böyle Dedi?** — açıklanabilirlik.
78. **Emergence Tartışması: Yetenekler Aniden mi Gelir?** — 9'un eleştirel geri çağrımı.
79. **Robustluk: Dağılım Kayması ve Adversarial Girdiler** — kırılganlık.
80. **Şeffaflık: Model Kartları ve Sistem Kartları** — belgeleme pratiği.

### Faz 9 — Çoklu Modalite ve Verimlilik (81–90)

81. **Görüntüyü Anlamak: Vision-Language Modelleri** — çok modlu girdi.
82. **Ses, Konuşma ve Gerçek Zamanlı Modeller** — sesli etkileşim.
83. **Görüntü ve Video Üretimi: Diffusion'a Giriş** — üretken görsel modeller.
84. **Birleşik Modeller: Her Şey Token mı?** — modaliteleri birleştirme.
85. **Verimli Mimariler: Uzman Karışımları (MoE)** — koşullu hesaplama.
86. **Attention'ın Ötesi: SSM ve Alternatif Mimariler** — 6–7'nin eleştirel geri çağrımı.
87. **Küçük ama Güçlü: Damıtma ve Küçük Modeller** — distillation.
88. **Uçta Yapay Zekâ: Telefonda ve Cihazda LLM** — on-device.
89. **Donanım Ekosistemi: GPU'dan Özel Çiplere** — çip ve altyapı manzarası (mühendislik derinliği Faz 13'te).
90. **Enerji, Maliyet ve Çevresel Ayak İzi** — ölçeğin bedeli.

### Faz 10 — Matematiksel Omurga: Sezgiden İspata (91–97)

Erken makalelerde sezgiyle kurulan kavramların bilinçli formalizasyonu (SOZLESME §3);
araştırmacı formasyonunun giriş kapısı.

91. **Vektörler ve Matrisler: Embedding'in Matematiği** — vektör uzayı, doğrusal dönüşüm; 4/6/7'nin formal yeniden kurulumu.
92. **Matrisin İçini Okumak: Rank, Özdeğer ve SVD** — düşük ranklılık; 19'un (LoRA) ve 74–77'nin matematiksel zemini.
93. **Olasılığın Dili: Dağılımlar, Beklenti ve MLE** — 5/10'daki dağılım sezgisinin formal hâli.
94. **Bilgi Kuramı: Entropi, Çapraz Entropi ve KL** — kayıp ve perplexity'nin formal kimliği (2/5/9'un geri çağrımı).
95. **Optimizasyonun Kuramı: Gradyanın Matematiği** — SGD/Adam; yakınsama sezgisi; 2/8'in formal yeniden kurulumu.
96. **Genelleme Kuramı: Ezber ile Öğrenme Arasında** — bias-variance, çift iniş; 18/72'nin teorik zemini.
97. **Klasik Makine Öğrenmesi Turu: LLM'den Önce ve Yanında** — ağaçlar, SVM, kNN, kümeleme; baseline kültürünün temeli.

### Faz 11 — Araştırma Pratiği: Kanıtla Düşünmek (98–102)

98. **Paper Nasıl Okunur: İddia, Kanıt ve Hakemlik** — yapı, iddia-kanıt eşleşmesi, hakem sürecinin anlamı.
99. **Araştırma Sorusu ve Deney Tasarımı: Hipotez, Baseline, Ablation** — deneyin anatomisi.
100. **Yüzüncü Adım: Sezgiden Bilime — Haritanın Sentezi** — ilk 99 adımın planlı büyük geri çağrımı; okuyucunun kendi haritası.
101. **Ölçümün Disiplini: İstatistiksel Test ve Benchmark Bilimi** — 16/71–73'ün formal geri çağrımı; belirsizlik aralıkları.
102. **Tekrarlanabilirlik: Reproducibility, Negatif Sonuç ve Açık Bilim** — 9'daki replikasyon temasının pratiğe dökülmesi.

### Faz 12 — Temelden Kurmak: Modeli Elle İnşa Etmek (103–105)

103. **Mikro-GPT: Bir Transformer'ı Elle Kurmak** — 6/7'nin bütün parçalarının gerçek küçük sayılarla uçtan uca kurulumu.
104. **Kendi Eğitim Koşun: Tokenizer, Veri ve Döngü** — 8/14/15'in küçük ölçekte uygulaması.
105. **Kendi Asistanın: Küçük Ölçekte SFT ve DPO** — 11–13'ün küçük ölçekte uygulaması.

### Faz 13 — Eğitim Sistemleri Mühendisliği (106–109)

106. **GPU Zihinsel Modeli: Hesap, Bellek, Bant Genişliği** — roofline sezgisi; 26–28'in eğitim tarafındaki karşılığı.
107. **Dağıtık Eğitim: Paralellik Stratejileri** — 8'de adı konan veri/model paralelliğinin tam kurulumu; TP/PP/ZeRO.
108. **Performans Mühendisliği: Attention'ı Hızlandırmak** — bellek erişimi, kernel füzyonu, karışık duyarlık.
109. **Koşunun Güvenilirliği: Checkpoint, Spike ve Gözlem** — üretim eğitiminin operasyon gerçeği (8'deki kontrol noktasının derinleşmesi).

### Faz 14 — Sınır ve Sentez (110–118)

110. **Dünya Modelleri: Metnin Ötesinde Anlamak** — world models.
111. **Robotik ve Somutlaşmış Yapay Zekâ** — embodiment.
112. **Sürekli Öğrenme ve Kişiselleştirme** — model nasıl güncel kalır; 39/56'nın ürün düzeyinde geri çağrımı.
113. **Bilimde Yapay Zekâ: Keşif Aracı Olarak LLM** — AI for science.
114. **Vaka İncelemesi: Bir Frontier Model Nasıl Yapılır?** — uçtan uca sentez (8–13 + 106–109'un geri çağrımı).
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
