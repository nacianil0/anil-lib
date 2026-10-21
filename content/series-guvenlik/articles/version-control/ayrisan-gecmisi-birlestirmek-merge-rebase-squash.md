---
article_id: article_d744e106-9960-42fc-9d48-922c4a35e94c
title: "Ayrışan Geçmişi Birleştirmek: Merge, Rebase ve Squash Neyi Değiştirir?"
slug: ayrisan-gecmisi-birlestirmek-merge-rebase-squash
category: version-control
level: advanced
reading_order: 7
summary: "Iraksamış yerel main ile XXE yamasını almamış fatura dalını aynı deney deposunda bir araya getirir. Birleştirme tabanını ve üç yollu birleştirmeyi kurar; rebase'in aynı değişikliği yeni kimlikli commit'lerle yazdığını, birleştirme commit'inin ata ilişkisi kurduğunu, squash'ın kurmadığını gösterir. GitHub'ın üç birleştirme yönteminin aynı dosya ağacını üç ayrı geçmişle ürettiğini, paylaşılmış dalın neden birleştirme commit'iyle güncellendiğini, kendi tarafını seçen çatışma çözümünün yamayı nasıl düşürdüğünü ve squash'tan sonra yaşayan dalın neden çatıştığını işler."
tags:
  - git
  - birlestirme-tabani
  - rebase
  - squash
  - birlestirme-catismasi
content_hash: sha256:698d11681c6223b4ef5bf7a69ae9bdda150057b30e065bf8d1e51ba56e754195
classification_version: 1
classification_batch: 3
---
## İki ret, iki karar

Uzak depoyla eşitlenmeyi işlediğimiz yazı, fatura geliştiricisinin klonunda iki açık işle bitti. 21 Ekim sabahı yerelde yaptığı belge commit'i `eacea0f`, güvenlik ekibinin 09.15'te gönderdiği `120d7b5` ile ıraksadı ve Git iki yönde de ileri sarmayı reddetti. Fatura dalı `feature/fatura-pdf` ise o sabah uzak depoya gönderildi ve XXE yamasını, `85fdda1`'i, hâlâ içermiyor. Saat 10.30'da geliştiricinin önünde iki karar var: iki `main`'i nasıl bir araya getireceği ve yamayı fatura dalına nasıl taşıyacağı. Ekipte yaygın cevap tek cümle: "Merge de rebase de aynı kodu verir, rebase geçmişi yalnızca daha temiz gösterir; squash da değişikliği tek commit'e indirir, o kadar."

Cümlenin bir yarısı doğru ve deneyde görünüyor: üç yöntem de bayt bayt aynı dosya ağacını üretebilir. Yanlış olan yarısı geçmişle ilgili ve güvenlik kararlarımız geçmişe dayanıyor. Git'in zihinsel modelini kurduğumuz yazıda "yama yapıda mı?" sorusunu commit kimliğine ve ata ilişkisine bağladık; sürüm kapısı imajın kaydettiği kimliği sorguluyor. Bir birleştirme yöntemi kimlikleri değiştiriyorsa ya da ata ilişkisi kurmuyorsa, aynı dosyalara bakarken bu kanıt başka bir şey söyler. Korunacak varlık yine üretime giden kodun yamayı içermesi; buna paylaşılmış geçmişin kendisi ekleniyor, yani başkalarının üzerine iş kurduğu commit'lerin yerinde kalması. Saldırganın yeteneği değişmedi: içe aktarma yetkisi olan herhangi bir kullanıcı, yamanın düştüğü her yapıda sunucudaki bir dosyayı belgeye çekebilir. Yamayı düşürmek için kötü niyet de gerekmiyor, yanlış çözülmüş bir çatışma yetiyor. Güven sınırı bir durum sınırı: yalnızca senin klonunda duran, gönderilmemiş commit'ler ile başkalarının da sahip olduğu geçmiş arasında. Kırılan varsayım: "Birleştirme yöntemi bir görünüm tercihidir."

## Birleştirme tabanı: üç anlık görüntü

Önce durumu aynı kimliklerle yeniden kuralım. Kurulum uzak depo yazısının adımlarını sıkıştırıyor; `olarak` yardımcısı, rebase ve birleştirme sırasında yazılan yeni commit'lerin de adını ve tarihini sabitliyor.

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.38 ya da sonrası
# Değişen durum: yalnızca bu klasör: origin.git (bare depo), a ve b klonları · Veri kaybı riski: yok
# Doğrulama: grafik, uzak depo yazısının sonundaki durumla aynı olmalı
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
yaz import/xml.ts 'export const parseOptions = {};'
kaydet gelistirici-b 2026-10-12T10:00:00+03:00 "içe aktarma: XML uç noktası"
yaz import/xml.ts 'export const parseOptions = { noent: true };'
kaydet gelistirici-b 2026-10-15T14:20:00+03:00 "içe aktarma: müşteri varlıkları için noent"
yaz VERSION '1.4.0-rc.1' && kaydet gelistirici-b 2026-10-19T09:00:00+03:00 "sürüm: 1.4.0 adayı"
git push -q origin main && cd ..
git clone -q origin.git a && cd a && git switch -q -c feature/fatura-pdf      # 19 Ekim
yaz fatura/pdf.ts 'export const template = "fatura-v1";'
kaydet gelistirici-a 2026-10-19T16:45:00+03:00 "fatura: PDF şablonu"
cd ../b && yaz import/xml.ts 'export const parseOptions = {};' 'export const rejectDoctype = true;'
kaydet gelistirici-b 2026-10-20T11:30:00+03:00 "içe aktarma: DOCTYPE taşıyan belgeyi reddet"
git push -q origin main && cd ../a                                            # 20 Ekim: yama
git switch -q main && git pull -q && git push -q -u origin feature/fatura-pdf # 21 Ekim sabahı
cd ../b && yaz VERSION '1.4.0-rc.2' && kaydet gelistirici-b 2026-10-21T09:15:00+03:00 "sürüm: 1.4.0 adayı 2"
git push -q origin main && cd ../a
yaz docs/fatura.md '# Fatura' && kaydet gelistirici-a 2026-10-21T10:05:00+03:00 "belge: fatura notu"
git fetch -q && git log --oneline --graph --all --decorate
```

```text
* eacea0f (HEAD -> main) belge: fatura notu
| * 120d7b5 (origin/main, origin/HEAD) sürüm: 1.4.0 adayı 2
|/
* 85fdda1 içe aktarma: DOCTYPE taşıyan belgeyi reddet
| * f8db4cb (origin/feature/fatura-pdf, feature/fatura-pdf) fatura: PDF şablonu
|/
* 31ad836 sürüm: 1.4.0 adayı
* 8a819d8 içe aktarma: müşteri varlıkları için noent
* 825fed9 içe aktarma: XML uç noktası
```

İki ucu bir araya getirmenin ilk adımı, nerede ayrıldıklarını bulmaktır:

```bash
# Nerede: a klonu, main · Önkoşul: kurulum · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: ilk satır iki ucun ortak atası; iki diff, her ucun o atadan beri değiştirdiği dosya
git merge-base main origin/main
git diff --stat 85fdda1 main
git diff --stat 85fdda1 origin/main
```

```text
85fdda1d575828f6e293fbbea1f2de3fbb269f37
 docs/fatura.md | 1 +
 1 file changed, 1 insertion(+)
 VERSION | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Kılavuz `git merge-base`'i iki commit arasında, üç yollu bir birleştirmede kullanılacak en iyi ortak atayı bulan komut diye tanımlar. Bu ortak ata **birleştirme tabanıdır (merge base)**; burada yamanın kendisi, `85fdda1`. **Üç yollu birleştirme (three-way merge)** adını üç anlık görüntüden alır. Pro Git'in anlatımıyla Git iki dal ucunun gösterdiği anlık görüntüleri ve onların ortak atasını kullanır; karşılaştırılan şey iki uç değil, her ucun tabandan bu yana yaptığı değişikliktir. Yerel `main` tabandan beri yalnızca `docs/fatura.md`'yi ekledi, uzak `main` yalnızca `VERSION`'ı değiştirdi. Git'in kılavuzu kuralı şöyle koyar: bir tarafın değiştirip öbürünün dokunmadığı alanlar sonuca olduğu gibi girer; iki taraf aynı alanı farklı biçimde değiştirdiyse Git birini seçmez, kararı sana bırakır. Bu ikinci duruma **birleştirme çatışması (merge conflict)** denir. Buradaki iki değişiklik ayrı dosyalarda, çatışma yok.

İki ucu bir araya getirmenin iki yolu var. Birincisi bir **birleştirme commit'i (merge commit)**. Git'in sözlüğüne göre ileri sarma olmayan başarılı bir birleştirme, ebeveynleri birleştirilen dalların uçları olan yeni bir commit üretir; var olan commit'lere dokunulmaz, hepsi kimliğini korur. İkincisi rebase; kılavuzun tanımıyla bir dizi commit'i başka bir başlangıç noktasının üstüne taşımak. Hangisinin doğru olduğunu tek bir soru belirler: bu commit'lere senden başka kim sahip? `eacea0f`'in gönderimi reddedildiği için o yalnızca `a`'da duruyor. Pro Git'in rebase için koyduğu kural da tam bu sınırı çizer: deponun dışında var olan ve başkalarının üzerine iş kurmuş olabileceği commit'leri rebase etme. `eacea0f` sınırın içinde.

## Rebase: aynı değişiklik, yeni commit

```bash
# Nerede: a klonu, main · Önkoşul: main'de commit edilmemiş değişiklik yok
# Değişen durum: main ref'i, hazırlık alanı ve çalışma ağacı · Veri kaybı riski: yok; eski commit artık
# hiçbir dalda değil ama klonda duruyor · Doğrulama: grafikte tek çizgi ve yeni bir kimlik
olarak gelistirici-a 2026-10-21T10:30:00+03:00 rebase -q origin/main
git log --oneline --graph --decorate -3
```

```text
* 66098e2 (HEAD -> main) belge: fatura notu
* 120d7b5 (origin/main, origin/HEAD) sürüm: 1.4.0 adayı 2
* 85fdda1 içe aktarma: DOCTYPE taşıyan belgeyi reddet
```

Grafik artık tek çizgi ve belge commit'i `120d7b5`'in üstünde. Ama oradaki commit `eacea0f` değil; mesajı aynı, kimliği `66098e2` olan yeni bir commit. Kılavuz rebase'i adım adım böyle tarif eder: dalda olup hedefte olmayan commit'leri listeler, hedefe geçer, commit'leri sırayla yeniden uygular ve dalı en son yazılan commit'e taşır. Her yeniden uygulama yeni bir commit yazar.

```bash
# Nerede: a klonu, main · Önkoşul: rebase · Değişen durum: uzak depodaki main ve origin/main
# Veri kaybı riski: yok (gönderim bir ileri sarma) · Doğrulama: tree, parent ve committer satırları farklı,
# iki patch-id aynı; son satırda uzak main 120d7b5'ten 66098e2'ye ilerler
git cat-file -p eacea0f | head -4
git cat-file -p HEAD | head -4
git show eacea0f | git patch-id
git show HEAD | git patch-id
echo "eacea0f'i içeren dal sayısı: $(git branch -a --contains eacea0f | wc -l)"
git push 2>&1
```

```text
tree 6227413e26d10d2320423e2fa0fd3212488fb708
parent 85fdda1d575828f6e293fbbea1f2de3fbb269f37
author gelistirici-a <gelistirici-a@example.test> 1792566300 +0300
committer gelistirici-a <gelistirici-a@example.test> 1792566300 +0300
tree 9cb252b3b54c54f4837214a0a3f0a7f79d7112e5
parent 120d7b5e15ba0cba3df3d4a96ee998cff81a34ce
author gelistirici-a <gelistirici-a@example.test> 1792566300 +0300
committer gelistirici-a <gelistirici-a@example.test> 1792567800 +0300
3ad660dc0ae8b6050a78fa3913bdea5997181726 eacea0f57b10df193187520b339919f1c0818b03
3ad660dc0ae8b6050a78fa3913bdea5997181726 66098e202e28612ef9749ba76cb8422f0e121d25
eacea0f'i içeren dal sayısı: 0
To …/origin.git
   120d7b5..66098e2  main -> main
```

Git'in zihinsel modelini kurduğumuz yazıda commit kimliğinin, `cat-file`'ın gösterdiği metnin içerik özeti olduğunu `hash-object` ile hesaplamıştık; yazar adındaki tek bir harf başka bir kimlik veriyordu. Burada metnin üç satırı birden değişti. `parent` artık `120d7b5`. `tree` da değişti, çünkü yeni anlık görüntü eski değişikliği yeni tabanın üstünde taşıyor ve o tabanda `VERSION` dosyası `1.4.0-rc.2` diyor. `committer` satırındaki zaman rebase anı, 10.30; `author` satırı 10.05'teki hâliyle kaldı. Rebase yazarı korur, commit'i yapanı yeniler. `git patch-id`'nin iki satırı ise aynı. Komut bir commit'in getirdiği farkın, satır numaraları dışarıda bırakılarak hesaplanan özetini verir; kılavuz onu olası kopya commit'leri bulmak için önerir. Değişiklik aynı, commit başka.

`eacea0f` hiçbir dalda kalmadı ama yok da olmadı: `a`'nın nesne veritabanında duruyor. Ona nasıl dönüleceği ve orada ne kadar kalacağı, kod kaybetmeden geri almayı işlerken ele alınacak. Gönderim bu kez kabul edildi, çünkü yeni commit uzak dalın gösterdiği `120d7b5`'in torunu ve uzak `main` yalnızca ileri sarıldı. Gündelik işte aynı adım getirmeyle birlikte `git pull --rebase` ile yapılır; kılavuza göre seçenek, getirmeden sonra geçerli dalı yukarı akış dalının üstüne rebase eder ve uzak depo yazısında andığımız `pull.rebase` ayarı onu varsayılan kılar. Yeniden yazılan, yukarı akışta olmayan yerel commit'lerdir; ayar ancak o commit'ler başka bir yere gönderilmemişken güvenlidir.

## Üç birleştirme yöntemi, tek ağaç

Fatura geliştiricisi dalına bir commit daha ekliyor: KDV satırı. Dalın üzerinde bir **PR (pull request)** açık. GitHub'ın belgesine göre PR, bir daldaki kod değişikliklerinin başka bir dala birleştirilmesini önerir; inceleme ve otomatik kontroller onun üzerinde yürür. Ayrıntısı ekip akışı konusunun içeriği; burada yalnızca sonundaki birleştirme düğmesi önemli. GitHub o düğmede üç yöntem sunar. "Create a merge commit" dalın bütün commit'lerini `--no-ff` ile, yani ileri sarma mümkün olsa bile bir birleştirme commit'iyle tabana ekler. "Squash and merge" PR'ın bütün commit'lerini tabanda tek bir commit'e indirir. "Rebase and merge" her commit'i birleştirme commit'i olmadan, tek tek tabanın üstüne ekler. Üçünün yerel karşılığını aynı başlangıçtan, `main`'in ucunda açılan üç deneme dalında üretelim. Dal bir işaretçi olduğu için bunlar kopya değil, üç ayrı son için üç yer imi.

```bash
# Nerede: a klonu · Önkoşul: önceki adımlar · Değişen durum: fatura dalında yeni bir commit (uzak depoya da
# gönderilir); yalnızca a'da üç deneme dalı ve dört yeni commit · Veri kaybı riski: yok
# Doğrulama: üç sonun ağacı aynı; fatura dalının ucu yalnızca birinde ata
git switch -q feature/fatura-pdf
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdv = "toplam";'
kaydet gelistirici-a 2026-10-21T10:40:00+03:00 "fatura: KDV satırı" && git push -q
git switch -q -c son/merge origin/main          # GitHub: Create a merge commit
olarak gelistirici-a 2026-10-21T11:00:00+03:00 merge -q --no-ff --no-edit feature/fatura-pdf
git switch -q -c son/squash origin/main         # GitHub: Squash and merge
git merge -q --squash feature/fatura-pdf
kaydet gelistirici-a 2026-10-21T11:00:00+03:00 "fatura: PDF şablonu ve KDV satırı"
git switch -q -c son/rebase feature/fatura-pdf  # GitHub: Rebase and merge
olarak gelistirici-a 2026-10-21T11:00:00+03:00 rebase -q origin/main
for son in son/merge son/squash son/rebase; do
  git merge-base --is-ancestor feature/fatura-pdf "$son"; rc=$?
  echo "$son: ağaç $(git rev-parse --short "$son^{tree}") · fatura dalının ucu atası mı: $rc"
done
git log --oneline --graph son/merge -4
git log --oneline son/squash -2
git log --oneline son/rebase -3
```

```text
Automatic merge went well; stopped before committing as requested
Squash commit -- not updating HEAD
son/merge: ağaç 90c95de · fatura dalının ucu atası mı: 0
son/squash: ağaç 90c95de · fatura dalının ucu atası mı: 1
son/rebase: ağaç 90c95de · fatura dalının ucu atası mı: 1
*   08bfade Merge branch 'feature/fatura-pdf' into son/merge
|\
| * ad2634c fatura: KDV satırı
| * f8db4cb fatura: PDF şablonu
* | 66098e2 belge: fatura notu
4f3df21 fatura: PDF şablonu ve KDV satırı
66098e2 belge: fatura notu
b1ba17d fatura: KDV satırı
9f65d7a fatura: PDF şablonu
66098e2 belge: fatura notu
```

![Üç satır, aynı başlangıç: main 66098e2, feature/fatura-pdf f8db4cb ve ad2634c. Oklar Git'in yönünde, her commit ebeveynini gösterir; vurgulu kutu yöntemin yazdığı yeni commit. 1, birleştirme commit'i, GitHub'da Create a merge commit, son/merge: 08bfade iki ebeveynli, 66098e2'yi ve ad2634c'yi gösteriyor; ağaç 90c95de, dal ucu ata mı: 0; f8db4cb ve ad2634c kendi kimlikleriyle geçmişte. 2, squash, Squash and merge, son/squash: 4f3df21 yalnızca 66098e2'yi gösteriyor; ağaç 90c95de, ata mı: 1; iki commit'in değişikliği tek commit'te, dala bağ yok. 3, rebase, Rebase and merge, son/rebase: 9f65d7a ve b1ba17d, 66098e2'nin üstünde; ağaç 90c95de, ata mı: 1; aynı değişiklik yeni kimlikle, dala bağ yok. Alt not: üç sonda dosyalar aynı, geçmiş farklı; fark, dal ucunun sondan ulaşılabilir olup olmadığında.](assets/uc-son-tek-agac.svg "Şekil 1 — Üç birleştirme yöntemi aynı ağacı üç ayrı geçmişle üretir")

Üç sonun ağacı da `90c95de`: üç yöntem bayt bayt aynı dosyaları üretti. Fark yalnızca geçmişte ve Şekil 1 onu gösteriyor. Birleştirme commit'i `08bfade`, fatura dalının commit'lerine kendi kimlikleriyle ebeveyn bağı kurdu; dalın ucu `ad2634c` sonun atası oldu ve `--is-ancestor` 0 döndü. Squash commit'i `4f3df21` tek ebeveynli; iki commit'in bütün değişikliğini taşıyor ama ikisine de bağı yok. Kılavuz `--squash`'ı tam böyle tanımlar: çalışma ağacını ve hazırlık alanını gerçek bir birleştirme olmuş gibi hazırlar, ama commit yapmaz, HEAD'i taşımaz ve birleştirme bilgisini kaydetmez; çıktıdaki "Squash commit -- not updating HEAD" satırı bunu söylüyor, commit'i biz yaptık. Rebase sonu iki yeni commit yazdı: `9f65d7a` ve `b1ba17d` fatura commit'leriyle aynı değişikliği taşıyor, kimlikleri farklı. Burada dal `main`'in ucundan ayrıldığı için yerel rebase de commit'leri yeniden yazmak zorundaydı. GitHub'ın "Rebase and merge"ü bir adım daha ileri gider: belgesine göre dal zaten tabanın üstünde olsa bile commit'i yapan bilgisini günceller ve her zaman yeni kimlikler üretir; yerelde `git rebase` o durumda commit'lere dokunmaz.

Bu fark üç pratik sonuca dönüşüyor. Birincisi, "bu dal birleşti mi?" sorusunun Git'teki cevabı yalnızca birleştirme commit'inde evet. Squash ya da rebase ile birleşen dalın commit'leri `main`'den ulaşılamaz; dalın birleştiğini Git değil, PR kaydı söyler. İkincisi, bir kimliğe bağlanmış kanıt yönteme göre anlam değiştirir. Dalın ucundan yapılmış bir önizleme imajının `org.opencontainers.image.revision` ek açıklaması `ad2634c` diyorsa, squash'tan sonra `git merge-base --is-ancestor ad2634c main` içerik `main`'de olduğu hâlde 1 döner. Sürüm kapısının dal uçlarını değil, `main`'in kendi commit'lerini sorgulaması bu yüzden. Üçüncüsü, her yöntem farklı bilgi kaybeder. GitHub'ın belgesi squash'ın bedelini açıkça yazar: değişikliklerin ilk ne zaman yapıldığı ve squash edilen commit'leri kimin yazdığı bilgisi kaybolur. "Rebase and merge" ile tabana eklenen commit'ler ise commit imzası doğrulanmadan eklenir; GitHub bu commit'leri yeniden yazar ama yazanın imza anahtarına sahip değildir. Yöntem seçimi bu yüzden bir görünüm tercihi değil, ekip ve depo düzeyinde verilen bir karar.

## Paylaşılmış dalı güncellemek

Fatura dalının sorusu başka bir yönde. Yama `main`'e zaten girdi, ama dalın kendisi onu içermiyor; dalın önizleme yapıları ve testleri yamasız kod üzerinde koşuyor. Bu, tabandan dala doğru bir bütünleştirme ve GitHub onu PR sayfasında iki biçimde sunar: belgesine göre "Update branch" taban dalı PR'ın dalına birleştirir, "Update with rebase" değişiklikleri tabanın son hâlinin üstüne rebase eder. Düğmeyi PR'ın dalının bulunduğu depoda yazma yetkisi olanlar kullanabilir; dal korumalıysa düğme kullanılamayabilir. GitHub CLI'da aynı iş `gh pr update-branch` ile yapılır, varsayılan olarak birleştirme commit'iyle, `--rebase` verilirse rebase ederek. Fatura dalı bu sabahtan beri uzak depoda; rebase'li güncellemenin sonucunu deneme dalı zaten gösteriyor:

```bash
# Nerede: a klonu · Önkoşul: önceki adımlar · Değişen durum: fatura dalında bir birleştirme commit'i;
# uzak depodaki fatura dalı ve origin/feature/fatura-pdf · Veri kaybı riski: yok (reddedilen gönderim
# hiçbir şeyi değiştirmez) · Doğrulama: ilk gönderim reddedilir; yeni commit'in iki ebeveyni var, yama dalda
git push origin son/rebase:feature/fatura-pdf 2>&1 | sed -n '1,2p'; echo "push çıkış: ${PIPESTATUS[0]}"
git switch -q feature/fatura-pdf && git merge-base HEAD origin/main
olarak gelistirici-a 2026-10-21T11:10:00+03:00 merge --no-edit origin/main
git log -1 --format='%h ebeveynler: %p'
git merge-base --is-ancestor 85fdda1 HEAD; echo "yama dalda mı: $?"
git push 2>&1
```

```text
To …/origin.git
 ! [rejected]        son/rebase -> feature/fatura-pdf (non-fast-forward)
push çıkış: 1
31ad8365c94a74ada11e6bdc544e0b5ecb06d091
Merge made by the 'ort' strategy.
 VERSION        | 2 +-
 docs/fatura.md | 1 +
 import/xml.ts  | 3 ++-
 3 files changed, 4 insertions(+), 2 deletions(-)
 create mode 100644 docs/fatura.md
3bfd1a1 ebeveynler: ad2634c 66098e2
yama dalda mı: 0
To …/origin.git
   ad2634c..3bfd1a1  feature/fatura-pdf -> feature/fatura-pdf
```

İlk satır sonucu tek başına söylüyor. Rebase edilmiş dal eski dalın torunu değil, ondan ayrılan yeni bir çizgi; uzak depodaki `ad2634c` yeni ucun atası olmadığı için gönderim bir ileri sarma değil ve uzak depo yazısındaki kuralla reddediliyor. Reddi aşmanın yolu bir **zorla push (force push)**, yani uzak dalı ileri sarma olmadan taşıyan bir gönderim; onun hangi biçiminin başkasının işini ezmediği geri alma konusunun içeriği. Ama ret sorunun yalnızca görünen kısmı. Git'in kılavuzu, başkalarının üzerine iş kurduğu bir dalı rebase etmeyi ya da başka bir biçimde yeniden yazmayı açıkça kötü bir fikir sayar: o dalın aşağısındaki herkes kendi geçmişini elle düzeltmek zorunda kalır. Pro Git sonucunu da anlatır: rebase var olan commit'leri bırakıp onlara benzeyen ama farklı yenilerini yaratır; eski commit'lerin üzerine iş kurmuş biri yeniden yazılmış dalı çektiğinde aynı yazarı, tarihi ve mesajı taşıyan iki commit görür ve onları yeniden birleştirebilir. Kimlikler başka kayıtlarda da durur: dal uçlarına bağlanmış yapılar, test sonuçları, inceleme yorumları. Dalı yeniden yazmak bu kayıtları gösterdikleri commit'ten koparır. Paylaşılmış dal bu yüzden birleştirme commit'iyle güncellenir.

Birleştirme commit'i `3bfd1a1`'in iki ebeveyni var: dalın önceki ucu `ad2634c` ve `main`'in ucu `66098e2`. Birleştirme tabanı `31ad836`'ydı ve tabandan beri fatura dalı yalnızca `fatura/` altına, `main` başka dosyalara dokunduğu için çatışma çıkmadı. Git'in zihinsel modelini kurduğumuz yazıdaki toplantıdan beri açık duran soru da kapandı: `--is-ancestor 85fdda1` fatura dalı için 0 dönüyor. Dal yamayı kendiliğinden almadı; onu bir birleştirme commit'i getirdi.

> **Teşhis et:** İçe aktarma ekibinden bir geliştiricinin dalı 19 Ekim'de `main`'den açılmış ve aynı satıra `noblanks: true` eklemiş. Dalı `origin/main` ile güncellerken Git `import/xml.ts`'te çatışma bildiriyor ve dosyada aşağıdaki bölümü gösteriyor. Geliştirici "son değişiklik benimki" diyerek kendi tarafını seçiyor (`git checkout --ours import/xml.ts`), birleştirmeyi tamamlıyor ve kanıt olarak `git merge-base --is-ancestor 85fdda1 HEAD`'in 0 döndüğünü yazıyor. Yama bu dalda mı?

```text
<<<<<<< HEAD
export const parseOptions = { noent: true, noblanks: true };
=======
export const parseOptions = {};
export const rejectDoctype = true;
>>>>>>> origin/main
```

Geçmişte evet, dosyada hayır. Birleştirme commit'inin ikinci ebeveyni `origin/main`'in ucu ve `85fdda1` onun atası; `--is-ancestor` doğruyu söylüyor. Ama birleştirmenin anlık görüntüsünde `noent: true` geri geldi ve `rejectDoctype` satırı yok: `git grep -n -e noent -e rejectDoctype HEAD -- import/xml.ts` yalnızca ilk satırı buluyor. Varsayılan çatışma biçimi iki tarafı gösterir, tabanı göstermez; bu yüzden "hangisi daha yeni?" doğru soru gibi görünür. `merge.conflictStyle` ayarı `zdiff3` olduğunda aynı bölüme tabanın satırı da eklenir: `||||||| 31ad836` altında `{ noent: true }`. O zaman iki değişiklik ayrı ayrı okunur: `main` `noent`'i kaldırıp `rejectDoctype`'ı ekledi, dal yalnızca `noblanks`'ı ekledi. Doğru çözüm ikisini birden taşır: `{ noblanks: true }` ve `rejectDoctype = true`. İyi bir cevap çatışmayı tabana göre okur, iki tarafın değişikliğini birlikte uygular ve çözümün kanıtını ata ilişkisinden değil, birleşmiş sonuca karşı koşulan testten ister; güvenli varsayılanlar yazısındaki kanarya testi, `DOCTYPE` taşıyan belgenin 400 alması, bu çözümle kurulan yapıda kalır. Zayıf cevap `--is-ancestor`'ı yeterli sayar ya da tersini önerip `origin/main` tarafını seçer; o zaman yama geri gelir ama dalın kendi değişikliği sessizce düşer.

## Squash'tan sonra yaşayan dal

Ekip PR'ı saat 14.00'te squash ile birleştirdi. Geliştirici aynı dalda çalışmaya devam etti, KDV satırını oran bazına çevirdi, gönderdi ve aynı daldan yeni bir PR açtı. GitHub'ın squash'ını burada yerelde `merge --squash` ile canlandırıyoruz:

```bash
# Nerede: a klonu · Önkoşul: önceki adımlar · Değişen durum: main'de bir squash commit'i ve fatura dalında
# yeni bir commit; ikisi de uzak depoya gönderilir · Veri kaybı riski: yok
# Doğrulama: main'de dalın commit'lerinden hiçbiri yok, yalnızca tek yeni commit
git switch -q main && git merge -q --squash feature/fatura-pdf
kaydet gelistirici-a 2026-10-21T14:00:00+03:00 "fatura: PDF şablonu ve KDV satırı" && git push -q
git switch -q feature/fatura-pdf
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdv = "oran-bazinda";'
kaydet gelistirici-a 2026-10-21T14:30:00+03:00 "fatura: KDV'yi oran bazında göster" && git push -q
git log --oneline --graph --decorate -2 main
```

```text
Squash commit -- not updating HEAD
* ac8d84d (origin/main, origin/HEAD, main) fatura: PDF şablonu ve KDV satırı
* 66098e2 belge: fatura notu
```

Saat 15.00'te depoyu yöneten kişi yeni PR'ın beklenenden kalabalık olduğunu görüyor. Karar onun ve sırası belli: önce kanıt, sonra seçenekler, karar ve kalan risk.

*Gözlem ve kanıt.* Arayüzün yanında, kendi klonundan hiçbir şeyi değiştirmeyen üç komut:

```bash
# Nerede: yöneticinin yeni klonu y · Önkoşul: uzak depoya okuma erişimi · Değişen durum: yalnızca y;
# merge-tree nesne veritabanına bir ağaç yazar, ref'lere ve çalışma ağacına dokunmaz · Veri kaybı riski: yok
# Doğrulama: merge-tree çıkışı (0 temiz, 1 çatışma, başka bir değer: birleştirme yapılamadı)
cd .. && git clone -q origin.git y && cd y
git merge-base origin/main origin/feature/fatura-pdf
git log --oneline origin/main..origin/feature/fatura-pdf
git merge-tree --write-tree --name-only origin/main origin/feature/fatura-pdf; echo "merge-tree çıkış: $?"
```

```text
66098e202e28612ef9749ba76cb8422f0e121d25
ec788df fatura: KDV'yi oran bazında göster
3bfd1a1 Merge remote-tracking branch 'origin/main' into feature/fatura-pdf
ad2634c fatura: KDV satırı
f8db4cb fatura: PDF şablonu
56bd93187783b100c9963869a553886fd8564bdf
fatura/pdf.ts

Auto-merging fatura/pdf.ts
CONFLICT (add/add): Merge conflict in fatura/pdf.ts
merge-tree çıkış: 1
```

Birleştirme tabanı `66098e2`, yani squash'tan önceki `main`. Dalın dört commit'i `main`'den ulaşılamıyor; üçünün içeriği zaten `ac8d84d`'de. GitHub'ın belgesi durumu tarif eder: squash'tan sonra aynı dalda çalışıp aynı dallar arasında yeni bir PR açarsan, daha önce squash edilen commit'ler yeni PR'da yeniden listelenir ve her PR'da aynı çatışmaları tekrar tekrar çözmen gerekebilir. `git merge-tree --write-tree` bir birleştirmeyi çalışma ağacına ve hazırlık alanına dokunmadan yapar, commit üretmez; çıktısı çatışan dosyaları ve Git'in iletisini verir. Kılavuza göre çıkış 0 temiz, 1 çatışmalı bir birleştirmedir; başka bir değer birleştirmenin hiç yapılamadığını söyler. Hata yolunu incelediğimiz yazının diliyle o üçüncü cevap "karar alınamadı"dır; denetim onu "temiz" saymaz.

![İki panel; oklar Git'in yönünde, her commit ebeveynini gösterir. Panel 1, y klonunda squash'tan sonra: üst çizgide f8db4cb, ad2634c, 3bfd1a1 ve vurgulu devam commit'i ec788df; kesikli origin/feature/fatura-pdf ec788df'i gösteriyor. Alt çizgide birleştirme tabanı 66098e2 ve vurgulu squash commit'i ac8d84d; kesikli origin/main ac8d84d'yi gösteriyor. 3bfd1a1'in ikinci ebeveyni 66098e2. Notlar: squash dalın commit'lerini kaydetmedi, ortak ata hâlâ 66098e2; fatura/pdf.ts tabanda yok, main kdv toplam, dal kdv oran-bazinda ekledi; aynı alanda iki farklı ekleme, add/add çatışması, merge-tree çıkışı 1. Panel 2, düzeltme: ac8d84d'nin üstünde vurgulu b2dff87, feature/fatura-kdv-oran onu gösteriyor; eski dal ec788df'de, kapanacak; git rebase --onto origin/main 3bfd1a1 yalnızca 3bfd1a1'den sonraki commit'i taşıdı.](assets/squash-sonrasi-taban.svg "Şekil 2 — Squash'tan sonra birleştirme tabanı geride kalır")

Çatışmanın nedeni Şekil 2'de. Squash, dalın commit'lerinin `main`'e girdiğini kaydetmedi; Git'in gözünde iki ucun ortak atası hâlâ `66098e2` ve o commit'te `fatura/pdf.ts` yok. Tabandan beri iki taraf da dosyayı ekledi: `main` squash commit'iyle `kdv = "toplam"` satırını, dal ise `kdv = "oran-bazinda"` satırını taşıyor. Aynı alanda iki farklı ekleme, `add/add` çatışması. Birleştirme commit'iyle birleşmiş bir dalda ata ilişkisi kurulmuş olurdu; bir önceki bölümdeki deney bunu gösterdi. O zaman sonraki birleştirmenin tabanı dalın son birleşen ucu olur ve yalnızca yeni commit karşılaştırılırdı.

*Seçenekler.* Birincisi, çatışmayı bu PR'da çözüp aynı dalda devam etmek. Sorun her yeni PR'da geri gelir ve her çözüm, Teşhis'teki gibi bir değişikliği düşürme fırsatıdır. İkincisi, uzun yaşaması gereken dallarda birleştirme commit'ine geçmek; GitHub'ın belgesi de uzun yaşayan dallar için birleştirme commit'ini ya da bir sonraki PR'dan önce dalı rebase etmeyi önerir. Üçüncüsü, dalı kapatıp yeni işi güncel `main`'den açılan yeni bir dalda yapmak. Dördüncüsü, depoda squash'ı kapatmak; bu, kısa ömürlü dallarda squash'tan memnun olan herkesi etkiler.

*Güvenli karar.* Kısa ömürlü dal ve squash birlikte iyi çalışır, yeter ki dal birleşince kapansın. Devam commit'i eski dalda kaldıysa yalnızca o commit yeni bir dala taşınır. `git rebase --onto <yeni taban> <eski taban>`, eski tabandan sonraki commit'leri yeni tabanın üstüne yeniden uygular; buradaki eski taban, PR'a giren son commit `3bfd1a1`:

```bash
# Nerede: a klonu · Önkoşul: önceki adımlar · Değişen durum: yeni feature/fatura-kdv-oran dalı, uzak depoda da;
# eski dal yerinde kalır · Veri kaybı riski: yok · Doğrulama: yeni dalda squash commit'inin üstünde tek commit
cd ../a && git switch -q -c feature/fatura-kdv-oran feature/fatura-pdf
olarak gelistirici-a 2026-10-21T15:00:00+03:00 rebase -q --onto origin/main 3bfd1a1
git log --oneline --graph --decorate -2
git push -q -u origin feature/fatura-kdv-oran && git ls-remote --heads origin
```

```text
* b2dff87 (HEAD -> feature/fatura-kdv-oran) fatura: KDV'yi oran bazında göster
* ac8d84d (origin/main, origin/HEAD, main) fatura: PDF şablonu ve KDV satırı
b2dff878928b4dcd9c20cc85d7b6f581b8f25529	refs/heads/feature/fatura-kdv-oran
ec788df3e4ad18a6df8282c62110f6844e33f08d	refs/heads/feature/fatura-pdf
ac8d84dab0db3bed3d5b51f94e180ed0e0c8e356	refs/heads/main
```

Yeni dalın tek commit'i `b2dff87` ve tabanı squash commit'i; yeni PR yalnızca KDV değişikliğini gösterir. Bu bir yeniden yazma, ama paylaşılmış bir dalın üstüne değil: eski dal yerinde duruyor ve kapanacak, yeni commit ise yeni bir adla ilk kez gönderiliyor. GitHub'da depo ayarlarındaki "Automatically delete head branches", PR birleşince dalı uzak depodan siler. Ayarın sınırı da var. Geliştiricinin klonundaki dal da `origin/feature/fatura-pdf` kaydı da yerinde kalır, kayıt `fetch --prune`'a kadar silinmez; aynı adla yapılan bir sonraki gönderim de dalı uzak depoda yeniden yaratır. Bunu ayrı bir yerel denemede, uzak dalı başka bir klondan silerek gördük.

*Kalan risk.* Temiz birleşme, doğru birleşme değildir. **Anlamsal çatışma (semantic conflict)**, metinde çatışmadan birleşen iki değişikliğin birlikte yanlış davranmasıdır: ikisi ayrı ayrı doğru, birleşimleri yanlış. Fatura dalı yamadan önce açıldığı için e-fatura belgelerine yeni bir XML giriş noktasını o günün kalıbıyla, `{ noent: true }` ile eklemiş olsaydı ne `merge-tree` ne de Git bir çatışma görürdü; `--is-ancestor 85fdda1` yine 0 dönerdi ve XXE yeni bir kapıdan geri gelirdi. Yama, yazıldığı gün var olmayan kodu düzeltemez. Bunu yalnızca birleşmiş sonucu test eden bir kontrol yakalar ve o kontrolün birleştirmeden önce zorunlu kılınması ekip akışı konusunun içeriği.

> **Kendi organizasyonunda:** *Salt okunur denetim:* `gh repo list <organizasyon> --limit 1000 --json name,mergeCommitAllowed,squashMergeAllowed,rebaseMergeAllowed,deleteBranchOnMerge` her deponun hangi birleştirme yöntemlerine izin verdiğini ve dalların birleşince silinip silinmediğini listeler; komut yalnızca okur ve yalnızca senin görebildiğin depoları gösterir. Aynı ayarlar depo ayarlarında, "General" sayfasının "Pull Requests" bölümündedir. *Öneri:* Kısa ömürlü dallarla çalışan depolarda izin verilen yöntemleri ekipçe seçilmiş bir ya da ikiyle sınırlamak ve "Automatically delete head branches"ı açmak. Ekim 2026 itibarıyla GitHub Docs bu ayarlar için bir plan koşulu yazmıyor; yöntemleri değiştirmek depoda Maintain ya da Admin, otomatik silmeyi açmak Admin rolü ister. Değişiklik PR birleştiren herkesi ve birleştiren otomasyonları etkiler; geçmişte birleştirme commit'lerini arayan betikler ve araçlar önceden listelenmeli, karar ekibe duyurulmalı. Bir yöntemi belirli bir dal için bağlayıcı kılan kurallar da var ve depo ayarıyla çelişen bir kural birleştirmeyi engeller; kuralların platforma yazılmasını işlerken buna döneceğiz. Geri dönüş yolu ayarın eski hâline alınmasıdır.

## Karar kartı

- **Varsayım:** "Merge, rebase ve squash aynı sonucu farklı görünümle verir; squash edilen dal birleşmiş sayılır ve üzerinde devam edilebilir; yayımlanmış dalı rebase etmek yalnızca benim işimdir."
- **Güven sınırı:** Yalnızca senin klonunda duran, gönderilmemiş commit'ler ile başkalarının da sahip olduğu paylaşılmış geçmiş arasındaki durum sınırı; ayrıca geçmişin kanıtı olan ata ilişkisi ile içeriğin kanıtı olan anlık görüntü arasındaki sınır.
- **Karar:** Gönderilmemiş yerel commit'ler rebase ile, paylaşılmış dallar birleştirme commit'iyle güncellenir; paylaşılmış geçmiş yeniden yazılmaz. PR birleştirme yöntemi ekipçe seçilir ve depo ayarıyla sınırlanır; squash kullanılan depoda dal birleşince kapanır, yeni iş güncel `main`'den yeni dalda yapılır, eski dalda kalan commit `rebase --onto` ile taşınır. Çatışma tabanı görerek (`zdiff3`) çözülür ve çözüm birleşmiş sonuca karşı testle doğrulanır.
- **Somut risk:** Kendi tarafını seçen bir çatışma çözümünün XXE yamasını, `--is-ancestor` 0 derken sessizce geri alması; rebase edilip zorla push edilen bir dalın başkalarının commit'lerini ve o kimliklere bağlı kayıtları yetim bırakması; squash'tan sonra yaşayan dalın her PR'da aynı çatışmayı yeniden üretmesi.
- **Doğrulanabilir özellik:** Dal güncellendikten sonra `git merge-base --is-ancestor <yama> <dal>` 0 döner ve birleşmiş anlık görüntüde yamanın satırı durur (`git grep`); paylaşılmış bir dalın her güncellemesi bir ileri sarmadır; yeni bir PR'ın dalı için `git merge-tree --write-tree origin/main <dal>` 0 döner.
- **Negatif test:** Deney deposunda rebase edilmiş dalın aynı ada gönderimi "non-fast-forward" ile reddedilir; squash'tan sonra aynı dalda devam eden iş için `merge-tree` 1 ve `add/add` çatışması verir; kendi tarafını seçen çözümde `--is-ancestor` 0 dönerken `git grep` `noent: true` satırını bulur ve kanarya testi kalır.
- **Üretimde sinyal:** Reddedilen ileri sarma dışı gönderimler ve zorla push'lar görünür tutulur; uzun yaşayan dallar için düzenli `merge-tree` denetimi sonucunu 0, 1 ve "karar alınamadı" diye ayrı sayar; daha önce birleşmiş commit'leri yeniden listeleyen PR'lar ve birleşmiş sonuçta kanarya testinin sonucu izlenir.
- **Kalan risk:** Temiz birleşme anlamsal çatışmayı yakalamaz; iki ayrı doğru değişiklik birlikte yanlış olabilir ve onu yalnızca birleşmiş sonucu test eden kontrol bulur. Ata ilişkisi geçmişi kanıtlar, içeriği kanıtlamaz. Squash ve "Rebase and merge" ile birleşen dalın commit'leri `main`'in geçmişinde değildir; dalın birleştiğini PR kaydı söyler. "Rebase and merge" commit'leri imza doğrulaması olmadan yeniden yazar.

### Sırada ne var

Bu yazıda iki şeyi bilerek yarım bıraktık. `eacea0f` hiçbir dalda değil ama kaybolmadı; rebase edilmiş fatura dalını aynı ada göndermek reddedildi ve reddi aşmanın tek yolu zorla push. Kapanacak eski dal da silinecek. Sıradaki yazı bu kazaları geri almayı ele alıyor: `revert` ile `reset` hangi alanı ve hangi ref'i değiştirir, ulaşılamaz bir commit ne kadar süre geri getirilebilir, zorla push'un hangi biçimi başkasının işini ezmez ve silinen bir dal nasıl geri gelir?

## Kaynakça

- Git projesi. *git-merge Documentation* (son güncelleme: Git 2.54.0) — Fast-Forward Merge, True Merge, How Conflicts Are Presented, `--squash`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge)
- Git projesi. *git-merge-base Documentation* (son güncelleme: Git 2.43.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge-base)
- Git projesi. *git-rebase Documentation* (son güncelleme: Git 2.54.0) — `--onto`, Recovering from Upstream Rebase. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-rebase)
- Git projesi. *git-pull Documentation* (son güncelleme: Git 2.55.0) — `--rebase`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-pull)
- Git projesi. *git-merge-tree Documentation* (son güncelleme: Git 2.52.0) — `--write-tree`, `--name-only`, Exit Status. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge-tree)
- Git projesi. *git-patch-id Documentation* (son güncelleme: Git 2.54.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-patch-id)
- Git projesi. *Git 2.38.0 Release Notes* — `git merge-tree`'nin iki commit'ten birleştirme ağacı hesaplayan yeni kipi. [Bağlantı](https://github.com/git/git/blob/v2.56.0/Documentation/RelNotes/2.38.0.adoc)
- Git projesi. *git-config Documentation* (son güncelleme: Git 2.56.0) — `merge.conflictStyle`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-config)
- Git projesi. *gitglossary Documentation* (son güncelleme: Git 2.56.0) — merge, rebase. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/gitglossary)
- Git projesi. *git-push Documentation* (son güncelleme: Git 2.55.0) — Note about Fast-Forwards. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-push)
- Chacon, S. & Straub, B. *Pro Git* (2. baskı) — 3.2 Basic Branching and Merging, 3.6 Rebasing (The Perils of Rebasing). Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/book/en/v2)
- GitHub Docs. *About pull requests*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/get-started/about-pull-requests)
- GitHub Docs. *Pull request merges* — Squashing and merging a long-running branch, Rebase and merge your commits. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/pull-request-merges)
- GitHub Docs. *About merge methods on GitHub*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github)
- GitHub Docs. *Keeping your pull request in sync with the base branch*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/keeping-your-pull-request-in-sync-with-the-base-branch)
- GitHub Docs. *Managing the automatic deletion of branches*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-the-automatic-deletion-of-branches)
- GitHub Docs. *Repository roles for an organization* — Configure pull request merges. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization)
- GitHub CLI. *gh pr update-branch* — kılavuz sayfası. Erişim: 21 Ekim 2026. [Bağlantı](https://cli.github.com/manual/gh_pr_update-branch)
- GitHub CLI. *gh repo list* — JSON alanları (gh 2.98.0 ile denetlendi). Erişim: 21 Ekim 2026. [Bağlantı](https://cli.github.com/manual/gh_repo_list)
