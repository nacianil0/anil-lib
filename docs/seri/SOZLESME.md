# "Sıfırdan Yüze: Yapay Zekâ" — Seri Sözleşmesi

> **Bu dosya serinin kalıcı normatif sözleşmesidir.** Yayımlanmış ve yayımlanacak her makale,
> her üretim run'ı ve her handoff bu kurallara bağlıdır. Yeni bir oturum seriye devam etmeden
> önce bu dosyayı, `docs/seri/HANDOFF.md`'yi ve yol haritasının ilgili bölümlerini okumak
> **zorundadır**. Sözleşme ancak kullanıcının açık talebiyle değiştirilebilir; değişiklik
> yapılırsa sonuna tarihli bir değişiklik notu eklenir ve mevcut makalelerle çelişki oluşturulmaz.

Sürüm: 2.0 · Oluşturma: 2026-08-25 · Son revizyon: 2026-08-28 · Kapsam: serinin bütün yaşam döngüsü

---

## 1. Seri kimliği ve teknik sözleşme

- Seri adı: **Sıfırdan Yüze: Yapay Zekâ**. "Sıfırdan Yüze" bir marka adıdır, makale sayısı
  taahhüdü değildir; serinin uzunluğu yol haritasındaki bilgi grafından doğar.
- Rota: `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu).
- İçerik: `content/series/articles/<kategori>/<slug>.md` · Katalog: `content/series/catalog.json` ·
  Diyagram: `content/series/assets/<slug>/*.svg` · UI yol haritası: `content/series/roadmap.json`.
- Frontmatter ve katalog şeması mevcut kütüphaneyle aynı şekildedir (article_id `article_<uuid>`,
  kebab-case slug, kategori, level, reading_order, summary, tags, content_hash `sha256:<hex>`
  = makale gövdesinin (frontmatter sonrası, trim edilmiş) UTF-8 SHA-256'sı, classification_version 1,
  classification_batch).
- `classification_batch` = üretim kohortu: her başarılı üretim run'ı, makale sayısından bağımsız
  olarak bir sonraki kesintisiz batch numarasını alır. Batch 0 → makale 1–5 ve Batch 1 → 6–10
  tarihsel gerçektir; "Batch k daima beş makaledir" gibi bir aralık formülü **yoktur**.
  `reading_order` seri içinde 1'den kesintisiz artar. Bir makale yayımlandıktan sonra id, slug ve
  reading_order **asla değişmez**.
- Kategoriler mevcut kontrollü sözlüktür: `foundations`, `models-and-training`,
  `reasoning-and-memory`, `agents-and-retrieval`, `safety-and-evaluation`,
  `multimodal-and-future`, `case-studies`. Level (`beginner`/`intermediate`/`advanced`) makale
  bazında pedagojiye göre verilir; genel eğilim faz yapısını izler (giriş fazları beginner,
  orta fazlar intermediate, matematiksel omurga ve sonrası advanced) fakat sabit numara aralığına
  bağlanmaz.
- Ham HTML markdown'da düşürülür; **asla ham HTML yazma**. Görseller için yalnızca
  `![alt](assets/dosya.svg "Şekil N — başlık")` sözdizimi (bkz. §6).
- Yayın öncesi her batch için zorunlu kapılar: `corepack pnpm typecheck`, `corepack pnpm test`,
  `corepack pnpm build` + dev server'da gerçek render (mobil/desktop; light/dark/sepia temalar;
  konsol hatasız). `catalog.json` ↔ frontmatter alanları birebir eşleşmek zorundadır (build doğrular).
  İçerik denetleyicileri: `node tools/series/check-series-content.cjs`,
  `node tools/series/check-series-svg.cjs`, `node tools/series/sync-series-hashes.cjs`.

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
- **Bilinçli formalizasyon:** Erken makalelerde sezgiyle kurulan kavramlar, ileri fazlarda
  "önce sezgisel gördük, şimdi formal kuruyoruz" köprüsüyle matematiksel/biçimsel düzeyde
  yeniden kurulur. Bu bilinçli yeniden kurulum tekrar sayılmaz; hangi kavramın nerede
  derinleşeceği YOL-HARITASI'nda izlenir.
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
  acemiye yardım eden destek, uzmanlaşan okuyucuya yük olur). Giriş fazlarında tam iskele, orta
  fazlarda seçici iskele, ileri fazlarda (matematiksel omurga ve sonrası) yalnızca yeni
  kavramlarda iskele.
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
- **Batch içi bütünlük + batch'ler arası bağ:** Her batch kendi içinde tutarlı bir mini-yay
  oluşturur; ilk makalesi önceki batch'in özetine, son makalesi sonraki batch'in sorusuna bağlanır.
- **Numaralı ileri vaat disiplini:** Metin içinde "N. makalede ele alacağız" biçiminde numaralı söz
  vermek bağlayıcıdır: yayımlanmış bir makalenin verdiği numaralı vaat, yol haritasında o numarada
  karşılanmak zorundadır (vaat defteri: YOL-HARITASI §Yayımlanmış vaatler). Yeni makalelerde
  numaralı vaat yalnızca gerçekten gerekliyse ve yol haritasının sağlam bölgesine verilir;
  konu yeterince yakınsa numarasız ("ileride") işaret tercih edilir.
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
  dev server'da doğrulanır. Marker/defs id'leri sayfa genelinde benzersizdir (pipeline id'leri
  yeniden yazmaz).
- Diyagram etiketleri Türkçedir ve metindeki terimlerle birebir aynıdır.
- Çoklu ortam ilkeleri (Mayer & Fiorella 2014): **tutarlılık** — dekoratif öğe yok (d=0.86);
  **işaretleme** — yalnızca önemli olan yol vurgulanır, her şeyi vurgulamak hiçbir şeyi
  vurgulamamaktır (d=0.41); **uzamsal yakınlık** — etiketler şeklin üzerinde/içinde durur,
  ayrı lejant kullanılmaz ve şekil, metinde onu açıklayan paragrafın hemen yanına konur (d≈0.7+).

## 7. Üretim ritmi — kanonik batch sözleşmesi

Bu bölüm, serinin üretim ritminin **tek kalıcı tanımıdır**. HANDOFF ve trigger bu semantiği
yeniden anlatmaz; yalnızca buraya referans verir.

- **Varsayılan ritim `BATCH=5+1`'dir:** bir üretim run'ında sıradaki 5 yayımlanmamış makale
  üretilir, ardından tek bir hazırlık/state-geçiş fazı yapılır.
- **Override yalnızca exact assignment ile olur:** geçerli tek biçim `BATCH=N+1` satırıdır
  (regex: `^BATCH=([1-9][0-9]*)\+1$`). Çözüm önceliği: (1) kullanıcının mevcut mesajındaki en
  güncel geçerli assignment, (2) çalıştırılan trigger'daki tek assignment, (3) güvenli fallback
  `5+1`. Düz yazıdaki "2 makale" gibi ifadeler, roadmap sıra numaraları veya tarihsel batch
  adları override **değildir**. Güncel bir kullanıcı assignment'ı yalnızca o run'ı etkiler;
  kalıcı varsayılanı değiştirmez.
- **`N`:** bu run içinde sırada bulunan tam olarak kaç yayımlanmamış makalenin araştırılıp
  yazılacağını, repoya entegre edilip doğrulama kapılarından geçirileceğini söyler. Roadmap'te
  kalan makale sayısı `N`'den azsa doldurma konusu icat edilmez; kalan gerçek makaleler
  tamamlanır ve `+1` fazında seri tamamlanmış/yeniden planlama gerektirir state'ine geçirilir.
- **`+1`:** bir makale değil, `N` makalenin entegrasyonu ve doğrulaması bittikten sonra yapılan
  **tek hazırlık/state-geçiş fazıdır**: HANDOFF cursor'ı ve bir sonraki güvenli başlangıç,
  yol haritasındaki durum/prerequisite/tekrar kayıtları, açık borçlar ve sıradaki run için
  bounded hazırlık notu güncellenir; çapraz state tutarlılığı doğrulanır. `+1` sırasında sonraki
  makalenin gövdesi yazılmaz. `N` tamamlanmadan gerçek bir dış engel oluşursa `+1` yapılmış gibi
  gösterilmez; mevcut state ve engel dürüstçe kaydedilir.
- **Kohort numarası:** her başarılı run, makale sayısından bağımsız olarak bir sonraki kesintisiz
  `classification_batch` değerini alır (bkz. §1).
- Batch büyüklüğü değişse de akademik kalite, prerequisite zinciri, kaynak doğrulaması, görsel
  standardı, entegrasyon ve doğrulama kapıları düşürülemez.

## 8. Yaşayan state sahipliği

Sorumluluklar domain bazlıdır; çelişki kabul edilmez ve şu sırayla çözülür:

1. **Yayımlanmış gerçek:** makale dosyaları + frontmatter + `catalog.json` ve doğrulanan
   route/id/hash bilgileri. Geçmiş hakkında en yüksek otoritedir; hiçbir plan dosyası onu
   geçersiz kılamaz.
2. **Bu sözleşme (`SOZLESME.md`):** uzun ömürlü normatif kurallar, kalite kapıları, üretim
   ritmi (§7) ve state sahipliği. Yalnızca policy değişince güncellenir.
3. **`YOL-HARITASI.md` + `content/series/roadmap.json`:** yayımlanmamış plan, fazlar,
   prerequisite grafı, kavram-tekrar defteri, terim defteri, yayımlanmış vaat defteri ve doğal
   kapsam. `roadmap.json` bunun UI'ye senkron izdüşümüdür; başlık düzeyinde birlikte güncellenir.
   Yayımlanmamış başlıklar taslaktır ve batch hazırlığında pedagojik gerekçeyle değiştirilebilir
   (yayımlanmış makaleler ve yayımlanmış numaralı vaatler asla).
4. **`HANDOFF.md`:** yalnızca güncel operasyonel state: cursor (yayımlanan son makale, sıradaki
   güvenli başlangıç), açık borçlar, bilinen önceden-var sorunlar ve sıradaki run hazırlığı.
   Kalıcı kural veya roadmap kopyalamaz; sahiplerine referans verir. HANDOFF, sözleşmeyi veya
   yol haritasını override edemez.
5. **`TRIGGER.md`:** state değildir. Yalnızca HANDOFF'u işaret eder, o run'ın `BATCH`
   assignment'ını taşır ve yürütmeyi başlatır.

Tarihsel üretim günlükleri tutulabilir fakat açıkça **non-normative history** olarak işaretlenir;
v2.0 öncesinin sabit kapsam (100 makale), sabit batch ritmi, handoff'lara kural kopyalama veya
belirli bir agent/model mimarisini zorunlu kılan hükümleri aktif komut olarak okunamaz.

## 9. Üretim süreci kuralları

- Araştırma, kaynak doğrulama, eleştirel inceleme ve zincir tutarlılık kontrolü ayrıştırılabilir
  işlerdir; **kritik kararlar, sentez, çelişki çözümü ve son kabul her zaman run'ı çalıştıran ana
  oturumdadır.** Yardımcı agent/araç kullanımı, o oturumun platform kurallarına ve kullanıcı
  talimatlarına tabidir; bu sözleşme belirli bir model, model sürümü, paralel reviewer düzeni
  veya harness zorunlu kılmaz ve repo dışındaki geçici çalışma alanlarına bağımlılık kuramaz.
- Her makale yayına girmeden: (a) iddia-kaynak eşleşmesi bağımsız/eleştirel biçimde kontrol edilir,
  (b) zincir tutarlılığı (terimler, köprüler, tekrar planı, numaralı vaatler) denetlenir,
  (c) diyagramlar üç temada gerçek render'da görülür.
- Bir inceleme bulgusunda çelişki varsa karar ana oturumundur ve gerekçesi HANDOFF'a not edilir.

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

---

## Değişiklik notları

- **2026-08-28 (v2.0, kullanıcının açık talebiyle — Fable 5 master kurulum görevi):**
  (a) "1–100" kapsam taahhüdü kaldırıldı; seri uzunluğu bilgi grafından doğar, "Sıfırdan Yüze"
  marka adıdır. (b) §7'deki eski sabit ritim ve miras-kopyalama hükümleri, kanonik
  `5+1 varsayılan / exact BATCH=N+1 override` semantiğiyle değiştirildi; `classification_batch`
  sabit aralık formülünden ardışık run kohortuna çevrildi. (c) §8 yaşayan state sahipliği
  hiyerarşisi ve non-normative history kuralı eklendi. (d) §9'daki belirli model/subagent düzeni
  zorunluluğu kaldırıldı; kalite kapıları korundu. (e) §3'e bilinçli formalizasyon ilkesi, §5'e
  numaralı ileri vaat disiplini eklendi. (f) Level ve iskele bantları sabit numara aralıklarından
  faz-göreli tanımlara çevrildi. Yayımlanmış 1–10 makale bu revizyondan etkilenmez.
