import type { Metadata } from "next";
import {
  BOUN_BASE_PATH,
  BOUN_SUBTITLE,
  BOUN_TITLE,
  getBounDescriptors,
  loadBounRoadmap,
} from "@/lib/content/series-boun";
import { SeriesLanding } from "@/components/series/series-landing";
import { requireSessionUser } from "@/lib/auth/session-user";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: BOUN_TITLE,
  description: BOUN_SUBTITLE,
};

export default async function BounPage() {
  const user = await requireSessionUser();
  return (
    <SeriesLanding
      workspaceId={user.workspaceId}
      roadmap={loadBounRoadmap()}
      articles={getBounDescriptors()}
      basePath={BOUN_BASE_PATH}
      intro="Lisans bilgini unuttuğunu varsayar; her makale bir öncekinin üzerine biner ve kavramı yüksek sesle anlatabilecek düzeye taşır. Sıra önemlidir: en iyi sonucu baştan sona okuyarak alırsın."
      footerNote="Seri gruplar halinde yayımlanır; planlanan başlıklar yeni gruplar hazırlanırken güncellenebilir. Resmî mülakat bilgisi değişebilir; karar vermeden önce bölümün güncel sayfasını kontrol et."
    />
  );
}
