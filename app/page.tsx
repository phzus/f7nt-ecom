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
import { getProducts, getProductsByCollection, enrichProduct } from "@/lib/cartpanda/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win a 2026 BMW M4 Cummins + $10,000 | f7nt.co",
  description:
    "Shop f7nt.co and automatically earn entries to win a 2026 Limited BMW M4 Cummins + $10,000 cash. Every $1 spent = 200 entries.",
};

export const revalidate = 60; // ISR: revalidate every 60 seconds

// CartPanda collection IDs
const COLLECTION_FAST_PASS   = 2034730;
const COLLECTION_NEW_RELEASES = 2035122;
const COLLECTION_CAPS        = 2034733;
const COLLECTION_TSHIRTS     = 2034734;

async function fetchCollection(id: number) {
  try {
    return (await getProductsByCollection(id)).map(enrichProduct);
  } catch {
    return [];
  }
}

async function getMysteryBoxImage(): Promise<string | undefined> {
  try {
    const all = await getProducts({});
    const mystery = all.find((p) =>
      p.title.toLowerCase().includes("mystery")
    );
    const enriched = mystery ? enrichProduct(mystery) : null;
    return enriched?.images?.[0]?.src ?? enriched?.featured_image?.src;
  } catch {
    return undefined;
  }
}

export default async function HomePage() {
  const multiplier = parseInt(
    process.env.NEXT_PUBLIC_ENTRIES_MULTIPLIER ?? "200",
    10
  );

  const [fastPassProducts, newReleases, capProducts, apparelProducts, mysteryBoxImage] =
    await Promise.all([
      fetchCollection(COLLECTION_FAST_PASS),
      fetchCollection(COLLECTION_NEW_RELEASES),
      fetchCollection(COLLECTION_CAPS),
      fetchCollection(COLLECTION_TSHIRTS),
      getMysteryBoxImage(),
    ]);

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
      <MysteryBanner image={mysteryBoxImage} />

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
          eyebrow="T-SHIRTS"
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
