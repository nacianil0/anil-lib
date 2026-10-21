# "Güven Sınırı: Güvenli Yazılım ve Kaynak Kod Yönetimi" — Üretim Trigger'ı

BATCH=2+1

Bu trigger her çağrıldığında aynı işi yapar ve idempotenttir. Kurallar `SOZLESME.md`'de, güncel
durum `HANDOFF.md`'dedir; burada yalnızca sıra var.

1. **Oku:** `docs/seri-guvenlik/SOZLESME.md` → `HANDOFF.md` → `YOL-HARITASI.md` (sıradaki yazıların
   tasarım kaydı, terim/geri çağırma/ileri işaret defterleri) → `ARASTIRMA.md` (borçlar).
2. **Gerçeği uzlaştır:** `content/series-guvenlik/catalog.json`, frontmatter ve `roadmap.json`'u
   HANDOFF'un cursor'ıyla karşılaştır; uyuşmazlıkta yayımlanmış gerçek kazanır ve yarım kalan iş
   oradan sürdürülür (`SOZLESME.md` §7 "İdempotens").
3. **Çalışma alanını denetle:** paralel oturum, açık port, `git status`; gerekiyorsa yalıtılmış kopya
   (`SOZLESME.md` §7).
4. **N yazıyı üret:** Kullanıcının bu çağrıdaki mesajında tam `BATCH=N+1` satırı yoksa N = 2.
   `roadmap.json`'daki sıradaki en fazla N `planlandi` yazı için: birincil kaynakları sürüm ve erişim
   tarihiyle doğrula, yaz, şekli çiz, kapılardan geçir, entegre et ve açık/koyu/sepya × dar/geniş
   gerçek render'da doğrula (`SOZLESME.md` §2–§6; Git/GitHub yazılarında §3'ün ek kuralları ve
   deney deposu). Kalan yazı N'den azsa yalnız kalanı üret. Planda olmayan yazı eklenmez.
5. **+1 (yalnızca state):** HANDOFF, YOL-HARITASI defterleri, `roadmap.json`, ARASTIRMA borçları ve
   sonraki run'ın hazırlık notu. Sonraki yazının gövdesi yazılmaz. Ardından **dur**.
6. **Bitiş:** Planda `planlandi` kalmadıysa (revize planın gerçek sonu; tavan ve istisnası
   `SOZLESME.md` §1, sonlanma §7) bu dosyayı bakım kipine al (§9): bakım yeni yazı üretmez.

Commit, push, deploy, canlı veritabanına ve dış sistemlere yazma bu trigger'ın yetkisi değildir.
Git/GitHub yazıları için gerçek bir GitHub organizasyonunda ayar okuma ya da değiştirme de bu
trigger'ın işi değildir; örnekler yerel deney deposunda ve kurgusal organizasyonda kalır.
