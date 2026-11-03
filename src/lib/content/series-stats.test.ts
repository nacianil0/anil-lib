import { describe, expect, it } from "vitest";
import { countFigures, countReferences, seriesStats } from "./series-stats";

describe("countReferences", () => {
  it("counts list entries under the Kaynakça heading only", () => {
    const markdown = [
      "## Giriş",
      "- bir madde, kaynak değil",
      "## Kaynakça",
      "- Yazar (2024). *Başlık*. [Bağlantı](https://example.org)",
      "- Yazar (2025). *Başlık*. [Bağlantı](https://example.org)",
      "",
      "## Sonraki",
      "- yine kaynak değil",
    ].join("\n");
    expect(countReferences(markdown)).toBe(2);
  });

  it("is zero without a Kaynakça heading", () => {
    expect(countReferences("## Giriş\n- madde")).toBe(0);
  });
});

describe("countFigures", () => {
  it("counts only the series' own SVG figures", () => {
    const markdown = [
      '![Alt metin](assets/sekil-1.svg "Şekil 1 — başlık")',
      "metin ![satır içi](assets/x.svg) değil",
      '![Başka](assets/sekil-2.svg "Şekil 2 — başlık")',
      "![dış](https://example.org/x.png)",
    ].join("\n");
    expect(countFigures(markdown)).toBe(2);
  });
});

describe("seriesStats", () => {
  it("states the published series as it is: every article cites sources", () => {
    const stats = seriesStats();
    expect(stats.articles).toBeGreaterThan(0);
    expect(stats.references).toBeGreaterThanOrEqual(stats.articles);
    expect(stats.figures).toBeGreaterThan(0);
    expect(stats.revised).toBeLessThanOrEqual(stats.articles);
  });
});
