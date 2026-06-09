"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/data";

type BlogCardProps = {
  post: BlogPost;
  index?: number;
  featured?: boolean;
};

export default function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white/90"
      initial={{ opacity: 0, y: 24 }}
      transition={{ delay: index * 0.06, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <Link className="absolute inset-0 z-20" href={`/blog/${post.slug}`}>
        <span className="sr-only">{post.title} yazısını oku</span>
      </Link>
      <div className={featured ? "relative h-80" : "relative h-56"}>
        <Image
          alt={post.title}
          className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          fill
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          src={post.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.9),transparent_72%)]" />
      </div>
      <div className="relative z-10 p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-orange-600">
            {post.category}
          </span>
          <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold leading-snug text-slate-950 sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-slate-600">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
          <span>{post.author}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </motion.article>
  );
}
