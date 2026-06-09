"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import MagneticButton from "@/components/MagneticButton";
import ProductVisual from "@/components/ProductVisual";
import TextReveal from "@/components/TextReveal";
import { readCart, writeCart, type CartLine } from "@/lib/cart";
import type { Product } from "@/lib/data";
import { commonCopy, formatPriceForLanguage, localizeProduct } from "@/lib/i18n";

type CartExperienceProps = {
  products: Product[];
};

export default function CartExperience({ products }: CartExperienceProps) {
  const { language } = useLanguage();
  const copy = commonCopy[language];
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const update = () => setLines(readCart());
    update();
    window.addEventListener("nutrix-cart", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("nutrix-cart", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const enriched = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((candidate) => candidate.slug === line.slug);
          return product ? { line, product, display: localizeProduct(product, language) } : null;
        })
        .filter((item): item is { line: CartLine; product: Product; display: Product } => Boolean(item)),
    [language, lines, products],
  );

  const subtotal = enriched.reduce((total, item) => total + item.product.price * item.line.qty, 0);

  function updateQty(slug: string, qty: number) {
    const next = lines
      .map((line) => (line.slug === slug ? { ...line, qty } : line))
      .filter((line) => line.qty > 0);
    setLines(next);
    writeCart(next);
  }

  function clearCart() {
    setLines([]);
    writeCart([]);
  }

  return (
    <div className="bg-[#f8f6f2] px-4 pb-28 pt-32 text-[#1d1d1d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#8f4f2d]">{copy.cart}</p>
            <TextReveal
              as="h1"
              className="mt-5 text-6xl font-semibold leading-[0.95] text-[#1d1d1d] sm:text-8xl"
            >
              {language === "tr" ? "Rutinin son kontrolü." : "Final routine check."}
            </TextReveal>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[#6c665a]">
            {language === "tr"
              ? "Bu prototip sepeti localStorage ile çalışır. Ödeme entegrasyonu için akış hazır bırakıldı."
              : "This prototype cart runs on localStorage. The checkout flow is ready for integration."}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {enriched.length ? (
              enriched.map(({ line, product, display }) => (
                <article
                  className="grid gap-5 rounded-[8px] border border-[#1d1d1d]/10 bg-[#f3eee5] p-4 md:grid-cols-[10rem_1fr_auto]"
                  key={product.slug}
                >
                  <div className="rounded-[8px] bg-[#f8f6f2]">
                    <ProductVisual compact product={display} showMeta={false} />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#8f4f2d]">
                      {display.categoryLabel}
                    </p>
                    <Link href={`/urunler/${product.slug}`}>
                      <h2 className="mt-3 text-2xl font-semibold text-[#1d1d1d]">{display.name}</h2>
                    </Link>
                    <p className="mt-2 text-sm leading-6 text-[#6c665a]">{display.shortDescription}</p>
                    <p className="mt-4 font-mono text-xl font-semibold text-[#1d1d1d]">
                      {formatPriceForLanguage(product.price, language)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 md:flex-col md:items-end md:justify-between">
                    <div className="flex items-center rounded-full border border-[#1d1d1d]/10 bg-[#f8f6f2]">
                      <button
                        aria-label={language === "tr" ? "Adedi azalt" : "Decrease quantity"}
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => updateQty(product.slug, line.qty - 1)}
                        type="button"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center font-mono text-sm">{line.qty}</span>
                      <button
                        aria-label={language === "tr" ? "Adedi artır" : "Increase quantity"}
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => updateQty(product.slug, line.qty + 1)}
                        type="button"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      aria-label={language === "tr" ? "Ürünü sil" : "Remove product"}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1d1d1d]/10 text-[#8f4f2d] transition hover:bg-[#f8f6f2]"
                      onClick={() => updateQty(product.slug, 0)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-[8px] border border-[#1d1d1d]/10 bg-[#f3eee5] p-10 text-center">
                <h2 className="text-3xl font-semibold text-[#1d1d1d]">
                  {language === "tr" ? "Sepet boş." : "Cart is empty."}
                </h2>
                <p className="mt-4 text-[#6c665a]">
                  {language === "tr" ? "İlk stack için ürün arşivine dön." : "Return to the archive to build the first stack."}
                </p>
                <div className="mt-7">
                  <MagneticButton href="/urunler">{copy.exploreProducts}</MagneticButton>
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[8px] border border-[#1d1d1d]/10 bg-[#1d1d1d] p-6 text-[#f8f6f2]">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#d99b6b]">
                {language === "tr" ? "Özet" : "Summary"}
              </p>
              <div className="mt-7 space-y-4 border-y border-white/10 py-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#f8f6f2]/66">{copy.subtotal}</span>
                  <span className="font-mono">{formatPriceForLanguage(subtotal, language)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#f8f6f2]/66">{copy.shipping}</span>
                  <span className="font-mono">{copy.later}</span>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <span className="text-[#f8f6f2]/66">{copy.total}</span>
                <span className="font-mono text-4xl font-semibold">{formatPriceForLanguage(subtotal, language)}</span>
              </div>
              <div className="mt-8 grid gap-3">
                <MagneticButton className="w-full" variant="primary">
                  {copy.checkoutReady}
                </MagneticButton>
                {enriched.length ? (
                  <button className="text-sm text-[#f8f6f2]/58 underline-offset-4 hover:underline" onClick={clearCart} type="button">
                    {copy.clearCart}
                  </button>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
