-- Fix RFIs table schema - rename guidance_price to target_price for consistency
-- and ensure all required columns exist

-- Add target_price column if it doesn't exist (this is what the code expects)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='rfis' AND column_name='target_price') THEN
        ALTER TABLE rfis ADD COLUMN target_price text;
    END IF;
END $$;

-- Migrate data from guidance_price to target_price if needed
UPDATE rfis 
SET target_price = guidance_price
WHERE target_price IS NULL AND guidance_price IS NOT NULL;

-- Optionally drop the old guidance_price column (commented out for safety)
-- ALTER TABLE rfis DROP COLUMN IF EXISTS guidance_price;

-- Ensure product_description exists (should already be there from previous migration)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='rfis' AND column_name='product_description') THEN
        ALTER TABLE rfis ADD COLUMN product_description text;
    END IF;
END $$;

-- Ensure volume_unit exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='rfis' AND column_name='volume_unit') THEN
        ALTER TABLE rfis ADD COLUMN volume_unit text;
    END IF;
END $$;
