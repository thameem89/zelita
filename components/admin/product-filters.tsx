import type { Category } from "@/lib/types/category";

export type ProductFilterState = {
  query: string;
  category: string;
  status: string;
  active: string;
  sort: string;
};

export function ProductFilters({
  categories,
  filters,
  resultCount,
  onChange,
  onClear,
}: {
  categories: Category[];
  filters: ProductFilterState;
  resultCount: number;
  onChange: (filters: ProductFilterState) => void;
  onClear: () => void;
}) {
  const hasFilters = Boolean(
    filters.query ||
      filters.category !== "All" ||
      filters.status !== "All" ||
      filters.active !== "All" ||
      filters.sort !== "updated",
  );

  return (
    <section className="product-toolbar" aria-label="Product search and filters">
      <div className="product-search-field">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Search products"
          placeholder="Search name, SKU, category, or pack size"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
        />
      </div>
      <select aria-label="Filter by category" value={filters.category} onChange={(event) => onChange({ ...filters, category: event.target.value })}>
        <option>All</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
      <select aria-label="Filter by status" value={filters.status} onChange={(event) => onChange({ ...filters, status: event.target.value })}>
        <option>All</option>
        <option>Available</option>
        <option>Limited Stock</option>
        <option>Made to Order</option>
        <option>On Request</option>
        <option>Out of Stock</option>
      </select>
      <select aria-label="Filter by active state" value={filters.active} onChange={(event) => onChange({ ...filters, active: event.target.value })}>
        <option>All</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
      <select aria-label="Sort products" value={filters.sort} onChange={(event) => onChange({ ...filters, sort: event.target.value })}>
        <option value="updated">Updated date</option>
        <option value="name">Product name</option>
      </select>
      <button className="admin-secondary-button" type="button" disabled={!hasFilters} onClick={onClear}>
        Clear Filters
      </button>
      <a className="button primary product-toolbar-add" href="/admin/products/new">Add Product</a>
      <span className="product-result-count">{resultCount} shown</span>
    </section>
  );
}
