"use client";

import { useI18n } from "@/lib/i18n/context";
import type { BadgeKey } from "@/lib/types";

const styles: Record<BadgeKey, string> = {
  bestseller: "bg-gold text-white",
  new: "bg-cocoa text-cream-50",
  premium:
    "bg-gradient-to-r from-gold-soft to-gold text-white",
  romantic: "bg-rose text-white",
};

export function ProductBadge({ tag }: { tag: BadgeKey }) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] shadow-sm ${styles[tag]}`}
    >
      {t.product.badges[tag]}
    </span>
  );
}
