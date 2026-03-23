// CartPanda API v3 HTTP Client
// Migrado de: Shopify Storefront API calls (cart.js, product-info.js)

const BASE_URL = `https://${process.env.CARTPANDA_STORE_DOMAIN}/api/v3`;
const TOKEN = process.env.CARTPANDA_API_TOKEN;

interface FetchOptions extends RequestInit {
  revalidate?: number;
}

export async function cartpandaFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, ...fetchOptions } = options;

  if (!TOKEN) {
    throw new Error("CARTPANDA_API_TOKEN is not configured");
  }

  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...fetchOptions.headers,
    },
    next: revalidate !== undefined ? { revalidate } : undefined,
  });

  if (!response.ok) {
    let errorBody: unknown;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = await response.text();
    }
    throw new CartPandaError(
      `CartPanda API error ${response.status}: ${response.statusText}`,
      response.status,
      errorBody
    );
  }

  return response.json() as Promise<T>;
}

export class CartPandaError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown
  ) {
    super(message);
    this.name = "CartPandaError";
  }
}
