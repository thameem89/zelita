"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductFilters, type ProductFilterState } from "@/components/admin/product-filters";
import { ProductTable } from "@/components/admin/product-table";
import { StatCard } from "@/components/admin/stat-card";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState, LoadingState } from "@/components/ui/state";
import { getCategories } from "@/lib/services/category-service";
import {
  activateProduct,
  deactivateProduct,
  deleteProduct,
  getProducts,
} from "@/lib/services/product-service";
import type { Category } from "@/lib/types/category";
import type { Product } from "@/lib/types/product";

const initialFilters: ProductFilterState = {
  query: "",
  category: "All",
  status: "All",
  active: "All",
  sort: "updated",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<ProductFilterState>(initialFilters);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);
  const [confirmToggle, setConfirmToggle] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");

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
    const normalized = filters.query.toLowerCase();
    return products
      .filter((product) =>
        `${product.name} ${product.sku} ${product.categoryName} ${product.packSize}`
          .toLowerCase()
          .includes(normalized),
      )
      .filter((product) => filters.category === "All" || product.categoryId === filters.category)
      .filter((product) => filters.status === "All" || product.status === filters.status)
      .filter((product) => filters.active === "All" || product.isActive === (filters.active === "Active"))
      .sort((a, b) =>
        filters.sort === "name"
          ? a.name.localeCompare(b.name)
          : Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
      );
  }, [filters, products]);

  async function toggleProduct(product: Product) {
    if (product.isActive) {
      setConfirmToggle(product);
      return;
    }

    await activateProduct(product.id);
    setNotice(`${product.name} is active again.`);
    load();
  }

  async function confirmDeactivate() {
    if (!confirmToggle) return;
    await deactivateProduct(confirmToggle.id);
    setNotice(`${confirmToggle.name} was deactivated.`);
    setConfirmToggle(null);
    load();
  }

  async function confirmDeleteProduct() {
    if (!confirmDelete) return;
    await deleteProduct(confirmDelete.id);
    setNotice(`${confirmDelete.name} was deleted.`);
    setConfirmDelete(null);
    load();
  }

  return (
    <main className="admin-page product-management-page">
      <section className="compact-stat-grid" aria-label="Product summary">
        <StatCard label="Total Products" value={products.length} />
        <StatCard label="Active Products" value={products.filter((product) => product.isActive).length} tone="success" />
        <StatCard label="Featured Products" value={products.filter((product) => product.featured).length} />
        <StatCard label="Out of Stock" value={products.filter((product) => product.status === "Out of Stock").length} tone="danger" />
      </section>

      <ProductFilters
        categories={categories}
        filters={filters}
        resultCount={visible.length}
        onChange={setFilters}
        onClear={() => setFilters(initialFilters)}
      />

      {notice ? (
        <div className="admin-inline-notice" role="status">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice">×</button>
        </div>
      ) : null}

      {loading ? <LoadingState label="Loading products..." /> : null}

      {!loading && !products.length ? (
        <EmptyState
          title="No products yet"
          message="Start the catalog by adding Zelita’s first product."
          action={<a className="button primary" href="/admin/products/new">Add First Product</a>}
        />
      ) : null}

      {!loading && products.length > 0 && !visible.length ? (
        <EmptyState
          title="No products match these filters"
          message="Try another search term, category, status, or active-state filter."
          action={
            <div className="empty-actions">
              <button className="button dark" type="button" onClick={() => setFilters(initialFilters)}>Clear Filters</button>
              <a className="button primary" href="/admin/products/new">Add Product</a>
            </div>
          }
        />
      ) : null}

      {!loading && visible.length ? (
        <ProductTable
          products={visible}
          onToggle={toggleProduct}
          onDelete={setConfirmDelete}
        />
      ) : null}

      <ConfirmationDialog
        open={Boolean(confirmToggle)}
        title="Deactivate product?"
        message={`${confirmToggle?.name ?? "This product"} will be hidden from the public catalog until reactivated.`}
        confirmLabel="Deactivate"
        onCancel={() => setConfirmToggle(null)}
        onConfirm={confirmDeactivate}
      />

      <ConfirmationDialog
        open={Boolean(confirmDelete)}
        title="Delete product?"
        message={`This permanently removes ${confirmDelete?.name ?? "the product"} from the catalog.`}
        confirmLabel="Delete"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={confirmDeleteProduct}
      />
    </main>
  );
}
