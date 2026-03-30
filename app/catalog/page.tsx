// Catalog page — migrado de: templates/collection.liquid
// Lists all products from CartPanda API

import type { Metadata } from "next";
import { getProducts, enrichProduct } from "@/lib/cartpanda/products";
import ProductCard from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Catalog — Shop & Win",
  description:
    "Browse all f7nt.co products. Every purchase earns automatic sweepstakes entries. Every $1 spent = 200 entries.",
};

export const revalidate = 3600;

export default async function CatalogPage() {
  const multiplier = parseInt(
    process.env.NEXT_PUBLIC_ENTRIES_MULTIPLIER ?? "200",
    10
  );

  // Helper: hide internal upsell/funnel products from public catalog
  const isUpsellProduct = (title: string) =>
    /\[(UP\d+|F\d*)\]/i.test(title);

  let products: ReturnType<typeof enrichProduct>[] = [];
  try {
    const raw = await getProducts({ limit: 50 });
    products = raw
      .filter((p) => !isUpsellProduct(p.title))
      .map(enrichProduct);
  } catch {
    products = [];
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "60vh" }}>
      {/* Page header */}
      <div
        className="w-full py-12 text-center"
        style={{ backgroundColor: "#000" }}
      >
        <h1
          className="text-5xl md:text-6xl font-normal"
          style={{ color: "#fff", letterSpacing: "0.84px" }}
        >
          Catalog
        </h1>
        <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
          Every $1 spent ={" "}
          <strong style={{ color: "#00ff00" }}>{multiplier} entries</strong> to
          win
        </p>
      </div>

      <div className="container-main py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              Products coming soon. Check back shortly!
            </p>
          </div>
        ) : (
          <>
            {/* Product count */}
            <p className="text-sm mb-6" style={{ color: "rgba(26,26,26,0.75)" }}>
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  multiplier={multiplier}
                  showEntries
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
