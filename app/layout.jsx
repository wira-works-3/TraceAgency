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
  title: "Trace Agency",
  description: "Trace Agency menghadirkan produksi visual, branding, dan kampanye kreatif—lihat portofolio kami dan konsultasikan kebutuhanmu.",
  openGraph: {
    title: "Trace Agency — Visual Storytelling & Creative Production",
    description: "Trace Agency menghadirkan produksi visual, branding, dan kampanye kreatif—lihat portofolio kami dan konsultasikan kebutuhanmu.",
    url: "https://traceagency.com",
    siteName: "Trace Agency",
    images: [
      {
        url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop", // placeholder
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
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
