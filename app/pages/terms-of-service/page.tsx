import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Service — F7NT",
  description:
    "Read the terms and conditions governing your use of the F7NT website and participation in our giveaway promotions.",
};

export default function TermsOfServicePage() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "60vh" }}>
      {/* Page header */}
      <div className="w-full py-12 text-center" style={{ backgroundColor: "#000" }}>
        <h1
          className="font-normal"
          style={{ fontSize: "40px", color: "#fff", letterSpacing: "0.84px" }}
        >
          Terms of Service
        </h1>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
          Last updated: January 1, 2025
        </p>
      </div>

      <div
        className="container-main py-16"
        style={{ maxWidth: "780px", color: "rgba(255,255,255,0.8)" }}
      >
        <div className="flex flex-col gap-10 text-base leading-relaxed">
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using the F7NT website (f7nt.co) and purchasing our products,
              you agree to be bound by these Terms of Service. If you do not agree to these
              terms, please do not use our website or services.
            </p>
          </Section>

          <Section title="2. Products and Purchases">
            <p>
              All product descriptions, prices, and availability are subject to change
              without notice. We reserve the right to refuse or cancel any order at our
              discretion, including cases where pricing errors have occurred.
            </p>
            <p className="mt-3">
              By completing a purchase, you represent that you are at least 18 years of
              age and legally able to enter into a binding contract.
            </p>
          </Section>

          <Section title="3. Giveaway Promotion Terms">
            <p>
              Participation in the F7NT giveaway is subject to the following conditions:
            </p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
              <li>
                <strong style={{ color: "#fff" }}>Eligibility:</strong> Open to legal
                residents of the United States who are 18 years of age or older at time
                of entry. Void where prohibited by law.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Entries:</strong> Each $1.00 USD spent
                on eligible products earns 200 giveaway entries. Entries are non-transferable
                and have no cash value.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>No Purchase Necessary:</strong> A
                purchase is not required to enter. See our website for free alternative
                method of entry (AMOE) details.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Prize:</strong> One (1) 2026 BMW M4
                Cummins and $10,000 USD cash prize. Prize is non-transferable and no
                substitution will be made except at the Sponsor&apos;s sole discretion.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Winner Selection:</strong> Winner will
                be selected by random drawing from all eligible entries, verified by an
                independent third party, and announced via livestream.
              </li>
              <li>
                <strong style={{ color: "#fff" }}>Taxes:</strong> Winner is solely
                responsible for all applicable federal, state, and local taxes associated
                with the prize.
              </li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>
              All content on this website, including text, images, logos, and graphics,
              is the property of F7NT and protected by applicable copyright and trademark
              laws. You may not reproduce, distribute, or create derivative works without
              our express written permission.
            </p>
          </Section>

          <Section title="5. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, F7NT shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising
              from your use of our website or products, or participation in our giveaway
              promotion.
            </p>
          </Section>

          <Section title="6. Governing Law">
            <p>
              These Terms of Service shall be governed by and construed in accordance
              with the laws of the United States, without regard to its conflict of law
              provisions.
            </p>
          </Section>

          <Section title="7. Changes to Terms">
            <p>
              We reserve the right to update these Terms of Service at any time. Changes
              will be effective immediately upon posting. Your continued use of the website
              constitutes acceptance of the revised terms.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              For questions about these Terms of Service, contact us at{" "}
              <a
                href="mailto:contact@f7nt.co"
                className="underline"
                style={{ color: "#ae0303" }}
              >
                contact@f7nt.co
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="font-bold uppercase mb-4"
        style={{ fontSize: "14px", letterSpacing: "1.5px", color: "#fff" }}
      >
        {title}
      </h2>
      <div style={{ color: "rgba(255,255,255,0.7)" }}>{children}</div>
    </div>
  );
}
