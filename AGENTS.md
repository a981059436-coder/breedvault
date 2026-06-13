# PawPort — Multi-Breed Pet Health Tracking Platform

## Project Overview
PawPort is a web app that helps dog and cat owners track breed-specific health conditions, log daily care, and manage breeding records.

## Tech Stack
- **Frontend**: Next.js 16 (App Router) + TailwindCSS
- **Database**: Supabase (PostgreSQL) — project `ysbivovfehxqccvbjgbv.supabase.co`
- **Deployment**: Vercel — domain `pawport.uk`
- **Payments**: PayPal link `paypal.me/Ligb18`
- **Auth**: Supabase Auth (email/password)

## Environment Variables (in Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://ysbivovfehxqccvbjgbv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_znnJV108w3fxcDnMIqJTmA_ykXypPQs
NEXT_SKIP_TYPE_CHECK=true
```

## Key Files
| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Landing page (15 breed cards) |
| `src/app/breeds/[slug]/page.tsx` | Breed detail (hardcoded data for 10 breeds, DB for 5) |
| `src/app/dashboard/page.tsx` | Dashboard / My Pets |
| `src/app/dashboard/new-pet/page.tsx` | Add pet form |
| `src/app/dashboard/pets/[id]/page.tsx` | Pet detail + health tracking + breeding |
| `src/app/dashboard/pets/[id]/passport/page.tsx` | Pet snapshot with photo upload |
| `src/app/login/page.tsx` | Sign in/up |
| `src/app/pricing/page.tsx` | Pricing page with PayPal |
| `src/lib/supabase.ts` | Supabase client (keys hardcoded) |

## Database Tables (Supabase)
- `breeds` — breed info (15 breeds)
- `conditions` — health condition library
- `breed_conditions` — breed-to-condition mapping
- `breed_checklists` — daily care items per breed
- `breed_growth_curves` — weight percentiles
- `vaccination_schedules` — vaccine schedules
- `pets` — user's pets
- `health_entries` — health tracking entries
- `friendships` — friend connections (just created)
- `post_likes` — likes on health entries (just created)

## Build & Deploy
```bash
npm run build
npx vercel --yes --prod
```
(vercel CLI is already logged in on this machine)

## Login Credentials
Email: a981059436@gmail.com
Password: BreedVault2026!

## Active Features
✅ 15 breed profiles with health conditions & checklists
✅ User registration/login
✅ Add pets with breed/sex/birth date/weight
✅ Health tracking: weight, vet visits, vaccines, medication, symptoms, BOAS score, resting RR, notes
✅ Breeding tracker for female pets
✅ Pet snapshots with photo upload
✅ PayPal upgrade button ($4.99/mo)
✅ PawPort branding

## Pending Tasks
🔲 Community/Friends feature — tables created, need UI
🔲 Add more breed data for remaining 10 breeds
🔲 Stripe subscription integration
🔲 SEO optimization
🔲 Reddit/ProductHunt marketing

## Notes
- All pages use "use client" + dynamic import for Supabase to avoid build-time DB calls
- Breed data is hardcoded inline for 10 breeds (builds without DB dependency)
- Only 5 original breeds have data in Supabase; 10 new breeds use inline data
- The `passport` page was renamed to "Snapshot" — labels updated, features changed
- Photo upload uses Supabase Storage bucket `photos` (needs to be created)
