"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { StatusBadge } from "@/components/ui/badges";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { deactivateProduct, getProductById } from "@/lib/services/product-service";
import { formatDate } from "@/lib/services/utils";
import type { Product } from "@/lib/types/product";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(params.id).then(setProduct).finally(() => setLoading(false));
  }, [params.id]);

  async function deactivateCurrentProduct() {
    if (!product) return;
    if (!window.confirm(`${product.name} will be hidden from the public catalog. Deactivate it?`)) return;
    const updated = await deactivateProduct(product.id);
    if (updated) setProduct(updated);
  }

  if (loading) return <LoadingState label="Loading product..." />;
  if (!product) return <main className="admin-page"><EmptyState title="Product not found" message="This mock product does not exist." /></main>;

  return (
    <main className="admin-page product-editor-page">
      <div className="admin-subpage-title with-action">
        <div>
          <a href="/admin/products">← Products</a>
          <h2>Edit product</h2>
          <p>Last updated {formatDate(product.updatedAt)}.</p>
        </div>
        <div className="editor-meta-actions">
          <StatusBadge status={product.status} />
          <a className="admin-secondary-button" href={`/products/${product.slug}`} target="_blank" rel="noreferrer">View Public Product</a>
          {product.isActive ? (
            <button className="admin-secondary-button" type="button" onClick={deactivateCurrentProduct}>Deactivate</button>
          ) : null}
        </div>
      </div>
      <ProductForm product={product} />
    </main>
  );
}
