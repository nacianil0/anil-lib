"use client";

import Link from "next/link";
import { Cloud, CloudOff, HardDrive, RefreshCw } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { useReaderData } from "@/lib/reader-data/use-reader-data";

export function SyncStatus() {
  const { syncStatus, syncNow, mode, keepsLocalReading } = useReaderData();

  if (mode === "local") {
    // Nothing syncs without an account. Say where the reading is kept instead, and
    // lead to the page that explains it and lets the visitor turn it off.
    const label = keepsLocalReading ? UI.localReadingKept : UI.localReadingOff;
    return (
      <Link
        href="/gizlilik#yerel-okuma"
        aria-label={label}
        title={label}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-faint transition-colors hover:bg-surface-muted hover:text-text-muted"
      >
        <HardDrive className="h-4 w-4" aria-hidden="true" />
      </Link>
    );
  }

  const pending = syncStatus === "pending" || syncStatus === "syncing";
  const failed = syncStatus === "offline" || syncStatus === "error" || syncStatus === "unavailable";
  const label =
    syncStatus === "offline"
      ? UI.syncOffline
      : failed
        ? UI.syncError
        : pending
          ? UI.syncPending
          : UI.syncIdle;
  const Icon = failed ? CloudOff : pending ? RefreshCw : Cloud;

  return (
    <button
      type="button"
      onClick={() => void syncNow()}
      aria-label={failed ? `${label}. ${UI.retrySync}` : label}
      title={failed ? `${label} · ${UI.retrySync}` : label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-surface-muted ${
        failed ? "text-accent" : "text-text-faint hover:text-text-muted"
      }`}
    >
      <Icon
        className={`h-4 w-4 ${syncStatus === "syncing" ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
