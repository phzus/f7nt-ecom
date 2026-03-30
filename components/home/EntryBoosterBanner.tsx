import Image from "next/image";

export default function EntryBoosterBanner() {
  return (
    <section style={{ backgroundColor: "#000" }} className="pt-0 md:pt-14">
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
      {/* Mobile banner — natural height so full image shows */}
      <div className="block md:hidden relative w-full">
        <Image
          src="/images/banner-2-mob.png"
          alt="Multiplier Boosted — Every $1 = 200 Entries"
          width={800}
          height={1200}
          className="w-full h-auto"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
