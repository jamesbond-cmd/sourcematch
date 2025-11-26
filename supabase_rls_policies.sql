-- RLS Policies for attachments table
-- Run this in your Supabase SQL Editor

-- Enable RLS on attachments table (if not already enabled)
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can insert their own attachments" ON attachments;
DROP POLICY IF EXISTS "Users can view attachments for their RFIs" ON attachments;
DROP POLICY IF EXISTS "Users can delete their own attachments" ON attachments;

-- Allow authenticated users to insert attachments for RFIs they created
CREATE POLICY "Users can insert attachments for their RFIs"
ON attachments
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM rfis
    WHERE rfis.id = rfi_id
    AND rfis.created_by = auth.uid()
  )
);

-- Allow users to view attachments for RFIs they created
CREATE POLICY "Users can view attachments for their RFIs"
ON attachments
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM rfis
    WHERE rfis.id = rfi_id
    AND rfis.created_by = auth.uid()
  )
);

-- Allow users to delete attachments for RFIs they created
CREATE POLICY "Users can delete attachments for their RFIs"
ON attachments
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM rfis
    WHERE rfis.id = rfi_id
    AND rfis.created_by = auth.uid()
  )
);
