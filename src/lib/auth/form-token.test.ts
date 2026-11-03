import { describe, expect, it } from "vitest";
import { formTokenIsValid, issueFormToken } from "./form-token";

const SECRET = "form-token-test-secret-at-least-32-characters";
const T0 = 1_790_000_000_000;

describe("form tokens", () => {
  it("accept a form filled at human speed", () => {
    const token = issueFormToken(SECRET, T0);
    expect(formTokenIsValid(token, SECRET, T0 + 5_000)).toBe(true);
  });

  it("refuse a form posted faster than a person could fill it", () => {
    expect(formTokenIsValid(issueFormToken(SECRET, T0), SECRET, T0 + 500)).toBe(false);
  });

  it("refuse a stale form and one from the future", () => {
    expect(formTokenIsValid(issueFormToken(SECRET, T0), SECRET, T0 + 3 * 60 * 60 * 1000)).toBe(
      false,
    );
    expect(formTokenIsValid(issueFormToken(SECRET, T0 + 60_000), SECRET, T0)).toBe(false);
  });

  it("refuse a forged, edited or foreign token", () => {
    const token = issueFormToken(SECRET, T0);
    const [issued, signature] = token.split(".");
    expect(formTokenIsValid(`${Number(issued) - 60_000}.${signature}`, SECRET, T0 + 5_000)).toBe(
      false,
    );
    expect(formTokenIsValid(token, `${SECRET}-other`, T0 + 5_000)).toBe(false);
    expect(formTokenIsValid(`${token}.extra`, SECRET, T0 + 5_000)).toBe(false);
    expect(formTokenIsValid(undefined, SECRET, T0 + 5_000)).toBe(false);
    expect(formTokenIsValid("", SECRET, T0 + 5_000)).toBe(false);
  });
});
