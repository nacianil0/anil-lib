# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-04 · Durum: **1–50 yayında (kohort Batch 0 → Batch 11) · Faz 5 kapandı · Sıradaki: 51**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 50 — `bilgi-tazeligi-guncellik-kaynak-guveni-ve-atif` |
| Sıradaki güvenli başlangıç | Makale 51 ("Ajan Nedir? Kontrol Döngüsü Olarak LLM"), Faz 6'nın ilk makalesi; run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 12` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–50 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85, #98, #107 ve #122). Faz 6 (51–60) için kategori 51'in run'ında kararlaştırılır; kontrollü sözlükte "ajan" yalnızca `agents-and-retrieval` içinde geçtiği için varsayılan devamlılıktır (karar #122) |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları ise terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121). Faz 5
  artık tamamen yayında ve on başlığının hiçbirinde "Retrieval" geçmiyor; faz adı hâlâ "Retrieval
  ve Araçlar". Katmanın tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler (Faz 6).** 55 "Kod Yazan Ajanlar: Yazılım
  Mühendisliğinde LLM" ("LLM" kısaltma, çevrilmez); 58 "Ajan Güvenliği: Prompt Injection ve
  Sandbox" — "istem enjeksiyonu" 24'te kurulmuş terim, "sandbox" için serideki karşılık henüz yok
  ("yalıtım" 49'da geçti); 59 "İnsan-Ajan İşbirliği: Denetim ve Devir" Türkçe. Değişiklikler o
  run'da kararlaştırılıp **roadmap.json entegrasyondan önce** güncellenmelidir (karar #108'in ölçütü).
- **"Ajan" teriminin kurulumu 51'e bırakıldı.** 48'de "ajan–bilgisayar arayüzü" gloss'landı ama
  gövde "araç kullanan model" dedi; 50'nin kapanışı "bu döngüye alanda ajan deniyor; sonraki makale
  bu sözcüğü tanımlıyor" diye söz verdi. 51 terimi kurmak ve 46–50'nin döngüsünü baştan kurmakla
  yükümlüdür; tanım verilmeden "ajan" sözcüğünün gövdede kullanılması SOZLESME §3'ü ihlal eder.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 11 **hiç koordinat açmadı ve kapatmadı**; dört makalenin metin içi
  numaralı göndermelerinin tamamı yayımlanmış makalelere (≤50) yapıldı ve makale başına `grep`
  ile doğrulandı. Sıradaki run'ın doğrudan ödeyeceği bir vaat **yoktur**; defterde açık kalan en
  yakın tekil koordinat **64**'tür (13'ten gelen "ilkelere dayalı tercih etiketleri"), ondan sonra
  61–70 bandı ve 72. Numarasız işaretler: 47/50 → 51 (ajan tanımı ve kontrol döngüsü), 48 → 54/55
  (tarayıcı ve kod ajanları), 49 → 58 (sunucu adı çakışması, davranış değiştiren sunucu,
  yalıtımdan kaçış), 50 → 65 (güvenilirlik ve kalibrasyon).
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1) Gerstgrasser ve ark. (2024) COLM 2024 —
  iki ikincil kaynak, birincil sayfa yok (karar #21). (2) Batch 7'de Brown ve ark. "Large Language
  Monkeys" kullanılmadı (karar #97). (3) Batch 8'de Chen ve ark. ile Swamy ve ark. yalnızca CoRR
  (karar #106). (4) Bellman 1957 sayı numarası (karar #104). (5) Batch 9'da beş aday (karar #114).
  (6) Batch 10'da Jégou ve ark. (IEEE TPAMI 2011) metni alınamadı; Search-R1 venue'sü
  doğrulanamadı (karar #120). (7) **Batch 11:** Hou ve ark. (ACM TOSEM) Crossref'te cilt/sayı
  henüz atanmamış, yalnızca makale numarası 3796519 var; Cheng ve ark. (COLM 2024) kabul listesi
  `2024.colmweb.org` üzerinden doğrulandı ama sayfa sertifikası GitHub'a ait (`curl -k`); Wang ve
  ark. (MCP-Bench) DBLP'de yalnızca CoRR, ICLR 2026 birincil bildiri sayfası doğrulandı (karar
  #113 uygulandı). ACM ve Wiley `doi.org` bağlantıları bot'a 403 döner; okuyucuda açılır.
- **Hakemsiz kaynak listesi Batch 11'de büyüdü — işaretlenerek.** Meta Llama 3.1 belgelendirmesi,
  Anthropic belgelendirmesi (araç kullanımı ve araç arama), MCP belirtimi ve kayıt belgesi resmî
  belgelendirme olarak; Nakano ve ark. (WebGPT, arXiv 2112.09332) hakemli olmayan ön çalışma
  olarak kullanıldı; Wallace ve ark. 24'ten devir. Karar #127'de gerekçeleriyle kayıtlı; karar
  #6'daki liste bu kalemlerle güncellenmelidir (o liste bu run'da değiştirilmedi, kayıt #127'dedir).

## Next batch preparation — 51'den devam (Faz 6 açılıyor)

**Pedagojik hedefler.** Batch 11'in sonunda okuyucu şunu biliyor: çağrı, dizinin içinde sıradan
metindir; tanım istemde, çağrı asistan rolünde, sonuç ayrı bir rolde durur ve ikinci bir durma
token'ı vardır (47); araç döndürdüğü şeyle tanımlanır, arayüzün bir düğmesi başarıyı üçte bir
oynatır (48); protokol tanımı ve çağrıyı taşır, kararı değil; açıklama bir saldırı yüzeyidir (49);
kesim tarihi bir dağılımdır, model tek çelişen belgeye uyar ama çelişen belgeler arasında belleğine
yaslanır, atıf kaynağın varlığını kanıtlar iddiayı değil (50). Faz 5'in bütünü, 46'nın
düşün–eyle–gözle döngüsünü parça parça açtı; bir tek şey tanımsız kaldı: döngüyü baştan sona
yöneten şeyin adı. 50'nin kapanışı bunu 51'e devretti: "model hangi aracı ne zaman çağıracağına, ne
zaman duracağına ve işin bitip bitmediğine kendi başına karar verdiğinde ne olur?"

**Sıradaki makaleler ve prerequisite'ler.** 51 ← 46 (düşün–eyle–gözle döngüsü; eylem = dünyaya
dokunan çağrı), 47 (işlev çağrısı; çalıştırıcı; pass^k güvenilirliği; ilgisizlik kararı), 48
(araç arayüzü; hata mesajı bir gözlemdir), 49 (araç kümesinin nereden geldiği; MCP), 37 (Markov
karar süreci: durum, eylem, geçiş, bölüm — ajan döngüsünün biçimsel iskeleti; **bilinçli
formalizasyon adayı**), 40 (görev ufku; çarpımsal düşüş; toparlanma), 36 (arama ve planlama; ağaç),
35 (dış geri bildirim ve sağlam doğrulayıcı), 39 (sohbet içi bellek; ajan belleği 56'da). 52'ye
geçilirse: 52 ← 51, 46 (yansıma token'ları / eleştirmen), 47 (paralel çağrı ve geri alma), 36
(ağaç), 38 (süreç denetimi). 53 ← 51, 52, 28 (yığınlama/servis: çoklu ajanın maliyeti). Kaç makale
üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Markov karar süreci (37) → 51'de ajan döngüsünün biçimsel kurulumu (durum = pencere + dünya,
  eylem = çağrı ya da mesaj, ödül = görev sonucu); eylem sözcüğünün üçüncü kurulumu (37 token, 46
  çağrı, 51 karar).
- Düşün–eyle–gözle (46) → 51'de döngünün tam hâli; 48'in hata mesajı gözlemi.
- pass^k ve politika ablasyonu (47) → 51 ve 57'de ajan güvenilirliği.
- Araç arayüzü (48) → 51 (ajanın gördüğü dünya), 54 (ekran), 55 (depo).
- Görev ufku ve toparlanma (40) → 51'de "ne zaman duracağı" kararı; 60'ta ekonomi.
- Çarpımsal düşüş (40, 46, 47) → 52'de hata döngüleri ve geri alma.
- Bellek (39), yazma/okuma → 56 (ajan belleği); 50'nin tazelik ve çatışma bulguları → 56, 58.
- Talimat hiyerarşisi (24), istem enjeksiyonu (24, 41, 49) → 58.
- Kalibrasyon (16, 50) → 59 (insana ne zaman devredileceği), 65.

**Araştırılacak güncel akademik alanlar (51 için öncelikli):** ajan tanımının kaynakları (Russell &
Norvig'in ajan tanımı; Wooldridge'in çoklu ajan kitabı; alan derlemeleri: Wang ve ark. 2024
Frontiers of Computer Science "A Survey on LLM-based Autonomous Agents" — hakemli dergi, doğrulanmalı;
Sumers ve ark. CoALA, TMLR 2024 — bilişsel mimari çerçevesi), döngü tasarımı (ReAct 46'da kullanıldı;
Reflexion — Shinn ve ark., NeurIPS 2023; "Tree of Thoughts" 36'da kullanıldı mı kontrol edilmeli),
ajan ölçütleri (AgentBench — Liu ve ark., ICLR 2024; WebArena — Zhou ve ark., ICLR 2024; τ-bench
47'de kullanıldı; SWE-bench — Jimenez ve ark., ICLR 2024, 48'de yalnızca SWE-agent'ın ölçütü olarak
anıldı, 55'e saklandı), durma ve bitirme kararı ("when to stop" ölçümleri; τ-bench'in "en çok 30
eylem" sınırı), kontrol döngüsü ile MDP'nin bağlantısı (37'nin kaynakları). Sayısal iddialar ve URL
doğrulaması yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10'un üç kanalı (Crossref API, ACL Anthology, DBLP 11 sn) sürüyor;
Batch 11 dört kanal ekledi: (4) PMLR PDF'leri `raw.githubusercontent.com/mlresearch/v<cilt>/main/assets/<key>/<key>.pdf`
aynasından (site PDF yerine HTML döndürdü); (5) COLM kabul listeleri `20xx.colmweb.org/AcceptedPapers.html`
— sertifika GitHub'a ait, `curl -k` gerekir; (6) ICLR 2026 bildirileri `proceedings.iclr.cc/paper_files/paper/2026/hash/<hash>-Abstract-Conference.html`
altında, DBLP henüz indekslememiş olabilir; (7) ACL Anthology `.bib` uç noktası (`<id>.bib`) sayfa
aralığını doğrudan verir. Toplu indirme betiği `artifacts/b11-research/fetch-b11.py` (arXiv + Anthology,
3 sn aralık, `pypdf`), DBLP listesi `titles-b11.txt` + `dblp-b11.json`. Batch 11'in ~50 kaynak metni
`artifacts/b11-research/pdf/*.txt` altında duruyor; PDF'ler build şişmesin diye silindi. **Karar #113**
geçerli: DBLP yalnızca CoRR gösteriyorsa birincil bildiri sayfası aranır (MCP-Bench örneği).

**Görselleştirme ihtiyaçları (öngörü):**
- 51: ajan kontrol döngüsünün tam hâli — gözlem, karar (çağrı ya da mesaj ya da dur), çalıştırıcı,
  dünya; 46-Şekil 2 ve 47-Şekil 1'in birleşimi; durma kararının yeri işaretli.
- 51: MDP ile döngünün eşlemesi (37'nin şekil diliyle: durum/eylem/geçiş/ödül kutuları).
- 51 ya da 52: adım sayısı ↔ başarı (40'ın eğrisi ajan verisiyle; kaynak bulunursa sayısal).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 12` ve `readingOrder` 51'den
kesintisiz devam ile eklenir; roadmap.json'da ilgili satırlar `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı, kavram-tekrar defteri, terim defteri ve gerekiyorsa bağlayıcı olgu
kararları güncellenir; doğrulama kapıları çalıştırılır; `+1` fazında bu dosya yeni cursor ve sonraki
run hazırlığıyla güncellenir. Faz 6'nın kategori kararı (karar #122) ilk makaleyle birlikte verilir.

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
güncellenmelidir (Batch 11'de 47 için yapıldı). **Entegrasyondan sonra makale gövdesine her
dokunuşta `sync-series-hashes.cjs --write` yeniden çalıştırılmalıdır** (Batch 11'de 50'nin bir
sözcüğü entegrasyondan sonra değişti ve hash yeniden senkronlandı). Araçların üçü de varsayılan
olarak **yalnızca AI serisini** işler (`--series=boun` ayrı seri içindir). `check-series-svg.cjs`
XML ayrıştırmaz: her yeni SVG ayrıca `python -c "import xml.etree.ElementTree as ET; ET.parse(f)"`
ile ayrıştırılır. Denetleyicinin taşma tahmini (karakter × 7,15) 13 birimde x=20'den ~97 karakter
alır; Batch 11'in on bir şeklinden altısının alt notu ilk çizimde taştı ve kısaltıldı.

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch
11'de run başında 3000–3999 arası dinleyen port yoktu; peer listesinde bir oturum görünüyordu ama
mesaj ulaşmadı (oturum bitmişti). Yine de Batch 7/9/10'un izole kopya yolu kullanıldı ve ana
worktree'nin `.next` dizinine hiç dokunulmadı: `tar -c --exclude=./node_modules --exclude=./.next
--exclude=./.git --exclude=./artifacts --exclude=./.env.local --exclude=./test-results
--exclude=./playwright-report . | tar -x -C /d/dev/anil-lib-b11-render` (7,5 MB), PowerShell
`New-Item -ItemType Junction -Path ...\node_modules -Target D:\dev\anil-lib\node_modules`, kopyada
`corepack pnpm build` (99 sayfa, exit 0), `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b11`: Git Bash **tam yolu** + `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b11-render
&& exec corepack pnpm dev -p 3210`), kopyada `.env.local` olmadığı için kapı kendiliğinden kapalı.
`typecheck` ve `test` ana worktree'de çalıştırıldı (`.next`'e dokunmazlar). Temizlik: **önce**
junction'ı `cmd /c rmdir` (ya da PowerShell `Remove-Item` junction'ı) ile kaldır, sonra kopyayı sil;
launch.json özgün hâline döndürüldü (`artifacts/b11-research/launch.json.orig` yedeği). Kural
değişmedi: **ana worktree'de `.next` silme, `pnpm build` ya da `next dev` başlatmadan önce
`netstat` ve `tasklist` ile o an paralel süreç var mı bak; varsa karşı oturuma haber ver ve izole
kopyayı kullan.**

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 11 sonunda
`artifacts/b11-research/pdf/*.pdf` silindi, `.txt` metinleri ve `dblp-b11.*` kaldı; render için
ham ekran görüntüsü klasörü açılmadı (tarayıcı panosu kullanıldı).

**Render doğrulama seti (Batch 11'de kullanılan).** Tarayıcı panosundan **elle**: `resize_window`
ile 1440/768/375, tema `documentElement.classList` üzerinde `dark`/`sepia` değiştirilerek (sayfa
yeniden yüklenmeden), ölçüm fonksiyonu `localStorage`'a yazılıp `eval(localStorage.getItem('b11m'))()`
ile çağrıldı: `body` renkleri, `figure svg text` fill'lerinin `rgb(...)` çözülmesi, `getBBox` ile
viewBox içi kalma, `scrollWidth > clientWidth`, figure/svg/figcaption sayıları, `main.innerText`
içinde `undefined`/`NaN`, h2/tablo/kutu sayıları. Dört makale × üç genişlik × üç tema: taşma yok,
badFills ve outOfBox boş, sızıntı yok; mobilde şekiller kendi kabında kayıyor (yerleşik davranış).
Şekil ekran görüntüleri için çalışan düzen: `resize_window` **800×560** (pano ölçekleme yapmaz),
şekli `position:fixed` bir kaplayıcıya klonlayıp SVG genişliğini 600 px'e sabitlemek, temayı
sınıfla değiştirmek ve ekran görüntüsünü **`browser_batch` dışında tek çağrıyla** almak — batch
içindeki ekran görüntüleri "did not finish rendering" zaman aşımı ve "image omitted" hatası verdi;
tek çağrı ikinci denemede çalıştı. 1440 emülasyonunda pano 800×505'e ölçeklendiği için 13 birimlik
metin okunmuyor. Rota sweep'i Python `urllib` ile (51 rota, 23 sn), tarayıcı gezintisinden **önce**.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur.
- Mobil genişlikte diyagramlar kendi kaplarında yatay kayar (SVG ~720 birim, kap ~335 birim);
  sayfa gövdesi taşmaz. Yayımlanmış makalelerde de aynı olan yerleşik davranıştır, regresyon değil
  (Batch 11'de dört makalede yeniden ölçüldü: `figScroll` 375'te true, 768'de false).
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–11'in yeni şekillerinde alt pay ≥ 16 birim;
  yayımlanmış eski şekillerin bir kısmında bu pay hâlâ küçüktür.
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–50). Kasıtlıdır (kararlar #65, #107); `reading-list-groups.test.ts`
  tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 11 sonunda 99).
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
  RAG değerlendirmesi → getirerek akıl yürütme. `BATCH=4+1`. Araştırma, yazım, entegrasyon ve
  doğrulama ana oturumda, workflow/subagent kullanılmadan yapıldı. Üç başlık Türkçeleştirildi
  (karar #115). 51 kaynağın tamamı hakemli (karar #120). Kapılar: 431 test, `pnpm build` (95 sayfa),
  47 rotanın tamamı 200, üç genişlik × üç temada DOM ölçümü, 12 yeni diyagram light/dark ekran
  görüntüsüyle doğrulandı; render izole kopyada (3210).
- **Batch 11 (2026-09-03/04):** Makale 47–50, Faz 5'in kapanışı: işlev çağrısı → web/kod/dosya
  arayüzleri → MCP ve ekosistem → tazelik, çatışma ve atıf. `BATCH=4+1`. Araştırma (50 PDF tek
  betikle, DBLP 50 başlık), yazım, entegrasyon ve doğrulama ana oturumda, workflow/subagent
  kullanılmadan yapıldı. 47'nin başlığı Türkçeleştirildi (karar #121) ve roadmap entegrasyondan
  önce güncellendi. 50 kaynak kaleminin 44'ü hakemli; altı resmî belgelendirme/ön çalışma
  işaretlenerek kullanıldı (karar #127). Yeni künye kanalları: PMLR GitHub aynası, COLM kabul
  listesi, ICLR 2026 proceedings, ACL `.bib`. Kapılar: `pnpm typecheck`, 446 test, `pnpm build`
  (99 sayfa, exit 0, izole kopyada), 51 rotanın tamamı 200 (23 sn), dört makale × üç genişlik ×
  üç temada tarayıcı panosundan DOM ölçümü (badFills ve outOfBox boş, yatay taşma yok, sızıntı
  yok), 11 yeni diyagramın tamamı light/dark ekran görüntüsüyle gözle doğrulandı; denetleyicinin görmediği üç kusur (49-Şekil 1'de ok etiketlerinin sunucu kutusuna binmesi, 50-Şekil 2'de uzun etiketin çubuğa binmesi, 50-Şekil 3'te alt payın darlığı) yalnızca ekran görüntüsünde görülüp düzeltildi ve yeniden görüntülendi. Paralel oturum
  görünmedi; yine de build ve dev sunucusu izole kopyada (`D:\dev\anil-lib-b11-render`, 3210)
  çalıştırıldı, `.claude/launch.json` geçici yapılandırması run sonunda geri alındı, kopya ve
  junction silindi.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
