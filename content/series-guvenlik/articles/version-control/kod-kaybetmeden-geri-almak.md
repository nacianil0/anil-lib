---
article_id: article_af8ce546-7282-45b8-bba1-6fcc3aa02614
title: "Kod Kaybetmeden Geri Almak: Hangi Komut Neyi Değiştirir?"
slug: kod-kaybetmeden-geri-almak
category: version-control
level: advanced
reading_order: 8
summary: "Aynı deney deposunda bir sabahın kazalarını geri alır: reset biçimlerinin üç alana etkisi ve geri gelmeyen taslak satır, ayrık HEAD'de kalan commit, squash'tan sonra silinen dal, ekip arkadaşının commit'ini düşüren zorla push ve main'e yanlışlıkla gönderilen birleştirme. Geri döndürme ile geri sarmayı, reflog'un neyi ne kadar tuttuğunu, --force-with-lease'in arka plandaki bir fetch'le neden boşa düştüğünü ve --force-if-includes'un bunu nasıl yakaladığını gösterir; revert edilen bir birleştirmenin yeniden birleştirmede neden geri gelmediğini ve ne zaman revert'ün revert'üne gerek olduğunu kurar."
tags:
  - git
  - geri-alma
  - reflog
  - zorla-push
  - revert
content_hash: sha256:69261fdebc22fe7c6f4b3189266b727c14c69cf3bee5e6a35cf0aab450028b79
classification_version: 1
classification_batch: 3
---
## Geri al, ama neyi?

Birleştirmeyi işlediğimiz yazı iki şeyi bilerek açık bıraktı: rebase'ten sonra hiçbir dalda kalmayan `eacea0f` ve rebase edilmiş bir dalı aynı ada göndermenin tek yolunun zorla push olması. 22 Ekim sabahı `belge-servisi` deposunda ikisi de gerçek bir soruya dönüşüyor. Fatura geliştiricisi KDV dalındaki commit mesajını düzeltip dalı zorla push ediyor; dalı inceleyen arkadaşının biraz önce eklediği test commit'i uzak daldan düşüyor. Aynı arkadaş dalı yerelde denemek için `main`'e birleştiriyor ve alışkanlıkla gönderiyor; incelenmemiş kod paylaşılmış `main`'de. Bir de dün squash ile birleşen eski dal temizlenirken silindi; öğleden sonra denetim için o dalın özgün commit'leri gerekiyor. Ekipte üç hazır cevap dolaşıyor: "`reset --hard` ile geri al", "`--force-with-lease` güvenlidir", "silinen dal gitmiştir".

Üçü de yarım doğru ve yarım kalan kısım kayıp üretiyor. Korunacak varlık paylaşılmış geçmişin bütünlüğü: kimsenin commit'i sessizce düşmemeli, incelenmemiş bir commit de paylaşılmış dalda kalmamalı. Saldırganın yeteneği, depoya yazma yetkisi olan herhangi bir hesap, ele geçirilmiş ya da yalnızca yanılan. GitHub'ın belgesi zorla push için bunu açıkça yazar: bir dalı silmek ya da bir PR'da onaylanmamış commit'leri göstermesini sağlamak için de kullanılabilir. Güven sınırı iki durum sınırının üst üste binmesi: yerel geçmiş ile paylaşılmış geçmiş; bir de bir ref'in gösterdiği, yani ulaşılabilir commit'ler ile artık yalnızca yerel bir kayıtta ya da hiçbir yerde durmayanlar. Kırılan varsayım: "Git hiçbir şeyi kaybetmez."

Deney deposu, birleştirme yazısının sonundaki durumdan sürüyor; kurulum o yazının adımlarını tek blokta tekrar ediyor:

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.43 ya da sonrası
# Değişen durum: yalnızca bu klasör: origin.git (bare depo), a ve b klonları · Veri kaybı riski: yok
# Doğrulama: grafik, birleştirme yazısının sonundaki fatura-kdv-oran dalını gösterir
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
git clone -q origin.git a && cd a && git switch -q -c feature/fatura-pdf
yaz fatura/pdf.ts 'export const template = "fatura-v1";'
kaydet gelistirici-a 2026-10-19T16:45:00+03:00 "fatura: PDF şablonu"
cd ../b && yaz import/xml.ts 'export const parseOptions = {};' 'export const rejectDoctype = true;'
kaydet gelistirici-b 2026-10-20T11:30:00+03:00 "içe aktarma: DOCTYPE taşıyan belgeyi reddet"
git push -q origin main && cd ../a
git switch -q main && git pull -q && git push -q -u origin feature/fatura-pdf
cd ../b && yaz VERSION '1.4.0-rc.2' && kaydet gelistirici-b 2026-10-21T09:15:00+03:00 "sürüm: 1.4.0 adayı 2"
git push -q origin main && cd ../a
yaz docs/fatura.md '# Fatura' && kaydet gelistirici-a 2026-10-21T10:05:00+03:00 "belge: fatura notu"
git fetch -q && olarak gelistirici-a 2026-10-21T10:30:00+03:00 rebase -q origin/main && git push -q
git switch -q feature/fatura-pdf
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdv = "toplam";'
kaydet gelistirici-a 2026-10-21T10:40:00+03:00 "fatura: KDV satırı"
olarak gelistirici-a 2026-10-21T11:10:00+03:00 merge -q --no-edit origin/main && git push -q
git switch -q main && git merge -q --squash feature/fatura-pdf > /dev/null
kaydet gelistirici-a 2026-10-21T14:00:00+03:00 "fatura: PDF şablonu ve KDV satırı" && git push -q
git switch -q feature/fatura-pdf
yaz fatura/pdf.ts 'export const template = "fatura-v1";' 'export const kdv = "oran-bazinda";'
kaydet gelistirici-a 2026-10-21T14:30:00+03:00 "fatura: KDV'yi oran bazında göster" && git push -q
git switch -q -c feature/fatura-kdv-oran
olarak gelistirici-a 2026-10-21T15:00:00+03:00 rebase -q --onto origin/main 3bfd1a1
git push -q -u origin feature/fatura-kdv-oran
git log --oneline --graph --decorate -3
```

```text
* b2dff87 (HEAD -> feature/fatura-kdv-oran, origin/feature/fatura-kdv-oran) fatura: KDV'yi oran bazında göster
* ac8d84d (origin/main, origin/HEAD, main) fatura: PDF şablonu ve KDV satırı
* 66098e2 belge: fatura notu
```

## Geri almanın üç fiili

Git'in kılavuzu benzer adlı üç komutu tek cümleyle ayırır. `git revert`, başka commit'lerin yaptığı değişiklikleri tersine çeviren yeni bir commit yazar. `git restore`, dosyaları hazırlık alanından ya da başka bir commit'ten geri getirir ve dalı güncellemez. `git reset` ise dalın ucunu taşır, dala commit ekler ya da çıkarır; kılavuzun ifadesiyle bu işlem commit geçmişini değiştirir. Bu ayrımın Türkçesi bu yazı boyunca iki terimle taşınacak: **geri döndürme (revert)** geçmişe yeni bir commit ekleyerek geri alır; **geri sarma (reset)** dalın işaretçisini geriye taşıyarak geri alır. Biri paylaşılmış geçmişte güvenli, öbürü değil. Komutları neyi değiştirdiklerine göre sıralayınca tablo şöyle:

| Komut | Neyi değiştirir | Geri dönüş |
|---|---|---|
| `restore <dosya>` | Çalışma ağacındaki dosyayı hazırlık alanındaki hâline döndürür; dal ve geçmiş yerinde | Çalışma ağacındaki değişiklik geri gelmez |
| `restore --staged <dosya>` | Hazırlık alanını HEAD'deki hâle döndürür | Kayıp yok; değişiklik çalışma ağacında kalır |
| `reset --soft <commit>` | Yalnızca dalı taşır | Eski uç reflog'da |
| `reset <commit>` | Dalı taşır, hazırlık alanını eşitler (`--mixed`, varsayılan) | Eski uç reflog'da |
| `reset --hard <commit>` | Dalı, hazırlık alanını ve çalışma ağacını eşitler | Çalışma ağacındaki değişiklik geri gelmez |
| `revert <commit>` | Değişikliği tersine çeviren yeni bir commit ekler | Geçmiş korunur; paylaşılmış dalda doğru araç |
| `stash` | Değişiklikleri bir stash kaydına kaldırır, iki alanı HEAD'e döndürür | `stash pop` ya da `stash apply` ile geri gelir |
| `cherry-pick <commit>` | Bir commit'in getirdiği değişikliği yeni bir commit olarak uygular | Yeni kimlik; geri almak için `revert` |
| `merge`, `rebase`, `cherry-pick` ile `--abort` | Yarıda kalan işlemi başladığı duruma döndürür | Öncesinde commit edilmemiş değişiklik varsa her zaman mümkün değil |
| `push --force-with-lease` | Uzak dalı ileri sarma olmadan taşır | Başkasının commit'i uzak daldan düşebilir |

Son satırların biri, hata yolunu incelediğimiz yazıdaki kısmi başarısızlık kuralının Git'teki karşılığı: yarıda kalan bir birleştirme, rebase ya da cherry-pick `--abort` ile bütünüyle başladığı duruma döner. Kılavuz sınırını da yazar: birleştirme başladığında commit edilmemiş değişiklik varsa `git merge --abort` eski durumu her zaman kuramaz. Reset biçimlerinin üç alana etkisini Git'in zihinsel modelini kurduğumuz yazıdaki `git status --short`'un iki harfiyle izleyelim. Geliştirici sabah yerel `main`'de bir belge commit'i yapmış, dosyaya taslak bir satır daha eklemiş ve commit'i geri almak istiyor:

```bash
# Nerede: a klonu, main · Önkoşul: kurulum · Değişen durum: main ref'i, hazırlık alanı, çalışma ağacı
# Veri kaybı riski: VAR; son reset commit edilmemiş taslak satırı kalıcı olarak siler
# Doğrulama: her satırın başındaki iki harf ve son dosya içeriği
git switch -q main
yaz docs/fatura.md '# Fatura' 'KDV oran bazında gösterilir.' && kaydet gelistirici-a 2026-10-22T08:30:00+03:00 "belge: KDV notu"
echo 'taslak: e-arşiv' >> docs/fatura.md
git status --short
git reset -q --soft HEAD~1 && git status --short
git reset -q && git status --short
git reset -q --hard && git status --short && cat docs/fatura.md
```

```text
 M docs/fatura.md
MM docs/fatura.md
 M docs/fatura.md
# Fatura
```

Başta değişiklik yalnızca çalışma ağacında: taslak satır. `--soft` dalı bir commit geri aldı ama hazırlık alanına dokunmadı; commit'in getirdiği satır hazırlıkta, taslak çalışma ağacında, iki harf de `M`. Argümansız `reset`, yani `--mixed`, hazırlık alanını HEAD'e eşitledi; iki değişiklik de yalnızca çalışma ağacında. `--hard` ise çalışma ağacını da eşitledi ve dosyada başlıktan başka bir şey kalmadı. Pro Git bu biçimi reset'in tek tehlikeli biçimi sayar ve Git'in gerçekten veri yok ettiği az sayıdaki durumdan biri diye anlatır: öteki her reset çağrısı kolayca geri alınabilir, `--hard` çalışma ağacındaki dosyaların üzerine zorla yazdığı için alınamaz. Commit'in kendisi kaybolmadı; taslak satır kayboldu.

## Reflog: ulaşılamaz commit'in kaydı

Commit'in nereden geri geleceğini Git'in tuttuğu bir kayıt söyler:

```bash
# Nerede: a klonu, main · Önkoşul: önceki blok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: commit'in kimliği kayıtta; içeriğinde taslak satır yok; dünkü eacea0f main'in kaydında
git reflog -4
git show HEAD@{3}:docs/fatura.md
git reflog show main | grep "belge: fatura notu"
```

```text
ac8d84d HEAD@{0}: reset: moving to HEAD
ac8d84d HEAD@{1}: reset: moving to HEAD
ac8d84d HEAD@{2}: reset: moving to HEAD~1
8820cfa HEAD@{3}: commit: belge: KDV notu
# Fatura
KDV oran bazında gösterilir.
eacea0f main@{4}: commit: belge: fatura notu
```

Kılavuz **reflog**'u, yani ref günlüğünü, dalların ve öteki ref'lerin uçlarının yerel depoda ne zaman güncellendiğinin kaydı diye tanımlar; HEAD'in günlüğü buna ek olarak dal değiştirmeleri de tutar. `HEAD@{3}`, HEAD'in üç hareket önce gösterdiği commit demek. Belge commit'i `8820cfa` hiçbir dalda değil ama kayıtta ve içeriği tam olarak commit edildiği hâliyle duruyor; taslak satır hiçbir girdide yok, çünkü hiçbir zaman bir commit'e girmedi. Son satır birleştirme yazısının açık sorusunu da cevaplıyor: rebase'ten sonra hiçbir dalda kalmayan `eacea0f`, `main`'in günlüğünde dört hareket geride bekliyor.

Aynı kayıt, dalı olmayan commit'lerin en sık kaybolduğu yeri de kapsar. Geliştirici XXE kanaryasının eski adayda gerçekten kaldığını görmek için 1.4.0 adayına geçiyor ve testi orada commit ediyor:

```bash
# Nerede: a klonu · Önkoşul: yok · Değişen durum: HEAD; dalı olmayan yeni bir commit; sonra yeni bir dal
# Veri kaybı riski: dal açılmazsa commit, çöp toplama süresi dolunca silinir · Doğrulama: son satır
git switch -q --detach 31ad836
yaz test/xxe-kanarya.test.ts 'test("DOCTYPE taşıyan belge 400 alır", () => {});'
kaydet gelistirici-a 2026-10-22T08:45:00+03:00 "test: XXE kanaryası"
git switch main 2>&1
git branch kanarya-testi HEAD@{1} && git log --oneline -1 kanarya-testi
```

```text
Warning: you are leaving 1 commit behind, not connected to
any of your branches:

  0594ea1 test: XXE kanaryası

If you want to keep it by creating a new branch, this may be a good time
to do so with:

 git branch <new-branch-name> 0594ea1

Switched to branch 'main'
Your branch is up to date with 'origin/main'.
0594ea1 test: XXE kanaryası
```

`git switch --detach` kılavuzun deyişiyle inceleme ve atılabilir denemeler içindir: HEAD bir dalı değil doğrudan bir commit'i gösterir. Bu duruma **ayrık HEAD (detached HEAD)** denir. Burada yapılan commit'i yalnızca HEAD gösterir; HEAD başka yere geçince onu hiçbir şey göstermez ve kılavuz böyle bir commit'in, bir ref oluşturulmadıkça rutin çöp toplamayla silineceğini yazar. Git uyarıyı kimliğiyle verdi; kimlik kaçırılsa bile `HEAD@{1}` aynı commit'i gösteriyor ve `kanarya-testi` dalı onu yeniden ulaşılabilir kıldı. Git'in zihinsel modelini kurduğumuz yazının cümlesi burada da geçerli: dal bir işaretçidir. Kurtarmak, kaybolan commit'e yeni bir işaretçi yazmaktan ibaret.

Kaydın iki sınırı var. Birincisi süre. `git gc`, varsayılan olarak ulaşılabilir commit'lere ait günlük girdilerini 90 günde (`gc.reflogExpire`), dalın ucundan ulaşılamayanları 30 günde (`gc.reflogExpireUnreachable`) siler; günlükte de bir ref'te de kalmayan nesneleri iki haftalık güvenlik süresinden sonra temizler (`gc.pruneExpire`). Çöp toplama elle çalıştırılmayı da beklemez; kılavuza göre nesne yaratan sıradan komutlar depo yeterince büyüdüğünde onu kendiliğinden başlatır. İkincisi yer. Reflog yerel depoda tutulur: uzak depoya gönderilmez, başkasının klonunda senin günlüğün yoktur.

*Gözlem ve kanıt.* Bu sınır silinen dalda belirleyici oluyor. Dün squash ile birleşen eski fatura dalı sabah uzak depodan silindi; geliştirici yerel kopyayı da silmeye kalkıyor:

```bash
# Nerede: a klonu · Önkoşul: önceki adımlar · Değişen durum: uzak depoda ve a'da feature/fatura-pdf silinir,
# sonra yeniden oluşturulur · Veri kaybı riski: -D, dalın tek kopyasıysa commit'leri ulaşılamaz bırakır
# Doğrulama: son satırda dal yeniden uzak depoda
git push -q origin --delete feature/fatura-pdf
git branch -d feature/fatura-pdf 2>&1 | head -1
git branch -D feature/fatura-pdf
git reflog exists refs/heads/feature/fatura-pdf || echo "dalın kendi günlüğü de silindi"
git reflog | grep -m1 "commit: fatura: KDV'yi oran"
git branch feature/fatura-pdf ec788df && git push -q origin feature/fatura-pdf && git ls-remote --heads origin feature/fatura-pdf
```

```text
error: the branch 'feature/fatura-pdf' is not fully merged
Deleted branch feature/fatura-pdf (was ec788df).
dalın kendi günlüğü de silindi
ec788df HEAD@{12}: commit: fatura: KDV'yi oran bazında göster
ec788df3e4ad18a6df8282c62110f6844e33f08d	refs/heads/feature/fatura-pdf
```

`git branch -d`, kılavuza göre yalnızca yukarı akış dalına ya da HEAD'e tamamen birleşmiş bir dalı siler. Dal squash ile birleştiği için Git onun birleştiğini bilmiyor ve reddediyor; birleştirme yazısındaki ata ilişkisi burada bir silme kararına dönüşüyor. `-D` reddi aştı ve son satırında dalın gösterdiği kimliği bıraktı. Dalın kendi günlüğü dalla birlikte gitti; HEAD'in günlüğü ise o dalda yapılan commit'i hâlâ tutuyor.

*Seçenekler.* Dalın uzak depodaki son hâli, kapanmış PR'ın sayfasından geri yüklenebilir: GitHub'ın belgesine göre kapanmış bir PR'ın dalı "Restore branch" ile geri gelir; aynı belge, birleşmiş ya da kapanmış bir PR'ın dalını silmenin depoda yazma yetkisi istediğini ve açık bir PR'a bağlı dalın silinemeyeceğini yazar. Dalı hâlâ taşıyan bir klondan yeniden göndermek ikinci yol; kimliği bilen herkes onu bir işaretçiyle yeniden ulaşılabilir kılabilir. Üçüncüsü dalı bırakmak; ama squash, denetimin aradığı yazar ve zaman bilgisini `main`'e taşımadı ve o bilgi yalnızca dalın commit'lerinde.

*Güvenli karar.* PR sayfası varsa geri yükleme oradan yapılır, çünkü PR'ın gerçekten incelenen son hâlini getirir. Klondan yeniden gönderilecekse önce `git log` ile kimliğin beklenen commit olduğu doğrulanır. Deneyde ikinci yol izlendi.

*Kalan risk.* Uzak depoya hiç gönderilmemiş commit'lerin tek kopyası bir klonun nesne veritabanıdır; klon gittiyse ya da süreler dolduysa geri dönüş yoktur.

> **Teşhis et:** Ekibin kılavuz sayfasında "yerel `main` bozulursa: `git fetch && git reset --hard origin/main`" yazıyor ve gerekçe olarak "reflog her şeyi tutar" deniyor. Bu tarif hangi işi kurtarılabilir, hangisini kurtarılamaz biçimde kaybettirir; daha güvenli bir tarif nasıl olur?

Tarif üç ayrı şeyi siler ve her birinin kaderi başka. Yerel `main`'de olup gönderilmemiş commit'ler daldan düşer ama HEAD'in ve `main`'in günlüğünde kalır; bu klonda, süreler dolana kadar geri alınabilirler. Commit edilmemiş değişikliklerin günlükte hiçbir girdisi yoktur. Hazırlık alanına eklenmiş içerik bir süre sahipsiz bir nesne olarak durur; `git fsck --lost-found` onu bulup içeriğini bir dosyaya yazar, ama hangi dosyaya ait olduğunu söylemez. Yalnızca çalışma ağacında duran değişikliğin ise hiçbir kopyası yoktur; üç durumu ayrı bir yerel denemede tek tek gördük. İyi bir cevap bu ayrımı yapar ve tarifi bir denetimle başlatır: `git status --short` boş değilse önce `git stash` ya da bir commit; gönderilmemiş commit'ler varsa önce onları gösteren bir dal (`git branch yedek`). `--hard` yerine kılavuzdaki `--keep` da kullanılabilir: yerel değişikliği olan bir dosyanın üzerine yazılacaksa reset'i durdurur. Zayıf cevap "reflog var" deyip geçer; reflog yalnızca ref'lerin geçmişini tutar, çalışma ağacının değil.

## Zorla push: kira ve içerme

Saat 09.00'da dalı inceleyen `gelistirici-b` KDV dalına bir test commit'i gönderdi. 09.20'de fatura geliştiricisi, arkadaşının gönderiminden habersiz, kendi commit'inin mesajını `--amend` ile düzeltiyor. `--amend` dalın ucundaki commit'in yerine yenisini yazar: aynı değişiklik, yeni kimlik. Gönderim beklendiği gibi reddediliyor ve geliştirici reddi aşmanın yollarını tek tek deniyor. Araya, editörünün arka planda yaptığı sıradan bir getirme giriyor:

```bash
# Nerede: önce b klonu, sonra a klonu, feature/fatura-kdv-oran · Önkoşul: kurulum
# Değişen durum: uzak depodaki fatura-kdv-oran dalı; son gönderim onu zorla taşır
# Veri kaybı riski: VAR; son satırda b'nin test commit'i uzak daldan düşer · Doğrulama: ret nedenleri ve çıkış kodları
cd ../b && git fetch -q && git switch -q feature/fatura-kdv-oran
yaz fatura/kdv.test.ts 'test("KDV oran bazında", () => {});'
kaydet gelistirici-b 2026-10-22T09:00:00+03:00 "fatura: KDV için test" && git push -q
cd ../a && git switch -q feature/fatura-kdv-oran
olarak gelistirici-a 2026-10-22T09:20:00+03:00 commit -q --amend -m "fatura: KDV satırını oran bazında göster"
git push 2>&1 | sed -n '2p'; echo "push: ${PIPESTATUS[0]}"
git push --force-with-lease 2>&1 | sed -n '2p'; echo "kira: ${PIPESTATUS[0]}"
git fetch -q                                                 # editörün arka planda yaptığı getirme
git push --force-with-lease --force-if-includes 2>&1 | sed -n '2p'; echo "kira ve içerme: ${PIPESTATUS[0]}"
git push --force-with-lease 2>&1 | sed -n '2p'; echo "yalnız kira: ${PIPESTATUS[0]}"
```

```text
 ! [rejected]        feature/fatura-kdv-oran -> feature/fatura-kdv-oran (fetch first)
push: 1
 ! [rejected]        feature/fatura-kdv-oran -> feature/fatura-kdv-oran (stale info)
kira: 1
 ! [rejected]        feature/fatura-kdv-oran -> feature/fatura-kdv-oran (remote ref updated since checkout)
kira ve içerme: 1
 + a578de5...8023fd7 feature/fatura-kdv-oran -> feature/fatura-kdv-oran (forced update)
yalnız kira: 0
```

İlk ret uzak depo yazısındaki koruma: uzak dalda geliştiricinin hiç görmediği bir commit var. `--force` bu denetimi ve ötekilerin hepsini kapatır; kılavuz onun uzak depoya commit kaybettirebileceğini açıkça yazar. `--force-with-lease` bir **kira** ister: uzak dal hâlâ beklenen commit'i gösteriyorsa güncelle, yoksa reddet. Beklenen değer belirtilmezse kira, yerel uzak izleme dalının gösterdiği commit'tir. İlk denemede `origin/feature/fatura-kdv-oran` hâlâ `b2dff87`'yi, uzak dal ise `a578de5`'i gösterdiği için kira tuttu ve gönderim "stale info" ile reddedildi. Sonra arka plandaki getirme uzak izleme dalını `a578de5`'e taşıdı ve kira, geliştirici o commit'e hiç bakmadan tazelendi. Son satırda yalnız kira yeterli oldu ve `a578de5` uzak daldan düştü. Kılavuz bu tuzağı adıyla anar: beklenen değer verilmeyen `--force-with-lease`, arka planda `git fetch` çalıştıran her şeyle çok kötü etkileşir.

`--force-if-includes` aradaki boşluğu kapatır. Kılavuza göre uzak izleme dalının ucu, yeniden yazılan yerel dalın günlük girdilerinden birinden ulaşılabilir değilse zorla güncellemeyi reddeder; yani "bu commit'i gördün mü?" sorusunu uzak izleme dalına değil, kendi dalının geçmişine sorar. `a578de5` geliştiricinin dalında hiçbir zaman olmadığı için deneme "remote ref updated since checkout" ile reddedildi. İkisi birlikte, uzak dalın beklenen yerde olduğunu ve oradaki değişikliğin yerelde gerçekten bütünleştirildiğini şart koşar. `push.useForceIfIncludes` ayarı ikinci seçeneği varsayılan yapar.

![İki panel; commit konumları sabit, oklar Git'in yönünde, kesikli çerçeve uzak izleme dalı. Önce, a'nın arka planda getirmesinden sonra, 09.25: ac8d84d squash'ın üstünde b2dff87 KDV oran, onun üstünde a578de5 b'nin testi; vurgulu 8023fd7 --amend doğrudan ac8d84d'nin üstünde. uzak: feature/fatura-kdv-oran, kesikli a: origin/feature/fatura-kdv-oran ve b: feature/fatura-kdv-oran a578de5'i, a: feature/fatura-kdv-oran 8023fd7'yi gösteriyor. Notlar: getirmeden önce push fetch first, --force-with-lease stale info, kira b2dff87'deydi; getirmeden sonra kira ve içerme birlikte reddetti, a578de5 a'nın dalında hiç olmadı. Sonra, yalnız --force-with-lease ile zorla push: uzak dal, a'nın dalı ve kesikli kaydı 8023fd7'yi gösteriyor; b2dff87 ve a578de5 uzak depoda ulaşılamaz, b'nin dalı hâlâ a578de5'te. İzler: a'nın günlüğünde origin/feature/fatura-kdv-oran@{1} = a578de5.](assets/zorla-push-kira.svg "Şekil 1 — Zorla push uzak dalı taşır; düşen commit yalnızca yerel kayıtlarda kalır")

Şekil 1 düşen commit'in nerede kaldığını gösteriyor. Uzak depoda artık onu hiçbir dal göstermiyor. `b`'nin klonunda dal hâlâ onu gösteriyor, ama `b` bir sonraki getirmede uzak izleme dalının yeniden yazıldığını görecek. Kurtarma için en yakın iz, geliştiricinin kendi klonundaki uzak izleme dalının günlüğü:

```bash
# Nerede: a klonu, feature/fatura-kdv-oran · Önkoşul: önceki blok · Değişen durum: dalda yeni bir commit;
# uzak depodaki dal · Veri kaybı riski: yok (ileri sarma) · Doğrulama: b'nin commit'i yazarıyla geri geldi
git reflog show origin/feature/fatura-kdv-oran
olarak gelistirici-a 2026-10-22T09:45:00+03:00 cherry-pick origin/feature/fatura-kdv-oran@{1} > /dev/null
git log --oneline -3 --format='%h %an: %s'
git push 2>&1
```

```text
8023fd7 refs/remotes/origin/feature/fatura-kdv-oran@{0}: update by push
a578de5 refs/remotes/origin/feature/fatura-kdv-oran@{1}: fetch -q: fast-forward
b2dff87 refs/remotes/origin/feature/fatura-kdv-oran@{2}: update by push
49e55e1 gelistirici-b: fatura: KDV için test
8023fd7 gelistirici-a: fatura: KDV satırını oran bazında göster
ac8d84d gelistirici-a: fatura: PDF şablonu ve KDV satırı
To …/origin.git
   8023fd7..49e55e1  feature/fatura-kdv-oran -> feature/fatura-kdv-oran
```

Günlük, uzak izleme dalının üç hareketini sırayla veriyor: `b2dff87`'den getirmeyle `a578de5`'e, gönderimle `8023fd7`'ye. `cherry-pick`, kılavuzun tanımıyla var olan bir commit'in getirdiği değişikliği uygulayıp yeni bir commit olarak kaydeder. Yeni commit `49e55e1`'in kimliği yeni, yazarı hâlâ `gelistirici-b`; gönderim bu kez bir ileri sarma. Kural kısa: zorla push yalnızca kendi dalında ve `--force-with-lease --force-if-includes` ile yapılır; paylaşılmış bir dalda, hele `main`'de, hiç yapılmaz. GitHub'da korunan bir dalda zorla push ve silme varsayılan olarak engellidir; Ekim 2026 itibarıyla korunan dallar herkese açık depolarda GitHub Free ile, özel depolarda Pro, Team ve Enterprise planlarıyla kullanılabiliyor. Bu engellerin nasıl kurulduğuna kuralların platforma yazılmasını işlerken döneceğiz.

## Paylaşılmış geçmişte geri almak

Saat 10.00'da `gelistirici-b` dalı yerelde denemek için `main`'ine birleştiriyor ve alışkanlıkla gönderiyor. İnceleme bitmemişti; bundan sonrası depoyu yöneten kişinin kararı.

```bash
# Nerede: b klonu, main · Önkoşul: önceki adımlar · Değişen durum: b'nin main'i ve uzak depodaki main
# Veri kaybı riski: yok; ama incelenmemiş iki commit paylaşılmış main'e girer · Doğrulama: ok satırı
cd ../b && git switch -q main && git pull -q
olarak gelistirici-b 2026-10-22T10:00:00+03:00 merge -q --no-ff --no-edit origin/feature/fatura-kdv-oran
git push 2>&1
```

```text
To …/origin.git
   ac8d84d..4021fbd  main -> main
```

*Gözlem ve kanıt.* Depoyu yöneten kişi `main`'in son adımına bakıyor; `--first-parent`, birleştirme commit'lerinde yalnızca ilk ebeveyni, yani `main`'in kendi çizgisini izler:

```bash
# Nerede: b klonu (yöneticinin klonu da olabilir) · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: birleştirme commit'inin iki ebeveyni ve getirdiği iki dosya
git log --oneline --first-parent -2 origin/main
git log -1 --format='%h ebeveynler: %p' origin/main
git diff --stat origin/main^1 origin/main
```

```text
4021fbd Merge remote-tracking branch 'origin/feature/fatura-kdv-oran'
ac8d84d fatura: PDF şablonu ve KDV satırı
4021fbd ebeveynler: ac8d84d 49e55e1
 fatura/kdv.test.ts | 1 +
 fatura/pdf.ts      | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)
```

GitHub tarafında bir iz daha var: PR'ın commit'leri artık tabandan ulaşılabilir olduğu için GitHub PR'ı birleşmiş gösterir. Belgesi buna **dolaylı birleştirme (indirect merge)** der ve PR'ın koruma koşulları sağlanmamış olsa bile böyle işaretlendiğini yazar.

*Seçenekler.* Birincisi `main`'i `reset` ile `ac8d84d`'ye geri sarıp zorla push etmek: paylaşılmış geçmişi yeniden yazar, aradaki on beş dakikada `main`'i çeken herkesin ve her otomasyonun elinde `main`'de olmayan bir birleştirme bırakır; korunan bir dalda zaten engellenir. İkincisi `revert`: birleştirmeyi tersine çeviren yeni bir commit. Üçüncüsü birleştirmeyi yerinde bırakıp incelemeyi sonradan yapmak; incelenmemiş kodun ilk sürüm adayına girmesi demek.

*Güvenli karar.* Paylaşılmış dalda geri döndürme. Bir birleştirme commit'inin iki ebeveyni olduğu için Git hangisine göre tersine çevireceğini bilemez; `-m 1`, ilk ebeveyni, yani birleştirmeden önceki `main`'i ana çizgi seçer:

```bash
# Nerede: b klonu, main · Önkoşul: önceki adımlar · Değişen durum: main'de yeni bir commit, uzak depoda da
# Veri kaybı riski: yok · Doğrulama: test dosyası yok, kdv yeniden "toplam"; ikinci birleştirme hiçbir şey getirmiyor
olarak gelistirici-b 2026-10-22T10:15:00+03:00 revert --no-edit -m 1 HEAD
git push 2>&1
ls fatura; cat fatura/pdf.ts
olarak gelistirici-b 2026-10-22T10:20:00+03:00 merge --no-edit origin/feature/fatura-kdv-oran
git merge-base --is-ancestor origin/feature/fatura-kdv-oran HEAD; echo "dalın ucu main'in atası mı: $?"
```

```text
[main a87a8cd] Revert "Merge remote-tracking branch 'origin/feature/fatura-kdv-oran'"
 Date: Thu Oct 22 10:15:00 2026 +0300
 2 files changed, 1 insertion(+), 2 deletions(-)
 delete mode 100644 fatura/kdv.test.ts
To …/origin.git
   4021fbd..a87a8cd  main -> main
pdf.ts
export const template = "fatura-v1";
export const kdv = "toplam";
Already up to date.
dalın ucu main'in atası mı: 0
```

Geri döndürme işini yaptı: test dosyası gitti, `kdv` yeniden `"toplam"`, gönderim bir ileri sarma ve geçmiş olduğu gibi duruyor. Son iki satır ise *kalan riski* gösteriyor. Kılavuz `-m`'yi anlatırken uyarır: bir birleştirme commit'ini geri döndürmek, o birleştirmenin getirdiği ağaç değişikliklerini bir daha istemeyeceğini beyan etmektir; sonraki birleştirmeler yalnızca geri döndürülen birleştirmenin atası olmayan commit'lerin değişikliklerini getirir. Dalın ucu `main`'in atası, Git onu zaten birleşmiş sayıyor ve "Already up to date" diyor; değişiklikler ise `main`'de yok. İnceleme bitip PR onaylandığında dalı yeniden birleştirmek işe yaramaz. Git projesinin bu durum için yazdığı belge, Linus Torvalds ile Junio Hamano'nun bir yazışmasından derlenir ve çözümü adıyla verir: geri döndürmeyi geri döndürmek. Dal sonradan yeni commit'lerle düzeltildiyse, önce geri döndürme geri alınır, sonra düzeltme birleştirilir.

```bash
# Nerede: b klonu, main · Önkoşul: PR'ın onaylanması · Değişen durum: main'de yeni bir commit, uzak depoda da
# Veri kaybı riski: yok · Doğrulama: test dosyası ve oran bazlı kdv geri geldi
olarak gelistirici-b 2026-10-22T14:00:00+03:00 revert --no-edit HEAD
git push 2>&1
ls fatura; cat fatura/pdf.ts
```

```text
[main b921466] Reapply "Merge remote-tracking branch 'origin/feature/fatura-kdv-oran'"
 Date: Thu Oct 22 14:00:00 2026 +0300
 2 files changed, 2 insertions(+), 1 deletion(-)
 create mode 100644 fatura/kdv.test.ts
To …/origin.git
   a87a8cd..b921466  main -> main
kdv.test.ts
pdf.ts
export const template = "fatura-v1";
export const kdv = "oran-bazinda";
```

Git 2.43'ten beri, bir geri döndürmeyi geri döndüren commit'e varsayılan olarak "Reapply" adını veriyor; mesaj kimliğe girdiği için önkoşul bu sürüm. GitHub'da birleştirilmiş bir PR'ın sayfasındaki "Revert" düğmesi aynı ilk adımı bir PR olarak açar: belgesine göre birleştirme commit'ini geri döndüren yeni bir PR oluşturur ve yazma yetkisi ister. Aynı belge, PR GitHub'da birleştirilmediyse tek tek commit'leri geri döndürmen gerekebileceğini yazar; buradaki birleştirme GitHub dışından geldi.

> **Teşhis et:** Aynı yanlış birleştirme bir test ortamının gerçek erişim anahtarını taşıyan bir yapılandırma dosyası da getirmiş olsaydı ve ekip "revert ettik, anahtar `main`'den çıktı, olay kapandı" deseydi, bu cümlede ne eksik?

Geri döndürme anahtarı yalnızca son anlık görüntüden çıkardı; geçmişten çıkarmadı. Birleştirme commit'i ve getirdiği commit'ler yerinde duruyor ve depoyu okuyabilen herkes anahtarı `git show 4021fbd` ile görebilir; birleştirmeyi çeken her klonda da bir kopyası var. Geçmişi yeniden yazmak bile yetmez: GitHub'ın hassas veri belgesi, yeniden yazılmış geçmişe rağmen verinin klonlarda, çatallarda, önbelleğe alınmış görünümlerde ve ona gönderme yapan PR'larda erişilebilir kalabileceğini ve yeniden yazmanın commit kimliklerini, imzaları ve kapalı PR'ların farklarını bozduğunu yazar. Belge ilk adımı da açıkça koyar: sızan bir sır önce iptal edilir ve döndürülür; çoğu durumda bu yeterlidir. İyi bir cevap olayı "anahtar geçmişte, geçerli mi?" sorusuna çevirir, anahtarı iptal edip yenisini dağıtır ve geri döndürmeyi yalnızca dosyayı anlık görüntüden çıkaran bir temizlik sayar. Zayıf cevap geri döndürmeyi ya da zorla push'la geçmişi temizlemeyi çözüm sayar. Sızan bir sırrın yönetici vakası, makine kimliklerini ve iş akışı güvenliğini işlerken bütünüyle ele alınacak.

## Karar kartı

- **Varsayım:** "`reset --hard` her şeyi geri alır; `--force-with-lease` her zaman güvenlidir; silinen dal kaybolmuştur; geri döndürülen bir birleştirme, dal yeniden birleştirilince geri gelir."
- **Güven sınırı:** Yerel geçmiş ile paylaşılmış geçmiş arasındaki durum sınırı; ayrıca bir ref'in gösterdiği ulaşılabilir commit'ler ile yalnızca yerel bir günlükte kalan ya da hiçbir yerde durmayan değişiklikler arasındaki sınır.
- **Karar:** Paylaşılmış geçmişte geri döndürme (birleştirme için `revert -m 1`), yerel geçmişte geri sarma; reset'ten önce `git status` ve günlüğe bakılır, commit edilmemiş iş için `--hard` yerine `stash` ya da `--keep`. Zorla push yalnızca kendi dalında ve `--force-with-lease --force-if-includes` ile yapılır. Kurtarma önce günlükten, silinen dal önce PR sayfasından geri getirilir. Geri döndürülen birleştirme yeniden istenirse geri döndürme geri döndürülür.
- **Somut risk:** Arka planda tazelenen bir kiranın ekip arkadaşının commit'ini sessizce uzak daldan düşürmesi; `main`'e giren incelenmemiş kodun reset ve zorla push ile "temizlenip" başkalarının klonunda yaşamaya devam etmesi; commit edilmemiş işin `reset --hard` ile kaybolması; geri döndürmeden sonra dalı yeniden birleştirmenin hiçbir şey getirmemesi.
- **Doğrulanabilir özellik:** Paylaşılmış bir dalın her güncellemesi bir ileri sarmadır: `git merge-base --is-ancestor <eski uç> <yeni uç>` 0 döner. Kendi dalındaki zorla push yalnızca uzak dalın ucu yerelde görülüp bütünleştirildiyse geçer; `--force-if-includes` bu koşulu gönderim anında, yerel dalın günlüğüne bakarak denetler. Geri döndürülen değişikliğin yeniden geldiği `git grep` ile içerikte doğrulanır.
- **Negatif test:** Deney deposunda getirmeden önce `--force-with-lease` "stale info", getirmeden sonra `--force-with-lease --force-if-includes` "remote ref updated since checkout" ile reddeder; yalnız kira kabul eder ve test commit'i düşer. `revert -m 1`'den sonra yeniden birleştirme "Already up to date" der. `reset --hard`'tan sonra taslak satır hiçbir günlük girdisinde yoktur.
- **Üretimde sinyal:** Zorla push'lar ve dal silmeleri görünür tutulur ve sahibine sorulur; `main`'e PR dışından gelen birleştirmeler ve dolaylı birleşmiş görünen PR'lar ayrıca sayılır; geri döndürme ve "Reapply" commit'leri inceleme kaydıyla eşleştirilir.
- **Kalan risk:** Hazırlık alanına hiç eklenmemiş değişiklik `reset --hard` ya da `clean` ile geri gelmez. Günlük yereldir ve sürelidir: varsayılan 90 gün, ulaşılamaz girdiler için 30 gün; günlükte de kalmayan nesneler iki haftalık sürenin ardından temizlenir. Başkasının klonundaki kopya senin kontrolünde değildir ve geri döndürme içeriği geçmişten silmez. Zorla push'u ve silmeyi engellemek komutun değil, platformun işidir.

### Sırada ne var

Bu yazıdaki kazaların hepsi bir komutla geri alındı ama hepsi aynı kapıdan girdi: bir değişiklik incelenmeden paylaşılmış bir dala ulaştı ya da paylaşılmış bir dal sessizce yeniden yazıldı. Önlemenin yeri bireyin dikkati değil, akışın kendisi. Sıradaki yazı GitHub'da bu akışı ele alıyor: push, PR, inceleme, birleştirme ve dağıtım neden ayrı kararlardır; zorunlu inceleme, kod sahipliği, gerekli kontroller ve birleştirme kuyruğu bir değişikliği `main`'e hangi kanıtla taşır?

## Kaynakça

- Git projesi. *git Documentation* (son güncelleme: Git 2.56.0) — Reset, restore and revert. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git)
- Git projesi. *git-reset Documentation* (son güncelleme: Git 2.54.0) — `--soft`, `--mixed`, `--hard`, `--keep`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-reset)
- Git projesi. *git-revert Documentation* (son güncelleme: Git 2.54.0) — `-m`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-revert)
- Git projesi. *How to revert a faulty merge* (Linus Torvalds ve Junio C Hamano, 2008; Git 2.56.0 belgeleri). [Bağlantı](https://github.com/git/git/blob/v2.56.0/Documentation/howto/revert-a-faulty-merge.adoc)
- Git projesi. *git-reflog Documentation* (son güncelleme: Git 2.51.1). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-reflog)
- Git projesi. *git-gc Documentation* (son güncelleme: Git 2.52.0) — `gc.reflogExpire`, `gc.reflogExpireUnreachable`, `gc.pruneExpire`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-gc)
- Git projesi. *git-push Documentation* (son güncelleme: Git 2.55.0) — `--force`, `--force-with-lease`, `--force-if-includes`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-push)
- Git projesi. *git-config Documentation* (son güncelleme: Git 2.56.0) — `push.useForceIfIncludes`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-config)
- Git projesi. *git-checkout Documentation* (son güncelleme: Git 2.55.0) — Detached HEAD. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-checkout)
- Git projesi. *git-switch Documentation* (son güncelleme: Git 2.55.0) — `--detach`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-switch)
- Git projesi. *git-cherry-pick Documentation* (son güncelleme: Git 2.56.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-cherry-pick)
- Git projesi. *git-merge Documentation* (son güncelleme: Git 2.54.0) — `--abort`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge)
- Git projesi. *git-branch Documentation* (son güncelleme: Git 2.56.0) — `-d`, `-D`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-branch)
- Git projesi. *git-fsck Documentation* (son güncelleme: Git 2.53.0) — `--lost-found`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-fsck)
- Git projesi. *Git 2.43.0 Release Notes* — `git revert`'ün bir geri döndürmeyi geri döndürürken yazdığı varsayılan mesaj. [Bağlantı](https://github.com/git/git/blob/v2.56.0/Documentation/RelNotes/2.43.0.adoc)
- Chacon, S. & Straub, B. *Pro Git* (2. baskı) — 7.7 Reset Demystified, 10.7 Maintenance and Data Recovery. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/book/en/v2)
- GitHub Docs. *Deleting and restoring branches in a pull request*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/deleting-and-restoring-branches-in-a-pull-request)
- GitHub Docs. *Reverting a pull request*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/how-tos/merge-and-close-pull-requests/reverting-a-pull-request)
- GitHub Docs. *Pull request merges* — Indirect merges. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/pull-request-merges)
- GitHub Docs. *About protected branches* — Allow force pushes, Allow deletions. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- GitHub Docs. *Removing sensitive data from a repository*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
