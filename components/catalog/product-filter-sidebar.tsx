import type { Category } from "@/lib/types/category";
import type { Product, ProductStatus } from "@/lib/types/product";

const categoryNames = [
  "Cleaning Chemicals",
  "Janitorial Supplies",
  "Waste Management",
  "Industrial Chemicals",
  "Laundry Supplies",
  "Dispensers and Tissues",
  "Food Care Products",
];

const availabilityOptions: ProductStatus[] = [
  "Available",
  "Limited Stock",
  "Made to Order",
  "On Request",
  "Out of Stock",
];

export function ProductFilterSidebar({
  categories,
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
  const categoryByName = new Map(categories.map((category) => [category.name, category]));
  const categoryCount = activeCategory === "All" ? 0 : 1;
  const statusCount = activeStatus === "All" ? 0 : 1;
  const packSizes = Array.from(new Set(products.map((product) => product.packSize).filter(Boolean)));

  return (
    <aside className="catalog-filter-sidebar" aria-label="Product filters">
      <div className="filter-sidebar-head">
        <strong>Filters</strong>
        <button type="button" onClick={onReset}>Reset</button>
      </div>
      <fieldset className="filter-fieldset">
        <legend>Product Category</legend>
        <label className="filter-checkbox">
          <input type="checkbox" checked={activeCategory === "All"} onChange={() => onCategoryChange("All")} />
          <span>All Categories</span>
        </label>
        {categoryNames.map((name) => {
          const category = categoryByName.get(name);
          const value = category?.id ?? name;
          return (
            <label className="filter-checkbox" key={name}>
              <input type="checkbox" checked={activeCategory === value} onChange={() => onCategoryChange(value)} />
              <span>{name}</span>
            </label>
          );
        })}
        {categoryCount ? <span className="filter-selected-note">{categoryCount} selected</span> : null}
      </fieldset>
      <fieldset className="filter-fieldset">
        <legend>Availability</legend>
        <label className="filter-checkbox">
          <input type="checkbox" checked={activeStatus === "All"} onChange={() => onStatusChange("All")} />
          <span>All Availability</span>
        </label>
        {availabilityOptions.map((status) => (
          <label className="filter-checkbox" key={status}>
            <input type="checkbox" checked={activeStatus === status} onChange={() => onStatusChange(status)} />
            <span>{status}</span>
          </label>
        ))}
        {statusCount ? <span className="filter-selected-note">{statusCount} selected</span> : null}
      </fieldset>
      <details className="filter-details">
        <summary>Commercial / Industrial Use</summary>
        <div className="muted-filter-options">
          <label className="filter-checkbox"><input type="checkbox" disabled /> <span>Commercial facilities</span></label>
          <label className="filter-checkbox"><input type="checkbox" disabled /> <span>Industrial sites</span></label>
          <label className="filter-checkbox"><input type="checkbox" disabled /> <span>Cleaning contractors</span></label>
        </div>
      </details>
      <details className="filter-details">
        <summary>Pack Size</summary>
        <div className="muted-filter-options">
          {packSizes.map((pack) => (
            <label className="filter-checkbox" key={pack}><input type="checkbox" disabled /> <span>{pack}</span></label>
          ))}
        </div>
      </details>
    </aside>
  );
}
