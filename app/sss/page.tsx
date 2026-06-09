import type { Metadata } from "next";
import FaqExperience from "@/components/FaqExperience";
import { allFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "SSS",
  description:
    "NUTRIX ürünleri, placeholder içerikler, sepet ve supplement kullanımı hakkında sık sorulan sorular.",
};

export default function FaqPage() {
  return <FaqExperience faq={allFaq} />;
}
