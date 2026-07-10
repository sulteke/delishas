import type { City } from "./types";

/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS CONFIGURATION — edit these values as the brand grows.
 * ─────────────────────────────────────────────────────────────
 *  NOTE ON CITIES: DELISHAS operates in Astana and Karaganda
 *  (per the official Instagram @delish.as). Orders are routed to
 *  the manager of the selected city via WhatsApp.
 *
 *  Only one public WhatsApp number is published on Instagram
 *  (+7 777 301 33 00). The Karaganda number below is a
 *  PLACEHOLDER using the same line — replace `whatsapp`/`phone`
 *  for Karaganda once the second number is provided.
 */

export const SITE = {
  name: "DELISHAS",
  legalName: "DELISHAS — Premium Desserts",
  tagline: {
    kz: "Шоколадтағы премиум құлпынай",
    ru: "Премиальная клубника в шоколаде",
  },
  since: 2021,
  url: "https://delishas.kz",
  instagram: "https://instagram.com/delish.as",
  instagramHandle: "@delish.as",
  // Default / primary WhatsApp (Astana line published on Instagram)
  primaryWhatsapp: "77773013300",
  primaryPhoneDisplay: "+7 777 301 33 00",
  email: "hello@delishas.kz",
} as const;

export const CITIES: City[] = [
  {
    id: "astana",
    name: { kz: "Астана", ru: "Астана" },
    address: { kz: "Тұран даңғылы, 43а", ru: "проспект Туран, 43а" },
    whatsapp: "77773013300",
    phone: "+7 777 301 33 00",
    mapUrl: "https://maps.google.com/?q=Астана+Туран+43а",
    // Approximate city coordinates — refine to the exact point if needed.
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=71.4080%2C51.0845%2C71.4280%2C51.0965&layer=mapnik&marker=51.0905%2C71.4180",
    hours: { kz: "Күн сайын · 10:00–22:00", ru: "Ежедневно · 10:00–22:00" },
  },
  {
    id: "karaganda",
    name: { kz: "Қарағанды", ru: "Караганда" },
    address: { kz: "Әшімов көшесі, 13", ru: "улица Ашимова, 13" },
    // PLACEHOLDER — replace with the Karaganda manager's number
    whatsapp: "77773013300",
    phone: "+7 777 301 33 00",
    mapUrl: "https://maps.google.com/?q=Караганда+Ашимова+13",
    // Approximate city coordinates — refine to the exact point if needed.
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=73.0994%2C49.7987%2C73.1194%2C49.8107&layer=mapnik&marker=49.8047%2C73.1094",
    hours: { kz: "Күн сайын · 10:00–22:00", ru: "Ежедневно · 10:00–22:00" },
  },
];

export const DEFAULT_CITY_ID = "astana";

export function getCity(id: string): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}

/**
 * Payment readiness flag. Architecture is prepared for Kaspi / card
 * providers (see lib/payment.ts) but online payment is OFF for now —
 * checkout completes via WhatsApp. Flip to `true` once a provider is wired.
 */
export const PAYMENTS_ENABLED = false;

export const DELIVERY = {
  // Free-delivery threshold (₸). Set to 0 to disable messaging.
  freeThreshold: 25000,
  baseFee: 2000,
};
