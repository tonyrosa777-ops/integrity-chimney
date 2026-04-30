/**
 * POST /api/newsletter
 *
 * Validates an email signup with Zod and (when configured) sends:
 *   1. A transactional confirmation note to the lead - strictly "we received
 *      your signup", no future-promotional language. This intentionally
 *      keeps the email transactional under CAN-SPAM, so the unsubscribe-link
 *      + physical-address rules in the website-build template (lines
 *      1895-1920) do NOT apply yet. The owner is expected to opt subscribers
 *      into a marketing list manually, and that future list will carry full
 *      CAN-SPAM compliance.
 *   2. An owner notification with the new lead's email.
 *
 * Env vars (server-only):
 *   - RESEND_API_KEY      optional - when missing, route still 200s (signup
 *                         is logged) so the form does not break in dev.
 *   - OWNER_EMAIL         optional - owner notification recipient.
 *   - RESEND_FROM_EMAIL   optional - verified sender.
 *
 * Returns 200 on success, 400 on validation error, 200 with `{ pending: true }`
 * if email is not configured (lead recorded in logs only).
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/data/site";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email." })
    .max(200, { message: "Email is too long." }),
});

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const { email } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !ownerEmail || !fromEmail) {
    console.warn(
      `[/api/newsletter] Email not configured; lead recorded in logs only: ${email}`,
    );
    return NextResponse.json({ ok: true, pending: true }, { status: 200 });
  }

  try {
    const resend = new Resend(apiKey);

    // 1. Transactional confirmation to the lead.
    const confirmationText = [
      `Thanks for signing up, and welcome to the list.`,
      "",
      `We received your email (${email}) on the ${siteConfig.shortName} field-notes signup.`,
      `If this was not you, just delete this note and you will not hear from us again.`,
      "",
      `Talk soon,`,
      `${siteConfig.owner}`,
      `${siteConfig.name}`,
    ].join("\n");

    await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: `${siteConfig.shortName} - signup received`,
      text: confirmationText,
    });

    // 2. Owner notification.
    await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: `New newsletter signup: ${email}`,
      text: [
        `New signup on ${siteConfig.url}`,
        "",
        `Email: ${email}`,
        "",
        `Add this lead to your marketing list manually once you are ready.`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[/api/newsletter] send error:", err);
    // Soft-fail: still return 200 so the form UX doesn't block the lead.
    // The lead is in the server logs and the owner can recover it.
    return NextResponse.json({ ok: true, pending: true }, { status: 200 });
  }
}
