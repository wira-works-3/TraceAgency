import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-border">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Blurb */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="inline-block text-3xl font-bold text-foreground tracking-tight">
              Trace.
            </Link>
            <p className="text-text-secondary leading-relaxed max-w-sm text-sm">
              We create memorable experiences, providing exceptional talents and event management that redefine how people connect with your brand.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Sitemap</h4>
            <ul className="space-y-4">
              {["About", "Services", "Gallery", "Artikel", "Kontak"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-text-secondary hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-6">
            <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">Socials</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://instagram.com/sewaspg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors text-sm font-medium">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors text-sm font-medium">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-text-secondary hover:text-foreground transition-colors text-sm font-medium">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs">
            © {new Date().getFullYear()} Trace Agency. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-secondary">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
