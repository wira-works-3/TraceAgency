"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { name: "Beranda", href: "/#hero" },
  { name: "Tentang Kami", href: "/#about" },
  { name: "Layanan", href: "/#services" },
  { name: "Galeri", href: "/#gallery" },
  { name: "Artikel", href: "/artikel" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  // Fungsi untuk menangani smooth scroll secara manual
  const handleSmoothScroll = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const targetId = href.replace('/#', '');

      if (pathname === '/') {
        // Jika sedang di halaman Home, lakukan smooth scroll
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });

          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      } else {
        // Jika sedang di halaman lain (misal artikel), redirect ke halaman Home + anchor
        router.push(href);
      }
    } else {
      // Jika bukan anchor link (misal '/artikel'), biarkan Link/anchor tag bekerja secara normal
      setIsMobileMenuOpen(false);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Set isScrolled for styling
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Set hidden for show/hide behavior based on scroll direction
    if (latest > 150 && latest > previous) {
      setHidden(true); // Scrolling down, hide header
      setIsMobileMenuOpen(false); // Close menu if open while scrolling down
    } else {
      setHidden(false); // Scrolling up, show header
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Minimal Logo */}
        <Link href="/" className="flex items-center gap-2 group" onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}>
          <Image 
            src="/traceagency.png" 
            alt="Logo Trace Agency" 
            width={140} 
            height={56} 
            className="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity"
            priority
          />
        </Link>

        {/* Desktop Nav - Hidden for more minimal look, or kept subtle */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Menu Toggle (Hamburger) */}
        <button
          className="text-foreground p-2 hover:text-text-secondary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile/Fullscreen Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-2xl"
          >
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl flex flex-col py-8 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-3xl font-medium text-text-secondary hover:text-foreground transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/#kontak"
                onClick={(e) => handleSmoothScroll(e, "/#kontak")}
                className="mt-8 px-8 py-4 rounded-full bg-foreground text-background text-center font-semibold hover:bg-gray-200 inline-block w-fit cursor-pointer"
              >
                Konsultasi Sekarang
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
