import { NextResponse } from "next/server";
import { Resend } from "resend";
import { realtorIntakeSchema } from "@/app/for-realtors/schema";
import { siteConfig } from "@/data/site";

/**
 * POST /api/realtor-intake
 *
 * Validates the inbound realtor intake form against a shared Zod schema,
 * then sends a notification email via Resend with `replyTo` set to the
 * realtor's email so a one-click reply lands in the realtor's inbox.
 *
 * Subject line includes brokerage + target close date for fast inbox triage.
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
  const parsed = realtorIntakeSchema.safeParse(raw);
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

  // 3. Honeypot trip (bot caught): return a soft success to avoid
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
      `[/api/realtor-intake] Missing required env vars: ${missing.join(", ")}`,
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Inspection request service is not configured. Please call us directly or try again later.",
      },
      { status: 500 },
    );
  }

  // 5. Send via Resend.
  try {
    const resend = new Resend(apiKey);

    const subject = `Realtor inspection request - ${data.brokerage} - ${data.closeDate}`;
    const phoneLine = data.phone && data.phone.length > 0 ? data.phone : "Not provided";
    const flueLine = data.flueCount && data.flueCount.length > 0 ? data.flueCount : "Not specified";
    const notesLine = data.notes && data.notes.length > 0 ? data.notes : "(none)";

    const text = [
      `New realtor inspection request from ${siteConfig.url}`,
      "",
      `Realtor:          ${data.realtorName}`,
      `Brokerage:        ${data.brokerage}`,
      `Email:            ${data.email}`,
      `Phone:            ${phoneLine}`,
      `Property:         ${data.propertyAddress}`,
      `Target close:     ${data.closeDate}`,
      `Number of flues:  ${flueLine}`,
      "",
      "Notes:",
      notesLine,
      "",
      "---",
      `Sent from /for-realtors on ${siteConfig.name}`,
    ].join("\n");

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 620px; margin: 0 auto; color: #111;">
        <p style="margin: 0 0 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #B87333;">
          Integrity Chimney Services LLC &middot; Realtor inspection request
        </p>
        <h1 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">
          ${escapeHtml(data.brokerage)} &middot; close ${escapeHtml(data.closeDate)}
        </h1>
        <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #666; width: 140px;">Realtor</td><td style="padding: 6px 0;">${escapeHtml(data.realtorName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Brokerage</td><td style="padding: 6px 0;">${escapeHtml(data.brokerage)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${encodeURIComponent(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Phone</td><td style="padding: 6px 0;">${escapeHtml(phoneLine)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Property</td><td style="padding: 6px 0;">${escapeHtml(data.propertyAddress)}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Target close</td><td style="padding: 6px 0;"><strong>${escapeHtml(data.closeDate)}</strong></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Flues</td><td style="padding: 6px 0;">${escapeHtml(flueLine)}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666; margin: 0 0 8px;">Notes</p>
        <div style="font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(notesLine)}</div>
        <p style="margin-top: 24px; font-size: 11px; color: #999;">
          Reply directly to this email to confirm scheduling with ${escapeHtml(data.realtorName)}.
        </p>
      </div>
    `.trim();

    const { error } = await resend.emails.send({
      from: fromEmail!,
      to: [ownerEmail!],
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[/api/realtor-intake] Resend send error:", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "Could not submit your request right now. Please call us directly.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/realtor-intake] Unexpected error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not submit your request right now. Please call us directly.",
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
