import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /cart → home (cart is a drawer, not a page)
      { source: "/cart", destination: "/", permanent: false },
      // Shopify collection URLs → /catalog
      { source: "/collections/:path*", destination: "/catalog", permanent: true },
      // Shopify page URLs
      { source: "/pages/giveaway", destination: "/#giveaway", permanent: false },
      { source: "/pages/faq", destination: "/#faq", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f7nt.mycartpanda.com",
      },
      {
        protocol: "https",
        hostname: "*.mycartpanda.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cartpanda.com",
      },
      {
        protocol: "https",
        hostname: "*.cartpanda.com",
      },
      // CartPanda assets CDN (used for product images)
      {
        protocol: "https",
        hostname: "assets.mycartpanda.com",
      },
      // Shopify CDN (for any migrated product images)
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
