# CHAEEN Matcha

Premium ceremonial grade matcha e-commerce website with admin panel.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Auth, Database, Storage)
- **Routing**: Wouter
- **State**: TanStack Query

## Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL scripts in `supabase/` folder in order:
   - `01_schema.sql` - Profiles table
   - `02_products.sql` - Products table with RLS
   - `03_storage.sql` - Product images bucket
   - `04_seed_products.sql` - Initial products
   - `05_create_admin.sql` - Admin setup helper

3. Create admin user in Supabase Dashboard > Authentication > Users
4. Set their role to 'admin' using SQL Editor

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5000`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Admin Panel

- Visit `/admin` to access the admin panel
- Login with your admin credentials
- Manage products, upload images, toggle active status

## Project Structure

```
├── client/src/
│   ├── components/    # UI components
│   ├── lib/           # Supabase client, API functions
│   └── pages/         # Route pages
├── server/            # Express server (dev only)
├── supabase/          # SQL setup scripts
└── attached_assets/   # Static images
```
