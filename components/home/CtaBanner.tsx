"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { SITE } from "@/lib/config";
import { useCity } from "@/lib/city/context";
import { buildEnquiryUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight, IconWhatsApp } from "@/components/ui/Icons";
import type { Localized } from "@/lib/types";

const copy: { title: Localized; text: Localized } = {
  title: {
    kz: "Ерекше сәтті тәттіге бөлеңіз",
    ru: "Сделайте момент по-настоящему сладким",
  },
  text: {
    kz: "Бүгін тапсырыс беріңіз — біз қалғанын жасаймыз. 3 минутта WhatsApp арқылы.",
    ru: "Закажите сегодня — остальное сделаем мы. За 3 минуты через WhatsApp.",
  },
};

export function CtaBanner() {
  const { locale } = useI18n();
  const { city } = useCity();
  const greeting =
    locale === "kz"
      ? "Сәлеметсіз бе! Тапсырыс бергім келеді 🍓"
      : "Здравствуйте! Хочу оформить заказ 🍓";

  return (
    <section className="container-lux py-8 sm:py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-cocoa/40 bg-espresso px-6 py-14 text-center sm:px-10 sm:py-20">
          <Image
            src="/products/box_duo.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/85 to-espresso/70" />
          <div className="pointer-events-none absolute inset-0 noise-grain opacity-40" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow !text-gold-soft">DELISHAS · Premium Desserts</span>
            <h2 className="heading-serif mt-4 text-3xl leading-tight text-cream-50 sm:text-5xl">
              {copy.title[locale]}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-cream/70">
              {copy.text[locale]}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/catalog" className="btn btn-gold w-full text-base sm:w-auto">
                {locale === "kz" ? "Каталогты ашу" : "Открыть каталог"}
                <IconArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={buildEnquiryUrl(city.whatsapp, greeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full border border-cream/25 text-cream-50 hover:bg-cream/10 sm:w-auto"
              >
                <IconWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
            <p className="mt-5 text-xs text-cream/45">{SITE.instagramHandle}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
