# Batch 1 (Makale 6–10) — Duraklatma Kaydı

> **Bu geçici bir kayıttır.** Batch 1 tamamlandığında `docs/seri/HANDOFF.md`'ye devredilir ve bu
> dosya silinir. Kurallar değişmedi: `docs/seri/SOZLESME.md` geçerlidir.

Duraklatma: 2026-08-26 · Sebep: kullanıcı publish arası istedi · Durum: **Makale 6, 7, 8 yazıldı;
9 ve 10 yazılmadı**

---

## Tam olarak nerede durduk

| Aşama | Durum |
|---|---|
| Araştırma (6 paket) | ✅ tamamlandı |
| Çapraz denetim (URL + aritmetik + çelişki) | ✅ tamamlandı, 16 bağlayıcı karar üretildi |
| Makale 6 yazımı | ✅ tamamlandı |
| Makale 7 yazımı | ✅ tamamlandı |
| Makale 8 yazımı | ✅ tamamlandı |
| **Makale 9 yazımı** | ⛔ **başlamadı** (ajan başlatıldı, tek satır üretmeden durduruldu) |
| Makale 10 yazımı | ⛔ başlamadı |
| Diyagram üretimi (6–10, ~15 SVG) | ⛔ başlamadı |
| İnceleme turu (11 ajan) | ⛔ başlamadı |
| Entegrasyon (catalog + roadmap + hash) | ⛔ başlamadı |
| Doğrulama kapıları + görsel doğrulama | ⛔ başlamadı |
| +1 hazırlık kaydı (Batch 2 / 11–15) | ⛔ başlamadı |

Durdurulan workflow: `w23pt2rrj` / run `wf_65048600-28c`. Journal'da 3 `result` (yazar 6, 7, 8) ve
4. bir `started` (yazar 9) var; yazar 9 hiçbir dosya yazmadan sonlandırıldı.

## Çalışma ağacının durumu (doğrulandı)

```
?? content/series/articles/models-and-training/   (3 makale: 6, 7, 8)
?? tools/series/sync-series-hashes.cjs             (yeni araç)
?? docs/seri/CHECKPOINT-BATCH1.md                  (bu dosya)
 M .wolf/anatomy.md  .wolf/buglog.json  .wolf/cerebrum.md  .wolf/memory.md
```

**Yarım veya bozuk çıktı yok:**
- Makale 9 dosyası yok, `9-spec.md` yok, yeni asset klasörü yok.
- Üç makalenin üçü de `## ` ile başlıyor, `### Sırada ne var` + `## Kaynakça` ile bitiyor,
  TODO/placeholder içermiyor, kaynakçaları tam.
- `node tools/series/check-series-content.cjs` → **8 makale denetlendi, sorun yok.**

**Publish güvenliği:** Makale 6–8 henüz `content/series/catalog.json`'da DEĞİL. Uygulama katalogdan
okuduğu için bu üç dosya siteye çıkmaz; `/seri` hâlâ yalnızca 1–5'i gösterir. Diyagramlar da henüz
üretilmediği için eksik SVG referansı riski yok (referanslar yalnızca katalogdaki makaleler için
çözülür).

## Yazılan makaleler

| # | Slug | Kelime | H2 | Şekil | Kendini yokla |
|---|---|---|---|---|---|
| 6 | `dikkat-mekanizmasi-baglami-tartmayi-ogrenmek` | 2.701 | 9 | 3 | 3 |
| 7 | `transformer-modern-dil-modellerinin-mimarisi` | 2.768 | 10 | 3 | 3 |
| 8 | `on-egitim-internet-olceginde-sonraki-token` | 2.735 | 10 | 3 | 3 |

Frontmatter'larda `content_hash` **placeholder** (`sha256:000…0`) — entegrasyon aşamasında
`node tools/series/sync-series-hashes.cjs --write` ile hesaplanacak. Bu bilinçlidir, hata değildir.

Sabitlenen kimlikler (asla değişmez):

| # | article_id |
|---|---|
| 6 | `article_b7d892a3-a696-472a-840e-1ddf681246e0` |
| 7 | `article_bbe0959b-8e31-451f-9c73-32b50dcc254f` |
| 8 | `article_6938db00-d07b-4b21-82ea-31f95a10d443` |
| 9 | `article_adf92e93-e5fe-4f69-8b2f-f621b3d8c083` |
| 10 | `article_ffb7fe2e-37b4-4cbd-a1de-01044c11886e` |

Hepsi `category: models-and-training`, `level: beginner`, `classification_batch: 1`,
`reading_order` 6–10.

## Kalıcı durum dizini (scratchpad silinse bile burada)

`D:\dev\anil-lib-seri-batch1-state\` — 644 KB, 19 dosya. İçindekiler:

| Dosya | Ne işe yarar |
|---|---|
| `BRIEF.md` | Batch bağlamı, terim kuralları, yasaklar |
| `DIYAGRAM-KILAVUZU.md` | Batch 0'dan çıkarılmış bağlayıcı SVG biçim kılavuzu |
| `research/01-dikkat.md` … `05-uretim-decoding.md` | Beş konu paketi (doğrulanmış olgular, worked example'lar, diyagram fikirleri, kaynakça) |
| `research/06-pedagoji-zincir.md` | Zincir mimarisi: giriş köprüleri (birebir alıntılarla), "Sırada ne var" tasarımları, kavram-tekrar planı, terim listesi, bilişsel yük bütçesi, Kendini yokla önerileri, analoji envanteri, üslup fingerprint'i |
| `research/00-ana-agent-dogrulamasi.md` | **En yüksek otorite** — ana agent'ın kendi hesapladığı Makale 10 sayıları |
| `research/00-aritmetik-denetimi.md` | 178 hesabın bağımsız denetimi, 8 düzeltme |
| `research/00-celiski-kapsam.md` | 16 bağlayıcı karar, hakemlilik denetimi, doldurulmuş kaynak boşlukları |
| `research/00-url-denetimi.md` | 68 URL'nin erişilebilirlik ve hedef doğrulaması |
| `diagrams/6-spec.md`, `7-spec.md`, `8-spec.md` | Yazarların ürettiği diyagram spesifikasyonları |
| `yazim-workflow.js` | İlk koşunun script'i (tarihsel kayıt) |
| `yazim-workflow-devam-9-10.js` | **DEVAM SCRIPT'İ** — 9, 10 + 6–10 arası tüm diyagramlar |
| `inceleme-workflow.js` | İnceleme turu (5 olgu + 5 sözleşme + 1 seri bütünlüğü) |
| `entegre.cjs` | catalog.json + roadmap.json entegrasyonu (kuru çalışma destekli) |

## Kaldığı yerden devam etme (adım adım)

**1. Makale 9 ve 10 + diyagramlar**

Aynı oturumdaysan:
```
Workflow({scriptPath: "<state>\\yazim-workflow-devam-9-10.js"})
```
Yeni oturumdaysan aynı komut yine çalışır — devam script'i kendi kendine yeterlidir, önceki koşunun
önbelleğine ihtiyaç duymaz. `written` listesi 6–8 ile tohumlanmıştır; yazar 9 onları okur, yazar 10
9'u da okur. Diyagram aşaması 6–10'un beşini birden üretir (hiçbiri henüz üretilmedi).

Script içindeki yollar `<state>` değil scratchpad'i gösterir. Scratchpad silinmişse script'teki
`const SP = '...'` satırını `D:\\dev\\anil-lib-seri-batch1-state` olarak değiştir — başka değişiklik
gerekmez.

**2. İnceleme turu** — `inceleme-workflow.js` (11 ajan: makale başına adversarial olgu denetimi +
sözleşme/zincir denetimi, artı 1–10 arası seri bütünlüğü denetçisi). Bulguları ana agent doğrulayıp
uygular; çelişkili bulgularda karar ana agent'ındır ve gerekçesi HANDOFF'a not edilir (SÖZLEŞME §9).

**3. Entegrasyon**
```
node <state>\entegre.cjs            # kuru çalışma
node <state>\entegre.cjs --write    # catalog.json + roadmap.json
node tools/series/sync-series-hashes.cjs --write
node tools/series/sync-series-hashes.cjs
```
`catalog.json` `JSON.stringify(...,2)+"\n"` ile byte-identical round-trip yapar; `roadmap.json`'un
kompakt satır biçimi korunur (script satır bazlı replace kullanır).

**4. Doğrulama kapıları**
```
node tools/series/check-series-content.cjs
node tools/series/check-series-svg.cjs
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```
Ardından dev server'da gerçek render: `/seri` + 10 makale, mobil 375px + desktop, light/dark/sepia,
konsol hatasız; ayrıca `/read/[slug]` regresyon kontrolü (18 link, sıfır seri sızıntısı).
*Not: `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı — batch kapısı değildir.*

**5. YOL-HARITASI güncellemesi** — 6–10 `[yayında]`, prerequisite grafı, kavram-tekrar defterinin
"gerçekleşen" sütunu, terim defterine Batch 1 satırları (`06-pedagoji-zincir.md` §4.1'de hazır).

**6. +1 hazırlık işi** — `HANDOFF.md` yeniden yazılır: miras maddesi aynen, Batch 1 durumu, alınan
kararlar, doğrulama kanıtları ve **Batch 2 (11–15) hazırlık kaydı**. Bu dosya silinir.

## Devam ederken bilinmesi gereken açık bulgular

**A1 — Makale 6, worked example aritmetiği (doğrulanmış, düzeltilmedi).**
Metinde `0,154×1 + 0,691×2 + 0,154×1 = 0,154 + 1,383 + 0,154 = 1,691` yazıyor. Toplam kendi içinde
tutuyor ama **çarpım hatalı**: `0,691 × 2 = 1,382`, 1,383 değil. Tam ağırlıklarla gerçek değer
1,6914'tür. İki tutarlı seçenek var:
- (a) üç basamak boyunca kal: `0,154 + 1,382 + 0,154 = 1,690`, çıktı `(1,690 ; 0,154)`;
- (b) 1,691'i koru ama ara çarpımı tam ağırlıkla göster ve yuvarlama artığını dipnotla.
**(a) önerilir** — makale zaten ağırlıkların 0,999 topladığını dipnotluyor, aynı disiplin sürer.
Düzeltme yapılırsa 6 geçişin hepsi ve diyagram spesifikasyonu birlikte güncellenmeli.
*(Bu bulgu `bug-079` olarak da kayıtlı; oradaki "düzeltildi" notu geçersizdir — düzeltme yazar
ajanının sonraki yazımıyla üzerine yazıldı.)*

**A2 — Makale 9 için sabitlenmiş sayılar (Makale 8 ile tutarlılık şartı).**
Makale 8 Llama 3'ü `15,6 trilyon token` diye tabloluyor ve hesapta "yuvarlak hesap için 15 trilyon
alıyoruz" diyerek açıkça yuvarlıyor. Makale 9 token/parametre oranını **38,5 (≈39)** yazmalı, 37
değil; "Chinchilla'nın 20'sinin yaklaşık 1,9 katı" ifadesi bu değerle doğrudur.

**A3 — Makale 9'un 6ND geri bağı.** Makale 8, 6ND kuralını tanıtırken "yayımlanan FLOP değerleriyle
yüzde on mertebesinde sapmalar görülür" cümlesini kurdu (satır 116 ve 136). Makale 9'un Gopher
hesabındaki yüzde 13'lük sapma bu cümleye geri bağlanmalı ki sürpriz olmasın.

**A4 — İnceleme turu henüz çalışmadı.** Makale 6–8 yalnızca mekanik denetimden ve ana agent'ın
nokta kontrollerinden geçti; adversarial olgu denetimi ve sözleşme/zincir denetimi yapılmadı.
Bunlar Batch 0'da gerçek hatalar bulmuştu — atlanmamalı.

## Bu turda alınan bağlayıcı kararlar (devamda da geçerli)

1. Makale 6–10 kategorisi `models-and-training`, seviye `beginner`.
2. GPT-2 parametreleri OpenAI model kartı serisiyle verilir (124 / 355 / 774 milyon / 1,5 milyar),
   makalenin kendi tablosuyla (117 / 345 / 762 / 1542) değil — yayımlanmış 4. makale 124 milyon
   diyor ve haklı.
3. "Artık bağlantı sönen gradyanı çözer" yazılamaz; He ve ark.'nın **bozulma** çerçevesi kullanılır.
4. Transformer taban modelinin "rekor" iddiası yalnızca İngilizce–Almanca için kurulur.
5. Llama 3 = 15,6 trilyon token (bütün batch boyunca aynı sayı).
6. Kaplan 2020, Besiroglu 2024, Epoch AI derlemesi hakemsizdir ve metinde öyle işaretlenir.
7. Oran ve farklar her zaman tam değerlerden hesaplanır, sonra yuvarlanır.
8. Yayımlanmış 1–5. makalelerde düzeltme gerektiren bulgu **yoktur**; onlara dokunulmaz.
