import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminInstagram } from "@/components/admin/admin-instagram";

export const metadata: Metadata = { title: "Instagram Posts — Admin" };
export const revalidate = 0;

export default async function AdminInstagramPage() {
  let posts = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("instagram_posts")
      .select("*")
      .order("display_order", { ascending: true });
    posts = data || [];
  } catch {
    posts = [];
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light mb-2">Instagram Posts</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Manage the Instagram posts shown on the homepage. Images are served
          from Supabase Storage → <code className="text-primary">instagram</code> bucket.
        </p>
      </div>
      <AdminInstagram initialPosts={posts} />
    </div>
  );
}
