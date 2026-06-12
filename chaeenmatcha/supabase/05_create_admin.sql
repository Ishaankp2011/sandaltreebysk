-- =============================================
-- 5. CREATE ADMIN USER
-- =============================================
-- 
-- IMPORTANT: You need to create the admin user through Supabase Dashboard or Auth API
-- because passwords are handled by Supabase Auth, not stored in profiles table.
--
-- OPTION 1: Use Supabase Dashboard
-- 1. Go to Authentication > Users
-- 2. Click "Add user"
-- 3. Enter email/phone and password
-- 4. After user is created, run the SQL below to set their role to 'admin'
--
-- OPTION 2: Use this SQL after creating user via Dashboard
-- Replace 'USER_ID_HERE' with the actual UUID from auth.users

-- Example: Set a user as admin by their email
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@chaeenmatcha.com');

-- Example: Set a user as admin by their phone
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = (SELECT id FROM auth.users WHERE phone = '+919310781313');

-- Example: Set a user as admin by their UUID
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';

-- =============================================
-- QUICK ADMIN SETUP INSTRUCTIONS:
-- =============================================
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add user" > "Create new user"
-- 3. Fill in:
--    - Email: admin@chaeenmatcha.com (or your email)
--    - Password: Your secure password
--    - Phone (optional): +919310781313
-- 4. Click "Create user"
-- 5. Copy the user's UUID from the table
-- 6. Run this SQL (replace the UUID):
--
--    UPDATE public.profiles
--    SET role = 'admin', username = 'admin'
--    WHERE id = 'paste-uuid-here';
--
-- =============================================

-- Helper function to make a user admin by email (run after user exists)
CREATE OR REPLACE FUNCTION public.make_admin_by_email(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.profiles
  SET role = 'admin'
  WHERE id = (SELECT id FROM auth.users WHERE email = user_email);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT make_admin_by_email('admin@chaeenmatcha.com');
