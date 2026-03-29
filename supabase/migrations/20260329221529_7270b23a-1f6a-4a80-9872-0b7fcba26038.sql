ALTER TABLE public.careers
  ADD COLUMN IF NOT EXISTS day_in_life_video_url text,
  ADD COLUMN IF NOT EXISTS encouragement_video_url text,
  ADD COLUMN IF NOT EXISTS encouragement_figure text,
  ADD COLUMN IF NOT EXISTS role_models jsonb DEFAULT '[]'::jsonb;