// API Route: GET /api/products
// Proxies product fetching to CartPanda (server-side only)

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = process.env.CARTPANDA_API_TOKEN;
  const domain = process.env.CARTPANDA_STORE_DOMAIN;

  if (!token || !domain) {
    return NextResponse.json({ error: "Store not configured" }, { status: 500 });
  }

  const query = searchParams.toString();
  const apiUrl = `https://${domain}/api/v3/products${query ? `?${query}` : ""}`;

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
