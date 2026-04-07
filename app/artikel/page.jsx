"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articlesData } from "@/data/articles";
import { useEffect, useMemo, useState } from "react";

export const metadata = {
  title: "Artikel Agency SPG",
  description:
    "Baca artikel dan insight seputar jasa SPG profesional, talent event, strategi promosi, dan tips memilih agency SPG terpercaya.",
  alternates: {
    canonical: "/artikel",
  },
  openGraph: {
    title: "Artikel Agency SPG | Trace Agency",
    description:
      "Kumpulan artikel Trace Agency seputar layanan SPG, SPB, Usher, dan kebutuhan talent event profesional.",
    url: "/artikel",
  },
};

export default function AllArticlesPage() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public/articles")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data?.ok || !Array.isArray(data.articles)) return;
        setArticles(data.articles);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const mergedArticles = useMemo(() => {
    const remote = Array.isArray(articles) ? articles : [];
    if (remote.length) {
      return remote.map((a) => ({
        ...a,
        date: a.dateLabel ?? a.date ?? "",
      }));
    }
    return articlesData;
  }, [articles]);

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full min-h-screen bg-background pt-32 pb-20 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors mb-8 text-sm font-semibold tracking-wider uppercase"
            >
              <ArrowLeft size={16} /> Kembali ke beranda
            </Link>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-foreground">Jurnal</span>{" "}
              <span className="text-text-secondary">kami</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl">
              Kumpulan artikel, tips, dan wawasan terbaru seputar dunia event marketing, manajemen talent, dan studi kasus kesuksesan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {mergedArticles.map((article) => (
              <Link
                href={`/artikel/${article.id}`}
                key={article.id}
                className="group flex flex-col h-full min-w-0"
              >
                <div className="relative aspect-[4/3] sm:h-64 rounded-3xl overflow-hidden mb-6 bg-surface shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: article.objectPosition ?? "50% 20%" }}
                    loading="lazy"
                  />
                  {article.category && (
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border border-border px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase max-w-[calc(100%-2rem)] truncate">
                      {article.category}
                    </div>
                  )}
                </div>

                <div className="text-text-secondary text-xs mb-3 font-medium uppercase tracking-widest">
                  <span>{article.dateLabel ?? article.date}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 group-hover:text-gray-300 transition-colors leading-tight line-clamp-3">
                  {article.title}
                </h3>

                <p className="text-text-secondary leading-relaxed text-sm flex-grow min-h-0">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
