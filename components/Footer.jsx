"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

export default function Footer() {
  const pathname = usePathname();

  /** Sama seperti Header: scroll halus di beranda; dari halaman lain navigasi ke /#id (browser meng-scroll setelah load). */
  const handleHashNav = (e, href) => {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    const sectionId = href.slice(2);
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.history.replaceState) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    } else {
      window.location.assign(href);
    }
  };

  return (
    <footer className="bg-background pt-24 pb-8 border-t border-border relative overflow-hidden">
      {/* Optional Glow Effect for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-foreground/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Top Call to Action */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-border pb-16 mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-display text-foreground">
              Siap ciptakan <br />
              <span className="text-text-secondary">pengalaman yang berkesan?</span>
            </h2>
            <p className="text-text-secondary max-w-md text-lg">
              Kolaborasi bersama Trace Agency untuk mengangkat pengalaman merek Anda dan terhubung dengan audiens.
            </p>
          </div>
          <Link
            href="/#kontak"
            className="group flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105"
            onClick={(e) => handleHashNav(e, "/#kontak")}
          >
            Mari bicara
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Info */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48">
                <Image 
                  src="/traceagency.png" 
                  alt="Logo Trace Agency" 
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-sm text-base">
              Kami menghadirkan pengalaman berkesan dengan talent dan manajemen event profesional yang memperkuat koneksi audiens dengan merek Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Peta situs</h4>
            <ul className="space-y-4">
              {[
                { label: "Tentang Kami", href: "/#about" },
                { label: "Layanan", href: "/#services" },
                { label: "Galeri", href: "/#gallery" },
                { label: "Artikel", href: "/artikel", isRoute: true },
                { label: "Kontak", href: "/#kontak" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-text-secondary hover:text-foreground transition-colors text-base font-medium"
                    onClick={(e) => {
                      if (item.isRoute) return;
                      handleHashNav(e, item.href);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Hubungi kami</h4>
            <div className="space-y-4">
              <a href="mailto:traceagencys@gmail.com" className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-base font-medium">traceagencys@gmail.com</span>
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-base font-medium">WhatsApp +62 851-9164-1608</span>
              </a>
              <a
                href="https://www.instagram.com/sewaspg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-text-secondary hover:text-foreground transition-colors group pt-2"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-base font-medium text-foreground block">@sewaspg</span>
                  <span className="text-sm text-text-secondary mt-1 block">Ikuti kami di Instagram.</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-center sm:justify-between gap-3 text-text-secondary text-sm text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} Trace Agency. Hak cipta dilindungi undang-undang.
            </p>
            <p>
              Dibuat dengan ❤️ oleh{" "}
              <a
                href="https://www.tiktok.com/@wira.works"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:underline underline-offset-2"
              >
                Wira.Works
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
