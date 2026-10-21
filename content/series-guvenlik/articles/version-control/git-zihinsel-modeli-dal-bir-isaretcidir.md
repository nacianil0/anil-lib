---
article_id: article_32c1b2f0-25e1-4e72-8ffe-306eb32edddf
title: "Git'in Zihinsel Modeli: Dal Bir Kopya Değil, Bir İşaretçidir"
slug: git-zihinsel-modeli-dal-bir-isaretcidir
category: version-control
level: advanced
reading_order: 5
summary: "Yapılandırma incelemesinin XXE düzeltmesi ana dala girdikten sonra kurulan üç cümleyi sınar: yama ana dalda, sürüm adayı ana daldan yapıldığı için yamayı içeriyor, ana daldan önceden açılmış dal da yamayı aldı. Commit'i kimliği içeriğinden türeyen bir anlık görüntü, ebeveyn ve üst veri nesnesi olarak; dalı ve HEAD'i bu nesneleri gösteren işaretçiler olarak kurar; çalışma ağacı, hazırlık alanı ve depo ayrımını gösterir. Bir değişikliğin yerini dal adıyla değil ulaşılabilirlikle kanıtlar: imajın kaydettiği commit kimliği, git merge-base --is-ancestor, ayrı tutulan karar alınamadı sonucu ve sığ klonda hayır cevabının neden kanıt olmadığı."
tags:
  - git
  - commit-grafigi
  - dal
  - koken-bilgisi
  - a03-2025
content_hash: sha256:3e69002d9f082ec4d29ace3c3ed155b26615b7e3f732254e22ebd2a49cbd7d57
classification_version: 1
classification_batch: 2
---
## Yama ana dalda; peki nerede?

Güvenli varsayılanlar yazısındaki yapılandırma incelemesinin XXE bulgusu kapandı: `noent` seçeneği koddan çıktı ve `DOCTYPE` taşıyan içe aktarma belgesi artık ayrıştırılmadan reddediliyor. Düzeltme 20 Ekim'de kurgusal `ornek-sirket` organizasyonunun `belge-servisi` deposunda `main` dalına girdi. Ertesi sabah sürüm toplantısında üç cümle kuruluyor. Güvenlik ekibi: "Yama `main`'de." Sürüm sorumlusu: "1.4.0 sürüm adayı `main`'den yapıldı; demek ki yamayı içeriyor." Fatura ekibinden bir geliştirici: "Dalımı `main`'den açtım; yama bende de var."

Üç cümle aynı sezgiye yaslanıyor: bir dal, açıldığı dalın canlı bir kopyasıdır ve bir yapı, adını taşıdığı dalın son hâlini içerir. Bu yazının deney deposunda yalnızca ilk cümle doğru çıkıyor. Sürüm adayı 19 Ekim'de yapıldı ve yamayı içermiyor. Fatura dalı da 19 Ekim'de açıldı ve yamayı kendiliğinden hiçbir zaman almayacak; ne bugün ne de `main` yüz commit daha ilerlediğinde.

Bunun bir kayıt düzeni ayrıntısı olmadığını güvenli varsayılanlar yazısından biliyoruz. Korunacak varlık, üretimde çalışan kodun düzeltmeyi gerçekten içermesi. Saldırganın yeteneği orada tarif ettiğimizle aynı: içe aktarma yetkisi olan herhangi bir kullanıcı, düzeltmenin bulunmadığı her yapıda sunucudaki bir dosyayı içe aktarılan belgeye çekebilir. Güven sınırı bu kez bir ağ ya da süreç sınırı değil, bir durum sınırı, üstelik üç tane: bir dosyanın düzenlenmiş olması ile commit'e girmiş olması; bir commit'in senin dalında olması ile `main`'de olması; `main`'de olması ile üretime giden yapıda olması. Kırılan varsayım, bir dalın ya da bir yapının adının içeriğini söylediği.

Top 10:2025'te bu soru A03'ün, **yazılım tedarik zinciri hatalarının (Software Supply Chain Failures)**, içinde duruyor. Kategori, kuruluşun kod deposundaki değişikliklerin izlenmediği bir değişiklik yönetimini risk sayıyor; önleme listesi de yapı çıktılarının bütünlüğünün **köken bilgisi (provenance)**, imza ve zaman damgasıyla sağlanmasını, her ortam için yeniden yapmak yerine aynı çıktının terfi ettirilmesini istiyor. Bu yazı o izlemenin en alt katmanını kuruyor: Git bir değişikliği nasıl temsil ediyor ki "yama nerede?" sorusu bir kanıtla cevaplanabiliyor? Cevabın üç parçası var: commit, işaretçi ve üç alan.

## Commit: anlık görüntü, ebeveyn ve üst veri

Deney deposu, hikâyenin beş commit'ini sabit ad, e-posta ve tarihle kuruyor. Ekip arkadaşının `main`'e yaptığı commit'i aynı klonda `main`'e geçip commit ederek canlandırıyoruz. Commit'in başka bir makineden, paylaşılan bir depo üzerinden gelmesi bu yazının sorusunu değiştirmiyor; yalnızca aynı grafiğin bir kopyasını daha ekliyor.

```bash
# Nerede: boş bir geçici klasör; Git Bash, macOS ya da Linux kabuğu · Önkoşul: Git 2.29 ya da sonrası
# Değişen durum: yalnızca bu klasör (yeni depo, beş commit) · Veri kaybı riski: yok
# Doğrulama: son komutun grafiği aşağıdaki çıktıyla aynı olmalı
cd "$(mktemp -d)"
: > bos.gitconfig                      # kendi Git ayarların deneye karışmasın
export GIT_CONFIG_GLOBAL="$PWD/bos.gitconfig" GIT_CONFIG_NOSYSTEM=1
git init -q -b main --object-format=sha1 belge-servisi && cd belge-servisi

kaydet() {  # kaydet <yazar> <tarih> <mesaj>: kimlikler her makinede aynı çıksın diye sabit
  GIT_AUTHOR_NAME="$1" GIT_AUTHOR_EMAIL="$1@example.test" GIT_AUTHOR_DATE="$2" \
  GIT_COMMITTER_NAME="$1" GIT_COMMITTER_EMAIL="$1@example.test" GIT_COMMITTER_DATE="$2" \
  git commit -q -m "$3"
}

mkdir import
echo 'export const parseOptions = {};' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-12T10:00:00+03:00 "içe aktarma: XML uç noktası"
echo 'export const parseOptions = { noent: true };' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-15T14:20:00+03:00 "içe aktarma: müşteri varlıkları için noent"
echo '1.4.0-rc.1' > VERSION
git add VERSION && kaydet gelistirici-b 2026-10-19T09:00:00+03:00 "sürüm: 1.4.0 adayı"

git switch -q -c feature/fatura-pdf    # 19 Ekim: fatura dalı main'den açılıyor
mkdir fatura && echo 'export const template = "fatura-v1";' > fatura/pdf.ts
git add fatura/pdf.ts && kaydet gelistirici-a 2026-10-19T16:45:00+03:00 "fatura: PDF şablonu"

git switch -q main                     # 20 Ekim: yama main'e giriyor
printf 'export const parseOptions = {};\nexport const rejectDoctype = true;\n' > import/xml.ts
git add import/xml.ts && kaydet gelistirici-b 2026-10-20T11:30:00+03:00 "içe aktarma: DOCTYPE taşıyan belgeyi reddet"
git switch -q feature/fatura-pdf       # geliştirici kendi dalına dönüyor

git log --oneline --graph --all --decorate
```

```text
* 85fdda1 (main) içe aktarma: DOCTYPE taşıyan belgeyi reddet
| * f8db4cb (HEAD -> feature/fatura-pdf) fatura: PDF şablonu
|/
* 31ad836 sürüm: 1.4.0 adayı
* 8a819d8 içe aktarma: müşteri varlıkları için noent
* 825fed9 içe aktarma: XML uç noktası
```

Yazıdaki her kimlik bu kurulumdan geliyor. Ad, e-posta, tarih ve dosya içerikleri sabit olduğu için senin makinende de aynı beş kimlik çıkmalı; bizde iki ayrı kurulum aynı beşini verdi (Git 2.53). Farklı çıkıyorsa bir bayt farklıdır: kabuğun karakter kodlaması, bir satır sonu ya da elle değişmiş bir tarih. Git'in iletileri yerel ayarına göre Türkçe çıkabilir; kimlikler ve çıkış kodları değişmez. Kimliklerin neden sabit olduğu, commit'in neyden oluştuğunda:

```bash
# Nerede: belge-servisi, feature/fatura-pdf dalı · Önkoşul: kurulum · Değişen durum: yok (yalnızca okur)
# Veri kaybı riski: yok · Doğrulama: parent satırı, grafikte f8db4cb'nin altındaki commit
git cat-file -p HEAD
```

```text
tree f9b20ffd87c2421bfd9da0368cb9f44ed62e1c8b
parent 31ad8365c94a74ada11e6bdc544e0b5ecb06d091
author gelistirici-a <gelistirici-a@example.test> 1792417500 +0300
committer gelistirici-a <gelistirici-a@example.test> 1792417500 +0300

fatura: PDF şablonu
```

Commit üç şeyden oluşur. `tree` satırı, commit anındaki bütün dosya ağacının, yani projenin **anlık görüntüsünün (snapshot)** kimliğidir: Git bir commit'te öncekine göre farkı değil, her dosyanın o anki hâlini kaydeder; Pro Git bunu "farklar değil, anlık görüntüler" diye anlatır. `parent` satırı bir önceki commit'in, **ebeveynin (parent)**, kimliğidir. Kalanı üst veridir: yazar, commit'i yapan, Unix zamanı, saat dilimi ve mesaj. Git'in sözlüğü commit nesnesini bu öğelerle tanımlar: ebeveynler, commit'i yapan, yazar, tarih ve kaydedilen sürümün kök dizinine karşılık gelen ağaç.

İki şey dikkat istiyor. Birincisi, commit dalını bilmez: nesnenin içinde `main` ya da `feature/fatura-pdf` diye bir alan yok, yalnızca ebeveynin kimliği var. İkincisi, **commit kimliği (object id)** bu metnin **içerik özetidir (hash)**. Git'in sözlüğüne göre her nesne içeriğinin SHA-1 özetiyle tanımlanır ve bu yüzden bir nesne değiştirilemez. Bunu kendin hesaplayabilirsin:

```bash
# Nerede: aynı klon · Önkoşul: yok · Değişen durum: yok (hash-object, -w verilmezse depoya yazmaz)
# Veri kaybı riski: yok · Doğrulama: ilk iki satır aynı, üçüncüsü farklı olmalı
git rev-parse HEAD
git cat-file commit HEAD | git hash-object -t commit --stdin
git cat-file commit HEAD | sed 's/gelistirici-a/gelistirici-c/g' | git hash-object -t commit --stdin
```

```text
f8db4cb96db9f2e8ce9e5b054ced73782a0b6f81
f8db4cb96db9f2e8ce9e5b054ced73782a0b6f81
741e27de2509785c32a8982e052fb3770dead055
```

İlk iki satır aynı: commit'in kimliği, `cat-file`'ın gösterdiği metnin özetinden başka bir şey değil. Üçüncü satırda yalnızca yazarın adını değiştirdik ve bambaşka bir kimlik çıktı. Ağaçtaki tek bir bayt, tarih ya da ebeveyn değişse de aynısı olur. Ebeveynin kimliği metnin içinde durduğu için bir commit'in kimliği ona varan bütün geçmişi sabitler: geçmişteki bir commit'i değiştirirsen, ondan sonraki her commit'in kimliği de değişir. Geçmişi yeniden yazan işlemlerin neden yeni kimlikler ürettiği buradan çıkıyor; ayrışan geçmişleri birleştirmeyi işlerken buna döneceğiz.

Kimliğin neyi kanıtlamadığı da aynı deneyde görünüyor. Yazar alanı serbest metin; beş commit'in yazarını ortam değişkenleriyle biz yazdık ve Git hiçbirini sorgulamadı. Commit kimliği içeriğin ne olduğunu sabitler, onu kimin yazdığını değil. SSDF v1.1'in PS.1.1 görevi kodun en az yetki ilkesiyle saklanmasını isterken, örnek olarak depodaki her değişikliğin bireysel hesaba hesap verebilir biçimde izlenmesini gösterir; yazar alanı bunu tek başına sağlamaz. Bu iş değişikliği kabul eden platformun kimlik kaydına ve commit imzasına düşer; imzayı zorunlu kılan kuralı, kuralların platforma yazılmasını işlerken göreceğiz.

Özet işlevi de tarihli bir bilgidir. Ekim 2026 itibarıyla yeni bir deponun varsayılan nesne biçimi SHA-1'dir ve kimlik 40 onaltılık karakterdir; SHA-256 isteğe bağlıdır ve iki biçim arasında şu an birlikte çalışma yoktur. Git projesinin kırıcı değişiklikler belgesi, Git 3.0'da yeni depoların varsayılanının SHA-256 olacağını yazar. Gerekçeleri arasında SHA-1'e karşı yayımlanmış pratik saldırılar var; belge, bilinen saldırılara karşı koruma bulunduğunu da ekler. Git 3.0'ın planlanmış bir yayım tarihi yok. Kurulumdaki `--object-format=sha1` bu yüzden orada: varsayılan değiştiğinde de aynı kimlikleri görmen için.

Bütün bu nesneler senin klonunda duruyor. Pro Git dağıtık sürüm kontrolünü merkezî olandan bu farkla ayırır: istemci yalnızca son anlık görüntüyü çıkarmaz, deponun bütün geçmişini aynalar; bu yüzden neredeyse her işlem yereldir. Git'in kendisi de bu modelle doğdu: Linux çekirdeğinin 2002'den beri kullandığı tescilli dağıtık sistem BitKeeper'ın ücretsiz kullanım hakkı 2005'te kalkınca topluluk kendi aracını yazdı. Bu yazıdaki bütün sorular ağsız cevaplanacak; ama yalnızca senin klonundaki geçmiş hakkında.

## Dal ve HEAD yalnızca birer işaretçidir

Commit dalını bilmiyorsa dal nerede duruyor?

```bash
# Nerede: aynı klon · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: ikinci ve üçüncü satır, grafikteki 85fdda1 ile f8db4cb'nin tam kimlikleri
cat .git/HEAD .git/refs/heads/main .git/refs/heads/feature/fatura-pdf
```

```text
ref: refs/heads/feature/fatura-pdf
85fdda1d575828f6e293fbbea1f2de3fbb269f37
f8db4cb96db9f2e8ce9e5b054ced73782a0b6f81
```

Dal, 40 karakterlik bir kimlik ve bir satır sonundan ibaret, 41 baytlık bir dosya. Pro Git'in tanımı da bu: Git'te dal, commit'lerden birine işaret eden hafif, taşınabilir bir işaretçidir ve dal açmak bir dosyaya 41 bayt yazmak kadar ucuzdur. Dosyada açıldığı dal, açıldığı gün ya da `main` diye bir bilgi yok. HEAD ise başka bir ref'i gösteren bir ref; şu an hangi dalda olduğunu söylüyor. **Ref**, bir ada karşılık bir nesne kimliği (dallarda bir commit kimliği) ya da HEAD'de olduğu gibi başka bir ref'in adını tutan kayıttır; Git'in sözlüğü onu böyle tanımlar.

Bu dosya görünümü bir gerçekleme ayrıntısıdır ve onu da tarihlemek gerekiyor. Ekim 2026 itibarıyla varsayılan ref biçimi `files`: her ref ayrı bir dosyadır ve zamanla `packed-refs` adlı tek bir dosyaya toplanabilir. Aynı kırıcı değişiklikler belgesi, Git 3.0'da yeni depoların varsayılan biçiminin `reftable` olacağını yazar; o zaman `.git/refs/heads/` altında dal dosyası görmezsin. Model değişmez: bir ad, bir kimliğe karşılık gelir. Biçimden bağımsız okuma yolu `git rev-parse main` ya da `git show-ref`'tir; betiklerde dosyayı değil bunları kullan.

Şekil 1 modelin asıl sonucunu gösteriyor: commit yapıldığında yalnızca HEAD'in gösterdiği dal ilerler.

![İki panel, aynı commit konumları; oklar Git'in yönünde, her commit ebeveynini gösterir, zaman soldan sağa akar. Önce: HEAD main'de, yama commit edilmeden hemen önce. Ana çizgide 825fed9 XML ucu, 8a819d8 noent: true, 31ad836 1.4.0 adayı; üst sırada f8db4cb PDF şablonu, ebeveyni 31ad836. feature/fatura-pdf f8db4cb'yi, main 31ad836'yı, HEAD main'i gösteriyor. İmaj 1.4.0-rc.1, revision: 31ad836; noktalı ok 31ad836'ya. Sonra: yama commit edildi; yalnızca HEAD'in gösterdiği main ilerledi. Vurgulu yeni commit 85fdda1 XXE yaması, ebeveyni 31ad836; vurgulu main 85fdda1'i gösteriyor, HEAD yine main'de. feature/fatura-pdf değişmedi: f8db4cb; imaj kaydı değişmez.](assets/dal-yalnizca-isaretci.svg "Şekil 1 — Commit yapılınca yalnızca HEAD'in gösterdiği dal ilerler")

Üst panelde iki dal aynı geçmişi paylaşıyor: `main` `31ad836`'yı, `feature/fatura-pdf` onun üstündeki `f8db4cb`'yi gösteriyor ve HEAD, yama commit'inden hemen önce `main`'de. Commit yapıldığında yeni commit `85fdda1`'in ebeveyni `31ad836` oldu ve Git yeni kimliği yalnızca HEAD'in gösterdiği dal dosyasına yazdı. `feature/fatura-pdf`'in dosyasına kimse dokunmadı; dal hâlâ `f8db4cb`'yi gösteriyor ve `f8db4cb`'den ebeveyn bağlarını izleyerek `85fdda1`'e varan bir yol yok. Git'in sözlüğü bunu dalın tanımına koyar: dalın ucu, o dalda geliştirme yapıldıkça ileri gider. `git switch` kılavuzu da yeni commit'lerin geçilen dalın ucuna ekleneceğini söyler. Bir dal, başka bir dal ilerlediği için ilerlemez; ya üzerine commit yapılır ya da bir komutla bilerek taşınır.

Geliştiricinin gözünden fark dosyanın kendisinde görünür:

```bash
# Nerede: aynı klon, feature/fatura-pdf · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: ilk çıktı çalışma ağacındaki dosya, ikincisi main'in gösterdiği commit'teki dosya
cat import/xml.ts
git show main:import/xml.ts
```

```text
export const parseOptions = { noent: true };
export const parseOptions = {};
export const rejectDoctype = true;
```

Geliştiricinin editöründe açık dosyada `noent` hâlâ duruyor. Yama bir yerden kaybolmadı: HEAD, yamayı içermeyen bir commit'i gösteren dalda ve diskteki dosyalar o commit'in anlık görüntüsünden çıkarıldı. `git switch main` yazsa dosya yamalı hâline döner; dalına geri geçince yine `noent` görünür. Dosyanın içeriği "hangi daldan açıldım?" sorusunun değil, "HEAD şu an hangi commit'i gösteriyor?" sorusunun cevabıdır.

Dallara bir de yerinde duran işaretçiler eşlik eder. `refs/tags/` altındaki **etiketler (tag)** de ref'tir; Git'in sözlüğüne göre daldan farkları, commit komutunun onları güncellememesidir. Sürümleri işaretlemek için kullanılmalarının nedeni bu; ayrıntısı sürüm ve dağıtım konusuna kalıyor.

İkinci yanlış model adlarla ilgili: "`main` ile `master` farklı rollerdir." Git için ikisi de sıradan birer dal adıdır; Pro Git `master` için "özel bir dal değildir" der. Fark bir ayardan gelir:

```bash
# Nerede: belge-servisi içinden, yanına yeni bir depo · Önkoşul: init.defaultBranch tanımsız (yalıtılmış ayar)
# Değişen durum: yeni boş "deneme" deposu · Veri kaybı riski: yok · Doğrulama: son satır
git init ../deneme 2>&1 | head -3; git -C ../deneme symbolic-ref HEAD
```

```text
hint: Using 'master' as the name for the initial branch. This default branch name
hint: will change to "main" in Git 3.0. To configure the initial branch name
hint: to use in all of your new repositories, which will suppress this warning,
refs/heads/master
```

`init.defaultBranch` tanımsızken Git ilk dala Ekim 2026'da `master` adını veriyor ve bunun Git 3.0'da `main` olacağını kendisi söylüyor; `git init` kılavuzu da aynısını yazar. Deneyde `-b main` bu yüzden açıkça verildi. GitHub ise yeni bir depoda **varsayılan dalı (default branch)** `main` diye adlandırır. Varsayılan dal iki yerde de bir ayar, ama sonuçları olan bir ayar: GitHub'ın belgesine göre depoyu ziyaret edenin gördüğü, klonlayanın ilk çıkardığı ve başka bir dal belirtilmedikçe yeni değişikliklerin tabanı olan daldır. Organizasyon sahipleri yeni depolar için bu adı belirleyebilir; var olan bir deponun varsayılan dalını değiştirmek depoda yönetici erişimi ister. Pratik sonucu basit: bir betik ya da yapılandırma "varsayılan dal" yerine `master` veya `main` adını sabit yazıyorsa, ad değiştiği gün sessizce başka bir dalı ya da hiçbir dalı hedefler.

> **Kendi organizasyonunda:** *Salt okunur denetim:* Organizasyon ayarlarında "Repository" altındaki "General" sayfasının "Repository default branch" alanı, yeni depolara verilecek adı gösterir. Var olan depoların varsayılan dallarını `gh repo list <organizasyon> --limit 1000 --json name,defaultBranchRef --jq '.[] | [.name, .defaultBranchRef.name] | @tsv'` listeler; komut yalnızca okur, yalnızca senin görebildiğin depoları gösterir ve `--limit` verilmezse ilk 30 depoda durur. *Öneri:* Yeni depolar için organizasyon varsayılanını tek bir ada sabitlemek yalnızca bundan sonra açılacak depoları etkiler. Var olan bir varsayılan dalı yeniden adlandırmak ise duyuru isteyen bir değişikliktir: GitHub dosya bağlantılarını yeni ada yönlendirir ve koruma kurallarını taşır, ama ham dosya adreslerini ve eski adla yapılan `git pull`'u yönlendirmez; depo başkalarının GitHub Actions iş akışlarında (workflow) kullandığı bir action yayımlıyorsa, onu eski dal adıyla çağıranlar kırılır. Önce eski adı sabit yazan iş akışlarını, betikleri ve dağıtım yapılandırmasını listele, klon sahiplerine GitHub'ın verdiği yerel güncelleme adımlarını duyur. Geri dönüş yolu aynı adımın tersidir ve aynı etkileri taşır.

## Üç alan: commit'ten önceki iki durak

Toplantıdaki geliştirici yamanın dalında olmadığını öğrenince ilk aklına gelen, satırı elle kopyalamak olabilir. Bu da bir "nerede" sorusu doğurur: düzenlenmiş ama commit edilmemiş bir değişiklik nerededir? Pro Git bir Git projesini üç bölümle anlatır: **çalışma ağacı (working tree)**, yani diskteki çıkarılmış dosyalar; **hazırlık alanı (staging area)**, bir sonraki commit'e girecek hâlin kaydı, Git'teki teknik adıyla index; ve commit'lerin durduğu depo, yani `.git` dizini. Git'in sözlüğü çalışma ağacını, HEAD'in gösterdiği commit'in ağacı ile henüz commit edilmemiş yerel değişikliklerin toplamı diye tanımlar.

```bash
# Nerede: aynı klon, feature/fatura-pdf · Önkoşul: yok · Değişen durum: çalışma ağacı ve hazırlık alanı
# Veri kaybı riski: yok, ama bu satırlar hiçbir commit'te değil; silinirlerse Git onları geri getiremez
# Doğrulama: her satırın başındaki iki harf
echo '// TODO: sayfa altlığı' >> fatura/pdf.ts && git status --short
git add fatura/pdf.ts && git status --short
echo '// ikinci düzenleme' >> fatura/pdf.ts && git status --short
```

```text
 M fatura/pdf.ts
M  fatura/pdf.ts
MM fatura/pdf.ts
```

`git status --short`'un iki harfi iki sınırı ayrı ayrı gösterir. Birinci harf hazırlık alanının HEAD'in commit'ine göre, ikinci harf çalışma ağacının hazırlık alanına göre farkıdır. İlk satırda değişiklik yalnızca çalışma ağacında; `git add`'den sonra hazırlık alanında; son satırda dosyanın iki ayrı hâli var: biri bir sonraki commit'e girecek olan, öbürü yalnızca diskte duran. `git diff --staged` birinci sınırı, `git diff` ikinci sınırı gösterir. Şekil 2 bu durakları ve aralarındaki komutları sırayla diziyor; son durak depo değil, yapı.

![Dört kutu soldan sağa. Çalışma ağacı: diskteki dosyalar, pdf.ts +2 satır, Git'te kayıt yok. Hazırlık alanı: index, pdf.ts +1 satır, sonraki commit. Depo (.git): commit ve ref'ler, HEAD: f8db4cb, pdf.ts eski hâl. İmaj: temiz klondan, revision, commit kimliği. Üstte git add çalışma ağacından hazırlık alanına, git commit hazırlık alanından depoya; depodan imaja yapı oku. Altta depodan iki alana dönen ok: git switch, dal adıyla; iki alanı o commit'in anlık görüntüsüyle doldurur, HEAD'i taşır. En altta git status --short çıktısı: MM fatura/pdf.ts; 1. harf hazırlık alanı ile HEAD'in commit'i farkı, 2. harf çalışma ağacı ile hazırlık alanı farkı.](assets/degisikligin-duraklari.svg "Şekil 2 — Bir değişikliğin durakları: üç alan ve yapı")

Bu ayrımın güvenlik tarafı, commit edilmemiş bir değişikliğin hiçbir dala ve hiçbir yapıya ait olmamasıdır. Geliştirici yamayı elle kopyalayıp yerelde test etse bile, ondan bir commit yapılmadıkça paylaşılan hiçbir yapı değişmez. Ters yön daha tehlikeli: kirli bir çalışma ağacından yapılan bir imaj, üzerine yazılan commit kimliğinin anlattığından farklı bir içerik taşır. Yapıyı temiz bir klondan, kaydedilmiş bir commit'ten üretmek bu yüzden bir yapı kuralıdır; `git status --porcelain` çıktısının boş olması yapı betiğinin ilk denetimi olabilir. Yapıyı kimin, hangi makinede ürettiği ve bu kaydın neden kanıt sayılabileceği ise tedarik zinciri ve yapı bütünlüğü konusunun sorusu.

## Değişikliğin yeri ulaşılabilirlikle kanıtlanır

Toplantının üç cümlesini artık sınayabiliriz. Git'in sözlüğü **ulaşılabilirliği (reachability)** şöyle tanımlar: bir commit'in bütün ataları o commit'ten ulaşılabilirdir. "Yama `feature/fatura-pdf`'te" cümlesinin Git'teki karşılığı, yama commit'ine dalın gösterdiği commit'ten ebeveyn bağları izlenerek varılabilmesidir; yani yamanın, dalın ucunun bir **atası (ancestor)** olması. `git merge-base --is-ancestor` tam bunu sorar ve cevabı çıkış koduyla verir: ataysa 0, değilse 1; hata, 1 dışındaki sıfırdan farklı bir koddur.

```bash
# Nerede: aynı klon · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: çıkış kodları; --contains yamayı içeren dalları listeler
git merge-base --is-ancestor 85fdda1 feature/fatura-pdf; echo "çıkış: $?"
git merge-base --is-ancestor 85fdda1 main; echo "çıkış: $?"
git branch --contains 85fdda1
```

```text
çıkış: 1
çıkış: 0
  main
```

Üçüncü cümle düştü: yama `main`'de, `feature/fatura-pdf`'te değil ve yamayı içeren tek dal `main`. Geliştiricinin yamaya ihtiyacı varsa yapacağı şey, dalını `main`'in yeni hâliyle bilerek bütünleştirmektir. Bu bir kopyanın güncellenmesi değil, yeni bir commit ya da yeni bir geçmiş üreten ayrı bir karar: ya bir **birleştirme (merge)** ya da geçmişi yeniden yazan bir alternatifi. Yolları ve bedelleri, ayrışan geçmişleri birleştirme konusunun içeriği. Burada önemli olan, sorunun dal adıyla değil grafikle cevaplanması ve cevabın bir komutun çıkış koduna bağlanabilmesi.

İkinci cümle, "1.4.0 adayı `main`'den yapıldı", daha öğretici, çünkü doğru bir önermeden yanlış bir sonuca varıyor. Aday gerçekten `main`'den yapıldı, ama 19 Ekim sabahı. Bir yapı bir daldan değil, o anda dalın gösterdiği commit'ten yapılır; dal adı bir yer değil, sonradan kayan bir işaretçidir. Konteyner imajları için bunu kaydetmenin standart bir yolu var: OCI imaj belirtimi (v1.1.1) `org.opencontainers.image.revision` **ek açıklamasını (annotation)**, paketlenen yazılımın kaynak denetimindeki revizyon tanımlayıcısı diye tanımlar. Adayın imajında bu alan `31ad836…` diyor ve soru bu kimlikle sorulur:

```bash
# Nerede: aynı klon · Önkoşul: yok · Değişen durum: yok · Veri kaybı riski: yok
# Doğrulama: çıkış kodları; ikinci satırda kimlik bilerek yanlış yazıldı
git merge-base --is-ancestor 85fdda1 31ad836; echo "çıkış: $?"
git merge-base --is-ancestor 85fdda2 31ad836; echo "çıkış: $?"
```

```text
çıkış: 1
fatal: Not a valid object name 85fdda2
çıkış: 128
```

Aday yamayı içermiyor; yamalı bir aday için yeni bir yapı gerekir ve o yapının kaydettiği kimlik `85fdda1` ya da onun bir torunu olur. İkinci satır kapının asıl tasarım sorusunu gösteriyor: yazım hatalı bir kimlik "hayır" değil, hata döndürüyor. Hata yolunu incelediğimiz yazıda politika servisinin üç cevabını ayırmıştık: izin, ret ve karar alınamadı. Burada da üç cevap var ve ikisini birleştiren bir kapı yanlış sinyal üretir. SSDF v1.1'in PS.3.2 görevi, her sürümün bütün bileşenleri için köken bilgisinin toplanmasını, korunmasını, sürdürülmesini ve paylaşılmasını ister. Aşağıdaki kapı bu bilginin en küçük parçasını, imajın commit kimliğini, bir karara çeviriyor:

```bash
# Nerede: sürüm hattında, imajın kaynak deposunun tam klonunda · Önkoşul: tam (40 karakterlik) kimlikler
# Değişen durum: yok (yalnızca okur) · Veri kaybı riski: yok · Doğrulama: dönüş kodu ve mesaj
yama_yapida_mi() {  # $1: yamanın commit kimliği, $2: imajın revision ek açıklamasındaki kimlik
  [ "$(git rev-parse --is-shallow-repository 2>/dev/null)" = "false" ] ||
    { echo "karar alınamadı: sığ klon ya da depo yok"; return 2; }
  git merge-base --is-ancestor "$1" "$2" && rc=0 || rc=$?
  case $rc in
    0) echo "geçer: yama yapıda" ;;
    1) echo "durdur: yama yapıda değil"; return 1 ;;
    *) echo "karar alınamadı: kimlik çözülemedi (çıkış $rc)"; return 2 ;;
  esac
}
YAMA=85fdda1d575828f6e293fbbea1f2de3fbb269f37
yama_yapida_mi "$YAMA" 31ad8365c94a74ada11e6bdc544e0b5ecb06d091; echo "dönüş: $?"
yama_yapida_mi "$YAMA" 85fdda1d575828f6e293fbbea1f2de3fbb269f37; echo "dönüş: $?"
yama_yapida_mi "$YAMA" 0000000000000000000000000000000000000000; echo "dönüş: $?"
```

```text
durdur: yama yapıda değil
dönüş: 1
geçer: yama yapıda
dönüş: 0
fatal: Not a valid commit name 0000000000000000000000000000000000000000
karar alınamadı: kimlik çözülemedi (çıkış 128)
dönüş: 2
```

Kapı iki olumsuz durumu da durduruyor, ama ayrı dönüş kodlarıyla: 1 "yama yok", 2 "bilemedik". İkisi de fail-closed; fark, uyarının kime ve neyle gittiğinde. Birincisi sürüm sorumlusuna yeni bir aday yapmasını söyler, ikincisi hattın sahibine kapının kör olduğunu. `&& rc=0 || rc=$?` kalıbı da bilerek orada: `set -e` ile çalışan bir betikte 1 dönen komut betiği o satırda bitirir, hiçbir mesaj yazılmaz ve "yama yok" ile "betik çöktü" yine aynı görünür.

> **Teşhis et:** Hattın yazdığı imajların revision ek açıklamasında commit kimliği yerine `main` yazıyor. Ekip "imaj `main`'den yapıldı, yama `main`'de; demek ki üretimde" diyor. Bu kayıt neyi kanıtlıyor?

Neredeyse hiçbir şeyi. Ek açıklama, yapının yapıldığı anda dalın adını kaydediyor; dal ise o andan sonra her commit'le kayan bir işaretçi. 19 Ekim'deki aday da 21 Ekim'de yapılacak imaj da aynı kaydı taşır ve bugün `main` diye sorulan soru, yapının değil dalın bugünkü hâlinin cevabını verir. İyi bir cevap kaydın 40 karakterlik commit kimliği olmasını ister; OCI belirtimi de bu alanı bir revizyon tanımlayıcısı olarak tanımlar. Soruyu da `--is-ancestor <yama> <imajdaki kimlik>` biçimine çevirir; dalın adını ayrı bir alanda bilgi olarak tutmanın zararsız olduğunu da söyler. Zayıf cevap kaydı doğru bulur, çünkü yazdığı şey doğrudur: imaj gerçekten `main`'den yapıldı. Doğru bir cümle, karar için yeterli bir kanıt değildir.

Kapının ilk satırının nedeni, sürüm hatlarının kodu nasıl indirdiğinde. GitHub Actions'ın resmî checkout action'ı (v7.0.1) varsayılan olarak yalnızca iş akışını tetikleyen tek commit'i indirir; bütün geçmiş için `fetch-depth: 0` gerekir. Böyle bir **sığ klonda (shallow clone)** geçmiş eksiktir ve `--is-ancestor` iki ayrı biçimde yanılabilir:

```bash
# Nerede: belge-servisi'nin yanında yeni bir sığ klon (file:// olmadan --depth yok sayılır) · Önkoşul: yok
# Değişen durum: yeni "sig" klasörü · Veri kaybı riski: yok · Doğrulama: çıkış kodları
cd .. && git clone -q --depth 1 --branch main "file://$PWD/belge-servisi" sig && cd sig
git rev-parse --is-shallow-repository
git merge-base --is-ancestor 31ad8365c94a74ada11e6bdc544e0b5ecb06d091 HEAD; echo "çıkış: $?"
git fetch -q --depth 1 origin 31ad8365c94a74ada11e6bdc544e0b5ecb06d091
git merge-base --is-ancestor 31ad8365c94a74ada11e6bdc544e0b5ecb06d091 HEAD; echo "çıkış: $?"
git -C ../belge-servisi merge-base --is-ancestor 31ad836 85fdda1; echo "tam klonda çıkış: $?"
```

```text
true
fatal: Not a valid commit name 31ad8365c94a74ada11e6bdc544e0b5ecb06d091
çıkış: 128
çıkış: 1
tam klonda çıkış: 0
```

Sorduğumuz şey basit: `31ad836`, yamalı commit'in ebeveyni; cevap "evet" olmalı. İlk denemede ata commit klonda hiç yok ve komut hata veriyor; bu dürüst bir "bilemiyorum". İkincisinde commit sonradan indirildi, ama aradaki bağ sığ klonun sınırında kesik; komut "hayır" diyor, oysa tam klonda aynı sorunun cevabı "evet". Sığ klonda 1, "yok" değil "bulamadım" demektir. Kapının ilk satırı bu yüzden sığ klonu kararın dışında tutuyor.

> **Teşhis et:** Başka bir ekip sürüm hattına şu denetimi eklemiş: `noent`'i getiren kırılgan commit imajın geçmişinde yoksa imaj temiz sayılıyor. Hat, checkout action'ının varsayılanlarıyla çalışıyor. Bu denetim 1.4.0 adayı için ne söyler, yamalı yapı için ne söyler?

```bash
if ! git merge-base --is-ancestor 8a819d8 "$REVISION"; then echo "temiz"; else echo "kırılgan"; fi
```

İki ortamda iki ayrı yanlış verir. Varsayılan checkout tek commit indirdiği için `8a819d8` klonda yoktur, komut 128 döner, `!` hatayı da "yok" sayar ve hat yamasız aday için bile "temiz" yazar: fail-open. Tam geçmişte sonuç tersine döner. `8a819d8` yamalı yapının da atasıdır, çünkü bir hatayı getiren commit geçmişten çıkmaz; düzeltme ondan sonra gelen başka bir commit'tir. Denetim bu kez yamalı yapıya "kırılgan" der. İyi bir cevap soruyu çevirir: kanıtlanacak şey kırılgan commit'in yokluğu değil, düzelten commit'in varlığı ve davranışın kendisidir; 1 dışındaki her sıfırdan farklı çıkışı karar alınamadı sayar ve "yok" iddiasının yalnızca tam geçmişte sorulabileceğini bilir. Zayıf cevap `fetch-depth: 0` eklemeyi yeterli görür; bu yalnızca fail-open'ı kapatır, denetim hâlâ yanlış soruyu sorar.

Kapı geçtiğinde bile kanıtlanan şey sınırlıdır. `--is-ancestor`, yamayı getiren commit'in yapının geçmişinde olduğunu kanıtlar; yamanın etkisinin yapının anlık görüntüsünde hâlâ durduğunu kanıtlamaz. Sonradan gelen bir commit satırı geri almış ya da bir birleştirmede çatışma yanlış çözülüp satır düşmüş olabilir; commit yine atadır. Top 10'u okuduğumuz yazıdaki kural burada da geçerli: kanıt, kapsadığı kadar konuşur. Grafik geçmişi kanıtlar, davranışı test kanıtlar. Güvenli varsayılanlar yazısındaki kanarya testi, yani `DOCTYPE` taşıyan belgenin 400 alması ve kanaryanın yanıtta bulunmaması, terfi ettirilecek imajın kendisine karşı koşulduğunda iki kanıt birlikte bir karar taşır. Toplantının üç cümlesi böylece birer kanıt basamağına dönüşüyor:

| İddia | Kanıtlayan | Kanıtlamadığı |
|---|---|---|
| "Düzelttim" | `git status --short`: değişiklik çalışma ağacında ya da hazırlık alanında | Herhangi bir commit'te olduğunu |
| "Dalımda" | `git merge-base --is-ancestor <commit> <dal>` | `main`'de ya da bir yapıda olduğunu |
| "`main`'de" | `git merge-base --is-ancestor <commit> main` | Daha önce yapılmış imajlarda olduğunu |
| "Yapıda" | Tam klonda `--is-ancestor <commit> <imajın revision kimliği>` | Etkisinin hâlâ yerinde olduğunu; onu kanarya testi kanıtlar |

## Karar kartı

- **Varsayım:** "Bir dal açıldığı dalın canlı kopyasıdır ve bir yapı, adını taşıdığı dalın son hâlini içerir."
- **Güven sınırı:** Üç durum sınırı: commit edilmemiş değişiklik ile commit; bir dalın ulaşabildiği commit'ler ile `main`'in ulaşabildikleri; `main` ile üretime giden imajın kaydettiği commit.
- **Karar:** "Değişiklik nerede?" sorusu dal adıyla değil ulaşılabilirlikle cevaplanır. Yapı temiz bir klondan, kaydedilmiş bir commit'ten üretilir ve imaj o commit'in tam kimliğini taşır. Sürüm kapısı yamanın bu kimliğin atası olmasını tam geçmişte sorar; "yok" ile "karar alınamadı"yı ayrı kodla durdurur. Varsayılan dal adı bir ayar olarak yönetilir, betiklere sabit yazılmaz.
- **Somut risk:** Yamasız bir sürüm adayının "`main`'den yapıldı" diye terfi etmesi; yamayı aldığını sanan uzun ömürlü bir dalın XXE'ye açık kodla sürüme girmesi; sığ klonda çalışan bir denetimin "yok" ya da "temiz" demesi.
- **Doğrulanabilir özellik:** SSDF v1.1 PS.3.2 (her sürüm için köken bilgisi): imajın `org.opencontainers.image.revision` değeri 40 karakterlik bir commit kimliğidir ve tam klonda `git merge-base --is-ancestor <yama> <revision>` 0 döner.
- **Negatif test:** Deney deposunda 1.4.0 adayının kimliğiyle kapı 1 döner ve durdurur; yazım hatalı kimlikle ve sığ klonda 2 döner ve durdurur; kanarya testi terfi ettirilecek imaja karşı koşar ve `DOCTYPE` taşıyan belge 400 alır.
- **Üretimde sinyal:** Sürüm kapısının "yama yok" ve "karar alınamadı" sonuçları ayrı sayılır; çalışan imajın revision değeri dağıtım kaydına yazılır; revision alanı boş, kısa ya da bir dal adı olan imaj hatta reddedilir.
- **Kalan risk:** Atalık geçmişi kanıtlar, davranışı değil. Commit kimliği içeriği sabitler, yazarı kanıtlamaz. Revision değeri, onu yazan yapı sistemine güvendiğin kadar doğrudur. Grafik yalnızca senin klonundaki geçmiş hakkında konuşur; paylaşılan depodaki son durumu bilmez.

### Sırada ne var

Bu yazıda her şey tek bir klonda oldu ve ekip arkadaşının commit'ini aynı klonda canlandırdık. Gerçekte yama başka bir makinede commit edilir ve paylaşılan bir **uzak depo (remote)** üzerinden gelir; senin klonundaki grafik ise ancak sen onu güncellediğinde değişir. Sıradaki yazı bu grafiğin uzak depodaki kopyasını ele alıyor: `fetch`, `pull` ve `push` hangi ref'i taşır, `origin/main` ne zaman değişir ve "dalım güncel" demek ne zaman bir kanıttır?

## Kaynakça

- Git projesi. *git-init Documentation* (son güncelleme: Git 2.54.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-init)
- Git projesi. *gitglossary Documentation* (son güncelleme: Git 2.56.0) — branch, commit object, HEAD, index, object, reachable, ref, tag, working tree. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/gitglossary)
- Git projesi. *git-merge-base Documentation* (son güncelleme: Git 2.43.0) — `--is-ancestor`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-merge-base)
- Git projesi. *git-switch Documentation* (son güncelleme: Git 2.55.0). Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-switch)
- Git projesi. *git-branch Documentation* (son güncelleme: Git 2.56.0) — `--contains`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-branch)
- Git projesi. *git-status Documentation* (son güncelleme: Git 2.53.0) — Short Format. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/git-status)
- Git projesi. *BreakingChanges* (son güncelleme: Git 2.55.0) — Git 3.0: SHA-256, reftable, `main`. Git başvuru kılavuzu. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/docs/BreakingChanges)
- Chacon, S. & Straub, B. *Pro Git* (2. baskı) — 1.1 About Version Control, 1.2 A Short History of Git, 1.3 What is Git?, 3.1 Branches in a Nutshell, 10.2 Git Objects, 10.3 Git References. Erişim: 21 Ekim 2026. [Bağlantı](https://git-scm.com/book/en/v2)
- GitHub Docs. *Branches* — About the default branch. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/pull-requests/reference/branches)
- GitHub Docs. *Managing the default branch name for repositories in your organization*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/organizations/managing-organization-settings/managing-the-default-branch-name-for-repositories-in-your-organization)
- GitHub Docs. *Changing the default branch*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/changing-the-default-branch)
- GitHub Docs. *Renaming a branch*. Erişim: 21 Ekim 2026. [Bağlantı](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch)
- GitHub CLI. *gh repo list* — kılavuz sayfası (gh 2.98.0 ile denetlendi). Erişim: 21 Ekim 2026. [Bağlantı](https://cli.github.com/manual/gh_repo_list)
- GitHub. *actions/checkout* v7.0.1 — README, `fetch-depth`. [Bağlantı](https://github.com/actions/checkout/blob/v7.0.1/README.md)
- Open Container Initiative (2025). *Image Format Specification* v1.1.1 — Annotations, `org.opencontainers.image.revision`. [Bağlantı](https://github.com/opencontainers/image-spec/blob/v1.1.1/annotations.md)
- van der Stock, A., Glas, B., Smithline, N., Janca, T. & Gigler, T. (2025). *A03:2025 – Software Supply Chain Failures*. OWASP Top 10:2025. OWASP Foundation. Erişim: 21 Ekim 2026. [Bağlantı](https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/)
- Souppaya, M., Scarfone, K. & Dodson, D. (2022). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218) — PS.1.1, PS.3.2. NIST. [Bağlantı](https://doi.org/10.6028/NIST.SP.800-218)
