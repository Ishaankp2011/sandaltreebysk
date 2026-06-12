"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { GalleryImage, GALLERY_CATEGORIES } from "@/lib/types";
import { Upload, Trash2, Star, StarOff, Loader2, ImagePlus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AdminGalleryProps {
  initialImages: GalleryImage[];
}

export function AdminGallery({ initialImages }: AdminGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Venue");
  const [dragOver, setDragOver] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const filteredImages = filterCategory === "All"
    ? images
    : images.filter((img) => img.category === filterCategory);

  const uploadFiles = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    setUploadProgress([]);

    for (const file of files) {
      setUploadProgress((p) => [...p, `Uploading ${file.name}...`]);
      try {
        if (!file.type.startsWith("image/")) {
          toast({ title: `${file.name} is not an image`, variant: "destructive" });
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          toast({ title: `${file.name} exceeds 10MB limit`, variant: "destructive" });
          continue;
        }

        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);

        const { data: newImage, error: dbError } = await supabase
          .from("gallery_images")
          .insert([{
            image_url: urlData.publicUrl,
            category: selectedCategory,
            featured: false,
          }])
          .select()
          .single();

        if (dbError) throw dbError;
        if (newImage) setImages((prev) => [newImage, ...prev]);
        setUploadProgress((p) => p.map((s) => s.includes(file.name) ? `✓ ${file.name}` : s));
      } catch (err) {
        toast({ title: `Failed to upload ${file.name}`, description: String(err), variant: "destructive" });
        setUploadProgress((p) => p.map((s) => s.includes(file.name) ? `✗ ${file.name}` : s));
      }
    }

    setUploading(false);
    setTimeout(() => setUploadProgress([]), 2000);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast({ title: `${files.length} image${files.length > 1 ? "s" : ""} uploaded` });
  }, [selectedCategory, supabase]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadFiles(Array.from(e.target.files || []));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    uploadFiles(Array.from(e.dataTransfer.files));
  };

  const deleteImage = async (image: GalleryImage) => {
    try {
      // Extract just the filename from the URL path
      const urlParts = image.image_url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }
      await supabase.from("gallery_images").delete().eq("id", image.id);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      setDeleteConfirm(null);
      toast({ title: "Image deleted" });
    } catch {
      toast({ title: "Failed to delete image", variant: "destructive" });
    }
  };

  const toggleFeatured = async (image: GalleryImage) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ featured: !image.featured })
      .eq("id", image.id);

    if (!error) {
      setImages((prev) =>
        prev.map((img) =>
          img.id === image.id ? { ...img, featured: !img.featured } : img
        )
      );
      toast({ title: image.featured ? "Removed from featured" : "Marked as featured" });
    }
  };

  const updateCategory = async (image: GalleryImage, category: string) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ category })
      .eq("id", image.id);

    if (!error) {
      setImages((prev) =>
        prev.map((img) => (img.id === image.id ? { ...img, category } : img))
      );
    }
  };

  return (
    <div className="space-y-6">

      {/* ── Upload Zone ── */}
      <div className="card-luxury p-6">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <h2 className="font-serif text-xl font-light flex-1">Upload Images</h2>
          <div className="flex items-center gap-3">
            <label className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-9 px-3 border border-input bg-background text-sm font-sans focus:outline-none focus:ring-1 focus:ring-ring rounded"
            >
              {GALLERY_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-200",
            dragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-secondary/30",
            uploading && "pointer-events-none opacity-70"
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="sr-only"
            aria-label="Upload gallery images"
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 size={28} className="animate-spin text-primary" aria-hidden />
              <p className="font-sans text-sm text-muted-foreground">Uploading...</p>
              <div className="space-y-1 text-left w-full max-w-xs mx-auto">
                {uploadProgress.map((msg, i) => (
                  <p key={i} className={cn(
                    "font-sans text-xs",
                    msg.startsWith("✓") ? "text-green-500" : msg.startsWith("✗") ? "text-destructive" : "text-muted-foreground"
                  )}>
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <ImagePlus size={22} className="text-primary" aria-hidden />
              </div>
              <div>
                <p className="font-sans text-sm font-medium mb-1">
                  Drop images here or click to browse
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Supports JPG, PNG, WebP · Max 10MB each · Multiple files OK
                </p>
              </div>
              <label
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-primary/90 transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                htmlFor="gallery-upload-btn"
              >
                <Upload size={13} aria-hidden />
                Choose Files
              </label>
              <input
                id="gallery-upload-btn"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInput}
                className="sr-only"
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Filter + Count ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {["All", ...GALLERY_CATEGORIES.filter((c) => c !== "All")].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={cn(
                "px-4 py-1.5 font-sans text-xs font-semibold tracking-widest uppercase rounded-full transition-all",
                filterCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border hover:border-primary text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="font-sans text-xs text-muted-foreground">
          {filteredImages.length} image{filteredImages.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Image Grid ── */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative card-luxury overflow-hidden">
              <div className="relative aspect-square bg-secondary">
                <Image
                  src={image.image_url}
                  alt={`${image.category} gallery image`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300" />

                {/* Action buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleFeatured(image)}
                    className="w-9 h-9 flex items-center justify-center bg-background/90 hover:bg-background rounded-full shadow transition-all hover:scale-110"
                    title={image.featured ? "Remove featured" : "Set as featured"}
                  >
                    {image.featured
                      ? <StarOff size={14} className="text-primary" />
                      : <Star size={14} className="text-muted-foreground" />
                    }
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(image.id)}
                    className="w-9 h-9 flex items-center justify-center bg-background/90 hover:bg-destructive rounded-full shadow transition-all hover:scale-110"
                    title="Delete image"
                  >
                    <Trash2 size={14} className="text-destructive group-hover:text-white" />
                  </button>
                </div>

                {/* Featured badge */}
                {image.featured && (
                  <div className="absolute top-2 left-2 bg-primary px-2 py-0.5 rounded-sm">
                    <span className="font-sans text-[9px] text-primary-foreground tracking-widest uppercase font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Category selector */}
              <div className="p-2">
                <select
                  value={image.category}
                  onChange={(e) => updateCategory(image, e.target.value)}
                  className="w-full text-xs font-sans border border-input bg-background px-2 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  {GALLERY_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Delete confirm overlay */}
              {deleteConfirm === image.id && (
                <div className="absolute inset-0 bg-background/95 flex flex-col items-center justify-center gap-3 p-4 z-10">
                  <p className="font-sans text-xs text-center text-foreground font-medium">
                    Delete this image?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => deleteImage(image)}
                      className="px-3 py-1.5 bg-destructive text-destructive-foreground font-sans text-xs font-semibold rounded hover:bg-destructive/90 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 border border-border font-sans text-xs rounded hover:bg-secondary transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-lg">
          <ImagePlus size={32} className="mx-auto text-muted-foreground mb-3" aria-hidden />
          <p className="font-sans text-sm text-muted-foreground">
            {filterCategory !== "All"
              ? `No images in "${filterCategory}" category yet.`
              : "No images yet. Upload your first image above."}
          </p>
        </div>
      )}
    </div>
  );
}
