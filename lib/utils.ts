type ClassValue = string | number | false | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(price);
}

export function categoryLabel(slug: string) {
  const labels: Record<string, string> = {
    "whey-protein": "Whey Protein",
    kreatin: "Kreatin",
    "pre-workout": "Pre-Workout",
    "amino-asit": "Amino Asit",
    vitamin: "Vitamin",
    stack: "Stack",
  };

  return (
    labels[slug] ??
    slug
      .split("-")
      .map((part) => part.charAt(0).toLocaleUpperCase("tr-TR") + part.slice(1))
      .join(" ")
  );
}

export function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
