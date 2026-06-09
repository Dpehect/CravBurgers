import type { Metadata } from "next";
import CartExperience from "@/components/CartExperience";
import { allProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sepet",
  description: "NUTRIX sepetindeki ürünleri ve adetleri inceleyin.",
};

export default function CartPage() {
  return <CartExperience products={allProducts} />;
}
