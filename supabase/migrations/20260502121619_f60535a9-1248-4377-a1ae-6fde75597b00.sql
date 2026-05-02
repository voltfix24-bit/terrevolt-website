-- Functies die alleen door triggers gebruikt worden mogen niet door de API uitgevoerd worden
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Storage upload-policy aanscherpen (geen pure 'true')
DROP POLICY IF EXISTS "Anyone can upload job application files" ON storage.objects;
CREATE POLICY "Anyone can upload job application files" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    bucket_id = 'job-applications'
    AND (storage.extension(name) IN ('pdf','doc','docx','jpg','jpeg','png'))
  );

-- Submit-policies aanscherpen met basis-validatie
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
CREATE POLICY "Anyone can submit job applications" ON public.job_applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 2 AND 100
    AND length(email) BETWEEN 5 AND 255
    AND email LIKE '%@%.%'
    AND length(coalesce(message, '')) <= 5000
  );

DROP POLICY IF EXISTS "Anyone can submit contact requests" ON public.contact_requests;
CREATE POLICY "Anyone can submit contact requests" ON public.contact_requests
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 2 AND 100
    AND length(email) BETWEEN 5 AND 255
    AND email LIKE '%@%.%'
    AND length(coalesce(description, '')) <= 5000
  );