-- =====================================================
-- Sandal Tree by SK — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  guest_count VARCHAR(10) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policy: only authenticated admins can read/write enquiries
CREATE POLICY "Admin access for enquiries"
  ON enquiries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Index for faster queries
CREATE INDEX idx_enquiries_created_at ON enquiries (created_at DESC);
CREATE INDEX idx_enquiries_status ON enquiries (status);

-- =====================================================
-- GALLERY IMAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'Venue',
  featured BOOLEAN DEFAULT FALSE,
  alt_text VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can READ gallery images
CREATE POLICY "Public read for gallery"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admins can INSERT/UPDATE/DELETE
CREATE POLICY "Admin write for gallery"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_gallery_category ON gallery_images (category);
CREATE INDEX idx_gallery_featured ON gallery_images (featured);

-- =====================================================
-- TESTIMONIALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public can READ testimonials
CREATE POLICY "Public read for testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admins can INSERT/UPDATE/DELETE
CREATE POLICY "Admin write for testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_testimonials_created_at ON testimonials (created_at DESC);

-- =====================================================
-- SITE CONTENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key VARCHAR(100) UNIQUE NOT NULL,
  content_json JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can READ site content
CREATE POLICY "Public read for site_content"
  ON site_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated admins can INSERT/UPDATE/DELETE
CREATE POLICY "Admin write for site_content"
  ON site_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE UNIQUE INDEX idx_site_content_key ON site_content (section_key);

-- =====================================================
-- SEED DEFAULT CONTENT
-- =====================================================
INSERT INTO site_content (section_key, content_json) VALUES
('hero', '{
  "title": "Sandal Tree by SK",
  "subtitle": "Where every celebration becomes a timeless memory. A luxury banquet hall designed for life''s most extraordinary moments.",
  "cta_primary": "Book an Event",
  "cta_secondary": "Explore Gallery"
}'),
('contact', '{
  "phone": "+91 XXXXX XXXXX",
  "email": "info@sandaltreebysk.com",
  "address": "Your Address Here, City, State - PIN",
  "hours": "Monday to Sunday: 9 AM – 9 PM"
}'),
('footer', '{
  "tagline": "A premier luxury banquet hall crafted for life''s most cherished celebrations. Every event, an unforgettable experience.",
  "copyright": "© 2024 Sandal Tree by SK. All rights reserved."
}')
ON CONFLICT (section_key) DO NOTHING;

-- =====================================================
-- SAMPLE TESTIMONIALS (optional)
-- =====================================================
INSERT INTO testimonials (name, rating, review, event_type) VALUES
('Priya & Rohan Sharma', 5, 'Sandal Tree by SK made our wedding day absolutely magical. The decor, the ambience, and the service were all beyond our expectations. Every guest was left in awe.', 'Wedding'),
('Ananya Mehta', 5, 'We hosted our company''s annual event here and it was a seamless experience. Professional staff, beautiful venue, and flawless execution from start to finish.', 'Corporate Event'),
('The Kapoor Family', 5, 'From the moment we walked in for our son''s engagement ceremony, we knew this was the right choice. The hall was breathtaking and the team was incredibly attentive.', 'Engagement')
ON CONFLICT DO NOTHING;
