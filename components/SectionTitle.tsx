import { cn } from "@/lib/utils";

type SectionTitleProps = {
  kicker?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export default function SectionTitle({
  kicker,
  title,
  children,
  align = "left",
  as = "h2",
  className,
}: SectionTitleProps) {
  const Heading = as;

  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {kicker ? (
        <p className="font-hand text-xl font-semibold text-orange-500 sm:text-2xl">
          {kicker}
        </p>
      ) : null}
      <Heading className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-[40px]">
        {title}
      </Heading>
      {children ? (
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          {children}
        </p>
      ) : null}
    </div>
  );
}
