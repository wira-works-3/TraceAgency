import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const articlesData = [
  {
    id: "1",
    title: "Panduan Memilih SPG & Usher yang Tepat untuk Event Anda",
    excerpt: "Memilih talent yang tepat adalah kunci kesuksesan event. Ketahui perbedaan peran SPG dan Usher serta tips memilih talent yang sesuai dengan brand image Anda.",
    date: "12 Okt 2023",
    image: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=1000&auto=format&fit=crop",
    category: "Tips & Trik",
  },
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

export default function AllArticlesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          
          {/* Back Button & Header */}
          <div className="mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors mb-8 text-sm font-semibold tracking-wider uppercase"
            >
              <ArrowLeft size={16} /> Kembali ke Home
            </Link>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              Our <span className="text-text-secondary">Journal</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl">
              Kumpulan artikel, tips, dan wawasan terbaru seputar dunia event marketing, manajemen talent, dan studi kasus kesuksesan.
            </p>
          </div>

          {/* Grid Artikel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articlesData.map((article) => (
              <Link 
                href={`/artikel/${article.id}`} 
                key={article.id}
                className="group flex flex-col h-full"
              >
                <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {article.category && (
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-foreground border border-border px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      {article.category}
                    </div>
                  )}
                </div>
                
                <div className="text-text-secondary text-xs mb-3 font-medium uppercase tracking-widest">
                  <span>{article.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-gray-300 transition-colors leading-tight">
                  {article.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed text-sm flex-grow">
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