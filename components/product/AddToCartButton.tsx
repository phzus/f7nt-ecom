"use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { CartPandaProduct } from "@/types/cartpanda";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: CartPandaProduct;
  variantId: number;
  quantity?: number;
  className?: string;
  label?: string;
  variant?: "primary" | "outline";
  showIcon?: boolean;
}

export default function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  className,
  label = "ADD TO CART",
  variant = "primary",
  showIcon = true,
}: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");
  const { addItem, openCart } = useCart();

  const selectedVariant = product.variants.find((v) => v.id === variantId);
  const isAvailable = selectedVariant?.available !== false;

  const handleAdd = async () => {
    if (!isAvailable || state !== "idle") return;

    setState("loading");

    const image = product.featured_image?.src ?? product.images?.[0]?.src ?? null;

    addItem({
      variantId,
      productId: product.id,
      quantity,
      title: product.title,
      variantTitle: selectedVariant?.title ?? null,
      price: selectedVariant?.price ?? 0,
      image,
      handle: product.handle,
    });

    setState("added");
    openCart();

    setTimeout(() => setState("idle"), 2000);
  };

  const baseClass = variant === "outline" ? "btn-outline" : "btn-primary";

  if (!isAvailable) {
    return (
      <button
        disabled
        className={cn(baseClass, "opacity-50 cursor-not-allowed", className)}
      >
        SOLD OUT
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      disabled={state === "loading"}
      className={cn(
        baseClass,
        "flex items-center justify-center gap-2 transition-all",
        state === "added" && variant === "primary" && "bg-green-600 hover:bg-green-700",
        state === "added" && variant === "outline" && "border-green-600 text-green-600",
        state === "loading" && "opacity-70 cursor-wait",
        className
      )}
      aria-label={state === "added" ? "Added to cart" : label}
    >
      {state === "added" ? (
        <>
          {showIcon && <Check size={14} />}
          ADDED!
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart size={14} />}
          {state === "loading" ? "ADDING..." : label}
        </>
      )}
    </button>
  );
}
