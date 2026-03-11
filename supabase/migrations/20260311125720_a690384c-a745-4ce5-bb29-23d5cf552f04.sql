
-- 1. Add career_family_ids to admin_opportunities
ALTER TABLE public.admin_opportunities
ADD COLUMN IF NOT EXISTS career_family_ids jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.admin_opportunities
ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'manual';

-- 2. Create opportunity_sources table
CREATE TABLE public.opportunity_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL UNIQUE,
  scrape_strategy text NOT NULL DEFAULT 'scrape',
  default_type text NOT NULL DEFAULT 'internship',
  is_active boolean NOT NULL DEFAULT true,
  last_scraped_at timestamptz,
  last_scraped_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.opportunity_sources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage sources" ON public.opportunity_sources
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can read sources" ON public.opportunity_sources
  FOR SELECT TO authenticated
  USING (true);

-- 3. Create scrape_log table
CREATE TABLE public.scrape_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_at timestamptz NOT NULL DEFAULT now(),
  sources_processed integer NOT NULL DEFAULT 0,
  total_new_listings integer NOT NULL DEFAULT 0,
  failed_sources jsonb NOT NULL DEFAULT '[]'::jsonb
);

ALTER TABLE public.scrape_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage scrape logs" ON public.scrape_log
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can read scrape logs" ON public.scrape_log
  FOR SELECT TO authenticated
  USING (true);
