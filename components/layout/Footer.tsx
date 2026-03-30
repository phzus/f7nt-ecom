// Migrado de: /sections/footer.liquid
// Minimal footer: black bg, copyright, payment methods, policy links

import Link from "next/link";
import { footerNav } from "@/config/navigation";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/f7nt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@f7nt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@f7nt",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: "#000000",
        padding: "44px 0 40px",
      }}
    >
      <div className="container-main">
        {/* Social links */}
        <div className="flex justify-center gap-5 mb-8">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="transition-opacity hover:opacity-75"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Policy links */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-opacity hover:opacity-100"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Payment methods label */}
        <div className="flex justify-center mb-4">
          <span className="text-xs uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
            Payment methods
          </span>
        </div>

        {/* Payment icons (SVG badges) */}
        <div className="flex flex-wrap justify-center gap-2 mb-6" aria-label="Accepted payment methods">
          {/* Visa */}
          <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">VISA</div>
          {/* Mastercard */}
          <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">MC</div>
          {/* Amex */}
          <div className="bg-white rounded px-2 py-1 text-xs font-bold text-gray-800">AMEX</div>
          {/* PayPal */}
          <div className="bg-white rounded px-2 py-1 text-xs font-bold text-blue-700">PayPal</div>
        </div>

        {/* Copyright */}
        <p
          className="text-center text-sm"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          © {year}, f7nt.co
        </p>
      </div>
    </footer>
  );
}
