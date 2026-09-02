# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-02 · Durum: **1–42 yayında (kohort Batch 0 → Batch 9) · Sıradaki: 43**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 42 — `getirme-aramanin-modern-hali` |
| Sıradaki güvenli başlangıç | Makale 43 ("Vektör Veritabanları ve İndeksleme"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 10` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–42 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85, #98 ve #107). Faz 4, 40 ile kapandı; 43'ten itibaren `agents-and-retrieval` sürüyor (karar #65) |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108). Batch 9 bu katmana
  yine bilinçli olarak dokunmadı ve tuhaflık Faz 5'e taşındı: faz adı "Retrieval ve Araçlar"
  derken altındaki ilk yayımlanmış başlık artık "**Getirme**: Aramanın Modern Hali". Katmanın
  tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** 43'ün başlığı ("Vektör Veritabanları ve
  İndeksleme") zaten Türkçedir, yani sıradaki run'ın başlık işi **yoksa** kapsam 43 ile sınırlı.
  Borç 44'ten itibaren duruyor: "Chunking" ve "RAG" (44), "RAG" (45), "RAG" ve
  "Retrieval-Reasoning" (46), "Function Calling" (47), "MCP" (49). Karşılıklar o başlıkları içeren
  run'da kararlaştırılıp **roadmap.json entegrasyondan önce** güncellenmelidir. Karar #108'in
  ölçütü nettir: bir terim ancak Türkçede **yerleşik** bir karşılığı varsa çevrilir; "RAG" ve
  "MCP" gibi kısaltmalar `token`/`embedding`/`BM25` sınıfındadır ve çevrilmez.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 9'da 39 ve 41 koordinatları ödendi ve **yeni açık koordinat açılmadı**;
  dört makalenin metin içi numaralı göndermelerinin tamamı yayımlanmış makalelere (≤42) yapıldı.
  Sıradaki run'ın doğrudan ödeyeceği bir vaat **yoktur**; defterde açık kalan en yakın tekil
  koordinat **64**'tür (13'ten gelen "ilkelere dayalı tercih etiketleri"), ondan sonra 61–70 bandı
  ve 72.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan künyeler:** (1) Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı (karar #21). (2) Batch 7'de
  Brown ve ark.'nın "Large Language Monkeys" çalışması doğrulanamadığı için kullanılmadı (karar
  #97). (3) Batch 8'de Chen ve ark. ile Swamy ve ark. yalnızca CoRR'de indekslendiği için
  kullanılmadı. (4) Bellman'ın 1957 çalışmasının sayı numarası kaynaklar arasında farklı verilir
  (karar #104). (5) Batch 9'da beş aday aynı sebeple kullanılmadı: MemGPT, "LLMs Get Lost In
  Multi-Turn Conversation", monoBERT, doc2query ve "The Illusion of Diminishing Returns"
  (karar #114).
- **Hakemsiz kaynak listesi Batch 9'da genişlemedi.** Kullanılan on yedi kaynağın tamamı hakemli
  (karar #114); karar #6'daki listeye kalem eklenmedi. Batch 8'de bilinçli olarak kırılan
  "hakemsiz kaynak yok" serisi burada yeniden yakalandı.

## Next batch preparation — 43'ten devam

**Pedagojik hedefler.** Batch 9'un sonunda okuyucu şunu biliyor: modelin ağırlıklarındaki bilgi
uzun kuyrukta yetmiyor (41), bu yüzden metin dışarıdan getiriliyor, ve getirmenin kendisi
seyrek/yoğun/melez bir mühendislik alanı (42). 42 bilinçli olarak tek bir işi görmezden geldi ve
onu 43'e borç bıraktı: "en yakın `k` vektörü bul" adımının nasıl yapıldığı. 29\. makale de aynı
borcu bırakmıştı ("vektörler önceden kümelenip bir dizine yerleştirilir… sonuç **yaklaşıktır**").

**Sıradaki makaleler ve prerequisite'ler.** 43 ← 42 (ters dizinin karşısına vektör dizini),
29 (21 milyon vektörün 65 gigabaytı; dizin kurmanın 8,5 saati; saniyede 995 sorgu; yaklaşık
aramanın ilk anılışı), 27 (vektörleri daha az bitle saklamak = niceleme temelli dizinler),
4 (embedding uzayının geometrisi), 26 (bellek bant genişliği bir dizin de bir bellek yapısıdır).
44'e geçilirse: 44 ← 43, 42, 41, 29 (metnin nereden kesileceği borcu 29'da açıkça 41–50'ye
bırakılmıştı), 30 (biçim kararları). Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla
belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Yaklaşık aramanın kaçırdığı sonuç sessizdir (29) → 43'ün merkezi gerilimi.
- Bulma oranı ↔ hız takası (29, 42) → 43'te dizin parametresi olarak.
- Niceleme ve yuvarlama değiş tokuşu (27) → 43'te vektör sıkıştırma.
- Tek vektörün boyut sınırı (29) → 43'te depolama ↔ kapasite bütçesi.
- Ters dizin (42) → 43'te vektör dizininin karşıtı olarak.
- Değerlendirme kümesinin etiket yanlılığı (42) → 45'te kaynak sadakati ölçümünde.
- Anahtar ↔ değer ayrımı (39) → 44'te parçalama kararlarında.

**Araştırılacak güncel akademik alanlar (43 için öncelikli):** yaklaşık en yakın komşu yapıları
(çizge temelli ve ters dosya temelli), niceleme temelli sıkıştırma, bulma oranı ↔ gecikme
eğrilerinin hakemli ölçümleri, dizin parametrelerinin getirme kalitesine etkisi, ve "ölçülen
kalitenin ne kadarı modelin ne kadarı dizinin" sorusunun hakemli cevabı. Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** DBLP API'si (`https://dblp.org/search/publ/api?q=...&format=json`) çalışıyor
ama hız sınırı sert: sorgular arasında **en az 11 saniye** bırak, yoksa 429 döner ve JSON yerine
HTML gelir. Bu run'da kullanılan toplu betik `artifacts/b9-research/dblp.py` altında duruyor
(başlık listesi dosyadan okunur, sonuç JSON'a yazılır, aralar otomatik verilir). Sayfa numarası
için `https://dblp.org/rec/<key>.bib?param=1` isteği en pratik yol. **Karar #113:** DBLP yalnızca
CoRR gösteriyorsa iş bitmiş değildir — birincil bildiri sayfası (PMLR, ACL Anthology, papers.nips.cc,
OpenReview) DBLP'nin üstündedir.

**Görselleştirme ihtiyaçları (öngörü):**
- 43: tam tarama ↔ yaklaşık arama; aynı sorgu, iki maliyet ve iki sonuç kümesi.
- 43: bulma oranı ile gecikme arasındaki takas eğrisi (42'nin eğri diliyle görsel süreklilik).
- 43: bir vektör dizininin katmanları; hangi parametrenin neyi değiştirdiği.

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 10` ve `readingOrder` 43'ten
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu
kararları güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki
run hazırlığıyla güncellenir.

**Entegrasyon sırası (repo içi araçlarla):**
```
node tools/series/entegre-batch.cjs            # kuru çalışma: frontmatter → katalog/roadmap denetimi
node tools/series/entegre-batch.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/check-series-content.cjs && node tools/series/check-series-svg.cjs
corepack pnpm typecheck && corepack pnpm test && corepack pnpm build
```
Notlar: frontmatter **gray-matter ile** okunur; `catalog.json` 2 boşluklu `JSON.stringify` ile
byte-identical round-trip yapar; `roadmap.json`'un kompakt satır biçimi satır bazlı replace ile
korunur. **Sıra önemlidir:** `sync-series-hashes.cjs` katalog varsa yalnızca katalog kayıtlarını
gezer, dolayısıyla yeni makalelerin hash'i ancak `entegre-batch --write`'tan **sonra** düzelir;
frontmatter'a önce yer tutucu hash yazmak sorun değildir. Roadmap başlığı frontmatter başlığıyla
birebir eşleşmek zorundadır — başlık değiştiriliyorsa roadmap.json entegrasyondan **önce**
güncellenmelidir (Batch 9'da 42 için bu yapıldı). **Entegrasyondan sonra makale gövdesine her
dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır**; Batch 9'da üç şeklin alt
metni düzeltilince bu yeniden yapıldı. Araçların üçü de varsayılan olarak **yalnızca AI serisini**
işler (`--series=boun` ayrı seri içindir).

**Dev server ve build yalıtımı.** Depoda paralel bir oturum çalışıyor olabilir ve Batch 9'da
çalışıyordu (port 3200, aynı depo, `.claude/launch.json` artık bu portu tanımlıyor). İki Next
süreci aynı `.next` dizinini paylaşır. Paralel bir dev sunucusu **varsa** Batch 7/9'un yolu
geçerlidir: depoyu aynı sürücüde bir kopyaya çıkar (`tar` ile `node_modules`, `.next`, `.git`,
`artifacts` **ve `.env.local`** hariç), kopyanın `node_modules` dizini için depodakine
`cmd /c mklink /J` ile junction kur, dev sunucusunu orada başlat; temizlerken **önce** junction'ı
`cmd /c rmdir` ile kaldır (`rm -rf` junction'ı takip edip gerçek `node_modules`'ü silebilir).
`.env.local`'ı kopyalamamak önemlidir: o dosya `SITE_PASSWORD_SHA256` ve `AUTH_COOKIE_SECRET`
tanımlar ve **artık depoda mevcuttur**, yani ana depodaki dev sunucusu parola kapısı arkasındadır
ve `/seri` isteği `/login`'e 307 döner. Kopyada bu dosya olmayınca `getGateConfig()` null döner ve
kapı kapanır. Dev sunucusunu durdururken `pkill -f "next dev"` Windows'ta işe yaramıyor;
`netstat -ano` ile PID bulup `taskkill //PID <pid> //T //F` kullan. Makale gövdesi ya da katalog
değiştikten sonra dev server'ın önbelleğe aldığı `catalog.json` bayatlar; çaresi dev server'ı
yeniden başlatmaktır (Batch 9'da hash resenkronundan sonra yapıldı).

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un en pahalı bulgusu.** `artifacts/`
gitignore'ludur ama `next build` proje dizinini yine de geziyor. Bu run'da iki tur ekran görüntüsü
(`shots`, `shots-final`, `figs`, `figs2`; ~13,6 MB, yüzlerce PNG) biriktiğinde build "Collecting
page data" aşamasında `PageNotFoundError: Cannot find module for page: /_document` ile
düşüyordu; ilk belirti ise `_not-found/page.js.nft.json` için ENOENT'ti. Kod, içerik, `src`,
`.env.local` ve `pnpm-workspace.yaml` tek tek elenerek (temiz bir `git worktree` içinde HEAD +
içerik, HEAD + `src`, HEAD + ikisi kombinasyonları derlenerek) sebebin **yalnızca `artifacts/`
büyüklüğü** olduğu kanıtlandı: dizin geçici olarak dışarı alınınca build exit 0 veriyor. Kural:
**her batch, doğrulama bittikten sonra kendi ham ekran görüntüsü klasörlerini `artifacts/`
içinden temizlemeli**, yalnızca yeniden kullanılacak `.mjs` betiklerini ve son kanıt setini
bırakmalıdır. Batch 9 sonunda `artifacts/b9-render` 6,8 MB'a indirildi ve build yeşil.

**Render doğrulama seti.** `artifacts/b9-render/shot-batch9.mjs` tek komutta şunları ölçüyor: üç
genişlik (375/768/1440) × üç tema (`light`/`dark`/`sepia`) için `body` arka plan/metin renkleri,
`figure svg` içindeki bütün `text` düğümlerinin hesaplanmış `fill` değerlerinin `rgb(...)` olarak
çözülmesi, `getBBox` ile metinlerin viewBox içinde kalması, `documentElement.scrollWidth >
clientWidth` ile yatay taşma, figure/svg sayısı, figcaption metinleri, gövde metni uzunluğu,
`undefined`/`NaN` sızıntısı ve sayfa içinden `fetch` ile rota sweep'i. Beklenen şekil sayısı
makale başına verilir (`SLUGS` üçlüsünün son elemanı). `artifacts/b9-render/figs-b9.mjs` her şekli
tek tek light/dark kırpıyor. Sonraki batch için yalnızca iki dosyanın başındaki slug listesi ve
`RENDER_BASE` değişir. Playwright betikleri depo `node_modules`'ünü gören bir dizinden çalışmalı.

**Diyagramda metin binmesi denetlenmiyor — gözle bakmak zorunlu.** `check-series-svg.cjs` yalnızca
viewBox taşmasını görür; iki metnin ya da metin ile çizginin üst üste binmesini **hiç görmez**.
Batch 9'da üç şekil bu yüzden yeniden çizildi (40-Şekil 1'de eğri etiketleri eğrilerin üstündeydi;
42-Şekil 1'de açıklamalar iki çizgiyi kesiyordu; 42-Şekil 2'de etiket, çubuk ve değer birbirine
giriyordu). Çalışan desen: çizim alanını daraltıp sağda ayrı bir **gösterge/açıklama sütunu**
açmak, ve yatay çubuk şemalarını **üç sütun** olarak kurmak (solda ad, ortada çubuk, sağda değer).

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır ve her batch'in betikleri aynı hataları üretir; bu, b7-render'dan
  beri süregelen bilinen durumdur.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur
  (Batch 9'da yeniden doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG ~720 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon değil.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–9'un yeni şekillerinde alt pay ≥ 18 birime çıkarıldı;
  yayımlanmış eski şekillerin bir kısmında bu pay hâlâ küçüktür.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–42). Bu kasıtlıdır (kararlar #65, #107) ve UI bunu destekler;
  `reading-list-groups.test.ts` tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 9 sonunda 91).
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor. Dördü git'te **izleniyor**
  (`Karar`, `her`, `Yaşayan`, `yapılırsa`); ikisi izlenmiyor (`**Bu`, `**zorundadır**.` — bu
  ikisindeki `*` görünümlü karakter aslında U+F02A). Build'i etkilemedikleri bu run'da
  sınanarak doğrulandı. Temizlik AI serisinin kapsamı dışıdır; sahibinin kararı.

## Non-normative history (tarihsel kayıt; aktif komut değildir)

- **Batch 0 (2026-08-25):** Makale 1–5, `foundations`; seri altyapısı aynı görevde kuruldu.
- **Batch 1 (2026-08-26/27):** Makale 6–10, `models-and-training`. İnceleme turu 20 BLOCKER +
  ~40 MAJOR buldu (en ağırı: makale 9'un Kaplan tahsisinin baştan yanlış kurulması).
- **Batch 2 (2026-08-29):** Makale 11–14, serinin ilk `intermediate` kohortu. 191 test, 40 rota 200.
- **Batch 3 (2026-08-29):** Makale 15–18. 208 test, `pnpm build` (52 sayfa), 48 rota 200.
- **Batch 4 (2026-08-29):** Makale 19–22; Faz 2 kapandı, Faz 3 açıldı (karar #50). 223 test,
  59 sayfa, 55 rota 200.
- **Batch 5 (2026-08-30):** Makale 23–26; Faz 3'ün pencere/istem/bellek yayı. 241 test, 66 sayfa.
- **Batch 6 (2026-08-30):** Makale 27–30; Faz 3 kapandı. 29 `agents-and-retrieval` (karar #65).
  259 test, 73 sayfa, on iki şekil piksel görüntüsüyle doğrulandı.
- **Batch 7 (2026-08-30):** Makale 31–34; Faz 4'ün ilk yarısı. 277 test, 80 sayfa. Build ve render
  doğrulaması, paralel oturumun dev sunucusu yüzünden izole bir kopyada yürütüldü.
- **Batch 8 (2026-09-01):** Makale 35–38; akıl yürütmenin doğrulama–arama–biçimselleştirme–süreç
  denetimi dörtlüsü. 294 test, 87 sayfa, 39 rota 200. Üç hakemsiz kaynak bilinçli kullanıldı
  (karar #106).
- **Batch 9 (2026-09-02):** Makale 39–42. 39 ve 40 `reasoning-and-memory` ile Faz 4'ü kapattı;
  41 ve 42 `agents-and-retrieval` ile Faz 5'i açtı (karar #107). `BATCH=4+1` ile, tek oturumda,
  yardımcı agent kullanmadan yürüdü (bir araştırma workflow'u denendi ve subagent limitine takıldı;
  bütün araştırma, yazım, entegrasyon ve doğrulama ana oturumda yapıldı). On yedi birincil kaynak
  PDF'i `pypdf` ile metne çevrilerek okundu ve **hepsi hakemlidir** (karar #114); beş aday yalnızca
  CoRR'de indekslendiği için kullanılmadı. Venue doğrulaması DBLP API'siyle yapıldı, sayfa
  numaraları `.bib` kayıtlarından alındı; REALM için birincil PMLR sayfası DBLP'nin üstüne konuldu
  (karar #113). 42'nin başlığı Türkçeleştirildi (karar #108) ve roadmap entegrasyondan önce
  güncellendi. Doğrulama kapılarının tamamı geçti: 419 test, `pnpm typecheck`, `pnpm build`
  (91 sayfa, exit 0), 43 rotanın tamamı 200, üç genişlik × üç temada DOM ölçümüyle render
  doğrulaması (badFills ve outOfBox boş, yatay taşma yok, `undefined`/`NaN` sızıntısı yok),
  12 yeni diyagramın tamamı light/dark piksel görüntüsüyle gözle doğrulandı ve **üçü bu sayede
  yeniden çizildi** (metin binmesi). Build bir ara `PageNotFoundError: /_document` ile kırıldı;
  kök neden `git worktree` içinde bileşen bileşen elenerek `artifacts/` dizininin büyüklüğü olarak
  bulundu ve dizin küçültülerek çözüldü (yukarıdaki bölüme bakınız).
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
