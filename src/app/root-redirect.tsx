"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { readProgress } from "@/lib/progress/storage";
import { UI } from "@/lib/content/labels";

type Props = {
  slugById: Record<string, string>;
  firstSlug: string;
};

export function RootRedirect({ slugById, firstSlug }: Props) {
  const router = useRouter();

  useEffect(() => {
    const { currentArticleId } = readProgress();
    const target =
      currentArticleId && slugById[currentArticleId] ? slugById[currentArticleId] : firstSlug;
    if (target) router.replace(`/read/${target}`);
  }, [router, slugById, firstSlug]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <p className="font-sans text-sm text-text-muted" role="status">
        {UI.loading}
      </p>
    </div>
  );
}
