# "Sıfırdan Yüze: Yapay Zekâ" — Yol Haritası ve Kalıcı Öğrenme Defteri

> Bu dosya serinin 100 makalelik omurgasını, prerequisite grafını, kavram-tekrar defterini ve
> terim defterini tutar. Kurallar: `docs/seri/SOZLESME.md`. Durum takibi: `docs/seri/HANDOFF.md`.
> 6–100 arası başlıklar **taslaktır**; batch hazırlığında pedagojik gerekçeyle güncellenebilir
> (yayımlanmış makaleler asla). UI listesi `content/series/roadmap.json` ile başlık düzeyinde
> senkron tutulur.

Son güncelleme: 2026-08-25 · Yayında: 1–5 (Batch 0) · Sıradaki batch: 6–10 (Batch 1)

## Serinin tezi

Okuyucu sıfırdan başlar ve 100 adımda LLM çağının tamamını —öğrenmenin matematiksel sezgisinden
frontier güvenlik tartışmalarına— tek bir kesintisiz öğrenme zinciriyle kat eder. Her makale
önceki kavramların üzerine biner; kritik kavramlar unutulmuş olabileceği varsayılarak ileride
kısa yeniden kurulumlarla geri çağrılır.

## Fazlar ve 100 başlık

### Faz 1 — Sıfırdan Modele: Öğrenmenin Temelleri (1–10)

1. **Tahmin Makinesi: Yapay Zekâya İlk Bakış** — kural yazmak vs veriden öğrenmek; model kavramı; ML=tahmin çerçevesi. `[yayında]`
2. **Veriden Öğrenmek: Model, Parametre ve Kayıp** — parametre, kayıp, gradyan inişi, genelleme. `[yayında]`
3. **Sinir Ağları: Katmanların İçinde Ne Oluyor?** — nöron, aktivasyon, derinlik, temsil öğrenimi, backprop. `[yayında]`
4. **Dili Sayılara Çevirmek: Token ve Embedding** — tokenizasyon (BPE), dağılımsal anlambilim, vektör uzayı. `[yayında]`
5. **Sonraki Kelimeyi Tahmin Etmek: Dil Modelinin Doğuşu** — dil modelleme hedefi, n-gram→nöral DM, perplexity. `[yayında]`
6. **Dikkat Mekanizması: Bağlamı Tartmayı Öğrenmek** — statik embedding'in yetmezliği; query/key/value sezgisi.
7. **Transformer: Modern Dil Modellerinin Mimarisi** — katman yığını, çok başlı dikkat, paralellik.
8. **Ön Eğitim: İnternet Ölçeğinde Sonraki Token** — veri, hedef, eğitim döngüsü büyük ölçekte.
9. **Ölçek Yasaları: Neden "Daha Büyük" Çoğu Zaman "Daha İyi"?** — scaling laws, compute-optimal eğitim.
10. **Metin Üretimi: Örnekleme, Sıcaklık ve Olasılıklar** — decoding stratejileri; determinizm ve çeşitlilik.

### Faz 2 — Modeli Biçimlendirmek: Eğitimden Asistana (11–20)

11. **Ham Modelden Asistana: Post-Training Haritası** — base model vs asistan; post-training aşamaları.
12. **Talimatla Eğitim: Supervised Fine-Tuning** — talimat verisi, davranış şekillendirme.
13. **İnsan Tercihlerinden Öğrenmek: RLHF ve Ötesi** — tercih verisi, ödül modeli, DPO ailesi.
14. **Eğitim Verisi: Toplama, Temizlik, Karışım ve Tekrar** — verinin kalitesi ve etkisi.
15. **Tokenizer'ın Gücü ve Tuzağı** — tokenizasyonun yeteneklere etkisi; Türkçe gibi eklemeli diller.
16. **Değerlendirme 101: Benchmark'lar Ne Ölçer, Ne Ölçemez?** — ölçme sorunu ilk kez ciddi biçimde.
17. **Halüsinasyon: Model Neden ve Ne Zaman Uydurur?** — olasılıksal üretimin doğal sonucu; azaltma yolları.
18. **Bilgi Parametrelerde Nasıl Durur? Model Hafızası** — ezber vs genelleme; bilgi düzenleme.
19. **Fine-Tuning ve LoRA: Modeli Kendi İşine Uyarlamak** — verimli adaptasyon.
20. **Açık Ağırlıklar ve Model Ekosistemi** — açık/kapalı modeller, lisanslar, ekosistem.

### Faz 3 — Modelle Konuşmak: Inference, Prompt ve Bağlam (21–30)

21. **Bağlam Penceresi: Prompt'un Anatomisi** — bağlam neyi kapsar; pencere sınırının anlamı.
22. **Prompt Mühendisliği: Kanıta Dayalı Bir Bakış** — ne işe yarar, neden, ne zaman yaramaz.
23. **In-Context Learning: Örnekle Öğrenme** — few-shot; ağırlıklar değişmeden "öğrenme".
24. **Sistem Prompt'ları, Roller ve Sohbet Formatı** — sohbetin perde arkası.
25. **Uzun Bağlam: Pencereyi Büyütmenin Bedeli** — uzun bağlam teknikleri ve sınırları.
26. **KV Cache ve Inference Ekonomisi** — üretimin maliyet yapısı.
27. **Kuantizasyon: Modeli Küçültme Sanatı** — hassasiyet/performans dengesi.
28. **Hız ve Maliyet: Serving, Batching, Spekülatif Decoding** — üretim sistemleri.
29. **Embedding'lerin Dönüşü: Anlamsal Arama** — embedding'ler ürün bileşeni olarak (4'ün geri çağrımı).
30. **Yapılandırılmış Çıktı: JSON, Kod ve Kısıtlı Üretim** — üretimi biçimle sınırlamak.

### Faz 4 — Akıl Yürütme: Reasoning ve Test-Time Compute (31–40)

31. **Akıl Yürütme Nedir? LLM'lerde Reasoning Tartışması** — kavramın kendisi ve ölçümü.
32. **Zincirleme Düşünce: Chain-of-Thought** — ara adımların gücü.
33. **Test-Time Compute: Düşünme Süresi Satın Almak** — inference'ta ölçekleme.
34. **Reasoning Modelleri: Yeni Nesil** — reasoning-eğitimli modeller.
35. **Doğrulama: Modelin Cevabını Kontrol Etmek** — verifier'lar, self-check.
36. **Arama ve Planlama: Self-Consistency ve Ağaçlar** — birden çok yol deneme.
37. **Matematik ve Kod: Reasoning'in Test Alanları** — neden bu iki alan?
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
72. **Kirlilik ve Ezber: Benchmark'lara Güven Krizi** — contamination.
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
89. **Donanım: GPU'dan Özel Çiplere** — hesaplama altyapısı.
90. **Enerji, Maliyet ve Çevresel Ayak İzi** — ölçeğin bedeli.

### Faz 10 — Sınır ve Sentez (91–100)

91. **Dünya Modelleri: Metnin Ötesinde Anlamak** — world models.
92. **Robotik ve Somutlaşmış Yapay Zekâ** — embodiment.
93. **Sürekli Öğrenme: Model Nasıl Güncel Kalır?** — continual learning.
94. **Kişiselleştirme ve Uzun Süreli Bellek** — 39/56'nın ürün düzeyinde geri çağrımı.
95. **Bilimde Yapay Zekâ: Keşif Aracı Olarak LLM** — AI for science.
96. **Vaka İncelemesi: Bir Frontier Model Nasıl Yapılır?** — uçtan uca sentez (8–13'ün geri çağrımı).
97. **Vaka İncelemesi: Bir LLM Ürünü Nasıl Kurulur?** — mühendislik sentezi (41–60'ın geri çağrımı).
98. **Açık Sorular: Alanın Bilmedikleri** — dürüst envanter.
99. **AGI Tartışması: Tanımlar, Testler, Zaman Çizelgeleri** — kavramsal temizlik.
100. **Yüzüncü Adım: Haritayı Yeniden Çizmek** — serinin sentezi; okuyucunun kendi haritası.

## Prerequisite grafı — Batch 0 + Batch 1

Gösterim: `makale ← dayandıkları`.

- 1 ← (yok; giriş noktası)
- 2 ← 1 (model=fonksiyon; tahmin çerçevesi)
- 3 ← 2 (parametre, kayıp, gradyan inişi)
- 4 ← 1 (temsil fikri), 3 (öğrenilen ağırlıklar → embedding de öğrenilir)
- 5 ← 2 (kayıp/eğitim), 4 (token, embedding)
- 6 ← 4 (statik embedding sınırı), 5 (bağlam olasılığı) — *Batch 1*
- 7 ← 3 (katmanlar), 6 (dikkat) — *Batch 1*
- 8 ← 5 (dil modelleme hedefi), 7 (mimari) — *Batch 1*
- 9 ← 2 (kayıp eğrisi), 8 (ön eğitim) — *Batch 1*
- 10 ← 5 (olasılık dağılımı) — *Batch 1*

## Kavram-tekrar defteri (Batch 0 kavramları)

Her satır: kavram → ilk kurulduğu makale → Batch 0 içinde **gerçekleşen** geri çağrımlar →
ileride **planlanan** geri çağrımlar (her biri kısa yeniden kurulumla).

Kanıt notu (SOZLESME §3): bir sonraki makaledeki hatırlatma köprü işlevi görür; kalıcılığı
sağlayan asıl tekrar 10+ makale sonraki bilinçli geri çağrımlardır (Cepeda ve ark. 2008).
Aşağıdaki "planlanan" sütunu bu uzun aralıklı tekrarları tutar.

| Kavram | İlk | Batch 0'da gerçekleşen | Planlanan (uzun aralıklı) |
|---|---|---|---|
| Kural yazmak vs veriden öğrenmek | 1 | 2 (giriş köprüsü: "yol ayrımı") | 8 (ön eğitimde "kural yok, veri var"), 22 (prompt kural mı?), 51 (ajan döngüsünde kurallar geri döner) |
| Model = ayarlanabilir fonksiyon | 1 | 2 (parametrelerle somutlaştı), 3 (doğrunun duvarı) | 7 (dev fonksiyon olarak Transformer), 18 (bilgi fonksiyonun içinde) |
| Tahmin = görülmemiş girdiye çıktı | 1 | 5 (dil modelinde aynı tanım) | 16 (değerlendirme neyi ölçer), 31 (reasoning tahmin midir) |
| Parametre / ağırlık | 2 | 3 ("ağırlık ve sapma = 2. makaledeki parametreler"), 4 (embedding satırları da parametredir) | 8 (milyarlarca parametre), 19 (LoRA: az parametre değişir), 27 (kuantizasyon) |
| Kayıp fonksiyonu | 2 | 3 (gradyanın kaynağı), 4 (embedding'i kim yazıyor), 5 (sonraki-token kaybı = perplexity) | 9 (ölçek yasası eğrileri kayıpla çizilir), 13 (ödül ≈ ters kayıp), 38 (süreç ödülü) |
| Gradyan inişi | 2 | 3 (backprop ile birleşti), 4 (defteri eğitim yazar), 5 (dil modeli aynı döngü) | 8 (dev ölçekte aynı döngü), 12–13 (fine-tuning aynı mekanizma) |
| Öğrenme döngüsü şeması (Şekil 1/2) | 2 | 5 ("2. makaledeki döngünün aynısı") | 8 (ön eğitim aynı döngü — şekli yeniden çağır) |
| Genelleme / aşırı öğrenme | 2 | 3 (AlexNet'te dropout'a selam) | 8 (veri tekrarı), 16 (benchmark ezberi), 72 (contamination), 18 (ezber vs genelleme) |
| İndirgenemez hata | 2 | — | 16 (tavan neden var), 65 (belirsizlik türleri) |
| Nöron, katman, aktivasyon | 3 | 4 (ağın kapısı) | 7 (Transformer blokları), 74–76 (interpretability aynı katmanlara bakar) |
| Temsil (representation) | 3 | 4 (embedding = temsil, açık atıfla) | 29 (anlamsal arama), 75 (features) |
| Token | 4 | 5 (dil modelinin birimi) | 10 (token token üretim), 15 (tokenizer derinlemesine), 21 (bağlam token sayar), 26 (maliyet token başına) |
| Embedding | 4 | 5 (Bengio köprüsü: embedding'in tarihsel kökeni) | 6 (statik→bağlamsal), 29 (arama), 43 (vektör DB) |
| Dağılımsal hipotez | 4 | 5 (bağlamdan tahmin aynı fikir) | 8 (ölçekte anlamın örtük öğrenimi) |
| Statik vektörün duvarı ("yüz") | 4 | 5 (kapanış köprüsü, aynı örnekle) | **6 (açılış problemi — aynı örnekle başlanacak)** |
| Dil modeli = sonraki-token dağılımı | 5 | — | 6–8 (mimari bu hedefe hizmet eder), 10 (dağılımdan örnekleme), 17 (halüsinasyonun kökü), 23 (ICL) |
| Perplexity | 5 | — | 9 (ölçek yasası metriği), 16 (değerlendirme metriği olarak sınırı) |

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

**Biçim kuralları:** Yüzdeler gövde metninde sözcükle yazılır ("yüzde 69"); tablo içinde `%` simgesi
serbesttir. Ondalık ayırıcı virgüldür ("0,31"). Makale numarasına atıf satır başındaysa nokta
kaçırılır (`1\.`) — aksi hâlde Markdown numarayı liste işareti sanıp yutar.

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
