"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const featuredArticle = {
  id: "1",
  title: "Panduan Memilih SPG & Usher yang Tepat untuk Event Anda",
  excerpt: "Memilih talent yang tepat adalah kunci kesuksesan event. Ketahui perbedaan peran SPG dan Usher serta tips memilih talent yang sesuai dengan brand image Anda.",
  date: "12 Okt 2023",
  image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1000&auto=format&fit=crop",
  category: "Tips & Trik",
};

const articles = [
  {
    id: "2",
    title: "Tren Event Marketing 2024 yang Wajib Anda Ketahui",
    excerpt: "Dari interaksi hybrid hingga personalisasi, temukan tren event marketing terbaru untuk meningkatkan engagement.",
    date: "05 Okt 2023",
    image: "https://images.unsplash.com/photo-1475721025505-23126915af62?q=80&w=800&auto=format&fit=crop",
    category: "Marketing",
  },
  {
    id: "3",
    title: "Pentingnya Grooming dan Attitude bagi Seorang Talent",
    excerpt: "Mengapa penampilan dan sikap profesional sangat penting saat mewakili sebuah brand di lapangan.",
    date: "28 Sep 2023",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    category: "Grooming",
  },
  {
    id: "4",
    title: "Suksesnya Kampanye Brand X bersama Trace Agency",
    excerpt: "Studi kasus bagaimana kolaborasi talent yang tepat meningkatkan konversi penjualan hingga 40%.",
    date: "15 Sep 2023",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
    category: "Case Study",
  },
];

export default function Artikel() {
  return (
    <section id="artikel" className="py-32 bg-background border-t border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-border pb-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              INSIGHTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-secondary">
              Latest from <br />
              <span className="text-foreground">the journal</span>
            </h2>
          </div>
          <Link 
            href="/artikel"
            className="px-6 py-3 rounded-full bg-surface text-foreground border border-border text-sm font-semibold hover:bg-surface/80 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            Read all articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Featured Article */}
          <Link href={`/artikel/${featuredArticle.id}`} className="lg:col-span-7 group cursor-pointer block">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-8">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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

          {/* List Cards */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {articles.map((article, index) => (
              <Link href={`/artikel/${article.id}`} key={article.id} className="block">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 group cursor-pointer border-b border-border/50 pb-8 last:border-0"
                >
                  <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
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
