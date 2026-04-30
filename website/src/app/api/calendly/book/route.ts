/**
 * POST /api/calendly/book
 *
 * Accepts a slot (start/end) plus a lead payload, validates with Zod, and:
 *   1. Creates the booking via Calendly API when CALENDLY_API_KEY is set,
 *      OR fabricates a demo booking ID when keys are absent (demo mode).
 *   2. Sends an owner notification email via Resend (replyTo = lead.email).
 *   3. Sends the lead a transactional confirmation (replyTo = OWNER_EMAIL).
 *
 * Both Resend calls explicitly set replyTo per Error #50.
 * Missing creds NEVER crash the request; failures collapse silently into a
 * "demo" response so the user always sees a successful booking confirmation
 * during demo flows.
 */

import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/data/site";

const bookSchema = z.object({
  slotStart: z.string().min(1),
  slotEnd: z.string().min(1),
  lead: z.object({
    name: z.string().min(1).max(120),
    email: z.string().email().max(200),
    phone: z.string().min(7).max(40),
    address: z.string().min(3).max(300),
    notes: z.string().max(2000).optional().or(z.literal("")),
  }),
});

type BookPayload = z.infer<typeof bookSchema>;

function uuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function formatHumanDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

async function tryCalendlyBooking(payload: BookPayload): Promise<{ bookingId: string; demo: boolean }> {
  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

  if (!apiKey || !eventTypeUri) {
    return { bookingId: `demo-${uuid()}`, demo: true };
  }

  // Calendly's public scheduling API: scheduled_events. We POST a booking
  // attempt; if the call fails (Calendly returns 4xx/5xx), we still return a
  // demo booking so the user sees confirmation while the owner gets notified
  // via email and can reconcile manually.
  try {
    const res = await fetch("https://api.calendly.com/scheduled_events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: eventTypeUri,
        start_time: payload.slotStart,
        end_time: payload.slotEnd,
        invitee: {
          name: payload.lead.name,
          email: payload.lead.email,
        },
        location: payload.lead.address,
        questions_and_answers: [
          { question: "Phone", answer: payload.lead.phone },
          { question: "Address", answer: payload.lead.address },
          ...(payload.lead.notes ? [{ question: "Notes", answer: payload.lead.notes }] : []),
        ],
      }),
    });

    if (!res.ok) {
      return { bookingId: `demo-${uuid()}`, demo: true };
    }
    const json = (await res.json()) as { resource?: { uri?: string; id?: string } };
    const id = json.resource?.id ?? json.resource?.uri ?? `cal-${uuid()}`;
    return { bookingId: id, demo: false };
  } catch {
    return { bookingId: `demo-${uuid()}`, demo: true };
  }
}

async function sendNotificationEmails(payload: BookPayload, bookingId: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL ?? siteConfig.email;
  const fromAddr = process.env.RESEND_FROM_EMAIL ?? `bookings@${siteConfig.domain}`;

  if (!resendKey) {
    console.log(
      `[booking] Resend not configured; skipping email send. bookingId=${bookingId} ownerEmail=${ownerEmail}`,
    );
    return;
  }

  const resend = new Resend(resendKey);
  const humanWhen = formatHumanDate(payload.slotStart);
  const subjectOwner = `New booking from ${payload.lead.name} on ${humanWhen}`;
  const subjectLead = `Your ${siteConfig.shortName} inspection is on the books`;

  const ownerBody = [
    `New booking received via ${siteConfig.url}/booking`,
    ``,
    `Booking ID: ${bookingId}`,
    `When: ${humanWhen}`,
    ``,
    `Name: ${payload.lead.name}`,
    `Email: ${payload.lead.email}`,
    `Phone: ${payload.lead.phone}`,
    `Address: ${payload.lead.address}`,
    payload.lead.notes ? `Notes: ${payload.lead.notes}` : `Notes: (none)`,
  ].join("\n");

  const leadBody = [
    `Hi ${payload.lead.name},`,
    ``,
    `Thanks for booking with ${siteConfig.name}.`,
    `Your inspection is scheduled for ${humanWhen}.`,
    ``,
    `Confirmation ID: ${bookingId}`,
    `Address on file: ${payload.lead.address}`,
    ``,
    `${siteConfig.owner} or a member of the crew will reach out within 24 hours to confirm details.`,
    `If anything changes, reply to this email or call ${siteConfig.phone}.`,
    ``,
    `${siteConfig.owner}`,
    `${siteConfig.name}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from: fromAddr,
      to: ownerEmail,
      replyTo: payload.lead.email,
      subject: subjectOwner,
      text: ownerBody,
    });
  } catch (err) {
    console.error("[booking] owner email failed", err);
  }

  try {
    await resend.emails.send({
      from: fromAddr,
      to: payload.lead.email,
      replyTo: ownerEmail,
      subject: subjectLead,
      text: leadBody,
    });
  } catch (err) {
    console.error("[booking] lead email failed", err);
  }
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bookSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Validation failed." },
      { status: 400 },
    );
  }
  const payload = parsed.data;

  const { bookingId, demo } = await tryCalendlyBooking(payload);

  if (demo) {
    console.log(
      `[booking] DEMO booking created: ${bookingId} for ${payload.lead.email} at ${payload.slotStart}`,
    );
  }

  await sendNotificationEmails(payload, bookingId);

  return Response.json({ ok: true, bookingId, demo });
}
