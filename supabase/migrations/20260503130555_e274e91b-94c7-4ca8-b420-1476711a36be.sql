
-- Job applications: add next_follow_up_at + status constraint
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS next_follow_up_at timestamptz;

-- Normalize unknown statuses to 'new' before adding constraint
UPDATE public.job_applications
SET status = 'new'
WHERE status IS NULL
   OR status NOT IN ('new','in_review','contacted','not_reached','documents_needed','matched','rejected','hired','archived');

ALTER TABLE public.job_applications
  DROP CONSTRAINT IF EXISTS job_applications_status_check;

ALTER TABLE public.job_applications
  ADD CONSTRAINT job_applications_status_check
  CHECK (status IN ('new','in_review','contacted','not_reached','documents_needed','matched','rejected','hired','archived'));

-- Contact requests: add next_follow_up_at + safety_scope_flags + status constraint
ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS next_follow_up_at timestamptz;

ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS safety_scope_flags jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.contact_requests
SET status = 'new'
WHERE status IS NULL
   OR status NOT IN ('new','in_review','contacted','quote_needed','planned','waiting_for_client','completed','rejected','archived');

ALTER TABLE public.contact_requests
  DROP CONSTRAINT IF EXISTS contact_requests_status_check;

ALTER TABLE public.contact_requests
  ADD CONSTRAINT contact_requests_status_check
  CHECK (status IN ('new','in_review','contacted','quote_needed','planned','waiting_for_client','completed','rejected','archived'));

-- Helpful indexes for admin filtering
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_next_follow_up ON public.job_applications(next_follow_up_at);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_next_follow_up ON public.contact_requests(next_follow_up_at);
