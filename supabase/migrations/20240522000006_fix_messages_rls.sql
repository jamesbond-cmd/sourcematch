-- Fix RLS policies for messages table
-- Allow authenticated users to insert and view messages for their RFIs

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view messages for their RFIs" ON messages;
DROP POLICY IF EXISTS "Users can insert messages" ON messages;

-- Allow users to view messages for RFIs they created
CREATE POLICY "Users can view messages for their RFIs" 
ON messages FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM rfis 
        WHERE rfis.id = messages.rfi_id 
        AND rfis.created_by = auth.uid()
    )
);

-- Allow authenticated users to insert messages
CREATE POLICY "Users can insert messages" 
ON messages FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
