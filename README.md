# PawPort — Multi-Breed Health Management Platform

PawPort helps dog and cat owners track breed-specific health conditions, 
manage breeding records, and stay on top of vaccinations and daily care.

## Quick Start

```bash
# 1. Create a Supabase project at https://supabase.com (free tier)

# 2. Deploy the database schema
supabase link --project-ref <your-project-ref>
supabase db push

# 3. Seed breed data
export SUPABASE_URL="https://xxxxx.supabase.co"
export SUPABASE_SERVICE_KEY="eyJhbG..."  # service_role key from Supabase dashboard
pip install supabase
python supabase/seed/seed.py
```

## Data Layer

| File | Description | Rows |
|------|-------------|------|
| `migrations/001_init.sql` | Full database schema | — |
| `seed/breeds.json` | 5 breeds (3 dogs + 2 cats) | 5 |
| `seed/conditions.json` | 26 genetic/hereditary conditions | 26 |
| `seed/breed_conditions.json` | Breed-disease mapping with prevalence rates | 35 |
| `seed/breed_checklists.json` | Daily/weekly/monthly care items per breed | 47 |
| `seed/vaccination_schedules.json` | Core + non-core vaccines (dog + cat) | 9 |
| `seed/growth_curves.json` | Weight percentiles by breed/sex/age | 49 |

## Tech Stack

- **Database**: Supabase (PostgreSQL)
- **Frontend**: TBD (Next.js + TailwindCSS recommended)
- **Deployment**: Vercel
- **Payments**: Stripe

## Adding a New Breed

1. Add entry to `seed/breeds.json`
2. Add condition mappings to `seed/breed_conditions.json`
3. Add checklist items to `seed/breed_checklists.json`
4. Add growth curve data to `seed/growth_curves.json`
5. Re-run `python supabase/seed/seed.py`
