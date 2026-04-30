/**
 * GET /api/calendly/slots?date=YYYY-MM-DD
 *
 * Returns 3-5 bookable time slots for the given date.
 *
 * Real mode (CALENDLY_API_KEY + CALENDLY_EVENT_TYPE_URI set):
 *   Calls https://api.calendly.com/event_type_available_times to fetch
 *   genuine availability.
 *
 * Demo mode (no API keys):
 *   Returns a deterministic pseudo-random subset (3-5 slots) drawn from a
 *   fixed pool of business hours so the booking experience works end to end
 *   without any third-party credentials.
 *
 * NOTE: We never expose Calendly errors to the client. Any upstream failure
 * collapses to demo-mode output so the calendar always renders something.
 */

const SLOT_POOL: ReadonlyArray<{ hour: number; minute: number; label: string }> = [
  { hour: 8, minute: 0, label: "8:00 AM" },
  { hour: 9, minute: 0, label: "9:00 AM" },
  { hour: 10, minute: 0, label: "10:00 AM" },
  { hour: 11, minute: 30, label: "11:30 AM" },
  { hour: 13, minute: 0, label: "1:00 PM" },
  { hour: 14, minute: 0, label: "2:00 PM" },
  { hour: 15, minute: 0, label: "3:00 PM" },
  { hour: 16, minute: 0, label: "4:00 PM" },
];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

type Slot = { start: string; end: string; label: string };

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildIso(year: number, month: number, day: number, hour: number, minute: number): string {
  const d = new Date(Date.UTC(year, month - 1, day, hour, minute));
  return d.toISOString();
}

function buildDemoSlots(dateStr: string): Slot[] {
  const [yStr, mStr, dStr] = dateStr.split("-");
  const year = Number(yStr);
  const month = Number(mStr);
  const day = Number(dStr);

  const seed = hashString(dateStr);
  const count = 3 + (seed % 3);

  const indices: number[] = [];
  let cursor = seed;
  while (indices.length < count) {
    cursor = (Math.imul(cursor, 1103515245) + 12345) >>> 0;
    const idx = cursor % SLOT_POOL.length;
    if (!indices.includes(idx)) indices.push(idx);
  }
  indices.sort((a, b) => a - b);

  return indices.map((idx) => {
    const slot = SLOT_POOL[idx];
    const start = buildIso(year, month, day, slot.hour, slot.minute);
    const end = buildIso(year, month, day, slot.hour + 1, slot.minute);
    return { start, end, label: slot.label };
  });
}

function formatLabelFromIso(iso: string): string {
  const d = new Date(iso);
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  const mm = m.toString().padStart(2, "0");
  if (m === 0) return `${h}:00 ${ampm}`;
  return `${h}:${mm} ${ampm}`;
}

async function fetchCalendlySlots(dateStr: string, apiKey: string, eventTypeUri: string): Promise<Slot[] | null> {
  try {
    const start = `${dateStr}T00:00:00Z`;
    const endDate = new Date(`${dateStr}T00:00:00Z`);
    endDate.setUTCDate(endDate.getUTCDate() + 1);
    const end = endDate.toISOString().replace(/\.\d{3}Z$/, "Z");

    const url = new URL("https://api.calendly.com/event_type_available_times");
    url.searchParams.set("event_type", eventTypeUri);
    url.searchParams.set("start_time", start);
    url.searchParams.set("end_time", end);

    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = (await res.json()) as { collection?: Array<{ start_time?: string }> };
    const collection = json.collection ?? [];
    if (collection.length === 0) return [];

    const slots: Slot[] = collection
      .filter((row) => typeof row.start_time === "string")
      .slice(0, 5)
      .map((row) => {
        const startIso = row.start_time as string;
        const endIso = new Date(new Date(startIso).getTime() + 60 * 60 * 1000).toISOString();
        return { start: startIso, end: endIso, label: formatLabelFromIso(startIso) };
      });
    return slots;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  if (!date || !DATE_RE.test(date)) {
    return Response.json(
      { error: "Invalid or missing date parameter. Use YYYY-MM-DD." },
      { status: 400 },
    );
  }

  const apiKey = process.env.CALENDLY_API_KEY;
  const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

  if (apiKey && eventTypeUri) {
    const real = await fetchCalendlySlots(date, apiKey, eventTypeUri);
    if (real !== null) {
      return Response.json({ slots: real, demo: false });
    }
  }

  const slots = buildDemoSlots(date);
  return Response.json({ slots, demo: true });
}
