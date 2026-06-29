import { syncResponseSchema, type SyncRequest, type SyncResponse } from "./sync-contract";

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
