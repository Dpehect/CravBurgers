import type { Metadata } from "next";
import GuideExperience from "@/components/GuideExperience";
import { allArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Supplement Rehberi",
  description:
    "Whey protein, kreatin, pre-workout, protein zamanlaması ve güvenli supplement kullanımı için modüllü Türkçe rehber.",
};

export default function GuidePage() {
  return <GuideExperience articles={allArticles} />;
}
