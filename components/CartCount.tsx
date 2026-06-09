"use client";

import { useEffect, useState } from "react";
import { cartCount } from "@/lib/cart";

export default function CartCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(cartCount());
    update();
    window.addEventListener("storage", update);
    window.addEventListener("nutrix-cart", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("nutrix-cart", update);
    };
  }, []);

  if (!count) {
    return null;
  }

  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#b46a3c] px-1 text-[10px] font-bold text-[#fffaf2]">
      {count}
    </span>
  );
}
