import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "contact@f7nt.co";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Dev fallback: if API key is not configured, log and return success
  if (!apiKey || apiKey.startsWith("re_XXXXXXXX")) {
    console.log("[contact] RESEND_API_KEY not configured — simulating success");
    console.log("[contact] Would send:", { name, email, subject, message });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "F7NT Contact Form <noreply@f7nt.co>",
      to: TO_EMAIL,
      replyTo: email,
      subject: subject?.trim()
        ? `[Contact] ${subject.trim()}`
        : `[Contact] Message from ${name.trim()}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
        <hr />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
