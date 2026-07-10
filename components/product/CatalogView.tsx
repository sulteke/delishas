"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import type { Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { Reveal } from "@/components/ui/Reveal";

type Filter = Category | "all";

export function CatalogView() {
  const { t, locale } = useI18n();
  const params = useSearchParams();
  const initial = (params.get("cat") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(initial);

  // categories that actually have products, in catalogue order
  const categories = useMemo(() => {
    const seen: Category[] = [];
    for (const p of PRODUCTS) if (!seen.includes(p.category)) seen.push(p.category);
    return seen;
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter]
  );

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
      active
        ? "border-cocoa bg-cocoa text-cream-50 shadow-sm"
        : "border-sand-line bg-linen/60 text-ink-soft hover:border-gold hover:text-cocoa"
    }`;

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 text-center">
        <span className="eyebrow">{t.categories.eyebrow}</span>
        <h1 className="heading-serif mt-3 text-4xl text-cocoa sm:text-5xl">
          {t.catalog.title}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-soft sm:text-base">
          {t.catalog.subtitle}
        </p>
      </div>

      {/* Filter bar */}
      <div className="mask-fade-x -mx-1 mb-8 flex justify-start gap-2 overflow-x-auto px-1 pb-2 no-scrollbar sm:justify-center">
        <button type="button" onClick={() => setFilter("all")} className={chip(filter === "all")}>
          {t.catalog.all}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={chip(filter === c)}
          >
            {CATEGORY_LABELS[c][locale]}
          </button>
        ))}
      </div>

      <p className="mb-6 text-sm text-taupe">
        {filtered.length} {t.catalog.results}
      </p>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-ink-soft">{t.catalog.empty}</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70}>
              <ProductCard product={p} priority={i < 4} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
