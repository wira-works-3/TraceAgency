"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { featuredArticle, sidebarArticles } from "@/data/articles";

export default function Artikel() {
  return (
    <section id="artikel" className="py-32 bg-background border-t border-border/50 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border pb-8">
          <div className="min-w-0">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              Wawasan
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-secondary">
              Terbaru dari <br />
              <span className="text-foreground">jurnal kami</span>
            </h2>
          </div>
          <Link
            href="/artikel"
            className="px-6 py-3 rounded-full bg-surface text-foreground border border-border text-sm font-semibold hover:bg-surface/80 transition-all inline-flex items-center gap-2 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            Lihat semua artikel <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <Link
            href={`/artikel/${featuredArticle.id}`}
            className="lg:col-span-7 group cursor-pointer block min-w-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[4/3] sm:aspect-auto sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8 bg-surface">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md text-foreground border border-border px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                  {featuredArticle.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-4 font-medium uppercase tracking-widest">
                <span>{featuredArticle.date}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-gray-300 transition-colors leading-tight">
                {featuredArticle.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-8 text-lg">
                {featuredArticle.excerpt}
              </p>
            </motion.div>
          </Link>

          <div className="lg:col-span-5 flex flex-col gap-8 min-w-0">
            {sidebarArticles.map((article, index) => (
              <Link href={`/artikel/${article.id}`} key={article.id} className="block min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 group cursor-pointer border-b border-border/50 pb-8 last:border-0"
                >
                  <div className="w-full sm:w-36 md:w-40 h-48 sm:h-36 md:h-40 shrink-0 rounded-2xl overflow-hidden bg-surface">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    <div className="text-text-secondary text-xs mb-3 font-medium uppercase tracking-widest">
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-gray-300 transition-colors line-clamp-3">
                      {article.title}
                    </h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
