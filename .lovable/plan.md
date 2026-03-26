

## Fix Enriched Skills Display

### Problems Found

1. **Careers not loading for unauthenticated users**: The `careers` table RLS policy only allows `authenticated` users to SELECT. All network requests return `[]` because the user isn't logged in. Need to add an `anon` SELECT policy or make the existing one apply to `anon` too.

2. **Skill importance bars are invisible**: The O*NET enrichment stored `importance: 0` for every skill. The UI renders a progress bar at `width: 0%`, making it invisible. The enrichment function needs to extract actual importance scores from the O*NET API, or the UI should hide the bar when importance is 0.

3. **Skill names are too long**: O*NET v2 returns verbose descriptions (e.g., "listening to others, not interrupting, and asking good questions"). These need to be mapped to concise skill names (e.g., "Active Listening") or truncated.

### Plan

**Step 1: Fix RLS — allow anonymous read access to careers**
- Add a SELECT policy on `careers` for `anon` role with `USING (is_active = true)`
- This lets the career exploration page load without requiring login

**Step 2: Fix skill name mapping in the enrichment function**
- Update `supabase/functions/enrich-careers-onet/index.ts` to capitalize/title-case skill names
- If the O*NET v2 API provides a short `id` or `hot_technology` label alongside the verbose name, use that instead
- Otherwise, apply a title-case transform and truncate to first clause (before first comma)

**Step 3: Fix importance scores in enrichment**
- Inspect the O*NET v2 skills endpoint response to check if importance/level data is available in the `element` objects
- If available (e.g., `score` or `level` field), store it as the importance value
- If not available from v2, remove the importance bar from the UI

**Step 4: Update the UI to handle zero-importance gracefully**
- In `CareerExploration.tsx` (line 381-383): hide the importance bar when `s.importance === 0` instead of rendering an invisible bar
- Show skills as simple pill tags without bars when no importance data exists

**Step 5: Re-run enrichment for skills**
- Deploy updated edge function
- Re-enrich all 402 careers in batches to populate corrected skill names and importance scores

### Files to Change
- **Migration**: Add anon SELECT policy on `careers` table
- `supabase/functions/enrich-careers-onet/index.ts` — fix skill name extraction and importance parsing
- `src/pages/CareerExploration.tsx` — graceful handling of zero-importance skills

