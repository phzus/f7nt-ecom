// API Route: POST /api/checkout
// Builds a CartPanda checkout URL from line items.
// CartPanda checkout format: /checkout/{variantId}:{qty},{variantId}:{qty},...

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

    const storeUrl =
      process.env.NEXT_PUBLIC_CARTPANDA_STORE_URL ?? "";

    if (!storeUrl) {
      return NextResponse.json(
        { error: "Store URL not configured" },
        { status: 500 }
      );
    }

    // CartPanda checkout URL format:
    // https://{store}/checkout/{variantId}:{qty},{variantId}:{qty}
    const items = lineItems
      .map((item) => `${item.variant_id}:${item.quantity}`)
      .join(",");

    const checkout_url = `${storeUrl}/checkout/${items}`;

    return NextResponse.json({ checkout_url });
  } catch (error) {
    console.error("Checkout route error:", error);
    return NextResponse.json(
      { error: "Failed to build checkout URL" },
      { status: 500 }
    );
  }
}
