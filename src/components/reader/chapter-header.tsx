import type { Ref } from "react";

/**
 * The chapter's own title at the top of the text. Series chapters keep their title
 * in frontmatter and open on an `h2` (docs/seri/SOZLESME.md), so without this the
 * page began mid-thought and the title lived only in the browser tab.
 *
 * Deliberately outside `.prose-reader`: highlights and the reading anchor are
 * measured against that element's text, and a title inside it would shift them.
 */
export function ChapterHeader({
  ref,
  eyebrow,
  title,
  meta,
}: {
  ref?: Ref<HTMLElement>;
  /** Where the chapter sits in the series: its phase, or its category. */
  eyebrow: string;
  title: string;
  /** Level and reading time — worth knowing before the first line, not on every screen. */
  meta: string[];
}) {
  return (
    <header ref={ref} className="chapter-header">
      <p className="font-sans text-xs font-medium text-text-muted">{eyebrow}</p>
      <h1 className="chapter-header-title">{title}</h1>
      <p className="font-sans text-xs text-text-muted">
        {meta.map((item, index) => (
          <span key={item}>
            {index > 0 && (
              <span className="px-1.5 text-text-faint" aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
    </header>
  );
}
