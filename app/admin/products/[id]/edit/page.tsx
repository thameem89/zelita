"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { getProductById } from "@/lib/services/product-service";
import type { Product } from "@/lib/types/product";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(params.id).then(setProduct).finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <LoadingState label="Loading product..." />;
  if (!product) return <main className="admin-page"><EmptyState title="Product not found" message="This mock product does not exist." /></main>;

  return (
    <main className="admin-page">
      <div className="admin-title"><p className="eyebrow">Products</p><h1>Edit product</h1></div>
      <ProductForm product={product} />
    </main>
  );
}
