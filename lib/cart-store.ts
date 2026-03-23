"use client";
// Zustand Cart Store with entries calculation
// Migrado de: /assets/cart.js + /snippets/cart-drawer.liquid (entries logic)

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { LocalCartItem } from "@/types/cartpanda";
import { calcEntries } from "./utils";

interface CartState {
  items: LocalCartItem[];
  isOpen: boolean;
  isLoading: boolean;

  // Computed values (derived)
  readonly totalQuantity: number;
  readonly totalPrice: number;
  readonly totalEntries: number;

  // Actions
  addItem: (item: Omit<LocalCartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const ENTRIES_MULTIPLIER = parseInt(
  process.env.NEXT_PUBLIC_ENTRIES_MULTIPLIER ?? "200",
  10
);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isLoading: false,

      // Computed getters
      get totalQuantity() {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      get totalEntries() {
        return calcEntries(get().totalPrice, ENTRIES_MULTIPLIER);
      },

      // Add or increment item
      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.variantId === newItem.variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.variantId === newItem.variantId
                  ? { ...i, quantity: i.quantity + (newItem.quantity ?? 1) }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...newItem, quantity: newItem.quantity ?? 1 },
            ],
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "f7nt-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Hook with computed entries multiplier from env
export function useCart() {
  const store = useCartStore();
  const multiplier = ENTRIES_MULTIPLIER;

  const totalPrice = store.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalQuantity = store.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalEntries = calcEntries(totalPrice, multiplier);

  return {
    ...store,
    totalPrice,
    totalQuantity,
    totalEntries,
    multiplier,
  };
}
