import type { Metadata } from "next";
import {
  getSeriesDescriptors,
  SERIES_BASE_PATH,
  SERIES_SUBTITLE,
  SERIES_TITLE,
} from "@/lib/content/series";
import { loadSeriesRoadmap } from "@/lib/content/series-roadmap";
import { SeriesLanding } from "@/components/series/series-landing";

export const metadata: Metadata = {
  title: SERIES_TITLE,
  description: SERIES_SUBTITLE,
};

export default function SeriesPage() {
  return (
    <SeriesLanding
      roadmap={loadSeriesRoadmap()}
      articles={getSeriesDescriptors()}
      basePath={SERIES_BASE_PATH}
      intro="Hiçbir ön bilgi varsaymadan başlar; her makale bir öncekinin üzerine biner. Sıra önemlidir: en iyi sonucu baştan sona okuyarak alırsın."
      footerNote="Seri gruplar halinde yayımlanır; planlanan başlıklar yeni gruplar hazırlanırken güncellenebilir."
    />
  );
}
