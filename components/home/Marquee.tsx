"use client";

import { useI18n } from "@/lib/i18n/context";

export function Marquee() {
  const { t } = useI18n();
  const items = t.marquee;

  const Half = ({ hidden = false }: { hidden?: boolean }) => (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden}>
      {items.map((w, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className="heading-serif text-lg italic text-cream/90 sm:text-xl">
            {w}
          </span>
          <span className="text-gold-soft">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="border-y border-sand-line/70 bg-cocoa py-4 text-cream-50">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex animate-[marquee_28s_linear_infinite]">
          <Half />
          <Half hidden />
        </div>
      </div>
    </section>
  );
}
