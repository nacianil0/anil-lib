/**
 * Password rules for accounts people open themselves (sign-up, recovery, change).
 *
 * OWASP Authentication Cheat Sheet, following NIST SP 800-63B: without MFA a password
 * shorter than 15 characters is weak; the maximum must allow passphrases (≥ 64);
 * every character, including spaces and Unicode, is allowed; there are no
 * composition rules; common and trivially guessable values are refused. Accounts the
 * owner creates keep their own, older rule (`user-schema.ts`).
 */
export const READER_MIN_PASSWORD_LENGTH = 15;
export const READER_MAX_PASSWORD_LENGTH = 200;

/** Long values that still top breach lists. Kept short on purpose: length does most of the work. */
const COMMON_LONG_PASSWORDS = new Set([
  "123456789012345",
  "1234567890123456",
  "qwertyuiopasdfghjkl",
  "passwordpassword",
  "password12345678",
  "parolaparolaparola",
  "sifresifresifre",
  "qwertyuiop123456",
  "iloveyouiloveyou",
  "abcdefghijklmnop",
]);

/** Counts what a person sees as characters, so an emoji is one, not two. */
export function passwordLength(password: string): number {
  return [...password.normalize("NFKC")].length;
}

/** The first rule a new password breaks, as a sentence for the form; null when it is acceptable. */
export function newPasswordProblem(password: string, username: string): string | null {
  const length = passwordLength(password);
  if (length < READER_MIN_PASSWORD_LENGTH) {
    return `Parola en az ${READER_MIN_PASSWORD_LENGTH} karakter olmalı. Birkaç kelimeden oluşan bir cümle iyi bir seçimdir.`;
  }
  if (length > READER_MAX_PASSWORD_LENGTH) {
    return `Parola en fazla ${READER_MAX_PASSWORD_LENGTH} karakter olabilir.`;
  }
  const folded = password.normalize("NFKC").toLocaleLowerCase("tr");
  if (new Set(folded).size <= 2) {
    return "Parola tek bir karakterin ya da ikilinin tekrarı olamaz.";
  }
  if (COMMON_LONG_PASSWORDS.has(folded.replace(/\s+/g, ""))) {
    return "Bu parola sızıntı listelerinde sık görülür; başka bir parola seç.";
  }
  const name = username.toLocaleLowerCase("tr");
  if (name.length >= 3 && folded.includes(name)) {
    return "Parola kullanıcı adını içermemeli.";
  }
  return null;
}
