// Utility functions
// Migrado de: Liquid filters (| money, | img_url, | truncate, etc.)

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";

// ── Tailwind class merger ──────────────────────────────────────
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── HTML sanitization ─────────────────────────────────────────
// Strips XSS vectors from CartPanda body_html before dangerouslySetInnerHTML
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}

// ── Money / Price formatting ─────────────────────────────────
// Prices from CartPanda API come as plain numbers (e.g. 9.90 = $9.90)
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// ── Entries calculation ──────────────────────────────────────
// Core business logic: $1 spent = N entries
export function calcEntries(cartTotal: number, multiplier: number): number {
  return Math.floor(cartTotal) * multiplier;
}

export function formatEntries(entries: number): string {
  return entries.toLocaleString("en-US");
}

/**
 * Get entries for a product variant.
 * Priority:
 *  1. If variant.sku is a plain integer string (e.g. "100000"), use it as a fixed entries override.
 *     This lets you hardcode entries per product in CartPanda's SKU field, since CartPanda has no metafields.
 *  2. Otherwise, fall back to price × multiplier.
 *
 * Example SKU values:  "100000" → 100,000 entries
 *                      "FP-BLACK-001" → ignored, uses price × multiplier
 */
export function calcProductEntries(
  price: number,
  multiplier: number,
  sku?: string | null
): number {
  if (sku) {
    const skuEntries = parseInt(sku, 10);
    if (!isNaN(skuEntries) && skuEntries > 0 && String(skuEntries) === sku.trim()) {
      return skuEntries;
    }
  }
  return Math.floor(price) * multiplier;
}

// ── String utilities ─────────────────────────────────────────
// Equivalent to Liquid: {{ str | truncate: 80 }}
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + "...";
}

// Equivalent to Liquid: {{ str | handleize }}
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Date formatting ──────────────────────────────────────────
export function formatDate(
  dateStr: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options ?? { dateStyle: "medium" });
}

// ── Image utilities ──────────────────────────────────────────
// Equivalent to Liquid: {{ image | img_url: '800x' }}
export function getSizedImageUrl(src: string, size: string): string {
  if (!src) return "";
  // CartPanda CDN sizing (similar to Shopify)
  const cleanSrc = src.split("?")[0];
  return `${cleanSrc}?width=${size.replace("x", "")}`;
}

// ── Number formatting ────────────────────────────────────────
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Countdown helpers ────────────────────────────────────────
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function getCountdownTime(targetDate: Date): CountdownTime {
  const now = Date.now();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired: false };
}
