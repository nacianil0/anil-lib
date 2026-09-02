import { beforeEach, describe, expect, it } from "vitest";
import {
  LEGACY_READER_DATA_STORAGE_KEY,
  PROGRESS_STORAGE_KEY,
  readerDataStorageKey,
} from "@/lib/reader/version";
import {
  finishLegacyMigration,
  parseReaderData,
  readReaderData,
  writeReaderData,
} from "./storage";
import { emptyReaderData } from "./schema";

const OWNER = "owner";
const OTHER = "8c7f0f9a-0a1e-4f2b-9c1d-2b7f4e6a1c33";
const DEVICE = "11111111-1111-4111-8111-111111111111";

function blob(workspaceId: string, articleId = "article-1") {
  const data = emptyReaderData(workspaceId, DEVICE);
  data.progress[articleId] = {
    articleId,
    headingId: null,
    scrollRatio: 0.5,
    anchor: null,
    completed: false,
    lastReadAt: "2026-06-29T10:00:00.000Z",
    clientUpdatedAt: "2026-06-29T10:00:00.000Z",
    deviceId: DEVICE,
    changeVersion: 0,
  };
  return data;
}

describe("reader data storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("writes each account under its own key", () => {
    writeReaderData(blob(OWNER));
    writeReaderData(blob(OTHER, "article-2"));

    expect(window.localStorage.getItem(readerDataStorageKey(OWNER))).toContain("article-1");
    expect(window.localStorage.getItem(readerDataStorageKey(OTHER))).toContain("article-2");
    // The unsuffixed key is never written to any more.
    expect(window.localStorage.getItem(LEGACY_READER_DATA_STORAGE_KEY)).toBeNull();
  });

  it("reads back only the requested account's state", () => {
    writeReaderData(blob(OWNER));
    writeReaderData(blob(OTHER, "article-2"));

    expect(Object.keys(readReaderData(OWNER).progress)).toEqual(["article-1"]);
    expect(Object.keys(readReaderData(OTHER).progress)).toEqual(["article-2"]);
  });

  it("starts a brand new account empty even when another account has data", () => {
    writeReaderData(blob(OWNER));
    const fresh = readReaderData(OTHER);

    expect(fresh.progress).toEqual({});
    expect(fresh.outbox).toEqual([]);
    expect(fresh.workspaceId).toBe(OTHER);
  });

  it("discards a blob stored under the right key but stamped for another account", () => {
    // Defence in depth: a hand-edited or stale entry must not surface.
    window.localStorage.setItem(
      readerDataStorageKey(OTHER),
      JSON.stringify(blob(OWNER)),
    );
    expect(readReaderData(OTHER).progress).toEqual({});
    expect(parseReaderData(JSON.stringify(blob(OWNER)), OTHER)).toBeNull();
  });

  it("adopts the pre-multi-user blob for the owner", () => {
    const legacy = blob(OWNER);
    const { workspaceId: _dropped, ...withoutWorkspace } = legacy;
    window.localStorage.setItem(
      LEGACY_READER_DATA_STORAGE_KEY,
      JSON.stringify(withoutWorkspace),
    );

    const adopted = readReaderData(OWNER);
    expect(Object.keys(adopted.progress)).toEqual(["article-1"]);
    expect(adopted.workspaceId).toBe(OWNER);
  });

  it("never lets a standard user adopt the pre-multi-user blob", () => {
    const legacy = blob(OWNER);
    const { workspaceId: _dropped, ...withoutWorkspace } = legacy;
    window.localStorage.setItem(
      LEGACY_READER_DATA_STORAGE_KEY,
      JSON.stringify(withoutWorkspace),
    );
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({ currentArticleId: "article-1", articles: {} }),
    );

    expect(readReaderData(OTHER).progress).toEqual({});
    expect(readReaderData(OTHER).currentArticleId).toBeNull();
  });

  it("migrates the oldest progress-only key for the owner", () => {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        currentArticleId: "article-1",
        articles: {
          "article-1": {
            headingId: null,
            scrollRatio: 0.3,
            completed: false,
            lastReadAt: "2026-06-20T10:00:00.000Z",
          },
        },
      }),
    );

    const migrated = readReaderData(OWNER);
    expect(migrated.workspaceId).toBe(OWNER);
    expect(migrated.progress["article-1"].scrollRatio).toBe(0.3);
    expect(migrated.outbox).toHaveLength(1);
  });

  it("clears legacy keys only for the owner", () => {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, "{}");
    window.localStorage.setItem(LEGACY_READER_DATA_STORAGE_KEY, "{}");

    finishLegacyMigration(OTHER);
    expect(window.localStorage.getItem(PROGRESS_STORAGE_KEY)).toBe("{}");

    finishLegacyMigration(OWNER);
    expect(window.localStorage.getItem(PROGRESS_STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem(LEGACY_READER_DATA_STORAGE_KEY)).toBeNull();
  });
});
