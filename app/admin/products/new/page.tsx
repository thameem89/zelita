import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <main className="admin-page product-editor-page">
      <div className="admin-subpage-title">
        <div>
          <a href="/admin/products">← Products</a>
          <h2>Add product</h2>
          <p>Create a mock catalog item for review before the Supabase backend phase.</p>
        </div>
      </div>
      <ProductForm />
    </main>
  );
}
