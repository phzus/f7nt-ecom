import Image from "next/image";
import Link from "next/link";

const PRIZE_CARS = [
  { src: "/images/car-1.png", alt: "2026 BMW M4 Cummins - View 1" },
  { src: "/images/car-2.png", alt: "2026 BMW M4 Cummins - View 2" },
  { src: "/images/car-3.png", alt: "2026 BMW M4 Cummins - View 3" },
];

export default function GiveawaySection() {
  return (
    <section
      className="relative w-full py-16 overflow-hidden"
      style={{ backgroundColor: "#0a1a0a" }}
    >
      {/* BG texture */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/bg-giveaway-cta-sec.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="container-main relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8e8e8e" }}>
            THE PRIZE
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white leading-tight"
            style={{ letterSpacing: "0.84px" }}
          >
            THIS MURDERED OUT BMW M4<br />COULD BE YOURS
          </h2>
          <p className="text-base mt-4 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.75)" }}>
            This fully blacked-out BMW M4 packs an aggressively tuned engine, high-end M Competition
            components, and the unmistakable road presence of a true luxury sports machine... and it
            could be YOURS. But hurry — time is running out!
          </p>
          <p className="text-lg font-bold mt-3" style={{ color: "#00ff00" }}>
            + $10,000 CASH
          </p>
        </div>

        {/* Car images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {PRIZE_CARS.map((car) => (
            <div key={car.src} className="relative w-full" style={{ aspectRatio: "4/3" }}>
              <Image
                src={car.src}
                alt={car.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/catalog"
            className="btn-cta inline-flex items-center justify-center px-12 py-5 text-lg font-bold"
            style={{ borderRadius: "4px" }}
          >
            ALL THE DETAILS
          </Link>
        </div>
      </div>
    </section>
  );
}
