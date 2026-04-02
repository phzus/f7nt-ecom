import Image from "next/image";
import Link from "next/link";

export default function MysteryBanner() {
  return (
    <section className="w-full py-0" style={{ backgroundColor: "#f2f2f2" }}>
      <div className="container-main">
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(to bottom, #000 0%, #0d2d0d 50%, #000 100%)" }}
        >
          <div className="flex flex-col md:grid md:grid-cols-2 items-center">
            {/* Text */}
            <div className="flex flex-col gap-4 p-10 md:p-12 md:pl-20 order-2 md:order-1">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.55)" }}>
                LIMITED EDITION
              </p>
              <h2
                className="font-black leading-tight"
                style={{ color: "#fff", fontSize: "clamp(1rem, 7vw, 3rem)", letterSpacing: "-0.02em", lineHeight: "130%" }}
              >
                MYSTERY CASH<br />BOXES
              </h2>
              <p className="text-sm font-bold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.85)" }}>
                LOADED WITH MYSTERY APPAREL &amp; ACCESSORIES!
              </p>

              <div className="self-start">
                <span
                  className="badge-shimmer badge-tier-bronze inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase"
                  style={{ letterSpacing: "0.5px" }}
                >
                  🏆 LUCKIEST PRODUCT
                </span>
              </div>

              <p className="text-base font-black" style={{ color: "#fff" }}>
                MORE THAN 30 WINNERS<br />BOUGHT ONE!
              </p>

              <Link
                href="/catalog"
                className="btn-cta self-start inline-flex items-center justify-center px-10 py-4 text-sm font-bold"
                style={{ borderRadius: "4px" }}
              >
                SHOP NOW
              </Link>
            </div>

            {/* Image — único elemento, aparece em cima no mobile e à direita no desktop */}
            <div className="relative w-full order-1 md:order-2" style={{ aspectRatio: "1/1", maxHeight: "420px" }}>
              <Image
                src="/images/mystery-box.png"
                alt="Mystery Cash Box"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
