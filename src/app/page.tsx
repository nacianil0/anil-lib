import { getOrderedArticles } from "@/lib/content/catalog";
import type { ArticleDescriptor } from "@/lib/content/types";
import { ReaderDashboard } from "@/components/dashboard/reader-dashboard";

export default function HomePage() {
  const articles: ArticleDescriptor[] = getOrderedArticles().map((article) => ({
    articleId: article.articleId,
    slug: article.slug,
    title: article.title,
    category: article.category,
    level: article.level,
    readingOrder: article.readingOrder,
    classificationBatch: article.classificationBatch,
  }));
  return <ReaderDashboard articles={articles} />;
}
