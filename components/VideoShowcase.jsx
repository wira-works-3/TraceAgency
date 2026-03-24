"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function VideoShowcase() {
  const categories = useMemo(
    () => [
      {
        key: "spg",
        label: "SPG",
        images: [
          "/SPG/SPG-1.JPG",
          "/SPG/SPG-2.JPG",
          "/SPG/SPG-3.jpg",
          "/SPG/SPG-4.JPG",
          "/SPG/SPG-5.JPG",
          "/SPG/SPG-6.JPG",
          "/SPG/SPG-7.JPG",
          "/SPG/SPG-8.JPG"
        ]
      },
      {
        key: "usher",
        label: "USHER",
        images: [
          "/Usher/Usher-1.jpg",
          "/Usher/Usher-2.JPG",
          "/Usher/Usher-3.JPG",
          "/Usher/Usher-4.JPG",
          "/Usher/Usher-5.JPG",
          "/Usher/Usher-6.JPG",
          "/Usher/Usher-7.jpg",
          "/Usher/Usher-8.JPG",
          "/Usher/Usher-9.jpg",
          "/Usher/Usher-10.jpg",
          "/Usher/Usher-11.jpg",
          "/Usher/Usher-12.jpg",
          "/Usher/Usher-13.JPG",
          "/Usher/Usher-14.jpg",
          "/Usher/Usher-15.jpg",
          "/Usher/Usher-16.jpg"
        ]
      },
      {
        key: "mc",
        label: "MC",
        images: ["/MC/MC-1.jpg"]
      },
      {
        key: "talent",
        label: "TALENT",
        images: ["/Talent/Talent-1.JPG"]
      }
    ],
    []
  );

  const items = useMemo(() => {
    return categories.flatMap((category) =>
      category.images.map((src, indexInCategory) => ({
        src,
        categoryKey: category.key,
        categoryLabel: category.label,
        indexInCategory
      }))
    );
  }, [categories]);

  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = items.length;
  const safeIndex = ((activeIndex % totalItems) + totalItems) % totalItems;
  const prevIndex = (safeIndex - 1 + totalItems) % totalItems;
  const nextIndex = (safeIndex + 1) % totalItems;
  const prev2Index = (safeIndex - 2 + totalItems) % totalItems;
  const next2Index = (safeIndex + 2) % totalItems;
  const prev3Index = (safeIndex - 3 + totalItems) % totalItems;
  const next3Index = (safeIndex + 3) % totalItems;

  const activeItem = items[safeIndex];
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];
  const prev2Item = items[prev2Index];
  const next2Item = items[next2Index];
  const prev3Item = items[prev3Index];
  const next3Item = items[next3Index];

  const activeCategoryKey = activeItem?.categoryKey ?? "spg";

  const goPrev = () => setActiveIndex((current) => (current - 1 + totalItems) % totalItems);
  const goNext = () => setActiveIndex((current) => (current + 1) % totalItems);

  const jumpToCategory = (categoryKey) => {
    const targetIndex = items.findIndex((item) => item.categoryKey === categoryKey);
    if (targetIndex >= 0) setActiveIndex(targetIndex);
  };

  return (
    <section className="py-28 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-[1400px]">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-[0.3em] uppercase text-text-secondary">GALLERY</div>
          <h2 className="mt-4 text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight uppercase">
            Our Visual Diary
          </h2>
          <p className="mt-4 text-sm md:text-base text-text-secondary max-w-2xl mx-auto">
            Lihat dokumentasi event melalui koleksi foto dan highlight dari tim kami.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => {
            const isActive = category.key === activeCategoryKey;
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => jumpToCategory(category.key)}
                className={
                  isActive
                    ? "h-10 px-5 rounded-full bg-foreground text-background text-sm font-bold"
                    : "h-10 px-5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                }
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <div className="relative h-[520px] sm:h-[560px] md:h-[640px] lg:h-[700px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`prev3-${prev3Item?.src}`}
                    initial={{ opacity: 0, x: "-175%", scale: 0.7 }}
                    animate={{ opacity: 0.14, x: "-175%", scale: 0.7 }}
                    exit={{ opacity: 0, x: "-195%", scale: 0.68 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[18%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                    style={{ zIndex: 1 }}
                    aria-hidden="true"
                  >
                    <img src={prev3Item?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/55" />
                  </motion.div>

                  <motion.div
                    key={`prev2-${prev2Item?.src}`}
                    initial={{ opacity: 0, x: "-138%", scale: 0.76 }}
                    animate={{ opacity: 0.22, x: "-138%", scale: 0.76 }}
                    exit={{ opacity: 0, x: "-158%", scale: 0.73 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[26%] lg:w-[20%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.55)]"
                    style={{ zIndex: 5 }}
                    aria-hidden="true"
                  >
                    <img src={prev2Item?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/45" />
                  </motion.div>

                  <motion.div
                    key={`prev-${prevItem?.src}`}
                    initial={{ opacity: 0, x: "-88%", scale: 0.84 }}
                    animate={{ opacity: 0.48, x: "-88%", scale: 0.84 }}
                    exit={{ opacity: 0, x: "-106%", scale: 0.82 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[54%] sm:w-[40%] md:w-[32%] lg:w-[26%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
                    style={{ zIndex: 10 }}
                    aria-hidden="true"
                  >
                    <img src={prevItem?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/35" />
                  </motion.div>

                  <motion.div
                    key={`next-${nextItem?.src}`}
                    initial={{ opacity: 0, x: "88%", scale: 0.84 }}
                    animate={{ opacity: 0.48, x: "88%", scale: 0.84 }}
                    exit={{ opacity: 0, x: "106%", scale: 0.82 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[54%] sm:w-[40%] md:w-[32%] lg:w-[26%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
                    style={{ zIndex: 20 }}
                    aria-hidden="true"
                  >
                    <img src={nextItem?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/35" />
                  </motion.div>

                  <motion.div
                    key={`next2-${next2Item?.src}`}
                    initial={{ opacity: 0, x: "138%", scale: 0.76 }}
                    animate={{ opacity: 0.22, x: "138%", scale: 0.76 }}
                    exit={{ opacity: 0, x: "158%", scale: 0.73 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[26%] lg:w-[20%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.55)]"
                    style={{ zIndex: 15 }}
                    aria-hidden="true"
                  >
                    <img src={next2Item?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/45" />
                  </motion.div>

                  <motion.div
                    key={`next3-${next3Item?.src}`}
                    initial={{ opacity: 0, x: "175%", scale: 0.7 }}
                    animate={{ opacity: 0.14, x: "175%", scale: 0.7 }}
                    exit={{ opacity: 0, x: "195%", scale: 0.68 }}
                    transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                    className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[18%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                    style={{ zIndex: 2 }}
                    aria-hidden="true"
                  >
                    <img src={next3Item?.src} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/55" />
                  </motion.div>

                  <motion.div
                    key={`active-${activeItem?.src}`}
                    initial={{ opacity: 0, scale: 0.94, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.94, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[78%] sm:w-[54%] md:w-[42%] lg:w-[36%] aspect-[3/4] rounded-3xl overflow-hidden border border-border shadow-[0_35px_90px_rgba(0,0,0,0.75)]"
                    style={{ zIndex: 30 }}
                  >
                    <img src={activeItem?.src} alt={`${activeItem?.categoryLabel} photo`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <div className="absolute left-6 bottom-6">
                      <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-secondary">
                        {activeItem?.categoryLabel}
                      </div>
                      <div className="mt-2 text-lg md:text-xl font-black text-foreground">
                        {activeItem?.categoryLabel} #{(activeItem?.indexInCategory ?? 0) + 1}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="h-12 w-12 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="h-12 w-12 rounded-full border border-border bg-background text-foreground hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
