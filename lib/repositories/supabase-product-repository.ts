import type { ProductInput } from "../types/product";
import { getSupabaseClient, isSupabaseConfigured } from "../supabase/client";
import { productFromRow, productInputToInsert } from "../supabase/mappers";
import { mockProductRepository, type ProductRepository } from "./mock-product-repository";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `prod-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function fallbackReason(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Supabase request failed.";
}

async function fallback<T>(operation: () => Promise<T>, mockOperation: () => Promise<T>) {
  if (!isSupabaseConfigured()) return mockOperation();
  try {
    return await operation();
  } catch (error) {
    console.warn("[Supabase product fallback]", fallbackReason(error));
    return mockOperation();
  }
}

export const supabaseProductRepository: ProductRepository = {
  async list() {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("products")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map(productFromRow);
    }, () => mockProductRepository.list());
  },
  async getById(id) {
    return (await this.list()).find((product) => product.id === id) ?? null;
  },
  async getBySlug(slug) {
    return (await this.list()).find((product) => product.slug === slug) ?? null;
  },
  async create(input: ProductInput) {
    return fallback(async () => {
      const timestamp = now();
      const { data, error } = await getSupabaseClient()
        .from("products")
        .insert(productInputToInsert(input, createId(), timestamp, timestamp))
        .select()
        .single();
      if (error) throw error;
      return productFromRow(data);
    }, () => mockProductRepository.create(input));
  },
  async update(id, input) {
    return fallback(async () => {
      const updatePayload: Partial<ReturnType<typeof productInputToInsert>> = {
        name: input.name,
        slug: input.slug,
        sku: input.sku,
        category_id: input.categoryId,
        category_name: input.categoryName,
        short_description: input.shortDescription,
        description: input.description,
        pack_size: input.packSize,
        status: input.status,
        availability: input.availability,
        minimum_order_quantity: input.minimumOrderQuantity,
        image_url: input.imageUrl,
        gallery: input.gallery,
        brochure_url: input.brochureUrl,
        safety_sheet_url: input.safetySheetUrl,
        featured: input.featured,
        is_active: input.isActive,
        updated_at: now(),
      };
      const { data, error } = await getSupabaseClient()
        .from("products")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return productFromRow(data);
    }, () => mockProductRepository.update(id, input));
  },
  async remove(id) {
    return fallback(async () => {
      const { error } = await getSupabaseClient().from("products").delete().eq("id", id);
      if (error) throw error;
      return true;
    }, () => mockProductRepository.remove(id));
  },
  async reset() {
    await mockProductRepository.reset();
  },
};
