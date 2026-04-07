"use client";

import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { galleryData } from "@/data/gallery";

// Kontrol utama panjang scroll gallery.
// Turunkan angka-angka ini jika ingin scroll makin pendek.
const SCROLL_SETTINGS = {
  desktop: {
    endPadding: 6,
    scrollFactor: 0.62,
    minHeightVh: 1.45,
  },
  mobile: {
    endPadding: -14,
    scrollFactor: 0.38,
    minHeightVh: 1.05,
  },
};

/**
 * Di mobile (di bawah breakpoint lg), geser titik fokus object-cover ke bawah dalam kotak (bukan memindahkan kotak).
 * Sesuaikan persen vertikal jika masih kurang pas per foto.
 */
const GALLERY_MOBILE_OBJECT_POSITION_CLASS = {
  1: "max-lg:object-[center_0%]",
  3: "max-lg:object-[center_0%]",
  6: "max-lg:object-[center_0%]",
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export default function Gallery() {
  const targetRef = useRef(null);
  const scrollerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [galleryHeader, setGalleryHeader] = useState({
    sideLabel: "Proyek, sorotan, acara",
    headingLine1: "Partner Event",
    headingLine2: "Profesional dan Terpercaya",
    items: 6,
  });
  const [itemsData, setItemsData] = useState(galleryData);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, (progress) => -progress * maxTranslateX);
  
  // Track mouse position for the floating cursor popup
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "TA_ADMIN_PREVIEW") return;
      const next = data.gallery;
      if (!next || typeof next !== "object") return;

      setGalleryHeader((current) => ({
        ...current,
        sideLabel: String(next.sideLabel ?? current.sideLabel),
        headingLine1: String(next.headingLine1 ?? current.headingLine1),
        headingLine2: String(next.headingLine2 ?? current.headingLine2),
        items: Number.isFinite(Number(next.items)) ? Number(next.items) : current.items,
      }));

      if (Array.isArray(next.itemsData)) {
        const normalized = next.itemsData.map((it, idx) => ({
          id: Number(it?.id ?? idx + 1),
          src: String(it?.src ?? ""),
          srcDesktop: it?.srcDesktop ? String(it.srcDesktop) : undefined,
          srcMobile: it?.srcMobile ? String(it.srcMobile) : undefined,
          label: String(it?.label ?? ""),
          desc: String(it?.desc ?? ""),
        }));
        setItemsData(normalized.length ? normalized : galleryData);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const displayedItems = itemsData.slice(0, clamp(Number(galleryHeader.items || 0), 0, itemsData.length));

  const updateLayoutMetrics = useCallback(() => {
    setIsDesktop(window.innerWidth >= 1024);

    const viewportWidth = targetRef.current?.clientWidth ?? window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollerEl = scrollerRef.current;
    const fullWidth =
      scrollerEl?.scrollWidth ||
      scrollerEl?.getBoundingClientRect?.().width ||
      0;
    const isLg = window.innerWidth >= 1024;
    const settings = isLg ? SCROLL_SETTINGS.desktop : SCROLL_SETTINGS.mobile;

    const nextMaxTranslateX = Math.max(0, fullWidth - viewportWidth + settings.endPadding);
    setMaxTranslateX(nextMaxTranslateX);

    if (nextMaxTranslateX < 2) {
      setScrollAreaHeight(viewportHeight);
      return;
    }

    const minHeight = viewportHeight * settings.minHeightVh;
    const nextScrollAreaHeight = Math.max(
      minHeight,
      viewportHeight + nextMaxTranslateX * settings.scrollFactor
    );
    setScrollAreaHeight(nextScrollAreaHeight);
  }, []);

  useLayoutEffect(() => {
    const targetEl = targetRef.current;
    const scrollerEl = scrollerRef.current;
    if (!targetEl || !scrollerEl) return;

    let rafId = 0;
    const schedule = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateLayoutMetrics);
    };

    schedule();

    const onResize = () => schedule();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => schedule());
    ro.observe(targetEl);
    ro.observe(scrollerEl);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [displayedItems.length, updateLayoutMetrics]);

  return (
    <section
      id="gallery"
      ref={targetRef}
      className="relative bg-background"
      style={scrollAreaHeight ? { height: `${scrollAreaHeight}px` } : undefined}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-background">
        
        {/* 1. HEADER / TITLE */}
        {/* HAPUS 'absolute top-24'. Gunakan margin-bottom (mb-8/mb-12) agar memberi jarak ke gambar */}
        <div className="w-full px-6 lg:px-12 flex justify-between items-start z-10 pointer-events-none shrink-0 mb-8 lg:mb-12">
          <div className="text-sm text-text-secondary uppercase tracking-widest font-medium hidden md:block w-32">
            {galleryHeader.sideLabel}
          </div>
          <div className="text-center w-full md:w-auto">
            {/* Ukuran font sedikit disesuaikan agar proporsional saat layout distack */}
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground uppercase leading-none tracking-tighter">
              {galleryHeader.headingLine1}
              <br />
              {galleryHeader.headingLine2}
            </h2>
          </div>
          <div className="hidden md:block w-32">
            {/* Empty space untuk balance layout */}
          </div>
        </div>

        {/* 2. HORIZONTAL SCROLLING GALLERY */}
        {/* HAPUS 'mt-24'. Biarkan Flexbox yang mengatur posisinya tepat di bawah header */}
        <motion.div 
          style={{ x }} 
          ref={scrollerRef}
          className="flex gap-16 pl-[10vw] pr-[10vw] lg:pr-[14vw] items-center w-max"
        >
          {displayedItems.map((img) => {
            const srcDesktop = img.srcDesktop ?? img.src;
            const srcMobile = img.srcMobile ?? img.src;
            return (
              <motion.div 
                key={img.id}
                // Ubah tinggi (height) menggunakan 'vh' dan 'max-h' agar gambar mengecil otomatis jika layar laptop pendek, 
                // sehingga tidak akan menabrak teks di atasnya.
                className={`relative shrink-0 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-background ${
                  img.id % 2 === 0 
                    ? 'w-[350px] md:w-[450px] h-[45vh] md:h-[55vh] max-h-[600px]' 
                    : 'w-[300px] md:w-[350px] h-[35vh] md:h-[45vh] max-h-[450px]'
                }`}
                onMouseEnter={() => setHoveredProject(img)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <picture className="block h-full w-full">
                  <source media="(min-width: 1024px)" srcSet={srcDesktop} />
                  <img
                    src={srcMobile}
                    alt={`Galeri ${img.label}`}
                    className={`h-full w-full object-cover transition-all duration-700 ${
                      GALLERY_MOBILE_OBJECT_POSITION_CLASS[img.id] ?? ""
                    }`}
                  />
                </picture>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating Cursor Popup (Tetap sama) */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed pointer-events-none z-50 bg-background/95 backdrop-blur-md border border-border p-4 rounded-xl shadow-2xl max-w-[250px]"
              style={{
                left: mousePosition.x + 20,
                top: mousePosition.y + 20,
                display: isDesktop ? "block" : "none",
              }}
            >
              <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary block mb-1">Proyek</span>
              <h4 className="text-lg font-bold text-foreground mb-1 leading-tight">{hoveredProject.label}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{hoveredProject.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
