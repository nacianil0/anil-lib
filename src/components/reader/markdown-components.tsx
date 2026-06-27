import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type TableProps = HTMLAttributes<HTMLTableElement> & { children?: ReactNode; node?: unknown };
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode; node?: unknown };

/** Wrap tables so wide content scrolls horizontally instead of stretching the page. */
function TableScroll({ children, node: _node, ...props }: TableProps) {
  return (
    <div className="table-scroll">
      <table {...props}>{children}</table>
    </div>
  );
}

/** Open external links in a new tab with safe rel; keep in-page anchors native. */
function SmartLink({ href, children, node: _node, ...props }: LinkProps) {
  const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

/** Element overrides applied during Markdown → React rendering. */
export const mdxComponents = {
  table: TableScroll,
  a: SmartLink,
};
