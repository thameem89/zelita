"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, initialProducts, readCatalog, type Product } from "../catalog";
import { SiteFooter } from "../site-footer";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setProducts(readCatalog());

    const category = new URLSearchParams(window.location.search).get("category");
    if (category && categories.includes(category)) {
      setActiveCategory(category);
    }
  }, []);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory =
        activeCategory === "All" || product.category === activeCategory;
      const inQuery = `${product.name} ${product.category} ${product.pack}`
        .toLowerCase()
        .includes(normalizedQuery);
      return inCategory && inQuery;
    });
  }, [activeCategory, products, query]);

  return (
    <main>
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="/" aria-label="Zelita home">
          <img
            className="brand-logo"
            src="/zelita-logo.png"
            alt="Zelita Ventures Co. LLC"
          />
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/admin">Add Products</a>
          <a href="/#contact">Contact</a>
        </div>
      </nav>

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
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="catalog-results" role="list">
          {visibleProducts.length ? (
            visibleProducts.map((product) => (
              <article key={product.id} role="listitem">
                <div>
                  <strong>{product.name}</strong>
                  <small>{product.category}</small>
                </div>
                <span>{product.pack}</span>
                <em>{product.status}</em>
              </article>
            ))
          ) : (
            <p className="catalog-empty">No products match that search.</p>
          )}
        </div>

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
