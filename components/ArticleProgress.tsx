"use client";

import { useEffect, useState } from "react";

export default function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    update();
    window.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden h-48 w-px -translate-y-1/2 bg-slate-200 lg:block">
      <div
        className="w-px origin-top bg-orange-500 transition-transform duration-150"
        style={{ height: "100%", transform: `scaleY(${progress})` }}
      />
    </div>
  );
}
