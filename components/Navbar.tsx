"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuLinks = [
    { id: "home", label: language === "tr" ? "ANASAYFA" : "HOME", href: "/" },
    { id: "menu", label: language === "tr" ? "MENÜLER" : "BURGERS", href: "/urunler" },
    { id: "spices", label: language === "tr" ? "BAHARATLAR" : "OUR SPICES", href: "/rehber" },
    { id: "contact", label: language === "tr" ? "İLETİŞİM" : "CONTACT", href: "/iletisim" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[999] flex items-center justify-between px-[2.5vw] max-md:px-[4vw] py-[1vw] max-md:py-[4vw] select-none">
        {/* Brand Logo */}
        <Link 
          className="font-modak hover:scale-105 transition-all duration-300 text-[#f91814] text-stroke-small text-[4vw] max-md:text-[10vw] leading-none" 
          href="/"
        >
          CRAV
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-[1vw] max-md:gap-[3vw]">
          {/* Quick Menu Link Button */}
          <Link 
            className="font-mouse-memoirs hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide text-[#f5e3cd] bg-[#f91814] px-[1.6vw] py-[.5vw] max-md:px-[5vw] max-md:py-[1.8vw] group rounded-full hover:bg-black" 
            href="/urunler"
          >
            <span className="overflow-hidden relative inline-block group">
              <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
                {language === "tr" ? "MENÜ" : "BURGERS"}
              </span>
              <span className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300" aria-hidden="true">
                {language === "tr" ? "MENÜ" : "BURGERS"}
              </span>
            </span>
          </Link>

          {/* Full Toggle Button */}
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="hover:scale-105 flex items-center gap-[.6vw] max-md:gap-[2vw] px-[1.4vw] py-[.5vw] max-md:px-[4vw] group max-md:py-[1.8vw] rounded-full cursor-pointer transition-all duration-400 border-[.15vw] max-md:border-[.4vw] bg-transparent border-black/20 hover:border-black"
            >
              <span className="font-mouse-memoirs flex items-center justify-center uppercase text-[1.3vw] max-md:text-[4vw] tracking-wide transition-colors duration-300 text-black">
                <span className="overflow-hidden relative inline-block group">
                  <span className="block group-hover:-translate-y-full translate-y-0 transition-all duration-300">
                    {language === "tr" ? "MENÜ" : "MENU"}
                  </span>
                  <span className="block absolute inset-0 w-full h-full group-hover:translate-y-0 translate-y-full transition-all duration-300" aria-hidden="true">
                    {language === "tr" ? "MENÜ" : "MENU"}
                  </span>
                </span>
              </span>
              
              {/* Menu Hamburger SVG Lines */}
              <div className="relative shrink-0 w-[1.2vw] h-[1.2vw] max-md:w-[3.5vw] max-md:h-[3.5vw] flex flex-col justify-between" aria-hidden="true">
                <span className={`bg-black block w-full h-[.15vw] max-md:h-[.5vw] rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[0.5vw] max-md:translate-y-[1.2vw]' : ''}`} />
                <span className={`bg-black block w-[70%] h-[.15vw] max-md:h-[.5vw] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`bg-black block w-full h-[.15vw] max-md:h-[.5vw] rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[0.5vw] max-md:-translate-y-[1.2vw]' : ''}`} />
              </div>
            </button>
            
            {/* Slide Down Overlay Menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[calc(100%+1vw)] right-0 w-[18vw] max-md:w-[91vw] bg-[#f91814] rounded-[1.2vw] max-md:rounded-[4vw] p-[2vw] max-md:mt-[5vw] max-md:p-[6vw] shadow-[0_1vw_3vw_rgba(27,27,27,.25)] z-[999]"
                >
                  <div className="flex flex-col gap-[.6vw] max-md:gap-[2vw]">
                    {menuLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="font-modak text-[2.4vw] max-md:text-[8vw] text-[#f5e3cd] leading-[1.1] uppercase hover:text-[#f4a804] hover:scale-105 transition-all duration-300 inline-block"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-[1.5vw] max-md:mt-[4vw] pt-[1vw] max-md:pt-[3vw] border-t border-[#f5e3cd]/20">
                    <p className="font-mouse-memoirs text-[0.9vw] max-md:text-[3.5vw] text-[#f5e3cd]/85 uppercase tracking-[0.2em]">
                      Est. 1997 — Navarra, España
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
}
