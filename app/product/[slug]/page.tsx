import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, fromPrice } from "@/lib/products";
import { SITE } from "@/lib/config";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name.ru,
    description: p.description.ru,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: `${p.name.ru} · DELISHAS`,
      description: p.description.ru,
      images: [{ url: p.image }],
    },
  };
}

function ProductJsonLd({ slug }: { slug: string }) {
  const p = getProduct(slug);
  if (!p) return null;
  const prices = p.variants.map((v) => v.price);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name.ru,
    image: `${SITE.url}${p.image}`,
    description: p.description.ru,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "KZT",
      lowPrice: fromPrice(p),
      highPrice: Math.max(...prices),
      offerCount: p.variants.length,
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getProduct(slug)) notFound();
  return (
    <>
      <ProductJsonLd slug={slug} />
      <ProductDetail slug={slug} />
    </>
  );
}
