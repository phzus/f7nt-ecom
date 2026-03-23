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
}

export default function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  className,
  label = "ADD TO CART",
}: AddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");
  const { addItem, openCart } = useCart();

  const variant = product.variants.find((v) => v.id === variantId);
  const isAvailable = variant?.available !== false;

  const handleAdd = async () => {
    if (!isAvailable || state !== "idle") return;

    setState("loading");

    const image = product.featured_image?.src ?? product.images?.[0]?.src ?? null;

    addItem({
      variantId,
      productId: product.id,
      quantity,
      title: product.title,
      variantTitle: variant?.title ?? null,
      price: parseFloat(variant?.price ?? "0"),
      image,
      handle: product.handle,
    });

    setState("added");
    openCart();

    setTimeout(() => setState("idle"), 2000);
  };

  if (!isAvailable) {
    return (
      <button
        disabled
        className={cn("btn-primary opacity-50 cursor-not-allowed", className)}
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
        "btn-primary flex items-center justify-center gap-2 transition-all",
        state === "added" && "bg-green-600 hover:bg-green-700",
        state === "loading" && "opacity-70 cursor-wait",
        className
      )}
      aria-label={state === "added" ? "Added to cart" : label}
    >
      {state === "added" ? (
        <>
          <Check size={14} />
          ADDED!
        </>
      ) : (
        <>
          <ShoppingCart size={14} />
          {state === "loading" ? "ADDING..." : label}
        </>
      )}
    </button>
  );
}
