"use client";

import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconBag, IconChat, IconTruck } from "@/components/ui/Icons";

const icons = [IconBag, IconChat, IconTruck];

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="container-lux py-16 sm:py-20">
      <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} />

      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        {/* connecting line (desktop) */}
        <div
          className="absolute left-[16.6%] right-[16.6%] top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent md:block"
          aria-hidden="true"
        />
        {t.how.steps.map((step, i) => {
          const Icon = icons[i] ?? IconBag;
          return (
            <Reveal key={i} delay={i * 120} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-sand-line bg-linen text-gold-deep shadow-sm">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="absolute -right-1 -top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="heading-serif mt-5 text-xl text-cocoa">{step.t}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {step.d}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
