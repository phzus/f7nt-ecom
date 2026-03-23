// Product Detail Page — migrado de: templates/product.liquid + sections/main-product.liquid

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductByHandle,
  getAllProductHandles,
  getProducts,
  enrichProduct,
} from "@/lib/cartpanda/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductCard from "@/components/product/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const handles = await getAllProductHandles();
    return handles.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const image = product.images?.[0]?.src;

  return {
    title: product.title,
    description:
      product.body_html
        ?.replace(/<[^>]+>/g, "")
        .slice(0, 160) ??
      `${product.title} — shop at f7nt.co and earn entries to win a BMW M4.`,
    openGraph: image
      ? {
          images: [{ url: image }],
        }
      : undefined,
  };
}

export const revalidate = 1800; // 30 min ISR

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const raw = await getProductByHandle(slug);

  if (!raw) notFound();

  const product = enrichProduct(raw);
  const multiplier = parseInt(
    process.env.NEXT_PUBLIC_ENTRIES_MULTIPLIER ?? "200",
    10
  );

  // Related products (simple: show up to 4 other products)
  let relatedProducts: ReturnType<typeof enrichProduct>[] = [];
  try {
    const allRaw = await getProducts({ limit: 8 });
    relatedProducts = allRaw
      .filter((p) => p.handle !== slug)
      .slice(0, 4)
      .map(enrichProduct);
  } catch {
    relatedProducts = [];
  }

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container-main py-10">
        {/* Product layout: gallery + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div className="w-full">
            <ProductGallery
              images={product.images ?? []}
              productTitle={product.title}
            />
          </div>

          {/* Info — client component for variant/cart interactivity */}
          <div className="w-full" style={{ paddingLeft: "0" }}>
            <ProductInfo product={product} multiplier={multiplier} />
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-10 border-t" style={{ borderColor: "#e0e0e0" }}>
            <h2
              className="text-2xl font-bold uppercase mb-6"
              style={{ letterSpacing: "0.6px" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  multiplier={multiplier}
                  showEntries
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
