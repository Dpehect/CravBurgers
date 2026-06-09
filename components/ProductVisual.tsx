"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Product } from "@/lib/data";
import { cn } from "@/lib/utils";

type ProductVisualProps = {
  product: Pick<Product, "accent" | "categoryLabel" | "flavor" | "name" | "shape">;
  className?: string;
  compact?: boolean;
  showMeta?: boolean;
};

const accentClasses = {
  copper: {
    shell: "from-[#f8f2e8] via-[#eadbca] to-[#b46a3c]",
    label: "bg-[#b46a3c]",
    glow: "bg-[#b46a3c]/20",
  },
  olive: {
    shell: "from-[#f8f2e8] via-[#d9ddc7] to-[#596342]",
    label: "bg-[#596342]",
    glow: "bg-[#596342]/18",
  },
  graphite: {
    shell: "from-[#f8f2e8] via-[#d8d1c4] to-[#2f302b]",
    label: "bg-[#2f302b]",
    glow: "bg-[#2f302b]/14",
  },
};

export default function ProductVisual({
  product,
  className,
  compact = false,
  showMeta = true,
}: ProductVisualProps) {
  const accent = accentClasses[product.accent] ?? accentClasses.copper;
  const isBottle = product.shape === "bottle";
  const isPouch = product.shape === "pouch";
  const isStack = product.shape === "stack";

  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for normalized cursor coordinates from -0.5 to 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 18, mass: 0.45 };
  
  // 3D rotations
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), springConfig);

  // Shifting lighting gradient glow coordinates
  const lightX = useSpring(useTransform(x, [-0.5, 0.5], ["25%", "75%"]), springConfig);
  const lightY = useSpring(useTransform(y, [-0.5, 0.5], ["25%", "75%"]), springConfig);

  // Shadow translations
  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [-18, 18]), springConfig);
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [12, 28]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative mx-auto grid aspect-square w-full max-w-[340px] place-items-center overflow-hidden select-none group/visual",
        compact && "max-w-[260px]",
        className,
      )}
    >
      {/* Light Glow behind sculpture */}
      <motion.div
        style={{
          left: lightX,
          top: lightY,
          x: "-50%",
          y: "-50%",
        }}
        className={cn("absolute h-48 w-48 rounded-full blur-3xl pointer-events-none", accent.glow)}
      />

      {/* Decorative depth lines */}
      <div className="absolute inset-8 rounded-full border border-[#2f302b]/5 pointer-events-none" />
      <div className="absolute inset-16 rounded-full border border-[#2f302b]/3 pointer-events-none" />

      {/* Interactive 3D tilt & gentle idle float wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none z-10"
      >
        <div style={{ transform: "translateZ(30px)" }} className="relative w-full h-full flex items-center justify-center">
          {isStack ? (
            <div className="product-shadow relative h-[68%] w-[68%]">
              <div className="absolute bottom-4 left-0 h-[64%] w-[48%] rounded-[8px] bg-gradient-to-br from-[#fffaf2] via-[#eadbca] to-[#b46a3c] overflow-hidden">
                <div className="absolute inset-x-0 top-[42%] h-[28%] bg-[#b46a3c]" />
                {/* Wave Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/visual:opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay overflow-hidden">
                  <div className="absolute inset-0 bg-[#fffaf2]/10" />
                  <div className="absolute bottom-0 left-0 w-[200%] h-[75%] flex flex-col justify-end">
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white/35 animate-wave-slow">
                      <path d="M 0 50 C 50 20, 100 80, 150 30 C 180 15, 200 40, 200 50 L 200 100 L 0 100 Z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-2 h-[88%] w-[52%] rounded-[8px] bg-gradient-to-br from-[#fffaf2] via-[#ddd5c8] to-[#596342] overflow-hidden">
                <div className="absolute inset-x-0 top-[38%] h-[26%] bg-[#2f302b]" />
                {/* Wave Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover/visual:opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay overflow-hidden">
                  <div className="absolute inset-0 bg-[#fffaf2]/10" />
                  <div className="absolute bottom-0 left-0 w-[200%] h-[75%] flex flex-col justify-end">
                    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white/35 animate-wave-slow">
                      <path d="M 0 50 C 50 20, 100 80, 150 30 C 180 15, 200 40, 200 50 L 200 100 L 0 100 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "product-shadow relative overflow-hidden bg-gradient-to-br transition-all duration-300",
                accent.shell,
                isBottle && "h-[68%] w-[40%] rounded-b-[28px] rounded-t-[16px]",
                isPouch && "h-[68%] w-[52%] rounded-b-[30px] rounded-t-[8px] skew-x-[-1.5deg]",
                !isBottle && !isPouch && "h-[68%] w-[50%] rounded-[8px]",
              )}
            >
              <div className="absolute inset-x-0 top-0 h-[13%] bg-[#2f302b]" />
              <div className={cn("absolute inset-x-0 top-[39%] h-[30%]", accent.label)} />
              <div className="absolute left-[18%] right-[18%] top-[47%] h-2 rounded-full bg-[#fffaf2]/86" />
              <div className="absolute left-[18%] right-[30%] top-[56%] h-1.5 rounded-full bg-[#fffaf2]/66" />
              <div className="absolute bottom-6 left-5 right-5 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-[#24251f]/76">
                {product.shape === "jar" ? "CREATINE" : product.categoryLabel}
              </div>

              {/* Wave Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover/visual:opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay overflow-hidden">
                <div className="absolute inset-0 bg-[#fffaf2]/10" />
                <div className="absolute bottom-0 left-0 w-[200%] h-[75%] flex flex-col justify-end">
                  <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white/35 animate-wave-slow">
                    <path d="M 0 50 C 50 20, 100 80, 150 30 C 180 15, 200 40, 200 50 L 200 100 L 0 100 Z" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 w-[200%] h-[68%] flex flex-col justify-end">
                  <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full fill-current text-white/20 animate-wave-fast">
                    <path d="M 0 40 C 40 70, 90 20, 140 60 C 170 80, 200 50, 200 40 L 200 100 L 0 100 Z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Translating shadow below */}
      <motion.div
        style={{
          x: shadowX,
          y: shadowY,
        }}
        className="absolute bottom-8 left-1/2 h-6 w-36 -translate-x-1/2 rounded-full bg-[#24251f]/8 blur-md pointer-events-none"
      />

      {showMeta && (
        <div className="absolute right-4 top-4 rounded-full border border-[#2f302b]/10 bg-[#fffaf2]/72 px-3 py-1 text-[9px] font-mono uppercase tracking-widest font-semibold text-[#595245] backdrop-blur z-20">
          {product.flavor}
        </div>
      )}
    </div>
  );
}
