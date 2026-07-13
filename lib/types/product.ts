export type ProductStatus =
  | "Available"
  | "Limited Stock"
  | "Made to Order"
  | "On Request"
  | "Out of Stock";

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categoryId: string;
  categoryName: string;
  shortDescription: string;
  description: string;
  packSize: string;
  status: ProductStatus;
  availability: string;
  minimumOrderQuantity: string;
  imageUrl: string;
  gallery: string[];
  brochureUrl: string;
  safetySheetUrl: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
