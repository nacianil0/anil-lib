# "Sıfırdan Yüze: Yapay Zekâ" — Seri Sözleşmesi

> **Bu dosya serinin değişmez referans sözleşmesidir.** 1'den 100'e kadar her makale, her batch
> ve her handoff bu kurallara bağlıdır. Yeni bir oturum seriye devam etmeden önce bu dosyayı,
> `docs/seri/HANDOFF.md`'yi ve son "next batch preparation" kaydını okumak **zorundadır**.
> Sözleşme ancak kullanıcının açık talebiyle değiştirilebilir; değişiklik yapılırsa sonuna
> tarihli bir değişiklik notu eklenir ve mevcut makalelerle çelişki oluşturulmaz.

Sürüm: 1.0 · Oluşturma: 2026-08-25 · Kapsam: Makale 1–100

---

## 1. Seri kimliği ve teknik sözleşme

- Seri adı: **Sıfırdan Yüze: Yapay Zekâ**. Rota: `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu).
- İçerik: `content/series/articles/<kategori>/<slug>.md` · Katalog: `content/series/catalog.json` ·
  Diyagram: `content/series/assets/<slug>/*.svg` · UI yol haritası: `content/series/roadmap.json`.
- Frontmatter ve katalog şeması mevcut kütüphaneyle aynı şekildedir (article_id `article_<uuid>`,
  kebab-case slug, kategori, level, reading_order, summary, tags, content_hash `sha256:<hex>`
  = makale gövdesinin (frontmatter sonrası, trim edilmiş) UTF-8 SHA-256'sı, classification_version 1,
  classification_batch).
- `classification_batch` = üretim batch'i: Batch 0 → makale 1–5, Batch 1 → 6–10, … Batch 19 → 96–100.
  `reading_order` seri içinde 1'den kesintisiz artar. Bir makale yayımlandıktan sonra id, slug ve
  reading_order **asla değişmez**.
- Kategoriler mevcut kontrollü sözlüktür: `foundations`, `models-and-training`,
  `reasoning-and-memory`, `agents-and-retrieval`, `safety-and-evaluation`,
  `multimodal-and-future`, `case-studies`. Level: `beginner` (1–35 civarı), `intermediate`
  (36–70 civarı), `advanced` (71–100 civarı); sınırlar makale bazında pedagojiye göre esner.
- Ham HTML markdown'da düşürülür; **asla ham HTML yazma**. Görseller için yalnızca
  `![alt](assets/dosya.svg "Şekil N — başlık")` sözdizimi (bkz. §6).
- Yayın öncesi her batch için zorunlu kapılar: `corepack pnpm typecheck`, `corepack pnpm test`,
  `corepack pnpm build` + dev server'da gerçek render (mobil/desktop; light/dark/sepia temalar;
  konsol hatasız). `catalog.json` ↔ frontmatter alanları birebir eşleşmek zorundadır (build doğrular).

## 2. Editoryal kurallar

- Dil: Türkçe; teknik terimler ilk geçtiği yerde Türkçe karşılığı + orijinal İngilizcesiyle verilir
  ("kayıp fonksiyonu (loss function)"), sonrasında yerleşik biçim hangisiyse o kullanılır ve
  **seri boyunca aynı kalır** (terim defteri: YOL-HARITASI §Terimler).
- Ton: ciddi ama sıcak; okuyucuya "sen" diye hitap edilir; yüzeysel popüler bilim üslubu ve
  sansasyonel dil yasak ("devrim yarattı" yerine ne değiştiğini söyle).
- Yapı: H1 başlık yok (başlık frontmatter'dadır; gövde H2 ile başlar). H2 bölümler numarasızdır ve
  içerik odaklı adlar taşır. Uzunluk hedefi 2.000–3.500 kelime (10–18 dk okuma); konu gerektirmedikçe
  aşılmaz.
- Her makalede sıralı katmanlar: **önce sezgi → sonra mekanizma → sonra teknik ayrıntı → sonra
  akademik bağlam.** Matematik kullanılabilir ama her formül önce sözle, sonra sembolle anlatılır ve
  küçük sayısal örnekle gösterilir.
- Zorunlu bölümler: giriş köprüsü (bkz. §5), gövde, "### Sırada ne var" (bir sonraki makaleye köprü,
  2–4 cümle), "## Kaynakça" (bkz. §4).
- Yasaklar: doldurma cümleler, tekrar eden özet paragrafları, kaynaksız sayısal iddia, TODO/placeholder,
  İngilizce cümle araya sıkıştırma, emoji.

## 3. Pedagojik kurallar (kanıta dayalı, mekanik şablona dönüştürmeden)

Seri, öğrenme bilimi literatürünün şu ilkelerine göre tasarlanır — ilkeler araçtır, şablon değildir;
bir makalede hangisinin kullanılacağına içerik karar verir:

- **Prerequisite zinciri:** Her makale, yol haritasında listelenen önkoşul makalelerin kavramlarına
  dayanır ve **yeni bir kavramı ancak önkoşulları kurulmuşsa** kullanır. Bir kavram henüz
  anlatılmadıysa ismi telaffuz edilip "ileride" işareti konur (progressive disclosure).
- **Bilinçli yeniden çağırma (spaced repetition):** Önceki makalelerin kritik kavramları sonraki
  makalelerde artan aralıklarla yeniden kullanılır. Okuyucunun unutmuş olabileceği varsayılır:
  kritik kavram geri çağrılırken 1–3 cümlelik mini yeniden kurulum yapılır ve ilk anlatıldığı
  makaleye bağlanır ("3. makalede görmüştük: …"). Hangi kavramın nerede tekrar edileceği
  YOL-HARITASI'ndaki **kavram-tekrar defterinde** planlanır ve her batch'te güncellenir.
  Kanıt notu (Cepeda ve ark. 2008): asıl kalıcılığı sağlayan **uzun aralıklı** geri çağrılardır;
  bir sonraki makaledeki hatırlatma köprü işlevi görür, gerçek "spacing" 10+ makale sonraki
  bilinçli tekrarlardır — defter iki türü de planlar.
- **Retrieval practice:** Her makalede 1–3 adet "**Kendini yokla**" kutusu (blockquote içinde,
  `**Kendini yokla:**` ile başlar): okuyucuya cevabı metinde verilmiş bir soruyu hatırlatmadan sorar,
  **bir sonraki paragrafta mutlaka kısa cevap verilir** (öğretmensiz ortamda cevapsız soru,
  sorusuzluktan kötüdür — Carpenter ve ark. 2022). Sorular ezber değil kavrayış ölçer ve **tek
  seferde tek ilişkiyi** hedefler; "tüm mekanizmayı anlat" tarzı bileşik soru sorulmaz (karmaşık
  malzemede test etkisinin zayıfladığına dair van Gog–Sweller/Karpicke tartışması nedeniyle).
- **Worked examples:** Her mekanizma en az bir somut, sayıları gerçek, adım adım izlenebilir örnekle
  gösterilir (ör. 3 sayılık gradyan inişi adımı). Örnekler bilişsel yükü azaltmak için küçük tutulur.
- **Cognitive load yönetimi:** Bir makale en fazla 2–3 yeni çekirdek kavram tanıtır. Yan ayrıntılar
  "İleri okuma notu" olarak ayrılır. Diyagramlar metinle aynı terimleri kullanır (split-attention'ı
  önlemek için şekil içi etiketler metnin terimleriyle birebir aynıdır).
- **Interleaving — dar kapsamlı kural:** Kanıt (Brunmair & Richter 2019 meta-analizi) interleaving'in
  düz açıklayıcı metinlerde genel bir fayda sağlamadığını, faydanın **karıştırılabilir kavramları
  yan yana ayrıştırmakta** olduğunu gösterir. Bu yüzden konu sırası "karıştırılmaz"; bunun yerine
  karıştırılması muhtemel kavram çiftleri (ör. parametre/hiperparametre, fine-tuning/RAG/prompt,
  denetimli/öz-denetimli) aynı bölümde açıkça karşılaştırılarak öğretilir.
- **Scaffolding ve fade schedule:** Yeni kavram eski kavramların üzerine açıkça bindirilir; iskele
  (tam adım adım örnek, analoji-önce anlatım, terim yeniden tanımı) serinin başında yoğundur ve
  seri ilerledikçe **bilinçli olarak azaltılır** (expertise reversal — Kalyuga ve ark. 2003:
  acemiye yardım eden destek, uzmanlaşan okuyucuya yük olur). 1–35 arası tam iskele, 36–70 arası
  seçici iskele, 71–100 arası yalnızca yeni kavramlarda iskele.
- **Analoji disiplini (concreteness fading):** Her analoji sınırıyla birlikte verilir ("bu benzetme
  şurada bozulur: …") ve **mutlaka biçimsel karşılığına bağlanır** ("bu benzetmenin gerçek nesnesi
  şudur: …") — somutta başlayıp soyuta açıkça köprülenmeyen analoji yarım bırakılmış sayılır
  (Fyfe ve ark. 2014). Yanlış sezgi yerleştiren analoji, hiç analoji olmamasından kötüdür.
- **Süsleyici ayrıntı yasağı (seductive details):** İlginç ama açıklama yükü taşımayan anekdot,
  ekran görüntüsü veya yan hikâye öğrenmeyi ölçülebilir biçimde düşürür (Sundararajan & Adesope
  2020). Kural "sıkıcı ol" değil: ilginç olan şey açıklamanın kendisini taşımalı; taşımıyorsa
  metinden çıkar.
- **Uzman kör noktasına karşı mekanik denetim:** "Acemiye göre yaz" niyeti yeterli değildir
  (Nathan ve ark. 2001). Mekanik kurallar: hiçbir terim/sembol ilk tanımından önce kullanılmaz;
  her formül önce sözle söylenir; her makale yayına girmeden "tanımsız terim taraması" yapılır.

## 4. Kaynak ve atıf kuralları

- Yeni veya güçlü her iddia birincil kaynağa dayanır: hakemli makale, büyük konferans bildirisi,
  önemli arXiv çalışması, araştırma laboratuvarının resmi yayını veya klasik temel eser.
  **Hakemlenmemiş çalışma hakemli gibi sunulmaz**; metinde "hakemli olmayan ön çalışma" gibi
  dürüst bir ifadeyle işaretlenir.
- Metin içinde atıf doğal akışta yapılır: çalışmanın adı tek başına bırakılmaz; gerektiğinde
  yazar(lar) ve çalışmanın neden önemli olduğu 1–2 cümleyle anlatılır. Köşeli parantezli
  numaralandırma kullanılmaz.
- Makale sonunda `## Kaynakça` bölümü: `- Yazar(lar) (Yıl). *Başlık*. Yayın yeri. [Bağlantı](url)`
  biçiminde, metinde geçen sırayla. Yalnızca gerçekten kullanılan kaynaklar listelenir.
- Sayısal iddialar (yıllar, oranlar, benchmark sonuçları) yayına girmeden bağımsız doğrulanır;
  doğrulanamayan iddia ya çıkarılır ya da belirsizliğiyle birlikte verilir.
- Uydurma/teyitsiz URL yasak. Her bağlantı yayın öncesi kontrol edilir.

## 5. Zincirleme köprü kuralları

- **Giriş köprüsü:** Her makale (1 hariç) ilk bölümünde, önceki makale(ler)de kurulmuş hangi
  kavramların üzerine bineceğini 2–4 cümleyle hatırlatır ve bu makalenin sorusunu netleştirir.
- **İleri köprü:** "### Sırada ne var" bölümü bir sonraki makalenin sorusunu merak uyandıracak ama
  spoiler vermeyecek şekilde kurar.
- **Batch içi bütünlük + batch'ler arası bağ:** Her 5'li batch kendi içinde tutarlı bir mini-yay
  oluşturur; ilk makalesi önceki batch'in özetine, son makalesi sonraki batch'in sorusuna bağlanır.
- Makaleler arası bağlantı verilecekse rota `/seri/<slug>` biçimindedir (mutlak, site içi).
  Mevcut kütüphane makalelerine bağlantı verilmez (seri kendi başına anlaşılır olmalı).

## 6. Görselleştirme kuralları

- Her makalede **en az 2 öğretici diyagram**; dekoratif görsel yasak. Diyagram, metnin anlatamadığı
  yapıyı (akış, mimari, karşılaştırma, uzay/geometri, zaman çizgisi) gösterir ve metinde açıkça
  referanslanır ("Şekil 2'deki gibi…").
- Biçim: elle yazılmış temiz SVG, `content/series/assets/<slug>/` altında. Markdown'da
  `![erişilebilir alt metin](assets/dosya.svg "Şekil N — başlık")`. `title` şekil başlığına
  (figcaption) dönüşür; `alt` ekran okuyucu içindir ve şeklin öğrettiği şeyi özetler.
- **Tema kuralı:** Renkler yalnızca CSS değişkenleriyle verilir: `var(--text)`, `var(--text-muted)`,
  `var(--text-faint)`, `var(--accent)`, `var(--accent-soft)`, `var(--cool)`, `var(--cool-soft)`,
  `var(--surface)`, `var(--surface-muted)`, `var(--border)`, `var(--bg)`. Sabit hex renk yasak
  (light/dark/sepia üç temada da okunaklı olmak zorunda). Yazı tipi belirtilmez (CSS devralır).
- SVG'de `script`, `foreignObject`, olay öznitelikleri (`on*`) yasak (pipeline zaten düşürür).
  `viewBox` zorunlu; genişlik ~640–760 birim; metin boyutu ≥13 birim; mobilde okunaklılık
  dev server'da doğrulanır.
- Diyagram etiketleri Türkçedir ve metindeki terimlerle birebir aynıdır.
- Çoklu ortam ilkeleri (Mayer & Fiorella 2014): **tutarlılık** — dekoratif öğe yok (d=0.86);
  **işaretleme** — yalnızca önemli olan yol vurgulanır, her şeyi vurgulamak hiçbir şeyi
  vurgulamamaktır (d=0.41); **uzamsal yakınlık** — etiketler şeklin üzerinde/içinde durur,
  ayrı lejant kullanılmaz ve şekil, metinde onu açıklayan paragrafın hemen yanına konur (d≈0.7+).

## 7. 5+1 çalışma ritmi (değişmez)

- İçerik üretimi **her zaman 5'li batch** halindedir: bir görevde yalnızca sıradaki 5 makale yazılır.
  Bir batch tamamlanmadan sonrakine geçilmez; tek seferde 5'ten fazla makale yazılmaz.
- **+1 hazırlık işi:** 5 makale tamamlanıp doğrulandıktan hemen sonra, aynı görev içinde
  `docs/seri/HANDOFF.md`'ye bir **"Next batch preparation"** kaydı yazılır: sonraki 5 makalenin
  (a) pedagojik hedefleri, (b) prerequisite ilişkileri, (c) yeniden çağrılacak eski kavramlar ve
  planlanan hatırlatmalar, (d) araştırılması gereken güncel akademik alanlar, (e) olası
  görselleştirme ihtiyaçları. **Sonraki 5 makale o görevde yazılmaz.**
- Yeni oturum akışı: (1) bu sözleşmeyi oku, (2) HANDOFF.md'yi ve son hazırlık kaydını oku,
  (3) YOL-HARITASI'ndan ilgili batch'in öğrenme notlarını oku, (4) araştırma → yazım → inceleme →
  entegrasyon → doğrulama → yeni handoff + yeni hazırlık kaydı.
- Bu ritim, zincirleme atıf yapısı ve sözleşmeye bağlılık **100. makaleye kadar her handoff'a
  aynen miras bırakılır**; her HANDOFF.md sürümü bu maddeyi açıkça tekrarlar.

## 8. Handoff ve kalıcı öğrenme notları

- `docs/seri/HANDOFF.md` yaşayan devir dosyasıdır: seri durumu, tamamlanan makaleler, sıradaki batch,
  önemli editoryal/teknik kararlar, son hazırlık kaydı. Her batch sonunda güncellenir.
- `docs/seri/YOL-HARITASI.md` kalıcı öğrenme defteridir: 100 makalelik omurga, makale-başına odak,
  **prerequisite grafı** (hangi makale hangilerine dayanır), **kavram-tekrar defteri** (hangi kavram
  hangi makalelerde yeniden çağrılacak), terim defteri. Batch tamamlandıkça gerçekleşen tekrarlar
  işaretlenir, gelecek tekrarlar planlanır.
- `content/series/roadmap.json` UI'nin gösterdiği listedir; bir batch yayına girdiğinde ilgili
  kayıtların `status` değeri `yayinda` yapılır ve `slug` eklenir. YOL-HARITASI ile başlık düzeyinde
  senkron tutulmak zorundadır (başlık değişirse ikisi birden güncellenir).
- Roadmap'teki 6–100 başlıkları **taslaktır**; batch hazırlığında pedagojik gerekçeyle
  değiştirilebilir (yayımlanmış makaleler asla).

## 9. Üretim süreci kuralları

- Araştırma, kaynak doğrulama, eleştirel inceleme ve zincir tutarlılık kontrolü ayrıştırılabilir
  işlerdir ve subagent'lara dağıtılabilir; **kritik kararlar, sentez, çelişki çözümü ve son kabul
  ana agent'tadır**. Güçlü model erişimi varsa araştırma/doğrulama/final inceleme işleri en güçlü
  Opus sınıfı modele verilir.
- Her makale yayına girmeden: (a) iddia-kaynak eşleşmesi adversarial kontrol edilir,
  (b) zincir tutarlılığı (terimler, köprüler, tekrar planı) denetlenir, (c) diyagramlar üç temada
  gerçek render'da görülür.
- Bir inceleme bulgusunda çelişki varsa karar ana agent'ındır ve gerekçesi HANDOFF'a not edilir.

## 10. Pedagoji kaynakları (sözleşmenin dayanağı)

Bu sözleşmenin §3 ilkeleri, sınır koşullarıyla birlikte şu literatüre dayanır (doğrulanmış ayrıntılı
paket: Batch 0 araştırma kayıtları, `06-pedagoji`):

- Spacing: Ebbinghaus 1885 (Murre & Dros 2015 replikasyonu); Cepeda ve ark. 2006 (Psych. Bulletin,
  839 değerlendirme) ve 2008 ("temporal ridgeline": optimal aralık ≈ hedef kalıcılık süresinin %10–20'si).
- Retrieval practice: Roediger & Karpicke 2006 (çaprazlama bulgusu); Yang ve ark. 2021 (sınıf
  meta-analizi, g=0.499); Dunlosky ve ark. 2013 (yüksek fayda: test + spacing; düşük fayda: yeniden
  okuma/vurgulama). Sınırlar: Pan & Rickard 2018 (transfer dar, d=0.40); van Gog–Sweller 2015 vs
  Karpicke–Aue 2015 (karmaşık malzeme tartışması); Carpenter ve ark. 2022 (geri bildirim şart).
- Interleaving sınırı: Brunmair & Richter 2019 (açıklayıcı metinde etkisiz, kelime öğreniminde
  negatif; fayda karıştırılabilir kategorilerde).
- Bilişsel yük: Sweller 1988; Sweller, van Merriënboer & Paas 2019; çalışma belleği 3–5 öbek
  (Cowan 2001 — "7±2" güncel değil).
- Worked examples: Sweller & Cooper 1985; fading: Renkl & Atkinson 2003; self-explanation:
  Chi ve ark. 1989; expertise reversal: Kalyuga ve ark. 2003.
- Scaffolding: Wood, Bruner & Ross 1976 (altı işlev; "scaffolding" Vygotsky'nin sözcüğü değildir);
  ZPD: Vygotsky 1978.
- Diyagram ilkeleri: Mayer & Fiorella 2014 (tutarlılık/işaretleme/uzamsal yakınlık); süsleyici
  ayrıntı maliyeti: Sundararajan & Adesope 2020.
- Arzu edilen zorluklar ve sınırı: Bjork 1994; Bjork & Bjork 2020 (önkoşulsuz zorluk, zorluktur);
  akıcılık yanılsaması: Soderstrom & Bjork 2015.
- Somuttan soyuta köprü: Fyfe ve ark. 2014. Uzman kör noktası: Nathan, Koedinger & Alibali 2001.
- Öğrenme stilleri miti reddi: Pashler ve ark. 2008 (seri asla "görsel öğrenen" vaadi vermez).
