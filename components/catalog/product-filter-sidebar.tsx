import type { Category } from "@/lib/types/category";
import type { Product, ProductStatus } from "@/lib/types/product";

export function ProductFilterSidebar({
  categories,
  statuses,
  products,
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
  onReset,
}: {
  categories: Category[];
  statuses: ProductStatus[];
  products: Product[];
  activeCategory: string;
  activeStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
  onReset: () => void;
}) {
  const categoryCount = activeCategory === "All" ? 0 : 1;
  const statusCount = activeStatus === "All" ? 0 : 1;
  const packSizes = Array.from(new Set(products.map((product) => product.packSize).filter(Boolean))).slice(0, 5);

  return (
    <aside className="catalog-filter-sidebar" aria-label="Advanced product filters">
      <div className="filter-sidebar-head">
        <div>
          <strong>Filters</strong>
          <span>{categoryCount + statusCount} selected</span>
        </div>
        <button type="button" onClick={onReset}>Reset</button>
      </div>
      <details open>
        <summary>Product Category {categoryCount ? `(${categoryCount})` : ""}</summary>
        <div className="filter-options">
          <label>
            <input type="radio" checked={activeCategory === "All"} onChange={() => onCategoryChange("All")} />
            <span>All categories</span>
          </label>
          {categories.map((category) => (
            <label key={category.id}>
              <input type="radio" checked={activeCategory === category.id} onChange={() => onCategoryChange(category.id)} />
              <span>{category.name}</span>
            </label>
          ))}
        </div>
      </details>
      <details open>
        <summary>Availability {statusCount ? `(${statusCount})` : ""}</summary>
        <div className="filter-options">
          <label>
            <input type="radio" checked={activeStatus === "All"} onChange={() => onStatusChange("All")} />
            <span>All availability</span>
          </label>
          {statuses.map((status) => (
            <label key={status}>
              <input type="radio" checked={activeStatus === status} onChange={() => onStatusChange(status)} />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </details>
      <details>
        <summary>Commercial / Industrial Use</summary>
        <div className="filter-options muted-filter-options">
          <span>Commercial facilities</span>
          <span>Industrial sites</span>
          <span>Cleaning contractors</span>
        </div>
      </details>
      <details>
        <summary>Pack Size</summary>
        <div className="filter-options muted-filter-options">
          {packSizes.length ? packSizes.map((pack) => <span key={pack}>{pack}</span>) : <span>Pack sizes vary by product</span>}
        </div>
      </details>
    </aside>
  );
}
