"use client";

import { motion } from "framer-motion";
import { Atom, BadgeCheck, Microscope, ShieldCheck } from "lucide-react";
import type { Ingredient } from "@/lib/data";

const icons = [Microscope, ShieldCheck, BadgeCheck, Atom];

type ScienceBlockProps = {
  ingredient: Ingredient;
  index?: number;
};

export default function ScienceBlock({ ingredient, index = 0 }: ScienceBlockProps) {
  const Icon = icons[index % icons.length];

  return (
    <motion.article
      className="relative overflow-hidden rounded-[8px] border border-slate-200 bg-white/85 p-5"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: index * 0.05, duration: 0.55 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="absolute right-4 top-4 font-mono text-xs text-slate-300">
        0{index + 1}
      </div>
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-orange-600">
        {ingredient.category}
      </p>
      <h3 className="mt-3 text-xl font-semibold leading-tight text-slate-950">
        {ingredient.name}
      </h3>
      <p className="mt-4 text-sm leading-6 text-slate-600">
        {ingredient.description}
      </p>
      <div className="mt-6 grid gap-2 border-t border-slate-200 pt-5 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-slate-500">Doz</span>
          <span className="font-mono text-orange-600">{ingredient.dose}</span>
        </div>
        <p className="text-slate-700">{ingredient.proofPoint}</p>
      </div>
    </motion.article>
  );
}
