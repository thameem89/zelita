import { supabaseCategoryRepository } from "../repositories/supabase-category-repository";
import type { CategoryInput } from "../types/category";
import type { ServiceResult } from "../types/common";
import { normalize, slugify } from "./utils";

const repository = supabaseCategoryRepository;

export async function getCategories() {
  return (await repository.list()).sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getActiveCategories() {
  return (await getCategories()).filter((category) => category.isActive);
}

export async function createCategory(input: CategoryInput): Promise<ServiceResult<Awaited<ReturnType<typeof repository.create>>>> {
  const categories = await repository.list();
  const slug = input.slug || slugify(input.name);

  if (!input.name.trim()) return { ok: false, error: "Category name is required." };
  if (!slug) return { ok: false, error: "Slug is required." };
  if (categories.some((category) => normalize(category.slug) === normalize(slug))) {
    return { ok: false, error: "A category with this slug already exists." };
  }

  const category = await repository.create({ ...input, slug });
  return { ok: true, data: category, message: "Category created." };
}

export async function updateCategory(id: string, input: Partial<CategoryInput>): Promise<ServiceResult<NonNullable<Awaited<ReturnType<typeof repository.getById>>>>> {
  const categories = await repository.list();
  const existing = categories.find((category) => category.id === id);
  if (!existing) return { ok: false, error: "Category not found." };

  const slug = input.slug ?? existing.slug;
  if (!slug.trim()) return { ok: false, error: "Slug is required." };
  if (
    categories.some(
      (category) => category.id !== id && normalize(category.slug) === normalize(slug),
    )
  ) {
    return { ok: false, error: "A category with this slug already exists." };
  }

  const category = await repository.update(id, { ...input, slug });
  return category
    ? { ok: true, data: category, message: "Category updated." }
    : { ok: false, error: "Category not found." };
}

export async function resetCategories() {
  await repository.reset();
}
