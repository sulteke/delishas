// Shared domain types for the DELISHAS storefront

export type Locale = "kz" | "ru";

export type Localized<T = string> = Record<Locale, T>;

export type Category =
  | "boxes"
  | "hearts"
  | "baskets"
  | "macarons"
  | "bouquets"
  | "sets";

export type BadgeKey = "bestseller" | "new" | "premium" | "romantic";

export interface Variant {
  id: string;
  /** e.g. "20 шт" / "20 дана" */
  label: Localized;
  /** price in Kazakhstani tenge (₸) */
  price: number;
}

export interface Product {
  slug: string;
  category: Category;
  name: Localized;
  /** Latin sub-label as printed on the brand cards, e.g. "BOX HEART" */
  latin?: string;
  tagline: Localized;
  description: Localized;
  /** primary image (in /public/products) */
  image: string;
  gallery?: string[];
  variants: Variant[];
  /** "В стоимость входит" bullet list */
  includes: Localized<string[]>;
  tags?: BadgeKey[];
  featured?: boolean;
  /** optional note shown near price, e.g. prices to be confirmed */
  priceNote?: Localized;
}

export interface Collection {
  slug: string;
  title: Localized;
  subtitle: Localized;
  description: Localized;
  image: string;
  /** product slugs curated for this occasion */
  products: string[];
  accent: "gold" | "rose" | "cocoa";
}

export interface City {
  id: string;
  name: Localized;
  address: Localized;
  /** WhatsApp number in international format without "+" (wa.me format) */
  whatsapp: string;
  /** human-readable phone */
  phone: string;
  mapUrl: string;
  mapEmbed: string;
  hours: Localized;
}

/** A single line in the cart */
export interface CartLine {
  key: string; // `${productSlug}:${variantId}`
  productSlug: string;
  variantId: string;
  name: Localized;
  variantLabel: Localized;
  price: number;
  image: string;
  qty: number;
}

export interface CheckoutDetails {
  cityId: string;
  date: string;
  time: string;
  address: string;
  recipientName: string;
  phone: string;
  comment: string;
}
