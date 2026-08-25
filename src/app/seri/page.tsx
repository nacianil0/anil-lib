import type { Metadata } from "next";
import { getSeriesDescriptors, SERIES_SUBTITLE, SERIES_TITLE } from "@/lib/content/series";
import { loadSeriesRoadmap } from "@/lib/content/series-roadmap";
import { SeriesLanding } from "@/components/series/series-landing";

export const metadata: Metadata = {
  title: SERIES_TITLE,
  description: SERIES_SUBTITLE,
};

export default function SeriesPage() {
  return <SeriesLanding roadmap={loadSeriesRoadmap()} articles={getSeriesDescriptors()} />;
}
