import { describe, expect, it } from "vitest";
import { assertRoadmapMatchesCatalog, validateSeriesRoadmap } from "./series-roadmap";

function roadmap(overrides: Record<string, unknown> = {}) {
  return {
    schemaVersion: 1,
    seriesTitle: "Sıfırdan Yüze: Yapay Zekâ",
    seriesSubtitle: "Test alt başlığı.",
    phases: [
      {
        id: "faz-01",
        title: "Faz 1",
        description: "Açıklama",
        articles: [
          { order: 1, title: "Bir", status: "yayinda", slug: "bir" },
          { order: 2, title: "İki", status: "planlandi" },
        ],
      },
      {
        id: "faz-02",
        title: "Faz 2",
        description: "Açıklama",
        articles: [{ order: 3, title: "Üç", status: "planlandi" }],
      },
    ],
    ...overrides,
  };
}

describe("validateSeriesRoadmap", () => {
  it("accepts a well-formed roadmap", () => {
    const result = validateSeriesRoadmap(roadmap());
    expect(result.phases).toHaveLength(2);
  });

  it("rejects a broken order sequence", () => {
    const bad = roadmap();
    bad.phases[1].articles[0].order = 5;
    expect(() => validateSeriesRoadmap(bad)).toThrow(/kesintisiz/);
  });

  it("rejects a published entry without a slug", () => {
    const bad = roadmap();
    bad.phases[0].articles[0] = { order: 1, title: "Bir", status: "yayinda" };
    expect(() => validateSeriesRoadmap(bad)).toThrow(/slug zorunlu/);
  });

  it("rejects duplicate phase ids", () => {
    const bad = roadmap();
    bad.phases[1].id = "faz-01";
    expect(() => validateSeriesRoadmap(bad)).toThrow(/benzersiz/);
  });
});

describe("assertRoadmapMatchesCatalog", () => {
  it("accepts a matching catalog", () => {
    const valid = validateSeriesRoadmap(roadmap());
    expect(() => assertRoadmapMatchesCatalog(valid, new Set(["bir"]))).not.toThrow();
  });

  it("rejects a published roadmap entry missing from the catalog", () => {
    const valid = validateSeriesRoadmap(roadmap());
    expect(() => assertRoadmapMatchesCatalog(valid, new Set())).toThrow(/katalogda yok/);
  });

  it("rejects a catalog slug not published in the roadmap", () => {
    const valid = validateSeriesRoadmap(roadmap());
    expect(() => assertRoadmapMatchesCatalog(valid, new Set(["bir", "gizli"]))).toThrow(
      /roadmap'te "yayinda" değil/,
    );
  });
});
