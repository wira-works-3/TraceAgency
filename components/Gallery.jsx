"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const galleryImages = [
  { id: 1, src: "/Usher/Usher-12.jpg", label: "Usher", desc: "Handling tamu dan VIP dengan profesional" },
  { id: 2, src: "/SPG/SPG-7.JPG", label: "SPG & SPB", desc: "Brand activation dan sales support" },
  { id: 3, src: "/Usher/Usher-1.jpg", label: "Usher", desc: "First impression yang elegan" },
  { id: 4, src: "/Usher/Usher-6.JPG", label: "Usher", desc: "On-ground event support" },
  { id: 5, src: "/Usher/Usher-14.jpg", label: "Usher", desc: "Event flow yang rapi dan terarah" },
];

export default function Gallery() {
  const targetRef = useRef(null);
  const scrollerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [scrollAreaHeight, setScrollAreaHeight] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

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
    const updateLayoutMetrics = () => {
      setIsDesktop(window.innerWidth >= 1024);

      const viewportWidth = targetRef.current?.clientWidth ?? window.innerWidth;
      const viewportHeight = window.innerHeight;
      const fullWidth = scrollerRef.current?.scrollWidth ?? 0;
      const nextMaxTranslateX = Math.max(0, fullWidth - viewportWidth);
      setMaxTranslateX(nextMaxTranslateX);

      const isLg = window.innerWidth >= 1024;
      const scrollFactor = isLg ? 0.85 : 0.9;
      const minHeight = viewportHeight * (isLg ? 2.5 : 2.3);
      const nextScrollAreaHeight = Math.max(
        minHeight,
        viewportHeight + nextMaxTranslateX * scrollFactor
      );
      setScrollAreaHeight(nextScrollAreaHeight);
    };

    updateLayoutMetrics();
    window.addEventListener("resize", updateLayoutMetrics);
    return () => window.removeEventListener("resize", updateLayoutMetrics);
  }, []);

  return (
    <section
      id="gallery"
      ref={targetRef}
      className="relative min-h-[220vh] bg-background"
      style={scrollAreaHeight ? { height: `${scrollAreaHeight}px` } : undefined}
    >
      {/* Sticky container that stays in place while scrolling */}
      {/* Increased perspective to make the 3D effect feel more like a subtle page turn */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-background">
        
        {/* Header / Title */}
        <div className="absolute top-24 left-0 w-full px-6 lg:px-12 flex justify-between items-start z-10 pointer-events-none">
          <div className="text-sm text-text-secondary uppercase tracking-widest font-medium hidden md:block">
            Projects, Highlights, Events
          </div>
          <div className="text-center w-full md:w-auto">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground uppercase leading-none tracking-tighter">
              How we helped
              <br />
              others succeed
            </h2>
          </div>
          <div className="hidden md:block w-32">
            {/* Empty space to balance the header flexbox after removing Trace Agency badge */}
          </div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <motion.div 
          style={{ x }} 
          ref={scrollerRef}
          className="flex gap-16 pl-[10vw] pr-[10vw] lg:pr-[14vw] mt-24 items-center h-[60vh] w-max"
        >
          {galleryImages.map((img) => {
            return (
              <motion.div 
                key={img.id}
                className={`relative shrink-0 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-background ${
                  img.id % 2 === 0 
                    ? 'w-[350px] md:w-[450px] h-[450px] md:h-[600px]' 
                    : 'w-[300px] md:w-[350px] h-[350px] md:h-[450px]'
                }`}
                onMouseEnter={() => setHoveredProject(img)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* 
                  The image is pushed forward (translateZ) inside the 3D space of its container.
                  When the container rotates, this creates a strong 3D parallax effect, 
                  making the right/left edges swing significantly forward/backward.
                */}
                <img
                  src={img.src}
                  alt={`Gallery image ${img.id}`}
                  className="w-full h-full object-cover transition-all duration-700"
                />
              </motion.div>
            );
          })}
        </motion.div>

        <div className="absolute inset-x-0 bottom-16 flex items-center justify-center z-20 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsViewMoreOpen(true)}
            className="px-8 py-4 rounded-full bg-foreground text-background text-sm font-bold hover:bg-gray-200 transition-colors"
          >
            View More
          </button>
        </div>

        <AnimatePresence>
          {isViewMoreOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
              onClick={() => setIsViewMoreOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: "spring", damping: 22, stiffness: 260 }}
                className="w-full max-w-5xl bg-background border border-border rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-text-secondary font-semibold">Gallery</div>
                    <div className="text-xl font-black text-foreground uppercase">Projects, Highlights, Events</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsViewMoreOpen(false)}
                    className="h-10 px-5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-foreground hover:text-background transition-colors"
                  >
                    Close
                  </button>
                </div>
                <div className="p-6 max-h-[75vh] overflow-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((img) => (
                      <div key={`modal-${img.id}`} className="rounded-2xl overflow-hidden border border-border bg-background">
                        <img src={img.src} alt={img.label} className="w-full h-56 object-cover" />
                        <div className="p-4">
                          <div className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">{img.label}</div>
                          <div className="text-sm font-semibold text-foreground mt-1">{img.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Floating Cursor Popup */}
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
              <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary block mb-1">PROJECT</span>
              <h4 className="text-lg font-bold text-foreground mb-1 leading-tight">{hoveredProject.label}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{hoveredProject.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
