# Batch 1 (Makale 6–10) — Duraklatma Kaydı

> **Bu geçici bir kayıttır.** Batch 1 tamamlandığında `docs/seri/HANDOFF.md`'ye devredilir ve bu
> dosya silinir. Kurallar değişmedi: `docs/seri/SOZLESME.md` geçerlidir.

Son güncelleme: 2026-08-27 · Durum: **İçerik ve diyagramlar tamam, inceleme + düzeltme + son
doğrulama tamam. Entegrasyon ve sonrası YAPILMADI.**

---

## Tam olarak nerede durduk

| Aşama | Durum |
|---|---|
| Araştırma (6 paket) + çapraz denetim (URL/aritmetik/çelişki) | ✅ |
| Makale 6–10 metinleri | ✅ 10 makale, denetleyici temiz |
| Diyagramlar | ✅ 15 yeni SVG (toplam 29), denetleyici temiz |
| İnceleme turu (12 ajan) | ✅ 20 BLOCKER + ~40 MAJOR bulundu |
| Düzeltme turu (5 + 2 ajan) | ✅ BLOCKER'ların tamamı uygulandı |
| Son doğrulama turu (6 ajan) | ✅ tamamlandı — kalan: **1 BLOCKER, 6 MAJOR, ~29 MINOR** |
| **Entegrasyon (catalog + roadmap + hash)** | ⛔ **başlamadı** |
| Doğrulama kapıları (typecheck/test/build) | ⛔ başlamadı |
| Görsel doğrulama (dev server, 3 tema, mobil/desktop) | ⛔ başlamadı |
| YOL-HARITASI güncellemesi | ⛔ başlamadı |
| +1 hazırlık kaydı (HANDOFF, Batch 2 / 11–15) | ⛔ başlamadı |

Çalışan hiçbir workflow/ajan yok. Son workflow `w1z7kkejs` / run `wf_94bd267a-122` — 6/6 ajan
hatasız tamamlandı.

## Ağacın durumu

```
 M content/series/articles/models-and-training/dikkat-mekanizmasi-baglami-tartmayi-ogrenmek.md
 M content/series/articles/models-and-training/on-egitim-internet-olceginde-sonraki-token.md
 M content/series/articles/models-and-training/transformer-modern-dil-modellerinin-mimarisi.md
?? content/series/articles/models-and-training/olcek-yasalari-daha-buyuk-neden-daha-iyi.md
?? content/series/articles/models-and-training/metin-uretimi-ornekleme-sicaklik-ve-olasiliklar.md
?? content/series/assets/<5 yeni klasör>/   (15 SVG)
 M docs/seri/CHECKPOINT-BATCH1.md   ·   M .wolf/{anatomy,buglog,memory}.md
```

Makale 6–8 `7e8682c "dokuz sekiz"` commit'inde; 9–10 henüz commit'lenmedi. **Scratch sızıntısı
yok** (tarandı). Makale 6–10 hâlâ `catalog.json`'da DEĞİL — site yalnızca 1–5'i gösteriyor,
publish güvenli.

| # | Kelime | H2 | Şekil | Kendini yokla | Kaynak |
|---|---|---|---|---|---|
| 6 | 3.203 | 9 | 3 | 3 | 5 |
| 7 | 3.111 | 10 | 3 | 3 | 15 |
| 8 | 3.144 | 10 | 3 | 3 | 17 |
| 9 | 2.998 | 9 | 3 | 3 | 15 |
| 10 | 2.750 | 9 | 3 | 3 | 10 |

Hepsi SÖZLEŞME §2 sınırında (2.000–3.500). `content_hash` hâlâ **placeholder** — entegrasyonda
`node tools/series/sync-series-hashes.cjs --write` ile hesaplanacak.

## Son doğrulama turunun sonucu

Değişen pasajların **tamamı birincil kaynaktan bağımsız doğrulandı** ve düzeltmelerin hiçbiri yeni
olgusal hata sokmadı. Zincirin omurgası sağlam: mükerrer gloss yok (49 yeni gloss), 86 çapraz
atıfın tamamı doğru, ileri işaret numaraları YOL-HARITASI ile örtüşüyor, 6 köprünün altısı da
tutuyor, makaleler arası sayı çatışması yok, `korpus` sapması tekrarlamamış.

### Kalan 1 BLOCKER — tek kelimelik

**B1 · Makale 6, satır 137:** `geliştirme kümesinde` → **`doğrulama kümesinde`**.
Kanonik terim yayımlanmış 2. makalede sabitlenmiş ("…doğrulama kümesi diye anılır"). Aynı sapma
7. makalede düzeltildi ama 6'da kaldı. İki makale **aynı Vaswani tablosunu** anlatıyor
(6'daki 0,9 puan = 7'deki 25,8 − 24,9), dolayısıyla okuyucu aynı sayıları iki farklı küme adıyla
görüyor. SÖZLEŞME §2 terim birliği.

### Kalan MAJOR'lar (6) — ana agent kararı gerekenler işaretli

| # | Nerede | Sorun | Not |
|---|---|---|---|
| **Snell künyesi** | 9, satır 167 | ⚠️ **ÇELİŞKİ — ana agent kararı gerekli** | aşağıda |
| Yanlış denklik | 6, satır 55 | "Dönüşüm … 3\. makalenin katmanının yaptığının aynısıdır" — Q/K/V saf doğrusal izdüşüm, 3. makalenin katmanı ağırlıklı toplam + sapma + **aktivasyon**. 3. makalenin "aktivasyonsuz katman tek doğruya çöker" dersiyle çelişiyor. Tek yan cümleyle düzelir | — |
| `hizalama (alignment)` | 6 | 61. makalenin başlık kavramı (alignment = hizalama) ile çakışıyor; ileride terim çatışması riski | ileri planlama |
| `istem` (prompt) | 10 | Gloss'suz ve terim defterinde satırsız giriyor; 21–22. makale başlıkları "Prompt" diyor | — |
| Llama 3 arıza aritmetiği | 8 | 148 → "yüzde 30" hesabı tutmuyor | — |
| Terim defteri atamaları | — | Pedagoji planı §4.1 tablosu üç terimde gerçekle uyuşmuyor | YOL-HARITASI'na işlerken düzelt |

**⚠️ Snell çelişkisi — bir sonraki turda ana agent karar vermeli.**
Ana agent `arxiv.org/abs/2408.03314` sayfasını açtı; **arXiv başlığı** birebir:
*"Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling **Model Parameters**"*
ve başlığı buna çevirdi. Son doğrulama ajanı ise ICLR proceedings + `iclr.cc/virtual/2025/oral/31924`
sayfalarını açıp **ICLR sürümünün başlığının** *"…than Scaling **Parameters for Reasoning**"*
olduğunu raporluyor. Kaynakçadaki **yayın yeri ve URL ICLR** olduğu için künye kendi içinde tutarsız.
İki tutarlı seçenek: (a) ICLR başlığı + ICLR URL, (b) arXiv başlığı + arXiv URL. Karar verilmeden
önce **ICLR proceedings sayfası ana agent tarafından bir kez açılıp** hangi başlığı taşıdığı
görülmeli. "sözlü sunum" nitelemesi her hâlükârda doğru.

### MINOR'lar (~29) — kapsam kararı gerekli

Dosya bazında: makale 6 (3), 7 (6), 8 (5), 9 (2), 10 (2), regresyon (11). Hiçbiri yayını
engellemiyor; çoğu terim hijyeni, gloss eksiği, alt metin/şekil uyumu ve ifade inceliği.
Tam liste `review/son-dogrulama-*.md` ve `review/son-regresyon.md` içinde, her biri birebir alıntı
+ önerilen düzeltme ile.

## Devam etme sırası (regresyon raporu §8 ile uyumlu)

1. **B1'i uygula** (tek kelime) ve Snell künyesine karar ver.
2. Uygulanacak MAJOR/MINOR kapsamını belirle — kapsam kararı, hepsini uygulamak zorunlu değil.
3. Değişen makaleleri hedefli olarak bir kez yeniden denetle (`check-series-content.cjs`,
   `check-series-svg.cjs`).
4. **Entegrasyon:**
   ```
   node D:\dev\anil-lib-seri-batch1-state\entegre.cjs           # kuru çalışma (temiz olduğu doğrulandı)
   node D:\dev\anil-lib-seri-batch1-state\entegre.cjs --write
   node tools/series/sync-series-hashes.cjs --write
   node tools/series/sync-series-hashes.cjs
   ```
5. **Kapılar:** `corepack pnpm typecheck` · `corepack pnpm test` · `corepack pnpm build`.
   *(`pnpm lint` ve `pnpm format:check` main'de zaten kırmızı — batch kapısı değil.)*
6. **Görsel doğrulama:** dev server; `/seri` + 10 makale; mobil 375px + desktop; light/dark/sepia;
   konsol hatasız. `/read/[slug]` regresyonu (18 link, sıfır seri sızıntısı).
7. **YOL-HARITASI:** `review/son-regresyon.md` **§7** kopyala-yapıştır hazır satırları taşıyor
   (terim defteri, kavram-tekrar defteri "gerçekleşen" sütunu, 11–15 prerequisite taslağı).
8. **+1 hazırlık işi:** `HANDOFF.md` yeniden yazılır (miras maddesi aynen, Batch 1 durumu, alınan
   kararlar, doğrulama kanıtları, **Batch 2 / 11–15 hazırlık kaydı**). Bu dosya silinir.

## Kalıcı durum dizini

`D:\dev\anil-lib-seri-batch1-state\` — scratchpad silinse bile burada. İçerik: 6 araştırma paketi,
4 çapraz denetim dosyası, 5 diyagram spesifikasyonu, **18 inceleme/doğrulama raporu**
(`review/`), 5 workflow script'i ve `entegre.cjs`.

## Bu turda alınan bağlayıcı kararlar (devamda da geçerli)

1. Makale 6–10 kategorisi `models-and-training`, seviye `beginner`, `classification_batch: 1`.
2. GPT-2 parametreleri OpenAI model kartı serisiyle (124 / 355 / 774 milyon / 1,5 milyar);
   model kartında **"1558" geçmiyor**, "1.5 billion" diyor.
3. "Artık bağlantı sönen gradyanı çözer" yazılamaz; He ve ark.'nın **bozulma** çerçevesi kullanılır.
4. Öz-dikkat girdisinin **doğrusal fonksiyonu değildir** (ağırlıklar softmax üzerinden girdiye bağlı).
5. Kaplan tahsisi (5,76×10²³ FLOP): **800 milyar parametre / ~120 milyar token / 0,15 token-parametre**;
   kayıp L = 2,051 vs Chinchilla 1,937, fark 0,114 nat/token. Kaplan'ın ayrı veri fiti aynı bütçede
   ~216 milyar verir ve 6ND ile uyuşmaz (çarpan 1,8) — bu, "yasa değil uydurulmuş eğri" tezinin kanıtı
   olarak metinde duruyor.
6. Llama 3 = 15,6 trilyon token (bütün batch boyunca aynı sayı).
7. Kaplan 2020, Besiroglu 2024, Epoch AI, Llama 3 raporu, Ba ve ark. 2016, Keskar ve ark. 2019
   hakemsizdir ve metinde öyle işaretlenir.
8. Oran ve farklar her zaman tam değerlerden hesaplanır, sonra yuvarlanır.
9. `logit` terimi **7. makalede** ilk kez kurulur; 10. makale geri bağ verir.
10. Yayımlanmış 1–5. makalelerde düzeltme gerektiren bulgu **yoktur**; onlara dokunulmaz.
