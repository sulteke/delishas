"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import { fromPrice } from "@/lib/products";
import type { Product } from "@/lib/types";
import { ProductBadge } from "./ProductBadge";
import { IconBag, IconCheck } from "@/components/ui/Icons";

export function ProductCard({
  product,
  priority = false,
  sizes = "(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const { t, tr, locale } = useI18n();
  const { add, openCart } = useCart();

  const cheapest = product.variants.reduce((a, b) => (a.price <= b.price ? a : b));
  const [variantId, setVariantId] = useState(cheapest.id);
  const [added, setAdded] = useState(false);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const multi = product.variants.length > 1;

  const href = `/product/${product.slug}`;

  const handleAdd = () => {
    add(product, variant.id, 1);
    setAdded(true);
    openCart();
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="card-lux group flex flex-col">
      <Link
        href={href}
        className="relative block aspect-[4/5] overflow-hidden"
        aria-label={product.name[locale]}
      >
        <Image
          src={product.image}
          alt={product.name[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-60" />

        {/* badges */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.tags.map((tag) => (
              <ProductBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {product.latin && (
          <span className="absolute right-3 top-3 rounded-full bg-cream-50/85 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold-deep backdrop-blur">
            {product.latin}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={href} className="group/title">
          <h3 className="heading-serif text-lg leading-snug text-cocoa transition-colors group-hover/title:text-gold-deep sm:text-xl">
            {product.name[locale]}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">
          {product.tagline[locale]}
        </p>

        {/* variant chips */}
        {multi && (
          <div className="mask-fade-x mt-4 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                aria-pressed={v.id === variant.id}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  v.id === variant.id
                    ? "border-gold bg-gold/12 text-gold-deep"
                    : "border-sand-line text-ink-soft hover:border-gold/60"
                }`}
              >
                {v.label[locale]}
              </button>
            ))}
          </div>
        )}

        {/* price + add */}
        <div className="mt-auto pt-4">
          <div className="flex items-end justify-between gap-2">
            <div>
              {multi && (
                <span className="block text-[0.68rem] uppercase tracking-wider text-taupe">
                  {t.product.from} {formatPrice(fromPrice(product))}
                </span>
              )}
              <span className="heading-serif text-xl font-semibold text-cocoa">
                {formatPrice(variant.price)}
              </span>
            </div>
          </div>
          {product.priceNote && (
            <p className="mt-1 text-[0.7rem] italic text-taupe">
              {tr(product.priceNote)}
            </p>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className={`btn mt-3 w-full ${added ? "btn-gold" : "btn-primary"}`}
          >
            {added ? (
              <>
                <IconCheck className="h-4 w-4" />
                {t.product.added}
              </>
            ) : (
              <>
                <IconBag className="h-4 w-4" />
                {t.product.addToCart}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
