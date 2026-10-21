import type { Metadata } from "next";
import {
  GUVENLIK_BASE_PATH,
  GUVENLIK_SUBTITLE,
  GUVENLIK_TITLE,
  getGuvenlikDescriptors,
  loadGuvenlikRoadmap,
} from "@/lib/content/series-guvenlik";
import { SeriesLanding } from "@/components/series/series-landing";
import { requireSessionUser } from "@/lib/auth/session-user";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: GUVENLIK_TITLE,
  description: GUVENLIK_SUBTITLE,
};

export default async function GuvenlikPage() {
  const user = await requireSessionUser();
  return (
    <SeriesLanding
      seriesId="guvenlik"
      workspaceId={user.workspaceId}
      roadmap={loadGuvenlikRoadmap()}
      articles={getGuvenlikDescriptors()}
      basePath={GUVENLIK_BASE_PATH}
      intro="Yazılım temellerini bildiğini varsayar; her yazı bir riski ya da bir değişiklik kararını mühendislik kararına çevirir ve kararı test ve üretim gözlemiyle sınar. Sıra önemlidir: sonraki yazılar öncekilerin kurduğu güven sınırı, hata yolu ve commit grafiği disiplinini yeniden kullanır."
      footerNote="Seri gruplar hâlinde yayımlanır; henüz yayımlanmamış başlıklar plandır ve değişebilir. Seri OWASP Foundation'ın, Git projesinin ya da GitHub'ın yayını değildir; onların belgelerini kaynak olarak kullanır ve her yazı dayandığı sürümü ve erişim tarihini kaynakçasında belirtir."
    />
  );
}
