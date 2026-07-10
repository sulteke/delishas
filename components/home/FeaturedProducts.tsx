"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { FEATURED } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowRight } from "@/components/ui/Icons";

export function FeaturedProducts() {
  const { t } = useI18n();

  return (
    <section className="container-lux py-16 sm:py-20">
      <SectionHeading
        eyebrow={t.featured.eyebrow}
        title={t.featured.title}
        subtitle={t.featured.subtitle}
      />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {FEATURED.slice(0, 4).map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 80}>
            <ProductCard product={p} priority={i < 2} />
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/catalog" className="btn btn-outline text-base">
          {t.featured.viewAll}
          <IconArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
