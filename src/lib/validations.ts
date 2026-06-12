import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  event_type: z.string().min(1, "Please select an event type"),
  event_date: z.string().min(1, "Please select an event date"),
  guest_count: z
    .string()
    .min(1, "Please enter expected guest count")
    .max(10, "Guest count seems too large"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;

export const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  rating: z.number().min(1).max(5),
  review: z.string().min(10).max(500),
  event_type: z.string().min(1),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;
