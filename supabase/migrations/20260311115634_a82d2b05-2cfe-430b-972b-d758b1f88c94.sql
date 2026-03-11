
-- 1. Add check constraint on profiles.grade for allowed values
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_grade_check;
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_grade_check
  CHECK (grade IS NULL OR grade IN ('9','10','11','12','uni-1','uni-2'));

-- 2. Opportunities: add new columns
ALTER TABLE public.admin_opportunities
  ADD COLUMN IF NOT EXISTS workshop_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS scholarship_amount text DEFAULT '',
  ADD COLUMN IF NOT EXISTS scholarship_coverage text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS flagged boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_archived boolean DEFAULT false;

-- 3. Add check constraint on scholarship_coverage
ALTER TABLE public.admin_opportunities
  DROP CONSTRAINT IF EXISTS admin_opportunities_scholarship_coverage_check;
ALTER TABLE public.admin_opportunities
  ADD CONSTRAINT admin_opportunities_scholarship_coverage_check
  CHECK (scholarship_coverage IS NULL OR scholarship_coverage IN ('full','partial','varies'));

-- 4. Add check constraint on type for allowed values
ALTER TABLE public.admin_opportunities
  DROP CONSTRAINT IF EXISTS admin_opportunities_type_check;
ALTER TABLE public.admin_opportunities
  ADD CONSTRAINT admin_opportunities_type_check
  CHECK (type IN ('internship','competition','program','volunteering','scholarship','workshop'));
