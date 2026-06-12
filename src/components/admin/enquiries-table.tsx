"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Enquiry } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import {
  Search, Trash2, CheckCircle, Mail, Phone,
  ChevronDown, ChevronUp, MessageSquare, Calendar, Users,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface EnquiriesTableProps {
  initialEnquiries: Enquiry[];
}

const STATUS_CONFIG = {
  new: {
    label: "New",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  contacted: {
    label: "Contacted",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  closed: {
    label: "Closed",
    className: "bg-secondary text-secondary-foreground",
  },
};

export function EnquiriesTable({ initialEnquiries }: EnquiriesTableProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const supabase = createClient();

  const filtered = enquiries.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.event_type.toLowerCase().includes(q);
    const matchFilter = filter === "all" || e.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    closed: enquiries.filter((e) => e.status === "closed").length,
  };

  const updateStatus = async (id: string, status: Enquiry["status"]) => {
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (!error) {
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      toast({ title: `Marked as ${status}` });
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (!error) {
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (expandedId === id) setExpandedId(null);
      toast({ title: "Enquiry deleted" });
    }
  };

  return (
    <div>
      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            type="search"
            placeholder="Search by name, email, phone or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 border border-input bg-transparent text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(["all", "new", "contacted", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                "px-3 py-2 font-sans text-xs font-semibold tracking-widest uppercase rounded transition-all",
                filter === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:border-primary text-muted-foreground"
              )}
            >
              {s} <span className="opacity-60 ml-0.5">({counts[s]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="space-y-2">
        {filtered.map((enquiry) => {
          const status = STATUS_CONFIG[enquiry.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new;
          const isExpanded = expandedId === enquiry.id;

          return (
            <div
              key={enquiry.id}
              className="card-luxury overflow-hidden"
            >
              {/* Row */}
              <div
                className="flex items-start gap-4 p-4 cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : enquiry.id)}
              >
                {/* Status dot */}
                <div className="shrink-0 mt-1">
                  <span
                    className={cn(
                      "inline-block w-2 h-2 rounded-full",
                      enquiry.status === "new"
                        ? "bg-blue-500"
                        : enquiry.status === "contacted"
                          ? "bg-green-500"
                          : "bg-muted-foreground"
                    )}
                  />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-sans text-sm font-semibold">{enquiry.name}</p>
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-sans font-semibold tracking-widest uppercase rounded-sm",
                      status.className
                    )}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground">
                      <MessageSquare size={11} aria-hidden /> {enquiry.event_type}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground">
                      <Calendar size={11} aria-hidden /> {enquiry.event_date}
                    </span>
                    <span className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground">
                      <Users size={11} aria-hidden /> {enquiry.guest_count} guests
                    </span>
                  </div>
                </div>

                {/* Right: time + expand */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <p className="font-sans text-[10px] text-muted-foreground whitespace-nowrap">
                    {formatDateTime(enquiry.created_at)}
                  </p>
                  {isExpanded
                    ? <ChevronUp size={14} className="text-muted-foreground" />
                    : <ChevronDown size={14} className="text-muted-foreground" />
                  }
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-border bg-secondary/20 p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                        Contact
                      </p>
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="flex items-center gap-1.5 font-sans text-sm text-primary hover:underline mb-1"
                      >
                        <Mail size={12} aria-hidden /> {enquiry.email}
                      </a>
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="flex items-center gap-1.5 font-sans text-sm text-primary hover:underline"
                      >
                        <Phone size={12} aria-hidden /> {enquiry.phone}
                      </a>
                    </div>
                    <div>
                      <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-1">
                        Event Details
                      </p>
                      <p className="font-sans text-sm">
                        {enquiry.event_type} &bull; {enquiry.event_date}
                      </p>
                      <p className="font-sans text-sm text-muted-foreground">
                        {enquiry.guest_count} expected guests
                      </p>
                    </div>
                  </div>

                  {enquiry.message && (
                    <div className="mb-4">
                      <p className="font-sans text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                        Message
                      </p>
                      <p className="font-sans text-sm text-foreground/80 leading-relaxed bg-background/50 rounded p-3 border border-border">
                        {enquiry.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {enquiry.status === "new" && (
                      <button
                        onClick={() => updateStatus(enquiry.id, "contacted")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle size={12} /> Mark Contacted
                      </button>
                    )}
                    {enquiry.status === "contacted" && (
                      <button
                        onClick={() => updateStatus(enquiry.id, "closed")}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-secondary text-foreground font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-secondary/80 border border-border transition-colors"
                      >
                        <CheckCircle size={12} /> Mark Closed
                      </button>
                    )}
                    <a
                      href={`mailto:${enquiry.email}?subject=Re: Your Event Enquiry — Sandal Tree by SK`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-primary text-primary font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Mail size={12} /> Reply via Email
                    </a>
                    <button
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-destructive/30 text-destructive font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border rounded-lg">
            <MessageSquare size={28} className="mx-auto text-muted-foreground mb-3" aria-hidden />
            <p className="font-sans text-sm text-muted-foreground">
              {search || filter !== "all"
                ? "No enquiries match your filters."
                : "No enquiries yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
