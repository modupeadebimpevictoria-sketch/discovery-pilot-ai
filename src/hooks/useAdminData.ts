import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AdminOpportunity {
  id: string;
  title: string;
  organisation: string;
  type: string;
  description: string;
  location: string;
  country: string;
  city: string;
  min_grade: number;
  max_grade: number;
  application_url: string;
  deadline: string | null;
  duration: string;
  career_family: string;
  is_remote: boolean;
  is_active: boolean;
  is_link_dead: boolean;
  created_at: string;
}

interface FeedPost {
  id: string;
  title: string;
  career_family: string;
  content_type: string;
  body_markdown: string;
  author: string;
  image_url: string;
  is_active: boolean;
  published_at: string;
}

interface PersonSpotlight {
  id: string;
  name: string;
  role: string;
  organisation: string;
  backstory: string;
  photo_url: string;
  is_featured: boolean;
}

export function useAdminData() {
  const [opportunities, setOpportunities] = useState<AdminOpportunity[]>([]);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [spotlights, setSpotlights] = useState<PersonSpotlight[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const [oppRes, feedRes, spotRes] = await Promise.all([
      supabase.from("admin_opportunities").select("*").order("created_at", { ascending: false }),
      supabase.from("feed_posts").select("*").order("published_at", { ascending: false }),
      supabase.from("person_spotlights").select("*").order("created_at", { ascending: false }),
    ]);
    if (oppRes.data) setOpportunities(oppRes.data as any);
    if (feedRes.data) setFeedPosts(feedRes.data as any);
    if (spotRes.data) setSpotlights(spotRes.data as any);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const upsertOpportunity = async (opp: Partial<AdminOpportunity>) => {
    if (opp.id) {
      const { error } = await supabase.from("admin_opportunities").update({ ...opp, updated_at: new Date().toISOString() } as any).eq("id", opp.id);
      if (error) { toast.error(error.message); return false; }
    } else {
      const { error } = await supabase.from("admin_opportunities").insert(opp as any);
      if (error) { toast.error(error.message); return false; }
    }
    toast.success("Opportunity saved!");
    fetchAll();
    return true;
  };

  const deleteOpportunity = async (id: string) => {
    const { error } = await supabase.from("admin_opportunities").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Opportunity deleted");
    fetchAll();
  };

  const upsertFeedPost = async (post: Partial<FeedPost>) => {
    if (post.id) {
      const { error } = await supabase.from("feed_posts").update({ ...post, updated_at: new Date().toISOString() } as any).eq("id", post.id);
      if (error) { toast.error(error.message); return false; }
    } else {
      const { error } = await supabase.from("feed_posts").insert(post as any);
      if (error) { toast.error(error.message); return false; }
    }
    toast.success("Post saved!");
    fetchAll();
    return true;
  };

  const deleteFeedPost = async (id: string) => {
    const { error } = await supabase.from("feed_posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Post deleted");
    fetchAll();
  };

  const upsertSpotlight = async (spot: Partial<PersonSpotlight>) => {
    if (spot.id) {
      const { error } = await supabase.from("person_spotlights").update({ ...spot, updated_at: new Date().toISOString() } as any).eq("id", spot.id);
      if (error) { toast.error(error.message); return false; }
    } else {
      const { error } = await supabase.from("person_spotlights").insert(spot as any);
      if (error) { toast.error(error.message); return false; }
    }
    toast.success("Spotlight saved!");
    fetchAll();
    return true;
  };

  const deleteSpotlight = async (id: string) => {
    const { error } = await supabase.from("person_spotlights").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Spotlight deleted");
    fetchAll();
  };

  return {
    opportunities, feedPosts, spotlights, loading, fetchAll,
    upsertOpportunity, deleteOpportunity,
    upsertFeedPost, deleteFeedPost,
    upsertSpotlight, deleteSpotlight,
  };
}
