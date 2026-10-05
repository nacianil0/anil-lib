import { syncResponseSchema, type SyncRequest, type SyncResponse } from "./sync-contract";
import { seriesResetResponseSchema, type SeriesId } from "./series-reset";

export async function requestSeriesReset(seriesId: SeriesId) {
  const response = await fetch("/api/reader-reset", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seriesId }),
  });
  if (!response.ok) {
    throw Object.assign(new Error(`Series reset failed (${response.status})`), {
      status: response.status,
    });
  }
  return seriesResetResponseSchema.parse(await response.json());
}

export async function requestReaderSync(request: SyncRequest): Promise<SyncResponse> {
  const response = await fetch("/api/reader-sync", {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = new Error(`Reader sync failed (${response.status})`);
    Object.assign(error, { status: response.status });
    throw error;
  }
  return syncResponseSchema.parse(await response.json());
}
