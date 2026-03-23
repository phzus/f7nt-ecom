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

export const revalidate = 3600; // ISR: revalidate every 1 hour

async function getHomeProducts() {
  try {
    const allProducts = await getProducts({ limit: 20 });
    return allProducts.map(enrichProduct);
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

  // General catalog products
  const generalProducts = products
    .filter((p) => !fastPassProducts.includes(p))
    .slice(0, 8);

  return (
    <>
      {/* 1. Hero — fullwidth clickable banner */}
      <HeroSection />

      {/* 2. Entry Booster Banner */}
      <EntryBoosterBanner />

      {/* 3. Countdown Timer */}
      <CountdownTimer />

      {/* 4. Fast Pass Tiers */}
      <FastPassGrid products={fastPassProducts} />

      {/* 5. Mystery Cash Boxes */}
      <MysteryBanner />

      {/* 6. Giveaway / Prize Section */}
      <GiveawaySection />

      {/* 7. Featured Apparel/Products */}
      {generalProducts.length > 0 && (
        <FeaturedProducts
          products={generalProducts}
          title="NEW ARRIVALS"
          eyebrow="JUST-IN"
          multiplier={multiplier}
        />
      )}

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. FAQ */}
      <FaqSection />
    </>
  );
}
