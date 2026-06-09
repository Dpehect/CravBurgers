"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, SearchX, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Category, Goal, Product } from "@/lib/data";
import { cn } from "@/lib/utils";

type ShopExperienceProps = {
  products: Product[];
  categories: Category[];
  goals: Goal[];
  initialCategory?: string;
};

const formats = ["Toz", "Kapsül", "Paket"] as const;

export default function ShopExperience({
  products,
  categories,
  goals,
  initialCategory = "all",
}: ShopExperienceProps) {
  const maxPrice = Math.max(...products.map((product) => product.price));
  const [category, setCategory] = useState(initialCategory || "all");
  const [goal, setGoal] = useState("all");
  const [format, setFormat] = useState("all");
  const [benefit, setBenefit] = useState("all");
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [sort, setSort] = useState("featured");

  const benefitOptions = useMemo(
    () =>
      Array.from(new Set(products.flatMap((product) => product.benefits))).sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesGoal = goal === "all" || product.goal.includes(goal);
      const matchesFormat = format === "all" || product.format === format;
      const matchesBenefit = benefit === "all" || product.benefits.includes(benefit);
      const matchesPrice = product.price <= priceCap;

      return (
        matchesCategory &&
        matchesGoal &&
        matchesFormat &&
        matchesBenefit &&
        matchesPrice
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "best-seller")
        return Number(b.bestSeller) - Number(a.bestSeller);
      return Number(b.featured) - Number(a.featured);
    });
  }, [benefit, category, format, goal, priceCap, products, sort]);

  return (
    <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
      <aside className="h-fit rounded-[8px] border border-slate-200 bg-white/85 p-5 lg:sticky lg:top-28">
        <div className="mb-6 flex items-center gap-3">
          <SlidersHorizontal className="h-5 w-5 text-orange-500" />
          <h2 className="text-sm font-semibold text-slate-950">
            Filtreler
          </h2>
        </div>

        <div className="grid gap-5">
          <FilterSelect label="Kategori" testId="category" value={category} onChange={setCategory}>
            <option value="all">Tüm kategoriler</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Hedef" testId="goal" value={goal} onChange={setGoal}>
            <option value="all">Tüm kullanım amaçları</option>
            {goals.map((item) => (
              <option key={item.id} value={item.slug}>
                {item.name}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Form" testId="format" value={format} onChange={setFormat}>
            <option value="all">Tüm formlar</option>
            {formats.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Fayda" testId="benefit" value={benefit} onChange={setBenefit}>
            <option value="all">Tüm faydalar</option>
            {benefitOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </FilterSelect>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-500">
                Fiyat
              </label>
              <span className="font-mono text-sm text-orange-500">${priceCap}</span>
            </div>
            <input
              className="accent-orange-500"
              max={maxPrice}
              min={30}
              onChange={(event) => setPriceCap(Number(event.target.value))}
              type="range"
              value={priceCap}
            />
          </div>

          <button
            className="rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-orange-500/40 hover:text-orange-600"
            onClick={() => {
              setCategory("all");
              setGoal("all");
              setFormat("all");
              setBenefit("all");
              setPriceCap(maxPrice);
              setSort("featured");
            }}
            type="button"
          >
            Sıfırla
          </button>
        </div>
      </aside>

      <section>
        <div className="mb-6 flex flex-col gap-4 rounded-[8px] border border-slate-200 bg-white/75 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            <span className="font-mono text-orange-500">{filteredProducts.length}</span>{" "}
            ürün listelendi
          </p>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-500">
            <ArrowDownUp className="h-4 w-4 text-orange-500" />
            Sırala
            <select
              className="rounded-full border border-slate-200 bg-[#eef3f8] px-4 py-2 text-slate-900 outline-none"
              onChange={(event) => setSort(event.target.value)}
              value={sort}
            >
              <option value="featured">Öne çıkanlar</option>
              <option value="best-seller">Çok satanlar</option>
              <option value="rating">Puana göre</option>
              <option value="price-asc">Fiyat: düşükten yükseğe</option>
              <option value="price-desc">Fiyat: yüksekten düşüğe</option>
            </select>
          </label>
        </div>

        {filteredProducts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-96 flex-col items-center justify-center rounded-[8px] border border-dashed border-slate-200 bg-white/75 p-8 text-center">
            <SearchX className="mb-4 h-10 w-10 text-slate-400" />
            <h3 className="text-2xl font-semibold text-slate-950">
              Uygun ürün bulunamadı
            </h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Sonuçları genişletmek için filtreleri değiştirin.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  testId: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
};

function FilterSelect({ label, testId, value, onChange, children }: FilterSelectProps) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>
      <select
        className={cn(
          "rounded-[8px] border border-slate-200 bg-[#eef3f8] px-3 py-3 text-sm text-slate-900 outline-none transition",
          "focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20",
        )}
        data-testid={`filter-${testId}`}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {children}
      </select>
    </label>
  );
}
