# "Sıfırdan Yüze: Yapay Zekâ" — Handoff

> Yaşayan devir dosyası. Yeni oturum SIRASIYLA şunları okur: (1) `docs/seri/SOZLESME.md`
> (değişmez kurallar — buna bağlılık zorunludur), (2) bu dosya, (3) aşağıdaki
> "Next batch preparation" kaydı, (4) `docs/seri/YOL-HARITASI.md` ilgili bölümleri.
> Sonra doğrudan sıradaki 5 makaleyi üretir.

Son güncelleme: 2026-08-25 · Durum: **Batch 0 (1–5) yayında · Sıradaki batch: 6–10 (Batch 1)**

## Miras maddesi (her handoff'ta aynen tekrarlanır)

Çalışma ritmi daima **5 makale + 1 hazırlık işi**dir: bir görevde yalnızca sıradaki 5 makale
yazılır; batch tamamlanıp doğrulandıktan sonra aynı görev içinde bir sonraki batch'in
"Next batch preparation" kaydı üretilir ama sonraki 5 makale yazılmaz. Zincirleme atıf yapısı
(giriş köprüsü, bilinçli geri çağırma, ileri köprü), SOZLESME'ye bağlılık ve bu miras maddesi
100. makaleye kadar her handoff'a aynen taşınır. Pedagojik kural: konu zinciri prerequisite
ilişkileriyle kurulur; önceki kavramlar sonraki makalelerde bilinçli geri çağrılır ve okuyucunun
unutmuş olabileceği varsayılarak kısa yeniden kurulumlarla yeniden kurulur; kanıta dayalı öğrenme
yaklaşımları (spacing, retrieval practice, scaffolding/fading, cognitive load, worked examples,
progressive disclosure) SOZLESME §3'teki sınır koşullarıyla uygulanır, mekanik şablona dönüştürülmez.

## Seri durumu

| Alan | Değer |
|---|---|
| Yayında | Makale 1–5 (Batch 0, hepsi `foundations`, `beginner`) |
| Sıradaki batch | Makale 6–10 (Batch 1) — bu oturumda YAZILMADI (kural gereği) |
| Roadmap | `docs/seri/YOL-HARITASI.md` (pedagojik) + `content/series/roadmap.json` (UI) |
| Rotalar | `/seri` (giriş + yol haritası), `/seri/[slug]` (okuyucu) |
| İçerik sözleşmesi | `content/series/catalog.json` + `content/series/articles/**` + `content/series/assets/<slug>/*.svg` |
| Kod | `src/lib/content/series.ts`, `series-roadmap.ts`, `rehype-inline-svg.ts`; ReaderShell `basePath/listTitle/listSubtitle/homeHref` prop'ları; dashboard seri kartı; sync `validArticleIds` = ana ∪ seri |

## Tamamlanan makaleler (Batch 0)

| # | Slug | Odak |
|---|---|---|
| 1 | `tahmin-makinesi-yapay-zekaya-ilk-bakis` | Kural vs veri; model = ayarlanabilir fonksiyon; AI⊃ML⊃temsil öğrenimi⊃DL hiyerarşisi |
| 2 | `veriden-ogrenmek-model-parametre-ve-kayip` | Parametre, kayıp, gradyan inişi (sayısal örnek), genelleme/aşırı öğrenme, öğrenme döngüsü |
| 3 | `sinir-aglari-katmanlarin-icinde-ne-oluyor` | Nöron, aktivasyon, katmanlar, temsil öğrenimi, backprop sezgisi, tarih şeridi |
| 4 | `dili-sayilara-cevirmek-token-ve-embedding` | Token/BPE, embedding, dağılımsal hipotez, anlam geometrisi, statik vektörün sınırı |
| 5 | `sonraki-kelimeyi-tahmin-etmek-dil-modelinin-dogusu` | Dil modelleme hedefi, n-gram duvarı, Bengio 2003, perplexity, ölçek teaser'ı |

## Önemli editoryal/teknik kararlar

- Kategori sözlüğü ve katalog şeması ana kütüphaneyle ortak; seri ayrı katalog + ayrı rota kullanır.
- `classification_batch` = üretim batch'i (Batch 0 = 1–5, Batch 1 = 6–10 …); `reading_order` seri
  içinde kesintisiz.
- Diyagramlar elle yazılmış SVG; renk YALNIZCA CSS değişkeni (light/dark/sepia uyumu); markdown'da
  `![alt](assets/x.svg "Şekil N — başlık")`; pipeline inline eder (`rehype-inline-svg`).
- content_hash = gövdenin (frontmatter sonrası, trim) UTF-8 SHA-256'sı; hesap aracı üretim
  oturumunda `hash-body.cjs` benzeri script'le yapılır; catalog ↔ frontmatter birebir eşleşmeli.
- Samuel'in "without being explicitly programmed" alıntısı kaynaklarda yok — seri boyunca KULLANMA
  (Batch 0 araştırma bulgusu). İç içe halkalar Goodfellow Fig 1.4 düzenine göre (temsil öğrenimi
  halkası dahil). "Tahmin" terimi ML anlamıyla (görülmemiş girdiye çıktı) tanımlanmış durumda.
- Araştırma/yazım/inceleme Workflow subagent'larıyla; araştırma + inceleme Opus sınıfı modelde;
  sentez ve son kabul ana agent'ta. Araştırma paketleri her batch için yeniden üretilir
  (scratchpad kalıcı değildir — paketlerin kritik bulguları bu dosyaya ve YOL-HARITASI'na işlenir).

## Doğrulama durumu (Batch 0)

- `corepack pnpm typecheck` ✓ · `corepack pnpm test` ✓ (136 test) · `corepack pnpm build` ✓
- Dev server görsel doğrulama: `/`, `/seri`, `/seri/[1–5]`, `/read/[örnek]` — desktop + mobil,
  light/dark/sepia. (Ayrıntı: oturum kapanış raporu.)
- Bilinen önceden-var sorunlar: `pnpm lint` ve `pnpm format:check` main'de zaten kırmızı; bunlar
  batch kapısı DEĞİL (cerebrum notu).

## Next batch preparation — Batch 1 (Makale 6–10)

**Pedagojik hedefler:** Okuyucu Batch 0 sonunda "dil modeli = sonraki-token dağılımı" fikrine ve
öğrenme döngüsüne sahip. Batch 1 bu temeli MODERN MİMARİYE taşır: dikkat → Transformer → ön eğitim →
ölçek yasaları → üretim/decoding. Batch sonunda okuyucu "GPT tarzı bir model nedir, nasıl eğitilir,
nasıl metin üretir" sorusuna uçtan uca cevap verebilmeli.

**Makale planı ve prerequisite'ler (YOL-HARITASI grafıyla):**
- 6 "Dikkat Mekanizması" ← 4 (statik embedding sınırı — "yüz" örneğini AYNEN geri çağır), 5 (bağlamdan tahmin).
- 7 "Transformer" ← 3 (katman/temsil), 6 (dikkat). Vaswani ve ark. 2017 merkezli.
- 8 "Ön Eğitim" ← 2 (öğrenme döngüsü şemasını geri çağır — aynı döngü, dev ölçek), 5 (hedef), 7 (mimari).
- 9 "Ölçek Yasaları" ← 2 (kayıp eğrisi), 8. Kaplan 2020 + Hoffmann/Chinchilla 2022; emergence
  tartışmasını Makale 5'teki teaser'a bağla (Wei 2022 vs Schaeffer 2023).
- 10 "Metin Üretimi" ← 5 (dağılımdan örnekleme — Şekil "sonraki-token dağılımı"nı geri çağır);
  greedy/top-k/top-p/sıcaklık; halüsinasyonun ilk dürüst teaser'ı (ayrıntı 17'de).

**Yeniden çağrılacak eski kavramlar (planlı hatırlatmalar):**
- "Model = ayarlanabilir fonksiyon" (1) → 7'de ("Transformer da dev bir fonksiyon").
- Öğrenme döngüsü + kayıp (2) → 8'de (ön eğitim aynı döngü) ve 9'da (kayıp eğrileri).
- Katman/temsil (3) → 7'de (blok yığını) — kısa yeniden kurulum şart.
- Token/embedding (4) → 6'da giriş köprüsü; "yüz" çok anlamlılık örneği 6'nın açılış problemi.
- Sonraki-token dağılımı + perplexity (5) → 9 (metrik) ve 10 (örnekleme).

**Araştırılacak güncel akademik alanlar:** Vaswani 2017 + modern dikkat varyantları (GQA/MQA,
FlashAttention özet düzeyinde); RoPE/pozisyon kodlama (sezgi düzeyi); Kaplan 2020 vs Chinchilla 2022
compute-optimal tartışması + 2024–2026 güncellemeleri (veri kısıtı literatürü); emergence tartışması
(Wei 2022, Schaeffer 2023 + sonrası); decoding literatürü (nucleus sampling Holtzman 2020);
tokenizer-ötesi not (byte-level modeller) yalnız teaser. Her batch'te olduğu gibi 6 paralel Opus
araştırma ajanı + doğrulanmış kaynak paketleri üret.

**Görselleştirme ihtiyaçları (öngörü):**
- 6: dikkat ağırlıkları ısı/ok şeması ("yüz" cümlesinde hangi kelimeye bakılıyor); query/key/value akışı.
- 7: Transformer blok şeması (sadeleştirilmiş, Türkçe etiketli); katman yığını.
- 8: ön eğitim veri→döngü→checkpoint hattı; veri karışımı şeridi.
- 9: log-log kayıp eğrileri (şematik); compute-optimal karşılaştırma.
- 10: dağılımdan örnekleme; sıcaklığın dağılımı düzleştirmesi/sivriltmesi (aynı çubuk grafiğin
  iki versiyonu — Makale 5 Şekil 1 ile görsel süreklilik).

**Teknik hatırlatmalar:** Yeni makaleler `content/series/articles/` altına (kategori: 6–10 için
`models-and-training` düşünülebilir — karar batch başında YOL-HARITASI güncellenerek verilir;
sidebar kategori grubu batch içinde değişebilir, sorun değil), catalog.json'a `classificationBatch: 1`
ve `readingOrder` 6–10 ile eklenir; roadmap.json'da 6–10 `yayinda` yapılır + slug eklenir;
YOL-HARITASI prerequisite grafı ve kavram-tekrar defteri güncellenir; doğrulama kapıları çalıştırılır;
bu dosya yeni handoff + Batch 2 (11–15) hazırlık kaydıyla güncellenir.
