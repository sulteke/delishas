import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow mb-3 ${light ? "!text-gold-soft" : ""}`}>
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-serif text-3xl leading-tight sm:text-4xl md:text-[2.75rem] ${
          light ? "!text-cream-50" : ""
        }`}
      >
        {title}
      </h2>
      {isCenter && (
        <div className="rule-dot mt-5 w-full max-w-xs" aria-hidden="true">
          <span className="text-[0.7rem]">✦</span>
        </div>
      )}
      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-pretty text-sm sm:text-base ${
            light ? "text-cream/70" : "text-ink-soft"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
