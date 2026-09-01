import { getDescriptors } from "@/lib/content/catalog";
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
import { requireSessionUser } from "@/lib/auth/session-user";
import { ReaderDashboard } from "@/components/dashboard/reader-dashboard";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await requireSessionUser();
  const isOwner = user.role === "owner";

  return (
    <ReaderDashboard
      workspaceId={user.workspaceId}
      username={user.username}
      isOwner={isOwner}
      // Seri dışı yazılar normal kullanıcı akışında hiç yok; owner'da arşiv olarak kalır.
      archive={isOwner ? getDescriptors() : []}
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
