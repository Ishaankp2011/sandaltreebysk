export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  event_type: string;
  event_date: string;
  guest_count: string;
  message: string;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  category: string;
  featured: boolean;
  alt_text?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
  event_type: string;
  created_at: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  content_json: Record<string, unknown>;
  updated_at: string;
}

export type EventType =
  | "Wedding"
  | "Reception"
  | "Engagement"
  | "Birthday"
  | "Corporate"
  | "Anniversary"
  | "Other";

export const EVENT_TYPES: EventType[] = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday",
  "Corporate",
  "Anniversary",
  "Other",
];

export const GALLERY_CATEGORIES = [
  "All",
  "Weddings",
  "Receptions",
  "Engagements",
  "Corporate",
  "Birthdays",
  "Decor",
  "Venue",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
