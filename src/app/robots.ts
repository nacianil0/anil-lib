import type { MetadataRoute } from "next";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { absoluteUrl } from "@/lib/site";

/**
 * Crawl hints only. Access is enforced by the middleware and the pages themselves
 * (login redirects, 404s); a disallowed path here is merely not worth a crawler's
 * request, never a way of hiding anything.
 */
export default function robots(): MetadataRoute.Robots {
  // Before the launch nothing is public, so nothing is worth crawling.
  if (!publicLaunchEnabled()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/yonetim", "/hesap", "/read"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
