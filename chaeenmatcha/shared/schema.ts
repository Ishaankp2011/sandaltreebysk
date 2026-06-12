// Shared types - kept for compatibility
// Main types are now in client/src/lib/supabase.ts

export interface Product {
  id: string;
  name: string;
  weight: string;
  original_price: number;
  price: number;
  description: string;
  benefits: string[];
  image: string;
  category: 'ceremonial' | 'culinary' | 'sets';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string | null;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}
