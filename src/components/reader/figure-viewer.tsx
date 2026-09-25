"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Minimize2, X, ZoomIn } from "lucide-react";
import { UI } from "@/lib/content/labels";

type OpenFigure = {
  svg: SVGSVGElement;
  caption: string;
  /** Where focus goes back to when the viewer closes. */
  trigger: HTMLElement | null;
};

const FOCUSABLE = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Below this width a diagram's 13-unit labels render under ~11px, so the viewer
 * opens on the enlarged drawing rather than on a copy of what the page shows.
 */
const COMFORTABLE_WIDTH = 600;

/** Enlarged width: twice the fitted drawing, and never less than labels at ~16px. */
function zoomWidth(fitWidth: number): number {
  return Math.max(Math.round(fitWidth * 2), 900);
}

/**
 * Diagrams fit their column so the whole drawing is always in view (see
 * globals.css); on a phone or in a paged column that leaves labels at 6–9px. This
 * adds the other half — the detail — on demand: the figure's own button, or a
 * click on the drawing, opens it full-screen, fitted or enlarged and scrollable.
 *
 * The page's figures are server-rendered markup, so this listens on the reading
 * area instead of owning them, and shows a copy of the drawing in a portal: the
 * page's wheel paging and scroll tracking never see the viewer's gestures.
 */
export function FigureViewer({
  containerRef,
  articleId,
}: {
  containerRef: RefObject<HTMLElement | null>;
  articleId: string;
}) {
  const [open, setOpen] = useState<OpenFigure | null>(null);

  useEffect(() => {
    setOpen(null);
    const root = containerRef.current;
    if (!root) return;

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      const target = event.target instanceof Element ? event.target : null;
      const figure = target?.closest<HTMLElement>("figure.series-figure");
      if (!target || !figure || !root?.contains(figure)) return;
      const button = target.closest<HTMLElement>("[data-figure-zoom]");
      if (!button) {
        // The drawing itself is a larger target than its button. A drag that
        // selected text inside it is not a request to open it.
        if (!target.closest(".series-figure-scroll")) return;
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed) return;
      }
      const svg = figure.querySelector<SVGSVGElement>(".series-figure-scroll svg");
      if (!svg) return;
      event.preventDefault();
      setOpen({
        svg,
        caption: figure.querySelector("figcaption")?.textContent?.trim() ?? "",
        trigger: button ?? figure.querySelector<HTMLElement>("[data-figure-zoom]"),
      });
    }

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [containerRef, articleId]);

  if (!open) return null;
  return createPortal(
    <Viewer
      figure={open}
      onClose={() => {
        setOpen(null);
        // Without preventScroll a paged column could be scrolled to the trigger.
        open.trigger?.focus({ preventScroll: true });
      }}
    />,
    document.body,
  );
}

function Viewer({ figure, onClose }: { figure: OpenFigure; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [fitWidth, setFitWidth] = useState(0);
  const [zoomed, setZoomed] = useState<boolean | null>(null);

  const box = figure.svg.viewBox?.baseVal;
  const aspect = box && box.width > 0 && box.height > 0 ? box.width / box.height : 1.8;

  // A copy of the page's drawing; theme colours come from the same CSS variables.
  useLayoutEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const copy = figure.svg.cloneNode(true) as SVGSVGElement;
    copy.removeAttribute("style");
    holder.replaceChildren(copy);
  }, [figure]);

  // The largest width at which the whole drawing fits the stage in both directions.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const style = getComputedStyle(stage);
      const width =
        stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      const height =
        stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      setFitWidth(Math.max(160, Math.floor(Math.min(width, height * aspect))));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [aspect]);

  useEffect(() => {
    if (zoomed === null && fitWidth > 0) setZoomed(fitWidth < COMFORTABLE_WIDTH);
  }, [fitWidth, zoomed]);

  // Modal behaviour: focus inside, Tab kept inside, Escape closes, page held still.
  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      // Focus on the dialog itself (a click on the caption) or anywhere outside it
      // re-enters at the matching end instead of leaking to the page behind.
      if (!active || !items.includes(active as HTMLElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const width = zoomed ? zoomWidth(fitWidth) : fitWidth;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={figure.caption || UI.figureViewer}
      // A click on non-interactive parts lands focus here, inside the dialog, so the
      // paged reader's arrow keys never reach the text behind it.
      tabIndex={-1}
      className="figure-viewer fixed inset-0 z-[70] flex flex-col bg-bg text-text focus:outline-none"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2 sm:px-5">
        <p className="min-w-0 flex-1 truncate font-sans text-sm text-text-muted">
          {figure.caption}
        </p>
        <button
          type="button"
          onClick={() => setZoomed((value) => !value)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-sans text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text"
        >
          {zoomed ? (
            <Minimize2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ZoomIn className="h-4 w-4" aria-hidden="true" />
          )}
          {zoomed ? UI.figureFit : UI.figureZoom}
        </button>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label={UI.closeFigure}
          title={UI.closeFigure}
          className="shrink-0 rounded-md border border-border p-1.5 text-text-muted transition-colors hover:border-border-strong hover:text-text"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {/* Scrollable by touch, wheel and — once focused — the arrow keys. */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label={UI.figureStage}
        className="min-h-0 flex-1 overflow-auto overscroll-contain p-4 sm:p-8"
      >
        <div
          ref={holderRef}
          className="figure-viewer-drawing mx-auto"
          style={{ width: width || undefined, visibility: zoomed === null ? "hidden" : undefined }}
        />
      </div>
    </div>
  );
}
