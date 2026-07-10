"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { COLLECTIONS } from "@/lib/collections";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/Icons";

export function CollectionsPreview() {
  const { t } = useI18n();
  const preview = COLLECTIONS.slice(0, 6);

  return (
    <section className="container-lux py-16 sm:py-20">
      <SectionHeading
        eyebrow={t.collections.eyebrow}
        title={t.collections.title}
        subtitle={t.collections.subtitle}
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
        {preview.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 90}>
            <CollectionCard
              collection={c}
              priority={i < 3}
              className="aspect-[3/4]"
            />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/collections" className="btn btn-primary text-base">
          {t.collections.backAll}
          <IconArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
