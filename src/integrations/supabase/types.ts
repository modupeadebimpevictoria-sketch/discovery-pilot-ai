export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_opportunities: {
        Row: {
          application_url: string
          career_family: string | null
          career_family_ids: Json
          city: string | null
          country: string
          created_at: string | null
          deadline: string | null
          description: string
          duration: string | null
          flagged: boolean | null
          id: string
          is_active: boolean | null
          is_archived: boolean | null
          is_link_dead: boolean | null
          is_remote: boolean | null
          location: string
          max_age: number | null
          max_grade: number
          min_age: number | null
          min_grade: number
          organisation: string
          scholarship_amount: string | null
          scholarship_coverage: string | null
          source: string
          title: string
          type: string
          updated_at: string | null
          workshop_url: string | null
        }
        Insert: {
          application_url?: string
          career_family?: string | null
          career_family_ids?: Json
          city?: string | null
          country?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          duration?: string | null
          flagged?: boolean | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          is_link_dead?: boolean | null
          is_remote?: boolean | null
          location?: string
          max_age?: number | null
          max_grade?: number
          min_age?: number | null
          min_grade?: number
          organisation?: string
          scholarship_amount?: string | null
          scholarship_coverage?: string | null
          source?: string
          title: string
          type?: string
          updated_at?: string | null
          workshop_url?: string | null
        }
        Update: {
          application_url?: string
          career_family?: string | null
          career_family_ids?: Json
          city?: string | null
          country?: string
          created_at?: string | null
          deadline?: string | null
          description?: string
          duration?: string | null
          flagged?: boolean | null
          id?: string
          is_active?: boolean | null
          is_archived?: boolean | null
          is_link_dead?: boolean | null
          is_remote?: boolean | null
          location?: string
          max_age?: number | null
          max_grade?: number
          min_age?: number | null
          min_grade?: number
          organisation?: string
          scholarship_amount?: string | null
          scholarship_coverage?: string | null
          source?: string
          title?: string
          type?: string
          updated_at?: string | null
          workshop_url?: string | null
        }
        Relationships: []
      }
      feed_posts: {
        Row: {
          author: string | null
          body_markdown: string | null
          career_family: string | null
          content_type: string
          created_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          body_markdown?: string | null
          career_family?: string | null
          content_type?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          body_markdown?: string | null
          career_family?: string | null
          content_type?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      missions: {
        Row: {
          career_id: string
          created_at: string | null
          created_by: string
          description: string
          estimated_minutes: number
          family_id: string
          id: string
          is_active: boolean
          mission_type: string
          reviewed_by_admin: boolean
          task: string
          title: string
          week_number: number | null
          xp_reward: number
        }
        Insert: {
          career_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          estimated_minutes?: number
          family_id?: string
          id?: string
          is_active?: boolean
          mission_type?: string
          reviewed_by_admin?: boolean
          task?: string
          title: string
          week_number?: number | null
          xp_reward?: number
        }
        Update: {
          career_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          estimated_minutes?: number
          family_id?: string
          id?: string
          is_active?: boolean
          mission_type?: string
          reviewed_by_admin?: boolean
          task?: string
          title?: string
          week_number?: number | null
          xp_reward?: number
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      opportunity_sources: {
        Row: {
          created_at: string
          default_type: string
          id: string
          is_active: boolean
          last_scraped_at: string | null
          last_scraped_count: number | null
          name: string
          scrape_strategy: string
          url: string
        }
        Insert: {
          created_at?: string
          default_type?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          last_scraped_count?: number | null
          name: string
          scrape_strategy?: string
          url: string
        }
        Update: {
          created_at?: string
          default_type?: string
          id?: string
          is_active?: boolean
          last_scraped_at?: string | null
          last_scraped_count?: number | null
          name?: string
          scrape_strategy?: string
          url?: string
        }
        Relationships: []
      }
      person_spotlights: {
        Row: {
          backstory: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          name: string
          organisation: string | null
          photo_url: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          backstory?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          organisation?: string | null
          photo_url?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          backstory?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          organisation?: string | null
          photo_url?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          country: string | null
          created_at: string | null
          dream_career: string | null
          grade: string | null
          id: string
          interests: string[] | null
          name: string
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          country?: string | null
          created_at?: string | null
          dream_career?: string | null
          grade?: string | null
          id: string
          interests?: string[] | null
          name?: string
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          country?: string | null
          created_at?: string | null
          dream_career?: string | null
          grade?: string | null
          id?: string
          interests?: string[] | null
          name?: string
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quest_generation_log: {
        Row: {
          career_family_id: string
          error_message: string | null
          generated_at: string | null
          grade_band: string
          id: string
          model: string | null
          prompt_used: string | null
          quest_ids_created: Json | null
          status: string
          week_number: number
        }
        Insert: {
          career_family_id?: string
          error_message?: string | null
          generated_at?: string | null
          grade_band?: string
          id?: string
          model?: string | null
          prompt_used?: string | null
          quest_ids_created?: Json | null
          status?: string
          week_number: number
        }
        Update: {
          career_family_id?: string
          error_message?: string | null
          generated_at?: string | null
          grade_band?: string
          id?: string
          model?: string | null
          prompt_used?: string | null
          quest_ids_created?: Json | null
          status?: string
          week_number?: number
        }
        Relationships: []
      }
      quests: {
        Row: {
          badge_id: string | null
          brief: string | null
          career_id: string
          created_at: string | null
          created_by: string
          estimated_minutes: number
          family_id: string
          flagged: boolean
          generation_context: Json | null
          grade_band: string | null
          id: string
          instructions: string | null
          is_active: boolean
          quest_type: string
          resource_url: string | null
          skill_tag: string | null
          title: string
          week_number: number
          xp_reward: number
        }
        Insert: {
          badge_id?: string | null
          brief?: string | null
          career_id?: string
          created_at?: string | null
          created_by?: string
          estimated_minutes?: number
          family_id?: string
          flagged?: boolean
          generation_context?: Json | null
          grade_band?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          quest_type?: string
          resource_url?: string | null
          skill_tag?: string | null
          title: string
          week_number?: number
          xp_reward?: number
        }
        Update: {
          badge_id?: string | null
          brief?: string | null
          career_id?: string
          created_at?: string | null
          created_by?: string
          estimated_minutes?: number
          family_id?: string
          flagged?: boolean
          generation_context?: Json | null
          grade_band?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          quest_type?: string
          resource_url?: string | null
          skill_tag?: string | null
          title?: string
          week_number?: number
          xp_reward?: number
        }
        Relationships: []
      }
      scrape_log: {
        Row: {
          failed_sources: Json
          id: string
          run_at: string
          sources_processed: number
          total_new_listings: number
        }
        Insert: {
          failed_sources?: Json
          id?: string
          run_at?: string
          sources_processed?: number
          total_new_listings?: number
        }
        Update: {
          failed_sources?: Json
          id?: string
          run_at?: string
          sources_processed?: number
          total_new_listings?: number
        }
        Relationships: []
      }
      skill_prompts: {
        Row: {
          career_id: string
          created_at: string | null
          estimated_minutes: number
          family_id: string
          id: string
          is_active: boolean
          level: number
          prompt_format: string
          prompt_text: string
          skill_name: string
          sort_order: number
          xp_reward: number
        }
        Insert: {
          career_id?: string
          created_at?: string | null
          estimated_minutes?: number
          family_id?: string
          id?: string
          is_active?: boolean
          level?: number
          prompt_format?: string
          prompt_text: string
          skill_name: string
          sort_order?: number
          xp_reward?: number
        }
        Update: {
          career_id?: string
          created_at?: string | null
          estimated_minutes?: number
          family_id?: string
          id?: string
          is_active?: boolean
          level?: number
          prompt_format?: string
          prompt_text?: string
          skill_name?: string
          sort_order?: number
          xp_reward?: number
        }
        Relationships: []
      }
      user_mission_progress: {
        Row: {
          completed_at: string | null
          id: string
          mission_id: string
          photo_url: string | null
          response_text: string | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          mission_id: string
          photo_url?: string | null
          response_text?: string | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          mission_id?: string
          photo_url?: string | null
          response_text?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_mission_progress_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_opportunity_applications: {
        Row: {
          applied_at: string
          id: string
          opportunity_id: string
          status: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          id?: string
          opportunity_id: string
          status?: string
          user_id: string
        }
        Update: {
          applied_at?: string
          id?: string
          opportunity_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_opportunity_applications_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "admin_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          applied_internships: string[] | null
          archetype: string | null
          assessment_answers: Json | null
          badges: string[] | null
          completed_milestones: string[] | null
          completed_missions: string[] | null
          completed_quests: string[] | null
          created_at: string | null
          id: string
          journal_entries: Json | null
          last_check_in_date: string | null
          last_engaged_date: string | null
          matched_careers: Json | null
          pathway_start_date: string | null
          pulse_check: string | null
          rejected_careers: string[] | null
          saved_careers: string[] | null
          saved_resources: Json | null
          selected_career_path: string | null
          skill_xp: Json | null
          streak: number | null
          updated_at: string | null
          user_id: string
          xp: number | null
        }
        Insert: {
          applied_internships?: string[] | null
          archetype?: string | null
          assessment_answers?: Json | null
          badges?: string[] | null
          completed_milestones?: string[] | null
          completed_missions?: string[] | null
          completed_quests?: string[] | null
          created_at?: string | null
          id?: string
          journal_entries?: Json | null
          last_check_in_date?: string | null
          last_engaged_date?: string | null
          matched_careers?: Json | null
          pathway_start_date?: string | null
          pulse_check?: string | null
          rejected_careers?: string[] | null
          saved_careers?: string[] | null
          saved_resources?: Json | null
          selected_career_path?: string | null
          skill_xp?: Json | null
          streak?: number | null
          updated_at?: string | null
          user_id: string
          xp?: number | null
        }
        Update: {
          applied_internships?: string[] | null
          archetype?: string | null
          assessment_answers?: Json | null
          badges?: string[] | null
          completed_milestones?: string[] | null
          completed_missions?: string[] | null
          completed_quests?: string[] | null
          created_at?: string | null
          id?: string
          journal_entries?: Json | null
          last_check_in_date?: string | null
          last_engaged_date?: string | null
          matched_careers?: Json | null
          pathway_start_date?: string | null
          pulse_check?: string | null
          rejected_careers?: string[] | null
          saved_careers?: string[] | null
          saved_resources?: Json | null
          selected_career_path?: string | null
          skill_xp?: Json | null
          streak?: number | null
          updated_at?: string | null
          user_id?: string
          xp?: number | null
        }
        Relationships: []
      }
      user_quest_progress: {
        Row: {
          completed_at: string | null
          id: string
          quest_id: string
          response_text: string | null
          started_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          quest_id: string
          response_text?: string | null
          started_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          quest_id?: string
          response_text?: string | null
          started_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_quest_progress_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "quests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_saved_opportunities: {
        Row: {
          id: string
          opportunity_id: string
          saved_at: string
          user_id: string
        }
        Insert: {
          id?: string
          opportunity_id: string
          saved_at?: string
          user_id: string
        }
        Update: {
          id?: string
          opportunity_id?: string
          saved_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_saved_opportunities_opportunity_id_fkey"
            columns: ["opportunity_id"]
            isOneToOne: false
            referencedRelation: "admin_opportunities"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skill_progress: {
        Row: {
          career_id: string
          id: string
          last_completed_at: string | null
          level_reached: number
          prompts_completed: number
          skill_name: string
          user_id: string
        }
        Insert: {
          career_id?: string
          id?: string
          last_completed_at?: string | null
          level_reached?: number
          prompts_completed?: number
          skill_name: string
          user_id: string
        }
        Update: {
          career_id?: string
          id?: string
          last_completed_at?: string | null
          level_reached?: number
          prompts_completed?: number
          skill_name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
