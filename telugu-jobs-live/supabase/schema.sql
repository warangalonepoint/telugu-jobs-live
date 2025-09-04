-- Creates jobs table with clean constraints and policies
create extension if not exists pg_trgm;
create extension if not exists pgcrypto;

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employer_id uuid,
  title text not null,
  company text,
  location text,
  district text,
  state text,
  category text,
  job_type text check (job_type in ('FULL_TIME','PART_TIME','CONTRACT')) default 'FULL_TIME',
  salary_min integer,
  salary_max integer,
  salary_currency text default 'INR',
  description text,
  source text,
  external_url text,
  expires_at date,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  search tsvector generated always as (
    setweight(to_tsvector('simple', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('simple', coalesce(company,'')), 'B') ||
    setweight(to_tsvector('simple', coalesce(location,'')), 'C')
  ) stored
);

-- Indexes
create index if not exists idx_jobs_created_at on public.jobs (created_at desc);
create index if not exists idx_jobs_state_district on public.jobs (state, district);
create index if not exists idx_jobs_search on public.jobs using gin (search);

-- RLS
alter table public.jobs enable row level security;

drop policy if exists jobs_public_read on public.jobs;
create policy jobs_public_read on public.jobs for select to anon
using (is_active = true and (expires_at is null or expires_at >= current_date));

-- Optional: allow inserts from site while testing
drop policy if exists jobs_public_insert on public.jobs;
create policy jobs_public_insert on public.jobs for insert to anon with check (true);

-- Trigger to auto-update updated_at
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end; $$ language plpgsql;

drop trigger if exists trg_touch_updated_at on public.jobs;
create trigger trg_touch_updated_at before update on public.jobs
for each row execute function public.touch_updated_at();
