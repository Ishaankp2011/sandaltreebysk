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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaltreebysk.com";

export const metadata: Metadata = {
  title: "Sandal Tree by SK — Luxury Banquet Hall & Wedding Venue in Delhi NCR",
  description:
    "Sandal Tree by SK is Delhi NCR's premier luxury banquet hall for weddings, receptions, engagements, corporate events, and celebrations. Accommodates 1000+ guests. Book a consultation today.",
  keywords: [
    "luxury banquet hall Delhi NCR",
    "wedding venue Ghaziabad",
    "reception hall Delhi",
    "Sandal Tree by SK",
    "banquet hall booking",
    "wedding venue near me",
    "luxury wedding hall",
    "corporate event venue Delhi",
    "birthday party hall",
    "engagement ceremony hall",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Sandal Tree by SK — Luxury Banquet Hall & Wedding Venue",
    description:
      "Delhi NCR's premier luxury banquet hall for weddings, receptions, and grand celebrations. Accommodating 1000+ guests with world-class décor, catering & service.",
    url: siteUrl,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sandal Tree by SK — Grand Banquet Hall" }],
  },
  twitter: {
    title: "Sandal Tree by SK — Luxury Banquet Hall & Wedding Venue",
    description:
      "Delhi NCR's premier luxury banquet hall for weddings, receptions, and grand celebrations. 1000+ guest capacity.",
    images: ["/og-image.jpg"],
  },
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the capacity of Sandal Tree by SK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sandal Tree by SK can accommodate 1000+ guests, making it suitable for both intimate gatherings and grand celebrations.",
        },
      },
      {
        "@type": "Question",
        name: "What types of events does Sandal Tree by SK host?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We host weddings, reception parties, engagement ceremonies, corporate functions, birthday celebrations, anniversaries, and fully customised events.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book Sandal Tree by SK for my event?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book by filling out the enquiry form on our Contact page, calling us directly, or emailing info@sandaltreebysk.com. Our team responds within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "Does Sandal Tree by SK provide catering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we offer full catering support with multiple cuisine options and dedicated catering coordination for your event.",
        },
      },
      {
        "@type": "Question",
        name: "Is parking available at Sandal Tree by SK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, ample on-site parking is available for guests. Valet parking services can also be arranged.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
