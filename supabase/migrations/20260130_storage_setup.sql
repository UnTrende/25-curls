-- Supabase Storage Setup for Hero and Portfolio
-- Created: 2026-01-30

-- 1. Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio', 'portfolio', true),
  ('hero', 'hero', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Enable RLS on objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- PORTFOLIO BUCKET
-- Public Read
CREATE POLICY "Public Access Portfolio" ON storage.objects
  FOR SELECT
  USING ( bucket_id = 'portfolio' );

-- Admin Write (Insert, Update, Delete)
CREATE POLICY "Admin Write Access Portfolio" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'portfolio' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

CREATE POLICY "Admin Update Access Portfolio" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'portfolio' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

CREATE POLICY "Admin Delete Access Portfolio" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'portfolio' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- HERO BUCKET
-- Public Read
CREATE POLICY "Public Access Hero" ON storage.objects
  FOR SELECT
  USING ( bucket_id = 'hero' );

-- Admin Write (Insert, Update, Delete)
CREATE POLICY "Admin Write Access Hero" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'hero' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

CREATE POLICY "Admin Update Access Hero" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'hero' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

CREATE POLICY "Admin Delete Access Hero" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'hero' 
    AND (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
