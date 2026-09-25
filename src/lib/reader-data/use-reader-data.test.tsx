import { cleanup, render, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readerDataStorageKey } from "@/lib/reader/version";
import type { SyncRequest, SyncResponse } from "./sync-contract";

const hoisted = vi.hoisted(() => ({
  requests: [] as SyncRequest[],
  serverResetVersion: 5,
}));

vi.mock("./sync-client", () => ({
  requestReaderSync: vi.fn(async (request: SyncRequest): Promise<SyncResponse> => {
    hoisted.requests.push(structuredClone(request));
    return {
      cursor: 60 + hoisted.requests.length,
      resetVersion: hoisted.serverResetVersion,
      acknowledged: request.operations.map((operation) => operation.operationId),
      errors: [],
      changes: { progress: [], savedPlaces: [], highlights: [] },
      serverTime: new Date().toISOString(),
    };
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
  latest = null;
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
