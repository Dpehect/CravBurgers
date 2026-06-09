import type { Metadata } from "next";
import AboutExperience from "@/components/AboutExperience";
import { allProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "NUTRIX Human Performance Lab yaklaşımı, marka dili ve ürün şeffaflığı.",
};

export default function AboutPage() {
  const product = allProducts[7] ?? allProducts[0];

  return <AboutExperience product={product} />;
}
