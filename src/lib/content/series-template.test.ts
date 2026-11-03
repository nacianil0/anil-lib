import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { describe, expect, it } from "vitest";
import { frontmatterSchema } from "./schema";
import { validateSeriesRoadmap } from "./series-roadmap";

/**
 * The fork guide's starter files (docs/templates/series/) must stay valid against the real
 * schemas, or a new series would start from a broken example.
 */
const TEMPLATES = path.join(process.cwd(), "docs", "templates", "series");

describe("series templates", () => {
  it("ship a roadmap the roadmap validator accepts", () => {
    const roadmap = validateSeriesRoadmap(
      JSON.parse(readFileSync(path.join(TEMPLATES, "roadmap.json"), "utf8")),
      "template",
    );
    expect(roadmap.phases[0].articles.every((article) => article.status === "planlandi")).toBe(true);
  });

  it("ship an article whose frontmatter the schema accepts once a real category is set", () => {
    const { data, content } = matter(readFileSync(path.join(TEMPLATES, "article.md"), "utf8"));
    const parsed = frontmatterSchema.safeParse({ ...data, category: "foundations" });
    expect(parsed.success, parsed.success ? "" : parsed.error.message).toBe(true);
    expect(content).toContain("## Kaynakça");
  });
});
