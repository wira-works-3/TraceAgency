import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trace Agency — Visual Storytelling & Creative Production",
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
