import { act, cleanup, render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readerDataStorageKey } from "@/lib/reader/version";
import type { SyncRequest, SyncResponse } from "./sync-contract";
import { emptyReaderData } from "./schema";
import type { SeriesReset } from "./series-reset";

const hoisted = vi.hoisted(() => ({
  requests: [] as SyncRequest[],
  serverResetVersion: 5,
  serverSeriesResets: [] as SeriesReset[],
  resetFails: false,
}));

vi.mock("./sync-client", () => ({
  requestReaderSync: vi.fn(async (request: SyncRequest): Promise<SyncResponse> => {
    hoisted.requests.push(structuredClone(request));
    return {
      cursor: 60 + hoisted.requests.length,
      resetVersion: hoisted.serverResetVersion,
      seriesResets: hoisted.serverSeriesResets,
      acknowledged: request.operations.map((operation) => operation.operationId),
      errors: [],
      changes: { progress: [], savedPlaces: [], highlights: [] },
      serverTime: new Date().toISOString(),
    };
  }),
  requestSeriesReset: vi.fn(async () => {
    if (hoisted.resetFails) throw new Error("offline");
    const reset: SeriesReset = { seriesId: "ai", resetVersion: 70, articleIds: ["article-1"] };
    hoisted.serverSeriesResets = [reset];
    return { reset, progress: 1 };
  }),
}));

const { ReaderDataProvider, useReaderData } = await import("./use-reader-data");
type Context = ReturnType<typeof useReaderData>;

const WORKSPACE = "owner";
const DEVICE = "11111111-1111-4111-8111-111111111111";
const AT = "2026-09-01T10:00:00.000Z";

function record(articleId: string, scrollRatio: number, completed: boolean) {
  return {
    articleId,
    headingId: null,
    scrollRatio,
    anchor: null,
    completed,
    lastReadAt: AT,
    clientUpdatedAt: AT,
    deviceId: DEVICE,
    changeVersion: 20,
  };
}

let latest: Context | null = null;

function OpenArticle({ articleId }: { articleId: string }) {
  const context = useReaderData();
  latest = context;
  const { ready, setCurrentArticle } = context;
  useEffect(() => {
    if (ready) setCurrentArticle(articleId);
  }, [ready, articleId, setCurrentArticle]);
  return null;
}

function renderOpen(articleId: string) {
  return render(
    <ReaderDataProvider workspaceId={WORKSPACE}>
      <OpenArticle articleId={articleId} />
    </ReaderDataProvider>,
  );
}

afterEach(cleanup);

beforeEach(() => {
  window.localStorage.clear();
  hoisted.requests.length = 0;
  hoisted.serverResetVersion = 5;
  hoisted.serverSeriesResets = [];
  hoisted.resetFails = false;
  latest = null;
});

describe("ReaderDataProvider per-series reset", () => {
  function seed() {
    const data = emptyReaderData(WORKSPACE, DEVICE);
    data.progress = {
      "article-1": record("article-1", 1, true),
      "boun-1": record("boun-1", 0.4, false),
    };
    data.lastSyncAt = AT;
    data.savedPlaces["article-1"] = {
      articleId: "article-1",
      scrollRatio: 0.8,
      headingId: null,
      anchor: null,
      previewText: "saved",
      clientUpdatedAt: AT,
      deviceId: DEVICE,
      changeVersion: 0,
      deletedAt: null,
    };
    window.localStorage.setItem(readerDataStorageKey(WORKSPACE), JSON.stringify(data));
    hoisted.serverResetVersion = 0;
  }

  it("applies a successful series reset immediately without touching the open other series", async () => {
    seed();
    renderOpen("boun-1");
    await waitFor(() => expect(latest?.data.lastSyncAt).not.toBe(AT));
    await act(async () => latest!.resetSeries("ai"));
    expect(latest!.data.progress["article-1"]).toBeUndefined();
    expect(latest!.data.progress["boun-1"].scrollRatio).toBe(0.4);
    expect(latest!.savedPlaceOf("article-1")).not.toBeNull();
    expect(latest!.resetVersionOf("article-1")).toBe(70);
    expect(latest!.resetVersionOf("boun-1")).toBe(0);
    expect(latest!.data.currentArticleId).toBe("boun-1");
    const persisted = JSON.parse(window.localStorage.getItem(readerDataStorageKey(WORKSPACE))!);
    expect(persisted.progress["article-1"]).toBeUndefined();
  });

  it("preserves progress when the reset request fails", async () => {
    seed();
    hoisted.resetFails = true;
    renderOpen("boun-1");
    await waitFor(() => expect(latest?.data.lastSyncAt).not.toBe(AT));
    const before = structuredClone(latest!.data);
    await act(async () => {
      await expect(latest!.resetSeries("ai")).rejects.toThrow("offline");
    });
    expect(latest!.data).toEqual(before);
  });

  it("keeps a confirmed reset when a sibling tab writes an older storage snapshot", async () => {
    seed();
    renderOpen("boun-1");
    await waitFor(() => expect(latest?.data.lastSyncAt).not.toBe(AT));
    const old = JSON.stringify(latest!.data);
    await act(async () => latest!.resetSeries("ai"));
    act(() => {
      window.localStorage.setItem(readerDataStorageKey(WORKSPACE), old);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: readerDataStorageKey(WORKSPACE),
          newValue: old,
        }),
      );
    });
    expect(latest!.resetVersionOf("article-1")).toBe(70);
    expect(latest!.data.progress["article-1"]).toBeUndefined();
    expect(latest!.data.progress["boun-1"]).toBeDefined();
    const persisted = JSON.parse(window.localStorage.getItem(readerDataStorageKey(WORKSPACE))!);
    expect(persisted.seriesResets[0].resetVersion).toBe(70);
  });

  it("learns a remote scoped reset and records an open reset article afresh", async () => {
    seed();
    hoisted.serverSeriesResets = [{ seriesId: "ai", resetVersion: 70, articleIds: ["article-1"] }];
    renderOpen("article-1");
    await waitFor(() => expect(latest?.resetVersionOf("article-1")).toBe(70));
    await waitFor(() => expect(latest?.data.outbox).toEqual([]));
    expect(latest!.data.progress["article-1"]).toMatchObject({ completed: false, scrollRatio: 0 });
    expect(latest!.data.progress["boun-1"].scrollRatio).toBe(0.4);
    expect(hoisted.requests.some((request) => request.seriesResetVersions?.ai === 70)).toBe(true);
  });
});

describe("ReaderDataProvider and a server-side progress reset", () => {
  it("clears a device that read before the reset, and records the open article afresh", async () => {
    window.localStorage.setItem(
      readerDataStorageKey(WORKSPACE),
      JSON.stringify({
        version: 2,
        workspaceId: WORKSPACE,
        deviceId: DEVICE,
        cursor: 40,
        resetVersion: 0,
        currentArticleId: "article-2",
        progress: {
          "article-1": record("article-1", 1, true),
          "article-2": record("article-2", 0.5, false),
        },
        savedPlaces: {},
        highlights: {},
        outbox: [],
        lastSyncAt: AT,
      }),
    );

    renderOpen("article-1");

    await waitFor(() => expect(latest?.resetVersion).toBe(5));
    await waitFor(() => expect(latest?.data.outbox).toEqual([]));

    // The first request still speaks for the old state; it is not a fresh device.
    expect(hoisted.requests[0].resetVersion).toBe(0);
    const data = latest!.data;
    expect(Object.keys(data.progress)).toEqual(["article-1"]);
    expect(data.progress["article-1"]).toMatchObject({ completed: false, scrollRatio: 0 });
    expect(data.currentArticleId).toBe("article-1");
    // The visit is sent again, now under the new reset, so the server keeps it.
    const resent = hoisted.requests.find((request) => request.resetVersion === 5);
    expect(resent?.operations.map((operation) => operation.entityId)).toContain("article-1");
  });

  it("lets a new browser adopt the reset without losing what it has read since", async () => {
    renderOpen("article-3");

    await waitFor(() => expect(latest?.resetVersion).toBe(5));

    expect(hoisted.requests[0].resetVersion).toBeNull();
    expect(hoisted.requests[0].operations.map((operation) => operation.entityId)).toEqual([
      "article-3",
    ]);
    expect(latest!.data.progress["article-3"]).toBeDefined();
    expect(latest!.data.currentArticleId).toBe("article-3");
    // Later requests carry the adopted version.
    await waitFor(() => expect(latest?.data.lastSyncAt).not.toBeNull());
  });

  it("changes nothing for an account that was never reset", async () => {
    hoisted.serverResetVersion = 0;
    window.localStorage.setItem(
      readerDataStorageKey(WORKSPACE),
      JSON.stringify({
        version: 2,
        workspaceId: WORKSPACE,
        deviceId: DEVICE,
        cursor: 40,
        progress: { "article-2": record("article-2", 0.5, false) },
        lastSyncAt: AT,
      }),
    );

    renderOpen("article-1");

    await waitFor(() => expect(hoisted.requests.length).toBeGreaterThan(0));
    await waitFor(() => expect(latest?.data.outbox).toEqual([]));
    expect(latest!.data.progress["article-2"]).toMatchObject({ scrollRatio: 0.5 });
    expect(latest!.resetVersion).toBe(0);
  });
});
