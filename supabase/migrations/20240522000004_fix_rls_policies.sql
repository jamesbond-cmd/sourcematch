-- Fix RLS policies for companies table
-- Allow authenticated users to insert and update companies

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Companies are viewable by authenticated users" ON companies;
DROP POLICY IF EXISTS "Users can insert companies" ON companies;
DROP POLICY IF EXISTS "Users can update their own companies" ON companies;

-- Allow authenticated users to view companies
CREATE POLICY "Companies are viewable by authenticated users" 
ON companies FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert companies
CREATE POLICY "Users can insert companies" 
ON companies FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update companies (you might want to restrict this further)
CREATE POLICY "Users can update their own companies" 
ON companies FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Fix RLS policies for profiles table
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);
