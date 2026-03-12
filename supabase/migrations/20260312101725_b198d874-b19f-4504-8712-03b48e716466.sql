
ALTER TABLE public.careers ADD COLUMN IF NOT EXISTS slug text;

-- Slugify existing careers from title: lowercase, remove special chars, replace spaces with hyphens
UPDATE public.careers
SET slug = lower(
  regexp_replace(
    regexp_replace(
      regexp_replace(title, '[''&/().,!?:;]', '', 'g'),
      '[^a-z0-9 -]', '', 'gi'
    ),
    '[ ]+', '-', 'g'
  )
)
WHERE slug IS NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_careers_slug ON public.careers(slug);
