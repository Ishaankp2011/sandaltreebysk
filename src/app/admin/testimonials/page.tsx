import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AdminTestimonials } from "@/components/admin/admin-testimonials";

export const metadata: Metadata = {
  title: "Testimonials — Admin",
};

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  let testimonials = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    testimonials = data || [];
  } catch {
    testimonials = [];
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-light mb-2">Testimonials</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Manage guest testimonials displayed on the website.
        </p>
      </div>
      <AdminTestimonials initialTestimonials={testimonials} />
    </div>
  );
}
