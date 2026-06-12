"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Check, Loader2, ChevronDown, ChevronUp, Info, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Field {
  key: string;
  label: string;
  type: "text" | "textarea" | "tel" | "email" | "url";
  placeholder?: string;
  hint?: string;
}

interface ContentSection {
  key: string;
  label: string;
  description: string;
  previewHref?: string;
  fields: Field[];
}

const contentSections: ContentSection[] = [
  {
    key: "hero",
    label: "Homepage Hero",
    description: "Controls the main text and CTAs on the homepage hero section.",
    previewHref: "/",
    fields: [
      {
        key: "eyebrow",
        label: "Eyebrow Text",
        type: "text",
        placeholder: "Welcome to",
        hint: "Small text above the main title",
      },
      {
        key: "title",
        label: "Main Title",
        type: "text",
        placeholder: "Sandal Tree",
        hint: "Large headline (shown as-is)",
      },
      {
        key: "subtitle",
        label: "Tagline / Subtitle",
        type: "textarea",
        placeholder: "Where every celebration becomes a timeless memory...",
        hint: "Shown below the title in the hero",
      },
      {
        key: "cta_primary",
        label: "Primary Button Text",
        type: "text",
        placeholder: "Book an Event",
      },
      {
        key: "cta_secondary",
        label: "Secondary Button Text",
        type: "text",
        placeholder: "Explore Gallery",
      },
    ],
  },
  {
    key: "about",
    label: "About Page",
    description: "Content displayed on the About page.",
    previewHref: "/about",
    fields: [
      {
        key: "story",
        label: "Our Story",
        type: "textarea",
        placeholder: "Founded with a singular vision...",
        hint: "Main story paragraph",
      },
      {
        key: "story_2",
        label: "Story (continued)",
        type: "textarea",
        placeholder: "Second paragraph...",
      },
      {
        key: "mission",
        label: "Mission Statement",
        type: "textarea",
        placeholder: "To provide a venue of timeless beauty...",
        hint: "Shown in the dark mission section",
      },
      {
        key: "philosophy",
        label: "Brand Philosophy",
        type: "textarea",
        placeholder: "We believe that a truly exceptional event...",
      },
      {
        key: "stat_events",
        label: "Stat: Events Hosted",
        type: "text",
        placeholder: "500+",
      },
      {
        key: "stat_capacity",
        label: "Stat: Guest Capacity",
        type: "text",
        placeholder: "1000+",
      },
      {
        key: "stat_years",
        label: "Stat: Years of Excellence",
        type: "text",
        placeholder: "10+",
      },
      {
        key: "stat_satisfaction",
        label: "Stat: Client Satisfaction",
        type: "text",
        placeholder: "100%",
      },
    ],
  },
  {
    key: "contact",
    label: "Contact Information",
    description: "Phone, email and address shown across the website.",
    previewHref: "/contact",
    fields: [
      {
        key: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+91 XXXXX XXXXX",
        hint: "Shown in footer, contact page, and navbar",
      },
      {
        key: "email",
        label: "Contact Email",
        type: "email",
        placeholder: "info@sandaltreebysk.com",
      },
      {
        key: "address",
        label: "Full Address",
        type: "textarea",
        placeholder: "123 Venue Street, City, State - PIN",
      },
      {
        key: "hours",
        label: "Business Hours",
        type: "text",
        placeholder: "Monday to Sunday: 9 AM – 9 PM",
      },
      {
        key: "instagram",
        label: "Instagram Handle",
        type: "text",
        placeholder: "@sandaltreebysk",
      },
      {
        key: "maps_url",
        label: "Google Maps URL",
        type: "url",
        placeholder: "https://maps.app.goo.gl/...",
        hint: "The shareable Google Maps link for your venue",
      },
    ],
  },
  {
    key: "venue_highlights",
    label: "Venue Highlights",
    description: "The 6 feature cards on the homepage highlights section.",
    previewHref: "/",
    fields: [
      { key: "h1_title", label: "Highlight 1 — Title", type: "text", placeholder: "Large Capacity" },
      { key: "h1_desc", label: "Highlight 1 — Description", type: "textarea", placeholder: "Accommodate up to 1000+ guests..." },
      { key: "h2_title", label: "Highlight 2 — Title", type: "text", placeholder: "Ample Parking" },
      { key: "h2_desc", label: "Highlight 2 — Description", type: "textarea", placeholder: "Dedicated parking space..." },
      { key: "h3_title", label: "Highlight 3 — Title", type: "text", placeholder: "Catering Support" },
      { key: "h3_desc", label: "Highlight 3 — Description", type: "textarea", placeholder: "In-house and external caterers..." },
      { key: "h4_title", label: "Highlight 4 — Title", type: "text", placeholder: "Decoration Support" },
      { key: "h4_desc", label: "Highlight 4 — Description", type: "textarea", placeholder: "Tie-up with premium decorators..." },
      { key: "h5_title", label: "Highlight 5 — Title", type: "text", placeholder: "Air Conditioned" },
      { key: "h5_desc", label: "Highlight 5 — Description", type: "textarea", placeholder: "Fully climate-controlled..." },
      { key: "h6_title", label: "Highlight 6 — Title", type: "text", placeholder: "Prime Location" },
      { key: "h6_desc", label: "Highlight 6 — Description", type: "textarea", placeholder: "Easily accessible..." },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Text shown in the website footer.",
    fields: [
      {
        key: "tagline",
        label: "Brand Tagline",
        type: "textarea",
        placeholder: "A premier luxury banquet hall crafted for life's most cherished celebrations.",
      },
      {
        key: "copyright",
        label: "Copyright Line",
        type: "text",
        placeholder: "© 2024 Sandal Tree by SK. All rights reserved.",
      },
    ],
  },
];

interface AdminContentProps {
  initialContent: Record<string, unknown>;
}

export function AdminContent({ initialContent }: AdminContentProps) {
  const [content, setContent] = useState<Record<string, Record<string, string>>>(
    () => {
      const parsed: Record<string, Record<string, string>> = {};
      Object.entries(initialContent).forEach(([key, val]) => {
        parsed[key] = val as Record<string, string>;
      });
      return parsed;
    }
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>("contact");
  const supabase = createClient();

  const handleChange = (sectionKey: string, fieldKey: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [sectionKey]: { ...(prev[sectionKey] || {}), [fieldKey]: value },
    }));
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    try {
      const { error } = await supabase
        .from("site_content")
        .upsert(
          [{
            section_key: sectionKey,
            content_json: content[sectionKey] || {},
            updated_at: new Date().toISOString(),
          }],
          { onConflict: "section_key" }
        );

      if (error) throw error;
      setSaved(sectionKey);
      setTimeout(() => setSaved(null), 2500);
      toast({ title: "Content saved", description: "Changes will appear on the website." });
    } catch {
      toast({ title: "Failed to save", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 bg-primary/8 border border-primary/20 rounded-lg mb-6">
        <Info size={15} className="text-primary mt-0.5 shrink-0" aria-hidden />
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          Changes saved here update the website content. After saving, refresh the
          public page to see the changes take effect.
        </p>
      </div>

      {contentSections.map((section) => {
        const isOpen = expanded === section.key;
        const isSaving = saving === section.key;
        const isSaved = saved === section.key;

        return (
          <div key={section.key} className="card-luxury overflow-hidden">
            {/* Section header */}
            <button
              onClick={() => setExpanded(isOpen ? null : section.key)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-secondary/30 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-lg font-medium">{section.label}</h2>
                    {isSaved && (
                      <span className="inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-green-600 dark:text-green-400">
                        <Check size={11} /> Saved
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                {section.previewHref && (
                  <Link
                    href={section.previewHref}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex items-center gap-1 font-sans text-[10px] tracking-widest uppercase text-primary hover:underline"
                  >
                    <Eye size={11} />
                    Preview
                  </Link>
                )}
                {isOpen
                  ? <ChevronUp size={16} className="text-muted-foreground" />
                  : <ChevronDown size={16} className="text-muted-foreground" />
                }
              </div>
            </button>

            {/* Fields */}
            {isOpen && (
              <div className="px-6 pb-6 border-t border-border">
                <div className="pt-5 space-y-5">
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground font-medium">
                          {field.label}
                        </label>
                        {field.hint && (
                          <span className="font-sans text-[10px] text-muted-foreground/60 italic">
                            {field.hint}
                          </span>
                        )}
                      </div>

                      {field.type === "textarea" ? (
                        <textarea
                          value={content[section.key]?.[field.key] || ""}
                          onChange={(e) => handleChange(section.key, field.key, e.target.value)}
                          rows={3}
                          placeholder={field.placeholder}
                          className="w-full border border-input bg-transparent px-4 py-3 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring resize-y min-h-[80px] rounded-sm transition-colors"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={content[section.key]?.[field.key] || ""}
                          onChange={(e) => handleChange(section.key, field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring rounded-sm transition-colors"
                        />
                      )}
                    </div>
                  ))}

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => handleSave(section.key)}
                      disabled={isSaving}
                      className={cn(
                        "inline-flex items-center gap-2 px-6 py-2.5 font-sans text-xs font-semibold tracking-widest uppercase rounded transition-all",
                        isSaved
                          ? "bg-green-600 text-white"
                          : "bg-primary text-primary-foreground hover:bg-primary/90",
                        isSaving && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      {isSaving ? (
                        <><Loader2 size={12} className="animate-spin" /> Saving...</>
                      ) : isSaved ? (
                        <><Check size={12} /> Saved!</>
                      ) : (
                        <><Check size={12} /> Save Changes</>
                      )}
                    </button>
                    {section.previewHref && (
                      <Link
                        href={section.previewHref}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 font-sans text-xs text-primary hover:underline"
                      >
                        <Eye size={12} /> View on website
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
