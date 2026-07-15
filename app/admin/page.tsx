"use client";

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/ui/badges";
import { LoadingState } from "@/components/ui/state";
import { getEnquiries } from "@/lib/services/enquiry-service";
import { getProducts } from "@/lib/services/product-service";
import { formatDate } from "@/lib/services/utils";
import type { Enquiry } from "@/lib/types/enquiry";
import type { Product, ProductDivision } from "@/lib/types/product";

function inferProductType(product: Product): ProductDivision {
  return product.productType ?? (product.categoryName.toLowerCase().includes("chemical") ? "chemical" : "equipment");
}

function adminEditHref(product: Product) {
  return inferProductType(product) === "equipment"
    ? `/admin/cleaning-equipment/${product.id}/edit`
    : `/admin/cleaning-chemicals/${product.id}/edit`;
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getEnquiries()])
      .then(([productData, enquiryData]) => {
        setProducts(productData);
        setEnquiries(enquiryData);
      })
      .finally(() => setLoading(false));
  }, []);

  const divisionCounts = useMemo(() => {
    return products.reduce<Record<ProductDivision, number>>((acc, product) => {
      const type = inferProductType(product);
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, { chemical: 0, equipment: 0 });
  }, [products]);

  if (loading) return <LoadingState label="Loading dashboard..." />;

  const cards = [
    ["Total Chemical Products", divisionCounts.chemical],
    ["Total Equipment Products", divisionCounts.equipment],
    ["Active Products", products.filter((product) => product.isActive).length],
    ["New Enquiries", enquiries.filter((enquiry) => enquiry.status === "New").length],
    ["Products with PDFs", products.filter((product) => product.documents?.length || product.safetySheetUrl).length],
    ["Featured Products", products.filter((product) => product.featured).length],
  ];

  return (
    <main className="admin-page">
      <div className="admin-title">
        <p className="eyebrow">Dashboard</p>
        <h1>Zelita product division overview</h1>
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
          <div className="panel-head"><h2>Recently updated products</h2><a href="/admin/cleaning-chemicals">View chemicals</a></div>
          {[...products].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)).slice(0, 5).map((product) => (
            <a className="admin-list-row" href={adminEditHref(product)} key={product.id}>
              <div><strong>{product.name}</strong><small>{product.categoryName} - {formatDate(product.updatedAt)}</small></div>
              <StatusBadge status={product.status} />
            </a>
          ))}
        </article>
      </section>
      <section className="admin-two-col">
        <article className="admin-panel">
          <h2>Product division overview</h2>
          <div className="status-overview">
            <span>Cleaning Chemicals: <strong>{divisionCounts.chemical}</strong></span>
            <span>Cleaning Equipment: <strong>{divisionCounts.equipment}</strong></span>
            <span>Active items: <strong>{products.filter((product) => product.isActive).length}</strong></span>
          </div>
        </article>
        <article className="admin-panel">
          <h2>Quick actions</h2>
          <div className="quick-actions">
            <a className="button primary" href="/admin/cleaning-chemicals/new">Add Chemical Product</a>
            <a className="button dark" href="/admin/cleaning-equipment/new">Add Equipment Product</a>
            <a className="button dark" href="/admin/enquiries">View Enquiries</a>
            <a className="button dark" href="/cleaning-chemicals" target="_blank">View Chemicals Page</a>
          </div>
        </article>
      </section>
    </main>
  );
}
