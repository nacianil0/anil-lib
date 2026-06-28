import type { Category, Level } from "./schema";
import type { ReadingStatus } from "./types";

/** Turkish display labels for the controlled categories. */
export const CATEGORY_LABELS: Record<Category, string> = {
  foundations: "Temeller",
  "models-and-training": "Modeller ve Eğitim",
  "reasoning-and-memory": "Akıl Yürütme ve Bellek",
  "agents-and-retrieval": "Ajanlar ve Erişim",
  "safety-and-evaluation": "Güvenlik ve Değerlendirme",
  "multimodal-and-future": "Çoklu-Modalite ve Gelecek",
  "case-studies": "Vaka İncelemeleri",
};

export const LEVEL_LABELS: Record<Level, string> = {
  beginner: "Başlangıç",
  intermediate: "Orta",
  advanced: "İleri",
};

export const STATUS_LABELS: Record<ReadingStatus, string> = {
  unread: "Okunmadı",
  "in-progress": "Devam ediyor",
  completed: "Tamamlandı",
};

/** Centralized interface copy, written from the reader's side of the screen. */
export const UI = {
  libraryTitle: "Yapay Zekâyı Okumak",
  librarySubtitle: "Temellerden sınıra, sıralı bir okuma rehberi.",
  skipToContent: "İçeriğe geç",
  openReadingList: "Okuma listesini aç",
  closeReadingList: "Okuma listesini kapat",
  readingList: "Okuma listesi",
  batchAriaLabel: "Sınıflandırılmış okuma listesi",
  classification: "Sınıflandırma",
  articleCount: (count: number) => `${count} makale`,
  batchHeader: (batch: number, count: number) =>
    `Sınıflandırma ${pad(batch)} · ${count} makale`,
  progressSummary: (done: number, total: number) => `${done}/${total} bölüm tamamlandı`,
  chapter: (order: number, total: number) => `Bölüm ${pad(order)} / ${total}`,
  readingTime: (minutes: number) => `${minutes} dk okuma`,
  previous: "Önceki",
  next: "Sonraki",
  markComplete: "Tamamlandı olarak işaretle",
  markedComplete: "Tamamlandı",
  toggleTheme: "Temayı değiştir",
  themeLight: "Açık tema",
  themeDark: "Koyu tema",
  themeSystem: "Sistem teması",
  theme: "Tema",
  lockClose: "Kilidi kapat",
  loading: "Okuma listen hazırlanıyor…",
  notFoundTitle: "Bölüm bulunamadı",
  notFoundBody: "Aradığın okuma listede yok ya da taşınmış olabilir.",
  backToReading: "Okumaya baştan başla",
  errorTitle: "Bir şeyler ters gitti",
  errorBody: "Bu bölüm yüklenirken bir sorun oluştu.",
  retry: "Yeniden dene",
  
  // Reader preferences & controls
  readingSettings: "Okuma ayarları",
  textSize: "Metin boyutu",
  lineSpacing: "Satır aralığı",
  paragraphSpacing: "Paragraf aralığı",
  textAlignment: "Metin hizası",
  alignLeft: "Sola",
  alignJustify: "İki yana",
  firstLineIndent: "İlk satır girintisi",
  indentNone: "Yok",
  indentSubtle: "Hafif",
  indentClassic: "Klasik",
  hyphenation: "Heceleme",
  hyphenationOff: "Kapalı",
  hyphenationAuto: "Otomatik",
  columnWidth: "Sütun genişliği",
  articleFont: "Yazı tipi",
  spacingCompact: "Sıkı",
  spacingBalanced: "Dengeli",
  spacingRelaxed: "Ferah",
  measureNarrow: "Dar",
  measureStandard: "Standart",
  measureWide: "Geniş",
  fontEditorial: "Editoryal",
  fontSans: "Sade",
  focusMode: "Odak modu",
  focusModeEnter: "Odak modunu aç",
  focusModeExit: "Odak modundan çık",
  decreaseTextSize: "Metni küçült",
  increaseTextSize: "Metni büyüt",
  resetPreferences: "Tercihleri sıfırla",
  resetConfirm: "Sıfırla",
  tableOfContents: "İçindekiler",
  restoredNotice: "Kaldığın yere dönüldü",
  startOver: "Baştan başla",
  dismiss: "Kapat",
} as const;

export function pad(order: number): string {
  return String(order).padStart(2, "0");
}
