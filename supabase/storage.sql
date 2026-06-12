-- =====================================================
-- Supabase Storage Setup for Gallery
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Create the gallery storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: anyone can view images
CREATE POLICY "Public read gallery images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'gallery');

-- Policy: only authenticated users can upload
CREATE POLICY "Authenticated users can upload gallery images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'gallery');

-- Policy: only authenticated users can delete
CREATE POLICY "Authenticated users can delete gallery images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'gallery');

-- Policy: only authenticated users can update
CREATE POLICY "Authenticated users can update gallery images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'gallery');
