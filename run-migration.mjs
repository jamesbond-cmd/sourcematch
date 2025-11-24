import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = 'https://ospcvzqbzrjrtgkhmrfr.supabase.co'
const supabaseKey = 'sb_publishable_isxX-87NPwgEIpTCzRbXog_IsnlK-mM'

const supabase = createClient(supabaseUrl, supabaseKey)

const migrationSQL = `
-- Create profiles table (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  role text check (role in ('buyer', 'admin', 'agent')) default 'buyer',
  company_id uuid,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companies table
create table if not exists companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  website text,
  country text,
  industry text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add foreign key to profiles after companies table is created
do $$ 
begin
  if not exists (
    select 1 from information_schema.table_constraints 
    where constraint_name = 'profiles_company_id_fkey'
  ) then
    alter table profiles add constraint profiles_company_id_fkey 
      foreign key (company_id) references companies(id) on delete set null;
  end if;
end $$;

-- Create RFIs table
create table if not exists rfis (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references companies(id) on delete set null,
  created_by uuid references profiles(id) on delete set null,
  status text check (status in ('draft', 'submitted', 'in_review', 'sent_to_suppliers', 'closed')) default 'draft',
  product_name text not null,
  requirements text not null,
  estimated_volume text not null,
  target_price text not null,
  timeline text not null,
  destination_markets text[] not null,
  volume_unit text,
  guidance_price text,
  product_description text,
  ai_status text check (ai_status in ('checked', 'needs_clarification', 'pending')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create attachments table
create table if not exists attachments (
  id uuid default gen_random_uuid() primary key,
  rfi_id uuid references rfis(id) on delete cascade not null,
  file_name text not null,
  file_path text not null,
  file_size integer not null,
  file_type text not null,
  file_url text not null,
  uploaded_by uuid references profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  rfi_id uuid references rfis(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete set null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table companies enable row level security;
alter table rfis enable row level security;
alter table attachments enable row level security;
alter table messages enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Users can insert own profile" on profiles;
drop policy if exists "Companies are viewable by authenticated users" on companies;
drop policy if exists "Users can insert companies" on companies;
drop policy if exists "Users can view own RFIs" on rfis;
drop policy if exists "Users can insert own RFIs" on rfis;
drop policy if exists "Users can update own RFIs" on rfis;
drop policy if exists "Users can view attachments for their RFIs" on attachments;
drop policy if exists "Users can insert attachments for their RFIs" on attachments;
drop policy if exists "Users can view messages for their RFIs" on messages;
drop policy if exists "Users can insert messages for their RFIs" on messages;

-- Profiles policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Companies policies
create policy "Companies are viewable by authenticated users" on companies
  for select using (auth.role() = 'authenticated');

create policy "Users can insert companies" on companies
  for insert with check (auth.role() = 'authenticated');

-- RFIs policies
create policy "Users can view own RFIs" on rfis
  for select using (auth.uid() = created_by);

create policy "Users can insert own RFIs" on rfis
  for insert with check (auth.uid() = created_by);

create policy "Users can update own RFIs" on rfis
  for update using (auth.uid() = created_by);

-- Attachments policies
create policy "Users can view attachments for their RFIs" on attachments
  for select using (
    exists (
      select 1 from rfis
      where rfis.id = attachments.rfi_id
      and rfis.created_by = auth.uid()
    )
  );

create policy "Users can insert attachments for their RFIs" on attachments
  for insert with check (
    exists (
      select 1 from rfis
      where rfis.id = attachments.rfi_id
      and rfis.created_by = auth.uid()
    )
  );

-- Messages policies
create policy "Users can view messages for their RFIs" on messages
  for select using (
    exists (
      select 1 from rfis
      where rfis.id = messages.rfi_id
      and rfis.created_by = auth.uid()
    )
  );

create policy "Users can insert messages for their RFIs" on messages
  for insert with check (
    exists (
      select 1 from rfis
      where rfis.id = messages.rfi_id
      and rfis.created_by = auth.uid()
    )
  );
`

console.log('🚀 Applying Supabase migration...')
console.log('Note: This requires a service role key with admin privileges.')
console.log('The publishable key you provided may not have sufficient permissions.')
console.log('')
console.log('Please run this migration manually in the Supabase SQL Editor:')
console.log('1. Go to https://supabase.com/dashboard/project/ospcvzqbzrjrtgkhmrfr/sql/new')
console.log('2. Copy the SQL from: supabase/migrations/20240522000000_initial_schema.sql')
console.log('3. Paste and run it in the SQL editor')
console.log('')
console.log('Or use the Supabase CLI:')
console.log('  npx supabase db push')
