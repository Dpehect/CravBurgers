"use client";

import { motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import MagneticButton from "@/components/MagneticButton";
import ProductCard from "@/components/ProductCard";
import ProductVisual from "@/components/ProductVisual";
import TextReveal from "@/components/TextReveal";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/lib/data";
import { commonCopy, formatPriceForLanguage, localizeProduct, localizeProducts } from "@/lib/i18n";

type ProductDetailExperienceProps = {
  product: Product;
  relatedProducts: Product[];
};

export default function ProductDetailExperience({
  product,
  relatedProducts,
}: ProductDetailExperienceProps) {
  const { language } = useLanguage();
  const display = useMemo(() => localizeProduct(product, language), [product, language]);
  const localizedRelated = useMemo(() => localizeProducts(relatedProducts, language), [relatedProducts, language]);
  const copy = commonCopy[language];
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="bg-[#f8f6f2] text-[#1d1d1d] overflow-x-hidden">
      
      {/* Screen 1: Product Campaign Cover */}
      <section className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-24 select-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(180,106,60,0.06),transparent_30rem)] pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center mt-12">
          {/* Sculpture display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <ProductVisual className="w-[90%] max-w-[420px]" product={display} showMeta={false} />
          </motion.div>

          {/* Campaign details */}
          <div className="flex flex-col items-start text-left">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#b46a3c] mb-4">
              {display.categoryLabel}
            </span>

            <TextReveal
              as="h1"
              className="text-5xl sm:text-7xl font-display font-medium leading-[0.9] text-[#1d1d1d] uppercase tracking-tighter"
            >
              {display.name}
            </TextReveal>

            <p className="mt-6 text-sm text-[#6c665a] leading-relaxed max-w-md">
              {display.shortDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-2 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase">
              <span>{display.flavor}</span>
              <span className="text-[#1d1d1d]/20">|</span>
              <span>{display.stockStatus}</span>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1d1d1d]/10 w-full max-w-md flex items-end justify-between gap-6">
              <div>
                <span className="font-mono text-[9px] text-[#6c665a] uppercase tracking-widest">{language === "tr" ? "FİYAT" : "PRICE"}</span>
                <p className="font-mono text-3xl font-semibold mt-1">
                  {formatPriceForLanguage(display.price, language)}
                </p>
              </div>

              <MagneticButton
                icon={added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                onClick={handleAdd}
                className="cursor-none"
                data-cursor="add"
              >
                {added ? copy.added : copy.add}
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Screen 2: Active Formula & Ingredients */}
      <section className="relative min-h-screen w-full flex flex-col justify-center py-20 px-6 sm:px-12 lg:px-24 border-t border-[#1d1d1d]/6 select-none overflow-hidden">
        <div className="absolute inset-0 technical-lines opacity-10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#b46a3c] font-bold uppercase">THE FORMULA</span>
            <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[#1d1d1d] uppercase mt-2">
              {language === "tr" ? "Aktif Bileşenler" : "Active Elements"}
            </h2>
          </div>

          {/* Large formula typography grid */}
          <div className="grid gap-8 sm:grid-cols-3">
            {display.formula.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.58 }}
                className="border-t border-[#1d1d1d]/10 pt-6"
              >
                <span className="font-mono text-5xl sm:text-7xl font-semibold text-[#b46a3c] tracking-tighter">
                  {item.value}
                </span>
                <h3 className="font-mono text-xs tracking-wider uppercase text-[#1d1d1d] mt-4 font-bold">
                  {item.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6c665a]">
                  {item.note}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Clean Ingredients chips row */}
          <div className="mt-16 pt-8 border-t border-[#1d1d1d]/10">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#b46a3c] font-bold uppercase block mb-4">
              {language === "tr" ? "TÜM İÇERİK" : "FULL INGREDIENTS"}
            </span>
            <div className="flex flex-wrap gap-2">
              {display.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="rounded-full border border-[#1d1d1d]/10 bg-[#f3eee5]/50 px-4 py-2 text-[10px] font-mono uppercase tracking-widest text-[#4f4a40]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Screen 3: Nutrition, Rhythm & Related */}
      <section className="relative min-h-screen w-full flex flex-col justify-center py-20 px-6 sm:px-12 lg:px-24 border-t border-[#1d1d1d]/6 select-none overflow-hidden">
        <div className="absolute inset-0 lab-grid opacity-10 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          
          {/* Left: Minimal nutrition facts & timelines */}
          <div className="flex flex-col gap-10 w-full">
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#b46a3c] font-bold uppercase block mb-4">
                {language === "tr" ? "BESİN DEĞERLERİ" : "NUTRITION FACTS"}
              </span>
              <div className="divide-y divide-[#1d1d1d]/10 border-y border-[#1d1d1d]/10 w-full">
                {Object.entries(display.nutritionFacts).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-3 text-xs font-mono">
                    <span className="text-[#6c665a] uppercase">{key}</span>
                    <span className="font-bold text-[#1d1d1d]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rhythm Timeline */}
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#b46a3c] font-bold uppercase block mb-4">
                {language === "tr" ? "KULLANIM RİTMİ" : "USE RHYTHM"}
              </span>
              <div className="grid gap-4">
                {display.usage.map((step, idx) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="font-mono text-xs text-[#b46a3c] font-bold">0{idx + 1}</span>
                    <p className="text-[11px] font-mono tracking-wide text-[#6c665a] uppercase">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Related & FAQ Accordion */}
          <div className="flex flex-col gap-12 w-full">
            {/* Related products horizontal flow */}
            {localizedRelated.length > 0 && (
              <div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-[#b46a3c] font-bold uppercase block mb-6">
                  {copy.completeRoutine}
                </span>
                <div className="grid grid-cols-2 gap-6">
                  {localizedRelated.slice(0, 2).map((rel) => (
                    <ProductCard compact key={rel.id} product={rel} />
                  ))}
                </div>
              </div>
            )}

            {/* Collapsible FAQ accordion details */}
            <div className="border-t border-[#1d1d1d]/10 pt-6">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#b46a3c] font-bold uppercase block mb-4">
                {language === "tr" ? "ÜRÜN NOTLARI" : "PRODUCT NOTES"}
              </span>
              <div className="grid gap-3">
                {display.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-[#1d1d1d]/10 rounded-[8px] bg-[#f3eee5]/30 p-4 open:bg-[#fffaf2]/60 transition-colors duration-300"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[10px] font-bold tracking-widest text-[#1d1d1d] uppercase">
                      {faq.question}
                      <span className="text-[#b46a3c] transition duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[11px] leading-relaxed text-[#6c665a] font-mono uppercase">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
