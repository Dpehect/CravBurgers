import HomeExperience from "@/components/HomeExperience";
import { allArticles, allCategories, allProducts, allTestimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <HomeExperience
      articles={allArticles}
      categories={allCategories}
      products={allProducts}
      testimonials={allTestimonials}
    />
  );
}
