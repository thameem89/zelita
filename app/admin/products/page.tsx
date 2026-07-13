"use client";

import { useEffect, useMemo, useState } from "react";
import { ActiveBadge, FeaturedBadge, StatusBadge } from "@/components/ui/badges";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { getCategories } from "@/lib/services/category-service";
import { activateProduct, deactivateProduct, deleteProduct, getProducts } from "@/lib/services/product-service";
import { formatDate } from "@/lib/services/utils";
import type { Category } from "@/lib/types/category";
import type { Product } from "@/lib/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [active, setActive] = useState("All");
  const [sort, setSort] = useState("updated");
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  function load() {
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const visible = useMemo(() => {
    const normalized = query.toLowerCase();
    return products
      .filter((product) => `${product.name} ${product.sku} ${product.categoryName}`.toLowerCase().includes(normalized))
      .filter((product) => category === "All" || product.categoryId === category)
      .filter((product) => status === "All" || product.status === status)
      .filter((product) => active === "All" || product.isActive === (active === "Active"))
      .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }, [active, category, products, query, sort, status]);

  async function toggle(product: Product) {
    if (product.isActive) await deactivateProduct(product.id);
    else await activateProduct(product.id);
    load();
  }

  return (
    <main className="admin-page">
      <div className="admin-title with-action">
        <div><p className="eyebrow">Products</p><h1>Catalog management</h1></div>
        <a className="button primary" href="/admin/products/new">Add Product</a>
      </div>
      <section className="admin-filters">
        <input aria-label="Search products" placeholder="Search products or SKU" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
        <select value={status} onChange={(event) => setStatus(event.target.value)}><option>All</option><option>Available</option><option>Limited Stock</option><option>Made to Order</option><option>On Request</option><option>Out of Stock</option></select>
        <select value={active} onChange={(event) => setActive(event.target.value)}><option>All</option><option>Active</option><option>Inactive</option></select>
        <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="updated">Updated date</option><option value="name">Product name</option></select>
      </section>
      <p className="result-count">{visible.length} products</p>
      {loading ? <LoadingState label="Loading products..." /> : null}
      {!loading && !visible.length ? <EmptyState title="No products found" message="Try changing the search or filters." /> : null}
      {!loading && visible.length ? (
        <div className="admin-table" role="table">
          {visible.map((product) => (
            <article className="admin-table-row product-row" key={product.id}>
              <img src={product.imageUrl} alt="" />
              <div><strong>{product.name}</strong><small>{product.sku || "No SKU"} • {product.categoryName}</small></div>
              <span>{product.packSize}</span>
              <StatusBadge status={product.status} />
              <ActiveBadge active={product.isActive} />
              <FeaturedBadge featured={product.featured} />
              <small>{formatDate(product.updatedAt)}</small>
              <div className="row-actions">
                <a href={`/admin/products/${product.id}/edit`}>Edit</a>
                <a href={`/products/${product.slug}`} target="_blank">View</a>
                <button type="button" onClick={() => toggle(product)}>{product.isActive ? "Deactivate" : "Activate"}</button>
                <button type="button" onClick={() => setConfirmDelete(product)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
      <ConfirmationDialog
        open={Boolean(confirmDelete)}
        title="Delete mock product?"
        message={`This mock delete removes ${confirmDelete?.name ?? "the product"} from local demo data.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={async () => {
          if (confirmDelete) await deleteProduct(confirmDelete.id);
          setConfirmDelete(null);
          load();
        }}
      />
    </main>
  );
}
