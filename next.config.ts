import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
