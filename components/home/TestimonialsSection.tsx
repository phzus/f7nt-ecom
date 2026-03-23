interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Jordan M.",
    rating: 5,
    text: "Ordered the BLACK Fast Pass and got 100,000 entries instantly. The process was super smooth and I got my confirmation right away. Can't wait for the draw!",
    date: "March 2026",
  },
  {
    name: "Alex R.",
    rating: 5,
    text: "Love the hoodie I got and the fact that I'm entered to win a BMW at the same time? Unreal concept. Will definitely be ordering more.",
    date: "February 2026",
  },
  {
    name: "Sam T.",
    rating: 5,
    text: "Bought the PLATINUM pack for my birthday. Quality merch + 80k entries. The mystery box I opened had $50 cash inside too. Amazing experience.",
    date: "January 2026",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#facc15" : "#d1d5db", fontSize: "16px" }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="w-full py-14" style={{ backgroundColor: "#fff" }}>
      <div className="container-main">
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#8e8e8e" }}>
            REVIEWS
          </p>
          <h2 className="text-3xl md:text-5xl font-black" style={{ color: "#000", letterSpacing: "-0.02em" }}>
            WHAT PEOPLE SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="card-testimonial">
              <StarRating rating={t.rating} />
              <p className="mt-4 text-base leading-relaxed" style={{ color: "#555", lineHeight: "1.6" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "#f0f0f0" }}>
                <p className="font-bold text-sm" style={{ color: "#1a1a1a" }}>{t.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8e8e8e" }}>{t.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
