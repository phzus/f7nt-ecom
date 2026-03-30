// CartPanda API v3 HTTP Client

const BASE_URL = `${process.env.CARTPANDA_BASE_URL}/${process.env.CARTPANDA_STORE_SLUG}`;

const defaultHeaders = {
  Authorization: `Bearer ${process.env.CARTPANDA_API_TOKEN}`,
  "Content-Type": "application/json",
};

export async function cartpandaFetch<T = unknown>(
  path: string,
  options: RequestInit & { revalidate?: number; timeoutMs?: number } = {}
): Promise<T> {
  if (!process.env.CARTPANDA_BASE_URL || !process.env.CARTPANDA_STORE_SLUG || !process.env.CARTPANDA_API_TOKEN) {
    throw new Error("CartPanda env vars not configured");
  }

  const { revalidate = 3600, timeoutMs = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      headers: { ...defaultHeaders, ...(fetchOptions.headers ?? {}) },
      next: { revalidate },
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`CartPanda API error ${res.status}: ${text}`);
    }

    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Keep CartPandaError for checkout.ts compatibility
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
