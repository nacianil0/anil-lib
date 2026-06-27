# Claude Code Prompt 02: Premium Makale Okuyucu Uygulamasini Kur

Bu prompt **yalnizca bir kez** calistirilmak uzere tasarlanmistir. `prompts/01-classify-and-order-articles.md` basariyla calistirildiktan ve `content/catalog.json` olustuktan sonra kullan.

## Gorev

Bu repoda, kataloglanmis Markdown makalelerini pedagojik sirayla okumak icin temiz, modern, sik ve premium hisseden bir web uygulamasini bastan sona kur. Sol sidebar okuma sirasini gostersin; kullanici onceki/sonraki makaleye ilerleyebilsin; aktif makale, tamamlanma durumu ve kaldigi konum tarayicida kalici olarak hatirlansin.

Yalnizca plan verme. Uygulamayi kur, test et, tarayicida dogrula ve calisan yerel URL'yi raporla.

## Tek Seferlik Calisma Koruması

1. Once `CLAUDE.md`, `.wolf/OPENWOLF.md`, `.wolf/anatomy.md`, `.wolf/cerebrum.md` ve `.wolf/buglog.json` dosyalarini oku.
2. `docs/superpowers/specs/2026-06-27-anil-lib-reader-prompts-design.md` belgesini oku ve bu promptla birlikte kaynak kabul et.
3. `git status --short`, mevcut manifestler ve klasor yapisini incele.
4. `.anil-lib-reader.json` veya `src/app/read/[slug]/page.tsx` zaten varsa bunun mevcut bir okuyucu uygulamasi olup olmadigini denetle. Uygulama daha once kurulmus ise dosyalari yeniden scaffold etme ve mevcut kodu ezme; durup bu promptun tek seferlik oldugunu bildir.
5. `content/catalog.json` yoksa veya gecersizse uygulamayi kurmaya baslama. Once Prompt 01'in calistirilmasi gerektigini somut hatayla bildir.
6. Ilgisiz kullanici degisikliklerini geri alma, silme veya stage etme. Destructive Git komutlari kullanma. Kullanici acikca istemedikce commit/push yapma.

## Kapsam

Kurulacak sey tek bir Next.js okuyucu uygulamasidir. Sunlari **kurma**:

- Vite/Fastify Studio;
- CMS veya admin paneli;
- veritabani;
- kullanici hesabi, giris veya bulut senkronizasyonu;
- ayri API sunucusu;
- pazarlama landing page'i;
- gereksiz monorepo katmanlari.

Icerik uretimi ve siniflandirma Prompt 01'in sorumlulugudur. Bu uygulama `content/catalog.json` ve `content/articles/**/*.md` sozlesmesini salt okunur tuketir.

## Teknoloji Yigini

Referans proje `nacianilcom` ile uyumlu olarak kullan:

- Node.js 20+
- pnpm
- Next.js 15 App Router
- React 19
- TypeScript 5.7, strict mode
- Tailwind CSS 3.4
- `next-mdx-remote` 6
- `gray-matter`
- `remark-gfm`
- `rehype-slug`
- Zod 3
- Lucide React ikonlari
- Vitest 3 + Testing Library
- Playwright
- ESLint 9 flat config
- Prettier 3

Mevcut manifest yoksa kokte tek uygulamali bir `package.json` olustur. pnpm lockfile uret. Bagimliliklari birbirleriyle ve Next.js 15/React 19 ile uyumlu surumlerden sec; eski veya gereksiz paket ekleme.

En az su scriptleri sagla:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "typecheck": "tsc --noEmit",
  "lint": "eslint .",
  "test": "vitest run",
  "test:e2e": "playwright test",
  "check": "pnpm typecheck && pnpm lint && pnpm test && pnpm build"
}
```

Gercek script sozdizimini paket yoneticisine uygun yaz ve ESLint 9 flat config kullan.

## Beklenen Kod Sinirlari

Mevcut repo yapisina uyarlayarak su sorumluluklari ayri tut:

```text
src/
  app/
    layout.tsx
    page.tsx
    not-found.tsx
    error.tsx
    read/[slug]/page.tsx
    globals.css
  components/reader/
    reader-shell.tsx
    reader-sidebar.tsx
    mobile-reading-list.tsx
    article-progress.tsx
    article-navigation.tsx
    completion-control.tsx
    markdown-components.tsx
  lib/content/
    schema.ts
    catalog.ts
    articles.ts
    types.ts
  lib/progress/
    schema.ts
    storage.ts
    use-reader-progress.ts
  lib/reader/version.ts
```

Dosya adlari ihtiyaca gore hafifce degisebilir, fakat su sinirlari bozma:

- Icerik okuma ve dogrulama yalnizca `lib/content` icinde.
- localStorage semasi ve islemleri yalnizca `lib/progress` icinde.
- UI bilesenleri katalog veya dosya sistemini dogrudan parse etmez.
- Server component'ler dosya sistemi ve Markdown'i hazirlar; client component'ler yalnizca etkilesim ve tarayici state'i yonetir.
- Buyuk bir her-seyi-yapan component olusturma.

Kurulum tamamlaninca su isaret dosyasini olustur:

```json
{
  "schemaVersion": 2,
  "app": "anil-lib-reader"
}
```

Dosya yolu `.anil-lib-reader.json` olsun. Zamana bagli alan ekleme; dosya deterministik kalsin.

## Icerik Sozlesmesi ve Build-Time Dogrulama

Zod ile hem `content/catalog.json` kayitlarini hem makale frontmatter'ini dogrula. Kontrollu degerler:

- kategori: `foundations`, `models-and-training`, `reasoning-and-memory`, `agents-and-retrieval`, `safety-and-evaluation`, `multimodal-and-future`, `case-studies`;
- level: `beginner`, `intermediate`, `advanced`;
- `articleId` / `article_id`: `article_` ile baslayan kalici UUID;
- hash: `sha256:` ile baslayan 64 haneli kucuk harf hex;
- `readingOrder`: 1'den baslayan kesintisiz benzersiz tam sayilar;
- `classificationBatch`: 0'dan baslayan negatif olmayan tam sayi.

Build su durumlarda acik ve dosya yolunu gosteren bir hatayla durmali:

- katalog veya makale eksik;
- ID, slug, yol veya sira duplicate;
- katalog ile frontmatter uyusmuyor;
- katalog path'i `content/articles/` disina cikiyor;
- desteklenmeyen kategori/level;
- guvensiz path traversal;
- okunamayan UTF-8 veya parse edilemeyen frontmatter.

Ham HTML'i etkinlestirme ve `rehype-raw` kullanma. Markdown icindeki ham HTML'nin kontrolsuz DOM'a girmesine izin verme. GFM tablo/listeleri ve kod bloklarini destekle. Basliklara kalici slug/anchor ekle.

`generateStaticParams` ile tum `/read/[slug]` rotalarini katalogdan uret. Bilinmeyen slug `notFound()` ile gercek 404 versin.

## Route Davranisi

- Ana okuma rotasi `/read/[slug]`.
- `/`, client tarafinda localStorage hydrate olduktan sonra gecerli `currentArticleId` varsa onun slug'ina `router.replace` ile gider; yoksa ilk makaleye gider.
- localStorage'a server component icinden erismeye calisma.
- Ana route hydrate olurken kucuk ve stabil bir yukleme yuzeyi goster; layout shift uretme.
- JavaScript kullanilamiyorsa ilk makaleye erisilebilir normal bir link sun.
- Onceki/sonraki kontroller katalog sirasini kullanir. Ilk/son makalede olmayan yon devre disi ve erisilebilir olmali.

## Okuma Arayuzu

Bu bir operasyonel okuyucu uygulamasidir; hero, urun tanitimi veya landing page tasarlama.

### Desktop

- Sol tarafta sabit ve stabil genislikte sticky sidebar.
- Sidebar makaleleri oncelikle `classificationBatch`'e gore gruplar. Her batch (ornegin `Sınıflandırma 00 · 18 makale`) icin iki basamakli (0 dolgulu) indeks ve ogretici basligi gosterilir.
- Batch icerisinde makaleler pedagojik kategori basliklari altinda siralanir.
- Her satirda sira numarasi, kisa baslik ve okunma durumu bulunur.
- Aktif makale belirgin fakat abartisiz vurgulanir.
- Sidebar kendi icinde scroll olabilir; aktif madde gorunur alana getirilir.
- Ana makale kolonu ortalanir ve yaklasik 68-74 karakter satir uzunlugunda kalir.
- Ustte kompakt makale metadatasi ve okuma ilerlemesi; altta onceki/sonraki navigasyonu bulunur.

### Mobile

- Sidebar sayfayi daraltmaz; Lucide `Menu` veya `ListTree` ikonlu bir dugmeyle drawer olarak acilir.
- Drawer focus trap, Escape ile kapanma, disariya tiklayinca kapanma ve dogru ARIA etiketlerine sahip olur.
- Uzun basliklar dugme veya liste tasmasi yaratmaz.
- Onceki/sonraki kontroller dokunmaya uygun fakat gereksiz buyuk olmayan hedeflere sahiptir.

### Gorsel Dil

- Editoryal govde ve basliklarda Newsreader.
- Arayuz metninde Inter.
- Kodda JetBrains Mono.
- Fontlari `next/font` ile self-hosted/optimize et; runtime dis font istegi olusturma.
- Acik ve koyu sistem temasini destekle; flash/hydration uyumsuzlugu yaratma.
- Dengeli neutral yuzeyler, graphite metin, kontrollu burgundy vurgu ve ayri bir serin ikincil vurgu kullan.
- Tek renkli beige/cream, slate veya mor agirlikli tema kurma.
- Gradient, dekoratif blob/orb, asiri golge, cam efekti ve kart-icinde-kart kullanma.
- Kartlari yalniz gercek tekrar eden nesnelerde kullan; makale sayfasini dev bir karta koyma.
- Border radius 8px veya daha az.
- Hero boyutunda tipografiyi kompakt reader yuzeyinde kullanma.
- Letter spacing `0`; font boyutunu viewport genisligine gore olcekleme.
- Hover/focus durumlarinda layout boyutu degismemeli.

### Markdown Tipografisi

- H1-H4, paragraf, liste, blockquote, link, tablo, inline code ve fenced code stilleri ayri ve tutarli olsun.
- Basliklar onceki/sonraki icerigi kapatmasin; sticky toolbar offset'i anchor navigasyonunda hesaba katilsin.
- Kod bloklari kucuk ekranda yatay scroll olsun, sayfayi genisletmesin.
- Tablolar mobilde kontrollu yatay scroll kapsayicisinda olsun.
- Linkler sadece renkle degil alt cizgi/focus ile de ayirt edilsin.
- Kontrast WCAG AA duzeyinde olsun.
- `prefers-reduced-motion` durumunda gereksiz animasyonlari kapat.

## Okuma Ilerlemesi ve localStorage

Tek kaynak anahtari:

```text
anil-lib:reader-progress:v1
```

Semasi:

```ts
type ReaderProgress = {
  currentArticleId: string | null;
  articles: Record<string, {
    headingId: string | null;
    scrollRatio: number;
    completed: boolean;
    lastReadAt: string;
  }>;
};
```

Davranis:

- State'i Zod veya esdeger guvenli parser ile oku; bozuk JSON/yanlis semada bos state'e don.
- SSR sirasinda `window` veya localStorage'a dokunma.
- Aktif makaleyi `article_id` ile kaydet; slug veya sira numarasini kimlik olarak kullanma.
- Scroll ilerlemesini throttled bir handler ile kaydet (yaklasik 200-300 ms); her pikselde yazma.
- `visibilitychange`, `pagehide` ve route gecisinde son konumu flush et.
- En son gorunen makale basliginin anchor ID'sini `headingId` olarak tut; `scrollRatio` fallback olsun.
- Restore sirasinda once heading anchor'ini dene. Bulunamazsa 0..1 araligina clamp edilmis ratio'yu kullan.
- Fontlar ve icerik layout'u hazir olduktan sonra restore et; ilk paint'te sert sicrama veya sonsuz scroll dongusu yaratma.
- Makale sonuna yaklasik %90 ulasinca completed yap; kullanici ayrica acik bir kontrolle tamamlandi durumunu acip kapatabilsin.
- Sidebar toplam tamamlanma sayisi/yuzdesi ve her makalenin unread/in-progress/completed durumunu gostersin.
- Katalogda artik olmayan ID'leri sessizce yok say; kullanici state'ini gereksiz yere tamamen sifirlama.
- `storage` eventiyle diger sekmelerdeki ilerleme degisikliklerini senkronla.
- localStorage engelliyse uygulama calismaya devam etsin; yalnizca kalicilik devre disi kalsin.

## Erisilebilirlik ve Etkilesim

- Semantic `nav`, `main`, `article`, `aside`, baslik hiyerarsisi ve skip link kullan.
- Tum ikon dugmelerinde gorunur veya screen-reader etiketi ve gerekiyorsa tooltip bulunur.
- Focus halkalarini kaldirma.
- Drawer acildiginda odagi yonet, kapandiginda tetikleyiciye geri ver.
- Aktif makale linkinde `aria-current="page"` kullan.
- Progress durumunu yalniz renkle anlatma; ikon/metin veya erisilebilir label ekle.
- Klavye ile sidebar, drawer, onceki/sonraki ve completion kontrolu tamamen kullanilabilir olsun.

## Hata Durumlari

- `not-found.tsx`: bulunamayan makale icin sade 404 ve okuma listesine donus.
- `error.tsx`: reader seviyesinde client error boundary ve tekrar deneme.
- Bos katalog: build-time acik hata; bos bir uygulama render etme.
- Bozuk localStorage: console spam veya crash olmadan bos state.
- Markdown parse hatasi: ilgili path ve nedeni build hatasinda goster.
- Hydration mismatch: server/client zaman, tema veya localStorage verisini dogrudan farkli render etme.

## Test Plani

### Unit testler

En az sunlari kapsa:

- gecerli/gecersiz katalog semasi;
- duplicate ID, slug, path ve reading order;
- kesintisiz okuma sirasi;
- katalog-frontmatter uyumu;
- path traversal reddi;
- progress semasi ve bozuk JSON fallback'i;
- scroll ratio clamp;
- article ID -> slug cozumleme;
- completion toggle ve state migration icin guvenli varsayilanlar.

### Playwright akislari

En az sunlari otomatik dogrula:

1. `/` ilk ziyarette ilk makaleye gider.
2. Desktop sidebar katalog sirasini gosterir ve tiklanan makaleye gider.
3. Onceki/sonraki kontroller dogru sirayi izler.
4. Bir makalede scroll sonrasi refresh, makale ve konumu geri getirir.
5. Completed durumu refresh sonrasi korunur ve sidebar'a yansir.
6. Bozuk localStorage uygulamayi bozmaz.
7. Mobile viewport'ta drawer acilir, link secimiyle kapanir ve odak yonetimi calisir.
8. Bilinmeyen slug gercek 404 verir.

## Uygulama Akisi

1. **Kesif:** Repo, katalog, makale sozlesmesi ve Git durumunu incele. Uygulama guard'ini kontrol et.
2. **Plan:** Olusturulacak/degistirilecek dosyalari ve server/client sinirlarini kisa fakat somut olarak yaz.
3. **Scaffold:** Manifestler, Next/TypeScript/Tailwind/ESLint/Vitest/Playwright ayarlari ve temel dizinleri olustur.
4. **Icerik katmani:** Zod semalari, guvenli path cozumleme, katalog loader, Markdown loader ve static params.
5. **Progress katmani:** Versiyonlu storage parser, hook ve restore/save davranisi.
6. **UI:** Reader shell, sidebar, mobil drawer, makale tipografisi, progress, completion ve onceki/sonraki kontrolleri.
7. **Testler:** Unit ve Playwright testlerini yaz.
8. **Kalite:** Format, typecheck, lint, unit test, production build ve e2e testleri calistir; hatalari kok nedeninden duzelt.
9. **Gorsel dogrulama:** Uygulamayi yerelde calistir. Playwright ile en az desktop ve mobile screenshot al; bos canvas, overlap, clipped text, yatay sayfa tasmasi ve bozuk asset olmadigini kontrol et. OpenWolf protokolune uygun olarak `openwolf designqc` kullan.
10. **OpenWolf:** Anatomy, memory, cerebrum ve buglog kayitlarini gercek sonuca gore guncelle.
11. **Marker:** Tum kontroller gectikten sonra `.anil-lib-reader.json` olustur. Basarisiz/yarim kurulumda marker yazma.

## Zorunlu Kalite Kapilari

Asagidakilerin hepsi basarili olmadan gorevi tamamlandi sayma:

- `pnpm install`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`
- desktop ve mobile gorsel kontrol
- `git diff --check` degerlendirmesi

Bir komut repo script adina gore farkliysa esdeger gercek komutu calistir ve raporda belirt. Testleri devre disi birakma, `skip` ile gecme veya hata veren kontrolu kaldirma.

Dev server gerekiyorsa bosta bir port sec, isi bitirdikten sonra calisir halde birak ve kullaniciya tam URL'yi ver. Port doluysa baska port kullan.

## Kabul Kriterleri

- Katalogdaki her makale icin statik, dogrudan acilabilir bir okuma rotasi var.
- Desktop'ta sol sidebar, mobilde erisilebilir drawer var.
- Global okuma sirasi, kategori gruplari ve aktif makale dogru.
- Kullanici son makaleye ve kaldigi konuma refresh sonrasi donuyor.
- Unread/in-progress/completed durumu kalici ve sidebar ile tutarli.
- Onceki/sonraki navigasyonu katalog sirasina bagli.
- UI temiz, modern ve premium; pazarlama sayfasi veya generic dashboard gorunumu yok.
- Uzun baslik, kod, tablo ve dar viewport layout'u bozmuyor.
- localStorage yok/bozuk durumunda uygulama crash olmuyor.
- Typecheck, lint, unit, build ve e2e kontrolleri gercekten geciyor.
- `.anil-lib-reader.json` yalniz basarili tamamlanmadan sonra var.
- Diff yalnizca reader uygulamasi ve zorunlu arac/config dosyalarini iceriyor; makale siniflandirmasini yeniden yapmiyor.

## Son Rapor

Son mesajinda:

- uygulanan mimariyi;
- temel dosya yollarini;
- progress saklama davranisini;
- calistirilan tum kalite komutlarini ve sonuclarini;
- desktop/mobile gorsel dogrulama sonucunu;
- yerel uygulama URL'sini;
- varsa kalan riski

somut olarak yaz. Kanit olmadan basari iddia etme. Engel yoksa uygulama, test ve gorsel dogrulamayi ayni oturumda tamamla.
