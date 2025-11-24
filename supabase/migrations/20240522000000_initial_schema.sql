-- Create profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  role text check (role in ('buyer', 'admin', 'agent')) default 'buyer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companies table
create table companies (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  website text,
  country text,
  size text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create RFIs table
create table rfis (
  id uuid default gen_random_uuid() primary key,
  company_id uuid references companies(id) on delete set null,
  created_by uuid references profiles(id) on delete set null,
  status text check (status in ('draft', 'submitted', 'in_review', 'sent_to_suppliers', 'closed')) default 'draft',
  product_name text,
  requirements text,
  estimated_volume text,
  volume_unit text,
  destination_markets text[],
  guidance_price text,
  annual_volume text,
  timeline text,
  ai_status text check (ai_status in ('checked', 'needs_clarification', 'pending')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create attachments table
create table attachments (
  id uuid default gen_random_uuid() primary key,
  rfi_id uuid references rfis(id) on delete cascade,
  file_url text not null,
  file_type text, -- 'spec', 'nda', 'label_example', 'other'
  file_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create agent assignments table
create table agent_assignments (
  id uuid default gen_random_uuid() primary key,
  rfi_id uuid references rfis(id) on delete cascade,
  agent_id uuid references profiles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create messages table
create table messages (
  id uuid default gen_random_uuid() primary key,
  rfi_id uuid references rfis(id) on delete cascade,
  sender_id uuid references profiles(id) on delete set null,
  text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table companies enable row level security;
alter table rfis enable row level security;
alter table attachments enable row level security;
alter table agent_assignments enable row level security;
alter table messages enable row level security;

-- Create policies (simplified for prototype)
-- Profiles: Users can read their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

-- Companies: Readable by authenticated users
create policy "Companies are viewable by authenticated users" on companies
  for select using (auth.role() = 'authenticated');

-- RFIs: Users can view their own RFIs
create policy "Users can view own RFIs" on rfis
  for select using (auth.uid() = created_by);

-- RFIs: Users can insert their own RFIs
create policy "Users can insert own RFIs" on rfis
  for insert with check (auth.uid() = created_by);

-- RFIs: Users can update their own RFIs
create policy "Users can update own RFIs" on rfis
  for update using (auth.uid() = created_by);
