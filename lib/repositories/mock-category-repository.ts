import { mockCategories } from "../mock/mock-categories";
import type { Category, CategoryInput } from "../types/category";
import { readCollection, writeCollection } from "./mock-storage";

const key = "categories";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `cat-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export type CategoryRepository = {
  list(): Promise<Category[]>;
  getById(id: string): Promise<Category | null>;
  getBySlug(slug: string): Promise<Category | null>;
  create(input: CategoryInput): Promise<Category>;
  update(id: string, input: Partial<CategoryInput>): Promise<Category | null>;
  reset(): Promise<void>;
};

export const mockCategoryRepository: CategoryRepository = {
  async list() {
    return readCollection<Category>(key, mockCategories);
  },
  async getById(id) {
    return (await this.list()).find((category) => category.id === id) ?? null;
  },
  async getBySlug(slug) {
    return (await this.list()).find((category) => category.slug === slug) ?? null;
  },
  async create(input) {
    const categories = await this.list();
    const timestamp = now();
    const category: Category = {
      ...input,
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    writeCollection(key, [...categories, category]);
    return category;
  },
  async update(id, input) {
    const categories = await this.list();
    let updated: Category | null = null;
    const next = categories.map((category) => {
      if (category.id !== id) return category;
      updated = { ...category, ...input, updatedAt: now() };
      return updated;
    });
    writeCollection(key, next);
    return updated;
  },
  async reset() {
    writeCollection(key, mockCategories);
  },
};
