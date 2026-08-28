# "Sıfırdan Yüze: Yapay Zekâ" — Üretim Trigger'ı

BATCH=4+1

`docs/seri/HANDOFF.md`'yi ve işaret ettiği state zincirini yükle. Bu run'ın batch değerini
`docs/seri/SOZLESME.md` §7'ye göre çöz. Sıradaki `N` yayımlanmamış makaleyi araştır, yaz,
repoya entegre et ve doğrulama kapılarından geçir; ardından tek `+1` hazırlık/state-geçiş
fazını tamamla ve bir sonraki makale gövdesine başlamadan dur. Karar ve son kabul, bu
trigger'ı çalıştıran ana oturumdadır.
