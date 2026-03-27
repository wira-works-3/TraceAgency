"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

// Komponen helper untuk efek hitung mundur (counting)
function AnimatedCounter({ from = 0, to, duration = 2, suffix = "" }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / (duration * 1000), 1);
      
      // Easing easeOutExpo untuk efek melambat di akhir
      const easeOutExpo = progressPercentage === 1 ? 1 : 1 - Math.pow(2, -10 * progressPercentage);
      
      const currentCount = Math.floor(easeOutExpo * (to - from) + from);
      setCount(currentCount);

      if (progressPercentage < 1) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Komponen untuk teks yang muncul per kata saat di-scroll
function ScrollRevealText({ text }) {
  const words = text.split(" ");

  // Untuk versi ini, semua kata berubah menjadi putih agar tidak selang-seling.
  const highlightedWords = null;

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 mb-8">
      {words.map((word, i) => {
        // (Tidak dipakai lagi, tapi dibiarkan agar struktur tetap aman)
        const isHighlighted = false;
        
        // Semua kata dibuat putih saat animasi muncul.
        const targetColor = "#ffffff";

        return (
          <motion.span 
            key={i} 
            className="text-[clamp(1.5rem,3.1vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-[#1a1a1a]" // Ukuran dikunci agar tetap proporsional saat zoom
            initial={{ color: "#1a1a1a" }} // Mulai dari abu-abu yang sangat gelap (nyaris hitam)
            whileInView={{ color: targetColor }} // Menyala ke warna target saat di-scroll
            viewport={{ once: true, margin: "-10%" }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.05, // delay bertahap per kata
              ease: "easeOut"
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}

export default function About() {
  const pathname = usePathname();

  const handleLayananClick = (e) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background waves/lines could be added here */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #ffffff 1px, transparent 1px, transparent 100px)' }} />

      <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
              Tentang Kami
            </span>
          </div>
          
          <ScrollRevealText text="Trace agency menyediakan talent event seperti SPG/SPB, Usher, dan MC. Tim kami sudah berpengalaman dan profesional sehingga kami siap membantu dan membuat event menjadi lebih hidup dan berkesan." />
          
          <div className="flex gap-4 mt-12 flex-wrap">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-foreground text-background text-base font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              Hubungi Kami
            </a>
            <a
              href="/#services"
              onClick={handleLayananClick}
              className="px-8 py-4 rounded-full bg-surface text-foreground border border-border text-base font-semibold hover:bg-surface/80 transition-all flex items-center justify-center"
            >
              Layanan Kami
            </a>
          </div>
        </motion.div>

        {/* Highlights / Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-between items-end mb-16 border-b border-border pb-8">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                Sorotan
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Angka di balik <span className="text-text-secondary">kesuksesan</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8">
            <div className="border-b border-border/50 pb-8 md:border-none md:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={300} duration={2.5} suffix="+" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Kolaborasi Brand</p>
            </div>
            
            <div className="border-b border-border/50 pb-8 md:border-none md:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={500} duration={2.5} suffix="+" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Project Selesai</p>
            </div>
            
            <div className="border-b border-border/50 pb-8 md:border-none md:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={8000} duration={2.5} suffix="+" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Talent Profesional</p>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={98} duration={2.5} suffix="%" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Client Retention Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
