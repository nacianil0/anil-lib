import { describe, expect, it } from "vitest";
import {
  generateRecoveryCode,
  hashRecoveryCode,
  normalizeRecoveryCode,
  verifyRecoveryCode,
} from "./recovery-code";

describe("recovery codes", () => {
  it("are 25 Crockford symbols in five dashed groups", () => {
    const code = generateRecoveryCode();
    expect(code).toMatch(/^[0-9A-HJKMNP-TV-Z]{5}(?:-[0-9A-HJKMNP-TV-Z]{5}){4}$/);
  });

  it("do not repeat across draws", () => {
    const codes = new Set(Array.from({ length: 200 }, () => generateRecoveryCode()));
    expect(codes.size).toBe(200);
  });

  it("verify against their digest however they are typed back", () => {
    const code = generateRecoveryCode();
    const digest = hashRecoveryCode(code);
    expect(verifyRecoveryCode(code, digest)).toBe(true);
    expect(verifyRecoveryCode(code.toLowerCase(), digest)).toBe(true);
    expect(verifyRecoveryCode(code.replace(/-/g, " "), digest)).toBe(true);
    expect(verifyRecoveryCode(code.replace(/-/g, ""), digest)).toBe(true);
  });

  it("read the letters people confuse with digits as those digits", () => {
    expect(normalizeRecoveryCode("o0-Il-1")).toBe("00111");
  });

  it("store only a digest, never the code", () => {
    const code = generateRecoveryCode();
    const digest = hashRecoveryCode(code);
    expect(digest).toMatch(/^[a-f0-9]{64}$/);
    expect(digest).not.toContain(normalizeRecoveryCode(code));
  });

  it("reject another code, a malformed one and a malformed digest", () => {
    const digest = hashRecoveryCode(generateRecoveryCode());
    expect(verifyRecoveryCode(generateRecoveryCode(), digest)).toBe(false);
    expect(verifyRecoveryCode("", digest)).toBe(false);
    expect(verifyRecoveryCode("ABCDE", digest)).toBe(false);
    expect(verifyRecoveryCode("UUUUU-UUUUU-UUUUU-UUUUU-UUUUU", digest)).toBe(false);
    expect(verifyRecoveryCode(generateRecoveryCode(), "not-a-digest")).toBe(false);
  });
});
