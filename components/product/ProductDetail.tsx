"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import { getProduct, PRODUCTS, fromPrice } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { ProductBadge } from "./ProductBadge";
import { QuantityStepper } from "./QuantityStepper";
import { Reveal } from "@/components/ui/Reveal";
import {
  IconChevronRight,
  IconBag,
  IconCheck,
  IconArrowRight,
  IconLeaf,
  IconHand,
  IconTruck,
} from "@/components/ui/Icons";

export function ProductDetail({ slug }: { slug: string }) {
  const { t, locale, tr } = useI18n();
  const { add, openCart } = useCart();
  const router = useRouter();

  const product = getProduct(slug);
  const cheapest = product
    ? product.variants.reduce((a, b) => (a.price <= b.price ? a : b))
    : null;

  const [variantId, setVariantId] = useState(cheapest?.id ?? "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const multi = product.variants.length > 1;
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  )
    .concat(PRODUCTS.filter((p) => p.slug !== product.slug && p.featured))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 4);

  const handleAdd = (buyNow = false) => {
    add(product, variant.id, qty);
    if (buyNow) {
      router.push("/cart");
    } else {
      setAdded(true);
      openCart();
      window.setTimeout(() => setAdded(false), 1400);
    }
  };

  const trust = [
    { icon: IconLeaf, label: t.why.items[0].t },
    { icon: IconHand, label: t.why.items[2].t },
    { icon: IconTruck, label: t.why.items[3].t },
  ];

  return (
    <div className="container-lux py-8 sm:py-12">
      {/* breadcrumb */}
      <nav
        className="mb-6 flex items-center gap-1.5 text-xs text-taupe"
        aria-label="breadcrumb"
      >
        <Link href="/catalog" className="hover:text-gold-deep">
          {t.nav.catalog}
        </Link>
        <IconChevronRight className="h-3.5 w-3.5" />
        <span className="text-cocoa">{product.name[locale]}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-sand-line">
            <Image
              src={gallery[activeImg]}
              alt={product.name[locale]}
              fill
              priority
              sizes="(max-width:1024px) 92vw, 45vw"
              className="object-cover"
            />
            {product.tags && product.tags.length > 0 && (
              <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
                {product.tags.map((tag) => (
                  <ProductBadge key={tag} tag={tag} />
                ))}
              </div>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-3">
              {gallery.map((g, i) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`${product.name[locale]} ${i + 1}`}
                  className={`relative h-20 w-16 overflow-hidden rounded-xl border transition-all ${
                    i === activeImg
                      ? "border-gold ring-2 ring-gold/30"
                      : "border-sand-line opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={g} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.latin && (
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
              {product.latin}
            </span>
          )}
          <h1 className="heading-serif mt-2 text-3xl leading-tight text-cocoa sm:text-4xl">
            {product.name[locale]}
          </h1>
          <p className="mt-3 text-pretty text-base text-ink-soft">
            {product.tagline[locale]}
          </p>

          {/* price */}
          <div className="mt-6 flex items-end gap-3">
            <span className="heading-serif text-4xl font-semibold text-cocoa">
              {formatPrice(variant.price)}
            </span>
            {multi && (
              <span className="pb-1 text-sm text-taupe">
                {t.product.from} {formatPrice(fromPrice(product))}
              </span>
            )}
          </div>
          {product.priceNote && (
            <p className="mt-1 text-sm italic text-taupe">{tr(product.priceNote)}</p>
          )}

          {/* variants */}
          {multi && (
            <div className="mt-7">
              <p className="mb-2.5 text-sm font-semibold text-cocoa">
                {t.product.selectSize}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    aria-pressed={v.id === variant.id}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      v.id === variant.id
                        ? "border-cocoa bg-cocoa text-cream-50"
                        : "border-sand-line text-ink-soft hover:border-gold"
                    }`}
                  >
                    {v.label[locale]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* qty + add */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QuantityStepper value={qty} onChange={setQty} ariaLabel={t.product.quantity} />
            <button
              type="button"
              onClick={() => handleAdd(false)}
              className={`btn flex-1 text-base ${added ? "btn-gold" : "btn-primary"}`}
            >
              {added ? (
                <>
                  <IconCheck className="h-5 w-5" /> {t.product.added}
                </>
              ) : (
                <>
                  <IconBag className="h-5 w-5" /> {t.product.addToCart}
                </>
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleAdd(true)}
            className="btn btn-outline mt-3 w-full text-base"
          >
            {t.product.orderNow}
            <IconArrowRight className="h-5 w-5" />
          </button>

          {/* trust */}
          <div className="mt-6 grid grid-cols-3 gap-2 border-y border-sand-line/70 py-4">
            {trust.map((tr2, i) => {
              const Icon = tr2.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="h-5 w-5 text-gold-deep" />
                  <span className="text-[0.7rem] leading-tight text-ink-soft">
                    {tr2.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* includes */}
          <div className="mt-6">
            <h2 className="heading-serif text-lg text-cocoa">
              {t.product.includesTitle}
            </h2>
            <ul className="mt-3 space-y-2.5">
              {product.includes[locale].map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* description */}
          <div className="mt-6">
            <h2 className="heading-serif text-lg text-cocoa">
              {t.product.descriptionTitle}
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">
              {product.description[locale]}
            </p>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-16 sm:mt-24">
          <h2 className="heading-serif mb-8 text-2xl text-cocoa sm:text-3xl">
            {t.product.related}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
