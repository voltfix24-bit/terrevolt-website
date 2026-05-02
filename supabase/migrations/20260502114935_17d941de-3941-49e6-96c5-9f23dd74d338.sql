-- Aanmeldingen tabel
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  region TEXT,
  experience TEXT,
  certifications TEXT,
  availability TEXT,
  message TEXT,
  cv_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Iedereen mag aanmelding indienen (publiek formulier)
CREATE POLICY "Anyone can submit job applications"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Alleen geauthenticeerde gebruikers (admins) mogen aanmeldingen lezen
CREATE POLICY "Authenticated users can view applications"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Storage bucket voor CV's (privé)
INSERT INTO storage.buckets (id, name, public)
VALUES ('job-applications', 'job-applications', false);

-- Iedereen mag uploaden naar deze bucket (voor publiek formulier)
CREATE POLICY "Anyone can upload CVs"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'job-applications');

-- Alleen ingelogde gebruikers mogen CV's bekijken
CREATE POLICY "Authenticated users can read CVs"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'job-applications');