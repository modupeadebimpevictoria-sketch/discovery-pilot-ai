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
          title: string
          type: string
          updated_at: string | null
          workshop_url: string | null
        }
        Insert: {
          application_url?: string
          career_family?: string | null
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
          title: string
          type?: string
          updated_at?: string | null
          workshop_url?: string | null
        }
        Update: {
          application_url?: string
          career_family?: string | null
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
