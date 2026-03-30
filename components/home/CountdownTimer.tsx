"use client";
import { useState, useEffect } from "react";
import { getCountdownTime } from "@/lib/utils";

const TARGET_DATE = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_DATE ?? "2026-06-01T00:00:00Z");

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getCountdownTime> | null>(null);

  useEffect(() => {
    setTime(getCountdownTime(TARGET_DATE));
    const interval = setInterval(() => {
      setTime(getCountdownTime(TARGET_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  if (!time) return (
    <section className="w-full py-10" style={{ backgroundColor: "#000" }}>
      <div className="container-main flex flex-col items-center gap-8" style={{ maxWidth: "1000px" }}>
        <h2 className="text-4xl md:text-5xl font-bold uppercase text-center glow-red" style={{ color: "#ff0000", letterSpacing: "2px" }}>
          OFFER EXPIRING IN:
        </h2>
        <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
          {["DAYS","HOURS","MINUTES","SECONDS"].map((label) => (
            <div key={label} className="flex flex-col items-center gap-2" style={{ minWidth: "80px" }}>
              <span className="text-5xl font-bold glow-gray tabular-nums" style={{ color: "#fff" }}>00</span>
              <span className="text-sm font-bold uppercase" style={{ color: "#e22c2c", letterSpacing: "1px" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  if (time.expired) {
    return (
      <section className="w-full py-10 text-center" style={{ backgroundColor: "#000" }}>
        <p className="text-white text-2xl font-bold uppercase tracking-widest">
          Offer Has Ended
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-10" style={{ backgroundColor: "#000" }}>
      <div className="container-main flex flex-col items-center gap-8" style={{ maxWidth: "1000px" }}>
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-bold uppercase text-center glow-red"
          style={{ color: "#ff0000", letterSpacing: "2px" }}
        >
          OFFER EXPIRING IN:
        </h2>

        {/* Countdown blocks */}
        <div className="flex flex-wrap gap-6 md:gap-10 justify-center">
          {[
            { value: time.days, label: "DAYS" },
            { value: time.hours, label: "HOURS" },
            { value: time.minutes, label: "MINUTES" },
            { value: time.seconds, label: "SECONDS" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-2" style={{ minWidth: "80px" }}>
              <span
                className="text-5xl font-bold glow-gray tabular-nums"
                style={{ color: "#fff" }}
              >
                {pad(value)}
              </span>
              <span
                className="text-sm font-bold uppercase"
                style={{ color: "#e22c2c", letterSpacing: "1px" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-2xl rounded-full overflow-hidden" style={{ height: "24px", backgroundColor: "#1a1a1a" }}>
          <div
            className="h-full rounded-full progress-bar-glow transition-all duration-1000"
            style={{
              width: "90%",
              background: "linear-gradient(90deg, #00cc00, #00ff00)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
