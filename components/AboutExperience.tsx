"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ProductVisual from "@/components/ProductVisual";
import TextReveal from "@/components/TextReveal";
import type { Product } from "@/lib/data";
import { localizeProduct } from "@/lib/i18n";

type AboutExperienceProps = {
  product: Product;
};

export default function AboutExperience({ product }: AboutExperienceProps) {
  const { language } = useLanguage();
  const display = useMemo(() => localizeProduct(product, language), [product, language]);

  const brandValues = useMemo(() => {
    return language === "tr"
      ? [
          { title: "FORM", desc: "Etiket sessiz kalır, obje konuşur. Şeffaf dozlar." },
          { title: "RİTİM", desc: "Kullanım zamanı nettir. Günlük performansı takip et." },
          { title: "DİSİPLİN", desc: "Klişelerden uzak, temiz ve bilimsel formüller." },
          { title: "TOPARLANMA", desc: "Zirve performans kadar dinlenmeye de odaklan." },
        ]
      : [
          { title: "FORM", desc: "The label stays quiet. Transparent active doses." },
          { title: "RHYTHM", desc: "Timing is clear. Track repeat training quality." },
          { title: "DISCIPLINE", desc: "Free from body building clichés. Clean formulas." },
          { title: "RECOVERY", desc: "Focus on rest cycles as much as peak effort." },
        ];
  }, [language]);

  return (
    <div className="bg-[#f8f6f2] text-[#1d1d1d] overflow-x-hidden">
      
      {/* Screen 1: Manifesto Cover */}
      <section className="relative h-screen w-full flex items-center justify-center px-6 sm:px-12 lg:px-24 select-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(89,99,66,0.06),transparent_28rem)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center mt-12">
          {/* Typographic manifesto */}
          <div className="flex flex-col items-start text-left">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#b46a3c] mb-6">
              MANIFESTO
            </span>
            <TextReveal
              as="h1"
              className="text-5xl sm:text-7xl lg:text-8xl font-display font-medium leading-[0.9] text-[#1d1d1d] uppercase tracking-tighter"
            >
              {language === "tr" ? "Mağaza değil, disiplin." : "Not a shop. A discipline."}
            </TextReveal>
            <p className="mt-8 text-sm text-[#6c665a] leading-relaxed max-w-md">
              {language === "tr"
                ? "NUTRIX, supplement rafındaki gürültüyü siler. Hedef, içerik, doz ve ritim aynı düzlemde yer alır."
                : "NUTRIX erases the noise from the supplement shelf. Goal, formula, dose and rhythm stay in one view."}
            </p>
          </div>

          {/* Floating sculpture in empty space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex items-center justify-center"
          >
            <ProductVisual className="w-[85%] max-w-[380px]" product={display} showMeta={false} />
          </motion.div>
        </div>
      </section>

      {/* Screen 2: Brand Rhythm */}
      <section className="relative h-screen w-full flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24 border-t border-[#1d1d1d]/6 select-none overflow-hidden">
        <div className="absolute inset-0 fine-grid opacity-10 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-[80%]">
          <div>
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#b46a3c] font-bold uppercase">BRAND VALUES</span>
            <h2 className="font-display text-4xl sm:text-6xl font-medium tracking-tight text-[#1d1d1d] uppercase mt-2">
              {language === "tr" ? "Değerler Ritimle Yaşar" : "Values Live in Rhythm"}
            </h2>
          </div>

          {/* Large vertical values list with side description */}
          <div className="flex flex-col gap-6 mt-8">
            {brandValues.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.58 }}
                className="grid sm:grid-cols-[240px_1fr] items-center border-t border-[#1d1d1d]/10 pt-4"
              >
                <span className="font-display text-3xl sm:text-5xl font-semibold text-[#1d1d1d] tracking-tighter">
                  {val.title}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-[#6c665a] uppercase mt-2 sm:mt-0">
                  {val.desc}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="h-4" />
        </div>
      </section>

    </div>
  );
}
