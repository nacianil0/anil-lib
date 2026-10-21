import { describe, expect, it } from "vitest";
import {
  GUVENLIK_SUBTITLE,
  GUVENLIK_TITLE,
  loadGuvenlikCatalog,
  loadGuvenlikRoadmap,
} from "./series-guvenlik";

/**
 * docs/seri-guvenlik/SOZLESME.md §1: the plan may not grow past this many articles without the
 * reader's explicit decision (YOL-HARITASI.md decision #15). Raising it is a contract change,
 * not a content edit.
 */
const PLAN_CAP = 25;

describe("Güven Sınırı roadmap", () => {
  const roadmap = loadGuvenlikRoadmap();
  const flat = roadmap.phases.flatMap((phase) => phase.articles);

  it("loads against the catalog and stays within the plan cap", () => {
    expect(flat.length).toBeGreaterThan(0);
    expect(flat.length).toBeLessThanOrEqual(PLAN_CAP);
  });

  it("carries the same series title and subtitle as the code constants", () => {
    // The landing page reads the roadmap; the home page, chapters and stats read the constants.
    expect(roadmap.seriesTitle).toBe(GUVENLIK_TITLE);
    expect(roadmap.seriesSubtitle).toBe(GUVENLIK_SUBTITLE);
  });

  it("publishes in reading order: no planned article comes before a published one", () => {
    const statuses = flat.map((article) => article.status);
    const firstPlanned = statuses.indexOf("planlandi");
    if (firstPlanned !== -1) {
      expect(statuses.lastIndexOf("yayinda")).toBeLessThan(firstPlanned);
    }
  });

  it("matches every catalog article by order, title and slug", () => {
    for (const article of loadGuvenlikCatalog().articles) {
      const entry = flat.find((item) => item.order === article.readingOrder);
      expect(entry, article.slug).toMatchObject({
        status: "yayinda",
        title: article.title,
        slug: article.slug,
      });
    }
  });

  it("gives every article a distinct title", () => {
    const titles = flat.map((article) => article.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
