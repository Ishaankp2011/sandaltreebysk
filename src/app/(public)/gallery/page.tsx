import { Metadata } from "next";
import { GalleryClient } from "@/components/gallery/gallery-client";
import { createClient } from "@/lib/supabase/server";
import { GalleryImage } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore our luxury event gallery — stunning weddings, receptions, engagements, and celebrations at Sandal Tree by SK.",
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
