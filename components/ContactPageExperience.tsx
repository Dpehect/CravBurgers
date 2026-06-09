"use client";

import ContactExperience from "@/components/ContactExperience";
import { useLanguage } from "@/components/LanguageProvider";
import TextReveal from "@/components/TextReveal";

export default function ContactPageExperience() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f8f6f2] px-6 pb-28 pt-28 text-[#1d1d1d] sm:px-12 min-h-screen select-none relative overflow-x-hidden flex items-center justify-center">
      <div className="absolute inset-0 technical-lines opacity-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10 w-full flex flex-col justify-center my-auto">
        <div className="border-b border-[#1d1d1d]/10 pb-8 text-left">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#b46a3c] mb-3">
            {language === "tr" ? "İLETİŞİM MASASI" : "CONTACT DESK"}
          </p>
          <TextReveal
            as="h1"
            className="text-5xl sm:text-7xl font-display font-medium leading-[0.9] text-[#1d1d1d] uppercase tracking-tighter"
          >
            {language === "tr" ? "Net soru, net cevap." : "Clear signal. Clear reply."}
          </TextReveal>
        </div>
        
        <ContactExperience />
      </div>
    </div>
  );
}
