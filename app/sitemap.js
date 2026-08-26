import { articlesData } from "@/data/articles";

export default function sitemap() {
  const baseUrl = "https://sewaspg.com";
  const articlePages = articlesData.map((article) => ({
    url: `${baseUrl}/artikel/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...articlePages,
  ];
}
