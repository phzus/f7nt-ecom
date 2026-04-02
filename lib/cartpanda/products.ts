// CartPanda Products API

import { cartpandaFetch } from "./client";
import type { CartPandaProduct } from "@/types/cartpanda";

interface ProductsResponse {
  products?: CartPandaProduct[];
}

export async function getProducts(
  _opts?: { limit?: number }
): Promise<CartPandaProduct[]> {
  const data = await cartpandaFetch<ProductsResponse>("/products", {
    revalidate: 60,
  });
  const all: CartPandaProduct[] = data?.products ?? [];
  // CartPanda ignores ?status= query params — filter client-side
  return all.filter((p) => !p.status || p.status === "active");
}

export async function getProductsByCollection(
  collectionId: number
): Promise<CartPandaProduct[]> {
  const data = await cartpandaFetch<ProductsResponse>(
    `/products?collection_id=${collectionId}`,
    { revalidate: 60 }
  );
  const all: CartPandaProduct[] = data?.products ?? [];
  return all.filter((p) => !p.status || p.status === "active");
}

export async function getProductByHandle(
  handle: string
): Promise<CartPandaProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.handle === handle) ?? null;
}

export async function getProductById(
  id: number
): Promise<CartPandaProduct | null> {
  const data = await cartpandaFetch<{ product?: CartPandaProduct } | CartPandaProduct>(
    `/products/${id}`,
    { revalidate: 1800 }
  );
  return (data as { product?: CartPandaProduct })?.product ?? (data as CartPandaProduct) ?? null;
}

export async function getAllProductHandles(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.handle).filter(Boolean);
}

// Utility: normalize and enrich a raw CartPanda product
export function enrichProduct(product: CartPandaProduct): CartPandaProduct {
  // 1. Normalize images: replace relative `src` with absolute `url`
  const images = product.images.map((img) => ({
    ...img,
    src: img.url || img.src,
  }));

  // 2. Normalize variants:
  //    - If variants array is empty, promote product_default_variant
  //    - Add computed `available`, `option1/2/3` fields
  let rawVariants = product.variants;
  if (rawVariants.length === 0 && product.product_default_variant) {
    rawVariants = [product.product_default_variant as CartPandaProduct["variants"][0]];
  }

  const variants = rawVariants.map((v) => ({
    ...v,
    // available: allow selling if prevent_out_of_stock_selling=0 (always sell) OR has qty
    available: v.prevent_out_of_stock_selling === 0 || v.quantity > 0,
    // Map title → option1 for VariantSelector compatibility
    option1: v.title ?? null,
    option2: null,
    option3: null,
  }));

  // 3. Compute price range from normalized variants
  const prices = variants
    .map((v) => Number(v.price))
    .filter((p) => !isNaN(p) && p > 0);

  const priceMin = prices.length > 0 ? Math.min(...prices) : 0;
  const priceMax = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    ...product,
    images,
    variants,
    price_min: priceMin,
    price_max: priceMax,
    available: variants.some((v) => v.available),
    featured_image: images[0] ?? null,
  };
}
