import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { PRODUCTS } from "@/lib/products";
import { COLLECTIONS } from "@/lib/collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/catalog`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: `${base}/collections`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const collections: MetadataRoute.Sitemap = COLLECTIONS.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...products, ...collections];
}
