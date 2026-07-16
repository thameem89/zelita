"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  activateProduct,
  createProduct,
  deactivateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/lib/services/product-service";
import { slugify } from "@/lib/services/utils";
import type { Product, ProductDivision, ProductInput, ZeloxRange } from "@/lib/types/product";
import { ActiveBadge, FeaturedBadge } from "../ui/badges";
import { EmptyState, LoadingState } from "../ui/state";

type DivisionConfig = {
  type: ProductDivision;
  title: string;
  newHref: string;
  listHref: string;
  publicBase: string;
};

const configs: Record<ProductDivision, DivisionConfig> = {
  chemical: {
    type: "chemical",
    title: "Cleaning Chemicals",
    newHref: "/admin/cleaning-chemicals/new",
    listHref: "/admin/cleaning-chemicals",
    publicBase: "/cleaning-chemicals",
  },
  equipment: {
    type: "equipment",
    title: "Cleaning Equipment",
    newHref: "/admin/cleaning-equipment/new",
    listHref: "/admin/cleaning-equipment",
    publicBase: "/cleaning-equipment",
  },
};

const equipmentCategories = [
  "Waste Bins & Containers",
  "Janitorial Trolleys",
  "Mops & Buckets",
  "Dispensers",
  "Vacuum Cleaners",
  "Floor Machines",
  "Cleaning Tools",
];

function blankInput(type: ProductDivision): ProductInput {
  const isChemical = type === "chemical";
  return {
    productType: type,
    name: "",
    slug: "",
    sku: "",
    categoryId: isChemical ? "cleaning-chemicals" : "waste-bins-containers",
    categoryName: isChemical ? "ZELOX Ultra Pro" : equipmentCategories[0],
    shortDescription: "",
    description: "",
    packSize: "",
    status: "Available",
    availability: "Available on request.",
    minimumOrderQuantity: "On request",
    imageUrl: isChemical ? "/zelox-ultra-pro-all-purpose-cleaner.png" : "/zelita-janitorial-cart.png",
    gallery: [],
    brochureUrl: "",
    safetySheetUrl: "",
    pdfUrl: "",
    zeloxRange: isChemical ? "Ultra Pro" : undefined,
    rangeLabel: isChemical ? "Professional Premium Maintenance Tier" : undefined,
    keyAdvantages: [],
    packSizes: [],
    dilutionGuide: "",
    applicationInstructions: "",
    safetyNote: "",
    documents: [],
    pdfButtonLabel: isChemical ? "Download Safety Data Sheet" : undefined,
    displayOrder: 10,
    featured: false,
    isActive: true,
  };
}

function toInput(product: Product): ProductInput {
  const input = { ...product } as Partial<Product>;
  delete input.id;
  delete input.createdAt;
  delete input.updatedAt;
  return input as ProductInput;
}

function lines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function DivisionProductList({ type }: { type: ProductDivision }) {
  const config = configs[type];
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getProducts()
      .then((items) => setProducts(items.filter((product) => {
        const inferredType = product.productType ?? (product.categoryName.toLowerCase().includes("chemical") ? "chemical" : "equipment");
        return inferredType === type;
      })))
      .finally(() => setLoading(false));
  }

  useEffect(load, [type]);

  async function toggle(product: Product) {
    if (product.isActive) await deactivateProduct(product.id);
    else await activateProduct(product.id);
    load();
  }

  async function remove(product: Product) {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    await deleteProduct(product.id);
    load();
  }

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999) || a.name.localeCompare(b.name));
  }, [products]);

  if (loading) return <LoadingState label={`Loading ${config.title.toLowerCase()}...`} />;

  return (
    <main className="admin-page product-management-page">
      <section className="compact-stat-grid">
        <article className="stat-card"><span>Total</span><strong>{products.length}</strong></article>
        <article className="stat-card"><span>Active</span><strong>{products.filter((item) => item.isActive).length}</strong></article>
        <article className="stat-card"><span>Featured</span><strong>{products.filter((item) => item.featured).length}</strong></article>
        <article className="stat-card"><span>With PDFs</span><strong>{products.filter((item) => item.documents?.length || item.safetySheetUrl).length}</strong></article>
      </section>

      <div className="admin-list-toolbar">
        <div>
          <h2>{config.title}</h2>
          <p>{type === "chemical" ? "Detailed chemical products with public inner pages and documents." : "Simple equipment quotation cards without detail pages."}</p>
        </div>
        <a className="button primary" href={config.newHref}>{type === "chemical" ? "Add Chemical Product" : "Add Equipment Product"}</a>
      </div>

      {!products.length ? (
        <EmptyState title={`No ${config.title.toLowerCase()} yet`} message="Create the first product for this division." action={<a className="button primary" href={config.newHref}>Add Product</a>} />
      ) : (
        <div className="division-admin-grid">
          {sorted.map((product) => (
            <article className="division-admin-card" key={product.id}>
              <img src={product.imageUrl} alt="" />
              <div>
                <small>{product.categoryName}</small>
                <h3>{product.name}</h3>
                <p>{product.shortDescription}</p>
                <dl>
                  <div><dt>{type === "chemical" ? "Pack sizes" : "Pack / spec"}</dt><dd>{product.packSizes?.join(", ") || product.packSize}</dd></div>
                  <div><dt>Order</dt><dd>{product.displayOrder ?? "Auto"}</dd></div>
                </dl>
                <div className="product-card-badges">
                  <ActiveBadge active={product.isActive} />
                  <FeaturedBadge featured={product.featured} />
                  {type === "chemical" && (product.documents?.length || product.safetySheetUrl) ? <span className="sds-badge">PDF</span> : null}
                </div>
                <div className="compact-actions">
                  <a href={`${config.listHref}/${product.id}/edit`}>Edit</a>
                  {type === "chemical" ? <a href={`${config.publicBase}/${product.slug}`} target="_blank" rel="noreferrer">View</a> : null}
                  <button type="button" onClick={() => toggle(product)}>{product.isActive ? "Deactivate" : "Activate"}</button>
                  <button type="button" onClick={() => remove(product)}>Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export function DivisionProductForm({ type, mode }: { type: ProductDivision; mode: "new" | "edit" }) {
  const config = configs[type];
  const params = useParams<{ id?: string }>();
  const router = useRouter();
  const [form, setForm] = useState<ProductInput>(blankInput(type));
  const [loading, setLoading] = useState(mode === "edit");
  const [advantages, setAdvantages] = useState("");
  const [packSizes, setPackSizes] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [documentTitle, setDocumentTitle] = useState("Safety Data Sheet");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode !== "edit" || !params.id) return;
    getProductById(params.id)
      .then((product) => {
        if (!product) return;
        setForm(toInput(product));
        setAdvantages((product.keyAdvantages ?? []).join("\n"));
        setPackSizes((product.packSizes ?? []).join("\n"));
        const doc = product.documents?.[0];
        setDocumentUrl(doc?.url ?? product.safetySheetUrl ?? "");
        setDocumentTitle(doc?.title ?? "Safety Data Sheet");
      })
      .finally(() => setLoading(false));
  }, [mode, params.id]);

  function setName(name: string) {
    setForm((current) => ({ ...current, name, slug: current.slug || slugify(name) }));
  }

  function setRange(range: ZeloxRange) {
    setForm((current) => ({
      ...current,
      zeloxRange: range,
      categoryName: `ZELOX ${range}`,
      categoryId: `zelox-${range.toLowerCase().replaceAll(" ", "-")}`,
      rangeLabel: range === "Ultra Pro" ? "Professional Premium Maintenance Tier" : "Daily Maintenance & High-Volume Choice",
    }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const packList = lines(packSizes);
    const input: ProductInput = {
      ...form,
      productType: type,
      sku: form.sku || `${type === "chemical" ? "CHEM" : "EQP"}-${Date.now().toString().slice(-5)}`,
      categoryId: form.categoryId || slugify(form.categoryName),
      description: form.description || form.shortDescription,
      packSize: type === "chemical" ? packList.join(", ") : form.packSize,
      packSizes: type === "chemical" ? packList : [],
      keyAdvantages: type === "chemical" ? lines(advantages) : [],
      safetySheetUrl: type === "chemical" ? documentUrl : "",
      documents: type === "chemical" && documentUrl ? [{
        title: documentTitle,
        type: "PDF",
        url: documentUrl,
        buttonLabel: form.pdfButtonLabel || "Download Safety Data Sheet",
      }] : [],
      minimumOrderQuantity: form.minimumOrderQuantity || "On request",
      availability: form.availability || "Available on request.",
      status: "Available",
    };

    if (!input.name.trim()) return setError("Product name is required.");
    if (!input.slug.trim()) return setError("Slug is required.");
    if (!input.shortDescription.trim()) return setError("Small overview is required.");
    if (type === "chemical" && !input.packSizes?.length) return setError("At least one pack size is required.");
    if (type === "equipment" && !input.packSize.trim()) return setError("Pack / specification is required.");

    const result = mode === "edit" && params.id
      ? await updateProduct(params.id, input)
      : await createProduct(input);

    if (!result.ok) return setError(result.error);
    setSuccess(result.message ?? "Saved.");
    setTimeout(() => router.push(config.listHref), 650);
  }

  if (loading) return <LoadingState label="Loading product..." />;

  return (
    <main className="admin-page product-editor-page">
      <div className="admin-subpage-title">
        <div>
          <a href={config.listHref}>Back to {config.title}</a>
          <h2>{mode === "new" ? `Add ${type === "chemical" ? "Chemical" : "Equipment"} Product` : `Edit ${type === "chemical" ? "Chemical" : "Equipment"} Product`}</h2>
          <p>{type === "chemical" ? "Chemicals include inner pages, application details and PDF documents." : "Equipment stays as a compact quote-card item."}</p>
        </div>
      </div>

      <form className="admin-form product-editor-form" onSubmit={submit}>
        {error ? <div className="form-error-banner">{error}</div> : null}
        {success ? <div className="success-message">{success}</div> : null}

        <section className="form-section-card">
          <div className="form-section-head">
            <h2>Basic information</h2>
            <p>Core public-facing product details.</p>
          </div>
          <div className="form-grid">
            <label>Product name<input value={form.name} onChange={(event) => setName(event.target.value)} /></label>
            <label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })} /></label>
          </div>
          {type === "chemical" ? (
            <label>ZELOX range<select value={form.zeloxRange ?? "Ultra Pro"} onChange={(event) => setRange(event.target.value as ZeloxRange)}>
              <option>Ultra Pro</option>
              <option>Classic</option>
            </select></label>
          ) : (
            <label>Equipment category<select value={form.categoryName} onChange={(event) => setForm({ ...form, categoryName: event.target.value, categoryId: slugify(event.target.value) })}>
              {equipmentCategories.map((category) => <option key={category}>{category}</option>)}
            </select></label>
          )}
          <label>Small overview<textarea rows={3} value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} /></label>
          <label>Product image URL<input value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></label>
          {form.imageUrl ? <img className="image-preview" src={form.imageUrl} alt="" /> : null}
        </section>

        {type === "chemical" ? (
          <>
            <section className="form-section-card">
              <div className="form-section-head">
                <h2>Product details</h2>
                <p>Shown on the chemical detail page.</p>
              </div>
              <label>Key advantages<textarea rows={5} value={advantages} onChange={(event) => setAdvantages(event.target.value)} placeholder="One advantage per line" /></label>
              <label>Pack sizes<textarea rows={3} value={packSizes} onChange={(event) => setPackSizes(event.target.value)} placeholder="1 L&#10;5 L" /></label>
              <label>Dilution guide<textarea rows={3} value={form.dilutionGuide ?? ""} onChange={(event) => setForm({ ...form, dilutionGuide: event.target.value })} /></label>
              <label>Application instructions<textarea rows={3} value={form.applicationInstructions ?? ""} onChange={(event) => setForm({ ...form, applicationInstructions: event.target.value })} /></label>
              <label>Short safety note<textarea rows={3} value={form.safetyNote ?? ""} onChange={(event) => setForm({ ...form, safetyNote: event.target.value })} /></label>
            </section>
            <section className="form-section-card">
              <div className="form-section-head">
                <h2>Documents</h2>
                <p>Use a PDF URL during the mock phase. Supabase upload can be connected later.</p>
              </div>
              <div className="form-grid">
                <label>PDF URL<input value={documentUrl} onChange={(event) => setDocumentUrl(event.target.value)} /></label>
                <label>Document title<input value={documentTitle} onChange={(event) => setDocumentTitle(event.target.value)} /></label>
              </div>
              <label>PDF button label<input value={form.pdfButtonLabel ?? ""} onChange={(event) => setForm({ ...form, pdfButtonLabel: event.target.value })} /></label>
            </section>
          </>
        ) : (
          <section className="form-section-card">
            <div className="form-section-head">
              <h2>Equipment details</h2>
              <p>Short quote-card information only.</p>
            </div>
            <label>Pack / specification<input value={form.packSize} onChange={(event) => setForm({ ...form, packSize: event.target.value })} /></label>
          </section>
        )}

        <section className="form-section-card">
          <div className="form-section-head">
            <h2>Visibility</h2>
            <p>Control public display and ordering.</p>
          </div>
          <div className="form-grid">
            <label>Display order<input type="number" value={form.displayOrder ?? 10} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} /></label>
          </div>
          <div className="check-row admin-check-row">
            <label><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured</label>
            <label><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} /> Active</label>
          </div>
        </section>

        <div className="product-form-action-bar">
          <a className="button dark" href={config.listHref}>Cancel</a>
          <button className="button primary" type="submit">Save Product</button>
        </div>
      </form>
    </main>
  );
}
