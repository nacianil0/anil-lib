# "Sıfırdan Yüze: Yapay Zekâ" — Üretim Trigger'ı

BATCH=4+1

> **Seri tamamlandı (2026-09-26, Batch 28).** Yol haritasındaki 118 başlığın tamamı yayımlandı;
> `content/series/roadmap.json`'da `planlandi` durumunda tek satır kalmadı. **Bu trigger artık yeni
> makale üretmez.** `BATCH` satırı tarihsel olarak duruyor ve `SOZLESME.md` §7'nin "roadmap'te kalan
> makale sayısı `N`'den azsa doldurma konusu icat edilmez" kuralı gereği hiçbir değeri yeni başlık
> üretmeyi meşrulaştırmaz. Seriye başlık eklemek **yalnızca kullanıcının açık talebiyle** olur; o
> durumda önce `YOL-HARITASI.md` (ve gerekiyorsa `SOZLESME.md`) güncellenir, sonra üretim yapılır.

`docs/seri/HANDOFF.md`'yi ve işaret ettiği state zincirini yükle. Bu trigger çalıştırıldığında
yapılacak iş **bakımdır**: HANDOFF'taki "Açık borçlar" kalemlerinin yeniden denenmesi, "hakemsiz" diye
işaretlenmiş ve 12 aydan eski kaynakların güncel durumunun kontrolü (`SOZLESME.md` §4), gerekiyorsa
düzeltme ve revizyon işareti (§5, §12) ve doğrulama kapılarının yeniden koşulması. Karar ve son kabul,
bu trigger'ı çalıştıran ana oturumdadır.
