"use client";

import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { TOOLBAR_OFFSET_PX } from "@/lib/reader/version";

export type HeadingInfo = {
  id: string;
  text: string;
  level: number;
  top: number;
};

export function extractHeadings(container: HTMLElement | null): HeadingInfo[] {
  if (!container) return [];
  const nodes = container.querySelectorAll<HTMLElement>("h2[id], h3[id]");
  return Array.from(nodes).map((node) => ({
    id: node.id,
    text: node.textContent || "",
    level: parseInt(node.tagName.charAt(1), 10),
    top: node.getBoundingClientRect().top + window.scrollY,
  }));
}

export function computeActiveHeading(headings: HeadingInfo[], scrollY: number, offset: number): string | null {
  let activeId: string | null = null;
  for (const heading of headings) {
    if (heading.top <= scrollY + offset + 4) {
      activeId = heading.id;
    } else {
      break;
    }
  }
  return activeId;
}

export function ArticleToc({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [headings, setHeadings] = useState<HeadingInfo[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const run = () => {
      setHeadings(extractHeadings(containerRef.current));
    };

    // Need to wait for layout and fonts to settle for accurate positions
    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => window.requestAnimationFrame(run));
    } else {
      window.requestAnimationFrame(run);
    }

    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, [containerRef]);

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        // recalculate headings top just in case they moved
        const fresh = extractHeadings(containerRef.current);
        if (fresh.length > 0) {
            setActiveId(computeActiveHeading(fresh, window.scrollY, TOOLBAR_OFFSET_PX));
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [headings, containerRef]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-sans text-2xs text-text-muted transition-colors hover:border-border-strong hover:text-text"
        aria-label={UI.tableOfContents}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={UI.tableOfContents}
      >
        <List className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={UI.tableOfContents}
          className="absolute right-0 top-full mt-2 w-64 max-h-[60vh] overflow-y-auto rounded-lg border border-border bg-surface shadow-xl max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:w-full max-sm:max-h-[50vh] max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 sm:right-auto z-50 p-3 font-sans"
        >
          <div className="mb-2 px-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{UI.tableOfContents}</span>
          </div>
          <ul className="flex flex-col">
            {headings.map((h) => {
              const isActive = h.id === activeId;
              return (
                <li key={h.id} className="flex">
                  <a
                    href={`#${h.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex-1 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      h.level === 3 ? "ml-4" : ""
                    } ${
                      isActive
                        ? "bg-surface-muted text-accent font-medium"
                        : "text-text hover:bg-surface-muted hover:text-text"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
