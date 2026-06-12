import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminContent } from "@/components/admin/admin-content";

export const metadata: Metadata = {
  title: "Content — Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  let content: Record<string, unknown> = {};
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("site_content").select("*");
    if (data) {
      data.forEach((item: { section_key: string; content_json: unknown }) => {
        content[item.section_key] = item.content_json;
      });
    }
  } catch {
    content = {};
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light mb-2">Content</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Manage editable website content sections.
        </p>
      </div>
      <AdminContent initialContent={content} />
    </div>
  );
}
