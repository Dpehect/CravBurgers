import articles from "@/data/articles.json";
import categories from "@/data/categories.json";
import faq from "@/data/faq.json";
import goals from "@/data/goals.json";
import ingredients from "@/data/ingredients.json";
import navigation from "@/data/navigation.json";
import products from "@/data/products.json";
import testimonials from "@/data/testimonials.json";

export type PreferredFormat = "Toz" | "Kapsül" | "Paket";
export type TrainingLevel = "Başlangıç" | "Orta" | "İleri";

export type ProductFaq = {
  question: string;
  answer: string;
};

export type FormulaItem = {
  label: string;
  value: string;
  note: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  goal: string[];
  format: PreferredFormat;
  flavor: string;
  price: number;
  rating: number;
  shortDescription: string;
  longDescription: string;
  usagePurpose: string;
  benefits: string[];
  ingredients: string[];
  formula: FormulaItem[];
  usage: string[];
  suitableFor: string[];
  nutritionFacts: Record<string, string>;
  faqs: ProductFaq[];
  image: string;
  gallery: string[];
  featured: boolean;
  bestSeller: boolean;
  stockStatus: string;
  accent: "copper" | "olive" | "graphite";
  shape: "tub" | "jar" | "bottle" | "pouch" | "stack";
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
};

export type Goal = {
  id: string;
  slug: string;
  name: string;
  description: string;
  meterLabel: string;
  accent: "orange" | "ice";
  recommendedProducts: Record<TrainingLevel, Record<PreferredFormat, string[]>>;
};

export type Ingredient = {
  id: string;
  name: string;
  category: string;
  description: string;
  dose: string;
  proofPoint: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  metric: string;
};

export type ArticleModule = {
  title: string;
  body: string;
  checkpoints: string[];
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  category: string;
  readTime: string;
  level: string;
  image: string;
  content: string[];
  modules: ArticleModule[];
  sources: Array<{
    label: string;
    url: string;
  }>;
  author?: string;
  date?: string;
};

export type BlogPost = Article;

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const allProducts = products as unknown as Product[];
export const allCategories = categories as unknown as Category[];
export const allGoals = goals as unknown as Goal[];
export const allIngredients = ingredients as unknown as Ingredient[];
export const allTestimonials = testimonials as unknown as Testimonial[];
export const allArticles = articles as unknown as Article[];
export const allBlogPosts = allArticles;
export const allFaq = faq as FaqItem[];
export const navItems = navigation as NavItem[];

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return allArticles.find((post) => post.slug === slug);
}

export const getBlogPostBySlug = getArticleBySlug;

export function getCategoryBySlug(slug: string) {
  return allCategories.find((category) => category.slug === slug);
}

export function getGoalBySlug(slug: string) {
  return allGoals.find((goal) => goal.slug === slug);
}

export function getFeaturedProducts() {
  return allProducts.filter((product) => product.featured);
}

export function getBestSellers() {
  return allProducts.filter((product) => product.bestSeller);
}

export function getProductsByCategory(category: string) {
  return allProducts.filter((product) => product.category === category);
}

export function getRelatedProducts(product: Product, limit = 3) {
  return allProducts
    .filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        (candidate.category === product.category ||
          candidate.goal.some((goal) => product.goal.includes(goal))),
    )
    .slice(0, limit);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return allArticles
    .filter(
      (candidate) =>
        candidate.slug !== post.slug && candidate.category === post.category,
    )
    .concat(allArticles.filter((candidate) => candidate.slug !== post.slug))
    .filter(
      (candidate, index, self) =>
        self.findIndex((item) => item.slug === candidate.slug) === index,
    )
    .slice(0, limit);
}

export function getRecommendedProducts(
  goalSlug: string,
  level: TrainingLevel,
  format: PreferredFormat,
) {
  const goal = getGoalBySlug(goalSlug);
  const recommendedSlugs = goal?.recommendedProducts?.[level]?.[format] ?? [];

  return recommendedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));
}
