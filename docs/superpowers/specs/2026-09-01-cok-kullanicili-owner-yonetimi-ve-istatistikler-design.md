# Çok kullanıcılı erişim, owner-only kullanıcı yönetimi ve istatistikler

- Tarih: 2026-09-01
- Durum: onaylandı, uygulanıyor
- Kapsam: kimlik + oturum, kullanıcı bazlı veri izolasyonu, owner-only kullanıcı yönetimi, owner-only istatistikler, seri odaklı arayüz

## 1. Bugünkü durum (doğrulanmış)

| Konu | Bulgu | Kanıt |
| --- | --- | --- |
| Kimlik doğrulama | Tek site parolası, tuzsuz SHA-256 | `src/lib/auth/password-gate.ts` |
| Oturum | HMAC imzalı cookie, payload yalnızca `{exp}` — **kimlik yok** | `buildSignedSession` |
| Yetki | `READER_WORKSPACE_ID = "owner"` sabiti | `src/lib/auth/require-reader-session.ts:6` |
| Veri izolasyonu | Dört tablonun tamamı `workspace_id` ile anahtarlı (PK dahil) | `src/lib/db/schema.ts` |
| Client state | Origin-global tek anahtar `anil-lib:reader-data:v2` (outbox dahil) | `src/lib/reader-data/storage.ts` |
| İçerik | Üç ayrı katalog: 18 arşiv (`/read`), 38 AI (`/seri`), 24 BOUN (`/boun`); articleId'ler UUID, çakışma yok | `content/*/catalog.json` |
| `currentArticleId` | `readerDataSchema`'da var, **hiçbir mutation payload'ında yok** → sunucuya hiç gitmiyor | `src/lib/reader-data/schema.ts` |
| `last_read_at` | `recordPosition` içinde korunuyor (`previous?.lastReadAt ?? now`); yalnızca `setCurrentArticle` / `setCompleted` tazeliyor | `src/lib/reader-data/use-reader-data.tsx` |
| `sync_mutations` | Hiç budanmıyor (repoda tek `DELETE FROM` yok) → `accepted_at` geçmişi eksiksiz | grep |

Sonuç: sunucu tarafında izolasyon iskeleti **zaten var**; asıl iş sabiti oturumdaki kimliğe bağlamak ve client'ı namespace'lemek.

## 2. Kararlar

| # | Karar | Gerekçe |
| --- | --- | --- |
| D1 | Kimlik imzalı cookie payload'ına girer: `{uid, ws, exp}` | Middleware Edge'de kalır, DB'ye dokunmaz. `ws` kullanıcı başına değişmez → bayatlamaz |
| D2 | Rol cookie'ye **yazılmaz**; owner kontrolü DB'den | "Kırılgan client-side string karşılaştırması" yasağı |
| D3 | Owner'ın `workspace_id`'si `'owner'` kalır | Mevcut dört tablodaki bütün satırların anahtarı bu → **sıfır veri migration'ı** |
| D4 | Owner runtime'da seed edilir (`ON CONFLICT DO NOTHING`), SQL migration'da değil | Migration parolayla ilgili hiçbir şey taşımaz; tekrar çalıştırılabilir |
| D5 | Owner ilk girişte `SITE_PASSWORD_SHA256` ile doğrulanır, sonra scrypt'e yükseltilir | Parola hiçbir yere hardcode edilmez, sonuç modern KDF |
| D6 | localStorage anahtarı `anil-lib:reader-data:v2:<workspaceId>` | Outbox da namespace'e girer → A'nın bekleyen mutasyonu B'ye yazılamaz |
| D7 | Tercihler (`reader-preferences:v1`) cihaz düzeyinde kalır | `layout.tsx` tema script'i boyamadan önce çalışıyor, o anda kimlik yok; namespace'lemek tema sıçraması yaratır. Kişisel veri değil |
| D8 | `/read/*` owner-only arşiv | Kullanıcı kararı |
| D9 | İstatistikler `/yonetim` içinde, ayrı ekran açılmaz | Kullanıcı yönetimi zaten orada; ikinci nav girişi gereksiz |
| D10 | `users.last_login_at` eklenir; IP/UA/geçmiş tablosu **eklenmez** | "Hesap açıldı ama hiç girilmedi mi?" sorusunun başka cevabı yok; `users` yeni tablo olduğu için migration riski sıfır |
| D11 | Highlight metni ve saved-place önizlemesi owner ekranına **çıkmaz**, yalnızca sayı | Kullanıcının kendi seçtiği pasajlar; minimum veri |
| D12 | `root-redirect.tsx` silinmez | Ölü kod ama kullanıcının dosyası; kapsam dışı |
| D13 | Oturum çözen her rota `force-dynamic`, ve `getSessionUser()` **önce** `cookies()` okur | İlk build'de `/`, `/seri`, `/boun`, `/read` statik üretildi: gate env'i olmayan bir build'de erken dönüş `cookies()`'e hiç ulaşmıyordu ve owner kimliği statik HTML'e gömülüyordu. Kanıt: `prerender-manifest.json` artık yalnızca `/_not-found` içeriyor |
| D14 | İstatistik toplaması saf TypeScript fonksiyonunda; SQL yalnızca dar projeksiyonlu `SELECT` | Doğrulama veritabanısız yapılacağı için metrik matematiğinin tamamı test edilebilir olmalı. `count(*) FILTER` gibi test edilemeyen SQL yüzeyi bırakılmadı |
| D15 | `sync_mutations`'tan "son senkron" metriği gösterilmiyor | `MAX(server_updated_at)` ile neredeyse aynı sinyal; iki isim altında aynı şeyi göstermek yanıltıcı olurdu |
| D16 | DB hatası (`users` tablosu yok / erişilemiyor) sayfayı düşürmüyor | Migration uygulanmadan yapılan bir deploy'da `/yonetim` 500 verir ve login herkesi kilitlerdi; ikisi de kontrollü "kullanılamıyor" durumuna düşüyor |

## 3. Veri modeli (additive)

```sql
CREATE TABLE users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username      text NOT NULL UNIQUE,      -- normalize: trim + lowercase
  workspace_id  text NOT NULL UNIQUE,      -- owner: 'owner' | diğerleri: id::text
  role          text NOT NULL,             -- 'owner' | 'user'
  password_hash text NOT NULL,
  hash_scheme   text NOT NULL,             -- 'scrypt' | 'env-sha256'
  last_login_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  created_by    uuid REFERENCES users(id)
);
-- legacy şema yalnızca owner'a açık
ALTER TABLE users ADD CONSTRAINT users_legacy_scheme_owner_only
  CHECK (hash_scheme <> 'env-sha256' OR role = 'owner');
```

Mevcut dört tablo **değişmiyor**. Backfill yok, UPDATE yok.

## 4. Kimlik ve oturum

- `src/lib/auth/password.ts` — `node:crypto` scrypt. Format `scrypt$N$r$p$saltB64$hashB64`, `timingSafeEqual` ile karşılaştırma. Yeni bağımlılık yok.
- `password-gate.ts` — payload `{uid, ws, exp}`. Edge-safe kalır (Web Crypto HMAC).
- `session-user.ts` (`server-only`) — `getSessionUser()`, `requireOwner()`.
- `require-reader-session.ts` — workspace artık cookie'den.
- Login sırası: normalize → DB'de ara → **bulunamazsa da** sahte scrypt doğrulaması çalıştır (enumeration yok) → genel hata.
- `DATABASE_URL` yokken owner env yoluyla girebilir; bugünkü lokal davranış korunur.
- **Kabul edilen davranış değişikliği:** payload şekli değiştiği için mevcut owner oturumu geçersizleşir, bir kez yeniden giriş gerekir. Veri etkilenmez.

## 5. Client izolasyonu

- Anahtar `anil-lib:reader-data:v2:<workspaceId>`; blob içine `workspaceId` alanı (guard — uyuşmazsa blob atılır).
- `ReaderDataProvider` zorunlu `workspaceId` prop'u alır; üç çağrı yeri sunucu sayfasından besler.
- `storage` event dinleyicisi namespace'li anahtarı karşılaştırır.
- Legacy adoption **yalnızca** `workspaceId === 'owner'` ve namespace boşken; standard user eski global anahtarları hiç okumaz.

## 6. Owner-only yönetim ve istatistikler

Dört katmanlı enforcement:

1. `middleware.ts` — yalnızca imza + süre (Edge'de DB yok).
2. Sayfa — `requireOwner()` → `notFound()` (403 değil; rota varlığı sızmaz).
3. Veri katmanı — `src/lib/stats/server/user-stats.ts` (`server-only`) çağıranın oturumunu argüman alır, `role === 'owner'` doğrulamadan **tek SQL bile** çalıştırmaz.
4. Yeni API route yok — RSC + server action.

Gösterilen metrikler ve kanonik kaynakları:

| Metrik | Kaynak |
| --- | --- |
| Kullanıcı adı, rol, oluşturulma, son giriş | `users` |
| AI / BOUN tamamlanan (ayrı) | `reading_progress.completed`, `article_id = ANY($seri)` |
| AI / BOUN yüzde | tamamlanan ÷ katalogdaki yayımlanmış sayı |
| AI / BOUN başlanmış | `NOT completed AND scroll_ratio > STARTED_RATIO` (client ile **tek sabitten**) |
| Yer imi / işaretleme sayısı | `deleted_at IS NULL` filtreli count |
| Son etkinlik | `MAX(server_updated_at)` üç tabloda (sunucu saati) |
| Son okunan / kaldığı makale | `server_updated_at` en büyük satır (kaldığı = en büyük tamamlanmamış) |

**Gösterilmeyecek (veri yok, uydurulmayacak):** okuma süresi, oturum/ziyaret sayısı, streak (`accepted_at` "yazma olan günler"i verir, "okuduğu günler"i değil), `currentArticleId` (sunucuya hiç gitmiyor), son senkron zamanı (bkz. D15).

Sorgular üç dar `SELECT`'ten ibaret: `workspace_id, article_id, completed, scroll_ratio, server_updated_at` (ilerleme) ve `workspace_id, article_id, server_updated_at` (yer imi / işaret). `preview_text` ve `exact_text` **hiç seçilmiyor**. Toplama `lib/stats/aggregate.ts` içindeki saf fonksiyonda; seri ayrımı, yüzde, eşik ve izolasyon oradan gelir ve testleri veritabanı gerektirmez. Detay sorguları `workspace_id = $1` ile tek hesaba kilitli. Yeni indeks gerekmiyor (PK'ler `workspace_id` önekli). Cache/queue/background job yok.

Stale cache: sayfalar `dynamic = "force-dynamic"`; `logout` redirect'ten önce `revalidatePath("/", "layout")`.

## 7. Seri odaklı arayüz

- Görünür küme: standard user = AI ∪ BOUN; owner = AI ∪ BOUN ∪ arşiv.
- Tek global `%` bloğu kaldırılır; her seri kartı kendi ilerlemesini gösterir (seri karışması imkânsız).
- Üç liste (kaldığım yerler / işaretlediklerim / son okunanlar) görünür kümeye filtrelenir.
- `/read/[slug]` owner değilse `notFound()`; yeni owner-only `/read` dizini.
- `validArticleIds()` workspace duyarlı: arşiv id'leri yalnızca owner workspace'i için geçerli.

## 8. Doğrulama

Vitest: scrypt roundtrip + bozuk hash formatları, imzalı oturumun kurcalanması ve **kimliksiz eski cookie'nin reddi**, username normalize/validate, storage namespace + workspace guard + owner-only legacy adoption, `STARTED_RATIO` paylaşımı, istatistik matematiği (seri ayrımı, izolasyon, arşiv hariç tutma, sıfır/boş durumlar), veri katmanı guard'ının **sql client'a hiç dokunmadan** reddetmesi ve sorguların credential/metin seçmemesi.

Playwright: owner girişi (normalize edilmiş kullanıcı adıyla), bilinmeyen kullanıcı adının aynı genel hatayı vermesi, `/yonetim`'in oturumsuz erişilemezliği, owner'ın yönetim + arşiv ekranları, yönetim HTML'inde hash/credential bulunmaması, reader state'in namespace'li anahtara yazılması.

Kapılar: `tsc --noEmit`, `vitest run`, `eslint`, `next build`.

### Doğrulanamayan kısım (kullanıcı kararı: veritabanısız doğrulama)

`DATABASE_URL` olmadan `users` tablosuna dokunan hiçbir uçtan uca senaryo koşulamaz. `@electric-sql/pglite`'ı devDependency olarak eklemek denendi, **kurulamadı**: repodaki `pnpm-workspace.yaml` `packages:` alanı taşımıyor ve kurulu pnpm bu yüzden `pnpm --version` dahil her komutta hata veriyor.

Bu nedenle **kullanıcı oluşturma, ikinci hesapla giriş, iki hesabın izolasyonu ve istatistik tablosunun dolu hâli tarayıcıda doğrulanmadı**; yalnızca birim testleriyle (sahte sql client + saf toplama fonksiyonu) doğrulandı. Doğrulanmak istenirse: bir `DATABASE_URL` verilip `drizzle-kit migrate` çalıştırılması yeterli.
