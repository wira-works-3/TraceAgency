"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

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

  // Daftar kata-kata kunci yang akan disorot dengan warna putih terang
  const highlightedWords = [
    "terkemuka", 
    "profesional", 
    "berpengalaman.", 
    "talent", 
    "SPG,", 
    "Usher,", 
    "MC", 
    "mendefinisikan", 
    "ulang",
    "kesuksesan"
  ];

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1 mb-8">
      {words.map((word, i) => {
        // Cek apakah kata saat ini termasuk dalam daftar kata yang di-highlight
        const isHighlighted = highlightedWords.includes(word);
        
        // Jika di-highlight, gunakan warna putih, jika tidak gunakan abu-abu/silver dari tema (text-text-secondary yang biasanya #a0a0a0)
        const targetColor = isHighlighted ? "#ffffff" : "#a0a0a0"; 

        return (
          <motion.span 
            key={i} 
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-[#1a1a1a]" // Warna awal sangat gelap/samar (tapi tetap ada)
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
              ABOUT US
            </span>
          </div>
          
          <ScrollRevealText text="Kami adalah agensi Human Resources terkemuka yang didirikan oleh profesional berpengalaman. Kami menyediakan talent profesional seperti SPG, Usher, dan MC yang mendefinisikan ulang standar kesuksesan event Anda." />
          
          <div className="flex gap-4 mt-12">
            <Link 
              href="#kontak"
              className="px-8 py-4 rounded-full bg-foreground text-background text-base font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              Hubungi Kami
            </Link>
            <Link 
              href="#services"
              className="px-8 py-4 rounded-full bg-surface text-foreground border border-border text-base font-semibold hover:bg-surface/80 transition-all flex items-center justify-center"
            >
              Layanan Kami
            </Link>
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
                HIGHLIGHTS
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
                  <AnimatedCounter from={0} to={100} duration={2.5} suffix="+" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Kolaborasi Brand</p>
            </div>
            
            <div className="border-b border-border/50 pb-8 md:border-none md:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={200} duration={2.5} suffix="+" />
                </h4>
              </div>
              <p className="text-xl text-text-secondary pl-6">Project Selesai</p>
            </div>
            
            <div className="border-b border-border/50 pb-8 md:border-none md:pb-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                  <AnimatedCounter from={0} to={500} duration={2.5} suffix="+" />
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
