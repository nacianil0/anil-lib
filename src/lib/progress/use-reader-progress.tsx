"use client";

import type { ReactNode } from "react";
import type { ReadingStatus } from "@/lib/content/types";
import type { ArticleProgress, ReaderProgress } from "./schema";
import { ReaderDataProvider, useReaderData } from "@/lib/reader-data/use-reader-data";

export type ProgressContextValue = {
  ready: boolean;
  storageAvailable: boolean;
  progress: ReaderProgress;
  entryOf: (articleId: string) => ArticleProgress;
  statusOf: (articleId: string) => ReadingStatus;
  completedCount: (articleIds: string[]) => number;
  setCurrentArticle: (articleId: string) => void;
  recordPosition: (articleId: string, headingId: string | null, ratio: number) => void;
  setCompleted: (articleId: string, completed: boolean) => void;
  toggleCompleted: (articleId: string) => void;
  resetPosition: (articleId: string) => void;
};

/** Compatibility boundary while existing reader components consume the progress-only API. */
export function ReaderProgressProvider({ children }: { children: ReactNode }) {
  return <ReaderDataProvider>{children}</ReaderDataProvider>;
}

export function useReaderProgress(): ProgressContextValue {
  const readerData = useReaderData();
  return {
    ready: readerData.ready,
    storageAvailable: readerData.storageAvailable,
    progress: readerData.progress,
    entryOf: readerData.entryOf,
    statusOf: readerData.statusOf,
    completedCount: readerData.completedCount,
    setCurrentArticle: readerData.setCurrentArticle,
    recordPosition: readerData.recordPosition,
    setCompleted: readerData.setCompleted,
    toggleCompleted: readerData.toggleCompleted,
    resetPosition: readerData.resetPosition,
  };
}
