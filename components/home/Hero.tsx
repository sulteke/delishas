"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { Emblem } from "@/components/ui/Brand";
import { IconArrowRight, IconStar, IconInstagram, IconPin } from "@/components/ui/Icons";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
      {/* soft brand glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-rose/15 blur-3xl" />
        <div className="absolute inset-0 noise-grain opacity-60" />
      </div>

      <div className="container-lux grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sand-line bg-linen/70 px-3 py-1.5">
            <Emblem className="h-4 w-6 text-gold" />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
              {t.hero.eyebrow}
            </span>
          </div>

          <h1 className="heading-serif text-[2.6rem] font-semibold leading-[1.03] text-cocoa sm:text-6xl lg:text-[4.1rem]">
            {t.hero.title1}
            <br />
            <span className="text-gilded">{t.hero.title2}</span>
            <br />
            <span className="text-2xl font-normal italic text-taupe sm:text-3xl lg:text-4xl">
              {t.hero.titleAccent}
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/catalog" className="btn btn-gold text-base">
              {t.hero.ctaPrimary}
              <IconArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/collections" className="btn btn-outline text-base">
              {t.hero.ctaSecondary}
            </Link>
          </div>

          {/* trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <div className="flex items-center gap-2">
              <IconInstagram className="h-5 w-5 text-gold-deep" />
              <span className="text-sm text-ink-soft">{t.hero.stat1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </span>
              <span className="text-sm text-ink-soft">
                <strong className="font-semibold text-cocoa">4.9</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IconPin className="h-5 w-5 text-gold-deep" />
              <span className="text-sm text-ink-soft">{t.hero.stat3}</span>
            </div>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand-line shadow-[0_40px_80px_-40px_rgba(61,42,30,0.5)]">
            <Image
              src="/products/hero_model.jpg"
              alt="DELISHAS — премиальная клубника в шоколаде"
              fill
              priority
              sizes="(max-width:1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
          </div>

          {/* floating product accent */}
          <div className="animate-floaty absolute -bottom-6 -left-4 hidden w-40 overflow-hidden rounded-2xl border border-sand-line bg-linen shadow-xl sm:block lg:-left-8 lg:w-48">
            <div className="relative aspect-square">
              <Image
                src="/products/bouquet.jpg"
                alt=""
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          {/* floating rating chip */}
          <div className="absolute -right-2 top-6 rounded-2xl border border-sand-line bg-cream-50/90 px-4 py-3 shadow-lg backdrop-blur lg:right-4">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="h-3.5 w-3.5" />
              ))}
            </div>
            <p className="mt-1 text-[0.7rem] font-medium text-ink-soft">
              {t.hero.stat2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
