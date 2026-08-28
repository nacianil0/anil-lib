import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { formatZodError } from "./schema";
import { loadSeriesCatalog } from "./series";

/**
 * content/<seri>/roadmap.json — UI'nin gösterdiği yaşayan omurga.
 * Pedagojik ayrıntı ilgili YOL-HARITASI.md'dedir; iki dosya başlık düzeyinde
 * senkron tutulur (docs/seri/SOZLESME.md §8).
 */
const ROADMAP_PATH = path.join(process.cwd(), "content", "series", "roadmap.json");

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const roadmapArticleSchema = z.object({
  order: z.number().int().positive(),
  title: z.string().min(1),
  status: z.enum(["yayinda", "planlandi"]),
  slug: z.string().regex(slugPattern).optional(),
});

export const roadmapPhaseSchema = z.object({
  id: z.string().regex(slugPattern),
  title: z.string().min(1),
  description: z.string().min(1),
  articles: z.array(roadmapArticleSchema).min(1),
});

export const roadmapSchema = z.object({
  schemaVersion: z.literal(1),
  seriesTitle: z.string().min(1),
  seriesSubtitle: z.string().min(1),
  phases: z.array(roadmapPhaseSchema).min(1),
});

export type RoadmapArticle = z.infer<typeof roadmapArticleSchema>;
export type RoadmapPhase = z.infer<typeof roadmapPhaseSchema>;
export type SeriesRoadmap = z.infer<typeof roadmapSchema>;

/** Pure validation: schema + cross-field invariants (unit-testable). */
export function validateSeriesRoadmap(input: unknown, label = "series"): SeriesRoadmap {
  const result = roadmapSchema.safeParse(input);
  if (!result.success) {
    throw new Error(`[${label}] roadmap.json şeması geçersiz:\n${formatZodError(result.error)}`);
  }
  const roadmap = result.data;

  const flat = roadmap.phases.flatMap((phase) => phase.articles);
  flat.forEach((article, index) => {
    if (article.order !== index + 1) {
      throw new Error(
        `[${label}] roadmap.json sıraları 1'den kesintisiz artmalı; beklenen ${index + 1}, bulunan ${article.order} ("${article.title}")`,
      );
    }
    if (article.status === "yayinda" && !article.slug) {
      throw new Error(
        `[${label}] roadmap.json: yayında görünen makalede slug zorunlu (${article.order}. "${article.title}")`,
      );
    }
  });

  const phaseIds = roadmap.phases.map((phase) => phase.id);
  if (new Set(phaseIds).size !== phaseIds.length) {
    throw new Error(`[${label}] roadmap.json faz id'leri benzersiz olmalı`);
  }

  return roadmap;
}

/**
 * Katalogla çapraz kontrol: her katalog makalesi roadmap'te "yayinda" olarak
 * görünmeli, roadmap'teki her "yayinda" kayıt katalogda bulunmalı.
 */
export function assertRoadmapMatchesCatalog(
  roadmap: SeriesRoadmap,
  catalogSlugs: Set<string>,
  label = "series",
): void {
  const published = roadmap.phases
    .flatMap((phase) => phase.articles)
    .filter((article) => article.status === "yayinda");

  for (const article of published) {
    if (!catalogSlugs.has(article.slug!)) {
      throw new Error(
        `[${label}] roadmap.json "yayinda" ama katalogda yok: ${article.slug} (${article.order}.)`,
      );
    }
  }

  const publishedSlugs = new Set(published.map((article) => article.slug));
  for (const slug of catalogSlugs) {
    if (!publishedSlugs.has(slug)) {
      throw new Error(`[${label}] Katalogda var ama roadmap'te "yayinda" değil: ${slug}`);
    }
  }
}

/**
 * Bir serinin roadmap.json yükleyicisini üretir: dosyayı okur, doğrular ve
 * katalogla çapraz kontrol eder. Sonuç süreç ömrü boyunca önbelleklenir.
 */
export function createRoadmapLoader(options: {
  label: string;
  roadmapPath: string;
  catalogSlugs: () => Set<string>;
}): () => SeriesRoadmap {
  let instanceCache: SeriesRoadmap | null = null;

  return function loadRoadmap(): SeriesRoadmap {
    if (instanceCache) return instanceCache;

    let raw: string;
    try {
      raw = readFileSync(options.roadmapPath, "utf8");
    } catch {
      throw new Error(`[${options.label}] ${options.roadmapPath} okunamadı.`);
    }

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch (error) {
      throw new Error(
        `[${options.label}] roadmap.json parse edilemedi: ${(error as Error).message}`,
      );
    }

    const roadmap = validateSeriesRoadmap(json, options.label);
    assertRoadmapMatchesCatalog(roadmap, options.catalogSlugs(), options.label);
    instanceCache = roadmap;
    return instanceCache;
  };
}

export const loadSeriesRoadmap = createRoadmapLoader({
  label: "series",
  roadmapPath: ROADMAP_PATH,
  catalogSlugs: () => new Set(loadSeriesCatalog().articles.map((article) => article.slug)),
});
