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
        className="rounded p-1.5 text-text-faint transition-colors hover:text-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <HardDrive className="h-3.5 w-3.5" aria-hidden="true" />
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
      className={`rounded p-1.5 transition-colors ${
        failed ? "text-accent" : "text-text-faint hover:text-text-muted"
      }`}
    >
      <Icon
        className={`h-3.5 w-3.5 ${syncStatus === "syncing" ? "animate-spin" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
