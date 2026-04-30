"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "./schema";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

type Props = {
  services: string[];
};

/**
 * Inline Zod resolver - avoids adding @hookform/resolvers as a dependency
 * (only react-hook-form + zod are guaranteed installed). Mirrors the
 * resolver shape react-hook-form expects.
 */
const zodResolver: Resolver<ContactFormValues> = async (values) => {
  const parsed = contactFormSchema.safeParse(values);
  if (parsed.success) {
    return { values: parsed.data, errors: {} };
  }
  const fieldErrors: Record<string, { type: string; message: string }> = {};
  for (const issue of parsed.error.issues) {
    const path = issue.path.join(".");
    if (path && !fieldErrors[path]) {
      fieldErrors[path] = { type: issue.code, message: issue.message };
    }
  }
  return {
    values: {},
    errors: fieldErrors as Record<
      keyof ContactFormValues,
      { type: string; message: string }
    >,
  };
};

export function ContactForm({ services }: Props) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceInterest: "",
      message: "",
      website: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: ContactFormValues) {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setState({
          status: "error",
          message:
            data.error ??
            "Something went wrong sending your message. Please call us instead.",
        });
        return;
      }
      reset();
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message:
          "Network error. Please try again, or call us directly at the number on the right.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
      aria-describedby={
        state.status === "error" ? "contact-form-error" : undefined
      }
    >
      {/* Name */}
      <Field
        id="name"
        label="Your name"
        required
        error={errors.name?.message}
      >
        <input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name) || undefined}
          className={inputClass}
          {...register("name")}
        />
      </Field>

      {/* Email */}
      <Field
        id="email"
        label="Email"
        required
        error={errors.email?.message}
      >
        <input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email) || undefined}
          className={inputClass}
          {...register("email")}
        />
      </Field>

      {/* Phone */}
      <Field
        id="phone"
        label="Phone (optional)"
        error={errors.phone?.message}
      >
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          aria-invalid={Boolean(errors.phone) || undefined}
          className={inputClass}
          {...register("phone")}
        />
      </Field>

      {/* Service interest */}
      <Field
        id="serviceInterest"
        label="Service interest"
        error={errors.serviceInterest?.message}
      >
        <select
          id="serviceInterest"
          aria-invalid={Boolean(errors.serviceInterest) || undefined}
          className={inputClass}
          defaultValue=""
          {...register("serviceInterest")}
        >
          <option value="">Choose a service...</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Other">Other / Not sure</option>
        </select>
      </Field>

      {/* Message */}
      <Field
        id="message"
        label="Message"
        required
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message) || undefined}
          className={`${inputClass} resize-y min-h-[140px]`}
          {...register("message")}
        />
      </Field>

      {/* Honeypot (hidden from real users) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting || state.status === "submitting"
            ? "Sending..."
            : "Send Message"}
        </Button>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          We never share your info. Reply within one business day.
        </p>
      </div>

      {/* Status banners */}
      {state.status === "success" ? (
        <div
          role="status"
          className="rounded-md border px-4 py-3 text-sm"
          style={{
            background: "rgba(184,115,51,0.08)",
            borderColor: "rgba(184,115,51,0.35)",
            color: "var(--text-primary)",
          }}
        >
          Thanks. Your message is in. We will reply the same business day.
        </div>
      ) : null}
      {state.status === "error" ? (
        <div
          id="contact-form-error"
          role="alert"
          className="rounded-md border px-4 py-3 text-sm"
          style={{
            background: "rgba(127,42,31,0.10)",
            borderColor: "rgba(127,42,31,0.55)",
            color: "var(--text-primary)",
          }}
        >
          {state.message}
        </div>
      ) : null}
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-[rgba(184,115,51,0.20)] bg-[var(--bg-card)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[var(--bg-elevated)] aria-[invalid=true]:border-[var(--primary)]";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-wider"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
        {required ? (
          <span aria-hidden="true" style={{ color: "var(--accent)" }}>
            {" *"}
          </span>
        ) : null}
      </label>
      <div className="rounded-md">{children}</div>
      {error ? (
        <p role="alert" className="text-xs" style={{ color: "var(--accent)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
