"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/types";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import { IconTrash } from "@/components/ui/Icons";

export function CartLineRow({
  line,
  onNavigate,
  compact = false,
}: {
  line: CartLine;
  onNavigate?: () => void;
  compact?: boolean;
}) {
  const { t, locale } = useI18n();
  const { setQty, remove } = useCart();

  return (
    <div className="flex gap-3 py-4">
      <Link
        href={`/product/${line.productSlug}`}
        onClick={onNavigate}
        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-sand-line"
      >
        <Image
          src={line.image}
          alt={line.name[locale]}
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/product/${line.productSlug}`}
              onClick={onNavigate}
              className="heading-serif text-[0.95rem] leading-tight text-cocoa hover:text-gold-deep"
            >
              {line.name[locale]}
            </Link>
            <p className="mt-0.5 text-xs text-taupe">{line.variantLabel[locale]}</p>
          </div>
          <button
            type="button"
            onClick={() => remove(line.key)}
            aria-label={t.cart.remove}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-taupe transition-colors hover:bg-berry/10 hover:text-berry"
          >
            <IconTrash className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <QuantityStepper
            value={line.qty}
            onChange={(v) => setQty(line.key, v)}
            size={compact ? "sm" : "sm"}
            ariaLabel={t.product.quantity}
          />
          <span className="heading-serif text-base font-semibold text-cocoa">
            {formatPrice(line.price * line.qty)}
          </span>
        </div>
      </div>
    </div>
  );
}
