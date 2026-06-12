import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminGallery } from "@/components/admin/admin-gallery";

export const metadata: Metadata = {
  title: "Gallery — Admin",
};

export const revalidate = 0;

export default async function AdminGalleryPage() {
  let images = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    images = data || [];
  } catch {
    images = [];
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light mb-2">Gallery</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Upload, manage and organize gallery images.
        </p>
      </div>
      <AdminGallery initialImages={images} />
    </div>
  );
}
