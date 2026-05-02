-- 1. Job application: dedicated columns
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS profile text,
  ADD COLUMN IF NOT EXISTS contact_preference text,
  ADD COLUMN IF NOT EXISTS privacy_consent boolean NOT NULL DEFAULT false;

-- 2. Storage: drop overly broad / duplicate policies
DROP POLICY IF EXISTS "Anyone can upload CVs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read CVs" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read contact attachments" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload contact attachments" ON storage.objects;

-- 3. Strict insert policy for contact attachments (extension whitelist, no zip)
CREATE POLICY "Anyone can upload contact attachments"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'contact-attachments'
  AND storage.extension(name) = ANY (ARRAY['pdf','doc','docx','jpg','jpeg','png','dwg'])
);

-- 4. Admin-only read for contact attachments
CREATE POLICY "Admins can read contact attachments"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- 5. Admin-only delete for contact attachments
CREATE POLICY "Admins can delete contact attachments"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'contact-attachments'
  AND has_role(auth.uid(), 'admin'::app_role)
);
