---
article_id: article_2bb514ae-50bc-4555-b83e-0855a87cf1ed
title: "Sürüm ve Dağıtım: Etiket, GitHub Release ve Geri Dönüş Yolu"
slug: surum-ve-dagitim-etiket-github-release
category: collaboration-and-delivery
level: advanced
reading_order: 10
summary: "Bir sürüm gününün üç kazasını aynı deney deposunda izler: başarısız dağıtımdan sonra geri dönüş, sürüm numarası aynı kalsın diye taşınan etiket ve üretimdeki sürüme gereken acil düzeltme. Hafif ve açıklamalı etiketi, git push'un etiketleri neden göndermediğini, taşınan etiketin klonlarda neden sessizce ayrıştığını, GitHub Release ile değişmez sürümün neyi kilitlediğini ve SemVer'in bir güvence değil bir beyan olduğunu gösterir. Geri dönüşü revert'ten ayırır; taşınan etiketi kirayla geri koyar, sürüm dalında cherry-pick -x ile hotfix'i ve git cherry ile düzeltmenin main'e ulaştığının denetimini kurar."
tags:
  - git
  - etiket
  - github-release
  - semver
  - geri-donus
content_hash: sha256:1d48fdd1b8a173a89b28b21e6e466ec6ef99c25fec435fee8aaebf44a2c52fbf
classification_version: 1
classification_batch: 4
---
## Aynı ad, iki içerik

23 Ekim Cuma, 14.00. Ekip akışını kurduğumuz yazının sonunda `main` yeşildi ve bu haftanın sürüm sorumlusu, XXE yamasını yazan güvenlik geliştiricisi `gelistirici-b`, 1.4.0'ı çıkarıyor: `VERSION` güncelleniyor, commit'e `v1.4.0` etiketi atılıyor, GitHub'da bir Release açılıyor ve hat etiketten bir imaj yapıyor. 15.00'te imaj üretime dağıtılıyor. 15.20'de e-arşiv dışa aktarımı hata vermeye başlıyor: e-arşiv entegratörü para birimi alanı olmayan kayıtları reddediyor. 15.30'da ekip 1.3.0'a dönüyor. 16.00'da `main`'e 1.5'e ait bir e-imza arayüzü, 16.30'da eksik alanı ekleyen düzeltme giriyor. 17.00'de fatura geliştiricisi "numara değişmesin" diyerek `v1.4.0` etiketini `main`'in yeni ucuna taşıyor ve gönderiyor. Pazartesi sabahı acil bir 1.4.1 hazırlanırken ekipte iki ayrı "1.4.0" olduğu ortaya çıkıyor.

Fatura geliştiricisinin gerekçesi hazır: "Etiket bir kez atıldı mı değişmez; numarayı da SemVer'e göre verdik." Cuma akşamı yazılan olay notunda ise bir geri dönüş tarifi var: "Revert commit'i atıp yeniden dağıt." Gerekçenin iki yarısı da bir adın içeriği söylediğini varsayıyor; Git'in zihinsel modelini kurduğumuz yazıda kırılan varsayımın ta kendisi. Olay notundaki tarif ise dağıtım aracındaki bir geri dönüşü Git'teki bir geri döndürmeyle karıştırıyor. Korunacak varlık, sürümün adı ile içeriği arasındaki bağ: üretimde neyin çalıştığını, neye dönüleceğini ve bir düzeltmenin hangi sürümlere girdiğini kanıtla söyleyebilmek. Saldırganın yeteneği, depoya yazma yetkisi olan herhangi bir hesap; ele geçirilmiş ya da iyi niyetli ama yanılan. Yazma yetkisi etiket oluşturmaya, bir kural yoksa onu taşımaya da yeter.

Türkçede "sürüm" iki şeyi anlatıyor: bir yazılımın numaralı hâlini (version) ve o hâlin kullanıma çıkarılmasını (release). Bu yazıda numaraya **sürüm numarası**, adlandırılıp kullanıma çıkarılan yapıya **sürüm (release)**, onun bir ortama konmasına **dağıtım (deploy)** diyoruz; GitHub'ın nesnesi adıyla GitHub Release. Güven sınırı bir durum sınırı: değişebilen adlar, yani etiket, sürüm numarası ve imaj adı ile değişmeyen içerik kimlikleri, yani commit kimliği ve imajın içeriğinden hesaplanan **imaj özeti (image digest)** arasında. İkinci sınır deponun söylediği ile çalışan sistemin çalıştırdığı arasında. Güvenli varsayılanlar yazısındaki kaymanın sürüm düzeyindeki biçimi bu: depo doğruyu söyleyebilir, çalışan sistem başka bir yapıyı çalıştırıyor olabilir.

Program düzeyinde bu, NIST'in SSDF v1.1'indeki PS.3'tür: her sürümü, sürümden sonra bulunan açıkları tanımlayıp giderebilmek için korumak; PS.3.1 de her sürümün dosyalarının ve bütünlük ile köken bilgisinin güvenle arşivlenmesini ister. Dalın bir işaretçi olduğunu gösterdiğimiz yazıda A03:2025'in her ortam için yeniden yapmak yerine aynı çıktının terfi ettirilmesini istediğini görmüştük; güvenli varsayılanlar yazısında iki ortama aynı yapı çıktısını dağıtırken dayandığımız ilke de buydu. Bu yazıda o çıktının adını ve geri dönüş yolunu izliyoruz.

Deney deposu kısa ve yeniden kurulmuş: ekip akışı yazısının `main`'ini bu yazının dokunduğu dosyalara indiriyor ve geçmişi dört commit'e sıkıştırıyor; kimlikler o yazıdakilerle aynı değil, 1.3.0'ın içeriği temsilî. `main`'e ve sürüm dalına giren her commit, ekip akışı yazısındaki gibi bir PR'dan, gerekli kontrolden ve kod sahibi onayından geçmiş sayılıyor; bloklarda bu iki dala yapılan `git push` birleştirmenin yerini tutuyor; etiket gönderimleri ise gerçekten doğrudan push. Çıktılar Git 2.55.0 (Windows için Git) ile alındı; genel Git ayarların `GIT_CONFIG_GLOBAL` ile devre dışı:

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.38 ya da sonrası
# Değişen durum: yalnızca bu klasör: origin.git (bare depo), b ve a klonları · Veri kaybı riski: yok
# Doğrulama: dört commit ve iki etiket
cd "$(mktemp -d)"
: > bos.gitconfig                      # kendi Git ayarların deneye karışmasın
export GIT_CONFIG_GLOBAL="$PWD/bos.gitconfig" GIT_CONFIG_NOSYSTEM=1
olarak() {  # olarak <kişi> <tarih> <git komutu…>: commit'ler ve etiketler her makinede aynı kimliği alsın
  k=$1 t=$2; shift 2
  GIT_AUTHOR_NAME="$k" GIT_AUTHOR_EMAIL="$k@example.test" GIT_AUTHOR_DATE="$t" \
  GIT_COMMITTER_NAME="$k" GIT_COMMITTER_EMAIL="$k@example.test" GIT_COMMITTER_DATE="$t" git "$@"
}
kaydet() { olarak "$1" "$2" commit -q -m "$3"; }
yaz() { f=$1; shift; mkdir -p "$(dirname "$f")"; printf '%s\n' "$@" > "$f"; git add "$f"; }
git init -q --bare -b main --object-format=sha1 origin.git
git clone -q origin.git b 2>/dev/null && cd b
yaz VERSION '1.3.0' && yaz import/xml.ts 'export const parseOptions = {};'
kaydet gelistirici-b 2026-10-09T11:00:00+03:00 "sürüm: 1.3.0"
olarak gelistirici-b 2026-10-09T11:05:00+03:00 tag -a v1.3.0 -m "1.3.0"
yaz VERSION '1.4.0-rc.2' && yaz import/xml.ts 'export const parseOptions = {};' 'export const rejectDoctype = true;'
kaydet gelistirici-b 2026-10-21T09:15:00+03:00 "sürüm: 1.4.0 adayı 2, XXE yamasıyla"
git tag v1.4.0-rc.2                    # CI'nin 21 Ekim adayına attığı hafif etiket
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdvGosterimi = "oran-bazinda";'
kaydet gelistirici-a 2026-10-23T11:00:00+03:00 "fatura: PDF şablonu ve KDV gösterimi"
yaz fatura/e-arsiv.ts 'import { kdvGosterimi } from "./pdf.ts";' '' 'export const eArsivSatiri = { bicim: "e-arsiv", kdv: kdvGosterimi };'
kaydet gelistirici-b 2026-10-23T12:20:00+03:00 "e-arşiv: dışa aktarım satırı"
git push -q origin main v1.3.0 v1.4.0-rc.2 && cd .. && git clone -q origin.git a
git -C b log --oneline --decorate
```

```text
06994f8 (HEAD -> main, origin/main) e-arşiv: dışa aktarım satırı
5c44797 fatura: PDF şablonu ve KDV gösterimi
703b5a1 (tag: v1.4.0-rc.2) sürüm: 1.4.0 adayı 2, XXE yamasıyla
85a4e4e (tag: v1.3.0) sürüm: 1.3.0
```

## Etiket: yerinde duran bir işaretçi

Dalın bir işaretçi olduğunu gösterdiğimiz yazıda etiketin de bir ref olduğunu ve dallardan farkının, commit komutunun onu ilerletmemesi olduğunu görmüştük. Git'te iki tür etiket var. **Hafif etiket (lightweight tag)** yalnızca bir ad: bir nesneyi, çoğunlukla bir commit'i gösteren bir ref. **Açıklamalı etiket (annotated tag)** ise kendi başına bir nesne: oluşturma tarihini, etiketi atanın adını ve e-postasını, bir mesajı ve isteğe bağlı bir kriptografik imzayı taşır. Kılavuz ayrımı açıkça yapar: açıklamalı etiketler sürüm içindir, hafif etiketler özel ya da geçici adlandırma içindir; bu yüzden `git describe` gibi komutlar hafif etiketleri varsayılan olarak görmezden gelir. Sürüm sorumlusu 1.4.0'ı açıklamalı etiketle atıyor:

```bash
# Nerede: b klonu, main · Önkoşul: kurulum · Değişen durum: main'de bir commit, yerelde bir etiket; sonra ikisi uzak depoda
# Veri kaybı riski: yok · Doğrulama: ilk listede v1.4.0 yok, ikincide var
cd b && yaz VERSION '1.4.0' && kaydet gelistirici-b 2026-10-23T14:00:00+03:00 "sürüm: 1.4.0"
olarak gelistirici-b 2026-10-23T14:05:00+03:00 tag -a v1.4.0 -m "1.4.0: e-arşiv dışa aktarımı"
git cat-file -t v1.4.0; git cat-file -t v1.4.0-rc.2
git cat-file -p v1.4.0
git push -q && git ls-remote --tags origin 'v1.4*'
git push -q --follow-tags && git ls-remote --tags origin 'v1.4*'
```

```text
tag
commit
object b58fd17be103deca3acc1f72787c2ed795da874b
type commit
tag v1.4.0
tagger gelistirici-b <gelistirici-b@example.test> 1792753500 +0300

1.4.0: e-arşiv dışa aktarımı
703b5a1d4319293cc07c813de7ed6e67bed5773e	refs/tags/v1.4.0-rc.2
4ba554139725161969a031b5edfa9be7275e1e7b	refs/tags/v1.4.0
b58fd17be103deca3acc1f72787c2ed795da874b	refs/tags/v1.4.0^{}
703b5a1d4319293cc07c813de7ed6e67bed5773e	refs/tags/v1.4.0-rc.2
```

`v1.4.0` bir etiket nesnesini, `v1.4.0-rc.2` ise doğrudan bir commit'i gösteriyor: `cat-file -t`, adın çözüldüğü nesnenin türünü söylüyor. Etiket nesnesinin kimliği `4ba5541`; içinde gösterdiği commit `b58fd17`, etiketi atan kişi, Unix zamanıyla tarih ve mesaj var. Uzak depo listesindeki `^{}` satırı etiketin "soyulmuş" hâlidir: kılavuzun deyişiyle etiket, etiket olmayan bir nesneye varana kadar özyinelemeli olarak çözülür. İki liste bir şey daha öğretiyor: düz `git push` etiketi göndermedi. Pro Git bunu açıkça yazar: `git push` etiketleri varsayılan olarak sunucuya taşımaz. `--follow-tags`, gönderilen ref'lerden ulaşılabilen ve uzakta henüz olmayan açıklamalı etiketleri de gönderir; hafif etiketleri göndermez. Bu bir güvenlik ayrıntısı değil ama bir sürüm kuralının sessizce delinmesine yol açar: etiketi atılmış ama gönderilmemiş bir sürüm, hattın gördüğü depoda yoktur.

## Geri dönüş, geri döndürme değildir

*Gözlem ve kanıt.* 15.20'de hata oranı yükseliyor. Dağıtım kaydı çalışan imajın özetini ve `org.opencontainers.image.revision` ek açıklamasını gösteriyor; sürüm kapısını kurduğumuz yazıda bu alana imajın yapıldığı commit'in tam kimliğini yazmıştık. Revision `b58fd17…`. Entegratörün ret mesajı kusuru da söylüyor: e-arşiv satırında para birimi alanı yok.

*Seçenekler.* Birincisi **geri dönüş (rollback)**: dağıtım aracında önceki sürümün yapı çıktısını, yani 1.3.0'ın imajını yeniden dağıtmak. İkincisi geri alma yazısında kurduğumuz geri döndürme: e-arşiv commit'ini `revert` edip yeni bir yapı üretmek ve onu dağıtmak. Üçüncüsü **ileri düzeltme (roll forward)**: eksik alanı ekleyip yeni bir sürüm çıkarmak. Olay notundaki tarif ikinci seçeneği "geri dönmek" sanıyor; ne ürettiğine bakalım:

```bash
# Nerede: b klonu, ayrık HEAD · Önkoşul: önceki blok · Değişen durum: yalnızca yerelde, hiçbir dala bağlı olmayan bir commit
# Veri kaybı riski: yok · Doğrulama: fark boş değil
git switch -q --detach v1.4.0
olarak gelistirici-b 2026-10-23T15:35:00+03:00 revert --no-edit HEAD~1 > /dev/null
git diff --stat v1.3.0 HEAD
git switch -q main
```

```text
 VERSION       | 2 +-
 fatura/pdf.ts | 2 ++
 import/xml.ts | 1 +
 3 files changed, 4 insertions(+), 1 deletion(-)
```

Geri döndürme e-arşivi çıkardı, ama ortaya çıkan anlık görüntü 1.3.0 değil: XXE yaması, PDF şablonu, KDV gösterimi ve sürüm numarası farklı. Ne 1.3.0 ne 1.4.0; hiç sınanmamış üçüncü bir sürüm ve onu üretime taşımak yeni bir yapı, yeni bir sınama, yeni bir dağıtım demek. Geri dönüş ise üretimde zaten çalışmış ve sınanmış bir yapı çıktısını yeniden kullanır, Git'e hiç dokunmaz. Geri dönüşün de bir şartı var: önceki çıktının hâlâ saklı ve değişmemiş olması. Dağıtım bu yüzden imajın adıyla değil özetiyle yapılır: `belge-servisi:1.4.0` gibi bir imaj adı (konteyner dünyası buna da tag der; bu seride "etiket" yalnızca Git etiketidir) başka bir imaja yeniden verilebilir, oysa OCI imaj belirtimine göre özet içeriğin tanımlayıcısıdır ve içerikten hesaplanır.

*Güvenli karar.* Önce geri dönüş; düzeltme normal akışla gelir. Hedef sürüm de bir kapıdan geçer. Sürüm kapısını kurduğumuz yazıdaki kapı 1.3.0 için "durdur" der: yama hedefte yok. Geri dönüşte ikinci bir soru gerekir: açığı getiren değişiklik, `noent` satırı, hedefte var mı? O yazıda kırılgan commit'in yokluğunu sormanın tek başına yanlış soru olduğunu, "yok" cevabının ancak tam geçmişte sorulabileceğini görmüştük; karar yine davranışla verilir. Güvenli varsayılanlar yazısındaki kanaryalı XXE belgesinin iki beklentisi vardı: belge 400 alır ve kanarya yanıtta görünmez. 1.3.0 `noent`'ten önce çıktı ve kanarya yanıtta görünmüyorsa geri dönüş açığı yeniden açmıyor. Ama ilk beklenti 1.3.0'da tutmaz: `DOCTYPE` reddi orada yok. Geri dönüş bir savunma katmanını da geri alıyor ve karar bunu bilerek verilir.

*Kalan risk.* Veri şeması kodla birlikte geri dönmez: 1.4.0'ın şema değişikliği bir sütunun adını değiştirseydi ya da varsayılan değeri olmayan zorunlu bir sütun ekleseydi, 1.3.0 o tabloya yazamazdı. Geri dönüşü mümkün kılan, şema değişikliğini eski sürümün de çalışabileceği adımlara bölmektir; bu bir mühendislik çıkarımı, bir standardın maddesi değil. İkincisi yarım kalan dağıtım: hata yolunu incelediğimiz yazıdaki kısmi başarısızlık burada filonun bir kısmının 1.4.0, bir kısmının 1.3.0 çalıştırması demek. Geri dönüşün bittiği, dağıtım aracının "başarılı" demesiyle değil, çalışan her kopyanın (instance) revision değerine bakılarak doğrulanır.

## Taşınan etiket

17.00'de fatura geliştiricisi düzeltmeyi 1.4.0'ın içine almak istiyor. Aşağıdaki blok o kazayı canlandırıyor: yayımlanmış etiketi zorla push'la taşıyor, yani geri alma yazısının paylaşılmış ref'ler için yasakladığı işi yapıyor. Özgün etiket nesnesi `4ba5541` b'nin klonunda kalıyor; uzak depoya geri koymanın yolu birkaç blok sonra, b'den kirayla yapılan bir zorla push.

```bash
# Nerede: a klonu, main · Önkoşul: önceki bloklar · Değişen durum: main'de iki commit; yerel ve uzak v1.4.0 başka bir commit'e taşınır
# Veri kaybı riski: VAR; yayımlanmış etiketin eski hâli uzak depodan düşer; kurtarma: b'deki 4ba5541 · Doğrulama: ret ve zorla güncelleme
cd ../a && git pull -q
yaz fatura/e-imza.ts 'export interface EImza { sertifika: string }'
kaydet gelistirici-a 2026-10-23T16:00:00+03:00 "fatura: e-imza arayüzü (1.5)" && git push -q
yaz fatura/e-arsiv.ts 'import { kdvGosterimi } from "./pdf.ts";' '' 'export const eArsivSatiri = { bicim: "e-arsiv", kdv: kdvGosterimi, paraBirimi: "TRY" };'
kaydet gelistirici-a 2026-10-23T16:30:00+03:00 "e-arşiv: para birimini ekle" && git push -q
olarak gelistirici-a 2026-10-23T17:00:00+03:00 tag -f -a v1.4.0 -m "1.4.0: e-arşiv dışa aktarımı" main
git push origin v1.4.0 2>&1 | sed -n '2p'; echo "push: ${PIPESTATUS[0]}"
git push --force origin v1.4.0 2>&1 | sed -n '2p'; echo "push --force: ${PIPESTATUS[0]}"
```

```text
Updated tag 'v1.4.0' (was 4ba5541)
 ! [rejected]        v1.4.0 -> v1.4.0 (already exists)
push: 1
 + 4ba5541...c608efd v1.4.0 -> v1.4.0 (forced update)
push --force: 0
```

Git'in push kuralları hedef `refs/tags/` altındaysa her güncellemeyi reddeder; `--force` ya da refspec başındaki `+` bu reddi aşar. Kılavuz bir ayrıntıyı daha yazar: silme ve oluşturma güncelleme sayılmaz, yapılandırma ya da kanca engellemedikçe her zaman izinlidir. Uzaktaki etiketi silip aynı adla yeniden oluşturmak `--force` bile istemez; istemcideki bu kurallar etiketi değişmez yapmaz. Pazartesi 09.00'da sürüm sorumlusu kendi klonunda hotfix'e, yani üretimdeki sürüm için acil bir düzeltmeye hazırlanıyor ve elindeki tek sağlam kanıtla, dağıtım kaydındaki tam kimlikle başlıyor:

```bash
# Nerede: b klonu · Önkoşul: önceki blok · Değişen durum: origin/main ilerler; yerel v1.4.0 değişmez
# Veri kaybı riski: yok · Doğrulama: ilk getirme etiket hakkında sessiz, ikincisi ret; kayıt ile uzaktaki etiket ayrışıyor
cd ../b && git fetch; echo "fetch: $?"
git fetch --tags 2>&1 | grep v1.4.0; echo "fetch --tags: ${PIPESTATUS[0]}"
revision=b58fd17be103deca3acc1f72787c2ed795da874b        # dağıtım kaydı: Cuma 15.00 imajının revision ek açıklaması
echo "b'de v1.4.0:   $(git rev-parse --short 'v1.4.0^{commit}')"
echo "uzakta v1.4.0: $(git ls-remote origin 'refs/tags/v1.4.0^{}' | cut -c1-7)"
git log --oneline "$revision..origin/main"
tasinan=$(git ls-remote origin refs/tags/v1.4.0 | cut -f1)    # uzaktaki taşınmış etiket nesnesi
```

```text
From …/origin
   b58fd17..7d8f549  main       -> origin/main
fetch: 0
 ! [rejected] v1.4.0     -> v1.4.0  (would clobber existing tag)
fetch --tags: 1
b'de v1.4.0:   b58fd17
uzakta v1.4.0: 7d8f549
7d8f549 e-arşiv: para birimini ekle
3f2af4f fatura: e-imza arayüzü (1.5)
```

İlk getirme `origin/main`'i taşıdı ve etiket hakkında tek kelime söylemedi. Kılavuza göre varsayılan getirme, getirilen geçmişe işaret eden etiketleri de alır; deneyde gördüğümüz ise şu: yerelde aynı adla bir etiket varken getirme onu güncellemiyor ve bunu söylemiyor. `--tags` ile açıkça istenince Git reddetti. Kılavuza göre Git 2.20'den beri getirme, var olan bir etiketi `+` ya da `--force` olmadan güncellemez; 2.20'nin sürüm notu gerekçeyi de yazar: etiketler hareket etmeyen çapa noktaları olmalı. Karşılaştırmanın tanığı imajın kaydı; b'nin etiketi yalnızca onunla eşleştiği için güvenilir. Sonuç Şekil 1'de: aynı ad iki klonda iki commit'i gösteriyor ve uzaktaki "1.4.0", yayımlanmamış e-imza arayüzünü de içeriyor.

![İki panel, aynı commit konumları; oklar Git'in yönünde, her commit ebeveynini gösterir. Sırayla 703b5a1, rc.2, XXE, etiket v1.4.0-rc.2; 5c44797, PDF, KDV; 06994f8, e-arşiv; b58fd17, 1.4.0; vurgulu 3f2af4f, e-imza, 1.5; 7d8f549, düzeltme. Üst panel b'nin klonu, Pazartesi 09.00, getirmeden sonra: v1.4.0 · 4ba5541 ve main b58fd17'yi, kesikli çerçeveli origin/main 7d8f549'u gösteriyor; imaj 1.4.0, Cuma 15.00: revision b58fd17. Alt panel uzak depo ve a'nın klonu, Cuma 17.00'den sonra: vurgulu v1.4.0 · c608efd ve main 7d8f549'u gösteriyor. Notlar: b'de git fetch etiket hakkında sessiz, git fetch --tags would clobber existing tag; taşınan 1.4.0, yayımlanmamış 1.5 işini (3f2af4f) içeriyor. Köşeli kutu etiket, kesikli çerçeve uzak izleme dalı, vurgulu çerçeve taşınan ad ve onun soktuğu yayımlanmamış 1.5 işi.](assets/tasinan-etiket-iki-surum.svg "Şekil 1 — Taşınan etiket: aynı ad, iki klonda iki commit")

Kılavuzun "On Re-tagging" bölümü bu sabahı neredeyse adım adım anlatır. Git etiketleri kullanıcıların arkasından değiştirmez: eski etiketi almış biri, senin ağacından çekince onu kendiliğinden ezmemelidir. Kılavuz iki yol sayar. Akıllıca olan, hatayı kabul edip başka bir ad kullanmaktır; "X.1" de ve bitsin. Akılsızca olan, herkes eskisini görmüşken yeni sürüme de "X" demek ve eskisini hiç yayımlamamışsın gibi yeniden `git tag -f` kullanmaktır. Kılavuz meseleyi güvenlik meselesi diye adlandırır: insanlar etiket adlarına güvenebilmelidir. Burada üstelik taşıma, sürüm numarasına yayımlanmamış işi soktu. GitHub'ın belgesine göre bir Release'in kaynak kodu arşivleri ancak indirilmek istendiğinde üretilir; buradan çıkardığımız sonuç, Release'i etikete kilitleyen ayar açık değilse, etiketi taşımanın Release sayfasından indirilecek kaynak arşivini de değiştirmesidir. Release bu yüzden artık tanık değil: taşınan etiketle birlikte o da `7d8f549`'u gösteriyor.

Önünde üç yol var: etiketi `7d8f549`'da bırakmak ve iki "1.4.0" ile yaşamak, özgün nesnesine geri koymak ya da 1.4.0'ı bırakıp düzeltmeye yeni bir ad vermek. Yeni içerik zaten yeni adı alacak, 1.4.1; geri koymak kılavuzun akılsızca dediği şey, yani yeni içeriğe eski adı vermek değil, yanlış bir taşımanın geri alınmasıdır. Dağıtım kaydı ve b'nin klonu `b58fd17`'yi söylüyor; 1.4.0'ın anlamı o. Geri koymak da paylaşılmış bir ref'e zorla push, yani geri alma yazısının yasakladığı iş; burada yanlış bir taşımayı geri almak için bilerek ve duyurularak yapılan bir istisna. O yazının öbür şartı ise aynen geçerli: kira olmadan yapılmaz. Etiketlerin uzak izleme kaydı olmadığı için düz `--force-with-lease`'in karşılaştıracağı bir değer yok; beklenen değer açıkça verilir, yani az önce kaydettiğimiz taşınmış nesne. Arada biri etiketi yeniden taşıdıysa gönderim reddedilir. Fatura geliştiricisi de kılavuzun tarifini uyguluyor: yerel etiketi sil, aynı adla yeniden getir.

```bash
# Nerede: önce b, sonra a klonu · Önkoşul: önceki blok ($tasinan) · Değişen durum: uzak ve a'daki v1.4.0 özgün nesneye döner
# Veri kaybı riski: VAR; taşınmış etiket uzak depodan düşer (bilerek, duyurularak) · Doğrulama: a'da 4ba5541 → b58fd17
git push --force-with-lease origin v1.4.0 2>&1 | sed -n '2p'
git push --force-with-lease=refs/tags/v1.4.0:"$tasinan" origin v1.4.0 2>&1 | sed -n '2p'
cd ../a && git fetch --tags 2>&1 | grep v1.4.0
git tag -d v1.4.0 && git fetch -q origin tag v1.4.0
echo "a'da v1.4.0: $(git rev-parse --short v1.4.0) → $(git rev-parse --short 'v1.4.0^{commit}')"
```

```text
 ! [rejected]        v1.4.0 -> v1.4.0 (stale info)
 + c608efd...4ba5541 v1.4.0 -> v1.4.0 (forced update)
 ! [rejected] v1.4.0     -> v1.4.0  (would clobber existing tag)
Deleted tag 'v1.4.0' (was c608efd)
a'da v1.4.0: 4ba5541 → b58fd17
```

Etiket nesnesinin kimliği bile Cuma 14.05'teki hâliyle aynı: `4ba5541`. Kalan risk dağınık: hafta sonu taşınmış etiketi getiren her klon ve her hat aynı adımı atmalı; Git bunu onların yerine yapmaz. Etiketten imaj yapan bir hat Cuma 17.00'den sonra yeniden çalıştıysa, `belge-servisi:1.4.0` adı da başka bir imajı gösteriyor olabilir; dağıtımın özetle yapılmasının nedeni bu.

## GitHub Release ve değişmez sürüm

GitHub'da bir **Release**, belgesine göre Git etiketlerine dayanır; etiketin işaret ettiği noktaya sürüm notları ve ikili dosyalar ekler. Release'leri görmek okuma, yönetmek yazma yetkisi ister. Bir tuzak `gh release create`'te: komut eşleşen etiketi uzak depoda bulamazsa varsayılan dalın son hâlinden kendisi bir etiket oluşturur. Etiketin yalnızca yerelde durduğu klonda gh bunu fark edip durur; ama Release etiketi bilmeyen bir yerden, örneğin bir hattan, başka bir makineden ya da REST API'den açıldığında etiket o anki varsayılan dalın ucundan sessizce oluşur; `main` o arada ilerlediyse başka bir commit'ten. `--verify-tag`, etiket uzak depoda yoksa her durumda işlemi durdurur.

Taşınan etikete karşı platformun önlemi **değişmez sürüm (immutable release)**. GitHub'ın belgesine göre değişmez bir Release yayımlandığında etiketi bir commit'e kilitlenir; Release var oldukça etiket taşınamaz ve silinemez. Release'e dosya eklenemez, var olan dosyalar değiştirilemez ya da silinemez. Release silinirse etiket silinebilir ama aynı ad bir daha kullanılamaz; depo silinip aynı adla yeniden açılsa bile. Başlık, notlar ve "pre-release" ya da "latest" işareti değiştirilebilir; kilit yalnızca etikette ve dosyalarda. Değişmez sürüm bir de **sürüm tasdiki (release attestation)** üretir: etiketi, commit kimliğini ve dosyaları taşıyan, kriptografik olarak doğrulanabilir bir kayıt. `gh release verify v1.4.0` tasdikin geçerli olduğunu, `gh release verify-asset v1.4.0 <dosya>` indirilen dosyanın özetinin tasdikteki özetle eşleştiğini denetler; kaynak kodu arşivlerini denetleyemez, çünkü onlar indirme anında üretilir. SSDF v1.1'in PS.2.1'i yazılımı edinenlere bütünlük doğrulama bilgisi sunmayı ister; tasdiki bu bilginin GitHub'daki bir biçimi sayabiliriz.

Kilit yayımlama anında devreye girer. Taslak bir Release, yetkisi olan kullanıcılar ve iş akışları tarafından değiştirilebilir; belge bu yüzden önce taslak açmayı, dosyaları eklemeyi, sonra yayımlamayı önerir. Değişmez sürüm depo ya da organizasyon düzeyinde açılır ve yalnızca açıldıktan sonra yayımlanan sürümlere uygulanır. Ekim 2026 itibarıyla GitHub Docs bu özellik için bir plan ya da görünürlük koşulu yazmıyor; GitHub özelliği 28 Ekim 2025'te genel kullanıma açtığını duyurmuştu. 1.4.0 değişmez yayımlanmış olsaydı Cuma 17.00'deki zorla push etiketi taşıyamazdı. Etiketleri bir kuralla korumak, yani kimin etiket oluşturup silebileceğini sınırlamak, kuralların platforma yazılmasının konusu.

## SemVer bir sözdür

"Numarayı SemVer'e göre verdik" cümlesinin ağırlığı belirtimin ne istediğine bağlı. **Anlamsal sürümleme (Semantic Versioning, SemVer)** 2.0.0 önce bir genel API'nin ilan edilmesini şart koşar; bu ilan kodun kendisinde ya da yalnızca belgede olabilir. MAJOR, MINOR ve PATCH bu API'ye göre tanımlanır: geriye uyumsuz bir değişiklik MAJOR'ı, geriye uyumlu yeni işlev MINOR'ı, yalnızca geriye uyumlu hata düzeltmesi PATCH'i artırır; belirtim hata düzeltmesini yanlış davranışı düzelten iç değişiklik diye tanımlar. Belirtimin 3. kuralı bu sabaha doğrudan dokunuyor: sürüm numarası verilmiş bir paket yayımlandıktan sonra o numaranın içeriği değiştirilmemelidir; her değişiklik yeni bir numarayla yayımlanmalıdır. Taşınan etiket bu kuralın ad düzeyindeki ihlali. Belirtimin SSS bölümü küçük bir ayrımı da yapar: "v1.2.3" bir anlamsal sürüm numarası değil, 1.2.3'ün etiket adıdır.

Bir sözün sınırı da burada. SemVer numarayı veren kişinin beyanıdır; hiçbir araç 1.4.1'in gerçekten geriye uyumlu olduğunu numaradan çıkarmaz. Bu beyanın kanıtı, ilan edilmiş API'ye karşı koşan testlerdir; e-arşiv entegratörünün beklediği alanları sınayan bir arayüz uyumluluk testi Cuma günkü kusuru dağıtımdan önce yakalardı. Ön sürümler de belirtime göre normal sürümden düşük önceliklidir ve amaçlanan uyumluluk şartlarını karşılamayabilir: `1.4.0-rc.2`, `1.4.0`'dan önce gelir. Ön sürümün içindeki sayısal parçalar ise sayı olarak karşılaştırılır; `rc.2`, `rc.10`'dan önce gelir.

> **Teşhis et:** Hazırlık ortamının dağıtım betiğini üretime de taşımak isteyen bir ekip üyesi "en son sürümü" aşağıdaki satırla seçmeyi öneriyor; satır hazırlıkta bugüne kadar beklenen sonucu verdi. Cuma 14.10'da, depoda `v1.3.0`, `v1.4.0-rc.2` ve `v1.4.0` varken bu satır üretime hangi sürümü dağıtırdı? `versionsort.suffix=-rc` ayarı sorunu çözer mi?

```bash
son=$(git tag --list 'v*' --sort=-version:refname | head -n 1)
```

`v1.4.0-rc.2`'yi. Kılavuza göre Git'in sürüm sıralaması aynı taban sürümlü ama farklı sonekli adları sözlük sırasıyla dizer; ön sürüm etiketleri bu yüzden normal sürümün ardına düşer: "1.0-rc1", "1.0"dan sonra gelir. SemVer'in sıralaması bunun tersidir. Yerel bir denemede aynı satır `v1.4.0-rc.2` döndürdü; `-c versionsort.suffix=-rc` ile `v1.4.0` döndürdü. Ama ayar sorunu yalnızca bugün için çözüyor: depoya `v1.4.1` ve `v1.5.0-rc.1` eklenince ayarlı satır da `v1.5.0-rc.1`'i, bir adayı seçti; SemVer'e göre doğru sıralama, dağıtım için yanlış karar. İyi bir cevap iki şeyi ayırır: sıralama hatası ve "en son etiket" diye bir karar kuralı. Dağıtım, adıyla açıkça seçilmiş bir sürümden yapılır; betik adın açıklamalı bir etikete çözüldüğünü denetler (`git cat-file -t "$surum"` `tag` dönmeli; hafif aday etiketi `commit` döner) ve çözülen commit'i dağıtım kaydına yazar. Zayıf cevap soneki ayarlayıp betiği yerinde bırakır.

## Acil hotfix: sürüm dalı

*Gözlem ve kanıt.* Üretimde Cuma'dan beri 1.3.0 çalışıyor. 1.4.0'ın içeriği `b58fd17`; düzeltme `7d8f549` `main`'de, ama `main`'de 1.5'e ait `3f2af4f` da var ve e-imza işi bitmedi.

*Seçenekler.* Birincisi `main`'den 1.4.1 çıkarmak: e-imza arayüzü de sürüme girer; üstelik SemVer'e göre yeni işlev MINOR ister, bir yama sürümünde yeri yok. İkincisi etiketi yeniden taşımak; az önce bedelini gördük. Üçüncüsü, ekip akışı yazısında adını andığımız sürüm dalını `v1.4.0`'dan açıp yalnızca düzeltmeyi almak.

*Güvenli karar.* Üçüncüsü. Dal, adı değil kimliği doğrulanmış etiketten açılır: b'nin `v1.4.0`'ı dağıtım kaydıyla eşleşti. Düzeltme `main`'e zaten girmiş olduğu için oradan `cherry-pick -x` ile alınır. Ekip akışını işlediğimiz yazının diliyle sürüm dalı yeni bir base'tir: hotfix PR'ının base'i `main` değil `release/1.4`'tür. Deney PR adımını kısaltıyor; gerçek akışta dal önce `v1.4.0`'dan açılıp gönderilir, düzeltme ve sürüm commit'i bu base'e PR'la, gerekli kontrol ve onayla girer, `v1.4.1` birleştirmeden sonra atılır.

```bash
# Nerede: b klonu · Önkoşul: önceki bloklar · Değişen durum: yeni release/1.4 dalı ve v1.4.1 etiketi, uzak depoda da
# Veri kaybı riski: yok · Doğrulama: git cherry'de düzeltme "-", yalnız sürüm commit'i "+"; v1.4.0 v1.4.1'in atası
cd ../b && git switch -q -c release/1.4 v1.4.0
olarak gelistirici-b 2026-10-26T10:00:00+03:00 cherry-pick -x origin/main > /dev/null
yaz VERSION '1.4.1' && kaydet gelistirici-b 2026-10-26T10:05:00+03:00 "sürüm: 1.4.1"
olarak gelistirici-b 2026-10-26T10:10:00+03:00 tag -a v1.4.1 -m "1.4.1: e-arşiv para birimi"
git push -q --follow-tags -u origin release/1.4
git log --format='%h %s%n%b' -1 HEAD~1 | sed '/^$/d'
git cherry -v origin/main release/1.4
git merge-base --is-ancestor v1.4.0 v1.4.1; echo "v1.4.0, v1.4.1'in atası mı: $?"
```

```text
d4919e6 e-arşiv: para birimini ekle
(cherry picked from commit 7d8f5490b9027e1eb82d1433434c1ef44cbcbad9)
- d4919e63883c65732962741d84f95ae29958f6fa e-arşiv: para birimini ekle
+ 5064c404f9133d427fd45d22ffbe4267627db192 sürüm: 1.4.1
v1.4.0, v1.4.1'in atası mı: 0
```

`cherry-pick -x` yeni commit'in mesajına özgün commit'in kimliğini yazdı; kılavuza göre bu satır yalnızca çatışmasız alımlarda eklenir, tek kanıt sayılamaz. Kanıtı `git cherry` veriyor: kılavuza göre `-` ile başlayan commit'in eşdeğeri karşılaştırılan dalda, burada `origin/main`'de, zaten var; `+` ile başlayanın yok. Eşdeğerlik, satır numaraları ve boşluklar atılmış farka göre kurulur; ayrışan geçmişleri birleştirdiğimiz yazıdaki patch-id'nin mantığıyla. Düzeltme `-`: 1.5.0 bu hatayı geri getirmeyecek. Tek `+` sürüm numarası. GitFlow'un özgün tarifi yönü tersten kurar: hotfix dalı ilgili etiketten açılır, düzeltme bittiğinde hem ana dala hem geliştirme dalına birleştirilir ki bir sonraki sürüm de onu içersin. Yön hangisi olursa olsun denetim aynı: `git cherry origin/main release/1.4` çıktısında sürüm numarası dışında `+` satırı kalmamalı. Şekil 2 sabit noktaları gösteriyor.

![b'nin klonunda commit grafiği, Pazartesi 10.10; oklar Git'in yönünde. Ana çizgide 703b5a1, rc.2, XXE, hafif etiket v1.4.0-rc.2; 5c44797, PDF, KDV; 06994f8, e-arşiv; b58fd17, 1.4.0, etiket v1.4.0, main onu gösteriyor; 3f2af4f, e-imza, 1.5; 7d8f549, düzeltme, kesikli çerçeveli origin/main onu gösteriyor. Altta release/1.4 dalı: vurgulu d4919e6, cherry-pick, ebeveyni b58fd17; 5064c40, 1.4.1, etiket v1.4.1; release/1.4 5064c40'ı gösteriyor. 7d8f549'dan d4919e6'ya noktalı çizgi: aynı değişiklik, git cherry'de eksi. En altta git cherry -v origin/main release/1.4: eksi d4919e6 düzeltme, artı 5064c40 sürüm 1.4.1. Köşeli kutu etiket, kalın çerçeve açıklamalı; yuvarlak dal; kesikli uzak izleme dalı.](assets/surum-dali-hotfix.svg "Şekil 2 — Sürüm dalı: etiketler sabit, düzeltme iki dalda")

*Kalan risk.* Düzeltme önce sürüm dalına yazılır da `main`'e taşınması unutulursa 1.5.0 eski kusuru geri getirir; `git cherry` kapısı bunu yakalar ama kapının kendisi hatta olmalıdır. Dal koruması yalnızca `main` için yazıldıysa `release/1.4` incelemesiz bir yoldur; aynı kural sürüm dallarına da uygulanmalı ve bunun bir örüntüyle nasıl yazıldığı kuralların platforma yazılmasının konusu. Sahada desteklenen her sürüm bir dal, her düzeltme bir taşıma ve her taşıma bir sınama demek; ekip akışını işlediğimiz yazıda andığımız 2020 notu da GitFlow'un açıkça sürümlenen ya da sahada birden çok sürümü desteklenen yazılım için hâlâ uygun olabileceğini söyler. `belge-servisi` için sürüm dalı kısa ömürlü: 1.4.1 çıktı, sıradaki sürüm `main`'den gelecek.

> **Kendi organizasyonunda:** *Salt okunur denetim:* `gh release list -R <organizasyon>/<depo>` bir deponun Release'lerini, `gh release view <etiket> -R <organizasyon>/<depo> --json tagName,isImmutable,publishedAt` bir Release'in değişmez olup olmadığını gösterir; `gh release verify <etiket> -R <organizasyon>/<depo>` değişmez bir Release'in tasdikini denetler. Üçü de yalnızca okur. Depo ayarını gösteren `gh api repos/<organizasyon>/<depo>/immutable-releases` depoda yönetici okuma yetkisi ister; ayar kapalıysa uç nokta 404 döner ve `gh api` hata verip sıfırdan farklı bir kodla çıkar. Yetki eksikliği de hataya yol açabildiği için 404'ü tek başına "kapalı" diye okuma; sonucu `gh release view` çıktısındaki `isImmutable` ile birlikte değerlendir. Organizasyon politikasını gösteren `gh api orgs/<organizasyon>/settings/immutable-releases` organizasyon yönetimi kapsamı (`admin:org`) ister. *Öneri:* Önce Release'e sonradan dosya ekleyen hatları ve etiketi bilerek taşıyan akışları listele; GitHub Actions'ta `v1` gibi taşınan büyük sürüm etiketleri için belge Release oluşturmamayı önerir. Hatları taslak açma, dosya ekleme ve yayımlama sırasına geçir, kararı ekibe duyur; sonra değişmez sürümü yeni Release'ler için depo ya da organizasyon düzeyinde aç. Depo düzeyinde bunu Admin rolü yapar ve ayar yalnızca sonraki Release'leri etkiler. Geri dönüş yolu yalnızca ileriye dönüktür: ayarı kapatmak sonraki Release'leri yeniden değiştirilebilir kılar, ama silinen değişmez bir Release'in etiket adı bir daha kullanılamaz; ayarı önce bir test deposunda, sonra kademeli aç.

## Karar kartı

- **Varsayım:** "Etiket bir kez atıldı mı değişmez; SemVer'e uyan numara uyumluluğu garanti eder; geri dönmek bir revert commit'i atıp yeniden dağıtmaktır."
- **Güven sınırı:** Değişebilen adlar (etiket, sürüm numarası, imaj adı, "en son") ile değişmeyen içerik kimlikleri (commit kimliği, imaj özeti) arasındaki durum sınırı; ayrıca bir klonun bildiği etiket ile uzak deponun şimdiki etiketi ve deponun söylediği ile çalışan sistemin çalıştırdığı arasındaki sınırlar.
- **Karar:** Sürüm, açıklamalı bir etiket, o etiketten bir kez yapılıp özetiyle saklanan bir yapı çıktısı ve çıktıya kaydedilmiş tam commit kimliğidir. Yayımlanmış etiket taşınmaz; düzeltme yeni numarayla çıkar. Yanlışlıkla taşınan etiket, dağıtım kaydının söylediği nesneye kirayla geri konur ve duyurulur. GitHub Release `--verify-tag` ile var olan etiketten açılır ve değişmez yayımlanır. Başarısız dağıtımda önce önceki yapı çıktısı özetiyle yeniden dağıtılır; hedef sürüm de güvenlik kapısından geçer; düzeltme normal akışla gelir. Desteklenen sürümün düzeltmesi korunan bir sürüm dalına `main`'den `cherry-pick -x` ile alınır ve `git cherry` ile denetlenir; dağıtım "en son etiket"ten değil, açıkça adlandırılmış sürümden yapılır.
- **Somut risk:** Taşınan bir etiketin aynı numara altında yayımlanmamış işi üretime taşıması ve klonların sessizce ayrışması; "en son etiket" seçen bir betiğin sürüm adayını dağıtması; geri dönüş yerine revert'le hiç sınanmamış üçüncü bir sürüm üretilmesi; geri dönüşün bir güvenlik düzeltmesini sessizce geri alması; sürüm dalındaki düzeltmenin `main`'e ulaşmaması.
- **Doğrulanabilir özellik:** SSDF v1.1 PS.3.1 (her sürümün dosyalarının ve bütünlük ile köken bilgisinin güvenle arşivlenmesi) ve PS.2.1 (bütünlük doğrulama bilgisinin sunulması). Git'le: `git cat-file -t v1.4.1` `tag` döner; `git rev-parse 'v1.4.0^{commit}'` dağıtım kaydındaki revision'a eşittir; `git merge-base --is-ancestor v1.4.0 v1.4.1` 0 döner; `git cherry origin/main release/1.4` sürüm commit'i dışında `+` satırı vermez.
- **Negatif test:** Deney deposunda yayımlanmış etiketin zorlamasız push'u "already exists", başka klonda `git fetch --tags` "would clobber existing tag", beklenen değeri verilmemiş (düz) `--force-with-lease` "stale info" ile reddedilir; dağıtım betiği hafif aday etiketiyle (`v1.4.0-rc.2`) çağrılınca `git cat-file -t` `commit` döndüğü için dağıtmadan durur. Değişmez sürümün açık olduğu bir test deposunda yayımlanmış Release'in etiketini taşımak ve silmek reddedilir.
- **Üretimde sinyal:** Çalışan her kopyanın revision'ı ve imaj özeti dağıtım kaydıyla karşılaştırılır; uzak depoda zorla güncellenen ve aynı adla farklı commit gösteren etiketler uyarı üretir; değişmez olmayan Release'ler sayılır; sürüm dallarında `main`'e taşınmamış düzeltmeler listelenir.
- **Kalan risk:** Veri şeması kodla birlikte geri dönmez; yarım kalan dağıtım filoyu iki sürümde bırakabilir; geri dönüş hedefi bir savunma katmanını ya da sonradan çıkan bir güvenlik düzeltmesini içermeyebilir. Değişmez sürüm yalnızca açıldıktan sonra yayımlananları ve yalnızca GitHub'daki etiketi kilitler; klonlardaki etiketleri ve imaj adlarını kilitlemez. SemVer bir beyandır; doğrulaması ilan edilmiş API'ye karşı koşan testtir.

### Sırada ne var

Bu yazıdaki her işlem bir yetkiyle yapıldı: etiketi taşıyan da geri koyan da depoya yazma yetkisini kullandı; değişmez sürümü açmak yönetici yetkisi istiyor. Sıradaki yazı bu yetkilerin kaynağını soruyor: bir GitHub organizasyonunda kim hangi depoyu neden görüp yazabiliyor, roller, takımlar ve temel yetki bu cevabı nasıl üretiyor ve erişim en az yetkiye göre nasıl yeniden tasarlanır?

## Kaynakça

- Git projesi. *git-tag Documentation* (son güncelleme: Git 2.55.0) — açıklamalı ve hafif etiket, "On Re-tagging", `--sort`. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-tag)
- Git projesi. *git-fetch Documentation* (son güncelleme: Git 2.56.0) — etiket güncellemeleri, Git 2.20. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-fetch)
- Git projesi. *git-push Documentation* (son güncelleme: Git 2.55.0) — `--follow-tags`, `--force-with-lease`, `refs/tags/` güncelleme kuralları. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-push)
- Git projesi. *gitrevisions Documentation* (son güncelleme: Git 2.56.0) — `<rev>^{}`. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/gitrevisions)
- Git projesi. *git-config Documentation* (son güncelleme: Git 2.56.0) — `versionsort.suffix`. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-config)
- Git projesi. *git-cherry-pick Documentation* (son güncelleme: Git 2.56.0) — `-x`. Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-cherry-pick)
- Git projesi. *git-cherry Documentation* (son güncelleme: Git 2.0.5). Git başvuru kılavuzu. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-cherry)
- Git projesi. *Git 2.20.0 Release Notes* — `git fetch`'in var olan etiketleri `--force` olmadan güncellememesi. [Bağlantı](https://github.com/git/git/blob/v2.56.0/Documentation/RelNotes/2.20.0.adoc)
- Chacon, S. & Straub, B. *Pro Git* (2. baskı) — 2.6 Git Basics: Tagging. Erişim: 26 Ekim 2026. [Bağlantı](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- GitHub Docs. *About releases*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- GitHub Docs. *Managing releases in a repository* — değişmez sürümde dosya ekleme, değiştirme ve silme yasağı; taslakla yayımlama. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- GitHub Docs. *Immutable releases*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)
- GitHub Docs. *Preventing changes to your releases*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/establish-provenance-and-integrity/prevent-release-changes)
- GitHub Docs. *Verifying the integrity of a release*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/verify-release-integrity)
- GitHub Docs. *Using immutable releases and tags to manage your action's releases*. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/actions/how-tos/create-and-publish-actions/using-immutable-releases-and-tags-to-manage-your-actions-releases)
- GitHub Docs. *REST API endpoints for repositories* — Check if immutable releases are enabled for a repository; *REST API endpoints for organizations* — Get immutable releases settings for an organization. Erişim: 26 Ekim 2026. [Bağlantı](https://docs.github.com/en/rest/repos/repos)
- GitHub CLI kılavuzu. *gh release create*, *gh release view*, *gh release verify*, *gh release verify-asset*. Erişim: 26 Ekim 2026. [Bağlantı](https://cli.github.com/manual/gh_release)
- GitHub Changelog. *Immutable releases are now generally available* (28 Ekim 2025). [Bağlantı](https://github.blog/changelog/2025-10-28-immutable-releases-are-now-generally-available/)
- Preston-Werner, T. *Semantic Versioning 2.0.0*. Erişim: 26 Ekim 2026. [Bağlantı](https://semver.org/spec/v2.0.0.html)
- National Institute of Standards and Technology (2022). *SP 800-218: Secure Software Development Framework (SSDF) Version 1.1* — PS.2.1, PS.3, PS.3.1. [Bağlantı](https://csrc.nist.gov/pubs/sp/800/218/final)
- Open Container Initiative (2025). *Image Format Specification* v1.1.1 — Descriptors, `digest`. [Bağlantı](https://github.com/opencontainers/image-spec/blob/v1.1.1/descriptor.md)
- Driessen, V. *A successful Git branching model* (5 Ocak 2010; "Note of reflection", 5 Mart 2020) — Hotfix branches. Erişim: 26 Ekim 2026. [Bağlantı](https://nvie.com/posts/a-successful-git-branching-model/)
