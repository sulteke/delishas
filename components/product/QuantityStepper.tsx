"use client";

import { IconPlus, IconMinus } from "@/components/ui/Icons";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  ariaLabel?: string;
}) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const box = size === "sm" ? "text-sm min-w-8" : "text-base min-w-10";
  return (
    <div
      className="inline-flex items-center rounded-full border border-sand-line bg-linen"
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="−"
        className={`inline-flex ${dim} items-center justify-center rounded-full text-cocoa transition-colors hover:text-gold-deep disabled:opacity-30`}
      >
        <IconMinus className="h-4 w-4" />
      </button>
      <span className={`text-center font-semibold text-cocoa ${box}`}>{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="+"
        className={`inline-flex ${dim} items-center justify-center rounded-full text-cocoa transition-colors hover:text-gold-deep disabled:opacity-30`}
      >
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
