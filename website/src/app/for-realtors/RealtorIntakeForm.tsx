"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { realtorIntakeSchema, type RealtorIntakeValues } from "./schema";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * Inline Zod resolver: avoids adding @hookform/resolvers as a dependency.
 * Mirrors the resolver shape react-hook-form expects.
 */
const zodResolver: Resolver<RealtorIntakeValues> = async (values) => {
  const parsed = realtorIntakeSchema.safeParse(values);
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
      keyof RealtorIntakeValues,
      { type: string; message: string }
    >,
  };
};

export function RealtorIntakeForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RealtorIntakeValues>({
    resolver: zodResolver,
    defaultValues: {
      realtorName: "",
      brokerage: "",
      email: "",
      phone: "",
      propertyAddress: "",
      closeDate: "",
      flueCount: "",
      notes: "",
      website: "",
    },
    mode: "onBlur",
  });

  async function onSubmit(values: RealtorIntakeValues) {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/realtor-intake", {
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
            "Something went wrong submitting your request. Please call us instead.",
        });
        return;
      }
      reset();
      setState({ status: "success" });
    } catch {
      setState({
        status: "error",
        message:
          "Network error. Please try again, or call us directly at the number above.",
      });
    }
  }

  return (
    <form
      id="realtor-intake-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
      aria-describedby={
        state.status === "error" ? "realtor-form-error" : undefined
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="realtorName"
          label="Your name"
          required
          error={errors.realtorName?.message}
        >
          <input
            id="realtorName"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.realtorName) || undefined}
            className={inputClass}
            {...register("realtorName")}
          />
        </Field>

        <Field
          id="brokerage"
          label="Brokerage"
          required
          error={errors.brokerage?.message}
        >
          <input
            id="brokerage"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.brokerage) || undefined}
            className={inputClass}
            {...register("brokerage")}
          />
        </Field>

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
      </div>

      <Field
        id="propertyAddress"
        label="Property address"
        required
        error={errors.propertyAddress?.message}
      >
        <input
          id="propertyAddress"
          type="text"
          autoComplete="street-address"
          aria-invalid={Boolean(errors.propertyAddress) || undefined}
          className={inputClass}
          {...register("propertyAddress")}
        />
      </Field>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="closeDate"
          label="Target close date"
          required
          error={errors.closeDate?.message}
        >
          <input
            id="closeDate"
            type="date"
            aria-invalid={Boolean(errors.closeDate) || undefined}
            className={inputClass}
            {...register("closeDate")}
          />
        </Field>

        <Field
          id="flueCount"
          label="Number of flues (optional)"
          error={errors.flueCount?.message}
        >
          <select
            id="flueCount"
            aria-invalid={Boolean(errors.flueCount) || undefined}
            className={inputClass}
            defaultValue=""
            {...register("flueCount")}
          >
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4+">4 or more</option>
            <option value="Unknown">Not sure</option>
          </select>
        </Field>
      </div>

      <Field
        id="notes"
        label="Notes (optional)"
        error={errors.notes?.message}
      >
        <textarea
          id="notes"
          rows={4}
          aria-invalid={Boolean(errors.notes) || undefined}
          className={`${inputClass} resize-y min-h-[110px]`}
          placeholder="Buyer concerns, prior inspection notes, listing agent name, anything you want us to know."
          {...register("notes")}
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
        <label htmlFor="rh-website">Website (leave blank)</label>
        <input
          id="rh-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="flex flex-col items-start gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
        <Button type="submit" disabled={isSubmitting} variant="primary">
          {isSubmitting || state.status === "submitting"
            ? "Submitting..."
            : "Submit Closing Date"}
        </Button>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          We confirm scheduling within one business day. $295 flat. Payment due on completion.
        </p>
      </div>

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
          Got it. Your request is in and we will confirm scheduling by reply within one business day.
        </div>
      ) : null}
      {state.status === "error" ? (
        <div
          id="realtor-form-error"
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
