import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articlesData } from "@/data/articles";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = articlesData.find((item) => item.id === resolvedParams.id);

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
      images: article.image ? [{ url: article.image }] : undefined,
    },
  };
}

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
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
              {article.content?.intro ?? article.excerpt}
            </p>

            {article.content?.servicesTitle ? (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {article.content.servicesTitle}
                </h2>
                {article.content?.services?.length ? (
                  <ul className="list-disc pl-6 md:pl-8 space-y-2 marker:text-foreground">
                    {article.content.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {article.content?.reasonsTitle ? (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {article.content.reasonsTitle}
                </h2>
                {article.content?.reasons?.length ? (
                  <ol className="list-decimal pl-6 md:pl-8 space-y-2 marker:text-foreground">
                    {article.content.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ol>
                ) : null}
              </div>
            ) : null}

            {article.content?.cta ? (
              <p className="text-foreground font-semibold">{article.content.cta}</p>
            ) : null}

            {article.content?.whatsappLabel ? (
              <p className="text-foreground font-semibold">
                <span className="text-foreground font-semibold">WhatsApp: </span>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
                  {article.content.whatsappLabel.replace("WhatsApp: ", "")}
                </a>
              </p>
            ) : null}
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