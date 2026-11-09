/**
 * Holds the page still under a modal layer (the figure viewer, the phone reading list).
 *
 * Hiding the body's overflow takes the page scrollbar away, and without it the page
 * would widen by the bar's width and jump sideways behind the layer — then jump back
 * when it closes. The bar's width is handed back as padding for as long as the lock
 * lasts. A page with no bar (the paged reader, a touch screen's overlay bars) measures
 * no gap and gets no padding.
 *
 * Returns the release function, which puts back exactly the inline styles it found, so
 * a lock taken while another is held unwinds in order.
 */
export function lockPageScroll(): () => void {
  const { body, documentElement } = document;
  const previousOverflow = body.style.overflow;
  const previousPaddingRight = body.style.paddingRight;

  // Measured before the bar goes; afterwards the gap is always zero.
  const gap = window.innerWidth - documentElement.clientWidth;
  const padding = gap > 0 ? parseFloat(getComputedStyle(body).paddingRight) || 0 : 0;

  body.style.overflow = "hidden";
  if (gap > 0) body.style.paddingRight = `${padding + gap}px`;

  return () => {
    body.style.overflow = previousOverflow;
    body.style.paddingRight = previousPaddingRight;
  };
}
