# Telugu Jobs — AP & Telangana (Next.js + Supabase)

> One-click deploy guide for going live **today**.

## 1) Supabase — run schema + seed
Open Supabase → SQL Editor → paste and run the two files in `supabase/`:
- `schema.sql` (creates `public.jobs` with RLS + policies)
- `seed.sql` (adds 20 sample rows)

## 2) Vercel — env vars
Set these in Project → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` = your `https://*.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key

## 3) Deploy
- Push this folder to GitHub (or upload via web).
- Import the repo in Vercel → Deploy.

## Table used
The app queries **public.jobs** (base table), not a view. No alias imports, all relative paths.

Last generated: 2025-09-04
