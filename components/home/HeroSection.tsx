"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: "#000" }}>
      <Link href="/catalog" aria-label="Shop now — Win BMW M4">
        {/* Desktop */}
        <div className="hidden md:block relative w-full" style={{ height: "429px" }}>
          <Image
            src="/images/HERO-MOBILE.png"
            alt="Win a 2026 BMW M4 Cummins + $10,000"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        {/* Mobile */}
        <div className="block md:hidden relative w-full" style={{ aspectRatio: "9/5" }}>
          <Image
            src="/images/HERO-MOBILE.png"
            alt="Win a 2026 BMW M4 Cummins + $10,000"
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
          />
        </div>
      </Link>
    </section>
  );
}
