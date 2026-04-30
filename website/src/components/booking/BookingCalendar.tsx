/**
 * BookingCalendar.tsx - Custom booking UI for Integrity Chimney Services LLC.
 *
 * IMPORTANT: This is a fully custom calendar. There is NO Calendly iframe.
 * Under the hood, /api/calendly/slots and /api/calendly/book broker availability
 * with the Calendly API (or seeded demo data when keys are absent). The user
 * never sees Calendly branding.
 *
 * Flow:
 *   1. Month grid (prev / next month, weekday headers, date cells).
 *   2. On date click -> fetch slots, render time-slot chips.
 *   3. On slot select -> reveal lead capture form (RHF + Zod).
 *   4. On submit -> POST /api/calendly/book, show success card.
 *
 * Brand:
 *   - Primary brick (var(--primary)) for selected/active states.
 *   - Hearth copper (var(--accent)) for hover, selection borders.
 *   - Granite slate text on aged-mortar surface.
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

type Slot = { start: string; end: string; label: string };

type LeadFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
};

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  address: z.string().trim().min(5, "Please enter a service address."),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

/* -------------------------------------------------------------------------- */
/* Date helpers - local-time, no external library                              */
/* -------------------------------------------------------------------------- */

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, delta: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

type DayCell = {
  date: Date;
  isoDate: string;
  inCurrentMonth: boolean;
  isPast: boolean;
  isToday: boolean;
  isWeekend: boolean;
};

function buildMonthGrid(monthAnchor: Date, today: Date): DayCell[] {
  const first = startOfMonth(monthAnchor);
  const startWeekday = first.getDay(); // 0..6 (Sun..Sat)
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - startWeekday);

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const inCurrentMonth = d.getMonth() === monthAnchor.getMonth();
    const isPast =
      d.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const isToday = isSameDay(d, today);
    const weekday = d.getDay();
    const isWeekend = weekday === 0 || weekday === 6;
    cells.push({
      date: d,
      isoDate: toIsoDate(d),
      inCurrentMonth,
      isPast,
      isToday,
      isWeekend,
    });
  }
  return cells;
}

function humanDateLong(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

type Stage = "pickDate" | "pickSlot" | "form" | "submitting" | "success" | "error";

export function BookingCalendar() {
  const today = useMemo(() => new Date(), []);
  const [monthAnchor, setMonthAnchor] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [stage, setStage] = useState<Stage>("pickDate");
  const [bookingId, setBookingId] = useState<string | null>(null);

  const cells = useMemo(() => buildMonthGrid(monthAnchor, today), [monthAnchor, today]);

  // Disable navigating to months earlier than the current real-world month.
  const canGoPrev =
    monthAnchor.getFullYear() > today.getFullYear() ||
    (monthAnchor.getFullYear() === today.getFullYear() &&
      monthAnchor.getMonth() > today.getMonth());

  /* -------------------------- Slot fetch on date pick ---------------------- */

  useEffect(() => {
    if (!selectedDate) return;
    let cancelled = false;
    const isoDate = toIsoDate(selectedDate);

    setSlotsLoading(true);
    setSlotsError(null);
    setSlots([]);

    fetch(`/api/calendly/slots?date=${isoDate}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error("slots-failed");
        const json = (await res.json()) as { slots?: Slot[] };
        if (cancelled) return;
        setSlots(json.slots ?? []);
        setStage("pickSlot");
      })
      .catch(() => {
        if (cancelled) return;
        setSlotsError(
          `Something went wrong, please call ${siteConfig.phone}`,
        );
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  /* -------------------------- Lead form (RHF) ------------------------------ */

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset: resetForm,
  } = useForm<LeadFormValues>({
    defaultValues: { name: "", email: "", phone: "", address: "", notes: "" },
  });

  async function onSubmit(values: LeadFormValues) {
    if (!selectedSlot) return;
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) return;

    setStage("submitting");
    try {
      const res = await fetch("/api/calendly/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotStart: selectedSlot.start,
          slotEnd: selectedSlot.end,
          lead: {
            name: parsed.data.name,
            email: parsed.data.email,
            phone: parsed.data.phone,
            address: parsed.data.address,
            notes: parsed.data.notes ?? "",
          },
        }),
      });
      if (!res.ok) throw new Error("book-failed");
      const json = (await res.json()) as { ok: boolean; bookingId?: string };
      if (!json.ok || !json.bookingId) throw new Error("book-failed");
      setBookingId(json.bookingId);
      setStage("success");
    } catch {
      setStage("error");
    }
  }

  /* -------------------------- Reset for "book another" --------------------- */

  function resetAll() {
    setSelectedDate(null);
    setSelectedSlot(null);
    setSlots([]);
    setSlotsError(null);
    setBookingId(null);
    resetForm();
    setStage("pickDate");
  }

  /* ------------------------------ Render ----------------------------------- */

  return (
    <div className="w-full">
      {/* Calendar shell */}
      <div
        className="rounded-xl border bg-white/60 p-4 shadow-sm sm:p-6"
        style={{ borderColor: "rgba(127,42,31,0.18)" }}
      >
        {/* Month nav */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => canGoPrev && setMonthAnchor(addMonths(monthAnchor, -1))}
            disabled={!canGoPrev}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md border transition-colors",
              "border-[color:var(--granite-slate)]/20 text-[color:var(--granite-slate)]",
              canGoPrev
                ? "hover:bg-accent hover:text-white hover:border-accent"
                : "cursor-not-allowed opacity-30",
            )}
            aria-label="Previous month"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <h3
            className="font-display text-lg font-semibold sm:text-xl"
            style={{ color: "var(--granite-slate)" }}
          >
            {MONTH_LABELS[monthAnchor.getMonth()]} {monthAnchor.getFullYear()}
          </h3>
          <button
            type="button"
            onClick={() => setMonthAnchor(addMonths(monthAnchor, 1))}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--granite-slate)]/20 text-[color:var(--granite-slate)] transition-colors hover:bg-accent hover:text-white hover:border-accent"
            aria-label="Next month"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {WEEKDAY_LABELS.map((w) => (
            <div
              key={w}
              className="py-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] sm:text-xs"
              style={{ color: "var(--granite-slate)", opacity: 0.6 }}
            >
              {w}
            </div>
          ))}
        </div>

        {/* Date grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {cells.map((cell) => {
            const isSelected = selectedDate ? isSameDay(cell.date, selectedDate) : false;
            const disabled = !cell.inCurrentMonth || cell.isPast;
            const baseClasses =
              "relative flex aspect-square items-center justify-center rounded-md text-sm font-medium transition-all duration-150 sm:text-base";
            const stateClasses = disabled
              ? "cursor-not-allowed opacity-25"
              : isSelected
                ? "border-2 cursor-pointer"
                : "cursor-pointer hover:bg-[color:var(--accent)]/10 hover:text-[color:var(--accent)]";
            const todayRing = cell.isToday && !isSelected ? "ring-1 ring-[color:var(--accent)]" : "";

            return (
              <button
                type="button"
                key={cell.isoDate + (cell.inCurrentMonth ? "" : "-out")}
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  setSelectedDate(cell.date);
                  setSelectedSlot(null);
                  setBookingId(null);
                  if (stage === "success" || stage === "error") setStage("pickDate");
                }}
                className={cn(baseClasses, stateClasses, todayRing)}
                style={{
                  color: isSelected
                    ? "var(--primary)"
                    : "var(--granite-slate)",
                  background: isSelected
                    ? "rgba(127, 42, 31, 0.10)"
                    : "transparent",
                  borderColor: isSelected ? "var(--accent)" : "transparent",
                }}
                aria-pressed={isSelected}
                aria-label={cell.date.toDateString()}
              >
                {cell.date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Slot panel + form panel */}
      <div className="mt-6 sm:mt-8">
        {!selectedDate ? (
          <p
            className="rounded-lg border border-dashed px-4 py-6 text-center text-sm"
            style={{
              borderColor: "rgba(47, 62, 70, 0.25)",
              color: "var(--granite-slate)",
              opacity: 0.75,
            }}
          >
            Pick a date above to see available inspection times.
          </p>
        ) : (
          <SlotPanel
            selectedDate={selectedDate}
            slots={slots}
            slotsLoading={slotsLoading}
            slotsError={slotsError}
            selectedSlot={selectedSlot}
            onSelectSlot={(s) => {
              setSelectedSlot(s);
              setStage("form");
            }}
          />
        )}
      </div>

      {selectedSlot && (stage === "form" || stage === "submitting") && (
        <LeadForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          isSubmitting={isSubmitting || stage === "submitting"}
          selectedDate={selectedDate as Date}
          selectedSlot={selectedSlot}
        />
      )}

      {stage === "success" && bookingId && selectedSlot && selectedDate && (
        <SuccessCard
          bookingId={bookingId}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          onReset={resetAll}
        />
      )}

      {stage === "error" && (
        <ErrorCard onReset={resetAll} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components                                                              */
/* -------------------------------------------------------------------------- */

function SlotPanel(props: {
  selectedDate: Date;
  slots: Slot[];
  slotsLoading: boolean;
  slotsError: string | null;
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
}) {
  const { selectedDate, slots, slotsLoading, slotsError, selectedSlot, onSelectSlot } = props;

  return (
    <div
      className="rounded-xl border bg-white/60 p-4 shadow-sm sm:p-6"
      style={{ borderColor: "rgba(127,42,31,0.18)" }}
    >
      <h4
        className="font-display text-base font-semibold sm:text-lg"
        style={{ color: "var(--granite-slate)" }}
      >
        Times for {humanDateLong(selectedDate)}
      </h4>

      {slotsLoading && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-11 animate-pulse rounded-md"
              style={{ background: "rgba(47, 62, 70, 0.10)" }}
            />
          ))}
        </div>
      )}

      {!slotsLoading && slotsError && (
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--primary)" }}
        >
          {slotsError}
        </p>
      )}

      {!slotsLoading && !slotsError && slots.length === 0 && (
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--granite-slate)", opacity: 0.7 }}
        >
          No availability on this day. Try another date or call{" "}
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="underline"
            style={{ color: "var(--primary)" }}
          >
            {siteConfig.phone}
          </a>
          .
        </p>
      )}

      {!slotsLoading && !slotsError && slots.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
          {slots.map((slot) => {
            const isSelected = selectedSlot?.start === slot.start;
            return (
              <button
                type="button"
                key={slot.start}
                onClick={() => onSelectSlot(slot)}
                className={cn(
                  "rounded-md border px-3 py-3 text-sm font-medium transition-colors",
                  isSelected
                    ? "text-white"
                    : "hover:border-accent hover:text-[color:var(--accent)]",
                )}
                style={{
                  borderColor: isSelected ? "var(--primary)" : "rgba(47, 62, 70, 0.25)",
                  background: isSelected ? "var(--primary)" : "transparent",
                  color: isSelected ? undefined : "var(--granite-slate)",
                }}
                aria-pressed={isSelected}
              >
                {slot.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

type LeadFormProps = {
  register: ReturnType<typeof useForm<LeadFormValues>>["register"];
  handleSubmit: ReturnType<typeof useForm<LeadFormValues>>["handleSubmit"];
  onSubmit: (values: LeadFormValues) => Promise<void>;
  errors: ReturnType<typeof useForm<LeadFormValues>>["formState"]["errors"];
  isSubmitting: boolean;
  selectedDate: Date;
  selectedSlot: Slot;
};

function LeadForm(props: LeadFormProps) {
  const { register, handleSubmit, onSubmit, errors, isSubmitting, selectedDate, selectedSlot } =
    props;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 rounded-xl border bg-white/60 p-4 shadow-sm sm:mt-8 sm:p-6"
      style={{ borderColor: "rgba(127,42,31,0.18)" }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.12em]"
        style={{ color: "var(--accent)" }}
      >
        Step 3 of 3 &middot; Your Details
      </p>
      <h4
        className="mt-1 font-display text-lg font-semibold sm:text-xl"
        style={{ color: "var(--granite-slate)" }}
      >
        Booking {humanDateLong(selectedDate)} at {selectedSlot.label}
      </h4>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            className={inputClasses}
            {...register("name", { required: "Please enter your name." })}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className={inputClasses}
            {...register("email", { required: "Please enter your email." })}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            {...register("phone", { required: "Please enter your phone." })}
          />
        </Field>
        <Field label="Service Address" error={errors.address?.message}>
          <input
            type="text"
            autoComplete="street-address"
            className={inputClasses}
            {...register("address", { required: "Please enter the service address." })}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes (optional)" error={errors.notes?.message}>
            <textarea
              rows={3}
              className={cn(inputClasses, "min-h-[88px] resize-y")}
              placeholder="Anything we should know about your chimney or property?"
              {...register("notes")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className="text-xs"
          style={{ color: "var(--granite-slate)", opacity: 0.7 }}
        >
          By booking, you consent to a confirmation email from{" "}
          {siteConfig.shortName}. We never share your info.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-mono text-sm uppercase tracking-[0.08em] text-white transition-colors",
            "hover:bg-accent",
            isSubmitting && "cursor-wait opacity-70",
          )}
        >
          {isSubmitting ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
}

const inputClasses =
  "w-full rounded-md border bg-white/80 px-3 py-2.5 text-sm text-[color:var(--granite-slate)] outline-none transition-colors placeholder:text-[color:var(--granite-slate)]/40 focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/30 border-[color:var(--granite-slate)]/20";

function Field(props: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="mb-1 block font-mono text-[0.7rem] uppercase tracking-[0.1em]"
        style={{ color: "var(--granite-slate)", opacity: 0.75 }}
      >
        {props.label}
      </span>
      {props.children}
      {props.error && (
        <span
          className="mt-1 block text-xs"
          style={{ color: "var(--primary)" }}
        >
          {props.error}
        </span>
      )}
    </label>
  );
}

function SuccessCard(props: {
  bookingId: string;
  selectedDate: Date;
  selectedSlot: Slot;
  onReset: () => void;
}) {
  return (
    <div
      className="mt-6 rounded-xl border bg-white/70 p-5 shadow-sm sm:mt-8 sm:p-6"
      style={{ borderColor: "rgba(184, 115, 51, 0.45)" }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.12em]"
        style={{ color: "var(--accent)" }}
      >
        Confirmed
      </p>
      <h4
        className="mt-1 font-display text-xl font-semibold sm:text-2xl"
        style={{ color: "var(--granite-slate)" }}
      >
        You&apos;re on the books.
      </h4>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: "var(--granite-slate)" }}
      >
        Your inspection is scheduled for{" "}
        <strong>
          {humanDateLong(props.selectedDate)} at {props.selectedSlot.label}
        </strong>
        . A confirmation has been sent to your email and {siteConfig.owner} has
        been notified. Expect a quick courtesy call within 24 hours.
      </p>
      <p
        className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.12em]"
        style={{ color: "var(--granite-slate)", opacity: 0.6 }}
      >
        Confirmation ID: {props.bookingId}
      </p>
      <button
        type="button"
        onClick={props.onReset}
        className="mt-5 inline-flex items-center justify-center rounded-md border border-[color:var(--accent)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--accent)] transition-colors hover:bg-accent hover:text-white"
      >
        Book another
      </button>
    </div>
  );
}

function ErrorCard(props: { onReset: () => void }) {
  return (
    <div
      className="mt-6 rounded-xl border bg-white/70 p-5 shadow-sm sm:mt-8 sm:p-6"
      style={{ borderColor: "rgba(127, 42, 31, 0.4)" }}
    >
      <p
        className="font-mono text-xs uppercase tracking-[0.12em]"
        style={{ color: "var(--primary)" }}
      >
        Something went wrong
      </p>
      <h4
        className="mt-1 font-display text-lg font-semibold sm:text-xl"
        style={{ color: "var(--granite-slate)" }}
      >
        Please call {siteConfig.phone}.
      </h4>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: "var(--granite-slate)" }}
      >
        We couldn&apos;t complete your booking online just now. Give us a ring
        and we&apos;ll get you scheduled the same day.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href={`tel:${siteConfig.phoneTel}`}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-accent"
        >
          Call {siteConfig.phone}
        </a>
        <button
          type="button"
          onClick={props.onReset}
          className="inline-flex items-center justify-center rounded-md border border-[color:var(--granite-slate)]/30 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--granite-slate)] transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default BookingCalendar;
