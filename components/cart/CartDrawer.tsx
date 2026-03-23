"use client";
// Migrado de: /snippets/cart-drawer.liquid
// Slide-out drawer with real-time entries calculation

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice, formatEntries } from "@/lib/utils";
import type { LocalCartItem } from "@/types/cartpanda";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalPrice,
    totalQuantity,
    totalEntries,
    multiplier,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line_items: items.map((item) => ({
            variant_id: item.variantId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch {
      console.error("Checkout failed");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full z-50 flex flex-col bg-white transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "min(400px, 100vw)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "#f0f0f0" }}
        >
          <h2 className="font-bold text-lg uppercase tracking-wider" style={{ color: "#1a1a1a" }}>
            Your Cart {totalQuantity > 0 && `(${totalQuantity})`}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-gray-500 hover:text-black transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Entries summary bar */}
        {totalEntries > 0 && (
          <div
            className="px-5 py-3 text-center"
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            <span className="text-sm font-bold uppercase tracking-wider">
              🎟 Your order earns{" "}
              <span style={{ color: "#00ff00" }}>
                {formatEntries(totalEntries)} ENTRIES
              </span>
            </span>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gray-300" />
              <p className="text-gray-500 text-base">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="btn-primary px-6 py-3 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <CartItem
                  key={item.variantId}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div
            className="px-5 py-4 border-t"
            style={{ borderColor: "#f0f0f0" }}
          >
            {/* Entries breakdown */}
            <div
              className="rounded-lg p-3 mb-4 text-sm"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <div className="flex justify-between text-gray-600 mb-1">
                <span>Every $1 spent</span>
                <span className="font-bold">{multiplier} entries</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total entries:</span>
                <span style={{ color: "#00aa00" }}>
                  {formatEntries(totalEntries)}
                </span>
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <p className="text-xs text-gray-500 mb-3 text-center">
              Taxes and shipping calculated at checkout
            </p>

            <button
              onClick={handleCheckout}
              className="w-full py-4 text-white font-bold uppercase tracking-wider rounded transition-colors"
              style={{ backgroundColor: "#000", letterSpacing: "1px" }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
            >
              Checkout — {formatPrice(totalPrice)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ── CartItem sub-component ──────────────────────────────────────
interface CartItemProps {
  item: LocalCartItem;
  onUpdateQuantity: (variantId: number, quantity: number) => void;
  onRemove: (variantId: number) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <li className="flex gap-3" style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
      {/* Image */}
      <div className="flex-shrink-0 relative w-16 h-16 rounded overflow-hidden bg-gray-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ShoppingBag size={20} className="text-gray-400" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm leading-tight truncate" style={{ color: "#1a1a1a" }}>
          {item.title}
        </p>
        {item.variantTitle && item.variantTitle !== "Default Title" && (
          <p className="text-xs text-gray-500 mt-0.5">{item.variantTitle}</p>
        )}
        <p className="text-sm font-bold mt-1" style={{ color: "#1a1a1a" }}>
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <div
            className="flex items-center border rounded"
            style={{ borderColor: "#e0e0e0" }}
          >
            <button
              onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="px-2 py-1 hover:bg-gray-100 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="px-2 text-sm font-medium min-w-[24px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
              aria-label="Increase quantity"
              className="px-2 py-1 hover:bg-gray-100 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.variantId)}
            aria-label="Remove item"
            className="text-gray-400 hover:text-red-500 transition-colors ml-auto"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
