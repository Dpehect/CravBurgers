"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import ProductVisual from "@/components/ProductVisual";
import type { Product } from "@/lib/data";
import { formatPriceForLanguage, localizeProduct } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  compact?: boolean;
};

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { language } = useLanguage();
  const display = localizeProduct(product, language);

  return (
    <motion.article
      className={cn(
        "relative flex flex-col justify-between select-none w-full bg-[#fffaf2] border-4 border-[#4c0016] rounded-2xl p-4 shadow-[6px_6px_0px_#4c0016] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#4c0016] transition-all duration-200",
        compact ? "min-h-[360px]" : "min-h-[460px]"
      )}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Product visual area */}
      <Link
        href={`/urunler/${product.slug}`}
        className="relative block w-full group overflow-hidden rounded-xl bg-[#f5e3cd]/40 border-2 border-[#4c0016]/10 p-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex items-center justify-center"
        >
          <ProductVisual compact={compact} product={display} showMeta={false} />
        </motion.div>
      </Link>

      {/* Meta texts info */}
      <div className="mt-4 flex flex-col items-stretch">
        <Link
          href={`/urunler/${product.slug}`}
          className="text-[#4c0016] hover:text-[#f91814] transition duration-300"
        >
          <h3 className="text-2xl font-display leading-none uppercase tracking-wide">
            {display.name}
          </h3>
        </Link>
        
        {/* Subtitle / Flavor */}
        <p className="mt-1 text-[12px] font-sans tracking-widest text-[#4c0016]/70 uppercase">
          {display.benefits[0] ?? display.flavor}
        </p>

        {/* Bottom row: Price and CTA Order button */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#4c0016]/10 pt-3">
          <p className="text-xl font-sans font-bold text-[#4c0016] uppercase leading-none">
            {formatPriceForLanguage(display.price, language)}
          </p>

          <Link
            href={`/urunler/${product.slug}`}
            className="bg-[#f91814] hover:bg-black text-[#f5e3cd] border-2 border-[#4c0016] rounded-full px-4 py-1.5 text-xs font-sans font-bold uppercase tracking-wider transition-all duration-300 text-center"
          >
            {language === "tr" ? "İNCELE" : "VIEW"}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
