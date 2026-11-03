import { describe, expect, it } from "vitest";
import {
  canRead,
  isPublicPath,
  isReaderWorkspace,
  LOCAL_WORKSPACE_ID,
  READER_WORKSPACE_PREFIX,
  type AccessRole,
  type ReadableCollection,
} from "./access";

const MATRIX: Array<[AccessRole | null, ReadableCollection, boolean]> = [
  [null, "ai", true],
  [null, "guvenlik", false],
  [null, "boun", false],
  [null, "archive", false],
  ["reader", "ai", true],
  ["reader", "guvenlik", true],
  ["reader", "boun", false],
  ["reader", "archive", false],
  ["user", "ai", true],
  ["user", "guvenlik", true],
  ["user", "boun", true],
  ["user", "archive", false],
  ["owner", "ai", true],
  ["owner", "guvenlik", true],
  ["owner", "boun", true],
  ["owner", "archive", true],
];

describe("canRead", () => {
  it.each(MATRIX)("%s → %s: %s", (role, collection, expected) => {
    expect(canRead(role, collection)).toBe(expected);
  });

  it("gives a self-registered reader nothing an owner-created account lacks", () => {
    const collections: ReadableCollection[] = ["ai", "guvenlik", "boun", "archive"];
    for (const collection of collections) {
      if (canRead("reader", collection)) expect(canRead("user", collection)).toBe(true);
    }
  });
});

describe("isPublicPath", () => {
  it.each([
    "/",
    "/seri",
    "/seri/tahmin-makinesi-yapay-zekaya-ilk-bakis",
    "/login",
    "/kayit",
    "/hesap-kurtar",
    "/gizlilik",
    "/robots.txt",
    "/sitemap.xml",
  ])("lets %s through without a session", (path) => {
    expect(isPublicPath(path)).toBe(true);
  });

  it.each([
    "/guvenlik",
    "/guvenlik/owasp-top-10-2025-i-okumak",
    "/boun",
    "/boun/heap-ve-oncelik-kuyrugu",
    "/read",
    "/read/anything",
    "/yonetim",
    "/yonetim/00000000-0000-4000-8000-00000000000a",
    "/hesap",
    "/api/reader-sync",
    "/api/reader-reset",
    "/seri/",
    "/seri/slug/extra",
    "/seri/../yonetim",
    "/seri/%2e%2e",
    "/seri/UPPER",
    "/serix",
    "/seri.json",
    "/kayit/x",
    "",
  ])("keeps %s behind the gate", (path) => {
    expect(isPublicPath(path)).toBe(false);
  });
});

describe("workspaces", () => {
  it("recognises a self-registered reader's workspace by its prefix only", () => {
    expect(
      isReaderWorkspace(`${READER_WORKSPACE_PREFIX}00000000-0000-4000-8000-000000000001`),
    ).toBe(true);
    expect(isReaderWorkspace("owner")).toBe(false);
    expect(isReaderWorkspace("00000000-0000-4000-8000-000000000001")).toBe(false);
    expect(isReaderWorkspace(LOCAL_WORKSPACE_ID)).toBe(false);
  });
});
