"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, RotateCcw, ScanLine } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Goal, PreferredFormat, Product, TrainingLevel } from "@/lib/data";
import { cn } from "@/lib/utils";

type GoalFinderProps = {
  goals: Goal[];
  products: Product[];
};

const levels: TrainingLevel[] = ["Başlangıç", "Orta", "İleri"];
const formats: PreferredFormat[] = ["Toz", "Kapsül", "Paket"];

export default function GoalFinder({ goals, products }: GoalFinderProps) {
  const [step, setStep] = useState(0);
  const [goalSlug, setGoalSlug] = useState(goals[0]?.slug ?? "");
  const [level, setLevel] = useState<TrainingLevel>("Orta");
  const [format, setFormat] = useState<PreferredFormat>("Paket");

  const selectedGoal = goals.find((goal) => goal.slug === goalSlug) ?? goals[0];
  const recommendedProducts = useMemo(() => {
    const slugs = selectedGoal?.recommendedProducts[level][format] ?? [];
    return slugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => Boolean(product));
  }, [format, level, products, selectedGoal]);

  const progress = ((step + 1) / 4) * 100;

  function reset() {
    setStep(0);
    setGoalSlug(goals[0]?.slug ?? "");
    setLevel("Orta");
    setFormat("Paket");
  }

  return (
    <div className="relative overflow-hidden rounded-[8px] border border-slate-200 bg-white/90 p-4 shadow-2xl shadow-slate-300/40 sm:p-6 lg:p-8">
      <div className="absolute inset-0 scanner-grid opacity-50" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[18rem_1fr]">
        <aside className="rounded-[8px] border border-slate-200 bg-white/90 p-5">
          <div
            className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#f97316 ${progress}%, rgba(255,255,255,0.08) ${progress}%)`,
            }}
          >
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-[#eef3f8]">
              <ScanLine className="mb-2 h-6 w-6 text-orange-500" />
              <span className="font-mono text-3xl font-semibold text-slate-950">
                {Math.round(progress)}%
              </span>
              <span className="mt-1 text-xs text-slate-500">
                Seçim
              </span>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["Kullanım amacı", selectedGoal?.name ?? "Yok"],
              ["Seviye", level],
              ["Form", format],
            ].map(([label, value]) => (
              <div
                className="flex items-center justify-between rounded-[8px] border border-slate-200 bg-white/80 px-3 py-3 text-sm"
                key={label}
              >
                <span className="text-slate-500">{label}</span>
                <span className="font-semibold text-slate-900">{value}</span>
              </div>
            ))}
          </div>
        </aside>

        <section className="min-h-[34rem]">
          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: 20 }}
                key="goal"
              >
                <StepHeader
                  eyebrow="Adım 01"
                  title="Ne için ürün arıyorsunuz?"
                  text="Listelenecek ürün grubunu seçin."
                />
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {goals.map((goal) => (
                    <motion.button
                      aria-label={goal.name}
                      className={cn(
                        "min-h-40 rounded-[8px] border p-5 text-left transition",
                        goalSlug === goal.slug
                          ? "border-orange-500/70 bg-orange-500/10"
                          : "border-slate-200 bg-white/80 hover:border-orange-500/35",
                      )}
                      data-testid={`goal-${goal.slug}`}
                      key={goal.id}
                      layout
                      onClick={() => {
                        setGoalSlug(goal.slug);
                        setStep(1);
                      }}
                      type="button"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-semibold leading-tight text-slate-950">
                          {goal.name}
                        </h3>
                        {goalSlug === goal.slug ? (
                          <CheckCircle2 className="h-5 w-5 text-orange-500" />
                        ) : null}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {goal.description}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {step === 1 ? (
              <ChoiceStep
                eyebrow="Adım 02"
                keyName="level"
                onBack={() => setStep(0)}
                onSelect={(value) => {
                  setLevel(value as TrainingLevel);
                  setStep(2);
                }}
                options={levels}
                selected={level}
                text="Ürün listesini seçtiğiniz seviyeye göre daraltır."
                title="Antrenman seviyesi"
              />
            ) : null}

            {step === 2 ? (
              <ChoiceStep
                eyebrow="Adım 03"
                keyName="format"
                onBack={() => setStep(1)}
                onSelect={(value) => {
                  setFormat(value as PreferredFormat);
                  setStep(3);
                }}
                options={formats}
                selected={format}
                text="Toz, kapsül veya paket seçeneklerinden birini seçin."
                title="Ürün formu"
              />
            ) : null}

            {step === 3 ? (
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                initial={{ opacity: 0, x: 20 }}
                key="results"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <StepHeader
                    eyebrow="Liste"
                    text={`${selectedGoal?.meterLabel ?? "Ürün grubu"}, ${level.toLocaleLowerCase("tr-TR")} seviye ve ${format.toLocaleLowerCase("tr-TR")} form seçimine göre listelendi.`}
                    title="Listelenen ürünler"
                  />
                  <button
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-orange-500/40 hover:text-orange-600"
                    onClick={reset}
                    type="button"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Yeniden başla
                  </button>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {recommendedProducts.map((product) => (
                    <ProductCard compact key={product.id} product={product} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}

type ChoiceStepProps = {
  eyebrow: string;
  title: string;
  text: string;
  options: readonly string[];
  selected: string;
  keyName: string;
  onBack: () => void;
  onSelect: (value: string) => void;
};

function ChoiceStep({
  eyebrow,
  title,
  text,
  options,
  selected,
  keyName,
  onBack,
  onSelect,
}: ChoiceStepProps) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      initial={{ opacity: 0, x: 20 }}
      key={keyName}
    >
      <StepHeader eyebrow={eyebrow} text={text} title={title} />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {options.map((option) => (
          <button
            aria-label={option}
            className={cn(
              "min-h-40 rounded-[8px] border p-5 text-left transition",
              selected === option
                ? "border-orange-400/70 bg-orange-400/10"
                : "border-slate-200 bg-white/80 hover:border-orange-400/35",
            )}
            data-testid={`${keyName}-${option.toLowerCase()}`}
            key={option}
            onClick={() => onSelect(option)}
            type="button"
          >
            <span className="font-mono text-xs text-slate-500">Seç</span>
            <h3 className="mt-8 text-2xl font-semibold text-slate-950">
              {option}
            </h3>
          </button>
        ))}
      </div>
      <button
        className="mt-6 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        onClick={onBack}
        type="button"
      >
        Geri
      </button>
    </motion.div>
  );
}

function StepHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-orange-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}
