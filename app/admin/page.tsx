"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  categories,
  initialProducts,
  readCatalog,
  type Product,
  writeCatalog,
} from "../catalog";
import { SiteFooter } from "../site-footer";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    pack: "",
    status: "Available",
  });

  useEffect(() => {
    setProducts(readCatalog());
  }, []);

  const visibleProducts = useMemo(() => {
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.pack}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [products, query]);

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.pack.trim()) {
      return;
    }

    const nextProducts = [
      {
        id: Date.now(),
        name: form.name.trim(),
        category: form.category,
        pack: form.pack.trim(),
        status: form.status.trim() || "Available",
      },
      ...products,
    ];
    setProducts(nextProducts);
    writeCatalog(nextProducts);
    setForm({
      name: "",
      category: form.category,
      pack: "",
      status: "Available",
    });
  }

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

      <section className="manager page-surface">
        <div className="section-head">
          <p className="eyebrow">Add Products</p>
          <h1>Catalog management for new Zelita stock items.</h1>
        </div>
        <div className="manager-layout">
          <form onSubmit={addProduct}>
            <label>
              Product name
              <input
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="e.g. Floor cleaner"
                value={form.name}
              />
            </label>
            <label>
              Category
              <select
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                value={form.category}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              Pack size
              <input
                onChange={(event) =>
                  setForm({ ...form, pack: event.target.value })
                }
                placeholder="e.g. 4 x 4L"
                value={form.pack}
              />
            </label>
            <label>
              Status
              <input
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
                placeholder="Available"
                value={form.status}
              />
            </label>
            <button className="button primary" type="submit">
              Add to Catalog
            </button>
          </form>

          <div className="inventory">
            <div className="inventory-tools">
              <input
                aria-label="Search products"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                value={query}
              />
              <span>{visibleProducts.length} items</span>
            </div>
            <div className="product-table" role="list">
              {visibleProducts.map((product) => (
                <article key={product.id} role="listitem">
                  <div>
                    <strong>{product.name}</strong>
                    <small>
                      {product.category} | {product.pack}
                    </small>
                  </div>
                  <span>{product.status}</span>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => {
                      const nextProducts = products.filter(
                        (item) => item.id !== product.id,
                      );
                      setProducts(nextProducts);
                      writeCatalog(nextProducts);
                    }}
                    type="button"
                  >
                    Remove
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
