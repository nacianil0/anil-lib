import { afterEach, describe, expect, it, vi } from "vitest";
import { CLASSIC_SCROLLBARS_CLASS, SCROLLBAR_PROBE_SCRIPT } from "./scrollbar-probe";

function runProbe(barWidth: number) {
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(100 - barWidth);
  new Function(SCROLLBAR_PROBE_SCRIPT)();
}

afterEach(() => {
  vi.restoreAllMocks();
  document.documentElement.classList.remove(CLASSIC_SCROLLBARS_CLASS);
});

describe("SCROLLBAR_PROBE_SCRIPT", () => {
  it("marks the page when the platform's bar takes room", () => {
    runProbe(17);
    expect(document.documentElement.classList.contains(CLASSIC_SCROLLBARS_CLASS)).toBe(true);
  });

  it("leaves overlay bars alone", () => {
    runProbe(0);
    expect(document.documentElement.classList.contains(CLASSIC_SCROLLBARS_CLASS)).toBe(false);
  });

  it("removes its probe and keeps the other classes on <html>", () => {
    document.documentElement.classList.add("dark");
    const before = document.documentElement.childElementCount;
    runProbe(15);
    expect(document.documentElement.childElementCount).toBe(before);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    document.documentElement.classList.remove("dark");
  });
});
