// API Route: GET /api/products
// Proxies product fetching to CartPanda (server-side only)

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = process.env.CARTPANDA_API_TOKEN;
  // Support both CARTPANDA_STORE_DOMAIN (legacy) and the actual env vars used by the app
  const baseUrl = process.env.CARTPANDA_BASE_URL;
  const storeSlug = process.env.CARTPANDA_STORE_SLUG;

  if (!token || (!baseUrl && !storeSlug)) {
    return NextResponse.json({ error: "Store not configured" }, { status: 500 });
  }

  const query = searchParams.toString();
  // Build URL from CARTPANDA_BASE_URL + CARTPANDA_STORE_SLUG (e.g. https://accounts.cartpanda.com/api/v3/funtfit)
  const apiBase = baseUrl && storeSlug ? `${baseUrl}/${storeSlug}` : null;
  if (!apiBase) {
    return NextResponse.json({ error: "Store not configured" }, { status: 500 });
  }
  const apiUrl = `${apiBase}/products${query ? `?${query}` : ""}`;

  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
