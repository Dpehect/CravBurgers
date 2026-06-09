"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import Sticker from "@/components/Sticker";
import type { Article, Category, Product, Testimonial } from "@/lib/data";

type HomeExperienceProps = {
  products: Product[];
  categories: Category[];
  articles: Article[];
  testimonials: Testimonial[];
};

export default function HomeExperience({}: HomeExperienceProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f5e3cd] text-[#4c0016] overflow-x-hidden min-h-screen">
      
      {/* 1. HERO COVER SECTION */}
      <section 
        id="hero" 
        className="h-screen w-full relative flex flex-col justify-between items-center pt-[8vw] max-md:pt-[40vw] max-md:h-[200vw] max-md:pb-[2vw] z-10"
      >
        {/* Smashed Fresh Bold Text and Sticker badges */}
        <div className="w-fit h-fit relative">
          <h1 className="text-[26vw] leading-[.8] text-center text-[#f91814] text-stroke-180 font-mouse-memoirs max-md:text-[24vw]">
            THE BURGER
          </h1>
          
          {/* Smashed Fresh rotating badge */}
          <div className="absolute top-[8%] left-[10%] max-md:top-[2%] max-md:left-[2%] rotate-[12deg] z-10">
            <span className="text-[#f4a804] text-stroke-small text-center text-[2.8vw] font-modak leading-none max-md:text-[6vw] block">
              {language === "tr" ? "EZİLMİŞ" : "SMASHED"}<br />
              {language === "tr" ? "TAZE" : "FRESH"}
            </span>
          </div>

          {/* Bold Flavor rotating badge */}
          <div className="absolute bottom-[8%] right-[10%] max-md:bottom-[2%] max-md:right-[2%] -rotate-[12deg] z-10">
            <span className="text-[#f4a804] text-stroke-small text-center text-[2.8vw] font-modak leading-none max-md:text-[6vw] block">
              {language === "tr" ? "CESUR" : "BOLD"}<br />
              {language === "tr" ? "LEZZET" : "FLAVOR"}
            </span>
          </div>
        </div>

        {/* Central Large Hero Smashed Burger Image */}
        <div className="size-[40vw] z-20 absolute top-[55%] -translate-y-[55%] left-1/2 -translate-x-1/2 max-md:size-[80vw] max-md:top-[110vw] max-md:-translate-y-[50%] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.4 }}
            className="w-full h-full"
          >
            <img 
              src="/img-webp/burgerH.webp" 
              alt="CRAV Smashed Burger with fresh ingredients" 
              className="h-full w-full object-contain filter drop-shadow-[0_20px_50px_rgba(76,0,22,0.45)]"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Bottom Background CRAV Text */}
        <p className="text-center text-[15vw] max-md:text-[20vw] font-modak uppercase mt-[15vw] relative z-10 text-stroke-180 text-[#F4A804] translate-y-[-9vw] max-md:mt-[6vw] max-md:absolute max-md:top-[133vw] max-md:-translate-y-1/2 select-none pointer-events-none">
          CRAV
        </p>

        {/* Hero Bottom text descriptions */}
        <div className="w-full absolute bottom-0 left-0 flex justify-between px-[2.5vw] py-[2vw] max-md:static max-md:flex-col max-md:gap-[4vw] max-md:items-center max-md:px-[5vw] max-md:py-0">
          <div className="w-[23vw] max-md:w-full">
            <p className="text40 leading-none max-md:text-center text-black font-mouse-memoirs uppercase">
              {language === "tr" 
                ? "Düz ızgarada taptaze ezilen köftelerimiz, karamelize kabuğun altında maksimum sululuk sunar."
                : "Smashed hot on the flat top, our prime patties lock in ultimate juiciness under a caramelized crust."}
            </p>
          </div>
          <div className="w-[23vw] max-md:w-full">
            <p className="text40 leading-none text-right max-md:text-center text-black font-mouse-memoirs uppercase">
              {language === "tr"
                ? "Ergitilmiş çedar ve 1997'den beri iştahınızı kabartmak için hazırlanan özel acılı ballı glaze sosumuz."
                : "Topped with melted cheddar and our signature chili honey glaze crafted to satisfy your cravings since 1997."}
            </p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT & EXHIBITION GALLERY SECTION */}
      <section 
        id="about" 
        className="h-fit overflow-clip self relative z-30 text-center space-y-[2vw] w-full max-md:space-y-[6vw] py-[6vw] bg-[#f5e3cd] border-t border-[#4c0016]/10"
      >
        {/* Jelly Separator SVG (yellow) */}
        <div className="z-10 w-full absolute left-0 right-0 top-0 overflow-x-clip max-md:left-0 max-md:right-0">
          <svg className="jelly pointer-events-none block w-full max-w-[100vw] h-[180px] max-md:h-auto" width="100%" viewBox="0 0 1536 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
            <path d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0" fill="#f4a804" opacity="0.12"></path>
          </svg>
        </div>

        <div className="space-y-[1.5vw] relative max-md:space-y-[6vw] pt-12 z-20">
          <p className="text-[#f91814] rotate-[-5deg] text-stroke-small w-full text-center mx-auto text-[2.8vw] font-modak leading-none max-md:text-[8vw] max-md:w-fit">
            TOP CLASSIC
          </p>
          <h2 className="text-stroke-180 max-md:w-full w-[70%] text-center mx-auto leading-none text-[#f91814] heading300 uppercase font-modak">
            {language === "tr" ? "sulu çedarlı dopdolu" : "juicy cheesy fully Loaded"}
          </h2>
          <p className="text-black text40 w-[45%] mt-[2vw] leading-[1.1] mx-auto max-md:w-[90%] font-mouse-memoirs uppercase">
            {language === "tr"
              ? "CRAV her zamankinden daha cesur döndü. Zengin köklerimize sadık kalarak, sıcak, taze ve el yapımı harika bir smashed deneyimi sunuyoruz."
              : "CRAV is back and bolder than ever. Honoring our rich roots, we bring you the ultimate smashed experience fully loaded, hot, and crafted fresh."}
          </p>
        </div>

        {/* Order Now Button with Custom SVG Blob Shape */}
        <div className="mx-auto mt-[2vw] mb-[4vw] w-full max-md:mt-[6vw] max-md:mb-[8vw] z-20 relative">
          <Link 
            type="link-btn" 
            className="relative w-fit mx-auto border-none bg-transparent p-0 block cursor-pointer outline-none select-none hover:scale-105 transition-transform duration-300"
            href="/urunler"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-10 -10 602 475" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <path stroke="#ffffff" strokeWidth="10" fill="#F91814" d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"></path>
            </svg>
            <span className="relative z-10 text-[#f5e3cd] font-bold text40 uppercase inline-block px-[5vw] py-[1.8vw] max-md:px-[12vw] max-md:py-[5vw] font-mouse-memoirs tracking-widest">
              {language === "tr" ? "ŞİMDİ SİPARİŞ ET" : "ORDER NOW"}
            </span>
          </Link>
        </div>

        {/* Product stack photos with burgerselfie sticker */}
        <div className="relative grid h-fit w-full place-items-center px-[10vw] pb-[6vw] max-md:px-[4vw] max-md:pb-[12vw] z-20">
          
          {/* Floating burgerselfie sticker */}
          <div className="absolute w-[15vw] max-md:w-[25vw] h-auto top-[-13vw] max-md:top-[-30vw] left-[5vw] max-md:-left-[4vw] z-50 drop-shadow-xl">
            <Sticker 
              imageSrc="/img/burgerselfie.png"
              alt="CRAV Burger selfie sticker"
              width="100%"
              rotate="30deg"
              peelDirection="15deg"
            />
          </div>

          {/* Three photo stack */}
          <div className="grid grid-cols-3 gap-[1vw] justify-center mx-auto max-w-[70vw] max-md:flex max-md:flex-row max-md:flex-nowrap max-md:items-end max-md:justify-center max-md:gap-[2vw] max-md:w-full max-md:pt-[4vw] max-md:pb-[2vw] overflow-x-auto max-md:scrollbar-hide">
            <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[5deg] max-md:-rotate-12 max-md:translate-y-[3vw] shadow-lg border border-[#4c0016]/10">
              <img 
                src="/img-webp/about-1.webp" 
                alt="Chef preparing a fresh smashed burger" 
                className="h-full w-full object-cover" 
                draggable={false}
              />
            </div>
            <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[-5deg] max-md:-translate-y-[6vw] max-md:z-10 shadow-lg border border-[#4c0016]/10">
              <img 
                src="/img-webp/about-2.webp" 
                alt="Close-up of melted cheese on a burger patty" 
                className="h-full w-full object-cover" 
                draggable={false}
              />
            </div>
            <div className="h-[25vw] w-[20vw] rounded-[4%] overflow-hidden max-md:w-[35vw] max-md:h-[38vw] max-md:shrink-0 md:rotate-[8deg] max-md:rotate-12 max-md:translate-y-[3vw] shadow-lg border border-[#4c0016]/10">
              <img 
                src="/img-webp/about-3.webp" 
                alt="CRAV restaurant atmosphere" 
                className="h-full w-full object-cover" 
                draggable={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSITION CHEESY BANNER DISPLAY */}
      <div className="h-[80vh] max-md:h-[40vh] w-full relative z-20 overflow-hidden border-t border-b border-[#4c0016]/10">
        <img 
          src="/img-webp/cheesyBurger.webp" 
          alt="CRAV Cheesy Burger dripping sauce" 
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* 4. CTA SECTION ("FEEL IT") */}
      <section 
        id="cta" 
        className="h-fit w-full pt-[18vw] max-md:pt-[12vw] overflow-clip relative bg-[#f5e3cd] pb-24 z-30"
      >
        {/* Separator SVG */}
        <div className="z-10 w-full absolute left-0 right-0 top-0 overflow-x-clip max-md:left-0 max-md:right-0">
          <svg className="jelly pointer-events-none block w-full max-w-[100vw] h-[180px] max-md:h-auto" width="100%" viewBox="0 0 1536 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
            <path d="M1536,0 H-1 V135 S184.32,65 460.8,155 S860.16,105 1121.28,137 S1413.12,105 1536,105 V0" fill="#f91814" opacity="0.15"></path>
          </svg>
        </div>

        {/* Jelly fries sticker */}
        <div className="w-[14vw] max-md:w-[25vw] h-auto absolute top-[5vw] max-md:top-[30vw] left-[5vw] max-md:-left-[4vw] z-50 drop-shadow-xl">
          <Sticker 
            imageSrc="/img-webp/fries.webp"
            alt="CRAV crispy fries sticker"
            width="100%"
            rotate="-15deg"
            peelDirection="45deg"
          />
        </div>

        {/* Double stickers decoration */}
        <div className="w-[18vw] max-md:w-[35vw] h-auto absolute top-[20vw] max-md:top-[35vw] right-[2vw] max-md:-right-[6vw] z-50 drop-shadow-xl">
          <Sticker 
            imageSrc="/img/burger-boy.png"
            alt="Artisan smashed logo badge"
            width="100%"
            rotate="25deg"
            peelDirection="-15deg"
          />
        </div>

        {/* Two column split */}
        <div className="relative z-10 w-full max-w-5xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center px-[4vw]">
          
          {/* Left information panel */}
          <div className="flex flex-col items-start gap-[2vw] justify-center h-full max-md:items-center">
            <p className="text-[#f91814] -rotate-[5deg] ml-[.5vw] uppercase text-stroke-small font-modak leading-none text60 max-md:rotate-0 max-md:ml-0 max-md:text-center">
              FEEL IT
            </p>
            <h2 className="text-[#f91814] text-stroke-180 heading300 uppercase leading-[0.8] max-md:text-[10vw] max-md:text-center font-modak">
              {language === "tr" ? "değişimi Hisset" : "feel the Change"}
            </h2>
            <p className="text-black text40 font-mouse-memoirs leading-[1.1] max-md:text-[4.5vw] max-md:text-center uppercase mt-4 max-w-md">
              {language === "tr"
                ? "Cesur olanlar için ezildi, aç olanlar için yapıldı. Her gevrek kenar ve sulu katmanın hüküm sürdüğü efsanevi bir el yapımı deneyime dalın."
                : "Smashed for the bold, built for the hungry. Dive into a legendary craft experience where every crispy edge and juicy layer rules."}
            </p>
            
            {/* CTA Button */}
            <div className="max-md:w-full max-md:flex max-md:justify-center mt-6">
              <Link 
                type="link-btn" 
                className="relative w-fit mx-auto border-none bg-transparent p-0 block cursor-pointer outline-none select-none hover:scale-105 transition-transform duration-300"
                href="/urunler"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-10 -10 602 475" preserveAspectRatio="none" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                  <path stroke="#ffffff" strokeWidth="10" fill="#F91814" d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z"></path>
                </svg>
                <span className="relative z-10 text-[#f5e3cd] font-bold text40 uppercase inline-block px-[5vw] py-[1.8vw] max-md:px-[12vw] max-md:py-[5vw] font-mouse-memoirs tracking-widest">
                  {language === "tr" ? "ŞİMDİ SİPARİŞ ET" : "ORDER NOW"}
                </span>
              </Link>
            </div>
          </div>

          {/* Right visual card */}
          <div className="w-full aspect-[4/5] rounded-[2vw] overflow-hidden max-md:rounded-[4vw] shadow-2xl border border-[#4c0016]/10">
            <img 
              src="/img-webp/cta.webp" 
              alt="Premium smashed burger on a wooden board" 
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
