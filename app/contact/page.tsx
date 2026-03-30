// Contact page — migrado de: templates/page.contact.json

"use client";

import { useState, type FormEvent } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Request failed");
      }

      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("[contact form]", err);
      setStatus("error");
    }
  };

  return (
    <div style={{ backgroundColor: "#f2f2f2", minHeight: "60vh" }}>
      {/* Page header */}
      <div className="w-full py-12 text-center" style={{ backgroundColor: "#000" }}>
        <h1
          className="font-normal"
          style={{ fontSize: "56px", color: "#fff", letterSpacing: "0.84px" }}
        >
          Contact
        </h1>
        <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.75)" }}>
          We&apos;d love to hear from you
        </p>
      </div>

      <div className="container-main py-12" style={{ maxWidth: "742px" }}>
        {status === "sent" ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Message sent!</h2>
            <p style={{ color: "rgba(26,26,26,0.75)" }}>
              Thank you for reaching out. We&apos;ll get back to you within 1–2 business days.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-primary mt-6 px-8 py-3"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold uppercase mb-1" style={{ letterSpacing: "0.6px" }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-4 text-base outline-none focus:ring-2 focus:ring-black"
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0",
                  color: "#1a1a1a",
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase mb-1" style={{ letterSpacing: "0.6px" }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-4 text-base outline-none focus:ring-2 focus:ring-black"
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0",
                  color: "#1a1a1a",
                }}
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-bold uppercase mb-1" style={{ letterSpacing: "0.6px" }}>
                Subject (Optional)
              </label>
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What is this about?"
                className="w-full px-4 py-4 text-base outline-none focus:ring-2 focus:ring-black"
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0",
                  color: "#1a1a1a",
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold uppercase mb-1" style={{ letterSpacing: "0.6px" }}>
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message..."
                className="w-full px-4 py-4 text-base outline-none focus:ring-2 focus:ring-black resize-none"
                style={{
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0",
                  color: "#1a1a1a",
                }}
              />
            </div>

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again or email us at support@f7nt.co
              </p>
            )}

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-3 text-white font-medium text-base transition-colors disabled:opacity-60"
                style={{
                  backgroundColor: "#000",
                  borderRadius: "0",
                  minHeight: "47px",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#333")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#000")}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
