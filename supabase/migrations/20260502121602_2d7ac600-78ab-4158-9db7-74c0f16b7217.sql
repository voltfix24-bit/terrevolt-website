-- ============ ROLES ============
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Eerste account = admin, daarna user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  is_first boolean;
BEGIN
  SELECT NOT EXISTS (SELECT 1 FROM public.user_roles) INTO is_first;
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, CASE WHEN is_first THEN 'admin'::public.app_role ELSE 'user'::public.app_role END)
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ TIMESTAMP HELPER ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- ============ VACANCIES ============
CREATE TABLE IF NOT EXISTS public.vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text,
  employment_type text,
  region text,
  hours text,
  level text,
  work_area text,
  intro text,
  what_you_do jsonb NOT NULL DEFAULT '[]'::jsonb,
  requirements jsonb NOT NULL DEFAULT '[]'::jsonb,
  offer jsonb NOT NULL DEFAULT '[]'::jsonb,
  safety_text text,
  process_steps jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  is_featured boolean NOT NULL DEFAULT false
);

ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS trg_vacancies_updated ON public.vacancies;
CREATE TRIGGER trg_vacancies_updated
  BEFORE UPDATE ON public.vacancies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP POLICY IF EXISTS "Public can view published vacancies" ON public.vacancies;
CREATE POLICY "Public can view published vacancies" ON public.vacancies
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS "Admins can view all vacancies" ON public.vacancies;
CREATE POLICY "Admins can view all vacancies" ON public.vacancies
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage vacancies" ON public.vacancies;
CREATE POLICY "Admins can manage vacancies" ON public.vacancies
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============ JOB APPLICATIONS uitbreiden ============
ALTER TABLE public.job_applications
  ADD COLUMN IF NOT EXISTS vacancy_id uuid REFERENCES public.vacancies(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

-- bestaande policies opschonen voor admin-only read/update/delete
DROP POLICY IF EXISTS "Authenticated users can view applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admins can view applications" ON public.job_applications;
CREATE POLICY "Admins can view applications" ON public.job_applications
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update applications" ON public.job_applications;
CREATE POLICY "Admins can update applications" ON public.job_applications
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete applications" ON public.job_applications;
CREATE POLICY "Admins can delete applications" ON public.job_applications
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- contact_requests: admin-only read/update/delete
DROP POLICY IF EXISTS "Authenticated users can view contact requests" ON public.contact_requests;
CREATE POLICY "Admins can view contact requests" ON public.contact_requests
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- ============ STORAGE policies voor job-applications ============
DROP POLICY IF EXISTS "Anyone can upload job application files" ON storage.objects;
CREATE POLICY "Anyone can upload job application files" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'job-applications');

DROP POLICY IF EXISTS "Admins can read job application files" ON storage.objects;
CREATE POLICY "Admins can read job application files" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'job-applications' AND public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete job application files" ON storage.objects;
CREATE POLICY "Admins can delete job application files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'job-applications' AND public.has_role(auth.uid(), 'admin'));