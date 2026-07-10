"use client";

import { useI18n } from "@/lib/i18n/context";
import { COLLECTIONS } from "@/lib/collections";
import { CollectionCard } from "./CollectionCard";
import { Reveal } from "@/components/ui/Reveal";

export function CollectionsIndex() {
  const { t } = useI18n();
  const grid = COLLECTIONS.slice(0, 6);
  const wide = COLLECTIONS[6];

  return (
    <div className="container-lux py-10 sm:py-14">
      <div className="mb-10 text-center">
        <span className="eyebrow">{t.collections.eyebrow}</span>
        <h1 className="heading-serif mt-3 text-4xl text-cocoa sm:text-5xl">
          {t.collections.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          {t.collections.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {grid.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 80}>
            <CollectionCard collection={c} priority={i < 3} className="aspect-[4/5]" />
          </Reveal>
        ))}
      </div>

      {wide && (
        <Reveal className="mt-4 sm:mt-5">
          <CollectionCard
            collection={wide}
            className="aspect-[3/2] sm:aspect-[16/6]"
          />
        </Reveal>
      )}
    </div>
  );
}
