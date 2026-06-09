"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextReveal from "@/components/TextReveal";
import type { Article } from "@/lib/data";
import { commonCopy, localizeArticle, localizeArticles } from "@/lib/i18n";

type ArticleDetailProps = {
  article: Article;
  relatedArticles: Article[];
};

export default function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const { language } = useLanguage();
  const display = useMemo(() => localizeArticle(article, language), [article, language]);
  const related = useMemo(() => localizeArticles(relatedArticles, language), [relatedArticles, language]);
  const copy = commonCopy[language];

  return (
    <div className="bg-[#f8f6f2] px-4 pb-28 pt-32 text-[#1d1d1d] sm:px-6 lg:px-8">
      <article className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#8f4f2d]">
              {display.eyebrow}
            </p>
            <TextReveal
              as="h1"
              className="mt-5 text-6xl font-semibold leading-[0.95] text-[#1d1d1d] sm:text-8xl"
            >
              {display.title}
            </TextReveal>
          </div>
          <div className="border-l border-[#1d1d1d]/10 pl-0 lg:pl-8">
            <p className="max-w-2xl text-lg leading-8 text-[#6c665a]">{display.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[display.category, display.level, display.readTime].map((item) => (
                <span className="rounded-full bg-[#f3eee5] px-3 py-1 text-xs font-semibold text-[#5f594d]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border-y border-[#1d1d1d]/10 py-5">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#8f4f2d]">
                {language === "tr" ? "Modüller" : "Modules"}
              </p>
              <div className="mt-5 grid gap-3">
                {display.modules.map((module, index) => (
                  <a className="group flex items-center justify-between py-3 text-sm font-semibold text-[#1d1d1d]" href={`#module-${index}`} key={module.title}>
                    {module.title}
                    <ArrowUpRight className="h-4 w-4 text-[#b46a3c] opacity-0 transition group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="article-copy rounded-[8px] border border-[#1d1d1d]/10 bg-[#f3eee5] p-6 sm:p-8">
              {display.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {display.modules.map((module, index) => (
                <section
                  className="rounded-[8px] border border-[#1d1d1d]/10 bg-[#f8f6f2]/74 p-6"
                  id={`module-${index}`}
                  key={module.title}
                >
                  <h2 className="text-3xl font-semibold text-[#1d1d1d]">{module.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#6c665a]">{module.body}</p>
                  <div className="mt-6 grid gap-2">
                    {module.checkpoints.map((checkpoint) => (
                      <div className="flex items-center gap-3 text-sm text-[#4f4a40]" key={checkpoint}>
                        <CheckCircle2 className="h-4 w-4 text-[#596342]" />
                        {checkpoint}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-[#1d1d1d]/10 bg-[#1d1d1d] p-6 text-[#f8f6f2]">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-[#d99b6b]">{copy.sources}</p>
              <div className="mt-5 grid gap-3">
                {display.sources.map((source) => (
                  <a
                    className="group flex items-center justify-between gap-5 border-t border-white/10 pt-3 text-sm text-[#f8f6f2]/76 transition hover:text-[#f8f6f2]"
                    href={source.url}
                    key={source.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {source.label}
                    <ArrowUpRight className="h-4 w-4 text-[#d99b6b]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section className="mx-auto mt-20 max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#8f4f2d]">
            {copy.relatedTopics}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                className="rounded-[8px] border border-[#1d1d1d]/10 bg-[#f3eee5] p-5 transition hover:border-[#b46a3c]/40"
                href={`/rehber/${item.slug}`}
                key={item.id}
              >
                <span className="font-mono text-xs text-[#b46a3c]">{item.category}</span>
                <h3 className="mt-5 text-2xl font-semibold text-[#1d1d1d]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6c665a]">{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
