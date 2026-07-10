"use client";

import { useI18n } from "@/lib/i18n/context";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconStar } from "@/components/ui/Icons";

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section className="border-y border-sand-line/60 bg-cream-50/60 py-16 sm:py-20">
      <div className="container-lux">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.testimonials.items.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-sand-line bg-linen p-6 shadow-[0_20px_45px_-35px_rgba(61,42,30,0.5)]">
                <span
                  className="heading-serif text-5xl leading-none text-gold/40"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <div className="-mt-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <IconStar key={s} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-sand-line/70 pt-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-champagne heading-serif text-lg text-gold-deep">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-cocoa">
                      {r.name}
                    </span>
                    <span className="block text-xs text-taupe">{r.city}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
