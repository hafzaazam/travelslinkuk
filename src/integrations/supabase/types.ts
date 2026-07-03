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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author: string | null
          canonical_url: string | null
          content: string
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          meta_description: string | null
          meta_keywords: string | null
          meta_title: string | null
          noindex: boolean
          og_image: string | null
          published: boolean
          published_at: string | null
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          canonical_url?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          canonical_url?: string | null
          content?: string
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          meta_title?: string | null
          noindex?: boolean
          og_image?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      booking_settings: {
        Row: {
          account_name: string | null
          account_number: string | null
          active: boolean
          bank_name: string | null
          consultation_fee: number
          created_at: string
          currency: string
          iban: string | null
          id: string
          payment_notes: string | null
          reference_prefix: string | null
          singleton: boolean
          sort_code: string | null
          swift: string | null
          updated_at: string
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          active?: boolean
          bank_name?: string | null
          consultation_fee?: number
          created_at?: string
          currency?: string
          iban?: string | null
          id?: string
          payment_notes?: string | null
          reference_prefix?: string | null
          singleton?: boolean
          sort_code?: string | null
          swift?: string | null
          updated_at?: string
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          active?: boolean
          bank_name?: string | null
          consultation_fee?: number
          created_at?: string
          currency?: string
          iban?: string | null
          id?: string
          payment_notes?: string | null
          reference_prefix?: string | null
          singleton?: boolean
          sort_code?: string | null
          swift?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          admin_notes: string | null
          amount: number | null
          booking_status: string
          created_at: string
          currency: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          payment_method: string
          payment_status: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          transaction_date: string | null
          transaction_reference: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          amount?: number | null
          booking_status?: string
          created_at?: string
          currency?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          payment_method?: string
          payment_status?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          transaction_date?: string | null
          transaction_reference?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number | null
          booking_status?: string
          created_at?: string
          currency?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          payment_method?: string
          payment_status?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          transaction_date?: string | null
          transaction_reference?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_info: {
        Row: {
          address: string
          email: string
          hours: string
          id: boolean
          map_query: string
          phone_display: string
          phone_e164: string
          updated_at: string
          whatsapp_e164: string
        }
        Insert: {
          address?: string
          email?: string
          hours?: string
          id?: boolean
          map_query?: string
          phone_display?: string
          phone_e164?: string
          updated_at?: string
          whatsapp_e164?: string
        }
        Update: {
          address?: string
          email?: string
          hours?: string
          id?: boolean
          map_query?: string
          phone_display?: string
          phone_e164?: string
          updated_at?: string
          whatsapp_e164?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          unsubscribed: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          unsubscribed?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          unsubscribed?: boolean
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          comment: string
          country: string | null
          created_at: string
          id: string
          name: string
          rating: number
        }
        Insert: {
          approved?: boolean
          comment: string
          country?: string | null
          created_at?: string
          id?: string
          name: string
          rating: number
        }
        Update: {
          approved?: boolean
          comment?: string
          country?: string | null
          created_at?: string
          id?: string
          name?: string
          rating?: number
        }
        Relationships: []
      }
      site_popups: {
        Row: {
          active: boolean
          body: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          dismissible: boolean
          end_at: string | null
          frequency: string
          id: string
          image_url: string | null
          placement: string
          priority: number
          start_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          body?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          dismissible?: boolean
          end_at?: string | null
          frequency?: string
          id?: string
          image_url?: string | null
          placement?: string
          priority?: number
          start_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          body?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          dismissible?: boolean
          end_at?: string | null
          frequency?: string
          id?: string
          image_url?: string | null
          placement?: string
          priority?: number
          start_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      booking_settings_public: {
        Row: {
          active: boolean | null
          consultation_fee: number | null
          currency: string | null
          id: string | null
          payment_notes: string | null
          reference_prefix: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          consultation_fee?: number | null
          currency?: string | null
          id?: string | null
          payment_notes?: string | null
          reference_prefix?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          consultation_fee?: number | null
          currency?: string | null
          id?: string | null
          payment_notes?: string | null
          reference_prefix?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_active_bank_details: {
        Args: never
        Returns: {
          account_name: string
          account_number: string
          bank_name: string
          iban: string
          sort_code: string
          swift: string
        }[]
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
