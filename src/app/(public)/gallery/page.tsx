import { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/gallery-client";
import { createClient } from "@/lib/supabase/server";
import { GalleryImage } from "@/lib/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sandaltreebysk.com";

export const metadata: Metadata = {
  title: "Gallery — Weddings, Receptions & Events",
  description:
    "Browse the Sandal Tree by SK photo gallery — stunning weddings, reception nights, engagement ceremonies, and grand celebrations captured at Delhi NCR's premier luxury banquet hall.",
  keywords: [
    "banquet hall gallery",
    "wedding venue photos Delhi",
    "luxury reception images",
    "Sandal Tree by SK gallery",
    "event venue photos Delhi NCR",
    "wedding hall interior photos",
  ],
  alternates: { canonical: `${siteUrl}/gallery` },
  openGraph: {
    title: "Gallery — Sandal Tree by SK Weddings & Events",
    description:
      "Explore breathtaking photographs from weddings, receptions, and celebrations at Sandal Tree by SK — Delhi NCR's premier luxury banquet hall.",
    url: `${siteUrl}/gallery`,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sandal Tree by SK Event Gallery" }],
  },
  twitter: {
    title: "Gallery — Sandal Tree by SK Weddings & Events",
    description:
      "Breathtaking photographs from weddings, receptions, and celebrations at Delhi NCR's premier luxury banquet hall.",
    images: ["/og-image.jpg"],
  },
};

export const revalidate = 3600;

async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      {/* Page Hero */}
      <section
        className="relative pt-32 pb-16 md:pt-44 md:pb-20"
        aria-labelledby="gallery-page-heading"
      >
        <div className="container-luxury">
          <div className="max-w-3xl">
            <p className="text-overline mb-4">Visual Stories</p>
            <h1 id="gallery-page-heading" className="heading-display mb-6">
              Moments That
              <br />
              <span className="text-primary italic">Last Forever</span>
            </h1>
            <div className="w-16 h-px bg-primary mb-8" aria-hidden />
            <p className="font-sans text-lg text-muted-foreground leading-relaxed">
              Browse through our collection of celebrations, captured in their
              full splendour at Sandal Tree by SK.
            </p>
          </div>
        </div>
      </section>

      <GalleryClient images={images} />
    </>
  );
}
