"use client";

import { useEffect, useMemo, useState } from "react";
import { CategoryForm } from "@/components/admin/category-form";
import { ActiveBadge } from "@/components/ui/badges";
import { getCategories, updateCategory } from "@/lib/services/category-service";
import { getProducts } from "@/lib/services/product-service";
import type { Category } from "@/lib/types/category";
import type { Product } from "@/lib/types/product";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Category | null>(null);

  function load() {
    Promise.all([getCategories(), getProducts()]).then(([categoryData, productData]) => {
      setCategories(categoryData);
      setProducts(productData);
    });
  }

  useEffect(load, []);

  const visible = useMemo(() => categories.filter((category) => `${category.name} ${category.description}`.toLowerCase().includes(query.toLowerCase())), [categories, query]);

  function productCount(categoryId: string) {
    return products.filter((product) => product.categoryId === categoryId).length;
  }

  async function toggle(categoryItem: Category) {
    const count = products.filter((product) => product.categoryId === categoryItem.id && product.isActive).length;
    if (categoryItem.isActive && count && !window.confirm(`This category has ${count} active products. Deactivate anyway?`)) return;
    await updateCategory(categoryItem.id, { isActive: !categoryItem.isActive });
    load();
  }

  return (
    <main className="admin-page">
      <div className="admin-title"><p className="eyebrow">Categories</p><h1>Category management</h1></div>
      <section className="admin-two-col">
        <article className="admin-panel">
          <h2>{editing ? "Edit category" : "Add category"}</h2>
          <CategoryForm category={editing ?? undefined} onSaved={() => { setEditing(null); load(); }} />
        </article>
        <article className="admin-panel">
          <div className="panel-head"><h2>All categories</h2><input placeholder="Search categories" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
          {visible.map((category) => (
            <div className="admin-list-row category-row" key={category.id}>
              <img src={category.imageUrl} alt="" />
              <div><strong>{category.displayOrder}. {category.name}</strong><small>{productCount(category.id)} products • {category.slug}</small></div>
              <ActiveBadge active={category.isActive} />
              <div className="row-actions">
                <button type="button" onClick={() => setEditing(category)}>Edit</button>
                <button type="button" onClick={() => toggle(category)}>{category.isActive ? "Deactivate" : "Activate"}</button>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
}
