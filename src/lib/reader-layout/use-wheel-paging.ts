"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  createWheelPager,
  resolveWheelDelta,
  type PageTurn,
  type WheelIntent,
} from "./wheel-paging";

function canScrollFurther(node: Element, { delta, axis }: WheelIntent): boolean {
  const style = window.getComputedStyle(node);
  const overflow = axis === "x" ? style.overflowX : style.overflowY;
  if (overflow !== "auto" && overflow !== "scroll") return false;
  const extent =
    axis === "x" ? node.scrollWidth - node.clientWidth : node.scrollHeight - node.clientHeight;
  if (extent <= 1) return false;
  const position = axis === "x" ? node.scrollLeft : node.scrollTop;
  return delta < 0 ? position > 1 : position < extent - 1;
}

/**
 * True when something under the pointer — a wide table, a diagram in its own
 * horizontal scroller — can still absorb the gesture itself. The article container
 * is excluded on purpose: its horizontal scroll *is* the page mechanism, and the
 * browser must never move it to an offset between two pages.
 */
function nestedScrollerHandles(
  target: EventTarget | null,
  area: Element,
  content: Element | null,
  intent: WheelIntent,
): boolean {
  let node = target instanceof Element ? target : null;
  while (node && node !== area && node !== content) {
    if (canScrollFurther(node, intent)) return true;
    node = node.parentElement;
  }
  return false;
}

/**
 * Turns pages when the reader scrolls over the article. Deliberately bound to the
 * reading area only, so the sidebar, the toolbar menus and the settings panel keep
 * their own scrolling.
 */
export function useWheelPaging({
  areaRef,
  contentRef,
  enabled,
  onTurn,
}: {
  areaRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  onTurn: (direction: PageTurn) => void;
}) {
  const onTurnRef = useRef(onTurn);
  onTurnRef.current = onTurn;

  useEffect(() => {
    const area = areaRef.current;
    if (!area || !enabled) return;
    const pager = createWheelPager();

    function onWheel(event: WheelEvent) {
      // Ctrl+wheel is the browser's zoom gesture; it is not ours to take.
      if (event.ctrlKey || !area) return;
      const intent = resolveWheelDelta(event);
      if (intent.delta === 0) return;
      if (nestedScrollerHandles(event.target, area, contentRef.current, intent)) return;

      // The paged frame has nothing to scroll: whatever this gesture is worth, it is
      // worth a page turn or nothing at all.
      event.preventDefault();
      const direction = pager.push(intent.delta, event.timeStamp);
      if (direction !== 0) onTurnRef.current(direction);
    }

    area.addEventListener("wheel", onWheel, { passive: false });
    return () => area.removeEventListener("wheel", onWheel);
  }, [areaRef, contentRef, enabled]);
}
