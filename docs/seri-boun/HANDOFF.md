# "Mülakat Aynası: Boğaziçi CmpE" — Handoff

> Yaşayan devir dosyası: **yalnızca güncel operasyonel state** tutar. Kalıcı kurallar ve üretim
> ritmi `docs/seri-boun/SOZLESME.md`'de (batch semantiği: §6), plan `docs/seri-boun/YOL-HARITASI.md`'de,
> kanıt defteri `docs/seri-boun/ARASTIRMA.md`'de. Yeni oturum SIRASIYLA okur: (1) SOZLESME,
> (2) bu dosya, (3) YOL-HARITASI'nın sıradaki batch'le ilgili bölümleri. Üretim trigger'ı:
> `docs/seri-boun/TRIGGER.md`.

Son güncelleme: 2026-08-28 · Durum: **Planlama tamamlandı · Yayında 0 makale · Sıradaki: 1–5 (Batch 0)**

## Cursor ve güvenli başlangıç

| Alan | Değer |
|---|---|
| Yayımlanan son makale | — (henüz yok) |
| Sıradaki güvenli başlangıç | Makale 1 ("Bilimsel Mülakat: Ne Bekleniyor…"); run kapsamı SOZLESME §6'ya göre çözülür |
| Sıradaki kohort | `classification_batch: 0` |
| Platform durumu | **BOUN içerik sözleşmesi henüz kurulmadı** — katalog, rota ve UI entegrasyonu yok; bu bilinçlidir (sahte kayıt yasak) |

## İlk üretim run'ının kapsamı (Batch 0 = makaleler + entegrasyon)

İlk run, makale üretimine ek olarak platform entegrasyonunu SOZLESME §5'e göre kurar:

1. `content/series-boun/{catalog.json, articles/**, assets/**}` içerik sözleşmesi; BOUN kategori
   sözlüğü kararı (öneri SOZLESME §5'te) — ana kütüphane ve AI serisi şeması değiştirilmeden,
   gerekirse additive genişletmeyle.
2. `/boun` (giriş + yol haritası) ve `/boun/[slug]` (okuyucu) rotaları — ReaderShell'in mevcut
   `basePath/listTitle/listSubtitle/homeHref` prop'larıyla (AI serisinde doğrulanan desen;
   bileşen kopyalanmaz).
3. Sync: `validArticleIds` birleşimine BOUN kataloğu eklenir; bilinmeyen id reddi korunur.
4. BOUN içerik denetleyicisi (`tools/` deseninde) ve gerekiyorsa entegrasyon aracının BOUN
   uyarlaması.
5. Regresyon kanıtı: mevcut 18 `/read` + AI `/seri` rotaları ve kullanıcı progress/bookmark/
   highlight state'i değişmeden; global article-id benzersizliği ana ∪ AI ∪ BOUN üzerinde;
   typecheck + test + build + üç temada gerçek render.

Entegrasyon maliyeti nedeniyle ilk run'da makale sayısını `BATCH=N+1` override'ıyla küçültmek
(örn. `BATCH=2+1`) meşru bir seçenektir; karar run'ı başlatan kullanıcı/oturumundur.

## Sıradaki batch hazırlığı — Batch 0 (Makale 1–5)

**Pedagojik hedef:** Okuyucu seride ne bekleyeceğini ve resmî mülakat gerçeğini öğrenir (1);
ardından mülakatın dili olan mantık-ispat-tümevarım-küme çekirdeği kurulur (2–5). Faz A'nın bu
ilk yarısı, sonraki bütün "tanımla → ispatla → savun" akışlarının zeminidir.

**Makale planı:** YOL-HARITASI Faz A, 1–5 satırları ve "İlk run taslak satırları" geçerlidir.

**Araştırma ihtiyacı:** Makale 1 için resmî sayfalar yeniden doğrulanır ve ARASTIRMA.md erişim
tarihi güncellenir (mülakat formatı değişmiş olabilir). 2–5 için standart kaynaklar: Rosen
(ayrık matematik) + CMPE220 katalog tanımı; iddia düzeyi ders kitabı standardında olduğundan
makale-başı derin literatür taraması gerekmez.

**Görselleştirme öngörüsü:** 2: doğruluk tablosu ve çıkarım şeması; 3: ispat stratejisi seçim
akışı; 4: tümevarım merdiveni ↔ özyineleme açılımı; 5: bağıntı türleri karşılaştırma şeması.
(SVG sözleşmesi: `docs/seri/SOZLESME.md` §6.)

**Sözlü checkpoint tohumları:** "Bir önermeyi arkadaşına 60 saniyede anlat"; "√2'nin
irrasyonelliğini tahtada ispatla"; "tümevarımla özyineleme arasındaki bağı bir cümleyle söyle".

## Bilinen önceden-var sorunlar (batch kapısı DEĞİL)

- `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı (AI serisi HANDOFF'unda da kayıtlı).
- Local'de `DATABASE_URL` yoksa `/api/reader-sync` 503 döner; uygulama çevrimdışı moduna düşer.

## Non-normative history

- **2026-08-28:** Seri, Fable 5 master kurulum görevinde tasarlandı: resmî kaynak doğrulaması
  (ARASTIRMA.md), 5 faz / 41 başlıklık omurga, sözlü mülakat pedagojisi ve bu state zinciri
  oluşturuldu. Makale gövdesi yazılmadı (kurulum görevi üretim run'ı değildir).
