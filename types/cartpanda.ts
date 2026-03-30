// CartPanda API v3 TypeScript Types — schema validado contra API real

export interface CartPandaImage {
  id: number;
  product_id: number;
  position: number;
  alt: string;
  /** Relative path — use `url` for absolute URL */
  src: string;
  /** Full absolute URL — always prefer this over `src` */
  url: string;
  width: number;
  height: number;
}

export interface CartPandaOption {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: string[];
}

/** Raw variant as returned by the CartPanda API */
export interface CartPandaVariantRaw {
  id: number;
  product_id: number;
  default: number;
  title: string;
  price: number;
  compare_at_price: number;
  sku: string;
  quantity: number;
  prevent_out_of_stock_selling: number;
  checkout_link: string;
  image_id: number | null;
  position: number;
}

/** Normalized variant — after enrichProduct(), has computed fields added */
export interface CartPandaVariant extends CartPandaVariantRaw {
  /** Computed: true if selling is allowed (prevent=0) or has stock */
  available: boolean;
  /** Mapped from variant title for VariantSelector compatibility */
  option1: string | null;
  option2: string | null;
  option3: string | null;
}

export interface CartPandaProduct {
  id: number;
  title: string;
  body_html: string;
  handle: string;
  product_url: string;
  vendor: string;
  product_type: string;
  tags: string[];
  status: "active" | "inactive";
  published_at: string | null;
  created_at: string;
  updated_at: string;
  images: CartPandaImage[];
  variants: CartPandaVariant[];
  options: CartPandaOption[];
  /** Present when variants array is empty (single-variant products) */
  product_default_variant?: CartPandaVariantRaw;
  seo_title: string;
  seo_description: string;
  // Computed by enrichProduct()
  price_min?: number;
  price_max?: number;
  available?: boolean;
  featured_image?: CartPandaImage | null;
}

// Kept for checkout.ts and CartDrawer compatibility
export interface CartPandaLineItem {
  variant_id: number;
  quantity: number;
  title?: string;
  price?: string;
  variant_title?: string;
}

export interface CartPandaCheckoutLineItem {
  variant_id: number;
  quantity: number;
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
  price: number;
  image: string | null;
  handle: string;
}

export interface LocalCart {
  items: LocalCartItem[];
  updatedAt: string;
}
