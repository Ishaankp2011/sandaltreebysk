# Supabase Setup Instructions

## Step 1: Run SQL Scripts in Order

Go to your Supabase Dashboard > SQL Editor and run these scripts in order:

1. **01_schema.sql** - Creates profiles table and auth trigger
2. **02_products.sql** - Creates products table with RLS policies
3. **03_storage.sql** - Creates product-images storage bucket
4. **04_seed_products.sql** - Seeds initial product data
5. **05_create_admin.sql** - Helper functions for admin setup

## Step 2: Create Admin User

1. Go to **Authentication > Users** in Supabase Dashboard
2. Click **Add user** > **Create new user**
3. Fill in:
   - Email: `admin@chaeenmatcha.com` (or your email)
   - Password: Your secure password
   - (Optional) Phone: `+919310781313`
4. Click **Create user**
5. Copy the user's UUID from the table
6. Run this SQL in SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin', username = 'admin'
WHERE id = 'paste-uuid-here';
```

Or use the helper function:
```sql
SELECT make_admin_by_email('admin@chaeenmatcha.com');
```

## Step 3: Verify Setup

1. Check **Table Editor** - you should see `profiles` and `products` tables
2. Check **Storage** - you should see `product-images` bucket
3. Check **Authentication > Users** - your admin user should be listed

## Admin Login

- Go to `/admin` on your website
- Login with your admin email/phone and password
- You'll have full CRUD access to products

## Notes

- Only users with `role = 'admin'` in profiles can access admin panel
- Product images are stored in Supabase Storage
- RLS policies ensure only admins can modify products
- Public users can only view active products
