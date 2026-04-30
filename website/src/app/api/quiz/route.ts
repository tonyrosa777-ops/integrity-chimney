/**
 * POST /api/quiz
 * Receives a completed quiz submission, validates with Zod, and dispatches:
 *   1) Owner notification (replyTo = lead email).
 *   2) Lead confirmation (transactional restate of answers, replyTo = OWNER_EMAIL).
 *
 * The lead-confirmation email is strictly transactional under CAN-SPAM:
 * it restates the user's submitted answers and tells them when to expect a
 * follow-up. It contains no marketing content, so the unsubscribe and
 * physical-address requirements do not apply.
 *
 * Resilience: If RESEND_API_KEY or OWNER_EMAIL are missing, the route still
 * validates input and returns ok: true so the UX is not blocked in
 * development. The error is logged server-side.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { quiz, siteConfig } from "@/data/site";

/* -------------------------------------------------------------------------- */
/* Validation                                                                  */
/* -------------------------------------------------------------------------- */

const answerSchema = z.object({
  questionIndex: z.number().int().min(0),
  optionIndex: z.number().int().min(0),
  label: z.string().min(1),
});

const leadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined)),
});

const bodySchema = z.object({
  answers: z.array(answerSchema).min(1),
  scores: z.record(z.string(), z.number()),
  outcome: z.string().min(1),
  lead: leadSchema,
});

type SubmissionBody = z.infer<typeof bodySchema>;

/* -------------------------------------------------------------------------- */
/* Email rendering (plain HTML strings, no JSX)                                */
/* -------------------------------------------------------------------------- */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderAnswersList(body: SubmissionBody): string {
  const items = body.answers
    .map((answer) => {
      const step = quiz.steps[answer.questionIndex];
      const question = step ? step.question : `Question ${answer.questionIndex + 1}`;
      return `<li style="margin: 0 0 12px 0;">
        <strong style="display:block; font-size:13px; color:#444;">${escapeHtml(
          question
        )}</strong>
        <span style="display:block; font-size:14px; color:#111;">${escapeHtml(
          answer.label
        )}</span>
      </li>`;
    })
    .join("");
  return `<ul style="margin:0; padding-left:18px;">${items}</ul>`;
}

function buildOwnerEmail(body: SubmissionBody) {
  const outcome = quiz.outcomes.find((o) => o.id === body.outcome);
  const subject = `New quiz lead: ${body.lead.name} (${
    outcome?.recommendedService ?? body.outcome
  })`;
  const phoneLine = body.lead.phone
    ? `<p style="margin:0 0 8px 0;">Phone: <a href="tel:${escapeHtml(
        body.lead.phone
      )}">${escapeHtml(body.lead.phone)}</a></p>`
    : "";
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="font-size:18px; margin:0 0 12px 0;">New quiz lead</h2>
      <p style="margin:0 0 8px 0;">Name: <strong>${escapeHtml(body.lead.name)}</strong></p>
      <p style="margin:0 0 8px 0;">Email: <a href="mailto:${escapeHtml(
        body.lead.email
      )}">${escapeHtml(body.lead.email)}</a></p>
      ${phoneLine}
      <p style="margin:16px 0 8px 0;">Recommended service: <strong>${escapeHtml(
        outcome?.recommendedService ?? body.outcome
      )}</strong></p>
      <h3 style="font-size:15px; margin:20px 0 8px 0;">Answers</h3>
      ${renderAnswersList(body)}
      <h3 style="font-size:15px; margin:20px 0 8px 0;">Scores</h3>
      <pre style="background:#f4f4f4; padding:8px; border-radius:4px; font-size:12px; margin:0;">${escapeHtml(
        JSON.stringify(body.scores, null, 2)
      )}</pre>
    </div>
  `;
  const text = [
    `New quiz lead`,
    ``,
    `Name: ${body.lead.name}`,
    `Email: ${body.lead.email}`,
    body.lead.phone ? `Phone: ${body.lead.phone}` : null,
    ``,
    `Recommended service: ${outcome?.recommendedService ?? body.outcome}`,
    ``,
    `Answers:`,
    ...body.answers.map((a) => {
      const step = quiz.steps[a.questionIndex];
      const q = step ? step.question : `Question ${a.questionIndex + 1}`;
      return `  - ${q}\n    => ${a.label}`;
    }),
    ``,
    `Scores: ${JSON.stringify(body.scores)}`,
  ]
    .filter((v): v is string => Boolean(v))
    .join("\n");
  return { subject, html, text };
}

function buildLeadEmail(body: SubmissionBody) {
  const outcome = quiz.outcomes.find((o) => o.id === body.outcome);
  const recommended = outcome?.recommendedService ?? "your recommended service";
  const subject = `Your ${siteConfig.shortName} quiz match: ${recommended}`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; color:#111;">
      <h2 style="font-size:18px; margin:0 0 8px 0;">Hi ${escapeHtml(body.lead.name)},</h2>
      <p style="margin:0 0 12px 0; font-size:14px; line-height:1.55;">
        Thanks for taking the Find Your Chimney Service quiz. Here is a copy of
        what you submitted, plus the service we recommended based on your answers.
      </p>
      <p style="margin:0 0 16px 0; font-size:14px; line-height:1.55;">
        Someone from our team will reach out within 4 business hours to confirm
        scheduling and answer any questions.
      </p>

      <h3 style="font-size:15px; margin:20px 0 8px 0;">Recommended service</h3>
      <p style="margin:0 0 8px 0; font-size:15px;"><strong>${escapeHtml(recommended)}</strong></p>
      ${
        outcome
          ? `<p style="margin:0 0 16px 0; font-size:14px; line-height:1.55;">${escapeHtml(
              outcome.body
            )}</p>`
          : ""
      }

      <h3 style="font-size:15px; margin:20px 0 8px 0;">Your answers</h3>
      ${renderAnswersList(body)}

      <p style="margin:24px 0 0 0; font-size:13px; color:#555; line-height:1.55;">
        This is a transactional confirmation of the quiz you submitted. If you
        did not take this quiz, please reply and let us know.
      </p>
    </div>
  `;
  const text = [
    `Hi ${body.lead.name},`,
    ``,
    `Thanks for taking the Find Your Chimney Service quiz. Here is a copy of what you submitted, plus the service we recommended based on your answers.`,
    ``,
    `Someone from our team will reach out within 4 business hours to confirm scheduling and answer any questions.`,
    ``,
    `Recommended service: ${recommended}`,
    outcome ? `\n${outcome.body}` : "",
    ``,
    `Your answers:`,
    ...body.answers.map((a) => {
      const step = quiz.steps[a.questionIndex];
      const q = step ? step.question : `Question ${a.questionIndex + 1}`;
      return `  - ${q}\n    => ${a.label}`;
    }),
    ``,
    `This is a transactional confirmation of the quiz you submitted. If you did not take this quiz, please reply and let us know.`,
  ].join("\n");
  return { subject, html, text };
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                     */
/* -------------------------------------------------------------------------- */

export async function POST(request: NextRequest) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid submission.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path,
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const body = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!apiKey || !fromEmail || !ownerEmail) {
    // Graceful fallback: don't block submission in dev / preview environments
    // where mail credentials may not be set.
    console.warn(
      "[api/quiz] Missing email configuration. Skipping email dispatch.",
      {
        hasApiKey: Boolean(apiKey),
        hasFromEmail: Boolean(fromEmail),
        hasOwnerEmail: Boolean(ownerEmail),
      }
    );
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  const ownerMail = buildOwnerEmail(body);
  const leadMail = buildLeadEmail(body);

  try {
    const ownerSend = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: body.lead.email,
      subject: ownerMail.subject,
      html: ownerMail.html,
      text: ownerMail.text,
    });
    if (ownerSend.error) {
      console.error("[api/quiz] owner send error", ownerSend.error);
    }

    const leadSend = await resend.emails.send({
      from: fromEmail,
      to: body.lead.email,
      replyTo: ownerEmail,
      subject: leadMail.subject,
      html: leadMail.html,
      text: leadMail.text,
    });
    if (leadSend.error) {
      console.error("[api/quiz] lead send error", leadSend.error);
    }
  } catch (err) {
    console.error("[api/quiz] Unhandled email error", err);
    // Still return 200: the form data was valid; we don't want to surface
    // mail-provider failures to the user. They will hear from us anyway.
  }

  return NextResponse.json({ ok: true });
}
