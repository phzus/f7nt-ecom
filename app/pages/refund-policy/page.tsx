import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Refund Policy — F7NT",
  description:
    "Understand F7NT's return and refund policy for all product purchases.",
};

export default function RefundPolicyPage() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "60vh" }}>
      {/* Page header */}
      <div className="w-full py-12 text-center" style={{ backgroundColor: "#000" }}>
        <h1
          className="font-normal"
          style={{ fontSize: "40px", color: "#fff", letterSpacing: "0.84px" }}
        >
          Refund Policy
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
          <Section title="Our Commitment">
            <p>
              At F7NT, we want you to be completely satisfied with your purchase. If you
              are not fully satisfied, we&apos;re here to help. Please review our refund
              policy below.
            </p>
          </Section>

          <Section title="1. Return Window">
            <p>
              You have <strong style={{ color: "#fff" }}>30 days</strong> from the date
              you received your item to request a return. To be eligible for a return,
              your item must be unused, in the same condition you received it, and in
              its original packaging.
            </p>
          </Section>

          <Section title="2. Non-Returnable Items">
            <p>The following items cannot be returned:</p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-2">
              <li>
                <strong style={{ color: "#fff" }}>Fast Pass packs</strong> — digital
                giveaway entry packs are non-refundable once entries have been allocated
                to your account
              </li>
              <li>Items marked as &ldquo;Final Sale&rdquo; at time of purchase</li>
              <li>Items that have been used, worn, or damaged by the customer</li>
              <li>Gift cards</li>
            </ul>
          </Section>

          <Section title="3. How to Initiate a Return">
            <p>To start a return, please follow these steps:</p>
            <ol className="list-decimal pl-5 mt-3 flex flex-col gap-2">
              <li>
                Email us at{" "}
                <a
                  href="mailto:contact@f7nt.co"
                  className="underline"
                  style={{ color: "#ae0303" }}
                >
                  contact@f7nt.co
                </a>{" "}
                with your order number and the reason for your return
              </li>
              <li>
                Wait for our team to provide you with return shipping instructions
                within 2 business days
              </li>
              <li>Ship the item back using a trackable shipping service</li>
              <li>
                Once we receive and inspect the item, we will notify you of the approval
                or rejection of your refund
              </li>
            </ol>
          </Section>

          <Section title="4. Refunds">
            <p>
              If your return is approved, a refund will be processed to your original
              payment method within{" "}
              <strong style={{ color: "#fff" }}>5–10 business days</strong>. Please
              note that your bank or credit card company may require additional time to
              process the refund.
            </p>
            <p className="mt-3">
              Original shipping costs are non-refundable. If your order received free
              shipping, the actual shipping cost will be deducted from your refund.
            </p>
          </Section>

          <Section title="5. Exchanges">
            <p>
              We only replace items if they are defective or damaged upon arrival. If
              you need to exchange a defective item for the same product, contact us at{" "}
              <a
                href="mailto:contact@f7nt.co"
                className="underline"
                style={{ color: "#ae0303" }}
              >
                contact@f7nt.co
              </a>{" "}
              with photos of the damage.
            </p>
          </Section>

          <Section title="6. Giveaway Entries and Refunds">
            <p>
              Please be aware that if a purchase is refunded, any giveaway entries
              earned from that purchase will be voided and removed from your entry
              total. Refunds do not disqualify you from any entries earned from
              separate, non-refunded purchases.
            </p>
          </Section>

          <Section title="7. Contact Us">
            <p>
              If you have any questions about our refund policy, please reach out to
              our support team at{" "}
              <a
                href="mailto:contact@f7nt.co"
                className="underline"
                style={{ color: "#ae0303" }}
              >
                contact@f7nt.co
              </a>
              . We typically respond within 1–2 business days.
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
