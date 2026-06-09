"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  icon,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.25 });
  const y = useSpring(useMotionValue(0), { stiffness: 170, damping: 18, mass: 0.25 });

  const classes = cn(
    "group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-semibold transition duration-300",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b46a3c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3eee5]",
    variant === "primary" && "bg-[#b46a3c] text-[#fffaf2] shadow-[0_18px_42px_rgba(180,106,60,0.24)]",
    variant === "secondary" && "border border-[#2f302b]/15 bg-[#fffaf2]/78 text-[#24251f] backdrop-blur hover:border-[#b46a3c]/55",
    variant === "ghost" && "text-[#24251f] hover:bg-[#fffaf2]/72",
    variant === "dark" && "bg-[#2f302b] text-[#fffaf2]",
    className,
  );

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.26);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.26);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <>
      <span className="absolute inset-0 translate-y-full bg-[#596342] transition duration-500 group-hover:translate-y-0" />
      <span className="relative">{children}</span>
      {icon ? <span className="relative transition group-hover:translate-x-0.5">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <motion.div
        className="inline-flex"
        style={{ x, y }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        data-cursor="magnetic"
      >
        <Link aria-label={ariaLabel} className={classes} href={href}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      className={classes}
      data-cursor="magnetic"
      onClick={onClick}
      onMouseLeave={reset}
      onMouseMove={handleMove}
      style={{ x, y }}
      type={type}
    >
      {content}
    </motion.button>
  );
}
