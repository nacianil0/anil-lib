# Claude Code Book Production Handoff

**Handoff durumu:** İki bağımsız adversarial review ve hedefli re-review sonrasında hazır.  
**Repository:** `C:\dev\anil-lib`  
**GitHub:** `https://github.com/nacianil0/anil-lib`  
**Kanıt kesim tarihi:** 2026-07-16  
**Hedef çalışma:** Türkçe, 100 gerçek sayfayı açık farkla aşan, zero-to-hero teknik AI kitabını üretmek ve mevcut reader uygulamasına güvenle entegre etmek.

Bu dosya Claude Code Opus için çalıştırılabilir üretim sözleşmesidir. Buradaki kesin kararları yeniden tartışma. Codebase’den çıkarılabilen konular için kullanıcıya soru sorma. Yalnız gerçek ürün tercihi olmadan ilerlenemeyen bir nokta çıkarsa `DECISION_REQUIRED` kaydı aç; bunun dışındaki belirsizlikleri araştırma, test ve bağımsız review ile çöz.

---

## 1. Project Mission

**Misyon:** **Tahminden Sisteme: Dil Modellerinden Ajanlara Modern Yapay Zekânın İç Mantığı** başlıklı Türkçe kitabı üret. Kitap, modern yapay zekâ kabiliyetini tek bir model özelliği veya “sonraki token tahmini” sloganıyla değil, birbirine bağlı bir sistem zinciri olarak açıklasın:

`veri ve eğitim hedefi → temsil → Transformer bilgi akışı → ölçek ve post-training → çıkarım politikası → bağlam/bellek/durum → retrieval ve kanıt → ajan eylemi → belirsizlik/değerlendirme → mekanistik kanıt → multimodalite/çıkarım ekonomisi/dünya modelleri`

Kitap mevcut 18 makalenin yeniden paketlenmiş hâli olmayacak. Makaleler ham araştırma, açıklama parçaları ve doğrulanacak iddialardır. Nihai kitap yeni önkoşul bölümleri, yeniden kurulmuş pedagojik sıra, güncel birincil kaynaklar, tek yazar sesi ve bölümden bölüme izlenebilir bir zihinsel model taşıyacak.

Görev tamamlandığında aşağıdakilerin tümü doğru olmalıdır:

1. Prolog + 18 bölüm + ön söz/sözlük/kaynakça/ekler yayımlanabilir Türkçe metin olarak mevcuttur.
2. Toplam yayımlanabilir hacim 80.000 kelimelik sert kalite tabanının üstündedir; planlanan hedef 93.000–97.000 kelimedir.
3. Her güçlü iddia claim-level kaynak kaydına bağlıdır; 2026’ya duyarlı iddialar yeniden doğrulanmıştır.
4. Her bölüm atlanamaz durum makinesinden ve bağımsız teknik, pedagojik ve continuity review’larından geçmiştir.
5. Kitap sidebar’da “Kitaplar” koleksiyonu altında “Makaleler”den yapısal olarak ayrıdır; etiketler ayrım mekanizması değildir.
6. Mevcut 18 makalenin ID, sıra, slug, path ve `/read/[slug]` URL sözleşmeleri değişmemiştir.
7. Desktop, mobile, progress, completion, saved place, highlight, dashboard ve Neon sync chapter kimliklerini doğru işler.
8. Type-check, lint, unit/component testleri, E2E ve production build geçer.

## 2. Repository Memory

Her yeni çalışma oturumu önce `.wolf/OPENWOLF.md`, `.wolf/anatomy.md` ve `.wolf/cerebrum.md` talimatlarını uygular; kod üretmeden önce `CLAUDE.md`, `.wolf/buglog.json` ve bu handoff okunur. Repository’de bulunmayan dosya, route, özellik veya script varmış gibi davranılmaz.

### 2.1 Kanıtlanmış mevcut durum

- `content/catalog.json` schema version 2’dir ve yalnız `articles` dizisi taşır.
- Article kimlikleri `article_<uuid>`, yolları `content/articles/**`, global sıraları kesintisiz `readingOrder`, batch’leri append-only `classificationBatch` sözleşmesine bağlıdır.
- `prompts/01-classify-and-order-articles.md` yalnız article ingestion sözleşmesidir; book chapter’ları bu pipeline’a sokulmaz.
- Article route’u `src/app/read/[slug]/page.tsx`; static params, metadata ve adjacency article catalog’dan gelir.
- `getAdjacent()`, `ArticleNavigation`, `ReadingList` ve dashboard bugün article odaklıdır; birçok link `/read/${slug}` biçiminde hard-code edilir.
- Desktop `ReaderSidebar` ve mobile `MobileReadingList` aynı reading-list yüzeyine yaklaşır; ancak grouping yalnız `classificationBatch + category` bilir.
- Tag eklemek sidebar’da ayrı bir kitap grubu oluşturmaz.
- `/` bugün `ReaderDashboard` render eder; düz article listesi ve article URL’leri varsayar.
- Kullanıcıya açık search route’u/UI yoktur. `relatedArticleIds` doğrulanır fakat render edilmez.
- Kalıcı reader data `anil-lib:reader-data:v2` anahtarıyla local-first çalışır ve Neon sync kullanır.
- Reader-data şeması içerik ID değerini generic string olarak taşıyabilir; buna karşın `src/lib/reader-data/server/sync-service.ts` içindeki geçerli ID kümesi yalnız article catalog’dan gelir. Chapter sync için birleşik registry zorunludur.
- Markdown `unified` hattıyla render edilir; raw HTML kabul edilmez. Book chapter’ları aynı güvenli processor’ı kullanmalıdır.

### 2.2 Korunacak baseline

İlk uygulama değişikliğinden önce mevcut 18 article için `(articleId, readingOrder, slug, path, href)` karakterizasyon testi yaz ve geçir. Baseline dosyasını test fixture’ı olarak sabitle; üretim sırasında yeniden üretip “güncel” diye kabul etme. `content/catalog.json` ve `content/articles/**` kitap üretimi için immutable girdidir.

### 2.3 Kalıcı üretim belleği

Publishable içerikten ayrı şu dizini oluştur:

```text
book-production/tahminden-sisteme/
├── book-brief.md
├── chapter-ledger.md
├── decisions.md
├── terminology.md
├── source-register.md
├── corpus-map.md
├── continuity-map.md
├── open-questions.md
├── session-handoff.md
├── reviews/
└── checkpoints/
```

Loader ve app build bu authoring dosyalarını okumaz. Yeni oturumun giriş noktası `session-handoff.md`’dir; bütün brief’i baştan yorumlamak yasaktır.

## 3. Existing Corpus Assessment

Corpus yaklaşık 65.521 whitespace-delimited kelimedir. Yedi dosyada toplam 415 geçersiz araştırma arayüzü citation marker’ı vardır. Bu hacim kitap uzunluğu kanıtı değildir; tekrar, çelişki ve stale iddialar nedeniyle kitap sıfırdan kurgulanacaktır.

### 3.1 Sayısal hüküm

| Hüküm | Adet | Makaleler |
|---|---:|---|
| `REUSE_WITH_LIGHT_EDIT` | 3 | 3, 4, 14 |
| `REWRITE_SUBSTANTIALLY` | 11 | 1, 2, 6, 7, 9, 10, 11, 12, 13, 15, 17 |
| `RESEARCH_SOURCE_ONLY` | 4 | 5, 8, 16, 18 |
| `EXCLUDE_FROM_BOOK` | 1 | 18; yalnız tarih damgalı iddia-okuma kutusuna araştırma girdisi olabilir |
| `MERGE_INTO_CHAPTER` | 11 | 1, 2, 3, 5, 7, 8, 9, 13, 15, 16, 17 |
| `REQUIRES_FACT_CHECK` | 18 | Tümü |

### 3.2 Corpus genel riskleri

1. Model, training objective, inference policy, agent harness ve tam sistem kabiliyeti aynı analiz düzeyiymiş gibi anlatılabiliyor.
2. CoT, iç düşüncenin sadık kaydı; verifier ise tek bir mekanizma gibi sunulabiliyor.
3. Context, persistent memory ve runtime state karıştırılıyor.
4. Retrieval quality, answer correctness, groundedness ve citation correctness tek ölçüm gibi kullanılabiliyor.
5. Token probability, semantic uncertainty ve verbalized confidence ayrımı zayıf.
6. Multimodal üretim grounding; video üretimi planlamaya yarayan world model kanıtı gibi genellenebiliyor.
7. Vendor skorları ve model sürümleri kalıcı teoriye sızıyor.
8. Tokenization, loss, gradient, eval split, compute/memory, IR, calibration, causal intervention ve MDP önkoşulları eksik.
9. Her article’da tekrar eden “yanlış anlamalar + zihinsel model + araştırma sonrası netleşenler + grill” şablonu kitabın sesini mekanikleştiriyor.
10. Geçici `turn...` marker’larını yalnız silmek, ilişkili iddiayı doğrulanmış yapmaz; kaynak zinciri baştan kurulmalıdır.

## 4. Selected Book Concept

### 4.1 Seçim

**Tahminden Sisteme: Dil Modellerinden Ajanlara Modern Yapay Zekânın İç Mantığı**

Ana tez: Modern AI kabiliyeti, tek başına bir training objective’ın veya model ölçeğinin sonucu değildir. Kabiliyet; temsil, mimari, veri, post-training, inference-time search/verification, bellek, retrieval, araçlar, değerlendirme ve eylem döngülerinin katmanlı sözleşmelerinden doğar. Her katman bir öncekinin sınırını çözer; hiçbir katman tek başına güvenilir zekâ garantisi vermez.

### 4.2 Reddedilen alternatifler

- **Bir Dil Modelinin Anatomisi:** Teknik olarak sıkıydı fakat ajanları, multimodaliteyi, sistem maliyetini ve world model tartışmasını organik omurga yerine ek bölümlere itiyordu.
- **Kabiliyet Nasıl İnşa Edilir?:** Özgün bir soru mimarisi sunuyordu fakat beginner okur için tokenization → objective → representation → architecture önkoşul sırasını bozma ve tekrar üretme riski yüksekti.

Seçilen konsept, anatomik netliği ilk iki kısımda; kabiliyet-merkezli soruları bölüm açılışlarında kullanır. Makro düzen değişmez biçimde nedensel sistem zinciridir.

## 5. Audience and Learning Outcomes

### 5.1 Başlangıç seviyesi

Okur AI/ML bilmiyor. Lise düzeyinde cebir, grafik okuma ve temel olasılığı takip edebiliyor. Kod, kalkülüs, lineer cebir dersi, istatistik dersi veya yazılım mühendisliği önkoşul değildir. Kitap kod, pseudocode, notebook, araç tutorial’ı veya sektör senaryosu içermez.

### 5.2 Bitiş seviyesi

Kitap sonunda okur:

1. Tokenization, vektör, matris, logit, softmax, loss, gradient ve sampling’i sezgisel ve küçük sayısal örneklerle açıklayabilir.
2. Training objective, learned representation, observable behavior ve deployed system capability’yi ayırabilir.
3. Transformer içindeki embedding → Q/K/V attention → residual stream → MLP → logits bilgi akışını izleyebilir.
4. Scale, data quality, post-training ve test-time compute’un farklı etkilerini tartabilir.
5. Reasoning’i aday üretme, arama, doğrulama ve durdurma politikaları üzerinden okuyabilir.
6. Context, memory, state, retrieval ve grounding’i birbirinden ayırabilir.
7. Ajanı goal/observation/state/action/feedback/stop içeren yetki sınırları belirli bir kontrol döngüsü olarak analiz edebilir.
8. Calibration, abstention, hallucination ve evaluation sonuçlarını metrik/harness/kontaminasyon koşullarıyla okuyabilir.
9. Probe, patching, SAE ve circuit iddialarının correlation/causality/coverage sınırlarını ayırabilir.
10. Multimodal grounding, inference economy ve world model iddialarını hype’tan ayırabilir.
11. Model card, system card, benchmark ve vendor teknik raporunu kanıt statüsüyle eleştirebilir.
12. Bütün zincirde bir hatanın nereden geldiğini ve hangi katmanda test edilmesi gerektiğini gösterebilir.

## 6. Scope and Out-of-Scope

### 6.1 Kapsam

- Türkçe prolog + 18 bölüm, beş pedagojik kısım.
- Ön söz, kullanım rehberi, notasyon rehberi, sözlük, kaynakça ve kısa ekler.
- Kavramsal ve teknik açıklama; gerekli yerde küçük aritmetik örnekler, formüller ve diyagramlar.
- 2026 kanıt kesim tarihine göre kaynak araştırması ve publish öncesi freshness turu.
- Book production memory, bağımsız review kayıtları ve continuation protokolü.
- Ayrı book content contract, book route, sidebar/dashboard/progress/sync entegrasyonu.

### 6.2 Kapsam dışı

- Kod alıştırmaları, pseudocode, API tutorial’ları, prompt engineering kitabı veya araç kullanım kılavuzu.
- Gerçek iş/şirket/sektör senaryoları, kişiselleştirilmiş kariyer tavsiyesi ve uydurma vaka anlatıları.
- Var olmayan search UI veya related-content yüzeyini bu sürümde icat etmek.
- Mevcut article ingestion contract’ını kitap ingestion sistemine dönüştürmek.
- İkinci kitabı yazmak; mimari yalnız eklenmesini mümkün kılar.
- Mevcut 18 article’ı düzeltmek; kitap için gereken doğrulamalar yeni chapter metninde yapılır.
- Model karşılaştırma kataloğu veya sürekli güncellenmesi gereken leaderboard üretmek.

## 7. Book Architecture

### 7.1 Beş kısım

| Kısım | Seviye | Bölümler | İşlev |
|---|---|---|---|
| I — Temel Döngü | beginner → foundational | Prolog, 1–3 | Dilin sayıya çevrilmesini, objective’ı ve temsilin doğuşunu kurar. |
| II — Mimari ve Eğitim | foundational → intermediate | 4–7 | Transformer bilgi akışını, derin temsil, veri/ölçek ve post-training’i bağlar. |
| III — Çıkarım, Bellek ve Kanıt | intermediate → advanced | 8–11 | Trained modelden task-solving system’e geçişi kurar. |
| IV — Güvenilirlik ve Anlama | advanced | 12–14 | Belirsizlik, evaluation ve mekanistik kanıtla kabiliyet iddialarını sınar. |
| V — Sınırlar ve Sentez | advanced → synthesis | 15–18 | Multimodalite, deployment ekonomisi, world models ve tam zincir sentezini kurar. |

### 7.2 Bağımlılık sözleşmesi

Ana sıra: `Prolog → 1 → 2 → 3 → 4 → 5/6 → 7 → 8`; `4 → 9 → 10 → 11`; `7 → 12 → 13`; `5 → 14`; `3/4/10 → 15`; `1/4/6 → 16`; `11/15 → 17`; bütün yollar `18`’de birleşir.

Bir outline’da kullanılan her kritik terim ya aynı bölümün ilk üçte birlik kısmında tanımlanmalı ya da daha önceki bir bölümün `DRAFTED` veya daha ileri durumunda bulunmalıdır. Sadece ileride açıklanacak bir terime dayanmak yasaktır. Kısa ileri referans ancak terimi kullanmadan “bu sınırı daha sonra yeniden ele alacağız” biçiminde olabilir.

### 7.3 Hacim bütçesi

| Bileşen | Planlanan kelime |
|---|---:|
| Prolog | 1.800 |
| Bölüm 1–18 ana metin | yaklaşık 85.000 |
| Ön söz + kitabı kullanma rehberi | 1.200–1.800 |
| Sözlük | 2.500–3.500 |
| Notasyon/kaynak okuma ekleri | 1.500–2.500 |
| Açıklamalı kaynakça notları | 1.500–2.000 |
| **Planlanan toplam** | **93.000–97.000** |
| **Sert kalite tabanı** | **80.000; dolgu ile değil konu ihtiyacıyla** |

280–360 yayımlanabilir kelime/sayfa aralığıyla planlanan metin yaklaşık 258–346 gerçek sayfadır. Diyagramlar sayfa sayısını artırabilir fakat kelime hedefini düşürmek için kullanılmaz. Hacim tek başına kabul değildir; Paragraph Value Gate’i geçmeyen metin silinir.

Ön söz ve kitabı kullanma rehberi, Prolog reader entry’sinin ilk iki `##` bölümü olarak aynı Markdown dosyasında yaşar. Sözlük, notasyon/kaynak okuma eki ve açıklamalı kaynakça, Chapter 18 reader entry’sinin ana sentez kapanışından sonra ayrı `##` bölümler olarak yaşar. Böylece kitap tam materyali taşır fakat progress-bearing entry sayısı Prolog + 18 chapter olarak sabit kalır; supplementary metinler için ikinci bir kimlik/route sınıfı açılmaz. Word validator bu bölümleri ayrı heading sınırlarına göre raporlar.

## 8. Chapter Contracts

Her chapter sözleşmesi değişmez üretim girdisidir. Outline bu sözleşmeyi ayrıntılandırabilir fakat ana tez, önkoşul, işlev veya kabul kriterini sessizce değiştiremez.

### Prolog — Beş Birikim, Bir Mucize Değil

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | Prolog / `00` |
| Başlık | Beş Birikim, Bir Mucize Değil |
| Seviye | beginner |
| Önkoşullar | Yok |
| Ana tez | 2022–2026 görünümü ani bir mucize değil; compute, data, representation learning, scalable architecture ve human feedback çizgilerinin birikimidir. |
| Okuyucunun kazanımı | Tek “kırılma anı” anlatısı yerine beş birikim hattını ve kitabın sistem zincirini adlandırır. |
| Kritik kavramlar | Birikimli ilerleme, model, sistem, training, inference; yalnız sezgisel tanım. |
| Yanlış anlaşılmalar | “AI ChatGPT ile başladı”; “tek keşif her şeyi açıkladı.” |
| Alt başlıklar | Ani görünen değişim; beş birikim; modelden sisteme; kitabın okuma sözleşmesi. |
| Mevcut corpus kaynakları | Makale 1’in ana tezi; metin aynen alınmaz. |
| Yeni araştırma ihtiyacı | Tarihsel öncelik ve tarihler; backprop/LSTM/Word2Vec/Transformer attribution doğrulaması. |
| Kelime hedefi | 1.800; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Beş birikim hattının tek sayfalık zaman/bağımlılık diyagramı; formül yok. |
| Önceki bölümle bağlantı | Yok. |
| Sonraki bölüme köprü | “Bu sistemin işlediği en küçük nesneleri—tokenları ve vektörleri—kurmadan zinciri izleyemeyiz.” |
| Fact-check riskleri | İlk/tek mucit iddiaları, kapalı model parametre tahminleri, stale vendor kronolojisi. |
| Kabul kriterleri | Açıklanmamış teknik terim yok; hype yok; sonraki 18 bölümün sorusu net. |

### Bölüm 1 — Dil Nasıl Sayıya Dönüşür? Tokenlar, Vektörler ve Benzerlik

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 1 |
| Seviye | beginner → foundational |
| Önkoşullar | Lise cebiri ve grafik okuma |
| Ana tez | Model metni doğrudan işlemez; token dizilerini sayısal vektörlere çevirir ve benzerlik/dönüşüm işlemleri bu temsil üzerinde çalışır. |
| Okuyucunun kazanımı | Token/byte/kelimeyi ayırır; vocabulary ve segmentasyonu açıklar; vektör/matris/nokta çarpımı/cosine’i küçük sayılarla hesaplar; train/validation/test ile parameter/token/FLOP/latency/throughput birimlerini ayırır. |
| Kritik kavramlar | Tokenization, vocabulary, byte/subword, vector, matrix, dimension, dot product, cosine similarity, dataset split, parameter, token, FLOP, latency, throughput. |
| Yanlış anlaşılmalar | Token=kelime; vector yalnız koordinat listesi; cosine=anlam doğruluğu; parameter count=zekâ. |
| Alt başlıklar | Metinden tokena; vocabulary/segmentasyon; vektör ve boyut; matris dönüşümü sezgisi; dot product/cosine; train/validation/test; compute ölçü birimleri. |
| Mevcut corpus kaynakları | Yok; corpus’taki en büyük prerequisite açığıdır. |
| Yeni araştırma ihtiyacı | Bengio 2003, Sennrich 2016, SentencePiece 2018, seçili lineer cebir/ML textbook bölümleri; tokenizer-free 2024 güncellemesi yalnız kutu. |
| Kelime hedefi | 4.200; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Tokenization pipeline, 2B dot-product/cosine örneği, matrix-as-transformation görseli, train/val/test şeması. |
| Önceki bölümle bağlantı | Prologdaki birikimlerin ortak ölçüm dilini kurar. |
| Sonraki bölüme köprü | “Artık modelin neyle hesap yaptığını biliyoruz; sırada bu vektörlerden olasılık üretip hatadan öğrenmesi var.” |
| Fact-check riskleri | Tokenizer karşılaştırması, byte/subword genellemeleri, cosine’in semantik yorumu, FLOP/parameter birimleri. |
| Kabul kriterleri | Probability/loss/gradient bu chapter’a sıkıştırılmamış; her geometrik işlem küçük sayısal örnekli; kod yok. |

### Bölüm 2 — Olasılıktan Öğrenmeye: Bir Dil Modeli Neyi Optimize Eder?

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 2 |
| Seviye | foundational |
| Önkoşullar | Bölüm 1: token, vector, dot product, dataset split |
| Ana tez | Model, vektörlerden conditional probability distribution üretir ve next-token loss ile öğrenir; bu objective temsil, davranış ve tam sistem kabiliyetiyle özdeş değildir. |
| Okuyucunun kazanımı | Conditional probability, logit, softmax, cross-entropy, perplexity, sampling ve gradient descent’i küçük sayılarla yorumlar; autoregressive factorization’ı okur; teacher forcing/decoding’i ve objective → representation → behavior → system ayrımını uygular. |
| Kritik kavramlar | Conditional probability, logit, softmax, distribution, cross-entropy, perplexity, gradient, sampling, autoregression, teacher forcing, decoding, distribution-distance/KL intuition, objective/behavior distinction. |
| Yanlış anlaşılmalar | Probability=epistemic confidence; loss=accuracy; gradient calculus ezberi gerektirir; “next-token prediction zekânın tamamıdır”; “loss düşerse her görev güvenilir olur.” |
| Alt başlıklar | Logit’ten probability’ye; softmax numerical example; cross-entropy/perplexity; hatadan gradient sezgisiyle öğrenme; dizinin olasılığı; training vs decoding; iki dağılım arasındaki uzaklık sezgisi; dört analiz düzeyi. |
| Mevcut corpus kaynakları | Makale 2 ana tezi; Makale 1 next-token framing; ikisi `REWRITE_SUBSTANTIALLY`. |
| Yeni araştırma ihtiyacı | Shannon 1948, Goodfellow vd. loss/optimization bölümleri, foundational autoregressive LM; latent reasoning örnekleri yalnız kapsamı açık ve fact-checked. |
| Kelime hedefi | 5.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Softmax bar chart, cross-entropy numerical example, gradient tepe sezgisi, factorization zinciri, training vs decoding, temperature/top-p. Kalkülüs yok. |
| Önceki bölümle bağlantı | Bölüm 1’in token/vector araçlarından probability distribution ve learning signal kurar. |
| Sonraki bölüme köprü | “Objective doğrudan anlam üretmez; veriyi çözmek için işe yarayan temsilleri şekillendirir.” |
| Fact-check riskleri | Log tabanı, loss averaging, tokenizerlar arası perplexity, backprop attribution, Coconut/latent reasoning ve objective’dan nedensel kabiliyet çıkarımı. |
| Kabul kriterleri | Her probability/loss/gradient fikri numerical example’lı; KL yalnız “iki distribution arası yönlü uzaklık/ceza” sezgisiyle hazırlanmış; dört analiz düzeyi ayrılmış; probability kalibrasyon sanılmamış. |

### Bölüm 3 — Anlamın Temeli: Vektörler, Embedding ve Geometrik Yakınlık

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 3 |
| Seviye | foundational |
| Önkoşullar | Bölüm 1 vektör/cosine; Bölüm 2 objective |
| Ana tez | Embedding anlamın kendisi değil, görev ve veri tarafından şekillenen işlevsel bir temsildir. |
| Okuyucunun kazanımı | Distributional hypothesis’ı açıklar; static/contextual embedding’i ayırır; cosine similarity ve probe sonuçlarını temkinli yorumlar; positive/negative pair sezgisiyle comparison-based representation learning’i tanır. |
| Kritik kavramlar | Distributional hypothesis, embedding space, static/contextual representation, similarity, positive/negative pair, contrastive-objective intuition, linear probe, decodability. |
| Yanlış anlaşılmalar | “Yakın vektörler aynı anlama gelir”; “cosine anlayışı ölçer”; “probe bulduysa model kullanır.” |
| Alt başlıklar | Dağılımsal sezgi; Word2Vec/GloVe; positive/negative pair ile karşılaştırmalı öğrenme sezgisi; contextual temsil; geometri ne söyler; okunabilirlik ve nedensellik sınırı. |
| Mevcut corpus kaynakları | Makale 3 ilk yarı `REUSE_WITH_LIGHT_EDIT`; ileri kısımlar Bölüm 5/14’e bölünür. |
| Yeni araştırma ihtiyacı | Word2Vec, GloVe, ELMo, BERT, Hewitt–Liang 2019; Platonic Representation yalnız `CONTESTED`. |
| Kelime hedefi | 4.300; tolerans ±%10 |
| Diyagram/formül ihtiyacı | 2B embedding haritası; cosine örneği; static/contextual aynı kelime karşılaştırması. |
| Önceki bölümle bağlantı | Objective’ın hangi ara temsilleri şekillendirdiğini gösterir. |
| Sonraki bölüme köprü | “Bu vektörler Transformer’a girer; şimdi bilginin katman içinde nasıl taşındığını izleyeceğiz.” |
| Fact-check riskleri | Word2Vec tarihi, lineer temsil hipotezinin kapsamı, manifold ve convergence genellemeleri. |
| Kabul kriterleri | Residual stream/MLP ayrıntısı kullanılmamış; similarity ile semantic truth ayrılmış. |

### Bölüm 4 — Transformer’ı Bilgi Akışı Olarak Okumak

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 4 |
| Seviye | foundational → intermediate |
| Önkoşullar | Bölüm 1 matrix/softmax; Bölüm 3 embedding |
| Ana tez | Transformer tek bir attention işlemi değil; residual stream üzerinde attention, MLP, normalization ve positional information’ın koordineli bilgi dönüşümüdür. |
| Okuyucunun kazanımı | Bir tokenı embedding’den logits’e izler; Q/K/V, causal mask, multi-head attention, residual addition, MLP ve layer norm rollerini ayırır. |
| Kritik kavramlar | Q/K/V, attention score, causal mask, head, residual stream, MLP, layer norm, position, prefill/decode, KV cache. |
| Yanlış anlaşılmalar | “Attention bütün Transformer’dır”; “MLP yalnız nonlinearity ekler”; “FlashAttention yeni attention mimarisidir”; “permutation-invariant.” |
| Alt başlıklar | Blok haritası; Q/K/V; mask ve heads; residual/normalization; MLP; output logits; modern varyantların sınıflandırılması. |
| Mevcut corpus kaynakları | Makale 4 ana omurga `REUSE_WITH_LIGHT_EDIT`; formüller ve terminology fact-check edilir. |
| Yeni araştırma ihtiyacı | Vaswani 2017, LayerNorm, RoPE, FlashAttention, GQA; SSM/MoE/MLA yalnız sınır kutuları. |
| Kelime hedefi | 6.200; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Tam blok, Q/K/V boyutları, 3-token numerical attention, causal mask matrix, residual stream. |
| Önceki bölümle bağlantı | Embedding’lerin hangi mekanizmada dönüştürüldüğünü gösterir. |
| Sonraki bölüme köprü | “Bilginin nasıl aktığını gördük; katmanlar boyunca hangi özelliklerin okunabilir ve nedensel olduğunu şimdi sınayacağız.” |
| Fact-check riskleri | Equivariant/invariant, tensor shapes, softmax’ın lineer olmaması, Pre-LN/Post-LN, hardware-dependent speedup. |
| Kabul kriterleri | Sayısal örnek tek sayfada yeniden hesaplanabilir; architecture optimization ile kernel optimization ayrılmış. |

### Bölüm 5 — Katmanlar Boyunca Temsil: Dönüşüm, Nedensellik ve Sınırlar

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 5 |
| Seviye | intermediate |
| Önkoşullar | Bölüm 3 embedding; Bölüm 4 residual stream/attention/MLP |
| Ana tez | Bir özelliğin temsilden okunabilmesi, belirli bir yerde bulunması veya davranış için nedensel kullanılması aynı iddia değildir. |
| Okuyucunun kazanımı | Decodable/localized/causally-used ayrımını uygular; superposition ve polysemanticity’yi tanır; probe ile intervention farkını açıklar. |
| Kritik kavramlar | Probe, control task, patching, intervention, superposition, polysemanticity, feature, layerwise representation. |
| Yanlış anlaşılmalar | “Katmanlar monoton yüzeyden soyuta gider”; “probe başarı = mekanizma”; “manifold genellemenin açıklamasıdır.” |
| Alt başlıklar | Katmanlı dönüşüm; ne okunabilir; nerede; nedensel test; superposition; açıklamanın sınırı. |
| Mevcut corpus kaynakları | Makale 3 ikinci yarı `MERGE_INTO_CHAPTER`; Makale 14 yalnız terminoloji köprüsü. |
| Yeni araştırma ihtiyacı | Probe controls, causal tracing/patching caveats, Gurnee–Tegmark 2024; off-manifold intervention. |
| Kelime hedefi | 4.200; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Üç kanıt düzeyi matrisi; probe vs patching akış diyagramı; superposition oyuncak geometrisi. |
| Önceki bölümle bağlantı | Bölüm 4’teki akışı temsil iddialarıyla test eder. |
| Sonraki bölüme köprü | “Temsil kapasitesi tek başına nereden geldiğini açıklamaz; veri, compute ve ölçek rejimine bakmalıyız.” |
| Fact-check riskleri | Causal language, feature ontolojisi, intervention artifact’leri, layer role genellemeleri. |
| Kabul kriterleri | Her ampirik iddia DECODABLE/LOCALIZED/CAUSALLY_USED sınıfına bağlı; Bölüm 14’ün devre içeriği tekrar edilmemiş. |

### Bölüm 6 — Kabiliyetin Ekonomisi: Veri, Compute ve Ölçek

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 6 |
| Seviye | intermediate |
| Önkoşullar | Bölüm 1 loss/FLOP; Bölüm 2 objective; Bölüm 4 compute cost |
| Ana tez | Capability tek parametre sayısından doğmaz; veri miktarı/kalitesi, compute tahsisi, architecture ve ölçüm rejimi birlikte sonuç verir. |
| Okuyucunun kazanımı | Log-log scaling grafiği okur; Kaplan/Chinchilla farkını açıklar; dedup/data quality/contamination’ı ayırır; loss improvement ile downstream reliability’yi karıştırmaz. |
| Kritik kavramlar | Scaling law, power law, compute-optimal, token budget, deduplication, contamination, data quality, emergence metric. |
| Yanlış anlaşılmalar | “Büyük her zaman iyi”; “20 token/parameter evrensel optimum”; “emergence kesin faz geçişidir”; “synthetic data veri sorununu çözer.” |
| Alt başlıklar | Ölçek grafiği; compute/data/model tahsisi; veri kalitesi; emergence tartışması; deployment economics. |
| Mevcut corpus kaynakları | Makale 5 `RESEARCH_SOURCE_ONLY`; Makale 7 `REWRITE_SUBSTANTIALLY + MERGE`. |
| Yeni araştırma ihtiyacı | Kaplan, Chinchilla, emergence iki tarafı, DataComp-LM, FineWeb, observational/beyond-Chinchilla updates. |
| Kelime hedefi | 4.800; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Log-log fit, compute budget üçgeni, dedup pipeline, emergence metric example. |
| Önceki bölümle bağlantı | Temsilin kapasitesini belirleyen training kaynaklarını açıklar. |
| Sonraki bölüme köprü | “Pretraining kapasiteyi büyütür; bir base modeli yardımcıya dönüştüren davranış katmanı ayrıdır.” |
| Fact-check riskleri | Parameter counting, FLOP formula, fit ranges/confidence, extrapolation, dataset licensing/PII, vendor cost estimates. |
| Kabul kriterleri | Her scaling iddiası hedef metrik ve fit aralığıyla verilmiş; tek optimum veya tek emergence anlatısı yok. |

### Bölüm 7 — Ham Modelden Asistana: Davranış Nasıl Eğitilir?

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 7 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 2 objective; Bölüm 6 pretraining/data |
| Ana tez | Post-training, base model kapasitesini kullanıcıya dönük bir policy’ye çevirir; tercih verisi doğruluk veya tek bir evrensel insan değeri garantilemez. |
| Okuyucunun kazanımı | SFT, reward model, RLHF, KL, DPO ve online/offline preference’ı ayırır; sycophancy, over-refusal ve alignment-faking bulgularını deney kapsamıyla yorumlar. |
| Kritik kavramlar | SFT, preference, reward model, policy, RLHF, KL, DPO, RLAIF, sycophancy, refusal. |
| Yanlış anlaşılmalar | “Post-training sadece filtreler”; “DPO RLHF’nin aynısıdır”; “alignment=censorship”; “laboratuvar davranışı deployment gerçeğidir.” |
| Alt başlıklar | Base/instruct/chat; SFT; preference pipeline; Bölüm 2’deki distribution-distance sezgisinden KL cezasına geçiş; DPO/RL; güvenlik-faydalılık tradeoff; ölçüm sınırları. |
| Mevcut corpus kaynakları | Makale 6 `REWRITE_SUBSTANTIALLY`. |
| Yeni araştırma ihtiyacı | InstructGPT, FLAN, Constitutional AI, DPO, Tülu 3, online preference, alignment-faking/emergent misalignment karşı kanıtları. |
| Kelime hedefi | 5.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Base→SFT→preference pipeline; reward/policy ayrımı; KL sezgisi; failure taxonomy. |
| Önceki bölümle bağlantı | Scale ile kazanılan capacity’nin davranışa nasıl dönüştüğünü açıklar. |
| Sonraki bölüme köprü | “Policy bir cevap üretir; zor görevlerde tek üretim yerine arama, doğrulama ve durdurma gerekir.” |
| Fact-check riskleri | Model-specific recipes, annotator population, on/off-policy, R1/R1-Zero, strong frontier safety generalizations. |
| Kabul kriterleri | KL ilk teknik kullanımından önce reference policy’den uzaklaşma cezası olarak yeniden ve sayısal sezgiyle kurulmuş; normatif hedefler teknik mekanizma gibi gizlenmemiş; vendor sonuçları görünür statülü. |

### Bölüm 8 — Reasoning: Aday Üretme, Arama, Doğrulama ve Durdurma

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 8 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 2 generation; Bölüm 6 compute; Bölüm 7 post-training |
| Ana tez | Reasoning davranışı, öğrenilmiş model kapasitesi ile inference-time propose/search/verify/stop politikasının birleşimidir; görünür CoT iç mekanizmanın sadık kaydı değildir. |
| Okuyucunun kazanımı | Greedy/beam/sampling/best-of-N’i; process/outcome reward, inference verifier ve deterministic checker’ı; pass@1/pass@k/consensus@k’yi ayırır. |
| Kritik kavramlar | CoT, search, test-time compute, verifier, process supervision, outcome reward, stop policy, pass@k. |
| Yanlış anlaşılmalar | “Uzun CoT daha iyi”; “CoT düşüncenin kaydı”; “verification her zaman kolaydır ve P≠NP bunu kanıtlar.” |
| Alt başlıklar | Reasoning iddiası; propose; search; verify; stop; faithful explanation sınırı; compute-matched evaluation. |
| Mevcut corpus kaynakları | Makale 8 `RESEARCH_SOURCE_ONLY + MERGE`; Makale 9 teknik omurga `REWRITE_SUBSTANTIALLY + MERGE`. |
| Yeni araştırma ihtiyacı | CoT, self-consistency, STaR, ToT, process supervision, Snell 2024, compute-optimal inference, R1/s1/Illusion tartışması. |
| Kelime hedefi | 5.600; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Propose-search-verify-stop state machine; sampling tree; pass@k numerical example; compute-quality curve. |
| Önceki bölümle bağlantı | Post-training policy’sinin inference sırasında nasıl genişletildiğini gösterir. |
| Sonraki bölüme köprü | “Arama yapabilmek için yalnız token üretmek yetmez; sistem hangi bağlamı taşıdığını ve hangi durumda olduğunu bilmelidir.” |
| Fact-check riskleri | Benchmark harness, contamination, sampling budget, verifier data, visible CoT faithfulness, complexity theory analogy. |
| Kabul kriterleri | Reasoning tek mekanizma gibi anlatılmamış; bütün skorlar compute koşuluyla; P≠NP benzetmesi sınırlandırılmış. |

### Bölüm 9 — Bağlam, Bellek ve Geçerli Durum

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 9 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 4 attention/KV cache; Bölüm 1 memory/compute |
| Ana tez | Nominal context window, effective context use, persistent memory ve runtime state farklı sorunları çözer. |
| Okuyucunun kazanımı | Parametric knowledge, active context, episodic store ve runtime state’i ayırır; lost-in-the-middle, compression ve memory evaluation sınırlarını açıklar. |
| Kritik kavramlar | Context window, effective context, KV cache, recurrence, episodic memory, state, compression, long-horizon evaluation. |
| Yanlış anlaşılmalar | “1M context=1M memory”; “needle retrieval=understanding”; “summarization lossless.” |
| Alt başlıklar | Dört bilgi katmanı; context limit; effective use; memory architectures; state; eval tasarımı. |
| Mevcut corpus kaynakları | Makale 10 `REWRITE_SUBSTANTIALLY`. |
| Yeni araştırma ihtiyacı | Transformer-XL, Lost in the Middle, RULER, NoLiMa, LongMemEval, EverMemBench ve gürültü/çeldirici protokolleri. |
| Kelime hedefi | 4.500; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Dört katman; prefill/decode/KV cache; session timeline; memory read/write loop. |
| Önceki bölümle bağlantı | Reasoning aramasının taşıdığı bilgi/durum sınırını açıklar. |
| Sonraki bölüme köprü | “Sistem aktif bağlamına sığmayan veya parametrelerinde güvenilir olmayan bilgi için dış kanıt getirmelidir.” |
| Fact-check riskleri | Nominal vendor context, benchmark versions, memory contamination, retention/privacy, latency costs. |
| Kabul kriterleri | Context/memory/state hiçbir tabloda eş anlamlı değil; needle benchmark kapsamı görünür. |

### Bölüm 10 — Kanıt Mimarisi: Retrieval’dan Grounding’e

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 10 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 3 embedding; Bölüm 9 context sınırları |
| Ana tez | RAG tek bir ürün deseni değil; evidence acquisition, selection, grounding ve citation verification zinciridir. |
| Okuyucunun kazanımı | Sparse/dense/hybrid retrieval, chunking, reranking, query transformation ve generation’ı ayırır; retrieval, groundedness, factuality ve citation correctness’i ayrı ölçer. |
| Kritik kavramlar | IR, sparse/dense retrieval, chunk, embedding index, recall/precision, reranker, grounding, citation correctness. |
| Yanlış anlaşılmalar | “RAG hallucination’ı bitirir”; “daha fazla chunk daha iyi”; “citation=truth”; “GraphRAG her zaman üstün.” |
| Alt başlıklar | Kanıt sorunu; IR temeli; retrieval pipeline; modular/agentic RAG; dört ölçüm; failure taxonomy. |
| Mevcut corpus kaynakları | Makale 12 `REWRITE_SUBSTANTIALLY`. |
| Yeni araştırma ihtiyacı | Lewis 2020, DPR, Self-RAG, CRAG, RAPTOR, GraphRAG; güncel RAG evaluation survey yalnız harita. |
| Kelime hedefi | 5.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Pipeline; precision/recall toy set; reranking; claim→evidence graph; failure matrix. |
| Önceki bölümle bağlantı | Context sınırına dış evidence katmanı ekler. |
| Sonraki bölüme köprü | “Kanıt getirmek bir eylemdir; bir hedefe göre araç seçip sonuçtan öğrenen döngü bizi ajan sistemine götürür.” |
| Fact-check riskleri | Benchmark/harness, proprietary corpora, GraphRAG generalization, citation metrics, retrieval vs generation causality. |
| Kabul kriterleri | RAG taxonomy linear maturity ladder değil; her claim kaynak/grounding ölçümüyle ayrılmış. |

### Bölüm 11 — Ajan Sistemleri: Kapalı Çevrim Eylem ve Denetim

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 11 |
| Seviye | advanced |
| Önkoşullar | Bölüm 8 search/verify/stop; Bölüm 9 state; Bölüm 10 retrieval/tool |
| Ana tez | Ajan, “model + tools” değil; goal, observation, state, action, feedback, authority ve termination sözleşmesi olan kapalı çevrim sistemidir. |
| Okuyucunun kazanımı | Workflow/single-agent/planner-executor/multi-agent’i ayırır; failure’ı specification/observation/tool/state/policy/termination kaynağına bağlar; human oversight’ı yetki sınırı olarak kurar. |
| Kritik kavramlar | Goal, observation, state, action, feedback, authority, termination, planner/executor, multi-agent, human-in-the-loop. |
| Yanlış anlaşılmalar | “Araç varsa ajan”; “orchestration zayıf modeli telafi eder”; “multi-agent daima iyi”; kontrol teorisi benzetmesi matematiksel eşdeğerliktir. |
| Alt başlıklar | Ajan tanımı; mimari aileler; control-loop analogy; error propagation; authority; evaluation. |
| Mevcut corpus kaynakları | Makale 11 `REWRITE_SUBSTANTIALLY`. |
| Yeni araştırma ihtiyacı | ReAct, Toolformer, τ-bench, OSWorld, WebArena/AgentBench sınırları, METR time-horizon ve independent replications. |
| Kelime hedefi | 5.600; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Control loop; authority boundary; failure propagation graph; single vs multi-agent comparison. |
| Önceki bölümle bağlantı | Retrieval’ı hedefe bağlı araç eylemine dönüştürür. |
| Sonraki bölüme köprü | “Eylem yapan sistem ne zaman durmalı, cevap vermemeli veya insana devretmeli? Bunun için belirsizliği ölçmeliyiz.” |
| Fact-check riskleri | Benchmark version/tool access, autonomy duration, cherry-picked demos, control theory analogy, multi-agent gains. |
| Kabul kriterleri | Failure taxonomy her örneğe uygulanmış; authority ve stop koşulu mimarinin parçası; hype yok. |

### Bölüm 12 — Belirsizlik ve Kalibrasyon: Model Ne Zaman Bilmiyor?

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 12 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 1 probability/logit; Bölüm 2 output distribution; Bölüm 7 post-training |
| Ana tez | Confident dil, token probability ve epistemik güven aynı değildir; güvenilir deployment calibration ile birlikte abstention/risk tradeoff’u gerektirir. |
| Okuyucunun kazanımı | Token/sequence likelihood, semantic uncertainty ve verbalized confidence’ı ayırır; reliability diagram, proper score, ECE sınırı ve risk–coverage okur. |
| Kritik kavramlar | Calibration, discrimination, sharpness, Brier/log score, ECE, semantic entropy, selective prediction, abstention, risk–coverage. |
| Yanlış anlaşılmalar | “Her cevapta gerçek confidence yüzdesi vardır”; “ECE tek başına yeter”; “RLHF her zaman calibration’ı bozar.” |
| Alt başlıklar | Güven türleri; calibration; proper scoring; selective prediction; semantic uncertainty; deployment maliyeti. |
| Mevcut corpus kaynakları | Makale 13 girişler + Makale 15 teknik bölümler; ikisi birleştirilip yeniden yazılır. |
| Yeni araştırma ihtiyacı | Guo calibration, proper scoring, semantic entropy Nature 2024, SimpleQA, 2025–2026 calibration surveys/primary work. |
| Kelime hedefi | 4.500; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Reliability diagram; Brier toy example; risk–coverage curve; confidence taxonomy. |
| Önceki bölümle bağlantı | Ajanın stop/escalate kararına ölçülebilir belirsizlik katmanı ekler. |
| Sonraki bölüme köprü | “Kalibrasyon yalnız bir özellik; şimdi correctness’in nasıl tanımlandığını ve evaluation’ın nasıl yanıltabildiğini inceleyeceğiz.” |
| Fact-check riskleri | Binning, correctness grader, semantic equivalence, model/task transfer, post-training causality. |
| Kabul kriterleri | Calibration/discrimination/sharpness ayrılmış; her metric target/cost varsayımıyla; confidence tone kanıt sayılmamış. |

### Bölüm 13 — Halüsinasyon ve Değerlendirme Bilimi

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 13 |
| Seviye | advanced |
| Önkoşullar | Bölüm 10 grounding; Bölüm 12 calibration |
| Ana tez | “Hallucination” tek mekanizma değildir; evaluation, factuality/faithfulness/grounding/citation/repeatability’yi görev ve maliyetle ayrı ölçmelidir. |
| Okuyucunun kazanımı | Benchmark contamination/saturation/gaming’i; LLM-judge bias’larını; accuracy-only teşviklerini; confidence interval ve repeated trial ihtiyacını açıklar. |
| Kritik kavramlar | Factuality, faithfulness, groundedness, completeness, judge bias, contamination, robustness, repeat reliability, CI. |
| Yanlış anlaşılmalar | “Hallucination tek hata”; “yüksek MMLU güvenilirlik”; “LLM judge insan yerine geçer”; “citation correctness factuality’dir.” |
| Alt başlıklar | Hata taksonomisi; evaluation card; contamination; judge bias; dynamic eval; risk management. |
| Mevcut corpus kaynakları | Makale 15 eval omurgası + Makale 13 misconception’ları; `REWRITE_SUBSTANTIALLY + MERGE`. |
| Yeni araştırma ihtiyacı | LiveBench, contamination survey, NIST AI 600-1, Kalai vd. 2026 kapsamı, judge-bias primary work. |
| Kelime hedefi | 5.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Evaluation card; confusion/failure matrix; repeated-trial interval; judge bias examples. |
| Önceki bölümle bağlantı | Belirsizliği “doğru ne?” ölçüm problemiyle bağlar. |
| Sonraki bölüme köprü | “Davranışı ölçmek yetmez; bazı iddialar model içindeki hesaplamaya dair nedensel kanıt gerektirir.” |
| Fact-check riskleri | Benchmark versions, closed judge models, Kalai theorem assumptions, leakage, vendor benchmarks. |
| Kabul kriterleri | Her score model/data/prompt/harness/metric/N/CI ile; hallucination alt türleri açık. |

### Bölüm 14 — Modelin İçine Bakmak: Temsil, Devre ve Nedensel Kanıt

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 14 |
| Seviye | advanced |
| Önkoşullar | Bölüm 4 data flow; Bölüm 5 probe/intervention |
| Ana tez | Mechanistic interpretability, ikna edici hikâye değil; faithfulness, completeness, causality ve scalability ile sınanan reverse engineering programıdır. |
| Okuyucunun kazanımı | Neuron/feature/superposition, SAE, activation/attribution patching ve circuit’i ayırır; steering ile mechanism discovery farkını açıklar. |
| Kritik kavramlar | Feature, superposition, SAE, reconstruction, sparsity, attribution, patching, circuit, faithfulness, completeness. |
| Yanlış anlaşılmalar | “Attention map=thought”; “SAE feature ontolojik gerçek”; “steering mekanizma kanıtı”; “bir prompt circuit’i genel algoritmadır.” |
| Alt başlıklar | Reverse engineering; unit/feature; superposition; SAE; patching; circuit validation; coverage sınırı. |
| Mevcut corpus kaynakları | Makale 14 `REUSE_WITH_LIGHT_EDIT`; Makale 3’ten yalnız gerekli köprü. |
| Yeni araştırma ihtiyacı | Transformer Circuits, causal scrubbing, AtP*, Scaling Monosemanticity, Circuit Tracing, SAEBench ve 2026 benchmark eleştirileri. |
| Kelime hedefi | 5.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Superposition toy model; SAE replacement path; patching; attribution graph; evidence-axis table. |
| Önceki bölümle bağlantı | Behavioral evaluation’dan internal causal evidence’a geçer. |
| Sonraki bölüme köprü | “Aynı temsil ve kanıt sorunları metin dışı modalitelerde daha da zorlaşır.” |
| Fact-check riskleri | Vendor-selected examples, reconstruction quality, dead features, off-manifold steering, independent replication, coverage. |
| Kabul kriterleri | Bölüm 5’te tanımlanan superposition yeniden öğretilmemiş, yalnız SAE problemine bir cümlelik referansla bağlanmış; her iddia DESCRIPTIVE/PREDICTIVE/CAUSAL/COMPLETE/SCALABLE ekseninde sınırlı; vendor vaka tek kanıt değil. |

### Bölüm 15 — Modaliteler Arası Temsil ve Grounding

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 15 |
| Seviye | intermediate → advanced |
| Önkoşullar | Bölüm 3 representation ve positive/negative pair sezgisi; Bölüm 4 Transformer; Bölüm 10 grounding |
| Ana tez | Multimodal model sensör/encoder/veri aracılığıyla modaliteleri bağlar; ortak embedding veya üretim kalitesi grounded world understanding garantisi değildir. |
| Okuyucunun kazanımı | Early/late fusion, contrastive alignment, modality tokenization ve grounding eval’i ayırır; multimodal ile world model farkını açıklar. |
| Kritik kavramlar | Modality, encoder, fusion, contrastive learning, cross-attention, grounding, sensor mediation, multimodal hallucination. |
| Yanlış anlaşılmalar | “Multimodal=doğrudan dünya erişimi”; “shared embedding=shared understanding”; “görsel akıcılık=grounding.” |
| Alt başlıklar | Modalite nedir; fusion; CLIP; generative multimodality; grounding; evaluation/data provenance. |
| Mevcut corpus kaynakları | Makale 17 multimodal omurga `REWRITE_SUBSTANTIALLY`; Makale 16 yalnız örnek/araştırma girdisi. |
| Yeni araştırma ihtiyacı | CLIP, Flamingo, BLIP-2, Chameleon, V-JEPA; Gemini 1.5 yalnız `VENDOR_REPORTED`. |
| Kelime hedefi | 4.300; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Early/late fusion; contrastive pairs; modality pipeline; grounding eval matrix. |
| Önceki bölümle bağlantı | Temsil/kanıt sorusunu farklı veri kanallarına taşır. |
| Sonraki bölüme köprü | “Modalite sayısı ve context büyüdükçe kalite kadar bellek, gecikme ve maliyet de mimari karar olur.” |
| Fact-check riskleri | Dataset provenance, benchmark leakage, model version, direct-perception language, representational convergence. |
| Kabul kriterleri | Perception/representation/grounding ayrı; vendor demo bilimsel genelleme değil. |

### Bölüm 16 — Çıkarım Ekonomisi: Bellek, Gecikme ve Model Seçimi

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 16 |
| Seviye | intermediate → advanced systems |
| Önkoşullar | Bölüm 1 compute/memory; Bölüm 4 KV cache; Bölüm 6 scaling |
| Ana tez | Deploy edilebilir kabiliyet, quality-constrained memory/latency/throughput/energy tradeoff’udur; tek bir compression tekniği genel hız garantilemez. |
| Okuyucunun kazanımı | Parameter memory tahmini yapar; quantization/pruning/distillation/MoE/routing/speculative decoding’i ayırır; prefill/decode ve hardware dependence’i açıklar. |
| Kritik kavramlar | Precision, quantization, pruning, distillation, active parameters, MoE, routing, speculative decoding, cascade, bandwidth. |
| Yanlış anlaşılmalar | “4-bit daima kaliteyi yok eder”; “pruning daima hızlandırır”; “small model=zayıf”; “MoE bütün parametreleri her tokenda çalıştırır.” |
| Alt başlıklar | Maliyet yüzeyi; precision; pruning; distillation; sparse routing; draft/verify; cascade; hardware. |
| Mevcut corpus kaynakları | Makale 17 efficient-AI bölümü; Makale 16 on-device/cascade girdisi; ikisi yoğun fact-check. |
| Yeni araştırma ihtiyacı | Switch Transformer, Mamba/Mamba-2, speculative decoding, GQA/MLA, 2025–2026 inference hardware primary reports. |
| Kelime hedefi | 4.000; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Parameter×precision memory; roofline-style bottleneck; MoE active path; speculative decode; cascade. |
| Önceki bölümle bağlantı | Multimodal ve uzun-context sistemlerin kaynak maliyetini görünür kılar. |
| Sonraki bölüme köprü | “Kaynak sınırları içinde yalnız gözlem üretmek değil, zaman ve eylem altında dünyanın nasıl değişeceğini modellemek gerekir.” |
| Fact-check riskleri | Hardware/batch/precision/context, quality-matched baseline, marketing throughput, energy estimates. |
| Kabul kriterleri | Her efficiency claim hardware+precision+batch+context+quality target taşır; wall-clock ile FLOP ayrılmış. |

### Bölüm 17 — Dünya Modelleri: Durum, Zaman, Eylem ve Planlama

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 17 |
| Seviye | advanced → synthesis |
| Önkoşullar | Bölüm 11 action loop; Bölüm 15 multimodal representation |
| Ana tez | World model iddiası observation generation’dan güçlüdür; action-conditioned dynamics, counterfactual prediction ve planning utility ayrı kanıt gerektirir. |
| Okuyucunun kazanımı | State/action/transition/reward içeren MDP sezgisini, latent dynamics ve rollout’u açıklar; video generator ile planning-useful model’i ayırır. |
| Kritik kavramlar | State, action, transition, MDP, latent dynamics, rollout, controllability, planning, intervention, transfer. |
| Yanlış anlaşılmalar | “Video kalitesi=fizik anlayışı”; “observation prediction=planning”; “simulator gerçek dünyanın tam modelidir.” |
| Alt başlıklar | World model kriteri; MDP sezgisi; latent dynamics; action conditioning; planning; eval gap; open questions. |
| Mevcut corpus kaynakları | Makale 17 world-model bölümü; Makale 16 embodiment soruları; ikisi `MERGE/RESEARCH` girdisi. |
| Yeni araştırma ihtiyacı | World Models 2018, DreamerV3, JEPA/V-JEPA, Genie, Cosmos yalnız vendor status; counterevidence. |
| Kelime hedefi | 4.300; tolerans ±%10 |
| Diyagram/formül ihtiyacı | MDP loop; latent transition; action-conditioned rollout; dört kanıt seviyesi. |
| Önceki bölümle bağlantı | Deployment kaynakları altında zaman/eylem modelleme sorununu kurar. |
| Sonraki bölüme köprü | “Artık training’den planning’e bütün zinciri tek bir sistem haritasında birleştirebiliriz.” |
| Fact-check riskleri | Marketing use of world model, physics metrics, rollout horizon, downstream policy gain, real-world transfer. |
| Kabul kriterleri | Prediction/generation/action-conditioning/planning/transfer ayrı; yeni vendor modeli ana tez değil tarih damgalı vaka. |

### Bölüm 18 — Sentez: Zinciri Birleştirmek

| Alan | Sözleşme |
|---|---|
| Bölüm numarası | 18 |
| Seviye | synthesis |
| Önkoşullar | Bütün önceki bölümler |
| Ana tez | AI sistemi, bir zincirin en zayıf epistemik ve operasyonel halkası kadar güvenilirdir; doğru okuma analiz düzeylerini ve kanıt statülerini ayırır. |
| Okuyucunun kazanımı | Data’dan deployed system’e zinciri izler; hata kaynağını katmana bağlar; model/system card ve benchmark iddiasını kanıt statüsüyle eleştirir. |
| Kritik kavramlar | Zincir sentezi; claim/evidence; model card; system card; benchmark card; known unknown; authority boundary. Yeni teknik terim yok. |
| Yanlış anlaşılmalar | “Tek benchmark sistem kalitesini özetler”; “model adı teoridir”; “bir katman düzelirse sistem güvenilirdir.” |
| Alt başlıklar | Tam zincir; üç örnek iddia denetimi; kırılgan halkalar; 2026 known/unknown; nasıl güncel kalınır. |
| Mevcut corpus kaynakları | Tüm audit sentezi; Makale 18 bağımsız bölüm olarak `EXCLUDE`, yalnız “frontier iddia nasıl okunur?” tarih damgalı kısa kutuya research input. |
| Yeni araştırma ihtiyacı | Model Cards, Datasheets, NIST/system-card practice; en az iki vendor ve bir open model karşılaştırmalı case card. |
| Kelime hedefi | 3.500; tolerans ±%10 |
| Diyagram/formül ihtiyacı | Tam causal chain; evidence-status legend; claim audit card. Yeni formül yok. |
| Önceki bölümle bağlantı | Önceki bütün kolları birleştirir. |
| Sonraki bölüme köprü | Ana bölüm yok; sözlük, kaynakça ve “güncel iddia okuma” ekine yönlendirir. |
| Fact-check riskleri | Stale model cards, cherry-picked vendor comparisons, closed model unknowns, yeni kavram sızması. |
| Kabul kriterleri | Yeni kavram yok; her sentez iddiası önceki chapter’a bağlanır; tek yazar sesi; kitap tezi açıkça kapanır. |

## 9. Corpus Reuse/Rewrite Matrix

Bu tablo authoring sırasında `book-production/tahminden-sisteme/corpus-map.md` içine exact article ID ve paragraph/heading düzeyi kullanım notlarıyla genişletilir. “Reuse” kopyala-yapıştır anlamına gelmez; kaynakları yeniden doğrulanmış, kitap sesine göre yeniden yazılmış çekirdek demektir.

| # | Article ID / başlık | Ana tez | Seviye | Güçlü taraf | Teknik risk | Tekrar ettiği konular | Kitaptaki rol | Karar |
|---:|---|---|---|---|---|---|---|---|
| 1 | `article_2fb55e6e-a52a-4e8c-8e40-85719f34e57d` — Modern Yapay Zeka: Birikim ve Dönüm Noktaları | Modern AI tek kırılma değil birikimdir. | beginner | Kitap için erişilebilir büyük resim. | Kronoloji, “ilk” iddiaları, kapalı model parametreleri ve citation marker’ları. | Scale, Transformer, alignment ve “ani sıçrama” anlatısı. | Prolog tezi; kronoloji yeniden araştırılır. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 2 | `article_7f309312-f24c-4a9e-b58f-503f3912bab8` — LLM'ler ve Sonraki Token Paradigması | Next-token objective beklenmedik temsiller/kabiliyetler üretebilir. | beginner | Objective ile davranış arasındaki gerilimi kuruyor. | Latent reasoning/multimodal claim’leri aşırı geniş; mekanizma düzeyleri karışıyor. | Makale 1, 3, 8–9 ile objective/representation/reasoning. | Bölüm 2 objective→representation→system ayrımı. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 3 | `article_0ccce8a2-b0bf-4654-9bd2-6a127e8c6325` — Anlamın Temsili | Model anlamı işlevsel geometrik temsillerle taşır. | intermediate | Corpus’un en iyi representation açıklaması. | Probe→causality, manifold ve convergence genellemeleri. | Bölüm 5/14’e taşınacak layer/interpretability içeriği. | Bölüm 3 omurga; ileri yarı 5 ve 14’e bölünür. | `REUSE_WITH_LIGHT_EDIT`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 4 | `article_68f8ef63-a141-44fe-a25a-a3c003bde4bd` — Transformer Mimarisi | Transformer residual bilgi akışında attention ve MLP dönüşümüdür. | intermediate | En güçlü bağımsız teknik omurga. | Equivariance, shape, normalization, MLP-memory ve performance iddiaları. | Makale 3/14 representation; 7/17 efficiency. | Bölüm 4 backbone; numerical attention ve prefill/decode eklenir. | `REUSE_WITH_LIGHT_EDIT`, `REQUIRES_FACT_CHECK` |
| 5 | `article_3e813c35-db23-49e7-9993-2885362a8068` — Scaling Laws ve LLM Kabiliyetinin Doğuşu | Ölçek loss ve bazı kabiliyetlerle düzenli ilişki kurar. | intermediate | Scaling sorusunu görünür kılıyor. | Chinchilla oranı, emergence, data wall ve compute tahminleri stale/aşırı kesin. | Makale 7 ve 1 ile scale/economics. | Bölüm 6 claim/question bank; prose kullanılmaz. | `RESEARCH_SOURCE_ONLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 6 | `article_d4ac7f65-e8cc-4b73-94b3-5328d0907bc8` — Pretraining, Post-training ve Alignmentın Gerçek Rolü | Pretraining capacity, post-training behavior policy’sini şekillendirir. | intermediate | Base/instruct ayrımı ve failure türleri. | “Capacity unchanged” aşırı kesin; alignment-faking/emergent-misalignment genellemesi. | Makale 7 scale; 13/15 reliability. | Bölüm 7 ana corpus girdisi. | `REWRITE_SUBSTANTIALLY`, `REQUIRES_FACT_CHECK` |
| 7 | `article_fdbb2b23-0c87-4162-ba32-91dc1d276c95` — LLM Ön Eğitimi, Ölçek Yasaları ve Öğrenme Dinamikleri | Pretraining veri/compute/objective etkileşimidir. | advanced | Makale 5’ten daha teknik data/scaling malzemesi. | Formül/katsayı kapsamı, optimizer ve emergence nedenselliği. | Makale 5/6 ile scale ve training. | Bölüm 6 teknik girdisi; 5 ile birleştirilir. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 8 | `article_1907ac99-989b-41e0-86b5-40095b27c100` — LLM Reasoning, Test-Time Compute ve Verification | Reasoning propose/search/verify/stop olarak okunabilir. | intermediate | Dört aşamalı zihinsel model ve stop vurgusu. | CoT/internal thought, P≠NP ve frontier skorları aşırı genelleniyor. | Makale 9 reasoning teknik içeriği. | Bölüm 8 mental model; prose kullanılmaz. | `RESEARCH_SOURCE_ONLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 9 | `article_000b0a9e-a406-46aa-b5c5-2b0b0e779ad1` — LLM Reasoning: Teknik İnceleme | Inference-time compute arama ve verifier ile performansı artırabilir. | advanced | Sampling/verifier/process supervision ayrıntısı. | Benchmark/harness/contamination; verification türleri ve CoT faithfulness karışıyor. | Makale 8 ile büyük ölçüde aynı alan. | Bölüm 8 technical backbone; 8 ile birleşir. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 10 | `article_97b8ffae-dc04-43a2-8418-5089a4a99b6a` — Uzun Context, Bellek ve Long-Horizon Understanding | Uzun görevler aktif context dışında kalıcı bellek/durum ister. | intermediate | Context≠memory ayrımı için güçlü başlangıç. | Nominal window=effective use ve benchmark genellemeleri; memory türleri bulanık. | Makale 11 agents ve 12 retrieval. | Bölüm 9; context/memory/state dört katmanda yeniden kurulur. | `REWRITE_SUBSTANTIALLY`, `REQUIRES_FACT_CHECK` |
| 11 | `article_b4ad2667-6930-49fd-9c04-624db6ba1b49` — Agent Sistemlerini Kontrol Döngüsü Olarak Okumak | Agent goal/state/action/feedback/stop döngüsüdür. | intermediate | Sistem düzeyi control-loop zihinsel modeli. | Benzetmeyi eşdeğerlik sanma; benchmark/autonomy/multi-agent hype. | Makale 8–10 ve 12 ile search/memory/retrieval. | Bölüm 11; authority/failure taxonomy eklenir. | `REWRITE_SUBSTANTIALLY`, `REQUIRES_FACT_CHECK` |
| 12 | `article_f1fbd490-d51d-4e38-8eb6-95dcb4f4aec1` — RAG'den Retrieval-Reasoning Sistemlerine | RAG retrieval ve generation’ı evidence döngüsünde bağlar. | intermediate | Naive/modular/agentic tasarım alanını gösteriyor. | Taxonomy’yi maturity ladder yapma; GraphRAG üstünlüğü; IR prerequisites eksik. | Makale 10 memory ve 11 agents. | Bölüm 10; IR temeli ve dört ayrı metric eklenir. | `REWRITE_SUBSTANTIALLY`, `REQUIRES_FACT_CHECK` |
| 13 | `article_c5f79dc9-fa9a-423e-82a5-cee69326fe91` — LLM Güvenilirliği | Belirsizlik ve calibration güvenilirliğin merkezidir. | intermediate | Beginner-friendly reliability soruları. | Confidence türleri, calibration causality ve ölçüm ayrıntısı zayıf. | Makale 15 ile geniş ölçüde tekrar. | Bölüm 12 accessible openings; 15 ile yeniden bölünür. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 14 | `article_f1802ee7-fa94-4575-8926-8e3e494fa6a5` — Mechanistic Interpretability | İç hesaplama causal intervention ve circuits ile araştırılabilir. | advanced | Corpus’un en güçlü bağımsız advanced chapter çekirdeği. | SAE feature ontology, steering=mechanism, coverage ve vendor-selected cases. | Makale 3’ün ileri representation kısımları. | Bölüm 14 backbone; 2026 counterevidence eklenir. | `REUSE_WITH_LIGHT_EDIT`, `REQUIRES_FACT_CHECK` |
| 15 | `article_9e7cdfdc-8292-472f-ad9f-559f6269a573` — LLM Güvenilirlik Bilimi | Reliability calibration, hallucination ve evaluation design bütünüdür. | advanced | Proper scoring/eval taxonomy için teknik derinlik. | Kalai theorem kapsamı, judge/benchmark versions ve hallucination tekliği. | Makale 13 ile büyük overlap. | Bölüm 12 calibration + Bölüm 13 evaluation backbone. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 16 | `article_1691754e-e287-4e54-a0e4-a6ba3b9fa90f` — LLM Ötesi Yapay Zekâ | AI text-only LLM’den multimodal/efficient/embodied yönlere uzanır. | intermediate | Son kısım için iyi soru haritası. | Geniş, yüzeysel, vendor/model hype’a açık; üç farklı alanı karıştırıyor. | Makale 17’nin aynı üç hattı. | Bölüm 15–17 question/example bank; prose kullanılmaz. | `RESEARCH_SOURCE_ONLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 17 | `article_0c98cd4a-3e97-4228-a9cb-e24cfeb9d475` — Multimodal, Efficient AI ve World Models | Gelecek sistemler modality, efficiency ve dynamics’i birlikte ele alır. | advanced | Üç ileri alan için teknik aday malzeme. | Shared embedding=grounding, video=world model, hardware-independent efficiency. | Makale 16 ile büyük overlap; kendi içinde üç ayrı chapter. | Bölüm 15, 16, 17’ye bölünür. | `REWRITE_SUBSTANTIALLY`, `MERGE_INTO_CHAPTER`, `REQUIRES_FACT_CHECK` |
| 18 | `article_a25eaac3-1025-4423-acd7-706843f3efa8` — Claude'u Nasıl Okumalıyız? | Bir frontier model iddiası sistem ve kanıt katmanlarıyla okunmalıdır. | intermediate | Vendor claim okuma yöntemi. | Çok hızlı stale olur; vendor facts ve sürüm iddiaları kritik riskli. | Kitabın genel model/system/benchmark ayrımı. | Statik chapter yok; Bölüm 18’de kısa tarih damgalı yöntem kutusu. | `EXCLUDE_FROM_BOOK`, `RESEARCH_SOURCE_ONLY`, `REQUIRES_FACT_CHECK` |

## 10. Research and Citation Protocol

### 10.1 Kanıt sınıfları

Her source record aşağıdaki statülerden en az birini taşır:

| Statü | Kullanım sözleşmesi |
|---|---|
| `FOUNDATIONAL` | Mekanizma veya alanın kalıcı temeli; tarihsel öncelik ayrıca doğrulanır. |
| `EMPIRICAL_STABLE` | Birden fazla çalışma/olgun benchmark ile desteklenen ve koşulları yazılan sonuç. |
| `STANDARD` | NIST/ISO benzeri normatif süreç veya ölçüm standardı; bilimsel sonuç gibi sunulmaz. |
| `PREPRINT` | Hakemlik durumu tamamlanmamış; görünür biçimde etiketlenir, güçlü genelleme yapılmaz. |
| `VENDOR_REPORTED` | Sağlayıcının kendi sistemi hakkındaki birincil raporu; bağımsız genel gerçek gibi sunulmaz. |
| `TIME_SENSITIVE` | Model/benchmark/standart/mevzuat/sürüm bağımlı; `FINAL` öncesi ve publish öncesi yeniden açılır. |
| `CONTESTED` | Literatürde ölçüm, mekanizma veya yorum ayrılığı vardır; karşı kanıtla birlikte yazılır. |

Kaynak önceliği: hakemli birincil çalışma veya standart → özgün teknik rapor/preprint → resmi model/system card → yüksek kaliteli survey → ders kitabı. Survey keşif ve terminoloji haritasıdır; özgün deney iddiasında birincil kaynağın yerini almaz. SEO blogları, kaynaksız ürün yazıları ve popüler özet siteleri source register’a giremez.

### 10.2 On üç source family

| Aile kodu | Konu | Her chapter paketi için çekirdek gereklilik |
|---|---|---|
| `MATH` | Tokenization, probability, vectors, loss, optimization | Formül sembolleri, numerical example, tokenizer/perplexity koşulları. |
| `REP` | Representation/embedding | Static/contextual, decodable/localized/causal ayrımı. |
| `TRF` | Transformer ve varyantlar | Q/K/V, residual, normalization; kernel vs architecture. |
| `SCL` | Pretraining, scaling, data | Fit range, compute/data regime, contamination, data provenance. |
| `PST` | Post-training/alignment | Base model, data, objective, on/off-policy, reward/verifier, safety eval. |
| `RSN` | Reasoning/search/verification | Propose/search/verify/stop; sampling ve compute budget. |
| `MEM` | Long context/memory/state | Nominal/effective context, persistence, runtime state, privacy. |
| `RAG` | Retrieval/grounding | Corpus, chunking, retrieval/rerank metrics, groundedness/citation. |
| `AGT` | Agents | Goal/state/action/authority/termination; harness/tool versions. |
| `EVAL` | Reliability/calibration/evaluation | Target, data version, prompt/harness, metric, judge, N, CI, contamination, cost. |
| `MI` | Mechanistic interpretability | Model/layer, intervention, faithfulness, completeness, coverage, replication. |
| `MMW` | Multimodal/efficiency/world models | Fusion/grounding; hardware/precision; action conditioning/planning utility. |
| `CASE` | Model/system cases | Version, date, primary report, independent check, known unknown, claim limit. |

Araştırmaya başlarken `research-citation-plan.md` dış audit’ini keşif listesi olarak kullan; kitapta kaynak göstermeden önce canonical URL’yi ve metadata’yı yeniden aç.

### 10.2.1 Chapter research risk map

| Chapter | Temel source family | Tartışmalı nokta | Fact-check odağı | Güncellik riski | Toplama yöntemi |
|---:|---|---|---|---|---|
| 1 | `MATH` | Tokenizer-free yaklaşım token sorununu çözer mi? | Tokenizer kıyası, vector/cosine semantics, compute birimleri | Temel düşük; byte/patch orta | Textbook + ACL/JMLR temeli; 2024+ çok-dilli counterexample |
| 2 | `MATH`, `REP` | Next-token objective ne kadar explanatory? | Log/loss tanımı, perplexity, backprop attribution, objective/behavior nedenselliği | Orta | Information/optimization foundations + autoregressive primary work |
| 3 | `REP` | Linear/platonic representation kapsamı | Probe control, cosine semantics, static/contextual | Orta/yüksek | Foundational embeddings + probe literature + counterevidence |
| 4 | `TRF` | MLP memory, SSM/MoE superiority | Tensor shapes, masks, pre/post-LN, hardware claims | Core düşük; varyant yüksek | Original mechanism papers; every efficiency claim scoped |
| 5 | `REP`, `MI` | Decodable feature causal mı? | Intervention/off-manifold, feature ontology | Yüksek | Probe→patching evidence ladder; independent replication |
| 6 | `SCL` | Emergence mirage mı, regime shift mi? | Fit range, parameter/FLOP counting, contamination | Yüksek | İki taraflı primary papers; dataset cards; confidence ranges |
| 7 | `PST` | Post-training capacity’yi değiştirir mi? | Base/instruct, on/off-policy, annotators, safety eval | Çok yüksek | Open recipe + vendor report + independent/critical work |
| 8 | `RSN` | CoT faithfulness ve verification-easier claim’i | Sampling, pass@k, verifier data, compute match | Çok yüksek | Propose/search/verify/stop sınıflaması; benchmark cards |
| 9 | `MEM` | Nominal context gerçek memory mi? | Effective use, persistence, privacy, benchmark distractors | Çok yüksek | Architecture papers + long-context/memory eval cards |
| 10 | `RAG` | Graph/agentic RAG varsayılan üstün mü? | Corpus/chunking/rerank, four separate metrics | Yüksek | IR foundations + primary RAG systems + task-specific eval |
| 11 | `AGT` | Multi-agent/orchestration genellenebilir kazanç mı? | Tool access, harness, version, authority/termination | Çok yüksek | Benchmark cards + independent agent eval + failure studies |
| 12 | `EVAL` | Token probability epistemic confidence mı? | Calibration target, binning, scoring, correctness grader | Yüksek | Calibration foundations + semantic uncertainty primary work |
| 13 | `EVAL` | Hallucination tek mekanizma mı; judge güvenilir mi? | Data version, judge bias, N/CI, contamination | Çok yüksek | Dynamic eval + standards + primary judge-bias/counterwork |
| 14 | `MI` | SAE/circuit explanation faithful/complete mi? | Model/layer, reconstruction, intervention, coverage | Çok yüksek | Original methods + open replications + 2026 benchmark critique |
| 15 | `MMW` | Shared embedding grounding kanıtı mı? | Fusion, data provenance, modality-specific hallucination | Çok yüksek | Foundational CLIP/fusion + current multimodal eval; vendor label |
| 16 | `MMW` | Compression/routing gains quality-matched mı? | Hardware, precision, batch, context, energy/latency | Çok yüksek | Quality-constrained systems comparisons; no marketing throughput |
| 17 | `MMW` | Video generator world model sayılır mı? | Action conditioning, horizon, planning utility, transfer | Çok yüksek | World-model/RL foundations + current primary cases + counterevidence |
| 18 | `CASE`, tüm aileler | Vendor/system claim bağımsız knowledge mı? | Version/date, known unknown, independent check | Çok yüksek | Case-study cards; iki vendor + bir open model; publish-day refresh |

### 10.3 Source register ve claim ledger

`book-production/tahminden-sisteme/source-register.md` içinde her kaynak değişmez `SRC-<AİLE>-<NNN>` kimliği alır. Zorunlu alanlar:

```yaml
source_id: SRC-TRF-001
title: Attention Is All You Need
authors_or_org: Vaswani et al.
year: 2017
source_type: PAPER
evidence_tags: [FOUNDATIONAL]
canonical_url: https://arxiv.org/abs/1706.03762
version: arXiv v7
accessed_at: 2026-07-16
claim_ids: [CLM-04-001, CLM-04-002]
scope_conditions: "Original Transformer architecture; translation experiments"
counterevidence: []
quote_status: PARAPHRASED
reviewed_by: "independent-source-reviewer-id"
```

Her atomik claim `CLM-<chapter>-<nnn>` kimliği ve şu statülerden biriyle tutulur: `SUPPORTED`, `QUALIFIED`, `CONTESTED`, `UNVERIFIED`, `REJECTED`. Yalnız `SUPPORTED` ve sınırı prose içinde görünür `QUALIFIED` claim’ler final chapter’a girebilir. `CONTESTED` ancak iki tarafın kanıtı ve belirsizlik diliyle; `UNVERIFIED` ve `REJECTED` hiçbir publishable metne giremez.

### 10.4 Chapter research package

Her chapter için research agent şu paketi üretir:

1. 5–15 atomik claim ve claim karşıtı/sınırı.
2. En az iki foundational kaynak; konu gerektiriyorsa 2024–2026 update.
3. Claim–source matrix ve evidence statüleri.
4. En az iki contested point ve counterevidence.
5. Fact-check listesi ve freshness tetikleyicileri.
6. Formül/diyagram source note’u.
7. Kullanılmayan aday kaynaklar ve reddetme nedeni.

`SOURCE_MAP_READY` geçişi için geçici citation marker kalmamalı; her güçlü claim canonical URL’ye bağlı olmalı; vendor/preprint statüsü görünür olmalı; deney koşulları kaydedilmeli; bağımsız reviewer en az bir foundational, bir current ve bir yüksek-risk source’u doğrudan açmalıdır.

### 10.5 Prose citation biçimi

Ana metin yalnız standard Markdown linki kullanır ve atıf desteklediği cümlenin hemen ardından gelir:

```markdown
Self-attention, dizideki konumlar arasında içerik-bağımlı bir bilgi taşıma yolu kurar [Vaswani vd., 2017](https://arxiv.org/abs/1706.03762).
```

Vendor statüsü cümlede görünür:

```markdown
DeepSeek ekibi, kendi raporladığı donanım ve eğitim koşullarında MLA tasarımının KV-cache maliyetini düşürdüğünü bildirdi [DeepSeek-V2 teknik raporu, 2024](https://arxiv.org/abs/2405.04434).
```

Tarih, yüzde, benchmark, “ilk”, “en iyi”, “kanıtladı”, “her zaman” ve nedensellik iddiaları kaynaksız kullanılamaz. Uzun doğrudan alıntı yoktur; özgün Türkçe paraphrase yapılır ve deney koşulları korunur.

### 10.6 Citation hygiene

`citeturn...`, mojibake türevleri, çıplak `turn12search3`, `navlist`, `†source` ve URL’siz numaralı referanslar publishable citation değildir. İşareti silmek yetmez: iddiayı çıkar, özgün kaynağı başlık/yazar/yıl üzerinden yeniden bul, metadata’yı birincil sayfadan doğrula, claim gerçekten destekleniyorsa Markdown linkiyle değiştir; kaynak bulunmazsa claim’i reddet ve prose’dan çıkar.

## 11. Writing and Editorial Style Guide

### 11.1 Tek yazar sesi

Alt agentlar final prose yazmaz. Claude Opus bütün chapter metnini sıfırdan tek sesle yazar; agent cümlelerini kopyalamaz. Üslup teknik, doğrudan, sakin ve açıklayıcıdır. Okuru küçümsemez, jargonla statü göstermez, model veya şirket hayranlığı yapmaz.

### 11.2 Türkçe ve terminoloji

- Türkçe karşılığı yerleşikse onu kullan: “çıkarım”, “temsil”, “belirsizlik”, “doğrulama”.
- Kritik İngilizce terim ilk kullanımda `Türkçe terim (English term)` biçiminde verilir; sonraki kullanımlarda canonical Türkçe terim kullanılır.
- Yerleşik Türkçe karşılığı anlam kaybettiriyorsa İngilizce terim korunur ve ilk kullanımda bir cümleyle açıklanır: token, embedding, logit, benchmark, grounding gibi.
- `book-production/tahminden-sisteme/terminology.md` tek kaynaktır. Alanları: `term_id`, `canonical_tr`, `english`, `definition`, `first_defined_chapter`, `allowed_variants`, `confusable_with`, `status`.
- Bir chapter daha önce tanımlı terimi yeniden ders gibi anlatmaz; en fazla bir cümlelik hatırlatma ve önceki chapter linki verir.

### 11.3 Cümle, paragraf ve başlık

- Ortalama paragraf 60–140 kelime; mekanizma için gerektiğinde 180 kelime üst sınır. Daha uzun paragraf tek iddia taşıyamıyorsa bölünür.
- Bir paragraf bir ana düşünce taşır; ilk cümle yönü, orta cümleler mekanizma/kanıtı, son cümle sonuç veya geçişi kurar.
- Heading depth en fazla `###`; nadiren uzun teknik alt bölüm için `####`. Tek-paragraflık heading açılmaz.
- Chapter açılışı en fazla 250 kelimede ana soruyu ve önceki chapter’dan doğan sınırı kurar. Genel motivasyon konuşması yapmaz.
- Chapter kapanışı içeriği yeniden anlatmaz; zihinsel modeli 300–500 kelimede toparlar, kalan sınırı açıklar ve sonraki chapter’a köprü kurar.

### 11.4 Formül, diyagram ve örnek

- Formül yalnız ilişkiler prose’dan daha kesin anlatılacaksa kullanılır. Her sembol formülden önce veya hemen sonra tanımlanır.
- Her yeni matematiksel fikir küçük sayısal örneğe bağlanır; calculus türetimi yoktur.
- Diyagram dekorasyon değildir; en az üç bileşen, bir akış, bağımlılık veya karşılaştırmayı prose’dan daha açık göstermelidir. Mermaid renderer desteği doğrulanmadan final chapter’a Mermaid koyma; destek yoksa erişilebilir Markdown/ASCII tablo veya statik asset üret.
- Örnekler küçük, yapay ama mekanizmayı test edilebilir yapan toy example’dır. Uydurma iş vakası, sektör senaryosu veya kullanıcı geçmişi kullanılmaz.
- Kod, pseudocode, API çağrısı ve implementation tutorial’ı book prose’da yasaktır.

### 11.5 Kaynak ve spekülasyon dili

- Yerleşik mekanizma: doğrudan fakat kapsamı belirli dil.
- Ampirik eğilim: “bu deney koşullarında”, “bu model ailesinde”, “çalışma raporladı”.
- Contested/preprint/vendor claim: statü ve counterevidence görünür.
- Spekülasyon: “olabilir” demekle bitmez; hangi kanıtın eksik olduğu yazılır.
- Model/sürüm isimleri ana tezde değil, tarih damgalı case box’larda kullanılır.

### 11.6 Tekrar ve geçiş

`continuity-map.md` her chapter için `inherits`, `defines`, `must_not_redefine`, `hands_off_to`, `open_tension` alanlarını taşır. Aynı açıklama iki chapter’da 120 kelimeden fazla tekrar edemez. Bir sonraki chapter’ın tezi önceki chapter’da öğretilmez; yalnız çözülmemiş soru olarak açılır.

## 12. Paragraph Value Gate

Her paragraf aşağıdaki değer kodlarından en az birini üretir:

| Kod | İşlev |
|---|---|
| `DEFINE` | Yeni kavramı sınırlarıyla tanımlar. |
| `EXPLAIN` | Bir mekanizmayı neden-sonuç veya adım ilişkisiyle açıklar. |
| `DISTINGUISH` | Karıştırılan iki kavramı ölçütle ayırır. |
| `DEEPEN` | Önceki iddiayı yeni sonuç, koşul veya katmanla derinleştirir. |
| `CORRECT` | Yaygın yanlış anlamayı kanıt veya mekanizmayla düzeltir. |
| `EVIDENCE` | İddiayı kaynak, deney koşulu veya karşı kanıtla taşır. |
| `BRIDGE` | Bölüm içi/bölümler arası mantıksal geçiş kurar. |
| `SYNTHESIZE` | Zihinsel modeli yeni tekrar üretmeden birleştirir. |

Edit turunda paragraf kenar notlarına bu kodlar geçici olarak atanır; final prose’a kodlar yazılmaz. Kodsuz paragraf silinir veya komşusuyla birleştirilir.

Şunlar gate ihlalidir:

1. Aynı fikri eş anlamlı kelimelerle tekrar etmek.
2. Sırf hacim için tarihsel anlatı.
3. Genel motivasyon cümleleri ve “AI hızla gelişiyor” açılışları.
4. Chapter sonunda içeriği yeniden anlatan uzun özet.
5. Her chapter’da aynı temel kavramı yeniden tanımlamak.
6. Kaynaksız güçlü iddia veya koşulsuz benchmark sonucu.
7. Yapay vaka/iş senaryosu.
8. LinkedIn, danışmanlık, pazarlama veya hype dili.
9. Model/şirket hayranlığı.
10. Gereksiz İngilizce terim yığını.
11. 100 sayfa hedefini doldurmak için katalog biçimli kaynak/özellik sıralaması.

## 13. Agent and CLI Orchestration

### 13.1 Temel çalışma kuralı

Bir chapter’ın tek yazma sahibi vardır: Claude Opus. Paralel agentlar yalnız ayrı research/review artifact’lerine yazar. Aynı chapter `.md` dosyasına eşzamanlı iki writer erişemez. `chapter-ledger.md` her iş için `owner`, `lease_started_at`, `lease_expires_at`, `output_path` ve `reviewer_not_owner` alanlarını tutar. Lease yalnız expired veya açıkça released ise alınabilir.

Agent çıktısı otomatik doğru değildir. Orchestrator kaynakları açar, codebase yollarını doğrular, çelişkiyi ledger’a işler ve yalnız onaylı claim’leri outline’a geçirir.

### 13.2 Planning audit’te gerçekten kullanılan ajanlar

| Rol | Gerçek çağrı | Model | CWD | Sonuç | Rapor |
|---|---|---|---|---|---|
| Corpus Auditor 1–6 | `spawn_agent(task_name="corpus_audit_01_06", fork_turns="all")` | Codex collaboration runtime; marketing model API’de açıklanmıyor | `C:\dev\anil-lib` | completed; numeric exit code API’de yok | `C:\dev\anil-lib-book-planning-audit\20260716-151446\corpus-audit-01-06.md` |
| Corpus Auditor 7–12 | `spawn_agent(task_name="corpus_audit_07_12", fork_turns="all")` | Aynı; exact model açıklanmıyor | `C:\dev\anil-lib` | completed | `C:\dev\anil-lib-book-planning-audit\20260716-151446\corpus-audit-07-12.md` |
| Corpus Auditor 13–18 | `spawn_agent(task_name="corpus_audit_13_18", fork_turns="all")` | Aynı; exact model açıklanmıyor | `C:\dev\anil-lib` | completed | `C:\dev\anil-lib-book-planning-audit\20260716-151446\corpus-audit-13-18.md` |
| Book/Product Integration Architect | `spawn_agent(task_name="book_integration_options", fork_turns="all")` | Aynı; exact model açıklanmıyor | `C:\dev\anil-lib` | completed | `C:\dev\anil-lib-book-planning-audit\20260716-151446\book-integration-options.md` |
| Research and Citation Planner | `spawn_agent(task_name="research_citation_plan", fork_turns="all")` | Aynı; exact model açıklanmıyor | `C:\dev\anil-lib` | completed | `C:\dev\anil-lib-book-planning-audit\20260716-151446\research-citation-plan.md` |
| Requirements coverage | `& agy --model 'Gemini 3.1 Pro (High)' --mode plan --add-dir 'C:\Users\anil.akman\.codex\attachments\f0171eb1-0a70-4549-bd4b-83744e607c2f' --add-dir 'C:\dev\anil-lib-book-planning-audit\20260716-151446' --print-timeout 12m --print $prompt` (`$prompt` verbatim run log’da) | Gemini 3.1 Pro High | `C:\dev\anil-lib` | exit 0; 52.8s | `C:\dev\anil-lib-book-planning-audit\20260716-151446\antigravity-run-log.md` |
| Curriculum/system architecture challenge | `& agy --model 'Claude Opus 4.6 (Thinking)' --mode plan --add-dir 'C:\Users\anil.akman\.codex\attachments\f0171eb1-0a70-4549-bd4b-83744e607c2f' --add-dir 'C:\dev\anil-lib-book-planning-audit\20260716-151446' --print-timeout 12m --print $prompt` (`$prompt` verbatim run log’da) | Claude Opus 4.6 Thinking | `C:\dev\anil-lib` | exit 0; 365.2s | Antigravity artifact path recorded in `antigravity-run-log.md` |
| Final Book/Curriculum Adversarial Review + re-review | `agy --model 'Gemini 3.1 Pro (High)' --mode plan --dangerously-skip-permissions --add-dir 'C:\Users\anil.akman\.codex\attachments\f0171eb1-0a70-4549-bd4b-83744e607c2f' --print-timeout 12m --print $prompt` (verbatim prompts run log’da) | Gemini 3.1 Pro High | `C:\dev\anil-lib` | initial exit 0/FAIL; re-review exit 0/PASS | `C:\dev\anil-lib-book-planning-audit\20260716-151446\final-book-curriculum-adversarial-review.md` |
| Final Repository/App Integration Review + re-review | `spawn_agent(task_name="final_app_integration_review", fork_turns="5")`; targeted `followup_task` | Codex collaboration runtime; exact marketing model açıklanmıyor | `C:\dev\anil-lib` | completed/PASS; numeric exit API’de yok | `C:\dev\anil-lib-book-planning-audit\20260716-151446\final-repository-app-integration-review.md` |

`antigravity-run-log.md` complete CLI argümanlarını, verbatim task prompts ve geçersiz/incomplete review denemelerini saklar. Exact model/exit bilgisi API tarafından sağlanmadığında uydurulmamış, açıkça “not exposed” denmiştir.

### 13.3 Book production agent rolleri

| Rol | Girdi | Çıktı | Yasak |
|---|---|---|---|
| Corpus Auditor | İlgili source article + chapter contract | Paragraph/claim-level corpus map | Final prose yazmak |
| Research Agent | 5–15 claim question pack | Source package + counterevidence | SEO/blog kaynağını evidence yapmak |
| Source Verifier | Source register entries | Metadata/scope verification record | Araştırma agentının özetini kaynak yerine kabul etmek |
| Technical Reviewer | Draft + claim matrix | P0/P1/P2 technical review | Draftı sessizce düzenlemek |
| Pedagogy Reviewer | Draft + dependency DAG + terminology | Prerequisite/readability review | Seviyeyi yüzeyselleştirerek düşürmek |
| Redundancy/Continuity Reviewer | Adjacent chapters + continuity map | Duplicate/contradiction/forward-reference report | Yazar sesini yeniden yazmak |
| App Integration Reviewer | Code diff + baseline fixture + tests | Route/schema/progress/sidebar regression report | Content quality reviewuyla yetinmek |
| Claude Opus | Onaylı sources/outlines/reviews | Final prose ve edit | Kendi chapter’ına tek başına `FINAL` vermek |

### 13.4 CLI kullanımı ve fallback

Antigravity uygun olduğunda research synthesis, adversarial outline review ve read-only app review için `Gemini 3.1 Pro (High)` veya `Claude Opus 4.6 (Thinking)` kullan. Agent doğrudan chapter prose yazmaz. `agy` bulunamaz, auth/model limiti biter veya command exit nonzero dönerse görev durmaz: aynı task packet Codex subagent’a veya ayrı Claude review context’ine verilir; fallback `decisions.md` ve `session-handoff.md` içine kaydedilir.

Planning audit tablosundaki `& agy` PowerShell’de gerçekten kullanılan call-operator syntax’ıdır. Gelecekteki cross-shell worker bunu kopyalamaz: PowerShell’de `& '<absolute-agy-path>' ...`, CMD/bash/exec katmanında doğrudan `agy ...` kullanılır. Önce `agy --help` ve `agy models` ile mevcut CLI/model adlarını doğrula.

Her dış çağrı kaydı şu alanları taşır: `timestamp`, `role`, `command_or_tool_call`, `model`, `cwd`, `exit_or_status`, `report_path`, `files_allowed`, `files_changed`, `verification_owner`.

## 14. Claude/Codex/Antigravity Responsibility Matrix

| İş | Claude Opus | Codex | Antigravity Pro | Bağımsız gate |
|---|---|---|---|---|
| Scope/decision ownership | Nihai karar ve ledger | Repo kanıtı toplar | Alternatif/risk challenge | Decision log review |
| Corpus mapping | Sentezler | Full-text audit/paragraf pointer | Redundancy challenge | Corpus map spot-check |
| Academic research | Claim pack’i tanımlar | Primary-source verification | Geniş synthesis/counterevidence | Source verifier opens sources |
| Chapter outline | Yazar | Dependency/path check | Adversarial curriculum check | Pedagogy reviewer |
| Final prose | **Tek sorumlu** | Yazmaz | Yazmaz | Technical + pedagogy + continuity |
| Fact-check | Düzeltir | Claim/source comparison | Contested claim challenge | Ayrı fact-check PASS |
| App implementation | Orkestre eder/uygular | TDD, code review, regression | Read-only architecture review | App Integration Reviewer |
| Final edit | **Tek sorumlu** | Diff/test review | Voice/repetition adversarial scan | Independent reviewer gives FINAL |

Araç seçimi koşulludur; sorumluluk seçimi koşullu değildir. Bir araç yoksa rol başka araca taşınır, kalite gate’i kaldırılmaz.

## 15. Repository and Content Architecture

### 15.1 Seçilen yaklaşım

**Ayrı source contracts + ortak library/reader adapter.** Article catalog immutable kalır; book content ayrı registry ve manifestte yaşar; UI generic `LibraryEntry`/`LibraryCollection` view-model’ini tüketir.

```text
content/
├── catalog.json                         # değişmez article catalog
├── articles/**                          # değişmez 18 article
└── books/
    ├── catalog.json                     # book registry, schema v1
    └── tahminden-sisteme/
        ├── book-manifest.json           # parts + immutable chapter order
        └── chapters/
            ├── 00-prolog-bes-birikim-bir-mucize-degil.md
            ├── 01-dil-nasil-sayiya-donusur.md
            ├── 02-olasiliktan-ogrenmeye.md
            └── ...

src/lib/content/
├── markdown.ts                          # ortak güvenli unified processor
├── library.ts                           # article + chapter adapter/registry
└── books/
    ├── schema.ts
    ├── types.ts
    ├── labels.ts                         # BookStage → Türkçe display label
    ├── catalog.ts
    └── chapters.ts

src/app/books/[bookSlug]/[chapterSlug]/page.tsx
src/components/reader/library-navigation.tsx
src/components/reader/book-reading-list.tsx
src/components/reader/reader-navigation.tsx
```

### 15.2 Dosya değişiklik sözleşmesi

| Dosya | Değişiklik | Neden | Regresyon riski | Zorunlu test |
|---|---|---|---|---|
| `content/books/catalog.json` | Oluştur | Birden çok book registry | Low | Schema/duplicate/path test |
| `content/books/tahminden-sisteme/book-manifest.json` | Oluştur | Part/chapter sırası | Medium | Contiguous order, identity, path guard |
| `content/books/.../chapters/*.md` | Oluştur | Publishable book | Content | Frontmatter/word/citation gates |
| `src/lib/content/markdown.ts` | Article processor’ı davranış değiştirmeden çıkar | Tek güvenli Markdown hattı | Medium | Article render characterization |
| `src/lib/content/books/*` | Oluştur | Book domain validation/load | Medium | Unit tests |
| `src/lib/content/library.ts` | Oluştur | Generic descriptors/valid ID registry | High | Article baseline + chapter union |
| `src/lib/content/types.ts` | Generic base descriptor ekle; article type compatibility koru | Shared reader contract | Medium | Type/unit/component |
| `src/lib/content/catalog.ts` | Article adapter/href üret; article invariants değişmez | Generic navigation | Medium | Exact 18 baseline |
| `src/app/books/[bookSlug]/[chapterSlug]/page.tsx` | Oluştur | Ayrı book route | Medium | Static params, metadata, 404, adjacency E2E |
| `src/components/reader/reader-shell.tsx` | `articles/current.articleId/category/Level` bağımlılığını `LibraryCollection[] + ReaderEntry + AdjacentEntry` contract’ına indir | Reader reuse | High | Article + chapter header/progress/preferences |
| `src/components/reader/article-navigation.tsx` → `reader-navigation.tsx` | Canonical `AdjacentEntry.href` kullan; `/read/${slug}` birleştirmesini kaldır | Book-internal footer navigation | High | Article ve chapter first/middle/last adjacency |
| `src/components/reader/reading-list.tsx` | Article-only olarak koru; `LibraryNavigation` içinden yalnız article collection için çağır; mevcut `/read` ve grouping davranışını karakterize et | Article regression izolasyonu | Low | Existing reading-list tests |
| `src/lib/content/labels.ts` | Article `CATEGORY_LABELS`/`LEVEL_LABELS` korunur; generic ReaderShell artık bunları import etmez | Article compatibility | Low | Existing label consumers |
| `src/lib/content/books/labels.ts` | `BOOK_STAGE_LABELS` ekle: Başlangıç/Temel/Orta/İleri/Sentez | `foundational`/`synthesis` display | Low | Exhaustive Record test |
| `reader-sidebar.tsx`, `mobile-reading-list.tsx` | `LibraryCollection[]` tüket | Yapısal ayrım | High | Desktop/mobile component + E2E |
| `src/app/page.tsx` ve dashboard bileşenleri | Collection-aware entries/href/progress | Book discovery/resume | High | Dashboard article+chapter E2E |
| `src/lib/reader-data/server/sync-service.ts` | Article-only valid IDs yerine union registry | Chapter sync | **P0** | Sync accepts chapter/rejects unknown |

`content/catalog.json`, `content/articles/**`, `/read/[slug]`, storage key `anil-lib:reader-data:v2`, DB column adları ve article `groupByBatchAndCategory()` davranışı değiştirilmez.

## 16. Book Manifest and Schema Plan

### 16.1 Önceden ayrılmış immutable reader-entry kimlikleri

Kimlikleri yeniden üretme veya chapter sırasına göre değiştirme. Bu liste bütün progress-bearing reader entry’lerini kapsar. Ön söz/kullanım rehberi Prolog dosyasına; sözlük/notasyon-kaynak okuma eki/açıklamalı kaynakça Chapter 18 dosyasına Section 7.3’te tanımlanan biçimde gömülür ve ayrı ID gerektirmez:

| Entry | Immutable ID |
|---|---|
| Book | `book_41855b8a-f5d1-4046-a661-461b6196d440` |
| Prolog | `chapter_4b818cde-f100-47d0-b597-ac1b165f6d2d` |
| Chapter 1 | `chapter_f7dbb4d2-a585-444e-b131-997927eb1508` |
| Chapter 2 | `chapter_628b4ebf-31a7-4ea8-9b03-86720886a10f` |
| Chapter 3 | `chapter_7088b107-210d-4d47-b614-ff2eecef8c3e` |
| Chapter 4 | `chapter_18e973cc-77d9-4f90-b6db-c18a8c7005ee` |
| Chapter 5 | `chapter_f30e5342-7cb6-4151-a150-25426ebfc48b` |
| Chapter 6 | `chapter_c17dd921-66a9-4b67-9237-5e462b71a56e` |
| Chapter 7 | `chapter_235e607e-7ed5-4b0a-803b-87c00ed6e15d` |
| Chapter 8 | `chapter_31ec7687-6b57-43a4-8f4d-7dea6f85ee27` |
| Chapter 9 | `chapter_c771c188-0ca4-4ce8-bd54-41501619124a` |
| Chapter 10 | `chapter_841be778-54bb-42ed-aadc-30bc8010ddf0` |
| Chapter 11 | `chapter_6d5c8dd7-29f4-41ed-9a0b-c7bf68cc6c12` |
| Chapter 12 | `chapter_c952dc5f-d95c-4db3-8347-255192da2ef2` |
| Chapter 13 | `chapter_1050a736-4647-4733-a536-cfbb3575d589` |
| Chapter 14 | `chapter_263e90e2-341c-4c6e-95ac-8d12e876f93a` |
| Chapter 15 | `chapter_e17b938e-fa1c-4e63-93d4-ff5f8ab5e8ec` |
| Chapter 16 | `chapter_6d6b2c20-a8bf-4e46-a74a-09b99167242f` |
| Chapter 17 | `chapter_b6683fbd-ca68-4cd0-974a-8f199b7d2143` |
| Chapter 18 | `chapter_2ad18b48-992d-4e57-a551-701765af5253` |

### 16.2 Runtime interfaces

```ts
type ContentType = "article" | "chapter";
type BookStage =
  | "beginner"
  | "foundational"
  | "intermediate"
  | "advanced"
  | "synthesis";

interface LibraryEntry {
  contentId: string;
  contentType: ContentType;
  title: string;
  slug: string;
  href: string;
  description: string;
  collectionId: string;
  collectionTitle: string;
  position: number;
  partId: string | null;
  partTitle: string | null;
  partOrder: number | null;
  level: string;
  tags: string[];
}

interface LibraryCollection {
  collectionId: string;
  collectionType: "articles" | "book";
  title: string;
  href: string | null;
  collectionOrder: number;
  meterContentIds: string[];
  entries: LibraryEntry[];
}

interface ReaderEntry extends LibraryEntry {
  summary: string;
  readingMinutes: number;
  totalCount: number;
  contextLabel: string;
  stageLabel: string;
}

type AdjacentEntry = {
  contentId: string;
  title: string;
  href: string;
  position: number;
} | null;
```

Article descriptor `LibraryEntry`/`ReaderEntry`’ye adapte edilir; article domain schema’sı değiştirilmez. Book schema kendi `BookStage` değerlerini kullanır. Article adapter `contextLabel = CATEGORY_LABELS[category]`, `stageLabel = LEVEL_LABELS[level]`; book adapter `contextLabel = partTitle`, `stageLabel = BOOK_STAGE_LABELS[stage]` üretir. `ReaderShell` label map veya article-specific field okumaz; yalnız display-ready `ReaderEntry`, `LibraryCollection[]`, `AdjacentEntry` ve canonical `href` kullanır. Reader-data public compatibility alan adları gerekmedikçe DB migration için yeniden adlandırılmaz.

### 16.3 `content/books/catalog.json`

```json
{
  "schemaVersion": 1,
  "books": [
    {
      "bookId": "book_41855b8a-f5d1-4046-a661-461b6196d440",
      "bookOrder": 1,
      "slug": "tahminden-sisteme",
      "title": "Tahminden Sisteme",
      "subtitle": "Dil Modellerinden Ajanlara Modern Yapay Zekânın İç Mantığı",
      "manifestPath": "content/books/tahminden-sisteme/book-manifest.json",
      "status": "draft",
      "tags": ["book", "claude-code", "zero-to-hero", "ai-foundations", "2026-edition"]
    }
  ]
}
```

### 16.4 Manifest invariants

`book-manifest.json` şu alanları ve kuralları uygular:

- `schemaVersion: 1`, immutable `bookId`, slug/title/subtitle/description/language.
- Book registry’de `bookOrder` 1..N unique ve contiguous’dır. Top-level navigation book collections’ı `bookOrder` ile sıralar; singleton article collection her zaman bütün book collections’dan sonra gelir. İkinci kitap testi 1/2 sırasını kanıtlar.
- `language: "tr"`, `edition: "2026"`, `status: "draft" | "published"`.
- Exact tag set: `book`, `claude-code`, `zero-to-hero`, `ai-foundations`, `2026-edition`. `long-form` eklenmez; content type zaten bu anlamı taşır.
- Beş part: immutable `partId`, `title`, `stage`, contiguous `partOrder`.
- Prolog `chapterNumber: 0`; ana chapter’lar 1–18. `chapterOrder` 0–18 kesintisiz ve unique.
- Her entry `chapterId`, `slug`, `title`, `description`, `partId`, `stage`, `path`, `wordTarget`, `status` taşır.
- Book `LibraryEntry` adapter’ı manifest part metadata’sını `partId`, `partTitle`, `partOrder` alanlarına koyar; article adapter bu alanları `null` verir. Sidebar part grouping string parsing yapmaz.
- Path yalnız `content/books/tahminden-sisteme/chapters/` altında resolve olur; Section 16.6 lexical + realpath guard’ı traversal/symlink/junction escape’i reddeder.
- Chapter frontmatter `chapter_id`, `book_id`, `slug`, `title`, `description`, `part_id`, `stage`, `tags` alanlarını taşır ve manifestle cross-check edilir.
- Prolog file’ı `## Ön Söz`, `## Bu Kitap Nasıl Okunmalı?`, `## Beş Birikim, Bir Mucize Değil` sırasını taşır. Chapter 18 file’ı ana chapter kapanışından sonra `## Sözlük`, `## Notasyon ve Kaynak Okuma Rehberi`, `## Açıklamalı Kaynakça` sırasını taşır. Validator exact heading order’ını ve ayrı word budget’larını kontrol eder.
- Adjacency yalnız aynı manifestteki `chapterOrder` üzerinden hesaplanır; article global order’a bağlanmaz.
- Mixed release state yasaktır; publication visibility Section 16.5’teki tek predicate ile belirlenir.

### 16.5 Tek publication predicate’i ve atomic release

`src/lib/content/library.ts` tek `isPublicChapter(bookRecord, manifest, chapterEntry, loadedFrontmatter): boolean` fonksiyonu tanımlar. Static params, direct route loader, `LibraryCollection[]`, dashboard, adjacency ve reader-data valid-ID registry yalnız bu fonksiyonu kullanır; kendi status kontrolünü tekrar yazmaz.

Predicate ancak şu koşulların tamamında `true` döner:

1. Book catalog record `status === "published"`.
2. Manifest `status === "published"`.
3. Catalog ve manifest `bookId`, slug, title/subtitle, edition, language ve exact tags alanları cross-check ile eşleşir.
4. Manifestteki bütün 0–18 entry’ler `status === "published"`; mixed draft/published manifest schema validation’da reddedilir.
5. İlgili entry ID/slug/path ile loaded frontmatter eşleşir; file vardır ve Section 16.6 path guard’ını geçer.

Release progressive değildir. Production boyunca catalog, manifest ve 19 entry birlikte `draft` kalır; draft route/static params/sidebar/dashboard/sync ID registry’de görünmez. App integration unit/E2E’si isolated published fixtures ile geliştirilir. Bütün 19 entry `CONTINUITY_VERIFIED` olduğunda status alanları tek atomic patch’te `published` yapılır; full app gate çalışır ve chapter’lar `APP_INTEGRATED`e geçer. Herhangi bir P0/P1 veya failed command bulunursa aynı atomic patch ile bütün status alanları tekrar `draft` yapılır; mixed state bırakılmaz. `published` local runtime eligibility’dir, deploy/publish yetkisi değildir.

Status-matrix testleri en az şunları kapsar: all-draft hidden/rejected; catalog-only published hidden; manifest-only published hidden; one chapter draft schema FAIL; missing/invalid file FAIL; all-published visible/routable/sync-valid; identity/tag mismatch FAIL.

### 16.6 Lexical ve realpath path safety

Book registry `manifestPath` ve manifest `chapter.path` için aynı helper kullanılır:

1. JSON path repository-relative POSIX string olmalıdır; absolute/drive/UNC path, backslash, NUL, boş segment, `.`/`..` segmenti ve percent-encoded traversal reddedilir.
2. `path.posix.normalize(candidate) === candidate` değilse reddet.
3. Manifest için allowed lexical root `content/books/`; chapter için exact root `content/books/<validated-book-slug>/chapters/` olur. Prefix string kıyası separator boundary olmadan yapılmaz.
4. `path.resolve(repoRoot, candidate)` sonrası `path.relative(allowedRoot, resolved)` absolute ise veya `..` ile başlıyorsa reddet.
5. Published file için `fs.realpath(allowedRoot)` ve `fs.realpath(resolved)` hesapla; ikinci path’in birinciye göre `path.relative` sonucu absolute/`..` ise symlink veya Windows junction escape olarak reddet. Draft/nonexistent path yalnız lexical check’ten geçebilir ama public predicate daima existing realpath ister.
6. Tests absolute, drive-letter, UNC, backslash, `../`, prefix collision (`chapters-evil`), NUL, encoded traversal, symlink ve junction escape’lerini manifest ve chapter seviyesinde kapsar. CI gerçek junction oluşturamıyorsa `realpath` adapter’ı test double ile boundary dışı path döndürerek aynı rejection branch’ini kanıtlar.

## 17. Sidebar, Tags and Navigation Integration

1. Sidebar top-level sırası **Kitaplar → Makaleler** olur. Book collections `bookOrder` ile sıralanır; singleton article collection daima son gelir. Desktop ve mobile aynı `LibraryCollection[]` modelini tüketir; iki-book fixture 1→2→articles sırasını kanıtlar.
2. “Kitaplar” altında kitap başlığı, part başlıkları ve 0–18 chapter listesi görünür. Her book collection kendi `meterContentIds` listesiyle ayrı progress meter taşır. Article collection kendi 18-ID meter’ını korur; global birleşik denominator/meter yoktur.
3. “Makaleler” grubu mevcut `classificationBatch + category` grouping ve erişilebilir isimleriyle aynen kalır.
4. Book ayrımı tags ile yapılmaz. Tags filtreleme/metadata içindir; yapısal ayrım `collectionType: "book"` ile yapılır.
5. Book chapter href’i `/books/tahminden-sisteme/<chapter-slug>`; article href’i `/read/<article-slug>` olarak descriptor içinde üretilir. UI string birleştirerek route tahmin etmez.
6. Previous/next book navigation yalnız manifest adjacency kullanır. Prologun previous değeri null; Chapter 18’in next değeri null.
7. Mobile drawer keyboard/focus/close davranışı mevcut testlerle korunur; book part’ları scroll içinde erişilebilir olmalıdır.
8. Dashboard ve sidebar collection-aware olur: her kitap ve article collection için ayrı progress özeti/meter gösterir; tek yanıltıcı birleşik yüzde üretmez. Saved places/highlights generic `contentId → href` resolver kullanır.
9. Search ve related-content v1 kapsam dışıdır; varmış gibi route/link ekleme. `relatedArticleIds` article sözleşmesini değiştirme.
10. Book landing page zorunlu değildir; ilk sürümde catalog/dashboard kitap kartı prologa bağlanır. İkinci book geldiğinde collection href için landing page ayrı karar olabilir; bu iş `DECISION_REQUIRED` değildir ve mevcut görevde ertelenmiştir.

## 18. Progress and Resume Protocol

### 18.1 Chapter lifecycle

Durumlar tam sırayla ilerler:

`NOT_STARTED → RESEARCHING → SOURCE_MAP_READY → OUTLINED → DRAFTING → DRAFTED → FACT_CHECKED → TECHNICALLY_REVIEWED → PEDAGOGICALLY_REVIEWED → EDITED → CONTINUITY_VERIFIED → APP_INTEGRATED → FINAL`

Durum atlanamaz. Her transition `chapter-ledger.md` içine timestamp, actor, evidence path ve gate result ile eklenir. P0/P1 bulunduğunda chapter en erken ihlal edilen duruma geriler; regression reason kaydedilir. Claude kendi yazdığı chapter’ı `APP_INTEGRATED → FINAL` taşıyamaz; farklı agent/model tarafından yazılmış `reviews/chapter-<nn>-independent.md` içinde PASS gerekir.

Kalıcı progress dosyalarında Markdown checkbox kullanma. Durumlar yalnız yukarıdaki exact state stringleri ve `PASS | FAIL | BLOCKED` gate değerleriyle izlenir.

### 18.2 `chapter-ledger.md` row contract

| Alan | Anlam |
|---|---|
| `chapter_id` | Immutable chapter UUID |
| `state` | Exact lifecycle token |
| `owner` | Aktif writer/orchestrator identity |
| `lease_started_at`, `lease_expires_at` | Paralel write collision önleme |
| `word_target`, `current_words` | Dolgusuz hacim takibi |
| `last_transition_at`, `last_transition_by` | Audit trail |
| `evidence_paths` | Research/review/test kayıtları |
| `open_p0`, `open_p1`, `open_p2` | Severity counts |
| `next_transition` | Tek izinli sonraki state |

### 18.3 Session handoff contract

Her oturum sonunda, limit uyarısı beklenmeden `book-production/tahminden-sisteme/session-handoff.md` şu exact alanlarla güncellenir:

```yaml
session_end: 2026-07-16T15:00:00+03:00
last_completed_work: "Chapter 04 source map verified"
last_quality_gate_passed: "SOURCE_MAP_READY for chapter_18e973cc-77d9-4f90-b6db-c18a8c7005ee"
open_risks:
  - "SRC-TRF-017 vendor throughput lacks quality-matched independent baseline"
next_single_task: "Produce and review the Chapter 04 outline"
files_to_read:
  - "book-production/tahminden-sisteme/session-handoff.md"
  - "book-production/tahminden-sisteme/chapter-ledger.md"
  - "book-production/tahminden-sisteme/terminology.md"
commands_to_run:
  - "corepack pnpm test -- src/lib/content/books"
pending_reviews:
  - "None"
```

Yeni oturum yalnız `session-handoff.md` içindeki `files_to_read` listesini, bu handoff’u ve OpenWolf’un zorunlu memory dosyalarını okur. `next_single_task` dışında yeni işe başlamaz. Kararları yeniden tartışmaz; `decisions.md` canonical’dır.

### 18.4 Reader progress compatibility

- Chapter IDs mevcut `reader-data:v2` generic string alanlarında tutulur; yeni storage key veya paralel progress store açılmaz.
- `sync-service.ts` geçerli içerik ID kümesini article catalog ile yalnız Section 16.5 `isPublicChapter` predicate’inden geçen chapter’ların union’ından üretir; route/sidebar/dashboard/sync visibility asla farklı status mantığı kullanmaz.
- Eski API/DB `articleId` alan adları migration riski yaratıyorsa korunur; semantik borç `decisions.md` içinde belgelenir. Değer artık article veya chapter ID olabilir.
- Unknown, draft veya manifestten kaldırılmış chapter ID sync’te reddedilir; published chapter kabul edilir.
- Progress/completion/saved place/highlight/resume testleri chapter ve article için aynı conflict-resolution kurallarını kanıtlar.

## 19. Chapter Production Workflow

### 19.1 State geçişleri

| Geçiş | Üretilecek kanıt | Gate sahibi |
|---|---|---|
| `NOT_STARTED → RESEARCHING` | Chapter contract’tan türetilmiş 5–15 claim research task; owner lease | Claude orchestrator |
| `RESEARCHING → SOURCE_MAP_READY` | Source package, claim matrix, counterevidence, freshness flags; üç kaynak doğrudan açılmış | Research Agent + Source Verifier |
| `SOURCE_MAP_READY → OUTLINED` | Heading planı, section word budget, önceki/sonraki bridge, terminology additions, diagram plan | Claude + Pedagogy pre-review |
| `OUTLINED → DRAFTING` | Bütün prerequisites önceki chapter’da tanımlı; outline’da forward dependency yok | Claude |
| `DRAFTING → DRAFTED` | Tam chapter metni, word target ±%10, unresolved marker yok, paragraph value self-audit | Claude |
| `DRAFTED → FACT_CHECKED` | Her strong claim canonical source’a bağlı; high-risk sources doğrudan kontrol edilmiş | Ayrı Fact-checker |
| `FACT_CHECKED → TECHNICALLY_REVIEWED` | Technical review PASS; açık P0/P1 yok | Technical Reviewer |
| `TECHNICALLY_REVIEWED → PEDAGOGICALLY_REVIEWED` | Prerequisite/readability/mental-model review PASS | Pedagogy Reviewer |
| `PEDAGOGICALLY_REVIEWED → EDITED` | Tek yazar sesi, terminology, repetition, Paragraph Value Gate edit’i | Claude |
| `EDITED → CONTINUITY_VERIFIED` | Adjacent + global dependency scan; contradiction/duplicate/bridge PASS | Continuity Reviewer |
| `CONTINUITY_VERIFIED → APP_INTEGRATED` | Frontmatter/manifest valid; route/nav/progress tests; repo gate green | Claude integrator + App Reviewer |
| `APP_INTEGRATED → FINAL` | Farklı agent/model independent PASS; review artifact mevcut | Independent Reviewer |

### 19.2 Bir chapter döngüsü

1. Ledger’dan yalnız `next_single_task` chapter’ını seç ve lease al.
2. Chapter contract’ı, ilişkili corpus-map satırlarını, terminology ve continuity map’i oku.
3. Research agent’a prose değil atomik claim/source/counterevidence paketi ver.
4. Source verifier foundational + current + high-risk kaynakları doğrudan açsın.
5. Claude outline’ı alt başlık, section word budget, formula/diagram ve bridge cümleleriyle yazar.
6. Pedagogy pre-review forward dependency bulursa outline düzelmeden draft başlatma.
7. Claude bütün prose’u tek oturumda bitirmek zorunda değildir; ancak partial text `DRAFTING` kalır ve session handoff exact paragraph/section konumunu yazar.
8. Draft tamamlanınca word count değil Paragraph Value Gate önce uygulanır; silinen dolgu hacmi yeniden dolgu ile tamamlanmaz.
9. Fact-checker claim-level doğrulama yapar; unsupported claim prose’dan çıkarılır veya sınırlandırılır.
10. Technical ve pedagogy review ayrı context/model tarafından yapılır. Aynı reviewer iki gate’i tek “looks good” sonucu ile geçiremez.
11. Claude review bulgularını uygular; voice/terminology edit’i yapar.
12. Continuity reviewer en az önceki, mevcut ve sonraki chapter contract’ını; ayrıca terminology/continuity map’i karşılaştırır.
13. Chapter runtime’a entegre edilir, tests/build çalışır.
14. Independent reviewer PASS verirse ledger `FINAL` olur; değilse en erken ihlal edilen state’e döner.

### 19.3 Paralellik sınırı

En fazla bir chapter `DRAFTING` durumunda olabilir. Aynı anda en fazla iki sonraki chapter `RESEARCHING` olabilir; bunların prerequisite’leri değişmeyecek kadar net olmalıdır. App refactor worker’ı chapter dosyalarına, research/review worker’ları source code’a yazamaz. Shared files (`terminology.md`, `source-register.md`, `continuity-map.md`) yalnız orchestrator tarafından agent raporları birleştirildikten sonra düzenlenir.

### 19.4 Severity ve regression

| Severity | Tanım | Sonuç |
|---|---|---|
| `P0` | Veri kaybı, broken route/build, yanlış temel tez, fabricated source, article invariant ihlali | Çalışma durur; ilgili state geriler; fix + aynı reviewer re-review zorunlu. |
| `P1` | Beginner kopuşu, önemli teknik yanlış, source-scope mismatch, chapter tekrar/çelişkisi, unusable mobile/progress | Chapter ilerlemez; fix + re-review zorunlu. |
| `P2` | Lokal netlik, terminology, test gap veya düşük-risk UX sorunu | `FINAL` öncesi çöz veya açık gerekçeyle decision log’a al. |
| `P3` | Tercih/nit niteliğinde, doğruluk veya kabul kriterini etkilemeyen öneri | Kabul veya gerekçeli ret; review log’da kalır. |

## 20. Review and Quality Gates

### 20.1 CHAPTER GATE

Her satır `PASS` olmalıdır; checkbox kullanılmaz.

| Kriter | Zorunlu kanıt |
|---|---|
| Ana tez net ve tek | Contract ile draft opening/closing eşleşmesi |
| Önkoşullar karşılandı | Dependency + terminology scan |
| Teknik terimler ilk kullanımdan önce açıklandı | Terminology ledger diff |
| Kaynaklar iddiaları destekliyor | Claim/source matrix + opened-source notes |
| Tekrar yok | Paragraph value ve cross-chapter duplicate report |
| Çelişki yok | Continuity report |
| Beginner → advanced akışı bozulmadı | Pedagogy reviewer PASS |
| Önceki ve sonraki chapter’a bağlanıyor | Exact opening/closing bridge |
| Kelime hedefi dolgu olmadan karşılandı | Word count + value-code audit summary |
| Teknik reviewer PASS | `reviews/chapter-<nn>-technical.md` |
| Pedagogy reviewer PASS | `reviews/chapter-<nn>-pedagogy.md` |
| Continuity reviewer PASS | `reviews/chapter-<nn>-continuity.md` |
| Independent final PASS | `reviews/chapter-<nn>-independent.md`, different agent/model |

Reviewer şu “grill” sorularına somut paragraph/claim referansıyla cevap verir: Okur hangi yanlış fikrini terk ediyor? Mekanizma gerçekten açık mı, yoksa terimler sıralanmış mı? Hangi claim koşulsuz genellenmiş? Hangi paragraf silinse hiçbir şey kaybolmaz? Hangi ileri kavram erken kullanılmış? Hangi kaynak süs olarak duruyor?

### 20.2 BOOK GATE

| Kriter | PASS kanıtı |
|---|---|
| Tek yazar sesi | Long-form Editorial Reviewer corpus-wide PASS |
| Terim tutarlılığı | `terminology.md` coverage + variant scan |
| Cross-chapter tekrar temizliği | Redundancy report; yalnız kısa bridge tekrarları |
| Kaynakça bütünlüğü | Her prose link source register’da; orphan source/claim yok |
| 2026 güncelliği | Bütün `TIME_SENSITIVE`, `PREPRINT`, `VENDOR_REPORTED`, `STANDARD` kayıtların freshness date’i publish turunda yenilenmiş |
| Spekülasyon/yerleşik bilgi ayrımı | Evidence-status adversarial scan PASS |
| 100+ gerçek sayfa | Publishable word count ≥80.000; planlanan 93–97k; page formula ve rendered sample |
| Sidebar entegrasyonu | “Kitaplar” ve “Makaleler” ayrı structural sections E2E |
| Tags | Manifest exact set içinde `book` ve `claude-code` |
| Mobile reader | 390px ve en az bir desktop viewport; drawer/nav/progress screenshots + E2E |
| Progress/completion | Chapter reload/restore/complete/sync E2E |
| Existing article regression | 18 invariant fixture, old routes, order, sidebar grouping PASS |
| Type-check | `corepack pnpm typecheck` exit 0 |
| Lint | `corepack pnpm lint` exit 0 |
| Unit/component | `corepack pnpm test` exit 0 |
| E2E | `corepack pnpm test:e2e` exit 0 |
| Production build | `corepack pnpm build` exit 0 |
| Diff hygiene | `git diff --check` exit 0; immutable hashes unchanged |

### 20.3 Zorunlu bağımsız final review’lar

Kitap handoff uygulaması bittiğinde en az iki ayrı read-only reviewer kullan:

1. **Book/Curriculum Adversarial Review:** 100+ sayfa gücü, repackaging riski, beginner kopuşları, prerequisite ihlalleri, chapter tekrarları, source gaps, session continuity ve uygulanabilirlik.
2. **Repository/App Integration Review:** Tag-only yanılgısı, article invariants, manifest/schema/path safety, sidebar/mobile, route adjacency, dashboard, progress/sync, test kapsamı ve build riskleri.

Her review P0/P1/P2/P3 tablosu ve final `PASS | FAIL` üretir. P0/P1 varsa düzelt, aynı reviewer/model context’ine yalnız diff + önceki bulguları vererek re-review yaptır. İki review da PASS olmadan book gate geçmez.

## 21. App Integration Workflow

### Phase 0 — Baseline and characterization

1. `git status --short`, `git rev-parse HEAD` ve tool versions kaydını `checkpoints/app-baseline.md` içine yaz.
2. 18 article’ın exact ID/order/slug/path/href tuple’larını hard-coded characterization testine ekle.
3. Mevcut article route, desktop/mobile list, adjacency, dashboard ve reader-data tests’i çalıştır; sonuçları baseline’a kaydet.
4. Baseline yeşil değilse book değişikliği yapma; pre-existing failure’ı kullanıcı değişikliklerine dokunmadan teşhis et ve ledger’a yaz.

### Phase 1 — Shared Markdown extraction

1. Mevcut article render davranışını karakterize eden test yaz.
2. Güvenli `unified` processor’ı `src/lib/content/markdown.ts` içine çıkar.
3. `articles.ts` yeni processor’ı kullansın; raw HTML davranışı, heading IDs ve React output değişmesin.
4. Article tests/build geçmeden devam etme.

### Phase 2 — Article-only library adapter

1. `LibraryEntry`, display-ready `ReaderEntry`, canonical-href `AdjacentEntry` ve `LibraryCollection` contract tests’ini önce yaz.
2. `src/lib/content/library.ts` başlangıçta yalnız articles’ı normalize etsin; exact href/order, `readingMinutes`, `contextLabel`, `stageLabel`, position/total ve article collection meter IDs üretimini kanıtla.
3. `ReaderShell`ı article-specific ID/category/level lookup’ından generic reader contract’a; footer navigation’ı `AdjacentEntry.href`e geçir. Article-only adapter ile visible article behavior’ı değiştirme.
4. Dashboard/sidebar generic collections’a geçsin; `ReadingList` article-only kalıp wrapper içinden çağrılsın. Desktop/mobile aynı collection modelini kullansın ve existing grouping article collection içinde korunsun.

### Phase 3 — Book schemas and loaders

1. Book ID/chapter ID regex, catalog/manifest/frontmatter, duplicate/order/path traversal ve identity mismatch için failing tests yaz.
2. `src/lib/content/books/schema.ts`, `types.ts`, `catalog.ts`, `chapters.ts` uygula.
3. Section 16.5 status matrix’ini ve Section 16.6 lexical/realpath path guard’ını failing tests ile kur; draft hidden, mixed status invalid ve published missing/escaped file fail-closed olmalı.
4. Book registry’yi library adapter’a ekle; bütün consumers aynı `isPublicChapter` predicate’ini kullansın ve article baseline değişmeden chapter descriptors üretsin.

### Phase 4 — Book route and adjacency

1. Valid all-published chapter, draft/mixed hidden, unknown book, unknown chapter, metadata/static params ve first/last adjacency testlerini yaz.
2. `/books/[bookSlug]/[chapterSlug]` route’unu display-ready `ReaderEntry` ve shared reader primitives ile kur; route ve static params aynı `isPublicChapter` predicate’ini kullansın.
3. `AdjacentEntry.href`in book manifest dışına taşmadığını; footer’ın canonical href’i aynen kullandığını ve hiçbir book entry’nin `/read` URL’sine düşmediğini test et.
4. Reader preferences ve typography aynı shell contract’ıyla çalışsın.

### Phase 5 — Sidebar and mobile

1. “Kitaplar” ve “Makaleler” accessible headings, two-book `bookOrder`, part order, active chapter, collection-specific meters ve mobile drawer tests’ini yaz; combined meter bulunmadığını assert et.
2. `library-navigation.tsx` ve `book-reading-list.tsx` ile structural separation uygula.
3. Tag silindiğinde structural book group’un bozulmadığını; collection type bozulduğunda testin fail ettiğini kanıtla.
4. 390px viewport’ta clipping/overflow/focus behavior doğrula.

### Phase 6 — Reader data and sync

1. Yalnız `isPublicChapter` predicate’inden geçen chapter ID accepted; all-draft/mixed/unknown rejected; article ID unchanged için `sync-service` tests’i yaz.
2. `validArticleIds()` article-only kaynağını shared public-content registry ile değiştir; route/sidebar/dashboard ile aynı ID setini kullandığını assert et ve public payload/DB compatibility’yi koru.
3. Chapter progress, completion, saved place, highlight, dashboard deep link, offline outbox/reconnect ve iki-client conflict tests’i ekle.
4. Bu phase PASS olmadan gerçek chapter publish etme; P0 veri kaybı riski vardır.

### Phase 7 — Dashboard

1. Article ve chapter için generic href resolution tests’i yaz.
2. Book/article collection progress’i ayrı göster; saved place ve highlight chapter’a doğru link versin.
3. Tek birleşik yüzde üretme; her collection kendi meter’ını kullansın; all-draft veya predicate-failing book dashboard’da görünmesin.

### Phase 8 — Atomic content integration

1. Chapter dosyaları yazılırken catalog/manifest/19 entry status’larının tamamı `draft` kalır; part checkpoint’leri isolated published fixtures ile schema/reader/visual behavior’ı test eder.
2. Her part sonunda content validation, continuity, desktop/mobile fixture review ve adjacent navigation sweep yapılır; gerçek runtime visibility açılmaz.
3. Bütün 19 entry `CONTINUITY_VERIFIED` olduğunda catalog, manifest ve bütün entry status’larını tek patch’te `published` yap.
4. Section 16.5 status matrix, schema/content/route/sidebar/dashboard/progress/sync tests ve build’i çalıştır; tüm chapter’ları ancak bu kanıtla `APP_INTEGRATED`e geçir.
5. Her P0/P1 veya failed gate’te status’ları tek patch’te yeniden all-draft yap; fix + re-review sonrası atomic release’i tekrar dene. Mixed state hiçbir commit/checkpointte kabul edilmez.

### Phase 9 — Full regression and production proof

1. Bütün automated gates çalıştır.
2. 18 article hash/tuple baseline’ını yeniden karşılaştır.
3. Invalid citation, unresolved claim, broken internal link, duplicate slug/ID/order ve word/page validator’larını çalıştır.
4. Production server üzerinde desktop/mobile smoke ve password/auth flow yap.
5. İki bağımsız final review PASS sonrası publish-ready olarak işaretle; deploy/publish kullanıcı ayrıca istemedikçe yapılmaz.

## 22. Test and Validation Plan

### 22.1 Yeni test dosyaları

| Dosya | Kapsam |
|---|---|
| `src/lib/content/article-baseline.test.ts` | Exact 18 ID/order/slug/path/href; catalog v2 ve grouping invariants |
| `src/lib/content/markdown.test.tsx` | Existing article render parity, raw HTML drop, headings/GFM |
| `src/lib/content/library.test.ts` | Article/chapter union, display-ready ReaderEntry, canonical AdjacentEntry href, two-book order, per-collection meters, shared public predicate/valid-ID registry |
| `src/lib/content/books/schema.test.ts` | Regex, catalog/manifest/frontmatter, duplicate, contiguous order, status matrix, identity/tag cross-field invariants |
| `src/lib/content/books/catalog.test.ts` | Lexical + realpath guard, symlink/junction escape, atomic draft/published behavior, missing file fail-closed |
| `src/lib/content/books/book-content.test.ts` | Published file coverage, word budget, tags, citation hygiene, internal links |
| `src/components/reader/library-navigation.test.tsx` | Structural Book/Article separation, two-book order, part order, active/a11y, separate collection meters, no combined denominator |
| `src/lib/reader-data/server/sync-service.test.ts` | Article unchanged, published chapter accepted, unknown/draft rejected |
| `tests/e2e/book-reader.spec.ts` | Route, 404, adjacency, sidebar/mobile, progress/complete/resume, dashboard, preferences |
| `tests/e2e/book-reader-data.spec.ts` | Saved place, highlight, dashboard deep link, reload, offline outbox/reconnect, two isolated clients, server acceptance/conflict for published chapter |

Mevcut `catalog.test.ts`, `schema.test.ts`, reading-list tests, `reader.spec.ts` ve `reader-data.spec.ts` regressions olarak kalır; değiştirilerek book beklentilerine uydurulmaz.

### 22.2 Content validator assertions

`book-content.test.ts` bütün published chapters için şunları kanıtlar:

- Manifest/frontmatter IDs, slug, title, part ve stage eşleşir.
- Order 0–18 unique/contiguous; exact 19 immutable ID kullanılır.
- Publishable total word count ≥80.000; target report 93.000–97.000 sapmasını açıklar.
- Her chapter contract target’ının ±%10 dışında kalması dolgu ile değil reviewer justification ile çözülür.
- `book` ve `claude-code` dahil exact tag set bulunur.
- Geçici citation marker/mojibake/navlist/bare tool source ID yoktur.
- Publishable prose’da `UNVERIFIED`, `REJECTED`, `REQUIRES_FACT_CHECK` state marker’ı yoktur.
- Bütün Markdown links URL veya mevcut internal route’a gider; orphan source yoktur.
- Heading hierarchy `# → ## → ###` sırasını atlamaz; duplicate heading IDs yoktur.
- Chapter 18 yeni technical term tanımlamaz; terminology first-defined chapter 1–17 veya prologdur.
- Prolog ve Chapter 18 supplementary heading order/word budgets Section 7.3 ve 16.4 ile exact eşleşir.

### 22.3 Command gates

Bu sırayla ve pinned package manager ile çalıştır:

```powershell
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm format:check
corepack pnpm test
corepack pnpm build
corepack pnpm test:e2e
git diff --check
```

Her command exit 0 olmalıdır. `git diff --check` yalnız whitespace/patch hygiene kanıtıdır; article immutability kanıtı değildir. Immutability, `article-baseline.test.ts` exact tuple assertion’ı ve `checkpoints/article-baseline.json` SHA-256 karşılaştırmasıyla kanıtlanır. `corepack pnpm check` hızlı birleşik gate olabilir fakat E2E ve format check’i kapsamadığı için final kanıt yerine geçmez. Build network dependency’si veya Playwright browser binary’si eksikse `.wolf/cerebrum.md` talimatlarına göre dependency’yi kur; test atlama veya mock PASS üretme.

### 22.4 Manuel/visual acceptance flows

1. Dashboard’dan kitap prologuna gir; “Kitaplar”ın “Makaleler”den ayrı olduğunu gör.
2. Desktop sidebar’da part/chapter order, active state ve progress’i doğrula.
3. Mobile drawer’da 390px genişlikte focus, scrolling, close ve chapter navigation’ı doğrula.
4. Chapter ortasında scroll et, reload yap, aynı konuma dön.
5. Chapter tamamla; dashboard/book navigation completion’ı güncellesin.
6. Saved place/highlight oluştur; reload ve dashboard deep link üzerinden aynı chapter/canonical href’e dön.
7. Browser context A’yı offline yap, chapter mutation’larını outbox’a ekle, reconnect et; context B ile iki-client conflict/merge’i ve server’ın yalnız public chapter ID’yi kabul ettiğini doğrula.
8. İlk/son chapter adjacency null boundaries’i, unknown slugs 404’ü doğrula.
9. Mevcut bir `/read/[slug]` article’da sidebar, progress, preferences, marks ve navigation’ı yeniden smoke et.

## 23. Git and Safety Rules

1. Başlangıçta `git status --short` kaydet; dirty worktree’de kullanıcı değişikliklerini sahiplenme, silme veya formatlama.
2. `git reset`, `git restore`, `git checkout`, `git clean` ve destructive branch işlemleri yasaktır.
3. Existing `content/catalog.json` ve `content/articles/**` değiştirilemez. İlk oturumda SHA-256 + tuple baseline kaydet; finalde aynı hashleri doğrula.
4. Existing article IDs, order, batch, path, frontmatter, slug, title ve public URLs değiştirilemez.
5. Book çalışması dışında `.wolf`, `.claude`, `.codex` veya unrelated source değişikliklerini düzenleme.
6. Kullanıcı ayrıca istemedikçe branch açma, local commit, push, PR, deploy veya publish yapma. Bu handoff kendi başına Git history mutation yetkisi vermez.
7. İlk editten önce `book-production/tahminden-sisteme/checkpoints/task-paths.txt` oluştur. Allowlist yalnız bu handoff’ta “oluştur/değiştir” denilen exact paths’i içerir: `book-production/tahminden-sisteme/**`, `content/books/**`, seçili `src/lib/content/**`, seçili `src/components/reader/**`, `src/components/dashboard/**`, `src/app/books/**`, `src/app/page.tsx`, `src/lib/reader-data/server/sync-service.ts`, ilgili yeni/değişen test files ve yalnız gerçekten değişirse `package.json`/lockfile. `.wolf/**`, `.claude/**`, `.codex/**`, `content/catalog.json`, `content/articles/**`, `.env*` ve allowlist dışı path eklenemez. Required pre-existing file baseline’da dirty ise onu edit etmeden önce exact overlap için `DECISION_REQUIRED` aç; kullanıcı değişikliğini snapshot/commit içine alma.
8. Commit yetkisi yokken veri dayanıklılığı scoped checkpoint ile sağlanır. Her oturum sonunda allowlist’i PowerShell string array olarak yükle; `git diff --binary -- $taskPaths` ve `git ls-files --others --exclude-standard -- $taskPaths` kullan. Unscoped `git diff` veya tüm worktree untracked inventory yasaktır. Yalnız allowlistteki mevcut dosyaları `C:\dev\anil-lib-book-production-checkpoints\<timestamp>\` altında ZIP’e koy; scoped diff, scoped untracked inventory ve SHA-256 manifesti aynı klasöre yaz. ZIP’i ayrı temp dizinine açıp hashleri yeniden hesaplayarak doğrula. Secret, build output ve unrelated user files reject edilmelidir.
9. Kullanıcı local commit’e açıkça izin verirse yalnız allowlistteki task files’ı path-by-path stage et; pre-existing dirty paths’i commit’e alma. Push/PR/deploy ayrıca açık izin gerektirir.
10. Dependency eklemek ancak mevcut stack ile çözülemeyen kanıtlanmış gereksinim için mümkündür; önce decision log’a gerekçe/risk yaz.
11. Bulk mechanical edit öncesi exact file scope kaydet; her phase sonunda scoped `git diff --stat -- $taskPaths`, `git diff --check -- $taskPaths` ve ilgili tests çalıştır.
12. Agentlara write scope verildiğinde yalnız görev dosyalarını yazmalarına izin ver; final prose ve shared ledger ownership kurallarını koru.

## 24. Final Acceptance Criteria

Handoff uygulaması yalnız aşağıdaki toplu ifade kanıtlanabiliyorsa tamamdır:

1. Prolog + 18 chapter exact contract’larıyla `FINAL` durumunda.
2. Ön söz, sözlük, notasyon/kaynak okuma ekleri ve açıklamalı kaynakça hazır.
3. Toplam publishable word count ≥80.000 ve planlanan 93–97k bandından sapma açıklanmış; 100+ page konservatif formülle kanıtlanmış.
4. Chapter Gate bütün chapter’larda PASS; hiçbir açık P0/P1 yok.
5. Book Gate bütün satırlarda PASS; iki bağımsız final review PASS.
6. Claim/source coverage tam; publishable prose’da unresolved claim veya invalid citation marker yok.
7. Tek yazar sesi, terminology ve continuity corpus-wide PASS.
8. Book structural sidebar, mobile, dashboard, route, progress, completion, highlights, saved places ve sync’te çalışıyor.
9. Existing 18 article immutable baseline tam eşleşiyor; old route/E2E regressions yeşil.
10. Type-check, lint, format check, unit/component, build, E2E ve diff check exit 0.
11. `session-handoff.md` final state’i ve bütün evidence paths’i gösteriyor.
12. Açık `DECISION_REQUIRED` yok. Gerçek bir ürün kararı açık kalırsa sonuç ready olamaz.

Bu kriterlerden biri kanıtsızsa final karar `BOOK_HANDOFF_NOT_READY` olur. Hepsi doğrudan dosya/test/review kanıtıyla doğrulanırsa `BOOK_HANDOFF_READY_FOR_CLAUDE_CODE` yerine uygulama sonucu için `BOOK_PRODUCTION_COMPLETE` kaydı düşülür.

## 25. First Execution Sequence

Claude Code ilk oturumda kullanıcıya soru sormadan şu sırayı uygular:

1. `C:\dev\anil-lib` içinde `.wolf/OPENWOLF.md`, `.wolf/anatomy.md`, `.wolf/cerebrum.md`, `CLAUDE.md`, `.wolf/buglog.json` ve bu handoff’u oku.
2. `git status --short`, `git rev-parse HEAD`, `corepack pnpm --version` çalıştır; başlangıç SHA’sını ve dirty paths’i kaydet. Bu handoff hazırlanırken gözlenen SHA `db414b396568f9aa4f5f7e14601afaa8c2d69855` idi; execution anındaki SHA authoritative’dır ve fark decision log’a yazılır.
3. `content/catalog.json`, `content/ingestion-report.md`, `prompts/writing-handoff.md`, prompt 01/02, content lib, reader components, app routes, reader-data sync ve ilgili tests’i tekrar doğrula; bulunmayan özellik varsayma.
4. `book-production/tahminden-sisteme/**` memory tree’sini oluştur; bu handoff’taki mission, IDs, contracts ve decisions’ı canonical dosyalara kopyala.
5. 18 article SHA-256 + `(id, order, slug, path, href)` baseline’ını `checkpoints/article-baseline.json` içine yaz.
6. Mevcut `corepack pnpm typecheck`, `lint`, `test`, `build` ve mümkünse E2E baseline’ını çalıştır; pre-existing failure’ı ayrı kaydet.
7. Phase 0 characterization tests’ini yaz ve geçir.
8. Phase 1 shared Markdown extraction’ı TDD ile yap; article render parity kanıtla.
9. Phase 2 article-only library adapter refactor’ını TDD ile yap; bütün article behavior yeşil kalsın.
10. Phase 3 book schema/loader tests ve implementation’ını yap; immutable book/chapter IDs’i kullan.
11. `content/books/catalog.json` ve draft manifesti oluştur; absent draft chapter file’ları runtime’a sokma.
12. Phase 4–7 route/sidebar/sync/dashboard entegrasyonunu test-first uygula. Sync union P0 çözülmeden publishable chapter açma.
13. Prolog ve Chapter 1 için claim task packets oluştur; en güçlü kullanılabilir research agentları paralel fakat read-only çalıştır.
14. Source verifier PASS sonrası Prolog ve Chapter 1’i state machine’den geçir. Tek aktif writer kuralını koru.
15. Sırayla Parts I–V’yi üret. Bir part bitmeden sonraki part prose’una geçme; yalnız research hazırlığı yapılabilir.
16. Her part sonunda redundancy/continuity ve app visual checkpoint üret.
17. Bütün chapter’lar `APP_INTEGRATED` olduğunda corpus-wide editorial/freshness turu yap.
18. Chapter independent reviews ve iki final adversarial review’ı çalıştır; P0/P1’leri düzeltip re-review yap.
19. Full automated + manual Book Gate’i çalıştır; article hashes’i karşılaştır.
20. `session-handoff.md`, final deliverables index ve evidence map’i güncelle. Commit/push/deploy yapmadan sonucu kullanıcıya bildir.

## 26. Continuation Prompt for New Sessions

Yeni Claude/Codex oturumuna aşağıdaki metni aynen ver:

```text
C:\dev\anil-lib içindeki devam eden “Tahminden Sisteme” book-production görevini sürdür.

Önce repository talimatları gereği .wolf/OPENWOLF.md, .wolf/anatomy.md ve .wolf/cerebrum.md dosyalarını oku. Ardından yalnız şu dosyaları sırayla oku:

1. prompts/03-build-zero-to-hero-ai-book.md
2. book-production/tahminden-sisteme/session-handoff.md
3. session-handoff.md içindeki files_to_read listesi
4. book-production/tahminden-sisteme/chapter-ledger.md
5. book-production/tahminden-sisteme/decisions.md
6. book-production/tahminden-sisteme/terminology.md

git status --short ile kullanıcı değişikliklerini gör ve koru. Bütün brief’i yeniden yorumlama; decisions.md canonical’dır. Checkbox ile progress tutma. session-handoff.md içindeki next_single_task dışında yeni işe başlama. Aynı chapter için ikinci writer açma. Mevcut lifecycle state’ini atlama. Kaynak/agent özetini otomatik doğru kabul etme. Claude kendi yazdığı chapter’a tek başına FINAL veremez.

Görev sırasında limit yaklaşırsa yeni geniş işe başlama. Mevcut atomik işi güvenli noktaya getir, chapter-ledger.md ve session-handoff.md alanlarının tamamını güncelle, açık riskleri ve sıradaki tek görevi yaz, sonra dur.
```

## 27. Final Deliverables

### 27.1 Publishable book

- `content/books/catalog.json`
- `content/books/tahminden-sisteme/book-manifest.json`
- `content/books/tahminden-sisteme/chapters/00-...md` ile `18-...md` arasında 19 publishable Markdown dosyası
- Prolog dosyasının başında ön söz/kullanım rehberi; Chapter 18 dosyasının sonunda sözlük, notasyon/kaynak okuma eki ve açıklamalı kaynakça; Section 7.3/16.4 exact heading order’ıyla

### 27.2 Production memory and evidence

- `book-production/tahminden-sisteme/book-brief.md`
- `chapter-ledger.md`, `decisions.md`, `terminology.md`, `source-register.md`, `corpus-map.md`, `continuity-map.md`, `open-questions.md`, `session-handoff.md`
- `reviews/` altında chapter ve final review’lar
- `checkpoints/` altında baseline, part checkpoints, command outputs, visual evidence ve final acceptance map

### 27.3 Application and tests

- Separate book domain loaders/schemas, shared library adapter/Markdown processor, book route, collection-aware sidebar/mobile/dashboard ve unified reader-data sync validation
- Section 22’deki bütün yeni tests; existing tests korunmuş
- Final command log ve manual acceptance evidence

### 27.4 Claude’un kullanıcıya vereceği son rapor

Yalnız şunları raporla: book path/manifest, gerçek chapter/word/page sayısı, corpus reuse/rewrite özeti, sidebar/tag architecture sonucu, kullanılan agent/CLI run log’u, açık `DECISION_REQUIRED` maddeleri, automated gate sonuçları, iki independent review sonucu ve article immutability kanıtı. Kanıtı olmayan “tamamlandı” ifadesi kullanma.

---

`BOOK_HANDOFF_READY_FOR_CLAUDE_CODE`
