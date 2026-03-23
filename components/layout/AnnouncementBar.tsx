"use client";
// Migrado de: /sections/announcement-bar.liquid

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MESSAGES = [
  "Welcome to our store",
  "Final Days To Enter — Win This 2026 Limited BMW M4 Cummins + $10,000!",
];

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
      className="w-full flex items-center justify-center gap-3 px-4"
      style={{
        backgroundColor: "#ae0303",
        minHeight: "39.4px",
        fontSize: "16px",
        color: "#ffffff",
      }}
    >
      {MESSAGES.length > 1 && (
        <button
          onClick={prev}
          aria-label="Previous announcement"
          className="flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={16} />
        </button>
      )}

      <p
        className="text-center text-sm md:text-base font-normal transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {MESSAGES[current]}
      </p>

      {MESSAGES.length > 1 && (
        <button
          onClick={next}
          aria-label="Next announcement"
          className="flex-shrink-0 opacity-75 hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
