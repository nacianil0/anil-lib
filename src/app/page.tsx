import { getOrderedArticles, toDescriptor } from "@/lib/content/catalog";
import {
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
} from "@/lib/content/series-boun";
import { ReaderDashboard } from "@/components/dashboard/reader-dashboard";

export default function HomePage() {
  return (
    <ReaderDashboard
      articles={getOrderedArticles().map(toDescriptor)}
      series={[
        {
          key: "seri",
          title: SERIES_TITLE,
          subtitle: SERIES_SUBTITLE,
          basePath: SERIES_BASE_PATH,
          articles: getSeriesDescriptors(),
        },
        {
          key: "boun",
          title: BOUN_TITLE,
          subtitle: BOUN_SUBTITLE,
          basePath: BOUN_BASE_PATH,
          articles: getBounDescriptors(),
        },
      ]}
    />
  );
}
