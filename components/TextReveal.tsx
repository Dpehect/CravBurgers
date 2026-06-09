"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

export default function TextReveal({
  children,
  as = "h2",
  className,
  delay = 0,
}: TextRevealProps) {
  const Component = motion[as];
  const words = children.split(" ");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <Component className={cn("text-balance", className)} aria-label={children}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              aria-hidden="true"
              animate={ready ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              transition={{
                duration: 0.72,
                delay: delay + index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Component>
  );
}
