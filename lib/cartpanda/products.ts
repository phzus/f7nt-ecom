// CartPanda Products API
// Migrado de: /assets/product-info.js + Liquid product object

import { cartpandaFetch } from "./client";
import type {
  CartPandaProduct,
  CartPandaProductsResponse,
  CartPandaSingleProductResponse,
} from "@/types/cartpanda";

export async function getProducts(params?: {
  limit?: number;
  page?: number;
  collection_id?: number;
  sort_by?: string;
  fields?: string;
}): Promise<CartPandaProduct[]> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.collection_id)
    searchParams.set("collection_id", String(params.collection_id));
  if (params?.sort_by) searchParams.set("sort_by", params.sort_by);
  if (params?.fields) searchParams.set("fields", params.fields);

  const query = searchParams.toString();
  const endpoint = `/products${query ? `?${query}` : ""}`;

  const data = await cartpandaFetch<CartPandaProductsResponse>(endpoint, {
    revalidate: 3600, // 1 hour ISR
  });

  return data.products ?? [];
}

export async function getProductByHandle(
  handle: string
): Promise<CartPandaProduct | null> {
  try {
    const data = await cartpandaFetch<
      CartPandaProductsResponse | { products: CartPandaProduct[] }
    >(`/products?handle=${encodeURIComponent(handle)}`, {
      revalidate: 1800, // 30 min ISR
    });

    const products =
      "products" in data ? data.products : (data as CartPandaProductsResponse).products;
    return products?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getProductById(
  id: number
): Promise<CartPandaProduct | null> {
  try {
    const data = await cartpandaFetch<CartPandaSingleProductResponse>(
      `/products/${id}`,
      { revalidate: 1800 }
    );
    return data.product ?? null;
  } catch {
    return null;
  }
}

export async function getAllProductHandles(): Promise<string[]> {
  const products = await getProducts({ fields: "handle", limit: 250 });
  return products.map((p) => p.handle);
}

// Utility: compute price range and availability from variants
export function enrichProduct(product: CartPandaProduct): CartPandaProduct {
  const prices = product.variants
    .map((v) => parseFloat(v.price))
    .filter((p) => !isNaN(p));

  return {
    ...product,
    price_min: prices.length > 0 ? Math.min(...prices) : 0,
    price_max: prices.length > 0 ? Math.max(...prices) : 0,
    available: product.variants.some((v) => v.available !== false),
    featured_image: product.images?.[0] ?? null,
  };
}
