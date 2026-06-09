import { redirect } from "next/navigation";

type LegacyBlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LegacyBlogPage({ params }: LegacyBlogPageProps) {
  const { slug } = await params;
  redirect(`/rehber/${slug}`);
}
