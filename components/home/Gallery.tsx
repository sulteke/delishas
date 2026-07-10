"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { SITE } from "@/lib/config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconInstagram } from "@/components/ui/Icons";

const shots = [
  "/products/bouquet.jpg",
  "/products/heart_life.jpg",
  "/products/round.jpg",
  "/products/box_duo.jpg",
  "/products/royal.jpg",
  "/products/ana.jpg",
  "/products/macarons.jpg",
  "/products/box_rect.jpg",
];

export function Gallery() {
  const { t } = useI18n();

  return (
    <section className="container-lux py-16 sm:py-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
        />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {shots.map((src, i) => (
          <Reveal key={src} delay={(i % 4) * 60}>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl border border-sand-line"
              aria-label={SITE.instagramHandle}
            >
              <Image
                src={src}
                alt="DELISHAS Instagram"
                fill
                sizes="(max-width:640px) 45vw, (max-width:1024px) 30vw, 22vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-300 group-hover:bg-espresso/45 group-hover:opacity-100">
                <IconInstagram className="h-7 w-7 text-cream-50" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline text-base"
        >
          <IconInstagram className="h-5 w-5" />
          {t.gallery.follow}
        </a>
      </div>
    </section>
  );
}
