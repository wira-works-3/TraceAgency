"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const WA_URL = "https://wa.me/6285191641608";

export default function Hero() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [isDesktop, setIsDesktop] = useState(false);

  const heroImages = useMemo(
    () => [
      "/Usher/Usher-1.jpg",
      "/SPG/SPG-6.JPG",
      "/SPG/SPG-1.JPG",
      "/SPG/SPG-3.jpg",
      "/Usher/Usher-2.JPG",
      "/Usher/Usher-4.JPG"
    ],
    []
  );

  const imageObjectPositions = useMemo(
    () => ({
      "/Usher/Usher-1.jpg": "50% 18%",
      "/Usher/Usher-2.JPG": "50% 18%",
      "/Usher/Usher-4.JPG": "50% 18%",
      "/SPG/SPG-6.JPG": "50% 20%",
      "/SPG/SPG-1.JPG": "50% 20%",
      "/SPG/SPG-3.jpg": "50% 20%"
    }),
    []
  );

  const desktopImageObjectPositions = useMemo(
    () => ({
      "/Usher/Usher-1.jpg": "50% 26%",
      "/SPG/SPG-6.JPG": "50% 56%",
      "/SPG/SPG-1.JPG": "50% 56%",
      "/SPG/SPG-3.jpg": "50% 28%",
      "/Usher/Usher-2.JPG": "50% 12%",
      "/Usher/Usher-4.JPG": "50% 56%"
    }),
    []
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [heroImages]);

  useEffect(() => {
    const updateIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroImages.length);
    }, 3500);
    return () => window.clearInterval(intervalId);
  }, [heroImages.length]);

  const activeHeroImage = heroImages[activeImageIndex] ?? heroImages[0] ?? "/traceagency.png";
  const activeHeroObjectPosition =
    (isDesktop ? desktopImageObjectPositions[activeHeroImage] : undefined) ??
    imageObjectPositions[activeHeroImage] ??
    "50% 50%";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeHeroImage}
            src={activeHeroImage}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: activeHeroObjectPosition }}
          />
        </AnimatePresence>
        
        {/* Overlay gradient agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90"></div>
      </div>

      <motion.div 
        className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10 flex flex-col items-center text-center -mt-8 md:-mt-10"
        style={{ y, opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase">
            Agensi SDM & Acara
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tighter mb-6 font-display"
          >
            Perkuat setiap acara Anda <br />
            <span className="text-text-secondary">dengan talenta terbaik.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl font-light"
          >
            Kami menyediakan SPG, Usher, MC, dan Talent profesional untuk mensukseskan setiap event Anda.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href="/#services"
              onClick={handleLayananClick}
              className="px-6 py-4 rounded-full bg-foreground text-background text-sm md:text-base font-semibold hover:bg-gray-200 transition-all flex items-center justify-center flex-1 sm:flex-none min-w-[140px]"
            >
              Layanan Kami
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-surface text-foreground border border-border text-sm md:text-base font-semibold hover:bg-surface/80 transition-all flex items-center justify-center flex-1 sm:flex-none min-w-[140px]"
            >
              Hubungi Kami
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Client Logos / Marquee at bottom of Hero */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden flex flex-col items-center opacity-50">
        <span className="text-[10px] text-text-secondary tracking-widest uppercase mb-4">Mereka mempercayai kami</span>
        <div className="flex w-full whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex gap-12 items-center px-6">
            {/* Repeated logos for infinite scroll effect */}
            {['Big Hersman', 'Armani Exchange', 'Pertamina', 'BEI / IDX', 'BCA', 'Digibank', 'Grab', 'Orangtua Group', 'Mayora', 'Teh Pucuk Harum', 'Pepsico', 'Hush Puppies', 'AEON Mall', 'Richs', 'Tigac', 'Blackjack'].map((logo, i) => (
              <span key={i} className="text-xl font-bold text-text-secondary mix-blend-plus-lighter">{logo}</span>
            ))}
            {['Big Hersman', 'Armani Exchange', 'Pertamina', 'BEI / IDX', 'BCA', 'Digibank', 'Grab', 'Orangtua Group', 'Mayora', 'Teh Pucuk Harum', 'Pepsico', 'Hush Puppies', 'AEON Mall', 'Richs', 'Tigac', 'Blackjack'].map((logo, i) => (
              <span key={`dup-${i}`} className="text-xl font-bold text-text-secondary mix-blend-plus-lighter">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
