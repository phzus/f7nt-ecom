# Migration Log — f7nt.co Shopify → Next.js + CartPanda

## Status Legend
- ✅ Complete
- ⚠️ Partial (notes below)
- 🔴 Blocked / Not started

---

## Pages

| Page | Liquid Original | Next.js Route | Status | Notes |
|---|---|---|---|---|
| Home | `templates/index.json` | `app/page.tsx` | ✅ | All 9 sections implemented |
| Catalog | `templates/collection.json` | `app/catalog/page.tsx` | ✅ | No filters yet (Shopify facets not migrated) |
| Product | `templates/product.json` | `app/products/[slug]/page.tsx` | ✅ | Variant selection, entries display, buy now |
| Contact | `pages/contact` | `app/contact/page.tsx` | ✅ | Form with mailto fallback |
| 404 | Built-in Shopify | `app/not-found.tsx` | ✅ | — |
| Blog | `templates/article.liquid` | — | 🔴 | Not in scope for v1 |
| Account | `templates/customers/*` | — | 🔴 | CartPanda auth not configured |

---

## Sections → Components

| Liquid Section | React Component | Status | Notes |
|---|---|---|---|
| `announcement-bar.liquid` | `components/layout/AnnouncementBar.tsx` | ✅ | Rotating messages with auto-advance |
| `header.liquid` | `components/layout/Header.tsx` | ✅ | Sticky, mobile drawer, cart badge |
| `footer.liquid` | `components/layout/Footer.tsx` | ✅ | Minimal: links, copyright, payment badges |
| `image-banner.liquid` (hero) | `components/home/HeroSection.tsx` | ✅ | Desktop + mobile images |
| Entries booster banner | `components/home/EntryBoosterBanner.tsx` | ✅ | Desktop + mobile PNG banners |
| Countdown section | `components/home/CountdownTimer.tsx` | ✅ | Client-side, configurable via env var |
| `fastpass-collection-grid.liquid` | `components/home/FastPassGrid.tsx` | ✅ | 4 tier cards with gradient badges |
| Mystery boxes section | `components/home/MysteryBanner.tsx` | ✅ | Dark 2-col layout |
| `giveaway-carousel.liquid` | `components/home/GiveawaySection.tsx` | ✅ | Static car grid (no Swiper.js) |
| `featured-collection.liquid` | `components/home/FeaturedProducts.tsx` | ✅ | Grid of products |
| `testimonials.liquid` | `components/home/TestimonialsSection.tsx` | ✅ | Static testimonials |
| `faq-accordion.liquid` | `components/home/FaqSection.tsx` | ✅ | Accordion with CSS transition |
| `main-product.liquid` | `components/product/ProductInfo.tsx` | ✅ | Variant selector, ATC, buy now |

---

## Snippets → Components

| Liquid Snippet | React Component | Status | Notes |
|---|---|---|---|
| `card-product.liquid` | `components/product/ProductCard.tsx` | ✅ | With entries badge, sale badge |
| `product-media-gallery.liquid` | `components/product/ProductGallery.tsx` | ✅ | Thumbnails, arrow nav |
| `cart-drawer.liquid` | `components/cart/CartDrawer.tsx` | ✅ | Entries display, real-time calc |
| `product-variant-picker.liquid` | `components/product/VariantSelector.tsx` | ✅ | Button-style variant selection |
| `facets.liquid` | — | 🔴 | Shopify facets not applicable to CartPanda |
| `header-drawer.liquid` | Inline in `Header.tsx` | ✅ | Mobile nav drawer |

---

## Assets Migrated

| Asset | Source | Destination | Status |
|---|---|---|---|
| logo.png | `assets/logo.png` | `public/images/logo.png` | ✅ |
| Hero mobile | `assets/HERO-MOBILE.png` | `public/images/HERO-MOBILE.png` | ✅ |
| Hero desktop | — | Uses HERO-MOBILE.png as fallback | ⚠️ |
| banner-2-desk.png | `assets/banner-2-desk.png` | `public/images/banner-2-desk.png` | ✅ |
| banner-2-mob.png | `assets/banner-2-mob.png` | `public/images/banner-2-mob.png` | ✅ |
| bg-giveaway-cta-sec.png | `assets/bg-giveaway-cta-sec.png` | `public/images/bg-giveaway-cta-sec.png` | ✅ |
| car-1.png — car-5.png | `assets/car-*.png` | `public/images/car-*.png` | ✅ |

---

## Business Logic

| Feature | Shopify Implementation | Next.js Implementation | Status |
|---|---|---|---|
| Entries calculation | Liquid + custom JS | `lib/utils.ts:calcEntries()` | ✅ |
| Cart persistence | Shopify cart (server) | Zustand + localStorage | ✅ |
| Entries in cart drawer | Liquid cart total × multiplier | `lib/cart-store.ts:totalEntries` | ✅ |
| Checkout redirect | Shopify checkout | `/api/checkout` → CartPanda | ✅ |
| Countdown timer | Custom Liquid section | `components/home/CountdownTimer.tsx` | ✅ |
| Fast Pass badges | Custom CSS gradients | CSS classes in `globals.css` | ✅ |

---

## Known Gaps / Pending

1. **Giveaway carousel** — original uses Swiper.js. Current implementation uses static grid. Can add swiper if needed.
2. **Product filters/facets** — Shopify's faceted search not available in CartPanda v3 API; would need custom implementation.
3. **Blog/Articles** — Not in scope for v1.
4. **Account/Login** — CartPanda customer auth not configured.
5. **Hero desktop image** — The original `DESKTOP_7c44e294-...png` was not in the Shopify assets folder. Using HERO-MOBILE.png as fallback for both. **Replace with actual desktop hero image.**
6. **Checkout integration** — CartPanda `/checkouts` endpoint assumed. If CartPanda returns a different response structure, the checkout URL extraction in `/api/checkout/route.ts` may need adjustment.
7. **Payment icons** — Currently text placeholders (VISA/MC/AMEX/PayPal). Should use actual SVG icons.
8. **Contact form backend** — Currently simulates success with a timeout. Needs a real form backend (Resend, Formspree, etc.).
9. **Analytics** — No GTM/Meta Pixel/GA4 configured yet.
10. **Fast Pass product mapping** — Products are filtered by title/tag. Make sure CartPanda products have "Fast Pass" or "fastpass" in their title or tags for correct categorization.

---

## Environment Variables Required

```env
CARTPANDA_API_TOKEN=<secret>        # Server-side only
CARTPANDA_STORE_DOMAIN=f7nt.mycartpanda.com
NEXT_PUBLIC_ENTRIES_MULTIPLIER=200
NEXT_PUBLIC_SITE_URL=https://f7nt.co
NEXT_PUBLIC_CARTPANDA_STORE_URL=https://f7nt.mycartpanda.com
NEXT_PUBLIC_COUNTDOWN_DATE=2026-06-01T00:00:00Z
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 |
| State | Zustand v5 + localStorage |
| Font | Montserrat (next/font/google) |
| Icons | Lucide React |
| Images | next/image |
| Commerce | CartPanda API v3 |
| Deploy | Vercel (recommended) |
