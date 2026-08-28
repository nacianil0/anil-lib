# "Mülakat Aynası: Boğaziçi CmpE" — Üretim Trigger'ı

BATCH=3+1

`docs/seri-boun/HANDOFF.md`'yi ve işaret ettiği state zincirini yükle. Bu run'ın batch değerini
`docs/seri-boun/SOZLESME.md` §6'ya göre çöz. Sıradaki `N` yayımlanmamış makaleyi araştır, yaz,
repoya entegre et ve doğrulama kapılarından geçir (ilk run HANDOFF'taki entegrasyon kapsamını da
kurar); ardından tek `+1` hazırlık/state-geçiş fazını tamamla ve bir sonraki makale gövdesine
başlamadan dur. Karar ve son kabul, bu trigger'ı çalıştıran ana oturumdadır.
