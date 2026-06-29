import { describe, expect, it } from "vitest";
import { resolveTextAnchor, serializeTextAnchor } from "./text-anchor";

function rangeFor(text: Text, selected: string): Range {
  const start = text.data.indexOf(selected);
  const range = document.createRange();
  range.setStart(text, start);
  range.setEnd(text, start + selected.length);
  return range;
}

describe("text anchors", () => {
  it("serializes and resolves a prose selection", () => {
    const root = document.createElement("div");
    root.innerHTML = `
      <h2 id="giris">Giriş</h2>
      <p>İlk cümle burada. İşaretlenecek önemli cümle burada.</p>
    `;
    document.body.appendChild(root);
    const text = root.querySelector("p")!.firstChild as Text;
    const range = rangeFor(text, "İşaretlenecek önemli cümle");

    const anchor = serializeTextAnchor(root, range);
    expect(anchor).toMatchObject({
      exactText: "İşaretlenecek önemli cümle",
      headingId: "giris",
      blockIndex: 0,
    });
    expect(resolveTextAnchor(root, anchor!)?.toString()).toBe("İşaretlenecek önemli cümle");
    root.remove();
  });

  it("uses prefix context to disambiguate repeated quotes", () => {
    const root = document.createElement("div");
    root.innerHTML = `<p>Birinci bağlam ortak ifade bitti.</p><p>İkinci bağlam ortak ifade seçildi.</p>`;
    document.body.appendChild(root);
    const text = root.querySelectorAll("p")[1].firstChild as Text;
    const anchor = serializeTextAnchor(root, rangeFor(text, "ortak ifade"))!;
    const resolved = resolveTextAnchor(root, anchor)!;

    expect(resolved.startContainer.parentElement).toBe(root.querySelectorAll("p")[1]);
    root.remove();
  });

  it("rejects selections inside code blocks", () => {
    const root = document.createElement("div");
    root.innerHTML = `<pre><code>const secret = true;</code></pre>`;
    document.body.appendChild(root);
    const text = root.querySelector("code")!.firstChild as Text;
    expect(serializeTextAnchor(root, rangeFor(text, "secret"))).toBeNull();
    root.remove();
  });
});
