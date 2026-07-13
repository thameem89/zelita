"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ActiveBadge, StatusBadge } from "@/components/ui/badges";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state";
import { getActiveCategories } from "@/lib/services/category-service";
import { getActiveProducts } from "@/lib/services/product-service";
import type { Category } from "@/lib/types/category";
import type { Product, ProductStatus } from "@/lib/types/product";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "All");
  const [activeStatus, setActiveStatus] = useState(searchParams.get("status") ?? "All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getActiveProducts(), getActiveCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .catch(() => setError("Could not load the product catalog."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (activeStatus !== "All") params.set("status", activeStatus);
    const next = params.toString();
    router.replace(next ? `/products?${next}` : "/products", { scroll: false });
  }, [activeCategory, activeStatus, query, router]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory =
        activeCategory === "All" || product.categoryId === activeCategory;
      const inStatus = activeStatus === "All" || product.status === activeStatus;
      const inQuery = `${product.name} ${product.categoryName} ${product.packSize} ${product.shortDescription}`
        .toLowerCase()
        .includes(normalizedQuery);
      return inCategory && inStatus && inQuery;
    });
  }, [activeCategory, activeStatus, products, query]);

  const statuses: ProductStatus[] = ["Available", "Limited Stock", "Made to Order", "On Request", "Out of Stock"];

  function clearFilters() {
    setQuery("");
    setActiveCategory("All");
    setActiveStatus("All");
  }

  return (
    <main>
      <SiteNav />

      <section className="catalog page-surface">
        <div className="section-head">
          <p className="eyebrow">Full Product Range</p>
          <h1>Facility-care supplies, organized for procurement.</h1>
        </div>

        <div className="catalog-controls">
          <input
            aria-label="Search the product catalog"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, categories, or pack sizes"
            value={query}
          />
          <span>{visibleProducts.length} matching items</span>
        </div>

        <div className="category-rail" aria-label="Product categories">
          <button
            className={activeCategory === "All" ? "active" : ""}
            onClick={() => setActiveCategory("All")}
            type="button"
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className={activeCategory === category.id ? "active" : ""}
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              type="button"
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="category-rail compact" aria-label="Product status">
          <button className={activeStatus === "All" ? "active" : ""} onClick={() => setActiveStatus("All")} type="button">
            All Statuses
          </button>
          {statuses.map((status) => (
            <button className={activeStatus === status ? "active" : ""} key={status} onClick={() => setActiveStatus(status)} type="button">
              {status}
            </button>
          ))}
          {(query || activeCategory !== "All" || activeStatus !== "All") ? (
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>

        {loading ? <LoadingState label="Loading Zelita products..." /> : null}
        {error ? <ErrorState message={error} /> : null}
        {!loading && !error && !visibleProducts.length ? (
          <EmptyState title="No products found" message="Try clearing filters or searching for another product category." action={<button className="button dark" type="button" onClick={clearFilters}>Clear filters</button>} />
        ) : null}

        {!loading && !error && visibleProducts.length ? (
          <div className="public-product-grid" role="list">
            {visibleProducts.map((product) => (
              <article className="public-product-card" key={product.id} role="listitem">
                <img src={product.imageUrl} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <small>{product.categoryName}</small>
                  <p>{product.shortDescription}</p>
                </div>
                <div className="product-card-meta">
                  <span>{product.packSize}</span>
                  <StatusBadge status={product.status} />
                  <ActiveBadge active={product.isActive} />
                </div>
                <div className="product-card-actions">
                  <a className="button dark" href={`/products/${product.slug}`}>View Product</a>
                  <a className="button primary" href={`/request-quote?product=${product.id}`}>Request Quote</a>
                </div>
              </article>
            ))
            }
          </div>
        ) : null}

        <section className="procurement-band" aria-label="Procurement support">
          <div>
            <p className="eyebrow">Procurement Support</p>
            <h2>
              One supplier for everyday care, controlled replenishment, and
              contract work.
            </h2>
          </div>
          <div className="procurement-list">
            <span>Stock availability checks</span>
            <span>Pack-size coordination</span>
            <span>Project supply planning</span>
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main>
          <SiteNav />
          <section className="catalog page-surface">
            <LoadingState label="Loading Zelita products..." />
          </section>
          <SiteFooter />
        </main>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
