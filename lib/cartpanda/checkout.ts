// CartPanda Checkout
// Migrado de: /assets/cart.js + Shopify /cart/add.js calls

import { cartpandaFetch, CartPandaError } from "./client";
import type { CartPandaLineItem } from "@/types/cartpanda";

interface CheckoutResponse {
  checkout_url?: string;
  url?: string;
  web_url?: string;
  id?: string | number;
}

export async function createCheckout(
  lineItems: CartPandaLineItem[]
): Promise<string> {
  try {
    const data = await cartpandaFetch<CheckoutResponse>("/checkouts", {
      method: "POST",
      body: JSON.stringify({
        checkout: {
          line_items: lineItems.map((item) => ({
            variant_id: item.variant_id,
            quantity: item.quantity,
          })),
        },
      }),
    });

    const url = data.checkout_url ?? data.web_url ?? data.url;
    if (!url) {
      throw new Error("No checkout URL returned from CartPanda");
    }
    return url;
  } catch (err) {
    if (err instanceof CartPandaError) {
      console.error("CartPanda checkout error:", err.status, err.body);
    }
    throw err;
  }
}

// Build a direct buy URL for a single variant (fallback)
export function buildDirectBuyUrl(variantId: number, quantity = 1): string {
  const storeDomain =
    process.env.NEXT_PUBLIC_CARTPANDA_STORE_URL ?? process.env.CARTPANDA_STORE_DOMAIN ?? "";
  const base = storeDomain.startsWith("http") ? storeDomain : `https://${storeDomain}`;
  return `${base}/cart/add?id=${variantId}&quantity=${quantity}`;
}
