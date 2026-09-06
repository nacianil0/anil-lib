/**
 * Turning pages with a wheel or a trackpad.
 *
 * A trackpad flick keeps firing events for up to a second after the fingers have
 * left the surface, so reacting to raw deltas would fly through several pages on a
 * single physical gesture. The pager below therefore reads a gesture, not an event:
 * deltas accumulate until they clear a threshold, that turns exactly one page, and
 * nothing else turns until the event stream has gone quiet again.
 */

export type WheelAxis = "x" | "y";
export type WheelIntent = { delta: number; axis: WheelAxis };
export type PageTurn = -1 | 0 | 1;

/** Accumulated distance that turns a page. One classic wheel notch (~100px) clears it. */
export const PAGE_TURN_THRESHOLD_PX = 50;
/**
 * Quiet time that ends a gesture. Momentum events arrive far closer together than
 * this, so the tail of a flick is swallowed, while a second deliberate push — which
 * costs a human at least this long — starts a new gesture.
 */
export const GESTURE_IDLE_MS = 180;

/** Rough pixel values for the two non-pixel delta modes Firefox and old mice report. */
const LINE_DELTA_PX = 16;
const PAGE_DELTA_PX = 400;

/**
 * The distance the reader asked for, in pixels, along whichever axis they pushed
 * hardest: a two-finger sideways swipe is as much a page turn as a downward one.
 */
export function resolveWheelDelta(
  event: Pick<WheelEvent, "deltaX" | "deltaY" | "deltaMode">,
): WheelIntent {
  const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
  const raw = vertical ? event.deltaY : event.deltaX;
  const scale = event.deltaMode === 1 ? LINE_DELTA_PX : event.deltaMode === 2 ? PAGE_DELTA_PX : 1;
  return { delta: raw * scale, axis: vertical ? "y" : "x" };
}

export type WheelPager = {
  /** Feeds one wheel event in. Returns the page step it earned: -1, 0 or 1. */
  push(delta: number, at: number): PageTurn;
  reset(): void;
};

export function createWheelPager({
  threshold = PAGE_TURN_THRESHOLD_PX,
  idleMs = GESTURE_IDLE_MS,
}: { threshold?: number; idleMs?: number } = {}): WheelPager {
  let accumulated = 0;
  let direction: PageTurn = 0;
  let turned = false;
  let lastAt = Number.NEGATIVE_INFINITY;

  function startOver() {
    accumulated = 0;
    direction = 0;
    turned = false;
  }

  return {
    push(delta, at) {
      if (at - lastAt >= idleMs) startOver();
      lastAt = at;
      if (delta === 0 || turned) return 0;

      const sign: PageTurn = delta > 0 ? 1 : -1;
      // Reversing mid-gesture is a correction, not a continuation: the distance
      // travelled the other way must not count towards the turn.
      if (sign !== direction) {
        accumulated = 0;
        direction = sign;
      }
      accumulated += Math.abs(delta);
      if (accumulated < threshold) return 0;

      turned = true;
      accumulated = 0;
      return sign;
    },
    reset() {
      startOver();
      lastAt = Number.NEGATIVE_INFINITY;
    },
  };
}
