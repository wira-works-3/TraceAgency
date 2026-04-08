import articlesJson from "@/data/articles.json";

export const articlesData = Array.isArray(articlesJson) ? articlesJson : [];

export const featuredArticle = articlesData[0];
export const sidebarArticles = articlesData.slice(1);
