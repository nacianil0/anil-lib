import type { SyncResponse as ContractSyncResponse } from "@/lib/reader-data/sync-contract";

export type SyncOperationError = ContractSyncResponse["errors"][number];
export type SyncResponse = ContractSyncResponse;
