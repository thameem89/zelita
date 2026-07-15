export type ProductStatus =
  | "Available"
  | "Limited Stock"
  | "Made to Order"
  | "On Request"
  | "Out of Stock";

export type ProductDivision = "chemical" | "equipment";

export type ZeloxRange = "Ultra Pro" | "Classic";

export type ProductDocumentType = "PDF";

export type ProductDocument = {
  title: string;
  type: ProductDocumentType;
  url: string;
  buttonLabel: string;
  reference?: string;
  version?: string;
  date?: string;
};

export type Product = {
  id: string;
  productType?: ProductDivision;
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
  zeloxRange?: ZeloxRange;
  rangeLabel?: string;
  keyAdvantages?: string[];
  packSizes?: string[];
  dilutionGuide?: string;
  applicationInstructions?: string;
  safetyNote?: string;
  documents?: ProductDocument[];
  pdfButtonLabel?: string;
  displayOrder?: number;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;
