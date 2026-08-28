import type { Metadata } from "next";
import {
  BOUN_BASE_PATH,
  BOUN_SUBTITLE,
  BOUN_TITLE,
  getBounDescriptors,
  loadBounRoadmap,
} from "@/lib/content/series-boun";
import { SeriesLanding } from "@/components/series/series-landing";

export const metadata: Metadata = {
  title: BOUN_TITLE,
  description: BOUN_SUBTITLE,
};

export default function BounPage() {
  return (
    <SeriesLanding
      roadmap={loadBounRoadmap()}
      articles={getBounDescriptors()}
      basePath={BOUN_BASE_PATH}
      intro="Lisans bilgini unuttuğunu varsayar; her makale bir öncekinin üzerine biner ve kavramı yüksek sesle anlatabilecek düzeye taşır. Sıra önemlidir: en iyi sonucu baştan sona okuyarak alırsın."
      footerNote="Seri gruplar halinde yayımlanır; planlanan başlıklar yeni gruplar hazırlanırken güncellenebilir. Resmî mülakat bilgisi değişebilir; karar vermeden önce bölümün güncel sayfasını kontrol et."
    />
  );
}
