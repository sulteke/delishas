"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { Reveal } from "@/components/ui/Reveal";
import { Emblem } from "@/components/ui/Brand";
import type { Localized } from "@/lib/types";

const copy: {
  eyebrow: Localized;
  title: Localized;
  p1: Localized;
  p2: Localized;
} = {
  eyebrow: { kz: "Біз туралы", ru: "О нас" },
  title: { kz: "Стиль және дәм", ru: "Стиль и вкус" },
  p1: {
    kz: "DELISHAS — 2021 жылдан бері шоколадтағы құлпынай өнерін жасап келеді. Әр жинақ қолмен теріліп, бельгия шоколадымен көмкеріледі және талғаммен безендіріледі.",
    ru: "DELISHAS создаёт искусство клубники в шоколаде с 2021 года. Каждый набор собирается вручную, покрывается бельгийским шоколадом и оформляется со вкусом.",
  },
  p2: {
    kz: "Біз үшін маңыздысы — балғындық, эстетика және сіздің эмоцияңыз. Астана мен Қарағандыда сүйіктілеріңізге ұмытылмас сый сыйлаңыз.",
    ru: "Для нас важны свежесть, эстетика и ваши эмоции. Дарите близким незабываемые впечатления в Астане и Караганде.",
  },
};

const stats: { value: string; label: Localized }[] = [
  { value: "2021", label: { kz: "Құрылған жыл", ru: "Год основания" } },
  { value: "28K+", label: { kz: "Жазылушы", ru: "Подписчиков" } },
  { value: "2", label: { kz: "Қала", ru: "Города" } },
  { value: "4.9★", label: { kz: "Рейтинг", ru: "Рейтинг" } },
];

export function AboutStory() {
  const { locale } = useI18n();

  return (
    <section id="about" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container-lux grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-sand-line shadow-[0_40px_80px_-45px_rgba(61,42,30,0.5)]">
            <Image
              src="/products/box_rect.jpg"
              alt="DELISHAS — ручная работа"
              fill
              sizes="(max-width:1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-sand-line bg-cream-50 px-5 py-4 shadow-lg sm:block">
            <Emblem className="h-8 w-12 text-gold" />
            <p className="mt-1 logo-word text-sm text-cocoa">DELISHAS</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">{copy.eyebrow[locale]}</span>
            <h2 className="heading-serif mt-3 text-3xl text-cocoa sm:text-4xl md:text-[2.75rem]">
              {copy.title[locale]}
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-soft">
              {copy.p1[locale]}
            </p>
            <p className="mt-4 text-pretty text-base leading-relaxed text-ink-soft">
              {copy.p2[locale]}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="rounded-xl border border-sand-line bg-linen px-3 py-4 text-center"
                >
                  <dt className="heading-serif text-2xl font-semibold text-gold-deep">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-[0.7rem] uppercase tracking-wider text-taupe">
                    {s.label[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
