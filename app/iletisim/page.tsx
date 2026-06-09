import type { Metadata } from "next";
import ContactPageExperience from "@/components/ContactPageExperience";

export const metadata: Metadata = {
  title: "İletişim",
  description: "NUTRIX destek ekibine ürün, sipariş ve içerik soruları için ulaşın.",
};

export default function ContactPage() {
  return <ContactPageExperience />;
}

