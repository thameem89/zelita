"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCategories } from "@/lib/services/category-service";
import { createProduct, updateProduct } from "@/lib/services/product-service";
import { slugify } from "@/lib/services/utils";
import type { Category } from "@/lib/types/category";
import type { Product, ProductInput, ProductSaveInput, ProductStatus } from "@/lib/types/product";
import { FormFieldError } from "../ui/form-field-error";

const statuses: ProductStatus[] = ["Available", "Limited Stock", "Made to Order", "On Request", "Out of Stock"];

function blankProduct(category?: Category): ProductInput {
  return {
    name: "",
    slug: "",
    sku: "",
    categoryId: category?.id ?? "",
    categoryName: category?.name ?? "",
    shortDescription: "",
    description: "",
    packSize: "",
    status: "Available",
    availability: "",
    minimumOrderQuantity: "",
    imageUrl: "/zelita-cleaning-products.png",
    gallery: [],
    brochureUrl: "",
    safetySheetUrl: "",
    pdfUrl: "",
    featured: false,
    isActive: true,
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductInput>(product ?? blankProduct());
  const [galleryText, setGalleryText] = useState(product?.gallery.join("\n") ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [slugEdited, setSlugEdited] = useState(Boolean(product));
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [removePdf, setRemovePdf] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories().then((items) => {
      setCategories(items);
      if (!product && items[0]) setForm((current) => ({ ...current, categoryId: items[0].id, categoryName: items[0].name }));
    });
  }, [product]);

  function setName(name: string) {
    setForm((current) => ({
      ...current,
      name,
      slug: slugEdited ? current.slug : slugify(name),
    }));
  }

  async function saveProduct(overrideActive?: boolean) {
    setSuccess("");
    const category = categories.find((item) => item.id === form.categoryId);
    const input: ProductSaveInput = {
      ...form,
      isActive: typeof overrideActive === "boolean" ? overrideActive : form.isActive,
      categoryName: category?.name ?? form.categoryName,
      gallery: galleryText.split("\n").map((item) => item.trim()).filter(Boolean),
      pdfFile,
      removePdf,
    };
    const localErrors: Record<string, string> = {};
    if (!input.name.trim()) localErrors.name = "Product name is required.";
    if (!input.slug.trim()) localErrors.slug = "Slug is required.";
    if (!input.categoryId) localErrors.categoryId = "Category is required.";
    if (!input.shortDescription.trim()) localErrors.shortDescription = "Short description is required.";
    if (!input.packSize.trim()) localErrors.packSize = "Pack size is required.";
    setErrors(localErrors);
    if (Object.keys(localErrors).length) return;

    setSaving(true);
    const result = product ? await updateProduct(product.id, input) : await createProduct(input);
    setSaving(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setSuccess(result.message ?? "Saved.");
    setTimeout(() => router.push("/admin/products"), 650);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await saveProduct();
  }

  return (
    <form className="admin-form product-editor-form" onSubmit={submit}>
      {errors.form ? <div className="form-error-banner">{errors.form}</div> : null}
      {success ? <div className="success-message">{success}</div> : null}
      <section className="form-section-card">
        <div className="form-section-head">
          <h2>Basic Information</h2>
          <p>Name, URL slug, category, and the short procurement-facing description.</p>
        </div>
        <div className="form-grid">
          <label>Product name<input value={form.name} onChange={(event) => setName(event.target.value)} /><FormFieldError message={errors.name} /></label>
          <label>Slug<input value={form.slug} onChange={(event) => { setSlugEdited(true); setForm({ ...form, slug: slugify(event.target.value) }); }} aria-describedby="slug-help" /><small id="slug-help">Used at /products/{form.slug || "product-slug"}</small><FormFieldError message={errors.slug} /></label>
        </div>
        <div className="form-grid">
          <label>SKU<input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} /></label>
          <label>Category<select value={form.categoryId} onChange={(event) => {
            const category = categories.find((item) => item.id === event.target.value);
            setForm({ ...form, categoryId: event.target.value, categoryName: category?.name ?? "" });
          }}>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select><FormFieldError message={errors.categoryId} /></label>
        </div>
        <div className="pdf-upload-field">
          <label>Product PDF / Datasheet<input type="file" accept="application/pdf,.pdf" onChange={(event) => { setPdfFile(event.target.files?.[0] ?? null); setRemovePdf(false); }} /></label>
          {pdfFile ? <p className="storage-note">Selected: {pdfFile.name}</p> : null}
          {form.pdfUrl && !removePdf ? <p><a href={form.pdfUrl} target="_blank" rel="noreferrer">View current PDF</a> <button className="admin-secondary-button" type="button" onClick={() => { setRemovePdf(true); setPdfFile(null); }}>Remove PDF</button></p> : null}
          {removePdf ? <p className="storage-note">The current PDF will be removed when you save.</p> : null}
          <FormFieldError message={errors.pdfFile} />
        </div>
        <label>Short description<input value={form.shortDescription} onChange={(event) => setForm({ ...form, shortDescription: event.target.value })} /><FormFieldError message={errors.shortDescription} /></label>
        <label>Full description<textarea rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
      </section>

      <section className="form-section-card">
        <div className="form-section-head">
          <h2>Procurement Details</h2>
          <p>Pack size, availability status, and minimum order information.</p>
        </div>
        <div className="form-grid">
          <label>Pack size<input value={form.packSize} onChange={(event) => setForm({ ...form, packSize: event.target.value })} /><FormFieldError message={errors.packSize} /></label>
          <label>Availability status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as ProductStatus })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
        </div>
        <div className="form-grid">
          <label>Availability details<input value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })} /></label>
          <label>Minimum order quantity<input value={form.minimumOrderQuantity} onChange={(event) => setForm({ ...form, minimumOrderQuantity: event.target.value })} /></label>
        </div>
      </section>

      <section className="form-section-card">
        <div className="form-section-head">
          <h2>Media and Documents</h2>
          <p>Use URLs during the mock phase. Uploads will move to Supabase Storage later.</p>
        </div>
        <label>Main image URL<input value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></label>
        {form.imageUrl ? <img className="image-preview" src={form.imageUrl} alt="" /> : null}
        <label>Gallery image URLs<textarea rows={4} value={galleryText} onChange={(event) => setGalleryText(event.target.value)} placeholder="One image URL per line" /></label>
        <div className="form-grid">
          <label>Brochure URL<input value={form.brochureUrl} onChange={(event) => setForm({ ...form, brochureUrl: event.target.value })} /></label>
          <label>Safety sheet URL<input value={form.safetySheetUrl} onChange={(event) => setForm({ ...form, safetySheetUrl: event.target.value })} /></label>
        </div>
        <p className="storage-note">Supabase Storage upload will be connected in the backend phase.</p>
      </section>

      <section className="form-section-card">
        <div className="form-section-head">
          <h2>Visibility</h2>
          <p>Control whether this product is promoted and visible publicly.</p>
        </div>
        <div className="check-row admin-check-row">
          <label><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured Product</label>
          <label><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} /> Active Product</label>
        </div>
      </section>

      <div className="product-form-action-bar">
        <a className="button dark" href="/admin/products">Cancel</a>
        <button className="admin-secondary-button" type="button" disabled={saving} onClick={() => saveProduct(false)}>Save as Inactive</button>
        <button className="button primary" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Product"}</button>
      </div>
    </form>
  );
}
