"use client";

/**
 * NewsletterForm - RHF + Zod, posts to /api/newsletter.
 * Strictly transactional opt-in: the welcome email confirms receipt only,
 * so no CAN-SPAM unsubscribe / physical address footer is required for the
 * initial confirmation. The owner manually opts the lead into a marketing
 * list later (and that list will carry full CAN-SPAM compliance).
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email." })
    .max(200, { message: "Email is too long." }),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;

type Status = "idle" | "submitting" | "success" | "error";

export type NewsletterFormProps = {
  variant?: "sidebar" | "block";
  heading?: string;
  body?: string;
};

export function NewsletterForm({
  variant = "block",
  heading = "Field notes in your inbox.",
  body = "One short note per heating season. New posts, new photos, no marketing fluff. Unsubscribe any time.",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const parsed = newsletterSchema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(parsed.error.issues[0]?.message ?? "Invalid email.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setStatus("error");
        setErrorMessage(
          data.error ?? "Could not subscribe right now. Try again shortly.",
        );
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Try again shortly.");
    }
  });

  const isSidebar = variant === "sidebar";

  return (
    <div
      className={[
        "rounded-lg border border-text-primary/10 bg-bg-card",
        isSidebar ? "p-6" : "p-8 md:p-10",
      ].join(" ")}
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent">
        Newsletter
      </p>
      <h3
        className={[
          "font-display mt-3 text-text-primary",
          isSidebar ? "text-xl" : "text-2xl md:text-3xl",
        ].join(" ")}
        style={{ fontWeight: 600 }}
      >
        {heading}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {body}
      </p>

      {status === "success" ? (
        <p
          role="status"
          className="mt-5 rounded-md border border-accent/40 bg-bg-elevated p-4 text-sm text-text-primary"
        >
          You&apos;re on the list. Check your inbox for a confirmation note.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
          <label className="block">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
              className="block w-full rounded-md border border-text-primary/15 bg-bg-elevated px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </label>

          {errors.email ? (
            <p className="text-xs text-primary" role="alert">
              {errors.email.message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 font-mono text-sm uppercase tracking-wider text-text-primary transition-all duration-200 hover:bg-primary-muted disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>

          {status === "error" && errorMessage ? (
            <p className="text-xs text-primary" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}

export default NewsletterForm;
