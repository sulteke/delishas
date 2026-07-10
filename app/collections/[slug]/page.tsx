import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS, getCollection } from "@/lib/collections";
import { CollectionDetail } from "@/components/collections/CollectionDetail";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: `${c.title.ru} — праздничные наборы`,
    description: c.description.ru,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: `${c.title.ru} · DELISHAS`,
      description: c.description.ru,
      images: [{ url: c.image }],
    },
  };
}

export default async function CollectionSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();
  return <CollectionDetail slug={slug} />;
}
