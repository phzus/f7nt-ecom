"use client";
// Migrado de: /sections/header.liquid + /snippets/header-drawer.liquid
// Sticky header with logo, nav, icons — black background

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { mainNav } from "@/config/navigation";
import { useCart } from "@/lib/cart-store";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 990) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full transition-shadow duration-300"
        style={{
          backgroundColor: "#000000",
          height: "52px",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div
          className="container-main h-full flex items-center"
          style={{ padding: "4px 20px" }}
        >
          {/* Grid: Logo | Nav | Icons */}
          <div className="grid items-center w-full" style={{ gridTemplateColumns: "157.5px 1fr auto", gap: "0" }}>
            {/* Logo */}
            <Link href="/" aria-label="f7nt.co home">
              <Image
                src="/images/logo.png"
                alt="f7nt.co"
                width={150}
                height={19}
                className="object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 justify-center" aria-label="Main navigation">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white font-normal transition-opacity hover:opacity-75"
                  style={{ fontSize: "16px", letterSpacing: "0.6px" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Utility Icons */}
            <div className="flex items-center gap-4 justify-end">
              {/* Search */}
              <button
                aria-label="Search"
                className="text-white opacity-75 hover:opacity-100 transition-opacity hidden md:flex"
              >
                <Search size={20} />
              </button>

              {/* Cart with badge */}
              <button
                onClick={openCart}
                aria-label={`Cart, ${totalQuantity} items`}
                className="text-white opacity-75 hover:opacity-100 transition-opacity relative flex"
              >
                <ShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span
                    className="absolute -top-2 -right-2 flex items-center justify-center rounded-full text-white font-bold"
                    style={{
                      backgroundColor: "#fa2d2d",
                      width: "18px",
                      height: "18px",
                      fontSize: "10px",
                      lineHeight: "1",
                    }}
                    aria-hidden="true"
                  >
                    {totalQuantity > 9 ? "9+" : totalQuantity}
                  </span>
                )}
              </button>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="text-white opacity-75 hover:opacity-100 transition-opacity flex lg:hidden"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed top-0 left-0 h-full w-72 z-50 flex flex-col pt-16 pb-8 px-6 lg:hidden"
            style={{ backgroundColor: "#000000" }}
            aria-label="Mobile navigation"
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-white opacity-75 hover:opacity-100"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col gap-6">
              {mainNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/75 hover:text-white text-base font-normal transition-colors"
                  style={{ letterSpacing: "0.6px" }}
                >
                  {link.label}
                </Link>
              ))}

              <hr className="border-white/10 my-2" />

              <button
                onClick={() => { setMenuOpen(false); openCart(); }}
                className="text-white/75 hover:text-white text-base transition-colors flex items-center gap-2 text-left"
              >
                <ShoppingCart size={16} />
                Cart ({totalQuantity})
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
