# Claude Code Prompt 01: Makaleleri Siniflandir ve Okuma Sirasina Ekle

Bu prompt **tekrar tekrar calistirilmak uzere** tasarlanmistir. Ayni repo durumunda ikinci kez calistirildiginda dosya veya katalog farki uretmemelidir.

## Gorev

Bu repodaki yeni Markdown makalelerini bul, daha once islenmis makalelere dokunmadan siniflandir, kalici kimlik ver, guvenli dosya adlariyla kategori klasorlerine tasi ve pedagojik okuma sirasina ekle. Isi analizden dogrulamaya kadar tamamla; yalnizca plan veya tavsiye verme.

## Zorunlu Baslangic

1. Once `CLAUDE.md` ve `.wolf/OPENWOLF.md` dosyalarini oku ve OpenWolf protokolunu uygula.
2. `.wolf/anatomy.md`, `.wolf/cerebrum.md` ve `.wolf/buglog.json` dosyalarini kontrol et.
3. `git status --short`, mevcut klasor yapisi ve son commitleri incele.
4. Bu prompt ile ilgisiz kullanici degisikliklerini silme, geri alma veya stage etme.
5. `git reset --hard`, `git checkout --`, `git clean`, zorla push veya toplu silme kullanma.
6. Commit veya push yapma; kullanici acikca isterse ayri bir adim olarak yap.

## Islem Sinirlari

Ilk calistirmada su kaynaklari tara:

- repo kokundeki gercek makale niteligindeki `*.md` dosyalari;
- `inbox/**/*.md` altindaki yeni makaleler.

Asla makale adayi sayma:

- `CLAUDE.md`, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`;
- `prompts/**`, `docs/**`, `.wolf/**`, `.claude/**`, `.git/**`;
- `content/articles/**` altinda zaten islenmis dosyalar;
- uygulama veya arac dokumani oldugu acik olan Markdown dosyalari.

Repo kokundeki bir dosyayi yalnizca baslikli, anlamli uzunlukta ve makale govdesi iceren bir arastirma/yazi belgesi ise aday kabul et. Supheli altyapi dosyalarini atla ve raporla.

Sonraki calistirmalarda yeni makaleler esas olarak `inbox/` altina birakilacak. `inbox/` yoksa olustur. Bos klasorun Git'te kalmasi icin gerekirse `inbox/.gitkeep` kullan.

## Hedef Yapi

```text
content/
  articles/
    foundations/
    models-and-training/
    reasoning-and-memory/
    agents-and-retrieval/
    safety-and-evaluation/
    multimodal-and-future/
    case-studies/
  catalog.json
  ingestion-report.md
inbox/
```

Kontrollu kategori listesi ve pedagojik onceligi:

1. `foundations`: AI tarihi, temel kavramlar, next-token paradigmasi, genel girisler
2. `models-and-training`: Transformer, embedding, representation learning, pretraining, scaling, post-training
3. `reasoning-and-memory`: reasoning, test-time compute, verification, uzun baglam ve bellek
4. `agents-and-retrieval`: agent mimarileri, RAG, retrieval-reasoning, arac kullanimi
5. `safety-and-evaluation`: alignment, yorumlanabilirlik, guvenilirlik, halusinasyon, kalibrasyon, degerlendirme
6. `multimodal-and-future`: multimodal modeller, verimli AI, cihaz ustu AI, world models, gelecek yonleri
7. `case-studies`: belirli model, sirket veya urun ekosistemi incelemeleri

Yeni kategori uydurma. Belirsiz bir makaleyi en yakin kontrollu kategoriye ata ve gerekceyi rapora yaz.

## Kalici Makale Sozlesmesi

Her islenmis makalede UTF-8 YAML frontmatter bulunmali:

```yaml
---
article_id: article_<uuid>
title: "Insan tarafindan okunabilir baslik"
slug: stable-kebab-case-slug
category: foundations
level: beginner
reading_order: 1
summary: "Makaleyi tek cumlede ve somut bicimde aciklayan ozet."
tags:
  - ai-history
content_hash: sha256:<hex-digest>
classification_version: 1
classification_batch: 0
---
```

Kurallar:

- `article_id` ilk islemede `article_` on ekli UUID ile uretilir ve bir daha degismez.
- `title`, makalenin gercek konusunu temsil eder. `Kisa tez` gibi genel bir ilk H1 varsa daha acik bir baslik cikar.
- `slug`, Turkce karakterleri ASCII karsiliklarina ceviren, kucuk harfli, kalici kebab-case degeridir.
- Slug cakismasinda mevcut slug'i degistirme; yeni slug'a kisa ve anlamli bir ayirici ekle.
- `level` yalnizca `beginner`, `intermediate` veya `advanced` olabilir.
- `summary` tek cumle ve ayirt edici olmalidir; pazarlama dili kullanma.
- Etiketler kucuk harfli kebab-case ve en fazla 6 adet olmalidir.
- `classification_version` bu prompt icin `1` degeridir.
- `classification_batch` makalenin kalici ingestion grubunu belirtir.
- Govdeyi kisaltma, yeniden yazma, cevirme veya birlestirme. Yalnizca frontmatter ekle; ilk H1 genel/eksikse frontmatter basligiyla eslestir.

`content_hash`, frontmatter haric Markdown govdesinin su normalize edilmis halinin SHA-256 degeridir:

1. CRLF satir sonlarini LF yap;
2. frontmatter blogunu tamamen cikar;
3. sondaki bos satirlari kaldir;
4. sona tek bir LF ekle;
5. kalan govdeyi baska sekilde degistirme.

Hash bicimi `sha256:<64-kucuk-harf-hex>` olmalidir.

## Katalog Sozlesmesi

`content/catalog.json` su ust seviye yapida olmali:

```json
{
  "schemaVersion": 2,
  "classificationVersion": 1,
  "generatedAt": "ISO-8601 timestamp",
  "articles": []
}
```

Her `articles` kaydi su alanlari icermeli:

```json
{
  "articleId": "article_<uuid>",
  "title": "Baslik",
  "slug": "stable-slug",
  "category": "foundations",
  "level": "beginner",
  "readingOrder": 1,
  "summary": "Tek cumle ozet.",
  "tags": ["ai-history"],
  "contentHash": "sha256:<digest>",
  "path": "content/articles/foundations/stable-slug.md",
  "relatedArticleIds": [],
  "classificationBatch": 0
}
```

JSON alanlari frontmatter ile birebir uyumlu olmali. Katalog `readingOrder` artan sirada tutulmali. `generatedAt` yalnizca katalog gercekten degistiginde guncellenmeli; no-op calistirmada dosyayi yeniden yazma.

## Idempotence ve Mevcut Makale Denetimi

Yeni adaylari islemeden once katalogdaki her makaleyi denetle:

- dosya mevcut mu;
- frontmatter gecerli mi;
- `article_id`, slug, yol, kategori ve batch katalogla uyumlu mu;
- ayni ID, slug veya yol birden fazla kez kullanilmis mi;
- normalize govde hash'i katalog ve frontmatter ile uyumlu mu.

Bir dosya su kosullarin tamaminda islenmis sayilir:

- gecerli `article_id` ve `classification_version` tasir;
- ID katalogda tam bir kez bulunur;
- katalog yolu ayni dosyaya gider;
- normalize govde hash'i eslesir.

Normal tekrar calistirmada islenmis makalenin `article_id`, slug, kategori veya level degerini degistirme. Kategori degisikligi yalnizca kullanici belirli bir `article_id` icin acikca yeniden siniflandirma isterse yapilabilir.

Mevcut bir makalenin govdesi bilerek duzenlenmisse onu yeniden siniflandirma. Kimlik, slug, kategori ve level degerlerini koru; yalnizca hash'i ve gercekten eskidiyse turetilmis ozeti guncelle, sonra raporla.

Frontmatter'da ID olup katalog kaydi olmayan veya katalogda kayitli olup dosyasi bulunmayan tutarsizliklarda yeni ID uretme. Guvenli sekilde uzlastirilabiliyorsa mevcut kimligi koruyarak onar; aksi halde mutasyondan once dur ve kesin sorunu bildir.

## Duplicate ve Konu Cakismasi

- Ayni normalize govde hash'ine sahip dosya **exact duplicate** kabul edilir.
- Exact duplicate'i silme, tasima veya kataloglama; `inbox/` icinde birak ve hangi makaleyle ayni oldugunu raporla.
- Ayni konuya ait kisa/uzun, giris/ileri seviye veya farkli bakis acili yazilar duplicate degildir.
- Topikal olarak ilgili ayri makaleleri koru ve gerekiyorsa `relatedArticleIds` ile bagla.
- Benzerlik konusunda emin degilsen icerigi koruma tarafinda kal; otomatik birlestirme yapma.

## Okuma Sirasi ve Sınıflandırma Batch'leri (Cohorts)

Yeni makaleler tek bir "Sınıflandırma Batch" (ingestion cohort) oluşturur.

1. **Batch Ataması**:
   - Yeni adayları incele, duplicate'leri çıkar. Eğer en az bir yeni makale varsa, `nextBatch = max(existing classificationBatch) + 1` hesapla. İlk yeni kohort Batch 1 olur.
   - Bu tek batch numarasını yeni eklenen tüm makalelere ata.
   - Exact duplicate'ler veya sadece bakım/reclassification içeren run'lar yeni batch yaratmaz.
   - Mevcut makalelerin batch'ini ASLA değiştirme.

2. **Okuma Sırası (readingOrder)**:
   - Eski batch'lerin sıralamasını ve içsel pedagojik düzenini koru. Yeni batch, her zaman son batch'in bitiminden sonra eklenir (append-only history önceliği).
   - Yeni batch içindeki makaleleri pedagojik sıraya göre kendi içinde şöyle sırala:
     1. tarih ve temel zihinsel modeller;
     2. next-token, temsil ve Transformer;
     3. pretraining, scaling ve post-training;
     4. reasoning, verification, uzun baglam ve bellek;
     5. retrieval ve agent sistemleri;
     6. alignment, yorumlanabilirlik, guvenilirlik ve degerlendirme;
     7. multimodal, verimlilik ve world models;
     8. kavramsal onkosullarindan sonra case study'ler.
     Kategori icinde genellikle `beginner -> intermediate -> advanced` akisini kullan.
   - Gerekirse tum `reading_order` / `readingOrder` degerlerini 1'den baslayan, benzersiz ve kesintisiz bir dizi olarak yeniden numaralandir.

## Uygulama Akisi

1. **Preflight:** Git durumunu ve kapsami incele. Tum mevcut batch degerlerini kontrol et. Katalog sadece baslangic cohortunu (18 makale) iceriyorsa ve batch yoksa onlari Batch 0'a tasi. Eger batchlerde mantiksiz araliklar/karmasalar varsa mutasyondan once dur.
2. **Envanter:** Mevcut katalog, islenmis makaleler ve yeni adaylar icin ayri listeler cikar.
3. **Audit:** Mevcut katalog sozlesmesini ve hash'leri denetle; guvenli bakim guncellemelerini plana ekle.
4. **Icerik analizi:** Her yeni makaleyi tam oku. Baslik, konu, seviye, kategori, ozet, etiketler, onkosullar ve olasi exact duplicate durumunu belirle.
5. **Dry plan:** Hedef batch'i (`Sınıflandırma N`) belirt. Her aday icin `eski yol -> yeni yol`, baslik, kategori, level, okuma konumu, duplicate sonucu ve gerekceyi tablo halinde yaz. Mutasyondan once cakisma olmadigini kontrol et.
6. **Uygulama:** Hedef klasorleri olustur. Takip edilen dosyalarda `git mv`, untracked dosyalarda normal `mv` kullan. Frontmatter'i ekle, katalogu tek bir tutarli guncelleme olarak yaz ve raporu olustur/guncelle.
7. **Dogrulama:** Tum katalog ve dosya sozlesmesini bastan kontrol et. ID, slug, yol, hash ve sira benzersizligini kanitla.
8. **No-op simulasyonu:** Ayni durumda ikinci calistirmanin hangi adaylari gorecegini yeniden tara. Degisiklik plani bos degilse idempotence hatasini duzeltmeden bitirme.
9. **OpenWolf:** Degisen dosyalari `.wolf/anatomy.md` icine yansit, onemli kararlari `.wolf/memory.md` ve gerekirse `.wolf/cerebrum.md` icine kaydet. Karsilasilan hatalari `.wolf/buglog.json` icine yaz.

`content/ingestion-report.md` en az sunlari icermeli:

- calisma ozeti (hangi batch Sınıflandırma N üretildi);
- yeni eklenen makaleler ve hedef yollari;
- mevcut makale bakim guncellemeleri;
- exact duplicate ve atlanan dosyalar;
- belirsiz siniflandirma gerekceleri;
- son okuma sirasi (batchler halinde);
- calistirilan dogrulamalar.

No-op calistirmada rapor icerigi degismiyorsa yalnizca timestamp degistirmek icin yeniden yazma.

## Kabul Kriterleri

Bitirmeden once somut olarak dogrula:

- her islenmis makale tam bir katalog kaydina sahip;
- her katalog kaydi mevcut tek bir makaleye isaret ediyor;
- `article_id`, slug, yol, content hash ve okuma sirasi benzersiz;
- `readingOrder` 1..N araliginda kesintisiz;
- kategori ve level degerleri kontrollu listede;
- makale govdeleri frontmatter/izinli H1 duzeltmesi disinda korunmus;
- exact duplicate dosyalar kataloglanmamis ve silinmemis;
- ikinci degisikliksiz tarama no-op;
- `git diff --check` sonucu degerlendirilmis; kaynak makalelerdeki onceden var olan whitespace sorunlarini gereksiz toplu rewrite ile duzeltme;
- Git diff'i yalnizca bu gorevin kapsamini iceriyor.

## Son Rapor

Son mesajinda su bilgileri ver:

- eklenen, bakimi yapilan, duplicate bulunan ve atlanan dosya sayilari;
- kategori dagilimi ve toplam okuma sirasi;
- olusturulan/degistirilen yollar;
- calistirilan dogrulamalar ve sonuclari;
- cozulmemis bir risk varsa tam aciklamasi.

Kaniti olmayan bir kontrol icin "gecti" deme. Gorevi yarida birakma; engel yoksa analiz, mutasyon ve dogrulamayi ayni oturumda tamamla.
