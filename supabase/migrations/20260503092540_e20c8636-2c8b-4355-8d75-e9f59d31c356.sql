ALTER TABLE public.contact_requests
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS last_contacted_at timestamptz;

-- Admin update/delete policies (eerder ontbraken die)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='contact_requests' AND policyname='Admins can update contact requests'
  ) THEN
    CREATE POLICY "Admins can update contact requests"
      ON public.contact_requests FOR UPDATE
      TO authenticated
      USING (has_role(auth.uid(), 'admin'::app_role))
      WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='contact_requests' AND policyname='Admins can delete contact requests'
  ) THEN
    CREATE POLICY "Admins can delete contact requests"
      ON public.contact_requests FOR DELETE
      TO authenticated
      USING (has_role(auth.uid(), 'admin'::app_role));
  END IF;
END $$;