"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Testimonial } from "@/lib/types";
import { Star, Trash2, Edit2, Plus, X, Check, Loader2 } from "lucide-react";
import { EVENT_TYPES } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

interface AdminTestimonialsProps {
  initialTestimonials: Testimonial[];
}

interface TestimonialForm {
  name: string;
  rating: number;
  review: string;
  event_type: string;
}

const defaultForm: TestimonialForm = {
  name: "",
  rating: 5,
  review: "",
  event_type: "Wedding",
};

export function AdminTestimonials({ initialTestimonials }: AdminTestimonialsProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        const { data, error } = await supabase
          .from("testimonials")
          .update(form)
          .eq("id", editingId)
          .select()
          .single();

        if (error) throw error;
        setTestimonials((prev) =>
          prev.map((t) => (t.id === editingId ? data : t))
        );
        toast({ title: "Testimonial updated" });
      } else {
        const { data, error } = await supabase
          .from("testimonials")
          .insert([form])
          .select()
          .single();

        if (error) throw error;
        setTestimonials((prev) => [data, ...prev]);
        toast({ title: "Testimonial added" });
      }

      setShowForm(false);
      setEditingId(null);
      setForm(defaultForm);
    } catch {
      toast({ title: "Failed to save testimonial", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (t: Testimonial) => {
    setForm({ name: t.name, rating: t.rating, review: t.review, event_type: t.event_type });
    setEditingId(t.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (!error) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast({ title: "Testimonial deleted" });
    }
  };

  return (
    <div>
      {/* Add button */}
      <div className="mb-6">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setForm(defaultForm);
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-medium tracking-widest uppercase hover:bg-primary/90 transition-colors"
        >
          <Plus size={13} aria-hidden />
          Add Testimonial
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card-luxury p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-light">
              {editingId ? "Edit Testimonial" : "New Testimonial"}
            </h2>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setForm(defaultForm); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Guest Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="e.g. Priya & Rohan Sharma"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Event Type *
                </label>
                <select
                  value={form.event_type}
                  onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                  className="w-full h-10 border border-input bg-background px-4 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Rating *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, rating: r })}
                    aria-label={`Set rating to ${r}`}
                    aria-pressed={form.rating >= r}
                  >
                    <Star
                      size={22}
                      className={`transition-colors ${form.rating >= r ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                Review *
              </label>
              <textarea
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                required
                rows={4}
                className="w-full border border-input bg-transparent px-4 py-3 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="Guest's review..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-medium tracking-widest uppercase hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                {editingId ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); setForm(defaultForm); }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-border font-sans text-xs font-medium tracking-widest uppercase hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="card-luxury p-6 flex gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-sans text-sm font-medium">{t.name}</p>
                <span className="font-sans text-xs text-muted-foreground px-2 py-0.5 border border-border">
                  {t.event_type}
                </span>
              </div>
              <div className="flex gap-0.5 mb-3" aria-label={`${t.rating} stars`}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <Star
                    key={r}
                    size={13}
                    className={r <= t.rating ? "fill-primary text-primary" : "text-muted-foreground"}
                    aria-hidden
                  />
                ))}
              </div>
              <p className="font-sans text-sm text-muted-foreground italic">
                &ldquo;{t.review}&rdquo;
              </p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => handleEdit(t)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={`Edit ${t.name}'s testimonial`}
              >
                <Edit2 size={15} />
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Delete ${t.name}'s testimonial`}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="text-center py-16 border border-dashed border-border">
            <p className="font-sans text-sm text-muted-foreground">
              No testimonials yet. Add your first testimonial above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
