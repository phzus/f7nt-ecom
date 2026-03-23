// Migrado de: /sections/footer.liquid
// Minimal footer: black bg, copyright, payment methods, policy links

import Link from "next/link";
import { footerNav } from "@/config/navigation";

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
