import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/product/CatalogView";

export const metadata: Metadata = {
  title: "Каталог — клубника в шоколаде, букеты и наборы",
  description:
    "Полный каталог DELISHAS: клубника в шоколаде в коробках, наборы-сердца, корзинки, букеты и подарочные сеты. Доставка по Астане и Караганде.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <div className="container-lux py-10 sm:py-14">
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CatalogView />
      </Suspense>
    </div>
  );
}
