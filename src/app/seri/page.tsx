import type { Metadata } from "next";
import {
  getSeriesDescriptors,
  SERIES_BASE_PATH,
  SERIES_SUBTITLE,
  SERIES_TITLE,
} from "@/lib/content/series";
import { loadSeriesRoadmap } from "@/lib/content/series-roadmap";
import { SeriesLanding } from "@/components/series/series-landing";
import { LOCAL_WORKSPACE_ID } from "@/lib/auth/access";
import { getSessionUser } from "@/lib/auth/session-user";
import { OG_IMAGE, SITE_NAME } from "@/lib/site";

/**
 * Public: the AI series is readable without an account. Still rendered per request,
 * because a signed-in reader's page carries their own workspace — it must never be
 * prerendered into HTML that someone else could be served.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: SERIES_TITLE,
  description: SERIES_SUBTITLE,
  alternates: { canonical: SERIES_BASE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "tr_TR",
    title: SERIES_TITLE,
    description: SERIES_SUBTITLE,
    url: SERIES_BASE_PATH,
    images: [OG_IMAGE],
  },
};

export default async function SeriesPage() {
  const viewer = await getSessionUser();
  return (
    <SeriesLanding
      seriesId="ai"
      workspaceId={viewer?.workspaceId ?? LOCAL_WORKSPACE_ID}
      mode={viewer ? "account" : "local"}
      roadmap={loadSeriesRoadmap()}
      articles={getSeriesDescriptors()}
      basePath={SERIES_BASE_PATH}
      intro="Hiçbir ön bilgi varsaymadan başlar; her makale bir öncekinin üzerine biner. Sıra önemlidir: en iyi sonucu baştan sona okuyarak alırsın."
      footerNote="Seri tamamlandı; bundan sonrası düzeltme ve güncellemedir. Gözden geçirilen yazılar metnin üstünde işaretlenir."
    />
  );
}
