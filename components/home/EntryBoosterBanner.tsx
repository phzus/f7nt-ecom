import Image from "next/image";

export default function EntryBoosterBanner() {
  return (
    <section style={{ backgroundColor: "#000" }}>
      {/* Desktop banner */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "2625/529" }}>
        <Image
          src="/images/banner-2-desk.png"
          alt="Multiplier Boosted — Every $1 = 200 Entries"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* Mobile banner */}
      <div className="block md:hidden relative w-full" style={{ aspectRatio: "16/9" }}>
        <Image
          src="/images/banner-2-mob.png"
          alt="Multiplier Boosted — Every $1 = 200 Entries"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
