"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: "#000" }}>
      <Link href="/catalog" aria-label="Shop now — Win BMW M4">
        {/* Desktop */}
        <div className="hidden md:block relative w-full" style={{ height: "550px" }}>
          <Image
            src="/images/HERO-DESKTOP.png"
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
            src="/images/HERO-MOBILE.webp"
            alt="Win a 2026 BMW M4 Cummins + $10,000"
            fill
            className="object-cover object-top"
            priority
            quality={85}
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>
      </Link>
    </section>
  );
}
