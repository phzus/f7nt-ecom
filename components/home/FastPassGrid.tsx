import Image from "next/image";
import Link from "next/link";
import type { CartPandaProduct } from "@/types/cartpanda";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/product/AddToCartButton";

type Tier = "BLACK" | "PLATINUM" | "GOLD" | "BRONZE";

interface FastPassTier {
  tier: Tier;
  entries: string;
  label: string;
  badgeClass: string;
}

const TIERS: FastPassTier[] = [
  { tier: "BLACK", entries: "100,000", label: "BLACK", badgeClass: "badge-tier-black" },
  { tier: "PLATINUM", entries: "80,000", label: "PLATINUM", badgeClass: "badge-tier-platinum" },
  { tier: "GOLD", entries: "30,000", label: "GOLD", badgeClass: "badge-tier-gold" },
  { tier: "BRONZE", entries: "15,000", label: "BRONZE", badgeClass: "badge-tier-bronze" },
];

interface FastPassGridProps {
  products: CartPandaProduct[];
}

export default function FastPassGrid({ products }: FastPassGridProps) {
  return (
    <section className="w-full py-14" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container-main">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8e8e8e" }}>
            FAST PASS
          </p>
          <h2 className="text-3xl md:text-5xl font-black" style={{ color: "#000", letterSpacing: "-0.02em" }}>
            ENTER TO WIN
          </h2>
          <p className="text-base mt-3" style={{ color: "rgba(26,26,26,0.75)" }}>
            Choose your Fast Pass tier and instantly earn entries
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {TIERS.map((tierInfo, i) => {
            const product = products[i] ?? null;
            return (
              <FastPassCard
                key={tierInfo.tier}
                tierInfo={tierInfo}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface FastPassCardProps {
  tierInfo: FastPassTier;
  product: CartPandaProduct | null;
}

function FastPassCard({ tierInfo, product }: FastPassCardProps) {
  const price = product?.variants?.[0]?.price ?? null;
  const variantId = product?.variants?.[0]?.id ?? null;
  const image = product?.images?.[0]?.src ?? null;
  const title = product?.title ?? `${tierInfo.tier} Fast Pass`;
  const handle = product?.handle ?? "#";

  return (
    <article className="card-fast-pass">
      {/* Image */}
      <Link href={`/products/${handle}`} className="w-full mb-4">
        <div
          className="relative w-full rounded-lg overflow-hidden bg-gray-100"
          style={{ aspectRatio: "1/1" }}
        >
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-4xl">🏎️</span>
            </div>
          )}
        </div>
      </Link>

      {/* Badge */}
      <div
        className={`badge-shimmer px-4 py-2 rounded-full text-xs font-bold uppercase mb-3 ${tierInfo.badgeClass}`}
        style={{ letterSpacing: "0.5px" }}
      >
        {tierInfo.entries} ENTRIES
      </div>

      {/* Title */}
      <h3
        className="text-sm font-extrabold uppercase mb-1"
        style={{ letterSpacing: "1.5px", color: "#000" }}
      >
        {tierInfo.label}
      </h3>

      {/* Subtitle */}
      <p className="text-xs mb-3" style={{ color: "#8e8e8e" }}>
        {tierInfo.entries} entries included
      </p>

      {/* Price */}
      {price && (
        <p className="text-base font-bold mb-4" style={{ color: "#1a1a1a" }}>
          {formatPrice(parseFloat(price))}
        </p>
      )}

      {/* ATC */}
      {product && variantId ? (
        <AddToCartButton
          product={product}
          variantId={variantId}
          className="btn-primary w-full"
        />
      ) : (
        <button className="btn-primary w-full" disabled>
          Coming Soon
        </button>
      )}
    </article>
  );
}
