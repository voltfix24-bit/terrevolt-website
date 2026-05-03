ALTER TABLE public.job_applications 
ADD COLUMN IF NOT EXISTS admin_notes text,
ADD COLUMN IF NOT EXISTS last_contacted_at timestamptz;