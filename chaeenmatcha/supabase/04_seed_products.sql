-- =============================================
-- 4. SEED DATA - Products
-- Run this after creating the tables
-- =============================================

INSERT INTO public.products (name, weight, original_price, price, description, benefits, image, category, is_active, sort_order)
VALUES
(
  'CHAEEN MATCHA – Ceremonial Grade A',
  '30g',
  999,
  849,
  'Premium Ceremonial Grade A matcha sourced directly from Shizuoka, Japan. Rich in antioxidants, supports heart health, immunity, and glowing skin. Stone-ground, vibrant green, and smooth umami taste.',
  ARRAY['Rich in Antioxidants', 'Supports Heart Health', 'Boosts Immunity', 'Promotes Glowing Skin'],
  '/attached_assets/image_1765777067758.png',
  'ceremonial',
  true,
  1
),
(
  'CHAEEN MATCHA – Ceremonial Grade A',
  '15g',
  559,
  469,
  'The same premium quality in a smaller pack. Perfect for trying out or gifting. Sourced from Shizuoka, Japan.',
  ARRAY['Rich in Antioxidants', 'Supports Heart Health', 'Boosts Immunity'],
  '/attached_assets/image_1765777067758.png',
  'ceremonial',
  true,
  2
);
