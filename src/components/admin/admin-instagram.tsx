"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { InstagramPost } from "@/components/home/instagram-section";
import {
  Plus, Trash2, Eye, EyeOff, ExternalLink,
  Instagram, GripVertical, Check, X, Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdminInstagramProps {
  initialPosts: InstagramPost[];
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface FormState {
  image_url: string;
  post_url: string;
  caption: string;
  display_order: number;
}

const emptyForm: FormState = {
  image_url: "",
  post_url: "",
  caption: "",
  display_order: 0,
};

export function AdminInstagram({ initialPosts }: AdminInstagramProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const supabase = createClient();

  // Build a list of all image files in the instagram bucket for easy picking
  const [storageFiles, setStorageFiles] = useState<string[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const loadStorageFiles = async () => {
    setLoadingFiles(true);
    const { data } = await supabase.storage.from("instagram").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (data) {
      setStorageFiles(
        data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map(
            (f) =>
              `${SUPABASE_URL}/storage/v1/object/public/instagram/${f.name}`
          )
      );
    }
    setLoadingFiles(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.image_url || !form.post_url) {
      toast({ title: "Image URL and Post URL are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { data, error } = await supabase
      .from("instagram_posts")
      .insert([{
        image_url: form.image_url,
        post_url: form.post_url,
        caption: form.caption || null,
        display_order: form.display_order || posts.length,
        active: true,
      }])
      .select()
      .single();

    if (error) {
      toast({ title: "Failed to add post", variant: "destructive" });
    } else {
      setPosts((prev) => [...prev, data]);
      setForm(emptyForm);
      setShowForm(false);
      toast({ title: "Post added" });
    }
    setSaving(false);
  };

  const toggleActive = async (post: InstagramPost & { active?: boolean }) => {
    const newActive = !((post as { active?: boolean }).active);
    const { error } = await supabase
      .from("instagram_posts")
      .update({ active: newActive })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, active: newActive } : p))
      );
      toast({ title: newActive ? "Post shown" : "Post hidden" });
    }
  };

  const deletePost = async (id: string) => {
    const { error } = await supabase
      .from("instagram_posts")
      .delete()
      .eq("id", id);
    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setDeleteId(null);
      toast({ title: "Post deleted" });
    }
  };

  return (
    <div className="space-y-6">

      {/* Info card */}
      <div className="card-luxury p-5 bg-primary/5 border-primary/20">
        <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-primary mb-2">
          How to add posts
        </h3>
        <ol className="font-sans text-sm text-muted-foreground space-y-1.5 list-decimal list-inside leading-relaxed">
          <li>Upload your image to <strong>Supabase Storage → instagram bucket</strong></li>
          <li>Copy the public URL (Storage → instagram → click file → Copy URL)</li>
          <li>Get the Instagram post URL from the post (share → copy link)</li>
          <li>Paste both below and click Add Post</li>
        </ol>
      </div>

      {/* Add button */}
      <div className="flex gap-3">
        <button
          onClick={() => { setShowForm(!showForm); loadStorageFiles(); }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors"
        >
          <Plus size={13} /> Add Post
        </button>
        <a
          href="https://instagram.com/sandaltreebysk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-border font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-secondary transition-colors text-muted-foreground"
        >
          <Instagram size={13} /> View Profile
        </a>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="card-luxury p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-serif text-xl font-light">New Instagram Post</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleAdd} className="space-y-4">

            {/* Pick from storage */}
            {storageFiles.length > 0 && (
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Pick from Storage
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
                  {storageFiles.map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image_url: url }))}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded border-2 transition-all",
                        form.image_url === url
                          ? "border-primary scale-[1.04]"
                          : "border-transparent hover:border-primary/50"
                      )}
                    >
                      <Image
                        src={url}
                        alt="Storage image"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                      {form.image_url === url && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loadingFiles && (
              <p className="font-sans text-xs text-muted-foreground flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" /> Loading storage files...
              </p>
            )}

            {/* Manual URL input */}
            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                Image URL * <span className="normal-case tracking-normal">(from Supabase Storage)</span>
              </label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="https://mqmhczmkwwsucdkvbazb.supabase.co/storage/v1/object/public/instagram/..."
                required
                className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                Instagram Post URL *
              </label>
              <input
                type="url"
                value={form.post_url}
                onChange={(e) => setForm((f) => ({ ...f, post_url: e.target.value }))}
                placeholder="https://www.instagram.com/p/ABC123DEF456/"
                required
                className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                  Caption <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm((f) => ({ ...f, caption: e.target.value }))}
                  placeholder="Beautiful wedding setup..."
                  className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-muted-foreground mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm((f) => ({ ...f, display_order: parseInt(e.target.value) || 0 }))}
                  min={0}
                  className="w-full h-10 border border-input bg-transparent px-4 text-sm font-sans rounded focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            {/* Preview */}
            {form.image_url && (
              <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded">
                <div className="relative w-16 h-16 overflow-hidden rounded flex-shrink-0">
                  <Image
                    src={form.image_url}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-xs text-muted-foreground truncate">
                    {form.post_url || "No post URL yet"}
                  </p>
                  {form.caption && (
                    <p className="font-sans text-sm mt-0.5 truncate">{form.caption}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-primary/90 disabled:opacity-60 transition-colors"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                {saving ? "Adding..." : "Add Post"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyForm); }}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-border font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts list */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post) => {
            const p = post as InstagramPost & { active?: boolean };
            return (
              <div key={post.id} className="card-luxury overflow-hidden group relative">
                <div className="relative aspect-square bg-secondary">
                  <Image
                    src={post.image_url}
                    alt={post.caption || "Instagram post"}
                    fill
                    className={cn(
                      "object-cover transition-all duration-300",
                      !p.active && "opacity-40 grayscale"
                    )}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />

                  {/* Overlay actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 flex items-center justify-center bg-background/90 hover:bg-background rounded-full transition-all"
                      title="View on Instagram"
                    >
                      <ExternalLink size={13} />
                    </a>
                    <button
                      onClick={() => toggleActive(p)}
                      className="w-8 h-8 flex items-center justify-center bg-background/90 hover:bg-background rounded-full transition-all"
                      title={p.active ? "Hide post" : "Show post"}
                    >
                      {p.active
                        ? <Eye size={13} className="text-primary" />
                        : <EyeOff size={13} className="text-muted-foreground" />
                      }
                    </button>
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="w-8 h-8 flex items-center justify-center bg-background/90 hover:bg-destructive/10 rounded-full transition-all"
                      title="Delete post"
                    >
                      <Trash2 size={13} className="text-destructive" />
                    </button>
                  </div>

                  {/* Hidden badge */}
                  {!p.active && (
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded-sm">
                      <span className="font-sans text-[9px] text-white tracking-widest uppercase">Hidden</span>
                    </div>
                  )}

                  {/* Order badge */}
                  <div className="absolute top-2 right-2 bg-background/80 px-1.5 py-0.5 rounded-sm">
                    <span className="font-sans text-[9px] text-foreground tracking-wider">
                      #{post.display_order}
                    </span>
                  </div>
                </div>

                {post.caption && (
                  <div className="p-2.5">
                    <p className="font-sans text-xs text-muted-foreground truncate">
                      {post.caption}
                    </p>
                  </div>
                )}

                {/* Delete confirm */}
                {deleteId === post.id && (
                  <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center gap-3 p-4 z-10 rounded">
                    <p className="font-sans text-xs text-center font-medium">Delete this post?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deletePost(post.id)}
                        className="px-3 py-1.5 bg-destructive text-destructive-foreground font-sans text-xs font-semibold rounded hover:bg-destructive/90 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="px-3 py-1.5 border border-border font-sans text-xs rounded hover:bg-secondary transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
          <Instagram size={28} className="mx-auto text-muted-foreground mb-3" />
          <p className="font-sans text-sm text-muted-foreground">
            No Instagram posts added yet. Click &ldquo;Add Post&rdquo; above to get started.
          </p>
        </div>
      )}
    </div>
  );
}
