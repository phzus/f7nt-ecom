// Migrado de: sections/featured-collection.liquid
// Shows apparel/general products grid

import type { CartPandaProduct } from "@/types/cartpanda";
import ProductCarousel from "@/components/product/ProductCarousel";
import Link from "next/link";

interface FeaturedProductsProps {
  products: CartPandaProduct[];
  title?: string;
  eyebrow?: string;
  multiplier?: number;
  cols?: 3 | 4;
}

export default function FeaturedProducts({
  products,
  title = "SHOP ALL",
  eyebrow = "APPAREL",
  multiplier = 200,
  cols = 4,
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="w-full py-20 overflow-hidden" style={{ backgroundColor: "#f2f2f2" }}>
      {/* Header — mantém padding do container */}
      <div className="container-main mb-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8e8e8e" }}>
              {eyebrow}
            </p>
            <h2
              className="font-black"
              style={{ color: "#000", letterSpacing: "-0.02em", fontSize: "clamp(1rem, 5.8vw, 2.5rem)", lineHeight: "130%" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs md:text-sm font-bold uppercase tracking-wider underline underline-offset-4 transition-opacity hover:opacity-60 self-end mb-2 whitespace-nowrap"
            style={{ color: "#1a1a1a" }}
          >
            View All
          </Link>
        </div>
      </div>

      {/* Mobile: borda a borda — Desktop: alinhado ao container-main */}
      <div className="md:max-w-[1200px] md:mx-auto md:px-5">
        <ProductCarousel
          products={products.slice(0, 8)}
          multiplier={multiplier}
          desktopCols={cols}
        />
      </div>
    </section>
  );
}
