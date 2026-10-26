---
article_id: article_062b627c-e52d-4b82-aa77-8ceca20616ae
title: "GitHub'da Ekip Akışı: Push, PR, Merge ve Dağıtım Ayrı Kararlardır"
slug: github-ekip-akisi-push-pr-merge-dagitim
category: collaboration-and-delivery
level: advanced
reading_order: 9
summary: "İkisi de yeşil ve onaylı iki PR'ın birlikte main'i kırdığı bir sabahı yerel bir deney deposunda yeniden üretir. PR'ın kontrolünün head dalını değil, base'in o anki ucuyla kurulan deneme birleştirmesini sınadığını ve bu kanıtın base ilerleyince bayatladığını gösterir; sıkı gerekli kontrol ile birleştirme kuyruğunun aynı birleşimi main ilerlemeden nasıl sınadığını, CODEOWNERS'ın onayı değil inceleme isteğini getirdiğini, kontrolü tanımlayan iş akışı dosyasının PR'la birlikte değişebildiğini ve koşulla atlanan bir işin başarılı sayıldığını kurar. Push, PR, inceleme, birleştirme ve dağıtımı ayrı kanıtlar üreten ayrı kararlar olarak tasarlar."
tags:
  - github
  - pull-request
  - kod-sahipligi
  - gerekli-kontrol
  - birlestirme-kuyrugu
content_hash: sha256:73d357afbf76b69de9f2176870a418232a7067f30d4598f2472f7fbcb0e2006b
classification_version: 1
classification_batch: 4
---
## Yeşil iki PR, kırmızı bir main

Kod kaybetmeden geri almayı işlediğimiz yazının kazaları aynı kapıdan girmişti: bir değişiklik incelenmeden paylaşılmış bir dala ulaştı ya da paylaşılmış bir dal sessizce yeniden yazıldı. Güvenli varsayılanlar yazısında incelemesiz yolun kayma doğurduğunu görmüştük; `main`'e doğrudan push, kodun incelemesiz yolu. 22 Ekim akşamı `belge-servisi` deposunu yöneten kişi akışı değiştiriyor: `main` bundan sonra yalnızca PR'la ilerleyecek, her PR'da testler koşacak, fatura kodunu fatura ekibi, içe aktarma kodunu entegrasyon ekibi onaylayacak. Ertesi sabah iki PR açılıyor. Fatura geliştiricisi KDV değişkeninin adını netleştiriyor: `kdv` artık `kdvGosterimi`. XXE yamasını yazan güvenlik geliştiricisi `gelistirici-b`, bu hafta entegrasyon ekibine yardım ediyor ve e-arşiv dışa aktarımının ilk satırını ekliyor; satır KDV gösterimini `kdv` adıyla okuyor. İki PR'ın testi de yeşil, ikisi de onay alıyor; biri 11.00'de, öbürü 11.30'da birleşiyor. 11.31'de `main`'in testi kırmızı.

Olay toplantısında üç gerekçe duyuluyor: "Push ettim, demek ki yayında." "PR yeşildi, birleşince `main` de yeşil olur." "CODEOWNERS'ı koyduk; fatura kodu fatura ekibinin onayı olmadan girmez." Her biri bir kararın kanıtını başka bir karara taşıyor. Push bir dalı uzak depoda ilerletir; PR bir öneridir; kontrol belirli bir commit'i sınar; onay, belirli bir kişinin belirli bir anda gördüğü farka verilir; birleştirme `main`'i taşır; dağıtım bir yapı çıktısını bir ortama koyar. Her biri ayrı bir karar ve her birinin ürettiği kanıt yalnızca kendi konusu hakkında konuşuyor.

Korunacak varlık, `main`'deki her commit'in incelenmiş ve sınanmış olması; sürüm adayları oradan yapılıyor. Saldırganın yeteneği iki parçalı: depoya yazma yetkisi olan herhangi bir hesap, ele geçirilmiş ya da yalnızca aceleci, ve PR açabilen herkes. PR'ın yazarı kendi dalındaki her dosyayı seçer; testleri ve iş akışı dosyasını da. Güven sınırı iki tane. Biri PR'ın iki ucu arasında: yazarın kontrolündeki dal ile ekibin kontrolündeki `main`. Öbürü bir durum sınırı: kontrolün sınadığı commit ile birleştirmeden sonra `main`'de oluşan commit. Kırılan varsayım: "Yeşil işaret, birleştirmeden sonraki `main` hakkında konuşur."

Top 10:2025'in A03'ü bu akışı yazılım tedarik zincirinin parçası sayar. Önleme listesinde kod deposunun korunması, dalların korunması ve CI/CD'de görev ayrılığı var; kategorinin "savunmasız olabileceğin durumlar" listesinde de net bir cümle: hiç kimse kodu tek başına yazıp başka bir insanın gözetimi olmadan üretime kadar taşıyabilmemeli. OWASP'ın CI/CD güvenlik riskleri listesi (lab projesi, v1.0, 2022) ilk riskini, CICD-SEC-1'i, aynı yerden tanımlar: yetersiz akış kontrolü, CI/CD hattındaki bir sisteme erişim kazanan saldırganın, ek onay ya da inceleme isteyen mekanizmalar olmadığı için kötü niyetli kodu ya da yapı çıktısını hattın sonuna tek başına itebilmesidir.

Deney deposu bu kez kısa kuruluyor: geri alma yazısının sonundaki `main`'in dosyaları tek bir commit'te. Ağaç o yazıdaki `main`'inkiyle bayt bayt aynı; geçmiş kısaltıldığı için kimlikler yeni. `ci` klonu, GitHub'ın bu yazıda yaptığı işleri yerelde canlandıracak. Çıktılar Git 2.55.0 (Windows için Git) ve Node.js 24.22.1 ile alındı; genel Git ayarların `GIT_CONFIG_GLOBAL` ile devre dışı:

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.38 ya da sonrası; Node.js 22.18+ ya da 24.3+
# Değişen durum: yalnızca bu klasör: origin.git (bare depo), b, a ve ci klonları · Veri kaybı riski: yok
# Doğrulama: başlangıç commit'inin ağacı, geri alma yazısının sonundaki main'in ağacı: f59542e
cd "$(mktemp -d)"
: > bos.gitconfig                      # kendi Git ayarların deneye karışmasın
export GIT_CONFIG_GLOBAL="$PWD/bos.gitconfig" GIT_CONFIG_NOSYSTEM=1
olarak() {  # olarak <kişi> <tarih> <git komutu…>: yazılan commit'ler her makinede aynı kimliği alsın
  k=$1 t=$2; shift 2
  GIT_AUTHOR_NAME="$k" GIT_AUTHOR_EMAIL="$k@example.test" GIT_AUTHOR_DATE="$t" \
  GIT_COMMITTER_NAME="$k" GIT_COMMITTER_EMAIL="$k@example.test" GIT_COMMITTER_DATE="$t" git "$@"
}
kaydet() { olarak "$1" "$2" commit -q -m "$3"; }
yaz() { f=$1; shift; mkdir -p "$(dirname "$f")"; printf '%s\n' "$@" > "$f"; git add "$f"; }
git init -q --bare -b main --object-format=sha1 origin.git
git clone -q origin.git b 2>/dev/null && cd b
yaz import/xml.ts 'export const parseOptions = {};' 'export const rejectDoctype = true;'
yaz VERSION '1.4.0-rc.2' && yaz docs/fatura.md '# Fatura'
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdv = "oran-bazinda";'
yaz fatura/kdv.test.ts 'test("KDV oran bazında", () => {});'
kaydet gelistirici-b 2026-10-22T14:30:00+03:00 "başlangıç: 22 Ekim öğleden sonra main'deki dosyalar"
git push -q origin main && cd .. && git clone -q origin.git a && git clone -q origin.git ci
git -C b log --format='%h ağaç %t %s' -1
```

```text
5313039 ağaç f59542e başlangıç: 22 Ekim öğleden sonra main'deki dosyalar
```

## PR: Git'in bilmediği bir nesne

PR Git'in değil, GitHub'ın nesnesidir. GitHub "resmen yayında" duyurusunu 10 Nisan 2008'de yaptı; Git'in kendi araçlarında ise bugün de bir PR nesnesi yok. Git'in `git request-pull` komutu yalnızca bir metin üretir: kılavuza göre üst projeye, değişiklikleri onun ağacına çekmesini rica eden, değişiklikleri özetleyen ve nereden çekileceğini söyleyen bir istek. Metni standart çıktıya yazar, hiçbir yere göndermez. İnceleme yorumları, onaylar, kontroller ve birleştirme düğmesi GitHub'daki PR'a aittir; depoyu klonladığında hiçbiri gelmez.

PR'ın iki ucu var. GitHub'ın sözlüğünde **base**, PR birleştirildiğinde değişikliklerin birleşeceği dal; **head**, arayüzdeki adıyla compare, değişiklikleri taşıyan dal. PR'ın "Files changed" sekmesi belgesine göre üç noktalı bir farktır: birleştirme tabanı ile head'in son hâli arasındaki değişiklik. Base ile birleştirme tabanı ayrı şeyler: biri dalın şimdiki ucu, öbürü iki ucun ortak atası; onu ayrışan geçmişleri birleştirdiğimiz yazıda kurmuştuk. Bu yazıda dal için yalnızca "base" diyeceğiz. Birleştirme tabanı burada inceleyicinin ekranını belirliyor: PR'ın getirdiğini gösterir, base'de sonradan olanı göstermez.

Akış bir commit'le kuruluyor. `gelistirici-b`, kural açılmadan önceki son doğrudan push'la PR'larda testi koşturacak iş akışını, **kod sahiplerini (code owners)** ve gerçekten çalışan bir KDV testini `main`'e ekliyor:

```bash
# Nerede: b klonu, main · Önkoşul: kurulum · Değişen durum: main'de yeni bir commit, uzak depoda da
# Veri kaybı riski: yok · Doğrulama: testin çıkış kodu 0
cd b && mkdir -p .github/workflows
cat > .github/workflows/ci.yml <<'EOF'
name: ci
on:
  pull_request:
  merge_group:
  push:
    branches: [main]
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1  # v7.0.1
      - uses: actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1  # v7.1.0
        with:
          node-version: 24
      - run: node --test fatura/*.test.ts
EOF
cat > .github/CODEOWNERS <<'EOF'
*            @ornek-sirket/gelistiriciler
/fatura/     @ornek-sirket/fatura
/import/     @ornek-sirket/entegrasyon
/.github/    @ornek-sirket/platform
EOF
yaz fatura/kdv.test.ts 'import { test } from "node:test";' 'import assert from "node:assert/strict";' 'import { kdv } from "./pdf.ts";' '' 'test("KDV oran bazında", () => {' '  assert.equal(kdv, "oran-bazinda");' '});'
git add .github && kaydet gelistirici-b 2026-10-22T16:00:00+03:00 "akış: PR kontrolü ve kod sahipleri" && git push -q
node --test fatura/*.test.ts > /dev/null; echo "main'de test: $?"
git log --oneline -1
```

```text
main'de test: 0
fd3505d akış: PR kontrolü ve kod sahipleri
```

İş akışı üç olayı dinliyor. `pull_request` PR'ı sınar, `merge_group`'a kuyrukta döneceğiz, `main`'e push ise birleştirmeden sonra `main`'in kendisini sınar; sonuncusu bir birleştirme şartı değil, birleştirmeden sonraki sinyalin kaynağıdır. `permissions: contents: read` iş akışına verilen token'ı okumayla sınırlıyor; bunun ve action'ları tam commit kimliğiyle sabitlemenin ayrıntısı makine kimliklerini ve iş akışı güvenliğini işlerken gelecek. İşin adı `test` ve GitHub'da **gerekli kontrol (required status check)**, yani sonucu birleştirmenin şartı kılınacak kontrol, bu adla seçilecek. CODEOWNERS her satırda bir yol örüntüsüne sahip atar. Dosyanın kendisi bu commit'le doğrudan `main`'e girdi; GitHub inceleme isteklerini PR'ın base'indeki CODEOWNERS'a göre açtığı için dosya ancak bir sonraki PR'da iş görmeye başlıyor. Şekil 1 akışın bütününü ve her girdinin hangi tarafta durduğunu gösteriyor.

![İki şerit, aralarında kesikli dikey çizgi: güven sınırı, head ↔ base. Solda PR yazarının elinde: head. push: head dalı ilerler, uzak depoda yeni bir commit; PR açar: head'den base'e, main'e, öneri, henüz hiçbir şey birleşmedi; vurgulu kutu: iş akışı dosyası da head'de, kontrol PR'daki hâliyle çalışır; onaydan sonra yeni push, onaylanan commit artık uç değil. Sağda base'in tarafında: main, yukarıdan aşağı: karşılaştırma, birleştirme tabanından üç noktalı fark; kontrol: deneme birleştirmesi, base'in o anki ucu + head; inceleme: kod sahibinden istek, onay ancak ayar açıksa zorunlu; birleştirme: main ilerler, güncel dal ya da kuyruk sınar; dağıtım: ayrı karar, ortamın kuralı, ayrı onay. Sınırı geçen oklar: PR açmaktan karşılaştırmaya; vurgulu, iş akışı dosyasından kontrole; kesikli, ayara bağlı, yeni push'tan incelemeye.](assets/iki-taraf-bes-karar.svg "Şekil 1 — Bir değişikliğin main'e yolu: kimin elinde, hangi kanıtla")

Ertesi sabah iki PR açılıyor: #41 (`feature/kdv-gosterimi`) KDV değişkeninin adını değiştiriyor, #42 (`feature/e-arsiv`) e-arşiv satırını ekliyor:

```bash
# Nerede: a klonunda feature/kdv-gosterimi, b klonunda feature/e-arsiv · Önkoşul: önceki blok
# Değişen durum: iki yeni dal, uzak depoda da · Veri kaybı riski: yok · Doğrulama: her PR'ın farkı yalnızca kendi dosyaları
cd ../a && git pull -q && git switch -q -c feature/kdv-gosterimi
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdvGosterimi = "oran-bazinda";'
yaz fatura/kdv.test.ts 'import { test } from "node:test";' 'import assert from "node:assert/strict";' 'import { kdvGosterimi } from "./pdf.ts";' '' 'test("KDV oran bazında", () => {' '  assert.equal(kdvGosterimi, "oran-bazinda");' '});'
kaydet gelistirici-a 2026-10-23T09:30:00+03:00 "fatura: kdv adını kdvGosterimi yap" && git push -q -u origin feature/kdv-gosterimi
cd ../b && git switch -q -c feature/e-arsiv
yaz fatura/e-arsiv.ts 'import { kdv } from "./pdf.ts";' '' 'export const eArsivSatiri = { bicim: "e-arsiv", kdv };'
yaz fatura/e-arsiv.test.ts 'import { test } from "node:test";' 'import assert from "node:assert/strict";' 'import { eArsivSatiri } from "./e-arsiv.ts";' '' 'test("e-arşiv satırı KDV gösterimini taşır", () => {' '  assert.equal(eArsivSatiri.kdv, "oran-bazinda");' '});'
kaydet gelistirici-b 2026-10-23T10:00:00+03:00 "e-arşiv: dışa aktarım satırı" && git push -q -u origin feature/e-arsiv
git fetch -q && git diff --stat origin/main...origin/feature/kdv-gosterimi
git diff --stat origin/main...origin/feature/e-arsiv
```

```text
 fatura/kdv.test.ts | 4 ++--
 fatura/pdf.ts      | 2 +-
 2 files changed, 3 insertions(+), 3 deletions(-)
 fatura/e-arsiv.test.ts | 7 +++++++
 fatura/e-arsiv.ts      | 3 +++
 2 files changed, 10 insertions(+)
```

İki fark da yalnızca kendi dosyalarını gösteriyor. #42'yi inceleyen kişi `e-arsiv.ts`'in `kdv`'yi `pdf.ts`'ten okuduğunu görüyor ve `pdf.ts`'te öyle bir değişken gerçekten var; ekranında #41'den hiçbir iz yok. İki PR da kendi başına doğru.

## Kontrol hangi commit'i sınar?

`pull_request` olayıyla tetiklenen bir iş akışı, `actions/checkout` varsayılanıyla çalıştığında head dalının ucunu sınamaz. GitHub'ın belgesine göre açık ve birleştirilebilir bir PR için `GITHUB_REF` değişkeni `refs/pull/<numara>/merge` ref'ini, `GITHUB_SHA` da o ref'teki son birleştirme commit'ini gösterir ve checkout bu ref'i çeker: testler head dalının ucuna değil, onun base'in o anki ucuyla birleştirilmiş hâline karşı koşar. PR'da birleştirme çatışması varsa iş akışı hiç çalışmaz; checkout'a `ref: ${{ github.event.pull_request.head.sha }}` verilirse yalnızca head sınanır ve bu güvence kaybolur. Bu yazıda o birleştirme commit'ine **deneme birleştirmesi** diyeceğiz; GitHub'ın belgelerindeki adıyla test merge commit. `ci` klonunda aynı birleştirmeyi kurup iş akışının komutunu koşturalım. Kimlikler GitHub'ın üreteceklerle aynı olmaz, sınanan anlık görüntünün içeriği aynıdır:

```bash
# Nerede: ci klonu (GitHub'ın PR için yaptığını canlandırır) · Önkoşul: önceki blok
# Değişen durum: yalnızca ci'de ayrık HEAD'de iki yerel commit · Veri kaybı riski: yok · Doğrulama: iki test de 0
cd ../ci && git fetch -q
deneme() {  # deneme <dal> <saat>: PR'ın deneme birleştirmesini kur, iş akışının komutunu koştur
  git switch -q --detach origin/main
  olarak platform "2026-10-23T$2:00+03:00" merge -q --no-ff --no-edit "origin/$1"
  node --test fatura/*.test.ts > /dev/null; s=$?
  echo "$1: deneme $(git rev-parse --short HEAD) = $(git rev-parse --short HEAD^1) + $(git rev-parse --short HEAD^2), test $s"
}
deneme feature/kdv-gosterimi 09:35
deneme feature/e-arsiv 10:05
```

```text
feature/kdv-gosterimi: deneme d2b0938 = fd3505d + f465c47, test 0
feature/e-arsiv: deneme f7fd59b = fd3505d + 45230c0, test 0
```

İki kontrol de yeşil ve ikisi de doğru. #41'in kontrolü `fd3505d` ile `f465c47`'nin birleşimini, #42'ninki `fd3505d` ile `45230c0`'ın birleşimini sınadı. Top 10'u okuduğumuz yazıda kurduğumuz kural burada da geçerli: kanıt, kapsadığı kadar konuşur. `f7fd59b`'nin yeşili, `main`'in 10.05'teki hâli artı #42 hakkındadır.

Bu kanıt kendiliğinden tazelenmez de. Belgeye göre `pull_request` iş akışı varsayılan olarak PR açıldığında, yeniden açıldığında ve head dalı güncellendiğinde çalışır. Base'in ilerlemesi bu listede yok; bundan çıkardığımız sonuç şu: `main` ilerlediğinde açık PR'ların yeşili, artık uç olmayan bir base'e göre verilmiş hâliyle ekranda durur.

## İki yeşil, bir kırmızı

11.00'de #41, 11.30'da #42 birleşiyor. İkinci birleştirmeden hemen önce Git'e metin düzeyinde bir çatışma olup olmadığını da soralım:

```bash
# Nerede: ci klonu, main · Önkoşul: iki PR onaylandı · Değişen durum: main iki birleştirme commit'iyle ilerler, uzak depoda da
# Veri kaybı riski: yok; ama main'in testi kırılır · Doğrulama: merge-tree çıkışı 0, test çıkışı 1
git switch -q main && git merge -q --ff-only origin/main
olarak platform 2026-10-23T11:00:00+03:00 merge -q --no-ff -m "PR #41: kdv adını kdvGosterimi yap" origin/feature/kdv-gosterimi
git merge-tree --write-tree HEAD origin/feature/e-arsiv > /dev/null; echo "metin çatışması (merge-tree çıkışı): $?"
olarak platform 2026-10-23T11:30:00+03:00 merge -q --no-ff -m "PR #42: e-arşiv dışa aktarım satırı" origin/feature/e-arsiv
git push -q origin main
node --test fatura/*.test.ts 2>&1 | sed -n '/^SyntaxError/p'; echo "main'de test: ${PIPESTATUS[0]}"
git log --oneline --graph -6
```

```text
metin çatışması (merge-tree çıkışı): 0
SyntaxError: The requested module './pdf.ts' does not provide an export named 'kdv'
main'de test: 1
*   e97fb2e PR #42: e-arşiv dışa aktarım satırı
|\
| * 45230c0 e-arşiv: dışa aktarım satırı
* |   6b97c42 PR #41: kdv adını kdvGosterimi yap
|\ \
| |/
|/|
| * f465c47 fatura: kdv adını kdvGosterimi yap
|/
* fd3505d akış: PR kontrolü ve kod sahipleri
* 5313039 başlangıç: 22 Ekim öğleden sonra main'deki dosyalar
```

`git merge-tree` 0 döndü: Git açısından iki PR'ın hiçbir satırı çakışmıyor. Ayrışan geçmişleri birleştirdiğimiz yazıda adını koyduğumuz anlamsal çatışma tam olarak bu: iki ayrı doğru değişiklik, birlikte yanlış. `main`'in yeni ucu `e97fb2e`, `6b97c42` ile `45230c0`'ın birleşimi ve bu anlık görüntüyü hiçbir PR kontrolü görmedi; onu ilk sınayan, iş akışının `main`'e push'ta koşan çalıştırması oldu ve kırmızı döndü. Şekil 2 iki birleşimi yan yana koyuyor.

![Uzak depodaki (origin) commit grafiği; oklar Git'in yönünde: her commit ebeveynini gösterir, zaman soldan sağa. fd3505d, akış, 10.05'te main. Üstte f465c47, #41 head, dal feature/kdv-gosterimi; altta 45230c0, #42 head, dal feature/e-arsiv; ikisinin de ebeveyni fd3505d. 6b97c42, PR #41, 11.00'de main, ebeveynleri fd3505d ve f465c47. Vurgulu e97fb2e, PR #42, 11.30, test 1, ebeveynleri 6b97c42 ve 45230c0; main dalı onu gösteriyor. Notlar: #42'nin kontrolü, 10.05: fd3505d + 45230c0 → test 0; main, 11.30: 6b97c42 + 45230c0 → test 1; bu birleşimi hiçbir PR kontrolü görmedi.](assets/yesil-kontrol-baska-birlesim.svg "Şekil 2 — Yeşil kontrol başka bir birleşimi sınadı")

GitHub'da kontrolün sonucunu birleştirmenin şartı yapan şey bir **dal koruması (branch protection)** kuralıdır. Aynı ayarlar ruleset'lerle, yani depoya ya da organizasyona yazılan adlandırılmış kural kümeleriyle de verilebilir; kuralın kurulması, katmanlanması ve kimin muaf tutulacağı kuralların platforma yazılmasını işlerken ele alınacak. Burada ayarın anlamı önemli. "Require status checks to pass before merging" seçildiğinde adı verilen kontroller gerekli kontrol olur: hepsi başarılı olmadan PR birleşmez. GitHub'ın sorun giderme sayfası iki kural ekler: gerekli kontrol PR'ın en son commit'inde başarılı olmalıdır, önceki commit'lerin sonucu sayılmaz; deneme birleştirmesinin bir durumu varsa geçmesi gereken commit odur. İki kural da head'in güncelliğini sorar, base'in güncelliğini sormaz. Belge gerekli kontrolü iki biçimde anlatır. Sıkı biçimde, yani "Require branches to be up to date before merging" seçiliyken, dal birleştirmeden önce base'le güncel olmak zorundadır. Gevşek biçimde zorunda değildir ve belgenin kendi uyarısı bu yazının olayını tarif eder: base'le uyumsuz değişiklikler varsa kontroller birleştirmeden sonra başarısız olabilir. Ekip gevşek biçimi seçmişti.

## Birleşimi önceden sınamak: güncel dal ya da kuyruk

Çözümün iki biçimi var ve ikisi de aynı birleşimi `main` ilerlemeden önce sınar. Sıkı gerekli kontrolde #42'nin yazarı dalını 11.00'deki `main`'le günceller, birleştirme yazısındaki "Update branch" düğmesiyle; kontrol yeni deneme birleştirmesini sınar ve kırmızı döner. **Birleştirme kuyruğu (merge queue)** aynı güvenceyi yazarın eli değmeden verir. Belgesine göre kuyruk, bir PR'ın değişiklikleri base'in son hâline ve kuyrukta önündeki PR'lara eklendiğinde de bütün gerekli kontrollerin geçmesini şart koşar. Bunun için her PR'a, base'in son hâlini, öndeki PR'ları ve bu PR'ı birlikte taşıyan, `gh-readonly-queue/<base>` önekli geçici bir dal açar. GitHub bu birleşime birleştirme grubu (merge group) der; `merge_group` olayı adını buradan alır. Gerekli kontroller bu dallarda koşar; kırmızı dönen PR kuyruktan çıkarılır ve arkasındaki gruplar onsuz yeniden kurulur. İki yolu `ci`'de, uzak depoya dokunmadan canlandıralım:

```bash
# Nerede: ci klonu, ayrık HEAD · Önkoşul: önceki blok · Değişen durum: yalnızca ci'de yerel commit'ler; uzak depo değişmez
# Veri kaybı riski: yok · Doğrulama: iki yol da #42'yi main'e girmeden kırmızı görür
git switch -q --detach origin/feature/e-arsiv            # güncel dal kuralı: #42'nin dalı 11.00'deki main'le güncellenir
olarak platform 2026-10-23T11:05:00+03:00 merge -q --no-edit 6b97c42
node --test fatura/*.test.ts > /dev/null; s=$?; echo "güncellenmiş #42 $(git rev-parse --short HEAD): test $s"
git switch -q --detach fd3505d                           # kuyruk: iki PR de 10.05'teki main'in üstüne sıraya girer
olarak platform 2026-10-23T11:00:00+03:00 merge -q --no-ff -m "kuyruk grubu: #41" origin/feature/kdv-gosterimi
node --test fatura/*.test.ts > /dev/null; s=$?; echo "grup 1 $(git rev-parse --short HEAD) = main + #41: test $s"
olarak platform 2026-10-23T11:00:00+03:00 merge -q --no-ff -m "kuyruk grubu: #41 + #42" origin/feature/e-arsiv
node --test fatura/*.test.ts > /dev/null; s=$?; echo "grup 2 $(git rev-parse --short HEAD) = grup 1 + #42: test $s"
git switch -q main
```

```text
güncellenmiş #42 b92009d: test 1
grup 1 0751329 = main + #41: test 0
grup 2 1e028ad = grup 1 + #42: test 1
```

Güncellenmiş dal da kuyruğun ikinci grubu da #42'yi `main`'e girmeden kırmızı gördü. Bedelleri farklı. Sıkı kontrol her birleştirmeden sonra açık PR'ların hepsini yeniden güncellemeye ve yeniden sınamaya zorlar; yoğun bir depoda yazarlar sırayla birbirini bekler. Kuyruk bu sırayı platforma bırakır ama bir yapılandırma şartı getirir: iş akışı `merge_group` olayını dinlemelidir. Dinlemezse belgeye göre kuyruğa giren PR için gerekli kontrol hiç raporlanmaz ve birleştirme başarısız olur; bizim iş akışımızın bu olayı da dinlemesinin nedeni bu. Kuyruğun "Only merge non-failing pull requests" ayarı kapalıysa, kendi grubunda kırmızı dönen bir PR, onu da içeren sonraki bir grup yeşil olduğu sürece yine birleşebilir.

Kuyruğun koşulları dar. Ekim 2026 itibarıyla birleştirme kuyruğu bir organizasyona ait herkese açık depolarda ve GitHub Enterprise Cloud kullanan organizasyonların özel depolarında var; GitHub Enterprise Server'da organizasyona ait her depoda. Kişisel hesaba ait depolarda ve GitHub Team'deki özel depolarda yok. Kuyruğu depoda yönetici (admin) yetkisi olan kişi yapılandırır, PR'ı yazma yetkisi olan kişi kuyruğa ekler; dal koruması kuralının örüntüsü joker karakter içeriyorsa kuyruk açılamaz.

12.10'da düzeltme de aynı akıştan geçiyor:

```bash
# Nerede: b klonunda yeni dal, sonra ci klonu, main · Önkoşul: önceki bloklar
# Değişen durum: uzak depoda yeni dal ve main'de bir birleştirme commit'i · Veri kaybı riski: yok · Doğrulama: #43'te ağaçlar eşit
cd ../b && git switch -q main && git pull -q && git switch -q -c duzeltme/e-arsiv-kdv
yaz fatura/e-arsiv.ts 'import { kdvGosterimi } from "./pdf.ts";' '' 'export const eArsivSatiri = { bicim: "e-arsiv", kdv: kdvGosterimi };'
kaydet gelistirici-b 2026-10-23T12:10:00+03:00 "e-arşiv: kdvGosterimi'ni kullan" && git push -q -u origin duzeltme/e-arsiv-kdv
cd ../ci && git fetch -q && deneme duzeltme/e-arsiv-kdv 12:15 && sinanan=$(git rev-parse HEAD)
git switch -q main && git merge -q --ff-only origin/main
olarak platform 2026-10-23T12:20:00+03:00 merge -q --no-ff -m "PR #43: e-arşiv: kdvGosterimi'ni kullan" origin/duzeltme/e-arsiv-kdv
git push -q origin main && node --test fatura/*.test.ts > /dev/null; echo "main'de test: $?"
echo "#42: main'in ağacı $(git rev-parse --short 'e97fb2e^{tree}'), kontrolün sınadığı $(git rev-parse --short 'f7fd59b^{tree}')"
echo "#43: main'in ağacı $(git rev-parse --short 'HEAD^{tree}'), kontrolün sınadığı $(git rev-parse --short "$sinanan^{tree}")"
```

```text
duzeltme/e-arsiv-kdv: deneme ac3c2d6 = e97fb2e + b8259ca, test 0
main'de test: 0
#42: main'in ağacı baeb685, kontrolün sınadığı 919ba76
#43: main'in ağacı fbeb0e5, kontrolün sınadığı fbeb0e5
```

Son iki satır bayat kontrolün Git'le kanıtı. #42 birleştikten sonra `main`'in ağacı, #42'nin kontrolünün sınadığı ağaçtan farklıydı. #43'te ikisi aynı: bu kez kontrolün sınadığı anlık görüntü, birleştirmeden sonra `main`'de oluşanın aynısıydı, çünkü #43 açılıp birleşene kadar `main` kıpırdamadı. Gevşek kuralda bu bir şanstı; sıkı kontrol ya da kuyruk onu şart yapar.

## Zorunlu inceleme ve kod sahipliği

Kontrol bir makinenin kanıtıdır, inceleme bir insanın. GitHub'da inceleme de dal korumasının ayarlarıyla zorunlu olur ve her ayar ayrı bir boşluğu kapatır. "Require approvals" birleştirmeden önce belirli sayıda onay ister; belgeye göre PR'ın yazarı kendi PR'ını onaylayamaz ve yalnızca depoda yazma yetkisi olanların onayı sayılır. "Dismiss stale pull request approvals when new commits are pushed" onaydan sonra gelen yeni commit'le onayı düşürür; belgeye göre birleştirme tabanı yeni değişiklik getirdiğinde de. "Require approval of the most recent reviewable push" son push'u, onu yapan kişiden başka biri onaylamadıkça birleştirmeye izin vermez. Belge bu son ayarı, çok incelemeli PR'larda bütün eski onayları düşürmeden son değişikliği başka bir göze göstermenin uzlaşması olarak sunar; onaylanmış bir PR'a sonradan onaysız içerik eklenmesinden kaygı duyuluyorsa eski onayları düşürmenin daha güvenli olduğunu da yazar. İkisi birlikte açıldığında bedel her yeni push'ta yeniden onaydır; kazanç, PR'a sonradan push eden birinin kendi değişikliğini kendisinin onaylayamamasıdır.

Kod sahibi, bir yoldaki değişiklik için incelemesi istenen kişi ya da takımdır ve depodaki CODEOWNERS dosyasıyla atanır. GitHub dosyayı sırasıyla `.github/`, kök ve `docs/` dizininde arar ve ilk bulduğunu kullanır; PR'lar dosyanın base'deki hâline bakar. Sahip olarak yazılan kişinin depoda yazma yetkisi olmalı; takım görünür olmalı ve yazma yetkisi takımın kendisine verilmiş olmalı, üyelerin tek tek yetkisi yetmez. Var olmayan ya da yetkisi yetmeyen bir sahip yazılırsa sahip atanmaz; geçersiz söz dizimli satır atlanır; 3 MB'tan büyük dosya hiç yüklenmez. Üçünün ortak sonucu, bir örüntünün PR'da hiçbir uyarı çıkmadan sahipsiz kalması; söz dizimi hatalarını ancak dosyanın GitHub'daki sayfasına ya da hata listesine bakan görür.

Sahiplik iki ayrı şey yapar ve CODEOWNERS'a dair gerekçe ikisini karıştırıyor. Dosya, sahibin yoluna dokunan PR'da kod sahibinden otomatik inceleme ister; taslak PR'larda istemez. Onayı zorunlu kılan ise dosya değil, dal korumasındaki "Require review from Code Owners" ayarıdır ve ayar açıkken satırdaki sahiplerden herhangi birinin onayı yeter. Ayar kapalıyken fatura ekibi yalnızca bir bildirim alır; PR, ekipten kimse onaylamadan da birleşebilir. NIST'in SSDF v1.1'inde PS.1.1 kodun her biçiminin yalnızca yetkili kişi ve araçların erişebileceği biçimde saklanmasını ister; uygulama örneklerinden biri, kod sahibinin başkalarının yaptığı bütün değişiklikleri inceleyip onaylamasıdır. Örnek bir inceleme isteğini değil onayı anlatır; bizim eşlememizle GitHub'da bunun karşılığı dosya değil, dal korumasındaki ayar.

> **Teşhis et:** Fatura ekibinin lideri, "güvenlik duvarı kuralları gibi: önce özel satırlar, en genel kural en altta yedek olarak dursun" diyerek CODEOWNERS'ı yeniden sıralayan bir PR açıyor; platform ekibinden biri "yalnız satırların yeri değişmiş" diye onaylıyor. Dal korumasında "Require review from Code Owners" açık. Bir hafta sonra `fatura/pdf.ts`'e dokunan bir PR, fatura ekibinden kimse bakmadan birleşiyor. Neden?

```text
/fatura/     @ornek-sirket/fatura
/import/     @ornek-sirket/entegrasyon
/.github/    @ornek-sirket/platform
*            @ornek-sirket/gelistiriciler
```

Liderin modeli "ilk eşleşen kazanır"; GitHub'ın belgesine göre ise CODEOWNERS'ta eşleşen son örüntü önceliklidir ve belgenin kendi örneği de genel `*` satırını en üste koyar. Yeni sırada `fatura/pdf.ts`'e eşleşen son satır `*`: dosyanın kod sahibi artık `@ornek-sirket/gelistiriciler` ve o takımdan herhangi birinin onayı "kod sahibi onayı" şartını karşılıyor. Aynı satır `.github/`'ı da genel takıma verdi; iş akışını ve CODEOWNERS'ın kendisini değiştiren PR'lar artık platform ekibine de gitmiyor. Savunma aslında yerindeydi: sıralama PR'ı base'deki eski dosyaya göre platform ekibinin onayına düştü, ama onay veren kişi satırların değil sıranın anlam taşıdığını bilmiyordu. İyi bir cevap kuralı söyler (son eşleşen örüntü kazanır), sonucu kaybolan sahiplik olarak adlandırır, genel satırı en üste alır ve CODEOWNERS'ın kendisinin sahibinin bu kuralı bilen bir ekip olmasını ister; belge de dosyanın kendisine sahip atanmasını önerir. Zayıf cevap "satırlar aynı, sahipler değişmedi" der; sahiplik satırlarda değil, sırada.

## Kontrolü kim yazıyor?

Bu yazının kontrolü bir iş akışı dosyası ve o dosya depoda, PR'ın değiştirebildiği yerde duruyor. GitHub'ın belgesine göre her iş akışı çalıştırması, olayın ilişkili olduğu commit'te bulunan iş akışı sürümünü kullanır; `pull_request` için bu commit deneme birleştirmesidir. Yani PR, kendisini yargılayacak kontrolün kendi değiştirdiği hâlini de getirir. Tehdit modelleme yazısında sınırın yerini iki soruyla bulmuştuk: veriyi kim seçti ve veri hangi sürece varıyor? İş akışı dosyasını PR'ın yazarı seçti ve dosya, birleştirmeye izin veren karara varıyor. Kökenin değiştiği ve varılan sürecin yetkisinin büyüdüğü yer `.github/` dizini.

> **Teşhis et:** Bir PR fatura koduna ek olarak iş akışına tek bir satır ekliyor; açıklamada "acil düzeltmeler uzun testi beklemesin" yazıyor. PR'ın dalı `acil/kdv-yuvarlama` ve gerekli kontrol `test` yeşil görünüyor. Bu yeşil neyi kanıtlıyor?

```yaml
jobs:
  test:
    if: ${{ !startsWith(github.head_ref, 'acil/') }}
    runs-on: ubuntu-latest
```

Hiçbir şeyi; hiçbir test koşmadı. GitHub'ın belgelerine göre koşul yüzünden atlanan bir iş "Success" bildirir ve gerekli bir kontrol olsa bile birleştirmeyi engellemez. Sorun giderme sayfasındaki tablo karşıt durumu da yazar: dal ya da yol filtresi yüzünden hiç başlamayan bir iş akışının kontrolleri "Pending"de kalır ve birleştirmeyi engeller. Aynı niyetle yazılmış iki atlamadan biri fail-closed, öbürü fail-open sonuç veriyor; hata yolunu incelediğimiz yazıdaki ayrım burada bir YAML satırında. Satır üstelik PR'ın kendi deneme birleştirmesinde ilk kez çalıştı: PR birleşirse, kuyruksuz bir depoda dalını `acil/` diye adlandıran herkes testi atlar. Kuyrukta, yani `merge_group` çalıştırmasında `github.head_ref` boş olduğundan bu satır testi atlatmaz; ama koşulu olay adına göre yazan başka bir satır atlatırdı. İyi bir cevap üç şey söyler: atlanan iş başarı sayılır; kontrolün tanımı PR'la birlikte değişebilir ve bu PR onu ilk kez kendi lehine kullandı; savunma kontrolün tanımını da incelemenin konusu yapmaktır, yani `.github/`'ın platform ekibine ait olması ve kod sahibi onayının zorunlu tutulması. Zayıf cevap "kontrol yeşil, testler geçti" der ya da yalnızca bu satırı geri alır.

Belge bir boşluğu daha adlandırır: depoda yazma yetkisi olan her kişi ya da entegrasyon herhangi bir kontrolün durumunu ayarlayabilir. Gerekli kontrol eklenirken o kontrolü yakın zamanda bildirmiş bir GitHub App beklenen kaynak olarak seçilirse, başka biri tarafından ayarlanan durum birleştirmeye izin vermez. Kaynağı sabitlemek sahte bir "başarılı" durumunu kapatır; PR'ın iş akışını değiştirmesini kapatmaz. İş akışlarının güvenliği makine kimliklerini işlerken ayrıntılanacak.

## Dal stratejisi teslim biçimine göre seçilir

Bu akıştaki dalların sayısı ve ömrü ayrı bir karar. DORA'nın **trunk tabanlı geliştirme (trunk-based development)** tanımında her geliştirici işini küçük parçalara böler ve günde en az bir kez ana dala birleştirir; dallar genellikle birkaç saatten uzun yaşamaz. Sayfaya göre 2016 ve 2017 verilerinin analizi, üç ya da daha az etkin dal tutan, günde en az bir kez birleştiren ve kod dondurmayan ekiplerin teslim ve işletim performansının daha yüksek olduğunu gösteriyor. GitHub'ın kendi tarifi olan GitHub flow aynı şekli altı adımla anlatır: dal aç, değiştir, PR aç, yorumları karşıla, birleştir, dalı sil. Bunlar birer görüş ve araştırma özeti, standart değil; bu yazının olayı hem neden işe yaradıklarını hem sınırlarını gösteriyor. PR ne kadar kısa yaşarsa deneme birleştirmesindeki base ile birleştirme anındaki `main` arasındaki fark o kadar küçük kalır; ama #41 ile #42 arasında yalnızca yarım saat vardı ve fark sıfır değildi. Kısa ömür riski küçültür, birleşimi sınamanın yerini tutmaz.

GitFlow'un yazarı Vincent Driessen, 2010 tarihli modeline 2020'de bir not ekledi: model bir tür standart, ne yazık ki bir dogma gibi görülmeye başlamıştı. Sürekli teslim edilen yazılım için, örneğin web uygulamalarında, GitHub flow gibi çok daha basit bir akışı önerir; açıkça sürümlenen ya da sahada birden çok sürümü desteklenen yazılımda GitFlow'un hâlâ uygun olabileceğini söyler. `belge-servisi` sahada tek sürümü desteklenen, sık sürüm çıkaran bir servis: kısa ömürlü dal, PR ve `main` yeter. Yayımlanmış bir sürüme, `main`'e henüz yayımlanmamış iş girdikten sonra düzeltme gerektiğinde kısa ömürlü bir **sürüm dalı (release branch)** devreye girer; ayrıntısı sürüm ve dağıtım konusunun içeriği.

## Dağıtım da ayrı bir karardır

Birleştirme `main`'i taşır, hiçbir şeyi dağıtmaz. GitHub Actions'ta dağıtım bir **ortama (environment)** bağlanır ve ortamın **dağıtım koruma kuralları (deployment protection rules)**, belgeye göre ortama başvuran bir iş çalıştırıcıya gönderilmeden önce geçilmesi gereken kapılardır: zorunlu incelemeciler (en çok altı kişi ya da takım; birinin onayı yeter ve istenirse dağıtımı başlatan kişi onaylayamaz), bekleme süresi ve o ortama hangi dalların ya da etiketlerin dağıtılabileceği. Ortamı organizasyon deposunda yönetici yetkisi olan kişi yapılandırır. Ekim 2026 itibarıyla GitHub Free, Pro ve Team'de zorunlu incelemeci ve bekleme süresi yalnızca herkese açık depolarda var; özel ve iç depolarda GitHub Enterprise gerekir. Ortamlar ve dal ya da etiket kısıtı özel depolarda en az Pro ya da Team ister; GitHub Free'de özel depolarda ortam yok. Yöneticiler varsayılan olarak bu kurallardan muaf tutulur; muafiyeti kaldırmak da Free, Pro ve Team'de yalnızca herkese açık depolarda mümkün.

Bu akış bile bazı yolları açık bırakıyor. Geri alma yazısında tanımladığımız dolaylı birleştirme burada da geçerli: bir PR'ın commit'leri base'e başka bir yoldan ulaşırsa GitHub PR'ı, koruma koşulları sağlanmamış olsa bile birleşmiş gösterir. Dal korumasının kısıtları varsayılan olarak depo yöneticilerine uygulanmaz; yönetici onaysız ya da kırmızı bir PR'ı birleştirebilir, kuyruğu beklemeden de birleştirebilir. Kontrol yalnızca yazılmış testler kadar konuşur; kuyruk birleşimi sınar, birleşimin testi olmayan davranışını sınamaz. İncelemenin kalitesini de kural değil kültür belirler: zorunlu onay bir insanın baktığını kanıtlar, ne gördüğünü kanıtlamaz.

> **Kendi organizasyonunda:** *Salt okunur denetim:* `gh api -X GET repos/<organizasyon>/<depo>/codeowners/errors` CODEOWNERS'taki söz dizimi hatalarını listeler; `ref` verilmezse varsayılan dalın dosyasına, `-f ref=<dal>` ile başka bir dalınkine bakar. Sıralama yüzünden sahipsiz kalan yolları bu liste göstermez; onları dosyayı okuyan biri görür. `gh api repos/<organizasyon>/<depo>/rules/branches/main` dala uygulanan etkin ruleset kurallarını, `gh api repos/<organizasyon>/<depo>/branches/main --jq '.protected, .protection.required_status_checks'` dalın korunup korunmadığını ve gerekli kontrollerini döndürür; üçü de okuma izniyle çalışır ve hiçbir şeyi değiştirmez. Klasik dal korumasının bütün ayarlarını döndüren `.../branches/main/protection` yönetim (Administration) okuma izni ister. *Öneri:* Önce `main`'e doğrudan push eden betikleri ve bot hesaplarını listele, kararı ekibe duyur. Sonra `.github/` dizini ve CODEOWNERS'ın kendisi için bir sahip; dal korumasında en az bir onay, kod sahibi onayı, yeni push'ta onayın düşmesi ve son push'un başka biri tarafından onaylanması; gerekli kontrolde beklenen kaynağın sabitlenmesi; plan izin veriyorsa birleştirme kuyruğu ve iş akışında `merge_group`, vermiyorsa sıkı gerekli kontrol. Ekim 2026 itibarıyla dal koruması ve kod sahipleri herkese açık depolarda GitHub Free ile, herkese açık ve özel depolarda Pro, Team, Enterprise Cloud ve Enterprise Server ile kullanılabiliyor; dal koruması kuralını ve ruleset'i depoda Admin rolü yönetir. Değişiklik PR birleştiren herkesi ve listelediğin otomasyonları etkiler. Geri dönüş yolu ayarın eski hâline alınmasıdır. Kuralı ruleset olarak yazmak, katmanlamak ve muafiyet listesini daraltmak kuralların platforma yazılmasının konusu.

## Karar kartı

- **Varsayım:** "Push ettim, demek ki yayında; PR yeşilse birleşince `main` de yeşil olur; CODEOWNERS tek başına onay zorunluluğu getirir."
- **Güven sınırı:** PR'ın head'i, yani yazarın kontrolündeki kod, test ve iş akışı dosyası ile base'i, yani ekibin kontrolündeki `main`, CODEOWNERS'ın geçerli hâli ve kural arasında; ayrıca kontrolün sınadığı birleşim ile birleştirmeden sonra `main`'de oluşan commit arasındaki durum sınırı.
- **Karar:** `main` yalnızca PR'la ilerler. Gerekli kontrol PR'ın base'in son hâliyle birleşimini sınar: planın izin verdiği yerde birleştirme kuyruğu ve iş akışında `merge_group`, öteki yerlerde sıkı gerekli kontrol; kontrolün beklenen kaynağı sabitlenir. En az bir onay, kod sahibi onayı, yeni push'ta onayın düşmesi ve son push'u yapandan başka birinin onayı zorunludur; `.github/` ve CODEOWNERS'ın kendisi platform ekibine aittir. Dağıtım ayrı bir ortam kuralıyla onaylanır.
- **Somut risk:** Ayrı ayrı yeşil iki PR'ın birlikte `main`'i kırması; PR'ın kendi kontrolünü zayıflatması, örneğin koşulla atlanan işin başarılı sayılması; sıralama, yetki ya da yazım hatası yüzünden bir yolun PR'da uyarı vermeden sahipsiz kalması; onaydan sonra eklenen commit'in onaylı görünmesi.
- **Doğrulanabilir özellik:** CICD-SEC-1'in (OWASP Top 10 CI/CD Security Risks) eksikliğini risk saydığı akış kontrolü ve SSDF v1.1 PS.1.1'in 4. örneği: `main`'e giren her değişiklik, yazarından başka birinin ve değişen yolun kod sahibinin onayından geçmiştir. Buna bizim eklediğimiz koşul: gerekli kontrol PR'ın birleştirme anındaki `main`'le birleşimini sınamıştır. Git'le karşılığı: birleştirmeden sonra `main`'in ağacı, kontrolün başarılı olduğu commit'in ağacıyla aynıdır. Deney deposunda #43'te aynı (`fbeb0e5`), #42'de değil (`baeb685` ile `919ba76`).
- **Negatif test:** Deney deposunda iki deneme birleştirmesi 0 dönerken `main` + #41 + #42 birleşimi 1 döner; sıkı kontrolde güncellenmiş #42 ve kuyrukta ikinci grup da 1 döner. Koruma etkin bir test deposunda onaysız PR, kod sahibi onayı olmayan `.github/` değişikliği ve `merge_group` dinlemeyen iş akışıyla kuyruğa giren PR birleşemez.
- **Üretimde sinyal:** `main`'e push'ta koşan testin birleştirmeden sonra kırmızıya dönmesi; kuyruktan çıkarılan PR'lar ve nedenleri; `.github/` dizinine dokunan PR'lar; yöneticilerin muafiyetle yaptığı birleştirmeler ve dolaylı birleşmiş görünen PR'lar; CODEOWNERS hata listesinin boş olmaması.
- **Kalan risk:** Yönetici muafiyeti ve dolaylı birleştirme korumanın dışından geçer. Yeşil kuyruk yalnızca var olan testlerin kapsadığı kadar, zorunlu onay yalnızca birinin baktığı kadar kanıttır. Kuyruk her planda yoktur; çatışmalı PR'da deneme birleştirmesi hiç kurulmaz.

### Sırada ne var

`main` artık yalnızca sınanmış ve onaylanmış birleşimlerle ilerliyor. Ama `main` bir sürüm değil: ondan bir yapı çıktısı üretilir, bir ada bağlanır, bir ortama dağıtılır ve bir gün geri alınması gerekir. Sıradaki yazı bu yolu izliyor: bir etiket bir commit'i nasıl adlandırır ve o ad ne zaman değişebilir, GitHub Release ve değişmez sürüm neyi kilitler, SemVer neye söz verir ve başarısız bir dağıtımdan geri dönmek neden bir revert commit'i değildir?

## Kaynakça

- Wanstrath, C. *We Launched*. The GitHub Blog, 10 Nisan 2008. Erişim: 26 Ekim 2026. [Bağlantı](https://github.blog/news-insights/we-launched/)
- Git projesi. *git-request-pull Documentation* (son güncelleme: Git 2.56.0). Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-request-pull)
- Git projesi. *git-merge-tree Documentation* (son güncelleme: Git 2.52.0) — `--write-tree`, çıkış kodları. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge-tree)
- GitHub Docs. *About pull requests*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/get-started/about-pull-requests)
- GitHub Docs. *GitHub glossary* — base branch, head branch, compare branch. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/get-started/learning-about-github/github-glossary)
- GitHub Docs. *Branches* — Comparing branches in pull requests, three-dot diff. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/branches)
- GitHub Docs. *Pull request merges* — Indirect merges. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/pull-request-merges)
- GitHub Docs. *Events that trigger workflows* — `pull_request`, `merge_group`. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- GitHub Docs. *Workflows* — iş akışı sürümünün olayın commit'inden alınması. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)
- GitHub Docs. *Status checks*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/status-checks)
- GitHub Docs. *Troubleshooting required status checks* — en son commit, deneme birleştirmesi, atlanan işler. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/troubleshooting-required-status-checks)
- GitHub Docs. *About protected branches* — required reviews, required status checks (strict, loose), beklenen kaynak, yöneticiler. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- GitHub Docs. *Approving a pull request with required reviews*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
- GitHub Docs. *About code owners*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- GitHub Docs. *Managing a merge queue*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- GitHub Docs (GitHub Enterprise Server 3.22). *Managing a merge queue* — plan koşulu. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/enterprise-server@3.22/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue)
- GitHub Docs. *Merging a pull request with a merge queue*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/merging-a-pull-request-with-a-merge-queue)
- GitHub Docs. *GitHub flow*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/get-started/using-github/github-flow)
- GitHub Docs. *Deployment environments* — koruma kurallarının iş çalıştırıcıya gönderilmeden önce geçilmesi. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments)
- GitHub Docs. *Deployments and environments* — deployment protection rules. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
- GitHub Docs. *Managing environments for deployment* — plan koşulu, yapılandırma yetkisi. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments)
- GitHub Docs. *Repository roles for an organization*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- GitHub Docs. *REST API endpoints for repositories* — List CODEOWNERS errors; *REST API endpoints for rules* — Get rules for a branch; *REST API endpoints for branches* — Get a branch. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/rest/repos/repos#list-codeowners-errors)
- OWASP Top 10 ekibi. *A03:2025 Software Supply Chain Failures*. OWASP Top 10:2025. Erişim: 26 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/)
- OWASP. *CICD-SEC-1: Insufficient Flow Control Mechanisms*. OWASP Top 10 CI/CD Security Risks (lab projesi, v1.0, 2022). Erişim: 26 Ekim 2026. [Bağlantı](https://owasp.github.io/www-project-top-10-ci-cd-security-risks/CICD-SEC-01-Insufficient-Flow-Control-Mechanisms)
- National Institute of Standards and Technology (2022). *SP 800-218: Secure Software Development Framework (SSDF) Version 1.1* — PS.1.1. [Bağlantı](https://csrc.nist.gov/pubs/sp/800/218/final)
- DORA. *Capabilities: Trunk-based development*. Erişim: 26 Ekim 2026. [Bağlantı](https://dora.dev/capabilities/trunk-based-development/)
- Driessen, V. *A successful Git branching model* (5 Ocak 2010; "Note of reflection", 5 Mart 2020). Erişim: 26 Ekim 2026. [Bağlantı](https://nvie.com/posts/a-successful-git-branching-model/)
