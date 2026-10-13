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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      branches: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          is_main: boolean | null
          location: string
          name: string
          phone: string | null
          service_time: string | null
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_main?: boolean | null
          location: string
          name: string
          phone?: string | null
          service_time?: string | null
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          is_main?: boolean | null
          location?: string
          name?: string
          phone?: string | null
          service_time?: string | null
        }
        Relationships: []
      }
      cart: {
        Row: {
          created_at: string
          id: string
          product_id: string
          quantity: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string | null
          id: string
          image_url: string | null
          location: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          title?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      leaders: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          name: string
          position: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name: string
          position: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          name?: string
          position?: string
        }
        Relationships: []
      }
      materials: {
        Row: {
          category: string
          created_at: string
          description: string | null
          file_type: string | null
          file_url: string
          id: string
          title: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url: string
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          file_type?: string | null
          file_url?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          order_items: Json
          payment_method: string | null
          shipping_address: Json | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          order_items: Json
          payment_method?: string | null
          shipping_address?: Json | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          order_items?: Json
          payment_method?: string | null
          shipping_address?: Json | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_times: {
        Row: {
          created_at: string
          day: string
          description: string | null
          display_order: number | null
          id: string
          time: string
          title: string
        }
        Insert: {
          created_at?: string
          day: string
          description?: string | null
          display_order?: number | null
          id?: string
          time: string
          title: string
        }
        Update: {
          created_at?: string
          day?: string
          description?: string | null
          display_order?: number | null
          id?: string
          time?: string
          title?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          key: string
          section: string
          updated_at: string
          value: string
        }
        Insert: {
          id?: string
          key: string
          section: string
          updated_at?: string
          value?: string
        }
        Update: {
          id?: string
          key?: string
          section?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          platform: string
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          platform: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          platform?: string
          url?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          bill_reference: string | null
          category: string | null
          created_at: string | null
          description: string
          id: string
          recipient: string | null
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          bill_reference?: string | null
          category?: string | null
          created_at?: string | null
          description: string
          id?: string
          recipient?: string | null
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          bill_reference?: string | null
          category?: string | null
          created_at?: string | null
          description?: string
          id?: string
          recipient?: string | null
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
      users: {
        Row: {
          account_number: string
          balance: number | null
          created_at: string | null
          email: string
          full_name: string
          id: string
        }
        Insert: {
          account_number: string
          balance?: number | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
        }
        Update: {
          account_number?: string
          balance?: number | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_money: {
        Args: { p_amount: number }
        Returns: {
          message: string
          new_balance: number
          success: boolean
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      pay_bill: {
        Args: { p_amount: number; p_biller_name: string; p_reference: string }
        Returns: {
          message: string
          new_balance: number
          success: boolean
        }[]
      }
      transfer_money: {
        Args: { p_amount: number; p_description: string; p_recipient: string }
        Returns: {
          message: string
          new_balance: number
          success: boolean
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
