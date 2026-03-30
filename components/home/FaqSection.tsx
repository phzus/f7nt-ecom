"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is this legit? Like I could actually win??",
    answer: "100% YES! We run fully verified sweepstakes — every purchase automatically earns you entries and one lucky winner walks away with the prize. We livestream the draw so everything is transparent. Every $1 spent = 200 entries, so your chances are real.",
  },
  {
    question: "How is the winner selected & notified?",
    answer: "Winners are selected randomly through a verified third-party platform. The draw is livestreamed on our social media. Once selected, the winner is contacted via the email used at checkout — so make sure your info is correct when you order!",
  },
  {
    question: "I placed an order, how do I know if I'm entered?",
    answer: "The moment your order is confirmed, your entries are automatically submitted — no extra steps needed. You can see how many entries your purchase earns at checkout. Every $1 you spend = 200 entries toward the current giveaway.",
  },
  {
    question: "How do I know if my order has shipped?",
    answer: "You'll receive a shipping confirmation email with tracking info as soon as your order ships. If you haven't received it within 3-5 business days of your order, reach out to us at support@f7nt.co and we'll look into it right away.",
  },
  {
    question: "I have a different question, please help!",
    answer: "We've got you! Shoot us a message at support@f7nt.co or reach out via Instagram/TikTok @f7nt. We're here to help and typically respond within 24 hours.",
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
            THE ANSWERS YOU&apos;RE LOOKING FOR
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
