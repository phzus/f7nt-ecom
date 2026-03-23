// CartPanda API v3 TypeScript Types
// Reference: https://dev.cartpanda.com/docs/api-v3

export interface CartPandaImage {
  id: number;
  product_id: number;
  position: number;
  src: string;
  width: number;
  height: number;
  alt: string | null;
  variant_ids: number[];
}

export interface CartPandaOptionValue {
  id: number;
  name: string;
  position: number;
  option_id: number;
}

export interface CartPandaOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

export interface CartPandaVariant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  compare_at_price: string | null;
  sku: string;
  position: number;
  inventory_quantity: number;
  inventory_management: string | null;
  inventory_policy: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  image_id: number | null;
  available: boolean;
  weight: number;
  weight_unit: string;
}

export interface CartPandaProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  status: "active" | "draft" | "archived";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  images: CartPandaImage[];
  variants: CartPandaVariant[];
  options: CartPandaOption[];
  // Computed
  price_min?: number;
  price_max?: number;
  available?: boolean;
  featured_image?: CartPandaImage | null;
}

export interface CartPandaProductsResponse {
  products: CartPandaProduct[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface CartPandaSingleProductResponse {
  product: CartPandaProduct;
}

export interface CartPandaCollection {
  id: number;
  handle: string;
  title: string;
  description: string;
  published_at: string | null;
  updated_at: string;
  image: CartPandaImage | null;
  products_count: number;
}

export interface CartPandaCollectionsResponse {
  collections: CartPandaCollection[];
}

export interface CartPandaCheckoutLineItem {
  variant_id: number;
  quantity: number;
}

export interface CartPandaCheckoutInput {
  line_items: CartPandaLineItem[];
}

export interface CartPandaCheckout {
  id: string;
  token: string;
  checkout_url: string;
  web_url: string;
  subtotal_price: string;
  total_price: string;
  line_items: CartPandaLineItem[];
}

export interface CartPandaLineItem {
  variant_id: number;
  quantity: number;
  title?: string;
  price?: string;
  variant_title?: string;
  product?: CartPandaProduct;
  variant?: CartPandaVariant;
}

export interface CartPandaApiError {
  errors?: string | Record<string, string[]>;
  message?: string;
  status?: number;
}

// Local cart item type (client-side only)
export interface LocalCartItem {
  variantId: number;
  productId: number;
  quantity: number;
  title: string;
  variantTitle: string | null;
  price: number; // in cents or decimal
  image: string | null;
  handle: string;
}

export interface LocalCart {
  items: LocalCartItem[];
  updatedAt: string;
}
