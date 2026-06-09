"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextReveal from "@/components/TextReveal";
import type { FaqItem } from "@/lib/data";
import { localizeFaqItems } from "@/lib/i18n";

type FaqExperienceProps = {
  faq: FaqItem[];
};

export default function FaqExperience({ faq }: FaqExperienceProps) {
  const { language } = useLanguage();
  const localizedFaq = useMemo(() => localizeFaqItems(faq, language), [faq, language]);

  return (
    <div className="bg-[#f8f6f2] px-4 pb-28 pt-32 text-[#1d1d1d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#8f4f2d]">
          {language === "tr" ? "SSS" : "FAQ"}
        </p>
        <TextReveal
          as="h1"
          className="mt-5 text-6xl font-semibold leading-[0.95] text-[#1d1d1d] sm:text-8xl"
        >
          {language === "tr" ? "Sepete girmeden netleşenler." : "Clear before the cart."}
        </TextReveal>
        <div className="mt-12 grid gap-3">
          {localizedFaq.map((item) => (
            <details
              className="group rounded-[8px] border border-[#1d1d1d]/10 bg-[#f3eee5] p-5 open:bg-[#fffaf2]"
              key={item.id}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-xl font-semibold text-[#1d1d1d]">
                {item.question}
                <span className="text-[#b46a3c] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#6c665a]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
