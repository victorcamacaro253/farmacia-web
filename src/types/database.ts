export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          icon: string;
          parent_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          icon?: string;
          parent_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          icon?: string;
          parent_id?: string | null;
          created_at?: string;
        };
      };
      branches: {
        Row: {
          id: string;
          name: string;
          address: string;
          city: string;
          province: string;
          postal_code: string;
          phone: string;
          latitude: number;
          longitude: number;
          hours: Json;
          is_open: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          city: string;
          province: string;
          postal_code?: string;
          phone?: string;
          latitude: number;
          longitude: number;
          hours?: Json;
          is_open?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          city?: string;
          province?: string;
          postal_code?: string;
          phone?: string;
          latitude?: number;
          longitude?: number;
          hours?: Json;
          is_open?: boolean;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          short_description: string;
          price: number;
          compare_at_price: number | null;
          category_id: string;
          subcategory_id: string;
          brand: string;
          requires_prescription: boolean;
          stock: number;
          images: Json;
          tags: string[];
          is_featured: boolean;
          is_on_sale: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string;
          short_description?: string;
          price: number;
          compare_at_price?: number | null;
          category_id: string;
          brand?: string;
          requires_prescription?: boolean;
          stock?: number;
          images?: Json;
          tags?: string[];
          is_featured?: boolean;
          is_on_sale?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string;
          short_description?: string;
          price?: number;
          compare_at_price?: number | null;
          category_id?: string;
          brand?: string;
          requires_prescription?: boolean;
          stock?: number;
          images?: Json;
          tags?: string[];
          is_featured?: boolean;
          is_on_sale?: boolean;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          address: string;
          city: string;
          province: string;
          postal_code: string;
          preferred_branch_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          phone?: string;
          address?: string;
          city?: string;
          province?: string;
          postal_code?: string;
          preferred_branch_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          address?: string;
          city?: string;
          province?: string;
          postal_code?: string;
          preferred_branch_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          branch_id: string | null;
          status: string;
          total: number;
          shipping_address: Json;
          payment_method: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          branch_id?: string | null;
          status?: string;
          total: number;
          shipping_address?: Json;
          payment_method?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          branch_id?: string | null;
          status?: string;
          total?: number;
          shipping_address?: Json;
          payment_method?: string;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
          created_at?: string;
        };
      };
    };
  };
}
