---
article_id: article_8d22c85c-1e96-488e-844e-e5a38c854583
title: "Uzak Depoyla Eşitlenmek: fetch, pull, push ve origin/main Ne Zaman Değişir?"
slug: uzak-depoyla-esitlenmek-fetch-pull-push
category: version-control
level: advanced
reading_order: 6
summary: "XXE yaması başka bir makineden paylaşılan uzak depoya gönderildikten sonra, fatura geliştiricisinin klonunda neyin değişip neyin değişmediğini iki klon ve yerel bir bare depoyla ölçer. Yerel dalı, uzak izleme dalını ve uzak depodaki dalı ayırır; fetch'in yalnızca origin/main'i, pull'un yalnızca geçerli dalı, push'un yalnızca ileri sarılabilen uzak dalı taşıdığını gösterir. git status'un güncel cevabının son fetch'in önbelleği olduğunu, ıraksamada pull ve push'un neden reddettiğini ve güncelim kararının hangi koşulda kanıt sayılacağını kurar."
tags:
  - git
  - uzak-depo
  - uzak-izleme-dali
  - fetch-pull-push
  - ileri-sarma
content_hash: sha256:acc82161e816a9ea2695562560dfd58311a292294e2263a5487e8ea31f30385b
classification_version: 1
classification_batch: 2
---
## Sunucuda var, klonunda yok

Git'in zihinsel modelini kurduğumuz yazıdaki XXE yaması gerçekte başka bir makinede, güvenlik ekibinin klonunda commit edildi ve 20 Ekim'de ekibin paylaştığı uzak depoya, `origin`'e gönderildi. Ertesi sabah, sürüm toplantısının hemen ardından, fatura ekibindeki geliştirici toplantının kararını uygulamak üzere: yeni sürüm adayı yamayı içeren bir commit'ten yapılacak. Kendi klonunda `main`'e geçip `git status` yazıyor ve Git "Your branch is up to date with 'origin/main'" diyor. Geliştirici iki sonuç çıkarıyor: toplantıda yamanın `main`'de olduğu söylendi ve benim `main`'im güncel, öyleyse adayı yerel `main`'den yapabilirim; fatura dalım da birazdan `git pull` ile aynı yamayı alır.

İki sonuç da yanlış ve ikisi de aynı yanlış modelden geliyor: `origin/main`'i uzak depodaki `main`'in canlı görüntüsü, `pull`'u da bütün dalları eşitleyen bir komut sanmak. Korunacak varlık, Git'in zihinsel modelini kurduğumuz yazıdakiyle aynı: üretime giden yapının yamayı içermesi. Buna ikincisi ekleniyor: paylaşılan `main`'in bütünlüğü, yani hiç kimsenin commit'inin, yamanın kendisi dahil, sessizce düşmemesi. Saldırganın yeteneği de aynı, içe aktarma yetkisi olan herhangi bir kullanıcı; değişen, ona kapıyı neyin açtığı: eskimiş bir görüntüyle verilen bir sürüm kararı. Güven sınırı yine bir durum sınırı: senin klonunun son iletişimde öğrendiği ile uzak deponun şu an tuttuğu arasında. Kırılan varsayım: "Git bana uzak deponun durumunu söylüyor." Söylemiyor; son öğrendiğini söylüyor.

## Üç ayrı main

Deney bu kez paylaşılan bir uzak depo ve iki klon kuruyor. Uzak depo yerel diskte duran bir **bare depo (bare repository)**: Git'in sözlüğüne göre dosyaların çıkarılmış bir kopyasını taşımayan, adı çoğunlukla `.git` ile biten bir depo; yalnızca commit'leri ve ref'leri tutar. Ref'lerin nasıl taşındığı açısından yerel bir bare depo ile GitHub'daki bir depo aynı rolü oynar; değişen, kimin bağlanabildiği ve neyi yazabildiğidir. `b` güvenlik ekibinin, `a` fatura ekibinin klonu. Ad, e-posta ve tarihler sabit olduğu için kimlikler, Git'in zihinsel modelini kurduğumuz yazıdaki deneyle aynı çıkıyor.

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.29 ya da sonrası
# Değişen durum: yalnızca bu klasör: origin.git (bare depo), a ve b klonları · Veri kaybı riski: yok
# Doğrulama: son iki satır, uzak depodaki main ile a klonundaki main'i ayrı commit'lerde gösterir
cd "$(mktemp -d)"
: > bos.gitconfig                      # kendi Git ayarların deneye karışmasın
export GIT_CONFIG_GLOBAL="$PWD/bos.gitconfig" GIT_CONFIG_NOSYSTEM=1
kaydet() {  # kaydet <yazar> <tarih> <mesaj>: kimlikler her makinede aynı çıksın diye sabit
  GIT_AUTHOR_NAME="$1" GIT_AUTHOR_EMAIL="$1@example.test" GIT_AUTHOR_DATE="$2" \
  GIT_COMMITTER_NAME="$1" GIT_COMMITTER_EMAIL="$1@example.test" GIT_COMMITTER_DATE="$2" \
  git commit -q -m "$3"
}
git init -q --bare -b main --object-format=sha1 origin.git   # paylaşılan uzak depo
git clone -q origin.git b 2>/dev/null && cd b                 # boş depo uyarısı susturuldu
mkdir import
echo 'export const parseOptions = {};' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-12T10:00:00+03:00 "içe aktarma: XML uç noktası"
echo 'export const parseOptions = { noent: true };' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-15T14:20:00+03:00 "içe aktarma: müşteri varlıkları için noent"
echo '1.4.0-rc.1' > VERSION
git add VERSION && kaydet gelistirici-b 2026-10-19T09:00:00+03:00 "sürüm: 1.4.0 adayı"
git push -q origin main && cd ..
git clone -q origin.git a && cd a                             # 19 Ekim: fatura klonu ve dalı
git switch -q -c feature/fatura-pdf
mkdir fatura && echo 'export const template = "fatura-v1";' > fatura/pdf.ts
git add fatura/pdf.ts && kaydet gelistirici-a 2026-10-19T16:45:00+03:00 "fatura: PDF şablonu"
git switch -q main && cd ../b
printf 'export const parseOptions = {};\nexport const rejectDoctype = true;\n' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-20T11:30:00+03:00 "içe aktarma: DOCTYPE taşıyan belgeyi reddet"
git push -q origin main && cd ../a                            # 20 Ekim: yama b'den gönderildi
git -C ../origin.git log -1 --format='uzak depodaki main: %h'
git log -1 --format='a klonundaki main:  %h'
```

```text
uzak depodaki main: 85fdda1
a klonundaki main:  31ad836
```

Yama uzak depoda, `a`'da değil. Geliştiricinin gözünden nasıl göründüğüne bakalım:

```bash
# Nerede: a klonu, main · Önkoşul: kurulum · Değişen durum: yok; ls-remote ağa çıkar ama yalnızca okur
# Veri kaybı riski: yok · Doğrulama: status'un "güncel" dediği commit ile ls-remote'un gösterdiği commit
git status | head -2
git branch -vv
git ls-remote origin
```

```text
On branch main
Your branch is up to date with 'origin/main'.
  feature/fatura-pdf f8db4cb fatura: PDF şablonu
* main               31ad836 [origin/main] sürüm: 1.4.0 adayı
85fdda1d575828f6e293fbbea1f2de3fbb269f37	HEAD
85fdda1d575828f6e293fbbea1f2de3fbb269f37	refs/heads/main
```

Çıktıda `main` adını taşıyan üç ayrı ref var. Birincisi `a`'nın kendi dalı, `refs/heads/main`: `31ad836`. İkincisi yine `a`'nın içinde duran `refs/remotes/origin/main`, yani bir **uzak izleme dalı (remote-tracking branch)**: `a`'nın uzak depodaki `main` hakkında en son öğrendiği, o da `31ad836`. Üçüncüsü `origin.git`'in içindeki `refs/heads/main`: gerçek uzak dal, `85fdda1`. Pro Git uzak izleme dallarını uzak dalların durumuna verilen yerel referanslar diye tanımlar; onları sen taşıyamazsın, Git onları her ağ iletişiminde taşır. Git'in sözlüğü de bir uzak izleme dalının doğrudan değiştirilmemesi, üzerine yerel commit yapılmaması gerektiğini ekler.

`git status`'un "güncel" cümlesi bu üçünden yalnızca ilk ikisini karşılaştırır ve ikisi de `a`'nın diskinde. Pro Git `git branch -vv`'nin önde ve geride sayıları için bunu açıkça yazar: sayılar yalnızca sunuculardan son getirme anından beri geçerlidir; komut sunuculara ulaşmaz, onlardan yerelde önbelleğe aldığını söyler. Listede ağa çıkan tek komut `git ls-remote`: uzak depodaki ref'leri ve gösterdikleri commit kimliklerini listeler, hiçbir şeyi değiştirmez; asıl `main`'in `85fdda1`'de olduğunu o söylüyor. Top 10'u okuduğumuz yazıdaki kural burada en sade hâliyle karşımıza çıkıyor: kanıt, kapsadığı kadar konuşur. "Güncel" cevabı iki yerel kaydın birbirine eşit olduğunu kanıtlar; uzak depo hakkında hiçbir şey söylemez.

Bu ilişkiyi kuran şey klonlama sırasında yazılan iki ayar:

```bash
# Nerede: a klonu · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok · Doğrulama: üç satır
git config --get-regexp '^remote\.origin\.fetch|^branch\.'
```

```text
remote.origin.fetch +refs/heads/*:refs/remotes/origin/*
branch.main.remote origin
branch.main.merge refs/heads/main
```

İlk satır bir **refspec**, yani getirme ve gönderme sırasında uzak ref ile yerel ref arasındaki eşleme kuralı: uzak depodaki her `refs/heads/<ad>`, yerelde `refs/remotes/origin/<ad>` olarak yazılır. `origin` özel bir ad değil; Pro Git'e göre Git'in klonlanan sunucuya verdiği varsayılan addır. Son iki satır `main`'in **yukarı akış dalını (upstream branch)** tanımlar. Git'in sözlüğüne göre yukarı akış dalı, bir dalın varsayılan olarak bütünleştirildiği daldır ve bu iki ayarla yapılandırılır; `git status`'un "güncel" dediği karşılaştırma da `pull`'un neyi bütünleştireceği de bu ayardan gelir. `feature/fatura-pdf` için satır yok: o dal henüz uzak depoda bulunmuyor ve bir yukarı akış dalı yok.

## fetch yalnızca uzak izleme dalını taşır

```bash
# Nerede: a klonu, main · Önkoşul: uzak depoya erişim · Değişen durum: nesne veritabanı ve origin/main
# Veri kaybı riski: yok · Doğrulama: son satır hangi ref'in nereden nereye kaydığını yazar
git fetch
```

```text
From …/origin
   31ad836..85fdda1  main       -> origin/main
```

Çıktının ikinci satırı olan biteni tek başına söylüyor: uzak depodaki `main`, `a`'nın `origin/main` kaydına yazıldı ve kayıt `31ad836`'dan `85fdda1`'e kaydı. Git'in kılavuzu `fetch`'i, ref'lerle birlikte geçmişlerini tamamlamak için gereken nesneleri getiren ve uzak izleme dallarını güncelleyen komut diye tanımlar. Pro Git ayrıca altını çizer: `fetch` veriyi yalnızca yerel depoya indirir, senin işinle birleştirmez, üzerinde çalıştığın hiçbir şeyi değiştirmez.

```bash
# Nerede: a klonu, main · Önkoşul: fetch · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: sol sayı yalnızca main'de, sağ sayı yalnızca origin/main'de olan commit'ler; son satır feature
git status | head -2
git rev-list --left-right --count main...origin/main
git merge-base --is-ancestor origin/main feature/fatura-pdf; echo "çıkış: $?"
```

```text
On branch main
Your branch is behind 'origin/main' by 1 commit, and can be fast-forwarded.
0	1
çıkış: 1
```

`main...origin/main` üç noktalı yazımla bir simetrik farktır: Git'in sürüm yazımı belgesine göre iki uçtan yalnızca birinden ulaşılabilen commit'lerin kümesi. `--left-right --count` bu kümeyi iki tarafa ayırıp sayar: `main`'de olup `origin/main`'de olmayan 0, tersi 1. `git status`'un yeni cümlesi bu sayının sözcüklerle söylenişi, ama yine bir önbellek cümlesi; doğru olmasının tek nedeni az önce `fetch` yapmış olmamız. Son satır ise Git'in zihinsel modelini kurduğumuz yazının cevabını tekrar ediyor: `fetch` fatura dalına da dokunmadı ve yama orada yok.

`fetch` ile bütünleştirme arasındaki bu aralık, gelen değişikliği okumak için kullanılabilecek tek aralıktır:

```bash
# Nerede: a klonu, main · Önkoşul: fetch · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: gelen commit ve getirdiği fark listeleniyor; ikisi de henüz main'de değil
git log --oneline main..origin/main
git diff --stat main...origin/main
```

```text
85fdda1 içe aktarma: DOCTYPE taşıyan belgeyi reddet
 import/xml.ts | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```

İki noktalı `main..origin/main`, `origin/main`'den ulaşılabilen ama `main`'den ulaşılamayan commit'leri; üç noktalı `diff` ise ortak atadan bu yana `origin/main` tarafında değişeni gösterir. İkisi de yalnızca okur. Getirilen commit'ler, paylaşılan depoya yazma yetkisi olan herhangi birinin yazdığı commit'lerdir; onları bütünleştirmek, içerdikleri yapı betiklerini ve testleri bir sonraki adımda kendi makinende çalıştırmak demektir. Okumanın yeri bu aralıktır.

Aynı protokolün bir sınırı da var ve bir organizasyon yöneticisi için doğrudan önemli. `fetch`, getirdiği ref'lerin geçmişini tamamlayan bütün nesneleri indirir. Git'in kılavuzu, getirme ve gönderme protokollerinin bir taraftaki paylaşılmak istenmemiş veriyi kötü niyetli bir karşı taraftan korumak için tasarlanmadığını açıkça yazar: korunacak özel veri başka bir depoda durmalıdır; sunucudaki ad alanları okuma erişimi denetimi için etkili değildir ve bir ad alanına okuma erişimi ancak deponun tamamını okumasına güvenilen istemcilere verilmelidir. Bir dal bu bakımdan bir erişim sınırı değildir: depoyu okuyabilen, dallarını da okuyabilir varsay.

## pull: fetch artı yalnızca geçerli dalın bütünleştirilmesi

Git'in güncel kılavuzu `pull`'u üç adımda tarif eder: önce aynı argümanlarla `git fetch` çalıştırır; sonra hangi uzak dalı bütünleştireceğine karar verir, argüman verilmemişse bu geçerli dalın yukarı akış dalıdır; en son o dalı geçerli dala bütünleştirir. Dört bütünleştirme yolu var: `--ff-only`, `--rebase`, `--no-rebase` (birleştirme) ve `--squash`. Kılavuza göre `--ff-only` varsayılandır; yerel dal ıraksamışsa `pull` başarısız olur ve aşağıdaki deney bunu doğruluyor. Pro Git ise `pull`'u hâlâ "getir ve birleştir" diye anlatır; aynı kılavuzun `push` sayfasındaki bir not da `pull`'un bir birleştirme commit'i üreteceğini söyler. Kaynaklar arasındaki bu fark, varsayılanın sürümler boyunca değiştiğini gösteriyor. Davranışı sürüme bırakmamak için ekip `pull.ff`, `pull.rebase` ya da `pull.squash` ayarlarından birini açıkça seçer.

```bash
# Nerede: a klonu, main · Önkoşul: main'de commit edilmemiş değişiklik yok
# Değişen durum: main ref'i, hazırlık alanı ve çalışma ağacı · Veri kaybı riski: yok (yalnızca ileri sarar)
# Doğrulama: "Fast-forward" satırı ve grafikte main ile origin/main'in aynı commit'te olması
git pull
git log --oneline --graph --all --decorate
```

```text
Updating 31ad836..85fdda1
Fast-forward
 import/xml.ts | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
* 85fdda1 (HEAD -> main, origin/main, origin/HEAD) içe aktarma: DOCTYPE taşıyan belgeyi reddet
| * f8db4cb (feature/fatura-pdf) fatura: PDF şablonu
|/
* 31ad836 sürüm: 1.4.0 adayı
* 8a819d8 içe aktarma: müşteri varlıkları için noent
* 825fed9 içe aktarma: XML uç noktası
```

`main`, yukarı akış dalının bir atası olduğu için **ileri sarıldı (fast-forward)**. Git'in sözlüğü ileri sarmayı özel bir birleştirme diye tanımlar: bütünleştirilen dal seninkinin bir torunuysa yeni bir birleştirme commit'i yapılmaz, dalın yalnızca aynı commit'i gösterecek biçimde güncellenir. Grafikte yeni commit yok; `main` işaretçisi `31ad836`'dan `85fdda1`'e kaydı ve çalışma ağacı o commit'in anlık görüntüsüne geçti. `origin/HEAD`, uzak deponun varsayılan dalını gösteren yerel bir kayıttır; burada `origin/main`'i gösteriyor. `feature/fatura-pdf` yine `f8db4cb`'de. Şekil 1 üç anı aynı commit konumlarıyla yan yana koyuyor.

![Üç panel, yalnızca a klonunun ref'leri; sağda her panelde uzak depo, origin.git, main: 85fdda1. Oklar Git'in yönünde, her commit ebeveynini gösterir; kesikli çerçeve uzak izleme dalı. Panel 1, b push etti, a henüz fetch etmedi: 8a819d8 ve 31ad836, üstte f8db4cb; main ve kesikli origin/main 31ad836'yı, feature/fatura-pdf f8db4cb'yi gösteriyor, HEAD main'de; not: a'da status: up to date, origin/main bayat. Panel 2, a'da git fetch: vurgulu yeni commit 85fdda1 XXE yaması indirildi, vurgulu origin/main 85fdda1'e kaydı; main 31ad836'da kaldı; not: status: behind 1, main ve feature yerinde. Panel 3, git pull, main'de: vurgulu main 85fdda1'e ileri sarıldı, origin/main da orada; not: feature yine yerinde.](assets/uc-an-uc-ref.svg "Şekil 1 — fetch yalnızca origin/main'i, pull yalnızca geçerli dalı taşır")

> **Teşhis et:** Fatura geliştiricisi yamanın birleştiğini öğrenince kendi dalına geçip `pull` yapıyor ve sonucu ekibe yazıyor: "pull yaptım, dalım güncel". Komutlar ve çıktıları aşağıda. Yama dalında mı?

```bash
# Nerede: a klonu, feature/fatura-pdf · Önkoşul: yok
# Değişen durum: uzak depoda yeni feature/fatura-pdf dalı; a'da origin/feature/fatura-pdf ve yukarı akış ayarı
# Veri kaybı riski: yok · Doğrulama: son satırın çıkış kodu
git switch -q feature/fatura-pdf && git push -q -u origin feature/fatura-pdf
git pull
git merge-base --is-ancestor 85fdda1 HEAD; echo "çıkış: $?"
```

```text
Already up to date.
çıkış: 1
```

Değil. `push -u` dalı uzak depoya gönderdi ve yukarı akış dalını `origin/feature/fatura-pdf` olarak kurdu. `pull` önce getirdi, sonra geçerli dalın yukarı akış dalını bütünleştirmeye çalıştı; o dalda yeni bir commit olmadığı için "Already up to date" dedi. Cümle doğru: dal, kendi yukarı akış dalıyla gerçekten eşit. Yama ise başka bir dalın, `main`'in geçmişinde ve `pull` onu fatura dalına taşımak için hiçbir adım atmadı. İyi bir cevap "güncel" sözcüğünün hangi iki ref arasındaki eşitliği söylediğini sorar, yamanın yerini `--is-ancestor` ile kanıtlar ve `main`'deki değişikliği fatura dalına getirmenin ayrı ve bilinçli bir bütünleştirme olduğunu söyler. Zayıf cevap `pull`'u bir kez daha çalıştırır ya da "Already up to date" çıktısını yamanın dalda olduğunun kanıtı sayar.

## push: uzak dal yalnızca ileri sarılarak değişir

`push` getirmenin tersidir: uzak depodaki ref'leri yerel depodan günceller ve eksik nesneleri gönderir. Argümansız `push`, `push.default=simple` varsayılanıyla geçerli dalı uzak depoda aynı adı taşıyan dala gönderir; yeni bir dal için yukarı akış dalını `-u` kurar. Git'in kılavuzu bu kuralı bir koruma olarak tanımlar: `push`, uzak depoda yanlışlıkla veri kaybını önlemek için yalnızca belirli güncellemelere izin verir ve hedef bir dalsa yalnızca ileri sarmaya; yani uzak dalın gösterdiği commit, gönderilen commit'in atası olmalıdır. İleri sarma olmayan bir güncelleme geçmiş kaybettirir.

Bunu görmek için iki klonun da aynı daldan ayrı yönlere ilerlemesi yeter. Güvenlik ekibi sürüm adayının numarasını artırıp gönderiyor; fatura geliştiricisi de aynı sabah, `main`'i güncel sanarak, üzerine küçük bir belge commit'i yapıyor:

```bash
# Nerede: önce b klonu, sonra a klonu · Önkoşul: yok
# Değişen durum: b'de ve uzak depoda yeni bir commit; a'nın main'inde yerel bir commit; a'da origin/main
# Veri kaybı riski: yok (a'nın push'u reddedilir, commit'i yalnızca a'da kalır) · Doğrulama: çıkış kodları ve sayılar
cd ../b && echo '1.4.0-rc.2' > VERSION && git add VERSION \
  && kaydet gelistirici-b 2026-10-21T09:15:00+03:00 "sürüm: 1.4.0 adayı 2" && git push -q origin main
cd ../a && git switch -q main && mkdir -p docs && echo '# Fatura' > docs/fatura.md && git add docs/fatura.md \
  && kaydet gelistirici-a 2026-10-21T10:05:00+03:00 "belge: fatura notu"
git push 2>&1 | sed -n '1,2p'; echo "push çıkış: ${PIPESTATUS[0]}"
git fetch -q && git rev-list --left-right --count main...origin/main
git pull 2>&1 | tail -1; echo "pull çıkış: ${PIPESTATUS[0]}"
git log --oneline --graph --decorate main origin/main -3
```

```text
To …/origin.git
 ! [rejected]        main -> main (fetch first)
push çıkış: 1
1	1
fatal: Need to specify how to reconcile divergent branches.
pull çıkış: 128
* eacea0f (HEAD -> main) belge: fatura notu
| * 120d7b5 (origin/main, origin/HEAD) sürüm: 1.4.0 adayı 2
|/
* 85fdda1 içe aktarma: DOCTYPE taşıyan belgeyi reddet
```

İki dal **ıraksadı (divergence)**: her birinde öbüründe olmayan bir commit var ve sayılar bunu `1 1` diye söylüyor. Şekil 2 durumu ve iki reddi birlikte gösteriyor.

![a klonu, git fetch sonrası: main ile origin/main ıraksadı. Oklar Git'in yönünde. 31ad836 1.4.0 adayı ve 85fdda1 XXE yaması ortak geçmiş; 85fdda1'in iki çocuğu var. Üstte vurgulu eacea0f fatura notu: main ve HEAD onu gösteriyor, uzak depoda yok. Altta vurgulu 120d7b5 1.4.0-rc.2: kesikli origin/main onu gösteriyor, a'nın main'inde yok. Sağda sayım: main...origin/main, sol 1 · sağ 1. Altta iki ret: git push, uzaktaki main'i eacea0f'e taşımak 120d7b5'i düşürürdü (fetch first); git pull (--ff-only), main'i 120d7b5'e taşımak eacea0f'i düşürürdü (çıkış 128). Son satır: ileri sarma ancak dalın şu anki commit'i yenisinin atasıysa mümkün; ıraksamada ikisi de değil.](assets/iraksama-iki-ret.svg "Şekil 2 — Iraksamada iki yön de reddedilir: ne push ne pull bir commit'i düşürür")

İlk ret uzak depoyu korudu. `a`'nın `push`'u uzaktaki `main`'i `eacea0f`'e taşıyacaktı; `120d7b5`, `eacea0f`'in atası olmadığı için bu bir ileri sarma değildi ve kabul edilseydi güvenlik ekibinin commit'i uzak `main`'den düşerdi. Başka bir gün aynı ret yamanın kendisini korur. İkinci ret senin klonunu korudu: varsayılan `--ff-only` ile `pull`, `main`'i `120d7b5`'e saramazdı, çünkü o zaman `eacea0f` dalın geçmişinden düşerdi. Ret iki yönde de aynı ilkeden geliyor: ileri sarma ancak dalın şu an gösterdiği commit, yeni commit'in atasıysa mümkündür; ıraksamada iki yön için de bu koşul sağlanmaz.

İki reddin ortak dersi, kararın sana bırakıldığıdır. Git ıraksamayı senin yerine çözmedi; iki geçmişin bir birleştirme commit'iyle mi yoksa yeniden yazılarak mı bir araya geleceği ayrı bir karardır ve birleştirme konusunun içeriğidir. Reddi bir engel gibi görüp aşmak da mümkün; kılavuz `--force` ile göndermeyi, geçmiş kaybetmeyi bilerek istediğin durumlara ayırır. Bunun hangi koşulda ve nasıl güvenli yapıldığı ise kod kaybetmeden geri almayı işlerken ele alınacak. Varsayılan davranışın kendisi de bir güvenlik ağıdır: ne `push` ne `pull`, kimseye sormadan bir commit'i düşürür.

## "Güncelim" ne zaman bir kanıttır?

Bu yazıdaki komutları neyi taşıdıklarına göre bir araya getirince tablo kısa:

| Komut | Taşıdığı ref | Ağ ve çalışma ağacı |
|---|---|---|
| `git status`, `git branch -vv` | Hiçbiri; iki yerel ref'i karşılaştırır | Ağa çıkmaz, çalışma ağacını değiştirmez |
| `git ls-remote origin` | Hiçbiri; uzak ref'leri listeler | Ağa çıkar, yalnızca okur |
| `git fetch` | Uzak izleme dalları (`origin/*`) | Ağa çıkar, çalışma ağacına dokunmaz |
| `git pull` | Önce `fetch`'in taşıdıkları, sonra yalnızca geçerli dal | Ağa çıkar, çalışma ağacını değiştirir |
| `git push` | Uzak depodaki dal ve senin `origin/<dal>` kaydın | Ağa çıkar, çalışma ağacını değiştirmez |

> **Teşhis et:** Sürüm betiği şu satırlarla başlıyor ve ekip onu "güncel `main`'den aday yap" diye özetliyor. Bu betik hangi iki durumda yamasız ya da incelenmemiş bir aday üretir?

```bash
git fetch origin || true
if [ "$(git rev-list --count main..origin/main)" -eq 0 ]; then ./aday-yap.sh main; fi
```

İki durumu da deney deposunda ürettik. Birincisi, uzak depoya ulaşılamadığında: `|| true` başarısız `fetch`'i yutar, `origin/main` son başarılı getirme anında kalır ve karşılaştırma eskimiş bir kayda karşı yapılır. Uzak depoda yama varken betik, yamasız `main` için "geride değil" der ve aday yapar; hata yolunu incelediğimiz yazının diliyle bu, karar alınamadığında izin vermek, yani fail-open. İkincisi, `a`'nın `main`'inde gönderilmemiş bir commit olduğunda: `main..origin/main` yalnızca "geride miyim" sorusunu sorar; önde olmak sayıyı sıfır bırakır ve aday, kimsenin incelemediği yerel bir commit'i de içerir. Betik üstelik adayı bir dal adından yapıyor; Git'in zihinsel modelini kurduğumuz yazıdaki gibi, kaydedilmesi gereken şey bir commit kimliğidir. İyi bir cevap `fetch`'in başarısını şart koşar ve başarısızlığı karar alınamadı diye ayrı ele alır; adayı yerel `main`'den değil, `origin/main`'in o anda çözümlenmiş tam kimliğinden yapar ve bu kimliği imaja yazar. Yerel `main` karara hiç girmez; girecekse iki yön birlikte sayılır ve `--left-right --count main...origin/main` 0 0 değilse betik durur. Zayıf cevap `|| true`'yu kaldırmakla yetinir; ilk durumu kapatır, ikincisini açık bırakır.

Düzeltilmiş başlangıç kısa ve iki sonucu ayrı veriyor; deney deposunda uzak depoyu bir an erişilemez kılarak ikisini de görebilirsin:

```bash
# Nerede: a klonu (sürüm hattında: kaynak deposunun klonu) · Önkoşul: uzak depoya okuma erişimi
# Değişen durum: origin/* kayıtları; deneme için uzak depo bir an yeniden adlandırılıp geri alınır
# Veri kaybı riski: yok · Doğrulama: çıktı ve dönüş kodu
aday_kimligi() {  # başarıyla tazelenmiş origin/main'in tam kimliği; aday bu kimlikten yapılır
  git fetch -q origin 2>/dev/null || { echo "karar alınamadı: fetch başarısız"; return 2; }
  git rev-parse --verify -q 'origin/main^{commit}' || { echo "karar alınamadı: origin/main yok"; return 2; }
}
aday_kimligi; echo "dönüş: $?"
mv ../origin.git ../origin-erisilemez.git && aday_kimligi; echo "dönüş: $?"; mv ../origin-erisilemez.git ../origin.git
```

```text
120d7b5e15ba0cba3df3d4a96ee998cff81a34ce
dönüş: 0
karar alınamadı: fetch başarısız
dönüş: 2
```

Buradan çıkan kural, "güncelim" cümlesinin kendi başına bir kanıt olmadığıdır: o, belirli bir anda getirilmiş bir görüntüyle belirli bir yerel dalın karşılaştırmasıdır ve ancak üç koşulla bir karara dayanak olur. Getirme yeni yapılmış ve başarıyla dönmüş olmalı. Karşılaştırma iki yönü de saymalı. Karar da bir dal adına değil, o görüntüde çözümlenmiş bir commit kimliğine bağlanmalı. Bu koşullarla bile görüntü bir andır; getirmeden bir saniye sonra başka biri gönderebilir. Bu yüzden yama için kurduğumuz sürüm kapısı uzak depodaki dalı değil, imajın kaydettiği commit'i sorgular. Bir de bakım notu: uzak depoda silinen dallar, `fetch --prune` ile temizlenmedikçe klonunda `origin/<dal>` olarak kalmaya devam eder; Git'in kılavuzu `--prune`'u, uzak depoda artık bulunmayan uzak izleme ref'lerini getirmeden önce silen seçenek diye tanımlar.

## Karar kartı

- **Varsayım:** "`origin/main`, uzak depodaki `main`'in canlı görüntüsüdür ve `pull` bütün dalları günceller."
- **Güven sınırı:** Klonunun son iletişimde öğrendiği ile uzak deponun şu an tuttuğu arasındaki durum sınırı; ayrıca her yerel dal ile onun yukarı akış dalı arasındaki sınır.
- **Karar:** Uzak depo hakkındaki her karar önce başarısı denetlenen bir `fetch` ile tazelenir; başarısız getirme "karar alınamadı"dır, "güncel" değil. Sürüm adayı `origin/main`'in o anda çözümlenmiş commit kimliğinden yapılır. Bir dalı tabana getirmek ayrı ve bilinçli bir bütünleştirmedir; ekip `pull.ff` ya da `pull.rebase` davranışını açıkça seçer; reddedilen `push` aşılmaz, önce getirilir ve incelenir.
- **Somut risk:** Eskimiş `origin/main`'e bakılarak yamasız bir `main`'den aday yapılması; `pull`'un fatura dalını güncellediğinin sanılması; reddi aşmak için zorlanan bir gönderimin başkasının commit'ini, yamanın kendisi dahil, uzak `main`'den düşürmesi.
- **Doğrulanabilir özellik:** Başarıyla dönen bir `git fetch`'ten hemen sonra `git rev-list --left-right --count main...origin/main` 0 0 verir; bir dalın yamayı içerdiği `git merge-base --is-ancestor <yama> <dal>` ile 0 döner; uzak dal yalnızca ileri sarılarak değişir.
- **Negatif test:** Deney deposunda `fetch`'siz `git status` "up to date" derken `git ls-remote` başka bir commit gösterir; ıraksamış `main`'de yapılandırmasız `pull` 128 ile durur; ıraksamış `main`'in `push`'u "fetch first" ile reddedilir ve uzak `main` değişmez; uzak depo erişilemezken sürüm betiği aday üretmez.
- **Üretimde sinyal:** Sürüm betiklerinde başarısız `fetch` ayrı bir "karar alınamadı" sonucu olarak sayılır; reddedilen `push`'lar ve ıraksama uyarıları görünür kalır; aday kaydında `origin/main`'in çözümlendiği kimlik ve an birlikte yazılır.
- **Kalan risk:** Getirilmiş görüntü bile bir andır; getirmeden hemen sonra başka bir gönderim gelebilir. `--ff-only` geçmişi korur, anlamsal çatışmayı yakalamaz: iki ayrı doğru değişiklik birlikte yanlış olabilir. Depoyu okuyabilen herkes dallarını da okuyabilir. Ret bilerek zorlanırsa bu koruma kalkar.

### Sırada ne var

Iraksayan iki `main` bu yazıda bilerek çözülmeden kaldı: Git iki yönde de ileri sarmayı reddetti ve karar bize düştü. Fatura dalının yamayı alması da aynı kararı bekliyor. Sıradaki yazı bu kararı ele alıyor: iki geçmiş bir birleştirme commit'iyle mi, commit'leri yeni tabanın üstünde yeniden yazan rebase ile mi, yoksa bütün değişikliği tek bir commit'e indiren squash ile mi bir araya getirilir ve her biri grafikte ve commit kimliklerinde neyi değiştirir?

## Kaynakça

- Git projesi. *git-fetch Documentation* (son güncelleme: Git 2.56.0) — `--prune`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-fetch)
- Git projesi. *git-pull Documentation* (son güncelleme: Git 2.55.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-pull)
- Git projesi. *git-push Documentation* (son güncelleme: Git 2.55.0) — Push Rules, Note about Fast-Forwards, Security. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-push)
- Git projesi. *git-ls-remote Documentation* (son güncelleme: Git 2.48.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-ls-remote)
- Git projesi. *git-rev-list Documentation* (son güncelleme: Git 2.56.0) — `--left-right`, `--count`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-rev-list)
- Git projesi. *gitrevisions Documentation* (son güncelleme: Git 2.56.0) — simetrik fark yazımı. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/gitrevisions)
- Git projesi. *gitglossary Documentation* (son güncelleme: Git 2.56.0) — bare repository, fast-forward, refspec, remote-tracking branch, upstream branch. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/gitglossary)
- Chacon, S. & Straub, B. *Pro Git* (2. baskı) — 2.5 Working with Remotes, 3.5 Remote Branches. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/book/en/v2)
