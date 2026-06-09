"use client";

import { ArrowRight, ScanLine, Send, ShoppingBag } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow" | "shop" | "scan" | "send";
  className?: string;
  onClick?: () => void;
};

const iconMap = {
  arrow: ArrowRight,
  shop: ShoppingBag,
  scan: ScanLine,
  send: Send,
};

export default function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  icon = "arrow",
  className,
  onClick,
}: ButtonProps) {
  const Icon = iconMap[icon];

  return (
    <MagneticButton
      className={className}
      href={href}
      icon={<Icon className="h-4 w-4" />}
      onClick={onClick}
      type={type}
      variant={variant}
    >
      {children}
    </MagneticButton>
  );
}
