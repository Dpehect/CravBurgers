import type { Article, ArticleModule, Category, FaqItem, Product, ProductFaq } from "@/lib/data";

export type Language = "tr" | "en";

export type LocalizedNavItem = {
  id: string;
  label: string;
  href: string;
};

export type StackGoalCopy = {
  id: string;
  label: string;
  signal: string;
  goals: string[];
};

type ProductCopy = Partial<
  Pick<
    Product,
    | "benefits"
    | "categoryLabel"
    | "faqs"
    | "flavor"
    | "formula"
    | "ingredients"
    | "longDescription"
    | "nutritionFacts"
    | "shortDescription"
    | "stockStatus"
    | "suitableFor"
    | "usage"
    | "usagePurpose"
  >
>;

type ArticleCopy = Partial<
  Pick<Article, "category" | "content" | "excerpt" | "eyebrow" | "level" | "modules" | "readTime" | "title">
>;

export const navItemsByLanguage: Record<Language, LocalizedNavItem[]> = {
  tr: [
    { id: "home", label: "Ana", href: "/" },
    { id: "products", label: "Ürünler", href: "/urunler" },
    { id: "guide", label: "Rehber", href: "/rehber" },
    { id: "about", label: "Lab", href: "/hakkimizda" },
    { id: "faq", label: "SSS", href: "/sss" },
    { id: "contact", label: "İletişim", href: "/iletisim" },
  ],
  en: [
    { id: "home", label: "Home", href: "/" },
    { id: "products", label: "Products", href: "/urunler" },
    { id: "guide", label: "Guide", href: "/rehber" },
    { id: "about", label: "Lab", href: "/hakkimizda" },
    { id: "faq", label: "FAQ", href: "/sss" },
    { id: "contact", label: "Contact", href: "/iletisim" },
  ],
};

export const commonCopy = {
  tr: {
    add: "Sepete ekle",
    added: "Eklendi",
    cart: "Sepet",
    checkoutReady: "Ödeme alanı hazır",
    clearCart: "Sepeti temizle",
    discover: "Keşfet",
    exploreProducts: "Ürünleri İncele",
    filter: "Filtre",
    openTopic: "Konuyu aç",
    products: "Ürünler",
    all: "Tümü",
    emptyFilter: "Bu filtreyle eşleşen ürün bulunamadı.",
    stack: "Stack Kur",
    subtotal: "Ara toplam",
    shipping: "Kargo",
    later: "Sonra",
    total: "Toplam",
    sources: "Kaynaklar",
    relatedTopics: "İlgili konular",
    relatedProducts: "Benzer ürünler",
    completeRoutine: "Rutini tamamla",
  },
  en: {
    add: "Add",
    added: "Added",
    cart: "Cart",
    checkoutReady: "Checkout shell ready",
    clearCart: "Clear cart",
    discover: "Discover",
    exploreProducts: "Explore Products",
    filter: "Filter",
    openTopic: "Open topic",
    products: "Products",
    all: "All",
    emptyFilter: "No products match this filter.",
    stack: "Build Stack",
    subtotal: "Subtotal",
    shipping: "Shipping",
    later: "Later",
    total: "Total",
    sources: "Sources",
    relatedTopics: "Related topics",
    relatedProducts: "Related products",
    completeRoutine: "Complete the routine",
  },
} satisfies Record<Language, Record<string, string>>;

export const homeCopy = {
  tr: {
    heroKicker: "Human Performance Lab",
    heroTitle: "Performansın Yeni Formu",
    heroSubline: "Güç. Odak. Ritim.",
    heroNote: "Supplement seçimi artık raf kalabalığı değil; hedefe göre kurulan sade bir sistem.",
    secondaryCta: "Stack Kur",
    scrollHint: "Aşağı kaydır",
    productReveal: {
      eyebrow: "Product Reveal",
      title: "Önce form görünür.",
      body: "Etiket sessiz kalır, obje konuşur. İçerik detayları kullanıcı yaklaştıkça açılır.",
    },
    ingredients: {
      eyebrow: "Floating Ingredients",
      title: "Aktif içerik havada kalmaz.",
      items: ["Protein", "Kreatin", "Kafein", "Magnezyum"],
    },
    goals: {
      eyebrow: "Performance Goals",
      title: "Her hedefin ayrı ritmi var.",
    },
    gallery: {
      eyebrow: "Horizontal Product Gallery",
      title: "Ürünler rafta değil, sahnede.",
    },
    stack: {
      eyebrow: "Interactive Stack Builder",
      title: "Rutini hedefe göre kur.",
    },
    knowledge: {
      eyebrow: "Supplement Knowledge",
      title: "Okuma değil, hızlı karar pratiği.",
    },
    best: {
      eyebrow: "Best Sellers",
      title: "İlk rutinini kuranların sık seçtiği formlar.",
    },
    trust: {
      eyebrow: "Scientific Trust",
      title: "Etiketi saklamayan sakin bir sistem.",
      points: ["Doz görünür", "Uyarıcı yükü açık", "Kullanım anı net"],
    },
  },
  en: {
    heroKicker: "Human Performance Lab",
    heroTitle: "The New Shape of Performance",
    heroSubline: "Strength. Focus. Rhythm.",
    heroNote: "Supplement choice becomes a clean system built around the goal, not a crowded shelf.",
    secondaryCta: "Build Stack",
    scrollHint: "Scroll",
    productReveal: {
      eyebrow: "Product Reveal",
      title: "Form appears first.",
      body: "The label stays quiet. The object leads, details unfold as the user moves closer.",
    },
    ingredients: {
      eyebrow: "Floating Ingredients",
      title: "Active ingredients stay visible.",
      items: ["Protein", "Creatine", "Caffeine", "Magnesium"],
    },
    goals: {
      eyebrow: "Performance Goals",
      title: "Every goal has its own rhythm.",
    },
    gallery: {
      eyebrow: "Horizontal Product Gallery",
      title: "Products are staged, not shelved.",
    },
    stack: {
      eyebrow: "Interactive Stack Builder",
      title: "Build the routine by goal.",
    },
    knowledge: {
      eyebrow: "Supplement Knowledge",
      title: "Less reading. Faster decisions.",
    },
    best: {
      eyebrow: "Best Sellers",
      title: "The forms most first routines start with.",
    },
    trust: {
      eyebrow: "Scientific Trust",
      title: "A calm system that keeps the label visible.",
      points: ["Dose visible", "Stimulant load clear", "Timing defined"],
    },
  },
} satisfies Record<Language, unknown>;

export const stackGoalsByLanguage: Record<Language, StackGoalCopy[]> = {
  tr: [
    { id: "strength", label: "Strength", signal: "Kreatin + protein tabanı", goals: ["guc", "kas-gelisimi"] },
    { id: "focus", label: "Focus", signal: "Kontrollü uyarıcı + net zamanlama", goals: ["odak"] },
    { id: "recovery", label: "Recovery", signal: "Protein + akşam ritmi", goals: ["toparlanma"] },
    { id: "energy", label: "Energy", signal: "Pre-workout + elektrolit akışı", goals: ["enerji", "dayaniklilik"] },
    { id: "performance", label: "Performance", signal: "Stack sistemi + günlük takip", goals: ["kas-gelisimi", "guc", "odak"] },
  ],
  en: [
    { id: "strength", label: "Strength", signal: "Creatine + protein base", goals: ["guc", "kas-gelisimi"] },
    { id: "focus", label: "Focus", signal: "Controlled stimulant + clear timing", goals: ["odak"] },
    { id: "recovery", label: "Recovery", signal: "Protein + evening rhythm", goals: ["toparlanma"] },
    { id: "energy", label: "Energy", signal: "Pre-workout + electrolyte flow", goals: ["enerji", "dayaniklilik"] },
    { id: "performance", label: "Performance", signal: "Stack system + daily tracking", goals: ["kas-gelisimi", "guc", "odak"] },
  ],
};

export const guideTopicsByLanguage = {
  tr: [
    { title: "Protein", note: "Eksik öğünü tamamla." },
    { title: "Creatine", note: "Gücü düzenli kur." },
    { title: "Pre Workout", note: "Uyarıcıyı ölç." },
    { title: "Vitamins", note: "Temeli sade tut." },
    { title: "Recovery", note: "Kapanışı planla." },
    { title: "Nutrition", note: "Üründen önce ritim." },
  ],
  en: [
    { title: "Protein", note: "Close the meal gap." },
    { title: "Creatine", note: "Build strength daily." },
    { title: "Pre Workout", note: "Measure stimulation." },
    { title: "Vitamins", note: "Keep the base simple." },
    { title: "Recovery", note: "Plan the close." },
    { title: "Nutrition", note: "Rhythm before product." },
  ],
} satisfies Record<Language, Array<{ title: string; note: string }>>;

const categoryEnglish: Record<string, Pick<Category, "description" | "name">> = {
  "whey-protein": {
    name: "Whey Protein",
    description: "Clean protein support for the moments meals miss.",
  },
  kreatin: {
    name: "Creatine",
    description: "A daily strength signal without stimulant noise.",
  },
  "pre-workout": {
    name: "Pre-Workout",
    description: "Measured energy, focus and training intent.",
  },
  "amino-asit": {
    name: "Amino Acid",
    description: "A lighter intra-workout layer for long sessions.",
  },
  vitamin: {
    name: "Vitamin",
    description: "The quiet base beneath a disciplined routine.",
  },
  stack: {
    name: "Stack",
    description: "Multiple products arranged as one repeatable system.",
  },
};

const productEnglish: Record<string, ProductCopy> = {
  "whey-precision-isolate": {
    categoryLabel: "Whey Protein",
    flavor: "Roasted cacao",
    shortDescription: "High protein, low sugar, light texture.",
    longDescription:
      "A clean isolate for closing the daily protein gap without heavy sweetness or filler noise.",
    usagePurpose: "Supports protein intake during muscle building and recovery phases.",
    benefits: ["25 g protein", "Low sugar", "Light texture", "Easy mix"],
    ingredients: ["Whey protein isolate", "Cocoa powder", "Digestive enzyme blend", "Sea salt"],
    formula: [
      { label: "Protein", value: "25 g", note: "Per serving" },
      { label: "Sugar", value: "1.2 g", note: "Low sugar profile" },
      { label: "Lactose", value: "Low", note: "Isolate-based formula" },
    ],
    usage: [
      "Mix one scoop with 250-300 ml cold water or milk.",
      "Use after training or when your daily protein target needs support.",
      "Keep it as support for planned meals, not a replacement for them.",
    ],
    suitableFor: ["Missed protein targets", "Resistance training", "Busy days"],
    nutritionFacts: {
      Serving: "32 g",
      Protein: "25 g",
      Carbohydrate: "2.1 g",
      Sugar: "1.2 g",
      Fat: "1.4 g",
    },
    faqs: [
      { question: "Can it be used daily?", answer: "Yes, when your total daily protein intake needs support." },
      { question: "Water or milk?", answer: "Water feels lighter; milk makes the texture fuller." },
    ],
    stockStatus: "In stock",
  },
  "creatine-mono-lab": {
    categoryLabel: "Creatine",
    flavor: "Unflavored",
    shortDescription: "5 g pure creatine monohydrate, every day.",
    longDescription:
      "A simple creatine base designed around consistency rather than complicated timing.",
    usagePurpose: "Supports strength, repeat quality and high-intensity performance routines.",
    benefits: ["5 g creatine", "Unflavored", "Micronized", "Daily use"],
    ingredients: ["Micronized creatine monohydrate"],
    formula: [
      { label: "Creatine", value: "5 g", note: "Single active ingredient" },
      { label: "Sweetener", value: "None", note: "Unflavored use" },
      { label: "Texture", value: "Micronized", note: "Disperses more easily" },
    ],
    usage: ["Use one scoop daily.", "Add to water, juice or a protein shake.", "Consistency matters more than timing."],
    suitableFor: ["Strength training", "Foundational routines", "Stimulant-free users"],
    nutritionFacts: { Serving: "5 g", "Creatine monohydrate": "5 g", Calories: "0", Sugar: "0 g" },
    faqs: [
      { question: "Is loading required?", answer: "No. Daily 3-5 g use is usually the more practical route." },
      { question: "On rest days?", answer: "Yes. Creatine works through consistent use." },
    ],
    stockStatus: "In stock",
  },
  "focus-drive-pre-workout": {
    categoryLabel: "Pre-Workout",
    flavor: "Citrus salt",
    shortDescription: "Measured energy, focus and set quality.",
    longDescription:
      "A controlled pre-workout for tired training days, built around caffeine, citrulline, beta-alanine and L-theanine.",
    usagePurpose: "Supports pre-training alertness, focus and pump feel.",
    benefits: ["180 mg caffeine", "6 g citrulline", "L-theanine", "Controlled energy"],
    ingredients: ["L-citrulline malate", "Beta-alanine", "Caffeine anhydrous", "L-theanine", "Rhodiola extract"],
    formula: [
      { label: "Caffeine", value: "180 mg", note: "Moderate-high stimulant profile" },
      { label: "Citrulline", value: "6 g", note: "Training feel and pump" },
      { label: "Beta-alanine", value: "3.2 g", note: "Intense set support" },
    ],
    usage: ["Mix one scoop with 300-350 ml water.", "Use 20-30 minutes before training.", "Start with half a serving if caffeine sensitive."],
    suitableFor: ["Non-late sessions", "Focus-heavy training", "Users with caffeine tolerance"],
    nutritionFacts: { Serving: "14 g", Caffeine: "180 mg", "L-citrulline malate": "6 g", "Beta-alanine": "3.2 g", Calories: "12" },
    faqs: [
      { question: "Is tingling normal?", answer: "Beta-alanine may cause tingling for some users." },
      { question: "With coffee?", answer: "Count total caffeine before combining them." },
    ],
    stockStatus: "In stock",
  },
  "essential-amino-eaa": {
    categoryLabel: "Amino Acid",
    flavor: "White peach",
    shortDescription: "Nine essential amino acids in a light drink.",
    longDescription:
      "A lighter intra-workout option for long gaps between meals or training sessions that need a clean sip.",
    usagePurpose: "Supports essential amino acid intake during training or between meals.",
    benefits: ["9 essential amino acids", "Sugar-free", "Light drink", "Intra-workout"],
    stockStatus: "In stock",
  },
  "daily-mineral-vitamin": {
    categoryLabel: "Vitamin",
    flavor: "Unflavored",
    shortDescription: "D3, K2, magnesium and zinc for a clean daily base.",
    longDescription:
      "A quiet daily foundation focused on the basics that are easy to forget.",
    usagePurpose: "Simplifies the daily mineral and vitamin routine.",
    benefits: ["D3 + K2", "Magnesium", "Zinc", "Daily base"],
    stockStatus: "In stock",
  },
  "electrolyte-flow": {
    categoryLabel: "Vitamin",
    flavor: "Lemon peel",
    shortDescription: "Electrolytes for sweat, heat and longer sessions.",
    longDescription:
      "A sugar-free mineral flow for long training, heat and high-sweat days.",
    usagePurpose: "Supports fluid-mineral balance during longer effort.",
    benefits: ["Sodium", "Potassium", "Magnesium", "Sugar-free"],
    stockStatus: "Low stock",
  },
  "night-repair-complex": {
    categoryLabel: "Vitamin",
    flavor: "Unflavored",
    shortDescription: "Magnesium, glycine and cherry extract for evening rhythm.",
    longDescription:
      "A calmer evening routine layer for intensive training phases, without selling sleep as a miracle.",
    usagePurpose: "Supports an evening recovery routine.",
    benefits: ["Magnesium", "Glycine", "Cherry extract", "No melatonin"],
    stockStatus: "In stock",
  },
  "performance-stack-01": {
    categoryLabel: "Stack",
    flavor: "Mixed pack",
    shortDescription: "Whey, creatine, pre-workout and electrolytes as one system.",
    longDescription:
      "A clear starter system that arranges pre-training, post-training and daily creatine into one routine.",
    usagePurpose: "Builds strength, protein, focus and fluid-mineral rhythm in one system.",
    benefits: ["4-product system", "Routine tracking", "Training days", "Starter pack"],
    stockStatus: "In stock",
  },
};

const articleModule = (title: string, body: string, checkpoints: string[]): ArticleModule => ({
  title,
  body,
  checkpoints,
});

const articleEnglish: Record<string, ArticleCopy> = {
  "whey-protein-nedir": {
    title: "What Is Whey Protein?",
    eyebrow: "Protein base",
    category: "Whey Protein",
    excerpt: "What whey does, when it makes sense and which label details matter.",
    readTime: "6 min",
    level: "Starter",
    content: [
      "Whey protein is a practical protein source derived from milk. Its real job is to close a daily protein gap when regular meals fall short.",
      "A good whey product does not build muscle by itself. It matters when training, sleep and total daily protein are already being handled.",
      "Check protein per serving, sugar, allergens and how cleanly the formula is built before flavor wins the decision.",
    ],
    modules: [
      articleModule("When it makes sense", "When meals miss the protein target, after training, or during busy days that need an easy option.", [
        "Know the daily target",
        "Fix meals first",
        "Place the product where the gap is",
      ]),
      articleModule("Isolate vs concentrate", "Isolates usually carry more protein with less lactose and carbohydrate. Concentrates can be more economical.", [
        "Check protein ratio",
        "Read sugar and lactose",
        "Prefer label over taste",
      ]),
    ],
  },
  "kreatin-ne-ise-yarar": {
    title: "What Does Creatine Do?",
    eyebrow: "Strength and repeat quality",
    category: "Creatine",
    excerpt: "Why creatine is a foundational supplement, how it is used and what weight changes mean.",
    readTime: "7 min",
    level: "Base",
    content: [
      "Creatine supports short, intense efforts where fast energy turnover matters.",
      "It is not a stimulant you feel once. It works through regular use and gradually saturated muscle stores.",
      "Some users see scale weight rise from water stored inside muscle. That is not the same as fat gain.",
    ],
    modules: [
      articleModule("Use logic", "For most users, daily 3-5 g creatine is more practical than complex loading protocols.", [
        "Same dose daily",
        "Water matters",
        "Be consistent",
      ]),
      articleModule("Who should pause", "People with kidney disease, medication use or specific health conditions should ask a clinician first.", [
        "Review health history",
        "Do not over-dose",
        "Keep the label simple",
      ]),
    ],
  },
  "pre-workout-neden-kullanilir": {
    title: "Why Use Pre-Workout?",
    eyebrow: "Energy, focus, control",
    category: "Pre-Workout",
    excerpt: "Where pre-workouts help, where they get exaggerated and why caffeine tolerance matters.",
    readTime: "7 min",
    level: "Intermediate",
    content: [
      "Pre-workouts are used to sharpen energy and focus before training.",
      "Caffeine can support alertness and perceived effort, but tolerance changes from person to person.",
      "The important part is knowing total stimulant load and avoiding careless late use.",
    ],
    modules: [
      articleModule("Caffeine count", "Coffee, energy drinks and pre-workout add up quickly on the same day.", [
        "Count total caffeine",
        "Avoid late use",
        "Start with half serving",
      ]),
      articleModule("Better timing", "It makes more sense when sleep is in place and the session actually needs it.", [
        "Sleep first",
        "Dose second",
        "Product last",
      ]),
    ],
  },
  "protein-ne-zaman-alinmali": {
    title: "When Should Protein Be Taken?",
    eyebrow: "Total before timing",
    category: "Nutrition",
    excerpt: "Why post-workout protein is popular and where protein powder fits the day.",
    readTime: "5 min",
    level: "Starter",
    content: [
      "The biggest detail in protein timing is the total amount across the day.",
      "Post-workout protein can be practical, but it cannot rescue a low-protein day by itself.",
      "Protein powder is a tool for closing the gap, not a replacement for a strong meal pattern.",
    ],
    modules: [
      articleModule("Practical spread", "Spread protein across three to five eating moments if that helps consistency.", [
        "Count meals",
        "Find the gap",
        "Place the shake there",
      ]),
      articleModule("After training", "A good meal after training works. A shake works too when it is the practical option.", [
        "Shake if practical",
        "Meal if possible",
        "Remember the total",
      ]),
    ],
  },
  "supplement-kullanirken-nelere-dikkat-edilmeli": {
    title: "What Matters Before Using Supplements?",
    eyebrow: "Label discipline",
    category: "Safe Use",
    excerpt: "Goal, dose, stimulant load, allergens and quality signals before a product enters the cart.",
    readTime: "8 min",
    level: "Base",
    content: [
      "The first question is not what the product promises. It is the gap you are trying to close.",
      "Active ingredients and doses should be visible per serving.",
      "For stimulants, total caffeine, medication use, blood pressure, anxiety and sleep quality matter.",
    ],
    modules: [
      articleModule("Purchase check", "Quickly check goal, dose, transparency, allergens and test signals.", [
        "Is the goal clear?",
        "Is the dose visible?",
        "Is stimulant load clear?",
      ]),
      articleModule("A better question", "Does this product actually close a gap in the current nutrition, sleep and training plan.", [
        "Base first",
        "Product second",
        "Combination last",
      ]),
    ],
  },
};

const faqEnglish: Record<string, Pick<FaqItem, "answer" | "question">> = {
  "faq-001": {
    question: "Are the product visuals real?",
    answer:
      "The current visuals are placeholders. Real product photos, video posters and content can be placed into the same areas later.",
  },
  "faq-002": {
    question: "Which supplement should I start with?",
    answer:
      "Start with the goal and the gap in your routine. Whey fits protein gaps, creatine fits strength focus, and pre-workout fits measured energy needs.",
  },
  "faq-003": {
    question: "Is pre-workout suitable for everyone?",
    answer:
      "No. Caffeine sensitivity, blood pressure, heart rhythm, anxiety, sleep issues or regular medication require professional guidance.",
  },
  "faq-004": {
    question: "Can creatine be used on rest days?",
    answer:
      "Yes. Creatine works through consistent use, not only around the training hour.",
  },
  "faq-005": {
    question: "Is cart and checkout real?",
    answer:
      "This version is a portfolio and product-experience prototype. The cart works, while checkout integration is left ready.",
  },
  "faq-006": {
    question: "Is it hard to change the content later?",
    answer:
      "No. Products live in data/products.json and guide content lives in data/articles.json, so real brand copy can be added without breaking components.",
  },
};

export function localizeCategory(category: Category, language: Language): Category {
  if (language === "tr") {
    return category;
  }

  return { ...category, ...(categoryEnglish[category.slug] ?? {}) };
}

export function localizeProduct(product: Product, language: Language): Product {
  if (language === "tr") {
    return product;
  }

  return {
    ...product,
    ...(productEnglish[product.slug] ?? {}),
  };
}

export function localizeArticle(article: Article, language: Language): Article {
  if (language === "tr") {
    return article;
  }

  return {
    ...article,
    ...(articleEnglish[article.slug] ?? {}),
  };
}

export function localizeProducts(products: Product[], language: Language) {
  return products.map((product) => localizeProduct(product, language));
}

export function localizeArticles(articles: Article[], language: Language) {
  return articles.map((article) => localizeArticle(article, language));
}

export function localizeCategories(categories: Category[], language: Language) {
  return categories.map((category) => localizeCategory(category, language));
}

export function formatPriceForLanguage(price: number, language: Language) {
  return new Intl.NumberFormat(language === "tr" ? "tr-TR" : "en-US", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}

export function localizeFaqs(faqs: ProductFaq[], language: Language) {
  if (language === "tr") {
    return faqs;
  }

  return faqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }));
}

export function localizeFaqItems(faqs: FaqItem[], language: Language): FaqItem[] {
  if (language === "tr") {
    return faqs;
  }

  return faqs.map((faq) => ({
    ...faq,
    ...(faqEnglish[faq.id] ?? {}),
  }));
}
