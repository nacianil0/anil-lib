import React, {
  Children,
  isValidElement,
  cloneElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";

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

function renderWithSentences(node: ReactNode, state: { idx: number }): ReactNode {
  if (typeof node === "string") {
    const parts = node.split(/(?<=[.!?])(?=\s)/);
    return parts.map((part, i) => {
      if (!part) return null;
      const currentIdx = state.idx;
      const endsSentence = /[.!?]$/.test(part.trimEnd());
      if (endsSentence) state.idx++;
      return (
        <span key={i} className="colored-sentence" data-color-idx={currentIdx % 4}>
          {part}
        </span>
      );
    });
  }
  if (isValidElement(node)) {
    const props = node.props as any;
    return cloneElement(node, {
      ...props,
      children: renderWithSentences(props.children, state),
    } as any);
  }
  if (Array.isArray(node)) {
    return Children.map(node, (child) => renderWithSentences(child, state));
  }
  return node;
}

type TextBlockProps = HTMLAttributes<HTMLElement> & { children?: ReactNode; node?: unknown };

function Paragraph({ children, node: _node, ...props }: TextBlockProps) {
  const state = { idx: 0 };
  return <p {...props}>{renderWithSentences(children, state)}</p>;
}

function ListItem({ children, node: _node, ...props }: TextBlockProps) {
  const state = { idx: 0 };
  return <li {...props}>{renderWithSentences(children, state)}</li>;
}

/** Element overrides applied during Markdown → React rendering. */
export const mdxComponents = {
  table: TableScroll,
  a: SmartLink,
  p: Paragraph,
  li: ListItem,
};
