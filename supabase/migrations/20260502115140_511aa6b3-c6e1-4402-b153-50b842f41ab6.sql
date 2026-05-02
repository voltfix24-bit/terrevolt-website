CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  request_type TEXT,
  location TEXT,
  start_date TEXT,
  description TEXT,
  attachment_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact requests"
  ON public.contact_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact requests"
  ON public.contact_requests
  FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO storage.buckets (id, name, public)
VALUES ('contact-attachments', 'contact-attachments', false);

CREATE POLICY "Anyone can upload contact attachments"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'contact-attachments');

CREATE POLICY "Authenticated users can read contact attachments"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'contact-attachments');