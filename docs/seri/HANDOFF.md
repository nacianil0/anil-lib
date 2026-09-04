# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri/SOZLESME.md`'de (batch semantiği: §7), plan/prerequisite/tekrar/vaat defterleri
> `docs/seri/YOL-HARITASI.md`'de, UI listesi `content/series/roadmap.json`'dadır. Yeni oturum
> SIRASIYLA okur: (1) SOZLESME, (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili
> bölümleri. Üretim trigger'ı: `docs/seri/TRIGGER.md`.

Son güncelleme: 2026-09-05 · Durum: **1–54 yayında (kohort Batch 0 → Batch 12) · Faz 6 açıldı (51–54) · Sıradaki: 55**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | 54 — `bilgisayar-kullanan-ajanlar` |
| Sıradaki güvenli başlangıç | Makale 55 ("Kod Yazan Ajanlar: Yazılım Mühendisliğinde LLM"), Faz 6'nın beşinci makalesi; run kapsamı SOZLESME §7'ye göre çözülür |
| Sıradaki kohort | `classification_batch: 13` |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod dokunuş noktaları | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref`; dashboard seri kartı; `validArticleIds` kataloglardan **kendiliğinden** türer, elle güncelleme gerekmez |
| Araçlar | `tools/series/check-series-content.cjs`, `check-series-svg.cjs`, `sync-series-hashes.cjs`, `entegre-batch.cjs` |
| Level bandı | 1–10 `beginner` (değişmez); 11'den itibaren `intermediate` (bağlayıcı karar #19) |
| Kategori bandı | 1–5 `foundations`; 6–20 `models-and-training`; 21–28, 30, 31–40 `reasoning-and-memory`; 29 ve 41–54 `agents-and-retrieval` (bağlayıcı kararlar #50, #65, #85, #98, #107, #122 ve #128). Faz 6'nın kalanı (55–60) için varsayılan devamlılık `agents-and-retrieval`; kontrollü sözlükte "agents" yalnızca bu kategoride geçer |

## Açık borçlar

- **Faz başlıklarının dili — açık, karar verilmedi.** `roadmap.json`'daki faz başlıkları İngilizce
  alan terimleri taşıyor ("Modelle Konuşmak: Inference, Prompt ve Bağlam", "Akıl Yürütme: Reasoning
  ve Test-Time Compute", "Bilgiyle Bağlamak: Retrieval ve Araçlar"). Makale başlıkları terim
  defterine göre Türkçeleştiriliyor (kararlar #51, #52, #66, #86, #99, #108, #115, #121). Katmanın
  tümden Türkçeleştirilip Türkçeleştirilmeyeceği kullanıcı kararıdır.
- **Yayımlanmamış başlıklardaki İngilizce sözcükler (Faz 6).** 55 "Kod Yazan Ajanlar: Yazılım
  Mühendisliğinde LLM" ("LLM" kısaltma, çevrilmez; 51'in başlığında da korundu, karar #128). 58 "Ajan
  Güvenliği: Prompt Injection ve Sandbox" — "istem enjeksiyonu" 24'te kurulmuş terim; "sandbox" için
  52'de **"kum havuzu"** kullanıldı (eylem ağacı aramasının geri alınabilirlik koşulu bağlamında,
  gloss'suz) ve 49'da "yalıtım" geçti — 58'in run'ında başlık "İstem Enjeksiyonu ve Kum Havuzu" ya da
  "… ve Yalıtım" olarak kararlaştırılıp **roadmap.json entegrasyondan önce** güncellenmelidir (karar
  #108'in ölçütü). 59 "İnsan-Ajan İşbirliği: Denetim ve Devir" Türkçe.
- **"Ajan" borcu kapandı.** 48'de gloss'lanan terim 51'de tanımlandı (Wooldridge–Jennings, Russell–
  Norvig; karar #129); "grounding" için iki karşılık bilinçli olarak ayrı: 45 kaynak sadakati, 54 öğe
  konumlandırma. 55 "kod olarak eylem", "yorumlayıcı", "depo" (48) ve "kum havuzu" (52) terimlerini
  devralır.
- **Yayımlanmış numaralı vaatler:** bağlayıcı koordinat defteri YOL-HARITASI §"Yayımlanmış
  vaatler"dedir. Batch 12 **hiç koordinat açmadı ve kapatmadı**; dört makalenin metin içi numaralı
  göndermelerinin tamamı yayımlanmış makalelere (≤54) yapıldı ve Python ile makale başına doğrulandı.
  Sıradaki run'ın doğrudan ödeyeceği bir vaat **yoktur**; defterde açık kalan en yakın tekil koordinat
  **64**'tür (13'ten gelen "ilkelere dayalı tercih etiketleri"), ondan sonra 61–70 bandı ve 72.
  Numarasız işaretler: 54 → 55 (kod ajanının döngüsü: depo, hata yeniden üretimi, test doğrulayıcı,
  insan kodundan fark), 51 → 56 (kalıcı belleğin ajan kurulumu), 51 → 60 (maliyet ölçüsü; puan çağrı
  sayısıyla okunur), 53 → 64 (denetim için tartışma), 54 → 81 (görüntü modelinin mekanizması),
  48 → 55 (dört düğme, depo düzeyi getirme), 49 → 58, 50 → 65.
- **Ertelenen inceleme bulguları:** Batch 1 son doğrulamasından kalan ~29 MINOR (terim hijyeni,
  alt metin/şekil uyumu, ifade inceliği) yayın doğruluğunu engellemediği için hâlâ uygulanmadı.
  Tam listeler repo dışındaki tarihsel arşivdedir; hiçbir kapı bu arşive bağımlı değildir.
- **Doğrulanamayan / kısmen doğrulanan künyeler:** (1)–(7) önceki batch'lerden (kararlar #21, #97,
  #104, #106, #114, #120, #127). (8) **Batch 12:** Russell & Norvig (AIMA 4. baskı) için
  `aima.cs.berkeley.edu` bu ağdan açılmadı (curl 000), bağlantı Pearson katalog sayfasına verildi;
  AutoGen için DBLP yalnızca CoRR gösteriyor, COLM 2024 kabul listesi `colmweb.org` üzerinden `curl -k`
  ile doğrulandı; Song ve ark. (ETO) DBLP'de yalnızca CoRR, ACL Anthology sayfası (2024.acl-long.409)
  doğrulandı; Cemri ve ark. (MAST) NeurIPS 2025 D&B sayfası DBLP `ee` ile alındı; OpenReview API bot
  doğrulaması istediği için OpenReview kimlikleri DBLP `ee` alanından ve PDF üst bilgilerinden alındı
  (karar #134). ACM `doi.org` bağlantıları bot'a 403 döner; okuyucuda açılır.
- **Hakemsiz kaynak listesi Batch 12'de bir kalem büyüdü — işaretlenerek.** Anthropic bilgisayar
  kullanımı belgelendirmesi (54; çözünürlük ve koordinat ölçekleme önerileri). Karar #134'te kayıtlı;
  karar #6'daki liste bu kalemle güncellenmelidir (o liste bu run'da değiştirilmedi).

## Next batch preparation — 55'ten devam (Faz 6'nın ikinci yarısı)

**Pedagojik hedefler.** Batch 12'nin sonunda okuyucu şunu biliyor: ajan bir model değil bir ilişkidir;
özerklik, döngüyü kapatan şeyin modelin ürettiği metin olmasıdır ve durmak bir eylemdir; model
dünyayı değil pencereyi görür, çevre zar atar, eylem kümesini çevre tanımlar; ajanlar hızlı başarır,
yavaş başarısız olur ve tur sınırında tekrar eder (51). Karar kutusunun dört biçimi vardır — her adımda
karar, önce plan, gerektiğinde ayrıştırma, bölüm sonu dersi, eylem ağacı — ve hata döngüsü içeriden
kırılmaz: sayaç, dış gözlem, ders, ilerleme ölçüsü dışarıdadır; ders hakem kadar iyidir; ağaç geri
alınabilir dünyada çalışır; döngü ağırlıklara yazılabilir (52). Çoklu ajanın üç gerekçesi ölçülür;
tartışma oylamanın yaptığını yapmaz ve güvenilir biçimde onu geçmez; başarısızlıkların beşte dördü
sistemden gelir; fatura tur çarpı pencereyle büyür (53). Ekranın üç gösterimi bir bütçe ve eksiklik
kararıdır; darboğaz plan değil öğe konumlandırmadır; insanla ajan arasındaki uçurum beş ortamda
ölçülüdür ve gösterim platforma bağlıdır (54). 54'ün kapanışı 55'e devretti: kod yazan ajanın dünyası
bir ekran değil bir depo, gözlemi bir test çıktısı, eylemi bir düzenleme; depo nasıl gezilir, hata nasıl
yeniden üretilir, test ne zaman doğrulayıcıdır, ajanın kodu insanınkinden ölçülebilir biçimde farklı mı?

**Sıradaki makaleler ve prerequisite'ler.** 55 ← 48 (kod onarım ajanının dört düğmesi ve 4 dolarlık
bütçesi; depo düzeyi getirme ve yinelemeli tamamlama; yorumlayıcı = yarım doğrulayıcı, birim test tam;
kod olarak eylem), 51 (durma kararı; "hızlı başarır, yavaş başarısız olur"; 90,5 → 57,2 düzenleme
spirali), 52 (hata döngüsü ve dört çıkış; test = dış gözlem; başarısız izlerle öğrenme), 54 (depo bir
dünyadır; gözlem ekran değil test çıktısı), 35 (sağlam doğrulayıcı), 36 (ağaç: aday yamalar), 40
(görev ufku; Kwa ve ark.'nın görevleri yazılım görevleriydi), 33 (kapsama ↔ pass^k), 30 (yapılandırılmış
çıktı: yama biçimi), 12 (izlerle ince ayar), 16 (cetvel: çözülen görev yüzdesi neyi ölçer, kirlilik).
56'ya geçilirse: 56 ← 51 (çalışma belleği ve üç kalıcı bellek), 52 (ders, beceri kütüphanesi), 39
(bellek: yazma/okuma/yansıma; geri çağırma puanı — tahsil edilmemiş borç), 43 (vektör dizini deposu),
44 (küçükle ara büyüğü döndür), 50 (tazelik). 57 ← 51 (bölümün beş bitiş sınıfı; AgentBench), 52
(ilerleme oranı), 47 (pass^k), 45 (hakem model), 16 (cetvel), 40 (ufuk). 58 ← 24 (talimat
hiyerarşisi, istem enjeksiyonu), 41/49 (getirilen belge ve araç açıklaması saldırı yüzeyi), 52 (kum
havuzu), 54 (tarayıcı gürültüsü). Kaç makale üretileceği bu run'ın `BATCH` assignment'ıyla belirlenir.

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- Kod olarak eylem, yorumlayıcı, depo dizini ve dört düğme (48) → 55'te döngünün kod hâli.
- Durma kararı ve bütçe (51), hata döngüsü ve test = dış gözlem (52) → 55'te "hızlı başarır, yavaş
  başarısız olur"un onarım hâli; 57'de bitiş sınıfları.
- Ağaç araması ve geri alınabilirlik (52) → 55 (aday yamalar, `git` ile geri alma = kum havuzu).
- Çoklu ajan yazılım şirketi düzenleri ve başarısızlık sınıfları (53) → 55 (tek ajan ↔ çoklu ajan kod
  üretimi karşılaştırması), 57.
- Çalışma belleği ve üç kalıcı bellek (51), ders ve beceri kütüphanesi (52) → 56.
- Kalibrasyon (16, 50) → 59 (insana ne zaman devredileceği), 65.
- Talimat hiyerarşisi (24), araç zehirleme (49), çevre gürültüsü (54) → 58.
- Kapoor ve ark. "puan çağrı sayısıyla okunur" (51) → 57, 60.

**Araştırılacak güncel akademik alanlar (55 için öncelikli):** kod onarım ölçütleri (SWE-bench —
Jimenez ve ark., ICLR 2024, 48'de yalnızca anıldı; SWE-bench Verified hakemsiz belgelendirme; SWE-bench
Multimodal, ICLR 2025 — doğrulanmalı), ajan düzenleri (SWE-agent 48'den; OpenHands — ICLR 2025,
doğrulanmalı; AutoCodeRover — ISSTA 2024; Agentless — venue doğrulanmalı, ajansız üç aşamalı hat
"tarama–onarım–doğrulama" karşı tez olarak; RepairAgent — ICSE 2025, doğrulanmalı), eğitim (SWE-Gym —
ICML 2025?, SWE-smith — NeurIPS 2025?, ikisi de DBLP `ee` ile doğrulanmalı; 52'deki ETO'nun kod
karşılığı), değerlendirme tuzakları (test kümesi kirliliği ve "çözüm sızıntısı"; 16/72'ye köprü),
insanla karşılaştırma (Kwa ve ark. 40'tan; hakemsiz üretkenlik RCT'leri yalnızca işaretlenerek), ürün
belgelendirmesi (Claude Code / kod ajanı belgeleri, hakemsiz). Sayısal iddialar ve URL doğrulaması
yazımdan bağımsız bir gözle çapraz denetlenir; süreç kuralları SOZLESME §9'dadır.

**Venue doğrulaması.** Batch 10–11'in yedi kanalı sürüyor (Crossref API, ACL Anthology + `.bib`, DBLP
11 sn, PMLR GitHub aynası, COLM kabul listesi `curl -k`, ICLR 2026 proceedings). Batch 12 iki kanal
ekledi: (8) **DBLP `ee` alanı** — `dblp.org/search/publ/api?q=<başlık>&format=json` cevabındaki `ee`,
OpenReview kimliğini ve NeurIPS/PMLR/Anthology birincil sayfasını doğrudan verir; OpenReview kimliği
**tahmin edilmez** (Batch 12'de bir tahmin yanlış çıktı ve düzeltildi); DBLP 503 döndüğünde 30 sn
bekleyip yeniden dene (`artifacts/b12-research/dblp-b12-retry.py`). (9) **arXiv API başlık araması**
— `export.arxiv.org/api/query?search_query=ti:"<başlık>"`; indirme betiği (`fetch-b12.py`) her PDF'in ilk
sayfasını beklenen başlıkla eşleştirip uyuşmazsa bu aramaya düşer (Batch 11'in yanlış kimlik tuzağına
karşı). Semantic Scholar API çoğu sorguda boş döndü; OpenReview API bot doğrulaması istiyor. Batch 12'nin
62 kaynak metni `artifacts/b12-research/pdf/*.txt` altında duruyor; PDF'ler build şişmesin diye silindi.
**Karar #113** geçerli: DBLP yalnızca CoRR gösteriyorsa birincil bildiri sayfası aranır (AutoGen, ETO
örnekleri).

**Görselleştirme ihtiyaçları (öngörü):**
- 55: kod ajanının döngüsü — bul, yeniden üret, düzenle, sına, gönder; 48-Şekil 2'nin dört düğmesiyle
  51-Şekil 1'in birleşimi; durma kararı = gönder.
- 55: çözülen görev yüzdesi ↔ maliyet (dolar/görev) — 51'deki Kapoor ilkesinin ölçümü; ajanlı ↔ ajansız
  hatlar aynı grafikte.
- 56: çalışma belleği ↔ üç kalıcı bellek — 51'deki CoALA ayrımının ürün hâli (39-Şekil'in geri
  çağrımı).

**Teknik plan.** Yeni makaleler catalog.json'a `classificationBatch: 13` ve `readingOrder` 55'ten
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
güncellenmelidir. **Entegrasyondan sonra makale gövdesine her dokunuşta `sync-series-hashes.cjs
--write` yeniden çalıştırılmalıdır** (Batch 12'de 53'ün bir cümlesi entegrasyondan sonra değişti ve
hash yeniden senkronlandı). Araçların üçü de varsayılan olarak **yalnızca AI serisini** işler
(`--series=boun` ayrı seri içindir). `check-series-svg.cjs` XML ayrıştırmaz ve `var(` parantezinin
kapanmadığı dolguyu görmez: her yeni SVG ayrıca `python -c "import xml.etree.ElementTree as ET;
ET.parse(f)"` ile ayrıştırılır **ve** `grep -c 'var(--[a-z-]*"' content/series/assets/*/*.svg` ile
taranır (Batch 12'de 54-Şekil 1'de `fill="var(--text-faint"` böyle yakalandı). Denetleyicinin taşma
tahmini (karakter × 7,15) 13 birimde x=20'den ~97 karakter alır; Batch 12'nin on iki şeklinden üçünün
alt notu ilk çizimde taştı ve kısaltıldı. Denetleyici "Şekil N metinde referanslanmamış" ve "şekil
numarası N, beklenen M" uyarılarını verir: gövdede "Şekil 2'de" yazıp görsel satırını eklememek ikinci
uyarıyı üretir (52'de yaşandı).

**Dev server ve build yalıtımı — paralel oturum kontrolü run başında değil, her adımda.** Batch
12'de run başında 3000–3999 arası dinleyen port yoktu; yine de Batch 7/9/10/11'in izole kopya yolu
kullanıldı ve ana worktree'nin `.next` dizinine hiç dokunulmadı: `tar -c --exclude=./node_modules
--exclude=./.next --exclude=./.git --exclude=./artifacts --exclude=./.env.local --exclude=./test-results
--exclude=./playwright-report . | tar -x -C /d/dev/anil-lib-b12-render` (7,8 MB), junction `cmd //c
"mklink /J D:\dev\anil-lib-b12-render\node_modules D:\dev\anil-lib\node_modules"` (Git Bash'ten),
kopyada `corepack pnpm build` (103 sayfa, exit 0), `.claude/launch.json`'a geçici yapılandırma
(`anil-lib-seri-b12`: Git Bash **tam yolu** `C:\Users\<user>\AppData\Local\Programs\Git\bin\bash.exe`,
`-lc`, `export PATH="/usr/bin:$PATH"; cd /d/dev/anil-lib-b12-render && exec corepack pnpm dev -p 3210`;
Write aracıyla yazıldı, bug-315), kopyada `.env.local` olmadığı için kapı kendiliğinden kapalı.
`typecheck` ve `test` ana worktree'de çalıştırıldı (`.next`'e dokunmazlar). Temizlik: **önce**
`preview_stop`, sonra junction'ı `cmd //c rmdir` ile kaldır, sonra kopyayı sil; launch.json özgün
hâline döndürüldü (`artifacts/b12-research/launch.json.orig` yedeği). Kural değişmedi: **ana
worktree'de `.next` silme, `pnpm build` ya da `next dev` başlatmadan önce `netstat` ve `tasklist` ile
o an paralel süreç var mı bak; varsa karşı oturuma haber ver ve izole kopyayı kullan.** İki tuzak:
Bash aracında bir komuttaki `cd` **sonraki çağrılara taşınır** (Batch 12'de göreli yollar kırıldı;
her komutu `cd /d/dev/anil-lib;` ile başlat ya da mutlak yol kullan) ve Python Windows'ta
`/d/dev/...` yolunu tanımaz (kopyaya dosya `cp` ile taşınır).

**`artifacts/` şişerse `pnpm build` kırılıyor — Batch 9'un bulgusu sürüyor.** Batch 12 sonunda
`artifacts/b12-research/pdf/*.pdf` silindi, `.txt` metinleri ve `dblp-b12.*`/`fetch-b12-report.json`
kaldı.

**Render doğrulama seti (Batch 12'de kullanılan).** Rota sweep'i Python `urllib` ile (55 rota, 22 sn),
tarayıcı gezintisinden **önce**. Tarayıcı panosundan **elle**: `resize_window` ile 1440/768/375, tema
`documentElement.classList` üzerinde `dark`/`sepia` değiştirilerek, ölçüm fonksiyonu `localStorage`'a
yazılıp `eval(localStorage.getItem('b12m'))()` ile çağrıldı; geçerli dolgu kümesi token'ları bir
prob `span`'a `color: var(--x)` verip çözerek kuruldu (`badFills` = bu kümede olmayan `svg text`
dolgusu), `getBBox` ile viewBox içi kalma, `scrollWidth > clientWidth`, figure/svg/figcaption sayıları,
`main.innerText` içinde `undefined`/`NaN`, h2/tablo/kutu sayıları. Dört makale × üç genişlik × üç
tema: taşma yok, badFills ve outOfBox boş, sızıntı yok; `figScroll` bu run'da 375'te de false (şekil
kabı ölçekleniyor). Şekil ekran görüntüleri için çalışan düzen: `resize_window` **800×640**, şekli
`position:fixed` bir kaplayıcıya **iki kez** klonlayıp ikinci kopyaya koyu tema token'larını inline
`style.setProperty('--text', …)` ile vermek (`b12fig(i, mode)` yardımcısı `localStorage`'da; `mode`
`'both'|'light'|'dark'`, uzun şekillerde tek tema) ve görüntüyü **`browser_batch` dışında** tek çağrıyla
almak; `screenshot` zaman aşımına düşerse `zoom` eylemi (bölge kırpmayı desteklemiyor) tam ekran
görüntüsünü döndürüyor. 12 şeklin tamamı light/dark görüldü; denetleyicinin görmediği bir kusur
(51-Şekil 1'de "cevap" etiketinin çevre kutusuna binmesi) yalnızca görüntüde çıktı ve düzeltildi.

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı. `artifacts/**` altındaki render
  betikleri de lint kapsamındadır; bilinen durum.
- Local'de `DATABASE_URL` olmadığı için `/api/reader-sync` 503 döner ve uygulama çevrimdışı
  moduna düşer — beklenen davranış; temiz bir sekmede konsolda görülen tek hata sınıfı budur.
- Mobil genişlikte diyagramlar kendi kaplarında ölçekleniyor; sayfa gövdesi taşmıyor. Batch 12
  ölçümünde `figScroll` 375'te false; önceki batch'lerde true ölçülmüştü (ölçüm, figure yerine kabın
  iç öğesine bakıyor olabilir) — regresyon değil.
- `check-series-svg.cjs` yalnızca `y > viewBox yüksekliği` durumunu yakalar; alt kenara çok yakın
  bir metin tabanı denetimden geçer. Batch 7–12'nin yeni şekillerinde alt pay ≥ 16 birim;
  yayımlanmış eski şekillerin bir kısmında bu pay hâlâ küçüktür. Kutu içine binen etiketleri ve
  kapanmamış `var(` parantezini de görmez (yukarıdaki iki ek tarama bunun için).
- Okuma listesinde `reasoning-and-memory` ve `agents-and-retrieval` birden çok öbek hâlinde
  görünür (27–28, 29, 30–40, 41–54). Kasıtlıdır (kararlar #65, #107); `reading-list-groups.test.ts`
  tam olarak bu durumu sınar.
- Repoda ikinci bir seri (`content/series-boun/**`) bulunuyor ve ayrı bir üretim hattıyla
  ilerliyor; AI serisinin araçları bu dizine dokunmaz. Build iki seriyi birden derler; sayfa sayısı
  ikisinin toplamıdır (Batch 12 sonunda 103).
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
  kullanılmadan yapıldı. 47'nin başlığı Türkçeleştirildi (karar #121). 50 kaynak kaleminin 44'ü
  hakemli; altı resmî belgelendirme/ön çalışma işaretlenerek kullanıldı (karar #127). Kapılar:
  `pnpm typecheck`, 446 test, `pnpm build` (99 sayfa, izole kopyada), 51 rotanın tamamı 200, dört
  makale × üç genişlik × üç temada DOM ölçümü, 11 yeni diyagram light/dark ekran görüntüsüyle
  doğrulandı (üç şekil düzeltildi).
- **Batch 12 (2026-09-04/05):** Makale 51–54, Faz 6'nın açılışı: ajan tanımı ve kontrol döngüsü →
  tek ajan mimarileri ve hata döngüleri → çoklu ajan sistemleri → bilgisayar kullanan ajanlar.
  `BATCH=4+1`. Araştırma (63 aday PDF tek betikle, başlık eşleştirmeli; DBLP `ee` ile iki koşu),
  yazım, entegrasyon ve doğrulama ana oturumda, ultracode açık olmasına rağmen workflow/subagent
  kullanılmadan yapıldı (kullanıcının Batch 10 talimatı). Başlıklar değişmedi; Faz 6 kategorisi
  `agents-and-retrieval` (karar #128). 47 kaynak kaleminin 46'sı hakemli ya da klasik temel eser;
  bir resmî belgelendirme işaretlenerek kullanıldı (karar #134). Kapılar: `pnpm typecheck`, 458 test,
  `pnpm build` (103 sayfa, exit 0, izole kopyada), 55 rotanın tamamı 200 (22 sn), dört makale × üç
  genişlik × üç temada tarayıcı panosundan DOM ölçümü (badFills ve outOfBox boş, taşma yok, sızıntı
  yok), 12 yeni diyagramın tamamı tek ekran görüntüsünde light+dark olarak gözle doğrulandı;
  denetleyicinin görmediği iki kusur (51-Şekil 1'de etiket–kutu binmesi; 54-Şekil 1'de kapanmamış
  `var(` parantezi) yakalanıp düzeltildi. Paralel oturum görünmedi; build ve dev sunucusu izole
  kopyada (`D:\dev\anil-lib-b12-render`, 3210) çalıştırıldı, `.claude/launch.json` geçici
  yapılandırması run sonunda geri alındı, kopya ve junction silindi.
- Batch 0/1'in ham üretim kayıtları `D:\dev\anil-lib-seri-batch1-state\` altında **arşiv** olarak
  durur. Hiçbir aktif süreç bu dizine bağımlı değildir.
- 2026-08-28 öncesi SOZLESME/HANDOFF sürümlerindeki "1–100 kapsam", "değişmez 5'li batch",
  "her handoff'a miras maddesi" ve zorunlu paralel agent/model düzeni hükümleri **yürürlükten
  kalkmıştır** (SOZLESME v2.0 değişiklik notu).
