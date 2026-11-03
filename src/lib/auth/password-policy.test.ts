import { describe, expect, it } from "vitest";
import { newPasswordProblem, passwordLength, READER_MIN_PASSWORD_LENGTH } from "./password-policy";

describe("newPasswordProblem", () => {
  it("accepts a long passphrase with spaces and Turkish letters, without composition rules", () => {
    expect(newPasswordProblem("çay demlenirken okunan makale", "okur")).toBeNull();
    expect(newPasswordProblem("a".repeat(5) + "bcdefghijklmn", "okur")).toBeNull();
  });

  it(`refuses anything shorter than ${READER_MIN_PASSWORD_LENGTH} characters`, () => {
    expect(newPasswordProblem("kısa bir parola", "okur")).toBeNull(); // exactly 15
    expect(newPasswordProblem("kısa bir parol", "okur")).toMatch(/en az 15/);
  });

  it("counts characters as people see them", () => {
    expect(passwordLength("ğüşiöç")).toBe(6);
    expect(passwordLength("😀😀")).toBe(2);
  });

  it("allows long passphrases but caps them", () => {
    expect(newPasswordProblem("kelime ".repeat(28).trim(), "okur")).toBeNull();
    expect(newPasswordProblem("a b ".repeat(60), "okur")).toMatch(/en fazla 200/);
  });

  it("refuses repeated characters, common long values and the username", () => {
    expect(newPasswordProblem("aaaaaaaaaaaaaaaaaaaa", "okur")).toMatch(/tekrar/);
    expect(newPasswordProblem("abababababababababab", "okur")).toMatch(/tekrar/);
    expect(newPasswordProblem("123456789012345", "okur")).toMatch(/sızıntı/);
    expect(newPasswordProblem("Password Password", "okur")).toMatch(/sızıntı/);
    expect(newPasswordProblem("benim adım meraklıokur ve böyle", "meraklıokur")).toMatch(
      /kullanıcı adını/,
    );
  });
});
