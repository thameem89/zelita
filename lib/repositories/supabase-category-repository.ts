import type { Category, CategoryInput } from "../types/category";
import { getSupabaseClient, isSupabaseConfigured } from "../supabase/client";
import { categoryFromRow, categoryToInsert } from "../supabase/mappers";
import { mockCategoryRepository, type CategoryRepository } from "./mock-category-repository";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `cat-${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
    console.warn("[Supabase category fallback]", fallbackReason(error));
    return mockOperation();
  }
}

export const supabaseCategoryRepository: CategoryRepository = {
  async list() {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      if (!data?.length) return mockCategoryRepository.list();
      return (data ?? []).map(categoryFromRow);
    }, () => mockCategoryRepository.list());
  },
  async getById(id) {
    return (await this.list()).find((category) => category.id === id) ?? null;
  },
  async getBySlug(slug) {
    return (await this.list()).find((category) => category.slug === slug) ?? null;
  },
  async create(input: CategoryInput) {
    return fallback(async () => {
      const timestamp = now();
      const category: Category = {
        ...input,
        id: createId(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const { data, error } = await getSupabaseClient()
        .from("categories")
        .insert(categoryToInsert(category))
        .select()
        .single();
      if (error) throw error;
      return categoryFromRow(data);
    }, () => mockCategoryRepository.create(input));
  },
  async update(id, input) {
    return fallback(async () => {
      const { data, error } = await getSupabaseClient()
        .from("categories")
        .update({
          name: input.name,
          slug: input.slug,
          description: input.description,
          image_url: input.imageUrl,
          display_order: input.displayOrder,
          is_active: input.isActive,
          updated_at: now(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return categoryFromRow(data);
    }, () => mockCategoryRepository.update(id, input));
  },
  async reset() {
    await mockCategoryRepository.reset();
  },
};
