"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type StickerProps = {
  imageSrc: string;
  alt: string;
  width: string;
  className?: string;
  rotate?: string;
  peelDirection?: string;
};

export default function Sticker({
  imageSrc,
  alt,
  width,
  className = "",
  rotate = "30deg",
  peelDirection = "0deg",
}: StickerProps) {
  const [hovered, setHovered] = useState(false);

  // Spring physics for smooth sticker peeling response
  const peelSpring = useSpring(1, { stiffness: 90, damping: 12, mass: 0.5 });

  useEffect(() => {
    peelSpring.set(hovered ? 0.36 : 1);
  }, [hovered, peelSpring]);

  const [peelAmount, setPeelAmount] = useState(1);
  
  useEffect(() => {
    return peelSpring.on("change", (latest) => {
      setPeelAmount(latest);
    });
  }, [peelSpring]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`sticker-container select-none ${className}`}
      style={{
        "--sticker-rotate": rotate,
        "--sticker-width": width,
        "--peel-direction": peelDirection,
        "--peel-amount": peelAmount,
        "--sticker-start": "-20%",
        "--sticker-end": "120%",
      } as React.CSSProperties}
    >
      <div className="sticker-main">
        <div className="sticker-lighting">
          <img
            src={imageSrc}
            alt={alt}
            className="sticker-image"
            draggable={false}
          />
        </div>
      </div>
      <div className="flap">
        <div className="flap-lighting">
          <img
            src={imageSrc}
            alt={alt}
            className="flap-image"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
