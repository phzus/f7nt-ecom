"use client";
// Migrado de: /sections/announcement-bar.liquid

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MESSAGES = [
  "Welcome to our store",
  "Final Days To Enter — Win This 2026 Limited BMW M4 Cummins + $10,000!",
];

const longest = MESSAGES.reduce((a, b) => (b.length > a.length ? b : a));

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const next = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) => (c + 1) % MESSAGES.length);
      setVisible(true);
    }, 200);
  }, []);

  const prev = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) => (c - 1 + MESSAGES.length) % MESSAGES.length);
      setVisible(true);
    }, 200);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div
      className="w-full flex items-center justify-center py-1.5"
      style={{ backgroundColor: "#ae0303", color: "#ffffff" }}
    >
      {/* ── Mobile layout ── */}
      <div className="relative flex items-center flex justify-center w-full px-8 md:hidden" style={{ minHeight: "34px" }}>
        {MESSAGES.length > 1 && (
          <button onClick={prev} aria-label="Previous" className="absolute left-2 opacity-75">
            <ChevronLeft size={14} />
          </button>
        )}
        <p
          className="w-[80%] text-center font-normal transition-opacity duration-200"
          style={{ fontSize: "12px", lineHeight: "120%", opacity: visible ? 1 : 0 }}
        >
          {MESSAGES[current]}
        </p>
        {MESSAGES.length > 1 && (
          <button onClick={next} aria-label="Next" className="absolute right-2 opacity-75">
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* ── Desktop layout: ghost fixa largura do maior texto ── */}
      <div className="relative hidden md:inline-flex items-center justify-center">
        <span className="invisible text-sm font-normal px-6 whitespace-nowrap" aria-hidden>
          {longest}
        </span>
        <p
          className="absolute inset-0 flex items-center justify-center text-sm font-normal text-center whitespace-nowrap transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {MESSAGES[current]}
        </p>
        {MESSAGES.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous" className="absolute -left-5 opacity-75 hover:opacity-100 transition-opacity">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} aria-label="Next" className="absolute -right-5 opacity-75 hover:opacity-100 transition-opacity">
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
