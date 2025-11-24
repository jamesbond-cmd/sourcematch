-- Fix profiles table schema to match trigger expectations
-- Add missing columns and update existing ones

-- Add email column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='email') THEN
        ALTER TABLE profiles ADD COLUMN email text;
    END IF;
END $$;

-- Add full_name column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='full_name') THEN
        ALTER TABLE profiles ADD COLUMN full_name text;
    END IF;
END $$;

-- Add company_id column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='profiles' AND column_name='company_id') THEN
        ALTER TABLE profiles ADD COLUMN company_id uuid references companies(id) on delete set null;
    END IF;
END $$;

-- Migrate data from first_name/last_name to full_name if needed
UPDATE profiles 
SET full_name = CONCAT_WS(' ', first_name, last_name)
WHERE full_name IS NULL AND (first_name IS NOT NULL OR last_name IS NOT NULL);

-- Drop old columns (optional - commented out for safety)
-- ALTER TABLE profiles DROP COLUMN IF EXISTS first_name;
-- ALTER TABLE profiles DROP COLUMN IF EXISTS last_name;
