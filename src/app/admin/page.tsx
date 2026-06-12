import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Images, Star, Globe, ArrowRight, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard — Sandal Tree by SK",
};

async function getDashboardStats() {
  try {
    const supabase = await createClient();
    const [enquiriesRes, galleryRes, testimonialsRes, newRes, recentRes] = await Promise.all([
      supabase.from("enquiries").select("id", { count: "exact" }),
      supabase.from("gallery_images").select("id", { count: "exact" }),
      supabase.from("testimonials").select("id", { count: "exact" }),
      supabase.from("enquiries").select("id", { count: "exact" }).eq("status", "new"),
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(6),
    ]);
    return {
      enquiriesCount: enquiriesRes.count || 0,
      galleryCount: galleryRes.count || 0,
      testimonialsCount: testimonialsRes.count || 0,
      newEnquiriesCount: newRes.count || 0,
      recentEnquiries: recentRes.data || [],
    };
  } catch {
    return { enquiriesCount: 0, galleryCount: 0, testimonialsCount: 0, newEnquiriesCount: 0, recentEnquiries: [] };
  }
}

const STATUS_CLASS = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  contacted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  closed: "bg-secondary text-secondary-foreground",
};

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Enquiries",
      value: stats.enquiriesCount,
      sub: stats.newEnquiriesCount > 0 ? `${stats.newEnquiriesCount} new` : "All reviewed",
      icon: MessageSquare,
      href: "/admin/enquiries",
      accent: "text-blue-500",
      highlight: stats.newEnquiriesCount > 0,
    },
    {
      label: "Gallery Images",
      value: stats.galleryCount,
      sub: "Uploaded photos",
      icon: Images,
      href: "/admin/gallery",
      accent: "text-emerald-500",
      highlight: false,
    },
    {
      label: "Testimonials",
      value: stats.testimonialsCount,
      sub: "Guest reviews",
      icon: Star,
      href: "/admin/testimonials",
      accent: "text-yellow-500",
      highlight: false,
    },
    {
      label: "Website",
      value: "Live",
      sub: "sandaltreebysk.com",
      icon: Globe,
      href: "/",
      accent: "text-primary",
      highlight: false,
      external: true,
    },
  ];

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-light mb-1">Dashboard</h1>
        <p className="font-sans text-sm text-muted-foreground">
          Manage your Sandal Tree by SK website
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            className={cn(
              "card-luxury p-5 group hover:shadow-lg transition-all duration-300 relative overflow-hidden",
              card.highlight && "ring-1 ring-blue-500/30"
            )}
          >
            {card.highlight && (
              <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            )}
            <card.icon size={18} className={`${card.accent} mb-4`} aria-hidden />
            <p className="font-serif text-3xl font-light mb-0.5">{card.value}</p>
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground">
              {card.label}
            </p>
            <p className="font-sans text-xs text-muted-foreground/60 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-serif text-lg font-light mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { href: "/admin/gallery", label: "Upload Gallery Images", desc: "Add or remove photos" },
            { href: "/admin/enquiries", label: "View Enquiries", desc: "See all booking requests" },
            { href: "/admin/content", label: "Edit Website Content", desc: "Update text and info" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between p-4 card-luxury hover:bg-secondary/30 transition-colors group"
            >
              <div>
                <p className="font-sans text-sm font-semibold">{action.label}</p>
                <p className="font-sans text-xs text-muted-foreground mt-0.5">{action.desc}</p>
              </div>
              <ArrowRight size={15} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent enquiries */}
      <div className="card-luxury overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-muted-foreground" aria-hidden />
            <h2 className="font-serif text-lg font-light">Recent Enquiries</h2>
          </div>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 font-sans text-xs text-primary tracking-widest uppercase hover:underline"
          >
            View All <ArrowRight size={11} />
          </Link>
        </div>

        {stats.recentEnquiries.length > 0 ? (
          <div className="divide-y divide-border">
            {stats.recentEnquiries.map((e) => (
              <Link
                key={e.id}
                href="/admin/enquiries"
                className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors"
              >
                <div>
                  <p className="font-sans text-sm font-semibold">{e.name}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {e.event_type} &bull; {e.event_date} &bull; {e.guest_count} guests
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span className={`inline-block px-2.5 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase rounded-sm mb-1 ${STATUS_CLASS[e.status as keyof typeof STATUS_CLASS] || STATUS_CLASS.new}`}>
                    {e.status}
                  </span>
                  <p className="font-sans text-[10px] text-muted-foreground">
                    {formatDateTime(e.created_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-14 text-center">
            <MessageSquare size={28} className="mx-auto text-muted-foreground mb-3" aria-hidden />
            <p className="font-sans text-sm text-muted-foreground">No enquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// cn helper needed in server component
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
