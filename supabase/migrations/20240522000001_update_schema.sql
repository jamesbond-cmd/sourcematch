-- Update profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS terms_accepted boolean DEFAULT false;

-- Update rfis table
ALTER TABLE rfis 
ADD COLUMN IF NOT EXISTS product_description text,
ADD COLUMN IF NOT EXISTS rfi_confirmed boolean DEFAULT false;
