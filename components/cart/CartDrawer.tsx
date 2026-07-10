"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { formatPrice } from "@/lib/format";
import { CartLineRow } from "./CartLineRow";
import { IconClose, IconBag, IconArrowRight } from "@/components/ui/Icons";

export function CartDrawer() {
  const { t } = useI18n();
  const { lines, subtotal, count, isOpen, closeCart } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso/45 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.cart.title}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-sand-line px-5 py-4">
          <h2 className="heading-serif text-xl text-cocoa">
            {t.cart.title}
            {count > 0 && (
              <span className="ml-2 text-sm font-normal text-taupe">
                {count} {count === 1 ? t.cart.item : t.cart.items}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t.common.close}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-cocoa hover:bg-gold/12"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-champagne text-gold-deep">
              <IconBag className="h-7 w-7" />
            </span>
            <div>
              <p className="heading-serif text-lg text-cocoa">{t.cart.empty}</p>
              <p className="mt-1 text-sm text-ink-soft">{t.cart.emptyHint}</p>
            </div>
            <Link href="/catalog" onClick={closeCart} className="btn btn-primary mt-2">
              {t.cart.goCatalog}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <div className="divide-y divide-sand-line/70">
                {lines.map((line) => (
                  <CartLineRow key={line.key} line={line} onNavigate={closeCart} compact />
                ))}
              </div>
            </div>

            <div className="border-t border-sand-line bg-linen/70 px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-soft">{t.cart.subtotal}</span>
                <span className="heading-serif text-xl font-semibold text-cocoa">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-taupe">{t.cart.deliveryCalc}</p>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn btn-gold mt-4 w-full"
              >
                {t.cart.checkout}
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="btn btn-ghost mt-1 w-full text-sm"
              >
                {t.cart.continue}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
