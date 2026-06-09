"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/Button";

const particles = [
  { x: "12%", y: "24%", d: 0.2 },
  { x: "24%", y: "70%", d: 0.6 },
  { x: "52%", y: "18%", d: 0.4 },
  { x: "68%", y: "72%", d: 0.8 },
  { x: "82%", y: "30%", d: 0.1 },
  { x: "91%", y: "62%", d: 0.5 },
  { x: "38%", y: "42%", d: 0.7 },
  { x: "74%", y: "46%", d: 0.3 },
];

export default function AnimatedHero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 72]);
  const lineX = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section className="relative isolate min-h-[78svh] overflow-hidden bg-[#eef3f8] pt-20">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          alt="Açık renk stüdyoda NUTRIX supplement ürünü"
          className="object-cover opacity-70"
          fill
          priority
          sizes="100vw"
          src="/assets/hero-lab-product.png"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(238,243,248,0.98)_0%,rgba(255,255,255,0.9)_34%,rgba(238,243,248,0.62)_68%,rgba(238,243,248,0.92)_100%)]" />
      <div className="absolute inset-0 lab-grid opacity-45" />

      <motion.div
        className="absolute left-[52%] top-[24%] hidden h-px w-[46rem] origin-left bg-orange-500/50 shadow-[0_0_26px_rgba(249,115,22,0.45)] md:block"
        style={{ x: lineX }}
      />
      <motion.div
        animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.25, 0.75, 0.25] }}
        className="absolute right-[8%] top-[28%] hidden h-40 w-96 rounded-[50%] border border-orange-400/20 md:block"
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {particles.map((particle, index) => (
        <motion.span
          animate={{ y: [-10, 18, -10], opacity: [0.2, 0.8, 0.2] }}
          className="absolute z-10 h-1.5 w-1.5 rounded-full bg-white/90 shadow-[0_0_16px_rgba(255,255,255,0.8)]"
          key={`${particle.x}-${particle.y}`}
          style={{ left: particle.x, top: particle.y }}
          transition={{
            duration: 4 + index * 0.3,
            delay: particle.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-20 mx-auto grid min-h-[calc(78svh-5rem)] max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-sm font-semibold text-orange-600"
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.7 }}
          >
            NUTRIX
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-[64px]"
            initial={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Protein, kreatin, vitamin ve sporcu gıdaları
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.75, delay: 0.18 }}
          >
            Ürün sayfalarında içerik listesi, kullanım şekli ve porsiyon
            bilgileri yer alır. Ürünleri kategori bazında inceleyebilirsiniz.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.28 }}
          >
            <Button href="/shop" icon="shop">
              Ürünleri İncele
            </Button>
            <Button href="/blog" icon="arrow" variant="secondary">
              Supplement Rehberi
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          className="relative hidden min-h-[420px] lg:block"
          initial={{ opacity: 0, y: 80, rotate: -2 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute bottom-10 right-0 w-80 rounded-[8px] border border-slate-200 bg-white/90 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">
                Ürün sayfalarında
              </span>
              <span className="font-mono text-xs text-orange-500">NUTRIX</span>
            </div>
            <div className="grid gap-2">
              {["İçerik listesi", "Porsiyon bilgisi", "Kullanım şekli"].map((label) => (
                <div className="rounded-[8px] border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700" key={label}>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
