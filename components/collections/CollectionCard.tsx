"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import type { Collection } from "@/lib/types";
import { IconArrowUpRight } from "@/components/ui/Icons";

const accentRing: Record<Collection["accent"], string> = {
  gold: "from-gold-deep/85",
  rose: "from-rose/80",
  cocoa: "from-espresso/85",
};

export function CollectionCard({
  collection,
  className = "",
  priority = false,
}: {
  collection: Collection;
  className?: string;
  priority?: boolean;
}) {
  const { locale, t } = useI18n();

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`group relative block overflow-hidden rounded-2xl border border-sand-line ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={collection.image}
          alt={collection.title[locale]}
          fill
          priority={priority}
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${accentRing[collection.accent]} via-espresso/25 to-transparent opacity-90`}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-5 text-cream-50 sm:p-6">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-gold-soft">
          {collection.subtitle[locale]}
        </span>
        <h3 className="heading-serif mt-1.5 text-2xl leading-tight text-cream-50 sm:text-[1.7rem]">
          {collection.title[locale]}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-cream-50/90 transition-colors group-hover:text-gold-soft">
          {t.collections.view}
          <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
