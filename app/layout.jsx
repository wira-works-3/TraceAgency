import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import FloatingSocialButtons from "../components/FloatingSocialButtons";
import { Toaster } from "@/components/ui/sonner";

// Plus Jakarta Sans untuk teks body (bersih, modern, mudah dibaca)
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

// Space Grotesk untuk heading/display (unik, tegas, nuansa arsitektur/tech modern)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://sewaspg.com"),
  applicationName: "Jasa Sewa SPG",
  title: {
    default: "Jasa Sewa SPG, Usher, MC Profesional",
    template: "%s | Jasa Sewa SPG",
  },
  description:
    "Trace Agency, jasa sewa SPG, SPB, Usher, MC, dan talent event profesional untuk event, pameran, dan aktivasi brand di berbagai kota.",
  keywords: [
    "agency SPG",
    "jasa SPG",
    "sewa SPG",
    "sewa usher",
    "jasa sewa SPG",
    "SPG Jakarta",
    "SPG Surabaya",
    "SPG Semarang",
    "SPG Bali",
    "SPB event",
    "usher event",
    "talent event",
    "trace agency",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Jasa Sewa SPG, Usher, MC Profesional",
    description:
      "Jasa sewa SPG, SPB, Usher, dan MC profesional untuk kebutuhan promosi, pameran, dan event brand Anda.",
    url: "/",
    siteName: "Jasa Sewa SPG",
    images: [
      {
        url: "/traceagency.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Sewa SPG, Usher, MC Profesional",
    description:
      "Jasa sewa SPG, SPB, Usher, dan MC profesional untuk kebutuhan promosi, pameran, dan event brand Anda.",
    images: ["/traceagency.png"],
  },
};

// Structured data untuk Google: menentukan "site name" yang tampil di hasil pencarian
// (agar tampil "Jasa Sewa SPG", bukan "sewaspg.com"). Ref: developers.google.com/search/docs/appearance/site-names
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://sewaspg.com/#website",
      url: "https://sewaspg.com/",
      name: "Jasa Sewa SPG",
      alternateName: ["Sewa SPG", "Trace Agency"],
      inLanguage: "id-ID",
    },
    {
      "@type": "Organization",
      "@id": "https://sewaspg.com/#organization",
      name: "Trace Agency",
      url: "https://sewaspg.com/",
      logo: "https://sewaspg.com/traceagency.png",
      sameAs: ["https://www.instagram.com/sewaspg/"],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased dark font-sans`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-1948SPMEKL" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1948SPMEKL');
          `}
        </Script>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FloatingSocialButtons />
        <Toaster />
      </body>
    </html>
  );
}
