"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export default function MotionWrapper({
  children,
  className,
  delay = 0,
  y = 28,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
