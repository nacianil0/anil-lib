import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { bucketKey, currentHits, isOverLimit, RATE_LIMITS, recordHit } from "./rate-limit";

type Call = { text: string; params: unknown[] };
const calls: Call[] = [];
let rows: Record<string, unknown>[] = [];

const sql = {
  query: vi.fn(async (text: string, params: unknown[] = []) => {
    calls.push({ text, params });
    return rows;
  }),
} as unknown as NeonQueryFunction<false, false>;

beforeEach(() => {
  calls.length = 0;
  rows = [];
});

describe("bucketKey", () => {
  it("never carries the subject itself", () => {
    const key = bucketKey(RATE_LIMITS.loginIp, "203.0.113.7", "secret-a");
    expect(key).toMatch(/^login-ip:[a-f0-9]{32}$/);
    expect(key).not.toContain("203.0.113.7");
  });

  it("depends on the rule, the subject and the secret", () => {
    const base = bucketKey(RATE_LIMITS.loginIp, "203.0.113.7", "secret-a");
    expect(bucketKey(RATE_LIMITS.loginIp, "203.0.113.8", "secret-a")).not.toBe(base);
    expect(bucketKey(RATE_LIMITS.loginIp, "203.0.113.7", "secret-b")).not.toBe(base);
    expect(
      bucketKey(RATE_LIMITS.loginAccount, "203.0.113.7", "secret-a").startsWith("login-acct:"),
    ).toBe(true);
  });
});

describe("counters", () => {
  it("reads the current window without writing", async () => {
    rows = [{ hits: 4 }];
    expect(await currentHits(sql, "k", RATE_LIMITS.loginIp)).toBe(4);
    expect(calls).toHaveLength(1);
    expect(calls[0].text).toMatch(/^SELECT hits FROM auth_rate_limits/);
    expect(calls[0].params).toEqual(["k", RATE_LIMITS.loginIp.windowSeconds]);
  });

  it("treats a window with no row as empty", async () => {
    rows = [];
    expect(await currentHits(sql, "k", RATE_LIMITS.loginIp)).toBe(0);
    expect(await isOverLimit(sql, "k", RATE_LIMITS.loginIp)).toBe(false);
  });

  it("is over the limit once the window holds `limit` hits", async () => {
    rows = [{ hits: RATE_LIMITS.loginAccount.limit }];
    expect(await isOverLimit(sql, "k", RATE_LIMITS.loginAccount)).toBe(true);
    rows = [{ hits: RATE_LIMITS.loginAccount.limit - 1 }];
    expect(await isOverLimit(sql, "k", RATE_LIMITS.loginAccount)).toBe(false);
  });

  it("increments atomically and returns the new total", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    rows = [{ hits: 3 }];
    expect(await recordHit(sql, "k", RATE_LIMITS.registerIp)).toBe(3);
    expect(calls).toHaveLength(1);
    expect(calls[0].text).toMatch(/ON CONFLICT \(bucket, window_start\) DO UPDATE/);
    expect(calls[0].text).toMatch(/RETURNING hits/);
    vi.restoreAllMocks();
  });

  it("now and then clears windows older than a day", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.001);
    rows = [{ hits: 1 }];
    await recordHit(sql, "k", RATE_LIMITS.registerIp);
    expect(calls.map((call) => call.text)).toContainEqual(
      expect.stringMatching(
        /DELETE FROM auth_rate_limits WHERE window_start < now\(\) - interval '1 day'/,
      ),
    );
    vi.restoreAllMocks();
  });
});
