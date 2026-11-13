import { LogOut } from "lucide-react";
import { logout } from "@/app/login/actions";
import { cn } from "@/lib/utils";
import { navLink } from "@/components/ui/classes";

/**
 * Ends the session. A plain form posting the `logout` action, so it works from
 * server pages and client components alike and before any script has run.
 *
 * `label`: "always" shows the words, "wide" only from the small breakpoint up (the
 * phone header has no room). `size="sm"` is the reading list's footer.
 */
export function SignOutButton({
  label = "wide",
  size = "md",
}: {
  label?: "always" | "wide";
  size?: "sm" | "md";
}) {
  return (
    <form action={logout} className="flex">
      <button
        type="submit"
        title="Çıkış yap"
        className={cn(navLink, size === "sm" && "min-h-8 px-2 text-xs")}
      >
        <LogOut className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
        <span className={cn(label === "wide" && "max-sm:sr-only")}>Çıkış yap</span>
      </button>
    </form>
  );
}
