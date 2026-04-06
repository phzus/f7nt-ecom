"use client";
import { useState, useEffect } from "react";
import { getCountdownTime } from "@/lib/utils";

const TARGET_DATE = new Date(process.env.NEXT_PUBLIC_COUNTDOWN_DATE ?? "2026-06-01T00:00:00Z");

function CountdownNumbers({ time }: { time: ReturnType<typeof getCountdownTime> | null }) {
  const pad = (n: number) => String(n).padStart(2, "0");

  const units = [
    { value: time?.days  ?? 0,  label: "DAYS"    },
    { value: time?.hours ?? 0,  label: "HOURS"   },
    { value: time?.minutes ?? 0, label: "MINUTES" },
    { value: time?.seconds ?? 0, label: "SECONDS" },
  ];

  return (
    <div className="flex gap-5 md:gap-8 justify-center md:justify-start">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span
            className="text-4xl md:text-5xl font-bold tabular-nums"
            style={{ color: "#fff" }}
          >
            {pad(value)}
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#e22c2c" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getCountdownTime> | null>(null);

  useEffect(() => {
    setTime(getCountdownTime(TARGET_DATE));
    const interval = setInterval(() => setTime(getCountdownTime(TARGET_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  if (time?.expired) {
    return (
      <section className="w-full py-8 text-center" style={{ backgroundColor: "#000" }}>
        <p className="text-white text-2xl font-bold uppercase tracking-widest">
          Offer Has Ended
        </p>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-16" style={{ backgroundColor: "#000" }}>
      <div className="container-main flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
        <h2
          className="font-black uppercase whitespace-nowrap glow-red"
          style={{ color: "#ff0000", letterSpacing: "2px", fontSize: "clamp(1rem, 5.8vw, 3rem)", lineHeight: "130%" }}
        >
          OFFER EXPIRING IN:
        </h2>
        <CountdownNumbers time={time} />
      </div>
    </section>
  );
}
