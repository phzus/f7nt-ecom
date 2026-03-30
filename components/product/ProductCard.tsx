"use client";
import Image from "next/image";
import Link from "next/link";
import type { CartPandaProduct } from "@/types/cartpanda";
import { calcProductEntries } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: CartPandaProduct;
  multiplier?: number;
  showEntries?: boolean;
}

function entriesBadgeClass(entries: number): string {
  if (entries >= 15000) return "badge-tier-black";
  if (entries >= 5000)  return "badge-tier-bronze";
  return "badge-tier-gold";
}

export default function ProductCard({
  product,
  multiplier = 200,
  showEntries = false,
}: ProductCardProps) {
  const price     = product.variants?.[0]?.price ?? 0;
  const variantId = product.variants?.[0]?.id;
  const image     = product.images?.[0]?.src;
  const sku       = product.variants?.[0]?.sku;
  const entries   = calcProductEntries(price, multiplier, sku);

  return (
    <article
      className="relative flex flex-col bg-white rounded cursor-pointer"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
    >
      {/* Stretched link — cobre o card inteiro */}
      <Link
        href={`/products/${product.handle}`}
        className="absolute inset-0 z-0"
        aria-label={product.title}
      />

      {/* Image */}
      <div className="relative z-10 aspect-square bg-gray-50 overflow-hidden rounded-t pointer-events-none">
        {image ? (
          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-300 text-4xl">📦</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 p-4 gap-4 pointer-events-none">
        <h3 className="font-bold text-sm uppercase tracking-wide text-black leading-snug">
          {product.title}
        </h3>

        <div className="mt-auto flex flex-col gap-4 pt-1">
          {showEntries && entries > 0 && (
            <span
              className={`badge-shimmer ${entriesBadgeClass(entries)} self-start px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}
            >
              {entries.toLocaleString()} entries
            </span>
          )}
          {variantId && (
            /* pointer-events-auto re-ativa cliques só no botão */
            <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <AddToCartButton
                product={product}
                variantId={variantId}
                variant="outline"
                showIcon={false}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
