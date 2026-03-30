import Image from "next/image";
import Link from "next/link";
import type { CartPandaProduct } from "@/types/cartpanda";
import AddToCartButton from "@/components/product/AddToCartButton";

type Tier = "BLACK" | "PLATINUM" | "GOLD" | "BRONZE";

interface FastPassTier {
  tier: Tier;
  entries: string;
  label: string;
  badgeClass: string;
}

// TODO: connect entry counts to CartPanda metafields when available.
// Until then, these values are the canonical source of truth for the UI.
const TIERS: FastPassTier[] = [
  { tier: "BLACK",    entries: "100,000", label: "BLACK",    badgeClass: "badge-tier-black"    },
  { tier: "PLATINUM", entries: "80,000",  label: "PLATINUM", badgeClass: "badge-tier-platinum" },
  { tier: "GOLD",     entries: "30,000",  label: "GOLD",     badgeClass: "badge-tier-gold"     },
  { tier: "BRONZE",   entries: "15,000",  label: "BRONZE",   badgeClass: "badge-tier-bronze"   },
];

interface FastPassGridProps {
  products: CartPandaProduct[];
  multiplier?: number;
}

export default function FastPassGrid({ products, multiplier = 200 }: FastPassGridProps) {
  if (process.env.NODE_ENV === "development" && products.length < TIERS.length) {
    console.warn(
      `[FastPassGrid] Expected ${TIERS.length} fast-pass products but received ${products.length}. ` +
        `Check that CartPanda products have "fast pass" in title or "fastpass" tag.`
    );
  }

  return (
    <section className="w-full py-20" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="container-main">
        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TIERS.map((tierInfo) => {
            // Match product by tier name in title (e.g. "BLACK Fast Pass" or "Fast Pass BLACK")
            const tierLower = tierInfo.tier.toLowerCase();
            const product =
              products.find((p) =>
                p.title.toLowerCase().includes(tierLower)
              ) ?? null;
            return (
              <FastPassCard
                key={tierInfo.tier}
                tierInfo={tierInfo}
                product={product}
                multiplier={multiplier}
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
  multiplier?: number;
}

function FastPassCard({ tierInfo, product }: FastPassCardProps) {
  const variantId = product?.variants?.[0]?.id ?? null;
  const image     = product?.images?.[0]?.src ?? null;
  const title     = product?.title ?? `${tierInfo.tier} Fast Pass`;
  const handle    = product?.handle ?? "#";

  return (
    <article
      className="flex flex-col bg-white rounded overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      {/* Image */}
      <Link href={`/products/${handle}`} className="block relative aspect-square bg-gray-100">
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
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 items-center text-center p-4 gap-3">
        {/* Badge */}
        <span
          className={`badge-shimmer ${tierInfo.badgeClass} px-4 py-1.5 rounded-full text-xs font-bold uppercase whitespace-nowrap`}
          style={{ letterSpacing: "0.5px" }}
        >
          {tierInfo.entries} ENTRIES
        </span>

        {/* Tier name */}
        <h3
          className="font-extrabold uppercase"
          style={{ letterSpacing: "1.5px", color: "#000", fontSize: "16px" }}
        >
          {tierInfo.label}
        </h3>

        {/* ATC */}
        <div className="mt-auto w-full pt-1">
          {product && variantId ? (
            <AddToCartButton
              product={product}
              variantId={variantId}
              className="w-full"
              showIcon={false}
            />
          ) : (
            <button className="btn-primary w-full" disabled>
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
