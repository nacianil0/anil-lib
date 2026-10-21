# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Seri Sözleşmesi

> **Bu dosya serinin kalıcı normatif sözleşmesidir.** Yayımlanmış ve yayımlanacak her yazı, her
> üretim run'ı ve her handoff bu kurallara bağlıdır. Yeni bir oturum seriye devam etmeden önce bu
> dosyayı, `docs/seri-guvenlik/HANDOFF.md`'yi ve `YOL-HARITASI.md`'nin sıradaki yazılarla ilgili
> kayıtlarını okumak **zorundadır**. Sözleşme ancak kullanıcının açık talebiyle değiştirilir;
> değişiklik sonuna tarihli bir notla yazılır ve yayımlanmış yazılarla çelişki üretmez.

Sürüm: 1.1 · Oluşturma: 2026-10-21 · Son değişiklik: 2026-10-21 (Git/GitHub hattı) · Kapsam: serinin
bütün yaşam döngüsü

---

## 1. Seri kimliği, okur ve tez

- **Ad:** *Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi* (2026-10-21'e kadar "Güvenli
  Yazılım Mühendisliği"; karar #17). "Güven sınırı" serinin merkez kavramıdır: her yazı bir verinin,
  bir isteğin, bir kararın ya da bir değişikliğin güvenin değiştiği yerden nasıl geçtiğini sorar.
  Teknik kimlik değişmez: rota `/guvenlik`, okuma verisi kimliği `guvenlik`.
- **Okur:** senior ve daha üst düzey yazılım geliştiriciler, mimarlar, teknik liderler; Git/GitHub
  hattında ayrıca bir GitHub organizasyonunu yöneten kişi. Okur web/API geliştirmeyi, HTTP'yi,
  veritabanını, test yazmayı ve üretim işletimini bilir; bunlar yeniden öğretilmez. Yeni güvenlik
  kavramı varsayımı, ön koşulu ve sınırıyla kurulur. Git'i her gün kullanan okurun zihinsel
  modelinde boşluk olabileceği varsayılır: Git kavramı da komut listesiyle değil, commit grafiği ve
  karşıt örnekle kurulur.
- **Tez:** Güvenlik, bir tehdit modeli altında sistemin sahip olduğu ya da olmadığı bir özelliktir;
  risk listesi bu özelliğin kendisi değildir. Her yazı tek bir riski ya da tek bir değişiklik
  kararını şu zincire çevirir: **varsayım → güven sınırı → mimari karar → doğrulanabilir özellik →
  negatif test → üretimdeki sinyal → kalan risk.** OWASP belgeleri bu zincirin farklı halkalarına
  girdi verir; birbirinin yerine geçmez (§5).
- **İki eksen:** Seri OWASP ile açılır ve iki eksende ilerler: (1) sistemin güvenlik özellikleri,
  (2) kodun değişme yolu: Git'in bir değişikliği nasıl temsil ettiği, GitHub'da nasıl birleşip
  sürüme dönüştüğü ve bir organizasyonda kimin, neyin neyi değiştirebildiği. İkinci eksen birincinin
  uzantısıdır: Top 10:2025 A03 kod deposunu, dal korumasını ve CI/CD'yi tedarik zincirinin parçası
  sayar. Bu eksende güven sınırı çoğu zaman bir durum sınırıdır: çalışma ağacı ile depo, yerel klon
  ile paylaşılan uzak depo, korumasız ile korumalı dal, insan ile makine kimliği.
- **Bağımsızlık:** Seri kendi başına anlaşılır. "Sıfırdan Yüze: Yapay Zekâ" ve "Mülakat Aynası:
  Boğaziçi CmpE" serileri önkoşul değildir; gövdede onlara bağlantı ya da gönderme yapılmaz.
  Katalog, yol haritası, state ve handoff zincirleri tamamen ayrıdır.
- **Bağlantısızlık beyanı:** Seri OWASP Foundation'ın, Git projesinin ya da GitHub'ın yayını
  değildir ve onlarla bağlantılı olduğunu ima etmez; belgelerini sürüm ve erişim tarihiyle kaynak
  gösterir.
- **Tavan:** Seri **en fazla 25 yazıdır** (karar #15). İlk tavan 20 idi; kullanıcı 2026-10-21'de
  Git/GitHub hattının yüzeyselleşmemesi için 20'yi aşmaya açıkça izin verdi. İstisna yalnızca bu
  hattın dokuz yazısı içindir; güvenlik ekseni 16 yazıyla aynı kalır. Tavan kota değildir: plan
  küçülürse seri gerçek sonunda biter. Herhangi bir eksene yeni yazı eklemek kullanıcının açık
  kararını ve `YOL-HARITASI.md` karar kaydını gerektirir. Roadmap bütünlük testi (§2) tavanı
  mekanik olarak denetler.

## 2. Teknik sözleşme

- **Rota:** `/guvenlik` (giriş + yol haritası), `/guvenlik/[slug]` (okuyucu).
- **İçerik:** `content/series-guvenlik/articles/<kategori>/<slug>.md` · katalog
  `content/series-guvenlik/catalog.json` · şekiller `content/series-guvenlik/assets/<slug>/*.svg` ·
  UI yol haritası `content/series-guvenlik/roadmap.json`.
- **Kod:** `src/lib/content/series-guvenlik.ts` (ortak `createSeriesContent` fabrikasının örneği),
  `schema.ts` (`GUVENLIK_CATEGORIES`), `labels.ts`; okuma verisi tarafında seri kimliği
  `guvenlik` (`src/lib/reader-data/series-reset.ts` içindeki `SERIES_IDS`).
- **Kimlik ve şema:** Frontmatter ve katalog alanları öteki serilerle aynıdır: `article_id`
  (`article_<uuid>`, `crypto.randomUUID()` ile üretilir ve katalog çakışması denetlenir),
  kebab-case `slug`, `category`, `level`, `reading_order`, `summary`, `tags`,
  `content_hash`, `classification_version: 1`, `classification_batch`; isteğe bağlı
  `revised_at` + `revision_note` (§9). Frontmatter `snake_case`, katalog `camelCase`'dir.
  Yayımlanmış bir yazının **id, slug ve reading_order'ı asla değişmez.**
- **Hash:** `content_hash` = frontmatter sonrasındaki gövdenin satır sonları LF'ye
  normalleştirilmiş, trim edilmiş UTF-8 SHA-256'sı (`sha256:<hex>`). SVG dosyaları hash'e girmez;
  Markdown'daki alt metin girer. Yetkili hesap `tools/series/sync-series-hashes.cjs`'tir.
- **Kohort:** `classification_batch` başarılı üretim run'ının sıra numarasıdır; ilk run Batch 0.
  `reading_order` 1'den kesintisiz artar.
- **Kategori sözlüğü** (klasör adı `category` alanıyla birebir aynı): `owasp-and-verification`,
  `design-and-configuration`, `version-control`, `collaboration-and-delivery`,
  `organization-governance`, `identity-and-access`, `data-flow-and-interpreters`,
  `secrets-and-integrity`, `operations-and-assurance`, `integrated-case`. On kategori on fazla
  bire bir örtüşür (karar #18); yeni kategori yalnızca yol haritası kararıyla eklenir.
- **Level:** Bütün yazılar `advanced`. Gerekçe: okur kitlesi profesyonel deneyim varsayar; level
  etiketi seri içinde ayırt edici bir sinyal taşımaz (karar #3, `YOL-HARITASI.md`).
- **Ham HTML yazılmaz.** Görsel yalnızca `![alt](assets/dosya.svg "Şekil N — başlık")`.
- **Zorunlu kapılar** (her run, yazılar entegre edilmeden önce ve sonra):
  `node tools/series/check-series-content.cjs --series=guvenlik`,
  `node tools/series/check-series-svg.cjs content/series-guvenlik/assets`, SVG'lerin XML olarak
  ayrıştırılması, `node tools/series/entegre-batch.cjs --series=guvenlik` (önce kuru),
  `node tools/series/sync-series-hashes.cjs --series=guvenlik`, `corepack pnpm typecheck`,
  `corepack pnpm test` (roadmap bütünlüğü dahil: `src/lib/content/series-guvenlik-roadmap.test.ts`
  tavanı, başlık sabitlerinin roadmap'le eşliğini ve yayımlanmış yazıların sıranın başında
  durduğunu denetler), `corepack pnpm build` ve gerçek render (§6, §7).

## 3. Editoryal kurallar

- **Dil ve ton:** Türkçe; okura "sen" diye hitap edilir. Yetişkin bir uzmana konuşulur: yazılım
  temelleri anlatılmaz, güvenlik kavramının varsayımı ve sınırı anlatılır. Pazarlama, korku dili,
  sansasyon, emoji, dolgu ve "yapay zekâ metni" kokan genel cümleler yasaktır.
- **Terimler:** İlk geçişte Türkçe karşılık + İngilizce ad ("güven sınırı (trust boundary)");
  sonra seri boyunca aynı biçim. Sektörde İngilizce kullanılan bazı terimler İngilizce kalır
  (fail-open, fail-closed, IDOR, BOLA, SSRF, XSS, CSRF, CORS); ilk geçişte Türkçe açıklanır, gloss
  verilmez. Liste ve kararlar: `YOL-HARITASI.md` §Terim defteri. Aynı Türkçe sözcük iki kavramı
  taşımaz; çakışma kaçınılmazsa metinde adlandırılır.
- **Mutlak güvenlik dili yasaktır.** Hiçbir kontrol "tam güvenli", "%100 güvenli", "kurşun
  geçirmez" ya da "hacklenemez" diye anlatılmaz (mekanik kapıda). Her kontrol hangi tehdit
  modelinde, hangi ön koşulla işe yaradığı ve neyi garanti etmediğiyle yazılır.
- **Yapı:** H1 yok (başlık frontmatter'dadır); gövde H2 ile başlar. H2'ler numarasızdır ve içerik
  adı taşır. Zorunlu bölümler, sırasıyla: senaryo ve kırılan varsayımla açılan giriş, gövde,
  **`## Karar kartı`** (§4), **`### Sırada ne var`** (sonraki yazının sorusu, 2–4 cümle),
  **`## Kaynakça`**.
- **Uzunluk:** Düzyazı **2.000–3.600 kelime**; kod blokları ve Kaynakça sayılmaz (mekanik kapı).
  Gerekçe: her yazı senaryo, mekanizma, karar, doğrulama ve kalan risk taşımak zorunda; 2.000'in
  altı bu beşini senior derinlikte taşımıyor, 3.600'ün üstü yoğunluğu dağıtıyor. Kelime sayısı
  kalite ölçütü değildir; eksik mekanizma dolgu cümleyle kapatılmaz.
- **Kod:** Örnekler amaca orantılıdır ve çerçeveden bağımsız tutulur (TypeScript, SQL, HTTP; yer
  yer kabuk). Güvensiz örnek yalnızca öğretmek için ve **kontrollü** gösterilir: "kırılgan sürüm"
  diye işaretlenir, hangi güvenlik özelliğinin nerede kırıldığı söylenir ve düzeltmesi ile negatif
  testi aynı yazıda verilir. Örneklerde gerçek sır, gerçek kişi ya da müşteri verisi, üretim
  adresi bulunmaz (`example.test`, uydurma kimlikler). Üçüncü taraf sistemlere saldırı tarifi,
  canlı tarama ya da silahlandırılmış istismar zinciri yazılmaz; hedef her zaman okurun kendi yerel
  ya da yetkili test ortamıdır.
- **Gönderme biçimi:** Önceki yazılara **konu adıyla** gönderme yapılır ("tehdit modelleme
  yazısında"); gövdede yazı numarası kullanılmaz. Gövdede numaralı ileri vaat verilmez; ileriye
  yalnızca konu adıyla işaret edilir ve her işaret `YOL-HARITASI.md` §İleri işaret defterine
  yazılır. Geri gönderme, hedef yazının gövdesinde grep'le doğrulanır.
- **Seri sayısı dili:** Gövde serinin toplam yazı sayısını söylemez ve ima etmez.
- **Kalıp yasağı:** `tools/series/check-series-content.cjs`'in ortak kalıp listesi (sabit benzetme
  kapanışı, ilan edilen dürüstlük, kendini duyuran vurgu, tek kelimelik dramatik cümle) burada da
  geçerlidir. "Karar kartı" ve "Teşhis et" bilinçli araçlardır; onların dışında tekrar eden etiket
  ya da geçiş cümlesi kurulmaz.
- **Okura sızan üretim dili yasağı:** Gövdede §, "sözleşme", "defter", "batch", "trigger",
  "run", "cursor", bot duvarı/erişim hikâyesi ve iç atıf işareti geçmez; süreç notu yalnızca
  HANDOFF ve ARASTIRMA'da durur. Kaynakça yalnızca temiz, gerçek künye ve bağlantı taşır. Yasak bu
  serinin üretim sürecinin dilidir; yazının konusu olan ürün terimi (GitHub Actions'ta iş akışı
  tetikleyicisi ve çalıştırması gibi) kendi bağlamında, Türkçe açıklamasıyla kullanılır.

### Git ve GitHub yazıları için ek kurallar

- **Terimler:** Komut adları ve sektörde İngilizce yerleşmiş Git terimleri İngilizce kalır (commit,
  merge, rebase, squash, `fetch`, `pull`, `push`, HEAD, PR, ruleset, bypass); ilk geçişte Türkçe
  açıklanır. Türkçesi yerleşmiş kavramlar Türkçe yazılır (dal, uzak depo, uzak izleme dalı, çalışma
  ağacı, hazırlık alanı, etiket, denetim kaydı). Yayımlanmış yazılarla tutarlı olarak release için
  "sürüm", deploy için "dağıtım" kullanılır; GitHub'ın nesnesi "GitHub Release" adıyla anılır.
  Planlanan karşılıklar: `YOL-HARITASI.md` §Planlanan terim kararları.
- **Komut bloğu:** Okura kopyalatılan her komut bloğu şunları taşır: *nerede* (hangi makine/klon,
  hangi dal), *önkoşul*, *beklenen çıktı* (yazarın gerçek çalıştırmasından, kısaltılmış), *değişen
  durum* (çalışma ağacı, hazırlık alanı, yerel ref, uzak izleme ref'i ya da uzak depo), *veri kaybı
  riski* ve *doğrulama komutu*. Veri kaybettirebilen komut (`reset --hard`, `clean -fd`,
  `branch -D`, `push --force`, geçmişi yeniden yazan araçlar) olağan bakım adımı gibi sunulmaz: önce
  kurtarma yolu ve risk, sonra komut.
- **Deney deposu:** Git örnekleri okurun kendi makinesinde geçici bir klasörde yeniden üretilebilir:
  `origin` yerel bir bare depodur, birden çok geliştirici birden çok klonla canlandırılır. Gerçek
  uzak depo, gerçek organizasyon ve gerçek kişi yoktur. Gösterilen çıktılar yazarın çalıştırmasından
  alınır; Git sürümü ve global yapılandırmanın yalıtıldığı (ör. `GIT_CONFIG_GLOBAL`) yazılır; çıktı
  uydurulmaz. Metin, kod bloğu ve şekil aynı çalıştırmanın commit etiketlerini kullanır.
- **GitHub özelliği koşuluyla yazılır:** Plan (Free, Pro, Team, Enterprise Cloud/Server), depo
  görünürlüğü (public, private, internal), gereken rol ve tarih ("Ekim 2026 itibarıyla") belirtilir.
  Yalnızca bir planda bulunan özellik herkes için varmış gibi anlatılmaz. Web arayüzü, `gh` CLI ve
  REST/GraphQL davranışı ayrıldığında hangisinin anlatıldığı söylenir. Tarihsel bilgi (Git 2005,
  GitHub 2008) bugünkü ürün davranışıyla karıştırılmaz ve yalnızca bir kavramı açıkladığı kadar girer.
- **Gerçek organizasyon yok:** Gövdede gerçek bir organizasyonun (okurun kendi şirketi dahil) adı,
  üyesi, planı, deposu, ayarı ya da güvenlik durumu yazılmaz ve tahmin edilmez; örnekler kurgusal
  `ornek-sirket` organizasyonunda geçer. Okurun kendi organizasyonu için öneri ayrı bir "Kendi
  organizasyonunda" kutusunda iki türde verilir: *salt okunur denetim* (yalnızca görüntüleyen
  adımlar: ayar sayfası, denetim kaydı araması, `gh api` ile GET) ve *öneri* (değiştiren adım;
  etkilenen kişi ve otomasyonlar, duyuru ihtiyacı ve geri dönüş yoluyla). Değiştiren adım hiçbir
  zaman ilk adım değildir.

## 4. Pedagojik kurallar (senior+ okur için)

- **Tek iş:** Her yazının tek cümlelik bir öğretim hedefi vardır (`YOL-HARITASI.md`'de yazılı) ve
  en fazla üç çekirdek yeni kavram kurar. Hedef özetten okunur.
- **Önce problem:** Giriş gerçekçi bir ürün senaryosuyla açılır ve korunacak varlığı, saldırganın
  yeteneğini, güven sınırını ve kırılan güvenlik varsayımını adlandırır. Sonra sırasıyla
  mekanizma (neden oluyor, nasıl çalışıyor), karar (hangi katman sorumlu, maliyeti ne), doğrulama
  (gereksinim + negatif test), işletim (üretimde ne izlenir) ve kalan risk gelir.
- **Çözümlü örnek:** Yazının ana mekanizması okurun kendi yerel ortamında yeniden üretebileceği
  somut bir örnekle (kod, istek, yapılandırma, hesap) gösterilir; sayılar yeniden hesaplanabilir,
  girdiler metinde durur. Şematik örnek ölçüm gibi sunulmaz.
- **"Teşhis et" kutusu:** Yazı başına 1–3 adet, blockquote içinde `**Teşhis et:**` ile başlar.
  Okura bir kod parçası, kayıt satırı, yapılandırma ya da tasarım kararı verir ve "ne yanlış /
  ne yapardın" diye sorar. **Hemen sonraki paragraf** cevabı ve değerlendirme ölçütünü verir: iyi
  bir cevabın neyi mutlaka içermesi gerektiği ve yaygın yanlış cevabın neden yanlış olduğu. Soru
  tanım ezberi değil karar ya da hata teşhisi ölçer ve tek bir ilişkiyi hedefler.
- **Karar kartı:** Her yazı `## Karar kartı` bölümüyle kapanır; kart şu sekiz maddeyi bu sırayla
  taşır: **Varsayım**, **Güven sınırı**, **Karar**, **Somut risk**, **Doğrulanabilir özellik**
  (sürümlü ASVS kimliğiyle, uygunsa), **Negatif test**, **Üretimde sinyal**, **Kalan risk**.
  Kart gövdeyi kelimesi kelimesine tekrar etmez; okurun ertesi gün tasarım incelemesinde
  kullanacağı sıkıştırılmış karardır ve kontrolün **neyi garanti etmediğini** mutlaka içerir.
  Git/GitHub yazılarında da sekiz madde değişmez: *Güven sınırı* bir durum sınırı olarak yazılır
  (§1 "İki eksen"); *Doğrulanabilir özellik* uygunsa bir gereksinim kimliği (SSDF v1.1 PS, OWASP
  CI/CD risk kimliği), değilse Git'le kanıtlanabilir bir koşuldur (`git merge-base --is-ancestor`
  gibi); *Negatif test* deney deposunda ya da okurun kendi test deposunda koşturulabilir biçimde
  yazılır.
- **Grafikle öğretim (Git/GitHub hattı):** Her işlem önce/sonra commit grafiğiyle gösterilir: hangi
  ref hangi commit'i gösteriyor, hangi makinede ve işlemden sonra hangisi kaydı. Okurun yanlış
  beklentisi ile gerçek sonuç yan yana konur. Temeli anlatmadan rebase'e geçilmez; temel de uzun bir
  başlangıç alıştırmasına dönüştürülmez.
- **Yönetici vakası:** Gerçek yönetim kararları (erişim verme ve alma, yanlış push, sızan sır, bozuk
  action, acil hotfix, yanlış bypass gibi) şu sırayla işlenir: *gözlem ve kanıt* (hangi kayıt, hangi
  komut) → *seçenekler* → *güvenli karar* → *kalan risk*. Vakanın hangi yazıda işlendiği
  `YOL-HARITASI.md`'dedir.
- **Geri çağırma:** Önceki yazıların kritik ilkeleri sonraki yazılarda yeni bir bağlamda yeniden
  kullandırılır (en geç her üç yazıda bir planlı geri çağırma); okurun unutmuş olabileceği
  varsayılır, 1–3 cümlelik yeniden kurulumla ve konu adıyla. Plan: `YOL-HARITASI.md` §Geri çağırma
  defteri.
- **Karıştırılabilir çiftler yan yana öğretilir:** kimlik doğrulama / yetkilendirme, 401 / 403,
  "reddedildi" / "karar verilemedi", doğrulama (validation) / kodlama (encoding), fail-open /
  fail-closed, şifreleme / bütünlük; Git/GitHub hattında yerel dal / uzak izleme dalı, `fetch` /
  `pull`, merge / rebase, revert / reset, `--force` / `--force-with-lease`, push / PR / merge /
  dağıtım, dal koruması / ruleset gibi çiftler aynı bölümde açıkça ayrıştırılır.
- **Uzman tersine dönmesi:** Yazılım temelleri için iskele kurulmaz; iskele yalnızca yeni güvenlik
  kavramında kullanılır.
- **Süsleyici ayrıntı yasağı:** Olay anekdotu, kaza hikâyesi ya da korkutucu rakam ancak mekanizmayı
  taşıyorsa girer.

## 5. Kaynak ve doğrulama kuralları

- **Kaynakların rolü ayrıdır ve öyle kullanılır:**
  - *Risk farkındalığı:* OWASP Top 10:2025, OWASP API Security Top 10:2023.
  - *Gereksinim:* OWASP ASVS 5.0.0 (yayın: 2025-05-30, sürüm etiketi `v5.0.0_release`).
  - *Uygulama ve önleme:* OWASP Cheat Sheet Series (yaşayan sayfalar), OWASP Top 10 Proactive
    Controls 2024.
  - *Test ve kanıt:* OWASP WSTG — kararlı sürüm **v4.2**; geliştirme sürümü ("latest") yalnızca
    açıkça işaretlenerek anılır.
  - *Program ve yaşam döngüsü:* OWASP SAMM v2; NIST SP 800-218 SSDF **v1.1 (nihai, Şubat 2022)**.
    SP 800-218 Rev. 1 (SSDF v1.2) yalnızca **ilk kamu taslağıdır** (2025-12-17) ve nihai standart
    gibi aktarılmaz.
  - *Birincil teknik belirtimler:* RFC'ler, NIST yayınları, MITRE CWE, sürümü belli ürün belgeleri.
  - *Git/GitHub hattı:* Git'in davranışı için **Git başvuru kılavuzu** (`git-scm.com/docs`, sayfanın
    "last updated in" sürümüyle) normatiftir; **Pro Git** (2. baskı) kavramsal açıklamadır.
    Sürüme duyarlı davranışta (varsayılan dal adı, `git pull` varsayılanı) kılavuz kazanır ve fark
    yazılır. GitHub ürün davranışı **GitHub Docs** (erişim tarihi ve plan koşuluyla) ve **GitHub CLI
    kılavuzu**ndan; GitHub blog ve changelog yalnızca tarih ve duyuru için. Risk farkındalığı:
    Top 10:2025 A03 ve **OWASP Top 10 CI/CD Security Risks** (lab projesi); program: SSDF v1.1
    PS.1–PS.3. Süreç görüşleri (SemVer 2.0.0, DORA, GitFlow'un özgün yazısı ve yazarının 2020 notu)
    görüş ya da belirtim olarak adlandırılır, standart gibi aktarılmaz. Yazarın deney deposu
    çıkarımdır ve öyle işaretlenir.
  Her yazı yalnızca kendi sorusuna karar taşıyan kaynakları bağlar; ilgisiz standart yığılmaz.
- **ASVS kimliği sürümsüz yazılmaz:** Gövdede ve kartta `v5.0.0-16.5.3` biçimi kullanılır
  (ASVS'nin kendi önerdiği biçim). Her kimliğin metni resmî sürümün CSV/JSON'undan doğrulanır;
  bellekten kimlik üretmek yasaktır.
- **WSTG kimliği sürümüyle yazılır** (`WSTG-ERRH-01`, v4.2) ve v4.2 bağlantısıyla verilir.
- **Top 10 kategorisi edisyonuyla yazılır** (`A10:2025`); 2021 edisyonuna yapılan her gönderme
  açıkça "2021 edisyonu" diye işaretlenir; iki edisyonun adları ve sıraları karıştırılmaz.
- **Bağlantı geçerliliği HTTP 200 değildir:** Başlık, yazar/kurum, bölüm ve desteklenen iddia
  hedef sayfada eşleştirilir. Bot doğrulama sayfası 200 dönebilir; yayıncı 403'ü ölü bağlantı
  değildir. Adres resmî dizinden ya da sayfanın kendisinden kopyalanır; tahmin edilmez.
- **Yaşayan sayfa:** Cheat Sheet ve OWASP sitesi gibi değişen kaynakların erişim tarihi; GitHub'da
  tutulan belgelerin etiket ya da commit'i `ARASTIRMA.md`'ye yazılır.
- **Sayı koşuluyla taşınır:** Örneklem, payda, zaman aralığı ve ölçüm yöntemi sayıyla birlikte
  söylenir ("test edilmiş uygulamalar arasında", "2021–2024 verisi"). Kendi hesabın girdileriyle
  metinde durur ve "kendi hesabımız" diye işaretlenir. Kaynağın kendi içindeki tutarsızlık
  sessizce taşınmaz; hangi sayının neden seçildiği yazılır.
- **Standart, çıkarım ve şema ayrılır:** "ASVS şunu ister" ile "bizim mühendislik çıkarımımız" ve
  "şematik örnek" aynı cümlede karışmaz. Niceleyiciler ("her zaman", "hiçbir", "tamamen",
  "garanti") kaynağın söylediği kadardır.
- **Tarihe bağlı iddia tarihlenir:** ürün davranışı, varsayılan ayar, standart sürümü "Ekim 2026
  itibarıyla" ya da sürüm numarasıyla yazılır.
- **Durum kontrolü:** DOI'li kaynaklarda Crossref `updated-by`; taslak/nihai ve ön baskı/hakemli
  ayrımı her kullanımda yeniden kontrol edilir.
- **Lisans:** OWASP içerikleri CC BY / CC BY-SA lisanslıdır; uzun pasaj kopyalanmaz, kısa alıntı
  atıfla yapılır, anlatım Türkçe yeniden kurulur.

## 6. Görselleştirme kuralları

- Her yazıda **en az bir öğretici şekil**; ikincisi yalnızca metnin tek boyutta taşıyamadığı ayrı bir
  ilişki için. Öncelik ilişki gösteren şekillerdedir: güven sınırı, istek akışı, yetki kararı, hata
  geçişi, veri hattı, durum makinesi. Kutu içine düzyazı ya da SVG'ye çizilmiş tablo öğretici
  şekil sayılmaz; tablo Markdown'da kalır ve aynı veri hem tablo hem şekil olmaz.
- **Teknik kurallar:** `viewBox="0 0 720 H"`; renkler yalnızca CSS değişkeni (`--text`,
  `--text-muted`, `--text-faint`, `--accent`, `--accent-soft`, `--cool`, `--cool-soft`,
  `--surface`, `--surface-muted`, `--border`, `--bg`); font-family yok; metin ≥ 13 birim;
  `script`, `foreignObject`, `on*` yok; `role="img"` + `aria-label`; marker/defs id'leri
  `<yazı-kısaltması>-<amaç>` önekiyle sayfa genelinde benzersiz; son metin satırının tabanı alt
  kenardan ≥ 12 birim; 13 birimlik metinde karakter başına ~7,2 birim, kutu genişliği ≥ karakter ×
  7,2 + 16; ok ucu hedefin kenarından önce biter.
- **Alt metin** şekil çizildikten sonra, şeklin metin düğümlerinden türetilerek yazılır; şekilde
  olmayan öğe anlatmaz; hedef ≤ 120 kelime. Şekildeki her sayı metindeki sayıyla aynıdır.
- **Commit grafiği:** Düğüm bir commit'tir ve deney deposunun çıktısındaki etiketi (kısa kimlik ya
  da `C0`, `F1` gibi adı) taşır. Kenar Git'in yönündedir (çocuktan ebeveyne); okur zaman yönünde ok
  beklediği için şekil yönü bir kez adlandırır. Dal, commit'e iliştirilmiş bir işaretçi olarak; uzak
  izleme dalı kesikli çerçeveyle; HEAD ayrı bir işaretle çizilir. Birden çok makine varsa her makine
  ayrı paneldir. Önce/sonra panellerinde commit konumları sabit kalır, yalnızca değişen ref'ler
  kayar. Şekildeki her etiket metindeki ve kod bloğundaki çıktıyla aynıdır.
- **Kabul:** İki mekanik denetleyici (repo SVG kapısı + XML ayrıştırma) tabandır; yeterli değildir.
  Her şekil **açık, koyu ve sepya** temalarda, **dar (375 px) ve geniş** ekranda gerçek render'da
  piksel olarak incelenir (taşma, ok–etiket çakışması, okunaksız metin).

## 7. Üretim ritmi — `BATCH=2+1`

Bu bölüm serinin üretim ritminin tek kalıcı tanımıdır; HANDOFF ve TRIGGER burayı referans verir.

- **Varsayılan `BATCH=2+1`:** bir üretim run'ında yol haritasındaki sıradaki **en fazla iki**
  yayımlanmamış yazı araştırılır, yazılır, entegre edilir ve doğrulanır; ardından tek bir `+1`
  fazı yapılır. Diğer iki serinin `5+1` varsayılanı bu seriyi etkilemez.
- **Override:** Yalnızca kullanıcının **o run'daki mesajında** tam `BATCH=N+1` satırı
  (`^BATCH=([1-9][0-9]*)\+1$`) varsayılanı o run için değiştirir. Düz yazıdaki sayılar, yol
  haritası sıra numaraları ya da TRIGGER'daki tarihsel satır override değildir.
- **`+1` makale değildir:** HANDOFF cursor'ı, yol haritası durumu, terim/geri çağırma/ileri işaret
  defterleri, araştırma borçları ve sonraki run'ın hazırlık notu güncellenir; çapraz tutarlılık
  denetlenir. `+1` sırasında sonraki yazının gövdesi yazılmaz.
- **Kalan < N:** Doldurma konusu icat edilmez; kalan gerçek yazılar tamamlanır.
- **İdempotens:** Run, yayımlanmış gerçeği (katalog + frontmatter + roadmap) HANDOFF ile karşılaştırarak
  başlar. Katalogda olan yazı yeniden yazılmaz; diskte olup katalogda olmayan yazı yeni kimlikle
  çoğaltılmaz, doğrulamadan devam edilir; yazılar entegre edilmiş ama `+1` yapılmamışsa yalnızca
  `+1` yapılır. `entegre-batch.cjs` önce kuru çalıştırılır.
- **Kısmi başarısızlık:** Bir yazı kapılardan geçmezse entegre edilmez; cursor gerçeği gösterir ve
  engel HANDOFF'a yazılır. `+1` yapılmış gibi gösterilmez.
- **Kohort:** Her başarılı run bir sonraki kesintisiz `classification_batch` değerini alır.
- **Sonlanma:** Seri, revize planın gerçek sonunda tamamlanır: yol haritasında `planlandi` kalmadığı
  an (Ekim 2026 planında 25. yazı). Plan, §1 tavanını aşacak biçimde uzatılmaz. Sonda bir yazı
  kalırsa run yalnızca onu üretir; tamamlanmış yazı ikinci kez üretilmez. Son yazının `+1` fazı
  TRIGGER'ı **bakım kipine** alır. Bakım kipi yeni yazı üretmez; kaynak, bağlantı, sürüm ve hata
  düzeltmesi yolunu izler (§9).
- **Çalışma alanı güvenliği:** Run başında ve build/dev öncesinde aynı depoda başka bir yazar ya da
  sunucu olup olmadığı (port, süreç, `git status`) kontrol edilir; `.next` paylaşılmaz, gerekirse
  build/dev/e2e aynı sürücüdeki yalıtılmış kopyada koşar. Başka oturumun açık dosyasına dokunulmaz.
  Yardımcı ajan yalnızca yazma alanı net ayrılabiliyorsa kullanılır; kabul ana oturumda **diff,
  test ve render** üzerinden verilir, rapor üzerinden verilmez.
- **İzin sınırı:** Commit, push, deploy, canlı veritabanı ve dış sisteme yazma kullanıcının açık
  yetkisi olmadan yapılmaz; migration yalnızca incelemeye hazır dosya olarak bırakılır.

## 8. Yaşayan state sahipliği

Çelişki şu sırayla çözülür:

1. **Yayımlanmış gerçek:** yazı dosyaları + frontmatter + `catalog.json`, doğrulanmış rota/id/hash.
2. **Bu sözleşme:** kalıcı kurallar, kapılar, ritim.
3. **`YOL-HARITASI.md` + `roadmap.json`:** plan, fazlar, önkoşullar, yazı başına tasarım kaydı,
   terim/geri çağırma/ileri işaret defterleri, karar kaydı. `roadmap.json` başlık düzeyinde
   senkron UI izdüşümüdür. Yayımlanmamış başlık taslaktır ve gerekçeyle değişebilir.
4. **`ARASTIRMA.md`:** kaynak kanıtı, sürüm/erişim tarihi, doğrulanan bölüm, belirsizlik, borç.
5. **`HANDOFF.md`:** yalnızca güncel operasyonel state: cursor, son run, değişen dosyalar, kanıt,
   açık borçlar, sonraki güvenli giriş. Kural kopyalamaz; override edemez.
6. **`TRIGGER.md`:** state değildir; yürütmeyi başlatır ve burayı işaret eder.

## 9. Revizyon ve bakım

- **Revizyon işareti** iki öteki seriyle ortak mekanizmadır: okurun anladığı şey anlamlı
  değiştiğinde (güvenlik tavsiyesinin düzeltilmesi, yanlış zihinsel model kuran şeklin
  düzeltilmesi, önemli iddianın sınırlanması) frontmatter'a `revised_at: "YYYY-MM-DD"` ve ≤ 200
  karakterlik `revision_note` birlikte yazılır, `sync-series-hashes.cjs --series=guvenlik --write`
  çalıştırılır. Yazım hatası, bağlantı onarımı, tek künye düzeltmesi işaret almaz.
- **Okur verisi korunur:** id, slug, reading_order ve URL değişmez; okuma çıpaları başlık
  kimliğine bağlı olduğu için mevcut H2/H3 başlıkları yeniden adlandırılmaz (tek istisna olgusal
  olarak yanlış başlık; HANDOFF'a yazılır).
- **Düzeltme yayılır:** Bir yazıdaki güvenlik ya da teknik düzeltme, onu geri çağıran yazıların
  önkoşul, örnek, ileri işaret, alt metin, katalog özeti ve hash'inde gerekiyorsa aynı turda
  hizalanır (grep ile bulunur).
- **Kaynak sürümü değiştiğinde** (Top 10'un yeni edisyonu, ASVS 5.x, WSTG'nin yeni kararlı sürümü,
  SSDF v1.2'nin nihaileşmesi) bu bir bakım kalemidir: yazı sessizce yeniden yazılmaz; atıf
  tarihlenir, gerekiyorsa revizyon işaretiyle güncellenir.
- **Ürün davranışı değiştiğinde:** GitHub özelliklerinin plan koşulu, varsayılanı ve arayüzü sık
  değişir; Git'in varsayılanları sürümle değişir (ör. Git 3.0'da yeni depoların varsayılan dalı
  `main` olacak). Bu da bakım kalemidir: tarihli cümle güncellenir; okura yanlış komut ya da yanlış
  güvenlik kararı öğreten değişiklik revizyon işareti alır.

## 10. Editoryal muhakeme (amaç önce, kural sonra)

- **Başarı ölçütü:** Okur yazının sonunda altı soruyu cevaplayabilmelidir: *ne oldu, neden oldu,
  nasıl çalışır, nasıl önlenir, nasıl test ederim, neyi hâlâ garanti etmez?* Biri yazıdan
  okunamıyorsa eksik yapısaldır; biçim kurallarına uyulmuş olması onu kurtarmaz.
- **Ölçüt sırası:** önce "okurun karar verme gücü bir adım arttı mı", sonra iddiaların doğruluğu,
  sonra şeklin öğretme işlevi, sonra süreklilik, en son biçim.
- **Yazan için kontrol soruları** (yazıyı bitirmeden kendin cevapla):
  (a) Bu iddia hangi tehdit modelinde doğru; hangi saldırgan yeteneğinde kontrol çöker?
  (b) Bu ASVS/WSTG kimliğinin metnini resmî sürümden doğruladın mı?
  (c) Kırılgan örnek işaretli mi, düzeltmesi ve negatif testi yanında mı?
  (d) Karar kartı kontrolün neyi garanti etmediğini söylüyor mu?
  (e) Bütünlük ya da yetki kararında fail-closed uygulandı mı ve erişilebilirlik bedeli yazıldı mı?
  (f) Sayı paydasını, örneklemini ve dönemini taşıyor mu; kendi hesabın işaretli mi?
  (g) Sürüme ya da tarihe bağlı bir iddiayı tarihledin mi?
  (h) Şekil bir ilişki mi öğretiyor, yoksa metni mi kopyalıyor?
  (i) Gövdeye üretim dili ya da iç işaret sızdı mı?
  (j) Senior bir okur bu yazıdan bir tanım değil, bir karar öğreniyor mu?
  (k) Git/GitHub: her komut bloğu nerede, önkoşul, çıktı, değişen durum, kayıp riski ve doğrulama
  taşıyor mu; çıktı gerçek çalıştırmadan mı?
  (l) Grafikteki etiketler çıktıyla aynı mı; ok yönü adlandırıldı mı; hangi makinede olduğu belli mi?
  (m) GitHub özelliğinin plan, görünürlük ve rol koşulu yazıldı mı; gerçek bir organizasyonun ayarı
  ima edildi mi?

---

## Değişiklik notları

- **2026-10-21 (v1.0):** Seri kullanıcının açık talebiyle kuruldu. Ritim `BATCH=2+1`, tavan 20
  yazı; ilk run (kurulum + yazı 1–2) aynı oturumda yürütüldü.
- **2026-10-21 (v1.1):** Kullanıcının açık talebiyle Git/GitHub öğrenme hattı eklendi. Değişenler:
  ad (§1), tez ve iki eksen (§1), tavan 25 ve istisnanın sınırı (§1), kategori sözlüğü (§2), roadmap
  bütünlük testi (§2), Git/GitHub ek kuralları (§3), grafik ve vaka kuralları (§4), kaynak rolleri
  (§5), commit grafiği (§6), sonlanma koşulu (§7), ürün davranışı bakımı (§9), kontrol soruları
  (k)–(m) (§10). Ritim `BATCH=2+1` değişmedi. Yayımlanmış yazı 1–2'nin kimliği, slug'ı, sırası,
  hash'i ve gövdesi değişmedi; gövdedeki "her yazı bir güven sınırı arayacak" sözü Git/GitHub
  yazılarında da Karar kartının "Güven sınırı" maddesiyle tutulur.
