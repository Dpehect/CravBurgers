"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Dumbbell,
  Flame,
  Layers,
  Moon,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  Activity,
  Dumbbell,
  Flame,
  Layers,
  Moon,
  Zap,
};

type CategoryCardProps = {
  category: Category;
  index?: number;
};

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const Icon = icons[category.icon] ?? Dumbbell;

  return (
    <motion.article
      className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white/90 p-5"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link className="absolute inset-0 z-20" href={`/shop?category=${category.slug}`}>
        <span className="sr-only">{category.name} ürünlerini görüntüle</span>
      </Link>
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(249,115,22,0.14),transparent_42%,rgba(245,158,11,0.08))] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-full min-h-60 flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/25 bg-orange-500/10 text-orange-600">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
        </div>
        <div className="relative my-4 h-28">
          <Image
            alt={`${category.name} supplement kategorisi`}
            className="object-contain opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
            fill
            sizes="240px"
            src={category.image}
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-950 sm:text-2xl">
            {category.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {category.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
