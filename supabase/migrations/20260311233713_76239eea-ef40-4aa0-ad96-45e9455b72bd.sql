
-- Create careers table
CREATE TABLE IF NOT EXISTS public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  family_id text DEFAULT '',
  description text DEFAULT '',
  emoji text DEFAULT '💼',
  salary_range text DEFAULT '',
  growth_tag text,
  search_terms jsonb DEFAULT '[]',
  is_emerging boolean DEFAULT false,
  unsplash_photo_url text,
  unsplash_keyword text,
  onet_code text,
  riasec_profile jsonb,
  riasec_primary text,
  riasec_secondary text,
  recommended_subjects text[] DEFAULT '{}',
  prospects_slug text,
  description_full text,
  what_they_do_teen text,
  day_in_the_life text,
  entry_requirements text,
  career_path text,
  salary_context jsonb DEFAULT '{}',
  skills jsonb,
  work_values jsonb,
  growth_outlook text,
  job_zone integer,
  is_active boolean DEFAULT true,
  onet_last_updated timestamptz,
  prospects_last_updated timestamptz,
  salary_last_updated timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create career_enrichment_log table
CREATE TABLE IF NOT EXISTS public.career_enrichment_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid REFERENCES public.careers(id),
  career_title text,
  issue text CHECK (issue IN ('no_onet_match','no_prospects_slug','scrape_failed','rewrite_failed')),
  logged_at timestamptz DEFAULT now(),
  resolved boolean DEFAULT false,
  notes text
);

-- Enable RLS
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_enrichment_log ENABLE ROW LEVEL SECURITY;

-- Careers: anyone authenticated can read active careers
CREATE POLICY "Anyone can read active careers" ON public.careers FOR SELECT TO authenticated USING (true);

-- Careers: admins can manage
CREATE POLICY "Admins can manage careers" ON public.careers FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enrichment log: admins can manage
CREATE POLICY "Admins can manage enrichment log" ON public.career_enrichment_log FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Enrichment log: admins can read
CREATE POLICY "Anyone can read enrichment log" ON public.career_enrichment_log FOR SELECT TO authenticated USING (true);
