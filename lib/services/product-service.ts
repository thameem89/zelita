import { supabaseProductRepository } from "../repositories/supabase-product-repository";
import type { ServiceResult } from "../types/common";
import type { Product, ProductInput, ProductSaveInput } from "../types/product";
import { validatePdf } from "./pdf-validation";
import { removeProductPdf, uploadProductPdf } from "./product-pdf-service";
import { normalize, slugify, uniqueSlug } from "./utils";

const repository = supabaseProductRepository;

function productFields(input: ProductSaveInput): ProductInput {
  const fields = { ...input } as Partial<ProductSaveInput>;
  delete fields.pdfFile;
  delete fields.removePdf;
  return fields as ProductInput;
}

export async function getProducts() {
  return repository.list();
}

export async function getChemicalProducts() {
  return (await repository.list()).filter((product) => {
    if (product.productType) return product.productType === "chemical";
    return product.categoryName.toLowerCase().includes("chemical");
  });
}

export async function getEquipmentProducts() {
  return (await repository.list()).filter((product) => {
    if (product.productType) return product.productType === "equipment";
    return !product.categoryName.toLowerCase().includes("chemical");
  });
}

export async function getActiveProducts() {
  return (await repository.list()).filter((product) => product.isActive);
}

export async function getPublicDemoProducts() {
  const demoSlugs = [
    "dac-disinfectant",
    "heavy-duty-degreaser",
    "outdoor-trash-can-with-wheels",
    "automatic-soap-dispenser",
  ];
  const products = await getActiveProducts();
  const bySlug = new Map(products.map((product) => [product.slug, product]));

  return demoSlugs.flatMap((slug) => {
    const product = bySlug.get(slug);
    if (!product) return [];

    if (slug === "heavy-duty-degreaser") {
      return [{
        ...product,
        packSize: "20L",
        status: "Available" as const,
        availability: "Available for commercial replenishment.",
      }];
    }

    return [product];
  });
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

function validateProductInput(input: ProductSaveInput, products: Product[], currentId?: string) {
  const errors: Record<string, string> = {};
  const requestedSlug = slugify(input.slug || input.name);
  const current = products.find((product) => product.id === currentId);
  const slug = uniqueSlug(requestedSlug, products.map((product) => product.slug), current?.slug);

  if (!input.name.trim()) errors.name = "Product name is required.";
  if (!slug.trim()) errors.slug = "Slug is required.";
  if (!input.categoryId.trim()) errors.categoryId = "Category is required.";
  if (!input.shortDescription.trim()) errors.shortDescription = "Short description is required.";
  if (!input.packSize.trim()) errors.packSize = "Pack size is required.";
  if (input.pdfFile) {
    const pdfError = validatePdf(input.pdfFile);
    if (pdfError) errors.pdfFile = pdfError;
  }
  if (
    input.sku.trim() &&
    products.some((product) => product.id !== currentId && normalize(product.sku) === normalize(input.sku))
  ) {
    errors.sku = "A product with this SKU already exists.";
  }

  return { errors, slug };
}

export async function createProduct(input: ProductSaveInput): Promise<ServiceResult<Product>> {
  const products = await repository.list();
  const { errors, slug } = validateProductInput(input, products);
  if (Object.keys(errors).length) return { ok: false, error: Object.values(errors)[0] };

  let pdfUrl = "";
  try { if (input.pdfFile) pdfUrl = await uploadProductPdf(input.pdfFile); }
  catch (error) { return { ok: false, error: error instanceof Error ? error.message : "PDF upload failed." }; }
  const fields = productFields(input);
  const product = await repository.create({ ...fields, slug, pdfUrl });
  return { ok: true, data: product, message: "Product created." };
}

export async function updateProduct(id: string, input: ProductSaveInput): Promise<ServiceResult<Product>> {
  const products = await repository.list();
  const { errors, slug } = validateProductInput(input, products, id);
  if (Object.keys(errors).length) return { ok: false, error: Object.values(errors)[0] };

  const existing = products.find((item) => item.id === id);
  let pdfUrl = existing?.pdfUrl ?? "";
  try {
    if (input.pdfFile) {
      const nextUrl = await uploadProductPdf(input.pdfFile);
      await removeProductPdf(pdfUrl);
      pdfUrl = nextUrl;
    } else if (input.removePdf) {
      await removeProductPdf(pdfUrl);
      pdfUrl = "";
    }
  } catch (error) { return { ok: false, error: error instanceof Error ? error.message : "PDF update failed." }; }
  const fields = productFields(input);
  const product = await repository.update(id, { ...fields, slug, pdfUrl });
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
