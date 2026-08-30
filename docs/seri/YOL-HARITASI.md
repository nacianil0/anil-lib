# "Sıfırdan Yüze: Yapay Zekâ" — Yol Haritası ve Kalıcı Öğrenme Defteri

> Bu dosya serinin yaşayan omurgasını (şu an 118 başlık, 14 faz), prerequisite grafını,
> yayımlanmış vaat defterini, kavram-tekrar defterini ve terim defterini tutar. Kurallar:
> `docs/seri/SOZLESME.md`. Durum takibi: `docs/seri/HANDOFF.md`. Yayımlanmamış başlıklar
> **taslaktır**; batch hazırlığında pedagojik gerekçeyle güncellenebilir (yayımlanmış makaleler
> ve yayımlanmış numaralı vaatler asla). UI listesi `content/series/roadmap.json` ile başlık
> düzeyinde senkron tutulur.

Son güncelleme: 2026-08-30 · Yayında: 1–26 (Batch 0 + Batch 1 + Batch 2 + Batch 3 + Batch 4 + Batch 5) · Sıradaki güvenli başlangıç: 27

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

Yayımlanmış 1–26, metin içinde şu numaralara açık söz verdi. Bu koordinatlar **değiştirilemez**;
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
| Kuantizasyonun mekanizması ve neyi bozduğu | 19, 20, 26 | 27 | açık |
| Ara adımların gücü (istemi yeniden yazdırarak doğruluğu geri kazanma) | 15, 22 | 32 | açık |
| Çıkarım anında hesap harcama ekseni | 9 | 33 | açık |
| Sohbetler arası kalıcı bellek | 21 | 39 | açık |
| Modelin bilgisinin yetmediği yer ve dış kaynağa bağlanma | 17, 19, 21, 25 | 41 | açık |
| İlkelere dayalı tercih etiketleri ve ölçeklenebilir denetim | 13 | 64 | açık |
| Açık ağırlık yayımlamanın güvenlik tarafı | 20 | 61–70 | açık |
| Açık kaynak tanımının düzenleyici çerçevedeki yeri | 20 | 69 | açık |
| Kirliliğin değerlendirmeye etkisi ve ezberin benchmark'lara yansıması | 8, 16, 18 | 72 | açık |
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
27. **Kuantizasyon: Modeli Küçültme Sanatı** — hassasiyet/performans dengesi.
28. **Hız ve Maliyet: Serving, Batching, Spekülatif Decoding** — üretim sistemleri.
29. **Embedding'lerin Dönüşü: Anlamsal Arama** — embedding'ler ürün bileşeni olarak (4'ün geri çağrımı).
30. **Yapılandırılmış Çıktı: JSON, Kod ve Kısıtlı Üretim** — üretimi biçimle sınırlamak.

### Faz 4 — Akıl Yürütme: Reasoning ve Test-Time Compute (31–40)

31. **Akıl Yürütme Nedir? LLM'lerde Reasoning Tartışması** — kavramın kendisi ve ölçümü.
32. **Zincirleme Düşünce: Chain-of-Thought** — ara adımların gücü.
33. **Test-Time Compute: Düşünme Süresi Satın Almak** — inference'ta ölçekleme.
34. **Reasoning Modelleri: Doğrulanabilir Ödülle Eğitim** — reasoning-eğitimli modeller; matematik ve kodun test alanı rolü.
35. **Doğrulama: Modelin Cevabını Kontrol Etmek** — verifier'lar, self-check.
36. **Arama ve Planlama: Self-Consistency ve Ağaçlar** — birden çok yol deneme.
37. **Pekiştirmeli Öğrenmenin Temelleri: MDP, Politika, Ödül** — 13 (RLHF) ve 34'ün (RLVR) biçimsel zemini; "değer" teriminin dikkat üçlüsündeki değerden ayrışması.
38. **Süreç Denetimi: Adım Adım Ödüllendirme** — outcome vs process supervision.
39. **Bellek: Sohbet İçinde ve Sohbetler Arasında** — bağlam, özetleme, kalıcı bellek.
40. **Uzun Ufuk: Çok Adımlı Görevlerde Tutarlılık** — long-horizon problemi.

### Faz 5 — Bilgiyle Bağlamak: Retrieval ve Araçlar (41–50)

41. **Modelin Bilgisi Neden Yetmez? RAG'e Giriş** — parametrik bilginin sınırı (17–18'in geri çağrımı).
42. **Retrieval: Aramanın Modern Hali** — sparse/dense arama.
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

**Batch 6 taslağı (27'den devam).** Yayımlanmış borçlardan türetilmiştir; batch hazırlığında güncellenir:

- 27 ← 26 (darboğaz bellek: ağırlık taşımak ve önbellek taşımak), 19 ve 20 ("kuantizasyonun mekanizması 27'de" borcu), 2 (parametre = sayı), 3 (aktivasyon), 16 (kaybın nerede ölçüleceği)
- 28 ← 26 (ön dolum ↔ üretim ayrımı; yığın büyüklüğü ve bellek bant genişliği), 27 (kuantize model servis edilir), 10 (üretim kuralları), 21 (pencere ve önbellek)
- 29 ← 4 (embedding), 6 (bağlamsal temsil), 23 (örneklerin seçimi bir arama işidir), 41 (getirme hattının bileşeni; sıra kararı batch hazırlığında)
- 30 ← 22 (belirsizliği azaltmak: biçim kısıtı), 24 (sistem isteminde çıktı biçimi kuralı), 10 (üretimi kısıtlamak kod çözme katmanında olur)

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
