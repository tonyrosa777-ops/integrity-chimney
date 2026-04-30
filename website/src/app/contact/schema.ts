import { z } from "zod";

/**
 * Shared validation schema for the /contact form.
 * Imported by the client form (ContactForm.tsx) and the
 * server route handler (/api/contact/route.ts).
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name." })
    .max(120, { message: "Name is too long." }),
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
  serviceInterest: z
    .string()
    .trim()
    .max(120, { message: "Selection is too long." })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, { message: "Please write at least 10 characters." })
    .max(5000, { message: "Message is too long (max 5000 characters)." }),
  // Honeypot - hidden field, must remain empty.
  website: z
    .string()
    .max(0, { message: "Spam detected." })
    .optional()
    .or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
