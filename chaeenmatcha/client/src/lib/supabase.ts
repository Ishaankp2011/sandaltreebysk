import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
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

export type InsertProduct = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type UpdateProduct = Partial<InsertProduct>;
