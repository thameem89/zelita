"use client";

import { FormEvent, useState } from "react";
import { createCategory, updateCategory } from "@/lib/services/category-service";
import { slugify } from "@/lib/services/utils";
import type { Category, CategoryInput } from "@/lib/types/category";

function blank(): CategoryInput {
  return { name: "", slug: "", description: "", imageUrl: "/zelita-facility-hero.png", displayOrder: 99, isActive: true };
}

export function CategoryForm({ category, onSaved }: { category?: Category; onSaved: () => void }) {
  const [form, setForm] = useState<CategoryInput>(category ?? blank());
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = category ? await updateCategory(category.id, form) : await createCategory(form);
    setMessage(result.ok ? result.message ?? "Saved." : result.error);
    if (result.ok) {
      setForm(blank());
      onSaved();
    }
  }

  return (
    <form className="admin-form compact-form" onSubmit={submit}>
      {message ? <div className={message.includes("required") || message.includes("exists") ? "form-error-banner" : "success-message"}>{message}</div> : null}
      <div className="form-grid">
        <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value, slug: form.slug || slugify(event.target.value) })} /></label>
        <label>Slug<input value={form.slug} onChange={(event) => setForm({ ...form, slug: slugify(event.target.value) })} /></label>
      </div>
      <label>Description<textarea rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
      <div className="form-grid">
        <label>Image URL<input value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} /></label>
        <label>Display order<input type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} /></label>
      </div>
      <div className="check-row"><label><input type="checkbox" checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} /> Active</label></div>
      <button className="button primary" type="submit">{category ? "Update Category" : "Add Category"}</button>
    </form>
  );
}
