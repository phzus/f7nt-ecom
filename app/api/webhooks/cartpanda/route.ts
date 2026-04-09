// API Route: POST /api/webhooks/cartpanda
// Receives order events from CartPanda, generates a unique raffle entry code,
// and sends a confirmation email (in English) to the customer via Resend.

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/** Generate a random 8-digit numeric code unique per purchase */
function generateEntryCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // CartPanda sends the order object — extract what we need
    const order = body?.order ?? body;

    const customerEmail: string =
      order?.customer?.email ??
      order?.email ??
      order?.billing_address?.email ??
      "";

    const customerName: string =
      order?.customer?.name ??
      order?.customer?.first_name ??
      order?.billing_address?.first_name ??
      "Customer";

    const orderId: string | number = order?.id ?? order?.order_id ?? "—";

    if (!customerEmail) {
      console.error("[cartpanda-webhook] No customer email found in payload", JSON.stringify(body));
      return NextResponse.json({ error: "No customer email" }, { status: 400 });
    }

    const entryCode = generateEntryCode();

    const { error } = await resend.emails.send({
      from: "F7NT Store <no-reply@f7ntco.com>",
      to: customerEmail,
      subject: "🎟️ Your raffle entry is confirmed!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Purchase Confirmation – F7NT</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f0f0f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;overflow:hidden;max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#c8a000;padding:28px 32px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:800;letter-spacing:4px;color:#0a0a0a;">F7NT</p>
              <p style="margin:6px 0 0;font-size:13px;font-weight:600;color:#0a0a0a;letter-spacing:2px;text-transform:uppercase;">Store</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">

              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#fff;">
                Purchase confirmed, ${customerName}! 🎉
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#aaa;line-height:1.6;">
                Thank you for participating. Your raffle entry has been successfully registered.
                Save the code below — it's your proof of participation.
              </p>

              <!-- Entry code box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#1a1a1a;border:2px solid #c8a000;border-radius:10px;padding:24px;text-align:center;">
                    <p style="margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;color:#c8a000;text-transform:uppercase;">Your entry code</p>
                    <p style="margin:0;font-size:36px;font-weight:800;letter-spacing:8px;color:#fff;font-family:'Courier New',monospace;">
                      ${entryCode}
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-collapse:collapse;">
                <tr>
                  <td style="font-size:13px;color:#777;padding:6px 0;border-bottom:1px solid #222;">Order</td>
                  <td style="font-size:13px;color:#ccc;padding:6px 0;border-bottom:1px solid #222;text-align:right;">#${orderId}</td>
                </tr>
                <tr>
                  <td style="font-size:13px;color:#777;padding:6px 0;">Email</td>
                  <td style="font-size:13px;color:#ccc;padding:6px 0;text-align:right;">${customerEmail}</td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#666;line-height:1.7;">
                If you have any questions, reply to this email or visit
                <a href="https://f7ntco.com" style="color:#c8a000;text-decoration:none;">f7ntco.com</a>.
                Good luck! 🤞
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0d0d0d;padding:20px 32px;text-align:center;border-top:1px solid #222;">
              <p style="margin:0;font-size:11px;color:#444;">
                © ${new Date().getFullYear()} F7NT Store · This is an automated email, no reply needed.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });

    if (error) {
      console.error("[cartpanda-webhook] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    console.log(`[cartpanda-webhook] Email sent to ${customerEmail} | order #${orderId} | code ${entryCode}`);
    return NextResponse.json({ success: true, code: entryCode });
  } catch (err) {
    console.error("[cartpanda-webhook] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
