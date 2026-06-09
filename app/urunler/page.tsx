import type { Metadata } from "next";
import ProductsExperience from "@/components/ProductsExperience";
import { allCategories, allProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Whey protein, kreatin, pre-workout, amino asit ve vitamin ürünlerini kategori ve form bazında inceleyin.",
};

type ProductsPageProps = {
  searchParams: Promise<{
    kategori?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <ProductsExperience
      categories={allCategories}
      initialCategory={params.kategori}
      products={allProducts}
    />
  );
}
