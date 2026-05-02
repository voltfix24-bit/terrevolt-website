ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS intent text,
  ADD COLUMN IF NOT EXISTS intent_label text;

CREATE INDEX IF NOT EXISTS idx_contact_requests_intent ON public.contact_requests(intent);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests(created_at DESC);