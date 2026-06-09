"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/data";

type TestimonialCardProps = {
  testimonial: Testimonial;
  index?: number;
};

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.article
      className="rounded-[8px] border border-slate-200 bg-white/85 p-6"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="font-mono text-sm text-orange-500">{testimonial.metric}</span>
        <span className="text-3xl font-semibold leading-none text-slate-200">
          &ldquo;
        </span>
      </div>
      <p className="text-lg leading-8 text-slate-900">{testimonial.quote}</p>
      <div className="mt-8 border-t border-slate-200 pt-5">
        <p className="font-bold text-slate-950">{testimonial.name}</p>
        <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
      </div>
    </motion.article>
  );
}
