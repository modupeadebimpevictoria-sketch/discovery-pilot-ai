
-- ═══════════════════════════════════════
-- MISSIONS TABLE
-- ═══════════════════════════════════════
CREATE TABLE public.missions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id text NOT NULL DEFAULT '',
  family_id text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  task text NOT NULL DEFAULT '',
  mission_type text NOT NULL DEFAULT 'do' CHECK (mission_type IN ('do','observe','reflect','share')),
  estimated_minutes integer NOT NULL DEFAULT 5,
  xp_reward integer NOT NULL DEFAULT 10,
  is_active boolean NOT NULL DEFAULT false,
  week_number integer,
  created_by text NOT NULL DEFAULT 'manual',
  reviewed_by_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active missions" ON public.missions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage missions" ON public.missions
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ═══════════════════════════════════════
-- USER_MISSION_PROGRESS
-- ═══════════════════════════════════════
CREATE TABLE public.user_mission_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id uuid NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('completed')),
  response_text text,
  photo_url text,
  completed_at timestamptz DEFAULT now(),
  UNIQUE (user_id, mission_id)
);

ALTER TABLE public.user_mission_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mission progress" ON public.user_mission_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mission progress" ON public.user_mission_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mission progress" ON public.user_mission_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ═══════════════════════════════════════
-- QUESTS TABLE
-- ═══════════════════════════════════════
CREATE TABLE public.quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id text NOT NULL DEFAULT '',
  family_id text NOT NULL DEFAULT '',
  title text NOT NULL,
  brief text,
  instructions text,
  quest_type text NOT NULL DEFAULT 'research' CHECK (quest_type IN ('research','challenge','create','watch','explore')),
  resource_url text,
  estimated_minutes integer NOT NULL DEFAULT 15,
  xp_reward integer NOT NULL DEFAULT 25,
  skill_tag text DEFAULT '',
  badge_id text,
  week_number integer NOT NULL DEFAULT 1,
  grade_band text DEFAULT '9-10' CHECK (grade_band IN ('9-10','11-12','university-1-2')),
  generation_context jsonb DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  flagged boolean NOT NULL DEFAULT false,
  created_by text NOT NULL DEFAULT 'manual' CHECK (created_by IN ('ai-generated','manual')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active quests" ON public.quests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage quests" ON public.quests
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ═══════════════════════════════════════
-- QUEST_GENERATION_LOG
-- ═══════════════════════════════════════
CREATE TABLE public.quest_generation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_family_id text NOT NULL DEFAULT '',
  grade_band text NOT NULL DEFAULT '9-10',
  week_number integer NOT NULL,
  generated_at timestamptz DEFAULT now(),
  quest_ids_created jsonb DEFAULT '[]'::jsonb,
  prompt_used text,
  model text,
  status text NOT NULL DEFAULT 'success' CHECK (status IN ('success','failed')),
  error_message text
);

ALTER TABLE public.quest_generation_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage quest logs" ON public.quest_generation_log
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ═══════════════════════════════════════
-- USER_QUEST_PROGRESS
-- ═══════════════════════════════════════
CREATE TABLE public.user_quest_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quest_id uuid NOT NULL REFERENCES public.quests(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started','in_progress','completed')),
  response_text text,
  started_at timestamptz,
  completed_at timestamptz,
  UNIQUE (user_id, quest_id)
);

ALTER TABLE public.user_quest_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quest progress" ON public.user_quest_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quest progress" ON public.user_quest_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quest progress" ON public.user_quest_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- ═══════════════════════════════════════
-- SKILL_PROMPTS
-- ═══════════════════════════════════════
CREATE TABLE public.skill_prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id text NOT NULL DEFAULT '',
  family_id text NOT NULL DEFAULT '',
  skill_name text NOT NULL,
  level integer NOT NULL DEFAULT 1 CHECK (level IN (1,2,3)),
  prompt_text text NOT NULL,
  prompt_format text NOT NULL DEFAULT 'write' CHECK (prompt_format IN ('write','observe','analyse')),
  estimated_minutes integer NOT NULL DEFAULT 10,
  xp_reward integer NOT NULL DEFAULT 15,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.skill_prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active skill prompts" ON public.skill_prompts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage skill prompts" ON public.skill_prompts
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- ═══════════════════════════════════════
-- USER_SKILL_PROGRESS
-- ═══════════════════════════════════════
CREATE TABLE public.user_skill_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name text NOT NULL,
  career_id text NOT NULL DEFAULT '',
  level_reached integer NOT NULL DEFAULT 1,
  prompts_completed integer NOT NULL DEFAULT 0,
  last_completed_at timestamptz,
  UNIQUE (user_id, skill_name, career_id)
);

ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own skill progress" ON public.user_skill_progress
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skill progress" ON public.user_skill_progress
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skill progress" ON public.user_skill_progress
  FOR UPDATE TO authenticated USING (auth.uid() = user_id);
