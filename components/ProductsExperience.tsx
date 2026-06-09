"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ProductCard from "@/components/ProductCard";
import TextReveal from "@/components/TextReveal";
import type { Category, Product } from "@/lib/data";
import { commonCopy } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProductsExperienceProps = {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
};

export default function ProductsExperience({
  products,
  initialCategory = "all",
}: ProductsExperienceProps) {
  const { language } = useLanguage();
  const copy = commonCopy[language];
  const [category, setCategory] = useState(initialCategory || "all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = [
    { slug: "all", name: language === "tr" ? "TÜMÜ" : "ALL" },
    { slug: "whey-protein", name: "PROTEIN" },
    { slug: "kreatin", name: "CREATINE" },
    { slug: "pre-workout", name: "PRE-WORKOUT" },
    { slug: "amino-asit", name: "AMINO" },
    { slug: "vitamin", name: "VITAMIN" },
  ];

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "all" || product.category === category;
      const searchMatch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, searchQuery, products]);

  return (
    <div className="bg-[#f8f6f2] px-6 pb-28 pt-28 text-[#1d1d1d] sm:px-12 min-h-screen select-none relative">
      <div className="absolute inset-0 technical-lines opacity-10 pointer-events-none" />

      {/* Screen 1: Header, Filters, Search Icon */}
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end border-b border-[#1d1d1d]/10 pb-8">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#b46a3c] mb-3">
              {language === "tr" ? "DİJİTAL SERGİ" : "DIGITAL EXHIBITION"}
            </p>
            <TextReveal
              as="h1"
              className="text-5xl sm:text-7xl font-display font-medium leading-[0.9] text-[#1d1d1d] uppercase tracking-tighter"
            >
              {language === "tr" ? "Raf değil, sahne." : "Not a shelf. A stage."}
            </TextReveal>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-8">
            <p className="max-w-xs text-[10px] font-mono tracking-widest text-[#6c665a] uppercase leading-relaxed text-left lg:text-right hidden sm:block">
              {language === "tr"
                ? "Her form tek bir performans ritmine bağlanır. Az metin, açık karar."
                : "Every form belongs to a performance rhythm. Less text, clear intent."}
            </p>

            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center h-10 w-10 rounded-full border border-[#1d1d1d]/10 bg-[#f8f6f2]/82 text-[#1d1d1d] hover:border-[#b46a3c]/60 cursor-none transition duration-300"
              data-cursor="explore"
              title={language === "tr" ? "Ara" : "Search"}
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Minimal Editorial Text Filters */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 items-center text-[10px] font-mono tracking-widest">
          <span className="text-[#1d1d1d]/40 uppercase">{language === "tr" ? "FİLTRELER:" : "FILTERS:"}</span>
          {filterOptions.map((opt) => (
            <button
              key={opt.slug}
              onClick={() => setCategory(opt.slug)}
              className={cn(
                "cursor-none transition duration-300 uppercase",
                category === opt.slug ? "text-[#b46a3c] font-bold" : "text-[#1d1d1d]/40 hover:text-[#1d1d1d]"
              )}
              data-cursor="explore"
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* Screen 2: Asymmetrical Exhibition Gallery */}
        <motion.div
          layout
          className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start"
        >
          {filtered.map((product, idx) => (
            <div
              key={product.id}
              className={cn(
                "w-full",
                idx % 4 === 1 ? "lg:pt-16" : "",
                idx % 4 === 3 ? "lg:pt-8" : ""
              )}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>

        {!filtered.length ? (
          <div className="mt-16 py-12 text-center font-mono text-xs uppercase tracking-widest text-[#6c665a] border border-[#1d1d1d]/10 rounded-[8px] bg-[#f3eee5]/50">
            {copy.emptyFilter}
          </div>
        ) : null}
      </div>

      {/* Fullscreen Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#f3eee5] p-6 sm:p-12"
          >
            <div className="absolute inset-0 fine-grid opacity-15 pointer-events-none" />

            {/* Overlay Header */}
            <div className="flex justify-between items-center w-full relative z-10">
              <span className="font-mono text-xs tracking-widest uppercase text-[#1d1d1d]">{language === "tr" ? "ARAMA" : "SEARCH"}</span>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="font-mono text-xs tracking-widest uppercase hover:text-[#b46a3c] transition cursor-none relative z-20"
                data-cursor="close"
              >
                {language === "tr" ? "KAPAT [X]" : "CLOSE [X]"}
              </button>
            </div>
            
            {/* Input area */}
            <div className="w-full max-w-4xl mx-auto my-auto flex flex-col items-start relative z-10">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "tr" ? "ARAMAK İÇİN YAZIN..." : "START TYPING TO SEARCH..."}
                className="w-full bg-transparent border-b border-[#1d1d1d]/20 py-4 font-display text-4xl sm:text-6xl font-light uppercase outline-none placeholder:text-[#1d1d1d]/15 text-[#1d1d1d] focus:border-[#b46a3c] transition duration-300"
              />
              {searchQuery && (
                <span className="mt-4 font-mono text-[9px] tracking-widest uppercase text-[#6c665a] transition duration-300">
                  {filtered.length} {language === "tr" ? "SONUÇ BULUNDU" : "RESULTS FOUND"}
                </span>
              )}
            </div>

            {/* Overlay Footer */}
            <div className="w-full text-center text-[9px] font-mono tracking-widest text-[#6c665a] relative z-10">
              NUTRIX PERFORMANCE SEARCH
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
