"use client";

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/badges";
import { LoadingState } from "@/components/ui/state";
import { getCategories } from "@/lib/services/category-service";
import { getEnquiries } from "@/lib/services/enquiry-service";
import { getProducts } from "@/lib/services/product-service";
import { formatDate } from "@/lib/services/utils";
import type { Category } from "@/lib/types/category";
import type { Enquiry } from "@/lib/types/enquiry";
import type { Product } from "@/lib/types/product";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories(), getEnquiries()])
      .then(([productData, categoryData, enquiryData]) => {
        setProducts(productData);
        setCategories(categoryData);
        setEnquiries(enquiryData);
      })
      .finally(() => setLoading(false));
  }, []);

  const statusCounts = useMemo(() => {
    return products.reduce<Record<string, number>>((acc, product) => {
      acc[product.status] = (acc[product.status] ?? 0) + 1;
      return acc;
    }, {});
  }, [products]);

  if (loading) return <LoadingState label="Loading dashboard..." />;

  const cards = [
    ["Total Products", products.length],
    ["Active Products", products.filter((product) => product.isActive).length],
    ["Product Categories", categories.length],
    ["New Enquiries", enquiries.filter((enquiry) => enquiry.status === "New").length],
    ["Featured Products", products.filter((product) => product.featured).length],
  ];

  return (
    <main className="admin-page">
      <div className="admin-title">
        <p className="eyebrow">Dashboard</p>
        <h1>Zelita mock backend overview</h1>
      </div>
      <section className="admin-card-grid">
        {cards.map(([label, value]) => (
          <article className="admin-card" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>
      <section className="admin-two-col">
        <article className="admin-panel">
          <div className="panel-head"><h2>Recent enquiries</h2><a href="/admin/enquiries">View all</a></div>
          {enquiries.slice(0, 5).map((enquiry) => (
            <a className="admin-list-row" href={`/admin/enquiries/${enquiry.id}`} key={enquiry.id}>
              <div><strong>{enquiry.customerName}</strong><small>{enquiry.companyName || enquiry.subject}</small></div>
              <StatusBadge status={enquiry.status} />
            </a>
          ))}
        </article>
        <article className="admin-panel">
          <div className="panel-head"><h2>Recently updated products</h2><a href="/admin/products">View all</a></div>
          {[...products].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)).slice(0, 5).map((product) => (
            <a className="admin-list-row" href={`/admin/products/${product.id}/edit`} key={product.id}>
              <div><strong>{product.name}</strong><small>{product.categoryName} • {formatDate(product.updatedAt)}</small></div>
              <StatusBadge status={product.status} />
            </a>
          ))}
        </article>
      </section>
      <section className="admin-two-col">
        <article className="admin-panel">
          <h2>Product status overview</h2>
          <div className="status-overview">
            {Object.entries(statusCounts).map(([status, count]) => (
              <span key={status}>{status}: <strong>{count}</strong></span>
            ))}
          </div>
        </article>
        <article className="admin-panel">
          <h2>Quick actions</h2>
          <div className="quick-actions">
            <a className="button primary" href="/admin/products/new">Add Product</a>
            <a className="button dark" href="/admin/categories">Add Category</a>
            <a className="button dark" href="/admin/enquiries">View Enquiries</a>
            <a className="button dark" href="/products" target="_blank">View Public Catalog</a>
          </div>
        </article>
      </section>
    </main>
  );
}
