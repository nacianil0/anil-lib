import { act, cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LOCAL_WORKSPACE_ID } from "@/lib/auth/access";
import { readerDataStorageKey } from "@/lib/reader/version";
import { LOCAL_TRACKING_STORAGE_KEY, setLocalTrackingEnabled } from "./local-tracking";

const hoisted = vi.hoisted(() => ({ syncCalls: 0, resetCalls: 0 }));

vi.mock("./sync-client", () => ({
  requestReaderSync: vi.fn(async () => {
    hoisted.syncCalls += 1;
    throw new Error("local mode must never sync");
  }),
  requestSeriesReset: vi.fn(async () => {
    hoisted.resetCalls += 1;
    throw new Error("local mode must never ask the server to reset");
  }),
}));

const { ReaderDataProvider, useReaderData } = await import("./use-reader-data");
type Context = ReturnType<typeof useReaderData>;

const KEY = readerDataStorageKey(LOCAL_WORKSPACE_ID);
let latest: Context | null = null;

function Probe() {
  latest = useReaderData();
  return null;
}

function renderLocal() {
  return render(
    <ReaderDataProvider workspaceId={LOCAL_WORKSPACE_ID} mode="local">
      <Probe />
    </ReaderDataProvider>,
  );
}

function stored() {
  const raw = window.localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : null;
}

beforeEach(() => {
  window.localStorage.clear();
  hoisted.syncCalls = 0;
  hoisted.resetCalls = 0;
  latest = null;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("reading without an account", () => {
  it("keeps the last article and position in this browser and never contacts the server", async () => {
    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    expect(latest?.mode).toBe("local");
    expect(latest?.syncStatus).toBe("local");

    act(() => {
      latest!.setCurrentArticle("article-1");
      latest!.recordPosition("article-1", "giris", 0.42, null);
      latest!.savePlace("article-1", "giris", 0.42, "önizleme", null);
    });
    await act(async () => {
      await latest!.syncNow();
    });

    const blob = stored();
    expect(blob?.workspaceId).toBe(LOCAL_WORKSPACE_ID);
    expect(blob?.currentArticleId).toBe("article-1");
    expect(
      (blob?.progress as Record<string, { scrollRatio: number }>)["article-1"].scrollRatio,
    ).toBe(0.42);
    // Nothing is queued for a server that local mode never talks to.
    expect(blob?.outbox).toEqual([]);
    expect(hoisted.syncCalls).toBe(0);
  });

  it("comes back after a reload with the same place", async () => {
    const first = renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    act(() => {
      latest!.setCurrentArticle("article-2");
      latest!.recordPosition("article-2", null, 0.6, null);
    });
    first.unmount();

    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    expect(latest?.data.currentArticleId).toBe("article-2");
    expect(latest?.entryOf("article-2").scrollRatio).toBe(0.6);
  });

  it("is never read by an account, and never reads one", async () => {
    window.localStorage.setItem(
      readerDataStorageKey("r:00000000-0000-4000-8000-000000000001"),
      JSON.stringify({ secret: true }),
    );
    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    expect(latest?.data.currentArticleId).toBeNull();
    expect(Object.keys(latest?.data.progress ?? {})).toEqual([]);
  });

  it("resets a series here, without the server", async () => {
    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    act(() => {
      latest!.recordPosition("article-1", null, 0.5, null);
      latest!.recordPosition("article-9", null, 0.3, null);
    });
    await act(async () => {
      await latest!.resetSeries("ai", ["article-1"]);
    });
    expect(hoisted.resetCalls).toBe(0);
    expect(latest?.data.progress["article-1"]).toBeUndefined();
    expect(latest?.data.progress["article-9"]).toBeDefined();
    const progress = stored()?.progress as Record<string, unknown>;
    expect(progress["article-1"]).toBeUndefined();
  });

  it("keeps nothing once the visitor turns it off, and forgets what was kept", async () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ version: 2, workspaceId: LOCAL_WORKSPACE_ID }),
    );
    setLocalTrackingEnabled(false);
    expect(window.localStorage.getItem(KEY)).toBeNull();
    expect(window.localStorage.getItem(LOCAL_TRACKING_STORAGE_KEY)).toBe("off");

    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    expect(latest?.keepsLocalReading).toBe(false);
    act(() => {
      latest!.setCurrentArticle("article-1");
      latest!.recordPosition("article-1", null, 0.5, null);
    });
    // Reading still works in memory…
    expect(latest?.entryOf("article-1").scrollRatio).toBe(0.5);
    // …but nothing reaches storage.
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  it("keeps reading when storage throws on every call", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("blocked", "SecurityError");
    });
    renderLocal();
    await waitFor(() => expect(latest?.ready).toBe(true));
    act(() => {
      latest!.setCurrentArticle("article-1");
      latest!.recordPosition("article-1", null, 0.25, null);
    });
    expect(latest?.entryOf("article-1").scrollRatio).toBe(0.25);
    expect(latest?.storageAvailable).toBe(false);
  });
});
