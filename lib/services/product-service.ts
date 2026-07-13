import { mockProductRepository } from "../repositories/mock-product-repository";
import type { ServiceResult } from "../types/common";
import type { Product, ProductInput } from "../types/product";
import { normalize, slugify } from "./utils";

const repository = mockProductRepository;

export async function getProducts() {
  return repository.list();
}

export async function getActiveProducts() {
  return (await repository.list()).filter((product) => product.isActive);
}

export async function getProductById(id: string) {
  return repository.getById(id);
}

export async function getProductBySlug(slug: string) {
  const product = await repository.getBySlug(slug);
  return product?.isActive ? product : null;
}

export async function getAdminProductBySlug(slug: string) {
  return repository.getBySlug(slug);
}

function validateProductInput(input: ProductInput, products: Product[], currentId?: string) {
  const errors: Record<string, string> = {};
  const slug = input.slug || slugify(input.name);

  if (!input.name.trim()) errors.name = "Product name is required.";
  if (!slug.trim()) errors.slug = "Slug is required.";
  if (!input.categoryId.trim()) errors.categoryId = "Category is required.";
  if (!input.shortDescription.trim()) errors.shortDescription = "Short description is required.";
  if (!input.packSize.trim()) errors.packSize = "Pack size is required.";
  if (
    slug &&
    products.some((product) => product.id !== currentId && normalize(product.slug) === normalize(slug))
  ) {
    errors.slug = "A product with this slug already exists.";
  }
  if (
    input.sku.trim() &&
    products.some((product) => product.id !== currentId && normalize(product.sku) === normalize(input.sku))
  ) {
    errors.sku = "A product with this SKU already exists.";
  }

  return { errors, slug };
}

export async function createProduct(input: ProductInput): Promise<ServiceResult<Product>> {
  const products = await repository.list();
  const { errors, slug } = validateProductInput(input, products);
  if (Object.keys(errors).length) return { ok: false, error: Object.values(errors)[0] };

  const product = await repository.create({ ...input, slug });
  return { ok: true, data: product, message: "Product created." };
}

export async function updateProduct(id: string, input: ProductInput): Promise<ServiceResult<Product>> {
  const products = await repository.list();
  const { errors, slug } = validateProductInput(input, products, id);
  if (Object.keys(errors).length) return { ok: false, error: Object.values(errors)[0] };

  const product = await repository.update(id, { ...input, slug });
  return product
    ? { ok: true, data: product, message: "Product updated." }
    : { ok: false, error: "Product not found." };
}

export async function deactivateProduct(id: string) {
  return repository.update(id, { isActive: false });
}

export async function activateProduct(id: string) {
  return repository.update(id, { isActive: true });
}

export async function deleteProduct(id: string) {
  return repository.remove(id);
}

export async function resetProducts() {
  await repository.reset();
}
