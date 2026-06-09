"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextReveal from "@/components/TextReveal";
import type { Article } from "@/lib/data";
import { guideTopicsByLanguage, localizeArticles } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type GuideExperienceProps = {
  articles: Article[];
};

export default function GuideExperience({ articles }: GuideExperienceProps) {
  const { language } = useLanguage();
  const localizedArticles = useMemo(() => localizeArticles(articles, language), [articles, language]);
  const topics = guideTopicsByLanguage[language];

  const cardsData = useMemo(() => {
    return topics.map((topic, index) => {
      const article = localizedArticles[index % localizedArticles.length];
      return {
        id: index + 1,
        title: topic.title,
        note: topic.note,
        slug: article?.slug ?? "",
        excerpt: article?.excerpt ?? "",
      };
    });
  }, [topics, localizedArticles]);

  return (
    <div className="bg-[#f8f6f2] px-6 pb-28 pt-28 text-[#1d1d1d] sm:px-12 min-h-screen select-none relative overflow-x-hidden">
      <div className="absolute inset-0 technical-lines opacity-10 pointer-events-none" />

      {/* Screen 1: Cover Header */}
      <div className="mx-auto max-w-7xl relative z-10 border-b border-[#1d1d1d]/10 pb-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#b46a3c] mb-3">
              {language === "tr" ? "BİLGİ AKIŞI" : "KNOWLEDGE FLOW"}
            </p>
            <TextReveal
              as="h1"
              className="text-5xl sm:text-7xl font-display font-medium leading-[0.9] text-[#1d1d1d] uppercase tracking-tighter"
            >
              {language === "tr" ? "Okuma değil, sezgi." : "Less reading. More instinct."}
            </TextReveal>
          </div>
          <p className="max-w-xs text-[10px] font-mono tracking-widest text-[#6c665a] uppercase leading-relaxed text-left lg:text-right">
            {language === "tr"
              ? "Konular kısa tutuldu. Karar anı nettir: ne işe yarar, ne zaman mantıklıdır."
              : "Topics stay short. The decision stays clear: what it does, when it fits."}
          </p>
        </div>
      </div>

      {/* Screen 2: Interactive Card Stack Carousel */}
      <div className="relative w-full overflow-hidden mt-12 py-6">
        <motion.div
          drag="x"
          dragConstraints={{ left: -750, right: 0 }}
          className="flex gap-8 px-4 sm:px-16 cursor-none select-none"
          data-cursor="drag"
        >
          {cardsData.map((card, idx) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -16, scale: 1.02 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "w-[260px] sm:w-[320px] shrink-0 aspect-[3/4] bg-[#1d1d1d] text-[#f8f6f2] rounded-[12px] p-6 relative flex flex-col justify-between overflow-hidden shadow-xl",
                idx % 2 === 1 ? "mt-8" : "" // Staggered asymmetrical card placement
              )}
            >
              {/* Grid background inside card */}
              <div className="absolute inset-0 fine-grid opacity-10 pointer-events-none" />
              
              {/* Radial glow background */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#b46a3c]/15 blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-10 font-mono text-[9px] tracking-widest text-[#fffaf2]/40">
                <span>0{card.id}</span>
                <span>SYSTEM CARD</span>
              </div>

              {/* Card Body */}
              <div className="relative z-10 my-auto text-left">
                <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-tight uppercase leading-[0.95]">
                  {card.title}
                </h3>
                <p className="mt-3 text-[10px] font-mono tracking-widest text-[#d99b6b] uppercase font-bold">
                  {card.note}
                </p>
                <p className="mt-4 text-[10px] leading-relaxed text-[#fffaf2]/60 uppercase font-mono text-balance">
                  {card.excerpt}
                </p>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex justify-between items-center w-full">
                <Link
                  href={`/rehber/${card.slug}`}
                  className="font-mono text-[9px] tracking-widest uppercase text-[#fffaf2] hover:text-[#b46a3c] transition duration-300 cursor-none"
                  data-cursor="explore"
                >
                  {language === "tr" ? "KONUYU AÇ →" : "OPEN TOPIC →"}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
