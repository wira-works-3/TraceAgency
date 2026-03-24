"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    if (pathname === '/') {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/${targetId}`);
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
              Ready to create <br />
              <span className="text-text-secondary">something memorable?</span>
            </h2>
            <p className="text-text-secondary max-w-md text-lg">
              Partner with Trace Agency to elevate your brand experiences and connect with your audience.
            </p>
          </div>
          <a 
            href="#kontak" 
            className="group flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold text-lg transition-transform hover:scale-105"
            onClick={(e) => handleSmoothScroll(e, '#kontak')}
          >
            Let's Talk
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Info */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48">
                <Image 
                  src="/traceagency.png" 
                  alt="Trace Agency Logo" 
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-sm text-base">
              We create memorable experiences, providing exceptional talents and event management that redefine how people connect with your brand.
            </p>
            <a
              href="https://www.instagram.com/sewaspg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-text-secondary hover:text-foreground transition-colors group"
            >
              <Instagram className="w-5 h-5 mt-1 shrink-0" />
              <p className="text-sm">
                <span className="font-medium text-foreground group-hover:text-foreground">@sewaspg</span>
                <br />
                Ikuti kami di Instagram.
              </p>
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Sitemap</h4>
            <ul className="space-y-4">
              {["About", "Services", "Gallery", "Artikel", "Kontak"].map((item) => {
                const isArtikel = item.toLowerCase() === 'artikel';
                const href = isArtikel ? '/artikel' : `#${item.toLowerCase()}`;
                
                return (
                  <li key={item}>
                    <a
                      href={href}
                      className="text-text-secondary hover:text-foreground transition-colors text-base font-medium"
                      onClick={(e) => {
                        if (!isArtikel) {
                          handleSmoothScroll(e, href);
                        }
                      }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Socials</h4>
            <ul className="space-y-4">
              {[
                { name: "Instagram (@sewaspg)", url: "https://www.instagram.com/sewaspg/" },
                { name: "LinkedIn", url: "#" },
                { name: "Twitter", url: "#" },
                { name: "TikTok", url: "#" }
              ].map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-text-secondary hover:text-foreground transition-colors text-base font-medium flex items-center gap-2 group"
                  >
                    {social.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-4">
              <a href="mailto:hello@traceagency.com" className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-base font-medium">hello@traceagency.com</span>
              </a>
              <a
                href="https://wa.me/6285191641608"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-base font-medium">WhatsApp +62 851-9164-1608</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} Trace Agency. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-text-secondary">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
