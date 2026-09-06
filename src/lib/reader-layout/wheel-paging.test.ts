import { describe, expect, it } from "vitest";
import {
  createWheelPager,
  GESTURE_IDLE_MS,
  PAGE_TURN_THRESHOLD_PX,
  resolveWheelDelta,
} from "./wheel-paging";

describe("resolveWheelDelta", () => {
  it("follows the dominant axis", () => {
    expect(resolveWheelDelta({ deltaX: 4, deltaY: -80, deltaMode: 0 })).toEqual({
      delta: -80,
      axis: "y",
    });
    expect(resolveWheelDelta({ deltaX: 90, deltaY: 12, deltaMode: 0 })).toEqual({
      delta: 90,
      axis: "x",
    });
  });

  it("converts line and page deltas to pixels", () => {
    expect(resolveWheelDelta({ deltaX: 0, deltaY: 3, deltaMode: 1 }).delta).toBe(48);
    expect(resolveWheelDelta({ deltaX: 0, deltaY: -1, deltaMode: 2 }).delta).toBe(-400);
  });
});

describe("createWheelPager", () => {
  it("turns a single page for one flick and swallows its momentum", () => {
    const pager = createWheelPager();
    const turns: number[] = [];
    // A trackpad flick: a short push, then a long decaying tail of momentum events.
    for (let index = 0; index < 40; index += 1) {
      turns.push(pager.push(Math.max(2, 30 - index), index * 16));
    }
    expect(turns.filter((turn) => turn !== 0)).toEqual([1]);
  });

  it("turns immediately on a classic wheel notch but not twice in one spin", () => {
    const pager = createWheelPager();
    expect(pager.push(100, 0)).toBe(1);
    expect(pager.push(100, 60)).toBe(0);
    expect(pager.push(100, 120)).toBe(0);
  });

  it("arms again once the reader has stopped scrolling", () => {
    const pager = createWheelPager();
    expect(pager.push(100, 0)).toBe(1);
    expect(pager.push(100, GESTURE_IDLE_MS - 1)).toBe(0);
    expect(pager.push(100, GESTURE_IDLE_MS * 2)).toBe(1);
  });

  it("keeps a slow gesture below the threshold from turning", () => {
    const pager = createWheelPager();
    let turned = 0;
    for (let index = 0; index < 5; index += 1) {
      turned += pager.push(PAGE_TURN_THRESHOLD_PX / 6, index * 16);
    }
    expect(turned).toBe(0);
    expect(pager.push(PAGE_TURN_THRESHOLD_PX, 5 * 16)).toBe(1);
  });

  it("reads a reversal as a fresh direction rather than a completed turn", () => {
    const pager = createWheelPager();
    expect(pager.push(30, 0)).toBe(0);
    expect(pager.push(-30, 16)).toBe(0);
    expect(pager.push(-30, 32)).toBe(-1);
  });

  it("forgets an interrupted gesture on reset", () => {
    const pager = createWheelPager();
    expect(pager.push(40, 0)).toBe(0);
    pager.reset();
    expect(pager.push(40, 16)).toBe(0);
    expect(pager.push(40, 32)).toBe(1);
  });
});
