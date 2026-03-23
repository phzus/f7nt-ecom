// Migrado de: sections/featured-collection.liquid
// Shows apparel/general products grid

import type { CartPandaProduct } from "@/types/cartpanda";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

interface FeaturedProductsProps {
  products: CartPandaProduct[];
  title?: string;
  eyebrow?: string;
  multiplier?: number;
}

export default function FeaturedProducts({
  products,
  title = "SHOP ALL",
  eyebrow = "APPAREL",
  multiplier = 200,
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="w-full py-14" style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container-main">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#8e8e8e" }}>
              {eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-black" style={{ color: "#000", letterSpacing: "-0.02em" }}>
              {title}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-bold uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{ color: "#1a1a1a" }}
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              multiplier={multiplier}
              showEntries
            />
          ))}
        </div>
      </div>
    </section>
  );
}
