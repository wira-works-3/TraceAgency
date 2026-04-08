"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  return (
    <motion.p
      className="text-[clamp(1.5rem,3.1vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-foreground mb-8 whitespace-pre-wrap break-words"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {String(text ?? "")}
    </motion.p>
  );
}

export default function About() {
  const pathname = usePathname();
  const hasPreviewOverrideRef = useRef(false);
  const [aboutText, setAboutText] = useState(
    "Trace agency menyediakan talent event seperti SPG/SPB, Usher, dan MC. Tim kami sudah berpengalaman dan profesional sehingga kami siap membantu dan membuat event menjadi lebih hidup dan berkesan."
  );
  const [highlights, setHighlights] = useState({
    pillLabel: "Sorotan",
    headingLine1: "Angka di balik",
    headingLine2: "kesuksesan",
    items: [
      { value: 300, suffix: "+", label: "Kolaborasi Brand" },
      { value: 500, suffix: "+", label: "Project Selesai" },
      { value: 8000, suffix: "+", label: "Talent Profesional" },
      { value: 98, suffix: "%", label: "Client Retention Rate" },
    ],
  });

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

  useEffect(() => {
    const handler = (event) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (!data || data.type !== "TA_ADMIN_PREVIEW") return;
      const nextAbout = data.about;
      if (!nextAbout || typeof nextAbout !== "object") return;
      if ("description" in nextAbout) {
        hasPreviewOverrideRef.current = true;
        setAboutText(String(nextAbout.description ?? ""));
      }

      const nextHighlights = nextAbout.highlights;
      if (nextHighlights && typeof nextHighlights === "object") {
        hasPreviewOverrideRef.current = true;
        const nextItemsRaw = Array.isArray(nextHighlights.items) ? nextHighlights.items : null;
        const nextItems = nextItemsRaw
          ? nextItemsRaw
              .map((item) => {
                const value = Number(item?.value);
                return {
                  value: Number.isFinite(value) ? value : 0,
                  suffix: String(item?.suffix ?? ""),
                  label: String(item?.label ?? ""),
                };
              })
              .filter((item) => item.value >= 0)
          : null;

        setHighlights((current) => ({
          ...current,
          pillLabel: String(nextHighlights.pillLabel ?? current.pillLabel),
          headingLine1: String(nextHighlights.headingLine1 ?? current.headingLine1),
          headingLine2: String(nextHighlights.headingLine2 ?? current.headingLine2),
          items: nextItems ?? current.items,
        }));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const fetchAboutFromDatabase = useCallback(
    async (signal) => {
      try {
        const res = await fetch("/api/public/about", { cache: "no-store", signal });
        const data = await res.json().catch(() => null);
        if (!data?.ok || !data.about) return;
        if (hasPreviewOverrideRef.current) return;

        const description = String(data.about.description ?? "");
        if (description) setAboutText(description);

        const nextHighlights = data.about.highlights;
        if (nextHighlights && typeof nextHighlights === "object") {
          const nextItemsRaw = Array.isArray(nextHighlights.items) ? nextHighlights.items : null;
          const nextItems = nextItemsRaw
            ? nextItemsRaw
                .map((item) => {
                  const value = Number(item?.value);
                  return {
                    value: Number.isFinite(value) ? value : 0,
                    suffix: String(item?.suffix ?? ""),
                    label: String(item?.label ?? ""),
                  };
                })
                .filter((item) => item.value >= 0)
            : null;

          setHighlights((current) => ({
            ...current,
            pillLabel: String(nextHighlights.pillLabel ?? current.pillLabel),
            headingLine1: String(nextHighlights.headingLine1 ?? current.headingLine1),
            headingLine2: String(nextHighlights.headingLine2 ?? current.headingLine2),
            items: nextItems ?? current.items,
          }));
        }
      } catch {
        return;
      }
    },
    [setAboutText, setHighlights]
  );

  useEffect(() => {
    const controller = new AbortController();
    const t = window.setTimeout(() => {
      fetchAboutFromDatabase(controller.signal);
    }, 0);
    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [fetchAboutFromDatabase]);

  useEffect(() => {
    const ch = typeof window !== "undefined" ? new BroadcastChannel("ta_admin") : null;
    if (!ch) return;
    const onMessage = (event) => {
      const data = event?.data;
      if (!data || data.type !== "about_saved") return;
      if (hasPreviewOverrideRef.current) return;
      fetchAboutFromDatabase();
    };
    ch.addEventListener("message", onMessage);
    return () => {
      ch.removeEventListener("message", onMessage);
      ch.close();
    };
  }, [fetchAboutFromDatabase]);

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
          
          <ScrollRevealText text={aboutText} />
          
          <div className="flex gap-4 mt-12 flex-wrap">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-foreground text-background text-base font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              Hubungi Kami
            </a>
            <Link
              href="/#services"
              onClick={handleLayananClick}
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
                {highlights.pillLabel}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {highlights.headingLine1}{" "}
                <span className="text-text-secondary">{highlights.headingLine2}</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-8">
            {(Array.isArray(highlights.items) ? highlights.items : []).map((item, idx) => {
              const dotClass =
                idx === 0
                  ? "bg-white"
                  : idx === 1
                    ? "bg-gray-400"
                    : idx === 2
                      ? "bg-gray-600"
                      : "bg-gray-300";

              const withBorder = idx < (highlights.items?.length ?? 0) - 1;
              const wrapperClass = withBorder
                ? "border-b border-border/50 pb-8 md:border-none md:pb-0"
                : "";

              return (
                <div key={`${item.label}-${idx}`} className={wrapperClass}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${dotClass}`}></div>
                    <h4 className="text-6xl md:text-8xl font-bold text-foreground">
                      <AnimatedCounter
                        from={0}
                        to={Number(item.value) || 0}
                        duration={2.5}
                        suffix={String(item.suffix ?? "")}
                      />
                    </h4>
                  </div>
                  <p className="text-xl text-text-secondary pl-6">{item.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
