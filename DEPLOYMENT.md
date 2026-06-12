# Sandal Tree by SK — Deployment Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Resend account (free tier for 100 emails/day)
- A Vercel account (recommended for deployment)

---

## 1. Install Node.js

Download from: https://nodejs.org/en/download  
Choose the LTS version. After installing, verify:

```bash
node --version
npm --version
```

---

## 2. Install Dependencies

```bash
cd sandaltreebysk
npm install
```

---

## 3. Set Up Supabase

1. Go to https://supabase.com and create a new project
2. Once created, go to **Settings → API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### Run Database Schema

1. In Supabase, go to **SQL Editor**
2. Copy and run the contents of `supabase/schema.sql`
3. Then copy and run `supabase/storage.sql`

### Create Admin User

1. Go to **Authentication → Users**
2. Click **Add user**
3. Enter your email and password
4. This account will be used to log into `/admin`

---

## 4. Set Up Resend

1. Go to https://resend.com and create an account
2. Go to **API Keys** and create a new key
3. Copy the key → `RESEND_API_KEY`
4. Add and verify your sending domain (or use `onboarding@resend.dev` for testing)
5. Set `FROM_EMAIL` to your verified email/domain

---

## 5. Configure Environment Variables

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

RESEND_API_KEY=re_xxxxxxxxxxxx

OWNER_EMAIL=your@email.com
FROM_EMAIL=noreply@yourdomain.com

NEXT_PUBLIC_SITE_URL=https://sandaltreebysk.com
```

---

## 6. Update Google Maps Embed

In `src/components/home/location-section.tsx` and `src/app/(public)/contact/page.tsx`, replace the placeholder map URL with your actual Google Maps embed URL:

1. Go to https://maps.google.com
2. Search for your venue location
3. Click **Share → Embed a map**
4. Copy the `src` URL from the iframe code
5. Replace the `mapSrc` variable in both files

---

## 7. Update Contact Information

Replace all instances of:
- `+91 XXXXX XXXXX` with your actual phone number
- `info@sandaltreebysk.com` with your actual email

Files to update:
- `src/components/layout/footer.tsx`
- `src/app/(public)/contact/page.tsx`

---

## 8. Run Locally

```bash
npm run dev
```

Visit http://localhost:3000

**Admin Panel:** http://localhost:3000/admin  
Login with the Supabase user you created.

---

## 9. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

### Option B: GitHub + Vercel

1. Push your code to GitHub
2. Go to https://vercel.com → **New Project**
3. Import your GitHub repository
4. Add all environment variables from `.env.local`
5. Deploy

### Post-Deployment

1. Update `NEXT_PUBLIC_SITE_URL` to your actual domain
2. Configure your custom domain in Vercel settings
3. Verify Resend domain for email deliverability

---

## 10. Post-Launch Checklist

- [ ] Replace all placeholder phone numbers
- [ ] Replace all placeholder emails
- [ ] Update Google Maps embed URLs to actual venue location
- [ ] Add real venue images to the gallery via admin panel
- [ ] Add real testimonials via admin panel
- [ ] Test booking form end-to-end
- [ ] Verify emails are delivered (check spam folder)
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target 90+)
- [ ] Add your `og-image.jpg` to the `/public` folder (1200×630px)
- [ ] Update favicon (replace `/public/favicon.ico`)

---

## File Structure

```
sandaltreebysk/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages with Navbar + Footer
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   ├── contact/
│   │   │   ├── privacy-policy/
│   │   │   └── terms/
│   │   ├── admin/             # Admin panel (auth protected)
│   │   │   ├── login/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── enquiries/
│   │   │   ├── gallery/
│   │   │   ├── testimonials/
│   │   │   └── content/
│   │   ├── api/
│   │   │   └── enquiry/       # POST /api/enquiry
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, ThemeToggle
│   │   ├── home/              # All home page sections
│   │   ├── gallery/           # Gallery with lightbox
│   │   ├── contact/           # Enquiry form
│   │   ├── admin/             # Admin components
│   │   ├── providers/         # Theme provider
│   │   └── ui/                # shadcn UI primitives
│   ├── hooks/
│   ├── lib/
│   │   ├── supabase/          # client, server, admin clients
│   │   ├── types.ts
│   │   ├── validations.ts
│   │   └── utils.ts
│   └── middleware.ts          # Auth protection for /admin
├── supabase/
│   ├── schema.sql             # Run in Supabase SQL Editor
│   └── storage.sql            # Storage bucket setup
├── .env.local                 # Your environment variables
└── DEPLOYMENT.md
```

---

## Troubleshooting

**"Cannot find module" errors:**  
Run `npm install` again.

**Supabase RLS errors:**  
Make sure you've run both SQL files in the correct order.

**Emails not sending:**  
- Check `RESEND_API_KEY` is set correctly
- Verify your `FROM_EMAIL` domain in Resend
- Check Resend dashboard for delivery logs

**Admin login not working:**  
- Ensure the user exists in Supabase Auth
- Check that middleware.ts is in `src/` directory

**Images not loading from Supabase:**  
- Verify the `gallery` bucket is set to **public**
- Check `next.config.ts` has your Supabase hostname
