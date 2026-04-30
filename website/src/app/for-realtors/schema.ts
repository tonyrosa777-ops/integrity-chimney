import { z } from "zod";

/**
 * Shared validation schema for the /for-realtors intake form.
 * Imported by the client form (RealtorIntakeForm.tsx) and the
 * server route handler (/api/realtor-intake/route.ts).
 */
export const realtorIntakeSchema = z.object({
  realtorName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name." })
    .max(120, { message: "Name is too long." }),
  brokerage: z
    .string()
    .trim()
    .min(2, { message: "Please enter your brokerage." })
    .max(160, { message: "Brokerage name is too long." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email." })
    .max(200, { message: "Email is too long." }),
  phone: z
    .string()
    .trim()
    .max(40, { message: "Phone number is too long." })
    .optional()
    .or(z.literal("")),
  propertyAddress: z
    .string()
    .trim()
    .min(5, { message: "Please enter the property address." })
    .max(280, { message: "Address is too long." }),
  closeDate: z
    .string()
    .trim()
    .min(1, { message: "Please pick a target close date." })
    .max(40, { message: "Date is too long." }),
  flueCount: z
    .string()
    .trim()
    .max(8, { message: "Selection is too long." })
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .trim()
    .max(3000, { message: "Notes are too long (max 3000 characters)." })
    .optional()
    .or(z.literal("")),
  // Honeypot - hidden field, must remain empty.
  website: z
    .string()
    .max(0, { message: "Spam detected." })
    .optional()
    .or(z.literal("")),
});

export type RealtorIntakeValues = z.infer<typeof realtorIntakeSchema>;
