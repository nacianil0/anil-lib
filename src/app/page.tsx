import type { Metadata } from "next";
import { getDescriptors } from "@/lib/content/catalog";
import {
  getSeriesArticleBySlug,
  getSeriesDescriptors,
  SERIES_BASE_PATH,
  SERIES_SUBTITLE,
  SERIES_TITLE,
} from "@/lib/content/series";
import {
  BOUN_BASE_PATH,
  BOUN_SUBTITLE,
  BOUN_TITLE,
  getBounDescriptors,
  loadBounRoadmap,
} from "@/lib/content/series-boun";
import {
  GUVENLIK_BASE_PATH,
  GUVENLIK_SUBTITLE,
  GUVENLIK_TITLE,
  getGuvenlikDescriptors,
  loadGuvenlikRoadmap,
} from "@/lib/content/series-guvenlik";
import { loadSeriesRoadmap } from "@/lib/content/series-roadmap";
import { outlinePhases } from "@/lib/content/series-progress";
import { seriesStats } from "@/lib/content/series-stats";
import { canRead, type ReadableCollection } from "@/lib/auth/access";
import { getSessionUser } from "@/lib/auth/session-user";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { ReaderDashboard, type DashboardSeries } from "@/components/dashboard/reader-dashboard";
import { PublicHome, type SampleReading } from "@/components/home/public-home";

/**
 * Renders per request: a signed-in reader gets their own dashboard here, scoped to
 * their account, so the page must never be prerendered into shared static HTML. A
 * visitor without an account gets the public front page.
 */
export const dynamic = "force-dynamic";

const HOME_TITLE = `${SITE_NAME} — Yapay zekâyı sıfırdan, kaynağıyla okumak`;

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "tr_TR",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

/** One entry point from the start, the middle and the end of the series. */
const SAMPLE_PHASES = [0, 6, 13];

function publicHomeProps() {
  const roadmap = loadSeriesRoadmap();
  const articles = getSeriesDescriptors();
  const samples: SampleReading[] = SAMPLE_PHASES.flatMap((index) => {
    const phase = roadmap.phases[index];
    const slug = phase?.articles.find((entry) => entry.slug)?.slug;
    const article = slug ? getSeriesArticleBySlug(slug) : null;
    const descriptor = articles.find((entry) => entry.slug === slug);
    if (!phase || !article || !descriptor) return [];
    return [
      {
        article: { ...descriptor, summary: article.summary },
        phaseNumber: index + 1,
        phaseTitle: phase.title,
      },
    ];
  });
  const guvenlikRoadmap = loadGuvenlikRoadmap();
  return {
    ai: {
      title: SERIES_TITLE,
      basePath: SERIES_BASE_PATH,
      articles,
      roadmap,
      stats: seriesStats(),
      samples,
    },
    guvenlik: {
      title: GUVENLIK_TITLE,
      subtitle: GUVENLIK_SUBTITLE,
      published: getGuvenlikDescriptors().length,
      planned: guvenlikRoadmap.phases.reduce((sum, phase) => sum + phase.articles.length, 0),
      phaseTitles: guvenlikRoadmap.phases.map((phase) => phase.title),
    },
  };
}

export default async function HomePage() {
  const user = await getSessionUser();
  if (!user) return <PublicHome {...publicHomeProps()} />;

  const isOwner = user.role === "owner";
  const series: Array<{ collection: ReadableCollection; entry: DashboardSeries }> = [
    {
      collection: "ai",
      entry: {
        key: "seri",
        title: SERIES_TITLE,
        subtitle: SERIES_SUBTITLE,
        basePath: SERIES_BASE_PATH,
        articles: getSeriesDescriptors(),
        phases: outlinePhases(loadSeriesRoadmap()),
      },
    },
    {
      collection: "boun",
      entry: {
        key: "boun",
        title: BOUN_TITLE,
        subtitle: BOUN_SUBTITLE,
        basePath: BOUN_BASE_PATH,
        articles: getBounDescriptors(),
        phases: outlinePhases(loadBounRoadmap()),
      },
    },
    {
      collection: "guvenlik",
      entry: {
        key: "guvenlik",
        title: GUVENLIK_TITLE,
        subtitle: GUVENLIK_SUBTITLE,
        basePath: GUVENLIK_BASE_PATH,
        articles: getGuvenlikDescriptors(),
        phases: outlinePhases(loadGuvenlikRoadmap()),
      },
    },
  ];

  return (
    <ReaderDashboard
      workspaceId={user.workspaceId}
      username={user.username}
      isOwner={isOwner}
      showAccountLink={user.role === "reader"}
      // Seri dışı yazılar normal kullanıcı akışında hiç yok; owner'da arşiv olarak kalır.
      archive={canRead(user.role, "archive") ? getDescriptors() : []}
      // Only what this account may read: a self-registered reader never sees the BOUN row.
      series={series
        .filter(({ collection }) => canRead(user.role, collection))
        .map(({ entry }) => entry)}
    />
  );
}
