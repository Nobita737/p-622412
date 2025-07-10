export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      campaigns: {
        Row: {
          clicks: number
          conversions: number
          created_at: string
          emv_amount: number
          end_date: string | null
          engagements: number
          id: string
          impressions: number
          name: string
          spend_amount: number
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          clicks?: number
          conversions?: number
          created_at?: string
          emv_amount?: number
          end_date?: string | null
          engagements?: number
          id?: string
          impressions?: number
          name: string
          spend_amount?: number
          start_date?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          clicks?: number
          conversions?: number
          created_at?: string
          emv_amount?: number
          end_date?: string | null
          engagements?: number
          id?: string
          impressions?: number
          name?: string
          spend_amount?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      content_types: {
        Row: {
          content_count: number
          created_at: string
          engagement_rate: number
          id: string
          type_name: string
        }
        Insert: {
          content_count?: number
          created_at?: string
          engagement_rate: number
          id?: string
          type_name: string
        }
        Update: {
          content_count?: number
          created_at?: string
          engagement_rate?: number
          id?: string
          type_name?: string
        }
        Relationships: []
      }
      creator_tiers: {
        Row: {
          color_hex: string
          created_at: string
          id: string
          percentage: number
          tier_name: string
          tier_range: string
        }
        Insert: {
          color_hex: string
          created_at?: string
          id?: string
          percentage: number
          tier_name: string
          tier_range: string
        }
        Update: {
          color_hex?: string
          created_at?: string
          id?: string
          percentage?: number
          tier_name?: string
          tier_range?: string
        }
        Relationships: []
      }
      creators: {
        Row: {
          audience_growth_rate: number | null
          brand_collaborations_score: number | null
          category: string | null
          consistency_score: number | null
          created_at: string
          data_source: string
          engagement_rate: number | null
          external_id: string
          feedback_score: number | null
          id: string
          ig_followers: number | null
          ig_handle: string | null
          legitimacy_score: number | null
          location: string | null
          name: string
          subcategory: string | null
          updated_at: string
        }
        Insert: {
          audience_growth_rate?: number | null
          brand_collaborations_score?: number | null
          category?: string | null
          consistency_score?: number | null
          created_at?: string
          data_source: string
          engagement_rate?: number | null
          external_id: string
          feedback_score?: number | null
          id?: string
          ig_followers?: number | null
          ig_handle?: string | null
          legitimacy_score?: number | null
          location?: string | null
          name: string
          subcategory?: string | null
          updated_at?: string
        }
        Update: {
          audience_growth_rate?: number | null
          brand_collaborations_score?: number | null
          category?: string | null
          consistency_score?: number | null
          created_at?: string
          data_source?: string
          engagement_rate?: number | null
          external_id?: string
          feedback_score?: number | null
          id?: string
          ig_followers?: number | null
          ig_handle?: string | null
          legitimacy_score?: number | null
          location?: string | null
          name?: string
          subcategory?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      engagement_heatmap: {
        Row: {
          created_at: string
          day_of_week: string
          engagement_value: number
          hour_of_day: number
          id: string
        }
        Insert: {
          created_at?: string
          day_of_week: string
          engagement_value?: number
          hour_of_day: number
          id?: string
        }
        Update: {
          created_at?: string
          day_of_week?: string
          engagement_value?: number
          hour_of_day?: number
          id?: string
        }
        Relationships: []
      }
      kpi_metrics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_value: number
          period_end: string
          period_start: string
          trend_direction: string
          trend_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_value: number
          period_end: string
          period_start: string
          trend_direction: string
          trend_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: number
          period_end?: string
          period_start?: string
          trend_direction?: string
          trend_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      performance_trends: {
        Row: {
          clicks: number
          conversions: number
          created_at: string
          engagements: number
          id: string
          impressions: number
          period_date: string
          period_name: string
        }
        Insert: {
          clicks?: number
          conversions?: number
          created_at?: string
          engagements?: number
          id?: string
          impressions?: number
          period_date: string
          period_name: string
        }
        Update: {
          clicks?: number
          conversions?: number
          created_at?: string
          engagements?: number
          id?: string
          impressions?: number
          period_date?: string
          period_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
