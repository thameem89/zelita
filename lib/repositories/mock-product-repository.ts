import { mockProducts } from "../mock/mock-products";
import type { Product, ProductInput } from "../types/product";
import { readCollection, writeCollection } from "./mock-storage";

const key = "products";

function now() {
  return new Date().toISOString();
}

function createId() {
  return `prod-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export type ProductRepository = {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getBySlug(slug: string): Promise<Product | null>;
  create(input: ProductInput): Promise<Product>;
  update(id: string, input: Partial<ProductInput>): Promise<Product | null>;
  remove(id: string): Promise<boolean>;
  reset(): Promise<void>;
};

export const mockProductRepository: ProductRepository = {
  async list() {
    return readCollection<Product>(key, mockProducts);
  },
  async getById(id) {
    return (await this.list()).find((product) => product.id === id) ?? null;
  },
  async getBySlug(slug) {
    return (await this.list()).find((product) => product.slug === slug) ?? null;
  },
  async create(input) {
    const products = await this.list();
    const timestamp = now();
    const product: Product = {
      ...input,
      id: createId(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    writeCollection(key, [product, ...products]);
    return product;
  },
  async update(id, input) {
    const products = await this.list();
    let updated: Product | null = null;
    const next = products.map((product) => {
      if (product.id !== id) return product;
      updated = { ...product, ...input, updatedAt: now() };
      return updated;
    });
    writeCollection(key, next);
    return updated;
  },
  async remove(id) {
    const products = await this.list();
    const next = products.filter((product) => product.id !== id);
    writeCollection(key, next);
    return next.length !== products.length;
  },
  async reset() {
    writeCollection(key, mockProducts);
  },
};
