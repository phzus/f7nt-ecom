import Image from "next/image";
import Link from "next/link";

export default function MysteryBanner() {
  return (
    <section className="w-full py-0" style={{ backgroundColor: "#000" }}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5" style={{ padding: "40px 0" }}>
          {/* Image — use mystery-box.png when available, fallback to placeholder */}
          <div className="relative w-full" style={{ aspectRatio: "1/1", maxHeight: "400px" }}>
            <Image
              src="/images/mystery-box.png"
              alt="Mystery Cash Box"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 px-4 md:px-8">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#8e8e8e" }}>
              LIMITED EDITION
            </p>
            <h2
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "#fff" }}
            >
              MYSTERY<br />CASH BOXES
            </h2>
            <p className="text-base leading-relaxed font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>
              LOADED WITH MYSTERY APPAREL &amp; ACCESSORIES!
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <span className="text-sm font-bold uppercase tracking-wide" style={{ color: "#00ff00" }}>
                LUCKIEST PRODUCT
              </span>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              MORE THAN 30 WINNERS BOUGHT ONE!
            </p>
            <Link
              href="/catalog"
              className="btn-cta inline-flex items-center justify-center px-10 py-4 text-base font-bold self-start"
              style={{ borderRadius: "4px" }}
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
