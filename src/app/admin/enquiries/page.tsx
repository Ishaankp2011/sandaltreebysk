import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { EnquiriesTable } from "@/components/admin/enquiries-table";

export const metadata: Metadata = {
  title: "Enquiries — Admin",
};

export const revalidate = 0;

export default async function EnquiriesPage() {
  let enquiries = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    enquiries = data || [];
  } catch {
    enquiries = [];
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light mb-2">Enquiries</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Manage all booking enquiries received from the website.
        </p>
      </div>
      <EnquiriesTable initialEnquiries={enquiries} />
    </div>
  );
}
