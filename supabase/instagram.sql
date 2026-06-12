-- =====================================================
-- Instagram Posts — Supabase Setup
-- Run this in your Supabase SQL Editor
-- =====================================================

-- 1. Create the instagram_posts table
CREATE TABLE IF NOT EXISTS instagram_posts (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url    TEXT NOT NULL,          -- public URL from Supabase storage
  post_url     TEXT NOT NULL,          -- full Instagram post URL e.g. https://www.instagram.com/p/ABC123/
  caption      TEXT,                   -- optional short caption / alt text
  display_order INT DEFAULT 0,         -- controls left-to-right order in the grid
  active       BOOLEAN DEFAULT TRUE,   -- toggle visibility without deleting
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Public can read active posts
CREATE POLICY "Public read instagram_posts"
  ON instagram_posts FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Only authenticated admin can insert / update / delete
CREATE POLICY "Admin write instagram_posts"
  ON instagram_posts FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- 3. Index for ordering
CREATE INDEX idx_instagram_posts_order ON instagram_posts (display_order ASC);

-- =====================================================
-- Storage bucket for Instagram preview images
-- =====================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('instagram', 'instagram', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view images
CREATE POLICY "Public read instagram images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'instagram');

-- Only authenticated admins can upload/delete
CREATE POLICY "Admin upload instagram images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'instagram');

CREATE POLICY "Admin delete instagram images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'instagram');

-- =====================================================
-- HOW TO ADD YOUR POSTS (do this after uploading images):
--
-- 1. Upload image to Supabase Storage → instagram bucket
-- 2. Copy the public URL (Storage → instagram → click file → Copy URL)
-- 3. Run an INSERT like this for each post:
--
-- INSERT INTO instagram_posts (image_url, post_url, caption, display_order) VALUES
-- (
--   'https://mqmhczmkwwsucdkvbazb.supabase.co/storage/v1/object/public/instagram/post1.jpg',
--   'https://www.instagram.com/p/YOUR_POST_ID/',
--   'Beautiful wedding at Sandal Tree by SK',
--   1
-- );
-- =====================================================
