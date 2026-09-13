# "Mülakat Aynası: Boğaziçi CmpE" — Üretim Trigger'ı

BATCH=3+1

> **Seri tamamlandı (2026-09-12, Batch 13).** 41 makalenin tamamı yayımlandı; `roadmap.json`'da
> `planlandi` durumunda tek satır kalmadı. **Bu trigger artık yeni makale üretmez.** `BATCH` satırı
> tarihsel olarak duruyor ve `SOZLESME.md` §6'nın "kalan makale `N`'den azsa doldurma konusu icat
> edilmez" kuralı gereği hiçbir değeri yeni başlık üretmeyi meşrulaştırmaz. Seriye başlık eklemek
> **yalnızca kullanıcının açık talebiyle** olur; o durumda önce `YOL-HARITASI.md` ve
> `SOZLESME.md` güncellenir, sonra üretim yapılır.

`docs/seri-boun/HANDOFF.md`'yi ve işaret ettiği state zincirini yükle. Bu trigger çalıştırıldığında
yapılacak iş **bakımdır**: kaynak doğrulaması (özellikle resmî mülakat ve Scientific Preparation
sayfaları — `SOZLESME.md` §4 bunların değişebilir olmasını zorunlu kılar), açık borçların yeniden
denenmesi, düzeltme ve doğrulama kapılarının tekrar koşulması. Karar ve son kabul, bu trigger'ı
çalıştıran ana oturumdadır.
