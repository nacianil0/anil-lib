import "server-only";

import type { Catalog } from "@/lib/content/schema";
import { loadSeriesCatalog } from "@/lib/content/series";
import { loadBounCatalog } from "@/lib/content/series-boun";
import { loadGuvenlikCatalog } from "@/lib/content/series-guvenlik";
import { SERIES_IDS, type SeriesId } from "@/lib/reader-data/series-reset";

/**
 * The catalog behind each resettable series. A `Record` over every id, so a series added to
 * SERIES_IDS does not compile until it is mapped here: a series must never fall through to
 * another series' catalog, which would reset or guard the wrong articles.
 */
const SERIES_CATALOGS: Record<SeriesId, () => Catalog> = {
  ai: loadSeriesCatalog,
  boun: loadBounCatalog,
  guvenlik: loadGuvenlikCatalog,
};

export function seriesCatalog(seriesId: SeriesId): Catalog {
  return SERIES_CATALOGS[seriesId]();
}

/** Published article ids of every series, keyed by series. */
export function seriesArticleIds(): Record<SeriesId, string[]> {
  return Object.fromEntries(
    SERIES_IDS.map((seriesId) => [
      seriesId,
      seriesCatalog(seriesId).articles.map((article) => article.articleId),
    ]),
  ) as Record<SeriesId, string[]>;
}
