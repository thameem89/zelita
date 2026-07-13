export type Product = {
  id: number;
  name: string;
  category: string;
  pack: string;
  status: string;
};

export const catalogStorageKey = "zelita-product-catalog";

export const categories = [
  "Cleaning Chemicals",
  "Waste Management",
  "Janitorial Products",
  "Aerosol Products",
  "Packaging Material",
  "Food Care Products",
  "Health & Safety",
  "Laundry Supplies",
  "Dispensers",
  "Tissues",
  "Industrial Chemicals",
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "DAC Disinfectant",
    category: "Cleaning Chemicals",
    pack: "5L",
    status: "Priority stock",
  },
  {
    id: 2,
    name: "Outdoor Trash Can with Wheels",
    category: "Waste Management",
    pack: "120L",
    status: "Available",
  },
  {
    id: 3,
    name: "Liquid Hand Wash",
    category: "Cleaning Chemicals",
    pack: "250ML - 500ML",
    status: "Fast moving",
  },
  {
    id: 4,
    name: "Floor Stripper",
    category: "Industrial Chemicals",
    pack: "4 x 4L",
    status: "Contract supply",
  },
];

export function readCatalog() {
  if (typeof window === "undefined") return initialProducts;

  try {
    const stored = window.localStorage.getItem(catalogStorageKey);
    const parsed = stored ? JSON.parse(stored) : null;
    return Array.isArray(parsed) ? parsed : initialProducts;
  } catch {
    return initialProducts;
  }
}

export function writeCatalog(products: Product[]) {
  window.localStorage.setItem(catalogStorageKey, JSON.stringify(products));
}
