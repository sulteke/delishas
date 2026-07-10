"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { getCollection } from "@/lib/collections";
import { PRODUCT_MAP } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronRight, IconArrowRight } from "@/components/ui/Icons";

export function CollectionDetail({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const collection = getCollection(slug);
  if (!collection) return null;

  const products = collection.products
    .map((s) => PRODUCT_MAP[s])
    .filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[42vh] min-h-72 w-full overflow-hidden sm:h-[52vh]">
        <Image
          src={collection.image}
          alt={collection.title[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/20" />
        <div className="container-lux absolute inset-x-0 bottom-0 pb-8 sm:pb-12">
          <nav
            className="mb-3 flex items-center gap-1.5 text-xs text-cream/70"
            aria-label="breadcrumb"
          >
            <Link href="/collections" className="hover:text-gold-soft">
              {t.collections.backAll}
            </Link>
            <IconChevronRight className="h-3.5 w-3.5" />
            <span className="text-cream-50">{collection.title[locale]}</span>
          </nav>
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold-soft">
            {collection.subtitle[locale]}
          </span>
          <h1 className="heading-serif mt-2 max-w-2xl text-4xl text-cream-50 sm:text-6xl">
            {collection.title[locale]}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-sm text-cream/80 sm:text-base">
            {collection.description[locale]}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="container-lux py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="heading-serif text-2xl text-cocoa sm:text-3xl">
            {t.collections.recommended}
          </h2>
          <Link
            href="/catalog"
            className="hidden items-center gap-1.5 text-sm font-medium text-gold-deep hover:text-cocoa sm:inline-flex"
          >
            {t.featured.viewAll}
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 80}>
              <ProductCard product={p} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
