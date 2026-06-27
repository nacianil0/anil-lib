import type { Category, Level } from "./schema";

/** Minimal, serializable article shape passed from server components to the UI. */
export type ArticleDescriptor = {
  articleId: string;
  slug: string;
  title: string;
  category: Category;
  level: Level;
  readingOrder: number;
  classificationBatch: number;
};

/** The article currently being read, with presentation metadata. */
export type CurrentArticle = ArticleDescriptor & {
  summary: string;
  readingMinutes: number;
  tags: string[];
  totalCount: number;
};

/** A previous/next navigation target, or null at the ends of the sequence. */
export type AdjacentArticle = {
  slug: string;
  title: string;
  readingOrder: number;
} | null;

/** Reading status derived from persisted progress. */
export type ReadingStatus = "unread" | "in-progress" | "completed";
