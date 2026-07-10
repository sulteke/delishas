import type { CartLine, CheckoutDetails, Locale } from "./types";
import { getCity } from "./config";
import { dict } from "./i18n/dictionaries";
import { formatPrice } from "./format";

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.qty, 0);
}

/**
 * Builds the ready-to-send WhatsApp order text with every field the
 * brief requires: city, all products + qty, total, delivery date/time,
 * address, recipient name, phone and optional comment.
 */
export function buildOrderMessage(
  lines: CartLine[],
  details: CheckoutDetails,
  locale: Locale
): string {
  const t = dict[locale].wa;
  const city = getCity(details.cityId);
  const total = cartSubtotal(lines);

  const itemLines = lines
    .map((l, i) => {
      const name = l.name[locale];
      const variant = l.variantLabel[locale];
      return `${i + 1}. ${name} — ${variant} × ${l.qty} — ${formatPrice(
        l.price * l.qty
      )}`;
    })
    .join("\n");

  const parts: string[] = [
    t.greeting,
    "",
    `📍 ${t.city}: ${city.name[locale]}`,
    "",
    `🛍 ${t.order}:`,
    itemLines,
    "",
    `💰 ${t.total}: ${formatPrice(total)}`,
    "",
    `📅 ${t.date}: ${details.date || "—"}`,
    `⏰ ${t.time}: ${details.time || "—"}`,
    `🏠 ${t.address}: ${details.address || "—"}`,
    `👤 ${t.name}: ${details.recipientName || "—"}`,
    `📞 ${t.phone}: ${details.phone || "—"}`,
  ];

  if (details.comment.trim()) {
    parts.push(`💬 ${t.comment}: ${details.comment.trim()}`);
  }

  return parts.join("\n");
}

/** Full wa.me deep link routed to the selected city's manager. */
export function buildWhatsappUrl(
  lines: CartLine[],
  details: CheckoutDetails,
  locale: Locale
): string {
  const city = getCity(details.cityId);
  const text = buildOrderMessage(lines, details, locale);
  return `https://wa.me/${city.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Simple pre-filled enquiry link (used in contact section). */
export function buildEnquiryUrl(whatsapp: string, text: string): string {
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}
