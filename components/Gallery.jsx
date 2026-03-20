"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring, AnimatePresence } from "framer-motion";

const galleryImages = [
  { id: 2, src: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop", label: "Brand Activation", desc: "Meningkatkan engagement produk sebesar 150%" },
  { id: 3, src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop", label: "Tech Conference", desc: "Dukungan MC & Usher untuk 2000+ peserta VIP" },
  { id: 4, src: "https://images.unsplash.com/photo-1523580494112-071d31199a21?q=80&w=800&auto=format&fit=crop", label: "Music Festival", desc: "Manajemen talent lapangan yang masif" },
  { id: 5, src: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop", label: "Fashion Show", desc: "Menyediakan 20+ model runway profesional" },
  { id: 6, src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop", label: "Corporate Event", desc: "Acara tahunan perusahaan berskala nasional" },
];

export default function Gallery() {
  const targetRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // 1. Horizontal Scroll Movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  
  // 2. Kinetic Velocity setup
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // 3. 3D Parallax Effects based on velocity
  // Reverse the direction of rotation to match your logic:
  // Scroll down (velocity > 0): right side forward, left side back (negative rotateY)
  // Scroll up (velocity < 0): left side forward, right side back (positive rotateY)
  const rotateY = useTransform(smoothVelocity, [-0.5, 0.5], [-35, 35]); 
  
  // Track mouse position for the floating cursor popup
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section id="gallery" ref={targetRef} className="relative h-[300vh] bg-background">
      {/* Sticky container that stays in place while scrolling */}
      {/* Increased perspective to make the 3D effect feel more like a subtle page turn */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-background" style={{ perspective: "1200px" }}>
        
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
          className="flex gap-16 pl-[10vw] mt-24 items-center h-[60vh] w-max"
        >
          {galleryImages.map((img) => {
            return (
              <motion.div 
                key={img.id}
                style={{ 
                  rotateY, 
                  transformStyle: "preserve-3d" 
                }}
                className={`relative shrink-0 cursor-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-background ${
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
                <motion.img
                  src={img.src}
                  alt={`Gallery image ${img.id}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 origin-center"
                  style={{ 
                    scale: 1.25, 
                    translateZ: "30px" 
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

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
