import type { Metadata } from "next";
import { CollectionsIndex } from "@/components/collections/CollectionsIndex";

export const metadata: Metadata = {
  title: "Праздничные наборы — к каждому поводу",
  description:
    "Готовые наборы DELISHAS к любому празднику: день рождения, свадьба, қыз ұзату, 8 марта, 14 февраля, Новый год и корпоративные подарки. Астана и Караганда.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return <CollectionsIndex />;
}
