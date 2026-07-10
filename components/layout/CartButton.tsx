"use client";

import { useCart } from "@/lib/cart/context";
import { useI18n } from "@/lib/i18n/context";
import { IconBag } from "@/components/ui/Icons";

export function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart, hydrated } = useCart();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`${t.nav.cart}${count ? ` (${count})` : ""}`}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full text-cocoa transition-colors hover:bg-gold/12 ${className}`}
    >
      <IconBag className="h-[22px] w-[22px]" />
      {hydrated && count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-white shadow-sm animate-[fadeInScale_0.3s_ease]">
          {count}
        </span>
      )}
    </button>
  );
}
