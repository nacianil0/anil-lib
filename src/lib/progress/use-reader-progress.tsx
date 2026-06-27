"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { COMPLETION_THRESHOLD, PROGRESS_STORAGE_KEY } from "@/lib/reader/version";
import { clamp } from "@/lib/utils";
import type { ReadingStatus } from "@/lib/content/types";
import { emptyProgress, makeEntry, type ArticleProgress, type ReaderProgress } from "./schema";
import { isStorageAvailable, parseProgress, readProgress, writeProgress } from "./storage";

const SAVE_THROTTLE_MS = 250;
const STARTED_RATIO = 0.02;

type ProgressContextValue = {
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

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ReaderProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ReaderProgress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  const progressRef = useRef<ReaderProgress>(progress);
  progressRef.current = progress;

  const throttleRef = useRef<{ timer: ReturnType<typeof setTimeout> | null; last: number }>({
    timer: null,
    last: 0,
  });

  // Hydrate from localStorage after mount so SSR markup stays deterministic.
  useEffect(() => {
    setProgress(readProgress());
    setStorageAvailable(isStorageAvailable());
    setReady(true);
  }, []);

  // Keep other tabs reasonably in sync.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== PROGRESS_STORAGE_KEY) return;
      setProgress(parseProgress(event.newValue));
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: ReaderProgress, immediate: boolean) => {
    progressRef.current = next;
    setProgress(next);

    const throttle = throttleRef.current;
    if (immediate) {
      if (throttle.timer) {
        clearTimeout(throttle.timer);
        throttle.timer = null;
      }
      throttle.last = Date.now();
      writeProgress(next);
      return;
    }

    const elapsed = Date.now() - throttle.last;
    if (elapsed >= SAVE_THROTTLE_MS) {
      throttle.last = Date.now();
      writeProgress(next);
    } else if (!throttle.timer) {
      throttle.timer = setTimeout(() => {
        throttle.timer = null;
        throttle.last = Date.now();
        writeProgress(progressRef.current);
      }, SAVE_THROTTLE_MS - elapsed);
    }
  }, []);

  // Flush the latest position when the tab is hidden or unloaded.
  useEffect(() => {
    function flush() {
      const throttle = throttleRef.current;
      if (throttle.timer) {
        clearTimeout(throttle.timer);
        throttle.timer = null;
      }
      writeProgress(progressRef.current);
    }
    function onVisibility() {
      if (document.visibilityState === "hidden") flush();
    }
    window.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      window.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  const setCurrentArticle = useCallback(
    (articleId: string) => {
      const current = progressRef.current;
      const entry = current.articles[articleId] ?? makeEntry();
      persist(
        {
          currentArticleId: articleId,
          articles: {
            ...current.articles,
            [articleId]: { ...entry, lastReadAt: new Date().toISOString() },
          },
        },
        true,
      );
    },
    [persist],
  );

  const recordPosition = useCallback(
    (articleId: string, headingId: string | null, ratio: number) => {
      const current = progressRef.current;
      const entry = current.articles[articleId] ?? makeEntry();
      const clamped = clamp(ratio, 0, 1);
      const completed = entry.completed || clamped >= COMPLETION_THRESHOLD;
      if (
        entry.headingId === headingId &&
        Math.abs(entry.scrollRatio - clamped) < 0.001 &&
        entry.completed === completed
      ) {
        return;
      }
      persist(
        {
          currentArticleId: current.currentArticleId ?? articleId,
          articles: {
            ...current.articles,
            [articleId]: { ...entry, headingId, scrollRatio: clamped, completed },
          },
        },
        false,
      );
    },
    [persist],
  );

  const setCompleted = useCallback(
    (articleId: string, completed: boolean) => {
      const current = progressRef.current;
      const entry = current.articles[articleId] ?? makeEntry();
      persist(
        {
          ...current,
          articles: {
            ...current.articles,
            [articleId]: { ...entry, completed, lastReadAt: new Date().toISOString() },
          },
        },
        true,
      );
    },
    [persist],
  );

  const toggleCompleted = useCallback(
    (articleId: string) => {
      const entry = progressRef.current.articles[articleId];
      setCompleted(articleId, !(entry?.completed ?? false));
    },
    [setCompleted],
  );

  const resetPosition = useCallback(
    (articleId: string) => {
      const current = progressRef.current;
      const entry = current.articles[articleId];
      if (!entry) return;
      persist(
        {
          ...current,
          articles: {
            ...current.articles,
            [articleId]: { ...entry, headingId: null, scrollRatio: 0 },
          },
        },
        true,
      );
    },
    [persist],
  );

  const value = useMemo<ProgressContextValue>(() => {
    const entryOf = (articleId: string): ArticleProgress =>
      progress.articles[articleId] ?? makeEntry();

    const statusOf = (articleId: string): ReadingStatus => {
      const entry = progress.articles[articleId];
      if (!entry) return "unread";
      if (entry.completed) return "completed";
      if (entry.scrollRatio > STARTED_RATIO) return "in-progress";
      return "unread";
    };

    const completedCount = (articleIds: string[]): number =>
      articleIds.reduce((count, id) => (progress.articles[id]?.completed ? count + 1 : count), 0);

    return {
      ready,
      storageAvailable,
      progress,
      entryOf,
      statusOf,
      completedCount,
      setCurrentArticle,
      recordPosition,
      setCompleted,
      toggleCompleted,
      resetPosition,
    };
  }, [
    ready,
    storageAvailable,
    progress,
    setCurrentArticle,
    recordPosition,
    setCompleted,
    toggleCompleted,
    resetPosition,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useReaderProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useReaderProgress, ReaderProgressProvider içinde kullanılmalı");
  }
  return context;
}
