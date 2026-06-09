"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import MagneticButton from "@/components/MagneticButton";

export default function ContactExperience() {
  const { language } = useLanguage();
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start mt-8 w-full text-left">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase font-bold">
            {language === "tr" ? "AD SOYAD" : "FULL NAME"}
            <input
              required
              type="text"
              name="name"
              className="border-b border-[#1d1d1d]/15 bg-transparent rounded-none py-3 outline-none focus:border-[#b46a3c] transition duration-300 w-full text-sm uppercase font-mono tracking-wide"
            />
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase font-bold">
            {language === "tr" ? "E-POSTA" : "EMAIL"}
            <input
              required
              type="email"
              name="email"
              className="border-b border-[#1d1d1d]/15 bg-transparent rounded-none py-3 outline-none focus:border-[#b46a3c] transition duration-300 w-full text-sm uppercase font-mono tracking-wide"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase font-bold">
            {language === "tr" ? "KONU" : "SUBJECT"}
            <input
              required
              type="text"
              name="subject"
              className="border-b border-[#1d1d1d]/15 bg-transparent rounded-none py-3 outline-none focus:border-[#b46a3c] transition duration-300 w-full text-sm uppercase font-mono tracking-wide"
            />
          </label>
          <label className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase font-bold">
            {language === "tr" ? "HEDEF" : "GOAL"}
            <select
              name="goal"
              className="border-b border-[#1d1d1d]/15 bg-transparent rounded-none py-3 outline-none focus:border-[#b46a3c] transition duration-300 w-full text-sm uppercase font-mono tracking-wide"
            >
              {(language === "tr"
                ? ["Ürün seçimi", "Sipariş", "İçerik bilgisi", "İş birliği"]
                : ["Product choice", "Order", "Formula detail", "Partnership"]
              ).map((opt) => (
                <option key={opt} className="bg-[#f3eee5] text-[#1d1d1d]">
                  {opt}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase font-bold">
          {language === "tr" ? "MESAJ" : "MESSAGE"}
          <textarea
            required
            name="message"
            className="min-h-24 border-b border-[#1d1d1d]/15 bg-transparent rounded-none py-3 outline-none focus:border-[#b46a3c] transition duration-300 w-full text-sm uppercase font-mono tracking-wide resize-none"
          />
        </label>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <MagneticButton type="submit" className="cursor-none" data-cursor="explore">
            {language === "tr" ? "GÖNDER" : "SEND"}
          </MagneticButton>
          <AnimatePresence>
            {sent && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#596342] uppercase font-bold"
              >
                <Check className="h-4 w-4" />
                {language === "tr" ? "MESAJINIZ ALINDI" : "MESSAGE CAPTURED"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* Right Column: Address links */}
      <div className="flex flex-col gap-8 lg:pl-12 text-[10px] font-mono tracking-widest text-[#6c665a] uppercase mt-8 lg:mt-0">
        <div>
          <span className="text-[#b46a3c] font-bold block mb-2">EMAIL</span>
          <a href="mailto:support@nutrix.example" className="text-[#1d1d1d] hover:text-[#b46a3c] transition duration-300 cursor-none" data-cursor="explore">
            support@nutrix.example
          </a>
        </div>
        <div>
          <span className="text-[#b46a3c] font-bold block mb-2">LOCATION / ADRES</span>
          <span className="text-[#1d1d1d] block">
            HUMAN PERFORMANCE LAB<br />
            İSTANBUL, TR
          </span>
        </div>
        <div>
          <span className="text-[#b46a3c] font-bold block mb-2">WORKING HOUR / ÇALIŞMA SAATİ</span>
          <span className="text-[#1d1d1d]">MON - FRI: 09:00 - 18:00</span>
        </div>
      </div>
    </div>
  );
}
