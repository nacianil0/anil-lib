import type { MetadataRoute } from "next";
import { getSeriesDescriptors, SERIES_BASE_PATH } from "@/lib/content/series";
import { absoluteUrl } from "@/lib/site";

/**
 * Only what anyone may read: the front page, the AI series and its articles, and the
 * privacy page. Nothing behind an account is listed — and listing is no access
 * control either way: those pages answer with a login redirect or a 404 on their own.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl(SERIES_BASE_PATH), changeFrequency: "weekly", priority: 0.9 },
    ...getSeriesDescriptors().map((article) => ({
      url: absoluteUrl(`${SERIES_BASE_PATH}/${article.slug}`),
      ...(article.revisedAt ? { lastModified: article.revisedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/gizlilik"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
