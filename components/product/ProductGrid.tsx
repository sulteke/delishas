import type { Product } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  priorityCount = 0,
  className = "",
}: {
  products: Product[];
  priorityCount?: number;
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
    >
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 4) * 80}>
          <ProductCard product={p} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}
