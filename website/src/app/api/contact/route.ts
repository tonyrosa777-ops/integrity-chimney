import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/app/contact/schema";
import { siteConfig } from "@/data/site";

/**
 * POST /api/contact
 *
 * Validates the inbound form body against the shared Zod schema, then
 * sends an inquiry email via Resend with `replyTo` set to the lead's
 * email so a one-click reply lands directly in the lead's inbox.
 *
 * Env vars (server-only):
 *   - RESEND_API_KEY      required to send
 *   - OWNER_EMAIL         destination inbox (the owner's address)
 *   - RESEND_FROM_EMAIL   verified Resend sender (e.g. "Integrity <hello@integritychimney.com>")
 *
 * If any required env var is missing, returns 500 with a sane message
 * (does NOT crash the route).
 */
export async function POST(request: Request) {
  // 1. Parse JSON body defensively.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  // 2. Validate with Zod.
  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed. Please check your inputs.",
        issues,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // 3. Honeypot trip (bot caught) - return a soft success to avoid
  // signalling the bot, but skip sending. Keeps the inbox clean.
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // 4. Validate env vars.
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!ownerEmail) missing.push("OWNER_EMAIL");
  if (!fromEmail) missing.push("RESEND_FROM_EMAIL");

  if (missing.length > 0) {
    console.error(
      `[/api/contact] Missing required env vars: ${missing.join(", ")}`,
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured. Please call us directly or try again later.",
      },
      { status: 500 },
    );
  }

  // 5. Send via Resend.
  try {
    const resend = new Resend(apiKey);

    const subject = `Website inquiry from ${data.name}`;
    const serviceLine = data.serviceInterest
      ? data.serviceInterest
      : "Not specified";
    const phoneLine = data.phone && data.phone.length > 0 ? data.phone : "Not provided";

    const text = [
      `New inquiry from ${siteConfig.url}`,
      "",
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Phone:   ${phoneLine}`,
      `Service: ${serviceLine}`,
      "",
      "Message:",
      data.message,
      "",
      "---",
      `Sent from /contact on ${siteConfig.name}`,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
        <p style="margin: 0 0 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #B87333;">
          Integrity Chimney Services LLC &middot; Website inquiry
        </p>
        <h1 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">
          New inquiry from ${escapeHtml(data.name)}
        </h1>
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #666; width: 96px;">Name</td><td style="padding: 6px 0;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${encodeURIComponent(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phoneLine)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Service</td><td style="padding: 6px 0;">${escapeHtml(serviceLine)}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666; margin: 0 0 8px;">Message</p>
        <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
        <p style="margin-top: 24px; font-size: 11px; color: #999;">
          Reply directly to this email to respond to ${escapeHtml(data.name)}.
        </p>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      // Cast away the env-narrowing - we asserted above.
      from: fromEmail!,
      to: [ownerEmail!],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[/api/contact] Resend send error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Could not send your message right now. Please call us directly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/contact] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not send your message right now. Please call us directly.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
