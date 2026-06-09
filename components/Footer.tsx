"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="h-fit w-full overflow-hidden relative bg-[#f91814]/10 border-t border-[#4c0016]/10 px-[2.5vw] py-[6vw] select-none z-30">
      {/* Top Links and Copyright Row */}
      <div className="relative z-30 flex items-center justify-between gap-[2vw] pb-[1vw] max-md:flex-col max-md:items-center max-md:gap-[4vw] max-md:pb-[6vw]">
        <nav className="flex flex-wrap items-center gap-x-[2vw] gap-y-[.6vw] max-md:gap-x-[5vw] max-md:gap-y-[2vw]" aria-label="Footer navigation">
          <Link className="text40 uppercase font-mouse-memoirs hover:text-[#f91814] transition-colors text-black" href="/">
            {language === "tr" ? "ANASAYFA" : "HOME"}
          </Link>
          <Link className="text40 uppercase font-mouse-memoirs hover:text-[#f91814] transition-colors text-black" href="/urunler">
            {language === "tr" ? "MENÜLER" : "BURGERS"}
          </Link>
          <Link className="text40 uppercase font-mouse-memoirs hover:text-[#f91814] transition-colors text-black" href="/rehber">
            {language === "tr" ? "BAHARATLAR" : "SPICES"}
          </Link>
          <Link className="text40 uppercase font-mouse-memoirs hover:text-[#f91814] transition-colors text-black" href="/iletisim">
            {language === "tr" ? "İLETİŞİM" : "CONTACT"}
          </Link>
        </nav>
        
        <p className="text40 max-md:hidden uppercase opacity-80 font-mouse-memoirs text-black">
          © 2026 CRAV — All rights reserved
        </p>
      </div>

      <div className="relative z-30 max-md:hidden my-4">
        <div className="h-[2px] w-full bg-[#4c0016]/10"></div>
      </div>

      {/* Tagline row */}
      <div className="relative z-30 max-md:hidden pt-[1vw] opacity-80 text-black">
        <p className="text40 uppercase font-mouse-memoirs">
          Smashed patties · toasted buns · est. 1997
        </p>
      </div>

      {/* Decorative big bottom footer logo and floating ingredient graphics */}
      <div className="mt-[10vw] relative min-h-[18vw] max-md:mt-[5vw] flex flex-col justify-end">
        
        {/* Floating ingredients */}
        <div className="absolute inset-x-0 bottom-[8vw] h-0 z-20 flex justify-around pointer-events-none px-[10vw]">
          <img 
            src="/img-webp/lettuce.webp" 
            alt="Lettuce leaf" 
            className="w-[10vw] max-md:w-[15vw] h-auto juggle-lettuce-anim object-contain" 
            draggable={false}
          />
          <img 
            src="/img-webp/tomato.webp" 
            alt="Tomato slice" 
            className="w-[9vw] max-md:w-[14vw] h-auto juggle-tomato-anim object-contain" 
            draggable={false}
          />
          <img 
            src="/img-webp/cheese-logo.webp" 
            alt="Cheese slice" 
            className="w-[11vw] max-md:w-[16vw] h-auto juggle-cheese-anim object-contain" 
            draggable={false}
          />
          <img 
            src="/img-webp/meat.webp" 
            alt="Burger meat" 
            className="w-[12vw] max-md:w-[17vw] h-auto juggle-meat-anim object-contain" 
            draggable={false}
          />
        </div>

        {/* Big CRAV Text */}
        <h2 className="heading600 leading-[.5] translate-y-[5vw] max-md:translate-y-0 text-center text-[#f91814] text-stroke z-10 relative font-modak select-none pointer-events-none">
          CRAV
        </h2>

        {/* Mobile footer links */}
        <div className="relative hidden max-md:block z-30 mt-[10vw]">
          <div className="h-[2px] w-full bg-[#4c0016]/10"></div>
        </div>

        <div className="relative z-30 pt-[1vw] max-md:pt-[4vw]">
          <p className="text40 uppercase font-mouse-memoirs opacity-80 text-center text-black">
            <span className="hidden max-md:block mb-2">
              Smashed patties · toasted buns · est. 1997
            </span>
            <span className="md:hidden block">
              © 2026 CRAV — All rights reserved
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
