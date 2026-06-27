"use client";

import { Lock } from "lucide-react";
import { logout } from "@/app/login/actions";

export function LockButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        aria-label="Kilidi kapat"
        className="rounded-md p-1.5 text-text-faint transition-colors hover:text-text"
      >
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </form>
  );
}
