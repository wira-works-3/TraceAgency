"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/whatsapp";

const defaultServices = [
  {
    id: 0,
    title: "SPG & SPB",
    tags: ["Promosi penjualan", "Duta merek"],
    description: "Sales Promotion Girl & Boy profesional untuk meningkatkan brand awareness dan penjualan produk Anda. Kami melatih talent untuk memahami produk Anda sepenuhnya.",
    bg: "bg-[#111111]",
    images: [
      "/SPG/SPG-1.JPG",
      "/SPG/SPG-2.JPG",
      "/SPG/SPG-3.jpg",
      "/SPG/SPG-4.JPG",
      "/SPG/SPG-5.JPG"
    ]
  },
  {
    id: 1,
    title: "Usher",
    tags: ["Penyambut tamu", "Tamu VIP"],
    description: "Penyambutan tamu yang elegan dan profesional untuk memastikan event Anda berjalan lancar. First impression yang tak terlupakan untuk tamu VIP Anda.",
    bg: "bg-[#141414]",
    images: [
      "/Usher/Usher-1.jpg",
      "/Usher/Usher-2.JPG",
      "/Usher/Usher-3.JPG",
      "/Usher/Usher-4.JPG",
      "/Usher/Usher-5.JPG"
    ]
  },
  {
    id: 2,
    title: "Master of Ceremony",
    tags: ["Gathering", "Meeting"],
    description: "MC berpengalaman yang siap menghidupkan suasana dan mengendalikan jalannya acara. Fleksibel untuk berbagai jenis event dari formal hingga kasual.",
    bg: "bg-[#1a1a1a]",
    images: ["/MC/MC-1.jpg"]
  },
  {
    id: 3,
    title: "Model & Talent",
    tags: ["Pemotretan", "TVC", "Sosmed"],
    description: "Model photoshoot, video komersial, dan talent berbakat untuk kebutuhan kampanye kreatif brand Anda. Wajah representatif untuk berbagai konsep visual.",
    bg: "bg-[#111111]",
    images: ["/Talent/Talent-1.JPG"]
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMeasuredViewport, setHasMeasuredViewport] = useState(false);
  const hasPreviewOverrideRef = useRef(false);
  const [sectionCopy, setSectionCopy] = useState({
    pillLabel: "Solusi Kami",
    headingLine1: "Mengubah acara",
    headingLine2: "menjadi pengalaman berkesan",
    ctaLabel: "Konsultasi Sekarang",
    detailCtaLabel: "Detail Layanan",
  });
  const [servicesList, setServicesList] = useState(defaultServices);

  const applyRemoteServices = useCallback((next) => {
    if (!next || typeof next !== "object") return;
    const remoteServices = Array.isArray(next.services) ? next.services : null;

    setSectionCopy((current) => ({
      ...current,
      pillLabel: String(next.pillLabel ?? current.pillLabel),
      headingLine1: String(next.headingLine1 ?? current.headingLine1),
      headingLine2: String(next.headingLine2 ?? current.headingLine2),
      ctaLabel: String(next.ctaLabel ?? current.ctaLabel),
      detailCtaLabel: String(next.detailCtaLabel ?? current.detailCtaLabel),
    }));

    if (remoteServices) {
      const normalized = remoteServices.map((svc, idx) => {
        const fallback = defaultServices[idx] ?? defaultServices[0];
        return {
          id: fallback?.id ?? idx,
          bg: fallback?.bg ?? "bg-[#111111]",
          title: String(svc?.title ?? ""),
          tags: Array.isArray(svc?.tags) ? svc.tags.map((t) => String(t)).filter(Boolean) : [],
          description: String(svc?.description ?? ""),
          images: Array.isArray(svc?.images) ? svc.images.map((i) => String(i)).filter(Boolean) : [],
        };
      });

      setServicesList(normalized.length ? normalized : defaultServices);
      setActiveService((current) => {
        const nextIndex = Math.min(current, (normalized.length || defaultServices.length) - 1);
        return Math.max(0, nextIndex);
      });
      setActiveImageIndex(0);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setHasMeasuredViewport(true);
    };

    window.addEventListener("resize", handleResize);
    const t = window.setTimeout(handleResize, 0);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const t = window.setTimeout(() => {
      fetch("/api/public/services", { cache: "no-store", signal: controller.signal })
        .then((r) => r.json())
        .then((data) => {
          if (!data?.ok || !data.services) return;
          if (hasPreviewOverrideRef.current) return;
          applyRemoteServices({
            pillLabel: data.services.pillLabel,
            headingLine1: data.services.headingLine1,
            headingLine2: data.services.headingLine2,
            ctaLabel: data.services.ctaLabel,
            detailCtaLabel: data.services.detailCtaLabel,
            services: Array.isArray(data.services.services) ? data.services.services : [],
          });
        })
        .catch(() => {});
    }, 0);

    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [applyRemoteServices]);

  useEffect(() => {
    const handler = (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "TA_ADMIN_PREVIEW") return;
      const next = data.services;
      if (!next || typeof next !== "object") return;
      hasPreviewOverrideRef.current = true;
      applyRemoteServices(next);
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [applyRemoteServices]);

  useEffect(() => {
    const ch = typeof window !== "undefined" ? new BroadcastChannel("ta_admin") : null;
    if (!ch) return;
    const onMessage = (event) => {
      const data = event?.data;
      if (!data || data.type !== "services_saved") return;
      if (hasPreviewOverrideRef.current) return;
      fetch("/api/public/services", { cache: "no-store" })
        .then((r) => r.json())
        .then((payload) => {
          if (!payload?.ok || !payload.services) return;
          applyRemoteServices({
            pillLabel: payload.services.pillLabel,
            headingLine1: payload.services.headingLine1,
            headingLine2: payload.services.headingLine2,
            ctaLabel: payload.services.ctaLabel,
            detailCtaLabel: payload.services.detailCtaLabel,
            services: Array.isArray(payload.services.services) ? payload.services.services : [],
          });
        })
        .catch(() => {});
    };
    ch.addEventListener("message", onMessage);
    return () => {
      ch.removeEventListener("message", onMessage);
      ch.close();
    };
  }, [applyRemoteServices]);

  const activeImages = servicesList[activeService]?.images ?? [];
  const canNavigateImages = activeImages.length > 1;

  const activeImageSrc =
    activeImages[activeImageIndex] ??
    activeImages[0] ??
    "/traceagency.png";

  const imageObjectPositions = {
    "/SPG/SPG-1.JPG": "50% 58%",
    "/SPG/SPG-5.JPG": "50% 26%",
    "/Usher/Usher-1.jpg": "50% 18%",
    "/Usher/Usher-2.JPG": "50% 18%",
    "/Usher/Usher-3.JPG": "50% 18%",
    "/MC/MC-1.jpg": "50% 22%",
    "/Talent/Talent-1.JPG": "50% 20%"
  };

  const activeImageObjectPosition =
    imageObjectPositions[activeImageSrc] ?? "50% 50%";

  // Override khusus mobile untuk SPG-5 biar framing lebih "turun"
  const mobileAdjustedObjectPosition =
    !isDesktop && activeImageSrc === "/SPG/SPG-5.JPG"
      ? "50% 50%"
      : !isDesktop && activeImageSrc === "/SPG/SPG-1.JPG"
        ? "50% 100%"
        : activeImageObjectPosition;

  const goPrevImage = (event) => {
    event.stopPropagation();
    if (!canNavigateImages) return;
    setActiveImageIndex((currentIndex) =>
      (currentIndex - 1 + activeImages.length) % activeImages.length
    );
  };

  const goNextImage = (event) => {
    event.stopPropagation();
    if (!canNavigateImages) return;
    setActiveImageIndex((currentIndex) =>
      (currentIndex + 1) % activeImages.length
    );
  };

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-border text-text-secondary text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              {sectionCopy.pillLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-secondary leading-tight font-display">
              {sectionCopy.headingLine1} <br />
              <span className="text-foreground">{sectionCopy.headingLine2}</span>
            </h2>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-gray-200 transition-all inline-block text-center"
          >
            {sectionCopy.ctaLabel}
          </a>
        </div>

        {/* Accordion / Expandable Cards Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          {servicesList.map((service, index) => {
            const isActive = activeService === index;
            
            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => {
                  setActiveService(index);
                  setActiveImageIndex(0);
                }}
                className={`${service.bg} border border-border rounded-[2rem] overflow-hidden cursor-pointer flex flex-col lg:flex-row relative group`}
                animate={{
                  flex: isActive ? (hasMeasuredViewport && isDesktop ? 6 : 1) : 0.5,
                  opacity: 1
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                style={{ 
                  minWidth: isActive ? "auto" : (hasMeasuredViewport && isDesktop ? "80px" : "auto"),
                  minHeight: isActive ? "auto" : (hasMeasuredViewport && isDesktop ? "auto" : "80px")
                }}
              >
                {/* 
                  1. Active State (Expanded) 
                */}
                {isActive ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex flex-col lg:flex-row w-full h-full p-2 gap-6"
                  >
                    {/* Left: 16:9 Image */}
                    <div className="w-full lg:w-1/2 h-[320px] md:h-[280px] lg:h-full rounded-3xl overflow-hidden relative">
                        <img 
                        src={activeImageSrc} 
                        alt={service.title} 
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: mobileAdjustedObjectPosition,
                          transform: activeImageSrc === "/SPG/SPG-1.JPG" ? "scale(1.03)" : undefined,
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                      {canNavigateImages ? (
                        <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-4">
                          <button
                            type="button"
                            onClick={goPrevImage}
                            className="h-10 px-4 rounded-full bg-black/50 border border-white/20 text-white text-sm font-semibold hover:bg-black/70 transition-colors flex items-center gap-2"
                            aria-label="Gambar sebelumnya"
                          >
                            <ChevronLeft size={18} />
                            Sebelumnya
                          </button>
                          <button
                            type="button"
                            onClick={goNextImage}
                            className="h-10 px-4 rounded-full bg-black/50 border border-white/20 text-white text-sm font-semibold hover:bg-black/70 transition-colors flex items-center gap-2"
                            aria-label="Gambar berikutnya"
                          >
                            Berikutnya
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      ) : null}
                    </div>

                    {/* Right: Content */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-10">
                      <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">{service.title}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.tags.map((tag, i) => (
                          <span key={i} className="px-4 py-1.5 rounded-full border border-border text-xs text-text-secondary uppercase tracking-wider font-semibold">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <p className="text-text-secondary text-base leading-relaxed mb-10">
                        {service.description}
                      </p>
                      
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-auto w-fit px-8 py-4 rounded-full bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 group/btn"
                      >
                        {sectionCopy.detailCtaLabel} <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* 
                    2. Inactive State (Collapsed / Vertical Text) 
                  */
                  <div className="w-full h-full flex items-center justify-center relative p-6 lg:p-0">
                    <div className="hidden lg:flex items-center justify-center h-full w-full">
                      {/* Vertical Text for Desktop */}
                      <span className="whitespace-nowrap -rotate-90 text-xl font-bold text-text-secondary tracking-widest uppercase group-hover:text-foreground transition-colors">
                        {service.title}
                      </span>
                    </div>
                    
                    <div className="flex lg:hidden items-center justify-between w-full">
                      {/* Horizontal Text for Mobile */}
                      <span className="text-lg font-bold text-text-secondary uppercase tracking-widest group-hover:text-foreground transition-colors">
                        {service.title}
                      </span>
                      <ArrowRight size={20} className="text-text-secondary" />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
