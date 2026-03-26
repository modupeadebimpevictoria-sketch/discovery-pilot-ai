import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface DbCareer {
  id: string;
  title: string;
  family_id: string;
  description: string;
  emoji: string;
  salary_range: string;
  growth_tag: string | null;
  search_terms: string[];
  is_emerging: boolean;
  unsplash_photo_url: string | null;
  unsplash_keyword: string | null;
  onet_code: string | null;
  riasec_profile: Record<string, number> | null;
  riasec_primary: string | null;
  riasec_secondary: string | null;
  recommended_subjects: string[];
  prospects_slug: string | null;
  description_full: string | null;
  what_they_do_teen: string | null;
  day_in_the_life: string | null;
  entry_requirements: string | null;
  career_path: string | null;
  salary_context: Record<string, any>;
  skills: { name: string; importance: number }[] | null;
  work_values: string[] | null;
  growth_outlook: string | null;
  job_zone: number | null;
  is_active: boolean;
  is_manually_edited: boolean;
  is_deleted: boolean;
  pending_sync_data: Record<string, any> | null;
  sync_approval_status: string | null;
  onet_last_updated: string | null;
  prospects_last_updated: string | null;
  salary_last_updated: string | null;
  created_at: string;
  updated_at: string;
}

export interface EnrichmentIssue {
  id: string;
  career_id: string | null;
  career_title: string | null;
  issue: string;
  logged_at: string;
  resolved: boolean;
  notes: string | null;
}

export function useAdminCareers() {
  const [careers, setCareers] = useState<DbCareer[]>([]);
  const [issues, setIssues] = useState<EnrichmentIssue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [cRes, iRes] = await Promise.all([
      supabase.from("careers" as any).select("*").order("title"),
      supabase.from("career_enrichment_log" as any).select("*").eq("resolved", false).order("logged_at", { ascending: false }),
    ]);
    if (cRes.data) setCareers(cRes.data as any);
    if (iRes.data) setIssues(iRes.data as any);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const upsertCareer = async (career: Partial<DbCareer>) => {
    const payload = { ...career, updated_at: new Date().toISOString(), is_manually_edited: true };
    if (career.id) {
      const { error } = await supabase.from("careers" as any).update(payload as any).eq("id", career.id);
      if (error) { toast.error(error.message); return null; }
      toast.success("Career saved ✓");
    } else {
      const { data, error } = await supabase.from("careers" as any).insert(payload as any).select("id").single();
      if (error) { toast.error(error.message); return null; }
      toast.success("Career created ✓");
      fetchAll();
      return (data as any)?.id;
    }
    fetchAll();
    return career.id;
  };

  const softDeleteCareer = async (id: string) => {
    const { error } = await supabase.from("careers" as any).update({
      is_active: false,
      is_deleted: true,
      is_manually_edited: true,
      updated_at: new Date().toISOString(),
    } as any).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Career deleted (soft)");
    fetchAll();
  };

  const approveSyncUpdate = async (id: string) => {
    const { data: career } = await supabase.from("careers" as any).select("pending_sync_data").eq("id", id).single() as any;
    if (!(career as any)?.pending_sync_data) { toast.error("No pending data"); return; }
    const { error } = await supabase.from("careers" as any).update({
      ...(career.pending_sync_data as any),
      pending_sync_data: null,
      sync_approval_status: "approved",
      is_manually_edited: false,
      updated_at: new Date().toISOString(),
    } as any).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Update applied ✓");
    fetchAll();
  };

  const rejectSyncUpdate = async (id: string) => {
    const { error } = await supabase.from("careers" as any).update({
      pending_sync_data: null,
      sync_approval_status: "rejected",
    } as any).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Update rejected — keeping your version");
    fetchAll();
  };

  const resolveIssue = async (id: string) => {
    const { error } = await supabase.from("career_enrichment_log" as any).update({ resolved: true } as any).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Issue resolved");
    fetchAll();
  };

  const updateIssueNotes = async (id: string, notes: string) => {
    await supabase.from("career_enrichment_log" as any).update({ notes } as any).eq("id", id);
  };

  return {
    careers, issues, loading, fetchAll,
    upsertCareer, softDeleteCareer,
    approveSyncUpdate, rejectSyncUpdate,
    resolveIssue, updateIssueNotes,
  };
}
