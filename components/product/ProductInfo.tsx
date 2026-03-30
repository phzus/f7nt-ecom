"use client";
// Migrado de: sections/main-product.liquid (product info + form area)
// Client component for variant selection + add to cart

import { useState, useCallback } from "react";
import type { CartPandaProduct, CartPandaVariant } from "@/types/cartpanda";
import { formatPrice, formatEntries, sanitizeHtml, calcProductEntries } from "@/lib/utils";
import VariantSelector from "./VariantSelector";
import AddToCartButton from "./AddToCartButton";

interface ProductInfoProps {
  product: CartPandaProduct;
  multiplier: number;
}

export default function ProductInfo({ product, multiplier }: ProductInfoProps) {
  const defaultVariant = product.variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id ?? 0);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant: CartPandaVariant | undefined = product.variants.find(
    (v) => v.id === selectedVariantId
  );

  const price = selectedVariant?.price ?? 0;
  const comparePrice = selectedVariant?.compare_at_price ?? 0;
  const isOnSale = comparePrice > 0 && comparePrice > price;
  const isAvailable = selectedVariant?.available !== false;
  const sku = selectedVariant?.sku;
  // Use SKU override if present (pure integer = custom entries count), else price × multiplier
  const entries = calcProductEntries(price * quantity, multiplier, sku);

  const handleVariantChange = useCallback((variantId: number) => {
    setSelectedVariantId(variantId);
  }, []);

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items: [{ variant_id: selectedVariantId, quantity }],
        }),
      });
      const data = await response.json();
      if (data.checkout_url) window.location.href = data.checkout_url;
    } catch {
      console.error("Buy now failed");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Vendor */}
      {product.vendor && product.vendor !== 'undefined' && product.vendor !== 'Undefined' && (
        <p className="text-xs" style={{ color: "rgba(26,26,26,0.75)", fontSize: "10px" }}>
          {product.vendor}
        </p>
      )}

      {/* Title */}
      <h1
        className="font-normal leading-tight"
        style={{ fontSize: "56px", letterSpacing: "0.84px", color: "#1a1a1a", lineHeight: "68px" }}
      >
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
          {formatPrice(price)}
        </span>
        {isOnSale && (
          <span className="text-lg line-through" style={{ color: "rgba(26,26,26,0.5)" }}>
            {formatPrice(comparePrice)}
          </span>
        )}
        {isOnSale && (
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            SALE
          </span>
        )}
      </div>

      {/* Entries callout */}
      {entries > 0 && (
        <div
          className="rounded-lg px-4 py-3 text-sm font-bold"
          style={{ backgroundColor: "#000", color: "#fff" }}
        >
          🎟 This purchase earns you{" "}
          <span style={{ color: "#00ff00" }}>{formatEntries(entries)} ENTRIES</span>
          <span className="font-normal ml-1" style={{ color: "rgba(255,255,255,0.7)" }}>
            (every $1 = {multiplier} entries)
          </span>
        </div>
      )}

      {/* Variants */}
      {product.options && product.variants && (
        <VariantSelector
          options={product.options}
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onVariantChange={handleVariantChange}
        />
      )}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-bold uppercase mb-2" style={{ letterSpacing: "0.6px" }}>
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg leading-none"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-5 py-3 text-base font-medium min-w-[50px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg leading-none"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Availability */}
      {!isAvailable && (
        <p className="text-sm font-medium text-red-600">
          This variant is currently out of stock
        </p>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col gap-3">
        <AddToCartButton
          product={product}
          variantId={selectedVariantId}
          quantity={quantity}
          className="btn-atc py-3 text-base"
          label="ADD TO CART"
        />

        <button
          onClick={handleBuyNow}
          disabled={!isAvailable}
          className="btn-buy-now text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Buy it now"
        >
          BUY IT NOW
        </button>
      </div>

      {/* Description */}
      {product.body_html && (
        <div
          className="prose prose-sm max-w-none mt-4 pt-4 border-t"
          style={{ borderColor: "#f0f0f0", color: "rgba(26,26,26,0.75)" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.body_html) }}
        />
      )}
    </div>
  );
}
