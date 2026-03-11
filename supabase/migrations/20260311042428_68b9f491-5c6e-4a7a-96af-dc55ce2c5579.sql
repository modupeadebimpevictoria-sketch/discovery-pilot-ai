
-- ═══════════════════════════════════════
-- 1. USER ROLES (per security guidelines)
-- ═══════════════════════════════════════
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
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

-- Admins can read all roles
CREATE POLICY "Admins can read all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can read own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- ═══════════════════════════════════════
-- 2. ADMIN-MANAGED OPPORTUNITIES TABLE
-- ═══════════════════════════════════════
CREATE TABLE public.admin_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  organisation text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'internship',
  description text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT 'Global',
  country text NOT NULL DEFAULT '',
  city text DEFAULT '',
  min_grade int NOT NULL DEFAULT 9,
  max_grade int NOT NULL DEFAULT 12,
  min_age int DEFAULT NULL,
  max_age int DEFAULT NULL,
  application_url text NOT NULL DEFAULT '',
  deadline date DEFAULT NULL,
  duration text DEFAULT '',
  career_family text DEFAULT '',
  is_remote boolean DEFAULT false,
  is_active boolean DEFAULT true,
  is_link_dead boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.admin_opportunities ENABLE ROW LEVEL SECURITY;

-- Anyone can read active opportunities
CREATE POLICY "Anyone can read opportunities"
ON public.admin_opportunities FOR SELECT TO authenticated
USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert opportunities"
ON public.admin_opportunities FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update opportunities"
ON public.admin_opportunities FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete opportunities"
ON public.admin_opportunities FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ═══════════════════════════════════════
-- 3. FEED POSTS TABLE
-- ═══════════════════════════════════════
CREATE TABLE public.feed_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  career_family text DEFAULT '',
  content_type text NOT NULL DEFAULT 'article',
  body_markdown text DEFAULT '',
  author text DEFAULT '',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active feed posts"
ON public.feed_posts FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage feed posts"
ON public.feed_posts FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ═══════════════════════════════════════
-- 4. PERSON SPOTLIGHTS TABLE
-- ═══════════════════════════════════════
CREATE TABLE public.person_spotlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  organisation text DEFAULT '',
  backstory text DEFAULT '',
  photo_url text DEFAULT '',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.person_spotlights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read spotlights"
ON public.person_spotlights FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Admins can manage spotlights"
ON public.person_spotlights FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));
