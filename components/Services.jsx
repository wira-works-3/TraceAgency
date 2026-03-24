"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: 0,
    title: "SPG & SPB",
    tags: ["Sales Promotion", "Brand Ambassador"],
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
    tags: ["Event Greeter", "VIP Handling"],
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
    tags: ["Corporate Event", "Concert"],
    description: "MC berpengalaman yang siap menghidupkan suasana dan mengendalikan jalannya acara. Fleksibel untuk berbagai jenis event dari formal hingga kasual.",
    bg: "bg-[#1a1a1a]",
    images: ["/MC/MC-1.jpg"]
  },
  {
    id: 3,
    title: "Model & Talent",
    tags: ["Photoshoot", "TVC", "Fashion"],
    description: "Model photoshoot, video komersial, dan talent berbakat untuk kebutuhan kampanye kreatif brand Anda. Wajah representatif untuk berbagai konsep visual.",
    bg: "bg-[#111111]",
    images: ["/Talent/Talent-1.JPG"]
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    // Set initial value
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeService]);

  const activeImages = services[activeService]?.images ?? [];
  const canNavigateImages = activeImages.length > 1;

  const activeImageSrc =
    activeImages[activeImageIndex] ??
    activeImages[0] ??
    "/traceagency.png";

  const imageObjectPositions = {
    "/SPG/SPG-5.JPG": "50% 20%",
    "/Usher/Usher-1.jpg": "50% 18%",
    "/Usher/Usher-2.JPG": "50% 18%",
    "/Usher/Usher-3.JPG": "50% 18%",
    "/MC/MC-1.jpg": "50% 22%",
    "/Talent/Talent-1.JPG": "50% 20%"
  };

  const activeImageObjectPosition =
    imageObjectPositions[activeImageSrc] ?? "50% 50%";

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
              OUR SOLUTIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-text-secondary leading-tight font-display">
              Transforming <br />
              <span className="text-foreground">events into experiences</span>
            </h2>
          </div>
          <Link 
            href="#kontak"
            className="px-6 py-3 rounded-full bg-foreground text-background text-sm font-semibold hover:bg-gray-200 transition-all"
          >
            Konsultasi Sekarang
          </Link>
        </div>

        {/* Accordion / Expandable Cards Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          {services.map((service, index) => {
            const isActive = activeService === index;
            
            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveService(index)}
                className={`${service.bg} border border-border rounded-[2rem] overflow-hidden cursor-pointer flex flex-col lg:flex-row relative group`}
                animate={{
                  flex: isActive ? (mounted && isDesktop ? 6 : 1) : 0.5,
                  opacity: 1
                }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                style={{ 
                  minWidth: isActive ? "auto" : (mounted && isDesktop ? "80px" : "auto"),
                  minHeight: isActive ? "auto" : (mounted && isDesktop ? "auto" : "80px")
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
                        style={{ objectPosition: activeImageObjectPosition }}
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
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={goNextImage}
                            className="h-10 px-4 rounded-full bg-black/50 border border-white/20 text-white text-sm font-semibold hover:bg-black/70 transition-colors flex items-center gap-2"
                            aria-label="Gambar berikutnya"
                          >
                            Next
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
                      
                      <button className="mt-auto w-fit px-8 py-4 rounded-full bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 group/btn">
                        Detail Layanan <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
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
