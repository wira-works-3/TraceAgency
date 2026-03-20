"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoShowcase() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Text Animation: Fades out as we scroll down
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  // Video Animation: Appears and expands
  // 0 - 0.2: Fades in
  // 0.2 - 0.8: Expands to full width/height
  const videoWidth = useTransform(scrollYProgress, [0.1, 0.8], ["40%", "100%"]);
  const videoHeight = useTransform(scrollYProgress, [0.1, 0.8], ["35%", "100%"]);
  const videoBorderRadius = useTransform(scrollYProgress, [0.1, 0.8], ["2rem", "0rem"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Layer Teks */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-0 px-4"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-[100px] font-bold text-foreground leading-[1.1] tracking-tight">
            Memorable <br />
            <span className="text-text-secondary font-medium">Experiences</span>
          </h2>
        </motion.div>

        {/* Layer Video */}
        <motion.div 
          className="relative z-10 overflow-hidden bg-[#111111] flex items-center justify-center shadow-2xl"
          style={{ 
            width: videoWidth, 
            height: videoHeight, 
            borderRadius: videoBorderRadius,
            opacity: videoOpacity
          }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            {/* Dummy video, can be replaced with client's real event video */}
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
          </video>
          
          {/* Overlay gradient untuk menyesuaikan dengan tema gelap */}
          <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
        </motion.div>

      </div>
    </section>
  );
}
