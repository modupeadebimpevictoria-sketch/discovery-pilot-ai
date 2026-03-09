import { supabase } from "@/integrations/supabase/client";

export async function sendNotification(
  userId: string,
  title: string,
  message: string,
  type: "streak" | "quest" | "badge" | "milestone" | "tip" | "welcome"
) {
  await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    type,
  });
}
