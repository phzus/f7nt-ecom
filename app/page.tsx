// Home page — migrado de: templates/index.liquid
// Server Component — fetches products via CartPanda API

import HeroSection from "@/components/home/HeroSection";
import EntryBoosterBanner from "@/components/home/EntryBoosterBanner";
import CountdownTimer from "@/components/home/CountdownTimer";
import FastPassGrid from "@/components/home/FastPassGrid";
import MysteryBanner from "@/components/home/MysteryBanner";
import GiveawaySection from "@/components/home/GiveawaySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import { getProducts, enrichProduct } from "@/lib/cartpanda/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win a 2026 BMW M4 Cummins + $10,000 | f7nt.co",
  description:
    "Shop f7nt.co and automatically earn entries to win a 2026 Limited BMW M4 Cummins + $10,000 cash. Every $1 spent = 200 entries.",
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

// Helper: hide internal upsell/funnel products from public pages
const isUpsellProduct = (title: string) => /\[(UP\d+|F\d*)\]/i.test(title);

async function getHomeProducts() {
  try {
    const allProducts = await getProducts({ limit: 20 });
    return allProducts
      .filter((p) => !isUpsellProduct(p.title))
      .map(enrichProduct);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getHomeProducts();
  const multiplier = parseInt(
    process.env.NEXT_PUBLIC_ENTRIES_MULTIPLIER ?? "200",
    10
  );

  // Fast pass products: filter by title or tags
  const fastPassProducts = products
    .filter(
      (p) =>
        p.title.toLowerCase().includes("fast pass") ||
        p.title.toLowerCase().includes("fastpass") ||
        p.tags?.some(
          (t) =>
            t.toLowerCase().includes("fast-pass") ||
            t.toLowerCase().includes("fastpass")
        )
    )
    .slice(0, 4);

  const nonFastPass = products.filter((p) => !fastPassProducts.includes(p));

  // NEW RELEASES — first 4 non-fastpass products
  const newReleases = nonFastPass.slice(0, 4);

  // Caps / headwear
  const isCap = (p: (typeof products)[0]) => {
    const t = p.title.toLowerCase();
    const type = (p.product_type ?? "").toLowerCase();
    return (
      t.includes("cap") ||
      t.includes("hat") ||
      t.includes("trucker") ||
      type.includes("cap") ||
      type.includes("hat") ||
      p.tags?.some((tag) => ["cap", "hat", "headwear"].includes(tag.toLowerCase()))
    );
  };

  // T-shirts / apparel
  const isTshirt = (p: (typeof products)[0]) => {
    const t = p.title.toLowerCase();
    const type = (p.product_type ?? "").toLowerCase();
    return (
      t.includes("t-shirt") ||
      t.includes("tshirt") ||
      t.includes("shirt") ||
      t.includes("hoodie") ||
      type.includes("shirt") ||
      type.includes("apparel") ||
      p.tags?.some((tag) =>
        ["shirt", "t-shirt", "apparel", "tshirt"].includes(tag.toLowerCase())
      )
    );
  };

  const capProducts     = nonFastPass.filter(isCap).slice(0, 3);
  const apparelProducts = nonFastPass.filter(isTshirt).slice(0, 3);

  return (
    <>
      {/* 1. Hero — fullwidth clickable banner */}
      <HeroSection />

      {/* 2. Entry Booster Banner */}
      <EntryBoosterBanner />

      {/* 3. Countdown Timer */}
      <CountdownTimer />

      {/* 4. Fast Pass Tiers */}
      <FastPassGrid products={fastPassProducts} multiplier={multiplier} />

      {/* 5. Mystery Cash Boxes */}
      <MysteryBanner />

      {/* 6. NEW RELEASES grid */}
      {newReleases.length > 0 && (
        <FeaturedProducts
          products={newReleases}
          title="NEW RELEASES"
          eyebrow="JUST-IN"
          multiplier={multiplier}
        />
      )}

      {/* 7. Giveaway / BMW Prize Section */}
      <GiveawaySection />

      {/* 8. Headwear grid */}
      {capProducts.length > 0 && (
        <FeaturedProducts
          products={capProducts}
          title="LEGENDS WEAR CROWNS"
          eyebrow="HEADWEAR"
          multiplier={multiplier}
          cols={3}
        />
      )}

      {/* 9. Apparel / T-shirts grid */}
      {apparelProducts.length > 0 && (
        <FeaturedProducts
          products={apparelProducts}
          title="STREETWEAR ESSENTIALS"
          eyebrow="APPAREL"
          multiplier={multiplier}
          cols={3}
        />
      )}

      {/* 9. Testimonials */}
      <TestimonialsSection />

      {/* 10. FAQ */}
      <FaqSection />
    </>
  );
}
