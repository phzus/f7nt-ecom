import Image from "next/image";
import Link from "next/link";
import type { CartPandaProduct } from "@/types/cartpanda";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: CartPandaProduct;
  multiplier?: number;
  showEntries?: boolean;
}

export default function ProductCard({
  product,
  multiplier = 200,
  showEntries = false,
}: ProductCardProps) {
  const price = product.variants?.[0]?.price ?? "0";
  const comparePrice = product.variants?.[0]?.compare_at_price;
  const variantId = product.variants?.[0]?.id;
  const image = product.images?.[0]?.src;
  const isOnSale = comparePrice && parseFloat(comparePrice) > parseFloat(price);
  const entries = Math.floor(parseFloat(price)) * multiplier;

  return (
    <article className="card-product group">
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="block relative" style={{ aspectRatio: "1/1" }}>
        <div className="relative w-full h-full overflow-hidden bg-gray-900">
          {image ? (
            <Image
              src={image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-600 text-4xl">📦</span>
            </div>
          )}
        </div>

        {/* Sale badge */}
        {isOnSale && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}

        {/* Entries badge */}
        {showEntries && entries > 0 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <span className="badge-tier-black badge-shimmer px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
              {entries.toLocaleString()} ENTRIES
            </span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-2.5 pb-4 bg-black">
        {product.vendor && (
          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>
            {product.vendor}
          </p>
        )}
        <Link href={`/products/${product.handle}`}>
          <h3
            className="font-normal leading-tight mb-2 hover:opacity-80 transition-opacity"
            style={{ color: "#fff", fontSize: "25.2px" }}
          >
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-white">{formatPrice(parseFloat(price))}</span>
          {isOnSale && comparePrice && (
            <span className="line-through text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              {formatPrice(parseFloat(comparePrice))}
            </span>
          )}
        </div>
        {variantId && (
          <AddToCartButton
            product={product}
            variantId={variantId}
            className="w-full"
          />
        )}
      </div>
    </article>
  );
}
