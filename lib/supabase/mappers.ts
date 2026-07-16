import type { Category } from "../types/category";
import type { Enquiry, EnquiryInput } from "../types/enquiry";
import type { Product, ProductInput } from "../types/product";
import type { CategoryInsert, CategoryRow, EnquiryInsert, EnquiryRow, ProductInsert, ProductRow } from "./database";

export function categoryFromRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    imageUrl: row.image_url ?? "",
    displayOrder: row.display_order ?? 0,
    isActive: row.is_active ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function categoryToInsert(category: Category): CategoryInsert {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image_url: category.imageUrl,
    display_order: category.displayOrder,
    is_active: category.isActive,
    created_at: category.createdAt,
    updated_at: category.updatedAt,
  };
}

export function productFromRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sku: row.sku ?? "",
    categoryId: row.category_id,
    categoryName: row.category_name,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    packSize: row.pack_size ?? "",
    status: row.status,
    availability: row.availability ?? "",
    minimumOrderQuantity: row.minimum_order_quantity ?? "",
    imageUrl: row.image_url ?? "",
    gallery: row.gallery ?? [],
    brochureUrl: row.brochure_url ?? "",
    safetySheetUrl: row.safety_sheet_url ?? "",
    pdfUrl: row.pdf_url ?? "",
    featured: row.featured ?? false,
    isActive: row.is_active ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function productToInsert(product: Product): ProductInsert {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    category_id: product.categoryId,
    category_name: product.categoryName,
    short_description: product.shortDescription,
    description: product.description,
    pack_size: product.packSize,
    status: product.status,
    availability: product.availability,
    minimum_order_quantity: product.minimumOrderQuantity,
    image_url: product.imageUrl,
    gallery: product.gallery,
    brochure_url: product.brochureUrl,
    safety_sheet_url: product.safetySheetUrl,
    pdf_url: product.pdfUrl,
    featured: product.featured,
    is_active: product.isActive,
    created_at: product.createdAt,
    updated_at: product.updatedAt,
  };
}

export function productInputToInsert(input: ProductInput, id: string, createdAt: string, updatedAt: string): ProductInsert {
  return productToInsert({ ...input, id, createdAt, updatedAt });
}

export function enquiryFromRow(row: EnquiryRow): Enquiry {
  return {
    id: row.id,
    enquiryType: row.enquiry_type,
    customerName: row.customer_name,
    companyName: row.company_name ?? "",
    email: row.email ?? "",
    phone: row.phone ?? "",
    city: row.city ?? "",
    productId: row.product_id ?? "",
    productName: row.product_name ?? "",
    quantity: row.quantity ?? "",
    subject: row.subject ?? "",
    message: row.message ?? "",
    status: row.status,
    adminNotes: row.admin_notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function enquiryInputToInsert(input: EnquiryInput, id: string, createdAt: string, updatedAt: string): EnquiryInsert {
  return {
    id,
    enquiry_type: input.enquiryType,
    customer_name: input.customerName,
    company_name: input.companyName,
    email: input.email,
    phone: input.phone,
    city: input.city,
    product_id: input.productId,
    product_name: input.productName,
    quantity: input.quantity,
    subject: input.subject,
    message: input.message,
    status: input.status ?? "New",
    admin_notes: input.adminNotes ?? "",
    created_at: createdAt,
    updated_at: updatedAt,
  };
}
