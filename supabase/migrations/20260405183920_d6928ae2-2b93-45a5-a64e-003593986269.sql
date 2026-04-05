
-- 1. Restrict opportunity_sources SELECT to admin-only
DROP POLICY IF EXISTS "Authenticated can read sources" ON public.opportunity_sources;

CREATE POLICY "Only admins can read sources"
ON public.opportunity_sources
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Restrict scrape_log SELECT to admin-only
DROP POLICY IF EXISTS "Authenticated can read scrape logs" ON public.scrape_log;

CREATE POLICY "Only admins can read scrape logs"
ON public.scrape_log
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add DELETE policy on profiles so users can delete their own data
CREATE POLICY "Users can delete own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

-- 4. Add validation trigger on user_progress to prevent arbitrary XP/badge manipulation
CREATE OR REPLACE FUNCTION public.validate_user_progress_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- On INSERT, enforce safe defaults for gamification fields
  IF TG_OP = 'INSERT' THEN
    NEW.xp := 0;
    NEW.streak := 0;
    NEW.badges := '{}'::text[];
    NEW.completed_quests := '{}'::text[];
    NEW.completed_missions := '{}'::text[];
    NEW.completed_milestones := '{}'::text[];
    NEW.skill_xp := '{}'::jsonb;
    RETURN NEW;
  END IF;

  -- On UPDATE, prevent client from modifying gamification fields directly
  -- These should only change via server-side logic (edge functions / triggers)
  IF NEW.xp IS DISTINCT FROM OLD.xp THEN
    NEW.xp := OLD.xp;
  END IF;
  IF NEW.streak IS DISTINCT FROM OLD.streak THEN
    NEW.streak := OLD.streak;
  END IF;
  IF NEW.badges IS DISTINCT FROM OLD.badges THEN
    NEW.badges := OLD.badges;
  END IF;
  IF NEW.completed_quests IS DISTINCT FROM OLD.completed_quests THEN
    NEW.completed_quests := OLD.completed_quests;
  END IF;
  IF NEW.completed_missions IS DISTINCT FROM OLD.completed_missions THEN
    NEW.completed_missions := OLD.completed_missions;
  END IF;
  IF NEW.completed_milestones IS DISTINCT FROM OLD.completed_milestones THEN
    NEW.completed_milestones := OLD.completed_milestones;
  END IF;
  IF NEW.skill_xp IS DISTINCT FROM OLD.skill_xp THEN
    NEW.skill_xp := OLD.skill_xp;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_user_progress ON public.user_progress;
CREATE TRIGGER validate_user_progress
  BEFORE INSERT OR UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_user_progress_update();
