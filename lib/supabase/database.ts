import type { EnquiryStatus, EnquiryType } from "../types/enquiry";
import type { ProductStatus } from "../types/product";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
};

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  sku: string | null;
  category_id: string;
  category_name: string;
  short_description: string | null;
  description: string | null;
  pack_size: string | null;
  status: ProductStatus;
  availability: string | null;
  minimum_order_quantity: string | null;
  image_url: string | null;
  gallery: string[] | null;
  brochure_url: string | null;
  safety_sheet_url: string | null;
  pdf_url: string | null;
  featured: boolean | null;
  is_active: boolean | null;
  created_at: string;
  updated_at: string;
};

export type EnquiryRow = {
  id: string;
  enquiry_type: EnquiryType;
  customer_name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  product_id: string | null;
  product_name: string | null;
  quantity: string | null;
  subject: string | null;
  message: string | null;
  status: EnquiryStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CategoryInsert = Omit<CategoryRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type ProductInsert = Omit<ProductRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type EnquiryInsert = Omit<EnquiryRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: CategoryRow;
        Insert: CategoryInsert;
        Update: Partial<CategoryInsert>;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: Partial<ProductInsert>;
        Relationships: [];
      };
      enquiries: {
        Row: EnquiryRow;
        Insert: EnquiryInsert;
        Update: Partial<EnquiryInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
