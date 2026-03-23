"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do the sweepstakes entries work?",
    answer: "Every $1 you spend in our store automatically earns you entries. With our current 200X multiplier, every $1 = 200 entries. Your total entries are calculated in your cart and automatically submitted once your order is placed. No extra steps needed!",
  },
  {
    question: "What are the prizes?",
    answer: "The current giveaway features a 2026 Limited BMW M4 Cummins valued at over $80,000, plus $10,000 cash. One lucky winner takes both prizes. The draw date is announced on our social media channels.",
  },
  {
    question: "What are Fast Pass products?",
    answer: "Fast Pass products are our premium entry packs designed specifically for the giveaway. BLACK (100,000 entries), PLATINUM (80,000), GOLD (30,000), and BRONZE (15,000). These give you the most entries per dollar spent.",
  },
  {
    question: "How are winners selected?",
    answer: "Winners are selected randomly through a verified third-party platform. The draw is livestreamed and the process is fully transparent. All eligible entries have an equal chance of winning.",
  },
  {
    question: "Do I need to purchase to enter?",
    answer: "While purchases earn entries automatically, there is a free alternative method of entry (AMOE). Visit our contest page or contact us at support@f7nt.co for details on how to enter without a purchase.",
  },
  {
    question: "When does this giveaway end?",
    answer: "The current giveaway runs until our offer expiration date shown in the countdown timer on our homepage. Sign up for our email list to get notified about new giveaways and promotions.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full" style={{ padding: "54px 20px 86px", backgroundColor: "#f2f2f2" }}>
      <div className="container-main" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#555", letterSpacing: "1.4px" }}>
            FAQ
          </p>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: "#000", letterSpacing: "-0.02em" }}>
            FREQUENTLY ASKED
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between text-left px-8 py-6 transition-colors hover:bg-gray-50"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-bold pr-4" style={{ color: "#000" }}>
                  {item.question}
                </span>
                <span
                  className="flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: "#113320",
                    transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <Plus size={20} />
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openIndex === index ? "500px" : "0",
                  padding: openIndex === index ? "0 32px 24px" : "0 32px",
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "#4b5563", lineHeight: "1.6" }}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "#555" }}>
            Still have questions?{" "}
            <a href="/contact" className="font-semibold underline" style={{ color: "#0000ff" }}>
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
