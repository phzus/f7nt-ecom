"use client";
// Client providers wrapper for the app

import { type ReactNode } from "react";
import CartDrawer from "@/components/cart/CartDrawer";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <CartDrawer />
    </>
  );
}
