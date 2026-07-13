import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <main className="admin-page">
      <div className="admin-title"><p className="eyebrow">Products</p><h1>Add product</h1></div>
      <ProductForm />
    </main>
  );
}
