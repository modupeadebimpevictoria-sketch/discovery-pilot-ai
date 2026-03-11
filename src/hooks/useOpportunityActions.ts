import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useApp } from "@/contexts/AppContext";

export function useOpportunityActions() {
  const { user } = useApp();
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Fetch user's applied & saved opportunities
  useEffect(() => {
    if (!user) {
      setAppliedIds(new Set());
      setSavedIds(new Set());
      setLoading(false);
      return;
    }

    const fetch = async () => {
      const [appsRes, savesRes] = await Promise.all([
        supabase
          .from("user_opportunity_applications")
          .select("opportunity_id")
          .eq("user_id", user.id),
        supabase
          .from("user_saved_opportunities")
          .select("opportunity_id")
          .eq("user_id", user.id),
      ]);

      if (appsRes.data) {
        setAppliedIds(new Set(appsRes.data.map((r: any) => r.opportunity_id)));
      }
      if (savesRes.data) {
        setSavedIds(new Set(savesRes.data.map((r: any) => r.opportunity_id)));
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  const recordClick = useCallback(
    async (opportunityId: string) => {
      if (!user) return;
      await supabase.from("user_opportunity_applications").upsert(
        { user_id: user.id, opportunity_id: opportunityId, status: "clicked" },
        { onConflict: "user_id,opportunity_id" }
      );
      setAppliedIds((prev) => new Set(prev).add(opportunityId));
    },
    [user]
  );

  const toggleSave = useCallback(
    async (opportunityId: string) => {
      if (!user) return;
      const isSaved = savedIds.has(opportunityId);

      if (isSaved) {
        await supabase
          .from("user_saved_opportunities")
          .delete()
          .eq("user_id", user.id)
          .eq("opportunity_id", opportunityId);
        setSavedIds((prev) => {
          const next = new Set(prev);
          next.delete(opportunityId);
          return next;
        });
      } else {
        await supabase
          .from("user_saved_opportunities")
          .insert({ user_id: user.id, opportunity_id: opportunityId });
        setSavedIds((prev) => new Set(prev).add(opportunityId));
      }
    },
    [user, savedIds]
  );

  return { appliedIds, savedIds, recordClick, toggleSave, loading };
}
