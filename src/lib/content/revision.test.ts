import { describe, expect, it } from "vitest";
import { formatRevisionDate, readBeforeRevision } from "./revision";
import { STARTED_RATIO } from "@/lib/reader/version";

describe("formatRevisionDate", () => {
  it("renders a Turkish calendar date independent of the host time zone", () => {
    expect(formatRevisionDate("2026-09-25")).toBe("25 Eylül 2026");
    expect(formatRevisionDate("2026-01-01")).toBe("1 Ocak 2026");
  });

  it("has a short form for the toolbar", () => {
    expect(formatRevisionDate("2026-09-25", "short")).toBe("25 Eyl 2026");
  });

  it("returns the input unchanged when it is not a date", () => {
    expect(formatRevisionDate("not-a-date")).toBe("not-a-date");
  });
});

describe("readBeforeRevision", () => {
  const revisedAt = "2026-09-25";
  const engaged = { completed: false, scrollRatio: 0.5, lastReadAt: "2026-09-20T18:00:00.000Z" };

  it("is true when the reader was into the article on an earlier day", () => {
    expect(readBeforeRevision(engaged, revisedAt)).toBe(true);
  });

  it("counts a completed article even at the top of the page", () => {
    expect(
      readBeforeRevision({ ...engaged, completed: true, scrollRatio: 0 }, revisedAt),
    ).toBe(true);
  });

  it("ignores an article that was only opened", () => {
    expect(readBeforeRevision({ ...engaged, scrollRatio: STARTED_RATIO }, revisedAt)).toBe(false);
  });

  it("does not claim a change for a visit on the revision day or later", () => {
    expect(
      readBeforeRevision({ ...engaged, lastReadAt: "2026-09-25T06:00:00.000Z" }, revisedAt),
    ).toBe(false);
    expect(
      readBeforeRevision({ ...engaged, lastReadAt: "2026-10-02T06:00:00.000Z" }, revisedAt),
    ).toBe(false);
  });

  it("is false without progress, without a revision, or with an unusable timestamp", () => {
    expect(readBeforeRevision(undefined, revisedAt)).toBe(false);
    expect(readBeforeRevision(null, revisedAt)).toBe(false);
    expect(readBeforeRevision(engaged, undefined)).toBe(false);
    expect(readBeforeRevision({ ...engaged, lastReadAt: "" }, revisedAt)).toBe(false);
  });
});
