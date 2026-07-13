"use client";

import Image from "next/image";
import { Suspense, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/state";
import { getActiveCategories } from "@/lib/services/category-service";
import { getActiveProducts } from "@/lib/services/product-service";
import type { Category } from "@/lib/types/category";
import type { Product, ProductStatus } from "@/lib/types/product";
import { ProductCard } from "../product-card";
import { SiteFooter } from "../site-footer";
import { SiteNav } from "../site-nav";

const statuses: ProductStatus[] = ["Available", "Limited Stock", "Made to Order", "On Request", "Out of Stock"];
const sortOptions = ["Recommended", "Name", "Category", "Availability"];
const productTypes = ["Commercial care", "Industrial use", "Washroom", "Consumables"];
const brands = ["Zelita", "DAC", "Contract supply"];
const packSizes = ["Bottle", "Carton", "Bulk", "Unit"];

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") ?? "All");
  const [activeStatus, setActiveStatus] = useState(searchParams.get("status") ?? "All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sortBy, setSortBy] = useState("Recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [filtersOpen, setFiltersOpen] = useState(false);
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

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextProducts = products.filter((product) => {
      const inCategory =
        activeCategory === "All" || product.categoryId === activeCategory;
      const inStatus = activeStatus === "All" || product.status === activeStatus;
      const inQuery = `${product.name} ${product.categoryName} ${product.packSize} ${product.shortDescription} ${product.sku}`
        .toLowerCase()
        .includes(normalizedQuery);
      return inCategory && inStatus && inQuery;
    });

    return [...nextProducts].sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Category") return a.categoryName.localeCompare(b.categoryName);
      if (sortBy === "Availability") return a.status.localeCompare(b.status);
      return Number(b.featured) - Number(a.featured);
    });
  }, [activeCategory, activeStatus, products, query, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const activeCategoryName = categories.find((category) => category.id === activeCategory)?.name;

  function clearFilters() {
    setQuery("");
    setActiveCategory("All");
    setActiveStatus("All");
    setSortBy("Recommended");
    setVisibleCount(9);
  }

  function selectCategory(categoryId: string) {
    setActiveCategory(categoryId);
    setVisibleCount(9);
    setFiltersOpen(false);
  }

  function selectStatus(status: string) {
    setActiveStatus(status);
    setVisibleCount(9);
    setFiltersOpen(false);
  }

  const sidebar = (
    <aside className="catalog-sidebar" aria-label="Product filters">
      <div className="sidebar-head">
        <strong>Refine Catalogue</strong>
        <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
          <X aria-hidden="true" size={18} strokeWidth={2.2} />
        </button>
      </div>
      <fieldset>
        <legend>Product category</legend>
        <button className={activeCategory === "All" ? "active" : ""} type="button" onClick={() => selectCategory("All")}>
          All Products
        </button>
        {categories.map((category) => (
          <button className={activeCategory === category.id ? "active" : ""} key={category.id} type="button" onClick={() => selectCategory(category.id)}>
            {category.name}
          </button>
        ))}
      </fieldset>
      <fieldset>
        <legend>Availability</legend>
        <button className={activeStatus === "All" ? "active" : ""} type="button" onClick={() => selectStatus("All")}>
          All Statuses
        </button>
        {statuses.map((status) => (
          <button className={activeStatus === status ? "active" : ""} key={status} type="button" onClick={() => selectStatus(status)}>
            {status}
          </button>
        ))}
      </fieldset>
      <fieldset>
        <legend>Product type</legend>
        {productTypes.map((item) => <span key={item}>{item}</span>)}
      </fieldset>
      <fieldset>
        <legend>Brand</legend>
        {brands.map((item) => <span key={item}>{item}</span>)}
      </fieldset>
      <fieldset>
        <legend>Pack size</legend>
        {packSizes.map((item) => <span key={item}>{item}</span>)}
      </fieldset>
      <label className="checkbox-line">
        <input type="checkbox" />
        Commercial / industrial use
      </label>
      <button className="button outline sidebar-reset" type="button" onClick={clearFilters}>
        Reset filters
      </button>
    </aside>
  );

  return (
    <main>
      <SiteNav />

      <section className="catalog-hero">
        <div className="page-container catalog-hero-grid">
          <div>
            <p className="eyebrow">Facility Care & Industrial Supplies</p>
            <h1>Everything your facility needs, organised for procurement.</h1>
            <p>
              Browse products, compare categories and request commercial pricing
              from one supplier.
            </p>
          </div>
          <div className="catalog-hero-visual" aria-hidden="true">
            <Image src="/zelita-cleaning-products.png" alt="" width={460} height={340} priority />
            <div>
              <strong>50+</strong>
              <span>Procurement-ready supply solutions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-page">
        <div className="page-container">
          <div className="catalog-toolbar">
            <label>
              Search catalogue
              <input
                aria-label="Search products, categories, brands or pack size"
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(9);
                }}
                placeholder="Search products, categories, brands or pack size"
                value={query}
              />
            </label>
            <label>
              Category
              <select value={activeCategory} onChange={(event) => selectCategory(event.target.value)}>
                <option value="All">All Products</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <label>
              Availability
              <select value={activeStatus} onChange={(event) => selectStatus(event.target.value)}>
                <option value="All">All Statuses</option>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            <label>
              Sort
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                {sortOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <button className="button outline filter-drawer-button" type="button" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal aria-hidden="true" size={16} strokeWidth={2.2} />
              Filters
            </button>
          </div>

          <div className="category-chip-row" aria-label="Quick category filters">
            <button className={activeCategory === "All" ? "active" : ""} type="button" onClick={() => selectCategory("All")}>All Products</button>
            {categories.map((category) => (
              <button className={activeCategory === category.id ? "active" : ""} key={category.id} type="button" onClick={() => selectCategory(category.id)}>
                {category.name}
              </button>
            ))}
          </div>

          <div className={`filter-drawer ${filtersOpen ? "open" : ""}`}>
            {sidebar}
          </div>

          <div className="catalog-layout">
            {sidebar}
            <div className="catalog-results-panel">
              <div className="catalog-results-head">
                <div>
                  <strong>Showing {visibleProducts.length} of {filteredProducts.length} products</strong>
                  <span>{products.length} active catalogue items</span>
                </div>
                <div className="catalog-view-tools">
                  <select aria-label="Sort products" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    {sortOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <button className={view === "grid" ? "active" : ""} type="button" onClick={() => setView("grid")}>Grid</button>
                  <button className={view === "list" ? "active" : ""} type="button" onClick={() => setView("list")}>List</button>
                </div>
              </div>

              <div className="active-filter-row">
                {activeCategory !== "All" ? <button type="button" onClick={() => selectCategory("All")}>{activeCategoryName} x</button> : null}
                {activeStatus !== "All" ? <button type="button" onClick={() => selectStatus("All")}>{activeStatus} x</button> : null}
                {query ? <button type="button" onClick={() => setQuery("")}>Search x</button> : null}
                {(query || activeCategory !== "All" || activeStatus !== "All") ? <button type="button" onClick={clearFilters}>Clear filters</button> : null}
              </div>

              {loading ? <LoadingState label="Loading Zelita products..." /> : null}
              {error ? <ErrorState message={error} /> : null}
              {!loading && !error && !filteredProducts.length ? (
                <EmptyState title="No products found" message="Try clearing filters or searching for another product category." action={<button className="button dark" type="button" onClick={clearFilters}>Clear filters</button>} />
              ) : null}

              {!loading && !error && filteredProducts.length ? (
                <>
                  <div className={`procurement-product-grid ${view === "list" ? "is-list" : ""}`} role="list">
                    {visibleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} view={view} />
                    ))}
                  </div>
                  {visibleCount < filteredProducts.length ? (
                    <div className="load-more-row">
                      <button className="button outline" type="button" onClick={() => setVisibleCount((count) => count + 9)}>
                        Load More Products
                      </button>
                    </div>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>

          <section className="procurement-cta" aria-label="Procurement support">
            <div>
              <p className="eyebrow">Procurement Support</p>
              <h2>Need multiple products or recurring supply?</h2>
              <p>
                Send your requirement list and our team will prepare a
                consolidated commercial quotation.
              </p>
            </div>
            <div className="procurement-cta-actions">
              <a className="button secondary" href="/request-quote">Upload requirement list</a>
              <a className="button primary" href="/request-quote">Request procurement support</a>
              <a className="button secondary" href="tel:+966567424517">Speak to sales</a>
            </div>
          </section>
        </div>
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
          <section className="catalog-page">
            <div className="page-container">
              <LoadingState label="Loading Zelita products..." />
            </div>
          </section>
          <SiteFooter />
        </main>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
