import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import FloatingSocialButtons from "../components/FloatingSocialButtons";

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
  metadataBase: new URL("https://traceagency.com"),
  title: {
    default: "Trace Agency | Agency SPG, SPB, Usher, MC Profesional",
    template: "%s | Trace Agency",
  },
  description:
    "Trace Agency menyediakan jasa SPG, SPB, Usher, MC, dan talent event profesional untuk event, pameran, dan aktivasi brand di berbagai kota.",
  keywords: [
    "agency SPG",
    "jasa SPG",
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
    title: "Trace Agency | Agency SPG, SPB, Usher, MC Profesional",
    description:
      "Layanan talent event profesional untuk kebutuhan promosi, pameran, dan event brand Anda.",
    url: "/",
    siteName: "Trace Agency",
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
    title: "Trace Agency | Agency SPG, SPB, Usher, MC Profesional",
    description:
      "Layanan talent event profesional untuk kebutuhan promosi, pameran, dan event brand Anda.",
    images: ["/traceagency.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased dark font-sans`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <FloatingSocialButtons />
      </body>
    </html>
  );
}
