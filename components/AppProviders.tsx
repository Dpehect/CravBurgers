"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageProvider, { useLanguage } from "@/components/LanguageProvider";

function CursorAndLoader() {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loaderText, setLoaderText] = useState("PREPARING ARTISAN KITCHEN...");

  // Progress animation and loader sequence
  useEffect(() => {
    let progressVal = 0;
    const interval = window.setInterval(() => {
      progressVal += 4;
      if (progressVal <= 100) {
        setProgress(progressVal);
      } else {
        window.clearInterval(interval);
        window.setTimeout(() => setLoading(false), 200);
      }
    }, 60);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#4c0016] select-none overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Layered sliding color slides for premium intro */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: progress > 60 ? 0 : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#EF6F2E] z-10" 
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: progress > 85 ? 0 : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#f91814] z-20" 
          />

          {/* Centered Burger Boy sticker */}
          <div className="relative z-30 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="w-[180px] h-[180px] max-md:w-[140px] max-md:h-[140px]"
            >
              <img
                src="/img/burger-boy.png"
                alt="Spinning CRAV logo"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </motion.div>
            
            {/* Status text */}
            <div className="mt-8 font-sans text-2xl tracking-widest text-[#f5e3cd] text-center px-4">
              PREPARING ARTISAN KITCHEN...
            </div>
          </div>

          {/* Bottom loading bar */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-white/10 z-30">
            <div 
              className="h-full bg-[#f4a804] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return (
    <LanguageProvider>
      <CursorAndLoader />
      {children}
    </LanguageProvider>
  );
}

