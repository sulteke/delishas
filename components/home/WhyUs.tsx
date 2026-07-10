"use client";

import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconLeaf, IconSparkle, IconHand, IconGift } from "@/components/ui/Icons";

const icons = [IconLeaf, IconSparkle, IconHand, IconGift];

export function WhyUs() {
  const { t } = useI18n();

  return (
    <section className="border-y border-sand-line/60 bg-cream-50/60 py-16 sm:py-20">
      <div className="container-lux">
        <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.why.items.map((item, i) => {
            const Icon = icons[i] ?? IconSparkle;
            return (
              <Reveal key={i} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-sand-line bg-linen p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-soft hover:shadow-[0_28px_50px_-30px_rgba(61,42,30,0.45)]">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-champagne text-gold-deep transition-colors group-hover:bg-gold group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="heading-serif mt-5 text-xl text-cocoa">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
