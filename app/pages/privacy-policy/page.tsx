import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy — F7NT",
  description:
    "Learn how F7NT collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "60vh" }}>
      {/* Page header */}
      <div className="w-full py-12 text-center" style={{ backgroundColor: "#000" }}>
        <h1
          className="font-normal"
          style={{ fontSize: "40px", color: "#fff", letterSpacing: "0.84px" }}
        >
          Privacy Policy
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
          <Section title="1. Information We Collect">
            <p>
              F7NT (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects
              information you provide directly when you make a purchase, create an account,
              or contact us. This includes your name, email address, shipping address,
              billing address, and payment information.
            </p>
            <p className="mt-3">
              We also automatically collect certain information when you visit our website,
              such as your IP address, browser type, referring URLs, and pages visited. This
              data is collected through cookies and similar tracking technologies.
            </p>
          </Section>

          <Section title="2. How We Use Your Information">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>To process and fulfill your orders, including giveaway entries</li>
              <li>To communicate with you about your order status and account</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To conduct and administer our giveaway promotions</li>
              <li>To improve our website, products, and services</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>
          </Section>

          <Section title="3. Sharing Your Information">
            <p>
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information with trusted service providers who assist us in
              operating our website and conducting our business (e.g., payment processors,
              shipping carriers), subject to confidentiality agreements.
            </p>
            <p className="mt-3">
              We may disclose your information if required by law or in response to valid
              legal requests, or to protect the rights, property, or safety of F7NT, our
              customers, or the public.
            </p>
          </Section>

          <Section title="4. Cookies">
            <p>
              Our website uses cookies to enhance your browsing experience. Cookies are
              small text files stored on your device that help us remember your preferences
              and understand how you use our site. You can disable cookies in your browser
              settings, but doing so may affect certain features of our website.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement appropriate technical and organizational security measures to
              protect your personal information against unauthorized access, alteration,
              disclosure, or destruction. Payment information is processed through
              PCI-compliant payment gateways and is never stored on our servers.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>
              You have the right to access, correct, or delete your personal information.
              You may also opt out of marketing communications at any time by clicking the
              unsubscribe link in any email we send, or by contacting us directly.
            </p>
          </Section>

          <Section title="7. Giveaway Participants">
            <p>
              Personal information collected from giveaway participants is used solely to
              administer the promotion, contact winners, and verify eligibility. Winner
              information may be publicly announced as required by applicable sweepstakes
              laws.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted
              on this page with an updated revision date. Your continued use of our website
              after any changes constitutes your acceptance of the new policy.
            </p>
          </Section>

          <Section title="9. Contact Us">
            <p>
              If you have any questions about this Privacy Policy or our data practices,
              please contact us at{" "}
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
