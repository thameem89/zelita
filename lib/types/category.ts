export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CategoryInput = Omit<Category, "id" | "createdAt" | "updatedAt">;
