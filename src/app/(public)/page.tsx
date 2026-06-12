import { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { VenueHighlights } from "@/components/home/venue-highlights";
import { AboutPreview } from "@/components/home/about-preview";
import { EventTypes } from "@/components/home/event-types";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { BookingCta } from "@/components/home/booking-cta";
import { LocationSection } from "@/components/home/location-section";
import { InstagramSection } from "@/components/home/instagram-section";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Sandal Tree by SK — Luxury Banquet Hall & Event Venue",
  description:
    "Experience timeless elegance at Sandal Tree by SK — a premier luxury banquet hall for weddings, receptions, engagements, and corporate events.",
};

export const revalidate = 3600;

async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    return data || [];
  } catch {
    return [];
  }
}

async function getFeaturedGallery() {
  try {
    const supabase = await createClient();
    // Try featured first, then fall back to any images
    const { data: featured } = await supabase
      .from("gallery_images")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(5);

    if (featured && featured.length > 0) return featured;

    // No featured images — grab any 5
    const { data: any } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    return any || [];
  } catch {
    return [];
  }
}

async function getInstagramPosts() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("instagram_posts")
      .select("id, image_url, post_url, caption, display_order")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .limit(6);
    return data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [testimonials, galleryImages, instagramPosts] = await Promise.all([
    getTestimonials(),
    getFeaturedGallery(),
    getInstagramPosts(),
  ]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:text-sm"
      >
        Skip to main content
      </a>

      <Hero />
      <VenueHighlights />
      <AboutPreview />
      <EventTypes />
      <GalleryPreview images={galleryImages} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <BookingCta />
      <LocationSection />
      <InstagramSection posts={instagramPosts} />
    </>
  );
}
