import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articlesData } from "../page";

// Karena ini adalah app router Next.js, params di Server Component harus di-await (Promise) di Next 15+
export default async function ArticleDetail({ params }) {
  // Await the params object
  const resolvedParams = await params;
  
  // Mencari artikel berdasarkan ID dari URL
  const article = articlesData.find(a => a.id === resolvedParams.id);

  // Jika artikel tidak ditemukan
  if (!article) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background">
          <h1 className="text-4xl font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
          <Link href="/artikel" className="text-text-secondary hover:text-foreground flex items-center gap-2">
            <ArrowLeft size={16} /> Kembali ke Jurnal
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full min-h-screen bg-background pt-32 pb-20 mt-0">
        <article className="container mx-auto px-6 lg:px-8 max-w-4xl">
          
          {/* Back Button */}
          <Link 
            href="/artikel" 
            className="inline-flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors mb-12 text-sm font-semibold tracking-wider uppercase"
          >
            <ArrowLeft size={16} /> Kembali ke Jurnal
          </Link>

          {/* Article Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 text-text-secondary text-sm mb-6 font-medium uppercase tracking-widest">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
              {article.title}
            </h1>
          </header>

          {/* Hero Image */}
          <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-16">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content (Dummy Content) */}
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-text-secondary prose-headings:text-foreground prose-a:text-white">
            <p className="lead text-xl md:text-2xl text-foreground font-medium mb-8">
              {article.excerpt}
            </p>
            
            <p>
              Dalam dunia event marketing yang terus berkembang, memilih talent yang tepat bukan lagi sekadar soal penampilan fisik. Talent, baik itu SPG (Sales Promotion Girl), Usher, maupun MC, adalah wajah dari brand Anda di garis depan. Mereka adalah titik kontak pertama antara produk Anda dan calon konsumen.
            </p>

            <h2>Mengapa Pemilihan Talent Sangat Krusial?</h2>
            <p>
              Banyak perusahaan masih menganggap remeh proses seleksi talent untuk event mereka. Padahal, riset menunjukkan bahwa lebih dari 60% pengunjung event akan mengingat interaksi mereka dengan staf *booth* lebih dari sekadar melihat produk itu sendiri. Seorang SPG yang komunikatif dan memahami *product knowledge* dengan baik dapat meningkatkan konversi penjualan secara drastis dibandingkan dengan SPG yang hanya berdiri membagikan brosur.
            </p>

            <h3>1. SPG vs Usher: Kenali Perbedaannya</h3>
            <p>
              Seringkali klien kami tertukar antara kebutuhan akan SPG dan Usher. Mari kita perjelas:
            </p>
            <ul>
              <li><strong>SPG / SPB (Sales Promotion):</strong> Fokus utama mereka adalah <em>selling</em> dan <em>educating</em>. Mereka harus proaktif mendekati pengunjung, menjelaskan detail teknis produk, dan mendorong terjadinya transaksi.</li>
              <li><strong>Usher:</strong> Fokus utama mereka adalah <em>hospitality</em> dan <em>brand image</em>. Tugas mereka adalah menyambut tamu VVIP, mengarahkan tempat duduk, memegang plakat penghargaan, atau berdiri di area *photobooth*. Mereka mengutamakan keanggunan dan kesopanan.</li>
            </ul>

            <h3>2. Menyesuaikan Talent dengan Brand Persona</h3>
            <p>
              Jika brand Anda adalah produk otomotif *sport*, Anda mungkin membutuhkan talent dengan karakter *energetic* dan *bold*. Sebaliknya, jika Anda meluncurkan produk kosmetik premium, Anda membutuhkan talent dengan tampilan *flawless* dan pembawaan yang elegan. Di Trace Agency, kami selalu melakukan *screening* ketat tidak hanya dari segi fisik, tapi juga karakter dan gaya komunikasi talent agar 100% *match* dengan DNA brand Anda.
            </p>

            <h2>Kesimpulan</h2>
            <p>
              Jangan biarkan event yang sudah Anda rencanakan berbulan-bulan gagal hanya karena *human error* di lapangan. Bekerjasamalah dengan agensi HR yang terpercaya untuk memastikan setiap talent yang bertugas telah dibekali dengan *attitude*, *grooming*, dan *product knowledge* yang paripurna.
            </p>
          </div>

          {/* Share / Footer Article */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-text-secondary text-sm font-semibold tracking-wider uppercase">
              Bagikan artikel ini
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-full border border-border text-foreground hover:bg-surface transition-colors text-sm font-medium">Twitter</button>
              <button className="px-6 py-2 rounded-full border border-border text-foreground hover:bg-surface transition-colors text-sm font-medium">LinkedIn</button>
              <button className="px-6 py-2 rounded-full border border-border text-foreground hover:bg-surface transition-colors text-sm font-medium">Facebook</button>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}