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
import type { ReadingStatus } from "@/lib/content/types";
import {
  COMPLETION_THRESHOLD,
  readerDataStorageKey,
  STARTED_RATIO,
} from "@/lib/reader/version";
import { clamp } from "@/lib/utils";
import type { ArticleProgress, ReaderProgress } from "@/lib/progress/schema";
import { mergeSyncResponse } from "./merge";
import {
  emptyReaderData,
  type HighlightRecord,
  type ProgressRecord,
  type ReaderData,
  type ReadingAnchor,
  type SavedPlaceRecord,
  type TextAnchor,
} from "./schema";
import {
  finishLegacyMigration,
  isReaderDataStorageAvailable,
  parseReaderData,
  readReaderData,
  writeReaderData,
} from "./storage";
import { requestReaderSync } from "./sync-client";

const SAVE_THROTTLE_MS = 250;
const PLACEHOLDER_DEVICE_ID = "00000000-0000-4000-8000-000000000000";

export type SyncStatus = "idle" | "syncing" | "pending" | "offline" | "error" | "unavailable";

export type ReaderDataContextValue = {
  ready: boolean;
  storageAvailable: boolean;
  data: ReaderData;
  progress: ReaderProgress;
  syncStatus: SyncStatus;
  entryOf: (articleId: string) => ArticleProgress;
  /** The stored record, including the resolvable reading anchor the shell restores. */
  progressOf: (articleId: string) => ProgressRecord | null;
  statusOf: (articleId: string) => ReadingStatus;
  completedCount: (articleIds: string[]) => number;
  setCurrentArticle: (articleId: string) => void;
  recordPosition: (
    articleId: string,
    headingId: string | null,
    ratio: number,
    anchor: ReadingAnchor | null,
  ) => void;
  setCompleted: (articleId: string, completed: boolean) => void;
  toggleCompleted: (articleId: string) => void;
  resetPosition: (articleId: string) => void;
  savedPlaceOf: (articleId: string) => SavedPlaceRecord | null;
  savePlace: (
    articleId: string,
    headingId: string | null,
    ratio: number,
    previewText: string,
    anchor: ReadingAnchor | null,
  ) => void;
  removeSavedPlace: (articleId: string) => void;
  highlightsFor: (articleId: string) => HighlightRecord[];
  addHighlight: (articleId: string, anchor: TextAnchor) => string;
  removeHighlight: (highlightId: string) => void;
  syncNow: () => Promise<void>;
};

const ReaderDataContext = createContext<ReaderDataContextValue | null>(null);

function defaultEntry(): ArticleProgress {
  return { headingId: null, scrollRatio: 0, completed: false, lastReadAt: "" };
}

function progressPayload(record: ProgressRecord) {
  const { changeVersion: _changeVersion, ...payload } = record;
  return payload;
}

function savedPlacePayload(record: SavedPlaceRecord) {
  const { changeVersion: _changeVersion, ...payload } = record;
  return payload;
}

function highlightPayload(record: HighlightRecord) {
  const { changeVersion: _changeVersion, ...payload } = record;
  return payload;
}

function withoutPendingEntity(
  outbox: ReaderData["outbox"],
  entityType: ReaderData["outbox"][number]["entityType"],
  entityId: string,
) {
  return outbox.filter(
    (operation) => operation.entityType !== entityType || operation.entityId !== entityId,
  );
}

/**
 * `workspaceId` comes from the server-resolved session. It scopes the storage key,
 * the in-memory blob and the outbox, so signing in as a different account in the
 * same browser starts from an empty, isolated state.
 */
export function ReaderDataProvider({
  children,
  workspaceId,
}: {
  children: ReactNode;
  workspaceId: string;
}) {
  const [data, setData] = useState<ReaderData>(() =>
    emptyReaderData(workspaceId, PLACEHOLDER_DEVICE_ID),
  );
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("idle");
  const dataRef = useRef(data);
  dataRef.current = data;
  const syncInFlightRef = useRef(false);
  // A sync can settle after the provider is gone (navigation, or a test tearing the
  // environment down); state must not be written at that point.
  const mountedRef = useRef(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastWriteRef = useRef(0);

  const persist = useCallback((next: ReaderData, immediate = true) => {
    dataRef.current = next;
    setData(next);
    if (immediate) {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
      lastWriteRef.current = Date.now();
      writeReaderData(next);
      return;
    }
    const delay = Math.max(0, SAVE_THROTTLE_MS - (Date.now() - lastWriteRef.current));
    if (delay === 0) {
      lastWriteRef.current = Date.now();
      writeReaderData(next);
    } else if (!saveTimerRef.current) {
      saveTimerRef.current = setTimeout(() => {
        saveTimerRef.current = null;
        lastWriteRef.current = Date.now();
        writeReaderData(dataRef.current);
      }, delay);
    }
  }, []);

  const syncNow = useCallback(async () => {
    if (!ready || syncInFlightRef.current || !mountedRef.current) return;
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setSyncStatus("offline");
      return;
    }
    syncInFlightRef.current = true;
    setSyncStatus("syncing");
    try {
      const snapshot = dataRef.current;
      const response = await requestReaderSync({
        cursor: snapshot.cursor,
        operations: snapshot.outbox.slice(0, 100),
      });
      if (!mountedRef.current) return;
      const merged = mergeSyncResponse(dataRef.current, response);
      persist(merged);
      finishLegacyMigration(workspaceId);
      setSyncStatus(merged.outbox.length > 0 ? "pending" : "idle");
      if (merged.outbox.length > 0) setTimeout(() => void syncNow(), 0);
    } catch (error) {
      if (!mountedRef.current) return;
      const status = (error as { status?: number }).status;
      setSyncStatus(status === 503 ? "unavailable" : navigator.onLine ? "error" : "offline");
    } finally {
      syncInFlightRef.current = false;
    }
  }, [persist, ready, workspaceId]);

  const scheduleSync = useCallback(() => {
    setSyncStatus((current) => (current === "syncing" ? current : "pending"));
    queueMicrotask(() => void syncNow());
  }, [syncNow]);

  useEffect(() => {
    setReady(false);
    const stored = readReaderData(workspaceId);
    dataRef.current = stored;
    setData(stored);
    setStorageAvailable(isReaderDataStorageAvailable());
    setReady(true);
  }, [workspaceId]);

  useEffect(() => {
    if (ready) void syncNow();
  }, [ready, syncNow]);

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== readerDataStorageKey(workspaceId)) return;
      const next = parseReaderData(event.newValue, workspaceId);
      if (next) {
        dataRef.current = next;
        setData(next);
      }
    }
    function onOnline() {
      void syncNow();
    }
    function onVisibility() {
      if (document.visibilityState === "visible") void syncNow();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [syncNow, workspaceId]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      writeReaderData(dataRef.current);
    };
  }, []);

  const mutateProgress = useCallback(
    (record: ProgressRecord, immediate = false, currentArticleId?: string) => {
      const current = dataRef.current;
      const mutation = {
        operationId: crypto.randomUUID(),
        entityType: "progress" as const,
        entityId: record.articleId,
        operationType: "upsert" as const,
        deviceId: current.deviceId,
        clientUpdatedAt: record.clientUpdatedAt,
        payload: progressPayload(record),
      };
      persist(
        {
          ...current,
          currentArticleId: currentArticleId ?? current.currentArticleId,
          progress: { ...current.progress, [record.articleId]: record },
          outbox: [...withoutPendingEntity(current.outbox, "progress", record.articleId), mutation],
        },
        immediate,
      );
      scheduleSync();
    },
    [persist, scheduleSync],
  );

  const setCurrentArticle = useCallback(
    (articleId: string) => {
      const current = dataRef.current;
      const now = new Date().toISOString();
      const previous = current.progress[articleId];
      const record: ProgressRecord = {
        articleId,
        headingId: previous?.headingId ?? null,
        scrollRatio: previous?.scrollRatio ?? 0,
        anchor: previous?.anchor ?? null,
        completed: previous?.completed ?? false,
        lastReadAt: now,
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        changeVersion: previous?.changeVersion ?? 0,
      };
      mutateProgress(record, true, articleId);
    },
    [mutateProgress],
  );

  const recordPosition = useCallback(
    (
      articleId: string,
      headingId: string | null,
      ratio: number,
      anchor: ReadingAnchor | null,
    ) => {
      const current = dataRef.current;
      const previous = current.progress[articleId];
      const scrollRatio = clamp(ratio, 0, 1);
      const completed = Boolean(previous?.completed || scrollRatio >= COMPLETION_THRESHOLD);
      if (
        previous?.headingId === headingId &&
        Math.abs((previous?.scrollRatio ?? 0) - scrollRatio) < 0.001 &&
        previous?.completed === completed &&
        (previous?.anchor?.blockIndex ?? -1) === (anchor?.blockIndex ?? -1)
      ) {
        return;
      }
      const now = new Date().toISOString();
      mutateProgress({
        articleId,
        headingId,
        scrollRatio,
        // A position that could not be anchored keeps the previous anchor rather
        // than dropping to a coarser record; the ratio still moves with the reader.
        anchor: anchor ?? previous?.anchor ?? null,
        completed,
        lastReadAt: previous?.lastReadAt ?? now,
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        changeVersion: previous?.changeVersion ?? 0,
      });
    },
    [mutateProgress],
  );

  const setCompleted = useCallback(
    (articleId: string, completed: boolean) => {
      const current = dataRef.current;
      const previous = current.progress[articleId];
      const now = new Date().toISOString();
      mutateProgress(
        {
          articleId,
          headingId: previous?.headingId ?? null,
          scrollRatio: previous?.scrollRatio ?? 0,
          anchor: previous?.anchor ?? null,
          completed,
          lastReadAt: now,
          clientUpdatedAt: now,
          deviceId: current.deviceId,
          changeVersion: previous?.changeVersion ?? 0,
        },
        true,
      );
    },
    [mutateProgress],
  );

  const resetPosition = useCallback(
    (articleId: string) => {
      const previous = dataRef.current.progress[articleId];
      if (!previous) return;
      mutateProgress(
        {
          ...previous,
          headingId: null,
          scrollRatio: 0,
          anchor: null,
          clientUpdatedAt: new Date().toISOString(),
          deviceId: dataRef.current.deviceId,
        },
        true,
      );
    },
    [mutateProgress],
  );

  const savePlace = useCallback(
    (
      articleId: string,
      headingId: string | null,
      ratio: number,
      previewText: string,
      anchor: ReadingAnchor | null,
    ) => {
      const current = dataRef.current;
      const now = new Date().toISOString();
      const previous = current.savedPlaces[articleId];
      const record: SavedPlaceRecord = {
        articleId,
        headingId,
        scrollRatio: clamp(ratio, 0, 1),
        anchor,
        previewText: previewText.trim().slice(0, 280),
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        deletedAt: null,
        changeVersion: previous?.changeVersion ?? 0,
      };
      persist({
        ...current,
        savedPlaces: { ...current.savedPlaces, [articleId]: record },
        outbox: [
          ...withoutPendingEntity(current.outbox, "saved-place", articleId),
          {
            operationId: crypto.randomUUID(),
            entityType: "saved-place",
            entityId: articleId,
            operationType: "upsert",
            deviceId: current.deviceId,
            clientUpdatedAt: now,
            payload: savedPlacePayload(record),
          },
        ],
      });
      scheduleSync();
    },
    [persist, scheduleSync],
  );

  const removeSavedPlace = useCallback(
    (articleId: string) => {
      const current = dataRef.current;
      const previous = current.savedPlaces[articleId];
      if (!previous || previous.deletedAt) return;
      const now = new Date().toISOString();
      const record = {
        ...previous,
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        deletedAt: now,
      };
      persist({
        ...current,
        savedPlaces: { ...current.savedPlaces, [articleId]: record },
        outbox: [
          ...withoutPendingEntity(current.outbox, "saved-place", articleId),
          {
            operationId: crypto.randomUUID(),
            entityType: "saved-place",
            entityId: articleId,
            operationType: "delete",
            deviceId: current.deviceId,
            clientUpdatedAt: now,
            payload: savedPlacePayload(record),
          },
        ],
      });
      scheduleSync();
    },
    [persist, scheduleSync],
  );

  const addHighlight = useCallback(
    (articleId: string, anchor: TextAnchor) => {
      const current = dataRef.current;
      const now = new Date().toISOString();
      const id = crypto.randomUUID();
      const record: HighlightRecord = {
        id,
        articleId,
        ...anchor,
        createdAt: now,
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        deletedAt: null,
        changeVersion: 0,
      };
      persist({
        ...current,
        highlights: { ...current.highlights, [id]: record },
        outbox: [
          ...current.outbox,
          {
            operationId: crypto.randomUUID(),
            entityType: "highlight",
            entityId: id,
            operationType: "upsert",
            deviceId: current.deviceId,
            clientUpdatedAt: now,
            payload: highlightPayload(record),
          },
        ],
      });
      scheduleSync();
      return id;
    },
    [persist, scheduleSync],
  );

  const removeHighlight = useCallback(
    (highlightId: string) => {
      const current = dataRef.current;
      const previous = current.highlights[highlightId];
      if (!previous || previous.deletedAt) return;
      const now = new Date().toISOString();
      const record = {
        ...previous,
        clientUpdatedAt: now,
        deviceId: current.deviceId,
        deletedAt: now,
      };
      persist({
        ...current,
        highlights: { ...current.highlights, [highlightId]: record },
        outbox: [
          ...current.outbox,
          {
            operationId: crypto.randomUUID(),
            entityType: "highlight",
            entityId: highlightId,
            operationType: "delete",
            deviceId: current.deviceId,
            clientUpdatedAt: now,
            payload: highlightPayload(record),
          },
        ],
      });
      scheduleSync();
    },
    [persist, scheduleSync],
  );

  const value = useMemo<ReaderDataContextValue>(() => {
    const entryOf = (articleId: string): ArticleProgress => {
      const entry = data.progress[articleId];
      return entry
        ? {
            headingId: entry.headingId,
            scrollRatio: entry.scrollRatio,
            completed: entry.completed,
            lastReadAt: entry.lastReadAt,
          }
        : defaultEntry();
    };
    const statusOf = (articleId: string): ReadingStatus => {
      const entry = data.progress[articleId];
      if (!entry) return "unread";
      if (entry.completed) return "completed";
      return entry.scrollRatio > STARTED_RATIO ? "in-progress" : "unread";
    };
    const progress: ReaderProgress = {
      currentArticleId: data.currentArticleId,
      articles: Object.fromEntries(Object.keys(data.progress).map((id) => [id, entryOf(id)])),
    };
    return {
      ready,
      storageAvailable,
      data,
      progress,
      syncStatus,
      entryOf,
      progressOf: (articleId) => data.progress[articleId] ?? null,
      statusOf,
      completedCount: (articleIds) =>
        articleIds.reduce(
          (count, articleId) => count + (data.progress[articleId]?.completed ? 1 : 0),
          0,
        ),
      setCurrentArticle,
      recordPosition,
      setCompleted,
      toggleCompleted: (articleId) => setCompleted(articleId, !entryOf(articleId).completed),
      resetPosition,
      savedPlaceOf: (articleId) => {
        const place = data.savedPlaces[articleId];
        return place && !place.deletedAt ? place : null;
      },
      savePlace,
      removeSavedPlace,
      highlightsFor: (articleId) =>
        Object.values(data.highlights)
          .filter((item) => item.articleId === articleId && !item.deletedAt)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      addHighlight,
      removeHighlight,
      syncNow,
    };
  }, [
    ready,
    storageAvailable,
    data,
    syncStatus,
    setCurrentArticle,
    recordPosition,
    setCompleted,
    resetPosition,
    savePlace,
    removeSavedPlace,
    addHighlight,
    removeHighlight,
    syncNow,
  ]);

  return <ReaderDataContext.Provider value={value}>{children}</ReaderDataContext.Provider>;
}

export function useReaderData(): ReaderDataContextValue {
  const context = useContext(ReaderDataContext);
  if (!context) throw new Error("useReaderData, ReaderDataProvider içinde kullanılmalı");
  return context;
}
