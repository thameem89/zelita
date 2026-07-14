"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductEmptyState } from "@/components/catalog/product-empty-state";
import { ProductFilterSidebar } from "@/components/catalog/product-filter-sidebar";
import { ProductGrid } from "@/components/catalog/product-grid";
import { ProductHero } from "@/components/catalog/product-hero";
import { ProductSearchToolbar, type CatalogSort } from "@/components/catalog/product-search-toolbar";
import { ProcurementSupport } from "@/components/catalog/procurement-support";
import { ErrorState, LoadingState } from "@/components/ui/state";
import { getActiveCategories } from "@/lib/services/category-service";
import { getPublicDemoProducts } from "@/lib/services/product-service";
import type { Category } from "@/lib/types/category";
import type { Product, ProductStatus } from "@/lib/types/product";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const statuses: ProductStatus[] = ["Available", "Limited Stock", "Made to Order", "On Request", "Out of Stock"];

// Inactive public flow: the general catalogue is intentionally kept isolated for
// future use, but it is no longer linked from the public homepage, header, or footer.
function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "All");
  const [activeStatus, setActiveStatus] = useState(searchParams.get("status") ?? "All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<CatalogSort>((searchParams.get("sort") as CatalogSort) ?? "recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getPublicDemoProducts(), getActiveCategories()])
      .then(([productData, categoryData]) => {
        setProducts(productData);
        setCategories(categoryData);
      })
      .catch(() => setError("Could not load the product catalog."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function closeWithEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setFiltersOpen(false);
    }
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (activeStatus !== "All") params.set("status", activeStatus);
    if (sort !== "recommended") params.set("sort", sort);
    const next = params.toString();
    router.replace(next ? `/products?${next}` : "/products", { scroll: false });
  }, [activeCategory, activeStatus, query, router, sort]);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const inCategory = activeCategory === "All" || product.categoryId === activeCategory;
      const inStatus = activeStatus === "All" || product.status === activeStatus;
      const inQuery = `${product.name} ${product.sku} ${product.categoryName} ${product.packSize} ${product.shortDescription}`
        .toLowerCase()
        .includes(normalizedQuery);
      return inCategory && inStatus && inQuery;
    });

    return filtered.sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "name-desc") return b.name.localeCompare(a.name);
      if (sort === "recent") return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      return Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
    });
  }, [activeCategory, activeStatus, products, query, sort]);

  function clearFilters() {
    setQuery("");
    setActiveCategory("All");
    setActiveStatus("All");
    setSort("recommended");
  }

  return (
    <main className="catalog-page">
      <SiteNav />
      <ProductHero />

      <section className="catalog-shell" id="catalog-results">
        <ProductSearchToolbar
          categories={categories}
          statuses={statuses}
          query={query}
          category={activeCategory}
          status={activeStatus}
          sort={sort}
          count={visibleProducts.length}
          onQueryChange={setQuery}
          onCategoryChange={setActiveCategory}
          onStatusChange={setActiveStatus}
          onSortChange={setSort}
          onOpenFilters={() => setFiltersOpen(true)}
        />

        <div className="catalog-layout">
          <ProductFilterSidebar
            categories={categories}
            statuses={statuses}
            products={products}
            activeCategory={activeCategory}
            activeStatus={activeStatus}
            onCategoryChange={setActiveCategory}
            onStatusChange={setActiveStatus}
            onReset={clearFilters}
          />

          <div className={`mobile-filter-drawer ${filtersOpen ? "open" : ""}`} aria-hidden={!filtersOpen}>
            <button className="mobile-filter-backdrop" type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters" />
            <div className="mobile-filter-panel" role="dialog" aria-modal="true" aria-label="Product filters">
              <div className="mobile-filter-head">
                <strong>Filter products</strong>
                <button type="button" onClick={() => setFiltersOpen(false)}>Close</button>
              </div>
              <ProductFilterSidebar
                categories={categories}
                statuses={statuses}
                products={products}
                activeCategory={activeCategory}
                activeStatus={activeStatus}
                onCategoryChange={setActiveCategory}
                onStatusChange={setActiveStatus}
                onReset={clearFilters}
              />
            </div>
          </div>

          <section className="catalog-results-panel" aria-live="polite">
            <div className="catalog-results-head">
              <p>{loading ? "Loading products..." : `Showing ${visibleProducts.length} products`}</p>
            </div>
            {loading ? <LoadingState label="Loading Zelita products..." /> : null}
            {error ? <ErrorState message={error} /> : null}
            {!loading && !error && !visibleProducts.length ? <ProductEmptyState onClear={clearFilters} /> : null}
            {!loading && !error && visibleProducts.length ? <ProductGrid products={visibleProducts} /> : null}
          </section>
        </div>

        <ProcurementSupport />
      </section>
      <SiteFooter />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="catalog-page">
          <SiteNav />
          <section className="catalog-shell">
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
