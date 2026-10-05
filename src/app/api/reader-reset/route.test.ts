// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import type { ReaderUser } from "@/lib/auth/user-schema";
import { POST } from "./route";

const mocks = vi.hoisted(() => ({
  authorize: vi.fn(),
  session: vi.fn(),
  database: vi.fn(),
  reset: vi.fn(),
}));

vi.mock("@/lib/auth/require-reader-session", () => ({ authorizeReaderRequest: mocks.authorize }));
vi.mock("@/lib/auth/session-user", () => ({ getSessionUser: mocks.session }));
vi.mock("@/lib/db/client", () => ({ getDatabaseClient: mocks.database }));
vi.mock("@/lib/reader-data/server/reset-service", () => ({
  resetSeriesReadingProgress: mocks.reset,
}));

const actor: ReaderUser = {
  id: "00000000-0000-4000-8000-00000000000b",
  username: "reader",
  workspaceId: "reader-workspace",
  role: "user",
  lastLoginAt: null,
  createdAt: "2026-06-01T08:00:00.000Z",
};
const database = {};
const result = {
  reset: { seriesId: "ai", resetVersion: 42, articleIds: ["article_1"] },
  progress: 5,
};

function request(body: unknown = { seriesId: "ai" }) {
  return new NextRequest("http://localhost/api/reader-reset", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "http://localhost" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.authorize.mockResolvedValue({
    ok: true,
    workspaceId: actor.workspaceId,
    isOwnerWorkspace: false,
  });
  mocks.session.mockResolvedValue(actor);
  mocks.database.mockReturnValue(database);
  mocks.reset.mockResolvedValue(result);
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("POST /api/reader-reset", () => {
  it("resets a regular reader's own series using the server-resolved account", async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(result);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(mocks.authorize).toHaveBeenCalledWith(expect.any(NextRequest), {
      requireSameOrigin: true,
    });
    expect(mocks.reset).toHaveBeenCalledWith(database, actor, "ai");
  });

  it("honors authentication and same-origin rejection before resetting", async () => {
    mocks.authorize.mockResolvedValue({ ok: false, status: 403, code: "origin_mismatch" });
    const response = await POST(request());
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "origin_mismatch" });
    expect(mocks.session).not.toHaveBeenCalled();
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it.each([
    { seriesId: "archive" },
    { seriesId: "ai", workspaceId: "owner" },
    { seriesId: "ai", articleIds: ["article_1"] },
  ])("rejects invalid series or client-supplied scope: %j", async (body) => {
    const response = await POST(request(body));
    expect(response.status).toBe(422);
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(
      new NextRequest("http://localhost/api/reader-reset", {
        method: "POST",
        body: "{",
      }),
    );
    expect(response.status).toBe(422);
    expect(await response.json()).toEqual({ error: "invalid_json" });
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("bounds the actual body even without content-length", async () => {
    const response = await POST(request({ seriesId: "ai", extra: "x".repeat(4096) }));
    expect(response.status).toBe(413);
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("rejects a session that no longer resolves to an account", async () => {
    mocks.session.mockResolvedValue(null);
    const response = await POST(request());
    expect(response.status).toBe(401);
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("rejects a workspace mismatch between the cookie and database account", async () => {
    mocks.session.mockResolvedValue({ ...actor, workspaceId: "other-workspace" });
    const response = await POST(request());
    expect(response.status).toBe(403);
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("reports unavailable persistence without resetting local progress", async () => {
    mocks.database.mockReturnValue(null);
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(mocks.reset).not.toHaveBeenCalled();
  });

  it("returns a controlled error when the reset transaction fails", async () => {
    mocks.reset.mockRejectedValue(new Error("database failure"));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "reset_unavailable" });
  });
});
