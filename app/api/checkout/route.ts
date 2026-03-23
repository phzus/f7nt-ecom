// API Route: POST /api/checkout
// Proxies checkout creation to CartPanda (keeps API token server-side)

import { NextRequest, NextResponse } from "next/server";
import type { CartPandaLineItem } from "@/types/cartpanda";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lineItems: CartPandaLineItem[] = body.line_items;

    if (!lineItems || lineItems.length === 0) {
      return NextResponse.json(
        { error: "No line items provided" },
        { status: 400 }
      );
    }

    const token = process.env.CARTPANDA_API_TOKEN;
    const domain = process.env.CARTPANDA_STORE_DOMAIN;

    if (!token || !domain) {
      return NextResponse.json(
        { error: "Store not configured" },
        { status: 500 }
      );
    }

    const apiUrl = `https://${domain}/api/v3/checkouts`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        checkout: {
          line_items: lineItems.map((item) => ({
            variant_id: item.variant_id,
            quantity: item.quantity,
          })),
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("CartPanda checkout error:", response.status, errorData);

      // Fallback: build direct cart URL
      const fallbackUrl = buildFallbackUrl(domain, lineItems);
      return NextResponse.json({ checkout_url: fallbackUrl });
    }

    const data = await response.json();
    const checkoutUrl =
      data?.checkout?.checkout_url ??
      data?.checkout_url ??
      data?.web_url ??
      buildFallbackUrl(domain, lineItems);

    return NextResponse.json({ checkout_url: checkoutUrl });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}

function buildFallbackUrl(domain: string, lineItems: CartPandaLineItem[]): string {
  const base = domain.startsWith("http") ? domain : `https://${domain}`;
  // CartPanda supports cart/add with multiple items
  const params = lineItems
    .map(
      (item, i) =>
        `items[${i}][id]=${item.variant_id}&items[${i}][quantity]=${item.quantity}`
    )
    .join("&");
  return `${base}/cart?${params}`;
}
