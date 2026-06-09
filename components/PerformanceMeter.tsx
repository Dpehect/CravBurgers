"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PerformanceMeterProps = {
  label: string;
  value: number;
  detail?: string;
  tone?: "orange" | "soft";
};

export default function PerformanceMeter({
  label,
  value,
  detail,
  tone = "orange",
}: PerformanceMeterProps) {
  return (
    <div className="rounded-[8px] border border-slate-200 bg-white/85 p-4">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
        </div>
        <span
          className={cn(
            "font-mono text-2xl font-bold",
            tone === "orange" ? "text-orange-500" : "text-orange-400",
          )}
        >
          {value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className={cn(
            "h-full rounded-full",
            tone === "orange" ? "bg-orange-500" : "bg-orange-400",
          )}
          initial={{ width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          whileInView={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
