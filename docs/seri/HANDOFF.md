# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-03 · Durum: **1–46 yayında (kohort Batch 0 → Batch 10) · Sıradaki: 47**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 46 — `ragin-otesi-getirerek-akil-yuruten-sistemler` |
| Sıradaki güvenli başlangıç | Makale 47 ("Araç Kullanımı: Function Calling"); run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 11` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–46 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85, #98 ve #107). Faz 5 (41–50) `agents-and-retrieval` ile sürüyor (karar #65) |

## Açık borçlar

- **2026-09-03 editoryal/akademik denetim (Fable 5.1, tek oturum, SOZLESME v2.1).** 1–46 ve BOUN
  1–27 baştan sona okundu; 186 SVG'nin etiketleri metinle karşılaştırıldı; sayısal örnekler
  yeniden hesaplandı (uyumsuzluk bulunmadı). Uygulanan düzeltmeler: 1'de "yüz makale / sonraki
  doksan dokuz makale" sayım dili kaldırıldı (SOZLESME §1 ile çelişiyordu); 9 ve 27'de terim
  defterine aykırı "gömme" → "embedding"; 7 ve 9'da on satır içinde iki kez tekrarlanan benzetme
  kalıbı birer kez doğal ifadeye çevrildi. Dört makalenin `content_hash`'i yeniden senkronlandı;
  id/slug/sıra/URL değişmedi. **Bilinçli olarak dokunulmayanlar:** "Benzetmenin bozulduğu yer
  şurası" kalıbı 1–6, 8, 10, 13 ve 25'te (17 yer) ve "Bir dürüstlük notu" etiketi 13 yerde
  duruyor — okuru yanıltmıyor, yalnızca kalıp; §2 kalıp yasağı ileriye dönüktür, geriye dönük
  üslup düzeltmesi yapılmadı. 41'in "buraya, 41. makaleye" öz-göndermesi vaat kapanışıdır ve
  doğrudur. İleri göndermelerin tamamı vaat defteriyle eşleşti (5→78; 6/18→74–77; 7/15→86;
  8/16/18/31→72; 9→78; 13→64; 16/22→101; 20→61–70, 69, 85). Sıradaki run için yeni kapı: §3
  terim defteri yasaklı-biçim taraması ve §5 ileri gönderme taraması yayın öncesi zorunludur.
- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115). Batch 10 bu
  katmana yine bilinçli olarak dokunmadı; Faz 5'in altındaki altı yayımlanmış başlığın tamamı
  artık Türkçe ("Getirme", "Dizinleme", "Parçalama", "Getirerek Akıl Yürüten") ama faz adı hâlâ
  "Retrieval ve Araçlar". Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler.** 47'nin başlığı "Araç Kullanımı: Function
  Calling" — "function calling" için Türkçede yerleşik bir karşılık **yok** ("işlev çağrısı" bu
  seride kurulmuş değil); karar #108'in ölçütüne göre kısaltma gibi korunabilir ya da 47'nin
  gövdesinde kurulacak terimle ("araç çağrısı"/"işlev çağrısı") değiştirilebilir — o run'da
  kararlaştırılıp **roadmap.json entegrasyondan önce** güncellenmelidir. 49'daki "MCP" kısaltma
  sınıfındadır ve çevrilmez. 48 ve 50 zaten Türkçedir.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 10 **hiç koordinat açmadı ve kapatmadı**; dört makalenin metin içi
  numaralı göndermelerinin tamamı yayımlanmış makalelere (≤46) yapıldı ve makale başına `grep`
  ile doğrulandı. Sıradaki run'ın doğrudan ödeyeceği bir vaat **yoktur**; defterde açık kalan en
  yakın tekil koordinat **64**'tür (13'ten gelen "ilkelere dayalı tercih etiketleri"), ondan
  sonra 61–70 bandı ve 72. Numarasız işaretler: 45 → 50 (kaynak güveni ve tazelik), 43 → 50
  (tarih/kaynak filtresi), 46 → 47 (eylemin kendisi).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan künyeler:** (1) Gerstgrasser ve ark. (2024) için COLM 2024 venue'sü iki bağımsız
  ikincil kaynakla doğrulandı, birincil venue sayfası teyidi alınamadı (karar #21). (2) Batch 7'de
  Brown ve ark.'nın "Large Language Monkeys" çalışması doğrulanamadığı için kullanılmadı (karar
  #97). (3) Batch 8'de Chen ve ark. ile Swamy ve ark. yalnızca CoRR'de indekslendiği için
  kullanılmadı. (4) Bellman'ın 1957 çalışmasının sayı numarası kaynaklar arasında farklı verilir
  (karar #104). (5) Batch 9'da beş aday aynı sebeple kullanılmadı (karar #114). (6) Batch 10'da
  Jégou, Douze & Schmid (IEEE TPAMI 2011) künyesi Crossref ve DBLP ile doğrulandı ama **metni
  alınamadı** (HAL ve IEEE bot engeli); yalnızca köken atfı için listelendi, sayı alınmadı,
  mekanizma Johnson ve ark. (2021) üzerinden kuruldu (karar #116). (7) Search-R1 (Jin ve ark.)
  PDF'i "COLM 2025" diyor ama DBLP yalnızca CoRR gösteriyor ve OpenReview/COLM birincil sayfası
  bulunamadı; kullanılmadı (karar #120).
- **Hakemsiz kaynak listesi Batch 10'da genişlemedi.** Kullanılan 51 kaynağın tamamı hakemli
  (karar #120); karar #6'daki listeye kalem eklenmedi. Batch 9'un "hepsi hakemli" serisi sürüyor.

## Next batch preparation — 47'den devam

**Pedagojik hedefler.** Batch 10'un sonunda okuyucu şunu biliyor: dizin yaklaşık arar ve
kaçırdığı komşuların çoğu ilgisizdir (43); hattın her düğmesi ölçülür ve bedeli saniye
cinsindendir (44); hat üç katmanda ayrı ayrı bozulur ve ölçen modelin kendisi yanlıdır (45);
tek getirme çok adımlı soruya yetmez, model düşün–eyle–gözle döngüsünde arar (46). 46 bilinçli
olarak tek bir kapıyı açık bıraktı: döngüdeki "eylem" satırı aramaya özel değildir. Toolformer
paragrafı bunu kanıtladı (6,7 milyar parametreli model araç çağrısıyla 25 kat büyük modeli
geçiyor) ve 47'ye şu soruyu devretti: model bir işlevi nasıl çağırır, çağrının biçimi nasıl
garanti edilir, dönen sonuç isteme nasıl girer?

**Sıradaki makaleler ve prerequisite'ler.** 47 ← 46 (düşün–eyle–gözle; eylem = dünyaya dokunan
çağrı; Toolformer'ın "ne zaman çağıracağını kendi öğrenir" bulgusu), 30 (kısıtlı üretim ve
şema: işlev argümanlarının JSON biçim garantisi — bilinçli formalizasyon adayı), 24 (sohbet
şablonu ve konuşmacı rolleri: araç mesajı diziye nasıl girer; talimat hiyerarşisi), 37 (eylem
sözcüğünün biçimsel kökeni), 36 (aramanın araçla dışarıdan aldığı iki bileşen: durum bilgisi ve
doğrulama), 35 (araç = sağlam dış doğrulayıcı), 21 (pencereye giren üçüncü taraf metin: araç
çıktısı da bir bağlam kaynağıdır), 28 (araç çağrısının gecikmesi). 48'e geçilirse: 48 ← 47, 46,
44 (dosya parçalama), 43 (dosyalar için dizin), 39 (bellek). Kaç makale üretileceği bu run'ın
`BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Kısıtlı üretim ve şema (30) → 47'de işlev argümanlarının biçim garantisi.
- Konuşmacı rolü ve sohbet şablonu (24) → 47'de araç mesajı rolü.
- Düşün–eyle–gözle (46) → 47'de eylem satırının genelleşmesi; 51'de ajan döngüsü.
- Sağlam doğrulayıcı (35) → 47'de araçtan gelen dış geri bildirim.
- Bütçe muhasebesi (28, 33) → 47'de çağrı başına gecikme ve maliyet.
- Halka başına hata birikimi (46, 40) → 47'de çok çağrılı zincirlerde hata.
- Yaklaşık en yakın komşu (43) → 48'de dosyalar için dizin; parçalama (44) → 48'de kod/dosya
  parçalama.

**Araştırılacak güncel akademik alanlar (47 için öncelikli):** işlev çağrısını öğreten
düzenler (Toolformer kullanıldı; Gorilla — Patil ve ark., NeurIPS 2024; ToolLLM/ToolBench — Qin
ve ark., ICLR 2024; API-Bank — Li ve ark., EMNLP 2023), araç seçimi ve argüman doğruluğunun
ölçümü (Berkeley Function Calling Leaderboard **hakemsiz**; τ-bench venue'sü doğrulanmalı),
çağrı biçiminin kısıtlı üretimle garanti edilmesi (30'un kaynakları), paralel/ardışık çağrı ve
hata kurtarma, araç açıklamasının (JSON şeması) isteme maliyeti. Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Üç kanal birlikte işe yarıyor: (1) `https://api.crossref.org/works/<doi>`
dergi ve ACM künyeleri için cilt/sayı/sayfa/yılı döndürür, bot engeli yoktur; (2) ACL Anthology
sayfa başlığı `curl` ile alınır; (3) ICLR/NeurIPS/COLM için DBLP API (`artifacts/b9-research/dblp.py`,
sorgular arası 11 sn; toplu liste `artifacts/b10-research/titles-b10.txt` örnek). IEEE Xplore,
Springer, ACM DL ve HAL WebFetch'e 403/challenge döner; PDF'ler arXiv ya da Anthology'den
`curl` ile indirilip `pypdf` ile metne çevrilir. **Karar #113** geçerli: DBLP yalnızca CoRR
gösteriyorsa birincil bildiri sayfası aranır; bulunamazsa (Search-R1 örneği) kaynak kullanılmaz.
Batch 10'un ~55 kaynak metni `artifacts/b10-research/pdf/*.txt` altında duruyor; PDF'ler build
şişmesin diye silindi.

**Görselleştirme ihtiyaçları (öngörü):**
- 47: bir işlev çağrısının yaşam döngüsü — şema istemde, model çağrı üretir, çalıştırıcı sonucu
  döndürür, model cevabı yazar (46-Şekil 2'nin döngüsüyle görsel süreklilik).
- 47: araç seçimi doğruluğu ↔ araç sayısı (kaynak bulunursa sayısal, bulunamazsa yapısal).
- 47: kısıtlı üretimle argüman şeması (30-Şekil'lerinin diliyle).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 11` ve `readingOrder` 47'den
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
güncellenmelidir (Batch 10'da 43, 44 ve 46 için bu yapıldı). **Entegrasyondan sonra makale
gövdesine her dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır.** Araçların
üçü de varsayılan olarak **yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir).
`check-series-svg.cjs` XML ayrıştırmaz: her yeni SVG ayrıca
`python -c "import xml.etree.ElementTree as ET; ET.parse(f)"` ile ayrıştırılır (Batch 10'da bir
`font(-size` yazım hatası yalnızca bu adımla yakalandı).

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.**
Batch 10'da run başında 3000–3999 arası dinleyen port yoktu ve `pnpm build` doğrudan depoda,
temiz `.next` ile geçti (13:1x). Ama 13:48'de **başka bir Claude oturumu** aynı worktree'de
3000 portunda `corepack pnpm dev` açtı (reader/ana sayfa UX işi; `src/` ve `globals.css`'e
dokunuyor, `content/`'a dokunmuyor). İki `next dev` süreci `.next`'i paylaşınca benim 3210
sunucum `vendor-chunks`/manifest ENOENT ile 500 ve `/seri/[slug]` için 404 verdi; benim iki
`rm -rf .next`'im de onun sunucusunu 500'e düşürdü (karşı oturum mesajla bildirdi ve yeniden
başlattı). Çözüm Batch 7/9'un izole kopya yoluydu ve bu run'da tam olarak şöyle çalıştı:
`tar -c --exclude=./node_modules --exclude=./.next --exclude=./.git --exclude=./artifacts
--exclude=./.env.local --exclude=./test-results . | tar -x -C /d/dev/anil-lib-b10-render`
(7,3 MB), PowerShell `New-Item -ItemType Junction -Path ...\node_modules -Target
D:\dev\anil-lib\node_modules`, `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b10`: `runtimeExecutable` Git Bash **tam yolu**
`C:\Users\<user>\AppData\Local\Programs\Git\usr\bin\bash.exe`, `-c "export PATH=\"/usr/bin:$PATH\";
cd /d/dev/anil-lib-b10-render && exec corepack pnpm dev -p 3210"`; `bash` çıplak adıyla
bulunmuyor, `/usr/bin` PATH'te olmayınca `corepack` kabuk şimi `sed`/`dirname` bulamıyor);
kopyada `.env.local` olmadığı için kapı kendiliğinden kapalı. Temizlik: **önce** junction'ı
`cmd /c rmdir` ile kaldır, sonra kopyayı sil; launch.json özgün hâline döndürüldü. Kural:
**ana worktree'de `.next` silme, `pnpm build` ya da `next dev` başlatmadan önce `netstat` ve
`Get-CimInstance Win32_Process -Filter "name='node.exe'"` ile o an paralel süreç var mı bak;
varsa karşı oturuma haber ver ve izole kopyayı kullan.** Kapısız dev için alternatif (paralel
sunucu yoksa): env'i boş dizeyle ezmek (`SITE_PASSWORD_SHA256= AUTH_COOKIE_SECRET= ... pnpm dev`);
`@next/env` boş dizeyle gelen değişkeni `.env.local`'dan yeniden yüklemez, `isGateIntended()`
false döner, middleware geçirir — geçersiz dolu değer ise `/login?error=config`'e yönlendirir.
Dev sunucusunu durdururken `netstat -ano` ile PID bulup `taskkill //PID <pid> //T //F` kullan.
Makale gövdesi ya da katalog değiştikten sonra dev server'ın önbelleğe aldığı `catalog.json`
bayatlar; çaresi dev server'ı yeniden başlatmaktır. Rota sweep'ini tarayıcı gezintileriyle
eşzamanlı çalıştırma; tema ölçümü için sayfayı yeniden yüklemek yerine `documentElement`
üzerinde `dark`/`sepia` sınıfını değiştirip ölç.

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 10 build'i
`artifacts/` 133 MB iken (b7-src 33 MB, boun-render 54 MB, latest 11 MB, b10-research'ün ~55 MB
PDF'i dahil) **yeşil** çıktı (95 sayfa, exit 0); yani tetikleyici salt toplam boyut değil. Yine de
kural değişmedi: her batch kendi ham ekran görüntüsü klasörlerini ve büyük ikili dosyalarını
`artifacts/` içinden temizler. Batch 10 sonunda `artifacts/b10-research/pdf/*.pdf` silindi,
`.txt` metinleri ve `dblp-b10.*` kaldı.

**Render doğrulama seti.** Batch 10'da doğrulama, kullanıcı talimatıyla, betikle değil tarayıcı
panosundan **elle** yapıldı: `resize_window` ile 375/768/1440, `localStorage`'a
`anil-lib:reader-preferences:v1` yazıp `navigate` ile tema (`light`/`dark`/`sepia`), sonra
`javascript_tool` ile DOM ölçümü (`figure svg text` fill'lerinin `rgb(...)` çözülmesi, `getBBox`
ile viewBox içi kalma, `documentElement.scrollWidth > clientWidth`, figure/svg/figcaption
sayısı, gövde uzunluğu, `undefined`/`NaN` sızıntısı) ve her şeklin light/dark ekran
görüntüsüyle gözle denetim. `artifacts/b10-render/shot-batch10.mjs` ve `figs-b10.mjs` aynı
ölçümün betik hâlidir (Batch 9 deseni, slug'lar güncel) ve bu run'da **çalıştırılmadı**.
Tarayıcı ölçümünde `clientWidth` 0 dönerse pano boyutlandırılmamıştır; önce `resize_window`.

**Diyagramda metin binmesi denetlenmiyor — gözle bakmak zorunlu.** `check-series-svg.cjs` yalnızca
viewBox taşmasını görür. Çalışan desen: çizim alanını daraltıp sağda ayrı bir gösterge sütunu
açmak; yatay çubuk şemasını üç sütun kurmak (solda ad, ortada çubuk, sağda değer). Gösterge
sütununda 13 birimlik metin x=560'tan başlıyorsa en fazla ~20 karakter alır (denetleyicinin
tahmini karakter × 7,15); daha uzun etiket için değerleri çubukların hemen sağına çekip
göstergeyi x≈500'e almak gerekir (44-Şekil 1).

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur
  (Batch 10'da yeniden doğrulandı).
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG ~720 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon değil.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–10'un yeni şekillerinde alt pay ≥ 18 birim;
  yayımlanmış eski şekillerin bir kısmında bu pay hâlâ küçüktür.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–46). Kasıtlıdır (kararlar #65, #107); `reading-list-groups.test.ts`
  tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 10 sonunda 95).
- Depo kökünde adı bozuk, sıfır baytlık birkaç dosya duruyor. Dördü git'te **izleniyor**
  (`Karar`, `her`, `Yaşayan`, `yapılırsa`); biri izlenmiyor (`**zorundadır**.` — `*` görünümlü
  karakter U+F02A). Build'i etkilemiyor. Temizlik AI serisinin kapsamı dışıdır; sahibinin kararı.

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
  41 ve 42 `agents-and-retrieval` ile Faz 5'i açtı (karar #107). 419 test, 91 sayfa, 43 rota 200;
  on yedi kaynağın tamamı hakemli (karar #114); üç şekil metin binmesi yüzünden yeniden çizildi;
  build `artifacts/` şişmesiyle kırılıp dizin küçültülerek düzeldi.
- **Batch 10 (2026-09-02/03):** Makale 43–46, Faz 5'in gövdesi: vektör dizini → getirme hattı →
  RAG değerlendirmesi → getirerek akıl yürütme. `BATCH=4+1`. Başlangıçta 12 agent'lık bir araştırma
  workflow'u başlatıldı, oturum kesilince JSON çıktısız durdu; agent'ların indirdiği ~55 PDF
  metne çevrilmiş hâlde diskte kaldı ve kullanıcı talimatıyla bütün araştırma, yazım, entegrasyon
  ve doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı. Üç başlık Türkçeleştirildi
  (karar #115) ve roadmap entegrasyondan önce güncellendi. 51 kaynağın tamamı hakemli (karar
  #120); künyeler Crossref, ACL Anthology ve DBLP ile doğrulandı; PQ makalesinin metni alınamadı,
  Search-R1 venue'sü doğrulanamayıp kullanılmadı. Kapılar: 431 test, `pnpm typecheck`,
  `pnpm build` (95 sayfa, exit 0), 47 rotanın tamamı 200, üç genişlik × üç temada tarayıcı
  panosundan DOM ölçümü (badFills ve outOfBox boş, yatay taşma yok, sızıntı yok), 12 yeni
  diyagramın tamamı light/dark ekran görüntüsüyle gözle doğrulandı. Render doğrulaması, run
  ortasında ortaya çıkan paralel oturumun 3000 portundaki dev sunucusu yüzünden izole kopyada
  (`D:\dev\anil-lib-b10-render`, 3210) yürütüldü; `.claude/launch.json` geçici yapılandırması run
  sonunda geri alındı, kopya ve junction silindi.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
