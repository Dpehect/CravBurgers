export type CartLine = {
  slug: string;
  qty: number;
};

const CART_KEY = "nutrix-cart";

export function readCart(): CartLine[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("nutrix-cart"));
}

export function addToCart(slug: string, qty = 1) {
  const lines = readCart();
  const existing = lines.find((line) => line.slug === slug);

  if (existing) {
    existing.qty += qty;
  } else {
    lines.push({ slug, qty });
  }

  writeCart(lines);
}

export function cartCount() {
  return readCart().reduce((total, line) => total + line.qty, 0);
}
