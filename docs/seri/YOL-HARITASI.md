# "Sıfırdan Yüze: Yapay Zekâ" — Yol Haritası ve Kalıcı Öğrenme Defteri

> Bu dosya serinin 100 makalelik omurgasını, prerequisite grafını, kavram-tekrar defterini ve
> terim defterini tutar. Kurallar: `docs/seri/SOZLESME.md`. Durum takibi: `docs/seri/HANDOFF.md`.
> 6–100 arası başlıklar **taslaktır**; batch hazırlığında pedagojik gerekçeyle güncellenebilir
> (yayımlanmış makaleler asla). UI listesi `content/series/roadmap.json` ile başlık düzeyinde
> senkron tutulur.

Son güncelleme: 2026-08-27 · Yayında: 1–10 (Batch 0 + Batch 1) · Sıradaki batch: 11–15 (Batch 2)

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
6. **Dikkat Mekanizması: Bağlamı Tartmayı Öğrenmek** — statik embedding'in yetmezliği; query/key/value sezgisi. `[yayında]`
7. **Transformer: Modern Dil Modellerinin Mimarisi** — katman yığını, çok başlı dikkat, paralellik. `[yayında]`
8. **Ön Eğitim: İnternet Ölçeğinde Sonraki Token** — veri, hedef, eğitim döngüsü büyük ölçekte. `[yayında]`
9. **Ölçek Yasaları: Neden "Daha Büyük" Çoğu Zaman "Daha İyi"?** — scaling laws, compute-optimal eğitim. `[yayında]`
10. **Metin Üretimi: Örnekleme, Sıcaklık ve Olasılıklar** — decoding stratejileri; determinizm ve çeşitlilik. `[yayında]`

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

**Batch 2 taslağı (11–15).** Bu satırlar Batch 1'in metinde açıkça verdiği sözlerden türetilmiştir:

- 11 ← 8 (temel model: elde edilen şey bir metin tamamlayıcı), 10 (üretim bir çekiliştir; en olası devam bir cevap değil), 5 ("2020'nin GPT-3'ü bir sohbet asistanı değildi"), 1 (ham tahminciyi asistana çeviren ek eğitim aşamaları) — *Batch 2*
- 12 ← 11 (post-training haritasındaki yeri), 2 (aynı döngü: kayıp + gradyan inişi), 8 (öz-denetimli hedefin karşıtı — etiket burada geri geliyor), 3 (geriye yayılım) — *Batch 2*
- 13 ← 12 (SFT'nin bıraktığı yer), 2 (kayıp ↔ ödül simetrisi), 10 (tercih verisi örneklemeyle üretilir), 9 (ölçek/bütçe muhasebesi) — *Batch 2*
- 14 ← 8 (veri hunisi, tekilleştirme, veri karışımı — 8'in açıkça "ayrıntısı 14'te" dediği borç), 9 (veri duvarı, epok tekrarının getirisi), 2 (aşırı öğrenme), 4 (derlem) — *Batch 2*
- 15 ← 4 (BPE, sözlük, Türkçenin token maliyeti), 8 ("bu farkın yeteneklere yansıması 15\. makalenin konusu" borcu), 10 (kesme kuralları token üzerinde çalışır), 7 (embedding tablosu sözlük boyuyla ölçeklenir) — *Batch 2*

## Kavram-tekrar defteri (Batch 0 + Batch 1 kavramları)

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
| Sorgu / anahtar / değer | 6 | 7 (çok başlı dikkat) | 25 (uzun bağlam), 26 (KV cache — K ve V tam olarak bunlar) |
| Softmax | 6 | 7 (logit → dağılım), 10 (sıcaklık softmax'ın şeklini değiştirir) | 30 (kısıtlı üretim), 65 (kalibrasyon) |
| Nedensel maske | 7 | 10 (üretim yönü) | 26 (KV cache neden çalışır) |
| Transformer bloğu / katman yığını | 7 | 8 (ölçeklenen şey bu) | 85 (MoE bloğu değiştirir), 86 (alternatif mimariler) |
| Paralellik ↔ üretimin sıralılığı | 7 | 10 (otoregresif döngü paralelleşmez) | 26, 28 (serving ekonomisinin kökü) |
| Ön eğitim / temel model | 8 | 9 (ölçek yasaları ön eğitim kaybını ölçer), 10 (elimizdeki şey bir metin tamamlayıcı) | 11 (post-training haritası), 96 (uçtan uca sentez) |
| Öz-denetimli öğrenme | 8 | — | 12 (SFT: etiket geri geliyor), 41 (parametrik bilginin sınırı) |
| Hesap bütçesi / FLOP / 6ND | 8 | 9 (bütün tahsis aritmetiği buna dayanır) | 27 (kuantizasyon), 33 (çıkarım-zamanı hesap), 89–90 (donanım, enerji) |
| Veri karışımı / tekilleştirme | 8 | 9 (veri duvarı, epok tekrarı) | 14 (ayrıntı), 18 + 72 (ezber), 93 (sürekli öğrenme) |
| Ölçek yasası / güç yasası | 9 | — | 33 (test-time ölçekleme), 78 (emergence), 87 (damıtma), 98 (açık sorular) |
| Hesap-optimal eğitim | 9 | — | 19 (LoRA ekonomisi), 28 (çıkarım maliyetiyle birleşik tahsis), 96 |
| Aynı eğri, iki cetvel (metrik seçimi) | 9 | — | 16 (değerlendirme), 71–73, 78 (emergence tartışması) |
| Otoregresif üretim döngüsü | 10 | — | 25, 26, 28 (üretimin maliyet yapısı), 32 (CoT aynı döngüde uzar), 40 (uzun ufuk) |
| Sıcaklık / kesme aileleri | 10 | — | 30 (yapılandırılmış çıktı), 36 (self-consistency çekilişe dayanır), 66 (model karakteri) |
| Akıcılık ≠ doğruluk | 10 | — | 17 (halüsinasyon), 45 (kaynak sadakati), 65 (kalibrasyon) |

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
| değer | (value) | 6 | dikkat üçlüsünün rolü; ileride RL "value" ile karıştırılmaz |
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
| veri paralelliği | (data parallelism) | 8 | |
| model paralelliği | (model parallelism) | 8 | |
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

**Biçim kuralları:** Yüzdeler gövde metninde sözcükle yazılır ("yüzde 69"); tablo içinde `%` simgesi
serbesttir. Ondalık ayırıcı virgüldür ("0,31"). Makale numarasına atıf satır başındaysa nokta
kaçırılır (`1\.`) — aksi hâlde Markdown numarayı liste işareti sanıp yutar.

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
