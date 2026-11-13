# Bakım run'ı 8 — kontrol dosyası

> **Compact ya da yeni oturum sonrası ilk okunacak dosya budur.** Sıra: (1) bu dosya, (2) `docs/seri/HANDOFF.md`
> ("Açık borçlar", "Bakım run'ı nasıl çalışır" ve run 5–7'nin dersleri), (3) `docs/seri/SOZLESME.md` §4, §5, §12.
> Sonra aşağıdaki "Sıradaki somut adım"dan devam edilir; "tamam" işaretli satır yeniden yapılmaz. Run 6 ve 7'nin
> kontrol dosyaları (`BAKIM-RUN6.md`, `BAKIM-RUN7.md`) geçmiş kanıttır, değiştirilmez.

Başlangıç: 2026-11-13 12:41 (TST) · Bitiş: 2026-11-13 14:40 · Durum: **TAMAMLANDI** · Kararlar **#308–#314**, sonraki **#315**

## Kapsam (TRIGGER, 2026-11-13)

- Kullanıcı yalnız `docs/seri/TRIGGER.md`'yi çalıştırdı; ek talimat yok. TRIGGER bakım kipinde: yeni makale, başlık ya da
  faz yok. İş kaynakları: (1) HANDOFF "Açık borçlar"ın yeniden denenmesi, (2) SOZLESME §4'ün durum kontrolü — "hakemsiz"
  etiketli ve 12 aydan eski kaynaklar (2025-11-13'ten önce), Crossref `updated-by` ve bağlantı hedefleri, (3) bulunursa
  §5/§12 düzeltmesi ve revizyon işareti, (4) doğrulama kapıları.
- **Açılmayan:** olgu denetiminin ikinci turunun 1–40 ve 81–118'e açılması kullanıcı kararıdır (HANDOFF); bu run açmaz.
- Ultracode yok: workflow ve yardımcı ajan kullanılmaz; taramalar, kararlar ve düzenlemeler ana oturumda.
- Commit/push kullanıcı kararıdır; run sonunda sorulur. Bot ve doğrulama sayfaları atlatılmaz, anahtar ve e-posta
  kullanılmaz.
- Run 7'den bu yana: run 7 `c70a1c1`'de commit edildi; public lansman (`800e148`) ve UX premium turu (`bd67227..b1a6f7e`)
  main'de. Çalışma ağacında yalnız `.wolf/memory.md` (oturum kancası) vardı. Seri içeriğine run 7'den sonra dokunulmamış.

## Yöntem

Betikler oturum scratchpad'inde
(`C:\Users\ANIL~1.AKM\AppData\Local\Temp\claude\f5662fe50e5ac8e1\d48c0b82-efe2-4d08-8e8e-a7bedea0eff5\scratchpad\`);
run 7'nin betikleri `r7/` altına kopyalandı, okundu (e-posta ya da anahtar yok), yolları güncellendi.

1. `bib.py` → `bib.json` (1.508 künye, 118 makale); `scope5.py` → `hakemsiz_works.json` (205 çalışma; 170'i 12 aydan
   eski). Run 7'ye göre tek fark 55'teki SWE-Bench+ (AIware 2026 — hakemli; "arXiv:" ibaresi yüzünden listede).
2. Kabul listeleri: TMLR (`jmlr.org/tmlr/papers/`), ACL Anthology toplu bib, PMLR v300–350, NeurIPS 2026 (Downloads
   listesi erişilebilirse), Crossref bibliyografik arama, OpenAlex (bütçe elverdikçe; 429'da durulur).
3. Crossref `updated-by`: DOI'li **bütün** künyeler (`crossref_rel/dois.py` + `sweep.py`).
4. Bağlantı hedefleri: bütün bağlantıların durumu; 4xx/5xx olanlarda bot duvarı ↔ ölü bağlantı ayrımı.
5. Bulgu → birincil kaynak → düzenleme → hemen `sync-series-hashes --write` → kapılar.

## İş paketleri

| Paket | Kapsam | Durum | Kanıt / not |
|---|---|---|---|
| P0 | Durum yükleme, kapsam, bu dosya | tamam | TRIGGER, HANDOFF (tamamı), SOZLESME §4/§5/§12, BAKIM-RUN7, cerebrum (tercihler + Do-Not-Repeat) okundu; `git status` temiz (yalnız `.wolf/memory.md`); GitHub'da okur bildirimi yok (açık issue 0) |
| P1 | Borçlar (f), (i), (j) | tamam | 12:45: (f) `papers.nips.cc/paper_files/paper/2026` 404, kök dizin 2025'te bitiyor; poster sayfası ve Downloads/2026 bu kez 500 (sunucu hatası; kabul önceki run'larda doğrulandı). (i) TMLR listesi 5.090 kayıt (run 7: 5.053), Min-p eleştirisi yok; OpenReview API 403, forum "Verifying your browser". (j) Crossref NeuronInfer: cilt/sayı yok, s. 1–14, kayıt 2026-11-02, dizin 2026-11-10 — üçü değişmedi, künyelere dokunulmadı |
| P2 | §4 durum taraması: kabul listeleri, Crossref `updated-by`, bağlantılar | tamam | **Sonuç: yeni hakemli kalem yok, yeni düzeltme ilişkisi yok, ölü bağlantı yok; Crossref cilt/sayı karşılaştırması bir künye hatası buldu (P3).** **OpenAlex:** 200 başlıklı çalışmanın 99'u (12 aydan eskiler önce), sonra anonim bütçe bitti (üç 429); üç ipucu künyede zaten doğru. **Crossref bibliyografik (`crb8.py`, 14:27–14:31):** kalan 101 çalışma, 101/101 yanıt; yedi eşleşmenin yedisi künyede zaten doğru (Kalai Nature 653; Emu3 Nature 650; Gated SAE NeurIPS 2024; PromptRobust LAMPS '24; SWE-Bench+ AIware 2026; NeuronInfer; Thinking Machines blogunun kendi DOI'si — künye "hakemli değildir"). **Crossref `updated-by` (14:06–14:27):** 336/336 kayıtlı; sekiz ilişki önceki run'larda işlenmiş (Costello endişe notunun başlığı "RESCINDED", 68 zaten "geri alındı" diyor); run 5 taramasıyla alan alan fark yalnız `is-part-of` ve şekil DOI'si eklentisi; başlık/yazar/yıl farkları bilinen biçim kararları; **cilt/sayı/sayfa ↔ künye: 29 satırın 28'i izinli kısa biçim, biri 49 Hou ve ark.** · **Kabul listeleri (205 çalışma, 170'i 12 aydan eski):** TMLR 5.090 kayıt → yeni kalem yok (tek gerçek eşleşme zaten künyede olan FMTI 2025); ACL Anthology toplu bib (2026-11-11 üretimi, 139.388 kayıt) → yok; PMLR v300–350 (9.507 bildiri; run 5'ten sonra eklenen ciltler dâhil) → yok (Morris zaten ICML 2026); NeurIPS 2026 JSON dökümü (9.276 kayıt; Persona Vectors yeniden dökümde, `Accept (poster)`) → yeni kalem yok; Min-p eleştirisi dökümde karar alanı, kaynak ve bildiri bağlantısı olmayan bir poster (Sydney oturumu) — run 3'ün "MLRC listelemesi yayın değil" kararı geçerli; Semantic Scholar batch (143 arXiv kimliği) → yalnız zaten hakemli ya da yeniden yayım (64: 10.70777 "Robotics" dergisi; 68: SSRN) ipuçları. **Bağlantılar (`lc8.py`, 1.307 benzersiz bağlantı):** 313 `doi.org` bağlantısı Crossref taramasına bırakıldı; 202 arXiv kimliğinin 202'si export API'de var, başlıklar künyeyle tutuyor (tek "fark" 77'deki `AtP\*` kaçışının ayrıştırıcı kalıntısı); öteki 792 bağlantıdan 38'i 2xx/3xx dışı ya da şüpheli → hepsi tek tek okundu, **ölü bağlantı yok**: ACM 11, OUP, PNAS, Taylor & Francis, AIP, MIT Press 2, Stack Exchange, EUR-Lex 2 (202), DBLP (bot sayfası) bilinen yayıncı/bot duvarı; openai.com 4 (403; Wayback'te Ekim–Kasım 2026'da 200 kopyalar), leginfo SB 53 (403; Ekim 2026'da 200); Anthropic 4 zaman aşımı yeniden denemede 200 (`docs.anthropic.com` → `platform.claude.com` yönlendirmesi çalışıyor); UMBC Turing PDF'i yalnız Python'un sertifika deposunda hata veriyor (curl 200); American Scientist 503 = otomatik JS denetimi, yerleşik tarayıcıda makale açıldı; Gallica Cloudflare "insan mısın" kutusu (doldurulmadı; Wayback'te Şubat–Nisan 2026'da 200); neurips.cc bugün site çapında 500 (tarayıcıda da; Checklist sayfasının 2026-11-01 kopyası 200); dört "yumuşak 404" yanlış alarm (başlıkta "Error" geçen iki ACL ve bir NeurIPS D&B sayfası, Nature çerez yönlendirmesi). arXiv `journal_ref`/`comment`: yeni mecra bilgisi yok. **OpenAlex** (yoklama 200) sürüyor; şimdiye dek üç ipucu, üçü de künyede zaten doğru (98 Lipton–Steinhardt ACM Queue "hakemli değil", 81 ACCV 2024 LNCS, 5 NeurIPS 2020). Crossref `updated-by` (336 DOI) arka planda (14:06'da başladı, DOI başına ~4 sn; ilk notumdaki "~15 sn" süreyi yanlış tahmin etmemdendi — başlangıç süreç kaydından okundu) |
| P3 | Düzeltmeler (§5, §12) | tamam | **49 (`agents-and-retrieval/mcp-ve-arac-ekosistemleri.md:111`):** Hou ve ark. "ACM Transactions on Software Engineering and Methodology, makale 3796519" → "… 35(10), s. 1–37" (3796519 DOI soneki; Crossref 2026-09-16'dan beri cilt 35, sayı 10, s. 1–37; yazar ve başlık aynı; ACM DL betiğe 403, tarayıcıda Cloudflare kutusu — doldurulmadı). Aynı kaynakçadaki Qin ve ark. biçimi (57(4), s. 1–40). Gövde ("… 2026'da yayımlanan çalışması") doğru. Tek künye düzeltmesi → revizyon işareti yok; `sync-series-hashes --write` hemen (frontmatter + katalog) |
| P4 | Kapılar: hash, içerik, SVG; typecheck, test, build; gerekiyorsa render | tamam | Düzeltmeden önce ve sonra: hash, `check-series-content --warnings` (118), `check-series-svg` (346) temiz; özet ↔ katalog 0 fark. Ana ağaçta (bu projenin sunucusu/paralel oturumu yok): typecheck 0, 963/963 test (55 dosya), build 0 (197 sayfa, `/seri/[slug]` 118) — iki kez. Duman testi (`next dev` :3000, `measure8.mjs`): 1, 43, 62, 68, 110, 118 × 3 genişlik × 3 tema = 54 satır, hepsi 200; 3 uyarı 62'nin 375 px tablosu (23 hücre `.table-scroll` içinde, sayfa `scrollWidth` 375); revizyon satırları 43/62/68'de doğru; 118'in kapanış cümlesi var. Gizli panoda tablo "bölge" işaretsiz göründü → başsız Playwright (`regions8.mjs`): işaretli, kusur yok. Düzeltme sonrası 49: 9 satır temiz, yeni künye ve DOI bağlantısı sayfada. Sunucu durduruldu |
| P5 | HANDOFF, YOL-HARITASI (#308…), `.wolf/*`, son rapor | tamam | YOL-HARITASI #308–#314 (sonraki #315). HANDOFF: başlık, "Bakım run'ı 8" bölümü, Açık borçlar ((f), (i), (j) tarihleri, döküm notu, OpenAlex yöntemi, aria-label sayıları), run 8 dersleri (a)–(g), betik listesi, iki eski "#295" satırı ve commit durumu satırı, geçmiş kaydı. `.wolf`: cerebrum (Key Learnings 5, Do-Not-Repeat 3, Decision Log 1), buglog (bug-1040–1044; kancanın kendi eklediği bug-1036–1039 olduğu gibi bırakıldı), memory. Anatomy kanca tarafından güncelleniyor (bu dosya listede) |

## Açık engeller

- OpenReview: API 403, forum doğrulama sayfası — (i)'nin karar durumu okunamıyor (atlatılmadı).
- neurips.cc: 2026-11-13'te site çapında 500 (poster, Downloads, Conferences, rehberler; tarayıcıda da); statik JSON dökümü çalıştı.
- ACM DL ve Gallica: Cloudflare "insan mısın" kutusu (doldurulmadı); Crossref ve Wayback CDX kullanıldı.
- Claude in Chrome bu oturumda bağlı değildi; üç dış sayfa yerleşik tarayıcıda okundu.

## Sıradaki somut adım

- Run 8 bitti; yeniden yapılacak adım yok. Değişiklikler kullanıcının isteğiyle `seri/bakim-run-8` dalında commit edildi (`27c435c`, `5e42310`), sonra main bu dala ileri sarılıp `origin/main`'e push edildi (Vercel üretim dağıtımı). Kullanıcı kararı: olgu denetiminin ikinci turunun 1–40 ve 81–118'e açılması. Dış borçlar ((f), (i), (j)) takvime bağlı; NeurIPS 2026 bildiri kitabı Aralık'ta bekleniyor. Sonraki run `analyze.py`'ye cilt/sayı/sayfa karşılaştırmasını eklemeli.

## Günlük

- 12:41 Run 8 başladı; durum yüklendi (P0).
- 12:45 P1: (f), (i), (j) değişmedi.
- 12:50 `bib.json` ve `hakemsiz_works.json` yeniden üretildi; bu dosya açıldı. TMLR, ACL Anthology, PMLR v300–350 eşleştirmeleri: yeni kalem yok.
- (oturum ~12:55–14:05 arası kullanıcının "devam et"ini bekledi)
- 14:06 Crossref `updated-by` taraması (336 DOI) arka planda başladı; bağlantı taraması (`lc8.py`) ve OpenAlex (`oa8.py`) paralel.
- 14:10 NeurIPS 2026 dökümü (9.276) ve Semantic Scholar (143): yeni kalem yok; neurips.cc sayfaları 500.
- 14:12 Bağlantı taraması bitti (1.307; 38 şüpheli satır elle okundu, ölü bağlantı yok); typecheck 0, 963/963 test.
- 14:17 Build 0 (197 sayfa). 14:18 OpenAlex 99/200 sonra bütçe bitti; duman testi 54 satır temiz; 62'nin tablosu başsız Playwright'ta işaretli.
- 14:27 Crossref `updated-by` bitti: yeni ilişki yok. Crossref bibliyografik arama (101) başladı.
- 14:31 Bibliyografik arama bitti: yeni hakemli kalem yok. Cilt/sayı/sayfa karşılaştırması: 49 Hou ve ark. künyesi.
- 14:33 49 düzeltildi, hash senkronlandı, üç kapı temiz; 49 dokuz satırda render temiz; typecheck/test/build yeniden koşuldu (aynı sonuç).
- 14:40 P5: YOL-HARITASI #308–#314, HANDOFF, cerebrum, buglog, memory. Run 8 kapandı; commit, push, deploy yapılmadı.
- Kullanıcı commit istedi: main'de doğrudan commit yerine `seri/bakim-run-8` dalı açıldı (repo düzeni: dal → main'e ileri sarma); iki commit — içerik + belgeler (run 7'nin `c70a1c1` düzeni), OpenWolf kayıtları. Push yapılmadı.
- Kullanıcı "Merge and push" dedi: `origin/main` hâlâ `b1a6f7e`'ydi (fetch ile doğrulandı); kayıtlar güncellendi, main dala ileri sarıldı ve `origin/main`'e push edildi; birleşen dal silindi.
