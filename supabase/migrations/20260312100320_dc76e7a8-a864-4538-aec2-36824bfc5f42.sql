ALTER TABLE public.opportunity_sources ADD COLUMN IF NOT EXISTS consecutive_failures integer DEFAULT 0;
ALTER TABLE public.opportunity_sources ADD COLUMN IF NOT EXISTS notes text;