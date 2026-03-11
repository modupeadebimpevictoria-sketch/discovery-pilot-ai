
-- Table: user_opportunity_applications (click tracking)
CREATE TABLE public.user_opportunity_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id uuid NOT NULL REFERENCES public.admin_opportunities(id) ON DELETE CASCADE,
  applied_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'clicked',
  UNIQUE (user_id, opportunity_id)
);

ALTER TABLE public.user_opportunity_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own applications"
  ON public.user_opportunity_applications FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own applications"
  ON public.user_opportunity_applications FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON public.user_opportunity_applications FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Table: user_saved_opportunities
CREATE TABLE public.user_saved_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  opportunity_id uuid NOT NULL REFERENCES public.admin_opportunities(id) ON DELETE CASCADE,
  saved_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, opportunity_id)
);

ALTER TABLE public.user_saved_opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own saves"
  ON public.user_saved_opportunities FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own saves"
  ON public.user_saved_opportunities FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saves"
  ON public.user_saved_opportunities FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
