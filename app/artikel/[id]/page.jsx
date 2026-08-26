import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articlesData } from "@/data/articles";
import { WHATSAPP_LINK } from "@/lib/whatsapp";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDateId(date) {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short", year: "numeric" }).format(d);
}

async function getArticleById(id) {
  if (prisma.article) {
    try {
      const row = await prisma.article.findUnique({ where: { id } });
      if (row) {
        return {
          id: row.id,
          title: row.title,
          excerpt: row.excerpt,
          content: row.content ?? null,
          date: formatDateId(row.date),
          image: row.image,
          category: row.category,
          objectPosition: row.objectPosition ?? null,
        };
      }
    } catch {
      return null;
    }
  }
  if (process.env.NODE_ENV === "production") return null;
  return articlesData.find((item) => item.id === id) ?? null;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getArticleById(String(resolvedParams.id));

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/artikel/${article.id}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/artikel/${article.id}`,
      type: "article",
      siteName: "Jasa Sewa SPG",
      images: article.image ? [{ url: article.image }] : undefined,
    },
  };
}

// Karena ini adalah app router Next.js, params di Server Component harus di-await (Promise) di Next 15+
export default async function ArticleDetail({ params }) {
  // Await the params object
  const resolvedParams = await params;
  
  // Mencari artikel berdasarkan ID dari URL
  const article = await getArticleById(String(resolvedParams.id));

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

  const knownBlocks = ["excerpt", "intro", "servicesTitle", "services", "reasonsTitle", "reasons", "cta", "whatsappLabel"];
  const rawOrder = Array.isArray(article.content?.order) ? article.content.order.map((k) => String(k)) : [];
  const filtered = rawOrder.filter((k) => knownBlocks.includes(k));
  const order = [...new Set(filtered), ...knownBlocks.filter((k) => !filtered.includes(k))];
  const rendered = new Set();

  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col w-full min-h-screen bg-background pt-32 pb-20 mt-0">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl overflow-x-hidden">
          
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
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[600px] min-h-[240px] rounded-3xl overflow-hidden mb-16 bg-surface">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              style={{ objectPosition: article.objectPosition ?? "50% 20%" }}
            />
          </div>

          {/* Article Content */}
          <div className="max-w-none text-foreground text-lg leading-relaxed space-y-8">
            {order.map((blockKey) => {
              if (rendered.has(blockKey)) return null;
              rendered.add(blockKey);

              if (blockKey === "excerpt") {
                const excerptText = String(article.excerpt ?? "").trim();
                const introText = String(article.content?.intro ?? "").trim();
                if (!excerptText) return null;
                if (introText && introText === excerptText) return null;
                return (
                  <p
                    key="excerpt"
                    className="text-xl md:text-2xl text-foreground font-medium leading-relaxed whitespace-pre-line"
                  >
                    {excerptText}
                  </p>
                );
              }

              if (blockKey === "intro") {
                const intro = String(article.content?.intro ?? "").trim();
                if (!intro) return null;
                return (
                  <p
                    key="intro"
                    className="text-xl md:text-2xl text-foreground font-medium leading-relaxed whitespace-pre-line"
                  >
                    {intro}
                  </p>
                );
              }

              if (blockKey === "servicesTitle") {
                const title = String(article.content?.servicesTitle ?? "").trim();
                if (!title) return null;
                return (
                  <h2 key="servicesTitle" className="text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                  </h2>
                );
              }

              if (blockKey === "services") {
                const services = Array.isArray(article.content?.services) ? article.content.services : [];
                if (!services.length) return null;
                return (
                  <ul key="services" className="list-disc pl-6 md:pl-8 space-y-2 marker:text-foreground">
                    {services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                );
              }

              if (blockKey === "reasonsTitle") {
                const title = String(article.content?.reasonsTitle ?? "").trim();
                if (!title) return null;
                return (
                  <h2 key="reasonsTitle" className="text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                  </h2>
                );
              }

              if (blockKey === "reasons") {
                const reasons = Array.isArray(article.content?.reasons) ? article.content.reasons : [];
                if (!reasons.length) return null;
                return (
                  <ol key="reasons" className="list-decimal pl-6 md:pl-8 space-y-2 marker:text-foreground">
                    {reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ol>
                );
              }

              if (blockKey === "cta") {
                const cta = String(article.content?.cta ?? "").trim();
                if (!cta) return null;
                return (
                  <p key="cta" className="text-foreground font-semibold">
                    {cta}
                  </p>
                );
              }

              if (blockKey === "whatsappLabel") {
                const whatsappLabel = String(article.content?.whatsappLabel ?? "").trim();
                if (!whatsappLabel) return null;
                return (
                  <p key="whatsappLabel" className="text-foreground font-semibold">
                    <span className="text-foreground font-semibold">WhatsApp: </span>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline underline-offset-4"
                    >
                      {whatsappLabel.replace("WhatsApp: ", "")}
                    </a>
                  </p>
                );
              }

              return null;
            })}
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
