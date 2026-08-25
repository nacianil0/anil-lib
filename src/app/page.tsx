import { getOrderedArticles, toDescriptor } from "@/lib/content/catalog";
import { getSeriesDescriptors, SERIES_SUBTITLE, SERIES_TITLE } from "@/lib/content/series";
import { ReaderDashboard } from "@/components/dashboard/reader-dashboard";

export default function HomePage() {
  return (
    <ReaderDashboard
      articles={getOrderedArticles().map(toDescriptor)}
      seriesArticles={getSeriesDescriptors()}
      seriesTitle={SERIES_TITLE}
      seriesSubtitle={SERIES_SUBTITLE}
    />
  );
}
